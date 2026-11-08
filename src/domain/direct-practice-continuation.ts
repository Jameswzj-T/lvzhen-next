import { directLearningAdvice } from "./direct-learning-advice";
import { submittedFeedbackFor } from "./submitted-feedback";
import { activePracticeQueue, practiceResult, visitPractice } from "./practice";
import type { FaultProgress } from "./fault-progress";

export function directPracticeStep(state: FaultProgress) {
  if (
    state.practice?.mode !== "subjective" ||
    state.practice.scope === "review"
  )
    return null;
  const { q, answer } = practiceResult(state);
  if (!answer) return null;
  const result = submittedFeedbackFor(state, answer.id);
  const advice = directLearningAdvice(result, state);
  if (!advice || !result) return null;
  let target = advice.nextQuestion?.id;
  let label =
    advice.nextQuestion?.basis === "prior_same_topic"
      ? "回到这处问题"
      : advice.nextQuestion?.basis === "weakness_transfer"
        ? "换个案情练习"
        : "下一题";
  if (!target) {
    if (
      advice.transfer?.outcome !== "supported_this_time" ||
      result.view.points.some((p) => p.status !== "covered")
    )
      return null;
    const queue = activePracticeQueue(state);
    // Optional review remains available. Ordinary forward continuation need not
    // force an already submitted case just because the contrast went backwards.
    target = queue
      .slice(queue.indexOf(q.id) + 1)
      .find((id) => !state.drafts[id]?.submittedId);
    label = target ? "下一道未答题" : "结束本章";
  }
  return {
    id: `${result.id}:${target ?? "end"}`,
    fromQuestionId: q.id,
    targetId: target,
    label,
  };
}

export function prepareDirectPracticeStep(
  state: FaultProgress,
  expectedId: string,
  at: string,
) {
  const step = directPracticeStep(state);
  if (!step || step.id !== expectedId || !state.practice) return null;
  return step.targetId
    ? visitPractice(
        {
          ...state,
          practice: {
            ...state.practice,
            ended: { ...state.practice.ended, subjective: false },
          },
        },
        step.targetId,
        at,
      )
    : {
        ...state,
        updatedAt: at,
        practice: {
          ...state.practice,
          ended: { ...state.practice.ended, subjective: true },
        },
      };
}
