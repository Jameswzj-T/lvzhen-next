import { chapterAnswerReferences } from "./student-answer-reference-chapters";
import { generalAnswerReferences } from "./student-answer-reference-general";
import { personPropertyAnswerReferences } from "./student-answer-reference-person-property";
import { finalChapterAnswerReferences } from "./student-answer-reference-final-chapters";
import { openingChapterAnswerReferences } from "./student-answer-reference-opening";
import { openingObjectiveAnswerReferences } from "./student-answer-reference-opening-objective";
import { generalObjectiveAnswerReferences } from "./student-answer-reference-general-objective";
import { personPropertyObjectiveAnswerReferences } from "./student-answer-reference-person-property-objective";
import { finalObjectiveAnswerReferences } from "./student-answer-reference-final-objective";
import { civilAnswerReferences } from "./student-answer-reference-civil";

/** Editorial reading copy. The published reference, grading requirements and
 * saved model replies stay unchanged. Match the exact source text as well as
 * the publication so a later legal/content revision never inherits this copy. */
const editedReferences = [
  {
    questionId: "cl05-review-two-losses",
    questionRevision: "criminal-general-2026-09-15.v1",
    version: "student-answer-reference-20261019.v1",
    originalReference:
      "题设未给出有人驱使犬攻击，宜按自然危险审查避险。打犬用于排除扑咬危险，破门用于就近躲避，两项损害均需各自证明必要性和利益衡量。不能因为幼儿最终未受伤，就倒推危险原先不存在；也不能用救人目的覆盖任何扩大损害。",
    paragraphs: [
      "甲用长杆挡狗，再砸门让孩子躲进去，属于紧急避险，不负刑事责任。",
      "狗仍在扑咬，孩子随时可能受伤。门锁着，附近又没有其他地方能及时躲避，砸门是救孩子所必需的。保护孩子的人身安全，比保全这扇玻璃门更重要。孩子最终没有受伤，说明救助起了作用。",
    ],
  },
  ...chapterAnswerReferences,
  ...generalAnswerReferences,
  ...personPropertyAnswerReferences,
  ...finalChapterAnswerReferences,
  ...openingChapterAnswerReferences,
  ...openingObjectiveAnswerReferences,
  ...generalObjectiveAnswerReferences,
  ...personPropertyObjectiveAnswerReferences,
  ...finalObjectiveAnswerReferences,
  ...civilAnswerReferences,
] as const;

export function studentAnswerReference(input: {
  questionId?: string;
  questionRevision?: string;
  originalReference?: string;
  contentId?: string;
}) {
  return (
    editedReferences.find(
      (copy) =>
        input.questionId === copy.questionId &&
        input.questionRevision === copy.questionRevision &&
        input.originalReference === copy.originalReference &&
        (!input.contentId ||
          !("contentId" in copy) ||
          input.contentId === copy.contentId),
    ) ?? null
  );
}
