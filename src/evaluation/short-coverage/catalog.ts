import { readFile } from "node:fs/promises";
import { join } from "node:path";
import frozen from "../../content/scoring-cards-short/person-coverage-v1.json";
import laws from "../../content/scoring-cards-short/person-public-law-v1.json";
import { exerciseFor, exerciseRevision } from "../../content/fault-catalog";
import { digest } from "../model-config";
import {
  COVERAGE_VERSION,
  type CoverageCard,
  type CoverageSample,
} from "./contract";
export const coverageCards: CoverageCard[] = frozen.cards;
export const coverageSources = laws.sources;
export const COVERAGE_IDS = [
  "person-gap-age-evidence-time",
  "person-gap-stop-two-causes",
  "person-gap-place-and-witnesses",
  "person-gap-insult-not-all-abuse",
  "person-gap-witness-injury-conversion",
  "person-gap-insult-publicity-limit",
  "person-minor-two-organizing-rules",
  "person-resale-purpose-timeline",
] as const;
export const COVERAGE_FILES = [
  "src/content/scoring-cards-short/person-coverage-v1.json",
  "src/content/scoring-cards-short/person-public-law-v1.json",
  "src/evaluation/short-coverage/catalog.ts",
  "src/evaluation/short-coverage/contract.ts",
  "src/evaluation/short-coverage/protocol.ts",
  "src/evaluation/short-coverage/trial.ts",
  "src/evaluation/short-table/provider.ts",
  "src/evaluation/provider.ts",
  "src/evaluation/whole-case-table.ts",
  "src/evaluation/price-window.ts",
  "checks/person-coverage-trial.ts",
];
export function validateCoverageCards() {
  if (
    frozen.version !== COVERAGE_VERSION ||
    coverageCards.length !== COVERAGE_IDS.length ||
    new Set(coverageCards.map((c) => c.id)).size !== COVERAGE_IDS.length
  )
    throw Error("coverage-scope-drift");
  for (const card of coverageCards) {
    const q = exerciseFor(card.id);
    if (
      !COVERAGE_IDS.includes(card.id as (typeof COVERAGE_IDS)[number]) ||
      !q ||
      q.kind !== "subjective" ||
      !q.criteria ||
      card.exerciseRevision !== exerciseRevision(card.id) ||
      card.facts !== q.facts ||
      card.prompt !== q.prompt ||
      card.criteria.length !== q.criteria.length
    )
      throw Error("coverage-question-drift");
    const originalCriteria = q.criteria;
    if (
      card.criteria.some(
        (c, i) =>
          c.id !== `1-${i + 1}` ||
          c.originalId !== originalCriteria[i].id ||
          c.requirement !== originalCriteria[i].meaning ||
          c.boundary !== originalCriteria[i].boundary ||
          c.title !== originalCriteria[i].label ||
          Object.hasOwn(c, "points"),
      )
    )
      throw Error("coverage-criterion-drift");
    if (card.sourceIds.some((id) => !coverageSources.some((s) => s.id === id)))
      throw Error("coverage-source-missing");
    const publicText = JSON.stringify(coverageSources).replace(/\s/g, "");
    if (
      publicText.includes(q.reference.replace(/\s/g, "")) ||
      publicText.includes(q.facts.replace(/\s/g, ""))
    )
      throw Error("reference-in-public-law");
  }
}
export function validateCoverageSamples(samples: CoverageSample[]) {
  if (samples.length !== 24 || new Set(samples.map((s) => s.id)).size !== 24)
    throw Error("sample-scope-drift");
  for (const card of coverageCards) {
    const group = samples.filter((s) => s.exerciseId === card.id);
    if (group.length !== 3 || new Set(group.map((s) => s.kind)).size !== 3)
      throw Error("missing-sample-kind");
    for (const sample of group) {
      if (
        !sample.answer.trim() ||
        sample.answer.length > 5000 ||
        sample.expected.length !== card.criteria.length
      )
        throw Error("invalid-gold");
      for (const [i, gold] of sample.expected.entries()) {
        if (
          gold.criterionId !== card.criteria[i].id ||
          !["是", "否", "待核对"].includes(gold.label) ||
          !gold.reason ||
          gold.evidence.some((q) => !q || !sample.answer.includes(q)) ||
          (gold.label === "是" && !gold.evidence.length) ||
          (card.criteria[i].manualHold && gold.label !== "待核对")
        )
          throw Error("invalid-gold-evidence");
      }
    }
  }
}
export async function loadCoverageCandidate(repo: string) {
  validateCoverageCards();
  const sources = Object.fromEntries(
    await Promise.all(
      COVERAGE_FILES.map(async (p) => [
        p,
        digest(await readFile(join(repo, p), "utf8")),
      ]),
    ),
  );
  return {
    identity: digest({
      version: COVERAGE_VERSION,
      sources,
      cards: coverageCards,
    }),
    sources,
    cards: coverageCards,
  };
}
