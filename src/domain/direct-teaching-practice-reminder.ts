import type { UnitFeedbackView } from "../evaluation/unit-feedback";

// Question-owned practice focuses. These select a reminder, never classify an
// answer, change a model label, recommend an invented question or record mastery.
const focuses = [
  {
    questionId: "crimpro-arrest-release-explain-v2",
    revision: "crimpro-arrest-review-2026-10-15.v2",
    criterionId: "arrest-release-without-waiting",
    text: "区分解除原拘留的时间与后续继续侦查的方式",
  },
  {
    questionId: "commercial-transfer-overdue-explain-v2",
    revision: "commercial-transfer-contribution-2026-10-15.v2",
    criterionId: "overdue-joint-scope",
    text: "结合转让时出资是否已到期、受让人是否知情，判断责任性质与范围",
  },
];

export function directTeachingPracticeReminder(view: UnitFeedbackView) {
  if (view.teachingStyle !== "direct-overall-v3") return null;
  const uncertain = view.points.filter((p) => p.status === "uncertain");
  if (!uncertain.length) return null;
  const selected = focuses.find(
    (f) =>
      f.questionId === view.questionId &&
      f.revision === view.questionRevision &&
      uncertain.some((p) => p.id === f.criterionId),
  );
  const focus =
    selected?.text ??
    `判断${uncertain
      .slice(0, 2)
      .map((p) => `“${p.label}”`)
      .join("和")}`;
  return (
    (view.status === "needs_clarification" ? "先补明本题反馈中的问题。" : "") +
    `下次用完整的新案情，先自己${focus}，再看讲解。`
  );
}
