import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { digest } from "../model-config";
import { loadRewriteCandidate } from "./candidate";
import type { SyntheticPair } from "./contract";
import {
  reasoningEnvelope,
  reasoningPeakBound,
  reasoningRequest,
  REASONING_IDS,
  REASONING_RULE,
} from "./reasoning-rewrite";

export const REASONING_PREVIEW_ROOT = "evals/reasoning-preview-2026-10-03";
const freezeHash =
  "ba62a6731b1d2edae6534704ed4f4fc4306c744db0c28c25aceb1df3cff448d9";
const fileHash = (text: string) =>
  createHash("sha256").update(text).digest("hex");
type Freeze = {
  ruleHash: string;
  baseIdentity: string;
  cardHash: string;
  frozenAtUtc: string;
  inputHashes: Record<string, string>;
  runtime: Record<string, string>;
  currentCalls: number;
  previousEstimatedCostCny: number;
  totalCallsLimit: number;
  totalBudgetCny: number;
  requests: Array<{
    id: string;
    pairHash: string;
    requestHash: string;
    requestFileHash: string;
    maxCostCny: number;
  }>;
  maximumCalls: number;
  totalReservedCny: number;
  perCallReservedCny: number;
  grantCreated: false;
  senderAdded: false;
  executionStatus: "offline_frozen_not_sent";
};

// Reads only fixed fictional files and public source code. No credentials,
// learner records, authorization creation, storage writes or transport.
export async function loadReasoningPreview(
  repo: string,
  read: (path: string) => Promise<string> = (p) => readFile(p, "utf8"),
) {
  return loadPreview(repo, read, false);
}

/** Historical display only. Never use this projection for sender admission.
 * The archived identity is accepted only after the complete question, both
 * authored answers and every reconstructed request match the immutable freeze.
 * Current transport/credential/config source bytes cannot authorize this replay
 * to execute; loadReasoningPreview retains their original strict checks. */
export async function loadReasoningArchivePreview(
  repo: string,
  read: (path: string) => Promise<string> = (p) => readFile(p, "utf8"),
) {
  return loadPreview(repo, read, true);
}

const sendingDependencies = new Set([
  "src/evaluation/model-config.ts",
  "src/evaluation/short-table/provider.ts",
  "src/evaluation/project-credentials.ts",
]);

async function loadPreview(
  repo: string,
  read: (path: string) => Promise<string>,
  archiveOnly: boolean,
) {
  const folder = join(repo, REASONING_PREVIEW_ROOT);
  const frozenText = await read(join(folder, "candidate-freeze.json"));
  if (fileHash(frozenText) !== freezeHash)
    throw Error("preview-freeze-mismatch");
  const frozen: Freeze = JSON.parse(frozenText);
  if (
    frozen.ruleHash !== digest(REASONING_RULE) ||
    frozen.maximumCalls !== 2 ||
    frozen.totalReservedCny !== 0.6 ||
    frozen.perCallReservedCny !== 0.3 ||
    frozen.grantCreated !== false ||
    frozen.senderAdded !== false ||
    frozen.executionStatus !== "offline_frozen_not_sent"
  )
    throw Error("preview-scope-mismatch");
  for (const [file, hash] of Object.entries(frozen.runtime)) {
    // These complete files bind the old sending runtime. Display instead binds
    // the full frozen request below; it does not establish runtime compatibility.
    if (archiveOnly && sendingDependencies.has(file)) continue;
    const actual = fileHash(await read(join(repo, file)));
    // The growing content registry is bound below by this fixed question's
    // complete candidate identity, version and frozen request. Unrelated new
    // questions must not invalidate those unchanged materials. Protocol and
    // other runtime source files still require their exact frozen bytes.
    if (actual !== hash && file !== "src/content/fault-catalog.ts")
      throw Error("preview-runtime-drift");
  }
  const pairsText = await read(join(folder, "pairs.json"));
  const pricingText = await read(join(folder, "pricing-source.json"));
  if (
    fileHash(pairsText) !== frozen.inputHashes["pairs.json"] ||
    fileHash(pricingText) !== frozen.inputHashes["pricing-source.json"]
  )
    throw Error("preview-input-drift");
  const pairs: SyntheticPair[] = JSON.parse(pairsText).pairs;
  if (pairs.map((p) => p.id).join() !== REASONING_IDS.join())
    throw Error("preview-two-fixed-pairs-only");
  const currentBase = await loadRewriteCandidate(repo);
  if (
    (!archiveOnly && currentBase.identity !== frozen.baseIdentity) ||
    currentBase.cardHash !== frozen.cardHash ||
    pairs.some(
      (pair) =>
        pair.exerciseId !== currentBase.card.id ||
        pair.exerciseRevision !== currentBase.card.exerciseRevision,
    )
  )
    throw Error("preview-question-drift");
  // No archived identity is returned unless all reconstructed request hashes
  // below agree, including facts, requirements, sources, answer IDs and text.
  const base = archiveOnly
    ? { ...currentBase, identity: frozen.baseIdentity }
    : currentBase;
  const samples = [];
  for (const pair of pairs) {
    const saved = frozen.requests.find((r) => r.id === pair.id);
    const text = await read(join(folder, `${pair.id}-request.json`));
    const request = reasoningRequest(base, pair),
      bound = reasoningPeakBound(request);
    if (
      !saved ||
      fileHash(text) !== saved.requestFileHash ||
      digest(JSON.parse(text)) !== saved.requestHash ||
      digest(request) !== saved.requestHash ||
      digest(pair) !== saved.pairHash ||
      bound.maxCostCny !== saved.maxCostCny
    )
      throw Error("preview-request-binding-mismatch");
    samples.push({
      id: pair.id,
      original: pair.original.text,
      rewrite: pair.rewrite.text,
      requestHash: saved.requestHash,
      worstCostCny: bound.maxCostCny,
      requestJSON: JSON.stringify(request, null, 2),
    });
  }
  const context = reasoningEnvelope(base, pairs[0]).context;
  const pricing: { checkedAtUtc: string; url: string } =
    JSON.parse(pricingText);
  return {
    manifestHash: freezeHash,
    frozenAtUtc: frozen.frozenAtUtc,
    ruleVersion: REASONING_RULE.version,
    question: context.question,
    scopePrompt: context.scopePrompt,
    publicSources: context.publicSources,
    caseBoundary: context.caseBoundary,
    samples,
    model: "deepseek-flash" as const,
    thinking: "disabled" as const,
    budget: {
      maximumCalls: 2,
      perCallCny: 0.3,
      totalCny: 0.6,
      aggregateCalls: frozen.totalCallsLimit,
      aggregateCny: frozen.totalBudgetCny,
      usedCallsAtFreeze: frozen.currentCalls,
      estimatedCnyAtFreeze: frozen.previousEstimatedCostCny,
      pricingCheckedAtUtc: pricing.checkedAtUtc,
      priceUrl: pricing.url,
    },
    windowHours: 1,
    executionAvailable: false as const,
    newGrantCreated: false as const,
    realUserAnswersIncluded: false as const,
    confirmationStartsWindow: false as const,
    historicalRequestReplay: archiveOnly,
    currentRuntimeValidated: !archiveOnly,
  };
}
export type ReasoningPreview = Awaited<ReturnType<typeof loadReasoningPreview>>;
