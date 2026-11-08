import {
  retryExercise,
  type FaultProgress,
} from "../../../domain/fault-progress";
import { practiceResult } from "../../../domain/practice";

// Only the submitted question behind this action may be reopened. A delayed
// click must not clear a draft after the learner has moved to another question.
export function retryObjectiveAnswer(state: FaultProgress, questionId: string) {
  if (state.exerciseId !== questionId) return state;
  const { q, answer } = practiceResult(state);
  return q.kind === "objective" && answer ? retryExercise(state) : state;
}
