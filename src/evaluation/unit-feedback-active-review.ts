import { createHash } from "node:crypto";
import type { UnitFeedbackResult } from "./unit-feedback-contract";

const viewSHA = (result: UnitFeedbackResult) =>
  createHash("sha256").update(JSON.stringify(result.view)).digest("hex");

/** One reviewed fictional receipt only. This does not correct future model output,
 * regrade, change the archived reply, or hold any other answer to this question. */
export function applyReviewedActiveFeedback(
  result: UnitFeedbackResult,
): UnitFeedbackResult {
  if (
    result.source !== "real_provider" ||
    result.purpose !== "synthetic_validation" ||
    result.id !==
      "4455bf2cfa70463772feea4907995a95b236396a97fd04b0f4498551ff58f06e" ||
    result.receipt.responseId !== "4a7ce1f8-9f0f-445f-b70a-286598efe3af" ||
    result.receipt.receiptHash !==
      "21df6ce35e9034ab523eb04b1877670cc6b7cb8d69f6b3c5fe90da9a0c3d8683" ||
    viewSHA(result) !==
      "09bef7b887a061b9a645622706707477918b841b909b9b6217a6cf99a5cd83e9"
  )
    return result;
  return {
    ...result,
    pointReviews: [
      {
        criterionId: "cl14-rail-unrelated-accident-p1",
        state: "note",
        source: "codex_independent",
        note: "原模型未提出这项澄清：原 uncertain 标签及相反立场说明可用。请说明你最终坚持违规必须导致事故，还是坚持可以跳过联系肯定适用；原答明确保留了两种相反判断，不能据此宣称已改正。",
      },
      {
        criterionId: "cl14-rail-unrelated-accident-p2",
        state: "needs_review",
        source: "codex_independent",
        note: "原答已完整说明设备正常且未用于该车、丁无指令、别处落石事故及题述违规未连到碰撞，模型理由前半的事实承认可用。原 partial 标签及由第一项规则冲突产生的连带不足归因待核，不把这些已表达事实记作漏答，也不自动替模型改为 covered。",
      },
    ],
  };
}
