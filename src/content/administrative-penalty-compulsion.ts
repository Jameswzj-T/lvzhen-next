import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";

/** Original fictional teaching cases; no enforcement files or learner records. */
export const administrativePenaltyCompulsionRevision =
  "administrative-penalty-compulsion-2026-10-10.v1";
const topicId = "admin-penalty-and-compulsion";
const fineCaseId = "ADMIN-ORIGINAL-FINE-1";
const seizureCaseId = "ADMIN-INVESTIGATION-SEIZURE-1";

export const administrativePenaltyCompulsionSources: ContentSources = {
  "admin-penalty-2021": {
    title: "《行政处罚法》2021修订文本第2条、第9条",
    url: "https://scjgj.beijing.gov.cn/cxfw/flfgcxfw/qt/202203/t20220331_2645278.html",
    note: "北京市市场监督管理局2022-03-31公布全文；2026-10-10定向读取。前言载2021-01-22修订，第86条载2021-07-15施行。支持行政处罚的惩戒性质与罚款类型，不能由财产负担或持续时间单独分类。案例、参考和采分为自编教学内容，不是官方试题或阅卷细则。",
  },
  "admin-compulsion-2011": {
    title: "《行政强制法》第2条、第9条：临时控制与扣押财物",
    url: "https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/bgt/art/2025/art_c5b6bfc45a5e45ca91b4a1ad2a1d2d93.html",
    note: "国家市场监督管理总局2025-07-25重刊；正文载2011-06-30通过，第71条载2012-01-01施行，重刊日期不是修法日期。2026-10-10定向读取第2条、第9条。只练普通行政管理中暂时控制涉案财物的措施，不展开突发事件应急措施、强制执行和具体扣押程序。",
  },
  "admin-food-2025": {
    title: "《食品安全法》2025修正文本第110条第4项、第124条第1款第5项",
    url: "https://policy.mofcom.gov.cn/claw/clawContent.shtml?id=104105",
    note: "商务部全球法规网，信息来源标为国家法律法规数据库；2026-10-10直接读取2025-09-12第三次修正前言、2025-12-01实施标示及两条对应正文。第110条支持有证据证明存在安全隐患等情形的查封、扣押职权；第124条支持经营超过保质期食品的罚款依据。本单元只识别题目指定行为性质，罚款幅度、免罚情形及整个决定合法性不另设必答。",
  },
  "admin-food-2025-amendment": {
    title: "2025-09-12关于修改《食品安全法》的决定",
    url: "https://wjw.yantai.gov.cn/art/2025/9/18/art_5683_2903928.html",
    note: "烟台市卫生健康委员会2025-09-18刊载修改决定；2026-10-10直接读取。决定2025-12-01施行，修改第41、81、82、124、132条，其中第124条增加婴幼儿配方液态乳相关表述；本题采用的第124条第1款第5项未在该决定中改变。不把2021食品安全法标为本单元所用现行修正版。",
  },
  "admin-effective-directory": {
    title: "现行有效法律目录：行政处罚法、行政强制法和食品安全法版本",
    url: "https://www.samr.gov.cn/fgs/sjdt/art/2026/art_93a4fbac2ce14ab6baab60b0cd452ef4.html",
    note: "市场监管总局转载中国人大网目录，2026-09-18发布，数据截至2026-08-28；本轮只读复用2026-10-10已下载的公开官方正文，对应三行分别列2021修订、2011通过、2025修正。网页工具省略行政法部分的无命中不证明法律不存在或失效。目录截止日不等于读取日，本轮未完成截止日之后全法效力穷尽核验，入库前独立内容审校仍待完成。",
  },
};

export const administrativePenaltyCompulsionPreparation = {
  status: "isolated-content-candidate-not-registered",
  sourceCheckedAt: "2026-10-10",
  subjectId: "administrative-law",
  subjectLabel: "行政",
  independentCases: 2,
  objectiveQuestions: 2,
  writtenQuestions: 2,
  teachingCards: 1,
  officialTargetedArticlesDirectlyRead: true,
  effectiveDirectoryCutoff: "2026-08-28",
  sameDayLiveNpcStatusConfirmed: false,
  completeCurrentEffectAudit: false,
  independentContentReviewApproved: false,
  registeredInDefaultProduct: false,
  enforcementFactsAreFictional: true,
  fictionalChecksAreActualReceipts: false,
  annualSyllabusCoverageClaim: false,
  scope: "原始罚款决定的惩戒性质与普通调查中扣押财物的临时控制性质",
} as const;

export const administrativePenaltyCompulsionCaseFacts = {
  [fineCaseId]: [
    "本案为教学虚构。2026年3月，晨禾超市有限公司的负责人已经收到库存核对单，知道一批饼干超过包装标注的保质期，仍安排上架出售。销售记录、库存核对单和包装日期相互对应；区市场监督管理局依法调查，查明了上述销售事实。该行为尚不构成犯罪。",
    "该局履行本区食品安全监督管理职责，依法作出处理决定，其中一项是针对上述销售行为处以罚款，要求超市缴纳相应款项。本问只分析决定中这项罚款的性质，机关职权和决定程序均作为符合法律要求的题设前提，不考金额是否适当，也不讨论后来催缴、加处罚款等执行行为。",
  ].join("\n\n"),
  [seizureCaseId]: [
    "本案为另一独立教学虚构。2026年4月，区市场监督管理局在对欣岳食品公司的普通监督检查中，发现仓库一批袋装豆干准备发货。已依法取得的检验报告载明，该批豆干的一项致病性微生物指标超过适用食品安全标准限值；报告与现场批次的对应已经核实。",
    "为防止这批食品继续流入销售环节，该局依据食品安全法规定的职权，决定对该批豆干实施扣押，在规定期限内暂时控制这些财物，继续调查并依法作后续处理。现在尚未作出对这批食品的没收处罚决定，也没有要求履行某项已经作出而未履行的行政决定。扣押的职权、程序和期限均作为符合法律要求的题设前提；本案是普通监管，不涉及突发事件应急处置。本问只分析本次扣押的性质。",
  ].join("\n\n"),
} as const;

const commonSourceKeys = [
  "admin-penalty-2021",
  "admin-compulsion-2011",
  "admin-effective-directory",
];
const fineSourceKeys = [
  ...commonSourceKeys,
  "admin-food-2025",
  "admin-food-2025-amendment",
];
const seizureSourceKeys = [...commonSourceKeys, "admin-food-2025"];

export const administrativePenaltyCompulsionExercises: UnitExercise[] = [
  {
    id: "admin-original-fine-choice",
    caseId: fineCaseId,
    relatedTopicIds: [topicId],
    kind: "objective",
    choiceMode: "single",
    title: "已作出的罚款决定",
    facts: administrativePenaltyCompulsionCaseFacts[fineCaseId],
    prompt: "只判断决定中的这项原始罚款，下列哪项正确？",
    options: [
      {
        id: "a",
        text: "属于行政强制措施，因为它使超市承担财产负担。",
        explanation:
          "财产负担不能替代对作用和法律效果的判断，罚款也会增加义务。",
      },
      {
        id: "b",
        text: "属于行政处罚，是针对已查明违法销售行为作出的惩戒。",
        explanation:
          "本问指原始罚款决定，针对违法行为设定缴纳义务，罚款属于行政处罚类型。",
      },
      {
        id: "c",
        text: "属于行政强制执行，因为决定要求超市缴款。",
        explanation:
          "作出罚款决定与强制履行未履行的既有义务是不同环节，本问没有后一事实。",
      },
      {
        id: "d",
        text: "属于行政机关与超市之间自愿协商的民事赔偿。",
        explanation:
          "该局依法行使监管职权并对违法销售罚款，题设没有自愿协商的赔偿关系。",
      },
    ],
    answer: "b",
    hint: "",
    reference:
      "选B。该局查明超市销售超过保质期的食品后，依法就这一违法行为处以罚款，罚款属于行政处罚类型。它以增加缴纳义务等方式予以惩戒，并非调查期间对一批财物的暂时控制。题目只问作出罚款决定的行为，不能因为决定要求缴款，就把它改认成后续强制执行。",
    sources: [...fineSourceKeys],
  },
  {
    id: "admin-original-fine-explain",
    caseId: fineCaseId,
    relatedTopicIds: [topicId],
    kind: "subjective",
    title: "财产负担能否说明是强制措施",
    facts: administrativePenaltyCompulsionCaseFacts[fineCaseId],
    prompt:
      "超市称：‘这项罚款让我们少了财产，所以它只是行政强制措施。’这一说法能否成立？请结合这项罚款的作用和法律效果说明理由。",
    hint: "",
    reference:
      "不能成立。行政处罚针对违反行政管理秩序的行为，以减损权益或增加义务等方式惩戒，罚款是法定处罚类型；行政强制措施则要结合其行政管理目的和对人身、财物的暂时控制效果判断，不能只看有无财产负担。本案原始罚款针对已经查明的过期食品销售行为，要求超市缴纳款项，产生惩戒性的缴纳义务。它并非为调查或控制涉案食品而暂时扣住一批财物，因此不能按超市的理由认作行政强制措施。",
    criteria: [
      {
        id: "admin-original-fine-explain-rule",
        label: "说明罚款的惩戒性质",
        meaning:
          "说明行政处罚是对违反行政管理秩序行为的惩戒，罚款属于处罚类型；不能仅凭带来财产负担就认作行政强制措施。",
        acceptable:
          "‘罚款是对违法行为的处罚，让人交钱本身不能说明它就是强制措施’等表达足以说明这一区别；规则和本案结论可以合写。",
        boundary:
          "不要求逐字复述定义、固定术语、条号或单独结论句；不能把所有金钱负担一概说成行政处罚。此问不考整个决定是否合法、罚款数额、其他处罚、强制执行程序或救济，不从同案客观选择及解析补足本问原答。",
      },
      {
        id: "admin-original-fine-explain-application",
        label: "联系销售行为与缴纳义务",
        meaning:
          "联系已查明的过期食品销售行为和本次罚款产生的缴纳义务，说明这是针对违法行为的惩戒，而非调查期间对涉案财物的暂时控制，超市的说法不能成立。",
        acceptable:
          "‘局里因超市已经卖过期饼干而罚它交钱，是惩戒这个违法行为，不是在调查中暂时扣住这些货物，所以超市说法不对’可在一段中承接规则与案情两点。",
        boundary:
          "不要求逐列库存单、包装日期和全部调查材料；说清被处罚的销售行为与缴款义务、区别于临时控制财物即可。结论可融在理由中，不另拆第三采分点；不要求分析后续催缴或加处罚款。",
      },
    ],
    sources: [...fineSourceKeys],
  },
  {
    id: "admin-investigation-seizure-choice",
    caseId: seizureCaseId,
    relatedTopicIds: [topicId],
    kind: "objective",
    choiceMode: "single",
    title: "调查期间扣住的食品",
    facts: administrativePenaltyCompulsionCaseFacts[seizureCaseId],
    prompt: "对本次在规定期限内实施的扣押，下列哪项正确？",
    options: [
      {
        id: "a",
        text: "属于没收财物的行政处罚，因为公司暂时不能支配这批食品。",
        explanation: "不能支配财物这一表面效果不足以把临时扣押变为没收处罚。",
      },
      {
        id: "b",
        text: "属于行政强制执行，因为该局的行为并不需要公司同意。",
        explanation:
          "是否需要同意不能替代强制执行的既有义务未履行前提，本案也无该前提。",
      },
      {
        id: "c",
        text: "属于行政强制措施，是为控制这批有安全问题的食品而暂时扣押财物。",
        explanation:
          "结合已核实的食品安全证据、阻止继续流通的作用与暂时控制效果，属于行政强制措施中的扣押。",
      },
      {
        id: "d",
        text: "属于普通民事保管，因为货物仍归公司所有。",
        explanation:
          "财物所有权未因暂时扣押转移，不表示公权力实施的扣押变成民事保管关系。",
      },
    ],
    answer: "c",
    hint: "",
    reference:
      "选C。本案检验报告及批次联系已核实，食品存在具体安全问题，监管机关为阻止其继续流通，在调查中依法暂时扣押这批财物，符合行政强制措施的作用和效果，扣押财物也是其法定类型。公司暂时不能支配货物不等于已经受到没收处罚；本案没有未履行的既有行政决定，不能因此改认强制执行。",
    sources: [...seizureSourceKeys],
  },
  {
    id: "admin-investigation-seizure-explain",
    caseId: seizureCaseId,
    relatedTopicIds: [topicId],
    kind: "subjective",
    title: "扣押是否已经等同没收",
    facts: administrativePenaltyCompulsionCaseFacts[seizureCaseId],
    prompt:
      "公司称：‘不能支配这批食品就是受了处罚，本次扣押已经等同于没收。’这一说法能否成立？请结合扣押的作用和法律效果说明理由。",
    hint: "",
    reference:
      "不能成立。行政强制措施是在行政管理中，结合制止违法、避免危害等目的，对人身或财物作暂时限制、控制；扣押财物是其法定类型。行政处罚则是针对违法行为作出的惩戒，不能只凭财物一时不能支配就将扣押等同没收。本案有检验报告及批次对应支持食品安全问题，该局为防止这批豆干继续流通，在调查中按规定期限暂时扣押，后续处理尚待依法作出。现在分析的是这种暂时控制，题设也没有作出没收处罚决定，因此不能按公司的理由认定为没收处罚。",
    criteria: [
      {
        id: "admin-investigation-seizure-explain-rule",
        label: "说明临时扣押与没收的区别",
        meaning:
          "说明应结合行政管理中的制止违法、避免危害等目的及对财物的暂时控制效果识别行政强制措施，扣押属于这种措施；不能由一时不能支配财物就认定为没收处罚。",
        acceptable:
          "‘依法为防止问题食品流出去而暂时扣住货，是强制措施；不能动货并不等于已经没收处罚’等表达可以把规则与案情合写。",
        boundary:
          "不要求穷尽法条中所有目的、固定‘暂时性控制’措辞或条号；须表达结合管理作用与暂时控制效果的区别，不能只凭持续时间短就判断。此问不考全部扣押程序、具体期限数字、没收的全部成立条件、其他处罚或救济，不从同案客观选择及解析补足本问原答。",
      },
      {
        id: "admin-investigation-seizure-explain-application",
        label: "联系安全证据与调查中的控制",
        meaning:
          "联系已核实的该批食品安全问题、阻止其继续流通的作用和调查中按期限暂时扣押的效果，说明后续处置尚未作出，本次扣押不等于已经作出没收处罚，公司的说法不能成立。",
        acceptable:
          "‘检验结果与这批豆干对得上，局里为防止继续发货先依法扣住，调查后再作处理，当前不是没收处罚，所以公司说法不成立’等综合表达可承接两点。",
        boundary:
          "不要求复述微生物名称、限值、报告原话或每项现场细节；说明有安全问题证据与暂时控制的联系即可。说明调查中暂时控制、待后续处理已足以表达尚非没收，不强求另写‘未作没收决定’固定句；结论可融入理由，不另拆第三点，也不要求预测后来是否处罚。",
      },
    ],
    sources: [...seizureSourceKeys],
  },
];

export const administrativePenaltyCompulsionCases = (
  [fineCaseId, seizureCaseId] as const
).map((id) => ({
  id,
  facts: administrativePenaltyCompulsionCaseFacts[id],
  questionIds: administrativePenaltyCompulsionExercises
    .filter((question) => question.caseId === id)
    .map((question) => question.id),
}));

export const administrativePenaltyCompulsionTopics: FaultTopic[] = [
  {
    id: topicId,
    title: "行政处罚与行政强制措施",
    headline: "这次处理是在惩戒违法，还是暂时控制人或财物？",
    goal: "结合依据、作用和法律效果，区分原始罚款决定与普通调查中的扣押措施。",
    prerequisite: "知道行政机关依法管理公共事务；本节从两种具体行为开始。",
    minutes: "8–12",
    paragraphs: [
      "行政处罚针对违反行政管理秩序的行为，用减损权益、增加义务等方式予以惩戒。罚款是法定处罚类型。例如，查明违法销售后决定罚款，是因违法而产生缴纳义务。本节只看作出原始罚款决定这一步。",
      "行政强制措施在行政管理中，为制止违法、防止证据损毁、避免危害或控制危险扩大等，依法暂时限制人身自由或控制财物。查封、扣押等属于其法定类型。普通监管中有食品安全问题证据，为阻止食品继续流通而暂时扣押，不能直接等同于已经作出没收处罚。",
      "两类行为都可能使当事人受限制或有损失，也都服务于行政管理。不能只凭‘少了财产’‘是为了防止问题’或持续时间长短分类：行政处罚中也有暂扣许可证件。应看本次具体行为的法律依据、实际作用和效果。暂时控制财物后还要依法作后续处理，不代表以后必然免罚，也不代表以后必然没收。",
    ],
    example: {
      title: "先固定决定中的哪项处理",
      facts: administrativePenaltyCompulsionCaseFacts[fineCaseId],
      analysis:
        "本问分析该局针对已查明的过期食品销售行为处以罚款。产生缴纳义务是惩戒违法的法律效果，属于行政处罚；不能只因超市将少一笔钱而认作暂时控制财物。后续是否催缴、是否强制执行是另外的行为，应另据具体事实分析。",
    },
    pitfall:
      "把所有财产限制当作处罚，或只见‘暂时’两字就把有期限的处罚改认成强制措施。",
    recall: {
      prompt:
        "原始罚款决定与普通调查中的扣押，为什么不能只凭有无财产损失或持续时间来区分？",
      reference:
        "要结合本次行为的依据、作用和法律效果。原始罚款决定针对已查明违法行为予以惩戒并产生缴纳义务；调查中依法为制止违法或避免危害等而暂时扣押涉案财物，是行政强制措施。两者都可能有财产限制，处罚也可能有期限；临时扣押不等于已经没收，后续处理仍须依法另作。",
    },
    sources: Object.keys(administrativePenaltyCompulsionSources),
    exercises: administrativePenaltyCompulsionExercises,
  },
];

/** Registration proposal only: this module does not create an available subject. */
export const administrativePenaltyCompulsionChapter = {
  id: "ADMIN-ADMINISTRATIVE-ACTIONS",
  title: "行政行为基础",
  section: "行政法",
  topicIds: administrativePenaltyCompulsionTopics.map((topic) => topic.id),
};
export const administrativePenaltyCompulsionContentPack = {
  revision: administrativePenaltyCompulsionRevision,
  snapshot: {
    topics: administrativePenaltyCompulsionTopics,
    sources: administrativePenaltyCompulsionSources,
  },
};
export const administrativePenaltyCompulsionDefaultQueues = {
  objective: administrativePenaltyCompulsionExercises
    .filter((question) => question.kind === "objective")
    .map((question) => question.id),
  subjective: administrativePenaltyCompulsionExercises
    .filter((question) => question.kind === "subjective")
    .map((question) => question.id),
};
export function administrativePenaltyCompulsionQuestion(
  id: string,
): UnitExercise | undefined {
  const question = administrativePenaltyCompulsionExercises.find(
    (item) => item.id === id,
  );
  return question ? structuredClone(question) : undefined;
}
export function administrativePenaltyCompulsionTopicForQuestion(
  id: string,
): FaultTopic | undefined {
  return administrativePenaltyCompulsionQuestion(id)
    ? structuredClone(administrativePenaltyCompulsionTopics[0])
    : undefined;
}
export function administrativePenaltyCompulsionSameCaseQuestions(
  id: string,
): UnitExercise[] {
  const question = administrativePenaltyCompulsionQuestion(id);
  return question
    ? structuredClone(
        administrativePenaltyCompulsionExercises.filter(
          (item) => item.caseId === question.caseId,
        ),
      )
    : [];
}
export function administrativePenaltyCompulsionPromptMaterial(id: string) {
  const question = administrativePenaltyCompulsionQuestion(id);
  return question
    ? {
        id: question.id,
        caseId: question.caseId,
        revision: administrativePenaltyCompulsionRevision,
        title: question.title,
        kind: question.kind,
        facts: question.facts,
        prompt: question.prompt,
      }
    : null;
}
