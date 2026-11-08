import type { CasePack } from "./contracts";
import { withTaskContracts } from "./task-contract-cards";
import { validateTaskContracts } from "./task-contracts";
export const CHOICE_GRAPH_VERSION = "grading-graph-meaning-choice-v1";
export type MeaningTopic = {
  id: string;
  role: string;
  alternatives: { id: string; text: string; polarity: "affirm" | "deny" }[];
};
export type MeaningMenu = {
  topics: MeaningTopic[];
  bindings: Record<string, string>;
};
// Authored alternatives identify expressed meaning, not correctness. A partial
// relationship is neither the full relation nor its explicit rejection.
const opposite: Record<string, string> = {
  q3_jia_r1: "甲在本案单位合同诈骗中不承担直接责任。",
  q3_jia_r2: "甲决定虚假销售方案的行为不属于参与本案诈骗。",
  q3_yi_r1: "乙在本案单位合同诈骗中不承担直接责任。",
  q3_yi_r2: "乙组织虚假销售的行为不属于参与本案诈骗。",
  q3_bing_r1: "丙在本案单位合同诈骗中不承担直接责任。",
  q3_bing_r2: "丙执行资金安排的行为不属于参与本案诈骗。",
  q3_ding_r1: "丁在本案中不承担合同诈骗的刑事责任。",
  q3_ding_r2: "丁不知道本案停产和虚假安排。",
  q3_ding_r3: "丁的不知情及工作范围不能作为排除本案合同诈骗责任的根据。",
  q4_conclusion_r1: "不能仅因甲乙共同违规导致伤亡，就按共同故意犯罪统一追究。",
  q4_result_attitude_r1:
    "甲乙的措施不能表明其想避免伤亡，或者甲乙违规本身已足以表明其想造成伤亡。",
  q4_result_attitude_x1:
    "减载、加索或撤人措施不代表已有效排除危险，也不当然免除事故责任。",
  q4_negligence_boundary_r1: "二人以上共同过失犯罪也按共同犯罪论处。",
  q4_negligence_boundary_r3:
    "共同过失不按共同犯罪的规则不能用于排除本案仅凭共同违规而统一追究共同故意犯罪的判断。",
  q4_individual_responsibility_r1: "本案甲乙的事故责任不需要分别评价。",
  q4_individual_responsibility_r2:
    "甲强令继续与乙操作无需区分，不必根据各自过错及事故因果分别追责。",
  q1_receipt_r1: "甲收取乙12万元的行为不构成受贿。",
  q1_office_r1: "乙给甲个人的钱与甲的职务帮助不存在交换关系。",
  q1_profit_r1: "甲的受贿成立不需要等到乙最终实际获利。",
  q1_promise_r1: "甲在本案没有承诺或推动为乙谋取利益。",
  q1_promise_r2: "本案甲仅承诺或推动谋利还不够满足该要件，必须等待乙实际获利。",
};
export function withMeaningMenu(pack: CasePack): CasePack {
  const out = withTaskContracts(pack);
  const bindings: Record<string, string> = {};
  const topics: MeaningTopic[] = [];
  for (const contract of out.taskContracts!)
    for (const check of [
      ...contract.required,
      ...(contract.prohibited ?? []),
    ]) {
      // Only this pair is the same case position. The abstract rule and the
      // rule-to-case relationship remain independent required observations.
      const canonical =
        check.id === "q4_negligence_boundary_r2"
          ? "q4_conclusion_r1"
          : check.id;
      bindings[check.id] = canonical;
      if (topics.some((t) => t.id === canonical)) continue;
      const counter = opposite[canonical];
      if (!counter) throw Error(`unreviewed-meaning-alternative:${canonical}`);
      const text =
        canonical === "q4_conclusion_r1"
          ? "本案可因甲乙共同违规导致伤亡，就按共同故意犯罪统一追究。"
          : check.text;
      const alternatives: MeaningTopic["alternatives"] = [
        { id: `${canonical}_a`, text, polarity: "affirm" },
        { id: `${canonical}_b`, text: counter, polarity: "deny" },
      ];
      // Neither correctness nor option position is sent as metadata.
      if (topics.length % 2) alternatives.reverse();
      topics.push({ id: canonical, role: check.role, alternatives });
    }
  out.meaningMenu = { topics, bindings };
  validateMeaningMenu(out);
  return out;
}
export function validateMeaningMenu(pack: CasePack) {
  validateTaskContracts(pack);
  const menu = pack.meaningMenu;
  if (!menu) throw Error("missing-meaning-menu");
  const checks = pack.taskContracts!.flatMap((c) => [
    ...c.required,
    ...(c.prohibited ?? []),
  ]);
  const ids = menu.topics.map((t) => t.id);
  const refs = Object.values(menu.bindings);
  if (
    new Set(ids).size !== ids.length ||
    Object.keys(menu.bindings).length !== checks.length ||
    checks.some((p) => !ids.includes(menu.bindings[p.id])) ||
    ids.some((id) => !refs.includes(id))
  )
    throw Error("invalid-meaning-bindings");
  const optionIds = menu.topics.flatMap((t) => t.alternatives.map((a) => a.id));
  if (
    new Set(optionIds).size !== optionIds.length ||
    menu.topics.some(
      (t) =>
        t.alternatives.length !== 2 ||
        new Set(t.alternatives.map((a) => a.polarity)).size !== 2 ||
        t.alternatives.some(
          (a) =>
            !a.id.trim() ||
            !a.text.trim() ||
            !["affirm", "deny"].includes(a.polarity),
        ),
    )
  )
    throw Error("invalid-meaning-options");
}
