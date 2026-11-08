import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";

export const commercialCompanyLiabilityRevision =
  "commercial-company-liability-2026-10-11.v1";
const topicId = "commercial-company-independent-liability";
const companyCaseId = "COMMERCIAL-COMPANY-ASSETS-1";
const shareholderCaseId = "COMMERCIAL-SHAREHOLDER-PAID-1";
const lawUrl =
  "https://guangdong.chinatax.gov.cn/gdsw/zjfg/2025-12/31/content_1203d9ef77944845aeca8ce79160292d.shtml";

export const commercialCompanyLiabilitySources: ContentSources = {
  "commercial-company-article3": {
    title: "《公司法》2023年修订第3条：公司独立财产与公司债务",
    url: lawUrl,
    note: "2026-10-11直接读取国家税务总局广东省税务局公开全文：2023-12-29第二次修订，页头有效级别为有效，第266条载2024-07-01施行。第3条规定公司有独立法人财产，并以全部财产承担公司债务；不能把注册资本当公司清偿责任上限。案例与得失点是自编教学材料，不是官方试题或阅卷细则。",
  },
  "commercial-company-article4": {
    title: "《公司法》第4条：有限责任股东对公司的出资责任",
    url: lawUrl,
    note: "同一官方全文第4条已直接读取。有限责任公司股东以认缴出资额为限对公司承担责任；本组题设全体股东已足额履行，不将认缴改为任意实缴，也不要求已履行后同额再付一次。公司责任与股东责任不能混同。",
  },
  "commercial-company-boundary23": {
    title: "《公司法》第23条：有限责任不能绝对化的边界",
    url: lawUrl,
    note: "同一全文第23条已直接读取，作为本组范围提示。滥用独立地位与有限责任逃债严重损害债权人利益等情形另有规则；两案均为多股东且已履行出资；涉及股东个人责任的第二案已排除滥用、抽逃、个人担保等另行责任依据，首案只讨论公司自己的责任。不考人格否认的完整认定、全部出资瑕疵或程序责任，不把异常情形提醒另列本题必答。",
  },
  "commercial-company-effective-directory": {
    title: "现行有效法律目录中的公司法2023年修订版本",
    url: "https://www.samr.gov.cn/fgs/sjdt/art/2026/art_93a4fbac2ce14ab6baab60b0cd452ef4.html",
    note: "市场监管总局2026-09-18转载中国人大网目录，截止2026-08-28，列公司法2023年修订；本轮独立核到相应条目。保留目录截止日，不冒称其后全部规范清理或公司法年度全覆盖。",
  },
};
const coreSources = [
  "commercial-company-article3",
  "commercial-company-article4",
];

export const commercialCompanyLiabilityCaseFacts = {
  [companyCaseId]: [
    "本案为教学虚构。2025年成立的澄木家具有限公司有三名股东，登记注册资本30万元，全体股东已经按章程足额缴纳出资。公司以自己的名义购买木材，收货后应向供应商支付货款50万元；债务已经到期，金额与履行条件均无争议。经过经营，公司现有可用于清偿的银行存款80万元。",
    "公司负责人拒付超过30万元的部分，理由是名称里有‘有限责任’，注册资本又是30万元，所以公司最多只需还30万元，剩余20万元不用再还。本问只判断这项上限主张及公司的责任；不涉及其他债权、担保、破产分配或股东个人承担责任。",
  ].join("\n\n"),
  [shareholderCaseId]: [
    "本案为另一独立教学虚构。2025年成立的禾页文具有限公司有叶知、许乔两名股东，分别认缴20万元和15万元，全体股东已经依章程缴足各自出资，没有抽逃。公司后来正常经营亏损，拖欠印刷厂到期货款40万元，债务无争议，公司目前仅有8万元财产可供清偿。",
    "公司与股东个人的账目和财产一直分开，已查明不存在股东利用公司独立地位、有限责任逃债等滥用行为。叶知没有为该债务提供个人担保或承诺代偿，也不涉及另行侵权、董事失职等责任。印刷厂认为叶知出资最多，应在公司财产之外用个人存款补足32万元。本问只判断能否仅因上述股东身份和公司清偿不足要求叶知补足，不讨论公司后续清算或破产程序。",
  ].join("\n\n"),
};

export const commercialExercises: UnitExercise[] = [
  {
    id: "commercial-company-capital-ceiling-choice",
    caseId: companyCaseId,
    relatedTopicIds: [topicId],
    kind: "objective",
    choiceMode: "single",
    title: "公司还债只到注册资本为止吗？",
    facts: commercialCompanyLiabilityCaseFacts[companyCaseId],
    prompt: "对澄木公司只还30万元的主张，下列判断哪项正确？",
    options: [
      {
        id: "a",
        text: "主张成立，有限责任意味着公司对外还债以登记注册资本为上限。",
        explanation:
          "把股东有限责任误作公司对外责任上限；公司以全部财产承担自己的债务。",
      },
      {
        id: "b",
        text: "主张不成立，公司应承担50万元货款债务，不能以30万元注册资本截断责任。",
        explanation:
          "债务由公司承担，80万元是公司可清偿财产，登记资本30万元不是50万元货款的责任上限。",
      },
      {
        id: "c",
        text: "公司既有80万元存款，就必须把80万元全部付给这名供应商。",
        explanation:
          "全部财产是责任财产范围，不会把已经确定的50万元债务增加为80万元。",
      },
      {
        id: "d",
        text: "既然三名股东已经出资，这笔货款就应改由三名股东分摊，公司不用支付。",
        explanation: "已出资不把公司自己的买卖债务转成股东个人债务。",
      },
    ],
    answer: "b",
    hint: "区分谁欠这笔钱，以及注册资本和公司现有财产是否是同一个概念。",
    reference:
      "选B。买卖和债务归于公司，公司以自己的全部财产承担该债务；注册资本30万元不是对外还债的上限。题中应清偿的货款是50万元，不能少还20万元，也不是把80万元存款全部交给供应商。",
    sources: coreSources,
  },
  {
    id: "commercial-company-capital-ceiling-explain",
    caseId: companyCaseId,
    relatedTopicIds: [topicId],
    kind: "subjective",
    title: "说明公司的责任与30万元上限",
    facts: commercialCompanyLiabilityCaseFacts[companyCaseId],
    prompt:
      "这笔货款应由谁承担？公司能否以注册资本30万元为由只还30万元？请结合题设说明。",
    answer: "",
    hint: "先固定承担货款债务的主体，再说明有限责任是否限制公司自己的责任财产。",
    reference:
      "货款是公司以自己名义交易形成的债务，应由公司承担。公司以全部财产对自己的债务负责，注册资本不是还款上限；题中有80万元可清偿存款，50万元到期货款无争议，不能以30万元注册资本为由拒还其中20万元。",
    criteria: [
      {
        id: "company-is-debtor",
        label: "区分公司债务与股东个人债务",
        meaning:
          "联系公司以自己名义购买并收货，说明货款应由公司以自身财产承担，而非因股东出资就改为股东个人债务。",
        acceptable:
          "可以说‘买木材的是公司，这笔货款由公司自己还’；不要求独立使用法人术语或逐人列股东。与下一点在一句话中表达亦可。",
        boundary:
          "只写股东有限责任而未说明本案债务由公司承担，不等同答出本点；不要求展开股东异常责任、公司治理或担保。",
      },
      {
        id: "capital-not-debt-ceiling",
        label: "否定注册资本封顶并联系本案货款",
        meaning:
          "说明公司以全部财产承担公司债务，不能把30万元注册资本作为对外责任上限；联系题中50万元到期货款和80万元可清偿财产，否定少还20万元。",
        acceptable:
          "‘公司有钱，应还足这50万，不能拿注册资本30万截掉后面的债’可承接本点，不必复写全部数值或照背法条。仅术语不同不能否认实质正确分析。",
        boundary:
          "‘有限公司只能还30万’与本点相反；全部财产担责不等于该债权人取得超过50万元的80万元。题外程序、法条号或责任例外不是必答。",
      },
    ],
    sources: coreSources,
  },
  {
    id: "commercial-shareholder-paid-shortfall-choice",
    caseId: shareholderCaseId,
    relatedTopicIds: [topicId],
    kind: "objective",
    choiceMode: "single",
    title: "出资最多的股东必须补齐公司欠款吗？",
    facts: commercialCompanyLiabilityCaseFacts[shareholderCaseId],
    prompt:
      "仅按题目给定的事实，对印刷厂要求叶知个人补足32万元的判断哪项正确？",
    options: [
      {
        id: "a",
        text: "叶知出资最多，公司的不足部分当然由他无限补足。",
        explanation: "出资最多本身不把公司债务变成该股东无限兜底的个人债务。",
      },
      {
        id: "b",
        text: "叶知至少应再给印刷厂20万元，因为有限责任要求已缴出资后再按认缴额付一次。",
        explanation:
          "认缴限额对应股东对公司的出资责任，不是履行后每遇债权人都再次支付同额。",
      },
      {
        id: "c",
        text: "叶知已履行出资且题设排除了另行担责依据，不能仅因公司财产不足和其股东身份要求个人补齐。",
        explanation:
          "须区分公司债务与股东对公司的出资责任；本案事实不支持自动个人兜底。",
      },
      {
        id: "d",
        text: "有限责任意味着公司财产不足部分的债务当即消失，印刷厂对公司也不再有请求。",
        explanation: "股东不自动补足不等于公司剩余债务当然消灭。",
      },
    ],
    answer: "c",
    hint: "核对出资是否已履行，以及题设有没有另一项个人担责依据。",
    reference:
      "选C。有限责任公司股东以认缴出资额为限对公司承担责任，叶知和另一股东均已缴足且无题述异常或担保。公司清偿不足不会仅凭出资最多就使叶知自动以个人财产兜底，也不意味着公司欠款当然消灭。",
    sources: coreSources,
  },
  {
    id: "commercial-shareholder-paid-shortfall-explain",
    caseId: shareholderCaseId,
    relatedTopicIds: [topicId],
    kind: "subjective",
    title: "已足额出资后还须为公司自动兜底吗？",
    facts: commercialCompanyLiabilityCaseFacts[shareholderCaseId],
    prompt:
      "结合叶知已经缴足出资及题中其余事实，说明其出资责任是否还需重复履行，以及印刷厂能否仅以出资最多、公司财产不足要求他用个人存款补齐32万元。",
    answer: "",
    hint: "把股东对公司的出资责任与公司欠印刷厂的债务分开。",
    reference:
      "叶知对公司的出资责任以认缴额为限，已缴足20万元，不因公司欠款而要求同一出资再缴一次。公司与股东是不同责任主体，题目已排除滥用、抽逃和个人担保等另行依据；出资最多和公司财产不足本身，不能使叶知自动用个人存款补齐32万元。",
    criteria: [
      {
        id: "paid-contribution-not-repeat",
        label: "承认已履行的对公司出资责任",
        meaning:
          "说明有限责任股东以认缴出资额为限对公司承担责任；结合叶知已按章程缴足20万元，不把相同出资变成还需重复支付的义务。",
        acceptable:
          "‘该出给公司的20万已经交足，不能因为欠债再让他把同一份出资交一遍’可表达这一层；不以只说实缴就替代一般认缴规则，也不要求固定术语。",
        boundary:
          "若主张无需实际履行认缴义务，或已缴足后还必须同额再付一次，不属正确表达；不要求计算另一股东比例或展开出资加速到期。",
      },
      {
        id: "shortfall-not-automatic-guarantee",
        label: "否定仅因股东身份自动个人补足",
        meaning:
          "联系公司独立担责、股东财产分开及题设排除的另行责任依据，否定仅因出资最多和公司欠款就要求叶知个人补齐32万元。",
        acceptable:
          "可概括为‘这是公司的债，出资已交足又没个人担保或逃债这些情况，不能只因他是大股东就找他补窟窿’；无需逐条复述所有排除事实或列每个法条。",
        boundary:
          "不能把本案不自动兜底说成股东任何情况下免责，或公司欠款因不足清偿即当然消灭。没有主动讨论全部例外、后续程序或另行罪责，不单独算漏答。",
      },
    ],
    sources: coreSources,
  },
];

export const commercialTopics: FaultTopic[] = [
  {
    id: topicId,
    title: "公司财产责任与股东有限责任",
    headline: "先分清公司和股东，再看谁以什么财产承担哪项责任。",
    goal: "能否定公司还债以注册资本封顶，也能识别已履行出资的股东不自动为公司欠款兜底。",
    prerequisite: "知道公司可以用自己的名义交易、享有权利和承担债务。",
    minutes: "8–12",
    paragraphs: [
      "公司是具有独立财产的企业法人，以自己的全部财产承担公司债务。注册资本反映股东认缴的出资额，不是公司现有资产总额，也不是公司对外还债的最高数额。公司经营后拥有的财产同样属于责任财产；实际应付多少仍要看债务本身。",
      "有限责任公司股东以其认缴的出资额为限对公司承担责任。股东必须履行出资义务，不能只认不缴；但已依约缴足出资的股东，并非公司每欠一笔债就要再缴一次，也不因公司经营亏损就当然用个人财产无限补齐。",
      "有限责任并非任何情况下都免责。滥用公司独立地位和有限责任逃债、出资异常、个人担保等须按相应规则另行分析。本单元两案均给定多股东、全部出资已履行；第二案另明确排除上述个人担责依据，首案只问公司责任。这里只练两种责任的基础区别，不展开全部例外。",
    ],
    example: {
      title: "30万元注册资本不是公司还款上限",
      facts: commercialCompanyLiabilityCaseFacts[companyCaseId],
      analysis:
        "买卖债务由澄木公司承担，公司有80万元可清偿存款，应承担确定的50万元货款，不能借注册资本30万元少还20万元。公司全部财产担责，也不等于向该债权人支付超过债务的80万元。",
    },
    pitfall:
      "把股东有限责任套给公司自身，或反过来把公司欠款全部转给已经履行出资的普通股东。",
    recall: {
      prompt:
        "‘有限公司最多还注册资本’和‘公司不够还就由最大股东补’分别混淆了什么？",
      reference:
        "前者把股东责任限额当成公司责任上限；后者把公司债务自动转给股东。公司以全部财产担责，股东按认缴向公司履行出资，另有担责依据时才按对应规则分析。",
    },
    sources: Object.keys(commercialCompanyLiabilitySources),
    exercises: commercialExercises,
  },
];
export const commercialChapter = {
  id: "COMMERCIAL-COMPANY-FOUNDATION",
  title: "公司法基础",
  section: "商法",
  topicIds: [topicId],
};
export const commercialCompanyLiabilityContentPack = {
  revision: commercialCompanyLiabilityRevision,
  snapshot: {
    topics: commercialTopics,
    sources: commercialCompanyLiabilitySources,
  },
};
export const commercialDefaultQueues = {
  objective: commercialExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: commercialExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function commercialQuestion(id: string) {
  const q = commercialExercises.find((q) => q.id === id);
  return q ? structuredClone(q) : undefined;
}
export function commercialTopicForQuestion(id: string) {
  return commercialQuestion(id)
    ? structuredClone(commercialTopics[0])
    : undefined;
}
export function commercialSameCaseQuestions(id: string) {
  const q = commercialQuestion(id);
  return q
    ? structuredClone(commercialExercises.filter((x) => x.caseId === q.caseId))
    : [];
}
export const commercialCompanyLiabilityPublicRules = [
  {
    sourceId: "commercial-company-article3",
    title: "第3条：公司承担自身债务（教学摘要）",
    url: lawUrl,
    excerpt:
      "公司有独立法人财产，以自己的全部财产承担公司债务。注册资本不是公司现有财产的同义词或对外债务责任上限；全部财产担责不使债权额自动增加。",
    checkedAt: "2026-10-11",
    scope: "公司责任的一般区分，不包含具体案件结论、参考答或采分要点。",
  },
  {
    sourceId: "commercial-company-article4",
    title: "第4条：股东向公司履行出资（教学摘要）",
    url: lawUrl,
    excerpt:
      "有限责任股东以认缴出资额为限对公司承担责任，出资义务仍须履行；履行完毕不意味着每一公司债权人都可要求再缴同额。股东另行担保、出资瑕疵或滥用独立地位等须另据相应规则判断。",
    checkedAt: "2026-10-11",
    scope:
      "仅股东出资责任与公司债务的区别，不展开全部异常责任、程序或给定题的结论。",
  },
];
