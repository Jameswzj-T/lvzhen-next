import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { digest } from "../model-config";
import { answerUnits, comparisonRequest } from "./protocol";
import { loadRewriteCandidate } from "./candidate";
import type { SyntheticPair } from "./contract";

export const REVIEW_IDS = ["R04", "R10", "R05"] as const;
export type ReviewedExample = {
  id: (typeof REVIEW_IDS)[number];
  pair: SyntheticPair;
  model: {
    output: string;
    responseId: string;
    requestHash: string;
    criterionId: string;
    label: string;
    explanation: string;
    reviewFinding: string;
    status: "feedback_rejected" | "limited_acceptance";
  };
  review: {
    origin: "fixed_human_review";
    title: string;
    summary: string;
    expressed: Array<{
      side: "original" | "rewrite";
      quote: string;
      meaning: string;
    }>;
    gaps: Array<{
      criterionId: string;
      detail: string;
      why: string;
      review: "confirmed_gap" | "unverified";
    }>;
    noConfirmedGap: string;
    holds: Array<{
      kind: "case_facts" | "learner_stance" | "review_evidence";
      detail: string;
    }>;
  };
};
export type ReviewBinding = {
  pairDigest: string;
  reviewDigest: string;
  modelDigest: string;
};

export const reviewBinding = (entry: ReviewedExample): ReviewBinding => ({
  pairDigest: digest(entry.pair),
  reviewDigest: digest(entry.review),
  modelDigest: digest(entry.model),
});

// Only record identity and exact full-sentence membership are checked here.
// These checks do not infer meaning, prove absence, or repair a model verdict.
export function presentReviewedFeedback(
  entry: ReviewedExample,
  expected: ReviewBinding,
) {
  const fallback = {
    ready: false as const,
    title: "反馈依据待核对",
    summary: "固定记录或引文未通过核对，暂不展示结论或缺项判断。原答保持不变。",
    expressed: [] as ReviewedExample["review"]["expressed"],
    gaps: [] as ReviewedExample["review"]["gaps"],
    noConfirmedGap: "尚不能确认缺少哪一项理由。",
    holds: [
      {
        kind: "review_evidence" as const,
        detail: "请先核对记录版本和完整原文，不将校验失败解释成学生没有作答。",
      },
    ],
    source: "fixed_human_review" as const,
    semanticVerifiedByCode: false as const,
    learningStateChanged: false as const,
  };
  if (
    !REVIEW_IDS.includes(entry.id) ||
    entry.pair.id !== entry.id ||
    entry.pair.provenance !== "authored_fiction" ||
    entry.review.origin !== "fixed_human_review" ||
    digest(reviewBinding(entry)) !== digest(expected) ||
    !entry.review.expressed.length ||
    entry.review.expressed.some(
      (q) =>
        !answerUnits(entry.pair[q.side].text).some((u) => u.text === q.quote),
    ) ||
    entry.review.gaps.some(
      (g) =>
        !["2-1", "2-2", "2-3", "2-4"].includes(g.criterionId) ||
        !g.detail.trim() ||
        !g.why.trim(),
    )
  )
    return fallback;
  const unresolved = entry.review.gaps.filter(
    (g) => g.review !== "confirmed_gap",
  );
  return {
    ...fallback,
    ready: true as const,
    title: entry.review.title,
    summary: entry.review.summary,
    expressed: entry.review.expressed,
    gaps: entry.review.gaps.filter((g) => g.review === "confirmed_gap"),
    noConfirmedGap: entry.review.noConfirmedGap,
    holds: [
      ...entry.review.holds,
      ...unresolved.map(() => ({
        kind: "review_evidence" as const,
        detail: "这项缺口尚未获得人工确认，暂不采用“没有表达”的判断。",
      })),
    ],
  };
}

export async function loadReviewedExample(repo: string, id: string) {
  if (!REVIEW_IDS.includes(id as (typeof REVIEW_IDS)[number])) return null;
  const root = join(repo, "evals/rewrite-feedback-review-2026-09-30");
  const text = await readFile(join(root, "examples.json"), "utf8");
  const manifest = JSON.parse(
    await readFile(join(root, "manifest.json"), "utf8"),
  );
  if (digest(text) !== manifest.examplesDigest)
    throw Error("review-record-drift");
  const examples: ReviewedExample[] = JSON.parse(text).examples;
  if (examples.map((e) => e.id).join() !== REVIEW_IDS.join())
    throw Error("review-scope-drift");
  const entry = examples.find((e) => e.id === id)!;
  const candidate = await loadRewriteCandidate(repo);
  if (
    candidate.identity !== manifest.candidateIdentity ||
    digest(comparisonRequest(candidate, entry.pair)) !== entry.model.requestHash
  )
    throw Error("review-question-drift");
  return {
    entry,
    candidate,
    feedback: presentReviewedFeedback(entry, manifest.bindings[id]),
  };
}
