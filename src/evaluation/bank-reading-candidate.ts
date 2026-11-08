import { createHash } from "node:crypto";
import type { EvaluationInput } from "./index";
import { prepareBankReading, type BankReadingTask } from "./bank-reading-cards";

// Opt-in experiment only. Preserve v1, the provider protocol, four generic
// instructions, basis claims, and all scoring weights/dependencies.
// Denying an over-broad proposition is not equivalent to stating the required
// conclusion. Express these two conclusions directly and read their stance.
const replacements: Record<string, { id: string; statement: string }> = {
  "cl03-age-thirteen": {
    id: "a1",
    statement:
      "甲是否应负刑事责任还须核对本案法定限定条件，不能仅凭十三周岁与死亡结果确定。",
  },
  "cl05-review-separated": {
    id: "d4",
    statement: "甲后段刺伤乙不能沿用首段的特殊防卫根据免责。",
  },
};

export function prepareBankReadingCandidate(
  input: EvaluationInput,
): BankReadingTask {
  const baseline = prepareBankReading(input);
  const replacement = replacements[input.caseId];
  const points = structuredClone(baseline.points);
  if (replacement) {
    const claim = points
      .flatMap((p) => p.claims)
      .find((c) => c.id === replacement.id);
    if (!claim || claim.kind !== "conclusion")
      throw new Error("candidate-claim-mismatch");
    claim.statement = replacement.statement;
    claim.expected = "affirmed";
  }
  const snapshot = {
    version: "bank-expressed-conclusions-v2",
    input: {
      ...baseline.input,
      criteria: points
        .flatMap((p) => p.claims)
        .map((c) => ({
          id: c.id,
          description: c.statement,
          ruleBasis: c.kind,
        })),
    },
    points,
    instructions: baseline.instructions,
  };
  return {
    readingId: createHash("sha256")
      .update(JSON.stringify(snapshot))
      .digest("hex"),
    ...snapshot,
  };
}
