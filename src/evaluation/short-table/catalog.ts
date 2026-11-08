import { readFile } from "node:fs/promises";
import { join } from "node:path";
import frozen from "../../content/scoring-cards-short/execution-v1.json";
import { exerciseFor, exerciseRevision } from "../../content/fault-catalog";
import { digest } from "../model-config";
import {
  QUESTION_SCOPED_VERSION,
  EVIDENCE_CHECK_VERSION,
  type QuestionScopedPack,
} from "../question-scoped-table";
import { loadTableCandidate } from "../table-trial/candidate";
import type { ShortSummary } from "./contract";
// Explicit scope: adding a bank question never silently enables evaluation.
export const SHORT_IDS = [
  "exec-credit-explain-ratios",
  "exec-credit-old-crime",
  "exec-combine-old-versus-new",
  "exec-combine-mixed-penalties",
  "exec-suspension-new-crime",
  "exec-suspension-violation",
  "exec-parole-eligibility",
  "exec-parole-two-clocks",
] as const;
export const SHORT_SOURCE_FILES = [
  "src/content/scoring-cards-short/execution-v1.json",
  "src/evaluation/short-table/catalog.ts",
  "src/evaluation/short-table/contract.ts",
  "src/evaluation/short-table/service.ts",
  "src/evaluation/short-table/provider.ts",
  "src/evaluation/short-table/practice-access.ts",
  "src/evaluation/local-scoring-access.ts",
  "src/app/api/lab/scoring/short-table/route.ts",
];
export const shortCards = frozen.cards.map((c) => {
  const pack = c.pack as QuestionScopedPack;
  const summary: ShortSummary = {
    id: c.id,
    title: c.title,
    exerciseRevision: c.exerciseRevision,
    maximum: 6,
  };
  return { summary, pack };
});
export const shortSummaries = shortCards.map((c) => c.summary);
export function validateShortCards() {
  if (
    new Set(shortCards.map((c) => c.summary.id)).size !== SHORT_IDS.length ||
    shortCards.length !== SHORT_IDS.length
  )
    throw Error("short-scope-drift");
  for (const { summary: c, pack } of shortCards) {
    const q = exerciseFor(c.id);
    if (
      !SHORT_IDS.includes(c.id as (typeof SHORT_IDS)[number]) ||
      !q ||
      q.kind !== "subjective" ||
      exerciseRevision(c.id) !== c.exerciseRevision ||
      pack.version !== QUESTION_SCOPED_VERSION ||
      pack.facts !== q.facts ||
      pack.questions.length !== 1 ||
      pack.questions[0].id !== "1" ||
      pack.questions[0].answer ||
      pack.questions[0].prompt !== q.prompt ||
      pack.questions[0].criteria.length !== 3 ||
      pack.questions[0].criteria.some(
        (p, i) =>
          p.id !== `1-${i + 1}` || p.questionId !== "1" || p.points !== 2,
      )
    )
      throw Error("invalid-short-card");
    const publicText = JSON.stringify(pack).replace(/\s+/g, "");
    if (publicText.includes(q.reference.replace(/\s+/g, "")))
      throw Error("short-reference-leak");
  }
}
export async function loadShortCandidate(repo: string) {
  validateShortCards();
  const parent = await loadTableCandidate(repo);
  const sources = Object.fromEntries(
    await Promise.all(
      SHORT_SOURCE_FILES.map(async (p) => [
        p,
        digest(await readFile(join(repo, p), "utf8")),
      ]),
    ),
  );
  return {
    cards: shortCards,
    parentIdentity: parent.identity,
    identity: digest({
      version: frozen.version,
      checker: EVIDENCE_CHECK_VERSION,
      parentIdentity: parent.identity,
      cards: shortCards,
      sources,
    }),
  };
}
