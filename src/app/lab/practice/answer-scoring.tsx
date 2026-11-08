"use client";
import { useEffect, useRef, useState } from "react";
import {
  validateScoringTrialResponse,
  type ScoringTrialResponse,
} from "@/evaluation/scoring-trial-contract";
import { ScoringFeedback } from "../scoring/scoring-feedback";
import { ScoringWaiting } from "../scoring/scoring-waiting";
import s from "./practice.module.css";

// Receives the immutable submitted original, never an unsaved draft. Mounts
// only read existing results; a new paid evaluation requires the button click.
export function AnswerScoring({
  caseId,
  exerciseRevision,
  answer,
  referenceSeen,
  lookupOnly = false,
}: {
  caseId: string;
  exerciseRevision: string;
  answer: string;
  referenceSeen: boolean;
  lookupOnly?: boolean;
}) {
  const [response, setResponse] = useState<ScoringTrialResponse | null>(null);
  const [busy, setBusy] = useState(false),
    [error, setError] = useState(false);
  const generation = useRef(0),
    lock = useRef(false);
  const eligible = answer.length <= 4000 && !!answer.trim();
  async function request(action: "lookup" | "evaluate", signal?: AbortSignal) {
    const r = await fetch("/api/lab/scoring", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-lvzhen-scoring": "1" },
      body: JSON.stringify({ action, caseId, exerciseRevision, answer }),
      signal,
    });
    if (!r.ok) throw new Error("unavailable");
    return validateScoringTrialResponse(caseId, answer, await r.json());
  }
  useEffect(() => {
    if (!eligible) return;
    const controller = new AbortController(),
      current = ++generation.current;
    request("lookup", controller.signal)
      .then((r) => {
        if (!controller.signal.aborted && current === generation.current)
          setResponse(r);
      })
      .catch(() => {
        if (!controller.signal.aborted && current === generation.current)
          setError(true);
      });
    return () => {
      controller.abort();
      generation.current++;
    };
    // Parent remounts this component for every submitted attempt.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseId, exerciseRevision, answer, eligible]);
  async function run(action: "lookup" | "evaluate") {
    if (lock.current || !eligible || (lookupOnly && action !== "lookup"))
      return;
    lock.current = true;
    setBusy(true);
    setError(false);
    const current = ++generation.current;
    try {
      const r = await request(action);
      if (current === generation.current) setResponse(r);
    } catch {
      if (current === generation.current) setError(true);
    } finally {
      if (current === generation.current) {
        setBusy(false);
        lock.current = false;
      }
    }
  }
  if (!eligible)
    return (
      <p className={s.scoringNote}>
        原答已完整保存。本机评阅暂支持4000字以内的作答，可先对照参考分析。
      </p>
    );
  const ready = response?.status === "ready" ? response : null;
  return (
    <div className={s.answerScoring} aria-label="主观题评阅">
      {referenceSeen && (
        <p className={s.scoringNote}>
          {lookupOnly
            ? "这份答案在看过参考后提交。"
            : "这是看过参考后的练习，分数只用于检查这份答案。"}
        </p>
      )}
      {ready ? (
        <ScoringFeedback
          result={ready}
          showReference={false}
          historical={lookupOnly}
          documentFlow={lookupOnly}
        />
      ) : lookupOnly ? (
        <div>
          <p className={s.scoringNote} role="status">
            {error
              ? "暂时没能读取这份作答的已有评阅，原答仍在。"
              : busy || response === null
                ? "正在读取已有评阅…"
                : response.status === "pending"
                  ? "这份作答的评阅尚未完成，原答已保留。"
                  : response.status === "failed"
                    ? "这份作答暂时没有可显示的评阅，不计作答错误。"
                    : response.status === "unavailable"
                      ? "当前自动评阅不可用；可对照参考自检。"
                      : "这份答案还没有评阅。"}
          </p>
          {(error || response?.status === "pending") && (
            <button
              className={s.secondary}
              disabled={busy}
              onClick={() => void run("lookup")}
            >
              重新读取已有结果
            </button>
          )}
        </div>
      ) : (
        <>
          {busy ? (
            <ScoringWaiting />
          ) : (
            <p className={s.scoringNote} role="status">
              {error
                ? "暂时没能读取评阅，原答已保留。"
                : response?.status === "pending"
                  ? "这份答案已提交，尚未取得结果。"
                  : response?.status === "failed"
                    ? "本次未能完成评阅，不计作答错误，也不显示零分。"
                    : response?.status === "unavailable"
                      ? "本机评阅暂不可用，仍可对照参考分析。"
                      : "按本题得分点看一看，哪些已答到、哪些还需补充。"}
            </p>
          )}
          {error || response?.status === "pending" ? (
            <button
              className={s.secondary}
              disabled={busy}
              onClick={() => void run("lookup")}
            >
              重新读取已有结果
            </button>
          ) : (
            (!response || response.status === "not_requested") && (
              <button
                className={s.secondary}
                disabled={busy}
                onClick={() => void run("evaluate")}
              >
                {busy ? "正在评阅…" : "评阅这份答案"}
              </button>
            )
          )}
        </>
      )}
    </div>
  );
}
