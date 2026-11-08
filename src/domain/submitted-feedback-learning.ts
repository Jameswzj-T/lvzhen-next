import {
  exerciseFor,
  exerciseRevision,
  exerciseSources,
} from "../content/fault-catalog";
import { isPracticeLocation, practiceSubject } from "../content/practice-set";
import { prepareRegisteredAnswerFeedback } from "../evaluation/registered-question-feedback-adapter";
import type { UnitExercise } from "../content/fault-unit";
import type { FaultProgress } from "./fault-progress";
import {
  compatibleFeedbackStatus,
  learningObservationSchema,
  nativeFeedbackReviewNote,
  type LearningObservation,
} from "./learning-observation-schema";
import { submittedFeedbackSchema } from "./submitted-feedback";

// These are the current-answer service's public content identities, pinned to
// the two published questions. A revision or reference/source change must be
// reviewed explicitly before saved feedback can guide another complete answer.
const bindings: Record<
  string,
  { revision: string; contentId: string; caseId: string }
> = {
  "civpro-jurisdiction-silence-no-response": {
    revision: "civpro-jurisdiction-response-2026-10-06.v1",
    contentId:
      "abb340ba348eff34d10cf61905a49c3b6ac1da7ccc13e849937236c105b2da46",
    caseId: "CP-JURIS-SILENT-1",
  },
  "civpro-jurisdiction-exclusive-response": {
    revision: "civpro-jurisdiction-response-2026-10-06.v1",
    contentId:
      "452d58b168d3ffc34b48cd36b0d4c435a5a85cd177b7e9da776780346c196f53",
    caseId: "CP-JURIS-EXCLUSIVE-1",
  },
};

// The existing learning/checkpoint readers are synchronous. Keep their exact
// SHA-256 task check browser-safe, without importing the server's node:crypto
// task preparer or making a request. Only public task data is hashed here.
function digest(value: unknown): string {
  const bytes = new TextEncoder().encode(JSON.stringify(value));
  const padded = new Uint8Array(Math.ceil((bytes.length + 9) / 64) * 64);
  padded.set(bytes);
  padded[bytes.length] = 0x80;
  const data = new DataView(padded.buffer);
  const bits = bytes.length * 8;
  data.setUint32(padded.length - 8, Math.floor(bits / 0x100000000));
  data.setUint32(padded.length - 4, bits >>> 0);
  const state = new Uint32Array([
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c,
    0x1f83d9ab, 0x5be0cd19,
  ]);
  const rounds = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
    0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
    0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
    0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
    0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
    0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ];
  const rotate = (word: number, n: number) => (word >>> n) | (word << (32 - n));
  const words = new Uint32Array(64);
  for (let offset = 0; offset < padded.length; offset += 64) {
    for (let i = 0; i < 16; i++) words[i] = data.getUint32(offset + i * 4);
    for (let i = 16; i < 64; i++) {
      const x = words[i - 15],
        y = words[i - 2];
      words[i] =
        (words[i - 16] +
          (rotate(x, 7) ^ rotate(x, 18) ^ (x >>> 3)) +
          words[i - 7] +
          (rotate(y, 17) ^ rotate(y, 19) ^ (y >>> 10))) >>>
        0;
    }
    let [a, b, c, d, e, f, g, h] = state;
    for (let i = 0; i < 64; i++) {
      const first =
        (h +
          (rotate(e, 6) ^ rotate(e, 11) ^ rotate(e, 25)) +
          ((e & f) ^ (~e & g)) +
          rounds[i] +
          words[i]) >>>
        0;
      const second =
        ((rotate(a, 2) ^ rotate(a, 13) ^ rotate(a, 22)) +
          ((a & b) ^ (a & c) ^ (b & c))) >>>
        0;
      h = g;
      g = f;
      f = e;
      e = (d + first) >>> 0;
      d = c;
      c = b;
      b = a;
      a = (first + second) >>> 0;
    }
    [a, b, c, d, e, f, g, h].forEach((word, i) => {
      state[i] = (state[i] + word) >>> 0;
    });
  }
  return Array.from(state, (word) => word.toString(16).padStart(8, "0")).join(
    "",
  );
}

function currentTaskId(
  original: FaultProgress["attempts"][number],
  question: UnitExercise,
  contentId: string,
): string | null {
  const plan = prepareRegisteredAnswerFeedback({
    exerciseId: original.exerciseId,
    exerciseRevision: original.revision,
    attemptId: original.id,
    answer: original.answer,
  });
  if (plan.kind !== "written_model" || plan.grading !== "qualitative")
    return null;
  const definition = {
    questionId: question.id,
    revision: original.revision,
    parentCaseId: question.caseId ?? question.id,
    title: question.title,
    facts: question.facts,
    prompt: question.prompt,
    criteria: (question.criteria ?? []).map((point) => ({ ...point })),
    rules: [],
    referenceFingerprint: digest(question.reference),
    sources: question.sources.map((id) => ({
      id,
      ...exerciseSources(question.id)[id],
    })),
    kind: question.kind,
    grading: plan.grading,
  };
  if (digest(definition) !== contentId) return null;
  return digest({
    version: "unit-evidence-feedback-candidate-v1",
    contentId,
    definition,
    input: plan.evaluationInput,
    instructions:
      plan.request.messages.find((message) => message.role === "system")
        ?.content ?? "",
    registeredQuestion: {
      version: "registered-question-feedback-20261007.v1",
      kind: question.kind,
    },
    registeredModelRequest: plan.request,
  });
}

function projectSavedFeedback(
  state: FaultProgress,
  attemptId: string,
  feedbackId?: string,
): LearningObservation | null {
  const originals = state.attempts.filter((a) => a.id === attemptId);
  if (originals.length !== 1) return null;
  const original = originals[0];
  const binding = bindings[original.exerciseId];
  if (!binding || original.choice || original.revision !== binding.revision)
    return null;
  const rows = state.submittedFeedback ?? [];
  const selected = feedbackId
    ? rows.find((row) => row.id === feedbackId)
    : rows.findLast((row) => row.attemptId === attemptId);
  const parsed = submittedFeedbackSchema.safeParse(selected);
  if (!parsed.success) return null;
  const row = parsed.data;
  const saved = structuredClone(row.result);
  if (
    row.id !== `submitted:${attemptId}:${saved.id}` ||
    row.attemptId !== original.id ||
    row.questionId !== original.exerciseId ||
    row.revision !== original.revision ||
    row.answer !== original.answer ||
    row.choice ||
    saved.view.contentId !== binding.contentId ||
    rows.filter((entry) => entry.id === row.id).length !== 1 ||
    rows.some(
      (entry) =>
        entry.id !== row.id &&
        entry.result.id === saved.id &&
        JSON.stringify(entry.result) !== JSON.stringify(saved),
    )
  )
    return null;
  const observation = learningObservationSchema.safeParse({
    id: row.id,
    attemptId,
    questionId: row.questionId,
    revision: row.revision,
    answer: row.answer,
    protocol: "unit-feedback-v1",
    resultId: saved.id,
    identity: saved.view.contentId,
    resultCreatedAt: saved.createdAt,
    observedAt: row.observedAt,
    source: saved.source,
    state: saved.view.status === "assessed" ? "reviewed" : "unavailable",
    failure: saved.view.status === "assessed" ? null : saved.view.status,
    points: saved.view.points.map((point) => {
      const review = saved.pointReviews?.find(
        (entry) => entry.criterionId === point.id,
      );
      const status = compatibleFeedbackStatus(
        point.status,
        saved.source,
        review?.state === "needs_review",
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
        ...(review
          ? { reviewNote: nativeFeedbackReviewNote(saved.source, review.note) }
          : {}),
      };
    }),
    unitResult: saved,
  });
  return observation.success ? observation.data : null;
}

/** A saved row can require review without being an adopted judgment or source.
 * Keep an unprojectable result on its own question; never invent replacement
 * points to fit the legacy observation's stricter field limits.
 */
export function hasSavedSubmittedLearningFeedback(
  state: FaultProgress,
  attemptId: string,
): boolean {
  const originals = state.attempts.filter((entry) => entry.id === attemptId);
  return (
    originals.length === 1 &&
    !!bindings[originals[0].exerciseId] &&
    !!state.submittedFeedback?.some(
      (row) =>
        row.attemptId === attemptId &&
        row.questionId === originals[0].exerciseId,
    )
  );
}

/** Read an exact canonical saved event; never append a legacy observation. */
export function projectCurrentSubmittedLearningFeedback(
  state: FaultProgress,
  attemptId: string,
  feedbackId?: string,
): LearningObservation | null {
  const feedback = projectSavedFeedback(state, attemptId, feedbackId);
  if (!feedback?.unitResult) return null;
  const binding = bindings[feedback.questionId];
  const question = exerciseFor(feedback.questionId);
  const view = feedback.unitResult.view;
  if (
    !question ||
    question.kind !== "subjective" ||
    question.caseId !== binding.caseId ||
    practiceSubject(question.id) !== "civil-procedure" ||
    !isPracticeLocation(question.id, "subjective") ||
    exerciseRevision(question.id) !== binding.revision ||
    view.weightedScore ||
    question.title !== view.title ||
    question.facts !== view.facts ||
    question.prompt !== view.prompt ||
    !question.criteria?.length ||
    view.taskId !==
      currentTaskId(
        state.attempts.find((entry) => entry.id === attemptId)!,
        question,
        binding.contentId,
      )
  )
    return null;
  const unavailable = ["system_error", "no_answer"].includes(view.status);
  if (
    !unavailable &&
    (view.points.length !== question.criteria.length ||
      view.points.some((point, index) => {
        const criterion = question.criteria![index];
        return (
          point.id !== criterion.id ||
          point.criterionId !== criterion.id ||
          point.label !== criterion.label ||
          point.meaning !== criterion.meaning ||
          point.acceptable !== criterion.acceptable ||
          point.boundary !== criterion.boundary
        );
      }))
  )
    return null;
  return feedback;
}

function hasCompleteRetryGap(feedback: LearningObservation) {
  return (
    feedback.source === "real_provider" &&
    feedback.state === "reviewed" &&
    feedback.unitResult?.purpose === "practice" &&
    !feedback.unitResult.view.weightedScore &&
    feedback.points.length > 0 &&
    feedback.points.every((point) => point.status !== "needs_review") &&
    feedback.points.some((point) =>
      ["partial", "missing", "contradicted"].includes(point.nativeStatus ?? ""),
    )
  );
}

/** Historical source for an existing relationship, including paused drafts.
 * Consumers still require the current projection before starting/submitting.
 */
export function savedSubmittedFeedbackRetrySource(
  state: FaultProgress,
  attemptId: string,
  feedbackId: string,
): LearningObservation | null {
  const feedback = projectSavedFeedback(state, attemptId, feedbackId);
  return feedback && hasCompleteRetryGap(feedback) ? feedback : null;
}

export function isCurrentSubmittedFeedbackRetrySource(
  state: FaultProgress,
  feedback: LearningObservation,
): boolean {
  const current = projectCurrentSubmittedLearningFeedback(
    state,
    feedback.attemptId,
    feedback.id,
  );
  return (
    !!current &&
    hasCompleteRetryGap(current) &&
    JSON.stringify(current) === JSON.stringify(feedback)
  );
}
