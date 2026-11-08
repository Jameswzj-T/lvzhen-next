import { z } from "zod";
import {
  chooseTopic,
  freshProgress,
  progressSchema,
  freshDraft,
  submitExercise,
  submitRecall,
  type FaultProgress,
} from "./fault-progress";
import {
  guidedLessonFor,
  guidedExercises,
  isGuidedLesson,
  type GuidedLessonId,
} from "../content/guided-lessons";

// Keep the historical key so existing guest originals remain readable.
export const previewKey = "lvzhen:guided-lesson-preview:intent:v1";
const screenSchema = z.enum([
  "concept",
  "case",
  "objective",
  "objective-feedback",
  "subjective",
  "subjective-feedback",
  "recall",
  "finish",
]);
export const lessonSessionSchema = z
  .object({
    version: z.literal(1),
    screen: screenSchema,
    // Optional presentation hints. Answers, drafts and reviews have one store.
    positions: z
      .object({
        intent: screenSchema.optional(),
        confidence: screenSchema.optional(),
      })
      .optional(),
    progress: progressSchema,
  })
  .refine((s) => isGuidedLesson(s.progress.topicId));
export type LessonPreview = z.infer<typeof lessonSessionSchema>;
export type LessonScreen = LessonPreview["screen"];
export const initialLesson = (): LessonPreview => ({
  version: 1,
  screen: "concept",
  progress: chooseTopic(freshProgress(), "intent"),
});

/** Honor either lesson's actual cursor without discarding other course records. */
export function resumeLesson(input: FaultProgress): LessonPreview {
  const state = progressSchema.parse(input);
  let progress = isGuidedLesson(state.topicId)
    ? state
    : chooseTopic(state, "intent");
  const lesson = guidedLessonFor(progress.topicId);
  let screen: LessonScreen = "concept";
  if (progress.step === "practice") {
    const part = practiceScreen(progress);
    // Older cases remain in history; never show their answers under a new case.
    progress = prepareCasePractice(
      progress,
      part === "subjective" ? lesson.subjective.id : lesson.choice.id,
    );
    screen = progress.drafts[progress.exerciseId]?.submittedId
      ? (`${part}-feedback` as LessonScreen)
      : part;
  } else if (progress.step === "review")
    screen = progress.finished[progress.topicId] ? "finish" : "recall";
  else if (!isGuidedLesson(state.topicId) && progress.finished.intent)
    screen = "finish";
  return lessonSessionSchema.parse({ version: 1, screen, progress });
}

export function parseLessonImport(raw: string) {
  return lessonSessionSchema.parse(JSON.parse(raw)).progress;
}

export function lessonStep(screen: LessonScreen) {
  return screen === "concept" || screen === "case"
    ? 0
    : screen === "recall" || screen === "finish"
      ? 2
      : 1;
}

export function practiceScreen(progress: FaultProgress): LessonScreen {
  return progress.exerciseId === guidedLessonFor(progress.topicId).subjective.id
    ? "subjective"
    : "objective";
}

/** Switch only the current location. All originals and unfinished work stay put. */
export function switchLesson(
  session: LessonPreview,
  topicId: GuidedLessonId,
): LessonPreview {
  if (topicId === session.progress.topicId) return session;
  const lesson = guidedLessonFor(topicId);
  let progress = chooseTopic(session.progress, topicId);
  const positions = {
    ...session.positions,
    [session.progress.topicId]: session.screen,
  };
  let screen = positions[topicId];
  if (!screen) {
    const pending = [lesson.subjective, lesson.choice].find((q) => {
      const d = progress.drafts[q.id];
      return d && !d.submittedId && (d.answer.trim() || d.choice);
    });
    screen = pending
      ? pending.kind
      : progress.recallDrafts[topicId]?.answer.trim() ||
          progress.reviews.some((r) => r.topicId === topicId)
        ? "recall"
        : progress.attempts.some(
              (a) =>
                a.exerciseId === lesson.choice.id ||
                a.exerciseId === lesson.subjective.id,
            )
          ? "recall"
          : "concept";
  }
  if (lessonStep(screen) === 1) {
    const part = screen.startsWith("subjective") ? "subjective" : "objective";
    const q = part === "subjective" ? lesson.subjective : lesson.choice;
    progress = prepareCasePractice(progress, q.id);
    screen = progress.drafts[q.id]?.submittedId ? `${part}-feedback` : part;
  } else {
    progress = {
      ...progress,
      step: lessonStep(screen) === 2 ? "review" : "learn",
    };
  }
  return lessonSessionSchema.parse({ ...session, screen, progress, positions });
}

/** Reference exposure belongs to the shared case, independent of answer mode. */
export function markCaseReferenceSeen(progress: FaultProgress): FaultProgress {
  const drafts = { ...progress.drafts };
  for (const q of guidedExercises(progress.topicId)) {
    drafts[q.id] = { ...(drafts[q.id] ?? freshDraft()), referenceSeen: true };
  }
  return { ...progress, drafts };
}

export function prepareCasePractice(
  progress: FaultProgress,
  exerciseId: string,
): FaultProgress {
  const exercises = guidedExercises(progress.topicId);
  if (!exercises.some((q) => q.id === exerciseId))
    throw new Error("Exercise does not belong to the current guided case");
  const next = { ...progress, exerciseId, step: "practice" as const };
  return exercises.some((q) => progress.drafts[q.id]?.referenceSeen)
    ? markCaseReferenceSeen(next)
    : next;
}

export function submitCaseExercise(
  progress: FaultProgress,
  eventId: string,
  at: string,
) {
  const prepared = prepareCasePractice(progress, progress.exerciseId);
  const next = submitExercise(prepared, eventId, at);
  return next.attempts.length > progress.attempts.length
    ? markCaseReferenceSeen(next)
    : next;
}

/** The optional recall follows the visible summary, so it is not a blind recall. */
export function submitLessonRecall(
  progress: FaultProgress,
  timing: "again" | "later",
  eventId: string,
  at: string,
) {
  const draft = progress.recallDrafts[progress.topicId] ?? freshDraft();
  return submitRecall(
    {
      ...progress,
      recallDrafts: {
        ...progress.recallDrafts,
        [progress.topicId]: { ...draft, referenceSeen: true },
      },
    },
    timing,
    eventId,
    at,
  );
}

export function caseLearningSummary(progress: FaultProgress) {
  const lesson = guidedLessonFor(progress.topicId);
  const choice = progress.attempts.findLast(
    (a) => a.exerciseId === lesson.choice.id,
  );
  const writing = progress.attempts.findLast(
    (a) => a.exerciseId === lesson.subjective.id,
  );
  const choiceCorrect = choice ? choice.choice === lesson.choice.answer : null;
  const exposure = choice?.referenceSeenBeforeAnswer
    ? "（看过参考后的练习）"
    : choice?.hintUsed
      ? "（使用过提示）"
      : "";
  return {
    choice,
    writing,
    choiceCorrect,
    choiceText: choice
      ? `这次选择${choiceCorrect ? "正确" : "与参考不同"}${exposure}。`
      : "本案例还没有选择记录，可以以后再练。",
    writingText: writing
      ? `已保留你的原话${writing.referenceSeenBeforeAnswer ? "（看过参考后的练习）" : writing.hintUsed ? "（使用过提示）" : ""}；表达是否完整仍需核对。`
      : "这次没有写理由，还没有独立表达的记录。",
    next:
      choiceCorrect === false
        ? "再比较一次：接受结果，还是轻信能够避免。"
        : !choice && !writing
          ? "下次用这段案情试一次判断。"
          : lesson.nextPractice,
  };
}
