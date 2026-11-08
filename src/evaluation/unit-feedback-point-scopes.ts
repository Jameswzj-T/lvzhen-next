import { createHash } from "node:crypto";
import bindings from "./unit-feedback-cl14-bindings.json";
import {
  unitFeedbackRequestBody,
  type UnitFeedbackTask,
} from "./unit-feedback";

export type PointReadingScope = {
  criterionId: string;
  kind: "rule_stance" | "fact_application";
  requirementQuote: string;
  requirementSource: "meaning" | "boundary";
  equivalenceBoundaryQuote: string;
  // Reviewed only for these two original teaching contracts. Not inferred by code.
  otherCriterionStanceDependency: "none_in_this_contract";
};

const scopes: Record<string, PointReadingScope[]> = {
  "cl14-flight-no-serious-result": [
    {
      criterionId: "cl14-flight-no-serious-result-p1",
      kind: "rule_stance",
      requirementQuote:
        bindings["cl14-flight-no-serious-result"].criteria[0].meaning,
      requirementSource: "meaning",
      equivalenceBoundaryQuote:
        bindings["cl14-flight-no-serious-result"].criteria[0].boundary,
      otherCriterionStanceDependency: "none_in_this_contract",
    },
    {
      criterionId: "cl14-flight-no-serious-result-p2",
      kind: "fact_application",
      requirementQuote: "没有题设所要求的严重结果，不能据此肯定本条",
      requirementSource: "boundary",
      equivalenceBoundaryQuote:
        bindings["cl14-flight-no-serious-result"].criteria[1].boundary,
      otherCriterionStanceDependency: "none_in_this_contract",
    },
  ],
  "cl14-rail-unrelated-accident": [
    {
      criterionId: "cl14-rail-unrelated-accident-p1",
      kind: "rule_stance",
      requirementQuote:
        bindings["cl14-rail-unrelated-accident"].criteria[0].meaning,
      requirementSource: "meaning",
      equivalenceBoundaryQuote:
        bindings["cl14-rail-unrelated-accident"].criteria[0].boundary,
      otherCriterionStanceDependency: "none_in_this_contract",
    },
    {
      criterionId: "cl14-rail-unrelated-accident-p2",
      kind: "fact_application",
      requirementQuote:
        "这次事故与漏检的设备和丁的操作没有给定联系，实际过程是别处落石导致碰撞",
      requirementSource: "boundary",
      equivalenceBoundaryQuote:
        bindings["cl14-rail-unrelated-accident"].criteria[1].boundary,
      otherCriterionStanceDependency: "none_in_this_contract",
    },
  ],
};

/** No registry expansion: accept only the existing, unchanged two-question content. */
export function pointReadingScopes(task: UnitFeedbackTask) {
  unitFeedbackRequestBody(task); // Existing v1 task/hash verification; no dispatch.
  const questionId = task.definition.questionId;
  const binding = bindings[questionId as keyof typeof bindings];
  const selected = scopes[questionId];
  const instructionsSha256 = createHash("sha256")
    .update(task.instructions)
    .digest("hex");
  if (
    !selected ||
    !binding ||
    task.contentId !== binding.contentId ||
    task.definition.revision !== binding.questionRevision ||
    instructionsSha256 !== binding.instructionsSha256 ||
    task.input.caseId !== questionId ||
    task.input.caseRevision !== task.definition.revision ||
    task.input.question !== task.definition.prompt ||
    task.input.facts !== task.definition.facts ||
    task.input.criteria.length !== selected.length
  )
    throw Error("unit-point-scope-content-binding");
  const ruleBasis = task.definition.rules
    .map(
      (rule) =>
        `${rule.title}\n${rule.excerpt}\n依据：${rule.url}\n范围：${rule.scope}`,
    )
    .join("\n\n");
  for (const scope of selected) {
    const criterion = task.definition.criteria.find(
      (item) => item.id === scope.criterionId,
    );
    const input = task.input.criteria.find(
      (item) => item.id === scope.criterionId,
    );
    if (
      !criterion ||
      !input ||
      !criterion[scope.requirementSource].includes(scope.requirementQuote) ||
      scope.equivalenceBoundaryQuote !== criterion.boundary ||
      input.description !==
        `要点：${criterion.label}\n采分含义：${criterion.meaning}\n` +
          `等义表达：${criterion.acceptable}\n必答边界：${criterion.boundary}` ||
      input.ruleBasis !== ruleBasis
    )
      throw Error("unit-point-scope-requirement-binding");
  }
  return structuredClone(selected);
}
