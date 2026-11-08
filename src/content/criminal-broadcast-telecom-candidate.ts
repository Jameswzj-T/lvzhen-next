import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";

// Review candidates only. No import from a catalog, queue, inquiry or paid entry.
export const broadcastTelecomCandidateRevision =
  "criminal-broadcast-telecom-2026-10-16.candidate-v1";
export const broadcastTelecomCandidatePreparation = {
  status: "awaiting-source-and-content-review",
  registeredInProduct: false,
  independentContentReviewApproved: false,
  allPrimarySourcesVerified: false,
  fullCurrentValidityAuditCompleted: false,
  checkedAt: "2026-10-16",
  chapterId: "CL14",
  topicId: "safety-broadcast-telecom",
  writtenQuestions: 2,
  independentFactualScenarios: 4,
  objectiveQuestions: 0,
  candidateKnowledgeCards: 1,
  modelCalls: 0,
  reusedVisibleSnapshot: { questions: 932, cards: 295, contentPacks: 104 },
  existingChapterQuestions: 55,
  excludedNearbyTopics: [
    "safety-utilities: 第118、119条电力、燃气等设备，不代替第124条。",
    "民航通信导航与军事通信设施：各有专门对象，不能计成公用电信覆盖。",
  ],
  blockers: [
    "法释〔2004〕21号已取得非官方转载全文，但官方全文尚未成功回核；国家法律法规数据库403，中国法院网旧库访问及证书错误。电信人数、时长判据保持候选。",
    "两题及知识卡未获独立内容审阅；少量先验是作者预设，不是模型验收或真实学习效果。",
  ],
} as const;

const codeUrl =
  "https://tianjin.chinatax.gov.cn/11200000000/0300/030004/03000418/20240920152615743.shtml";
export const broadcastTelecomCandidateSources: ContentSources = {
  "broadcast-telecom-code": {
    title: "《刑法》第124、275条：专门设施公共安全与故意毁财",
    url: codeUrl,
    note: "2026-10-16直接核读天津税务机关转载正文，页面收录至修正案（十二）并标注全文有效；第124条区分基本犯罪与严重后果，第275条规定毁财。未完成此后全部修改、清理及2027年度范围审计。",
  },
  "broadcast-2011": {
    title:
      "最高法《关于审理破坏广播电视设施等刑事案件具体应用法律若干问题的解释》",
    url: "https://www.court.gov.cn/fabu/xiangqing/2799.html",
    note: "2026-10-16直接核读最高法全文。法释〔2011〕13号，2011-05-23通过，2011-06-07公布，2011-06-13施行；页面2011-06-14刊载。第一条第二项是县级、地市级台直接播出设施，第三项另论传输网，不能混用时长；第六条处理未用或未危及公共安全的毁财，第八条要求参照行业规定确定设施范围。题设明确设施性质，不考技术鉴定。",
  },
  "telecom-2004-provisional": {
    title: "最高法公用电信设施解释（非官方转载全文，官方回核待完成）",
    url: "https://law.nlaw.org/司法解释/402881e45ffbbe41015ffca3f48c1154/",
    note: "2026-10-16取得法释〔2004〕21号非官方转载全文，并对照另一转载；不将转载的有效标记当官方效力确认。所载2004-08-26通过、2004-12-30公布、2005-01-11施行。第一条第二项记载2000以上不满10000用户中断1小时以上；第二条第二项为10000以上用户中断1小时以上；第三条为未危害公共安全或未投入使用的毁财；第五条由行业规定确定设施、人数、时长等。本候选有关阈值须回核官方原文后再审阅登记。",
  },
};

export const broadcastTelecomSourceVerification = {
  officialFullTextsRead: ["broadcast-telecom-code", "broadcast-2011"],
  pendingOfficialFullTexts: ["telecom-2004-provisional"],
  telecomOfficialLocator:
    "https://flk.npc.gov.cn/detail?id=402881e45ffbbe41015ffca3f48c1154",
  telecomOfficialLocatorResult: "403 Forbidden; no official text obtained",
  telecomCourtLocator: "https://lawdb.cncourt.org/show.php?fid=98852",
  telecomCourtLocatorResult:
    "web inaccessible/502; direct verified HTTPS failed hostname certificate validation",
  corroboratingReproduction: "https://www.110.com/fagui/law_21385.html",
} as const;

// Neutral rules for review. Not added to the public inquiry registry.
export const broadcastTelecomCandidatePublicBasis = [
  {
    sourceId: "broadcast-telecom-code",
    provisions: ["刑法第124条第1款", "刑法第275条"],
    summary:
      "破坏广播电视、公用电信设施须危害公共安全；严重后果是进一步判断。一般故意毁财另须数额或情节条件，不能由设备名称或没有伤亡直接决定罪名。",
    verification: "official-full-text-read",
  },
  {
    sourceId: "broadcast-2011",
    provisions: ["第1条第2、3项", "第6条", "第8条"],
    summary:
      "县级或地市级台直接关系节目播出的在用设施受损、无法使用且信号无法播出，属于基本条款列举情形；县级传输网的时长条件不能移用于这一项。尚未投入使用的设施被故意毁坏并达到毁财数额或情节条件，按毁财处理。设施类别按行业规则确定。",
    verification: "official-full-text-read",
  },
  {
    sourceId: "telecom-2004-provisional",
    provisions: ["第1条第2项", "第2条第2项", "第3、5条"],
    summary:
      "待官方回核：在用公用电信设施遭故意破坏，2000以上不满10000用户中断1小时以上列入基本公共危险；10000以上用户中断1小时以上另属严重后果。设施性质、用户数与时长须依行业规定，不凭设备价格或印象计数。",
    verification: "official-recheck-pending",
  },
] as const;

export const broadcastTelecomCandidateQuestions: UnitExercise[] = [
  {
    id: "safety-broadcast-use-boundary-candidate",
    caseId: "CL14-BROADCAST-COMPARE-1",
    relatedTopicIds: ["safety-broadcast-telecom"],
    kind: "subjective",
    title: "播出中的设施与未启用设备",
    facts:
      "以下是两段互不关联的教学虚构。两名行为人均成年，具备刑事责任能力；本题不考责任年龄、能力或其他犯罪的竞合。\n\n第一段：岑岳明知某县电视台一台设备正在承担节目播出，仍为使该台停播而将它毁坏。检验确认，它属于台内直接关系节目播出的设施。受损后设备无法使用，该台信号连续20分钟无法播出；没有人员伤亡，也没有题设以外的严重后果。\n\n第二段：孟川为泄愤毁坏另一县电视台刚购入、仍单独封存在仓库内的设备。这台设备从未安装、从未投入使用，不是已投入运行系统的备用设施；这次毁坏未影响任何现有节目播出或其他公共服务。造成的财物损失已经达到故意毁坏财物罪的数额较大标准，该数额认定无争议。",
    prompt:
      "分别判断两段应适用破坏广播电视设施罪还是故意毁坏财物罪，并联系设施状态和影响说明理由。第一段只中断20分钟且无人伤亡，是否因此排除专门设施犯罪？不要求量刑。",
    hint: "",
    answer: "",
    reference:
      "第一段应按破坏广播电视设施罪的基本规定判断。岑岳针对正在使用、直接关系县级台节目播出的设施，造成设备无法使用、信号无法播出，符合2011年解释第1条第2项；不能把第3项县级传输网的12小时条件移到台内直接播出设施，也不以伤亡作为本项基本犯罪的前提。第二段设备从未投入使用，毁坏也没有影响现有播出或其他公共服务；按解释第6条，在故意毁财数额较大条件已经满足时，应认定故意毁坏财物罪。设备将来供电视台使用这一名称、用途，不足以把第二段也归入公共安全犯罪。题设区分的是从未使用与在用设施，不能泛化为暂时停用或备用设施均不受专门保护。",
    criteria: [
      {
        id: "broadcast-active-direct-output",
        label: "在用县级台直接播出设施受损，适用专门基本犯罪",
        meaning:
          "联系第一段设备正在使用、直接服务县级台节目播出且受损导致信号无法播出，认定破坏广播电视设施罪；20分钟和无人伤亡不排除这一基本犯罪。",
        acceptable:
          "‘县台正靠它播节目，毁坏后确实播不出了，这已落入专门规定，不必等到死人或停满12小时’可表达完整含义；不要求背条号、固定罪名全称或另抄技术鉴定。",
        boundary:
          "只给罪名而无事实联系为部分；已经联系在用县台直接播出设备与停播，并正确适用专门罪名，不因未另重复20分钟或无伤亡漏答。明确说必须停满12小时或必须伤亡才构成，与本项相反。只复述设施事实但不作判断，不补成完整；明确犹豫保留不确定。第二段的错误不抹去本项正确分析。",
      },
      {
        id: "broadcast-never-used-property",
        label: "从未投入使用且不影响公共服务，按已满足条件的毁财判断",
        meaning:
          "联系第二段设备从未投入使用、未影响现有播出及公共服务，结合题设已经满足毁财数额条件，认定故意毁坏财物罪，不因归电视台所有即认定专门公共安全犯罪。",
        acceptable:
          "‘仓库这台从来没用过，也没影响正在播的节目，损失又已达到入罪标准，所以是故意毁财’即可；可以引用同一答文已写的事实，无须重复数额结论或背条号。",
        boundary:
          "只给毁财罪名但不联系使用状态或影响为部分；明确说只要是电视台的设备就定专门罪名，或认为没播过所以毁财也不犯罪，与本项相反。遗漏或犹豫如实保留，不代补结论；不考临时停用、已运行备用设施或具体数额计算。第一段错误不影响本项独立判断。",
      },
    ],
    sources: ["broadcast-telecom-code", "broadcast-2011"],
  },
  {
    id: "safety-telecom-public-scope-candidate",
    caseId: "CL14-TELECOM-COMPARE-2",
    relatedTopicIds: ["safety-broadcast-telecom"],
    kind: "subjective",
    title: "公众通信与封闭内部联络",
    facts:
      "以下是另外两段互不关联的教学虚构。两名行为人均成年，具备刑事责任能力；本题不考责任年龄、能力或其他犯罪的竞合。\n\n第一段：贺原明知某设施正在为周边公众提供通信服务，仍为使该片区无法通信而故意毁坏。技术核查确认该设施属于正在使用的公用电信设施，造成2500名用户通信连续中断90分钟。设施属性、用户数、中断性质和时长均已按国家电信行业主管部门的规定确认。本案没有伤亡、没有贻误救助，也没有全网网间通信阻断等其他严重后果。\n\n第二段：陆杉为泄愤毁坏某办公室内独立的联络设备。它只供该办公室15个工位之间内部通话，未接入公用电信网，不向公众提供服务，损坏不会影响任何外部用户或其他公共安全设施。查明只造成这套设备财产损失，损失已经达到故意毁坏财物罪的数额较大标准，该数额认定无争议。",
    prompt:
      "分别判断两段应适用破坏公用电信设施罪还是故意毁坏财物罪，并联系对象和影响说明理由。第一段没有伤亡，是否仍成立专门设施犯罪；仅按给出的用户数及时长，能否认定严重后果？不要求具体量刑。",
    hint: "",
    answer: "",
    reference:
      "本题数值判据仍待官方解释全文回核，暂不登记。候选判断：第一段是破坏公用电信设施罪的基本情形。设施正在向公众服务；2500名用户中断90分钟，对应2004年解释第1条第2项的2000以上不满10000用户中断1小时以上，不以伤亡为必要条件。该人数及时长不满足第2条第2项10000以上用户中断1小时以上的严重后果标准，且题设排除其他严重后果，不能仅凭停了90分钟就升级。第二段只是封闭内部联络设备，既不服务公众、未接入公用网，损坏也不影响外部或公共安全设施，不能仅因能通话就当作本题的公用电信设施；在毁财数额条件已满足时，按故意毁坏财物罪判断。本题不推论所有专用网均无公共危险，也不要求考生自行制定行业用户计数方法。",
    criteria: [
      {
        id: "telecom-public-basic",
        label: "公众通信中断达到基本条件，不以伤亡为前提",
        meaning:
          "联系在用公用电信设施及2500用户中断90分钟，判断成立破坏公用电信设施罪；不因没有伤亡排除。此数值判据待官方回核。",
        acceptable:
          "‘公众在用的通信设施被毁，2500户断了一个半小时，达到入罪条件，没伤亡也构罪’即可；无须背条号或逐字列出区间。",
        boundary:
          "只给罪名而没有事实联系为部分；已联系2500用户90分钟中断并得出构成专门犯罪，不因未另重复无伤亡漏答。明确以无人伤亡排除本罪，与本项相反；应保留其中正确的设施与中断分析，不能说学生全未理解。严重后果判断另列一项，不重复扣；犹豫保留不确定，不要求用户乘小时计算或添加未给定事实。第二段错误独立处理。",
      },
      {
        id: "telecom-no-aggravated-result",
        label: "给定人数及时长未达到严重后果，不能仅凭停了90分钟升级",
        meaning:
          "说明2500用户中断90分钟不符合10000以上用户中断1小时以上的严重后果条件，题设亦无其他严重后果，不能按严重后果处理。此数值判据待官方回核。",
        acceptable:
          "‘人数还不到严重后果那一档，其他加重结果也没有，所以不能升级’即可；可承接同一答文已有的2500用户90分钟分析，无须重复。",
        boundary:
          "只说不严重但不说明人数、时长或条件关系为部分；只认定本罪而未回答严重后果，不能代补本项。明确说超过1小时即自动构成严重后果或把2500当成10000，与本项相反。明确犹豫保留不确定；前项否定基本犯罪不抹去本项正确的严重后果分析，也不能把前项错误重复用于本项。",
      },
      {
        id: "telecom-isolated-internal-property",
        label: "封闭内部联络损坏，不能仅凭能通话归入公用设施犯罪",
        meaning:
          "联系第二段只供固定工位内部联络、未接公用网且无外部或公共安全影响，认定不属于本案专门公共安全犯罪；题设已满足数额条件，应认定故意毁坏财物罪。",
        acceptable:
          "‘第二台只在办公室内部用，和公用网络、外部用户都无关，毁坏已达到数额标准，按故意毁财’可表达完整含义；不要求技术术语或背条号。",
        boundary:
          "只写毁财而无对象或影响分析，或者只排除公用电信犯罪但未回答应如何定性，为部分。明确因设备能通话就认定公用电信设施犯罪，或因用户少就说毁财也不构罪，与本项相反。缺答和不确定不补成正确；不概括所有单位专网、私人所有设施或小用户数均不危害公共安全。第一段数值错误不抹去本项分析。",
      },
    ],
    sources: ["broadcast-telecom-code", "telecom-2004-provisional"],
  },
];

export const broadcastTelecomCandidateTrace = [
  {
    criterionId: "broadcast-active-direct-output",
    promptPart: "第一段只中断20分钟且无人伤亡，是否因此排除专门设施犯罪？",
    givenFact: "在用县级台直接播出设施被毁，无法使用、信号20分钟不能播出。",
    sourceId: "broadcast-2011",
    provisions: ["第1条第2项（区别第3项）"],
  },
  {
    criterionId: "broadcast-never-used-property",
    promptPart: "分别判断两段应适用破坏广播电视设施罪还是故意毁坏财物罪",
    givenFact: "另台新购设备从未投入使用、不影响现有播出，毁财数额条件已满足。",
    sourceId: "broadcast-2011",
    provisions: ["第6条"],
  },
  {
    criterionId: "telecom-public-basic",
    promptPart: "第一段没有伤亡，是否仍成立专门设施犯罪",
    givenFact: "在用公用电信设施被毁，2500用户中断90分钟，无其他严重后果。",
    sourceId: "telecom-2004-provisional",
    provisions: ["第1条第2项", "第5条"],
  },
  {
    criterionId: "telecom-no-aggravated-result",
    promptPart: "仅按给出的用户数及时长，能否认定严重后果？",
    givenFact: "2500用户中断90分钟，人数不到10000，题设排除其他严重后果。",
    sourceId: "telecom-2004-provisional",
    provisions: ["第2条第2项"],
  },
  {
    criterionId: "telecom-isolated-internal-property",
    promptPart: "分别判断两段应适用破坏公用电信设施罪还是故意毁坏财物罪",
    givenFact:
      "15工位封闭内部联络、不接公用网、无外部公共安全影响，毁财数额已满足。",
    sourceId: "broadcast-telecom-code",
    provisions: ["刑法第124条第1款", "刑法第275条"],
  },
] as const;

// One substantive knowledge card, separately counted from the two questions.
export const broadcastTelecomCandidateTopic: FaultTopic = {
  id: "safety-broadcast-telecom",
  title: "广播电视、公用电信设施的对象与公共危险",
  headline: "先辨设施用途、使用状态与实际影响",
  goal: "结合设施对象和公共影响，区分第124条基本犯罪、严重后果及一般毁财。",
  prerequisite: "已理解故意、公共安全与故意毁坏财物的基本区别。",
  minutes: "8–12",
  paragraphs: [
    "广播电视与公用电信设施有第124条专门规定，不能直接套用电力、燃气设备的条款。判断对象、实际使用状态和公共影响；设备归谁所有、是否昂贵或是否已伤人，都不能单独决定罪名。",
    "广播电视解释区分台内直接播出设施与传输网。县级、地市级台直接播出设施遭破坏，无法使用且信号无法播出，是基本规定的一项；县级传输网的12小时时长条件不能移用。未投入使用且不影响公共安全的设备，达到毁财数额或情节条件时按毁财判断。",
    "公用电信的基本公共危险与严重后果须分开。设施性质、用户数和中断时长依行业规定确认，不能只看设备能否通话；具体数值规则的官方全文回核尚未完成，本卡及配套题仍是候选。封闭内部联络设备应结合是否服务公众、接入公用网或影响公共安全设施判断，不从私人所有或用户少直接排除。",
  ],
  example: {
    title: "同为电视台财物，状态与作用不同",
    facts:
      "一台正在承担县台节目播出的设备，与一台独立封存、从未安装的新购设备，受到的保护判断不完全相同。",
    analysis:
      "前者应看在用播出功能受破坏造成的公共影响；后者没有投入使用且不影响现有播出时，另审查毁财条件。这个比较不适用于一概排除运行系统的备用设备。",
  },
  pitfall:
    "把县级传输网时长搬到台内直接播出设施；把没有伤亡等同于没有公共危险；把所有能通信的设备都当作公用电信设施。",
  recall: {
    prompt:
      "为何没有伤亡也可能成立专门设施犯罪，而毁坏某台通信设备又可能只按毁财判断？",
    reference:
      "第124条基本犯罪看特定对象及公共危险，伤亡不是所有入罪路径的前提；仍须辨清使用状态、公共服务功能与实际影响，未满足专门犯罪条件时另审查毁财的数额或情节。",
  },
  sources: [
    "broadcast-telecom-code",
    "broadcast-2011",
    "telecom-2004-provisional",
  ],
  exercises: broadcastTelecomCandidateQuestions,
};

export function broadcastTelecomCandidatePromptMaterial(id: string) {
  const question = broadcastTelecomCandidateQuestions.find((q) => q.id === id);
  if (!question) return undefined;
  const { caseId, relatedTopicIds, kind, title, facts, prompt } = question;
  return {
    id,
    revision: broadcastTelecomCandidateRevision,
    caseId,
    relatedTopicIds,
    kind,
    title,
    facts,
    prompt,
  };
}
