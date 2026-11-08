import { configSchema, type ProviderConfig } from "./provider";
import { validateModel, evaluationLimits } from "./model-config";

export const deepseekModes = ["off", "low", "high", "max"] as const;
export type DeepseekMode = (typeof deepseekModes)[number];
export function deepseekModeConfig(mode: DeepseekMode): ProviderConfig {
  if (!deepseekModes.includes(mode)) throw new Error("unknown-mode");
  const config = configSchema.parse({
    model: "deepseek-flash",
    endpoint: "https://api.deepseek.com/chat/completions",
    thinking: mode === "off" ? "disabled" : "enabled",
    ...(mode === "off" ? {} : { reasoningEffort: mode }),
    outputTokenParameter: "max_tokens",
    maxTokens: 6144,
    timeoutMs: 60_000,
    evidenceMode: "segment_ids",
    promptVariant: "minimal-v1",
    identityMode: "harness",
  });
  validateModel(config);
  if (config.maxTokens > evaluationLimits(config).maxTokens)
    throw new Error("output-bound");
  return config;
}
