import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { z } from "zod";
import { digest } from "../model-config";
import { loadRewriteCandidate } from "./candidate";
import { COMPONENT_DESIGN } from "./component-feedback";
import {
  unitBenefitRequest,
  inspectUnitBenefit,
  UNIT_BENEFIT_RULE,
  type UnitBenefitDraft,
} from "./unit-benefit-review";
import {
  assistedPacketSchema,
  assistedRequest,
  assessAssisted,
} from "./assisted-component";
import type { SyntheticPair } from "./contract";
export const REVIEWED_PREVIEW_IDS = ["UB01", "UB02", "assisted"] as const;
type PreviewId = (typeof REVIEWED_PREVIEW_IDS)[number];
const sha = (s: string) => createHash("sha256").update(s).digest("hex");
const hash = z.string().regex(/^[a-f0-9]{64}$/);
const sidePolicy = z
  .object({
    claims: z.array(z.string()),
    actors: z.array(z.string()),
    feedback: z.boolean(),
  })
  .strict();
const policySchema = z
  .object({
    reportHash: hash,
    receiptHash: hash,
    reviewHash: hash,
    requestHash: hash,
    pairHash: hash,
    sourceDataHash: hash,
    sourceFreezeHash: hash,
    sides: z
      .object({ original: sidePolicy, rewrite: sidePolicy })
      .strict()
      .optional(),
    topics: z.array(z.string()).optional(),
    reviewerNotes: z.array(z.string()),
    withheld: z.array(
      z
        .object({ key: z.string(), title: z.string(), reason: z.string() })
        .strict(),
    ),
  })
  .strict();
const decisionSchema = z
  .object({
    version: z.literal("reviewed-receipts-local-view-v1"),
    origin: z.literal("manual_local_readback_release"),
    instructionSentinel: z.literal("fff8ceda91d48191aa9e6f3cd4327334"),
    localReadOnly: z.literal(true),
    automaticSemanticDecision: z.literal(false),
    scoringOrMasteryUse: z.literal(false),
    entries: z
      .object({
        UB01: policySchema,
        UB02: policySchema,
        assisted: policySchema,
      })
      .strict(),
  })
  .strict();
export type SavedEvidence = {
  quote: string;
  meaning: string;
  sourceLabel?: string;
};
export type SavedItem = {
  key: string;
  title: string;
  status?: string;
  feedback?: string;
  evidence: SavedEvidence[];
};
export type SavedColumn = { key: string; label: string; items: SavedItem[] };
const benefitState = {
  company_expression: "已定位公司用款或受益表达",
  individual_expression: "已定位个人受益表达",
  contradictory: "同笔款项存在相反受益断言",
  not_established: "尚不能定位明确受益断言",
};
const caseState = {
  consistent: "与题设一致",
  inconsistent: "存在与题设不一致的表达",
  not_established: "题设或表达尚不能确定",
  needs_review: "需要进一步核对",
};
export function projectBenefitSide(
  side: UnitBenefitDraft["original"],
  policy: z.infer<typeof sidePolicy>,
  key: string,
): SavedItem[] {
  if (
    policy.claims.some((id) => !side.benefitClaims.some((c) => c.id === id)) ||
    policy.actors.some(
      (id) => !side.actorStatements.some((a) => a.unitId === id),
    )
  )
    throw Error("reviewed-item-missing");
  return [
    {
      key: `${key}:benefit`,
      title: "利益归属表达",
      status: `${benefitState[side.benefitReview.state]}；${caseState[side.benefitReview.caseRelation]}`,
      feedback: policy.feedback ? side.benefitReview.feedback : undefined,
      evidence: [],
    },
    ...side.benefitClaims
      .filter((c) => policy.claims.includes(c.id))
      .map((c) => ({
        key: `${key}:claim:${c.id}`,
        title: "采用的利益表达证据",
        evidence: c.evidence,
      })),
    ...side.actorStatements
      .filter((a) => policy.actors.includes(a.unitId))
      .map((a) => ({
        key: `${key}:actor:${a.unitId}`,
        title: "另列的行为或责任主张",
        evidence: [a],
      })),
  ];
}
export function verifySavedRecord(
  reportRaw: string,
  receiptRaw: string,
  reviewRaw: string,
  policy: z.infer<typeof policySchema>,
) {
  if (
    sha(reportRaw) !== policy.reportHash ||
    sha(receiptRaw) !== policy.receiptHash ||
    sha(reviewRaw) !== policy.reviewHash
  )
    throw Error("saved-record-or-review-drift");
  const report = JSON.parse(reportRaw),
    receipt = JSON.parse(receiptRaw);
  const { id: _id, ...canonical } = receipt;
  if (
    report.id !== receipt.id ||
    report.source !== "real_provider" ||
    report.failure ||
    receipt.failure ||
    receipt.status !== 200 ||
    !receipt.responseId ||
    !receipt.usage ||
    ![
      receipt.usage.inputTokens,
      receipt.usage.outputTokens,
      receipt.usage.totalTokens,
      receipt.cost?.amount,
    ].every((n) => typeof n === "number" && Number.isFinite(n) && n >= 0) ||
    report.requestHash !== policy.requestHash ||
    digest(report.receipt) !== digest(canonical)
  )
    throw Error("unverified-saved-receipt");
  return { report, receipt, review: JSON.parse(reviewRaw) };
}
export async function loadReviewedReceipt(repo: string, rawId: string) {
  if (!REVIEWED_PREVIEW_IDS.includes(rawId as PreviewId))
    throw Error("fixed-reviewed-receipts-only");
  const id = rawId as PreviewId,
    base = await loadRewriteCandidate(repo);
  const decisionRaw = await readFile(
    join(
      repo,
      "artifacts/reviewed-receipts-preview-2026-10-01/display-decision.json",
    ),
    "utf8",
  );
  const decision = decisionSchema.parse(JSON.parse(decisionRaw)),
    policy = decision.entries[id];
  const assisted = id === "assisted";
  const root = join(
    repo,
    assisted
      ? "artifacts/assisted-component-trial-2026-10-01"
      : "artifacts/unit-benefit-validation-2026-10-01",
  );
  const reportRaw = await readFile(
    join(root, assisted ? "result.json" : `${id}-result.json`),
    "utf8",
  );
  const report = JSON.parse(reportRaw);
  if (!/^[a-f0-9]{64}$/.test(report.id)) throw Error("invalid-receipt-key");
  const receiptRaw = await readFile(
    join(
      repo,
      "artifacts/short-table-trial/calls",
      `${report.id}.response.json`,
    ),
    "utf8",
  );
  const reviewRaw = await readFile(
    join(root, assisted ? "manual-review.json" : `${id}-review.json`),
    "utf8",
  );
  const saved = verifySavedRecord(reportRaw, receiptRaw, reviewRaw, policy);
  const sourceDataRaw = await readFile(
    assisted
      ? join(root, "new-answers.json")
      : join(repo, "evals/unit-benefit-boundary-2026-10-01/pairs.json"),
    "utf8",
  );
  const freezeRaw = await readFile(
    assisted
      ? join(root, "frozen-request.json")
      : join(
          repo,
          "artifacts/unit-benefit-boundary-2026-10-01/candidate-freeze.json",
        ),
    "utf8",
  );
  if (
    sha(sourceDataRaw) !== policy.sourceDataHash ||
    sha(freezeRaw) !== policy.sourceFreezeHash
  )
    throw Error("answer-or-request-version-drift");
  let sources: { label: string; text: string }[],
    columns: SavedColumn[],
    reviewVersion: string;
  if (assisted) {
    const packet = assistedPacketSchema.parse(JSON.parse(sourceDataRaw)),
      request = assistedRequest(base, packet),
      frozen = JSON.parse(freezeRaw);
    if (
      digest(packet) !== policy.pairHash ||
      digest(request) !== policy.requestHash ||
      frozen.requestHash !== policy.requestHash ||
      saved.review.reportSha256 !== policy.reportHash ||
      saved.review.receiptSha256 !== policy.receiptHash
    )
      throw Error("assisted-view-binding-mismatch");
    const check = assessAssisted(saved.receipt.text, base, packet);
    if (!check.structuralValid || !check.response || !policy.topics)
      throw Error("assisted-output-unavailable");
    sources = [
      { label: "AI示范基线（非标准答案）", text: packet.aiDemonstration.text },
      { label: "你的本次修改原文（AI辅助）", text: packet.userRevision.text },
    ];
    columns = [
      {
        key: "assisted",
        label: "本次已审读的模型观察",
        items: check.response.topics
          .filter((t) => policy.topics!.includes(t.id))
          .map((t) => ({
            key: `topic:${t.id}`,
            title:
              t.id === "2-1"
                ? "单位犯罪判断的来源冲突"
                : "单位决策与个人行为的区分",
            status: "模型识别到两种来源间的冲突；不是整问判定",
            feedback: t.feedback,
            evidence: t.evidence.map((e) => ({
              ...e,
              sourceLabel:
                e.source === "ai_demonstration" ? "AI示范" : "你的修改原文",
            })),
          })),
      },
    ];
    if (
      policy.topics.some((k) => !check.response!.topics.some((t) => t.id === k))
    )
      throw Error("reviewed-topic-missing");
    reviewVersion = check.response.binding.version;
  } else {
    const pair: SyntheticPair = JSON.parse(sourceDataRaw).pairs.find(
        (p: SyntheticPair) => p.id === id,
      ),
      request = unitBenefitRequest(base, pair),
      frozen = JSON.parse(freezeRaw);
    const job = frozen.requests.find((j: { id: string }) => j.id === id);
    if (
      !job ||
      digest(pair) !== policy.pairHash ||
      digest(request) !== policy.requestHash ||
      job.requestHash !== policy.requestHash ||
      saved.review.resultHash !== policy.reportHash ||
      saved.review.receiptHash !== policy.receiptHash
    )
      throw Error("synthetic-view-binding-mismatch");
    const check = inspectUnitBenefit(saved.receipt.text, base, pair);
    if (!check.structuralValid || !check.draft || !policy.sides)
      throw Error("synthetic-output-unavailable");
    sources = [
      { label: "虚构答文A（开发者编写）", text: pair.original.text },
      { label: "虚构答文B（开发者编写）", text: pair.rewrite.text },
    ];
    columns = (["original", "rewrite"] as const).map((k) => ({
      key: k,
      label: k === "original" ? "虚构答文A的反馈" : "虚构答文B的反馈",
      items: projectBenefitSide(check.draft![k], policy.sides![k], k),
    }));
    reviewVersion = UNIT_BENEFIT_RULE.version;
  }
  return {
    id,
    provenance: assisted
      ? "AI示范后用户修改，继承范围未逐句指定"
      : "两份开发者编写的虚构对照，不是实际学习重答",
    sources,
    columns,
    reviewerNotes: policy.reviewerNotes,
    withheld: policy.withheld,
    rawModelOutput: saved.receipt.text,
    responseId: saved.receipt.responseId as string,
    receivedAt:
      new Intl.DateTimeFormat("zh-CN", {
        timeZone: "Asia/Singapore",
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(saved.receipt.endedAt)) + "（新加坡时间）",
    reviewVersion,
    displayVersion: decision.version,
    requestHash: policy.requestHash,
    receiptHash: policy.receiptHash,
    reviewHash: policy.reviewHash,
    facts: base.card.facts,
    prompt: COMPONENT_DESIGN.prompt,
    publicSources: base.publicSources,
    automaticSemanticDecision: false,
    scoringOrMasteryUse: false,
  };
}
export type ReviewedReceiptPreview = Awaited<
  ReturnType<typeof loadReviewedReceipt>
>;
