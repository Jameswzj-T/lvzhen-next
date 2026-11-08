import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";

export const commercialEquityTransferRevision =
  "commercial-equity-transfer-2026-10-13.v1";
const topicId = "commercial-equity-transfer";
const sourceId = "commercial-transfer-article84";
const sourceUrl =
  "https://guangdong.chinatax.gov.cn/gdsw/zjfg/2025-12/31/content_1203d9ef77944845aeca8ce79160292d.shtml";
export const commercialEquityTransferSources: ContentSources = {
  [sourceId]: {
    title: "《公司法》第84条：有限公司股权转让与优先购买权",
    url: sourceUrl,
    note: "2026-10-13直接核读国家税务总局广东省税务局公开的2023年修订公司法全文，页面标有效。第84条规定对外转让的书面通知、同等条件优先购买、30日未答复及多人行权协商不成时的比例，另保留公司章程特别规定。两案公司均2025年成立、事实发生于2026年、出资缴足、章程无特别规定，非法院强制执行。不适用旧法过半数同意程序，不讨论转让合同效力、股东名册或未届期出资责任。题文与教学要求自编，非官方真题或阅卷细则；法条核读不等于模型实评或专业签收。",
  },
};
export const commercialEquityTransferCaseFacts = {
  "COMMERCIAL-TRANSFER-NOTICE-1":
    "本案为独立教学虚构。青栎设计有限公司于2025年成立，只有林祈、周纾、徐舟三名股东，三人的出资均已缴足。2026年，林祈准备把自己持有的公司20%股权以40万元转让给公司以外的裴宁，约定一次付款，付款期限为签约后10日。公司章程对股权转让没有另行规定。\n\n林祈把转让数量、价格、支付方式、付款期限等全部交易条件分别书面通知周纾、徐舟，两人当天签收。自签收之日起已经过35日，两人均未作任何答复，交易条件也未变化。公司仍要求林祈取得其他股东过半数同意，否则不许对外转让。\n\n这里只判断题涉通知后的优先购买权和公司所称的过半数同意程序，不判断转让合同效力、股东名册变更、付款或登记问题，也不涉及法院强制执行。",
  "COMMERCIAL-TRANSFER-RATIO-1":
    "本案为另一独立教学虚构。澄杉器材有限公司于2025年成立，只有钱知、陆言、秦悦三名股东，出资均已缴足，转让前各自出资比例为50%、30%、20%。公司章程对股权转让没有另行规定。\n\n2026年，钱知拟把自己持有的公司20%股权以50万元转让给公司以外的谭桥，并已将数量、价格、支付方式和期限等条件完整书面通知陆言、秦悦。两人收到后10日内均明确要求按通知所列全部相同交易条件购买这20%股权，资金与支付安排也一致。二人就各买多少反复协商，最终没有达成购买比例协议。钱知仍愿按原条件出售，未撤回或改变条件。\n\n这里只判断二人是否可主张优先购买及协商不成时的购买比例，不讨论公司登记、转让合同效力、未届期出资责任或强制执行。",
};
const common = {
  relatedTopicIds: [topicId],
  sources: [sourceId],
  hint: "把本问实际要求与题设事实对应；不必使用固定措辞，也不必展开题外责任。",
};
const notice = {
  ...common,
  caseId: "COMMERCIAL-TRANSFER-NOTICE-1",
  facts: commercialEquityTransferCaseFacts["COMMERCIAL-TRANSFER-NOTICE-1"],
};
const ratio = {
  ...common,
  caseId: "COMMERCIAL-TRANSFER-RATIO-1",
  facts: commercialEquityTransferCaseFacts["COMMERCIAL-TRANSFER-RATIO-1"],
};
const noticeReference =
  "周纾、徐舟在收到列明全部交易条件的书面通知后35日均未答复，已超过30日，依法视为放弃针对本次条件的优先购买权。章程没有特别规定，本案适用通知及同等条件优先购买规则，不再以取得其他股东过半数同意作为法定前提；公司所持理由不成立。这不等于已经完成股东名册或公司登记，也不判断其他未问的效力问题。";
const ratioReference =
  "陆言、秦悦是其他股东，均在30日内提出按全部相同交易条件购买，二人可主张同等条件下的优先购买权。两人应先协商各自购买比例；本案已经协商不成，应按转让时二人各自的出资比例30∶20，即3∶2分配待转让股权。因此陆言购买本次转让份额的3/5、秦悦购买2/5，相当于分别受让公司12%和8%的股权；不是一人一半，也不是把未行权的转让人算入分配。";

export const commercialEquityTransferExercises: UnitExercise[] = [
  {
    ...notice,
    id: "commercial-transfer-notice-choice",
    kind: "objective",
    choiceMode: "single",
    title: "通知后一直没有答复",
    prompt: "仅就本次通知和公司要求的同意程序，下列哪项正确？",
    options: [
      {
        id: "a",
        text: "公司可以继续要求过半数同意，书面通知仅启动优先购买程序。",
        explanation:
          "把旧法同意程序当成现行法的一般前提；本案章程没有特别规定。",
      },
      {
        id: "b",
        text: "两人可在签收通知后第60日前行使优先购买权，公司应继续等待。",
        explanation: "题设适用30日未答复规则，不是60日。",
      },
      {
        id: "c",
        text: "两人视为放弃本次条件下的优先购买权；不能再以须过半数同意为由一概阻止。",
        explanation: "本案完整书面通知、超过30日且章程无特别规定。",
      },
      {
        id: "d",
        text: "两人视为已同意按通知条件受让，林祈应按其出资比例向二人转让。",
        explanation:
          "超过30日未答复视为放弃，不是承诺购买；多人分配规则以行使优先购买权为前提。",
      },
    ],
    answer: "c",
    reference: "选C。" + noticeReference,
  },
  {
    ...notice,
    id: "commercial-transfer-notice-explain",
    kind: "subjective",
    title: "通知后一直没有答复：说明理由",
    prompt:
      "周纾、徐舟对本次已通知条件的优先购买权应如何处理？公司坚持必须先取得其他股东过半数同意的理由是否成立？请结合题设分别说明。",
    answer: "",
    reference: noticeReference,
    criteria: [
      {
        id: "transfer-notice-silence",
        label: "完整通知后30日不答复的后果",
        meaning:
          "联系全部交易条件已书面通知并签收、35日均未答复，说明超过30日视为放弃针对本次条件的优先购买权。",
        acceptable:
          "“两人签收完整通知后超过一个月没回复，视为放弃这次优先买的权利”即可，不必逐字列出四项条件。",
        boundary:
          "不能说沉默等于已经购买或永久丧失任何未来转让的优先权；不要求计算具体到期日期。",
      },
      {
        id: "transfer-no-majority-consent",
        label: "区分通知行权与过半数同意",
        meaning:
          "联系公司章程无另行规定，说明现行法本案不要求其他股东过半数同意，公司以此一概阻止的理由不成立。",
        acceptable:
          "“本案按书面通知、优先购买处理，不用另取得多数股东同意，公司不能拿这个理由挡住”可概括。",
        boundary:
          "只写已通知而未回应公司所称的同意前提不完整；不要求判断合同效力、登记或股东身份何时变化。",
      },
    ],
  },
  {
    ...ratio,
    id: "commercial-transfer-ratio-choice",
    kind: "objective",
    choiceMode: "single",
    title: "两名股东都要买",
    prompt: "二人最终协商不成，依本案条件应如何处理优先购买和购买比例？",
    options: [
      {
        id: "a",
        text: "两人可主张优先购买，分别受让公司10%的股权。",
        explanation: "协商不成按转让时各自出资比例，不是一人一票平均分。",
      },
      {
        id: "b",
        text: "两人可主张优先购买；按3∶2分配本次转让份额，即分别受让公司12%与8%的股权。",
        explanation: "二人同等条件及时行权，协商不成按30∶20分配待转让的20%。",
      },
      {
        id: "c",
        text: "陆言出资较多，优先受让20%；秦悦只有陆言放弃时才能购买。",
        explanation: "出资较多不等于排除另一名同等条件行权的股东。",
      },
      {
        id: "d",
        text: "协商不成应交股东会表决，由持有多数表决权者确定购买人。",
        explanation:
          "法律为协商不成提供按出资比例购买的规则，不是另交多数表决决定。",
      },
    ],
    answer: "b",
    reference: "选B。" + ratioReference,
  },
  {
    ...ratio,
    id: "commercial-transfer-ratio-explain",
    kind: "subjective",
    title: "两名股东都要买：说明理由",
    prompt:
      "陆言、秦悦能否就本次转让主张优先购买权？在二人已协商不成的情况下，各自应按什么比例购买？请结合身份、交易条件和出资比例说明。",
    answer: "",
    reference: ratioReference,
    criteria: [
      {
        id: "transfer-equal-conditions",
        label: "同等条件及时行使优先购买权",
        meaning:
          "联系二人其他股东身份、收到通知后10日内答复及全部交易条件相同，说明二人可主张优先购买权。",
        acceptable:
          "“他们都是其他股东，及时要求照同样条件买，所以都有优先权”即可。",
        boundary:
          "不把只有价格相同泛化为必然同等条件；本案已给定全部条件相同，不要求讨论题外付款争议。",
      },
      {
        id: "transfer-proportional-allocation",
        label: "协商不成按各自出资比例购买",
        meaning:
          "联系已协商不成，按二人转让时30%和20%的出资比例即3∶2分配待转让份额；可表述为受让公司12%和8%。",
        acceptable:
          "答“协商不成按30∶20，即陆言买这次份额的三份、秦悦两份”已足够，不强制计算转让后持股比例。",
        boundary:
          "不能平均分配、由持股较多者独占，或把30%与20%直接当作从公司各受让的股权量；不要求登记流程。",
      },
    ],
  },
];

export const commercialEquityTransferTopics: FaultTopic[] = [
  {
    id: topicId,
    title: "股权转让与优先购买权",
    headline: "有限公司对外转让，先核通知和同等条件",
    goal: "区分书面通知与同意程序，核对行权期限和多人购买比例。",
    prerequisite: "先理解有限公司的股东身份和出资比例。",
    minutes: "10–15",
    paragraphs: [
      "有限公司股东之间可相互转让全部或部分股权。向股东以外的人转让，应把数量、价格、支付方式、期限等事项书面通知其他股东，其他股东在同等条件下有优先购买权。现行一般规则不再以其他股东过半数同意为前提；章程另有规定的，从其规定。",
      "其他股东自接到书面通知之日起30日内未答复，视为放弃优先购买权。要先确认书面通知的交易条件和收到时间，不能把沉默理解为已经购买，也不能用这一次放弃推断所有未来转让。",
      "两名以上股东行使优先购买权，先协商购买比例；协商不成，按转让时各自的出资比例行使。比例用于分配本次待转让份额，不能直接当成从公司受让的股权百分比。",
    ],
    example: {
      title: "通知后一直没有答复",
      facts: notice.facts,
      analysis: noticeReference,
    },
    pitfall: "把通知误当征求过半数同意，或把两名股东购买误当必须平均分。",
    recall: {
      prompt: "对外转让先核什么？两人都买又协商不成时怎么办？",
      reference:
        "先核章程、完整书面通知和同等条件行权；30日不答复视为放弃。多人行权先协商，协商不成按转让时各自出资比例分配本次份额。",
    },
    sources: [sourceId],
    exercises: commercialEquityTransferExercises,
  },
];
export const commercialEquityTransferContentPack = {
  revision: commercialEquityTransferRevision,
  snapshot: {
    topics: commercialEquityTransferTopics,
    sources: commercialEquityTransferSources,
  },
};
export const commercialEquityTransferPublicRules = [
  {
    sourceId,
    title: "公司法第84条：有限公司股权转让（法条原文）",
    url: sourceUrl,
    excerpt:
      "第八十四条　有限责任公司的股东之间可以相互转让其全部或者部分股权。\n股东向股东以外的人转让股权的，应当将股权转让的数量、价格、支付方式和期限等事项书面通知其他股东，其他股东在同等条件下有优先购买权。股东自接到书面通知之日起三十日内未答复的，视为放弃优先购买权。两个以上股东行使优先购买权的，协商确定各自的购买比例；协商不成的，按照转让时各自的出资比例行使优先购买权。\n公司章程对股权转让另有规定的，从其规定。",
    checkedAt: "2026-10-13",
    scope:
      "2023年修订文本第84条；直接核读官方有效页面。仅一般有限公司股权转让，不含强制执行、出资责任、合同效力或登记。无具体题目答案或采分要求。",
  },
];
