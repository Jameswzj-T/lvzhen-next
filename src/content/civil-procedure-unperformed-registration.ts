import { civilProcedureContractVenueTopics } from "./civil-procedure-contract-venue";
import {
  civilProcedureUnperformedTransferExercises,
  civilProcedureUnperformedTransferRevision,
  civilProcedureUnperformedTransferSources,
  civilProcedureUnperformedTransferTopicId,
} from "./civil-procedure-unperformed-transfer";

// Append one practice form without changing the existing teaching-card edition
// or mutating the frozen original content pack.
export const civilProcedureContractPracticeTopics =
  civilProcedureContractVenueTopics.map((topic) =>
    topic.id === civilProcedureUnperformedTransferTopicId
      ? {
          ...topic,
          exercises: [
            ...topic.exercises,
            ...civilProcedureUnperformedTransferExercises,
          ],
        }
      : topic,
  );

export const civilProcedureUnperformedTransferContentPack = {
  revision: civilProcedureUnperformedTransferRevision,
  snapshot: {
    topics: civilProcedureContractVenueTopics
      .filter((topic) => topic.id === civilProcedureUnperformedTransferTopicId)
      .map((topic) => ({
        ...topic,
        sources: Object.keys(civilProcedureUnperformedTransferSources),
        exercises: civilProcedureUnperformedTransferExercises,
      })),
    sources: civilProcedureUnperformedTransferSources,
  },
};
