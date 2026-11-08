import type { UnitExercise } from "./fault-unit";
import {
  civilProcedureIntegratedCase,
  civilProcedureIntegratedRevision,
  civilProcedureIntegratedQuestion,
  civilProcedureIntegratedQuestions,
  civilProcedureIntegratedWholePromptMaterial,
} from "./civil-procedure-integrated-case";
import {
  civilProcedureCrossChapterCases,
  civilProcedureCrossChapterQuestion,
  civilProcedureCrossChapterQuestions,
  civilProcedureCrossChapterRevision,
} from "./civil-procedure-cross-chapter";

/** Practice metadata only; this is not a new teaching card or topic directory. */
export const civilProcedureReviewChapter = {
  id: "CIVPRO-FILING-JURISDICTION-INTEGRATED",
  title: "起诉与管辖综合练习",
  section: "民事诉讼法",
  topicIds: [
    ...new Set(
      civilProcedureIntegratedQuestions.map((q) => q.relatedTopicIds![0]),
    ),
  ],
};
export const civilProcedureReviewKey = "filing-jurisdiction";
export const civilProcedureReviewHref =
  "/lab/practice?subject=civil-procedure&review=filing-jurisdiction";

// Registration is isolated until the sole integrator adopts the once-only content review.
export const civilProcedureReviewQuestions: readonly UnitExercise[] =
  civilProcedureIntegratedQuestions;
export const civilProcedureReviewQueues: {
  objective: string[];
  subjective: string[];
} = {
  objective: [],
  subjective: civilProcedureIntegratedQuestions.map((q) => q.id),
};
export const civilProcedureReviewReady =
  civilProcedureReviewQuestions.length === 3 &&
  civilProcedureReviewQuestions.every((q) => q.kind === "subjective");
export const civilProcedureReviewQuestion = (id: string) =>
  civilProcedureCrossChapterQuestion(id) ??
  civilProcedureIntegratedQuestion(id);

// Historical exports above remain the original three-question publication.
// New cases have their own queue, revision and continuation link.
export const civilProcedureAllReviewQuestions: readonly UnitExercise[] = [
  ...civilProcedureReviewQuestions,
  ...civilProcedureCrossChapterQuestions,
];
export const civilProcedureReviewSets = [
  {
    ...civilProcedureIntegratedCase,
    key: civilProcedureReviewKey,
    chapter: civilProcedureReviewChapter,
    revision: civilProcedureIntegratedRevision,
    href: civilProcedureReviewHref,
    questions: civilProcedureReviewQuestions,
  },
  ...civilProcedureCrossChapterCases.map((item) => ({
    ...item,
    revision: civilProcedureCrossChapterRevision,
    href: `/lab/practice?subject=civil-procedure&review=${item.key}`,
  })),
];
export const civilProcedureReviewSetForKey = (key: string) =>
  civilProcedureReviewSets.find((item) => item.key === key);
export const civilProcedureReviewSetForQuestion = (id: string) =>
  civilProcedureReviewSets.find((item) => item.questionIds.includes(id));
export function civilProcedureReviewWholePromptMaterial(id?: string) {
  if (!id) return civilProcedureIntegratedWholePromptMaterial();
  const item = civilProcedureReviewSetForQuestion(id);
  return item
    ? {
        id: item.id,
        revision: item.revision,
        title: item.title,
        facts: item.facts,
        questions: item.questions.map(({ id, title, kind, prompt }) => ({
          id,
          title,
          kind,
          prompt,
        })),
      }
    : null;
}
/** Only an exact registered question may use its existing primary topic. */
export const civilProcedureReviewOwnsQuestion = (
  topicId: string,
  questionId: string,
) => civilProcedureReviewQuestion(questionId)?.relatedTopicIds?.[0] === topicId;
