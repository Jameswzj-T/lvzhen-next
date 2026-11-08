import { z } from "zod";
import {
  validateModel,
  releaseIdentity,
  evaluationLimits,
} from "./model-config";
import { inputSchema } from "./index";
import { toFeedback } from "./feedback";
import {
  configSchema,
  priceSchema,
  runChatCompletion,
  type Transport,
} from "./provider";

const nonblank = z.string().refine((s) => s.trim().length > 0);
export const batchInputSchema = z
  .object({
    schemaVersion: z.literal(1),
    batchId: z.literal("B-004"),
    samples: z
      .array(
        z
          .object({
            sampleId: nonblank,
            group: z.enum(["calibration", "heldout"]),
            input: inputSchema.refine((v) => v.studentText.trim().length > 0),
          })
          .strict(),
      )
      .min(1)
      .max(12),
  })
  .strict()
  .superRefine((v, ctx) => {
    if (new Set(v.samples.map((s) => s.sampleId)).size !== v.samples.length)
      ctx.addIssue({ code: "custom", message: "Duplicate sample IDs" });
  });
export type BatchInput = z.infer<typeof batchInputSchema>;
const money = z.number().finite().nonnegative();
export const batchPlanSchema = z
  .object({
    runId: z.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,79}$/),
    mode: z.enum(["offline", "real"]),
    models: z
      .array(
        z
          .object({
            config: configSchema,
            maxCalls: z.number().int().min(1).max(12),
            price: priceSchema.nullable(),
          })
          .strict(),
      )
      .min(1)
      .max(2),
    maxTotalCalls: z.number().int().min(1).max(24),
    budget: z
      .object({
        currency: nonblank,
        limit: money,
        estimates: z
          .array(
            z
              .object({
                model: nonblank,
                sampleId: nonblank,
                maxCost: money,
                basis: nonblank,
              })
              .strict(),
          )
          .min(1)
          .max(24),
      })
      .strict(),
    saveTimeoutMs: z.number().int().min(1).max(5000),
  })
  .strict();
export type BatchPlan = z.infer<typeof batchPlanSchema>;
export type Evaluation = Awaited<ReturnType<typeof runChatCompletion>>;
export type BatchRecord = {
  sequence: number;
  sampleId: string;
  group: "calibration" | "heldout";
  requestedModel: string;
  release: ReturnType<typeof releaseIdentity>;
  estimatedMaxCost: number;
  estimateSource: "caller_asserted" | "fake_assumption";
  evaluation: Evaluation;
  feedback: ReturnType<typeof toFeedback>;
  feedbackDurationMs: number;
  anomaly?: "reasoning_tokens_detected";
};
export type StopReason =
  | "completed"
  | "aborted"
  | "call_limit"
  | "budget_limit"
  | "pricing_unavailable"
  | "unknown_cost"
  | "estimate_exceeded"
  | "preflight_failed"
  | "evaluation_failed"
  | "save_failed"
  | "execution_failed"
  | "reasoning_tokens_detected";
export type BatchSummary = {
  schemaVersion: 1;
  batchId: "B-004";
  runId: string;
  mode: "offline" | "real";
  stopReason: StopReason;
  calls: number;
  records: number;
  successes: number;
  failures: number;
  remaining: number;
  knownCost: number | null;
  unknownCostCalls: number;
  fakeReservedCost: number | null;
  currency: string;
};
/** begin must reserve a new run; write must durably preserve each item without overwriting. */
export type BatchSink = {
  begin: (manifest: { input: BatchInput; plan: BatchPlan }) => Promise<void>;
  write: (name: string, value: unknown) => Promise<void>;
};
export type BatchRuntime = {
  transports: Record<string, Transport>;
  credentials?: Record<string, string>;
  allowRealCall?: boolean;
  signal?: AbortSignal;
  sink: BatchSink;
};

/** Validate the entire comparison before even reserving output or invoking a transport. */
export function validateBatch(rawInput: unknown, rawPlan: unknown) {
  const input = batchInputSchema.parse(rawInput);
  const plan = batchPlanSchema.parse(rawPlan);
  const names = plan.models.map((m) => m.config.model);
  if (new Set(names).size !== names.length) throw new Error("Duplicate model");
  for (const { config } of plan.models) {
    if (config.timeoutMs > evaluationLimits(config).timeoutMs)
      throw new Error("Request deadline exceeds limit");
    validateModel(config);
  }
  const keys = plan.budget.estimates.map((e) =>
    JSON.stringify([e.model, e.sampleId]),
  );
  const expected = names.flatMap((name) =>
    input.samples.map((s) => JSON.stringify([name, s.sampleId])),
  );
  if (
    keys.length !== expected.length ||
    new Set(keys).size !== keys.length ||
    expected.some((k) => !keys.includes(k))
  )
    throw new Error("Estimates must match every model/sample pair exactly");
  return { input, plan };
}
async function boundedSave(action: () => Promise<void>, ms: number) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    await Promise.race([
      Promise.resolve().then(action),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error("save_failed")), ms);
      }),
    ]);
  } finally {
    if (timer !== undefined) clearTimeout(timer);
  }
}

export async function runBatch(
  rawInput: unknown,
  rawPlan: unknown,
  runtime: BatchRuntime,
) {
  const { input, plan } = validateBatch(rawInput, rawPlan);
  for (const { config } of plan.models) {
    const transport = runtime.transports[config.model];
    if (
      !transport ||
      transport.source !==
        (plan.mode === "real" ? "real_provider" : "offline_fake")
    )
      throw new Error("Transport mode mismatch");
    if (plan.mode === "real") {
      const credential = runtime.credentials?.[config.model];
      if (
        runtime.allowRealCall !== true ||
        !credential?.trim() ||
        /[\r\n]/.test(credential)
      )
        throw new Error("Explicit in-memory authorization required");
    }
  }
  const records: BatchRecord[] = [];
  const summary: BatchSummary = {
    schemaVersion: 1,
    batchId: "B-004",
    runId: plan.runId,
    mode: plan.mode,
    stopReason: "completed",
    calls: 0,
    records: 0,
    successes: 0,
    failures: 0,
    remaining: input.samples.length * plan.models.length,
    knownCost: plan.mode === "real" ? 0 : null,
    unknownCostCalls: 0,
    fakeReservedCost: plan.mode === "offline" ? 0 : null,
    currency: plan.budget.currency,
  };
  const save = (name: string, value: unknown) =>
    boundedSave(() => runtime.sink.write(name, value), plan.saveTimeoutMs);
  try {
    await boundedSave(
      () => runtime.sink.begin({ input, plan }),
      plan.saveTimeoutMs,
    );
  } catch {
    summary.stopReason = "save_failed";
    return { summary, records };
  }
  const samples = [...input.samples].sort(
    (a, b) => Number(a.group === "heldout") - Number(b.group === "heldout"),
  );
  outer: for (const model of plan.models) {
    let modelCalls = 0;
    for (const sample of samples) {
      if (runtime.signal?.aborted) {
        summary.stopReason = "aborted";
        break outer;
      }
      if (modelCalls >= model.maxCalls || summary.calls >= plan.maxTotalCalls) {
        summary.stopReason = "call_limit";
        break outer;
      }
      if (
        plan.mode === "real" &&
        (!model.price ||
          model.price.model !== model.config.model ||
          model.price.currency !== plan.budget.currency)
      ) {
        summary.stopReason = "pricing_unavailable";
        break outer;
      }
      const estimate = plan.budget.estimates.find(
        (e) => e.model === model.config.model && e.sampleId === sample.sampleId,
      )!;
      const spent =
        plan.mode === "real" ? summary.knownCost! : summary.fakeReservedCost!;
      if (spent + estimate.maxCost > plan.budget.limit) {
        summary.stopReason = "budget_limit";
        break outer;
      }
      const sequence = records.length + 1;
      // Intent remains available if a request or subsequent record write is interrupted.
      try {
        await save(`${sequence}-intent`, {
          sequence,
          sampleId: sample.sampleId,
          requestedModel: model.config.model,
          release: releaseIdentity(model.config, model.price),
          state: "pending_or_unknown",
          estimatedMaxCost: estimate.maxCost,
        });
      } catch {
        summary.stopReason = "save_failed";
        break outer;
      }
      if (runtime.signal?.aborted) {
        summary.stopReason = "aborted";
        break outer;
      }
      const start = performance.now();
      let evaluation: Evaluation;
      try {
        evaluation = await runChatCompletion(sample.input, model.config, {
          transport: runtime.transports[model.config.model],
          credential:
            plan.mode === "offline"
              ? "offline-placeholder"
              : runtime.credentials![model.config.model],
          allowRealCall: runtime.allowRealCall,
          signal: runtime.signal,
          price: model.price ?? undefined,
        });
      } catch {
        summary.stopReason = "execution_failed";
        break outer;
      }
      const feedback = toFeedback(sample.input, evaluation.result);
      const record: BatchRecord = {
        sequence,
        sampleId: sample.sampleId,
        group: sample.group,
        requestedModel: model.config.model,
        release: releaseIdentity(model.config, model.price),
        estimatedMaxCost: estimate.maxCost,
        estimateSource:
          plan.mode === "offline" ? "fake_assumption" : "caller_asserted",
        evaluation,
        feedback,
        feedbackDurationMs: Math.max(0, performance.now() - start),
      };
      records.push(record);
      const calls = evaluation.measurement.callCount;
      const usesNoThinking =
        model.config.thinking === "disabled" ||
        model.config.reasoningEffort === "none";
      if (usesNoThinking && (evaluation.measurement.reasoningTokens ?? 0) > 0) {
        record.anomaly = "reasoning_tokens_detected";
        record.feedback = toFeedback(sample.input, {
          ...evaluation.result,
          status: "system_error",
          criteria: [],
          substantiveIssue: null,
          terminologyIssue: null,
          clarification: null,
        });
      }
      modelCalls += calls;
      summary.calls += calls;
      summary.records++;
      summary.remaining--;
      if (plan.mode === "offline")
        summary.fakeReservedCost! += estimate.maxCost;
      else if (evaluation.measurement.cost === null)
        summary.unknownCostCalls += calls;
      else summary.knownCost! += evaluation.measurement.cost;
      if (evaluation.failure === null && !record.anomaly) summary.successes++;
      else summary.failures++;
      if (
        usesNoThinking &&
        evaluation.measurement.reasoningTokens &&
        evaluation.measurement.reasoningTokens > 0
      ) {
        summary.stopReason = "reasoning_tokens_detected";
        try {
          await save(`${sequence}-result`, record);
        } catch {
          summary.stopReason = "save_failed";
        }
        break outer;
      }
      try {
        await save(`${sequence}-result`, record);
      } catch {
        summary.stopReason = "save_failed";
        break outer;
      }
      if (runtime.signal?.aborted || evaluation.failure === "aborted") {
        summary.stopReason = "aborted";
        break outer;
      }
      if (plan.mode === "real" && summary.unknownCostCalls > 0) {
        summary.stopReason = "unknown_cost";
        break outer;
      }
      if (
        plan.mode === "real" &&
        evaluation.measurement.cost! > estimate.maxCost
      ) {
        summary.stopReason = "estimate_exceeded";
        break outer;
      }
      if (evaluation.failure !== null) {
        summary.stopReason = "evaluation_failed";
        break outer;
      }
    }
  }
  try {
    await save("summary", summary);
  } catch {
    summary.stopReason = "save_failed";
  }
  return { summary, records };
}
