import type { Criterion, UnitExercise } from "./fault-unit";
import { publicCases } from "./criminal-social/public";
import { socialSources } from "./criminal-social/knowledge";
import { longCases } from "./criminal-capstone/long-cases";
import { capstoneSources } from "./criminal-capstone/sources";

export const feedbackBoundaryRevision =
  "criminal-feedback-boundary-2026-09-30.v1";
export const feedbackBoundarySources = { ...socialSources, ...capstoneSources };
const originalShort = publicCases.find(
  (c) => c.exercise.id === "cl17-police-pull-away",
)!;
const shortId = "cl17-police-pull-away-v2";
export const policeBoundaryCorrection = {
  ...originalShort,
  replaces: originalShort.exercise.id,
  exercise: {
    ...originalShort.exercise,
    id: shortId,
    caseId: shortId,
    criteria: originalShort.exercise
      .criteria!.slice(0, 2)
      .map((c, i) => ({ ...c, id: `${shortId}-p${i + 1}` })),
  },
};

// Visible references stay separate from neutral scoring requirements and gold.
export const contractBoundaryQuestions = [
  {
    prompt:
      "公司收取100万元预付款，是普通履约失败还是合同诈骗？从题设找出判断依据。",
    points: [
      [
        "收款定性",
        "本案收取预付款应按合同诈骗评价，不是仅有经营失败的普通民事违约。",
        "不能仅因事后没有交货便倒推收款时的犯罪目的。",
      ],
      [
        "欺骗行为",
        "收款前已经停产，仍以虚假现货清单对外收取预付款，虚构签约履约能力。",
        "应联系收款时的具体欺骗，而不只泛称经营困难。",
      ],
      [
        "非法占有目的",
        "负责人事先决定不购料、不委托供货，将预付款用于旧债；这些安排支持收款时已有非法占有目的。",
        "认可意思相当的事实推理，不要求逐字复述全部情节。",
      ],
      [
        "处分与损失",
        "客户基于虚假的供货信息交付预付款并受到财产损失，欺骗与处分之间有关联。",
        "不得从其他小问的答案自动补入本问未表达的理由。",
      ],
    ],
    supplement: "经营困难本身不等于诈骗；应围绕收款前后的具体安排判断。",
  },
  {
    prompt:
      "收取100万元预付款是否成立单位犯罪？应追究单位及哪些类别人员的责任？结合题设说明。",
    points: [
      [
        "单位犯罪",
        "本案应评价单位合同诈骗，不能仅以企业组织形式或此前合法经营排除单位犯罪。",
        "公司承担责任也不表示自然人一律免责。",
      ],
      [
        "单位意志",
        "实际负责人和销售、财务负责人共同决定，按公司交易方案共同实施，体现单位决策。",
        "不能只由合同盖章或某人的职位直接推定。",
      ],
      [
        "利益归属",
        "100万元全部归公司使用；公司此前长期合法经营，并非为犯罪设立，本案没有所得由个人私分的排除情形。",
        "分别核对利益归属与组织性质，不要求固定法律术语。",
      ],
      [
        "责任主体",
        "依法追究单位以及直接负责的主管人员、其他直接责任人员的责任，而非只处罚甲或只处罚公司。",
        "不要求在本问逐一分析四人的责任或列出具体刑罚数额。",
      ],
    ],
    supplement:
      "具体人员的认识和参与，在下一问分别说明；不由单位责任直接推出全体员工有罪。",
  },
  {
    prompt:
      "分别判断甲、乙、丙、丁是否承担本次合同诈骗的刑事责任，并说明各人的认识和参与依据。",
    points: [
      [
        "甲乙丙的责任",
        "甲、乙、丙均应就本次单位合同诈骗承担相应的直接责任。",
        "共同参与不等于三人必须判处同样刑罚，不要求判断具体刑期或主从犯排序。",
      ],
      [
        "三人的依据",
        "甲乙事先商定虚假销售，丙获知停产事实和方案后同意照办，三人知情并共同实施。",
        "丙知情、同意并参与的事实足够；不强求题干未独立展开的资金执行动作。",
      ],
      [
        "丁的责任",
        "依本题事实，不能追究丁的合同诈骗责任。",
        "不能把同公司任职或参与日常工作等同于共同故意。",
      ],
      [
        "丁的依据",
        "丁只按指示录入文字，不知停产和虚假方案，且无权查看财务库存，缺乏其明知参与诈骗的根据。",
        "认可对不知情及职责范围的等义说明。",
      ],
    ],
    supplement: "责任成立与量刑轻重是不同问题；本问不要求三人的量刑比较。",
  },
  {
    prompt:
      "甲另外取走公司6万元应如何定性？结合职务便利、财物归属和用途，说明与前述预付款行为的区别。",
    points: [
      [
        "6万元的定性",
        "甲另行取走这6万元，应按职务侵占评价。",
        "删除额外比较题，不等于认可把该行为定为贪污。",
      ],
      [
        "职务便利与单位财物",
        "甲利用管理公司银行账户的职务便利，虚构报销，将公司既有资金非法据为己有，支付个人债务。",
        "应联系职务便利、单位财物及个人占有，不只复述罪名。",
      ],
      [
        "两笔行为区分",
        "这6万元并非客户预付款，也非公司共同决策；与其承担责任的单位合同诈骗分别评价，不能重复计算同一笔钱。",
        "保留各罪责任的区分，不要求主动展开其他罪名和全部数额档次。",
      ],
    ],
    supplement:
      "补充学习：公司负责人不当然具有国家工作人员身份；本案6万元在行为时适用的职务侵占标准下达到入罪要求。本问不另要求比较贪污或背写数额起点。",
  },
  {
    prompt:
      "甲被调查后如实说明、公司退还部分预付款，是否影响此前犯罪成立？这些事后行为可以在哪一层面评价？",
    points: [
      [
        "犯罪是否成立",
        "如实说明和部分退款不使本案此前已经成立的犯罪变为不成立。",
        "不能把事后表现代替对先前行为构成要件的判断。",
      ],
      [
        "既遂与退赔",
        "客户已因欺骗交付预付款并遭受损失；事后部分退赔不把已经完成的诈骗倒转成无罪或未遂。",
        "认可能说明先后关系的等义表达。",
      ],
      [
        "事后从宽",
        "如实供述和退赔可依法在从宽处理层面评价，与犯罪成立分别判断。",
        "本问不要求判定自首或坦白类别、具体从宽幅度。",
      ],
    ],
    supplement:
      "补充学习：题设未交代自动投案经过，不能直接认定自首，也不能把未交代当成已证实没有自动投案。本问不要求选择自首或坦白。",
  },
] as const;
export const contractBoundaryRequirements = [
  [
    "正确判断收取预付款是合同诈骗还是普通履约失败。",
    "联系收款时的供货表示和实际状态，说明有无欺骗行为。",
    "结合收款前后的具体安排判断非法占有目的是否在收款时存在；认可等义推理，不要求穷举全部事实。",
    "说明客户的认识、财产处分及损失与有关行为的联系。",
  ],
  [
    "正确判断是否成立单位犯罪，不以企业组织形式代替构成判断。",
    "依据决策、实施方式判断行为体现单位意志还是个人行为。",
    "依据款项用途、公司成立和经营情况判断利益归属及单位犯罪的排除条件。",
    "说明应追究单位及哪些类别人员的责任；不要求本问逐一分析四人或给出具体刑罚。",
  ],
  [
    "分别判断甲乙丙是否对本次合同诈骗承担刑事责任，不要求具体刑罚和主从犯排序。",
    "结合甲乙事先商定、丙知情同意并共同实施的事实说明认识和参与，不强求题设未独立展开的资金执行动作。",
    "正确判断丁是否承担本次合同诈骗的刑事责任。",
    "结合丁的工作范围、知情程度及接触信息的权限说明依据，不由同公司任职推定故意。",
  ],
  [
    "正确判断甲另取6万元的行为应如何定性。",
    "联系账户管理、虚构报销、资金归属及用途说明相关构成要件。",
    "区分这6万元和预付款的事实、利益归属及决策，分别评价责任而不重复计算；不要求额外比较其他罪名或背写数额起点。",
  ],
  [
    "正确判断如实说明和部分退款是否影响此前犯罪成立。",
    "结合客户处分财物的时点解释事后行为对犯罪完成形态的影响。",
    "区分事后表现可能适用的处理层面与犯罪成立，不要求判定自首或坦白类别、具体从宽幅度。",
  ],
] as const;
const oldContract = longCases.find((c) => c.id === "cap-contract")!;
export const revisedContractCase = {
  ...oldContract,
  id: "cap-contract-v2",
  cases: oldContract.cases.map((old, i) => {
    const question = contractBoundaryQuestions[i];
    const id = `cap-contract-v2-q${i + 1}`;
    const criteria: Criterion[] = question.points.map(
      ([label, meaning, boundary], n) => ({
        id: `${id}-p${n + 1}`,
        label,
        meaning,
        acceptable: `意思相当并联系本题事实即可：${meaning}`,
        boundary,
      }),
    );
    const exercise: UnitExercise = {
      ...old.exercise,
      id,
      caseId: "cap-contract-v2",
      prompt: question.prompt,
      title: `${oldContract.title} · 第${i + 1}问（范围澄清版）`,
      reference: criteria.map((c) => c.meaning).join("\n"),
      criteria,
    };
    return { ...old, replaces: old.exercise.id, exercise };
  }),
};
export const feedbackBoundaryCorrections = [
  policeBoundaryCorrection,
  ...revisedContractCase.cases,
];
export function feedbackBoundaryNote(id: string) {
  const item = feedbackBoundaryCorrections.find(
    (c) => c.replaces === id || c.exercise.id === id,
  );
  if (!item) return null;
  const index = revisedContractCase.cases.findIndex((c) => c === item);
  return {
    previousVersion: item.replaces === id,
    revisedId: item.exercise.id,
    scope:
      index < 0
        ? "本问只要求解释身体接触为何不足以认定袭警；没有讨论其他罪名，不单独视为漏答。"
        : index === 2
          ? "本问区分每个人是否负刑事责任及认识、参与依据，不要求同一刑罚或量刑排序。"
          : index === 3
            ? "本问要求定性并区分两笔行为；额外的罪名比较、数额起点不单独计分。"
            : index === 4
              ? "本问区分犯罪成立与事后从宽；自首或坦白分类不单独计分。"
              : "按本问设问和已表达的事实依据核对，不从其他小问自动补分。",
    supplement:
      index < 0
        ? "补充学习：不构成袭警，不代表任何场景都无其他责任；另罪仍须满足各自构成条件。"
        : contractBoundaryQuestions[index].supplement,
  };
}
