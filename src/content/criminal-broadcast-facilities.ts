import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";
import type { ChapterCase } from "./criminal-package-one/authoring";

// Broadcast-only publication. Preserve the combined candidate and telecom material.
export const broadcastFacilitiesRevision =
  "criminal-broadcast-facilities-2026-10-16.v1" as const;

export const broadcastFacilitiesPreparation = {
  status: "bounded-broadcast-content-review-approved",
  registeredInProduct: true,
  independentContentReviewApproved: true,
  reviewedAt: "2026-10-16",
  reviewScope:
    "主控核读最高法解释第1、6条，批准仅广播一题双情境与已核知识内容；四份广播先验保留，电信候选不发布。",
  fullCurrentValidityAuditCompleted: false,
  writtenQuestions: 1,
  independentFactualScenarios: 2,
  knowledgeCards: 1,
  objectiveQuestions: 0,
  modelCallsAtPublicationFreeze: 0,
} as const;

export const broadcastFacilitiesSources: ContentSources = {
  "broadcast-facilities-code": {
    title: "《刑法》第124、275条：广播电视设施公共安全与故意毁财",
    url: "https://tianjin.chinatax.gov.cn/11200000000/0300/030004/03000418/20240920152615743.shtml",
    note: "2026-10-16直接核读天津税务机关转载正文，页面收录至修正案（十二）并标注全文有效；第124条区分基本犯罪与严重后果，第275条规定毁财。未完成此后全部修改、清理及2027年度范围审计。",
  },
  "broadcast-facilities-2011": {
    title:
      "最高法《关于审理破坏广播电视设施等刑事案件具体应用法律若干问题的解释》",
    url: "https://www.court.gov.cn/fabu/xiangqing/2799.html",
    note: "2026-10-16直接核读最高法全文。法释〔2011〕13号，2011-05-23通过，2011-06-07公布，2011-06-13施行；页面2011-06-14刊载。第一条第二项是县级、地市级台直接播出设施，第三项另论传输网，不能混用时长；第六条处理未用或未危及公共安全的毁财，第八条要求参照行业规定确定设施范围。题设明确设施性质，不考技术鉴定。",
  },
};

export const broadcastFacilitiesPublicBasis = [
  {
    sourceId: "broadcast-facilities-code",
    provisions: ["刑法第124条第1款", "刑法第275条"],
    summary:
      "破坏广播电视设施须危害公共安全；严重后果是进一步判断。一般故意毁财另须数额或情节条件，不能由设备名称或没有伤亡直接决定罪名。",
    scope: "广播电视设施基本犯罪与一般毁财；不扩展其他专门设施或完整罪数。",
  },
  {
    sourceId: "broadcast-facilities-2011",
    provisions: ["第1条第2、3项", "第6条", "第8条"],
    summary:
      "县级或地市级台直接关系节目播出的在用设施受损、无法使用且信号无法播出，属于基本条款列举情形；县级传输网的时长条件不能移用于这一项。尚未投入使用的设施被故意毁坏并达到毁财数额或情节条件，按毁财处理。设施类别按行业规则确定。",
    scope:
      "区分县级、地市级台内直接播出设施与传输网；题设确认技术分类，不另考行业鉴定。",
  },
] as const;

export const broadcastFacilitiesQuestions: UnitExercise[] = [
  {
    id: "safety-broadcast-use-boundary-v1",
    caseId: "CL14-BROADCAST-COMPARE-1",
    relatedTopicIds: ["safety-broadcast-facilities"],
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
    sources: ["broadcast-facilities-code", "broadcast-facilities-2011"],
  },
];

export const broadcastFacilitiesTrace = [
  {
    criterionId: "broadcast-active-direct-output",
    promptPart: "第一段只中断20分钟且无人伤亡，是否因此排除专门设施犯罪？",
    givenFact: "在用县级台直接播出设施被毁，无法使用、信号20分钟不能播出。",
    sourceId: "broadcast-facilities-2011",
    provisions: ["第1条第2项（区别第3项）"],
  },
  {
    criterionId: "broadcast-never-used-property",
    promptPart: "分别判断两段应适用破坏广播电视设施罪还是故意毁坏财物罪",
    givenFact: "另台新购设备从未投入使用、不影响现有播出，毁财数额条件已满足。",
    sourceId: "broadcast-facilities-2011",
    provisions: ["第6条"],
  },
] as const;

export const broadcastFacilitiesTopic: FaultTopic = {
  id: "safety-broadcast-facilities",
  title: "广播电视设施的使用状态与公共危险",
  headline: "先辨播出设施、使用状态与实际影响",
  goal: "结合设施状态和播出影响，区分破坏广播电视设施罪与一般故意毁财。",
  prerequisite: "已理解故意、公共安全与故意毁坏财物的基本区别。",
  minutes: "6–8",
  paragraphs: [
    "广播电视设施有刑法第124条专门规定。判断设施对象、实际使用状态和公共影响；设备归谁所有、是否昂贵或是否已伤人，都不能单独决定罪名。",
    "县级、地市级广播电视台内直接关系节目播出的在用设施遭破坏，设备无法使用且信号无法播出，属于基本规定列举情形。解释另给县级传输网规定12小时时长条件，不能把这一条件移用到台内直接播出设施。",
    "故意毁坏从未投入使用、又未影响现有播出或其他公共服务的设备，达到毁财数额或情节条件时按故意毁财判断。暂时停用或已运行系统的备用设施，不能直接当作从未投入使用。",
  ],
  example: {
    title: "同为电视台财物，状态与作用不同",
    facts:
      "一台正在承担县台节目播出的设备，与一台独立封存、从未安装的新购设备，受到的保护判断不完全相同。",
    analysis:
      "前者应看在用播出功能受破坏造成的公共影响；后者没有投入使用且不影响现有播出时，另审查毁财条件。这个比较不适用于一概排除运行系统的备用设备。",
  },
  pitfall:
    "把县级传输网12小时门槛套到台内直接播出设施；把没有伤亡等同于没有公共危险；只看设备属于电视台而忽略从未启用和无播出影响。",
  recall: {
    prompt:
      "为什么县台直接播出设施停播20分钟也可能成立专门犯罪，而毁坏从未启用的电视台设备可能按毁财判断？",
    reference:
      "前者对应在用直接播出设施无法使用、信号无法播出的列举情形，不适用传输网12小时门槛，也不以伤亡为前提；后者从未投入使用且未影响公共服务，应另按已满足的毁财数额或情节条件判断。",
  },
  sources: ["broadcast-facilities-code", "broadcast-facilities-2011"],
  exercises: broadcastFacilitiesQuestions,
};

export const broadcastFacilitiesCases: ChapterCase[] =
  broadcastFacilitiesQuestions.map((exercise) => ({
    topicId: broadcastFacilitiesTopic.id,
    exercise,
    review: false,
    exam: false,
  }));
export const broadcastFacilitiesKnowledge = {
  [broadcastFacilitiesTopic.id]: {
    rule: broadcastFacilitiesTopic.paragraphs[1],
    omission: broadcastFacilitiesTopic.pitfall,
  },
};
export const broadcastFacilitiesContentPack = {
  revision: broadcastFacilitiesRevision,
  snapshot: {
    topics: [broadcastFacilitiesTopic],
    sources: broadcastFacilitiesSources,
  },
};
