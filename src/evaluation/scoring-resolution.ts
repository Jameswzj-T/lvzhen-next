import { completeScoringLoop, type ScoringLoopTask } from "./scoring-loop";
import { presentScoringFeedback } from "./scoring-feedback";
import { digest } from "./model-config";
import type { ScoringTrialResponse } from "./scoring-trial-contract";
import {
  COHERENCE_POLICY,
  scoreResolutionRuleFor,
  validateScoreResolutionRule,
  type ScoreResolutionRule,
} from "./scoring-resolution-rules";

// Versioned code decision over a validated model result. The source score and
// semantic findings remain intact for replay; no additional model call.
// A known false prerequisite can determine zero without resolving the reason's
// meaning. It never turns an uncertain semantic finding into correct/incorrect.
export const RESOLUTION_POLICY = "separate-score-and-diagnosis-v1";

export function resolveScore(
  task: ScoringLoopTask,
  reply: unknown,
  rule?: ScoreResolutionRule,
) {
  const baseline = completeScoringLoop(task, reply);
  if (rule) validateScoreResolutionRule(task, rule);
  const policy = rule ? COHERENCE_POLICY : RESOLUTION_POLICY;
  const byId = new Map(baseline.items.map((p) => [p.criterionId, p]));
  const visible = presentScoringFeedback(task, baseline);
  const pendingFinding = (finding: string) =>
    finding === "conflicting" || finding === "uncertain";
  const items = baseline.items.map((item, index) => {
    const dependency = task.card.items.find(
      (point) => point.criterionId === item.criterionId,
    )?.requiresConclusion;
    const conclusion = dependency ? byId.get(dependency) : undefined;
    const coherenceFailed =
      item.finding === "conflicting" &&
      rule?.coherentConclusionIds.includes(item.criterionId);
    const dependencyCoherenceFailed =
      conclusion?.finding === "conflicting" &&
      rule?.coherentConclusionIds.includes(conclusion.criterionId);
    if (coherenceFailed || dependencyCoherenceFailed) {
      return {
        ...item,
        earned: 0,
        scoreBasis: {
          type: "authored_coherence_not_met" as const,
          criterionId: dependencyCoherenceFailed
            ? conclusion!.criterionId
            : item.criterionId,
        },
        // This is conditional on the model finding, not proof it is correct.
        reviewRequired: true,
        feedback: dependencyCoherenceFailed
          ? `${item.finding === "satisfied" ? "这部分分析已表达完整；" : ""}按本题要求，须「${conclusion!.title}」明确一致才能计分。当前未满足该条件，本项不计分；原有分析保留供核对。`
          : "本项结论与原答其他表述不一致，未满足本题结论明确一致的要求，本项不计分。请核对结论及其依据。",
      };
    }
    const prerequisiteFailed =
      !!conclusion &&
      ["incorrect", "absent", "incomplete"].includes(conclusion.finding);
    const resolvedByCondition = item.earned === null && prerequisiteFailed;
    const earned = resolvedByCondition ? 0 : item.earned;
    const reviewRequired =
      pendingFinding(item.finding) ||
      visible[index].reviewRequired === true ||
      (conclusion?.finding === "incorrect" && item.finding !== "satisfied");
    return {
      ...item,
      earned,
      // Authored relation, not a conclusion inferred from model prose or regex.
      scoreBasis: resolvedByCondition
        ? ({ type: "prerequisite_not_met", criterionId: dependency! } as const)
        : ({ type: "existing_rule" } as const),
      reviewRequired,
      feedback: resolvedByCondition
        ? `按本题计分规则，「${conclusion!.title}」须满足才能计分。当前条件未满足，本项不计分；本项表达仍待核对，不能据此认定理由没写或写错。`
        : visible[index].feedback,
    };
  });
  const unavailable =
    baseline.status === "unavailable" || baseline.status === "no_answer";
  const total =
    unavailable || items.some((p) => p.earned === null)
      ? null
      : items.reduce((sum, p) => sum + p.earned!, 0);
  return {
    policy: policy as typeof COHERENCE_POLICY | typeof RESOLUTION_POLICY,
    // Presentation belongs to the derived result identity too. A wording fix
    // writes a new decision; it must not make an immutable old record unreadable.
    decisionId: digest({ policy, baseline, items, ...(rule ? { rule } : {}) }),
    ...(rule ? { rule } : {}),
    sourceScoringId: task.scoringId,
    sourceStatus: baseline.status,
    sourceTotal: baseline.total,
    scoreStatus: unavailable
      ? ("unavailable" as const)
      : total === null
        ? ("pending" as const)
        : ("determined" as const),
    total,
    maxScore: baseline.maxScore,
    // A determined score does not clear the separate diagnosis review flag.
    reviewRequired: unavailable || items.some((p) => p.reviewRequired),
    publishable: false as const,
    items,
  };
}

export function resolvedTrialResponse(
  task: ScoringLoopTask,
  reply: unknown,
  source: Extract<ScoringTrialResponse, { status: "ready" }>,
) {
  const decision = resolveScore(task, reply, scoreResolutionRuleFor(task));
  if (
    decision.scoreStatus === "unavailable" ||
    source.scoringId !== decision.sourceScoringId ||
    source.judgment !== decision.sourceStatus ||
    source.total !== decision.sourceTotal
  )
    throw new Error("resolution-source-mismatch");
  const visible = presentScoringFeedback(
    task,
    completeScoringLoop(task, reply),
  );
  const response: Extract<ScoringTrialResponse, { status: "ready" }> = {
    ...source,
    judgment: decision.scoreStatus === "pending" ? "pending" : "scored",
    total: decision.total,
    items: decision.items.map((item, i) => {
      // The old presentation hold referred to unresolved marks. Preserve the
      // separate diagnosis flag when this authored condition now fixes zero.
      const {
        reviewRequired: _oldHold,
        pendingReason: _oldReason,
        ...withoutScoreHold
      } = visible[i];
      return {
        ...(item.scoreBasis.type === "authored_coherence_not_met"
          ? withoutScoreHold
          : visible[i]),
        earned: item.earned,
        feedback: item.feedback,
        ...(item.reviewRequired ? { diagnosisPending: true as const } : {}),
      };
    }),
    ...(decision.reviewRequired ? { diagnosisPending: true as const } : {}),
    resolution: {
      policy: decision.policy,
      decisionId: decision.decisionId,
      sourceJudgment: source.judgment,
      sourceTotal: source.total,
    },
  };
  return { decision, response };
}
