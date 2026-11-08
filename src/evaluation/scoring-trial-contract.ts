import { z } from "zod";

export const scoringTrialRequest = z
  .object({
    action: z.enum(["lookup", "evaluate"]),
    caseId: z.string().min(1).max(100),
    exerciseRevision: z.string().min(1).max(150).optional(),
    answer: z
      .string()
      .min(1)
      .max(4000)
      .refine((v) => v.trim().length > 0),
  })
  .strict();
export type ScoringQuestionPart = {
  id: string;
  question: string;
  criterionIds: string[];
};
export type ScoringTrialQuestion = {
  id: string;
  revision: string;
  exerciseRevision?: string;
  title: string;
  facts: string;
  question: string;
  maxScore: number;
  parts?: ScoringQuestionPart[];
  // Authored presentation cue; does not change the scoring card or points.
  coreConclusionCriterionId?: string;
};
export type BankScoringSummary = {
  id: string;
  title: string;
  exerciseRevision: string;
  maxScore: number;
};
const item = z
  .object({
    criterionId: z.string(),
    title: z.string(),
    earned: z.number().nullable(),
    maxScore: z.number(),
    feedback: z.string(),
    evidence: z.array(z.string()),
    pendingReason: z.literal("conclusion").optional(),
    // Presentation hold; never overwrites the underlying recorded mark.
    reviewRequired: z.literal(true).optional(),
    // Semantic review can remain open even when the authored rule fixes zero.
    diagnosisPending: z.literal(true).optional(),
  })
  .strict();
export const scoringTrialResponse = z.discriminatedUnion("status", [
  z
    .object({
      status: z.literal("ready"),
      caseId: z.string(),
      answer: z.string(),
      scoringId: z.string(),
      judgment: z.enum(["scored", "pending"]),
      total: z.number().nullable(),
      maxScore: z.number(),
      items: z.array(item),
      reference: z.string(),
      sources: z.array(z.string()),
      durationMs: z.number(),
      createdAt: z.string(),
      source: z.enum(["model_trial", "offline_test"]),
      diagnosisPending: z.literal(true).optional(),
      resolution: z
        .object({
          policy: z.enum([
            "separate-score-and-diagnosis-v1",
            "authored-coherent-conclusion-v1",
          ]),
          decisionId: z.string(),
          sourceJudgment: z.enum(["scored", "pending"]),
          sourceTotal: z.number().nullable(),
        })
        .strict()
        .optional(),
    })
    .strict(),
  z
    .object({
      status: z.enum(["not_requested", "pending", "unavailable", "failed"]),
      reason: z.enum([
        "available",
        "waiting",
        "closed",
        "limit",
        "evaluation_failed",
        "storage_failed",
        "accounting_failed",
      ]),
    })
    .strict(),
]);
export type ScoringTrialResponse = z.infer<typeof scoringTrialResponse>;
export function validateScoringTrialResponse(
  caseId: string,
  answer: string,
  raw: unknown,
) {
  const result = scoringTrialResponse.parse(raw);
  if (
    result.status === "ready" &&
    (result.caseId !== caseId || result.answer !== answer)
  )
    throw new Error("answer-mismatch");
  return result;
}
