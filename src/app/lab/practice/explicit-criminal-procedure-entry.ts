import {
  g8CompletionQuestionsForSubject,
  g8CompletionQuestion,
  g8CompletionSubject,
} from "../../../content/g8-completion";
import {
  criminalProcedureG1Topics,
  criminalProcedureG1Question,
  criminalProcedureG1Exercises,
} from "../../../content/criminal-procedure-g1";
import {
  criminalProcedureFoundationsTopics,
  criminalProcedureFoundationsQuestion,
  criminalProcedureFoundationsExercises,
} from "../../../content/criminal-procedure-foundations";
import { historicalPracticeQuestion } from "../../../content/practice-content-history";
import {
  criminalProcedureArrestReviewExercises,
  criminalProcedureArrestReviewTopics,
  criminalProcedureArrestReviewQuestion,
} from "../../../content/criminal-procedure-arrest-review";
import {
  criminalProcedureBailExercises,
  criminalProcedureBailTopics,
  criminalProcedureBailQuestion,
} from "../../../content/criminal-procedure-bail";
import {
  criminalProcedureDefenseExercises,
  criminalProcedureDefenseTopics,
  criminalProcedureDefenseQuestion,
} from "../../../content/criminal-procedure-defense";
import {
  criminalProcedureBurdenExercises,
  criminalProcedureBurdenTopics,
  criminalProcedureBurdenQuestion,
} from "../../../content/criminal-procedure-burden";
import {
  criminalProcedurePartialCorroborationExercises,
  criminalProcedurePartialCorroborationQuestion,
} from "../../../content/criminal-procedure-partial-corroboration";
import { criminalProcedureProofPracticeTopics } from "../../../content/criminal-procedure-partial-registration";
import {
  criminalProcedureExclusionExercises,
  criminalProcedureExclusionTopics,
  criminalProcedureExclusionQuestion,
} from "../../../content/criminal-procedure-legality-registration";
import {
  criminalProcedureProofExercises,
  criminalProcedureProofQuestion,
} from "../../../content/criminal-procedure-proof";
import {
  practiceSubject,
  type PracticeMode,
} from "../../../content/practice-set";
import { freshDraft, type FaultProgress } from "../../../domain/fault-progress";
import { resumePracticeSubject, visitPractice } from "../../../domain/practice";
import { exposePracticeReference } from "../../../domain/reference-exposure";

export type ExplicitCriminalProcedureEntry =
  | { kind: "library"; reviewUnavailable?: true }
  | { kind: "resume" }
  | { kind: "question"; questionId: string }
  | { kind: "review"; questionId?: string }
  | { kind: "invalid" };
export const explicitCriminalProcedureQuestions = [
  ...criminalProcedureProofExercises,
  ...criminalProcedureExclusionExercises,
  ...criminalProcedurePartialCorroborationExercises,
  ...criminalProcedureBurdenExercises,
  ...criminalProcedureDefenseExercises,
  ...criminalProcedureBailExercises,
  ...criminalProcedureArrestReviewExercises,
  ...criminalProcedureFoundationsExercises,
  ...criminalProcedureG1Exercises,
  ...g8CompletionQuestionsForSubject("criminal-procedure"),
].map((q) => ({
  id: q.id,
  title: q.title,
  kind: q.kind,
}));
export const explicitCriminalProcedureKnowledgeTopics = [
  ...criminalProcedureProofPracticeTopics,
  ...criminalProcedureExclusionTopics,
  ...criminalProcedureBurdenTopics,
  ...criminalProcedureDefenseTopics,
  ...criminalProcedureBailTopics,
  ...criminalProcedureArrestReviewTopics,
  ...criminalProcedureFoundationsTopics,
  ...criminalProcedureG1Topics,
];
export const explicitCriminalProcedureKnowledge = Object.fromEntries(
  explicitCriminalProcedureKnowledgeTopics.map((t) => [
    t.id,
    { rule: t.paragraphs.join("\n\n"), omission: t.pitfall },
  ]),
);

const registeredQuestion = (id: string) =>
  (g8CompletionSubject(id) === "criminal-procedure"
    ? g8CompletionQuestion(id)
    : undefined) ??
  criminalProcedureG1Question(id) ??
  criminalProcedureFoundationsQuestion(id) ??
  criminalProcedureArrestReviewQuestion(id) ??
  criminalProcedureBailQuestion(id) ??
  criminalProcedureDefenseQuestion(id) ??
  criminalProcedureBurdenQuestion(id) ??
  criminalProcedurePartialCorroborationQuestion(id) ??
  criminalProcedureProofQuestion(id) ??
  criminalProcedureExclusionQuestion(id) ??
  (practiceSubject(id) === "criminal-procedure"
    ? historicalPracticeQuestion(id)
    : undefined);

export function resolveExplicitCriminalProcedureEntry(
  params: Record<string, string | string[] | undefined>,
): ExplicitCriminalProcedureEntry | null {
  if (
    Array.isArray(params.subject) &&
    params.subject.includes("criminal-procedure")
  )
    return { kind: "invalid" };
  if (params.subject !== "criminal-procedure") return null;
  if (params.review !== undefined) return { kind: "invalid" };
  if (params.question !== undefined)
    return typeof params.question === "string" &&
      registeredQuestion(params.question)
      ? { kind: "question", questionId: params.question }
      : { kind: "invalid" };
  return params.view === "library" ? { kind: "library" } : { kind: "resume" };
}

export function enterExplicitCriminalProcedurePractice(
  state: FaultProgress,
  entry: ExplicitCriminalProcedureEntry,
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
    return resumePracticeSubject(state, "criminal-procedure", at, mode);
  const q = registeredQuestion(entry.questionId);
  if (!q) return state;
  const resumed = resumePracticeSubject(
    state,
    "criminal-procedure",
    at,
    q.kind,
  );
  if (!resumed.practice) return state;
  return visitPractice(
    {
      ...resumed,
      practice: {
        ...resumed.practice,
        // Choosing a question explicitly reopens a finished chapter for this form.
        // Plain resume and the other form retain their saved completion state.
        ended: { ...resumed.practice.ended, [q.kind]: false },
      },
    },
    q.id,
    at,
  );
}

export function viewExplicitCriminalProcedureKnowledge(
  state: FaultProgress,
  topicId: string,
  at: string,
  example = false,
): FaultProgress {
  const topic = explicitCriminalProcedureKnowledgeTopics.find(
      (t) => t.id === topicId,
    ),
    q = registeredQuestion(state.exerciseId);
  if (
    !topic ||
    !q ||
    !state.practice ||
    practiceSubject(q.id) !== "criminal-procedure"
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
