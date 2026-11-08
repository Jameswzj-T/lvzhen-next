import { g8CompletionRow } from "../content/g8-completion";
import { remainingG6SubjectIds } from "../content/remaining-g6-subjects";
import { z } from "zod";
import { inquiryViewSchema } from "./question-inquiry";
import {
  learningPreferencesSchema,
  dailyLearningPlanSchema,
} from "./daily-learning-schema";
import {
  practiceHistoricalPacks,
  historicalPracticeTopic,
  historicalPracticeTopicRevision,
  isHistoricalPracticeQuestion,
} from "../content/practice-content-history";
import {
  LEARNING_EXAMPLE_SOURCE,
  matchesLearningExample,
} from "./learning-example-source";
import { civilContractReviewOwnsQuestion } from "../content/civil-contract-review";
import { civilProcedureReviewOwnsQuestion } from "../content/civil-procedure-review";
import { isRegisteredCivilUnitFeedbackQuestion } from "../evaluation/unit-feedback-catalog";
import { assessmentStateSchema } from "./assessment-schema";
import { assessmentPaper } from "../content/assessment-papers";
import { learningObservationSchema } from "./learning-observation-schema";
import { submittedFeedbackSchema } from "./submitted-feedback";
import { savedSubmittedFeedbackRetrySource } from "./submitted-feedback-learning";
import { validChoice } from "./objective-answer";
import { chapterFor } from "../content/criminal-curriculum";
import {
  isPracticeLocation,
  practiceChapter,
  isChapterReview,
  practiceSubject,
  subjectPracticeQueues,
} from "../content/practice-set";
import {
  exerciseFor,
  exerciseRevision,
  savedExerciseFor,
  topicRevision,
  isPublishedTopicRevision,
  learningTopics,
  faultTopics,
  faultUnitRevision,
  topicFor,
  contentPacks,
} from "../content/fault-catalog";

export const faultStorageKey = "lvzhen:fault-unit:v1";
const timestamp = z.iso.datetime();
const id = z.string().min(1).max(120);
// Optional metadata stays with the existing draft/immutable answer checkpoint.
// Old answers and local corrections acquire no inferred relationship.
export const feedbackRetryLinkSchema = z.object({
  taskId: id,
  originalAttemptId: id,
  feedbackId: z.string().min(1).max(250),
  feedbackResultId: z.string().regex(/^[a-f0-9]{64}$/),
  questionId: id,
  revision: id,
  focusPointIds: z.array(z.string().min(1).max(80)).max(2),
  startedAt: timestamp,
});
export type FeedbackRetryLink = z.infer<typeof feedbackRetryLinkSchema>;
export type FeedbackRetryPauseReason = "source_withdrawn" | "source_changed";
const draftSchema = z.object({
  choice: z.string().max(20),
  answer: z.string().max(8000),
  hintUsed: z.boolean(),
  referenceSeen: z.boolean(),
  learningExampleSource: z.literal(LEARNING_EXAMPLE_SOURCE).optional(),
  submittedId: id.nullable(),
  feedbackRetry: feedbackRetryLinkSchema.optional(),
  feedbackRetryPaused: z
    .enum(["source_withdrawn", "source_changed"])
    .optional(),
});
const attemptSchema = z.object({
  id,
  exerciseId: id,
  revision: z.enum(contentPacks.map((pack) => pack.revision)),
  choice: z.string().max(20),
  answer: z.string().max(8000),
  hintUsed: z.boolean(),
  referenceSeenBeforeAnswer: z.boolean(),
  learningExampleSource: z.literal(LEARNING_EXAMPLE_SOURCE).optional(),
  submittedAt: timestamp,
  reasoningAssessment: z.literal("not_evaluated"),
  feedbackRetry: feedbackRetryLinkSchema.optional(),
});
const reviewSchema = z.object({
  id,
  topicId: id,
  revision: z.enum(contentPacks.map((pack) => pack.revision)),
  answer: z.string().min(1).max(8000),
  referenceSeenBeforeAnswer: z.boolean(),
  selfReport: z.enum(["again", "later"]),
  submittedAt: timestamp,
});
export const correctionDraftSchema = z.object({
  note: z.string().max(2000),
  answer: z.string().max(8000),
  revisit: z.boolean(),
});
const correctionSchema = correctionDraftSchema.extend({
  id,
  attemptId: id,
  submittedAt: timestamp,
});
export const progressSchema = z
  .object({
    version: z.literal(1),
    revision: z.literal(faultUnitRevision),
    updatedAt: timestamp.nullable(),
    learningPreferences: learningPreferencesSchema.optional(),
    dailyLearningPlan: dailyLearningPlanSchema.optional(),
    topicId: id,
    exerciseId: id,
    step: z.enum(["learn", "practice", "review"]),
    resumeAfterRecall: z
      .object({
        topicId: id,
        exerciseId: id,
        step: z.enum(["learn", "practice"]),
      })
      .nullable()
      .default(null),
    drafts: z.record(z.string(), draftSchema),
    recallDrafts: z.record(z.string(), draftSchema),
    attempts: z.array(attemptSchema).max(10000),
    reviews: z.array(reviewSchema).max(10000),
    corrections: z.array(correctionSchema).max(10000).default([]),
    correctionDrafts: z.record(z.string(), correctionDraftSchema).default({}),
    learningObservations: z.array(learningObservationSchema).max(80).optional(),
    submittedFeedback: z.array(submittedFeedbackSchema).max(10000).optional(),
    finished: z.record(z.string(), timestamp),
    assessments: assessmentStateSchema.optional(),
    inquiries: z
      .array(
        z.object({
          id,
          text: z.string().min(1).max(4000),
          createdAt: timestamp,
          exerciseRevision: id.optional(),
          exerciseId: id.optional(),
          topicId: id.optional(),
          originRunId: z.string().min(1).max(100).optional(),
        }),
      )
      .max(200)
      .optional(),
    inquiryExplanations: z.array(inquiryViewSchema).max(200).optional(),
    inquiryDraft: z
      .object({
        text: z.string().max(4000),
        exerciseId: id.optional(),
        topicId: id.optional(),
        originRunId: z.string().min(1).max(100).optional(),
      })
      .optional(),
    practice: z
      .object({
        mode: z.enum(["objective", "subjective"]),
        chapterId: id.optional(),
        scope: z.enum(["topic", "review"]).optional(),
        cursors: z.object({ objective: id, subjective: id }),
        ended: z.object({ objective: z.boolean(), subjective: z.boolean() }),
        // Active cursors stay authoritative. This optional map remembers the
        // positions of subjects left through an explicit cross-subject visit.
        subjectPositions: z
          .record(
            z.string(),
            z.object({
              mode: z.enum(["objective", "subjective"]),
              cursors: z.object({ objective: id, subjective: id }),
              ended: z.object({
                objective: z.boolean(),
                subjective: z.boolean(),
              }),
            }),
          )
          .optional(),
        viewed: z.record(z.string(), timestamp),
        knowledgeViewed: z.record(z.string(), timestamp),
      })
      .optional(),
  })
  .superRefine((state, ctx) => {
    function invalid(message: string) {
      ctx.addIssue({ code: "custom", message });
    }
    if (
      !topicFor(state.topicId) ||
      (!topicFor(state.topicId)?.exercises.some(
        (q) => q.id === state.exerciseId,
      ) &&
        historicalPracticeTopic(state.exerciseId)?.id !== state.topicId &&
        g8CompletionRow(state.exerciseId)?.parentTopicId !== state.topicId &&
        !civilContractReviewOwnsQuestion(state.topicId, state.exerciseId) &&
        !civilProcedureReviewOwnsQuestion(state.topicId, state.exerciseId))
    )
      invalid("Invalid cursor");
    if (state.practice) {
      const activeCursor = state.practice.cursors[state.practice.mode];
      if (isChapterReview(activeCursor) !== (state.practice.scope === "review"))
        invalid("Practice scope does not match its active cursor");
      if (
        state.practice.chapterId &&
        (!isPracticeLocation(activeCursor, state.practice.mode) ||
          practiceChapter(activeCursor)?.id !== state.practice.chapterId)
      )
        invalid("Practice chapter does not match its active cursor");
      if (
        state.practice.chapterId &&
        !chapterFor(state.practice.chapterId)?.topicIds.length
      )
        invalid("Invalid practice chapter");
      for (const mode of ["objective", "subjective"] as const)
        if (exerciseFor(state.practice.cursors[mode])?.kind !== mode)
          invalid("Invalid practice cursor");
      const activeSubject = practiceSubject(activeCursor);
      if (
        ["objective", "subjective"].some(
          (mode) =>
            practiceSubject(
              state.practice!.cursors[mode as "objective" | "subjective"],
            ) !== activeSubject,
        )
      )
        invalid("Practice cursors belong to different subjects");
      for (const [subject, position] of Object.entries(
        state.practice.subjectPositions ?? {},
      )) {
        if (
          ![
            "criminal-law",
            "civil-law",
            "civil-procedure",
            "criminal-procedure",
            "administrative-law",
            "commercial-law",
            ...remainingG6SubjectIds,
          ].includes(subject)
        )
          invalid("Unavailable practice subject");
        for (const mode of ["objective", "subjective"] as const)
          if (
            exerciseFor(position.cursors[mode])?.kind !== mode ||
            practiceSubject(position.cursors[mode]) !== subject
          )
            invalid("Invalid saved subject cursor");
      }
      for (const id of Object.keys(state.practice.viewed))
        if (!exerciseFor(id)) invalid("Invalid practice view");
      for (const id of Object.keys(state.practice.knowledgeViewed))
        if (!topicFor(id)) invalid("Invalid knowledge view");
    }
    const inquiryIds = (state.inquiries ?? []).map((q) => q.id);
    const feedbackIds = (state.submittedFeedback ?? []).map((r) => r.id);
    if (new Set(feedbackIds).size !== feedbackIds.length)
      invalid("Duplicate submitted feedback");
    for (const row of state.submittedFeedback ?? []) {
      const original = state.attempts.find((a) => a.id === row.attemptId);
      if (
        !original ||
        original.exerciseId !== row.questionId ||
        original.revision !== row.revision ||
        original.answer !== row.answer ||
        original.choice !== row.choice
      )
        invalid("Submitted feedback original changed");
    }
    if (new Set(inquiryIds).size !== inquiryIds.length)
      invalid("Duplicate inquiry");
    for (const q of state.inquiries ?? [])
      if (
        !q.text.trim() ||
        (q.exerciseId && !exerciseFor(q.exerciseId)) ||
        (q.topicId && !topicFor(q.topicId)) ||
        (q.originRunId && !q.exerciseId)
      )
        invalid("Invalid inquiry");
    const explanationIds = new Set<string>();
    for (const view of state.inquiryExplanations ?? []) {
      const item = state.inquiries?.find(
        (q) => q.id === view.identity.inquiryId,
      );
      if (
        !item ||
        explanationIds.has(item.id) ||
        item.text !== view.identity.text ||
        item.exerciseId !== view.identity.questionId ||
        item.exerciseRevision !== view.identity.questionRevision
      )
        invalid("Invalid inquiry explanation");
      explanationIds.add(view.identity.inquiryId);
    }
    if (
      state.inquiryDraft?.exerciseId &&
      !exerciseFor(state.inquiryDraft.exerciseId)
    )
      invalid("Invalid inquiry context");
    if (state.inquiryDraft?.topicId && !topicFor(state.inquiryDraft.topicId))
      invalid("Invalid inquiry topic");
    if (state.inquiryDraft?.originRunId && !state.inquiryDraft.exerciseId)
      invalid("Inquiry answer context needs a question");
    if (
      state.resumeAfterRecall &&
      (!topicFor(state.resumeAfterRecall.topicId) ||
        (!topicFor(state.resumeAfterRecall.topicId)?.exercises.some(
          (q) => q.id === state.resumeAfterRecall!.exerciseId,
        ) &&
          !civilContractReviewOwnsQuestion(
            state.resumeAfterRecall.topicId,
            state.resumeAfterRecall.exerciseId,
          ) &&
          !civilProcedureReviewOwnsQuestion(
            state.resumeAfterRecall.topicId,
            state.resumeAfterRecall.exerciseId,
          ) &&
          historicalPracticeTopic(state.resumeAfterRecall.exerciseId)?.id !==
            state.resumeAfterRecall.topicId &&
          g8CompletionRow(state.resumeAfterRecall.exerciseId)?.parentTopicId !==
            state.resumeAfterRecall.topicId))
    )
      invalid("Invalid resume position");
    const ids = [
      ...state.attempts,
      ...state.reviews,
      ...state.corrections,
      ...(state.learningObservations ?? []),
    ].map((entry) => entry.id);
    if (new Set(ids).size !== ids.length) invalid("Duplicate event");
    function validRetryLink(link: FeedbackRetryLink, questionId: string) {
      const original = state.attempts.find(
        (a) => a.id === link.originalAttemptId,
      );
      const submittedSource = savedSubmittedFeedbackRetrySource(
        state,
        link.originalAttemptId,
        link.feedbackId,
      );
      const feedback =
        state.learningObservations?.find((r) => r.id === link.feedbackId) ??
        submittedSource;
      const question = savedExerciseFor(questionId, link.revision);
      return (
        question?.kind === "subjective" &&
        (practiceSubject(questionId) === "criminal-law" ||
          isRegisteredCivilUnitFeedbackQuestion(questionId) ||
          (!!submittedSource && feedback === submittedSource)) &&
        isPracticeLocation(questionId, "subjective") &&
        link.questionId === questionId &&
        original?.exerciseId === questionId &&
        original.revision === link.revision &&
        !original.choice &&
        feedback?.attemptId === original.id &&
        feedback.questionId === questionId &&
        feedback.revision === link.revision &&
        feedback.answer === original.answer &&
        feedback.resultId === link.feedbackResultId &&
        (feedback.state === "reviewed" ||
          (feedback.protocol === "unit-feedback-v1" &&
            feedback.unitResult?.view.status === "needs_clarification")) &&
        new Set(link.focusPointIds).size === link.focusPointIds.length &&
        link.focusPointIds.every((pointId) =>
          feedback.points.some((p) => p.id === pointId),
        ) &&
        !ids.includes(link.taskId)
      );
    }
    const committedRetryTasks = new Set<string>();
    const retryParents = new Map<string, string>();
    for (const attempt of state.attempts) {
      const link = attempt.feedbackRetry;
      if (!link) continue;
      if (
        !validRetryLink(link, attempt.exerciseId) ||
        attempt.id === link.originalAttemptId ||
        committedRetryTasks.has(link.taskId)
      )
        invalid("Invalid full-question retry relationship");
      committedRetryTasks.add(link.taskId);
      retryParents.set(attempt.id, link.originalAttemptId);
    }
    // Existing imports reorder answers by timestamp. Identity, rather than
    // list order or a clock, determines the source; cyclic links remain invalid.
    const checkedParents = new Set<string>();
    for (const start of retryParents.keys()) {
      const chain = new Set<string>();
      let cursor = start;
      while (retryParents.has(cursor) && !checkedParents.has(cursor)) {
        if (chain.has(cursor)) {
          invalid("Cyclic full-question retry relationship");
          break;
        }
        chain.add(cursor);
        cursor = retryParents.get(cursor)!;
      }
      for (const entry of chain) checkedParents.add(entry);
    }
    const assessmentAttemptIds: string[] = [];
    for (const run of state.assessments?.runs ?? []) {
      for (const [questionId, eventId] of Object.entries(run.attemptIds)) {
        assessmentAttemptIds.push(eventId);
        const entry = state.attempts.find((a) => a.id === eventId);
        const answer = run.answers[questionId];
        if (
          !assessmentPaper(run.paperId)?.questionIds.includes(questionId) ||
          !entry ||
          !answer ||
          entry.exerciseId !== questionId ||
          entry.answer !== answer.answer ||
          entry.choice !== answer.choice ||
          entry.submittedAt !== run.finishedAt ||
          entry.hintUsed ||
          entry.referenceSeenBeforeAnswer !==
            run.seenQuestionIds.includes(questionId)
        )
          invalid("Assessment original mismatch");
      }
    }
    if (new Set(assessmentAttemptIds).size !== assessmentAttemptIds.length)
      invalid("Reused assessment attempt");
    const attemptIds = new Set(state.attempts.map((a) => a.id));
    for (const observation of state.learningObservations ?? []) {
      const original = state.attempts.find(
        (a) => a.id === observation.attemptId,
      );
      if (
        !original ||
        original.exerciseId !== observation.questionId ||
        original.revision !== observation.revision ||
        original.answer !== observation.answer ||
        new Set(observation.points.map((p) => p.id)).size !==
          observation.points.length
      )
        invalid("Learning feedback does not match its original event");
      if (
        observation.originRunId &&
        !state.assessments?.runs.some(
          (r) =>
            r.id === observation.originRunId &&
            r.finishedAt &&
            r.attemptIds[observation.questionId] === observation.attemptId,
        )
      )
        invalid("Learning feedback does not match its assessment run");
    }
    for (const entry of state.corrections)
      if (
        !attemptIds.has(entry.attemptId) ||
        (!entry.note.trim() && !entry.answer.trim())
      )
        invalid("Invalid correction or missing original answer");
    for (const key of Object.keys(state.correctionDrafts))
      if (!attemptIds.has(key))
        invalid("Correction draft has no original answer");
    for (const attempt of state.attempts) {
      if (
        attempt.learningExampleSource &&
        (!attempt.referenceSeenBeforeAnswer ||
          !matchesLearningExample(attempt.exerciseId, attempt.revision))
      )
        invalid("Example source does not match this answer");
      const question = savedExerciseFor(attempt.exerciseId, attempt.revision);
      if (
        !question ||
        (question.kind === "objective"
          ? !validChoice(question, attempt.choice)
          : !attempt.answer.trim() || !!attempt.choice)
      )
        invalid("Invalid answer");
    }
    const pendingRetryTasks = new Set<string>();
    for (const [key, draft] of Object.entries(state.drafts)) {
      const question = exerciseFor(key);
      if (
        draft.learningExampleSource &&
        (!draft.referenceSeen ||
          !question ||
          !matchesLearningExample(key, exerciseRevision(key)))
      )
        invalid("Example source does not match this draft");
      if (!question || (draft.choice && !validChoice(question, draft.choice)))
        invalid("Invalid draft");
      if (draft.feedbackRetryPaused && !draft.feedbackRetry)
        invalid("Retry pause needs its original relationship");
      if (draft.feedbackRetry) {
        const link = draft.feedbackRetry;
        const submitted = state.attempts.find(
          (a) => a.id === draft.submittedId,
        );
        if (
          !validRetryLink(link, key) ||
          (draft.submittedId
            ? JSON.stringify(submitted?.feedbackRetry) !== JSON.stringify(link)
            : committedRetryTasks.has(link.taskId) ||
              pendingRetryTasks.has(link.taskId))
        )
          invalid("Retry draft does not match its immutable relationship");
        if (!draft.submittedId) pendingRetryTasks.add(link.taskId);
      }
      if (
        draft.submittedId &&
        !state.attempts.some(
          (a) =>
            a.id === draft.submittedId &&
            a.exerciseId === key &&
            a.answer === draft.answer &&
            a.choice === draft.choice &&
            a.hintUsed === draft.hintUsed &&
            a.learningExampleSource === draft.learningExampleSource &&
            draft.referenceSeen,
        )
      )
        invalid("Draft does not match its immutable answer");
    }
    for (const review of state.reviews)
      if (
        !isPublishedTopicRevision(review.topicId, review.revision) ||
        !review.answer.trim()
      )
        invalid("Invalid recall");
    for (const [key, draft] of Object.entries(state.recallDrafts)) {
      if (
        !topicFor(key) ||
        draft.choice ||
        draft.hintUsed ||
        draft.learningExampleSource ||
        draft.feedbackRetry ||
        draft.feedbackRetryPaused
      )
        invalid("Invalid recall draft");
      if (
        draft.submittedId &&
        !state.reviews.some(
          (r) =>
            r.id === draft.submittedId &&
            r.topicId === key &&
            r.answer === draft.answer &&
            draft.referenceSeen,
        )
      )
        invalid("Recall draft mismatch");
    }
    for (const key of Object.keys(state.finished)) {
      const topic = topicFor(key);
      const historicalCompletion = practiceHistoricalPacks.some((pack) =>
        pack.snapshot.topics.some(
          (old) =>
            old.id === key &&
            old.exercises.some((q) => !q.optional) &&
            old.exercises
              .filter((q) => !q.optional)
              .every((q) =>
                state.attempts.some(
                  (a) =>
                    a.exerciseId === q.id &&
                    historicalPracticeTopicRevision(key, a.revision),
                ),
              ),
        ),
      );
      if (
        !historicalCompletion &&
        (!topic ||
          !topic.exercises.some((q) => !q.optional) ||
          !topic.exercises
            .filter((q) => !q.optional)
            .every((q) => state.attempts.some((a) => a.exerciseId === q.id)))
      )
        invalid("Unsubstantiated completion");
    }
  });

export type FaultProgress = z.infer<typeof progressSchema>;
export type UnitDraft = z.infer<typeof draftSchema>;
export type UnitAttempt = z.infer<typeof attemptSchema>;
export const freshDraft = (): UnitDraft => ({
  choice: "",
  answer: "",
  hintUsed: false,
  referenceSeen: false,
  submittedId: null,
});
export const freshProgress = (): FaultProgress => ({
  version: 1,
  revision: faultUnitRevision,
  updatedAt: null,
  topicId: faultTopics[0].id,
  exerciseId: faultTopics[0].exercises[0].id,
  step: "learn",
  drafts: {},
  recallDrafts: {},
  attempts: [],
  reviews: [],
  corrections: [],
  correctionDrafts: {},
  finished: {},
  resumeAfterRecall: null,
});

export function restoreProgress(raw: string | null): {
  status: "empty" | "loaded" | "unreadable";
  state: FaultProgress;
} {
  if (raw === null) return { status: "empty", state: freshProgress() };
  try {
    const parsed = progressSchema.safeParse(JSON.parse(raw));
    if (parsed.success) return { status: "loaded", state: parsed.data };
  } catch {
    /* Preserve the original storage if it is malformed. */
  }
  return { status: "unreadable", state: freshProgress() };
}

export function chooseTopic(
  state: FaultProgress,
  topicId: string,
): FaultProgress {
  const topic = topicFor(topicId);
  if (!topic) return state;
  // Lookup includes explicit transfer forms for old-record validation. A topic
  // card or recall entry still chooses only the four regular civil forms.
  const questions = topic.exercises.filter(
    (q) =>
      practiceSubject(q.id) !== "civil-law" ||
      subjectPracticeQueues("civil-law")[q.kind].includes(q.id),
  );
  const question =
    questions.find((q) => !state.attempts.some((a) => a.exerciseId === q.id)) ??
    questions[0];
  if (!question) return state;
  return {
    ...state,
    topicId,
    exerciseId: question.id,
    step: topicId === "transfer" ? "practice" : "learn",
    resumeAfterRecall: null,
  };
}

export function submitExercise(
  state: FaultProgress,
  eventId: string,
  at: string,
): FaultProgress {
  if (isHistoricalPracticeQuestion(state.exerciseId)) return state;
  const question = exerciseFor(state.exerciseId);
  const draft = state.drafts[state.exerciseId] ?? freshDraft();
  if (
    !question ||
    draft.submittedId ||
    draft.feedbackRetryPaused ||
    [...state.attempts, ...state.reviews, ...state.corrections].some(
      (a) => a.id === eventId,
    )
  )
    return state;
  if (
    question.kind === "objective"
      ? !validChoice(question, draft.choice)
      : !draft.answer.trim()
  )
    return state;
  const attempt: UnitAttempt = {
    id: eventId,
    exerciseId: question.id,
    revision: exerciseRevision(question.id),
    choice: draft.choice,
    answer: draft.answer,
    hintUsed: draft.hintUsed,
    referenceSeenBeforeAnswer: draft.referenceSeen,
    ...(draft.learningExampleSource
      ? { learningExampleSource: draft.learningExampleSource }
      : {}),
    submittedAt: at,
    reasoningAssessment: "not_evaluated",
    ...(draft.feedbackRetry
      ? { feedbackRetry: structuredClone(draft.feedbackRetry) }
      : {}),
  };
  const next = {
    ...state,
    updatedAt: at,
    attempts: [...state.attempts, attempt],
    drafts: {
      ...state.drafts,
      [question.id]: { ...draft, submittedId: eventId, referenceSeen: true },
    },
  };
  return draft.feedbackRetry && !progressSchema.safeParse(next).success
    ? state
    : next;
}

export function retryExercise(state: FaultProgress): FaultProgress {
  if (isHistoricalPracticeQuestion(state.exerciseId)) return state;
  const prior = state.drafts[state.exerciseId] ?? freshDraft();
  return {
    ...state,
    drafts: {
      ...state.drafts,
      [state.exerciseId]: {
        ...freshDraft(),
        hintUsed: prior.hintUsed,
        referenceSeen: prior.referenceSeen,
        ...(prior.learningExampleSource
          ? { learningExampleSource: prior.learningExampleSource }
          : {}),
      },
    },
  };
}

export function finishTopic(state: FaultProgress, at: string): FaultProgress {
  const topic = topicFor(state.topicId);
  if (
    !topic ||
    !topic.exercises.some((q) => !q.optional) ||
    !topic.exercises
      .filter((q) => !q.optional)
      .every((q) => state.attempts.some((a) => a.exerciseId === q.id))
  )
    return state;
  return {
    ...state,
    step: "review",
    finished: { ...state.finished, [topic.id]: state.finished[topic.id] ?? at },
  };
}

export function submitRecall(
  state: FaultProgress,
  selfReport: "again" | "later",
  eventId: string,
  at: string,
): FaultProgress {
  const draft = state.recallDrafts[state.topicId] ?? freshDraft();
  if (
    !draft.answer.trim() ||
    draft.submittedId ||
    [...state.attempts, ...state.reviews, ...state.corrections].some(
      (a) => a.id === eventId,
    )
  )
    return state;
  const review: z.infer<typeof reviewSchema> = {
    id: eventId,
    topicId: state.topicId,
    revision: topicRevision(state.topicId),
    answer: draft.answer,
    referenceSeenBeforeAnswer: draft.referenceSeen,
    selfReport,
    submittedAt: at,
  };
  return {
    ...state,
    updatedAt: at,
    reviews: [...state.reviews, review],
    recallDrafts: {
      ...state.recallDrafts,
      [state.topicId]: { ...draft, submittedId: eventId, referenceSeen: true },
    },
  };
}

export function startRecall(
  state: FaultProgress,
  topicId: string,
): FaultProgress {
  const next = chooseTopic(state, topicId);
  if (next === state) return state;
  const draft = state.recallDrafts[topicId];
  // Preserve an unfinished recall. A new session is not evidence of first exposure.
  return {
    ...next,
    step: "review",
    resumeAfterRecall:
      state.step === "review"
        ? state.resumeAfterRecall
        : {
            topicId: state.topicId,
            exerciseId: state.exerciseId,
            step: state.step,
          },
    recallDrafts: {
      ...state.recallDrafts,
      [topicId]: draft?.submittedId
        ? { ...freshDraft(), referenceSeen: true }
        : (draft ?? freshDraft()),
    },
  };
}

export function resumeAfterRecall(state: FaultProgress): FaultProgress {
  if (!state.resumeAfterRecall) return state;
  return { ...state, ...state.resumeAfterRecall, resumeAfterRecall: null };
}

const day = 24 * 60 * 60 * 1000;
export function reviewSchedule(state: FaultProgress) {
  return learningTopics
    .flatMap((topic) => {
      const reviews = state.reviews.filter((r) => r.topicId === topic.id);
      const last = reviews.at(-1);
      const base = last?.submittedAt ?? state.finished[topic.id];
      if (!base) return [];
      const interval =
        !last || last.selfReport === "again" ? 1 : reviews.length === 1 ? 3 : 7;
      return [
        {
          topicId: topic.id,
          dueAt: new Date(Date.parse(base) + interval * day).toISOString(),
          interval,
        },
      ];
    })
    .sort((a, b) => a.dueAt.localeCompare(b.dueAt));
}

export function nextTask(state: FaultProgress, at: string) {
  const due = reviewSchedule(state).find((item) => item.dueAt <= at);
  if (due) return { kind: "review" as const, topicId: due.topicId };
  const next =
    faultTopics.find(
      (topic) => !state.finished[topic.id] && topic.id !== state.topicId,
    ) ?? faultTopics.find((topic) => !state.finished[topic.id]);
  return next ? { kind: "learn" as const, topicId: next.id } : null;
}

export function hasThreeDayGap(state: FaultProgress, at: string) {
  return (
    !!state.updatedAt && Date.parse(at) - Date.parse(state.updatedAt) >= 3 * day
  );
}
