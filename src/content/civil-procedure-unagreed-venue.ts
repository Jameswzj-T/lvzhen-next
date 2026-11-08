import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";

/** Two original fictional cases; each has a choice and an independent written answer. */
export const civilProcedureUnagreedVenueRevision =
  "civil-procedure-unagreed-venue-2026-10-10.v1";

const topicId = "civpro-contract-unagreed-performance";
export const civilProcedureUnagreedVenueSources: ContentSources = {
  "civpro-unagreed-venue-law": {
    title: "民事诉讼法2023年修正文本第24、36条：合同纠纷管辖与法院选择",
    url: "https://flk.npc.gov.cn/detail?id=ff8081818a21dc13018b425303b7086d",
    note: "本批2026-10-10直接读取国家法律法规库有效记录及对应官方附件。公布2023-09-01，施行2024-01-01。采用第24条被告住所地或合同履行地及第36条原告择一起诉，不考先立案、移送或异议程序。",
  },
  "civpro-unagreed-venue-interpretation": {
    title:
      "最高法民诉解释2022年修正文本第18条第二款：未约定或不明确时识别履行地",
    url: "https://flk.npc.gov.cn/detail?id=ff80818181cdceb30181d801c31c4070",
    note: "本批2026-10-10直接读取国家法律法规库有效记录及附件。公布字段2022-04-01，施行2022-04-10。本组只练给付货币与动产质量交付等其他标的的区别；不展开交付不动产、即时结清、租赁、网络买卖或约定履行地的规则。",
  },
  "civpro-unagreed-venue-obligation": {
    title: "最高法知识产权法庭：争议标的须看请求指向的具体合同义务",
    url: "https://ipc.court.gov.cn/zh-cn/news/view-1644.html",
    note: "2026-10-10直接读取官方2021-11-11案例分析，案号（2021）最高法知民辖终73号。只采用争议标的指具体合同义务、金钱请求不能直接等同给付货币的说明；不搬入劳务派遣、技术合同或专门法院的结论，也不把历史案例分析当新的司法解释。",
  },
  "civpro-unagreed-venue-price-example": {
    title: "北京政法网转载海淀法院：货款争议与接收货币方所在地",
    url: "https://www.bj148.org/sa1/yasf1/202111/t20211112_1621701.html",
    note: "2026-10-10直接读取2021-11-12官方转载。只采用货款争议指付款义务、违约责任须回看其指向义务的说明；不采用文中另段关于履行地必须载明特定字样的表述，不讨论其旧合同、微信或法院选择条款。本组两案独立虚构，不复刻文中案例。",
  },
};

export const civilProcedureUnagreedVenuePreparation = {
  status: "isolated-content-candidate-not-registered",
  sourceCheckedAt: "2026-10-10",
  officialCurrentEffectiveRecordsRead: true,
  officialAttachedClausesRead: true,
  independentContentReviewApproved: false,
  registeredInDefaultProduct: false,
  independentCaseCount: 2,
  objectiveQuestions: 2,
  writtenQuestions: 2,
  teachingCards: 1,
  scope:
    "第18条第二款中未约定或不明确履行地时，价款义务与动产质量交付义务的正反对照",
} as const;

const priceCaseId = "CIVPRO-UNAGREED-PRICE-1";
const qualityCaseId = "CIVPRO-UNCLEAR-QUALITY-1";
export const civilProcedureUnagreedVenueCaseFacts = {
  [priceCaseId]: [
    "人物、地点均为虚构。甘予向宋陌出售六台现成的二手咖啡机，价款18000元。双方当面签订书面合同，未约定合同履行地点或付款地点，也没有选择法院或仲裁的条款。宋陌先付6000元，余款约定在9月30日前支付。",
    "甘予已交付全部咖啡机，宋陌收下并确认型号和状况符合约定；双方后来也没有补充约定履行地点。期限过后，宋陌仍未付余下12000元，认为应再宽限一段时间。甘予准备起诉请求支付这笔余款。宋陌不提出交货或质量争议。",
    "起诉时，甘予的住所地和经常居住地均在澜禾县，宋陌的住所地和经常居住地均在石苒县。两人都是境内普通成年公民，本案不涉及不动产、专门法院或涉外事项，各县基层法院的级别适当。本题只讨论地域管辖，不判断余款请求最终能否获支持。",
  ].join("\n\n"),
  [qualityCaseId]: [
    "人物、地点均为虚构。齐橙向陶铮购买十只现货保温壶，价款4500元，合同要求壶身不得渗漏。双方线下签订的书面合同在‘履行地点’一栏写着‘另行商量’，此后也未就履行地点达成一致；没有选择法院或仲裁的条款。",
    "齐橙先付清4500元，三天后陶铮交付十只保温壶。齐橙随后主张其中六只漏水，不符合约定的质量标准，因此产生900元损失，拟起诉请求陶铮赔偿这900元；陶铮否认质量不合格。双方并非因齐橙欠付价款发生争议。",
    "起诉时，齐橙的住所地和经常居住地均在绮竹县，陶铮的住所地和经常居住地均在榆朗县。两人都是境内普通成年公民，本案不涉及不动产、专门法院或涉外事项，各县基层法院的级别适当。本题只识别本次索赔所指向的合同义务及其履行地，不认定漏水或损失是否确实存在。",
  ].join("\n\n"),
} as const;

const commonSourceKeys = [
  "civpro-unagreed-venue-law",
  "civpro-unagreed-venue-interpretation",
  "civpro-unagreed-venue-obligation",
  "civpro-unagreed-venue-price-example",
];
export const civilProcedureUnagreedVenueExercises: UnitExercise[] = [
  {
    id: "civpro-unagreed-price-venue-choice",
    caseId: priceCaseId,
    relatedTopicIds: [topicId],
    kind: "objective",
    choiceMode: "single",
    title: "咖啡机交付后的余款",
    facts: civilProcedureUnagreedVenueCaseFacts[priceCaseId],
    prompt: "就这次起诉的地域管辖，下列说法正确的是？",
    options: [
      {
        id: "a",
        text: "应把石苒县认作付款义务的合同履行地，因为宋陌要在那里支出货款。",
        explanation:
          "第18条第二款的货币给付连接看接收货币的一方。本案收取欠付价款的是甘予，不能把付款方宋陌的所在地当成该条的收款方所在地。石苒仍有被告住所地的管辖基础。",
      },
      {
        id: "b",
        text: "余款争议指向宋陌的价款给付义务；收款方甘予在澜禾，甘予可在澜禾、石苒两地择一起诉。",
        explanation:
          "合同未约定履行地，诉请指向欠付价款，属于给付货币，按收款方甘予所在地识别澜禾履行地。宋陌作为被告住在石苒，第24条另有被告住所地连接，原告可择一。",
      },
      {
        id: "c",
        text: "认定甘予所在的澜禾为合同履行地后，这次诉讼便不应向石苒县法院提出。",
        explanation:
          "识别合同履行地不排除被告住所地。题中没有选择法院的条款，澜禾与石苒在本问可并行。",
      },
      {
        id: "d",
        text: "合同没写履行地点，目前无法确定有管辖权的法院，双方应先补订地点再起诉。",
        explanation:
          "未约定或约定不明确时，第18条第二款提供识别履行地的规则；本案也已有被告住所地连接，不以补订地点为起诉前提。",
      },
    ],
    answer: "b",
    hint: "",
    reference:
      "选B。不是因为甘予是原告就认定其住处有管辖权，而是本案没有履行地约定，交货和质量均无争议，甘予诉请的是宋陌欠付的价款，争议合同义务为给付货币。接收这笔价款的是甘予，其所在地澜禾县据第18条第二款成为合同履行地；宋陌住所地石苒县也可依据民诉法第24条管辖。甘予可选其中一地起诉，不判断余款实体请求的结果。",
    sources: [...commonSourceKeys],
  },
  {
    id: "civpro-unagreed-price-venue-explain",
    caseId: priceCaseId,
    relatedTopicIds: [topicId],
    kind: "subjective",
    title: "追索余款可以向哪里起诉",
    facts: civilProcedureUnagreedVenueCaseFacts[priceCaseId],
    prompt:
      "甘予可以向题中的哪些县起诉？请联系这次争议的合同义务，以及双方在付款、收款中的身份和住所说明理由。",
    hint: "",
    reference:
      "甘予可选择澜禾县或石苒县法院。合同未约定履行地点，甘予起诉所指向的是宋陌尚未履行的价款给付义务，而非要求甘予交货或处理咖啡机质量。此时争议标的为给付货币，应按接收货币方所在地确定合同履行地。应接收12000元的是甘予，其住所和经常居住地均在澜禾，所以澜禾是履行地；被告宋陌住在石苒，石苒也有被告住所地的管辖基础。依据第24、36条可选其中一地，不因履行地已经确定便排除被告住所地。本问不要求再论先立案、异议期限或余款应否全部支付。",
    criteria: [
      {
        id: "civpro-unagreed-price-venue-explain-obligation",
        label: "从欠付价款识别货币给付义务",
        meaning:
          "合同未约定履行地，本次起诉指向宋陌支付欠付价款的义务，属于给付货币；不能因合同买卖的是咖啡机就把本次争议也当成动产交付。",
        acceptable:
          "‘这里告的是宋陌没付货款，要他履行付款义务，合同也没约定履行地点’等义表达即可。可以把规则与事实合写，不要求使用‘争议标的’术语或背第18条号。",
        boundary:
          "需要说明本案欠款对应的价款义务，不能只说‘诉请要钱，所以是给付货币’。交货和质量无争议是已给定条件，不要求另列全部交货细节或先证明余款请求应当胜诉。",
      },
      {
        id: "civpro-unagreed-price-venue-explain-places",
        label: "收款方履行地及被告住所地",
        meaning:
          "甘予是这笔价款的收款方，所在地澜禾为合同履行地；宋陌是被告且住在石苒，两地法院可择一起诉。",
        acceptable:
          "‘收钱的是住澜禾的甘予，澜禾可以；被告宋陌住石苒，石苒也可以，两处选一’可以。与前项合写也可，不要求固定条号或单列‘择一’结论句。",
        boundary:
          "不能以甘予只是原告作为澜禾的依据，或把付款方所在地当成本项收款方连接。已说明两地及各自依据可选时，不另强求先立案、管辖异议、未履行例外或实体责任提醒；配套客观选择不补足本问理由。",
      },
    ],
    sources: [...commonSourceKeys],
  },
  {
    id: "civpro-unagreed-quality-damages-choice",
    caseId: qualityCaseId,
    relatedTopicIds: [topicId],
    kind: "objective",
    choiceMode: "single",
    title: "漏水保温壶的赔偿请求",
    facts: civilProcedureUnagreedVenueCaseFacts[qualityCaseId],
    prompt: "对本次索赔的合同履行地，下列判断正确的是？",
    options: [
      {
        id: "a",
        text: "齐橙请求900元，接收货币的一方就是齐橙，应把绮竹县认作履行地。",
        explanation:
          "请求金额不能直接代替争议合同义务的识别。本案索赔针对陶铮交付符合质量要求保温壶的义务，不是齐橙追索本应由陶铮支付的合同价款。",
      },
      {
        id: "b",
        text: "索赔针对保温壶交付，履行地应按接收保温壶的齐橙所在地绮竹县识别。",
        explanation:
          "属于其他标的时，第18条第二款采用履行该义务一方所在地，而不是接收动产的一方所在地。交付符合质量标准保温壶的义务由陶铮承担。",
      },
      {
        id: "c",
        text: "履地写着另行商量，后来没有达成一致，因此本案不能再用第18条识别履行地。",
        explanation:
          "履行地点约定不明确正是第18条第二款处理的情形。本案可以据诉请指向的具体合同义务识别，不能因未形成明确地点便停止适用。",
      },
      {
        id: "d",
        text: "索赔指向陶铮交付符合质量要求的动产的义务，属于其他标的；履行地按陶铮所在的榆朗县识别。",
        explanation:
          "本案质量索赔仍须看其指向的动产质量交付义务。该义务由陶铮履行，依第18条第二款的其他标的规则以其所在地榆朗识别，不因最终请求赔偿金就变成收款方所在地规则。",
      },
    ],
    answer: "d",
    hint: "",
    reference:
      "选D。‘另行商量’且此后未达成地点约定，履行地点仍不明确。齐橙虽然请求赔900元，其起诉理由所指向的却是陶铮交付符合质量要求保温壶的义务，应按这一具体合同义务分类，而不是只看请求中的金额。动产质量交付属于第18条第二款的其他标的，由履行义务的陶铮所在地榆朗县识别履行地。榆朗同时也是被告住所地，但本问重点是解释该履行地如何识别；不认定具体违约或损失成立，也不能由本案推出所有赔偿请求均属其他标的。",
    sources: [...commonSourceKeys],
  },
  {
    id: "civpro-unagreed-quality-damages-explain",
    caseId: qualityCaseId,
    relatedTopicIds: [topicId],
    kind: "subjective",
    title: "要赔偿款就按自己住处算吗",
    facts: civilProcedureUnagreedVenueCaseFacts[qualityCaseId],
    prompt:
      "齐橙说：‘我要的是赔偿款，应把我的绮竹县住所认作合同履行地。’这个理由在本案是否成立？请说明应看哪项合同义务、由谁履行，并据此指出应识别的履行地。",
    hint: "",
    reference:
      "理由不能成立。履行地点尚未明确，第18条第二款要求看诉请所指向的具体合同义务。齐橙索赔的理由是保温壶不符合约定的质量要求，指向陶铮交付符合质量标准动产的义务；请求900元并不自动把这项义务变成给付货币。该义务属于其他标的，应以履行义务的一方所在地识别履行地。承担这一交付义务的是陶铮，其住所及经常居住地均在榆朗，因此本案履行地按榆朗县识别，不能仅凭齐橙想收赔偿款便改成绮竹县。这里按题中起诉主张辨明义务，不先裁定漏水、违约或损失成立；也不把所有违约金、赔偿请求反过来一概当成非货币义务。",
    criteria: [
      {
        id: "civpro-unagreed-quality-damages-explain-obligation",
        label: "索赔金额不代替争议义务识别",
        meaning:
          "齐橙的质量索赔指向陶铮交付符合质量要求保温壶的合同义务，属于动产质量交付的其他标的；仅因为请求900元，不能据此认定为给付货币并采用齐橙所在地。",
        acceptable:
          "‘不能只看他要900元，他是因卖方没交合格的壶而索赔，所争的是合格交付的义务’即可。可以一段同时表达反驳、规则与事实，不强求‘其他标的’或‘争议标的’原词。",
        boundary:
          "须联系本案质量交付义务，不能只说‘赔偿不是钱款义务’。本项不要求先认定质量或损失真实，也不能泛化成所有赔偿、违约金请求均属其他标的；未单列这种推广提醒不另作漏答。",
      },
      {
        id: "civpro-unagreed-quality-damages-explain-place",
        label: "履行义务方陶铮及榆朗县",
        meaning:
          "本案按其他标的的履行义务一方所在地规则识别；陶铮承担交付符合质量要求保温壶的义务，其所在地是榆朗县，所以履行地按榆朗识别。",
        acceptable:
          "‘应按负责交合格壶的陶铮，他住榆朗，所以履行地在榆朗’等义表达足够。可以与前项合写，无固定条号要求。",
        boundary:
          "不能改按接收保温壶或想取得赔偿的齐橙所在地。只说被告住所是榆朗而不联系陶铮的履行义务，不足以回答本问的履行地理由；被告住所地的并行连接、赔偿最终胜负、移送与异议期限均不另设必答，也不从同案客观解析补答。",
      },
    ],
    sources: [...commonSourceKeys],
  },
];

export const civilProcedureUnagreedVenueCases = [
  { id: priceCaseId, title: "咖啡机交付后的余款" },
  { id: qualityCaseId, title: "漏水保温壶的赔偿请求" },
].map((item) => ({
  ...item,
  facts:
    civilProcedureUnagreedVenueCaseFacts[
      item.id as keyof typeof civilProcedureUnagreedVenueCaseFacts
    ],
  questionIds: civilProcedureUnagreedVenueExercises
    .filter((q) => q.caseId === item.id)
    .map((q) => q.id),
}));

export const civilProcedureUnagreedVenueTopics: FaultTopic[] = [
  {
    id: topicId,
    title: "履行地未约定或不明确时的管辖",
    headline: "先看争的是哪项合同义务",
    goal: "区分欠付价款与动产质量索赔，按具体义务确定收款方或履行义务方所在地。",
    prerequisite:
      "已能区分原告、被告和地域管辖；本组给定住所与经常居住地一致、法院级别适当。",
    minutes: "10–15",
    paragraphs: [
      "履行地点没有约定或约定不明确时，不必先补订地点才起诉。第18条第二款根据争议标的区分：给付货币，看接收货币方所在地；动产交付等其他标的，看履行该义务一方所在地。这里先问诉请针对哪项具体合同义务。",
      "卖方追索买方欠付的价款，针对的是付款义务，收款方是卖方。买方因货物不合约定质量而索赔，虽然请求用钱补偿，仍须回看合格交付的义务，不能单凭索赔金额把买方住处当履行地。也不能反过来把所有赔偿、违约金都归为其他标的，仍应看违约责任指向哪项义务。",
      "识别合同履行地后，普通合同纠纷还可按被告住所地管辖；两个连接指向不同有权法院时，原告可择一。本组只练两种普通动产买卖争议，不展开明确约定履行地、交付不动产、即时结清、租赁或网络买卖的规则，判断管辖不等于判定实体请求成立。",
    ],
    example: {
      title: civilProcedureUnagreedVenueExercises[0].title,
      facts: civilProcedureUnagreedVenueExercises[0].facts,
      analysis: civilProcedureUnagreedVenueExercises[0].reference,
    },
    pitfall:
      "只看到诉讼请求中的钱款数额，忽略其指向的价款义务或质量交付义务；或者把收货方与履行义务方混在一起。",
    recall: {
      prompt:
        "合同没写清履行地，看到诉请要求一笔钱时，先应识别什么？本组两案为什么采用不同连接？",
      reference:
        "先识别诉请指向的具体合同义务。欠付价款属于付款义务，按接收价款方所在地；因动产质量交付问题索赔，不因请求金额就改成给付货币，本案按承担合格交付义务的一方所在地。应联系具体义务，不能一概按原告住处，也不能把所有赔偿请求一概归为其他标的。",
    },
    sources: [...commonSourceKeys],
    exercises: civilProcedureUnagreedVenueExercises,
  },
];

export const civilProcedureUnagreedVenueChapter = {
  id: "CIVPRO-CONTRACT-UNAGREED-VENUE",
  title: "履行地未约定或不明确时的管辖",
  section: "民事诉讼法",
  topicIds: civilProcedureUnagreedVenueTopics.map((topic) => topic.id),
};
export const civilProcedureUnagreedVenueContentPack = {
  revision: civilProcedureUnagreedVenueRevision,
  snapshot: {
    topics: civilProcedureUnagreedVenueTopics,
    sources: civilProcedureUnagreedVenueSources,
  },
};
export const civilProcedureUnagreedVenueDefaultQueues = {
  objective: civilProcedureUnagreedVenueExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilProcedureUnagreedVenueExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilProcedureUnagreedVenueQuestion(
  id: string,
): UnitExercise | undefined {
  const question = civilProcedureUnagreedVenueExercises.find(
    (q) => q.id === id,
  );
  return question ? structuredClone(question) : undefined;
}
export function civilProcedureUnagreedVenueTopicForQuestion(
  id: string,
): FaultTopic | undefined {
  return civilProcedureUnagreedVenueQuestion(id)
    ? structuredClone(civilProcedureUnagreedVenueTopics[0])
    : undefined;
}
export function civilProcedureUnagreedVenueSameCaseQuestions(
  id: string,
): UnitExercise[] {
  const question = civilProcedureUnagreedVenueQuestion(id);
  return question
    ? structuredClone(
        civilProcedureUnagreedVenueExercises.filter(
          (q) => q.caseId === question.caseId,
        ),
      )
    : [];
}
export function civilProcedureUnagreedVenuePromptMaterial(id: string) {
  const question = civilProcedureUnagreedVenueQuestion(id);
  return question
    ? {
        id: question.id,
        caseId: question.caseId,
        revision: civilProcedureUnagreedVenueRevision,
        title: question.title,
        kind: question.kind,
        facts: question.facts,
        prompt: question.prompt,
      }
    : null;
}
