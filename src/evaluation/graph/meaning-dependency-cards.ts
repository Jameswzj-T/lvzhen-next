import type { CasePack } from "./contracts";
import { withMeaningMenu } from "./meaning-choice-cards";
import {
  MEANING_CONSISTENCY_VERSION,
  validateMeaningDependencies,
  type MeaningDependency,
  type MeaningRef,
} from "./meaning-consistency";
const ref = (topicId: string, suffix: "a" | "b"): MeaningRef => ({
  topicId,
  meaningId: `${topicId}_${suffix}`,
});
// These are containment constraints between already authored meanings, not
// legal deductions or additional scoring prerequisites. Negating a reason is
// not an assertion of its premises, so no contraposition/reverse rule exists.
const declarations: Record<string, MeaningDependency[]> = {
  "cap-contract": [
    {
      id: "ding-reason-includes-unawareness",
      when: ref("q3_ding_r3", "a"),
      requires: [ref("q3_ding_r2", "b"), ref("q3_ding_r1", "b")],
      rationale:
        "完整选项明确包含丁不知情和不承担责任；两项原有读取应与之相容。",
    },
  ],
  "cap-procurement": [
    {
      id: "office-exchange-includes-promise",
      when: ref("q1_office_r1", "a"),
      requires: [ref("q1_promise_r1", "a")],
      rationale:
        "该完整选项明确写有甲答应帮乙中标，故包含本案谋利承诺；不由此推断受贿结论。",
    },
    {
      id: "promise-sufficient-includes-promise",
      when: ref("q1_promise_r2", "a"),
      requires: [ref("q1_promise_r1", "a")],
      rationale: "该完整选项明确包含本案已经承诺或推动谋利。",
    },
    {
      id: "promise-insufficient-includes-promise",
      when: ref("q1_promise_r2", "b"),
      requires: [ref("q1_promise_r1", "a")],
      rationale:
        "该相反选项也表达本案已有承诺、但认为其尚不足够；不得把它误作没有承诺。",
    },
  ],
  "cap-worksite-v2": [
    {
      id: "negligence-application-includes-rule-and-position",
      when: ref("q4_negligence_boundary_r3", "a"),
      requires: [
        ref("q4_negligence_boundary_r1", "a"),
        ref("q4_conclusion_r1", "b"),
      ],
      rationale:
        "完整选项同时表达共同过失规则及仅凭共同违规不能统一追究的本案判断；使用原有共享事项。",
    },
    {
      id: "individual-reason-includes-position",
      when: ref("q4_individual_responsibility_r2", "a"),
      requires: [ref("q4_individual_responsibility_r1", "a")],
      rationale:
        "按二人各自过错及因果分别评价，包含本案责任分别评价的原有判断。",
    },
  ],
};
export function withMeaningDependencies(pack: CasePack): CasePack {
  const out = withMeaningMenu(pack);
  const rules = declarations[out.input.caseId];
  if (!rules)
    throw Error(`unreviewed-meaning-dependencies:${out.input.caseId}`);
  const ids = new Set(out.meaningMenu!.topics.map((t) => t.id));
  out.meaningDependencies = {
    version: MEANING_CONSISTENCY_VERSION,
    rules: structuredClone(rules.filter((r) => ids.has(r.when.topicId))),
  };
  validateMeaningDependencies(out);
  return out;
}
