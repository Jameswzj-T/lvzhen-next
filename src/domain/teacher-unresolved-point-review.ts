import type { UnitFeedbackResult } from "../evaluation/unit-feedback-contract";
import type { TeacherFeedbackView } from "./teacher-feedback-contract";

// One previously reviewed, explicitly fictional result only. No semantic detector.
// These exact source bytes remain unchanged in the stored result and raw reader.
const reviewed = {
  resultId: "911109b03785aa1b4e236e605f5710c73d6f22f1c963447ef508f9d359ade19f",
  responseId: "838ff10d-33c6-4a78-9d41-d76448e7091f",
  receiptHash:
    "054a072410e64e1f68e290b6addd7acab71556884241289846451ce5eb8abf46",
  questionId: "civil-tort-mall-slip",
  questionRevision: "civil-tort-personal-2026-10-09.v1",
  answerId: "point-fiction-T3-7f34fa0c-0d2b-4a56-b2d9-eaa585cfcc6c",
  contentId: "9db84fe0c57373b3f4a91824af387699d732bc738d235a64cbc6714bed974c58",
  taskId: "bc819da4400108731510247263d1600f71eed1048934cec2347cffcc1952a32f",
  candidateTaskId:
    "b860130185ca7967862fd925befb3187ff67d24f2885e27e186d9f0d6b68db52",
  version: "teacher-source-id-feedback-20261009.v3.0-points",
  originalText:
    "对商场这边，通道的积水已被发现，却十多分钟没有清理，也没有提醒顾客或作隔离；陈某正因这摊水摔伤。这样放着危险不管，没有尽到安全保障义务，由此造成的伤害本来应由商场承担侵权责任。\n\n费用也清楚：这次医疗支出2400元、护理600元、交通200元均已证明必要合理，都是治疗康复的损失，应计入合计3200元；这是损失范围，不能直接拿来当商场的付款数。\n\n但陈某看手机造成的疏忽如何影响商场最后担责，我还没有结论。按一种理解，两边的疏忽都促成受伤，因此商场要赔，只是可以少承担一些；按另一种理解，既然陈某也有过错，商场就不必再赔偿。我无法判断该用哪一种，两种处理都暂时留在这份答案里。我的疑惑不是比例算不出，而是商场最后究竟还需不需要赔。",
  conclusion: {
    state: "not_stated",
    quotes: [
      "但陈某看手机造成的疏忽如何影响商场最后担责，我还没有结论。",
      "我无法判断该用哪一种，两种处理都暂时留在这份答案里。我的疑惑不是比例算不出，而是商场最后究竟还需不需要赔。",
    ],
    explanation: "",
  },
  point: {
    id: "mall-victim-fault",
    status: "uncertain",
    evidence: [
      {
        quote: "但陈某看手机造成的疏忽如何影响商场最后担责，我还没有结论。",
        role: "context",
      },
      {
        quote:
          "按一种理解，两边的疏忽都促成受伤，因此商场要赔，只是可以少承担一些；按另一种理解，既然陈某也有过错，商场就不必再赔偿。我无法判断该用哪一种，两种处理都暂时留在这份答案里。",
        role: "context",
      },
    ],
    explanation:
      "你在本项确实把握住了两种可能：一种是商场仍应赔偿，只是因陈某疏忽而减轻；另一种是商场完全免责。但题设已经给定双方过错均促成同一损害，民法典第1173条只支持减轻侵权人责任，不能仅凭受害人也有过错而完全免除商场责任。你说自己无法判断该用哪一种，因此对‘完全免责主张能否成立’这一必答结论尚未选定，不构成明确反对，也不构成明确赞同。需要提醒的是：这里不必先算出比例，责任有无本身依据题设和规则即可判断，你困惑的‘商场最后还需不需要赔’有确定答案，不能把比例未定当作责任不明。",
    action:
      "本项需选定结论：商场仅以陈某也有过错为由主张完全免责不能成立；陈某未注意脚下的疏忽可在同一损害内减轻商场责任，但不是免除。可以给出条件式表述，例如‘责任成立，具体减轻比例待定’，但不能把相互排斥的‘可少赔’与‘不必再赔’同时保留为未决处理。",
    review: {
      state: "needs_review",
      reason:
        "你在本项确实把握住了两种可能：一种是商场仍应赔偿，只是因陈某疏忽而减轻；另一种是商场完全免责。但题设已经给定双方过错均促成同一损害，民法典第1173条只支持减轻侵权人责任，不能仅凭受害人也有过错而完全免除商场责任。你说自己无法判断该用哪一种，因此对‘完全免责主张能否成立’这一必答结论尚未选定，不构成明确反对，也不构成明确赞同。需要提醒的是：这里不必先算出比例，责任有无本身依据题设和规则即可判断，你困惑的‘商场最后还需不需要赔’有确定答案，不能把比例未定当作责任不明。",
    },
    basis: {
      sourceId: "victimFault",
    },
  },
  statuses: [
    ["mall-duty", "covered"],
    ["mall-victim-fault", "uncertain"],
    ["mall-expenses", "covered"],
  ],
} as const;
export function teacherUnresolvedPointReview(
  result: UnitFeedbackResult,
): TeacherFeedbackView["independentPointNote"] {
  const focused = focusedUnresolvedPointReview(result);
  if (focused) return focused;
  const m = result.sourceTeacher,
    v = result.view;
  if (
    result.source !== "real_provider" ||
    result.purpose !== "practice" ||
    result.id !== reviewed.resultId ||
    result.receipt.responseId !== reviewed.responseId ||
    result.receipt.receiptHash !== reviewed.receiptHash ||
    v.questionId !== reviewed.questionId ||
    v.questionRevision !== reviewed.questionRevision ||
    v.answerId !== reviewed.answerId ||
    v.contentId !== reviewed.contentId ||
    v.taskId !== reviewed.taskId ||
    v.originalText !== reviewed.originalText ||
    m?.version !== reviewed.version ||
    m.candidateTaskId !== reviewed.candidateTaskId ||
    m.overall.kind !== "needs_review" ||
    JSON.stringify(m.conclusion) !== JSON.stringify(reviewed.conclusion) ||
    JSON.stringify(m.points.find((p) => p.id === reviewed.point.id)) !==
      JSON.stringify(reviewed.point) ||
    JSON.stringify(m.points.map((p) => [p.id, p.status])) !==
      JSON.stringify(reviewed.statuses)
  )
    return undefined;
  return {
    source: "codex_independent",
    resultId: result.id,
    answerId: v.answerId,
    criterionId: reviewed.point.id,
    reviewedExplanation: reviewed.point.explanation,
    reviewedAction: reviewed.point.action,
    originalConclusionState: reviewed.conclusion.state,
    explanation:
      "你在“商场可以少赔”和“商场完全不用赔”之间还没选定。这不是没写结论，也不是把比例算不出当成责任不明——你已明确说困惑不在比例。题设中，商场没有处理已知积水的失职与顾客的疏忽共同造成损害；顾客有过错可以减轻商场责任，不能让商场仅凭这一点完全免责。",
    action:
      "重新说明顾客的疏忽为什么只能影响商场承担多少，不能抹掉商场自身的责任；本题不要求计算比例。",
    text: "原模型结论字段保留 not_stated；独立审读认为原答表达的是两种结论尚未选定（uncertain）。这里纠正的是这份反馈的分类说明与多余比例提醒，不把原答记作答错或漏答。",
  };
}

// A separate adoption hold for one new fictional F2 receipt. This is not a
// semantic classifier and does not rewrite the original opposed/contradicted.
const focusedReviewed = {
  resultId: "e524d968be95028fcb67cb01479006a7ad9ff08e6b0b4baae2df20d0c4d627fd",
  receipt: {
    responseId: "20710805-c6b8-4cc1-ad40-e36288f7e0d3",
    receiptHash:
      "378d6e26ebdbcc8c9d119f80270147ddde5b1e15244399987ea33cc0b17c0b45",
  },
  view: {
    taskId: "410fdd7a9ee2baa098d987fc20b0beb8c694b854cec1cbc1479250968791d5e4",
    contentId:
      "9db84fe0c57373b3f4a91824af387699d732bc738d235a64cbc6714bed974c58",
    questionId: "civil-tort-mall-slip",
    questionRevision: "civil-tort-personal-2026-10-09.v1",
    answerId: "focused-fiction-F2-96f00380-c367-4239-8e87-58a1d347e036",
    originalText:
      "店方已知积水却不处置，顾客因积水受伤，店方自身失职与损害相连。顾客也有过错：我还在全部免除店方赔偿与仅减少赔偿之间犹豫，两者都没撤回；我不是在纠结比例。这次必要合理的医疗、护理、交通共3200元属于损失范围，最后谁承担多少另论。",
  },
  version: "teacher-source-id-feedback-20261009.v3.2-focused",
  candidateTaskId:
    "b4a9389304bf129d891431755a01e9f77f9efcaf94fb944a40b9419bfee8fe6e",
  conclusion: {
    state: "opposed",
    quotes: [
      "我还在全部免除店方赔偿与仅减少赔偿之间犹豫，两者都没撤回",
      "店方已知积水却不处置，顾客因积水受伤，店方自身失职与损害相连",
    ],
    explanation: "",
  },
  point: {
    id: "mall-victim-fault",
    status: "contradicted",
    evidence: [
      {
        quote:
          "顾客也有过错：我还在全部免除店方赔偿与仅减少赔偿之间犹豫，两者都没撤回；我不是在纠结比例。",
        role: "opposes",
      },
      {
        quote: "店方已知积水却不处置，顾客因积水受伤，店方自身失职与损害相连。",
        role: "supports",
      },
    ],
    explanation:
      "你的最终立场在这里停错了：你说自己在“全部免除店方赔偿”和“仅减少赔偿”之间犹豫、两者都不撤回，这等于没有排除商场“可以完全不赔”这一错误结论，而不是单纯在比例上拿不准。题设明确双方过错共同促成同一损害，陈某边走边看手机、未注意本可看见并避开的积水，确有过错；但依被侵权人过错规则，这种过错的效果是“可以减轻侵权人的责任”，并不是“可以免除”。商场自己明知积水不处置，是损害发生的重要原因，其责任不能因顾客也有疏忽就被整体抹掉。你只需要选定一点：商场不能完全免责，陈某的过错只影响责任减轻与分担，不消灭商场的责任基础。",
    action:
      "把“两者都没撤回”改成明确选择：商场“完全不赔”的主张不成立；陈某的疏忽只产生减轻商场责任、在双方间分担损失的效果。不要再把免责与减责并列为两个都保留的选项。",
    review: {
      state: "clear",
      reason: null,
    },
    basis: {
      sourceId: "victimFault",
    },
  },
  statuses: [
    ["mall-duty", "covered"],
    ["mall-victim-fault", "contradicted"],
    ["mall-expenses", "covered"],
  ],
} as const;
function focusedUnresolvedPointReview(
  result: UnitFeedbackResult,
): TeacherFeedbackView["independentPointNote"] {
  const m = result.sourceTeacher,
    v = result.view,
    r = focusedReviewed;
  if (
    result.source !== "real_provider" ||
    result.purpose !== "practice" ||
    result.id !== r.resultId ||
    result.receipt.responseId !== r.receipt.responseId ||
    result.receipt.receiptHash !== r.receipt.receiptHash ||
    Object.entries(r.view).some(
      ([key, value]) => v[key as keyof typeof r.view] !== value,
    ) ||
    m?.version !== r.version ||
    m.candidateTaskId !== r.candidateTaskId ||
    m.overall.kind !== "partial" ||
    JSON.stringify(m.conclusion) !== JSON.stringify(r.conclusion) ||
    JSON.stringify(m.points.find((p) => p.id === r.point.id)) !==
      JSON.stringify(r.point) ||
    JSON.stringify(m.points.map((p) => [p.id, p.status])) !==
      JSON.stringify(r.statuses)
  )
    return undefined;
  return {
    source: "codex_independent",
    resultId: result.id,
    answerId: v.answerId,
    criterionId: r.point.id,
    reviewedExplanation: r.point.explanation,
    reviewedAction: r.point.action,
    originalConclusionState: r.conclusion.state,
    explanation:
      "原答明确保留全免与减责两种处理，尚未选定。原模型却把没有排除全免等同于已经采纳全免，因此这份反馈的 opposed、contradicted 及对应改错建议暂不作为学生已答错的依据；两个独立正确点保留。",
    action:
      "先核对原答中的未决立场和本题参考。这是对一份反馈的采用限制，不是模型已经自行修正，也不把未知或未决当作掌握。",
    text: "仅这份精确虚构F2回执：冻结预期 uncertain／0,4,0，实际 opposed／0,3,0。差异保留，原标签、解释、动作、原答、费用及已保存记录不改。前台转待核，后续同题反馈比较不再把此项当作已证弱点。",
  };
}
