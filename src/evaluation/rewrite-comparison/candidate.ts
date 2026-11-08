import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { exerciseFor, exerciseRevision } from "../../content/fault-catalog";
import { digest } from "../model-config";
import { loadCard } from "../table-trial/candidate";
import type { CoverageSource } from "../short-coverage/contract";
import {
  REWRITE_VERSION,
  REWRITE_EXERCISE,
  type RewriteCandidate,
} from "./contract";

export const REWRITE_FILES = [
  "src/evaluation/rewrite-comparison/contract.ts",
  "src/evaluation/rewrite-comparison/candidate.ts",
  "src/evaluation/rewrite-comparison/protocol.ts",
  "src/evaluation/short-coverage/protocol.ts",
  "src/evaluation/whole-case-table.ts",
  "src/evaluation/model-config.ts",
  "src/content/scoring-cards/contract-v2/card.md",
  "src/content/scoring-cards/contract-v2/manifest.json",
  "src/content/rewrite-comparison/public-law.json",
];
export async function loadRewriteCandidate(
  repo: string,
): Promise<RewriteCandidate> {
  const { pack, manifest } = await loadCard(repo, "contract-v2");
  const question = pack.questions.find((q) => q.id === "2")!;
  const exercise = exerciseFor(REWRITE_EXERCISE)!;
  const publicSources: CoverageSource[] = JSON.parse(
    await readFile(
      join(repo, "src/content/rewrite-comparison/public-law.json"),
      "utf8",
    ),
  ).sources;
  if (
    question.prompt !== exercise.prompt ||
    pack.facts !== exercise.facts ||
    question.criteria.length !== 4 ||
    !publicSources.length
  )
    throw Error("rewrite-question-drift");
  const card = {
    id: REWRITE_EXERCISE,
    exerciseRevision: exerciseRevision(REWRITE_EXERCISE),
    title: exercise.title,
    facts: pack.facts,
    prompt: question.prompt,
    sourceIds: publicSources.map((s) => s.id),
    criteria: question.criteria.map((c, i) => ({
      id: c.id,
      originalId: exercise.criteria![i].id,
      title: c.title,
      requirement: c.requirement,
      boundary:
        "仅核对本问列明要求；不要求逐一分析甲乙丙丁、刑罚数额或其他小问。",
    })),
  };
  if (
    card.criteria.map((c) => c.id).join() !== "2-1,2-2,2-3,2-4" ||
    publicSources.some(
      (s) => !s.id || !s.text || !s.url.startsWith("https://"),
    ) ||
    JSON.stringify(publicSources).includes(exercise.reference)
  )
    throw Error("rewrite-public-source-drift");
  const sources = Object.fromEntries(
    await Promise.all(
      REWRITE_FILES.map(async (file) => [
        file,
        digest(await readFile(join(repo, file), "utf8")),
      ]),
    ),
  );
  return {
    version: REWRITE_VERSION,
    identity: digest({
      version: REWRITE_VERSION,
      card,
      publicSources,
      sources,
    }),
    cardHash: manifest.cardHash,
    card,
    publicSources,
  };
}
