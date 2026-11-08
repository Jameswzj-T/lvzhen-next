import { inquiryViewSchema, type InquiryIdentity } from "./question-inquiry";
import type { FaultProgress } from "./fault-progress";

export function savedInquiryExplanation(
  progress: FaultProgress,
  identity: InquiryIdentity,
) {
  const item = progress.inquiries?.find(
    (row) =>
      row.id === identity.inquiryId &&
      row.exerciseId === identity.questionId &&
      row.exerciseRevision === identity.questionRevision &&
      row.text === identity.text,
  );
  return item
    ? (progress.inquiryExplanations?.find(
        (view) => view.identity.inquiryId === identity.inquiryId,
      ) ?? null)
    : null;
}
/** Adds a received explanation to its already saved original; never replaces an older response. */
export function recordInquiryExplanation(
  progress: FaultProgress,
  raw: unknown,
): FaultProgress {
  const view = inquiryViewSchema.parse(raw),
    identity = view.identity;
  const item = progress.inquiries?.find(
    (row) =>
      row.id === identity.inquiryId &&
      row.exerciseId === identity.questionId &&
      row.exerciseRevision === identity.questionRevision &&
      row.text === identity.text,
  );
  if (!item || savedInquiryExplanation(progress, identity)) return progress;
  return {
    ...progress,
    updatedAt: view.completedAt,
    inquiryExplanations: [...(progress.inquiryExplanations ?? []), view],
  };
}
