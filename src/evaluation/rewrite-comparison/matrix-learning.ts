import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join } from "node:path";
import release from "../../content/rewrite-comparison/matrix-learning-release-v1.json";
import {
  prepareMatrixCandidate,
  matrixEnvelope,
  assessMatrixCandidate,
  MATRIX_IDS,
  MATRIX_VERSION,
} from "./composite-matrix";
import { COMPONENT_DESIGN } from "./component-feedback";
import { digest } from "../model-config";
import { parseUniqueJson } from "../unique-json";
const sha = (s: string) => createHash("sha256").update(s).digest("hex");
function requireBound(value: unknown): asserts value {
  if (!value) throw Error("matrix-learning-evidence-unbound");
}
// Reads only the two already reviewed fictional artifacts. No sender, credentials,
// answer lookup or writes. Public examples are never learner feedback records.
export async function loadMatrixLearningExamples(
  repo: string,
  read: (p: string) => Promise<string> = (p) => readFile(p, "utf8"),
) {
  requireBound(
    release.version === "matrix-learning-release-v1" &&
      release.origin === "manually_reviewed_fictional_examples" &&
      release.localOnly &&
      release.scoringOrMasteryUse === false &&
      Object.keys(release.entries).join() === MATRIX_IDS.join(),
  );
  const samples = [];
  for (const id of MATRIX_IDS) {
    const policy = release.entries[id],
      prepared = await prepareMatrixCandidate(repo, id),
      envelope = matrixEnvelope(prepared.base, id);
    const [resultRaw, receiptRaw, reviewRaw, goldRaw] = await Promise.all([
      read(
        join(
          repo,
          "artifacts/composite-matrix-two-20261003",
          id + "-result.json",
        ),
      ),
      read(
        join(
          repo,
          "artifacts/short-table-trial/calls",
          policy.receiptKey + ".response.json",
        ),
      ),
      read(
        join(
          repo,
          "artifacts/composite-matrix-two-20261003",
          id + "-review.json",
        ),
      ),
      read(
        join(repo, "evals/composite-scope-2026-10-03/independent-gold.json"),
      ),
    ]);
    requireBound(
      sha(resultRaw) === policy.resultHash &&
        sha(receiptRaw) === policy.receiptHash &&
        sha(reviewRaw) === policy.reviewHash &&
        sha(goldRaw) === policy.criteriaHash &&
        prepared.requestIdentity === policy.requestHash,
    );
    const result = parseUniqueJson(resultRaw) as any,
      receipt = parseUniqueJson(receiptRaw) as any,
      review = parseUniqueJson(reviewRaw) as any;
    requireBound(
      result.source === "real_provider" &&
        !result.failure &&
        result.automaticDisplay === false &&
        result.receiptKey === policy.receiptKey &&
        result.receiptHash === policy.receiptHash &&
        result.requestHash === policy.requestHash,
    );
    requireBound(
      receipt.status === 200 &&
        !receipt.failure &&
        receipt.actualModel === "deepseek-flash" &&
        receipt.responseId &&
        receipt.text &&
        review.resultHash === policy.resultHash &&
        review.receiptHash === policy.receiptHash &&
        review.criteriaHash === policy.criteriaHash &&
        review.readFullRawReceipt === true &&
        review.semanticReadComplete === true &&
        review.professionalAcceptance === false &&
        review.unsupportedCompositeVerdict === false &&
        review.misleadingLocalAssertion === false,
    );
    const verified = assessMatrixCandidate(
      id,
      receipt.text,
      prepared.requestIdentity,
      prepared.base,
    );
    requireBound(
      verified.assessment.structuralValid &&
        digest(verified) === digest(result.assessment),
    );
    const feedback = verified.assessment.feedback!;
    requireBound(
      feedback.length === 2 &&
        verified.assessment.parentCompleteness === "not_inferred" &&
        verified.assessment.wholeQuestionCorrection === "not_inferred",
    );
    samples.push({
      id,
      title:
        id === "CF01"
          ? "钱归公司已说明，组织性质理由仍缺"
          : "有依据的条件分析，未知事实保留",
      original: { answer: envelope.original.answer, ...feedback[0] },
      rewrite: { answer: envelope.rewrite.answer, ...feedback[1] },
    });
  }
  return {
    version: "matrix-learning-release-v1" as const,
    provenance: "manually_reviewed_fictional_examples" as const,
    scope: "benefit_and_organization_expression_only" as const,
    questionId: "cap-contract-v2-q2" as const,
    exerciseRevision: samples.length
      ? (await prepareMatrixCandidate(repo, "CF01")).base.card.exerciseRevision
      : "",
    feedbackVersion: MATRIX_VERSION,
    bindingKey: digest({ release, design: COMPONENT_DESIGN }),
    factBoundary: COMPONENT_DESIGN.caseBoundary,
    samples,
  };
}
export type MatrixLearningExamples = Awaited<
  ReturnType<typeof loadMatrixLearningExamples>
>;
