import { createHash } from "node:crypto";
import { exerciseFor } from "../content/fault-catalog";
import { studentAnswerReference } from "../content/student-answer-reference";
import { parseUniqueJson } from "./unique-json";
import {
  unitFeedbackRequestBody,
  presentRegisteredFeedbackText,
  type UnitFeedbackTask,
} from "./unit-feedback";

export const REGISTERED_OBJECTIVE_READING_REFERENCE_VERSION =
  "registered-objective-reading-reference-20261019.v1";
const digest = (x: unknown) =>
  createHash("sha256").update(JSON.stringify(x)).digest("hex");

/** Replace the existing reference field only. Selection correctness still comes
 * from the original code-owned answer key, and native old requests stay exact. */
export function prepareRegisteredObjectiveReadingReference(
  task: UnitFeedbackTask,
) {
  if (!task.objective || !task.registeredModelRequest)
    throw Error("objective-reading-reference-scope");
  const copy = studentAnswerReference({
    questionId: task.input.caseId,
    questionRevision: task.input.caseRevision,
    contentId: task.contentId,
    originalReference: exerciseFor(task.input.caseId)?.reference,
  });
  if (!copy) throw Error("objective-reading-reference-publication");
  const body = structuredClone(unitFeedbackRequestBody(task));
  const user = body.messages.find((m) => m.role === "user");
  if (!user) throw Error("objective-reading-reference-user");
  const data = parseUniqueJson(user.content) as { reference?: string };
  if (data.reference !== copy.originalReference)
    throw Error("objective-reading-reference-source");
  data.reference = copy.paragraphs.join("\n\n");
  user.content = JSON.stringify(data);
  return {
    protocol: REGISTERED_OBJECTIVE_READING_REFERENCE_VERSION,
    taskId: digest({
      version: REGISTERED_OBJECTIVE_READING_REFERENCE_VERSION,
      referenceVersion: copy.version,
      taskId: task.taskId,
      body,
    }),
    bodySHA256: digest(body),
    body,
  };
}

export function presentRegisteredObjectiveReadingReference(
  task: UnitFeedbackTask,
  text: string,
  binding: { protocol: string; taskId: string; bodySHA256: string },
) {
  const prepared = prepareRegisteredObjectiveReadingReference(task);
  if (
    binding.protocol !== prepared.protocol ||
    binding.taskId !== prepared.taskId ||
    binding.bodySHA256 !== prepared.bodySHA256
  )
    throw Error("objective-reading-reference-receipt-binding");
  return { ...prepared, feedback: presentRegisteredFeedbackText(task, text) };
}
