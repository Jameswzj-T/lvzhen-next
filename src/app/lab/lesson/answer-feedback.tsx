"use client";

import { useEffect, useState } from "react";
import {
  lessonFeedbackQuestion,
  validateLessonFeedback,
  type LessonFeedbackResponse,
} from "@/evaluation/lesson-feedback-contract";
import s from "./lesson.module.css";

const labels = {
  covered: "已说明",
  partial: "可以完善",
  missing: "尚未提到",
  contradicted: "需要调整",
  uncertain: "待确认",
};

export function AnswerFeedback({
  attemptId,
  answer,
  onRevise,
}: {
  attemptId: string;
  answer: string;
  onRevise: () => void;
}) {
  const [response, setResponse] = useState<LessonFeedbackResponse | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  async function load(action: "lookup" | "evaluate", signal?: AbortSignal) {
    const r = await fetch("/api/lab/lesson-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-lvzhen-lesson": "1" },
      body: JSON.stringify({ action, attemptId, answer }),
      signal,
    });
    if (!r.ok) throw new Error("feedback-unavailable");
    return validateLessonFeedback(attemptId, answer, await r.json());
  }
  useEffect(() => {
    const controller = new AbortController();
    load("lookup", controller.signal)
      .then(setResponse)
      .catch(() => {
        if (!controller.signal.aborted) setError(true);
      });
    return () => controller.abort();
    // The component is keyed to the immutable submitted answer by its parent.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attemptId, answer]);
  async function requestFeedback(lookupOnly = false) {
    if (busy) return;
    setBusy(true);
    setError(false);
    try {
      setResponse(
        await load(
          lookupOnly || response?.status === "pending" ? "lookup" : "evaluate",
        ),
      );
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section
      className={s.answerFeedback}
      aria-label="针对原答的反馈"
      aria-busy={busy}
    >
      <div className={s.feedbackTitle}>
        <h2>看看你的分析</h2>
        <span>
          {response?.status === "ready" && response.source === "offline_test"
            ? "离线测试夹具"
            : "AI 反馈试用"}
        </span>
      </div>
      {busy ? (
        <p role="status">
          正在核对你的原话与本题要点。原答已保留，你也可以继续学习。
        </p>
      ) : error ? (
        <p role="status">
          暂时没能取得反馈，原答不受影响。下次进入会先查找已有结果，不会自动重复评阅。
        </p>
      ) : response?.status === "ready" ? (
        <>
          <p className={s.feedbackNotice}>
            以下是针对这份原答的试用意见，仍可能有误，不作为分数或掌握结论。
          </p>
          {response.result.substantiveIssue && (
            <p className={s.feedbackIssue}>
              {response.result.substantiveIssue}
            </p>
          )}
          <div className={s.feedbackItems}>
            {response.result.criteria.map((c) => (
              <div className={s.feedbackItem} key={c.id} data-status={c.status}>
                <div>
                  <h3>
                    {
                      lessonFeedbackQuestion.criteria!.find(
                        (item) => item.id === c.id,
                      )!.label
                    }
                  </h3>
                  <span>{labels[c.status]}</span>
                </div>
                <p>{c.reason}</p>
                {c.evidence.length > 0 && (
                  <details>
                    <summary>对应你的原话</summary>
                    {c.evidence.map((quote, i) => (
                      <blockquote key={i}>{quote}</blockquote>
                    ))}
                  </details>
                )}
              </div>
            ))}
          </div>
          {response.result.clarification && (
            <div className={s.feedbackIssue}>
              <strong>再说明一点</strong>
              <p>{response.result.clarification}</p>
            </div>
          )}
          {response.result.terminologyIssue && (
            <details className={s.disclosure}>
              <summary>表达建议（与实质判断分开）</summary>
              <p>{response.result.terminologyIssue}</p>
            </details>
          )}
          <div className={s.feedbackActions}>
            <button className={s.secondary} onClick={onRevise}>
              补充我的分析
            </button>
            <span>
              原答和这次反馈都会保留 ·{" "}
              {Math.round(response.durationMs / 100) / 10} 秒
            </span>
          </div>
        </>
      ) : response?.status === "unavailable" ? (
        <p>
          {response.reason === "limit"
            ? "本次反馈试用次数已用完，已有反馈仍可查看。"
            : "本次反馈试用暂未开放，已有原答和参考仍可查看。"}
        </p>
      ) : response?.status === "failed" ? (
        <p>
          这次未能形成可靠的反馈，不判断你的对错。原答已保留，可以继续参考自查。
        </p>
      ) : response?.status === "pending" ? (
        <p>这份原答已有评阅请求。可以稍后查看结果，不会重复发出请求。</p>
      ) : (
        <p>
          按你的原话，逐项看看哪些已经说明、哪里还需要补充。参考答案保持不变。
        </p>
      )}
      {!busy && error && (
        <button className={s.secondary} onClick={() => requestFeedback(true)}>
          重新读取已有反馈
        </button>
      )}
      {!busy &&
        !error &&
        (response?.status === "not_requested" ||
          response?.status === "pending") && (
          <button className={s.secondary} onClick={() => requestFeedback()}>
            {response.status === "pending"
              ? "查看已有反馈"
              : "获取这份原答的反馈"}
          </button>
        )}
    </section>
  );
}
