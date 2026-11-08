import { validateResult, type EvaluationInput } from "./index";

/** Accept raw data at this public boundary and validate again before displaying it. */
export function toFeedback(input: EvaluationInput, raw: unknown) {
  const result = validateResult(input, raw);
  const pending =
    result.status === "system_error" || result.status === "no_answer";
  return {
    caseId: result.caseId,
    caseRevision: result.caseRevision,
    answerId: result.answerId,
    originalText: input.studentText,
    status: result.status,
    heading:
      result.status === "system_error"
        ? "暂未完成评阅"
        : result.status === "no_answer"
          ? "还没有作答"
          : result.status === "needs_clarification"
            ? "有一处需要你说明"
            : "逐项看看你的分析",
    evidence: pending
      ? []
      : result.criteria.map((item) => ({
          criterionId: item.id,
          status: item.status,
          quotes: [...item.evidence],
          explanation: item.reason,
        })),
    substantiveIssue: pending ? null : result.substantiveIssue,
    terminologySuggestion: pending ? null : result.terminologyIssue,
    clarification: pending ? null : result.clarification,
    notice: pending
      ? "原文已保留；当前不判断对错。"
      : "这是评阅意见，不代表已经掌握；可以对照原文提出疑问。",
  };
}
