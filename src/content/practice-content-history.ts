import snapshots from "./october-reviewed-units-history.json";
import { administrativeTemporalLawHistoricalPacks } from "./administrative-temporal-law-history";
import type { ContentSources, FaultTopic } from "./fault-unit";

// Exact publications at 0f5c499; archived questions never enter current queues.
export const octoberReviewedHistoricalPacks = snapshots as unknown as {
  revision: string;
  snapshot: { topics: FaultTopic[]; sources: ContentSources };
}[];
export const practiceHistoricalPacks = [
  ...administrativeTemporalLawHistoricalPacks,
  ...octoberReviewedHistoricalPacks,
];
export function historicalPracticePack(id: string, revision?: string) {
  return [...practiceHistoricalPacks]
    .reverse()
    .find(
      (p) =>
        (revision === undefined || p.revision === revision) &&
        p.snapshot.topics.some((t) => t.exercises.some((q) => q.id === id)),
    );
}
export const historicalPracticeQuestion = (id: string, revision?: string) =>
  historicalPracticePack(id, revision)
    ?.snapshot.topics.flatMap((t) => t.exercises)
    .find((q) => q.id === id);
export const historicalPracticeTopic = (id: string) =>
  historicalPracticePack(id)?.snapshot.topics.find((t) =>
    t.exercises.some((q) => q.id === id),
  );
export const isHistoricalPracticeQuestion = (id: string) =>
  !!historicalPracticeQuestion(id);
export const historicalPracticeTopicRevision = (id: string, revision: string) =>
  practiceHistoricalPacks.some(
    (p) =>
      p.revision === revision && p.snapshot.topics.some((t) => t.id === id),
  );
