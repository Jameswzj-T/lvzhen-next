import { randomUUID } from "node:crypto";
import {
  mkdir,
  readFile,
  readdir,
  rename,
  unlink,
  writeFile,
} from "node:fs/promises";
import { join } from "node:path";
import { z } from "zod";
import { unitDirectPolicySchema } from "./unit-feedback-direct-policy";
import { createUnitFeedbackTrialProvider } from "./unit-feedback-provider";
import {
  realUnitReceiptSchema,
  unitDigest,
  verifyRealReceipt,
  type RealUnitReceipt,
} from "./unit-feedback-storage";
import {
  assessQuestionScopedTable,
  renderQuestionScopedPack,
  QUESTION_SCOPED_VERSION,
} from "./question-scoped-table";
import { wholeCaseRequest } from "./whole-case-table";
import { shortProviderPlan } from "./short-table/provider";
import { loadTableCandidate } from "./table-trial/candidate";
import { evaluateTableTrial } from "./table-trial/service";
import { buildTableTrialGraph } from "./table-trial/workflow";
import {
  TABLE_TRIAL_VERSION,
  tableAnswers,
  tableCaseId,
  tableRequest,
  type TableAvailability,
  type TableAnswers,
  type TableResult,
} from "./table-trial/contract";
import {
  withExplanationReview,
  type ReviewedTableReply,
} from "./table-trial/reviewed-explanation-delivery";

const SERVICE_VERSION = "table-daily-service-v1";
const hash = z.string().regex(/^[a-f0-9]{64}$/);
const storedSchema = z
  .object({
    version: z.literal(SERVICE_VERSION),
    id: hash,
    identity: hash,
    createdAt: z.iso.datetime(),
    requestBodyHash: hash,
    case: z
      .object({
        id: tableCaseId,
        title: z.string(),
        facts: z.string(),
        questions: z
          .array(
            z
              .object({
                id: z.string(),
                prompt: z.string(),
                maximum: z.number().int().positive(),
              })
              .strict(),
          )
          .length(5),
      })
      .strict(),
    answers: tableAnswers,
    pack: z
      .object({
        version: z.literal(QUESTION_SCOPED_VERSION),
        facts: z.string(),
        law: z.string(),
        questions: z
          .array(
            z
              .object({
                id: z.string(),
                prompt: z.string(),
                answer: z.string(),
                criteria: z
                  .array(
                    z
                      .object({
                        id: z.string(),
                        title: z.string(),
                        points: z.number().int().positive(),
                        requirement: z.string(),
                        questionId: z.string(),
                      })
                      .strict(),
                  )
                  .min(1),
              })
              .strict(),
          )
          .min(1)
          .max(5),
      })
      .strict(),
    // Results are an archive, not a second budget ledger. The existing provider
    // reserves and journals every paid intent under its original lock and limits.
    phase: z.enum(["running", "finished"]),
    failure: z.string().nullable(),
    receipt: realUnitReceiptSchema.nullable(),
    durationMs: z.number().finite().nonnegative(),
  })
  .strict();
type Stored = z.infer<typeof storedSchema>;
type ProviderOptions = Pick<
  Parameters<typeof createUnitFeedbackTrialProvider>[0],
  "transport" | "readCredential" | "readPricingPage"
>;
export type TableDailyOptions = ProviderOptions & {
  repo: string;
  signal?: AbortSignal;
};
export const tableDailyRoot = (repo: string) =>
  join(repo, "artifacts/table-daily-submissions");
const idFor = (requestBodyHash: string) =>
  unitDigest({ version: SERVICE_VERSION, requestBodyHash });
const sampleId = (id: string) => `whole-case-${id.slice(0, 40)}`;
const wireFor = (record: Pick<Stored, "pack">) =>
  wholeCaseRequest(renderQuestionScopedPack(record.pack), "off");
async function json(file: string): Promise<unknown | null> {
  try {
    const bytes = await readFile(file);
    if (bytes.length > 1_000_000) throw Error("table-daily-archive-size");
    return JSON.parse(bytes.toString("utf8"));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}
function validateReceipt(
  record: Pick<Stored, "requestBodyHash" | "pack">,
  receipt: RealUnitReceipt,
) {
  verifyRealReceipt(receipt, record.requestBodyHash, 16384);
  if (
    receipt.outputChannel !== undefined ||
    !assessQuestionScopedTable(receipt.text, record.pack).valid
  )
    throw Error("table-daily-receipt-format");
}
function resultFrom(record: Stored): TableResult {
  const wire = wireFor(record);
  if (
    unitDigest(wire) !== record.requestBodyHash ||
    idFor(record.requestBodyHash) !== record.id ||
    record.case.facts !== record.pack.facts ||
    record.case.questions.map((q) => q.id).join() !== "1,2,3,4,5" ||
    record.pack.questions.map((q) => q.id).join() !==
      record.answers
        .filter((a) => a.text.trim())
        .map((a) => a.id)
        .join() ||
    record.pack.questions.some((q) => {
      const item = record.case.questions.find((c) => c.id === q.id);
      return (
        !item ||
        item.prompt !== q.prompt ||
        record.answers.find((a) => a.id === q.id)?.text !== q.answer ||
        q.criteria.some(
          (c) => c.questionId !== q.id || !c.id.startsWith(`${q.id}-`),
        ) ||
        new Set(q.criteria.map((c) => c.id)).size !== q.criteria.length ||
        q.criteria.reduce((n, c) => n + c.points, 0) !== item.maximum
      );
    }) ||
    (record.receipt &&
      record.receipt.requestBodyHash !== record.requestBodyHash) ||
    (record.phase === "running" && (record.receipt || record.failure))
  )
    throw Error("table-daily-archive-binding");
  if (record.phase === "finished" && !record.failure) {
    if (!record.receipt) throw Error("table-daily-missing-receipt");
    validateReceipt(record, record.receipt);
  }
  const assessment =
    record.phase === "finished" && !record.failure && record.receipt
      ? assessQuestionScopedTable(record.receipt.text, record.pack)
      : null;
  return {
    id: record.id,
    version: TABLE_TRIAL_VERSION,
    identity: record.identity,
    createdAt: record.createdAt,
    case: record.case,
    answers: record.answers,
    state:
      record.phase === "running"
        ? "running"
        : record.failure
          ? "stopped"
          : "complete",
    source: "real_provider",
    assessment,
    total: assessment?.score?.total ?? null,
    maximum: record.case.questions.reduce((n, q) => n + q.maximum, 0),
    answeredMaximum: record.pack.questions
      .flatMap((q) => q.criteria)
      .reduce((n, c) => n + c.points, 0),
    costCny: record.receipt?.costCNY ?? null,
    durationMs: record.durationMs,
    failure: record.failure,
  };
}
async function readStored(repo: string, id: string) {
  hash.parse(id);
  const raw = await json(join(tableDailyRoot(repo), `${id}.json`));
  if (raw === null) return null;
  const wrapper = z
    .object({ record: storedSchema, checksum: hash })
    .strict()
    .parse(raw);
  if (
    wrapper.record.id !== id ||
    unitDigest(wrapper.record) !== wrapper.checksum
  )
    throw Error("table-daily-archive-checksum");
  return resultFrom(wrapper.record);
}
function wrapped(record: Stored) {
  const parsed = storedSchema.parse(record);
  return (
    JSON.stringify({ record: parsed, checksum: unitDigest(parsed) }, null, 2) +
    "\n"
  );
}
async function finish(file: string, record: Stored) {
  const tmp = `${file}.${randomUUID()}.tmp`;
  await writeFile(tmp, wrapped(record), { flag: "wx", mode: 0o600 });
  await rename(tmp, file);
}
const unavailable = (
  reason: TableAvailability["reason"],
  message: string,
): TableAvailability => ({ state: "unavailable", reason, message });
async function service(options: TableDailyOptions, record: Stored) {
  const bytes = await readFile(
    join(options.repo, "artifacts/unit-feedback-service/config.json"),
    "utf8",
  );
  if (Buffer.byteLength(bytes) > 64000) throw Error("table-daily-config-size");
  const policy = unitDirectPolicySchema.parse(JSON.parse(bytes));
  const root = join(options.repo, "artifacts/unit-feedback-service", policy.id);
  const body = wireFor(record);
  const provider = createUnitFeedbackTrialProvider({
    grant: policy,
    root,
    credentialRepo: options.repo,
    transport: options.transport,
    readCredential: options.readCredential,
    readPricingPage: options.readPricingPage,
    prepareDirectDispatch: (submitted) => {
      if (unitDigest(submitted) !== record.requestBodyHash)
        throw Error("table-daily-wire-changed");
      return {
        body,
        taskId: record.id,
        wholeCase: {
          validateReceipt: (receipt) => validateReceipt(record, receipt),
        },
      };
    },
  });
  const availability = async (): Promise<TableAvailability> => {
    if (!policy.enabled)
      return unavailable("disabled", "AI评阅暂未开放，已有答案和讲解仍保留。");
    if (await jsonLock(root))
      return unavailable("busy", "有一份答案正在评阅，请稍后查看保存结果。");
    try {
      const plan = shortProviderPlan(
        Date.now(),
        new Date().toISOString().slice(0, 10),
        body,
      );
      if (plan.reservation > policy.reservePerCallCNY)
        return unavailable(
          "quota_exhausted",
          "这份原答超出本次评阅的费用预留范围，原文已保留。",
        );
      if (await provider.permits(body))
        return {
          state: "ready",
          message: "点击评阅后，将整份原答一次发送给DeepSeek。",
        };
      return unavailable(
        "stopped",
        "AI评阅暂不可用，原答和已有讲解保留；不会自动发送。",
      );
    } catch {
      return unavailable(
        "price_window",
        "暂未确认评阅费用或服务状态，请稍后再查看，原答保留。",
      );
    }
  };
  return { provider, root, body, availability };
}
async function jsonLock(root: string) {
  try {
    await readFile(join(root, "active.lock"));
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return false;
    throw error;
  }
}

function prepareRecord(
  candidate: Awaited<ReturnType<typeof loadTableCandidate>>,
  item: Awaited<ReturnType<typeof loadTableCandidate>>["cases"][number],
  answers: TableAnswers,
  availabilityOnly = false,
): Stored {
  const pack = {
    ...item.pack,
    questions: item.pack.questions
      .map((q) => ({ ...q, answer: answers.find((a) => a.id === q.id)!.text }))
      .filter((q) => availabilityOnly || q.answer.trim()),
  };
  const requestBodyHash = unitDigest(wireFor({ pack }));
  return {
    version: SERVICE_VERSION,
    id: idFor(requestBodyHash),
    identity: candidate.identity,
    createdAt: new Date().toISOString(),
    requestBodyHash,
    case: item.item,
    answers,
    pack,
    phase: "running",
    failure: null,
    receipt: null,
    durationMs: 0,
  };
}

export async function readTableDailyAvailability(
  options: TableDailyOptions,
  caseId: string,
): Promise<TableAvailability> {
  try {
    const candidate = await loadTableCandidate(options.repo);
    const item = candidate.cases.find((c) => c.item.id === caseId);
    if (!item) return unavailable("read_error", "没有找到这道案例。");
    if (item.archived)
      return unavailable("archived", "本题为旧版，仅保留原答和旧评阅。");
    // Read-only budget/price probe with blank answers. Never executed or saved;
    // submission still checks the actual whole-sheet wire before using a key.
    const probe = prepareRecord(
      candidate,
      item,
      tableAnswers.parse(
        ["1", "2", "3", "4", "5"].map((id) => ({ id, text: "" })),
      ),
      true,
    );
    return await (await service(options, probe)).availability();
  } catch (error) {
    return unavailable(
      (error as NodeJS.ErrnoException).code === "ENOENT"
        ? "no_grant"
        : "read_error",
      "暂未取得日常评阅配置，原答已保留。",
    );
  }
}

/** Current HTTP path. Legacy trials are read-only here; new reviews use the
 * existing daily service, unchanged whole-case graph and cumulative budget. */
export async function evaluateTableDaily(
  raw: unknown,
  options: TableDailyOptions,
): Promise<ReviewedTableReply> {
  if (process.env.LVZHEN_ENV === "trial") throw Error("local-only");
  const req = tableRequest.parse(raw);
  if (req.action === "read") {
    const result = await readStored(options.repo, req.id);
    return result
      ? withExplanationReview(options.repo, { result })
      : evaluateTableTrial(req, { repo: options.repo });
  }
  if (req.action === "list") {
    const old = await evaluateTableTrial(req, { repo: options.repo });
    let files: string[] = [];
    try {
      files = await readdir(tableDailyRoot(options.repo));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
    const entries = await Promise.all(
      files
        .filter((f) => /^[a-f0-9]{64}\.json$/.test(f))
        .map((f) => readStored(options.repo, f.slice(0, -5))),
    );
    return {
      result: null,
      history: [
        ...(old.history ?? []),
        ...entries.filter(
          (r): r is TableResult => !!r && r.case.id === req.caseId,
        ),
      ]
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .slice(0, 20)
        .map(({ id, createdAt, state, total, maximum }) => ({
          id,
          createdAt,
          state,
          total,
          maximum,
        })),
      availability: await readTableDailyAvailability(options, req.caseId),
    };
  }
  // Old results win, without consulting credentials or renewing an old grant.
  const old = await evaluateTableTrial(
    { ...req, action: "lookup" },
    { repo: options.repo },
  );
  if (old.result) return old;
  const candidate = await loadTableCandidate(options.repo);
  const item = candidate.cases.find((c) => c.item.id === req.caseId);
  if (!item)
    return { result: null, message: "没有找到这道案例，请刷新页面后再试。" };
  const answers = [...req.answers].sort((a, b) => a.id.localeCompare(b.id));
  if (!answers.some((a) => a.text.trim()))
    return { result: null, message: "先写下至少一问的答案，再提交评阅。" };
  const record = prepareRecord(candidate, item, answers);
  const { pack, requestBodyHash } = record;
  const existing = await readStored(options.repo, record.id);
  if (existing)
    return withExplanationReview(options.repo, { result: existing });
  if (item.archived)
    return {
      result: null,
      availability: unavailable("archived", "本题为旧版，仅保留原答和旧评阅。"),
    };
  let daily: Awaited<ReturnType<typeof service>>;
  try {
    daily = await service(options, record);
  } catch (error) {
    return {
      result: null,
      availability: unavailable(
        (error as NodeJS.ErrnoException).code === "ENOENT"
          ? "no_grant"
          : "read_error",
        "暂未取得日常评阅配置，原答已保留。",
      ),
    };
  }
  const availability = await daily.availability();
  if (req.action === "lookup" || availability.state !== "ready")
    return { result: null, availability, message: availability.message };
  const file = join(tableDailyRoot(options.repo), `${record.id}.json`);
  await mkdir(tableDailyRoot(options.repo), { recursive: true, mode: 0o700 });
  try {
    await writeFile(file, wrapped(record), { flag: "wx", mode: 0o600 });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
    return { result: await readStored(options.repo, record.id) };
  }
  const started = performance.now();
  let attempted = false;
  try {
    const outcome = await buildTableTrialGraph(async (wire) => {
      if (attempted || unitDigest(wire) !== requestBodyHash)
        throw Error("duplicate-or-wire-drift");
      attempted = true;
      record.receipt = await daily.provider.execute(
        wire,
        options.signal ?? new AbortController().signal,
      );
      return {
        text: record.receipt.text,
        failure: record.receipt.failure,
        costCny: record.receipt.costCNY,
        durationMs: performance.now() - started,
      };
    }).invoke({ pack });
    record.failure =
      outcome.reply.failure ??
      (!outcome.assessment?.valid ? "invalid_table" : null);
  } catch {
    // A provider intent is the paid boundary. Busy/price/credential failures
    // before it may be tried later; any possible send is retained, never retried.
    if (
      (await json(join(daily.root, `${sampleId(record.id)}.intent.json`))) ===
      null
    ) {
      await unlink(file);
      const availability = await daily.availability();
      return {
        result: null,
        availability:
          availability.state === "ready"
            ? unavailable(
                "read_error",
                "本次未发送，原答保留；请稍后查看评阅服务。",
              )
            : availability,
      };
    }
    record.failure = "provider_result_unavailable";
  }
  record.phase = "finished";
  record.durationMs = performance.now() - started;
  await finish(file, record);
  return withExplanationReview(options.repo, {
    result: resultFrom(record),
    message: record.failure
      ? "本次评阅未完成，原答已保存，没有自动重试。"
      : undefined,
  });
}
