import type { ContentSources, UnitExercise } from "./fault-unit";
import type { ChapterCase } from "./criminal-package-one/authoring";
import { safetyTopics } from "./criminal-safety/knowledge";

export const educationFacilitiesRevision =
  "criminal-education-facilities-2026-10-16.v2" as const;
export const educationFacilitiesTopicId = "safety-facilities";
export const educationFacilitiesPreparation = {
  registeredInProduct: true,
  independentContentReviewApproved: true,
  fullCurrentValidityAuditCompleted: false,
  writtenQuestions: 1,
  knowledgeCards: 0,
  modelCallsAtPublicationFreeze: 0,
  reviewScope:
    "主控有界批准题设及四份原答，仅把原第三判据拆分为罪过、重大伤亡因果两项，并把等义表达改为误信这次也不会出事；五项分别判断，不增加数字总分，不改变题干、设问、参考或原答。旧四项候选和先验保留。",
} as const;
export const educationFacilitiesSources: ContentSources = {
  "education-facilities-code-138-139": {
    title: "《中华人民共和国刑法》第138、139条",
    url: "https://tianjin.chinatax.gov.cn/11200000000/0300/030004/03000418/20240920152615743.shtml",
    note: "2026-10-16直接读取天津税务机关所载修正案（十二）全文，页面标注全文有效；另与国家税务总局政策法规库同条核对一致。第138条明定直接责任人员、明知危险、不采取措施或者不及时报告、重大伤亡及致使关系；没有第139条的消防整改通知前提。将书面分工、处置能力与本案责任对应，以及报告未替代尚可履行的停用措施，均是本题适用推论，不是官方案例或逐字法条。未完成所有后续修改及2027年度范围审计。",
  },
  "education-facilities-code-14-15": {
    title: "《中华人民共和国刑法》第14、15条及第138条对照",
    url: "https://fgk.chinatax.gov.cn/zcfgk/c100009/c5212248/content.html",
    note: "2026-10-16读取国家税务总局政策法规库正文，并与天津税务同页第14、15条对照。知道设施危险与对伤亡结果的罪过须区分；结合风险警告及错误依赖另一处裂缝的事实，判断本案为过于自信的过失，属于教学适用推论。第138条正文未直接列出过失子类型，不将该推论冒称条文原话，不声称已作全量后续效力清理。",
  },
};
export const educationFacilitiesPublicBasis = [
  {
    sourceId: "education-facilities-code-138-139",
    provisions: ["第138条"],
    expressRule:
      "直接责任人员明知校舍或教育教学设施有危险，不采取措施或者不及时报告，致使发生重大伤亡事故，是本条所规定的责任结构。",
    application:
      "本题以实际安全管理及紧急停用分工认定林某的直接职责；他已经及时报告，但仍有独立停用权和现场处置条件，报告并未完成其尚可履行的措施义务。不能推广为所有教师都负责，也不能概括为任何报告者都必须采取相同措施。",
  },
  {
    sourceId: "education-facilities-code-14-15",
    provisions: ["第14条", "第15条", "第138条"],
    expressRule:
      "总则区分希望或放任危害结果与已经预见却轻信能够避免；第138条要求不作为致使重大伤亡事故发生。",
    application:
      "林某把另一教室没有立即坠落的经历当成本次暂时安全的依据，对已经预见的伤人风险作出没有充分根据的乐观判断；本案按过失评价。重大伤亡、危险实现及及时停用能够避免伤亡均已给定，不另造人数门槛。",
  },
  {
    sourceId: "education-facilities-code-138-139",
    provisions: ["第138条", "第139条"],
    expressRule:
      "第139条有经消防监督机构通知采取改正措施而拒绝执行的条件；第138条没有该项前置条件。",
    application:
      "未收到消防整改通知不排除本题教育设施事故责任；不能从邻近消防题移植通知要求。",
  },
] as const;
export const educationFacilitiesQuestions: UnitExercise[] = [
  {
    id: "safety-education-facilities-report-v2",
    caseId: "CL14-EDUCATION-FACILITIES-1",
    relatedTopicIds: ["safety-facilities", "omission-duty", "negligence"],
    kind: "subjective",
    title: "已经报告的礼堂险情",
    facts:
      "本案为教学虚构。林某在中学任语文教师，另按学校书面分工负责礼堂的日常安全管理；遇到紧急危险，他有权立即停用礼堂、封闭入口、转移上课地点，并应及时向校长报告。某日课前，他收到专业检查人员的书面报告及现场照片，明确告知礼堂顶棚构件已经松脱，继续使用可能坠落伤人，应立即停用。林某看完材料，随即把完整情况报告给校长，校长已收到但尚未回复。林某想起另一间教室此前出现裂缝却没有立即掉落，便认为礼堂也能撑过这节课，对同事说：先上完这一节，不会正好掉下来伤人。他未核实两处情形是否相同，也未安排任何防护；当时有空教室和足够时间转移，他仍让学生进入礼堂上课。随后顶棚构件坠落，造成人员重大伤亡。调查确认，该松脱危险导致此次伤亡，若及时停用并转移学生即可避免。事故已达到法定重大伤亡程度，是本题已知前提。此前没有消防监督机构要求整改的通知。",
    prompt:
      "林某是否构成教育设施重大安全事故罪？请按本罪的构成条件完整分析其实际职责、对危险及伤亡的认识、处置行为和事故因果，并说明已经报告、未收到消防整改通知能否排除其责任。不讨论量刑或他人责任。",
    hint: "",
    answer: "",
    reference:
      "林某可以构成教育设施重大安全事故罪。他的直接责任来自礼堂安全管理和紧急停用的实际分工，不是教师职称本身；既不能仅因不是校长就排除，也不能据此认定所有教师均负责。林某读到明确的松脱及伤人警告，已经知道礼堂存在危险。他虽及时完整报告，但仍有权且有条件停用、封闭并转移学生，不能以等待回复代替自己能够履行的措施义务；这里不把报告本身认作未报告。林某已经预见伤人风险，却仅依赖另一教室未立即掉落的经历相信这次也不会出事，体现过于自信的过失，不能由明知设施危险直接推成希望或放任伤亡。题设已确认达到重大伤亡程度，该危险确实造成伤亡，且及时停用转移可以避免，满足本案的结果和因果要求，无须另设人数门槛。第138条没有先收到消防整改通知的条件；第139条的通知要求不能移用于本题，因此未收到该通知不排除上述责任。",
    criteria: [
      {
        id: "education-facilities-actual-duty",
        label: "以实际职责认定直接责任人员",
        meaning:
          "联系林某实际承担礼堂安全管理和紧急停用职责，认定其属于本案直接责任人员；教师职称既不自动排除主体资格，也不使所有教师当然负责。",
        acceptable:
          "‘看的是他具体管什么、能决定什么；礼堂安全和紧急停用由他负责，所以他要承担直接责任’即可，不要求复述全部分工或固定职务名称。",
        boundary:
          "只写直接责任人员而无本案职责联系为部分。明确只看教师职称认定全体教师负责，或仅因不是校长就否认主体资格，与本项相反；其余正确事实分析仍须保留，不能据本项错误自动改判其他项。未写与明确拿不准分别按遗漏、未决处理。",
      },
      {
        id: "education-facilities-known-danger-no-measures",
        label: "明知危险，及时报告仍未完成具体措施义务",
        meaning:
          "联系专业报告和照片确认林某明知礼堂危险；他虽及时完整报告，仍有独立停用权及转移条件而未采取措施，报告不当然排除这项具体责任。",
        acceptable:
          "‘他已看过松脱会伤人的警告，报给校长也不等于做完自己能做的事；能马上停用转移却仍让学生进去’即可。",
        boundary:
          "不得把题设的及时完整报告说成未报告或迟报。只写知道危险未处理但未回应报告辩解，或只说报告不免责而不联系本案停用能力，均为部分；认为报告后可一概继续使用、或者否认已知危险，与本项相反。不要求所有报告者都承担相同措施义务；未表达与明确保留判断分开。",
      },
      {
        id: "education-facilities-foreseen-unfounded-confidence",
        label: "预见伤亡但轻信避免",
        meaning:
          "说明林某已预见伤人风险，却无充分根据地依赖另一教室的经历相信能够避免，属于过于自信的过失。",
        acceptable:
          "‘他不是没想到会伤人，而是凭别处没掉落的经历，误信这次也不会出事，判断过分乐观’即可，不要求过失子类型的固定术语。",
        boundary:
          "只写过失而未联系已预见和错误依赖的心理事实为部分。明确把已预见说成完全未预见，或仅由知险推成放任伤亡，与本项相反，仍保留其正确部分。明确拿不准罪过而暂缓判断为未决，不能借重大伤亡及因果已答对而代补；本项未决或错误不改变其他项已有的正确分析。",
      },
      {
        id: "education-facilities-serious-result-causation",
        label: "重大伤亡及因果、避免可能性",
        meaning:
          "说明本题法定重大伤亡已经发生，该松脱危险确实造成伤亡，且及时停用礼堂并转移学生可以避免伤亡。",
        acceptable:
          "‘这次正是松脱造成重大伤亡，及时停用转移本可避免’即可，不要求人数门槛、刑期或重复证明已查明的事实。",
        boundary:
          "只写重大伤亡而未联系该危险致害及措施能够避免，缺少必要部分时为部分。明确否认题设已确认的重大伤亡、因果或避免可能性，与本项相反，仍保留正确部分。罪过拿不准或判断错误不自动连带本项；已经正确表达的结果与因果须独立保留。未表达与明确保留判断分别按遗漏、未决处理，不另外增加人数要求。",
      },
      {
        id: "education-facilities-no-fire-notice-gate",
        label: "不移植消防整改通知前提",
        meaning:
          "说明教育设施重大安全事故罪不以消防监督机构先通知整改为条件，未收到该通知不排除本案责任；不得套用消防责任事故罪的前置条件。",
        acceptable:
          "‘这里是教育设施事故，不能套消防整改通知的门槛，没通知也不妨碍依本案条件追究’即可，不要求背出条号。",
        boundary:
          "明确以没有消防整改通知否认本罪，与本项相反；只泛称应负责、没有回应通知问题为遗漏，写出无需通知但混淆罪名条件为部分。此项不重复扣因其他判据错误产生的整体结论；明确保留通知问题的判断为未决。",
      },
    ],
    sources: [
      "education-facilities-code-138-139",
      "education-facilities-code-14-15",
    ],
  },
];
export const educationFacilitiesTrace = [
  {
    criterionId: "education-facilities-actual-duty",
    promptPart: "实际职责",
    givenFact: "按学校书面分工负责礼堂的日常安全管理",
    sourceIds: ["education-facilities-code-138-139"],
    provisions: ["第138条"],
  },
  {
    criterionId: "education-facilities-known-danger-no-measures",
    promptPart: "处置行为",
    givenFact: "当时有空教室和足够时间转移",
    sourceIds: ["education-facilities-code-138-139"],
    provisions: ["第138条"],
  },
  {
    criterionId: "education-facilities-foreseen-unfounded-confidence",
    promptPart: "对危险及伤亡的认识",
    givenFact: "便认为礼堂也能撑过这节课",
    sourceIds: [
      "education-facilities-code-14-15",
      "education-facilities-code-138-139",
    ],
    provisions: ["第14条", "第15条", "第138条"],
  },
  {
    criterionId: "education-facilities-serious-result-causation",
    promptPart: "事故因果",
    givenFact: "若及时停用并转移学生即可避免",
    sourceIds: ["education-facilities-code-138-139"],
    provisions: ["第138条"],
  },
  {
    criterionId: "education-facilities-no-fire-notice-gate",
    promptPart: "未收到消防整改通知",
    givenFact: "此前没有消防监督机构要求整改的通知",
    sourceIds: ["education-facilities-code-138-139"],
    provisions: ["第138条", "第139条"],
  },
] as const;
export const educationFacilitiesCases: ChapterCase[] =
  educationFacilitiesQuestions.map((exercise) => ({
    topicId: educationFacilitiesTopicId,
    exercise,
    review: false,
    exam: false,
  }));
const priorTopic = safetyTopics.find(
  (topic) => topic.id === educationFacilitiesTopicId,
)!;
export const educationFacilitiesContentPack = {
  revision: educationFacilitiesRevision,
  snapshot: {
    topics: [
      {
        ...priorTopic,
        sources: Object.keys(educationFacilitiesSources),
        exercises: educationFacilitiesQuestions,
      },
    ],
    sources: educationFacilitiesSources,
  },
};
