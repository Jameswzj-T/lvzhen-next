import type { UnitExercise } from "./fault-unit";
import { cl07Cases } from "./criminal-general/cl07";

// Keep the published exercises intact; corrected wording occupies the same
// practice slot with its own revision and answer history.
export const generalCorrectionsRevision =
  "criminal-general-corrections-2026-09-23.v1";

const originalCourier = cl07Cases.find(
  (c) => c.exercise.id === "cl07-unaware-courier",
)!.exercise;
const originalPartial = cl07Cases.find(
  (c) => c.exercise.id === "cl07-partial-intent",
)!.exercise;
const originalGroup = cl07Cases.find(
  (c) => c.exercise.id === "cl07-group-scope",
)!.exercise;

const partialId = "cl07-partial-intent-v2";
const partialPoints = [
  {
    label: "共同部分",
    meaning:
      "乙按住丙、甲踢打丙腿造成轻伤，可在双方约定的伤害范围内评价共同责任。",
    boundary: "不因甲后来独自追刺，就抹去乙已参与的先前伤害。",
  },
  {
    label: "超出部分",
    meaning:
      "甲突然拔出事先未告知乙的刀，在乙松手后刺向丙胸部；胸部刀伤与死亡应针对甲个别评价。",
    boundary: "不能把共同犯罪理解为对同伴后来一切行为无限连带。",
  },
  {
    label: "乙的边界",
    meaning:
      "乙到甲拔刀时才看见并出言制止、未追赶协助，现有事实不足以认定其共同杀人；先前伤害仍需评价。",
    boundary:
      "不把乙松手倒推为先前伤害已成立中止，也不凭空补充其对死亡的罪过。",
  },
];

export const generalCorrections: {
  topicId: string;
  replaces: string;
  exercise: UnitExercise;
}[] = [
  {
    topicId: "roles",
    replaces: originalGroup.id,
    exercise: {
      ...originalGroup,
      id: "cl07-group-scope-v2",
      facts:
        "甲、乙、丙、丁四人持续按固定分工实施盗窃。甲选定目标、分配任务并指挥，乙、丙、丁分别取财、望风，团伙盗窃已达到犯罪标准。某次行动结束后，乙因与戊的私人纠纷，独自约戊到外地将其打成经鉴定为轻伤；乙未告知甲等人，也未使用团伙资源，甲、丙、丁均未参与。",
      prompt:
        "甲对乙私下伤害戊是否也承担集团首要分子的责任？请区分集团盗窃与成员个人行为。",
      reference:
        "四人持续稳定分工、甲组织指挥，是审查犯罪集团及首要分子身份的具体事实。首要分子依刑法第二十六条对集团所犯的全部罪行负责，不等于对成员的一切个人犯罪负责。乙因私人纠纷独自伤害戊，未告知或借用团伙资源，现有事实不支持将其归于甲指挥的集团犯罪。甲对集团盗窃范围依法负责，不能仅凭首要地位承担乙的私下伤害责任。",
      criteria: originalGroup.criteria!.map((criterion, index) => {
        const meanings = [
          "四人稳定分工、甲组织指挥支持审查犯罪集团与首要分子；其法定责任限于集团所犯罪行。",
          "乙私下因私人纠纷独自伤害戊，团伙其他成员不知情、未参与，不能仅凭成员身份扩张集团责任。",
          "集团盗窃与乙个人伤害分别评价，不因排除后者而消除甲对前者的责任。",
        ];
        return {
          ...criterion,
          id: `cl07-group-scope-v2-p${index + 1}`,
          meaning: meanings[index],
          acceptable: `意思相当且能联系本案事实即可：${meanings[index]}`,
        };
      }),
    },
  },
  {
    topicId: "indirect-perpetration",
    replaces: originalCourier.id,
    exercise: {
      ...originalCourier,
      id: "cl07-unaware-courier-v2",
      reference:
        "甲通过替药支配毒物进入乙身体的过程，不能因自己未亲手喂药而逃避杀人责任。丙对药物被替换并不知情，题设又排除其发现替换的可能；不能仅凭递药动作认定丙有故意或过失。",
    },
  },
  {
    topicId: "excess",
    replaces: originalPartial.id,
    exercise: {
      ...originalPartial,
      id: partialId,
      facts:
        "甲、乙约定仅用拳脚打伤丙的腿。乙按住丙时，甲踢打丙腿，造成经鉴定为轻伤的伤势。甲随后突然从衣内抽出此前没有向乙提起或展示的刀。乙到甲拔刀时才看见，立即松手并喊‘别用刀’；甲仍刺中丙的胸部，丙因胸部刀伤死亡。",
      prompt:
        "按部分犯罪共同说，怎样评价甲、乙共同的伤害部分和甲突增的持刀袭击？现有事实是否足以认定乙共同故意杀人？",
      reference:
        "按设问采用的观点，乙按住、甲踢打造成轻伤，可在共同故意伤害范围内评价。甲事先隐瞒刀具并突然刺向胸部，死亡由该刀伤造成；乙直到拔刀才见、立即松手并出言制止，现有事实不足以认定其共同故意杀人，不能仅凭先前参与把甲的杀人故意归给乙。甲超出的行为与结果须个别评价；乙已经参与的腿部伤害也不能因后来松手而抹去。若主张乙对死亡另负责任，需要指出相应事实和法律根据。",
      criteria: partialPoints.map((point, index) => ({
        id: `${partialId}-p${index + 1}`,
        ...point,
        acceptable: `意思相当且能联系本案事实即可：${point.meaning}`,
      })),
    },
  },
];
