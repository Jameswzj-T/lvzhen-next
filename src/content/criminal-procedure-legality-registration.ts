import * as prior from "./criminal-procedure-exclusion";
import {
  criminalProcedureLegalityQuestions,
  criminalProcedureLegalityRevision,
  criminalProcedureLegalitySources,
} from "./criminal-procedure-legality";

// Add the two reviewed forms to the existing evidence chapter. The old card,
// four published forms and their exact saved versions are preserved.
export * from "./criminal-procedure-exclusion";
export const criminalProcedureExclusionExercises = [
  ...prior.criminalProcedureExclusionExercises,
  ...criminalProcedureLegalityQuestions,
];
export const criminalProcedureExclusionTopics =
  prior.criminalProcedureExclusionTopics.map((topic) => ({
    ...topic,
    exercises: criminalProcedureExclusionExercises,
  }));
export const criminalProcedureExclusionDefaultQueues = {
  objective: prior.criminalProcedureExclusionDefaultQueues.objective,
  subjective: [
    ...prior.criminalProcedureExclusionDefaultQueues.subjective,
    ...criminalProcedureLegalityQuestions.map((q) => q.id),
  ],
};
export function criminalProcedureExclusionQuestion(id: string) {
  const q = criminalProcedureLegalityQuestions.find((q) => q.id === id);
  return q ? structuredClone(q) : prior.criminalProcedureExclusionQuestion(id);
}
export function criminalProcedureExclusionTopicForQuestion(id: string) {
  return criminalProcedureExclusionQuestion(id)
    ? structuredClone(criminalProcedureExclusionTopics[0])
    : undefined;
}
export function criminalProcedureExclusionSameCaseQuestions(id: string) {
  const q = criminalProcedureLegalityQuestions.find((q) => q.id === id);
  return q
    ? [structuredClone(q)]
    : prior.criminalProcedureExclusionSameCaseQuestions(id);
}
export const criminalProcedureLegalityContentPack = {
  revision: criminalProcedureLegalityRevision,
  snapshot: {
    topics: prior.criminalProcedureExclusionTopics.map((topic) => ({
      ...topic,
      sources: Object.keys(criminalProcedureLegalitySources),
      exercises: criminalProcedureLegalityQuestions,
    })),
    sources: criminalProcedureLegalitySources,
  },
};
