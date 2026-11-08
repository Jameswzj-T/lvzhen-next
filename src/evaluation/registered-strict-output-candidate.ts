import { createHash } from "node:crypto";
import { z } from "zod";
import { resultSchema } from "./index";
import { parseUniqueJson } from "./unique-json";
import { DEEPSEEK_TEACHER_TOOL } from "./deepseek-teacher-output";
import { prepareRegisteredStanceBoundaryCandidate } from "./registered-stance-boundary-candidate";
import {
  OVERALL_OUTPUT_SCHEMA_MARKER,
  registeredOverallV3ResultSchema,
  presentRegisteredOverallTeachingV3,
} from "./registered-overall-teaching-v3";
import type { UnitFeedbackTask } from "./unit-feedback";

export const REGISTERED_STRICT_OUTPUT_CANDIDATE_VERSION =
  "registered-strict-tool-20261012.candidate-v1";

// New wire representation only: these three fields use "" for no content.
// Raw nulls, duplicate keys and extra keys are rejected before projection.
// Historical v3/v5/stance decoders and receipts are not changed or repaired.
const wireSchema = registeredOverallV3ResultSchema
  .extend({
    substantiveIssue: z.string(),
    terminologyIssue: z.string(),
    clarification: z.string(),
  })
  .strict();

const digest = (value: unknown) =>
  createHash("sha256").update(JSON.stringify(value)).digest("hex");
const text = { type: "string" };
const nonblank = { type: "string", pattern: "\\S" };
const enumeration = (values: readonly string[]) => ({
  type: "string",
  enum: [...values],
});
const closed = (properties: Record<string, unknown>) => ({
  type: "object",
  properties,
  required: Object.keys(properties),
  additionalProperties: false,
});

// DeepSeek's documented subset, not OpenAI response_format:json_schema.
// Length, exact criterion coverage, quote origin and status relations remain
// enforced by the unchanged local schemas/validator after argument extraction.
function parameters(task: UnitFeedbackTask) {
  return closed({
    caseId: enumeration([task.input.caseId]),
    caseRevision: enumeration([task.input.caseRevision]),
    answerId: enumeration([task.input.answerId]),
    status: enumeration(resultSchema.shape.status.options),
    criteria: {
      type: "array",
      items: closed({
        id: enumeration(task.input.criteria.map((item) => item.id)),
        status: enumeration(
          resultSchema.shape.criteria.element.shape.status.options,
        ),
        evidence: { type: "array", items: nonblank },
        reason: nonblank,
      }),
    },
    substantiveIssue: text,
    terminologyIssue: text,
    clarification: text,
    studentResponse: nonblank,
  });
}

function replaceOnce(source: string, before: string, after: string) {
  if (source.split(before).length !== 2)
    throw Error("registered-strict-instruction-drift");
  return source.replace(before, after);
}

/** Unwired and pure: no provider execution, grant, storage or default change. */
export function prepareRegisteredStrictOutputCandidate(task: UnitFeedbackTask) {
  const body = structuredClone(
    prepareRegisteredStanceBoundaryCandidate(task).body,
  );
  const system = body.messages.find((message) => message.role === "system");
  const suffix =
    OVERALL_OUTPUT_SCHEMA_MARKER +
    JSON.stringify(z.toJSONSchema(registeredOverallV3ResultSchema));
  if (!system?.content.endsWith(suffix))
    throw Error("registered-strict-schema-boundary");
  system.content = system.content.slice(0, -suffix.length);
  const routingChanges = [
    ["返回 JSON，保留", `仅调用 ${DEEPSEEK_TEACHER_TOOL} 返回结果，保留`],
    ["后三项无内容为 null。", '后三项无内容为字符串 ""，不用 null。'],
    ["否则 clarification 必须为 null。", '否则 clarification 必须为 ""。'],
    [
      "substantiveIssue、terminologyIssue、clarification 均为 null。",
      'substantiveIssue、terminologyIssue、clarification 均为 ""。',
    ],
    [
      "严格按照下面的字段类型、必填字段及取值输出单个 JSON 对象，不加代码围栏或额外字段。Schema 是结构要求，不是学生答案或评分预期。",
      "严格按该函数的参数 Schema 返回一次结果，不输出普通消息或额外字段；Schema 是结构要求，不是评分预期。",
    ],
    [
      "全部输出字段以本消息唯一的Schema为准。",
      "全部输出字段以该函数的唯一参数 Schema 为准。",
    ],
  ];
  for (const [before, after] of routingChanges)
    system.content = replaceOnce(system.content, before, after);
  delete body.response_format;
  body.temperature = 0;
  body.tools = [
    {
      type: "function",
      function: {
        name: DEEPSEEK_TEACHER_TOOL,
        description: "提交当前完整小问的一份评阅结果；仅输出数据，不执行操作。",
        strict: true,
        parameters: structuredClone(parameters(task)),
      },
    },
  ];
  body.tool_choice = {
    type: "function",
    function: { name: DEEPSEEK_TEACHER_TOOL },
  };
  return {
    protocol: REGISTERED_STRICT_OUTPUT_CANDIDATE_VERSION,
    taskId: digest({
      version: REGISTERED_STRICT_OUTPUT_CANDIDATE_VERSION,
      taskId: task.taskId,
      body,
    }),
    bodySHA256: digest(body),
    body,
  };
}

export type RegisteredStrictBinding = {
  protocol: string;
  taskId: string;
  bodySHA256: string;
};

/** The future caller must supply trusted receipt/body identity, never a client
 * claim. Mechanical acceptance does not establish the model's legal reasoning. */
export function presentRegisteredStrictOutputCandidate(
  task: UnitFeedbackTask,
  rawArguments: string,
  binding: RegisteredStrictBinding,
) {
  const prepared = prepareRegisteredStrictOutputCandidate(task);
  if (
    binding.protocol !== prepared.protocol ||
    binding.taskId !== prepared.taskId ||
    binding.bodySHA256 !== prepared.bodySHA256
  )
    throw Error("registered-strict-receipt-binding");
  const raw = wireSchema.parse(parseUniqueJson(rawArguments));
  const result = {
    ...raw,
    substantiveIssue: raw.substantiveIssue === "" ? null : raw.substantiveIssue,
    terminologyIssue: raw.terminologyIssue === "" ? null : raw.terminologyIssue,
    clarification: raw.clarification === "" ? null : raw.clarification,
  };
  return {
    protocol: prepared.protocol,
    taskId: prepared.taskId,
    bodySHA256: prepared.bodySHA256,
    rawArguments,
    feedback: presentRegisteredOverallTeachingV3(task, JSON.stringify(result)),
  };
}
