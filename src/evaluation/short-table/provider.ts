import {
  configSchema,
  priceSchema,
  createFetchTransport,
  readUsage,
  calculateCost,
  type Transport,
} from "../provider";
import { validateEndpoint, validateModel } from "../model-config";
import { deepseekPeriod, priceWindowCovers } from "../price-window";
import type { wholeCaseRequest } from "../whole-case-table";
import {
  DEEPSEEK_STRICT_ENDPOINT,
  DEEPSEEK_TEACHER_TOOL,
  usesStrictTeacherOutput,
  strictTeacherArguments,
} from "../deepseek-teacher-output";
import type { UnitFeedbackModelRequest } from "../unit-feedback";
type ShortModelRequest = Pick<
  ReturnType<typeof wholeCaseRequest>,
  "messages" | "max_tokens"
> &
  Partial<
    Pick<
      UnitFeedbackModelRequest,
      | "model"
      | "thinking"
      | "temperature"
      | "tools"
      | "tool_choice"
      | "response_format"
    >
  >;
export const SHORT_TIMEOUT_MS = 30_000;
export function shortProviderPlan(
  now: number,
  checkedAt: string,
  request: ShortModelRequest,
) {
  const strictOutput = usesStrictTeacherOutput(request);
  if ("tools" in request && !strictOutput)
    throw Error("unsupported-short-structured-output");
  const config = configSchema.parse({
    endpoint: strictOutput
      ? DEEPSEEK_STRICT_ENDPOINT
      : "https://api.deepseek.com/chat/completions",
    model: "deepseek-flash",
    thinking: "disabled",
    temperature: 0,
    outputTokenParameter: "max_tokens",
    maxTokens: 16384,
    timeoutMs: SHORT_TIMEOUT_MS,
  });
  validateEndpoint(
    config,
    validateModel(config),
    undefined,
    strictOutput ? "deepseek-strict-teacher-tool" : undefined,
  );
  const period = deepseekPeriod(now),
    rates = period === "deepseek_peak" ? [2, 0.04, 8] : [1, 0.02, 4];
  const price = priceSchema.parse({
    model: config.model,
    sourceUrl: "https://api-docs.deepseek.com/zh-cn/quick_start/pricing/",
    checkedAt,
    currency: "CNY",
    inputBilling: "cache_split",
    outputIncludesReasoning: true,
    inputPerMillion: rates[0],
    cacheHitPerMillion: rates[1],
    outputPerMillion: rates[2],
    billingWindow: {
      validFrom: new Date(now).toISOString(),
      validUntil: new Date(now + SHORT_TIMEOUT_MS + 1000).toISOString(),
      period,
    },
  });
  if (
    !priceWindowCovers(
      price.billingWindow!,
      config.model,
      now,
      now + SHORT_TIMEOUT_MS,
    )
  )
    throw Error("price-window-boundary");
  const inputCeiling =
    Buffer.byteLength(
      JSON.stringify(strictOutput ? request : request.messages),
      "utf8",
    ) + 1024;
  return {
    config,
    price,
    inputCeiling,
    strictOutput,
    reservation:
      (inputCeiling * rates[0] + request.max_tokens * rates[2]) / 1e6,
  };
}
export async function readShortModel(
  request: ShortModelRequest,
  plan: ReturnType<typeof shortProviderPlan>,
  credential: string,
  transport?: Transport,
) {
  const startedAt = new Date().toISOString(),
    start = performance.now();
  let raw: Record<string, any> = {},
    status: number | null = null,
    failure: string | null = null;
  try {
    const response = await (transport ?? createFetchTransport(fetch)).send({
      endpoint: plan.config.endpoint,
      credential,
      body: JSON.stringify(request),
      signal: AbortSignal.timeout(SHORT_TIMEOUT_MS),
    });
    status = response.status;
    if (status !== 200) failure = "http_error";
    else {
      try {
        const parsed = JSON.parse(response.body);
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
          throw Error("invalid_response");
        raw = parsed;
      } catch {
        failure = "invalid_response";
      }
    }
  } catch {
    failure = "transport_result_unknown";
  }
  const endedAt = new Date().toISOString();
  if (JSON.stringify(raw).includes(credential)) {
    raw = {};
    failure = "unexpected_secret";
  }
  const choice = raw.choices?.[0];
  const argumentsOutput = plan.strictOutput
    ? strictTeacherArguments(choice)
    : null;
  let text = plan.strictOutput
    ? (argumentsOutput?.text ?? "")
    : typeof choice?.message?.content === "string"
      ? choice.message.content
      : "";
  if (
    !failure &&
    (raw.choices?.length !== 1 ||
      !text ||
      (plan.strictOutput ? !argumentsOutput : choice.finish_reason !== "stop"))
  )
    failure = "incomplete_response";
  const usage = readUsage(raw.usage),
    cost = calculateCost(usage, raw.model ?? null, plan.price, {
      startedAt,
      endedAt,
    });
  if (
    !failure &&
    (cost.amount === null ||
      cost.amount > plan.reservation ||
      (usage.inputTokens ?? Infinity) > plan.inputCeiling)
  )
    failure = "accounting_unverified";
  if (!failure && (usage.reasoningTokens ?? 0) > 0)
    failure = "thinking-configuration-drift";
  if (failure) text = "";
  return {
    text,
    failure,
    durationMs: performance.now() - start,
    costCny: cost.amount,
    receipt: {
      provider: "deepseek",
      status,
      actualModel: raw.model ?? null,
      responseId: raw.id ?? null,
      text,
      ...(plan.strictOutput
        ? {
            outputChannel: "tool_arguments" as const,
            toolName: DEEPSEEK_TEACHER_TOOL,
            toolCallId: argumentsOutput?.toolCallId ?? null,
            endpoint: plan.config.endpoint,
          }
        : {}),
      finishReason:
        typeof choice?.finish_reason === "string" ? choice.finish_reason : null,
      usage,
      cost,
      failure,
      startedAt,
      endedAt,
    },
  };
}
