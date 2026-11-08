import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { digest } from "../model-config";
import { loadRewriteCandidate } from "./candidate";
import { COMPONENT_DESIGN } from "./component-feedback";
import {
  assessSupervised,
  supervisedRequest,
  personalPairSchema,
  SUPERVISED_ID,
} from "./supervised-component";
import { WITHDRAWAL_KEYS, type WithdrawalKey } from "./component-presentation";
const sha = (s: string) => createHash("sha256").update(s).digest("hex");
export const supervisedRoot = (repo: string) =>
  join(repo, "artifacts/supervised-component-trial-2026-10-01");
export async function loadSupervisedState(repo: string) {
  const root = supervisedRoot(repo),
    json = async (p: string) => JSON.parse(await readFile(p, "utf8"));
  const base = await loadRewriteCandidate(repo),
    approval = await json(join(root, "authorization.json"));
  if (
    approval.id !== SUPERVISED_ID ||
    approval.scope !== "one_new_personal_answer_pair" ||
    approval.userApprovalText !== "我直接批准同意了。" ||
    approval.provider !== "deepseek" ||
    approval.model !== "deepseek-flash" ||
    approval.approvedQuestionId !== COMPONENT_DESIGN.questionId ||
    approval.approvedDesignVersion !== COMPONENT_DESIGN.version ||
    approval.maxCalls !== 1 ||
    approval.perCallReservedCny !== 0.3
  )
    throw Error("scope-mismatch");
  const common = {
    design: COMPONENT_DESIGN,
    facts: base.card.facts,
    criteria: base.card.criteria.map((c) =>
      c.id === "2-3"
        ? {
            ...c,
            title: "利益归属与组织性质",
            requirement: COMPONENT_DESIGN.requirement,
          }
        : c,
    ),
    publicSources: base.publicSources,
    provider: "DeepSeek · deepseek-flash",
    reservedCny: 0.3,
  };
  let packet: any;
  try {
    packet = await json(join(root, "new-answers.json"));
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT")
      return { ...common, state: "awaiting_new_answers" as const, entry: null };
    throw e;
  }
  const pair = personalPairSchema.parse(packet),
    request = supervisedRequest(base, pair),
    pairHash = digest(pair),
    requestHash = digest(request);
  const frozen = await json(join(root, "frozen-request.json"));
  if (
    frozen.pairHash !== pairHash ||
    frozen.requestHash !== requestHash ||
    frozen.authorizationHash !== digest(approval)
  )
    throw Error("request-binding-mismatch");
  let report: any;
  try {
    report = await json(join(root, "result.json"));
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT")
      return { ...common, state: "prepared" as const, entry: null, pair };
    throw e;
  }
  if (
    report.requestHash !== requestHash ||
    report.source !== "real_provider" ||
    !/^[a-f0-9]{64}$/.test(report.id)
  )
    throw Error("report-binding-mismatch");
  const receiptRaw = await readFile(
      join(
        repo,
        "artifacts/short-table-trial/calls",
        report.id + ".response.json",
      ),
      "utf8",
    ),
    receipt = JSON.parse(receiptRaw);
  if (digest(report.receipt) !== digest((({ id: _id, ...r }) => r)(receipt)))
    throw Error("receipt-binding-mismatch");
  let review: any, reviewRaw: string;
  try {
    reviewRaw = await readFile(join(root, "manual-review.json"), "utf8");
    review = JSON.parse(reviewRaw);
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT")
      return {
        ...common,
        state: report.failure
          ? ("withheld" as const)
          : ("pending_human_review" as const),
        entry: null,
        pair,
      };
    throw e;
  }
  const reportRaw = await readFile(join(root, "result.json"), "utf8");
  if (
    review.receiptHash !== sha(receiptRaw) ||
    review.reportHash !== sha(reportRaw) ||
    review.pairHash !== pairHash ||
    review.allowDisplay !== true ||
    !Array.isArray(review.withdrawnKeys) ||
    !review.withdrawnKeys.every((k: unknown) =>
      WITHDRAWAL_KEYS.includes(k as WithdrawalKey),
    )
  )
    throw Error("human-review-unbound");
  if (
    report.failure ||
    receipt.failure ||
    !receipt.responseId ||
    !receipt.usage ||
    receipt.cost?.amount == null
  )
    return { ...common, state: "withheld" as const, entry: null, pair };
  const assessed = assessSupervised(receipt.text, base, pair);
  if (!assessed.structuralValid || !assessed.response)
    return { ...common, state: "withheld" as const, entry: null, pair };
  return {
    ...common,
    state: "reviewed" as const,
    entry: {
      sampleId: SUPERVISED_ID,
      inputLabel: "personal_new" as const,
      pair: {
        original: { text: pair.original },
        rewrite: { text: pair.rewrite },
      },
      design: COMPONENT_DESIGN,
      response: assessed.response,
      structureIssue: null,
      reviewHash: sha(reviewRaw),
      resultKey: digest({ requestHash, receiptHash: sha(receiptRaw) }),
      initialWithdrawn: review.withdrawnKeys as WithdrawalKey[],
      reviewNote: String(review.summary),
      rawModelOutput: receipt.text,
      responseId: receipt.responseId,
      receivedAt:
        new Intl.DateTimeFormat("zh-CN", {
          timeZone: "Asia/Singapore",
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date(receipt.endedAt)) + "（新加坡时间）",
      publicSources: base.publicSources,
      facts: base.card.facts,
    },
  };
}
