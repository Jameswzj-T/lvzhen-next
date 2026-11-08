import { z } from "zod";
import { modelAccessHeaders } from "@/model-access/client";
import { exerciseFor } from "../../../content/fault-catalog";
import shortCards from "../../../content/scoring-cards-short/execution-v1.json";
import {
  validateUnitFeedbackReply,
  validateUnitFeedbackResult,
  type UnitFeedbackResult,
  type UnitFeedbackReply,
} from "../../../evaluation/unit-feedback-contract";
import { unitFeedbackBinding } from "../../../evaluation/unit-feedback-catalog";
import {
  recordSubmittedFeedback,
  submittedFeedbackFor,
} from "../../../domain/submitted-feedback";
import { recordUnitLearningFeedback } from "../../../domain/learning-observations";
import type { FaultProgress } from "../../../domain/fault-progress";
import {
  createSubmittedAnswerReview,
  type SubmittedAnswer,
  type SubmittedAnswerReviewState,
} from "./submitted-answer-review";

const originalSchema = z
  .object({
    id: z.string(),
    exerciseId: z.string(),
    revision: z.string(),
    answer: z.string(),
    choice: z.string(),
  })
  .strict();
export type CapturedAnswerPersistence = {
  owner: object;
  storage: "local" | "account";
  confirmSaved(
    matches: (state: FaultProgress) => boolean,
  ): Promise<FaultProgress | null>;
  update(fn: (state: FaultProgress) => FaultProgress): boolean;
  retrySave?(): Promise<void>;
};
const same = (a: SubmittedAnswer, b: SubmittedAnswer) =>
  a.id === b.id &&
  a.exerciseId === b.exerciseId &&
  a.revision === b.revision &&
  a.answer === b.answer &&
  a.choice === b.choice;
const actual = (state: FaultProgress, original: SubmittedAnswer) =>
  state.attempts.find((row) => same(original, row));

/** Reused for network reads and explicit save-only recovery; never substitutes another original. */
function currentResult(
  raw: UnitFeedbackResult,
  original: SubmittedAnswer,
  contentId?: string,
) {
  const q = exerciseFor(original.exerciseId);
  if (!q) throw Error("question-unavailable");
  const known = unitFeedbackBinding(original.exerciseId);
  const result = validateUnitFeedbackResult(raw, {
    answerId: original.id,
    questionId: original.exerciseId,
    questionRevision: original.revision,
    originalText: original.choice || original.answer,
    ...(contentId || known ? { contentId: contentId ?? known!.contentId } : {}),
  });
  if (
    result.view.facts !== q.facts ||
    result.view.prompt !== q.prompt ||
    (q.kind === "objective" && result.view.points.length)
  )
    throw Error("question-result-binding");
  if (
    q.kind === "subjective" &&
    !["no_answer", "system_error"].includes(result.view.status) &&
    (result.view.points.length !== q.criteria!.length ||
      result.view.points.some(
        (p, i) =>
          p.id !== q.criteria![i].id ||
          p.label !== q.criteria![i].label ||
          p.meaning !== q.criteria![i].meaning ||
          p.acceptable !== q.criteria![i].acceptable ||
          p.boundary !== q.criteria![i].boundary,
      ))
  )
    throw Error("original-criteria-changed");
  const shortCard = shortCards.cards.find((c) => c.id === q.id);
  if (
    result.view.weightedScore &&
    (!shortCard ||
      result.view.weightedScore.maximum !==
        shortCard.pack.questions[0].criteria.reduce(
          (sum, c) => sum + c.points,
          0,
        ))
  )
    throw Error("original-weighted-score-changed");
  if (shortCard && !result.view.weightedScore)
    throw Error("original-weights-required");
  return result;
}

/** Browser transport for one current immutable original. Mount/history call lookup only. */
export async function readCurrentAnswerFeedback(
  original: SubmittedAnswer,
  action: "submit" | "lookup",
  fetcher: typeof fetch = fetch,
  signal?: AbortSignal,
): Promise<{
  reply: UnitFeedbackReply;
  original: SubmittedAnswer;
  contentId: string;
}> {
  const q = exerciseFor(original.exerciseId);
  if (!q) throw Error("question-unavailable");
  const response = await fetcher("/api/lab/scoring/registered-feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-lvzhen-scoring": "1",
      ...modelAccessHeaders(),
    },
    body: JSON.stringify({
      version: "registered-question-submission-v1",
      action,
      exerciseId: original.exerciseId,
      exerciseRevision: original.revision,
      attemptId: original.id,
      answer: original.answer,
      choice: original.choice,
      ...(action === "submit" ? { transmissionConsent: true } : {}),
    }),
    signal,
  });
  if (!response.ok) throw Error("feedback-unavailable");
  const raw = await response.json();
  const contentId = z
    .string()
    .regex(/^[a-f0-9]{64}$/)
    .parse(raw.binding?.contentId);
  const known = unitFeedbackBinding(original.exerciseId);
  if (known && contentId !== known.contentId)
    throw Error("current-content-changed");
  const expected = {
    questionId: original.exerciseId,
    questionRevision: original.revision,
    originalText: original.choice || original.answer,
    contentId,
  };
  const reply = validateUnitFeedbackReply(raw.reply, expected);
  let responseOriginal = originalSchema.parse(raw.original);
  if (reply.result) {
    const result = currentResult(reply.result, original, contentId);
    responseOriginal = {
      id: result.view.answerId,
      exerciseId: result.view.questionId,
      revision: result.view.questionRevision,
      answer: q.kind === "subjective" ? result.view.originalText : "",
      choice: q.kind === "objective" ? result.view.originalText : "",
    };
    if (!same(responseOriginal, originalSchema.parse(raw.original)))
      throw Error("response-original-binding");
  }
  return { reply, original: responseOriginal, contentId };
}

/** Captured owner and actual persisted checkpoints prevent a late review entering another record. */
export function createRecordedAnswerReview(
  persistence: CapturedAnswerPersistence,
  onStateChange: (
    state: SubmittedAnswerReviewState<UnitFeedbackResult>,
  ) => void,
  fetcher: typeof fetch = fetch,
) {
  const controller = createSubmittedAnswerReview<UnitFeedbackResult>({
    confirmOriginalSaved: async (original) => {
      const state = await persistence.confirmSaved(
        (p) => !!actual(p, original),
      );
      const row = state && actual(state, original);
      return row
        ? { status: "saved", storage: persistence.storage, original: row }
        : null;
    },
    requestReview: async (original, action) => {
      const response = await readCurrentAnswerFeedback(
        original,
        action,
        fetcher,
      );
      const { reply } = response;
      if (reply.result)
        return {
          status: "feedback",
          original: response.original,
          feedback: { id: reply.result.id, value: reply.result },
        };
      if (
        reply.availability === "ready" &&
        reply.canSubmit &&
        reply.submissionMode === "direct"
      )
        return {
          status: "ready",
          original: response.original,
          canSubmit: true,
        };
      return {
        status: "blocked",
        original: response.original,
        message: reply.message,
      };
    },
    saveFeedback: async (original, feedback) => {
      const result = currentResult(feedback.value, original);
      if (result.id !== feedback.id) return null;
      const persisted = persistence.update((p) => {
        if (!actual(p, original)) return p;
        const next = recordSubmittedFeedback(
          p,
          original.id,
          result,
          new Date().toISOString(),
        );
        return !original.choice && unitFeedbackBinding(original.exerciseId)
          ? recordUnitLearningFeedback(
              next,
              original.id,
              result,
              new Date().toISOString(),
            )
          : next;
      });
      if (!persisted) return null;
      const state = await persistence.confirmSaved(
        (p) =>
          !!actual(p, original) &&
          JSON.stringify(submittedFeedbackFor(p, original.id)) ===
            JSON.stringify(result),
      );
      const row = state && actual(state, original);
      return row
        ? {
            status: "saved",
            storage: persistence.storage,
            original: row,
            feedbackId: result.id,
          }
        : null;
    },
    onStateChange,
  });
  return {
    ...controller,
    saveReceived: async (
      original: SubmittedAnswer,
      raw: UnitFeedbackResult,
    ) => {
      let result: UnitFeedbackResult;
      try {
        result = currentResult(raw, original);
      } catch {
        return {
          status: "failed" as const,
          original,
          reason: "review_identity" as const,
        };
      }
      try {
        await persistence.retrySave?.();
      } catch {
        // Still retain the receipt in the save-only controller. Confirmation
        // will fail safely, and a later explicit retry will only persist it.
      }
      return controller.saveReceived(original, {
        id: result.id,
        value: result,
      });
    },
    retry: async (original: SubmittedAnswer) => {
      // Explicit user retry may resume a blocked idempotent record save.
      // Mount, refresh and late model callbacks never reach this operation.
      await persistence.retrySave?.();
      return controller.retry(original);
    },
  };
}
