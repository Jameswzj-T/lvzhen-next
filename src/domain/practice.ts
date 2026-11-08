import { isRemainingG6Subject } from "../content/remaining-g6-subjects";
import {
  practiceQueues,
  practiceQuestion,
  practiceTopic,
  publishedExerciseTopic,
  sameCaseQuestions,
  practiceKnowledge,
  currentPracticeId,
  isPracticeLocation,
  practiceChapter,
  chapterQueue,
  type PracticeMode,
  isChapterReview,
  practiceSubject,
  subjectPracticeQueues,
  type PracticeSubject,
} from "../content/practice-set";
import { isHistoricalPracticeQuestion } from "../content/practice-content-history";
import {
  freshDraft,
  retryExercise,
  submitExercise,
  type FaultProgress,
  type UnitDraft,
} from "./fault-progress";
import { isCorrectChoice, validChoice } from "./objective-answer";
import { hasSeenPracticeReference } from "./reference-exposure";
import { exerciseRevision, savedExerciseFor } from "../content/fault-catalog";

/** Exact question and content version only; never alter the saved originals. */
export function practiceAnswerHistory(p: FaultProgress) {
  const revision = exerciseRevision(p.exerciseId);
  return p.attempts
    .filter(
      (attempt) =>
        attempt.exerciseId === p.exerciseId && attempt.revision === revision,
    )
    .sort(
      (a, b) =>
        Date.parse(a.submittedAt) - Date.parse(b.submittedAt) ||
        a.id.localeCompare(b.id),
    )
    .map((attempt, index) => ({ attempt, number: index + 1 }))
    .reverse();
}

export function activePracticeQueue(
  p: FaultProgress,
  mode = p.practice?.mode ?? "objective",
) {
  return p.practice?.chapterId
    ? chapterQueue(p.practice.chapterId, mode, p.practice.scope ?? "topic")
    : practiceQueues[mode].filter((id) => !isChapterReview(id));
}
function firstPending(p: FaultProgress, mode: PracticeMode) {
  const queue = activePracticeQueue(p, mode);
  return queue.find((id) => !p.drafts[id]?.submittedId) ?? queue[0];
}
export function openPractice(
  p: FaultProgress,
  at: string,
  mode: PracticeMode = p.practice?.mode ?? "objective",
): FaultProgress {
  const practice = initializePractice(p).practice!;
  const chapterId =
    practice.chapterId ??
    practiceChapter(
      isPracticeLocation(practice.cursors[mode], mode)
        ? practice.cursors[mode]
        : practiceQueues[mode][0],
    ).id;
  const state = { ...p, practice: { ...practice, chapterId, mode } };
  const queue = activePracticeQueue(state, mode);
  if (!queue.length) return p;
  const id =
    isPracticeLocation(practice.cursors[mode], mode) &&
    (queue.includes(currentPracticeId(practice.cursors[mode])) ||
      (practiceSubject(practice.cursors[mode]) === "civil-law" &&
        practiceChapter(practice.cursors[mode]).id === chapterId))
      ? practice.cursors[mode]
      : firstPending(state, mode);
  return visitPractice(state, id, at);
}
export function initializePractice(p: FaultProgress): FaultProgress {
  const practice = p.practice ?? {
    mode: "objective" as const,
    cursors: {
      objective: firstPending(p, "objective"),
      subjective: firstPending(p, "subjective"),
    },
    ended: { objective: false, subjective: false },
    viewed: {},
    knowledgeViewed: {},
  };
  return { ...p, practice };
}

/** Explicit subject entry only; unavailable subjects leave the full state intact. */
export function resumePracticeSubject(
  p: FaultProgress,
  subject: string,
  at: string,
  mode?: PracticeMode,
): FaultProgress {
  if (
    subject !== "criminal-law" &&
    subject !== "civil-law" &&
    subject !== "civil-procedure" &&
    subject !== "criminal-procedure" &&
    subject !== "administrative-law" &&
    subject !== "commercial-law" &&
    !isRemainingG6Subject(subject)
  )
    return p;
  const next = initializePractice(p);
  const practice = next.practice!;
  const activeSubject = practiceSubject(practice.cursors[practice.mode]);
  const saved =
    activeSubject === subject ? practice : practice.subjectPositions?.[subject];
  const selectedMode = mode ?? saved?.mode ?? "objective";
  const cursor =
    saved?.cursors[selectedMode] ??
    subjectPracticeQueues(subject)[selectedMode][0];
  if (
    !isPracticeLocation(cursor, selectedMode) ||
    practiceSubject(cursor) !== subject
  )
    return p;
  return visitPractice(
    {
      ...next,
      practice: {
        ...switchPracticeSubject(next, subject),
        mode: selectedMode,
        chapterId: practiceChapter(cursor).id,
        scope: isChapterReview(cursor) ? "review" : "topic",
      },
    },
    cursor,
    at,
  );
}

function switchPracticeSubject(p: FaultProgress, subject: PracticeSubject) {
  const practice = p.practice!;
  const previousSubject = practiceSubject(practice.cursors[practice.mode]);
  if (!previousSubject || previousSubject === subject) return practice;
  // Callers may set the target mode before visiting. The current question's
  // exact cursor identifies the mode being left, without inspecting answer text.
  const previousMode =
    (["objective", "subjective"] as const).find(
      (mode) => practice.cursors[mode] === p.exerciseId,
    ) ?? practice.mode;
  const position = practice.subjectPositions?.[subject] ?? {
    mode: practice.mode,
    cursors: {
      objective: subjectPracticeQueues(subject).objective[0],
      subjective: subjectPracticeQueues(subject).subjective[0],
    },
    ended: { objective: false, subjective: false },
  };
  return {
    ...practice,
    cursors: { ...position.cursors },
    ended: { ...position.ended },
    subjectPositions: {
      ...practice.subjectPositions,
      [previousSubject]: {
        mode: previousMode,
        cursors: { ...practice.cursors },
        ended: { ...practice.ended },
      },
    },
  };
}

export function visitPractice(
  p: FaultProgress,
  id: string,
  at: string,
): FaultProgress {
  if (!p.practice || !isPracticeLocation(id, p.practice.mode)) return p;
  const practice = switchPracticeSubject(p, practiceSubject(id)!);
  const switchedSubject = practice !== p.practice;
  let next: FaultProgress = {
    ...p,
    updatedAt: at,
    topicId: publishedExerciseTopic(id).id,
    exerciseId: id,
    step: "practice",
    resumeAfterRecall: null,
    practice: {
      ...practice,
      chapterId: practiceChapter(id).id,
      scope: isChapterReview(id) ? "review" : "topic",
      ended: switchedSubject
        ? practice.cursors[practice.mode] === id
          ? practice.ended
          : { ...practice.ended, [practice.mode]: false }
        : (p.practice.chapterId &&
              p.practice.chapterId !== practiceChapter(id).id) ||
            (p.practice.scope ?? "topic") !==
              (isChapterReview(id) ? "review" : "topic")
          ? { ...p.practice.ended, [p.practice.mode]: false }
          : p.practice.ended,
      cursors: { ...practice.cursors, [practice.mode]: id },
      viewed: { ...p.practice.viewed, [id]: at },
    },
  };
  if (!isHistoricalPracticeQuestion(id) && hasSeenPracticeReference(next, id))
    next = exposeCase(next);
  const oldId = id.replace(/-v[23]$/, "");
  if (
    oldId !== id &&
    isHistoricalPracticeQuestion(oldId) &&
    p.drafts[oldId]?.hintUsed &&
    !next.drafts[id]?.submittedId
  )
    next = {
      ...next,
      drafts: {
        ...next.drafts,
        [id]: { ...(next.drafts[id] ?? freshDraft()), hintUsed: true },
      },
    };
  return next;
}
function exposeCase(p: FaultProgress): FaultProgress {
  const drafts = { ...p.drafts };
  for (const q of sameCaseQuestions(p.exerciseId))
    drafts[q.id] = { ...(drafts[q.id] ?? freshDraft()), referenceSeen: true };
  return { ...p, drafts };
}
export function editPractice(
  p: FaultProgress,
  patch: Partial<Pick<UnitDraft, "choice" | "answer">>,
): FaultProgress {
  if (isHistoricalPracticeQuestion(p.exerciseId)) return p;
  const draft = p.drafts[p.exerciseId] ?? freshDraft();
  if (draft.submittedId) return p;
  if (
    patch.choice &&
    !validChoice(practiceQuestion(p.exerciseId), patch.choice)
  )
    return p;
  return {
    ...p,
    drafts: {
      ...p.drafts,
      [p.exerciseId]: {
        ...draft,
        ...(patch.choice !== undefined ? { choice: patch.choice } : {}),
        ...(patch.answer !== undefined ? { answer: patch.answer } : {}),
      },
    },
  };
}
export function submitPractice(p: FaultProgress, eventId: string, at: string) {
  const next = submitExercise(p, eventId, at);
  return next.attempts.length > p.attempts.length ? exposeCase(next) : next;
}
export function movePractice(p: FaultProgress, direction: -1 | 1, at: string) {
  if (!p.practice) return p;
  const { mode } = p.practice;
  const queue = activePracticeQueue(p, mode);
  const index = queue.indexOf(currentPracticeId(p.exerciseId));
  if (index < 0) return p;
  const nextIndex = index + direction;
  if (nextIndex >= queue.length)
    return {
      ...p,
      updatedAt: at,
      practice: { ...p.practice, ended: { ...p.practice.ended, [mode]: true } },
    };
  if (nextIndex < 0) return p;
  return visitPractice(
    {
      ...p,
      practice: {
        ...p.practice,
        ended: { ...p.practice.ended, [mode]: false },
      },
    },
    queue[nextIndex],
    at,
  );
}
export function viewPracticeKnowledge(
  p: FaultProgress,
  topicId: string,
  at: string,
) {
  if (!p.practice || !practiceKnowledge[topicId]) return p;
  const draft = p.drafts[p.exerciseId] ?? freshDraft();
  if (isChapterReview(p.exerciseId) && !draft.submittedId) return p;
  const question = practiceQuestion(p.exerciseId);
  const related =
    practiceTopic(p.exerciseId).id === topicId ||
    question.relatedTopicIds?.includes(topicId);
  return {
    ...p,
    updatedAt: at,
    practice: {
      ...p.practice,
      knowledgeViewed: { ...p.practice.knowledgeViewed, [topicId]: at },
    },
    drafts:
      related && !draft.submittedId
        ? { ...p.drafts, [p.exerciseId]: { ...draft, hintUsed: true } }
        : p.drafts,
  };
}
export function restartPractice(
  p: FaultProgress,
  at: string,
  onlyPending = false,
) {
  if (!p.practice) return p;
  const mode = p.practice.mode;
  let next = p;
  if (!onlyPending)
    for (const id of activePracticeQueue(p, mode))
      // Unsubmitted answers (including feedback-linked rewrites) have no
      // immutable attempt to restore from. Repeating must keep that draft.
      if (next.drafts[id]?.submittedId)
        next = retryExercise({ ...next, exerciseId: id });
  next = {
    ...next,
    practice: { ...p.practice, ended: { ...p.practice.ended, [mode]: false } },
  };
  return visitPractice(
    next,
    onlyPending ? firstPending(next, mode) : activePracticeQueue(p, mode)[0],
    at,
  );
}
export function practiceResult(p: FaultProgress) {
  const draft = p.drafts[p.exerciseId] ?? freshDraft();
  const answer = p.attempts.find((a) => a.id === draft.submittedId);
  const q =
    (answer && savedExerciseFor(answer.exerciseId, answer.revision)) ??
    practiceQuestion(p.exerciseId);
  return {
    q,
    draft,
    answer,
    correct:
      answer && q.kind === "objective"
        ? isCorrectChoice(q, answer.choice)
        : null,
  };
}
export function topicMistakes(p: FaultProgress, topicId: string) {
  return p.attempts.filter((a) => {
    const q = savedExerciseFor(a.exerciseId, a.revision);
    return (
      q?.kind === "objective" &&
      practiceTopic(q.id).id === topicId &&
      validChoice(q, a.choice) &&
      !isCorrectChoice(q, a.choice)
    );
  }).length;
}
