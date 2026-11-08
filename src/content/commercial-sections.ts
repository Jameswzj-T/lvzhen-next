import { chapterFor } from "./criminal-curriculum";
import { practiceChapter, subjectPracticeQueues } from "./practice-set";
import { ecologyG8Chapters } from "./ecology-g8";

// Display groups only; existing question versions and saved queues are preserved.
export const commercialSections = [
  {
    id: "company",
    title: "公司",
    chapterIds: [
      "COMMERCIAL-COMPANY-FOUNDATION",
      "COMMERCIAL-G5-REPRESENTATIVE",
      "COMMERCIAL-G5-RESOLUTION",
      "COMMERCIAL-G5-DIRECTOR",
      "COMMERCIAL-G5-DERIVATIVE",
      "COMMERCIAL-G5-PROFIT",
      "COMMERCIAL-G5-LIQUIDATION",
    ],
  },
  {
    id: "partnership",
    title: "合伙与个人独资",
    chapterIds: [
      "COMMERCIAL-G5-PARTNER-LIABILITY",
      "COMMERCIAL-G5-PARTNER-MANAGEMENT",
      "COMMERCIAL-G5-SOLE-LIABILITY",
    ],
  },
  {
    id: "bankruptcy",
    title: "企业破产",
    chapterIds: [
      "COMMERCIAL-G5-BANKRUPTCY-ENTRY",
      "COMMERCIAL-G5-BANKRUPTCY-ESTATE",
      "COMMERCIAL-G5-BANKRUPTCY-CLAIMS",
      "COMMERCIAL-G5-REORGANIZATION",
    ],
  },
  {
    id: "bills",
    title: "票据",
    chapterIds: [
      "COMMERCIAL-G5-BILL-RECORD",
      "COMMERCIAL-G5-BILL-ENDORSEMENT",
      "COMMERCIAL-G5-BILL-DEFENSE",
    ],
  },
  {
    id: "insurance",
    title: "保险",
    chapterIds: [
      "COMMERCIAL-G5-INSURANCE-DISCLOSURE",
      "COMMERCIAL-G5-INSURANCE-EXCLUSION",
      "COMMERCIAL-G5-INSURANCE-SUBROGATION",
    ],
  },
  {
    id: "securities",
    title: "证券",
    chapterIds: [
      "COMMERCIAL-G5-SECURITIES-ISSUE",
      "COMMERCIAL-G5-SECURITIES-TRADING",
      "COMMERCIAL-G5-SECURITIES-DISCLOSURE",
    ],
  },
  {
    id: "competition",
    title: "竞争法",
    chapterIds: [
      "COMMERCIAL-G5-MONOPOLY-AGREEMENT",
      "COMMERCIAL-G5-DOMINANCE",
      "COMMERCIAL-G5-CONCENTRATION",
      "COMMERCIAL-G5-UNFAIR",
    ],
  },
  {
    id: "consumer",
    title: "消费者与产品责任",
    chapterIds: [
      "COMMERCIAL-G5-ONLINE-RETURN",
      "COMMERCIAL-G5-CONSUMER-FRAUD",
      "COMMERCIAL-G5-PRODUCT-DEFECT",
    ],
  },
  {
    id: "labor",
    title: "劳动与社会保障",
    chapterIds: [
      "COMMERCIAL-G5-EMPLOYMENT-CONTRACT",
      "COMMERCIAL-G5-EMPLOYMENT-TERMINATION",
      "COMMERCIAL-G5-LABOR-ARBITRATION",
      "COMMERCIAL-G5-SOCIAL-INSURANCE",
    ],
  },
  {
    id: "tax",
    title: "税收征管与增值税",
    chapterIds: [
      "COMMERCIAL-G5-VAT",
      "COMMERCIAL-G5-TAX-REMEDY",
      "COMMERCIAL-G5-TAX-ENFORCEMENT",
    ],
  },
  {
    id: "land",
    title: "土地与房地产",
    chapterIds: ["COMMERCIAL-G5-LAND-USE", "COMMERCIAL-G5-REALTY-TRANSFER"],
  },
  {
    id: "environment",
    title: "生态环境保护",
    chapterIds: [
      "COMMERCIAL-G5-ENVIRONMENT-ASSESSMENT",
      "COMMERCIAL-G5-POLLUTION-PERMIT",
      ...ecologyG8Chapters.map((chapter) => chapter.id),
    ],
  },
].map((section) => ({
  ...section,
  topicIds: section.chapterIds.flatMap((id) => chapterFor(id)?.topicIds ?? []),
  questionIds: Object.values(subjectPracticeQueues("commercial-law"))
    .flat()
    .filter((id) => section.chapterIds.includes(practiceChapter(id).id)),
}));
