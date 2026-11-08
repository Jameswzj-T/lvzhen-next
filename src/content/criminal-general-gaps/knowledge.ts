import type { FaultTopic } from "../fault-unit";
import { generalGapCases } from "./index";

const newCards = [
  {
    id: "accidental-defense",
    title: "偶然防卫与防卫意思",
    rule: "行为人不知道现实侵害，出于加害故意实施行为，却客观制止侵害，是偶然防卫。是否要求防卫意思、如何处理客观防卫效果，存在不同学说；题目须明确采用观点。",
    omission:
      "防卫意思不要说可认可客观效果阻却违法；特定未遂说要求防卫意思，但以客观效果排除既遂不法、保留未遂评价。不能将所有二元论归成同一答案，也不能把真实侵害误称假想防卫。",
    example: "甲只为报复而击倒乙，事后才知乙当时正在勒住丙，丙因此脱险。",
    analysis:
      "先确认甲当时不知侵害及客观制止效果，再按题目指定立场评价。事实不变，学说前提不同可能改变结论。",
    sources: ["law", "accidentalTheory"],
  },
  {
    id: "presumed-consent",
    title: "推定承诺与现实同意",
    rule: "来不及取得权利人现实同意时，可结合其利益、既有偏好与当时情况，讨论能否推定其会同意必要的处置。本节只练可处分财产的有限救护。",
    omission:
      "‘我觉得为他好’不等于承诺。能及时询问、没有紧迫需要时不能省略询问；处置须限于有依据的范围。无法联系也不产生任意处分权，医疗明确拒绝等复杂争议另论。",
    example:
      "物主无法联系，雨水即将毁损其珍藏手稿；邻居根据物主一贯‘先保手稿’的选择，只撬开普通箱扣取出保护。",
    analysis:
      "推定有当时信息支持且手段有限；换成随时可询问的日常改装，就不能只凭提高售价代替物主决定。",
    sources: ["presumedTheory"],
  },
];
const expandedCards = {
  impossibility: {
    rule: "不能犯与可罚未遂，须按题目指定的危险基准判断。具体危险说以行为时一般人可认识的情况和行为人特别知情为资料；抽象危险说以行为人认识的事实为资料，再从一般见地评价危险。",
    omission:
      "个人误信不能直接当成特别知情，事后未发生结果也不能一律否定行为时危险。两种学说的信息基础不能混用，也不要与分则的抽象、具体危险犯分类混同。",
    sources: ["law", "dangerTheory"],
  },
  "joint-status": {
    rule: "没有特定身份的人，也可与有身份者共同犯罪。贪污、职务侵占中，先查共同利用了谁的职务便利；不同身份内部人员分别利用各自便利的特定情形，再依解释按主犯犯罪性质定罪。",
    omission:
      "‘按主犯罪名’不是所有身份共犯的通则。只有外部人策划、内部人提供便利，不等于各自利用职务便利；作用大小也不能只看分赃。熟悉工作环境不当然是管理财物的职务权限；年龄、累犯等个人责任情节不自动传递。",
    sources: ["law", "statusInterpretation"],
  },
  "absorbed-linked": {
    rule: "数个行为存在手段、目的或事后关联，不代表一律择一重。先核对具体条文：制造保险事故同时另成犯罪、组织偷越另行伤害、组织卖淫并有伤害等，有专门并罚规定。",
    omission:
      "并罚仍须满足条文条件和其他犯罪构成，不能凭‘自造事故’就凭空加罪。同一条文中的限制自由加重、另行故意伤害并罚，也要分别适用；普通盗窃后的销赃规则不能推广为所有自洗钱均不另罚。",
    sources: ["law"],
  },
};

export const generalGapKnowledge: Record<
  string,
  { rule: string; omission: string }
> = {
  ...Object.fromEntries(
    newCards.map(({ id, rule, omission }) => [id, { rule, omission }]),
  ),
  ...expandedCards,
};
export const hasGeneralGapKnowledge = (id: string) =>
  Object.hasOwn(generalGapKnowledge, id);

export function expandGeneralKnowledge(topic: FaultTopic): FaultTopic {
  const content = expandedCards[topic.id as keyof typeof expandedCards];
  if (!content) return topic;
  return {
    ...topic,
    goal: content.rule,
    paragraphs: [content.rule, content.omission],
    pitfall: content.omission,
    recall: {
      ...topic.recall,
      reference: `${content.rule}\n${content.omission}`,
    },
    sources: [...new Set([...topic.sources, ...content.sources])],
  };
}
export const generalGapTopics: FaultTopic[] = newCards.map((c) => ({
  id: c.id,
  title: c.title,
  headline: c.title,
  goal: c.rule,
  prerequisite: "可直接查看要点或进入练习。",
  minutes: "3–5",
  paragraphs: [c.rule, c.omission],
  pitfall: c.omission,
  example: { title: "一个区别", facts: c.example, analysis: c.analysis },
  recall: { prompt: "这一知识的适用条件是什么？", reference: c.rule },
  sources: c.sources,
  exercises: generalGapCases
    .filter((item) => item.topicId === c.id)
    .map((item) => item.exercise),
}));
