"use client";
import { directLearningAdvice } from "../../../domain/direct-learning-advice";
import { useEffect, useRef, useState } from "react";
import { unitFeedbackBinding } from "@/evaluation/unit-feedback-catalog";
import { isTeacherLearningQuestion } from "@/domain/teacher-learning-scope";
import {
  validateUnitFeedbackResult,
  type UnitFeedbackResult,
  type UnitFeedbackReply,
} from "@/evaluation/unit-feedback-contract";
import {
  teacherLearningAdvice,
  type TeacherLearningRecords,
} from "@/domain/teacher-learning-advice";
import { currentQuestionTeacher } from "@/domain/current-question-teacher";
import { TeacherAnswerFeedback } from "../_components/teacher-answer-feedback";
import { DirectAnswerFeedback } from "../_components/direct-answer-feedback";
import {
  prepareUnitFeedbackLearningSummary,
  type UnitFeedbackLearningSummary,
} from "@/evaluation/unit-feedback-reading";
import { readCurrentAnswerFeedback } from "./submitted-answer-review-client";
import type { SubmittedAnswerReviewState } from "./submitted-answer-review";
import s from "./practice.module.css";
import d from "../_components/reading-document.module.css";

export type UnitFeedbackSourceChange = {
  questionId: string;
  questionRevision: string;
  attemptId: string;
  feedbackResultId: string;
  reason: "source_changed" | "source_withdrawn";
};

/** Submit lives in the saved-original controller. This component only reads on mount/refresh. */
export function UnitAnswerFeedback({
  exerciseId,
  exerciseRevision,
  attemptId,
  answer,
  choice = "",
  reference,
  savedResult,
  feedbackSaved = !!savedResult,
  storageIssue = false,
  activeReview,
  onRetry,
  onSaveReceived,
  onReviewed,
  onSourceChange,
  onFullRetry,
  onContinue,
  nextQuestionTitle,
  onTeacherNavigationChange,
  learningRecords,
}: {
  exerciseId: string;
  exerciseRevision: string;
  attemptId: string;
  answer: string;
  choice?: string;
  reference?: string;
  savedResult?: UnitFeedbackResult | null;
  feedbackSaved?: boolean;
  storageIssue?: boolean;
  activeReview?: SubmittedAnswerReviewState<UnitFeedbackResult> | null;
  onRetry?: () => void;
  onSaveReceived?: (result: UnitFeedbackResult) => void;
  onReviewed?: (result: UnitFeedbackResult) => void;
  onSourceChange?: (notice: UnitFeedbackSourceChange) => void;
  onFullRetry?: () => void;
  onContinue?: () => void;
  nextQuestionTitle?: string;
  onTeacherNavigationChange?: (
    binding: { answerId: string; resultId: string } | null,
  ) => void;
  learningRecords?: TeacherLearningRecords;
}) {
  const [reply, setReply] = useState<UnitFeedbackReply | null>(null);
  const [error, setError] = useState(false),
    [reading, setReading] = useState(true);
  const generation = useRef(0),
    callbacks = useRef({
      onReviewed,
      onSourceChange,
      onTeacherNavigationChange,
    });
  callbacks.current = { onReviewed, onSourceChange, onTeacherNavigationChange };
  const binding = unitFeedbackBinding(exerciseId);
  const expected = {
    questionId: exerciseId,
    questionRevision: exerciseRevision,
    originalText: choice || answer,
    ...(binding ? { contentId: binding.contentId } : {}),
  };
  const verified = (raw: UnitFeedbackResult | null | undefined) => {
    try {
      return raw
        ? validateUnitFeedbackResult(raw, { ...expected, answerId: attemptId })
        : null;
    } catch {
      return null;
    }
  };
  const local = verified(savedResult);
  const currentReview =
    activeReview &&
    activeReview.original.id === attemptId &&
    activeReview.original.exerciseId === exerciseId &&
    activeReview.original.revision === exerciseRevision &&
    activeReview.original.answer === answer &&
    activeReview.original.choice === choice
      ? activeReview
      : null;
  const activeResult =
    currentReview && "feedback" in currentReview
      ? verified(currentReview.feedback?.value)
      : null;
  // Explicit source withdrawal wins; temporary service failure never erases a saved result.
  const withdrawn =
    reply?.availability === "changed" || reply?.availability === "unsupported";
  const result =
    activeResult ?? (withdrawn ? null : (verified(reply?.result) ?? local));
  const reviewPending =
    !!currentReview &&
    ["saving_original", "reviewing", "saving_feedback"].includes(
      currentReview.status,
    );
  const reviewFailed = currentReview?.status === "failed";
  const savingText =
    currentReview?.status === "saving_original"
      ? "正在保存原答，保存成功后才会发送评阅。"
      : currentReview?.status === "saving_feedback"
        ? "评判已取得，正在保存学习记录。"
        : undefined;
  const status = reviewPending
    ? "assessing"
    : reviewFailed || error || reply?.availability === "failed"
      ? "failed"
      : reading
        ? "reading"
        : result
          ? "ready"
          : "idle";
  const [summaryState, setSummaryState] = useState<{
    key: string;
    summary: UnitFeedbackLearningSummary | null;
  } | null>(null);
  const summaryKey = result
    ? JSON.stringify([result, reference, attemptId])
    : null;

  async function lookup(signal?: AbortSignal) {
    const response = await readCurrentAnswerFeedback(
      {
        id: attemptId,
        exerciseId,
        revision: exerciseRevision,
        answer,
        choice,
      },
      "lookup",
      fetch,
      signal,
    );
    return local && local.view.contentId !== response.contentId
      ? {
          result: null,
          canSubmit: false,
          availability: "changed" as const,
          submissionMode: "closed" as const,
          message: "本题依据已变更，旧反馈保留但不套用。",
        }
      : response.reply;
  }
  const receive = (next: UnitFeedbackReply) => {
    setReply(next);
    if (
      local &&
      !next.result &&
      (next.availability === "changed" || next.availability === "unsupported")
    )
      callbacks.current.onSourceChange?.({
        questionId: exerciseId,
        questionRevision: exerciseRevision,
        attemptId,
        feedbackResultId: local.id,
        reason:
          next.availability === "changed"
            ? "source_changed"
            : "source_withdrawn",
      });
    // Current new receipts are persisted by the captured-owner controller. Historical reads do not dispatch.
    if (next.result) callbacks.current.onReviewed?.(next.result);
  };
  useEffect(() => {
    const controller = new AbortController(),
      current = ++generation.current;
    setReply(null);
    setError(false);
    setReading(true);
    lookup(controller.signal)
      .then((next) => {
        if (!controller.signal.aborted && generation.current === current)
          receive(next);
      })
      .catch(() => {
        if (!controller.signal.aborted && generation.current === current)
          setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted && generation.current === current)
          setReading(false);
      });
    return () => {
      controller.abort();
      generation.current++;
    };
    // Immutable answer props bind this read. Updating a saved receipt does not re-fetch or submit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exerciseId, exerciseRevision, attemptId, answer, choice]);
  async function reload() {
    if (reading) return;
    const current = ++generation.current;
    setReading(true);
    setError(false);
    try {
      const next = await lookup();
      if (generation.current === current) receive(next);
    } catch {
      if (generation.current === current) setError(true);
    } finally {
      if (generation.current === current) setReading(false);
    }
  }
  useEffect(() => {
    let cancelled = false;
    setSummaryState(null);
    if (result && summaryKey && !choice)
      prepareUnitFeedbackLearningSummary(result.view, {
        reference,
        expectedReferenceFingerprint: binding?.referenceFingerprint,
        pointReviews: result.pointReviews,
        source: result.source,
        purpose: result.purpose,
      })
        .then((summary) => {
          if (!cancelled) setSummaryState({ key: summaryKey, summary });
        })
        .catch(() => {
          if (!cancelled) setSummaryState({ key: summaryKey, summary: null });
        });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summaryKey, choice]);
  const saveFailure =
    reviewFailed &&
    (currentReview.reason === "feedback_not_saved" ||
      (currentReview.reason === "original_not_saved" &&
        !!currentReview.feedback));
  const readReceiptNotSaved =
    !!result &&
    !feedbackSaved &&
    !withdrawn &&
    !reading &&
    !reviewPending &&
    !reviewFailed &&
    !!onSaveReceived;
  const reviewReady =
    !result && reply?.canSubmit === true && reply.submissionMode === "direct";
  let teacher = null;
  if (result?.sourceTeacher && isTeacherLearningQuestion(exerciseId)) {
    try {
      teacher = currentQuestionTeacher(result, {
        id: attemptId,
        exerciseId,
        revision: exerciseRevision,
        answer,
        choice,
      });
      teacher.learningAdvice = teacherLearningAdvice(teacher, learningRecords);
    } catch {
      /* Existing pending/error reader remains available. */
    }
  }
  const teacherResultId =
    teacher && !choice && !reviewPending && !reviewFailed && !reading
      ? teacher.binding.resultId
      : null;
  useEffect(() => {
    callbacks.current.onTeacherNavigationChange?.(
      teacherResultId
        ? { answerId: attemptId, resultId: teacherResultId }
        : null,
    );
    return () => callbacks.current.onTeacherNavigationChange?.(null);
  }, [attemptId, teacherResultId]);
  function reviewEvidence() {
    const details = document.querySelector<HTMLDetailsElement>(
      "[data-teacher-reference]",
    );
    if (details) {
      details.open = true;
      details.querySelector<HTMLElement>("summary")?.focus();
    }
  }
  return (
    <section
      className={s.answerScoring}
      aria-label={choice ? "本题选择解析" : "本题AI评判"}
    >
      {reviewFailed &&
        currentReview.reason === "original_not_saved" &&
        !currentReview.feedback && (
          <p className={d.paragraph} role="status">
            原答尚未完成保存，这次没有发送评阅。
          </p>
        )}
      {(saveFailure || readReceiptNotSaved) && (
        <>
          <p className={d.paragraph} role="status" data-feedback-save-notice>
            {saveFailure
              ? currentReview.reason === "original_not_saved"
                ? "原答的保存状态尚未确认，已取得的评判仍保留在本页。"
                : "原答已保存，已取得的评判仍保留在本页。"
              : "原答仍保留，本页已读取评判。"}
            这份反馈尚未确认保存到学习记录。
            {storageIssue
              ? "浏览器记录暂时无法继续保存；先导出本页记录，再刷新并读取已有反馈。"
              : "补存只保存现有评判，不重新调用模型。"}
          </p>
          {storageIssue && (
            <p className={d.paragraph}>
              <a href="#practice-records-warning">查看导出与恢复</a>
            </p>
          )}
          {readReceiptNotSaved && (
            <div className={s.endActions}>
              <button
                type="button"
                className={s.secondary}
                disabled={storageIssue}
                onClick={() => onSaveReceived?.(result!)}
              >
                补存评判
              </button>
            </div>
          )}
        </>
      )}
      {(reviewReady ||
        error ||
        reviewFailed ||
        reply?.availability === "failed") && (
        <div className={s.endActions}>
          {onRetry && (saveFailure || reply?.submissionMode !== "closed") && (
            <button
              type="button"
              className={s.secondary}
              disabled={reading || reviewPending || storageIssue}
              onClick={onRetry}
            >
              {saveFailure
                ? "补存评判"
                : reviewReady
                  ? "评阅这份答案"
                  : "重试评阅"}
            </button>
          )}
          <button
            type="button"
            className={s.textButton}
            disabled={reading || reviewPending}
            onClick={() => void reload()}
          >
            重新读取反馈
          </button>
        </div>
      )}
      {choice ? (
        <section className={d.document} aria-label="AI解析">
          <h2 className={d.heading}>AI解析</h2>
          <p className={d.paragraph} role="status">
            {reviewPending
              ? (savingText ?? "正在分析这份选择…")
              : (result?.view.substantiveIssue ??
                (error || reviewFailed
                  ? reviewFailed
                    ? (currentReview.message ??
                      "暂时无法取得解析，原选择和本地对错结果保留。")
                    : "暂时无法取得解析，原选择和本地对错结果保留。"
                  : reading
                    ? "正在读取已保存的解析…"
                    : (reply?.message ?? "尚未取得AI解析。")))}
          </p>
          {result?.source === "offline_test" && (
            <p className={d.note}>离线合成示例，不是真实AI解析。</p>
          )}
          {result?.view.clarification && (
            <p className={d.paragraph}>{result.view.clarification}</p>
          )}
        </section>
      ) : teacher && !reviewPending && !reviewFailed && !reading ? (
        <TeacherAnswerFeedback
          view={teacher}
          onFullRetry={onFullRetry}
          onContinue={onContinue}
          onDefer={onContinue}
          nextQuestionTitle={nextQuestionTitle}
          onReviewEvidence={reviewEvidence}
        />
      ) : (
        <DirectAnswerFeedback
          studentReading
          result={result}
          answer={answer}
          reference={reference}
          questionId={exerciseId}
          questionRevision={exerciseRevision}
          status={status}
          progressLabel={
            savingText ??
            (!result && !reading && !reviewPending
              ? reviewReady
                ? (reply?.message ??
                  "原答已保存，点击“评阅这份答案”发起 AI 请求。")
                : reviewFailed
                  ? currentReview.message
                  : error
                    ? undefined
                    : reply?.message
              : undefined)
          }
          savedNewAnswer={result?.view.answerId === attemptId}
          learningAdvice={directLearningAdvice(result, learningRecords)}
          learningSummary={
            summaryState?.key === summaryKey ? summaryState.summary : null
          }
        />
      )}
      {choice &&
        !result &&
        !reading &&
        !reviewPending &&
        !error &&
        reply?.availability === "paused" &&
        !reply.message && (
          <p className={d.paragraph} role="status">
            评阅服务暂不可用；原答已保存，可先对照参考。
          </p>
        )}
    </section>
  );
}
