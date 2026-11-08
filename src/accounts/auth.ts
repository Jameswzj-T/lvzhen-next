import { betterAuth } from "better-auth/minimal";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { database } from "../records/database";
import { runtimeConfig } from "../runtime/config";
import { accountMailDelivery } from "./smtp";
import { observedDelivery, type AccountMailDelivery } from "./mail";
import * as schema from "./schema";

export function createAccountAuth(
  db: NodePgDatabase,
  secret: string,
  deliver: AccountMailDelivery = async () => {
    throw new Error("mail_delivery_not_configured");
  },
  site = { origin: "http://127.0.0.1:3107", requireVerification: false },
) {
  if (secret.length < 32) throw new Error("account_secret_unavailable");
  const sendMail = observedDelivery(deliver);
  return betterAuth({
    appName: "律真",
    baseURL: site.origin,
    secret,
    database: drizzleAdapter(db, { provider: "pg", schema }),
    trustedOrigins: site.requireVerification
      ? [site.origin]
      : [site.origin, "http://localhost:3107"],
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: site.requireVerification,
      minPasswordLength: 12,
      maxPasswordLength: 128,
      resetPasswordTokenExpiresIn: 1800,
      revokeSessionsOnPasswordReset: true,
      sendResetPassword: async ({ user, token }) =>
        sendMail({
          kind: "reset",
          to: user.email,
          url: `${site.origin}/account/reset#token=${encodeURIComponent(token)}`,
          expiresInSeconds: 1800,
        }),
    },
    emailVerification: {
      sendOnSignUp: site.requireVerification,
      sendOnSignIn: false,
      autoSignInAfterVerification: false,
      expiresIn: 1800,
      sendVerificationEmail: async ({ user, token }) =>
        sendMail({
          kind: "verify",
          to: user.email,
          url: `${site.origin}/account/verify#token=${encodeURIComponent(token)}`,
          expiresInSeconds: 1800,
        }),
    },
    session: { expiresIn: 60 * 60 * 24 * 7, cookieCache: { enabled: false } },
    rateLimit: { enabled: true, window: 60, max: 30 },
    advanced: {
      useSecureCookies: site.requireVerification,
      cookiePrefix: "lvzhen",
      defaultCookieAttributes: { httpOnly: true, sameSite: "lax" },
    },
    telemetry: { enabled: false },
    logger: { disabled: true },
  });
}
let instance: ReturnType<typeof createAccountAuth> | undefined;
export function accountAuth() {
  const config = runtimeConfig();
  return (instance ??= createAccountAuth(
    database(),
    config.authSecret,
    accountMailDelivery(config),
    { origin: config.origin, requireVerification: config.mode === "trial" },
  ));
}
export async function currentSession(headers: Headers) {
  const session = await accountAuth().api.getSession({ headers });
  return runtimeConfig().mode === "trial" && !session?.user.emailVerified
    ? null
    : session;
}
