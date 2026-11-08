import { createHash } from "node:crypto";
import { z } from "zod";
import {
  buildModelInput,
  type EvaluationInput,
  type EvaluationResult,
} from "./index";
import { validationIssues } from "./diagnostics";
import { SEGMENT_VERSION } from "./evidence-references";
import {
  observationInstructions,
  observationPolicyVersion,
  protocolForObservationPolicy,
  criterionPolicySchema,
  observationInput,
  resolveObservations,
  validateCriterionPolicy,
  type ObservationOutput,
  type ObservationProtocol,
} from "./semantic-observations";

// Pure, opt-in boundary. No provider, storage, UI, retry, or numeric scoring.
export const OBSERVATION_FLOW_VERSION = "observation-assessment-v1";
export const UNIT_POLICY_VERSION = "all-required-error-before-uncertainty-v1";
const id = z.string().min(1);
const planSchema = z
  .object({
    version: id,
    caseId: id,
    caseRevision: id,
    criterionPolicy: criterionPolicySchema,
    units: z
      .array(
        z
          .object({
            id,
            title: id,
            criterionIds: z.array(id).min(1),
          })
          .strict(),
      )
      .min(1),
  })
  .strict();
export type ObservationPlan = z.infer<typeof planSchema>;

function validatePlan(input: EvaluationInput, raw: unknown) {
  const plan = planSchema.parse(raw);
  if (plan.caseId !== input.caseId || plan.caseRevision !== input.caseRevision)
    throw new Error("observation-plan-association-mismatch");
  validateCriterionPolicy(input, plan.criterionPolicy);
  const assigned = plan.units.flatMap((unit) => unit.criterionIds);
  // Each required observation belongs to exactly one unit in this first policy.
  if (
    new Set(plan.units.map((unit) => unit.id)).size !== plan.units.length ||
    new Set(assigned).size !== assigned.length ||
    assigned.length !== input.criteria.length ||
    input.criteria.some((criterion) => !assigned.includes(criterion.id))
  )
    throw new Error("observation-unit-membership-mismatch");
  return plan;
}

function freezeSnapshot<T>(value: T): T {
  if (value && typeof value === "object") {
    for (const child of Object.values(value)) freezeSnapshot(child);
    Object.freeze(value);
  }
  return value;
}

/** The caller supplies a pre-authored plan, never a model-generated policy. */
export function prepareObservationAssessment(
  input: EvaluationInput,
  rawPlan: unknown,
  protocol: ObservationProtocol = "observations-v1",
) {
  // Explicit allowlist also strips accidental test expectations/reference essays.
  const original = buildModelInput(input).data;
  const plan = validatePlan(original, rawPlan);
  const versions = {
    flow: OBSERVATION_FLOW_VERSION,
    pointPolicy: observationPolicyVersion(protocol),
    unitPolicy: UNIT_POLICY_VERSION,
    segments: SEGMENT_VERSION,
    plan: plan.version,
  };
  const request = original.studentText.trim()
    ? {
        instructions: observationInstructions(protocol),
        data: observationInput(original, plan.criterionPolicy, protocol),
      }
    : null;
  const snapshot = { original, plan, versions, request };
  // The request owner attaches this to the response outside the model's JSON.
  // It binds the exact answer/material/policies; it is not a provider call ledger.
  const requestId = createHash("sha256")
    .update(JSON.stringify(snapshot))
    .digest("hex");
  return freezeSnapshot({ requestId, ...snapshot });
}
export type ObservationAssessmentTask = ReturnType<
  typeof prepareObservationAssessment
>;

const replySchema = z.discriminatedUnion("status", [
  z
    .object({
      status: z.literal("completed"),
      requestId: id,
      observations: z.unknown(),
    })
    .strict(),
  z
    .object({
      status: z.literal("failed"),
      requestId: id,
      code: z.enum(["execution_failed", "execution_timeout"]),
    })
    .strict(),
]);
type CriterionStatus = EvaluationResult["criteria"][number]["status"];
export type ObservationUnitResult = ObservationPlan["units"][number] & {
  status: CriterionStatus;
};
export type ObservationAssessmentOutput = {
  requestId: string;
  versions: ObservationAssessmentTask["versions"];
  original: EvaluationInput;
  observations: ObservationOutput | null;
  result: EvaluationResult;
  units: ObservationUnitResult[];
  failure:
    | "invalid_reply"
    | "request_mismatch"
    | "invalid_observations"
    | "execution_failed"
    | "execution_timeout"
    | null;
  diagnostic: ReturnType<typeof validationIssues> | null;
};

function unitStatus(statuses: CriterionStatus[]): CriterionStatus {
  if (statuses.includes("contradicted")) return "contradicted";
  if (statuses.includes("uncertain")) return "uncertain";
  if (statuses.every((status) => status === "covered")) return "covered";
  if (statuses.every((status) => status === "missing")) return "missing";
  return "partial";
}

function unassessed(
  task: ObservationAssessmentTask,
  status: "no_answer" | "system_error",
  failure: ObservationAssessmentOutput["failure"],
  diagnostic: ObservationAssessmentOutput["diagnostic"] = null,
): ObservationAssessmentOutput {
  return {
    requestId: task.requestId,
    versions: task.versions,
    original: task.original,
    observations: null,
    result: {
      caseId: task.original.caseId,
      caseRevision: task.original.caseRevision,
      answerId: task.original.answerId,
      status,
      criteria: [],
      substantiveIssue: null,
      terminologyIssue: null,
      clarification: null,
    },
    units: [],
    failure,
    diagnostic,
  };
}

/** Mechanical validity and fixed aggregation, not independent legal judgment. */
export function completeObservationAssessment(
  task: ObservationAssessmentTask,
  rawReply: unknown,
): ObservationAssessmentOutput {
  if (!task.request) return unassessed(task, "no_answer", null);
  const parsed = replySchema.safeParse(rawReply);
  if (!parsed.success)
    return unassessed(
      task,
      "system_error",
      "invalid_reply",
      validationIssues(parsed.error),
    );
  const reply = parsed.data;
  if (reply.requestId !== task.requestId)
    return unassessed(task, "system_error", "request_mismatch");
  if (reply.status === "failed")
    return unassessed(task, "system_error", reply.code);
  try {
    const { observations, result } = resolveObservations(
      task.original,
      task.plan.criterionPolicy,
      reply.observations,
      protocolForObservationPolicy(task.versions.pointPolicy),
    );
    const criteria = new Map(
      result.criteria.map((criterion) => [criterion.id, criterion]),
    );
    return {
      requestId: task.requestId,
      versions: task.versions,
      original: task.original,
      observations,
      result,
      units: task.plan.units.map((unit) => ({
        ...unit,
        status: unitStatus(
          unit.criterionIds.map((id) => criteria.get(id)!.status),
        ),
      })),
      failure: null,
      diagnostic: null,
    };
  } catch (error) {
    // Do not turn malformed model output into omissions or retain exception text.
    return unassessed(
      task,
      "system_error",
      "invalid_observations",
      validationIssues(error),
    );
  }
}
