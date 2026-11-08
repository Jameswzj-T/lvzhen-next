"use client";
import { useEffect, useRef, useState } from "react";
import {
  SHORT_TABLE_VERSION,
  validateShortReply,
  type ShortReply,
  type ShortResult,
} from "@/evaluation/short-table/contract";
import { TableFeedback } from "../scoring/table/feedback";
import { ScoringWaiting } from "../scoring/scoring-waiting";
import { PracticeShortFeedback } from "./practice-short-feedback";
import type { IndependentPracticeSupplement } from "./practice-feedback-reading";
import s from "./practice.module.css";

// Only an explicit click submits. Mount, refresh and history are read-only.
export function ShortAnswerScoring({
  exerciseId,
  exerciseRevision,
  answer,
  referenceSeen,
  lookupOnly = false,
  documentFlow = false,
  practiceReading = false,
  onReviewed,
}: {
  exerciseId: string;
  exerciseRevision: string;
  answer: string;
  referenceSeen: boolean;
  lookupOnly?: boolean;
  documentFlow?: boolean;
  practiceReading?: boolean;
  onReviewed?: (result: ShortResult) => void;
}) {
  const [reply, setReply] = useState<ShortReply | null>(null),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(false);
  const generation = useRef(0),
    locked = useRef(false);
  const reviewed = useRef(onReviewed);
  reviewed.current = onReviewed;
  const eligible = !!answer.trim() && answer.length <= 5000;
  const readyToSubmit =
    !lookupOnly &&
    reply?.canSubmit === true &&
    reply.availability?.state === "ready";
  async function request(action: "lookup" | "submit", signal?: AbortSignal) {
    const response = await fetch("/api/lab/scoring/short-table", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-lvzhen-scoring": "1" },
      body: JSON.stringify({
        action,
        version: SHORT_TABLE_VERSION,
        exerciseId,
        exerciseRevision,
        answer,
        ...(action === "submit" ? { transmissionConsent: true } : {}),
      }),
      signal,
    });
    if (!response.ok) throw Error("short-unavailable");
    return validateShortReply(await response.json(), {
      exerciseId,
      exerciseRevision,
      answer,
    });
  }
  useEffect(() => {
    setReply(null);
    setError(false);
    locked.current = false;
    setBusy(false);
    if (!eligible) return;
    const controller = new AbortController(),
      current = ++generation.current;
    request("lookup", controller.signal)
      .then((r) => {
        if (!controller.signal.aborted && current === generation.current) {
          setReply(r);
          if (r.result) reviewed.current?.(r.result);
        }
      })
      .catch(() => {
        if (!controller.signal.aborted && current === generation.current)
          setError(true);
      });
    return () => {
      controller.abort();
      generation.current++;
    };
    // Parent binds this component to a saved, immutable answer.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exerciseId, exerciseRevision, answer, eligible]);
  async function run(action: "lookup" | "submit") {
    if (
      locked.current ||
      !eligible ||
      (action === "submit" && (!readyToSubmit || !!reply?.result))
    )
      return;
    locked.current = true;
    setBusy(true);
    setError(false);
    const current = ++generation.current;
    try {
      const next = await request(action);
      if (current === generation.current) {
        setReply(next);
        if (next.result) reviewed.current?.(next.result);
      }
    } catch {
      if (current === generation.current) setError(true);
    } finally {
      if (current === generation.current) {
        setBusy(false);
        locked.current = false;
      }
    }
  }
  if (!eligible)
    return (
      <p className={s.scoringNote}>
        原答已完整保存。本题评阅支持5000字以内的作答，可先对照参考分析。
      </p>
    );
  const result = reply?.result;
  return (
    <section className={s.answerScoring} aria-label="单题训练评阅">
      {referenceSeen && (
        <p className={s.scoringNote}>
          这是看过参考后的练习，评阅只针对这份原答。
        </p>
      )}
      {busy ? (
        <ScoringWaiting />
      ) : !practiceReading ||
        error ||
        !result ||
        result.state !== "complete" ? (
        <p className={s.scoringNote} role="status">
          {error
            ? "暂时无法读取这份答案的已有评阅，原答仍保留。"
            : result?.state === "running"
              ? "本次评阅尚未完成，原答已保存。"
              : reply && !result
                ? reply.message
                : (reply?.message ?? "正在读取已有评阅…")}
        </p>
      ) : null}
      {!practiceReading && result?.source === "offline_test" && (
        <p className={s.scoringNote}>
          隔离测试回放结果，不是本次真实模型评阅。
        </p>
      )}
      {practiceReading && (
        <PracticeShortFeedback
          result={result ?? null}
          supplement={
            (
              reply as
                | (ShortReply & {
                    readingSupplement?: IndependentPracticeSupplement;
                  })
                | null
            )?.readingSupplement
          }
        />
      )}
      {!practiceReading && result?.state === "complete" && (
        <TableFeedback
          assessment={result.assessment}
          documentFlow={documentFlow}
          questions={[
            {
              id: "1",
              prompt: result.card.title,
              answer: result.answer,
              maximum: result.card.maximum,
            },
          ]}
        />
      )}
      {result?.state === "stopped" && (
        <p className={s.scoringNote}>
          本次未能完成可靠评阅，不计作答错误，也不显示零分。
        </p>
      )}
      {error || result?.state === "running" || (!result && !readyToSubmit) ? (
        <button
          className={s.secondary}
          disabled={busy}
          onClick={() => void run("lookup")}
        >
          读取已有结果
        </button>
      ) : !result && readyToSubmit ? (
        <>
          <p className={s.scoringNote} id={`short-submit-${exerciseId}`}>
            点击后会将本题题干和这份原答发送给DeepSeek评阅，不发送参考答案。
            结果用于练习，不代表正式考试得分。
          </p>
          <button
            className={s.secondary}
            disabled={busy}
            aria-describedby={`short-submit-${exerciseId}`}
            onClick={() => void run("submit")}
          >
            评阅这份答案
          </button>
        </>
      ) : null}
    </section>
  );
}
