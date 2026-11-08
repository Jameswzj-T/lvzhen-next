import {
  ecologyG8Exercises,
  ecologyG8Topics,
  ecologyG8ContentPack,
} from "./ecology-g8";
import {
  commercialG5Exercises,
  commercialG5Topics,
  commercialG5ContentPack,
} from "./commercial-g5";
import {
  commercialForfeitureTransferQuestion,
  commercialForfeiturePracticeTopics,
  commercialForfeitureTransferContentPack,
} from "./commercial-forfeiture-transfer";
import {
  commercialTransferContributionExercises,
  commercialTransferContributionTopics,
  commercialTransferContributionContentPack,
} from "./commercial-transfer-contribution";
import {
  commercialContributionForfeitureExercises,
  commercialContributionForfeitureContentPack,
} from "./commercial-contribution-forfeiture";
import {
  commercialEquityTransferExercises,
  commercialEquityTransferTopics,
  commercialEquityTransferContentPack,
} from "./commercial-equity-transfer";
import {
  commercialInformationRightExercises,
  commercialInformationRightTopics,
  commercialInformationRightContentPack,
} from "./commercial-information-right";
import {
  commercialExercises as liabilityExercises,
  commercialTopics as liabilityTopics,
  commercialChapter as liabilityChapter,
  commercialCompanyLiabilityContentPack,
} from "./commercial-company-liability";
import {
  commercialContributionTimingExercises,
  commercialContributionTimingTopics,
  commercialContributionTimingContentPack,
} from "./commercial-contribution-timing";

export const commercialExercises = [
  ...liabilityExercises,
  ...commercialContributionTimingExercises,
  ...commercialInformationRightExercises,
  ...commercialEquityTransferExercises,
  ...commercialContributionForfeitureExercises,
  ...commercialTransferContributionExercises,
  commercialForfeitureTransferQuestion,
  ...commercialG5Exercises,
  ...ecologyG8Exercises,
];
export const commercialTopics = [
  ...liabilityTopics,
  ...commercialContributionTimingTopics,
  ...commercialInformationRightTopics,
  ...commercialEquityTransferTopics,
  ...commercialForfeiturePracticeTopics,
  ...commercialTransferContributionTopics,
  ...commercialG5Topics,
  ...ecologyG8Topics,
];
export const commercialChapter = {
  ...liabilityChapter,
  topicIds: commercialTopics
    .filter(
      (t) =>
        !commercialG5Topics.some((g) => g.id === t.id) &&
        !ecologyG8Topics.some((g) => g.id === t.id),
    )
    .map((t) => t.id),
};
export const commercialDefaultQueues = {
  objective: commercialExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: commercialExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
const packs = [
  commercialCompanyLiabilityContentPack,
  commercialContributionTimingContentPack,
  commercialInformationRightContentPack,
  commercialEquityTransferContentPack,
  commercialContributionForfeitureContentPack,
  commercialTransferContributionContentPack,
  commercialForfeitureTransferContentPack,
  commercialG5ContentPack,
  ecologyG8ContentPack,
];
export const commercialPackForTopic = (id: string) =>
  packs.find((p) => p.snapshot.topics.some((t) => t.id === id));
export const commercialPackForQuestion = (id: string) =>
  packs.find((p) =>
    p.snapshot.topics.some((t) => t.exercises.some((q) => q.id === id)),
  );
export function commercialQuestion(id: string) {
  const q = commercialExercises.find((q) => q.id === id);
  return q ? structuredClone(q) : undefined;
}
export function commercialTopicForQuestion(id: string) {
  const t = commercialTopics.find((t) => t.exercises.some((q) => q.id === id));
  return t ? structuredClone(t) : undefined;
}
export function commercialSameCaseQuestions(id: string) {
  const q = commercialQuestion(id);
  return q
    ? structuredClone(commercialExercises.filter((x) => x.caseId === q.caseId))
    : [];
}
