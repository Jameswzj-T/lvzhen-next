import { progressSchema, type FaultProgress } from "../domain/fault-progress";
import { parseLessonImport } from "../domain/lesson-session";
import { MAX_LEARNING_RECORD_BYTES } from "./limits";

export type LearningRecordFile = { id: string; state: FaultProgress }[];
/** Old conflict exports contain multiple preserved checkpoints. The user must
 * choose one; parsing never writes storage, merges, or discards the other copies. */
export function readLearningRecordFile(raw: string): LearningRecordFile {
  if (new TextEncoder().encode(raw).byteLength > MAX_LEARNING_RECORD_BYTES)
    throw new Error("record_too_large");
  const value = JSON.parse(raw);
  if (value && Object.hasOwn(value, "recoveryCopies")) {
    const copies = value.recoveryCopies;
    if (!Array.isArray(copies) || copies.length === 0 || copies.length > 100)
      throw new Error("invalid_recovery_copies");
    const ids = new Set<string>();
    return copies.map((copy: unknown) => {
      if (
        !copy ||
        typeof copy !== "object" ||
        !("id" in copy) ||
        typeof copy.id !== "string" ||
        !copy.id ||
        copy.id.length > 200 ||
        ids.has(copy.id) ||
        !("state" in copy)
      )
        throw new Error("invalid_recovery_copy");
      ids.add(copy.id);
      return { id: copy.id, state: progressSchema.parse(copy.state) };
    });
  }
  return [
    {
      id: "record",
      state: value?.screen
        ? parseLessonImport(raw)
        : progressSchema.parse(value),
    },
  ];
}
