import { faultSources } from "./fault-unit";
import { objectMistakeSources } from "./object-mistake";
import { blowMistakeSources } from "./blow-mistake";

export const studyQuestions = [
  {
    id: "missed-target",
    topicId: "blow-mistake",
    title: "打偏伤了别人，就只能算过失吗？",
    source: blowMistakeSources.intent,
    answer: [
      "不能直接下这个结论。打击错误描述的是实行偏离；是否有故意，还与题目采用的评价观点有关。",
      "在同一犯罪构成范围内，法定符合说可认定对实际结果有故意；具体符合说不把对原定对象的故意直接用于另一对象。过失须另外查明注意义务和预见可能性，既不能凭打偏就认定，也不能凭没看见就排除。",
    ],
  },
  {
    id: "same-risk",
    topicId: "confidence",
    title: "都预见了风险，为什么结论还会不同？",
    source: faultSources.law,
    answer: [
      "预见风险，说明行为人认识到了什么；还要继续判断他怎样对待结果。",
      "接受危害结果发生，与轻信自己可以避免，是不同的态度。看题时，把‘预见了什么’与‘凭什么相信能避免／是否接受结果’分开分析。继续行为本身不能代替这个判断。",
    ],
  },
  {
    id: "no-wish",
    topicId: "intent",
    title: "不希望发生，就一定不是故意吗？",
    source: faultSources.law,
    answer: [
      "还需要看是否放任。不希望结果发生，但明知可能发生并且接受它，仍可能是间接故意。",
      "答题时不要停在‘他不想伤人’。接着从案情说明：他是接受伤人，还是轻信能够避免。这里讨论主观罪过，具体罪名及其他成立条件仍要另行判断。",
    ],
  },
  {
    id: "mistaken-person",
    topicId: "object-mistake",
    title: "认错了人，就变成过失了吗？",
    source: objectMistakeSources.intent,
    answer: [
      "不一定。把眼前的丙认作乙后主动打伤，认错的是具体身份；这不当然改变伤害他人的认识和态度。",
      "还要区分错误发生在哪里：认对了乙却打偏伤丙，是打击错误；把他人的东西误当作自己的拿走，则涉及是否认识到他人财物。不能仅凭认错两个字下同一种结论。",
    ],
  },
];
