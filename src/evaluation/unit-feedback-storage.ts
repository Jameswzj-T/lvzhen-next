import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile, rename, unlink } from "node:fs/promises";
import { join } from "node:path";
import { isDeepStrictEqual } from "node:util";
import { z } from "zod";
import { calculateCost, priceSchema } from "./provider";
import { applyReviewedActiveFeedback } from "./unit-feedback-active-review";
import type { UnitFeedbackTask } from "./unit-feedback";
import {
  presentUnitFeedbackReceipt,
  unitFeedbackArchiveBodyMatches,
} from "./unit-feedback-dispatch";
import {
  validateUnitFeedbackResult,
  unitFeedbackResultSchema,
  type UnitFeedbackResult,
} from "./unit-feedback-contract";

export const UNIT_SUBMISSION_VERSION = "unit-feedback-submission-v1";
export const unitDigest = (value: unknown) =>
  createHash("sha256").update(JSON.stringify(value)).digest("hex");
const syntheticReceiptSchema = z
  .object({
    source: z.literal("synthetic_provider"),
    responseId: z.string().min(1).max(160),
    status: z.number().int(),
    text: z.string().max(64000),
    failure: z.string().max(1000).nullable(),
  })
  .strict();
export type SyntheticUnitReceipt = z.infer<typeof syntheticReceiptSchema>;
const count = z.number().int().nonnegative().nullable();
export const realUnitReceiptSchema = z
  .object({
    source: z.literal("real_provider"),
    purpose: z.enum(["synthetic_validation", "practice"]).optional(),
    provider: z.literal("deepseek"),
    requestedModel: z.literal("deepseek-flash"),
    actualModel: z.string().max(160).nullable(),
    responseId: z.string().min(1).max(160).nullable(),
    status: z.number().int().nullable(),
    text: z.string().max(64000),
    finishReason: z.string().max(160).nullable().optional(),
    outputChannel: z.literal("tool_arguments").optional(),
    toolName: z.literal("submit_teacher_feedback").optional(),
    toolCallId: z.string().min(1).max(160).nullable().optional(),
    endpoint: z
      .literal("https://api.deepseek.com/beta/chat/completions")
      .optional(),
    failure: z.string().max(1000).nullable(),
    startedAt: z.iso.datetime(),
    endedAt: z.iso.datetime(),
    usage: z
      .object({
        inputTokens: count,
        outputTokens: count,
        totalTokens: count,
        cacheHitTokens: count,
        cacheMissTokens: count,
        reasoningTokens: count,
      })
      .strict(),
    costCNY: z.number().finite().nonnegative().nullable(),
    price: priceSchema,
    inputCeiling: z.number().int().positive(),
    maxOutputTokens: z.union([
      z.literal(1024),
      z.literal(1536),
      z.literal(16384),
    ]),
    reservationCNY: z.number().finite().positive().max(0.2),
    grantId: z.string().min(1).max(160),
    requestBodyHash: z.string().regex(/^[a-f0-9]{64}$/),
  })
  .strict();
export type RealUnitReceipt = z.infer<typeof realUnitReceiptSchema>;
export const unitReceiptSchema = z.discriminatedUnion("source", [
  syntheticReceiptSchema,
  realUnitReceiptSchema,
]);
const storedSchema = z
  .object({
    version: z.literal(UNIT_SUBMISSION_VERSION),
    registrationVersion: z.string().min(1).max(160),
    taskId: z.string().regex(/^[a-f0-9]{64}$/),
    requestBodyHash: z.string().regex(/^[a-f0-9]{64}$/),
    completedAt: z.iso.datetime(),
    outcome: z.enum(["accepted", "failed"]),
    failure: z.string().max(1000).nullable(),
    sourceReceipt: unitReceiptSchema.nullable(),
    result: unitFeedbackResultSchema.nullable(),
  })
  .strict();
export type StoredUnitSubmission = Omit<
  z.infer<typeof storedSchema>,
  "result"
> & { result: UnitFeedbackResult | null };
// Read-only developer inspection shares the exact archive schema, never a relaxed copy.
export { storedSchema as storedUnitSubmissionSchema };

/** A separate archive, never the short/table budget ledger or original answer store. */
export class UnitFeedbackStorage {
  readonly root: string;
  constructor(repo: string) {
    this.root = join(repo, "artifacts", "unit-feedback-submissions");
  }
  private path(id: string, suffix = "json") {
    if (!/^[a-f0-9]{64}$/.test(id)) throw Error("invalid-unit-task-id");
    return join(this.root, `${id}.${suffix}`);
  }
  private async json(file: string) {
    try {
      const bytes = await readFile(file);
      if (bytes.length > 512000) throw Error("unit-archive-size");
      return JSON.parse(bytes.toString("utf8"));
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === "ENOENT") return null;
      throw e;
    }
  }
  async read(
    task: UnitFeedbackTask,
    registrationVersion: string,
    requestBodyHash: string,
  ) {
    const wrapper = await this.json(this.path(task.taskId));
    if (wrapper === null) return null;
    const record = storedSchema.parse(wrapper.record);
    if (
      wrapper.checksum !== unitDigest(record) ||
      record.taskId !== task.taskId ||
      record.registrationVersion !== registrationVersion ||
      !unitFeedbackArchiveBodyMatches(
        task,
        record.requestBodyHash,
        requestBodyHash,
      )
    )
      throw Error("unit-archive-binding");
    if (record.outcome === "failed") {
      if (record.result !== null || !record.failure)
        throw Error("unit-failure-archive-binding");
      return record;
    }
    if (!record.result || !record.sourceReceipt || record.failure !== null)
      throw Error("unit-archive-incomplete");
    const receipt = record.sourceReceipt;
    const presentation = presentUnitFeedbackReceipt(
      task,
      receipt.text,
      record.requestBodyHash,
    );
    if (presentation.requestBodyHash !== record.requestBodyHash)
      throw Error("unit-archive-wire-protocol-binding");
    const result = validateUnitFeedbackResult(record.result, {
      taskId: task.taskId,
      contentId: task.contentId,
      answerId: task.input.answerId,
      questionId: task.input.caseId,
      questionRevision: task.input.caseRevision,
      originalText: task.input.studentText,
    });
    if (
      result.source !==
        (receipt.source === "real_provider"
          ? "real_provider"
          : "offline_test") ||
      result.purpose !==
        (receipt.source === "real_provider"
          ? (receipt.purpose ?? "synthetic_validation")
          : "synthetic_validation") ||
      receipt.status !== 200 ||
      receipt.failure !== null ||
      result.receipt.responseId !== receipt.responseId ||
      result.receipt.receiptHash !== unitDigest(receipt) ||
      result.id !==
        unitDigest({ taskId: task.taskId, receiptHash: unitDigest(receipt) }) ||
      !isDeepStrictEqual(presentation.view, result.view) ||
      !isDeepStrictEqual(
        "sourceTeacher" in presentation
          ? presentation.sourceTeacher
          : undefined,
        result.sourceTeacher,
      )
    )
      throw Error("unit-receipt-replay-binding");
    if (receipt.source === "real_provider") {
      verifyRealReceipt(
        receipt,
        presentation.requestBodyHash,
        presentation.maxOutputTokens,
      );
    }
    const reviewed = applyReviewedActiveFeedback(result);
    return reviewed === result ? record : { ...record, result: reviewed };
  }
  async intent(taskId: string): Promise<boolean> {
    return (await this.json(this.path(taskId, "intent"))) !== null;
  }
  async acquire(
    task: UnitFeedbackTask,
    registrationVersion: string,
    requestBodyHash: string,
    requestBody: unknown,
    source: "synthetic_provider" | "real_provider" = "synthetic_provider",
  ) {
    if (unitDigest(requestBody) !== requestBodyHash)
      throw Error("unit-intent-body-binding");
    await mkdir(this.root, { recursive: true, mode: 0o700 });
    const lock = join(this.root, "active.lock"),
      token = randomUUID();
    try {
      await writeFile(lock, token, { flag: "wx", mode: 0o600 });
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === "EEXIST") return null;
      throw e;
    }
    const release = async () => {
      if ((await readFile(lock, "utf8")) === token) await unlink(lock);
    };
    try {
      await writeFile(
        this.path(task.taskId, "intent"),
        JSON.stringify({
          version: UNIT_SUBMISSION_VERSION,
          taskId: task.taskId,
          registrationVersion,
          requestBodyHash,
          requestBody,
          source,
          startedAt: new Date().toISOString(),
        }),
        { flag: "wx", mode: 0o600 },
      );
    } catch (e) {
      await release();
      if ((e as NodeJS.ErrnoException).code === "EEXIST") return null;
      throw e;
    }
    return release;
  }
  async save(record: StoredUnitSubmission) {
    const parsed = storedSchema.parse(record);
    const target = this.path(parsed.taskId),
      temp = `${target}.${randomUUID()}.tmp`;
    if ((await this.json(target)) !== null)
      throw Error("unit-archive-already-saved");
    await writeFile(
      temp,
      JSON.stringify({ record: parsed, checksum: unitDigest(parsed) }),
      { flag: "wx", mode: 0o600 },
    );
    try {
      await rename(temp, target);
    } catch (e) {
      await unlink(temp).catch(() => {});
      throw e;
    }
  }
}

/** Mechanical receipt adoption only; callers still independently review semantics. */
export function resultFromSyntheticReceipt(
  task: UnitFeedbackTask,
  receipt: SyntheticUnitReceipt,
  at: string,
): UnitFeedbackResult {
  return resultFromUnitReceipt(task, receipt, at);
}

export function verifyRealReceipt(
  receipt: RealUnitReceipt,
  bodyHash?: string,
  maxOutputTokens?: number,
) {
  const cost = calculateCost(
    receipt.usage,
    receipt.actualModel,
    receipt.price,
    receipt,
  );
  if (
    receipt.status !== 200 ||
    (receipt.outputChannel === "tool_arguments" &&
      (receipt.finishReason !== "tool_calls" ||
        !receipt.toolCallId ||
        receipt.toolName !== "submit_teacher_feedback" ||
        receipt.endpoint !==
          "https://api.deepseek.com/beta/chat/completions")) ||
    (receipt.outputChannel === undefined &&
      receipt.finishReason !== undefined &&
      receipt.finishReason !== "stop") ||
    receipt.failure !== null ||
    !receipt.responseId ||
    receipt.actualModel !== receipt.requestedModel ||
    receipt.price.model !== receipt.requestedModel ||
    receipt.price.sourceUrl !==
      "https://api-docs.deepseek.com/zh-cn/quick_start/pricing/" ||
    cost.currency !== "CNY" ||
    cost.amount === null ||
    cost.amount !== receipt.costCNY ||
    cost.amount > receipt.reservationCNY ||
    (receipt.usage.inputTokens ?? Infinity) > receipt.inputCeiling ||
    (receipt.usage.outputTokens ?? Infinity) > receipt.maxOutputTokens ||
    (receipt.usage.reasoningTokens ?? 0) > 0 ||
    (bodyHash !== undefined && receipt.requestBodyHash !== bodyHash) ||
    (maxOutputTokens !== undefined &&
      receipt.maxOutputTokens !== maxOutputTokens)
  )
    throw Error("real-unit-receipt-accounting-unverified");
}

/** Real trial receipts remain explicitly synthetic data; never imply professional acceptance. */
export function resultFromUnitReceipt(
  task: UnitFeedbackTask,
  receipt: z.infer<typeof unitReceiptSchema>,
  at: string,
): UnitFeedbackResult {
  if (receipt.status !== 200 || receipt.failure !== null)
    throw Error("unit-provider-failed");
  const presentation = presentUnitFeedbackReceipt(
    task,
    receipt.text,
    receipt.source === "real_provider" ? receipt.requestBodyHash : undefined,
  );
  if (receipt.source === "real_provider")
    verifyRealReceipt(
      receipt,
      presentation.requestBodyHash,
      presentation.maxOutputTokens,
    );
  const view = presentation.view;
  if (view.status === "system_error" || view.status === "no_answer")
    throw Error("synthetic-provider-unassessed");
  const receiptHash = unitDigest(receipt);
  return validateUnitFeedbackResult({
    version: "unit-feedback-v1",
    id: unitDigest({ taskId: task.taskId, receiptHash }),
    createdAt: at,
    source:
      receipt.source === "real_provider" ? "real_provider" : "offline_test",
    purpose:
      receipt.source === "real_provider"
        ? (receipt.purpose ?? "synthetic_validation")
        : "synthetic_validation",
    view,
    ...("sourceTeacher" in presentation
      ? { sourceTeacher: presentation.sourceTeacher }
      : {}),
    receipt: { responseId: receipt.responseId, receiptHash },
  });
}
