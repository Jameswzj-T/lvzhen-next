import type { ContentSources, UnitExercise } from "./fault-unit";
import { cl06Cases } from "./criminal-general/cl06";
import { generalSources } from "./criminal-general/knowledge";
import { sentencingCorrections } from "./criminal-sentencing-corrections";

// New versions occupy the existing practice slots; published snapshots stay intact.
export const generalAuditRevision = "criminal-general-audit-2026-09-30.v1";

export const generalAuditSources: ContentSources = {
  ...generalSources,
  law: {
    title:
      "《中华人民共和国刑法》第十四、二十三、八十一、八十二、九十九及二百三十二条",
    url: "https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/bgt/art/2025/art_890f1333b6284c3cbb225c3cd2647c4b.html",
    note: "2026-09-30核对市场监管总局所载刑法对应条款：故意与未遂、假释条件与程序，以及‘以上’包括本数。仅用于本次两道修订题，不据此宣称已完成全部法律更新核对。",
  },
  intentAssessment: {
    title: "故意杀人未遂与故意伤害的区分——徐州中院裁定被告人周某故意杀人案",
    url: "https://www.sdcourt.gov.cn/wfhtqfy/443063/443232/7897932/index.html",
    note: "2026-09-30取得法院网站检索正文，直开失败。参照综合起因、工具、攻击部位与强度、行为节制等事实判断故意的分析方法；属于裁判分析，不是司法解释。题目自行编写，不移用该案事实。",
  },
};

const originalTool = cl06Cases.find(
  (item) => item.exercise.id === "cl06-review-new-tool",
)!.exercise;
const previousParole = sentencingCorrections.find(
  (item) => item.exercise.id === "cl10-parole-time-v2",
)!.exercise;

export const generalAuditCorrections: {
  topicId: string;
  replaces: string;
  exercise: UnitExercise;
}[] = [
  {
    topicId: "attempt",
    replaces: originalTool.id,
    exercise: {
      ...originalTool,
      id: "cl06-review-new-tool-v2",
      facts:
        "甲与乙长期结怨，携带一把尖刀在乙下班途中等候。乙出现后，甲冲上前连续用力刺向乙的胸口、颈部，乙用背包抵挡并后退躲闪，未被刺中。甲再次猛刺时刀尖撞上铁栏，刀柄断裂，乙趁机跑远。甲追赶未能追上，回家另购刀具准备日后再袭击。",
      options: originalTool.options!.map((option) =>
        option.id === "a"
          ? {
              ...option,
              explanation:
                "结怨后持尖刀等候、连续用力刺向胸颈并追赶，支持认定杀人故意；直接刺击已着手，刀柄断裂和乙逃脱使其未得逞。不能仅凭持刀就认定杀人故意。",
            }
          : option,
      ),
      reference:
        "甲结怨后持尖刀等候，连续用力刺向胸颈要害，并在乙逃跑后追赶，这组事实支持认定杀人故意；不能仅凭持刀袭击推定杀人故意。直接刺击已进入实行，刀柄断裂、乙逃脱导致未得逞，依刑法第二十三条认定本次故意杀人未遂。未遂不要求穷尽所有替代工具；事后另购刀具不改变本次已发生的未遂。",
      sources: [...originalTool.sources, "intentAssessment"],
    },
  },
  {
    topicId: "reduction-parole",
    replaces: previousParole.id,
    exercise: {
      ...previousParole,
      id: "cl10-parole-time-v3",
      options: previousParole.options!.map((option) =>
        option.id === "a"
          ? {
              ...option,
              text: "执行满原判刑期二分之一，只达到通常时间门槛，还须审查悔改、再犯罪危险等并经法院法定程序。",
              explanation:
                "刑法第八十一条规定执行原判刑期二分之一以上；第九十九条规定‘以上’包括本数。八年刑期已执行四年达到通常时间门槛，但并不当然假释。",
            }
          : option,
      ),
      reference:
        "本案已排除不得假释的类别。八年刑期执行四年，满原判刑期二分之一，符合刑法第八十一条的通常时间门槛；第九十九条规定‘以上’包括本数，不要求超过一半。仍须审查遵守监规、接受教育改造、确有悔改表现、没有再犯罪危险等条件，考虑对所居住社区的影响，并依法由法院裁定，不能仅因时间届满自动假释。",
    },
  },
];
