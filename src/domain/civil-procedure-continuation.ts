import { projectIntegratedFeedbackProgress } from "./integrated-feedback-progress";
import {
  civilProcedureReviewQuestion,
  civilProcedureReviewSetForQuestion,
} from "../content/civil-procedure-review";
import type { FaultProgress } from "./fault-progress";

/** Saved work only. This projection does not diagnose, grade, or mark mastery. */
export function projectCivilProcedureContinuation(state: FaultProgress) {
  const current = civilProcedureReviewQuestion(state.exerciseId);
  const set = civilProcedureReviewSetForQuestion(state.exerciseId);
  if (
    !current ||
    !set ||
    state.practice?.chapterId !== set.chapter.id ||
    state.practice.scope !== "review" ||
    state.practice.mode !== "subjective" ||
    state.practice.cursors.subjective !== current.id
  )
    return null;

  const savedIds = new Set(
    set.questions
      .filter((question) =>
        state.attempts.some(
          (attempt) =>
            attempt.exerciseId === question.id &&
            attempt.revision === set.revision &&
            !attempt.choice &&
            !!attempt.answer.trim(),
        ),
      )
      .map((question) => question.id),
  );
  const hasDraft = (id: string) => {
    const draft = state.drafts[id];
    return !!draft && !draft.submittedId && draft.answer.length > 0;
  };
  const questions = projectIntegratedFeedbackProgress(
    state,
    set.questions,
    set.revision,
    set.href,
  );
  // Reuse the row's exact current-original binding, including after the
  // original round ended. Older originals' rewrite drafts stay separate.
  const hasRewriteDraft = (id: string) =>
    questions.some(
      (question) =>
        question.questionId === id && question.work === "rewrite_draft",
    );
  const pending = set.questions.filter(
    (question) =>
      !savedIds.has(question.id) ||
      hasDraft(question.id) ||
      hasRewriteDraft(question.id),
  );
  // Explicit entry stays unchanged. Only the default continuation chooses
  // current unfinished work first, then written work in the known queue.
  const target =
    pending.find((question) => question.id === current.id) ??
    pending.find(
      (question) => hasDraft(question.id) || hasRewriteDraft(question.id),
    ) ??
    pending[0];
  const resume = target ?? current;
  return {
    caseTitle: set.title,
    questions,
    savedCount: savedIds.size,
    totalCount: set.questions.length,
    complete: !target && savedIds.size === set.questions.length,
    pendingQuestionId: target?.id ?? null,
    resumeQuestionId: resume.id,
    resumeQuestionTitle: resume.title,
    resumeQuestionNumber:
      set.questions.findIndex((question) => question.id === resume.id) + 1,
    hasDraft: !!target && hasDraft(target.id),
    ...(target && hasRewriteDraft(target.id) ? { hasRewriteDraft: true } : {}),
    resumeHref: `${set.href}&question=${encodeURIComponent(resume.id)}`,
  };
}
