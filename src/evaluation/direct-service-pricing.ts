import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { z } from "zod";
import type { UnitDirectPolicy } from "./unit-feedback-direct-policy";
import { unitDigest } from "./unit-feedback-storage";

export const DEEPSEEK_PRICING_URL =
  "https://api-docs.deepseek.com/zh-cn/quick_start/pricing/";
const DAY = 24 * 60 * 60 * 1000;
const fresh = (at: string) =>
  Date.now() >= Date.parse(at) && Date.now() - Date.parse(at) <= DAY;
const hash = (html: string) => createHash("sha256").update(html).digest("hex");
const text = (html: string) =>
  html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/\s+/g, "")
    .trim();

/** Read the Flash column and all six CNY prices, including row/column spans.
 * An unfamiliar or ambiguous table is a maintenance error, never permission to
 * reuse an old rate or silently raise the product budget. */
export function readDeepSeekFlashRates(html: string) {
  const tables = html.match(/<table\b[^>]*>[\s\S]*?<\/table>/gi) ?? [];
  const candidates: { offPeakRates: number[]; peakRates: number[] }[] = [];
  for (const table of tables) {
    const rows: string[][] = [];
    const trs = [...table.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)];
    if (trs.length > 80) continue;
    for (const [r, tr] of trs.entries()) {
      rows[r] ??= [];
      let column = 0;
      for (const cell of tr[1].matchAll(
        /<t[dh]\b([^>]*)>([\s\S]*?)<\/t[dh]>/gi,
      )) {
        while (rows[r][column] !== undefined) column++;
        const span = (name: string) =>
          Number(
            cell[1].match(new RegExp(`${name}=["']?(\\d+)`, "i"))?.[1] ?? 1,
          );
        const down = span("rowspan"),
          across = span("colspan");
        if (down < 1 || down > 20 || across < 1 || across > 20)
          throw Error("pricing-table-span");
        for (let i = r; i < r + down; i++) {
          rows[i] ??= [];
          for (let j = column; j < column + across; j++) {
            if (rows[i][j] !== undefined) throw Error("pricing-table-overlap");
            rows[i][j] = text(cell[2]);
          }
        }
        column += across;
      }
    }
    const header = rows[0] ?? [];
    const columns = header.flatMap((value, i) =>
      /^deepseek-flash(?:\(\d+\))?$/.test(value) ? [i] : [],
    );
    if (!header.includes("模型") || columns.length !== 1) continue;
    const rates = new Map<string, number>();
    for (const row of rows) {
      if (!/^价格/.test(row[0] ?? "")) continue;
      const kind =
        row[1] === "百万tokens输入（缓存未命中）"
          ? "input"
          : row[1] === "百万tokens输入（缓存命中）"
            ? "cache"
            : row[1] === "百万tokens输出"
              ? "output"
              : null;
      const period =
        row[2] === "空闲时段" ? "off" : row[2] === "高峰时段" ? "peak" : null;
      const price = row[columns[0]]?.match(/^(\d+(?:\.\d+)?)元$/);
      if (!kind || !period || !price) throw Error("pricing-table-rate");
      const key = `${period}-${kind}`;
      if (rates.has(key)) throw Error("pricing-table-duplicate");
      rates.set(key, Number(price[1]));
    }
    if (rates.size !== 6) continue;
    candidates.push({
      offPeakRates: ["input", "cache", "output"].map((key) =>
        rates.get(`off-${key}`)!,
      ),
      peakRates: ["input", "cache", "output"].map((key) =>
        rates.get(`peak-${key}`)!,
      ),
    });
  }
  if (candidates.length !== 1) throw Error("pricing-flash-table-unverified");
  return candidates[0];
}

async function readOfficialPage() {
  const response = await fetch(DEEPSEEK_PRICING_URL, {
    redirect: "error",
    cache: "no-store",
    credentials: "omit",
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok || response.url !== DEEPSEEK_PRICING_URL)
    throw Error("pricing-page-unavailable");
  const html = await response.text();
  if (Buffer.byteLength(html) > 256000) throw Error("pricing-page-size");
  return html;
}

const evidenceSchema = z
  .object({
    version: z.literal("direct-service-price-check-v1"),
    grantHash: z.string().regex(/^[a-f0-9]{64}$/),
    checkedAt: z.iso.datetime(),
    sourceUrl: z.literal(DEEPSEEK_PRICING_URL),
    officialPageSHA256: z.string().regex(/^[a-f0-9]{64}$/),
    html: z.string().max(256000),
  })
  .strict();
const refreshing = new Map<string, Promise<UnitDirectPolicy["pricing"]>>();

/** Product-only public price maintenance. No key, answer, model call, grant
 * mutation or ledger rewrite. Frozen experiments keep their original expiry. */
export async function verifyDirectServicePricing(
  policy: UnitDirectPolicy,
  root: string,
  readPage: () => Promise<string> = readOfficialPage,
): Promise<UnitDirectPolicy["pricing"]> {
  const grantHash = unitDigest(policy);
  const path = join(root, "price-verification.json");
  const validate = (raw: unknown) => {
    const e = evidenceSchema.parse(raw);
    const rates = readDeepSeekFlashRates(e.html);
    if (
      e.grantHash !== grantHash ||
      !fresh(e.checkedAt) ||
      hash(e.html) !== e.officialPageSHA256 ||
      JSON.stringify(rates.offPeakRates) !==
        JSON.stringify(policy.pricing.offPeakRates) ||
      JSON.stringify(rates.peakRates) !==
        JSON.stringify(policy.pricing.peakRates)
    )
      throw Error("pricing-evidence-mismatch");
    return {
      ...policy.pricing,
      checkedAt: e.checkedAt,
      officialPageSHA256: e.officialPageSHA256,
    };
  };
  try {
    const bytes = await readFile(path, "utf8");
    if (Buffer.byteLength(bytes) <= 300000) return validate(JSON.parse(bytes));
  } catch {
    // Missing, stale or damaged public evidence is rechecked, never used to
    // relax the expected rates or financial policy.
  }
  const key = `${root}:${grantHash}`;
  const pending = refreshing.get(key);
  if (pending) return pending;
  const refresh = (async () => {
    const html = await readPage();
    const evidence = {
      version: "direct-service-price-check-v1",
      grantHash,
      checkedAt: new Date().toISOString(),
      sourceUrl: DEEPSEEK_PRICING_URL,
      officialPageSHA256: hash(html),
      html,
    };
    const pricing = validate(evidence);
    await mkdir(root, { recursive: true, mode: 0o700 });
    const temp = join(root, `price-verification.${randomUUID()}.tmp`);
    await writeFile(temp, JSON.stringify(evidence) + "\n", {
      flag: "wx",
      mode: 0o600,
    });
    await rename(temp, path);
    return pricing;
  })();
  refreshing.set(key, refresh);
  try {
    return await refresh;
  } finally {
    refreshing.delete(key);
  }
}
