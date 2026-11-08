import { transferCases } from "../../evals/scoring-loop-2026-09-22/transfer";
import { digest } from "./model-config";
import { prepareScoringLoop } from "./scoring-loop";
import type { ScoringTrialQuestion } from "./scoring-trial-contract";
import { bankScoringCards } from "./bank-scoring-cards";
import { capstoneScoringMaterial } from "./capstone-scoring-card";
import { currentCapstoneMaterial } from "./capstone-scoring-card-v2";

// Server-side selection of the three frozen, reviewed cards. Neither the
// synthetic answers nor their expected labels are passed to the browser/model.
const titles = ["刑事责任年龄", "正当防卫的时间条件", "一般自首"];
export const scoringTrialQuestions: ScoringTrialQuestion[] = transferCases.map(
  (c, i) => ({
    id: c.input.caseId,
    revision: c.input.caseRevision,
    title: titles[i],
    facts: c.input.facts,
    question: c.input.question,
    maxScore: c.scoreCard.items.reduce((sum, p) => sum + p.points, 0),
    ...(c.input.caseId === "transfer-surrender-arrest"
      ? { coreConclusionCriterionId: "conclusion" }
      : {}),
  }),
);
export function scoringTrialMaterial(
  caseId: string,
  exerciseRevision?: string,
) {
  if (caseId === capstoneScoringMaterial.input.caseId) {
    if (exerciseRevision === undefined) return currentCapstoneMaterial;
    const material = [currentCapstoneMaterial, capstoneScoringMaterial].find(
      (entry) => entry.exerciseRevision === exerciseRevision,
    );
    if (!material) throw new Error("question-revision-mismatch");
    return material;
  }
  const bank = bankScoringCards.find((entry) => entry.input.caseId === caseId);
  if (bank) return bank;
  const c = transferCases.find((entry) => entry.input.caseId === caseId);
  if (!c) throw new Error("unknown-question");
  return {
    exerciseRevision: undefined,
    input: c.input,
    plan: c.plan,
    card: c.scoreCard,
    reference: c.reference,
    sources: c.sources,
  };
}
export function scoringTrialTask(
  caseId: string,
  answer: string,
  protocol:
    "findings-v2" | "findings-v3" | "findings-label-first-v1" = "findings-v2",
  exerciseRevision?: string,
) {
  const c = scoringTrialMaterial(caseId, exerciseRevision);
  return prepareScoringLoop(
    { ...c.input, answerId: digest({ caseId, answer }), studentText: answer },
    c.plan,
    c.card,
    protocol,
  );
}
