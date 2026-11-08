import { currentSession } from "@/accounts/auth";
import { localAccountAccess, privateReply } from "@/accounts/access";
import { allowPublicRequest } from "@/model-access/access";
export const runtime = "nodejs";
export async function GET(request: Request) {
  if (allowPublicRequest(request, "x-lvzhen-records"))
    return privateReply({ user: null });
  if (!localAccountAccess(request))
    return privateReply({ error: "local_preview_only" }, 403);
  try {
    const active = await currentSession(request.headers);
    return privateReply({
      user: active
        ? {
            id: active.user.id,
            name: active.user.name,
            email: active.user.email,
            emailVerified: active.user.emailVerified,
          }
        : null,
    });
  } catch {
    return privateReply({ error: "account_unavailable" }, 503);
  }
}
