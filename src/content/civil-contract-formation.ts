import type {
  ContentSources,
  Criterion,
  FaultTopic,
  UnitExercise,
} from "./fault-unit";

/** Original teaching candidate. Importing it does not register a subject or provider. */
export const civilContractFormationRevision =
  "civil-contract-formation-2026-10-05.v1";

const codeUrl =
  "https://flk.npc.gov.cn/detail?id=ff808081729d1efe01729d50b5c500bf";
const sourceNote =
  "全国人大法规库对应官方附件；本包直读所列条款，采用法源专员2026-10-05本轮取得的有效记录。限普通动产交易的订立判断，不代表2027完整大纲、平台特别规则或模型效果已验。";

export const civilContractFormationSources = {
  "civil-contract-offer": {
    title: "《民法典》第472、473、479条：要约邀请与接受交易条件",
    url: codeUrl,
    note: sourceNote,
  },
  "civil-contract-oral-formation": {
    title: "《民法典》第469、479、483、484、137条：口头订约与承诺生效",
    url: codeUrl,
    note:
      sourceNote +
      "第137条只采用对话意思表示的生效规则；不泛化到法定特别形式或另约成立条件。",
  },
  "civil-contract-counteroffer": {
    title: "《民法典》第479、483、488条：改价回复与合同成立",
    url: codeUrl,
    note:
      sourceNote +
      "只判本题价款的实质性变更、回复性质和成立结果；不扩逾期回复或非实质变更。",
  },
  "civil-contract-conduct-formation": {
    title: "《民法典》第480、483、484条第2款：按约定行为承诺",
    url: codeUrl,
    note:
      sourceNote +
      "本题已明确允许规定的装运行为，不依未查明交易习惯推定承诺，也不把沉默当本案接受。",
  },
} satisfies ContentSources;

export const civilContractFormationPreparation = {
  subjectId: "civil-law",
  themeId: "civil-contract-formation",
  title: "民法 / 合同通则 / 合同成立",
  stage: "isolated-content-candidate",
  registeredByThisModule: false,
  caseCount: 4,
  formCount: 4,
  knowledgeCardCount: 1,
  teachingBasis: "自编教学案例与逐项要求，非官方试题或官方阅卷细则。",
  scope:
    "普通动产交易的邀请、要约、承诺及是否/何时成立；不考代理权限、合同效力、物权变动、履行违约或赔偿。",
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
    readArticles: [137, 469, 472, 473, 479, 480, 483, 484, 488],
    boundary:
      "同轮官方记录及附件复用，所列条款已直读；不冒称作者重新查询当晚效力，不证明2027全科或司法解释/平台规则的完整覆盖。",
  },
  freeAnswerMode: "完整自由作答与参考自检",
  modelReviewStatus: "未接模型，不生成总分或永久掌握结论。",
} as const;

const commonFacts =
  "本案为虚构；各方具备相应民事行为能力，以自己名义进行普通动产交易。本问只判断合同成立，不展开其他法律争议。";

export const civilContractFormationCaseFacts = {
  "civil-contract-F1":
    commonFacts +
    "冉岚把一张纸质灯具价目表寄给赵澈。表中写“A款台灯样价160元／盏”，并注明“具体库存、购买数量及最终成交价格请来电协商”。赵澈收到后只回复“收到，正在考虑”。双方尚未另谈数量、成交价，也未付款或交付。",
  "civil-contract-F2":
    commonFacts +
    "陈芷在家中出售自有的一台旧投影仪。穆棠看过设备后，陈芷说：“这台按2600元卖给你，明天在这里交货，你交货时付款。”穆棠当场回答：“按你刚说的价格和交货付款安排，我买。”陈芷听清并理解了这句话。双方未约定另签合同书、确认书，也未约定要等付款或交货才成立。陈芷随后以“纸上还没有签字”为由说双方尚未订约。",
  "civil-contract-F3":
    commonFacts +
    "秦叙给许柚一封报价信，写明出售他自有的20把指定型号餐椅，每把300元，10月10日在秦叙库房交付并当场付款；许柚如同意，须在10月8日前将按这些条件购买的回复送达，秦叙收到即可按这些条件成交，无须另行确认。许柚及时送达回复：“20把都要，其余照你说的，但每把只能给280元。”秦叙明确答复不接受280元。双方没有作出其他一致的订约表示。",
  "civil-contract-F4":
    commonFacts +
    "梁清把纸质报价信交给段澈，内容明确：出售梁清自有的8套同型号书架，每套400元，段澈在10月7日12时前到指定库房把8套书架全部装上自己的货车并运走，就按总价3200元成交，价款在次日支付，无须再寄同意通知或另签确认书。段澈收到并读完信，在10月7日10时15分依上述安排完成全部装运并运走，梁清现场看到全过程。没有相反表示或其他成立约定。段澈后来称自己没有发回信，所以合同尚未成立。",
} as const;

const oralReference =
  "普通订约可以采用口头形式，穆棠即时同意明确的物品、价款和交货付款安排，陈芷已理解该对话承诺；没有另行成立约定，本案承诺生效时合同成立。付款、交货是后续约定事项，不自行变成成立条件。依据第469、479、483、484条连接第137条，不能仅因没有合同书签字否定成立。这不泛化为依法须特殊形式或另约成立条件的任何合同都不必签字。";

const changedPriceCriteria: Criterion[] = [
  {
    id: "civil-contract-changed-price-reply",
    label: "改价回复的性质",
    meaning:
      "许柚把每把300元改为280元，属于价款的实质性变更；她的回复是新要约，不是对原报价的一致承诺。",
    acceptable:
      "‘她又报了更低的价格，没有接受他原来开的价’等义说明可接受；不强迫背出条号、写术语标题或逐项复述数量和交货安排。",
    boundary:
      "只说价格不同而未说明回复不是原报价的接受，为部分表达；说‘其余照旧，所以已承诺原报价’与本题规则相反。结合改价说明重新提出条件即可，不要求固定‘实质性变更’措辞。",
  },
  {
    id: "civil-contract-changed-price-formation",
    label: "原报价未获一致承诺",
    meaning:
      "原报价没有获得一致承诺，秦叙又明确拒绝新价格，双方没有其他一致订约表示；该回复未使双方按原报价成立买卖合同。",
    acceptable:
      "‘她重新报了价，他又不肯按新价卖，原来的交易没有谈成’可以综合表达本项；同一句联系回复性质与未形成合意，可以承接两项，不另造第三个结论句。",
    boundary:
      "不因前项术语错误抹去本项已经正确说明的合意及成立结果。只答‘没成立’而不联系回复和后续表示不足；不能说永久无效或以后永远不能成交。付款、赔偿、原要约是否还可再接受及其他责任均不是本问必答，不新增逐条件复述要求。",
  },
];

const conductCriteria: Criterion[] = [
  {
    id: "civil-contract-acceptance-by-conduct-method",
    label: "报价允许按行为接受",
    meaning:
      "梁清的报价明确允许依规定的装运行为表示接受，因此段澈可以按约定行为承诺，无须另发同意通知；没有回信不能单独排除本案接受。",
    acceptable:
      "‘信里说照要求把货运走就算同意，所以不用再写同意信’可接受；不要求条号或固定‘行为承诺’术语。",
    boundary:
      "须联系本案报价允许的方式；泛说任何沉默或任意搬运都等于承诺不成立。两项意义可在一句综合说明中表达，不要求另列规则段，也不要求讨论未经查明的交易习惯。",
  },
  {
    id: "civil-contract-acceptance-by-conduct-formation",
    label: "依约装运时承诺生效并成立",
    meaning:
      "段澈在期限内依报价要求完成全部装运，10时15分该行为承诺生效，合同随之成立；不能把后来回信或付款当成本案的成立时点。",
    acceptable:
      "‘按信的约定运走这批货时，接受生效、合同成立’可接受。用完成约定装运时定位即可，不强求再次背出10时15分；不要求逐动作、数量、单价或一个独立结论句。",
    boundary:
      "只说可用行为而未联系已经依约装运及成立结果，为部分表达；仅说合同成立却未说明相应时点，也只指出这个已设问的缺口。前项分析不足不抹去本项已有正确表达；不强求固定用语，不另加付款、物权转移、其他责任或效力提醒。",
  },
];

export const civilContractFormationExercises: UnitExercise[] = [
  {
    id: "civil-contract-invitation",
    caseId: "civil-contract-F1",
    relatedTopicIds: ["civil-contract-formation"],
    optional: true,
    kind: "objective",
    choiceMode: "single",
    title: "咨询用灯具价目表",
    facts: civilContractFormationCaseFacts["civil-contract-F1"],
    prompt: "仅就上述价目表及回复，哪项判断准确？",
    options: [
      {
        id: "a",
        text: "凡价目表写出单价，就已经属于对收到者的要约。",
        explanation:
          "只有样价不足；本表明确仍需协商数量和最终价格，未表示对方接受资料就受约束。",
      },
      {
        id: "b",
        text: "赵澈收到价目表时，买卖合同即成立。",
        explanation: "收到资料不是同意具体交易条件，本案没有相应承诺。",
      },
      {
        id: "c",
        text: "这是邀请对方继续提出交易条件；不能仅据寄表和回复收到认定合同已成立。",
        explanation:
          "表中保留继续协商的条件，赵澈也只表示考虑；对应本案邀请及未达合意的事实。",
      },
      {
        id: "d",
        text: "“收到，正在考虑”已经构成承诺，数量和最终成交价可以留待以后确定。",
        explanation:
          "仍在考虑不等于接受交易条件，不能把尚待协商的内容补成双方已经同意。",
      },
    ],
    answer: "c",
    hint: "核对发送者是否已决定按这份表示成交，以及回复是否真的表示接受。",
    reference:
      "选C。还要协商具体数量和最终价格的表述，没有表示对方一接受这些资料就受约束；‘收到，正在考虑’也不是同意具体交易条件。本案是要约邀请阶段，不能把价目数字或收件动作单独当成合同成立。依据第472、473、479条，并非所有商业广告都只能是邀请，符合要约条件的广告仍可能是要约。",
    sources: ["civil-contract-offer"],
  },
  {
    id: "civil-contract-oral-acceptance",
    caseId: "civil-contract-F2",
    relatedTopicIds: ["civil-contract-formation"],
    optional: true,
    kind: "objective",
    choiceMode: "single",
    title: "当场买旧投影仪",
    facts: civilContractFormationCaseFacts["civil-contract-F2"],
    prompt: "仅就这次普通买卖的成立，下列判断哪项准确？",
    options: [
      {
        id: "a",
        text: "没有纸质签字，合同一定未成立。",
        explanation: "本案普通订约允许口头形式，没有另签合同书的成立约定。",
      },
      {
        id: "b",
        text: "只能等价款全部支付后才成立。",
        explanation: "题设未将付款约为成立前提，付款是后续安排。",
      },
      {
        id: "c",
        text: "只能等投影仪已经交付后才成立。",
        explanation: "题设未将交货约为成立前提，不能移入新的成立条件。",
      },
      {
        id: "d",
        text: "上述条件已经获得当场同意，不能仅因没有合同书签字否定成立。",
        explanation:
          "穆棠即时同意明确的交易条件，陈芷理解了对话承诺；符合本案承诺生效即成立的判断。",
      },
    ],
    answer: "d",
    hint: "将当场同意、是否另定成立条件和后来交货付款分开判断。",
    reference: "选D。" + oralReference,
    sources: ["civil-contract-oral-formation"],
  },
  {
    id: "civil-contract-changed-price",
    caseId: "civil-contract-F3",
    relatedTopicIds: ["civil-contract-formation"],
    optional: true,
    kind: "subjective",
    title: "改价的餐椅回复",
    facts: civilContractFormationCaseFacts["civil-contract-F3"],
    prompt:
      "许柚的回复是否属于对原报价的承诺？它是否已使双方按原报价成立买卖合同？请结合价款变动和双方后续表示写出理由。",
    hint: "核对回复是否同意原价格，再联系对新价格的回应判断合意。",
    reference:
      "改变每把300元为280元是价款的实质性变更，回复属于许柚提出的新要约，不是对原报价的一致承诺；双方没有就原条件形成承诺，秦叙又明确拒绝新价格，因此不能说该回复已经使合同按原报价成立。依据第479、483、488条。本问不展开付款或赔偿分析。",
    criteria: changedPriceCriteria,
    sources: ["civil-contract-counteroffer"],
  },
  {
    id: "civil-contract-acceptance-by-conduct",
    caseId: "civil-contract-F4",
    relatedTopicIds: ["civil-contract-formation"],
    optional: true,
    kind: "subjective",
    title: "按报价信装运书架",
    facts: civilContractFormationCaseFacts["civil-contract-F4"],
    prompt:
      "“没有发回信，所以合同尚未成立”的理由能否成立？请结合本案允许的接受方式和10时15分的装运行为，说明订立结果及相应时点。不要求分析付款或违约责任。",
    hint: "按报价允许的接受方式，找实际完成该行为的时点，不先补一封回信。",
    reference:
      "这个理由不能成立。本案要约明确允许以规定的装运行为表示接受，属于无需另发承诺通知的情形。段澈在期限内按要求完成全部装运，行为承诺在10时15分生效，合同随之成立；没有回信不能单独否定成立。依据第480、483、484条第2款。本问不展开付款或违约责任。",
    criteria: conductCriteria,
    sources: ["civil-contract-conduct-formation"],
  },
];

export const civilContractFormationCases = Object.entries(
  civilContractFormationCaseFacts,
).map(([id, facts]) => ({
  id,
  title: civilContractFormationExercises.find((q) => q.caseId === id)!.title,
  usage: "training" as const,
  exerciseIds: civilContractFormationExercises
    .filter((q) => q.caseId === id)
    .map((q) => q.id),
  facts,
}));

export const civilContractFormationTopics: FaultTopic[] = [
  {
    id: "civil-contract-formation",
    title: "合同成立",
    headline: "哪些交易表示已经达成合意？",
    goal: "从具体交易表示区分邀请、要约及承诺，结合回复内容和接受方式说明本案合同是否及何时成立。",
    prerequisite: "能够分辨当事人发出的交易条件和对方实际说了、做了什么。",
    minutes: "10–15",
    paragraphs: [
      "要约是希望订立合同的具体表示，要表明经对方承诺即受约束（第472条）。邀请他人提出交易条件是要约邀请（第473条）；本组价目表明确还需协商，不据样价或收到资料就认定已订约。符合要约条件的商业广告仍可能是要约，不能只按材料名称判断。",
      "承诺是同意要约；对价款等作实质性变更是新要约（第479、488条）。先联系本案回复具体改了什么，再判断双方是否已同意相同交易条件，不能把‘其余照旧’或‘收到，正在考虑’补成完整接受。",
      "没有法律特别规定或另定成立条件时，承诺生效即合同成立（第483条）。普通订约可以口头进行，对话承诺按第484条连接第137条判断生效；要约明确允许的行为承诺，可在依要求作出行为时生效（第480、484条第2款）。本组分别按当场接受和完成约定装运判断，不把之后付款、交货或一封额外回信自动变为成立前提。",
    ],
    example: {
      title: "当场买旧投影仪",
      facts: civilContractFormationCaseFacts["civil-contract-F2"],
      analysis: oralReference,
    },
    pitfall:
      "报价、考虑、改价和按约接受的法律意义不同；‘已成立’也不等于已经付款、交付或解决了所有效力争议。",
    recall: {
      prompt: "报价已允许按规定行为接受，没有回信为何仍可能成立合同？",
      reference:
        "要联系要约允许的方式与实际行为；按要求完成接受行为时，行为承诺可以生效，合同随之成立。不能推广为任何沉默或任意搬运都算接受。",
    },
    sources: Object.keys(civilContractFormationSources),
    exercises: civilContractFormationExercises,
  },
];

/** Placement proposal only. Main integration owns actual chapters and queues. */
export const civilContractFormationPlacement = {
  subjectId: "civil-law",
  section: "合同通则",
  topicId: "civil-contract-formation",
} as const;

export const civilContractFormationTopic = civilContractFormationTopics[0];
export const civilContractFormationChapter = {
  id: "CIV-CONTRACT-FORMATION",
  title: "合同成立",
  section: "合同通则",
  topicIds: [civilContractFormationTopic.id],
};
export const civilContractFormationContentPack = {
  revision: civilContractFormationRevision,
  snapshot: {
    topics: civilContractFormationTopics,
    sources: civilContractFormationSources,
  },
};
export const civilContractFormationDefaultQueues = {
  objective: civilContractFormationExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilContractFormationExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilContractFormationQuestion(id: string) {
  return civilContractFormationExercises.find((q) => q.id === id);
}
export function civilContractFormationTopicForQuestion(id: string) {
  return civilContractFormationQuestion(id)
    ? civilContractFormationTopic
    : undefined;
}
export function civilContractFormationSameCaseQuestions(id: string) {
  const q = civilContractFormationQuestion(id);
  return q
    ? civilContractFormationExercises.filter((item) => item.caseId === q.caseId)
    : [];
}

/** First-answer projection only; no key, reference, explanation, hint or rubric. */
export function civilContractFormationPromptMaterial(id: string) {
  const q = civilContractFormationQuestion(id);
  if (!q) return null;
  return {
    id: q.id,
    caseId: q.caseId,
    revision: civilContractFormationRevision,
    title: q.title,
    kind: q.kind,
    facts: q.facts,
    prompt: q.prompt,
    ...(q.options
      ? { options: q.options.map(({ id, text }) => ({ id, text })) }
      : {}),
  };
}
