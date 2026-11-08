import { execFile, spawn } from "node:child_process";
import type { ProviderConfig } from "./provider";
import { modelProfile } from "./model-config";

export const KEYCHAIN_SERVICE = "com.lvzhen.bar-next.evaluation";
export function keychainAccount(config: ProviderConfig) {
  const profile = modelProfile(config.model);
  if (
    profile.adapter === "deepseek-chat" &&
    config.endpoint === "https://api.deepseek.com/chat/completions"
  )
    return "deepseek";
  const match =
    /^https:\/\/([a-zA-Z0-9][a-zA-Z0-9-]{0,62})\.cn-beijing\.maas\.aliyuncs\.com\/compatible-mode\/v1\/chat\/completions$/.exec(
      config.endpoint,
    );
  if (profile.adapter === "qwen-chat" && match)
    return `qwen-cn-beijing:${match[1]}`;
  throw new Error("keychain-provider-not-supported");
}

export type KeychainIO = {
  platform: string;
  read: (args: string[]) => Promise<string>;
  saveInteractive: (args: string[]) => Promise<void>;
};
export const nativeKeychainIO: KeychainIO = {
  platform: process.platform,
  read: (args) =>
    new Promise((resolve, reject) => {
      execFile(
        "/usr/bin/security",
        args,
        { encoding: "utf8", maxBuffer: 8192, timeout: 30_000 },
        (error, stdout) => {
          // Never forward child errors: they may contain stdout or stderr.
          if (error) reject(new Error("keychain-unavailable"));
          else resolve(stdout);
        },
      );
    }),
  saveInteractive: (args) =>
    new Promise((resolve, reject) => {
      // -w MUST be last. macOS prompts for the secret directly, without passing it
      // in argv, reading it in Node, or writing it to a project file.
      const child = spawn("/usr/bin/security", args, { stdio: "inherit" });
      child.once("error", () => reject(new Error("keychain-save-failed")));
      child.once("exit", (code) =>
        code === 0 ? resolve() : reject(new Error("keychain-save-failed")),
      );
    }),
};
export async function readStoredCredential(
  config: ProviderConfig,
  io = nativeKeychainIO,
) {
  if (io.platform !== "darwin") throw new Error("keychain-macos-required");
  const account = keychainAccount(config);
  let token: string;
  try {
    token = (
      await io.read([
        "find-generic-password",
        "-s",
        KEYCHAIN_SERVICE,
        "-a",
        account,
        "-w",
      ])
    ).replace(/\r?\n$/, "");
  } catch {
    throw new Error("keychain-unavailable");
  }
  if (!token || /[\x00-\x20\x7f]/.test(token))
    throw new Error("keychain-invalid-credential");
  return token;
}
export async function saveStoredCredential(
  config: ProviderConfig,
  interactive: boolean,
  io = nativeKeychainIO,
) {
  if (io.platform !== "darwin" || !interactive)
    throw new Error("keychain-interactive-setup-required");
  const account = keychainAccount(config);
  try {
    await io.saveInteractive([
      "add-generic-password",
      "-U",
      "-s",
      KEYCHAIN_SERVICE,
      "-a",
      account,
      "-T",
      "/usr/bin/security",
      "-w",
    ]);
  } catch {
    throw new Error("keychain-save-failed");
  }
}
