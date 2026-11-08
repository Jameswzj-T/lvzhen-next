import type { CasePack } from "./contracts";
import {
  validateTaskContracts,
  type TaskContract,
  type MeaningCheck,
} from "./task-contracts";

type CheckSpec = [MeaningCheck["role"], string, "affirm" | "deny"];
type Spec = [TaskContract["kind"], CheckSpec[], CheckSpec[]?];
// Authored against the EXISTING card. A relation is a semantic observation:
// code may not construct it by combining unrelated fact/conclusion keywords.
const specs: Record<string, Record<string, Spec>> = {
  "cap-contract": {
    q3_jia: [
      "combined",
      [
        ["case_position", "甲在本案单位合同诈骗中承担直接责任。", "affirm"],
        [
          "relation",
          "甲决定虚假销售方案，因而以决策行为参与了本案诈骗。",
          "affirm",
        ],
      ],
    ],
    q3_yi: [
      "combined",
      [
        ["case_position", "乙在本案单位合同诈骗中承担直接责任。", "affirm"],
        [
          "relation",
          "乙知道虚假安排，仍以组织虚假销售的行为参与本案诈骗。",
          "affirm",
        ],
      ],
    ],
    q3_bing: [
      "combined",
      [
        ["case_position", "丙在本案单位合同诈骗中承担直接责任。", "affirm"],
        [
          "relation",
          "丙明知虚假方案仍执行资金安排，因而参与了本案诈骗。",
          "affirm",
        ],
      ],
    ],
    q3_ding: [
      "combined",
      [
        ["case_position", "丁在本案中承担合同诈骗的刑事责任。", "deny"],
        ["fact", "丁知道本案停产和虚假安排。", "deny"],
        [
          "relation",
          "丁不知虚假安排，只在按稿录字的工作范围内行动，因此不承担本案合同诈骗责任。",
          "affirm",
        ],
      ],
    ],
  },
  "cap-worksite-v2": {
    q4_conclusion: [
      "position",
      [
        [
          "case_position",
          "本案可因甲乙共同违规导致伤亡，就按共同故意犯罪统一追究。",
          "deny",
        ],
      ],
    ],
    q4_result_attitude: [
      "reason",
      [
        [
          "relation",
          "甲乙已知报告中的危险，但减载、加索、撤开旁人的举动表明其想避免伤亡，不能只因违规就认定想伤人。",
          "affirm",
        ],
      ],
      [
        [
          "case_application",
          "甲乙采取减载、加索或撤人措施，就已有效排除危险或不再需要承担事故责任。",
          "affirm",
        ],
      ],
    ],
    q4_negligence_boundary: [
      "reason",
      [
        ["general_rule", "二人以上共同过失犯罪不按共同犯罪论处。", "affirm"],
        [
          "case_application",
          "本案甲乙共同违规造成伤亡，应当按共同故意犯罪统一追究。",
          "deny",
        ],
        [
          "relation",
          "将共同过失不按共同犯罪的规则用于本案，因此不能仅因甲乙共同违规出事就按共同故意统一追究。",
          "affirm",
        ],
      ],
    ],
    q4_individual_responsibility: [
      "combined",
      [
        ["case_position", "本案甲乙的事故责任需要分别评价。", "affirm"],
        [
          "relation",
          "应区分甲强令继续作业与乙实际操作，分别根据各自过错及事故因果评价责任。",
          "affirm",
        ],
      ],
    ],
  },
  "cap-procurement": {
    q1_receipt: [
      "position",
      [["case_position", "甲收取乙12万元的行为构成受贿。", "affirm"]],
    ],
    q1_office: [
      "reason",
      [
        [
          "relation",
          "乙不符合采购条件却向掌管审批的甲个人送钱，甲答应帮其中标，这是财物与职务帮助之间的交换。",
          "affirm",
        ],
      ],
    ],
    q1_profit: [
      "position",
      [["case_position", "甲的受贿成立必须等到乙最终获利。", "deny"]],
    ],
    q1_promise: [
      "reason",
      [
        ["fact", "甲在本案已承诺或推动为乙谋取利益。", "affirm"],
        [
          "relation",
          "本案甲承诺或推动谋利已经满足该要件，无须再等待乙实际获利。",
          "affirm",
        ],
      ],
    ],
  },
};
export function withTaskContracts(pack: CasePack): CasePack {
  const out = structuredClone(pack);
  out.taskContracts = out.input.criteria.map(({ id }) => {
    const spec = specs[out.input.caseId]?.[id];
    if (!spec)
      throw new Error(`unreviewed-task-contract:${out.input.caseId}:${id}`);
    const [kind, required, prohibited] = spec;
    const make = (rows: CheckSpec[], suffix: string): MeaningCheck[] =>
      rows.map(([role, text, expected], i) => ({
        id: `${id}_${suffix}${i + 1}`,
        role,
        text,
        expected,
      }));
    return {
      criterionId: id,
      kind,
      required: make(required, "r"),
      ...(prohibited ? { prohibited: make(prohibited, "x") } : {}),
    };
  });
  validateTaskContracts(out);
  return out;
}
