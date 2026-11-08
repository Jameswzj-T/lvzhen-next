// Local comparison only. This does not register a new student-facing model.
import { calculateCost, priceSchema, readUsage } from "./provider";
import { wholeCaseOutputLimit } from "./whole-case-provider-arms";

export const additionalArmIds = ["minimax-off", "glm-low"] as const;
export type AdditionalArmId = (typeof additionalArmIds)[number];

export function additionalArm(id: AdditionalArmId, document: string) {
  if (!additionalArmIds.includes(id)) throw new Error("unknown-additional-arm");
  const messages = [{ role: "user", content: document }];
  if (id === "minimax-off")
    return {
      provider: "minimax",
      endpoint: "https://api.minimax.cn/v1/chat/completions",
      request: {
        model: "MiniMax-M3",
        messages,
        thinking: { type: "disabled" },
        reasoning_split: true,
        service_tier: "standard",
        temperature: 0,
        max_completion_tokens: wholeCaseOutputLimit,
        stream: false,
      },
      rates: { input: 2.1, output: 8.4, cached: 0.42 },
      priceSource: "https://platform.minimax.cn/docs/guides/pricing-paygo",
    };
  return {
    provider: "glm",
    endpoint: "https://open.bigmodel.cn/api/paas/v4/chat/completions",
    request: {
      model: "glm-5.3-flashx",
      messages,
      thinking: { type: "enabled" },
      reasoning_effort: "low",
      max_tokens: wholeCaseOutputLimit,
      stream: false,
    },
    rates: { input: 2, output: 7, cached: 0.57 },
    priceSource: "https://docs.bigmodel.cn/cn/guide/start/pricing",
  };
}

export function additionalCost(
  arm: ReturnType<typeof additionalArm>,
  rawUsage: unknown,
  actualModel: string | null,
  window: { validFrom: string; validUntil: string },
  interval: { startedAt: string; endedAt: string },
) {
  const usage = readUsage(rawUsage);
  // An absent cache field is not proof that no cache hit occurred. Report a
  // conservative cold-input estimate separately, never as an exact bill.
  const cacheKnown = usage.cacheHitTokens !== null;
  const price = priceSchema.parse({
    model: arm.request.model,
    sourceUrl: arm.priceSource,
    checkedAt: "2026-09-28",
    currency: "CNY",
    outputIncludesReasoning: true,
    inputBilling: cacheKnown ? "cache_split" : "uniform",
    inputPerMillion: arm.rates.input,
    outputPerMillion: arm.rates.output,
    cacheHitPerMillion: arm.rates.cached,
    billingWindow: { ...window, period: "fixed" },
  });
  const cost = calculateCost(usage, actualModel, price, interval);
  return {
    ...cost,
    basis:
      cost.amount === null
        ? "unknown"
        : cacheKnown
          ? "public-rates-with-reported-cache"
          : "public-rates-cold-input-upper-estimate",
  };
}
