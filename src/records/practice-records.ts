import {
  faultStorageKey,
  freshProgress,
  progressSchema,
  type FaultProgress,
} from "../domain/fault-progress";
import { openPractice } from "../domain/practice";
import { ProgressSync, type RecordTransport, type SyncStatus } from "./sync";
import type { LessonStorage } from "./lesson-records";
import { preserveQuestionHistorySource } from "./question-history-source";

/** Same full checkpoint as the existing unit, including its immutable originals. */
export class PracticeRecords {
  state = freshProgress();
  ready = false;
  storageIssue = false;
  restorationFailed = false;
  status: SyncStatus = "loading";
  readonly key: string;
  private raw: string | null = null;
  private writable = true;
  private closed = false;
  private sync?: ProgressSync;
  private generation: number | null = null;
  private generationKey: string;
  private acknowledged: FaultProgress | null = null;
  private confirmations = new Set<() => void>();

  constructor(
    learnerId: string | null,
    private storage: LessonStorage,
    transport: RecordTransport | null,
    private notify: () => void,
    private resumeQuestion = true,
  ) {
    this.key = learnerId
      ? `${faultStorageKey}:account:${learnerId}`
      : faultStorageKey;
    this.generationKey = `${this.key}:server-generation`;
    if (transport)
      this.sync = new ProgressSync(
        transport,
        (status) => {
          this.status = status;
          this.emit();
        },
        (generation, state) => {
          this.generation = generation;
          this.acknowledged = state ? structuredClone(state) : null;
          if (this.ready && this.writable && !this.closed)
            this.saveGeneration();
          this.checkConfirmations();
        },
      );
  }
  private emit() {
    this.checkConfirmations();
    if (!this.closed) this.notify();
  }
  private checkConfirmations() {
    for (const check of [...this.confirmations]) check();
  }
  get canWrite() {
    return (
      this.ready && this.writable && !this.closed && !this.restorationFailed
    );
  }
  /** Exact durable checkpoint acknowledgement; flush returning is not proof of a save. */
  confirmSaved(
    matches: (state: FaultProgress) => boolean,
    timeoutMs = 7000,
  ): Promise<FaultProgress | null> {
    const inspect = (): FaultProgress | null => {
      if (!this.canWrite) return null;
      try {
        const raw = this.storage.getItem(this.key);
        if (raw === null || raw !== this.raw) {
          this.changedElsewhere();
          return null;
        }
        const local = progressSchema.parse(JSON.parse(raw));
        if (!matches(local)) return null;
        if (!this.sync) return local;
        return this.acknowledged && matches(this.acknowledged)
          ? structuredClone(this.acknowledged)
          : null;
      } catch {
        return null;
      }
    };
    const confirmed = inspect();
    if (confirmed || !this.canWrite || !this.sync)
      return Promise.resolve(confirmed);
    if (
      ["conflict", "account-changed", "unavailable", "too-large"].includes(
        this.status,
      )
    )
      return Promise.resolve(null);
    return new Promise((resolve) => {
      let completed = false;
      const finish = (state: FaultProgress | null) => {
        if (completed) return;
        completed = true;
        clearTimeout(timer);
        this.confirmations.delete(check);
        resolve(state);
      };
      const check = () => {
        const next = inspect();
        if (next) finish(next);
        else if (
          !this.canWrite ||
          ["conflict", "account-changed", "unavailable", "too-large"].includes(
            this.status,
          )
        )
          finish(null);
      };
      const timer = setTimeout(() => finish(null), timeoutMs);
      this.confirmations.add(check);
      check();
      // An in-flight flush may return immediately. Its actual acknowledgement
      // will wake check; a local queued checkpoint can never acknowledge itself.
      if (!completed) void this.flush().then(check, () => finish(null));
    });
  }
  private saveGeneration() {
    if (this.generation !== null)
      this.storage.setItem(this.generationKey, String(this.generation));
  }
  async open() {
    let stateAvailable = false;
    try {
      this.raw = this.storage.getItem(this.key);
      const local =
        this.raw === null ? null : progressSchema.parse(JSON.parse(this.raw));
      if (local) {
        this.state = local;
        stateAvailable = true;
        await preserveQuestionHistorySource(
          this.storage,
          this.key,
          this.raw!,
          local,
        );
        if (this.closed) return;
      }
      const known = this.storage.getItem(this.generationKey);
      const recovered = this.sync
        ? await this.sync.open(
            local,
            known !== null &&
              /^\d+$/.test(known) &&
              Number.isSafeInteger(Number(known))
              ? Number(known)
              : null,
          )
        : local;
      if (this.closed) return;
      if (!this.writable) {
        // A storage event may stop an in-flight restore even when the raw value stays null.
        this.restorationFailed = !stateAvailable;
        return;
      }
      if (
        !recovered &&
        this.sync &&
        ["unavailable", "account-changed"].includes(this.status)
      ) {
        // A failed account read is not evidence that the learner has no record.
        this.restorationFailed = true;
        this.changedElsewhere();
        return;
      }
      if (this.storage.getItem(this.key) !== this.raw) {
        this.restorationFailed = !stateAvailable;
        this.changedElsewhere();
        return;
      }
      if (recovered) {
        this.state = recovered;
        stateAvailable = true;
        const raw = JSON.stringify(recovered);
        await preserveQuestionHistorySource(
          this.storage,
          this.key,
          raw,
          recovered,
        );
        if (this.closed) return;
        if (!this.writable || this.storage.getItem(this.key) !== this.raw) {
          this.changedElsewhere();
          return;
        }
        this.storage.setItem(this.key, raw);
        this.raw = raw;
      }
      this.saveGeneration();
      if (!this.sync) this.status = "saved";
    } catch {
      if (!this.closed) {
        this.restorationFailed = !stateAvailable;
        this.changedElsewhere();
      }
    } finally {
      if (!this.closed) {
        this.ready = true;
        if (this.resumeQuestion && !this.restorationFailed)
          this.update((p) => openPractice(p, new Date().toISOString()));
        await this.flush();
        this.emit();
      }
    }
  }
  update(fn: (p: FaultProgress) => FaultProgress) {
    if (!this.ready || this.closed) return;
    this.state = progressSchema.parse({
      ...fn(this.state),
      updatedAt: new Date().toISOString(),
    });
    if (this.writable) {
      try {
        if (this.storage.getItem(this.key) !== this.raw) {
          this.changedElsewhere();
          return;
        }
        const raw = JSON.stringify(this.state);
        this.storage.setItem(this.key, raw);
        this.raw = raw;
        this.sync?.enqueue(this.state);
      } catch {
        this.changedElsewhere();
      }
    }
    this.emit();
  }
  /** Navigation must not leave the view at a position that could not be saved. */
  navigate(fn: (p: FaultProgress) => FaultProgress) {
    if (!this.canWrite) return false;
    const prior = this.state;
    this.update(fn);
    if (this.canWrite) return true;
    this.state = prior;
    this.emit();
    return false;
  }
  changedElsewhere() {
    this.writable = false;
    this.storageIssue = true;
    this.sync?.stop();
    this.emit();
  }
  async flush(retry = false) {
    if (this.writable && !this.closed) await this.sync?.flush(retry);
  }
  close() {
    this.closed = true;
    this.sync?.stop();
    this.checkConfirmations();
  }
}
