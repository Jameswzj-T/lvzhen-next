import type { UnitExercise } from "./fault-unit";
import { packageOneCorrections } from "./criminal-package-one-corrections";

export const cl02GasBoundaryRevision =
  "criminal-cl02-gas-boundary-2026-10-16.v3";

const prior = packageOneCorrections.find(
  ({ exercise }) => exercise.id === "cl02-review-gas-v2",
);
if (!prior) throw new Error("Missing published gas question");
const id = "cl02-review-gas-v3";

// One corrected boundary in the same practice slot. Both prior publications
// remain intact so their saved answers and feedback keep their original terms.
export const cl02GasBoundaryCorrections: {
  topicId: string;
  replaces: string;
  exercise: UnitExercise;
}[] = [
  {
    topicId: prior.topicId,
    replaces: prior.exercise.id,
    exercise: {
      ...prior.exercise,
      id,
      criteria: prior.exercise.criteria!.map((criterion, index) => ({
        ...criterion,
        id: `${id}-p${index + 1}`,
        ...(index === 1
          ? {
              boundary:
                "不能把停止继续泄漏直接等同于一定避免爆炸，也不重复核实题设已确认的泄漏引发爆炸的因果事实。",
            }
          : {}),
      })),
    },
  },
];
