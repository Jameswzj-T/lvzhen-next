import type { ContentSources, Criterion, UnitExercise } from "./fault-unit";

// Unregistered content candidate. Published stems, answers and scores stay intact.
export const unitCrimeQ2ContentRevision =
  "criminal-unit-q2-content-2026-10-03.v1";
export const unitCrimeQ2QuestionId = "cap-contract-v2-q2-content-v1";
export const unitCrimeQ2Replaces = "cap-contract-v2-q2";

export const unitCrimeQ2SourceReview = {
  checkedAt: "2026-10-03",
  status: "unpublished-candidate",
  criminalCode: "official-text-read",
  unitInterpretationOriginal: "official-indexed-article-2-only",
  continuedOfficialCitation: "2025-07-03-question-2-read",
  latestInterpretationEffect: "not-established",
} as const;

export const unitCrimeQ2Sources: ContentSources = {
  q2CriminalCode: {
    title: "《中华人民共和国刑法》第三十、三十一、二百二十四、二百三十一条",
    url: "https://fgk.chinatax.gov.cn/zcfgk/c100009/c5212248/content.html",
    note: "2026-10-03直接读取国家税务总局全文有效、收录至修正案（十二）的正文；仅定向核对本问条款，不作为全法年度验收。第三十条要求法律规定单位犯罪，第二百三十一条覆盖第二百二十四条，并规定单位与两类直接责任人员的责任。",
  },
  q2UnitInterpretation1999: {
    title: "最高法《关于审理单位犯罪案件具体应用法律有关问题的解释》第二、三条",
    url: "https://gongbao.court.gov.cn/Details/834f87cd2d19138f75c93c17b76a27.html",
    note: "法释〔1999〕14号，1999-07-03施行。2026-10-03取得最高法公报第二条官方检索正文；原页直开超时，第三条本次未重新取得完整官方正文。旧材料所列盗用单位名义并个人私分规则只沿用原来源边界；未证明截至本次日期无废改，不标记为现行效力已验。",
  },
  q2ContinuedCitation2025: {
    title: "法答网精选答问（第二十四批）问题2",
    url: "https://www.court.gov.cn/zixun/xiangqing/469691.html",
    note: "最高法网站，2025-07-03。2026-10-03直接读取问题2：仍要求依单位犯罪解释及具体事实区分单位和个人主体。属串通投标专题的官方答疑，供一般主体区分的有界参照；不是新司法解释或合同诈骗裁判，不证明2026年最新效力，也不提供本题缺失事实。",
  },
};

export const unitCrimeQ2Prompt =
  "收取100万元预付款是否成立单位犯罪？应追究单位及哪些类别人员的责任？结合题设说明。";

// Keep the four original requirements and their total of four training points.
// The absent fact is a content boundary, not an additional must-answer item.
export const unitCrimeQ2Requirements = [
  {
    id: "2-1",
    label: "单位犯罪",
    meaning: "正确判断是否成立单位犯罪，不以企业组织形式代替构成判断。",
    weight: 1,
    boundary:
      "结论须与适用前提一致。题设没有明确设立后是否以实施犯罪为主要活动，保留有依据的条件结论；未主动指出未知事实，不单独列为漏项。",
  },
  {
    id: "2-2",
    label: "单位意志",
    meaning: "依据决策、实施方式判断行为体现单位意志还是个人行为。",
    weight: 1,
    boundary:
      "用实际负责人、销售和财务负责人的商定、知情同意及共同实施说明。仅有公司账户、公章或职位，不能替代对决策的分析。",
  },
  {
    id: "2-3",
    label: "利益归属",
    meaning:
      "依据款项用途、公司成立和经营情况判断利益归属及单位犯罪的排除条件。",
    weight: 1,
    boundary:
      "公司用款与组织排除条件分别说明，但仍同属原1分。此前合法经营不能直接证明设立后未以犯罪为主要活动，不要求背写所有例外或固定术语。",
  },
  {
    id: "2-4",
    label: "责任主体",
    meaning:
      "说明应追究单位及哪些类别人员的责任；不要求本问逐一分析四人或给出具体刑罚。",
    weight: 1,
    boundary:
      "在单位犯罪成立的前提下，说明单位、直接负责的主管人员和其他直接责任人员。不能由单位责任推出全体员工有罪；不额外考具体刑罚或逐人排序。",
  },
] as const;

export const unitCrimeQ2ReferencePoints = [
  "刑法第二百三十一条涵盖第二百二十四条，法律允许单位构成合同诈骗。若公司不存在设立后以实施犯罪为主要活动的排除情形，题设的决策和利益归属支持按单位合同诈骗评价；如该排除情形被查实，则依所核第二条规则不以单位犯罪论处。题设不足以确定这一事实，不能把条件判断改成事实已证实。",
  "实际负责人甲与销售主管乙商定方案，财务负责人丙获知停产及虚假供货安排后同意，三人据此共同实施公司交易方案。这些事实支持将行为归于单位；分析依据是实际决策和实施，而非只看职位、合同或账户。",
  "100万元全部归公司使用，且事先安排用于公司旧债，支持本笔利益归于公司；公司并非为犯罪设立，题设也不是盗用名义后私分本笔所得。此前长期合法经营与后来是否以实施犯罪为主要活动是两个问题，后者材料不足，须保留条件，不由前者直接排除。",
  "若成立单位合同诈骗，应依法追究单位，以及直接负责的主管人员和其他直接责任人员的责任。不能只追究甲或只追究公司；具体各人的认识和参与留在第3问，本问不要求逐人分析或列具体刑罚。",
] as const;

export const unitCrimeQ2KnowledgeSupplement = {
  topicId: "unit-crime",
  rule: "在法律规定允许单位构成该罪的基础上，结合实际决策、实施和利益归属审查单位责任，并分别核对组织的排除情形与个人盗用名义的情形。",
  omission:
    "不是为犯罪设立，并不当然排除设立后以实施犯罪为主要活动；公司收款、偿债，也不能单独替代组织性质的判断。事实不足时保留条件，不能让考生补造事实。直接负责的主管人员和其他直接责任人员属于责任类别，不等于所有员工。",
  sources: Object.keys(unitCrimeQ2Sources),
} as const;

// This takes public question content only. It does not accept or evaluate answers.
export function createUnitCrimeQ2ContentCandidate(
  previous: UnitExercise,
): UnitExercise {
  if (
    previous.id !== unitCrimeQ2Replaces ||
    previous.caseId !== "cap-contract-v2" ||
    previous.kind !== "subjective" ||
    previous.prompt !== unitCrimeQ2Prompt
  )
    throw Error("unit-crime-q2-content-source-mismatch");

  const criteria: Criterion[] = unitCrimeQ2Requirements.map((item, index) => ({
    id: `${unitCrimeQ2QuestionId}-p${index + 1}`,
    label: item.label,
    meaning: unitCrimeQ2ReferencePoints[index],
    acceptable: `意思相当并联系本题事实即可：${unitCrimeQ2ReferencePoints[index]}`,
    boundary: item.boundary,
  }));

  return {
    ...previous,
    id: unitCrimeQ2QuestionId,
    title: "停产公司的新订单 · 第2问（法源边界候选）",
    prompt: unitCrimeQ2Prompt,
    reference: unitCrimeQ2ReferencePoints.join("\n"),
    criteria,
    sources: Object.keys(unitCrimeQ2Sources),
    relatedTopicIds: previous.relatedTopicIds
      ? [...previous.relatedTopicIds]
      : undefined,
  };
}
