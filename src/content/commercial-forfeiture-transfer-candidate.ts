import type { ContentSources, UnitExercise } from "./fault-unit";

// Isolated review candidate. Nothing in the published catalogue imports it.
export const commercialForfeitureTransferRevision =
  "commercial-forfeiture-transfer-2026-10-16.candidate-v1";
export const commercialForfeitureTransferPreparation = {
  status: "awaiting-independent-content-review",
  independentContentReviewApproved: false,
  registeredInProduct: false,
  sourceCheckedAt: "2026-10-16",
  officialEffectiveLabelObserved: true,
  lawPromulgatedAt: "2023-12-29",
  lawEffectiveFrom: "2024-07-01",
  independentCases: 1,
  writtenQuestions: 1,
  objectiveQuestions: 0,
  newKnowledgeCards: 0,
  modelCalls: 0,
} as const;

const id = "commercial-forfeiture-notice-transfer-explain";
const sourceId = "commercial-forfeiture-transfer-company-law";
export const commercialForfeitureTransferSources: ContentSources = {
  [sourceId]: {
    title: "《公司法》第51、52条及第266条：失权通知、范围与施行日期",
    url: "https://guangdong.chinatax.gov.cn/gdsw/zjfg/2025-12/31/content_1203d9ef77944845aeca8ce79160292d.shtml",
    note: "2026-10-16直接核读国家税务总局广东省税务局法规库，页面发文日期为2023-12-29、有效级别为有效；第52条第一款明确书面失权通知发出之日及未缴纳出资的股权范围，第266条明确2024-07-01施行。与人民日报2024-01-02公布全文的第51、52、266条交叉核对一致。本案为2025年境内新设有限公司，2026年到期的合法货币出资，催缴宽限期已届满且程序无争议；只考失权时点与未缴股权范围，不考旧法过渡、催缴期限计算、股权处置、诉讼期限、赔偿或债务消灭。候选自编，非官方真题或阅卷细则；待主控独立审校，不宣称专业法律签收。",
  },
  "commercial-forfeiture-transfer-published-text": {
    title: "人民日报公布《中华人民共和国公司法》全文（2024-01-02）",
    url: "https://paper.people.com.cn/rmrb/html/2024-01/02/nw.D110000renmrb_20240102_1-14.htm",
    note: "2026-10-16直接核读第51、52及266条，与上述官方法规库交叉核对。公布文本用于核对条文，不单独替代现行效力标识。只采用第52条第一款的时点与范围；同条后两款的股权后续处置及异议起诉不列本问必答。",
  },
};

export const commercialForfeitureTransferQuestion: UnitExercise = {
  id,
  caseId: "COMMERCIAL-FORFEITURE-NOTICE-TRANSFER-1",
  relatedTopicIds: ["commercial-contribution-forfeiture"],
  kind: "subjective",
  title: "澄岳公司的出资处理",
  facts: [
    "本案为独立教学虚构。澄岳包装有限公司于2025年在我国境内成立，有三名股东。周宁认缴货币出资80万元，已缴30万元；按合法有效的章程，余下50万元应于2026年2月28日前缴足，其他股东均已缴足各自出资。",
    "董事会核查后，公司于3月2日向周宁发出书面催缴书，当天送达，给予自发出之日起90日的宽限期。至6月2日，该期限已届满，周宁仍未补缴。董事会于6月3日依法作出失权决议，公司依决议于6月5日发出书面失权通知，周宁6月9日收到。上述催缴、决议和通知没有其他程序或效力争议。",
    "本问只判断失权发生的日期与涉及的股权范围，不计算后续持股比例，不讨论股权处置、异议起诉或赔偿。",
  ].join("\n\n"),
  prompt: "依上述事实，周宁从哪一天起丧失哪部分股权？请简要说明理由。",
  hint: "",
  answer: "",
  reference:
    "自6月5日书面失权通知发出之日起，周宁丧失未缴50万元出资对应的股权，已缴30万元对应股权保留。失权以书面通知发出为发生时点，6月3日董事会决议只是发出通知的前提，6月9日收到也不是该时点；范围只限未缴出资对应股权，不能扩为全部80万元对应股权。",
  criteria: [
    {
      id: "forfeiture-transfer-notice-dispatch",
      label: "以6月5日书面失权通知发出为时点",
      meaning:
        "将本案失权发生时间联系到6月5日书面失权通知发出，而非6月3日董事会决议或6月9日收到；说明发出通知这一事实为何决定时点。",
      acceptable:
        "‘5号信发出去就开始失权了’或‘发出失权通知那天就发生’足够。题设指代明确时可不重抄年月日、‘书面’或条号；正面说明发出即发生即可，不强制另逐一反驳决议日和收到日。可与范围一句覆盖。",
      boundary:
        "仅列6月5日而没有表达其与通知发出的联系，属结论有而理由未完整；明确采用决议日或收到日，与本项相反。明确表示不会判断时点，保留uncertain，其他已答对内容独立保留；不能因答对范围推定时点掌握。无需重新计算催缴宽限期或说明异议起诉期限。",
    },
    {
      id: "forfeiture-transfer-unpaid-scope",
      label: "限于未缴50万元对应股权，已缴30万元部分保留",
      meaning:
        "以未缴出资界定失权范围：周宁只丧失欠缴50万元对应股权，已缴30万元对应股权保留，不丧失全部认缴80万元对应股权。",
      acceptable:
        "‘只去掉没交的50万那部分，交过的30万那部分还在’或‘只丧失未缴部分的股权，已缴部分不动’足够。指代明确时无需重复金额、股权二字或计算比例；无需写失权后的出资债务处理。",
      boundary:
        "仅列50万元而不说明这是未缴部分及对应股权，理由未完整；明确剥夺全部80万元对应股权，与本项相反。将失权说成没收已交30万元或免除欠缴50万元，不属于本项正确表达。不能因为时点答错就抹去正确范围；明确不会判断范围时保留uncertain。",
    },
  ],
  sources: [sourceId, "commercial-forfeiture-transfer-published-text"],
};

/** Proposed links only; importing this candidate never enables recommendation. */
export const commercialForfeitureTransferReview = {
  sourceQuestionId: "commercial-forfeiture-partial-explain-v2",
  sourceRevision: "commercial-contribution-forfeiture-2026-10-15.v2",
  targetQuestionId: id,
  targetRevision: commercialForfeitureTransferRevision,
  proposedCriterionLinks: [
    {
      fromPointId: "forfeiture-notice-dispatch",
      toPointId: "forfeiture-transfer-notice-dispatch",
    },
    {
      fromPointId: "forfeiture-unpaid-equity-only",
      toPointId: "forfeiture-transfer-unpaid-scope",
    },
  ],
  proposedRecommendationReason:
    "换一个公司的出资处理案例，先自己完整判断，再看本题反馈。",
  noAutomaticMasteryClaim: true,
  noOfficialMarkingSchemeClaim: true,
  examplesAreAuthoredReviewBoundaries: true,
  answerBoundaries: [
    {
      answer:
        "5号那封信发出去就开始失权了，只去掉没交的50万那部分，交过的30万那部分还在。",
      expected: ["covered", "covered"],
      reason: "自然短答同时建立通知发出与时点、未缴与范围两条联系。",
    },
    {
      answer: "发出失权通知那天起，只丧失未缴部分的股权，已缴部分不动。",
      expected: ["covered", "covered"],
      reason: "案情只有一个发出日，指代清楚；不强制复写日期金额。",
    },
    {
      answer:
        "6月3日董事会决定时就失权，但只丧失欠缴50万元对应股权，已缴30万元的保留。",
      expected: ["contradicted", "covered"],
      reason: "时点明确错误，范围完整；两项独立保留。",
    },
    {
      answer:
        "6月5日信发出时失权，因为还欠出资，所以全部80万元对应股权都没了。",
      expected: ["covered", "contradicted"],
      reason: "时点正确；把未缴范围扩大为全部股权。",
    },
    {
      answer: "6月5日，50万元。",
      expected: ["partial", "partial"],
      reason: "只有日期金额，没有说明各自理由；不要求长篇，补明两条联系即可。",
    },
    {
      answer:
        "只丧失没缴的50万元对应股权，已缴30万元部分保留；哪天发生我还不会判断。",
      expected: ["uncertain", "covered"],
      reason: "时点明确未决，应讲明规则；不能记为已答错或已掌握。",
    },
  ],
} as const;

/** Allowlist for later pre-answer presentation; no reference, criteria or cues. */
export function commercialForfeitureTransferPromptMaterial() {
  const q = commercialForfeitureTransferQuestion;
  return {
    id: q.id,
    revision: commercialForfeitureTransferRevision,
    caseId: q.caseId,
    title: q.title,
    kind: q.kind,
    facts: q.facts,
    prompt: q.prompt,
  };
}
