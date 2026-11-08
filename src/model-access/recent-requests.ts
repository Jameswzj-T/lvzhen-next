import { createHash } from "node:crypto";
import { PublicModelRequestError } from "./request-errors";
/** Short process-local deduplication; never stores the API key or writes learner data to disk. */
export class RecentModelRequests {
  private entries = new Map<
    string,
    { expires: number; fingerprint: string; result: Promise<unknown> }
  >();
  constructor(
    private readonly maximum = 128,
    private readonly ttl = 10 * 60 * 1000,
  ) {}
  private identity(key: string, id: string) {
    return createHash("sha256")
      .update(JSON.stringify([key, id]))
      .digest("hex");
  }
  private prune() {
    for (const [id, e] of this.entries)
      if (e.expires <= Date.now()) this.entries.delete(id);
  }
  read(key: string, id: string, fingerprint: string) {
    this.prune();
    const entry = this.entries.get(this.identity(key, id));
    if (entry && entry.fingerprint !== fingerprint)
      throw new PublicModelRequestError("request_changed");
    return entry?.result;
  }
  once<T>(
    key: string,
    id: string,
    fingerprint: string,
    run: () => Promise<T>,
    beforeRun?: () => () => void,
  ): Promise<T> {
    const previous = this.read(key, id, fingerprint);
    if (previous) return previous as Promise<T>;
    if (this.entries.size >= this.maximum)
      throw new PublicModelRequestError("server_busy");
    // Synchronous admission precedes entry creation; local rejection is safe to retry.
    const release = beforeRun?.();
    const identity = this.identity(key, id);
    const result = Promise.resolve()
      .then(run)
      .finally(() => {
        try {
          release?.();
        } finally {
          const entry = this.entries.get(identity);
          if (entry?.result === result) entry.expires = Date.now() + this.ttl;
        }
      });
    this.entries.set(identity, {
      expires: Infinity,
      fingerprint,
      result,
    });
    // Retain a rejected intent too: an uncertain/billed failure is not retried silently.
    void result.catch(() => {});
    return result;
  }
}
