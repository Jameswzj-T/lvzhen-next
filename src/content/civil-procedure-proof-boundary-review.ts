import type { ContentSources, UnitExercise } from "./fault-unit";
import * as original from "./civil-procedure-proof-burden";

// The reviewed clarification is a new answer edition. Original publication,
// card text, saved answers and old grading contracts remain readable.
export const civilProcedureProofBoundaryRevision =
  "civpro-agreement-proof-boundary-2026-10-16.v2";
export const civilProcedureProofBoundaryOldId =
  "civpro-agreement-unproven-explain";
export const civilProcedureProofBoundaryId =
  "civpro-agreement-unproven-explain-v2";
export const civilProcedureProofBoundaryClarification =
  "结合完整答文区分裁判处理与客观事实已经证实。‘因举证不足，在本案裁判中不予认定／认定不存在’本身不作相反判断；只有明确把这种处理说成已经查实双方从未订约，才属于本项错误。未回答这一区别的，按实际缺少的内容处理，不凭关键词判错。";

const prior = original.civilProcedureProofBurdenQuestion(
  civilProcedureProofBoundaryOldId,
)!;
export const civilProcedureProofBoundarySources: ContentSources = {
  ...original.civilProcedureProofBurdenSources,
  "civpro-proof-interpretation108": {
    title: "最高法民诉解释2022修正第108条：证明程度与裁判认定",
    url: "https://www.court.gov.cn/zixun/xiangqing/353651.html",
    note: "2026-10-16直接核读最高法2022-04-02公布、2022-04-10施行的整合文本第108条。第2款使用‘应当认定该事实不存在’的裁判表述，本题区分裁判上的处理与已查实客观上从未订约；不能按出现‘不存在’几个字判错。同日主控依据完整公开题文与90–91、108条通过有界审校并批准此边界澄清。不宣称2027全年现行效力、专业法律签收或模型语义已验收；后续清理仍有未核范围。",
  },
};
export const civilProcedureProofBoundaryQuestion: UnitExercise = {
  ...prior,
  id: civilProcedureProofBoundaryId,
  criteria: prior.criteria!.map((criterion) =>
    criterion.id === "agreement-unknown-not-negated"
      ? {
          ...criterion,
          boundary:
            criterion.boundary + civilProcedureProofBoundaryClarification,
        }
      : { ...criterion },
  ),
  sources: [...prior.sources, "civpro-proof-interpretation108"],
};
export const civilProcedureProofBoundaryCorrections = [
  {
    topicId: "civpro-proof-burden",
    replaces: civilProcedureProofBoundaryOldId,
    exercise: civilProcedureProofBoundaryQuestion,
  },
];
export const civilProcedureProofBoundaryContentPack = {
  revision: civilProcedureProofBoundaryRevision,
  snapshot: {
    topics: original.civilProcedureProofBurdenTopics.map((topic) => ({
      ...topic,
      sources: Object.keys(civilProcedureProofBoundarySources),
      exercises: [civilProcedureProofBoundaryQuestion],
    })),
    sources: civilProcedureProofBoundarySources,
  },
};

export {
  civilProcedureProofBurdenChapter,
  civilProcedureProofBurdenContentPack,
} from "./civil-procedure-proof-burden";
export const civilProcedureProofBurdenExercises =
  original.civilProcedureProofBurdenExercises.map((q) =>
    q.id === civilProcedureProofBoundaryOldId
      ? civilProcedureProofBoundaryQuestion
      : q,
  );
export const civilProcedureProofBurdenTopics =
  original.civilProcedureProofBurdenTopics.map((topic) => ({
    ...topic,
    exercises: civilProcedureProofBurdenExercises,
  }));
// Lookup ownership includes the immutable old form so old cursors remain valid.
// Selection and the study directory continue to use only the four current forms.
export const civilProcedureProofBurdenLookupTopics =
  original.civilProcedureProofBurdenTopics.map((topic) => ({
    ...topic,
    exercises: [...topic.exercises, civilProcedureProofBoundaryQuestion],
  }));
export const civilProcedureProofBurdenDefaultQueues = {
  objective: civilProcedureProofBurdenExercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: civilProcedureProofBurdenExercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function civilProcedureProofBurdenQuestion(id: string) {
  return id === civilProcedureProofBoundaryId
    ? structuredClone(civilProcedureProofBoundaryQuestion)
    : original.civilProcedureProofBurdenQuestion(id);
}
export function civilProcedureProofBurdenTopicForQuestion(id: string) {
  return id === civilProcedureProofBoundaryOldId
    ? original.civilProcedureProofBurdenTopicForQuestion(id)
    : structuredClone(
        civilProcedureProofBurdenTopics.find((t) =>
          t.exercises.some((q) => q.id === id),
        ),
      );
}
export function civilProcedureProofBurdenSameCaseQuestions(id: string) {
  if (id === civilProcedureProofBoundaryOldId)
    return original.civilProcedureProofBurdenSameCaseQuestions(id);
  const q = civilProcedureProofBurdenQuestion(id);
  return q
    ? structuredClone(
        civilProcedureProofBurdenExercises.filter((x) => x.caseId === q.caseId),
      )
    : [];
}
