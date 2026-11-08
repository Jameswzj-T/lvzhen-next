import { exerciseFor, exerciseRevision } from "../content/fault-catalog";
import {
  practiceSubject,
  practiceTopic,
  type PracticeSubject,
} from "../content/practice-set";
import type { FaultProgress } from "./fault-progress";
import { feedbackForAttempt } from "./learning-observations";
import { projectLearningReview } from "./learning-review";
import {
  answerLabel,
  isCorrectChoice,
  selectedChoices,
  validChoice,
} from "./objective-answer";

export const otherQuestionReviewLimit = 5;
export type OtherQuestionReviewEvent = {
  attemptId: string;
  questionId: string;
  title: string;
  href: string;
  submittedAt: string;
  choice: string;
  choiceText: string;
  matchesReference: boolean;
  hintUsed: boolean;
  referenceSeenBeforeAnswer: boolean;
  priorSavedCount: number;
};
export type OtherQuestionReview = {
  sourceQuestionId: string;
  sourceAttemptId: string;
  sourceResultId: string;
  afterFeedbackAt: string;
  totalCount: number;
  events: OtherQuestionReviewEvent[];
};

// A chronology of saved practice, not a judgment of transfer or mastery. Reuse
// the reviewed source gate; never infer feedback from a correct-looking answer.
export function projectOtherQuestionReview(
  state: FaultProgress,
  subject: PracticeSubject,
): OtherQuestionReview[] {
  const savedTimes = new Map<string, number[]>();
  for (const attempt of state.attempts) {
    const times = savedTimes.get(attempt.exerciseId) ?? [];
    times.push(Date.parse(attempt.submittedAt));
    savedTimes.set(attempt.exerciseId, times);
  }
  for (const times of savedTimes.values()) times.sort((a, b) => a - b);
  const earlierCount = (questionId: string, time: number) => {
    const times = savedTimes.get(questionId) ?? [];
    let lo = 0,
      hi = times.length;
    while (lo < hi) {
      const middle = Math.floor((lo + hi) / 2);
      if (times[middle] < time) lo = middle + 1;
      else hi = middle;
    }
    return lo;
  };
  const examIds = new Set(
    (state.assessments?.runs ?? []).flatMap((run) =>
      Object.values(run.attemptIds),
    ),
  );
  return projectLearningReview(state, subject).flatMap((group) => {
    const source = group.events[0];
    if (
      !source ||
      source.support !== "complete_reanswer" ||
      source.outcome !== "supported_this_time" ||
      !source.resultId ||
      examIds.has(source.attemptId)
    )
      return [];
    const feedback = feedbackForAttempt(state, source.attemptId);
    if (!feedback || feedback.resultId !== source.resultId) return [];
    const after = Math.max(
      Date.parse(source.submittedAt),
      Date.parse(feedback.observedAt),
    );
    if (!Number.isFinite(after)) return [];
    const topicId = practiceTopic(group.questionId).id;
    const events = state.attempts
      .flatMap((attempt): OtherQuestionReviewEvent[] => {
        const question = exerciseFor(attempt.exerciseId);
        if (
          !question ||
          question.kind !== "objective" ||
          attempt.exerciseId === group.questionId ||
          examIds.has(attempt.id) ||
          practiceSubject(attempt.exerciseId) !== subject ||
          practiceTopic(attempt.exerciseId).id !== topicId ||
          attempt.revision !== exerciseRevision(attempt.exerciseId) ||
          !(Date.parse(attempt.submittedAt) > after) ||
          !validChoice(question, attempt.choice)
        )
          return [];
        const choices = selectedChoices(attempt.choice);
        return [
          {
            attemptId: attempt.id,
            questionId: question.id,
            title: question.title,
            href: `/lab/practice?subject=${subject}&question=${encodeURIComponent(question.id)}`,
            submittedAt: attempt.submittedAt,
            choice: attempt.choice,
            choiceText: choices
              .map(
                (id) =>
                  `${answerLabel([id])}．${question.options!.find((option) => option.id === id)!.text}`,
              )
              .join("；"),
            matchesReference: isCorrectChoice(question, attempt.choice),
            hintUsed: attempt.hintUsed,
            referenceSeenBeforeAnswer: attempt.referenceSeenBeforeAnswer,
            priorSavedCount: earlierCount(
              attempt.exerciseId,
              Date.parse(attempt.submittedAt),
            ),
          },
        ];
      })
      .sort(
        (a, b) =>
          Date.parse(b.submittedAt) - Date.parse(a.submittedAt) ||
          b.attemptId.localeCompare(a.attemptId),
      );
    if (!events.length) return [];
    return [
      {
        sourceQuestionId: group.questionId,
        sourceAttemptId: source.attemptId,
        sourceResultId: source.resultId,
        afterFeedbackAt: new Date(after).toISOString(),
        totalCount: events.length,
        events: events.slice(0, otherQuestionReviewLimit),
      },
    ];
  });
}
