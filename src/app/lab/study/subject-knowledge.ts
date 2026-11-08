import { isRemainingG6Subject } from "../../../content/remaining-g6-subjects";
import { remainingG6Knowledge } from "../../../content/remaining-g6";
import {
  explicitRemainingQuestions,
  enterExplicitRemainingPractice,
  viewExplicitRemainingKnowledge,
} from "../practice/explicit-remaining-entry";
import {
  enterExplicitCommercialPractice,
  explicitCommercialQuestions,
  explicitCommercialKnowledge,
  explicitCommercialKnowledgeTopics,
  viewExplicitCommercialKnowledge,
} from "../practice/explicit-commercial-entry";
import {
  enterExplicitAdministrativePractice,
  explicitAdministrativeKnowledge,
  explicitAdministrativeKnowledgeTopics,
  explicitAdministrativeQuestions,
  viewExplicitAdministrativeKnowledge,
} from "../practice/explicit-administrative-entry";
import {
  enterExplicitCriminalProcedurePractice,
  explicitCriminalProcedureKnowledge,
  explicitCriminalProcedureKnowledgeTopics,
  explicitCriminalProcedureQuestions,
  viewExplicitCriminalProcedureKnowledge,
} from "../practice/explicit-criminal-procedure-entry";
import { exerciseFor } from "../../../content/fault-catalog";
import {
  isChapterReview,
  practiceSubject,
  practiceTopic,
  subjectPracticeQueues,
  type PracticeSubject,
} from "../../../content/practice-set";
import { freshDraft, type FaultProgress } from "../../../domain/fault-progress";
import { initializePractice } from "../../../domain/practice";
import { exposePracticeReference } from "../../../domain/reference-exposure";
import {
  enterExplicitCivilPractice,
  explicitCivilKnowledge,
  explicitCivilKnowledgeTopics,
  explicitCivilQuestions,
  viewExplicitCivilKnowledge,
} from "../practice/explicit-civil-entry";
import {
  enterExplicitCivilProcedurePractice,
  explicitCivilProcedureKnowledge,
  explicitCivilProcedureKnowledgeTopics,
  explicitCivilProcedureQuestions,
  viewExplicitCivilProcedureKnowledge,
} from "../practice/explicit-civil-procedure-entry";

export function studySubjectSelection(
  value: unknown,
): PracticeSubject | undefined {
  return isRemainingG6Subject(value) ||
    value === "criminal-law" ||
    value === "civil-law" ||
    value === "civil-procedure" ||
    value === "criminal-procedure" ||
    value === "administrative-law" ||
    value === "commercial-law"
    ? value
    : undefined;
}

/** Browse only cards already used by the published subject practice. */
export function subjectStudyKnowledge(subject: PracticeSubject) {
  if (isRemainingG6Subject(subject)) return remainingG6Knowledge(subject);
  if (subject === "commercial-law")
    return {
      topics: explicitCommercialKnowledgeTopics,
      content: explicitCommercialKnowledge,
    };
  if (subject === "administrative-law")
    return {
      topics: explicitAdministrativeKnowledgeTopics,
      content: explicitAdministrativeKnowledge,
    };
  if (subject === "criminal-procedure")
    return {
      topics: explicitCriminalProcedureKnowledgeTopics,
      content: explicitCriminalProcedureKnowledge,
    };
  if (subject === "civil-law")
    return {
      topics: explicitCivilKnowledgeTopics,
      content: explicitCivilKnowledge,
    };
  if (subject === "civil-procedure")
    return {
      topics: explicitCivilProcedureKnowledgeTopics,
      content: explicitCivilProcedureKnowledge,
    };
  return null;
}

export function subjectStudyTopic(
  subject: PracticeSubject | undefined,
  id: unknown,
) {
  if (!subject || typeof id !== "string") return null;
  return (
    subjectStudyKnowledge(subject)?.topics.find((topic) => topic.id === id) ??
    null
  );
}

function topicQuestions(subject: PracticeSubject, topicId: string) {
  if (!subjectStudyTopic(subject, topicId)) return [];
  const questions = isRemainingG6Subject(subject)
    ? explicitRemainingQuestions(subject)
    : subject === "commercial-law"
      ? explicitCommercialQuestions
      : subject === "administrative-law"
        ? explicitAdministrativeQuestions
        : subject === "criminal-procedure"
          ? explicitCriminalProcedureQuestions
          : subject === "civil-law"
            ? explicitCivilQuestions
            : explicitCivilProcedureQuestions;
  const queues = subjectPracticeQueues(subject);
  return ["objective", "subjective"].flatMap((kind) =>
    questions.filter(
      (q) =>
        q.kind === kind &&
        queues[q.kind].includes(q.id) &&
        !isChapterReview(q.id) &&
        practiceSubject(q.id) === subject &&
        practiceTopic(q.id).id === topicId,
    ),
  );
}

export function subjectStudyPracticeMode(
  subject: PracticeSubject,
  topicId: string,
) {
  return topicQuestions(subject, topicId)[0]?.kind ?? null;
}

/** Reading observes a card; it does not move a saved question or judge learning. */
export function viewSubjectStudyKnowledge(
  state: FaultProgress,
  subject: PracticeSubject,
  topicId: string,
  at: string,
  example = false,
): FaultProgress {
  const topic = subjectStudyTopic(subject, topicId);
  if (!topic || !Number.isFinite(Date.parse(at))) return state;
  const initialized = initializePractice(state);
  let next =
    practiceSubject(state.exerciseId) === subject
      ? isRemainingG6Subject(subject)
        ? viewExplicitRemainingKnowledge(initialized, topicId, at, example)
        : subject === "commercial-law"
          ? viewExplicitCommercialKnowledge(initialized, topicId, at, example)
          : subject === "administrative-law"
            ? viewExplicitAdministrativeKnowledge(
                initialized,
                topicId,
                at,
                example,
              )
            : subject === "criminal-procedure"
              ? viewExplicitCriminalProcedureKnowledge(
                  initialized,
                  topicId,
                  at,
                  example,
                )
              : subject === "civil-law"
                ? viewExplicitCivilKnowledge(initialized, topicId, at, example)
                : viewExplicitCivilProcedureKnowledge(
                    initialized,
                    topicId,
                    at,
                    example,
                  )
      : {
          ...initialized,
          updatedAt: at,
          practice: {
            ...initialized.practice!,
            knowledgeViewed: {
              ...initialized.practice!.knowledgeViewed,
              [topicId]: at,
            },
          },
        };
  // A displayed own-case example remains exposed even before that form is opened.
  if (example)
    for (const q of topicQuestions(subject, topicId))
      if (exerciseFor(q.id)?.facts === topic.example.facts)
        next = exposePracticeReference(next, q.id);
  return next;
}

/** Use the original exact-entry transition; no new queues, answers or scores. */
export function prepareSubjectStudyPractice(
  state: FaultProgress,
  subject: PracticeSubject,
  topicId: string,
  at: string,
): { state: FaultProgress; href: string } | null {
  if (!Number.isFinite(Date.parse(at))) return null;
  const questions = topicQuestions(subject, topicId);
  const mode = questions[0]?.kind;
  const sameMode = questions.filter((q) => q.kind === mode);
  const q =
    (isRemainingG6Subject(subject)
      ? sameMode.find((q) => {
          const d = state.drafts[q.id];
          return (
            d &&
            !d.submittedId &&
            (q.kind === "subjective" ? d.answer.trim() : d.choice.trim())
          );
        })
      : undefined) ??
    sameMode.find((q) => !state.drafts[q.id]?.submittedId) ??
    sameMode[0];
  if (!q) return null;
  let next = isRemainingG6Subject(subject)
    ? enterExplicitRemainingPractice(
        state,
        subject,
        { kind: "question", questionId: q.id },
        at,
      )
    : subject === "commercial-law"
      ? enterExplicitCommercialPractice(
          state,
          { kind: "question", questionId: q.id },
          at,
        )
      : subject === "administrative-law"
        ? enterExplicitAdministrativePractice(
            state,
            { kind: "question", questionId: q.id },
            at,
          )
        : subject === "criminal-procedure"
          ? enterExplicitCriminalProcedurePractice(
              state,
              { kind: "question", questionId: q.id },
              at,
            )
          : subject === "civil-law"
            ? enterExplicitCivilPractice(
                state,
                { kind: "question", questionId: q.id },
                at,
              )
            : enterExplicitCivilProcedurePractice(
                state,
                { kind: "question", questionId: q.id },
                at,
              );
  if (next.exerciseId !== q.id || practiceSubject(next.exerciseId) !== subject)
    return null;
  const draft = next.drafts[q.id] ?? freshDraft();
  if (next.practice?.knowledgeViewed[topicId] && !draft.submittedId)
    next = {
      ...next,
      drafts: { ...next.drafts, [q.id]: { ...draft, hintUsed: true } },
    };
  return {
    state: next,
    href: `/lab/practice?subject=${subject}&question=${encodeURIComponent(q.id)}`,
  };
}
