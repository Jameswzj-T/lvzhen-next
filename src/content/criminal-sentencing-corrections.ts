import type { UnitExercise } from "./fault-unit";
import { cl09Cases } from "./criminal-general/cl09";
import { cl10Cases } from "./criminal-general/cl10";
import { generalSources } from "./criminal-general/knowledge";

// Published exercises remain available to saved answers; these revisions take
// their existing practice slots without changing the original questions.
export const sentencingCorrectionsRevision =
  "criminal-sentencing-corrections-2026-09-24.v1";

export const sentencingCorrectionSources = {
  ...generalSources,
  reductionInterpretation: {
    title: "最高法《关于办理减刑、假释案件具体应用法律的规定》第十七条",
    url: "https://www.court.gov.cn/zixun/xiangqing/30621.html",
    note: "法释〔2016〕23号，自2017-01-01施行。被判死缓、无期徒刑者初次减为有期徒刑时，附加剥夺政治权利改为七年以上十年以下；后续减刑后的最终期限不得少于三年。与刑法第五十七条的三年以上十年以下总范围区分。",
  },
};

const originalLifetime = cl09Cases.find(
  (c) => c.exercise.id === "cl09-review-lifetime",
)!.exercise;
const originalSelfReport = cl10Cases.find(
  (c) => c.exercise.id === "cl10-review-self-report",
)!.exercise;
const originalParole = cl10Cases.find(
  (c) => c.exercise.id === "cl10-parole-time",
)!.exercise;

const selfReportId = "cl10-review-self-report-v2";

export const sentencingCorrections: {
  topicId: string;
  replaces: string;
  exercise: UnitExercise;
}[] = [
  {
    topicId: "rights-deprivation",
    replaces: originalLifetime.id,
    exercise: {
      ...originalLifetime,
      id: "cl09-review-lifetime-v2",
      prompt:
        "无期徒刑初次减为有期徒刑时，附加剥夺政治权利如何处理？下列哪些说法正确？",
      options: originalLifetime.options!.map((option) =>
        option.id === "b"
          ? {
              ...option,
              text: "初次减为有期徒刑时，附加剥夺政治权利应改为七年以上十年以下。",
              explanation:
                "刑法第五十七条规定三至十年的总范围；减刑司法解释第十七条对初次改期规定七至十年。",
            }
          : option,
      ),
      reference:
        "判处无期徒刑时应附加剥夺政治权利终身。无期徒刑初次减为有期徒刑时，刑法第五十七条规定改为三年以上十年以下，减刑司法解释第十七条具体要求本次改为七年以上十年以下；后续减刑最终期限不得少于三年。附加刑不会自行消失。",
      sources: [...originalLifetime.sources, "reductionInterpretation"],
    },
  },
  {
    topicId: "surrender-confession",
    replaces: originalSelfReport.id,
    exercise: {
      ...originalSelfReport,
      id: selfReportId,
      facts:
        "甲因盗窃已被公安机关依法刑事拘留。甲如实供述了警方已掌握的本次盗窃；又主动如实供述警方尚未掌握的一起不同种故意伤害罪行。此前甲没有主动投案。",
      criteria: originalSelfReport.criteria!.map((criterion, index) => ({
        ...criterion,
        id: `${selfReportId}-p${index + 1}`,
      })),
    },
  },
  {
    topicId: "reduction-parole",
    replaces: originalParole.id,
    exercise: {
      ...originalParole,
      id: "cl10-parole-time-v2",
      title: "服刑满一半",
      facts:
        "甲因非限制假释的普通犯罪被判有期徒刑八年，已执行四年。甲认为只要达到原判刑期的一半，执行机关就必须放他回家，是否悔改不用再查。",
    },
  },
];
