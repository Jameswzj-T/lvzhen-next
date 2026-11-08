import {
  teacherSourceEvidenceSchema,
  checkTeacherSourceEvidence,
} from "../domain/teacher-source-feedback-contract";
import { z } from "zod";
import type { UnitFeedbackView } from "./unit-feedback";

export const UNIT_RESULT_VERSION = "unit-feedback-v1";
const hash = z.string().regex(/^[a-f0-9]{64}$/);
const text = z.string().max(12000);
const key = z.string().min(1).max(160);
export const nativeFeedbackStatus = z.enum([
  "covered",
  "partial",
  "missing",
  "contradicted",
  "uncertain",
]);
export const unitFeedbackViewSchema = z
  .object({
    version: z.literal("unit-evidence-feedback-candidate-v1"),
    teachingStyle: z
      .enum(["direct-learner-v1", "direct-overall-v2", "direct-overall-v3"])
      .optional(),
    studentResponse: z.string().min(1).max(800).optional(),
    taskId: hash,
    contentId: hash,
    questionId: key,
    questionRevision: key,
    answerId: key,
    title: text,
    facts: text,
    prompt: text,
    originalText: z.string().max(8000),
    status: z.enum([
      "assessed",
      "needs_clarification",
      "no_answer",
      "system_error",
    ]),
    heading: text,
    score: z.null(),
    weightedScore: z
      .object({
        confirmed: z.number().int().nonnegative(),
        pending: z.number().int().nonnegative(),
        total: z.number().int().nonnegative().nullable(),
        maximum: z.number().int().positive(),
      })
      .strict()
      .optional(),
    scoreNotice: text,
    notice: text,
    clarification: text.nullable(),
    substantiveIssue: text.nullable(),
    terminologySuggestion: text.nullable(),
    points: z
      .array(
        z
          .object({
            id: key,
            criterionId: key,
            label: text,
            meaning: text,
            acceptable: text,
            boundary: text,
            status: nativeFeedbackStatus,
            quotes: z.array(z.string().min(1).max(8000)).max(8),
            explanation: text,
          })
          .strict(),
      )
      .max(8),
  })
  .strict();
export const unitFeedbackResultSchema = z
  .object({
    version: z.literal(UNIT_RESULT_VERSION),
    id: hash,
    createdAt: z.iso.datetime(),
    source: z.enum(["real_provider", "offline_test"]),
    purpose: z.enum(["synthetic_validation", "practice"]),
    view: unitFeedbackViewSchema,
    sourceTeacher: teacherSourceEvidenceSchema.optional(),
    receipt: z
      .object({ responseId: key.nullable(), receiptHash: hash.nullable() })
      .strict(),
    pointReviews: z
      .array(
        z
          .object({
            criterionId: key,
            state: z.enum(["needs_review", "note"]),
            note: text,
            source: z.literal("codex_independent"),
          })
          .strict(),
      )
      .max(8)
      .optional(),
  })
  .strict();
export type UnitFeedbackResult = Omit<
  z.infer<typeof unitFeedbackResultSchema>,
  "view"
> & { view: UnitFeedbackView };
export const unitTrialAvailabilitySchema = z
  .object({
    version: z.literal("unit-feedback-local-trial-v1"),
    grantId: key.nullable(),
    purpose: z.enum(["synthetic_validation", "practice"]),
    provider: z.literal("deepseek"),
    model: z.literal("deepseek-flash"),
    exerciseIds: z.array(key).max(5),
    validUntil: z.iso.datetime().nullable(),
    maxCalls: z.number().int().nonnegative().nullable(),
    callsUsed: z.number().int().nonnegative(),
    remainingCalls: z.number().int().nonnegative(),
    budgetCNY: z.number().finite().nonnegative().nullable(),
    spentCNY: z.number().finite().nonnegative().nullable(),
    remainingCNY: z.number().finite().nonnegative().nullable(),
    state: z.enum([
      "awaiting_authorization",
      "awaiting_activation",
      "active",
      "expired",
      "closed",
      "busy",
    ]),
    canActivate: z.boolean(),
    notice: text,
  })
  .strict();
export type UnitTrialAvailability = z.infer<typeof unitTrialAvailabilitySchema>;
export type UnitFeedbackReply = {
  result: UnitFeedbackResult | null;
  canSubmit: boolean;
  message: string;
  availability:
    | "lookup_only"
    | "unsupported"
    | "changed"
    | "paused"
    | "ready"
    | "busy"
    | "failed";
  submissionMode?: "closed" | "synthetic_test" | "real_trial" | "direct";
  trial?: UnitTrialAvailability;
};
const requestIdentity = {
  version: z.literal(UNIT_RESULT_VERSION),
  exerciseId: key,
  exerciseRevision: key,
  attemptId: key,
  answer: z.string().min(1).max(8000),
};
export const unitFeedbackLookupSchema = z
  .object({
    action: z.literal("lookup"),
    ...requestIdentity,
  })
  .strict();
export const unitFeedbackSubmitSchema = z
  .object({
    action: z.literal("submit"),
    ...requestIdentity,
    registrationVersion: key,
    contentId: hash,
    transmissionConsent: z.literal(true),
    trialId: key.optional(),
  })
  .strict();
export const unitFeedbackActivateSchema = unitFeedbackSubmitSchema.extend({
  action: z.literal("activate"),
  trialId: key,
});
export const unitFeedbackRequestSchema = z.discriminatedUnion("action", [
  unitFeedbackLookupSchema,
  unitFeedbackSubmitSchema,
  unitFeedbackActivateSchema,
]);
export type UnitFeedbackRequest = z.infer<typeof unitFeedbackRequestSchema>;

/** Browser-safe structural and original-text checks; semantic validity is separate. */
export function validateUnitFeedbackResult(
  raw: unknown,
  binding: {
    questionId?: string;
    questionRevision?: string;
    originalText?: string;
    contentId?: string;
    taskId?: string;
    answerId?: string;
  } = {},
): UnitFeedbackResult {
  const result = unitFeedbackResultSchema.parse(raw);
  for (const [key, value] of Object.entries(binding))
    if (
      value !== undefined &&
      result.view[key as keyof typeof binding] !== value
    )
      throw Error("unit-feedback-result-binding");
  const view = result.view;
  if (
    (view.teachingStyle === "direct-overall-v2" ||
      view.teachingStyle === "direct-overall-v3") !==
    (view.studentResponse !== undefined)
  )
    throw Error("overall-teaching-version-binding");
  if (
    view.weightedScore &&
    (view.weightedScore.confirmed + view.weightedScore.pending >
      view.weightedScore.maximum ||
      view.weightedScore.total !==
        (view.weightedScore.pending ? null : view.weightedScore.confirmed))
  )
    throw Error("unit-weighted-score-state");
  if (
    new Set(view.points.map((p) => p.id)).size !== view.points.length ||
    view.points.some(
      (p) =>
        p.id !== p.criterionId ||
        p.quotes.some((q) => !q.trim() || !view.originalText.includes(q)) ||
        (["covered", "partial", "contradicted"].includes(p.status) &&
          !p.quotes.length),
    )
  )
    throw Error("unit-feedback-evidence-binding");
  if (
    (view.status === "needs_clarification") !== (view.clarification !== null) ||
    ((view.status === "system_error" || view.status === "no_answer") &&
      view.points.length)
  )
    throw Error("unit-feedback-state-binding");
  if (
    result.source === "real_provider" &&
    (!result.receipt.responseId || !result.receipt.receiptHash)
  )
    throw Error("unit-feedback-receipt-required");
  if (
    result.pointReviews &&
    (new Set(result.pointReviews.map((p) => p.criterionId)).size !==
      result.pointReviews.length ||
      result.pointReviews.some(
        (p) => !view.points.some((v) => v.id === p.criterionId),
      ))
  )
    throw Error("unit-feedback-review-binding");
  if (result.sourceTeacher)
    checkTeacherSourceEvidence(result.sourceTeacher, result.view);
  return result;
}

export function validateUnitFeedbackReply(
  raw: unknown,
  binding: {
    questionId: string;
    questionRevision: string;
    originalText: string;
    contentId: string;
  },
): UnitFeedbackReply {
  const reply = z
    .object({
      result: unitFeedbackResultSchema.nullable(),
      canSubmit: z.boolean(),
      message: text,
      availability: z.enum([
        "lookup_only",
        "unsupported",
        "changed",
        "paused",
        "ready",
        "busy",
        "failed",
      ]),
      submissionMode: z
        .enum(["closed", "synthetic_test", "real_trial", "direct"])
        .optional(),
      trial: unitTrialAvailabilitySchema.optional(),
    })
    .strict()
    .parse(raw);
  if (
    reply.canSubmit &&
    (reply.availability !== "ready" ||
      !["synthetic_test", "real_trial", "direct"].includes(
        reply.submissionMode ?? "",
      ) ||
      reply.result)
  )
    throw Error("unit-feedback-submit-gate-binding");
  if (reply.submissionMode === "direct" && reply.trial)
    throw Error("unit-direct-service-no-trial-display");
  if (
    reply.submissionMode === "real_trial" &&
    (!reply.trial ||
      reply.trial.state !== "active" ||
      reply.trial.remainingCalls < 1)
  )
    throw Error("unit-real-trial-gate-binding");
  if (
    reply.trial?.canActivate &&
    (reply.trial.state !== "awaiting_activation" || !reply.trial.grantId)
  )
    throw Error("unit-activation-gate-binding");
  return {
    ...reply,
    result: reply.result
      ? validateUnitFeedbackResult(reply.result, binding)
      : null,
  };
}
