import { z } from "zod";
import type {
  CoverageCard,
  CoverageSource,
} from "./../short-coverage/contract";
export const REWRITE_VERSION = "question-rewrite-candidate-v1";
export const REWRITE_EXERCISE = "cap-contract-v2-q2";
export const REWRITE_FOCUS = "2-4";
export type RewriteCandidate = {
  version: typeof REWRITE_VERSION;
  identity: string;
  cardHash: string;
  card: CoverageCard;
  publicSources: CoverageSource[];
};
export type SyntheticPair = {
  id: string;
  provenance: "authored_fiction";
  exerciseId: typeof REWRITE_EXERCISE;
  exerciseRevision: string;
  original: { attemptId: string; text: string };
  rewrite: { correctionId: string; attemptId: string; text: string };
};
const hash = z.string().regex(/^[a-f0-9]{64}$/);
export const bindingSchema = z
  .object({
    version: z.literal(REWRITE_VERSION),
    candidateIdentity: hash,
    exerciseId: z.literal(REWRITE_EXERCISE),
    exerciseRevision: z.string(),
    cardHash: hash,
    originalAttemptId: z.string(),
    correctionId: z.string(),
    originalHash: hash,
    rewriteHash: hash,
  })
  .strict();
export type RewriteBinding = z.infer<typeof bindingSchema>;
export const judgmentKind = z.enum([
  "correct",
  "error",
  "omitted",
  "contradictory",
  "uncertain",
]);
export type JudgmentKind = z.infer<typeof judgmentKind>;
const sideSchema = z
  .object({
    table: z.string().min(1).max(40000),
    reviewedUnitIds: z.array(z.string()).max(100),
    kinds: z
      .array(z.object({ id: z.string(), kind: judgmentKind }).strict())
      .length(4),
  })
  .strict();
export const comparisonResponseSchema = z
  .object({
    binding: bindingSchema,
    original: sideSchema,
    rewrite: sideSchema,
  })
  .strict();
export type ComparisonResponse = z.infer<typeof comparisonResponseSchema>;
export type FocusState =
  | "corrected"
  | "still_error"
  | "insufficient"
  | "already_correct"
  | "new_error";
export type ComparisonState = "corrected" | "still_error" | "insufficient";
export const stateLabel: Record<ComparisonState, string> = {
  corrected: "本次完整小问已改正（候选）",
  still_error: "重答存在明确错误（候选）",
  insufficient: "材料或判定不足，暂不能确认改正",
};
