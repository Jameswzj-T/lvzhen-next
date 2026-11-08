import { z } from "zod";
import type { ReviewSuggestion } from "../domain/review-suggestions";
import type { LessonStorage } from "./lesson-records";

const deferredSchema = z
  .object({
    questionId: z.string().min(1).max(120),
    revision: z.string().min(1).max(160),
    evidenceKey: z.string().min(1).max(2048),
    at: z.iso.datetime(),
  })
  .strict();
const preferencesSchema = z
  .object({
    version: z.literal(1),
    deferred: z.array(deferredSchema).max(1500),
  })
  .strict()
  .refine(
    (value) =>
      new Set(
        value.deferred.map((row) =>
          JSON.stringify([row.questionId, row.revision]),
        ),
      ).size === value.deferred.length,
    "duplicate-review-choice",
  );
type Preferences = z.infer<typeof preferencesSchema>;
export type ReviewChoiceSnapshot = {
  key: string;
  raw: string | null;
  value: Preferences;
};
export const reviewChoiceKey = (ownerId: string | null) =>
  `lvzhen:review-choices:v1:${ownerId === null ? "guest" : `account:${encodeURIComponent(ownerId)}`}`;

/** Owner-scoped browser metadata only. Never passed into PracticeRecords/sync,
 * model input, or a record of answers, summaries, completion or mastery. */
export function readReviewChoices(
  storage: LessonStorage,
  ownerId: string | null,
): ReviewChoiceSnapshot {
  const key = reviewChoiceKey(ownerId),
    raw = storage.getItem(key);
  if (raw !== null && raw.length > 4_000_000) throw Error("review-choice-size");
  return {
    key,
    raw,
    value:
      raw === null
        ? { version: 1, deferred: [] }
        : preferencesSchema.parse(JSON.parse(raw)),
  };
}
export function isReviewDeferred(
  snapshot: ReviewChoiceSnapshot,
  item: ReviewSuggestion,
) {
  return snapshot.value.deferred.some(
    (row) =>
      row.questionId === item.questionId &&
      row.revision === item.revision &&
      row.evidenceKey === item.evidenceKey,
  );
}
export function writeReviewChoice(
  storage: LessonStorage,
  ownerId: string | null,
  expected: ReviewChoiceSnapshot,
  item: ReviewSuggestion,
  defer: boolean,
  at: string,
): ReviewChoiceSnapshot {
  z.iso.datetime().parse(at);
  if (expected.key !== reviewChoiceKey(ownerId))
    throw Error("review-choice-owner-changed");
  if (storage.getItem(expected.key) !== expected.raw)
    throw Error("review-choice-changed-elsewhere");
  const rows = expected.value.deferred.filter(
    (row) =>
      row.questionId !== item.questionId || row.revision !== item.revision,
  );
  if (defer)
    rows.push(
      deferredSchema.parse({
        questionId: item.questionId,
        revision: item.revision,
        evidenceKey: item.evidenceKey,
        at,
      }),
    );
  const value = preferencesSchema.parse({ version: 1, deferred: rows });
  if (defer && isReviewDeferred(expected, item)) return expected;
  if (!defer && rows.length === expected.value.deferred.length) return expected;
  const raw = JSON.stringify(value);
  storage.setItem(expected.key, raw);
  if (storage.getItem(expected.key) !== raw)
    throw Error("review-choice-save-unconfirmed");
  return { key: expected.key, raw, value };
}
