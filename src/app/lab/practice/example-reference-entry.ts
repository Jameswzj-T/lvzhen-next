import { exerciseRevision } from "../../../content/fault-catalog";
import {
  freshDraft,
  retryExercise,
  type FaultProgress,
} from "../../../domain/fault-progress";
import {
  LEARNING_EXAMPLE_SOURCE,
  LEARNING_EXAMPLE_QUESTION,
  matchesLearningExample,
  type LearningExampleSource,
} from "../../../domain/learning-example-source";

/** Only an explicit link to the exact example's existing question can mark it. */
export function resolveLearningExampleEntry(
  params: Record<string, string | string[] | undefined>,
): LearningExampleSource | undefined {
  return params.subject === "civil-law" &&
    params.question === LEARNING_EXAMPLE_QUESTION &&
    params.fromExample === LEARNING_EXAMPLE_SOURCE &&
    params.view !== "library" &&
    params.review === undefined &&
    matchesLearningExample(
      LEARNING_EXAMPLE_QUESTION,
      exerciseRevision(LEARNING_EXAMPLE_QUESTION),
    )
    ? LEARNING_EXAMPLE_SOURCE
    : undefined;
}

/** Runs after normal question navigation. Reading the example never calls it.
 * Retain unfinished text; an already saved original stays immutable while a
 * separate empty retry is opened for this explicitly requested practice. */
export function enterLearningExamplePractice(
  state: FaultProgress,
  source: LearningExampleSource | undefined,
): FaultProgress {
  if (
    source !== LEARNING_EXAMPLE_SOURCE ||
    state.exerciseId !== LEARNING_EXAMPLE_QUESTION ||
    !matchesLearningExample(
      state.exerciseId,
      exerciseRevision(state.exerciseId),
    )
  )
    return state;
  const previous = state.drafts[state.exerciseId] ?? freshDraft();
  if (
    !previous.submittedId &&
    previous.referenceSeen &&
    previous.learningExampleSource === source
  )
    return state;
  const next = previous.submittedId ? retryExercise(state) : state;
  const draft = next.drafts[next.exerciseId] ?? freshDraft();
  return {
    ...next,
    drafts: {
      ...next.drafts,
      [next.exerciseId]: {
        ...draft,
        referenceSeen: true,
        learningExampleSource: source,
      },
    },
  };
}
