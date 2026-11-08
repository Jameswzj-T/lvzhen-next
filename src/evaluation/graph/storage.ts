import { Pool } from "pg";
import { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";
import { localDatabaseUrl } from "../../runtime/config";
import { PostgresInvocationLedger } from "./ledger";

export async function openGraphStorage() {
  // This first engineering entry is deliberately local-only. No remote DB/env credentials.
  const pool = new Pool({
    connectionString: localDatabaseUrl,
    max: 10,
    connectionTimeoutMillis: 2000,
    idleTimeoutMillis: 10000,
  });
  const saver = new PostgresSaver(pool, undefined, { schema: "grading_graph" });
  const client = await pool.connect();
  try {
    await client.query("SELECT pg_advisory_lock(914072101)");
    await saver.setup();
    await client.query(`CREATE TABLE IF NOT EXISTS grading_graph.answer_submissions (
      id text PRIMARY KEY, identity text NOT NULL, input jsonb NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now());
      CREATE TABLE IF NOT EXISTS grading_graph.runs (
      id text PRIMARY KEY, identity text NOT NULL, input jsonb NOT NULL,
      result jsonb, created_at timestamptz NOT NULL DEFAULT now());
      CREATE TABLE IF NOT EXISTS grading_graph.invocations (
      run_id text NOT NULL REFERENCES grading_graph.runs(id), group_id text NOT NULL,
      phase text NOT NULL CHECK(phase IN ('position','read','review')), request_hash text NOT NULL,
      state text NOT NULL CHECK(state IN ('reserved','sent','completed','unknown')),
      receipt jsonb, PRIMARY KEY(run_id,group_id,phase));`);
    // Additive phase migration; old receipts and run identities remain unchanged.
    const phaseCheck = await client.query(
      "SELECT pg_get_constraintdef(oid) AS definition FROM pg_constraint WHERE conrelid='grading_graph.invocations'::regclass AND conname='invocations_phase_check'",
    );
    if (!phaseCheck.rows[0]?.definition?.includes("'position'"))
      await client.query(`ALTER TABLE grading_graph.invocations DROP CONSTRAINT IF EXISTS invocations_phase_check;
      ALTER TABLE grading_graph.invocations ADD CONSTRAINT invocations_phase_check CHECK(phase IN ('position','read','review'));`);
  } catch (error) {
    throw error;
  } finally {
    await client.query("SELECT pg_advisory_unlock(914072101)");
    client.release();
  }
  return { pool, saver, ledger: new PostgresInvocationLedger(pool) };
}
