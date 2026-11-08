import {
  g8CompletionQuestion,
  g8CompletionSubject,
  g8CompletionTopicForQuestion,
  g8CompletionQueue,
  g8CompletionChapterQueue,
  g8CompletionSameCase,
  g8CompletionRow,
} from "./g8-completion";
import {
  isRemainingG6Subject,
  remainingG6SubjectInfo,
  type RemainingG6Subject,
} from "./remaining-g6-subjects";
import {
  remainingG6Question,
  remainingG6TopicForQuestion,
  remainingG6SameCaseQuestions,
  remainingG6SubjectForQuestion,
  remainingG6QueuesForSubject,
  remainingG6Chapters,
  remainingG6ChapterQueue,
} from "./remaining-g6";
import {
  commercialG5Chapters,
  commercialG5ChapterQueue,
} from "./commercial-g5";
import { ecologyG8Chapters, ecologyG8ChapterQueue } from "./ecology-g8";
import {
  administrativeG4Chapters,
  administrativeG4ChapterQueue,
} from "./administrative-g4";
import {
  criminalProcedureG1Chapters,
  criminalProcedureG1ChapterQueue,
  criminalProcedureG1Question,
  criminalProcedureG1DefaultQueues,
  criminalProcedureG1TopicForQuestion,
  criminalProcedureG1SameCaseQuestions,
} from "./criminal-procedure-g1";
import {
  criminalProcedureFoundationsChapters,
  criminalProcedureFoundationsChapterQueue,
  criminalProcedureFoundationsQuestion,
  criminalProcedureFoundationsDefaultQueues,
  criminalProcedureFoundationsTopicForQuestion,
  criminalProcedureFoundationsSameCaseQuestions,
} from "./criminal-procedure-foundations";
import {
  civilProcedureProceduralDetailsChapters,
  civilProcedureProceduralDetailsChapterQueue,
  civilProcedureProceduralDetailsQuestion,
  civilProcedureProceduralDetailsDefaultQueues,
  civilProcedureProceduralDetailsTopicForQuestion,
  civilProcedureProceduralDetailsSameCaseQuestions,
} from "./civil-procedure-procedural-details";
import {
  civilProcedureGapFillChapters,
  civilProcedureGapFillChapterQueue,
  civilProcedureGapFillQuestion,
  civilProcedureGapFillDefaultQueues,
  civilProcedureGapFillTopicForQuestion,
  civilProcedureGapFillSameCaseQuestions,
} from "./civil-procedure-gap-fill";
import {
  civilProcedureReviewSetForQuestion,
  civilProcedureReviewSets,
} from "./civil-procedure-review";
import {
  civilProcedureArbitrationChapters,
  civilProcedureArbitrationChapterQueue,
  civilProcedureArbitrationQuestion,
  civilProcedureArbitrationDefaultQueues,
  civilProcedureArbitrationTopicForQuestion,
  civilProcedureArbitrationSameCaseQuestions,
} from "./civil-procedure-arbitration";
import {
  civilProcedureForeignChapters,
  civilProcedureForeignChapterQueue,
  civilProcedureForeignQuestion,
  civilProcedureForeignDefaultQueues,
  civilProcedureForeignTopicForQuestion,
  civilProcedureForeignSameCaseQuestions,
} from "./civil-procedure-foreign";
import {
  civilProcedureExecutionChapters,
  civilProcedureExecutionChapterQueue,
  civilProcedureExecutionQuestion,
  civilProcedureExecutionDefaultQueues,
  civilProcedureExecutionTopicForQuestion,
  civilProcedureExecutionSameCaseQuestions,
} from "./civil-procedure-execution";
import {
  civilProcedureRemediesSpecialChapters,
  civilProcedureRemediesSpecialChapterQueue,
  civilProcedureRemediesSpecialQuestion,
  civilProcedureRemediesSpecialDefaultQueues,
  civilProcedureRemediesSpecialTopicForQuestion,
  civilProcedureRemediesSpecialSameCaseQuestions,
} from "./civil-procedure-remedies-special";
import {
  civilProcedureFirstInstanceChapters,
  civilProcedureFirstInstanceChapterQueue,
  civilProcedureFirstInstanceQuestion,
  civilProcedureFirstInstanceDefaultQueues,
  civilProcedureFirstInstanceTopicForQuestion,
  civilProcedureFirstInstanceSameCaseQuestions,
} from "./civil-procedure-first-instance";
import {
  civilProcedureEvidenceProcessChapters,
  civilProcedureEvidenceProcessChapterQueue,
  civilProcedureEvidenceProcessQuestion,
  civilProcedureEvidenceProcessDefaultQueues,
  civilProcedureEvidenceProcessTopicForQuestion,
  civilProcedureEvidenceProcessSameCaseQuestions,
} from "./civil-procedure-evidence-process";
import {
  civilProcedureFoundationsChapters,
  civilProcedureFoundationsChapterQueue,
  civilProcedureFoundationsQuestion,
  civilProcedureFoundationsDefaultQueues,
  civilProcedureFoundationsTopicForQuestion,
  civilProcedureFoundationsSameCaseQuestions,
} from "./civil-procedure-foundations";
import {
  civilProcedurePartiesChapters,
  civilProcedurePartiesChapterQueue,
  civilProcedurePartiesQuestion,
  civilProcedurePartiesDefaultQueues,
  civilProcedurePartiesTopicForQuestion,
  civilProcedurePartiesSameCaseQuestions,
} from "./civil-procedure-parties";
import {
  civilBoundedGapsChapters,
  civilBoundedGapsQuestion,
  civilBoundedGapsDefaultQueues,
  civilBoundedGapsTopicForQuestion,
  civilBoundedGapsSameCaseQuestions,
  civilBoundedGapsChapterQueue,
} from "./civil-bounded-gaps";
import {
  civilProjectTechPartnershipChapters,
  civilProjectTechPartnershipQuestion,
  civilProjectTechPartnershipDefaultQueues,
  civilProjectTechPartnershipTopicForQuestion,
  civilProjectTechPartnershipSameCaseQuestions,
  civilProjectTechPartnershipChapterQueue,
} from "./civil-project-tech-partnership";
import {
  civilFinanceAgencyChapters,
  civilFinanceAgencyQuestion,
  civilFinanceAgencyDefaultQueues,
  civilFinanceAgencyTopicForQuestion,
  civilFinanceAgencySameCaseQuestions,
  civilFinanceAgencyChapterQueue,
} from "./civil-finance-agency";
import {
  civilServiceContractChapters,
  civilServiceContractQuestion,
  civilServiceContractDefaultQueues,
  civilServiceContractTopicForQuestion,
  civilServiceContractSameCaseQuestions,
  civilServiceContractChapterQueue,
} from "./civil-service-contract";
import {
  civilUsufructChapters,
  civilUsufructQuestion,
  civilUsufructDefaultQueues,
  civilUsufructTopicForQuestion,
  civilUsufructSameCaseQuestions,
  civilUsufructChapterQueue,
} from "./civil-usufruct";
import {
  civilNeighborPossessionChapters,
  civilNeighborPossessionQuestion,
  civilNeighborPossessionDefaultQueues,
  civilNeighborPossessionTopicForQuestion,
  civilNeighborPossessionSameCaseQuestions,
  civilNeighborPossessionChapterQueue,
} from "./civil-neighbor-possession";
import {
  civilQuasiContractChapters,
  civilQuasiContractQuestion,
  civilQuasiContractDefaultQueues,
  civilQuasiContractTopicForQuestion,
  civilQuasiContractSameCaseQuestions,
  civilQuasiContractChapterQueue,
} from "./civil-quasi-contract";
import {
  civilInheritanceChapters,
  civilInheritanceQuestion,
  civilInheritanceDefaultQueues,
  civilInheritanceTopicForQuestion,
  civilInheritanceSameCaseQuestions,
  civilInheritanceChapterQueue,
} from "./civil-inheritance";
import {
  civilFamilyChapters,
  civilFamilyQuestion,
  civilFamilyDefaultQueues,
  civilFamilyTopicForQuestion,
  civilFamilySameCaseQuestions,
  civilFamilyChapterQueue,
} from "./civil-family";
import {
  civilPersonalityChapters,
  civilPersonalityQuestion,
  civilPersonalityDefaultQueues,
  civilPersonalityTopicForQuestion,
  civilPersonalitySameCaseQuestions,
  civilPersonalityChapterQueue,
} from "./civil-personality";
import {
  civilPileTreeRoadChapters,
  civilPileTreeRoadQuestion,
  civilPileTreeRoadDefaultQueues,
  civilPileTreeRoadTopicForQuestion,
  civilPileTreeRoadSameCaseQuestions,
  civilPileTreeRoadChapterQueue,
} from "./civil-pile-tree-road";
import {
  civilEnvironmentObjectsChapters,
  civilEnvironmentObjectsQuestion,
  civilEnvironmentObjectsDefaultQueues,
  civilEnvironmentObjectsTopicForQuestion,
  civilEnvironmentObjectsSameCaseQuestions,
  civilEnvironmentObjectsChapterQueue,
} from "./civil-environment-objects";
import {
  civilTrafficMedicalChapters,
  civilTrafficMedicalQuestion,
  civilTrafficMedicalDefaultQueues,
  civilTrafficMedicalTopicForQuestion,
  civilTrafficMedicalSameCaseQuestions,
  civilTrafficMedicalChapterQueue,
} from "./civil-traffic-medical";
import {
  civilEducationProductChapters,
  civilEducationProductQuestion,
  civilEducationProductDefaultQueues,
  civilEducationProductTopicForQuestion,
  civilEducationProductSameCaseQuestions,
  civilEducationProductChapterQueue,
} from "./civil-education-product";
import {
  civilTortSpecialChapters,
  civilTortSpecialQuestion,
  civilTortSpecialDefaultQueues,
  civilTortSpecialTopicForQuestion,
  civilTortSpecialSameCaseQuestions,
  civilTortSpecialChapterQueue,
} from "./civil-tort-special";
import {
  civilGuaranteeCoverageChapters,
  civilGuaranteeCoverageQuestion,
  civilGuaranteeCoverageDefaultQueues,
  civilGuaranteeCoverageTopicForQuestion,
  civilGuaranteeCoverageSameCaseQuestions,
  civilGuaranteeCoverageChapterQueue,
} from "./civil-guarantee-coverage";
import {
  civilWorkMandateChapters,
  civilWorkMandateQuestion,
  civilWorkMandateDefaultQueues,
  civilWorkMandateTopicForQuestion,
  civilWorkMandateSameCaseQuestions,
  civilWorkMandateChapterQueue,
} from "./civil-work-mandate";
import {
  civilGiftLoanChapters,
  civilGiftLoanQuestion,
  civilGiftLoanDefaultQueues,
  civilGiftLoanTopicForQuestion,
  civilGiftLoanSameCaseQuestions,
  civilGiftLoanChapterQueue,
} from "./civil-gift-loan";
import {
  civilSaleLeaseChapters,
  civilSaleLeaseQuestion,
  civilSaleLeaseDefaultQueues,
  civilSaleLeaseTopicForQuestion,
  civilSaleLeaseSameCaseQuestions,
  civilSaleLeaseChapterQueue,
} from "./civil-sale-lease";
import {
  civilObligationsChapters,
  civilObligationsQuestion,
  civilObligationsDefaultQueues,
  civilObligationsTopicForQuestion,
  civilObligationsSameCaseQuestions,
  civilObligationsChapterQueue,
} from "./civil-obligations";
import {
  civilPropertyChapters,
  civilPropertyQuestion,
  civilPropertyDefaultQueues,
  civilPropertyTopicForQuestion,
  civilPropertySameCaseQuestions,
  civilPropertyChapterQueue,
} from "./civil-property";
import {
  civilFoundationsChapters,
  civilFoundationsQuestion,
  civilFoundationsDefaultQueues,
  civilFoundationsTopicForQuestion,
  civilFoundationsSameCaseQuestions,
  civilFoundationsChapterQueue,
} from "./civil-foundations";
import {
  historicalPracticeTopic,
  historicalPracticeQuestion,
} from "./practice-content-history";
import {
  civilProcedureAgentAuthorityChapter,
  civilProcedureAgentAuthorityDefaultQueues,
  civilProcedureAgentAuthorityQuestion,
  civilProcedureAgentAuthoritySameCaseQuestions,
  civilProcedureAgentAuthorityTopicForQuestion,
} from "./civil-procedure-agent-authority";
import {
  criminalProcedureArrestReviewChapter,
  criminalProcedureArrestReviewDefaultQueues,
  criminalProcedureArrestReviewQuestion,
  criminalProcedureArrestReviewTopicForQuestion,
  criminalProcedureArrestReviewSameCaseQuestions,
} from "./criminal-procedure-arrest-review";
import {
  criminalProcedureBailChapter,
  criminalProcedureBailDefaultQueues,
  criminalProcedureBailQuestion,
  criminalProcedureBailTopicForQuestion,
  criminalProcedureBailSameCaseQuestions,
} from "./criminal-procedure-bail";
import {
  civilGuaranteeChapter,
  civilGuaranteeDefaultQueues,
  civilGuaranteeQuestion,
  civilGuaranteeTopicForQuestion,
  civilGuaranteeSameCaseQuestions,
} from "./civil-guarantee";
import {
  criminalProcedureDefenseChapter,
  criminalProcedureDefenseDefaultQueues,
  criminalProcedureDefenseQuestion,
  criminalProcedureDefenseTopicForQuestion,
  criminalProcedureDefenseSameCaseQuestions,
} from "./criminal-procedure-defense";
import {
  civilProcedureProofBurdenChapter,
  civilProcedureProofBurdenDefaultQueues,
  civilProcedureProofBurdenQuestion,
  civilProcedureProofBurdenSameCaseQuestions,
  civilProcedureProofBurdenTopicForQuestion,
} from "./civil-procedure-evidence-registration";
import {
  commercialQuestion,
  commercialTopicForQuestion,
  commercialChapter,
  commercialDefaultQueues,
  commercialSameCaseQuestions,
} from "./commercial-registration";
import {
  criminalProcedureBurdenDefaultQueues,
  criminalProcedureBurdenQuestion,
  criminalProcedureBurdenSameCaseQuestions,
  criminalProcedureBurdenTopicForQuestion,
} from "./criminal-procedure-burden";
import {
  civilTortInstigationAssistanceChapter,
  civilTortInstigationAssistanceDefaultQueues,
  civilTortInstigationAssistanceQuestion,
  civilTortInstigationAssistanceSameCaseQuestions,
  civilTortInstigationAssistanceTopicForQuestion,
} from "./civil-tort-instigation-assistance";
import {
  administrativeQuestion,
  administrativeTopicForQuestion,
  administrativeChapter,
  administrativeDefaultQueues,
  administrativeSameCaseQuestions,
} from "./administrative-registration";
import {
  criminalProcedurePartialCorroborationDefaultQueues,
  criminalProcedurePartialCorroborationQuestion,
  criminalProcedurePartialCorroborationSameCaseQuestions,
  criminalProcedurePartialCorroborationTopicId,
} from "./criminal-procedure-partial-corroboration";
import {
  criminalProcedureExclusionDefaultQueues,
  criminalProcedureExclusionQuestion,
  criminalProcedureExclusionSameCaseQuestions,
  criminalProcedureExclusionTopicForQuestion,
} from "./criminal-procedure-legality-registration";
import {
  criminalProcedureProofChapter,
  criminalProcedureProofDefaultQueues,
  criminalProcedureProofQuestion,
  criminalProcedureProofSameCaseQuestions,
  criminalProcedureProofTopicForQuestion,
} from "./criminal-procedure-proof";
import {
  civilProcedureUnperformedTransferDefaultQueues,
  civilProcedureUnperformedTransferQuestion,
  civilProcedureUnperformedTransferSameCaseQuestions,
  civilProcedureUnperformedTransferTopicId,
} from "./civil-procedure-unperformed-transfer";
import {
  civilMovableDeliveryChapter,
  civilMovableDeliveryDefaultQueues,
  civilMovableDeliveryQuestion,
  civilMovableDeliverySameCaseQuestions,
  civilMovableDeliveryTopicForQuestion,
} from "./civil-movable-delivery";
import {
  civilProcedureUnagreedVenueChapter,
  civilProcedureUnagreedVenueDefaultQueues,
  civilProcedureUnagreedVenueQuestion,
  civilProcedureUnagreedVenueSameCaseQuestions,
  civilProcedureUnagreedVenueTopicForQuestion,
} from "./civil-procedure-unagreed-venue";
import {
  personalTortChapter,
  personalTortDefaultQueues,
  personalTortQuestion,
  personalTortQuestionFor,
  personalTortTopic,
} from "./civil-tort-personal";
import {
  tortChapter,
  tortDefaultQueues,
  tortQuestion,
  tortQuestionFor,
  tortTopic,
} from "./civil-tort-property";
import {
  civilProcedureReviewChapter,
  civilProcedureReviewQueues,
  civilProcedureReviewQuestion,
} from "./civil-procedure-review";
import {
  civilProcedureContractVenueChapter,
  civilProcedureContractVenueDefaultQueues,
  civilProcedureContractVenueQuestion,
  civilProcedureContractVenueSameCaseQuestions,
  civilProcedureContractVenueTopicForQuestion,
} from "./civil-procedure-contract-venue";
import {
  civilProcedureJurisdictionResponseChapter,
  civilProcedureJurisdictionResponseDefaultQueues,
  civilProcedureJurisdictionResponseQuestion,
  civilProcedureJurisdictionResponseSameCaseQuestions,
  civilProcedureJurisdictionResponseTopicForQuestion,
} from "./civil-procedure-jurisdiction-response";
import {
  civilContractReviewChapter,
  civilContractReviewQueues,
  civilContractReviewQuestion,
} from "./civil-contract-review";
import { civilContractIntegratedSameCaseQuestions } from "./civil-contract-integrated-case";
import {
  civilStipulatedLiabilityChapter,
  civilStipulatedLiabilityDefaultQueues,
  civilStipulatedLiabilityQuestion,
  civilStipulatedLiabilitySameCaseQuestions,
  civilStipulatedLiabilityTopicForQuestion,
} from "./civil-stipulated-liability";
import {
  civilContractLossesChapter,
  civilContractLossesDefaultQueues,
  civilContractLossesQuestion,
  civilContractLossesSameCaseQuestions,
  civilContractLossesTopicForQuestion,
} from "./civil-contract-losses";
import {
  unpublishedTradingCases,
  unpublishedTradingKnowledge,
} from "./criminal-unpublished-trading";
import { stateUnityCases, stateUnityKnowledge } from "./criminal-state-unity";
import {
  specialAccidentCases,
  specialAccidentKnowledge,
} from "./criminal-special-accidents";
import {
  witnessRetaliationCases,
  witnessRetaliationKnowledge,
} from "./criminal-witness-retaliation";
import {
  custodyEscortCases,
  custodyEscortKnowledge,
} from "./criminal-custody-escort";
import { courtOrderItemCases } from "./criminal-court-order-items";
import { courtOrderCases, courtOrderKnowledge } from "./criminal-court-order";
import { statutoryBoundaryCases } from "./criminal-person-gaps/statutory-boundaries";
import { rescueObstructionCases } from "./criminal-person-gaps/rescue-obstruction";
import { resaleCases, resaleKnowledge } from "./criminal-person-gaps/resale";
import {
  minorOrganizationCases,
  minorOrganizationKnowledge,
} from "./criminal-person-gaps/minor-organization";
import { personGapCases } from "./criminal-person-gaps";
import { personGapKnowledge } from "./criminal-person-gaps/knowledge";
import { executionCases } from "./criminal-execution";
import { executionKnowledge } from "./criminal-execution/knowledge";
import { generalGapCases } from "./criminal-general-gaps";
import { generalGapKnowledge } from "./criminal-general-gaps/knowledge";
import { basicsKnowledgeCorrections } from "./criminal-basics-knowledge-corrections";
import { exerciseFor, learningTopics, topicFor } from "./fault-catalog";
import { practiceFaultCases } from "./practice-fault-cases";
import {
  objectMistakeCases,
  objectMistakeKnowledge,
  objectMistakeTopic,
} from "./object-mistake";
import {
  blowMistakeCases,
  blowMistakeKnowledge,
  blowMistakeTopic,
} from "./blow-mistake";
import { currentPracticeId } from "./practice-replacements";
import { foundationCases } from "./criminal-foundation-samples";
import { foundationKnowledge } from "./criminal-foundation-topics";
import { packageOneCases } from "./criminal-package-one";
import { packageOneKnowledge } from "./criminal-package-one/knowledge";
import { generalCases } from "./criminal-general";
import { generalKnowledge } from "./criminal-general/knowledge";
import { personCases } from "./criminal-person";
import { personKnowledge } from "./criminal-person/knowledge";
import { propertyCases } from "./criminal-property";
import { propertyKnowledge } from "./criminal-property/knowledge";
import { safetyCases } from "./criminal-safety";
import { explosionCases } from "./criminal-explosion";
import { negligentExplosionCases } from "./criminal-negligent-explosion";
import { educationFacilitiesCases } from "./criminal-education-facilities";
import {
  broadcastFacilitiesCases,
  broadcastFacilitiesKnowledge,
} from "./criminal-broadcast-facilities";
import { safetyKnowledge } from "./criminal-safety/knowledge";
import { economicCases } from "./criminal-economic";
import { economicKnowledge } from "./criminal-economic/knowledge";
import { socialCases } from "./criminal-social";
import { socialKnowledge } from "./criminal-social/knowledge";
import { officeCases } from "./criminal-office";
import { officeKnowledge } from "./criminal-office/knowledge";
import { capstoneLongCases, capstoneGapCases } from "./criminal-capstone";
import { capstoneKnowledge } from "./criminal-capstone/knowledge";
const chapterCases = [
  ...unpublishedTradingCases,
  ...stateUnityCases,
  ...specialAccidentCases,
  ...witnessRetaliationCases,
  ...custodyEscortCases,
  ...courtOrderCases,
  ...courtOrderItemCases,
  ...statutoryBoundaryCases,
  ...rescueObstructionCases,
  ...resaleCases,
  ...minorOrganizationCases,
  ...personGapCases,
  ...packageOneCases,
  ...generalCases,
  ...generalGapCases,
  ...executionCases,
  ...personCases,
  ...propertyCases,
  ...safetyCases,
  ...broadcastFacilitiesCases,
  ...explosionCases,
  ...negligentExplosionCases,
  ...educationFacilitiesCases,
  ...economicCases,
  ...socialCases,
  ...officeCases,
  ...capstoneGapCases,
];
// Published case membership is static for this module's lifetime. Resolve
// replacements once instead of rescanning every case on each queue lookup.
const chapterReviewIds = new Set(
  chapterCases
    .filter((c) => c.review)
    .map((c) => currentPracticeId(c.exercise.id)),
);
export const isChapterReview = (id: string) =>
  Boolean(civilProcedureReviewQuestion(id)) ||
  Boolean(civilContractReviewQuestion(id)) ||
  chapterReviewIds.has(currentPracticeId(id));
import {
  chapterFor,
  chapterForTopic,
  criminalChapters,
} from "./criminal-curriculum";
export { currentPracticeId } from "./practice-replacements";

export type PracticeMode = "objective" | "subjective";
export type PracticeScope = "topic" | "review";
export type PracticeSubject =
  | "criminal-law"
  | "civil-law"
  | "civil-procedure"
  | "criminal-procedure"
  | "administrative-law"
  | "commercial-law"
  | RemainingG6Subject;
export type PracticeSubjectInfo = {
  readonly label:
    | "刑法"
    | "民法"
    | "民诉"
    | "刑诉"
    | "行政法"
    | "商法"
    | "商法与经济法"
    | (typeof remainingG6SubjectInfo)[RemainingG6Subject]["label"];
  readonly href:
    | "/lab/practice"
    | "/lab/practice?subject=civil-law"
    | "/lab/practice?subject=civil-procedure"
    | "/lab/practice?subject=criminal-procedure"
    | "/lab/practice?subject=administrative-law"
    | "/lab/practice?subject=commercial-law"
    | `/lab/practice?subject=${RemainingG6Subject}`;
  readonly libraryHref:
    | "/lab/practice?view=library"
    | "/lab/practice?subject=civil-law&view=library"
    | "/lab/practice?subject=civil-procedure&view=library"
    | "/lab/practice?subject=criminal-procedure&view=library"
    | "/lab/practice?subject=administrative-law&view=library"
    | "/lab/practice?subject=commercial-law&view=library"
    | `/lab/practice?subject=${RemainingG6Subject}&view=library`;
};
const subjectInfo: Record<PracticeSubject, PracticeSubjectInfo> = {
  "theory-law": {
    label: remainingG6SubjectInfo["theory-law"].label,
    href: "/lab/practice?subject=theory-law",
    libraryHref: "/lab/practice?subject=theory-law&view=library",
  },
  "legal-profession": {
    label: remainingG6SubjectInfo["legal-profession"].label,
    href: "/lab/practice?subject=legal-profession",
    libraryHref: "/lab/practice?subject=legal-profession&view=library",
  },
  "international-law": {
    label: remainingG6SubjectInfo["international-law"].label,
    href: "/lab/practice?subject=international-law",
    libraryHref: "/lab/practice?subject=international-law&view=library",
  },
  "intellectual-property": {
    label: remainingG6SubjectInfo["intellectual-property"].label,
    href: "/lab/practice?subject=intellectual-property",
    libraryHref: "/lab/practice?subject=intellectual-property&view=library",
  },
  "commercial-law": {
    label: "商法与经济法",
    href: "/lab/practice?subject=commercial-law",
    libraryHref: "/lab/practice?subject=commercial-law&view=library",
  },
  "administrative-law": {
    label: "行政法",
    href: "/lab/practice?subject=administrative-law",
    libraryHref: "/lab/practice?subject=administrative-law&view=library",
  },
  "criminal-procedure": {
    label: "刑诉",
    href: "/lab/practice?subject=criminal-procedure",
    libraryHref: "/lab/practice?subject=criminal-procedure&view=library",
  },
  "criminal-law": {
    label: "刑法",
    href: "/lab/practice",
    libraryHref: "/lab/practice?view=library",
  },
  "civil-law": {
    label: "民法",
    href: "/lab/practice?subject=civil-law",
    libraryHref: "/lab/practice?subject=civil-law&view=library",
  },
  "civil-procedure": {
    label: "民诉",
    href: "/lab/practice?subject=civil-procedure",
    libraryHref: "/lab/practice?subject=civil-procedure&view=library",
  },
};
/** Explicit subject labels/URLs only; no storage or automatic subject change. */
export const practiceSubjectInfo = (
  subject: PracticeSubject | undefined,
): PracticeSubjectInfo => subjectInfo[subject ?? "criminal-law"];

const originalPracticeGroups = [
  {
    topicId: "intent",
    ids: [
      "intent-tolerate-choice",
      "intent-possible",
      "intent-tolerate",
      "intent-exam-equipment",
    ],
  },
  {
    topicId: "confidence",
    ids: [
      "confidence-skill",
      "confidence-skill-reason",
      "focus-result",
      "confidence-contrast",
      "reasoning-unknown",
      "reasoning-evidence",
      "confidence-exam-cart",
    ],
  },
  {
    topicId: "negligence",
    ids: [
      "negligence-inspection",
      "negligence-inspection-reason",
      "negligence-exam-return",
      "negligence-exam-brake",
    ],
  },
  {
    topicId: "accident",
    ids: [
      "accident-hidden",
      "accident-hidden-reason",
      "accident-exam-rockfall",
      "accident-exam-condition",
    ],
  },
];
const previousPracticeGroups = [
  ...originalPracticeGroups,
  {
    topicId: objectMistakeTopic.id,
    ids: objectMistakeCases.map(({ exercise }) => exercise.id),
  },
  {
    topicId: blowMistakeTopic.id,
    ids: blowMistakeCases.map(({ exercise }) => exercise.id),
  },
].map((group) => ({
  ...group,
  ids: group.ids.map(currentPracticeId),
}));
export const practiceGroups = criminalChapters.flatMap((chapter) =>
  chapter.topicIds.map((topicId) => ({
    topicId,
    ids: [
      ...(previousPracticeGroups.find((g) => g.topicId === topicId)?.ids ?? []),
      ...foundationCases
        .filter((c) => c.topicId === topicId)
        .map((c) => c.exercise.id),
      ...chapterCases
        .filter((c) => c.topicId === topicId)
        .map((c) => currentPracticeId(c.exercise.id)),
    ],
  })),
);
export const isExamPractice = (id: string) =>
  chapterCases.some(
    (c) => c.exam && currentPracticeId(c.exercise.id) === currentPracticeId(id),
  ) ||
  foundationCases.some((c) => c.exam && c.exercise.id === id) ||
  blowMistakeCases.some((c) => c.exam && c.exercise.id === id) ||
  objectMistakeCases.some((c) => c.exam && c.exercise.id === id) ||
  ["intent-exam-equipment", "confidence-exam-cart"].some(
    (old) => currentPracticeId(old) === currentPracticeId(id),
  ) ||
  practiceFaultCases.some(
    (c) => c.exam && currentPracticeId(c.exercise.id) === currentPracticeId(id),
  );
// An ordered chapter; topic groups remain adjacent within each question type.
export const practiceQueues: Record<PracticeMode, string[]> = {
  objective: practiceGroups
    .flatMap((g) => g.ids)
    .filter((id) => exerciseFor(id)?.kind === "objective"),
  subjective: practiceGroups
    .flatMap((g) => g.ids)
    .filter((id) => exerciseFor(id)?.kind === "subjective"),
};
export const currentQuestionIds = [
  ...practiceGroups.flatMap((g) => g.ids),
  ...capstoneLongCases.map((c) => currentPracticeId(c.exercise.id)),
];
export const longQuestionsForTopic = (id: string) =>
  capstoneLongCases
    .filter((c) => c.topicId === id)
    .map((c) => currentPracticeId(c.exercise.id));
// A learner may finish a saved old question. New entries always use the current
// queue; navigating away does not carry the old answer into its replacement.
export const isPracticeLocation = (id: string, mode: PracticeMode) =>
  exerciseFor(id)?.kind === mode &&
  (practiceQueues[mode].includes(currentPracticeId(id)) ||
    Boolean(
      g8CompletionQuestion(id) ||
      remainingG6Question(id) ||
      historicalPracticeQuestion(id) ||
      commercialQuestion(id) ||
      administrativeQuestion(id) ||
      criminalProcedureG1Question(id) ||
      criminalProcedureFoundationsQuestion(id) ||
      criminalProcedureArrestReviewQuestion(id) ||
      criminalProcedureBailQuestion(id) ||
      criminalProcedureDefenseQuestion(id) ||
      criminalProcedureBurdenQuestion(id) ||
      criminalProcedurePartialCorroborationQuestion(id) ||
      criminalProcedureExclusionQuestion(id) ||
      criminalProcedureProofQuestion(id) ||
      civilProcedureReviewQuestion(id) ||
      civilContractReviewQuestion(id) ||
      civilAgencyQuestion(id) ||
      civilContractFormationQuestion(id) ||
      civilContractPerformanceQuestion(id) ||
      civilActValidityQuestion(id) ||
      civilProcedureFilingVenueQuestion(id) ||
      civilProcedureJurisdictionResponseQuestion(id) ||
      civilProcedureContractVenueQuestion(id) ||
      civilProcedureUnagreedVenueQuestion(id) ||
      civilProcedureUnperformedTransferQuestion(id) ||
      civilProcedureProofBurdenQuestion(id) ||
      civilProcedureAgentAuthorityQuestion(id) ||
      civilProcedureProceduralDetailsQuestion(id) ||
      civilProcedureGapFillQuestion(id) ||
      civilProcedureArbitrationQuestion(id) ||
      civilProcedureForeignQuestion(id) ||
      civilProcedureExecutionQuestion(id) ||
      civilProcedureRemediesSpecialQuestion(id) ||
      civilProcedureFirstInstanceQuestion(id) ||
      civilProcedureEvidenceProcessQuestion(id) ||
      civilProcedureFoundationsQuestion(id) ||
      civilProcedurePartiesQuestion(id) ||
      civilContractRemediesQuestion(id) ||
      civilContractLossesQuestion(id) ||
      civilStipulatedLiabilityQuestion(id) ||
      civilMovableDeliveryQuestion(id) ||
      civilFoundationsQuestion(id) ||
      civilBoundedGapsQuestion(id) ||
      civilProjectTechPartnershipQuestion(id) ||
      civilFinanceAgencyQuestion(id) ||
      civilServiceContractQuestion(id) ||
      civilUsufructQuestion(id) ||
      civilNeighborPossessionQuestion(id) ||
      civilQuasiContractQuestion(id) ||
      civilInheritanceQuestion(id) ||
      civilFamilyQuestion(id) ||
      civilPersonalityQuestion(id) ||
      civilPileTreeRoadQuestion(id) ||
      civilEnvironmentObjectsQuestion(id) ||
      civilTrafficMedicalQuestion(id) ||
      civilEducationProductQuestion(id) ||
      civilTortSpecialQuestion(id) ||
      civilGuaranteeCoverageQuestion(id) ||
      civilWorkMandateQuestion(id) ||
      civilGiftLoanQuestion(id) ||
      civilSaleLeaseQuestion(id) ||
      civilObligationsQuestion(id) ||
      civilPropertyQuestion(id) ||
      civilGuaranteeQuestion(id) ||
      civilTortInstigationAssistanceQuestion(id) ||
      tortQuestionFor(id) ||
      personalTortQuestionFor(id),
    ));
const previousPracticeSubject = (id: string): PracticeSubject | undefined =>
  civilBoundedGapsQuestion(id) ||
  civilProjectTechPartnershipQuestion(id) ||
  civilFinanceAgencyQuestion(id) ||
  civilServiceContractQuestion(id) ||
  civilUsufructQuestion(id) ||
  civilNeighborPossessionQuestion(id) ||
  civilQuasiContractQuestion(id) ||
  civilInheritanceQuestion(id) ||
  civilFamilyQuestion(id) ||
  civilPersonalityQuestion(id) ||
  civilPileTreeRoadQuestion(id) ||
  civilEnvironmentObjectsQuestion(id) ||
  civilTrafficMedicalQuestion(id) ||
  civilEducationProductQuestion(id) ||
  civilTortSpecialQuestion(id) ||
  civilGuaranteeCoverageQuestion(id) ||
  civilWorkMandateQuestion(id) ||
  civilGiftLoanQuestion(id) ||
  civilSaleLeaseQuestion(id) ||
  civilObligationsQuestion(id) ||
  civilPropertyQuestion(id) ||
  civilFoundationsQuestion(id) ||
  civilContractReviewQuestion(id) ||
  civilAgencyQuestion(id) ||
  civilContractFormationQuestion(id) ||
  civilContractPerformanceQuestion(id) ||
  civilActValidityQuestion(id) ||
  civilContractRemediesQuestion(id) ||
  civilContractLossesQuestion(id) ||
  civilStipulatedLiabilityQuestion(id) ||
  civilMovableDeliveryQuestion(id) ||
  civilGuaranteeQuestion(id) ||
  civilTortInstigationAssistanceQuestion(id) ||
  tortQuestionFor(id) ||
  personalTortQuestionFor(id)
    ? "civil-law"
    : exerciseFor(id)
      ? "criminal-law"
      : undefined;
const currentPracticeSubject = (id: string): PracticeSubject | undefined =>
  remainingG6SubjectForQuestion(id) ?? beforeRemainingG6PracticeSubject(id);
const beforeRemainingG6PracticeSubject = (
  id: string,
): PracticeSubject | undefined =>
  commercialQuestion(id)
    ? "commercial-law"
    : administrativeQuestion(id)
      ? "administrative-law"
      : criminalProcedureG1Question(id) ||
          criminalProcedureFoundationsQuestion(id) ||
          criminalProcedureArrestReviewQuestion(id) ||
          criminalProcedureBailQuestion(id) ||
          criminalProcedureDefenseQuestion(id) ||
          criminalProcedureBurdenQuestion(id) ||
          criminalProcedurePartialCorroborationQuestion(id) ||
          criminalProcedureExclusionQuestion(id) ||
          criminalProcedureProofQuestion(id)
        ? "criminal-procedure"
        : civilProcedureReviewQuestion(id) ||
            civilProcedureFilingVenueQuestion(id) ||
            civilProcedureJurisdictionResponseQuestion(id) ||
            civilProcedureContractVenueQuestion(id) ||
            civilProcedureUnagreedVenueQuestion(id) ||
            civilProcedureUnperformedTransferQuestion(id) ||
            civilProcedureProofBurdenQuestion(id) ||
            civilProcedureAgentAuthorityQuestion(id) ||
            civilProcedurePartiesQuestion(id) ||
            civilProcedureFoundationsQuestion(id) ||
            civilProcedureEvidenceProcessQuestion(id) ||
            civilProcedureFirstInstanceQuestion(id) ||
            civilProcedureRemediesSpecialQuestion(id) ||
            civilProcedureExecutionQuestion(id) ||
            civilProcedureForeignQuestion(id) ||
            civilProcedureArbitrationQuestion(id) ||
            civilProcedureGapFillQuestion(id) ||
            civilProcedureProceduralDetailsQuestion(id)
          ? "civil-procedure"
          : previousPracticeSubject(id);
export const practiceSubject = (id: string): PracticeSubject | undefined =>
  g8CompletionSubject(currentPracticeId(id)) ??
  currentPracticeSubject(currentPracticeId(id));

// These queues are used only after an explicit subject entry. Criminal defaults
// remain unchanged, and the two civil transfer forms need an explicit question ID.
const civilSubjectQueues = {
  objective: [
    ...civilAgencyDefaultQueues.objective,
    ...civilContractFormationDefaultQueues.objective,
    ...civilContractPerformanceDefaultQueues.objective,
    ...civilActValidityDefaultQueues.objective,
    ...civilContractRemediesDefaultQueues.objective,
    ...civilContractLossesDefaultQueues.objective,
    ...civilStipulatedLiabilityDefaultQueues.objective,
    ...civilMovableDeliveryDefaultQueues.objective,
    ...civilTortInstigationAssistanceDefaultQueues.objective,
    ...civilGuaranteeDefaultQueues.objective,
    ...civilFoundationsDefaultQueues.objective,
    ...civilPropertyDefaultQueues.objective,
    ...civilObligationsDefaultQueues.objective,
    ...civilSaleLeaseDefaultQueues.objective,
    ...civilGiftLoanDefaultQueues.objective,
    ...civilWorkMandateDefaultQueues.objective,
    ...civilGuaranteeCoverageDefaultQueues.objective,
    ...civilTortSpecialDefaultQueues.objective,
    ...civilEducationProductDefaultQueues.objective,
    ...civilTrafficMedicalDefaultQueues.objective,
    ...civilEnvironmentObjectsDefaultQueues.objective,
    ...civilPileTreeRoadDefaultQueues.objective,
    ...civilPersonalityDefaultQueues.objective,
    ...civilFamilyDefaultQueues.objective,
    ...civilInheritanceDefaultQueues.objective,
    ...civilQuasiContractDefaultQueues.objective,
    ...civilNeighborPossessionDefaultQueues.objective,
    ...civilUsufructDefaultQueues.objective,
    ...civilServiceContractDefaultQueues.objective,
    ...civilFinanceAgencyDefaultQueues.objective,
    ...civilProjectTechPartnershipDefaultQueues.objective,
    ...civilBoundedGapsDefaultQueues.objective,
  ],
  subjective: [
    ...civilAgencyDefaultQueues.subjective,
    ...civilContractFormationDefaultQueues.subjective,
    ...civilContractPerformanceDefaultQueues.subjective,
    ...civilActValidityDefaultQueues.subjective,
    ...civilContractRemediesDefaultQueues.subjective,
    ...civilContractLossesDefaultQueues.subjective,
    ...civilStipulatedLiabilityDefaultQueues.subjective,
    ...tortDefaultQueues.subjective,
    ...personalTortDefaultQueues.subjective,
    ...civilMovableDeliveryDefaultQueues.subjective,
    ...civilTortInstigationAssistanceDefaultQueues.subjective,
    ...civilGuaranteeDefaultQueues.subjective,
    ...civilFoundationsDefaultQueues.subjective,
    ...civilPropertyDefaultQueues.subjective,
    ...civilObligationsDefaultQueues.subjective,
    ...civilSaleLeaseDefaultQueues.subjective,
    ...civilGiftLoanDefaultQueues.subjective,
    ...civilWorkMandateDefaultQueues.subjective,
    ...civilGuaranteeCoverageDefaultQueues.subjective,
    ...civilTortSpecialDefaultQueues.subjective,
    ...civilEducationProductDefaultQueues.subjective,
    ...civilTrafficMedicalDefaultQueues.subjective,
    ...civilEnvironmentObjectsDefaultQueues.subjective,
    ...civilPileTreeRoadDefaultQueues.subjective,
    ...civilPersonalityDefaultQueues.subjective,
    ...civilFamilyDefaultQueues.subjective,
    ...civilInheritanceDefaultQueues.subjective,
    ...civilQuasiContractDefaultQueues.subjective,
    ...civilNeighborPossessionDefaultQueues.subjective,
    ...civilUsufructDefaultQueues.subjective,
    ...civilServiceContractDefaultQueues.subjective,
    ...civilFinanceAgencyDefaultQueues.subjective,
    ...civilProjectTechPartnershipDefaultQueues.subjective,
    ...civilBoundedGapsDefaultQueues.subjective,
  ],
};
const civilProcedureSubjectQueues = {
  objective: [
    ...civilProcedureFilingVenueDefaultQueues.objective,
    ...civilProcedureJurisdictionResponseDefaultQueues.objective,
    ...civilProcedureContractVenueDefaultQueues.objective,
    ...civilProcedureUnagreedVenueDefaultQueues.objective,
    ...civilProcedureProofBurdenDefaultQueues.objective,
    ...civilProcedureAgentAuthorityDefaultQueues.objective,
    ...civilProcedurePartiesDefaultQueues.objective,
    ...civilProcedureFoundationsDefaultQueues.objective,
    ...civilProcedureEvidenceProcessDefaultQueues.objective,
    ...civilProcedureFirstInstanceDefaultQueues.objective,
    ...civilProcedureRemediesSpecialDefaultQueues.objective,
    ...civilProcedureExecutionDefaultQueues.objective,
    ...civilProcedureForeignDefaultQueues.objective,
    ...civilProcedureArbitrationDefaultQueues.objective,
    ...civilProcedureGapFillDefaultQueues.objective,
    ...civilProcedureProceduralDetailsDefaultQueues.objective,
  ],
  subjective: [
    ...civilProcedureFilingVenueDefaultQueues.subjective,
    ...civilProcedureJurisdictionResponseDefaultQueues.subjective,
    ...civilProcedureContractVenueDefaultQueues.subjective,
    ...civilProcedureUnagreedVenueDefaultQueues.subjective,
    ...civilProcedureUnperformedTransferDefaultQueues.subjective,
    ...civilProcedureProofBurdenDefaultQueues.subjective,
    ...civilProcedureAgentAuthorityDefaultQueues.subjective,
    ...civilProcedurePartiesDefaultQueues.subjective,
    ...civilProcedureFoundationsDefaultQueues.subjective,
    ...civilProcedureEvidenceProcessDefaultQueues.subjective,
    ...civilProcedureFirstInstanceDefaultQueues.subjective,
    ...civilProcedureRemediesSpecialDefaultQueues.subjective,
    ...civilProcedureExecutionDefaultQueues.subjective,
    ...civilProcedureForeignDefaultQueues.subjective,
    ...civilProcedureArbitrationDefaultQueues.subjective,
    ...civilProcedureGapFillDefaultQueues.subjective,
    ...civilProcedureProceduralDetailsDefaultQueues.subjective,
  ],
};
const criminalProcedureSubjectQueues = {
  objective: [
    ...criminalProcedureProofDefaultQueues.objective,
    ...criminalProcedureExclusionDefaultQueues.objective,
    ...criminalProcedureBurdenDefaultQueues.objective,
    ...criminalProcedureDefenseDefaultQueues.objective,
    ...criminalProcedureBailDefaultQueues.objective,
    ...criminalProcedureArrestReviewDefaultQueues.objective,
    ...criminalProcedureFoundationsDefaultQueues.objective,
    ...criminalProcedureG1DefaultQueues.objective,
  ],
  subjective: [
    ...criminalProcedureProofDefaultQueues.subjective,
    ...criminalProcedureExclusionDefaultQueues.subjective,
    ...criminalProcedurePartialCorroborationDefaultQueues.subjective,
    ...criminalProcedureBurdenDefaultQueues.subjective,
    ...criminalProcedureDefenseDefaultQueues.subjective,
    ...criminalProcedureBailDefaultQueues.subjective,
    ...criminalProcedureArrestReviewDefaultQueues.subjective,
    ...criminalProcedureFoundationsDefaultQueues.subjective,
    ...criminalProcedureG1DefaultQueues.subjective,
  ],
};
const baseSubjectPracticeQueues = (subject: PracticeSubject) =>
  isRemainingG6Subject(subject)
    ? remainingG6QueuesForSubject(subject)
    : subject === "commercial-law"
      ? commercialDefaultQueues
      : subject === "administrative-law"
        ? administrativeDefaultQueues
        : subject === "criminal-procedure"
          ? criminalProcedureSubjectQueues
          : subject === "civil-procedure"
            ? civilProcedureSubjectQueues
            : subject === "civil-law"
              ? civilSubjectQueues
              : practiceQueues;
export const subjectPracticeQueues = (subject: PracticeSubject) => {
  const base = baseSubjectPracticeQueues(subject);
  return {
    objective: [...base.objective, ...g8CompletionQueue(subject, "objective")],
    subjective: [
      ...base.subjective,
      ...g8CompletionQueue(subject, "subjective"),
    ],
  };
};
export const practiceQuestion = (id: string) => {
  const question = exerciseFor(id);
  if (!question) throw new Error("Unknown practice question");
  return question;
};
// Original question ownership stays stable for saved answers and content versions.
export const publishedExerciseTopic = (id: string) => {
  const supplement = g8CompletionTopicForQuestion(id);
  if (supplement) return supplement;
  const remaining = remainingG6TopicForQuestion(id);
  if (remaining) return remaining;
  const g1 = criminalProcedureG1TopicForQuestion(id);
  if (g1) return g1;
  const criminalFoundations = criminalProcedureFoundationsTopicForQuestion(id);
  if (criminalFoundations) return criminalFoundations;
  const proceduralDetails = civilProcedureProceduralDetailsTopicForQuestion(id);
  if (proceduralDetails) return proceduralDetails;
  const gapFill = civilProcedureGapFillTopicForQuestion(id);
  if (gapFill) return gapFill;
  const arbitration = civilProcedureArbitrationTopicForQuestion(id);
  if (arbitration) return arbitration;
  const foreign = civilProcedureForeignTopicForQuestion(id);
  if (foreign) return foreign;
  const execution = civilProcedureExecutionTopicForQuestion(id);
  if (execution) return execution;
  const remediesSpecial = civilProcedureRemediesSpecialTopicForQuestion(id);
  if (remediesSpecial) return remediesSpecial;
  const firstInstance = civilProcedureFirstInstanceTopicForQuestion(id);
  if (firstInstance) return firstInstance;
  const evidenceProcess = civilProcedureEvidenceProcessTopicForQuestion(id);
  if (evidenceProcess) return evidenceProcess;
  const foundations = civilProcedureFoundationsTopicForQuestion(id);
  if (foundations) return foundations;
  const parties = civilProcedurePartiesTopicForQuestion(id);
  if (parties) return parties;
  const boundedGaps = civilBoundedGapsTopicForQuestion(id);
  if (boundedGaps) return boundedGaps;
  const projectTechPartnership =
    civilProjectTechPartnershipTopicForQuestion(id);
  if (projectTechPartnership) return projectTechPartnership;
  const financeAgency = civilFinanceAgencyTopicForQuestion(id);
  if (financeAgency) return financeAgency;
  const serviceContract = civilServiceContractTopicForQuestion(id);
  if (serviceContract) return serviceContract;
  const usufruct = civilUsufructTopicForQuestion(id);
  if (usufruct) return usufruct;
  const neighborPossession = civilNeighborPossessionTopicForQuestion(id);
  if (neighborPossession) return neighborPossession;
  const quasiContract = civilQuasiContractTopicForQuestion(id);
  if (quasiContract) return quasiContract;
  const inheritance = civilInheritanceTopicForQuestion(id);
  if (inheritance) return inheritance;
  const family = civilFamilyTopicForQuestion(id);
  if (family) return family;
  const personality = civilPersonalityTopicForQuestion(id);
  if (personality) return personality;
  const pileTreeRoad = civilPileTreeRoadTopicForQuestion(id);
  if (pileTreeRoad) return pileTreeRoad;
  const environmentObjects = civilEnvironmentObjectsTopicForQuestion(id);
  if (environmentObjects) return environmentObjects;
  const trafficMedical = civilTrafficMedicalTopicForQuestion(id);
  if (trafficMedical) return trafficMedical;
  const educationProduct = civilEducationProductTopicForQuestion(id);
  if (educationProduct) return educationProduct;
  const tortSpecial = civilTortSpecialTopicForQuestion(id);
  if (tortSpecial) return tortSpecial;
  const guaranteeCoverage = civilGuaranteeCoverageTopicForQuestion(id);
  if (guaranteeCoverage) return guaranteeCoverage;
  const workMandate = civilWorkMandateTopicForQuestion(id);
  if (workMandate) return workMandate;
  const giftLoan = civilGiftLoanTopicForQuestion(id);
  if (giftLoan) return giftLoan;
  const saleLease = civilSaleLeaseTopicForQuestion(id);
  if (saleLease) return saleLease;
  const obligation = civilObligationsTopicForQuestion(id);
  if (obligation) return obligation;
  const property = civilPropertyTopicForQuestion(id);
  if (property) return property;
  const foundation = civilFoundationsTopicForQuestion(id);
  if (foundation) return foundation;
  const archived = historicalPracticeTopic(id);
  if (archived) return archived;
  const commercialTopic = commercialTopicForQuestion(id);
  if (commercialTopic) return commercialTopic;
  const adminTopic = administrativeTopicForQuestion(id);
  if (adminTopic) return adminTopic;
  if (criminalProcedurePartialCorroborationQuestion(id))
    return topicFor(criminalProcedurePartialCorroborationTopicId)!;
  const criminalProcedureTopic =
    criminalProcedureBurdenTopicForQuestion(id) ??
    criminalProcedureExclusionTopicForQuestion(id) ??
    criminalProcedureProofTopicForQuestion(id);
  if (criminalProcedureTopic) return criminalProcedureTopic;
  if (civilProcedureUnperformedTransferQuestion(id))
    return topicFor(civilProcedureUnperformedTransferTopicId)!;
  const reviewQuestion =
    civilProcedureReviewQuestion(id) ?? civilContractReviewQuestion(id);
  if (reviewQuestion) {
    const primary = topicFor(reviewQuestion.relatedTopicIds![0]);
    if (!primary) throw new Error("Unknown comprehensive question topic");
    return primary;
  }
  const topic =
    learningTopics.find((t) => t.exercises.some((q) => q.id === id)) ??
    criminalProcedureArrestReviewTopicForQuestion(id) ??
    criminalProcedureBailTopicForQuestion(id) ??
    criminalProcedureDefenseTopicForQuestion(id) ??
    civilGuaranteeTopicForQuestion(id) ??
    civilAgencyTopicForQuestion(id) ??
    civilContractFormationTopicForQuestion(id) ??
    civilContractPerformanceTopicForQuestion(id) ??
    civilActValidityTopicForQuestion(id) ??
    civilProcedureFilingVenueTopicForQuestion(id) ??
    civilProcedureJurisdictionResponseTopicForQuestion(id) ??
    civilProcedureContractVenueTopicForQuestion(id) ??
    civilProcedureUnagreedVenueTopicForQuestion(id) ??
    civilProcedureProofBurdenTopicForQuestion(id) ??
    civilProcedureAgentAuthorityTopicForQuestion(id) ??
    civilContractRemediesTopicForQuestion(id) ??
    civilContractLossesTopicForQuestion(id) ??
    civilStipulatedLiabilityTopicForQuestion(id) ??
    civilMovableDeliveryTopicForQuestion(id) ??
    civilTortInstigationAssistanceTopicForQuestion(id) ??
    (tortQuestionFor(id) ? tortTopic : undefined) ??
    (personalTortQuestionFor(id) ? personalTortTopic : undefined);
  if (!topic) throw new Error("Unknown practice topic");
  return topic;
};
// The current learning directory groups cases by the substantive knowledge tested.
export const practiceTopic = (id: string) => {
  const group = practiceGroups.find((g) =>
    g.ids.includes(currentPracticeId(id)),
  );
  return group ? topicFor(group.topicId)! : publishedExerciseTopic(id);
};
export const practiceChapter = (id: string) =>
  g8CompletionRow(id)
    ? chapterFor(g8CompletionRow(id)!.chapterId)!
    : civilProcedureReviewQuestion(id)
      ? civilProcedureReviewSetForQuestion(id)!.chapter
      : civilContractReviewQuestion(id)
        ? civilContractReviewChapter
        : chapterForTopic(practiceTopic(id).id)!;
const previousChapterQueue = (
  chapterId: string,
  mode: PracticeMode,
  scope: PracticeScope | "all" = "topic",
) =>
  chapterId === personalTortChapter.id
    ? scope === "review"
      ? []
      : personalTortDefaultQueues[mode]
    : chapterId === tortChapter.id
      ? scope === "review"
        ? []
        : tortDefaultQueues[mode]
      : chapterId === civilAgencyChapter.id
        ? scope === "review"
          ? []
          : civilAgencyDefaultQueues[mode]
        : chapterId === civilContractFormationChapter.id
          ? scope === "review"
            ? []
            : civilContractFormationDefaultQueues[mode]
          : chapterId === civilContractPerformanceChapter.id
            ? scope === "review"
              ? []
              : civilContractPerformanceDefaultQueues[mode]
            : chapterId === civilActValidityChapter.id
              ? scope === "review"
                ? []
                : civilActValidityDefaultQueues[mode]
              : (scope === "review"
                  ? chapterCases
                      .filter((c) => c.review && c.exercise.kind === mode)
                      .map((c) => currentPracticeId(c.exercise.id))
                  : practiceQueues[mode]
                ).filter(
                  (id) =>
                    chapterFor(chapterId)?.topicIds.includes(
                      practiceTopic(id).id,
                    ) &&
                    (scope === "all" ||
                      isChapterReview(id) === (scope === "review")),
                );
const registeredChapterQueue = (
  chapterId: string,
  mode: PracticeMode,
  scope: PracticeScope | "all" = "topic",
) =>
  civilProcedureProceduralDetailsChapters.some((c) => c.id === chapterId)
    ? scope === "review"
      ? []
      : civilProcedureProceduralDetailsChapterQueue(chapterId, mode)
    : civilProcedureGapFillChapters.some((c) => c.id === chapterId)
      ? scope === "review"
        ? []
        : civilProcedureGapFillChapterQueue(chapterId, mode)
      : civilProcedureArbitrationChapters.some((c) => c.id === chapterId)
        ? scope === "review"
          ? []
          : civilProcedureArbitrationChapterQueue(chapterId, mode)
        : civilProcedureForeignChapters.some((c) => c.id === chapterId)
          ? scope === "review"
            ? []
            : civilProcedureForeignChapterQueue(chapterId, mode)
          : civilProcedureExecutionChapters.some((c) => c.id === chapterId)
            ? scope === "review"
              ? []
              : civilProcedureExecutionChapterQueue(chapterId, mode)
            : civilProcedureRemediesSpecialChapters.some(
                  (c) => c.id === chapterId,
                )
              ? scope === "review"
                ? []
                : civilProcedureRemediesSpecialChapterQueue(chapterId, mode)
              : civilProcedureFirstInstanceChapters.some(
                    (c) => c.id === chapterId,
                  )
                ? scope === "review"
                  ? []
                  : civilProcedureFirstInstanceChapterQueue(chapterId, mode)
                : civilProcedureEvidenceProcessChapters.some(
                      (c) => c.id === chapterId,
                    )
                  ? scope === "review"
                    ? []
                    : civilProcedureEvidenceProcessChapterQueue(chapterId, mode)
                  : civilProcedureFoundationsChapters.some(
                        (c) => c.id === chapterId,
                      )
                    ? scope === "review"
                      ? []
                      : civilProcedureFoundationsChapterQueue(chapterId, mode)
                    : civilProcedurePartiesChapters.some(
                          (c) => c.id === chapterId,
                        )
                      ? scope === "review"
                        ? []
                        : civilProcedurePartiesChapterQueue(chapterId, mode)
                      : civilBoundedGapsChapters.some((c) => c.id === chapterId)
                        ? scope === "review"
                          ? []
                          : civilBoundedGapsChapterQueue(chapterId, mode)
                        : civilProjectTechPartnershipChapters.some(
                              (c) => c.id === chapterId,
                            )
                          ? scope === "review"
                            ? []
                            : civilProjectTechPartnershipChapterQueue(
                                chapterId,
                                mode,
                              )
                          : civilFinanceAgencyChapters.some(
                                (c) => c.id === chapterId,
                              )
                            ? scope === "review"
                              ? []
                              : civilFinanceAgencyChapterQueue(chapterId, mode)
                            : civilServiceContractChapters.some(
                                  (c) => c.id === chapterId,
                                )
                              ? scope === "review"
                                ? []
                                : civilServiceContractChapterQueue(
                                    chapterId,
                                    mode,
                                  )
                              : civilUsufructChapters.some(
                                    (c) => c.id === chapterId,
                                  )
                                ? scope === "review"
                                  ? []
                                  : civilUsufructChapterQueue(chapterId, mode)
                                : civilNeighborPossessionChapters.some(
                                      (c) => c.id === chapterId,
                                    )
                                  ? scope === "review"
                                    ? []
                                    : civilNeighborPossessionChapterQueue(
                                        chapterId,
                                        mode,
                                      )
                                  : civilQuasiContractChapters.some(
                                        (c) => c.id === chapterId,
                                      )
                                    ? scope === "review"
                                      ? []
                                      : civilQuasiContractChapterQueue(
                                          chapterId,
                                          mode,
                                        )
                                    : civilInheritanceChapters.some(
                                          (c) => c.id === chapterId,
                                        )
                                      ? scope === "review"
                                        ? []
                                        : civilInheritanceChapterQueue(
                                            chapterId,
                                            mode,
                                          )
                                      : civilFamilyChapters.some(
                                            (c) => c.id === chapterId,
                                          )
                                        ? scope === "review"
                                          ? []
                                          : civilFamilyChapterQueue(
                                              chapterId,
                                              mode,
                                            )
                                        : civilPersonalityChapters.some(
                                              (c) => c.id === chapterId,
                                            )
                                          ? scope === "review"
                                            ? []
                                            : civilPersonalityChapterQueue(
                                                chapterId,
                                                mode,
                                              )
                                          : civilPileTreeRoadChapters.some(
                                                (c) => c.id === chapterId,
                                              )
                                            ? scope === "review"
                                              ? []
                                              : civilPileTreeRoadChapterQueue(
                                                  chapterId,
                                                  mode,
                                                )
                                            : civilEnvironmentObjectsChapters.some(
                                                  (c) => c.id === chapterId,
                                                )
                                              ? scope === "review"
                                                ? []
                                                : civilEnvironmentObjectsChapterQueue(
                                                    chapterId,
                                                    mode,
                                                  )
                                              : civilTrafficMedicalChapters.some(
                                                    (c) => c.id === chapterId,
                                                  )
                                                ? scope === "review"
                                                  ? []
                                                  : civilTrafficMedicalChapterQueue(
                                                      chapterId,
                                                      mode,
                                                    )
                                                : civilEducationProductChapters.some(
                                                      (c) => c.id === chapterId,
                                                    )
                                                  ? scope === "review"
                                                    ? []
                                                    : civilEducationProductChapterQueue(
                                                        chapterId,
                                                        mode,
                                                      )
                                                  : civilTortSpecialChapters.some(
                                                        (c) =>
                                                          c.id === chapterId,
                                                      )
                                                    ? scope === "review"
                                                      ? []
                                                      : civilTortSpecialChapterQueue(
                                                          chapterId,
                                                          mode,
                                                        )
                                                    : civilGuaranteeCoverageChapters.some(
                                                          (c) =>
                                                            c.id === chapterId,
                                                        )
                                                      ? scope === "review"
                                                        ? []
                                                        : civilGuaranteeCoverageChapterQueue(
                                                            chapterId,
                                                            mode,
                                                          )
                                                      : civilWorkMandateChapters.some(
                                                            (c) =>
                                                              c.id ===
                                                              chapterId,
                                                          )
                                                        ? scope === "review"
                                                          ? []
                                                          : civilWorkMandateChapterQueue(
                                                              chapterId,
                                                              mode,
                                                            )
                                                        : civilGiftLoanChapters.some(
                                                              (c) =>
                                                                c.id ===
                                                                chapterId,
                                                            )
                                                          ? scope === "review"
                                                            ? []
                                                            : civilGiftLoanChapterQueue(
                                                                chapterId,
                                                                mode,
                                                              )
                                                          : civilSaleLeaseChapters.some(
                                                                (c) =>
                                                                  c.id ===
                                                                  chapterId,
                                                              )
                                                            ? scope === "review"
                                                              ? []
                                                              : civilSaleLeaseChapterQueue(
                                                                  chapterId,
                                                                  mode,
                                                                )
                                                            : civilObligationsChapters.some(
                                                                  (c) =>
                                                                    c.id ===
                                                                    chapterId,
                                                                )
                                                              ? scope ===
                                                                "review"
                                                                ? []
                                                                : civilObligationsChapterQueue(
                                                                    chapterId,
                                                                    mode,
                                                                  )
                                                              : civilPropertyChapters.some(
                                                                    (c) =>
                                                                      c.id ===
                                                                      chapterId,
                                                                  )
                                                                ? scope ===
                                                                  "review"
                                                                  ? []
                                                                  : civilPropertyChapterQueue(
                                                                      chapterId,
                                                                      mode,
                                                                    )
                                                                : civilFoundationsChapters.some(
                                                                      (c) =>
                                                                        c.id ===
                                                                        chapterId,
                                                                    )
                                                                  ? scope ===
                                                                    "review"
                                                                    ? []
                                                                    : civilFoundationsChapterQueue(
                                                                        chapterId,
                                                                        mode,
                                                                      )
                                                                  : chapterId ===
                                                                      criminalProcedureArrestReviewChapter.id
                                                                    ? scope ===
                                                                      "review"
                                                                      ? []
                                                                      : criminalProcedureArrestReviewDefaultQueues[
                                                                          mode
                                                                        ]
                                                                    : chapterId ===
                                                                        civilProcedureAgentAuthorityChapter.id
                                                                      ? scope ===
                                                                        "review"
                                                                        ? []
                                                                        : civilProcedureAgentAuthorityDefaultQueues[
                                                                            mode
                                                                          ]
                                                                      : chapterId ===
                                                                          criminalProcedureBailChapter.id
                                                                        ? scope ===
                                                                          "review"
                                                                          ? []
                                                                          : criminalProcedureBailDefaultQueues[
                                                                              mode
                                                                            ]
                                                                        : chapterId ===
                                                                            criminalProcedureDefenseChapter.id
                                                                          ? scope ===
                                                                            "review"
                                                                            ? []
                                                                            : criminalProcedureDefenseDefaultQueues[
                                                                                mode
                                                                              ]
                                                                          : chapterId ===
                                                                              civilGuaranteeChapter.id
                                                                            ? scope ===
                                                                              "review"
                                                                              ? []
                                                                              : civilGuaranteeDefaultQueues[
                                                                                  mode
                                                                                ]
                                                                            : chapterId ===
                                                                                civilProcedureProofBurdenChapter.id
                                                                              ? scope ===
                                                                                "review"
                                                                                ? []
                                                                                : civilProcedureProofBurdenDefaultQueues[
                                                                                    mode
                                                                                  ]
                                                                              : chapterId ===
                                                                                  commercialChapter.id
                                                                                ? scope ===
                                                                                  "review"
                                                                                  ? []
                                                                                  : commercialDefaultQueues[
                                                                                      mode
                                                                                    ]
                                                                                : chapterId ===
                                                                                    administrativeChapter.id
                                                                                  ? scope ===
                                                                                    "review"
                                                                                    ? []
                                                                                    : administrativeDefaultQueues[
                                                                                        mode
                                                                                      ]
                                                                                  : chapterId ===
                                                                                      criminalProcedureProofChapter.id
                                                                                    ? scope ===
                                                                                      "review"
                                                                                      ? []
                                                                                      : criminalProcedureSubjectQueues[
                                                                                          mode
                                                                                        ].filter(
                                                                                          (
                                                                                            id,
                                                                                          ) =>
                                                                                            !criminalProcedureG1Question(
                                                                                              id,
                                                                                            ) &&
                                                                                            !criminalProcedureFoundationsQuestion(
                                                                                              id,
                                                                                            ) &&
                                                                                            !criminalProcedureDefenseQuestion(
                                                                                              id,
                                                                                            ) &&
                                                                                            !criminalProcedureBailQuestion(
                                                                                              id,
                                                                                            ) &&
                                                                                            !criminalProcedureArrestReviewQuestion(
                                                                                              id,
                                                                                            ),
                                                                                        )
                                                                                    : chapterId ===
                                                                                        civilProcedureReviewChapter.id
                                                                                      ? scope ===
                                                                                        "topic"
                                                                                        ? []
                                                                                        : civilProcedureReviewQueues[
                                                                                            mode
                                                                                          ]
                                                                                      : chapterId ===
                                                                                          civilProcedureJurisdictionResponseChapter.id
                                                                                        ? scope ===
                                                                                          "review"
                                                                                          ? []
                                                                                          : civilProcedureJurisdictionResponseDefaultQueues[
                                                                                              mode
                                                                                            ]
                                                                                        : chapterId ===
                                                                                            civilContractReviewChapter.id
                                                                                          ? scope ===
                                                                                            "topic"
                                                                                            ? []
                                                                                            : civilContractReviewQueues[
                                                                                                mode
                                                                                              ]
                                                                                          : chapterId ===
                                                                                              civilStipulatedLiabilityChapter.id
                                                                                            ? scope ===
                                                                                              "review"
                                                                                              ? []
                                                                                              : civilStipulatedLiabilityDefaultQueues[
                                                                                                  mode
                                                                                                ]
                                                                                            : chapterId ===
                                                                                                civilContractLossesChapter.id
                                                                                              ? scope ===
                                                                                                "review"
                                                                                                ? []
                                                                                                : civilContractLossesDefaultQueues[
                                                                                                    mode
                                                                                                  ]
                                                                                              : chapterId ===
                                                                                                  civilContractRemediesChapter.id
                                                                                                ? scope ===
                                                                                                  "review"
                                                                                                  ? []
                                                                                                  : civilContractRemediesDefaultQueues[
                                                                                                      mode
                                                                                                    ]
                                                                                                : chapterId ===
                                                                                                    civilProcedureFilingVenueChapter.id
                                                                                                  ? scope ===
                                                                                                    "review"
                                                                                                    ? []
                                                                                                    : civilProcedureFilingVenueDefaultQueues[
                                                                                                        mode
                                                                                                      ]
                                                                                                  : chapterId ===
                                                                                                      civilProcedureContractVenueChapter.id
                                                                                                    ? scope ===
                                                                                                      "review"
                                                                                                      ? []
                                                                                                      : [
                                                                                                          ...civilProcedureContractVenueDefaultQueues[
                                                                                                            mode
                                                                                                          ],
                                                                                                          ...civilProcedureUnperformedTransferDefaultQueues[
                                                                                                            mode
                                                                                                          ],
                                                                                                        ]
                                                                                                    : chapterId ===
                                                                                                        civilProcedureUnagreedVenueChapter.id
                                                                                                      ? scope ===
                                                                                                        "review"
                                                                                                        ? []
                                                                                                        : civilProcedureUnagreedVenueDefaultQueues[
                                                                                                            mode
                                                                                                          ]
                                                                                                      : chapterId ===
                                                                                                          civilMovableDeliveryChapter.id
                                                                                                        ? scope ===
                                                                                                          "review"
                                                                                                          ? []
                                                                                                          : civilMovableDeliveryDefaultQueues[
                                                                                                              mode
                                                                                                            ]
                                                                                                        : chapterId ===
                                                                                                            civilTortInstigationAssistanceChapter.id
                                                                                                          ? scope ===
                                                                                                            "review"
                                                                                                            ? []
                                                                                                            : civilTortInstigationAssistanceDefaultQueues[
                                                                                                                mode
                                                                                                              ]
                                                                                                          : previousChapterQueue(
                                                                                                              chapterId,
                                                                                                              mode,
                                                                                                              scope,
                                                                                                            );
function baseChapterQueue(
  chapterId: string,
  mode: PracticeMode,
  scope: PracticeScope | "all" = "topic",
) {
  if (remainingG6Chapters.some((c) => c.id === chapterId))
    return scope === "review" ? [] : remainingG6ChapterQueue(chapterId, mode);
  if (chapterId === commercialChapter.id)
    return scope === "review"
      ? []
      : commercialDefaultQueues[mode].filter((id) =>
          commercialChapter.topicIds.includes(
            commercialTopicForQuestion(id)?.id ?? "",
          ),
        );
  if (commercialG5Chapters.some((c) => c.id === chapterId))
    return scope === "review" ? [] : commercialG5ChapterQueue(chapterId, mode);
  if (ecologyG8Chapters.some((c) => c.id === chapterId))
    return scope === "review" ? [] : ecologyG8ChapterQueue(chapterId, mode);
  if (chapterId === administrativeChapter.id)
    return scope === "review"
      ? []
      : administrativeDefaultQueues[mode].filter((id) =>
          administrativeChapter.topicIds.includes(
            administrativeTopicForQuestion(id)?.id ?? "",
          ),
        );
  if (administrativeG4Chapters.some((c) => c.id === chapterId))
    return scope === "review"
      ? []
      : administrativeG4ChapterQueue(chapterId, mode);
  if (criminalProcedureG1Chapters.some((c) => c.id === chapterId))
    return scope === "review"
      ? []
      : criminalProcedureG1ChapterQueue(chapterId, mode);
  if (criminalProcedureFoundationsChapters.some((c) => c.id === chapterId))
    return scope === "review"
      ? []
      : criminalProcedureFoundationsChapterQueue(chapterId, mode);
  const set = civilProcedureReviewSets.find(
    (item) => item.chapter.id === chapterId,
  );
  if (set)
    return scope !== "topic" && mode === "subjective"
      ? [...set.questionIds]
      : [];
  return registeredChapterQueue(chapterId, mode, scope);
}
export function chapterQueue(
  chapterId: string,
  mode: PracticeMode,
  scope: PracticeScope | "all" = "topic",
) {
  const base = baseChapterQueue(chapterId, mode, scope);
  return scope === "review"
    ? base
    : [...base, ...g8CompletionChapterQueue(chapterId, mode)];
}
export function sameCaseQuestions(id: string) {
  if (g8CompletionQuestion(id)) return g8CompletionSameCase(id);
  if (criminalProcedureG1Question(id))
    return criminalProcedureG1SameCaseQuestions(id);
  if (criminalProcedureFoundationsQuestion(id))
    return criminalProcedureFoundationsSameCaseQuestions(id);
  if (civilProcedureProceduralDetailsQuestion(id))
    return civilProcedureProceduralDetailsSameCaseQuestions(id);
  if (civilProcedureGapFillQuestion(id))
    return civilProcedureGapFillSameCaseQuestions(id);
  if (civilProcedureArbitrationQuestion(id))
    return civilProcedureArbitrationSameCaseQuestions(id);
  if (civilProcedureForeignQuestion(id))
    return civilProcedureForeignSameCaseQuestions(id);
  if (civilProcedureExecutionQuestion(id))
    return civilProcedureExecutionSameCaseQuestions(id);
  if (civilProcedureRemediesSpecialQuestion(id))
    return civilProcedureRemediesSpecialSameCaseQuestions(id);
  if (civilProcedureFirstInstanceQuestion(id))
    return civilProcedureFirstInstanceSameCaseQuestions(id);
  if (civilProcedureEvidenceProcessQuestion(id))
    return civilProcedureEvidenceProcessSameCaseQuestions(id);
  if (civilProcedureFoundationsQuestion(id))
    return civilProcedureFoundationsSameCaseQuestions(id);
  if (civilProcedurePartiesQuestion(id))
    return civilProcedurePartiesSameCaseQuestions(id);
  if (civilBoundedGapsQuestion(id))
    return civilBoundedGapsSameCaseQuestions(id);
  if (civilProjectTechPartnershipQuestion(id))
    return civilProjectTechPartnershipSameCaseQuestions(id);
  if (civilFinanceAgencyQuestion(id))
    return civilFinanceAgencySameCaseQuestions(id);
  if (civilServiceContractQuestion(id))
    return civilServiceContractSameCaseQuestions(id);
  if (civilUsufructQuestion(id)) return civilUsufructSameCaseQuestions(id);
  if (civilNeighborPossessionQuestion(id))
    return civilNeighborPossessionSameCaseQuestions(id);
  if (civilQuasiContractQuestion(id))
    return civilQuasiContractSameCaseQuestions(id);
  if (civilInheritanceQuestion(id))
    return civilInheritanceSameCaseQuestions(id);
  if (civilFamilyQuestion(id)) return civilFamilySameCaseQuestions(id);
  if (civilPersonalityQuestion(id))
    return civilPersonalitySameCaseQuestions(id);
  if (civilPileTreeRoadQuestion(id))
    return civilPileTreeRoadSameCaseQuestions(id);
  if (civilEnvironmentObjectsQuestion(id))
    return civilEnvironmentObjectsSameCaseQuestions(id);
  if (civilTrafficMedicalQuestion(id))
    return civilTrafficMedicalSameCaseQuestions(id);
  if (civilEducationProductQuestion(id))
    return civilEducationProductSameCaseQuestions(id);
  if (civilTortSpecialQuestion(id))
    return civilTortSpecialSameCaseQuestions(id);
  if (civilGuaranteeCoverageQuestion(id))
    return civilGuaranteeCoverageSameCaseQuestions(id);
  if (civilWorkMandateQuestion(id))
    return civilWorkMandateSameCaseQuestions(id);
  if (civilGiftLoanQuestion(id)) return civilGiftLoanSameCaseQuestions(id);
  if (civilSaleLeaseQuestion(id)) return civilSaleLeaseSameCaseQuestions(id);
  if (civilObligationsQuestion(id))
    return civilObligationsSameCaseQuestions(id);
  if (civilPropertyQuestion(id)) return civilPropertySameCaseQuestions(id);
  if (civilFoundationsQuestion(id))
    return civilFoundationsSameCaseQuestions(id);
  const archived = historicalPracticeQuestion(id);
  if (archived)
    return historicalPracticeTopic(id)!.exercises.filter(
      (q) => q.caseId === archived.caseId,
    );
  if (criminalProcedureArrestReviewQuestion(id))
    return criminalProcedureArrestReviewSameCaseQuestions(id);
  if (criminalProcedureBailQuestion(id))
    return criminalProcedureBailSameCaseQuestions(id);
  if (civilGuaranteeQuestion(id)) return civilGuaranteeSameCaseQuestions(id);
  if (criminalProcedureDefenseQuestion(id))
    return criminalProcedureDefenseSameCaseQuestions(id);
  if (civilProcedureProofBurdenQuestion(id))
    return civilProcedureProofBurdenSameCaseQuestions(id);
  if (civilProcedureAgentAuthorityQuestion(id))
    return civilProcedureAgentAuthoritySameCaseQuestions(id);
  if (remainingG6Question(id)) return remainingG6SameCaseQuestions(id);
  if (commercialQuestion(id)) return commercialSameCaseQuestions(id);
  if (civilTortInstigationAssistanceQuestion(id))
    return civilTortInstigationAssistanceSameCaseQuestions(id);
  if (administrativeQuestion(id)) return administrativeSameCaseQuestions(id);
  if (criminalProcedurePartialCorroborationQuestion(id))
    return criminalProcedurePartialCorroborationSameCaseQuestions(id);
  if (criminalProcedureBurdenQuestion(id))
    return criminalProcedureBurdenSameCaseQuestions(id);
  if (criminalProcedureExclusionQuestion(id))
    return criminalProcedureExclusionSameCaseQuestions(id);
  if (criminalProcedureProofQuestion(id))
    return criminalProcedureProofSameCaseQuestions(id);
  if (civilProcedureUnperformedTransferQuestion(id))
    return civilProcedureUnperformedTransferSameCaseQuestions(id);
  if (civilMovableDeliveryQuestion(id))
    return civilMovableDeliverySameCaseQuestions(id);
  if (civilProcedureUnagreedVenueQuestion(id))
    return civilProcedureUnagreedVenueSameCaseQuestions(id);
  if (personalTortQuestionFor(id)) return [personalTortQuestion];
  if (tortQuestionFor(id)) return [tortQuestion];
  if (civilProcedureReviewQuestion(id))
    return structuredClone([
      ...civilProcedureReviewSetForQuestion(id)!.questions,
    ]);
  if (civilProcedureContractVenueQuestion(id))
    return civilProcedureContractVenueSameCaseQuestions(id);
  if (civilProcedureJurisdictionResponseQuestion(id))
    return civilProcedureJurisdictionResponseSameCaseQuestions(id);
  if (civilContractReviewQuestion(id))
    return civilContractIntegratedSameCaseQuestions(id);
  if (civilStipulatedLiabilityQuestion(id))
    return civilStipulatedLiabilitySameCaseQuestions(id);
  if (civilContractLossesQuestion(id))
    return civilContractLossesSameCaseQuestions(id);
  if (civilContractRemediesQuestion(id))
    return civilContractRemediesSameCaseQuestions(id);
  if (civilProcedureFilingVenueQuestion(id))
    return civilProcedureFilingVenueSameCaseQuestions(id);
  if (civilAgencyQuestion(id)) return civilAgencySameCaseQuestions(id);
  if (civilContractFormationQuestion(id))
    return civilContractFormationSameCaseQuestions(id);
  if (civilContractPerformanceQuestion(id))
    return civilContractPerformanceSameCaseQuestions(id);
  if (civilActValidityQuestion(id))
    return civilActValiditySameCaseQuestions(id);
  const questions = learningTopics.flatMap((t) => t.exercises);
  const related = new Set([id]);
  const facts = new Set([practiceQuestion(id).facts]);
  const slots = new Set([currentPracticeId(id)]);
  const caseIds = new Set([practiceQuestion(id).caseId].filter(Boolean));
  // Follow both shared stems and revisions: seeing an old choice explanation
  // also exposes the revised writing task. Only exposure is linked, not answers.
  let changed = true;
  while (changed) {
    changed = false;
    for (const q of questions) {
      if (related.has(q.id)) continue;
      if (
        facts.has(q.facts) ||
        slots.has(currentPracticeId(q.id)) ||
        (q.caseId && caseIds.has(q.caseId))
      ) {
        related.add(q.id);
        facts.add(q.facts);
        slots.add(currentPracticeId(q.id));
        if (q.caseId) caseIds.add(q.caseId);
        changed = true;
      }
    }
  }
  return questions.filter((q) => related.has(q.id));
}

// Concise teaching notes. Legal basis: Criminal Law arts. 14–16, checked 2026-09-14.
export const practiceKnowledge: Record<
  string,
  { rule: string; omission: string }
> = {
  ...unpublishedTradingKnowledge,
  ...stateUnityKnowledge,
  ...specialAccidentKnowledge,
  ...witnessRetaliationKnowledge,
  ...courtOrderKnowledge,
  ...foundationKnowledge,
  ...packageOneKnowledge,
  ...generalKnowledge,
  ...personKnowledge,
  ...propertyKnowledge,
  ...safetyKnowledge,
  ...broadcastFacilitiesKnowledge,
  ...economicKnowledge,
  ...socialKnowledge,
  ...officeKnowledge,
  ...capstoneKnowledge,
  ...basicsKnowledgeCorrections,
  ...generalGapKnowledge,
  ...executionKnowledge,
  ...personGapKnowledge,
  ...minorOrganizationKnowledge,
  ...resaleKnowledge,
  ...custodyEscortKnowledge,
  [blowMistakeTopic.id]: blowMistakeKnowledge,
  [objectMistakeTopic.id]: objectMistakeKnowledge,
  intent: {
    rule: "明知危害结果，且希望或放任其发生，是故意。希望发生是直接故意；不追求却接受发生，是间接故意。",
    omission: "不追求结果不等于排除故意；结果发生的概率不能单独决定故意类型。",
  },
  confidence: {
    rule: "已经预见危害结果，却轻信能够避免，是过于自信的过失。关键是轻信避免，与接受结果发生区分。",
    omission: "采取措施不是排除故意的充分依据；过失犯罪的处罚还须有法律规定。",
  },
  negligence: {
    rule: "应当且能够预见危害结果，却因疏忽没有预见，是疏忽大意的过失。",
    omission: "能否预见要结合职责、能力和当时条件；实际没想到不等于不能预见。",
  },
  accident: {
    rule: "损害由不能预见或不能抗拒的原因引起，且无故意、过失时，不是犯罪。不能预见是当时无从预见；不能抗拒是无法抵御致害原因，即使发现危险也无力避免。",
    omission: "须一并审查此前相关过错；最后来不及制止，不能消除此前的过失。",
  },
};
export const knowledgeTopics = practiceGroups.map(({ topicId }) =>
  topicFor(topicId)!,
);
import { civilAgencyChapter } from "./civil-agency";
import {
  civilAgencyDefaultQueues,
  civilAgencyQuestion,
  civilAgencySameCaseQuestions,
  civilAgencyTopicForQuestion,
} from "./civil-agency-catalog-candidate";
import {
  civilContractFormationChapter,
  civilContractFormationDefaultQueues,
  civilContractFormationQuestion,
  civilContractFormationSameCaseQuestions,
  civilContractFormationTopicForQuestion,
} from "./civil-contract-formation";
import {
  civilContractPerformanceChapter,
  civilContractPerformanceDefaultQueues,
  civilContractPerformanceQuestion,
  civilContractPerformanceSameCaseQuestions,
  civilContractPerformanceTopicForQuestion,
} from "./civil-insecurity-stages-registration";

import {
  civilActValidityChapter,
  civilActValidityDefaultQueues,
  civilActValidityQuestion,
  civilActValiditySameCaseQuestions,
  civilActValidityTopicForQuestion,
} from "./civil-act-validity";

import {
  civilProcedureFilingVenueChapter,
  civilProcedureFilingVenueDefaultQueues,
  civilProcedureFilingVenueQuestion,
  civilProcedureFilingVenueSameCaseQuestions,
  civilProcedureFilingVenueTopicForQuestion,
} from "./civil-procedure-filing-venue";

import {
  civilContractRemediesChapter,
  civilContractRemediesDefaultQueues,
  civilContractRemediesQuestion,
  civilContractRemediesSameCaseQuestions,
  civilContractRemediesTopicForQuestion,
} from "./civil-contract-remedies";
