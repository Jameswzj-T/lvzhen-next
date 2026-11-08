import { assessmentPaper } from "../content/assessment-papers";
import { exerciseFor, exerciseRevision } from "../content/fault-catalog";
import { correctionDraftSchema, type FaultProgress } from "./fault-progress";
import { saveCorrection, type CorrectionDraft } from "./corrections";

export type RewriteTarget = {
  attemptId: string;
  questionId: string;
  runId?: string;
};

// Resolve the actual run mapping; unanswered questions do not have attempts.
export function rewriteOriginal(state: FaultProgress, target: RewriteTarget) {
  const attempt = state.attempts.find((a) => a.id === target.attemptId);
  if (
    !attempt ||
    attempt.exerciseId !== target.questionId ||
    exerciseFor(attempt.exerciseId)?.kind !== "subjective" ||
    attempt.revision !== exerciseRevision(attempt.exerciseId)
  )
    return null;
  if (target.runId) {
    const run = state.assessments?.runs.find((r) => r.id === target.runId);
    const paper = run && assessmentPaper(run.paperId);
    if (
      !run?.finishedAt ||
      (paper?.kind !== "case" &&
        !(
          paper?.collection === "comprehensive-g7" &&
          paper.mode === "subjective"
        ) &&
        !(
          paper?.kind === "practice" &&
          paper.subject === "civil-law" &&
          paper.mode === "subjective"
        )) ||
      !paper.questionIds.includes(target.questionId) ||
      run.attemptIds[target.questionId] !== attempt.id ||
      run.answers[target.questionId]?.answer !== attempt.answer
    )
      return null;
  }
  return attempt;
}

/** An editable draft for this exact original, not an assessment or saved answer. */
export function hasPendingAnswerRewrite(
  state: FaultProgress,
  target: RewriteTarget,
) {
  const draft = state.correctionDrafts[target.attemptId];
  return (
    !!rewriteOriginal(state, target) &&
    !!draft &&
    (draft.answer.length > 0 || draft.note.length > 0)
  );
}

export function editAnswerRewrite(
  state: FaultProgress,
  target: RewriteTarget,
  draft: CorrectionDraft,
) {
  const parsed = correctionDraftSchema.safeParse(draft);
  if (!rewriteOriginal(state, target) || !parsed.success) return state;
  return {
    ...state,
    correctionDrafts: {
      ...state.correctionDrafts,
      [target.attemptId]: parsed.data,
    },
  };
}

export function saveAnswerRewrite(
  state: FaultProgress,
  target: RewriteTarget,
  eventId: string,
  at: string,
) {
  if (
    !rewriteOriginal(state, target) ||
    !state.correctionDrafts[target.attemptId]?.answer.trim()
  )
    return state;
  return saveCorrection(state, target.attemptId, eventId, at);
}
