import { z } from "zod";
import {
  teacherPointDecisionSchema,
  projectTeacherPointDecisions,
} from "./teacher-point-decision";

export const TEACHER_SOURCE_REASONING_PROTOCOL =
  "teacher-source-id-feedback-20261009.v3.4-point-reasoning";
export const TEACHER_SOURCE_AUDIENCE_PROTOCOL =
  "teacher-source-id-feedback-20261009.v3.5-student-audience";
export const TEACHER_SOURCE_PROPORTIONATE_PROTOCOL =
  "teacher-source-id-feedback-20261009.v3.6-proportionate-teaching";
export const TEACHER_SOURCE_EVIDENCE_LANGUAGE_PROTOCOL =
  "teacher-source-id-feedback-20261009.v3.6.1-evidence-language";
const quote = z.string().min(1).max(800);
const prose = z.string().min(1).max(1800);
const reasonEvidence = z.discriminatedUnion("state", [
  z
    .object({
      state: z.literal("complete"),
      quotes: z.array(quote).min(1).max(2),
    })
    .strict(),
  z
    .object({ state: z.literal("incomplete"), quotes: z.array(quote).max(2) })
    .strict(),
  z
    .object({
      state: z.literal("incorrect"),
      quotes: z.array(quote).min(1).max(2),
    })
    .strict(),
  z
    .object({ state: z.literal("uncertain"), quotes: z.array(quote).max(2) })
    .strict(),
]);

/** One extracted stance. Claim validity and required reasoning are different
 * dimensions of that same answer, not independently generated final stances. */
export const teacherPointReasoningDecisionSchema = z.discriminatedUnion(
  "stance",
  [
    z
      .object({
        stance: z.literal("adopted"),
        claim: prose,
        quotes: z.array(quote).min(1).max(2),
        claimAssessment: z.enum(["supported", "opposed"]),
        reasoning: reasonEvidence,
        reason: prose,
        action: z.string().max(1000),
      })
      .strict(),
    teacherPointDecisionSchema.options[1],
    teacherPointDecisionSchema.options[2],
    teacherPointDecisionSchema.options[3],
    teacherPointDecisionSchema.options[4],
  ],
);
export const teacherPointReasoningReplySchema = z
  .object({
    points: z
      .array(
        z
          .object({
            id: z.string().min(1).max(160),
            basis: z.object({ sourceId: z.string().min(1).max(160) }).strict(),
            decision: teacherPointReasoningDecisionSchema,
          })
          .strict(),
      )
      .min(1)
      .max(8),
  })
  .strict();
export type TeacherPointReasoningReply = z.infer<
  typeof teacherPointReasoningReplySchema
>;

/** Opposite roles over overlapping spans are a provenance limitation. This
 * mechanical note neither fixes the model's reading nor changes any verdict. */
export function teacherPointQuoteScopeNotes(raw: unknown) {
  const reply = teacherPointReasoningReplySchema.parse(raw);
  return reply.points.flatMap((p) => {
    const d = p.decision;
    if (d.stance !== "adopted") return [];
    const opposite =
      (d.claimAssessment === "supported" &&
        d.reasoning.state === "incorrect") ||
      (d.claimAssessment === "opposed" &&
        ["complete", "incomplete"].includes(d.reasoning.state));
    if (!opposite) return [];
    return d.quotes.flatMap((claimQuote) =>
      d.reasoning.quotes
        .filter(
          (reasoningQuote) =>
            claimQuote.includes(reasoningQuote) ||
            reasoningQuote.includes(claimQuote),
        )
        .map((reasoningQuote) => ({
          source: "local_quote_scope_check" as const,
          criterionId: p.id,
          claimQuote,
          reasoningQuote,
        })),
    );
  });
}

/** Pure projections and quote-role attribution. This does not determine
 * whether the model actually read the student's conclusion/reasons correctly. */
export function projectTeacherPointReasoning(
  raw: unknown,
  conclusionPointId: string,
) {
  const reply = teacherPointReasoningReplySchema.parse(raw);
  if (new Set(reply.points.map((p) => p.id)).size !== reply.points.length)
    throw Error("teacher-point-reasoning-duplicate");
  const points = reply.points.map((p) => {
    const d = p.decision;
    if (d.stance !== "adopted")
      return projectTeacherPointDecisions({ points: [p] }, p.id).points[0];
    const statusCode =
      d.claimAssessment === "opposed" || d.reasoning.state === "incorrect"
        ? 3
        : d.reasoning.state === "uncertain"
          ? 4
          : d.reasoning.state === "incomplete"
            ? 1
            : 0;
    if (statusCode === 0 && d.action !== "")
      throw Error("teacher-point-reasoning-covered-action");
    const claimRole =
      d.claimAssessment === "supported"
        ? ("supports" as const)
        : ("opposes" as const);
    const reasonRole =
      d.reasoning.state === "incorrect"
        ? ("opposes" as const)
        : d.reasoning.state === "uncertain"
          ? ("context" as const)
          : ("supports" as const);
    const all = [
      ...d.quotes.map((quote) => ({ quote, role: claimRole })),
      ...d.reasoning.quotes.map((quote) => ({ quote, role: reasonRole })),
    ];
    const evidence = all.filter(
      (e, i) =>
        all.findIndex((x) => x.quote === e.quote && x.role === e.role) === i,
    );
    return {
      id: p.id,
      statusCode,
      evidence,
      explanation: d.reason,
      action: d.action,
      basis: p.basis,
    };
  });
  const selected = reply.points.find((p) => p.id === conclusionPointId);
  if (!selected) throw Error("teacher-point-reasoning-conclusion-scope");
  const d = selected.decision;
  const conclusion =
    d.stance === "adopted"
      ? { state: d.claimAssessment, quotes: d.quotes }
      : projectTeacherPointDecisions({ points: [selected] }, conclusionPointId)
          .conclusion;
  return { conclusion, points };
}
