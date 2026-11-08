import {
  g8CompletionQuestion,
  g8CompletionRevision,
  g8CompletionContentPack,
} from "./g8-completion";
import {
  trademarkG8Topics,
  trademarkG8Sources,
  trademarkG8Revision,
  trademarkG8Question,
  trademarkG8ContentPack,
} from "./trademark-g8";
import {
  annualG8Topics,
  annualG8Sources,
  annualG8Revision,
  annualG8Question,
  annualG8ContentPack,
} from "./annual-g8";
import {
  remainingG6Topics,
  remainingG6Question,
  remainingG6Sources,
  remainingG6ContentPack,
  remainingG6Revision,
} from "./remaining-g6";
import { commercialG5ContentPack } from "./commercial-g5";
import { ecologyG8ContentPack } from "./ecology-g8";
import { administrativeG4ContentPack } from "./administrative-g4";
import {
  criminalProcedureG1ContentPack,
  criminalProcedureG1Question,
  criminalProcedureG1Topics,
} from "./criminal-procedure-g1";
import {
  criminalProcedureFoundationsContentPack,
  criminalProcedureFoundationsQuestion,
  criminalProcedureFoundationsTopics,
} from "./criminal-procedure-foundations";
import {
  civilProcedureProceduralDetailsContentPack,
  civilProcedureProceduralDetailsQuestion,
  civilProcedureProceduralDetailsTopics,
} from "./civil-procedure-procedural-details";
import {
  civilProcedureGapFillContentPack,
  civilProcedureGapFillQuestion,
  civilProcedureGapFillTopics,
} from "./civil-procedure-gap-fill";
import {
  civilProcedureCrossChapterContentPack,
  civilProcedureCrossChapterQuestion,
  civilProcedureCrossChapterRevision,
} from "./civil-procedure-cross-chapter";
import {
  civilProcedureArbitrationContentPack,
  civilProcedureArbitrationQuestion,
  civilProcedureArbitrationTopics,
} from "./civil-procedure-arbitration";
import {
  civilProcedureForeignContentPack,
  civilProcedureForeignQuestion,
  civilProcedureForeignTopics,
} from "./civil-procedure-foreign";
import {
  civilProcedureExecutionContentPack,
  civilProcedureExecutionQuestion,
  civilProcedureExecutionTopics,
} from "./civil-procedure-execution";
import {
  civilProcedureRemediesSpecialContentPack,
  civilProcedureRemediesSpecialQuestion,
  civilProcedureRemediesSpecialTopics,
} from "./civil-procedure-remedies-special";
import {
  civilProcedureFirstInstanceContentPack,
  civilProcedureFirstInstanceQuestion,
  civilProcedureFirstInstanceTopics,
} from "./civil-procedure-first-instance";
import {
  civilProcedureEvidenceProcessContentPack,
  civilProcedureEvidenceProcessQuestion,
  civilProcedureEvidenceProcessTopics,
} from "./civil-procedure-evidence-process";
import {
  civilProcedureFoundationsContentPack,
  civilProcedureFoundationsQuestion,
  civilProcedureFoundationsTopics,
} from "./civil-procedure-foundations";
import {
  civilProcedurePartiesContentPack,
  civilProcedurePartiesQuestion,
  civilProcedurePartiesTopics,
} from "./civil-procedure-parties";
import {
  civilBoundedGapsContentPack,
  civilBoundedGapsQuestion,
  civilBoundedGapsTopics,
} from "./civil-bounded-gaps";
import {
  civilProjectTechPartnershipContentPack,
  civilProjectTechPartnershipQuestion,
  civilProjectTechPartnershipTopics,
} from "./civil-project-tech-partnership";
import {
  civilFinanceAgencyContentPack,
  civilFinanceAgencyQuestion,
  civilFinanceAgencyTopics,
} from "./civil-finance-agency";
import {
  civilServiceContractContentPack,
  civilServiceContractQuestion,
  civilServiceContractTopics,
} from "./civil-service-contract";
import {
  civilUsufructContentPack,
  civilUsufructQuestion,
  civilUsufructTopics,
} from "./civil-usufruct";
import {
  civilNeighborPossessionContentPack,
  civilNeighborPossessionQuestion,
  civilNeighborPossessionTopics,
} from "./civil-neighbor-possession";
import {
  civilQuasiContractContentPack,
  civilQuasiContractQuestion,
  civilQuasiContractTopics,
} from "./civil-quasi-contract";
import {
  civilInheritanceContentPack,
  civilInheritanceQuestion,
  civilInheritanceTopics,
} from "./civil-inheritance";
import {
  civilFamilyContentPack,
  civilFamilyQuestion,
  civilFamilyTopics,
} from "./civil-family";
import {
  civilPersonalityContentPack,
  civilPersonalityQuestion,
  civilPersonalityTopics,
} from "./civil-personality";
import {
  civilPileTreeRoadContentPack,
  civilPileTreeRoadQuestion,
  civilPileTreeRoadTopics,
} from "./civil-pile-tree-road";
import {
  civilEnvironmentObjectsContentPack,
  civilEnvironmentObjectsQuestion,
  civilEnvironmentObjectsTopics,
} from "./civil-environment-objects";
import {
  civilTrafficMedicalContentPack,
  civilTrafficMedicalQuestion,
  civilTrafficMedicalTopics,
} from "./civil-traffic-medical";
import {
  civilEducationProductContentPack,
  civilEducationProductQuestion,
  civilEducationProductTopics,
} from "./civil-education-product";
import {
  civilTortSpecialContentPack,
  civilTortSpecialQuestion,
  civilTortSpecialTopics,
} from "./civil-tort-special";
import {
  civilGuaranteeCoverageContentPack,
  civilGuaranteeCoverageQuestion,
  civilGuaranteeCoverageTopics,
} from "./civil-guarantee-coverage";
import {
  civilWorkMandateContentPack,
  civilWorkMandateQuestion,
  civilWorkMandateTopics,
} from "./civil-work-mandate";
import {
  civilGiftLoanContentPack,
  civilGiftLoanQuestion,
  civilGiftLoanTopics,
} from "./civil-gift-loan";
import {
  civilSaleLeaseContentPack,
  civilSaleLeaseQuestion,
  civilSaleLeaseTopics,
} from "./civil-sale-lease";
import {
  civilObligationsContentPack,
  civilObligationsQuestion,
  civilObligationsTopics,
} from "./civil-obligations";
import {
  civilFoundationsContentPack,
  civilFoundationsQuestion,
  civilFoundationsTopics,
} from "./civil-foundations";
import {
  civilPropertyContentPack,
  civilPropertyQuestion,
  civilPropertyTopics,
} from "./civil-property";
import {
  defenseLessonCorrection,
  defenseLessonRevision,
  defenseLessonSources,
} from "./criminal-defense-lesson-correction";
import {
  educationFacilitiesQuestions,
  educationFacilitiesRevision,
  educationFacilitiesCases,
  educationFacilitiesContentPack,
} from "./criminal-education-facilities";
import {
  negligentExplosionQuestions,
  negligentExplosionRevision,
  negligentExplosionCases,
  negligentExplosionContentPack,
} from "./criminal-negligent-explosion";
import {
  explosionQuestions,
  explosionRevision,
  explosionCases,
  explosionContentPack,
} from "./criminal-explosion";
import {
  broadcastFacilitiesTopic,
  broadcastFacilitiesRevision,
  broadcastFacilitiesSources,
  broadcastFacilitiesContentPack,
} from "./criminal-broadcast-facilities";
import {
  civilInsecurityStagesQuestions,
  civilInsecurityStagesRevision,
} from "./civil-insecurity-stages";
import { civilInsecurityStagesContentPack } from "./civil-insecurity-stages-registration";
import {
  criminalProcedureLegalityQuestions,
  criminalProcedureLegalityRevision,
} from "./criminal-procedure-legality";
import { criminalProcedureLegalityContentPack } from "./criminal-procedure-legality-registration";
import {
  civilProcedureEvidenceQuestions,
  civilProcedureEvidenceRevision,
} from "./civil-procedure-evidence";
import { civilProcedureEvidenceContentPack } from "./civil-procedure-evidence-registration";
import {
  civilProcedureProofBoundaryContentPack,
  civilProcedureProofBoundaryId,
  civilProcedureProofBoundaryRevision,
} from "./civil-procedure-evidence-registration";
import { commercialForfeitureTransferContentPack } from "./commercial-forfeiture-transfer";
import {
  octoberReviewedHistoricalPacks,
  historicalPracticePack,
  historicalPracticeQuestion,
  historicalPracticeTopicRevision,
  isHistoricalPracticeQuestion,
} from "./practice-content-history";
import {
  civilProcedureAgentAuthorityContentPack,
  civilProcedureAgentAuthorityQuestion,
  civilProcedureAgentAuthorityTopics,
} from "./civil-procedure-agent-authority";
import { commercialInformationRightContentPack } from "./commercial-information-right";
import { commercialEquityTransferContentPack } from "./commercial-equity-transfer";
import { commercialContributionForfeitureContentPack } from "./commercial-contribution-forfeiture";
import { commercialTransferContributionContentPack } from "./commercial-transfer-contribution";
import { administrativeSingleFineContentPack } from "./administrative-single-fine";
import { administrativeTemporalLawContentPack } from "./administrative-temporal-law";
import { administrativeTemporalLawHistoricalPacks } from "./administrative-temporal-law-history";
import {
  criminalProcedureArrestReviewContentPack,
  criminalProcedureArrestReviewQuestion,
  criminalProcedureArrestReviewTopics,
} from "./criminal-procedure-arrest-review";
import {
  criminalProcedureBailContentPack,
  criminalProcedureBailQuestion,
  criminalProcedureBailTopics,
} from "./criminal-procedure-bail";
import {
  civilGuaranteeContentPack,
  civilGuaranteeQuestion,
  civilGuaranteeTopics,
} from "./civil-guarantee";
import {
  criminalProcedureDefenseContentPack,
  criminalProcedureDefenseQuestion,
  criminalProcedureDefenseTopics,
} from "./criminal-procedure-defense";
import {
  civilProcedureProofBurdenContentPack,
  civilProcedureProofBurdenQuestion,
  civilProcedureProofBurdenLookupTopics as civilProcedureProofBurdenTopics,
} from "./civil-procedure-evidence-registration";
import { administrativeHearingContentPack } from "./administrative-hearing";
import {
  commercialTopics,
  commercialQuestion,
  commercialPackForTopic,
  commercialPackForQuestion,
} from "./commercial-registration";
import { commercialCompanyLiabilityContentPack } from "./commercial-company-liability";
import { commercialContributionTimingContentPack } from "./commercial-contribution-timing";
import {
  criminalProcedureBurdenContentPack,
  criminalProcedureBurdenTopics,
  criminalProcedureBurdenQuestion,
} from "./criminal-procedure-burden";
import { administrativeNonpunishmentContentPack } from "./administrative-nonpunishment";
import { administrativePenaltyDefenseContentPack } from "./administrative-penalty-defense";
import {
  administrativeTopics,
  administrativeQuestion,
  administrativePackForTopic,
  administrativePackForQuestion,
} from "./administrative-registration";
import {
  civilTortInstigationAssistanceContentPack,
  civilTortInstigationAssistanceTopics,
  civilTortInstigationAssistanceQuestion,
} from "./civil-tort-instigation-assistance";
import { administrativePenaltyCompulsionContentPack } from "./administrative-penalty-compulsion";
import { criminalProcedurePartialCorroborationQuestion } from "./criminal-procedure-partial-corroboration";
import {
  criminalProcedureProofPracticeTopics,
  criminalProcedurePartialCorroborationContentPack,
} from "./criminal-procedure-partial-registration";
import {
  criminalProcedureExclusionContentPack,
  criminalProcedureExclusionTopics,
  criminalProcedureExclusionQuestion,
} from "./criminal-procedure-legality-registration";
import {
  criminalProcedureProofContentPack,
  criminalProcedureProofTopics,
  criminalProcedureProofQuestion,
} from "./criminal-procedure-proof";
import { civilProcedureUnperformedTransferQuestion } from "./civil-procedure-unperformed-transfer";
import {
  civilProcedureContractPracticeTopics,
  civilProcedureUnperformedTransferContentPack,
} from "./civil-procedure-unperformed-registration";
import {
  civilMovableDeliveryContentPack,
  civilMovableDeliveryTopics,
  civilMovableDeliveryQuestion,
} from "./civil-movable-delivery";
import {
  civilProcedureUnagreedVenueContentPack,
  civilProcedureUnagreedVenueQuestion,
  civilProcedureUnagreedVenueTopics,
} from "./civil-procedure-unagreed-venue";
import {
  personalTortContentPack,
  personalTortQuestionFor,
  personalTortTopic,
  personalTortRevision,
  personalTortSources,
} from "./civil-tort-personal";
import {
  tortContentPack,
  tortQuestionFor,
  tortTopic,
  tortRevision,
  tortSources,
} from "./civil-tort-property";
import {
  civilProcedureIntegratedRevision,
  civilProcedureIntegratedSources,
  civilProcedureIntegratedQuestions,
  civilProcedureIntegratedQuestion,
} from "./civil-procedure-integrated-case";
import {
  civilProcedureJurisdictionResponseContentPack,
  civilProcedureJurisdictionResponseQuestion,
  civilProcedureJurisdictionResponseTopics,
} from "./civil-procedure-jurisdiction-response";
import {
  civilContractIntegratedRevision,
  civilContractIntegratedSources,
  civilContractIntegratedQuestions,
  civilContractIntegratedQuestion,
} from "./civil-contract-integrated-case";
import { civilContractPerformanceSources } from "./civil-insecurity-stages-registration";
import { civilContractRemediesSources } from "./civil-contract-remedies";
import { civilContractLossesSources } from "./civil-contract-losses";
import {
  civilStipulatedLiabilityContentPack,
  civilStipulatedLiabilityTopics,
  civilStipulatedLiabilityQuestion,
} from "./civil-stipulated-liability";
import {
  civilContractLossesContentPack,
  civilContractLossesTopics,
  civilContractLossesQuestion,
} from "./civil-contract-losses";
import {
  cl02OmissionScopeCorrections,
  cl02OmissionScopeRevision,
} from "./criminal-cl02-omission-scope-corrections";
import {
  cl02GasBoundaryCorrections,
  cl02GasBoundaryRevision,
} from "./criminal-cl02-gas-boundary";
import {
  unpublishedTradingRevision,
  unpublishedTradingSources,
  unpublishedTradingTopic,
} from "./criminal-unpublished-trading";
import {
  stateUnityRevision,
  stateUnitySources,
  stateUnityTopic,
} from "./criminal-state-unity";
import {
  specialAccidentRevision,
  specialAccidentSources,
  specialAccidentTopics,
} from "./criminal-special-accidents";
import {
  borderQuestionScopeCorrections,
  borderQuestionScopeRevision,
  borderQuestionScopeSources,
} from "./criminal-border-question-scope-corrections";
import {
  witnessRetaliationRevision,
  witnessRetaliationSources,
  witnessRetaliationTopic,
} from "./criminal-witness-retaliation";
import {
  custodyEscortCases,
  custodyEscortRevision,
  custodyEscortSources,
  custodyEscortTopicId,
  expandCustodyEscortKnowledge,
} from "./criminal-custody-escort";
import {
  courtOrderItemCases,
  courtOrderItemRevision,
  courtOrderItemSnapshot,
} from "./criminal-court-order-items";
import {
  courtOrderRevision,
  courtOrderSources,
  courtOrderTopic,
} from "./criminal-court-order";
import {
  procurementContentCorrections,
  procurementContentCorrectionRevision,
} from "./criminal-procurement-content-corrections";
import {
  feedbackBoundaryCorrections,
  feedbackBoundaryRevision,
  feedbackBoundarySources,
} from "./criminal-feedback-boundary-corrections";
import {
  statutoryBoundaryCases,
  statutoryBoundaryRevision,
  statutoryBoundarySources,
} from "./criminal-person-gaps/statutory-boundaries";
import {
  marriageRubricReviewCorrections,
  marriageRubricReviewRevision,
} from "./criminal-marriage-rubric-review-corrections";
import {
  rescueObstructionCases,
  rescueObstructionRevision,
  rescueObstructionSources,
} from "./criminal-person-gaps/rescue-obstruction";
import {
  personRubricReviewCorrections,
  personRubricReviewRevision,
} from "./criminal-person-rubric-review-corrections";
import {
  resaleCases,
  resaleRevision,
  resaleSources,
  expandResaleKnowledge,
  hasResaleKnowledge,
} from "./criminal-person-gaps/resale";
import {
  minorOrganizationCases,
  minorOrganizationRevision,
  minorOrganizationSources,
  expandMinorOrganizationKnowledge,
  hasMinorOrganizationKnowledge,
} from "./criminal-person-gaps/minor-organization";
import { personGapCases, personGapRevision } from "./criminal-person-gaps";
import {
  personGapSources,
  expandPersonGapKnowledge,
  hasPersonGapKnowledge,
} from "./criminal-person-gaps/knowledge";
import {
  generalGapReviewCorrections,
  generalGapReviewRevision,
} from "./criminal-general-gap-review-corrections";
import { executionCases, executionRevision } from "./criminal-execution";
import {
  executionSources,
  hasExecutionKnowledge,
  expandExecutionKnowledge,
} from "./criminal-execution/knowledge";
import { generalGapCases, generalGapRevision } from "./criminal-general-gaps";
import {
  generalGapTopics,
  expandGeneralKnowledge,
  hasGeneralGapKnowledge,
} from "./criminal-general-gaps/knowledge";
import { generalGapSources } from "./criminal-general-gaps/sources";
import {
  basicsKnowledgeRevision,
  basicsKnowledgeSources,
  correctBasicsKnowledge,
  hasBasicsKnowledgeCorrection,
} from "./criminal-basics-knowledge-corrections";
import { faultTopics, faultSources, faultUnitRevision } from "./fault-unit";
import { intentCaseChoice, intentCaseRevision } from "./intent-case";
import {
  confidenceCaseSubjective,
  confidenceCaseRevision,
} from "./confidence-case";
import {
  transferTopic,
  transferSources,
  transferRevision,
} from "./fault-transfer";
import { practiceExamCases, practiceExamRevision } from "./practice-exam-cases";
import {
  practiceFaultCases,
  practiceFaultRevision,
} from "./practice-fault-cases";
import { practiceFactCases, practiceFactRevision } from "./practice-fact-cases";
import {
  practiceFoundationCases,
  practiceFoundationRevision,
} from "./practice-foundation-cases";
import {
  objectMistakeTopic,
  objectMistakeRevision,
  objectMistakeSources,
} from "./object-mistake";
import {
  blowMistakeTopic,
  blowMistakeRevision,
  blowMistakeSources,
} from "./blow-mistake";
import type { ContentSources, FaultTopic } from "./fault-unit";
import { packageOneCases, packageOneRevision } from "./criminal-package-one";
import {
  packageOneCorrections,
  packageOneCorrectionSources,
  packageOneCorrectionsRevision,
} from "./criminal-package-one-corrections";
import { generalCases, generalRevision } from "./criminal-general";
import {
  generalCorrections,
  generalCorrectionsRevision,
} from "./criminal-general-corrections";
import {
  sentencingCorrections,
  sentencingCorrectionsRevision,
  sentencingCorrectionSources,
} from "./criminal-sentencing-corrections";
import {
  generalAuditCorrections,
  generalAuditRevision,
  generalAuditSources,
} from "./criminal-general-audit-corrections";
import {
  specialAuditCorrections,
  specialAuditRevision,
  specialAuditSources,
} from "./criminal-special-audit-corrections";
import {
  remainingAuditCorrections,
  remainingAuditRevision,
  remainingAuditSources,
} from "./criminal-remaining-audit-corrections";
import {
  personCorrections,
  personCorrectionsRevision,
  personCorrectionSources,
} from "./criminal-person-corrections";
import {
  propertySafetyCorrections,
  propertySafetyCorrectionsRevision,
  propertySafetyCorrectionSources,
} from "./criminal-property-safety-corrections";
import { generalTopics, generalSources } from "./criminal-general/knowledge";
import { personCases, personRevision } from "./criminal-person";
import { personTopics, personSources } from "./criminal-person/knowledge";
import { propertyCases, propertyRevision } from "./criminal-property";
import { propertyTopics, propertySources } from "./criminal-property/knowledge";
import { safetyCases, safetyRevision } from "./criminal-safety";
import { safetyTopics, safetySources } from "./criminal-safety/knowledge";
import { economicCases, economicRevision } from "./criminal-economic";
import { economicTopics, economicSources } from "./criminal-economic/knowledge";
import {
  economicCorrections,
  economicCorrectionsRevision,
  economicCorrectionSources,
} from "./criminal-economic-corrections";
import {
  worksiteCorrections,
  worksiteCorrectionRevision,
  worksiteCorrectionSources,
} from "./criminal-worksite-corrections";
import { socialCases, socialRevision } from "./criminal-social";
import { socialTopics, socialSources } from "./criminal-social/knowledge";
import {
  socialCorrections,
  socialCorrectionsRevision,
  socialCorrectionSources,
} from "./criminal-social-corrections";
import { officeCases, officeRevision } from "./criminal-office";
import { officeTopics, officeSources } from "./criminal-office/knowledge";
import {
  officeCorrections,
  officeCorrectionsRevision,
  officeCorrectionSources,
} from "./criminal-office-corrections";
import {
  capstoneLongCases,
  capstoneGapCases,
  capstoneRevision,
} from "./criminal-capstone";
import { capstoneTopics } from "./criminal-capstone/knowledge";
import { capstoneSources } from "./criminal-capstone/sources";
import {
  packageOneTopics,
  packageOneSources,
} from "./criminal-package-one/knowledge";
import {
  foundationCases,
  foundationRevision,
} from "./criminal-foundation-samples";
import {
  foundationTopics,
  foundationSources,
} from "./criminal-foundation-topics";
export { faultTopics, faultSources, faultUnitRevision } from "./fault-unit";
const previousLearningTopics = [
  ...faultTopics.map((original) => {
    const topic = {
      ...original,
      exercises: [
        ...original.exercises,
        ...practiceExamCases
          .filter((c) => c.topicId === original.id)
          .map((c) => c.exercise),
        ...practiceFaultCases
          .filter((c) => c.topicId === original.id)
          .map((c) => c.exercise),
        ...practiceFactCases
          .filter((c) => c.topicId === original.id)
          .map((c) => c.exercise),
        ...practiceFoundationCases
          .filter((c) => c.topicId === original.id)
          .map((c) => c.exercise),
      ],
    };
    return topic.id === "intent"
      ? { ...topic, exercises: [...topic.exercises, intentCaseChoice] }
      : topic.id === "confidence"
        ? {
            ...topic,
            exercises: [...topic.exercises, confidenceCaseSubjective],
          }
        : topic;
  }),
  transferTopic,
  objectMistakeTopic,
  blowMistakeTopic,
];
const sampleLearningTopics = [
  ...previousLearningTopics.map((topic) => ({
    ...topic,
    exercises: [
      ...topic.exercises,
      ...foundationCases
        .filter((c) => c.topicId === topic.id)
        .map((c) => c.exercise),
    ],
  })),
  ...foundationTopics,
];
const packageOneLearningTopics = [
  ...sampleLearningTopics.map((topic) => ({
    ...topic,
    exercises: [
      ...topic.exercises,
      ...packageOneCases
        .filter((c) => c.topicId === topic.id)
        .map((c) => c.exercise),
    ],
  })),
  ...packageOneTopics,
].map((topic) => ({
  ...topic,
  exercises: [
    ...topic.exercises,
    ...packageOneCorrections
      .filter((c) => c.topicId === topic.id)
      .map((c) => c.exercise),
  ],
}));
const beforeCapstoneTopics = [
  ...packageOneLearningTopics.map((topic) => ({
    ...topic,
    exercises: [
      ...topic.exercises,
      ...generalCases
        .filter((c) => c.topicId === topic.id)
        .map((c) => c.exercise),
    ],
  })),
  ...generalTopics.map((topic) => ({
    ...topic,
    exercises: [
      ...topic.exercises,
      ...generalCorrections
        .filter((c) => c.topicId === topic.id)
        .map((c) => c.exercise),
      ...sentencingCorrections
        .filter((c) => c.topicId === topic.id)
        .map((c) => c.exercise),
      ...generalAuditCorrections
        .filter((c) => c.topicId === topic.id)
        .map((c) => c.exercise),
    ],
  })),
  ...personTopics.map((topic) => ({
    ...topic,
    exercises: [
      ...topic.exercises,
      ...personCorrections
        .filter((c) => c.topicId === topic.id)
        .map((c) => c.exercise),
    ],
  })),
  ...propertyTopics.map((topic) => ({
    ...topic,
    exercises: [
      ...topic.exercises,
      ...propertySafetyCorrections
        .filter((c) => c.topicId === topic.id)
        .map((c) => c.exercise),
    ],
  })),
  broadcastFacilitiesTopic,
  ...safetyTopics.map((topic) => ({
    ...topic,
    exercises: [
      ...topic.exercises,
      ...propertySafetyCorrections
        .filter((c) => c.topicId === topic.id)
        .map((c) => c.exercise),
      ...explosionCases
        .filter((c) => c.topicId === topic.id)
        .map((c) => c.exercise),
      ...negligentExplosionCases
        .filter((c) => c.topicId === topic.id)
        .map((c) => c.exercise),
      ...educationFacilitiesCases
        .filter((c) => c.topicId === topic.id)
        .map((c) => c.exercise),
    ],
  })),
  ...economicTopics,
  ...socialTopics,
  ...officeTopics,
];
const publishedLearningTopics = [
  ...beforeCapstoneTopics.map((topic) => ({
    ...topic,
    exercises: [
      ...topic.exercises,
      ...capstoneLongCases
        .filter((c) => c.topicId === topic.id)
        .map((c) => c.exercise),
      ...economicCorrections
        .filter((c) => c.topicId === topic.id)
        .map((c) => c.exercise),
      ...socialCorrections
        .filter((c) => c.topicId === topic.id)
        .map((c) => c.exercise),
      ...officeCorrections
        .filter((c) => c.topicId === topic.id)
        .map((c) => c.exercise),
      ...worksiteCorrections
        .filter((c) => c.topicId === topic.id)
        .map((c) => c.exercise),
    ],
  })),
  ...capstoneTopics,
];
export const learningTopics = [
  ...publishedLearningTopics.map((topic) => ({
    ...expandCustodyEscortKnowledge(
      expandResaleKnowledge(
        expandMinorOrganizationKnowledge(
          expandPersonGapKnowledge(
            expandExecutionKnowledge(
              expandGeneralKnowledge(correctBasicsKnowledge(topic)),
            ),
          ),
        ),
      ),
    ),
    exercises: [
      ...topic.exercises,
      ...(topic.id === defenseLessonCorrection.topicId
        ? [defenseLessonCorrection.exercise]
        : []),
      ...cl02OmissionScopeCorrections
        .filter((c) => c.topicId === topic.id)
        .map((c) => c.exercise),
      ...cl02GasBoundaryCorrections
        .filter((c) => c.topicId === topic.id)
        .map((c) => c.exercise),
      ...custodyEscortCases
        .filter((c) => c.topicId === topic.id)
        .map((c) => c.exercise),
      ...borderQuestionScopeCorrections
        .filter((c) => c.topicId === topic.id)
        .map((c) => c.exercise),
      ...procurementContentCorrections
        .filter((c) => c.topicId === topic.id)
        .map((c) => c.exercise),
      ...feedbackBoundaryCorrections
        .filter((c) => c.topicId === topic.id)
        .map((c) => c.exercise),
      ...statutoryBoundaryCases
        .filter((item) => item.topicId === topic.id)
        .map((item) => item.exercise),
      ...specialAuditCorrections
        .filter((item) => item.topicId === topic.id)
        .map((item) => item.exercise),
      ...remainingAuditCorrections
        .filter((item) => item.topicId === topic.id)
        .map((item) => item.exercise),
      ...marriageRubricReviewCorrections
        .filter((item) => item.topicId === topic.id)
        .map((item) => item.exercise),
      ...rescueObstructionCases
        .filter((item) => item.topicId === topic.id)
        .map((item) => item.exercise),
      ...resaleCases
        .filter((item) => item.topicId === topic.id)
        .map((item) => item.exercise),
      ...minorOrganizationCases
        .filter((item) => item.topicId === topic.id)
        .map((item) => item.exercise),
      ...personRubricReviewCorrections
        .filter((item) => item.topicId === topic.id)
        .map((item) => item.exercise),
      ...personGapCases
        .filter((item) => item.topicId === topic.id)
        .map((item) => item.exercise),
      ...executionCases
        .filter((item) => item.topicId === topic.id)
        .map((item) => item.exercise),
      ...generalGapCases
        .filter((item) => item.topicId === topic.id)
        .map((item) => item.exercise),
    ],
  })),
  ...generalGapTopics.map((topic) => ({
    ...topic,
    exercises: [
      ...topic.exercises,
      ...generalGapReviewCorrections
        .filter((item) => item.topicId === topic.id)
        .map((item) => item.exercise),
    ],
  })),
  {
    ...courtOrderTopic,
    exercises: [
      ...courtOrderTopic.exercises,
      ...courtOrderItemCases.map(({ exercise }) => exercise),
    ],
  },
  witnessRetaliationTopic,
  ...specialAccidentTopics,
  stateUnityTopic,
  unpublishedTradingTopic,
];

export const contentPacks: {
  revision: string;
  snapshot: { topics: FaultTopic[]; sources: ContentSources };
}[] = [
  {
    revision: defenseLessonRevision,
    snapshot: {
      topics: [
        {
          ...publishedLearningTopics.find(
            (t) => t.id === defenseLessonCorrection.topicId,
          )!,
          exercises: [defenseLessonCorrection.exercise],
        },
      ],
      sources: defenseLessonSources,
    },
  },
  {
    revision: faultUnitRevision,
    snapshot: { topics: faultTopics, sources: faultSources },
  },
  {
    revision: transferRevision,
    snapshot: { topics: [transferTopic], sources: transferSources },
  },
  {
    revision: intentCaseRevision,
    snapshot: {
      topics: [
        {
          ...faultTopics.find((t) => t.id === "intent")!,
          exercises: [intentCaseChoice],
        },
      ],
      sources: faultSources,
    },
  },
  {
    revision: confidenceCaseRevision,
    snapshot: {
      topics: [
        {
          ...faultTopics.find((t) => t.id === "confidence")!,
          exercises: [confidenceCaseSubjective],
        },
      ],
      sources: faultSources,
    },
  },
  {
    revision: practiceExamRevision,
    snapshot: {
      topics: practiceExamCases.map(({ topicId, exercise }) => ({
        ...faultTopics.find((t) => t.id === topicId)!,
        exercises: [exercise],
      })),
      sources: faultSources,
    },
  },
  {
    revision: practiceFaultRevision,
    snapshot: {
      topics: practiceFaultCases.map(({ topicId, exercise }) => ({
        ...faultTopics.find((t) => t.id === topicId)!,
        exercises: [exercise],
      })),
      sources: faultSources,
    },
  },
  {
    revision: practiceFactRevision,
    snapshot: {
      topics: practiceFactCases.map(({ topicId, exercise }) => ({
        ...faultTopics.find((t) => t.id === topicId)!,
        exercises: [exercise],
      })),
      sources: faultSources,
    },
  },
  {
    revision: practiceFoundationRevision,
    snapshot: {
      topics: practiceFoundationCases.map(({ topicId, exercise }) => ({
        ...faultTopics.find((t) => t.id === topicId)!,
        exercises: [exercise],
      })),
      sources: faultSources,
    },
  },
  {
    revision: objectMistakeRevision,
    snapshot: { topics: [objectMistakeTopic], sources: objectMistakeSources },
  },
  {
    revision: blowMistakeRevision,
    snapshot: { topics: [blowMistakeTopic], sources: blowMistakeSources },
  },
  {
    revision: foundationRevision,
    snapshot: {
      topics: [...new Set(foundationCases.map((c) => c.topicId))].map((id) => ({
        ...publishedLearningTopics.find((t) => t.id === id)!,
        sources: [
          ...new Set(
            foundationCases
              .filter((c) => c.topicId === id)
              .flatMap((c) => c.exercise.sources),
          ),
        ],
        exercises: foundationCases
          .filter((c) => c.topicId === id)
          .map((c) => c.exercise),
      })),
      sources: foundationSources,
    },
  },
  {
    revision: packageOneRevision,
    snapshot: {
      topics: [...new Set(packageOneCases.map((c) => c.topicId))].map((id) => ({
        ...publishedLearningTopics.find((t) => t.id === id)!,
        sources: [
          ...new Set(
            packageOneCases
              .filter((c) => c.topicId === id)
              .flatMap((c) => c.exercise.sources),
          ),
        ],
        exercises: packageOneCases
          .filter((c) => c.topicId === id)
          .map((c) => c.exercise),
      })),
      sources: packageOneSources,
    },
  },
  {
    revision: packageOneCorrectionsRevision,
    snapshot: {
      topics: packageOneCorrections.map(({ topicId, exercise }) => ({
        ...publishedLearningTopics.find((t) => t.id === topicId)!,
        sources: exercise.sources,
        exercises: [exercise],
      })),
      sources: packageOneCorrectionSources,
    },
  },
  {
    revision: generalRevision,
    snapshot: {
      topics: [...new Set(generalCases.map((c) => c.topicId))].map((id) => ({
        ...publishedLearningTopics.find((t) => t.id === id)!,
        sources: [
          ...new Set(
            generalCases
              .filter((c) => c.topicId === id)
              .flatMap((c) => c.exercise.sources),
          ),
        ],
        exercises: generalCases
          .filter((c) => c.topicId === id)
          .map((c) => c.exercise),
      })),
      sources: generalSources,
    },
  },
  {
    revision: generalCorrectionsRevision,
    snapshot: {
      topics: generalCorrections.map(({ topicId, exercise }) => ({
        ...publishedLearningTopics.find((t) => t.id === topicId)!,
        sources: exercise.sources,
        exercises: [exercise],
      })),
      sources: generalSources,
    },
  },
  {
    revision: sentencingCorrectionsRevision,
    snapshot: {
      topics: sentencingCorrections.map(({ topicId, exercise }) => ({
        ...publishedLearningTopics.find((t) => t.id === topicId)!,
        sources: exercise.sources,
        exercises: [exercise],
      })),
      sources: sentencingCorrectionSources,
    },
  },
  {
    revision: generalAuditRevision,
    snapshot: {
      topics: generalAuditCorrections.map(({ topicId, exercise }) => ({
        ...publishedLearningTopics.find((t) => t.id === topicId)!,
        sources: exercise.sources,
        exercises: [exercise],
      })),
      sources: generalAuditSources,
    },
  },
  {
    revision: personRevision,
    snapshot: { topics: personTopics, sources: personSources },
  },
  {
    revision: personCorrectionsRevision,
    snapshot: {
      topics: personCorrections.map(({ topicId, exercise }) => ({
        ...publishedLearningTopics.find((t) => t.id === topicId)!,
        sources: exercise.sources,
        exercises: [exercise],
      })),
      sources: personCorrectionSources,
    },
  },
  {
    revision: propertyRevision,
    snapshot: { topics: propertyTopics, sources: propertySources },
  },
  {
    revision: safetyRevision,
    snapshot: { topics: safetyTopics, sources: safetySources },
  },
  {
    revision: propertySafetyCorrectionsRevision,
    snapshot: {
      topics: propertySafetyCorrections.map(({ topicId, exercise }) => ({
        ...publishedLearningTopics.find((t) => t.id === topicId)!,
        sources: exercise.sources,
        exercises: [exercise],
      })),
      sources: propertySafetyCorrectionSources,
    },
  },
  {
    revision: economicRevision,
    snapshot: { topics: economicTopics, sources: economicSources },
  },
  {
    revision: economicCorrectionsRevision,
    snapshot: {
      topics: economicCorrections.map(({ topicId, exercise }) => ({
        ...publishedLearningTopics.find((t) => t.id === topicId)!,
        sources: exercise.sources,
        exercises: [exercise],
      })),
      sources: economicCorrectionSources,
    },
  },
  {
    revision: socialRevision,
    snapshot: { topics: socialTopics, sources: socialSources },
  },
  {
    revision: socialCorrectionsRevision,
    snapshot: {
      topics: socialCorrections.map(({ topicId, exercise }) => ({
        ...publishedLearningTopics.find((t) => t.id === topicId)!,
        sources: exercise.sources,
        exercises: [exercise],
      })),
      sources: socialCorrectionSources,
    },
  },
  {
    revision: officeRevision,
    snapshot: { topics: officeTopics, sources: officeSources },
  },
  {
    revision: officeCorrectionsRevision,
    snapshot: {
      topics: officeCorrections.map(({ topicId, exercise }) => ({
        ...publishedLearningTopics.find((t) => t.id === topicId)!,
        sources: exercise.sources,
        exercises: [exercise],
      })),
      sources: officeCorrectionSources,
    },
  },
  {
    revision: capstoneRevision,
    snapshot: {
      topics: [
        ...capstoneTopics,
        ...[...new Set(capstoneLongCases.map((c) => c.topicId))].map((id) => ({
          ...publishedLearningTopics.find((t) => t.id === id)!,
          sources: [
            ...new Set(
              capstoneLongCases
                .filter((c) => c.topicId === id)
                .flatMap((c) => c.exercise.sources),
            ),
          ],
          exercises: capstoneLongCases
            .filter((c) => c.topicId === id)
            .map((c) => c.exercise),
        })),
      ],
      sources: capstoneSources,
    },
  },
  {
    revision: worksiteCorrectionRevision,
    snapshot: {
      topics: worksiteCorrections.map(({ topicId, exercise }) => ({
        ...publishedLearningTopics.find((t) => t.id === topicId)!,
        sources: exercise.sources,
        exercises: [exercise],
      })),
      sources: worksiteCorrectionSources,
    },
  },
  {
    revision: basicsKnowledgeRevision,
    snapshot: {
      topics: learningTopics
        .filter((topic) => hasBasicsKnowledgeCorrection(topic.id))
        .map((topic) => ({ ...topic, exercises: [] })),
      sources: basicsKnowledgeSources,
    },
  },
  {
    revision: specialAuditRevision,
    snapshot: {
      topics: specialAuditCorrections.map(({ topicId, exercise }) => ({
        ...publishedLearningTopics.find((topic) => topic.id === topicId)!,
        sources: exercise.sources,
        exercises: [exercise],
      })),
      sources: specialAuditSources,
    },
  },
  {
    revision: remainingAuditRevision,
    snapshot: {
      topics: remainingAuditCorrections.map(({ topicId, exercise }) => ({
        ...publishedLearningTopics.find((topic) => topic.id === topicId)!,
        sources: exercise.sources,
        exercises: [exercise],
      })),
      sources: remainingAuditSources,
    },
  },
  {
    revision: executionRevision,
    snapshot: {
      topics: [...new Set(executionCases.map((item) => item.topicId))].map(
        (id) => ({
          ...learningTopics.find((topic) => topic.id === id)!,
          exercises: executionCases
            .filter((item) => item.topicId === id)
            .map((item) => item.exercise),
        }),
      ),
      sources: executionSources,
    },
  },
  {
    revision: generalGapRevision,
    snapshot: {
      topics: [...new Set(generalGapCases.map((item) => item.topicId))].map(
        (id) => ({
          ...learningTopics.find((topic) => topic.id === id)!,
          exercises: generalGapCases
            .filter((item) => item.topicId === id)
            .map((item) => item.exercise),
        }),
      ),
      sources: generalGapSources,
    },
  },
  {
    revision: generalGapReviewRevision,
    snapshot: {
      topics: generalGapReviewCorrections.map(({ topicId, exercise }) => ({
        ...learningTopics.find((topic) => topic.id === topicId)!,
        sources: exercise.sources,
        exercises: [exercise],
      })),
      sources: generalGapSources,
    },
  },
  {
    revision: borderQuestionScopeRevision,
    snapshot: {
      topics: borderQuestionScopeCorrections.map(({ topicId, exercise }) => ({
        ...socialTopics.find((topic) => topic.id === topicId)!,
        sources: exercise.sources,
        exercises: [exercise],
      })),
      sources: borderQuestionScopeSources,
    },
  },
  {
    revision: procurementContentCorrectionRevision,
    snapshot: {
      topics: procurementContentCorrections.map(({ topicId, exercise }) => ({
        ...learningTopics.find((topic) => topic.id === topicId)!,
        sources: exercise.sources,
        exercises: [exercise],
      })),
      sources: capstoneSources,
    },
  },
  {
    revision: feedbackBoundaryRevision,
    snapshot: {
      topics: feedbackBoundaryCorrections.map(({ topicId, exercise }) => ({
        ...learningTopics.find((topic) => topic.id === topicId)!,
        sources: exercise.sources,
        exercises: [exercise],
      })),
      sources: feedbackBoundarySources,
    },
  },
  {
    revision: statutoryBoundaryRevision,
    snapshot: {
      topics: statutoryBoundaryCases.map(({ topicId, exercise }) => ({
        ...learningTopics.find((topic) => topic.id === topicId)!,
        sources: exercise.sources,
        exercises: [exercise],
      })),
      sources: statutoryBoundarySources,
    },
  },
  {
    revision: cl02GasBoundaryRevision,
    snapshot: {
      topics: cl02GasBoundaryCorrections.map(({ topicId, exercise }) => ({
        ...learningTopics.find((topic) => topic.id === topicId)!,
        sources: exercise.sources,
        exercises: [exercise],
      })),
      sources: packageOneCorrectionSources,
    },
  },
  {
    revision: cl02OmissionScopeRevision,
    snapshot: {
      topics: cl02OmissionScopeCorrections.map(({ topicId, exercise }) => ({
        ...learningTopics.find((topic) => topic.id === topicId)!,
        sources: exercise.sources,
        exercises: [exercise],
      })),
      sources: packageOneSources,
    },
  },
  {
    revision: marriageRubricReviewRevision,
    snapshot: {
      topics: marriageRubricReviewCorrections.map(({ topicId, exercise }) => ({
        ...learningTopics.find((topic) => topic.id === topicId)!,
        sources: exercise.sources,
        exercises: [exercise],
      })),
      sources: capstoneSources,
    },
  },
  {
    revision: rescueObstructionRevision,
    snapshot: {
      topics: rescueObstructionCases.map(({ topicId, exercise }) => ({
        ...learningTopics.find((topic) => topic.id === topicId)!,
        sources: exercise.sources,
        exercises: [exercise],
      })),
      sources: rescueObstructionSources,
    },
  },
  {
    revision: personRubricReviewRevision,
    snapshot: {
      topics: personRubricReviewCorrections.map(({ topicId, exercise }) => ({
        ...learningTopics.find((topic) => topic.id === topicId)!,
        sources: exercise.sources,
        exercises: [exercise],
      })),
      sources: personGapSources,
    },
  },
  {
    revision: personGapRevision,
    snapshot: {
      topics: [...new Set(personGapCases.map((item) => item.topicId))].map(
        (id) => ({
          ...learningTopics.find((topic) => topic.id === id)!,
          exercises: personGapCases
            .filter((item) => item.topicId === id)
            .map((item) => item.exercise),
        }),
      ),
      sources: personGapSources,
    },
  },
  {
    revision: minorOrganizationRevision,
    snapshot: {
      topics: [...new Set(minorOrganizationCases.map((c) => c.topicId))].map(
        (id) => ({
          ...learningTopics.find((t) => t.id === id)!,
          exercises: minorOrganizationCases
            .filter((c) => c.topicId === id)
            .map((c) => c.exercise),
        }),
      ),
      sources: minorOrganizationSources,
    },
  },
  {
    revision: resaleRevision,
    snapshot: {
      topics: [...new Set(resaleCases.map((c) => c.topicId))].map((id) => ({
        ...learningTopics.find((t) => t.id === id)!,
        exercises: resaleCases
          .filter((c) => c.topicId === id)
          .map((c) => c.exercise),
      })),
      sources: resaleSources,
    },
  },
  {
    revision: courtOrderRevision,
    snapshot: { topics: [courtOrderTopic], sources: courtOrderSources },
  },
  { revision: courtOrderItemRevision, snapshot: courtOrderItemSnapshot },
  {
    revision: custodyEscortRevision,
    snapshot: {
      topics: [
        {
          ...expandCustodyEscortKnowledge(
            capstoneTopics.find((t) => t.id === custodyEscortTopicId)!,
          ),
          exercises: custodyEscortCases.map((c) => c.exercise),
        },
      ],
      sources: custodyEscortSources,
    },
  },
  {
    revision: witnessRetaliationRevision,
    snapshot: {
      topics: [witnessRetaliationTopic],
      sources: witnessRetaliationSources,
    },
  },
  {
    revision: specialAccidentRevision,
    snapshot: {
      topics: specialAccidentTopics,
      sources: specialAccidentSources,
    },
  },
  {
    revision: stateUnityRevision,
    snapshot: { topics: [stateUnityTopic], sources: stateUnitySources },
  },
  {
    revision: unpublishedTradingRevision,
    snapshot: {
      topics: [unpublishedTradingTopic],
      sources: unpublishedTradingSources,
    },
  },
  civilAgencyContentPackCandidate,
  civilContractFormationContentPack,
  civilContractPerformanceContentPack,
  civilActValidityContentPack,
  civilProcedureFilingVenueContentPack,
  civilContractRemediesContentPack,
  civilContractLossesContentPack,
  civilStipulatedLiabilityContentPack,
  {
    revision: civilContractIntegratedRevision,
    snapshot: {
      topics: [
        civilContractPerformanceTopic,
        ...civilContractRemediesTopics,
        ...civilContractLossesTopics,
      ]
        .filter((topic) =>
          civilContractIntegratedQuestions.some(
            (q) => q.relatedTopicIds?.[0] === topic.id,
          ),
        )
        .map((topic) => ({
          ...topic,
          exercises: civilContractIntegratedQuestions.filter(
            (q) => q.relatedTopicIds?.[0] === topic.id,
          ),
        })),
      sources: {
        ...civilContractPerformanceSources,
        ...civilContractRemediesSources,
        ...civilContractLossesSources,
        ...civilContractIntegratedSources,
      },
    },
  },
  civilProcedureJurisdictionResponseContentPack,
  {
    revision: civilProcedureIntegratedRevision,
    snapshot: {
      topics: [
        ...civilProcedureFilingVenueTopics,
        ...civilProcedureJurisdictionResponseTopics,
      ]
        .filter((topic) =>
          civilProcedureIntegratedQuestions.some(
            (q) => q.relatedTopicIds?.[0] === topic.id,
          ),
        )
        .map((topic) => ({
          ...topic,
          exercises: civilProcedureIntegratedQuestions.filter(
            (q) => q.relatedTopicIds?.[0] === topic.id,
          ),
        })),
      sources: {
        ...civilProcedureFilingVenueContentPack.snapshot.sources,
        ...civilProcedureJurisdictionResponseContentPack.snapshot.sources,
        ...civilProcedureIntegratedSources,
      },
    },
  },
  tortContentPack,
  personalTortContentPack,
  civilProcedureContractVenueContentPack,
  civilProcedureUnagreedVenueContentPack,
  civilMovableDeliveryContentPack,
  civilProcedureUnperformedTransferContentPack,
  criminalProcedureProofContentPack,
  criminalProcedureExclusionContentPack,
  criminalProcedureLegalityContentPack,
  civilInsecurityStagesContentPack,
  broadcastFacilitiesContentPack,
  explosionContentPack,
  negligentExplosionContentPack,
  educationFacilitiesContentPack,
  criminalProcedurePartialCorroborationContentPack,
  administrativePenaltyCompulsionContentPack,
  civilTortInstigationAssistanceContentPack,
  administrativePenaltyDefenseContentPack,
  administrativeNonpunishmentContentPack,
  criminalProcedureBurdenContentPack,
  commercialCompanyLiabilityContentPack,
  commercialContributionTimingContentPack,
  civilProcedureProofBurdenContentPack,
  civilProcedureEvidenceContentPack,
  administrativeHearingContentPack,
  criminalProcedureDefenseContentPack,
  civilGuaranteeContentPack,
  criminalProcedureBailContentPack,
  administrativeSingleFineContentPack,
  civilProcedureAgentAuthorityContentPack,
  commercialInformationRightContentPack,
  commercialEquityTransferContentPack,
  ...octoberReviewedHistoricalPacks,
  commercialContributionForfeitureContentPack,
  commercialTransferContributionContentPack,
  commercialForfeitureTransferContentPack,
  criminalProcedureArrestReviewContentPack,
  ...administrativeTemporalLawHistoricalPacks,
  administrativeTemporalLawContentPack,
  civilProcedureProofBoundaryContentPack,
  civilFoundationsContentPack,
  civilPropertyContentPack,
  civilObligationsContentPack,
  civilSaleLeaseContentPack,
  civilGiftLoanContentPack,
  civilWorkMandateContentPack,
  civilGuaranteeCoverageContentPack,
  civilTortSpecialContentPack,
  civilEducationProductContentPack,
  civilTrafficMedicalContentPack,
  civilEnvironmentObjectsContentPack,
  civilPileTreeRoadContentPack,
  civilPersonalityContentPack,
  civilFamilyContentPack,
  civilInheritanceContentPack,
  civilQuasiContractContentPack,
  civilNeighborPossessionContentPack,
  civilUsufructContentPack,
  civilServiceContractContentPack,
  civilFinanceAgencyContentPack,
  civilProjectTechPartnershipContentPack,
  civilBoundedGapsContentPack,
  civilProcedurePartiesContentPack,
  civilProcedureFoundationsContentPack,
  civilProcedureEvidenceProcessContentPack,
  civilProcedureFirstInstanceContentPack,
  civilProcedureRemediesSpecialContentPack,
  civilProcedureExecutionContentPack,
  civilProcedureForeignContentPack,
  civilProcedureArbitrationContentPack,
  civilProcedureGapFillContentPack,
  civilProcedureProceduralDetailsContentPack,
  criminalProcedureG1ContentPack,
  administrativeG4ContentPack,
  commercialG5ContentPack,
  criminalProcedureFoundationsContentPack,
  civilProcedureCrossChapterContentPack,
  remainingG6ContentPack,
  annualG8ContentPack,
  trademarkG8ContentPack,
  ecologyG8ContentPack,
  g8CompletionContentPack,
];
import {
  civilProcedureContractVenueContentPack,
  civilProcedureContractVenueQuestion,
  civilProcedureContractVenueTopics,
} from "./civil-procedure-contract-venue";
const civilTopicFor = (id: string) =>
  civilAgencyLookupTopics.find((topic) => topic.id === id);
export const topicFor = (id: string) =>
  trademarkG8Topics.find((t) => t.id === id) ??
  annualG8Topics.find((t) => t.id === id) ??
  remainingG6Topics.find((t) => t.id === id) ??
  criminalProcedureG1Topics.find((t) => t.id === id) ??
  criminalProcedureFoundationsTopics.find((t) => t.id === id) ??
  civilProcedureProceduralDetailsTopics.find((t) => t.id === id) ??
  civilProcedureGapFillTopics.find((t) => t.id === id) ??
  civilProcedureArbitrationTopics.find((t) => t.id === id) ??
  civilProcedureForeignTopics.find((t) => t.id === id) ??
  civilProcedureExecutionTopics.find((t) => t.id === id) ??
  civilProcedureRemediesSpecialTopics.find((t) => t.id === id) ??
  civilProcedureFirstInstanceTopics.find((t) => t.id === id) ??
  civilProcedureEvidenceProcessTopics.find((t) => t.id === id) ??
  civilProcedureFoundationsTopics.find((t) => t.id === id) ??
  civilProcedurePartiesTopics.find((t) => t.id === id) ??
  civilBoundedGapsTopics.find((t) => t.id === id) ??
  civilProjectTechPartnershipTopics.find((t) => t.id === id) ??
  civilFinanceAgencyTopics.find((t) => t.id === id) ??
  civilServiceContractTopics.find((t) => t.id === id) ??
  civilUsufructTopics.find((t) => t.id === id) ??
  civilNeighborPossessionTopics.find((t) => t.id === id) ??
  civilQuasiContractTopics.find((t) => t.id === id) ??
  civilInheritanceTopics.find((t) => t.id === id) ??
  civilFamilyTopics.find((t) => t.id === id) ??
  civilPersonalityTopics.find((t) => t.id === id) ??
  civilPileTreeRoadTopics.find((t) => t.id === id) ??
  civilEnvironmentObjectsTopics.find((t) => t.id === id) ??
  civilTrafficMedicalTopics.find((t) => t.id === id) ??
  civilEducationProductTopics.find((t) => t.id === id) ??
  civilTortSpecialTopics.find((t) => t.id === id) ??
  civilGuaranteeCoverageTopics.find((t) => t.id === id) ??
  civilWorkMandateTopics.find((t) => t.id === id) ??
  civilGiftLoanTopics.find((t) => t.id === id) ??
  civilSaleLeaseTopics.find((t) => t.id === id) ??
  civilObligationsTopics.find((t) => t.id === id) ??
  civilPropertyTopics.find((t) => t.id === id) ??
  civilFoundationsTopics.find((t) => t.id === id) ??
  criminalProcedureArrestReviewTopics.find((t) => t.id === id) ??
  criminalProcedureBailTopics.find((t) => t.id === id) ??
  civilGuaranteeTopics.find((t) => t.id === id) ??
  criminalProcedureDefenseTopics.find((t) => t.id === id) ??
  civilProcedureAgentAuthorityTopics.find((t) => t.id === id) ??
  civilProcedureProofBurdenTopics.find((t) => t.id === id) ??
  civilTortInstigationAssistanceTopics.find((t) => t.id === id) ??
  commercialTopics.find((t) => t.id === id) ??
  administrativeTopics.find((t) => t.id === id) ??
  criminalProcedureBurdenTopics.find((t) => t.id === id) ??
  criminalProcedureExclusionTopics.find((t) => t.id === id) ??
  criminalProcedureProofPracticeTopics.find((t) => t.id === id) ??
  (id === personalTortTopic.id ? personalTortTopic : undefined) ??
  (id === tortTopic.id ? tortTopic : undefined) ??
  learningTopics.find((t) => t.id === id) ??
  civilTopicFor(id) ??
  (id === civilContractFormationTopic.id
    ? civilContractFormationTopic
    : undefined) ??
  (id === civilContractPerformanceTopic.id
    ? civilContractPerformanceTopic
    : undefined) ??
  (id === civilActValidityTopic.id ? civilActValidityTopic : undefined) ??
  civilProcedureFilingVenueTopics.find((topic) => topic.id === id) ??
  civilProcedureJurisdictionResponseTopics.find((topic) => topic.id === id) ??
  civilProcedureContractPracticeTopics.find((topic) => topic.id === id) ??
  civilProcedureUnagreedVenueTopics.find((topic) => topic.id === id) ??
  civilContractRemediesTopics.find((topic) => topic.id === id) ??
  civilContractLossesTopics.find((topic) => topic.id === id) ??
  civilStipulatedLiabilityTopics.find((topic) => topic.id === id) ??
  civilMovableDeliveryTopics.find((topic) => topic.id === id);
export const exerciseFor = (id: string) =>
  g8CompletionQuestion(id) ??
  remainingG6Question(id) ??
  civilProcedureCrossChapterQuestion(id) ??
  criminalProcedureG1Question(id) ??
  criminalProcedureFoundationsQuestion(id) ??
  civilProcedureProceduralDetailsQuestion(id) ??
  civilProcedureGapFillQuestion(id) ??
  civilProcedureArbitrationQuestion(id) ??
  civilProcedureForeignQuestion(id) ??
  civilProcedureExecutionQuestion(id) ??
  civilProcedureRemediesSpecialQuestion(id) ??
  civilProcedureFirstInstanceQuestion(id) ??
  civilProcedureEvidenceProcessQuestion(id) ??
  civilProcedureFoundationsQuestion(id) ??
  civilProcedurePartiesQuestion(id) ??
  civilBoundedGapsQuestion(id) ??
  civilProjectTechPartnershipQuestion(id) ??
  civilFinanceAgencyQuestion(id) ??
  civilServiceContractQuestion(id) ??
  civilUsufructQuestion(id) ??
  civilNeighborPossessionQuestion(id) ??
  civilQuasiContractQuestion(id) ??
  civilInheritanceQuestion(id) ??
  civilFamilyQuestion(id) ??
  civilPersonalityQuestion(id) ??
  civilPileTreeRoadQuestion(id) ??
  civilEnvironmentObjectsQuestion(id) ??
  civilTrafficMedicalQuestion(id) ??
  civilEducationProductQuestion(id) ??
  civilTortSpecialQuestion(id) ??
  civilGuaranteeCoverageQuestion(id) ??
  civilWorkMandateQuestion(id) ??
  civilGiftLoanQuestion(id) ??
  civilSaleLeaseQuestion(id) ??
  civilObligationsQuestion(id) ??
  civilPropertyQuestion(id) ??
  civilFoundationsQuestion(id) ??
  historicalPracticeQuestion(id) ??
  criminalProcedureArrestReviewQuestion(id) ??
  criminalProcedureBailQuestion(id) ??
  civilGuaranteeQuestion(id) ??
  criminalProcedureDefenseQuestion(id) ??
  civilProcedureAgentAuthorityQuestion(id) ??
  civilProcedureProofBurdenQuestion(id) ??
  civilTortInstigationAssistanceQuestion(id) ??
  commercialQuestion(id) ??
  administrativeQuestion(id) ??
  criminalProcedureBurdenQuestion(id) ??
  criminalProcedurePartialCorroborationQuestion(id) ??
  criminalProcedureExclusionQuestion(id) ??
  criminalProcedureProofQuestion(id) ??
  personalTortQuestionFor(id) ??
  tortQuestionFor(id) ??
  learningTopics.flatMap((t) => t.exercises).find((q) => q.id === id) ??
  civilAgencyQuestion(id) ??
  civilContractFormationQuestion(id) ??
  civilContractPerformanceQuestion(id) ??
  civilActValidityQuestion(id) ??
  civilProcedureFilingVenueQuestion(id) ??
  civilProcedureJurisdictionResponseQuestion(id) ??
  civilProcedureContractVenueQuestion(id) ??
  civilProcedureUnagreedVenueQuestion(id) ??
  civilProcedureUnperformedTransferQuestion(id) ??
  civilContractRemediesQuestion(id) ??
  civilContractLossesQuestion(id) ??
  civilStipulatedLiabilityQuestion(id) ??
  civilMovableDeliveryQuestion(id) ??
  civilContractIntegratedQuestion(id) ??
  civilProcedureIntegratedQuestion(id);
const baseTopicRevision = (id: string) =>
  generalGapTopics.some((topic) => topic.id === id)
    ? generalGapRevision
    : capstoneTopics.some((t) => t.id === id)
      ? capstoneRevision
      : officeTopics.some((t) => t.id === id)
        ? officeRevision
        : socialTopics.some((t) => t.id === id)
          ? socialRevision
          : economicTopics.some((t) => t.id === id)
            ? economicRevision
            : safetyTopics.some((t) => t.id === id)
              ? safetyRevision
              : propertyTopics.some((t) => t.id === id)
                ? propertyRevision
                : personTopics.some((t) => t.id === id)
                  ? personRevision
                  : generalTopics.some((t) => t.id === id)
                    ? generalRevision
                    : packageOneTopics.some((t) => t.id === id)
                      ? packageOneRevision
                      : foundationTopics.some((t) => t.id === id)
                        ? foundationRevision
                        : id === blowMistakeTopic.id
                          ? blowMistakeRevision
                          : id === objectMistakeTopic.id
                            ? objectMistakeRevision
                            : id === transferTopic.id
                              ? transferRevision
                              : id === courtOrderTopic.id
                                ? courtOrderRevision
                                : id === witnessRetaliationTopic.id
                                  ? witnessRetaliationRevision
                                  : specialAccidentTopics.some(
                                        (topic) => topic.id === id,
                                      )
                                    ? specialAccidentRevision
                                    : id === stateUnityTopic.id
                                      ? stateUnityRevision
                                      : id === unpublishedTradingTopic.id
                                        ? unpublishedTradingRevision
                                        : id === broadcastFacilitiesTopic.id
                                          ? broadcastFacilitiesRevision
                                          : faultUnitRevision;
const baseTopicSources = (id: string): ContentSources =>
  generalGapTopics.some((topic) => topic.id === id)
    ? generalGapSources
    : capstoneTopics.some((t) => t.id === id)
      ? capstoneSources
      : officeTopics.some((t) => t.id === id)
        ? officeSources
        : socialTopics.some((t) => t.id === id)
          ? socialSources
          : economicTopics.some((t) => t.id === id)
            ? economicSources
            : safetyTopics.some((t) => t.id === id)
              ? safetySources
              : propertyTopics.some((t) => t.id === id)
                ? propertySources
                : personTopics.some((t) => t.id === id)
                  ? personSources
                  : generalTopics.some((t) => t.id === id)
                    ? generalSources
                    : packageOneTopics.some((t) => t.id === id)
                      ? packageOneSources
                      : foundationTopics.some((t) => t.id === id)
                        ? foundationSources
                        : id === blowMistakeTopic.id
                          ? blowMistakeSources
                          : id === objectMistakeTopic.id
                            ? objectMistakeSources
                            : id === courtOrderTopic.id
                              ? courtOrderSources
                              : id === witnessRetaliationTopic.id
                                ? witnessRetaliationSources
                                : specialAccidentTopics.some(
                                      (topic) => topic.id === id,
                                    )
                                  ? specialAccidentSources
                                  : id === stateUnityTopic.id
                                    ? stateUnitySources
                                    : id === unpublishedTradingTopic.id
                                      ? unpublishedTradingSources
                                      : id === broadcastFacilitiesTopic.id
                                        ? broadcastFacilitiesSources
                                        : faultSources;
const previouslyRegisteredTopicRevision = (id: string) =>
  hasResaleKnowledge(id)
    ? resaleRevision
    : hasMinorOrganizationKnowledge(id)
      ? minorOrganizationRevision
      : hasPersonGapKnowledge(id)
        ? personGapRevision
        : hasExecutionKnowledge(id)
          ? executionRevision
          : hasGeneralGapKnowledge(id)
            ? generalGapRevision
            : hasBasicsKnowledgeCorrection(id)
              ? basicsKnowledgeRevision
              : baseTopicRevision(id);

const previousSubjectTopicRevision = (id: string) =>
  civilTopicFor(id)
    ? civilAgencyContentPackCandidate.revision
    : id === civilContractFormationTopic.id
      ? civilContractFormationContentPack.revision
      : id === civilContractPerformanceTopic.id
        ? civilContractPerformanceContentPack.revision
        : id === civilActValidityTopic.id
          ? civilActValidityContentPack.revision
          : id === custodyEscortTopicId
            ? custodyEscortRevision
            : previouslyRegisteredTopicRevision(id);

const beforeRemainingG6TopicRevision = (id: string) =>
  criminalProcedureG1Topics.some((t) => t.id === id)
    ? criminalProcedureG1ContentPack.revision
    : criminalProcedureFoundationsTopics.some((t) => t.id === id)
      ? criminalProcedureFoundationsContentPack.revision
      : civilProcedureProceduralDetailsTopics.some((t) => t.id === id)
        ? civilProcedureProceduralDetailsContentPack.revision
        : civilProcedureGapFillTopics.some((t) => t.id === id)
          ? civilProcedureGapFillContentPack.revision
          : civilProcedureArbitrationTopics.some((t) => t.id === id)
            ? civilProcedureArbitrationContentPack.revision
            : civilProcedureForeignTopics.some((t) => t.id === id)
              ? civilProcedureForeignContentPack.revision
              : civilProcedureExecutionTopics.some((t) => t.id === id)
                ? civilProcedureExecutionContentPack.revision
                : civilProcedureRemediesSpecialTopics.some((t) => t.id === id)
                  ? civilProcedureRemediesSpecialContentPack.revision
                  : civilProcedureFirstInstanceTopics.some((t) => t.id === id)
                    ? civilProcedureFirstInstanceContentPack.revision
                    : civilProcedureEvidenceProcessTopics.some(
                          (t) => t.id === id,
                        )
                      ? civilProcedureEvidenceProcessContentPack.revision
                      : civilProcedureFoundationsTopics.some((t) => t.id === id)
                        ? civilProcedureFoundationsContentPack.revision
                        : civilProcedurePartiesTopics.some((t) => t.id === id)
                          ? civilProcedurePartiesContentPack.revision
                          : civilBoundedGapsTopics.some((t) => t.id === id)
                            ? civilBoundedGapsContentPack.revision
                            : civilProjectTechPartnershipTopics.some(
                                  (t) => t.id === id,
                                )
                              ? civilProjectTechPartnershipContentPack.revision
                              : civilFinanceAgencyTopics.some(
                                    (t) => t.id === id,
                                  )
                                ? civilFinanceAgencyContentPack.revision
                                : civilServiceContractTopics.some(
                                      (t) => t.id === id,
                                    )
                                  ? civilServiceContractContentPack.revision
                                  : civilUsufructTopics.some((t) => t.id === id)
                                    ? civilUsufructContentPack.revision
                                    : civilNeighborPossessionTopics.some(
                                          (t) => t.id === id,
                                        )
                                      ? civilNeighborPossessionContentPack.revision
                                      : civilQuasiContractTopics.some(
                                            (t) => t.id === id,
                                          )
                                        ? civilQuasiContractContentPack.revision
                                        : civilInheritanceTopics.some(
                                              (t) => t.id === id,
                                            )
                                          ? civilInheritanceContentPack.revision
                                          : civilFamilyTopics.some(
                                                (t) => t.id === id,
                                              )
                                            ? civilFamilyContentPack.revision
                                            : civilPersonalityTopics.some(
                                                  (t) => t.id === id,
                                                )
                                              ? civilPersonalityContentPack.revision
                                              : civilPileTreeRoadTopics.some(
                                                    (t) => t.id === id,
                                                  )
                                                ? civilPileTreeRoadContentPack.revision
                                                : civilEnvironmentObjectsTopics.some(
                                                      (t) => t.id === id,
                                                    )
                                                  ? civilEnvironmentObjectsContentPack.revision
                                                  : civilTrafficMedicalTopics.some(
                                                        (t) => t.id === id,
                                                      )
                                                    ? civilTrafficMedicalContentPack.revision
                                                    : civilEducationProductTopics.some(
                                                          (t) => t.id === id,
                                                        )
                                                      ? civilEducationProductContentPack.revision
                                                      : civilTortSpecialTopics.some(
                                                            (t) => t.id === id,
                                                          )
                                                        ? civilTortSpecialContentPack.revision
                                                        : civilGuaranteeCoverageTopics.some(
                                                              (t) =>
                                                                t.id === id,
                                                            )
                                                          ? civilGuaranteeCoverageContentPack.revision
                                                          : civilWorkMandateTopics.some(
                                                                (t) =>
                                                                  t.id === id,
                                                              )
                                                            ? civilWorkMandateContentPack.revision
                                                            : civilGiftLoanTopics.some(
                                                                  (t) =>
                                                                    t.id === id,
                                                                )
                                                              ? civilGiftLoanContentPack.revision
                                                              : civilSaleLeaseTopics.some(
                                                                    (t) =>
                                                                      t.id ===
                                                                      id,
                                                                  )
                                                                ? civilSaleLeaseContentPack.revision
                                                                : civilObligationsTopics.some(
                                                                      (t) =>
                                                                        t.id ===
                                                                        id,
                                                                    )
                                                                  ? civilObligationsContentPack.revision
                                                                  : civilPropertyTopics.some(
                                                                        (t) =>
                                                                          t.id ===
                                                                          id,
                                                                      )
                                                                    ? civilPropertyContentPack.revision
                                                                    : civilFoundationsTopics.some(
                                                                          (t) =>
                                                                            t.id ===
                                                                            id,
                                                                        )
                                                                      ? civilFoundationsContentPack.revision
                                                                      : criminalProcedureArrestReviewTopics.some(
                                                                            (
                                                                              t,
                                                                            ) =>
                                                                              t.id ===
                                                                              id,
                                                                          )
                                                                        ? criminalProcedureArrestReviewContentPack.revision
                                                                        : civilProcedureAgentAuthorityTopics.some(
                                                                              (
                                                                                t,
                                                                              ) =>
                                                                                t.id ===
                                                                                id,
                                                                            )
                                                                          ? civilProcedureAgentAuthorityContentPack.revision
                                                                          : criminalProcedureBailTopics.some(
                                                                                (
                                                                                  t,
                                                                                ) =>
                                                                                  t.id ===
                                                                                  id,
                                                                              )
                                                                            ? criminalProcedureBailContentPack.revision
                                                                            : civilGuaranteeTopics.some(
                                                                                  (
                                                                                    t,
                                                                                  ) =>
                                                                                    t.id ===
                                                                                    id,
                                                                                )
                                                                              ? civilGuaranteeContentPack.revision
                                                                              : criminalProcedureDefenseTopics.some(
                                                                                    (
                                                                                      t,
                                                                                    ) =>
                                                                                      t.id ===
                                                                                      id,
                                                                                  )
                                                                                ? criminalProcedureDefenseContentPack.revision
                                                                                : civilProcedureProofBurdenTopics.some(
                                                                                      (
                                                                                        t,
                                                                                      ) =>
                                                                                        t.id ===
                                                                                        id,
                                                                                    )
                                                                                  ? civilProcedureProofBurdenContentPack.revision
                                                                                  : commercialPackForTopic(
                                                                                        id,
                                                                                      )
                                                                                    ? commercialPackForTopic(
                                                                                        id,
                                                                                      )!
                                                                                        .revision
                                                                                    : criminalProcedureBurdenTopics.some(
                                                                                          (
                                                                                            t,
                                                                                          ) =>
                                                                                            t.id ===
                                                                                            id,
                                                                                        )
                                                                                      ? criminalProcedureBurdenContentPack.revision
                                                                                      : administrativePackForTopic(
                                                                                            id,
                                                                                          )
                                                                                        ? administrativePackForTopic(
                                                                                            id,
                                                                                          )!
                                                                                            .revision
                                                                                        : criminalProcedureExclusionTopics.some(
                                                                                              (
                                                                                                t,
                                                                                              ) =>
                                                                                                t.id ===
                                                                                                id,
                                                                                            )
                                                                                          ? criminalProcedureExclusionContentPack.revision
                                                                                          : criminalProcedureProofTopics.some(
                                                                                                (
                                                                                                  t,
                                                                                                ) =>
                                                                                                  t.id ===
                                                                                                  id,
                                                                                              )
                                                                                            ? criminalProcedureProofContentPack.revision
                                                                                            : id ===
                                                                                                personalTortTopic.id
                                                                                              ? personalTortRevision
                                                                                              : id ===
                                                                                                  tortTopic.id
                                                                                                ? tortRevision
                                                                                                : civilProcedureJurisdictionResponseTopics.some(
                                                                                                      (
                                                                                                        topic,
                                                                                                      ) =>
                                                                                                        topic.id ===
                                                                                                        id,
                                                                                                    )
                                                                                                  ? civilProcedureJurisdictionResponseContentPack.revision
                                                                                                  : civilStipulatedLiabilityTopics.some(
                                                                                                        (
                                                                                                          topic,
                                                                                                        ) =>
                                                                                                          topic.id ===
                                                                                                          id,
                                                                                                      )
                                                                                                    ? civilStipulatedLiabilityContentPack.revision
                                                                                                    : civilContractLossesTopics.some(
                                                                                                          (
                                                                                                            topic,
                                                                                                          ) =>
                                                                                                            topic.id ===
                                                                                                            id,
                                                                                                        )
                                                                                                      ? civilContractLossesContentPack.revision
                                                                                                      : civilContractRemediesTopics.some(
                                                                                                            (
                                                                                                              topic,
                                                                                                            ) =>
                                                                                                              topic.id ===
                                                                                                              id,
                                                                                                          )
                                                                                                        ? civilContractRemediesContentPack.revision
                                                                                                        : civilProcedureFilingVenueTopics.some(
                                                                                                              (
                                                                                                                topic,
                                                                                                              ) =>
                                                                                                                topic.id ===
                                                                                                                id,
                                                                                                            )
                                                                                                          ? civilProcedureFilingVenueContentPack.revision
                                                                                                          : civilProcedureContractVenueTopics.some(
                                                                                                                (
                                                                                                                  topic,
                                                                                                                ) =>
                                                                                                                  topic.id ===
                                                                                                                  id,
                                                                                                              )
                                                                                                            ? civilProcedureContractVenueContentPack.revision
                                                                                                            : civilProcedureUnagreedVenueTopics.some(
                                                                                                                  (
                                                                                                                    topic,
                                                                                                                  ) =>
                                                                                                                    topic.id ===
                                                                                                                    id,
                                                                                                                )
                                                                                                              ? civilProcedureUnagreedVenueContentPack.revision
                                                                                                              : civilMovableDeliveryTopics.some(
                                                                                                                    (
                                                                                                                      topic,
                                                                                                                    ) =>
                                                                                                                      topic.id ===
                                                                                                                      id,
                                                                                                                  )
                                                                                                                ? civilMovableDeliveryContentPack.revision
                                                                                                                : civilTortInstigationAssistanceTopics.some(
                                                                                                                      (
                                                                                                                        t,
                                                                                                                      ) =>
                                                                                                                        t.id ===
                                                                                                                        id,
                                                                                                                    )
                                                                                                                  ? civilTortInstigationAssistanceContentPack.revision
                                                                                                                  : previousSubjectTopicRevision(
                                                                                                                      id,
                                                                                                                    );

// Accept the published teaching revision that was shown when a recall was saved.
// Question-only packs do not become valid knowledge revisions merely by including a topic.
const previousSubjectPublishedTopicRevision = (id: string, revision: string) =>
  Boolean(topicFor(id)) &&
  (civilTopicFor(id)
    ? revision === civilAgencyContentPackCandidate.revision
    : id === civilContractFormationTopic.id
      ? revision === civilContractFormationContentPack.revision
      : id === civilContractPerformanceTopic.id
        ? revision === civilContractPerformanceContentPack.revision
        : id === civilActValidityTopic.id
          ? revision === civilActValidityContentPack.revision
          : revision === baseTopicRevision(id) ||
            revision === topicRevision(id));

const isCurrentPublishedTopicRevision = (id: string, revision: string) =>
  criminalProcedureG1Topics.some((t) => t.id === id)
    ? revision === criminalProcedureG1ContentPack.revision
    : criminalProcedureFoundationsTopics.some((t) => t.id === id)
      ? revision === criminalProcedureFoundationsContentPack.revision
      : civilProcedureProceduralDetailsTopics.some((t) => t.id === id)
        ? revision === civilProcedureProceduralDetailsContentPack.revision
        : civilProcedureGapFillTopics.some((t) => t.id === id)
          ? revision === civilProcedureGapFillContentPack.revision
          : civilProcedureArbitrationTopics.some((t) => t.id === id)
            ? revision === civilProcedureArbitrationContentPack.revision
            : civilProcedureForeignTopics.some((t) => t.id === id)
              ? revision === civilProcedureForeignContentPack.revision
              : civilProcedureExecutionTopics.some((t) => t.id === id)
                ? revision === civilProcedureExecutionContentPack.revision
                : civilProcedureRemediesSpecialTopics.some((t) => t.id === id)
                  ? revision ===
                    civilProcedureRemediesSpecialContentPack.revision
                  : civilProcedureFirstInstanceTopics.some((t) => t.id === id)
                    ? revision ===
                      civilProcedureFirstInstanceContentPack.revision
                    : civilProcedureEvidenceProcessTopics.some(
                          (t) => t.id === id,
                        )
                      ? revision ===
                        civilProcedureEvidenceProcessContentPack.revision
                      : civilProcedureFoundationsTopics.some((t) => t.id === id)
                        ? revision ===
                          civilProcedureFoundationsContentPack.revision
                        : civilProcedurePartiesTopics.some((t) => t.id === id)
                          ? revision ===
                            civilProcedurePartiesContentPack.revision
                          : civilBoundedGapsTopics.some((t) => t.id === id)
                            ? revision === civilBoundedGapsContentPack.revision
                            : civilProjectTechPartnershipTopics.some(
                                  (t) => t.id === id,
                                )
                              ? revision ===
                                civilProjectTechPartnershipContentPack.revision
                              : civilFinanceAgencyTopics.some(
                                    (t) => t.id === id,
                                  )
                                ? revision ===
                                  civilFinanceAgencyContentPack.revision
                                : civilServiceContractTopics.some(
                                      (t) => t.id === id,
                                    )
                                  ? revision ===
                                    civilServiceContractContentPack.revision
                                  : civilUsufructTopics.some((t) => t.id === id)
                                    ? revision ===
                                      civilUsufructContentPack.revision
                                    : civilNeighborPossessionTopics.some(
                                          (t) => t.id === id,
                                        )
                                      ? revision ===
                                        civilNeighborPossessionContentPack.revision
                                      : civilQuasiContractTopics.some(
                                            (t) => t.id === id,
                                          )
                                        ? revision ===
                                          civilQuasiContractContentPack.revision
                                        : civilInheritanceTopics.some(
                                              (t) => t.id === id,
                                            )
                                          ? revision ===
                                            civilInheritanceContentPack.revision
                                          : civilFamilyTopics.some(
                                                (t) => t.id === id,
                                              )
                                            ? revision ===
                                              civilFamilyContentPack.revision
                                            : civilPersonalityTopics.some(
                                                  (t) => t.id === id,
                                                )
                                              ? revision ===
                                                civilPersonalityContentPack.revision
                                              : civilPileTreeRoadTopics.some(
                                                    (t) => t.id === id,
                                                  )
                                                ? revision ===
                                                  civilPileTreeRoadContentPack.revision
                                                : civilEnvironmentObjectsTopics.some(
                                                      (t) => t.id === id,
                                                    )
                                                  ? revision ===
                                                    civilEnvironmentObjectsContentPack.revision
                                                  : civilTrafficMedicalTopics.some(
                                                        (t) => t.id === id,
                                                      )
                                                    ? revision ===
                                                      civilTrafficMedicalContentPack.revision
                                                    : civilEducationProductTopics.some(
                                                          (t) => t.id === id,
                                                        )
                                                      ? revision ===
                                                        civilEducationProductContentPack.revision
                                                      : civilTortSpecialTopics.some(
                                                            (t) => t.id === id,
                                                          )
                                                        ? revision ===
                                                          civilTortSpecialContentPack.revision
                                                        : civilGuaranteeCoverageTopics.some(
                                                              (t) =>
                                                                t.id === id,
                                                            )
                                                          ? revision ===
                                                            civilGuaranteeCoverageContentPack.revision
                                                          : civilWorkMandateTopics.some(
                                                                (t) =>
                                                                  t.id === id,
                                                              )
                                                            ? revision ===
                                                              civilWorkMandateContentPack.revision
                                                            : civilGiftLoanTopics.some(
                                                                  (t) =>
                                                                    t.id === id,
                                                                )
                                                              ? revision ===
                                                                civilGiftLoanContentPack.revision
                                                              : civilSaleLeaseTopics.some(
                                                                    (t) =>
                                                                      t.id ===
                                                                      id,
                                                                  )
                                                                ? revision ===
                                                                  civilSaleLeaseContentPack.revision
                                                                : civilObligationsTopics.some(
                                                                      (t) =>
                                                                        t.id ===
                                                                        id,
                                                                    )
                                                                  ? revision ===
                                                                    civilObligationsContentPack.revision
                                                                  : civilPropertyTopics.some(
                                                                        (t) =>
                                                                          t.id ===
                                                                          id,
                                                                      )
                                                                    ? revision ===
                                                                      civilPropertyContentPack.revision
                                                                    : civilFoundationsTopics.some(
                                                                          (t) =>
                                                                            t.id ===
                                                                            id,
                                                                        )
                                                                      ? revision ===
                                                                        civilFoundationsContentPack.revision
                                                                      : criminalProcedureArrestReviewTopics.some(
                                                                            (
                                                                              t,
                                                                            ) =>
                                                                              t.id ===
                                                                              id,
                                                                          )
                                                                        ? revision ===
                                                                          criminalProcedureArrestReviewContentPack.revision
                                                                        : civilProcedureAgentAuthorityTopics.some(
                                                                              (
                                                                                t,
                                                                              ) =>
                                                                                t.id ===
                                                                                id,
                                                                            )
                                                                          ? revision ===
                                                                            civilProcedureAgentAuthorityContentPack.revision
                                                                          : criminalProcedureBailTopics.some(
                                                                                (
                                                                                  t,
                                                                                ) =>
                                                                                  t.id ===
                                                                                  id,
                                                                              )
                                                                            ? revision ===
                                                                              criminalProcedureBailContentPack.revision
                                                                            : civilGuaranteeTopics.some(
                                                                                  (
                                                                                    t,
                                                                                  ) =>
                                                                                    t.id ===
                                                                                    id,
                                                                                )
                                                                              ? revision ===
                                                                                civilGuaranteeContentPack.revision
                                                                              : criminalProcedureDefenseTopics.some(
                                                                                    (
                                                                                      t,
                                                                                    ) =>
                                                                                      t.id ===
                                                                                      id,
                                                                                  )
                                                                                ? revision ===
                                                                                  criminalProcedureDefenseContentPack.revision
                                                                                : civilProcedureProofBurdenTopics.some(
                                                                                      (
                                                                                        t,
                                                                                      ) =>
                                                                                        t.id ===
                                                                                        id,
                                                                                    )
                                                                                  ? revision ===
                                                                                    civilProcedureProofBurdenContentPack.revision
                                                                                  : commercialPackForTopic(
                                                                                        id,
                                                                                      )
                                                                                    ? revision ===
                                                                                      commercialPackForTopic(
                                                                                        id,
                                                                                      )!
                                                                                        .revision
                                                                                    : criminalProcedureBurdenTopics.some(
                                                                                          (
                                                                                            t,
                                                                                          ) =>
                                                                                            t.id ===
                                                                                            id,
                                                                                        )
                                                                                      ? revision ===
                                                                                        criminalProcedureBurdenContentPack.revision
                                                                                      : administrativePackForTopic(
                                                                                            id,
                                                                                          )
                                                                                        ? revision ===
                                                                                            administrativePackForTopic(
                                                                                              id,
                                                                                            )!
                                                                                              .revision ||
                                                                                          historicalPracticeTopicRevision(
                                                                                            id,
                                                                                            revision,
                                                                                          )
                                                                                        : criminalProcedureExclusionTopics.some(
                                                                                              (
                                                                                                t,
                                                                                              ) =>
                                                                                                t.id ===
                                                                                                id,
                                                                                            )
                                                                                          ? revision ===
                                                                                            criminalProcedureExclusionContentPack.revision
                                                                                          : criminalProcedureProofTopics.some(
                                                                                                (
                                                                                                  t,
                                                                                                ) =>
                                                                                                  t.id ===
                                                                                                  id,
                                                                                              )
                                                                                            ? revision ===
                                                                                              criminalProcedureProofContentPack.revision
                                                                                            : id ===
                                                                                                personalTortTopic.id
                                                                                              ? revision ===
                                                                                                personalTortRevision
                                                                                              : id ===
                                                                                                  tortTopic.id
                                                                                                ? revision ===
                                                                                                  tortRevision
                                                                                                : civilProcedureJurisdictionResponseTopics.some(
                                                                                                      (
                                                                                                        topic,
                                                                                                      ) =>
                                                                                                        topic.id ===
                                                                                                        id,
                                                                                                    )
                                                                                                  ? revision ===
                                                                                                    civilProcedureJurisdictionResponseContentPack.revision
                                                                                                  : civilStipulatedLiabilityTopics.some(
                                                                                                        (
                                                                                                          topic,
                                                                                                        ) =>
                                                                                                          topic.id ===
                                                                                                          id,
                                                                                                      )
                                                                                                    ? revision ===
                                                                                                      civilStipulatedLiabilityContentPack.revision
                                                                                                    : civilContractLossesTopics.some(
                                                                                                          (
                                                                                                            topic,
                                                                                                          ) =>
                                                                                                            topic.id ===
                                                                                                            id,
                                                                                                        )
                                                                                                      ? revision ===
                                                                                                        civilContractLossesContentPack.revision
                                                                                                      : civilContractRemediesTopics.some(
                                                                                                            (
                                                                                                              topic,
                                                                                                            ) =>
                                                                                                              topic.id ===
                                                                                                              id,
                                                                                                          )
                                                                                                        ? revision ===
                                                                                                          civilContractRemediesContentPack.revision
                                                                                                        : civilProcedureFilingVenueTopics.some(
                                                                                                              (
                                                                                                                topic,
                                                                                                              ) =>
                                                                                                                topic.id ===
                                                                                                                id,
                                                                                                            )
                                                                                                          ? revision ===
                                                                                                            civilProcedureFilingVenueContentPack.revision
                                                                                                          : civilProcedureContractVenueTopics.some(
                                                                                                                (
                                                                                                                  topic,
                                                                                                                ) =>
                                                                                                                  topic.id ===
                                                                                                                  id,
                                                                                                              )
                                                                                                            ? revision ===
                                                                                                              civilProcedureContractVenueContentPack.revision
                                                                                                            : civilProcedureUnagreedVenueTopics.some(
                                                                                                                  (
                                                                                                                    topic,
                                                                                                                  ) =>
                                                                                                                    topic.id ===
                                                                                                                    id,
                                                                                                                )
                                                                                                              ? revision ===
                                                                                                                civilProcedureUnagreedVenueContentPack.revision
                                                                                                              : civilMovableDeliveryTopics.some(
                                                                                                                    (
                                                                                                                      topic,
                                                                                                                    ) =>
                                                                                                                      topic.id ===
                                                                                                                      id,
                                                                                                                  )
                                                                                                                ? revision ===
                                                                                                                  civilMovableDeliveryContentPack.revision
                                                                                                                : civilTortInstigationAssistanceTopics.some(
                                                                                                                      (
                                                                                                                        t,
                                                                                                                      ) =>
                                                                                                                        t.id ===
                                                                                                                        id,
                                                                                                                    )
                                                                                                                  ? revision ===
                                                                                                                    civilTortInstigationAssistanceContentPack.revision
                                                                                                                  : previousSubjectPublishedTopicRevision(
                                                                                                                      id,
                                                                                                                      revision,
                                                                                                                    );

const previouslyRegisteredTopicSources = (id: string): ContentSources =>
  hasResaleKnowledge(id)
    ? resaleSources
    : hasMinorOrganizationKnowledge(id)
      ? minorOrganizationSources
      : hasPersonGapKnowledge(id)
        ? personGapSources
        : hasExecutionKnowledge(id)
          ? executionSources
          : hasGeneralGapKnowledge(id)
            ? generalGapSources
            : hasBasicsKnowledgeCorrection(id)
              ? basicsKnowledgeSources
              : baseTopicSources(id);

const previousSubjectTopicSources = (id: string): ContentSources =>
  civilTopicFor(id)
    ? civilAgencyContentPackCandidate.snapshot.sources
    : id === civilContractFormationTopic.id
      ? civilContractFormationContentPack.snapshot.sources
      : id === civilContractPerformanceTopic.id
        ? civilContractPerformanceContentPack.snapshot.sources
        : id === civilActValidityTopic.id
          ? civilActValidityContentPack.snapshot.sources
          : id === custodyEscortTopicId
            ? custodyEscortSources
            : previouslyRegisteredTopicSources(id);

const beforeRemainingG6TopicSources = (id: string): ContentSources =>
  criminalProcedureG1Topics.some((t) => t.id === id)
    ? criminalProcedureG1ContentPack.snapshot.sources
    : criminalProcedureFoundationsTopics.some((t) => t.id === id)
      ? criminalProcedureFoundationsContentPack.snapshot.sources
      : civilProcedureProceduralDetailsTopics.some((t) => t.id === id)
        ? civilProcedureProceduralDetailsContentPack.snapshot.sources
        : civilProcedureGapFillTopics.some((t) => t.id === id)
          ? civilProcedureGapFillContentPack.snapshot.sources
          : civilProcedureArbitrationTopics.some((t) => t.id === id)
            ? civilProcedureArbitrationContentPack.snapshot.sources
            : civilProcedureForeignTopics.some((t) => t.id === id)
              ? civilProcedureForeignContentPack.snapshot.sources
              : civilProcedureExecutionTopics.some((t) => t.id === id)
                ? civilProcedureExecutionContentPack.snapshot.sources
                : civilProcedureRemediesSpecialTopics.some((t) => t.id === id)
                  ? civilProcedureRemediesSpecialContentPack.snapshot.sources
                  : civilProcedureFirstInstanceTopics.some((t) => t.id === id)
                    ? civilProcedureFirstInstanceContentPack.snapshot.sources
                    : civilProcedureEvidenceProcessTopics.some(
                          (t) => t.id === id,
                        )
                      ? civilProcedureEvidenceProcessContentPack.snapshot
                          .sources
                      : civilProcedureFoundationsTopics.some((t) => t.id === id)
                        ? civilProcedureFoundationsContentPack.snapshot.sources
                        : civilProcedurePartiesTopics.some((t) => t.id === id)
                          ? civilProcedurePartiesContentPack.snapshot.sources
                          : civilBoundedGapsTopics.some((t) => t.id === id)
                            ? civilBoundedGapsContentPack.snapshot.sources
                            : civilProjectTechPartnershipTopics.some(
                                  (t) => t.id === id,
                                )
                              ? civilProjectTechPartnershipContentPack.snapshot
                                  .sources
                              : civilFinanceAgencyTopics.some(
                                    (t) => t.id === id,
                                  )
                                ? civilFinanceAgencyContentPack.snapshot.sources
                                : civilServiceContractTopics.some(
                                      (t) => t.id === id,
                                    )
                                  ? civilServiceContractContentPack.snapshot
                                      .sources
                                  : civilUsufructTopics.some((t) => t.id === id)
                                    ? civilUsufructContentPack.snapshot.sources
                                    : civilNeighborPossessionTopics.some(
                                          (t) => t.id === id,
                                        )
                                      ? civilNeighborPossessionContentPack
                                          .snapshot.sources
                                      : civilQuasiContractTopics.some(
                                            (t) => t.id === id,
                                          )
                                        ? civilQuasiContractContentPack.snapshot
                                            .sources
                                        : civilInheritanceTopics.some(
                                              (t) => t.id === id,
                                            )
                                          ? civilInheritanceContentPack.snapshot
                                              .sources
                                          : civilFamilyTopics.some(
                                                (t) => t.id === id,
                                              )
                                            ? civilFamilyContentPack.snapshot
                                                .sources
                                            : civilPersonalityTopics.some(
                                                  (t) => t.id === id,
                                                )
                                              ? civilPersonalityContentPack
                                                  .snapshot.sources
                                              : civilPileTreeRoadTopics.some(
                                                    (t) => t.id === id,
                                                  )
                                                ? civilPileTreeRoadContentPack
                                                    .snapshot.sources
                                                : civilEnvironmentObjectsTopics.some(
                                                      (t) => t.id === id,
                                                    )
                                                  ? civilEnvironmentObjectsContentPack
                                                      .snapshot.sources
                                                  : civilTrafficMedicalTopics.some(
                                                        (t) => t.id === id,
                                                      )
                                                    ? civilTrafficMedicalContentPack
                                                        .snapshot.sources
                                                    : civilEducationProductTopics.some(
                                                          (t) => t.id === id,
                                                        )
                                                      ? civilEducationProductContentPack
                                                          .snapshot.sources
                                                      : civilTortSpecialTopics.some(
                                                            (t) => t.id === id,
                                                          )
                                                        ? civilTortSpecialContentPack
                                                            .snapshot.sources
                                                        : civilGuaranteeCoverageTopics.some(
                                                              (t) =>
                                                                t.id === id,
                                                            )
                                                          ? civilGuaranteeCoverageContentPack
                                                              .snapshot.sources
                                                          : civilWorkMandateTopics.some(
                                                                (t) =>
                                                                  t.id === id,
                                                              )
                                                            ? civilWorkMandateContentPack
                                                                .snapshot
                                                                .sources
                                                            : civilGiftLoanTopics.some(
                                                                  (t) =>
                                                                    t.id === id,
                                                                )
                                                              ? civilGiftLoanContentPack
                                                                  .snapshot
                                                                  .sources
                                                              : civilSaleLeaseTopics.some(
                                                                    (t) =>
                                                                      t.id ===
                                                                      id,
                                                                  )
                                                                ? civilSaleLeaseContentPack
                                                                    .snapshot
                                                                    .sources
                                                                : civilObligationsTopics.some(
                                                                      (t) =>
                                                                        t.id ===
                                                                        id,
                                                                    )
                                                                  ? civilObligationsContentPack
                                                                      .snapshot
                                                                      .sources
                                                                  : civilPropertyTopics.some(
                                                                        (t) =>
                                                                          t.id ===
                                                                          id,
                                                                      )
                                                                    ? civilPropertyContentPack
                                                                        .snapshot
                                                                        .sources
                                                                    : civilFoundationsTopics.some(
                                                                          (t) =>
                                                                            t.id ===
                                                                            id,
                                                                        )
                                                                      ? civilFoundationsContentPack
                                                                          .snapshot
                                                                          .sources
                                                                      : criminalProcedureArrestReviewTopics.some(
                                                                            (
                                                                              t,
                                                                            ) =>
                                                                              t.id ===
                                                                              id,
                                                                          )
                                                                        ? criminalProcedureArrestReviewContentPack
                                                                            .snapshot
                                                                            .sources
                                                                        : civilProcedureAgentAuthorityTopics.some(
                                                                              (
                                                                                t,
                                                                              ) =>
                                                                                t.id ===
                                                                                id,
                                                                            )
                                                                          ? civilProcedureAgentAuthorityContentPack
                                                                              .snapshot
                                                                              .sources
                                                                          : criminalProcedureBailTopics.some(
                                                                                (
                                                                                  t,
                                                                                ) =>
                                                                                  t.id ===
                                                                                  id,
                                                                              )
                                                                            ? criminalProcedureBailContentPack
                                                                                .snapshot
                                                                                .sources
                                                                            : civilGuaranteeTopics.some(
                                                                                  (
                                                                                    t,
                                                                                  ) =>
                                                                                    t.id ===
                                                                                    id,
                                                                                )
                                                                              ? civilGuaranteeContentPack
                                                                                  .snapshot
                                                                                  .sources
                                                                              : criminalProcedureDefenseTopics.some(
                                                                                    (
                                                                                      t,
                                                                                    ) =>
                                                                                      t.id ===
                                                                                      id,
                                                                                  )
                                                                                ? criminalProcedureDefenseContentPack
                                                                                    .snapshot
                                                                                    .sources
                                                                                : civilProcedureProofBurdenTopics.some(
                                                                                      (
                                                                                        t,
                                                                                      ) =>
                                                                                        t.id ===
                                                                                        id,
                                                                                    )
                                                                                  ? civilProcedureProofBurdenContentPack
                                                                                      .snapshot
                                                                                      .sources
                                                                                  : commercialPackForTopic(
                                                                                        id,
                                                                                      )
                                                                                    ? commercialPackForTopic(
                                                                                        id,
                                                                                      )!
                                                                                        .snapshot
                                                                                        .sources
                                                                                    : criminalProcedureBurdenTopics.some(
                                                                                          (
                                                                                            t,
                                                                                          ) =>
                                                                                            t.id ===
                                                                                            id,
                                                                                        )
                                                                                      ? criminalProcedureBurdenContentPack
                                                                                          .snapshot
                                                                                          .sources
                                                                                      : administrativePackForTopic(
                                                                                            id,
                                                                                          )
                                                                                        ? administrativePackForTopic(
                                                                                            id,
                                                                                          )!
                                                                                            .snapshot
                                                                                            .sources
                                                                                        : criminalProcedureExclusionTopics.some(
                                                                                              (
                                                                                                t,
                                                                                              ) =>
                                                                                                t.id ===
                                                                                                id,
                                                                                            )
                                                                                          ? criminalProcedureExclusionContentPack
                                                                                              .snapshot
                                                                                              .sources
                                                                                          : criminalProcedureProofTopics.some(
                                                                                                (
                                                                                                  t,
                                                                                                ) =>
                                                                                                  t.id ===
                                                                                                  id,
                                                                                              )
                                                                                            ? criminalProcedureProofContentPack
                                                                                                .snapshot
                                                                                                .sources
                                                                                            : id ===
                                                                                                personalTortTopic.id
                                                                                              ? personalTortSources
                                                                                              : id ===
                                                                                                  tortTopic.id
                                                                                                ? tortSources
                                                                                                : civilProcedureJurisdictionResponseTopics.some(
                                                                                                      (
                                                                                                        topic,
                                                                                                      ) =>
                                                                                                        topic.id ===
                                                                                                        id,
                                                                                                    )
                                                                                                  ? civilProcedureJurisdictionResponseContentPack
                                                                                                      .snapshot
                                                                                                      .sources
                                                                                                  : civilStipulatedLiabilityTopics.some(
                                                                                                        (
                                                                                                          topic,
                                                                                                        ) =>
                                                                                                          topic.id ===
                                                                                                          id,
                                                                                                      )
                                                                                                    ? civilStipulatedLiabilityContentPack
                                                                                                        .snapshot
                                                                                                        .sources
                                                                                                    : civilContractLossesTopics.some(
                                                                                                          (
                                                                                                            topic,
                                                                                                          ) =>
                                                                                                            topic.id ===
                                                                                                            id,
                                                                                                        )
                                                                                                      ? civilContractLossesContentPack
                                                                                                          .snapshot
                                                                                                          .sources
                                                                                                      : civilContractRemediesTopics.some(
                                                                                                            (
                                                                                                              topic,
                                                                                                            ) =>
                                                                                                              topic.id ===
                                                                                                              id,
                                                                                                          )
                                                                                                        ? civilContractRemediesContentPack
                                                                                                            .snapshot
                                                                                                            .sources
                                                                                                        : civilProcedureFilingVenueTopics.some(
                                                                                                              (
                                                                                                                topic,
                                                                                                              ) =>
                                                                                                                topic.id ===
                                                                                                                id,
                                                                                                            )
                                                                                                          ? civilProcedureFilingVenueContentPack
                                                                                                              .snapshot
                                                                                                              .sources
                                                                                                          : civilProcedureContractVenueTopics.some(
                                                                                                                (
                                                                                                                  topic,
                                                                                                                ) =>
                                                                                                                  topic.id ===
                                                                                                                  id,
                                                                                                              )
                                                                                                            ? civilProcedureContractVenueContentPack
                                                                                                                .snapshot
                                                                                                                .sources
                                                                                                            : civilProcedureUnagreedVenueTopics.some(
                                                                                                                  (
                                                                                                                    topic,
                                                                                                                  ) =>
                                                                                                                    topic.id ===
                                                                                                                    id,
                                                                                                                )
                                                                                                              ? civilProcedureUnagreedVenueContentPack
                                                                                                                  .snapshot
                                                                                                                  .sources
                                                                                                              : civilMovableDeliveryTopics.some(
                                                                                                                    (
                                                                                                                      topic,
                                                                                                                    ) =>
                                                                                                                      topic.id ===
                                                                                                                      id,
                                                                                                                  )
                                                                                                                ? civilMovableDeliveryContentPack
                                                                                                                    .snapshot
                                                                                                                    .sources
                                                                                                                : civilTortInstigationAssistanceTopics.some(
                                                                                                                      (
                                                                                                                        t,
                                                                                                                      ) =>
                                                                                                                        t.id ===
                                                                                                                        id,
                                                                                                                    )
                                                                                                                  ? civilTortInstigationAssistanceContentPack
                                                                                                                      .snapshot
                                                                                                                      .sources
                                                                                                                  : previousSubjectTopicSources(
                                                                                                                      id,
                                                                                                                    );

const baseExerciseRevision = (id: string) =>
  worksiteCorrections.some((c) => c.exercise.id === id)
    ? worksiteCorrectionRevision
    : officeCorrections.some((c) => c.exercise.id === id)
      ? officeCorrectionsRevision
      : socialCorrections.some((c) => c.exercise.id === id)
        ? socialCorrectionsRevision
        : economicCorrections.some((c) => c.exercise.id === id)
          ? economicCorrectionsRevision
          : [...capstoneLongCases, ...capstoneGapCases].some(
                (c) => c.exercise.id === id,
              )
            ? capstoneRevision
            : propertySafetyCorrections.some((c) => c.exercise.id === id)
              ? propertySafetyCorrectionsRevision
              : personCorrections.some((c) => c.exercise.id === id)
                ? personCorrectionsRevision
                : sentencingCorrections.some((c) => c.exercise.id === id)
                  ? sentencingCorrectionsRevision
                  : generalCorrections.some((c) => c.exercise.id === id)
                    ? generalCorrectionsRevision
                    : packageOneCorrections.some((c) => c.exercise.id === id)
                      ? packageOneCorrectionsRevision
                      : officeCases.some((c) => c.exercise.id === id)
                        ? officeRevision
                        : socialCases.some((c) => c.exercise.id === id)
                          ? socialRevision
                          : economicCases.some((c) => c.exercise.id === id)
                            ? economicRevision
                            : safetyCases.some((c) => c.exercise.id === id)
                              ? safetyRevision
                              : propertyCases.some((c) => c.exercise.id === id)
                                ? propertyRevision
                                : personCases.some((c) => c.exercise.id === id)
                                  ? personRevision
                                  : generalCases.some(
                                        (c) => c.exercise.id === id,
                                      )
                                    ? generalRevision
                                    : packageOneCases.some(
                                          (c) => c.exercise.id === id,
                                        )
                                      ? packageOneRevision
                                      : foundationCases.some(
                                            (c) => c.exercise.id === id,
                                          )
                                        ? foundationRevision
                                        : practiceFoundationCases.some(
                                              (c) => c.exercise.id === id,
                                            )
                                          ? practiceFoundationRevision
                                          : practiceFactCases.some(
                                                (c) => c.exercise.id === id,
                                              )
                                            ? practiceFactRevision
                                            : practiceFaultCases.some(
                                                  (c) => c.exercise.id === id,
                                                )
                                              ? practiceFaultRevision
                                              : practiceExamCases.some(
                                                    (c) => c.exercise.id === id,
                                                  )
                                                ? practiceExamRevision
                                                : id === intentCaseChoice.id
                                                  ? intentCaseRevision
                                                  : id ===
                                                      confidenceCaseSubjective.id
                                                    ? confidenceCaseRevision
                                                    : baseTopicRevision(
                                                        learningTopics.find(
                                                          (t) =>
                                                            t.exercises.some(
                                                              (q) =>
                                                                q.id === id,
                                                            ),
                                                        )?.id ?? "",
                                                      );

const previouslyRegisteredExerciseRevision = (id: string) =>
  cl02GasBoundaryCorrections.some((c) => c.exercise.id === id)
    ? cl02GasBoundaryRevision
    : cl02OmissionScopeCorrections.some((c) => c.exercise.id === id)
      ? cl02OmissionScopeRevision
      : borderQuestionScopeCorrections.some((c) => c.exercise.id === id)
        ? borderQuestionScopeRevision
        : procurementContentCorrections.some((c) => c.exercise.id === id)
          ? procurementContentCorrectionRevision
          : previousExerciseRevision(id);

const previousExerciseRevision = (id: string) =>
  feedbackBoundaryCorrections.some((c) => c.exercise.id === id)
    ? feedbackBoundaryRevision
    : statutoryBoundaryCases.some((c) => c.exercise.id === id)
      ? statutoryBoundaryRevision
      : marriageRubricReviewCorrections.some((c) => c.exercise.id === id)
        ? marriageRubricReviewRevision
        : rescueObstructionCases.some((c) => c.exercise.id === id)
          ? rescueObstructionRevision
          : personRubricReviewCorrections.some((c) => c.exercise.id === id)
            ? personRubricReviewRevision
            : resaleCases.some((c) => c.exercise.id === id)
              ? resaleRevision
              : minorOrganizationCases.some((c) => c.exercise.id === id)
                ? minorOrganizationRevision
                : personGapCases.some((item) => item.exercise.id === id)
                  ? personGapRevision
                  : generalGapReviewCorrections.some(
                        (item) => item.exercise.id === id,
                      )
                    ? generalGapReviewRevision
                    : executionCases.some((item) => item.exercise.id === id)
                      ? executionRevision
                      : generalGapCases.some((item) => item.exercise.id === id)
                        ? generalGapRevision
                        : remainingAuditCorrections.some(
                              (item) => item.exercise.id === id,
                            )
                          ? remainingAuditRevision
                          : specialAuditCorrections.some(
                                (item) => item.exercise.id === id,
                              )
                            ? specialAuditRevision
                            : generalAuditCorrections.some(
                                  (item) => item.exercise.id === id,
                                )
                              ? generalAuditRevision
                              : baseExerciseRevision(id);

const previouslyRegisteredCustodyExerciseRevision = (id: string) =>
  courtOrderItemCases.some(({ exercise }) => exercise.id === id)
    ? courtOrderItemRevision
    : previouslyRegisteredExerciseRevision(id);

const previousSubjectExerciseRevision = (id: string) =>
  civilAgencyQuestion(id)
    ? civilAgencyContentPackCandidate.revision
    : civilContractFormationQuestion(id)
      ? civilContractFormationContentPack.revision
      : civilContractPerformanceQuestion(id)
        ? civilContractPerformanceContentPack.revision
        : civilActValidityQuestion(id)
          ? civilActValidityContentPack.revision
          : custodyEscortCases.some((c) => c.exercise.id === id)
            ? custodyEscortRevision
            : previouslyRegisteredCustodyExerciseRevision(id);

const currentExerciseRevision = (id: string) =>
  criminalProcedureG1Question(id)
    ? criminalProcedureG1ContentPack.revision
    : criminalProcedureFoundationsQuestion(id)
      ? criminalProcedureFoundationsContentPack.revision
      : civilProcedureProceduralDetailsQuestion(id)
        ? civilProcedureProceduralDetailsContentPack.revision
        : civilProcedureGapFillQuestion(id)
          ? civilProcedureGapFillContentPack.revision
          : civilProcedureArbitrationQuestion(id)
            ? civilProcedureArbitrationContentPack.revision
            : civilProcedureForeignQuestion(id)
              ? civilProcedureForeignContentPack.revision
              : civilProcedureExecutionQuestion(id)
                ? civilProcedureExecutionContentPack.revision
                : civilProcedureRemediesSpecialQuestion(id)
                  ? civilProcedureRemediesSpecialContentPack.revision
                  : civilProcedureFirstInstanceQuestion(id)
                    ? civilProcedureFirstInstanceContentPack.revision
                    : civilProcedureEvidenceProcessQuestion(id)
                      ? civilProcedureEvidenceProcessContentPack.revision
                      : civilProcedureFoundationsQuestion(id)
                        ? civilProcedureFoundationsContentPack.revision
                        : civilProcedurePartiesQuestion(id)
                          ? civilProcedurePartiesContentPack.revision
                          : civilBoundedGapsQuestion(id)
                            ? civilBoundedGapsContentPack.revision
                            : civilProjectTechPartnershipQuestion(id)
                              ? civilProjectTechPartnershipContentPack.revision
                              : civilFinanceAgencyQuestion(id)
                                ? civilFinanceAgencyContentPack.revision
                                : civilServiceContractQuestion(id)
                                  ? civilServiceContractContentPack.revision
                                  : civilUsufructQuestion(id)
                                    ? civilUsufructContentPack.revision
                                    : civilNeighborPossessionQuestion(id)
                                      ? civilNeighborPossessionContentPack.revision
                                      : civilQuasiContractQuestion(id)
                                        ? civilQuasiContractContentPack.revision
                                        : civilInheritanceQuestion(id)
                                          ? civilInheritanceContentPack.revision
                                          : civilFamilyQuestion(id)
                                            ? civilFamilyContentPack.revision
                                            : civilPersonalityQuestion(id)
                                              ? civilPersonalityContentPack.revision
                                              : civilPileTreeRoadQuestion(id)
                                                ? civilPileTreeRoadContentPack.revision
                                                : civilEnvironmentObjectsQuestion(
                                                      id,
                                                    )
                                                  ? civilEnvironmentObjectsContentPack.revision
                                                  : civilTrafficMedicalQuestion(
                                                        id,
                                                      )
                                                    ? civilTrafficMedicalContentPack.revision
                                                    : civilEducationProductQuestion(
                                                          id,
                                                        )
                                                      ? civilEducationProductContentPack.revision
                                                      : civilTortSpecialQuestion(
                                                            id,
                                                          )
                                                        ? civilTortSpecialContentPack.revision
                                                        : civilGuaranteeCoverageQuestion(
                                                              id,
                                                            )
                                                          ? civilGuaranteeCoverageContentPack.revision
                                                          : civilWorkMandateQuestion(
                                                                id,
                                                              )
                                                            ? civilWorkMandateContentPack.revision
                                                            : civilGiftLoanQuestion(
                                                                  id,
                                                                )
                                                              ? civilGiftLoanContentPack.revision
                                                              : civilSaleLeaseQuestion(
                                                                    id,
                                                                  )
                                                                ? civilSaleLeaseContentPack.revision
                                                                : civilObligationsQuestion(
                                                                      id,
                                                                    )
                                                                  ? civilObligationsContentPack.revision
                                                                  : civilPropertyQuestion(
                                                                        id,
                                                                      )
                                                                    ? civilPropertyContentPack.revision
                                                                    : civilFoundationsQuestion(
                                                                          id,
                                                                        )
                                                                      ? civilFoundationsContentPack.revision
                                                                      : criminalProcedureArrestReviewQuestion(
                                                                            id,
                                                                          )
                                                                        ? criminalProcedureArrestReviewContentPack.revision
                                                                        : civilProcedureAgentAuthorityQuestion(
                                                                              id,
                                                                            )
                                                                          ? civilProcedureAgentAuthorityContentPack.revision
                                                                          : criminalProcedureBailQuestion(
                                                                                id,
                                                                              )
                                                                            ? criminalProcedureBailContentPack.revision
                                                                            : civilGuaranteeQuestion(
                                                                                  id,
                                                                                )
                                                                              ? civilGuaranteeContentPack.revision
                                                                              : criminalProcedureDefenseQuestion(
                                                                                    id,
                                                                                  )
                                                                                ? criminalProcedureDefenseContentPack.revision
                                                                                : civilProcedureProofBurdenQuestion(
                                                                                      id,
                                                                                    )
                                                                                  ? civilProcedureProofBurdenContentPack.revision
                                                                                  : commercialPackForQuestion(
                                                                                        id,
                                                                                      )
                                                                                    ? commercialPackForQuestion(
                                                                                        id,
                                                                                      )!
                                                                                        .revision
                                                                                    : criminalProcedureBurdenQuestion(
                                                                                          id,
                                                                                        )
                                                                                      ? criminalProcedureBurdenContentPack.revision
                                                                                      : administrativePackForQuestion(
                                                                                            id,
                                                                                          )
                                                                                        ? administrativePackForQuestion(
                                                                                            id,
                                                                                          )!
                                                                                            .revision
                                                                                        : criminalProcedurePartialCorroborationQuestion(
                                                                                              id,
                                                                                            )
                                                                                          ? criminalProcedurePartialCorroborationContentPack.revision
                                                                                          : criminalProcedureExclusionQuestion(
                                                                                                id,
                                                                                              )
                                                                                            ? criminalProcedureExclusionContentPack.revision
                                                                                            : criminalProcedureProofQuestion(
                                                                                                  id,
                                                                                                )
                                                                                              ? criminalProcedureProofContentPack.revision
                                                                                              : personalTortQuestionFor(
                                                                                                    id,
                                                                                                  )
                                                                                                ? personalTortRevision
                                                                                                : tortQuestionFor(
                                                                                                      id,
                                                                                                    )
                                                                                                  ? tortRevision
                                                                                                  : civilProcedureIntegratedQuestion(
                                                                                                        id,
                                                                                                      )
                                                                                                    ? civilProcedureIntegratedRevision
                                                                                                    : civilProcedureJurisdictionResponseQuestion(
                                                                                                          id,
                                                                                                        )
                                                                                                      ? civilProcedureJurisdictionResponseContentPack.revision
                                                                                                      : civilContractIntegratedQuestion(
                                                                                                            id,
                                                                                                          )
                                                                                                        ? civilContractIntegratedRevision
                                                                                                        : civilStipulatedLiabilityQuestion(
                                                                                                              id,
                                                                                                            )
                                                                                                          ? civilStipulatedLiabilityContentPack.revision
                                                                                                          : civilContractLossesQuestion(
                                                                                                                id,
                                                                                                              )
                                                                                                            ? civilContractLossesContentPack.revision
                                                                                                            : civilContractRemediesQuestion(
                                                                                                                  id,
                                                                                                                )
                                                                                                              ? civilContractRemediesContentPack.revision
                                                                                                              : civilProcedureFilingVenueQuestion(
                                                                                                                    id,
                                                                                                                  )
                                                                                                                ? civilProcedureFilingVenueContentPack.revision
                                                                                                                : civilProcedureContractVenueQuestion(
                                                                                                                      id,
                                                                                                                    )
                                                                                                                  ? civilProcedureContractVenueContentPack.revision
                                                                                                                  : civilProcedureUnagreedVenueQuestion(
                                                                                                                        id,
                                                                                                                      )
                                                                                                                    ? civilProcedureUnagreedVenueContentPack.revision
                                                                                                                    : civilMovableDeliveryQuestion(
                                                                                                                          id,
                                                                                                                        )
                                                                                                                      ? civilMovableDeliveryContentPack.revision
                                                                                                                      : civilProcedureUnperformedTransferQuestion(
                                                                                                                            id,
                                                                                                                          )
                                                                                                                        ? civilProcedureUnperformedTransferContentPack.revision
                                                                                                                        : civilTortInstigationAssistanceQuestion(
                                                                                                                              id,
                                                                                                                            )
                                                                                                                          ? civilTortInstigationAssistanceContentPack.revision
                                                                                                                          : previousSubjectExerciseRevision(
                                                                                                                              id,
                                                                                                                            );

const beforeRemainingG6IsPublishedTopicRevision = (
  id: string,
  revision: string,
) =>
  historicalPracticeTopicRevision(id, revision) ||
  isCurrentPublishedTopicRevision(id, revision);

const beforeRemainingG6ExerciseRevision = (id: string) =>
  civilProcedureCrossChapterQuestion(id)
    ? civilProcedureCrossChapterRevision
    : id === defenseLessonCorrection.exercise.id
      ? defenseLessonRevision
      : educationFacilitiesQuestions.some((q) => q.id === id)
        ? educationFacilitiesRevision
        : negligentExplosionQuestions.some((q) => q.id === id)
          ? negligentExplosionRevision
          : explosionQuestions.some((q) => q.id === id)
            ? explosionRevision
            : civilInsecurityStagesQuestions.some((q) => q.id === id)
              ? civilInsecurityStagesRevision
              : criminalProcedureLegalityQuestions.some((q) => q.id === id)
                ? criminalProcedureLegalityRevision
                : civilProcedureEvidenceQuestions.some((q) => q.id === id)
                  ? civilProcedureEvidenceRevision
                  : (historicalPracticePack(id)?.revision ??
                    (id === civilProcedureProofBoundaryId
                      ? civilProcedureProofBoundaryRevision
                      : currentExerciseRevision(id)));

export const exerciseSources = (id: string): ContentSources =>
  contentPacks.find((pack) => pack.revision === exerciseRevision(id))!.snapshot
    .sources;

/** Saved answers resolve the exact publication, including shared-ID archives. */
export const savedExerciseFor = (id: string, revision: string) =>
  isHistoricalPracticeQuestion(id)
    ? historicalPracticeQuestion(id, revision)
    : revision === exerciseRevision(id)
      ? exerciseFor(id)
      : undefined;
import {
  civilAgencyContentPackCandidate,
  civilAgencyLookupTopics,
  civilAgencyQuestion,
} from "./civil-agency-catalog-candidate";
import {
  civilContractFormationContentPack,
  civilContractFormationTopic,
  civilContractFormationQuestion,
} from "./civil-contract-formation";
import {
  civilContractPerformanceContentPack,
  civilContractPerformanceTopic,
  civilContractPerformanceQuestion,
} from "./civil-insecurity-stages-registration";

import {
  civilActValidityContentPack,
  civilActValidityTopic,
  civilActValidityQuestion,
} from "./civil-act-validity";

import {
  civilProcedureFilingVenueContentPack,
  civilProcedureFilingVenueTopics,
  civilProcedureFilingVenueQuestion,
} from "./civil-procedure-filing-venue";

import {
  civilContractRemediesContentPack,
  civilContractRemediesTopics,
  civilContractRemediesQuestion,
} from "./civil-contract-remedies";

export function topicRevision(id: string) {
  return trademarkG8Topics.some((t) => t.id === id)
    ? trademarkG8Revision
    : annualG8Topics.some((t) => t.id === id)
      ? annualG8Revision
      : remainingG6Topics.some((t) => t.id === id)
        ? remainingG6Revision
        : beforeRemainingG6TopicRevision(id);
}
export function topicSources(id: string): ContentSources {
  return trademarkG8Topics.some((t) => t.id === id)
    ? trademarkG8Sources
    : annualG8Topics.some((t) => t.id === id)
      ? annualG8Sources
      : remainingG6Topics.some((t) => t.id === id)
        ? remainingG6Sources
        : beforeRemainingG6TopicSources(id);
}
export function exerciseRevision(id: string) {
  if (g8CompletionQuestion(id)) return g8CompletionRevision;
  return trademarkG8Question(id)
    ? trademarkG8Revision
    : annualG8Question(id)
      ? annualG8Revision
      : remainingG6Question(id)
        ? remainingG6Revision
        : beforeRemainingG6ExerciseRevision(id);
}
export function isPublishedTopicRevision(id: string, revision: string) {
  return trademarkG8Topics.some((t) => t.id === id)
    ? revision === trademarkG8Revision
    : annualG8Topics.some((t) => t.id === id)
      ? revision === annualG8Revision
      : remainingG6Topics.some((t) => t.id === id)
        ? revision === remainingG6Revision
        : beforeRemainingG6IsPublishedTopicRevision(id, revision);
}
