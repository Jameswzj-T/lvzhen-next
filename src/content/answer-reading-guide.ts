import { defenseLessonCorrection } from "./criminal-defense-lesson-correction";

/** Authored learning copy, separate from model input, scoring and saved replies.
 * Exact content identity prevents applying this guide to another question/version. */
export function answerReadingGuide(view: {
  questionId: string;
  questionRevision: string;
  contentId: string;
}) {
  const legacy =
    view.questionId === "cl05-limit-context" &&
    view.questionRevision === "criminal-general-2026-09-15.v1" &&
    view.contentId ===
      "622aa0fb00b98ef6d758fa8b840656c12526c8723a2ac1ced870c2f88f8651bb";
  const current =
    view.questionId === "cl05-limit-context-v2" &&
    view.questionRevision === "criminal-defense-lesson-2026-10-18.v1" &&
    view.contentId ===
      "c8be702f76eb03e9b037eb830513b9485a8b354402a96183a94acbed4978c69e";
  if (!legacy && !current) return null;
  return {
    version: "answer-reading-guide-20261018.v3",
    additionalPointIds: legacy ? ["cl05-limit-context-p3"] : [],
    requirements: current
      ? Object.fromEntries(
          defenseLessonCorrection.exercise.criteria!.map((c) => [
            c.id,
            { title: c.label, text: c.meaning },
          ]),
        )
      : ({
          "cl05-limit-context-p1": {
            title: "重伤不能单独证明防卫过当",
            text: "要同时判断：①反击是否明显超过必要限度；②是否造成重大损害。重伤只说明第二项。",
          },
          "cl05-limit-context-p2": {
            title: "用当时的处境解释反击是否过限",
            text: "联系三人围堵、轮流击打、视线受阻、散开后立即停手，说明反击与制止侵害的关系；不要求逐字列齐案情。",
          },
          "cl05-limit-context-p3": {
            title: "特殊防卫：进一步分析",
            text: "检查围攻是否已严重危及人身安全；达到该程度时，可适用特殊防卫。不能只凭人数多就直接认定。",
          },
        } as Record<string, { title: string; text: string }>),
    reference: defenseLessonCorrection.exercise.reference.split("\n\n"),
    extra: {
      title: "补充：特殊防卫",
      text: "多人围攻还要看危险到了什么程度。正在发生的暴力犯罪已严重危及人身安全时，可以适用特殊防卫，防卫致侵害人重伤、死亡也不属于防卫过当；没有达到这个程度，仍按一般防卫判断反击限度。",
    },
    scopeNote: legacy
      ? "旧设问主要问重伤能不能直接说明过当。这里补齐本案讲解，旧原答仍按旧要求保留。特殊防卫作为补充讲解，不把没有讨论这一点说成答错。"
      : "本题要求给出本案结论并说明重伤与反击手段的评价；特殊防卫作为补充讲解，不把没有讨论这一点说成答错。",
    reminder:
      "答这类题，先分清“造成重伤”和“反击明显过限”，再用案情解释反击的必要性。",
    source: {
      title: "两高一部正当防卫指导意见",
      url: "https://www.court.gov.cn/zixun/xiangqing/251611.html",
    },
  };
}
