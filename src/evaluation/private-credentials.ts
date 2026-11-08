import { constants, type Stats } from "node:fs";
import { open, mkdir, lstat, rename, unlink } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { keychainAccount } from "./keychain";
import type { ProviderConfig } from "./provider";

export const privateCredentialDirectory = () =>
  join(homedir(), "Library", "Application Support", "lvzhen-model-access");
const documentSchema = z
  .object({
    schemaVersion: z.literal(1),
    entries: z.record(
      z
        .string()
        .regex(/^(deepseek|qwen-cn-beijing:[a-zA-Z0-9][a-zA-Z0-9-]{0,62})$/),
      z
        .string()
        .min(1)
        .max(8192)
        .regex(/^[^\x00-\x20\x7f]+$/),
    ),
  })
  .strict();
function ownedPrivate(stat: Stats) {
  return (
    !stat.isSymbolicLink() &&
    (stat.mode & 0o077) === 0 &&
    stat.uid === process.getuid?.()
  );
}
async function checkDirectory(directory: string) {
  const stat = await lstat(directory);
  if (!stat.isDirectory() || !ownedPrivate(stat))
    throw new Error("private-storage-permissions");
}
async function readDocument(directory: string) {
  await checkDirectory(directory);
  const file = await open(
    join(directory, "credentials.json"),
    constants.O_RDONLY | constants.O_NOFOLLOW,
  );
  try {
    const stat = await file.stat();
    if (!stat.isFile() || !ownedPrivate(stat) || stat.size > 65536)
      throw new Error("private-storage-permissions");
    return documentSchema.parse(JSON.parse(await file.readFile("utf8")));
  } finally {
    await file.close();
  }
}
/** Explicit opt-in plaintext storage outside the project. Never print its contents. */
export async function savePrivateCredentials(
  entries: Record<string, string>,
  directory = privateCredentialDirectory(),
) {
  const parsed = documentSchema.safeParse({ schemaVersion: 1, entries });
  if (!parsed.success) throw new Error("private-credential-invalid");
  const incoming = parsed.data;
  await mkdir(directory, { recursive: true, mode: 0o700 });
  await checkDirectory(directory);
  let previous: Record<string, string> = {};
  try {
    previous = (await readDocument(directory)).entries;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT")
      throw new Error("private-storage-unavailable");
  }
  const temporary = join(directory, ".credentials-" + randomUUID());
  const file = await open(temporary, "wx", 0o600);
  try {
    try {
      await file.writeFile(
        JSON.stringify({
          schemaVersion: 1,
          entries: { ...previous, ...incoming.entries },
        }),
      );
      await file.sync();
    } finally {
      await file.close();
    }
    await rename(temporary, join(directory, "credentials.json"));
  } catch {
    await unlink(temporary).catch(() => {});
    throw new Error("private-storage-save-failed");
  }
}
export async function readPrivateCredential(
  config: ProviderConfig,
  directory = privateCredentialDirectory(),
) {
  const account = keychainAccount(config);
  try {
    const token = (await readDocument(directory)).entries[account];
    if (!token) throw new Error("missing");
    return token;
  } catch {
    throw new Error("private-credential-unavailable");
  }
}
