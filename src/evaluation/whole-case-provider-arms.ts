export const wholeCaseArmIds = [
  "deepseek-low",
  "qwen-off",
  "qwen-on",
  "mimo-off",
  "mimo-on",
] as const;
export type WholeCaseArmId = (typeof wholeCaseArmIds)[number];
export const wholeCaseTimeoutMs = 120_000;
export const wholeCaseOutputLimit = 16384;
export const wholeCaseWorkspace = {
  region: "cn-beijing",
  workspaceId: "llm-ouea9q33kpco2gz0",
};

// Provider parameters only; the document and evaluation instructions never change.
export function wholeCaseArm(id: WholeCaseArmId, document: string) {
  if (!wholeCaseArmIds.includes(id)) throw new Error("unknown-whole-case-arm");
  const messages = [{ role: "user", content: document }];
  if (id === "deepseek-low")
    return {
      provider: "deepseek",
      endpoint: "https://api.deepseek.com/chat/completions",
      request: {
        model: "deepseek-flash",
        messages,
        thinking: { type: "enabled" },
        reasoning_effort: "low",
        max_tokens: wholeCaseOutputLimit,
        stream: false,
      },
    };
  const on = id.endsWith("-on");
  if (id.startsWith("qwen-"))
    return {
      provider: "qwen",
      endpoint: `https://${wholeCaseWorkspace.workspaceId}.cn-beijing.maas.aliyuncs.com/compatible-mode/v1/chat/completions`,
      request: {
        model: "qwen3.8-flash",
        messages,
        enable_thinking: on,
        ...(!on ? { temperature: 0 } : {}),
        max_completion_tokens: wholeCaseOutputLimit,
        stream: false,
      },
    };
  return {
    provider: "mimo",
    endpoint: "https://api.xiaomimimo.com/v1/chat/completions",
    request: {
      model: "mimo-v2.6-flash",
      messages,
      thinking: { type: on ? "enabled" : "disabled" },
      ...(!on ? { temperature: 0 } : {}),
      max_completion_tokens: wholeCaseOutputLimit,
      stream: false,
    },
  };
}
