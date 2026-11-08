import type { FaultProgress } from "../domain/fault-progress";
import { checkpointSchema, sameRecord, type SavedCheckpoint } from "./protocol";

export type SyncStatus =
  | "loading"
  | "saved"
  | "pending"
  | "saving"
  | "unavailable"
  | "conflict"
  | "too-large"
  | "account-changed";
export class SyncConflict extends Error {}
export class AccountChanged extends Error {}
export class RecordTooLarge extends Error {}
export interface RecordTransport {
  load(): Promise<SavedCheckpoint>;
  save(generation: number, state: FaultProgress): Promise<SavedCheckpoint>;
}

export function httpRecords(learnerId: string): RecordTransport {
  return {
    load: () => request(learnerId, "GET"),
    save: (expectedGeneration, state) =>
      request(learnerId, "PUT", { expectedGeneration, state }),
  };
}
export function importRecordsToAccount(
  learnerId: string,
  expectedGeneration: number,
  state: FaultProgress,
) {
  return request(
    learnerId,
    "POST",
    { expectedGeneration, confirmedOwnership: true, state },
    "/api/learning/fault/import",
  );
}
async function request(
  learnerId: string,
  method: string,
  body?: unknown,
  endpoint = "/api/learning/fault",
) {
  const response = await fetch(endpoint, {
    method,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "X-Lvzhen-Records": "1",
      "X-Lvzhen-Learner": learnerId,
    },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(6000),
  });
  if (response.status === 401 || response.status === 403)
    throw new AccountChanged();
  if (response.status === 409) throw new SyncConflict();
  if (response.status === 413) throw new RecordTooLarge();
  if (!response.ok) throw new Error("storage_unavailable");
  return checkpointSchema.parse(await response.json());
}

/** One in-flight write. Keep an uncertain write to retry exactly, then save newer edits. */
export class ProgressSync {
  private generation: number | null = null;
  private pending: FaultProgress | null = null;
  private uncertain: FaultProgress | null = null;
  private busy = false;
  private stopped = false;
  private conflict = false;
  private blocked = false;
  constructor(
    private transport: RecordTransport,
    private status: (s: SyncStatus) => void,
    private acknowledge: (
      generation: number,
      state: FaultProgress | null,
    ) => void = () => {},
  ) {}

  async open(
    local: FaultProgress | null,
    knownGeneration: number | null = null,
  ): Promise<FaultProgress | null> {
    // Cached generation is meaningful only with its matching local checkpoint.
    // A failed load must not let a fresh default overwrite an unknown remote draft.
    this.generation = local ? knownGeneration : null;
    this.status("loading");
    try {
      const saved = await this.transport.load();
      if (this.stopped) return local;
      this.generation = saved.generation;
      if (local && saved.state && !sameRecord(local, saved.state)) {
        if (knownGeneration === saved.generation) {
          this.enqueue(local);
          return local;
        }
        this.conflict = true;
        this.status("conflict");
        return local;
      }
      this.blocked = false;
      this.acknowledge(saved.generation, saved.state);
      if (local && !saved.state) this.enqueue(local);
      else this.status("saved");
      return saved.state ?? local;
    } catch (error) {
      if (!this.stopped) {
        this.blocked = true;
        this.status(
          error instanceof AccountChanged ? "account-changed" : "unavailable",
        );
      }
      return local;
    }
  }

  enqueue(state: FaultProgress) {
    this.pending = structuredClone(state);
    if (!this.conflict && !this.blocked) this.status("pending");
  }

  async flush(retry = false) {
    if (this.stopped || this.busy || this.conflict || (this.blocked && !retry))
      return;
    this.busy = true;
    try {
      if (this.generation === null) {
        const local = this.pending;
        const saved = await this.transport.load();
        // Never overwrite a record discovered after editing offline.
        if (saved.state && !sameRecord(local, saved.state))
          throw new SyncConflict();
        this.generation = saved.generation;
      }
      this.blocked = false;
      while (!this.stopped && (this.uncertain || this.pending)) {
        const current = this.uncertain ?? this.pending!;
        this.uncertain = current;
        this.status("saving");
        const saved = await this.transport.save(this.generation, current);
        if (!sameRecord(saved.state, current))
          throw new Error("unexpected_saved_record");
        this.generation = saved.generation;
        this.acknowledge(saved.generation, saved.state);
        this.uncertain = null;
        if (sameRecord(this.pending, current)) this.pending = null;
      }
      if (!this.stopped) this.status("saved");
    } catch (error) {
      this.conflict = error instanceof SyncConflict;
      this.blocked = true;
      if (!this.stopped)
        this.status(
          error instanceof AccountChanged
            ? "account-changed"
            : error instanceof RecordTooLarge
              ? "too-large"
              : this.conflict
                ? "conflict"
                : "unavailable",
        );
    } finally {
      this.busy = false;
    }
  }

  stop() {
    this.stopped = true;
  }
}
