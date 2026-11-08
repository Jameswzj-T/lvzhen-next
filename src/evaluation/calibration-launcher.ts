import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { z } from "zod";
import { deepseekPeriod } from "./price-window";
import { validateModel } from "./model-config";
import { validateBatch, type BatchInput } from "./batch";
import { executeEntry, hash, preflight, type EntryDeps } from "./pilot-entry";
import { formatCalibrationReport } from "./calibration-report";

const frozenInputHash =
  "35f14482e95042186586bab5caac56aaa02145623d6b6ccbd14196feeb5c77ae";
const rates = z.object({
  inputPerMillion: z.number().positive(),
  outputPerMillion: z.number().positive(),
  cacheHitPerMillion: z.number().nonnegative(),
});
const snapshotSchema = z.object({
  checkedAt: z.iso.date(),
  validFrom: z.iso.datetime({ offset: true }),
  validUntil: z.iso.datetime({ offset: true }),
  deepseek: z.object({ sourceUrl: z.url(), peak: rates, offPeak: rates }),
  qwenBeijing: rates.extend({ sourceUrl: z.url() }),
});

/** Public setup only. This function never reads credentials or creates a transport. */
export async function prepareCalibration(
  repo: string,
  workspace: { region: string; workspaceId: string },
  artifacts = join(repo, "artifacts"),
  now = Date.now(),
) {
  if (workspace.region !== "cn-beijing") throw new Error("unsupported-region");
  if (
    !/^[a-zA-Z0-9][a-zA-Z0-9-]{0,62}$/.test(workspace.workspaceId) ||
    workspace.workspaceId === "REPLACE-WORKSPACE"
  )
    throw new Error("invalid-workspace");
  const source = await readFile(
    join(repo, "evals/fault/pilot-004/inputs.json"),
  );
  if (hash(source) !== frozenInputHash) throw new Error("frozen-input-changed");
  const all = JSON.parse(source.toString()) as BatchInput;
  const input = {
    ...all,
    samples: all.samples.filter((s) => s.group === "calibration"),
  };
  if (input.samples.length !== 4) throw new Error("calibration-scope");
  const directory = join(repo, "checks/dual-model-pilot");
  const snapshot = snapshotSchema.parse(
    JSON.parse(await readFile(join(directory, "prices.json"), "utf8")),
  );
  const expiry = Date.parse(snapshot.validUntil);
  if (
    !Number.isFinite(now) ||
    now < Date.parse(snapshot.validFrom) ||
    now >= expiry
  )
    throw new Error("refresh-price-snapshot");
  const period = deepseekPeriod(now);
  // Stop at the next tariff change, snapshot expiry, or 24 hours.
  const hour = 3600000;
  let until = Math.min(expiry, now + 24 * hour);
  for (let at = Math.floor(now / hour) * hour + hour; at < until; at += hour) {
    if (deepseekPeriod(at) !== period) {
      until = at;
      break;
    }
  }
  // Allow eight sequential 20-second requests, file writes, and time to enter Keys.
  if (until - now <= 5 * 60 * 1000) throw new Error("price-window-too-short");
  const template = JSON.parse(
    await readFile(
      join(directory, "calibration-settings.template.json"),
      "utf8",
    ),
  );
  const plan = template.plan;
  plan.runId = "calibration";
  plan.models[1].config.endpoint = `https://${workspace.workspaceId}.cn-beijing.maas.aliyuncs.com/compatible-mode/v1/chat/completions`;
  for (const entry of plan.models) {
    const isDeepseek = entry.config.model === "deepseek-v4-flash";
    const modelRates = isDeepseek
      ? snapshot.deepseek[period === "deepseek_peak" ? "peak" : "offPeak"]
      : snapshot.qwenBeijing;
    entry.price = {
      ...modelRates,
      sourceUrl: isDeepseek
        ? snapshot.deepseek.sourceUrl
        : snapshot.qwenBeijing.sourceUrl,
      checkedAt: snapshot.checkedAt,
      model: entry.config.model,
      currency: "CNY",
      outputIncludesReasoning: true,
      inputBilling: "cache_split",
      billingWindow: {
        validFrom: new Date(now).toISOString(),
        validUntil: new Date(until).toISOString(),
        period: isDeepseek ? period : "fixed",
      },
    };
  }
  plan.budget.estimates = plan.models.flatMap(
    (entry: {
      config: Parameters<typeof validateModel>[0];
      price: z.infer<typeof rates>;
    }) => {
      const profile = validateModel(entry.config);
      const bound =
        (profile.contextCeiling *
          Math.max(
            entry.price.inputPerMillion,
            entry.price.cacheHitPerMillion,
          ) +
          (entry.config.maxTokens + profile.outputMargin) *
            entry.price.outputPerMillion) /
        1_000_000;
      return input.samples.map((sample) => ({
        model: entry.config.model,
        sampleId: sample.sampleId,
        maxCost: Math.ceil(bound * 1_000_000) / 1_000_000,
        basis: "full-context-ceiling-1048576-plus-output",
      }));
    },
  );
  plan.budget.limit = Math.ceil(
    plan.budget.estimates.reduce(
      (sum: number, e: { maxCost: number }) => sum + e.maxCost,
      0,
    ),
  );
  const checked = validateBatch(input, plan);
  if (
    checked.plan.maxTotalCalls !== 8 ||
    checked.plan.models.length !== 2 ||
    checked.plan.models[0].config.model !== "deepseek-v4-flash" ||
    checked.plan.models[1].config.model !== "qwen3.8-flash" ||
    checked.plan.models.some(
      (m) => m.maxCalls !== 4 || m.config.timeoutMs !== 20000,
    )
  )
    throw new Error("calibration-scope");
  await mkdir(artifacts, { recursive: true });
  const output = await mkdtemp(join(artifacts, "dual-calibration-"));
  const args = {
    input: join(output, "inputs.json"),
    settings: join(output, "settings.json"),
    output,
  };
  const save = (path: string, data: unknown) =>
    writeFile(path, JSON.stringify(data, null, 2) + "\n", { flag: "wx" });
  await save(args.input, checked.input);
  await save(args.settings, { plan: checked.plan, qwen: workspace });
  const binding = await preflight(args.input, args.settings, output);
  await save(join(output, "plan.json"), binding);
  return { args, binding };
}

export async function launchCalibration(
  repo: string,
  ui: {
    ask: (question: string) => Promise<string>;
    show: (text: string) => void;
  },
  deps: EntryDeps,
  artifacts?: string,
) {
  if (!deps.isInteractive()) throw new Error("interactive-required");
  const region = (
    await ui.ask(
      "千问 Key 的地域（当前支持北京，请输入 cn-beijing；其他地域请退出）： ",
    )
  ).trim();
  if (region !== "cn-beijing") throw new Error("unsupported-region");
  const workspaceId = (await ui.ask("千问业务空间 ID（不是 Key）： ")).trim();
  const { args, binding } = await prepareCalibration(
    repo,
    { region, workspaceId },
    artifacts,
  );
  ui.show(
    [
      "本次：DeepSeek V4 Flash + Qwen3.8 Flash，各 4 份校准答案，共最多 8 次请求；关闭思考，每次最多 20 秒。",
      "不自动运行留出测试，不自动重试。结果使用官方公开费率计算，账户优惠及最终账单需另核对。",
      `保守费用预留上限：${binding.plan.budget.limit} 元（按最大上下文计算，不是实际预估费用或预收费）。`,
      `本次价格有效至：${binding.plan.models[0].price?.billingWindow?.validUntil}（UTC）。`,
      `公共配置、题目和价格：${args.output}`,
      `本次配置确认码：${binding.confirmationHash}`,
      "下一步会隐藏输入两家 Key；不要把 Key 放在命令、聊天或公共配置里。",
    ].join("\n"),
  );
  if (
    (
      await ui.ask("确认上述范围并开始付费请求，请输入 RUN；其他输入退出： ")
    ).trim() !== "RUN"
  )
    return { status: "cancelled" as const, output: args.output };
  const result = await executeEntry(
    { ...args, mode: "run", confirm: binding.confirmationHash },
    deps,
  );
  if (!("summary" in result)) throw new Error("missing-batch-result");
  return {
    status: "finished" as const,
    output: join(args.output, binding.plan.runId),
    result,
    report: formatCalibrationReport(result, binding.plan),
  };
}
