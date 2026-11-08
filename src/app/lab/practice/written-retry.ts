import {
  retryExercise,
  type FaultProgress,
  type UnitAttempt,
} from "../../../domain/fault-progress";
import { editPractice, practiceResult } from "../../../domain/practice";

/** A page callback may still refer to an older question, submission or draft. */
export function retryWrittenAnswer(
  state: FaultProgress,
  original: UnitAttempt,
): FaultProgress {
  if (state.exerciseId !== original.exerciseId) return state;
  const { q, answer } = practiceResult(state);
  if (
    q.kind !== "subjective" ||
    !answer ||
    answer.id !== original.id ||
    answer.revision !== original.revision ||
    answer.answer !== original.answer ||
    answer.choice !== original.choice
  )
    return state;
  return editPractice(retryExercise(state), { answer: answer.answer });
}
