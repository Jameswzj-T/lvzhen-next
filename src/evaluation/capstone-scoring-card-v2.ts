import { capstoneScoringMaterial as baseline } from "./capstone-scoring-card";
import type { BankPoint } from "./bank-scoring-card";
import { digest } from "./model-config";
import { capstoneScoringQuestion as previousQuestion } from "./capstone-scoring-card";
import type { ScoringTrialQuestion } from "./scoring-trial-contract";

// Promoted from the frozen six-answer experiment; retain the original module
// for historical answers. Do not import experiment samples into the product.
// Marks follow independent legal judgments, not words or sentence counts.
const retained = (id: string): BankPoint => {
  const c = baseline.input.criteria.find((p) => p.id === id)!;
  const s = baseline.card.items.find((p) => p.criterionId === id)!;
  const policy = baseline.plan.criterionPolicy.find((p) => p.id === id)!;
  return {
    ...c,
    ...policy,
    title: s.title,
    points: s.points,
    guidance: s.guidance,
    ...(s.requiresConclusion
      ? { requiresConclusion: s.requiresConclusion }
      : {}),
  };
};
const robberyRule = retained("q2_conclusion").ruleBasis;
const harborRule = retained("q4_conclusion").ruleBasis;
const points: BankPoint[] = [
  retained("q1_conclusion"),
  retained("q1_reason"),
  {
    id: "q2_conclusion",
    title: "第2问·转化抢劫定性",
    points: 1,
    description:
      "第2问：乙的盗窃及抗拒抓捕暴力整体构成转化型抢劫，同一取财不另计盗窃罪。仅评这一基本定性。",
    ruleBasis: robberyRule,
    requiresFactualSupport: false,
    guidance: "将乙的取财与抗拒抓捕暴力作为转化型抢劫整体评价。",
  },
  {
    id: "q2_reason",
    title: "第2问·当场抗拒抓捕依据",
    points: 2,
    description:
      "第2问理由：结合丙持续追赶未失去踪迹，说明当场联系；结合乙为逃脱抓捕而击打丙，说明抗拒抓捕暴力。这两项共同支持转化抢劫，不在本项要求重伤加重评价。",
    ruleBasis: robberyRule,
    requiresFactualSupport: true,
    requiresConclusion: "q2_conclusion",
    guidance: "联系持续追赶和为逃脱抓捕而击打，说明当场抗拒抓捕的暴力。",
  },
  {
    id: "q2_aggravation",
    title: "第2问·重伤加重评价",
    points: 1,
    description:
      "第2问：结合乙击打造成丙重伤，说明这是抢劫致人重伤的加重情形。仅提伤情而未作加重评价，尚未完成本项。",
    ruleBasis: robberyRule,
    requiresFactualSupport: true,
    requiresConclusion: "q2_conclusion",
    guidance: "补明乙造成重伤属于抢劫的加重情形。",
  },
  retained("q3_conclusion"),
  retained("q3_reason"),
  {
    id: "q4_conclusion",
    title: "第4问·窝藏定性",
    points: 1,
    description: "第4问：丁提供逃匿帮助构成窝藏罪。仅评该罪名定性。",
    ruleBasis: harborRule,
    requiresFactualSupport: false,
    guidance: "丁提供住处和车票帮助逃匿，应按窝藏罪评价。",
  },
  {
    id: "q4_reason",
    title: "第4问·明知及逃匿帮助",
    points: 1,
    description:
      "第4问理由：丁听乙讲明犯罪经过后仍提供房屋、车票，说明明知对方犯罪且帮助逃匿。仅评窝藏成立的事实与法律联系。",
    ruleBasis: harborRule,
    requiresFactualSupport: true,
    requiresConclusion: "q4_conclusion",
    guidance: "联系已知犯罪仍提供房屋、车票，说明明知和帮助逃匿。",
  },
  {
    id: "q4_exclusion",
    title: "第4问·排除先前共犯",
    points: 1,
    description:
      "第4问：丁不构成先前盗窃或抢劫的共犯。仅评对先前共同犯罪责任的明确排除，不由事后帮助的罪名推定。",
    ruleBasis: harborRule,
    requiresFactualSupport: false,
    guidance: "还须说明丁不构成先前盗窃或抢劫的共犯。",
  },
  {
    id: "q4_exclusion_reason",
    title: "第4问·排除共犯的依据",
    points: 1,
    description:
      "第4问理由：结合丁事前不知情、犯罪结束后才提供逃匿帮助，说明缺少先前共同犯意与行为基础。仅评排除先前共犯的依据。",
    ruleBasis: harborRule,
    requiresFactualSupport: true,
    requiresConclusion: "q4_exclusion",
    guidance: "结合事前未通谋、事后才帮助逃匿，说明没有先前共犯基础。",
  },
  retained("q5_conclusion"),
  retained("q5_reason"),
];
const { facts, question, caseId } = baseline.input;
const caseRevision = `capstone-independent-judgments-v2-${digest({ facts, question, points }).slice(0, 20)}`;
const material = {
  input: {
    caseId,
    caseRevision,
    facts,
    question,
    criteria: points.map(({ id, description, ruleBasis }) => ({
      id,
      description,
      ruleBasis,
    })),
  },
  plan: {
    version: "capstone-independent-judgments-v2",
    caseId,
    caseRevision,
    criterionPolicy: points.map(({ id, requiresFactualSupport }) => ({
      id,
      requiresFactualSupport,
    })),
    units: baseline.plan.units.map((unit) => ({
      ...unit,
      criterionIds: points
        .filter((p) => p.id.startsWith(`${unit.id}_`))
        .map((p) => p.id),
    })),
  },
  card: {
    version: "capstone-independent-judgments-v2",
    caseId,
    caseRevision,
    items: points.map(
      ({ id: criterionId, title, points, guidance, requiresConclusion }) => ({
        criterionId,
        title,
        points,
        guidance,
        ...(requiresConclusion ? { requiresConclusion } : {}),
      }),
    ),
  },
};

const exerciseRevision = `capstone-ui-v2-${digest({
  material,
  reference: baseline.reference,
  sources: baseline.sources,
  title: previousQuestion.title,
}).slice(0, 24)}`;
export const currentCapstoneMaterial = {
  ...material,
  exerciseRevision,
  reference: baseline.reference,
  sources: baseline.sources,
};
export const currentCapstoneQuestion: ScoringTrialQuestion = {
  ...previousQuestion,
  revision: exerciseRevision,
  exerciseRevision,
  parts: material.plan.units.map((unit) => ({
    id: unit.id,
    question: unit.title,
    criterionIds: unit.criterionIds,
  })),
};
