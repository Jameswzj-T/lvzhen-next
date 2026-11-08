import { database } from "@/records/database";
import { recordStore } from "@/records/store";
import { learningHandlers } from "@/records/http";
import { currentSession } from "@/accounts/auth";
export const runtime = "nodejs";
async function handle(request: Request) {
  const handlers = learningHandlers(
    recordStore(database()),
    async (headers) => (await currentSession(headers))?.user.id ?? null,
  );
  return handlers.imports(request);
}
export const GET = handle;
export const POST = handle;
