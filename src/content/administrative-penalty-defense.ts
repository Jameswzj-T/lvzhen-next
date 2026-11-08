import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";

/** Original fictional teaching cases; no enforcement files or learner records. */
export const administrativePenaltyDefenseRevision =
  "administrative-penalty-defense-2026-10-11.v1";
const topicId = "admin-predecision-defense";
const noticeCaseId = "ADMIN-PREDECISION-NOTICE-1";
const reviewCaseId = "ADMIN-DEFENSE-REVIEW-1";
const lawUrl =
  "https://scjgj.beijing.gov.cn/cxfw/flfgcxfw/qt/202203/t20220331_2645278.html";

export const administrativePenaltyDefenseSources: ContentSources = {
  "admin-defense-article44": {
    title: "《行政处罚法》2021修订文本第44条：决定前告知",
    url: lawUrl,
    note: "北京市市场监督管理局2022-03-31刊载；2026-10-11直接读取。2021-01-22修订、2021-07-15施行。决定之前告知拟处罚内容及事实、理由、依据，并告知依法享有的陈述、申辩、要求听证等权利；本单元不展开正式听证条件、形式或期限。违法实体事实已查明不能自行免去本题的事前程序。案例和采分是自编教学内容，不是官方试题或评分标准。",
  },
  "admin-defense-article45": {
    title: "《行政处罚法》第45条：听取、复核与不得因申辩加重",
    url: lawUrl,
    note: "2026-10-11直接读取第45条两款。必须充分听取意见，对提出的事实、理由和证据复核；提出的事实、理由或者证据成立的应当采纳，不是三类必须同时成立，也不保证免罚。不得因陈述、申辩给予更重处罚；题设用仅因坚持申辩固定错误理由，不把‘仅因’设为这项禁止的额外法律门槛，也不推成申辩后任何处罚变化都禁止。",
  },
  "admin-defense-article62": {
    title: "《行政处罚法》第62条：未告知或拒绝听取时不得作出决定",
    url: lawUrl,
    note: "2026-10-11直接读取普通程序中的第62条。未按第44、45条告知，或者拒绝听取陈述、申辩，不得作出决定；原文保留‘当事人明确放弃陈述或者申辩权利的除外’。第一案明确未放弃，不把沉默当明确放弃，不推放弃一项等于放弃全部，也不由本条直接推断既成处罚当然无效、必撤销或获赔。",
  },
  "admin-defense-effective-directory": {
    title: "现行有效法律目录：行政处罚法2021修订版本",
    url: "https://www.samr.gov.cn/fgs/sjdt/art/2026/art_93a4fbac2ce14ab6baab60b0cd452ef4.html",
    note: "市场监管总局转载中国人大网目录，2026-09-18发布，数据截至2026-08-28。本轮于2026-10-11只读复用2026-10-10已下载的公开官方目录及原读取记录，行政处罚法条目列2021修订；复用不是今日重新下载。未完成目录截止日之后全法效力穷尽核验，独立题文审校仍待完成。",
  },
};

export const administrativePenaltyDefensePreparation = {
  status: "isolated-content-candidate-not-registered",
  sourceCheckedAt: "2026-10-11",
  subjectId: "administrative-law",
  subjectLabel: "行政",
  independentCases: 2,
  objectiveQuestions: 2,
  writtenQuestions: 2,
  totalCriteria: 4,
  teachingCards: 1,
  officialTargetedArticlesDirectlyRead: true,
  effectiveDirectoryCutoff: "2026-08-28",
  directoryOriginalReadDay: "2026-10-10",
  directoryReuseDay: "2026-10-11",
  sameDayLiveNpcStatusConfirmed: false,
  completeCurrentEffectAudit: false,
  independentContentReviewApproved: false,
  registeredInDefaultProduct: false,
  enforcementFactsAreFictional: true,
  fictionalChecksAreActualReceipts: false,
  annualSyllabusCoverageClaim: false,
  scope: "行政处罚决定前的告知、听取意见、申辩材料复核与不得因申辩加重",
} as const;

export const administrativePenaltyDefenseCaseFacts = {
  [noticeCaseId]: [
    "本案为教学虚构。叶弥经营一家便利店。区市场监督管理局在常规检查中发现，店里没有保存应当保存的进货凭证；检查记录和店内资料相互对应。本题给定：这一违法事实已经依法查清，该事项有行政处罚依据，该局有权处理，正在按普通程序办理。",
    "处罚决定还没有作出。工作人员没有先告诉叶弥准备怎样处罚、所认定的事实、理由和法律依据，也没有告知她可以陈述、申辩。叶弥当场说：‘我想先知道你们准备怎样罚、根据什么，还想把我的情况说明白。’工作人员回答：‘违法事实已经清楚，不用再听你解释，可以直接决定。’叶弥没有明确放弃陈述或申辩权利。",
  ].join("\n\n"),
  [reviewCaseId]: [
    "本案为另一独立教学虚构。许薇经营一家鞋店。区市场监督管理局正在按普通程序处理一批鞋的标识问题。本题给定，该局有处理职权，并已依法完成应有的事前告知，说明了准备作出的处罚、所据的事实、理由和法律依据，也告知了许薇依法享有的权利。处罚决定尚未作出。",
    "许薇随后交来供货方的说明和标签照片，指出检查记录可能对应另一批货，请求核对。材料是否真实、是否与本批鞋对应，以及她的理由是否成立，都还没有核实。工作人员没有复核，也没有充分听取她的意见，只因她坚持申辩就说：‘你一直争辩，就罚重些。’他打算在原拟处罚基础上加重，没有给出别的加重理由。",
  ].join("\n\n"),
};
const noticeSources = [
  "admin-defense-article44",
  "admin-defense-article45",
  "admin-defense-article62",
];
const reviewSources = ["admin-defense-article45"];

export const administrativePenaltyDefenseExercises: UnitExercise[] = [
  {
    id: "admin-predecision-notice-choice",
    caseId: noticeCaseId,
    relatedTopicIds: [topicId],
    kind: "objective",
    choiceMode: "single",
    title: "事实已查清，还要先听店主说明吗？",
    facts: administrativePenaltyDefenseCaseFacts[noticeCaseId],
    prompt: "工作人员准备直接作出决定。根据本案，下面哪种说法正确？",
    options: [
      {
        id: "a",
        text: "违法事实已查清，就可以省略告知和听取意见。",
        explanation: "实体事实查明不能自行免掉本题的事前告知和听取程序。",
      },
      {
        id: "b",
        text: "不能据此省略事前告知、听取意见；按目前的状态不得作出处罚决定。",
        explanation:
          "叶弥未明确放弃，拟处罚等内容未告知，提出说明请求又被拒绝，符合本题不得作出决定的情形。",
      },
      {
        id: "c",
        text: "先作出决定，之后让叶弥解释，就完成了决定前的程序。",
        explanation: "题目中的义务发生在作出决定之前，事后解释不能直接替代。",
      },
      {
        id: "d",
        text: "叶弥没有马上交出证明材料，就等于明确放弃了申辩。",
        explanation: "未马上提交材料不能补成明确放弃；她还明确请求说明情况。",
      },
    ],
    answer: "b",
    hint: "把‘违法事实查清’与‘作出决定前还应做什么’分别看。",
    reference:
      "选B。决定前应告知拟处罚内容及事实、理由、依据和依法享有的权利，并充分听取陈述、申辩。叶弥未明确放弃，工作人员既未告知，又拒绝听取，不能用事实已经清楚作省略程序的理由；按题设状态不得作出处罚决定。",
    sources: [...noticeSources],
  },
  {
    id: "admin-predecision-notice-explain",
    caseId: noticeCaseId,
    relatedTopicIds: [topicId],
    kind: "subjective",
    title: "能否跳过告知和听取，直接决定？",
    facts: administrativePenaltyDefenseCaseFacts[noticeCaseId],
    prompt:
      "工作人员能否因为违法事实已经查清，就不先告知、不听叶弥说明，直接作出处罚决定？请结合案情说明理由。",
    hint: "先说清决定前的义务，再联系叶弥的请求和工作人员的做法。",
    reference:
      "不能。违法事实查清仍须履行决定前的告知和听取义务：应说清准备怎样处罚、所据的事实、理由和法律依据，告知陈述、申辩等权利并充分听取意见。叶弥明确请求说明情况，没有明确放弃；工作人员未告知又拒绝听取，按目前题设不得作出处罚决定。这里只判断现在能否直接决定。",
    criteria: [
      {
        id: "notice-and-opportunity",
        label: "事实查清仍须告知、听取",
        meaning:
          "说明决定前应让当事人知道准备怎样处罚、凭什么，并告知和保障陈述、申辩的机会；违法事实查清不能省掉这些义务。",
        acceptable:
          "‘查清违法也得先说清准备怎么罚、凭什么罚，并让她把意见说出来’等日常表达可以；‘告知拟处罚及理由依据，保障陈述申辩’也可。",
        boundary:
          "不要求逐项背诵全部告知细目或权利名称、固定条号和法条原句；能表达准备怎样处罚、凭什么及陈述申辩机会即可。只泛说‘程序要合法’而未说明义务不足。本问不另考听证条件、形式或期限。",
      },
      {
        id: "apply-before-decision",
        label: "联系请求被拒与当前决定",
        meaning:
          "联系叶弥提出说明请求而未获告知、听取且没有明确放弃，说明不能以事实已查清为由，在题设状态下直接作出处罚决定。",
        acceptable:
          "‘她要求解释却被拒，也没放弃，所以现在不能直接罚’可以；与第一点合写为一段，只要义务和本案联系完整即可。",
        boundary:
          "不要求逐字重述请求或单列‘未明确放弃’术语；联系本人要求说明却被拒、仍无告知听取机会已可表达本案前提。结论可融入理由，不另拆第三点。不得把沉默当明确放弃，也不要求处罚无效、撤销、赔偿或救济结论；题设决定尚未作出。",
      },
    ],
    sources: [...noticeSources],
  },
  {
    id: "admin-defense-review-choice",
    caseId: reviewCaseId,
    relatedTopicIds: [topicId],
    kind: "objective",
    choiceMode: "single",
    title: "提交申辩材料后，怎样处理？",
    facts: administrativePenaltyDefenseCaseFacts[reviewCaseId],
    prompt: "对许薇的材料和工作人员打算加重处罚的理由，下面哪种说法正确？",
    options: [
      {
        id: "a",
        text: "完成事前告知以后，就可以不再听取或复核她的申辩。",
        explanation:
          "告知没有替代充分听取意见和复核所提事实、理由、证据的义务。",
      },
      {
        id: "b",
        text: "只要交了照片和说明，就必须全部接受并免除处罚。",
        explanation:
          "材料尚未核实；成立的应采纳，不是交了材料就保证全部采纳或免罚。",
      },
      {
        id: "c",
        text: "应充分听取并复核，提出的事实、理由或者证据成立的应采纳；不能因她坚持申辩而加重。",
        explanation: "同时对应材料的有条件采纳和不得因陈述、申辩给予更重处罚。",
      },
      {
        id: "d",
        text: "可以把坚持申辩视为加重理由，用更重处罚让她停止争辩。",
        explanation: "因陈述、申辩而加重处罚正是第45条禁止的做法。",
      },
    ],
    answer: "c",
    hint: "先分清‘需要复核’和‘已经成立’，再看加重理由是什么。",
    reference:
      "选C。应充分听取许薇的意见，对提出的事实、理由和证据进行复核，成立的应当采纳。现在材料真伪、批次联系和理由是否成立未知，不能径断免罚，也不能直接丢开。工作人员以坚持申辩为加重理由，违反不得因陈述、申辩给予更重处罚的规则。",
    sources: [...reviewSources],
  },
  {
    id: "admin-defense-review-explain",
    caseId: reviewCaseId,
    relatedTopicIds: [topicId],
    kind: "subjective",
    title: "先核材料，能因申辩罚重些吗？",
    facts: administrativePenaltyDefenseCaseFacts[reviewCaseId],
    prompt:
      "许薇交来的材料应怎样处理？工作人员能否仅因她坚持申辩，就把处罚加重？请结合案情说明。",
    hint: "材料真假和理由是否成立还未确定；另看‘罚重些’究竟因为什么。",
    reference:
      "应充分听取许薇的意见，对供货方说明、标签照片及其提出的批次问题进行复核；提出的事实、理由或者证据成立的，应当采纳。题目还没有核实这些内容，不能直接说全部成立或必然免罚。不能仅因许薇坚持申辩而加重处罚：陈述、申辩是她依法享有的权利，工作人员没有别的加重理由，‘一直争辩就罚重些’不能成为加重依据。",
    criteria: [
      {
        id: "review-and-conditional-adoption",
        label: "听取、复核，成立的应采纳",
        meaning:
          "联系尚未核实的说明、照片或批次问题，说明应充分听取意见并复核所提事实、理由和证据，成立的应当采纳；不能预设材料已成立或已经不成立。",
        acceptable:
          "‘先听她说明，把她说的批次和材料核清，能成立的就应接受’可以。综合说清听取、核查及成立应采纳，不要求逐份列举材料；用‘查属实、对得上就应采纳’表达同一条件也可。",
        boundary:
          "不要求每份材料分别证明什么、固定条号或‘复核’原词。未核实不能当作不成立；提交材料不等于无条件采纳或必然免罚。所提事实、理由或者证据成立的应采纳，不要求三者都成立；最终处罚数额、减免结论不另设必答。",
      },
      {
        id: "no-heavier-penalty-for-defense",
        label: "不能把申辩作为加重理由",
        meaning:
          "联系工作人员因许薇坚持申辩而拟罚重些，说明不得因陈述、申辩给予更重处罚，这个加重理由不能成立。",
        acceptable:
          "‘不能因为她争辩就罚重，这是在行使说明和申辩的权利’可以。两点可合写一段，结论随理由表达，不强求单列结论。",
        boundary:
          "不要求复述工作人员原话或补一个第三结论点。‘仅因’固定的是本案事实，不是法律禁止的额外门槛；也不要求讨论其他可能加重情形。不能把规则改为申辩后任何处罚变化都绝对禁止，不另要求最终免罚、决定效力、听证或救济事项。",
      },
    ],
    sources: [...reviewSources],
  },
];

export const administrativePenaltyDefenseCases = (
  [noticeCaseId, reviewCaseId] as const
).map((id) => ({
  id,
  facts: administrativePenaltyDefenseCaseFacts[id],
  questionIds: administrativePenaltyDefenseExercises
    .filter((question) => question.caseId === id)
    .map((question) => question.id),
}));

export const administrativePenaltyDefenseTopics: FaultTopic[] = [
  {
    id: topicId,
    title: "处罚决定前的告知与申辩",
    headline: "先说清准备怎么罚，再认真听当事人说明。",
    goal: "判断能否跳过事前程序，区分复核材料与无条件采纳，并识别因申辩加重的错误理由。",
    prerequisite:
      "知道行政处罚是在依法处理违法行为；本节从店主与工作人员的两段对话开始。",
    minutes: "8–12",
    paragraphs: [
      "准备作出处罚决定时，行政机关应先告知准备怎样处罚、所认定的事实、理由和法律依据，并告知依法享有的陈述、申辩等权利。违法事实查清，仍须充分听取当事人的意见。‘先听说明’说的是陈述、申辩；本节不展开正式听证程序。",
      "普通程序中，未按规定告知，或者拒绝听取陈述、申辩，不得作出处罚决定。第62条同时保留‘当事人明确放弃陈述或者申辩权利的除外’。叶弥没有明确放弃，还主动请求说明情况；不能把事实已查清当作直接决定的理由，也不能把沉默就当作明确放弃。这里判断的是决定前能否直接作出决定。",
      "当事人提出事实、理由或证据，行政机关应充分听取并复核；成立的应采纳。材料还没核实，就先核清，不能一交材料就推成全部成立或必然免罚。陈述、申辩本身也不能成为罚得更重的理由。许薇坚持提出批次问题，工作人员应核材料，不能用加重处罚来阻止她说明。",
    ],
    example: {
      title: "事实清楚，不等于可以不听说明",
      facts: administrativePenaltyDefenseCaseFacts[noticeCaseId],
      analysis:
        "叶弥要求知道准备怎样处罚并说明情况，工作人员却未告知也拒绝听取。她未明确放弃，事实查清不能省去这些义务；按当前状态不得作出处罚决定。",
    },
    pitfall:
      "把‘已经查清违法’当作不用听取，把‘交了申辩材料’当作必然免罚，或把坚持申辩当作罚重些的理由。",
    recall: {
      prompt:
        "违法事实已经查清，还能跳过事前告知和听取吗？当事人提交的材料尚未核实，应怎样处理，能因为其申辩罚得更重吗？",
      reference:
        "不能仅因事实查清而省略告知和听取。没有明确放弃、未按规定告知或拒绝听取的普通程序题设中，不得作出处罚决定。材料应复核，提出的事实、理由或者证据成立的应采纳，提交本身不保证免罚；不得因陈述、申辩给予更重处罚。",
    },
    sources: Object.keys(administrativePenaltyDefenseSources),
    exercises: administrativePenaltyDefenseExercises,
  },
];

/** Append this topic to the existing chapter; do not replace its existing topics. */
export const administrativePenaltyDefenseChapter = {
  id: "ADMIN-ADMINISTRATIVE-ACTIONS",
  title: "行政行为基础",
  section: "行政法",
  topicIds: [topicId],
};
export const administrativePenaltyDefenseContentPack = {
  revision: administrativePenaltyDefenseRevision,
  snapshot: {
    topics: administrativePenaltyDefenseTopics,
    sources: administrativePenaltyDefenseSources,
  },
};
export const administrativePenaltyDefenseDefaultQueues = {
  objective: administrativePenaltyDefenseExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: administrativePenaltyDefenseExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};

export function administrativePenaltyDefenseQuestion(
  id: string,
): UnitExercise | undefined {
  const question = administrativePenaltyDefenseExercises.find(
    (q) => q.id === id,
  );
  return question ? structuredClone(question) : undefined;
}
export function administrativePenaltyDefenseTopicForQuestion(
  id: string,
): FaultTopic | undefined {
  return administrativePenaltyDefenseQuestion(id)
    ? structuredClone(administrativePenaltyDefenseTopics[0])
    : undefined;
}
export function administrativePenaltyDefenseSameCaseQuestions(
  id: string,
): UnitExercise[] {
  const question = administrativePenaltyDefenseQuestion(id);
  return question
    ? structuredClone(
        administrativePenaltyDefenseExercises.filter(
          (q) => q.caseId === question.caseId,
        ),
      )
    : [];
}
export function administrativePenaltyDefensePromptMaterial(id: string) {
  const question = administrativePenaltyDefenseQuestion(id);
  return question
    ? {
        id: question.id,
        caseId: question.caseId,
        revision: administrativePenaltyDefenseRevision,
        title: question.title,
        kind: question.kind,
        facts: question.facts,
        prompt: question.prompt,
      }
    : null;
}

/** Public legal teaching summaries, not verbatim statutes or scoring instructions. */
export const administrativePenaltyDefensePublicRules = [
  {
    sourceId: "admin-defense-article44",
    title: "第44条：决定前告知（教学摘要，非逐字原文）",
    url: lawUrl,
    excerpt:
      "行政机关应在作出处罚决定之前，告知拟处罚内容及事实、理由、依据，并告知依法享有的陈述、申辩、要求听证等权利。",
    checkedAt: "2026-10-11",
    scope: "2021修订文本；只摘示事前告知义务，不展开正式听证条件或期限。",
  },
  {
    sourceId: "admin-defense-article45",
    title: "第45条：听取、复核与不因申辩加重（教学摘要，非逐字原文）",
    url: lawUrl,
    excerpt:
      "应充分听取意见，对当事人提出的事实、理由和证据复核；提出的事实、理由或者证据成立的，应采纳。不得因当事人陈述、申辩给予更重处罚。",
    checkedAt: "2026-10-11",
    scope:
      "2021修订文本两款；成立才采纳，不是提交就必然免罚，也不是三类必须同时成立。",
  },
  {
    sourceId: "admin-defense-article62",
    title: "第62条：不得作出决定及明确放弃例外（教学摘要，非逐字原文）",
    url: lawUrl,
    excerpt:
      "决定前未按第44、45条告知，或者拒绝听取陈述、申辩的，不得作出处罚决定；当事人明确放弃陈述或者申辩权利的除外。",
    checkedAt: "2026-10-11",
    scope:
      "普通程序中的2021修订文本；不推演放弃范围，不由此直接认定既成处罚无效或必须撤销。",
  },
];

/** Projection for the existing inquiry path; registration and sending remain separate. */
export function administrativePenaltyDefenseInquiryMaterial(id: string) {
  const question = administrativePenaltyDefenseQuestion(id);
  if (!question) return null;
  return {
    questionId: question.id,
    questionRevision: administrativePenaltyDefenseRevision,
    title: question.title,
    facts: question.facts,
    prompt: question.prompt,
    ...(question.kind === "objective"
      ? {
          choiceMode: question.choiceMode,
          options: question.options?.map(({ id, text }) => ({ id, text })),
        }
      : {}),
    publicRules: structuredClone(
      administrativePenaltyDefensePublicRules.filter((rule) =>
        question.sources.includes(rule.sourceId),
      ),
    ),
  };
}
