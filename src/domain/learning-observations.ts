import { progressSchema, type FaultProgress } from "./fault-progress";
import {
  TEACHER_SOURCE_PRIORITY_PROTOCOL,
  teacherSourceNeedsReview,
  teacherPriorityLearningHolds,
} from "./teacher-source-feedback-contract";
import {
  compatibleFeedbackStatus,
  learningObservationSchema,
  nativeFeedbackReviewNote,
  type LearningObservation,
} from "./learning-observation-schema";
import { exerciseFor, exerciseRevision } from "../content/fault-catalog";
import { unitFeedbackBinding } from "../evaluation/unit-feedback-catalog";
import {
  validateUnitFeedbackResult,
  type UnitFeedbackResult,
} from "../evaluation/unit-feedback-contract";
import type { ShortResult } from "../evaluation/short-table/contract";
import type {
  TableResult,
  TableAssessment,
} from "../evaluation/table-trial/contract";
import type { ExplanationReviewDelivery } from "../evaluation/table-trial/reviewed-explanation-delivery";
import { paperCaseIds } from "../evaluation/table-trial/papers";
import { assessmentPaper } from "../content/assessment-papers";
import { projectCurrentSubmittedLearningFeedback } from "./submitted-feedback-learning";

function append(
  state: FaultProgress,
  observations: LearningObservation[],
): FaultProgress {
  const prior = state.learningObservations ?? [];
  const added = observations.filter(
    (row) => !prior.some((p) => p.id === row.id),
  );
  if (!added.length || prior.length + added.length > 80) return state;
  const next = { ...state, learningObservations: [...prior, ...added] };
  // Keep the existing checkpoint limit. Never truncate history to fit it.
  if (
    new TextEncoder().encode(JSON.stringify(next)).byteLength >
    2 * 1024 * 1024 - 4096
  )
    return state;
  const parsed = progressSchema.safeParse(next);
  return parsed.success ? next : state;
}

function points(
  assessment: TableAssessment | null,
  answer: string,
  questionId: string,
  source: LearningObservation["source"],
  review?: ExplanationReviewDelivery,
): LearningObservation["points"] {
  if (!assessment?.valid) return [];
  return assessment.items
    .filter((row) => row.questionId === questionId)
    .map((row) => {
      const quoted = row.sourceQuotes ?? [];
      const grounded =
        row.sourceValid && quoted.every((quote) => answer.includes(quote));
      const reliable =
        source === "real_provider" &&
        grounded &&
        row.earned !== null &&
        row.label !== "待核对";
      const bound =
        review?.review.criterionId === row.id &&
        review.review.questionId === questionId &&
        review.review.originalAnswer === answer &&
        review.review.originalExplanation === row.explanation;
      return {
        id: row.id,
        requirement: row.requirement,
        explanation: row.explanation,
        quotes: quoted,
        claimedQuotes: row.quotes ?? [],
        label: row.label,
        status:
          bound && review?.state === "unavailable"
            ? ("needs_review" as const)
            : reliable
              ? row.label === "是"
                ? ("model_yes" as const)
                : ("model_no" as const)
              : ("needs_review" as const),
        ...(bound
          ? {
              reviewNote:
                review?.state === "verified"
                  ? `Codex独立审校补充（原模型未自行修正）：${review.review.humanExplanation}`
                  : "此项原模型解释不采用，独立审校依据暂未核实。",
            }
          : {}),
      };
    });
}

export function recordShortLearningFeedback(
  state: FaultProgress,
  attemptId: string,
  result: ShortResult,
  at: string,
): FaultProgress {
  const original = state.attempts.find((a) => a.id === attemptId);
  if (
    !original ||
    result.purpose !== "practice" ||
    result.state === "running" ||
    original.exerciseId !== result.card.id ||
    original.revision !== result.card.exerciseRevision ||
    original.answer !== result.answer ||
    original.choice
  )
    return state;
  return append(state, [
    {
      id: `short:${attemptId}:${result.id}`,
      attemptId,
      questionId: original.exerciseId,
      revision: original.revision,
      answer: original.answer,
      protocol: "short-table-v1",
      resultId: result.id,
      identity: result.identity,
      resultCreatedAt: result.createdAt,
      observedAt: at,
      source: result.source,
      state:
        result.state === "complete" && result.assessment?.valid
          ? "reviewed"
          : "unavailable",
      failure: result.failure,
      points:
        result.state === "complete"
          ? points(result.assessment, result.answer, "1", result.source)
          : [],
    },
  ]);
}

export function recordCaseLearningFeedback(
  state: FaultProgress,
  runId: string,
  result: TableResult,
  at: string,
  review?: ExplanationReviewDelivery,
): FaultProgress {
  const run = state.assessments?.runs.find((r) => r.id === runId);
  const paper = run && assessmentPaper(run.paperId);
  if (
    !run?.finishedAt ||
    !paper ||
    result.state === "running" ||
    result.version !== "table-trial-v1" ||
    paperCaseIds[run.paperId] !== result.case.id ||
    result.answers.length !== paper.questionIds.length ||
    new Set(result.answers.map((a) => a.id)).size !==
      paper.questionIds.length ||
    !paper.questionIds.every((qid, i) =>
      result.answers.some(
        (a) =>
          a.id === String(i + 1) && a.text === (run.answers[qid]?.answer ?? ""),
      ),
    )
  )
    return state;
  const boundReview =
    review?.review.resultId === result.id ? review : undefined;
  const observations = paper.questionIds.flatMap(
    (qid, index): LearningObservation[] => {
      const attemptId = run.attemptIds[qid],
        original = state.attempts.find((a) => a.id === attemptId);
      if (
        !original ||
        !original.answer.trim() ||
        original.exerciseId !== qid ||
        original.answer !== run.answers[qid]?.answer
      )
        return [];
      return [
        {
          id: `case:${original.id}:${result.id}`,
          attemptId: original.id,
          questionId: qid,
          revision: original.revision,
          answer: original.answer,
          protocol: "table-trial-v1",
          resultId: result.id,
          identity: result.identity,
          resultCreatedAt: result.createdAt,
          observedAt: at,
          source: result.source,
          originRunId: runId,
          state:
            result.state === "complete" && result.assessment?.valid
              ? "reviewed"
              : "unavailable",
          failure: result.failure,
          points:
            result.state === "complete"
              ? points(
                  result.assessment,
                  original.answer,
                  String(index + 1),
                  result.source,
                  boundReview,
                )
              : [],
        },
      ];
    },
  );
  return append(state, observations);
}

function currentUnitResult(raw: UnitFeedbackResult): UnitFeedbackResult | null {
  try {
    const binding = unitFeedbackBinding(raw.view.questionId);
    const question = exerciseFor(raw.view.questionId);
    if (
      !binding ||
      !question ||
      question.kind !== "subjective" ||
      !question.criteria?.length ||
      exerciseRevision(question.id) !== binding.questionRevision ||
      question.title !== binding.title ||
      question.facts !== binding.facts ||
      question.prompt !== binding.prompt ||
      question.criteria.length !== binding.criteria.length ||
      question.criteria.some((point, index) => {
        const criterion = binding.criteria[index];
        return (
          point.id !== criterion.id ||
          point.label !== criterion.label ||
          point.meaning !== criterion.meaning ||
          point.acceptable !== criterion.acceptable ||
          point.boundary !== criterion.boundary
        );
      })
    )
      return null;
    const result = validateUnitFeedbackResult(raw, {
      questionId: question.id,
      questionRevision: binding.questionRevision,
      contentId: binding.contentId,
    });
    if (
      result.view.title !== binding.title ||
      result.view.facts !== binding.facts ||
      result.view.prompt !== binding.prompt
    )
      return null;
    const pending = ["system_error", "no_answer"].includes(result.view.status);
    if (
      !pending &&
      (result.view.points.length !== binding.criteria.length ||
        result.view.points.some((point, index) => {
          const criterion = binding.criteria[index];
          return (
            point.id !== criterion.id ||
            point.label !== criterion.label ||
            point.meaning !== criterion.meaning ||
            point.acceptable !== criterion.acceptable ||
            point.boundary !== criterion.boundary
          );
        }))
    )
      return null;
    return result;
  } catch {
    return null;
  }
}

function immutableUnitResult(result: UnitFeedbackResult | undefined) {
  if (!result) return null;
  try {
    const { pointReviews: _reviews, ...original } =
      validateUnitFeedbackResult(result);
    return JSON.stringify(original);
  } catch {
    return null;
  }
}

/** Adds an observation only; the original answer, task and receipt stay intact. */
export function recordUnitLearningFeedback(
  state: FaultProgress,
  attemptId: string,
  raw: UnitFeedbackResult,
  at: string,
): FaultProgress {
  const original = state.attempts.find((a) => a.id === attemptId);
  const result = currentUnitResult(raw);
  if (
    !original ||
    !result ||
    original.choice ||
    original.exerciseId !== result.view.questionId ||
    original.revision !== result.view.questionRevision ||
    original.answer !== result.view.originalText
  )
    return state;
  const origin = state.attempts.find((a) => a.id === result.view.answerId);
  if (
    origin &&
    (origin.choice ||
      origin.exerciseId !== original.exerciseId ||
      origin.revision !== original.revision ||
      origin.answer !== original.answer)
  )
    return state;
  // A result reread for another event may never acquire different evidence.
  if (
    (state.learningObservations ?? []).some(
      (row) =>
        row.protocol === "unit-feedback-v1" &&
        row.resultId === result.id &&
        immutableUnitResult(row.unitResult) !== immutableUnitResult(result),
    )
  )
    return state;
  const saved = structuredClone(result);
  const teacherHolds = saved.sourceTeacher
    ? teacherPriorityLearningHolds(saved.sourceTeacher, saved.view)
    : new Map<string, string>();
  const earlier = (state.learningObservations ?? []).filter(
    (row) =>
      row.protocol === "unit-feedback-v1" &&
      row.attemptId === attemptId &&
      row.resultId === saved.id,
  );
  if (
    earlier.some(
      (row) =>
        JSON.stringify(row.unitResult?.pointReviews ?? []) ===
        JSON.stringify(saved.pointReviews ?? []),
    )
  )
    return state;
  // Later independent annotations are separate observations, never replacement
  // model judgments. Repeated reads cannot duplicate or erase earlier evidence.
  const observationId = `unit:${attemptId}:${saved.id}${earlier.length ? `:review:${earlier.length}` : ""}`;
  return append(state, [
    {
      id: observationId,
      attemptId,
      questionId: original.exerciseId,
      revision: original.revision,
      answer: original.answer,
      protocol: "unit-feedback-v1",
      resultId: saved.id,
      identity: saved.view.contentId,
      resultCreatedAt: saved.createdAt,
      observedAt: at,
      source: saved.source,
      state: saved.view.status === "assessed" ? "reviewed" : "unavailable",
      failure: saved.view.status === "assessed" ? null : saved.view.status,
      points: saved.view.points.map((point) => {
        const review = saved.pointReviews?.find(
          (r) => r.criterionId === point.id,
        );
        const status = compatibleFeedbackStatus(
          point.status,
          saved.source,
          review?.state === "needs_review" || teacherHolds.has(point.id),
        );
        return {
          id: point.id,
          requirement: point.label,
          meaning: point.meaning,
          acceptable: point.acceptable,
          boundary: point.boundary,
          nativeStatus: point.status,
          explanation: point.explanation,
          quotes: [...point.quotes],
          claimedQuotes: [...point.quotes],
          label:
            status === "model_yes"
              ? "是"
              : status === "model_no"
                ? "否"
                : "待核对",
          status,
          ...(teacherHolds.has(point.id)
            ? { reviewNote: teacherHolds.get(point.id) }
            : review
              ? {
                  reviewNote: nativeFeedbackReviewNote(
                    saved.source,
                    review.note,
                  ),
                }
              : {}),
        };
      }),
      unitResult: saved,
    },
  ]);
}

function validNativeObservation(
  state: FaultProgress,
  row: LearningObservation,
) {
  if (row.protocol !== "unit-feedback-v1") return true;
  const attempt = state.attempts.find((a) => a.id === row.attemptId);
  if (
    !attempt ||
    attempt.exerciseId !== row.questionId ||
    attempt.revision !== row.revision ||
    attempt.answer !== row.answer ||
    !row.unitResult ||
    !learningObservationSchema.safeParse(row).success ||
    !currentUnitResult(row.unitResult)
  )
    return false;
  const origin = state.attempts.find(
    (a) => a.id === row.unitResult!.view.answerId,
  );
  return (
    !origin ||
    (!origin.choice &&
      origin.exerciseId === row.questionId &&
      origin.revision === row.revision &&
      origin.answer === row.answer)
  );
}

/** Same event/result may be reread; a second event still gets its own binding. */
export function feedbackObservation(state: FaultProgress, feedbackId: string) {
  const row = state.learningObservations?.find((r) => r.id === feedbackId);
  if (row && validNativeObservation(state, row)) return row;
  const submitted = state.submittedFeedback?.find(
    (entry) => entry.id === feedbackId,
  );
  return submitted
    ? projectCurrentSubmittedLearningFeedback(
        state,
        submitted.attemptId,
        feedbackId,
      )
    : null;
}

export function feedbackForAttempt(state: FaultProgress, attemptId: string) {
  return (
    [...(state.learningObservations ?? [])]
      .filter(
        (r) => r.attemptId === attemptId && validNativeObservation(state, r),
      )
      .sort(
        (a, b) =>
          b.observedAt.localeCompare(a.observedAt) || b.id.localeCompare(a.id),
      )[0] ?? projectCurrentSubmittedLearningFeedback(state, attemptId)
  );
}

export function compareLearningFeedback(
  state: FaultProgress,
  attemptId: string,
) {
  const current = state.attempts.find((a) => a.id === attemptId),
    next = feedbackForAttempt(state, attemptId);
  const link = current?.feedbackRetry;
  if (!current || !next || !link) return null;
  const draft = state.drafts[current.exerciseId];
  if (draft?.feedbackRetry?.taskId === link.taskId && draft.feedbackRetryPaused)
    return null;
  const earlier = state.attempts.find((a) => a.id === link.originalAttemptId);
  const prior = feedbackObservation(state, link.feedbackId);
  if (
    !earlier ||
    !prior ||
    link.questionId !== current.exerciseId ||
    link.revision !== current.revision ||
    earlier.exerciseId !== current.exerciseId ||
    earlier.revision !== current.revision ||
    prior.attemptId !== earlier.id ||
    prior.questionId !== current.exerciseId ||
    prior.revision !== current.revision ||
    prior.answer !== earlier.answer ||
    prior.resultId !== link.feedbackResultId ||
    next.questionId !== current.exerciseId ||
    next.revision !== current.revision ||
    next.answer !== current.answer
  )
    return null;
  if (
    next.protocol === "unit-feedback-v1" ||
    prior.protocol === "unit-feedback-v1"
  ) {
    if (next.protocol !== prior.protocol || next.identity !== prior.identity)
      return null;
    const binding = unitFeedbackBinding(current.exerciseId);
    const boundPriorityFlight =
      current.exerciseId === "cl14-flight-no-serious-result" &&
      !!binding &&
      [next.unitResult, prior.unitResult].every(
        (result) =>
          result?.sourceTeacher?.version === TEACHER_SOURCE_PRIORITY_PROTOCOL &&
          result.view.contentId === binding.contentId &&
          result.sourceTeacher.binding.contentId === binding.contentId &&
          result.sourceTeacher.binding.questionId === current.exerciseId &&
          result.sourceTeacher.binding.questionRevision === current.revision &&
          result.sourceTeacher.binding.registrationVersion ===
            binding.registrationVersion,
      );
    const comparable =
      // Legacy normalized v2 receipts still lack comparable protocol identity.
      // This adopted teacher path retains both explicit protocol and binding;
      // only those matching receipts can escape the legacy hold.
      (boundPriorityFlight ||
        ![
          "cl14-flight-no-serious-result",
          "cl14-rail-unrelated-accident",
        ].includes(current.exerciseId)) &&
      next.unitResult?.sourceTeacher?.version ===
        prior.unitResult?.sourceTeacher?.version &&
      ![next.unitResult, prior.unitResult].some(
        (result) =>
          result?.sourceTeacher &&
          teacherSourceNeedsReview(result.sourceTeacher, result.view),
      ) &&
      next.source === "real_provider" &&
      prior.source === "real_provider" &&
      next.unitResult?.purpose === prior.unitResult?.purpose &&
      next.state === "reviewed" &&
      prior.state === "reviewed" &&
      (next.resultId !== prior.resultId ||
        immutableUnitResult(next.unitResult) ===
          immutableUnitResult(prior.unitResult));
    return {
      original: earlier,
      current,
      reused: next.resultId === prior.resultId,
      sampleComparison:
        next.unitResult?.purpose === "synthetic_validation" ||
        prior.unitResult?.purpose === "synthetic_validation",
      comparable,
      points: next.points.map((point) => {
        const old = prior.points.find((p) => p.id === point.id);
        const before = old?.nativeStatus ?? "uncertain";
        const after = point.nativeStatus ?? "uncertain";
        return {
          id: point.id,
          requirement: point.requirement,
          before,
          after,
          beforeNeedsReview: old?.status === "needs_review",
          afterNeedsReview: point.status === "needs_review",
          state:
            !comparable ||
            before === "uncertain" ||
            after === "uncertain" ||
            point.status === "needs_review" ||
            old?.status === "needs_review"
              ? ("unknown" as const)
              : before === after
                ? ("unchanged" as const)
                : after === "covered"
                  ? ("model_now_accepts" as const)
                  : before === "covered"
                    ? ("model_no_longer_accepts" as const)
                    : ("changed_opinion" as const),
        };
      }),
    };
  }
  const comparable =
    next.identity === prior.identity &&
    next.protocol === prior.protocol &&
    (next.resultId !== prior.resultId ||
      JSON.stringify(next.points) === JSON.stringify(prior.points)) &&
    next.source === "real_provider" &&
    prior.source === "real_provider" &&
    next.state === "reviewed" &&
    prior.state === "reviewed" &&
    next.points
      .map((p) => p.id)
      .sort()
      .join() ===
      prior.points
        .map((p) => p.id)
        .sort()
        .join() &&
    next.points.every((p) =>
      prior.points.some(
        (old) => old.id === p.id && old.requirement === p.requirement,
      ),
    );
  return {
    original: earlier,
    current,
    reused: next.resultId === prior.resultId,
    points: next.points.map((p) => {
      const old = prior.points.find((q) => q.id === p.id);
      return {
        id: p.id,
        requirement: p.requirement,
        before: old?.status ?? "needs_review",
        after: p.status,
        state:
          !comparable ||
          p.status === "needs_review" ||
          old?.status === "needs_review"
            ? ("unknown" as const)
            : old?.status === "model_no" && p.status === "model_yes"
              ? ("model_now_accepts" as const)
              : old?.status === "model_yes" && p.status === "model_no"
                ? ("model_no_longer_accepts" as const)
                : ("unchanged" as const),
      };
    }),
    comparable,
  };
}
