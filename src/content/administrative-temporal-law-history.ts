import snapshots from "./administrative-temporal-law-history.json";
import type { ContentSources, FaultTopic } from "./fault-unit";

// The first two publications shared question IDs. Keep their exact snapshots;
// an immutable answer's revision, never its wording or date, selects its facts.
export const administrativeTemporalLawHistoricalPacks = snapshots as {
  revision: string;
  snapshot: { topics: FaultTopic[]; sources: ContentSources };
}[];

export function historicalTemporalPack(id: string, revision?: string) {
  return [...administrativeTemporalLawHistoricalPacks]
    .reverse()
    .find(
      (p) =>
        (revision === undefined || p.revision === revision) &&
        p.snapshot.topics.some((t) => t.exercises.some((q) => q.id === id)),
    );
}

export function historicalTemporalQuestion(id: string, revision?: string) {
  return historicalTemporalPack(id, revision)
    ?.snapshot.topics.flatMap((t) => t.exercises)
    .find((q) => q.id === id);
}

export function historicalTemporalTopic(id: string) {
  return historicalTemporalPack(id)?.snapshot.topics.find((t) =>
    t.exercises.some((q) => q.id === id),
  );
}

export const isHistoricalTemporalQuestion = (id: string) =>
  !!historicalTemporalQuestion(id);

export const historicalTemporalTopicRevision = (id: string, revision: string) =>
  administrativeTemporalLawHistoricalPacks.some(
    (p) =>
      p.revision === revision && p.snapshot.topics.some((t) => t.id === id),
  );
