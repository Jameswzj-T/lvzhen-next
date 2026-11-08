import { createHash } from "node:crypto";
import { PublicModelRequestError } from "./request-errors";
import { RecentModelRequests } from "./recent-requests";

export type PublicModelRequestLimits = {
  maxConcurrent: number;
  maxPerKey: number;
  perKeyPerMinute: number;
  maximumKeys: number;
};
const defaults: PublicModelRequestLimits = {
  maxConcurrent: 8,
  maxPerKey: 2,
  perKeyPerMinute: 60,
  maximumKeys: 1024,
};
const valid = (value: number, maximum: number) =>
  Number.isSafeInteger(value) && value >= 1 && value <= maximum;
function validate(limits: PublicModelRequestLimits) {
  if (
    !valid(limits.maxConcurrent, 64) ||
    !valid(limits.maxPerKey, limits.maxConcurrent) ||
    !valid(limits.perKeyPerMinute, 600) ||
    !valid(limits.maximumKeys, 10000)
  )
    throw new PublicModelRequestError("configuration");
  return limits;
}
export function publicModelRequestLimits(
  env: NodeJS.ProcessEnv = process.env,
): PublicModelRequestLimits {
  const read = (name: string, fallback: number) => {
    const value = env[name];
    if (value === undefined) return fallback;
    if (!/^[1-9]\d{0,4}$/.test(value))
      throw new PublicModelRequestError("configuration");
    return Number(value);
  };
  return validate({
    ...defaults,
    maxConcurrent: read("LVZHEN_AI_MAX_CONCURRENT", defaults.maxConcurrent),
    maxPerKey: read("LVZHEN_AI_PER_KEY_CONCURRENT", defaults.maxPerKey),
    perKeyPerMinute: read(
      "LVZHEN_AI_PER_KEY_PER_MINUTE",
      defaults.perKeyPerMinute,
    ),
  });
}

/** No queue or retry: admission either reserves a slot now or rejects before dispatch. */
export class PublicModelRequestGate {
  private active = 0;
  private keys = new Map<
    string,
    { active: number; count: number; resetAt: number }
  >();
  readonly limits: PublicModelRequestLimits;
  private readonly now: () => number;
  constructor(
    options: Partial<PublicModelRequestLimits> & { now?: () => number } = {},
  ) {
    const { now, ...limits } = options;
    this.limits = Object.freeze(validate({ ...defaults, ...limits }));
    this.now = now ?? Date.now;
  }
  acquire(key: string): () => void {
    const at = this.now();
    for (const [id, row] of this.keys)
      if (!row.active && row.resetAt <= at) this.keys.delete(id);
    const id = createHash("sha256").update(key).digest("hex");
    let row = this.keys.get(id);
    if (row && row.resetAt <= at) {
      row.count = 0;
      row.resetAt = at + 60_000;
    }
    if (this.active >= this.limits.maxConcurrent)
      throw new PublicModelRequestError("server_busy");
    if ((row?.active ?? 0) >= this.limits.maxPerKey)
      throw new PublicModelRequestError("key_busy");
    if (row && row.count >= this.limits.perKeyPerMinute)
      throw new PublicModelRequestError(
        "key_rate",
        Math.max(1, Math.ceil((row.resetAt - at) / 1000)),
      );
    if (!row && this.keys.size >= this.limits.maximumKeys)
      throw new PublicModelRequestError("server_busy");
    if (!row) {
      row = { active: 0, count: 0, resetAt: at + 60_000 };
      this.keys.set(id, row);
    }
    row.active++;
    row.count++;
    this.active++;
    let released = false;
    return () => {
      if (released) return;
      released = true;
      row!.active--;
      this.active--;
    };
  }
}

type PublicModelRuntime = {
  recent: RecentModelRequests;
  gate: PublicModelRequestGate;
};
const runtimeKey = Symbol.for("lvzhen.public-model-runtime.v1");
/** Shared by both route bundles in one Node process. New processes have a new bounded window. */
export function getPublicModelRuntime(
  env: NodeJS.ProcessEnv = process.env,
): PublicModelRuntime {
  const globals = globalThis as unknown as Record<
    symbol,
    PublicModelRuntime | undefined
  >;
  if (!globals[runtimeKey])
    globals[runtimeKey] = {
      recent: new RecentModelRequests(512),
      gate: new PublicModelRequestGate(publicModelRequestLimits(env)),
    };
  return globals[runtimeKey]!;
}
