import { runtimeConfig } from "../runtime/config";
import { allowScoringTrialRequest } from "../evaluation/local-scoring-access";

export const usesOwnModelKey = (
  request: Request,
  env: NodeJS.ProcessEnv = process.env,
) =>
  env.LVZHEN_ENV === "public" ||
  request.headers.get("x-lvzhen-ai-mode") === "byok";

/** Same-origin public app, including a loopback upstream behind the configured TLS proxy. */
export function allowPublicRequest(
  request: Request,
  header: string,
  env: NodeJS.ProcessEnv = process.env,
) {
  try {
    const config = runtimeConfig(env);
    if (config.mode !== "public") return false;
    const url = new URL(request.url),
      expected = new URL(config.origin);
    const host = request.headers.get("host");
    const direct =
      url.origin === config.origin && (!host || host === expected.host);
    const proxy =
      ["http:", "https:"].includes(url.protocol) &&
      ["127.0.0.1", "localhost", "[::1]"].includes(url.hostname) &&
      host === expected.host;
    return (
      (direct || proxy) &&
      request.headers.get(header) === "1" &&
      request.headers.get("sec-fetch-site") !== "cross-site" &&
      (request.headers.get("origin") === config.origin ||
        (!request.headers.get("origin") &&
          ["GET", "HEAD"].includes(request.method)))
    );
  } catch {
    return false;
  }
}
export function allowOwnKeyRequest(
  request: Request,
  env: NodeJS.ProcessEnv = process.env,
) {
  return env.LVZHEN_ENV === "public"
    ? allowPublicRequest(request, "x-lvzhen-scoring", env)
    : allowScoringTrialRequest(request, env);
}
