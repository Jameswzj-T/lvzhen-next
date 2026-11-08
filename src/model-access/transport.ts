import { validModelKey } from "./client";
import { parseUniqueJson } from "../evaluation/unique-json";
import type { UnitFeedbackModelRequest } from "../evaluation/unit-feedback";

export class ModelAccessError extends Error {
  constructor(
    public readonly code:
      | "key_missing"
      | "key_rejected"
      | "balance"
      | "rate_limit"
      | "unavailable"
      | "invalid_output",
  ) {
    super(code);
  }
}
export const modelAccessMessage = (error: unknown) => {
  const code = error instanceof ModelAccessError ? error.code : "unavailable";
  return {
    key_missing: "先到“模型设置”填写你自己的 DeepSeek API Key，原答已经保留。",
    key_rejected:
      "DeepSeek 未接受这个 Key，请到“模型设置”检查或更换。原答已经保留。",
    balance: "DeepSeek 账号余额不足，请在模型平台充值后再使用。原答已经保留。",
    rate_limit: "DeepSeek 当前请求较多，请稍后再试。原答已经保留。",
    unavailable:
      "这次未取得讲解，原答已经保留。没有自动重发；已发送请求的费用请以模型平台账单为准。",
    invalid_output:
      "这次讲解未能完整读取，原答已经保留。没有自动重发；可以先看本题参考。",
  }[code];
};
export function requestModelKey(request: Request) {
  const value = request.headers
    .get("authorization")
    ?.match(/^Bearer (.+)$/)?.[1];
  if (!validModelKey(value)) throw new ModelAccessError("key_missing");
  return value;
}
/** Bounds both chunked request bodies and upstream output before accumulating them. */
export async function boundedText(message: Request | Response, max: number) {
  const reader = message.body?.getReader();
  if (!reader) return "";
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      size += part.value.byteLength;
      if (size > max) {
        await reader.cancel();
        throw new ModelAccessError("invalid_output");
      }
      chunks.push(part.value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let at = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, at);
    at += chunk.byteLength;
  }
  return new TextDecoder().decode(bytes);
}
export type ModelCompletion = {
  id: string;
  model: string;
  text: string;
  endedAt: string;
};
/** Fixed provider endpoint. No arbitrary URL, owner credentials, files, logging or retry. */
export async function ownKeyCompletion(
  body: UnitFeedbackModelRequest,
  key: string,
  fetcher: typeof fetch = fetch,
  signal?: AbortSignal,
): Promise<ModelCompletion> {
  const tool = body.tools?.length ? body.tool_choice?.function.name : undefined;
  if (
    body.model !== "deepseek-flash" ||
    body.thinking.type !== "disabled" ||
    body.stream ||
    body.max_tokens > 16384 ||
    (body.tools?.length &&
      (body.tools.length !== 1 || tool !== "submit_teacher_feedback"))
  )
    throw new ModelAccessError("invalid_output");
  const timeout = AbortSignal.timeout(30000);
  const response = await fetcher(
    tool
      ? "https://api.deepseek.com/beta/chat/completions"
      : "https://api.deepseek.com/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify(body),
      signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
      redirect: "error",
      cache: "no-store",
    },
  );
  if (!response.ok) {
    await response.body?.cancel();
    throw new ModelAccessError(
      response.status === 401 || response.status === 403
        ? "key_rejected"
        : response.status === 402
          ? "balance"
          : response.status === 429
            ? "rate_limit"
            : "unavailable",
    );
  }
  let value;
  try {
    value = parseUniqueJson(await boundedText(response, 256000)) as Record<
      string,
      any
    >;
  } catch {
    throw new ModelAccessError("invalid_output");
  }
  const choice = value.choices?.[0];
  if (
    typeof value?.id !== "string" ||
    !value.id ||
    value.id.length > 160 ||
    typeof value.model !== "string" ||
    !value.model ||
    value.model.length > 160 ||
    value.choices?.length !== 1 ||
    choice.finish_reason !== (tool ? "tool_calls" : "stop") ||
    choice.message?.role !== "assistant" ||
    choice.message.refusal
  )
    throw new ModelAccessError("invalid_output");
  let text = choice.message.content;
  if (tool) {
    const calls = choice.message.tool_calls;
    if (
      calls?.length !== 1 ||
      calls[0].type !== "function" ||
      calls[0].function?.name !== tool
    )
      throw new ModelAccessError("invalid_output");
    text = calls[0].function.arguments;
  } else if (choice.message.tool_calls?.length)
    throw new ModelAccessError("invalid_output");
  if (typeof text !== "string" || !text.trim() || text.length > 64000)
    throw new ModelAccessError("invalid_output");
  return {
    id: value.id,
    model: value.model,
    text,
    endedAt: new Date().toISOString(),
  };
}
