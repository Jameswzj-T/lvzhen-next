import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";

/** Two original fictional cases; choice and writing share each case's facts. */
export const civilProcedureContractVenueRevision =
  "civil-procedure-contract-venue-2026-10-09.v1";

const topicId = "civpro-contract-territorial-venue";
const lawUrl =
  "https://flk.npc.gov.cn/detail?id=ff8081818a21dc13018b425303b7086d";
const interpretationUrl =
  "https://flk.npc.gov.cn/detail?id=ff80818181cdceb30181d801c31c4070";

export const civilProcedureContractVenueSources: ContentSources = {
  "civpro-contract-venue-law": {
    title: "《民事诉讼法》2023年修正文本第24、36条：合同管辖与法院选择",
    url: lawUrl,
    note: "2026-10-09直接读取国家法律法规库当前有效记录及对应官方附件；该版本公布于2023-09-01，2024-01-01施行。第24条采用被告住所地或合同履行地；第36条只采用原告可向其中一个有权法院起诉，不考重复起诉与先立案程序。本组不作全部合同类型或年度大纲覆盖证明。",
  },
  "civpro-contract-venue-interpretation": {
    title:
      "最高法民诉解释2022年修正文本第18条第一、三款：约定履行地及未履行例外",
    url: interpretationUrl,
    note: "2026-10-09直接读取国家法律法规库当前有效记录及对应官方附件；公布日期字段为2022-04-01，2022-04-10施行。两案限明确约定履行地点，分别已实际交货、双方均无履行且住所均不在约定地点。不出未约定或约定不明的争议义务题，也不扩租赁、网络交易、专属或协议选法院规则。",
  },
};

export const civilProcedureContractVenuePreparation = {
  status: "isolated-content-candidate-not-registered",
  sourceCheckedAt: "2026-10-09",
  officialCurrentEffectiveRecordsRead: true,
  officialAttachedClausesRead: true,
  independentContentReviewApproved: false,
  registeredInDefaultProduct: false,
  independentCaseCount: 2,
  objectiveQuestions: 2,
  writtenQuestions: 2,
  teachingCards: 1,
  scope: "普通动产买卖的明确约定履行地、被告住所地及第18条第三款例外",
} as const;

const deliveredCaseId = "CIVPRO-CONTRACT-PERFORMED-1";
const unperformedCaseId = "CIVPRO-CONTRACT-UNPERFORMED-1";
export const civilProcedureContractVenueCaseFacts = {
  [deliveredCaseId]: [
    "人物、地点均为虚构。何沅向姚序出售四十张成品折叠桌，价款18000元。双方在青禾县当面签订买卖合同，明确写明：‘本合同履行地点为南栖县会展中心。’合同没有另行选择审理争议的法院。",
    "何沅已按约将全部折叠桌送到南栖县会展中心并交给姚序，姚序验收后支付了12000元。双方随后就余下6000元是否还应支付发生争议，何沅拟向法院起诉姚序。",
    "起诉时，何沅的住所地与经常居住地均在青禾县，姚序的住所地与经常居住地均在松澄县。双方都是境内普通成年公民，没有仲裁协议；本案不涉及不动产、专门法院或涉外事项，各县基层法院的级别适当。本问只判断地域管辖，不判断余款请求最终是否成立。",
  ].join("\n\n"),
  [unperformedCaseId]: [
    "人物、地点均为虚构。罗希向陆岑购买十二组现货书架，双方线下签订书面买卖合同，约定在9月10日前交付，明确写明：‘本合同履行地点为安溪县书展仓库。’合同已经成立生效，没有选择法院的条款。",
    "约定日期已过，陆岑仍未发货或交付书架；罗希也未支付任何价款、预付款或定金，双方没有其他合同履行行为。罗希拟以陆岑未交货为由起诉，请求解除合同并赔偿损失。",
    "起诉时，罗希的住所地与经常居住地均在望榆县，陆岑的住所地与经常居住地均在新沅县，两人的住所地都不在安溪县。双方都是境内普通成年公民，没有仲裁协议；本案不涉及不动产、专门法院或涉外事项，各县基层法院的级别适当。本问只判断地域管辖，不判断解除或赔偿请求最终是否成立。",
  ].join("\n\n"),
} as const;

const sourceKeys = [
  "civpro-contract-venue-law",
  "civpro-contract-venue-interpretation",
];
export const civilProcedureContractVenueExercises: UnitExercise[] = [
  {
    id: "civpro-contract-agreed-venue-choice",
    caseId: deliveredCaseId,
    relatedTopicIds: [topicId],
    kind: "objective",
    choiceMode: "single",
    title: "折叠桌交付后的余款",
    facts: civilProcedureContractVenueCaseFacts[deliveredCaseId],
    prompt: "就本案合同纠纷的地域管辖，下列说法正确的是？",
    options: [
      {
        id: "a",
        text: "向青禾县法院起诉，因为何沅住在那里，提出的也是收取货款的请求。",
        explanation:
          "本案已明确约定合同履行地点，不能跳过该约定，仅凭原告住处或收款请求改按青禾县。",
      },
      {
        id: "b",
        text: "可选择松澄县或南栖县法院起诉，分别对应被告住所地和合同履行地。",
        explanation:
          "姚序是被告，住所地在松澄县；合同明确约定南栖县为履行地且已有交货。第24条给出两条管辖连接，原告可选其中一处。",
      },
      {
        id: "c",
        text: "应只向南栖县法院起诉，合同写明履行地点后就排除了被告住所地。",
        explanation:
          "约定履行地点用于识别合同履行地，不因此排除第24条的被告住所地管辖；本案也没有另行选择法院。",
      },
      {
        id: "d",
        text: "应向签订合同的青禾县法院起诉，签约地点决定这次合同纠纷的管辖。",
        explanation:
          "本案没有选择法院的条款。签约地点不因签约本身成为第24条的被告住所地或本案明确约定的履行地。",
      },
    ],
    answer: "b",
    hint: "",
    reference:
      "选B。南栖县是明确约定的合同履行地，且题中已经在该处交货；姚序作为被告，其住所地在松澄县。依据第24条，两地法院均有本问的地域管辖基础，何沅可选择其中一个起诉。约定履行地点不等于约定排除被告住所地。青禾县的原告住所及签约事实不足以另生本问的连接点，不判断余款最终应否支付。",
    sources: [...sourceKeys],
  },
  {
    id: "civpro-contract-agreed-venue-explain",
    caseId: deliveredCaseId,
    relatedTopicIds: [topicId],
    kind: "subjective",
    title: "余款争议向哪里起诉",
    facts: civilProcedureContractVenueCaseFacts[deliveredCaseId],
    prompt:
      "何沅可向题述哪些县的法院起诉？请结合合同约定和题中各人的身份、住所说明理由。",
    hint: "",
    reference:
      "何沅可选择松澄县法院或南栖县法院。合同明确约定南栖县会展中心为履行地点，解释第18条第一款据此识别合同履行地；题中也已在这里实际交货，并非合同完全未履行的情形。姚序是被告，住所地在松澄县。第24条允许按被告住所地或合同履行地确定管辖，第36条允许原告选择其中一个有权法院起诉。无需同时向两地起诉，也不能仅凭何沅住在青禾县、在青禾县签约或请求收钱而改按青禾县。本问只说明这两条管辖连接，不判断余款请求是否成立或论述重复起诉程序。",
    criteria: [
      {
        id: "civpro-contract-agreed-venue-explain-performance",
        label: "按明确约定识别南栖县履行地",
        meaning:
          "合同明确约定南栖县会展中心为本合同履行地点，题设支持南栖县是本案合同履行地的连接点。",
        acceptable:
          "‘合同把南栖写成履行地点，交货也在那里，可向南栖法院起诉’等义表达可以。无需固定第18条号；已按题中明确约定正确识别地点，未另复述交货细节不单独算漏答。",
        boundary:
          "需要联系本案约定及南栖这一地点，不能只因货物现在放在那里得出结论。实际已交货是本案事实条件，不另加一项排除未履行例外的提醒；未约定或约定不明时的争议义务识别、网络或租赁合同规则不作本问必答。",
      },
      {
        id: "civpro-contract-agreed-venue-explain-defendant",
        label: "被告住所地并行及原告选择",
        meaning:
          "姚序是被告、住所地在松澄县；合同纠纷也可按被告住所地管辖，因此松澄与南栖两地均可，何沅可选择其中一个起诉。",
        acceptable:
          "‘告的是住在松澄的姚序，所以松澄也有管辖；南栖和松澄可择一’即可表达。两个地点及其依据可写在同一段，不要求单列选择规则或背第24、36条号。",
        boundary:
          "不能把约定履行地点当成排除被告住所地的选法院条款。若已表达两地都可、由原告任选，未单写‘择一’术语不算漏答；不要求另论青禾为何不行、先立案时点、管辖异议或余款实体责任，也不从同案客观答案补足本问理由。",
      },
    ],
    sources: [...sourceKeys],
  },
  {
    id: "civpro-contract-unperformed-venue-choice",
    caseId: unperformedCaseId,
    relatedTopicIds: [topicId],
    kind: "objective",
    choiceMode: "single",
    title: "尚未出库的书架",
    facts: civilProcedureContractVenueCaseFacts[unperformedCaseId],
    prompt: "就本案合同纠纷的地域管辖，下列说法正确的是？",
    options: [
      {
        id: "a",
        text: "向安溪县法院起诉，合同写明该县为履行地点就足以保留这一管辖连接。",
        explanation:
          "本案同时具备合同没有实际履行、双方住所地均不在约定地点两个条件，不能只用第18条第一款忽略第三款。",
      },
      {
        id: "b",
        text: "向望榆县法院起诉，因为罗希提出诉讼且一直没有收到书架。",
        explanation:
          "罗希是原告，住所地及其未收到货物的事实不足以替代本案适用的被告住所地连接。",
      },
      {
        id: "c",
        text: "向新沅县法院起诉；双方未履行且住所均不在约定履行地，应按被告住所地处理。",
        explanation:
          "题中无付款、交货或其他履行，双方住所分别在望榆和新沅，均不在安溪；第18条第三款适用，被告陆岑住所地在新沅。",
      },
      {
        id: "d",
        text: "在安溪县和新沅县之间任选，约定地点与被告住所地在本案仍同样有管辖权。",
        explanation:
          "符合未履行且双方住所均不在约定履行地的例外后，不能继续机械并列约定地点；本案按被告住所地法院管辖。",
      },
    ],
    answer: "c",
    hint: "",
    reference:
      "选C。合同没有实际履行，并且双方住所地均不在合同约定的安溪县，满足解释第18条第三款的两个条件。本案由被告住所地法院管辖，陆岑是被告且住所地在新沅县，不能仅凭合同上写了安溪就仍在安溪与新沅间任选。此判断不否认合同已经成立生效，也不直接判定解除或赔偿请求成立。",
    sources: [...sourceKeys],
  },
  {
    id: "civpro-contract-unperformed-venue-explain",
    caseId: unperformedCaseId,
    relatedTopicIds: [topicId],
    kind: "subjective",
    title: "约定地点能支持这次起诉吗",
    facts: civilProcedureContractVenueCaseFacts[unperformedCaseId],
    prompt:
      "罗希准备向安溪县法院起诉，理由是合同已经写明在安溪履行。这个理由在本案能否成立？请结合题中履行、住所情况说明，并指出应按哪一地点确定管辖。",
    hint: "",
    reference:
      "理由不能成立。解释第18条第三款适用于合同没有实际履行、双方住所地均不在合同约定履行地的情况。陆岑没有发货或交付，罗希没有支付价款、预付款或定金，双方也无其他履行行为；二人住所分别在望榆和新沅，均不在约定的安溪。两个条件同时满足，本案应由被告住所地法院管辖。陆岑是被告，其住所地在新沅县，所以本问按新沅县法院识别；不能仅凭合同写了安溪继续把安溪作为可选法院。合同成立生效不等于已经实际履行，本问也不要求判断解除、赔偿或程序移送。",
    criteria: [
      {
        id: "civpro-contract-unperformed-venue-explain-conditions",
        label: "结合本案识别两个例外条件",
        meaning:
          "题中既无交货、付款或其他实际履行，双方住所又都不在约定的安溪县；两条件共同支持适用没有实际履行的管辖例外，不能只凭合同上的履行地点维持安溪连接。",
        acceptable:
          "‘两边都还没履行，人也都不住在约定的安溪，不能只看合同上写了安溪’可表达两个条件和案情联系。无需把价款、预付款、定金三种未付款逐一列全或复述全部地名。",
        boundary:
          "不能把‘没有实际履行’一个条件泛化为所有未履行合同均只能按被告住所地，仍须说明双方住所均不在约定地点。可综合表达条件与反驳结论，不要求单列结论句、另作合同效力判断或背第18条号。",
      },
      {
        id: "civpro-contract-unperformed-venue-explain-defendant",
        label: "按被告住所地识别新沅县",
        meaning:
          "适用该例外时由被告住所地法院管辖；陆岑是罗希拟起诉的被告，其住所地在新沅县，本案应按新沅县识别。",
        acceptable:
          "‘这里按被告陆岑的住处，就是新沅县法院’等义表达足够；可与前项合写，不要求另说本案不是争议义务的兜底识别。",
        boundary:
          "不能错把原告罗希的望榆住所作为本项连接点，也不能继续并列安溪任选。不要求确认请求最终胜诉、安排移送或列异议期限，不因未另写合同有效、赔偿待审等提醒扣本点；本题理由只从本问书面原答核对。",
      },
    ],
    sources: [...sourceKeys],
  },
];

export const civilProcedureContractVenueCases = [
  { id: deliveredCaseId, title: "折叠桌交付后的余款" },
  { id: unperformedCaseId, title: "尚未出库的书架" },
].map((item) => ({
  ...item,
  facts:
    civilProcedureContractVenueCaseFacts[
      item.id as keyof typeof civilProcedureContractVenueCaseFacts
    ],
  questionIds: civilProcedureContractVenueExercises
    .filter((q) => q.caseId === item.id)
    .map((q) => q.id),
}));

export const civilProcedureContractVenueTopics: FaultTopic[] = [
  {
    id: topicId,
    title: "合同纠纷地域管辖",
    headline: "联系履行约定、被告住所与实际履行情况",
    goal: "识别明确约定的合同履行地及并行的被告住所地，并在两个条件同时满足时应用未履行例外。",
    prerequisite:
      "已区分原告、被告和地域管辖；本组给定住所与经常居住地一致、法院级别适当。",
    minutes: "10–15",
    paragraphs: [
      "合同纠纷一般可按被告住所地或合同履行地确定管辖。明确约定了履行地点，解释第18条第一款以该地点为合同履行地；约定履行地点并不因此排除被告住所地。两处法院都有管辖权时，原告可以选择其中一个起诉。",
      "解释第18条第三款有两个同时具备的条件：合同没有实际履行，双方住所地都不在合同约定的履行地。符合时由被告住所地法院管辖；不能只看合同写了哪个地点，也不能只因尚未履行便忽略双方住所条件。",
      "这两案均有明确的履行地点约定。履行地点未约定或不明确时，要另按争议义务等规则识别，不能把本组规则直接搬用；本组不展开网络交易、租赁、专属管辖或书面选择法院的适用。确定管辖也不等于已经确定合同实体责任。",
    ],
    example: {
      title: civilProcedureContractVenueExercises[0].title,
      facts: civilProcedureContractVenueExercises[0].facts,
      analysis: civilProcedureContractVenueExercises[0].reference,
    },
    pitfall:
      "把履行地点约定误当成排除被告住所地，或把未实际履行一个条件当成适用例外的充分条件。",
    recall: {
      prompt:
        "明确约定履行地点后，被告住所地是否仍可管辖？适用未实际履行的例外还要核对哪个住所条件？",
      reference:
        "普通合同纠纷的被告住所地与约定履行地可并行，原告可选择其中一个有权法院。未实际履行例外还要求双方住所地都不在约定履行地，两个条件同时满足时按被告住所地管辖。",
    },
    sources: [...sourceKeys],
    exercises: civilProcedureContractVenueExercises,
  },
];

export const civilProcedureContractVenueChapter = {
  id: "CIVPRO-CONTRACT-VENUE",
  title: "合同纠纷地域管辖",
  section: "民事诉讼法",
  topicIds: civilProcedureContractVenueTopics.map((topic) => topic.id),
};
export const civilProcedureContractVenueContentPack = {
  revision: civilProcedureContractVenueRevision,
  snapshot: {
    topics: civilProcedureContractVenueTopics,
    sources: civilProcedureContractVenueSources,
  },
};
export const civilProcedureContractVenueDefaultQueues = {
  objective: civilProcedureContractVenueExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilProcedureContractVenueExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilProcedureContractVenueQuestion(
  id: string,
): UnitExercise | undefined {
  const question = civilProcedureContractVenueExercises.find(
    (q) => q.id === id,
  );
  return question ? structuredClone(question) : undefined;
}
export function civilProcedureContractVenueTopicForQuestion(
  id: string,
): FaultTopic | undefined {
  return civilProcedureContractVenueQuestion(id)
    ? structuredClone(civilProcedureContractVenueTopics[0])
    : undefined;
}
export function civilProcedureContractVenueSameCaseQuestions(
  id: string,
): UnitExercise[] {
  const question = civilProcedureContractVenueQuestion(id);
  return question
    ? structuredClone(
        civilProcedureContractVenueExercises.filter(
          (q) => q.caseId === question.caseId,
        ),
      )
    : [];
}
export function civilProcedureContractVenuePromptMaterial(id: string) {
  const question = civilProcedureContractVenueQuestion(id);
  return question
    ? {
        id: question.id,
        caseId: question.caseId,
        revision: civilProcedureContractVenueRevision,
        title: question.title,
        kind: question.kind,
        facts: question.facts,
        prompt: question.prompt,
      }
    : null;
}
