// Shared local-only guard; importing it does not load legacy experiment assets.
export function allowScoringTrialRequest(request: Request, env = process.env) {
  const u = new URL(request.url),
    host = request.headers.get("host");
  return (
    (env.LVZHEN_ENV ?? "local") === "local" &&
    u.protocol === "http:" &&
    ["127.0.0.1:3107", "localhost:3107"].includes(u.host) &&
    host !== null &&
    ["127.0.0.1:3107", "localhost:3107"].includes(host) &&
    request.headers.get("origin") === `http://${host}` &&
    request.headers.get("x-lvzhen-scoring") === "1" &&
    request.headers.get("sec-fetch-site") !== "cross-site"
  );
}
