import {
  mkdir,
  readFile,
  readdir,
  writeFile,
  unlink,
  access,
} from "node:fs/promises";
import { createHash } from "node:crypto";
import { join, resolve, sep } from "node:path";
import { tmpdir } from "node:os";
import { z } from "zod";
import { digest } from "../model-config";
import { parseUniqueJson } from "../unique-json";
import { createFetchTransport, priceSchema, type Transport } from "../provider";
import { readProjectCredential } from "../project-credentials";
import {
  readShortModel,
  shortProviderPlan,
  SHORT_TIMEOUT_MS,
} from "../short-table/provider";
import { loadRewriteCandidate } from "./candidate";
import {
  loadReasoningPreview,
  REASONING_PREVIEW_ROOT,
} from "./reasoning-preview";
import {
  inspectReasoningReply,
  reasoningRequest,
  reasoningPeakBound,
  REASONING_IDS,
} from "./reasoning-rewrite";
import type { SyntheticPair } from "./contract";

export const REASONING_TRIAL_ROOT = "artifacts/reasoning-lrf-two-2026-10-03";
export const REASONING_TRIAL_ID = "reasoning-lrf-two-20261003";
export const REASONING_TRIAL_RUNTIME = [
  "checks/reasoning-rewrite-trial.ts",
  "src/evaluation/rewrite-comparison/reasoning-trial.ts",
  "src/evaluation/rewrite-comparison/reasoning-preview.ts",
];
const hashSchema = z.string().regex(/^[a-f0-9]{64}$/);
export const reasoningAuthorizationSchema = z
  .object({
    id: z.literal(REASONING_TRIAL_ID),
    enabled: z.literal(true),
    scope: z.literal("synthetic_only"),
    decisionSource: z.enum(["user_approval", "offline_fixture"]),
    decisionReference: z.string().regex(/^[a-zA-Z0-9_:/.\-]{1,200}$/),
    approvedAt: z.iso.datetime(),
    validFrom: z.iso.datetime(),
    validUntil: z.iso.datetime(),
    candidateFreezeHash: hashSchema,
    requestHashes: z.tuple([hashSchema, hashSchema]),
    maxCalls: z.literal(2),
    perCallReservedCny: z.literal(0.3),
    totalReservedCny: z.literal(0.6),
    aggregateMaxCalls: z.literal(40),
    aggregateBudgetCny: z.literal(8),
    productionUserAnswersAllowed: z.literal(false),
    scopedResumptionApproved: z.literal(true),
    oldStopsAndGrants: z.record(z.string(), hashSchema),
    price: priceSchema,
  })
  .strict()
  .refine(
    (a) =>
      a.approvedAt === a.validFrom &&
      Date.parse(a.validUntil) > Date.parse(a.validFrom) &&
      Date.parse(a.validUntil) - Date.parse(a.validFrom) <= 3600000,
  );
export type ReasoningAuthorization = z.infer<
  typeof reasoningAuthorizationSchema
>;
const read = async (p: string): Promise<any> =>
  parseUniqueJson(await readFile(p, "utf8"));
const hash = async (p: string) =>
  createHash("sha256")
    .update(await readFile(p))
    .digest("hex");
const save = (p: string, data: unknown) =>
  writeFile(p, JSON.stringify(data, null, 2) + "\n", {
    flag: "wx",
    mode: 0o600,
  });
const exists = async (p: string) => {
  try {
    await access(p);
    return true;
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return false;
    throw e;
  }
};
function requireTrue(value: unknown, code: string): asserts value {
  if (!value) throw Error(code);
}
const sameHashes = (
  actual: Record<string, string>,
  expected: Record<string, string>,
) =>
  Object.keys(actual).length === Object.keys(expected).length &&
  Object.entries(expected).every(([file, hash]) => actual[file] === hash);
type OfflineHarness = {
  tempRoot: string;
  transport: Transport;
  readCredential: () => Promise<string>;
  now?: () => number;
};

// There is no authorization writer, retry/reset mode or learner-answer input.
// A harness can use only fake transport and its own temporary ledger.
export function createReasoningTrial(repo: string, offline?: OfflineHarness) {
  if (offline)
    requireTrue(
      offline.transport.source === "offline_fake" &&
        resolve(offline.tempRoot).startsWith(resolve(tmpdir()) + sep),
      "offline-harness-required",
    );
  const root = offline
    ? join(offline.tempRoot, "trial")
    : join(repo, REASONING_TRIAL_ROOT);
  const calls = offline
    ? join(offline.tempRoot, "calls")
    : join(repo, "artifacts/short-table-trial/calls");
  const lock = offline
    ? join(offline.tempRoot, "active.lock")
    : join(repo, "artifacts/table-local-trial/active.lock");
  const history = offline
    ? join(offline.tempRoot, "history.json")
    : join(
        repo,
        "artifacts/unit-benefit-validation-2026-10-01/ledger-after.json",
      );
  const now = offline?.now ?? Date.now;
  const source = offline
    ? ("offline_fake" as const)
    : ("real_provider" as const);
  const frozenPath = join(
    repo,
    REASONING_PREVIEW_ROOT,
    "candidate-freeze.json",
  );

  async function candidate() {
    const preview = await loadReasoningPreview(repo),
      frozen = await read(frozenPath);
    const pairs: SyntheticPair[] = (
      await read(join(repo, REASONING_PREVIEW_ROOT, "pairs.json"))
    ).pairs;
    const base = await loadRewriteCandidate(repo);
    const requests = pairs.map((pair) => ({
      pair,
      request: reasoningRequest(base, pair),
      requestHash: preview.samples.find((s) => s.id === pair.id)!.requestHash,
    }));
    for (const [p, h] of Object.entries(frozen.oldStopsAndGrants))
      requireTrue(
        (await hash(join(repo, p))) === h,
        "old-stop-or-grant-changed",
      );
    return { preview, frozen, base, requests };
  }
  async function ledger() {
    if (!offline)
      requireTrue(
        (await hash(history)) ===
          "dd2c3d53cb68e7989e60aa07e3ab92c78c28797121a013807408e9d4e69131c3",
        "historical-audit-changed",
      );
    const files = await readdir(calls),
      intents = files.filter((f) => f.endsWith(".intent.json")).sort();
    requireTrue(
      intents.length ===
        files.filter((f) => f.endsWith(".response.json")).length,
      "usage-unknown-or-inflight",
    );
    const rows = [];
    for (const file of intents) {
      const id = file.slice(0, -12),
        ip = join(calls, file),
        rp = join(calls, id + ".response.json");
      const i = await read(ip),
        r = await read(rp),
        u = r.usage;
      requireTrue(
        i.id === id &&
          r.id === id &&
          r.responseId &&
          r.endedAt &&
          u &&
          Number.isFinite(r.cost?.amount) &&
          r.cost.amount >= 0,
        "usage-unknown-or-inflight",
      );
      for (const k of ["inputTokens", "outputTokens", "totalTokens"])
        requireTrue(
          Number.isInteger(u[k]) && u[k] >= 0,
          "usage-unknown-or-inflight",
        );
      requireTrue(
        u.inputTokens + u.outputTokens === u.totalTokens,
        "usage-unknown-or-inflight",
      );
      rows.push({
        id,
        grantId: i.grantId,
        wireHash: i.wireHash ?? digest(i.request),
        costCny: r.cost.amount,
        intentHash: await hash(ip),
        receiptHash: await hash(rp),
      });
    }
    const old = await read(history);
    requireTrue(
      old.calls === 32 && old.rows.length === 32,
      "historical-audit-invalid",
    );
    for (const oldRow of old.rows) {
      const row = rows.find((r) => r.id === oldRow.id);
      requireTrue(
        row &&
          row.intentHash === oldRow.intentHash &&
          row.receiptHash === oldRow.receiptHash,
        "historical-ledger-changed",
      );
    }
    return {
      calls: rows.length,
      costCny: Number(rows.reduce((s, r) => s + r.costCny, 0).toFixed(8)),
      rows,
    };
  }
  async function authorized(c: Awaited<ReturnType<typeof candidate>>) {
    requireTrue(
      await exists(join(root, "authorization.json")),
      "current-authorization-missing",
    );
    const parsed = reasoningAuthorizationSchema.safeParse(
      await read(join(root, "authorization.json")),
    );
    requireTrue(parsed.success, "authorization-contract-invalid");
    const a = parsed.data!;
    requireTrue(
      a.decisionSource === (offline ? "offline_fixture" : "user_approval"),
      "authorization-source-invalid",
    );
    requireTrue(
      a.candidateFreezeHash === c.preview.manifestHash &&
        a.requestHashes.join() ===
          c.requests.map((r) => r.requestHash).join() &&
        sameHashes(a.oldStopsAndGrants, c.frozen.oldStopsAndGrants),
      "authorization-scope-mismatch",
    );
    requireTrue(
      now() >= Date.parse(a.validFrom) &&
        now() + SHORT_TIMEOUT_MS < Date.parse(a.validUntil),
      "authorization-window-expired",
    );
    const p = a.price;
    requireTrue(
      p.model === "deepseek-flash" &&
        p.currency === "CNY" &&
        p.inputBilling === "cache_split" &&
        p.inputPerMillion === 2 &&
        p.cacheHitPerMillion === 0.04 &&
        p.outputPerMillion === 8 &&
        !p.billingWindow &&
        p.sourceUrl ===
          "https://api-docs.deepseek.com/zh-cn/quick_start/pricing/" &&
        p.checkedAt === new Date(now()).toISOString().slice(0, 10),
      "current-peak-price-required",
    );
    return a;
  }
  async function inspect() {
    const c = await candidate(),
      l = await ledger();
    let authorizationState = "valid",
      blockers: string[] = [];
    try {
      await authorized(c);
    } catch (e) {
      authorizationState = "unavailable";
      blockers.push((e as Error).message);
    }
    if (await exists(lock)) blockers.push("shared-call-active");
    if (await exists(join(root, "stopped.json")))
      blockers.push("this-batch-stopped");
    return {
      mode: "inspect-only",
      model: c.preview.model,
      ids: REASONING_IDS,
      maxCalls: 2,
      perCallReservedCny: 0.3,
      totalReservedCny: 0.6,
      requests: c.requests.map((r) => ({
        id: r.pair.id,
        requestHash: r.requestHash,
        worstCaseCny: reasoningPeakBound(r.request).maxCostCny,
      })),
      ledger: {
        calls: l.calls,
        estimatedCostCny: l.costCny,
        maxCalls: 40,
        budgetCny: 8,
      },
      authorizationState,
      blockers,
      prepared: await exists(join(root, "execution-freeze.json")),
      sendsRequests: false,
      createsAuthorization: false,
      source,
    };
  }
  async function prepare() {
    const c = await candidate(),
      a = await authorized(c),
      l = await ledger();
    requireTrue(
      !(await exists(lock)) && !(await exists(join(root, "stopped.json"))),
      "call-active-or-batch-stopped",
    );
    requireTrue(
      !l.rows.some(
        (r) =>
          r.grantId === REASONING_TRIAL_ID ||
          c.requests.some((q) => q.requestHash === r.wireHash),
      ),
      "already-attempted-no-retry",
    );
    requireTrue(
      l.calls + 2 <= 40 && l.costCny + 0.6 <= 8,
      "aggregate-budget-exceeded",
    );
    const runtime = Object.fromEntries(
      await Promise.all(
        REASONING_TRIAL_RUNTIME.map(async (p) => [
          p,
          await hash(join(repo, p)),
        ]),
      ),
    );
    await mkdir(root, { recursive: true });
    await save(join(root, "execution-freeze.json"), {
      source,
      authorizationHash: digest(a),
      candidateFreezeHash: c.preview.manifestHash,
      runtime,
      ledgerBefore: l,
      requestHashes: a.requestHashes,
      price: a.price,
      totalReservedCny: 0.6,
    });
    return {
      mode: "prepared-no-request",
      maxCalls: 2,
      totalReservedCny: 0.6,
      source,
    };
  }
  async function verified() {
    const c = await candidate(),
      a = await authorized(c),
      f = await read(join(root, "execution-freeze.json"));
    requireTrue(
      f.source === source &&
        f.authorizationHash === digest(a) &&
        f.candidateFreezeHash === c.preview.manifestHash &&
        f.requestHashes.join() === a.requestHashes.join(),
      "prepared-execution-mismatch",
    );
    for (const [p, h] of Object.entries(f.runtime))
      requireTrue((await hash(join(repo, p))) === h, "execution-runtime-drift");
    return { c, a, f };
  }
  async function run(id: string) {
    const index = REASONING_IDS.indexOf(id as (typeof REASONING_IDS)[number]);
    requireTrue(index >= 0, "fixed-sample-id-required");
    const first = await verified();
    requireTrue(
      !(await exists(join(root, "stopped.json"))),
      "this-batch-stopped",
    );
    const target = first.c.requests[index],
      key = digest({
        grantId: REASONING_TRIAL_ID,
        requestHash: target.requestHash,
      });
    await save(lock, { id: key, grantId: REASONING_TRIAL_ID });
    try {
      const intent = join(calls, key + ".intent.json"),
        receipt = join(calls, key + ".response.json");
      requireTrue(
        !(await exists(intent)) && !(await exists(receipt)),
        "already-attempted-no-retry",
      );
      const check = async () => {
        const v = await verified(),
          l = await ledger();
        requireTrue((await read(lock)).id === key, "shared-lock-owner-changed");
        requireTrue(
          !(await exists(join(root, "stopped.json"))),
          "this-batch-stopped",
        );
        requireTrue(
          l.calls === v.f.ledgerBefore.calls + index &&
            l.rows.filter((r) => r.grantId === REASONING_TRIAL_ID).length ===
              index,
          "serial-ledger-drift",
        );
        requireTrue(
          l.calls < 40 &&
            l.costCny + 0.3 <= 8 &&
            !l.rows.some((r) => r.wireHash === target.requestHash),
          "budget-or-duplicate-request",
        );
        if (index === 1) {
          const review = await read(join(root, "LRF01-review.json")),
            resultPath = join(root, REASONING_IDS[0] + "-result.json"),
            result = await read(resultPath);
          requireTrue(
            review.resultHash === (await hash(resultPath)) &&
              result.requestHash === first.c.requests[0].requestHash &&
              result.receiptHash ===
                (await hash(
                  join(calls, result.receiptKey + ".response.json"),
                )) &&
              review.criteriaHash ===
                first.c.frozen.inputHashes["prior-criteria.json"] &&
              review.readFullRawReceipt === true &&
              review.allowNext === true &&
              !result.failure &&
              result.assessment.structuralValid,
            "first-raw-receipt-review-required",
          );
        }
        return { v, l };
      };
      let current = await check();
      const plan = () => {
        const p = shortProviderPlan(
            now(),
            current.v.a.price.checkedAt,
            target.request,
          ),
          bound = reasoningPeakBound(target.request);
        return {
          ...p,
          price: current.v.a.price,
          inputCeiling: bound.inputTokenCeiling,
          reservation: 0.3,
        };
      };
      const credential = offline
        ? await offline.readCredential()
        : await readProjectCredential(plan().config, repo);
      current = await check();
      const p = plan();
      await save(intent, {
        id: key,
        grantId: REASONING_TRIAL_ID,
        sampleId: id,
        source,
        inputProvenance: "authored_fiction",
        request: target.request,
        wireHash: target.requestHash,
        provider: "deepseek",
        model: p.config.model,
        reservationCny: 0.3,
        authorizationHash: digest(current.v.a),
        ledgerBefore: current.l.calls,
      });
      try {
        await verified();
        let rawBody: string | null = null;
        const delegate = offline?.transport ?? createFetchTransport(fetch);
        const recording: Transport = {
          source,
          send: async (request) => {
            const response = await delegate.send(request);
            rawBody = response.body;
            return response;
          },
        };
        const model = await readShortModel(
          target.request,
          p,
          credential,
          recording,
        );
        const rawSafe =
          rawBody !== null && !(rawBody as string).includes(credential);
        await save(receipt, {
          id: key,
          ...model.receipt,
          rawResponseBody: rawSafe ? rawBody : null,
          rawResponseOmitted: !rawSafe,
          quotaCostBasis: "official_peak_conservative_estimate_not_invoice",
        });
        const assessment = inspectReasoningReply(
          model.text,
          current.v.c.base,
          target.pair,
        );
        const failure =
          model.failure ??
          (!model.receipt.responseId || model.receipt.usage.totalTokens === null
            ? "receipt-accounting-unverified"
            : !assessment.structuralValid
              ? "structure-or-evidence-invalid"
              : null);
        await save(join(root, id + "-result.json"), {
          source,
          requestHash: target.requestHash,
          receiptKey: key,
          receiptHash: await hash(receipt),
          assessment,
          failure,
          automaticDisplay: false,
          manualSemanticReviewRequired: true,
        });
        if (failure || index === 1)
          await save(join(root, "stopped.json"), {
            reason: failure ?? "approved-two-call-complete",
            at: new Date(now()).toISOString(),
            noRetry: true,
          });
        return {
          source,
          sampleId: id,
          responseId: model.receipt.responseId,
          usage: model.receipt.usage,
          costEstimate: model.receipt.cost,
          failure,
          manualSemanticReviewRequired: true,
        };
      } catch {
        if (!(await exists(join(root, "stopped.json"))))
          await save(join(root, "stopped.json"), {
            reason: "result-unknown-no-retry",
            at: new Date(now()).toISOString(),
            noRetry: true,
          });
        throw Error("result-unknown-no-retry");
      }
    } finally {
      if (await exists(lock)) {
        requireTrue((await read(lock)).id === key, "shared-lock-owner-changed");
        await unlink(lock);
      }
    }
  }
  return { inspect, prepare, run };
}
