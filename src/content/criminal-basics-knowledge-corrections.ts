import type { ContentSources, FaultTopic } from "./fault-unit";
import { foundationKnowledge } from "./criminal-foundation-topics";
import { generalKnowledge } from "./criminal-general/knowledge";

// Knowledge-only revision. Published questions and previous cards stay intact.
export const basicsKnowledgeRevision =
  "criminal-basics-knowledge-2026-09-30.v1";
export const basicsKnowledgeSources: ContentSources = {
  law: {
    title: "《中华人民共和国刑法》第十七条、第五十四至五十八条",
    url: "https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/bgt/art/2025/art_890f1333b6284c3cbb225c3cd2647c4b.html",
    note: "市场监管总局网站刑法原文；2026-09-30 定向核对责任年龄与剥夺政治权利条款，不作为全法年度版本验收。",
  },
  reductionInterpretation: {
    title: "最高人民法院关于办理减刑、假释案件具体应用法律的规定第十七条",
    url: "https://www.court.gov.cn/fabu/xiangqing/30621.html",
    note: "法释〔2016〕23号，2017-01-01施行；2026-09-30 核对初次改为七至十年、后续减刑最终不少于三年的规定。",
  },
};

export const basicsKnowledgeCorrections: Record<
  string,
  { rule: string; omission: string }
> = {
  "criminal-age": {
    rule: foundationKnowledge["criminal-age"].rule,
    omission:
      "年龄看行为时，不能用被抓获或受审时的年龄补足。已满12不满14周岁，故意杀人、故意伤害须符合两条路径之一：致人死亡；或以特别残忍手段致人重伤造成严重残疾。两条路径都还须情节恶劣、经最高检核准追诉，不能只凭严重结果追责。",
  },
  "rights-deprivation": {
    rule: generalKnowledge["rights-deprivation"].rule,
    omission:
      "死刑、无期应附加剥夺政治权利终身。死缓或无期减为有期，刑法规定改为三至十年；司法解释进一步明确：初次改为七至十年，后续减刑最终不得少于三年。不要把三至十年的总范围直接当作初次改期范围。",
  },
};

export const hasBasicsKnowledgeCorrection = (id: string) =>
  Object.hasOwn(basicsKnowledgeCorrections, id);

export function correctBasicsKnowledge(topic: FaultTopic): FaultTopic {
  if (!hasBasicsKnowledgeCorrection(topic.id)) return topic;
  const { rule, omission } = basicsKnowledgeCorrections[topic.id];
  return {
    ...topic,
    goal: rule,
    paragraphs: [rule, omission],
    pitfall: omission,
    recall: { ...topic.recall, reference: `${rule}\n${omission}` },
    sources:
      topic.id === "rights-deprivation"
        ? ["law", "reductionInterpretation"]
        : ["law"],
  };
}
