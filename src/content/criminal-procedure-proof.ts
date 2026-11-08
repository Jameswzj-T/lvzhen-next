import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";

/** Two original fictional evidence cases, not trial records or learner submissions. */
export const criminalProcedureProofRevision =
  "criminal-procedure-proof-2026-10-10.v1";
const topicId = "crimpro-evidence-and-confession";
const confessionCaseId = "CRIMPRO-CONFESSION-ONLY-1";
const noConfessionCaseId = "CRIMPRO-NO-CONFESSION-SUFFICIENT-1";

export const criminalProcedureProofSources: ContentSources = {
  "crimpro-proof-article55": {
    title: "《刑事诉讼法》2018修正文本第55条：供述与证据确实、充分",
    url: "https://www.szns.gov.cn/xxgk/bmxxgk/nsgafj/xxgk_99908/zcfg_99917/zcfgjgfxwj_99918/content/post_11403805.html",
    note: "2026-10-10定向直读南山区政府网站公布的2018修正文本第55条；网页2024-07-03发布，来源深圳市公安局，前言载明2018-10-26第三次修正。网页另加的条文标签不作为法条原文。本单元只采用第55条的口供限制与三项确实充分条件；自编参考和采分不是官方阅卷细则。",
  },
  "crimpro-proof-authorized-text": {
    title: "新华社受权发布《刑事诉讼法》：第55条对应原文",
    url: "https://www.xinhuanet.com/politics/2018-10/27/c_1123620821_5.htm",
    note: "受权发布于2018-10-27；2026-10-10直接读证据章中的第55条，与政府转载正文核对。第50—52、56条仅定向读作证据来源和相邻范围边界，不新增非法证据排除、强制自证或举证责任考点。NPC本批标题接口返回code500，未冒称该接口当天有效状态核验成功。",
  },
};

export const criminalProcedureProofPreparation = {
  status: "isolated-content-candidate-not-registered",
  sourceCheckedAt: "2026-10-10",
  officialArticle55DirectlyRead: true,
  authorizedArticle55DirectlyRead: true,
  freshNpcEffectiveStatusConfirmed: false,
  independentContentReviewApproved: false,
  registeredInDefaultProduct: false,
  proposedSubjectId: "criminal-procedure",
  proposedSubjectLabel: "刑诉",
  independentCases: 2,
  objectiveQuestions: 2,
  writtenQuestions: 2,
  teachingCards: 1,
  scope: "定罪证据标准基础：只有供述不足；没有供述仍须全案证据确实充分",
  fictionalCourtChecksAreActualReceipts: false,
  annualSyllabusCoverageClaim: false,
} as const;

export const criminalProcedureProofCaseFacts = {
  [confessionCaseId]: [
    "本案为教学虚构。成年被告人周屿被指控从一栋楼的公共储物处取走他人的咖啡机。周屿先后三次供述是自己拿走的，描述的时间、位置和拿取过程一致。三次询问均制作了笔录和录音，录音记录的是周屿讲述的内容，不是案发现场。",
    "目前用来证明拿取咖啡机这一指控的案情材料，只有周屿的这些供述及记录同一供述的笔录、录音；没有被害人报失陈述、现场证人、案发影像、找回的物品或其他独立证明案情的证据，咖啡机是否实际被取走、归属和价值等也未由其他材料核实。",
    "题设已明确供述取得合法、记录忠实，不考非法取证问题。本问只判断目前证据是否足以据此定罪，不判断具体罪名、刑期或下一步侦查安排；不能自行补入案卷未有的证据。",
  ].join("\n\n"),
  [noConfessionCaseId]: [
    "本案为另一独立教学虚构。成年被告人迟栩被指控把梁安放在摄影器材店柜台上的相机装进自己的包，未经梁安允许带走；迟栩没有作出关于本次拿取行为的有罪供述。本问不设置具体罪名或刑罚争议，只判断缺少供述对定罪证据条件的影响。",
    "店内原始连续录像清楚记录了迟栩的面部、装包和离店过程；两名当时在场且认识迟栩的店员分别讲述了亲眼看见的同一过程。依法扣押的相机机身编号与梁安的购机票据、原始保管登记一致，扣押和交接记录连续。票据、依法核实的价值材料及其他案内证据也证明了相机归属、价值和本案其余定罪量刑所需事实。",
    "庭审已经依照法定程序逐项调查核实上述作为定案依据的证据，确认来源、取得过程与内容属实。法庭结合连续画面、各人具体陈述、编号及交接材料核对了误认他人、主人同意借走等合理解释，已有证据排除了这些疑点；综合全案证据，对所认定事实已排除合理怀疑，不存在尚待解决的合理矛盾。本题把这些核查结果作为明确事实，并不是仅凭有录像或证人就推定证据充分。",
  ].join("\n\n"),
} as const;

const sourceKeys = Object.keys(criminalProcedureProofSources);
export const criminalProcedureProofExercises: UnitExercise[] = [
  {
    id: "crimpro-confession-only-choice",
    caseId: confessionCaseId,
    relatedTopicIds: [topicId],
    kind: "objective",
    choiceMode: "single",
    title: "三次一致的讲述",
    facts: criminalProcedureProofCaseFacts[confessionCaseId],
    prompt: "只就目前证据能否支持定罪，下列判断哪项正确？",
    options: [
      {
        id: "a",
        text: "三次供述细节一致，已经足以据此定罪。",
        explanation:
          "同一人的重复供述不能补成独立证据，只有供述仍受第55条限制。",
      },
      {
        id: "b",
        text: "目前不能只据这些供述定罪；记录次数和形式没有补足其他案情证据及整体证明要求。",
        explanation:
          "案情来源仍只有周屿供述，没有其他证据核实指控事实，不能以多次一致或有笔录录音代替确实充分的全案证据。",
      },
      {
        id: "c",
        text: "补一份周屿的身份信息材料，现有口供就足以定罪。",
        explanation:
          "身份信息不当然证明咖啡机被取走等全部定罪量刑事实；不是出现任意一份其他材料就达到证据确实充分。",
      },
      {
        id: "d",
        text: "供述取得合法且记录真实，已经等于指控事实被充分证明。",
        explanation:
          "取得合法、准确记录陈述不等于所述犯罪事实已经由全案证据充分证明，本案仍只有供述。",
      },
    ],
    answer: "b",
    hint: "",
    reference:
      "选B。周屿三次讲述及其记录都是以同一人的供述为案情来源，不是案发影像或其他独立核实事实的证据。第55条不允许在只有被告人供述、没有其他证据时认定有罪并处刑。供述一致、取得合法仍不能补足这个缺口；也不是以后加任何一份材料就自动达到定罪标准。这里只判断目前证据不足，不作具体罪名或刑期判断。",
    sources: [...sourceKeys],
  },
  {
    id: "crimpro-confession-only-explain",
    caseId: confessionCaseId,
    relatedTopicIds: [topicId],
    kind: "subjective",
    title: "承认了几次就够吗",
    facts: criminalProcedureProofCaseFacts[confessionCaseId],
    prompt:
      "周屿三次承认且细节一致，是否足以在目前证据条件下定罪？请结合本案说明理由。",
    hint: "",
    reference:
      "不足以定罪。定罪不能只凭被告人供述，在只有供述而没有其他证据时不能认定有罪并处刑。本案的三份笔录和录音记录的是周屿重复讲述，不是他人对案发事实的独立证明或案发影像；未取得其他证据核实拿取、物品归属、价值等事实。供述一致或取得合法不能代替这样的核实，仍须其他证据与全案证明达到确实充分的要求，而不是只补一份身份材料就够。",
    criteria: [
      {
        id: "crimpro-confession-only-explain-rule",
        label: "说明只有供述不足以定罪",
        meaning:
          "明确目前不足以据此定罪，并说明只有被告人供述、没有其他证据时，不能认定有罪并处刑；供述多次一致也不免除该限制。",
        acceptable:
          "‘只有他自己说拿了、没有别的证据，哪怕说了三次一样也还不能定罪’等义表达足够，可与案情联系合写。",
        boundary:
          "不把‘不能仅凭供述定罪’写成供述一律没有证明价值或一律应删除。结论可含在论证中，不要求单列结论句、背条号、确定罪名刑期或提出侦查措施；不要求另作无罪判决程序分析。",
      },
      {
        id: "crimpro-confession-only-explain-application",
        label: "识别重复记录仍未补足案情证明",
        meaning:
          "联系本案笔录、录音只是重复记录周屿的供述，而无其他证据核实被指控的拿取事实；说明一致性、份数或记录形式不能代替其他案情证据及全案确实充分的证明。",
        acceptable:
          "‘三份笔录和录音都是记录他的话，并没有另外证明咖啡机被拿走，不能靠次数凑够定罪证据’即可，不要求把缺少的每种证据或每个待证事实逐一列全。",
        boundary:
          "不能把询问录音误作案发录像，或因存在多个载体就认定已有独立印证。若已指出同一来源、无其他案情证明与不足的联系，未另列全部三项确实充分条件不作漏答；本问不考三项条件的完整背诵。也不能改成随便补一份其他材料即可定罪；不从同案选择或其解析补足本问理由。",
      },
    ],
    sources: [...sourceKeys],
  },
  {
    id: "crimpro-no-confession-sufficient-choice",
    caseId: noConfessionCaseId,
    relatedTopicIds: [topicId],
    kind: "objective",
    choiceMode: "single",
    title: "没有供认的相机案",
    facts: criminalProcedureProofCaseFacts[noConfessionCaseId],
    prompt: "仅就本案的定罪证据条件，下列判断哪项正确？",
    options: [
      {
        id: "a",
        text: "迟栩未供认，本案就缺少定罪不可缺少的条件。",
        explanation:
          "有罪供述不是定罪的必备证据；缺少它不能排除题设已达到确实充分标准的全案证据。",
      },
      {
        id: "b",
        text: "已有录像、店员陈述和相机三类材料，无须再核查整体证明程度。",
        explanation:
          "证据类型或数量不代替第55条的三项条件，仍须事实有证据、依法查实并综合排除合理怀疑。",
      },
      {
        id: "c",
        text: "没有有罪供述本身不阻止定罪；本案明确给出的全案证明和查证结果符合确实充分要求。",
        explanation:
          "本案所有定罪量刑事实有证据、定案证据依法查实、全案已排除合理怀疑，符合第55条；不以有无供认为开关。",
      },
      {
        id: "d",
        text: "录像清楚记录装包和离店，就可以省掉归属、价值及其他必要事实的证明。",
        explanation:
          "清楚录像仍不能替代对全部定罪量刑事实的证明，本案之所以可按确实充分分析还有题设逐项核证和全案排疑前提。",
      },
    ],
    answer: "c",
    hint: "",
    reference:
      "选C。第55条允许在没有被告人供述、证据确实充分时认定有罪并处刑。这里不是从材料多或有录像直接跳到定罪：题设已明确所有定罪量刑事实有证据证明、定案证据经过法定程序查证属实，且综合全案已经排除合理怀疑。迟栩没有供认本身不阻断这个证据结论；不据本题继续确定具体罪名或刑期。",
    sources: [...sourceKeys],
  },
  {
    id: "crimpro-no-confession-sufficient-explain",
    caseId: noConfessionCaseId,
    relatedTopicIds: [topicId],
    kind: "subjective",
    title: "缺少供认会挡住定罪吗",
    facts: criminalProcedureProofCaseFacts[noConfessionCaseId],
    prompt:
      "有人认为：‘迟栩没有作有罪供述，这个案子就不能定罪。’这个理由能否成立？请结合本案说明定罪的证据要求。",
    hint: "",
    reference:
      "理由不能成立。有罪供述不是定罪的必要前提；没有供述，但其他证据和全案证明达到确实充分标准时，仍可以定罪并处刑。本案拿取者、取走过程、归属、价值及其余定罪量刑事实都有证据证明；作为定案根据的证据已在庭审中依照法定程序查证属实；连续录像、具体证言、编号和交接材料经综合核对，已经排除误认、经同意借用等合理怀疑。这三项共同满足确实充分条件，不能只因迟栩没有供认否定。本问不要求认定具体罪名或决定刑期，也不能把这一结论外推成任何有录像或证人的案件都已充分。",
    criteria: [
      {
        id: "crimpro-no-confession-sufficient-explain-rule",
        label: "说明供述不是定罪必要前提",
        meaning:
          "否定‘没有有罪供述就不能定罪’的理由，说明在证据确实充分时，没有被告人供述仍可认定有罪并处刑；不是任意存在其他证据就够。",
        acceptable:
          "‘不认罪并不挡住定罪，其他证据仍须把案子证明到确实充分’等义表达即可，结论可与后项的条件联系合写。",
        boundary:
          "不要求被告人供认，不因为未供认就推定有罪；不另列强制自证、举证责任或拒供后果的条文必答。本项不单独强求‘处以刑罚’固定措辞、条号、具体罪名或刑期，核心是供述并非必要前提及完整证明条件。",
      },
      {
        id: "crimpro-no-confession-sufficient-explain-standard",
        label: "把三项确实充分要求联系到全案",
        meaning:
          "联系本案说明三项条件共同满足：定罪量刑的事实均有证据证明；作为定案依据的证据已经法定程序查证属实；综合全案对所认定事实已排除合理怀疑。不能只以材料数量或单段录像代替这三项判断。",
        acceptable:
          "‘取走的人、过程、归属和价值等都有证据，定案材料都经过法庭依法核实，整案核对后也排除了认错人或借用等合理疑点’可综合表达，不要求按一二三列条文或逐个重复每种证据。",
        boundary:
          "三项含义均须表达，但可一段合写，不强求‘确实充分’‘排除合理怀疑’原词，只要等义清楚。只说‘有录像和两个证人所以够了’不足；仅泛称‘证据充分’而无三项含义及本案联系也不足。排除合理怀疑不是排除任何想象可能；本问不要求构造题设已排除的未知矛盾、重做每项证据鉴别或增列实体罪名/刑期。此问只用自己的原答，不从同案选择、旧答案或解析补分。",
      },
    ],
    sources: [...sourceKeys],
  },
];

export const criminalProcedureProofCases = [
  { id: confessionCaseId, title: "三次一致的讲述" },
  { id: noConfessionCaseId, title: "没有供认的相机案" },
].map((item) => ({
  ...item,
  facts:
    criminalProcedureProofCaseFacts[
      item.id as keyof typeof criminalProcedureProofCaseFacts
    ],
  questionIds: criminalProcedureProofExercises
    .filter((q) => q.caseId === item.id)
    .map((q) => q.id),
}));
export const criminalProcedureProofTopics: FaultTopic[] = [
  {
    id: topicId,
    title: "口供与定罪的证据标准",
    headline: "认罪不是充分证明，未供认也不当然排除定罪",
    goal: "区分供述有没有与全案证明够不够，并能联系事实说明确实充分的三个条件。",
    prerequisite:
      "知道供述是被告人对案情的陈述；本组从定罪证据标准入门，不要求先学全部证据类型。",
    minutes: "8–12",
    paragraphs: [
      "对是否有罪的判断，要审查证据和调查核实，不能把被告人认罪当成决定开关。只有被告人供述、没有其他证据时，不能据此认定有罪并处刑；多次重复同一口供、记录在不同载体中，也不自动补足独立案情证明。",
      "没有被告人供述，也不等于无法定罪。关键仍是全案证据是否确实、充分，不能把‘有其他材料’‘种类多’或‘某段录像清楚’直接等同于达到证明标准。",
      "确实、充分要同时满足：定罪量刑的事实都有证据证明；定案证据都经法定程序查证属实；综合全案，对所认定事实已排除合理怀疑。各项应联系案情核查，不能只贴标签。本组给定取证合法和正案完成核证的前提，不展开非法证据排除、具体罪名、刑罚或认罪认罚从宽。",
    ],
    example: {
      title: "重复的陈述没有补上案情证据",
      facts: criminalProcedureProofCaseFacts[confessionCaseId],
      analysis:
        "周屿说了三次同一经过，笔录和录音都只记录他的话，仍没有其他材料核实所述拿取事实。不能把记录份数当作充分证明，当前不能只凭这些供述定罪。",
    },
    pitfall:
      "把认罪当成充分证明，或把没有供认当成定罪禁区；另一常见偏差是看到其他证据就跳过全案确实充分的三个条件。",
    recall: {
      prompt:
        "供述有没有，与能否定罪是什么关系？证据确实、充分还要同时核对哪些条件？",
      reference:
        "只有供述而无其他证据不能定罪；没有供述而全案证据确实充分仍可定罪。还须定罪量刑事实均有证据、定案证据依法查实、综合全案已排除合理怀疑，不能只靠数量或种类。",
    },
    sources: [...sourceKeys],
    exercises: criminalProcedureProofExercises,
  },
];
export const criminalProcedureProofChapter = {
  id: "CRIMPRO-EVIDENCE-FOUNDATION",
  title: "证据与证明基础",
  section: "刑事诉讼法",
  topicIds: criminalProcedureProofTopics.map((topic) => topic.id),
};
export const criminalProcedureProofContentPack = {
  revision: criminalProcedureProofRevision,
  snapshot: {
    topics: criminalProcedureProofTopics,
    sources: criminalProcedureProofSources,
  },
};
export const criminalProcedureProofDefaultQueues = {
  objective: criminalProcedureProofExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: criminalProcedureProofExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function criminalProcedureProofQuestion(
  id: string,
): UnitExercise | undefined {
  const question = criminalProcedureProofExercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function criminalProcedureProofTopicForQuestion(
  id: string,
): FaultTopic | undefined {
  return criminalProcedureProofQuestion(id)
    ? structuredClone(criminalProcedureProofTopics[0])
    : undefined;
}
export function criminalProcedureProofSameCaseQuestions(
  id: string,
): UnitExercise[] {
  const question = criminalProcedureProofQuestion(id);
  return question
    ? structuredClone(
        criminalProcedureProofExercises.filter(
          (q) => q.caseId === question.caseId,
        ),
      )
    : [];
}
export function criminalProcedureProofPromptMaterial(id: string) {
  const question = criminalProcedureProofQuestion(id);
  return question
    ? {
        id: question.id,
        caseId: question.caseId,
        revision: criminalProcedureProofRevision,
        title: question.title,
        kind: question.kind,
        facts: question.facts,
        prompt: question.prompt,
      }
    : null;
}
