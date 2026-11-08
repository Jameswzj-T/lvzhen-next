import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";
import {
  civilAgencyChapter,
  civilAgencyExercises,
  civilAgencyPreparation,
  civilAgencyRevision,
  civilAgencyTopics,
  civilAgencyTrainingExercises,
} from "./civil-agency";
import {
  civilAgencyCurrentSourceReview,
  civilAgencyCurrentSources,
} from "./civil-agency-source-status";

/** Pure candidate data. Importing this module never registers a subject. */
export const civilAgencySubjectCandidate = {
  id: civilAgencyPreparation.subjectId,
  title: "民法",
  chapters: [civilAgencyChapter],
  registered: false,
  readyForRegistration: false,
  currentSourceStatusVerified: true,
  sourceReview: civilAgencyCurrentSourceReview,
  registrationBlockedBy: [
    "formal subject lookup",
    "cross-subject save and restore verification",
  ],
} as const;

// Lookup snapshots contain all six published-form candidates so the unchanged
// progressSchema can validate an explicitly chosen holdout form. The ordinary
// learning cards and default queues still contain only the four training forms.
export const civilAgencyLookupTopics: FaultTopic[] = civilAgencyTopics.map(
  (topic) => ({
    ...topic,
    exercises: civilAgencyExercises.filter((q) =>
      q.relatedTopicIds?.includes(topic.id),
    ),
  }),
);

export const civilAgencyContentPackCandidate = {
  revision: civilAgencyRevision,
  snapshot: {
    topics: civilAgencyLookupTopics,
    sources: civilAgencyCurrentSources,
  },
};

export const civilAgencyDefaultQueues = {
  objective: civilAgencyTrainingExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilAgencyTrainingExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};

export function civilAgencyQuestion(id: string): UnitExercise | undefined {
  return civilAgencyExercises.find((q) => q.id === id);
}

export function civilAgencyTopicForQuestion(id: string) {
  const q = civilAgencyQuestion(id);
  return civilAgencyLookupTopics.find((t) => t.id === q?.relatedTopicIds?.[0]);
}

export function civilAgencySameCaseQuestions(id: string) {
  const q = civilAgencyQuestion(id);
  return q
    ? civilAgencyExercises.filter((item) => item.caseId === q.caseId)
    : [];
}

type CatalogShape = {
  contentPacks: {
    revision: string;
    snapshot: { topics: FaultTopic[]; sources: ContentSources };
  }[];
  learningTopics: FaultTopic[];
  exerciseFor(id: string): UnitExercise | undefined;
  topicFor(id: string): FaultTopic | undefined;
  exerciseRevision(id: string): string;
  topicRevision(id: string): string;
  exerciseSources(id: string): ContentSources;
  isPublishedTopicRevision(id: string, revision: string): boolean;
};

/** Only the isolated test loader calls this. It does not mutate base or main. */
export function withCivilAgencyCatalog<T extends CatalogShape>(base: T): T {
  return {
    ...base,
    contentPacks: [...base.contentPacks, civilAgencyContentPackCandidate],
    learningTopics: [...base.learningTopics, ...civilAgencyTopics],
    exerciseFor: (id: string) =>
      civilAgencyQuestion(id) ?? base.exerciseFor(id),
    topicFor: (id: string) =>
      civilAgencyLookupTopics.find((t) => t.id === id) ?? base.topicFor(id),
    exerciseRevision: (id: string) =>
      civilAgencyQuestion(id) ? civilAgencyRevision : base.exerciseRevision(id),
    topicRevision: (id: string) =>
      civilAgencyTopics.some((t) => t.id === id)
        ? civilAgencyRevision
        : base.topicRevision(id),
    exerciseSources: (id: string) =>
      civilAgencyQuestion(id)
        ? civilAgencyCurrentSources
        : base.exerciseSources(id),
    isPublishedTopicRevision: (id: string, revision: string) =>
      civilAgencyTopics.some((t) => t.id === id)
        ? revision === civilAgencyRevision
        : base.isPublishedTopicRevision(id, revision),
  };
}

/** First-answer projection: no reference, key, explanation, hint or rubric. */
export function civilAgencyPromptMaterial(id: string) {
  const q = civilAgencyQuestion(id);
  if (!q) return null;
  return {
    id: q.id,
    caseId: q.caseId,
    revision: civilAgencyRevision,
    title: q.title,
    kind: q.kind,
    facts: q.facts,
    prompt: q.prompt,
    ...(q.options
      ? { options: q.options.map(({ id, text }) => ({ id, text })) }
      : {}),
  };
}
