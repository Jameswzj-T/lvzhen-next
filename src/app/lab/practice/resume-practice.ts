import {
  isChapterReview,
  isPracticeLocation,
  practiceChapter,
  type PracticeMode,
} from "../../../content/practice-set";
import type { FaultProgress } from "../../../domain/fault-progress";
import { initializePractice, openPractice } from "../../../domain/practice";

// The library displays this mode's saved cursor. Resume that cursor in its own
// chapter, rather than applying the chapter left active by the other mode.
export function resumePracticeCursor(
  state: FaultProgress,
  mode: PracticeMode,
  at: string,
): FaultProgress {
  const next = initializePractice(state);
  const cursor = next.practice!.cursors[mode];
  if (!isPracticeLocation(cursor, mode)) return state;
  return openPractice(
    {
      ...next,
      practice: {
        ...next.practice!,
        mode,
        chapterId: practiceChapter(cursor).id,
        scope: isChapterReview(cursor) ? "review" : "topic",
      },
    },
    at,
    mode,
  );
}
