import { digest } from "../model-config";
import type { TableResult } from "./contract";

// Unconnected candidate. A trusted receipt reader must supply the verified
// receipt/card binding; a learner's words or a similar result are insufficient.
export const timelineExplanationReviewBinding = {
  resultId: "a95e9d20652fc1f464e37bb812b761e079b7276bebe6a1b6498532e7b25ba953",
  responseId: "1467d32c-79b3-49ab-a1e1-e5322cb20c2d",
  receiptSha256:
    "00a801b7ab4f82925043f60c19aaac8a80694d5a7416d98a3a3b6dffc2e52603",
  cardHash: "502448a9ea28dada06aa44bfe0d6006141075cd830d6d44316a33af8dad267ac",
  resultHash:
    "65868cd3f2bec8ee18ea1801f4d6a306abe097acf17d8ec4b720bac65ecea013",
} as const;

export type ReviewedExplanationCandidate = {
  version: "timeline-mixed-2-3-human-review-v1";
  resultId: string;
  questionId: "2";
  criterionId: "2-3";
  originalAnswer: string;
  originalExplanation: string;
  originalLabel: "否";
  originalEarned: 0;
  originalTotal: 8;
  humanExplanation: string;
  sourceUrl: string;
};

export function timelineReviewedExplanationCandidate(
  result: TableResult,
  verifiedReceipt: {
    responseId: string;
    receiptSha256: string;
    cardHash: string;
  },
): ReviewedExplanationCandidate | null {
  const bound = timelineExplanationReviewBinding;
  if (
    result.id !== bound.resultId ||
    verifiedReceipt.responseId !== bound.responseId ||
    verifiedReceipt.receiptSha256 !== bound.receiptSha256 ||
    verifiedReceipt.cardHash !== bound.cardHash ||
    digest(result) !== bound.resultHash
  )
    return null;
  const row = result.assessment?.items.find((r) => r.id === "2-3");
  const original = result.answers.find((a) => a.id === "2");
  if (!row || !original || row.label !== "否" || row.earned !== 0) return null;
  return {
    version: "timeline-mixed-2-3-human-review-v1",
    resultId: result.id,
    questionId: "2",
    criterionId: "2-3",
    originalAnswer: original.text,
    originalExplanation: row.explanation,
    originalLabel: "否",
    originalEarned: 0,
    originalTotal: 8,
    humanExplanation:
      "漏罪应先将原判5年与漏罪3年并罚：最高单刑为5年，总和为8年，决定执行刑期的范围为5年以上8年以下。已执行2年随后计算在该刑期内。原答把先扣后的3年参与并罚，写成3至6年，本项的上下限均不正确。3至6年可表示扣除已执行2年后的剩余刑期范围，不能代替本问先决定的5至8年。",
    sourceUrl:
      "https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/bgt/art/2025/art_890f1333b6284c3cbb225c3cd2647c4b.html",
  };
}
