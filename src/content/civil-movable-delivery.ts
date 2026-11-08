import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";

/** Two independent fictional transactions; each has a choice and a written form. */
export const civilMovableDeliveryRevision =
  "civil-movable-delivery-2026-10-10.v1";
const topicId = "civil-movable-ownership-delivery";
const codeUrl =
  "https://flk.npc.gov.cn/detail?id=ff808081729d1efe01729d50b5c500bf";
const sourceNote =
  "全国人大法律法规库对应官方民法典附件，本包2026-10-10定向读取所列条文；公布2020-05-28，施行2021-01-01。有效记录复用2026-10-05的核查，不冒称本作者今日重新确认效力。本组自编教学要求，不是官方阅卷细则或2026/2027全科覆盖证明。";
export const civilMovableDeliverySources: ContentSources = {
  "civil-movable-delivery-transfer": {
    title: "民法典第224条：普通动产的交付与所有权转移",
    url: codeUrl,
    note:
      sourceNote +
      "只练有处分权、有效买卖且无所有权保留的普通动产现实交付；法律另有规定的例外及第226—228条的替代交付已作为范围上下文核读，不作本组必答。",
  },
  "civil-movable-delivery-sale-duties": {
    title: "民法典第595、598、626、628条：买卖中的交付、转权与付款义务",
    url: codeUrl,
    note:
      sourceNote +
      "采用买卖双方的交付、转移所有权及按约支付价款义务，区分合同请求与已经取得所有权；不另考继续履行例外、违约损失、解除、返还或风险负担。",
  },
};
export const civilMovableDeliveryPreparation = {
  status: "isolated-content-candidate-not-registered",
  subjectId: "civil-law",
  originalOfficialClausesReadAt: "2026-10-10",
  priorOfficialEffectiveRecordCheckedAt: "2026-10-05",
  officialCurrentEffectiveRecordFreshlyConfirmedByAuthor: false,
  officialAttachedClausesDirectlyRead: true,
  independentContentReviewApproved: false,
  registeredInDefaultProduct: false,
  independentCaseCount: 2,
  objectiveQuestions: 2,
  writtenQuestions: 2,
  teachingCards: 1,
  scope:
    "普通动产有效买卖中的现实交付：已交付未付清与已付清未交付，区分所有权与合同义务",
} as const;

const deliveredCaseId = "CIVIL-MOVABLE-DELIVERED-1";
const undeliveredCaseId = "CIVIL-MOVABLE-NOT-DELIVERED-1";
export const civilMovableDeliveryCaseFacts = {
  [deliveredCaseId]: [
    "本案人物均为虚构。岑雨把自己所有的一台小型烘焙搅拌机卖给方荞，价款1600元。双方买卖合同已成立并有效，岑雨有处分权；没有约定保留所有权，也没有约定付款完成后才转移所有权。这是普通动产买卖，不涉及法律规定的特别转移方式。",
    "方荞先付600元，余下1000元约定三日后支付。当天下午，岑雨按照这笔买卖把整台搅拌机交到方荞手中，方荞接收后带回家；这是交货，不是借用或代为保管。",
    "交货后，岑雨说：‘1000元还没给，这台机器现在仍是我的。’本题只判断交货后的所有权及剩余付款义务，不讨论解除、取回机器、违约损失或毁损风险。",
  ].join("\n\n"),
  [undeliveredCaseId]: [
    "本案人物均为虚构。木音向谭禾购买谭禾所有的一架二手数码钢琴，价款3800元。买卖合同已成立并有效，谭禾有处分权；双方没有约定所有权保留或其他特别转移条件。这架可正常搬运的钢琴属于普通动产。",
    "木音在10月6日付清3800元，双方约定10月8日把琴搬交给木音。到10月9日，钢琴仍由谭禾放在自己家中，尚未交到木音手中；琴完好、可以按约交付，双方没有解除或变更这笔买卖。",
    "木音以前没有占有这架琴，也不涉及由第三人占有或领取；双方没有另约先转移所有权、再由谭禾继续替木音占有保管。木音认为：‘合同已经有效，钱也付清了，琴现在就已归我所有。’本题只判断目前所有权及合同交付义务，不讨论赔偿、风险或第三人取得。",
  ].join("\n\n"),
} as const;

const sourceKeys = [
  "civil-movable-delivery-transfer",
  "civil-movable-delivery-sale-duties",
];
export const civilMovableDeliveryExercises: UnitExercise[] = [
  {
    id: "civil-movable-delivered-unpaid-choice",
    caseId: deliveredCaseId,
    relatedTopicIds: [topicId],
    kind: "objective",
    choiceMode: "single",
    title: "已经带走的搅拌机",
    facts: civilMovableDeliveryCaseFacts[deliveredCaseId],
    prompt: "关于交货后的所有权和余款，下列说法正确的是？",
    options: [
      {
        id: "a",
        text: "岑雨仍有所有权，只有方荞付清1000元后才会转移。",
        explanation:
          "题中没有所有权保留或付款完成后转权的约定。按普通动产交付规则，不能把付清价款另加为本案所有权转移条件。",
      },
      {
        id: "b",
        text: "方荞只是把机器暂时放在自己家，所有权仍属于岑雨。",
        explanation:
          "题设明确岑雨按有效买卖交货，方荞接收并带走，不是借用或代为保管；不能把这次交货改写为仅替岑雨保管。",
      },
      {
        id: "c",
        text: "所有权已随这次交付转给方荞，方荞仍应按约定支付余下1000元。",
        explanation:
          "有处分权的岑雨履行有效买卖，已经现实交付，适用第224条的普通动产转移规则。所有权已转移，不等于约定的剩余付款义务被免除。",
      },
      {
        id: "d",
        text: "方荞已经接收机器，但还须办理所有权登记才能成为所有人。",
        explanation:
          "本案普通搅拌机适用题设的交付规则，不能搬用不动产登记或特别动产规则，另加本题未要求的登记步骤。",
      },
    ],
    answer: "c",
    hint: "",
    reference:
      "选C。第224条规定普通动产物权转让以交付发生效力，但须结合本案的有效买卖、出卖人有处分权及无特别规则等前提。岑雨已按买卖把机器实际交给方荞，方荞收下带走，所有权已转给方荞；没有所有权保留或付款完成后转权的约定，未付尾款不阻止本次转移。按约支付价款仍是方荞的合同义务，1000元应在约定的三日后支付，不因为方荞成为所有人便免付，也不要求现在提前支付。",
    sources: [...sourceKeys],
  },
  {
    id: "civil-movable-delivered-unpaid-explain",
    caseId: deliveredCaseId,
    relatedTopicIds: [topicId],
    kind: "subjective",
    title: "没付尾款，机器还是卖方的吗",
    facts: civilMovableDeliveryCaseFacts[deliveredCaseId],
    prompt:
      "岑雨认为余款未付，所以机器仍归自己。这个理由能否成立？请结合本案说明交货后的所有权，以及方荞的1000元付款义务是否还在。",
    hint: "",
    reference:
      "这个理由不能成立，机器的所有权已转给方荞。题中有效买卖由有处分权的岑雨履行，机器已实际交给方荞并由其接收带走，适用第224条从交付时发生效力的规则；又没有所有权保留或付款完成后转权的约定，所以不因尾款未付便仍归岑雨。所有权与付款义务分别判断：方荞仍负有按约支付1000元的义务，应按题中的三日后付款安排履行。无需为此另推岑雨可立即取回、合同应解除或损失应赔多少。",
    criteria: [
      {
        id: "civil-movable-delivered-unpaid-explain-ownership",
        label: "联系本次交付判断所有权",
        meaning:
          "岑雨按本案有效买卖实际交付，方荞接收带走；在无所有权保留等题设前提下，机器所有权已转给方荞，未付尾款不足以支持岑雨仍为所有人的理由。",
        acceptable:
          "‘普通买卖里机器已经交给买方，也没约定尾款付完才转权，所以已经归方荞’等义表达可以。规则、交付事实与反驳结论可合写，不要求固定第224条号或单列结论句。",
        boundary:
          "不能只因方荞持有机器便判断所有权，仍要联系本案买卖交货；也不能把所有交到他人手中的物都视为转权。处分权、效力和无例外已给定，不要求重复列全或另证明全部成立条件；不要求主动解释所有替代交付规则。",
      },
      {
        id: "civil-movable-delivered-unpaid-explain-price-duty",
        label: "剩余价款义务仍按约履行",
        meaning:
          "所有权转移不免除方荞的剩余付款义务，1000元仍须依合同安排在三日后支付；所有权判断与履行这笔价款义务分开。",
        acceptable:
          "‘东西归他了不等于尾款不用付，剩下1000元仍按约定时间给’即可。不要求复述总价和首付款，若已表达按约支付，不必再重复三日后的数字。",
        boundary:
          "不能据所有权已取得说余款不必给，也不能把题中尚未到期的1000元硬改成现在逾期。无需另论解除、取回、催告、赔偿或风险；本问付款内容从本问书面原答判断，不用同案客观选择补足。",
      },
    ],
    sources: [...sourceKeys],
  },
  {
    id: "civil-movable-paid-undelivered-choice",
    caseId: undeliveredCaseId,
    relatedTopicIds: [topicId],
    kind: "objective",
    choiceMode: "single",
    title: "付清了钱，琴还没搬来",
    facts: civilMovableDeliveryCaseFacts[undeliveredCaseId],
    prompt: "截至10月9日，下列判断正确的是？",
    options: [
      {
        id: "a",
        text: "木音已取得钢琴所有权，付清价款已经代替本案的交付。",
        explanation:
          "付款履行的是价款义务，不能在本题无替代交付安排的情况下代替第224条所要求的交付。",
      },
      {
        id: "b",
        text: "本案所有权尚未转给木音；有效合同仍要求谭禾按约交付并转移所有权。",
        explanation:
          "钢琴尚未现实交付，木音也未先占有、第三人未占有，双方无由谭禾继续占有等替代安排。所有权尚未转移与有效合同的交付义务可以同时存在。",
      },
      {
        id: "c",
        text: "谭禾尚未交琴说明买卖合同也尚未生效，木音目前没有合同上的交付请求。",
        explanation:
          "合同已经成立并有效是题设前提。未履行交付义务不能直接改写为合同无效或没有合同义务。",
      },
      {
        id: "d",
        text: "虽然没有交付，签订有效合同这一事实已足以让木音成为钢琴所有人。",
        explanation:
          "普通动产的合同义务与所有权转移须分别识别。签订有效买卖合同产生交付与转权义务，本案还没有完成交付，不能只凭合同有效得出所有权已经取得。",
      },
    ],
    answer: "b",
    hint: "",
    reference:
      "选B。第224条的交付尚未完成，且题中没有第226—228条所涉及的先占有、第三人占有返还请求转让或出让人继续占有的替代安排，木音目前尚未取得钢琴所有权。付清3800元或合同已有效，不自动代替这次普通动产交付。第595、598条仍支持有效买卖下谭禾负有交付并转移所有权的合同义务，本题合同未解除、物可交付，木音可依合同要求谭禾履行；不以木音已经是所有人为这项合同请求的前提，也不评赔偿或风险。",
    sources: [...sourceKeys],
  },
  {
    id: "civil-movable-paid-undelivered-explain",
    caseId: undeliveredCaseId,
    relatedTopicIds: [topicId],
    kind: "subjective",
    title: "已经付款与已经取得所有权",
    facts: civilMovableDeliveryCaseFacts[undeliveredCaseId],
    prompt:
      "木音认为合同有效且款已付清，自己就已经取得钢琴所有权。这个判断在本案是否成立？请联系交付情况说明，并说明尚未取得所有权是否妨碍木音依有效买卖合同要求谭禾交琴。",
    hint: "",
    reference:
      "判断不能成立，目前所有权尚未转给木音。普通动产在本案依第224条从交付时发生转移，琴还在谭禾处且未交给木音，题中也明确没有先占有、第三人代交或出让人继续占有的替代安排；所以不能仅以付款或合同有效推定已经交付。与此同时，合同已经有效，谭禾仍应按约把这架琴交给木音并转移所有权。木音可以凭有效买卖合同要求履行这项义务，尚未取得所有权不等于没有合同请求，也不使合同当然无效。本问不要求判断所有违约责任、解除、赔偿、第三人取得或风险负担。",
    criteria: [
      {
        id: "civil-movable-paid-undelivered-explain-ownership",
        label: "未交付，付款与合同有效不直接转权",
        meaning:
          "琴仍由谭禾占有，未现实交付且没有题设中的替代交付安排；木音目前尚未取得所有权，付款完成或合同有效不能直接代替本案交付。",
        acceptable:
          "‘钱给了、合同有效，但琴还没交给他，本案也没有别的代替交付安排，所以所有权还没转’可以。无须背第224条号或逐一列出第226—228条名称，题中先占有等排除条件不要求逐项复述。",
        boundary:
          "需联系未交付这一事实及普通动产规则，不能只看物还在谁的房间就普遍判权属。若已按本题普通交付前提分析，未单列所有排除条件不作漏答；不强求写替代交付的术语，也不推所有尚未搬走的物均未转权。",
      },
      {
        id: "civil-movable-paid-undelivered-explain-contract-duty",
        label: "有效合同支持交付请求",
        meaning:
          "虽然木音尚未取得所有权，有效买卖合同仍产生谭禾的交付义务，木音可据此要求谭禾按约交琴；未交付不等于合同无效或没有这一合同请求。",
        acceptable:
          "‘所有权还没取得，但有效买卖仍要求卖方按约交琴，可以凭合同要求他交付’等义表达足够，可与前项合写，不要求使用‘债权’这个术语。",
        boundary:
          "不能把合同未履行直接说成合同无效，或把木音的交付请求必然建在已经拥有钢琴之上。需联系有效合同的交付义务，不只说‘还能维权’；已据合同正确说明交琴请求时，未另单列‘转移所有权义务’不作漏答。不另要求列继续履行全部例外、返还物请求权、损失计算或解除提醒，也不从同案其他答案补分。",
      },
    ],
    sources: [...sourceKeys],
  },
];

export const civilMovableDeliveryCases = [
  { id: deliveredCaseId, title: "已经带走的搅拌机" },
  { id: undeliveredCaseId, title: "付清了钱，琴还没搬来" },
].map((item) => ({
  ...item,
  facts:
    civilMovableDeliveryCaseFacts[
      item.id as keyof typeof civilMovableDeliveryCaseFacts
    ],
  questionIds: civilMovableDeliveryExercises
    .filter((q) => q.caseId === item.id)
    .map((q) => q.id),
}));
export const civilMovableDeliveryTopics: FaultTopic[] = [
  {
    id: topicId,
    title: "普通动产买卖中的交付与所有权",
    headline: "分别判断所有权转移与合同义务",
    goal: "在普通有效买卖和有处分权的前提下，用现实交付判断所有权，并保留双方独立的付款、交付义务。",
    prerequisite:
      "已能区分买卖合同成立、有效与履行；本组给定无所有权保留和其他特别转移方式。",
    minutes: "10–15",
    paragraphs: [
      "第224条的一般规则是，动产物权转让从交付时发生效力，法律另有规定的除外。本组只讲有处分权、合同有效、没有所有权保留的普通动产现实交付。交货是履行这笔买卖，不能只看东西在谁手里便推定所有权。",
      "普通买卖中，机器已经依约交给买方，未付清尾款不当然使所有权留在卖方；买方成为所有人，也仍应按约付清价款。另一案即使价款付清、合同有效，尚未完成本案交付，所有权也还未转移。",
      "有效买卖合同要求卖方交付并转移所有权，买方按约支付价款。这些合同义务与所有权是否已经转移分别判断。题中未交付的钢琴仍可按合同要求交付，不先把买方当成现所有人。本组不展开保留所有权、替代交付、登记、无权处分、善意取得、毁损风险或全部违约救济。",
    ],
    example: {
      title: civilMovableDeliveryExercises[0].title,
      facts: civilMovableDeliveryExercises[0].facts,
      analysis: civilMovableDeliveryExercises[0].reference,
    },
    pitfall:
      "把签约、付款和交付当成同一时点，或把所有权转移误当成付款义务已经消失。",
    recall: {
      prompt:
        "本组已交付未付清、已付清未交付两案，所有权和合同义务分别如何判断？",
      reference:
        "按本组普通现实交付前提，已交付的机器所有权已转给买方，余款仍按约支付；尚未交付且无替代安排的钢琴，付款和合同有效不直接转权，但有效合同仍产生卖方交付及转移所有权的义务。不能把这一小组推广到保留所有权、替代交付或无权处分等另有条件的交易。",
    },
    sources: [...sourceKeys],
    exercises: civilMovableDeliveryExercises,
  },
];
export const civilMovableDeliveryChapter = {
  id: "CIVIL-MOVABLE-DELIVERY",
  title: "普通动产买卖中的交付与所有权",
  section: "民法",
  topicIds: civilMovableDeliveryTopics.map((topic) => topic.id),
};
export const civilMovableDeliveryContentPack = {
  revision: civilMovableDeliveryRevision,
  snapshot: {
    topics: civilMovableDeliveryTopics,
    sources: civilMovableDeliverySources,
  },
};
export const civilMovableDeliveryDefaultQueues = {
  objective: civilMovableDeliveryExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilMovableDeliveryExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilMovableDeliveryQuestion(
  id: string,
): UnitExercise | undefined {
  const question = civilMovableDeliveryExercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function civilMovableDeliveryTopicForQuestion(
  id: string,
): FaultTopic | undefined {
  return civilMovableDeliveryQuestion(id)
    ? structuredClone(civilMovableDeliveryTopics[0])
    : undefined;
}
export function civilMovableDeliverySameCaseQuestions(
  id: string,
): UnitExercise[] {
  const question = civilMovableDeliveryQuestion(id);
  return question
    ? structuredClone(
        civilMovableDeliveryExercises.filter(
          (q) => q.caseId === question.caseId,
        ),
      )
    : [];
}
export function civilMovableDeliveryPromptMaterial(id: string) {
  const question = civilMovableDeliveryQuestion(id);
  return question
    ? {
        id: question.id,
        caseId: question.caseId,
        revision: civilMovableDeliveryRevision,
        title: question.title,
        kind: question.kind,
        facts: question.facts,
        prompt: question.prompt,
      }
    : null;
}
