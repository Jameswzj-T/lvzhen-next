import type { CasePack, Finding, TaskGroup } from "./contracts";
import type { MeaningReading } from "./meaning-choice";
import { validateMeaningMenu } from "./meaning-choice-cards";
export const MEANING_CONSISTENCY_VERSION = "authored-premises-v1";
export type MeaningRef = { topicId: string; meaningId: string };
export type MeaningDependency = {
  id: string;
  when: MeaningRef;
  requires: MeaningRef[];
  rationale: string;
};
export type MeaningDependencies = {
  version: typeof MEANING_CONSISTENCY_VERSION;
  rules: MeaningDependency[];
};
export type MeaningConflict = {
  ruleId: string;
  relation: MeaningRef;
  prerequisite: MeaningRef;
  observedState: MeaningReading["state"] | "missing";
  observedMeaningIds: string[];
  reason:
    | "missing_reading"
    | "unclear_reading"
    | "conditional_prerequisite"
    | "unexpressed_prerequisite"
    | "incompatible_reading";
};
export type MeaningConsistency = {
  version: typeof MEANING_CONSISTENCY_VERSION;
  ruleIds: string[];
  activatedRuleIds: string[];
  conflicts: MeaningConflict[];
  affectedCriterionIds: string[];
};
function groupTopics(pack: CasePack, group: TaskGroup) {
  return new Set(
    pack
      .taskContracts!.filter((c) => group.criterionIds.includes(c.criterionId))
      .flatMap((c) =>
        [...c.required, ...(c.prohibited ?? [])].map(
          (p) => pack.meaningMenu!.bindings[p.id],
        ),
      ),
  );
}
export function validateMeaningDependencies(pack: CasePack) {
  validateMeaningMenu(pack);
  const deps = pack.meaningDependencies;
  if (
    !deps ||
    deps.version !== MEANING_CONSISTENCY_VERSION ||
    !Array.isArray(deps.rules)
  )
    throw Error("invalid-meaning-dependency-version");
  const known = (r: MeaningRef) =>
    pack.meaningMenu!.topics.some(
      (t) =>
        t.id === r.topicId && t.alternatives.some((a) => a.id === r.meaningId),
    );
  const targets = new Set<string>(),
    ids = new Set<string>();
  for (const rule of deps.rules) {
    const targetKey = JSON.stringify(rule.when);
    if (
      !rule.id?.trim() ||
      ids.has(rule.id) ||
      targets.has(targetKey) ||
      !rule.rationale?.trim() ||
      !known(rule.when) ||
      !rule.requires?.length ||
      !["relation", "case_application"].includes(
        pack.meaningMenu!.topics.find((t) => t.id === rule.when.topicId)!.role,
      ) ||
      new Set(rule.requires.map((r) => r.topicId)).size !==
        rule.requires.length ||
      rule.requires.some((r) => !known(r) || r.topicId === rule.when.topicId)
    )
      throw Error("invalid-meaning-dependency");
    ids.add(rule.id);
    targets.add(targetKey);
    for (const group of pack.groups) {
      const topics = groupTopics(pack, group);
      if (
        topics.has(rule.when.topicId) &&
        rule.requires.some((r) => !topics.has(r.topicId))
      )
        throw Error("cross-group-meaning-dependency");
    }
  }
}
// Operates only on validated observations and authored IDs. No text matching,
// truth inference, alternative selection, recursive propagation or model call.
export function checkMeaningConsistency(
  pack: CasePack,
  group: TaskGroup,
  readings: MeaningReading[],
): MeaningConsistency {
  validateMeaningDependencies(pack);
  const topics = groupTopics(pack, group);
  const rules = pack.meaningDependencies!.rules.filter((r) =>
    topics.has(r.when.topicId),
  );
  const conflicts: MeaningConflict[] = [];
  const activatedRuleIds: string[] = [];
  for (const rule of rules) {
    const relation = readings.find((r) => r.id === rule.when.topicId);
    if (
      relation?.state !== "stated" ||
      !relation.selections.some((s) => s.meaningId === rule.when.meaningId)
    )
      continue;
    activatedRuleIds.push(rule.id);
    for (const required of rule.requires) {
      const prerequisite = readings.find((r) => r.id === required.topicId);
      if (
        prerequisite?.state === "stated" &&
        prerequisite.selections.some((s) => s.meaningId === required.meaningId)
      )
        continue;
      const state = prerequisite?.state ?? "missing";
      conflicts.push({
        ruleId: rule.id,
        relation: rule.when,
        prerequisite: required,
        observedState: state,
        observedMeaningIds:
          prerequisite?.selections.map((s) => s.meaningId) ?? [],
        reason:
          state === "missing"
            ? "missing_reading"
            : state === "unclear"
              ? "unclear_reading"
              : state === "conditional"
                ? "conditional_prerequisite"
                : state === "not_stated"
                  ? "unexpressed_prerequisite"
                  : "incompatible_reading",
      });
    }
  }
  const involved = new Set(
    conflicts.flatMap((c) => [c.relation.topicId, c.prerequisite.topicId]),
  );
  const affectedCriterionIds = pack
    .taskContracts!.filter(
      (c) =>
        group.criterionIds.includes(c.criterionId) &&
        [...c.required, ...(c.prohibited ?? [])].some((p) =>
          involved.has(pack.meaningMenu!.bindings[p.id]),
        ),
    )
    .map((c) => c.criterionId);
  return {
    version: MEANING_CONSISTENCY_VERSION,
    ruleIds: rules.map((r) => r.id),
    activatedRuleIds,
    conflicts,
    affectedCriterionIds,
  };
}
export function holdInconsistentFindings(
  findings: Finding[],
  check: MeaningConsistency,
): Finding[] {
  // Do not create a finding where protocol validation already failed. Hold both
  // sides of a conflict; neither is treated as the authoritative reading.
  return findings.map((f) =>
    check.affectedCriterionIds.includes(f.id)
      ? {
          ...f,
          finding: "uncertain",
          reason:
            "完整理由与其必要前提的读取不一致，尚不能确定哪项读对；不据此认定学生漏答或答错。",
        }
      : f,
  );
}
