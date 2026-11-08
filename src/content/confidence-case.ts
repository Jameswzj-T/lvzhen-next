import { topicFor, type UnitExercise } from "./fault-unit";

export const confidenceCaseRevision = "confidence-case-2026-09-13.v1";
export const confidenceCaseChoice = topicFor("confidence")!.exercises[0];

/** Same published case, new writing exercise; existing originals keep their IDs. */
export const confidenceCaseSubjective: UnitExercise = {
  id: "confidence-skill-reason",
  optional: true,
  kind: "subjective",
  title: "坡道滑车：说说理由",
  facts: confidenceCaseChoice.facts,
  prompt: "只分析甲对他人受伤的心理。你认为属于哪一种？结合案情说说理由。",
  hint: confidenceCaseChoice.hint,
  reference:
    "甲对他人受伤是过于自信的过失。他已经预见滑车可能撞伤他人，却高估自己的制动能力，轻信可以及时停住，并不接受撞伤结果。区别于间接故意的关键是轻信避免，而非接受结果；不能仅因预见风险后仍继续搬运就认定放任。这里仅判断主观罪过，是否构成犯罪还要审查法律规定及其他条件。",
  criteria: [
    {
      id: "foresight",
      label: "说明已经预见",
      meaning: "甲已预见滑车可能撞伤坡下的人。",
      acceptable: "指出甲事先意识到撞伤风险。",
      boundary: "不能说成因疏忽而完全没有预见。",
    },
    {
      id: "avoidance",
      label: "结合事实说明轻信避免",
      meaning: "他高估制动能力，轻信能及时停住，并不接受撞伤结果。",
      acceptable: "把对制动能力的高估与相信能避免受伤联系起来。",
      boundary: "有防护措施或继续行动，都不能单独代替对结果态度的判断。",
    },
    {
      id: "conclusion",
      label: "给出主观罪过结论",
      meaning: "过于自信的过失；与接受结果发生的间接故意区分。",
      acceptable: "结论与已经预见、轻信避免的理由一致。",
      boundary: "不把轻信避免等同于放任，也不据此直接确定具体罪名。",
    },
  ],
  sources: ["law"],
};

export const confidenceCaseExercises = [
  confidenceCaseChoice,
  confidenceCaseSubjective,
];
