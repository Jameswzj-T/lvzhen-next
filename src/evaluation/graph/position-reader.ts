import { STANCE_INSTRUCTIONS } from "./structured-stance";
import { QUESTION_LOCAL_INSTRUCTIONS } from "./question-local";
import { SCOPED_POSITION_INSTRUCTIONS } from "./task-scopes";
import { z } from "zod";
import {
  calculateCost,
  configSchema,
  readUsage,
  type ProviderConfig,
  type PriceConfig,
  type Transport,
} from "../provider";
import { priceWindowCovers } from "../price-window";
import { parseUniqueJson } from "../unique-json";
import {
  POSITION_INSTRUCTIONS,
  validatePositions,
  type PositionReader,
  type PositionRequest,
} from "./position";
import type { ModelReceipt } from "./contracts";
import {
  TASK_MEANING_INSTRUCTIONS,
  TASK_MEANING_MODE,
  meaningToStance,
} from "./task-meaning-interface";

export function positionWire(request: PositionRequest, config: ProviderConfig) {
  const meaning =
    "readingMode" in request && request.readingMode === TASK_MEANING_MODE;
  const { readingMode: _mode, ...data } = request as PositionRequest & {
    readingMode?: string;
  };
  void _mode;
  return {
    model: config.model,
    messages: [
      {
        role: "system",
        content: meaning
          ? TASK_MEANING_INSTRUCTIONS
          : "propositions" in request
            ? STANCE_INSTRUCTIONS
            : "answerScope" in request
              ? QUESTION_LOCAL_INSTRUCTIONS
              : "task" in request
                ? SCOPED_POSITION_INSTRUCTIONS
                : POSITION_INSTRUCTIONS,
      },
      { role: "user", content: JSON.stringify(data) },
    ],
    response_format: { type: "json_object" },
    stream: false,
    [config.outputTokenParameter ?? "max_tokens"]: config.maxTokens,
    ...(config.temperature !== undefined
      ? { temperature: config.temperature }
      : {}),
    ...(config.thinking ? { thinking: { type: config.thinking } } : {}),
    ...(config.reasoningEffort
      ? { reasoning_effort: config.reasoningEffort }
      : {}),
  };
}
const envelope = z.object({
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

// Narrow adapter for the experimental position node. Reuses transport, usage,
// pricing and unique-JSON parsing; never captures headers or reasoning_content.
export type JsonReaderOptions = {
  config: ProviderConfig;
  price: PriceConfig;
  transport: Transport;
  credential: () => Promise<string>;
  authorize: () => Promise<void>;
};
export function positionReader(options: JsonReaderOptions): PositionReader {
  return jsonProtocolReader(options, {
    wire: positionWire,
    validate: (request, raw) =>
      validatePositions(
        request,
        "readingMode" in request && request.readingMode === TASK_MEANING_MODE
          ? meaningToStance(raw)
          : raw,
      ),
  });
}
// Share exactly the same transport, accounting, strict JSON and no-retry path
// with the isolated reading diagnostic. Protocol choice never grants a call.
export function jsonProtocolReader<Request>(
  options: JsonReaderOptions,
  protocol: {
    wire: (request: Request, config: ProviderConfig) => unknown;
    validate: (request: Request, raw: unknown) => unknown;
  },
): (request: Request, signal: AbortSignal) => Promise<ModelReceipt> {
  const config = configSchema.parse(options.config);
  return async (request, signal) => {
    await options.authorize();
    const key = await options.credential();
    if (!key.trim() || /[\r\n]/.test(key))
      throw new Error("invalid-credential");
    const now = Date.now();
    if (
      options.transport.source === "real_provider" &&
      options.price.billingWindow &&
      !priceWindowCovers(
        options.price.billingWindow,
        config.model,
        now,
        now + config.timeoutMs,
      )
    )
      throw new Error("price-expired");
    const startedAt = new Date(now).toISOString();
    const started = performance.now();
    const combined = AbortSignal.any([
      signal,
      AbortSignal.timeout(config.timeoutMs),
    ]);
    combined.throwIfAborted();
    const response = await options.transport.send({
      endpoint: config.endpoint,
      credential: key,
      body: JSON.stringify(protocol.wire(request, config)),
      signal: combined,
    });
    const endedAt = new Date().toISOString();
    let metadata: Record<string, unknown> = {};
    let raw: unknown = null;
    let providerFailure: string | undefined;
    try {
      const parsed = JSON.parse(response.body);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed))
        metadata = parsed;
      if (response.status < 200 || response.status >= 300)
        providerFailure = "http_error";
      else {
        const choice = envelope.parse(parsed).choices[0];
        if (choice.message.refusal) providerFailure = "refused";
        else if (choice.finish_reason !== "stop")
          providerFailure = "unexpected_finish";
        else if (
          !choice.message.content ||
          choice.message.content.length > 64_000
        )
          providerFailure = "response_shape_error";
        else {
          raw = choice.message.content;
          try {
            raw = parseUniqueJson(raw as string);
          } catch {
            providerFailure = "result_parse_error";
          }
          if (!providerFailure) {
            try {
              protocol.validate(request, raw);
            } catch {
              providerFailure = "result_validation_error";
            }
          }
        }
      }
    } catch {
      providerFailure = "response_parse_error";
    }
    const usage = readUsage(metadata.usage);
    const model = typeof metadata.model === "string" ? metadata.model : null;
    const cost =
      options.transport.source === "real_provider"
        ? calculateCost(usage, model, options.price, { startedAt, endedAt })
        : { amount: null, currency: null };
    const durationMs = performance.now() - started;
    if (combined.aborted || durationMs >= config.timeoutMs)
      providerFailure = "timeout";
    const receipt: ModelReceipt = {
      raw,
      source:
        options.transport.source === "real_provider" ? "model" : "fixture",
      durationMs,
      cost: cost.amount,
      currency: cost.currency,
      measurement: {
        requestedModel: config.model,
        model,
        responseId: typeof metadata.id === "string" ? metadata.id : null,
        startedAt,
        endedAt,
        callCount: 1,
        inputTokens: usage.inputTokens,
        outputTokens: usage.outputTokens,
        cacheHitTokens: usage.cacheHitTokens,
      },
      ...(providerFailure ? { providerFailure } : {}),
    };
    return JSON.parse(
      JSON.stringify(receipt)
        .split(JSON.stringify(key).slice(1, -1))
        .join("[REDACTED]"),
    ) as ModelReceipt;
  };
}
