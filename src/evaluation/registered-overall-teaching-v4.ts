import { createHash } from "node:crypto";
import type { UnitFeedbackTask } from "./unit-feedback";
import {
  OVERALL_OUTPUT_SCHEMA_MARKER,
  prepareRegisteredOverallTeachingV3,
} from "./registered-overall-teaching-v3";

export const REGISTERED_OVERALL_V4_VERSION =
  "registered-overall-teaching-20261010.v4";
export const COMPLETE_ANSWER_TEACHING =
  "最后根据本问的实际判断选择studentResponse的写法，而不是固定追加提醒。" +
  "如果status为assessed且所有criteria均为covered，只写一句具体肯定：这份答案的结论正确，并点到原答已经说对的一处理由即可，到此结束。" +
  "全对时不要再说注意、但、不要泛化、还需、建议复习等未实际发生的问题；不复述全部条件，不假设学生以后会错，不安排重答或新问题，通常不超过70字。" +
  "只有本问确有partial、missing或contradicted时才说明对应错漏及改法；有uncertain或需要澄清时如实指出未知，不套用全对肯定。" +
  "此写法只影响给答题者的回应，不删改criteria、引文、reason或保存结果；是否推荐另一题由本地练习流程处理，你不能假装知道历史表现。";

export function prepareRegisteredOverallTeachingV4(task: UnitFeedbackTask) {
  const body = structuredClone(prepareRegisteredOverallTeachingV3(task).body);
  const system = body.messages.find((m) => m.role === "system")!;
  system.content = system.content.replace(
    OVERALL_OUTPUT_SCHEMA_MARKER,
    "\n\n" + COMPLETE_ANSWER_TEACHING + OVERALL_OUTPUT_SCHEMA_MARKER,
  );
  return {
    protocol: REGISTERED_OVERALL_V4_VERSION,
    taskId: createHash("sha256")
      .update(
        JSON.stringify({
          version: REGISTERED_OVERALL_V4_VERSION,
          taskId: task.taskId,
          body,
        }),
      )
      .digest("hex"),
    body,
  };
}
