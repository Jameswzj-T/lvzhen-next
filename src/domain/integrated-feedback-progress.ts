import type { UnitExercise } from "../content/fault-unit";
import { hasPendingAnswerRewrite } from "./answer-rewrite";
import type { FaultProgress } from "./fault-progress";
import { submittedFeedbackSchema } from "./submitted-feedback";

export type IntegratedQuestionProgress = {
  questionId: string;
  title: string;
  href: string;
  work: "unanswered" | "draft" | "saved" | "rewrite_draft" | "record_review";
  feedback:
    "none" | "available" | "needs_review" | "unavailable" | "sample" | null;
  earlierOriginalSaved: boolean;
  savedRewrites: number;
};

/** Availability of saved feedback only, never a new judgment or mastery claim.
 * Follow the same submittedId as the question page; an earlier answer's result
 * must not stand in for an unsubmitted/new answer. No text leaves this reader.
 */
export function projectIntegratedFeedbackProgress(
  state: FaultProgress,
  questions: readonly UnitExercise[],
  revision: string,
  reviewHref: string,
): IntegratedQuestionProgress[] {
  return questions.map((question) => {
    const draft = state.drafts[question.id];
    const originals = state.attempts.filter(
      (a) =>
        a.exerciseId === question.id &&
        a.revision === revision &&
        !a.choice &&
        !!a.answer.trim(),
    );
    const matches = originals.filter((a) => a.id === draft?.submittedId);
    const original = matches.length === 1 ? matches[0] : null;
    const progress: IntegratedQuestionProgress = {
      questionId: question.id,
      title: question.title,
      href: `${reviewHref}&question=${encodeURIComponent(question.id)}`,
      work: draft?.submittedId
        ? original
          ? hasPendingAnswerRewrite(state, {
              questionId: question.id,
              attemptId: original.id,
            })
            ? "rewrite_draft"
            : "saved"
          : "record_review"
        : draft?.answer.length
          ? "draft"
          : "unanswered",
      feedback: original ? "none" : null,
      earlierOriginalSaved: !original && originals.length > 0,
      savedRewrites: original
        ? state.corrections.filter((r) => r.attemptId === original.id).length
        : 0,
    };
    if (!original) return progress;
    const rows = state.submittedFeedback ?? [];
    const selected = rows.findLast((r) => r.attemptId === original.id);
    if (!selected) return progress;
    // A saved but incompatible row is visible as needing review, not silently
    // converted into "no feedback" or adopted as the current answer's result.
    progress.feedback = "needs_review";
    const parsed = submittedFeedbackSchema.safeParse(selected);
    if (!parsed.success) return progress;
    const row = parsed.data;
    const { view } = row.result;
    if (
      row.id !== `submitted:${original.id}:${row.result.id}` ||
      rows.filter((r) => r.id === row.id).length !== 1 ||
      state.attempts.filter((a) => a.id === original.id).length !== 1 ||
      row.questionId !== question.id ||
      row.revision !== revision ||
      row.answer !== original.answer ||
      row.choice ||
      view.title !== question.title ||
      view.facts !== question.facts ||
      view.prompt !== question.prompt
    )
      return progress;
    if (["system_error", "no_answer"].includes(view.status)) {
      progress.feedback = "unavailable";
      return progress;
    }
    if (
      view.points.length !== question.criteria?.length ||
      view.points.some((point) => {
        const criterion = question.criteria?.find((c) => c.id === point.id);
        return (
          !criterion ||
          point.label !== criterion.label ||
          point.meaning !== criterion.meaning ||
          point.acceptable !== criterion.acceptable ||
          point.boundary !== criterion.boundary
        );
      })
    )
      return progress;
    progress.feedback =
      row.result.source !== "real_provider" || row.result.purpose !== "practice"
        ? "sample"
        : view.status !== "assessed" ||
            view.points.some((p) => p.status === "uncertain") ||
            row.result.pointReviews?.some((r) => r.state === "needs_review")
          ? "needs_review"
          : "available";
    return progress;
  });
}
