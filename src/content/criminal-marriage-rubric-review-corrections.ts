import type { UnitExercise } from "./fault-unit";
import { capstoneGapCases } from "./criminal-capstone";

export const marriageRubricReviewRevision =
  "criminal-marriage-rubric-review-2026-09-30.v1";
const original = capstoneGapCases.find(
  (item) => item.exercise.id === "cap-gap-retired-marriage",
)!.exercise;
const id = `${original.id}-v2`;
export const marriageRubricReviewCorrections: {
  topicId: string;
  replaces: string;
  exercise: UnitExercise;
}[] = [
  {
    topicId: "military-marriage",
    replaces: original.id,
    exercise: {
      ...original,
      id,
      caseId: id,
      // Other responsibility remains a reference caution, not an unasked requirement.
      criteria: original.criteria!.slice(0, 2).map((criterion, i) => ({
        ...criterion,
        id: `${id}-p${i + 1}`,
      })),
    },
  },
];
