import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import {
  digest,
  releaseIdentity,
  validateModel,
  validateEndpoint,
} from "../model-config";
import { createFetchTransport, priceSchema, type Transport } from "../provider";
import { deepseekPeriod, priceWindowCovers } from "../price-window";
import { readProjectCredential } from "../project-credentials";
import { LABEL_FIRST_INSTRUCTIONS } from "../criterion-label-first";
import { buildModelInput } from "../index";
import { observationInput } from "../semantic-observations";
import {
  GRAPH_VERSION,
  type RunInput,
  type GroupResult,
  type ScoreResult,
  type InvocationLedger,
} from "./contracts";
import { buildGradingGraph, createLimiter, readingRequest } from "./workflow";
import { providerReader } from "./provider-reader";
import { openGraphStorage } from "./storage";
import {
  loadLocalCandidate,
  presentQuestion,
  CANDIDATE_HASH,
} from "./local-candidate";
import {
  LOCAL_TRIAL_VERSION,
  localTrialRequestSchema,
  type TrialReply,
  type TrialResult,
} from "./local-trial-contract";

const grantSchema = z
  .object({
    enabled: z.boolean(),
    id: z.string().regex(/^[a-z0-9-]+$/),
    version: z.literal(LOCAL_TRIAL_VERSION),
    candidateHash: z.literal(CANDIDATE_HASH),
    validFrom: z.iso.datetime(),
    validUntil: z.iso.datetime(),
    maxCalls: z.number().int().min(1).max(60),
    reservationCny: z.literal(0.1),
    budgetCny: z.number().positive().max(6),
    pricing: z.object({
      checkedAt: z.iso.date(),
      sourceUrl: z.literal(
        "https://api-docs.deepseek.com/zh-cn/quick_start/pricing/",
      ),
      offPeak: z.object({
        input: z.literal(1),
        cached: z.literal(0.02),
        output: z.literal(4),
      }),
      peak: z.object({
        input: z.literal(2),
        cached: z.literal(0.04),
        output: z.literal(8),
      }),
    }),
  })
  .strict()
  .refine(
    (g) =>
      g.maxCalls * g.reservationCny <= g.budgetCny + 1e-9 &&
      Date.parse(g.validUntil) > Date.parse(g.validFrom) &&
      Date.parse(g.validUntil) - Date.parse(g.validFrom) <= 86400000,
  );
export const localTrialRoot = (repo: string) =>
  join(repo, "artifacts", "graph-local-trial");
type SavedQuestion = {
  run: RunInput;
  wire: string;
  groups?: Record<string, GroupResult>;
  score?: ScoreResult;
  wallMs?: number;
};
type Saved = {
  identity: string;
  result: TrialResult;
  questions: SavedQuestion[];
};
const read = async (p: string) => JSON.parse(await readFile(p, "utf8"));
async function exists(p: string) {
  try {
    await readFile(p);
    return true;
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return false;
    throw e;
  }
}
async function atomic(p: string, data: unknown) {
  const tmp = `${p}.${randomUUID()}.tmp`;
  await writeFile(tmp, JSON.stringify(data), { flag: "wx", mode: 0o600 });
  await rename(tmp, p);
}
async function readSaved(path: string, id: string): Promise<Saved | null> {
  try {
    const s: Saved = await read(path);
    if (
      s.identity !== id ||
      s.result.id !== id ||
      s.result.version !== LOCAL_TRIAL_VERSION
    )
      throw Error("saved-identity-mismatch");
    return s;
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw e;
  }
}
export async function evaluateLocalTrial(
  raw: unknown,
  deps: {
    repo: string;
    transport?: Transport;
    credential?: () => Promise<string>;
    now?: () => number;
  },
): Promise<TrialReply> {
  if (process.env.LVZHEN_ENV === "trial") throw Error("local-only");
  const req = localTrialRequestSchema.parse(raw),
    root = localTrialRoot(deps.repo);
  if (req.action === "read") {
    const old = await readSaved(
      join(root, "answers", `${req.id}.json`),
      req.id,
    );
    return {
      result: old?.result ?? null,
      available: false,
      message: old ? undefined : "没有找到这份结果。",
    };
  }
  const candidate = await loadLocalCandidate(deps.repo),
    item = candidate.cases.find((c) => c.item.id === req.caseId)!;
  const answers = [...req.answers].sort((a, b) =>
    a.questionId.localeCompare(b.questionId),
  );
  const id = digest({
    version: candidate.version,
    candidate: candidate.hash,
    caseId: req.caseId,
    answers,
  });
  const path = join(root, "answers", `${id}.json`);
  const old = await readSaved(path, id);
  if (old) return { result: old.result, available: false }; // Never resend an existing or uncertain submission.
  let grant: z.infer<typeof grantSchema>;
  try {
    grant = grantSchema.parse(await read(join(root, "grant.json")));
  } catch {
    return {
      result: null,
      available: false,
      message: "本机试用暂未开放，草稿仍保留。",
    };
  }
  const now = (deps.now ?? Date.now)();
  const cfg = candidate.config;
  validateEndpoint(cfg, validateModel(cfg));
  const quota = join(root, "grants", grant.id);
  if (
    !grant.enabled ||
    now < Date.parse(grant.validFrom) ||
    now + 120000 >= Date.parse(grant.validUntil) ||
    (await exists(join(root, "stopped.json")))
  )
    return {
      result: null,
      available: false,
      message: "本轮试用已暂停或到期，已保存的成绩仍可查看。",
    };
  if (req.action === "lookup") return { result: null, available: true };
  const period = deepseekPeriod(now),
    rates =
      period === "deepseek_peak" ? grant.pricing.peak : grant.pricing.offPeak;
  const price = priceSchema.parse({
    model: cfg.model,
    sourceUrl: grant.pricing.sourceUrl,
    checkedAt: grant.pricing.checkedAt,
    currency: "CNY",
    inputBilling: "cache_split",
    outputIncludesReasoning: true,
    inputPerMillion: rates.input,
    cacheHitPerMillion: rates.cached,
    outputPerMillion: rates.output,
    billingWindow: {
      validFrom: new Date(now).toISOString(),
      validUntil: new Date(now + 125000).toISOString(),
      period,
    },
  });
  if (!priceWindowCovers(price.billingWindow!, cfg.model, now, now + 120000))
    return {
      result: null,
      available: false,
      message: "即将切换计价时段，请稍后提交；草稿仍保留。",
    };
  const store = await openGraphStorage(),
    lock = await store.pool.connect();
  let locked = false;
  try {
    locked = (
      await lock.query(
        "SELECT pg_try_advisory_lock(hashtextextended($1,0)) AS locked",
        [`local-candidate-ui:${deps.repo}`],
      )
    ).rows[0].locked;
    if (!locked)
      return {
        result: (await readSaved(path, id))?.result ?? null,
        available: false,
        message: "有一份答案正在评阅，请稍后查看结果。",
      };
    const saved = await readSaved(path, id);
    if (saved) return { result: saved.result, available: false };
    if (await exists(join(root, "stopped.json")))
      return {
        result: null,
        available: false,
        message: "本轮有待核对请求，暂不继续调用。",
      };
    await mkdir(join(root, "answers"), { recursive: true });
    await mkdir(quota, { recursive: true });
    // A reserved submission with no final receipt is an unknown outcome. Fail
    // closed across processes and across new answers, not merely the same run.
    const { readdir } = await import("node:fs/promises");
    const intents = (await readdir(quota)).filter((n) =>
      n.endsWith(".intent.json"),
    );
    const batches = await readdir(join(root, "grants"), {
      withFileTypes: true,
    });
    for (const batch of batches.filter((b) => b.isDirectory())) {
      const batchPath = join(root, "grants", batch.name);
      for (const name of (await readdir(batchPath)).filter((n) =>
        n.endsWith(".intent.json"),
      )) {
        const reservation = await read(join(batchPath, name));
        if (
          !(await exists(join(batchPath, `${reservation.id}.complete.json`)))
        ) {
          await atomic(join(root, "stopped.json"), {
            reason: "unresolved-submission",
            id: reservation.id,
          });
          return {
            result: null,
            available: false,
            message: "上一份请求结果尚未核对，已停止新调用。",
          };
        }
      }
    }
    const used = (
      await Promise.all(intents.map((n) => read(join(quota, n))))
    ).reduce((n, r) => n + r.calls, 0);
    const calls = answers.filter((a) => a.text.trim()).length;
    if (used + calls > grant.maxCalls)
      return {
        result: null,
        available: false,
        message: "本轮试用次数已用完，草稿和成绩仍保留。",
      };
    const questions: SavedQuestion[] = answers.map((a) => {
      const pack = item.packs[a.questionId],
        run: RunInput = {
          runId: randomUUID(),
          version: GRAPH_VERSION,
          pack,
          answer: a.text,
          modelIdentity: digest({
            release: releaseIdentity(cfg, price).releaseSha256,
            instructions: candidate.instructions,
          }),
          maxCalls: 1,
          deadline: now + 120000,
          reviewMode: "off",
        };
      if (!a.text.trim()) return { run, wire: "" };
      const r = readingRequest(
        { run, group: pack.groups[0] },
        pack.groups[0].criterionIds,
      );
      const wire = JSON.stringify({
        model: cfg.model,
        messages: [
          { role: "system", content: candidate.instructions },
          {
            role: "user",
            content: JSON.stringify(
              observationInput(
                buildModelInput(r.input).data,
                r.policy,
                "findings-label-first-v1",
              ),
            ),
          },
        ],
        response_format: { type: "json_object" },
        stream: false,
        max_tokens: cfg.maxTokens,
        temperature: cfg.temperature,
        thinking: { type: cfg.thinking },
      });
      if (
        a.text.trim() &&
        ((Buffer.byteLength(wire, "utf8") + 8192) * rates.input +
          cfg.maxTokens * rates.output) /
          1e6 >
          grant.reservationCny
      )
        throw Error("reservation-too-small");
      return { run, wire };
    });
    const data: Saved = {
      identity: id,
      questions,
      result: {
        id,
        version: candidate.version,
        caseId: req.caseId,
        title: item.item.title,
        createdAt: new Date(now).toISOString(),
        state: "running",
        source:
          deps.transport?.source === "offline_fake"
            ? "offline_test"
            : "real_provider",
        questions: questions.map((q, i) =>
          presentQuestion(answers[i].questionId, q.run.pack, q.run.answer),
        ),
        total: null,
        max: 20,
        costCny: 0,
        unknownCostCalls: 0,
        calls: 0,
        durationMs: 0,
      },
    };
    await atomic(path, data);
    await writeFile(
      join(quota, `${id}.intent.json`),
      JSON.stringify({
        id,
        calls,
        reservedCny: calls * grant.reservationCny,
        createdAt: new Date(now).toISOString(),
      }),
      { flag: "wx", mode: 0o600 },
    );
    let stopped = false;
    const started = performance.now();
    try {
      for (const [i, q] of questions.entries()) {
        if (!q.run.answer.trim()) continue;
        if (stopped) break;
        await store.pool.query(
          "INSERT INTO grading_graph.runs(id,identity,input) VALUES($1,$2,$3::jsonb)",
          [q.run.runId, digest(q.run), JSON.stringify(q.run)],
        );
        const r = readingRequest(
          { run: q.run, group: q.run.pack.groups[0] },
          q.run.pack.groups[0].criterionIds,
        );
        let dispatched = false;
        const guarded: InvocationLedger = {
          execute: async (inv, send) => {
            if (
              inv.runId !== q.run.runId ||
              inv.groupId !== "whole" ||
              inv.phase !== "read" ||
              inv.maxCalls !== 1 ||
              inv.maxReviews !== 0 ||
              inv.requestHash !==
                digest({
                  request: r,
                  modelIdentity: q.run.modelIdentity,
                  version: GRAPH_VERSION,
                })
            )
              throw Error("unplanned-call");
            let out;
            try {
              out = await store.ledger.execute(inv, send);
            } catch (error) {
              // A response that could not be persisted must remain unknown.
              if (dispatched) {
                data.result.calls++;
                data.result.unknownCostCalls++;
              }
              throw error;
            }
            data.result.calls++;
            if (out.status === "completed") {
              data.result.costCny += out.receipt.cost ?? 0;
              const unknownCost =
                out.receipt.cost === null &&
                deps.transport?.source !== "offline_fake";
              if (unknownCost) data.result.unknownCostCalls++;
              stopped =
                unknownCost ||
                (out.receipt.cost ?? 0) > grant.reservationCny ||
                Boolean(out.receipt.providerFailure) ||
                out.receipt.measurement?.model !== cfg.model;
            } else {
              data.result.unknownCostCalls++;
              stopped = true;
            }
            if (stopped)
              await atomic(join(root, "stopped.json"), {
                id,
                reason: "provider-result-needs-check",
              });
            return out;
          },
        };
        const transport = deps.transport ?? createFetchTransport(fetch);
        const reader = providerReader({
          config: cfg,
          price,
          credential:
            deps.credential ?? (() => readProjectCredential(cfg, deps.repo)),
          authorize: async () => {
            const t = (deps.now ?? Date.now)();
            if (
              stopped ||
              !priceWindowCovers(
                price.billingWindow!,
                cfg.model,
                t,
                t + cfg.timeoutMs,
              )
            )
              throw Error("trial-window-closed");
          },
          transport: {
            source: transport.source,
            send: async (outgoing) => {
              const body = JSON.parse(outgoing.body);
              if (body.messages[0].content !== LABEL_FIRST_INSTRUCTIONS)
                throw Error("base-prompt-drift");
              body.messages[0].content = candidate.instructions;
              const actual = JSON.stringify(body);
              if (actual !== q.wire) throw Error("wire-drift");
              dispatched = true;
              return transport.send({ ...outgoing, body: actual });
            },
          },
        }).reader;
        const { graph } = buildGradingGraph({
          ledger: guarded,
          reader,
          checkpointer: store.saver,
          limit: createLimiter(1),
        });
        const at = performance.now();
        const out = await graph.invoke(
          { run: q.run },
          {
            configurable: { thread_id: q.run.runId },
            maxConcurrency: 1,
            recursionLimit: 30,
          },
        );
        q.groups = out.results;
        q.score = out.score;
        q.wallMs = performance.now() - at;
        await store.pool.query(
          "UPDATE grading_graph.runs SET result=$2::jsonb WHERE id=$1 AND result IS NULL",
          [
            q.run.runId,
            JSON.stringify({
              groups: q.groups,
              score: q.score,
              wallMs: q.wallMs,
            }),
          ],
        );
        data.result.questions[i] = presentQuestion(
          answers[i].questionId,
          q.run.pack,
          q.run.answer,
          q.groups,
          q.score,
          q.wallMs,
        );
        await atomic(path, data);
      }
      data.result.state = stopped ? "stopped" : "complete";
      data.result.total = data.result.questions.some((q) => q.total === null)
        ? null
        : data.result.questions.reduce((n, q) => n + (q.total ?? 0), 0);
      data.result.durationMs = performance.now() - started;
      await atomic(path, data);
      if (!stopped)
        await atomic(join(quota, `${id}.complete.json`), {
          id,
          calls: data.result.calls,
          costCny: data.result.costCny,
        });
      return { result: data.result, available: false };
    } catch {
      data.result.state = "stopped";
      data.result.total = null;
      data.result.durationMs = performance.now() - started;
      await atomic(join(root, "stopped.json"), {
        id,
        reason: "incomplete-submission",
      });
      await atomic(path, data);
      return {
        result: data.result,
        available: false,
        message: "本次评阅未完整完成，原答已保存；没有自动重试。",
      };
    }
  } finally {
    if (locked)
      await lock.query("SELECT pg_advisory_unlock(hashtextextended($1,0))", [
        `local-candidate-ui:${deps.repo}`,
      ]);
    lock.release();
    await store.pool.end();
  }
}
