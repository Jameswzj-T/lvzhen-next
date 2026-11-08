import { z } from "zod";
import { exerciseFor, exerciseRevision } from "../content/fault-catalog";
import { unitFeedbackBinding } from "../evaluation/unit-feedback-catalog";
import {
  validateUnitFeedbackResult,
  type UnitFeedbackResult,
} from "../evaluation/unit-feedback-contract";
import {
  feedbackRetryLinkSchema,
  type FaultProgress,
  type UnitAttempt,
} from "./fault-progress";
import {
  feedbackForAttempt,
  feedbackObservation,
} from "./learning-observations";
import { submittedFeedbackSchema } from "./submitted-feedback";
import {
  TEACHER_QUESTION_ID,
  TEACHER_QUESTION_REVISION,
  TEACHER_GUIDE_CONTENT_ID,
  TEACHER_GUIDE_REFERENCE_FINGERPRINT,
  type TeacherHistoryContext,
} from "./teacher-feedback-contract";

const timestamp = z.iso.datetime();

function currentQuestion() {
  const question = exerciseFor(TEACHER_QUESTION_ID);
  const binding = unitFeedbackBinding(TEACHER_QUESTION_ID);
  if (
    !question ||
    question.kind !== "subjective" ||
    !binding ||
    exerciseRevision(question.id) !== TEACHER_QUESTION_REVISION ||
    binding.questionRevision !== TEACHER_QUESTION_REVISION ||
    binding.contentId !== TEACHER_GUIDE_CONTENT_ID ||
    binding.referenceFingerprint !== TEACHER_GUIDE_REFERENCE_FINGERPRINT ||
    question.title !== binding.title ||
    question.facts !== binding.facts ||
    question.prompt !== binding.prompt ||
    !question.criteria?.length ||
    question.criteria.length !== binding.criteria.length ||
    question.criteria.some((point, index) => {
      const expected = binding.criteria[index];
      return (
        point.id !== expected.id ||
        point.label !== expected.label ||
        point.meaning !== expected.meaning ||
        point.acceptable !== expected.acceptable ||
        point.boundary !== expected.boundary
      );
    })
  )
    return null;
  return question;
}

function compatibleResult(raw: unknown, original: UnitAttempt) {
  const question = currentQuestion();
  if (!question) return null;
  try {
    const result = validateUnitFeedbackResult(raw, {
      questionId: original.exerciseId,
      questionRevision: original.revision,
      answerId: original.id,
      originalText: original.answer,
      contentId: TEACHER_GUIDE_CONTENT_ID,
    });
    const view = result.view;
    if (
      view.weightedScore ||
      view.title !== question.title ||
      view.facts !== question.facts ||
      view.prompt !== question.prompt ||
      (!["system_error", "no_answer"].includes(view.status) &&
        (view.points.length !== question.criteria!.length ||
          view.points.some((point, index) => {
            const expected = question.criteria![index];
            return (
              point.id !== expected.id ||
              point.label !== expected.label ||
              point.meaning !== expected.meaning ||
              point.acceptable !== expected.acceptable ||
              point.boundary !== expected.boundary
            );
          })))
    )
      return null;
    return result;
  } catch {
    return null;
  }
}

function immutableResult(result: UnitFeedbackResult) {
  const { pointReviews: _reviews, ...original } = result;
  return JSON.stringify(original);
}

function hasReviewHold(result: UnitFeedbackResult) {
  return (
    result.pointReviews?.some((review) => review.state === "needs_review") ??
    false
  );
}

function savedJudgment(state: FaultProgress, original: UnitAttempt) {
  const observation = feedbackForAttempt(state, original.id);
  const native =
    observation?.protocol === "unit-feedback-v1" &&
    observation.attemptId === original.id
      ? compatibleResult(observation.unitResult, original)
      : null;
  const rows = (state.submittedFeedback ?? []).filter(
    (row) => row.attemptId === original.id,
  );
  if (!rows.length)
    return native ? { result: native, held: hasReviewHold(native) } : null;
  // The canonical writer appends immutable events. A newer unavailable or
  // incompatible saved reply must not silently inherit an older good judgment.
  const parsed = submittedFeedbackSchema.safeParse(rows.at(-1));
  if (!parsed.success) return null;
  const row = parsed.data;
  if (
    row.id !== `submitted:${original.id}:${row.result.id}` ||
    row.questionId !== original.exerciseId ||
    row.revision !== original.revision ||
    row.answer !== original.answer ||
    row.choice ||
    rows.some(
      (entry) =>
        entry.id === row.id &&
        JSON.stringify(entry.result) !== JSON.stringify(row.result),
    )
  )
    return null;
  const result = compatibleResult(row.result, original);
  if (!result) return null;
  // An old reply can be reread after an independent note was saved for the
  // current result. Resolve notes by result identity, not the other reply's time.
  const sameObservation = [...(state.learningObservations ?? [])]
    .filter(
      (entry) =>
        entry.attemptId === original.id && entry.resultId === result.id,
    )
    .sort(
      (a, b) =>
        b.observedAt.localeCompare(a.observedAt) || b.id.localeCompare(a.id),
    )
    .map((entry) => feedbackObservation(state, entry.id))
    .find(
      (entry) =>
        entry?.protocol === "unit-feedback-v1" &&
        entry.unitResult?.view.answerId === original.id,
    );
  const sameNative = sameObservation
    ? compatibleResult(sameObservation.unitResult, original)
    : null;
  if (sameObservation && !sameNative) return null;
  if (sameNative && immutableResult(sameNative) !== immutableResult(result))
    return null;
  return {
    result,
    held: hasReviewHold(result) || (!!sameNative && hasReviewHold(sameNative)),
  };
}

function classification(state: FaultProgress, original: UnitAttempt) {
  const saved = savedJudgment(state, original);
  if (
    !saved ||
    saved.held ||
    saved.result.source !== "real_provider" ||
    saved.result.purpose !== "practice" ||
    saved.result.view.status !== "assessed" ||
    !saved.result.view.points.length ||
    saved.result.view.points.some((point) => point.status === "uncertain") ||
    saved.result.view.points.every((point) => point.status === "missing")
  )
    return "unreviewed";
  const points = saved.result.view.points;
  // Count the saved bounded judgment, never evaluate the answer's wording.
  if (points.some((point) => point.status === "contradicted"))
    return "incorrect";
  if (points.every((point) => point.status === "covered")) return "correct";
  return "partial";
}

function immutableAttempt(original: UnitAttempt) {
  return JSON.stringify({
    id: original.id,
    exerciseId: original.exerciseId,
    revision: original.revision,
    answer: original.answer,
    choice: original.choice,
    submittedAt: original.submittedAt,
    hintUsed: original.hintUsed,
    referenceSeenBeforeAnswer: original.referenceSeenBeforeAnswer,
    reasoningAssessment: original.reasoningAssessment,
    feedbackRetry: original.feedbackRetry,
  });
}

function withSupport(
  state: FaultProgress,
  original: UnitAttempt,
): TeacherHistoryContext["currentWithSupport"] {
  if (original.hintUsed === true || original.referenceSeenBeforeAnswer === true)
    return true;
  if (original.feedbackRetry !== undefined) {
    const link = feedbackRetryLinkSchema.safeParse(original.feedbackRetry);
    if (
      !link.success ||
      link.data.questionId !== original.exerciseId ||
      link.data.revision !== original.revision ||
      link.data.originalAttemptId === original.id
    )
      return "unknown";
    const prior = state.attempts.find(
      (entry) =>
        entry.id === link.data.originalAttemptId &&
        entry.exerciseId === original.exerciseId &&
        entry.revision === original.revision,
    );
    if (!prior) return "unknown";
    const nativeSource = state.learningObservations?.some(
      (entry) =>
        entry.id === link.data.feedbackId &&
        entry.resultId === link.data.feedbackResultId &&
        entry.attemptId === prior.id &&
        entry.questionId === prior.exerciseId &&
        entry.revision === prior.revision &&
        entry.answer === prior.answer,
    );
    const canonicalSource = state.submittedFeedback?.some(
      (entry) =>
        entry.id === link.data.feedbackId &&
        entry.result.id === link.data.feedbackResultId &&
        entry.attemptId === prior.id &&
        entry.questionId === prior.exerciseId &&
        entry.revision === prior.revision &&
        entry.answer === prior.answer,
    );
    return nativeSource || canonicalSource ? true : "unknown";
  }
  return original.hintUsed === false &&
    original.referenceSeenBeforeAnswer === false
    ? false
    : "unknown";
}

/** Visible saved records only. No drafts, receipt counts, history transmission,
 * inferred attempts, scores or mastery. null means the scope/order is unknown.
 */
export function teacherFeedbackHistory(
  state: FaultProgress,
  attemptId: string,
  source: TeacherHistoryContext["source"] = "saved_local_records",
): TeacherHistoryContext | null {
  if (
    !currentQuestion() ||
    !["saved_local_records", "synthetic_fixture"].includes(source)
  )
    return null;
  const originals = state.attempts.filter((entry) => entry.id === attemptId);
  const current = originals[0];
  if (
    !current ||
    current.exerciseId !== TEACHER_QUESTION_ID ||
    current.revision !== TEACHER_QUESTION_REVISION ||
    originals.some(
      (entry) =>
        entry.exerciseId !== current.exerciseId ||
        entry.revision !== current.revision ||
        immutableAttempt(entry) !== immutableAttempt(current),
    )
  )
    return null;
  const saved = new Map<string, UnitAttempt>();
  for (const original of state.attempts) {
    if (
      original.exerciseId !== TEACHER_QUESTION_ID ||
      original.revision !== TEACHER_QUESTION_REVISION
    )
      continue;
    if (
      typeof original.id !== "string" ||
      !original.id.trim() ||
      original.choice ||
      typeof original.answer !== "string" ||
      !original.answer.trim() ||
      !timestamp.safeParse(original.submittedAt).success
    )
      return null;
    const previous = saved.get(original.id);
    if (previous && immutableAttempt(previous) !== immutableAttempt(original))
      return null;
    saved.set(original.id, original);
  }
  if (
    state.attempts.some(
      (entry) =>
        saved.has(entry.id) &&
        (entry.exerciseId !== TEACHER_QUESTION_ID ||
          entry.revision !== TEACHER_QUESTION_REVISION),
    )
  )
    return null;
  const time = Date.parse(current.submittedAt);
  // Equal timestamps do not establish which distinct event preceded the selected
  // original. Do not invent chronology from a UUID or imported array order.
  if (
    [...saved.values()].some(
      (entry) =>
        entry.id !== current.id && Date.parse(entry.submittedAt) === time,
    )
  )
    return null;
  const throughCurrent = [...saved.values()]
    .filter((entry) => Date.parse(entry.submittedAt) <= time)
    .sort(
      (a, b) =>
        Date.parse(a.submittedAt) - Date.parse(b.submittedAt) ||
        a.id.localeCompare(b.id),
    );
  const counts = { incorrect: 0, partial: 0, correct: 0, unreviewed: 0 };
  for (const original of throughCurrent)
    counts[classification(state, original)]++;
  return {
    questionId: TEACHER_QUESTION_ID,
    questionRevision: TEACHER_QUESTION_REVISION,
    attemptId,
    attemptCount: throughCurrent.length,
    assessedAttemptCount: counts.incorrect + counts.partial + counts.correct,
    incorrectAttemptCount: counts.incorrect,
    partialAttemptCount: counts.partial,
    correctAttemptCount: counts.correct,
    unreviewedAttemptCount: counts.unreviewed,
    currentWithSupport: withSupport(state, current),
    source,
    countScope: "same_question_same_revision_through_current_attempt",
    evidenceAttemptIds: throughCurrent.map((entry) => entry.id),
  };
}
