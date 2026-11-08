import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { digest } from "../model-config";
import { parseUniqueJson } from "../unique-json";
import { loadReasoningArchivePreview } from "./reasoning-preview";
import type { ReasoningReply } from "./reasoning-rewrite";
type SavedResult = {
  source: string;
  failure: string | null;
  receiptKey: string;
  receiptHash: string;
  requestHash: string;
  automaticDisplay: boolean;
  assessment: {
    structuralValid: boolean;
    wholeQuestionVerdict: string;
    scopedComparison: string;
    response: ReasoningReply;
  };
};
type SavedReceipt = {
  text: string;
  status: number;
  failure: string | null;
  actualModel: string;
  responseId: string;
  endedAt: string;
  usage: { inputTokens: number; outputTokens: number; totalTokens: number };
  cost: { amount: number };
};
type SavedReview = {
  resultHash: string;
  criteriaHash: string;
  readFullRawReceipt: boolean;
  independentProfessionalAcceptance: boolean;
  reviewedAtUtc: string;
};

// Manual release of two already-read fictional receipts. No general learner
// evaluation, free model explanations, credential reads, writes or transport.
const root = "artifacts/reasoning-lrf-two-2026-10-03";
const criteriaHash =
  "9456f0f7478b863a944a94c7673c55dfbed505089a8b1305ff484a9e6d172cfb";
const policies = [
  {
    id: "LRF01-proposed-new",
    resultHash:
      "3acbace5fb8216d8728c776844ec61e509cd4b0787589f7214445c6030c46af6",
    receiptKey:
      "40111f326ebae0f182465e6ca552c7f91cde6b79ffa533dde20b3849d908661a",
    receiptHash:
      "ed63c449321473ab9a15af824e3dd22c0607fc2fad869d142eb34117af61461c",
    reviewHash:
      "e72dc76219ec243aafd810b6fbc8abb5b43076a6d26880af15b1cd7f6c3397df",
    comparison: "error_persists_in_scope",
    rewriteState: "explicit_error",
    title: "用途改了，但理由仍错",
    expressed:
      "这份重答已写清款项供企业使用、没有被负责人私分。这个已表达的部分保留。",
    feedback:
      "重答仍把内部人员亲自实施、企业是有限责任公司，当作只能追究个人并排除单位犯罪的理由。这两项排除推理仍需要改。",
    practice:
      "针对这两项理由重写分析，说明负责人共同商议、知情同意等事实如何支持单位决策判断，保留已经写清的用款表达。",
  },
  {
    id: "LRF02-proposed-new",
    resultHash:
      "d2ab5cc9db8ecc740870abe67d6e818164ac61d9ca2577056048a246f7fb99c6",
    receiptKey:
      "f7d2596f726f5c34080f820f085a42818d12a3932abafb7fc4a46e3c24203454",
    receiptHash:
      "785fc60841210abd44ca40e2037dee5a9683cd9fc84a70a75daf5891070f59cb",
    reviewHash:
      "7a92741a018bd3e357690be556f330a91787bfb16c6a4399b72ce244feac3d63",
    comparison: "reasoning_changed_in_scope",
    rewriteState: "supported_reasoning",
    title: "两项理由已纠正，未知条件保留",
    expressed:
      "重答明确反对以自然人实施或有限责任形式直接排除单位犯罪，并用负责人商议、财务负责人知情同意支持单位决策分析。",
    feedback:
      "这两项目标理由的改正有原文支持。停产后是否已以犯罪为主要活动，题设尚不充分；保留有理由的条件判断是合理的，不算学生漏答。",
    practice:
      "继续保留对未知条件的说明。本次仅确认公司形式与单位意志的两项理由，完整小问的其他要求仍按原题契约核对。",
  },
] as const;
const sha = (text: string) => createHash("sha256").update(text).digest("hex");
function requireTrue(value: unknown): asserts value {
  if (!value) throw Error("reasoning-readback-binding-unverified");
}
export async function loadReasoningReadback(
  repo: string,
  read: (path: string) => Promise<string> = (p) => readFile(p, "utf8"),
) {
  const preview = await loadReasoningArchivePreview(repo, read);
  const samples = [];
  let inputTokens = 0,
    outputTokens = 0,
    costCny = 0;
  const completedAt = [];
  for (const [index, policy] of policies.entries()) {
    const sample = preview.samples[index];
    requireTrue(sample.id === policy.id);
    const prefix = index === 0 ? "LRF01" : "LRF02";
    const resultRaw = await read(join(repo, root, `${policy.id}-result.json`));
    const receiptRaw = await read(
      join(
        repo,
        "artifacts/short-table-trial/calls",
        `${policy.receiptKey}.response.json`,
      ),
    );
    const reviewRaw = await read(join(repo, root, `${prefix}-review.json`));
    requireTrue(
      sha(resultRaw) === policy.resultHash &&
        sha(receiptRaw) === policy.receiptHash &&
        sha(reviewRaw) === policy.reviewHash,
    );
    const result = parseUniqueJson(resultRaw) as SavedResult,
      receipt = parseUniqueJson(receiptRaw) as SavedReceipt,
      review = parseUniqueJson(reviewRaw) as SavedReview;
    const request = JSON.parse(sample.requestJSON),
      data = JSON.parse(request.messages[1].content);
    const response = parseUniqueJson(receipt.text) as ReasoningReply;
    requireTrue(
      result.source === "real_provider" &&
        !result.failure &&
        result.receiptKey === policy.receiptKey &&
        result.receiptHash === policy.receiptHash &&
        result.requestHash === sample.requestHash &&
        result.automaticDisplay === false &&
        result.assessment.structuralValid &&
        result.assessment.wholeQuestionVerdict === "not_inferred" &&
        result.assessment.scopedComparison === policy.comparison,
    );
    requireTrue(
      review.resultHash === policy.resultHash &&
        review.criteriaHash === criteriaHash &&
        review.readFullRawReceipt === true &&
        review.independentProfessionalAcceptance === false,
    );
    requireTrue(
      receipt.status === 200 &&
        !receipt.failure &&
        receipt.actualModel === preview.model &&
        receipt.responseId &&
        digest(response) === digest(result.assessment.response) &&
        digest(response.binding) === digest(data.binding),
    );
    requireTrue(
      response.caseBoundary.status === "unknown_in_case" &&
        response.caseBoundary.countsAsLearnerOmission === false,
    );
    for (const side of ["original", "rewrite"] as const) {
      requireTrue(response[side].reasons.length === 2);
      for (const [i, row] of response[side].reasons.entries()) {
        requireTrue(
          row.id === ["company-form", "unit-will"][i] &&
            row.state ===
              (side === "original" ? "explicit_error" : policy.rewriteState),
        );
        for (const e of row.evidence)
          requireTrue(
            data[side].units.some(
              (u: { id: string; text: string }) =>
                u.id === e.unitId && u.text === e.quote,
            ),
          );
      }
    }
    const quote = (side: "original" | "rewrite", id: string) => {
      const unit = data[side].units.find(
        (u: { id: string; text: string }) => u.id === id,
      );
      requireTrue(unit && data[side].answer === sample[side]);
      return unit.text as string;
    };
    samples.push({
      id: policy.id,
      title: policy.title,
      expressed: policy.expressed,
      feedback: policy.feedback,
      practice: policy.practice,
      benefitQuote: quote("rewrite", "u1"),
      originalReasonQuote: quote("original", "u2"),
      rewriteReasonQuote: quote("rewrite", "u2"),
      responseId: receipt.responseId as string,
      reviewAtUtc: review.reviewedAtUtc as string,
    });
    requireTrue(
      Number.isInteger(receipt.usage.inputTokens) &&
        Number.isInteger(receipt.usage.outputTokens) &&
        receipt.usage.inputTokens + receipt.usage.outputTokens ===
          receipt.usage.totalTokens &&
        Number.isFinite(receipt.cost.amount),
    );
    inputTokens += receipt.usage.inputTokens;
    outputTokens += receipt.usage.outputTokens;
    costCny += receipt.cost.amount;
    completedAt.push(receipt.endedAt as string);
  }
  return {
    preview,
    samples,
    inputTokens,
    outputTokens,
    estimatedCny: Number(costCny.toFixed(8)),
    completedAtUtc: completedAt.sort().at(-1)!,
    model: preview.model,
    provenance: "manual_review_of_two_fictional_receipts" as const,
    defaultFreeModelFeedbackIncluded: false as const,
    scoringOrMasteryUse: false as const,
    newRequestsAllowed: false as const,
  };
}
export type ReasoningReadback = Awaited<
  ReturnType<typeof loadReasoningReadback>
>;

// Strip execution/price/debug data before passing approved examples into daily
// learning. This projection never accepts, evaluates or alters a learner answer.
export function reasoningLearningExamples(entry: ReasoningReadback) {
  return {
    questionId: entry.preview.question.id,
    exerciseRevision: entry.preview.question.exerciseRevision,
    scope: "company_form_and_unit_will_reasoning_only" as const,
    provenance: "manually_reviewed_fictional_examples" as const,
    samples: entry.samples.map((sample, index) => ({
      id: sample.id,
      title: sample.title,
      expressed: sample.expressed,
      feedback: sample.feedback,
      rewriteReasonQuote: sample.rewriteReasonQuote,
      original: entry.preview.samples[index].original,
      rewrite: entry.preview.samples[index].rewrite,
    })),
  };
}
export type ReasoningLearningExamples = ReturnType<
  typeof reasoningLearningExamples
>;
