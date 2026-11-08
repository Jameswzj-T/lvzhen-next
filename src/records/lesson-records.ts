import { faultStorageKey, progressSchema } from "../domain/fault-progress";
import { isGuidedLesson } from "../content/guided-lessons";
import {
  initialLesson,
  lessonSessionSchema,
  resumeLesson,
  type LessonPreview,
} from "../domain/lesson-session";
import { ProgressSync, type RecordTransport, type SyncStatus } from "./sync";
import { preserveQuestionHistorySource } from "./question-history-source";

export interface LessonStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}
export const lessonAccountKey = (learnerId: string) =>
  `${faultStorageKey}:account:${learnerId}`;

/** Shares the existing unit checkpoint and owner-bound transport; no second account store. */
export class LessonRecords {
  session = initialLesson();
  ready = false;
  storageIssue = false;
  status: SyncStatus = "loading";
  readonly key: string;
  private raw: string | null = null;
  private writable = true;
  private closed = false;
  private sync: ProgressSync;
  private generation: number | null = null;
  private readonly generationKey: string;
  private readonly cursorKey: string;

  constructor(
    learnerId: string,
    private storage: LessonStorage,
    transport: RecordTransport,
    private notify: () => void,
  ) {
    this.key = lessonAccountKey(learnerId);
    this.generationKey = `${this.key}:server-generation`;
    this.cursorKey = `${this.key}:lesson-cursor`;
    this.sync = new ProgressSync(
      transport,
      (status) => {
        this.status = status;
        this.emit();
      },
      (generation) => {
        this.generation = generation;
        // open() acknowledges before restored state is locally durable. Delay its
        // marker until that state is saved, so an interrupted open fails safely.
        if (this.ready && this.writable && !this.closed) this.saveGeneration();
      },
    );
  }
  private emit() {
    if (!this.closed) this.notify();
  }
  private saveGeneration() {
    if (this.generation !== null)
      this.storage.setItem(this.generationKey, String(this.generation));
  }
  async open() {
    try {
      this.raw = this.storage.getItem(this.key);
      const local =
        this.raw === null ? null : progressSchema.parse(JSON.parse(this.raw));
      if (local) {
        this.session = resumeLesson(local);
        await preserveQuestionHistorySource(
          this.storage,
          this.key,
          this.raw!,
          local,
        );
        if (this.closed) return;
      }
      const known = this.storage.getItem(this.generationKey);
      const recovered = await this.sync.open(
        local,
        known !== null &&
          /^\d+$/.test(known) &&
          Number.isSafeInteger(Number(known))
          ? Number(known)
          : null,
      );
      if (this.closed) return;
      if (this.storage.getItem(this.key) !== this.raw) {
        this.changedElsewhere();
        return;
      }
      if (recovered) {
        this.session = resumeLesson(recovered);
        // Keep the full checkpoint's actual cursor until the learner interacts.
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
        try {
          const cursor = JSON.parse(
            this.storage.getItem(this.cursorKey) ?? "null",
          );
          if (
            cursor?.updatedAt === recovered.updatedAt &&
            isGuidedLesson(recovered.topicId)
          ) {
            const restored = lessonSessionSchema.safeParse({
              ...this.session,
              screen: cursor.screen,
              positions: cursor.positions,
            });
            if (restored.success) this.session = restored.data;
          }
        } catch {
          /* Cursor hints cannot invalidate learning records. */
        }
      }
      this.saveGeneration();
      this.ready = true;
      await this.sync.flush();
    } catch {
      if (this.closed) return;
      this.writable = false;
      this.storageIssue = true;
      this.sync.stop();
    } finally {
      if (!this.closed) {
        this.ready = true;
        this.emit();
      }
    }
  }
  update(fn: (prior: LessonPreview) => LessonPreview) {
    if (!this.ready || this.closed) return;
    const next = lessonSessionSchema.parse(fn(this.session));
    this.session = {
      ...next,
      progress: { ...next.progress, updatedAt: new Date().toISOString() },
    };
    if (this.writable) {
      try {
        if (this.storage.getItem(this.key) !== this.raw) {
          this.changedElsewhere();
          return;
        }
        this.raw = JSON.stringify(this.session.progress);
        this.storage.setItem(this.key, this.raw);
        try {
          this.storage.setItem(
            this.cursorKey,
            JSON.stringify({
              screen: next.screen,
              positions: next.positions,
              updatedAt: this.session.progress.updatedAt,
            }),
          );
        } catch {
          /* This optional hint is not the answer checkpoint. */
        }
        this.sync.enqueue(this.session.progress);
      } catch {
        this.writable = false;
        this.storageIssue = true;
        this.sync.stop();
      }
    }
    this.emit();
  }
  changedElsewhere() {
    this.writable = false;
    this.storageIssue = true;
    this.sync.stop();
    this.emit();
  }
  async flush(retry = false) {
    if (this.writable && !this.closed) await this.sync.flush(retry);
  }
  close() {
    this.closed = true;
    this.sync.stop();
  }
}
