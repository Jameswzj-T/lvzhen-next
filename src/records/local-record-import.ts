import {
  faultStorageKey,
  freshProgress,
  progressSchema,
  type FaultProgress,
} from "../domain/fault-progress";
import { planImport } from "./import-plan";
import type { LessonStorage } from "./lesson-records";
import { sameRecord } from "./protocol";
import { MAX_LEARNING_RECORD_BYTES } from "./limits";

function withoutAutomaticPlan(state: FaultProgress) {
  const {
    updatedAt: _updatedAt,
    learningPreferences: _preferences,
    dailyLearningPlan: _plan,
    ...learning
  } = state;
  return learning;
}

/** Reuse the normal export, merge and recovery-copy formats without an account. */
export function previewLocalRecordImport(
  storage: LessonStorage,
  input: FaultProgress,
) {
  const source = progressSchema.parse(input);
  const raw = storage.getItem(faultStorageKey);
  const current = raw === null ? null : progressSchema.parse(JSON.parse(raw));
  // Visiting the fresh home page creates an automatic plan, not a learning
  // history. A first restore must still recover the file's position/preferences.
  const restoresPosition =
    current === null ||
    sameRecord(
      withoutAutomaticPlan(current),
      withoutAutomaticPlan(progressSchema.parse(freshProgress())),
    );
  const plan = planImport(restoresPosition ? null : current, source);
  if (
    new TextEncoder().encode(JSON.stringify(plan.state)).byteLength >
    MAX_LEARNING_RECORD_BYTES
  )
    throw new Error("record_too_large");
  return { raw, source, plan, restoresPosition };
}

export type LocalRecordImportPreview = ReturnType<
  typeof previewLocalRecordImport
>;

/** Bind confirmation to the exact checkpoint that was previewed. Keep both the
 * pre-restore checkpoint and the complete source before changing the live key. */
export function commitLocalRecordImport(
  storage: LessonStorage,
  preview: LocalRecordImportPreview,
  copyId: string,
) {
  if (
    !/^[a-zA-Z0-9-]{1,100}$/.test(copyId) ||
    storage.getItem(faultStorageKey) !== preview.raw
  )
    throw new Error("local_changed");
  const checked = previewLocalRecordImport(storage, preview.source);
  if (
    checked.raw !== preview.raw ||
    !sameRecord(checked.plan.state, preview.plan.state)
  )
    throw new Error("preview_changed");
  const copies = [
    ...(preview.raw === null
      ? []
      : [{ key: `${faultStorageKey}:recovery:${copyId}-before`, raw: preview.raw }]),
    {
      key: `${faultStorageKey}:recovery:${copyId}-source`,
      raw: JSON.stringify(checked.source),
    },
  ];
  if (copies.some((copy) => storage.getItem(copy.key) !== null))
    throw new Error("copy_exists");
  for (const copy of copies) {
    storage.setItem(copy.key, copy.raw);
    if (storage.getItem(copy.key) !== copy.raw)
      throw new Error("copy_not_saved");
  }
  // Another tab may have written while copies were being retained.
  if (storage.getItem(faultStorageKey) !== preview.raw)
    throw new Error("local_changed");
  const next = JSON.stringify(checked.plan.state);
  storage.setItem(faultStorageKey, next);
  if (storage.getItem(faultStorageKey) !== next)
    throw new Error("local_changed");
  return { state: checked.plan.state, copyKeys: copies.map((copy) => copy.key) };
}
