import {
  historicalPracticeTopicRevision,
  isHistoricalPracticeQuestion,
} from "../content/practice-content-history";
import type { FaultProgress } from "../domain/fault-progress";
import type { LessonStorage } from "./lesson-records";

/** Preserve the incoming bytes once per historical record, before normal saves.
 * The key depends only on old records, so answering new questions adds no copies.
 */
export async function preserveQuestionHistorySource(
  storage: LessonStorage,
  key: string,
  raw: string,
  state: FaultProgress,
) {
  const drafts = Object.entries(state.drafts)
    .filter(([id]) => isHistoricalPracticeQuestion(id))
    .sort(([a], [b]) => a.localeCompare(b));
  const attempts = state.attempts.filter((a) =>
    isHistoricalPracticeQuestion(a.exerciseId),
  );
  const reviews = state.reviews.filter((r) =>
    historicalPracticeTopicRevision(r.topicId, r.revision),
  );
  if (!drafts.length && !attempts.length && !reviews.length) return;
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(JSON.stringify({ drafts, attempts, reviews })),
  );
  const hash = Array.from(new Uint8Array(digest), (b) =>
    b.toString(16).padStart(2, "0"),
  ).join("");
  const backupKey = `${key}:question-history-source:${hash}`;
  if (storage.getItem(backupKey) === null) storage.setItem(backupKey, raw);
}
