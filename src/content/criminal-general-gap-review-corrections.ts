import type { UnitExercise } from "./fault-unit";
import { generalGapCases } from "./criminal-general-gaps";

// Clarify a reference/rubric mismatch without rewriting the published question.
export const generalGapReviewRevision =
  "criminal-general-gap-review-2026-09-30.v1";
const original = generalGapCases.find(
  (item) => item.exercise.id === "gap-consent-protect-or-improve",
)!.exercise;
const id = `${original.id}-v2`;
export const generalGapReviewCorrections: {
  topicId: string;
  replaces: string;
  exercise: UnitExercise;
}[] = [
  {
    topicId: "presumed-consent",
    replaces: original.id,
    exercise: {
      ...original,
      id,
      caseId: id,
      reference:
        "案一无法及时取得现实同意，母带即将被水淹没；乙珍视唯一母带而认为普通盒子可以更换的既有偏好，支持推定其同意必要的保全处置。甲仅剪开固定盒取出并保存母带，处置限于保护母带所必需的范围，并不取得任意处置工作室其他物品的权限，可以按推定承诺分析阻却违法。案二没有紧急情况而可以询问，丙只凭自己的审美和售价判断，不足以替代丁的选择。不能把无签字一律视为犯罪，也不能把好心一律视为授权。",
      criteria: original.criteria!.map((criterion, i) => ({
        ...criterion,
        id: `${id}-p${i + 1}`,
        ...(i === 1
          ? {
              meaning:
                "说明处置限于保全母带所必需的范围；本案仅剪开固定盒取出并保存母带。",
              boundary:
                "不产生任意处置工作室物品的权限。接受同义的必要保全范围表述，不要求逐字写出‘剪开固定盒’。",
            }
          : {}),
      })),
    },
  },
];
