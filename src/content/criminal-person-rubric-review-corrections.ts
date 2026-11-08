import type { UnitExercise } from "./fault-unit";
import { personGapCases } from "./criminal-person-gaps";

// Keep the published question readable; new practice uses this corrected rubric.
export const personRubricReviewRevision =
  "criminal-person-rubric-review-2026-09-30.v1";
const original = personGapCases.find(
  (item) => item.exercise.id === "person-gap-insult-publicity-limit",
)!.exercise;
const id = `${original.id}-v2`;
export const personRubricReviewCorrections: {
  topicId: string;
  replaces: string;
  exercise: UnitExercise;
}[] = [
  {
    topicId: "defamation-insult",
    replaces: original.id,
    exercise: {
      ...original,
      id,
      caseId: id,
      // The reference keeps its supplementary caution, but it is not a required answer.
      criteria: original.criteria!.map((criterion, i) => ({
        ...criterion,
        id: `${id}-p${i + 1}`,
        ...(i === 1
          ? {
              meaning:
                "丙私信仅丁接收且未传播，缺少本题公然条件，不能据此认定该罪。",
              acceptable:
                "意思相当且能联系本案事实即可：丙私信仅丁接收且未传播，缺少本题公然条件，不能据此认定该罪。",
              boundary:
                "不得虚构第三人知悉或认为任何辱骂都当然犯罪。本项不要求另行评价行为是否正当；未写该补充说明不算漏项。",
            }
          : {}),
      })),
    },
  },
];
