import { isIP } from "node:net";
import { z } from "zod";

export const localDatabaseUrl =
  "postgresql://lvzhen_local@127.0.0.1:55437/lvzhen_local";
export type RuntimeConfig = {
  mode: "local" | "trial" | "public";
  enabled: boolean;
  origin: string;
  databaseUrl: string;
  databaseTls: boolean;
  authSecret: string;
  smtp?: {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    password: string;
    from: string;
  };
};
function invalid(field: string): never {
  throw new Error(`configuration_invalid:${field}`);
}
function required(env: NodeJS.ProcessEnv, field: string) {
  const value = env[field];
  if (!value || /[\r\n\0]/.test(value)) invalid(field);
  return value;
}
function parseUrl(value: string, field: string) {
  try {
    return new URL(value);
  } catch {
    return invalid(field);
  }
}
export function runtimeConfig(
  env: NodeJS.ProcessEnv = process.env,
): RuntimeConfig {
  const mode = env.LVZHEN_ENV ?? "local";
  if (mode === "local")
    return {
      mode,
      enabled:
        env.NODE_ENV === "development" || env.LVZHEN_LOCAL_RECORDS === "1",
      origin: "http://127.0.0.1:3107",
      databaseUrl: localDatabaseUrl,
      databaseTls: false,
      authSecret: env.LVZHEN_AUTH_SECRET ?? "",
    };
  if (mode !== "trial" && mode !== "public") invalid("LVZHEN_ENV");
  if (env.LVZHEN_LOCAL_RECORDS === "1") invalid("LVZHEN_LOCAL_RECORDS");
  const origin = required(env, "LVZHEN_APP_ORIGIN"),
    site = parseUrl(origin, "LVZHEN_APP_ORIGIN");
  if (
    site.protocol !== "https:" ||
    site.origin !== origin ||
    site.username ||
    site.password ||
    isIP(site.hostname.replaceAll(/[\[\]]/g, "")) ||
    !site.hostname.includes(".") ||
    /\.(localhost|local)$/.test(site.hostname)
  )
    invalid("LVZHEN_APP_ORIGIN");
  // Free BYOK site: guest learning stays in the browser; no account DB or mail is opened.
  if (mode === "public")
    return {
      mode,
      enabled: false,
      origin,
      databaseUrl: "",
      databaseTls: false,
      authSecret: "",
    };
  const databaseUrl = required(env, "LVZHEN_DATABASE_URL"),
    db = parseUrl(databaseUrl, "LVZHEN_DATABASE_URL");
  if (
    !["postgres:", "postgresql:"].includes(db.protocol) ||
    !db.username ||
    !db.password ||
    !/^\/[a-zA-Z0-9_-]+$/.test(db.pathname) ||
    db.pathname === "/lvzhen_local" ||
    db.username === "lvzhen_local" ||
    db.search ||
    db.hash
  )
    invalid("LVZHEN_DATABASE_URL");
  const tls = required(env, "LVZHEN_DATABASE_TLS");
  if (
    tls !== "verify-full" &&
    !(tls === "loopback" && ["127.0.0.1", "[::1]"].includes(db.hostname))
  )
    invalid("LVZHEN_DATABASE_TLS");
  const authSecret = required(env, "LVZHEN_AUTH_SECRET");
  if (authSecret.length < 32) invalid("LVZHEN_AUTH_SECRET");
  const host = required(env, "LVZHEN_SMTP_HOST");
  if (!/^[a-zA-Z0-9.-]+$/.test(host) || !host.includes(".") || isIP(host))
    invalid("LVZHEN_SMTP_HOST");
  const portString = required(env, "LVZHEN_SMTP_PORT"),
    port = Number(portString);
  if (!["465", "587"].includes(portString)) invalid("LVZHEN_SMTP_PORT");
  const from = required(env, "LVZHEN_SMTP_FROM");
  if (!z.email().safeParse(from).success) invalid("LVZHEN_SMTP_FROM");
  return {
    mode,
    enabled: true,
    origin,
    databaseUrl,
    databaseTls: tls === "verify-full",
    authSecret,
    smtp: {
      host,
      port,
      secure: port === 465,
      from,
      user: required(env, "LVZHEN_SMTP_USER"),
      password: required(env, "LVZHEN_SMTP_PASSWORD"),
    },
  };
}
