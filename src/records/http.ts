import { z } from "zod";
import { ImportConflict } from "./import-plan";
import { saveSchema } from "./protocol";
import { allowApplicationRequest } from "../runtime/access";
import { RecordConflict, recordStore } from "./store";
import { MAX_LEARNING_RECORD_BYTES } from "./limits";

const limit = MAX_LEARNING_RECORD_BYTES;
const headers = { "Cache-Control": "no-store" };
const reply = (body: unknown, status = 200) =>
  Response.json(body, { status, headers });
function allowed(request: Request) {
  return allowApplicationRequest(request);
}

export function learningHandlers(
  store: ReturnType<typeof recordStore>,
  identify: (headers: Headers) => Promise<string | null>,
) {
  async function owner(request: Request) {
    const id = await identify(request.headers);
    if (!id) return reply({ error: "sign_in_required" }, 401);
    if (request.headers.get("x-lvzhen-learner") !== id)
      return reply({ error: "account_changed" }, 403);
    return id;
  }
  async function GET(request: Request) {
    if (!allowed(request)) return reply({ error: "local_preview_only" }, 403);
    try {
      const learnerId = await owner(request);
      if (learnerId instanceof Response) return learnerId;
      return reply(await store.load(learnerId));
    } catch {
      return reply({ error: "storage_unavailable" }, 503);
    }
  }

  async function PUT(request: Request, importing = false) {
    if (!allowed(request)) return reply({ error: "local_preview_only" }, 403);
    let learnerId: string | Response;
    try {
      learnerId = await owner(request);
    } catch {
      return reply({ error: "storage_unavailable" }, 503);
    }
    if (learnerId instanceof Response) return learnerId;
    // Bound streamed input too, including requests without Content-Length.
    const reader = request.body?.getReader();
    if (!reader) return reply({ error: "invalid_record" }, 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    let input: unknown;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > limit) {
          await reader.cancel();
          return reply({ error: "record_too_large" }, 413);
        }
        chunks.push(value);
      }
      input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    } catch {
      return reply({ error: "invalid_record" }, 400);
    }
    const parsed = (
      importing
        ? saveSchema.extend({ confirmedOwnership: z.literal(true) }).strict()
        : saveSchema
    ).safeParse(input);
    if (!parsed.success) return reply({ error: "invalid_record" }, 400);
    try {
      return reply(
        await store.save(
          learnerId,
          parsed.data.expectedGeneration,
          parsed.data.state,
          importing,
        ),
      );
    } catch (error) {
      if (error instanceof RecordConflict || error instanceof ImportConflict)
        return reply({ error: error.message }, 409);
      return reply({ error: "storage_unavailable" }, 503);
    }
  }

  async function imports(request: Request) {
    if (request.method === "POST") return PUT(request, true);
    if (!allowed(request)) return reply({ error: "local_preview_only" }, 403);
    try {
      const learnerId = await owner(request);
      if (learnerId instanceof Response) return learnerId;
      const hash = new URL(request.url).searchParams.get("source");
      if (hash !== null && !/^[a-f0-9]{64}$/.test(hash))
        return reply({ error: "invalid_source" }, 400);
      const records = await store.imported(learnerId, hash ?? undefined);
      return records === null
        ? reply({ error: "not_found" }, 404)
        : reply(records);
    } catch {
      return reply({ error: "storage_unavailable" }, 503);
    }
  }
  return { GET, PUT, imports };
}
