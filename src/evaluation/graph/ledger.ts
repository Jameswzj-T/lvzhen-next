import type { Pool } from "pg";
import type {
  CallOutcome,
  Invocation,
  InvocationLedger,
  ModelReceipt,
} from "./contracts";

// Only tests use this volatile implementation. The local web service uses SQL.
export class MemoryInvocationLedger implements InvocationLedger {
  rows = new Map<string, { hash: string; receipt?: ModelReceipt }>();
  async execute(
    i: Invocation,
    send: () => Promise<ModelReceipt>,
  ): Promise<CallOutcome> {
    const key = `${i.runId}:${i.groupId}:${i.phase}`;
    const previous = this.rows.get(key);
    if (previous) {
      if (previous.hash !== i.requestHash)
        throw new Error("invocation-identity-conflict");
      return previous.receipt
        ? { status: "completed", receipt: previous.receipt, reused: true }
        : { status: "unknown" };
    }
    if (
      i.phase === "review" &&
      [...this.rows.keys()].filter(
        (k) => k.startsWith(i.runId + ":") && k.endsWith(":review"),
      ).length >= (i.maxReviews ?? i.maxCalls)
    )
      return { status: "budget_blocked" };
    if (
      [...this.rows.keys()].filter((k) => k.startsWith(i.runId + ":")).length >=
      i.maxCalls
    )
      return { status: "budget_blocked" };
    const row: { hash: string; receipt?: ModelReceipt } = {
      hash: i.requestHash,
    };
    this.rows.set(key, row);
    try {
      row.receipt = await send();
      return { status: "completed", receipt: row.receipt, reused: false };
    } catch {
      return { status: "unknown" };
    }
  }
}
export class PostgresInvocationLedger implements InvocationLedger {
  constructor(private pool: Pool) {}
  async execute(
    i: Invocation,
    send: () => Promise<ModelReceipt>,
  ): Promise<CallOutcome> {
    const client = await this.pool.connect();
    let reserved = false;
    try {
      await client.query("BEGIN");
      // Serializes quota reservations across all groups of this immutable run.
      const run = await client.query(
        "SELECT id FROM grading_graph.runs WHERE id=$1 FOR UPDATE",
        [i.runId],
      );
      if (run.rowCount !== 1) throw new Error("unknown-run");
      const previous = await client.query(
        "SELECT request_hash, state, receipt FROM grading_graph.invocations WHERE run_id=$1 AND group_id=$2 AND phase=$3",
        [i.runId, i.groupId, i.phase],
      );
      if (previous.rowCount) {
        const row = previous.rows[0];
        if (row.request_hash !== i.requestHash)
          throw new Error("invocation-identity-conflict");
        await client.query("COMMIT");
        return row.state === "completed"
          ? { status: "completed", receipt: row.receipt, reused: true }
          : { status: "unknown" };
      }
      const count = await client.query(
        "SELECT count(*)::int AS count, count(*) FILTER(WHERE phase='review')::int AS reviews FROM grading_graph.invocations WHERE run_id=$1",
        [i.runId],
      );
      if (
        count.rows[0].count >= i.maxCalls ||
        (i.phase === "review" &&
          count.rows[0].reviews >= (i.maxReviews ?? i.maxCalls))
      ) {
        await client.query("COMMIT");
        return { status: "budget_blocked" };
      }
      await client.query(
        "INSERT INTO grading_graph.invocations(run_id,group_id,phase,request_hash,state) VALUES($1,$2,$3,$4,'reserved')",
        [i.runId, i.groupId, i.phase, i.requestHash],
      );
      await client.query("COMMIT");
      reserved = true;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
    if (!reserved) throw new Error("reservation-failed");
    await this.pool.query(
      "UPDATE grading_graph.invocations SET state='sent' WHERE run_id=$1 AND group_id=$2 AND phase=$3 AND state='reserved'",
      [i.runId, i.groupId, i.phase],
    );
    let receipt: ModelReceipt;
    try {
      receipt = await send();
    } catch {
      await this.pool.query(
        "UPDATE grading_graph.invocations SET state='unknown' WHERE run_id=$1 AND group_id=$2 AND phase=$3",
        [i.runId, i.groupId, i.phase],
      );
      return { status: "unknown" };
    }
    // If saving fails, 'sent' remains. Recovery must not send again.
    await this.pool.query(
      "UPDATE grading_graph.invocations SET state='completed',receipt=$4::jsonb WHERE run_id=$1 AND group_id=$2 AND phase=$3",
      [i.runId, i.groupId, i.phase, JSON.stringify(receipt)],
    );
    return { status: "completed", receipt, reused: false };
  }
}
