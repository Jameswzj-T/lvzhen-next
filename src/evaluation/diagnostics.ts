import { z } from "zod";

export type ValidationIssue = { code: string; path: (string | number)[] };
export class ResultValidationError extends Error {
  constructor(public readonly issue: ValidationIssue) {
    super(issue.code);
  }
}

const fields = new Set([
  "caseId",
  "caseRevision",
  "answerId",
  "status",
  "criteria",
  "id",
  "evidence",
  "evidenceIds",
  "reason",
  "substantiveIssue",
  "terminologyIssue",
  "clarification",
  "kind",
  "meaning",
  "selfContradiction",
  "factualSupport",
  "finding",
  "choices",
  "finish_reason",
  "message",
  "content",
  "refusal",
]);
// Keep only our field names and array indices; never persist exception messages,
// unexpected property names, model-provided values, or a raw response body.
export function validationIssues(error: unknown) {
  const issues =
    error instanceof ResultValidationError
      ? [error.issue]
      : error instanceof z.ZodError
        ? error.issues
        : [{ code: "unclassified_validation_error", path: [] }];
  return {
    totalIssues: issues.length,
    issues: issues.slice(0, 20).map((issue) => ({
      code: issue.code,
      path: issue.path
        .slice(0, 8)
        .map((segment) =>
          typeof segment === "number" &&
          Number.isSafeInteger(segment) &&
          segment >= 0
            ? segment
            : typeof segment === "string" && fields.has(segment)
              ? segment
              : "unknown_field",
        ),
    })),
  };
}

export type ProviderDiagnostic = {
  stage:
    | "result_validation_error"
    | "result_parse_error"
    | "response_shape_error"
    | "response_parse_error";
  totalIssues: number;
  issues: ValidationIssue[];
};

export const issueLabels: Record<string, string> = {
  absent_has_evidence: "未表达项不应附上支持性原答引文",
  factual_support_applicability_mismatch: "事实理由字段与本项观察范围不符",
  unknown_evidence_reference: "引用编号不属于当前学生原文",
  duplicate_evidence_reference: "同一要点重复引用相同片段编号",
  invalid_type: "字段缺失或类型不符",
  invalid_value: "字段取值不在约定范围内",
  unrecognized_keys: "包含协议未允许的额外字段",
  too_small: "字段长度或项目数量不足",
  too_big: "字段长度或项目数量超限",
  association_mismatch: "题目、版本或答卷标识不一致",
  blank_status_mismatch: "空白答案与评阅状态不一致",
  unassessed_has_judgments: "未评阅状态中含有对学生的判断",
  criterion_set_mismatch: "评分要点有遗漏、重复或不匹配",
  clarification_status_mismatch: "澄清内容与评阅状态不一致",
  evidence_required: "该项判断缺少原文引证",
  evidence_not_original: "引证不是学生原文中的连续片段",
  invalid_json: "返回内容不是可解析的 JSON",
  duplicate_json_key: "同一对象重复输出字段，无法可靠解释",
};
