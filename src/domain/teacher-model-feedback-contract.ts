import { z } from "zod";
import publicBindings from "../evaluation/unit-feedback-cl14-bindings.json";
import type { UnitFeedbackView } from "../evaluation/unit-feedback";
import {
  TEACHER_QUESTION_ID,
  TEACHER_QUESTION_REVISION,
  TEACHER_GUIDE_CONTENT_ID,
} from "./teacher-feedback-contract";

export const TEACHER_REQUIREMENT_READING_VERSION =
  "teacher-public-requirement-reading-20261007.v1.1";
export const TEACHER_MODEL_PROTOCOL =
  "teacher-flight-model-feedback-20261007.v1";
const text = z
  .string()
  .min(1)
  .max(1800)
  .refine((s) => !!s.trim());
const quote = z
  .string()
  .min(1)
  .max(800)
  .refine((s) => !!s.trim());
const hash = z.string().regex(/^[a-f0-9]{64}$/);
const state = z.enum([
  "covered",
  "partial",
  "missing",
  "contradicted",
  "uncertain",
]);
export const teacherModelReplySchema = z
  .object({
    version: z.literal(TEACHER_MODEL_PROTOCOL),
    taskId: hash,
    overall: z
      .object({
        kind: z.enum(["correct", "partial", "incorrect", "needs_review"]),
        reason: text,
      })
      .strict(),
    conclusion: z
      .object({
        state: z.enum(["supported", "opposed", "not_stated", "uncertain"]),
        quotes: z.array(quote).max(3),
        explanation: text,
      })
      .strict(),
    points: z
      .array(
        z
          .object({
            id: z.string().min(1).max(160),
            status: state,
            evidence: z
              .array(
                z
                  .object({
                    quote,
                    role: z.enum(["supports", "opposes", "context"]),
                  })
                  .strict(),
              )
              .max(4),
            explanation: text,
            action: text.nullable(),
            basis: z
              .object({
                requirementQuote: text,
                sourceId: z.string().min(1).max(160),
                sourceQuote: quote,
              })
              .strict(),
            review: z
              .object({
                state: z.enum(["clear", "needs_review"]),
                reason: text.nullable(),
              })
              .strict(),
          })
          .strict(),
      )
      .length(2),
  })
  .strict();

const replyShape = teacherModelReplySchema.shape;
export const teacherModelEvidenceSchema = z
  .object({
    version: replyShape.version,
    candidateTaskId: hash,
    readingRevision: z.literal(TEACHER_REQUIREMENT_READING_VERSION).optional(),
    binding: z
      .object({
        nativeTaskId: hash,
        contentId: z.literal(TEACHER_GUIDE_CONTENT_ID),
        questionId: z.literal(TEACHER_QUESTION_ID),
        questionRevision: z.literal(TEACHER_QUESTION_REVISION),
        answerId: z.string().min(1).max(160),
      })
      .strict(),
    overall: replyShape.overall,
    conclusion: replyShape.conclusion,
    points: replyShape.points,
  })
  .strict();
export type TeacherModelReply = z.infer<typeof teacherModelReplySchema>;
export type TeacherModelEvidence = z.infer<typeof teacherModelEvidenceSchema>;

/** Browser-safe mechanical checks. No explanation keyword classification or
 * semantic repair. Unmarked prose contradictions remain an explicit limit. */
export function checkTeacherModelEvidence(
  raw: unknown,
  view: UnitFeedbackView,
) {
  const evidence = teacherModelEvidenceSchema.parse(raw);
  const b = evidence.binding;
  if (
    b.nativeTaskId !== view.taskId ||
    b.contentId !== view.contentId ||
    b.questionId !== view.questionId ||
    b.questionRevision !== view.questionRevision ||
    b.answerId !== view.answerId ||
    view.points.length !== 2 ||
    view.weightedScore ||
    view.status === "system_error" ||
    view.status === "no_answer"
  )
    throw Error("teacher-model-original-binding");
  const question = publicBindings[TEACHER_QUESTION_ID];
  const holds: { criterionId: string; note: string }[] = [];
  const seen = new Set<string>();
  for (const point of evidence.points) {
    const criterion = question.criteria.find((c) => c.id === point.id);
    const native = view.points.find((p) => p.id === point.id);
    const rule = question.publicRules.find(
      (r) => r.sourceId === point.basis.sourceId,
    );
    if (
      !criterion ||
      !native ||
      !rule ||
      seen.has(point.id) ||
      (point.basis.requirementQuote !== criterion.meaning &&
        !(
          evidence.readingRevision === TEACHER_REQUIREMENT_READING_VERSION &&
          point.id === "cl14-flight-no-serious-result-p2" &&
          point.basis.requirementQuote ===
            "没有题设所要求的严重结果，不能据此肯定本条" &&
          criterion.boundary.includes(point.basis.requirementQuote)
        )) ||
      !rule.excerpt.includes(point.basis.sourceQuote) ||
      point.status !== native.status ||
      point.explanation !== native.explanation ||
      JSON.stringify(point.evidence.map((e) => e.quote)) !==
        JSON.stringify(native.quotes) ||
      point.evidence.some((e) => !view.originalText.includes(e.quote)) ||
      (point.review.state === "needs_review") !== (point.review.reason !== null)
    )
      throw Error("teacher-model-point-evidence-binding");
    seen.add(point.id);
    const explicitConflict =
      (point.status === "covered" &&
        (!point.evidence.some((e) => e.role === "supports") ||
          point.evidence.some((e) => e.role === "opposes") ||
          point.action !== null)) ||
      (point.status === "contradicted" &&
        !point.evidence.some((e) => e.role === "opposes"));
    if (explicitConflict)
      holds.push({
        criterionId: point.id,
        note: "模型标签与其明确列出的证据作用或改法冲突，本项暂不采用；原文和标签保留。",
      });
    else if (
      point.review.state === "needs_review" ||
      point.status === "uncertain"
    )
      holds.push({
        criterionId: point.id,
        note:
          point.review.reason ?? "本项判断依据尚不确定，先核对原文和题目要求。",
      });
    else if (
      ["partial", "missing", "contradicted"].includes(point.status) &&
      !point.action
    )
      holds.push({
        criterionId: point.id,
        note: "模型指出了不足，但没有给出可核对的具体改法，本项改进反馈待核。",
      });
  }
  if (
    evidence.conclusion.quotes.some((q) => !view.originalText.includes(q)) ||
    (["supported", "opposed"].includes(evidence.conclusion.state) &&
      !evidence.conclusion.quotes.length)
  )
    throw Error("teacher-model-conclusion-evidence-binding");
  const overallHold =
    evidence.overall.kind === "correct" &&
    (evidence.points.some((p) => p.status !== "covered") ||
      evidence.conclusion.state !== "supported");
  return {
    evidence,
    holds,
    overallHold,
    semanticValidity: "not_established" as const,
  };
}
