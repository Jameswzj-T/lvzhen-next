import { mailDeliveryContext } from "./mail";
import { z } from "zod";
import type { createAccountAuth } from "./auth";
import { localAccountAccess, privateReply } from "./access";
const routes = new Set([
  "get-session",
  "sign-up/email",
  "sign-in/email",
  "sign-out",
  "request-password-reset",
  "reset-password",
  "send-verification-email",
  "verify-email",
]);
export function accountHandler(
  auth: () => ReturnType<typeof createAccountAuth>,
) {
  return async (request: Request) => {
    if (!localAccountAccess(request))
      return privateReply({ error: "local_preview_only" }, 403);
    if (!routes.has(new URL(request.url).pathname.slice("/api/auth/".length)))
      return privateReply({ error: "not_available" }, 404);
    try {
      const action = new URL(request.url).pathname.slice("/api/auth/".length);
      // Tokens travel in POST bodies, not Next access logs or redirect query strings.
      if (action === "verify-email") {
        if (request.method !== "POST")
          return privateReply({ error: "method_not_allowed" }, 405);
        const data = z
          .object({ token: z.string().min(1).max(4096) })
          .strict()
          .safeParse(await request.json());
        if (!data.success) return privateReply({ error: "invalid_link" }, 400);
        const target = new URL(request.url);
        target.search = "";
        target.searchParams.set("token", data.data.token);
        const response = await auth().handler(
          new Request(target, { headers: request.headers }),
        );
        // Do not expose user details or create a login as a side effect of verification.
        return privateReply(
          response.ok ? { status: true } : { error: "invalid_or_expired_link" },
          response.ok ? 200 : response.status,
        );
      }
      const delivery = { failed: false };
      const response = await mailDeliveryContext.run(delivery, () =>
        auth().handler(request),
      );
      if (delivery.failed)
        return privateReply({ error: "mail_delivery_failed" }, 503);
      response.headers.set("Cache-Control", "no-store");
      return response;
    } catch {
      return privateReply({ error: "account_unavailable" }, 503);
    }
  };
}
