import { assessmentPaper } from "../content/assessment-papers";
import { exerciseFor, exerciseRevision } from "../content/fault-catalog";
import {
  hasSeenPracticeReference,
  exposePracticeReference,
} from "./reference-exposure";
import type { FaultProgress, UnitAttempt } from "./fault-progress";
import type { AssessmentRun } from "./assessment-schema";
import { choiceMode, isCorrectChoice, validChoice } from "./objective-answer";

export const currentAssessment = (p: FaultProgress) =>
  p.assessments?.runs.find((r) => r.id === p.assessments?.activeId);
/** A newly created run can precede the next UI clock tick; never add display time. */
export function assessmentRemainingSeconds(
  run: AssessmentRun | undefined,
  clock: number,
) {
  if (!run?.deadlineAt) return null;
  return Math.max(
    0,
    Math.ceil(
      (Date.parse(run.deadlineAt) -
        Math.max(clock, Date.parse(run.startedAt))) /
        1000,
    ),
  );
}
export const unfinishedAssessment = (p: FaultProgress) =>
  p.assessments?.runs.find((r) => !r.finishedAt);
// Keep positions outside submitted runs so reviewing never edits an original.
export const assessmentCursors = (p: FaultProgress) => ({
  ...p.assessments?.cursors,
  ...(p.assessments?.activeId
    ? { [p.assessments.activeId]: p.assessments.cursor }
    : {}),
});

/** Resolve the saved event, never the active/latest sheet or matching wording. */
export function assessmentAttemptOrigin(
  p: FaultProgress,
  attempt: UnitAttempt,
) {
  const bindings = (p.assessments?.runs ?? []).flatMap((run) =>
    Object.entries(run.attemptIds)
      .filter(([, id]) => id === attempt.id)
      .map(([questionId]) => ({ run, questionId })),
  );
  if (bindings.length !== 1) return null;
  const { run, questionId } = bindings[0];
  const paper = assessmentPaper(run.paperId);
  const answer = run.answers[questionId];
  const index = paper?.questionIds.indexOf(questionId) ?? -1;
  if (
    !paper ||
    !run.finishedAt ||
    run.revision !== paper.revision ||
    index < 0 ||
    questionId !== attempt.exerciseId ||
    answer?.answer !== attempt.answer ||
    answer.choice !== attempt.choice ||
    attempt.submittedAt !== run.finishedAt ||
    attempt.hintUsed ||
    attempt.referenceSeenBeforeAnswer !==
      run.seenQuestionIds.includes(questionId)
  )
    return null;
  return {
    runId: run.id,
    paperId: paper.id,
    paperTitle: paper.title,
    kind: paper.kind,
    questionNumber: index + 1,
  };
}
const hasAnswer = (a: { choice: string; answer: string } | undefined) =>
  !!(a && (a.choice || a.answer.trim()));
export function seenAssessmentQuestions(p: FaultProgress, ids: string[]) {
  return ids.filter((id) => hasSeenPracticeReference(p, id));
}
export function viewAssessmentReference(
  p: FaultProgress,
  runId: string,
  questionId: string,
) {
  const run = p.assessments?.runs.find((r) => r.id === runId);
  if (
    !run?.finishedAt ||
    !assessmentPaper(run.paperId)?.questionIds.includes(questionId)
  )
    return p;
  return exposePracticeReference(p, questionId);
}
export function startAssessment(
  p: FaultProgress,
  paperId: string,
  runId: string,
  at: string,
): FaultProgress {
  if (!Number.isFinite(Date.parse(at))) return p;
  const settled = settleAssessments(p, at);
  const open =
    settled.assessments?.runs.find(
      (r) => r.paperId === paperId && !r.finishedAt,
    ) ?? unfinishedAssessment(settled);
  if (open) return selectAssessment(settled, open.id);
  const paper = assessmentPaper(paperId);
  if (
    !paper ||
    paper.archived ||
    !runId ||
    runId.length > 100 ||
    (settled.assessments?.runs.length ?? 0) >= 1000 ||
    settled.assessments?.runs.some((r) => r.id === runId)
  )
    return settled;
  const run: AssessmentRun = {
    id: runId,
    paperId,
    revision: paper.revision,
    startedAt: at,
    deadlineAt:
      paper.minutes === null
        ? null
        : new Date(Date.parse(at) + paper.minutes * 60000).toISOString(),
    finishedAt: null,
    finishReason: null,
    answers: {},
    attemptIds: {},
    seenQuestionIds: seenAssessmentQuestions(settled, paper.questionIds),
  };
  return {
    ...settled,
    updatedAt: at,
    assessments: {
      runs: [...(settled.assessments?.runs ?? []), run],
      activeId: runId,
      cursor: 0,
      cursors: { ...assessmentCursors(settled), [runId]: 0 },
    },
  };
}
export function selectAssessment(
  p: FaultProgress,
  runId: string,
): FaultProgress {
  if (!p.assessments?.runs.some((r) => r.id === runId)) return p;
  if (p.assessments.activeId === runId) return p;
  const cursors = assessmentCursors(p);
  return {
    ...p,
    assessments: {
      ...p.assessments,
      activeId: runId,
      cursor: cursors[runId] ?? 0,
      cursors,
    },
  };
}
export function navigateAssessment(
  p: FaultProgress,
  cursor: number,
  at: string,
): FaultProgress {
  const state = settleAssessments(p, at);
  const run = currentAssessment(state);
  if (
    !run ||
    !Number.isSafeInteger(cursor) ||
    cursor < 0 ||
    cursor >= assessmentPaper(run.paperId)!.questionIds.length
  )
    return state;
  return {
    ...state,
    assessments: {
      ...state.assessments!,
      cursor,
      cursors: { ...assessmentCursors(state), [run.id]: cursor },
    },
  };
}
export function editAssessment(
  p: FaultProgress,
  questionId: string,
  patch: { choice?: string; answer?: string },
  at: string,
): FaultProgress {
  const state = settleAssessments(p, at);
  const run = currentAssessment(state);
  if (
    !run ||
    run.finishedAt ||
    !assessmentPaper(run.paperId)!.questionIds.includes(questionId)
  )
    return state;
  const q = exerciseFor(questionId)!;
  if (
    (patch.answer?.length ?? 0) > 8000 ||
    (patch.choice && !validChoice(q, patch.choice)) ||
    (q.kind === "objective" && patch.answer !== undefined) ||
    (q.kind === "subjective" && patch.choice !== undefined)
  )
    return state;
  const answers = {
    ...run.answers,
    [questionId]: {
      ...(run.answers[questionId] ?? { choice: "", answer: "" }),
      ...patch,
    },
  };
  return {
    ...state,
    updatedAt: at,
    assessments: {
      ...state.assessments!,
      runs: state.assessments!.runs.map((r) =>
        r.id === run.id ? { ...r, answers } : r,
      ),
    },
  };
}
export function finishAssessment(
  p: FaultProgress,
  runId: string,
  at: string,
): FaultProgress {
  const run = p.assessments?.runs.find((r) => r.id === runId);
  const timestamp = Date.parse(at);
  if (
    !run ||
    run.finishedAt ||
    !Number.isFinite(timestamp) ||
    timestamp < Date.parse(run.startedAt)
  )
    return p;
  const paper = assessmentPaper(run.paperId)!;
  const timedOut = !!run.deadlineAt && timestamp >= Date.parse(run.deadlineAt);
  const finishedAt = timedOut ? run.deadlineAt! : at;
  const seenQuestionIds = [
    ...new Set([
      ...run.seenQuestionIds,
      ...seenAssessmentQuestions(p, paper.questionIds),
    ]),
  ];
  const answered = paper.questionIds.filter((id) => hasAnswer(run.answers[id]));
  if (p.attempts.length + answered.length > 10000)
    throw new Error("学习记录已达容量上限，请先导出记录。");
  const attemptIds = Object.fromEntries(
    answered.map((id, i) => [id, `${run.id}:q${i + 1}`]),
  );
  const existing = new Set(
    [...p.attempts, ...p.reviews, ...p.corrections].map((a) => a.id),
  );
  if (Object.values(attemptIds).some((id) => existing.has(id)))
    throw new Error("记录编号发生冲突，原答仍保留，请先导出记录。");
  const attempts = answered.map((id) => ({
    id: attemptIds[id],
    exerciseId: id,
    revision: exerciseRevision(id),
    ...run.answers[id],
    hintUsed: false,
    referenceSeenBeforeAnswer: seenQuestionIds.includes(id),
    submittedAt: finishedAt,
    reasoningAssessment: "not_evaluated" as const,
  }));
  // Keep ordinary-practice drafts unchanged. A complete paper owns its own answers.
  return {
    ...p,
    updatedAt: at,
    attempts: [...p.attempts, ...attempts],
    assessments: {
      ...p.assessments!,
      runs: p.assessments!.runs.map((r) =>
        r.id === runId
          ? {
              ...r,
              attemptIds,
              seenQuestionIds,
              finishedAt,
              finishReason: timedOut ? "timeout" : "manual",
            }
          : r,
      ),
    },
  };
}
export function settleAssessments(p: FaultProgress, at: string) {
  let state = p;
  for (const run of p.assessments?.runs ?? [])
    if (
      !run.finishedAt &&
      run.deadlineAt &&
      Date.parse(at) >= Date.parse(run.deadlineAt)
    )
      state = finishAssessment(state, run.id, at);
  return state;
}
export function assessmentResult(run: AssessmentRun) {
  const paper = assessmentPaper(run.paperId)!;
  const questions = paper.questionIds.map((id) => exerciseFor(id)!);
  const answered = questions.filter((q) => hasAnswer(run.answers[q.id])).length;
  if (!run.finishedAt)
    return {
      answered,
      total: questions.length,
      score: null,
      maxScore: null,
      wrongIds: [] as string[],
    };
  const objectives = questions.filter((q) => q.kind === "objective");
  const points = (q: (typeof questions)[number]) =>
    choiceMode(q) === "single" ? 1 : 2;
  return {
    answered,
    total: questions.length,
    score:
      paper.kind === "exam" && objectives.length > 0
        ? objectives.reduce(
            (sum, q) =>
              sum +
              (isCorrectChoice(q, run.answers[q.id]?.choice ?? "")
                ? points(q)
                : 0),
            0,
          )
        : null,
    maxScore:
      paper.kind === "exam" && objectives.length > 0
        ? objectives.reduce((sum, q) => sum + points(q), 0)
        : null,
    wrongIds: objectives
      .filter(
        (q) =>
          hasAnswer(run.answers[q.id]) &&
          !isCorrectChoice(q, run.answers[q.id]!.choice),
      )
      .map((q) => q.id),
  };
}
