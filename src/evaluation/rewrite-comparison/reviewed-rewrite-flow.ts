import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { digest } from "../model-config";
import { loadRewriteCandidate } from "./candidate";
import {
  loadReviewedReceipt,
  type ReviewedReceiptPreview,
} from "./reviewed-receipts-preview";
import { COMPONENT_DESIGN } from "./component-feedback";
import { unitBenefitRequest } from "./unit-benefit-review";
import { answerUnits } from "./protocol";
import type { RewriteCandidate, SyntheticPair } from "./contract";
import type { LocalRewriteFixture } from "../../domain/reviewed-rewrite-flow";

export function reviewedRewritePreview(
  entry: ReviewedReceiptPreview,
  candidate: RewriteCandidate,
  pair: SyntheticPair,
) {
  if (
    entry.id !== "UB02" ||
    pair.id !== "UB02" ||
    pair.provenance !== "authored_fiction" ||
    pair.exerciseId !== candidate.card.id ||
    pair.exerciseRevision !== candidate.card.exerciseRevision ||
    entry.sources.length !== 2 ||
    entry.sources[0].text !== pair.original.text ||
    entry.sources[1].text !== pair.rewrite.text ||
    entry.columns.map((c) => c.key).join() !== "original,rewrite" ||
    entry.automaticSemanticDecision !== false ||
    entry.scoringOrMasteryUse !== false ||
    digest(unitBenefitRequest(candidate, pair)) !== entry.requestHash
  )
    throw Error("reviewed-rewrite-source-mismatch");
  for (const [index, column] of entry.columns.entries()) {
    const units = answerUnits(entry.sources[index].text);
    if (
      column.items
        .flatMap((item) => item.evidence)
        .some((e) => !units.some((u) => u.text === e.quote))
    )
      throw Error("reviewed-flow-quote-unbound");
  }
  const fixture: LocalRewriteFixture = {
    sourceId: "UB02",
    questionId: "cap-contract-v2-q2",
    questionRevision: pair.exerciseRevision,
    original: { ...pair.original },
    bindingKey: digest({
      candidateIdentity: candidate.identity,
      pair,
      requestHash: entry.requestHash,
      receiptHash: entry.receiptHash,
      reviewHash: entry.reviewHash,
      displayVersion: entry.displayVersion,
      reviewVersion: entry.reviewVersion,
      design: COMPONENT_DESIGN,
    }),
  };
  return {
    fixture,
    entry,
    question: {
      prompt: candidate.card.prompt,
      facts: candidate.card.facts,
      requirements: candidate.card.criteria,
    },
    scopePrompt: COMPONENT_DESIGN.prompt,
    caseBoundary: COMPONENT_DESIGN.caseBoundary,
    defaultState: "insufficient" as const,
    supportedScope: "manually_reviewed_2-3-A_replay_only" as const,
    newRewriteEvaluationAvailable: false as const,
  };
}
// No sender, credentials, score storage or learner-record lookup.
export async function loadReviewedRewriteFlow(repo: string, sample: string) {
  if (sample !== "UB02") throw Error("fixed-fictional-flow-only");
  const entry = await loadReviewedReceipt(repo, sample);
  const candidate = await loadRewriteCandidate(repo);
  const pair: SyntheticPair = JSON.parse(
    await readFile(
      join(repo, "evals/unit-benefit-boundary-2026-10-01/pairs.json"),
      "utf8",
    ),
  ).pairs.find((p: SyntheticPair) => p.id === sample);
  return reviewedRewritePreview(entry, candidate, pair);
}
export type ReviewedRewriteFlow = Awaited<
  ReturnType<typeof loadReviewedRewriteFlow>
>;
