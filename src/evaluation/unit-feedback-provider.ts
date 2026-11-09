import { randomUUID } from "node:crypto";
import {
  reserveSharedModelBudget,
  sharedReservationSchema,
  type SharedBudgetRow,
} from "./shared-model-budget";
import { strictTeacherArguments } from "./deepseek-teacher-output";
import { verifyDirectServicePricing } from "./direct-service-pricing";
import type { UnitTrialAvailability } from "./unit-feedback-contract";
import { mkdir, readFile, writeFile, rename, unlink } from "node:fs/promises";
import { join } from "node:path";
import { z } from "zod";
import { createFetchTransport, type Transport } from "./provider";
import { readProjectCredential } from "./project-credentials";
import { shortProviderPlan, readShortModel } from "./short-table/provider";
import { prepareRegisteredUnitFeedback } from "./unit-feedback-registry";
import {
  unitFeedbackRequestBody,
  type UnitFeedbackTask,
} from "./unit-feedback";
import {
  prepareUnitFeedbackDispatch,
  SCOPED_UNIT_FEEDBACK_VERSION,
  scopedUnitFeedbackQuestionIds,
} from "./unit-feedback-dispatch";
import {
  realUnitReceiptSchema,
  resultFromUnitReceipt,
  unitDigest,
  type RealUnitReceipt,
} from "./unit-feedback-storage";
import {
  unitDirectPolicySchema,
  type UnitDirectPolicy,
} from "./unit-feedback-direct-policy";

const hash = z.string().regex(/^[a-f0-9]{64}$/);
export const unitSyntheticGrantSchema = z
  .object({
    version: z.literal("unit-feedback-synthetic-grant-v1"),
    id: z.string().min(1).max(160),
    purpose: z.literal("synthetic_validation"),
    provider: z.literal("deepseek"),
    model: z.literal("deepseek-flash"),
    maxCalls: z.literal(4),
    budgetCNY: z.literal(0.8),
    reservePerCallCNY: z.literal(0.2),
    validFrom: z.iso.datetime(),
    validUntil: z.iso.datetime(),
    pricing: z
      .object({
        checkedAt: z.iso.datetime(),
        officialPageSHA256: hash,
        offPeakRates: z.tuple([z.literal(1), z.literal(0.02), z.literal(4)]),
        peakRates: z.tuple([z.literal(2), z.literal(0.04), z.literal(8)]),
      })
      .strict(),
    samples: z
      .array(
        z
          .object({
            id: z.string().min(1).max(160),
            taskId: hash,
            requestBodyHash: hash,
          })
          .strict(),
      )
      .length(4),
  })
  .strict()
  .superRefine((g, ctx) => {
    if (
      new Set(g.samples.map((s) => s.id)).size !== 4 ||
      new Set(g.samples.map((s) => s.requestBodyHash)).size !== 4 ||
      new Set(g.samples.map((s) => s.taskId)).size !== 4 ||
      Date.parse(g.validUntil) <= Date.parse(g.validFrom)
    )
      ctx.addIssue({
        code: "custom",
        message: "invalid-frozen-synthetic-grant",
      });
  });
export type UnitSyntheticGrant = z.infer<typeof unitSyntheticGrantSchema>;
export const unitActiveTrialGrantSchema = z
  .object({
    version: z.literal("unit-feedback-active-trial-v2"),
    id: z
      .string()
      .min(1)
      .max(160)
      .regex(/^[a-z0-9-]+$/),
    approvalRef: z.string().min(1).max(400),
    // Server-owned opt-in only. Absence preserves the old grant hash and v1 wire.
    feedbackProtocol: z.literal(SCOPED_UNIT_FEEDBACK_VERSION).optional(),
    purpose: z.enum(["synthetic_validation", "practice"]),
    provider: z.literal("deepseek"),
    model: z.literal("deepseek-flash"),
    maxCalls: z.literal(3),
    budgetCNY: z.literal(0.6),
    reservePerCallCNY: z.literal(0.2),
    cumulativePriorCostCNY: z.number().finite().nonnegative(),
    nightBudgetCNY: z.literal(3),
    validFrom: z.iso.datetime(),
    validUntil: z.iso.datetime(),
    pricing: unitSyntheticGrantSchema.shape.pricing,
    exerciseBindings: z
      .array(
        z
          .object({ questionId: z.string().min(1).max(160), contentId: hash })
          .strict(),
      )
      .min(1)
      .max(3),
    samples: z
      .array(
        z
          .object({
            id: z.string().min(1).max(160),
            taskId: hash,
            requestBodyHash: hash,
          })
          .strict(),
      )
      .max(3),
  })
  .strict()
  .superRefine((g, ctx) => {
    if (
      (g.feedbackProtocol === SCOPED_UNIT_FEEDBACK_VERSION &&
        (g.purpose !== "practice" ||
          g.exerciseBindings.length > 2 ||
          g.exerciseBindings.some(
            (b) => !scopedUnitFeedbackQuestionIds.includes(b.questionId),
          ))) ||
      new Set(g.exerciseBindings.map((x) => x.questionId)).size !==
        g.exerciseBindings.length ||
      Date.parse(g.validUntil) <= Date.parse(g.validFrom) ||
      Date.parse(g.validUntil) - Date.parse(g.validFrom) > 86400000 ||
      g.cumulativePriorCostCNY + g.budgetCNY >= g.nightBudgetCNY ||
      (g.purpose === "synthetic_validation"
        ? g.exerciseBindings.length !== 3 ||
          g.samples.length !== 3 ||
          new Set(g.samples.map((x) => x.taskId)).size !== 3 ||
          new Set(g.samples.map((x) => x.requestBodyHash)).size !== 3
        : g.samples.length !== 0)
    )
      ctx.addIssue({ code: "custom", message: "invalid-active-trial-grant" });
  });
export type UnitActiveTrialGrant = z.infer<typeof unitActiveTrialGrantSchema>;
const trialGrantSchema = z.union([
  unitSyntheticGrantSchema,
  unitActiveTrialGrantSchema,
  unitDirectPolicySchema,
]);

const entrySchema = z
  .object({
    sampleId: z.string(),
    requestBodyHash: hash,
    taskId: hash,
    state: z.enum(["in_flight", "finished"]),
    startedAt: z.iso.datetime(),
    reservedCNY: z.literal(0.2),
    worstCaseCNY: z.number().nonnegative(),
    costCNY: z.number().nonnegative().nullable(),
    usageKnown: z.boolean(),
    failure: z.string().nullable(),
    responseId: z.string().nullable(),
    actualModel: z.string().nullable(),
    endedAt: z.iso.datetime().nullable(),
    receiptSHA256: hash.nullable(),
    // Optional only for historical entries created before the shared gate.
    sharedReservation: sharedReservationSchema.optional(),
    projectAccounting: z.literal("project-owned-accounting-v1").optional(),
    taskBudgetId: z.string().min(1).max(160).optional(),
  })
  .strict();
const ledgerSchema = z
  .object({
    version: z.literal("unit-feedback-synthetic-ledger-v1"),
    grantId: z.string(),
    grantHash: hash,
    // One cumulative journal. Continuing technical windows append here without
    // losing earlier obligations, stable attempts, receipts or shared pairing.
    // readLedger enforces the original call cap for every legacy policy.
    entries: z.array(entrySchema),
    stopped: z.boolean(),
    stopReason: z.string().nullable(),
  })
  .strict();
export const unitFeedbackServiceLedgerSchema = ledgerSchema;
type Ledger = z.infer<typeof ledgerSchema>;

/** Existing controlled provider. Direct product mode shares accounting, not trial expiry or activation. */
export function createUnitFeedbackTrialProvider(options: {
  grant: UnitSyntheticGrant | UnitActiveTrialGrant | UnitDirectPolicy;
  root: string;
  credentialRepo: string;
  transport?: Transport;
  readCredential?: typeof readProjectCredential;
  readPricingPage?: () => Promise<string>;
  // Trusted canonical preparation for a current answer, inquiry or whole case.
  // This port is not accepted from HTTP, env, a grant or a model response.
  prepareDirectDispatch?: (
    body: ReturnType<typeof unitFeedbackRequestBody>,
  ) => {
    body: ReturnType<typeof unitFeedbackRequestBody>;
    taskId: string;
  } & (
    | { task: UnitFeedbackTask; inquiry?: never; wholeCase?: never }
    | {
        task?: never;
        inquiry: { validateReceipt: (receipt: RealUnitReceipt) => void };
        wholeCase?: never;
      }
    | {
        task?: never;
        inquiry?: never;
        wholeCase: { validateReceipt: (receipt: RealUnitReceipt) => void };
      }
  );
}) {
  const grant = trialGrantSchema.parse(structuredClone(options.grant));
  const activeTrial = grant.version === "unit-feedback-active-trial-v2";
  const direct = grant.version === "unit-feedback-direct-service-v1";
  const continuingWindows =
    direct &&
    grant.continuation?.version === "same-ledger-technical-windows-v1";
  const projectAccounting = direct ? grant.accounting : undefined;
  const taskBudget = direct ? grant.taskBudget : undefined;
  const feedbackProtocol = activeTrial ? grant.feedbackProtocol : undefined;
  const grantHash = unitDigest(grant),
    root = options.root;
  let verifiedPricing = grant.pricing;
  let unavailableMessage: string | undefined;
  const bodyHash = (body: ReturnType<typeof unitFeedbackRequestBody>) =>
    unitDigest(body);
  const sampleFor = (body: ReturnType<typeof unitFeedbackRequestBody>) => {
    if (!direct && (!activeTrial || grant.purpose === "synthetic_validation"))
      return grant.samples.find((s) => s.requestBodyHash === bodyHash(body));
    try {
      if (direct && options.prepareDirectDispatch) {
        const canonical = options.prepareDirectDispatch(body);
        if (unitDigest(canonical.body) !== bodyHash(body)) return undefined;
        return {
          id: `${canonical.wholeCase ? "whole-case" : canonical.inquiry ? "inquiry" : "practice"}-${canonical.taskId.slice(0, 40)}`,
          taskId: canonical.taskId,
          requestBodyHash: bodyHash(body),
        };
      }
      const data = JSON.parse(body.messages[1].content);
      const task = prepareRegisteredUnitFeedback({
        id: data.answerId,
        questionId: data.caseId,
        exerciseRevision: data.caseRevision,
        raw: data.studentText,
      });
      const dispatch = prepareUnitFeedbackDispatch(task, feedbackProtocol);
      if (
        (!direct &&
          !grant.exerciseBindings.some(
            (b) =>
              b.questionId === data.caseId && b.contentId === task.contentId,
          )) ||
        unitDigest(dispatch.body) !== bodyHash(body)
      )
        return undefined;
      return {
        id: `practice-${dispatch.taskId.slice(0, 40)}`,
        taskId: dispatch.taskId,
        requestBodyHash: bodyHash(body),
      };
    } catch {
      return undefined;
    }
  };
  const current = () => {
    const now = Date.now();
    return (
      (direct
        ? grant.enabled
        : now >= Date.parse(grant.validFrom) &&
          now < Date.parse(grant.validUntil)) &&
      now >= Date.parse(verifiedPricing.checkedAt) &&
      now - Date.parse(verifiedPricing.checkedAt) <= 24 * 60 * 60 * 1000
    );
  };
  const readLedger = async (): Promise<Ledger> => {
    let value: unknown;
    try {
      value = JSON.parse(await readFile(join(root, "ledger.json"), "utf8"));
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== "ENOENT") throw e;
      if (projectAccounting) throw Error("project-accounting-missing-ledger");
      return {
        version: "unit-feedback-synthetic-ledger-v1",
        grantId: grant.id,
        grantHash,
        entries: [],
        stopped: false,
        stopReason: null,
      };
    }
    const ledger = ledgerSchema.parse(value);
    if (
      ledger.grantHash !== grantHash ||
      ledger.grantId !== grant.id ||
      (!continuingWindows && ledger.entries.length > grant.maxCalls) ||
      (!direct &&
        grant.purpose !== "practice" &&
        ledger.entries.some(
          (e, i) =>
            e.requestBodyHash !== grant.samples[i]?.requestBodyHash ||
            e.taskId !== grant.samples[i]?.taskId ||
            e.sampleId !== grant.samples[i]?.id,
        ))
    )
      throw Error("unit-trial-ledger-binding");
    if (
      projectAccounting &&
      (ledger.entries.length < projectAccounting.priorEntryCount ||
        unitDigest(
          ledger.entries.slice(0, projectAccounting.priorEntryCount),
        ) !== projectAccounting.priorEntriesSHA256 ||
        ledger.entries
          .slice(projectAccounting.priorEntryCount)
          .some(
            (entry) =>
              entry.projectAccounting !== projectAccounting.version ||
              entry.sharedReservation !== undefined,
          ))
    )
      throw Error("project-accounting-history-binding");
    if (
      taskBudget &&
      (ledger.entries.length < taskBudget.priorEntryCount ||
        unitDigest(ledger.entries.slice(0, taskBudget.priorEntryCount)) !==
          taskBudget.priorEntriesSHA256 ||
        ledger.entries
          .slice(taskBudget.priorEntryCount)
          .some((entry) => entry.taskBudgetId !== taskBudget.id))
    )
      throw Error("task-budget-history-binding");
    return ledger;
  };
  const writeLedger = async (ledger: Ledger) => {
    const temp = join(root, `ledger.${randomUUID()}.tmp`);
    await writeFile(
      temp,
      JSON.stringify(ledgerSchema.parse(ledger), null, 2) + "\n",
      { flag: "wx", mode: 0o600 },
    );
    await rename(temp, join(root, "ledger.json"));
  };
  const activationPath = join(root, "activation.json");
  const isActivated = async () => {
    if (direct) return true;
    if (!activeTrial) return true;
    try {
      const a = JSON.parse(await readFile(activationPath, "utf8"));
      return (
        a.grantHash === grantHash &&
        a.grantId === grant.id &&
        a.explicitConsent === true
      );
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === "ENOENT") return false;
      throw e;
    }
  };
  const spent = (ledger: Ledger) =>
    ledger.entries.reduce((sum, e) => sum + (e.costCNY ?? e.reservedCNY), 0);
  const eligible = (body: ReturnType<typeof unitFeedbackRequestBody>) => {
    if (!sampleFor(body)) return false;
    if (direct) return true;
    if (!activeTrial) return true;
    try {
      const data = JSON.parse(body.messages[1].content);
      const task = prepareRegisteredUnitFeedback({
        id: data.answerId,
        questionId: data.caseId,
        exerciseRevision: data.caseRevision,
        raw: data.studentText,
      });
      return grant.exerciseBindings.some(
        (b) => b.questionId === data.caseId && b.contentId === task.contentId,
      );
    } catch {
      return false;
    }
  };
  const ledgerReady = (
    ledger: Ledger,
    body: ReturnType<typeof unitFeedbackRequestBody>,
    sharedOrphanCNY = 0,
  ) =>
    !ledger.stopped &&
    // Unreconciled inherited reservations remain a hold after ownership changes.
    (!projectAccounting ||
      projectAccounting.inheritedUnpairedReserveCNY === 0) &&
    (continuingWindows || ledger.entries.length < grant.maxCalls) &&
    ledger.entries.every(
      (e) =>
        e.state === "finished" &&
        e.usageKnown &&
        e.costCNY !== null &&
        (direct || !e.failure),
    ) &&
    !ledger.entries.some((e) => e.requestBodyHash === bodyHash(body)) &&
    (grant.purpose === "practice" ||
      grant.samples[ledger.entries.length]?.requestBodyHash ===
        bodyHash(body)) &&
    (taskBudget
      ? ledger.entries.length - taskBudget.priorEntryCount <
          taskBudget.maxCalls &&
        ledger.entries
          .slice(taskBudget.priorEntryCount)
          .reduce((sum, e) => sum + (e.costCNY ?? e.reservedCNY), 0) +
          sharedOrphanCNY +
          grant.reservePerCallCNY <=
          taskBudget.budgetCNY
      : spent(ledger) + sharedOrphanCNY + grant.reservePerCallCNY <=
          grant.budgetCNY &&
        (!(activeTrial || direct) ||
          grant.cumulativePriorCostCNY +
            spent(ledger) +
            sharedOrphanCNY +
            grant.reservePerCallCNY <
            grant.nightBudgetCNY));
  const orphanReserve = (ledger: Ledger, rows: readonly SharedBudgetRow[]) => {
    const paired = new Set<string>();
    for (const entry of ledger.entries) {
      const ref = entry.sharedReservation;
      if (!ref) continue; // Immutable records created before shared accounting.
      const row = rows.find((r) => r.record_digest === ref.recordDigest);
      if (
        !row ||
        paired.has(row.record_digest) ||
        row.task_id !== entry.taskId ||
        row.attempt_id !==
          unitDigest({ grantId: grant.id, sampleId: entry.sampleId }) ||
        row.request_digest !== `sha256:${entry.requestBodyHash}` ||
        row.request_digest !== ref.requestDigest ||
        row.schema !== ref.protocol ||
        row.reservation_id !== ref.reservationId ||
        row.beijing_day !== ref.beijingDay ||
        row.maximum_CNY !== ref.maximumCNY
      )
        throw Error("shared_budget_local_pairing_invalid");
      paired.add(row.record_digest);
    }
    // Unknown project reservations cannot be escaped by changing question/task
    // or calendar day. A later grant must reconcile an older unpaired book too.
    let nanos = 0n;
    for (const row of rows)
      if (!paired.has(row.record_digest)) {
        const [integer, fraction = ""] = row.maximum_CNY.split(".");
        nanos +=
          BigInt(integer) * 1_000_000_000n + BigInt(fraction.padEnd(9, "0"));
      }
    return Number(nanos) / 1_000_000_000;
  };
  const permits = async (body: ReturnType<typeof unitFeedbackRequestBody>) => {
    unavailableMessage = undefined;
    if (!direct)
      return (
        current() &&
        eligible(body) &&
        (await isActivated()) &&
        ledgerReady(await readLedger(), body)
      );
    if (!grant.enabled || !eligible(body))
      return false;
    const ledger = await readLedger();
    if (!ledgerReady(ledger, body)) {
      const settled =
        !ledger.stopped &&
        (!projectAccounting || projectAccounting.inheritedUnpairedReserveCNY === 0) &&
        ledger.entries.every(
          (entry) =>
            entry.state === "finished" &&
            entry.usageKnown &&
            entry.costCNY !== null,
        );
      if (
        settled &&
        taskBudget &&
        ledger.entries.length - taskBudget.priorEntryCount >= taskBudget.maxCalls
      )
        unavailableMessage =
          "本机AI试用次数已用完，原答已保存。可以在模型设置中使用自己的Key继续评阅。";
      else if (
        settled &&
        taskBudget &&
        ledger.entries
          .slice(taskBudget.priorEntryCount)
          .reduce((sum, entry) => sum + (entry.costCNY ?? entry.reservedCNY), 0) +
          grant.reservePerCallCNY > taskBudget.budgetCNY
      )
        unavailableMessage =
          "本次AI试用的可用额度不足，原答已保存。可以在模型设置中使用自己的Key继续评阅。";
      return false;
    }
    if (!current()) {
      try {
        verifiedPricing = await verifyDirectServicePricing(
          grant,
          root,
          options.readPricingPage,
        );
      } catch {
        unavailableMessage =
          "本机AI服务暂时无法核对模型费率，这次没有发送。原答已保存，请稍后重新读取反馈。";
        return false;
      }
    }
    return current();
  };
  const gate = async (
    body: ReturnType<typeof unitFeedbackRequestBody>,
  ): Promise<UnitTrialAvailability> => {
    if (direct) throw Error("direct-service-has-no-trial-view");
    const ledger = await readLedger(),
      activated = await isActivated();
    const state = !current()
      ? "expired"
      : ledger.stopped
        ? "closed"
        : ledger.entries.some((e) => e.state !== "finished" || !e.usageKnown)
          ? "busy"
          : ledger.entries.length >= grant.maxCalls
            ? "closed"
            : activated
              ? "active"
              : "awaiting_activation";
    return {
      version: "unit-feedback-local-trial-v1" as const,
      grantId: grant.id,
      purpose: grant.purpose,
      provider: "deepseek" as const,
      model: "deepseek-flash" as const,
      exerciseIds: activeTrial
        ? grant.exerciseBindings.map((b) => b.questionId)
        : [],
      validUntil: grant.validUntil,
      maxCalls: grant.maxCalls,
      callsUsed: ledger.entries.length,
      remainingCalls: Math.max(0, grant.maxCalls - ledger.entries.length),
      budgetCNY: grant.budgetCNY,
      spentCNY: ledger.entries.every((e) => e.usageKnown)
        ? spent(ledger)
        : null,
      remainingCNY: ledger.entries.every((e) => e.usageKnown)
        ? Math.max(0, grant.budgetCNY - spent(ledger))
        : null,
      state,
      canActivate:
        state === "awaiting_activation" &&
        eligible(body) &&
        ledgerReady(ledger, body),
      notice:
        grant.purpose === "practice"
          ? "启用后仍只在你点击评阅时发送本题、公开依据与已保存原答到DeepSeek Flash；原答和反馈分别保存，不生成分数或永久掌握。"
          : "仅限本批明确冻结的虚构新答；启用不发送，主动评阅才调用真实DeepSeek Flash，不开放真实用户答文。",
    };
  };
  const activate = async (
    body: ReturnType<typeof unitFeedbackRequestBody>,
    trialId: string,
  ) => {
    if (!activeTrial || trialId !== grant.id) return false;
    if (await isActivated()) return current() && eligible(body);
    if (!(await gate(body)).canActivate) return false;
    await mkdir(root, { recursive: true, mode: 0o700 });
    try {
      await writeFile(
        activationPath,
        JSON.stringify({
          grantId: grant.id,
          grantHash,
          explicitConsent: true,
          at: new Date().toISOString(),
        }),
        { flag: "wx", mode: 0o600 },
      );
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== "EEXIST") throw e;
    }
    return isActivated();
  };
  return {
    kind: "registered_synthetic_trial" as const,
    mode: direct ? ("direct" as const) : ("trial" as const),
    ...(feedbackProtocol ? { feedbackProtocol } : {}),
    permits,
    unavailableMessage: () => unavailableMessage,
    gate: activeTrial ? gate : undefined,
    activate: activeTrial ? activate : undefined,
    execute: async (
      body: ReturnType<typeof unitFeedbackRequestBody>,
      signal: AbortSignal,
    ) => {
      if (!(await permits(body))) throw Error("unit-trial-not-admitted");
      await mkdir(root, { recursive: true, mode: 0o700 });
      const lock = join(root, "active.lock"),
        token = randomUUID();
      await writeFile(lock, token, { flag: "wx", mode: 0o600 });
      try {
        if (signal.aborted || !(await permits(body)))
          throw Error("unit-trial-not-admitted");
        const sample = sampleFor(body)!;
        const directDispatch = direct
          ? options.prepareDirectDispatch?.(body)
          : undefined;
        const data = directDispatch
          ? null
          : JSON.parse(body.messages[1].content);
        const task = directDispatch
          ? directDispatch.task
          : prepareRegisteredUnitFeedback({
              id: data.answerId,
              questionId: data.caseId,
              exerciseRevision: data.caseRevision,
              raw: data.studentText,
            });
        const dispatch =
          directDispatch ??
          prepareUnitFeedbackDispatch(task!, feedbackProtocol);
        if (
          dispatch.taskId !== sample.taskId ||
          unitDigest(dispatch.body) !== sample.requestBodyHash
        )
          throw Error("unit-trial-current-task-changed");
        const transport = options.transport ?? createFetchTransport(fetch);
        if (transport.source !== "real_provider")
          throw Error("unit-trial-real-transport-required");
        const plan = () => {
          const p = shortProviderPlan(
            Date.now(),
            verifiedPricing.checkedAt.slice(0, 10),
            body,
          );
          p.config.maxTokens = body.max_tokens;
          const expected =
            p.price.billingWindow?.period === "deepseek_peak"
              ? grant.pricing.peakRates
              : grant.pricing.offPeakRates;
          if (
            body.max_tokens !== dispatch.body.max_tokens ||
            p.reservation > grant.reservePerCallCNY ||
            JSON.stringify([
              p.price.inputPerMillion,
              p.price.cacheHitPerMillion,
              p.price.outputPerMillion,
            ]) !== JSON.stringify(expected)
          )
            throw Error("unit-trial-price-bound-unverified");
          return p;
        };
        let prepared = plan();
        const credential = await (
          options.readCredential ?? readProjectCredential
        )(prepared.config, options.credentialRepo);
        prepared = plan();
        if (signal.aborted || !current())
          throw Error("unit-trial-expired-before-send");
        const ledger = await readLedger();
        const entry: Ledger["entries"][number] = {
          sampleId: sample.id,
          requestBodyHash: sample.requestBodyHash,
          taskId: sample.taskId,
          state: "in_flight",
          startedAt: new Date().toISOString(),
          reservedCNY: 0.2,
          worstCaseCNY: prepared.reservation,
          costCNY: null,
          usageKnown: false,
          failure: null,
          responseId: null,
          actualModel: null,
          endedAt: null,
          receiptSHA256: null,
          ...(taskBudget ? { taskBudgetId: taskBudget.id } : {}),
        };
        const commitIntent = async () => {
          // Exclusive paid intent is still the original no-retry boundary.
          await writeFile(
            join(root, `${sample.id}.intent.json`),
            JSON.stringify({
              grantId: grant.id,
              grantHash,
              entry,
              plan: prepared,
              requestBodyHash: sample.requestBodyHash,
            }),
            { flag: "wx", mode: 0o600 },
          );
          ledger.entries.push(entry);
          await writeLedger(ledger);
        };
        if (projectAccounting) {
          // The original project lock, cumulative limits and immutable intent
          // stay authoritative. No new journal, grant ID or spending window.
          entry.projectAccounting = projectAccounting.version;
          await commitIntent();
        } else {
          // Legacy policies retain the original shared accounting gate.
          await reserveSharedModelBudget(
            {
              taskId: sample.taskId,
              attemptId: unitDigest({ grantId: grant.id, sampleId: sample.id }),
              requestDigest: `sha256:${sample.requestBodyHash}`,
              maximumCNY: "0.20",
            },
            async (reservation) => {
              entry.sharedReservation = reservation;
              await commitIntent();
            },
            signal,
            async (allDates) => {
              const lockedLedger = await readLedger();
              if (unitDigest(lockedLedger) !== unitDigest(ledger))
                throw Error("shared_budget_local_ledger_changed");
              const orphanCNY = orphanReserve(lockedLedger, allDates);
              if (!ledgerReady(lockedLedger, body, orphanCNY))
                throw Error("shared_budget_original_cap_or_state");
              if (orphanCNY > 0)
                throw Error("shared_budget_unpaired_reservation");
            },
          );
        }
        // A lease adds time between the original price check and dispatch.
        // Preserve that check at the actual send boundary; a changed window
        // stops this attempt with both reserves retained, never a retry.
        if (signal.aborted || !current())
          throw Error("unit-trial-expired-before-send");
        const sendPlan = plan();
        if (
          sendPlan.reservation !== prepared.reservation ||
          sendPlan.price.billingWindow?.period !==
            prepared.price.billingWindow?.period
        )
          throw Error("unit-trial-price-changed-during-shared-lease");
        prepared = sendPlan;
        let capturedText: string | null = null;
        let capturedOutputEnvelope: Record<string, unknown> | null = null;
        const captureTransport: Transport = {
          source: "real_provider",
          send: async (request) => {
            const response = await transport.send({
              ...request,
              signal: AbortSignal.any([request.signal, signal]),
            });
            // Retain incomplete output for diagnosis, excluding credentials and reasoning traces.
            try {
              const raw = JSON.parse(response.body),
                text = prepared.strictOutput
                  ? strictTeacherArguments(raw.choices?.[0])?.text
                  : raw.choices?.[0]?.message?.content;
              if (prepared.strictOutput) {
                const choice = raw.choices?.[0];
                const envelope = {
                  finishReason: choice?.finish_reason ?? null,
                  message: {
                    content: choice?.message?.content ?? null,
                    tool_calls: choice?.message?.tool_calls ?? null,
                  },
                };
                const serialized = JSON.stringify(envelope);
                if (
                  serialized.length <= 64000 &&
                  !serialized.includes(credential)
                )
                  capturedOutputEnvelope = envelope;
              }
              if (
                typeof text === "string" &&
                text.length <= 64000 &&
                !text.includes(credential)
              )
                capturedText = text;
            } catch {
              /* no untrusted HTTP error payload is retained */
            }
            return response;
          },
        };
        const response = await readShortModel(
          body,
          prepared,
          credential,
          captureTransport,
        );
        const receipt = realUnitReceiptSchema.parse({
          source: "real_provider",
          ...(activeTrial || direct ? { purpose: grant.purpose } : {}),
          provider: "deepseek",
          requestedModel: "deepseek-flash",
          actualModel: response.receipt.actualModel,
          responseId: response.receipt.responseId,
          status: response.receipt.status,
          text: response.text,
          finishReason: response.receipt.finishReason,
          ...("outputChannel" in response.receipt
            ? {
                outputChannel: response.receipt.outputChannel,
                toolName: response.receipt.toolName,
                toolCallId: response.receipt.toolCallId,
                endpoint: response.receipt.endpoint,
              }
            : {}),
          failure: response.failure,
          startedAt: response.receipt.startedAt,
          endedAt: response.receipt.endedAt,
          usage: response.receipt.usage,
          costCNY: response.costCny,
          price: prepared.price,
          inputCeiling: prepared.inputCeiling,
          maxOutputTokens: dispatch.body.max_tokens,
          reservationCNY: 0.2,
          grantId: grant.id,
          requestBodyHash: sample.requestBodyHash,
        });
        const retained = {
          receipt,
          capturedText,
          ...(prepared.strictOutput ? { capturedOutputEnvelope } : {}),
          capturedTextIsNotAdoptedOnFailure: true,
          durationMs: response.durationMs,
          worstCaseCNY: prepared.reservation,
        };
        await writeFile(
          join(root, `${sample.id}.receipt.json`),
          JSON.stringify(retained, null, 2) + "\n",
          { flag: "wx", mode: 0o600 },
        );
        entry.state = "finished";
        entry.costCNY = receipt.costCNY;
        entry.usageKnown = receipt.costCNY !== null;
        entry.failure = receipt.failure;
        entry.responseId = receipt.responseId;
        entry.actualModel = receipt.actualModel;
        entry.endedAt = receipt.endedAt;
        entry.receiptSHA256 = unitDigest(receipt);
        if (!entry.failure && entry.usageKnown) {
          try {
            if (directDispatch?.inquiry)
              directDispatch.inquiry.validateReceipt(receipt);
            else if (directDispatch?.wholeCase)
              directDispatch.wholeCase.validateReceipt(receipt);
            else resultFromUnitReceipt(task!, receipt, receipt.endedAt);
          } catch {
            entry.failure = "structure-or-evidence-failure";
          }
        }
        if ((!direct && entry.failure) || !entry.usageKnown) {
          ledger.stopped = true;
          ledger.stopReason = entry.failure ?? "unknown-usage";
        }
        await writeLedger(ledger);
        return { ...receipt, failure: entry.failure };
      } finally {
        if ((await readFile(lock, "utf8")) === token) await unlink(lock);
      }
    },
  };
}
