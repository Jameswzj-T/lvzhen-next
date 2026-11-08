import { z } from "zod";
import type { TableAssessment } from "../table-trial/contract";
export const SHORT_TABLE_VERSION = "short-table-v1";
const hash = z.string().regex(/^[a-f0-9]{64}$/);
const identityFields = {
  exerciseId: z.string().regex(/^exec-[a-z-]+$/),
  exerciseRevision: z.string().min(1).max(100),
  answer: z.string().max(5000),
};
export const shortRequest = z.discriminatedUnion("action", [
  z
    .object({
      action: z.enum(["submit", "lookup"]),
      version: z.literal(SHORT_TABLE_VERSION),
      ...identityFields,
      transmissionConsent: z.literal(true).optional(),
    })
    .strict(),
  z.object({ action: z.literal("read"), id: hash, ...identityFields }).strict(),
]);
export type ShortRequest = z.infer<typeof shortRequest>;
export type ShortSummary = {
  id: string;
  title: string;
  exerciseRevision: string;
  maximum: number;
};
export type ShortResult = {
  version: typeof SHORT_TABLE_VERSION;
  id: string;
  identity: string;
  card: ShortSummary;
  answer: string;
  createdAt: string;
  state: "running" | "complete" | "stopped";
  source: "real_provider" | "offline_test";
  purpose: "synthetic_validation" | "practice";
  assessment: TableAssessment | null;
  total: number | null;
  failure: string | null;
  costCny: number | null;
  durationMs: number;
};
export type ShortReply = {
  result: ShortResult | null;
  canSubmit: boolean;
  message: string;
  historical?: boolean;
  availability?: ShortAvailability;
};
export const shortAvailabilitySchema = z
  .object({
    state: z.enum(["ready", "paused", "unavailable", "unknown"]),
    reason: z
      .enum([
        "practice_not_authorized",
        "stopped",
        "disabled",
        "expired",
        "not_started",
        "quota_exhausted",
        "version_changed",
        "exercise_disabled",
        "busy",
        "consent_required",
        "read_error",
      ])
      .optional(),
    remainingCalls: z.number().int().nonnegative().optional(),
    message: z.string(),
  })
  .strict();
export type ShortAvailability = z.infer<typeof shortAvailabilitySchema>;
export function validateShortReply(
  raw: unknown,
  request: Pick<ShortRequest, "exerciseId" | "exerciseRevision" | "answer">,
): ShortReply {
  const reply = raw as ShortReply;
  if (
    !reply ||
    typeof reply.canSubmit !== "boolean" ||
    typeof reply.message !== "string"
  )
    throw Error("invalid-short-reply");
  if (
    reply.availability &&
    (!shortAvailabilitySchema.safeParse(reply.availability).success ||
      (reply.canSubmit && reply.availability.state !== "ready"))
  )
    throw Error("invalid-short-availability");
  const result = reply.result;
  if (result === null) return reply;
  if (
    !result ||
    result.version !== SHORT_TABLE_VERSION ||
    !hash.safeParse(result.id).success ||
    !hash.safeParse(result.identity).success ||
    result.card?.id !== request.exerciseId ||
    result.card.exerciseRevision !== request.exerciseRevision ||
    result.answer !== request.answer ||
    !["running", "complete", "stopped"].includes(result.state) ||
    !["synthetic_validation", "practice"].includes(result.purpose) ||
    !["real_provider", "offline_test"].includes(result.source)
  )
    throw Error("short-result-mismatch");
  if (
    result.total !== null &&
    (result.state !== "complete" ||
      result.failure !== null ||
      !result.assessment?.valid ||
      result.assessment.score?.total !== result.total ||
      !Number.isFinite(result.total))
  )
    throw Error("invalid-short-score");
  return reply;
}
