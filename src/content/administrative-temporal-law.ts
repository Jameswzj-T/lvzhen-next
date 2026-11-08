import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";

export const administrativeTemporalLawRevision =
  "administrative-temporal-law-2026-10-14.v3";
const topicId = "admin-penalty-temporal-law";
const sourceId = "admin-temporal-article37";
const lawUrl =
  "https://scjgj.beijing.gov.cn/cxfw/flfgcxfw/qt/202203/t20220331_2645278.html";
export const administrativeTemporalLawSources: ContentSources = {
  [sourceId]: {
    title: "《行政处罚法》第37条：行为时规定与较轻、不再违法的新规定",
    url: lawUrl,
    note: "2026-10-13直接核北京市市场监督管理局公开的2021修订全文第37条，2021-07-15施行；并核市场监管总局转载的截至2026-08-28现行有效法律目录行政法第23项，仍列2021修订。本组只考单次已结束行为、首次决定尚未作出时的实体处罚规定选择。案例中的地方性法规条文、修订日期和金额均为独立教学假设，不冒充实际行业罚则；给定同一制定机关、无规范效力冲突、无特别过渡条款，不涉及连续行为、已作出决定后追溯变更、程序法或复杂综合轻重比较。题目与采分标准自编，非官方真题或阅卷细则。",
  },
};
const scope =
  "本题所列地方性法规条文、修订日期及罚款金额均为虚构教学条件，不是真实行业罚则。给定前后条文均由同一有权机关依法制定并公布，不存在效力层级冲突或特别过渡条款；本次行为当日即已结束，没有连续、继续状态。机关权限、调查事实和办理期限均无争议，此前未作出处罚决定，也无其他违法行为或处罚依据。只判断首次作出处罚决定时适用哪一版本的实体处罚规定，不讨论已生效决定的变更、程序法适用、民事责任或救济。";
export const administrativeTemporalLawCaseFacts = {
  "ADMIN-TEMPORAL-HEAVIER-1": [
    "本案为独立教学虚构。2026年4月8日，云槐公司完成了一次违反甲地方性法规的经营信息报送行为。当时有效的条文对题涉行为仅规定罚款3000元，没有其他处罚。修订后的同一条文于2026年7月1日起施行，对相同行为改为仅罚款6000元；违法构成、适用条件及其余影响本案轻重的规定均未改变。",
    "主管机关准备于2026年8月10日首次作出处罚决定。办理人员认为：‘作出决定时新条文已经生效，必须按最新标准罚6000元。’",
    scope,
  ].join("\n\n"),
  "ADMIN-TEMPORAL-LIGHTER-1": [
    "本案为另一独立教学虚构。2026年3月16日，沐杉公司完成了一次违反乙地方性法规的信息公示行为。当时有效的条文对题涉行为仅规定罚款5000元，没有其他处罚。主管机关于6月10日立案。修订后的同一条文于2026年7月1日起施行，对相同行为改为仅罚款2000元；违法构成、适用条件及其余影响本案轻重的规定均未改变。",
    "主管机关准备于2026年8月20日首次作出处罚决定。办理人员认为：‘立案时旧条文还有效，立案就锁定了处罚依据，所以仍应罚5000元。’",
    scope,
  ].join("\n\n"),
  "ADMIN-TEMPORAL-NO-VIOLATION-1": [
    "本案为第三个独立教学虚构。2026年5月11日，澄栖公司举办了一次展示活动，当日结束。行为时有效的丙地方性法规要求此类活动事先备案，并对未备案举办活动仅规定罚款3000元。澄栖公司当时未备案。",
    "修订后的该法规于2026年7月1日起施行，删除了此类活动的备案义务及对应罚款条款，也没有其他规定将本题这一未备案行为列为违法。主管机关准备于2026年8月25日首次作出处罚决定，办理人员提出：‘公司当时确实没备案，不能完全不罚；考虑条文改了，可以按旧罚款的一半罚1500元。’",
    scope,
  ].join("\n\n"),
};
const references = {
  heavier:
    "办理人员的理由不成立。实施行政处罚原则上适用违法行为发生时的规定，不能只因决定时有新条文就一律适用。本案行为在4月8日已经结束，新条文把唯一罚款从3000元提高到6000元，既非处罚较轻，也未取消违法认定，不符合有利新规定的例外；应适用行为时的旧规定，按题设罚3000元。",
  lighter:
    "应适用决定时已经施行的新规定，按题设罚2000元。相同违法构成和适用条件下，唯一罚款从5000元降为2000元，属于第37条规定的新规定处罚较轻；8月20日首次决定前该新规定已经施行，应适用有利新规定。6月10日立案不锁定旧实体处罚依据，不能据此继续罚5000元。",
  noViolation:
    "本次不能按旧规定罚1500元，也不是只能酌情减半。首次决定前，新规定已取消题涉备案义务和罚款，且没有其他违法依据，属于第37条规定的新规定不认为是违法的情形，应适用新规定。因此不得再针对本题这一行为给予行政处罚；不能只因行为时旧规定曾要求备案就保留一半罚款。",
};
const common = {
  relatedTopicIds: [topicId],
  sources: [sourceId],
  hint: "按时间整理行为、规定变化和拟作决定，再把本题给定的前后规则作比较。",
};
const heavier = {
  ...common,
  caseId: "ADMIN-TEMPORAL-HEAVIER-1",
  facts: administrativeTemporalLawCaseFacts["ADMIN-TEMPORAL-HEAVIER-1"],
};
const lighter = {
  ...common,
  caseId: "ADMIN-TEMPORAL-LIGHTER-1",
  facts: administrativeTemporalLawCaseFacts["ADMIN-TEMPORAL-LIGHTER-1"],
};
const noViolation = {
  ...common,
  caseId: "ADMIN-TEMPORAL-NO-VIOLATION-1",
  facts: administrativeTemporalLawCaseFacts["ADMIN-TEMPORAL-NO-VIOLATION-1"],
};

export const administrativeTemporalLawExercises: UnitExercise[] = [
  {
    ...heavier,
    id: "admin-temporal-heavier-choice-v3",
    kind: "objective",
    choiceMode: "single",
    title: "决定时罚款标准提高了",
    prompt: "按第37条和题设，如何选择本次实体处罚依据？",
    options: [
      {
        id: "a",
        text: "决定时新条文已生效，应罚6000元。",
        explanation: "不能只按决定日期套用较重的新处罚规定。",
      },
      {
        id: "b",
        text: "旧规定已被修订，本次已无任何处罚依据。",
        explanation: "有利新规定的例外不成立时，仍按行为时规定处理。",
      },
      {
        id: "c",
        text: "适用行为时旧规定，按题设罚3000元。",
        explanation: "新规定更重且仍认定违法，不符合第37条的有利适用例外。",
      },
      {
        id: "d",
        text: "在两版本之间折中，罚4500元。",
        explanation: "第37条规定规范选择，不能自行折中创造罚款金额。",
      },
    ],
    answer: "c",
    reference: "选C。" + references.heavier,
  },
  {
    ...heavier,
    id: "admin-temporal-heavier-explain-v3",
    kind: "subjective",
    title: "新条文生效，就必须按新标准罚吗？",
    prompt:
      "办理人员的理由是否成立？请说明实体处罚规定适用的一般起点，并比较本案前后条文，说明应按哪个规定处理。",
    answer: "",
    reference: references.heavier,
    criteria: [
      {
        id: "temporal-act-law-default",
        label: "以行为时规定作为一般起点",
        meaning:
          "说明本案以违法行为发生时的规定为一般起点，而非一律取作出决定时的最新条文；可以在新规加重故仍用旧规的结论中表达。",
        acceptable:
          "‘新规加重故用行为时旧规’可同时覆盖本项与后项，无须另外背诵一般规则、条号或复述行为月份。",
        boundary:
          "允许与后项一句合写；只给罚款数额而未说明时间适用理由不完整。不另考立法权限、处罚程序或追责时效。",
      },
      {
        id: "temporal-heavier-no-exception",
        label: "新规加重不适用有利例外",
        meaning:
          "联系唯一罚款由3000元提高到6000元且仍属违法，说明不符合处罚较轻或不认为违法的例外，本案应按行为时旧规定处理。",
        acceptable:
          "‘新标准更重，也没有把这事改成不违法，仍按原来的三千’足够；明确选择旧规定并说明新规更重即可，不强制重复两个数字。",
        boundary:
          "主张一律适用新规定、修订后当然无依据或折中金额均与本项相反。前项已表达的一般起点独立保留；不要求讨论已作出的处罚决定能否变更。",
      },
    ],
  },
  {
    ...lighter,
    id: "admin-temporal-lighter-choice-v3",
    kind: "objective",
    choiceMode: "single",
    title: "立案后，罚款条文变了",
    prompt: "本案应当怎样处理前后规定与立案时间的关系？",
    options: [
      {
        id: "a",
        text: "已经立案，必须沿用5000元。",
        explanation:
          "第37条例外以作出处罚决定时的有利新规定为条件，立案不冻结旧实体处罚标准。",
      },
      {
        id: "b",
        text: "决定前新规定已施行且处罚较轻，应按2000元处理。",
        explanation: "前后相同条件下唯一罚款降低，符合有利新规定的适用条件。",
      },
      {
        id: "c",
        text: "机关可自由选择5000元或2000元。",
        explanation: "条件已满足时适用新的规定，并非由机关任意选择版本。",
      },
      {
        id: "d",
        text: "新规定降低罚款，就不再构成任何违法。",
        explanation: "本案仍将该行为规定为违法，只是处罚降低。",
      },
    ],
    answer: "b",
    reference: "选B。" + references.lighter,
  },
  {
    ...lighter,
    id: "admin-temporal-lighter-explain-v3",
    kind: "subjective",
    title: "立案能锁定旧处罚标准吗？",
    prompt:
      "请比较本案前后条文，说明属于哪种时间适用情形。办理人员能否因已在6月立案而仍罚5000元？请结合拟作决定的时间说明。",
    answer: "",
    reference: references.lighter,
    criteria: [
      {
        id: "temporal-lighter-comparison",
        label: "比较相同条件下的新旧处罚",
        meaning:
          "联系违法构成及其余条件未变、唯一罚款由5000元降为2000元，识别新规定处罚较轻，而非不再违法。",
        acceptable:
          "‘决定前生效的新规更轻，所以用新规’可与后项一句覆盖；不强制复述两个金额或全部比较条件。",
        boundary:
          "只写新规生效而未识别较轻不完整；不能因罚款降低就说行为不再违法。本项比较结论与后项适用判断分别核对。",
      },
      {
        id: "temporal-decision-not-filing",
        label: "决定前的有利新规不被立案锁住",
        meaning:
          "联系7月1日新规定施行、8月20日才首次作出处罚决定，说明应适用较轻的新规定，6月立案不能锁定旧依据或支持仍罚5000元。",
        acceptable:
          "‘决定前生效的新规更轻，所以用新规’已回应本案的时间关系；不强求另写反驳立案的句子或重抄日期。",
        boundary:
          "仅列从旧兼从轻口号而未作本案适用判断不完整；明确主张仍用旧规或任意二选一为相反判断。前项识别较轻的正确内容不能被一并抹去。",
      },
    ],
  },
  {
    ...noViolation,
    id: "admin-temporal-deleted-choice-v3",
    kind: "objective",
    choiceMode: "single",
    title: "决定前，备案义务已取消",
    prompt: "对拟罚1500元的处理，哪项判断符合第37条和题设？",
    options: [
      {
        id: "a",
        text: "违法发生在旧规有效期内，仍必须罚3000元。",
        explanation: "遗漏新规定已不认为违法时适用新规定的例外。",
      },
      {
        id: "b",
        text: "减半罚1500元，正好兼顾前后两个版本。",
        explanation: "不再认为违法时应适用新规定，不能保留一半旧罚款。",
      },
      {
        id: "c",
        text: "机关可以不罚，也可以继续罚款。",
        explanation: "本案不是仍然违法但可酌情不罚，不得任意保留旧处罚。",
      },
      {
        id: "d",
        text: "适用已不认为违法的新规定，本次不得再罚。",
        explanation:
          "新规定在首次决定前已施行且取消了题涉义务和处罚，又无其他违法依据。",
      },
    ],
    answer: "d",
    reference: "选D。" + references.noViolation,
  },
  {
    ...noViolation,
    id: "admin-temporal-deleted-explain-v3",
    kind: "subjective",
    title: "义务取消后，还能保留一半旧罚款吗？",
    prompt:
      "本案新规定的变化属于第37条的哪种情形？请说明本次应怎样处理，并回应办理人员保留一半旧罚款的理由。",
    answer: "",
    reference: references.noViolation,
    criteria: [
      {
        id: "temporal-no-longer-unlawful",
        label: "识别新规定不再认为违法",
        meaning:
          "联系首次决定前已取消题涉备案义务和对应处罚、也无其他违法依据，识别第37条中新规定不认为是违法的情形，而非仅降低罚款。",
        acceptable:
          "‘新规不再违法所以不能罚’可同时覆盖本项与后项；不强制复述备案义务、罚款条款及其他依据的全部题设。",
        boundary:
          "不要求新条文沿用某个固定句式；不能只把取消义务当作降低罚款，或把本案泛化为所有规范废止都当然不罚。",
      },
      {
        id: "temporal-no-residual-penalty",
        label: "不能保留部分旧罚款",
        meaning:
          "说明本次应适用新的规定，不得再针对题涉行为处罚；不能罚的结论已否定保留1500元或由机关任意决定是否罚款。",
        acceptable:
          "‘新规不再违法所以不能罚’完整满足，不另要求重复‘不能保留一半旧罚款’。",
        boundary:
          "孤立的‘可以免罚’可能表达不足，但不能据此推断仍可罚；上下文已明确无处罚依据或不得处罚时，不因口语尾句‘可以免罚’扣分。明确主张仍可罚、减半罚或任意选择才作相反判断。前项已识别的变化单独保留，不扩展到其他行为、民事责任或已作出的决定。",
      },
    ],
  },
];

export const administrativeTemporalLawTopics: FaultTopic[] = [
  {
    id: topicId,
    title: "行政处罚的新旧规定适用",
    headline: "先看行为时规定，再核决定前的有利变化",
    goal: "结合时间与规则变化，区分原则适用旧规定、新规处罚较轻和新规不再认为违法。",
    prerequisite: "能区分违法行为发生、立案与作出处罚决定三个时间。",
    minutes: "10–15",
    paragraphs: [
      "实施行政处罚，原则上适用违法行为发生时的法律、法规、规章。不能只因决定作出得晚，就一律套用最新的处罚条文。",
      "作出决定时，原规定已被修改或废止，且新规定处罚较轻或者不认为是违法的，适用新的规定。要对照本案真正适用的前后规则；立案时间不是锁定旧实体处罚依据的开关。",
      "新规加重且仍认为违法的，不能据此适用更重标准；只是降低处罚的，适用较轻新规定；已经不再认为违法的，不能再保留一部分旧罚款。这不是第29条同时违反多个罚款规范时的择高问题，也不是第33条仍属违法时可以不予处罚的裁量。",
      "本组只处理单次已结束行为、首次决定尚未作出的情况。实际案件仍需核实规范效力、特别过渡条款和具体轻重变化，不能把本组结论直接套到持续行为或已作出的决定上。",
    ],
    example: {
      title: "立案后罚款标准降低",
      facts: lighter.facts,
      analysis: references.lighter,
    },
    pitfall:
      "把决定日期或立案日期当成唯一标准，或在新规不再认为违法时仍保留部分罚款。",
    recall: {
      prompt: "新规定更重、较轻、不再认为违法时，本组分别怎样选？",
      reference:
        "以行为时规定为起点；决定前新规处罚较轻或不认为违法的用新规。新规加重不符合例外，仍用旧规；已不再违法不能只减半罚。",
    },
    sources: [sourceId],
    exercises: administrativeTemporalLawExercises,
  },
];
export const administrativeTemporalLawContentPack = {
  revision: administrativeTemporalLawRevision,
  snapshot: {
    topics: administrativeTemporalLawTopics,
    sources: administrativeTemporalLawSources,
  },
};
export const administrativeTemporalLawPublicRules = [
  {
    sourceId,
    title: "行政处罚法第37条：新旧规定适用（法条原文）",
    url: lawUrl,
    excerpt:
      "第三十七条　实施行政处罚，适用违法行为发生时的法律、法规、规章的规定。但是，作出行政处罚决定时，法律、法规、规章已被修改或者废止，且新的规定处罚较轻或者不认为是违法的，适用新的规定。",
    checkedAt: "2026-10-13",
    scope:
      "2021修订文本第37条原文，直接核读官方全文。仅一般实体处罚规定的时间适用规则，无具体案件答案或采分内容。",
  },
];
