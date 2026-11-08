import {
  topicFor,
  exerciseFor,
  exerciseRevision,
  savedExerciseFor,
} from "../content/fault-catalog";
import {
  practiceGroups,
  practiceQueues,
  practiceKnowledge,
  currentPracticeId,
  chapterQueue,
  type PracticeMode,
  type PracticeScope,
  isChapterReview,
  longQuestionsForTopic,
} from "../content/practice-set";
import { initializePractice, visitPractice } from "./practice";
import type { FaultProgress } from "./fault-progress";
import { isCorrectChoice, validChoice } from "./objective-answer";
import { chapterFor } from "../content/criminal-curriculum";
import { inquiryAssessmentOrigin } from "./inquiry-origin";

export function hasPracticeHistory(p: FaultProgress) {
  const ids = new Set(practiceGroups.flatMap((g) => g.ids));
  const paperAttempts = new Set(
    p.assessments?.runs.flatMap((r) => Object.values(r.attemptIds)) ?? [],
  );
  return (
    p.attempts.some(
      (a) =>
        !paperAttempts.has(a.id) && ids.has(currentPracticeId(a.exerciseId)),
    ) ||
    Object.keys(p.practice?.viewed ?? {}).some((id) =>
      ids.has(currentPracticeId(id)),
    )
  );
}

export function viewStudyTopic(
  p: FaultProgress,
  topicId: string,
  at: string,
): FaultProgress {
  if (!practiceKnowledge[topicId]) return p;
  const state = initializePractice(p);
  return {
    ...state,
    updatedAt: at,
    practice: {
      ...state.practice!,
      knowledgeViewed: { ...state.practice!.knowledgeViewed, [topicId]: at },
    },
  };
}
export function topicRecord(p: FaultProgress, topicId: string) {
  const ids = new Set([
    ...(practiceGroups.find((g) => g.topicId === topicId)?.ids ??
      topicFor(topicId)?.exercises.map((q) => q.id) ??
      []),
    ...longQuestionsForTopic(topicId),
  ]);
  const attempts = p.attempts.filter((a) =>
    ids.has(currentPracticeId(a.exerciseId)),
  );
  return {
    viewed: !!p.practice?.knowledgeViewed[topicId],
    answered: new Set(attempts.map((a) => currentPracticeId(a.exerciseId)))
      .size,
    mistakes: attempts.filter((a) => {
      const q = savedExerciseFor(a.exerciseId, a.revision);
      return (
        q?.kind === "objective" &&
        validChoice(q, a.choice) &&
        !isCorrectChoice(q, a.choice)
      );
    }).length,
  };
}
export function beginChapterPractice(
  p: FaultProgress,
  chapterId: string,
  mode: PracticeMode,
  at: string,
  scope: PracticeScope = "topic",
) {
  if (!chapterFor(chapterId)) return p;
  const ids = chapterQueue(chapterId, mode, scope);
  if (!ids.length) return p;
  const next = initializePractice(p);
  const id =
    ids.find(
      (id) =>
        !p.drafts[id]?.submittedId &&
        !!(p.drafts[id]?.answer || p.drafts[id]?.choice),
    ) ??
    ids.find((id) => !p.drafts[id]?.submittedId) ??
    ids[0];
  return visitPractice(
    {
      ...next,
      practice: {
        ...next.practice!,
        chapterId,
        scope,
        mode,
        ended: { ...next.practice!.ended, [mode]: false },
      },
    },
    id,
    at,
  );
}
export function beginTopicPractice(
  p: FaultProgress,
  topicId: string,
  mode: PracticeMode,
  at: string,
) {
  const group = practiceGroups.find((g) => g.topicId === topicId);
  const candidates =
    group?.ids.filter(
      (id) => practiceQueues[mode].includes(id) && !isChapterReview(id),
    ) ?? [];
  if (!candidates.length) return p;
  const id =
    candidates.find(
      (id) =>
        !p.drafts[id]?.submittedId &&
        !!(p.drafts[id]?.answer || p.drafts[id]?.choice),
    ) ??
    candidates.find((id) => !p.drafts[id]?.submittedId) ??
    candidates[0];
  const next = initializePractice(p);
  return visitPractice(
    {
      ...next,
      practice: {
        ...next.practice!,
        mode,
        ended: { ...next.practice!.ended, [mode]: false },
      },
    },
    id,
    at,
  );
}
export function prepareInquiryDraft(
  p: FaultProgress,
  context: { exerciseId?: string; topicId?: string; originRunId?: string },
): FaultProgress {
  // Existing wording and association belong to that draft, not this visit.
  if (
    p.inquiryDraft?.text.trim() ||
    (!context.exerciseId && !context.topicId) ||
    (context.exerciseId && !exerciseFor(context.exerciseId)) ||
    (context.topicId && !topicFor(context.topicId))
  )
    return p;
  const origin = context.exerciseId
    ? inquiryAssessmentOrigin(p, context.exerciseId, context.originRunId)
    : null;
  return {
    ...p,
    inquiryDraft: {
      text: p.inquiryDraft?.text ?? "",
      ...(context.exerciseId ? { exerciseId: context.exerciseId } : {}),
      ...(context.topicId ? { topicId: context.topicId } : {}),
      ...(origin ? { originRunId: origin.runId } : {}),
    },
  };
}

export function saveInquiry(
  p: FaultProgress,
  id: string,
  at: string,
): FaultProgress {
  const draft = p.inquiryDraft;
  if (
    !draft?.text.trim() ||
    draft.text.length > 4000 ||
    (p.inquiries?.length ?? 0) >= 200 ||
    p.inquiries?.some((q) => q.id === id)
  )
    return p;
  return {
    ...p,
    updatedAt: at,
    inquiries: [
      ...(p.inquiries ?? []),
      {
        id,
        text: draft.text,
        createdAt: at,
        ...(draft.exerciseId
          ? {
              exerciseId: draft.exerciseId,
              exerciseRevision: exerciseRevision(draft.exerciseId),
            }
          : {}),
        ...(draft.topicId ? { topicId: draft.topicId } : {}),
        ...(draft.originRunId ? { originRunId: draft.originRunId } : {}),
      },
    ],
    inquiryDraft: { text: "" },
  };
}
