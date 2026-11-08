import { z } from "zod";
import { topicFor } from "../content/fault-unit";
import { inputSchema, resultSchema, validateResult } from "./index";

export const lessonFeedbackQuestion = topicFor("intent")!.exercises.find(
  (q) => q.id === "intent-tolerate",
)!;
export const lessonFeedbackRequest = z
  .object({
    action: z.enum(["lookup", "evaluate"]),
    attemptId: z.string().min(1).max(100),
    answer: z
      .string()
      .min(1)
      .max(8000)
      .refine((s) => s.trim().length > 0),
  })
  .strict();

export function lessonFeedbackInput(attemptId: string, answer: string) {
  const q = lessonFeedbackQuestion;
  return inputSchema.parse({
    caseId: q.id,
    caseRevision: "lesson-intent-feedback-v1",
    question: q.prompt,
    facts: q.facts,
    criteria: q.criteria!.map((c) => ({
      id: c.id,
      description: c.meaning,
      ruleBasis: q.reference,
    })),
    answerId: attemptId,
    studentText: answer,
  });
}

export const lessonFeedbackResponse = z.discriminatedUnion("status", [
  z
    .object({
      status: z.literal("ready"),
      result: resultSchema,
      durationMs: z.number().nonnegative(),
      createdAt: z.string(),
      source: z.enum(["model_trial", "offline_test"]),
    })
    .strict(),
  z
    .object({
      status: z.enum(["not_requested", "pending", "unavailable", "failed"]),
      reason: z.enum([
        "available",
        "closed",
        "limit",
        "waiting",
        "evaluation_failed",
        "storage_failed",
      ]),
    })
    .strict(),
]);
export type LessonFeedbackResponse = z.infer<typeof lessonFeedbackResponse>;

export function validateLessonFeedback(
  attemptId: string,
  answer: string,
  raw: unknown,
) {
  const response = lessonFeedbackResponse.parse(raw);
  if (response.status === "ready") {
    validateResult(lessonFeedbackInput(attemptId, answer), response.result);
    if (!["assessed", "needs_clarification"].includes(response.result.status))
      throw new Error("unassessed-feedback");
  }
  return response;
}
