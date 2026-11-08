import type { EvaluationInput } from "../index";
import { resolveFindings } from "../criterion-findings";
import type { CallOutcome, Finding } from "./contracts";
import {
  validateStances,
  type StanceRequest,
  type StanceReadings,
} from "./structured-stance";

export { ITEM_GRAPH_VERSION } from "./structured-stance";
export type ValidationIssue = { id: string | null; code: string };
export type ItemValidation = {
  blocked: boolean;
  acceptedIds: string[];
  issues: ValidationIssue[];
};
type Result<T> = { items: T[]; validation: ItemValidation };
function blocked<T>(code: string): Result<T> {
  return {
    items: [],
    validation: {
      blocked: true,
      acceptedIds: [],
      issues: [{ id: null, code }],
    },
  };
}
// A validation error is only set by the adapters AFTER normal completion,
// refusal/timeout checks and strict unique-key JSON parsing. Never salvage a
// parse error, truncated response, refusal, timeout, or unknown request.
export function available(outcome: CallOutcome) {
  return (
    outcome.status === "completed" &&
    (!outcome.receipt.providerFailure ||
      outcome.receipt.providerFailure === "result_validation_error")
  );
}
function object(raw: unknown): raw is Record<string, unknown> {
  return !!raw && typeof raw === "object" && !Array.isArray(raw);
}
export function partition<T>(
  raw: unknown,
  field: string,
  ids: string[],
  options: { taskId?: string; maxBytes: number; maxItems: number },
  validate: (id: string, raw: unknown) => T,
): Result<T> {
  const keys = options.taskId === undefined ? [field] : [field, "taskId"];
  if (
    !object(raw) ||
    Object.keys(raw).length !== keys.length ||
    keys.some((k) => !(k in raw)) ||
    (options.taskId !== undefined && raw.taskId !== options.taskId) ||
    !Array.isArray(raw[field]) ||
    raw[field].length > options.maxItems ||
    Buffer.byteLength(JSON.stringify(raw), "utf8") > options.maxBytes
  )
    return blocked("invalid-envelope");
  const rows = raw[field] as unknown[];
  // Unknown identifiers have no trustworthy owner. Do not guess by a prefix or
  // discard them: they may contain a contradictory claim about a known item.
  if (
    rows.some(
      (row) =>
        !object(row) || typeof row.id !== "string" || !ids.includes(row.id),
    )
  )
    return blocked("unowned-item");
  const items: T[] = [],
    acceptedIds: string[] = [],
    issues: ValidationIssue[] = [];
  for (const id of ids) {
    const entries = rows.filter((row) => (row as { id: string }).id === id);
    if (entries.length !== 1) {
      issues.push({
        id,
        code: entries.length ? "duplicate-item" : "missing-item",
      });
      continue;
    }
    try {
      items.push(validate(id, entries[0]));
      acceptedIds.push(id);
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      issues.push({
        id,
        code: [
          "invalid-stance-status",
          "invalid-stance-citation",
          "invalid-stance-condition",
          "missing-stance-link",
        ].includes(message)
          ? message
          : "invalid-item",
      });
    }
  }
  return { items, validation: { blocked: false, acceptedIds, issues } };
}
export function validateStanceItems(
  request: StanceRequest,
  outcome: CallOutcome,
): Result<StanceReadings["propositions"][number]> {
  if (!available(outcome) || outcome.status !== "completed")
    return blocked("unusable-receipt");
  return partition(
    outcome.receipt.raw,
    "propositions",
    request.propositions.map((p) => p.id),
    { taskId: request.task.id, maxBytes: 12000, maxItems: 12 },
    (id, row) =>
      validateStances(
        {
          ...request,
          propositions: request.propositions.filter((p) => p.id === id),
        },
        { taskId: request.task.id, propositions: [row] },
      ).propositions[0],
  );
}
export function validateFindingItems(
  input: EvaluationInput,
  outcome: CallOutcome,
): Result<Finding> {
  if (!available(outcome) || outcome.status !== "completed")
    return blocked("unusable-receipt");
  return partition(
    outcome.receipt.raw,
    "criteria",
    input.criteria.map((p) => p.id),
    { maxBytes: 64000, maxItems: input.criteria.length * 2 },
    (id, row) =>
      resolveFindings(
        { ...input, criteria: input.criteria.filter((p) => p.id === id) },
        { criteria: [row] },
      ).observations.criteria[0],
  );
}
