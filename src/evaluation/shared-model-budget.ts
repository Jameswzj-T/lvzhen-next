import { createHash } from "node:crypto";
import { spawn } from "node:child_process";
import { lstat, readFile } from "node:fs/promises";
import { createInterface } from "node:readline";
import { z } from "zod";

// One coordinator-owned module/book. No environment/HTTP override or copied book.
const common = "private-budget-not-in-public-export/";
const sources = [
  [
    "shared_budget.py",
    "b19bea48f4836f3ed05f0386174b3c1ad927feac66e42206d002c07606d9ddf9",
  ],
  [
    "shared_budget_cli.py",
    "fd3a7f304ab36ae9c1f245e763f4456233a24d21b6ca25162af089b4f08030e6",
  ],
] as const;
const digest = z.string().regex(/^sha256:[a-f0-9]{64}$/);
const amount = z.string().regex(/^\d+(\.\d{1,9})?$/);
export const sharedReservationSchema = z
  .object({
    protocol: z.enum([
      "shared-deepseek-full-reservation-v1",
      "shared-deepseek-full-reservation-v2",
    ]),
    recordDigest: digest,
    reservationId: z.string().regex(/^[a-f0-9]{64}$/),
    beijingDay: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    maximumCNY: z.literal("0.20"),
    requestDigest: digest,
  })
  .strict();
export type SharedReservation = z.infer<typeof sharedReservationSchema>;
export type SharedReservationInput = {
  taskId: string;
  attemptId: string;
  requestDigest: string;
  maximumCNY: "0.20";
};
const inputSchema = z
  .object({
    taskId: z.string().regex(/^[a-f0-9]{64}$/),
    attemptId: z.string().regex(/^[a-f0-9]{64}$/),
    requestDigest: digest,
    maximumCNY: z.literal("0.20"),
  })
  .strict();
const rowSchema = z
  .object({
    schema: z.enum([
      "shared-deepseek-full-reservation-v1",
      "shared-deepseek-full-reservation-v2",
    ]),
    record_digest: digest,
    reservation_id: z.string().regex(/^[a-f0-9]{64}$/),
    project_id: z.literal("lvzhen"),
    beijing_day: z.string(),
    task_id: z.string(),
    attempt_id: z.string(),
    stable_attempt_digest: z
      .string()
      .regex(/^[a-f0-9]{64}$/)
      .optional(),
    request_digest: digest,
    maximum_CNY: amount.refine(
      (v) => Number.isFinite(Number(v)) && Number(v) > 0,
    ),
    reservation_released: z.literal(false),
    actual_billed_CNY: z.null(),
    manifest_digest: digest,
    history_digests: z
      .object({ legal_assistant: digest, pa: digest, lvzhen: digest })
      .strict(),
    local_slot: z.null(),
    shared_before_CNY: amount,
    shared_after_CNY: amount,
  })
  .strict();
export type SharedBudgetRow = z.infer<typeof rowSchema>;
const sha = (v: string | Buffer) =>
  createHash("sha256").update(v).digest("hex");
function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === "object")
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
        .map(([k, v]) => [k, canonical(v)]),
    );
  return value;
}
const beijingDay = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

function verifiedRow(raw: unknown): SharedBudgetRow {
  const row = rowSchema.parse(raw),
    { record_digest, ...unsigned } = row;
  const identity =
    row.schema === "shared-deepseek-full-reservation-v2"
      ? [row.project_id, row.task_id, row.attempt_id]
      : [row.project_id, row.beijing_day, row.task_id, row.attempt_id];
  const expectedId = sha(JSON.stringify(identity));
  if (
    record_digest !== "sha256:" + sha(JSON.stringify(canonical(unsigned))) ||
    row.reservation_id !== expectedId ||
    (row.schema === "shared-deepseek-full-reservation-v2" &&
      row.stable_attempt_digest !== expectedId)
  )
    throw Error("shared_budget_reservation_binding");
  return row;
}

/** The caller already owns the original project lock. Commit its immutable
 * intent and local reserve while this lease still holds the shared lock.
 * Any partial failure retains the shared maximum; never refund or retry here.
 */
export async function reserveSharedModelBudget(
  raw: SharedReservationInput,
  commitLocal: (reservation: SharedReservation) => Promise<void>,
  signal: AbortSignal,
  checkLocalAllDates: (rows: readonly SharedBudgetRow[]) => Promise<void>,
): Promise<SharedReservation> {
  const input = inputSchema.parse(raw);
  if (signal.aborted) throw Error("shared_budget_aborted");
  for (const [file, expected] of sources) {
    if (
      (await lstat(common + file)).isSymbolicLink() ||
      sha(await readFile(common + file)) !== expected
    )
      throw Error("shared_budget_common_source_changed");
  }
  const child = spawn(
    "/usr/bin/python3",
    [
      common + "shared_budget_cli.py",
      "lease",
      "--enabled",
      "--project",
      "lvzhen",
    ],
    {
      stdio: ["pipe", "pipe", "pipe"],
      env: {
        NODE_ENV: "production",
        PATH: "/usr/bin:/bin",
        PYTHONDONTWRITEBYTECODE: "1",
        PYTHONNOUSERSITE: "1",
      },
    },
  );
  let failure: Error | undefined;
  const fail = (code: string) => {
    failure ??= Error(code);
    child.kill("SIGTERM");
  };
  const exited = new Promise<number | null>((resolve) => {
    child.once("error", () => {
      failure ??= Error("shared_budget_process_unavailable");
      resolve(null);
    });
    child.once("close", resolve);
  });
  // Neither diagnostics nor inherited service environment is sent to the child.
  child.stderr.resume();
  child.stdin.on("error", () => {
    failure ??= Error("shared_budget_lease_closed");
  });
  const lines = createInterface({ input: child.stdout, crlfDelay: Infinity });
  const iterator = lines[Symbol.asyncIterator]();
  const timer = setTimeout(() => fail("shared_budget_lease_timeout"), 25000);
  const abort = () => fail("shared_budget_aborted");
  signal.addEventListener("abort", abort, { once: true });
  if (signal.aborted) abort();
  const receive = async () => {
    const line = await iterator.next();
    if (failure) throw failure;
    if (line.done || line.value.length > 4_000_000)
      throw Error("shared_budget_invalid_reply");
    let value;
    try {
      value = JSON.parse(line.value);
    } catch {
      throw Error("shared_budget_invalid_reply");
    }
    if (value?.error)
      throw Error(
        typeof value.error === "string" &&
          /^shared_budget_[a-z_]+$/.test(value.error)
          ? value.error
          : "shared_budget_lease_rejected",
      );
    return value;
  };
  const send = async (value: unknown) => {
    if (failure || signal.aborted || child.exitCode !== null)
      throw failure ?? Error("shared_budget_lease_closed");
    await new Promise<void>((resolve, reject) =>
      child.stdin.write(JSON.stringify(value) + "\n", (error) =>
        error ? reject(Error("shared_budget_lease_closed")) : resolve(),
      ),
    );
  };
  try {
    const acquired = await receive();
    if (acquired.lease !== "acquired")
      throw Error("shared_budget_lease_not_acquired");
    // Complete project history, while both the original lock and shared lock
    // are held. Missing/oversized/corrupt history is never treated as empty.
    const rows = z
      .array(z.unknown())
      .max(4000)
      .parse(acquired.project_reservations_all_dates)
      .map(verifiedRow);
    if (new Set(rows.map((r) => r.record_digest)).size !== rows.length)
      throw Error("shared_budget_duplicate_history");
    await checkLocalAllDates(rows);
    await send({
      op: "reserve",
      task_id: input.taskId,
      attempt_id: input.attemptId,
      request_digest: input.requestDigest,
      maximum_CNY: input.maximumCNY,
    });
    const row = verifiedRow((await receive()).reservation);
    if (
      row.schema !== "shared-deepseek-full-reservation-v2" ||
      row.maximum_CNY !== "0.20" ||
      row.task_id !== input.taskId ||
      row.attempt_id !== input.attemptId ||
      row.request_digest !== input.requestDigest ||
      row.beijing_day !== beijingDay()
    )
      throw Error("shared_budget_reservation_binding");
    const receipt = sharedReservationSchema.parse({
      protocol: row.schema,
      recordDigest: row.record_digest,
      reservationId: row.reservation_id,
      beijingDay: row.beijing_day,
      maximumCNY: row.maximum_CNY,
      requestDigest: row.request_digest,
    });
    // Do not abandon a pending filesystem commit on timeout: await it, then
    // reject the dead lease. The original project lock remains owned throughout.
    await commitLocal(receipt);
    await send({ op: "release" });
    if ((await receive()).lease !== "released")
      throw Error("shared_budget_release_unconfirmed");
    child.stdin.end();
    if (
      (await exited) !== 0 ||
      failure ||
      signal.aborted ||
      receipt.beijingDay !== beijingDay()
    )
      throw failure ?? Error("shared_budget_lease_not_completed");
    return receipt;
  } finally {
    clearTimeout(timer);
    signal.removeEventListener("abort", abort);
    lines.close();
    if (child.exitCode === null) child.kill("SIGTERM");
    const hardStop = setTimeout(() => child.kill("SIGKILL"), 1000);
    await exited;
    clearTimeout(hardStop);
  }
}
