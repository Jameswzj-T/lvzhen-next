import type { ContentSources, UnitExercise } from "./fault-unit";

import { commercialContributionForfeitureTopics } from "./commercial-contribution-forfeiture";

// Independent review accepted this single additional case with narrower answer
// boundaries. The candidate and original topic publication remain unchanged.
export const commercialForfeitureTransferRevision =
  "commercial-forfeiture-transfer-2026-10-16.v1";

const id = "commercial-forfeiture-notice-transfer-explain";
const sourceId = "commercial-forfeiture-transfer-company-law";
export const commercialForfeitureTransferSources: ContentSources = {
  [sourceId]: {
    title: "《公司法》第51、52条及第266条：失权通知、范围与施行日期",
    url: "https://guangdong.chinatax.gov.cn/gdsw/zjfg/2025-12/31/content_1203d9ef77944845aeca8ce79160292d.shtml",
    note: "2026-10-16直接核读国家税务总局广东省税务局法规库，页面发文日期为2023-12-29、有效级别为有效；第52条第一款明确书面失权通知发出之日及未缴纳出资的股权范围，第266条明确2024-07-01施行。与人民日报2024-01-02公布全文的第51、52、266条交叉核对一致。本案为2025年境内新设有限公司，2026年到期的合法货币出资，催缴宽限期已届满且程序无争议；只考失权时点与未缴股权范围，不考旧法过渡、催缴期限计算、股权处置、诉讼期限、赔偿或债务消灭。独立自编案例，非官方真题或阅卷细则。2026-10-16主控核对公布文本第52、266条并完成本题有界内容审校；主控未再次取得广东税务页面，不将此前观察到的有效标识写成独立复核结果，不宣称全面现行效力或专业法律签收。",
  },
  "commercial-forfeiture-transfer-published-text": {
    title: "人民日报公布《中华人民共和国公司法》全文（2024-01-02）",
    url: "https://paper.people.com.cn/rmrb/html/2024-01/02/nw.D110000renmrb_20240102_1-14.htm",
    note: "2026-10-16直接核读第51、52及266条，与上述官方法规库交叉核对；同日主控独立核对第52、266条。公布文本用于核对条文，不单独替代现行效力标识。只采用第52条第一款的时点与范围；同条后两款的股权后续处置及异议起诉不列本问必答。",
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
        "将本案失权发生时间联系到6月5日书面失权通知发出，而非6月3日董事会决议或6月9日收到；表达通知发出即发生失权的联系即已说明理由。",
      acceptable:
        "‘信发出去就失权’‘5号信发出去就开始失权了’或‘发出失权通知那天就发生’足够。一句话可同时表达结论和理由，不要求另写‘因为’。题设指代明确时可不重抄年月日、‘书面’或条号；正面说明发出即发生即可，不强制逐一列出或反驳决议日和收到日。可与范围一句覆盖。",
      boundary:
        "仅列6月5日而没有表达其与通知发出的联系，应肯定日期正确，仅判理由未完整；明确采用决议日或收到日，与本项相反。明确表示不会判断时点，保留uncertain，其他已答对内容独立保留；不能因答对范围推定时点掌握。无需重新计算催缴宽限期或说明异议起诉期限。主动提及本问范围外的金钱后果，不据此否定已答对的失权时点。",
    },
    {
      id: "forfeiture-transfer-unpaid-scope",
      label: "限于未缴50万元对应股权，已缴30万元部分保留",
      meaning:
        "以未缴出资界定失权范围：周宁只丧失欠缴50万元对应股权。‘只丧失未缴部分’已经排除已缴部分，无需另写保留30万元对应股权；不得扩为全部认缴80万元对应股权。",
      acceptable:
        "‘只丧失没缴的那部分’或‘只丧失未缴部分的股权’即足够，也认可‘只去掉没交的50万那部分，交过的30万那部分还在’。限制为未缴部分本身即可兼含结论和理由，无需独立理由句、‘因为’、再次说明已缴部分保留或‘不是没收已缴款’；指代明确时无需重复金额、股权二字、条号或计算比例。",
      boundary:
        "仅列50万元而不说明这是未缴部分及对应股权，应肯定金额正确，仅判理由未完整。本项只判断失权涉及的股权范围。失权后欠缴款、赔偿及股权处置不属本问必答，不因未讨论这些问题扣减本项。将已缴部分的股权也纳入失权，仍属于范围判断错误。主动提及本问范围外的金钱后果，不据此否定已答对的股权范围。不能因为时点答错就抹去正确范围；明确不会判断范围时保留uncertain。",
    },
  ],
  sources: [sourceId, "commercial-forfeiture-transfer-published-text"],
};

// Only the live practice list gains the new form. The teaching card's original
// version and frozen content pack keep their original exercises and sources.
export const commercialForfeiturePracticeTopics =
  commercialContributionForfeitureTopics.map((topic) => ({
    ...topic,
    exercises: [...topic.exercises, commercialForfeitureTransferQuestion],
  }));

export const commercialForfeitureTransferContentPack = {
  revision: commercialForfeitureTransferRevision,
  snapshot: {
    topics: commercialContributionForfeitureTopics.map((topic) => ({
      ...topic,
      sources: Object.keys(commercialForfeitureTransferSources),
      exercises: [commercialForfeitureTransferQuestion],
    })),
    sources: commercialForfeitureTransferSources,
  },
};
