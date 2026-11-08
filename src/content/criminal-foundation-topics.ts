import type { ContentSources, FaultTopic } from "./fault-unit";
import { foundationCases } from "./criminal-foundation-samples";

export const foundationSources: ContentSources = {
  law: {
    title: "《刑法》第六至十八条、第三十至三十一条及本题涉及的分则条文",
    url: "https://fgk.chinatax.gov.cn/zcfgk/c100009/c5212248/content.html",
    note: "国家税务总局法规库，收录至修正案（十二）；2026-09-14 核对。本包分则涉及第二百二十四、二百三十一、二百三十四、二百七十五条。具体来源和适用范围见样题审阅稿。",
  },
  amendment8: {
    title: "《刑法修正案（八）》第二十二、第五十项",
    url: "https://www.npc.gov.cn/cwhhdbdh/c6626/c14002/c14003/201905/t20190523_390477.html",
    note: "全国人大，2011-02-25 公布，2011-05-01 施行。历史题据该施行日期，不用现行醉驾标准倒评旧行为；此前已取得官方检索正文，直开失败。",
  },
  omission: {
    title: "不作为犯罪：作为义务应否扩展",
    url: "https://www.spp.gov.cn/spp/llyj/201909/t20190923_432611.shtml",
    note: "最高检网站刊载的理论文章，2019-09-23；实际接管保护、义务与能力的解释参考，不是司法解释。另核法院网站作为义务研究，记录在样题稿。",
  },
  causation: {
    title: "三方面判断介入因素是否中断因果关系",
    url: "https://www.spp.gov.cn/spp/llyj/201812/t20181210_443762.shtml",
    note: "最高检网站刊载的理论文章，2018-12-10；用于因果与归责分析，不能概括成第三人介入即中断。",
  },
  unit: {
    title: "最高人民法院关于审理单位犯罪案件具体应用法律有关问题的解释",
    url: "https://gongbao.court.gov.cn/Details/834f87cd2d19138f75c93c17b76a27.html",
    note: "法释〔1999〕14号，第二、三条；第二条是为犯罪设立或主要从事犯罪的情形，第三条是盗用名义并私分所得，不能混用。已核官方检索正文，直开失败。",
  },
  negligence: {
    title: "这起交通事故，是过失犯罪还是意外事件？",
    url: "https://www.spp.gov.cn/spp/zhuanlan/202408/t20240803_662389.shtml",
    note: "最高检网站，2024-08-03；只参考对具体预见能力的审查方法，没有移用原案结论或改写原案作为本题。",
  },
  mistake: {
    title: "中国政法大学法考学院：事实认识错误（一）",
    url: "https://wlkt.cuploeru.com/article/1497",
    note: "2026-04-15 教学讲解；核对对象错误的分类，不是司法解释或官方采分标准。",
  },
};

export const foundationKnowledge: Record<
  string,
  { rule: string; omission: string }
> = {
  "criminal-territory": {
    rule: "犯罪行为或结果有一项发生在我国领域内，原则上适用属地管辖；我国船舶、航空器内也适用我国刑法。发生在境外时，再分别核对属人、保护或条约管辖的条件。",
    omission:
      "不能只看行为人所在地点。属人管辖看犯罪人的中国国籍，不是被害人的国籍；司法豁免等特别规定仍须另查。",
  },
  "criminal-time": {
    rule: "刑法原则上从旧兼从轻：行为时不构成犯罪，不能以后新增的犯罪规定追究；行为时构成犯罪的，依法应追诉时原则上用旧法，新法不认为是犯罪或处刑较轻则用新法。",
    omission:
      "公布不等于施行，处理时间也不能代替行为时间。已生效判决继续有效；跨越修法时点的持续行为须另行分析。",
  },
  "omission-duty": {
    rule: "以不作为追究犯罪，须有特定作为义务，并且当时能够履行。保护关系可以来自法律规定、实际接受的照看职责等；具有义务，不等于已经满足某罪的全部条件。",
    omission:
      "不会某一种救助方法，不等于任何方法都做不到。义务、能力、结果避免可能性和罪过要分别审查，不能把普通路人的道德要求直接当成刑法义务。",
  },
  "causal-intervention": {
    rule: "行为是结果发生的一个条件，不一定足以把结果归责于该行为。出现第三人行为等介入因素时，要看原行为的危险如何发展、介入因素的性质，以及实际导致结果的原因。",
    omission:
      "不能只说‘没有前行为就没有结果’，也不能说‘第三人介入就一定中断’。否定对后来死亡的归责，不会自动免除原伤害的责任。",
  },
  "criminal-age": {
    rule: "责任年龄以行为时为准。已满16周岁原则上对犯罪负责；已满14不满16周岁只对法定范围内的行为负责，包括故意伤害致重伤或死亡。依法追责的不满18周岁者，应当从轻或减轻处罚。",
    omission:
      "抓获或审判时满16岁，不能补足行为时年龄。已满12不满14周岁另有严格例外，须同时核对行为、结果、手段、恶劣情节及最高检核准追诉条件，不能只凭严重结果追责。",
  },
  "unit-crime": {
    rule: "单位犯罪须有法律规定，并能将行为归于单位。盗用单位名义实施犯罪、所得由个人私分的，按自然人犯罪处理；公司为犯罪而设立或以犯罪为主要活动，是另一类排除情形。",
    omission:
      "真实公章、公司合同和账户过账都不能单独证明单位犯罪。要结合实际决策、业务经过和利益归属；同样排除单位犯罪，理由仍要与案情对应。",
  },
  "fact-mistake": {
    rule: "事实认识错误可能影响犯罪故意，关键在于行为人误认了什么事实，以及这是否改变了该罪要求的认识。有意识地做出动作，不等于具有这个犯罪的故意。",
    omission:
      "把他人的东西误当成自己的，与把甲的东西误当成乙的，不是同一种错误。排除故意后仍须审查过失；过失处罚必须有法律规定，损失大不能代替这一要求。",
  },
};

const definitions = [
  {
    id: "criminal-territory",
    title: "刑法的空间效力",
    sources: ["law"],
    example: {
      title: "境内的一环",
      facts: "人在境外发送诈骗信息，被害人在境内受骗并转款。",
      analysis:
        "境内受骗、财产处分也是犯罪过程的一部分，不能只凭发送信息的人在境外就排除属地管辖。",
    },
  },
  {
    id: "criminal-time",
    title: "刑法的时间效力",
    sources: ["law", "amendment8"],
    example: {
      title: "行为与修法",
      facts: "某行为结束后，新法才将这种行为规定为犯罪。",
      analysis:
        "案件在新法施行后被发现，也不能用新增的犯罪规定倒追旧行为；是否有其他旧法责任须另查。",
    },
  },
  {
    id: "omission-duty",
    title: "不作为的义务与履行可能性",
    sources: ["omission"],
    example: {
      title: "实际接管照看",
      facts:
        "家长将幼儿交由受托人照看，受托人已经接管；发生危险时，可立即按下身旁的停机开关。",
      analysis:
        "接受并实际承担保护职责与现场能够停机，是义务和能力的不同依据；是否成立具体犯罪还不能到此为止。",
    },
  },
  {
    id: "causal-intervention",
    title: "因果关系与介入因素",
    sources: ["law", "causation"],
    example: {
      title: "后来发生的危险",
      facts:
        "前一个行为使被害人处在某个地点，后来另一人从独立原因实施新的侵害。",
      analysis:
        "不能只因前行为改变了被害人的位置，就让前行为人承担所有后果；须结合两种危险与实际结果的联系判断。",
    },
  },
  {
    id: "criminal-age",
    title: "刑事责任年龄",
    sources: ["law"],
    example: {
      title: "同一人，不同时点",
      facts: "同一人在未满16周岁和年满16周岁以后，分别实施两次独立行为。",
      analysis:
        "应分别对应每次行为时的年龄、行为和结果审查，不能统一按最后一次行为或抓获时的年龄处理。",
    },
  },
  {
    id: "unit-crime",
    title: "单位犯罪与自然人犯罪",
    sources: ["law", "unit"],
    example: {
      title: "名义与实质",
      facts: "员工背着公司，借公司业务外观骗取款项并全部私分。",
      analysis:
        "名义属于公司不等于犯罪属于公司；盗用名义与个人分配所得，支持按自然人犯罪处理。",
    },
  },
  {
    id: "fact-mistake",
    title: "事实认识错误与犯罪故意",
    sources: ["law"],
    example: {
      title: "取回与取走",
      facts:
        "一人凭自己的取物凭证领取了工作人员误交的同款物品；另一人一直打算拿他人的物品，只认错了物主。",
      analysis:
        "前者可能缺少盗取他人财物的认识；后者认错具体物主，通常没有改变这一认识。仍须根据具体证据判断。",
    },
  },
];

export const foundationTopics: FaultTopic[] = definitions.map((definition) => {
  const content = foundationKnowledge[definition.id];
  return {
    ...definition,
    headline: definition.title,
    goal: content.rule,
    prerequisite: "可直接查看知识要点或进入练习。",
    minutes: "3–5",
    paragraphs: [content.rule, content.omission],
    pitfall: content.omission,
    recall: {
      prompt: "本知识点的适用条件和边界是什么？",
      reference: content.rule,
    },
    exercises: foundationCases
      .filter((c) => c.topicId === definition.id)
      .map((c) => c.exercise),
  };
});
