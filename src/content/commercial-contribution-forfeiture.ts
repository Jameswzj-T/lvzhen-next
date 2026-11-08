import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";

export const commercialContributionForfeitureRevision =
  "commercial-contribution-forfeiture-2026-10-15.v2";
const topicId = "commercial-contribution-forfeiture";
const sourceId = "commercial-forfeiture-articles51-52";
const sourceUrl =
  "https://guangdong.chinatax.gov.cn/gdsw/zjfg/2025-12/31/content_1203d9ef77944845aeca8ce79160292d.shtml";
export const commercialContributionForfeitureSources: ContentSources = {
  [sourceId]: {
    title: "《公司法》第51、52条：出资核查、催缴与股东失权",
    url: sourceUrl,
    note: "2026-10-15直接核读国家税务总局广东省税务局公开的2023年修订公司法全文，页面标有效；第51、52条规定书面催缴、至少60日宽限期、董事会决议及书面失权通知，失权限于未缴纳出资的股权。两案均为2025年新设有限公司，2026年合法货币出资期限已到，不涉及旧法过渡、出资加速到期、非货币出资估价、股权后续处置或损害赔偿。2026-10-15独立有界审校另取得人民日报公布的2023年公司法全文，核对第51、52条支持本组结论；该次广东税务页面超时，未独立复现此前有效标识，当前效力尚未全面证实。案例及采分要求自编，非官方真题或阅卷细则。",
  },
};
export const commercialContributionForfeitureCaseFacts = {
  "COMMERCIAL-FORFEITURE-GRACE-1":
    "本案为独立教学虚构。森禾印务有限公司于2025年成立，有三名股东。季宁认缴的30万元货币出资，按合法有效章程应于2026年4月30日前缴足，但一直未缴。董事会已核查确认这一情况，其他股东均已缴足出资。\n\n经理曾于5月1日打电话催款。公司直到6月1日才首次向季宁发出书面催缴书，当天签收，要求自发出之日起30日内缴足。7月2日仍未收到出资，经理提出：‘从5月打电话起已经超过60日，欠款也拖了很久，董事会现在作出决议，公司就可以马上发通知让他失权。’\n\n本问只核对该催缴时间安排能否支持7月2日立即失权，不判断赔偿、失权股权的后续处置或诉讼。",
  "COMMERCIAL-FORFEITURE-PARTIAL-1":
    "本案为另一独立教学虚构。泊岚设备有限公司于2025年成立，注册资本100万元，有三名股东。陆澄认缴货币出资40万元，已缴20万元；按合法有效章程，其余20万元应在2026年3月31日前缴足，其他股东均已缴足各自出资。\n\n董事会核查后，公司于4月2日发出书面催缴书并于当天送达，给予自发出之日起90日的宽限期。至7月3日，该期限已经届满，陆澄仍未补缴。董事会于7月4日依法作出决议，7月5日依决议发出书面失权通知，陆澄7月8日收到；催缴、决议与通知没有其他程序或效力争议。\n\n工作人员说：‘7月4日董事会一决定，陆澄全部40万元出资对应的股权就都丧失了，已缴的20万元对应股权也不能保留。’本问只判断依法失权的发生日期与股权范围，不计算股权处置后的持股比例，也不讨论异议起诉期限或赔偿。",
};
const common = {
  relatedTopicIds: [topicId],
  sources: [sourceId],
  hint: "把催缴、决议、发出通知和收到通知分开，再看未缴出资对应哪部分股权。",
};
const grace = {
  ...common,
  caseId: "COMMERCIAL-FORFEITURE-GRACE-1",
  facts:
    commercialContributionForfeitureCaseFacts["COMMERCIAL-FORFEITURE-GRACE-1"],
};
const partial = {
  ...common,
  caseId: "COMMERCIAL-FORFEITURE-PARTIAL-1",
  facts:
    commercialContributionForfeitureCaseFacts[
      "COMMERCIAL-FORFEITURE-PARTIAL-1"
    ],
};
const graceReference =
  "经理的理由不成立。用于失权程序的宽限期，应从6月1日公司发出书面催缴书起计算，不得少于60日；5月的电话催款不能替代这一起点。本案只给30日，至7月2日从书面催缴发出起也未满60日，不能据此立即使季宁失权。已经拖欠或补作董事会决议，均不能省略法定宽限期；到期出资义务仍须履行。";
const partialReference =
  "本案已有合格催缴，宽限期届满仍未补缴，并经董事会决议发出书面失权通知，失权自7月5日通知发出之日起发生，不是7月4日作出决议时，也不是7月8日收到时。失权仅涉及尚未缴纳的20万元出资对应股权，已缴20万元对应股权保留，不能把陆澄全部40万元对应的股权一并剥夺。";

export const commercialContributionForfeitureExercises: UnitExercise[] = [
  {
    ...grace,
    id: "commercial-forfeiture-grace-choice-v2",
    kind: "objective",
    choiceMode: "single",
    title: "电话催过款，就能缩短书面宽限期吗？",
    prompt: "对经理主张的7月2日立即失权，下列判断哪项正确？",
    options: [
      {
        id: "a",
        text: "5月电话催款已启动宽限期，现在超过60日，可以直接失权。",
        explanation:
          "用于失权的法定宽限期从发出书面催缴书起算，电话催款不能替代。",
      },
      {
        id: "b",
        text: "董事会只要一致同意，就可以将本案宽限期缩为30日。",
        explanation: "董事会决议不能替代或缩短不得少于60日的法定宽限期。",
      },
      {
        id: "c",
        text: "从6月1日书面催缴发出起应给至少60日，现有安排不能支持7月2日立即失权。",
        explanation:
          "本案首次书面催缴后只给30日，不能把此前电话催款算入法定宽限期。",
      },
      {
        id: "d",
        text: "季宁在4月30日到期未缴时就自动失权，此后催缴与通知均无必要。",
        explanation: "逾期未出资不等于自动丧失股权，失权仍须符合法定程序。",
      },
    ],
    answer: "c",
    reference: "选C。" + graceReference,
  },
  {
    ...grace,
    id: "commercial-forfeiture-grace-explain-v2",
    kind: "subjective",
    title: "书面催缴只给了30日",
    prompt:
      "本案用于失权的宽限期应从何时起算、至少多久？经理能否凭此前电话催款和长期拖欠，主张7月2日立即失权？请结合题设说明。",
    answer: "",
    reference: graceReference,
    criteria: [
      {
        id: "forfeiture-written-grace",
        label: "从书面催缴发出起给予至少60日",
        meaning:
          "联系6月1日首次书面催缴，说明用于失权的宽限期自书面催缴发出之日起不得少于60日，不能从此前电话催款起算。",
        acceptable:
          "“书面催缴才一个月，还不足至少60日，不能现在失权”可与后项一句覆盖；不强制复写日期、条号或另列反驳电话的一句。",
        boundary:
          "不能以口头催款或出资到期日代替书面催缴发出日，也不能把30日当作法定最低宽限期；不要求算出准确届满日期。",
      },
      {
        id: "forfeiture-no-premature-loss",
        label: "未满足宽限期不能立即失权",
        meaning:
          "联系仅给30日、至7月2日未满法定最低宽限期，否定经理此时立即失权的主张；长期拖欠或董事会决议不能省略该条件。",
        acceptable:
          "“书面催缴后还不到60日，所以现在不能让他失权”足够，不必另把长期拖欠与决议各反驳一次。",
        boundary:
          "只背60日而未判断本案能否立即失权不完整；明确认为拖欠久或董事会决定即可提前失权，与本项相反。前项正确内容独立保留；不另要求讨论出资债务、赔偿或诉讼。结论仅限此时不能失权，不推定原30日催缴经过60日自然补正，也不认为届满自动失权；这些后续问题不列为必答。前项规则答对而本项应用错误，不代表整问或宽限制度已掌握。",
      },
    ],
  },
  {
    ...partial,
    id: "commercial-forfeiture-partial-choice-v2",
    kind: "objective",
    choiceMode: "single",
    title: "已缴一半出资，丧失哪部分股权？",
    prompt: "依本案已完成的程序，陆澄从何日起丧失哪部分股权？",
    options: [
      {
        id: "a",
        text: "7月4日丧失全部40万元出资对应股权。",
        explanation: "董事会决议不等于通知发出，且失权不能扩到已缴部分。",
      },
      {
        id: "b",
        text: "7月5日丧失未缴20万元对应股权，已缴20万元对应股权保留。",
        explanation:
          "法定发生时点是书面失权通知发出之日，范围限于未缴纳出资的股权。",
      },
      {
        id: "c",
        text: "7月8日丧失未缴20万元对应股权，收到前仍不发生失权。",
        explanation:
          "把接到通知与发出通知混同；收到通知的时间不替代本问的失权发生时点。",
      },
      {
        id: "d",
        text: "因为已经缴过20万元，所以剩余未缴部分也不能适用失权。",
        explanation: "部分实缴不能阻止未缴部分在法定程序完成后发生失权。",
      },
    ],
    answer: "b",
    reference: "选B。" + partialReference,
  },
  {
    ...partial,
    id: "commercial-forfeiture-partial-explain-v2",
    kind: "subjective",
    title: "决议、通知与已缴部分",
    prompt:
      "工作人员关于失权日期和全部股权的说法是否正确？请分别说明本案依法发生失权的日期及范围。",
    answer: "",
    reference: partialReference,
    criteria: [
      {
        id: "forfeiture-notice-dispatch",
        label: "自书面失权通知发出之日起发生",
        meaning:
          "在本案催缴宽限期届满仍未履行且已经董事会决议的前提下，说明7月5日书面失权通知发出才发生失权，不是7月4日决议时或7月8日收到时。",
        acceptable:
          "“应从5日发出失权通知时算”即可；不强求重述已经给定的全部程序或逐一排除另外两日；可与范围合写，也可先答范围再答日期。",
        boundary:
          "明确把决议日或接到通知日作为发生时点与本项相反；不把本项扩为任何送达规则，也不另考30日异议起诉期限。",
      },
      {
        id: "forfeiture-unpaid-equity-only",
        label: "只丧失未缴出资对应股权",
        meaning:
          "联系认缴40万元、实缴20万元，说明仅丧失未缴20万元对应股权，已缴20万元对应股权仍保留，否定全部剥夺。",
        acceptable:
          "“只失去没缴的那一半，已缴那一半仍留着”可完整表达，不强制写出万元或公司持股百分比。",
        boundary:
          "不能因部分未缴就丧失全部，也不能因已缴一部分就保住全部；前项日期判断与本项范围分别核对。不要求讨论失权股权处置或返还已缴出资。",
      },
    ],
  },
];

export const commercialContributionForfeitureTopics: FaultTopic[] = [
  {
    id: topicId,
    title: "出资催缴与股东失权",
    headline: "逾期未缴不自动失权，先核程序，再看未缴部分",
    goal: "辨别催缴宽限期、失权通知的发生时点与部分出资的股权范围。",
    prerequisite: "先理解股东按章程期限缴足认缴出资的义务。",
    minutes: "10–15",
    paragraphs: [
      "有限公司成立后，董事会应核查股东出资。发现未按章程期限足额缴纳，应由公司发出书面催缴书。打过电话、欠款拖得久，都不能替代用于失权程序的书面催缴。",
      "书面催缴载明的宽限期，自公司发出催缴书之日起不得少于60日。期限届满仍未履行，公司经董事会决议可以发出书面失权通知；不是逾期当天自动失权，也不是一有董事会决议就生效。",
      "失权自书面失权通知发出之日起发生，只涉及未缴纳出资的股权。部分已缴的，不能把对应股权一并剥夺。股东有异议的，应自接到失权通知之日起30日内起诉；这个起诉期限与失权发生时点要分开。",
    ],
    example: {
      title: "书面催缴只给了30日",
      facts: grace.facts,
      analysis: graceReference,
    },
    pitfall:
      "把电话催款算作法定宽限期起点、把决议或收到通知当作失权时点，或者因一部分未缴而剥夺全部股权。",
    recall: {
      prompt: "催缴至少留多久？失权何时发生，部分出资的范围怎样确定？",
      reference:
        "从发出书面催缴书起给至少60日；届满仍未履行，经董事会决议发出书面失权通知，自发出日起丧失未缴出资对应股权，已缴部分对应股权保留。",
    },
    sources: [sourceId],
    exercises: commercialContributionForfeitureExercises,
  },
];
export const commercialContributionForfeitureContentPack = {
  revision: commercialContributionForfeitureRevision,
  snapshot: {
    topics: commercialContributionForfeitureTopics,
    sources: commercialContributionForfeitureSources,
  },
};
export const commercialContributionForfeiturePublicRules = [
  {
    sourceId,
    title: "公司法第51、52条：催缴与失权（法条原文）",
    url: sourceUrl,
    excerpt:
      "第五十一条　有限责任公司成立后，董事会应当对股东的出资情况进行核查，发现股东未按期足额缴纳公司章程规定的出资的，应当由公司向该股东发出书面催缴书，催缴出资。\n未及时履行前款规定的义务，给公司造成损失的，负有责任的董事应当承担赔偿责任。\n第五十二条　股东未按照公司章程规定的出资日期缴纳出资，公司依照前条第一款规定发出书面催缴书催缴出资的，可以载明缴纳出资的宽限期；宽限期自公司发出催缴书之日起，不得少于六十日。宽限期届满，股东仍未履行出资义务的，公司经董事会决议可以向该股东发出失权通知，通知应当以书面形式发出。自通知发出之日起，该股东丧失其未缴纳出资的股权。\n依照前款规定丧失的股权应当依法转让，或者相应减少注册资本并注销该股权；六个月内未转让或者注销的，由公司其他股东按照其出资比例足额缴纳相应出资。\n股东对失权有异议的，应当自接到失权通知之日起三十日内，向人民法院提起诉讼。",
    checkedAt: "2026-10-15",
    scope:
      "2023年修订文本第51、52条，作者此前直接核读的公开全文，页面当时标有效；独立审校核对条文，未全面证实现行效力；这里只提供中性法条，不含具体案情、答案或采分要求。练习范围为书面催缴、法定宽限期、失权通知和未缴股权，不展开赔偿或失权股权后续处置。",
  },
];
