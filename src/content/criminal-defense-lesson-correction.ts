import { written } from "./criminal-package-one/authoring";
import { cl05Cases } from "./criminal-general/cl05";
import { generalSources } from "./criminal-general/knowledge";

export const defenseLessonRevision = "criminal-defense-lesson-2026-10-18.v1";
export const defenseLessonId = "cl05-limit-context-v2";
const original = cl05Cases.find((c) => c.exercise.id === "cl05-limit-context")!;

// Published independently: old facts, question, rubric and saved replies remain
// intact. The reference is for reading; the model receives the criteria below.
export const defenseLessonCorrection = {
  ...written(
    defenseLessonId,
    "defense-limit",
    original.exercise.title,
    original.exercise.facts,
    "甲是否构成防卫过当？请结合案情，说明重伤结果和反击手段应如何评价。",
    "甲属于正当防卫，不构成防卫过当。重伤属于重大损害，但防卫过当还要求反击明显超过必要限度，不能仅凭伤情认定。\n\n金属杆击中头部是强度较高的反击。甲当时被三人围在货梯角落持续拳脚殴打，视线受阻，双方力量悬殊；他在侵害持续时反击，对方散开后立即停手。结合当时危险与制止侵害的需要，这次反击未明显超过必要限度。题干没有对方已经失去侵害能力后，甲仍继续击打的情节。",
    [
      [
        "本案结论",
        "认定甲属于正当防卫，不构成防卫过当。",
        "结论须对应本案；不要求以特殊防卫为唯一理由。",
      ],
      [
        "重伤与过当的关系",
        "重伤属于重大损害；过当还须明显超过必要限度，重伤不能单独证明过当。",
        "区分损害结果与限度判断；不要求固定术语或单独列句。",
      ],
      [
        "反击手段与现场危险",
        "将使用金属杆击头的反击强度，与多人持续围殴、受困或视线受阻及及时停手等处境比较，说明本案反击未明显超过必要限度。",
        "需要事实与限度结论的联系；不要求列齐全部案情，也不因漏写某个事实词单独扣掉此项。",
      ],
    ],
    { sources: ["law", "defenseGuide"], exam: true },
  ),
  replaces: original.exercise.id,
};

export const defenseLessonSources = {
  ...generalSources,
  defenseGuide: {
    ...generalSources.defenseGuide,
    note: "法发〔2020〕31号。2026-10-18核对第2、6、7、11—13、15、18条：区分重大损害与明显超限，立足防卫当时处境比较反击手段与现场危险；一般防卫未明显超限亦可免责。是否符合特殊防卫不作为本题唯一得分路径。",
  },
};
