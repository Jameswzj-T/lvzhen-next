import { readFile, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { z } from "zod";
import { TABLE_TRIAL_VERSION, type TableAvailability } from "./contract";
import { deepseekPeriod } from "../price-window";

export const TABLE_TIMEOUT_MS = 30_000;
export const tableGrantSchema = z
  .object({
    enabled: z.boolean(),
    id: z.string().regex(/^[a-z0-9-]+$/),
    version: z.literal(TABLE_TRIAL_VERSION),
    identity: z.string().regex(/^[a-f0-9]{64}$/),
    validFrom: z.iso.datetime(),
    validUntil: z.iso.datetime(),
    checkedAt: z.iso.date(),
    maxCalls: z.number().int().min(1).max(12),
    reservationCny: z.literal(0.3),
    budgetCny: z.number().positive().max(4),
  })
  .strict()
  .refine(
    (g) =>
      g.maxCalls * g.reservationCny <= g.budgetCny &&
      Date.parse(g.validUntil) > Date.parse(g.validFrom) &&
      Date.parse(g.validUntil) - Date.parse(g.validFrom) <= 86400000,
  );

export const unknownAvailability = (): TableAvailability => ({
  state: "unknown",
  reason: "read_error",
  message: "暂未确认评阅是否开放；原答和已有评阅仍可查看，不会发起新评阅。",
});
const missing = Symbol("missing");
async function exists(path: string) {
  try {
    await stat(path);
    return true;
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return false;
    throw e;
  }
}
async function json(path: string): Promise<unknown> {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return missing;
    throw e;
  }
}
// Read-only preflight. No directory creation, credential access, lock acquisition
// or provider request. The submission path still checks again under its lock.
export async function readTableAvailability(
  repo: string,
  candidate: { identity: string; archivedIds: string[] },
  caseId: string,
  now = Date.now(),
  ownedLockId?: string,
): Promise<TableAvailability> {
  const root = join(repo, "artifacts", "table-local-trial");
  try {
    if (await exists(join(root, "stopped.json")))
      return {
        state: "paused",
        reason: "stopped",
        message:
          "实时评阅已暂停。可先保存原答并对照参考自检；已有评阅仍可查看。",
      };
    if (candidate.archivedIds.includes(caseId))
      return {
        state: "unavailable",
        reason: "archived",
        message: "这份评分契约已归档，只读取原有评阅，不按新版重判旧答。",
      };
    const raw = await json(join(root, "grant.json"));
    if (raw === missing)
      return {
        state: "unavailable",
        reason: "no_grant",
        message: "实时评阅暂未开放，可保存原答并对照参考自检。",
      };
    const parsed = tableGrantSchema.safeParse(raw);
    if (!parsed.success) return unknownAvailability();
    const grant = parsed.data;
    if (!grant.enabled)
      return {
        state: "unavailable",
        reason: "disabled",
        message: "实时评阅暂未开放；原答和已有评阅仍保留。",
      };
    if (grant.identity !== candidate.identity)
      return {
        state: "unavailable",
        reason: "version_changed",
        message:
          "题目或评阅版本已更新，本轮实时评阅未开放；旧结果按原版本保留。",
      };
    if (now < Date.parse(grant.validFrom))
      return {
        state: "unavailable",
        reason: "not_started",
        message: "本轮实时评阅尚未开放，可先保存作答。",
      };
    if (now + TABLE_TIMEOUT_MS >= Date.parse(grant.validUntil))
      return {
        state: "unavailable",
        reason: "expired",
        message: "本轮实时评阅已到期；已有原答和评阅仍可查看。",
      };
    const lockPresent = await exists(join(root, "active.lock"));
    if (
      ownedLockId &&
      (!lockPresent ||
        ((await json(join(root, "active.lock"))) as { id?: string })?.id !==
          ownedLockId)
    )
      return unknownAvailability();
    if (lockPresent && !ownedLockId)
      return {
        state: "paused",
        reason: "busy",
        message: "当前有评阅尚未结束，请先查看已有结果，不重复提交。",
      };
    let used = 0;
    try {
      used = (await readdir(join(root, "grants", grant.id))).filter((f) =>
        f.endsWith(".intent.json"),
      ).length;
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== "ENOENT") throw e;
    }
    const remainingCalls = Math.max(0, grant.maxCalls - used);
    if (!remainingCalls)
      return {
        state: "unavailable",
        reason: "quota_exhausted",
        remainingCalls,
        message: "本轮评阅次数已用完；原答和已有评阅仍保留。",
      };
    if (deepseekPeriod(now) !== deepseekPeriod(now + TABLE_TIMEOUT_MS))
      return {
        state: "unavailable",
        reason: "price_window",
        message: "评阅服务正在切换计价时段，请稍后查看状态，原答仍保留。",
      };
    return {
      state: "ready",
      remainingCalls,
      message:
        "实时评阅当前已开放，可在本轮授权范围内提交；查看已有结果不会重新评阅。",
    };
  } catch {
    return unknownAvailability();
  }
}
