import { z } from "zod";
import { digest } from "../model-config";
import { wholeCaseRequest } from "../whole-case-table";
import { answerUnits } from "./protocol";
import { COMPONENT_DESIGN } from "./component-feedback";
import {
  COMPONENT_TRIAL_INSTRUCTION,
  type ComponentTrialResponse,
} from "./component-trial";
import type { RewriteCandidate } from "./contract";

export const SUPERVISED_VERSION = "component-feedback-personal-once-v1";
export const SUPERVISED_ID = "personal-once-20261001-1";
export const personalPairSchema = z
  .object({
    id: z.literal(SUPERVISED_ID),
    provenance: z.literal("new_personal_trial"),
    questionId: z.literal(COMPONENT_DESIGN.questionId),
    designVersion: z.literal(COMPONENT_DESIGN.version),
    original: z.string().min(1).max(5000),
    rewrite: z.string().min(1).max(5000),
  })
  .strict();
export type PersonalPair = z.infer<typeof personalPairSchema>;
export type EvidenceResponse = Pick<
  ComponentTrialResponse,
  "original" | "rewrite"
>;
const hash = z.string().regex(/^[a-f0-9]{64}$/);
const bindingSchema = z
  .object({
    version: z.literal(SUPERVISED_VERSION),
    trialId: z.literal(SUPERVISED_ID),
    provenance: z.literal("new_personal_trial"),
    questionId: z.literal(COMPONENT_DESIGN.questionId),
    designVersion: z.literal(COMPONENT_DESIGN.version),
    candidateIdentity: hash,
    designIdentity: hash,
    cardHash: hash,
    originalHash: hash,
    rewriteHash: hash,
  })
  .strict();
const evidence = z
  .object({ quote: z.string().min(1), meaning: z.string().min(1) })
  .strict();
const need = z
  .object({
    id: z.enum(["2-3-A", "2-3-B"]),
    state: z.enum(["located", "not_located", "conflicting", "needs_review"]),
    evidence: z.array(evidence).max(12),
    feedback: z.string().min(1),
  })
  .strict();
const side = z
  .object({
    reviewedUnitIds: z.array(z.string()).max(100),
    needs: z.array(need).length(2),
    conditionalExpressions: z.array(evidence).max(12),
  })
  .strict();
const responseSchema = z
  .object({ binding: bindingSchema, original: side, rewrite: side })
  .strict();
export function supervisedEnvelope(base: RewriteCandidate, raw: unknown) {
  const pair = personalPairSchema.parse(raw);
  if (
    [pair.original, pair.rewrite].some(
      (t) => !t.trim() || answerUnits(t).length > 100,
    )
  )
    throw Error("invalid-personal-answer");
  const binding = bindingSchema.parse({
    version: SUPERVISED_VERSION,
    trialId: pair.id,
    provenance: pair.provenance,
    questionId: pair.questionId,
    designVersion: pair.designVersion,
    candidateIdentity: base.identity,
    designIdentity: digest({
      design: COMPONENT_DESIGN,
      sourceIdentity: base.identity,
    }),
    cardHash: base.cardHash,
    originalHash: digest(pair.original),
    rewriteHash: digest(pair.rewrite),
  });
  return {
    binding,
    mode: "one_complete_question_context",
    question: {
      id: pair.questionId,
      revision: pair.designVersion,
      prompt: COMPONENT_DESIGN.prompt,
      facts: base.card.facts,
      criteria: base.card.criteria.map((c) =>
        c.id === "2-3"
          ? {
              ...c,
              title: "利益归属与组织性质",
              requirement: COMPONENT_DESIGN.requirement,
            }
          : c,
      ),
    },
    publicSources: base.publicSources,
    evidenceNeeds: COMPONENT_DESIGN.evidenceNeeds,
    caseBoundary: COMPONENT_DESIGN.caseBoundary,
    teachingOnly: COMPONENT_DESIGN.teachingOnly,
    original: { answer: pair.original, units: answerUnits(pair.original) },
    rewrite: { answer: pair.rewrite, units: answerUnits(pair.rewrite) },
  };
}
export function supervisedRequest(base: RewriteCandidate, pair: PersonalPair) {
  const { binding, original, rewrite, ...context } = supervisedEnvelope(
    base,
    pair,
  );
  return {
    ...wholeCaseRequest("", "off"),
    messages: [
      {
        role: "system" as const,
        content: COMPONENT_TRIAL_INSTRUCTION + "\n" + JSON.stringify(context),
      },
      {
        role: "user" as const,
        content: JSON.stringify({ binding, original, rewrite }),
      },
    ],
  };
}
export function assessSupervised(
  output: string,
  base: RewriteCandidate,
  pair: PersonalPair,
) {
  const envelope = supervisedEnvelope(base, pair),
    invariants = {
      automaticUseAllowed: false as const,
      scoring: "not_computed" as const,
      masteryWritten: false as const,
      semanticVerification: "not_verified_by_program" as const,
    };
  const reject = (reason: string) => ({
    ...invariants,
    structuralValid: false as const,
    reason,
    response: null,
  });
  let parsed: ReturnType<typeof responseSchema.safeParse>;
  try {
    parsed = responseSchema.safeParse(JSON.parse(output));
  } catch {
    return reject("invalid-json");
  }
  if (!parsed.success) return reject("invalid-schema");
  if (digest(parsed.data.binding) !== digest(envelope.binding))
    return reject("version-or-answer-binding-mismatch");
  for (const k of ["original", "rewrite"] as const) {
    const s = parsed.data[k],
      units = envelope[k].units;
    if (digest(s.reviewedUnitIds) !== digest(units.map((u) => u.id)))
      return reject("incomplete-context-audit");
    if (s.needs.map((n) => n.id).join() !== "2-3-A,2-3-B")
      return reject("need-coverage-mismatch");
    if (
      [...s.needs.flatMap((n) => n.evidence), ...s.conditionalExpressions].some(
        (e) => !units.some((u) => u.text === e.quote),
      )
    )
      return reject("quote-not-full-owned-sentence");
    if (
      s.needs.some(
        (n) =>
          ["located", "conflicting"].includes(n.state) && !n.evidence.length,
      )
    )
      return reject("claim-without-evidence");
    if (s.needs.some((n) => n.state === "not_located" && n.evidence.length))
      return reject("absence-with-located-evidence");
  }
  return {
    ...invariants,
    structuralValid: true as const,
    reason: "structure_only",
    response: parsed.data,
  };
}
