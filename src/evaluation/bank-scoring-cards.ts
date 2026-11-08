import { bankCard as card } from "./bank-scoring-card";
import { chapterScoringCandidates } from "./bank-chapter-cards";

// Manually reviewed against the frozen 2026-09-23 chapter batch.
// cl06-no-damage is withheld: B3 got the marks right but misdescribed a
// stated reason as incomplete. A score match alone does not approve a card.
// cl07-review-main-accessory is also withheld after natural-answer E3:
// the total was pending, but a stated role analysis was called incomplete.
const reviewedChapterIds = new Set([
  "cl06-two-times",
  "cl06-review-rescue-chain",
  "cl07-group-scope",
  "cl10-review-suspension-parole",
]);

const ageRule =
  "刑法第十七条第三款：已满十二不满十四周岁，犯故意杀人、故意伤害罪，致人死亡或者以特别残忍手段致人重伤造成严重残疾，情节恶劣，经最高人民检察院核准追诉，应当负刑事责任。死亡路径不另以特别残忍手段为条件。本题只问追责条件，不评价量刑从宽。";
const defenseRule =
  "刑法第二十条第一、三款：防卫针对正在进行的不法侵害；对正在进行的行凶、杀人等严重危及人身安全的暴力犯罪实行防卫，造成不法侵害人伤亡，不属于防卫过当。正当防卫指导意见第6点：确已失去侵害能力或确已放弃侵害，侵害已经结束。";
const surrenderRule =
  "刑法第六十七条：一般自首须自动投案并如实供述。被采取强制措施的犯罪嫌疑人、被告人和正在服刑的罪犯，如实供述司法机关还未掌握的本人其他罪行，以自首论；最高法自首立功解释第2条要求该其他罪行与已掌握罪行属不同种。虽无前两款自首情节但如实供述自己罪行的，适用坦白规则。";
export const bankScoringCards = [
  // Two express asks: the overall liability conclusion, and which conditions
  // still need examination. The latter remain independently creditable here.
  card("cl03-age-thirteen", [
    {
      id: "conclusion",
      title: "追责结论",
      description:
        "不能仅凭本案十三周岁与死亡结果直接认定应负刑事责任，还须满足限定条件。只评结论，不要求理由。",
      ruleBasis: ageRule,
      points: 1,
      requiresFactualSupport: false,
      guidance: "年龄与死亡结果不足以单独确定追责条件全部满足。",
    },
    {
      id: "offense",
      title: "限定行为与结果",
      description:
        "须指出本题只限法定故意杀人、故意伤害致死路径，联系连续刺击胸腹致乙死亡等案情核对行为性质和故意，不能把任何致死行为均纳入。已确认本案故意杀人致死也可，不必同时列举未涉及的其他路径。",
      ruleBasis: ageRule,
      points: 1,
      requiresFactualSupport: true,
      guidance:
        "结合持刀连续刺击胸腹致死，核对故意杀人或故意伤害致死的限定范围。",
    },
    {
      id: "circumstances",
      title: "情节恶劣条件",
      description:
        "须指出情节恶劣是独立条件，而本案材料尚未说明、仍需核对，不能把死亡本身等同情节恶劣。只评此项，不受其他结论正误影响。",
      ruleBasis: ageRule,
      points: 2,
      requiresFactualSupport: true,
      guidance: "本案情节是否恶劣尚未明确，需独立核对。",
    },
    {
      id: "approval",
      title: "最高检核准",
      description:
        "须指出需最高人民检察院核准追诉，本案尚未完成。接受最高检等明确简称，不以一般起诉或下级检察院核准替代。只评此项。",
      ruleBasis: ageRule,
      points: 2,
      requiresFactualSupport: true,
      guidance: "补充最高人民检察院核准追诉要求，并指出本案程序尚未完成。",
    },
  ]),
  card("cl05-review-separated", [
    {
      id: "first_conclusion",
      title: "首段防卫结论",
      description:
        "首段可按特殊防卫审查，或认定首段属于特殊防卫。只评首段结论，不要求理由。",
      ruleBasis: defenseRule,
      points: 1,
      requiresFactualSupport: false,
      guidance: "首段面对严重暴力攻击，可按特殊防卫审查。",
    },
    {
      id: "first_reason",
      requiresConclusion: "first_conclusion",
      title: "首段事实依据",
      description:
        "须将乙持刀刺向甲胸口的正在进行的攻击，与严重危及人身安全联系起来。只评首段事实依据，不受结论项正误影响。",
      ruleBasis: defenseRule,
      points: 2,
      requiresFactualSupport: true,
      guidance: "说明刺向胸口的持刀攻击正在进行，且严重危及人身安全。",
    },
    {
      id: "second_conclusion",
      title: "后段单独评价",
      description:
        "后段不能沿用首段的特殊防卫根据，两段不能统一按特殊防卫免责。只评结论，两种说法表达其一即认可；不要求另定具体罪名或称为防卫过当。",
      ruleBasis: defenseRule,
      points: 1,
      requiresFactualSupport: false,
      guidance: "后段应单独评价，不能借用首段的特殊防卫根据。",
    },
    {
      id: "second_reason",
      requiresConclusion: "second_conclusion",
      title: "后段事实依据",
      description:
        "须结合刀被夺走、乙已受控制并停止挣扎等案情，说明后段不再有正在进行的不法侵害；不必复述全部细节，但仅凭相隔五分钟不足。独立评价此理由，不受结论项正误影响。",
      ruleBasis: defenseRule,
      points: 2,
      requiresFactualSupport: true,
      guidance: "结合凶器被夺、乙受控制的状态，说明侵害已经结束。",
    },
  ]),
  card("cl10-review-self-report", [
    {
      id: "theft_conclusion",
      title: "盗窃部分结论",
      description:
        "已知盗窃部分不成立一般自首，可按坦白或如实供述自己罪行评价。只评此部分结论；不要求说明具体从宽幅度。",
      ruleBasis: surrenderRule,
      points: 1,
      requiresFactualSupport: false,
      guidance: "已掌握的盗窃部分按坦白审查，不能因供述就认定一般自首。",
    },
    {
      id: "theft_reason",
      requiresConclusion: "theft_conclusion",
      title: "盗窃部分依据",
      description:
        "须联系甲被抓且无主动投案、如实供述的是警方已掌握的本次盗窃，说明欠缺自动投案，供述不能补足该条件。只评此部分依据，不受结论项正误影响。",
      ruleBasis: surrenderRule,
      points: 2,
      requiresFactualSupport: true,
      guidance: "甲没有自动投案，如实供述的是警方已掌握的本次盗窃。",
    },
    {
      id: "injury_conclusion",
      title: "伤害部分结论",
      description:
        "另一起伤害部分以自首论，属于特别自首或余罪自首。只评伤害部分结论；单说伤害构成自首也可，不必背术语或条号。",
      ruleBasis: surrenderRule,
      points: 1,
      requiresFactualSupport: false,
      guidance: "尚未掌握的另一起伤害可依法以自首论。",
    },
    {
      id: "injury_reason",
      requiresConclusion: "injury_conclusion",
      title: "伤害部分依据",
      description:
        "须说明如实供述的是警方未掌握的本人故意伤害，且与已掌握的盗窃属不同种罪行。只评此部分依据，不把是否自动投案当作该项额外条件。",
      ruleBasis: surrenderRule,
      points: 2,
      requiresFactualSupport: true,
      guidance: "对应警方未掌握、本人罪行、与盗窃不同种及如实供述这些条件。",
    },
  ]),
  ...chapterScoringCandidates.filter((c) =>
    reviewedChapterIds.has(c.input.caseId),
  ),
];
export const bankScoringSummaries = bankScoringCards.map((c) => ({
  id: c.input.caseId,
  title: c.title,
  exerciseRevision: c.exerciseRevision,
  maxScore: c.card.items.reduce((n, item) => n + item.points, 0),
}));
