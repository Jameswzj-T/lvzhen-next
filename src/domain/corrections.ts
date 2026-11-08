import {
  correctionDraftSchema,
  progressSchema,
  type FaultProgress,
} from "./fault-progress";

export const freshCorrection = () => ({ note: "", answer: "", revisit: false });
export type CorrectionDraft = ReturnType<typeof freshCorrection>;

// The latest self-report controls review focus; no inference about correctness.
export function latestCorrections(state: FaultProgress) {
  const latest = new Map<string, FaultProgress["corrections"][number]>();
  for (const entry of [...state.corrections].sort(
    (a, b) =>
      a.submittedAt.localeCompare(b.submittedAt) || a.id.localeCompare(b.id),
  ))
    latest.set(entry.attemptId, entry);
  return [...latest.values()];
}

export function saveCorrection(
  state: FaultProgress,
  attemptId: string,
  eventId: string,
  at: string,
): FaultProgress {
  const draft = correctionDraftSchema.safeParse(
    state.correctionDrafts[attemptId],
  );
  if (
    !draft.success ||
    (!draft.data.note.trim() && !draft.data.answer.trim()) ||
    !state.attempts.some((a) => a.id === attemptId) ||
    [...state.attempts, ...state.reviews, ...state.corrections].some(
      (a) => a.id === eventId,
    )
  )
    return state;
  const drafts = { ...state.correctionDrafts };
  delete drafts[attemptId];
  const previous = latestCorrections(state).find(
    (c) => c.attemptId === attemptId,
  );
  const submittedAt =
    previous && previous.submittedAt >= at
      ? new Date(new Date(previous.submittedAt).getTime() + 1).toISOString()
      : at;
  const result = progressSchema.safeParse({
    ...state,
    updatedAt: submittedAt,
    correctionDrafts: drafts,
    corrections: [
      ...state.corrections,
      { ...draft.data, id: eventId, attemptId, submittedAt },
    ],
  });
  return result.success ? result.data : state;
}

export function finishCorrectionReview(
  state: FaultProgress,
  correctionId: string,
  eventId: string,
  at: string,
): FaultProgress {
  const entry = latestCorrections(state).find(
    (c) => c.id === correctionId && c.revisit,
  );
  if (!entry) return state;
  const next = saveCorrection(
    {
      ...state,
      correctionDrafts: {
        ...state.correctionDrafts,
        [entry.attemptId]: {
          note: entry.note,
          answer: entry.answer,
          revisit: false,
        },
      },
    },
    entry.attemptId,
    eventId,
    at,
  );
  if (next.corrections.length !== state.corrections.length + 1) return state;
  // Reviewing must not discard an independently edited correction draft.
  return { ...next, correctionDrafts: state.correctionDrafts };
}
