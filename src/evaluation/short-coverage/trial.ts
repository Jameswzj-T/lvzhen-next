// CLI-only synthetic validation. No HTTP route and no arbitrary answer input.
// Scope supplements the existing grant; quota, grant and historical rows stay intact.
import { mkdir, readFile, readdir, writeFile, unlink } from "node:fs/promises";
import { join } from "node:path";
import { digest } from "../model-config";
import { readProjectCredential } from "../project-credentials";
import type { Transport } from "../provider";
import { priceWindowCovers } from "../price-window";
import { shortGrantSchema, shortTrialRoot } from "../short-table/service";
import {
  SHORT_TIMEOUT_MS,
  shortProviderPlan,
  readShortModel,
} from "../short-table/provider";
import { tableTrialRoot } from "../table-trial/service";
import {
  coverageCards,
  coverageSources,
  loadCoverageCandidate,
  validateCoverageSamples,
} from "./catalog";
import { COVERAGE_VERSION, type CoverageSample } from "./contract";
import {
  coverageRequest,
  assessCoverage,
  assertCoverageWire,
} from "./protocol";
export const coverageRoot = (repo: string) =>
  join(repo, "artifacts/person-coverage-delivery-2026-09-30");
export const COVERAGE_REAL_SAMPLE_IDS = [
  "PC01-C",
  "PC01-M",
  "PC02-C",
  "PC02-M",
  "PC05-C",
  "PC05-M",
  "PC08-C",
  "PC08-M",
] as const;
export const SAMPLE_FILE = "evals/person-coverage-2026-09-30/samples.json";
export async function readJson(path: string) {
  return JSON.parse(await readFile(path, "utf8"));
}
export const freezeJson = (path: string, value: unknown) =>
  writeFile(path, JSON.stringify(value, null, 2) + "\n", {
    flag: "wx",
    mode: 0o600,
  });
async function exists(path: string) {
  try {
    await readFile(path);
    return true;
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return false;
    throw e;
  }
}
export async function coverageLedger(repo: string) {
  const root = shortTrialRoot(repo),
    files = await readdir(join(root, "calls"));
  let costCny = 0,
    inputTokens = 0,
    outputTokens = 0,
    cacheHitTokens = 0;
  const intents = files.filter((f) => f.endsWith(".intent.json"));
  for (const file of intents) {
    const id = file.slice(0, -12),
      intent = await readJson(join(root, "calls", file));
    if (!(await exists(join(root, "calls", `${id}.response.json`))))
      throw Error("ledger-usage-unknown");
    const r = await readJson(join(root, "calls", `${id}.response.json`));
    if (
      r.id !== id ||
      intent.id !== id ||
      r.failure ||
      !Number.isFinite(r.cost?.amount) ||
      r.cost.amount < 0 ||
      !Number.isFinite(r.usage?.inputTokens) ||
      !Number.isFinite(r.usage?.outputTokens)
    )
      throw Error("ledger-receipt-unverified");
    costCny += r.cost.amount;
    inputTokens += r.usage.inputTokens;
    outputTokens += r.usage.outputTokens;
    cacheHitTokens +=
      r.usage.cacheReadInputTokens ?? r.usage.cacheHitTokens ?? 0;
  }
  return {
    calls: intents.length,
    costCny,
    inputTokens,
    outputTokens,
    cacheHitTokens,
    totalTokens: inputTokens + outputTokens,
  };
}
async function stop(repo: string, reason: string, id: string) {
  for (const root of [shortTrialRoot(repo), tableTrialRoot(repo)]) {
    await mkdir(root, { recursive: true });
    try {
      await freezeJson(join(root, "stopped.json"), {
        kind: COVERAGE_VERSION,
        id,
        reason,
      });
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== "EEXIST") throw e;
    }
  }
}
export async function runCoverageSample(
  sampleId: string,
  deps: {
    repo: string;
    transport?: Transport;
    credential?: () => Promise<string>;
    now?: () => number;
  },
) {
  if (process.env.LVZHEN_ENV === "trial") throw Error("local-only");
  const { repo } = deps,
    out = coverageRoot(repo),
    root = shortTrialRoot(repo),
    shared = tableTrialRoot(repo),
    now = deps.now ?? Date.now;
  const candidate = await loadCoverageCandidate(repo),
    plan = await readJson(join(out, "plan.json"));
  const samples: CoverageSample[] = await readJson(join(repo, SAMPLE_FILE));
  validateCoverageSamples(samples);
  if (
    plan.version !== COVERAGE_VERSION ||
    plan.scope !== "synthetic_only" ||
    candidate.identity !== plan.identity ||
    digest(samples) !== plan.samplesHash ||
    !plan.sampleIds.includes(sampleId) ||
    !COVERAGE_REAL_SAMPLE_IDS.includes(
      sampleId as (typeof COVERAGE_REAL_SAMPLE_IDS)[number],
    ) ||
    plan.sampleIds.length !== COVERAGE_REAL_SAMPLE_IDS.length ||
    new Set(plan.sampleIds).size !== COVERAGE_REAL_SAMPLE_IDS.length ||
    !plan.sampleIds.every((id: string) =>
      COVERAGE_REAL_SAMPLE_IDS.includes(
        id as (typeof COVERAGE_REAL_SAMPLE_IDS)[number],
      ),
    )
  )
    throw Error("frozen-coverage-plan-drift");
  const sample = samples.find((s) => s.id === sampleId),
    card = coverageCards.find((c) => c.id === sample?.exerciseId);
  if (!sample || !card || card.criteria.some((c) => c.manualHold))
    throw Error("sample-not-authorized-or-held");
  const scope = plan.scopeEntries.find(
    (e: { sampleId: string }) => e.sampleId === sampleId,
  );
  if (
    !scope ||
    scope.exerciseId !== card.id ||
    scope.exerciseRevision !== card.exerciseRevision ||
    scope.answerHash !== digest(sample.answer)
  )
    throw Error("scope-entry-drift");
  const id = digest({
    version: COVERAGE_VERSION,
    identity: candidate.identity,
    sample,
  });
  const resultPath = join(out, `${sampleId}.json`),
    intentPath = join(root, "calls", `${id}.intent.json`),
    responsePath = join(root, "calls", `${id}.response.json`);
  // Resume reads frozen receipt only. Never resend after an intent exists.
  if (await exists(resultPath)) {
    const previous = await readJson(resultPath);
    if (previous.id !== id || previous.sampleId !== sampleId)
      throw Error("saved-coverage-mismatch");
    return previous;
  }
  const request = coverageRequest(card, coverageSources, sample.answer);
  assertCoverageWire(request);
  const eligible = async () => {
    const grant = shortGrantSchema.parse(
      await readJson(join(root, "grant.json")),
    );
    if (
      digest(grant) !== plan.grantHash ||
      grant.id !== plan.grantId ||
      plan.validUntil !== grant.validUntil ||
      plan.maxCalls !== grant.maxCalls ||
      plan.budgetCny !== grant.budgetCny ||
      plan.reservationCny !== grant.reservationCny ||
      !grant.enabled ||
      now() < Date.parse(grant.validFrom) ||
      now() + SHORT_TIMEOUT_MS >= Date.parse(grant.validUntil) ||
      (await exists(join(root, "stopped.json"))) ||
      (await exists(join(shared, "stopped.json")))
    )
      throw Error("grant-stopped-expired-or-changed");
    let ledger;
    try {
      ledger = await coverageLedger(repo);
    } catch (e) {
      await stop(repo, "ledger-usage-unknown", id);
      throw e;
    }
    if (
      ledger.calls >= grant.maxCalls ||
      ledger.costCny + grant.reservationCny > grant.budgetCny ||
      (ledger.calls + 1) * grant.reservationCny > grant.budgetCny
    )
      throw Error("budget-exhausted");
    return grant;
  };
  await mkdir(shared, { recursive: true });
  const lock = join(shared, "active.lock");
  await freezeJson(lock, { kind: COVERAGE_VERSION, id });
  try {
    if (await exists(intentPath)) throw Error("already-attempted-no-retry");
    let grant = await eligible();
    let provider = shortProviderPlan(now(), grant.checkedAt, request);
    if (provider.reservation > grant.reservationCny)
      throw Error("reservation-exceeds-limit");
    const credential = await (
      deps.credential ?? (() => readProjectCredential(provider.config, repo))
    )();
    grant = await eligible();
    if (
      (await loadCoverageCandidate(repo)).identity !== candidate.identity ||
      digest(await readJson(join(out, "plan.json"))) !== digest(plan) ||
      digest(await readJson(join(repo, SAMPLE_FILE))) !== plan.samplesHash
    )
      throw Error("pre-send-candidate-drift");
    provider = shortProviderPlan(now(), grant.checkedAt, request);
    if (provider.reservation > grant.reservationCny)
      throw Error("reservation-exceeds-limit");
    await freezeJson(intentPath, {
      id,
      kind: COVERAGE_VERSION,
      sampleId,
      grantId: grant.id,
      grantHash: plan.grantHash,
      identity: candidate.identity,
      provider: "deepseek",
      model: provider.config.model,
      request,
      wireHash: digest(request),
      price: provider.price,
      inputCeiling: provider.inputCeiling,
      reservationCny: grant.reservationCny,
      worstCaseCny: provider.reservation,
    });
    try {
      const fresh = shortGrantSchema.parse(
        await readJson(join(root, "grant.json")),
      );
      if (
        digest(fresh) !== plan.grantHash ||
        (await loadCoverageCandidate(repo)).identity !== candidate.identity ||
        digest(await readJson(join(out, "plan.json"))) !== digest(plan) ||
        digest(await readJson(join(repo, SAMPLE_FILE))) !== plan.samplesHash ||
        digest(request) !== (await readJson(intentPath)).wireHash ||
        !fresh.enabled ||
        (await exists(join(root, "stopped.json"))) ||
        (await exists(join(shared, "stopped.json")))
      )
        throw Error("pre-send-authorization-or-price-changed");
      // No asynchronous work between this fresh window check and send.
      const sendAt = now();
      assertCoverageWire(request);
      if (
        sendAt < Date.parse(fresh.validFrom) ||
        sendAt + SHORT_TIMEOUT_MS >= Date.parse(fresh.validUntil) ||
        !priceWindowCovers(
          provider.price.billingWindow!,
          provider.config.model,
          sendAt,
          sendAt + SHORT_TIMEOUT_MS,
        )
      )
        throw Error("pre-send-authorization-or-price-changed");
      const result = await readShortModel(
        request,
        provider,
        credential,
        deps.transport,
      );
      await freezeJson(responsePath, { id, ...result.receipt });
      const assessment = assessCoverage(result.text, card, sample.answer);
      const failure =
        result.failure ??
        (!assessment.structuralValid ? "invalid_table" : null);
      const report = {
        id,
        sampleId,
        exerciseId: card.id,
        exerciseRevision: card.exerciseRevision,
        identity: candidate.identity,
        answer: sample.answer,
        purpose: "synthetic_validation",
        source:
          deps.transport?.source === "offline_fake"
            ? "offline_test"
            : "real_provider",
        assessment,
        failure,
        receipt: result.receipt,
        deviations: sample.expected.flatMap((g) =>
          assessment.items.find((i) => i.id === g.criterionId)?.label ===
          g.label
            ? []
            : [
                {
                  criterionId: g.criterionId,
                  expected: g.label,
                  actual: assessment.items.find((i) => i.id === g.criterionId)
                    ?.label,
                },
              ],
        ),
      };
      await freezeJson(resultPath, report);
      if (failure) await stop(repo, failure, id);
      return report;
    } catch (e) {
      await stop(repo, "incomplete-submission-no-retry", id);
      throw e;
    }
  } finally {
    await unlink(lock);
  }
}
