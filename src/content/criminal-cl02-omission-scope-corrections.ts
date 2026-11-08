import type { UnitExercise } from "./fault-unit";
import { cl02Cases } from "./criminal-package-one/cl02";

export const cl02OmissionScopeRevision =
  "criminal-cl02-omission-scope-2026-10-06.v1";

const original = cl02Cases.find(
  ({ exercise }) => exercise.id === "cl02-obligation-capacity",
);
if (!original) throw new Error("Missing published caregiver question");
const id = "cl02-obligation-capacity-v2";

// Keep the old question and its three requirements available for old records.
// The complete reference still cautions that guilt and the final charge need
// separate examination; that caution is supplementary to this narrow question.
export const cl02OmissionScopeCorrections: {
  topicId: string;
  replaces: string;
  exercise: UnitExercise;
}[] = [
  {
    topicId: original.topicId,
    replaces: original.exercise.id,
    exercise: {
      ...original.exercise,
      id,
      criteria: original.exercise
        .criteria!.slice(0, 2)
        .map((criterion, index) => ({
          ...criterion,
          id: `${id}-p${index + 1}`,
        })),
    },
  },
];
