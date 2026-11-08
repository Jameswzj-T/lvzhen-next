import { assessmentPaper } from "../content/assessment-papers";
import {
  comprehensiveG7Subjects,
  isComprehensiveG7Paper,
} from "../content/comprehensive-g7";
import type { AssessmentPaper } from "../content/assessment-papers";
import {
  assessmentRunHref,
  isCivilIntegratedPaper,
} from "../content/civil-integrated-practice";
import { exerciseFor, exerciseRevision } from "../content/fault-catalog";
import type { PracticeSubject } from "../content/practice-set";
import { assessmentAttemptOrigin, assessmentCursors } from "./assessment";
import type { AssessmentRun } from "./assessment-schema";
import { hasPendingAnswerRewrite } from "./answer-rewrite";
import { checkedDirectLearningFeedback } from "./direct-learning-advice";
import type { FaultProgress } from "./fault-progress";
import { isCorrectChoice, validChoice } from "./objective-answer";

export function unfinishedStudyAssessment(
  state: FaultProgress,
  subject: PracticeSubject,
) {
  return state.assessments?.runs.find((run) => {
    const paper = assessmentPaper(run.paperId);
    return (
      !run.finishedAt &&
      paper?.revision === run.revision &&
      (isComprehensiveG7Paper(paper)
        ? comprehensiveG7Subjects(paper).includes(subject)
        : (paper.subject ?? "criminal-law") === subject)
    );
  });
}

export type CivilAssessmentQuestionRecord = {
  questionId: string;
  questionNumber: number;
  title: string;
  href: string | null;
  status:
    | "correct"
    | "incorrect"
    | "unanswered"
    | "saved"
    | "reviewed"
    | "needs_work"
    | "needs_check"
    | "unavailable";
  feedbackSaved: boolean;
  rewritePending: boolean;
};
export type CivilAssessmentRecord = {
  runId: string;
  title: string;
  mode: "objective" | "subjective";
  submittedAt: string;
  href: string;
  answered: number;
  total: number;
  correct: number;
  wrong: number;
  unanswered: number;
  unavailable: number;
  feedbackCount: number;
  questions: CivilAssessmentQuestionRecord[];
};
export type CivilAssessmentRecords = {
  totalRuns: number;
  runs: CivilAssessmentRecord[];
  pendingRewrite:
    | (CivilAssessmentQuestionRecord & { runId: string; paperTitle: string })
    | null;
};

/** Read saved originals, never the latest answer to the same question. No writes,
 * model calls, scores or inferred mastery; callers choose the visible history window. */
export function projectCivilAssessmentRecords(
  state: FaultProgress,
  limit = 3,
): CivilAssessmentRecords {
  return projectCivilRecords(state, limit);
}

/** An explicitly opened older run must not disappear behind the history window. */
export function projectCivilAssessmentRecord(
  state: FaultProgress,
  runId: string,
): CivilAssessmentRecord | null {
  return projectCivilRecords(state, 1, runId).runs[0] ?? null;
}

/** The same exact-original projection for the G7 collection. No new scoring. */
export function projectComprehensiveAssessmentRecord(
  state: FaultProgress,
  runId: string,
): CivilAssessmentRecord | null {
  return (
    projectCivilRecords(state, 1, runId, isComprehensiveG7Paper).runs[0] ?? null
  );
}

function projectCivilRecords(
  state: FaultProgress,
  limit: number,
  selectedRunId?: string,
  eligible: (
    paper: AssessmentPaper | undefined,
  ) => boolean = isCivilIntegratedPaper,
): CivilAssessmentRecords {
  const completed = (state.assessments?.runs ?? [])
    .filter((run) => {
      const paper = assessmentPaper(run.paperId);
      return (
        run.finishedAt &&
        Number.isFinite(Date.parse(run.finishedAt)) &&
        eligible(paper) &&
        paper!.revision === run.revision
      );
    })
    .sort(
      (a, b) =>
        b.finishedAt!.localeCompare(a.finishedAt!) || b.id.localeCompare(a.id),
    );
  const originals = new Map<string, FaultProgress["attempts"]>();
  for (const attempt of state.attempts) {
    const entries = originals.get(attempt.id) ?? [];
    entries.push(attempt);
    originals.set(attempt.id, entries);
  }
  const questionRecord = (
    run: AssessmentRun,
    questionId: string,
    index: number,
  ): CivilAssessmentQuestionRecord => {
    const paper = assessmentPaper(run.paperId)!;
    const q = exerciseFor(questionId)!;
    const base = {
      questionId,
      questionNumber: index + 1,
      title: q.title,
      href: assessmentRunHref(run.id, paper, index + 1),
      feedbackSaved: false,
      rewritePending: false,
    };
    const answer = run.answers[questionId];
    const attemptId = run.attemptIds[questionId];
    if (!answer?.choice && !answer?.answer.trim())
      return {
        ...base,
        href: attemptId ? null : base.href,
        status: attemptId ? "unavailable" : "unanswered",
      };
    const candidates = originals.get(attemptId) ?? [];
    const original = candidates.length === 1 ? candidates[0] : null;
    const origin = original && assessmentAttemptOrigin(state, original);
    if (
      !original ||
      original.revision !== exerciseRevision(questionId) ||
      origin?.runId !== run.id ||
      origin.questionNumber !== index + 1
    )
      return { ...base, href: null, status: "unavailable" };
    if (q.kind === "objective")
      return validChoice(q, original.choice)
        ? {
            ...base,
            status: isCorrectChoice(q, original.choice)
              ? "correct"
              : "incorrect",
          }
        : { ...base, href: null, status: "unavailable" };
    const rewritePending = hasPendingAnswerRewrite(state, {
      runId: run.id,
      questionId,
      attemptId,
    });
    const checked = checkedDirectLearningFeedback(state, original);
    if (!checked)
      return {
        ...base,
        rewritePending,
        status: state.submittedFeedback?.some((f) => f.attemptId === attemptId)
          ? "needs_check"
          : "saved",
      };
    const result = checked.result;
    const unsettled =
      result.view.status !== "assessed" ||
      !result.view.points.length ||
      result.view.points.some((p) => p.status === "uncertain") ||
      result.pointReviews?.some((p) => p.state === "needs_review");
    return {
      ...base,
      rewritePending,
      feedbackSaved: true,
      status: unsettled
        ? "needs_check"
        : result.view.points.some((p) => p.status !== "covered")
          ? "needs_work"
          : "reviewed",
    };
  };
  const cursors = assessmentCursors(state);
  // Drafts have no edit timestamp. Prefer the currently selected original, then
  // the source submission order; never describe this as the latest edited draft.
  const active = completed.find(
    (run) => run.id === state.assessments?.activeId,
  );
  const draftRuns = active
    ? [active, ...completed.filter((r) => r !== active)]
    : completed;
  let pendingRewrite: CivilAssessmentRecords["pendingRewrite"] = null;
  for (const run of draftRuns) {
    const paper = assessmentPaper(run.paperId)!;
    const ids = paper.questionIds;
    const cursor = cursors[run.id] ?? 0;
    const ordered = [
      cursor,
      ...ids.map((_, i) => i).filter((i) => i !== cursor),
    ];
    for (const index of ordered) {
      const questionId = ids[index];
      if (!questionId || !state.correctionDrafts[run.attemptIds[questionId]])
        continue;
      const row = questionRecord(run, questionId, index);
      if (row.rewritePending && row.href) {
        pendingRewrite = { ...row, runId: run.id, paperTitle: paper.title };
        break;
      }
    }
    if (pendingRewrite) break;
  }
  const size =
    Number.isSafeInteger(limit) && limit > 0 ? Math.min(limit, 1000) : 3;
  return {
    totalRuns: completed.length,
    pendingRewrite,
    runs: (selectedRunId === undefined
      ? completed.slice(0, size)
      : completed.filter((run) => run.id === selectedRunId)
    ).map((run) => {
      const paper = assessmentPaper(run.paperId)!;
      const questions = paper.questionIds.map((id, index) =>
        questionRecord(run, id, index),
      );
      return {
        runId: run.id,
        title: paper.title,
        mode: paper.mode!,
        submittedAt: run.finishedAt!,
        href: assessmentRunHref(run.id, paper),
        total: questions.length,
        answered: questions.filter(
          (q) => q.status !== "unanswered" && q.status !== "unavailable",
        ).length,
        correct: questions.filter((q) => q.status === "correct").length,
        wrong: questions.filter((q) => q.status === "incorrect").length,
        unanswered: questions.filter((q) => q.status === "unanswered").length,
        unavailable: questions.filter((q) => q.status === "unavailable").length,
        feedbackCount: questions.filter((q) => q.feedbackSaved).length,
        questions,
      };
    }),
  };
}
