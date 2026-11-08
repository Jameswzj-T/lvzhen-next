import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";

export const civilProcedureProofBurdenRevision =
  "civpro-proof-burden-2026-10-11.v1";

export const civilProcedureProofBurdenSources: ContentSources = {
  "civpro-proof-law67": {
    title: "《民事诉讼法》2023修正第67条：主张与提供证据",
    url: "https://fgw.sh.gov.cn/cmsres/95/95d5fd4cc4bb4c8292ea9684def3fa02/0212340e50e0b014b7a206164f270398.pdf",
    note: "2026-10-11直接读取上海市发改委官方公开全文第67条。基础规则为当事人对主张提供证据，同时保留法院依法调查收集与全面客观审查。本组给定普通民事案件审理已完成必要程序，不把一开始没拿出材料立即等同败诉。自编案例与得失点，不是官方阅卷细则。",
  },
  "civpro-proof-interpretation90-91": {
    title: "最高法民诉解释2022修正第90、91条：事实分配与证明不足后果",
    url: "https://www.court.gov.cn/fabu/xiangqing/353651.html",
    note: "2026-10-11直接读最高人民法院2022-04-02公布全文：第二次修正自2022-04-10施行。第90条处理判决前未证明所主张事实的不利后果；第91条区分产生关系与关系变更、消灭、妨害事实。保留法律另有规定的例外，不研究借贷转账、侵权倒置等专门分配或全部后续规范。",
  },
};

export const civilProcedureProofBurdenCaseFacts = {
  "CIVPRO-PAYMENT-PROOF-1":
    "本案为独立教学虚构。陆乔起诉向程禾出售展柜的3万元货款。合同成立、展柜已经交付验收、约定价款和付款期限均经法院查明，双方对此没有争议。程禾仅主张自己已在付款日将3万元现金交给陆乔，所以债务已经结清；陆乔否认收款。\n\n程禾提供的材料不能证明这次现金交付，双方已获得法定举证机会，法庭完成质证与必要调查。在作出判决前，是否曾现金付款仍无法查明。本案不存在举证责任特殊分配、证据妨碍或其他足以改变这一分配的情况，也没有其他抗辩。本问只讨论“已经付清”事实由谁证明，以及该事实未能证明的后果。",
  "CIVPRO-AGREEMENT-PROOF-1":
    "本案为另一独立教学虚构。许谦向顾淮请求9000元仓储费，称二人口头约定由自己为顾淮保管一批展架三个月、每月3000元，并称已按约保管。顾淮否认曾与许谦作过这项约定，只作否认；他表示展架临时放在该处是经场地另一使用人许可，自己没有委托许谦或同意向他付费。\n\n许谦提交的是自己填写、没有顾淮确认的收费记录，其他材料也未能消除双方是否达成仓储合意的争议。双方已经获得法定举证机会，法庭完成质证与必要调查，审理终结时仍无法查明该合同合意是否存在。没有自认、法定推定、证据妨碍或证明责任特殊分配的情况。本问只按许谦所主张的该仓储合同请求分析，不讨论另有其他法律关系产生的费用。",
};

export const civilProcedureProofBurdenExercises: UnitExercise[] = [
  {
    id: "civpro-payment-proof-choice",
    hint: "分开原债务与已经清偿两个事实，再看本案审理结束后的证据状态。",
    caseId: "CIVPRO-PAYMENT-PROOF-1",
    relatedTopicIds: ["civpro-proof-burden"],
    kind: "objective",
    title: "说已经现金付清，谁来证明？",
    facts:
      "本案为独立教学虚构。陆乔起诉向程禾出售展柜的3万元货款。合同成立、展柜已经交付验收、约定价款和付款期限均经法院查明，双方对此没有争议。程禾仅主张自己已在付款日将3万元现金交给陆乔，所以债务已经结清；陆乔否认收款。\n\n程禾提供的材料不能证明这次现金交付，双方已获得法定举证机会，法庭完成质证与必要调查。在作出判决前，是否曾现金付款仍无法查明。本案不存在举证责任特殊分配、证据妨碍或其他足以改变这一分配的情况，也没有其他抗辩。本问只讨论“已经付清”事实由谁证明，以及该事实未能证明的后果。",
    prompt: "仅对程禾提出的“货款已经付清”事实，哪项判断正确？",
    answer: "b",
    reference:
      "选B。程禾主张付款使原债务消灭，应证明这项付款事实。在判决前仍不能证明时，他承担该项事实主张不获支持的不利后果，不能要求陆乔先证明没有收到钱。",
    sources: ["civpro-proof-law67", "civpro-proof-interpretation90-91"],
    choiceMode: "single",
    options: [
      {
        id: "a",
        text: "所有事实都由原告证明，程禾作为被告无需证明已付款。",
        explanation: "证明责任按具体事实分配，不是被告一概不用举证。",
      },
      {
        id: "b",
        text: "程禾应证明付款这一消灭债务的事实，不能证明时承担该项不利后果。",
        explanation: "原债务已查明，主张已经清偿的一方证明消灭事实。",
      },
      {
        id: "c",
        text: "只要陆乔也拿不出没收现金的证据，就应当认定已经付清。",
        explanation: "不能将被告未证明的清偿事实转化为原告必须先证明否定事实。",
      },
      {
        id: "d",
        text: "无法查清就把3万元平均分摊，双方各承担一半。",
        explanation: "普通证明责任规则并非不明事实一概均摊。",
      },
    ],
  },
  {
    id: "civpro-payment-proof-explain",
    hint: "分开原债务与已经清偿两个事实，再看本案审理结束后的证据状态。",
    caseId: "CIVPRO-PAYMENT-PROOF-1",
    relatedTopicIds: ["civpro-proof-burden"],
    kind: "subjective",
    title: "区分原债务与已经清偿的事实",
    facts:
      "本案为独立教学虚构。陆乔起诉向程禾出售展柜的3万元货款。合同成立、展柜已经交付验收、约定价款和付款期限均经法院查明，双方对此没有争议。程禾仅主张自己已在付款日将3万元现金交给陆乔，所以债务已经结清；陆乔否认收款。\n\n程禾提供的材料不能证明这次现金交付，双方已获得法定举证机会，法庭完成质证与必要调查。在作出判决前，是否曾现金付款仍无法查明。本案不存在举证责任特殊分配、证据妨碍或其他足以改变这一分配的情况，也没有其他抗辩。本问只讨论“已经付清”事实由谁证明，以及该事实未能证明的后果。",
    prompt:
      "“货款已经付清”由谁承担举证证明责任？在本案判决前仍不能证明时，这项主张应如何处理？",
    answer: "",
    reference:
      "程禾主张现金付款使已经查明的货款债务消灭，应由程禾证明付款事实。现该事实仍未能证明，程禾承担该主张不获支持的不利后果，不能仅因陆乔无法证明没收现金就认定付清。",
    sources: ["civpro-proof-law67", "civpro-proof-interpretation90-91"],
    criteria: [
      {
        id: "payment-burden",
        label: "确定付款事实的证明责任",
        meaning:
          "联系程禾主张现金付款使已存在债务消灭，说明该付款事实由程禾承担证明责任。",
        acceptable:
          "说“他说已经还了，就得拿证据证明这笔钱确实给过”即可；无需说出条号或机械背诵消灭事实术语。",
        boundary:
          "不要求陆乔重复证明题设已查明的合同与交货，也不推广为被告对全部事实负责。",
      },
      {
        id: "payment-unproven-consequence",
        label: "联系审理后证明不足说明该主张的不利后果",
        meaning:
          "说明判决前仍不能证明现金付款，程禾的已清偿主张不获支持，由其承担该事实不明的不利后果，而不是让陆乔证明没有收款。",
        acceptable:
          "可以合说“付款证明不了，就不能按付清来挡掉这笔货款”；无需另写独立结论句、计算利息或完整判决主文。",
        boundary:
          "本问不把初期暂缺材料立即当败诉；不要求额外判断说谎、伪证、实体违法或救济。",
      },
    ],
  },
  {
    id: "civpro-agreement-unproven-choice",
    hint: "分别说明谁来证明、请求如何处理，以及能够得出的事实结论。",
    caseId: "CIVPRO-AGREEMENT-PROOF-1",
    relatedTopicIds: ["civpro-proof-burden"],
    kind: "objective",
    title: "合意没有证明，就等于已证明从未订约吗？",
    facts:
      "本案为另一独立教学虚构。许谦向顾淮请求9000元仓储费，称二人口头约定由自己为顾淮保管一批展架三个月、每月3000元，并称已按约保管。顾淮否认曾与许谦作过这项约定，只作否认；他表示展架临时放在该处是经场地另一使用人许可，自己没有委托许谦或同意向他付费。\n\n许谦提交的是自己填写、没有顾淮确认的收费记录，其他材料也未能消除双方是否达成仓储合意的争议。双方已经获得法定举证机会，法庭完成质证与必要调查，审理终结时仍无法查明该合同合意是否存在。没有自认、法定推定、证据妨碍或证明责任特殊分配的情况。本问只按许谦所主张的该仓储合同请求分析，不讨论另有其他法律关系产生的费用。",
    prompt: "只按给定的审理后事实状态与普通证明责任，下列哪项正确？",
    answer: "c",
    reference:
      "选C。许谦主张仓储合同关系存在，应证明产生该关系的基本事实；审理终结仍不足以证明，应承担该合同请求不能获得支持的不利后果。这不等于已经查实双方从未订约。",
    sources: ["civpro-proof-law67", "civpro-proof-interpretation90-91"],
    choiceMode: "single",
    options: [
      {
        id: "a",
        text: "由顾淮证明合同不存在，否则直接支持许谦的合同请求。",
        explanation: "单纯否认不自动使原告的成立事实证明责任倒置。",
      },
      {
        id: "b",
        text: "只要已经起诉受理，就应推定合同存在。",
        explanation: "起诉受理与实体事实证明不同。",
      },
      {
        id: "c",
        text: "许谦承担成立事实证明不足的不利后果，但不能据此说已查实从未订约。",
        explanation: "区分事实证明风险与事实被积极证明为相反两件事。",
      },
      {
        id: "d",
        text: "不能查明就已证明许谦虚构合同，必须对其作伪证处理。",
        explanation: "证明不足不能直接推导故意造假或制裁条件。",
      },
    ],
  },
  {
    id: "civpro-agreement-unproven-explain",
    hint: "分别说明谁来证明、请求如何处理，以及能够得出的事实结论。",
    caseId: "CIVPRO-AGREEMENT-PROOF-1",
    relatedTopicIds: ["civpro-proof-burden"],
    kind: "subjective",
    title: "说明证明责任、请求后果与事实边界",
    facts:
      "本案为另一独立教学虚构。许谦向顾淮请求9000元仓储费，称二人口头约定由自己为顾淮保管一批展架三个月、每月3000元，并称已按约保管。顾淮否认曾与许谦作过这项约定，只作否认；他表示展架临时放在该处是经场地另一使用人许可，自己没有委托许谦或同意向他付费。\n\n许谦提交的是自己填写、没有顾淮确认的收费记录，其他材料也未能消除双方是否达成仓储合意的争议。双方已经获得法定举证机会，法庭完成质证与必要调查，审理终结时仍无法查明该合同合意是否存在。没有自认、法定推定、证据妨碍或证明责任特殊分配的情况。本问只按许谦所主张的该仓储合同请求分析，不讨论另有其他法律关系产生的费用。",
    prompt:
      "谁应证明本案仓储合同合意？审理终结仍不能证明时，对许谦的这项合同请求有何影响？这种处理是否等于已经查实双方从未订约？请分别说明。",
    answer: "",
    reference:
      "许谦主张合同关系存在，应证明产生该关系的合意事实。审理终结仍未能证明，由他承担不利后果，该合同请求不能获得支持；顾淮仅否认不使这项责任倒置。这里是按证明责任处理事实不明，并不等于积极证实双方从未订约，更不当然证明谁在说谎。",
    sources: ["civpro-proof-law67", "civpro-proof-interpretation90-91"],
    criteria: [
      {
        id: "agreement-burden",
        label: "确定合同合意的证明责任",
        meaning:
          "联系许谦以仓储合同请求付款，说明由许谦证明合同合意等产生关系的基本事实，而非单因顾淮否认就倒置。",
        acceptable:
          "“要按这个合同收费的是许谦，应由他证明双方有过约定”即可，结论与理由可合成一句。",
        boundary: "不要求展开仓储合同全部成立生效要件、所有其他关系或例外。",
      },
      {
        id: "agreement-request-consequence",
        label: "说明审理终结证明不足对合同请求的后果",
        meaning:
          "结合已完成举证、质证与必要调查仍未能证明合意，说明许谦承担该项不利后果，其所主张的本合同请求不能获得支持。",
        acceptable:
          "“最后还是证不出这项约定，这个按合同收钱的请求不能支持”可表达；不要求写完整判决主文或术语格式。",
        boundary:
          "不能把材料暂时未取得与判决前已经证明不足混同；不能仅因原告起诉就支持请求。",
      },
      {
        id: "agreement-unknown-not-negated",
        label: "不把证明不足改写为相反事实已经证实",
        meaning:
          "说明按证明责任不支持该请求，并不等于法院已查实双方从未订约；本案合同合意仍属未能证明。",
        acceptable:
          "“只能说没证出来，不能反过来说已经查清从来没约定”即可，与上一点合句也可。",
        boundary:
          "若把不支持请求说成已经证明合同不存在，与本点相反；不要求判断造假、处罚、其他请求或未知事实。",
      },
    ],
  },
];

export const civilProcedureProofBurdenTopics: FaultTopic[] = [
  {
    id: "civpro-proof-burden",
    title: "普通民事证明责任与证明不足",
    headline: "先分清待证事实，再看谁承担未能证明的风险。",
    goal: "区分关系成立与清偿事实的证明责任，并避免把未证明直接写成相反事实已证实。",
    prerequisite: "知道受理案件不等于实体请求已经成立。",
    minutes: "10–12",
    paragraphs: [
      "当事人应为自己主张的事实提供证据。普通规则下，主张法律关系存在的一方证明产生该关系的基本事实；主张关系变更、消灭或权利受到妨害的一方证明相应事实。不能简单说所有事实都由原告证明，或被告只要否认就不用区分。",
      "在作出判决前，仍没有证据或证据不足以证明某项主张时，由负有该项证明责任的一方承担不利后果。法院依法调查与审查证据仍须履行；初期还没收集到材料，不等于已经可以作最终不利判断。",
      "按证明责任处理无法查明，不等于已经积极证明相反事实。普通合同请求因合意未证而不获支持，不自动变成从未订约、对方说谎已经查实。本单元排除了特殊分配、推定与证据妨碍，不覆盖这些例外。",
    ],
    example: {
      title: "说已经现金付清，谁来证明？",
      facts:
        "本案为独立教学虚构。陆乔起诉向程禾出售展柜的3万元货款。合同成立、展柜已经交付验收、约定价款和付款期限均经法院查明，双方对此没有争议。程禾仅主张自己已在付款日将3万元现金交给陆乔，所以债务已经结清；陆乔否认收款。\n\n程禾提供的材料不能证明这次现金交付，双方已获得法定举证机会，法庭完成质证与必要调查。在作出判决前，是否曾现金付款仍无法查明。本案不存在举证责任特殊分配、证据妨碍或其他足以改变这一分配的情况，也没有其他抗辩。本问只讨论“已经付清”事实由谁证明，以及该事实未能证明的后果。",
      analysis:
        "选B。程禾主张付款使原债务消灭，应证明这项付款事实。在判决前仍不能证明时，他承担该项事实主张不获支持的不利后果，不能要求陆乔先证明没有收到钱。",
    },
    pitfall:
      "把原告/被告身份当作全部事实的固定举证分工，或把没证明变成证明了相反事实。",
    recall: {
      prompt: "成立合同、债务已清偿与事实无法查明，分别应怎样分析？",
      reference:
        "主张关系存在者证明产生关系的基本事实；主张清偿等消灭事实者证明该事实。最终不能证明的一方承担对应风险，但不能因此编造相反事实已获证实。",
    },
    sources: ["civpro-proof-law67", "civpro-proof-interpretation90-91"],
    exercises: civilProcedureProofBurdenExercises,
  },
];
export const civilProcedureProofBurdenChapter = {
  id: "CIVPRO-PROOF-BURDEN",
  title: "证明责任与证明不足",
  section: "民事诉讼法",
  topicIds: ["civpro-proof-burden"],
};
export const civilProcedureProofBurdenContentPack = {
  revision: civilProcedureProofBurdenRevision,
  snapshot: {
    topics: civilProcedureProofBurdenTopics,
    sources: civilProcedureProofBurdenSources,
  },
};
export const civilProcedureProofBurdenDefaultQueues = {
  objective: civilProcedureProofBurdenExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilProcedureProofBurdenExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilProcedureProofBurdenQuestion(id: string) {
  const q = civilProcedureProofBurdenExercises.find((q) => q.id === id);
  return q ? structuredClone(q) : undefined;
}
export function civilProcedureProofBurdenTopicForQuestion(id: string) {
  const t = civilProcedureProofBurdenTopics.find((t) =>
    t.exercises.some((q) => q.id === id),
  );
  return t ? structuredClone(t) : undefined;
}
export function civilProcedureProofBurdenSameCaseQuestions(id: string) {
  const q = civilProcedureProofBurdenQuestion(id);
  return q
    ? structuredClone(
        civilProcedureProofBurdenExercises.filter((x) => x.caseId === q.caseId),
      )
    : [];
}
export const civilProcedureProofBurdenPublicRules = [
  {
    sourceId: "civpro-proof-law67",
    title: "第67条：提供、调查和审查证据（教学摘要）",
    url: "https://fgw.sh.gov.cn/cmsres/95/95d5fd4cc4bb4c8292ea9684def3fa02/0212340e50e0b014b7a206164f270398.pdf",
    excerpt:
      "当事人对自己提出的主张应提供证据；客观原因不能自行收集或法院认为需要的证据，法院依法调查收集，并全面、客观审查核实。",
    checkedAt: "2026-10-11",
    scope: "普通提供证据原则，不含本题结论、参考答案或特殊规则。",
  },
  {
    sourceId: "civpro-proof-interpretation90-91",
    title: "第90、91条：事实分配与判决前证明不足（教学摘要）",
    url: "https://www.court.gov.cn/fabu/xiangqing/353651.html",
    excerpt:
      "法律无特别规定时，主张关系存在者证明产生关系的基本事实；主张变更、消灭或权利受妨害者证明对应事实。判决前未能证明，由负有证明责任者承担不利后果；这种风险分配不等于积极证明相反历史事实。",
    checkedAt: "2026-10-11",
    scope: "普通民事关系，不含具体案件、参考答、采分标签或借贷等特殊分配。",
  },
];
