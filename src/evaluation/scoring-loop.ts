import { createHash } from "node:crypto";
import { z } from "zod";
import type { EvaluationInput } from "./index";
import { findingsSchema } from "./criterion-findings";
import { protocolForObservationPolicy } from "./semantic-observations";
import {
  prepareObservationAssessment,
  completeObservationAssessment,
  type ObservationPlan,
} from "./observation-assessment";

// Experimental, opt-in only. No business storage, provider, or publication path.
export const SCORING_LOOP_VERSION = "independent-full-points-v1";
export const CONCLUSION_SCORING_VERSION = "conclusion-dependent-points-v1";
const text = z.string().min(1);
export const scoreCardSchema = z
  .object({
    version: text,
    caseId: text,
    caseRevision: text,
    items: z
      .array(
        z
          .object({
            criterionId: text,
            title: text,
            points: z.number().int().positive().max(100),
            guidance: text,
            // Authored training rule, never sent to the model. One level only.
            requiresConclusion: text.optional(),
          })
          .strict(),
      )
      .min(1),
  })
  .strict();
export type ScoreCard = z.infer<typeof scoreCardSchema>;
const hash = (value: unknown) =>
  createHash("sha256").update(JSON.stringify(value)).digest("hex");
function freeze<T>(value: T): T {
  if (value && typeof value === "object") {
    for (const child of Object.values(value)) freeze(child);
    Object.freeze(value);
  }
  return value;
}

export function prepareScoringLoop(
  input: EvaluationInput,
  plan: ObservationPlan,
  rawCard: unknown,
  protocol:
    | "findings-v1"
    | "findings-v2"
    | "findings-v3"
    | "findings-label-first-v1" = "findings-v1",
) {
  const assessment = prepareObservationAssessment(input, plan, protocol);
  const card = scoreCardSchema.parse(rawCard);
  const ids = card.items.map((item) => item.criterionId);
  if (
    card.caseId !== assessment.original.caseId ||
    card.caseRevision !== assessment.original.caseRevision ||
    new Set(ids).size !== ids.length ||
    ids.length !== assessment.original.criteria.length ||
    assessment.original.criteria.some((item) => !ids.includes(item.id))
  )
    throw new Error("score-card-association-mismatch");
  const byId = new Map(card.items.map((item) => [item.criterionId, item]));
  for (const item of card.items) {
    if (!item.requiresConclusion) continue;
    const conclusion = byId.get(item.requiresConclusion);
    if (!conclusion || conclusion === item || conclusion.requiresConclusion)
      throw new Error("invalid-score-dependency");
  }
  const policy = card.items.some((item) => item.requiresConclusion)
    ? CONCLUSION_SCORING_VERSION
    : SCORING_LOOP_VERSION;
  const snapshot = { policy, assessment, card };
  return freeze({ scoringId: hash(snapshot), ...snapshot });
}
export type ScoringLoopTask = ReturnType<typeof prepareScoringLoop>;

/** Code proves accounting/association, not whether a model's semantic label is true. */
export function completeScoringLoop(task: ScoringLoopTask, rawReply: unknown) {
  const protocol = protocolForObservationPolicy(
    task.assessment.versions.pointPolicy,
  );
  if (
    protocol !== "findings-v1" &&
    protocol !== "findings-v2" &&
    protocol !== "findings-label-first-v1" &&
    protocol !== "findings-v3"
  )
    throw new Error("unsupported-scoring-protocol");
  const rebuilt = prepareScoringLoop(
    task.assessment.original,
    task.assessment.plan,
    task.card,
    protocol,
  );
  if (rebuilt.scoringId !== task.scoringId || hash(rebuilt) !== hash(task))
    throw new Error("scoring-task-drift");
  const output = completeObservationAssessment(task.assessment, rawReply);
  const base = {
    scoringId: task.scoringId,
    policy: task.policy,
    maxScore: task.card.items.reduce((n, item) => n + item.points, 0),
    publishable: false as const,
    assessment: output,
  };
  if (output.failure || !output.observations)
    return {
      ...base,
      status:
        output.result.status === "no_answer"
          ? ("no_answer" as const)
          : ("unavailable" as const),
      total: null,
      earnedOnResolvedItems: null,
      items: [],
      summary:
        output.result.status === "no_answer"
          ? "尚未作答。"
          : "本次未能完成评阅，暂不显示分数。",
    };
  const findings = findingsSchema.parse(output.observations);
  const byId = new Map(findings.criteria.map((point) => [point.id, point]));
  const unresolved = (finding: string) =>
    finding === "uncertain" || finding === "conflicting";
  const items = task.card.items.map((item) => {
    const finding = byId.get(item.criterionId)!;
    const judged = output.result.criteria.find(
      (point) => point.id === item.criterionId,
    )!;
    const conclusion = item.requiresConclusion
      ? byId.get(item.requiresConclusion)!
      : undefined;
    const met = finding.finding === "satisfied";
    // A scoring condition cannot erase an unresolved semantic judgment.
    // Known missing/incorrect reasons remain zero even if the conclusion is pending.
    const pending =
      unresolved(finding.finding) ||
      (met && !!conclusion && unresolved(conclusion.finding));
    const blocked = !!conclusion && conclusion.finding !== "satisfied";
    const earned = pending ? null : met && !blocked ? item.points : 0;
    const prefix = {
      satisfied: "已表达完整。",
      incomplete: "表达尚不完整。",
      absent: "原答未表达这一点。",
      incorrect: "这一点需要修正。",
      conflicting: "原答存在未解决的相反主张，待核对，暂不确定该项分数。",
      uncertain: "这一点待核对，暂不确定该项分数。",
    }[finding.finding];
    let feedback = prefix + (!met && earned === 0 ? item.guidance : "");
    if (met && blocked) {
      const title = task.card.items.find(
        (point) => point.criterionId === item.requiresConclusion,
      )!.title;
      feedback = pending
        ? `这部分分析已表达完整；但「${title}」仍待核对，暂不确定本项分数。`
        : `这部分分析已表达完整；按本题练习规则，须「${title}」正确才能获得本项分数。该条件未满足，本项不计分。`;
    }
    return {
      criterionId: item.criterionId,
      title: item.title,
      finding: finding.finding,
      earned,
      maxScore: item.points,
      evidence: judged.evidence,
      modelReason: finding.reason,
      ...(met && pending && blocked
        ? { pendingReason: "conclusion" as const }
        : {}),
      // Keep free-form model explanations out of the deterministic feedback.
      // A wrong label can still make this feedback wrong; manual review remains required.
      feedback,
    };
  });
  const pending = items.some((item) => item.earned === null);
  const earnedOnResolvedItems = items.reduce(
    (n, item) => n + (item.earned ?? 0),
    0,
  );
  return {
    ...base,
    status: pending ? ("pending" as const) : ("scored" as const),
    total: pending ? null : earnedOnResolvedItems,
    earnedOnResolvedItems,
    items,
    summary: pending
      ? "有待核对的判断项，暂不显示总分。"
      : `本题 ${earnedOnResolvedItems} / ${base.maxScore} 分。`,
  };
}
