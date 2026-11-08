import { expect, it, beforeEach, afterEach, vi } from "vitest";
import { RecentModelRequests } from "./recent-requests";
import {
  PublicModelRequestGate,
  publicModelRequestLimits,
  getPublicModelRuntime,
} from "./request-control";
import { isPublicModelRequestError } from "./request-errors";

// Pure admission/cache tests; all keys and callbacks are synthetic, never real provider calls.
const key = "synthetic-runtime-not-a-provider-key";
const network = vi.fn(() => {
  throw Error("runtime tests must not connect");
});
beforeEach(() => {
  network.mockClear();
  vi.stubGlobal("fetch", network);
});
afterEach(() => {
  expect(network).not.toHaveBeenCalled();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});
function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (error: Error) => void;
  const promise = new Promise<T>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
}

it("validates deployment limits and shares the same default gate and cache across consumers", () => {
  expect(publicModelRequestLimits({ NODE_ENV: "test" })).toEqual({
    maxConcurrent: 8,
    maxPerKey: 2,
    perKeyPerMinute: 60,
    maximumKeys: 1024,
  });
  expect(
    publicModelRequestLimits({
      NODE_ENV: "test",
      LVZHEN_AI_MAX_CONCURRENT: "1",
      LVZHEN_AI_PER_KEY_CONCURRENT: "1",
      LVZHEN_AI_PER_KEY_PER_MINUTE: "10",
    }).maxConcurrent,
  ).toBe(1);
  for (const env of [
    { LVZHEN_AI_MAX_CONCURRENT: "0" },
    { LVZHEN_AI_MAX_CONCURRENT: "65" },
    { LVZHEN_AI_PER_KEY_CONCURRENT: "9" },
    { LVZHEN_AI_PER_KEY_PER_MINUTE: "601" },
    { LVZHEN_AI_MAX_CONCURRENT: " 8" },
  ])
    expect(() =>
      publicModelRequestLimits({ NODE_ENV: "test", ...env }),
    ).toThrow("configuration");
  expect(getPublicModelRuntime()).toBe(getPublicModelRuntime());
});
it("rejects before dispatch without poisoning the original intent; release is idempotent", async () => {
  const gate = new PublicModelRequestGate({ maxConcurrent: 1, maxPerKey: 1 });
  const cache = new RecentModelRequests();
  const run = vi.fn(async () => "received");
  const release = gate.acquire("synthetic-other-key");
  expect(() =>
    cache.once(key, "intent", "same-body", run, () => gate.acquire(key)),
  ).toThrow("server_busy");
  expect(cache.read(key, "intent", "same-body")).toBeUndefined();
  expect(run).not.toHaveBeenCalled();
  release();
  release();
  await expect(
    cache.once(key, "intent", "same-body", run, () => gate.acquire(key)),
  ).resolves.toBe("received");
  expect(run).toHaveBeenCalledTimes(1);
});
it("keeps one pending request beyond TTL, starts expiry at settlement, and does not consume a second slot for duplicates", async () => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(1000);
  const gate = new PublicModelRequestGate({ maxConcurrent: 1, maxPerKey: 1 }),
    cache = new RecentModelRequests(2, 1000),
    held = deferred<string>();
  const run = vi.fn(() => held.promise),
    admit = vi.fn(() => gate.acquire(key));
  const first = cache.once(key, "one", "body", run, admit);
  await Promise.resolve();
  vi.setSystemTime(20000);
  const duplicate = cache.once(key, "one", "body", run, admit);
  expect(first).toBe(duplicate);
  expect(run).toHaveBeenCalledTimes(1);
  expect(admit).toHaveBeenCalledTimes(1);
  held.resolve("saved");
  await first;
  vi.setSystemTime(20999);
  expect(cache.read(key, "one", "body")).toBe(first);
  vi.setSystemTime(21000);
  expect(cache.read(key, "one", "body")).toBeUndefined();
  const release = gate.acquire(key);
  release();
});
it("retains a possibly sent failure and does not silently invoke the callback again", async () => {
  const gate = new PublicModelRequestGate({ maxConcurrent: 1, maxPerKey: 1 }),
    cache = new RecentModelRequests(),
    run = vi.fn(async () => {
      throw Error("synthetic timeout after possible send");
    });
  await expect(
    cache.once(key, "failure", "body", run, () => gate.acquire(key)),
  ).rejects.toThrow("synthetic timeout");
  await expect(
    cache.once(key, "failure", "body", run, () => gate.acquire(key)),
  ).rejects.toThrow("synthetic timeout");
  expect(run).toHaveBeenCalledTimes(1);
  expect(() => cache.read(key, "failure", "changed-body")).toThrow(
    "request_changed",
  );
  const release = gate.acquire(key);
  release();
});
it("bounds per-key frequency and tracked identities independently of the global slot limit", () => {
  let now = 0;
  const gate = new PublicModelRequestGate({
    maxConcurrent: 3,
    maxPerKey: 1,
    perKeyPerMinute: 1,
    maximumKeys: 2,
    now: () => now,
  });
  const first = gate.acquire(key);
  expect(() => gate.acquire(key)).toThrow("key_busy");
  first();
  try {
    gate.acquire(key);
    throw Error("must reject");
  } catch (error) {
    expect(isPublicModelRequestError(error)).toBe(true);
    expect(error).toMatchObject({ code: "key_rate", retryAfter: 60 });
  }
  gate.acquire("synthetic-second")();
  expect(() => gate.acquire("synthetic-third")).toThrow("server_busy");
  now = 60000;
  const after = gate.acquire("synthetic-third");
  after();
});
it("checks cache capacity before admission and never evicts a live request to accept another", async () => {
  const cache = new RecentModelRequests(1, 1000),
    held = deferred<string>(),
    admit = vi.fn(() => () => {});
  const first = cache.once(key, "first", "body", () => held.promise, admit);
  await Promise.resolve();
  expect(() =>
    cache.once(key, "second", "body", async () => "second", admit),
  ).toThrow("server_busy");
  expect(admit).toHaveBeenCalledTimes(1);
  held.resolve("first");
  await first;
  expect(await cache.read(key, "first", "body")).toBe("first");
});
