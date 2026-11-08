"use client";
import { useEffect, useRef, useState } from "react";
import {
  TABLE_TRIAL_VERSION,
  type TableAnswers,
  type TableAvailability,
  type TableResult,
} from "@/evaluation/table-trial/contract";
import type {
  ExplanationReviewDelivery,
  ReviewedTableReply,
} from "@/evaluation/table-trial/reviewed-explanation-delivery";
import { TableFeedback } from "../scoring/table/feedback";
import s from "./assessment.module.css";
import d from "../_components/reading-document.module.css";

type Props = {
  caseId: string;
  answers: TableAnswers;
  questionId?: string;
  lookupOnly?: boolean;
  submissionDisabled?: boolean;
  questionTopics?: Record<string, { id: string; title: string }[]>;
  onViewTopic?: (id: string) => void;
  recordBinding?: string;
  onReviewed?: (
    result: TableResult,
    review?: ExplanationReviewDelivery,
  ) => void;
};

// A different answer sheet gets its own state, including pending requests.
export function CaseScoring(props: Props) {
  return (
    <AnswerReview
      key={JSON.stringify([props.caseId, props.answers, props.recordBinding])}
      {...props}
    />
  );
}

function AnswerReview({
  caseId,
  answers,
  questionTopics,
  onViewTopic,
  questionId,
  lookupOnly = false,
  submissionDisabled = false,
  onReviewed,
}: Props) {
  const [result, setResult] = useState<TableResult | null>(null);
  const [explanationReview, setExplanationReview] =
    useState<ExplanationReviewDelivery>();
  const [busy, setBusy] = useState<"lookup" | "submit" | null>("lookup");
  const [availability, setAvailability] = useState<TableAvailability | null>(
    null,
  );
  const canSubmit =
    !result &&
    !lookupOnly &&
    !submissionDisabled &&
    availability?.state === "ready";
  const [message, setMessage] = useState("");
  const guard = useRef(false);
  const mounted = useRef(true);
  const submitAllowed = useRef(canSubmit);
  submitAllowed.current = canSubmit;
  const generation = useRef(0);
  const reviewed = useRef(onReviewed);
  reviewed.current = onReviewed;
  const total = answers.reduce((n, a) => n + a.text.length, 0);
  const overLimit = answers.some((a) => a.text.length > 5000) || total > 12000;
  const any = answers.some((a) => a.text.trim());

  async function act(action: "lookup" | "submit", automatic = false) {
    if (
      !mounted.current ||
      guard.current ||
      !any ||
      overLimit ||
      (action === "submit" && !submitAllowed.current)
    )
      return;
    guard.current = true;
    const token = ++generation.current;
    setBusy(action);
    setMessage("");
    setAvailability(null);
    try {
      const response = await fetch("/api/lab/scoring/table", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Lvzhen-Scoring": "1",
        },
        body: JSON.stringify({
          action,
          version: TABLE_TRIAL_VERSION,
          caseId,
          answers,
        }),
      });
      const reply: ReviewedTableReply & { error?: string } =
        await response.json();
      if (!response.ok) throw Error(reply.error ?? "暂未取得结果。");
      if (generation.current !== token) return;
      if (reply.result) {
        const saved = reply.result;
        if (
          saved.version !== TABLE_TRIAL_VERSION ||
          saved.case.id !== caseId ||
          saved.answers.length !== answers.length ||
          new Set(saved.answers.map((a) => a.id)).size !== answers.length ||
          !answers.every((a) =>
            saved.answers.some((b) => b.id === a.id && b.text === a.text),
          )
        )
          throw Error("saved-answer-binding");
        setResult(saved);
        setExplanationReview(reply.explanationReview);
        reviewed.current?.(saved, reply.explanationReview);
      }
      setAvailability(
        reply.availability ?? {
          state: "unknown",
          reason: "read_error",
          message: "暂未确认评阅状态；原答保留，请先查看保存结果。",
        },
      );
      setMessage(automatic && !reply.result ? "" : (reply.message ?? ""));
    } catch {
      if (generation.current !== token) return;
      setAvailability({
        state: "unknown",
        reason: "read_error",
        message: "暂未确认评阅状态，不会发起新的评阅。",
      });
      setMessage(
        action === "submit"
          ? "暂未收到评阅结果，原答已保留。请先查看保存结果，不会再次发起评阅。"
          : "暂未读到保存结果，原答仍保留。可稍后再查看。",
      );
    } finally {
      if (generation.current === token) {
        guard.current = false;
        setBusy(null);
      }
    }
  }

  useEffect(() => {
    mounted.current = true;
    void act("lookup", true);
    return () => {
      mounted.current = false;
      generation.current++;
      guard.current = false;
    };
    // The wrapper remounts this component whenever the answer sheet changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!any) return questionId ? <p>本问未作答，没有对应评阅。</p> : null;
  if (overLimit)
    return (
      <section className={s.result} aria-label="整案评阅">
        <strong>整案评阅</strong>
        <p className={s.muted}>
          本机评阅单问上限 5000 字、整案 12000
          字。这份原答超出上限，原文已保留。
        </p>
      </section>
    );
  const controls = (
    <div className={s.actions}>
      <div>
        <button disabled={!!busy} onClick={() => void act("lookup")}>
          {busy === "lookup" ? "正在读取…" : "读取已保存的评阅"}
        </button>
        {!result && (canSubmit || busy === "submit") && (
          <button
            className={s.primary}
            disabled={!!busy || submissionDisabled}
            onClick={() => void act("submit")}
          >
            {busy === "submit" ? "正在评阅…" : "评阅整份答卷"}
          </button>
        )}
      </div>
    </div>
  );
  if (questionId) {
    const currentAnswer = answers.find((a) => a.id === questionId)?.text ?? "";
    const empty = !currentAnswer.trim();
    const savedQuestion = result?.case.questions.find(
      (q) => q.id === questionId,
    );
    const complete = result?.state === "complete";
    return (
      <section aria-label="本问已有评阅" className={s.embeddedReview}>
        {empty && <p>本问未作答，不作对错判断。</p>}
        {!empty && !complete && (
          <p role="status">
            {busy && !result
              ? "正在读取这份答案的已有评阅…"
              : result?.state === "running"
                ? "这份答案的评阅尚未完成。"
                : result?.state === "stopped"
                  ? "这份答案的评阅未能完成，不计作答错误。"
                  : availability?.state === "unknown"
                    ? "暂时无法确认这份答案的已有评阅，原答仍保留。"
                    : "这份答案还没有评阅。"}
          </p>
        )}
        {!empty &&
          complete &&
          result &&
          (savedQuestion ? (
            <>
              <p className={d.note}>
                以下是与这份原答绑定的已保存评阅，只展示当前第 {questionId} 问。
                {result.source === "offline_test" &&
                  "隔离测试回放，不是本次真实模型评阅。"}
              </p>
              <TableFeedback
                questions={[{ ...savedQuestion, answer: currentAnswer }]}
                assessment={result.assessment}
                resultId={result.id}
                explanationReview={explanationReview}
                documentFlow
              />
              <details className={s.savedReview}>
                <summary>整案评分记录与其他小问</summary>
                <p>
                  整案已保存评分：
                  {result.total === null
                    ? "部分项目待核对"
                    : `${result.total} / ${result.maximum} 分`}
                  。 已作答部分满分 {result.answeredMaximum} 分。
                </p>
                <TableFeedback
                  questions={result.case.questions.map((q) => ({
                    ...q,
                    answer:
                      result.answers.find((a) => a.id === q.id)?.text ?? "",
                  }))}
                  assessment={result.assessment}
                  resultId={result.id}
                  explanationReview={explanationReview}
                />
              </details>
            </>
          ) : (
            <p>已保存评阅暂不能对应当前小问，原答仍保留。</p>
          ))}
        {availability && <p className={d.note}>{availability.message}</p>}
        {message && (
          <p className={d.note} role="status">
            {message}
          </p>
        )}
        {!result && canSubmit && (
          <p className={d.note}>
            一次评阅这份答卷中所有已答的小问；切换小问、读取旧结果不会重新评阅。
          </p>
        )}
        {submissionDisabled && !result && !lookupOnly && (
          <p role="status">请先保存这份答卷，再发起评阅。</p>
        )}
        {controls}
      </section>
    );
  }
  if (!result && availability?.state === "paused" && !message && !busy)
    return (
      <section className={s.reviewStatus} aria-label="整案评阅">
        <div>
          <strong>自动评阅已暂停</strong>
          <p role="status">{availability.message}</p>
        </div>
        <button onClick={() => void act("lookup")}>查看保存结果</button>
      </section>
    );
  const completed = result?.state === "complete";
  return (
    <section className={s.result} aria-label="整案评阅">
      <strong>
        {result?.state === "running"
          ? "正在评阅"
          : result?.state === "stopped"
            ? "评阅未完成"
            : completed
              ? result.total === null
                ? "部分项目待核对"
                : `${result.total} / ${result.maximum} 分`
              : availability?.state === "paused"
                ? "评阅已暂停"
                : "尚未评阅"}
      </strong>
      {completed ? (
        <p className={s.muted}>
          本次 {(result.durationMs / 1000).toFixed(2)} 秒
          {result.costCny !== null
            ? ` · 费用估算 ¥${result.costCny.toFixed(5)}`
            : ""}
          {" · "}已作答部分满分 {result.answeredMaximum} 分，逐项反馈见下。
        </p>
      ) : (
        <p className={s.muted}>
          {result?.state === "running"
            ? "这份原答正在评阅。稍后查看保存结果即可，无需再次提交。"
            : result?.state === "stopped"
              ? "本次评阅未完成，原答已保存。已有结果仍可查看。"
              : availability?.state === "paused"
                ? "原答已保存，可对照参考自检。"
                : "只评已作答的小问，未作答部分不作对错判断。"}
        </p>
      )}
      {availability && (
        <p className={s.notice} role="status">
          {availability.message}
        </p>
      )}
      {!completed && availability?.state !== "paused" && (
        <p className={s.muted}>
          可先对照下方参考自检；参考要点不表示你的答案已被判定对错。
        </p>
      )}
      {message && (
        <p className={s.notice} role="status">
          {message}
        </p>
      )}
      {controls}
      {completed && (
        <details className={s.savedReview}>
          <summary>查看已保存的逐问评阅</summary>
          <TableFeedback
            questions={result.case.questions.map((q) => ({
              ...q,
              answer: result.answers.find((a) => a.id === q.id)?.text ?? "",
              maximum: q.maximum,
            }))}
            assessment={result.assessment}
            resultId={result.id}
            explanationReview={explanationReview}
            questionTools={(id) =>
              onViewTopic &&
              !!questionTopics?.[id]?.length && (
                <div
                  className={s.topicLinks}
                  aria-label={`第 ${id} 问相关知识`}
                >
                  <span>回看知识</span>
                  {questionTopics[id].map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => onViewTopic(topic.id)}
                    >
                      {topic.title}
                    </button>
                  ))}
                </div>
              )
            }
          />
        </details>
      )}
    </section>
  );
}
