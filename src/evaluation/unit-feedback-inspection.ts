import { readFile } from "node:fs/promises";
import { join } from "node:path";
import {
  storedUnitSubmissionSchema,
  unitDigest,
} from "./unit-feedback-storage";
import { validateUnitFeedbackResult } from "./unit-feedback-contract";

/** Explicit one-record local inspection. No enumeration, mutation, provider or credential access. */
export async function readUnitFeedbackInspection(repo: string, taskId: string) {
  if (!/^[a-f0-9]{64}$/.test(taskId)) throw Error("invalid-unit-task-id");
  const bytes = await readFile(
    join(repo, "artifacts", "unit-feedback-submissions", `${taskId}.json`),
  );
  if (bytes.length > 512000) throw Error("unit-archive-size");
  const wrapper = JSON.parse(bytes.toString("utf8"));
  const record = storedUnitSubmissionSchema.parse(wrapper.record);
  if (wrapper.checksum !== unitDigest(record) || record.taskId !== taskId)
    throw Error("unit-archive-binding");
  if (record.result) {
    validateUnitFeedbackResult(record.result, { taskId });
    if (
      !record.sourceReceipt ||
      record.outcome !== "accepted" ||
      record.failure !== null
    )
      throw Error("unit-archive-incomplete");
    const receipt = record.sourceReceipt;
    if (
      record.result.receipt.receiptHash !== unitDigest(receipt) ||
      record.result.receipt.responseId !== receipt.responseId ||
      record.result.id !==
        unitDigest({ taskId, receiptHash: unitDigest(receipt) }) ||
      receipt.status !== 200 ||
      receipt.failure !== null
    )
      throw Error("unit-receipt-binding");
  } else if (record.outcome !== "failed" || !record.failure) {
    throw Error("unit-failure-archive-binding");
  }
  return record;
}

export function allowUnitFeedbackInspection(
  host: string | null,
  site: string | null,
  mode?: string,
) {
  return (
    mode !== "trial" &&
    site !== "cross-site" &&
    ["localhost:3107", "127.0.0.1:3107"].includes(host ?? "")
  );
}
