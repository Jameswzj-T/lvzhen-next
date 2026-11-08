import { g8CompletionQuestionsForSubject } from "../../../content/g8-completion";
import {
  civilBoundedGapsExercises,
  civilBoundedGapsTopics,
} from "../../../content/civil-bounded-gaps";
import {
  civilProjectTechPartnershipExercises,
  civilProjectTechPartnershipTopics,
} from "../../../content/civil-project-tech-partnership";
import {
  civilFinanceAgencyExercises,
  civilFinanceAgencyTopics,
} from "../../../content/civil-finance-agency";
import {
  civilServiceContractExercises,
  civilServiceContractTopics,
} from "../../../content/civil-service-contract";
import {
  civilUsufructExercises,
  civilUsufructTopics,
} from "../../../content/civil-usufruct";
import {
  civilNeighborPossessionExercises,
  civilNeighborPossessionTopics,
} from "../../../content/civil-neighbor-possession";
import {
  civilQuasiContractExercises,
  civilQuasiContractTopics,
} from "../../../content/civil-quasi-contract";
import {
  civilInheritanceExercises,
  civilInheritanceTopics,
} from "../../../content/civil-inheritance";
import {
  civilFamilyExercises,
  civilFamilyTopics,
} from "../../../content/civil-family";
import {
  civilPersonalityExercises,
  civilPersonalityTopics,
} from "../../../content/civil-personality";
import {
  civilPileTreeRoadExercises,
  civilPileTreeRoadTopics,
} from "../../../content/civil-pile-tree-road";
import {
  civilEnvironmentObjectsExercises,
  civilEnvironmentObjectsTopics,
} from "../../../content/civil-environment-objects";
import {
  civilTrafficMedicalExercises,
  civilTrafficMedicalTopics,
} from "../../../content/civil-traffic-medical";
import {
  civilEducationProductExercises,
  civilEducationProductTopics,
} from "../../../content/civil-education-product";
import {
  civilTortSpecialExercises,
  civilTortSpecialTopics,
} from "../../../content/civil-tort-special";
import {
  civilGuaranteeCoverageExercises,
  civilGuaranteeCoverageTopics,
} from "../../../content/civil-guarantee-coverage";
import {
  civilWorkMandateExercises,
  civilWorkMandateTopics,
} from "../../../content/civil-work-mandate";
import {
  civilGiftLoanExercises,
  civilGiftLoanTopics,
} from "../../../content/civil-gift-loan";
import {
  civilSaleLeaseExercises,
  civilSaleLeaseTopics,
} from "../../../content/civil-sale-lease";
import {
  civilObligationsExercises,
  civilObligationsTopics,
} from "../../../content/civil-obligations";
import {
  civilPropertyExercises,
  civilPropertyTopics,
} from "../../../content/civil-property";
import {
  civilFoundationsExercises,
  civilFoundationsTopics,
} from "../../../content/civil-foundations";
import {
  civilGuaranteeExercises,
  civilGuaranteeTopics,
} from "../../../content/civil-guarantee";
import {
  civilTortInstigationAssistanceTopics,
  civilTortInstigationAssistanceExercises,
} from "../../../content/civil-tort-instigation-assistance";
import {
  civilMovableDeliveryTopics,
  civilMovableDeliveryExercises,
} from "../../../content/civil-movable-delivery";
import {
  personalTortQuestion,
  personalTortTopic,
} from "../../../content/civil-tort-personal";
import { tortQuestion, tortTopic } from "../../../content/civil-tort-property";
import { civilStipulatedLiabilityTopics } from "../../../content/civil-stipulated-liability";
import { civilContractLossesTopics } from "../../../content/civil-contract-losses";
import {
  civilAgencyTrainingExercises,
  civilAgencyTopics,
} from "../../../content/civil-agency";
import {
  civilContractFormationExercises,
  civilContractFormationTopic,
} from "../../../content/civil-contract-formation";
import { civilContractPerformanceExercises } from "../../../content/civil-insecurity-stages-registration";
import { civilContractPerformanceReadingTopic } from "../../../content/civil-contract-performance-reading";
import {
  civilActValidityExercises,
  civilActValidityTopic,
} from "../../../content/civil-act-validity";
import { civilContractRemediesTopics } from "../../../content/civil-contract-remedies";
import { exerciseFor } from "../../../content/fault-catalog";
import {
  practiceSubject,
  type PracticeMode,
} from "../../../content/practice-set";
import { freshDraft, type FaultProgress } from "../../../domain/fault-progress";
import {
  initializePractice,
  resumePracticeSubject,
  visitPractice,
} from "../../../domain/practice";
import { exposePracticeReference } from "../../../domain/reference-exposure";
import { beginChapterPractice } from "../../../domain/study-space";
import {
  civilContractReviewChapter,
  civilContractReviewKey,
  civilContractReviewQuestion,
  civilContractReviewReady,
} from "../../../content/civil-contract-review";

export type ExplicitCivilEntry =
  | { kind: "library"; reviewUnavailable?: true }
  | { kind: "resume" }
  | { kind: "question"; questionId: string }
  | { kind: "review"; questionId?: string }
  | { kind: "invalid" };

// Selection exposes only existing training forms, not references or holdouts.
export const explicitCivilQuestions = [
  ...civilAgencyTrainingExercises,
  ...civilContractFormationExercises,
  ...civilContractPerformanceExercises,
  ...civilActValidityExercises,
  ...civilContractRemediesTopics.flatMap((topic) => topic.exercises),
  ...civilContractLossesTopics.flatMap((topic) => topic.exercises),
  ...civilStipulatedLiabilityTopics.flatMap((topic) => topic.exercises),
  tortQuestion,
  personalTortQuestion,
  ...civilMovableDeliveryExercises,
  ...civilTortInstigationAssistanceExercises,
  ...civilGuaranteeExercises,
  ...civilFoundationsExercises,
  ...civilPropertyExercises,
  ...civilObligationsExercises,
  ...civilSaleLeaseExercises,
  ...civilGiftLoanExercises,
  ...civilWorkMandateExercises,
  ...civilGuaranteeCoverageExercises,
  ...civilTortSpecialExercises,
  ...civilEducationProductExercises,
  ...civilTrafficMedicalExercises,
  ...civilEnvironmentObjectsExercises,
  ...civilPileTreeRoadExercises,
  ...civilPersonalityExercises,
  ...civilFamilyExercises,
  ...civilInheritanceExercises,
  ...civilQuasiContractExercises,
  ...civilNeighborPossessionExercises,
  ...civilUsufructExercises,
  ...civilServiceContractExercises,
  ...civilFinanceAgencyExercises,
  ...civilProjectTechPartnershipExercises,
  ...civilBoundedGapsExercises,
  ...g8CompletionQuestionsForSubject("civil-law"),
].map((q) => ({
  id: q.id,
  title: q.title,
  kind: q.kind,
}));

export const explicitCivilKnowledgeTopics = [
  ...civilAgencyTopics,
  civilContractFormationTopic,
  civilContractPerformanceReadingTopic,
  civilActValidityTopic,
  ...civilContractRemediesTopics,
  ...civilContractLossesTopics,
  ...civilStipulatedLiabilityTopics,
  tortTopic,
  personalTortTopic,
  ...civilMovableDeliveryTopics,
  ...civilTortInstigationAssistanceTopics,
  ...civilGuaranteeTopics,
  ...civilFoundationsTopics,
  ...civilPropertyTopics,
  ...civilObligationsTopics,
  ...civilSaleLeaseTopics,
  ...civilGiftLoanTopics,
  ...civilWorkMandateTopics,
  ...civilGuaranteeCoverageTopics,
  ...civilTortSpecialTopics,
  ...civilEducationProductTopics,
  ...civilTrafficMedicalTopics,
  ...civilEnvironmentObjectsTopics,
  ...civilPileTreeRoadTopics,
  ...civilPersonalityTopics,
  ...civilFamilyTopics,
  ...civilInheritanceTopics,
  ...civilQuasiContractTopics,
  ...civilNeighborPossessionTopics,
  ...civilUsufructTopics,
  ...civilServiceContractTopics,
  ...civilFinanceAgencyTopics,
  ...civilProjectTechPartnershipTopics,
  ...civilBoundedGapsTopics,
];
export const explicitCivilKnowledge = Object.fromEntries(
  explicitCivilKnowledgeTopics.map((topic) => [
    topic.id,
    { rule: topic.paragraphs.join("\n\n"), omission: topic.pitfall },
  ]),
);

/** Reading is an observation, never mastery; a same-case example exposes reference. */
export function viewExplicitCivilKnowledge(
  state: FaultProgress,
  topicId: string,
  at: string,
  example = false,
): FaultProgress {
  const topic = explicitCivilKnowledgeTopics.find((t) => t.id === topicId);
  if (
    !topic ||
    !state.practice ||
    practiceSubject(state.exerciseId) !== "civil-law"
  )
    return state;
  const q = exerciseFor(state.exerciseId)!;
  const draft = state.drafts[q.id] ?? freshDraft();
  const next = {
    ...state,
    updatedAt: at,
    practice: {
      ...state.practice,
      knowledgeViewed: { ...state.practice.knowledgeViewed, [topicId]: at },
    },
    drafts:
      (q.relatedTopicIds?.includes(topicId) ||
        (q.id === tortQuestion.id && topicId === tortTopic.id) ||
        (q.id === personalTortQuestion.id &&
          topicId === personalTortTopic.id)) &&
      !draft.submittedId
        ? { ...state.drafts, [q.id]: { ...draft, hintUsed: true } }
        : state.drafts,
  };
  return example && q.facts === topic.example.facts
    ? exposePracticeReference(next, q.id)
    : next;
}

/** No implicit subject switch; absent/other subject leaves legacy entry intact. */
export function resolveExplicitCivilEntry(
  params: Record<string, string | string[] | undefined>,
): ExplicitCivilEntry | null {
  if (params.subject !== "civil-law") return null;
  if (params.review !== undefined) {
    if (params.review !== civilContractReviewKey) return { kind: "invalid" };
    if (
      params.question !== undefined &&
      (typeof params.question !== "string" ||
        !civilContractReviewQuestion(params.question))
    )
      return { kind: "invalid" };
    if (!civilContractReviewReady)
      return { kind: "library", reviewUnavailable: true };
    if (params.view === "library") return { kind: "library" };
    return typeof params.question === "string"
      ? { kind: "review", questionId: params.question }
      : { kind: "review" };
  }
  if (params.question !== undefined) {
    if (
      typeof params.question === "string" &&
      civilContractReviewQuestion(params.question)
    )
      return { kind: "review", questionId: params.question };
    return typeof params.question === "string" &&
      explicitCivilQuestions.some((q) => q.id === params.question)
      ? { kind: "question", questionId: params.question }
      : { kind: "invalid" };
  }
  return params.view === "library" ? { kind: "library" } : { kind: "resume" };
}

/** Exact existing forms and production transitions; no schema or scoring change. */
export function enterExplicitCivilPractice(
  state: FaultProgress,
  entry: ExplicitCivilEntry,
  at: string,
  mode?: PracticeMode,
): FaultProgress {
  if (entry.kind === "invalid" || entry.kind === "library") return state;
  if (entry.kind === "review") {
    if (
      !civilContractReviewReady ||
      (entry.questionId !== undefined &&
        !civilContractReviewQuestion(entry.questionId))
    )
      return state;
    const requested =
      entry.questionId ??
      (civilContractReviewQuestion(state.exerciseId)
        ? state.exerciseId
        : state.practice?.subjectPositions?.["civil-law"]?.cursors.subjective);
    if (requested && civilContractReviewQuestion(requested)) {
      if (
        state.exerciseId === requested &&
        state.practice?.chapterId === civilContractReviewChapter.id &&
        state.practice.mode === "subjective" &&
        state.practice.scope === "review" &&
        (!entry.questionId || !state.practice.ended.subjective)
      )
        return state;
      const next = initializePractice(state);
      return visitPractice(
        {
          ...next,
          practice: {
            ...next.practice!,
            mode: "subjective",
            ended: { ...next.practice!.ended, subjective: false },
          },
        },
        requested,
        at,
      );
    }
    return beginChapterPractice(
      state,
      civilContractReviewChapter.id,
      "subjective",
      at,
      "review",
    );
  }
  if (entry.kind === "resume")
    return resumePracticeSubject(state, "civil-law", at, mode);
  const q = explicitCivilQuestions.find((q) => q.id === entry.questionId);
  if (!q) return state;
  const next = resumePracticeSubject(state, "civil-law", at, q.kind);
  return visitPractice(
    {
      ...next,
      practice: {
        ...next.practice!,
        ended: { ...next.practice!.ended, [q.kind]: false },
      },
    },
    q.id,
    at,
  );
}
