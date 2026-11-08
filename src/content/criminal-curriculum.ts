import { remainingG6Chapters } from "./remaining-g6";
import { commercialG5Chapters } from "./commercial-g5";
import { ecologyG8Chapters } from "./ecology-g8";
import { administrativeG4Chapters } from "./administrative-g4";
import { criminalProcedureG1Chapters } from "./criminal-procedure-g1";
import { criminalProcedureFoundationsChapters } from "./criminal-procedure-foundations";
import { civilProcedureProceduralDetailsChapters } from "./civil-procedure-procedural-details";
import { civilProcedureGapFillChapters } from "./civil-procedure-gap-fill";
import { civilProcedureCrossChapterCases } from "./civil-procedure-cross-chapter";
import { civilProcedureArbitrationChapters } from "./civil-procedure-arbitration";
import { civilProcedureForeignChapters } from "./civil-procedure-foreign";
import { civilProcedureExecutionChapters } from "./civil-procedure-execution";
import { civilProcedureRemediesSpecialChapters } from "./civil-procedure-remedies-special";
import { civilProcedureFirstInstanceChapters } from "./civil-procedure-first-instance";
import { civilProcedureEvidenceProcessChapters } from "./civil-procedure-evidence-process";
import { civilProcedureFoundationsChapters } from "./civil-procedure-foundations";
import { civilProcedurePartiesChapters } from "./civil-procedure-parties";
import { civilBoundedGapsChapters } from "./civil-bounded-gaps";
import { civilProjectTechPartnershipChapters } from "./civil-project-tech-partnership";
import { civilFinanceAgencyChapters } from "./civil-finance-agency";
import { civilServiceContractChapters } from "./civil-service-contract";
import { civilUsufructChapters } from "./civil-usufruct";
import { civilNeighborPossessionChapters } from "./civil-neighbor-possession";
import { civilQuasiContractChapters } from "./civil-quasi-contract";
import { civilInheritanceChapters } from "./civil-inheritance";
import { civilFamilyChapters } from "./civil-family";
import { civilPersonalityChapters } from "./civil-personality";
import { civilPileTreeRoadChapters } from "./civil-pile-tree-road";
import { civilEnvironmentObjectsChapters } from "./civil-environment-objects";
import { civilTrafficMedicalChapters } from "./civil-traffic-medical";
import { civilEducationProductChapters } from "./civil-education-product";
import { civilTortSpecialChapters } from "./civil-tort-special";
import { civilGuaranteeCoverageChapters } from "./civil-guarantee-coverage";
import { civilWorkMandateChapters } from "./civil-work-mandate";
import { civilGiftLoanChapters } from "./civil-gift-loan";
import { civilSaleLeaseChapters } from "./civil-sale-lease";
import { civilObligationsChapters } from "./civil-obligations";
import { civilPropertyChapters } from "./civil-property";
import { civilFoundationsChapters } from "./civil-foundations";
import { civilProcedureAgentAuthorityChapter } from "./civil-procedure-agent-authority";
import { criminalProcedureArrestReviewChapter } from "./criminal-procedure-arrest-review";
import { criminalProcedureBailChapter } from "./criminal-procedure-bail";
import { civilGuaranteeChapter } from "./civil-guarantee";
import { criminalProcedureDefenseChapter } from "./criminal-procedure-defense";
import { civilProcedureProofBurdenChapter } from "./civil-procedure-proof-burden";
import { commercialChapter } from "./commercial-registration";
import { criminalProcedureBurdenChapter } from "./criminal-procedure-burden";
import { administrativeChapter } from "./administrative-registration";
import { criminalProcedureExclusionChapter } from "./criminal-procedure-exclusion";
import { criminalProcedureProofChapter } from "./criminal-procedure-proof";
import { civilTortInstigationAssistanceChapter } from "./civil-tort-instigation-assistance";
import { civilMovableDeliveryChapter } from "./civil-movable-delivery";
import { civilProcedureUnagreedVenueChapter } from "./civil-procedure-unagreed-venue";
import { personalTortChapter } from "./civil-tort-personal";
import { tortChapter } from "./civil-tort-property";
import { civilProcedureContractVenueChapter } from "./civil-procedure-contract-venue";
import { civilProcedureReviewChapter } from "./civil-procedure-review";
import { civilContractReviewChapter } from "./civil-contract-review";
import { civilStipulatedLiabilityChapter } from "./civil-stipulated-liability";
import { civilContractLossesChapter } from "./civil-contract-losses";
import { capstoneGaps } from "./criminal-capstone/gaps";
import { civilContractRemediesChapter } from "./civil-contract-remedies";
import { civilAgencyChapter } from "./civil-agency";
import { civilContractFormationChapter } from "./civil-contract-formation";
import { civilContractPerformanceChapter } from "./civil-contract-performance";
import { civilActValidityChapter } from "./civil-act-validity";
import { civilProcedureFilingVenueChapter } from "./civil-procedure-filing-venue";
import { civilProcedureJurisdictionResponseChapter } from "./civil-procedure-jurisdiction-response";
/** Product chapters, not statutory chapters or a claim of syllabus completeness. */
const baseChapters = [
  {
    id: "CL01",
    title: "刑法基础与适用",
    section: "总则",
    topicIds: [
      "criminal-principles",
      "criminal-punishment-principles",
      "criminal-territory",
      "criminal-extraterritorial",
      "criminal-treaty",
      "criminal-time",
    ],
  },
  {
    id: "CL02",
    title: "犯罪构成、行为与因果关系",
    section: "总则",
    topicIds: [
      "crime-threshold",
      "criminal-conduct",
      "omission-duty",
      "causal-intervention",
    ],
  },
  {
    id: "CL03",
    title: "犯罪主体与责任能力",
    section: "总则",
    topicIds: [
      "criminal-age",
      "mental-capacity",
      "personal-mitigation",
      "special-subject",
      "unit-crime",
    ],
  },
  {
    id: "CL04",
    title: "罪过与认识错误",
    section: "总则",
    topicIds: [
      "intent",
      "confidence",
      "negligence",
      "accident",
      "purpose-motive",
      "fact-mistake",
      "abstract-mistake",
      "object-mistake",
      "blow-mistake",
      "causal-mistake",
      "anticipated-result",
      "late-result",
      "unlawfulness-mistake",
    ],
  },
  {
    id: "CL05",
    title: "正当防卫、紧急避险与其他正当化事由",
    section: "总则",
    topicIds: [
      "defense-base",
      "defense-limit",
      "defense-special",
      "defense-mistake",
      "accidental-defense",
      "necessity",
      "consent",
      "presumed-consent",
      "lawful-act",
    ],
  },
  {
    id: "CL06",
    title: "犯罪的停止形态",
    section: "总则",
    topicIds: [
      "preparation",
      "commencement",
      "attempt",
      "impossibility",
      "abandonment",
      "completion",
    ],
  },
  {
    id: "CL07",
    title: "共同犯罪",
    section: "总则",
    topicIds: [
      "joint-intent",
      "roles",
      "instigation",
      "indirect-perpetration",
      "excess",
      "succession",
      "unilateral-help",
      "withdrawal",
      "joint-status",
    ],
  },
  {
    id: "CL08",
    title: "罪数",
    section: "总则",
    topicIds: [
      "statutory-concurrence",
      "ideal-concurrence",
      "multiple-crimes",
      "continuing-series",
      "absorbed-linked",
      "aggravated-combined",
    ],
  },
  {
    id: "CL09",
    title: "刑罚种类与基本制度",
    section: "总则",
    topicIds: [
      "liberty-penalties",
      "capital",
      "fine-confiscation",
      "rights-deprivation",
      "expulsion",
      "sentence-credit",
      "non-penalty",
    ],
  },
  {
    id: "CL10",
    title: "量刑、刑罚执行与消灭",
    section: "总则",
    topicIds: [
      "sentencing-adjustment",
      "recidivism",
      "surrender-confession",
      "merit",
      "combined-sentence",
      "suspension",
      "reduction-parole",
      "limitation-amnesty",
    ],
  },
  {
    id: "CL11",
    title: "生命、身体与性权利犯罪",
    section: "分则",
    topicIds: [
      "homicide-intent",
      "negligent-homicide",
      "intentional-injury",
      "negligent-injury",
      "organ-offenses",
      "family-abuse",
      "care-abuse",
      "family-abandonment",
      "rape",
      "sexual-care",
      "sexual-molestation",
    ],
  },
  {
    id: "CL12",
    title: "自由、民主权利与其他人身权利犯罪",
    section: "分则",
    topicIds: [
      "unlawful-detention",
      "kidnapping",
      "human-trafficking",
      "buying-trafficked",
      "child-abduction",
      "forced-labor",
      "residence-search",
      "defamation-insult",
      "false-accusation",
      "official-coercion",
      "personal-data",
      "correspondence",
      "marriage-family",
      "election-rights",
      "official-retaliation",
    ],
  },
  {
    id: "CL13",
    title: "侵犯财产罪",
    section: "分则",
    topicIds: [
      "property-possession",
      "property-theft-completion",
      "property-theft-special",
      "property-theft-damage",
      "property-fraud-disposition",
      "property-fraud-intent",
      "property-fraud-attempt",
      "property-robbery",
      "property-robbery-conversion",
      "property-robbery-aggravation",
      "property-robbery-result",
      "property-snatching",
      "property-extortion",
      "property-appropriation",
      "property-occupational",
      "property-fund-use",
      "property-specific-funds",
      "property-crowd-looting",
      "property-destruction",
      "property-unpaid-wages",
    ],
  },
  {
    id: "CL14",
    title: "危害公共安全罪",
    section: "分则",
    topicIds: [
      "safety-fire",
      "safety-method",
      "safety-transport",
      "safety-utilities",
      "safety-broadcast-facilities",
      "safety-aviation",
      "safety-flight-accident",
      "safety-rail-accident",
      "safety-mass-event-accident",
      "safety-weapons",
      "safety-traffic",
      "safety-escape",
      "safety-driving",
      "safety-bus",
      "safety-work-responsibility",
      "safety-dangerous-work",
      "safety-facilities",
      "safety-rescue",
    ],
  },
  {
    id: "CL15",
    title: "商品、公司与市场交易犯罪",
    section: "分则",
    topicIds: [
      "economic-product",
      "economic-food",
      "economic-drug",
      "economic-smuggling",
      "economic-capital",
      "economic-disclosure",
      "economic-liquidation",
      "economic-bribe",
      "economic-competing",
      "economic-relatives",
      "economic-contract",
      "economic-business",
      "economic-pyramid",
      "economic-bid",
      "economic-proof",
    ],
  },
  {
    id: "CL16",
    title: "金融、税收与知识产权犯罪",
    section: "分则",
    topicIds: [
      "finance-currency",
      "finance-fundraising",
      "finance-loan",
      "finance-onlending",
      "finance-unpublished-trading",
      "finance-securities",
      "finance-creditcard",
      "finance-bills",
      "finance-insurance",
      "finance-laundering",
      "finance-tax",
      "finance-export-tax",
      "finance-invoices",
      "finance-trademark",
      "finance-copyright",
      "finance-secret",
    ],
  },
  {
    id: "CL17",
    title: "公共秩序、网络与司法秩序犯罪",
    section: "分则",
    topicIds: [
      "public-duty",
      "public-police",
      "public-affray",
      "public-disorder",
      "public-gang",
      "public-documents",
      "public-exam",
      "public-gambling",
      "public-obscenity",
      "network-system",
      "network-use",
      "network-help",
      "justice-perjury",
      "justice-evidence",
      "justice-witness-retaliation",
      "justice-court-order",
      "justice-false-suit",
      "justice-harbor",
      "justice-proceeds",
      "justice-execution",
    ],
  },
  {
    id: "CL18",
    title: "国境、文物、卫生、环境与毒品等犯罪",
    section: "分则",
    topicIds: [
      "social-border",
      "social-relic",
      "health-infection",
      "health-medical",
      "environment-pollution",
      "environment-wildlife",
      "environment-forest",
      "environment-fishing",
      "drug-trafficking",
      "drug-possession",
      "drug-shelter",
      "social-prostitution",
    ],
  },
  {
    id: "CL19",
    title: "贪污贿赂与渎职罪",
    section: "分则",
    topicIds: [
      "office-status",
      "office-graft",
      "office-funds",
      "office-receipt",
      "office-benefit",
      "office-influence",
      "office-giving",
      "office-unit-bribes",
      "office-to-unit",
      "office-broker",
      "office-unexplained",
      "office-division",
      "office-abuse",
      "office-negligence",
      "office-secrets",
      "office-justice",
      "office-civil",
      "office-release",
      "office-transfer",
      "office-special-duty",
    ],
  },
  {
    id: "CL20",
    title: "国家安全、国防利益与军人职责相关犯罪",
    section: "分则",
    topicIds: [
      "state-unity",
      "state-spy",
      "state-secrets",
      "state-defection",
      "defense-duty",
      "defense-equipment",
      "military-duty",
    ],
  },
] satisfies {
  id: string;
  title: string;
  section: string;
  topicIds: string[];
}[];

export const criminalChapters = baseChapters.map((chapter) => ({
  ...chapter,
  topicIds: [
    ...chapter.topicIds,
    ...capstoneGaps.filter((t) => t.chapterId === chapter.id).map((t) => t.id),
  ],
}));
export const criminalProcedureEvidenceChapter = {
  ...criminalProcedureProofChapter,
  topicIds: [
    ...criminalProcedureProofChapter.topicIds,
    ...criminalProcedureExclusionChapter.topicIds,
    ...criminalProcedureBurdenChapter.topicIds,
  ],
};
export const chapterFor = (id: string) =>
  ecologyG8Chapters.find((c) => c.id === id) ??
  remainingG6Chapters.find((c) => c.id === id) ??
  commercialG5Chapters.find((c) => c.id === id) ??
  administrativeG4Chapters.find((c) => c.id === id) ??
  criminalProcedureG1Chapters.find((c) => c.id === id) ??
  criminalProcedureFoundationsChapters.find((c) => c.id === id) ??
  civilProcedureCrossChapterCases.find((c) => c.chapter.id === id)?.chapter ??
  civilProcedureProceduralDetailsChapters.find((c) => c.id === id) ??
  civilProcedureGapFillChapters.find((c) => c.id === id) ??
  civilProcedureArbitrationChapters.find((c) => c.id === id) ??
  civilProcedureForeignChapters.find((c) => c.id === id) ??
  civilProcedureExecutionChapters.find((c) => c.id === id) ??
  civilProcedureRemediesSpecialChapters.find((c) => c.id === id) ??
  civilProcedureFirstInstanceChapters.find((c) => c.id === id) ??
  civilProcedureEvidenceProcessChapters.find((c) => c.id === id) ??
  civilProcedureFoundationsChapters.find((c) => c.id === id) ??
  civilProcedurePartiesChapters.find((c) => c.id === id) ??
  civilBoundedGapsChapters.find((c) => c.id === id) ??
  civilProjectTechPartnershipChapters.find((c) => c.id === id) ??
  civilFinanceAgencyChapters.find((c) => c.id === id) ??
  civilServiceContractChapters.find((c) => c.id === id) ??
  civilUsufructChapters.find((c) => c.id === id) ??
  civilNeighborPossessionChapters.find((c) => c.id === id) ??
  civilQuasiContractChapters.find((c) => c.id === id) ??
  civilInheritanceChapters.find((c) => c.id === id) ??
  civilFamilyChapters.find((c) => c.id === id) ??
  civilPersonalityChapters.find((c) => c.id === id) ??
  civilPileTreeRoadChapters.find((c) => c.id === id) ??
  civilEnvironmentObjectsChapters.find((c) => c.id === id) ??
  civilTrafficMedicalChapters.find((c) => c.id === id) ??
  civilEducationProductChapters.find((c) => c.id === id) ??
  civilTortSpecialChapters.find((c) => c.id === id) ??
  civilGuaranteeCoverageChapters.find((c) => c.id === id) ??
  civilWorkMandateChapters.find((c) => c.id === id) ??
  civilGiftLoanChapters.find((c) => c.id === id) ??
  civilSaleLeaseChapters.find((c) => c.id === id) ??
  civilObligationsChapters.find((c) => c.id === id) ??
  civilPropertyChapters.find((c) => c.id === id) ??
  civilFoundationsChapters.find((c) => c.id === id) ??
  (criminalProcedureArrestReviewChapter.id === id
    ? criminalProcedureArrestReviewChapter
    : undefined) ??
  (criminalProcedureBailChapter.id === id
    ? criminalProcedureBailChapter
    : undefined) ??
  (civilGuaranteeChapter.id === id ? civilGuaranteeChapter : undefined) ??
  (criminalProcedureDefenseChapter.id === id
    ? criminalProcedureDefenseChapter
    : undefined) ??
  (civilProcedureProofBurdenChapter.id === id
    ? civilProcedureProofBurdenChapter
    : undefined) ??
  (civilProcedureAgentAuthorityChapter.id === id
    ? civilProcedureAgentAuthorityChapter
    : undefined) ??
  (commercialChapter.id === id ? commercialChapter : undefined) ??
  (administrativeChapter.id === id ? administrativeChapter : undefined) ??
  (criminalProcedureEvidenceChapter.id === id
    ? criminalProcedureEvidenceChapter
    : undefined) ??
  (civilProcedureUnagreedVenueChapter.id === id
    ? civilProcedureUnagreedVenueChapter
    : undefined) ??
  (id === personalTortChapter.id ? personalTortChapter : undefined) ??
  (id === tortChapter.id ? tortChapter : undefined) ??
  (civilProcedureReviewChapter.id === id
    ? civilProcedureReviewChapter
    : undefined) ??
  (civilContractReviewChapter.id === id
    ? civilContractReviewChapter
    : undefined) ??
  criminalChapters.find((c) => c.id === id) ??
  (civilAgencyChapter.id === id ? civilAgencyChapter : undefined) ??
  (civilContractFormationChapter.id === id
    ? civilContractFormationChapter
    : undefined) ??
  (civilContractPerformanceChapter.id === id
    ? civilContractPerformanceChapter
    : undefined) ??
  (civilActValidityChapter.id === id ? civilActValidityChapter : undefined) ??
  (civilProcedureFilingVenueChapter.id === id
    ? civilProcedureFilingVenueChapter
    : undefined) ??
  (civilProcedureContractVenueChapter.id === id
    ? civilProcedureContractVenueChapter
    : undefined) ??
  (civilProcedureJurisdictionResponseChapter.id === id
    ? civilProcedureJurisdictionResponseChapter
    : undefined) ??
  (civilContractRemediesChapter.id === id
    ? civilContractRemediesChapter
    : undefined) ??
  (civilContractLossesChapter.id === id
    ? civilContractLossesChapter
    : undefined) ??
  (civilStipulatedLiabilityChapter.id === id
    ? civilStipulatedLiabilityChapter
    : undefined) ??
  (civilMovableDeliveryChapter.id === id
    ? civilMovableDeliveryChapter
    : undefined) ??
  (civilTortInstigationAssistanceChapter.id === id
    ? civilTortInstigationAssistanceChapter
    : undefined);
export const chapterForTopic = (topicId: string) =>
  ecologyG8Chapters.find((c) => c.topicIds.includes(topicId)) ??
  remainingG6Chapters.find((c) => c.topicIds.includes(topicId)) ??
  commercialG5Chapters.find((c) => c.topicIds.includes(topicId)) ??
  administrativeG4Chapters.find((c) => c.topicIds.includes(topicId)) ??
  criminalProcedureG1Chapters.find((c) => c.topicIds.includes(topicId)) ??
  criminalProcedureFoundationsChapters.find((c) =>
    c.topicIds.includes(topicId),
  ) ??
  civilProcedureProceduralDetailsChapters.find((c) =>
    c.topicIds.includes(topicId),
  ) ??
  civilProcedureGapFillChapters.find((c) => c.topicIds.includes(topicId)) ??
  civilProcedureArbitrationChapters.find((c) => c.topicIds.includes(topicId)) ??
  civilProcedureForeignChapters.find((c) => c.topicIds.includes(topicId)) ??
  civilProcedureExecutionChapters.find((c) => c.topicIds.includes(topicId)) ??
  civilProcedureRemediesSpecialChapters.find((c) =>
    c.topicIds.includes(topicId),
  ) ??
  civilProcedureFirstInstanceChapters.find((c) =>
    c.topicIds.includes(topicId),
  ) ??
  civilProcedureEvidenceProcessChapters.find((c) =>
    c.topicIds.includes(topicId),
  ) ??
  civilProcedureFoundationsChapters.find((c) => c.topicIds.includes(topicId)) ??
  civilProcedurePartiesChapters.find((c) => c.topicIds.includes(topicId)) ??
  civilBoundedGapsChapters.find((c) => c.topicIds.includes(topicId)) ??
  civilProjectTechPartnershipChapters.find((c) =>
    c.topicIds.includes(topicId),
  ) ??
  civilFinanceAgencyChapters.find((c) => c.topicIds.includes(topicId)) ??
  civilServiceContractChapters.find((c) => c.topicIds.includes(topicId)) ??
  civilUsufructChapters.find((c) => c.topicIds.includes(topicId)) ??
  civilNeighborPossessionChapters.find((c) => c.topicIds.includes(topicId)) ??
  civilQuasiContractChapters.find((c) => c.topicIds.includes(topicId)) ??
  civilInheritanceChapters.find((c) => c.topicIds.includes(topicId)) ??
  civilFamilyChapters.find((c) => c.topicIds.includes(topicId)) ??
  civilPersonalityChapters.find((c) => c.topicIds.includes(topicId)) ??
  civilPileTreeRoadChapters.find((c) => c.topicIds.includes(topicId)) ??
  civilEnvironmentObjectsChapters.find((c) => c.topicIds.includes(topicId)) ??
  civilTrafficMedicalChapters.find((c) => c.topicIds.includes(topicId)) ??
  civilEducationProductChapters.find((c) => c.topicIds.includes(topicId)) ??
  civilTortSpecialChapters.find((c) => c.topicIds.includes(topicId)) ??
  civilGuaranteeCoverageChapters.find((c) => c.topicIds.includes(topicId)) ??
  civilWorkMandateChapters.find((c) => c.topicIds.includes(topicId)) ??
  civilGiftLoanChapters.find((c) => c.topicIds.includes(topicId)) ??
  civilSaleLeaseChapters.find((c) => c.topicIds.includes(topicId)) ??
  civilObligationsChapters.find((c) => c.topicIds.includes(topicId)) ??
  civilPropertyChapters.find((c) => c.topicIds.includes(topicId)) ??
  civilFoundationsChapters.find((c) => c.topicIds.includes(topicId)) ??
  (criminalProcedureArrestReviewChapter.topicIds.includes(topicId)
    ? criminalProcedureArrestReviewChapter
    : undefined) ??
  (criminalProcedureBailChapter.topicIds.includes(topicId)
    ? criminalProcedureBailChapter
    : undefined) ??
  (civilGuaranteeChapter.topicIds.includes(topicId)
    ? civilGuaranteeChapter
    : undefined) ??
  (criminalProcedureDefenseChapter.topicIds.includes(topicId)
    ? criminalProcedureDefenseChapter
    : undefined) ??
  (civilProcedureProofBurdenChapter.topicIds.includes(topicId)
    ? civilProcedureProofBurdenChapter
    : undefined) ??
  (civilProcedureAgentAuthorityChapter.topicIds.includes(topicId)
    ? civilProcedureAgentAuthorityChapter
    : undefined) ??
  (commercialChapter.topicIds.includes(topicId)
    ? commercialChapter
    : undefined) ??
  (administrativeChapter.topicIds.includes(topicId)
    ? administrativeChapter
    : undefined) ??
  (criminalProcedureEvidenceChapter.topicIds.includes(topicId)
    ? criminalProcedureEvidenceChapter
    : undefined) ??
  (civilProcedureUnagreedVenueChapter.topicIds.includes(topicId)
    ? civilProcedureUnagreedVenueChapter
    : undefined) ??
  (personalTortChapter.topicIds.includes(topicId)
    ? personalTortChapter
    : undefined) ??
  (tortChapter.topicIds.includes(topicId) ? tortChapter : undefined) ??
  criminalChapters.find((c) => c.topicIds.includes(topicId)) ??
  (civilAgencyChapter.topicIds.includes(topicId)
    ? civilAgencyChapter
    : undefined) ??
  (civilContractFormationChapter.topicIds.includes(topicId)
    ? civilContractFormationChapter
    : undefined) ??
  (civilContractPerformanceChapter.topicIds.includes(topicId)
    ? civilContractPerformanceChapter
    : undefined) ??
  (civilActValidityChapter.topicIds.includes(topicId)
    ? civilActValidityChapter
    : undefined) ??
  (civilProcedureFilingVenueChapter.topicIds.includes(topicId)
    ? civilProcedureFilingVenueChapter
    : undefined) ??
  (civilProcedureContractVenueChapter.topicIds.includes(topicId)
    ? civilProcedureContractVenueChapter
    : undefined) ??
  (civilProcedureJurisdictionResponseChapter.topicIds.includes(topicId)
    ? civilProcedureJurisdictionResponseChapter
    : undefined) ??
  (civilContractRemediesChapter.topicIds.includes(topicId)
    ? civilContractRemediesChapter
    : undefined) ??
  (civilContractLossesChapter.topicIds.includes(topicId)
    ? civilContractLossesChapter
    : undefined) ??
  (civilStipulatedLiabilityChapter.topicIds.includes(topicId)
    ? civilStipulatedLiabilityChapter
    : undefined) ??
  (civilMovableDeliveryChapter.topicIds.includes(topicId)
    ? civilMovableDeliveryChapter
    : undefined) ??
  (civilTortInstigationAssistanceChapter.topicIds.includes(topicId)
    ? civilTortInstigationAssistanceChapter
    : undefined);
export const availableChapters = criminalChapters.filter(
  (c) => c.topicIds.length > 0,
);
