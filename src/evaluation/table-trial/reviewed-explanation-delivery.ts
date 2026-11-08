import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { TableReply, TableResult } from "./contract";
import {
  timelineExplanationReviewBinding,
  timelineReviewedExplanationCandidate,
  type ReviewedExplanationCandidate,
} from "./reviewed-explanation-candidate";

type ReviewScope = Pick<
  ReviewedExplanationCandidate,
  | "resultId"
  | "questionId"
  | "criterionId"
  | "originalAnswer"
  | "originalExplanation"
  | "originalTotal"
>;
export type ExplanationReviewDelivery =
  | { state: "verified"; review: ReviewedExplanationCandidate }
  | { state: "unavailable"; review: ReviewScope };
export type ReviewedTableReply = TableReply & {
  explanationReview?: ExplanationReviewDelivery;
};

// Only this already-reviewed fictional receipt is read. No broad history scan,
// provider call, permission change or update to the saved assessment occurs.
export async function reviewedExplanationFor(
  repo: string,
  result: TableResult,
): Promise<ExplanationReviewDelivery | undefined> {
  const bound = timelineExplanationReviewBinding;
  const candidate = timelineReviewedExplanationCandidate(result, bound);
  if (!candidate) return undefined;
  try {
    const raw = await readFile(
      join(
        repo,
        "artifacts/table-local-trial/grants/table-trial-20260930",
        `${bound.resultId}.response.json`,
      ),
    );
    const receiptSha256 = createHash("sha256").update(raw).digest("hex");
    if (receiptSha256 !== bound.receiptSha256) throw Error("receipt-binding");
    const receipt = JSON.parse(raw.toString("utf8"));
    const manifest = JSON.parse(
      await readFile(
        join(repo, "src/content/scoring-cards/timeline/manifest.json"),
        "utf8",
      ),
    );
    const verified = timelineReviewedExplanationCandidate(result, {
      responseId: receipt.responseId,
      receiptSha256,
      cardHash: manifest.cardHash,
    });
    if (verified) return { state: "verified", review: verified };
  } catch {
    // A missing or changed receipt cannot authorize the correction. The known
    // wrong explanation is still kept separate from usable teaching feedback.
  }
  const {
    resultId,
    questionId,
    criterionId,
    originalAnswer,
    originalExplanation,
    originalTotal,
  } = candidate;
  return {
    state: "unavailable",
    review: {
      resultId,
      questionId,
      criterionId,
      originalAnswer,
      originalExplanation,
      originalTotal,
    },
  };
}

export async function withExplanationReview(
  repo: string,
  reply: TableReply,
): Promise<ReviewedTableReply> {
  if (!reply.result) return reply;
  const explanationReview = await reviewedExplanationFor(repo, reply.result);
  return explanationReview ? { ...reply, explanationReview } : reply;
}
