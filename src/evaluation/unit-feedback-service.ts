import { createHash } from "node:crypto";
import { isDeepStrictEqual } from "node:util";
import { exerciseFor, exerciseRevision } from "../content/fault-catalog";
import { prepareUnitFeedback, presentUnitFeedback } from "./unit-feedback";
import { unitFeedbackBinding } from "./unit-feedback-catalog";
import {
  validateUnitFeedbackResult,
  unitFeedbackLookupSchema,
  type UnitFeedbackReply,
} from "./unit-feedback-contract";
import examples from "./unit-feedback-examples.json";

const sha = (raw: unknown) =>
  createHash("sha256").update(JSON.stringify(raw)).digest("hex");

/** Read-only default path: no credential, provider, grant, ledger or dispatch imports. */
export function lookupUnitFeedback(
  raw: unknown,
  records: unknown = examples.records,
): UnitFeedbackReply {
  const request = unitFeedbackLookupSchema.parse(raw);
  const binding = unitFeedbackBinding(request.exerciseId);
  const empty = (
    message: string,
    availability: UnitFeedbackReply["availability"] = "lookup_only",
  ): UnitFeedbackReply => ({
    result: null,
    canSubmit: false,
    availability,
    message,
  });
  if (!binding)
    return empty(
      "这份原答已保存，本题暂未接入逐项评阅；可对照参考自检。",
      "unsupported",
    );
  const exercise = exerciseFor(request.exerciseId);
  if (
    !exercise ||
    request.exerciseRevision !== binding.questionRevision ||
    exerciseRevision(request.exerciseId) !== binding.questionRevision
  )
    return empty(
      "这份反馈的题目版本不同，不套用旧判断；原答仍保留。",
      "changed",
    );
  const current = prepareUnitFeedback(
    exercise,
    request.exerciseRevision,
    {
      id: request.attemptId,
      questionId: request.exerciseId,
      exerciseRevision: request.exerciseRevision,
      raw: request.answer,
    },
    binding.publicRules,
  );
  if (current.contentId !== binding.contentId)
    return empty("题目或依据已变更，旧反馈暂不套用；原答仍保留。", "changed");
  if (!Array.isArray(records)) throw Error("unit-feedback-records-unavailable");
  for (const entry of records) {
    try {
      const { result: candidate, sourceReceipt } = entry as {
        result: unknown;
        sourceReceipt: {
          text: string;
          responseId: string;
          status: number;
          failure: string | null;
        };
      };
      const result = validateUnitFeedbackResult(candidate, {
        questionId: request.exerciseId,
        questionRevision: request.exerciseRevision,
        contentId: current.contentId,
        originalText: request.answer,
      });
      if (
        result.purpose !== "synthetic_validation" ||
        result.source !== "real_provider" ||
        sha(sourceReceipt) !== result.receipt.receiptHash ||
        sourceReceipt.responseId !== result.receipt.responseId ||
        sourceReceipt.status !== 200 ||
        sourceReceipt.failure !== null
      )
        continue;
      const originalTask = prepareUnitFeedback(
        exercise,
        request.exerciseRevision,
        {
          id: result.view.answerId,
          questionId: request.exerciseId,
          exerciseRevision: request.exerciseRevision,
          raw: request.answer,
        },
        binding.publicRules,
      );
      const view = presentUnitFeedback(originalTask, {
        taskId: result.view.taskId,
        result: JSON.parse(sourceReceipt.text),
      });
      if (
        !isDeepStrictEqual(view, result.view) ||
        sha({
          taskId: originalTask.taskId,
          receiptHash: result.receipt.receiptHash,
        }) !== result.id
      )
        continue;
      return {
        result,
        canSubmit: false,
        availability: "lookup_only",
        message:
          "已读取同文虚构样例的真实模型反馈，不是这次新调用；原答与原回执分别保留。",
      };
    } catch {
      /* A different answer, changed or damaged receipt is never adopted. */
    }
  }
  return empty(
    "这份原答已保存，尚无对应的逐项评阅。可对照参考自检；新提交尚未开放，不会外发原答。",
  );
}
