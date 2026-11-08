import {
  corePracticeSections,
  type CorePracticeSubject,
} from "../content/core-practice-sections";
import { exerciseFor, exerciseRevision } from "../content/fault-catalog";
import { practiceChapter, practiceTopic } from "../content/practice-set";
import type { FaultProgress } from "./fault-progress";
import { projectLearningReview } from "./learning-review";
import { isCorrectChoice, validChoice } from "./objective-answer";

export type CivilProcedureQuestionStatus =
  "unanswered" | "correct" | "wrong" | "needs_work" | "pending" | "historical";

/** A local directory of saved work. No new evaluation or mastery inference. */
export function projectCivilProcedureDirectory(
  state: FaultProgress,
  subject: CorePracticeSubject = "civil-procedure",
) {
  const written = new Map(
    projectLearningReview(state, subject).map((group) => [
      group.questionId,
      group.events[0],
    ]),
  );
  const paperAttempts = new Set(
    state.assessments?.runs.flatMap((run) => Object.values(run.attemptIds)) ??
      [],
  );
  const sections = corePracticeSections(subject);
  return sections.map((section) => ({
    ...section,
    questions: section.questionIds.map((id) => {
      const question = exerciseFor(id)!;
      const saved = state.attempts.filter(
        (a) => a.exerciseId === id && !paperAttempts.has(a.id),
      );
      const current = saved
        .filter((a) => a.revision === exerciseRevision(id))
        .sort(
          (a, b) =>
            Date.parse(b.submittedAt) - Date.parse(a.submittedAt) ||
            b.id.localeCompare(a.id),
        );
      const latest = current[0];
      let status: CivilProcedureQuestionStatus = latest
        ? "pending"
        : saved.length
          ? "historical"
          : "unanswered";
      const uniqueLatest =
        latest &&
        Number.isFinite(Date.parse(latest.submittedAt)) &&
        state.attempts.filter((a) => a.id === latest.id).length === 1 &&
        current.filter((a) => a.submittedAt === latest.submittedAt).length ===
          1;
      if (uniqueLatest && question.kind === "objective") {
        if (validChoice(question, latest.choice))
          status = isCorrectChoice(question, latest.choice)
            ? "correct"
            : "wrong";
      } else if (uniqueLatest) {
        const event = written.get(id);
        if (event?.attemptId === latest.id) {
          if (event.outcome === "supported_this_time") status = "correct";
          else if (event.outcome === "needs_work") status = "needs_work";
        }
      }
      const draft = state.drafts[id];
      return {
        id,
        title: question.title,
        kind: question.kind,
        chapterId: practiceChapter(id).id,
        chapterTitle: practiceChapter(id).title,
        topicId: practiceTopic(id).id,
        topicTitle: practiceTopic(id).title,
        status,
        savedCount: current.length,
        historicalCount: saved.length - current.length,
        mistakeCount: current.filter(
          (a) =>
            question.kind === "objective" &&
            validChoice(question, a.choice) &&
            !isCorrectChoice(question, a.choice),
        ).length,
        hasDraft:
          !!draft && !draft.submittedId && !!(draft.answer || draft.choice),
      };
    }),
  }));
}

export type CivilProcedureDirectory = ReturnType<
  typeof projectCivilProcedureDirectory
>;
export type CivilProcedureDirectoryQuestion =
  CivilProcedureDirectory[number]["questions"][number];
export type CivilProcedureDirectoryFilter = "all" | "needs_work" | "unanswered";

export function filterCivilProcedureQuestions(
  questions: CivilProcedureDirectoryQuestion[],
  mode: "objective" | "subjective",
  filter: CivilProcedureDirectoryFilter,
  search = "",
) {
  const words = search.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return questions.filter(
    (q) =>
      q.kind === mode &&
      (filter === "all" ||
        (filter === "needs_work"
          ? q.status === "wrong" || q.status === "needs_work"
          : q.savedCount === 0 || q.hasDraft)) &&
      words.every((word) =>
        `${q.title} ${q.chapterTitle} ${q.topicTitle}`
          .toLocaleLowerCase()
          .includes(word),
      ),
  );
}

export function civilProcedureChapterStart(
  questions: CivilProcedureDirectoryQuestion[],
) {
  return (
    questions.find((q) => q.hasDraft) ??
    questions.find((q) => q.savedCount === 0) ??
    questions[0]
  );
}
