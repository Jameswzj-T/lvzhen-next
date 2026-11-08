import { database } from "@/records/database";
import { recordStore } from "@/records/store";
import { learningHandlers } from "@/records/http";
import { currentSession } from "@/accounts/auth";
export const runtime = "nodejs";
function handlers() {
  return learningHandlers(
    recordStore(database()),
    async (headers) => (await currentSession(headers))?.user.id ?? null,
  );
}
export async function GET(request: Request) {
  return handlers().GET(request);
}
export async function PUT(request: Request) {
  return handlers().PUT(request);
}
