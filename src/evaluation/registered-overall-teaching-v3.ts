import { createHash } from "node:crypto";
import { z } from "zod";
import { resultSchema } from "./index";
import { parseUniqueJson } from "./unique-json";
import { supportsRegisteredTeaching } from "./registered-teaching";
import {
  REGISTERED_OVERALL_TEACHING_INSTRUCTIONS,
  REGISTERED_OVERALL_TEACHING_STYLE,
} from "./registered-overall-teaching";
import {
  unitFeedbackRequestBody,
  presentRegisteredFeedbackText,
  type UnitFeedbackTask,
} from "./unit-feedback";

export const REGISTERED_OVERALL_V3_VERSION =
  "registered-overall-teaching-20261010.v3";
export const OVERALL_OUTPUT_SCHEMA_MARKER = "\n输出 JSON Schema：\n";
// The same serializable schema supplies both the request contract and decoder.
// Keep the frozen v2 builder/decoder untouched for historical receipt hashes.
export const registeredOverallV3ResultSchema = resultSchema
  .extend({ studentResponse: z.string().min(1).max(800).regex(/\S/) })
  .strict();
export const REGISTERED_OVERALL_V3_INSTRUCTIONS =
  REGISTERED_OVERALL_TEACHING_INSTRUCTIONS.replace(
    "在原JSON顶层另加studentResponse字符串，其他字段和结构保持。",
    "JSON顶层的studentResponse是必填的非空白字符串，最多800字符；全部输出字段以本消息唯一的Schema为准。",
  );

export function prepareRegisteredOverallTeachingV3(task: UnitFeedbackTask) {
  if (!supportsRegisteredTeaching(task)) throw Error("overall-teaching-scope");
  const body = structuredClone(unitFeedbackRequestBody(task));
  const system = body.messages.find((m) => m.role === "system");
  const oldSuffix =
    OVERALL_OUTPUT_SCHEMA_MARKER + JSON.stringify(z.toJSONSchema(resultSchema));
  if (!system?.content.endsWith(oldSuffix))
    throw Error("overall-native-schema-boundary");
  system.content =
    system.content.slice(0, -oldSuffix.length) +
    "\n\n" +
    REGISTERED_OVERALL_V3_INSTRUCTIONS +
    OVERALL_OUTPUT_SCHEMA_MARKER +
    JSON.stringify(z.toJSONSchema(registeredOverallV3ResultSchema));
  const taskId = createHash("sha256")
    .update(
      JSON.stringify({
        version: REGISTERED_OVERALL_V3_VERSION,
        taskId: task.taskId,
        body,
      }),
    )
    .digest("hex");
  return { protocol: REGISTERED_OVERALL_V3_VERSION, taskId, body };
}

export function presentRegisteredOverallTeachingV3(
  task: UnitFeedbackTask,
  text: string,
) {
  const { studentResponse, ...assessment } =
    registeredOverallV3ResultSchema.parse(parseUniqueJson(text));
  return {
    ...presentRegisteredFeedbackText(task, JSON.stringify(assessment)),
    // Presentation is unchanged; trusted dispatch identifies the wire protocol.
    teachingStyle: REGISTERED_OVERALL_TEACHING_STYLE,
    studentResponse,
  };
}
