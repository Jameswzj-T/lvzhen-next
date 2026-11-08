import { createHash } from "node:crypto";
import { z } from "zod";
import { resultSchema } from "./index";
import { parseUniqueJson } from "./unique-json";
import { supportsRegisteredTeaching } from "./registered-teaching";
import {
  unitFeedbackRequestBody,
  presentRegisteredFeedbackText,
  type UnitFeedbackTask,
} from "./unit-feedback";

export const REGISTERED_OVERALL_TEACHING_VERSION =
  "registered-overall-teaching-20261010.v2";
export const REGISTERED_OVERALL_TEACHING_STYLE = "direct-overall-v2" as const;
export const REGISTERED_OVERALL_TEACHING_INSTRUCTIONS =
  "本次回复区分内部核对记录和给答题者的一次整体回应，仍在同一个JSON、同一次调用中完成。先按下方原规则完成所有criteria的status、evidence、reason，不改变采分含义、等义要求和未知边界；reason是保留供查阅的逐项核对记录，不是学生默认阅读的正文。" +
  "在原JSON顶层另加studentResponse字符串，其他字段和结构保持。studentResponse只能根据你已作出的本问判断、原答及其依据，对写答案的人说一段正常老师会说的话，不按采分点逐条重复解释。不得另起标准、偷改判断或把系统错误当学生错误。" +
  "有错时，用2至3句说清：哪一句或哪一层意思可以保留；关键推论为什么错；把它改向哪里。同一个错误不因关联两个采分点而重复讲。明确错误就说明错因，不说成只是没写；材料未知不能说成学生漏答。" +
  "全对时，通常只用1至2句确认这个答案具体抓住了什么，不再列未犯的错误、不解释所有排除项、不重复一遍标准答案，也不要安排补课、重写或新增问题。" +
  "直接说你，使用自然具体的法律分析；不要出现符合本要点、无需补正、故该识别不完整、识别要素等核对报告套话。不要夸张鼓励、评估掌握程度或假装知道前次作答。" +
  "studentResponse通常50至120字，按实际需要更短；先删重复，不省关键条件。有疑点就具体指出哪里暂时不能判断。需要引用原答时，只能用连续原文，意译不加引号。正文不含标题、列表或后台字段名。不要输出示例答案以冒充反馈。";

export function prepareRegisteredOverallTeaching(task: UnitFeedbackTask) {
  if (!supportsRegisteredTeaching(task)) throw Error("overall-teaching-scope");
  const body = structuredClone(unitFeedbackRequestBody(task));
  const system = body.messages.find((m) => m.role === "system");
  if (!system) throw Error("overall-teaching-instructions");
  system.content =
    system.content + "\n\n" + REGISTERED_OVERALL_TEACHING_INSTRUCTIONS;
  const taskId = createHash("sha256")
    .update(
      JSON.stringify({
        version: REGISTERED_OVERALL_TEACHING_VERSION,
        taskId: task.taskId,
        body,
      }),
    )
    .digest("hex");
  return { protocol: REGISTERED_OVERALL_TEACHING_VERSION, taskId, body };
}
const overallSchema = resultSchema
  .extend({
    studentResponse: z
      .string()
      .min(1)
      .max(800)
      .refine((s) => !!s.trim()),
  })
  .strict();
/** Preserve the raw receipt. Only the extra teaching field is separated from
 * the unchanged rubric result; neither labels nor explanations are rewritten. */
export function presentRegisteredOverallTeaching(
  task: UnitFeedbackTask,
  text: string,
) {
  const { studentResponse, ...assessment } = overallSchema.parse(
    parseUniqueJson(text),
  );
  return {
    ...presentRegisteredFeedbackText(task, JSON.stringify(assessment)),
    teachingStyle: REGISTERED_OVERALL_TEACHING_STYLE,
    studentResponse,
  };
}
