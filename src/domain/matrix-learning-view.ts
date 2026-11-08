import { z } from "zod";
export const MATRIX_VIEW_VERSION = "matrix-learning-view-v1";
export const matrixViewStorageKey =
  "lvzhen:matrix-learning:cap-contract-v2-q2:v1";
export const MATRIX_ROWS = [
  "CF01:original:benefit",
  "CF01:original:organization",
  "CF01:rewrite:benefit",
  "CF01:rewrite:organization",
  "CF02:original:benefit",
  "CF02:original:organization",
  "CF02:rewrite:benefit",
  "CF02:rewrite:organization",
] as const;
const schema = z
  .object({
    version: z.literal(MATRIX_VIEW_VERSION),
    bindingKey: z.string().regex(/^[a-f0-9]{64}$/),
    withdrawn: z.array(z.enum(MATRIX_ROWS)).max(8),
  })
  .strict();
export type MatrixViewRecord = z.infer<typeof schema>;
export function readMatrixView(
  raw: string | null,
  bindingKey: string,
): MatrixViewRecord | null {
  try {
    const value =
      raw === null
        ? { version: MATRIX_VIEW_VERSION, bindingKey, withdrawn: [] }
        : JSON.parse(raw);
    const p = schema.parse(value);
    return p.bindingKey === bindingKey &&
      new Set(p.withdrawn).size === p.withdrawn.length
      ? p
      : null;
  } catch {
    return null;
  }
}
export function encodeMatrixView(value: MatrixViewRecord, bindingKey: string) {
  const raw = JSON.stringify(value);
  if (!readMatrixView(raw, bindingKey))
    throw Error("matrix-view-binding-invalid");
  return raw;
}
export function withdrawMatrixRow(
  record: MatrixViewRecord,
  id: string,
): MatrixViewRecord {
  if (!MATRIX_ROWS.includes(id as (typeof MATRIX_ROWS)[number]))
    throw Error("matrix-row-unrecognized");
  const key = id as (typeof MATRIX_ROWS)[number];
  return {
    ...record,
    withdrawn: record.withdrawn.includes(key)
      ? record.withdrawn
      : [...record.withdrawn, key],
  };
}
