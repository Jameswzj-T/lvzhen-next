import { z } from "zod";
import { STRICT_FINDINGS_FORMAT } from "./criterion-label-first";
import {
  answerSegments,
  resolveReferences,
  referenceInstructions,
  assessmentInput,
  resolveAssessment,
} from "./evidence-references";
import { validationIssues, type ProviderDiagnostic } from "./diagnostics";
import { DuplicateJsonKeyError, parseUniqueJson } from "./unique-json";
import { priceWindowSchema, priceWindowCovers } from "./price-window";
import {
  observationInstructions,
  isObservationProtocol,
  observationInput,
  resolveObservations,
  validateCriterionPolicy,
  type CriterionPolicy,
  type ObservationOutput,
} from "./semantic-observations";
import {
  buildModelInput,
  EVALUATION_INSTRUCTIONS,
  inputSchema,
  validateResult,
  type EvaluationInput,
  type EvaluationResult,
} from "./index";

export type Failure =
  | "price_window_expired"
  | "aborted"
  | "timeout"
  | "transport_error"
  | "http_error"
  | "response_parse_error"
  | "response_shape_error"
  | "refused"
  | "truncated"
  | "unexpected_finish"
  | "result_parse_error"
  | "result_validation_error"
  | "provider_system_error";
export type TransportRequest = {
  endpoint: string;
  credential: string;
  body: string;
  signal: AbortSignal;
};
export type Transport = {
  source: "offline_fake" | "real_provider";
  send: (
    request: TransportRequest,
  ) => Promise<{ status: number; body: string }>;
};

/** No global fetch or environment lookup. Creating this transport makes no request. */
export function createFetchTransport(fetchImpl: typeof fetch): Transport {
  return {
    source: "real_provider",
    send: async ({ endpoint, credential, body, signal }) => {
      const response = await fetchImpl(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${credential}`,
        },
        body,
        signal,
        redirect: "error",
      });
      return { status: response.status, body: await response.text() };
    },
  };
}

export const configSchema = z
  .object({
    endpoint: z.url().refine((value) => {
      const url = new URL(value);
      return (
        url.protocol === "https:" &&
        !url.username &&
        !url.password &&
        !url.search &&
        !url.hash
      );
    }),
    model: z.string().min(1),
    evidenceMode: z.enum(["verbatim", "segment_ids"]).optional(),
    promptVariant: z
      .enum([
        "baseline",
        "concise-v1",
        "minimal-v1",
        "observations-v1",
        "observations-v2",
        "observations-v3",
        "findings-v1",
        "findings-v2",
        "findings-label-first-v1",
        "findings-v3",
        "readings-v1",
      ])
      .optional(),
    identityMode: z.literal("harness").optional(),
    structuredOutput: z.literal("strict-findings-v1").optional(),
    timeoutMs: z.number().int().min(1).max(2_147_483_647),
    maxTokens: z.number().int().positive(),
    temperature: z.number().min(0).max(2).optional(),
    thinking: z.enum(["enabled", "disabled"]).optional(),
    reasoningEffort: z.enum(["none", "low", "high", "max"]).optional(),
    outputTokenParameter: z
      .enum(["max_tokens", "max_completion_tokens"])
      .optional(),
  })
  .strict()
  .refine(
    (config) =>
      !config.structuredOutput ||
      (config.model === "qwen3.8-flash" &&
        config.reasoningEffort === "none" &&
        config.thinking === undefined &&
        config.promptVariant === "findings-label-first-v1"),
    "Strict findings requires the verified Qwen nonthinking contract",
  )
  .refine(
    (config) =>
      config.promptVariant === undefined ||
      config.evidenceMode === "segment_ids",
    "Prompt variant requires segment_ids",
  )
  .refine(
    (config) =>
      config.identityMode === undefined ||
      (config.evidenceMode === "segment_ids" &&
        (config.promptVariant === "concise-v1" ||
          config.promptVariant === "minimal-v1" ||
          isObservationProtocol(config.promptVariant))),
    "Harness identity requires concise segment protocol",
  )
  .refine(
    (config) =>
      !(
        config.promptVariant === "minimal-v1" ||
        isObservationProtocol(config.promptVariant)
      ) || config.identityMode === "harness",
    "Minimal prompt requires harness identity",
  );
export type ProviderConfig = z.infer<typeof configSchema>;
export function providerInstructions(config: ProviderConfig) {
  return isObservationProtocol(config.promptVariant)
    ? observationInstructions(config.promptVariant)
    : config.evidenceMode === "segment_ids"
      ? referenceInstructions(config.promptVariant, config.identityMode)
      : EVALUATION_INSTRUCTIONS;
}
const envelopeSchema = z.object({
  choices: z
    .array(
      z.object({
        finish_reason: z.string().nullable(),
        message: z.object({
          content: z.string().nullable().optional(),
          refusal: z.string().nullable().optional(),
        }),
      }),
    )
    .length(1),
});
const tokens = z.number().int().nonnegative();
const count = (value: unknown): number | null => {
  const parsed = tokens.safeParse(value);
  return parsed.success ? parsed.data : null;
};
const object = (value: unknown): Record<string, unknown> =>
  value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
export function readUsage(raw: unknown) {
  const usage = object(raw),
    prompt = object(usage.prompt_tokens_details),
    completion = object(usage.completion_tokens_details);
  return {
    inputTokens: count(usage.prompt_tokens),
    outputTokens: count(usage.completion_tokens),
    totalTokens: count(usage.total_tokens),
    cacheHitTokens:
      count(usage.prompt_cache_hit_tokens) ?? count(prompt.cached_tokens),
    cacheMissTokens: count(usage.prompt_cache_miss_tokens),
    reasoningTokens: count(completion.reasoning_tokens),
  };
}
export type TokenUsage = ReturnType<typeof readUsage>;
export const priceSchema = z
  .object({
    sourceUrl: z.url(),
    checkedAt: z.iso.date(),
    model: z.string().min(1),
    currency: z.string().min(1),
    outputIncludesReasoning: z.literal(true),
    inputBilling: z.enum(["uniform", "cache_split"]),
    inputPerMillion: z.number().finite().nonnegative(),
    outputPerMillion: z.number().finite().nonnegative(),
    cacheHitPerMillion: z.number().finite().nonnegative().optional(),
    billingWindow: priceWindowSchema.optional(),
  })
  .strict()
  .superRefine((price, ctx) => {
    if (
      price.inputBilling === "cache_split" &&
      price.cacheHitPerMillion === undefined
    )
      ctx.addIssue({
        code: "custom",
        path: ["cacheHitPerMillion"],
        message: "Cache-split pricing requires an explicit cache-hit rate",
      });
  });
export type PriceConfig = z.infer<typeof priceSchema>;
/** Rates apply only when the caller explicitly establishes this billing basis. */
export function calculateCost(
  usage: TokenUsage,
  actualModel: string | null,
  rawPrice?: PriceConfig,
  interval?: { startedAt: string; endedAt: string },
) {
  const unknown = { amount: null, currency: null, priceSource: null };
  const parsed = priceSchema.safeParse(rawPrice);
  if (!parsed.success || actualModel !== parsed.data.model) return unknown;
  const price = parsed.data;
  if (
    price.billingWindow &&
    (!interval ||
      !priceWindowCovers(
        price.billingWindow,
        price.model,
        Date.parse(interval.startedAt),
        Date.parse(interval.endedAt),
      ))
  )
    return unknown;
  const {
    inputTokens: input,
    outputTokens: output,
    cacheHitTokens: hit,
    cacheMissTokens: miss,
    reasoningTokens: reasoning,
    totalTokens: total,
  } = usage;
  if (
    input === null ||
    output === null ||
    (reasoning !== null && reasoning > output) ||
    (total !== null && total !== input + output)
  )
    return unknown;
  if (
    (hit !== null && hit > input) ||
    (miss !== null && miss > input) ||
    (hit !== null && miss !== null && hit + miss !== input)
  )
    return unknown;
  let inputCost = input * price.inputPerMillion;
  if (price.inputBilling === "cache_split") {
    if (hit === null || price.cacheHitPerMillion === undefined) return unknown;
    inputCost =
      hit * price.cacheHitPerMillion + (input - hit) * price.inputPerMillion;
  }
  const amount = (inputCost + output * price.outputPerMillion) / 1_000_000;
  if (!Number.isFinite(amount)) return unknown;
  return {
    amount,
    currency: price.currency,
    priceSource: {
      url: price.sourceUrl,
      checkedAt: price.checkedAt,
      ...(price.billingWindow ? { billingWindow: price.billingWindow } : {}),
    },
  };
}
function unassessed(
  input: EvaluationInput,
  status: "no_answer" | "system_error",
): EvaluationResult {
  return {
    caseId: input.caseId,
    caseRevision: input.caseRevision,
    answerId: input.answerId,
    status,
    criteria: [],
    substantiveIssue: null,
    terminologyIssue: null,
    clarification: null,
  };
}

export const FINAL_OUTPUT_CAPTURE_LIMIT = 64_000;
export type CapturedFinalOutput = {
  text: string;
  captureTruncated: boolean;
  finishReason?: string | null;
};

export async function runChatCompletion(
  input: EvaluationInput,
  rawConfig: ProviderConfig,
  options: {
    transport: Transport;
    credential: string;
    allowRealCall?: boolean;
    signal?: AbortSignal;
    price?: PriceConfig;
    criterionPolicy?: CriterionPolicy;
    // Opt-in diagnostic artifact only. Never captures headers or reasoning_content.
    captureFinalOutput?: boolean;
  },
) {
  // Allowlisting first removes runtime-only expected fields without mutating the caller's answer.
  const original = inputSchema.parse(buildModelInput(input).data);
  const config = configSchema.parse(rawConfig);
  const criterionPolicy = isObservationProtocol(config.promptVariant)
    ? validateCriterionPolicy(original, options.criterionPolicy)
    : undefined;
  if (options.criterionPolicy !== undefined && criterionPolicy === undefined)
    throw new Error("Criterion policy requires observations protocol");
  if (
    options.transport.source === "real_provider" &&
    options.allowRealCall !== true
  )
    throw new Error("Explicit real-call authorization required");
  if (!options.credential.trim() || /[\r\n]/.test(options.credential))
    throw new Error("Invalid in-memory credential");
  const startedAt = new Date().toISOString(),
    start = performance.now();
  const measurement = {
    source: options.transport.source,
    requestedModel: config.model,
    model: null as string | null,
    modelVersion: null as string | null,
    systemFingerprint: null as string | null,
    responseId: null as string | null,
    startedAt,
    endedAt: startedAt,
    durationMs: 0,
    callCount: 0,
    ...readUsage(null),
    cost: null as number | null,
    currency: null as string | null,
    priceSource: null as ReturnType<typeof calculateCost>["priceSource"],
  };
  let diagnostic: ProviderDiagnostic | undefined;
  let observations: ObservationOutput | undefined;
  let finalOutput: CapturedFinalOutput | undefined;
  const finish = (result: EvaluationResult, failure: Failure | null) => {
    measurement.endedAt = new Date().toISOString();
    measurement.durationMs = Math.max(0, performance.now() - start);
    if (measurement.source === "real_provider" && measurement.callCount > 0) {
      const cost = calculateCost(
        measurement,
        measurement.model,
        options.price,
        measurement,
      );
      measurement.cost = cost.amount;
      measurement.currency = cost.currency;
      measurement.priceSource = cost.priceSource;
    }
    if (
      measurement.callCount > 0 &&
      measurement.durationMs >= config.timeoutMs &&
      failure !== "aborted"
    ) {
      result = unassessed(original, "system_error");
      failure = "timeout";
    }
    // Only the exact in-memory credential is scrubbed; no claim about all secrets.
    const serialized = JSON.stringify({
      original,
      result,
      measurement: { ...measurement },
      failure,
      ...(!failure && observations ? { observations } : {}),
      ...(diagnostic ? { diagnostic } : {}),
      ...(finalOutput ? { finalOutput } : {}),
    });
    const safe = options.credential
      ? serialized
          .split(JSON.stringify(options.credential).slice(1, -1))
          .join("[REDACTED]")
      : serialized;
    return JSON.parse(safe) as {
      original: typeof original;
      result: typeof result;
      measurement: typeof measurement;
      failure: Failure | null;
      diagnostic?: ProviderDiagnostic;
      observations?: ObservationOutput;
      finalOutput?: CapturedFinalOutput;
    };
  };
  if (!original.studentText.trim())
    return finish(unassessed(original, "no_answer"), null);
  if (options.signal?.aborted)
    return finish(unassessed(original, "system_error"), "aborted");
  const controller = new AbortController();
  let abortKind: "timeout" | "aborted" | null = null;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let rejectAbort: (reason: unknown) => void = () => {};
  const cancelled = new Promise<never>((_, reject) => {
    rejectAbort = reject;
  });
  const abort = (kind: "timeout" | "aborted") => {
    if (abortKind) return;
    abortKind = kind;
    controller.abort();
    rejectAbort(new Error("cancelled"));
  };
  const onAbort = () => abort("aborted");
  options.signal?.addEventListener("abort", onAbort, { once: true });
  timer = setTimeout(() => abort("timeout"), config.timeoutMs);
  let failure: Failure = "transport_error";
  try {
    const modelInput = buildModelInput(original);
    const body = JSON.stringify({
      model: config.model,
      messages: [
        {
          role: "system",
          content: providerInstructions(config),
        },
        {
          role: "user",
          content: JSON.stringify(
            isObservationProtocol(config.promptVariant)
              ? observationInput(
                  modelInput.data,
                  criterionPolicy,
                  config.promptVariant,
                )
              : config.identityMode === "harness"
                ? assessmentInput(modelInput.data)
                : config.evidenceMode === "segment_ids"
                  ? {
                      ...modelInput.data,
                      answerSegments: answerSegments(original.studentText),
                    }
                  : modelInput.data,
          ),
        },
      ],
      response_format: config.structuredOutput
        ? STRICT_FINDINGS_FORMAT
        : { type: "json_object" },
      stream: false,
      [config.outputTokenParameter ?? "max_tokens"]: config.maxTokens,
      ...(config.temperature === undefined
        ? {}
        : { temperature: config.temperature }),
      ...(config.thinking === undefined
        ? {}
        : { thinking: { type: config.thinking } }),
      ...(config.reasoningEffort === undefined
        ? {}
        : { reasoning_effort: config.reasoningEffort }),
    });
    const response = await Promise.race([
      Promise.resolve().then(() => {
        if (controller.signal.aborted) throw new Error("cancelled");
        const now = Date.now();
        if (
          measurement.source === "real_provider" &&
          options.price?.billingWindow &&
          !priceWindowCovers(
            options.price.billingWindow,
            config.model,
            now,
            now + config.timeoutMs,
          )
        ) {
          failure = "price_window_expired";
          throw new Error("price-window-expired");
        }
        measurement.callCount = 1;
        return options.transport.send({
          endpoint: config.endpoint,
          credential: options.credential,
          body,
          signal: controller.signal,
        });
      }),
      cancelled,
    ]);
    const httpError = response.status < 200 || response.status >= 300;
    failure = httpError ? "http_error" : "response_parse_error";
    const json: unknown = JSON.parse(response.body);
    // Extract each allowlisted metric independently of HTTP and assessment validity.
    const metadata = object(json);
    const identifier = (value: unknown): string | null =>
      typeof value === "string" && value.length > 0 ? value : null;
    measurement.model = identifier(metadata.model);
    measurement.responseId = identifier(metadata.id);
    measurement.systemFingerprint = identifier(metadata.system_fingerprint);
    Object.assign(measurement, readUsage(metadata.usage));
    if (httpError)
      return finish(unassessed(original, "system_error"), "http_error");
    failure = "response_shape_error";
    const envelope = envelopeSchema.parse(json);
    const choice = envelope.choices[0];
    if (
      options.captureFinalOutput &&
      typeof choice.message.content === "string"
    ) {
      // Redact known credential representations before bounding/stringifying.
      // This is not a claim to detect arbitrary secrets or redact learner PII.
      let text = choice.message.content;
      for (const secret of [
        options.credential,
        JSON.stringify(options.credential).slice(1, -1),
      ])
        if (secret) text = text.split(secret).join("[REDACTED]");
      finalOutput = {
        text: text.slice(0, FINAL_OUTPUT_CAPTURE_LIMIT),
        captureTruncated: text.length > FINAL_OUTPUT_CAPTURE_LIMIT,
        finishReason: [
          "stop",
          "length",
          "tool_calls",
          "content_filter",
          "repetition_truncation",
        ].includes(choice.finish_reason ?? "")
          ? choice.finish_reason
          : null,
      };
    }
    if (choice.message.refusal || choice.finish_reason === "content_filter")
      return finish(unassessed(original, "system_error"), "refused");
    if (choice.finish_reason === "length")
      return finish(unassessed(original, "system_error"), "truncated");
    if (choice.finish_reason !== "stop")
      return finish(unassessed(original, "system_error"), "unexpected_finish");
    if (typeof choice.message.content !== "string")
      return finish(
        unassessed(original, "system_error"),
        "response_shape_error",
      );
    failure = "result_parse_error";
    const raw: unknown = parseUniqueJson(choice.message.content);
    failure = "result_validation_error";
    const result = isObservationProtocol(config.promptVariant)
      ? (() => {
          const resolved = resolveObservations(
            original,
            criterionPolicy,
            raw,
            config.promptVariant,
          );
          observations = resolved.observations;
          return resolved.result;
        })()
      : config.identityMode === "harness"
        ? resolveAssessment(original, raw)
        : config.evidenceMode === "segment_ids"
          ? resolveReferences(original, raw)
          : validateResult(original, raw);
    return finish(
      result,
      result.status === "system_error" ? "provider_system_error" : null,
    );
  } catch (error) {
    if (
      !abortKind &&
      (failure === "result_validation_error" ||
        failure === "response_shape_error")
    )
      diagnostic = { stage: failure, ...validationIssues(error) };
    else if (
      !abortKind &&
      (failure === "result_parse_error" || failure === "response_parse_error")
    )
      diagnostic = {
        stage: failure,
        totalIssues: 1,
        issues: [
          {
            code:
              error instanceof DuplicateJsonKeyError
                ? "duplicate_json_key"
                : "invalid_json",
            path: [],
          },
        ],
      };
    return finish(unassessed(original, "system_error"), abortKind ?? failure);
  } finally {
    if (timer !== undefined) clearTimeout(timer);
    options.signal?.removeEventListener("abort", onAbort);
  }
}
