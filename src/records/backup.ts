import { spawn } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import { createReadStream } from "node:fs";
import {
  mkdir,
  mkdtemp,
  open,
  readFile,
  realpath,
  stat,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { Pool } from "pg";
import { z } from "zod";
import { localDatabaseUrl } from "./database";
import { isolatedRecordsTestDatabaseUrl } from "./isolated-test-database";

// Local operations only. These functions cannot select an external host or overwrite a database.
const manifestSchema = z
  .object({
    version: z.literal(1),
    createdAt: z.string().datetime(),
    archive: z.literal("records.dump"),
    sha256: z.string().regex(/^[a-f0-9]{64}$/),
    scope: z.literal("local-only"),
  })
  .strict();
const tables = [
  "auth_user",
  "auth_account",
  "auth_session",
  "auth_verification",
  "content_versions",
  "questions",
  "learning_checkpoints",
  "answer_attempts",
  "recall_attempts",
  "answer_evaluations",
  "imported_learning_records",
] as const;

function poolFor(name: string, connection: URL) {
  const url = new URL(connection);
  url.pathname = `/${name}`;
  return new Pool({
    connectionString: url.toString(),
    connectionTimeoutMillis: 2000,
    statement_timeout: 15000,
  });
}
async function digest(file: string) {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(file)) hash.update(chunk);
  return hash.digest("hex");
}
function run(bin: string, command: string, args: string[], stdout?: number) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(path.join(bin, command), args, {
      // Do not inherit connection overrides, credentials or arbitrary PGOPTIONS.
      env: {
        NODE_ENV: process.env.NODE_ENV ?? "production",
        PATH: process.env.PATH,
        LANG: "C",
        PGCONNECT_TIMEOUT: "5",
        PGSSLMODE: "disable",
        PGPASSFILE: "/dev/null",
      },
      stdio: ["ignore", stdout ?? "ignore", "ignore"],
      timeout: 60000,
      killSignal: "SIGKILL",
    });
    child.on("error", () => reject(new Error(`${command}_failed`)));
    child.on("close", (code) =>
      code === 0 ? resolve() : reject(new Error(`${command}_failed`)),
    );
  });
}

export function localBackupTools(
  root = path.resolve(".local-records/backups"),
  bin = process.env.LVZHEN_PG_BIN || "/opt/homebrew/opt/postgresql@17/bin",
  isolatedTestConnection?: string,
) {
  const connection =
    isolatedTestConnection === undefined
      ? new URL(localDatabaseUrl)
      : isolatedRecordsTestDatabaseUrl(isolatedTestConnection);
  const connectionArgs = [
    "--host=127.0.0.1",
    `--port=${connection.port}`,
    `--username=${connection.username}`,
    "--no-password",
  ];
  async function create(database = "lvzhen_local") {
    if (
      !(isolatedTestConnection === undefined && database === "lvzhen_local") &&
      !/^backup_test_[a-f0-9]{32}$/.test(database)
    )
      throw new Error("local_database_required");
    await mkdir(root, { recursive: true, mode: 0o700 });
    const directory = await mkdtemp(path.join(root, "backup-"));
    const archive = path.join(directory, "records.dump");
    const file = await open(archive, "wx", 0o600);
    try {
      await run(
        bin,
        "pg_dump",
        [
          ...connectionArgs,
          `--dbname=${database}`,
          "--format=custom",
          "--no-owner",
          "--no-privileges",
        ],
        file.fd,
      );
    } finally {
      await file.close();
    }
    await run(bin, "pg_restore", ["--list", archive]);
    const manifest = {
      version: 1,
      createdAt: new Date().toISOString(),
      archive: "records.dump",
      sha256: await digest(archive),
      scope: "local-only",
    };
    // An interrupted/failed dump never receives a completed manifest.
    await writeFile(
      path.join(directory, "manifest.json"),
      JSON.stringify(manifest, null, 2) + "\n",
      { mode: 0o600, flag: "wx" },
    );
    return directory;
  }
  async function verify(
    directory: string,
    inspect?: (restored: Pool) => Promise<void>,
  ) {
    const base = await realpath(root),
      resolved = await realpath(directory);
    if (
      path.dirname(resolved) !== base ||
      !path.basename(resolved).startsWith("backup-")
    )
      throw new Error("backup_location_invalid");
    const archive = path.join(resolved, "records.dump"),
      manifestPath = path.join(resolved, "manifest.json");
    if (
      (await realpath(archive)) !== archive ||
      (await realpath(manifestPath)) !== manifestPath
    )
      throw new Error("backup_location_invalid");
    if (
      !(await stat(archive)).isFile() ||
      (await stat(manifestPath)).size > 4096
    )
      throw new Error("backup_manifest_invalid");
    const manifest = manifestSchema.parse(
      JSON.parse(await readFile(manifestPath, "utf8")),
    );
    if ((await digest(archive)) !== manifest.sha256)
      throw new Error("backup_hash_mismatch");
    const name = `restore_check_${randomUUID().replaceAll("-", "")}`;
    const admin = poolFor(
        isolatedTestConnection === undefined
          ? "postgres"
          : "records_test_admin",
        connection,
      ),
      restored = poolFor(name, connection);
    let created = false;
    try {
      await admin.query(`CREATE DATABASE ${name} TEMPLATE template0`);
      created = true;
      await run(bin, "pg_restore", [
        ...connectionArgs,
        `--dbname=${name}`,
        "--single-transaction",
        "--exit-on-error",
        "--no-owner",
        "--no-privileges",
        archive,
      ]);
      const counts: Record<string, number> = {};
      for (const table of tables) {
        const result = await restored.query(
          `SELECT count(*)::int AS count FROM ${table}`,
        );
        counts[table] = result.rows[0].count;
      }
      const triggers = await restored.query(
        "SELECT count(*)::int AS count FROM pg_trigger WHERE NOT tgisinternal AND tgenabled <> 'D' AND tgname = ANY($1)",
        [
          [
            "content_immutable",
            "question_immutable",
            "answer_immutable",
            "recall_immutable",
            "evaluation_immutable",
            "imported_record_immutable",
          ],
        ],
      );
      if (triggers.rows[0].count !== 6)
        throw new Error("backup_constraints_missing");
      await inspect?.(restored);
      return {
        restored: true,
        checkedTables: tables.length,
        immutableTriggers: 6,
        counts,
      };
    } finally {
      await restored.end();
      try {
        if (created) await admin.query(`DROP DATABASE ${name} WITH (FORCE)`);
      } finally {
        await admin.end();
      }
    }
  }
  return { create, verify };
}
