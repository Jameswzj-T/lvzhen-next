import { runtimeConfig, type RuntimeConfig } from "./config";
import { allowLocalRecords } from "../records/protocol";
export function allowApplicationRequest(
  request: Request,
  config?: RuntimeConfig,
) {
  try {
    const c = config ?? runtimeConfig();
    if (c.mode === "local") return allowLocalRecords(request, c.enabled);
    const origin = request.headers.get("origin");
    const url = new URL(request.url),
      expected = new URL(c.origin);
    const host = request.headers.get("host");
    // Next can retain the loopback upstream URL behind a TLS proxy. Require the
    // configured Host; forwarded headers never choose which site we trust.
    const targetMatches =
      url.origin === c.origin
        ? !host || host === expected.host
        : ["http:", "https:"].includes(url.protocol) &&
          ["127.0.0.1", "localhost", "[::1]"].includes(url.hostname) &&
          host === expected.host;
    return (
      c.enabled &&
      targetMatches &&
      request.headers.get("x-lvzhen-records") === "1" &&
      request.headers.get("sec-fetch-site") !== "cross-site" &&
      (origin === c.origin ||
        (!origin && ["GET", "HEAD"].includes(request.method)))
    );
  } catch {
    return false;
  }
}
