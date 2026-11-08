import { createHash } from "node:crypto";
import { exerciseFor } from "../content/fault-catalog";
import { studentAnswerReference } from "../content/student-answer-reference";
import { prepareRegisteredTeacherVoice } from "./registered-clear-feedback";
import { readRegisteredDirectTeaching } from "./registered-direct-teaching";
import type { RegisteredStrictBinding } from "./registered-strict-output-candidate";
import type { UnitFeedbackTask } from "./unit-feedback";
import { parseUniqueJson } from "./unique-json";

export const REGISTERED_READING_REFERENCE_VERSION =
  "registered-reading-reference-20261019.v1";
const digest = (value: unknown) =>
  createHash("sha256").update(JSON.stringify(value)).digest("hex");

/** Same voice instructions, schema and criterion descriptions. Replace only
 * the already-present teaching reference with the exact editorial reading copy.
 * The old task/publication remains available for historical receipt decoding. */
export function prepareRegisteredReadingReference(task: UnitFeedbackTask) {
  const copy = studentAnswerReference({
    questionId: task.input.caseId,
    questionRevision: task.input.caseRevision,
    originalReference: exerciseFor(task.input.caseId)?.reference,
    contentId: task.contentId,
  });
  if (!copy) throw Error("reading-reference-publication");
  const body = structuredClone(prepareRegisteredTeacherVoice(task).body);
  const user = body.messages.find((m) => m.role === "user");
  if (!user) throw Error("reading-reference-input");
  const data = parseUniqueJson(user.content) as {
    criteria: { id: string; description: string; ruleBasis: string }[];
  };
  if (
    !Array.isArray(data.criteria) ||
    data.criteria.length !== task.input.criteria.length
  )
    throw Error("reading-reference-criteria");
  for (const [i, criterion] of data.criteria.entries()) {
    if (
      criterion.id !== task.input.criteria[i].id ||
      typeof criterion.ruleBasis !== "string" ||
      criterion.ruleBasis.split(copy.originalReference).length !== 2
    )
      throw Error("reading-reference-source");
    criterion.ruleBasis = criterion.ruleBasis.replace(
      copy.originalReference,
      copy.paragraphs.join("\n\n"),
    );
  }
  user.content = JSON.stringify(data);
  return {
    protocol: REGISTERED_READING_REFERENCE_VERSION,
    taskId: digest({
      version: REGISTERED_READING_REFERENCE_VERSION,
      referenceVersion: copy.version,
      taskId: task.taskId,
      body,
    }),
    bodySHA256: digest(body),
    body,
  };
}

export function presentRegisteredReadingReference(
  task: UnitFeedbackTask,
  text: string,
  binding: RegisteredStrictBinding,
) {
  const prepared = prepareRegisteredReadingReference(task);
  if (
    binding.protocol !== prepared.protocol ||
    binding.taskId !== prepared.taskId ||
    binding.bodySHA256 !== prepared.bodySHA256
  )
    throw Error("reading-reference-receipt-binding");
  return {
    ...prepared,
    rawArguments: text,
    feedback: readRegisteredDirectTeaching(task, text),
  };
}
