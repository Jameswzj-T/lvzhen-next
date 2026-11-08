import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import {
  configSchema,
  priceSchema,
  runChatCompletion,
  createFetchTransport,
  providerInstructions,
  type Transport,
} from "./provider";
import {
  digest,
  releaseIdentity,
  validateModel,
  validateEndpoint,
} from "./model-config";
import { priceWindowCovers } from "./price-window";
import { readProjectCredential } from "./project-credentials";
import { assessmentInput } from "./evidence-references";
import {
  lessonFeedbackInput,
  lessonFeedbackRequest,
  validateLessonFeedback,
  type LessonFeedbackResponse,
} from "./lesson-feedback-contract";

// A bounded local experiment, deliberately separate from approved production releases.
export const lessonTrialConfig = z
  .object({
    trialId: z.string().regex(/^[a-z0-9-]{1,70}$/),
    enabled: z.boolean(),
    uiEnabled: z.boolean().default(false),
    maxCalls: z.number().int().min(1).max(8),
    budgetCny: z.number().positive().max(1),
    reservationCny: z.literal(0.1),
    config: configSchema,
    price: priceSchema,
  })
  .strict()
  .superRefine((c, ctx) => {
    if (
      c.config.model !== "deepseek-flash" ||
      c.config.thinking !== "disabled" ||
      c.config.timeoutMs > 8000 ||
      c.config.maxTokens > 1536 ||
      c.config.identityMode !== "harness" ||
      c.config.promptVariant !== "minimal-v1" ||
      c.price.model !== c.config.model ||
      c.price.currency !== "CNY" ||
      !c.price.billingWindow ||
      c.maxCalls * c.reservationCny > c.budgetCny
    )
      ctx.addIssue({ code: "custom", message: "invalid-lesson-trial" });
  });
export const lessonTrialRoot = (repo: string) =>
  join(repo, "artifacts", "lesson-feedback-trial");
const unavailable = (
  reason: "closed" | "limit" = "closed",
): LessonFeedbackResponse => ({ status: "unavailable", reason });

async function atomic(path: string, value: unknown) {
  const temp = `${path}.${randomUUID()}.tmp`;
  await writeFile(temp, JSON.stringify(value), { flag: "wx", mode: 0o600 });
  await rename(temp, path);
}

export async function evaluateLessonTrial(
  raw: unknown,
  deps: {
    repo: string;
    transport?: Transport;
    credential?: () => Promise<string>;
    now?: () => number;
    fromUI?: boolean;
  },
): Promise<LessonFeedbackResponse> {
  const request = lessonFeedbackRequest.parse(raw);
  const input = lessonFeedbackInput(request.attemptId, request.answer);
  const root = lessonTrialRoot(deps.repo);
  let grant: z.infer<typeof lessonTrialConfig>;
  try {
    grant = lessonTrialConfig.parse(
      JSON.parse(await readFile(join(root, "config.json"), "utf8")),
    );
    const profile = validateModel(grant.config);
    validateEndpoint(grant.config, profile);
    if (
      !profile.priceSources.includes(grant.price.sourceUrl.replace(/\/$/, ""))
    )
      return unavailable();
  } catch {
    return unavailable();
  }
  const identity = releaseIdentity(grant.config, grant.price);
  const run = join(root, grant.trialId);
  const recordId = digest({ input, identity });
  const path = join(run, `${recordId}.json`);
  try {
    const cached = JSON.parse(await readFile(path, "utf8"));
    return validateLessonFeedback(
      request.attemptId,
      request.answer,
      cached.response,
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT")
      return { status: "failed", reason: "storage_failed" };
  }
  if (deps.fromUI && !grant.uiEnabled) return unavailable();
  const now = (deps.now ?? Date.now)();
  if (
    !grant.enabled ||
    !priceWindowCovers(
      grant.price.billingWindow!,
      grant.config.model,
      now,
      now + grant.config.timeoutMs,
    )
  )
    return unavailable();
  // UTF-8 bytes bound text tokens conservatively; allow 4096 additional tokens for framing.
  const maxInput =
    Buffer.byteLength(
      JSON.stringify(assessmentInput(input)) +
        providerInstructions(grant.config),
      "utf8",
    ) + 4096;
  const maxCost =
    (maxInput * grant.price.inputPerMillion +
      grant.config.maxTokens * grant.price.outputPerMillion) /
    1_000_000;
  if (maxCost > grant.reservationCny) return unavailable();
  try {
    await readFile(join(run, "stopped"));
    return unavailable();
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT")
      return unavailable();
  }
  if (request.action === "lookup")
    return { status: "not_requested", reason: "available" };
  await mkdir(run, { recursive: true });
  const pending = { status: "pending", reason: "waiting" } as const;
  try {
    await writeFile(
      path,
      JSON.stringify({ input, identity, response: pending }),
      { flag: "wx", mode: 0o600 },
    );
  } catch (error) {
    return (error as NodeJS.ErrnoException).code === "EEXIST"
      ? pending
      : { status: "failed", reason: "storage_failed" };
  }
  let slot: number | null = null;
  try {
    for (let i = 1; i <= grant.maxCalls; i++) {
      try {
        await writeFile(
          join(run, `call-${i}.intent.json`),
          JSON.stringify({
            recordId,
            reservedCny: grant.reservationCny,
            status: "pending_or_unknown",
          }),
          { flag: "wx", mode: 0o600 },
        );
        slot = i;
        break;
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
      }
    }
    if (slot === null) {
      const response = unavailable("limit");
      await atomic(path, { input, identity, response });
      return response;
    }
    const credential = await (
      deps.credential ?? (() => readProjectCredential(grant.config, deps.repo))
    )();
    const evaluation = await runChatCompletion(input, grant.config, {
      transport: deps.transport ?? createFetchTransport(fetch),
      credential,
      allowRealCall: true,
      price: grant.price,
    });
    const accountingIssue =
      evaluation.measurement.source === "real_provider" &&
      (evaluation.measurement.cost === null ||
        evaluation.measurement.cost > grant.reservationCny ||
        evaluation.measurement.model !== grant.config.model ||
        (evaluation.measurement.reasoningTokens ?? 0) > 0);
    const bad =
      accountingIssue ||
      evaluation.failure ||
      !["assessed", "needs_clarification"].includes(evaluation.result.status);
    const response: LessonFeedbackResponse = bad
      ? { status: "failed", reason: "evaluation_failed" }
      : {
          status: "ready",
          source:
            evaluation.measurement.source === "real_provider"
              ? "model_trial"
              : "offline_test",
          result: evaluation.result,
          durationMs: evaluation.measurement.durationMs,
          createdAt: evaluation.measurement.endedAt,
        };
    validateLessonFeedback(request.attemptId, request.answer, response);
    await atomic(path, { input, identity, response, evaluation });
    if (accountingIssue)
      await writeFile(join(run, "stopped"), "usage-review-required", {
        mode: 0o600,
      });
    return response;
  } catch {
    const response = { status: "failed", reason: "storage_failed" } as const;
    try {
      await atomic(path, { input, identity, response });
    } catch {
      /* Preserve the pending intent. Never resend. */
    }
    return response;
  }
}

export function allowLessonTrialRequest(request: Request) {
  const url = new URL(request.url);
  const host = request.headers.get("host");
  const loopbackHosts = ["127.0.0.1:3107", "localhost:3107"];
  return (
    url.protocol === "http:" &&
    loopbackHosts.includes(url.host) &&
    host !== null &&
    loopbackHosts.includes(host) &&
    // Next may normalize the internal URL to localhost; compare the browser's
    // origin with the actual Host header, while restricting both to loopback.
    request.headers.get("origin") === `http://${host}` &&
    request.headers.get("x-lvzhen-lesson") === "1" &&
    request.headers.get("sec-fetch-site") !== "cross-site"
  );
}
