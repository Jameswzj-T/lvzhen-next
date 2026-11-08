import { bankScoringCards } from "../bank-scoring-cards";
import {
  currentCapstoneMaterial,
  currentCapstoneQuestion,
} from "../capstone-scoring-card-v2";
import type { CasePack } from "./contracts";

const short = bankScoringCards.find(
  (p) => p.input.caseId === "cl10-review-self-report",
)!;
export const graphPacks: Record<"short" | "long", CasePack> = {
  short: {
    title: short.title,
    input: short.input,
    policy: short.plan.criterionPolicy,
    card: short.card,
    groups: [
      {
        id: "short",
        title: "完整短答",
        criterionIds: short.input.criteria.map((p) => p.id),
        requiredReviewIds: [],
      },
    ],
  },
  long: {
    title: currentCapstoneQuestion.title,
    input: currentCapstoneMaterial.input,
    policy: currentCapstoneMaterial.plan.criterionPolicy,
    card: currentCapstoneMaterial.card,
    groups: currentCapstoneMaterial.plan.units.map((unit) => ({
      id: unit.id,
      title: unit.title,
      criterionIds: unit.criterionIds,
      requiredReviewIds: unit.id === "q2" ? ["q2_reason"] : [],
    })),
  },
};
