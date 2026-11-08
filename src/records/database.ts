import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { runtimeConfig } from "../runtime/config";

// Account-backed local preview only; external deployment configuration comes next.
// Do not reuse a model key or another project's DATABASE_URL.
export { localDatabaseUrl } from "../runtime/config";
const globalDatabase = globalThis as unknown as {
  lvzhenRecordsPool?: Pool;
  lvzhenRecordsConfig?: string;
};
export function database() {
  const config = runtimeConfig();
  const signature = JSON.stringify([
    config.mode,
    config.databaseUrl,
    config.databaseTls,
  ]);
  if (
    globalDatabase.lvzhenRecordsPool &&
    globalDatabase.lvzhenRecordsConfig !== signature
  )
    throw new Error("configuration_changed_restart_required");
  globalDatabase.lvzhenRecordsConfig = signature;
  const pool = (globalDatabase.lvzhenRecordsPool ??= new Pool({
    connectionString: config.databaseUrl,
    ssl: config.databaseTls ? { rejectUnauthorized: true } : false,
    max: 4,
    connectionTimeoutMillis: 1500,
    statement_timeout: 3000,
    idleTimeoutMillis: 10000,
  }));
  return drizzle(pool);
}
