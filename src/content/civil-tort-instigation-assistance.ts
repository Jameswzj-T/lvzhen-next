import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";

/** Original fictional adult property cases, separate from the old tort units. */
export const civilTortInstigationAssistanceRevision =
  "civil-tort-instigation-assistance-2026-10-10.v1";
const topicId = "civil-tort-instigation-assistance";
const instigationCaseId = "CIV-TORT-INSTIGATION-POT-1";
const assistanceCaseId = "CIV-TORT-ASSISTANCE-BICYCLE-1";

export const civilTortInstigationAssistanceSources: ContentSources = {
  "civil-instigation-assistance-1169": {
    title: "民法典第1169条第1款：教唆、帮助他人侵权",
    url: "https://www.cac.gov.cn/2020-06/01/c_15925617772683196.htm",
    note: "中央网信办2020-06-01转载新华社公布的民法典第七编；2026-10-10直接读取第1169条两款、第1165条第1款及第1260条施行日期。两案均明确完全民事行为能力，采用1169第1款，不套用第2款的监护责任安排。直接毁物造成损害的基础由1165第1款支持。本组事实、参考和采分为自编教学内容，不是官方试题、阅卷标准或真实执法记录。",
  },
  "civil-joint-liability-178": {
    title: "民法典第178条第1款：连带责任的对外承担",
    url: "https://www.cac.gov.cn/2020-06/01/c_1592561777268319.htm",
    note: "中央网信办转载新华社法典总则编，前言载2020-05-28通过；2026-10-10直接读取第178条。用第1款说明权利人可向部分或全部连带责任人请求承担责任，不把对外连带说成必须先找亲手毁物者。内部份额、平均分担及追偿不在本问必答范围，不据双方人数默认责任比例。",
  },
  "civil-instigation-effective-directory": {
    title: "现行有效法律目录：民法典列2020年通过文本",
    url: "https://www.samr.gov.cn/fgs/sjdt/art/2026/art_93a4fbac2ce14ab6baab60b0cd452ef4.html",
    note: "市场监管总局转载中国人大网目录，2026-09-18发布，数据截至2026-08-28。2026-10-10只读复用同日已下载的官方公开正文，民法典条目列2020年通过；法典第1260条载2021-01-01施行。目录截至日不等于本轮读取日，不宣称完成之后全法效力穷尽核验；本候选仍待统一独立内容审校和登记。",
  },
};

export const civilTortInstigationAssistancePreparation = {
  status: "isolated-content-candidate-not-registered",
  sourceCheckedAt: "2026-10-10",
  subjectId: "civil-law",
  subjectLabel: "民法",
  independentCases: 2,
  objectiveQuestions: 2,
  writtenQuestions: 2,
  teachingCards: 1,
  officialTargetedArticlesDirectlyRead: true,
  effectiveDirectoryCutoff: "2026-08-28",
  completeCurrentEffectAudit: false,
  sameDayLiveNpcStatusConfirmed: false,
  independentContentReviewApproved: false,
  registeredInDefaultProduct: false,
  factsAreFictional: true,
  fictionalChecksAreActualReceipts: false,
  annualSyllabusCoverageClaim: false,
  scope:
    "教唆、帮助具有完全民事行为能力的成年人毁坏他人财物，对受害人承担的连带责任",
} as const;

export const civilTortInstigationAssistanceCaseFacts = {
  [instigationCaseId]: [
    "本案为教学虚构。何晟与邻居田佩发生口角后，想让田佩家门前院内的一只陶花盆被毁。成年苏遥原本没有破坏花盆的打算。何晟特意找到苏遥，指认田佩的花盆，反复劝他说：‘去把她的花盆砸坏，让她难受一下，我支持你。’苏遥被说动，随后未经田佩同意，故意把该花盆砸碎。何晟没有亲手碰花盆。",
    "聊天记录和现场影像确认了何晟的劝动、苏遥因此实施破坏以及花盆被砸碎的经过。三人均具有完全民事行为能力；花盆归田佩所有，田佩没有同意破坏，也没有对损害发生或扩大作出有过错的行为。本问只分析何晟就这次花盆损坏对田佩的民事责任，不涉及雇佣、未成年人、具体损失金额、内部份额或刑事责任。",
  ].join("\n\n"),
  [assistanceCaseId]: [
    "本案为另一独立教学虚构。钱涵已经决定毁坏梅岚停放在院内的自行车。他把这一计划告诉季然，明确说自行车属于梅岚、梅岚没有同意，并请季然提供破坏时要用的工具。季然听明白后，仍为这件事专程将工具送给钱涵。钱涵实际使用季然提供的工具毁坏了该自行车，造成车身损坏。季然没有亲手接触自行车。",
    "消息记录、工具交付记录和现场影像确认了季然知道上述用途、专为破坏提供工具，以及钱涵使用这些工具造成损坏的经过。三人均具有完全民事行为能力；梅岚没有对损害发生或扩大作出有过错的行为。本问只分析季然就这次自行车损坏对梅岚的民事责任，不涉及雇佣、未成年人、产品缺陷、交通事故、具体损失金额、内部份额或刑事责任。",
  ].join("\n\n"),
} as const;

const sourceKeys = Object.keys(civilTortInstigationAssistanceSources);
export const civilTortInstigationAssistanceExercises: UnitExercise[] = [
  {
    id: "civil-tort-instigation-choice",
    caseId: instigationCaseId,
    relatedTopicIds: [topicId],
    kind: "objective",
    choiceMode: "single",
    title: "没有亲手碰花盆的人",
    facts: civilTortInstigationAssistanceCaseFacts[instigationCaseId],
    prompt: "就何晟对田佩的民事责任，下列哪项正确？",
    options: [
      {
        id: "a",
        text: "何晟没有动手，应由苏遥单独对田佩承担责任。",
        explanation:
          "忽略了何晟主动劝动苏遥实施毁物的事实，未亲手毁物不是当然免责理由。",
      },
      {
        id: "b",
        text: "何晟教唆苏遥实施侵权，应与苏遥对田佩承担连带责任。",
        explanation:
          "具体劝动导致苏遥实施毁物，属于教唆成年人侵权，应与实施者承担连带责任。",
      },
      {
        id: "c",
        text: "何晟只说了话，所以田佩必须先取得苏遥赔偿，才能找何晟。",
        explanation:
          "本条规定的是连带责任，不是必须先向亲手毁物者请求的补充责任。",
      },
      {
        id: "d",
        text: "因为涉及两人，何晟对田佩的责任必然仅限损失的一半。",
        explanation:
          "不能由人数直接确定对外责任份额，也不能把连带责任改成只能分别请求一半。",
      },
    ],
    answer: "b",
    hint: "",
    reference:
      "选B。何晟不是仅在场或事后表示意见，而是为毁坏田佩花盆主动反复劝动原本没有破坏打算的苏遥；苏遥因此砸碎花盆，联系已经查明。教唆具有完全民事行为能力的人实施侵权，应与实施者承担连带责任。何晟没有亲手碰花盆不使其免责，也不能要求田佩只能先找苏遥或只能向何晟请求一半。",
    sources: [...sourceKeys],
  },
  {
    id: "civil-tort-instigation-explain",
    caseId: instigationCaseId,
    relatedTopicIds: [topicId],
    kind: "subjective",
    title: "只说了话就不用赔吗",
    facts: civilTortInstigationAssistanceCaseFacts[instigationCaseId],
    prompt:
      "何晟称：‘花盆是苏遥砸的，我没有动手，所以田佩不能向我主张赔偿。’这一主张能否成立？请结合案情说明何晟的行为性质，以及他与苏遥对田佩的责任如何承担。",
    hint: "",
    reference:
      "不能成立。何晟希望花盆被毁，具体指认并反复劝动原本没有破坏打算的苏遥；苏遥因劝动而实施毁物并造成花盆损坏。这是教唆他人实施侵权，并非单纯说话或在场。两人均具有完全民事行为能力，何晟应与苏遥对田佩承担连带责任，田佩可以向何晟请求承担这次毁盆造成的赔偿责任。没有亲手动手不能免除教唆者的责任。",
    criteria: [
      {
        id: "civil-tort-instigation-explain-conduct",
        label: "联系主动劝动与实际毁物",
        meaning:
          "联系何晟具体劝动原无破坏打算的苏遥、苏遥因此砸碎田佩花盆的事实，说明何晟属于教唆他人实施侵权，而非仅说话或在场。",
        acceptable:
          "‘他为了让田佩的盆被毁，把原本不打算砸盆的苏遥说动，苏遥听了才去砸，这就是推动别人侵权’等日常表达可以说明同一行为性质。",
        boundary:
          "不要求固定‘教唆’用语、条号、逐条复述聊天与影像，也不强求引述劝动原话；须说明主动劝动与实际毁物的联系。规则、事实和结论可一段综合表达，不把单纯争吵、旁观或事后赞同一概认作教唆。",
      },
      {
        id: "civil-tort-instigation-explain-liability",
        label: "说明对田佩的连带责任",
        meaning:
          "说明何晟应与苏遥对田佩承担连带责任，田佩可以向何晟主张本次损害的赔偿责任；何晟以未亲手毁物为由免责的主张不能成立。",
        acceptable:
          "使用‘两人对田佩负连带赔偿责任’即足；或说明‘田佩可以找何晟承担本次依法应赔的损失，不能因不是他亲手砸就让他退出赔偿’等能表达连带对外承担的同义说法。",
        boundary:
          "不要求固定‘连带’术语，但仅说两人可能都要赔、未说明连带或等义对外承担含义，不足以完成本点。已明确连带责任时，不再要求机械补写全部请求对象或单独结论句。题设已给完全民事行为能力，不另要求复述年龄或监护例外。金额、比例、内部份额、追偿与刑事责任均非必答，不从配对客观题或其他问补足本问原答。",
      },
    ],
    sources: [...sourceKeys],
  },
  {
    id: "civil-tort-assistance-choice",
    caseId: assistanceCaseId,
    relatedTopicIds: [topicId],
    kind: "objective",
    choiceMode: "single",
    title: "送去工具却没有碰车的人",
    facts: civilTortInstigationAssistanceCaseFacts[assistanceCaseId],
    prompt: "就季然对梅岚的民事责任，下列哪项正确？",
    options: [
      {
        id: "a",
        text: "季然只提供工具，没有碰车，所以不对梅岚承担责任。",
        explanation:
          "本案明知毁物用途仍专门提供实际使用的工具，不能凭未亲手毁物排除帮助侵权责任。",
      },
      {
        id: "b",
        text: "季然至多向钱涵负责，梅岚不能直接向季然请求赔偿。",
        explanation:
          "帮助侵权所产生的连带责任是对受害人的责任，不只是帮助者与实施者之间的问题。",
      },
      {
        id: "c",
        text: "季然帮助钱涵实施侵权，应与钱涵对梅岚承担连带责任。",
        explanation:
          "具体明知用途、专为破坏提供工具及实际使用造成损坏共同支持帮助侵权，应与实施者连带承担。",
      },
      {
        id: "d",
        text: "季然只有在钱涵完全无力赔偿时才需要对梅岚赔偿。",
        explanation:
          "不能把帮助成年人侵权的连带责任改作以实施者无力赔偿为条件的补充责任。",
      },
    ],
    answer: "c",
    hint: "",
    reference:
      "选C。季然已经知道钱涵将未经主人同意毁坏他人的自行车，仍专为这一计划提供工具；钱涵实际使用该工具造成车身损坏，帮助与侵权的联系明确。帮助具有完全民事行为能力的人实施侵权，应与实施者对受害人承担连带责任，不因季然没有亲手碰车而免责，也不以钱涵先无力赔偿为条件。",
    sources: [...sourceKeys],
  },
  {
    id: "civil-tort-assistance-explain",
    caseId: assistanceCaseId,
    relatedTopicIds: [topicId],
    kind: "subjective",
    title: "毁物工具实际帮了什么",
    facts: civilTortInstigationAssistanceCaseFacts[assistanceCaseId],
    prompt:
      "季然称：‘我没有亲手弄坏自行车，梅岚只能找钱涵赔。’这一主张能否成立？请结合案情说明季然提供工具的行为性质，以及他与钱涵对梅岚的责任如何承担。",
    hint: "",
    reference:
      "不能成立。季然知道钱涵将未经同意毁坏梅岚的自行车，仍专门送去工具，钱涵也实际使用这些工具完成破坏并造成车身损坏。因此季然的行为是在具体支持他人的侵权，不是一次用途不明的普通借物。两人均具有完全民事行为能力，季然应与钱涵对梅岚承担连带责任，梅岚可以向季然请求承担本次损害的赔偿责任。未亲手碰车不能成为季然免除责任的理由。",
    criteria: [
      {
        id: "civil-tort-assistance-explain-conduct",
        label: "联系明知用途与实际支持",
        meaning:
          "联系季然知道未经主人同意毁物的计划、仍专门提供工具，钱涵实际使用工具造成自行车损坏，说明季然是帮助他人实施侵权，而非普通用途不明的借物。",
        acceptable:
          "‘季然明知道工具是拿去毁梅岚的车，还是为这件事送去，钱涵也确实用它弄坏了车，季然是在帮这次侵权’等综合表达可以承接本点。",
        boundary:
          "不要求具体工具名称、逐项复述消息或交付记录；说清知道毁物用途、实际支持并被用于本次损坏即可。不把所有借出工具或仅知情未劝阻一概认作帮助侵权，也不因钱涵原本已决定毁物就否定随后提供的实际帮助。",
      },
      {
        id: "civil-tort-assistance-explain-liability",
        label: "说明对梅岚的连带责任",
        meaning:
          "说明季然应与钱涵对梅岚承担连带责任，梅岚可以向季然主张本次损害的赔偿责任；未亲手毁物不能使季然免责，不能将请求对象限定为钱涵一人。",
        acceptable:
          "‘季然和钱涵负连带责任，梅岚也能直接找季然承担本次依法应赔的损失’等表述可把结论与理由合写，不要求另列结论句。",
        boundary:
          "不要求固定‘连带’术语，但应表达该对外承担含义；仅说季然也可能有责任、未说明连带或等义内容，不足以完成本点。已说清连带责任时，不强求另写不用先找钱涵或其无力赔偿的提醒。题设已给完全民事行为能力，不另要求复述年龄或监护例外。金额、比例、内部份额、追偿与刑事责任均非必答，不从配对客观题或其他问补足本问原答。",
      },
    ],
    sources: [...sourceKeys],
  },
];

export const civilTortInstigationAssistanceCases = (
  [instigationCaseId, assistanceCaseId] as const
).map((id) => ({
  id,
  facts: civilTortInstigationAssistanceCaseFacts[id],
  questionIds: civilTortInstigationAssistanceExercises
    .filter((question) => question.caseId === id)
    .map((question) => question.id),
}));

export const civilTortInstigationAssistanceTopics: FaultTopic[] = [
  {
    id: topicId,
    title: "教唆、帮助成年人侵权的责任",
    headline: "没有亲手毁物，也可能要向受害人赔偿",
    goal: "用具体劝动或实际支持的事实，说明教唆、帮助侵权及其连带责任。",
    prerequisite: "可先看‘普通过错侵权与财产损失’；本节不计算赔偿金额。",
    minutes: "8–12",
    paragraphs: [
      "直接毁坏别人的财物，可能产生侵权责任。没有亲手毁物的人也不能只凭这一点免责：主动劝动他人去侵权，或为侵权提供实际帮助，都要结合具体事实判断。先看他说了什么、做了什么，这些行为怎样与实际损害相联系。",
      "民法典规定，教唆、帮助他人实施侵权的，应与实施者承担连带责任。本节两案均是具有完全民事行为能力的成年人：一案具体劝动原本没有毁物打算的人，另一案明知毁物计划仍提供实际使用的工具。不能把单纯在场、事后赞同或用途不明的普通借物直接认成这些行为。",
      "连带责任是对受害人的承担方式。受害人可以向其中一人或多人请求承担责任，并非只能找亲手毁物的人，也不必把请求分成每人固定一半。这里不确定赔偿金额、两人内部份额或追偿；如果涉及无民事行为能力人或限制民事行为能力人，规则还须另查，不能直接照搬本节。",
    ],
    example: {
      title: "花盆是谁砸的，不是唯一问题",
      facts: civilTortInstigationAssistanceCaseFacts[instigationCaseId],
      analysis:
        "何晟主动把原无破坏打算的苏遥劝动，苏遥因此砸碎田佩的花盆。这种具体推动和实际毁物之间的联系说明教唆侵权；何晟虽未亲手碰花盆，也应与苏遥对田佩承担连带责任。不要只数谁动了手。",
    },
    pitfall:
      "把未亲手毁物当成完全免责，或把连带责任当成受害人只能分别请求每人一半。",
    recall: {
      prompt:
        "为什么教唆或帮助成年人毁坏财物的人，不能仅凭未亲手动手就拒绝受害人的赔偿请求？",
      reference:
        "须结合具体劝动或实际支持与损害的联系判断。教唆、帮助他人实施侵权的，应与实施者对受害人承担连带责任；未亲手毁物不排除这种责任。受害人可向其中一人或多人请求承担责任，不能由人数直接改成固定一半，也不必先找亲手毁物者。",
    },
    sources: [...sourceKeys],
    exercises: civilTortInstigationAssistanceExercises,
  },
];

/** Additional civil unit descriptor; registration remains with the integrator. */
export const civilTortInstigationAssistanceChapter = {
  id: "CIV-TORT-INSTIGATION-ASSISTANCE",
  title: "侵权责任：教唆与帮助",
  section: "侵权责任",
  topicIds: civilTortInstigationAssistanceTopics.map((topic) => topic.id),
};
export const civilTortInstigationAssistanceContentPack = {
  revision: civilTortInstigationAssistanceRevision,
  snapshot: {
    topics: civilTortInstigationAssistanceTopics,
    sources: civilTortInstigationAssistanceSources,
  },
};
export const civilTortInstigationAssistanceDefaultQueues = {
  objective: civilTortInstigationAssistanceExercises
    .filter((question) => question.kind === "objective")
    .map((question) => question.id),
  subjective: civilTortInstigationAssistanceExercises
    .filter((question) => question.kind === "subjective")
    .map((question) => question.id),
};
export function civilTortInstigationAssistanceQuestion(
  id: string,
): UnitExercise | undefined {
  const question = civilTortInstigationAssistanceExercises.find(
    (item) => item.id === id,
  );
  return question ? structuredClone(question) : undefined;
}
export function civilTortInstigationAssistanceTopicForQuestion(
  id: string,
): FaultTopic | undefined {
  return civilTortInstigationAssistanceQuestion(id)
    ? structuredClone(civilTortInstigationAssistanceTopics[0])
    : undefined;
}
export function civilTortInstigationAssistanceSameCaseQuestions(
  id: string,
): UnitExercise[] {
  const question = civilTortInstigationAssistanceQuestion(id);
  return question
    ? structuredClone(
        civilTortInstigationAssistanceExercises.filter(
          (item) => item.caseId === question.caseId,
        ),
      )
    : [];
}
export function civilTortInstigationAssistancePromptMaterial(id: string) {
  const question = civilTortInstigationAssistanceQuestion(id);
  return question
    ? {
        id: question.id,
        caseId: question.caseId,
        revision: civilTortInstigationAssistanceRevision,
        title: question.title,
        kind: question.kind,
        facts: question.facts,
        prompt: question.prompt,
      }
    : null;
}
