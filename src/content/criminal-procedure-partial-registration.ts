import { criminalProcedureProofTopics } from "./criminal-procedure-proof";
import {
  criminalProcedurePartialCorroborationExercises,
  criminalProcedurePartialCorroborationRevision,
  criminalProcedurePartialCorroborationSources,
  criminalProcedurePartialCorroborationTopicId,
} from "./criminal-procedure-partial-corroboration";

// Add a distinct practice case; the old card and frozen content pack stay intact.
export const criminalProcedureProofPracticeTopics =
  criminalProcedureProofTopics.map((topic) =>
    topic.id === criminalProcedurePartialCorroborationTopicId
      ? {
          ...topic,
          exercises: [
            ...topic.exercises,
            ...criminalProcedurePartialCorroborationExercises,
          ],
        }
      : topic,
  );
export const criminalProcedurePartialCorroborationContentPack = {
  revision: criminalProcedurePartialCorroborationRevision,
  snapshot: {
    topics: criminalProcedureProofTopics
      .filter(
        (topic) => topic.id === criminalProcedurePartialCorroborationTopicId,
      )
      .map((topic) => ({
        ...topic,
        sources: Object.keys(criminalProcedurePartialCorroborationSources),
        exercises: criminalProcedurePartialCorroborationExercises,
      })),
    sources: criminalProcedurePartialCorroborationSources,
  },
};
