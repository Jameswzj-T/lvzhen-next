import * as prior from "./civil-procedure-proof-boundary-review";
import {
  civilProcedureEvidenceQuestions,
  civilProcedureEvidenceRevision,
  civilProcedureEvidenceSources,
} from "./civil-procedure-evidence";

// Four reviewed forms join the existing proof chapter. No new knowledge card,
// old publication replacement or reinterpretation of a saved answer.
export * from "./civil-procedure-proof-boundary-review";
export const civilProcedureProofBurdenTopics =
  prior.civilProcedureProofBurdenTopics.map((topic) => ({
    ...topic,
    exercises: [...topic.exercises, ...civilProcedureEvidenceQuestions],
  }));
export const civilProcedureProofBurdenLookupTopics =
  prior.civilProcedureProofBurdenLookupTopics.map((topic) => ({
    ...topic,
    exercises: [...topic.exercises, ...civilProcedureEvidenceQuestions],
  }));
export const civilProcedureProofBurdenDefaultQueues = {
  objective: prior.civilProcedureProofBurdenDefaultQueues.objective,
  subjective: [
    ...prior.civilProcedureProofBurdenDefaultQueues.subjective,
    ...civilProcedureEvidenceQuestions.map((q) => q.id),
  ],
};
export function civilProcedureProofBurdenQuestion(id: string) {
  const q = civilProcedureEvidenceQuestions.find((q) => q.id === id);
  return q ? structuredClone(q) : prior.civilProcedureProofBurdenQuestion(id);
}
export function civilProcedureProofBurdenTopicForQuestion(id: string) {
  return civilProcedureEvidenceQuestions.some((q) => q.id === id)
    ? structuredClone(civilProcedureProofBurdenTopics[0])
    : prior.civilProcedureProofBurdenTopicForQuestion(id);
}
export function civilProcedureProofBurdenSameCaseQuestions(id: string) {
  const q = civilProcedureEvidenceQuestions.find((q) => q.id === id);
  return q
    ? [structuredClone(q)]
    : prior.civilProcedureProofBurdenSameCaseQuestions(id);
}
export const civilProcedureEvidenceContentPack = {
  revision: civilProcedureEvidenceRevision,
  snapshot: {
    topics: prior.civilProcedureProofBurdenTopics.map((topic) => ({
      ...topic,
      sources: Object.keys(civilProcedureEvidenceSources),
      exercises: civilProcedureEvidenceQuestions,
    })),
    sources: civilProcedureEvidenceSources,
  },
};
