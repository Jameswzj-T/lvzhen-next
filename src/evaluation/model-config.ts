import { createHash } from "node:crypto";
import { z } from "zod";
import modelCatalog from "./models.json";
const defaults = modelCatalog.models;
import {
  configSchema,
  priceSchema,
  providerInstructions,
  type ProviderConfig,
  type PriceConfig,
} from "./provider";
import { SEGMENT_VERSION } from "./evidence-references";
import {
  isObservationProtocol,
  observationPolicyVersion,
} from "./semantic-observations";

export const profileSchema = z
  .object({
    model: z.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/),
    adapter: z.enum(["deepseek-chat", "qwen-chat", "mimo-chat"]),
    priceSources: z.array(z.url()).min(1),
    contextCeiling: z.number().int().positive().max(1048576),
    outputMargin: z.number().int().min(0).max(100),
  })
  .strict();
export type ModelProfile = z.infer<typeof profileSchema>;
export function modelProfile(
  model: string,
  catalog: unknown = defaults,
): ModelProfile {
  const entries = z.array(profileSchema).parse(catalog);
  if (new Set(entries.map((e) => e.model)).size !== entries.length)
    throw new Error("Duplicate model profile");
  const entry = entries.find((e) => e.model === model);
  if (!entry) throw new Error("Unconfirmed pilot parameter combination");
  return entry;
}
export function validateModel(config: ProviderConfig, catalog?: unknown) {
  const profile = modelProfile(config.model, catalog);
  const valid =
    profile.adapter === "deepseek-chat"
      ? config.outputTokenParameter === "max_tokens" &&
        ((config.thinking === "disabled" &&
          config.reasoningEffort === undefined) ||
          (config.model === "deepseek-flash" &&
            config.thinking === "enabled" &&
            ["low", "high", "max"].includes(config.reasoningEffort ?? "")))
      : profile.adapter === "qwen-chat"
        ? config.thinking === undefined &&
          (config.reasoningEffort === "none" ||
            config.reasoningEffort === "low") &&
          config.outputTokenParameter === "max_completion_tokens"
        : ["enabled", "disabled"].includes(config.thinking ?? "") &&
          config.reasoningEffort === undefined &&
          config.outputTokenParameter === "max_completion_tokens" &&
          (config.temperature === undefined ||
            (config.thinking === "disabled" && config.temperature <= 1.5));
  if (!valid) throw new Error("Unconfirmed pilot parameter combination");
  return profile;
}
/** Bounded evaluation experiments; thinking needs room for reasoning plus final JSON. */
export function evaluationLimits(
  config: ProviderConfig,
  scope: "standard" | "matched-comparison" = "standard",
) {
  const profile = validateModel(config);
  // Explicitly selected by a separately budgeted comparison runner. Existing
  // callers retain their default limits; this does not change student settings.
  if (
    scope === "matched-comparison" &&
    ["qwen-chat", "mimo-chat"].includes(profile.adapter)
  )
    return { timeoutMs: 60_000, maxTokens: 6144 };
  // Equal ceilings for the four-mode V4.1 comparison; student-service limits are separate.
  if (config.model === "deepseek-flash")
    return { timeoutMs: 60_000, maxTokens: 6144 };
  return (profile.adapter === "qwen-chat" &&
    config.reasoningEffort === "low") ||
    (profile.adapter === "mimo-chat" && config.thinking === "enabled")
    ? { timeoutMs: 60_000, maxTokens: 6144 }
    : { timeoutMs: 20_000, maxTokens: 1536 };
}
export function validateEndpoint(
  config: ProviderConfig,
  profile: ModelProfile,
  workspace?: { region: string; workspaceId: string },
  outputCapability?: "deepseek-strict-teacher-tool",
) {
  if (profile.adapter === "deepseek-chat") {
    if (
      config.endpoint !== "https://api.deepseek.com/chat/completions" &&
      !(
        outputCapability === "deepseek-strict-teacher-tool" &&
        config.endpoint === "https://api.deepseek.com/beta/chat/completions"
      )
    )
      throw new Error("endpoint-or-output-bound");
  } else if (profile.adapter === "mimo-chat") {
    if (config.endpoint !== "https://api.xiaomimimo.com/v1/chat/completions")
      throw new Error("endpoint-or-output-bound");
  } else {
    if (
      !workspace ||
      workspace.region !== "cn-beijing" ||
      !/^[a-zA-Z0-9][a-zA-Z0-9-]{0,62}$/.test(workspace.workspaceId) ||
      config.endpoint !==
        `https://${workspace.workspaceId}.cn-beijing.maas.aliyuncs.com/compatible-mode/v1/chat/completions`
    )
      throw new Error("endpoint-or-output-bound");
  }
}
export const digest = (value: unknown) =>
  createHash("sha256").update(JSON.stringify(value)).digest("hex");
export function releaseIdentity(
  config: ProviderConfig,
  price: PriceConfig | null,
  profile = validateModel(config),
) {
  const normalized = {
    task: "subjective-evaluation",
    protocolVersion: isObservationProtocol(config.promptVariant)
      ? `evaluation-${config.promptVariant}`
      : config.identityMode === "harness"
        ? "evaluation-assessment-v3"
        : config.evidenceMode === "segment_ids"
          ? "evaluation-references-v2"
          : "evaluation-v1",
    ...(isObservationProtocol(config.promptVariant)
      ? {
          policyVersion: observationPolicyVersion(config.promptVariant),
        }
      : {}),
    ...(config.evidenceMode === "segment_ids"
      ? { segmentVersion: SEGMENT_VERSION }
      : {}),
    promptSha256: digest(providerInstructions(config)),
    profile: profileSchema.parse(profile),
    config: configSchema.parse(config),
    price: price === null ? null : priceSchema.parse(price),
  };
  return { ...normalized, releaseSha256: digest(normalized) };
}
