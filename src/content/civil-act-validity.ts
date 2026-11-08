import type {
  ContentSources,
  Criterion,
  FaultTopic,
  UnitExercise,
} from "./fault-unit";

/** Original teaching candidate; importing it does not register or enable review. */
export const civilActValidityRevision = "civil-act-validity-2026-10-05.v1";

const codeUrl =
  "https://flk.npc.gov.cn/detail?id=ff808081729d1efe01729d50b5c500bf";
const interpretationUrl =
  "https://flk.npc.gov.cn/detail?id=ff80818181cdceb30181d2c0af9e2339";
const sourceNote =
  "本包直接读取法源专员本轮保存的全国人大法规库官方附件，并复用其2026-10-05取得的有效记录；作者未重新查询当晚状态。限本人普通动产交易的真实意思与效力基础，不代表2027完整大纲、全部效力争议或模型效果已验。";

export const civilActValiditySources = {
  "civil-validity-genuine": {
    title: "《民法典》第143条：真实意思与基本有效条件",
    url: codeUrl,
    note: sourceNote,
  },
  "civil-validity-simulation": {
    title: "《民法典》第146条第1款：双方虚假意思表示",
    url: codeUrl,
    note:
      sourceNote +
      "本案明确没有另行真实交易，只判断表面买卖；不将第2款隐藏行为效力另设为必答。",
  },
  "civil-validity-fraud": {
    title: "《民法典》第148条：一方欺诈与受欺诈方请求撤销",
    url: codeUrl,
    note: sourceNote,
  },
  "civil-validity-fraud-facts": {
    title: "总则编解释第21条：故意虚假信息与错误认识的联系",
    url: interpretationUrl,
    note: sourceNote + "只采用故意告知虚假情况的路径，不另展开第三人欺诈。",
  },
  "civil-validity-duress": {
    title: "《民法典》第150条：胁迫与受胁迫方请求撤销",
    url: codeUrl,
    note: sourceNote + "本题行为人是相对人，不另展开第三人胁迫。",
  },
  "civil-validity-duress-facts": {
    title: "总则编解释第22条：近亲属人身威胁与恐惧下签约",
    url: interpretationUrl,
    note: sourceNote,
  },
  "civil-validity-effect": {
    title: "《民法典》第155条：无效或被撤销行为的约束力",
    url: codeUrl,
    note:
      sourceNote +
      "仅供知识卡区分无效与可请求撤销，不把返还、赔偿、期限或全部责任加回本组必答。",
  },
} satisfies ContentSources;

export const civilActValidityPreparation = {
  subjectId: "civil-law",
  themeId: "civil-act-genuine-intent",
  title: "民法 / 总则 / 真实意思与法律行为效力",
  stage: "isolated-content-candidate",
  registeredByThisModule: false,
  caseCount: 4,
  formCount: 4,
  knowledgeCardCount: 1,
  teachingBasis: "自编教学案例与逐项要求，非官方试题或官方阅卷细则。",
  scope:
    "仅分析本人普通动产交易的真实自愿、双方虚假表示、一方欺诈及相对人胁迫；不改旧题或旧版本，不另考订立过程、代理、限制行为能力、重大误解、显失公平、全部违法效力、撤销期限、返还赔偿或物权变动。",
  sourceEvidence: {
    civilCode: {
      recordId: "ff808081729d1efe01729d50b5c500bf",
      statusLabel: "有效",
      statusObservedByIndependentReviewerAtUtc:
        "2026-10-05T04:38:40.162321+00:00",
      documentSHA256:
        "6926a597a66c5aad4803591ce9a51a8eebe847260f5ba2805210b608ded78353",
      extractedTextSHA256:
        "8850fb19d67a89dd4b7e7078d9895d0f7350e2680fee9996c0d0cebe037d298c",
      readArticles: [143, 146, 148, 150, 155],
    },
    generalProvisionsInterpretation: {
      recordId: "ff80818181cdceb30181d2c0af9e2339",
      statusLabel: "有效",
      statusReusedFromSameRoundIndependentReviewer: true,
      documentSHA256:
        "fc5891e547f7b1fd6ed917b10daadbaf487332b4948df394f78095b192641e1f",
      extractedTextSHA256:
        "19f0c31e8af93814d6b62fa88bb0aaab8b27ccc0f0daad2e07dbb01916075f7d",
      readArticles: [21, 22],
    },
    statusFreshlyQueriedByThisAuthor: false,
    boundary:
      "两份本轮官方附件已直接读取，不将民法典记录的查询时点移给解释记录，也不冒称作者重新查询、完整年度效力或全部效力问题已验。",
  },
  freeAnswerMode: "完整自由作答与参考自检",
  modelReviewStatus: "未接模型，不生成总分或永久掌握结论。",
} as const;

const commonFacts =
  "本案为虚构普通动产交易。双方均为具备相应民事行为能力的成年人，以自己的名义作出题述买卖表示。本问只判断给定事实对行为效力或请求撤销路径的影响，除所述意思形成问题外，题设排除其他效力障碍；不另争订立过程、代理或物权变动，也不涉及撤销权期间、放弃或返还赔偿。";

export const civilActValidityCaseFacts = {
  "civil-validity-V1":
    commonFacts +
    "陆予向沈桐买一张沈桐自有的普通旧书桌。陆予亲自量过尺寸，核对了沈桐如实说明的状况和价款，当时认可谈定条件，自愿签下买卖合同；没有不实告知或威胁。第二天陆予重新安排预算，觉得留着这笔钱更合适，称“我现在不想要这个价，昨天的合同就无效”。",
  "civil-validity-V2":
    commonFacts +
    "奚远与温澄为让店铺展示页显得有成交，签下一份台灯买卖单并公开展示。事前聊天明确“两人都不买不卖，不交货不付款，只把单子摆出来”，双方也都按这一安排理解这张单子，没有另行真实交易。后来奚远仅凭这张买卖单要求温澄依买卖交货。",
  "civil-validity-V3":
    commonFacts +
    "洪宁出售自有二手相机，明知相机实际于2018年生产，其保存的原发票也显示2018年。苏颖明确告诉洪宁，自己只买2025年生产的设备，2018年的不会购买。洪宁为促成交易，遮去原年份，出示自己改写成2025年的信息，并当面确认该年份；苏颖相信后按该条件签约。随后苏颖取得未改写的原发票，发现真实年份。洪宁说“你自己签了，就不能再纠正这份交易”。",
  "civil-validity-V4":
    commonFacts +
    "季岑先明确拒绝以1000元将自有电吉他卖给岑铭。岑铭随后持铁棍堵住季岑的弟弟，说“不照这个价签，我现在就打他”，举棍逼近。季岑担心弟弟马上被打，说“先别动手，我签”，为让对方停止逼近而签下合同。岑铭称“字由你亲手写，没有撤销的理由”。",
} as const;

const voluntaryReference =
  "陆予在签约时了解如实说明的状况和价款，认可谈定条件，自愿签约；第二天调整预算只是后来改变想法，不能据此反推原表示不真实。第143条将真实意思与相应行为能力、合法性等作为基本有效条件，本题已排除其他效力障碍。仅凭事后后悔，不能说明原合同无效；也不能把亲手签字单独当成所有交易都有效的依据。";

const fraudCriteria: Criterion[] = [
  {
    id: "civil-validity-fraud-information-application",
    label: "故意虚假年份与签约意思的联系",
    meaning:
      "洪宁明知相机实际2018年生产，仍向明确只买2025年设备的苏颖提供改写信息并确认2025年，使苏颖基于错误认识、违背真实意思签约，符合本案一方欺诈的路径。",
    acceptable:
      "‘他知道真实年份还故意改成她肯买的年份，让她被骗才买’可表达本项；不要求逐一写遮盖、改写和口头确认，不要求原话引用或固定‘欺诈’术语。",
    boundary:
      "只说年份不对而未联系故意虚假信息与苏颖签约的原因，为部分表达；把误写、双方都不想买卖补成事实，会改变题设。规则和本案联系可综合写，不要求额外鉴定商品质量、重大误解或其他效力障碍。",
  },
  {
    id: "civil-validity-fraud-revocation-path",
    label: "受欺诈方的撤销路径与签字理由",
    meaning:
      "受欺诈的苏颖可请求人民法院或者仲裁机构撤销该买卖行为；亲自签字不排除这一法定路径，洪宁所说不能纠正的理由不能成立。",
    acceptable:
      "‘苏颖是被故意假年份诱导签的，可以向法院申请撤销，自己签字挡不住这个请求’可综合表达；只选法院或仲裁机构这一合法途径即可，不要求两者同时列出、固定条号或另拆结论句。",
    boundary:
      "不能把欺诈直接说成行为当然无效，或把单方发一句后悔通知等同于已完成撤销。已联系本案并说明苏颖有权请求撤销时，未另写‘不是自动无效’不单独作漏答。不要求撤销期限、其他责任、返还赔偿或完整诉讼步骤；前项表述不足不抹去本项已经正确表达的路径。",
  },
];

const duressCriteria: Criterion[] = [
  {
    id: "civil-validity-duress-threat-application",
    label: "近亲属威胁与违背原意签约的联系",
    meaning:
      "岑铭以立即殴打季岑弟弟相威胁并举棍逼近，使此前明确拒售的季岑因担心弟弟受伤而违背原意签约，符合本案胁迫的路径。",
    acceptable:
      "‘他拿打弟弟逼她接受原本拒绝的价，她怕弟弟挨打才签’等义联系可接受；不要求逐动作列举、固定‘恐惧心理’或‘胁迫’术语。",
    boundary:
      "不能只因价款低或曾经拒售就认定胁迫，也不能只说发生争吵而不联系人身威胁及签约原因。已用题设威胁和被迫签约说明联系时，不要求另设心理证明、实际打伤或刑事定罪；日常语言可承接规则与本案应用。",
  },
  {
    id: "civil-validity-duress-revocation-path",
    label: "受胁迫方的撤销路径与亲签理由",
    meaning:
      "受胁迫的季岑可请求人民法院或者仲裁机构撤销该买卖行为；亲手签字不能排除因胁迫而请求撤销的路径，岑铭所说没有撤销理由不能成立。",
    acceptable:
      "‘她为免弟弟被打才签，能够向法院请求撤销；亲手写字不能让这种威胁下的交易免于纠正’可综合表达；法院或仲裁机构任选其一，不要求两者并列、固定条号或独立结论句。",
    boundary:
      "不能把受到威胁直接说成行为当然无效，或把自己撕掉合同等同于已经撤销。已结合本案说明季岑有权请求撤销时，未另写‘不是自动无效’不单独作漏答。不要求撤销期限、实际损害、其他责任或逐步骤起诉；前项术语不足不抹去本项正确路径。",
  },
];

export const civilActValidityExercises: UnitExercise[] = [
  {
    id: "civil-validity-voluntary-regret",
    caseId: "civil-validity-V1",
    relatedTopicIds: ["civil-act-genuine-intent"],
    kind: "objective",
    choiceMode: "single",
    title: "第二天觉得留钱更合适",
    facts: civilActValidityCaseFacts["civil-validity-V1"],
    prompt: "仅就陆予所说的事后改主意，哪项准确判断原买卖行为的效力？",
    options: [
      {
        id: "a",
        text: "只要陆予亲手签过字，无论签约时的意思如何，任何交易都有效。",
        explanation: "签字不能单独替代真实意思及其他有效条件。",
      },
      {
        id: "b",
        text: "陆予签约时真实自愿且无其他效力障碍，后来调整预算本身不能使原买卖无效。",
        explanation: "区分签约时的真实选择与后来改变想法。",
      },
      {
        id: "c",
        text: "第二天更想留钱，便证明昨天的意思表示一直是虚假的。",
        explanation: "后来的预算选择不能直接改写签约时已经给出的真实意思。",
      },
      {
        id: "d",
        text: "陆予只要宣布现在不想要，就已经依法撤销了原合同。",
        explanation:
          "单纯后悔不提供本题所需的法定撤销事由，也不等同于完成撤销。",
      },
    ],
    answer: "b",
    hint: "分别看签约时知道、认可什么，以及第二天究竟改变了什么。",
    reference: "选B。" + voluntaryReference,
    sources: ["civil-validity-genuine"],
  },
  {
    id: "civil-validity-simulated-sale",
    caseId: "civil-validity-V2",
    relatedTopicIds: ["civil-act-genuine-intent"],
    kind: "objective",
    choiceMode: "single",
    title: "两人都只想把单子摆出来",
    facts: civilActValidityCaseFacts["civil-validity-V2"],
    prompt: "仅就双方这份表面台灯买卖行为的效力，哪项判断准确？",
    options: [
      {
        id: "a",
        text: "展示页有双方签字的单子，就必须认定双方真想按买卖交货付款。",
        explanation: "忽略双方事前均明确不买不卖、只作展示的事实。",
      },
      {
        id: "b",
        text: "双方都知道只作展示，因此温澄必然是一方欺诈中的受骗购买人。",
        explanation: "双方共同知道不做买卖，不是其中一方因错误认识受骗订约。",
      },
      {
        id: "c",
        text: "因为尚未交货付款，任何买卖表示都不需要分析效力。",
        explanation: "是否交货付款不能替代对已经给出的双方虚假表示的判断。",
      },
      {
        id: "d",
        text: "双方以虚假意思表示实施表面买卖，该买卖行为无效。",
        explanation: "对应双方都不愿按表面买卖受约束及第146条第1款。",
      },
    ],
    answer: "d",
    hint: "这张买卖单与双方事前真实安排是否一致？有没有哪一方被蒙骗？",
    reference:
      "选D。奚远与温澄事前明确都不买不卖、不交货不付款，只将单子摆出来，双方均知晓并按此理解。表面买卖不反映双方真实意思，依第146条第1款无效，不能仅凭签字或展示页要求依这份虚假买卖交货。这与一方受骗、因错误认识订约不同；题设没有另行真实交易，不另判断隐藏行为的效力。",
    sources: ["civil-validity-simulation"],
  },
  {
    id: "civil-validity-fraud-signed",
    caseId: "civil-validity-V3",
    relatedTopicIds: ["civil-act-genuine-intent"],
    kind: "subjective",
    title: "年份被改写之后的签字",
    facts: civilActValidityCaseFacts["civil-validity-V3"],
    prompt:
      "洪宁所说“你自己签了，就不能再纠正”能否成立？请联系具体信息、苏颖签约的原因及法定纠正途径说明。不要求撤销期限或返还赔偿分析。",
    hint: "把洪宁知道、提供的信息与苏颖为什么签约连起来，再说明谁可以请求怎样纠正。",
    reference:
      "洪宁的理由不能成立。洪宁明知相机2018年生产，仍针对苏颖明确只买2025年设备的选择提供虚假年份，苏颖因相信这一信息而签约；故意虚假信息与错误认识下的签约有具体联系，符合第148条及总则编解释第21条所述的一方欺诈路径。受欺诈的苏颖有权请求人民法院或者仲裁机构撤销该买卖行为，亲自签字不能排除这一途径。这里是可请求撤销，不是只要查出欺诈便已经当然无效；未要求另行计算撤销期限、返还或赔偿。",
    criteria: fraudCriteria,
    sources: ["civil-validity-fraud", "civil-validity-fraud-facts"],
  },
  {
    id: "civil-validity-duress-signed",
    caseId: "civil-validity-V4",
    relatedTopicIds: ["civil-act-genuine-intent"],
    kind: "subjective",
    title: "为了让铁棍停下而签约",
    facts: civilActValidityCaseFacts["civil-validity-V4"],
    prompt:
      "岑铭所说“字由你亲手写，没有撤销的理由”能否成立？请联系现场威胁、季岑此前的选择和签约原因，说明法定处理路径。不要求刑事责任、撤销期限或返还赔偿分析。",
    hint: "比较季岑原本是否愿意，以及这次亲签是在什么具体压力下作出的。",
    reference:
      "岑铭的理由不能成立。季岑本来明确拒售，岑铭却以立即殴打其弟弟相威胁并举棍逼近；季岑担心弟弟受伤，为停止威胁才签，具体说明人身威胁如何使其违背原意作出表示，符合第150条及总则编解释第22条所述的胁迫路径。受胁迫的季岑有权请求人民法院或者仲裁机构撤销该买卖行为，亲手写字不替代真实自愿，也不排除请求撤销。这里仍区分可请求撤销与当然无效；不要求已经打伤、另作刑事定罪或计算期限、返还赔偿。",
    criteria: duressCriteria,
    sources: ["civil-validity-duress", "civil-validity-duress-facts"],
  },
];

export const civilActValidityCases = Object.entries(
  civilActValidityCaseFacts,
).map(([id, facts]) => ({
  id,
  title: civilActValidityExercises.find((q) => q.caseId === id)!.title,
  usage: "training" as const,
  exerciseIds: civilActValidityExercises
    .filter((q) => q.caseId === id)
    .map((q) => q.id),
  facts,
}));

export const civilActValidityTopics: FaultTopic[] = [
  {
    id: "civil-act-genuine-intent",
    title: "真实意思与法律行为效力",
    headline: "签了字，是否就无须再看真实意思？",
    goal: "联系当事人原意、信息或威胁与签约的关系，区分真实自愿、双方虚假无效及受欺诈或胁迫一方可请求撤销的路径。",
    prerequisite:
      "先区分合同成立与效力：已经形成表面合意，还要看行为的效力；可先读合同成立，再进入本节。",
    minutes: "10–15",
    paragraphs: [
      "形成表面合意与判断行为有效，是不同的问题。第143条以相应民事行为能力、真实意思及合法性等作为基本有效条件。本组排除其他效力障碍，集中看意思的形成：签约时了解真实情况并自愿选择，后来单纯后悔不反推原表示不真实；签字本身也不能替代所有有效条件。",
      "双方都不愿按表面表示受约束，却共同作出该表示，属于第146条第1款的双方虚假意思表示，表面行为无效。应联系双方事前真实安排，不把一方后来反悔当成双方通谋虚假。本组没有另行真实交易；若另以虚假表示隐藏其他行为，其效力须依有关规定判断，不能从表面无效直接得出隐藏行为也无效。",
      "一方故意告知虚假情况，使对方因错误认识、违背真实意思作出表示，受欺诈方可依第148条请求人民法院或者仲裁机构撤销；总则编解释第21条进一步说明虚假信息与错误认识的联系。本组看明知年份仍故意改写，并影响对方的明确购买选择，不把一般写错信息或双方共同作假混为一方欺诈。",
      "以伤害本人或近亲属等的人身、财产或其他合法权益相要挟，迫使其因恐惧作出表示，可依第150条和总则编解释第22条分析胁迫；受胁迫方有权请求人民法院或者仲裁机构撤销。联系具体威胁、原本的选择及被迫签约，不只凭低价、争吵或亲手签字作结论，也不要求威胁已经变成实际伤害。",
      "双方虚假表示的无效与欺诈、胁迫中的可请求撤销需要区分。欺诈或胁迫不表示行为已经当然无效；第155条规定，无效或被撤销的行为自始没有法律约束力。本节只建立这一区分，不展开撤销期限、返还赔偿或全部效力争议。",
    ],
    example: {
      title: "第二天觉得留钱更合适",
      facts: civilActValidityCaseFacts["civil-validity-V1"],
      analysis: voluntaryReference,
    },
    pitfall:
      "先看签约时双方各自的真实选择及信息、压力如何影响表示，再判断效力或撤销路径；不要把后来反悔、双方作假和一方受骗混在一起，也不要把亲签或存在欺诈胁迫当成自动结论。",
    recall: {
      prompt:
        "双方都不想做表面买卖，与一方故意给假信息让另一方误签，效力或纠正路径有什么不同？为什么亲手签字不能代替这一判断？",
      reference:
        "双方共同作出虚假表示的表面买卖无效；一方欺诈使另一方违背真实意思签约，受欺诈方可请求法院或者仲裁机构撤销，不是自动无效。亲手签字仍可能是受假信息或威胁影响的表示，须联系其形成原因判断。",
    },
    sources: Object.keys(civilActValiditySources),
    exercises: civilActValidityExercises,
  },
];

/** Placement only; shared registration is reserved for the main integrator. */
export const civilActValidityPlacement = {
  subjectId: "civil-law",
  section: "总则 / 民事法律行为",
  topicId: "civil-act-genuine-intent",
  suggestedAfterTopicId: "civil-contract-formation",
  suggestedBeforeTopicId: "civil-contract-performance-defense",
} as const;

export const civilActValidityTopic = civilActValidityTopics[0];
export const civilActValidityChapter = {
  id: "CIV-ACT-VALIDITY",
  title: "真实意思与法律行为效力",
  section: "总则 / 民事法律行为",
  topicIds: [civilActValidityTopic.id],
};
export const civilActValidityContentPack = {
  revision: civilActValidityRevision,
  snapshot: {
    topics: civilActValidityTopics,
    sources: civilActValiditySources,
  },
};
export const civilActValidityDefaultQueues = {
  objective: civilActValidityExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilActValidityExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilActValidityQuestion(id: string) {
  return civilActValidityExercises.find((q) => q.id === id);
}
export function civilActValidityTopicForQuestion(id: string) {
  return civilActValidityQuestion(id) ? civilActValidityTopic : undefined;
}
export function civilActValiditySameCaseQuestions(id: string) {
  const q = civilActValidityQuestion(id);
  return q
    ? civilActValidityExercises.filter((item) => item.caseId === q.caseId)
    : [];
}

/** First-answer projection; reference, hint, key and rubric remain answer-side. */
export function civilActValidityPromptMaterial(id: string) {
  const q = civilActValidityQuestion(id);
  if (!q) return null;
  return {
    id: q.id,
    caseId: q.caseId,
    revision: civilActValidityRevision,
    title: q.title,
    kind: q.kind,
    facts: q.facts,
    prompt: q.prompt,
    ...(q.options
      ? { options: q.options.map(({ id, text }) => ({ id, text })) }
      : {}),
  };
}
