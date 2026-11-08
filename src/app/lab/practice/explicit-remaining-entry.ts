import {
  g8CompletionQuestionsForSubject,
  g8CompletionQuestion,
} from "../../../content/g8-completion";
import { practiceSubject } from "../../../content/practice-set";
import {
  isRemainingG6Subject,
  type RemainingG6Subject,
} from "../../../content/remaining-g6-subjects";
import {
  remainingG6Knowledge,
  remainingG6Question,
} from "../../../content/remaining-g6";
import type { PracticeMode } from "../../../content/practice-set";
import { freshDraft, type FaultProgress } from "../../../domain/fault-progress";
import { resumePracticeSubject, visitPractice } from "../../../domain/practice";
import { exposePracticeReference } from "../../../domain/reference-exposure";

export type RemainingG6EntryAction =
  | { kind: "library"; reviewUnavailable?: true }
  | { kind: "resume" }
  | { kind: "question"; questionId: string }
  | { kind: "review"; questionId?: string }
  | { kind: "invalid" };
export type ExplicitRemainingEntry = RemainingG6EntryAction & {
  subject: RemainingG6Subject;
};
export function explicitRemainingQuestions(subject: RemainingG6Subject) {
  return [
    ...remainingG6Knowledge(subject).topics.flatMap((t) =>
      t.exercises.map(({ id, title, kind }) => ({ id, title, kind })),
    ),
    ...g8CompletionQuestionsForSubject(subject).map(({ id, title, kind }) => ({
      id,
      title,
      kind,
    })),
  ];
}
export function resolveExplicitRemainingEntry(
  params: Record<string, string | string[] | undefined>,
): ExplicitRemainingEntry | null {
  if (Array.isArray(params.subject)) {
    const subject = params.subject.find(isRemainingG6Subject);
    return subject ? { subject, kind: "invalid" } : null;
  }
  const subject = params.subject;
  if (!isRemainingG6Subject(subject)) return null;
  if (params.review !== undefined) return { subject, kind: "invalid" };
  if (params.question !== undefined)
    return typeof params.question === "string" &&
      practiceSubject(params.question) === subject
      ? { subject, kind: "question", questionId: params.question }
      : { subject, kind: "invalid" };
  return { subject, kind: params.view === "library" ? "library" : "resume" };
}
export function enterExplicitRemainingPractice(
  state: FaultProgress,
  subject: RemainingG6Subject,
  entry: RemainingG6EntryAction,
  at: string,
  mode?: PracticeMode,
): FaultProgress {
  if (entry.kind === "resume")
    return resumePracticeSubject(state, subject, at, mode);
  if (
    entry.kind !== "question" ||
    practiceSubject(entry.questionId) !== subject
  )
    return state;
  const q = (g8CompletionQuestion(entry.questionId) ??
    remainingG6Question(entry.questionId))!;
  const next = resumePracticeSubject(state, subject, at, q.kind);
  return visitPractice(
    {
      ...next,
      practice: {
        ...next.practice!,
        ended: { ...next.practice!.ended, [q.kind]: false },
      },
    },
    q.id,
    at,
  );
}
export function viewExplicitRemainingKnowledge(
  state: FaultProgress,
  topicId: string,
  at: string,
  example = false,
): FaultProgress {
  const subject = practiceSubject(state.exerciseId);
  const q =
    g8CompletionQuestion(state.exerciseId) ??
    remainingG6Question(state.exerciseId);
  const topic =
    subject &&
    isRemainingG6Subject(subject) &&
    remainingG6Knowledge(subject).topics.find((t) => t.id === topicId);
  if (!topic || !q || !state.practice) return state;
  const draft = state.drafts[q.id] ?? freshDraft();
  const next = {
    ...state,
    updatedAt: at,
    practice: {
      ...state.practice,
      knowledgeViewed: { ...state.practice.knowledgeViewed, [topicId]: at },
    },
    drafts:
      q.relatedTopicIds?.includes(topicId) && !draft.submittedId
        ? { ...state.drafts, [q.id]: { ...draft, hintUsed: true } }
        : state.drafts,
  };
  return example && q.facts === topic.example.facts
    ? exposePracticeReference(next, q.id)
    : next;
}
