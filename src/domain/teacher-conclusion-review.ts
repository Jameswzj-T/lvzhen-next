import directReviewNotes from "./direct-feedback-review-notes.json";
import type { UnitFeedbackResult } from "../evaluation/unit-feedback-contract";
import type { TeacherFeedbackView } from "./teacher-feedback-contract";
// Public exports contain no private replay rows; an empty source is valid too.
const reviewNotes: readonly {
  result: unknown;
  reviewedExplanation: string;
  text: string;
}[] = directReviewNotes.notes;

// A separately authored review of one explicitly fictional saved result.
// These are exact record/receipt and text matches, not a semantic detector or
// a rule applied to other uncertain answers. No receipt or score is rewritten.
const originalText =
  "商场发现通道的水后，既不清扫也不设置提示，十多分钟里仍让顾客照常走过，我认为这已经不是合理注意了；水又是这次摔倒的一个原因，所以商场未尽安全保障义务及其与损害的联系是清楚的。难点在顾客看手机这件事：我可以理解成他本来自己能避免，于是商场不必出任何赔偿；也可以理解成商场和顾客两边都有原因，顾客的疏忽只能让商场少承担一些。我现在还没选定这两个相反的结论，写在前面的那个并未撤回，后面那个也不是我的最终决定。我拿不准的是到底免除全部还是只减少责任，并非仅不知道减少多少。医疗2400元、护理600元和交通200元都与本次治疗康复有关，题目已确认必要合理，三项合计3200元，应先计入损失范围。这笔合理损失不会因双方要分担就不存在；损失总额与商场最终应付数额还要分开，不能直接把3200元都判给商场支付。";
const reviewedExplanation =
  "原答虽不赞同“仅凭顾客过错自动全免”的意味，但明确说自己尚未在“全免”和“减责”两个相反结论中选定，还单独强调拿不准的是免除全部还是只减少责任，故最终结论处于未决状态，不能认定已支持商场不能完全免责。";

/** The caller has already validated the result against the saved original. */
export function teacherConclusionReview(
  result: UnitFeedbackResult,
): TeacherFeedbackView["independentConclusionNote"] {
  const model = result.sourceTeacher;
  if (
    result.source !== "real_provider" ||
    result.purpose !== "practice" ||
    result.id !==
      "caa01a99f1b3f4a64ea1a5527de3ae5c6efa9b2851e02bcee6cb9cd121c94314" ||
    result.receipt.responseId !== "480b99ae-9d8d-4c68-8e4d-9bf40075bb3f" ||
    result.receipt.receiptHash !==
      "b7a422dcd32b35c3d7583da00866815253094d488cd3e4b183b641d325704d8f" ||
    result.view.questionId !== "civil-tort-mall-slip" ||
    result.view.questionRevision !== "civil-tort-personal-2026-10-09.v1" ||
    result.view.answerId !==
      "single-decision-fiction-U1-3b0059c7-209e-42f8-815c-d33587cf0509" ||
    result.view.contentId !==
      "9db84fe0c57373b3f4a91824af387699d732bc738d235a64cbc6714bed974c58" ||
    result.view.taskId !==
      "91ebb055533ca0163c586c2a991332199bbfc5630eafc0a0675418b44bec9d3c" ||
    result.view.originalText !== originalText ||
    model?.version !==
      "teacher-source-id-feedback-20261009.v2.7-single-decision" ||
    model.candidateTaskId !==
      "213bd24c27d1afc7f4541c4ef2ab8f1504cd37bfee126c89a175826a66b10c6a" ||
    model.conclusion.explanation !== reviewedExplanation ||
    model.conclusion.state !== "uncertain" ||
    model.overall.kind !== "needs_review" ||
    JSON.stringify(model.points.map((p) => [p.id, p.status])) !==
      JSON.stringify([
        ["mall-duty", "covered"],
        ["mall-victim-fault", "uncertain"],
        ["mall-expenses", "covered"],
      ])
  )
    return undefined;
  return {
    source: "codex_independent",
    resultId: result.id,
    answerId: result.view.answerId,
    reviewedExplanation,
    text: "这份原答明确保留“完全免责”和“仅减责”两种说法，尚未选定。原反馈开头推断其不赞同全免，缺乏原文依据；该倾向推断不予采用。商场责任基础和合理费用两个正确点保留，这份原答中的争点仍待确认。",
  };
}

// A different, explicitly fictional receipt. Reuse the read-only conclusion-note
// projection; do not append to immutable result/answer events or change learning.
const defenseOriginalText =
  "前面先把准备怎么罚、理由依据和能申辩这些告诉她，这一步得做，案子里也做了。她现在交来说明和照片，还得认真听、再核一核；材料真能说明批次弄错了，就该采纳，不能光凭她交了东西就说不用罚。至于后来，她既然还一直坚持申辩，我觉得在原来的处罚上重一点也可以，不然前面不是白解释了吗。";
const defenseReviewedExplanation =
  "你前面说先告知、再认真听并核对材料和批次，材料能证明弄错了才采纳、交了材料也不等于免罚，这层理解是对的。但最后那句认为她一直申辩就可以在原来处罚上重一点，方向正好反了：陈述申辩是她的权利，不能成为加重处罚的理由，没有别的事实依据就应维持原拟处罚。";

/** Exact verified receipt/text binding, never a detector for future answers.
 * Article 45 supports this appended limitation; it supplies no new criterion.
 * The original model's unsupported final outcome remains archived verbatim. */
export function directConclusionReview(
  result: UnitFeedbackResult,
): TeacherFeedbackView["independentConclusionNote"] {
  // Two reviewed fictional records, matched in full. This never classifies a
  // future answer, changes a native label, or writes a learning/feedback event.
  const serialized = JSON.stringify(result);
  const reviewed = reviewNotes.find(
    (note) => JSON.stringify(note.result) === serialized,
  );
  if (reviewed)
    return {
      source: "codex_independent",
      resultId: result.id,
      answerId: result.view.answerId,
      reviewedExplanation: reviewed.reviewedExplanation,
      text: reviewed.text,
    };
  const view = result.view;
  if (
    result.source !== "real_provider" ||
    result.purpose !== "practice" ||
    result.id !==
      "a242176c3a6f35e83dd0cdeb151737eddd22b5f4098ca1911ee1ce3297607715" ||
    result.receipt.responseId !== "57c24726-090c-48f4-b919-dcf0bee111f1" ||
    result.receipt.receiptHash !==
      "3952069a362f5633032eee9d1da8975be0dee6401f0ff52b92527ce79a53a908" ||
    view.questionId !== "admin-defense-review-explain" ||
    view.questionRevision !== "administrative-penalty-defense-2026-10-11.v1" ||
    view.answerId !==
      "admin-defense-new-fiction-AD1-a4859242-d51f-425e-8793-e25b0182f0bf" ||
    view.contentId !==
      "56d4cd7156800fef3aa184bb3f1307c955f5996ae76b926e617c437a09d6ef40" ||
    view.taskId !==
      "0af616a6eda6a45a47e598b6d89b2d1faa81fc0dfe4eb3892eacfb1d81a4e4a2" ||
    view.teachingStyle !== "direct-overall-v2" ||
    view.status !== "assessed" ||
    view.originalText !== defenseOriginalText ||
    view.studentResponse !== defenseReviewedExplanation ||
    view.clarification !== null ||
    result.sourceTeacher ||
    view.weightedScore ||
    result.pointReviews?.length ||
    JSON.stringify(view.points.map((p) => [p.id, p.status])) !==
      JSON.stringify([
        ["review-and-conditional-adoption", "covered"],
        ["no-heavier-penalty-for-defense", "contradicted"],
      ])
  )
    return undefined;
  return {
    source: "codex_independent",
    resultId: result.id,
    answerId: view.answerId,
    reviewedExplanation: defenseReviewedExplanation,
    text: "这里还要补充一点：不能因为申辩加重处罚，但新材料还要核实，最后怎么处理也要看核实结果，并不是一定维持原来的处罚。",
  };
}
