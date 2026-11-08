import { createHash } from "node:crypto";
import { registeredQuestionRequestSchema } from "../evaluation/registered-question-feedback-contract";
import { prepareCurrentQuestionFeedback } from "../evaluation/registered-question-feedback-task";
import { currentQuestionDispatch } from "../evaluation/current-question-teacher-dispatch";
import { presentUnitFeedbackReceipt } from "../evaluation/unit-feedback-dispatch";
import {
  validateUnitFeedbackResult,
  type UnitFeedbackReply,
} from "../evaluation/unit-feedback-contract";
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

const digest = (v: unknown) =>
  createHash("sha256").update(JSON.stringify(v)).digest("hex");
export function createOwnKeyFeedbackHandler(
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
    if (!allowOwnKeyRequest(request, options.env))
      return Response.json(
        { error: "请从律真页面提交。" },
        { status: 403, headers },
      );
    let input;
    try {
      input = registeredQuestionRequestSchema.parse(
        JSON.parse(await boundedText(request, 36000)),
      );
    } catch {
      return Response.json(
        { error: "请检查本题原答与版本。" },
        { status: 400, headers },
      );
    }
    let prepared;
    try {
      prepared = prepareCurrentQuestionFeedback(
        input,
        input.action === "lookup" ? { readOnlyHistorical: true } : undefined,
      );
    } catch {
      return Response.json(
        { error: "题目版本已变更，请重新打开本题；原答仍保留。" },
        { status: 409, headers },
      );
    }
    const respond = (reply: UnitFeedbackReply) =>
      Response.json(
        {
          reply,
          binding: { contentId: prepared.task.contentId },
          original: {
            id: input.attemptId,
            exerciseId: input.exerciseId,
            revision: input.exerciseRevision,
            answer: input.answer,
            choice: input.choice,
          },
        },
        { headers },
      );
    const empty = (
      message: string,
      availability: "paused" | "failed" = "paused",
    ): UnitFeedbackReply => ({
      result: null,
      canSubmit: false,
      submissionMode: "closed",
      availability,
      message,
    });
    let key: string;
    try {
      key = requestModelKey(request);
    } catch (error) {
      return respond(empty(modelAccessMessage(error)));
    }
    try {
      const task = prepared.task,
        dispatch = currentQuestionDispatch(task);
      const fingerprint = digest(dispatch.body),
        id = `feedback:${input.attemptId}`;
      const shared =
        options.recent && options.gate
          ? null
          : getPublicModelRuntime(options.env);
      const cache = options.recent ?? shared!.recent;
      const gate = options.gate ?? shared!.gate;
      const previous = cache.read(key, id, fingerprint);
      if (previous) headers["x-lvzhen-model-request"] = "possibly-sent";
      if (!previous && input.action === "lookup")
        return respond({
          result: null,
          availability: "ready",
          canSubmit: true,
          submissionMode: "direct",
          message:
            "当前没有可读取的讲解，原答已保存。可以主动请求；如果之前已经提交过，重新请求可能再次计费。",
        });
      const result = await (previous ??
        cache.once(
          key,
          id,
          fingerprint,
          async () => {
            const completion = await ownKeyCompletion(
              dispatch.body,
              key,
              options.fetcher,
              request.signal,
            );
            let presentation;
            try {
              presentation = presentUnitFeedbackReceipt(
                task,
                completion.text,
                fingerprint,
              );
            } catch {
              throw new ModelAccessError("invalid_output");
            }
            if (
              presentation.requestBodyHash !== fingerprint ||
              ["system_error", "no_answer"].includes(presentation.view.status)
            )
              throw new ModelAccessError("invalid_output");
            const receiptHash = digest({
              requestBodyHash: fingerprint,
              ...completion,
            });
            return validateUnitFeedbackResult({
              version: "unit-feedback-v1",
              id: digest({ taskId: task.taskId, receiptHash }),
              createdAt: completion.endedAt,
              source: "real_provider",
              purpose: "practice",
              view: presentation.view,
              ...("sourceTeacher" in presentation
                ? { sourceTeacher: presentation.sourceTeacher }
                : {}),
              receipt: { responseId: completion.id, receiptHash },
            });
          },
          () => {
            const release = gate.acquire(key);
            headers["x-lvzhen-model-request"] = "possibly-sent";
            return release;
          },
        ));
      headers["x-lvzhen-model-request"] = previous ? "cached" : "completed";
      return respond({
        result: result as Awaited<
          ReturnType<typeof validateUnitFeedbackResult>
        >,
        availability: "lookup_only",
        canSubmit: false,
        submissionMode: "closed",
        message: "讲解已取得，由当前浏览器保存；本次调用使用你自己的 Key。",
      });
    } catch (error) {
      if (isPublicModelRequestError(error)) {
        headers["x-lvzhen-model-request"] = "not-sent";
        headers["Retry-After"] = String(
          Math.max(1, Math.ceil(error.retryAfter)),
        );
        return respond(empty(publicModelRequestMessage(error)));
      }
      return respond(empty(modelAccessMessage(error), "failed"));
    }
  };
}
