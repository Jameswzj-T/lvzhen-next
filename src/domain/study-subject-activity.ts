import { civilContractReviewQueues } from "../content/civil-contract-review";
import { civilProcedureAllReviewQuestions } from "../content/civil-procedure-review";
import {
  currentPracticeId,
  currentQuestionIds,
  knowledgeTopics,
  practiceTopic,
  subjectPracticeQueues,
  type PracticeSubject,
} from "../content/practice-set";
import type { FaultProgress } from "./fault-progress";

export type StudySubjectActivity = {
  subject: PracticeSubject;
  answered: number;
  viewed: number;
};

/** Saved questions and explicit knowledge views are activity, never mastery. */
export function projectStudySubjectActivity(
  state: FaultProgress,
  subject: PracticeSubject,
): StudySubjectActivity {
  const queues = subjectPracticeQueues(subject);
  // Preserve the original criminal scope, including chapter reviews/long cases.
  const questionIds = new Set(
    subject === "criminal-law"
      ? currentQuestionIds
      : [
          ...queues.objective,
          ...queues.subjective,
          ...(subject === "civil-law"
            ? civilContractReviewQueues.subjective
            : subject === "civil-procedure"
              ? civilProcedureAllReviewQuestions.map((q) => q.id)
              : []),
        ],
  );
  const topicIds = new Set(
    subject === "criminal-law"
      ? knowledgeTopics.map((topic) => topic.id)
      : [...queues.objective, ...queues.subjective].map(
          (id) => practiceTopic(id).id,
        ),
  );
  const answered = new Set(
    state.attempts
      .map((attempt) => currentPracticeId(attempt.exerciseId))
      .filter((id) => questionIds.has(id)),
  ).size;
  const viewed = [...topicIds].filter(
    (id) => !!state.practice?.knowledgeViewed[id],
  ).length;
  return { subject, answered, viewed };
}
