import { comparisonCases, legalSource } from "./criminal";

// An authored exercise and its teaching criteria are versioned together.
// These criteria are a learning reference, not an official exam marking scheme.
export const subjectiveCase = {
  id: "fault-attitude-short-answer",
  revision: "fault-attitude-short-answer-2026-09-07.v1",
  title: "没有伤人的目的，为什么仍可能是故意？",
  facts: comparisonCases[0].facts,
  question:
    "仅就甲对乙受伤结果的心理态度作出判断，并结合案情说明理由。无需判断具体罪名。",
  hint: "可以依次说清：甲知道什么、接受什么，再把这些事实与判断连起来。",
  reference:
    "甲对乙受伤结果的心理态度体现间接故意。甲知道物品可能落下伤人，已经认识到伤害风险；题设又明确甲虽然没有伤人目的，却接受路人受伤，体现放任。没有积极追求伤害，并不能排除故意。",
  source: legalSource,
  criteria: [
    {
      id: "awareness",
      title: "找出对风险的认识",
      meaning: "结合甲搬运物品的事实，说明他知道物品可能落下伤人。",
      equivalent: "例如：他早知道这样搬，东西可能掉下去砸到人。",
      boundary: "“应当知道”与“已经知道”不同；只有条文复述，还没有联系案情。",
    },
    {
      id: "attitude",
      title: "区分不希望与放任",
      meaning:
        "说明甲虽然不追求伤害，但接受结果发生，不能由没有伤人目的直接推出过失。",
      equivalent: "例如：他不是想砸人，但觉得砸到也认了。",
      boundary: "接受伤害结果，与相信自己能避免伤害，含义不同。",
    },
    {
      id: "conclusion",
      title: "把规则与结论连起来",
      meaning: "以已经认识风险、仍放任结果为理由，得出间接故意的判断。",
      equivalent: "例如：这是容忍伤害发生的故意，不是轻信能够避免的过失。",
      boundary:
        "只写“间接故意”还缺论证；术语没写出但含义明确时，应识别含义，再帮助规范表达。",
    },
  ],
  colloquialExample:
    "甲知道东西可能掉下去砸到人。他不是想砸人，但觉得砸到也认了。这是容忍伤害发生的故意，不是以为自己能防住的过失。",
  practiceNote:
    "这道题沿用比较案例中的案情，用于练习组织理由。看过相关分析后作答，不作为独立处理新案情的证据。",
} as const;
