import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";

export const criminalProcedureArrestReviewRevision =
  "crimpro-arrest-review-2026-10-15.v2";
const sourceId = "crimpro-arrest-review-law87-92";
const sourceUrl =
  "https://www.spp.gov.cn/spp/zdgz/201810/t20181027_396818.shtml";
export const criminalProcedureArrestReviewSources: ContentSources = {
  [sourceId]: {
    title:
      "《刑事诉讼法》2018修正第87、88、90—92条：公安提请批捕、听取律师意见与不批捕处理",
    url: sourceUrl,
    note: "2026-10-15直接读取最高人民检察院公布全文，并与深圳市南山区政府公安公开的2018修正全文交叉核对（https://www.szns.gov.cn/xxgk/bmxxgk/nsgafj/xxgk_99908/zcfg_99917/zcfgjgfxwj_99918/content/post_11403805.html）。网页转载日期不作修法日期。本组限成年人的公安侦查普通刑事案件；期限案明确没有延长、身份不明重算等情形，不将3日提请与收到提请书后7日审查混为同一起点，不将30日特定延长普遍化。另考律师主动要求时应听取意见及不批捕后的释放、继续侦查与依法取保。不给定逮捕实体条件的案件不替代检察机关作实体批捕结论。不展开检察机关自侦、监察移送、未成年人特殊程序、拘留执行手续、日历/节假日计算或逮捕后羁押期限。案例与评判点自编，非官方真题或阅卷尺度；2026-10-15独立有界审校另取得南山公安公开全文并核对上述条文支持本组结论；该次最高检及国家法律法规数据库读取403，人大目录超时。条文核对已完成，当前效力尚未全面证实。",
  },
};
export const criminalProcedureArrestReviewCaseFacts = {
  "CRIMPRO-ARREST-TIME-1":
    "本案为独立教学虚构。成年居民林澈涉嫌在本县独自实施一次盗窃，由县公安局依法刑事拘留，公安机关认为需要逮捕，正在准备提请同级检察院审查。本案已核实身份，不涉及流窜、多次或结伙作案，没有依法延长提请期限、重新计算期限等情形。拘留的入所、讯问及通知手续没有争议。\n\n办理人员提出两种安排：甲说‘公安可以先用七日考虑是否提请，送到检察院后再说’；乙说‘检察院的七日审查期限，应从公安拘留当天起算’。本问只核对公安提请及检察审查两个期限和起点，不计算具体日历日期，不讨论逮捕的实体条件。",
  "CRIMPRO-ARREST-DEFENSE-1":
    "本案为另一独立教学虚构。成年居民方宁因普通盗窃案被公安机关刑事拘留，案件已提请县检察院批准逮捕。其依法委托的辩护律师向负责审查批捕的检察人员明确提出：要求听取自己关于不需要逮捕、可以考虑取保候审的意见。这里没有会见、阅卷或律师身份争议，也没有给出足以直接判断是否应当逮捕的全部事实。\n\n检察人员说：‘现在还没到审查起诉，是否听你的意见可以由我选择，先不听。’亲属则说：‘只要律师要求并提出不批捕意见，检察院就必须不批准逮捕。’请只判断这两种说法，不替检察院决定本案是否具备逮捕条件。",
  "CRIMPRO-ARREST-RELEASE-1":
    "本案为第三个独立教学虚构。成年居民孙遥因普通盗窃案被县公安局依法刑事拘留。县检察院审查后作出不批准逮捕的决定，公安机关已经收到通知。公安机关认为该决定有错误，准备向原检察院要求复议。案件仍需继续侦查，且本题已给定孙遥符合取保候审条件；没有其他羁押依据。\n\n办理人员说：‘等复议有了结果再放人，在这之前沿用原刑事拘留。’亲属则说：‘不批捕就等于已经判了无罪，既不能继续侦查，也不能再依法取保。’本问只判断原拘留如何处理及后续侦查、取保的关系，不考保证金额、保证人资格或复核层级。",
};
const facts = criminalProcedureArrestReviewCaseFacts;
const references = [
  "公安机关认为需要逮捕的，本案没有延长等情形，应在拘留后三日以内提请同级检察院审查批准，不能直接占用七日。检察院应自接到提请批准逮捕书后的七日以内作出批准或不批准逮捕决定，不从公安拘留当天起算。这是两个机关、两项动作和两个起点；不能把特殊延长情形的30日加7日当成所有案件都能使用的37日。",
  "检察院在审查批准逮捕时，辩护律师已经提出要求，就应当听取其意见，不能因尚未进入审查起诉而拒绝。应当听取不等于必须采纳，检察院仍应根据案件情况依法决定批准或不批准逮捕，不能仅凭律师提出不批捕意见就推定本案必须不批捕。",
  "公安机关接到不批准逮捕通知后必须立即释放被拘留的孙遥，要求复议不停止这一义务，不能等复议结果才解除原拘留，并应将执行情况及时通知检察院。不批捕不等于无罪判决或案件终结；本案仍需侦查且已给定符合取保条件，可以依法取保候审继续侦查，不能沿用原拘留。",
];
const sourceIds = [sourceId];
export const criminalProcedureArrestReviewExercises: UnitExercise[] = [
  {
    id: "crimpro-arrest-time-choice-v2",
    caseId: "CRIMPRO-ARREST-TIME-1",
    kind: "objective",
    choiceMode: "single",
    title: "提请批捕和审查决定，分别从何时起算？",
    facts: facts["CRIMPRO-ARREST-TIME-1"],
    prompt: "在本案已排除延长等情形的前提下，下列期限安排哪项正确？",
    relatedTopicIds: ["crimpro-arrest-review"],
    sources: sourceIds,
    hint: "先区分公安提请和检察院审查，再分别找各自期限的起点。",
    options: [
      {
        id: "a",
        text: "公安在拘留后七日以内提请，检察院收到后再用七日审查。",
        explanation:
          "本案没有延长情形，公安提请适用拘留后三日以内，不能直接用七日。",
      },
      {
        id: "b",
        text: "公安在拘留后三日以内提请，检察院自收到提请批准逮捕书后七日以内决定。",
        explanation: "提请和审查由不同机关实施，各有期限和起点。",
      },
      {
        id: "c",
        text: "两机关的期限都从拘留当天起算，检察院必须在拘留后七日内作出决定。",
        explanation:
          "检察审查期限从收到提请批准逮捕书后起算，不能借用拘留起点。",
      },
      {
        id: "d",
        text: "既然需要逮捕，公安就可以先拘留三十日再提请，不必另看延长条件。",
        explanation:
          "延长至三十日针对法定特定重大嫌疑分子，不是每个案件的通常期限。",
      },
    ],
    answer: "b",
    reference: "选B。" + references[0],
  },
  {
    id: "crimpro-arrest-time-explain-v2",
    caseId: "CRIMPRO-ARREST-TIME-1",
    kind: "subjective",
    title: "分别说明两个机关的期限与起点",
    facts: facts["CRIMPRO-ARREST-TIME-1"],
    prompt:
      "甲、乙的安排是否正确？请分别说明本案公安提请批捕和检察院审查决定的期限、起点。",
    relatedTopicIds: ["crimpro-arrest-review"],
    sources: sourceIds,
    hint: "先区分公安提请和检察院审查，再分别找各自期限的起点。",
    answer: "",
    reference: references[0],
    criteria: [
      {
        id: "arrest-police-three-days",
        label: "本案公安在拘留后三日内提请",
        meaning:
          "联系本案没有延长等情形，说明公安应在拘留后三日以内向检察院提请批准逮捕，否定直接用七日。",
        acceptable:
          "‘本案无延长，公安从拘留后算三天内送请批捕’即可；不要求条号、写出全部特殊延长情形或另计算日历日期。",
        boundary:
          "不能把检察院的七日当作公安普通提请期限，也不能泛用三十日；写‘公安三天’但完全不说明拘留起点或提请动作不完整。",
      },
      {
        id: "arrest-procurator-seven-days",
        label: "检察院收到提请书后七日内决定",
        meaning:
          "说明检察院自接到公安提请批准逮捕书后的七日以内决定是否批准，不从拘留当天计算。",
        acceptable:
          "‘检察院收到公安提请书后再算七天内决定批不批’即可；与前项合写也可，不要求固定术语或另列37日公式。",
        boundary:
          "不能把起点改为公安拘留、律师提交意见或已经起诉；不要求另说检察长权限、执行逮捕或批捕的实体条件。前项正确判断独立保留。",
      },
    ],
  },
  {
    id: "crimpro-arrest-defense-choice-v2",
    caseId: "CRIMPRO-ARREST-DEFENSE-1",
    kind: "objective",
    choiceMode: "single",
    title: "律师已要求发表审查批捕意见",
    facts: facts["CRIMPRO-ARREST-DEFENSE-1"],
    prompt: "关于检察人员和亲属的说法，下列判断哪项正确？",
    relatedTopicIds: ["crimpro-arrest-review"],
    sources: sourceIds,
    hint: "分开判断是否应当听取，以及听取后是否必然采纳。",
    options: [
      {
        id: "a",
        text: "还没有移送审查起诉，检察人员可以一概不听律师意见。",
        explanation: "审查批捕阶段，辩护律师提出要求的，应当听取其意见。",
      },
      {
        id: "b",
        text: "应当听取；既然律师提出不批捕，就必须照此作出不批准决定。",
        explanation: "听取意见不等于自动采纳，是否批准仍须依法审查。",
      },
      {
        id: "c",
        text: "应当听取律师意见，但应否批准逮捕仍须根据案件情况依法判断。",
        explanation:
          "既保障律师在审查批捕中的意见表达，也不将意见等同于最终决定。",
      },
      {
        id: "d",
        text: "只有公安同意律师意见后，检察院才有义务听取。",
        explanation:
          "律师已向审查批捕的检察机关提出要求，不能另加公安同意前提。",
      },
    ],
    answer: "c",
    reference: "选C。" + references[1],
  },
  {
    id: "crimpro-arrest-defense-explain-v2",
    caseId: "CRIMPRO-ARREST-DEFENSE-1",
    kind: "subjective",
    title: "听取意见与批捕决定是什么关系？",
    facts: facts["CRIMPRO-ARREST-DEFENSE-1"],
    prompt:
      "检察人员能否因为尚未审查起诉而拒绝听取？亲属关于必须不批捕的推论是否成立？请分别说明。",
    relatedTopicIds: ["crimpro-arrest-review"],
    sources: sourceIds,
    hint: "分开判断是否应当听取，以及听取后是否必然采纳。",
    answer: "",
    reference: references[1],
    criteria: [
      {
        id: "arrest-listen-defense-request",
        label: "律师已提出要求，审查批捕时应当听取",
        meaning:
          "联系辩护律师已向审查批捕的检察人员提出要求，说明应当听取，不能让其等到审查起诉。",
        acceptable:
          "‘律师已经要求说意见了，检察院现在审查批捕就得听，不用等起诉’即可；不要求条号、书面申请形式或具体会见安排。",
        boundary:
          "不能只说检察院愿听就听，或要求先经公安许可；与会见权、阅卷起点是不同问题，不额外考那些程序。",
      },
      {
        id: "arrest-opinion-not-decision",
        label: "听取不等于必须采纳不批捕意见",
        meaning:
          "否定亲属由律师要求直接推出必须不批捕的推论，说明检察院仍须依案情依法判断。",
        acceptable:
          "‘要听不等于一定照办，批不批还要依法看案情’即可；不要求完整列出逮捕实体要件，也不要求判定本案最终结果。",
        boundary:
          "不能把应当听取变成必须同意律师结论；未给足实体事实，不能要求学生必须作出本案应批捕或应取保的实体结论。",
      },
    ],
  },
  {
    id: "crimpro-arrest-release-choice-v2",
    caseId: "CRIMPRO-ARREST-RELEASE-1",
    kind: "objective",
    choiceMode: "single",
    title: "不批准逮捕后，公安准备复议",
    facts: facts["CRIMPRO-ARREST-RELEASE-1"],
    prompt: "关于孙遥的原拘留及案件后续处理，下列哪项正确？",
    relatedTopicIds: ["crimpro-arrest-review"],
    sources: sourceIds,
    hint: "先看不批捕通知对原拘留的影响，再区分释放、继续侦查与依法取保。",
    options: [
      {
        id: "a",
        text: "公安既然认为决定有误，可以继续拘留直至复议结束。",
        explanation: "要求复议不免除立即释放被拘留人的义务。",
      },
      {
        id: "b",
        text: "必须立即释放，因此案件也应当直接按无罪终结。",
        explanation: "释放与最终是否有罪、是否继续侦查不能等同。",
      },
      {
        id: "c",
        text: "原拘留先保留，等当事人交了保证金后才能讨论是否释放。",
        explanation:
          "不能以另办取保为由沿用本案原拘留；本题也未决定必须采用保证金方式。",
      },
      {
        id: "d",
        text: "应立即释放，复议不能拖延；仍需侦查且符合条件的，可以依法取保候审。",
        explanation: "不批捕不等于无罪判决；后续措施须另有合法依据。",
      },
    ],
    answer: "d",
    reference: "选D。" + references[2],
  },
  {
    id: "crimpro-arrest-release-explain-v2",
    caseId: "CRIMPRO-ARREST-RELEASE-1",
    kind: "subjective",
    title: "复议期间能否沿用原拘留？",
    facts: facts["CRIMPRO-ARREST-RELEASE-1"],
    prompt:
      "公安收到不批捕通知后应如何处理原拘留，能否等复议结果？亲属所说的‘不能继续侦查或依法取保’是否成立？请结合题设说明。",
    relatedTopicIds: ["crimpro-arrest-review"],
    sources: sourceIds,
    hint: "先看不批捕通知对原拘留的影响，再区分释放、继续侦查与依法取保。",
    answer: "",
    reference: references[2],
    criteria: [
      {
        id: "arrest-release-without-waiting",
        label: "立即释放，复议不延续原拘留",
        meaning:
          "联系公安已收到不批捕通知，说明必须立即释放，不能等待复议结果继续原拘留。",
        acceptable:
          "‘收到不批捕就得放，申请复议也不能先关着等结果’即可；不要求法条编号、释放证明格式或复核层级。",
        boundary:
          "明确表示可以等复议结束或先继续原拘留，与本项相反；本题重点为释放义务，不另扣及时通知检察院的手续。若学生明确尚未确定立即释放还是等复议，应记为未确定；这是学生尚未形成判断，不是本案材料不足。",
      },
      {
        id: "arrest-continue-lawful-bail",
        label: "不批捕不等于结案，符合题设条件可依法取保",
        meaning:
          "结合仍需继续侦查且已给定符合取保条件，说明可依法取保继续侦查，否定不批捕就等于无罪终结。",
        acceptable:
          "‘不批捕不是判无罪，还要查；题里已经符合取保条件，可以取保接着查’即可；不要求重新证明取保资格、决定保证方式或金额；“可以依法取保接着查”与“依法办理取保候审继续侦查”均可，不因“可以”二字扣分。",
        boundary:
          "不能说不批捕后任何侦查和强制措施都不得再用，也不能把所有不批捕案件一概说成自动取保；本题的取保条件已给定。前项释放判断独立保留。",
      },
    ],
  },
];
export const criminalProcedureArrestReviewTopics: FaultTopic[] = [
  {
    id: "crimpro-arrest-review",
    title: "公安拘留后的审查逮捕与不批捕处理",
    headline: "分清谁提请、谁审查，以及不批捕后如何处理",
    goal: "在普通公安侦查案件中，区分拘留后的提请和审查期限，理解听取律师意见与不批捕后的释放、依法取保。",
    prerequisite: "已了解侦查阶段可以委托律师，以及取保候审不等于案件终结。",
    minutes: "15–20",
    paragraphs: [
      "本组限公安机关侦查的普通刑事案件。公安认为被拘留人需要逮捕，通常在拘留后三日以内向同级检察院提请；特殊情况下提请时间可以延长一日至四日，对流窜、多次、结伙作案的重大嫌疑分子可以延长至三十日。检察院从接到提请批准逮捕书后另算七日以内，决定批准或不批准。不能把两段起点混用，也不能把37日当作一律可用的期限。",
      "审查批捕仍是律师可以提出辩护意见的阶段。辩护律师提出要求的，检察院应当听取；这不以已经审查起诉为前提，也不等于必须采纳不批捕意见。是否批捕仍须依法审查，不能从‘律师要求听取’直接推出结果。",
      "公安收到不批捕通知后须立即释放被拘留人，并及时通知检察院执行情况；公安要求复议也不能等结果才放人。不批捕不等于无罪判决或案件终结。仍需侦查并符合相应条件的，依法取保候审或监视居住；不得没有新合法依据而沿用原拘留。本组取保情形明确给定条件，不代替资格判断。",
    ],
    example: {
      title: "两个机关的期限不能共用起点",
      facts: facts["CRIMPRO-ARREST-TIME-1"],
      analysis: references[0],
    },
    pitfall:
      "把普通提请期限当成七日或三十日；把听取律师意见当成必须同意；为复议继续拘留，或把不批捕当成无罪结案。",
    recall: {
      prompt: "公安提请和检察审查从何时起算？不批捕后复议、继续侦查怎样处理？",
      reference:
        "无延长等情形时，公安在拘留后三日内提请，检察院收到提请书后七日内决定；不批捕须立即释放，复议不能拖延。仍需侦查且符合条件的，可以依法取保等；不是无罪结案。",
    },
    sources: sourceIds,
    exercises: criminalProcedureArrestReviewExercises,
  },
];
export const criminalProcedureArrestReviewChapter = {
  id: "CRIMPRO-ARREST-REVIEW",
  title: "强制措施：拘留后的审查逮捕",
  section: "刑事诉讼法",
  topicIds: ["crimpro-arrest-review"],
};
export const criminalProcedureArrestReviewContentPack = {
  revision: criminalProcedureArrestReviewRevision,
  snapshot: {
    topics: criminalProcedureArrestReviewTopics,
    sources: criminalProcedureArrestReviewSources,
  },
};
export const criminalProcedureArrestReviewDefaultQueues = {
  objective: criminalProcedureArrestReviewExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: criminalProcedureArrestReviewExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function criminalProcedureArrestReviewQuestion(id: string) {
  const q = criminalProcedureArrestReviewExercises.find((q) => q.id === id);
  return q ? structuredClone(q) : undefined;
}
export function criminalProcedureArrestReviewTopicForQuestion(id: string) {
  return criminalProcedureArrestReviewQuestion(id)
    ? structuredClone(criminalProcedureArrestReviewTopics[0])
    : undefined;
}
export function criminalProcedureArrestReviewSameCaseQuestions(id: string) {
  const q = criminalProcedureArrestReviewQuestion(id);
  return q
    ? structuredClone(
        criminalProcedureArrestReviewExercises.filter(
          (x) => x.caseId === q.caseId,
        ),
      )
    : [];
}
export const criminalProcedureArrestReviewPublicRules = [
  {
    sourceId,
    title: "刑事诉讼法第87、88、90—92条（法条原文）",
    url: sourceUrl,
    excerpt:
      "第八十七条　公安机关要求逮捕犯罪嫌疑人的时候，应当写出提请批准逮捕书，连同案卷材料、证据，一并移送同级人民检察院审查批准。必要的时候，人民检察院可以派人参加公安机关对于重大案件的讨论。\n第八十八条　人民检察院审查批准逮捕，可以讯问犯罪嫌疑人；有下列情形之一的，应当讯问犯罪嫌疑人：\n（一）对是否符合逮捕条件有疑问的；\n（二）犯罪嫌疑人要求向检察人员当面陈述的；\n（三）侦查活动可能有重大违法行为的。\n人民检察院审查批准逮捕，可以询问证人等诉讼参与人，听取辩护律师的意见；辩护律师提出要求的，应当听取辩护律师的意见。\n第九十条　人民检察院对于公安机关提请批准逮捕的案件进行审查后，应当根据情况分别作出批准逮捕或者不批准逮捕的决定。对于批准逮捕的决定，公安机关应当立即执行，并且将执行情况及时通知人民检察院。对于不批准逮捕的，人民检察院应当说明理由，需要补充侦查的，应当同时通知公安机关。\n第九十一条　公安机关对被拘留的人，认为需要逮捕的，应当在拘留后的三日以内，提请人民检察院审查批准。在特殊情况下，提请审查批准的时间可以延长一日至四日。\n对于流窜作案、多次作案、结伙作案的重大嫌疑分子，提请审查批准的时间可以延长至三十日。\n人民检察院应当自接到公安机关提请批准逮捕书后的七日以内，作出批准逮捕或者不批准逮捕的决定。人民检察院不批准逮捕的，公安机关应当在接到通知后立即释放，并且将执行情况及时通知人民检察院。对于需要继续侦查，并且符合取保候审、监视居住条件的，依法取保候审或者监视居住。\n第九十二条　公安机关对人民检察院不批准逮捕的决定，认为有错误的时候，可以要求复议，但是必须将被拘留的人立即释放。如果意见不被接受，可以向上一级人民检察院提请复核。上级人民检察院应当立即复核，作出是否变更的决定，通知下级人民检察院和公安机关执行。",
    checkedAt: "2026-10-15",
    scope:
      "2018修正文本的中性原文；公安侦查案件的提请批捕、检察审查、律师意见及不批捕处理，不含本案答案或采分要求。",
  },
];
