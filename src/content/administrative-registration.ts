import {
  administrativeG4ContentPack,
  administrativeG4Exercises,
  administrativeG4Topics,
  administrativeG4DefaultQueues,
} from "./administrative-g4";
import {
  historicalTemporalPack,
  historicalTemporalQuestion,
  historicalTemporalTopic,
} from "./administrative-temporal-law-history";
import {
  administrativeTemporalLawContentPack,
  administrativeTemporalLawExercises,
  administrativeTemporalLawTopics,
} from "./administrative-temporal-law";
import {
  administrativeSingleFineContentPack,
  administrativeSingleFineExercises,
  administrativeSingleFineTopics,
} from "./administrative-single-fine";
import {
  administrativeHearingChapter,
  administrativeHearingContentPack,
  administrativeHearingDefaultQueues,
  administrativeHearingExercises,
  administrativeHearingTopics,
} from "./administrative-hearing";
import {
  administrativeNonpunishmentChapter,
  administrativeNonpunishmentContentPack,
  administrativeNonpunishmentDefaultQueues,
  administrativeNonpunishmentExercises,
  administrativeNonpunishmentTopics,
} from "./administrative-nonpunishment";
import {
  administrativePenaltyCompulsionChapter,
  administrativePenaltyCompulsionContentPack,
  administrativePenaltyCompulsionDefaultQueues,
  administrativePenaltyCompulsionExercises,
  administrativePenaltyCompulsionTopics,
} from "./administrative-penalty-compulsion";
import {
  administrativePenaltyDefenseChapter,
  administrativePenaltyDefenseContentPack,
  administrativePenaltyDefenseDefaultQueues,
  administrativePenaltyDefenseExercises,
  administrativePenaltyDefenseTopics,
} from "./administrative-penalty-defense";

// Append current units without changing their independently versioned content.
export const administrativeExercises = [
  ...administrativePenaltyCompulsionExercises,
  ...administrativePenaltyDefenseExercises,
  ...administrativeNonpunishmentExercises,
  ...administrativeHearingExercises,
  ...administrativeSingleFineExercises,
  ...administrativeTemporalLawExercises,
  ...administrativeG4Exercises,
];
export const administrativeTopics = [
  ...administrativePenaltyCompulsionTopics,
  ...administrativePenaltyDefenseTopics,
  ...administrativeNonpunishmentTopics,
  ...administrativeHearingTopics,
  ...administrativeSingleFineTopics,
  ...administrativeTemporalLawTopics,
  ...administrativeG4Topics,
];
export const administrativeChapter = {
  ...administrativePenaltyCompulsionChapter,
  topicIds: [
    ...administrativePenaltyCompulsionChapter.topicIds,
    ...administrativePenaltyDefenseChapter.topicIds,
    ...administrativeNonpunishmentChapter.topicIds,
    ...administrativeHearingChapter.topicIds,
    ...administrativeSingleFineTopics.map((t) => t.id),
    ...administrativeTemporalLawTopics.map((t) => t.id),
  ],
};
export const administrativeDefaultQueues = {
  objective: [
    ...administrativePenaltyCompulsionDefaultQueues.objective,
    ...administrativePenaltyDefenseDefaultQueues.objective,
    ...administrativeNonpunishmentDefaultQueues.objective,
    ...administrativeHearingDefaultQueues.objective,
    ...administrativeSingleFineExercises
      .filter((q) => q.kind === "objective")
      .map((q) => q.id),
    ...administrativeTemporalLawExercises
      .filter((q) => q.kind === "objective")
      .map((q) => q.id),
    ...administrativeG4DefaultQueues.objective,
  ],
  subjective: [
    ...administrativePenaltyCompulsionDefaultQueues.subjective,
    ...administrativePenaltyDefenseDefaultQueues.subjective,
    ...administrativeNonpunishmentDefaultQueues.subjective,
    ...administrativeHearingDefaultQueues.subjective,
    ...administrativeSingleFineExercises
      .filter((q) => q.kind === "subjective")
      .map((q) => q.id),
    ...administrativeTemporalLawExercises
      .filter((q) => q.kind === "subjective")
      .map((q) => q.id),
    ...administrativeG4DefaultQueues.subjective,
  ],
};

const packs = [
  administrativeG4ContentPack,
  administrativePenaltyCompulsionContentPack,
  administrativePenaltyDefenseContentPack,
  administrativeNonpunishmentContentPack,
  administrativeHearingContentPack,
  administrativeSingleFineContentPack,
  administrativeTemporalLawContentPack,
];
export const administrativePackForTopic = (id: string) =>
  packs.find((p) => p.snapshot.topics.some((t) => t.id === id));
export const administrativePackForQuestion = (id: string) =>
  packs.find((p) =>
    p.snapshot.topics.some((t) => t.exercises.some((q) => q.id === id)),
  ) ?? historicalTemporalPack(id);

export function administrativeQuestion(id: string) {
  const question =
    administrativeExercises.find((q) => q.id === id) ??
    historicalTemporalQuestion(id);
  return question ? structuredClone(question) : undefined;
}
export function administrativeTopicForQuestion(id: string) {
  const topic =
    administrativeTopics.find((t) => t.exercises.some((q) => q.id === id)) ??
    historicalTemporalTopic(id);
  return topic ? structuredClone(topic) : undefined;
}
export function administrativeSameCaseQuestions(id: string) {
  const question = administrativeQuestion(id);
  return question
    ? structuredClone(
        (
          historicalTemporalPack(id)?.snapshot.topics.flatMap(
            (t) => t.exercises,
          ) ?? administrativeExercises
        ).filter((q) => q.caseId === question.caseId),
      )
    : [];
}
