import {
  mkdir,
  readFile,
  writeFile,
  rename,
  unlink,
  readdir,
} from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { digest, validateEndpoint, validateModel } from "../model-config";
import {
  configSchema,
  createFetchTransport,
  readUsage,
  calculateCost,
  priceSchema,
  type Transport,
} from "../provider";
import { deepseekPeriod, priceWindowCovers } from "../price-window";
import { readProjectCredential } from "../project-credentials";
import { renderQuestionScopedPack } from "../question-scoped-table";
import { wholeCaseRequest } from "../whole-case-table";
import { loadTableCandidate } from "./candidate";
import { buildTableTrialGraph } from "./workflow";
import {
  TABLE_TRIAL_VERSION,
  tableRequest,
  type TableResult,
} from "./contract";
import {
  withExplanationReview,
  type ReviewedTableReply,
} from "./reviewed-explanation-delivery";

import {
  TABLE_TIMEOUT_MS,
  tableGrantSchema,
  readTableAvailability,
  unknownAvailability,
} from "./availability";
export { TABLE_TIMEOUT_MS, tableGrantSchema } from "./availability";
async function availabilityFor(repo: string, caseId: string, now: number) {
  try {
    return await readTableAvailability(
      repo,
      await loadTableCandidate(repo),
      caseId,
      now,
    );
  } catch {
    return unknownAvailability();
  }
}
export const tableTrialRoot = (repo: string) =>
  join(repo, "artifacts", "table-local-trial");
async function json<T>(path: string): Promise<T | null> {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw e;
  }
}
async function atomic(path: string, value: unknown) {
  const tmp = `${path}.${randomUUID()}.tmp`;
  await writeFile(tmp, JSON.stringify(value, null, 2), {
    flag: "wx",
    mode: 0o600,
  });
  await rename(tmp, path);
}
async function saved(root: string, id: string) {
  const result = await json<TableResult>(join(root, "answers", `${id}.json`));
  if (result && (result.id !== id || result.version !== TABLE_TRIAL_VERSION))
    throw Error("saved-identity-mismatch");
  return result;
}
async function allSaved(root: string) {
  let files: string[];
  try {
    files = await readdir(join(root, "answers"));
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw e;
  }
  const entries = await Promise.all(
    files
      .filter((f) => /^[a-f0-9]{64}\.json$/.test(f))
      .map((f) => saved(root, f.slice(0, -5))),
  );
  return entries
    .filter((r): r is TableResult => !!r)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
export async function evaluateTableTrial(
  raw: unknown,
  deps: {
    repo: string;
    transport?: Transport;
    credential?: () => Promise<string>;
    now?: () => number;
  },
): Promise<ReviewedTableReply> {
  if (process.env.LVZHEN_ENV === "trial") throw Error("local-only");
  const req = tableRequest.parse(raw),
    root = tableTrialRoot(deps.repo);
  if (req.action === "read") {
    const result = await saved(root, req.id);
    return withExplanationReview(deps.repo, {
      result,
      availability: result
        ? await availabilityFor(
            deps.repo,
            result.case.id,
            (deps.now ?? Date.now)(),
          )
        : unknownAvailability(),
    });
  }
  if (req.action === "list") {
    const entries = await allSaved(root);
    return {
      result: null,
      availability: await availabilityFor(
        deps.repo,
        req.caseId,
        (deps.now ?? Date.now)(),
      ),
      history: entries
        .filter((r): r is TableResult => !!r && r.case.id === req.caseId)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .slice(0, 20)
        .map(({ id, createdAt, state, total, maximum }) => ({
          id,
          createdAt,
          state,
          total,
          maximum,
        })),
    };
  }
  const candidate = await loadTableCandidate(deps.repo),
    item = candidate.cases.find((c) => c.item.id === req.caseId);
  if (!item)
    return { result: null, message: "没有找到这道案例，请刷新页面后再试。" };
  const availability = await readTableAvailability(
    deps.repo,
    candidate,
    req.caseId,
    (deps.now ?? Date.now)(),
  );
  const answers = [...req.answers].sort((a, b) => a.id.localeCompare(b.id));
  const id = digest({
    version: TABLE_TRIAL_VERSION,
    identity: candidate.identity,
    caseId: req.caseId,
    answers,
  });
  const old = await saved(root, id);
  if (old)
    return withExplanationReview(deps.repo, { result: old, availability });
  // Expanding the catalogue must not silently purchase another review of an
  // unchanged submission. Return its historical result, explicitly as history;
  // this does NOT certify that an old assessment meets a newer rubric/version.
  const historical = (await allSaved(root)).find(
    (r) =>
      digest(r.case) === digest(item.item) &&
      digest(r.answers) === digest(answers),
  );
  if (historical)
    return withExplanationReview(deps.repo, {
      result: historical,
      availability,
      message:
        "已读取这份原答此前保存的评阅，保留当时的评分版本，没有重新调用模型。",
    });
  if (req.action === "lookup")
    return {
      result: null,
      availability,
      message: "这份答案尚未评阅，可先对照参考自检。",
    };
  if (availability.state !== "ready")
    return { result: null, availability, message: availability.message };
  if (!answers.some((a) => a.text.trim()))
    return { result: null, message: "先写下至少一问的答案，再提交评阅。" };
  let grant: z.infer<typeof tableGrantSchema>;
  try {
    grant = tableGrantSchema.parse(await json(join(root, "grant.json")));
  } catch {
    return { result: null, message: "本机评阅暂未开放，草稿可以继续保存。" };
  }
  const now = (deps.now ?? Date.now)();
  if (
    !grant.enabled ||
    grant.identity !== candidate.identity ||
    now < Date.parse(grant.validFrom) ||
    now + TABLE_TIMEOUT_MS >= Date.parse(grant.validUntil)
  )
    return {
      result: null,
      message: "本轮试用已到期或版本已更新，已有原答和评阅仍可查看。",
    };
  const cfg = configSchema.parse({
    endpoint: "https://api.deepseek.com/chat/completions",
    model: "deepseek-flash",
    thinking: "disabled",
    temperature: 0,
    outputTokenParameter: "max_tokens",
    maxTokens: 16384,
    timeoutMs: TABLE_TIMEOUT_MS,
  });
  validateEndpoint(cfg, validateModel(cfg));
  const period = deepseekPeriod(now),
    rates = period === "deepseek_peak" ? [2, 0.04, 8] : [1, 0.02, 4];
  const price = priceSchema.parse({
    model: cfg.model,
    sourceUrl: "https://api-docs.deepseek.com/zh-cn/quick_start/pricing/",
    checkedAt: grant.checkedAt,
    currency: "CNY",
    inputBilling: "cache_split",
    outputIncludesReasoning: true,
    inputPerMillion: rates[0],
    cacheHitPerMillion: rates[1],
    outputPerMillion: rates[2],
    billingWindow: {
      validFrom: new Date(now).toISOString(),
      validUntil: new Date(now + TABLE_TIMEOUT_MS + 1000).toISOString(),
      period,
    },
  });
  if (
    !priceWindowCovers(
      price.billingWindow!,
      cfg.model,
      now,
      now + TABLE_TIMEOUT_MS,
    )
  )
    return {
      result: null,
      message: "即将切换计价时段，请稍后提交，草稿仍保留。",
    };
  const pack = {
    ...item.pack,
    questions: item.pack.questions
      .map((q) => ({ ...q, answer: answers.find((a) => a.id === q.id)!.text }))
      .filter((q) => q.answer.trim()),
  };
  const request = wholeCaseRequest(renderQuestionScopedPack(pack), "off");
  const inputCeiling =
    Buffer.byteLength(JSON.stringify(request.messages), "utf8") + 1024;
  if (
    (inputCeiling * rates[0] + request.max_tokens * rates[2]) / 1e6 >
    grant.reservationCny
  )
    throw Error("reservation-too-small");
  await mkdir(root, { recursive: true });
  const lock = join(root, "active.lock");
  try {
    await writeFile(
      lock,
      JSON.stringify({ id, createdAt: new Date(now).toISOString() }),
      { flag: "wx", mode: 0o600 },
    );
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code !== "EEXIST") throw e;
    return {
      result: await saved(root, id),
      message: "有一份答案正在评阅，请稍后查看保存结果。",
    };
  }
  try {
    const previous = await saved(root, id);
    if (previous) return { result: previous };
    const lockedNow = (deps.now ?? Date.now)();
    const lockedAvailability = await readTableAvailability(
      deps.repo,
      candidate,
      req.caseId,
      lockedNow,
      id,
    );
    if (lockedAvailability.state !== "ready")
      return {
        result: null,
        availability: lockedAvailability,
        message: lockedAvailability.message,
      };
    // Never spend under a grant snapshot that changed while acquiring the lock.
    const lockedGrant = tableGrantSchema.safeParse(
      await json(join(root, "grant.json")),
    );
    if (!lockedGrant.success || digest(lockedGrant.data) !== digest(grant)) {
      const availability = unknownAvailability();
      return { result: null, availability, message: availability.message };
    }
    if (
      deepseekPeriod(lockedNow) !== period ||
      deepseekPeriod(lockedNow + TABLE_TIMEOUT_MS) !== period
    )
      return {
        result: null,
        availability: {
          state: "unavailable",
          reason: "price_window",
          message: "评阅计价时段已变化，请重新查看状态。",
        },
      };
    price.billingWindow = {
      validFrom: new Date(lockedNow).toISOString(),
      validUntil: new Date(lockedNow + TABLE_TIMEOUT_MS + 1000).toISOString(),
      period,
    };
    const quota = join(root, "grants", grant.id);
    await mkdir(quota, { recursive: true });
    await mkdir(join(root, "answers"), { recursive: true });
    const used = (await readdir(quota)).filter((f) =>
      f.endsWith(".intent.json"),
    ).length;
    if (used >= grant.maxCalls)
      return {
        result: null,
        message: "本轮试用次数已用完，原答和成绩仍保留。",
        availability: {
          state: "unavailable",
          reason: "quota_exhausted",
          remainingCalls: 0,
          message: "本轮评阅次数已用完，原答和已有结果仍保留。",
        },
      };
    const credential = await (
      deps.credential ?? (() => readProjectCredential(cfg, deps.repo))
    )();
    const result: TableResult = {
      id,
      version: TABLE_TRIAL_VERSION,
      identity: candidate.identity,
      createdAt: new Date(now).toISOString(),
      case: item.item,
      answers,
      state: "running",
      source:
        deps.transport?.source === "offline_fake"
          ? "offline_test"
          : "real_provider",
      assessment: null,
      total: null,
      maximum: item.pack.questions
        .flatMap((q) => q.criteria)
        .reduce((s, c) => s + c.points, 0),
      answeredMaximum: pack.questions
        .flatMap((q) => q.criteria)
        .reduce((s, c) => s + c.points, 0),
      durationMs: 0,
      costCny: null,
      failure: null,
    };
    const output = join(root, "answers", `${id}.json`);
    const intent = join(quota, `${id}.intent.json`);
    await atomic(output, result);
    await writeFile(
      intent,
      JSON.stringify({
        id,
        request,
        pack,
        price,
        inputCeiling,
        reservationCny: grant.reservationCny,
        identity: candidate.identity,
      }),
      { flag: "wx", mode: 0o600 },
    );
    let attempted = false;
    const start = performance.now();
    try {
      const graph = buildTableTrialGraph(async (wire) => {
        if (attempted || digest(wire) !== digest(request))
          throw Error("duplicate-or-wire-drift");
        attempted = true;
        let raw: Record<string, any> = {},
          failure: string | null = null,
          status: number | null = null;
        const startedAt = new Date().toISOString();
        try {
          const response = await (
            deps.transport ?? createFetchTransport(fetch)
          ).send({
            endpoint: cfg.endpoint,
            credential,
            body: JSON.stringify(wire),
            signal: AbortSignal.timeout(TABLE_TIMEOUT_MS),
          });
          status = response.status;
          if (status !== 200) failure = "http_error";
          else {
            try {
              raw = JSON.parse(response.body);
            } catch {
              failure = "invalid_response";
            }
          }
        } catch {
          failure = "transport_result_unknown";
        }
        const endedAt = new Date().toISOString();
        if (JSON.stringify(raw).includes(credential)) {
          raw = {};
          failure = "unexpected_secret";
        }
        const choice = raw.choices?.[0];
        let text =
          typeof choice?.message?.content === "string"
            ? choice.message.content
            : "";
        if (
          !failure &&
          (raw.choices?.length !== 1 ||
            !text ||
            choice.finish_reason !== "stop")
        )
          failure = "incomplete_response";
        const usage = readUsage(raw.usage),
          cost = calculateCost(usage, raw.model ?? null, price, {
            startedAt,
            endedAt,
          });
        const accountingUnknown =
          cost.amount === null ||
          cost.amount > grant.reservationCny ||
          (usage.inputTokens ?? Infinity) > inputCeiling;
        if (accountingUnknown || failure)
          await atomic(join(root, "stopped.json"), {
            id,
            reason: failure ?? "accounting_unverified",
          });
        if (failure) text = "";
        await atomic(join(quota, `${id}.response.json`), {
          id,
          status,
          actualModel: raw.model ?? null,
          responseId: raw.id ?? null,
          text,
          usage,
          cost,
          failure,
          startedAt,
          endedAt,
        });
        return {
          text,
          failure,
          durationMs: performance.now() - start,
          costCny: cost.amount,
        };
      });
      const outcome = await graph.invoke({ pack });
      result.assessment = outcome.assessment;
      result.failure =
        outcome.reply.failure ??
        (!outcome.assessment?.valid ? "invalid_table" : null);
      result.total = result.failure
        ? null
        : (outcome.assessment?.score?.total ?? null);
      result.state = result.failure ? "stopped" : "complete";
      result.costCny = outcome.reply.costCny;
      result.durationMs = performance.now() - start;
      await atomic(output, result);
      return {
        result,
        message: result.failure
          ? "本次未取得完整评阅，原答已保存，没有自动重试。"
          : undefined,
      };
    } catch {
      result.state = "stopped";
      result.failure = "incomplete_submission";
      result.durationMs = performance.now() - start;
      await atomic(join(root, "stopped.json"), { id, reason: result.failure });
      await atomic(output, result);
      return {
        result,
        message: "本次评阅中断，原答已保存。请查看保存结果，不会重复调用。",
      };
    }
  } finally {
    await unlink(lock);
  }
}
