import type { FaultProgress } from "../../../domain/fault-progress";

/** Transient view identity only; never persisted or derived from answer text. */
export class PracticeNavigation {
  private owner: object | null = null;
  private context = "";
  private token: object = {};

  observe(owner: object, state: FaultProgress) {
    const p = state.practice,
      draft = state.drafts[state.exerciseId],
      assessment = state.assessments?.runs.find(
        (run) => run.id === state.assessments?.activeId,
      );
    const context = JSON.stringify([
      state.step,
      state.topicId,
      state.exerciseId,
      state.resumeAfterRecall,
      p?.mode,
      p?.chapterId,
      p?.scope,
      p?.cursors,
      p?.ended,
      draft?.submittedId,
      draft?.feedbackRetry?.taskId,
      draft?.feedbackRetryPaused,
      state.attempts.at(-1)?.id,
      state.corrections.at(-1)?.id,
      state.submittedFeedback?.at(-1)?.id,
      state.learningObservations?.at(-1)?.id,
      state.assessments?.activeId,
      state.assessments?.cursor,
      assessment?.finishedAt,
    ]);
    if (owner !== this.owner || context !== this.context) {
      this.owner = owner;
      this.context = context;
      this.token = {};
    }
    return this.token;
  }

  take(owner: object, token: object | null) {
    if (owner !== this.owner || token !== this.token) return false;
    // Even a same-position/link-only navigation consumes the displayed choice.
    this.token = {};
    return true;
  }
}
