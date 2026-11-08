import { chapterFor } from "./criminal-curriculum";
import { administrativeChapter } from "./administrative-registration";
import { practiceChapter, subjectPracticeQueues } from "./practice-set";

const group = (keys: string[]) =>
  keys.map((key) => `ADMIN-G4-${key.toUpperCase()}`);
// Display order only. Keep the original administrative chapter, IDs, revisions
// and saved subject queues intact; new chapters append to those old queues.
export const administrativeSections = [
  {
    id: "foundations",
    title: "行政主体与基本原则",
    chapterIds: group([
      "subject",
      "authority",
      "proportionality",
      "external-effect",
    ]),
  },
  {
    id: "license",
    title: "行政许可",
    chapterIds: group([
      "license-equality",
      "license-material",
      "license-hearing",
      "license-time-fee",
      "license-exit",
    ]),
  },
  {
    id: "penalty",
    title: "行政处罚",
    chapterIds: [
      administrativeChapter.id,
      ...group([
        "penalty-power",
        "penalty-limitation",
        "penalty-mitigation",
        "penalty-evidence",
      ]),
    ],
  },
  {
    id: "force-info",
    title: "行政强制与信息公开",
    chapterIds: group([
      "force-subject",
      "seizure",
      "execution",
      "open-duty",
      "open-boundary",
      "substitute-court",
    ]),
  },
  {
    id: "review",
    title: "行政复议",
    chapterIds: group([
      "review-prior",
      "review-jurisdiction",
      "review-time-rules",
      "review-hearing",
      "review-decision",
    ]),
  },
  {
    id: "suit-entry",
    title: "行政诉讼：受理与起诉",
    chapterIds: group([
      "suit-scope",
      "suit-defendant",
      "suit-court",
      "suit-time",
      "suit-stay",
    ]),
  },
  {
    id: "suit-decision",
    title: "行政诉讼：证据与裁判",
    chapterIds: group([
      "suit-evidence",
      "suit-norm",
      "suit-judgment",
      "suit-appeal",
    ]),
  },
  {
    id: "compensation",
    title: "行政赔偿与行政协议",
    chapterIds: group([
      "compensation-body",
      "compensation-procedure",
      "agreement",
    ]),
  },
].map((section) => ({
  ...section,
  topicIds: section.chapterIds.flatMap((id) => chapterFor(id)?.topicIds ?? []),
  questionIds: Object.values(subjectPracticeQueues("administrative-law"))
    .flat()
    .filter((id) => section.chapterIds.includes(practiceChapter(id).id)),
}));
