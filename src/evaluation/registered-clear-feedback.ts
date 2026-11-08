import { createHash } from "node:crypto";
import {
  prepareRegisteredDirectTeaching,
  readRegisteredDirectTeaching,
} from "./registered-direct-teaching";
import { REGISTERED_OVERALL_V3_INSTRUCTIONS } from "./registered-overall-teaching-v3";
import { COMPLETE_ANSWER_TEACHING } from "./registered-overall-teaching-v4";
import type { RegisteredStrictBinding } from "./registered-strict-output-candidate";
import type { UnitFeedbackTask } from "./unit-feedback";

export const REGISTERED_CLEAR_FEEDBACK_VERSION =
  "registered-clear-feedback-20261018.v1";

// Replace the old writing blocks, not the legal judgment rules or wire schema.
// This is general language: no question-specific examples or extra model call.
export const CLEAR_FEEDBACK_WRITING =
  "保留现有字段及逐项判断规则，先完成criteria的status、evidence和reason。reason直接给学生阅读：说明本项原答已表达什么；存在错漏时，说明具体错漏、应补的法律关系及其与案情的联系。关键条件直接展开，不只写简称；不新增本题要求。" +
  "studentResponse作简短总评，说明本次答案的情况并点出最重要的改进，逐项细节由reason说明，避免重复。没有错漏就具体确认已答到的内容，不强行提改进；不确定时如实说明原因，按已有规则处理澄清。" +
  "直接称呼你，使用自然具体的法律分析，不含标题、列表或后台字段名；不要代写整份参考答案，虚构分数、历史表现或掌握程度。全部输出字段以该函数的唯一参数Schema为准。";

const digest = (value: unknown) =>
  createHash("sha256").update(JSON.stringify(value)).digest("hex");

function replaceOnce(source: string, before: string, after: string) {
  if (source.split(before).length !== 2)
    throw Error("clear-feedback-instruction-drift");
  return source.replace(before, after);
}

export function prepareRegisteredClearFeedback(task: UnitFeedbackTask) {
  const body = structuredClone(prepareRegisteredDirectTeaching(task).body);
  const system = body.messages.find((message) => message.role === "system")!;
  const previousWriting = REGISTERED_OVERALL_V3_INSTRUCTIONS.replace(
    "全部输出字段以本消息唯一的Schema为准。",
    "全部输出字段以该函数的唯一参数 Schema 为准。",
  );
  system.content = replaceOnce(
    system.content,
    previousWriting,
    CLEAR_FEEDBACK_WRITING,
  );
  system.content = replaceOnce(system.content, COMPLETE_ANSWER_TEACHING, "");
  system.content = replaceOnce(
    system.content,
    "studentResponse是给学生的一次完整正文；逐项reason和结构化clarification仍保存供核对，页面不会在正文后补上一段同义追问或未决说明。",
    "",
  );
  return {
    protocol: REGISTERED_CLEAR_FEEDBACK_VERSION,
    taskId: digest({
      version: REGISTERED_CLEAR_FEEDBACK_VERSION,
      taskId: task.taskId,
      body,
    }),
    bodySHA256: digest(body),
    body,
  };
}

export function presentRegisteredClearFeedback(
  task: UnitFeedbackTask,
  rawArguments: string,
  binding: RegisteredStrictBinding,
) {
  const prepared = prepareRegisteredClearFeedback(task);
  if (
    binding.protocol !== prepared.protocol ||
    binding.taskId !== prepared.taskId ||
    binding.bodySHA256 !== prepared.bodySHA256
  )
    throw Error("clear-feedback-receipt-binding");
  return {
    ...prepared,
    rawArguments,
    feedback: readRegisteredDirectTeaching(task, rawArguments),
  };
}

export const REGISTERED_TEACHER_VOICE_VERSION =
  "registered-teacher-voice-20261018.v1";
export const TEACHER_VOICE_WRITING =
  "逐项判断仍按原规则完成，reason保留供核对。studentResponse是给考生的讲解：直接说你这题答对了什么；有错漏，就讲清哪里不对、为什么，以及该补哪层意思。关键条件用完整的话讲出来，不只报术语。" +
  "结论能确定就直接讲清；缺少决定结论的事实，就明确说缺哪个事实、两种情况下分别怎么判断，不用空泛的保留措辞。全对就简短确认，不硬找改进。" +
  "用自然口语，像老师当面讲题；不写审核报告、系统声明或泛泛的学习建议，不重复整份参考答案，不虚构分数、经历或掌握程度。全部输出字段以该函数的唯一参数Schema为准。";

/** Voice-only candidate; v1 writing and all historical request hashes stay exact. */
export function prepareRegisteredTeacherVoice(task: UnitFeedbackTask) {
  const body = structuredClone(prepareRegisteredClearFeedback(task).body);
  const system = body.messages.find((message) => message.role === "system")!;
  system.content = replaceOnce(
    system.content,
    CLEAR_FEEDBACK_WRITING,
    TEACHER_VOICE_WRITING,
  );
  return {
    protocol: REGISTERED_TEACHER_VOICE_VERSION,
    taskId: digest({
      version: REGISTERED_TEACHER_VOICE_VERSION,
      taskId: task.taskId,
      body,
    }),
    bodySHA256: digest(body),
    body,
  };
}

export function presentRegisteredTeacherVoice(
  task: UnitFeedbackTask,
  rawArguments: string,
  binding: RegisteredStrictBinding,
) {
  const prepared = prepareRegisteredTeacherVoice(task);
  if (
    binding.protocol !== prepared.protocol ||
    binding.taskId !== prepared.taskId ||
    binding.bodySHA256 !== prepared.bodySHA256
  )
    throw Error("teacher-voice-receipt-binding");
  return {
    ...prepared,
    rawArguments,
    feedback: readRegisteredDirectTeaching(task, rawArguments),
  };
}
