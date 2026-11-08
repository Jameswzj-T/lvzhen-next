import { z } from "zod";

export const TEACHER_SOURCE_DECISION_PROTOCOL =
  "teacher-source-id-feedback-20261009.v3.3-point-decision";
const key = z.string().min(1).max(160);
const prose = z.string().min(1).max(1800);
const quote = z.string().min(1).max(800);
const teaching = { reason: prose, action: z.string().max(1000) };
export const teacherPointDecisionSchema = z.discriminatedUnion("stance", [
  z
    .object({
      stance: z.literal("adopted"),
      claim: prose,
      quotes: z.array(quote).min(1).max(3),
      assessment: z.enum([
        "supported_complete",
        "supported_partial",
        "opposed",
      ]),
      ...teaching,
    })
    .strict(),
  z
    .object({
      stance: z.literal("unresolved"),
      alternatives: z
        .array(z.object({ claim: prose, quote }).strict())
        .min(2)
        .max(3),
      ...teaching,
    })
    .strict(),
  z
    .object({
      stance: z.literal("unclear_expression"),
      quotes: z.array(quote).min(1).max(3),
      ...teaching,
    })
    .strict(),
  z.object({ stance: z.literal("not_stated"), ...teaching }).strict(),
  z
    .object({
      stance: z.literal("insufficient_facts"),
      missingFact: prose,
      quotes: z.array(quote).max(3),
      ...teaching,
    })
    .strict(),
]);
export const teacherPointDecisionReplySchema = z
  .object({
    points: z
      .array(
        z
          .object({
            id: key,
            basis: z.object({ sourceId: key }).strict(),
            decision: teacherPointDecisionSchema,
          })
          .strict(),
      )
      .min(1)
      .max(8),
  })
  .strict();
export type TeacherPointDecisionReply = z.infer<
  typeof teacherPointDecisionReplySchema
>;

/** Versioned candidate scope, not permission. The conclusion point is defined
 * by the question, not chosen a second time by the model. */
export function pointDecisionConclusionId(binding: {
  questionId: string;
  questionRevision: string;
  contentId: string;
}) {
  if (
    binding.questionId !== "civil-tort-mall-slip" ||
    binding.questionRevision !== "civil-tort-personal-2026-10-09.v1" ||
    binding.contentId !==
      "9db84fe0c57373b3f4a91824af387699d732bc738d235a64cbc6714bed974c58"
  )
    throw Error("teacher-point-decision-candidate-scope");
  return "mall-victim-fault";
}

/** Mechanical projections of ONE model decision. These checks cannot detect a
 * semantically wrong stance/claim; preserve raw decisions and independently test. */
export function projectTeacherPointDecisions(
  raw: unknown,
  conclusionPointId: string,
) {
  const reply = teacherPointDecisionReplySchema.parse(raw);
  if (new Set(reply.points.map((p) => p.id)).size !== reply.points.length)
    throw Error("teacher-point-decision-duplicate");
  const points = reply.points.map((p) => {
    const d = p.decision;
    const statusCode =
      d.stance === "adopted"
        ? d.assessment === "supported_complete"
          ? 0
          : d.assessment === "supported_partial"
            ? 1
            : 3
        : d.stance === "not_stated"
          ? 2
          : 4;
    if (statusCode === 0 && d.action !== "")
      throw Error("teacher-point-decision-covered-action");
    const quotes =
      d.stance === "not_stated"
        ? []
        : d.stance === "unresolved"
          ? [...new Set(d.alternatives.map((a) => a.quote))]
          : d.quotes;
    const role =
      statusCode === 0 || statusCode === 1
        ? ("supports" as const)
        : statusCode === 3
          ? ("opposes" as const)
          : ("context" as const);
    return {
      id: p.id,
      statusCode,
      evidence: quotes.map((quote) => ({ quote, role })),
      explanation: d.reason,
      action: d.action,
      basis: p.basis,
    };
  });
  const selected = points.find((p) => p.id === conclusionPointId);
  if (!selected) throw Error("teacher-point-decision-conclusion-scope");
  const state =
    selected.statusCode === 0 || selected.statusCode === 1
      ? ("supported" as const)
      : selected.statusCode === 3
        ? ("opposed" as const)
        : selected.statusCode === 2
          ? ("not_stated" as const)
          : ("uncertain" as const);
  return {
    conclusion: { state, quotes: selected.evidence.map((e) => e.quote) },
    points,
  };
}
