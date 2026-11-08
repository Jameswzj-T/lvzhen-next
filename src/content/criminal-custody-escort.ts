import type { ContentSources, FaultTopic } from "./fault-unit";
import { choice, written } from "./criminal-package-one/authoring";
import { capstoneKnowledge } from "./criminal-capstone/knowledge";
import { capstoneSources } from "./criminal-capstone/sources";

export const custodyEscortRevision = "criminal-custody-escort-2026-10-03.v1";
export const custodyEscortTopicId = "custody-escape";
export const custodyEscortCaseId = "cl17-custody-escort-seizure";
export const custodyEscortSourceReview = {
  checkedAt: "2026-10-03",
  scope: "criminal-code-316-paragraph-2",
  sourceStatus: "official-text-read",
  contentStatus: "authored-candidate-one-case-two-questions",
  professionalReview: "not-established",
} as const;

export const custodyEscortSources: ContentSources = {
  ...capstoneSources,
  custodyEscortLaw: {
    title: "《中华人民共和国刑法》第三百一十六条两款",
    url: "https://tianjin.chinatax.gov.cn/11200000000/0300/030004/03000418/20240920152615743.shtml",
    note: "2026-10-03直接定向读取天津税务局收录至修正案（十二）的正文L935–936。第1款自行脱逃与第2款劫夺押解途中的法定人员分别规定；第2款情节严重对应较重刑档。本包一个完整自编案、两个不同小问，不冒称两个独立案例，不编严重情节数值门槛，不评最终罪责或刑期。旧capstone来源记录仅保留，不把本次定向阅读称全法年度核验或官方评分。",
  },
};

const facts =
  "成年甲明知乙因涉嫌犯罪被依法刑事拘留，正在由公安人员依法押解从医院返回看守所。为使乙摆脱押解，甲在途中强行拦住押解车辆，将押解人员推开并按住，使其无法继续控制乙；甲解开乙的约束并强行将其带走，押解控制已经失去，乙逃离。甲没有监管身份或释放权限。乙涉嫌的原案尚未判决。本题不展开伤势及其他加重情节资料，仅分析甲的上述劫夺押解行为，不要求讨论乙或其他附随罪名。";

export const custodyEscortCases = [
  choice(
    "cl17-custody-escort-seizure-path",
    custodyEscortTopicId,
    "外人强行劫夺正在押解的嫌疑人",
    facts,
    "只评价甲的劫夺行为，依据刑法第三百一十六条，哪项判断最恰当？",
    [
      [
        "原案未判，乙不能成为第2款劫夺行为的法定对象。",
        "第2款明确列犯罪嫌疑人，不以先有罪判决为对象前提。",
      ],
      [
        "应结合甲强行劫夺依法押解的犯罪嫌疑人这一行为，依第2款路径审查。",
        "甲是从押解控制中强行夺走乙的外部行为人；对象和押解途中条件均有题设依据。",
      ],
      [
        "甲没有监管职务，因此不可能适用第2款。",
        "第2款没有要求劫夺者具备监管职务，不能把有关职务犯罪的特殊身份条件移用。",
      ],
      [
        "押解车辆不在监狱内部，因此只能按普通自由活动处理。",
        "第2款针对押解途中，不能以不在监狱围墙内排除；须联系依法押解和强行夺走的事实。",
      ],
    ],
    "b",
    "选B。甲不是自己从关押中逃离的人，而是故意从依法押解控制中强行夺走乙的外部行为人，题设对应第316条第2款的劫夺路径。乙虽未有罪判决，但犯罪嫌疑人也是该款明文列举对象；押解途中也不等于必须在监狱内部。甲没有监管职务不能直接排除该款。本问只识别这一路径，不由此代替最终罪责或刑罚判断。",
    { sources: ["custodyEscortLaw"] },
  ),
  written(
    "cl17-custody-escort-seizure-basic-gate",
    custodyEscortTopicId,
    "基础路径与加重情节分开",
    facts,
    "有人说：“未先证明情节严重，就不能按第316条第2款审查甲的基本行为。”这一排除理由正确吗？结合该款结构和题设说明。本问不要求确定最终罪责或刑期。",
    "该理由不正确。第316条第2款前段对劫夺押解途中的罪犯、被告人、犯罪嫌疑人规定基本路径，后段的情节严重对应较重刑档；不能把后段的加重条件提前变成前段统一的成立门槛。甲明知乙正在被依法押解，仍以强制手段夺走乙、使其脱离押解控制，应结合这些事实按基本路径审查。是否达到情节严重及最终罪责、刑罚还须分别判断；本题没有展开加重资料，不等于已经证明情节不严重，也不能因此直接排除基本路径。",
    [
      [
        "条文结构",
        "该款前段规定劫夺押解途中法定人员的基本路径，后段的情节严重是较重刑档条件，不能一概变成基础成立门槛。",
        "接受意思相当的基本情形与加重情形区分，不要求背出刑期或条号，不编数值门槛。",
      ],
      [
        "题设应用与判断边界",
        "甲明知乙被依法押解仍强行夺走、使其脱离控制，不能仅以未先证明情节严重直接排除基本路径；加重程度须另审。",
        "接受综合说明甲的强行劫夺，不逐动作复述；已结合题设说明基本路径适用时，未单列加重程度待核提示不单独作漏答，不要求固定“须另审”措辞。不把资料未展开改成已证实不严重。最终定罪、刑期、乙的责任及附随罪名均非本问必答。",
      ],
    ],
    { sources: ["custodyEscortLaw"] },
  ),
].map((item) => ({
  ...item,
  exercise: { ...item.exercise, caseId: custodyEscortCaseId },
}));

const addition =
  "第316条第1款规定依法被关押的法定人员自行脱逃；第2款针对劫夺押解途中的罪犯、被告人或犯罪嫌疑人。外人故意强行夺走正在被依法押解的人，不能只因自己没有监管职务或对象尚未判刑就排除第2款。";
const severity =
  "第2款的情节严重对应较重刑档，不能把加重条件改成基础路径的统一门槛。基础行为、加重情节及最终罪责分别判断；未给足加重资料不等于已证明不严重，也不凭一次动作或数字自动判档。";

export const custodyEscortKnowledge = {
  [custodyEscortTopicId]: {
    rule: capstoneKnowledge[custodyEscortTopicId].rule + addition + severity,
    omission:
      capstoneKnowledge[custodyEscortTopicId].omission +
      "自行脱逃与外人劫夺押解分开；第2款基础路径不能先被情节严重这一加重条件挡住。",
  },
};

// Expand a copy; the original capstone topic/snapshot remains unchanged.
export function expandCustodyEscortKnowledge(topic: FaultTopic): FaultTopic {
  if (topic.id !== custodyEscortTopicId) return topic;
  return {
    ...topic,
    goal: "区分自行脱逃与外人劫夺押解，分别判断基础路径与加重情节。",
    paragraphs: [...topic.paragraphs, addition, severity],
    pitfall: custodyEscortKnowledge[custodyEscortTopicId].omission,
    recall: {
      prompt:
        topic.recall.prompt +
        "外人劫夺押解与自行脱逃如何区分？第2款情节严重是基础路径的统一门槛吗？",
      reference: topic.recall.reference + addition + severity,
    },
    sources: [...new Set([...topic.sources, "custodyEscortLaw"])],
  };
}
