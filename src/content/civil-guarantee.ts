import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";

export const civilGuaranteeRevision = "civil-guarantee-basic-2026-10-11.v1";

export const civilGuaranteeSources: ContentSources = {
  "civil-guarantee-code686-687": {
    title: "《民法典》第686、687条：未约定方式与一般保证",
    url: "https://www.cac.gov.cn/2020-06/01/c_15925617772683192.htm",
    note: "2026-10-11直接读取中国网信网新华社公布的民法典合同编。第686条未约定或不明确按一般保证；第687条先诉抗辩保留法定例外。本组不讲争议措辞的司法解释推断、不把一般保证等同绝对免责。",
  },
  "civil-guarantee-code688": {
    title: "《民法典》第688条：连带责任保证的请求",
    url: "https://www.cac.gov.cn/2020-06/01/c_15925617772683192.htm",
    note: "2026-10-11直接读第688条。题设明确约定连带责任、到期未履行且在保证期间内提出请求，只考是否必须先诉并执行债务人；不计算期间/利息或引入公司担保决议、追偿及多重担保。",
  },
};

export const civilGuaranteeCaseFacts = {
  "CIVIL-GUARANTEE-NO-MODE-1":
    "本案为独立教学虚构。周檀向林序借款2万元，款项已按约转入周檀账户。另一名成年人顾岩与林序签了一份书面保证合同，载明：“本人自愿为周檀向林序所借的这2万元提供保证。”合同还写明债务到期日和保证期间，但没有写保证方式，双方也未以其他条款或补充约定确定方式。借款及保证合同的成立、效力没有争议。\n\n林序认为：“既然顾岩愿意替别人担保，即使没有写方式，也应当一律算连带责任保证。”本问只判断未约定保证方式的法定处理，不讨论现在能否直接起诉或要求付款。",
  "CIVIL-GUARANTEE-JOINT-1":
    "本案为另一独立教学虚构。梁岑向郑澄借款3万元，郑澄已交付款项。陶安与郑澄签署书面保证合同，明确约定：“陶安对梁岑所欠这3万元本金承担连带保证责任”，保证期间为主债务到期之日起一年。主合同与保证合同均有效。\n\n还款期限届满，梁岑没有还款。到期后一周，郑澄向陶安请求在约定范围内偿还这3万元本金。陶安只提出：“我只是保证人，你必须先起诉梁岑，把他的财产强制执行后仍拿不到钱，才可以来找我。”没有其他抗辩争议。本问只判断这种先后顺序理由，不计算利息、其他费用、追偿或变更后的担保责任。",
};

export const civilGuaranteeExercises: UnitExercise[] = [
  {
    hint: "结合本问给定事实和所问范围说明，不要求固定措辞或条号。",
    id: "civil-guarantee-default-choice",
    caseId: "CIVIL-GUARANTEE-NO-MODE-1",
    relatedTopicIds: ["civil-guarantee-basic"],
    kind: "objective",
    title: "没有写保证方式，是否当然连带？",
    facts:
      "本案为独立教学虚构。周檀向林序借款2万元，款项已按约转入周檀账户。另一名成年人顾岩与林序签了一份书面保证合同，载明：“本人自愿为周檀向林序所借的这2万元提供保证。”合同还写明债务到期日和保证期间，但没有写保证方式，双方也未以其他条款或补充约定确定方式。借款及保证合同的成立、效力没有争议。\n\n林序认为：“既然顾岩愿意替别人担保，即使没有写方式，也应当一律算连带责任保证。”本问只判断未约定保证方式的法定处理，不讨论现在能否直接起诉或要求付款。",
    prompt: "就本案未约定保证方式，应按哪种方式处理？",
    answer: "a",
    reference:
      "选A。合同未约定保证方式，依民法典第686条按一般保证承担保证责任，不能因替他人担保就一律推为连带责任保证。",
    sources: ["civil-guarantee-code686-687", "civil-guarantee-code688"],
    choiceMode: "single",
    options: [
      {
        id: "a",
        text: "按照一般保证处理。",
        explanation: "第686条对没有约定或约定不明的保证方式作此规定。",
      },
      {
        id: "b",
        text: "一律按照连带责任保证处理。",
        explanation: "这是把承担保证与明确连带方式混为一谈。",
      },
      {
        id: "c",
        text: "保证合同当然无效，任何保证责任都没有。",
        explanation: "本问方式欠缺有法定填补规则，不当然使合同无效。",
      },
      {
        id: "d",
        text: "法律没有规则，只能由债权人单方选择。",
        explanation: "保证方式不能由债权人事后任意指定。",
      },
    ],
  },
  {
    hint: "结合本问给定事实和所问范围说明，不要求固定措辞或条号。",
    id: "civil-guarantee-default-explain",
    caseId: "CIVIL-GUARANTEE-NO-MODE-1",
    relatedTopicIds: ["civil-guarantee-basic"],
    kind: "subjective",
    title: "回应“凡担保都连带”",
    facts:
      "本案为独立教学虚构。周檀向林序借款2万元，款项已按约转入周檀账户。另一名成年人顾岩与林序签了一份书面保证合同，载明：“本人自愿为周檀向林序所借的这2万元提供保证。”合同还写明债务到期日和保证期间，但没有写保证方式，双方也未以其他条款或补充约定确定方式。借款及保证合同的成立、效力没有争议。\n\n林序认为：“既然顾岩愿意替别人担保，即使没有写方式，也应当一律算连带责任保证。”本问只判断未约定保证方式的法定处理，不讨论现在能否直接起诉或要求付款。",
    prompt:
      "林序认为本案当然属于连带责任保证，是否正确？请说明应适用的保证方式及依据。",
    answer: "",
    reference:
      "不正确。合同未约定保证方式，也不存在其他确定方式的约定，应依第686条按一般保证承担保证责任。承诺提供保证并不当然等于承诺连带责任。本问并未要求判断先诉抗辩的例外或当前付款请求。",
    sources: ["civil-guarantee-code686-687", "civil-guarantee-code688"],
    criteria: [
      {
        id: "guarantee-default-general",
        label: "联系未约定方式适用一般保证",
        meaning: "联系本案未约定保证方式，说明应按一般保证而非当然连带处理。",
        acceptable:
          "“没写方式，法律按一般保证算，不能只因为替人担保就说连带”即可；不要求条号或独立重复结论。",
        boundary:
          "本问只需一种有依据的完整判断；不另设保证效力、先诉例外、期间或追偿必答。",
      },
    ],
  },
  {
    hint: "结合本问给定事实和所问范围说明，不要求固定措辞或条号。",
    id: "civil-guarantee-joint-choice",
    caseId: "CIVIL-GUARANTEE-JOINT-1",
    relatedTopicIds: ["civil-guarantee-basic"],
    kind: "objective",
    title: "明确连带，仍须先执行借款人吗？",
    facts:
      "本案为另一独立教学虚构。梁岑向郑澄借款3万元，郑澄已交付款项。陶安与郑澄签署书面保证合同，明确约定：“陶安对梁岑所欠这3万元本金承担连带保证责任”，保证期间为主债务到期之日起一年。主合同与保证合同均有效。\n\n还款期限届满，梁岑没有还款。到期后一周，郑澄向陶安请求在约定范围内偿还这3万元本金。陶安只提出：“我只是保证人，你必须先起诉梁岑，把他的财产强制执行后仍拿不到钱，才可以来找我。”没有其他抗辩争议。本问只判断这种先后顺序理由，不计算利息、其他费用、追偿或变更后的担保责任。",
    prompt: "陶安要求必须先诉并执行梁岑的理由，哪项判断正确？",
    answer: "d",
    reference:
      "选D。本案明示连带责任保证，债务已到期未履行，债权人可在约定保证范围内请求陶安承担，不必以先诉并执行梁岑仍不能履行为前提。",
    sources: ["civil-guarantee-code686-687", "civil-guarantee-code688"],
    choiceMode: "single",
    options: [
      {
        id: "a",
        text: "只要是保证人，任何情况下都可以坚持先执行债务人。",
        explanation: "把一般保证的特定顺序利益扩为所有保证。",
      },
      {
        id: "b",
        text: "写了连带保证仍与完全未约定方式相同。",
        explanation: "明确约定与方式欠缺的处理不同。",
      },
      {
        id: "c",
        text: "债权人请求保证人后，借款人原债务当然全部消失。",
        explanation: "提出请求本身不是履行清偿，本问也未要求债务免除。",
      },
      {
        id: "d",
        text: "该理由不成立；可在保证范围内请求陶安承担，不须先诉并执行梁岑。",
        explanation: "到期未履行且明确连带保证，对应第688条。",
      },
    ],
  },
  {
    hint: "结合本问给定事实和所问范围说明，不要求固定措辞或条号。",
    id: "civil-guarantee-joint-explain",
    caseId: "CIVIL-GUARANTEE-JOINT-1",
    relatedTopicIds: ["civil-guarantee-basic"],
    kind: "subjective",
    title: "把保证方式与请求顺序连起来",
    facts:
      "本案为另一独立教学虚构。梁岑向郑澄借款3万元，郑澄已交付款项。陶安与郑澄签署书面保证合同，明确约定：“陶安对梁岑所欠这3万元本金承担连带保证责任”，保证期间为主债务到期之日起一年。主合同与保证合同均有效。\n\n还款期限届满，梁岑没有还款。到期后一周，郑澄向陶安请求在约定范围内偿还这3万元本金。陶安只提出：“我只是保证人，你必须先起诉梁岑，把他的财产强制执行后仍拿不到钱，才可以来找我。”没有其他抗辩争议。本问只判断这种先后顺序理由，不计算利息、其他费用、追偿或变更后的担保责任。",
    prompt:
      "本案属于哪种保证方式？陶安能否仅以“必须先诉并执行梁岑仍不能履行”为由拒绝郑澄此次请求？请联系题设说明。",
    answer: "",
    reference:
      "属于明确约定的连带责任保证。梁岑未履行到期债务，郑澄在保证期间内请求3万元保证本金，依第688条可在约定保证范围内直接请求陶安承担；陶安不能仅以未先诉并执行梁岑为由拒绝。本问不评价未提出的其他抗辩，也不因请求即认定本金已经清偿。",
    sources: ["civil-guarantee-code686-687", "civil-guarantee-code688"],
    criteria: [
      {
        id: "guarantee-express-joint",
        label: "识别明确约定的连带方式",
        meaning: "联系保证合同明确连带保证责任，说明本案是连带责任保证。",
        acceptable:
          "“陶安签的就是连带保证”即可；可与后一理由合句，无须独立标题或条号。",
        boundary:
          "不能把全部方式欠缺默认规则用于明确约定场景；不另要求计算保证期间。",
      },
      {
        id: "guarantee-joint-order",
        label: "联系到期未履行排除先诉执行前提",
        meaning:
          "联系梁岑到期未还、请求在保证范围内，说明郑澄可请求陶安承担，不以先诉并执行梁岑仍不能履行为前提。",
        acceptable:
          "“借款已到期没还，这3万元担保范围内可以找陶安，没先执行梁岑不能挡住本次请求”即可；不要求逐字复述全部事实。",
        boundary:
          "不能把一般保证顺序利益硬加给连带保证；不要求回答追偿、全部其他抗辩、超出保证范围费用或一般保证所有例外。",
      },
    ],
  },
];

export const civilGuaranteeTopics: FaultTopic[] = [
  {
    id: "civil-guarantee-basic",
    title: "一般保证与连带责任保证基础",
    headline: "未约定方式按一般保证；明确连带时不能一律要求先执行债务人。",
    goal: "用合同实际约定判断保证方式，并辨别连带保证的请求顺序。",
    prerequisite:
      "知道债权人、债务人与保证人是不同角色；提供保证不等于原债务已经清偿。",
    minutes: "8–12",
    paragraphs: [
      "保证方式包括一般保证与连带责任保证。对方式没有约定或者约定不明确的，依法按照一般保证承担保证责任；不能把所有“愿意担保”都当然说成连带。明确约定连带责任的，应按该约定识别方式。",
      "一般保证通常有先诉抗辩：在主合同纠纷未经审判或仲裁，并就债务人财产依法强制执行仍不能履行前，可拒绝向债权人承担，但法律列有例外，包括债务人下落不明且无财产可供执行、法院已受理债务人破产案件、债权人有证据证明债务人的财产不足以履行全部债务或者丧失履行债务能力、保证人书面放弃等。不能把这种顺序利益写成永久不担责或无例外。",
      "连带责任保证中，债务人未履行到期债务或出现约定情形，债权人可请求债务人履行，也可请求保证人在保证范围内承担。不须一律先诉并执行债务人；仍须注意保证范围、期间及其他依法成立的抗辩。本单元只练方式欠缺与明确连带的基础顺序，不展开争议条款解释、期间计算、公司担保权限或复杂多重担保。",
    ],
    example: {
      title: "没有写保证方式，是否当然连带？",
      facts:
        "本案为独立教学虚构。周檀向林序借款2万元，款项已按约转入周檀账户。另一名成年人顾岩与林序签了一份书面保证合同，载明：“本人自愿为周檀向林序所借的这2万元提供保证。”合同还写明债务到期日和保证期间，但没有写保证方式，双方也未以其他条款或补充约定确定方式。借款及保证合同的成立、效力没有争议。\n\n林序认为：“既然顾岩愿意替别人担保，即使没有写方式，也应当一律算连带责任保证。”本问只判断未约定保证方式的法定处理，不讨论现在能否直接起诉或要求付款。",
      analysis:
        "选A。合同未约定保证方式，依民法典第686条按一般保证承担保证责任，不能因替他人担保就一律推为连带责任保证。",
    },
    pitfall: "把未约定方式认成连带，或把一般保证的先诉顺序加到明确连带保证上。",
    recall: {
      prompt: "未约定保证方式按什么处理？明确连带时能一概要求先执行债务人吗？",
      reference:
        "未约定或不明确按一般保证；明确连带且债务到期未履行时，可在保证范围内请求保证人，不一律以先诉并执行债务人为前提。",
    },
    sources: ["civil-guarantee-code686-687", "civil-guarantee-code688"],
    exercises: civilGuaranteeExercises,
  },
];
export const civilGuaranteeChapter = {
  id: "CIVIL-GUARANTEE",
  title: "保证责任基础",
  section: "民法",
  topicIds: ["civil-guarantee-basic"],
};
export const civilGuaranteeContentPack = {
  revision: civilGuaranteeRevision,
  snapshot: { topics: civilGuaranteeTopics, sources: civilGuaranteeSources },
};
export const civilGuaranteeDefaultQueues = {
  objective: civilGuaranteeExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilGuaranteeExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilGuaranteeQuestion(id: string) {
  const q = civilGuaranteeExercises.find((q) => q.id === id);
  return q ? structuredClone(q) : undefined;
}
export function civilGuaranteeTopicForQuestion(id: string) {
  const t = civilGuaranteeTopics.find((t) =>
    t.exercises.some((q) => q.id === id),
  );
  return t ? structuredClone(t) : undefined;
}
export function civilGuaranteeSameCaseQuestions(id: string) {
  const q = civilGuaranteeQuestion(id);
  return q
    ? structuredClone(
        civilGuaranteeExercises.filter((x) => x.caseId === q.caseId),
      )
    : [];
}
export const civilGuaranteePublicRules = [
  {
    sourceId: "civil-guarantee-code686-687",
    title: "第686、687条：方式欠缺与一般保证（教学摘要）",
    url: "https://www.cac.gov.cn/2020-06/01/c_15925617772683192.htm",
    excerpt:
      "保证方式未约定或者不明确，按一般保证承担。一般保证通常享有先诉抗辩，但法定债务人下落不明且无财产可供执行、法院已受理债务人破产案件、债权人有证据证明债务人的财产不足以履行全部债务或者丧失履行债务能力、保证人书面放弃等情形除外。",
    checkedAt: "2026-10-11",
    scope:
      "一般保证基本方式与顺序边界，不含具体题答案、期间计算或争议文义裁判。",
  },
  {
    sourceId: "civil-guarantee-code688",
    title: "第688条：连带责任保证（教学摘要）",
    url: "https://www.cac.gov.cn/2020-06/01/c_15925617772683192.htm",
    excerpt:
      "保证人与债务人对债务约定连带责任的，为连带责任保证。债务人不履行到期债务或出现约定情形，债权人可请求债务人履行，也可请求保证人在保证范围内承担。",
    checkedAt: "2026-10-11",
    scope: "明确连带方式的基本请求规则，不含本题判断、所有抗辩或金额计算。",
  },
];
