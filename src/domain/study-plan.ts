import { faultTopics, topicFor } from "../content/fault-catalog";
import { transferTopic } from "../content/fault-transfer";
import { latestCorrections } from "./corrections";
import {
  hasThreeDayGap,
  reviewSchedule,
  type FaultProgress,
} from "./fault-progress";

// A projection of existing learning evidence, not a second progress store.
export function studyPlan(state: FaultProgress, at: string) {
  const day = (value: string) => new Date(value).toLocaleDateString("en-CA");
  const today = (value: string) => day(value) === day(at);
  const rows = faultTopics.map((topic) => ({
    topic,
    done: !!state.finished[topic.id],
    answered: topic.exercises.filter((q) =>
      state.attempts.some((a) => a.exerciseId === q.id),
    ).length,
  }));
  const unfinished = rows.find((row) => !row.done);
  const current = rows.find((row) => row.topic.id === state.topicId) ?? {
    topic: topicFor(state.topicId)!,
    done: !!state.finished[state.topicId],
    answered: 0,
  };
  const hasDraft = current.topic.exercises.some((q) => {
    const draft = state.drafts[q.id];
    return (
      draft && !draft.submittedId && (!!draft.answer.trim() || !!draft.choice)
    );
  });
  const active =
    (hasDraft || (!current.done && current.answered > 0)) &&
    state.topicId !== "transfer"
      ? current
      : unfinished;
  const allFinishedAt = rows.every((row) => row.done)
    ? rows
        .map((row) => state.finished[row.topic.id])
        .sort()
        .at(-1)
    : undefined;
  const finalReviews = allFinishedAt
    ? rows.filter(
        (row) =>
          !state.reviews.some(
            (r) => r.topicId === row.topic.id && r.submittedAt >= allFinishedAt,
          ),
      )
    : [];
  const gap = hasThreeDayGap(state, at);
  const due = reviewSchedule(state).find((item) => item.dueAt <= at);
  // Offer one recall at a time instead of turning missed days into a backlog.
  const recallTopicId =
    finalReviews[0]?.topic.id ??
    (gap && state.updatedAt ? state.topicId : due?.topicId);
  const todayAttempts = state.attempts.filter((a) => today(a.submittedAt));
  const todayReviews = state.reviews.filter((r) => today(r.submittedAt));
  const completedToday = rows.filter(
    (row) =>
      state.finished[row.topic.id] && today(state.finished[row.topic.id]),
  );
  const recent = state.attempts
    .filter((a) => current.topic.exercises.some((q) => q.id === a.exerciseId))
    .at(-1);
  return {
    transferAnswered: state.attempts
      .filter((a) => transferTopic.exercises.some((q) => q.id === a.exerciseId))
      .map((a) => a.exerciseId)
      .filter((id, i, all) => all.indexOf(id) === i).length,
    correctionFocus: latestCorrections(state).find((entry) => entry.revisit),
    rows,
    active,
    hasDraft,
    gap,
    recallTopicId,
    recent,
    completedToday,
    todayAttempts,
    todayReviews,
    finishedCount: rows.filter((row) => row.done).length,
    finalReviewCount: allFinishedAt ? rows.length - finalReviews.length : 0,
    weekDone: !!allFinishedAt && finalReviews.length === 0,
    canRest: completedToday.length > 0 && current.done && !hasDraft,
  };
}
