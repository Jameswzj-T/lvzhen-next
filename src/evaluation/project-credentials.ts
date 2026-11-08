import { open } from "node:fs/promises";
import { constants } from "node:fs";
import { join } from "node:path";
import { z } from "zod";
import { keychainAccount } from "./keychain";
import type { ProviderConfig } from "./provider";

const key = z
  .string()
  .min(1)
  .max(8192)
  .regex(/^[^\x00-\x20\x7f]+$/);
const keysSchema = z
  .object({
    DEEPSEEK_API_KEY: key,
    QWEN_API_KEY: key,
    MIMO_API_KEY: key.optional(),
    GLM_API_KEY: key.optional(),
    MINIMAX_API_KEY: key.optional(),
  })
  .strict();
/** Read inside the test process only. Never send the document or parser error to logs. */
export async function readProjectCredential(
  config: ProviderConfig,
  repo: string,
) {
  // Access verification can precede evaluation catalog registration. Bind the
  // new credential to the reviewed models and exact official endpoint here.
  const account =
    // Same existing DeepSeek project credential for the documented strict-tool
    // endpoint. The paid dispatcher/plan separately bind its schema and mode.
    config.model === "deepseek-flash" &&
    config.endpoint === "https://api.deepseek.com/beta/chat/completions"
      ? "deepseek"
      : ["mimo-v2.6-flash", "mimo-v2.6-pro"].includes(config.model) &&
          config.endpoint === "https://api.xiaomimimo.com/v1/chat/completions"
        ? "mimo"
        : config.model === "glm-5.3-flashx" &&
            config.endpoint ===
              "https://open.bigmodel.cn/api/paas/v4/chat/completions"
          ? "glm"
          : config.model === "MiniMax-M3" &&
              config.endpoint === "https://api.minimax.cn/v1/chat/completions"
            ? "minimax"
            : keychainAccount(config);
  try {
    const file = await open(
      join(repo, "model-keys.local.json"),
      constants.O_RDONLY | constants.O_NOFOLLOW,
    );
    let raw: string;
    try {
      const stat = await file.stat();
      if (!stat.isFile() || stat.size > 65536) throw new Error("file");
      raw = await file.readFile("utf8");
    } finally {
      await file.close();
    }
    const parsed = keysSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) throw new Error("keys");
    if (account === "mimo") {
      if (!parsed.data.MIMO_API_KEY) throw new Error("keys");
      return parsed.data.MIMO_API_KEY;
    }
    if (account === "glm" || account === "minimax") {
      const credential =
        account === "glm"
          ? parsed.data.GLM_API_KEY
          : parsed.data.MINIMAX_API_KEY;
      if (!credential) throw new Error("keys");
      return credential;
    }
    return account === "deepseek"
      ? parsed.data.DEEPSEEK_API_KEY
      : parsed.data.QWEN_API_KEY;
  } catch {
    throw new Error("project-key-file-missing-or-incomplete");
  }
}
