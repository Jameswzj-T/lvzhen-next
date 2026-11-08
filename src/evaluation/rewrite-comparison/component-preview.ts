import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { digest } from "../model-config";
import { loadRewriteCandidate } from "./candidate";
import { COMPONENT_DESIGN } from "./component-feedback";
import {
  assessComponentTrial,
  componentTrialRequest,
  COMPONENT_TRIAL_IDS,
} from "./component-trial";
import { WITHDRAWAL_KEYS, type WithdrawalKey } from "./component-presentation";
import type { SyntheticPair } from "./contract";
const sha = (s: string) => createHash("sha256").update(s).digest("hex");
export async function loadComponentPreview(repo: string, id: string) {
  if (!COMPONENT_TRIAL_IDS.includes(id as (typeof COMPONENT_TRIAL_IDS)[number]))
    throw Error("fixed-synthetic-preview-only");
  const out = join(repo, "artifacts/component-feedback-trial-2026-09-30");
  const read = (p: string) => readFile(p, "utf8");
  const plan = JSON.parse(await read(join(out, "frozen-plan.json")));
  const samplesRaw = await read(
    join(repo, "evals/component-feedback-trial-2026-09-30/samples.json"),
  );
  if (sha(samplesRaw) !== plan.files.samples) throw Error("sample-drift");
  const pair: SyntheticPair = JSON.parse(samplesRaw).pairs.find(
    (p: SyntheticPair) => p.id === id,
  );
  const base = await loadRewriteCandidate(repo),
    request = componentTrialRequest(base, pair),
    job = plan.jobs.find((j: { sampleId: string }) => j.sampleId === id);
  if (
    base.identity !== plan.candidateIdentity ||
    digest(pair) !== job.pairHash ||
    digest(request) !== job.requestHash
  )
    throw Error("version-drift");
  const reportRaw = await read(join(out, id + ".json")),
    report = JSON.parse(reportRaw);
  if (
    report.sampleId !== id ||
    report.source !== "real_provider" ||
    report.requestHash !== job.requestHash ||
    (report.failure && report.failure !== "structure-or-evidence-invalid") ||
    !/^[a-f0-9]{64}$/.test(report.id)
  )
    throw Error("receipt-unavailable");
  const receiptRaw = await read(
      join(
        repo,
        "artifacts/short-table-trial/calls",
        report.id + ".response.json",
      ),
    ),
    receipt = JSON.parse(receiptRaw);
  if (
    digest(report.receipt) !== digest((({ id: _id, ...r }) => r)(receipt)) ||
    receipt.failure ||
    !receipt.usage ||
    !receipt.responseId ||
    receipt.cost?.amount == null
  )
    throw Error("receipt-invalid");
  const check = assessComponentTrial(receipt.text, base, pair);
  const reviewRaw = await read(join(out, id + "-manual-review.json"));
  const review = JSON.parse(reviewRaw);
  if (
    review.sampleId !== id ||
    review.receiptHash !== sha(receiptRaw) ||
    review.reportHash !== sha(reportRaw) ||
    !Array.isArray(review.withdrawnKeys) ||
    !review.withdrawnKeys.every((k: unknown) =>
      WITHDRAWAL_KEYS.includes(k as WithdrawalKey),
    )
  )
    throw Error("review-unbound");
  return {
    sampleId: id,
    pair,
    design: COMPONENT_DESIGN,
    response: check.response,
    structureIssue: check.structuralValid ? null : check.reason,
    reviewHash: sha(reviewRaw),
    resultKey: digest({
      binding: componentTrialRequest(base, pair).messages[1].content,
      receiptHash: sha(receiptRaw),
      requestHash: job.requestHash,
    }),
    initialWithdrawn: review.withdrawnKeys as WithdrawalKey[],
    reviewNote: String(review.summary),
    rawModelOutput: receipt.text,
    responseId: receipt.responseId,
    receivedAt: receipt.endedAt,
    publicSources: base.publicSources,
    facts: base.card.facts,
  };
}
export type ComponentPreview = Awaited<ReturnType<typeof loadComponentPreview>>;
