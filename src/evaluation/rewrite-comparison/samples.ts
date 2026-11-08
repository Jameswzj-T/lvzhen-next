import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { digest } from "../model-config";
import { answerUnits, pairBinding } from "./protocol";
import type { SyntheticPair, JudgmentKind, RewriteCandidate } from "./contract";
type AuthoredRow = {
  id: string;
  kind: JudgmentKind;
  evidence: string[];
  explanation: string;
};
export type RewriteSample = {
  id: string;
  title: string;
  pair: SyntheticPair;
  authoredReply: { original: AuthoredRow[]; rewrite: AuthoredRow[] };
  gold: {
    originalKinds: JudgmentKind[];
    rewriteKinds: JudgmentKind[];
    questionState: string;
    focusState: string;
  };
};
export const SAMPLE_ROOT = "evals/rewrite-comparison-2026-09-30";
export async function loadRewriteSamples(
  repo: string,
): Promise<RewriteSample[]> {
  const text = await readFile(join(repo, SAMPLE_ROOT, "samples.json"), "utf8");
  const frozen = JSON.parse(
    await readFile(join(repo, SAMPLE_ROOT, "manifest.json"), "utf8"),
  );
  if (digest(text) !== frozen.samplesHash) throw Error("rewrite-sample-drift");
  const samples: RewriteSample[] = JSON.parse(text).samples;
  if (
    samples.length !== 10 ||
    samples.map((s) => s.id).join() !==
      Array.from(
        { length: 10 },
        (_, i) => `R${String(i + 1).padStart(2, "0")}`,
      ).join()
  )
    throw Error("rewrite-sample-scope");
  for (const sample of samples)
    for (const side of ["original", "rewrite"] as const) {
      const text = sample.pair[side].text,
        rows = sample.authoredReply[side];
      if (
        sample.pair.provenance !== "authored_fiction" ||
        rows.map((r) => r.id).join() !== "2-1,2-2,2-3,2-4" ||
        rows.some(
          (row) =>
            !row.explanation || row.evidence.some((q) => !text.includes(q)),
        )
      )
        throw Error("rewrite-fixture-invalid");
    }
  return samples;
}
// This synthesizes protocol fixtures, not provider judgments. Gold is separate
// and is never passed to comparisonRequest or a transport.
export function authoredResponse(
  candidate: RewriteCandidate,
  sample: RewriteSample,
) {
  const side = (name: "original" | "rewrite") => ({
    table: sample.authoredReply[name]
      .map(
        (r) =>
          `| ${r.id} | ${r.evidence.join("<br>") || "未找到"} | ${r.explanation} | ${r.kind === "correct" ? "是" : ["uncertain", "contradictory"].includes(r.kind) ? "待核对" : "否"} |`,
      )
      .join("\n"),
    reviewedUnitIds: answerUnits(sample.pair[name].text).map((u) => u.id),
    kinds: sample.authoredReply[name].map(({ id, kind }) => ({ id, kind })),
  });
  return {
    binding: pairBinding(candidate, sample.pair),
    original: side("original"),
    rewrite: side("rewrite"),
  };
}
