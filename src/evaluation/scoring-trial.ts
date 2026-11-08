import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import {
  configSchema,
  priceSchema,
  runChatCompletion,
  createFetchTransport,
  type Transport,
  type ProviderConfig,
} from "./provider";
import { digest, validateModel, validateEndpoint } from "./model-config";
import { deepseekPeriod, priceWindowCovers } from "./price-window";
import { readProjectCredential } from "./project-credentials";
import { completeScoringLoop, type ScoringLoopTask } from "./scoring-loop";
import { resolvedTrialResponse } from "./scoring-resolution";
import { prepareBankReading, findingsFromReading } from "./bank-reading-cards";
import {
  scoringTrialTask,
  scoringTrialMaterial,
} from "./scoring-trial-catalog";
import {
  scoringTrialRequest,
  validateScoringTrialResponse,
  type ScoringTrialResponse,
} from "./scoring-trial-contract";

export const scoringTrialConfig = z
  .object({
    enabled: z.boolean(),
    validFrom: z.iso.datetime(),
    validUntil: z.iso.datetime(),
    maxCalls: z.number().int().min(1).max(60),
    budgetCny: z.number().positive().max(6),
    reservationCny: z.literal(0.1),
    // New grants get their own allowance; earlier intents/results are retained.
    grantId: z
      .string()
      .regex(/^[a-z0-9][a-z0-9-]{0,63}$/)
      .optional(),
    // Scope new calls to reviewed materials; old saved responses remain readable.
    caseIds: z.array(z.string().min(1).max(100)).min(1).optional(),
    // Pin the reviewed card independently of the model. Lookup may read retired cards.
    exerciseRevisions: z
      .record(z.string().min(1).max(100), z.string().min(1).max(150))
      .optional(),
    // Lookup only. These configurations can never authorize a provider call.
    historyConfigs: z.array(configSchema).max(4).optional(),
    workspace: z
      .object({
        region: z.literal("cn-beijing"),
        workspaceId: z.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9-]{0,62}$/),
      })
      .strict()
      .optional(),
    config: configSchema,
    pricing: z
      .object({
        checkedAt: z.string(),
        sourceUrl: z.url(),
        offPeak: z
          .object({ input: z.number(), cached: z.number(), output: z.number() })
          .strict(),
        peak: z
          .object({ input: z.number(), cached: z.number(), output: z.number() })
          .strict(),
      })
      .strict(),
  })
  .strict()
  .superRefine((c, ctx) => {
    for (const [caseId, revision] of Object.entries(
      c.exerciseRevisions ?? {},
    )) {
      try {
        if (
          (c.caseIds && !c.caseIds.includes(caseId)) ||
          scoringTrialMaterial(caseId, revision).exerciseRevision !== revision
        )
          throw new Error("unreviewed-card");
      } catch {
        ctx.addIssue({ code: "custom", message: "invalid-trial-revision" });
      }
    }
    const deepseek =
      c.config.model === "deepseek-flash" &&
      c.config.thinking === "disabled" &&
      !c.config.reasoningEffort &&
      !c.config.structuredOutput &&
      !c.workspace &&
      ((c.config.promptVariant === "findings-v2" &&
        c.config.timeoutMs <= 12000) ||
        (c.config.promptVariant === "findings-label-first-v1" &&
          c.config.temperature === 0 &&
          !!c.grantId &&
          !!c.caseIds?.length &&
          c.config.timeoutMs <= 20000));
    const qwen =
      c.config.model === "qwen3.8-flash" &&
      c.config.thinking === undefined &&
      c.config.reasoningEffort === "none" &&
      c.config.promptVariant === "findings-label-first-v1" &&
      c.config.structuredOutput === "strict-findings-v1" &&
      c.config.temperature === 0 &&
      !!c.workspace &&
      !!c.grantId &&
      c.config.timeoutMs <= 20000 &&
      digest(c.pricing.offPeak) === digest(c.pricing.peak);
    if (
      (!deepseek && !qwen) ||
      c.config.identityMode !== "harness" ||
      c.config.evidenceMode !== "segment_ids" ||
      c.config.maxTokens > 2048 ||
      Math.round(c.maxCalls * c.reservationCny * 1e6) >
        Math.round(c.budgetCny * 1e6) ||
      Date.parse(c.validUntil) <= Date.parse(c.validFrom) ||
      Date.parse(c.validUntil) - Date.parse(c.validFrom) > 3 * 86400000 ||
      Object.values(c.pricing.offPeak).some((v) => v < 0) ||
      Object.values(c.pricing.peak).some((v) => v < 0) ||
      (c.caseIds && new Set(c.caseIds).size !== c.caseIds.length) ||
      c.historyConfigs?.some(
        (config) =>
          !["findings-v2", "findings-label-first-v1"].includes(
            config.promptVariant ?? "",
          ),
      )
    )
      ctx.addIssue({ code: "custom", message: "invalid-trial-config" });
  });
export const scoringTrialRoot = (repo: string) =>
  join(repo, "artifacts", "scoring-ui-trial");
const pending = { status: "pending", reason: "waiting" } as const;
const closed = { status: "unavailable", reason: "closed" } as const;
async function atomic(path: string, value: unknown) {
  const temp = `${path}.${randomUUID()}.tmp`;
  await writeFile(temp, JSON.stringify(value), { flag: "wx", mode: 0o600 });
  await rename(temp, path);
}

// Derived decisions have their own version/id. Never rewrite the original
// provider response, score, cache key or budget reservation on a free lookup.
async function presentResolvedTrial(
  root: string,
  recordId: string,
  task: ScoringLoopTask,
  reply: unknown,
  source: Extract<ScoringTrialResponse, { status: "ready" }>,
): Promise<ScoringTrialResponse> {
  try {
    const result = resolvedTrialResponse(task, reply, source);
    validateScoringTrialResponse(source.caseId, source.answer, result.response);
    const record = { recordId, ...result };
    const folder = join(root, "decisions");
    const path = join(folder, `${recordId}-${result.decision.decisionId}.json`);
    await mkdir(folder, { recursive: true });
    try {
      await writeFile(path, JSON.stringify(record), {
        flag: "wx",
        mode: 0o600,
      });
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== "EEXIST") throw e;
      const saved = JSON.parse(await readFile(path, "utf8"));
      if (digest(saved) !== digest(record))
        throw new Error("saved-resolution-mismatch");
    }
    return result.response;
  } catch {
    // The canonical successful answer must survive a derived-record failure;
    // a later lookup can recover it without spending or sending another call.
    return { status: "failed", reason: "storage_failed" };
  }
}
// Rebuild saved scores against their original model/protocol identity. Switching
// providers does not turn a refresh or history lookup into a new evaluation.
async function readSavedTrial(
  root: string,
  recordId: string,
  task: ScoringLoopTask,
  config: ProviderConfig,
  material: ReturnType<typeof scoringTrialMaterial>,
  reading?: ReturnType<typeof prepareBankReading>,
): Promise<ScoringTrialResponse | undefined> {
  const path = join(root, "answers", `${recordId}.json`);
  try {
    const stored = JSON.parse(await readFile(path, "utf8"));
    if (
      stored.scoringId !== task.scoringId ||
      stored.recordId !== recordId ||
      digest(stored.config) !== digest(config)
    )
      throw new Error("cache-mismatch");
    const response = validateScoringTrialResponse(
      task.assessment.original.caseId,
      task.assessment.original.studentText,
      stored.response,
    );
    if (response.status === "ready") {
      const reply = {
        status: "completed",
        requestId: task.assessment.requestId,
        observations: reading
          ? findingsFromReading(reading, stored.evaluation?.observations)
          : stored.evaluation?.observations,
      };
      const rebuilt = completeScoringLoop(task, reply);
      const visible = rebuilt.items.map(
        ({
          criterionId,
          title,
          earned,
          maxScore,
          feedback,
          evidence,
          pendingReason,
        }) => ({
          criterionId,
          title,
          earned,
          maxScore,
          feedback,
          evidence,
          ...(pendingReason ? { pendingReason } : {}),
        }),
      );
      if (
        response.scoringId !== task.scoringId ||
        response.resolution !== undefined ||
        response.diagnosisPending !== undefined ||
        rebuilt.status !== response.judgment ||
        rebuilt.total !== response.total ||
        rebuilt.maxScore !== response.maxScore ||
        digest(visible) !== digest(response.items) ||
        response.reference !== material.reference ||
        digest(response.sources) !== digest(material.sources)
      )
        throw new Error("cached-score-mismatch");
      return presentResolvedTrial(root, recordId, task, reply, response);
    }
    return response;
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code !== "ENOENT")
      return { status: "failed", reason: "storage_failed" };
  }
}

export { allowScoringTrialRequest } from "./local-scoring-access";
export async function evaluateScoringTrial(
  raw: unknown,
  deps: {
    repo: string;
    transport?: Transport;
    credential?: () => Promise<string>;
    now?: () => number;
    // Internal experiment only; never accepted from the browser request.
    // Shares the existing grant ledger, but has its own task/cache identity.
    experimentProtocol?: "findings-v3" | "readings-v1";
  },
): Promise<ScoringTrialResponse> {
  const request = scoringTrialRequest.parse(raw);
  const material = scoringTrialMaterial(
    request.caseId,
    request.exerciseRevision,
  );
  if (material.exerciseRevision !== request.exerciseRevision)
    throw new Error("question-revision-mismatch");
  const root = scoringTrialRoot(deps.repo);
  let grant: z.infer<typeof scoringTrialConfig>;
  try {
    grant = scoringTrialConfig.parse(
      JSON.parse(await readFile(join(root, "config.json"), "utf8")),
    );
    const profile = validateModel(grant.config);
    validateEndpoint(grant.config, profile, grant.workspace);
    if (
      !profile.priceSources.includes(grant.pricing.sourceUrl.replace(/\/$/, ""))
    )
      return closed;
  } catch {
    return closed;
  }
  if (deps.experimentProtocol) {
    if (grant.config.model !== "deepseek-flash")
      throw new Error("experiment-not-in-grant");
    if (
      deps.experimentProtocol !== "findings-v3" &&
      deps.experimentProtocol !== "readings-v1"
    )
      throw new Error("unknown-experiment");
    grant = {
      ...grant,
      config: { ...grant.config, promptVariant: deps.experimentProtocol },
    };
  }
  const task = scoringTrialTask(
    request.caseId,
    request.answer,
    deps.experimentProtocol === "findings-v3"
      ? "findings-v3"
      : grant.config.promptVariant === "findings-label-first-v1"
        ? "findings-label-first-v1"
        : "findings-v2",
    request.exerciseRevision,
  );
  const reading =
    deps.experimentProtocol === "readings-v1"
      ? prepareBankReading(task.assessment.original)
      : undefined;
  const ledger = grant.grantId ? join(root, "grants", grant.grantId) : root;
  // Price windows/remaining allowance are not cache identity. A refresh must
  // recover the same result across price bands and after closing new calls.
  const recordId = digest({
    scoringId: task.scoringId,
    config: grant.config,
    ...(reading ? { readingId: reading.readingId } : {}),
  });
  const path = join(root, "answers", `${recordId}.json`);
  const saved = await readSavedTrial(
    root,
    recordId,
    task,
    grant.config,
    material,
    reading,
  );
  if (saved) return saved;
  if (request.action === "lookup" && !deps.experimentProtocol) {
    for (const config of grant.historyConfigs ?? []) {
      const oldTask = scoringTrialTask(
        request.caseId,
        request.answer,
        config.promptVariant === "findings-label-first-v1"
          ? "findings-label-first-v1"
          : "findings-v2",
        request.exerciseRevision,
      );
      const oldId = digest({ scoringId: oldTask.scoringId, config });
      const oldResult = await readSavedTrial(
        root,
        oldId,
        oldTask,
        config,
        material,
      );
      if (oldResult) return oldResult;
    }
  }
  if (grant.caseIds && !grant.caseIds.includes(request.caseId)) return closed;
  const activeRevision =
    grant.exerciseRevisions?.[request.caseId] ??
    scoringTrialMaterial(request.caseId).exerciseRevision;
  if (material.exerciseRevision !== activeRevision) return closed;
  const now = (deps.now ?? Date.now)();
  if (
    !grant.enabled ||
    now < Date.parse(grant.validFrom) ||
    now + grant.config.timeoutMs >= Date.parse(grant.validUntil)
  )
    return closed;
  try {
    await readFile(join(ledger, "stopped"));
    return closed;
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code !== "ENOENT") return closed;
  }
  if (request.action === "lookup")
    return { status: "not_requested", reason: "available" };
  const period =
      grant.config.model === "deepseek-flash" ? deepseekPeriod(now) : "fixed",
    rates =
      period === "deepseek_peak" ? grant.pricing.peak : grant.pricing.offPeak;
  const price = priceSchema.parse({
    model: grant.config.model,
    sourceUrl: grant.pricing.sourceUrl,
    checkedAt: grant.pricing.checkedAt,
    currency: "CNY",
    inputBilling: "cache_split",
    outputIncludesReasoning: true,
    inputPerMillion: rates.input,
    cacheHitPerMillion: rates.cached,
    outputPerMillion: rates.output,
    billingWindow: {
      validFrom: new Date(now).toISOString(),
      validUntil: new Date(now + grant.config.timeoutMs + 2000).toISOString(),
      period,
    },
  });
  if (
    !priceWindowCovers(
      price.billingWindow!,
      grant.config.model,
      now,
      now + grant.config.timeoutMs,
    )
  )
    return closed;
  const maxInput =
    Buffer.byteLength(
      JSON.stringify(
        reading
          ? { instructions: reading.instructions, input: reading.input }
          : task.assessment.request,
      ),
      "utf8",
    ) + 4096;
  if (
    (maxInput * rates.input + grant.config.maxTokens * rates.output) / 1e6 >
    grant.reservationCny
  )
    return closed;
  const base = {
    recordId,
    scoringId: task.scoringId,
    task,
    config: grant.config,
    price,
    ...(reading ? { reading } : {}),
  };
  try {
    await mkdir(join(root, "answers"), { recursive: true });
    await writeFile(path, JSON.stringify({ ...base, response: pending }), {
      flag: "wx",
      mode: 0o600,
    });
  } catch (e) {
    return (e as NodeJS.ErrnoException).code === "EEXIST"
      ? pending
      : { status: "failed", reason: "storage_failed" };
  }
  let stage = "reserve";
  try {
    await mkdir(ledger, { recursive: true });
    let slot: number | undefined;
    for (let i = 1; i <= grant.maxCalls; i++) {
      try {
        await writeFile(
          join(ledger, `call-${i}.intent.json`),
          JSON.stringify({
            recordId,
            reservedCny: grant.reservationCny,
            status: "pending_or_unknown",
            createdAt: new Date(now).toISOString(),
          }),
          { flag: "wx", mode: 0o600 },
        );
        slot = i;
        break;
      } catch (e) {
        if ((e as NodeJS.ErrnoException).code !== "EEXIST") throw e;
      }
    }
    if (!slot) {
      const response = { status: "unavailable", reason: "limit" } as const;
      await atomic(path, { ...base, response });
      return response;
    }
    stage = "credential";
    const credential = await (
      deps.credential ?? (() => readProjectCredential(grant.config, deps.repo))
    )();
    stage = "provider";
    const evaluation = await runChatCompletion(
      reading?.input ?? task.assessment.original,
      grant.config,
      {
        credential,
        allowRealCall: true,
        transport: deps.transport ?? createFetchTransport(fetch),
        price,
        captureFinalOutput: true,
        criterionPolicy: reading
          ? reading.input.criteria.map((p) => ({
              id: p.id,
              requiresFactualSupport: false,
            }))
          : task.assessment.plan.criterionPolicy,
      },
    );
    const accountingBad =
      evaluation.measurement.source === "real_provider" &&
      (evaluation.measurement.cost === null ||
        evaluation.measurement.cost > grant.reservationCny ||
        evaluation.measurement.model !== grant.config.model ||
        (evaluation.measurement.reasoningTokens ?? 0) > 0);
    stage = "scoring";
    const reply = evaluation.failure
      ? {
          status: "failed",
          requestId: task.assessment.requestId,
          code:
            evaluation.failure === "timeout"
              ? "execution_timeout"
              : "execution_failed",
        }
      : {
          status: "completed",
          requestId: task.assessment.requestId,
          observations: reading
            ? findingsFromReading(reading, evaluation.observations)
            : evaluation.observations,
        };
    const scored = completeScoringLoop(task, reply);
    const response: ScoringTrialResponse =
      accountingBad ||
      scored.status === "unavailable" ||
      scored.status === "no_answer"
        ? {
            status: "failed",
            reason: accountingBad ? "accounting_failed" : "evaluation_failed",
          }
        : {
            status: "ready",
            caseId: request.caseId,
            answer: request.answer,
            scoringId: task.scoringId,
            judgment: scored.status,
            total: scored.total,
            maxScore: scored.maxScore,
            items: scored.items.map(
              ({
                criterionId,
                title,
                earned,
                maxScore,
                feedback,
                evidence,
                pendingReason,
              }) => ({
                criterionId,
                title,
                earned,
                maxScore,
                feedback,
                evidence,
                ...(pendingReason ? { pendingReason } : {}),
              }),
            ),
            reference: material.reference,
            sources: material.sources,
            durationMs: evaluation.measurement.durationMs,
            createdAt: evaluation.measurement.endedAt,
            source:
              evaluation.measurement.source === "real_provider"
                ? "model_trial"
                : "offline_test",
          };
    validateScoringTrialResponse(request.caseId, request.answer, response);
    stage = "persist";
    // Local trial presentation does not promote scored.publishable=false into a formal grade.
    if (accountingBad)
      await writeFile(join(ledger, "stopped"), "accounting-review-required", {
        mode: 0o600,
      });
    await atomic(path, { ...base, response, evaluation, scored });
    return response.status === "ready"
      ? presentResolvedTrial(root, recordId, task, reply, response)
      : response;
  } catch {
    const response = {
      status: "failed",
      reason:
        stage === "persist" || stage === "reserve"
          ? "storage_failed"
          : "evaluation_failed",
    } as const;
    try {
      await atomic(path, { ...base, response, failureStage: stage });
    } catch {
      /* Keep pending intent; never resend. */
    }
    return response;
  }
}
