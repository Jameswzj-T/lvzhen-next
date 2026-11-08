import type { ContentSources, UnitExercise } from "./fault-unit";
import { criminalProcedureProofSources } from "./criminal-procedure-proof";

/** One original fictional transfer case; no real case file or learner answer. */
export const criminalProcedurePartialCorroborationRevision =
  "criminal-procedure-partial-corroboration-2026-10-10.v1";
export const criminalProcedurePartialCorroborationTopicId =
  "crimpro-evidence-and-confession";
const caseId = "CRIMPRO-PARTIAL-CORROBORATION-1";
const questionId = "crimpro-confession-partial-corroboration-explain";

/** Reuse the registered article-55 sources without rewriting their notes. */
export const criminalProcedurePartialCorroborationSources: ContentSources =
  structuredClone(criminalProcedureProofSources);
export const criminalProcedurePartialCorroborationPreparation = {
  status: "isolated-content-candidate-not-registered",
  sourceCheckedAt: "2026-10-10",
  officialVersion: "2018-10-26 third amendment",
  existingArticle55SourceAndVersionReused: true,
  sameDayGovernmentClauseSnapshotRead: true,
  authorizedArticle55WebReadThisBatch: true,
  freshNpcStatusCallThisBatch: false,
  effectiveDirectoryCutoffReused: "2026-08-28",
  completeCurrentEffectAudit: false,
  independentContentReviewApproved: false,
  registeredInDefaultProduct: false,
  subjectId: "criminal-procedure",
  existingTopicId: criminalProcedurePartialCorroborationTopicId,
  existingChapterId: "CRIMPRO-EVIDENCE-FOUNDATION",
  independentCases: 1,
  objectiveQuestions: 0,
  writtenQuestions: 1,
  newTeachingCards: 0,
  scope:
    "区分同一供述的载体、另外来源的门禁材料及全案证明是否足以解决具体移库疑点",
  fictionalCourtChecksAreActualReceipts: false,
  realLearnerUnseenStatusKnown: false,
  annualSyllabusCoverageClaim: false,
} as const;

export const criminalProcedurePartialCorroborationCaseFacts = {
  [caseId]: [
    "本案为教学虚构。成年被告人舒霖被指控于9月18日晚从澄川检测中心的设备间取走一台测量仪。9月21日，他在合法讯问中供述：9月18日20时10分，他从设备间东侧置物架拿走编号YC-417的测量仪，装进自己的工具箱带出。讯问制作了笔录并同步录音，笔录和录音完整记录了这一次讲述。",
    "检测中心的实名门禁系统在9月18日当晚生成原始通行日志。日志已依法调取，其中身份核验、时间字段及该次进入事件经法定程序查证属实，记载舒霖本人于20时05分通过设备间入口。系统只记录入口核验和通行事件，没有采集或保存室内活动、携带物品离开的影像。",
    "另有一份9月18日18时40分形成的移库登记，记载‘编号YC-417测量仪已从设备间移到2号库房’，接收栏空白。登记原始文件、录入时间和编号记载已核实，但当天是否实际按登记搬运，以及该仪器在20时10分究竟位于何处，现有材料尚未查清。案内没有当天的搬运影像、完整交接记录或其他材料把这段情况说明清楚，也没有拍到舒霖拿取仪器或携物离开。所有所列材料均为合法取得，本问只据这些材料判断取走仪器这一指控的证明，不判断具体罪名、刑罚或调查安排。",
  ].join("\n\n"),
} as const;

export const criminalProcedurePartialCorroborationExercises: UnitExercise[] = [
  {
    id: questionId,
    caseId,
    relatedTopicIds: [criminalProcedurePartialCorroborationTopicId],
    kind: "subjective",
    title: "门禁记录证明了什么",
    facts: criminalProcedurePartialCorroborationCaseFacts[caseId],
    prompt:
      "依据目前这些材料，能否认为取走仪器这一指控已经达到定罪所需的证明要求？结合材料的来源及所能说明的事实，说明理由。",
    hint: "",
    reference:
      "目前不能认定该指控已经达到所需的证明要求。供述及其笔录、同步录音仍以舒霖同一次讲述为案情来源，换载体没有增加另一来源的证明；门禁日志则由系统在当天形成，已经依法核实舒霖本人20时05分进入设备间，本案不能再说没有其他案情材料。但这份日志没有记录室内拿取或携物离开，进入设备间不能直接证明取走这台仪器。较早的移库登记记载同编号仪器已被送往2号库房，实际搬运与仪器20时10分的位置却未查清，这直接关系到供述所述时间、地点是否有该仪器可供拿取。这个具体疑点尚未由给定材料解决，综合现有材料尚不能认为对所问拿取事实已排除合理怀疑；有另外来源的材料，不等于全案已经证明充分。也不能把移库尚未查清硬写成已经证明仪器搬走或舒霖没有取走。",
    criteria: [
      {
        id: `${questionId}-sources`,
        label: "区分供述记录与另来源材料",
        meaning:
          "区分舒霖的供述及其笔录、同步录音同出一次讲述，与系统另行形成并核实的门禁日志；不能因载体不同把供述记录彼此当作独立印证，也须承认本案已经存在供述以外的案情材料。",
        acceptable:
          "‘纸上和录音里都是记他这一次说的话，但当天系统记下的入门记录是另一份材料’等整体表达足够，不要求固定使用‘独立证据’或逐项点名全部载体。",
        boundary:
          "本案确有另外来源材料，不能机械照搬旧案说全案只有供述；只列笔录、录音、门禁三个名称而不区分来源也不够。不要求给门禁材料定证据种类、背条号、完整复述‘只有口供不能定罪’或提出取证方案；只据本问原答，不从旧题或旧反馈补足理由。",
      },
      {
        id: `${questionId}-sufficiency`,
        label: "联系入门范围与未解移库疑点",
        meaning:
          "联系门禁只核实本人进入、没有记录拿取或携物离开的范围，以及同编号仪器移库登记与供述所述拿取时间、地点之间尚未查清的具体疑点，说明目前不能认为所问指控已达到证明要求；不能只因有其他材料或载体增多就认定全案充分。",
        acceptable:
          "‘能确定他进了设备间，但没记录带走仪器；同号仪器是否早已移库还没弄清，那时屋内是否有它可拿仍有疑问，所以现在还不能说指控已证明充分’可以表达本点，不要求逐字复述时刻、编号或全部缺失材料。",
        boundary:
          "允许在说明本案现有疑点及其影响的基础上作条件式分析，例如关键位置事实未核清时目前不能认定充分；不要求另列完整三项标准、独立结论句、他罪责任、最终裁判方式或调查计划。不能把未查明的实际移库当成已证明搬走或已证明没搬走，也不能把有门禁等同于必然充分。若已说清现有证明范围、具体移库疑点与当前不足的联系，未另写‘不等于已经证明无罪’提醒不单独作漏答。",
      },
    ],
    sources: Object.keys(criminalProcedurePartialCorroborationSources),
  },
];

export const criminalProcedurePartialCorroborationCases = [
  {
    id: caseId,
    title: "门禁记录证明了什么",
    facts: criminalProcedurePartialCorroborationCaseFacts[caseId],
    questionIds: [questionId],
  },
];
export const criminalProcedurePartialCorroborationDefaultQueues = {
  objective: [] as string[],
  subjective: [questionId],
};

/** Integrator notes only: not pre-answer material or a grading classifier. */
export const criminalProcedurePartialCorroborationReviewNotes = {
  role: "reviewer-and-integrator-only",
  independentNewCase: true,
  sourceQuestionId: "crimpro-confession-only-explain",
  sourceRevision: "criminal-procedure-proof-2026-10-10.v1",
  sourcePointId: "crimpro-confession-only-explain-application",
  targetPointIds: [`${questionId}-sources`, `${questionId}-sufficiency`],
  substantiveDifference:
    "原案无其他案情证据；新案确有依法核实的另来源门禁材料，但只记录进入，另有同号仪器移库的具体未解疑点。不能用旧案的‘没有任何其他证据’理由完成本问。",
  exposureContract:
    "本案只提供一个中性书面设问，不放入既有知识卡示例、回忆参考或同案选择题。题文/提示/参考是否已经曝光须由父级按实际本地记录判定；作者未读真实学习记录，不声称对每位用户都未见。",
  runtimeContract:
    "向既有第55条知识点的练习列表和书面队列追加本题，另立revision归档；不改变旧卡正文、示例、回忆及原八题。父级负责新版本快照、实际曝光和原答/反馈独立绑定。",
  noAutomaticMisconceptionClassifier: true,
  noRealLearnerAnswerExamples: true,
  noOfficialMarkingSchemeClaim: true,
} as const;

export function criminalProcedurePartialCorroborationQuestion(
  id: string,
): UnitExercise | undefined {
  const question = criminalProcedurePartialCorroborationExercises.find(
    (item) => item.id === id,
  );
  return question ? structuredClone(question) : undefined;
}
export function criminalProcedurePartialCorroborationSameCaseQuestions(
  id: string,
): UnitExercise[] {
  const question = criminalProcedurePartialCorroborationQuestion(id);
  return question ? [question] : [];
}
export function criminalProcedurePartialCorroborationPromptMaterial(
  id: string,
) {
  const question = criminalProcedurePartialCorroborationQuestion(id);
  return question
    ? {
        id: question.id,
        caseId: question.caseId,
        revision: criminalProcedurePartialCorroborationRevision,
        title: question.title,
        kind: question.kind,
        facts: question.facts,
        prompt: question.prompt,
      }
    : null;
}
