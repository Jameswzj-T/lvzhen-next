import { findingsSchema, FINDING_POLICY_VERSION } from "./criterion-findings";
import {
  completeObservationAssessment,
  type ObservationAssessmentTask,
} from "./observation-assessment";

export const DUAL_READING_POLICY = "independent-findings-no-arbitration-v1";
// Source identities come from the server's provider configuration/receipt, not
// from the model's self-description. Different providers do not prove independent errors.
export type IndependentReading = {
  provider: "mimo" | "deepseek" | "qwen";
  model: string;
  reply: unknown;
};

/** Pure experimental comparison. No network, weighting, score or automatic winner. */
export function compareIndependentReadings(
  task: ObservationAssessmentTask,
  readings: readonly [IndependentReading, IndependentReading],
) {
  if (task.versions.pointPolicy !== FINDING_POLICY_VERSION)
    throw new Error("dual-reading-protocol-mismatch");
  const base = {
    requestId: task.requestId,
    policy: DUAL_READING_POLICY,
    canPublish: false as const,
    selectedModel: null,
  };
  if (!task.request)
    return { ...base, state: "no_answer" as const, points: [], readers: [] };
  if (
    readings[0].provider === readings[1].provider ||
    readings[0].model === readings[1].model ||
    readings.some((r) => !r.model.trim())
  )
    return {
      ...base,
      state: "invalid_readers" as const,
      points: [],
      readers: [],
    };
  const outputs = readings.map((r) =>
    completeObservationAssessment(task, r.reply),
  );
  const readers = readings.map((r, i) => ({
    provider: r.provider,
    model: r.model,
    failure: outputs[i].failure,
  }));
  if (outputs.some((out) => out.failure || out.result.status !== "assessed"))
    return { ...base, state: "cannot_compare" as const, points: [], readers };
  const pointsByReader = outputs.map((out) => {
    const wire = findingsSchema.parse(out.observations);
    return new Map(wire.criteria.map((c) => [c.id, c]));
  });
  const points = task.original.criteria.map(({ id }) => {
    const [a, b] = pointsByReader.map((items) => items.get(id)!);
    const commonEvidenceIds = a.evidenceIds.filter((id) =>
      b.evidenceIds.includes(id),
    );
    const state =
      a.finding !== b.finding
        ? "disagreement"
        : a.finding === "uncertain"
          ? "both_uncertain"
          : a.finding !== "absent" && commonEvidenceIds.length === 0
            ? "evidence_divergence"
            : "agree_unverified";
    return {
      id,
      state,
      commonEvidenceIds,
      readings: [a, b].map((point, i) => ({
        provider: readings[i].provider,
        model: readings[i].model,
        ...point,
      })),
    };
  });
  // Matching labels and overlapping quotes can still share the same wrong
  // interpretation. We retain both reasons; no prose merge or truth certificate.
  return { ...base, state: "compared" as const, points, readers };
}
