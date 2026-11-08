import { createHash } from "node:crypto";
import {
  exerciseFor,
  exerciseRevision,
  exerciseSources,
} from "../content/fault-catalog";
import type { ContentSources, UnitExercise } from "../content/fault-unit";
import {
  UNIT_FEEDBACK_REGISTRY_VERSION,
  unitFeedbackBinding,
  type UnitFeedbackBinding,
} from "./unit-feedback-catalog";
import {
  UNIT_FEEDBACK_VERSION,
  prepareUnitFeedback,
  type UnitFeedbackAttempt,
} from "./unit-feedback";

export type CurrentUnitFeedbackContent = {
  exercise: UnitExercise;
  revision: string;
  sources: ContentSources;
};

const sha256 = (text: string) =>
  createHash("sha256").update(text).digest("hex");

function currentContent(questionId: string): CurrentUnitFeedbackContent {
  const exercise = exerciseFor(questionId);
  if (!exercise) throw new Error("unit-feedback-registration-current-missing");
  return {
    exercise,
    revision: exerciseRevision(questionId),
    sources: exerciseSources(questionId),
  };
}

function prepareVerified(
  binding: UnitFeedbackBinding,
  current: CurrentUnitFeedbackContent,
  attempt: UnitFeedbackAttempt,
) {
  if (binding.registrationVersion !== UNIT_FEEDBACK_REGISTRY_VERSION)
    throw new Error("unit-feedback-registration-version");
  if (binding.protocolVersion !== UNIT_FEEDBACK_VERSION)
    throw new Error("unit-feedback-registration-protocol");
  if (
    current.exercise.id !== binding.questionId ||
    current.revision !== binding.questionRevision
  )
    throw new Error("unit-feedback-registration-question-version");

  // The author's source metadata and the reviewed public excerpt are separate
  // snapshots. Preserve their existing URLs; neither silently replaces the other.
  const sourceMetadata = [...current.exercise.sources]
    .sort()
    .map((sourceId) => {
      const source = current.sources[sourceId];
      if (!source) throw new Error("unit-feedback-registration-source-missing");
      return {
        sourceId,
        title: source.title,
        url: source.url,
        note: source.note,
      };
    });
  if (
    sha256(JSON.stringify(sourceMetadata)) !== binding.sourceMetadataFingerprint
  )
    throw new Error("unit-feedback-registration-source-changed");

  // Reuse the original preparation/hash algorithm. Wrapper identity never
  // enters definition, model input, contentId or the old view/task identities.
  const task = prepareUnitFeedback(
    current.exercise,
    current.revision,
    attempt,
    binding.publicRules,
  );
  const registeredCriteria = binding.criteria.map((item) => ({
    id: item.id,
    label: item.label,
    meaning: item.meaning,
    acceptable: item.acceptable,
    boundary: item.boundary,
  }));
  if (
    task.definition.title !== binding.title ||
    task.definition.facts !== binding.facts ||
    task.definition.prompt !== binding.prompt ||
    JSON.stringify(task.definition.criteria) !==
      JSON.stringify(registeredCriteria)
  )
    throw new Error("unit-feedback-registration-question-changed");
  if (task.definition.referenceFingerprint !== binding.referenceFingerprint)
    throw new Error("unit-feedback-registration-reference-changed");
  if (task.contentId !== binding.contentId)
    throw new Error("unit-feedback-registration-content-changed");
  if (sha256(task.instructions) !== binding.instructionsSha256)
    throw new Error("unit-feedback-registration-instructions-changed");
  return task;
}

/** Server-only adoption check; reads current public content every time, no cache. */
export function verifyRegisteredUnitFeedbackBinding(
  questionId: string,
  current?: CurrentUnitFeedbackContent,
): UnitFeedbackBinding | null {
  const registered = unitFeedbackBinding(questionId);
  if (!registered) return null;
  const binding = structuredClone(registered);
  prepareVerified(binding, current ?? currentContent(questionId), {
    id: "unit-feedback-registration-check",
    questionId,
    exerciseRevision: binding.questionRevision,
    raw: "",
  });
  return binding;
}

/** Pure task preparation, not a dispatch, storage or provider authorization. */
export function prepareRegisteredUnitFeedback(
  attempt: UnitFeedbackAttempt,
  current?: CurrentUnitFeedbackContent,
) {
  const registered = unitFeedbackBinding(attempt.questionId);
  if (!registered) throw new Error("unit-feedback-registration-not-registered");
  return prepareVerified(
    structuredClone(registered),
    current ?? currentContent(attempt.questionId),
    attempt,
  );
}
