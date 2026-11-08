import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";

/** Original fictional teaching cases; no trial records or learner submissions. */
export const criminalProcedureExclusionRevision =
  "criminal-procedure-exclusion-2026-10-10.v1";
const topicId = "crimpro-illegal-evidence-exclusion";
const confessionCaseId = "CRIMPRO-TORTURED-CONFESSION-1";
const documentCaseId = "CRIMPRO-DOCUMENT-COLLECTION-1";

export const criminalProcedureExclusionSources: ContentSources = {
  "crimpro-exclusion-article56": {
    title: "《刑事诉讼法》2018修正文本第56条：非法证据排除",
    url: "https://www.szns.gov.cn/xxgk/bmxxgk/nsgafj/xxgk_99908/zcfg_99917/zcfgjgfxwj_99918/content/post_11403805.html",
    note: "2026-10-10定向读政府网站公布的第56条；页面2024-07-03发布，来源深圳市公安局，前言载明2018-10-26第三次修正。只采用刑讯所得供述与程序违法物证、书证的不同处理路径；网页编辑加的条文标签不是法条原文。参考与采分为自编教学标准，不是官方阅卷细则。",
  },
  "crimpro-exclusion-authorized-text": {
    title: "新华社受权发布《刑事诉讼法》：第56条对应原文",
    url: "https://www.xinhuanet.com/politics/2018-10/27/c_1123620821_5.htm",
    note: "2018-10-27受权发布；2026-10-10直接读证据章第56条并与政府公布正文核对。第50条仅支持卡中取证处理不等于内容已查实的边界，不新增必答。本单元不展开重复供述、证人证言排除、派生证据、申请与举证程序，也不把一般取证瑕疵等同于本条全部排除条件。",
  },
  "crimpro-exclusion-effective-directory": {
    title: "现行有效法律目录：刑事诉讼法仍列2018修正版",
    url: "https://www.samr.gov.cn/fgs/sjdt/art/2026/art_93a4fbac2ce14ab6baab60b0cd452ef4.html",
    note: "市场监管总局网站转载中国人大网目录，2026-09-18发布，目录截至2026-08-28，刑事诉讼法条目列1979年通过及1996、2012、2018年修正；2026-10-10读对应条目。目录截至日不等于读取日，不声称本轮完成截至读取日的全法效力审计；年度修法计划不是已通过或已施行修法。",
  },
};

export const criminalProcedureExclusionPreparation = {
  status: "isolated-content-candidate-not-registered",
  sourceCheckedAt: "2026-10-10",
  officialArticle56DirectlyRead: true,
  authorizedArticle56DirectlyRead: true,
  effectiveDirectoryCutoff: "2026-08-28",
  sameDayLiveNpcStatusConfirmed: false,
  completeCurrentEffectAudit: false,
  independentContentReviewApproved: false,
  registeredInDefaultProduct: false,
  subjectId: "criminal-procedure",
  subjectLabel: "刑诉",
  independentCases: 2,
  objectiveQuestions: 2,
  writtenQuestions: 2,
  teachingCards: 1,
  scope:
    "非法证据排除基础：刑讯供述应排除；程序违法且可能严重影响司法公正的物证、书证须按补正或合理解释路径处理",
  fictionalCourtChecksAreActualReceipts: false,
  annualSyllabusCoverageClaim: false,
} as const;

export const criminalProcedureExclusionCaseFacts = {
  [confessionCaseId]: [
    "本案为教学虚构。被告人殷澄被指控从共享办公室拿走一台音箱。侦查人员在讯问时要求他承认拿取，并持续殴打他的手臂和背部，说‘不承认就接着打’。殷澄疼痛难忍，为了停止殴打，按要求作出了拿取音箱的供述。",
    "法庭调查已查明上述殴打逼迫及其与本次供述形成的联系；本问不设置取证过程真假未明的争议。案内另有取得合法的现场影像和物品记录，与这份供述中的部分时间、位置描述相符。现在只讨论这份在殴打逼迫下形成的供述能否作为判决依据，不讨论其他证据是否足以支持定罪，也不涉及后来另行讯问的供述。",
  ].join("\n\n"),
  [documentCaseId]: [
    "本案为另一独立教学虚构。被告人陶蕙被指控私自改动文具店的收款记录。检方提交一本用来证明记账内容的纸质账簿。账簿离开原保管处后，交接记录出现空档，保管人对交接过程的陈述与取证笔录也不一致。",
    "法庭已经确认：该账簿的收集不符合法定程序，且这一问题可能严重影响司法公正。本题把这两个条件作为明确前提，不要求自行推定某种手续错误的严重程度。检方尚未提交补充原始交接记录或对矛盾作出说明，法庭还没有就能否补正、能否作出合理解释作出结论。现在只判断这份账簿的取证问题应按什么路径处理，不判断记账内容真伪或陶蕙是否有罪。",
  ].join("\n\n"),
} as const;

const sourceKeys = Object.keys(criminalProcedureExclusionSources);
export const criminalProcedureExclusionExercises: UnitExercise[] = [
  {
    id: "crimpro-tortured-confession-choice",
    caseId: confessionCaseId,
    relatedTopicIds: [topicId],
    kind: "objective",
    choiceMode: "single",
    title: "逼迫下形成的讲述",
    facts: criminalProcedureExclusionCaseFacts[confessionCaseId],
    prompt: "对本次供述作为判决依据的问题，下列判断哪项正确？",
    options: [
      {
        id: "a",
        text: "与合法取得的其他证据相符的部分，可以继续作为判决依据。",
        explanation: "内容有印证不能抵消这份供述的刑讯取得问题。",
      },
      {
        id: "b",
        text: "本次供述应当排除，部分细节相符也不能使它继续作为判决依据。",
        explanation:
          "殴打逼迫造成难以忍受的痛苦并迫使供述，属于本题已查明的刑讯取得情形，依法应排除。",
      },
      {
        id: "c",
        text: "在原供述笔录上补齐签名，就能消除这次殴打取证的问题。",
        explanation:
          "不能把针对物证、书证的补正路径移来挽救这份刑讯所得供述；补签不改变其取得方式。",
      },
      {
        id: "d",
        text: "降低本次供述的证明力后，仍可与其他证据一起作为判决依据。",
        explanation: "应当排除的供述不能只通过降低权重继续作为判决依据。",
      },
    ],
    answer: "b",
    hint: "",
    reference:
      "选B。侦查人员持续殴打并以继续殴打迫使殷澄供述，取得过程已经查明。刑讯逼供取得的被告人供述应当排除，不得作为判决依据；与其他合法证据的部分内容相符，也不能抵消该排除要求。补签原笔录或降低证明力不能使这份供述继续用于判决。",
    sources: [...sourceKeys],
  },
  {
    id: "crimpro-tortured-confession-explain",
    caseId: confessionCaseId,
    relatedTopicIds: [topicId],
    kind: "subjective",
    title: "细节相符能否抵消取证问题",
    facts: criminalProcedureExclusionCaseFacts[confessionCaseId],
    prompt:
      "本次在殴打逼迫下形成的供述，能否因部分内容与其他合法证据相符而继续作为判决依据？请结合案情说明理由。",
    hint: "",
    reference:
      "不能。本次供述是在持续殴打、以继续殴打相逼的过程中形成的，殷澄为停止难以忍受的疼痛才按要求讲述，法庭已查明这一取得过程及其联系。刑讯逼供取得的被告人供述依法应当排除，不得作为判决依据。部分时间、位置描述得到其他合法材料印证，涉及内容是否相符，不能据此抵消这份供述的非法取得问题。",
    criteria: [
      {
        id: "crimpro-tortured-confession-explain-rule",
        label: "说明刑讯供述应排除",
        meaning:
          "说明刑讯逼供取得的被告人供述应当排除，不能继续作为判决依据，而非仅降低证明力。",
        acceptable:
          "‘用殴打逼出来的这份口供依法不能用来作判决依据’足以表达同一规则；排除结论可与案情联系合写。",
        boundary:
          "不要求固定‘刑讯逼供’术语、条号或单独的结论句，但须表达这种强迫取证导致不能使用该供述的含义。本问不要求分析侦查人员责任、后续供述、其他证据能否定罪或具体罪名刑罚；不从同案客观选择或解析补足本问原答。",
      },
      {
        id: "crimpro-tortured-confession-explain-application",
        label: "联系逼迫取证与细节相符",
        meaning:
          "联系持续殴打及以继续殴打迫使殷澄供述的已查明事实，说明其他合法证据印证部分描述，也不能抵消本次供述的排除要求。",
        acceptable:
          "‘他为不再挨打才按要求说，部分细节即使对得上，也改变不了这份口供是被逼出来的，仍不能拿来判’等综合表达可以承接规则和案情两点。",
        boundary:
          "不要求逐一列出身体部位、威胁原话或全部相符细节；已说清逼迫形成供述与相符仍不能使用的联系即可。不能把相符认定为取证变得合法，也不能把排除这份供述扩为案内其他合法证据全部排除。未另列补签或降权反例不作漏答。",
      },
    ],
    sources: [...sourceKeys],
  },
  {
    id: "crimpro-document-collection-choice",
    caseId: documentCaseId,
    relatedTopicIds: [topicId],
    kind: "objective",
    choiceMode: "single",
    title: "交接未说明的账簿",
    facts: criminalProcedureExclusionCaseFacts[documentCaseId],
    prompt: "对这份账簿的取证问题，目前应怎样处理？",
    options: [
      {
        id: "a",
        text: "发现取证程序违法后直接排除，无须再核对补正或合理解释。",
        explanation: "省略了本条对物证、书证设置的补正或合理解释路径。",
      },
      {
        id: "b",
        text: "只核对记账内容是否真实，内容真实就不必处理取证问题。",
        explanation: "真实性判断不能代替对已经确认的违法取证问题的处理。",
      },
      {
        id: "c",
        text: "应当补正或者作出合理解释；经核对不能补正或合理解释的，应当排除。",
        explanation:
          "账簿属于书证，题设已确认程序违法且可能严重影响司法公正，须按这一处理路径核对，不能省略后续条件。",
      },
      {
        id: "d",
        text: "让取证人员补上一句‘手续疏漏’，即可认定合理解释已完成。",
        explanation:
          "形式上写了说明不等于已经作出合理解释，本题也未给定该解释成立。",
      },
    ],
    answer: "c",
    hint: "",
    reference:
      "选C。纸质账簿是用来证明记账内容的书证，其收集程序违法、可能严重影响司法公正已由题设明确。此时应当补正或者作出合理解释，不能补正或者合理解释的才应排除。本案是否能够补正或合理解释尚未核明，不能只因已经发现程序违法就跳过这条路径，也不能把尚未提交说明等同于已经确认无法说明。",
    sources: [...sourceKeys],
  },
  {
    id: "crimpro-document-collection-explain",
    caseId: documentCaseId,
    relatedTopicIds: [topicId],
    kind: "subjective",
    title: "程序违法后的处理路径",
    facts: criminalProcedureExclusionCaseFacts[documentCaseId],
    prompt:
      "有人主张：‘这份账簿取证程序违法，就应马上排除，无须再核对能否补正或合理解释。’根据题设，法院目前应怎样处理？请结合案情说明理由。",
    hint: "",
    reference:
      "不能仅凭程序违法就跳过后续条件直接排除这份账簿。物证、书证收集程序违法且可能严重影响司法公正的，应当补正或者作出合理解释；不能补正或者作出合理解释的，才应当排除。账簿用于证明记账内容，属于书证，本案前两个条件已确认，但能否补正或合理解释尚未核明，应按这一路径处理。检方目前尚未提交说明，并不等于题设已经确认不能补正或合理解释；同样也不能预先认定已经完成补正或解释。",
    criteria: [
      {
        id: "crimpro-document-collection-explain-rule",
        label: "说明书证的有条件排除路径",
        meaning:
          "说明物证、书证在收集程序违法且可能严重影响司法公正时，应当补正或者作出合理解释，不能补正或者合理解释的应当排除；不能省略这些条件直接把程序违法等同于立即排除。",
        acceptable:
          "‘对这种程序违法并可能严重影响公正的书证，要补正或合理说清取证问题，做不到才排除’可表达完整路径；前提与处理可分别写在规则和案情分析中。",
        boundary:
          "不要求背条号或法条逐字复述，允许‘纠正取证问题或作出可信合理说明，不能做到就不用这份证据’等义表达。题设已给定的程序违法及严重影响可能性可在案情联系中承接，不要求复述原句，但不能把这一路径泛化为所有取证手续问题。补正和合理解释是法条提供的两种路径，不要求把二者写成必须同时成功；不把这一处理规则移用于刑讯所得供述。",
      },
      {
        id: "crimpro-document-collection-explain-application",
        label: "联系已确认条件与尚未核明的事项",
        meaning:
          "识别本案账簿作为书证，程序违法及可能严重影响司法公正已确认，但能否补正或合理解释尚未核明；联系这些事实说明目前应沿上述路径处理，不能跳过核对直接排除，也不能预先当作已经补正或解释完成。",
        acceptable:
          "‘这本记账材料的取证问题和严重影响可能已经确认，能否把交接问题补正或合理讲清还没查明，应继续按这条路径核对，不能省掉这一步’可以承接本点，可与规则合在一段。",
        boundary:
          "不要求逐列交接空档和陈述矛盾，也不要求提出具体补正措施或自己判断何种解释一定合理。若已联系本案说明路径及待核状态，未另写‘不得提前认定补正成功’提醒不单独作漏答。只答排除或保留而未联系待核条件不够；本问不考最终真实性、定罪、其他责任或申请与举证程序，不从另一小问补足原答。",
      },
    ],
    sources: [...sourceKeys],
  },
];

export const criminalProcedureExclusionCases = [
  { id: confessionCaseId, title: "逼迫下形成的讲述" },
  { id: documentCaseId, title: "交接未说明的账簿" },
].map((item) => ({
  ...item,
  facts:
    criminalProcedureExclusionCaseFacts[
      item.id as keyof typeof criminalProcedureExclusionCaseFacts
    ],
  questionIds: criminalProcedureExclusionExercises
    .filter((q) => q.caseId === item.id)
    .map((q) => q.id),
}));

export const criminalProcedureExclusionTopics: FaultTopic[] = [
  {
    id: topicId,
    title: "非法证据排除的基础边界",
    headline: "先看材料种类和取得方式，再看应怎样处理",
    goal: "区分刑讯所得供述的排除要求与物证、书证程序违法后的补正或合理解释路径。",
    prerequisite:
      "知道供述是犯罪嫌疑人、被告人对案情的陈述，书证是以材料记载的内容证明事实；可接着‘口供与定罪的证据标准’学习。",
    minutes: "8–12",
    paragraphs: [
      "材料内容看起来真实，不等于取证合法。刑讯逼供等非法方法取得的犯罪嫌疑人、被告人供述，应当排除。排除是不能用它作为起诉或判决的依据；部分细节与其他材料相符，也不能抵消这个要求。",
      "物证、书证不能直接套用同一处理方式。收集不符合法定程序，且可能严重影响司法公正的，应当补正或者作出合理解释；不能补正或者作出合理解释的，才应当排除。不要省掉严重影响可能性，也不要把‘尚未解释’提前写成‘确实不能解释’。",
      "通俗说，补正是依法纠正、补充取证中的程序问题；合理解释是对这些问题给出经得起核对的说明，不是随便补一句话就完成。处理了取证问题，也不等于材料内容已经查证属实，更不等于全案已经达到定罪标准。这一小组只练上述两条基础路径，不展开其他排除情形或具体程序争议。",
    ],
    example: {
      title: "有印证也不能抵消逼供",
      facts: criminalProcedureExclusionCaseFacts[confessionCaseId],
      analysis:
        "殷澄为了停止殴打才按要求供述，取得过程已经查明。这份供述应排除；其他合法材料与部分细节相符，不能把它变回可供判决使用的供述。处理账簿等书证的程序违法问题，则要另看严重影响可能性及补正、合理解释条件。",
    },
    pitfall:
      "把有印证当成刑讯供述可以保留，或把书证的任何手续问题都直接等同于排除。",
    recall: {
      prompt: "刑讯所得供述与程序违法的物证、书证，排除路径有什么不同？",
      reference:
        "刑讯所得供述应当排除，内容相符也不能抵消。物证、书证收集程序违法且可能严重影响司法公正时，应补正或合理解释，不能补正或合理解释的才排除；不能只凭一般手续问题或尚未说明就省略这些条件。",
    },
    sources: [...sourceKeys],
    exercises: criminalProcedureExclusionExercises,
  },
];

/** Append this topic to the existing chapter; do not replace its old topic list. */
export const criminalProcedureExclusionChapter = {
  id: "CRIMPRO-EVIDENCE-FOUNDATION",
  title: "证据与证明基础",
  section: "刑事诉讼法",
  topicIds: criminalProcedureExclusionTopics.map((topic) => topic.id),
};
export const criminalProcedureExclusionContentPack = {
  revision: criminalProcedureExclusionRevision,
  snapshot: {
    topics: criminalProcedureExclusionTopics,
    sources: criminalProcedureExclusionSources,
  },
};
export const criminalProcedureExclusionDefaultQueues = {
  objective: criminalProcedureExclusionExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: criminalProcedureExclusionExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function criminalProcedureExclusionQuestion(
  id: string,
): UnitExercise | undefined {
  const question = criminalProcedureExclusionExercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function criminalProcedureExclusionTopicForQuestion(
  id: string,
): FaultTopic | undefined {
  return criminalProcedureExclusionQuestion(id)
    ? structuredClone(criminalProcedureExclusionTopics[0])
    : undefined;
}
export function criminalProcedureExclusionSameCaseQuestions(
  id: string,
): UnitExercise[] {
  const question = criminalProcedureExclusionQuestion(id);
  return question
    ? structuredClone(
        criminalProcedureExclusionExercises.filter(
          (q) => q.caseId === question.caseId,
        ),
      )
    : [];
}
export function criminalProcedureExclusionPromptMaterial(id: string) {
  const question = criminalProcedureExclusionQuestion(id);
  return question
    ? {
        id: question.id,
        caseId: question.caseId,
        revision: criminalProcedureExclusionRevision,
        title: question.title,
        kind: question.kind,
        facts: question.facts,
        prompt: question.prompt,
      }
    : null;
}
