import type { ContentSources, UnitExercise } from "./fault-unit";

/** One original fictional case for independent application after a different case. */
export const civilProcedureUnperformedTransferRevision =
  "civil-procedure-unperformed-transfer-2026-10-10.v1";
export const civilProcedureUnperformedTransferTopicId =
  "civpro-contract-territorial-venue";

const caseId = "CIVPRO-CONTRACT-ORGANIZING-UNPERFORMED-1";
const questionId = "civpro-contract-unperformed-service-transfer-explain";

export const civilProcedureUnperformedTransferSources: ContentSources = {
  "civpro-unperformed-transfer-law": {
    title: "《民事诉讼法》2023年修正文本第24条：合同纠纷地域管辖",
    url: "https://flk.npc.gov.cn/detail?id=ff8081818a21dc13018b425303b7086d",
    note: "复用本作者2026-10-10 04:50 UTC取得的国家法律法规库有效记录与官方附件，本批定向直读第24条。该版本公布于2023-09-01，2024-01-01施行。只用普通合同的地域管辖，不考级别、移送、异议期限或本案费用请求是否成立。",
  },
  "civpro-unperformed-transfer-interpretation": {
    title: "最高法民诉解释2022年修正文本第18条第一、三款：约定地点与未履行例外",
    url: "https://flk.npc.gov.cn/detail?id=ff80818181cdceb30181d801c31c4070",
    note: "复用本作者2026-10-10 04:50 UTC取得的国家法律法规库有效记录与官方附件，本批定向直读第18条，并直接读取最高法2022-04-02公布页对应条文。国家法律法规库公布字段2022-04-01，2022-04-10施行。只练明确约定地点、尚无合同实际履行且双方住所均在别处的普通服务纠纷；不扩第18条第二款、租赁、运输、劳动或不动产专属管辖。",
  },
};

export const civilProcedureUnperformedTransferPreparation = {
  status: "isolated-content-candidate-not-registered",
  sourceCheckedAt: "2026-10-10",
  earlierSameDayOfficialEffectiveRecordsReused: true,
  freshNpcStatusNetworkCallThisBatch: false,
  officialAttachedClausesDirectlyRead: true,
  supremeCourtArticle18DirectlyReadThisBatch: true,
  independentContentReviewApproved: false,
  registeredInDefaultProduct: false,
  independentCases: 1,
  objectiveQuestions: 0,
  writtenQuestions: 1,
  newTeachingCards: 0,
  existingTopicId: civilProcedureUnperformedTransferTopicId,
  existingChapterId: "CIVPRO-CONTRACT-VENUE",
  scope: "一个独立普通服务纠纷，只检验约定履行地的未履行例外与被告住所识别",
} as const;

export const civilProcedureUnperformedTransferCaseFacts = {
  [caseId]: [
    "人物、地点均为虚构。许苒打算请独立接单的整理师陶映，把霁河县一间储物间里的旧物分类、贴签并归位。9月20日，陶映到现场看了箱子数量，两人谈了工作范围和报价，当天没有搬动、分类或整理物品，也没有付钱。",
    "9月22日，两人才线下签订已成立生效的一次性整理服务合同：陶映于9月30日完成整理，许苒在整理结束后付900元；许苒在约定日期前取消预约的，向陶映支付约定取消费用300元。合同明确写明‘本合同履行地点为霁河县’，没有选择法院的条款。合同服务项目只有9月30日的分类、贴签和归位，不包括另行收费的勘察、咨询或方案交付。",
    "签约后，陶映仅在自己的工作日历记下9月30日，没有再次到储物间，也没有向许苒交付整理方案或其他材料。9月27日，许苒通知取消预约；直到拟起诉时，整理工作一次也没有开展，许苒未支付服务费、取消费用或其他款项，双方没有提供本合同下的其他服务或交付物品。陶映要求许苒支付300元，许苒拒绝，陶映准备起诉。",
    "拟起诉时，陶映的住所地与经常居住地均在锦宁县，许苒的住所地与经常居住地均在澈水县，二人均不在霁河县居住。双方都是境内普通成年公民，没有仲裁协议。本案是普通整理服务合同纠纷，不涉及劳动、运输、房屋租赁、施工或不动产物权争议，各县基层法院级别适当。本问只判断地域管辖，不判断300元最终应否支付。",
  ].join("\n\n"),
} as const;

export const civilProcedureUnperformedTransferExercises: UnitExercise[] = [
  {
    id: questionId,
    caseId,
    relatedTopicIds: [civilProcedureUnperformedTransferTopicId],
    kind: "subjective",
    title: "取消的整理预约",
    facts: civilProcedureUnperformedTransferCaseFacts[caseId],
    prompt:
      "陶映准备起诉许苒。本案哪一地的基层法院有地域管辖权？请结合案情说明理由。",
    hint: "",
    reference:
      "本案由澈水县基层法院管辖。合同虽明确约定在霁河县履行，但尚无合同实际履行：9月20日看现场、谈报价在9月22日订约之前，未做后来合同约定的整理；签约后只在自己的日历中记日期，没有提供整理或其他合同服务，许苒也没有付款。两人的住所地又都不在约定的霁河，满足民诉解释第18条第三款的两个条件，应按被告住所地管辖，不能继续把霁河列为可选地点。陶映起诉许苒，许苒是被告，其住所地和经常居住地均在澈水，所以是澈水县法院。此处已有明确履行地点约定，不能因陶映要收300元就跳过第三款，改按收款方锦宁管辖；不判断取消费用请求最终是否成立。",
    criteria: [
      {
        id: `${questionId}-conditions`,
        label: "联系未履行与双方住所，排除约定地点",
        meaning:
          "联系本案尚无合同实际履行、双方住所均不在约定的霁河县两个条件，说明本案不能仅凭该地点约定继续在霁河县起诉。订约前的看现场和签约后自记日历，不是题设合同的整理或其他服务履行。",
        acceptable:
          "‘合同里的整理还没做，钱也没付，双方又都不住在约定的霁河，所以不能只凭约定去霁河告’等义表达足够。可以综合说明条件与法律效果，不要求分别复述看现场、日历、每项未付款或逐一列出服务项目。",
        boundary:
          "不能只核没有整理一个条件而省掉双方住所均不在约定地点，也不能在已经说出两条件后仍保留霁河可选。若仅因订约前看现场或签约后排期便认定合同已履行，须按此处的事实适用偏差说明，不能自动归成‘只要约定就总可管辖’。只报一个正确法院而不说明这两个条件，不足以核准本项；不要求背第18条号、逐动作分析或另外比较旧案。",
      },
      {
        id: `${questionId}-defendant`,
        label: "联系被告身份与澈水县住所",
        meaning:
          "陶映拟起诉的许苒是被告，许苒的住所地与经常居住地均在澈水县；按本案适用的被告住所地连接，应识别澈水县基层法院，而非提供服务并要求收款的陶映所住的锦宁县。",
        acceptable:
          "‘要告的是许苒，所以去被告住的澈水县法院’即可，可与前项写在同一句，不要求把许苒姓名和‘经常居住地一致’重新列全。",
        boundary:
          "不把原告或收款方住处自动当成本案管辖地，不要求独立展开第18条第二款或专属管辖。若已经正确识别许苒为被告及澈水连接，却额外并列霁河，不得谎称没有识别被告住所；保留霁河的错误主要对应前项的例外效果。本项只核身份与住所联系，不重复扣同一排除结论；不另要求费用胜负、解除、赔偿、移送或异议期限。本题只据这一份原答，不从旧题答案补足理由。",
      },
    ],
    sources: Object.keys(civilProcedureUnperformedTransferSources),
  },
];

export const civilProcedureUnperformedTransferCases = [
  {
    id: caseId,
    title: "取消的整理预约",
    facts: civilProcedureUnperformedTransferCaseFacts[caseId],
    questionIds: [questionId],
  },
];
export const civilProcedureUnperformedTransferDefaultQueues = {
  objective: [] as string[],
  subjective: [questionId],
};

/** Reviewer/integrator metadata; never include in pre-answer material or auto-score. */
export const civilProcedureUnperformedTransferReviewNotes = {
  role: "reviewer-and-integrator-only",
  originalCaseId: "CIVPRO-CONTRACT-UNPERFORMED-1",
  originalRevision: "civil-procedure-contract-venue-2026-10-09.v1",
  originalQuestionId: "civpro-contract-unperformed-venue-explain",
  independentNewCase: true,
  differencesFromOriginal: [
    "原案是买方诉卖方未交书架，新案是服务者诉委托人取消预约，原被告与给付方向不同。",
    "原案只有无交货无付款，新案需要区分订约前看现场、签约后自记日历与合同服务履行。",
    "原问已指出安溪理由并提示履行、住所，本问不提出争议说法，不提示条件，也不列可选法院。",
  ],
  proposedCriterionLinks: [
    {
      fromPointId: "civpro-contract-unperformed-venue-explain-conditions",
      toPointId: `${questionId}-conditions`,
      focus: "未履行且双方住所均在约定地点之外时，不能保留约定地点管辖",
    },
    {
      fromPointId: "civpro-contract-unperformed-venue-explain-defendant",
      toPointId: `${questionId}-defendant`,
      focus: "换了合同角色仍按本案被告识别住所地",
    },
  ],
  diagnosticReading: {
    sameMisconceptionStillExpressed:
      "明示只凭合同约定就能选霁河，或已经承认尚无合同履行、双方住所都在别处却仍把霁河与澈水并列可选，仍表达原误解。",
    differentApplicationError:
      "把订约前看现场或自记日历误当合同履行，因而保留霁河，是履行事实识别偏差；不能仅凭错误法院自动断言同一个原误解仍在。",
    insufficientEvidence:
      "只报澈水而没有规则与事实联系，只能看到地点结论，不足以证明旧误解已消除；未提霁河不能自动判成隐含保留霁河。",
    successfulIndependentApplication:
      "联系本案两个例外条件、排除霁河并按许苒的澈水住所识别，可作为这一新案独立应用的证据；一次正确作答仍不自动证明长期掌握。",
  },
  exposureContract:
    "首次作答前仅展示本案完整事实和中性设问，不展示参考、采分、诊断、条件提示、旧答案或预选法院；父级负责实际页面曝光。",
  runtimeContract:
    "只向现有知识点和书面队列追加新题，以新questionId和revision单独保存原答/反馈；原两案题文、原答、旧分及版本保留。",
  noAutomaticMisconceptionClassifier: true,
  noRealLearnerAnswerExamples: true,
  noOfficialMarkingSchemeClaim: true,
} as const;

export function civilProcedureUnperformedTransferQuestion(
  id: string,
): UnitExercise | undefined {
  const question = civilProcedureUnperformedTransferExercises.find(
    (item) => item.id === id,
  );
  return question ? structuredClone(question) : undefined;
}
export function civilProcedureUnperformedTransferSameCaseQuestions(
  id: string,
): UnitExercise[] {
  const question = civilProcedureUnperformedTransferQuestion(id);
  return question ? [question] : [];
}
export function civilProcedureUnperformedTransferPromptMaterial(id: string) {
  const question = civilProcedureUnperformedTransferQuestion(id);
  return question
    ? {
        id: question.id,
        caseId: question.caseId,
        revision: civilProcedureUnperformedTransferRevision,
        title: question.title,
        kind: question.kind,
        facts: question.facts,
        prompt: question.prompt,
      }
    : null;
}
