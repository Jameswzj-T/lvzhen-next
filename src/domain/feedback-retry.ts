import {
  feedbackRetryLinkSchema,
  freshDraft,
  progressSchema,
  type FaultProgress,
  type FeedbackRetryLink,
  type FeedbackRetryPauseReason,
  type UnitAttempt,
} from "./fault-progress";
import { teacherSourceNeedsReview } from "./teacher-source-feedback-contract";
import {
  compareLearningFeedback,
  feedbackForAttempt,
  feedbackObservation,
} from "./learning-observations";
import {
  learningObservationSchema,
  type LearningObservation,
} from "./learning-observation-schema";
import {
  editPractice,
  initializePractice,
  submitPractice,
  visitPractice,
} from "./practice";
import { exerciseFor, exerciseRevision } from "../content/fault-catalog";
import { isPracticeLocation, practiceSubject } from "../content/practice-set";
import { buildUnitFeedbackLearningSummary } from "../evaluation/unit-feedback-reading";
import { isRegisteredCivilUnitFeedbackQuestion } from "../evaluation/unit-feedback-catalog";
import { savedSubmittedFeedbackRetrySource } from "./submitted-feedback-learning";

export type {
  FeedbackRetryLink,
  FeedbackRetryPauseReason,
} from "./fault-progress";

export type FeedbackRetryView = {
  task: FeedbackRetryLink;
  original: UnitAttempt;
  current: UnitAttempt | null;
  feedback: LearningObservation;
  focusPoints: LearningObservation["points"];
  status: "draft" | "saved_pending" | "incompatible" | "comparable";
  comparison: ReturnType<typeof compareLearningFeedback>;
  afterFeedback: LearningObservation | null;
  reusedFeedback: boolean;
  blockedReason: FeedbackRetryPauseReason | null;
};

function sourceFor(state: FaultProgress, link: FeedbackRetryLink) {
  if (!feedbackRetryLinkSchema.safeParse(link).success) return null;
  const original = state.attempts.find((a) => a.id === link.originalAttemptId);
  const submittedSource = savedSubmittedFeedbackRetrySource(
    state,
    link.originalAttemptId,
    link.feedbackId,
  );
  const feedback =
    state.learningObservations?.find((r) => r.id === link.feedbackId) ??
    submittedSource;
  if (
    feedback?.unitResult?.sourceTeacher &&
    teacherSourceNeedsReview(
      feedback.unitResult.sourceTeacher,
      feedback.unitResult.view,
    )
  )
    return null;
  if (
    !original ||
    !feedback ||
    exerciseFor(link.questionId)?.kind !== "subjective" ||
    (practiceSubject(link.questionId) !== "criminal-law" &&
      !isRegisteredCivilUnitFeedbackQuestion(link.questionId) &&
      feedback !== submittedSource) ||
    !isPracticeLocation(link.questionId, "subjective") ||
    exerciseRevision(link.questionId) !== link.revision ||
    original.exerciseId !== link.questionId ||
    original.revision !== link.revision ||
    original.choice ||
    feedback.attemptId !== original.id ||
    feedback.questionId !== link.questionId ||
    feedback.revision !== link.revision ||
    feedback.answer !== original.answer ||
    feedback.resultId !== link.feedbackResultId ||
    !learningObservationSchema.safeParse(feedback).success ||
    (feedback.state !== "reviewed" &&
      !(
        feedback.protocol === "unit-feedback-v1" &&
        feedback.unitResult?.view.status === "needs_clarification"
      )) ||
    new Set(link.focusPointIds).size !== link.focusPointIds.length ||
    link.focusPointIds.some((id) => !feedback.points.some((p) => p.id === id))
  )
    return null;
  return { original, feedback };
}

function focusIds(feedback: LearningObservation) {
  if (feedback.unitResult) {
    return buildUnitFeedbackLearningSummary(feedback.unitResult.view, {
      source: feedback.unitResult.source,
      purpose: feedback.unitResult.purpose,
      pointReviews: feedback.unitResult.pointReviews,
    })
      .improvements.map((p) => p.criterionId)
      .filter(
        (id): id is string => !!id && feedback.points.some((p) => p.id === id),
      )
      .slice(0, 2);
  }
  return feedback.points
    .filter((p) => p.status !== "model_yes")
    .slice(0, 2)
    .map((p) => p.id);
}

/** Start only from the explicitly selected, already saved feedback observation. */
export function beginFeedbackRetry(
  state: FaultProgress,
  input: {
    taskId: string;
    originalAttemptId: string;
    feedbackId: string;
    sourceAvailable?: boolean;
  },
  at: string,
): FaultProgress {
  if (input.sourceAvailable === false) return state;
  const original = state.attempts.find((a) => a.id === input.originalAttemptId);
  const feedback = feedbackObservation(state, input.feedbackId);
  if (!original || !feedback || state.exerciseId !== original.exerciseId)
    return state;
  const draft = state.drafts[original.exerciseId];
  if (draft?.feedbackRetry && !draft.submittedId) return state;
  if (
    draft?.feedbackRetryPaused &&
    draft.feedbackRetry?.feedbackId === input.feedbackId
  )
    return state;
  const link: FeedbackRetryLink = {
    taskId: input.taskId,
    originalAttemptId: input.originalAttemptId,
    feedbackId: input.feedbackId,
    feedbackResultId: feedback.resultId,
    questionId: original.exerciseId,
    revision: original.revision,
    focusPointIds: focusIds(feedback),
    startedAt: at,
  };
  if (!sourceFor(state, link)) return state;
  const usedIds = [
    ...state.attempts,
    ...state.reviews,
    ...state.corrections,
    ...(state.learningObservations ?? []),
  ].map((entry) => entry.id);
  if (
    usedIds.includes(link.taskId) ||
    state.attempts.some((a) => a.feedbackRetry?.taskId === link.taskId) ||
    Object.values(state.drafts).some(
      (d) => d.feedbackRetry?.taskId === link.taskId,
    )
  )
    return state;
  const initialized = initializePractice(state);
  const located = visitPractice(
    {
      ...initialized,
      practice: { ...initialized.practice!, mode: "subjective" },
    },
    original.exerciseId,
    at,
  );
  const retryDraft = {
    ...freshDraft(),
    hintUsed: draft?.hintUsed ?? original.hintUsed,
    referenceSeen: draft?.referenceSeen ?? true,
    ...((draft?.learningExampleSource ?? original.learningExampleSource)
      ? {
          learningExampleSource:
            draft?.learningExampleSource ?? original.learningExampleSource,
        }
      : {}),
    feedbackRetry: link,
  };
  let next: FaultProgress = {
    ...located,
    updatedAt: at,
    drafts: { ...located.drafts, [original.exerciseId]: retryDraft },
  };
  // Preserve a writer's unsaved text byte for byte; otherwise open the full
  // original answer for deliberate redrafting. No local correction is consumed.
  next = editPractice(next, {
    answer:
      draft && !draft.submittedId && draft.answer.length
        ? draft.answer
        : original.answer,
  });
  return progressSchema.safeParse(next).success ? next : state;
}

/** A captured task ID prevents an old callback from submitting a newer draft. */
export function submitFeedbackRetry(
  state: FaultProgress,
  taskId: string,
  eventId: string,
  at: string,
): FaultProgress {
  const draft = state.drafts[state.exerciseId];
  const link = draft?.feedbackRetry;
  if (
    !link ||
    link.taskId !== taskId ||
    draft.submittedId ||
    draft.feedbackRetryPaused ||
    !sourceFor(state, link) ||
    !feedbackObservation(state, link.feedbackId) ||
    !progressSchema.safeParse(state).success
  )
    return state;
  return submitPractice(state, eventId, at);
}

/** Explicit withdrawal stays paused across restore; it never rewrites history. */
export function pauseFeedbackRetry(
  state: FaultProgress,
  input: {
    taskId: string;
    originalAttemptId: string;
    feedbackId: string;
    reason: FeedbackRetryPauseReason;
  },
  at: string,
): FaultProgress {
  const draft = state.drafts[state.exerciseId];
  const link = draft?.feedbackRetry;
  if (
    !link ||
    link.taskId !== input.taskId ||
    link.originalAttemptId !== input.originalAttemptId ||
    link.feedbackId !== input.feedbackId ||
    (input.reason !== "source_withdrawn" &&
      input.reason !== "source_changed") ||
    draft.feedbackRetryPaused
  )
    return state;
  const next = {
    ...state,
    updatedAt: at,
    drafts: {
      ...state.drafts,
      [state.exerciseId]: { ...draft, feedbackRetryPaused: input.reason },
    },
  };
  return progressSchema.safeParse(next).success ? next : state;
}

function viewFor(
  state: FaultProgress,
  task: FeedbackRetryLink,
  current: UnitAttempt | null,
  paused?: FeedbackRetryPauseReason,
): FeedbackRetryView | null {
  const source = sourceFor(state, task);
  if (!source) return null;
  if (
    current &&
    (current.exerciseId !== task.questionId ||
      current.revision !== task.revision ||
      JSON.stringify(current.feedbackRetry) !== JSON.stringify(task))
  )
    return null;
  const blockedReason =
    paused ??
    (feedbackObservation(state, task.feedbackId) ? null : "source_changed");
  const afterFeedback = current ? feedbackForAttempt(state, current.id) : null;
  const candidate =
    current && !blockedReason
      ? compareLearningFeedback(state, current.id)
      : null;
  const comparable =
    !!candidate?.comparable &&
    !candidate.reused &&
    !("sampleComparison" in candidate && candidate.sampleComparison) &&
    candidate.points.every((p) => p.state !== "unknown");
  return {
    task,
    ...source,
    current,
    focusPoints: task.focusPointIds.flatMap((id) =>
      source.feedback.points.filter((p) => p.id === id),
    ),
    status: blockedReason
      ? "incompatible"
      : !current
        ? "draft"
        : !afterFeedback
          ? "saved_pending"
          : comparable
            ? "comparable"
            : "incompatible",
    comparison: comparable ? candidate : null,
    afterFeedback,
    reusedFeedback:
      !!afterFeedback && afterFeedback.resultId === source.feedback.resultId,
    blockedReason,
  };
}

export function feedbackRetryTask(
  state: FaultProgress,
  questionId = state.exerciseId,
): FeedbackRetryView | null {
  const draft = state.drafts[questionId];
  if (!draft?.feedbackRetry) return null;
  const current = draft.submittedId
    ? (state.attempts.find((a) => a.id === draft.submittedId) ?? null)
    : null;
  if (draft.submittedId && !current) return null;
  return viewFor(
    state,
    draft.feedbackRetry,
    current,
    draft.feedbackRetryPaused,
  );
}

export function feedbackRetryComparison(
  state: FaultProgress,
  newAttemptId: string,
): FeedbackRetryView | null {
  const current = state.attempts.find((a) => a.id === newAttemptId);
  if (!current?.feedbackRetry) return null;
  const draft = state.drafts[current.exerciseId];
  const paused =
    draft?.feedbackRetry?.taskId === current.feedbackRetry.taskId
      ? draft.feedbackRetryPaused
      : undefined;
  return viewFor(state, current.feedbackRetry, current, paused);
}
