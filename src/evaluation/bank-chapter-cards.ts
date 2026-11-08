import { bankCard as card } from "./bank-scoring-card";

// Existing authored questions only. These are product training allocations,
// not an official exam scale. Candidates are enabled separately after review.
const stages =
  "刑法第二十二至二十四条：准备工具、制造条件是预备；已着手而因意志以外原因未得逞是未遂；犯罪过程中自动放弃或自动有效防止结果是中止。中止未造成损害的应当免除处罚，造成损害的应当减轻处罚。";
const roles =
  "刑法第二十六、二十七条：组织、领导集团犯罪或者在共同犯罪中起主要作用的是主犯；起次要或辅助作用的是从犯。集团首要分子对集团所犯的全部罪行负责，不当然对成员的全部个人犯罪负责。实行分工与主从作用不是同一分类。";
const execution =
  "刑法第七十六条：缓刑考验期满且无法定撤销情形，原判刑罚不再执行。第八十五条：假释考验期满且无法定撤销情形，认为原判刑罚已经执行完毕。二者不表示原判自始无效或犯罪事实消失。本题只问两人的原判刑罚状态，不另考撤销条件或附加刑。";

export const chapterScoringCandidates = [
  card("cl06-two-times", [
    {
      id: "jia_conclusion",
      title: "案一停止形态",
      description: "案一甲属于犯罪预备。只评停止形态结论。",
      ruleBasis: stages,
      points: 1,
      requiresFactualSupport: false,
      guidance: "案一应认定为犯罪预备。",
    },
    {
      id: "jia_reason",
      title: "案一行为依据",
      description:
        "联系甲购刀后仍在家中，说明已准备工具但尚未着手杀害。只评该理由，与结论项分别判断。",
      ruleBasis: stages,
      points: 2,
      requiresFactualSupport: true,
      requiresConclusion: "jia_conclusion",
      guidance: "购刀是在准备工具，在家被抓时尚未着手实行杀害。",
    },
    {
      id: "bing_conclusion",
      title: "案二停止形态",
      description: "案二丙属于犯罪未遂。只评停止形态结论。",
      ruleBasis: stages,
      points: 1,
      requiresFactualSupport: false,
      guidance: "案二应认定为犯罪未遂。",
    },
    {
      id: "bing_reason",
      title: "案二行为依据",
      description:
        "联系刺向胸部已经着手，以及旁人挡开使杀害未得逞，说明停止源于意志以外的阻止。只评该理由，与结论项分别判断。",
      ruleBasis: stages,
      points: 2,
      requiresFactualSupport: true,
      requiresConclusion: "bing_conclusion",
      guidance: "刺向胸部已经着手，旁人挡开是未得逞的外部原因。",
    },
  ]),
  card("cl06-no-damage", [
    {
      id: "conclusion",
      title: "停止形态",
      description:
        "甲成立故意杀人中止。只评形态判断，不把未造成损害等同于没有犯罪。",
      ruleBasis: stages,
      points: 1,
      requiresFactualSupport: false,
      guidance: "甲成立犯罪中止，免除处罚不等于没有犯罪。",
    },
    {
      id: "reason",
      title: "主动、有效防止结果",
      description:
        "联系甲主动揭示并撤除已放到乙面前的毒饮，说明在犯罪过程中自动且有效地阻止死亡。无需另列着手术语；只评事实与中止条件的联系。",
      ruleBasis: stages,
      points: 3,
      requiresFactualSupport: true,
      requiresConclusion: "conclusion",
      guidance: "说明主动拿走并处置毒饮，实际防止了乙饮用和死亡。",
    },
    {
      id: "penalty",
      title: "无损害中止的处罚",
      description:
        "联系本案未造成任何损害，指出依法应当免除处罚。只写可从宽或没有死亡，不足以完成本项。",
      ruleBasis: stages,
      points: 2,
      requiresFactualSupport: true,
      requiresConclusion: "conclusion",
      guidance: "本案没有造成损害，对中止犯应当免除处罚。",
    },
  ]),
  card("cl06-review-rescue-chain", [
    {
      id: "conclusion",
      title: "停止形态",
      description: "甲成立故意杀人中止。只评形态判断。",
      ruleBasis: stages,
      points: 1,
      requiresFactualSupport: false,
      guidance: "死亡被有效阻止，应认定为犯罪中止。",
    },
    {
      id: "rescue",
      title: "医生介入与救助效果",
      description:
        "说明甲主动提供关键解毒信息促成医生救治，实际阻止死亡；医生实施治疗不排除甲有效防止结果。须有本案事实联系，不要求复述全部救助细节。",
      ruleBasis: stages,
      points: 2,
      requiresFactualSupport: true,
      requiresConclusion: "conclusion",
      guidance: "甲提供的解毒信息促成有效救治，通过医生救助也可成立中止。",
    },
    {
      id: "penalty",
      title: "已造成损害的处罚",
      description:
        "联系乙已经受到轻伤，指出对中止犯应当减轻处罚，不能因未死亡而适用无损害中止的免除处罚。",
      ruleBasis: stages,
      points: 3,
      requiresFactualSupport: true,
      requiresConclusion: "conclusion",
      guidance: "乙已受轻伤，属于造成损害的中止，应当减轻处罚。",
    },
  ]),
  card("cl07-group-scope", [
    {
      id: "conclusion",
      title: "责任结论",
      description:
        "不能仅凭甲是集团首要分子，就让甲承担乙的一切个人犯罪；甲不因此对该私人伤害负责。两种表述其一可成立结论。",
      ruleBasis: roles,
      points: 1,
      requiresFactualSupport: false,
      guidance: "首要分子不当然对成员的一切个人犯罪负责。",
    },
    {
      id: "scope",
      title: "集团犯罪的责任范围",
      description:
        "指出首要分子承担集团所犯的全部罪行，而不是成员的一切犯罪。只评法定范围；不另要求集团人数或成立条件。",
      ruleBasis: roles,
      points: 2,
      requiresFactualSupport: false,
      requiresConclusion: "conclusion",
      guidance: "责任范围应限定于集团所犯的全部罪行。",
    },
    {
      id: "private_injury",
      title: "本案私人伤害",
      description:
        "联系私人纠纷、单独行动、团伙无人知情参与或未用团伙资源等事实，说明伤害不属该集团犯罪活动。事实足以支持边界即可，不必逐项复述。",
      ruleBasis: roles,
      points: 3,
      requiresFactualSupport: true,
      requiresConclusion: "conclusion",
      guidance: "结合私人纠纷和单独行动，说明伤害属于集团活动以外的个人犯罪。",
    },
  ]),
  card("cl07-review-main-accessory", [
    {
      id: "conclusion",
      title: "搬运与主犯的区别",
      description:
        "不能仅因乙亲手搬运就认定乙必定是主犯；直接实行与主从作用并非同一标准。只评该判断。",
      ruleBasis: roles,
      points: 1,
      requiresFactualSupport: false,
      guidance: "亲手实行不必然等于主犯，应看在共同犯罪中的作用。",
    },
    {
      id: "jia_role",
      title: "甲的实际作用",
      description:
        "联系甲挑选目标、召集、持续指挥等事实，说明甲的组织支配体现主要作用。无需逐项复述全部动作。独立评价甲，不受乙的结论影响。",
      ruleBasis: roles,
      points: 2,
      requiresFactualSupport: true,
      guidance: "甲策划、组织和指挥犯罪，体现主要作用。",
    },
    {
      id: "yi_role",
      title: "乙的实际作用",
      description:
        "联系乙临时接受安排、有限参与和缺乏决策支配，按实际作用审查是否次要。可认定从犯或说明须综合作用判断；只给称谓或只凭分赃多少不足。不另要求从犯处罚规则。",
      ruleBasis: roles,
      points: 3,
      requiresFactualSupport: true,
      requiresConclusion: "conclusion",
      guidance:
        "结合乙受安排、参与程度和控制力判断次要作用，不只看搬运或分赃。",
    },
  ]),
  card("cl10-review-suspension-parole", [
    {
      id: "suspension",
      title: "甲的缓刑期满",
      description:
        "甲缓刑考验期满，原判刑罚不再执行；不等同原判监禁刑已执行完毕或原判无效。设问只要求法律状态，不要求复述题干已给出的期满及无撤销条件。",
      ruleBasis: execution,
      points: 3,
      requiresFactualSupport: false,
      guidance: "缓刑考验期满，甲的原判刑罚不再执行。",
    },
    {
      id: "parole",
      title: "乙的假释期满",
      description:
        "乙假释考验期满，法律上认为原判刑罚已经执行完毕；不要求说实际在监狱服满八年。设问只要求法律状态，不要求另列撤销条件。",
      ruleBasis: execution,
      points: 3,
      requiresFactualSupport: false,
      guidance: "假释考验期满，认为乙的原判刑罚已经执行完毕。",
    },
  ]),
];
