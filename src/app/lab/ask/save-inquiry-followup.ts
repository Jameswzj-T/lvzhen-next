import type { FaultProgress } from "../../../domain/fault-progress";
import { prepareInquiryDraft, saveInquiry } from "../../../domain/study-space";

/** A new question in the same conversation keeps only its existing association. */
export function saveInquiryFollowup(
  state: FaultProgress,
  id: string,
  at: string,
): FaultProgress {
  const context = state.inquiryDraft;
  const saved = saveInquiry(state, id, at);
  if (saved === state || !context) return saved;
  return prepareInquiryDraft(saved, {
    exerciseId: context.exerciseId,
    topicId: context.topicId,
    originRunId: context.originRunId,
  });
}
