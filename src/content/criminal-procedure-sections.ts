import { chapterFor } from "./criminal-curriculum";
import { practiceChapter, subjectPracticeQueues } from "./practice-set";

// Display and chapter-continuation order. Existing question IDs, versions and
// whole-subject saved cursors keep their original queues.
const g1 = (keys: string[]) =>
  keys.map((key) => `CRIMPRO-G1-${key.toUpperCase()}`);
export const criminalProcedureSections = [
  {
    id: "principles",
    title: "基本制度、管辖与回避",
    chapterIds: [
      ...g1(["powers", "no-pursuit"]),
      "CRIMPRO-FOUNDATION-JURISDICTION",
      "CRIMPRO-FOUNDATION-RECUSAL",
      ...g1(["period-service"]),
    ],
  },
  {
    id: "defense",
    title: "辩护与诉讼权利",
    chapterIds: [
      "CRIMPRO-DEFENSE",
      "CRIMPRO-FOUNDATION-AID",
      "CRIMPRO-FOUNDATION-FILES",
    ],
  },
  {
    id: "evidence",
    title: "证据、证明与排除",
    chapterIds: [
      ...g1(["evidence-types"]),
      "CRIMPRO-FOUNDATION-EVIDENCE",
      "CRIMPRO-EVIDENCE-FOUNDATION",
    ],
  },
  {
    id: "measures",
    title: "强制措施",
    chapterIds: [
      "CRIMPRO-FOUNDATION-SUMMONS",
      ...g1(["detention"]),
      "CRIMPRO-BAIL",
      "CRIMPRO-ARREST-REVIEW",
      "CRIMPRO-FOUNDATION-DURATION",
      "CRIMPRO-FOUNDATION-RESIDENCE",
    ],
  },
  {
    id: "investigation",
    title: "立案与侦查",
    chapterIds: g1([
      "filing",
      "interrogation",
      "search",
      "technical",
      "investigation-end",
    ]),
  },
  {
    id: "prosecution",
    title: "审查起诉与认罪认罚",
    chapterIds: g1([
      "prosecution-review",
      "nonprosecution",
      "nonprosecution-remedy",
      "plea",
    ]),
  },
  {
    id: "trial",
    title: "第一审程序",
    chapterIds: g1([
      "open-court",
      "court-witness",
      "trial-decision",
      "private-prosecution",
      "incidental-civil",
      "summary-trial",
      "fast-trial",
    ]),
  },
  {
    id: "remedies",
    title: "二审、复核与再审",
    chapterIds: g1([
      "appeal-right",
      "second-instance",
      "no-increase",
      "death-review",
      "retrial",
    ]),
  },
  {
    id: "special",
    title: "特别程序",
    chapterIds: g1([
      "juvenile",
      "conditional",
      "reconciliation",
      "absence",
      "confiscation",
      "medical",
    ]),
  },
  {
    id: "execution",
    title: "刑罚执行",
    chapterIds: g1([
      "delivery",
      "temporary-outside",
      "commutation",
      "property-execution",
    ]),
  },
].map((section) => ({
  ...section,
  topicIds: section.chapterIds.flatMap((id) => chapterFor(id)?.topicIds ?? []),
  questionIds: Object.values(subjectPracticeQueues("criminal-procedure"))
    .flat()
    .filter((id) => section.chapterIds.includes(practiceChapter(id).id)),
}));

export function criminalProcedureSectionForTopic(topicId: string | undefined) {
  return criminalProcedureSections.find((section) =>
    section.topicIds.includes(topicId ?? ""),
  );
}
