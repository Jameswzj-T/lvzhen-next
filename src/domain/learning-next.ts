import { assessmentRunHref } from "../content/civil-integrated-practice";
import { exerciseFor, exerciseRevision } from "../content/fault-catalog";
import { teacherSourceNeedsReview } from "./teacher-source-feedback-contract";
import {
  practiceGroups,
  practiceTopic,
  isChapterReview,
  isPracticeLocation,
  practiceSubject,
  practiceSubjectInfo,
  subjectPracticeQueues,
} from "../content/practice-set";
import { isCorrectChoice } from "./objective-answer";
import { hasSeenPracticeReference } from "./reference-exposure";
import {
  feedbackForAttempt,
  feedbackObservation,
} from "./learning-observations";
import { beginFeedbackRetry, feedbackRetryTask } from "./feedback-retry";
import {
  learningObservationSchema,
  type LearningObservation,
} from "./learning-observation-schema";
import { initializePractice, visitPractice } from "./practice";
import {
  retryExercise,
  progressSchema,
  type FaultProgress,
} from "./fault-progress";
import { selectAssessment, navigateAssessment } from "./assessment";
import { assessmentPaper } from "../content/assessment-papers";
import { isRegisteredCivilUnitFeedbackQuestion } from "../evaluation/unit-feedback-catalog";
import {
  hasSavedSubmittedLearningFeedback,
  isCurrentSubmittedFeedbackRetrySource,
} from "./submitted-feedback-learning";
import {
  withTeacherLearningEvidence,
  type LearningNextEvidence,
  type LearningNextAlternative,
} from "./learning-next-evidence";

export type FeedbackRetrySource = {
  originalAttemptId: string;
  feedbackId: string;
  feedbackResultId: string;
  questionId: string;
  revision: string;
  identity: string;
};

function retrySourceFor(
  state: FaultProgress,
  original: FaultProgress["attempts"][number],
  feedback: LearningObservation,
): FeedbackRetrySource | undefined {
  if (
    (practiceSubject(original.exerciseId) !== "criminal-law" &&
      !isRegisteredCivilUnitFeedbackQuestion(original.exerciseId) &&
      !isCurrentSubmittedFeedbackRetrySource(state, feedback)) ||
    !isPracticeLocation(original.exerciseId, "subjective") ||
    original.choice ||
    feedback.originRunId ||
    feedback.attemptId !== original.id ||
    feedback.questionId !== original.exerciseId ||
    feedback.revision !== original.revision ||
    feedback.answer !== original.answer ||
    !learningObservationSchema.safeParse(feedback).success
  )
    return undefined;
  return {
    originalAttemptId: original.id,
    feedbackId: feedback.id,
    feedbackResultId: feedback.resultId,
    questionId: original.exerciseId,
    revision: original.revision,
    identity: feedback.identity,
  };
}

export type LearningNext = {
  id: string;
  questionId: string;
  title: string;
  topicTitle: string;
  reason: string;
  basis: "model_feedback" | "reference_choice" | "sequence" | "pending";
  action: "feedback_retry" | "retry" | "practice" | "review" | "continue";
  originRunId?: string;
  feedbackRetrySource?: FeedbackRetrySource;
  evidence?: LearningNextEvidence;
  alternatives?: LearningNextAlternative[];
};

/** Models supply bounded judgments. The system retrieves existing topics/queues. */
function nextFromSavedRecords(state: FaultProgress): LearningNext | null {
  const subject =
    practiceSubject(
      state.practice?.cursors[state.practice.mode] ?? state.exerciseId,
    ) ?? "criminal-law";
  const queues = subjectPracticeQueues(subject);
  const questionIds = [...queues.objective, ...queues.subjective].filter(
    (id) => !isChapterReview(id),
  );
  // Saved chapter-review reference/feedback still permits its existing retry.
  // Only the unattempted default sequence excludes chapter-review forms.
  const eligible = new Set([...queues.objective, ...queues.subjective]);
  const latest = new Map<string, FaultProgress["attempts"][number]>();
  for (const a of [...state.attempts].sort(
    (a, b) =>
      a.submittedAt.localeCompare(b.submittedAt) || a.id.localeCompare(b.id),
  ))
    latest.set(a.exerciseId, a);
  const recent = [...latest.values()].sort(
    (a, b) =>
      b.submittedAt.localeCompare(a.submittedAt) || b.id.localeCompare(a.id),
  );
  // Civil collection originals have an exact run/question record on the study
  // home. A generic review action must not substitute an ordinary draft.
  const collectionAttempts = new Set(
    (state.assessments?.runs ?? [])
      .filter((run) => assessmentPaper(run.paperId)?.kind === "practice")
      .flatMap((run) => Object.values(run.attemptIds)),
  );
  const relevant = recent.filter(
    (a) =>
      practiceSubject(a.exerciseId) === subject &&
      !collectionAttempts.has(a.id),
  );
  const make = (
    qid: string,
    sourceKey: string,
    reason: string,
    basis: LearningNext["basis"],
    action: LearningNext["action"],
    originRunId?: string,
    feedbackRetrySource?: FeedbackRetrySource,
  ): LearningNext | null => {
    const q = exerciseFor(qid);
    // Ordinary recommendations stay in the active subject's training whitelist.
    // Existing assessment feedback may still return to its bound original run.
    if (
      !q ||
      practiceSubject(qid) !== subject ||
      (!eligible.has(qid) && !originRunId)
    )
      return null;
    const draft = state.drafts[qid];
    const retry =
      draft && !draft.submittedId ? feedbackRetryTask(state, qid) : null;
    const openDraft =
      draft &&
      !draft.submittedId &&
      (retry || draft.answer.length || draft.choice);
    const source = retry ? undefined : feedbackRetrySource;
    const selectedFeedback = source
      ? feedbackObservation(state, source.feedbackId)
      : null;
    const reused =
      selectedFeedback?.unitResult &&
      selectedFeedback.unitResult.view.answerId !== source?.originalAttemptId;
    const shownReason = retry?.blockedReason
      ? "这次完整重答的来源已暂停，草稿和原绑定仍保留，可回看原稿。"
      : retry
        ? "这道题有未完的完整重答，沿原先绑定的反馈继续；原答与草稿保留。"
        : source
          ? `${reused ? "本问同文复用已有保存反馈" : "本问已有保存反馈"}，可按这次反馈重答完整小问；原答与反馈保留。`
          : reason;
    const recommendationId = source
      ? `feedback:${source.originalAttemptId}:${source.feedbackId}:${source.feedbackResultId}:${qid}:${source.revision}:${source.identity}`
      : `${sourceKey}:${qid}`;
    return {
      id: retry
        ? `${recommendationId}:task:${retry.task.taskId}:${retry.blockedReason ?? "continue"}`
        : recommendationId,
      questionId: qid,
      title: q.title,
      topicTitle: eligible.has(qid) ? practiceTopic(qid).title : "综合案例原问",
      reason: retry
        ? shownReason
        : openDraft
          ? `${shownReason} 此题另有未提交草稿，进入后接着写，不清空草稿。`
          : shownReason,
      basis,
      action: retry?.blockedReason ? "review" : openDraft ? "continue" : action,
      ...(originRunId ? { originRunId } : {}),
      ...(source ? { feedbackRetrySource: source } : {}),
    };
  };
  for (const a of relevant) {
    const q = exerciseFor(a.exerciseId);
    if (!q || a.revision !== exerciseRevision(a.exerciseId)) continue;
    if (q.kind === "objective") {
      if (!isCorrectChoice(q, a.choice)) {
        const next = make(
          q.id,
          a.id,
          "最近一次选择与本题参考答案不一致。先在同一知识点重练，旧选择仍保留。",
          "reference_choice",
          "retry",
        );
        if (next) return next;
      }
      continue;
    }
    const feedback = feedbackForAttempt(state, a.id);
    const older = state.attempts.some(
      (old) =>
        old.id !== a.id &&
        old.exerciseId === a.exerciseId &&
        old.revision === a.revision &&
        feedbackForAttempt(state, old.id),
    );
    if (!feedback && older) {
      const next = make(
        q.id,
        a.id,
        "这道题已有新的重答，但尚无对应评阅。先回看原答与新答，不能判断是否改正。",
        "pending",
        "review",
      );
      if (next) return next;
    }
    if (!feedback && hasSavedSubmittedLearningFeedback(state, a.id)) {
      const next = make(
        q.id,
        a.id,
        "本问已有保存反馈，但当前无法核验其完整来源或逐项内容。先回看原答和反馈，保留原记录，不据此判错、改正或掌握。",
        "pending",
        "review",
      );
      if (next) return next;
      continue;
    }
    if (feedback?.protocol === "unit-feedback-v1") {
      if (feedback.unitResult?.purpose === "synthetic_validation") {
        const held = feedback.points.find((p) => p.status === "needs_review");
        const detail = held
          ? ` 样例中「${held.requirement}」仍待核对：${held.explanation} ${held.reviewNote ?? ""}`
          : " 这份样例的逐项反馈已保留，只用于回看样例与选择练习。";
        const next = make(
          q.id,
          feedback.id,
          `虚构样例同文回读，保留原任务与原作答事件，不是当前作答的新模型评阅；不据此判断真实用户弱项、改正或掌握。${detail}`,
          "pending",
          "review",
        );
        if (next) return next;
        continue;
      }
      const origin =
        feedback.unitResult?.view.answerId !== a.id
          ? "同文复用的既有反馈"
          : "本问保存的模型反馈";
      const pending =
        (feedback.unitResult?.sourceTeacher &&
          teacherSourceNeedsReview(
            feedback.unitResult.sourceTeacher,
            feedback.unitResult.view,
          )) ||
        feedback.source !== "real_provider" ||
        feedback.state !== "reviewed" ||
        feedback.points.some((point) => point.status === "needs_review");
      if (pending) {
        const point = feedback.points.find((p) => p.status === "needs_review");
        const offlineFocus = feedback.points.find(
          (p) => p.nativeStatus && p.nativeStatus !== "covered",
        );
        const reason =
          feedback.source === "offline_test"
            ? `本问保存的是离线合成回放反馈，仍待核对，不能判断真实作答是否改正。${
                offlineFocus
                  ? ` 回放中「${offlineFocus.requirement}」的说明（待核）：${offlineFocus.explanation} 本项边界：${offlineFocus.boundary}`
                  : ""
              }`
            : point
              ? `${origin}中「${point.requirement}」待核对：${point.explanation} ${point.reviewNote ?? ""} 请对照原答与依据，不将未知记成答错或已掌握。`
              : `${origin}尚未完成，原答已保留，反馈仍待核对，不能判断是否改正。`;
        const next = make(q.id, feedback.id, reason, "pending", "review");
        if (next) return next;
        continue;
      }
      const gap = feedback.points.find((point) =>
        ["partial", "missing", "contradicted"].includes(
          point.nativeStatus ?? "",
        ),
      );
      if (gap) {
        const source = retrySourceFor(state, a, feedback);
        const teacherPoint = feedback.unitResult?.sourceTeacher?.points.find(
          (point) => point.id === gap.id,
        );
        const description =
          gap.nativeStatus === "partial"
            ? "只表达了部分要求"
            : gap.nativeStatus === "contradicted"
              ? "出现明确相反结论"
              : "尚未表达";
        const next = make(
          q.id,
          feedback.id,
          teacherPoint
            ? `${origin}中「${gap.requirement}」的说明：${teacherPoint.explanation} 具体改法：${teacherPoint.action} 可按解释另存完整重答；原标签保留，不据部分或相反标记自动认定学习状态。`
            : `${origin}显示「${gap.requirement}」${description}：${gap.explanation} 本项边界：${gap.boundary}`,
          "model_feedback",
          source ? "feedback_retry" : "retry",
          undefined,
          source,
        );
        if (next) return next;
      }
      continue;
    }
    if (!feedback || feedback.source !== "real_provider") continue;
    const uncertain =
      feedback.state !== "reviewed" ||
      feedback.points.some((p) => p.status === "needs_review");
    if (uncertain) {
      const next = make(
        q.id,
        feedback.id,
        "本问反馈含待核或未完成项目。先核对原文与依据，不将它记成答错或已掌握。",
        "pending",
        "review",
        feedback.originRunId,
      );
      if (next) return next;
    }
    const missing = feedback.points.find((p) => p.status === "model_no");
    if (missing) {
      const source = retrySourceFor(state, a, feedback);
      const explanation = missing.reviewNote ?? missing.explanation;
      const next = make(
        q.id,
        feedback.id,
        `本问第${missing.id}项模型未认可：${missing.requirement}。保存的依据：${explanation}`,
        "model_feedback",
        feedback.originRunId ? "review" : source ? "feedback_retry" : "retry",
        feedback.originRunId,
        source,
      );
      if (next) return next;
    }
  }
  // After a supported success, check transfer using an unattempted existing case.
  // Group the fallback queue once per recommendation, preserving queue order.
  // This index is local to the call; neither learner state nor feedback is cached.
  let topicCandidates: Map<string, string[]> | undefined;
  const candidatesForTopic = (topicId: string) => {
    if (!topicCandidates) {
      topicCandidates = new Map();
      for (const id of questionIds) {
        const key = practiceTopic(id).id;
        const candidates = topicCandidates.get(key);
        if (candidates) candidates.push(id);
        else topicCandidates.set(key, [id]);
      }
    }
    return topicCandidates.get(topicId) ?? [];
  };
  for (const a of relevant) {
    if (!eligible.has(a.exerciseId)) continue;
    const group = practiceGroups.find((g) => g.ids.includes(a.exerciseId));
    const topicId = practiceTopic(a.exerciseId).id;
    const candidates = group?.ids ?? candidatesForTopic(topicId);
    const target = candidates.find(
      (id) =>
        eligible.has(id) &&
        !latest.has(id) &&
        !hasSeenPracticeReference(state, id),
    );
    if (target)
      return make(
        target,
        a.id,
        "这一知识点还有没做过的案例，可以接着练一道。",
        "sequence",
        "practice",
      );
  }
  const target = questionIds.find((id) => !latest.has(id));
  return target
    ? make(
        target,
        "start",
        subject === "civil-procedure"
          ? "这道民诉题还没有保存作答，按现有顺序继续。原答先保存，评阅结果另行显示。"
          : "这道题还没有保存作答，按现有章节顺序开始；不推测你的薄弱点。",
        "sequence",
        "practice",
      )
    : null;
}

export function nextLearningPractice(
  state: FaultProgress,
): LearningNext | null {
  return withTeacherLearningEvidence(state, nextFromSavedRecords(state));
}

export function prepareLearningNext(
  state: FaultProgress,
  recommendationId: string,
  at: string,
) {
  const next = nextLearningPractice(state);
  if (!next || !Number.isFinite(Date.parse(at))) return null;
  if (!progressSchema.safeParse(state).success) return null;
  if (next.id !== recommendationId) {
    const alternative = next.alternatives?.find(
      (a) => a.id === recommendationId,
    );
    return alternative ? { state, href: alternative.href } : null;
  }
  if (next.originRunId) {
    const run = state.assessments?.runs.find((r) => r.id === next.originRunId);
    const index = run
      ? assessmentPaper(run.paperId)?.questionIds.indexOf(next.questionId)
      : undefined;
    if (index === undefined || index < 0) return null;
    const moved = navigateAssessment(
      selectAssessment(state, next.originRunId),
      index,
      at,
    );
    return progressSchema.safeParse(moved).success
      ? {
          state: moved,
          href: assessmentRunHref(
            next.originRunId,
            assessmentPaper(run!.paperId),
          ),
        }
      : null;
  }
  const q = exerciseFor(next.questionId)!;
  const initialized = initializePractice(state);
  let moved = visitPractice(
    {
      ...initialized,
      practice: {
        ...initialized.practice!,
        mode: q.kind,
        ended: { ...initialized.practice!.ended, [q.kind]: false },
      },
    },
    q.id,
    at,
  );
  if (next.feedbackRetrySource) {
    const source = next.feedbackRetrySource;
    const feedback = feedbackObservation(state, source.feedbackId);
    const original = state.attempts.find(
      (a) => a.id === source.originalAttemptId,
    );
    if (
      !original ||
      !feedback ||
      feedback.resultId !== source.feedbackResultId ||
      feedback.identity !== source.identity ||
      JSON.stringify(retrySourceFor(state, original, feedback)) !==
        JSON.stringify(source)
    )
      return null;
    const taskId = globalThis.crypto?.randomUUID?.();
    if (!taskId) return null;
    moved = beginFeedbackRetry(
      moved,
      {
        taskId,
        originalAttemptId: source.originalAttemptId,
        feedbackId: source.feedbackId,
      },
      at,
    );
    const task = feedbackRetryTask(moved, q.id);
    if (
      !task ||
      task.task.originalAttemptId !== source.originalAttemptId ||
      task.task.feedbackId !== source.feedbackId ||
      task.task.feedbackResultId !== source.feedbackResultId ||
      task.blockedReason
    )
      return null;
  } else if (next.action === "feedback_retry") return null;
  else if (next.action === "retry" && moved.drafts[q.id]?.submittedId)
    moved = retryExercise(moved);
  return progressSchema.safeParse(moved).success
    ? {
        state: moved,
        href: practiceSubjectInfo(practiceSubject(q.id)).href,
      }
    : null;
}
