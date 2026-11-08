import { mkdir, open } from "node:fs/promises";
import { join } from "node:path";
import type { BatchSink } from "./batch";

/** Local-only durable, exclusive files. An existing run directory is never reused. */
export function createBatchFileSink(
  outputRoot: string,
  sourceSha256: string,
): BatchSink {
  if (!/^[a-f0-9]{64}$/.test(sourceSha256))
    throw new Error("Invalid source hash");
  let directory: string | undefined;
  const write = async (name: string, value: unknown) => {
    if (!directory || !/^[a-zA-Z0-9-]+$/.test(name))
      throw new Error("Invalid output state");
    const handle = await open(join(directory, `${name}.json`), "wx", 0o600);
    try {
      await handle.writeFile(JSON.stringify(value, null, 2) + "\n");
      await handle.sync();
    } finally {
      await handle.close();
    }
  };
  return {
    begin: async (manifest) => {
      if (
        directory ||
        !/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,79}$/.test(manifest.plan.runId)
      )
        throw new Error("Invalid output state");
      await mkdir(outputRoot, { recursive: true, mode: 0o700 });
      const candidate = join(outputRoot, manifest.plan.runId);
      await mkdir(candidate, { mode: 0o700 });
      directory = candidate;
      await write("manifest", { schemaVersion: 1, sourceSha256, ...manifest });
    },
    write,
  };
}
