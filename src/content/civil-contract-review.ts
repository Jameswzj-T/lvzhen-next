import type { UnitExercise } from "./fault-unit";
import {
  civilContractIntegratedQuestion,
  civilContractIntegratedQuestions,
  civilContractIntegratedWholePromptMaterial,
} from "./civil-contract-integrated-case";

/** Practice metadata only; this is not a new teaching card or topic directory. */
export const civilContractReviewChapter = {
  id: "CIV-CONTRACT-INTEGRATED",
  title: "合同基础综合练习",
  section: "民法",
  topicIds: [
    ...new Set(
      civilContractIntegratedQuestions.map((q) => q.relatedTopicIds![0]),
    ),
  ],
};
export const civilContractReviewKey = "contract-foundation";
export const civilContractReviewHref =
  "/lab/practice?subject=civil-law&review=contract-foundation";

// Registration is isolated until the sole integrator adopts the once-only content review.
export const civilContractReviewQuestions: readonly UnitExercise[] =
  civilContractIntegratedQuestions;
export const civilContractReviewQueues: {
  objective: string[];
  subjective: string[];
} = {
  objective: [],
  subjective: civilContractIntegratedQuestions.map((q) => q.id),
};
export const civilContractReviewReady =
  civilContractReviewQuestions.length >= 2 &&
  civilContractReviewQuestions.every((q) => q.kind === "subjective");
export const civilContractReviewQuestion = (id: string) =>
  civilContractIntegratedQuestion(id);
export const civilContractReviewWholePromptMaterial =
  civilContractIntegratedWholePromptMaterial;
/** Only an exact registered question may use its existing primary topic. */
export const civilContractReviewOwnsQuestion = (
  topicId: string,
  questionId: string,
) => civilContractReviewQuestion(questionId)?.relatedTopicIds?.[0] === topicId;
