import { exerciseFor, exerciseRevision } from "../content/fault-catalog";
import {
  isChapterReview,
  isPracticeLocation,
  practiceChapter,
  practiceTopic,
  practiceSubject,
  practiceSubjectInfo,
  type PracticeSubject,
  type PracticeSubjectInfo,
} from "../content/practice-set";
import { feedbackRetryTask } from "./feedback-retry";
import {
  progressSchema,
  type FaultProgress,
  type FeedbackRetryPauseReason,
} from "./fault-progress";
import { initializePractice, visitPractice } from "./practice";
import { projectCivilContractContinuation } from "./civil-contract-continuation";

export type StudyPosition = {
  questionId: string;
  revision: string;
  title: string;
  topicId: string;
  topicTitle: string;
  chapterId: string;
  chapterTitle: string;
  mode: "objective" | "subjective";
  stage:
    | "viewed"
    | "draft"
    | "saved"
    | "saved_pending"
    | "incompatible"
    | "comparable"
    | "paused";
  hasFeedbackRetry: boolean;
};
export type StudyRetryContinuation = StudyPosition & {
  id: string;
  taskId: string;
  originalAttemptId: string;
  feedbackId: string;
  feedbackResultId: string;
  startedAt: string;
  paused: FeedbackRetryPauseReason | null;
  action: "continue" | "review";
};
export type StudyContinuation = {
  current: StudyPosition | null;
  unfinishedRetry: StudyRetryContinuation | null;
};

function positionFor(
  state: FaultProgress,
  questionId: string,
): StudyPosition | null {
  const q = exerciseFor(questionId);
  if (
    !q ||
    (isChapterReview(questionId) &&
      (questionId !== state.exerciseId ||
        !projectCivilContractContinuation(state))) ||
    !isPracticeLocation(questionId, q.kind)
  )
    return null;
  const draft = state.drafts[questionId];
  const revision = exerciseRevision(questionId);
  if (
    !draft &&
    !state.practice?.viewed[questionId] &&
    !state.attempts.some(
      (a) => a.exerciseId === questionId && a.revision === revision,
    )
  )
    return null;
  const retry = feedbackRetryTask(state, questionId);
  const submitted =
    draft?.submittedId &&
    state.attempts.find(
      (a) =>
        a.id === draft.submittedId &&
        a.exerciseId === questionId &&
        a.revision === revision,
    );
  const topic = practiceTopic(questionId);
  const chapter = practiceChapter(questionId);
  return {
    questionId,
    revision,
    title: q.title,
    topicId: topic.id,
    topicTitle: topic.title,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    mode: q.kind,
    hasFeedbackRetry: !!draft?.feedbackRetry,
    stage: retry?.blockedReason
      ? "paused"
      : retry
        ? retry.status
        : draft?.feedbackRetry
          ? "incompatible"
          : submitted
            ? "saved"
            : draft && (draft.answer.length || draft.choice)
              ? "draft"
              : "viewed",
  };
}

/** Metadata only: the study home never receives a private answer or receipt. */
export function projectStudyContinuation(
  state: FaultProgress,
  subject?: PracticeSubject,
): StudyContinuation {
  const cursor = state.practice?.cursors[state.practice.mode];
  const current =
    cursor && (!subject || practiceSubject(cursor) === subject)
      ? positionFor(state, cursor)
      : null;
  const unfinished = Object.entries(state.drafts)
    .flatMap(([questionId, draft]) => {
      if (
        draft.submittedId ||
        !draft.feedbackRetry ||
        (subject && practiceSubject(questionId) !== subject)
      )
        return [];
      const retry = feedbackRetryTask(state, questionId);
      const position = positionFor(state, questionId);
      if (!retry || retry.current || !position) return [];
      const link = retry.task;
      const paused = retry.blockedReason;
      return [
        {
          ...position,
          id: `retry:${link.taskId}:${link.originalAttemptId}:${link.feedbackId}:${link.feedbackResultId}:${link.questionId}:${link.revision}:${retry.feedback.identity}:${paused ?? "continue"}`,
          taskId: link.taskId,
          originalAttemptId: link.originalAttemptId,
          feedbackId: link.feedbackId,
          feedbackResultId: link.feedbackResultId,
          startedAt: link.startedAt,
          paused,
          action: paused ? ("review" as const) : ("continue" as const),
        },
      ];
    })
    .sort(
      (a, b) =>
        b.startedAt.localeCompare(a.startedAt) ||
        b.taskId.localeCompare(a.taskId),
    );
  // Only startedAt is task-specific. Do not invent a last-edited timestamp from
  // the whole checkpoint, which may have changed while answering another topic.
  return { current, unfinishedRetry: unfinished[0] ?? null };
}

/** Recheck the shown task, then use the existing exact-question navigation. */
export function prepareStudyContinuation(
  state: FaultProgress,
  continuationId: string,
  at: string,
  subject?: PracticeSubject,
): {
  state: FaultProgress;
  href: PracticeSubjectInfo["href"];
} | null {
  if (
    !Number.isFinite(Date.parse(at)) ||
    !progressSchema.safeParse(state).success
  )
    return null;
  const next = projectStudyContinuation(state, subject).unfinishedRetry;
  if (!next || next.id !== continuationId) return null;
  const initialized = initializePractice(state);
  const moved = visitPractice(
    {
      ...initialized,
      practice: {
        ...initialized.practice!,
        mode: "subjective",
        ended: { ...initialized.practice!.ended, subjective: false },
      },
    },
    next.questionId,
    at,
  );
  if (
    moved.exerciseId !== next.questionId ||
    !progressSchema.safeParse(moved).success
  )
    return null;
  // A paused source remains paused. The existing panel can show the preserved
  // draft for review; entering it is not approval to resume or evaluate it.
  return {
    state: moved,
    href: practiceSubjectInfo(practiceSubject(next.questionId)).href,
  };
}
