import type { ScoringLoopTask, completeScoringLoop } from "./scoring-loop";
import type { ScoringTrialResponse } from "./scoring-trial-contract";

type Ready = Extract<ScoringTrialResponse, { status: "ready" }>;

// Presentation only: preserve the model findings, score, task identity and saved
// response. Recompute this view after validating the immutable cached result.
export function presentScoringFeedback(
  task: ScoringLoopTask,
  scored: ReturnType<typeof completeScoringLoop>,
): Ready["items"] {
  const byId = new Map(scored.items.map((item) => [item.criterionId, item]));
  return scored.items.map((item) => {
    const { criterionId, title, earned, maxScore, evidence, pendingReason } =
      item;
    const visible: Ready["items"][number] = {
      criterionId,
      title,
      earned,
      maxScore,
      evidence,
      feedback:
        earned === null && pendingReason !== "conclusion"
          ? "这一项暂时无法可靠判断，请先对照参考分析。"
          : item.feedback,
      ...(pendingReason ? { pendingReason } : {}),
    };
    const dependency = task.card.items.find(
      (point) => point.criterionId === criterionId,
    )?.requiresConclusion;
    const conclusion = dependency ? byId.get(dependency) : undefined;
    if (!conclusion || conclusion.finding === "satisfied") return visible;

    if (conclusion.earned === null) {
      // A dependent zero must not look final while its prerequisite is pending.
      // Independent points and the underlying recorded zero are untouched.
      visible.reviewRequired = true;
      if (item.finding !== "satisfied")
        visible.feedback = `「${conclusion.title}」仍待核对，本项也先保留判断。请对照参考分析核对结论与理由。`;
    } else if (
      conclusion.finding === "incorrect" &&
      item.finding !== "satisfied"
    ) {
      // A failed scoring condition does not prove the learner omitted a reason.
      // An omitted/incomplete conclusion is not this conflict signal: keep the
      // ordinary omission guidance instead of suppressing it across the bank.
      visible.feedback = `按本题练习规则，本项须「${conclusion.title}」正确才能计分。目前该条件未满足；${
        earned === null
          ? "本项表达仍待核对，暂不确定分数。"
          : "本项不计分，但暂不据此判断这部分表达是否完整。"
      }本项要点：${task.card.items.find((p) => p.criterionId === criterionId)!.guidance}`;
    }
    return visible;
  });
}
