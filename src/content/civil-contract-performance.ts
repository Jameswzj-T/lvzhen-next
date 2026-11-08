import type {
  ContentSources,
  Criterion,
  FaultTopic,
  UnitExercise,
} from "./fault-unit";

/** Original teaching candidate; importing it does not register or enable review. */
export const civilContractPerformanceRevision =
  "civil-contract-performance-2026-10-05.v1";

const codeUrl =
  "https://flk.npc.gov.cn/detail?id=ff808081729d1efe01729d50b5c500bf";
const sourceNote =
  "本包直接读取全国人大法规库本轮官方附件所列条款，复用法源专员2026-10-05取得的有效记录。限普通动产买卖的履行抗辩，不代表2027完整大纲、全部合同解释或模型效果已验。";

export const civilContractPerformanceSources = {
  "civil-performance-simultaneous": {
    title: "《民法典》第525条：没有先后顺序时的履行请求",
    url: codeUrl,
    note: sourceNote,
  },
  "civil-performance-prior": {
    title: "《民法典》第526条：先履行一方未履行时的请求抗辩",
    url: codeUrl,
    note: sourceNote,
  },
  "civil-performance-insecurity": {
    title: "《民法典》第527条：确切风险证据与中止履行",
    url: codeUrl,
    note:
      sourceNote +
      "本题只审已有材料能否支持中止，不把未取得确切证据写成对方必然没有风险，也不另考违约赔偿。",
  },
  "civil-performance-resumption": {
    title: "《民法典》第527、528条：风险中止及适当担保后的恢复",
    url: codeUrl,
    note:
      sourceNote +
      "第528条采用及时通知与取得适当担保后应恢复履行两句；本组不展开合理期限后的解除或赔偿。",
  },
} satisfies ContentSources;

export const civilContractPerformancePreparation = {
  subjectId: "civil-law",
  themeId: "civil-contract-performance-defense",
  title: "民法 / 合同通则 / 合同履行抗辩",
  stage: "isolated-content-candidate",
  registeredByThisModule: false,
  caseCount: 4,
  formCount: 4,
  knowledgeCardCount: 1,
  teachingBasis: "自编教学案例与逐项要求，非官方试题或官方阅卷细则。",
  scope:
    "以合同成立且有效为题设前提，只判断履行请求的拒绝、风险中止与担保后的恢复；不另考代理、订立效力、物权变动、解除或损害赔偿。",
  sourceEvidence: {
    recordId: "ff808081729d1efe01729d50b5c500bf",
    statusLabel: "有效",
    statusObservedByIndependentReviewerAtUtc:
      "2026-10-05T04:38:40.162321+00:00",
    statusFreshlyQueriedByThisAuthor: false,
    documentSHA256:
      "6926a597a66c5aad4803591ce9a51a8eebe847260f5ba2805210b608ded78353",
    extractedTextSHA256:
      "8850fb19d67a89dd4b7e7078d9895d0f7350e2680fee9996c0d0cebe037d298c",
    readArticles: [525, 526, 527, 528],
    boundary:
      "复用同轮官方记录及附件，四条已直读；不冒称作者重新查询当晚效力，不确认特殊交易、全部解释或2027完整年度范围。",
  },
  freeAnswerMode: "完整自由作答与参考自检",
  modelReviewStatus: "未接模型，不生成总分或永久掌握结论。",
} as const;

const commonFacts =
  "本案为虚构普通动产买卖；双方以自己的名义订约，具备相应民事行为能力，合同已经成立且有效。本问只分析相关履行请求或中止、恢复履行，不另展开其他争议。";

export const civilContractPerformanceCaseFacts = {
  "civil-performance-P1":
    commonFacts +
    "林澜向颜舟买一台二手打印机，价款2200元，约定10月8日15时交货并付款，没有谁先谁后的约定。届时林澜已带齐价款，但颜舟未带打印机，也未提出同时交付，只要求林澜先把钱全部转给他，随后再约送货。林澜表示可以按约交换，现在暂不付款。",
  "civil-performance-P2":
    commonFacts +
    "魏禾向沈牧订购20张瑜伽垫，约定沈牧10月9日10时交齐、魏禾当日16时付款，并明确按先交货后付款的顺序履行。到16时沈牧仍未交付任何一张，也没有其他妨碍交付的情形，却要求魏禾立即付款；魏禾备齐价款，表示交货后按约付款。",
  "civil-performance-P3":
    commonFacts +
    "邱芷向顾湛订30箱打印纸，约定邱芷10月10日先付价款，顾湛次日交货。付款前，一名朋友说“听人讲这家店资金很紧”，但说不出消息来源、债务或经营事实，也没有提供任何可核实资料。邱芷没有取得其他风险材料，仅据这句话宣布暂不付款。",
  "civil-performance-P4":
    commonFacts +
    "乔予向程珂出售一套乐器，约定先交货、七日后付款。交货前乔予取得经双方确认真实的经营账册与催收材料：程珂连续亏损、到期债务经多次催收仍无法偿付，现有可用资金和财产不足，未有其他可用资金来源。乔予据此中止交货并立即通知程珂。程珂随后取得银行对本合同全部价款的担保并交付担保文件；题设确认该担保已合法有效成立、足额覆盖价款，不存在保证期间或担保效力争议。乔予已收到、核实，仍仅以此前经营风险为由继续不交货。",
} as const;

const simultaneousReference =
  "双方互负交货和付款债务，约定同一时点且没有先后履行顺序，应当同时履行。颜舟届时未交货，也未提出同时交付，林澜可以依第525条在对方履行之前拒绝其付款请求。林澜愿意按约交换，不因已经带齐价款就必须无条件先付款。这是本次请求的履行抗辩，不使合同失效或永久免除价款债务。";

const insecurityCriteria: Criterion[] = [
  {
    id: "civil-performance-insecurity-evidence-rule",
    label: "先履行方中止所需的风险证据",
    meaning:
      "邱芷约定先付款；先履行一方要依据确切证据支持对方存在丧失或可能丧失履行能力等法定风险，才能据此中止，不能仅听说资金紧便当然停下。",
    acceptable:
      "‘她要先给钱，得有靠得住的材料说明对方可能无法履行才可以停’等义表达可接受；不要求固定‘不安抗辩’术语、条号或逐条列出第527条四类情形。",
    boundary:
      "只说合同成立所以必须无条件履行，忽略法定风险路径；只说先履行方也可停而漏证据条件，是部分表达。规则与本案联系可综合写，不要求额外比较同时履行或先履行抗辩，也不设置固定表述门槛。",
  },
  {
    id: "civil-performance-insecurity-rumor-application",
    label: "现有传闻不足以支持中止",
    meaning:
      "本案唯一材料是没有出处、没有可核实债务或经营事实的传闻，尚不支持第527条要求的风险及确切证据；邱芷不能仅凭这些已知材料说明自己有权中止付款。",
    acceptable:
      "‘朋友只说听别人讲，又没有什么能查的材料，所以不能靠这句话就停付款’可以表达本项；同一句把证据条件和现有材料不足连起来可承接两项，无须另列结论句。",
    boundary:
      "材料不足不等于顾湛必然没有经营风险。已联系无来源传闻与不能据此中止时，未单列这句未知提醒不另作漏答；不要求证明对方实际健康、提出完整调查清单或讨论赔偿。前项不充分不抹去本项已有正确分析；不替学生补写其未说明的事实联系。",
  },
];

const resumptionCriteria: Criterion[] = [
  {
    id: "civil-performance-resumption-security-rule",
    label: "适当担保后的恢复规则",
    meaning:
      "风险中止后的履行状态会随担保改变；依第528条，对方提供适当担保后应当恢复履行，不能把先前风险当成永久停履行的依据。",
    acceptable:
      "‘对方拿出足以保障这笔款项的担保后就应该接着履行’可接受；无需固定‘不安抗辩消灭’术语或另抄条号。",
    boundary:
      "本项考恢复条件，不另要求重证此前中止、风险情形或及时通知；规则可以和具体担保事实合写。只说提供任何一张保证纸就必须恢复，会忽略适当担保；但不要求另鉴定本题已确认的担保成立效力或保证期间。",
  },
  {
    id: "civil-performance-resumption-security-application",
    label: "已核实的足额担保与本次继续拒交",
    meaning:
      "程珂已经交付覆盖本合同全部价款的有效银行担保，乔予也收到、核实；本案价款风险已有相应保障，应恢复交货，仅沿用此前经营风险继续拒交的理由不能成立。",
    acceptable:
      "‘他已收到了核实过的、能保住全部货款的银行担保，再只拿以前亏损说事不交货就不行了’可综合说明新事实、恢复行为和所问理由，不要求另拆第三个结论。",
    boundary:
      "只背恢复规则却不联系已取得的担保，为部分表达；把担保补写成未成立或只保部分价款，指出改写事实。无需逐字复述银行、金额、文件动作或经营资料；不要求固定提醒、担保法展开、解除、违约金或损害赔偿。前项术语不足不抹去本项正确应用。",
  },
];

export const civilContractPerformanceExercises: UnitExercise[] = [
  {
    id: "civil-contract-simultaneous-performance",
    caseId: "civil-performance-P1",
    relatedTopicIds: ["civil-contract-performance-defense"],
    kind: "objective",
    choiceMode: "single",
    title: "没有先后顺序的打印机交易",
    facts: civilContractPerformanceCaseFacts["civil-performance-P1"],
    prompt: "仅就颜舟这次付款请求，哪项准确判断林澜能否暂不付款？",
    options: [
      {
        id: "a",
        text: "林澜已带齐价款，就必须先付款，不能再看颜舟是否交货。",
        explanation: "备齐价款不改变双方没有先后顺序的约定。",
      },
      {
        id: "b",
        text: "双方应同时履行；颜舟尚未交货，林澜可以拒绝这次先付款请求。",
        explanation: "对应同一约定时点、无先后顺序及对方未履行的事实。",
      },
      {
        id: "c",
        text: "颜舟没有带打印机，林澜的价款债务就已经永久免除。",
        explanation: "将暂时的履行请求抗辩误作债务永久消灭。",
      },
      {
        id: "d",
        text: "没有交货说明合同尚未成立，因此不需要分析履行请求。",
        explanation: "题设已确认合同成立有效，不能把履行阶段退回订约争议。",
      },
    ],
    answer: "b",
    hint: "联系双方约定的履行时点、有没有先后顺序及当时是否提出交付。",
    reference: "选B。" + simultaneousReference,
    sources: ["civil-performance-simultaneous"],
  },
  {
    id: "civil-contract-prior-performance",
    caseId: "civil-performance-P2",
    relatedTopicIds: ["civil-contract-performance-defense"],
    kind: "objective",
    choiceMode: "single",
    title: "先交垫子后付价款",
    facts: civilContractPerformanceCaseFacts["civil-performance-P2"],
    prompt:
      "仅就约定顺序和已经给出的履行事实，哪项准确说明魏禾可否拒绝此次付款请求？",
    options: [
      {
        id: "a",
        text: "付款时点已经到了，无论沈牧是否交货，魏禾都须立即付款。",
        explanation: "忽略约定先交货及先履行一方未履行的事实。",
      },
      {
        id: "b",
        text: "魏禾须先证明沈牧严重亏损，才可能拒绝此次付款请求。",
        explanation: "把先履行一方未履行时的请求抗辩误换为风险中止的证据条件。",
      },
      {
        id: "c",
        text: "沈牧应先交货却未交，后履行的魏禾有权拒绝其付款请求。",
        explanation:
          "对应先交货、后付款的约定及交货未履行；不是付款时间尚未到。",
      },
      {
        id: "d",
        text: "沈牧没有交垫子，魏禾便永久不欠这笔价款。",
        explanation: "请求抗辩没有当然免除原价款债务。",
      },
    ],
    answer: "c",
    hint: "先核对谁应先做什么，再看先履行一方实际上做了什么。",
    reference:
      "选C。双方明确约定先交货后付款，沈牧10时先交齐瑜伽垫、魏禾当日16时付款。付款时点虽已到，沈牧仍未交付任何一张，魏禾作为后履行一方可以依第526条拒绝其付款请求。本案不需要把沈牧的经营风险当作该抗辩新增条件，也不因此永久免除价款债务。",
    sources: ["civil-performance-prior"],
  },
  {
    id: "civil-contract-insecurity-rumor",
    caseId: "civil-performance-P3",
    relatedTopicIds: ["civil-contract-performance-defense"],
    kind: "subjective",
    title: "只听说店里资金紧",
    facts: civilContractPerformanceCaseFacts["civil-performance-P3"],
    prompt:
      "邱芷仅据朋友这句话宣布暂不付款，能否以履行抗辩规则说明其有权中止？请结合约定顺序和已有风险材料写出理由。不要求违约金或损害赔偿分析。",
    hint: "联系应先付款的约定与消息究竟提供了哪些可核实风险材料。",
    reference:
      "邱芷约定先付款，顾湛次日交货；不能仅因对方尚未履行后到期债务就停付款。先履行一方可以依据第527条，在有确切证据证明对方存在丧失或可能丧失履行能力等法定风险时中止。本案只有没有出处、没有经营或债务事实支持的传闻，尚不足以支撑这一条件，邱芷不能仅据已有材料说明自己有权中止。材料不足也不证明顾湛实际必然没有风险。本问只辨析所给理由，不要求计算违约金或另列赔偿责任。",
    criteria: insecurityCriteria,
    sources: ["civil-performance-insecurity"],
  },
  {
    id: "civil-contract-resume-after-security",
    caseId: "civil-performance-P4",
    relatedTopicIds: ["civil-contract-performance-defense"],
    kind: "subjective",
    title: "足额担保已经收到之后",
    facts: civilContractPerformanceCaseFacts["civil-performance-P4"],
    prompt:
      "收到并核实上述担保后，乔予还能仅以此前经营风险为由继续中止交货吗？请联系本案新事实写出理由。不要求分析担保效力、解除或赔偿。",
    hint: "对照取得担保前后的事实，说明本问所考的履行状态是否应改变。",
    reference:
      "此前乔予按先交货的安排，取得真实经营账册及催收材料后中止并立即通知，构成理解本问的背景。本问不要求再逐项证明初次中止。第528条规定，对方提供适当担保后应恢复履行。程珂已交付覆盖本合同全部价款的有效银行担保，乔予也已经核实，价款风险有相应保障，应恢复交货；仅沿用此前经营风险继续中止的理由不能成立。这里不把任意保证纸都算适当担保，也不让考生重新争论题设已确认的成立效力、保证期间或足额范围；解除及赔偿不是本问必答。",
    criteria: resumptionCriteria,
    sources: ["civil-performance-resumption"],
  },
];

export const civilContractPerformanceCases = Object.entries(
  civilContractPerformanceCaseFacts,
).map(([id, facts]) => ({
  id,
  title: civilContractPerformanceExercises.find((q) => q.caseId === id)!.title,
  usage: "training" as const,
  exerciseIds: civilContractPerformanceExercises
    .filter((q) => q.caseId === id)
    .map((q) => q.id),
  facts,
}));

export const civilContractPerformanceTopics: FaultTopic[] = [
  {
    id: "civil-contract-performance-defense",
    title: "合同履行抗辩",
    headline: "有了有效合同，何时仍可暂不履行？",
    goal: "联系履行顺序、风险证据和担保变化，说明本次请求能否拒绝、履行能否中止及何时应恢复。",
    prerequisite: "能区分合同成立与履行；本组以合同已经成立且有效为已知前提。",
    minutes: "10–15",
    paragraphs: [
      "双方互负债务而无先后顺序，应同时履行；一方在对方履行之前，可拒绝其履行请求；对方履行不符合约定，可拒绝相应请求（第525条）。先把本案的交货、付款时点和有无先后约定看清，不能只因某一方备好了钱就要求其无条件先给。",
      "有先后顺序时，先履行一方未履行，后履行一方可拒绝其请求；先履行不符合约定，可拒绝相应请求（第526条）。本组先交货后付款题采用此路径，不把严重亏损或其他风险证据变成新增条件；拒绝本次请求也不是永久免债。",
      "应先履行一方有确切证据证明对方经营状况严重恶化、转移财产或抽逃资金逃债、丧失商业信誉，或其他丧失/可能丧失履行能力的情形，可中止履行（第527条）。无出处传闻不自行满足证据条件；材料不足不等于风险必然不存在。依法中止须及时通知，取得适当担保后应恢复（第528条）。履行状态应随新事实调整，不把原风险当成永久不交付的理由；本组不展开解除或赔偿。",
    ],
    example: {
      title: "没有先后顺序的打印机交易",
      facts: civilContractPerformanceCaseFacts["civil-performance-P1"],
      analysis: simultaneousReference,
    },
    pitfall:
      "先看约定顺序，再看已履行行为或确切风险证据；取得适当担保后重新判断。暂时拒绝/中止不当然使合同失效或免除债务。",
    recall: {
      prompt:
        "先履行一方中止前需要怎样的风险材料？取得适当担保后，为什么不能只沿用原风险继续停？",
      reference:
        "需要确切证据支持法定风险，不能仅凭没有出处的传闻。依法中止后对方提供适当担保，应恢复履行；相应风险得到保障，原风险本身不足以继续维持本次中止。",
    },
    sources: Object.keys(civilContractPerformanceSources),
    exercises: civilContractPerformanceExercises,
  },
];

/** Placement only; shared registration is reserved for the main integrator. */
export const civilContractPerformancePlacement = {
  subjectId: "civil-law",
  section: "合同通则",
  topicId: "civil-contract-performance-defense",
} as const;

export const civilContractPerformanceTopic = civilContractPerformanceTopics[0];
export const civilContractPerformanceChapter = {
  id: "CIV-CONTRACT-PERFORMANCE",
  title: "合同履行抗辩",
  section: "合同通则",
  topicIds: [civilContractPerformanceTopic.id],
};
export const civilContractPerformanceContentPack = {
  revision: civilContractPerformanceRevision,
  snapshot: {
    topics: civilContractPerformanceTopics,
    sources: civilContractPerformanceSources,
  },
};
export const civilContractPerformanceDefaultQueues = {
  objective: civilContractPerformanceExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilContractPerformanceExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilContractPerformanceQuestion(id: string) {
  return civilContractPerformanceExercises.find((q) => q.id === id);
}
export function civilContractPerformanceTopicForQuestion(id: string) {
  return civilContractPerformanceQuestion(id)
    ? civilContractPerformanceTopic
    : undefined;
}
export function civilContractPerformanceSameCaseQuestions(id: string) {
  const q = civilContractPerformanceQuestion(id);
  return q
    ? civilContractPerformanceExercises.filter(
        (item) => item.caseId === q.caseId,
      )
    : [];
}

/** First-answer projection; reference, hint, key and rubric remain answer-side. */
export function civilContractPerformancePromptMaterial(id: string) {
  const q = civilContractPerformanceQuestion(id);
  if (!q) return null;
  return {
    id: q.id,
    caseId: q.caseId,
    revision: civilContractPerformanceRevision,
    title: q.title,
    kind: q.kind,
    facts: q.facts,
    prompt: q.prompt,
    ...(q.options
      ? { options: q.options.map(({ id, text }) => ({ id, text })) }
      : {}),
  };
}
