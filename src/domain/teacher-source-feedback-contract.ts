import {
  TEACHER_SOURCE_REASONING_PROTOCOL,
  TEACHER_SOURCE_AUDIENCE_PROTOCOL,
  TEACHER_SOURCE_PROPORTIONATE_PROTOCOL,
  TEACHER_SOURCE_EVIDENCE_LANGUAGE_PROTOCOL,
  teacherPointReasoningReplySchema,
  projectTeacherPointReasoning,
} from "./teacher-point-reasoning";
export {
  TEACHER_SOURCE_REASONING_PROTOCOL,
  TEACHER_SOURCE_AUDIENCE_PROTOCOL,
  TEACHER_SOURCE_PROPORTIONATE_PROTOCOL,
  TEACHER_SOURCE_EVIDENCE_LANGUAGE_PROTOCOL,
} from "./teacher-point-reasoning";
import {
  TEACHER_SOURCE_DECISION_PROTOCOL,
  teacherPointDecisionReplySchema,
  projectTeacherPointDecisions,
  pointDecisionConclusionId,
} from "./teacher-point-decision";
export { TEACHER_SOURCE_DECISION_PROTOCOL } from "./teacher-point-decision";
import { z } from "zod";
import { teacherModelReplySchema } from "./teacher-model-feedback-contract";
import { unitFeedbackBinding } from "../evaluation/unit-feedback-catalog";
import type { UnitFeedbackView } from "../evaluation/unit-feedback";

export const TEACHER_SOURCE_PROTOCOL =
  "teacher-source-id-feedback-20261008.v2.1";
export const TEACHER_SOURCE_CODE_PROTOCOL =
  "teacher-source-id-feedback-20261008.v2.2-codes";
export const TEACHER_SOURCE_STRICT_PROTOCOL =
  "teacher-source-id-feedback-20261008.v2.3-strict-tool";
export const TEACHER_SOURCE_PRIORITY_PROTOCOL =
  "teacher-source-id-feedback-20261008.v2.4-priority";
export const TEACHER_SOURCE_DIALOGUE_PROTOCOL =
  "teacher-source-id-feedback-20261008.v2.5-dialogue";
export const TEACHER_SOURCE_DIALOGUE_JSON_PROTOCOL =
  "teacher-source-id-feedback-20261008.v2.6-dialogue-json";
export const TEACHER_SOURCE_SINGLE_DECISION_PROTOCOL =
  "teacher-source-id-feedback-20261009.v2.7-single-decision";
export const TEACHER_SOURCE_PLAIN_PROTOCOL =
  "teacher-source-id-feedback-20261009.v2.8-plain";
export const TEACHER_SOURCE_TEACHING_PROTOCOL =
  "teacher-source-id-feedback-20261009.v2.9-teaching";
export const TEACHER_SOURCE_POINT_PROTOCOL =
  "teacher-source-id-feedback-20261009.v3.0-points";
export const TEACHER_SOURCE_DIRECT_LANGUAGE_PROTOCOL =
  "teacher-source-id-feedback-20261009.v3.1-direct-language";
export const TEACHER_SOURCE_FOCUSED_PROTOCOL =
  "teacher-source-id-feedback-20261009.v3.2-focused";
export const isPointTeacherProtocol = (v: string | undefined) =>
  v === TEACHER_SOURCE_POINT_PROTOCOL ||
  v === TEACHER_SOURCE_DIRECT_LANGUAGE_PROTOCOL ||
  v === TEACHER_SOURCE_FOCUSED_PROTOCOL ||
  v === TEACHER_SOURCE_DECISION_PROTOCOL ||
  v === TEACHER_SOURCE_REASONING_PROTOCOL ||
  v === TEACHER_SOURCE_AUDIENCE_PROTOCOL ||
  v === TEACHER_SOURCE_PROPORTIONATE_PROTOCOL ||
  v === TEACHER_SOURCE_EVIDENCE_LANGUAGE_PROTOCOL;
export const isSingleDecisionTeacherProtocol = (v: string | undefined) =>
  v === TEACHER_SOURCE_SINGLE_DECISION_PROTOCOL ||
  v === TEACHER_SOURCE_PLAIN_PROTOCOL ||
  v === TEACHER_SOURCE_TEACHING_PROTOCOL ||
  isPointTeacherProtocol(v);
export function isPriorityTeacherProtocol(version: string | undefined) {
  return (
    version === TEACHER_SOURCE_PRIORITY_PROTOCOL ||
    version === TEACHER_SOURCE_DIALOGUE_PROTOCOL ||
    version === TEACHER_SOURCE_DIALOGUE_JSON_PROTOCOL ||
    isSingleDecisionTeacherProtocol(version)
  );
}
export function isStrictTeacherProtocol(
  version: string,
): version is
  | typeof TEACHER_SOURCE_STRICT_PROTOCOL
  | typeof TEACHER_SOURCE_PRIORITY_PROTOCOL
  | typeof TEACHER_SOURCE_DIALOGUE_PROTOCOL {
  return (
    version === TEACHER_SOURCE_STRICT_PROTOCOL ||
    version === TEACHER_SOURCE_PRIORITY_PROTOCOL ||
    version === TEACHER_SOURCE_DIALOGUE_PROTOCOL
  );
}
export const teacherSourceStatusCodes = [
  "covered",
  "partial",
  "missing",
  "contradicted",
  "uncertain",
] as const;
/** Mechanical completeness projection for the new wire, never a semantic
 * replacement for model-authored conclusion/point judgments or explanation. */
export function teacherTeachingOverallKind(
  conclusion: "supported" | "opposed" | "not_stated" | "uncertain",
  statuses: readonly (typeof teacherSourceStatusCodes)[number][],
): "correct" | "partial" | "incorrect" | "needs_review" {
  if (conclusion === "uncertain" || statuses.includes("uncertain"))
    return "needs_review";
  if (conclusion === "supported" && statuses.every((s) => s === "covered"))
    return "correct";
  if (
    conclusion === "supported" ||
    statuses.some((s) => s === "covered" || s === "partial")
  )
    return "partial";
  return "incorrect";
}
const statusCode = z.number().int().min(0).max(4);
const key = z.string().min(1).max(160);
const hash = z.string().regex(/^[a-f0-9]{64}$/);
const shape = teacherModelReplySchema.shape;
const point = shape.points.element.omit({ basis: true }).extend({
  basis: z.object({ sourceId: key }).strict(),
});
export const teacherSourceReplySchema = z
  .object({
    version: z.literal(TEACHER_SOURCE_PROTOCOL),
    taskId: hash,
    overall: shape.overall,
    conclusion: shape.conclusion.describe(
      "supported是本问最终结论符合题目要求与给定事实，opposed是最终结论与之相反；不是表示赞同或反对题干中的某一句话。not_stated是未表达，uncertain是尚不能确定。",
    ),
    points: z.array(point).min(1).max(8),
  })
  .strict();
/** Numeric wire values avoid generating English status spellings. They are an
 * explicit new contract, not aliases or repair of any previously failed reply. */
export const teacherSourceCodeReplySchema = teacherSourceReplySchema
  .omit({ version: true, points: true })
  .extend({
    version: z.literal(TEACHER_SOURCE_CODE_PROTOCOL),
    points: z
      .array(point.omit({ status: true }).extend({ statusCode }))
      .min(1)
      .max(8),
  })
  .strict();
const legacyEvidenceSchema = teacherSourceReplySchema
  .omit({ taskId: true })
  .extend({
    candidateTaskId: hash,
    binding: z
      .object({
        nativeTaskId: hash,
        contentId: hash,
        questionId: key,
        questionRevision: key,
        answerId: key,
        registrationVersion: key,
        instructionsSha256: hash,
        referenceFingerprint: hash,
        sourceMetadataFingerprint: hash,
      })
      .strict(),
  })
  .strict();
// New version has no generated overall/conclusion prose. Empty strings are
// explicit absence in its canonical shape, never a fabricated model explanation.
export const teacherSourcePointCanonicalReplySchema = teacherSourceReplySchema
  .extend({
    overall: shape.overall.extend({ reason: z.literal("") }).strict(),
    conclusion: shape.conclusion
      .extend({ explanation: z.literal("") })
      .strict(),
  })
  .strict();
export const teacherSourceEvidenceSchema = z.union([
  legacyEvidenceSchema
    .extend({
      version: z.enum([
        TEACHER_SOURCE_REASONING_PROTOCOL,
        TEACHER_SOURCE_AUDIENCE_PROTOCOL,
        TEACHER_SOURCE_PROPORTIONATE_PROTOCOL,
        TEACHER_SOURCE_EVIDENCE_LANGUAGE_PROTOCOL,
      ]),
      overall: shape.overall.extend({ reason: z.literal("") }).strict(),
      conclusion: shape.conclusion
        .extend({ explanation: z.literal("") })
        .strict(),
      wireStatusCodes: z
        .array(z.object({ id: key, statusCode }).strict())
        .min(1)
        .max(8),
      conclusionPointId: key,
      pointDecisions: teacherPointReasoningReplySchema.shape.points,
    })
    .strict(),
  legacyEvidenceSchema
    .extend({
      version: z.literal(TEACHER_SOURCE_DECISION_PROTOCOL),
      overall: shape.overall.extend({ reason: z.literal("") }).strict(),
      conclusion: shape.conclusion
        .extend({ explanation: z.literal("") })
        .strict(),
      wireStatusCodes: z
        .array(z.object({ id: key, statusCode }).strict())
        .min(1)
        .max(8),
      conclusionPointId: key,
      pointDecisions: teacherPointDecisionReplySchema.shape.points,
    })
    .strict(),
  legacyEvidenceSchema
    .extend({
      version: z.enum([
        TEACHER_SOURCE_POINT_PROTOCOL,
        TEACHER_SOURCE_DIRECT_LANGUAGE_PROTOCOL,
        TEACHER_SOURCE_FOCUSED_PROTOCOL,
      ]),
      overall: shape.overall.extend({ reason: z.literal("") }).strict(),
      conclusion: shape.conclusion
        .extend({ explanation: z.literal("") })
        .strict(),
      wireStatusCodes: z
        .array(z.object({ id: key, statusCode }).strict())
        .min(1)
        .max(8),
    })
    .strict(),
  legacyEvidenceSchema,
  legacyEvidenceSchema
    .omit({ version: true })
    .extend({
      version: z.enum([
        TEACHER_SOURCE_CODE_PROTOCOL,
        TEACHER_SOURCE_STRICT_PROTOCOL,
        TEACHER_SOURCE_PRIORITY_PROTOCOL,
        TEACHER_SOURCE_DIALOGUE_PROTOCOL,
        TEACHER_SOURCE_DIALOGUE_JSON_PROTOCOL,
        TEACHER_SOURCE_SINGLE_DECISION_PROTOCOL,
        TEACHER_SOURCE_PLAIN_PROTOCOL,
        TEACHER_SOURCE_TEACHING_PROTOCOL,
      ]),
      wireStatusCodes: z
        .array(z.object({ id: key, statusCode }).strict())
        .min(1)
        .max(8),
    })
    .strict(),
]);
export type TeacherSourceReply = z.infer<typeof teacherSourceReplySchema>;
export type TeacherSourceEvidence = z.infer<typeof teacherSourceEvidenceSchema>;

/** Learning actions may use clear feedback; a format-bound receipt can still
 * require review. This does not rewrite its labels or establish semantic truth. */
export function teacherSourceNeedsReview(raw: unknown, view: UnitFeedbackView) {
  const checked = checkTeacherSourceEvidence(raw, view);
  return (
    checked.overallHold ||
    checked.holds.length > 0 ||
    checked.evidence.overall.kind === "needs_review"
  );
}

/** Current public material is trusted separately from the model. Source IDs and
 * continuous student quotes establish mechanical binding, never semantic truth.
 * No answer wording, question-specific aliases, or receipt exceptions here. */
export function checkTeacherSourceEvidence(
  raw: unknown,
  view: UnitFeedbackView,
) {
  const evidence = teacherSourceEvidenceSchema.parse(raw);
  if (
    evidence.version === TEACHER_SOURCE_DECISION_PROTOCOL ||
    evidence.version === TEACHER_SOURCE_REASONING_PROTOCOL ||
    evidence.version === TEACHER_SOURCE_AUDIENCE_PROTOCOL ||
    evidence.version === TEACHER_SOURCE_PROPORTIONATE_PROTOCOL ||
    evidence.version === TEACHER_SOURCE_EVIDENCE_LANGUAGE_PROTOCOL
  ) {
    const conclusionId = pointDecisionConclusionId(evidence.binding);
    if (conclusionId !== evidence.conclusionPointId)
      throw Error("teacher-point-decision-conclusion-binding");
    const projected =
      evidence.version === TEACHER_SOURCE_REASONING_PROTOCOL ||
      evidence.version === TEACHER_SOURCE_AUDIENCE_PROTOCOL ||
      evidence.version === TEACHER_SOURCE_PROPORTIONATE_PROTOCOL ||
      evidence.version === TEACHER_SOURCE_EVIDENCE_LANGUAGE_PROTOCOL
        ? projectTeacherPointReasoning(
            { points: evidence.pointDecisions },
            conclusionId,
          )
        : projectTeacherPointDecisions(
            { points: evidence.pointDecisions },
            conclusionId,
          );
    if (
      JSON.stringify({ ...projected.conclusion, explanation: "" }) !==
        JSON.stringify(evidence.conclusion) ||
      projected.points.length !== evidence.points.length ||
      projected.points.some((p, i) => {
        const e = evidence.points[i];
        return (
          p.id !== e.id ||
          teacherSourceStatusCodes[p.statusCode] !== e.status ||
          p.explanation !== e.explanation ||
          (p.action || null) !== e.action ||
          JSON.stringify(p.evidence) !== JSON.stringify(e.evidence) ||
          p.basis.sourceId !== e.basis.sourceId
        );
      })
    )
      throw Error("teacher-point-decision-projection-binding");
  }
  if (
    (evidence.version === TEACHER_SOURCE_TEACHING_PROTOCOL ||
      isPointTeacherProtocol(evidence.version)) &&
    (evidence.overall.kind !==
      teacherTeachingOverallKind(
        evidence.conclusion.state,
        evidence.points.map((p) => p.status),
      ) ||
      evidence.conclusion.explanation !== evidence.overall.reason)
  )
    throw Error("teacher-teaching-summary-projection-binding");
  // New wire makes one model-authored decision per point. Canonical review is
  // only its projection; it cannot be independently changed after receiving it.
  // Older versions retain their original two-field contract and saved bytes.
  if (
    isSingleDecisionTeacherProtocol(evidence.version) &&
    evidence.points.some((p) =>
      p.status === "uncertain"
        ? p.review.state !== "needs_review" || p.review.reason !== p.explanation
        : p.review.state !== "clear" || p.review.reason !== null,
    )
  )
    throw Error("teacher-single-decision-review-projection-binding");
  if (evidence.version !== TEACHER_SOURCE_PROTOCOL) {
    const codes = new Map(
      evidence.wireStatusCodes.map((p) => [p.id, p.statusCode]),
    );
    if (
      codes.size !== evidence.points.length ||
      evidence.wireStatusCodes.length !== evidence.points.length ||
      evidence.points.some(
        (p) =>
          codes.get(p.id) === undefined ||
          teacherSourceStatusCodes[codes.get(p.id)!] !== p.status,
      )
    )
      throw Error("teacher-source-code-projection-binding");
  }
  const b = evidence.binding;
  const current = unitFeedbackBinding(b.questionId);
  if (
    !current ||
    b.nativeTaskId !== view.taskId ||
    b.contentId !== view.contentId ||
    b.contentId !== current.contentId ||
    b.questionId !== view.questionId ||
    b.questionRevision !== view.questionRevision ||
    b.questionRevision !== current.questionRevision ||
    b.answerId !== view.answerId ||
    b.registrationVersion !== current.registrationVersion ||
    b.instructionsSha256 !== current.instructionsSha256 ||
    b.referenceFingerprint !== current.referenceFingerprint ||
    b.sourceMetadataFingerprint !== current.sourceMetadataFingerprint ||
    view.title !== current.title ||
    view.facts !== current.facts ||
    view.prompt !== current.prompt ||
    view.weightedScore ||
    ["system_error", "no_answer"].includes(view.status) ||
    view.points.length !== current.criteria.length ||
    evidence.points.length !== current.criteria.length
  )
    throw Error("teacher-source-current-material-binding");
  const holds: { criterionId: string; note: string }[] = [];
  const joined = [];
  const seen = new Set<string>();
  for (const p of evidence.points) {
    const criterion = current.criteria.find((c) => c.id === p.id);
    const native = view.points.find((c) => c.id === p.id);
    const source = current.publicRules.find(
      (r) => r.sourceId === p.basis.sourceId,
    );
    if (
      !criterion ||
      !native ||
      !source ||
      seen.has(p.id) ||
      native.criterionId !== p.id ||
      native.label !== criterion.label ||
      native.meaning !== criterion.meaning ||
      native.acceptable !== criterion.acceptable ||
      native.boundary !== criterion.boundary ||
      p.status !== native.status ||
      p.explanation !== native.explanation ||
      JSON.stringify(p.evidence.map((e) => e.quote)) !==
        JSON.stringify(native.quotes) ||
      p.evidence.some((e) => !view.originalText.includes(e.quote)) ||
      (["covered", "partial", "contradicted"].includes(p.status) &&
        !p.evidence.length) ||
      (p.review.state === "needs_review") !== (p.review.reason !== null)
    )
      throw Error("teacher-source-point-binding");
    seen.add(p.id);
    joined.push({
      criterionId: p.id,
      requirement: { ...criterion },
      source: { ...source },
      attribution: "system_linked_current_public_material" as const,
    });
    const explicitOpposition = p.evidence.some((e) => e.role === "opposes");
    const explicitSupport = p.evidence.some((e) => e.role === "supports");
    const priorityConflict =
      isPriorityTeacherProtocol(evidence.version) &&
      ((p.status === "partial" && (explicitOpposition || !explicitSupport)) ||
        (p.status === "missing" && (explicitSupport || explicitOpposition)));
    const conflict =
      (p.status === "covered" &&
        (!p.evidence.some((e) => e.role === "supports") ||
          p.evidence.some((e) => e.role === "opposes") ||
          p.action !== null)) ||
      (p.status === "contradicted" &&
        !p.evidence.some((e) => e.role === "opposes"));
    if (priorityConflict)
      holds.push({
        criterionId: p.id,
        note: "本版本要求明确说反的必答内容优先标为错误，部分表达须有正确片段且无明确反向立场；模型标签与所列证据作用不一致，先保留原反馈、本项待核。",
      });
    else if (conflict)
      holds.push({
        criterionId: p.id,
        note: "模型标签与其明确列出的证据作用或改法冲突，本项暂不采用；原文和标签保留。",
      });
    else if (p.review.state === "needs_review" || p.status === "uncertain")
      holds.push({
        criterionId: p.id,
        note: p.review.reason ?? "本项判断依据尚不确定，先核对原文和题目要求。",
      });
    else if (
      ["partial", "missing", "contradicted"].includes(p.status) &&
      !p.action
    )
      holds.push({
        criterionId: p.id,
        note: "模型指出了不足，但没有给出可核对的具体改法，本项改进反馈待核。",
      });
  }
  if (
    evidence.conclusion.quotes.some((q) => !view.originalText.includes(q)) ||
    (["supported", "opposed"].includes(evidence.conclusion.state) &&
      !evidence.conclusion.quotes.length)
  )
    throw Error("teacher-source-conclusion-binding");
  const knownIncomplete = evidence.points.some((p) =>
    ["partial", "missing", "contradicted"].includes(p.status),
  );
  const priorityOverallConflict =
    isPriorityTeacherProtocol(evidence.version) &&
    evidence.conclusion.state === "supported" &&
    evidence.overall.kind !== "needs_review" &&
    ((knownIncomplete && evidence.overall.kind !== "partial") ||
      (!knownIncomplete &&
        evidence.points.every((p) => p.status === "covered") &&
        evidence.overall.kind !== "correct"));
  const overallContractConflict =
    priorityOverallConflict ||
    (isSingleDecisionTeacherProtocol(evidence.version) &&
      (evidence.conclusion.state === "uncertain" ||
        evidence.points.some((p) => p.status === "uncertain")) &&
      evidence.overall.kind !== "needs_review") ||
    (evidence.overall.kind === "correct" &&
      (holds.length > 0 ||
        evidence.points.some((p) => p.status !== "covered") ||
        evidence.conclusion.state !== "supported"));
  const overallHold =
    (isPriorityTeacherProtocol(evidence.version) &&
      evidence.conclusion.state === "uncertain") ||
    overallContractConflict;
  return {
    evidence,
    joined,
    holds,
    overallHold,
    overallContractConflict,
    semanticValidity: "not_established" as const,
  };
}

/** New-version learning adoption only. Old saved observations keep their exact
 * interpretation; raw model labels and explanations are never rewritten. */
export function teacherPriorityLearningHolds(
  raw: unknown,
  view: UnitFeedbackView,
) {
  if (!isPriorityTeacherProtocol((raw as { version?: string } | null)?.version))
    return new Map<string, string>();
  const checked = checkTeacherSourceEvidence(raw, view);
  return new Map(
    checked.holds.map((h) => [
      h.criterionId,
      `系统契约核对（原模型未改写）：${h.note}`,
    ]),
  );
}
