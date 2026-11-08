import type { UnitExercise } from "./fault-unit";
import { cl02Cases } from "./criminal-package-one/cl02";
import { packageOneSources } from "./criminal-package-one/knowledge";

// Published questions keep their original snapshot. A corrected question takes
// the same practice slot under a new ID and revision.
export const packageOneCorrectionsRevision =
  "criminal-package-one-corrections-2026-09-23.v1";

export const packageOneCorrectionSources = {
  ...packageOneSources,
  fireRescue: {
    title: "《中华人民共和国消防法》第四十四、四十五条",
    url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/qtwj/202307/t20230726_3207767.html",
    note: "北京市人民政府门户网站收录的2021年修正文本：消防队须救助遇险人员，火场扑救优先保障生命。题中的破窗行为仍须结合救援需要、现场指挥和具体范围判断；不把第四十五条第五项直接当作破损起火建筑自身窗户的授权。",
  },
};

const originalGas = cl02Cases.find(
  (c) => c.exercise.id === "cl02-review-gas",
)!.exercise;
const originalRescue = cl02Cases.find(
  (c) => c.exercise.id === "cl02-review-two-damage",
)!.exercise;
const gasId = "cl02-review-gas-v2";
const gasCriteria = originalGas.criteria!.map((criterion, index) => {
  if (index !== 1) return { ...criterion, id: `${gasId}-p${index + 1}` };
  const meaning =
    "题设已说明泄漏引发爆炸、关阀能停止继续泄漏；关阀能否避免已积聚燃气造成的爆炸仍需核对。";
  return {
    ...criterion,
    id: `${gasId}-p2`,
    meaning,
    acceptable: `意思相当且能联系本案事实即可：${meaning}`,
    boundary:
      "不能把停止继续泄漏直接等同于一定避免爆炸，也不重复核实题设已确认的泄漏死因。",
  };
});

export const packageOneCorrections: {
  topicId: string;
  replaces: string;
  exercise: UnitExercise;
}[] = [
  {
    topicId: "crime-threshold",
    replaces: originalRescue.id,
    exercise: {
      ...originalRescue,
      id: "cl02-review-two-damage-v2",
      facts:
        "仓库发生火灾，一名工人被困在二层，东侧楼梯已被火封住。现场指挥让消防员甲从能接近工人的外窗进入。甲敲破该窗、进入救出工人，未损坏其他财物。旁观者乙认为窗户价值较大，甲有意敲破就是故意毁坏财物罪；消防员只是履职，可以等定罪后再免刑。",
      reference:
        "不能只凭有意破窗和财产损失认定犯罪。题设中的火灾、被困人员、受阻楼梯、现场指挥及限定的破窗范围，是评价紧急救援及行为正当性的具体依据；不能先机械入罪再以消防员身份免刑。消防员身份本身也不使任何毁财行为合法，仍须结合救援需要、权限和行为范围判断。",
      sources: [...originalRescue.sources, "fireRescue"],
    },
  },
  {
    topicId: "omission-duty",
    replaces: originalGas.id,
    exercise: {
      ...originalGas,
      id: gasId,
      prompt:
        "依据已知事实，区分甲未关阀与爆炸的客观联系中可以确定和仍需核实的部分；能否仅凭甲没有点火就排除责任？",
      reference:
        "不能仅凭甲没有点火排除责任。甲检修后遗留危险，返回时闻到气味、看到警报及住户求助，且能关闭总阀停止继续泄漏。题设已确认泄漏引发爆炸，不必再把这一因果事实说成待核。关阀能否避免爆炸仍需核对：屋内是否已积聚足以爆炸的燃气，以及关阀后的现场条件尚未交代。义务、履行可能性、结果避免可能性和罪过应分别判断，不能由客观联系直接推出故意或具体罪名。",
      criteria: gasCriteria,
    },
  },
];
