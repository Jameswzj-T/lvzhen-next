import { z } from "zod";
import { progressSchema } from "../domain/fault-progress";

export const checkpointSchema = z.object({
  generation: z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER),
  state: progressSchema.nullable(),
});
export const saveSchema = z
  .object({
    expectedGeneration: z
      .number()
      .int()
      .nonnegative()
      .max(Number.MAX_SAFE_INTEGER),
    state: progressSchema,
  })
  .strict();
export type SavedCheckpoint = z.infer<typeof checkpointSchema>;

// JSONB doesn't preserve object-key order. Original answer strings are untouched.
function sorted(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sorted);
  if (value && typeof value === "object")
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, item]) => [key, sorted(item)]),
    );
  return value;
}
export const serializeRecord = (value: unknown) =>
  JSON.stringify(sorted(value));
export const sameRecord = (a: unknown, b: unknown) =>
  serializeRecord(a) === serializeRecord(b);

export function allowLocalRecords(request: Request, enabled: boolean) {
  const url = new URL(request.url);
  const host = request.headers.get("host") ?? url.host;
  const origin = request.headers.get("origin");
  const loopbackHosts = ["127.0.0.1:3107", "localhost:3107"];
  return (
    enabled &&
    url.protocol === "http:" &&
    loopbackHosts.includes(url.host) &&
    loopbackHosts.includes(host) &&
    request.headers.get("x-lvzhen-records") === "1" &&
    (origin === `http://${host}` ||
      (!origin && ["GET", "HEAD"].includes(request.method))) &&
    request.headers.get("sec-fetch-site") !== "cross-site"
  );
}
