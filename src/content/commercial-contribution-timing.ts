import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";

export const commercialContributionTimingRevision =
  "commercial-contribution-timing-2026-10-11.v1";
const topicId = "commercial-contribution-timing";
const dueCaseId = "COMMERCIAL-CONTRIBUTION-DUE-1";
const earlyCaseId = "COMMERCIAL-CONTRIBUTION-EARLY-1";
const lawUrl =
  "https://guangdong.chinatax.gov.cn/gdsw/zjfg/2025-12/31/content_1203d9ef77944845aeca8ce79160292d.shtml";

export const commercialContributionTimingSources: ContentSources = {
  "commercial-contribution-article49": {
    title: "《公司法》第49条：按章程期限足额缴纳出资",
    url: lawUrl,
    note: "2026-10-11直接读取国家税务总局广东省税务局公开全文，页头标有效；并用2024-01-02人民日报公布的2023年修订全文交叉核对。第49条要求按期足额缴纳章程规定的认缴出资。这里仅练向公司履行剩余出资，不另考赔偿、催缴失权或其他股东责任。两案均为2025年新设多股东有限责任公司，现金出资期限合法，不涉及存量过渡。",
  },
  "commercial-contribution-article54": {
    title: "《公司法》第54条：不能清偿到期债务时提前缴纳",
    url: lawUrl,
    note: "同次直读第54条：公司不能清偿到期债务时，公司本身或已到期债权的债权人可要求已认缴而未届期的股东提前缴纳出资。第二案只考已给定完整不能清偿事实时，公司本身请求与纯期限抗辩；不把亏损、债务刚到期或一次余额不足等同此条件，不另考债权人直接受领、程序路径或所有金额边界。",
  },
  "commercial-contribution-articles47-266": {
    title: "《公司法》第47、266条：期限与适用时间范围",
    url: lawUrl,
    note: "2023年修订公司法自2024-07-01施行。第47条的通常五年缴足边界不使合法章程约定的较早期限失效；本单元两案期限均在新设公司五年范围内，没有特殊出资期限规则。法条号、五年数值和过渡清理不是本组独立必答。案例、解释与要求是自编教学材料，非官方题或阅卷细则。",
  },
};

export const commercialContributionTimingCaseFacts = {
  [dueCaseId]: [
    "本案为教学虚构。晴岚包装有限公司于2025年3月成立，有三名股东。周宁认缴货币出资30万元，已经实缴10万元；合法有效的公司章程规定，他应在2026年9月30日前缴足其余出资。本案没有另行法定出资期限，其他股东均已履行自己的出资义务。",
    "到2026年10月11日，周宁仍未缴纳剩余款项。公司经营正常，没有到期欠债，向周宁请求缴纳剩余20万元。周宁说：‘认缴只是先登记数字，公司又不缺钱，不能要求我现在真把钱交进来。’本问只讨论他向公司的出资履行，不涉及损失赔偿、失权、其他股东或董事责任。",
  ].join("\n\n"),
  [earlyCaseId]: [
    "本案为另一独立教学虚构。溪原器材有限公司于2025年6月成立，有三名股东。林遥认缴货币出资30万元，尚未实缴；合法有效的公司章程约定在2029年6月1日前缴足。本案没有另行法定出资期限，其他股东均已缴足自己的出资。",
    "2026年9月，公司所欠50万元货款已全部到期，金额和履行条件均无争议。公司已经停产，多次催收及财产调查确认：银行账户没有存款，没有其他可变现财产或可收取的债权，也无法通过现有业务、融资筹得偿债资金；截至10月11日仍未支付这笔货款。公司尚未进入破产程序，由公司自己书面要求林遥将尚未缴纳的出资提前缴入公司账户。林遥只以‘还没到2029年’为由拒绝。本问仅判断这项期限抗辩与公司本次提前缴纳请求，不讨论债权人直接受领、诉讼执行路径或股东个人无限担保。",
  ].join("\n\n"),
};

export const commercialContributionTimingExercises: UnitExercise[] = [
  {
    id: "commercial-contribution-due-choice",
    caseId: dueCaseId,
    relatedTopicIds: [topicId],
    kind: "objective",
    choiceMode: "single",
    title: "认缴期限到了，公司不缺钱就不用缴吗？",
    facts: commercialContributionTimingCaseFacts[dueCaseId],
    prompt: "对公司请求周宁缴纳剩余20万元，下列判断哪项正确？",
    options: [
      {
        id: "a",
        text: "认缴只需登记，不产生实际缴款义务。",
        explanation: "认缴确定出资义务，不等于免除实际履行。",
      },
      {
        id: "b",
        text: "应依章程履行到期出资，已缴10万元不重复缴纳，剩余20万元应缴给公司。",
        explanation: "合法章程期限已经届满，须按期足额履行，扣除已实缴部分。",
      },
      {
        id: "c",
        text: "只有公司不能清偿到期债务时，已经到期的出资才需要缴纳。",
        explanation: "把未届期出资提前缴纳的条件误加给普通到期履行。",
      },
      {
        id: "d",
        text: "公司成立尚不足五年，因此周宁可以单方推迟章程约定的较早日期。",
        explanation: "通常五年缴足的法定边界不推翻本案合法的较早章程期限。",
      },
    ],
    answer: "b",
    hint: "先核对章程期限是否已到，再从认缴总额中扣除已缴部分。",
    reference:
      "选B。认缴出资仍应按合法章程约定的期限足额缴纳。周宁的期限已到，不能以公司经营正常或认缴只是登记为由拒绝。30万元中已有10万元实缴，剩余20万元应缴给公司，不是同一出资再缴30万元。",
    sources: [
      "commercial-contribution-article49",
      "commercial-contribution-articles47-266",
    ],
  },
  {
    id: "commercial-contribution-due-explain",
    caseId: dueCaseId,
    relatedTopicIds: [topicId],
    kind: "subjective",
    title: "说明到期出资及应补的余额",
    facts: commercialContributionTimingCaseFacts[dueCaseId],
    prompt:
      "周宁能否以认缴只是登记、公司不缺钱为由拒绝缴款？公司本次可要求他补缴多少出资？请结合题设说明。",
    answer: "",
    hint: "将是否需要履行与尚有多少未履行分开说明。",
    reference:
      "不能拒绝。股东应按期足额缴纳章程规定的认缴出资，本案合法期限已在9月30日届满，不以公司缺钱或不能还债为前提。周宁认缴30万元、已缴10万元，剩余20万元须向公司缴纳，已缴部分不重复计算。",
    criteria: [
      {
        id: "due-contribution-duty",
        label: "联系到期事实说明实际出资义务",
        meaning:
          "联系合法章程期限已经届满，否定认缴只是登记或公司不缺钱便可拒绝；到期出资应实际向公司足额履行。",
        acceptable:
          "‘章程约好的日子已经到了，不管公司现在缺不缺钱都该交’即可，不要求引用条号、五年规则或分别重复驳斥两句话。",
        boundary:
          "不能把公司不能清偿到期债务当作普通到期出资的必要条件；催缴失权、赔偿和其他责任不在本问必答范围。",
      },
      {
        id: "due-contribution-balance",
        label: "扣除已缴部分确定剩余20万元",
        meaning:
          "结合认缴30万元、已缴10万元，说明本次向公司补缴的出资为20万元，不能要求同一出资重复缴纳。",
        acceptable:
          "‘还差20万，应把这部分补进公司’可承接计算与履行对象，不要求写减法算式；与上一点合为一句也可。",
        boundary:
          "再缴30万元、无需缴款或直接按公司债务确定出资额均不对应本点；不要求分析利息、损害赔偿或他人份额。",
      },
    ],
    sources: [
      "commercial-contribution-article49",
      "commercial-contribution-articles47-266",
    ],
  },
  {
    id: "commercial-contribution-early-choice",
    caseId: earlyCaseId,
    relatedTopicIds: [topicId],
    kind: "objective",
    choiceMode: "single",
    title: "公司已无力清偿，未届期出资还能一概拒交吗？",
    facts: commercialContributionTimingCaseFacts[earlyCaseId],
    prompt: "仅对林遥的期限抗辩与公司本次请求，下列判断哪项正确？",
    options: [
      {
        id: "a",
        text: "章程约定2029年，所以无论公司状况如何，期限届满前一律不必缴纳。",
        explanation: "忽略公司不能清偿到期债务时的法定提前缴纳规则。",
      },
      {
        id: "b",
        text: "只有先宣告公司破产，公司才有权请求提前缴纳。",
        explanation: "第54条没有把先进入或宣告破产列为公司行使该项请求的条件。",
      },
      {
        id: "c",
        text: "本案已有不能清偿到期债务的完整事实，公司可请求提前缴纳，不能仅以2029年未到拒绝。",
        explanation:
          "到期债务与实际不能清偿在本案均有事实支撑，公司本身是法条明列的请求主体。",
      },
      {
        id: "d",
        text: "公司已经亏损，所以任何股东都须以个人财产无限清偿公司的全部债务。",
        explanation:
          "将特定提前出资请求混同亏损即无限担保，也忽略不能清偿到期债务的条件。",
      },
    ],
    answer: "c",
    hint: "同时核对债务是否到期、公司是否确实不能清偿，以及是谁请求缴纳。",
    reference:
      "选C。本案不是仅有亏损或债务到期：公司没有可用资产、可收债权或可筹资金，已不能清偿无争议的到期货款。公司本身可要求未届出资期限的股东提前缴纳，林遥不能只以2029年未到拒绝，不必先进入破产。这也不是股东对公司全部债务的无限担保。",
    sources: [
      "commercial-contribution-article54",
      "commercial-contribution-articles47-266",
    ],
  },
  {
    id: "commercial-contribution-early-explain",
    caseId: earlyCaseId,
    relatedTopicIds: [topicId],
    kind: "subjective",
    title: "结合清偿状况解释未届期抗辩",
    facts: commercialContributionTimingCaseFacts[earlyCaseId],
    prompt:
      "结合货款是否到期及公司的实际清偿状况，说明公司本次提前缴纳请求的条件；林遥能否仅以章程约定的2029年未到拒绝？",
    answer: "",
    hint: "先辨是否只有欠债或亏损，再分析尚未届期能否排除本次请求。",
    reference:
      "50万元货款已到期且无争议；财产调查、停产且不能筹得资金等事实表明公司确实不能清偿，不是只有一时账面余额少。公司本身可以据此请求已认缴而未届期的股东提前缴纳出资，所以林遥不能仅以2029年未到拒绝。这个请求无需以先破产为前提，所履行的是其对公司的出资，不等同无限承担公司全部债务。",
    criteria: [
      {
        id: "early-inability-premise",
        label: "把到期债务与实际不能清偿联系起来",
        meaning:
          "结合货款已经到期且无争议，以及无可用资产、可收债权、可筹资金等题述事实，说明公司确实不能清偿到期债务，不是仅凭亏损或有一笔到期欠款判断。",
        acceptable:
          "‘款已到期，公司确实没有钱或可用财产来还’可概括题设实际清偿状况；不要求逐列每项调查结果、固定术语、先终本或破产宣告。",
        boundary:
          "认可实际无力清偿的表达即应承认，不能因后续期限结论错误而连这一点也否认；单说公司有债或亏损不等于说明本点。",
      },
      {
        id: "early-company-request",
        label: "据此说明公司可请求提前缴纳并否定纯期限抗辩",
        meaning:
          "说明在前述条件下，公司本身有权要求已认缴未届期的股东提前缴纳出资；联系林遥尚未履行，不能仅因2029年未到就拒绝本次请求。",
        acceptable:
          "‘确实还不出到期债了，公司自己现在就可要他把未交的出资交进来，不能拿2029年挡住’可表达；无需复述第一点全部事实或写条号。",
        boundary:
          "如果仍认为期限未到一律可拒，或必须先破产才可请求，与本点相反。没有额外讨论金额、债权人直接受领、其他股东、程序或无限责任，不另作漏答；不能把本案结论推广为任何欠债都可提前要求全部出资。",
      },
    ],
    sources: [
      "commercial-contribution-article54",
      "commercial-contribution-articles47-266",
    ],
  },
];

export const commercialContributionTimingTopics: FaultTopic[] = [
  {
    id: topicId,
    title: "出资期限与提前缴纳",
    headline: "先看约定期限，再看是否有法定提前缴纳的条件。",
    goal: "区分到期出资的正常履行，与不能清偿到期债务时的提前缴纳请求。",
    prerequisite: "能把股东对公司的出资责任与公司对外债务分开。",
    minutes: "8–12",
    paragraphs: [
      "认缴不是只登记一个数字。股东应按合法有效的公司章程约定，按期足额向公司缴纳出资。期限已到，不需要再等公司缺钱或欠债才履行；计算剩余义务时应扣除已经实缴的部分。通常五年缴足的法定边界，也不让股东单方推翻合法约定的较早期限。",
      "出资期限未到，也不总能拒绝提前缴纳。公司不能清偿到期债务时，公司本身或已到期债权的债权人可要求已认缴而未届期的股东提前缴纳。先核到期债务与实际不能清偿，不能只因亏损、债务刚到期或账户某一刻余额少便直接下结论。",
      "提前缴纳仍是履行出资，不等于股东对公司全部债务无限担保。本单元第二案只讨论事实充分时公司自己请求提前缴纳，以及股东能否只凭期限未到拒绝；不展开债权人直接受领、各类金额与程序争议。两案均为2025年新设公司，不处理存量公司的期限过渡。",
    ],
    example: {
      title: "到期后只补尚未履行的20万元",
      facts: commercialContributionTimingCaseFacts[dueCaseId],
      analysis:
        "章程约定的期限已经届满，周宁认缴30万元、已缴10万元，应将剩余20万元交给公司。公司经营正常不影响这项到期义务，也不应把已缴的10万元再计算一次。",
    },
    pitfall:
      "把认缴当成不用实缴，或反过来把任何亏损都当成提前出资及个人无限兜底的理由。",
    recall: {
      prompt: "期限已经到了与尚未到期，公司要求缴纳时分别应先核什么？",
      reference:
        "已经到期先核章程约定和未缴余额；尚未到期则核是否满足法定提前缴纳条件，例如公司确实不能清偿到期债务。不能用认缴登记代替实际履行，也不能把仅有亏损等同不能清偿。",
    },
    sources: Object.keys(commercialContributionTimingSources),
    exercises: commercialContributionTimingExercises,
  },
];
export const commercialContributionTimingContentPack = {
  revision: commercialContributionTimingRevision,
  snapshot: {
    topics: commercialContributionTimingTopics,
    sources: commercialContributionTimingSources,
  },
};
export const commercialContributionTimingPublicRules = [
  {
    sourceId: "commercial-contribution-article49",
    title: "第49条：按期足额缴纳（教学摘要）",
    url: lawUrl,
    excerpt:
      "股东应按公司章程规定的期限足额履行认缴出资。货币出资应缴入公司银行账户。尚未履行的出资与已经履行的出资应区分，已到期履行不以公司不能清偿债务为前提。",
    checkedAt: "2026-10-11",
    scope: "正常出资履行，不含具体案情、参考答、赔偿或失权程序。",
  },
  {
    sourceId: "commercial-contribution-article54",
    title: "第54条：提前缴纳的法定条件（教学摘要）",
    url: lawUrl,
    excerpt:
      "公司不能清偿到期债务时，公司或已到期债权的债权人可要求已认缴、但未到出资期限的股东提前缴纳。要核对实际不能清偿到期债务，不能把单纯亏损等同这一条件；条文未要求先进入破产程序。",
    checkedAt: "2026-10-11",
    scope:
      "提前缴纳的基础条件与请求主体，不含具体题目结论、金额与直接受领等争议。",
  },
  {
    sourceId: "commercial-contribution-articles47-266",
    title: "第47、266条：新设公司期限与适用时间（教学摘要）",
    url: lawUrl,
    excerpt:
      "2023年修订公司法自2024年7月1日起施行。一般有限责任公司依章程约定、自成立之日起五年内缴足认缴出资；法律、行政法规及国务院决定有特别规定的，依特别规定。法定通常期限边界不推翻合法约定的较早缴款期限。",
    checkedAt: "2026-10-11",
    scope:
      "仅新设普通有限责任公司适用时间与期限背景，不包含存量过渡或具体题的参考答案。",
  },
];
