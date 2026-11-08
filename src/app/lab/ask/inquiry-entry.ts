import { exerciseFor, topicFor } from "../../../content/fault-catalog";
import type { FaultProgress } from "../../../domain/fault-progress";
import { prepareInquiryDraft, saveInquiry } from "../../../domain/study-space";

export type InquiryEntryContext = {
  exerciseId?: string;
  topicId?: string;
  originRunId?: string;
};

export function inquiryEntryConflict(
  state: FaultProgress,
  requested: InquiryEntryContext,
) {
  if (
    !state.inquiryDraft?.text.trim() ||
    (!requested.exerciseId && !requested.topicId)
  )
    return false;
  if (requested.exerciseId && !exerciseFor(requested.exerciseId)) return false;
  if (requested.topicId && !topicFor(requested.topicId)) return false;
  // Normalize run association using the same existing, locally verified rules.
  const target = prepareInquiryDraft(
    { ...state, inquiryDraft: { text: "" } },
    requested,
  ).inquiryDraft;
  return (
    target?.exerciseId !== state.inquiryDraft.exerciseId ||
    (!target?.exerciseId && target?.topicId !== state.inquiryDraft.topicId) ||
    target?.originRunId !== state.inquiryDraft.originRunId
  );
}

/** Explicit learner choice: retain the old wording and its original association
 * as a saved question before opening a blank question for the requested case. */
export function savePreviousInquiryAndEnter(
  state: FaultProgress,
  requested: InquiryEntryContext,
  id: string,
  at: string,
) {
  if (!inquiryEntryConflict(state, requested)) return state;
  const saved = saveInquiry(state, id, at);
  return saved === state ? state : prepareInquiryDraft(saved, requested);
}
