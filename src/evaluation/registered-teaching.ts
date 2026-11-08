import { createHash } from "node:crypto";
import {
  unitFeedbackRequestBody,
  type UnitFeedbackTask,
} from "./unit-feedback";

export const REGISTERED_TEACHING_VERSION =
  "registered-direct-teaching-20261010.v1";
export const REGISTERED_TEACHING_STYLE = "direct-learner-v1" as const;

// Subject-neutral teaching instructions. Facts, legal sources, criteria, labels
// and the complete question remain supplied by the existing task, unchanged.
export const REGISTERED_TEACHING_INSTRUCTIONS =
  "你正在辅导写下这份原答的人。reason、substantiveIssue、clarification直接写给对方，可称‘你’，不要写成向阅卷者汇报的‘学生指出’或‘考生认为’。" +
  "先完整读原答，再按本题原要求判断。已表达的事实、身份、地点与其法律效果分别核对：事实说对而推理错，应承认前者并解释后者，不能把说过的内容又写成漏答。" +
  "整项有错误时，也先简短保留其中确实答对且与本题有关的联系，再说明具体错在什么条件、规则或推论及为什么；不可为了鼓励虚构正确之处，也不能因出现正确词而忽略最终相反判断。明确错误不能淡化为仅缺理由。" +
  "reason要针对这一份原答，把已有正确联系和需改之处说清；全对只作具体、简短确认，不再重复证明或增加任务。substantiveIssue有必要时给一段简短总提醒，先肯定可保留的关键部分，再指出核心转折，不逐点重复，不代写整段范文。" +
  "材料未提供的条件保持未知，不替题设补事实；只按本题设问、依据和必答边界，不增加本题外的责任或固定措辞要求。" +
  "解释里用引号引用答题者的话时，必须是原文连续片段；意译不要冒充原话。证据数组保留原文，原有标签含义、必填字段与JSON结构规则不变。";

export function supportsRegisteredTeaching(task: UnitFeedbackTask) {
  return (
    task.registeredQuestion?.kind === "subjective" &&
    !!task.registeredModelRequest &&
    !task.shortTable &&
    !task.objective &&
    task.input.criteria.length > 0
  );
}

/** Separate wire version keeps native task IDs and archived requests stable. */
export function prepareRegisteredTeaching(task: UnitFeedbackTask) {
  if (!supportsRegisteredTeaching(task))
    throw Error("registered-teaching-scope");
  const body = structuredClone(unitFeedbackRequestBody(task));
  const system = body.messages.find((message) => message.role === "system");
  if (!system) throw Error("registered-teaching-instructions");
  system.content = REGISTERED_TEACHING_INSTRUCTIONS + "\n\n" + system.content;
  const taskId = createHash("sha256")
    .update(
      JSON.stringify({
        version: REGISTERED_TEACHING_VERSION,
        taskId: task.taskId,
        body,
      }),
    )
    .digest("hex");
  return { protocol: REGISTERED_TEACHING_VERSION, taskId, body };
}
