import { createHash } from "node:crypto";
import { readFile, lstat, access } from "node:fs/promises";
import { constants } from "node:fs";
import { resolve, join } from "node:path";
import { z } from "zod";
import {
  validateModel,
  evaluationLimits,
  validateEndpoint,
  releaseIdentity,
} from "./model-config";
import { priceWindowCovers } from "./price-window";
import { validateBatch, runBatch } from "./batch";
import { createBatchFileSink } from "./batch-files";
import {
  createFetchTransport,
  type Transport,
  type ProviderConfig,
} from "./provider";

const settingsSchema = z
  .object({
    plan: z.unknown(),
    qwen: z
      .object({
        region: z.literal("cn-beijing"),
        workspaceId: z.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9-]{0,62}$/),
      })
      .strict(),
  })
  .strict();
export const hash = (value: string | Buffer) =>
  createHash("sha256").update(value).digest("hex");
export async function preflight(
  inputPath: string,
  settingsPath: string,
  output: string,
) {
  const inputBytes = await readFile(inputPath);
  const settingsBytes = await readFile(settingsPath);
  const settings = settingsSchema.parse(JSON.parse(settingsBytes.toString()));
  const { input, plan } = validateBatch(
    JSON.parse(inputBytes.toString()),
    settings.plan,
  );
  if (plan.mode !== "real") throw new Error("real-plan-required");
  if (
    input.samples.length * plan.models.length > plan.maxTotalCalls ||
    plan.models.some((m) => m.maxCalls < input.samples.length)
  )
    throw new Error("incomplete-call-scope");
  for (const m of plan.models) {
    const profile = validateModel(m.config);
    validateEndpoint(m.config, profile, settings.qwen);
    if (m.config.maxTokens > evaluationLimits(m.config).maxTokens)
      throw new Error("endpoint-or-output-bound");
    const p = m.price;
    if (
      !p ||
      p.model !== m.config.model ||
      p.currency !== "CNY" ||
      plan.budget.currency !== "CNY" ||
      !profile.priceSources.includes(p.sourceUrl.replace(/\/$/, "")) ||
      p.inputPerMillion <= 0 ||
      p.outputPerMillion <= 0
    )
      throw new Error("pricing-unavailable");
    if (
      !p.billingWindow ||
      !priceWindowCovers(
        p.billingWindow,
        p.model,
        Date.now(),
        Date.now() + m.config.timeoutMs,
      )
    )
      throw new Error("price-window-unavailable");
    const age = Date.now() - Date.parse(p.checkedAt);
    if (age < -86400000 || age > 7 * 86400000)
      throw new Error("refresh-price-evidence");
    // Full provider context ceiling, not a character-count token estimate.
    const bound =
      (profile.contextCeiling *
        Math.max(p.inputPerMillion, p.cacheHitPerMillion ?? 0) +
        (m.config.maxTokens + profile.outputMargin) * p.outputPerMillion) /
      1_000_000;
    if (
      plan.budget.estimates
        .filter((e) => e.model === m.config.model)
        .some(
          (e) =>
            e.maxCost < bound ||
            e.basis !== "full-context-ceiling-1048576-plus-output",
        )
    )
      throw new Error("unproven-cost-bound");
  }
  if (
    plan.budget.estimates.reduce((sum, e) => sum + e.maxCost, 0) >
    plan.budget.limit
  )
    throw new Error("whole-batch-budget");
  const outputRoot = resolve(output),
    target = join(outputRoot, plan.runId);
  try {
    await lstat(target);
    throw new Error("output-exists");
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code !== "ENOENT") throw e;
  }
  // Existing writable parent required: no output side effects in plan mode.
  const parent = await lstat(outputRoot);
  if (!parent.isDirectory() || parent.isSymbolicLink())
    throw new Error("output-root");
  await access(outputRoot, constants.W_OK);
  const binding = {
    inputSha256: hash(inputBytes),
    settingsSha256: hash(settingsBytes),
    outputRoot,
    releases: plan.models.map((m) => releaseIdentity(m.config, m.price)),
    input,
    plan,
  };
  return { ...binding, confirmationHash: hash(JSON.stringify(binding)) };
}
export type EntryDeps = {
  isInteractive: () => boolean;
  readHidden: (label: string) => Promise<string>;
  readStored?: (config: ProviderConfig) => Promise<string>;
  readPrivate?: (config: ProviderConfig) => Promise<string>;
  readProject?: (config: ProviderConfig) => Promise<string>;
  transport: () => Transport;
};
export async function executeEntry(
  args: {
    mode?: string;
    input: string;
    settings: string;
    output: string;
    confirm?: string;
    credentials?: "interactive" | "keychain" | "private-file" | "project-file";
  },
  deps: EntryDeps,
) {
  if (
    args.mode !== undefined &&
    !["plan", "preflight", "run"].includes(args.mode)
  )
    throw new Error("mode");
  if (
    args.credentials !== undefined &&
    !["interactive", "keychain", "private-file", "project-file"].includes(
      args.credentials,
    )
  )
    throw new Error("credential-mode");
  const checked = await preflight(args.input, args.settings, args.output);
  if (args.mode !== "run") return checked;
  const stored =
    args.credentials === "keychain" ||
    args.credentials === "private-file" ||
    args.credentials === "project-file";
  const readStored =
    args.credentials === "project-file"
      ? deps.readProject
      : args.credentials === "private-file"
        ? deps.readPrivate
        : deps.readStored;
  if (
    (stored ? !readStored : !deps.isInteractive()) ||
    args.confirm !== checked.confirmationHash
  )
    throw new Error("interactive-hash-confirmation-required");
  const credentials: Record<string, string> = {};
  const controller = new AbortController();
  const onAbort = () => controller.abort();
  process.once("SIGINT", onAbort);
  process.once("SIGTERM", onAbort);
  try {
    for (const m of checked.plan.models) {
      const token = stored
        ? await readStored!(m.config)
        : await deps.readHidden(
            `${m.config.model} dedicated Key (hidden; Ctrl-C cancels): `,
          );
      if (!token.trim() || /[\x00-\x20\x7f]/.test(token))
        throw new Error("credential-cancelled");
      if (controller.signal.aborted) throw new Error("aborted");
      credentials[m.config.model] = token;
    }
    const current = await preflight(args.input, args.settings, args.output);
    if (current.confirmationHash !== checked.confirmationHash)
      throw new Error("input-plan-drift");
    const sink = createBatchFileSink(checked.outputRoot, checked.inputSha256);
    // Scrub all acquired exact credentials from any persisted record, even cross-provider echoes.
    const safeSink = {
      begin: sink.begin,
      write: async (name: string, value: unknown) => {
        let serialized = JSON.stringify(value);
        for (const token of Object.values(credentials))
          serialized = serialized
            .split(JSON.stringify(token).slice(1, -1))
            .join("[REDACTED]");
        await sink.write(name, JSON.parse(serialized));
      },
    };
    const result = await runBatch(checked.input, checked.plan, {
      signal: controller.signal,
      credentials,
      allowRealCall: true,
      transports: Object.fromEntries(
        checked.plan.models.map((m) => [m.config.model, deps.transport()]),
      ),
      sink: safeSink,
    });
    let serialized = JSON.stringify(result);
    for (const token of Object.values(credentials))
      serialized = serialized
        .split(JSON.stringify(token).slice(1, -1))
        .join("[REDACTED]");
    return JSON.parse(serialized) as typeof result;
  } finally {
    process.removeListener("SIGINT", onAbort);
    process.removeListener("SIGTERM", onAbort);
    for (const key of Object.keys(credentials)) delete credentials[key];
  }
}
export function readHidden(
  input: NodeJS.ReadStream = process.stdin,
  output: NodeJS.WriteStream = process.stdout,
): Promise<string> {
  if (!input.isTTY || !output.isTTY)
    return Promise.reject(new Error("interactive-required"));
  return new Promise((resolveValue, reject) => {
    const oldRaw = input.isRaw;
    const wasPaused = input.isPaused();
    let value = "",
      done = false;
    const finish = (ok: boolean) => {
      if (done) return;
      done = true;
      let restored = true;
      try {
        input.setRawMode(oldRaw);
        if (wasPaused) input.pause();
        else input.resume();
      } catch {
        restored = false;
      }
      input.removeListener("data", data);
      input.removeListener("end", cancel);
      input.removeListener("close", cancel);
      input.removeListener("error", cancel);
      process.removeListener("SIGINT", cancel);
      process.removeListener("SIGTERM", cancel);
      try {
        output.write("\n");
      } catch {
        restored = false;
      }
      if (ok && restored) resolveValue(value);
      else reject(new Error("credential-cancelled"));
      value = "";
    };
    const cancel = () => finish(false);
    const data = (chunk: Buffer) => {
      for (const c of chunk.toString()) {
        if (c === "\u0003" || c === "\u0004" || c === "\u001b")
          return finish(false);
        if (c === "\r" || c === "\n") return finish(true);
        if (c === "\u007f") value = value.slice(0, -1);
        else value += c;
      }
    };
    input.on("data", data);
    input.once("end", cancel);
    input.once("close", cancel);
    input.once("error", cancel);
    process.once("SIGINT", cancel);
    process.once("SIGTERM", cancel);
    try {
      input.setRawMode(true);
      input.resume();
    } catch {
      finish(false);
    }
  });
}
export const actualDeps: EntryDeps = {
  isInteractive: () => Boolean(process.stdin.isTTY && process.stdout.isTTY),
  readHidden: async (label) => {
    process.stdout.write(label);
    return readHidden();
  },
  transport: () => createFetchTransport(fetch),
};
