import {
  g8CompletionQuestionsForSubject,
  g8CompletionQuestion,
} from "../../../content/g8-completion";
import {
  civilProcedureProceduralDetailsTopics,
  civilProcedureProceduralDetailsQuestion,
  civilProcedureProceduralDetailsDefaultQueues,
} from "../../../content/civil-procedure-procedural-details";
import {
  civilProcedureGapFillTopics,
  civilProcedureGapFillQuestion,
  civilProcedureGapFillDefaultQueues,
} from "../../../content/civil-procedure-gap-fill";
import {
  civilProcedureArbitrationTopics,
  civilProcedureArbitrationQuestion,
  civilProcedureArbitrationDefaultQueues,
} from "../../../content/civil-procedure-arbitration";
import {
  civilProcedureForeignTopics,
  civilProcedureForeignQuestion,
  civilProcedureForeignDefaultQueues,
} from "../../../content/civil-procedure-foreign";
import {
  civilProcedureExecutionTopics,
  civilProcedureExecutionQuestion,
  civilProcedureExecutionDefaultQueues,
} from "../../../content/civil-procedure-execution";
import {
  civilProcedureRemediesSpecialTopics,
  civilProcedureRemediesSpecialQuestion,
  civilProcedureRemediesSpecialDefaultQueues,
} from "../../../content/civil-procedure-remedies-special";
import {
  civilProcedureFirstInstanceTopics,
  civilProcedureFirstInstanceQuestion,
  civilProcedureFirstInstanceDefaultQueues,
} from "../../../content/civil-procedure-first-instance";
import {
  civilProcedureEvidenceProcessTopics,
  civilProcedureEvidenceProcessQuestion,
  civilProcedureEvidenceProcessDefaultQueues,
} from "../../../content/civil-procedure-evidence-process";
import {
  civilProcedureFoundationsTopics,
  civilProcedureFoundationsQuestion,
  civilProcedureFoundationsDefaultQueues,
} from "../../../content/civil-procedure-foundations";
import {
  civilProcedurePartiesTopics,
  civilProcedurePartiesQuestion,
  civilProcedurePartiesDefaultQueues,
} from "../../../content/civil-procedure-parties";
import {
  civilProcedureAgentAuthorityDefaultQueues,
  civilProcedureAgentAuthorityQuestion,
  civilProcedureAgentAuthorityTopics,
} from "../../../content/civil-procedure-agent-authority";
import {
  civilProcedureProofBoundaryOldId,
  civilProcedureProofBurdenDefaultQueues,
  civilProcedureProofBurdenQuestion,
  civilProcedureProofBurdenTopics,
} from "../../../content/civil-procedure-evidence-registration";
import {
  civilProcedureUnperformedTransferDefaultQueues,
  civilProcedureUnperformedTransferQuestion,
} from "../../../content/civil-procedure-unperformed-transfer";
import { civilProcedureContractPracticeTopics } from "../../../content/civil-procedure-unperformed-registration";
import {
  civilProcedureUnagreedVenueDefaultQueues,
  civilProcedureUnagreedVenueQuestion,
  civilProcedureUnagreedVenueTopics,
} from "../../../content/civil-procedure-unagreed-venue";
import {
  civilProcedureReviewSetForKey,
  civilProcedureReviewSetForQuestion,
  civilProcedureReviewKey,
  civilProcedureReviewQuestion,
  civilProcedureReviewReady,
} from "../../../content/civil-procedure-review";
import {
  civilProcedureContractVenueDefaultQueues,
  civilProcedureContractVenueQuestion,
} from "../../../content/civil-procedure-contract-venue";
import { beginChapterPractice } from "../../../domain/study-space";
import {
  civilProcedureJurisdictionResponseDefaultQueues,
  civilProcedureJurisdictionResponseQuestion,
  civilProcedureJurisdictionResponseTopics,
} from "../../../content/civil-procedure-jurisdiction-response";
import {
  civilProcedureFilingVenueDefaultQueues,
  civilProcedureFilingVenueQuestion,
  civilProcedureFilingVenueTopics,
} from "../../../content/civil-procedure-filing-venue";
import {
  practiceSubject,
  type PracticeMode,
} from "../../../content/practice-set";
import { freshDraft, type FaultProgress } from "../../../domain/fault-progress";
import {
  initializePractice,
  resumePracticeSubject,
  visitPractice,
} from "../../../domain/practice";
import { exposePracticeReference } from "../../../domain/reference-exposure";

export type ExplicitCivilProcedureEntry =
  | { kind: "library"; reviewUnavailable?: true }
  | { kind: "review"; questionId?: string; reviewKey?: string }
  | { kind: "resume" }
  | { kind: "question"; questionId: string }
  | { kind: "invalid" };

// Only the published subject forms appear in selection, without references.
export const explicitCivilProcedureQuestions = [
  ...civilProcedureFilingVenueDefaultQueues.objective,
  ...civilProcedureFilingVenueDefaultQueues.subjective,
  ...civilProcedureJurisdictionResponseDefaultQueues.objective,
  ...civilProcedureJurisdictionResponseDefaultQueues.subjective,
  ...civilProcedureContractVenueDefaultQueues.objective,
  ...civilProcedureContractVenueDefaultQueues.subjective,
  ...civilProcedureUnagreedVenueDefaultQueues.objective,
  ...civilProcedureUnagreedVenueDefaultQueues.subjective,
  ...civilProcedureUnperformedTransferDefaultQueues.subjective,
  ...civilProcedureProofBurdenDefaultQueues.objective,
  ...civilProcedureProofBurdenDefaultQueues.subjective,
  ...civilProcedureAgentAuthorityDefaultQueues.objective,
  ...civilProcedureAgentAuthorityDefaultQueues.subjective,
  ...civilProcedurePartiesDefaultQueues.objective,
  ...civilProcedurePartiesDefaultQueues.subjective,
  ...civilProcedureFoundationsDefaultQueues.objective,
  ...civilProcedureFoundationsDefaultQueues.subjective,
  ...civilProcedureEvidenceProcessDefaultQueues.objective,
  ...civilProcedureEvidenceProcessDefaultQueues.subjective,
  ...civilProcedureFirstInstanceDefaultQueues.objective,
  ...civilProcedureFirstInstanceDefaultQueues.subjective,
  ...civilProcedureRemediesSpecialDefaultQueues.objective,
  ...civilProcedureRemediesSpecialDefaultQueues.subjective,
  ...civilProcedureExecutionDefaultQueues.objective,
  ...civilProcedureExecutionDefaultQueues.subjective,
  ...civilProcedureForeignDefaultQueues.objective,
  ...civilProcedureForeignDefaultQueues.subjective,
  ...civilProcedureArbitrationDefaultQueues.objective,
  ...civilProcedureArbitrationDefaultQueues.subjective,
  ...civilProcedureGapFillDefaultQueues.objective,
  ...civilProcedureGapFillDefaultQueues.subjective,
  ...civilProcedureProceduralDetailsDefaultQueues.objective,
  ...civilProcedureProceduralDetailsDefaultQueues.subjective,
  ...g8CompletionQuestionsForSubject("civil-procedure").map((q) => q.id),
].map((id) => {
  const q = (civilProcedureFilingVenueQuestion(id) ??
    civilProcedureJurisdictionResponseQuestion(id) ??
    civilProcedureContractVenueQuestion(id) ??
    civilProcedureUnagreedVenueQuestion(id) ??
    civilProcedureUnperformedTransferQuestion(id) ??
    civilProcedureProofBurdenQuestion(id) ??
    civilProcedureAgentAuthorityQuestion(id) ??
    civilProcedurePartiesQuestion(id) ??
    civilProcedureFoundationsQuestion(id) ??
    civilProcedureEvidenceProcessQuestion(id) ??
    civilProcedureFirstInstanceQuestion(id) ??
    civilProcedureRemediesSpecialQuestion(id) ??
    civilProcedureExecutionQuestion(id) ??
    civilProcedureForeignQuestion(id) ??
    civilProcedureArbitrationQuestion(id) ??
    civilProcedureGapFillQuestion(id) ??
    civilProcedureProceduralDetailsQuestion(id) ??
    g8CompletionQuestion(id))!;
  return { id: q.id, title: q.title, kind: q.kind };
});
export const explicitCivilProcedureKnowledgeTopics = [
  ...civilProcedureFilingVenueTopics,
  ...civilProcedureJurisdictionResponseTopics,
  ...civilProcedureContractPracticeTopics,
  ...civilProcedureUnagreedVenueTopics,
  ...civilProcedureProofBurdenTopics,
  ...civilProcedureAgentAuthorityTopics,
  ...civilProcedurePartiesTopics,
  ...civilProcedureFoundationsTopics,
  ...civilProcedureEvidenceProcessTopics,
  ...civilProcedureFirstInstanceTopics,
  ...civilProcedureRemediesSpecialTopics,
  ...civilProcedureExecutionTopics,
  ...civilProcedureForeignTopics,
  ...civilProcedureArbitrationTopics,
  ...civilProcedureGapFillTopics,
  ...civilProcedureProceduralDetailsTopics,
];
export const explicitCivilProcedureKnowledge = Object.fromEntries(
  explicitCivilProcedureKnowledgeTopics.map((topic) => [
    topic.id,
    { rule: topic.paragraphs.join("\n\n"), omission: topic.pitfall },
  ]),
);

/** A known subject with an unrelated or ambiguous question never opens a form. */
export function resolveExplicitCivilProcedureEntry(
  params: Record<string, string | string[] | undefined>,
): ExplicitCivilProcedureEntry | null {
  if (
    Array.isArray(params.subject) &&
    params.subject.includes("civil-procedure")
  )
    return { kind: "invalid" };
  if (params.subject !== "civil-procedure") return null;
  if (params.review !== undefined) {
    const set =
      typeof params.review === "string"
        ? civilProcedureReviewSetForKey(params.review)
        : undefined;
    if (!set) return { kind: "invalid" };
    if (
      params.question !== undefined &&
      (typeof params.question !== "string" ||
        !set.questionIds.includes(params.question))
    )
      return { kind: "invalid" };
    if (!civilProcedureReviewReady)
      return { kind: "library", reviewUnavailable: true };
    if (params.view === "library") return { kind: "library" };
    return {
      kind: "review",
      ...(set.key === civilProcedureReviewKey ? {} : { reviewKey: set.key }),
      ...(typeof params.question === "string"
        ? { questionId: params.question }
        : {}),
    };
  }
  if (
    typeof params.question === "string" &&
    civilProcedureReviewQuestion(params.question)
  ) {
    const set = civilProcedureReviewSetForQuestion(params.question)!;
    return {
      kind: "review",
      questionId: params.question,
      ...(set.key === civilProcedureReviewKey ? {} : { reviewKey: set.key }),
    };
  }
  if (params.question !== undefined)
    return typeof params.question === "string" &&
      (explicitCivilProcedureQuestions.some((q) => q.id === params.question) ||
        params.question === civilProcedureProofBoundaryOldId)
      ? { kind: "question", questionId: params.question }
      : { kind: "invalid" };
  return params.view === "library" ? { kind: "library" } : { kind: "resume" };
}

/** Existing checkpoint transitions; the directory and invalid links are read-only. */
export function enterExplicitCivilProcedurePractice(
  state: FaultProgress,
  entry: ExplicitCivilProcedureEntry,
  at: string,
  mode?: PracticeMode,
): FaultProgress {
  if (entry.kind === "invalid" || entry.kind === "library") return state;
  if (entry.kind === "review") {
    const set =
      entry.reviewKey !== undefined
        ? civilProcedureReviewSetForKey(entry.reviewKey)
        : entry.questionId
          ? civilProcedureReviewSetForQuestion(entry.questionId)
          : civilProcedureReviewSetForKey(civilProcedureReviewKey);
    if (
      !civilProcedureReviewReady ||
      !set ||
      (entry.questionId !== undefined &&
        !set.questionIds.includes(entry.questionId))
    )
      return state;
    const requested =
      entry.questionId ??
      (set.questionIds.includes(state.exerciseId)
        ? state.exerciseId
        : state.practice?.subjectPositions?.["civil-procedure"]?.cursors
            .subjective);
    if (requested && set.questionIds.includes(requested)) {
      if (
        state.exerciseId === requested &&
        state.practice?.chapterId === set.chapter.id &&
        state.practice.mode === "subjective" &&
        state.practice.scope === "review" &&
        (!entry.questionId || !state.practice.ended.subjective)
      )
        return state;
      const next = initializePractice(state);
      return visitPractice(
        {
          ...next,
          practice: {
            ...next.practice!,
            mode: "subjective",
            ended: { ...next.practice!.ended, subjective: false },
          },
        },
        requested,
        at,
      );
    }
    return beginChapterPractice(
      state,
      set.chapter.id,
      "subjective",
      at,
      "review",
    );
  }
  if (entry.kind === "resume")
    return resumePracticeSubject(state, "civil-procedure", at, mode);
  const q =
    explicitCivilProcedureQuestions.find((q) => q.id === entry.questionId) ??
    (entry.questionId === civilProcedureProofBoundaryOldId
      ? civilProcedureProofBurdenQuestion(entry.questionId)
      : undefined);
  if (!q) return state;
  const resumed = resumePracticeSubject(state, "civil-procedure", at, q.kind);
  if (!resumed.practice) return state;
  return visitPractice(
    {
      ...resumed,
      practice: {
        ...resumed.practice,
        // An explicit choice reopens this form even after its chapter ended.
        // Plain resume keeps the saved completion state; originals stay intact.
        ended: { ...resumed.practice.ended, [q.kind]: false },
      },
    },
    q.id,
    at,
  );
}

/** Knowledge reading preserves the question; an own-case example exposes reference. */
export function viewExplicitCivilProcedureKnowledge(
  state: FaultProgress,
  topicId: string,
  at: string,
  example = false,
): FaultProgress {
  const topic = explicitCivilProcedureKnowledgeTopics.find(
    (t) => t.id === topicId,
  );
  const q =
    g8CompletionQuestion(state.exerciseId) ??
    civilProcedureReviewQuestion(state.exerciseId) ??
    civilProcedureFilingVenueQuestion(state.exerciseId) ??
    civilProcedureJurisdictionResponseQuestion(state.exerciseId) ??
    civilProcedureContractVenueQuestion(state.exerciseId) ??
    civilProcedureUnagreedVenueQuestion(state.exerciseId) ??
    civilProcedureUnperformedTransferQuestion(state.exerciseId) ??
    civilProcedureProofBurdenQuestion(state.exerciseId) ??
    civilProcedureAgentAuthorityQuestion(state.exerciseId) ??
    civilProcedurePartiesQuestion(state.exerciseId) ??
    civilProcedureFoundationsQuestion(state.exerciseId) ??
    civilProcedureEvidenceProcessQuestion(state.exerciseId) ??
    civilProcedureFirstInstanceQuestion(state.exerciseId) ??
    civilProcedureRemediesSpecialQuestion(state.exerciseId) ??
    civilProcedureExecutionQuestion(state.exerciseId) ??
    civilProcedureForeignQuestion(state.exerciseId) ??
    civilProcedureArbitrationQuestion(state.exerciseId) ??
    civilProcedureGapFillQuestion(state.exerciseId) ??
    civilProcedureProceduralDetailsQuestion(state.exerciseId);
  if (
    !topic ||
    !q ||
    !state.practice ||
    practiceSubject(q.id) !== "civil-procedure"
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
