import {
  g8CompletionQuestionsForSubject,
  g8CompletionQuestion,
  g8CompletionSubject,
} from "../../../content/g8-completion";
import {
  administrativeExercises,
  administrativeTopics,
  administrativeQuestion,
} from "../../../content/administrative-registration";
import {
  practiceSubject,
  type PracticeMode,
} from "../../../content/practice-set";
import { freshDraft, type FaultProgress } from "../../../domain/fault-progress";
import { resumePracticeSubject, visitPractice } from "../../../domain/practice";
import { exposePracticeReference } from "../../../domain/reference-exposure";

export type ExplicitAdministrativeEntry =
  | { kind: "library"; reviewUnavailable?: true }
  | { kind: "resume" }
  | { kind: "question"; questionId: string }
  | { kind: "review"; questionId?: string }
  | { kind: "invalid" };
export const explicitAdministrativeQuestions = [
  ...administrativeExercises,
  ...g8CompletionQuestionsForSubject("administrative-law"),
].map((q) => ({
  id: q.id,
  title: q.title,
  kind: q.kind,
}));
export const explicitAdministrativeKnowledgeTopics = administrativeTopics;
export const explicitAdministrativeKnowledge = Object.fromEntries(
  explicitAdministrativeKnowledgeTopics.map((t) => [
    t.id,
    { rule: t.paragraphs.join("\n\n"), omission: t.pitfall },
  ]),
);

const registeredQuestion = (id: string) =>
  (g8CompletionSubject(id) === "administrative-law"
    ? g8CompletionQuestion(id)
    : undefined) ?? administrativeQuestion(id);

export function resolveExplicitAdministrativeEntry(
  params: Record<string, string | string[] | undefined>,
): ExplicitAdministrativeEntry | null {
  if (
    Array.isArray(params.subject) &&
    params.subject.includes("administrative-law")
  )
    return { kind: "invalid" };
  if (params.subject !== "administrative-law") return null;
  if (params.review !== undefined) return { kind: "invalid" };
  if (params.question !== undefined)
    return typeof params.question === "string" &&
      registeredQuestion(params.question)
      ? { kind: "question", questionId: params.question }
      : { kind: "invalid" };
  return params.view === "library" ? { kind: "library" } : { kind: "resume" };
}

export function enterExplicitAdministrativePractice(
  state: FaultProgress,
  entry: ExplicitAdministrativeEntry,
  at: string,
  mode?: PracticeMode,
): FaultProgress {
  if (
    entry.kind === "library" ||
    entry.kind === "invalid" ||
    entry.kind === "review"
  )
    return state;
  if (entry.kind === "resume")
    return resumePracticeSubject(state, "administrative-law", at, mode);
  const q = registeredQuestion(entry.questionId);
  if (!q) return state;
  const next = resumePracticeSubject(state, "administrative-law", at, q.kind);
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

export function viewExplicitAdministrativeKnowledge(
  state: FaultProgress,
  topicId: string,
  at: string,
  example = false,
): FaultProgress {
  const topic = explicitAdministrativeKnowledgeTopics.find(
      (t) => t.id === topicId,
    ),
    q = registeredQuestion(state.exerciseId);
  if (
    !topic ||
    !q ||
    !state.practice ||
    practiceSubject(q.id) !== "administrative-law"
  )
    return state;
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
