import { g8CompletionQuestionsForSubject } from "./g8-completion";
import {
  isRemainingG6Subject,
  remainingG6SubjectIds,
} from "./remaining-g6-subjects";
import { remainingG6SectionsForSubject } from "./remaining-g6";
import { commercialSections } from "./commercial-sections";
import { administrativeSections } from "./administrative-sections";
import { civilProcedureSections } from "./civil-procedure-sections";
import { criminalProcedureSections } from "./criminal-procedure-sections";
import {
  practiceChapter,
  practiceTopic,
  subjectPracticeQueues,
} from "./practice-set";

export const corePracticeSubjects = [
  "criminal-law",
  "civil-law",
  "civil-procedure",
  "criminal-procedure",
  "administrative-law",
  "commercial-law",
  ...remainingG6SubjectIds,
] as const;
export type CorePracticeSubject = (typeof corePracticeSubjects)[number];

// Display groups only. Question identities, versions and saved queue order stay
// with the existing content registry.
const civilGroups = [
  {
    id: "foundations",
    title: "民法总则",
    chapterIds: [
      "CIV-CAPACITY",
      "CIV-GUARDIANSHIP",
      "CIV-DECLARATIONS",
      "CIV-ORGANIZATIONS",
      "CIV-ACT-VALIDITY",
      "CIV-MISTAKE-UNFAIRNESS",
      "CIV-CONDITION-TERM",
      "CIV-AGENCY",
      "CIV-LIMITATION",
    ],
  },
  {
    id: "property",
    title: "物权与占有",
    chapterIds: [
      "CIVIL-MOVABLE-DELIVERY",
      "CIV-REALPROPERTY",
      "CIV-COOWNERSHIP",
      "CIV-CONDOMINIUM",
      "CIV-GOODFAITH",
      "CIV-NEIGHBORING-RIGHTS",
      "CIV-POSSESSION",
      "CIV-HABITATION",
      "CIV-EASEMENT",
      "CIV-CONSTRUCTION-LAND",
      "CIV-LAND-CONTRACT",
    ],
  },
  {
    id: "security",
    title: "担保制度",
    chapterIds: [
      "CIV-MORTGAGE",
      "CIV-PLEDGE-RETENTION",
      "CIVIL-GUARANTEE",
      "CIV-GUARANTEE-PERIOD",
      "CIV-GUARANTEE-SCOPE",
      "CIV-MIXED-SECURITY",
    ],
  },
  {
    id: "obligations",
    title: "债与合同通则",
    chapterIds: [
      "CIV-CONTRACT-FORMATION",
      "CIV-CONTRACT-PERFORMANCE",
      "CIVIL-CONTRACT-REMEDIES",
      "CIV-CONTRACT-LOSSES",
      "CIV-STIPULATED-LIABILITY",
      "CIV-PRESERVATION",
      "CIV-ASSIGNMENT",
      "CIV-DEBT-ASSUMPTION",
      "CIV-TENDER-DEPOSIT",
      "CIV-MANAGEMENT-WITHOUT-MANDATE",
      "CIV-UNJUST-ENRICHMENT",
    ],
  },
  {
    id: "contracts",
    title: "典型合同",
    chapterIds: [
      "CIV-SALE-PERFORMANCE",
      "CIV-SALE-INSPECTION",
      "CIV-LEASE-USE",
      "CIV-LEASE-TRANSFER",
      "CIV-GIFT-PERFORMANCE",
      "CIV-GIFT-REVOCATION",
      "CIV-LOAN-FORMATION",
      "CIV-LOAN-PERFORMANCE",
      "CIV-WORK-PERFORMANCE",
      "CIV-WORK-RESULTS",
      "CIV-MANDATE-PERFORMANCE",
      "CIV-MANDATE-SETTLEMENT",
      "CIV-TRANSPORT",
      "CIV-DEPOSIT",
      "CIV-WAREHOUSING",
      "CIV-PROPERTY-SERVICE",
      "CIV-ENERGY-SUPPLY",
      "CIV-FINANCE-LEASE",
      "CIV-FACTORING",
      "CIV-COMMISSION-AGENCY",
      "CIV-INTERMEDIARY",
      "CIV-CONSTRUCTION-CONTRACT",
      "CIV-TECH-DEVELOPMENT",
      "CIV-TECH-LICENSE-SERVICE",
      "CIV-PARTNERSHIP-CONTRACT",
    ],
  },
  {
    id: "torts",
    title: "侵权责任",
    chapterIds: [
      "CIV-TORT-PROPERTY",
      "CIV-TORT-PERSONAL",
      "CIV-TORT-INSTIGATION-ASSISTANCE",
      "CIV-TORT-GUARDIAN",
      "CIV-TORT-EMPLOYER",
      "CIV-TORT-ANIMALS",
      "CIV-TORT-EDUCATION",
      "CIV-PRODUCT-LIABILITY",
      "CIV-PRODUCT-PREVENTION",
      "CIV-TRAFFIC-VEHICLE",
      "CIV-TRAFFIC-COMPENSATION",
      "CIV-MEDICAL-DUTY",
      "CIV-MEDICAL-CONSENT",
      "CIV-ENVIRONMENT-TORT",
      "CIV-HIGH-RISK-TORT",
      "CIV-BUILDING-HARM",
      "CIV-OBJECT-HARM",
      "CIV-STACKED-OBJECTS",
      "CIV-TREE-HARM",
      "CIV-ROAD-OBSTRUCTION",
      "CIV-NETWORK-PROVIDER",
    ],
  },
  {
    id: "personality",
    title: "人格权",
    chapterIds: [
      "CIV-PERSON-NAME",
      "CIV-PORTRAIT-RIGHTS",
      "CIV-REPUTATION-RIGHTS",
      "CIV-PRIVACY-INFORMATION",
    ],
  },
  {
    id: "family",
    title: "婚姻家庭",
    chapterIds: [
      "CIV-MARRIAGE-VALIDITY",
      "CIV-FAMILY-PROPERTY-DEBT",
      "CIV-DIVORCE-PROCEDURE",
      "CIV-DIVORCE-PROPERTY",
      "CIV-PARENT-CHILD",
      "CIV-ADOPTION",
    ],
  },
  {
    id: "inheritance",
    title: "继承",
    chapterIds: [
      "CIV-INHERITANCE-OPENING",
      "CIV-STATUTORY-SUCCESSION",
      "CIV-TESTAMENTARY-SUCCESSION",
      "CIV-ESTATE-HANDLING",
      "CIV-ESTATE-ADMINISTRATOR",
    ],
  },
];

const subjectIds = (subject: CorePracticeSubject) =>
  Object.values(subjectPracticeQueues(subject)).flat();
const civilIds = subjectIds("civil-law");
export const civilLawSections = civilGroups.map((group) => {
  const questionIds = civilIds.filter((id) =>
    group.chapterIds.includes(practiceChapter(id).id),
  );
  return {
    ...group,
    questionIds,
    topicIds: [...new Set(questionIds.map((id) => practiceTopic(id).id))],
  };
});
const criminalIds = subjectIds("criminal-law");
const criminalSections = [
  ...new Set(criminalIds.map((id) => practiceChapter(id).id)),
].map((id) => {
  const questionIds = criminalIds.filter(
    (qid) => practiceChapter(qid).id === id,
  );
  return {
    id,
    title: practiceChapter(questionIds[0]).title,
    chapterIds: [id],
    questionIds,
    topicIds: [...new Set(questionIds.map((qid) => practiceTopic(qid).id))],
  };
});

export function corePracticeSections(subject: CorePracticeSubject) {
  return isRemainingG6Subject(subject)
    ? remainingG6SectionsForSubject(subject).map((section) => ({
        ...section,
        questionIds: [
          ...section.questionIds,
          ...g8CompletionQuestionsForSubject(subject)
            .filter((q) => section.topicIds.includes(practiceTopic(q.id).id))
            .map((q) => q.id),
        ],
      }))
    : subject === "commercial-law"
      ? commercialSections
      : subject === "criminal-law"
        ? criminalSections
        : subject === "civil-law"
          ? civilLawSections
          : subject === "civil-procedure"
            ? civilProcedureSections
            : subject === "administrative-law"
              ? administrativeSections
              : criminalProcedureSections;
}

export function coreSectionForTopic(
  subject: CorePracticeSubject,
  topicId: string | undefined,
) {
  return corePracticeSections(subject).find((section) =>
    section.topicIds.includes(topicId ?? ""),
  );
}
