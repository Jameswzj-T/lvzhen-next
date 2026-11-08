import { z } from "zod";
import {
  validateUnitFeedbackResult,
  type UnitFeedbackResult,
} from "../evaluation/unit-feedback-contract";
import type { FaultProgress } from "./fault-progress";

/** Separate immutable feedback event, not an answer rewrite, score or mastery state. */
export const submittedFeedbackSchema = z
  .object({
    id: z.string().min(1).max(250),
    attemptId: z.string().min(1).max(120),
    questionId: z.string().min(1).max(120),
    revision: z.string().min(1).max(120),
    answer: z.string().max(8000),
    choice: z.string().max(20),
    observedAt: z.iso.datetime(),
    result: z.custom<UnitFeedbackResult>((raw) => {
      try {
        validateUnitFeedbackResult(raw);
        return true;
      } catch {
        return false;
      }
    }),
  })
  .strict()
  .superRefine((row, ctx) => {
    const v = row.result?.view;
    if (
      !v ||
      v.answerId !== row.attemptId ||
      v.questionId !== row.questionId ||
      v.questionRevision !== row.revision ||
      v.originalText !== (row.choice || row.answer) ||
      (row.choice && (row.answer || v.points.length))
    )
      ctx.addIssue({
        code: "custom",
        message: "submitted-feedback-original-binding",
      });
  });

export function recordSubmittedFeedback(
  state: FaultProgress,
  attemptId: string,
  raw: UnitFeedbackResult,
  observedAt: string,
): FaultProgress {
  const original = state.attempts.find((a) => a.id === attemptId);
  if (!original) return state;
  const result = validateUnitFeedbackResult(raw, {
    answerId: original.id,
    questionId: original.exerciseId,
    questionRevision: original.revision,
    originalText: original.choice || original.answer,
  });
  const id = `submitted:${attemptId}:${result.id}`;
  const existing = state.submittedFeedback?.find((r) => r.id === id);
  if (existing) {
    if (JSON.stringify(existing.result) !== JSON.stringify(result))
      throw Error("feedback-event-changed");
    return state;
  }
  const event = submittedFeedbackSchema.parse({
    id,
    attemptId,
    questionId: original.exerciseId,
    revision: original.revision,
    answer: original.answer,
    choice: original.choice,
    observedAt,
    result: structuredClone(result),
  });
  return {
    ...state,
    submittedFeedback: [...(state.submittedFeedback ?? []), event],
  };
}

export function submittedFeedbackFor(state: FaultProgress, attemptId: string) {
  return (
    state.submittedFeedback?.findLast((r) => r.attemptId === attemptId)
      ?.result ?? null
  );
}
