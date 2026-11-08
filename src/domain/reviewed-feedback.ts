// One manually reviewed learning reference. It never identifies or grades a learner answer.
export const reviewedFeedbackTarget = {
  paperId: "cap-contract-v2",
  questionId: "cap-contract-v2-q2",
  samples: ["UB01", "UB02", "assisted"],
} as const;
export type ReviewedFeedbackSample =
  (typeof reviewedFeedbackTarget.samples)[number];
const safeRun = (value: unknown): value is string => {
  if (typeof value !== "string" || !value.length || value.length > 100)
    return false;
  try {
    encodeURIComponent(value);
    return true;
  } catch {
    return false;
  }
};
export function reviewedFeedbackHref(
  sample: ReviewedFeedbackSample = "assisted",
  fromRun?: string,
) {
  if (!reviewedFeedbackTarget.samples.includes(sample))
    throw Error("reviewed-sample-not-allowed");
  if (fromRun !== undefined && !safeRun(fromRun))
    throw Error("invalid-return-run");
  return `/lab/assessment?paper=${reviewedFeedbackTarget.paperId}&feedback=${sample}${fromRun ? `&fromRun=${encodeURIComponent(fromRun)}` : ""}`;
}
export function reviewedFeedbackRoute(
  params: Record<string, string | string[] | undefined>,
) {
  if (params.feedback === undefined) return null;
  if (
    params.paper !== reviewedFeedbackTarget.paperId ||
    params.run !== undefined ||
    typeof params.feedback !== "string" ||
    !reviewedFeedbackTarget.samples.includes(
      params.feedback as ReviewedFeedbackSample,
    ) ||
    (params.fromRun !== undefined && !safeRun(params.fromRun))
  )
    throw Error("reviewed-reference-route-not-allowed");
  return {
    sample: params.feedback as ReviewedFeedbackSample,
    returnHref: params.fromRun
      ? `/lab/assessment?run=${encodeURIComponent(params.fromRun as string)}`
      : `/lab/assessment?paper=${reviewedFeedbackTarget.paperId}`,
    fromRun: params.fromRun as string | undefined,
  };
}
export function hasReviewedQuestionReference(
  paperId: string,
  questionId: string,
) {
  return (
    paperId === reviewedFeedbackTarget.paperId &&
    questionId === reviewedFeedbackTarget.questionId
  );
}
