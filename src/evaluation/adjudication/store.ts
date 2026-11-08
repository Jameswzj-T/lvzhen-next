import { mkdir, readFile, rename, writeFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { digest } from "../model-config";
import {
  ADJUDICATION_VERSION,
  adjudicationRow,
  type AdjudicationRow,
  type QueueItem,
} from "./contract";

// Corpus rows live outside Git with the other personal review material.
export const adjudicationRoot = (repo: string) =>
  join(repo, "artifacts", "adjudication-corpus");
const rowId = (reviewId: string, criterionId: string) =>
  digest({ reviewId, criterionId });

async function atomic(path: string, value: unknown) {
  const tmp = `${path}.${randomUUID()}.tmp`;
  await writeFile(tmp, JSON.stringify(value, null, 2), {
    flag: "wx",
    mode: 0o600,
  });
  await rename(tmp, path);
}

export async function readRows(repo: string): Promise<AdjudicationRow[]> {
  let files: string[];
  try {
    files = await readdir(adjudicationRoot(repo));
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw e;
  }
  const rows = await Promise.all(
    files
      .filter((f) => /^[a-f0-9]{64}\.json$/.test(f))
      .map(async (f) =>
        adjudicationRow.parse(
          JSON.parse(await readFile(join(adjudicationRoot(repo), f), "utf8")),
        ),
      ),
  );
  return rows.filter((r) => r.id === rowId(r.reviewId, r.criterionId));
}

// Re-adjudicating the same item overwrites the row but keeps its first stamp,
// so the corpus records the latest ruling and when the item first appeared.
export async function upsertRow(
  repo: string,
  item: QueueItem,
  userLabel: AdjudicationRow["userLabel"],
  note?: string,
): Promise<AdjudicationRow> {
  const root = adjudicationRoot(repo);
  await mkdir(root, { recursive: true });
  const id = rowId(item.reviewId, item.criterionId);
  const path = join(root, `${id}.json`);
  const now = new Date().toISOString();
  let createdAt = now;
  try {
    createdAt = adjudicationRow.parse(
      JSON.parse(await readFile(path, "utf8")),
    ).createdAt;
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code !== "ENOENT") throw e;
  }
  const row: AdjudicationRow = {
    version: ADJUDICATION_VERSION,
    id,
    reviewId: item.reviewId,
    caseId: item.caseId,
    criterionId: item.criterionId,
    requirement: item.requirement,
    answerQuotes: item.quotes,
    modelLabel: item.modelLabel,
    modelReason: item.modelReason,
    frozenExpected: item.frozenExpected,
    userLabel,
    agreesWithModel: userLabel === item.modelLabel,
    ...(note ? { note } : {}),
    createdAt,
    updatedAt: now,
  };
  await atomic(path, row);
  return row;
}
export { rowId as adjudicationRowId };
