import type { ContentSources, UnitExercise } from "./fault-unit";
import { borderDrugCases } from "./criminal-social/border-drug";

// Question-only version: keep the previous question available for old answers.
export const borderQuestionScopeRevision =
  "criminal-border-question-scope-2026-10-03.v1";

export const borderQuestionScopeSources: ContentSources = {
  law: {
    title: "《中华人民共和国刑法》第三百二十二条等相关条款",
    url: "https://tianjin.chinatax.gov.cn/11200000000/0300/030004/03000418/20240920152615743.shtml",
    note: "2026-10-03直接读取本题偷越规则。该候选只使设问明示原有罪数采分要求，不增加实体结论、刑期或其他严重情节义务。",
  },
  border2022: {
    title: "两高一部一局《关于依法惩治妨害国（边）境管理违法犯罪的意见》",
    url: "https://www.court.gov.cn/fabu/xiangqing/363931.html",
    note: "法发〔2022〕18号。2026-10-03直接读取第10项犯罪后为逃避刑事追究偷越的严重情节路径；文件性质为意见。未将次数当作唯一门槛。",
  },
};

const original = borderDrugCases.find(
  ({ exercise }) => exercise.id === "cl18-border-escape-crime",
);
if (!original) throw new Error("Missing published border-escape question");

export const borderQuestionScopeCorrections: {
  topicId: string;
  replaces: string;
  exercise: UnitExercise;
}[] = [
  {
    topicId: original.topicId,
    replaces: original.exercise.id,
    exercise: {
      ...original.exercise,
      id: "cl18-border-escape-crime-v2",
      prompt:
        "是否因为只有一次偷越，就只能行政处理？结合题设说明理由，并说明已实施的抢劫与本次偷越的罪数关系。",
    },
  },
];

export const borderQuestionScopeSnapshot = {
  topics: [],
  exercises: borderQuestionScopeCorrections.map(({ exercise }) => exercise),
};
