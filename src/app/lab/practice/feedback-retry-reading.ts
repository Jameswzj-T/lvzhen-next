import type { UnitAttempt } from "../../../domain/fault-progress";
import type { LearningObservation } from "../../../domain/learning-observation-schema";

const labels = {
  model_yes: "模型认可",
  model_no: "模型未认可",
  needs_review: "待核对",
  covered: "已表达",
  partial: "部分表达",
  missing: "尚未表达",
  contradicted: "明确相反",
  uncertain: "待核对",
};

/** Read saved feedback, never grade or change a saved answer. */
export function feedbackRetryPointReading(
  feedback: LearningObservation,
  attempt: UnitAttempt,
  pointId: string,
) {
  if (
    feedback.attemptId !== attempt.id ||
    feedback.questionId !== attempt.exerciseId ||
    feedback.revision !== attempt.revision ||
    feedback.answer !== attempt.answer
  )
    return null;
  const matches = feedback.points.filter((point) => point.id === pointId);
  if (matches.length !== 1) return null;
  const point = matches[0];
  const invalidQuote = point.quotes.some(
    (quote) => !quote.trim() || !attempt.answer.includes(quote),
  );
  const held =
    feedback.state !== "reviewed" ||
    feedback.source !== "real_provider" ||
    point.status === "needs_review" ||
    point.nativeStatus === "uncertain" ||
    invalidQuote;
  return {
    label: held ? "待核对" : labels[point.nativeStatus ?? point.status],
    explanation: invalidQuote
      ? "这项反馈的原文依据未能对应这次作答，先对照要求，不据此判断是否改正。"
      : point.reviewNote?.trim() ||
        (held
          ? "这项判断仍待核对，先对照本题要求；原反馈可在下方回看。"
          : point.explanation.trim() ||
            "这项反馈没有具体说明，可先对照本题要求。"),
    quotes: invalidQuote ? [] : [...point.quotes],
    held,
  };
}
