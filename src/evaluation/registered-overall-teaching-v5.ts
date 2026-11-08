import { createHash } from "node:crypto";
import type { UnitFeedbackTask } from "./unit-feedback";
import { OVERALL_OUTPUT_SCHEMA_MARKER } from "./registered-overall-teaching-v3";
import { prepareRegisteredOverallTeachingV4 } from "./registered-overall-teaching-v4";

export const REGISTERED_OVERALL_V5_VERSION =
  "registered-overall-teaching-20261010.v5";

// Generation guidance only. Do not rewrite stored prose, turn stylistic
// quotation mistakes into grading failures, or infer every quote's source.
export const FEEDBACK_QUOTATION_GUIDANCE =
  "studentResponse、reason等解释默认用普通语句转述，转述不加引号，也不写成‘你的原话是’。不要为了强调一个观点或缩短句子，给概括加单引号或双引号。" +
  "只有确需直接引用学生原答时才使用引号，且引号内须是当前studentText中逐字连续的原文，连标点也保留；不要删词、改词、拼接或用省略号合成一句所谓原话。需要压缩时，改用不加引号的普通转述。" +
  "法条、题干或给定规则的引用与学生引文分开，明确说明来源，不称为学生说过的话。法条或规则原文须来自给定的对应材料，不以是否出现在studentText中判断；材料只有摘要或教学参考时如实转述，不冒充法条全文。" +
  "criteria.evidence仍只保留学生当前原答的连续原文，不能放入法条、题干或参考作为其作答证据。以上只约束解释写法，不改变status、reason的实质判断、采分要求或未知边界。";

/** Preserve the exact v4 request builder for archived receipt hashes. */
export function prepareRegisteredOverallTeachingV5(task: UnitFeedbackTask) {
  const body = structuredClone(prepareRegisteredOverallTeachingV4(task).body);
  const system = body.messages.find((message) => message.role === "system")!;
  system.content = system.content.replace(
    OVERALL_OUTPUT_SCHEMA_MARKER,
    "\n\n" + FEEDBACK_QUOTATION_GUIDANCE + OVERALL_OUTPUT_SCHEMA_MARKER,
  );
  return {
    protocol: REGISTERED_OVERALL_V5_VERSION,
    taskId: createHash("sha256")
      .update(
        JSON.stringify({
          version: REGISTERED_OVERALL_V5_VERSION,
          taskId: task.taskId,
          body,
        }),
      )
      .digest("hex"),
    body,
  };
}
