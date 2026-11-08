import { exerciseFor, exerciseRevision } from "../content/fault-catalog";
import {
  chapterQueue,
  isChapterReview,
  isPracticeLocation,
  practiceChapter,
  practiceSubject,
  practiceSubjectInfo,
  practiceTopic,
  type PracticeSubject,
} from "../content/practice-set";
import type { FaultProgress } from "./fault-progress";
import { directLearningAdvice } from "./direct-learning-advice";
import { submittedFeedbackFor } from "./submitted-feedback";

export type PracticeReopening = {
  questionId: string;
  questionTitle: string;
  stage: "viewed" | "draft" | "saved";
  topicTitle: string;
  chapterTitle: string;
  currentHref: string;
  summary: string;
  recommendation: {
    questionId?: string;
    title: string;
    reason: string;
    href: string;
    label: string;
  };
};

/** Read only the requested subject's saved position. Return display metadata,
 * never original text, provider receipts, or a new mastery record. */
export function projectPracticeReopening(
  state: FaultProgress,
  subject: PracticeSubject,
): PracticeReopening | null {
  const practice = state.practice;
  if (!practice) return null;
  const active = practiceSubject(practice.cursors[practice.mode]);
  const position =
    active === subject ? practice : practice.subjectPositions?.[subject];
  if (!position) return null;
  const id = position.cursors[position.mode];
  const q = exerciseFor(id);
  if (
    !q ||
    practiceSubject(id) !== subject ||
    isChapterReview(id) ||
    !isPracticeLocation(id, position.mode)
  )
    return null;
  const draft = state.drafts[id];
  if (!draft && !practice.viewed[id]) return null;
  // Existing dedicated retry and old-version flows keep their own precise
  // continuation and withdrawal controls.
  if (draft?.feedbackRetry) return null;
  const originals = draft?.submittedId
    ? state.attempts.filter(
        (a) =>
          a.id === draft.submittedId &&
          a.exerciseId === id &&
          a.revision === exerciseRevision(id),
      )
    : [];
  if (draft?.submittedId && originals.length !== 1) return null;
  const original = originals[0];
  const info = practiceSubjectInfo(subject);
  const href = `${info.href}&question=${encodeURIComponent(id)}`.replace(
    "/lab/practice&",
    "/lab/practice?",
  );
  const meta = {
    questionId: id,
    questionTitle: q.title,
    stage: original
      ? ("saved" as const)
      : draft?.answer.trim() || draft?.choice
        ? ("draft" as const)
        : ("viewed" as const),
    topicTitle: practiceTopic(id).title,
    chapterTitle: practiceChapter(id).title,
    currentHref: href,
  };
  const current = (summary: string, reason: string, label: string) => ({
    ...meta,
    summary,
    recommendation: {
      questionId: id,
      title: q.title,
      reason,
      href,
      label,
    },
  });
  if (!original) {
    const hasDraft = !!(draft?.answer.trim() || draft?.choice);
    return current(
      hasDraft
        ? "上次的草稿还在，尚未提交。"
        : "上次已打开这题，还没有提交作答。",
      draft?.referenceSeen
        ? "你已看过本题参考，可以接着写出自己的理由；这次按有提示的练习回顾。"
        : hasDraft
          ? "先接着这份草稿写，不会覆盖已有内容。"
          : "从上次停下的这题开始。",
      hasDraft ? "继续作答" : "继续这题",
    );
  }
  const result = submittedFeedbackFor(state, original.id);
  const advice = directLearningAdvice(result, state);
  if (!advice || !result)
    return current(
      "上次的原答已保存。",
      "可以回到这题查看原答和已有反馈。",
      "回看上次这题",
    );
  const uncertain =
    result.view.status !== "assessed" ||
    result.view.points.some((p) => p.status === "uncertain") ||
    result.pointReviews?.some((p) => p.state === "needs_review");
  const correct = result.view.points.every((p) => p.status === "covered");
  const supported = advice.currentWithSupport === true;
  const summary =
    (supported ? "上次作答前看过本题参考、提示或反馈。" : "") +
    (uncertain
      ? "反馈还有待核的地方，暂不判断是否改对。"
      : correct
        ? advice.transfer?.outcome === "supported_this_time"
          ? "这道不同案情答对了；这还不能说明上一题的问题已分清。"
          : "这份答案已答对。"
        : "这份答案还有需要修改的理由。") +
    (correct && advice.currentWithSupport === "unknown"
      ? "作答前是否看过提示，没有留下记录。"
      : "");
  if (advice.nextQuestion) {
    const next = advice.nextQuestion;
    return {
      ...meta,
      summary,
      recommendation: {
        questionId: next.id,
        title: next.title,
        reason: next.reason ?? "换个案情，练习这里的知识点。",
        href: next.href,
        label:
          next.basis === "prior_same_topic"
            ? "回到这处问题"
            : next.basis === "weakness_transfer"
              ? "换个案情练习"
              : "练习下一题",
      },
    };
  }
  const queue = chapterQueue(practiceChapter(id).id, q.kind, "topic");
  if (
    !uncertain &&
    correct &&
    queue.length &&
    queue.every(
      (questionId) =>
        state.attempts.filter(
          (a) =>
            a.id === state.drafts[questionId]?.submittedId &&
            a.exerciseId === questionId &&
            a.revision === exerciseRevision(questionId),
        ).length === 1,
    )
  )
    return {
      ...meta,
      summary,
      recommendation: {
        title: "选择下一组练习",
        reason: "这组的题已作答，可以继续新内容；原答和反馈仍可回看。",
        href: info.libraryHref,
        label: "选择下一组",
      },
    };
  return current(
    summary,
    uncertain
      ? "先回看待核的依据，再决定是否重答。"
      : correct
        ? "可以回看本次原答，也可以从目录另选题目。"
        : "回看具体反馈，再决定重答这一题还是另选题目。",
    "回看上次这题",
  );
}
