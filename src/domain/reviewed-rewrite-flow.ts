import { z } from "zod";
import {
  exerciseFor,
  exerciseRevision,
  learningTopics,
} from "../content/fault-catalog";
import {
  freshDraft,
  freshProgress,
  progressSchema,
  submitExercise,
} from "./fault-progress";

export const LOCAL_REWRITE_VERSION = "reviewed-complete-question-local-v1";
// Deliberately separate from learner records, accounts and synchronization.
export const localRewriteStorageKey = "lvzhen:reviewed-rewrite:UB02:v1";
export type LocalRewriteFixture = {
  sourceId: "UB02";
  bindingKey: string;
  questionId: "cap-contract-v2-q2";
  questionRevision: string;
  original: { attemptId: string; text: string };
};
const schema = z
  .object({
    version: z.literal(LOCAL_REWRITE_VERSION),
    bindingKey: z.string().regex(/^[a-f0-9]{64}$/),
    withdrawn: z.boolean(),
    progress: progressSchema,
  })
  .strict();
export type LocalRewriteRecord = z.infer<typeof schema>;

export function newLocalRewrite(
  fixture: LocalRewriteFixture,
): LocalRewriteRecord {
  if (
    fixture.sourceId !== "UB02" ||
    fixture.questionId !== "cap-contract-v2-q2" ||
    fixture.questionRevision !== exerciseRevision(fixture.questionId)
  )
    throw Error("fixed-reviewed-question-only");
  const question = exerciseFor(fixture.questionId)!;
  const progress = freshProgress();
  progress.exerciseId = question.id;
  progress.topicId = learningTopics.find((t) =>
    t.exercises.some((q) => q.id === question.id),
  )!.id;
  progress.drafts[question.id] = {
    ...freshDraft(),
    answer: fixture.original.text,
  };
  return schema.parse({
    version: LOCAL_REWRITE_VERSION,
    bindingKey: fixture.bindingKey,
    withdrawn: false,
    // Synthetic initialization time, not a claimed learner submission.
    progress: submitExercise(
      progress,
      fixture.original.attemptId,
      "2026-10-01T00:00:00.000Z",
    ),
  });
}
const immutable = (progress: LocalRewriteRecord["progress"]) => {
  const {
    updatedAt: _at,
    corrections: _rewrites,
    correctionDrafts: _drafts,
    ...rest
  } = progress;
  return JSON.stringify(rest);
};

export function readLocalRewrite(
  raw: string | null,
  fixture: LocalRewriteFixture,
): LocalRewriteRecord | null {
  try {
    const initial = newLocalRewrite(fixture);
    if (raw === null) return initial;
    const value = schema.parse(JSON.parse(raw));
    if (
      value.bindingKey !== fixture.bindingKey ||
      immutable(value.progress) !== immutable(initial.progress)
    )
      return null;
    return value;
  } catch {
    return null;
  }
}
export function encodeLocalRewrite(
  value: LocalRewriteRecord,
  fixture: LocalRewriteFixture,
) {
  const raw = JSON.stringify(value);
  if (!readLocalRewrite(raw, fixture))
    throw Error("local-rewrite-binding-mismatch");
  return raw;
}
// Exact text comparison only. No model result exists for a newly saved rewrite.
export function localRewriteComparison(
  record: LocalRewriteRecord,
  fixture: LocalRewriteFixture,
) {
  const bound = readLocalRewrite(JSON.stringify(record), fixture);
  if (!bound) return null;
  const history = [...bound.progress.corrections].sort(
    (a, b) =>
      b.submittedAt.localeCompare(a.submittedAt) || b.id.localeCompare(a.id),
  );
  const latest = history.find(
    (c) => c.attemptId === fixture.original.attemptId && c.answer.trim(),
  );
  return {
    original: fixture.original.text,
    rewrite: latest ?? null,
    state: "insufficient" as const,
    textChanged: latest ? latest.answer !== fixture.original.text : null,
    reason: latest
      ? "这份新重答尚未评阅，暂不能确认是否改正。"
      : "尚未保存独立重答。",
    scoringChanged: false as const,
    masteryWritten: false as const,
  };
}
