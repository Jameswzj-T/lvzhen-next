import { chapterFor } from "./criminal-curriculum";
import { practiceChapter, subjectPracticeQueues } from "./practice-set";

// Display organization only. Published question identities and practice queues
// remain unchanged; new supplements sit beside the topics they belong to.
export const civilProcedureSections = [
  {
    id: "filing-jurisdiction",
    title: "起诉与管辖",
    chapterIds: [
      "CIVPRO-FILING-VENUE",
      "CIVPRO-JURISDICTION-RESPONSE",
      "CIVPRO-CONTRACT-VENUE",
      "CIVPRO-CONTRACT-UNAGREED-VENUE",
      "CIVPRO-CLAIMS-COUNTERCLAIM",
      "CIVPRO-COMPOSITION-RECUSAL",
      "CIVPRO-LEVEL-JURISDICTION",
      "CIVPRO-JURISDICTION-AGREEMENT",
      "CIVPRO-TRANSFER-DESIGNATION",
    ],
  },
  {
    id: "parties",
    title: "当事人与诉讼代理",
    chapterIds: [
      "CIVPRO-AGENT-AUTHORITY",
      "CIVPRO-LITIGATION-CAPACITY",
      "CIVPRO-JOINT-LITIGATION",
      "CIVPRO-THIRD-INDEPENDENT",
      "CIVPRO-THIRD-NO-INDEPENDENT",
      "CIVPRO-GAP-REPRESENTATIVES",
    ],
  },
  {
    id: "evidence-procedure",
    title: "证据与程序保障",
    chapterIds: [
      "CIVPRO-PROOF-BURDEN",
      "CIVPRO-EVIDENCE-ORIGINALS",
      "CIVPRO-EVIDENCE-OBTAINING",
      "CIVPRO-WITNESS-APPRAISAL",
      "CIVPRO-EVIDENCE-EXAMINATION",
      "CIVPRO-EVIDENCE-TIMING-PRESERVATION",
      "CIVPRO-PERIODS",
      "CIVPRO-SERVICE",
      "CIVPRO-GAP-SERVICE",
      "CIVPRO-DETAIL-COERCIVE-MEASURES",
      "CIVPRO-DETAIL-LITIGATION-FEES",
    ],
  },
  {
    id: "first-instance",
    title: "一审与诉讼中的处理",
    chapterIds: [
      "CIVPRO-PRESERVATION-ADVANCE",
      "CIVPRO-FILING-REPEAT",
      "CIVPRO-WITHDRAWAL-DEFAULT",
      "CIVPRO-MEDIATION-SETTLEMENT",
      "CIVPRO-SIMPLE-SMALL",
      "CIVPRO-RULINGS-REMEDIES",
      "CIVPRO-GAP-LITIGATION-STOP",
    ],
  },
  {
    id: "appeal-supervision",
    title: "二审、再审与监督",
    chapterIds: [
      "CIVPRO-APPEAL-SCOPE",
      "CIVPRO-APPEAL-DISPOSITION",
      "CIVPRO-RETRIAL-APPLICATION",
      "CIVPRO-PROCURATORIAL-SUPERVISION",
      "CIVPRO-PUBLIC-INTEREST",
      "CIVPRO-THIRD-PARTY-REVOCATION",
    ],
  },
  {
    id: "special-procedures",
    title: "特别程序、督促与公示催告",
    chapterIds: [
      "CIVPRO-SPECIAL-STATUS",
      "CIVPRO-JUDICIAL-CONFIRMATION-SECURITY",
      "CIVPRO-PAYMENT-ORDER",
      "CIVPRO-PUBLIC-NOTICE",
      "CIVPRO-DETAIL-ESTATE-MANAGER",
      "CIVPRO-DETAIL-OWNERLESS-PROPERTY",
      "CIVPRO-DETAIL-VOTER-QUALIFICATION",
    ],
  },
  {
    id: "execution",
    title: "执行与执行救济",
    chapterIds: [
      "CIVPRO-EXECUTION-START",
      "CIVPRO-EXECUTION-CONDUCT",
      "CIVPRO-EXECUTION-OUTSIDER",
      "CIVPRO-EXECUTION-MEASURES-SECURITY",
      "CIVPRO-EXECUTION-SETTLEMENT-DISTRIBUTION",
      "CIVPRO-EXECUTION-END-REVERSAL",
    ],
  },
  {
    id: "foreign",
    title: "涉外诉讼与司法协助",
    chapterIds: [
      "CIVPRO-FOREIGN-JURISDICTION",
      "CIVPRO-FOREIGN-SERVICE-PERIODS",
      "CIVPRO-FOREIGN-JUDGMENTS",
      "CIVPRO-FOREIGN-JUDICIAL-ASSISTANCE",
    ],
  },
  {
    id: "arbitration",
    title: "仲裁制度",
    chapterIds: [
      "CIVPRO-ARBITRATION-SCOPE-INSTITUTION",
      "CIVPRO-ARBITRATION-AGREEMENT",
      "CIVPRO-ARBITRATION-TRIBUNAL-PRESERVATION",
      "CIVPRO-ARBITRATION-HEARING-RESOLUTION",
      "CIVPRO-ARBITRATION-JUDICIAL-REVIEW",
      "CIVPRO-ARBITRATION-FOREIGN-SEAT",
      "CIVPRO-GAP-ARBITRATION-NONEXECUTION",
      "CIVPRO-DETAIL-ARBITRATION-COUNTERCLAIM",
      "CIVPRO-DETAIL-AWARD-CORRECTION",
    ],
  },
].map((section) => ({
  ...section,
  topicIds: section.chapterIds.flatMap((id) => chapterFor(id)?.topicIds ?? []),
  questionIds: Object.values(subjectPracticeQueues("civil-procedure"))
    .flat()
    .filter((id) => section.chapterIds.includes(practiceChapter(id).id)),
}));

export function civilProcedureSectionForTopic(topicId: string | undefined) {
  return civilProcedureSections.find((section) =>
    section.topicIds.includes(topicId ?? ""),
  );
}
