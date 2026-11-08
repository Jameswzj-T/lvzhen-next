import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { z } from "zod";

export const accessSchema = z
  .object({
    schemaVersion: z.literal(1),
    qwen: z
      .object({
        region: z.literal("cn-beijing"),
        workspaceId: z.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9-]{0,62}$/),
      })
      .strict(),
    keychainReady: z.boolean(),
    credentialStore: z
      .enum(["keychain", "private-file", "project-file"])
      .default("project-file"),
    privateFileReady: z.boolean().default(false),
  })
  .strict();
export const accessPath = (repo: string) =>
  join(repo, "artifacts", "local-model-access.json");
export async function readLocalAccess(repo: string) {
  return accessSchema.parse(
    JSON.parse(await readFile(accessPath(repo), "utf8")),
  );
}
/** This file is public connection metadata only; keys are held by macOS Keychain. */
export async function saveLocalAccess(repo: string, raw: unknown) {
  const data = accessSchema.parse(raw);
  await mkdir(join(repo, "artifacts"), { recursive: true });
  const temporary = accessPath(repo) + "." + randomUUID() + ".tmp";
  await writeFile(temporary, JSON.stringify(data, null, 2) + "\n", {
    mode: 0o600,
    flag: "wx",
  });
  await rename(temporary, accessPath(repo));
}
