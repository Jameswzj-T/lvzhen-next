import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { z } from "zod";
import { digest } from "../model-config";
import {
  questionScopedPack,
  QUESTION_SCOPED_VERSION,
  EVIDENCE_CHECK_VERSION,
  QUESTION_SCOPED_INSTRUCTION,
} from "../question-scoped-table";
import { tableCaseId, type TableCase } from "./contract";
export const TABLE_SOURCE_FILES = [
  "src/evaluation/table-trial/availability.ts",
  "src/evaluation/question-scoped-table.ts",
  "src/evaluation/whole-case-table.ts",
  "src/evaluation/table-trial/workflow.ts",
  "src/evaluation/table-trial/service.ts",
  "src/evaluation/table-trial/contract.ts",
  "src/evaluation/table-trial/candidate.ts",
  "src/evaluation/provider.ts",
  "src/evaluation/price-window.ts",
];
// One folder per case, listed in display order by catalog.json. Adding a case
// adds a folder; the loader itself does not change.
export const SCORING_CARDS_ROOT = "src/content/scoring-cards";
const hash = z.string().regex(/^[a-f0-9]{64}$/);
export const cardManifest = z
  .object({
    id: tableCaseId,
    title: z.string().min(1),
    cardHash: hash,
    instructionHash: hash,
    samplesHash: hash,
  })
  .strict();
const dirName = z.string().regex(/^[a-z0-9-]+$/);
const cardCatalog = z
  .object({
    cases: z.array(dirName).min(1),
    // Archived cards stay loadable so saved reviews keep resolving; the
    // editor hides them, matching the archived assessment papers.
    archived: z.array(dirName).optional(),
  })
  .strict()
  .refine(
    (c) => (c.archived ?? []).every((dir) => c.cases.includes(dir)),
    "archived-not-in-cases",
  );
const readJson = async (path: string) =>
  JSON.parse(await readFile(path, "utf8"));

export async function loadCard(repo: string, dir: string) {
  const root = join(repo, SCORING_CARDS_ROOT, dir);
  const manifest = cardManifest.parse(
    await readJson(join(root, "manifest.json")),
  );
  const card = await readFile(join(root, "card.md"), "utf8");
  // A frozen card is never edited in place: fixing one means re-freezing it.
  if (
    digest(card) !== manifest.cardHash ||
    digest(QUESTION_SCOPED_INSTRUCTION) !== manifest.instructionHash
  )
    throw Error(`card-drift:${dir}`);
  const pack = questionScopedPack(card);
  if (
    pack.questions.map((q) => q.id).join() !== "1,2,3,4,5" ||
    pack.questions.some((q) => q.answer)
  )
    throw Error(`card-invalid:${dir}`);
  return { manifest, card, pack };
}

export async function loadTableCandidate(repo: string) {
  const catalog = cardCatalog.parse(
    await readJson(join(repo, SCORING_CARDS_ROOT, "catalog.json")),
  );
  const archivedDirs = new Set(catalog.archived ?? []);
  const cases = await Promise.all(
    catalog.cases.map(async (dir) => {
      const { manifest, pack } = await loadCard(repo, dir);
      const item: TableCase = {
        id: manifest.id,
        title: manifest.title,
        facts: pack.facts,
        questions: pack.questions.map(({ id, prompt, criteria }) => ({
          id,
          prompt,
          maximum: criteria.reduce((sum, c) => sum + c.points, 0),
        })),
      };
      return { item, pack, archived: archivedDirs.has(dir) };
    }),
  );
  if (new Set(cases.map((c) => c.item.id)).size !== cases.length)
    throw Error("duplicate-case-id");
  const archivedIds = cases.filter((c) => c.archived).map((c) => c.item.id);
  const sources = Object.fromEntries(
    await Promise.all(
      TABLE_SOURCE_FILES.map(async (p) => [
        p,
        digest(await readFile(join(repo, p), "utf8")),
      ]),
    ),
  );
  return {
    cases,
    archivedIds,
    identity: digest({
      version: QUESTION_SCOPED_VERSION,
      checker: EVIDENCE_CHECK_VERSION,
      // The archive flag is presentation: it must not change the review identity.
      cases: cases.map(({ item, pack }) => ({ item, pack })),
      sources,
    }),
    sources,
  };
}
