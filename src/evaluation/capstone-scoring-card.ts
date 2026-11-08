import { longCases } from "../content/criminal-capstone/long-cases";
import { digest } from "./model-config";
import type { BankPoint } from "./bank-scoring-card";
import type { EvaluationInput } from "./index";
import type { ObservationPlan } from "./observation-assessment";
import type { ScoreCard } from "./scoring-loop";
import type { ScoringTrialQuestion } from "./scoring-trial-contract";

// One local trial, promoted verbatim from the four-answer experiment.
// Synthetic answers and expected findings remain in evals, outside this module.
const sourceCase = longCases.find((c) => c.id === "cap-warehouse")!;
const theftRule =
  "刑法第二十五、二百六十四条：共同故意非法取得他人财物达到题定入罪标准，按共同盗窃评价。既遂按财物占有是否转移判断，不以销赃或分款为必要条件。";
const robberyRule =
  "刑法第二百六十九、二百六十三条：实施盗窃后为抗拒抓捕当场使用暴力，依抢劫罪定罪处罚；抢劫致人重伤属于加重情形。2016年抢劫指导意见第三部分的当场包括刚离现场被发现抓捕；同一取财及转化暴力整体评价。";
const jointRule =
  "刑法第二十五条及2016年抢劫指导意见第三部分：共同盗窃中部分人转化抢劫，其他人是否承担抢劫共犯责任，应核对对暴力行为有无共同犯意、意思联络和帮助，不按同伙身份自动承担后续责任。";
const harborRule =
  "刑法第三百一十条及2021年窝藏、包庇解释第一、二条：明知他人犯罪，为逃匿提供藏身场所、财物等属于窝藏；作假证明等另按包庇评价。事前通谋的按共同犯罪处理；无事前通谋的事后逃匿帮助不能倒推为先前犯罪共犯。";
const surrenderRule =
  "刑法第六十七条及1998年自首立功解释第一条：一般自首须自动投案并如实供述；经亲友规劝自行投案可认定自动投案。共同犯罪须交代本人罪行及所知同案情况，不要求供述确实不知道的事实；可以依法从宽，并非必然免罚。";

// Each reason is judged on its own stated factual/legal link. Its marks require
// only its own question's conclusion. No cross-question score prerequisites.
const points: BankPoint[] = [
  {
    id: "q1_conclusion",
    title: "第1问·取财形态",
    points: 1,
    description:
      "第1问：甲乙被追赶前共同盗窃已经既遂。只评该时点的犯罪形态结论。",
    ruleBasis: theftRule,
    requiresFactualSupport: false,
    guidance: "区分取财完成时点与后来追赶：前段共同盗窃已既遂。",
  },
  {
    id: "q1_reason",
    title: "第1问·控制转移依据",
    points: 3,
    description:
      "第1问理由：结合器材锁入两人控制的货车，说明公司占有被排除、两人建立控制；不要求复述全部盗窃构成或数额。仅评价这项事实与控制转移的联系。",
    ruleBasis: theftRule,
    requiresFactualSupport: true,
    requiresConclusion: "q1_conclusion",
    guidance: "联系器材锁入两人控制的货车，说明占有已经转移。",
  },
  {
    id: "q2_conclusion",
    title: "第2问·乙的整体定性",
    points: 1,
    description:
      "第2问：乙构成转化型抢劫，并有抢劫致人重伤情节，同一取财不另计盗窃罪。评价乙的整体定性，不要求罪名必须单独成句。",
    ruleBasis: robberyRule,
    requiresFactualSupport: false,
    guidance:
      "乙按转化型抢劫整体评价，计入致人重伤情节，同一取财不再另计盗窃罪。",
  },
  {
    id: "q2_reason",
    title: "第2问·当场暴力依据",
    points: 3,
    description:
      "第2问理由：把丙从现场持续追赶与当场联系起来，把乙为逃脱追捕用铁棍击打并致重伤与抗拒抓捕的暴力联系起来。只评这些事实联系，不另要求复述整项定性。",
    ruleBasis: robberyRule,
    requiresFactualSupport: true,
    requiresConclusion: "q2_conclusion",
    guidance:
      "说明持续追赶中的当场联系，以及为抗拒抓捕用铁棍击打致重伤的暴力。",
  },
  {
    id: "q3_conclusion",
    title: "第3问·甲的责任范围",
    points: 1,
    description:
      "第3问：甲不对乙后来的抢劫及重伤承担共犯责任，仍对共同盗窃既遂负责。只评甲的责任结论。",
    ruleBasis: jointRule,
    requiresFactualSupport: false,
    guidance: "甲的共同盗窃责任保留；乙后续抢劫与重伤不自动归于甲。",
  },
  {
    id: "q3_reason",
    title: "第3问·共同范围依据",
    points: 3,
    description:
      "第3问理由：联系两人仅商定盗窃、甲已离开且未参与或帮助后续暴力，说明后段超出共同犯意或共同实行范围。仅评价这一归责依据，不能拿丁的事后帮助代替甲的分析。",
    ruleBasis: jointRule,
    requiresFactualSupport: true,
    requiresConclusion: "q3_conclusion",
    guidance: "结合原约定与甲已离开、未参与后续暴力，说明共同责任的范围。",
  },
  {
    id: "q4_conclusion",
    title: "第4问·丁的行为定性",
    points: 1,
    description:
      "第4问：丁提供逃匿帮助构成窝藏罪，不是先前盗窃或抢劫的共犯；不以包庇罪替代。只评丁的定性。",
    ruleBasis: harborRule,
    requiresFactualSupport: false,
    guidance: "丁应按窝藏罪评价，不能把事后帮助追溯为先前犯罪共犯。",
  },
  {
    id: "q4_reason",
    title: "第4问·事后加入与明知",
    points: 3,
    description:
      "第4问理由：联系丁事前不知情、听乙告知犯罪经过后才提供房屋及车票，说明既有明知的逃匿帮助，又无先前共犯的意思与行为基础。只评丁的事实和法律联系。",
    ruleBasis: harborRule,
    requiresFactualSupport: true,
    requiresConclusion: "q4_conclusion",
    guidance: "结合事后得知犯罪再提供住处、车票，区分明知逃匿帮助与事前共犯。",
  },
  {
    id: "q5_conclusion",
    title: "第5问·甲的自首结论",
    points: 1,
    description:
      "第5问：甲成立自首，未交代其确实不知道的击打细节不否定该结论。只评自首结论及该边界，不额外要求量刑结论。",
    ruleBasis: surrenderRule,
    requiresFactualSupport: false,
    guidance: "甲可成立自首；不因未讲出其确实不知道的击打细节而否定。",
  },
  {
    id: "q5_reason",
    title: "第5问·投案与供述依据",
    points: 3,
    description:
      "第5问理由：结合家人规劝后自行投案及如实交代自己参与、所知的共同盗窃，说明自动投案和如实供述；联系甲未见后续击打，区分不知道与隐瞒已知事实。只评该依据，不要求背条号或量刑幅度。",
    ruleBasis: surrenderRule,
    requiresFactualSupport: true,
    requiresConclusion: "q5_conclusion",
    guidance: "说明规劝后自行到案、如实交代所知同案事实，并区分不知道与隐瞒。",
  },
];

const caseRevision = `capstone-experiment-v1-${digest({
  facts: sourceCase.facts,
  questions: sourceCase.cases.map((c) => c.exercise.prompt),
  points,
}).slice(0, 20)}`;
// Binds the displayed case, all five questions, card and post-answer reference.
const exerciseRevision = `capstone-ui-v1-${digest({ sourceCase, points }).slice(0, 24)}`;
const input = {
  caseId: sourceCase.id,
  caseRevision,
  facts: sourceCase.facts,
  question: sourceCase.cases
    .map((c, i) => `第${i + 1}问：${c.exercise.prompt}`)
    .join("\n"),
  criteria: points.map(({ id, description, ruleBasis }) => ({
    id,
    description,
    ruleBasis,
  })),
} satisfies Omit<EvaluationInput, "answerId" | "studentText">;
const plan = {
  version: "capstone-five-units-v1",
  caseId: sourceCase.id,
  caseRevision,
  criterionPolicy: points.map(({ id, requiresFactualSupport }) => ({
    id,
    requiresFactualSupport,
  })),
  units: sourceCase.cases.map((q, i) => ({
    id: `q${i + 1}`,
    title: q.exercise.prompt,
    criterionIds: [`q${i + 1}_conclusion`, `q${i + 1}_reason`],
  })),
} satisfies ObservationPlan;
const card = {
  version: "capstone-five-independent-questions-v1",
  caseId: sourceCase.id,
  caseRevision,
  items: points.map(
    ({ id, title, points: value, guidance, requiresConclusion }) => ({
      criterionId: id,
      title,
      points: value,
      guidance,
      ...(requiresConclusion ? { requiresConclusion } : {}),
    }),
  ),
} satisfies ScoreCard;
export const capstoneScoringMaterial = {
  exerciseRevision,
  input,
  plan,
  card,
  reference: sourceCase.cases
    .map((q, i) => `第${i + 1}问：${q.exercise.reference}`)
    .join("\n\n"),
  sources: [
    "https://tianjin.chinatax.gov.cn/11200000000/0300/030004/03000418/20240920152615743.shtml",
    "https://www.court.gov.cn/fabu/xiangqing/37412.html",
    "https://www.court.gov.cn/zixun/xiangqing/317081.html",
    "https://gongbao.court.gov.cn/Details/44c5c8dcc7367858830d4c7b8b215e.html",
  ],
};
// Browser receives only the case/questions and grouping IDs, never the answer,
// rubric, legal target or mark dependencies before submitting.
export const capstoneScoringQuestion: ScoringTrialQuestion = {
  id: sourceCase.id,
  revision: exerciseRevision,
  exerciseRevision,
  title: sourceCase.title,
  facts: input.facts,
  question: input.question,
  maxScore: card.items.reduce((n, p) => n + p.points, 0),
  parts: sourceCase.cases.map((q, i) => ({
    id: `q${i + 1}`,
    question: q.exercise.prompt,
    criterionIds: [`q${i + 1}_conclusion`, `q${i + 1}_reason`],
  })),
};
