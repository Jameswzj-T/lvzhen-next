import { createHash } from "node:crypto";
import {
  inquiryRequestSchema,
  type InquiryReply,
} from "../domain/question-inquiry";
import {
  prepareQuestionInquiry,
  presentQuestionInquiryText,
} from "../evaluation/question-inquiry-task";
import { allowOwnKeyRequest } from "./access";
import {
  boundedText,
  modelAccessMessage,
  ownKeyCompletion,
  requestModelKey,
  ModelAccessError,
} from "./transport";
import { RecentModelRequests } from "./recent-requests";
import {
  getPublicModelRuntime,
  type PublicModelRequestGate,
} from "./request-control";
import {
  isPublicModelRequestError,
  publicModelRequestMessage,
} from "./request-errors";
export function createOwnKeyInquiryHandler(
  options: {
    env?: NodeJS.ProcessEnv;
    fetcher?: typeof fetch;
    recent?: RecentModelRequests;
    gate?: PublicModelRequestGate;
  } = {},
) {
  return async (request: Request) => {
    const headers: Record<string, string> = {
      "Cache-Control": "no-store",
      Vary: "Authorization, Origin",
      "x-lvzhen-model-request": "not-sent",
    };
    const respond = (reply: InquiryReply) => Response.json(reply, { headers });
    if (!allowOwnKeyRequest(request, options.env))
      return Response.json(
        { error: "请从律真页面提问。" },
        { status: 403, headers },
      );
    let input;
    try {
      input = inquiryRequestSchema.parse(
        JSON.parse(await boundedText(request, 24000)),
      );
    } catch {
      return Response.json(
        { error: "请检查本题版本和这次疑问。" },
        { status: 400, headers },
      );
    }
    let task;
    try {
      task = prepareQuestionInquiry({
        questionId: input.questionId,
        questionRevision: input.questionRevision,
        inquiryId: input.inquiryId,
        text: input.text,
      });
    } catch {
      return respond({
        status: "unsupported",
        result: null,
        message: "这道题的答疑资料还未补齐，疑问已经保留，本次没有发送模型。",
      });
    }
    let key: string;
    try {
      key = requestModelKey(request);
    } catch (error) {
      return respond({
        status: "paused",
        result: null,
        message: modelAccessMessage(error),
      });
    }
    try {
      const fingerprint = createHash("sha256")
        .update(JSON.stringify(task.body))
        .digest("hex");
      const shared =
        options.recent && options.gate
          ? null
          : getPublicModelRuntime(options.env);
      const gate = options.gate ?? shared!.gate;
      const cache = options.recent ?? shared!.recent,
        id = `inquiry:${input.inquiryId}`;
      const previous = cache.read(key, id, fingerprint);
      if (previous) headers["x-lvzhen-model-request"] = "possibly-sent";
      if (!previous && input.action === "lookup")
        return respond({
          status: "available",
          result: null,
          message:
            "当前没有可读取的解释。可以主动请求；如果之前已经请求过，重新请求可能再次计费。",
        });
      const result = await (previous ??
        cache.once(
          key,
          id,
          fingerprint,
          async () => {
            const completion = await ownKeyCompletion(
              task.body,
              key,
              options.fetcher,
              request.signal,
            );
            try {
              return presentQuestionInquiryText(task, {
                text: completion.text,
                responseId: completion.id,
                completedAt: completion.endedAt,
              });
            } catch {
              throw new ModelAccessError("invalid_output");
            }
          },
          () => {
            const release = gate.acquire(key);
            headers["x-lvzhen-model-request"] = "possibly-sent";
            return release;
          },
        ));
      headers["x-lvzhen-model-request"] = previous ? "cached" : "completed";
      return respond({
        status: "ready",
        result: result as ReturnType<typeof presentQuestionInquiryText>,
        message: "解释已取得，正在保存到当前浏览器的学习记录。",
      });
    } catch (error) {
      if (isPublicModelRequestError(error)) {
        headers["x-lvzhen-model-request"] = "not-sent";
        headers["Retry-After"] = String(
          Math.max(1, Math.ceil(error.retryAfter)),
        );
        return respond({
          status: "paused",
          result: null,
          message: publicModelRequestMessage(error),
        });
      }
      return respond({
        status: "failed",
        result: null,
        message: modelAccessMessage(error),
      });
    }
  };
}
