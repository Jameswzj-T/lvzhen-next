import { z } from "zod";
import { digest } from "../model-config";
import {
  GRAPH_VERSION,
  type GroupResult,
  type RunInput,
  type ScoreResult,
  type TraceEvent,
} from "./contracts";
import { graphPacks } from "./case-packs";
import { demoAnswers, demoReader, demoScenario } from "./demo-fixtures";
import { openGraphStorage } from "./storage";
import { buildGradingGraph, createLimiter } from "./workflow";

export const demoRequestSchema = z
  .object({
    runId: z.uuid(),
    kind: z.enum(["short", "long"]),
    scenario: demoScenario,
    action: z.enum(["run", "resume", "inspect"]),
  })
  .strict();
export type DemoRequest = z.infer<typeof demoRequestSchema>;
export type GraphDemoResult = {
  runId: string;
  state: "completed" | "paused" | "running" | "recoverable";
  source: "fixture";
  trace: TraceEvent[];
  groups: GroupResult[];
  score: ScoreResult | null;
  calls: number | null;
  unknownCalls: number | null;
};
const shared = globalThis as typeof globalThis & {
  gradingGraphDb?: ReturnType<typeof openGraphStorage>;
  gradingGraphLimit?: ReturnType<typeof createLimiter>;
};
export async function runGraphDemo(raw: unknown): Promise<GraphDemoResult> {
  if (process.env.LVZHEN_ENV === "trial") throw new Error("local-only");
  const request = demoRequestSchema.parse(raw);
  const { pool, saver, ledger } = await (shared.gradingGraphDb ??=
    openGraphStorage().catch((error) => {
      shared.gradingGraphDb = undefined;
      throw error;
    }));
  const pack = structuredClone(graphPacks[request.kind]);
  // Failure injection needs a review branch in the short preset too.
  if (
    ["disagreement", "review_failure"].includes(request.scenario) &&
    request.kind === "short"
  )
    pack.groups[0].requiredReviewIds = ["theft_reason"];
  const stable: Omit<RunInput, "deadline"> = {
    runId: request.runId,
    version: GRAPH_VERSION,
    pack,
    answer: demoAnswers[request.kind],
    modelIdentity: `fixture-v1:${request.kind}:${request.scenario}`,
    maxCalls: pack.groups.length * 2,
  };
  const identity = digest(stable);
  const lock = await pool.connect();
  let locked = false;
  try {
    if (request.action !== "inspect") {
      const locking = await lock.query(
        "SELECT pg_try_advisory_lock(hashtextextended($1,0)) AS locked",
        [request.runId],
      );
      locked = locking.rows[0].locked;
    }
    if (request.action !== "inspect" && !locked)
      return {
        runId: request.runId,
        state: "running",
        source: "fixture",
        trace: [],
        groups: [],
        score: null,
        calls: null,
        unknownCalls: null,
      };
    let stored = await pool.query(
      "SELECT identity,input FROM grading_graph.runs WHERE id=$1",
      [request.runId],
    );
    if (!stored.rowCount) {
      if (request.action !== "run") throw new Error("run-not-found");
      const run: RunInput = { ...stable, deadline: Date.now() + 60000 };
      await pool.query(
        "INSERT INTO grading_graph.runs(id,identity,input) VALUES($1,$2,$3::jsonb)",
        [request.runId, identity, JSON.stringify(run)],
      );
      stored = await pool.query(
        "SELECT identity,input FROM grading_graph.runs WHERE id=$1",
        [request.runId],
      );
    }
    if (stored.rows[0].identity !== identity)
      throw new Error("immutable-run-conflict");
    const run = stored.rows[0].input as RunInput;
    const { graph } = buildGradingGraph({
      ledger,
      checkpointer: saver,
      reader: demoReader(request.kind, request.scenario),
      limit: (shared.gradingGraphLimit ??= createLimiter(2)),
      pauseBeforeScore: request.scenario === "pause",
      persist: async (_run, score, groups) => {
        const result = JSON.stringify({ score, groups });
        const saved = await pool.query(
          "UPDATE grading_graph.runs SET result=$2::jsonb WHERE id=$1 AND (result IS NULL OR result=$2::jsonb)",
          [run.runId, result],
        );
        if (saved.rowCount !== 1) throw new Error("immutable-result-conflict");
      },
    });
    const config = {
      configurable: { thread_id: run.runId },
      maxConcurrency: 2,
      recursionLimit: 40,
    };
    let snapshot = await graph.getState(config);
    let recoverable = false;
    if (request.action !== "inspect") {
      try {
        if (!snapshot.values.run) await graph.invoke({ run }, config);
        else if (snapshot.next.length && request.action === "resume")
          await graph.invoke(null, config);
      } catch {
        recoverable = true;
      }
      snapshot = await graph.getState(config);
    }
    const values = snapshot.values as {
      results?: Record<string, GroupResult>;
      score?: ScoreResult;
      trace?: Record<string, TraceEvent>;
    };
    const counts = await pool.query(
      "SELECT count(*)::int AS calls,count(*) FILTER(WHERE state<>'completed')::int AS unknown FROM grading_graph.invocations WHERE run_id=$1",
      [run.runId],
    );
    return {
      runId: run.runId,
      source: "fixture",
      state:
        recoverable || !snapshot.values.run
          ? "recoverable"
          : snapshot.next.length
            ? "paused"
            : "completed",
      trace: Object.values(values.trace ?? {}),
      groups: pack.groups.flatMap((g) =>
        values.results?.[g.id] ? [values.results[g.id]] : [],
      ),
      score: values.score ?? null,
      calls: counts.rows[0].calls,
      unknownCalls: counts.rows[0].unknown,
    };
  } finally {
    if (locked)
      await lock.query("SELECT pg_advisory_unlock(hashtextextended($1,0))", [
        request.runId,
      ]);
    lock.release();
  }
}
