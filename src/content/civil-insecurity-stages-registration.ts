import * as prior from "./civil-contract-performance";
import {
  civilInsecurityStagesQuestions,
  civilInsecurityStagesRevision,
  civilInsecurityStagesSources,
} from "./civil-insecurity-stages";

// Extend the existing chapter queues without changing its saved card or forms.
export * from "./civil-contract-performance";
export const civilContractPerformanceExercises = [
  ...prior.civilContractPerformanceExercises,
  ...civilInsecurityStagesQuestions,
];
export const civilContractPerformanceTopic = {
  ...prior.civilContractPerformanceTopic,
  exercises: civilContractPerformanceExercises,
};
export const civilContractPerformanceTopics = [civilContractPerformanceTopic];
export const civilContractPerformanceDefaultQueues = {
  objective: prior.civilContractPerformanceDefaultQueues.objective,
  subjective: [
    ...prior.civilContractPerformanceDefaultQueues.subjective,
    ...civilInsecurityStagesQuestions.map((q) => q.id),
  ],
};
export function civilContractPerformanceQuestion(id: string) {
  const q = civilInsecurityStagesQuestions.find((q) => q.id === id);
  return q ? structuredClone(q) : prior.civilContractPerformanceQuestion(id);
}
export function civilContractPerformanceTopicForQuestion(id: string) {
  return civilContractPerformanceQuestion(id)
    ? civilContractPerformanceTopic
    : undefined;
}
export function civilContractPerformanceSameCaseQuestions(id: string) {
  const q = civilInsecurityStagesQuestions.find((q) => q.id === id);
  return q
    ? [structuredClone(q)]
    : prior.civilContractPerformanceSameCaseQuestions(id);
}
export const civilInsecurityStagesContentPack = {
  revision: civilInsecurityStagesRevision,
  snapshot: {
    topics: [
      {
        ...prior.civilContractPerformanceTopic,
        sources: Object.keys(civilInsecurityStagesSources),
        exercises: civilInsecurityStagesQuestions,
      },
    ],
    sources: civilInsecurityStagesSources,
  },
};
