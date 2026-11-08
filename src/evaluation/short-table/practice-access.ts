import { join } from "node:path";
import { z } from "zod";
import { SHORT_TABLE_VERSION } from "./contract";

// A separately approved practice window. The old synthetic grant/ledger is
// never converted, reset or interpreted as permission to transmit a real answer.
export const shortPracticeRoot = (repo: string) =>
  join(repo, "artifacts", "short-table-practice");
export const shortPracticeGrantSchema = z
  .object({
    version: z.literal(SHORT_TABLE_VERSION),
    id: z.string().regex(/^[a-z0-9-]+$/),
    enabled: z.boolean(),
    scope: z.literal("practice_answers"),
    answerTransmission: z.literal("explicit_submission"),
    approvalRef: z.string().min(1).max(200),
    identity: z.string().regex(/^[a-f0-9]{64}$/),
    parentIdentity: z.string().regex(/^[a-f0-9]{64}$/),
    exerciseIds: z.array(z.string()).min(1).max(8),
    validFrom: z.iso.datetime(),
    validUntil: z.iso.datetime(),
    checkedAt: z.iso.date(),
    maxCalls: z.number().int().min(1).max(40),
    budgetCny: z.number().positive().max(8),
    reservationCny: z.literal(0.2),
  })
  .strict()
  .refine(
    (g) =>
      // Fixed reservation in integer micro-CNY avoids rejecting e.g. 12/2.40
      // because 12 * 0.2 is represented as 2.4000000000000004.
      g.maxCalls * 200_000 <= Math.floor(g.budgetCny * 1_000_000) &&
      new Set(g.exerciseIds).size === g.exerciseIds.length &&
      Date.parse(g.validUntil) > Date.parse(g.validFrom) &&
      Date.parse(g.validUntil) - Date.parse(g.validFrom) <= 86400000,
  );
