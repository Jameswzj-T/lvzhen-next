import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { digest } from "../model-config";
import { configSchema } from "../provider";
import {
  validatePack,
  type CasePack,
  type GroupResult,
  type ScoreResult,
} from "./contracts";
import {
  LOCAL_TRIAL_VERSION,
  type TrialCase,
  type TrialQuestion,
} from "./local-trial-contract";

export const CANDIDATE_MANIFEST =
  "artifacts/conflict-transfer-2026-09-28/manifest.json";
export const CANDIDATE_HASH =
  "a5f98d24aef39f7ee11a42fa1f43bd43f58fcf83d4199147d81812bd3f2273b9";
export async function loadLocalCandidate(repo: string) {
  const frozen = JSON.parse(
    await readFile(join(repo, CANDIDATE_MANIFEST), "utf8"),
  );
  if (digest(frozen) !== CANDIDATE_HASH) throw Error("candidate-drift");
  // Keep the validated grading implementation frozen as well as the prompt.
  await Promise.all(
    Object.entries(frozen.sources as Record<string, string>)
      .filter(
        ([path]) =>
          path.startsWith("src/evaluation/") && !path.endsWith(".test.ts"),
      )
      .map(async ([path, expected]) => {
        if (digest(await readFile(join(repo, path), "utf8")) !== expected)
          throw Error("candidate-runtime-drift");
      }),
  );
  const p = frozen.plans.find(
    (p: { arm: string }) => p.arm === "explicit_conflict",
  );
  const wire = JSON.parse(
    await readFile(
      join(
        repo,
        "artifacts/conflict-transfer-2026-09-28",
        `wire-${frozen.wires[p.runId]}.json`,
      ),
      "utf8",
    ),
  );
  if (digest(JSON.stringify(wire)) !== frozen.wires[p.runId])
    throw Error("prompt-drift");
  const instructions: string = wire.messages[0].content;
  const config = configSchema.parse(frozen.config);
  const cases = (["DEBT", "NETWORK"] as const).map((id) => {
    const rows: { questionId: string; pack: CasePack }[] =
      frozen.samples.filter((s: { id: string }) =>
        s.id.startsWith(`${id}_FULL_`),
      );
    if (rows.length !== 5) throw Error("incomplete-case");
    rows.forEach((r) => validatePack(r.pack));
    const item: TrialCase = {
      id,
      title: id === "DEBT" ? "索债之后的责任边界" : "一笔转账，几种不同的责任",
      facts: rows[0].pack.input.facts,
      questions: rows.map((r) => ({
        id: r.questionId,
        text: r.pack.input.question.replace(/^第\d问：/, ""),
      })),
    };
    return {
      item,
      packs: Object.fromEntries(rows.map((r) => [r.questionId, r.pack])),
    };
  });
  return {
    version: LOCAL_TRIAL_VERSION,
    hash: CANDIDATE_HASH,
    config,
    instructions,
    cases,
  };
}
export function presentQuestion(
  id: string,
  pack: CasePack,
  answer: string,
  groups?: Record<string, GroupResult>,
  score?: ScoreResult,
  durationMs: number | null = null,
): TrialQuestion {
  const first = Object.values(groups ?? {}).flatMap((g) => g.first ?? []);
  const empty = !answer.trim();
  const max = pack.card.items.reduce((n, p) => n + p.points, 0);
  return {
    id,
    question: pack.input.question,
    answer,
    status: empty
      ? "empty"
      : !score
        ? "not_run"
        : Object.values(groups ?? {}).some((g) => g.status !== "completed")
          ? "failed"
          : "ready",
    total: empty ? 0 : (score?.total ?? null),
    max,
    durationMs,
    points: pack.card.items.map((p) => {
      const scored = score?.items.find((s) => s.id === p.criterionId);
      const read = first.find((f) => f.id === p.criterionId);
      return {
        id: p.criterionId,
        title: p.title,
        earned: empty ? 0 : (scored?.earned ?? null),
        max: p.points,
        diagnosticPending: !empty && (!scored || scored.diagnosticPending),
        feedback: empty
          ? "本问未作答。"
          : (scored?.feedback ?? "本问尚未评阅。"),
        guidance: p.guidance,
        ruleBasis: pack.input.criteria.find((c) => c.id === p.criterionId)!
          .ruleBasis,
        ...(read ? { interpretation: read.reason } : {}),
        evidenceIds: read?.evidenceIds ?? [],
      };
    }),
  };
}
