import type { ContentSources, FaultTopic } from "./fault-unit";
import { choice, written } from "./criminal-package-one/authoring";

export const witnessRetaliationRevision =
  "criminal-witness-retaliation-2026-10-03.v1";
export const witnessRetaliationTopicId = "justice-witness-retaliation";
export const witnessRetaliationCaseId =
  "cl17-witness-retaliation-after-testimony";
export const witnessRetaliationSourceReview = {
  checkedAt: "2026-10-03",
  scope: "criminal-code-308-and-307-paragraph-1-comparison",
  sourceStatus: "official-text-read",
  contentStatus: "authored-candidate-one-case-two-questions",
  professionalReview: "not-established",
} as const;

export const witnessRetaliationSources: ContentSources = {
  witnessRetaliationLaw: {
    title: "《中华人民共和国刑法》第308条及第307条第1款对照",
    url: "https://tianjin.chinatax.gov.cn/11200000000/0300/030004/03000418/20240920152615743.shtml",
    note: "2026-10-03直接定向读取天津税务局收录至修正案（十二）的正文L912与L905。第308条对证人打击报复与第307条第1款阻止作证、指使作伪证分别规定。本包一个完整自编案、两个不同小问；不编严重情节数值，不判断最终罪责、刑期或附随罪数，不冒称全年全法效力核验或官方评阅。",
  },
};

const facts =
  "乙在丙的刑事案件中，就自己亲眼见到的经过依法出庭作证。成年甲是丙的朋友，看过记载乙作证情况的庭审记录，得知该证言对丙不利后，给丙发消息说‘他作证让你吃亏，我要教训他’。次日，甲在乙回家途中守候，拦住乙，提起此前作证的事，接连殴打乙并砸坏乙随身手机。现场录像、甲的消息和同行者的陈述记录了上述经过。甲不是司法工作人员，没有让乙改口、不到庭或不再作证的要求，现有资料也没有其他阻止作证的安排，双方没有私人债务或其他纠纷。本题不展开伤情、财损数额及其他加重资料，只分析甲上述行为的司法秩序犯罪审查路径，不要求确定最终罪责、刑期或附随罪数。";

export const witnessRetaliationCases = [
  choice(
    "cl17-witness-retaliation-path",
    witnessRetaliationTopicId,
    "法庭外攻击此前作证的人",
    facts,
    "只识别甲上述行为的司法秩序犯罪审查路径，哪项判断最恰当？",
    [
      [
        "甲不是司法工作人员，所以不能适用第308条。",
        "第308条没有要求行为人具备司法工作人员身份，不能移用特殊主体条件。",
      ],
      [
        "应结合乙的证人身份、甲消息所示的作证联系与实际攻击行为，按第308条的打击报复证人路径审查。",
        "甲得知不利证言后发出消息，又守候、提及作证并施加侵害，支持本题对因作证而实施报复的路径识别。",
      ],
      [
        "行为发生在法庭外，所以第308条一概不能适用。",
        "第308条不以报复必须发生在法庭内为条件，不能将其他法庭秩序规则的场所要求移用。",
      ],
      [
        "未先证明情节严重，就不能按第308条审查基本行为。",
        "第308条前段规定基本情形，情节严重对应后段较重刑档；未知加重资料不能直接排除基本路径，也不等于已证明不严重。",
      ],
    ],
    "b",
    "选B。乙依法作证，甲明知该身份和证言内容，消息、守候、当面提及作证及实际殴打毁物相互联系，显示攻击是针对乙此前作证，不能仅凭乙是证人的标签替代这层联系。题设应按第308条打击报复证人的路径审查；甲无司法职务、行为在法庭外均不能直接排除。第308条的情节严重对应较重刑档，不是所有基本行为审查的统一前提。本问只识别路径，不由此判断是否严重、最终罪责或刑期，也不排除另行判断相关侵害责任。",
    { sources: ["witnessRetaliationLaw"] },
  ),
  written(
    "cl17-witness-retaliation-no-interference",
    witnessRetaliationTopicId,
    "没要求改口，就能排除报复证人吗",
    facts,
    "甲说：“我没有让乙改口，也没有阻止他出庭，所以不能按第308条审查我。”这一排除理由能否成立？结合第308条与第307条第1款的分工及题设说明。本问不要求最终定罪、严重程度或刑期。",
    "这一理由不能成立。第307条第1款针对阻止证人作证或指使作伪证等行为，第308条针对对证人打击报复；不能把阻止作证或指使改证变成第308条的必要条件。乙已依法作证，甲知道该情况；他得知证言对丙不利后发消息要教训乙，再守候、提及作证并实施殴打毁物，事实支持攻击与作证相联系的报复路径。甲没有要求改口或阻止出庭，不能据此排除第308条的审查。这里只回应该排除理由，不能仅因受害者是证人就把一切冲突归为报复证人，也不需要确定严重程度、最终罪责、刑期或附随罪数。",
    [
      [
        "两条的行为分工",
        "第308条针对对证人打击报复，阻止作证或指使作伪证不是适用本条的必要条件；不能据此排除报复证人路径。",
        "接受报复既有作证与干预作证的等义区分，不要求逐字复述两条、背出条号或列出第307条全部手段；无需另造一句独立定罪结论。",
      ],
      [
        "作证联系与实际行为",
        "甲知道乙已经作证，得知不利证言后的消息与守候、提及作证、殴打毁物相互联系，支持因作证而攻击乙的报复路径；未要求改口或阻止出庭不能直接排除。",
        "接受综合说明甲针对乙作证实施实际侵害，不逐动作、逐引文复述，不要求同时列殴打和毁物两项。只写乙是证人而不说明攻击与作证的联系不足；不把未展开的加重资料判成不严重。严重程度、最终罪责、刑期及附随罪数均非本问必答。",
      ],
    ],
    { sources: ["witnessRetaliationLaw"] },
  ),
].map((item) => ({
  ...item,
  exercise: { ...item.exercise, caseId: witnessRetaliationCaseId },
}));

const rule =
  "第308条规定对证人打击报复的行为。结合证人身份、行为人明知与因作证而施加侵害的事实判断，不能仅由受害人是证人就将所有冲突归入本条。它不以行为人具有司法职务或报复发生在法庭内为前提。";
const omission =
  "第307条第1款的阻止作证或指使作伪证，不能机械变成第308条报复证人的必要条件；结合报复与作证的联系，不仅凭身份标签。严重程度及附随责任另需依据，本节不编量化门槛。";

export const witnessRetaliationTopic: FaultTopic = {
  id: witnessRetaliationTopicId,
  title: "打击报复证人",
  headline: "攻击与此前作证有什么联系？",
  goal: "结合证人身份、作证联系及实际行为识别报复路径，与干预作证分开。",
  prerequisite: "先区分受害人身份、针对作证的行为和一般私人纠纷。",
  minutes: "4–6",
  paragraphs: [
    rule,
    "第307条第1款规定以暴力、威胁、贿买等方法阻止证人作证或指使作伪证，第308条规定对证人打击报复。没有改证、不到庭的要求，不是直接排除报复证人的理由；仅凭行为时间先后，也不能替代目的与实际行为的判断。",
    "第308条前段规定基本情形，后段情节严重对应较重刑档。没有充分加重资料时不判断是否严重，不能把资料未展开说成已证明不严重，也不把严重条件移作基本路径的统一门槛。本节不确定最终罪责、刑罚和复杂罪数。",
  ],
  example: {
    title: "同一案中的消息与实际攻击",
    facts,
    analysis:
      "甲从作证不利的消息到守候并实际攻击的经过，支持因作证而施加侵害的联系。没有让乙改证或不到庭，不能直接排除第308条；乙的证人身份也不能单独替代这层联系。",
  },
  pitfall: omission,
  recall: {
    prompt: "第308条应结合哪些事实？没有要求改证或不到庭能否直接排除？",
    reference:
      "联系证人身份、行为人明知与因作证而实施侵害的事实。第308条报复证人与第307条第1款干预作证分别规定，没有改证或不到庭要求不能直接排除报复路径；仅有受害人身份也不足。",
  },
  sources: ["witnessRetaliationLaw"],
  exercises: witnessRetaliationCases.map(({ exercise }) => exercise),
};

export const witnessRetaliationKnowledge = {
  [witnessRetaliationTopicId]: { rule, omission },
};
