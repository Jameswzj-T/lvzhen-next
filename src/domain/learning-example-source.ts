/** One fixed public example. It never loads or changes a learner record. */
export const LEARNING_EXAMPLE_SOURCE = "fictional-learning-process-20261009.v1";
export const LEARNING_EXAMPLE_QUESTION = "civil-tort-mall-slip";
export const LEARNING_EXAMPLE_REVISION = "civil-tort-personal-2026-10-09.v1";
export type LearningExampleSource = typeof LEARNING_EXAMPLE_SOURCE;

export const EXAMPLE_REFERENCE_PRACTICE_HREF = `/lab/practice?subject=civil-law&question=${LEARNING_EXAMPLE_QUESTION}&fromExample=${LEARNING_EXAMPLE_SOURCE}`;

export function matchesLearningExample(questionId: string, revision: string) {
  return (
    questionId === LEARNING_EXAMPLE_QUESTION &&
    revision === LEARNING_EXAMPLE_REVISION
  );
}
