import { createHash } from "node:crypto";
import {
  prepareRegisteredTeacherVoice,
  TEACHER_VOICE_WRITING,
} from "./registered-clear-feedback";
import { prepareRegisteredReadingReference } from "./registered-reading-reference";
import { readRegisteredDirectTeaching } from "./registered-direct-teaching";
import type { RegisteredStrictBinding } from "./registered-strict-output-candidate";
import type { UnitFeedbackTask } from "./unit-feedback";

export const REGISTERED_CONCISE_TEACHING_VERSION =
  "registered-concise-teaching-20261019.v1";
export const CONCISE_TEACHING_WRITING =
  "criteria按现有规则判断，reason保留完整依据。studentResponse只给学生读：用三至四个短句、总计150字以内，直接说本案结论，用案情讲关键理由，最后指出原答最要紧的一处改法。全对时简短确认即可。" +
  "用具体主语和直接判断，把法律术语讲成它在本题里的意思；优先正面说明事实和理由，必要的否定判断直接说清。题设足够时完成本案判断；确缺决定性资料时，说明具体缺项及其影响。全部输出字段以该函数的唯一参数Schema为准。";
const digest = (x: unknown) =>
  createHash("sha256").update(JSON.stringify(x)).digest("hex");

/** Replace the existing writing block; no extra prompt, node or semantic rule.
 * Full criterion reasoning stays in the existing on-demand reading panel. */
export function prepareRegisteredConciseTeaching(task: UnitFeedbackTask) {
  const original =
    task.input.caseId === "cl05-review-two-losses"
      ? prepareRegisteredReadingReference(task)
      : prepareRegisteredTeacherVoice(task);
  const body = structuredClone(original.body);
  const system = body.messages.find((m) => m.role === "system")!;
  if (system.content.split(TEACHER_VOICE_WRITING).length !== 2)
    throw Error("concise-writing-block");
  system.content = system.content.replace(
    TEACHER_VOICE_WRITING,
    CONCISE_TEACHING_WRITING,
  );
  return {
    protocol: REGISTERED_CONCISE_TEACHING_VERSION,
    taskId: digest({
      version: REGISTERED_CONCISE_TEACHING_VERSION,
      taskId: task.taskId,
      body,
    }),
    bodySHA256: digest(body),
    body,
  };
}
export function presentRegisteredConciseTeaching(
  task: UnitFeedbackTask,
  text: string,
  binding: RegisteredStrictBinding,
) {
  const prepared = prepareRegisteredConciseTeaching(task);
  if (
    binding.protocol !== prepared.protocol ||
    binding.taskId !== prepared.taskId ||
    binding.bodySHA256 !== prepared.bodySHA256
  )
    throw Error("concise-teaching-receipt-binding");
  return {
    ...prepared,
    rawArguments: text,
    feedback: readRegisteredDirectTeaching(task, text),
  };
}
