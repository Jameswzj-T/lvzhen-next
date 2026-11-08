import {
  exerciseFor,
  exerciseRevision,
  exerciseSources,
} from "../content/fault-catalog";
import type { EvaluationInput } from "./index";
import type { ObservationPlan } from "./observation-assessment";
import type { ScoreCard } from "./scoring-loop";
import { digest } from "./model-config";

// Authored practice allocations, not official exam marks. Keep reference prose,
// feedback and points separate from the criteria the model reads.
export type BankPoint = {
  id: string;
  title: string;
  description: string;
  ruleBasis: string;
  points: number;
  requiresFactualSupport: boolean;
  guidance: string;
  requiresConclusion?: string;
};
export function bankCard(id: string, points: BankPoint[]) {
  const q = exerciseFor(id);
  if (!q || q.kind !== "subjective")
    throw new Error("invalid-bank-scoring-question");
  const revision = exerciseRevision(id);
  const caseRevision = `bank-v1-${digest({ revision, facts: q.facts, question: q.prompt }).slice(0, 20)}`;
  return {
    exerciseRevision: revision,
    title: q.title,
    input: {
      caseId: id,
      caseRevision,
      facts: q.facts!,
      question: q.prompt,
      criteria: points.map(({ id, description, ruleBasis }) => ({
        id,
        description,
        ruleBasis,
      })),
    } satisfies Omit<EvaluationInput, "answerId" | "studentText">,
    plan: {
      version: "bank-independent-points-v1",
      caseId: id,
      caseRevision,
      criterionPolicy: points.map(({ id, requiresFactualSupport }) => ({
        id,
        requiresFactualSupport,
      })),
      units: points.map(({ id, title }) => ({ id, title, criterionIds: [id] })),
    } satisfies ObservationPlan,
    card: {
      version: points.some((p) => p.requiresConclusion)
        ? "bank-practice-conclusion-v2"
        : "bank-practice-points-v1",
      caseId: id,
      caseRevision,
      items: points.map(
        ({ id, title, points, guidance, requiresConclusion }) => ({
          criterionId: id,
          title,
          points,
          guidance,
          ...(requiresConclusion ? { requiresConclusion } : {}),
        }),
      ),
    } satisfies ScoreCard,
    reference: q.reference,
    sources: q.sources.map((id) => exerciseSources(q.id)[id].url),
  };
}
