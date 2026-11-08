import type { ScoringLoopTask } from "./scoring-loop";
import { digest } from "./model-config";

export const COHERENCE_POLICY = "authored-coherent-conclusion-v1";
export type ScoreResolutionRule = {
  materialHash: string;
  coherentConclusionIds: readonly string[];
};

// Authored training conditions, validated against these exact three materials.
// Separate from the model request and original score card/cache identity.
const rules: Readonly<Record<string, ScoreResolutionRule>> = {
  "cl05-review-separated": {
    materialHash:
      "4acb5d2efce03837e0fbb4f55fc5701ca86e53156e84049856edb421657e2c52",
    coherentConclusionIds: ["first_conclusion", "second_conclusion"],
  },
  "cl06-two-times": {
    materialHash:
      "2dd25f1eb0739cb11c79498f77854ebea1ea5b2de7753b0565da0cef22932d95",
    coherentConclusionIds: ["jia_conclusion", "bing_conclusion"],
  },
  "cl07-group-scope": {
    materialHash:
      "c1449e2a1e3766cc7210ebc4541322eec398cbde9433c2682c8ba1975fb6fe0c",
    coherentConclusionIds: ["conclusion"],
  },
};

export function scoringMaterialHash(task: ScoringLoopTask) {
  const {
    answerId: _id,
    studentText: _answer,
    ...input
  } = task.assessment.original;
  return digest({ input, plan: task.assessment.plan, card: task.card });
}

export function scoreResolutionRuleFor(task: ScoringLoopTask) {
  const rule = rules[task.card.caseId];
  // Changed question/criteria/points need a new authored review; never carry
  // the condition forward merely because the question ID stayed the same.
  return rule?.materialHash === scoringMaterialHash(task) ? rule : undefined;
}

export function validateScoreResolutionRule(
  task: ScoringLoopTask,
  rule: ScoreResolutionRule,
) {
  const ids = rule.coherentConclusionIds;
  if (
    rule.materialHash !== scoringMaterialHash(task) ||
    ids.length === 0 ||
    new Set(ids).size !== ids.length ||
    ids.some((id) => {
      const point = task.card.items.find((p) => p.criterionId === id);
      return !point || !!point.requiresConclusion;
    })
  )
    throw new Error("invalid-score-resolution-rule");
}
