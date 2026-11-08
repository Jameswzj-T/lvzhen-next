/** An opt-in test connection must point to a separate loopback cluster. Never
 * silently fall back to the learner database when a test variable is missing. */
export function isolatedRecordsTestDatabaseUrl(
  input = process.env.LVZHEN_RECORDS_TEST_DATABASE_URL,
): URL {
  if (!input) throw new Error("LVZHEN_RECORDS_TEST_DATABASE_URL is required");
  const url = new URL(input);
  if (
    !["postgres:", "postgresql:"].includes(url.protocol) ||
    url.hostname !== "127.0.0.1" ||
    !/^\d+$/.test(url.port) ||
    Number(url.port) < 1024 ||
    Number(url.port) > 65535 ||
    url.port === "55437" ||
    url.username !== "lvzhen_records_test" ||
    url.password ||
    url.pathname !== "/records_test_admin" ||
    url.search ||
    url.hash
  )
    throw new Error("Use a separate local PostgreSQL test cluster");
  return url;
}
