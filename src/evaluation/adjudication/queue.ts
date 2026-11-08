import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { digest } from "../model-config";
import { SCORING_CARDS_ROOT, loadCard } from "../table-trial/candidate";
import { checkSamples } from "../table-trial/samples";
import { tableTrialRoot } from "../table-trial/service";
import type { TableResult } from "../table-trial/contract";
import { readRows } from "./store";
import type { QueueItem, QueueReview } from "./contract";

// Open items are the judgments worth a human ruling: synthetic reviews whose
// model label departs from the frozen expectation (or was held back), and
// every item of a real answer, since only its author can confirm the scale.
// Items the model and the frozen expectation agree on teach nothing new.
export async function buildQueue(repo: string): Promise<QueueReview[]> {
  const catalog = (
    JSON.parse(
      await readFile(join(repo, SCORING_CARDS_ROOT, "catalog.json"), "utf8"),
    ) as { cases: string[] }
  ).cases;
  const expectedByCase = new Map<string, Map<string, Record<string, string>>>();
  for (const dir of catalog) {
    const { manifest, pack } = await loadCard(repo, dir);
    const samples = checkSamples(
      pack,
      JSON.parse(
        await readFile(
          join(repo, SCORING_CARDS_ROOT, dir, "samples.json"),
          "utf8",
        ),
      ),
    );
    const byAnswers = new Map<string, Record<string, string>>();
    for (const s of samples.samples)
      byAnswers.set(digest(s.answers), s.expected);
    expectedByCase.set(manifest.id, byAnswers);
  }
  const rows = await readRows(repo);
  const done = new Set(rows.map((r) => `${r.reviewId}:${r.criterionId}`));
  let files: string[];
  try {
    files = await readdir(join(tableTrialRoot(repo), "answers"));
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw e;
  }
  const reviews: QueueReview[] = [];
  for (const f of files.filter((n) => /^[a-f0-9]{64}\.json$/.test(n)).sort()) {
    const result = (await readFile(
      join(tableTrialRoot(repo), "answers", f),
      "utf8",
    ).then((t) => JSON.parse(t))) as TableResult;
    if (!result.assessment?.valid) continue;
    const expected = expectedByCase
      .get(result.case.id)
      ?.get(digest(result.answers));
    const open: QueueItem[] = [];
    for (const item of result.assessment.items) {
      if (done.has(`${result.id}:${item.id}`)) continue;
      const frozen = expected?.[item.id] ?? null;
      if (expected && item.reviewStatus === "ready" && item.label === frozen)
        continue;
      open.push({
        reviewId: result.id,
        caseId: result.case.id,
        criterionId: item.id,
        questionId: item.questionId,
        requirement: item.requirement,
        quotes: item.sourceQuotes.length ? item.sourceQuotes : item.quotes,
        modelLabel: item.label,
        modelReason: item.explanation,
        reviewStatus: item.reviewStatus,
        frozenExpected: frozen as QueueItem["frozenExpected"],
      });
    }
    if (open.length)
      reviews.push({
        reviewId: result.id,
        caseId: result.case.id,
        title: result.case.title,
        createdAt: result.createdAt,
        kind: expected ? "frozen-sample" : "real-answer",
        total: result.total,
        maximum: result.maximum,
        open,
      });
  }
  return reviews.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
