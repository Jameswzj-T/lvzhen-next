import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";

export const administrativeSingleFineRevision =
  "administrative-single-fine-2026-10-12.v1";
const topicId = "admin-single-fine";
const lawUrl =
  "https://scjgj.beijing.gov.cn/cxfw/flfgcxfw/qt/202203/t20220331_2645278.html";
export const administrativeSingleFineSources: ContentSources = {
  "admin-single-fine-article29": {
    title: "《行政处罚法》第29条：同一行为不得重复罚款与罚款规范竞合",
    url: lawUrl,
    note: "2026-10-12直接核北京市市场监督管理局2021修订全文，第29条两句。2021-07-15施行；市场监管总局转载的截至2026-08-28现行法律目录仍列2021修订。本单元给定同一违法行为及适用规范，不展开行为个数争议、管辖、先后处罚纠正或行业裁量。甲乙罚款数额为虚构教学条件，不冒称真实行业罚则或官方试题。",
  },
  "admin-single-fine-article9": {
    title: "《行政处罚法》第9条第2项：罚款与没收违法所得",
    url: lawUrl,
    note: "2026-10-12直接核官方全文：罚款、没收违法所得、没收非法财物分别列明。款项都需缴纳不使处罚种类自动相同；不据第29条反推所有不同处罚当然可以并用，仍需各自法定依据。",
  },
  "admin-single-fine-article28": {
    title: "《行政处罚法》第28条第2款：违法所得与依法退赔例外",
    url: lawUrl,
    note: "2026-10-12直接核官方全文：违法所得除依法应当退赔外应予没收；法律、行政法规、部门规章另定计算的从其规定。本题明确违法所得数额及无依法退赔情形，不要求另算行业成本、返还或民事损害。",
  },
};
const allSources = Object.keys(administrativeSingleFineSources);
export const administrativeSingleFineCaseFacts = {
  "ADMIN-SINGLE-FINE-COMPETING-1": [
    "本案为独立教学虚构。青澄公司在同一网页发布了一则虚假经营宣传。机关调查确认，本案处理的是同一当事人的同一个违法行为，不存在另一项独立行为。该行为同时违反甲、乙两个法律规范，二者均应给予罚款。",
    "本题给定：甲规范依法适用的罚款数额为3000元，乙规范依法适用的罚款数额为5000元，机关权限、规范适用及数额比较均无争议；这些金额仅为教学假设，不是真实行业罚则。此前尚未作出处罚决定，也无其他应考的特别规定。办理人员拟将两项罚款相加，在一份决定书中写为罚款8000元，并称‘只开一张决定书就不是两次罚款’。本问仅按《行政处罚法》第29条判断罚款处理。",
  ].join("\n\n"),
  "ADMIN-FINE-ILLEGAL-GAINS-1": [
    "本案为另一独立教学虚构。汀禾公司销售了一批依法不得销售的货物。主管机关已经查明违法行为，拟给予罚款6000元，同时没收公司通过本次销售取得的1600元。公司提出：‘两笔都是让我们交钱，就是对同一行为罚了两次；罚款以后这1600元应当留下。’",
    "本题给定：机关具有处罚权限，6000元罚款有合法依据且适用正确；1600元全部属于本次行为的违法所得，不存在依法应当退赔的部分，也没有另定计算口径的特别规定。事实和数额均无争议。只判断罚款、没收违法所得与第29条的关系，不讨论具体行业罚则、其他责任或程序救济。",
  ].join("\n\n"),
};

export const administrativeSingleFineExercises: UnitExercise[] = [
  {
    id: "admin-competing-fines-choice",
    caseId: "ADMIN-SINGLE-FINE-COMPETING-1",
    relatedTopicIds: [topicId],
    kind: "objective",
    choiceMode: "single",
    title: "一份决定书里能相加两项罚款吗？",
    facts: administrativeSingleFineCaseFacts["ADMIN-SINGLE-FINE-COMPETING-1"],
    prompt: "仅按第29条与题设，下列罚款处理哪项正确？",
    options: [
      {
        id: "a",
        text: "在同一份决定书中罚款8000元，形式上只有一次就可以。",
        explanation:
          "将针对同一行为的两项罚款相加，不因只写一份决定书而符合第29条。",
      },
      {
        id: "b",
        text: "分别开两份决定书，先收3000元，再收5000元。",
        explanation: "同一当事人的同一违法行为不得受到两次以上罚款。",
      },
      {
        id: "c",
        text: "按照罚款数额高的乙规范处罚，不将两项相加。",
        explanation:
          "同一行为违反多个均应罚款的规范，按罚款数额高的规定处罚；题设对应5000元。",
      },
      {
        id: "d",
        text: "必须适用较低的3000元，因为禁止重复罚款就必须从轻。",
        explanation:
          "禁止重复与择高规则同时适用，不能将第29条改写为一律选择较低数额。",
      },
    ],
    answer: "c",
    hint: "决定书张数不决定是否重复罚款；再看同一行为违反多个罚款规范如何适用。",
    reference:
      "选C。针对同一当事人的同一个违法行为，不得重复罚款，也不能把甲乙两项相加后装进一份决定书。两规范均应罚款，按罚款数额高的规定处罚，本题适用乙规范对应的5000元，不是8000元或择低3000元。",
    sources: ["admin-single-fine-article29"],
  },
  {
    id: "admin-competing-fines-explain",
    caseId: "ADMIN-SINGLE-FINE-COMPETING-1",
    relatedTopicIds: [topicId],
    kind: "subjective",
    title: "只开一张决定书，就能合计罚款吗？",
    facts: administrativeSingleFineCaseFacts["ADMIN-SINGLE-FINE-COMPETING-1"],
    prompt:
      "办理人员拟相加罚款并以‘只开一张决定书’作为理由，是否成立？请结合本案说明不得怎样罚款，以及应当依据哪一个规定处理。无需讨论管辖、救济或其他处罚。",
    hint: "先回应相加和决定书张数，再说明本案的罚款规范选择。",
    reference:
      "不成立。处理的是同一当事人的同一个违法行为，不能分别或相加给予两项罚款，一份决定书也不能改变这一点。同一行为违反多个均应罚款的规范时，应按罚款数额高的规定处罚；本题应依乙规范适用5000元，不能相加为8000元，也不是选较低数额。",
    criteria: [
      {
        id: "one-act-no-double-fine",
        label: "同一行为不因一张决定书就能相加罚款",
        meaning:
          "联系同一当事人同一个违法行为，否定两项罚款相加，并说明一张决定书不能使这一相加处理合法。",
        acceptable:
          "‘就这一件违法事，不能把两笔罚款加着收，写在同一张纸上也不行’足够；可以与择高规则合写。",
        boundary:
          "只泛称不能重复处罚而未联系罚款或本案相加，为部分；明确允许合并到一张决定书后相加，为相反判断。没有固定用语、条号或独立结论句要求；不另要求界定行为个数、机关权限或救济。",
      },
      {
        id: "higher-fine-rule",
        label: "适用罚款数额高的规定",
        meaning:
          "两规范对同一行为均应罚款时选择数额高的乙规范，本题对应5000元，不相加或择低。",
        acceptable:
          "‘应按高的那条处理，也就是乙的五千’可以；只要选择较高规定的含义清楚，不强制再写金额或字母。",
        boundary:
          "只写‘罚5000’未说明规则选择理由，为部分；主张一律择低或相加为相反判断。第一项已正确表达的部分独立保留，不因本项错而抹去；其他种类处罚不在本问要求内。",
      },
    ],
    sources: ["admin-single-fine-article29"],
  },
  {
    id: "admin-fine-confiscation-choice",
    caseId: "ADMIN-FINE-ILLEGAL-GAINS-1",
    relatedTopicIds: [topicId],
    kind: "objective",
    choiceMode: "single",
    title: "罚款与没收所得都收钱，就是两次罚款吗？",
    facts: administrativeSingleFineCaseFacts["ADMIN-FINE-ILLEGAL-GAINS-1"],
    prompt: "仅按第9、28、29条与题设，哪项正确回应公司的理由？",
    options: [
      {
        id: "a",
        text: "两笔都交钱就是两次罚款，只能保留金额较高的一笔。",
        explanation:
          "罚款和没收违法所得不是同一种处罚，不能仅以都交钱套用两次罚款或择高规则。",
      },
      {
        id: "b",
        text: "罚款与没收违法所得不同，本题没收1600元不因已罚款而被排除。",
        explanation:
          "第9条区分两种处罚；题设违法所得无依法退赔例外，应予没收。",
      },
      {
        id: "c",
        text: "既然罚款已经惩罚公司，违法所得就可作为合法收入留下。",
        explanation: "罚款不使违法所得变成合法所得，也不代替第28条要求的处理。",
      },
      {
        id: "d",
        text: "第29条允许任何不同种类的处罚并用，不需要另找依据。",
        explanation:
          "第29条限制重复罚款，并不为其他处罚提供当然授权，仍需各自法定依据。",
      },
    ],
    answer: "b",
    hint: "先分清处罚种类，再看违法所得是否存在依法退赔等题设例外。",
    reference:
      "选B。6000元是罚款，1600元是没收违法所得，不能因为都缴钱就认作两次罚款。本题明确1600元全属违法所得且无依法退赔情形，依第28条应予没收；已经罚款不使公司得以保留该所得。这不等于不同处罚在任何案件中都可无依据并用。",
    sources: [...allSources],
  },
  {
    id: "admin-fine-confiscation-explain",
    caseId: "ADMIN-FINE-ILLEGAL-GAINS-1",
    relatedTopicIds: [topicId],
    kind: "subjective",
    title: "已有罚款，违法所得就能留下吗？",
    facts: administrativeSingleFineCaseFacts["ADMIN-FINE-ILLEGAL-GAINS-1"],
    prompt:
      "公司的两项理由能否成立？请说明这两笔款项的处罚性质，并结合违法所得及退赔前提判断，能否仅因已有罚款而让公司保留1600元。无需评价题外处罚或救济。",
    hint: "将罚款与没收违法所得分开，不把‘都要交钱’当作同一处罚种类。",
    reference:
      "两项理由都不能成立。6000元罚款和没收1600元违法所得是不同处罚种类，并非第29条所禁止的对同一行为两次以上罚款。本题已确定1600元全属违法所得，且不存在依法应当退赔的部分，依第28条应予没收；不能仅因已有罚款而由公司保留。",
    criteria: [
      {
        id: "distinguish-fine-and-gains",
        label: "罚款与没收所得不是两次罚款",
        meaning:
          "联系本案6000元罚款与1600元没收违法所得，说明处罚种类不同，均交钱不使其成为第29条禁止的两次罚款。",
        acceptable:
          "‘六千是在罚款，一千六是收走违法赚的钱，不是又罚一笔，不能只看都交钱’足够，不强制金额数字或法条编号。",
        boundary:
          "只说都可处理而未分清种类和重复罚款关系，为部分；将没收所得认成第二笔罚款为相反判断。不得延伸成所有不同处罚当然都能并用；不另考没收非法财物或行政强制。",
      },
      {
        id: "gains-not-kept-after-fine",
        label: "无退赔例外的违法所得仍应没收",
        meaning:
          "联系1600元属于违法所得且没有依法退赔情形，说明仍应没收，不因已有罚款就允许公司留下。",
        acceptable:
          "‘这些都是违法赚来的，也没有要依法退还赔给别人的部分，罚款后仍得没收，不能留给公司’可以。",
        boundary:
          "只写应没收但未联系违法所得或无退赔前提，为部分；将已罚款作为可以留下所得的理由为相反判断。已正确区分两种处罚的部分独立保留；无需重新计算所得、具体行业规则或其他责任。",
      },
    ],
    sources: [...allSources],
  },
];

export const administrativeSingleFineTopics: FaultTopic[] = [
  {
    id: topicId,
    title: "同一行为的罚款与没收所得",
    headline: "看行为和处罚种类，不能只看交了几笔钱。",
    goal: "会处理同一行为的罚款规范竞合，并区分重复罚款与依法没收违法所得。",
    prerequisite:
      "知道行政处罚可包括罚款和没收，能把给定的同一行为与不同处罚分开。",
    minutes: "8–12",
    paragraphs: [
      "对同一当事人的同一个违法行为，不得给予两次以上罚款。分开决定或将两项相加写入一份决定书，都不能绕开这一限制；本节把同一行为作为已知条件，不教授复杂案件中行为个数的统一判断法。",
      "同一行为违反多个均应罚款的法律规范，按照罚款数额高的规定处罚，不是累加，也不是一律择低。题中给定数额只用来练规则选择，不代替现实行业的罚则和裁量基准。",
      "罚款与没收违法所得是不同处罚种类。违法所得除依法应当退赔外应予没收，已有罚款不使其变成合法收入。但不属于两次罚款，只能排除第29条的这一反对理由，不能据此认为任何其他处罚都无需依据。",
    ],
    example: {
      title: "同一行为，两项罚款不能相加",
      facts: administrativeSingleFineCaseFacts["ADMIN-SINGLE-FINE-COMPETING-1"],
      analysis:
        "甲乙两规范均应罚款，适用罚款数额较高的乙规范；一份决定书不使相加8000元合法。另案的罚款加没收违法所得则应先区分种类，不能照搬两项罚款的择高处理。",
    },
    pitfall:
      "把‘不重复罚款’扩大成‘任何处罚都不能并用’，或者以一份决定书掩盖两笔罚款相加。",
    recall: {
      prompt:
        "同一行为违反两项罚款规范如何处理？已有罚款是否就排除没收无退赔例外的违法所得？",
      reference:
        "罚款适用数额高的规定，不能累加；没收违法所得不等于再罚一次，无依法退赔例外仍应没收，但仍需各自法定依据。",
    },
    sources: allSources,
    exercises: administrativeSingleFineExercises,
  },
];
export const administrativeSingleFineContentPack = {
  revision: administrativeSingleFineRevision,
  snapshot: {
    topics: administrativeSingleFineTopics,
    sources: administrativeSingleFineSources,
  },
};
export const administrativeSingleFinePublicRules = [
  {
    sourceId: "admin-single-fine-article29",
    title: "第29条：同一行为罚款规则（教学摘要）",
    url: lawUrl,
    excerpt:
      "对同一当事人的同一违法行为不得给予两次以上罚款；同一行为违反多个均应罚款的法律规范，按照罚款数额高的规定处罚。",
    checkedAt: "2026-10-12",
    scope: "2021修订文本；不含行业罚款幅度、同一行为争议或先后处罚的纠正程序。",
  },
  {
    sourceId: "admin-single-fine-article9",
    title: "第9条第2项：处罚种类（教学摘要）",
    url: lawUrl,
    excerpt:
      "罚款、没收违法所得和没收非法财物属于行政处罚种类；不能仅因款项均须缴纳就把罚款与没收违法所得视作同一种处罚。",
    checkedAt: "2026-10-12",
    scope: "仅用于区分种类，不授权无依据并用不同处罚。",
  },
  {
    sourceId: "admin-single-fine-article28",
    title: "第28条第2款：违法所得（教学摘要）",
    url: lawUrl,
    excerpt:
      "违法所得除依法应当退赔外应予没收。法律、行政法规、部门规章对违法所得计算另有规定的，从其规定。",
    checkedAt: "2026-10-12",
    scope: "不提供具体行业所得计算口径或退赔事实认定。",
  },
];
