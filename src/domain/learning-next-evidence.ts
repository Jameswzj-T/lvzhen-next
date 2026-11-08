import { exerciseRevision } from "../content/fault-catalog";
import { practiceSubject, practiceTopic } from "../content/practice-set";
import type { FaultProgress } from "./fault-progress";
import type { LearningNext } from "./learning-next";
import { feedbackForAttempt } from "./learning-observations";
import {
  isPriorityTeacherProtocol,
  teacherSourceNeedsReview,
} from "./teacher-source-feedback-contract";
import { isTeacherLearningQuestion } from "./teacher-learning-scope";

export type LearningNextEvidence = {
  attemptId: string;
  questionId: string;
  revision: string;
  feedbackId: string;
  resultId: string;
  kind: "independent_original" | "assisted_answer" | "complete_retry";
  sourceText: string;
  conclusion: "supported_this_time" | "needs_work" | "pending";
  focus?: { criterionId: string; label: string; explanation: string };
};
export type LearningNextAlternative = {
  id: string;
  label: string;
  reason: string;
  href: string;
};

// A projection of explicitly adopted teacher paths, not a new progress store,
// automatic schedule, semantic judge, or extension of the provider whitelist.
export function withTeacherLearningEvidence(
  state: FaultProgress,
  recommendation: LearningNext | null,
): LearningNext | null {
  const currentId =
    state.practice?.cursors[state.practice.mode] ?? state.exerciseId;
  const sourceId = recommendation?.feedbackRetrySource?.originalAttemptId;
  const sourceQuestion =
    recommendation && recommendation.basis !== "sequence"
      ? recommendation.questionId
      : currentId;
  if (!isTeacherLearningQuestion(sourceQuestion)) return recommendation;
  const attempt = sourceId
    ? state.attempts.find((a) => a.id === sourceId)
    : [...state.attempts]
        .filter((a) => a.exerciseId === sourceQuestion)
        .sort(
          (a, b) =>
            b.submittedAt.localeCompare(a.submittedAt) ||
            b.id.localeCompare(a.id),
        )[0];
  if (
    !attempt ||
    attempt.choice ||
    attempt.revision !== exerciseRevision(attempt.exerciseId)
  )
    return recommendation;
  const feedback = feedbackForAttempt(state, attempt.id);
  const result = feedback?.unitResult;
  const teacher = result?.sourceTeacher;
  if (
    !feedback ||
    !result ||
    !teacher ||
    !isPriorityTeacherProtocol(teacher.version) ||
    result.source !== "real_provider" ||
    result.purpose !== "practice" ||
    feedback.state !== "reviewed"
  )
    return recommendation;
  const paused = !!state.drafts[attempt.exerciseId]?.feedbackRetryPaused;
  const pending =
    paused ||
    teacherSourceNeedsReview(teacher, result.view) ||
    feedback.points.some((p) => p.status === "needs_review");
  const gap = pending
    ? undefined
    : feedback.points.find((p) => p.nativeStatus !== "covered");
  const success = !pending && !gap && teacher.overall.kind === "correct";
  // An ordinary queue suggestion is not evidence that the previous answer was
  // correct. Only an explicitly supported result can supply this new context.
  if ((!recommendation || recommendation.basis === "sequence") && !success)
    return recommendation;
  const earlierCount = state.attempts.filter(
    (a) =>
      a.exerciseId === attempt.exerciseId &&
      a.revision === attempt.revision &&
      (a.submittedAt < attempt.submittedAt ||
        (a.submittedAt === attempt.submittedAt && a.id <= attempt.id)),
  ).length;
  const kind = attempt.feedbackRetry
    ? "complete_retry"
    : attempt.hintUsed || attempt.referenceSeenBeforeAnswer
      ? "assisted_answer"
      : "independent_original";
  const sourceText =
    kind === "complete_retry"
      ? "按保存反馈完成的完整重答；新答与原答分别保存。"
      : kind === "assisted_answer"
        ? `${earlierCount > 1 ? "提示或参考后补答" : "提示或参考后的作答"}；不能当作无提示的独立表现。`
        : "独立原答；本次提交前没有记录使用提示或查看参考。";
  const topic = practiceTopic(attempt.exerciseId);
  const modelPoint = teacher.points.find((p) => p.id === gap?.id);
  const reason = pending
    ? paused
      ? "这次重答的来源已暂停。先回看原答、反馈与已有草稿，不恢复纠错或认定改正。"
      : "这份反馈仍待核对。先查看原答与依据，不据此认定薄弱点、改正或安排纠错重答。"
    : gap
      ? `这次反馈指出「${gap.requirement}」${gap.nativeStatus === "contradicted" ? "存在明确相反表述" : gap.nativeStatus === "partial" ? "尚未完整表达" : "尚未表达"}：${gap.explanation}${modelPoint?.action ? ` 具体下一步：${modelPoint.action}` : ""}`
      : `这次反馈支持本问已经表达到位。${kind === "independent_original" ? "这只是本次表现" : "这是提示或反馈帮助后的表现"}，不等于永久掌握。${
          recommendation && recommendation.questionId !== attempt.exerciseId
            ? practiceTopic(recommendation.questionId).id === topic.id
              ? "同一知识点还有未答的现题，可以不看提示做另一题检验迁移。"
              : "本知识点暂无另一道未答现题；可自主继续现有下一知识点，或先回看本题知识。"
            : "本知识点暂无另一道未答现题，可先回看知识；不把同题重复记成迁移验证。"
        }`;
  const base: LearningNext = recommendation ?? {
    id: `review-saved:${attempt.id}:${feedback.id}`,
    questionId: attempt.exerciseId,
    title: result.view.title,
    topicTitle: topic.title,
    reason,
    basis: "model_feedback",
    action: "review",
  };
  const id = `${base.id}:evidence:${attempt.id}:${feedback.id}:${kind}`;
  return {
    ...base,
    id,
    reason:
      base.action === "continue" && !pending
        ? `${base.reason} ${reason}`
        : reason,
    ...(pending
      ? ({
          basis: "pending",
          action: "review",
          feedbackRetrySource: undefined,
        } as const)
      : {}),
    evidence: {
      attemptId: attempt.id,
      questionId: attempt.exerciseId,
      revision: attempt.revision,
      feedbackId: feedback.id,
      resultId: feedback.resultId,
      kind,
      sourceText,
      conclusion: pending
        ? "pending"
        : gap
          ? "needs_work"
          : "supported_this_time",
      ...(gap
        ? {
            focus: {
              criterionId: gap.id,
              label: gap.requirement,
              explanation: gap.explanation,
            },
          }
        : {}),
    },
    alternatives: [
      {
        id: `${id}:knowledge:${topic.id}`,
        label: "先回看知识点",
        reason: "也可以先复习相关知识，再决定是否作答；原答和已有草稿保留。",
        href: `/lab/study?subject=${practiceSubject(attempt.exerciseId)}&topic=${encodeURIComponent(topic.id)}`,
      },
    ],
  };
}
