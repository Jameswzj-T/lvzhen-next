import { z } from "zod";

// One adjudicated criterion judgment: a corpus row. The quoted student text is
// copied into the row so it stays readable without reopening the review; the
// review and criterion ids keep it traceable.
export const ADJUDICATION_VERSION = "adjudication-v1";
export const coverageLabel = z.enum(["是", "否", "待核对"]);
export const adjudicationRow = z
  .object({
    version: z.literal(ADJUDICATION_VERSION),
    id: z.string().regex(/^[a-f0-9]{64}$/),
    reviewId: z.string().regex(/^[a-f0-9]{64}$/),
    caseId: z.string().min(1),
    criterionId: z.string().min(1),
    requirement: z.string(),
    answerQuotes: z.array(z.string()),
    modelLabel: coverageLabel,
    modelReason: z.string(),
    frozenExpected: coverageLabel.nullable(),
    userLabel: coverageLabel,
    agreesWithModel: z.boolean(),
    note: z.string().max(500).optional(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
  })
  .strict();
export type AdjudicationRow = z.infer<typeof adjudicationRow>;

export const adjudicationRequest = z.discriminatedUnion("action", [
  z
    .object({
      action: z.literal("adjudicate"),
      reviewId: z.string().regex(/^[a-f0-9]{64}$/),
      criterionId: z.string().min(1),
      label: coverageLabel,
      note: z.string().max(500).optional(),
    })
    .strict(),
  z
    .object({
      action: z.literal("agree-all"),
      reviewId: z.string().regex(/^[a-f0-9]{64}$/),
    })
    .strict(),
]);
export type AdjudicationRequest = z.infer<typeof adjudicationRequest>;

export type QueueItem = {
  reviewId: string;
  caseId: string;
  criterionId: string;
  questionId: string;
  requirement: string;
  quotes: string[];
  modelLabel: "是" | "否" | "待核对";
  modelReason: string;
  reviewStatus: string;
  frozenExpected: "是" | "否" | "待核对" | null;
};
export type QueueReview = {
  reviewId: string;
  caseId: string;
  title: string;
  createdAt: string;
  kind: "frozen-sample" | "real-answer";
  total: number | null;
  maximum: number;
  open: QueueItem[];
};
