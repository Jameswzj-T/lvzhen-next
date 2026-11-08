import {
  mkdir,
  readFile,
  writeFile,
  rename,
  unlink,
  readdir,
  stat,
} from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { join } from "node:path";
import { z } from "zod";
import { digest } from "../model-config";
import { priceWindowCovers } from "../price-window";
import { readProjectCredential } from "../project-credentials";
import type { Transport } from "../provider";
import { renderQuestionScopedPack } from "../question-scoped-table";
import { wholeCaseRequest } from "../whole-case-table";
import { buildTableTrialGraph } from "../table-trial/workflow";
import { tableTrialRoot } from "../table-trial/service";
import { loadShortCandidate } from "./catalog";
import {
  SHORT_TABLE_VERSION,
  shortRequest,
  validateShortReply,
  type ShortResult,
  type ShortReply,
  type ShortAvailability,
} from "./contract";
import { shortPracticeGrantSchema, shortPracticeRoot } from "./practice-access";
import {
  SHORT_TIMEOUT_MS,
  shortProviderPlan,
  readShortModel,
} from "./provider";
export const shortTrialRoot = (repo: string) =>
  join(repo, "artifacts", "short-table-trial");
// Newly authorized 8 CNY / 40 calls. This is independent of the old 12-call
// whole-case grant. Its existing ledger and all saved results are never reset.
export const shortGrantSchema = z
  .object({
    version: z.literal(SHORT_TABLE_VERSION),
    id: z.string().regex(/^[a-z0-9-]+$/),
    enabled: z.boolean(),
    scope: z.literal("synthetic_only"),
    identity: z.string().regex(/^[a-f0-9]{64}$/),
    parentIdentity: z.string().regex(/^[a-f0-9]{64}$/),
    exerciseIds: z.array(z.string()).min(1).max(8),
    validFrom: z.iso.datetime(),
    validUntil: z.iso.datetime(),
    checkedAt: z.iso.date(),
    maxCalls: z.number().int().min(1).max(40),
    budgetCny: z.number().positive().max(8),
    reservationCny: z.literal(0.2),
  })
  .strict()
  .refine(
    (g) =>
      g.maxCalls * g.reservationCny <= g.budgetCny &&
      new Set(g.exerciseIds).size === g.exerciseIds.length &&
      Date.parse(g.validUntil) > Date.parse(g.validFrom) &&
      Date.parse(g.validUntil) - Date.parse(g.validFrom) <= 86400000,
  );
async function json(path: string) {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw e;
  }
}
async function exists(path: string) {
  try {
    await stat(path);
    return true;
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return false;
    throw e;
  }
}
async function atomic(path: string, value: unknown) {
  const temp = `${path}.${randomUUID()}.tmp`;
  await writeFile(temp, JSON.stringify(value, null, 2), {
    flag: "wx",
    mode: 0o600,
  });
  await rename(temp, path);
}
export const shortResultId = (
  r: Pick<ShortResult, "identity" | "card" | "answer" | "purpose">,
) =>
  digest({
    version: SHORT_TABLE_VERSION,
    purpose: r.purpose,
    identity: r.identity,
    exerciseId: r.card.id,
    exerciseRevision: r.card.exerciseRevision,
    answer: r.answer,
  });
async function save(root: string, result: ShortResult) {
  await atomic(join(root, "answers", `${result.id}.json`), {
    result,
    checksum: digest(result),
  });
}
async function saved(root: string, id: string): Promise<ShortResult | null> {
  const stored = await json(join(root, "answers", `${id}.json`));
  if (!stored) return null;
  const r = stored.result as ShortResult;
  if (
    !r ||
    stored.checksum !== digest(r) ||
    r.id !== id ||
    shortResultId(r) !== id
  )
    throw Error("saved-short-identity-mismatch");
  validateShortReply(
    { result: r, canSubmit: false, message: "" },
    {
      exerciseId: r.card.id,
      exerciseRevision: r.card.exerciseRevision,
      answer: r.answer,
    },
  );
  return r;
}
async function historical(
  root: string,
  exerciseId: string,
  revision: string,
  answer: string,
) {
  let files: string[] = [];
  try {
    files = await readdir(join(root, "answers"));
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code !== "ENOENT") throw e;
  }
  for (const file of files.filter((f) => /^[a-f0-9]{64}\.json$/.test(f))) {
    const r = await saved(root, file.slice(0, -5));
    if (
      r &&
      r.card.id === exerciseId &&
      r.card.exerciseRevision === revision &&
      r.answer === answer
    )
      return r;
  }
  return null;
}
export async function evaluateShortTable(
  raw: unknown,
  deps: {
    repo: string;
    transport?: Transport;
    credential?: () => Promise<string>;
    now?: () => number;
    // Only trusted offline/CLI validation passes this; no HTTP input can set it.
    synthetic?: boolean;
  },
): Promise<ShortReply> {
  if (process.env.LVZHEN_ENV === "trial") throw Error("local-only");
  const req = shortRequest.parse(raw),
    root = shortTrialRoot(deps.repo),
    shared = tableTrialRoot(deps.repo);
  const recordRoot = deps.synthetic ? join(root, "synthetic") : root;
  const purpose = deps.synthetic
    ? ("synthetic_validation" as const)
    : ("practice" as const);
  const accessRoot = deps.synthetic ? root : shortPracticeRoot(deps.repo);
  const lock = join(shared, "active.lock");
  let availability: ShortAvailability | undefined;
  const reply = (
    message: string,
    result: ShortResult | null = null,
    canSubmit = false,
    history = false,
  ): ShortReply => ({
    message,
    result,
    canSubmit,
    historical: history,
    ...(availability ? { availability } : {}),
  });
  // Reads remain available with the gate off or current candidate changed.
  if (req.action === "read") {
    const result = await saved(recordRoot, req.id);
    return validateShortReply(
      reply(
        result ? "已读取原评阅，没有重新调用。" : "未找到保存的评阅。",
        result,
        false,
        true,
      ),
      req,
    );
  }
  const old = await historical(
    recordRoot,
    req.exerciseId,
    req.exerciseRevision,
    req.answer,
  );
  if (old)
    return reply(
      "已读取这份原答保存的评阅，没有重新调用模型。",
      old,
      false,
      true,
    );
  const candidate = await loadShortCandidate(deps.repo),
    card = candidate.cards.find((c) => c.summary.id === req.exerciseId);
  if (!card || card.summary.exerciseRevision !== req.exerciseRevision)
    throw Error("short-question-version-mismatch");
  if (!req.answer.trim())
    return reply("先写下判断和理由，原答不会被自动补全。");
  const id = shortResultId({
    identity: candidate.identity,
    purpose,
    card: card.summary,
    answer: req.answer,
  });
  const blocked = (
    reason: NonNullable<ShortAvailability["reason"]>,
    message: string,
    state: ShortAvailability["state"] = "unavailable",
  ) => {
    availability = { state, reason, message };
    return null;
  };
  const callsFor = (grant: { id: string }) =>
    deps.synthetic ? join(root, "calls") : join(accessRoot, "grants", grant.id);
  const eligible = async (ownedLockId?: string) => {
    try {
      // A new practice grant never bypasses an existing pause. Recovery and
      // paid transmission require a separate decision; old evidence stays put.
      if (
        (await exists(join(shared, "stopped.json"))) ||
        (await exists(join(root, "stopped.json"))) ||
        (!deps.synthetic && (await exists(join(accessRoot, "stopped.json"))))
      )
        return blocked(
          "stopped",
          "AI评阅已暂停；原答已保存，可对照参考，已有评阅仍可查看。",
          "paused",
        );
      const parsed = deps.synthetic
        ? shortGrantSchema.safeParse(await json(join(root, "grant.json")))
        : shortPracticeGrantSchema.safeParse(
            await json(join(accessRoot, "grant.json")),
          );
      if (!parsed.success)
        return blocked(
          "practice_not_authorized",
          "本题已有AI评阅接线，真人试用尚未开放；可先保存原答并对照参考。",
        );
      const grant = parsed.data,
        now = (deps.now ?? Date.now)();
      if (!grant.enabled)
        return blocked("disabled", "本轮AI评阅未开放；原答与已有评阅保留。");
      if (
        grant.identity !== candidate.identity ||
        grant.parentIdentity !== candidate.parentIdentity ||
        !grant.exerciseIds.every((id) =>
          candidate.cards.some((c) => c.summary.id === id),
        )
      )
        return blocked(
          "version_changed",
          "题目或评阅版本已更新，本轮试用尚未开放；旧结果按原版本保留。",
        );
      if (!grant.exerciseIds.includes(req.exerciseId))
        return blocked(
          "exercise_disabled",
          "本题不在当前AI试用范围内；原答已保存，可对照参考。",
        );
      if (now < Date.parse(grant.validFrom))
        return blocked("not_started", "本轮AI评阅尚未开始；原答已保存。");
      if (now + SHORT_TIMEOUT_MS >= Date.parse(grant.validUntil))
        return blocked("expired", "本轮AI试用已到期；原答与已有评阅仍保留。");
      const currentLock = await json(lock);
      if (ownedLockId && currentLock?.id !== ownedLockId)
        return blocked(
          "read_error",
          "暂未确认评阅状态，不发起新请求；请读取已有结果。",
          "unknown",
        );
      if (!ownedLockId && currentLock)
        return blocked(
          "busy",
          "已有一份评阅未结束，请稍后读取结果，不重复提交。",
          "paused",
        );
      const files = await readdir(callsFor(grant)).catch(
        (e: NodeJS.ErrnoException) => {
          if (e.code === "ENOENT") return [];
          throw e;
        },
      );
      // Synthetic intents retain their existing cumulative 40-call ledger.
      // Each separately approved practice window owns its own bounded ledger.
      const remainingCalls = Math.max(
        0,
        grant.maxCalls -
          files.filter(
            (f) =>
              f.endsWith(".intent.json") && f !== `${ownedLockId}.intent.json`,
          ).length,
      );
      if (!remainingCalls)
        return blocked(
          "quota_exhausted",
          "本轮AI试用额度已用完；原答与已有结果仍保留。",
        );
      availability = {
        state: "ready",
        remainingCalls,
        message:
          "本题可提交AI评阅；只评这份已保存原答，训练分不代表正式考试得分。",
      };
      return grant;
    } catch {
      return blocked(
        "read_error",
        "暂未确认AI评阅状态，不发起新请求；原答已保存。",
        "unknown",
      );
    }
  };
  const grant = await eligible();
  if (!grant) return reply(availability!.message);
  if (req.action === "lookup")
    return reply(
      "按本题三个要点评阅这份原答，训练分不代表正式考试得分。",
      null,
      true,
    );
  if (!deps.synthetic && req.transmissionConsent !== true) {
    blocked(
      "consent_required",
      "请先确认发送这份原答，再主动点击评阅；不会自动发送。",
    );
    return reply(availability!.message);
  }
  const callsRoot = callsFor(grant);
  const pack = {
    ...card.pack,
    questions: [{ ...card.pack.questions[0], answer: req.answer }],
  };
  const request = wholeCaseRequest(renderQuestionScopedPack(pack), "off");
  let plan = shortProviderPlan(
    (deps.now ?? Date.now)(),
    grant.checkedAt,
    request,
  );
  if (plan.reservation > grant.reservationCny)
    throw Error("short-reservation-too-small");
  await mkdir(shared, { recursive: true });
  await mkdir(join(recordRoot, "answers"), { recursive: true });
  await mkdir(callsRoot, { recursive: true });
  try {
    await writeFile(lock, JSON.stringify({ kind: SHORT_TABLE_VERSION, id }), {
      flag: "wx",
      mode: 0o600,
    });
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code !== "EEXIST") throw e;
    blocked(
      "busy",
      "有一份答案正在评阅，请稍后读取结果，不会重复提交。",
      "paused",
    );
    return reply(
      "有一份答案正在评阅，请稍后读取结果，不会重复提交。",
      await saved(recordRoot, id),
    );
  }
  try {
    const previous = await historical(
      recordRoot,
      req.exerciseId,
      req.exerciseRevision,
      req.answer,
    );
    if (previous)
      return reply("已读取保存结果，没有重新调用。", previous, false, true);
    const lockedGrant = await eligible(id);
    if (
      !lockedGrant ||
      digest(lockedGrant) !== digest(grant) ||
      (await loadShortCandidate(deps.repo)).identity !== candidate.identity
    )
      return reply("本轮评阅已暂停，原答保留。");
    if (await json(join(callsRoot, `${id}.intent.json`)))
      return reply("本次请求已登记但结果待核，不能重复调用。");
    const credential = await (
      deps.credential ?? (() => readProjectCredential(plan.config, deps.repo))
    )();
    // Rebuild the price window AFTER any credential/storage delay.
    const readyGrant = await eligible(id);
    if (!readyGrant || digest(readyGrant) !== digest(grant))
      return reply("本轮评阅已暂停，原答保留。");
    plan = shortProviderPlan(
      (deps.now ?? Date.now)(),
      grant.checkedAt,
      request,
    );
    if (plan.reservation > grant.reservationCny)
      throw Error("short-reservation-too-small");
    const result: ShortResult = {
      version: SHORT_TABLE_VERSION,
      id,
      identity: candidate.identity,
      card: card.summary,
      answer: req.answer,
      createdAt: new Date((deps.now ?? Date.now)()).toISOString(),
      state: "running",
      purpose,
      source:
        deps.transport?.source === "offline_fake"
          ? "offline_test"
          : "real_provider",
      assessment: null,
      total: null,
      failure: null,
      costCny: null,
      durationMs: 0,
    };
    await save(recordRoot, result);
    const start = performance.now();
    try {
      await writeFile(
        join(callsRoot, `${id}.intent.json`),
        JSON.stringify({
          id,
          grantId: grant.id,
          grantHash: digest(grant),
          ...(grant.scope === "practice_answers"
            ? { approvalRef: grant.approvalRef }
            : {}),
          identity: candidate.identity,
          provider: "deepseek",
          model: plan.config.model,
          request,
          pack,
          price: plan.price,
          inputCeiling: plan.inputCeiling,
          reservationCny: grant.reservationCny,
          worstCaseCny: plan.reservation,
        }),
        { flag: "wx", mode: 0o600 },
      );
      let attempted = false;
      const graph = buildTableTrialGraph(async (wire) => {
        if (attempted || digest(wire) !== digest(request))
          throw Error("duplicate-or-wire-drift");
        const sendGrant = await eligible(id);
        const sendAt = (deps.now ?? Date.now)();
        if (
          !sendGrant ||
          digest(sendGrant) !== digest(grant) ||
          !sendGrant.enabled ||
          sendAt < Date.parse(grant.validFrom) ||
          sendAt + SHORT_TIMEOUT_MS >= Date.parse(grant.validUntil) ||
          !priceWindowCovers(
            plan.price.billingWindow!,
            plan.config.model,
            sendAt,
            sendAt + SHORT_TIMEOUT_MS,
          )
        )
          throw Error("pre-send-authorization-or-price-changed");
        attempted = true;
        const model = await readShortModel(
          wire,
          plan,
          credential,
          deps.transport,
        );
        await atomic(join(callsRoot, `${id}.response.json`), {
          id,
          ...model.receipt,
        });
        if (model.failure) {
          await atomic(join(accessRoot, "stopped.json"), {
            id,
            reason: model.failure,
          });
          await atomic(join(shared, "stopped.json"), {
            id,
            kind: SHORT_TABLE_VERSION,
            reason: model.failure,
          });
        }
        return model;
      });
      const outcome = await graph.invoke({ pack });
      result.assessment = outcome.assessment;
      result.failure =
        outcome.reply.failure ??
        (!outcome.assessment?.valid ? "invalid_table" : null);
      if (result.failure)
        await atomic(join(accessRoot, "stopped.json"), {
          id,
          reason: result.failure,
        });
      result.total = result.failure
        ? null
        : (outcome.assessment?.score?.total ?? null);
      result.state = result.failure ? "stopped" : "complete";
      result.costCny = outcome.reply.costCny;
      result.durationMs = performance.now() - start;
      await save(recordRoot, result);
      return reply(
        result.failure
          ? "本次未取得完整评阅，原答已保存，没有自动重试。"
          : "评阅已保存；待核对不等于答错。",
        result,
      );
    } catch {
      result.state = "stopped";
      result.failure = "incomplete_submission";
      result.total = null;
      result.durationMs = performance.now() - start;
      await atomic(join(accessRoot, "stopped.json"), {
        id,
        reason: result.failure,
      });
      await atomic(join(shared, "stopped.json"), {
        id,
        kind: SHORT_TABLE_VERSION,
        reason: result.failure,
      });
      await save(recordRoot, result);
      return reply(
        "评阅中断，原答已保存；只读取已有结果，不会自动重试。",
        result,
      );
    }
  } finally {
    if ((await json(lock))?.id === id) await unlink(lock);
  }
}
