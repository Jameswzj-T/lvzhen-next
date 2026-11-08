import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";

export const civilProcedureAgentAuthorityRevision =
  "civil-procedure-agent-authority-2026-10-12.v1";
export const civilProcedureAgentAuthoritySources: ContentSources = {
  "civpro-agent-law62": {
    title: "《民事诉讼法》第62条：委托事项与特别授权",
    url: "https://fgw.sh.gov.cn/cmsres/95/95d5fd4cc4bb4c8292ea9684def3fa02/0212340e50e0b014b7a206164f270398.pdf",
    note: "2026-10-12直接读取上海市发改委公开的2023年修正全文第62条。授权委托书须记明事项与权限，代为处分所列诉讼权利须特别授权。本组只比较现有授权，不判尚未实施行为效力、追认或律师责任。",
  },
  "civpro-agent-interpretation89": {
    title: "《民诉法解释》第89条：仅写全权代理不等于具体特别授权",
    url: "https://www.court.gov.cn/fabu/xiangqing/353651.html",
    note: "2026-10-12直接读取最高法2022年修正全文第89条，页面明确2022-04-10施行；与现行民诉法第62条对应核对。本组不处理该条第二款简易程序口头委托例外。案例和采分要求均为自编教学材料，不是官方试题或评分细则。",
  },
};
export const civilProcedureAgentAuthorityCaseFacts = {
  "CIVPRO-AGENT-GENERAL-1":
    "本案为独立教学虚构。顾遥因设备货款纠纷委托律师林晏参加民事诉讼，已向法院提交由顾遥签名的授权委托书。委托事项写明本案代理，权限栏只有“全权代理”四字，没有列出任何具体特别授权。不存在另行书面授权、当场口头委托记入笔录或顾遥本人同意和解的事实。\n\n开庭前，对方提出少付一部分价款的和解方案。林晏认为“全权”已经包含一切权限，准备直接代顾遥接受。这里只判断现有委托书是否赋予代为和解的权限；不判断尚未签署协议的效力、事后追认或律师责任。",
  "CIVPRO-AGENT-SPECIFIC-1":
    "本案为另一独立教学虚构。许衡因装修款纠纷委托律师周澄代理。双方签署并提交法院的授权委托书明确写明：“特别授权代理人代为变更本案诉讼请求。”其他栏没有代为上诉的授权，也没有另行补充授权。\n\n周澄准备按该权限调整本案请求金额，并认为既然已有一项特别授权，日后对判决不服也可直接代许衡提起上诉。本问只比较这两类行为的现有代理权限，不讨论请求变更的其他程序条件、是否应上诉或上诉期限。",
};
export const civilProcedureAgentAuthorityExercises: UnitExercise[] = [
  {
    caseId: "CIVPRO-AGENT-GENERAL-1",
    relatedTopicIds: ["civpro-agent-authority"],
    facts:
      "本案为独立教学虚构。顾遥因设备货款纠纷委托律师林晏参加民事诉讼，已向法院提交由顾遥签名的授权委托书。委托事项写明本案代理，权限栏只有“全权代理”四字，没有列出任何具体特别授权。不存在另行书面授权、当场口头委托记入笔录或顾遥本人同意和解的事实。\n\n开庭前，对方提出少付一部分价款的和解方案。林晏认为“全权”已经包含一切权限，准备直接代顾遥接受。这里只判断现有委托书是否赋予代为和解的权限；不判断尚未签署协议的效力、事后追认或律师责任。",
    sources: ["civpro-agent-law62", "civpro-agent-interpretation89"],
    hint: "把本问实际要求与题设已有事实对应；不必使用固定措辞或列出题外责任。",
    id: "civpro-general-settlement-choice",
    kind: "objective",
    choiceMode: "single",
    title: "“全权代理”就能代为和解吗？",
    prompt: "仅按题设现有授权，下列判断哪项正确？",
    options: [
      {
        id: "a",
        text: "写了全权代理，就当然有代为和解权限。",
        explanation: "全权四字不代替具体特别授权。",
      },
      {
        id: "b",
        text: "仅凭这份委托书不能代为和解，须有相应特别授权。",
        explanation: "法条将和解列入须特别授权的事项。",
      },
      {
        id: "c",
        text: "没有和解权限就意味着律师不能代理本案任何事项。",
        explanation: "不能从特定权限不足扩大到全部代理无效。",
      },
      {
        id: "d",
        text: "有律师执业资格即可不受委托权限限制。",
        explanation: "代理资格不代替委托权限。",
      },
    ],
    answer: "b",
    reference:
      "选B。仅凭这份委托书不能代为和解。和解须委托人的特别授权，权限栏只写“全权代理”而无具体授权不足以取得该项权限；题设又没有其他补充授权。这不等于律师完全没有本案一般代理权限。",
  },
  {
    caseId: "CIVPRO-AGENT-GENERAL-1",
    relatedTopicIds: ["civpro-agent-authority"],
    facts:
      "本案为独立教学虚构。顾遥因设备货款纠纷委托律师林晏参加民事诉讼，已向法院提交由顾遥签名的授权委托书。委托事项写明本案代理，权限栏只有“全权代理”四字，没有列出任何具体特别授权。不存在另行书面授权、当场口头委托记入笔录或顾遥本人同意和解的事实。\n\n开庭前，对方提出少付一部分价款的和解方案。林晏认为“全权”已经包含一切权限，准备直接代顾遥接受。这里只判断现有委托书是否赋予代为和解的权限；不判断尚未签署协议的效力、事后追认或律师责任。",
    sources: ["civpro-agent-law62", "civpro-agent-interpretation89"],
    hint: "把本问实际要求与题设已有事实对应；不必使用固定措辞或列出题外责任。",
    id: "civpro-general-settlement-explain",
    kind: "subjective",
    title: "“全权代理”就能代为和解吗？：说明理由",
    prompt:
      "现有委托书是否足以让林晏代顾遥和解？为什么“全权代理”四字不能直接解决这项权限问题？请结合题设说明。",
    answer: "",
    reference:
      "仅凭这份委托书不能代为和解。和解须委托人的特别授权，权限栏只写“全权代理”而无具体授权不足以取得该项权限；题设又没有其他补充授权。这不等于律师完全没有本案一般代理权限。",
    criteria: [
      {
        id: "general-special-rule",
        label: "说明和解须具体特别授权",
        meaning:
          "说明代为和解属于需要特别授权的事项，仅写“全权代理”而无具体授权不满足该要求。",
        acceptable:
          "“和解得另外明确授权，光写全权不够”可合说；不要求列其他全部事项或法条号。",
        boundary: "不把全权措辞、律师资格或一般受托代理当成当然的和解权限。",
      },
      {
        id: "general-case-boundary",
        label: "据现有委托书判断本项权限",
        meaning:
          "联系本委托书无具体和解授权且无补充授权，判断林晏目前不能仅据它代为和解。",
        acceptable:
          "“这张委托书只写全权，别的授权也没有，所以这次不能代他答应”即可，与规则一句表达也可。",
        boundary:
          "不能要求判断协议无效、事后追认或律师责任；题设尚未签署，不虚构已签的结果。不因特定权限不足说全部代理无效。",
      },
    ],
  },
  {
    caseId: "CIVPRO-AGENT-SPECIFIC-1",
    relatedTopicIds: ["civpro-agent-authority"],
    facts:
      "本案为另一独立教学虚构。许衡因装修款纠纷委托律师周澄代理。双方签署并提交法院的授权委托书明确写明：“特别授权代理人代为变更本案诉讼请求。”其他栏没有代为上诉的授权，也没有另行补充授权。\n\n周澄准备按该权限调整本案请求金额，并认为既然已有一项特别授权，日后对判决不服也可直接代许衡提起上诉。本问只比较这两类行为的现有代理权限，不讨论请求变更的其他程序条件、是否应上诉或上诉期限。",
    sources: ["civpro-agent-law62", "civpro-agent-interpretation89"],
    hint: "把本问实际要求与题设已有事实对应；不必使用固定措辞或列出题外责任。",
    id: "civpro-specific-appeal-choice",
    kind: "objective",
    choiceMode: "single",
    title: "一项特别授权能自动扩展到上诉吗？",
    prompt: "仅比较变更诉讼请求与提起上诉的代理权限，哪项正确？",
    options: [
      {
        id: "a",
        text: "已有一项特别授权，所列其他特别事项都自动包含。",
        explanation: "特别授权的范围仍按具体事项判断。",
      },
      {
        id: "b",
        text: "变更请求和上诉都没有权限，因为必须同时列全所有特别事项。",
        explanation: "可以对特定事项分别授权，不必一次列全。",
      },
      {
        id: "c",
        text: "有变更请求的明确授权，但不能仅据此推定代为上诉权限。",
        explanation: "两类事项分别核对授权范围。",
      },
      {
        id: "d",
        text: "律师认为上诉有利就可以代替当事人作授权决定。",
        explanation: "代理人的利益判断不能扩张授权。",
      },
    ],
    answer: "c",
    reference:
      "选C。委托书已明确特别授权代为变更本案诉讼请求，所以就授权本身而言，周澄具有该项权限；提起上诉也须特别授权，本案没有上诉或补充授权，不能从变更请求的权限自动推定上诉权限。",
  },
  {
    caseId: "CIVPRO-AGENT-SPECIFIC-1",
    relatedTopicIds: ["civpro-agent-authority"],
    facts:
      "本案为另一独立教学虚构。许衡因装修款纠纷委托律师周澄代理。双方签署并提交法院的授权委托书明确写明：“特别授权代理人代为变更本案诉讼请求。”其他栏没有代为上诉的授权，也没有另行补充授权。\n\n周澄准备按该权限调整本案请求金额，并认为既然已有一项特别授权，日后对判决不服也可直接代许衡提起上诉。本问只比较这两类行为的现有代理权限，不讨论请求变更的其他程序条件、是否应上诉或上诉期限。",
    sources: ["civpro-agent-law62", "civpro-agent-interpretation89"],
    hint: "把本问实际要求与题设已有事实对应；不必使用固定措辞或列出题外责任。",
    id: "civpro-specific-appeal-explain",
    kind: "subjective",
    title: "一项特别授权能自动扩展到上诉吗？：说明理由",
    prompt:
      "就代理权限本身，周澄能否代为变更本案诉讼请求？该项特别授权能否自动使他有权代许衡提起上诉？请分别联系授权内容说明。",
    answer: "",
    reference:
      "委托书已明确特别授权代为变更本案诉讼请求，所以就授权本身而言，周澄具有该项权限；提起上诉也须特别授权，本案没有上诉或补充授权，不能从变更请求的权限自动推定上诉权限。",
    criteria: [
      {
        id: "specific-change-authorized",
        label: "承认已明确授予的请求变更权限",
        meaning:
          "联系委托书明确列出代为变更本案诉讼请求，承认就授权本身具备该项权限。",
        acceptable:
          "“改诉请已经写进特别授权，权限这一关有了”即可，不要求展开其他程序条件。",
        boundary: "不能因没有上诉授权就连已经明确的变更权限也否认。",
      },
      {
        id: "specific-appeal-not-inferred",
        label: "不从一项授权推定上诉权限",
        meaning:
          "说明上诉需相应特别授权，本委托书未列且无补充，不能由变更请求授权自动推出。",
        acceptable:
          "“没授权上诉，不能拿改请求的授权顺带替他上诉”可表达；无需另列所有特别事项。",
        boundary:
          "不考是否值得上诉、期限或请求变更其他程序条件，未谈这些不另作漏答。",
      },
    ],
  },
];
export const civilProcedureAgentAuthorityTopics: FaultTopic[] = [
  {
    ...{
      id: "civpro-agent-authority",
      title: "诉讼代理的特别授权",
      headline: "看清授权的具体事项，不用“全权”替代逐项权限。",
      goal: "看清授权的具体事项，不用“全权”替代逐项权限。",
      prerequisite: "能区分当事人地位、具体行为及其所需条件。",
      minutes: "8–12",
      paragraphs: [
        "代理资格与代理权限不是同一件事。委托书应写明事项和权限；代为承认、放弃、变更诉讼请求，和解，反诉或上诉等事项，需要特别授权。",
        "只有“全权代理”而无具体授权，不等于可以处分上述诉讼权利。已有某一事项的特别授权，也不能自动扩大到其他特别事项。",
        "判断授权时承认已经明确授予的部分，同时指出尚未授予的部分。两案只练现有权限，不展开实施后的效力、补充或追认、期限和其他程序条件。",
      ],
      example: {
        title: "“全权代理”就能代为和解吗？",
        facts:
          "本案为独立教学虚构。顾遥因设备货款纠纷委托律师林晏参加民事诉讼，已向法院提交由顾遥签名的授权委托书。委托事项写明本案代理，权限栏只有“全权代理”四字，没有列出任何具体特别授权。不存在另行书面授权、当场口头委托记入笔录或顾遥本人同意和解的事实。\n\n开庭前，对方提出少付一部分价款的和解方案。林晏认为“全权”已经包含一切权限，准备直接代顾遥接受。这里只判断现有委托书是否赋予代为和解的权限；不判断尚未签署协议的效力、事后追认或律师责任。",
        analysis:
          "选B。仅凭这份委托书不能代为和解。和解须委托人的特别授权，权限栏只写“全权代理”而无具体授权不足以取得该项权限；题设又没有其他补充授权。这不等于律师完全没有本案一般代理权限。",
      },
      pitfall: "把“全权”当作所有特别授权，或因一项未授权就否认所有已授权事项。",
      recall: {
        prompt: "只写全权、明确某一特别事项，分别应怎样核对？",
        reference:
          "只写全权不代替具体特别授权；明确某一事项则承认该范围，但不能自动扩展到未授权的其他事项。",
      },
      sources: ["civpro-agent-law62", "civpro-agent-interpretation89"],
    },
    exercises: civilProcedureAgentAuthorityExercises,
  },
];
export const civilProcedureAgentAuthorityContentPack = {
  revision: civilProcedureAgentAuthorityRevision,
  snapshot: {
    topics: civilProcedureAgentAuthorityTopics,
    sources: civilProcedureAgentAuthoritySources,
  },
};
export const civilProcedureAgentAuthorityPublicRules = [
  {
    sourceId: "civpro-agent-law62",
    title: "《民事诉讼法》第62条：委托事项与特别授权（教学摘要）",
    url: "https://fgw.sh.gov.cn/cmsres/95/95d5fd4cc4bb4c8292ea9684def3fa02/0212340e50e0b014b7a206164f270398.pdf",
    excerpt:
      "授权委托书应记载委托事项和权限。代理人代为承认、放弃、变更诉讼请求，和解，反诉或上诉，需要委托人的特别授权；具体权限应按已授予的事项核对。",
    checkedAt: "2026-10-12",
    scope: "仅一般规则，不含具体案件、参考答案、采分要求或其他答卷。",
  },
  {
    sourceId: "civpro-agent-interpretation89",
    title: "《民诉法解释》第89条：仅写全权代理不等于具体特别授权（教学摘要）",
    url: "https://www.court.gov.cn/fabu/xiangqing/353651.html",
    excerpt:
      "委托书只写“全权代理”而没有具体授权时，不因此取得代为承认、放弃、变更诉讼请求、和解、反诉或上诉的权限。简易程序当事人同时到庭径行开庭时，另有当场口头委托并记入笔录规则。",
    checkedAt: "2026-10-12",
    scope: "仅一般规则，不含具体案件、参考答案、采分要求或其他答卷。",
  },
];
export const civilProcedureAgentAuthorityChapter = {
  id: "CIVPRO-AGENT-AUTHORITY",
  title: "诉讼代理的特别授权",
  section: "民事诉讼法",
  topicIds: ["civpro-agent-authority"],
};
export const civilProcedureAgentAuthorityDefaultQueues = {
  objective: civilProcedureAgentAuthorityExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilProcedureAgentAuthorityExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilProcedureAgentAuthorityQuestion(id: string) {
  const q = civilProcedureAgentAuthorityExercises.find((q) => q.id === id);
  return q ? structuredClone(q) : undefined;
}
export function civilProcedureAgentAuthorityTopicForQuestion(id: string) {
  const t = civilProcedureAgentAuthorityTopics.find((t) =>
    t.exercises.some((q) => q.id === id),
  );
  return t ? structuredClone(t) : undefined;
}
export function civilProcedureAgentAuthoritySameCaseQuestions(id: string) {
  const q = civilProcedureAgentAuthorityQuestion(id);
  return q
    ? structuredClone(
        civilProcedureAgentAuthorityExercises.filter(
          (x) => x.caseId === q.caseId,
        ),
      )
    : [];
}
