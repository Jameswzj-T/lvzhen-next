export const remainingG6SubjectIds = [
  "theory-law",
  "legal-profession",
  "international-law",
  "intellectual-property",
] as const;
export type RemainingG6Subject = (typeof remainingG6SubjectIds)[number];
export function isRemainingG6Subject(
  value: unknown,
): value is RemainingG6Subject {
  return remainingG6SubjectIds.some((id) => id === value);
}
export const remainingG6SubjectInfo = {
  "theory-law": {
    label: "理论法",
    description: "查看法治思想与法理、宪法和法律史要点，按章节连续练习。",
  },
  "legal-profession": {
    label: "司法制度与职业道德",
    description: "从机关职权、陪审制度到职业义务，结合具体情境练习。",
  },
  "international-law": {
    label: "三国法",
    description: "按国际法、国际私法和国际经济法查要点、连续做题。",
  },
  "intellectual-property": {
    label: "知识产权",
    description: "从著作权、商标和专利的基础情境开始练习。",
  },
} as const;
