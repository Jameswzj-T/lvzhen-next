import {
  remainingG6SubjectIds,
  isRemainingG6Subject,
} from "../content/remaining-g6-subjects";
import { remainingG6SectionsForSubject } from "../content/remaining-g6";
import { commercialSections } from "../content/commercial-sections";
import { administrativeSections } from "../content/administrative-sections";
import { criminalChapters } from "../content/criminal-curriculum";
import { criminalProcedureSections } from "../content/criminal-procedure-sections";
import { exerciseRevision } from "../content/fault-catalog";
import {
  chapterQueue,
  currentPracticeId,
  practiceChapter,
  practiceSubject,
  subjectPracticeQueues,
  isChapterReview,
  type PracticeMode,
  type PracticeScope,
} from "../content/practice-set";
import type { FaultProgress } from "./fault-progress";
import { visitPractice } from "./practice";
import { beginChapterPractice } from "./study-space";

export type ChapterPracticeContinuation = {
  chapterId: string;
  chapterTitle: string;
  questionId: string;
  mode: PracticeMode;
  scope: PracticeScope;
  stage: "draft" | "unanswered" | "answered";
};

// Completion means saved answers in this mode/scope, never mastery or a model
// grade. Reading the recommendation changes no answers, feedback or cursors.
export function projectChapterPracticeContinuation(
  state: FaultProgress,
): ChapterPracticeContinuation | null {
  const practice = state.practice;
  const subject = practiceSubject(state.exerciseId);
  if (
    !practice ||
    !practice.ended[practice.mode] ||
    !subject ||
    ![
      "criminal-law",
      "civil-law",
      "civil-procedure",
      "criminal-procedure",
      "administrative-law",
      "commercial-law",
      ...remainingG6SubjectIds,
    ].includes(subject)
  )
    return null;
  const chapterId = practiceChapter(state.exerciseId).id;
  if (chapterId !== practice.chapterId) return null;
  const mode = practice.mode;
  const scope = practice.scope ?? "topic";
  if (subject !== "criminal-law" && scope !== "topic") return null;
  const queue = chapterQueue(chapterId, mode, scope);
  const hasAnswer = (id: string) => {
    const original = state.attempts.find(
      (a) => a.id === state.drafts[id]?.submittedId,
    );
    return (
      !!original &&
      original.exerciseId === id &&
      original.revision === exerciseRevision(id)
    );
  };
  if (
    !queue.includes(currentPracticeId(state.exerciseId)) ||
    !queue.every(hasAnswer)
  )
    return null;
  // Keep each subject's published ordinary-chapter order, skip chapters without
  // this mode, and keep the separately entered integrated cases out of this path.
  const ordinaryQueues =
    subject !== "criminal-law" ? subjectPracticeQueues(subject) : null;
  const chapterIds = isRemainingG6Subject(subject)
    ? remainingG6SectionsForSubject(subject).flatMap((s) => s.chapterIds)
    : subject === "commercial-law"
      ? commercialSections.flatMap((section) => section.chapterIds)
      : subject === "criminal-procedure"
        ? criminalProcedureSections.flatMap((section) => section.chapterIds)
        : subject === "administrative-law"
          ? administrativeSections.flatMap((section) => section.chapterIds)
          : ordinaryQueues
            ? [
                ...new Set(
                  [...ordinaryQueues.subjective, ...ordinaryQueues.objective]
                    .filter((id) => !isChapterReview(id))
                    .map((id) => practiceChapter(id).id),
                ),
              ]
            : criminalChapters.map((c) => c.id);
  const index = chapterIds.indexOf(chapterId);
  const nextId = ordinaryQueues
    ? chapterIds
        .slice(index + 1)
        .find((id) => chapterQueue(id, mode, scope).length > 0)
    : chapterIds[index + 1];
  if (index < 0 || !nextId) return null;
  const nextQueue = chapterQueue(nextId, mode, scope);
  if (!nextQueue.length) return null;
  const chapter = practiceChapter(nextQueue[0]);
  if (!chapter) return null;
  const candidates = chapterQueue(chapter.id, mode, scope);
  if (!candidates.length) return null;
  const pending = candidates.filter((id) => !hasAnswer(id));
  const draft = pending.find((id) => {
    const saved = state.drafts[id];
    return mode === "subjective"
      ? !!saved?.answer.trim()
      : !!saved?.choice.trim();
  });
  return {
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    questionId: draft ?? pending[0] ?? candidates[0],
    mode,
    scope,
    stage: draft ? "draft" : pending.length ? "unanswered" : "answered",
  };
}

/** Recompute on click; an old button cannot start an arbitrary chapter or
 * clear another draft. Existing submitted answers open for reading unchanged. */
export function prepareChapterPracticeContinuation(
  state: FaultProgress,
  questionId: string,
  at: string,
): FaultProgress | null {
  const next = projectChapterPracticeContinuation(state);
  if (next?.questionId !== questionId) return null;
  return visitPractice(
    beginChapterPractice(state, next.chapterId, next.mode, at, next.scope),
    questionId,
    at,
  );
}
