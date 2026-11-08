import type { BatchPlan, runBatch } from "./batch";
import type { Failure } from "./provider";
import { issueLabels } from "./diagnostics";

const failureLabels: Record<Failure, string> = {
  result_validation_error: "返回结果未通过字段或原文证据校验",
  result_parse_error: "回答内容无法解析为 JSON",
  response_parse_error: "接口响应无法解析为 JSON",
  response_shape_error: "接口响应结构不符合约定",
  http_error: "接口返回 HTTP 错误",
  transport_error: "请求传输失败",
  timeout: "请求超时",
  aborted: "请求已取消",
  refused: "模型拒绝回答",
  truncated: "回答达到输出限制，被截断",
  unexpected_finish: "接口以非预期状态结束",
  provider_system_error: "模型返回暂不能评阅",
  price_window_expired: "价格配置已过期",
};

/** Describe execution and mechanical validation, never imply teaching-quality acceptance. */
export function formatCalibrationReport(
  run: Awaited<ReturnType<typeof runBatch>>,
  plan: BatchPlan,
) {
  const { summary, records } = run;
  const lines = [
    summary.stopReason === "completed"
      ? "本批请求已完成。"
      : "本批已停止，未自动重试。",
    `已发出 ${summary.calls} 次请求；通过程序校验 ${summary.successes} 份，失败 ${summary.failures} 份，未执行 ${summary.remaining} 次。`,
  ];
  for (const entry of plan.models) {
    const rows = records.filter((r) => r.requestedModel === entry.config.model);
    const calls = rows.reduce(
      (sum, r) => sum + r.evaluation.measurement.callCount,
      0,
    );
    lines.push(
      summary.calls > summary.records
        ? `${entry.config.model}：已保存结果对应 ${calls} 次请求；未记录请求的归属待查。`
        : `${entry.config.model}：已请求 ${calls} 次；未发出 ${Math.max(0, entry.maxCalls - calls)} 次。`,
    );
  }
  for (const row of records) {
    const measure = row.evaluation.measurement;
    if (
      measure.callCount > 0 &&
      measure.cost === null &&
      measure.model &&
      measure.model !== row.requestedModel
    )
      lines.push(
        `费用待核对：${row.requestedModel} / ${row.sampleId}；接口返回的模型名称与请求不一致，尚未核实计价对应关系，未知费用不代表免费。`,
      );
    if (!row.evaluation.failure && !row.anomaly) continue;
    const reason = row.anomaly
      ? "关闭思考后仍检测到思考用量"
      : failureLabels[row.evaluation.failure!];
    lines.push(
      `失败位置：${row.requestedModel} / ${row.sampleId}；${reason}。`,
    );
    const detail = row.evaluation.diagnostic;
    if (detail) {
      for (const issue of detail.issues) {
        lines.push(
          `  ${issue.path.join(".") || "根对象"}：${issueLabels[issue.code] ?? "其他校验错误"}（${issue.code}）。`,
        );
      }
      if (detail.totalIssues > detail.issues.length)
        lines.push(
          `  共 ${detail.totalIssues} 项问题，记录前 ${detail.issues.length} 项。`,
        );
    } else if (row.evaluation.failure === "result_validation_error")
      lines.push("  这份历史记录没有具体校验原因，无法事后恢复。");
  }
  if (summary.calls > summary.records)
    lines.push(
      "有已发出的请求未形成完整结果记录，请检查保存状态，不要直接重跑。",
    );
  lines.push(
    `按公开费率计算的已知费用：${summary.knownCost === null ? "未知" : new Intl.NumberFormat("zh-CN", { maximumSignificantDigits: 10, useGrouping: false }).format(summary.knownCost)} ${summary.currency}；费用未知请求 ${summary.unknownCostCalls} 次。账户实际扣费需另核对。`,
  );
  lines.push(
    "通过程序校验不等于批改质量合格；还需逐题判读。停止原因：" +
      summary.stopReason,
  );
  return lines.join("\n");
}
