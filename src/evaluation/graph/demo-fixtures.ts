import { z } from "zod";
import { answerSegments } from "../evidence-references";
import type { Finding, ModelReader } from "./contracts";

export const demoScenario = z.enum([
  "normal",
  "uncertain",
  "disagreement",
  "invalid",
  "review_failure",
  "pause",
]);
export type DemoScenario = z.infer<typeof demoScenario>;
export const demoScenarios: { id: DemoScenario; title: string }[] = [
  { id: "normal", title: "正常完成" },
  { id: "uncertain", title: "首次不确定 → 局部复核" },
  { id: "disagreement", title: "两次判断分歧 → 保留待核对" },
  { id: "invalid", title: "一组返回格式错误" },
  { id: "review_failure", title: "复核请求无回执" },
  { id: "pause", title: "汇合后暂停 → 从断点继续" },
];
// Clearly labeled, read-only engineering data. NEVER evaluate arbitrary user text
// using these responses. Real-reader factories do not import this module.
export const demoAnswers = {
  short:
    "盗窃部分不构成一般自首，属于坦白。甲被抓获，没有自动投案，供述的是警方已掌握的盗窃，供述不能补足投案条件。另一起故意伤害可以以自首论。甲如实供述的是警方还未掌握的本人罪行，且故意伤害与盗窃属于不同种罪行。",
  long: "1.甲乙共同盗窃已经既遂。器材已锁入两人控制的货车，公司的占有被排除，两人已经建立控制。\n2.乙构成转化型抢劫，同一取财不再另算盗窃。丙始终追赶未失去踪迹，具有当场联系；乙为抗拒抓捕击打丙，属于抗拒抓捕的暴力。造成重伤属于抢劫致人重伤的加重情形。\n3.甲仍对共同盗窃既遂负责，不对乙后来的抢劫及重伤承担共犯责任。两人原来只商定盗窃，甲已离开且未参与或帮助暴力，后段超出共同犯意和实行范围。\n4.丁构成窝藏罪。他知道乙犯罪后仍提供房屋和车票帮助逃匿。丁不是先前盗窃或抢劫的共犯，因为事前不知情，也没有事前通谋，只在犯罪结束后帮助逃匿。\n5.甲成立一般自首，可以依法从宽而不当然免罚。甲经亲友规劝自行投案并如实供述本人罪行及所知同案情况，不要求他供述确实不知道的乙后续行为。",
};
export function demoReader(
  kind: keyof typeof demoAnswers,
  scenario: DemoScenario,
): ModelReader {
  return async (request, _signal, context) => {
    if (request.input.studentText !== demoAnswers[kind])
      throw new Error("fixture-answer-mismatch");
    const ids = request.input.criteria.map((c) => c.id);
    const target = kind === "short" ? "theft_reason" : "q2_reason";
    const review = context.phase === "review";
    const containsTarget = ids.includes(target);
    if (scenario === "review_failure" && review && containsTarget)
      throw new Error("simulated-no-receipt");
    if (scenario === "invalid" && containsTarget && !review)
      return {
        raw: { criteria: [] },
        source: "fixture",
        durationMs: 0,
        cost: 0,
        currency: "CNY",
      };
    const evidence = answerSegments(request.input.studentText).map((s) => s.id);
    const criteria: Finding[] = ids.map((id) => ({
      id,
      finding:
        id === target &&
        !review &&
        ["uncertain", "review_failure"].includes(scenario)
          ? "uncertain"
          : id === target && review && scenario === "disagreement"
            ? "incorrect"
            : "satisfied",
      evidenceIds: evidence,
      reason: "工程预设响应，用于验证流程，不代表模型对原答的判断。",
    }));
    return {
      raw: { criteria },
      source: "fixture",
      durationMs: 0,
      cost: 0,
      currency: "CNY",
    };
  };
}
