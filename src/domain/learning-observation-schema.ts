import { z } from "zod";
import { teacherPriorityLearningHolds } from "./teacher-source-feedback-contract";
import {
  validateUnitFeedbackResult,
  type UnitFeedbackResult,
} from "../evaluation/unit-feedback-contract";

export const nativeFeedbackStatusSchema = z.enum([
  "covered",
  "partial",
  "missing",
  "contradicted",
  "uncertain",
]);
export type NativeFeedbackStatus = z.infer<typeof nativeFeedbackStatusSchema>;

/** Compatibility fields carry no score; native meanings remain independent. */
export function compatibleFeedbackStatus(
  status: NativeFeedbackStatus,
  source: "real_provider" | "offline_test",
  needsReview = false,
) {
  return needsReview || source !== "real_provider" || status === "uncertain"
    ? ("needs_review" as const)
    : status === "covered"
      ? ("model_yes" as const)
      : ("model_no" as const);
}

export function nativeFeedbackReviewNote(
  source: "real_provider" | "offline_test",
  note: string,
) {
  return source === "offline_test"
    ? `离线合成审校注记（非模型回执）：${note}`
    : `Codex独立审校补充（原模型未自行修正）：${note}`;
}

const unitResultSchema = z.custom<UnitFeedbackResult>((raw) => {
  try {
    validateUnitFeedbackResult(raw);
    return true;
  } catch {
    return false;
  }
});

// A separate observation of a model reply, never a replacement for an answer.
export const learningObservationSchema = z
  .object({
    id: z.string().min(1).max(250),
    attemptId: z.string().min(1).max(120),
    questionId: z.string().min(1).max(120),
    revision: z.string().min(1).max(120),
    answer: z.string().max(8000),
    protocol: z.enum(["short-table-v1", "table-trial-v1", "unit-feedback-v1"]),
    resultId: z.string().regex(/^[a-f0-9]{64}$/),
    identity: z.string().regex(/^[a-f0-9]{64}$/),
    resultCreatedAt: z.iso.datetime(),
    observedAt: z.iso.datetime(),
    source: z.enum(["real_provider", "offline_test"]),
    state: z.enum(["reviewed", "unavailable"]),
    failure: z.string().max(200).nullable(),
    originRunId: z.string().min(1).max(120).optional(),
    points: z
      .array(
        z.object({
          id: z.string().min(1).max(80),
          requirement: z.string().max(4000),
          explanation: z.string().max(4000),
          quotes: z.array(z.string().max(5000)).max(8),
          claimedQuotes: z.array(z.string().max(5000)).max(8),
          label: z.enum(["是", "否", "待核对"]),
          status: z.enum(["model_yes", "model_no", "needs_review"]),
          reviewNote: z.string().max(4000).optional(),
          nativeStatus: nativeFeedbackStatusSchema.optional(),
          meaning: z.string().max(4000).optional(),
          acceptable: z.string().max(4000).optional(),
          boundary: z.string().max(4000).optional(),
        }),
      )
      .max(8),
    // Preserve the original task/event and receipt when another event reuses it.
    // Legacy observations acquire no defaults or additional fields.
    unitResult: unitResultSchema.optional(),
  })
  .superRefine((row, ctx) => {
    if (row.protocol !== "unit-feedback-v1") return;
    const result = row.unitResult;
    const view = result?.view;
    const teacherHolds =
      result?.sourceTeacher && view
        ? teacherPriorityLearningHolds(result.sourceTeacher, view)
        : new Map<string, string>();
    if (
      !result ||
      !view ||
      row.resultId !== result.id ||
      row.identity !== view.contentId ||
      row.resultCreatedAt !== result.createdAt ||
      row.source !== result.source ||
      row.questionId !== view.questionId ||
      row.revision !== view.questionRevision ||
      row.answer !== view.originalText ||
      row.state !== (view.status === "assessed" ? "reviewed" : "unavailable") ||
      row.failure !== (view.status === "assessed" ? null : view.status) ||
      row.points.length !== view.points.length ||
      row.points.some((point, index) => {
        const original = view.points[index];
        const review = result.pointReviews?.find(
          (r) => r.criterionId === original.id,
        );
        const status = compatibleFeedbackStatus(
          original.status,
          result.source,
          review?.state === "needs_review" || teacherHolds.has(original.id),
        );
        return (
          point.id !== original.id ||
          point.requirement !== original.label ||
          point.meaning !== original.meaning ||
          point.acceptable !== original.acceptable ||
          point.boundary !== original.boundary ||
          point.nativeStatus !== original.status ||
          point.status !== status ||
          point.label !==
            (status === "model_yes"
              ? "是"
              : status === "model_no"
                ? "否"
                : "待核对") ||
          point.explanation !== original.explanation ||
          point.reviewNote !==
            (teacherHolds.get(original.id) ??
              (review
                ? nativeFeedbackReviewNote(result.source, review.note)
                : undefined)) ||
          JSON.stringify(point.quotes) !== JSON.stringify(original.quotes) ||
          JSON.stringify(point.claimedQuotes) !==
            JSON.stringify(original.quotes)
        );
      })
    )
      ctx.addIssue({
        code: "custom",
        message: "Native feedback does not match its immutable result",
      });
  });
export type LearningObservation = z.infer<typeof learningObservationSchema>;
