import { exerciseFor } from "../content/fault-catalog";
import type { FaultProgress } from "./fault-progress";
import { submittedFeedbackSchema } from "./submitted-feedback";
import { currentQuestionTeacher } from "./current-question-teacher";
import type { TeacherFeedbackView } from "./teacher-feedback-contract";

export type TeacherLearningRecords = Pick<
  FaultProgress,
  "attempts" | "submittedFeedback"
>;

/** Local, read-only advice. Never sends history or infers mastery from a count.
 * Only compatible saved teacher judgments on this exact question/version count.
 * Pending, missing, incompatible and future records are not negative evidence.
 */
export function teacherLearningAdvice(
  view: TeacherFeedbackView,
  records?: TeacherLearningRecords,
): TeacherFeedbackView["learningAdvice"] {
  const same =
    records?.attempts.filter((a) => a.id === view.binding.answerId) ?? [];
  const a = same[0];
  const current =
    a &&
    a.exerciseId === view.binding.questionId &&
    a.revision === view.binding.questionRevision &&
    a.answer === view.originalText &&
    !a.choice &&
    same.every((b) => JSON.stringify(b) === JSON.stringify(a)) &&
    Number.isFinite(Date.parse(a.submittedAt))
      ? a
      : null;
  const support = current
    ? current.referenceSeenBeforeAnswer ||
      current.hintUsed ||
      current.feedbackRetry
      ? true
      : current.referenceSeenBeforeAnswer === false &&
          current.hintUsed === false
        ? false
        : "unknown"
    : "unknown";
  const prior: { id: string; at: string; view: TeacherFeedbackView }[] = [];
  if (current && records) {
    const ids = new Map<string, typeof current>();
    const conflicts = new Set<string>();
    for (const p of records.attempts) {
      if (
        p.exerciseId !== current.exerciseId ||
        p.revision !== current.revision ||
        p.id === current.id ||
        p.choice ||
        !Number.isFinite(Date.parse(p.submittedAt)) ||
        Date.parse(p.submittedAt) >= Date.parse(current.submittedAt)
      )
        continue;
      if (ids.has(p.id) && JSON.stringify(ids.get(p.id)) !== JSON.stringify(p))
        conflicts.add(p.id);
      ids.set(p.id, p);
    }
    for (const [id, p] of ids) {
      if (conflicts.has(id)) continue;
      const rows = (records.submittedFeedback ?? []).filter(
        (r) => r.attemptId === id,
      );
      const parsed = submittedFeedbackSchema.safeParse(rows.at(-1));
      if (!parsed.success) continue;
      const row = parsed.data;
      if (
        row.id !== `submitted:${id}:${row.result.id}` ||
        row.questionId !== p.exerciseId ||
        row.revision !== p.revision ||
        row.answer !== p.answer ||
        row.choice ||
        !row.result.sourceTeacher ||
        Date.parse(row.observedAt) > Date.parse(current.submittedAt) ||
        row.result.pointReviews?.some(
          (review) => review.state === "needs_review",
        ) ||
        rows.some(
          (r) => r.id === row.id && JSON.stringify(r) !== JSON.stringify(row),
        )
      )
        continue;
      try {
        prior.push({
          id,
          at: p.submittedAt,
          view: currentQuestionTeacher(row.result, p),
        });
      } catch {
        /* No inference from invalid saved feedback. */
      }
    }
  }
  prior.sort((a, b) => a.at.localeCompare(b.at) || a.id.localeCompare(b.id));
  const point = view.improvements[0];
  const label = exerciseFor(view.binding.questionId)?.criteria?.find(
    (c) => c.id === point?.criterionId,
  )?.label;
  const prefix = prior.length
    ? `结合这题前面 ${prior.length} 次已保存的反馈，`
    : "目前只根据这道题，";
  let text: string;
  let comparison: NonNullable<
    TeacherFeedbackView["learningAdvice"]
  >["comparison"];
  if (view.pending.length || view.judgment.kind === "needs_review") {
    text = prefix + "先把还说不准的地方弄清，再继续练；这些地方暂不记成答错。";
  } else if (point) {
    const repeated = prior.some((p) =>
      p.view.improvements.some((x) => x.criterionId === point.criterionId),
    );
    text =
      prefix +
      (label
        ? `这次${repeated ? "仍" : ""}要补的是“${label}”；`
        : "先改最关键的一处；") +
      "回看相关要点，再用自己的话重答一次。";
  } else if (view.judgment.kind === "correct") {
    const previous = prior.at(-1);
    const changed =
      previous?.view.improvements.filter((p) =>
        view.strengths.some((s) => s.criterionId === p.criterionId),
      ) ?? [];
    const requirements = exerciseFor(view.binding.questionId)?.criteria ?? [];
    const points = changed.flatMap((p) => {
      const criterion = requirements.find((c) => c.id === p.criterionId);
      return criterion
        ? [{ criterionId: p.criterionId, label: criterion.label }]
        : [];
    });
    if (previous && points.length) {
      comparison = {
        kind: "saved_feedback_change",
        previousAnswerId: previous.id,
        previousResultId: previous.view.binding.resultId,
        currentAnswerId: view.binding.answerId,
        currentResultId: view.binding.resultId,
        points,
      };
    }
    // Detailed point names remain in the bound comparison record. Do not repeat
    // the same labels again between the correct-point list and its action.
    text =
      (comparison
        ? "前一次需要修改的地方，这次反馈已列为答对；"
        : "这次反馈认为你答到了要点；") +
      (support === true
        ? "这是看过提示或反馈后的练习，接着换一道题，看看能否自己答出。"
        : support === "unknown"
          ? "这份记录无法确认作答前是否看过提示，接着换一道题再试。"
          : "接着换一道题，看看换个案情能否自己答出。");
  } else
    text =
      prefix +
      "先对照本题参考找出判断和理由，再重答一次；暂不据此判断其他知识点。";
  if (support === true && view.judgment.kind !== "correct")
    text += "这次是看过提示或反馈后的练习。";
  return {
    text,
    priorAttemptIds: prior.map((p) => p.id),
    scope: "same_question_same_revision_local_only",
    currentWithSupport: support,
    ...(comparison ? { comparison } : {}),
  };
}
