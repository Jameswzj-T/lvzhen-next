import { longCases } from "./criminal-capstone/long-cases";

// Versioned replacement; original exercises, responses and scores retain
// their original IDs. This registers content, not new model quality approval.
export const procurementContentCorrectionRevision =
  "criminal-procurement-content-2026-10-03.v1";
export const procurementContentReplaces = "cap-procurement";
export const procurementContentCaseId = "cap-procurement-v2";
export const procurementContentOriginalQ3Prompt =
  "甲捐出5万元，是否影响前一笔款项的数额认定？能否据此认定甲及时拒收？";
export const procurementContentQ3Prompt = `${procurementContentOriginalQ3Prompt}丙是否构成共同受贿？结合题设说明。`;

const original = longCases.find(
  (item) => item.id === procurementContentReplaces,
);
if (
  !original ||
  original.cases.length !== 5 ||
  original.cases[2].exercise.id !== "cap-procurement-q3" ||
  original.cases[2].exercise.prompt !== procurementContentOriginalQ3Prompt
)
  throw new Error("procurement-content-source-mismatch");

// The existing third-question reference and card already discuss the spouse.
// This revision makes that scope explicit without changing facts or legal rules.
export const revisedProcurementContentCase = {
  id: procurementContentCaseId,
  title: original.title,
  facts: original.facts,
  cases: original.cases.map((old, index) => {
    const exercise = old.exercise;
    if (exercise.kind !== "subjective")
      throw new Error("procurement-content-kind-mismatch");
    const id = `${procurementContentCaseId}-q${index + 1}`;
    return {
      ...old,
      replaces: exercise.id,
      exercise: {
        ...exercise,
        id,
        caseId: procurementContentCaseId,
        title: `${original.title} · 第${index + 1}问（范围修订版）`,
        prompt: index === 2 ? procurementContentQ3Prompt : exercise.prompt,
        sources: [...exercise.sources],
        criteria: exercise.criteria?.map((point, pointIndex) => ({
          ...point,
          id: `${id}-p${pointIndex + 1}`,
        })),
        ...(exercise.relatedTopicIds
          ? { relatedTopicIds: [...exercise.relatedTopicIds] }
          : {}),
      },
    };
  }),
};

export const procurementContentCorrections =
  revisedProcurementContentCase.cases;

export function procurementContentNote(id: string) {
  if (!["cap-procurement-q3", "cap-procurement-v2-q3"].includes(id))
    return null;
  return {
    previousVersion: id === "cap-procurement-q3",
    scope:
      id === "cap-procurement-q3"
        ? "旧版第3问只询问甲的捐赠、数额及及时拒收，配偶责任未明确列入设问。新版已补明对丙的判断；旧题、原答和已有分数保留，不追溯重新计分。"
        : "本问要求分析捐赠与数额、能否认定及时拒收，以及丙是否构成共同受贿的事实依据；不另要求其他罪名或具体刑罚。",
    supplement:
      "共同责任仍须依据共同故意及参与事实，不能仅由配偶身份或事后知道来源直接推定。",
  };
}
