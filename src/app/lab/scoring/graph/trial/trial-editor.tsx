"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { answerSegments } from "@/evaluation/evidence-references";
import {
  LOCAL_TRIAL_VERSION,
  trialAnswersSchema,
  trialDraftSchema,
  highlightOriginal,
  type TrialAnswers,
  type TrialCase,
  type TrialReply,
  type TrialResult,
  type TrialPoint,
} from "@/evaluation/graph/local-trial-contract";
import s from "./trial.module.css";

// Display names only; the frozen criterion IDs and scoring cards are unchanged.
const pointNames: Record<string, string> = {
  q3_injury: "共同伤害责任",
  q3_boundary: "共同犯罪的范围",
  q3_detention: "先前拘禁的责任",
  q3_rescue: "后续救助的影响",
  q5_perjury: "伪证定性",
  q5_false: "虚假证明的依据",
  q5_bribe: "受贿定性",
  q5_identity: "身份与职务条件",
};

async function send(input: unknown): Promise<TrialReply> {
  const response = await fetch("/api/lab/scoring/graph/trial", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Lvzhen-Scoring": "1" },
    body: JSON.stringify(input),
  });
  const data = await response.json();
  if (!response.ok) throw Error(data.error ?? "暂未取得结果。");
  return data;
}
function Evidence({ answer, point }: { answer: string; point: TrialPoint }) {
  let parts: ReturnType<typeof highlightOriginal> | null = null;
  try {
    parts = highlightOriginal(
      answer,
      answerSegments(answer),
      point.evidenceIds,
    );
  } catch {
    /* Never fabricate or silently repair a model citation. */
  }
  return (
    <details className={s.detail}>
      <summary>查看模型解释与原文</summary>
      <p className={s.note}>
        模型解释可能有偏差；高亮为模型引用，其余文字保留上下文。
      </p>
      <p>{point.interpretation ?? "本项没有可展示的模型解释。"}</p>
      <div className={s.original} aria-label="本问完整原答">
        {parts
          ? parts.map((p, i) =>
              p.highlighted ? (
                <mark key={i}>{p.text}</mark>
              ) : (
                <span key={i}>{p.text}</span>
              ),
            )
          : answer}
      </div>
      {!parts && <p>引用暂无法定位，请结合完整原答核对。</p>}
    </details>
  );
}
export function TrialEditor({ cases }: { cases: TrialCase[] }) {
  const [caseId, setCaseId] = useState<TrialCase["id"]>(cases[0].id);
  const item = cases.find((c) => c.id === caseId)!;
  const empty = (): TrialAnswers =>
    item.questions.map((q) => ({
      questionId: q.id as TrialAnswers[number]["questionId"],
      text: "",
    }));
  const [answers, setAnswers] = useState<TrialAnswers>(empty),
    [loaded, setLoaded] = useState(false),
    [busy, setBusy] = useState(false),
    [pendingAction, setPendingAction] = useState<"submit" | "lookup">("submit"),
    [issue, setIssue] = useState("");
  const [result, setResult] = useState<TrialResult | null>(null),
    [storageIssue, setStorageIssue] = useState(false);
  const guard = useRef(false),
    generation = useRef(0),
    recordId = useRef<string | null>(null);
  const key = `lvzhen-local-candidate:${LOCAL_TRIAL_VERSION}:${caseId}`;
  function persist(next: TrialAnswers, id = recordId.current) {
    try {
      localStorage.setItem(
        key,
        JSON.stringify({ answers: next, recordId: id }),
      );
      setStorageIssue(false);
    } catch {
      setStorageIssue(true);
    }
  }
  function request(action: "submit" | "lookup", current = answers) {
    return { action, version: LOCAL_TRIAL_VERSION, caseId, answers: current };
  }
  useEffect(() => {
    const token = ++generation.current;
    setLoaded(false);
    setResult(null);
    setIssue("");
    recordId.current = null;
    let restored = empty();
    let hasDraft = false;
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const d = JSON.parse(raw);
        restored = trialDraftSchema.parse(d.answers);
        hasDraft = true;
        if (typeof d.recordId === "string") recordId.current = d.recordId;
      }
    } catch {
      setStorageIssue(true);
    }
    setAnswers(restored);
    const queryId = new URLSearchParams(window.location.search).get("record");
    const id = queryId ?? recordId.current;
    if (!id) {
      setLoaded(true);
      return;
    }
    void send({ action: "read", id })
      .then((reply) => {
        if (generation.current !== token) return;
        if (reply.result?.caseId === caseId) {
          setResult(reply.result);
          recordId.current = reply.result.id;
          if (!hasDraft) {
            const savedAnswers = trialDraftSchema.parse(
              reply.result.questions.map((q) => ({
                questionId: q.id,
                text: q.answer,
              })),
            );
            setAnswers(savedAnswers);
            persist(savedAnswers, reply.result.id);
          }
        } else if (
          reply.result &&
          cases.some((c) => c.id === reply.result!.caseId)
        )
          setCaseId(reply.result.caseId as TrialCase["id"]);
        if (reply.message) setIssue(reply.message);
      })
      .catch((e) => {
        if (generation.current === token) setIssue(e.message);
      })
      .finally(() => {
        if (generation.current === token) setLoaded(true);
      });
    // Only restore on case changes; local edits must not trigger API calls.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  async function act(action: "submit" | "lookup") {
    if (guard.current) return;
    if (!trialAnswersSchema.safeParse(answers).success) {
      setIssue("每问最多5000字，整份最多12000字。");
      return;
    }
    guard.current = true;
    setPendingAction(action);
    setBusy(true);
    setIssue("");
    const snapshot = structuredClone(answers);
    persist(snapshot);
    try {
      const reply = await send(request(action, snapshot));
      if (reply.result) {
        setResult(reply.result);
        recordId.current = reply.result.id;
        persist(snapshot, reply.result.id);
        window.history.replaceState(
          null,
          "",
          `${window.location.pathname}?record=${reply.result.id}`,
        );
      }
      if (reply.message) setIssue(reply.message);
      else if (!reply.result)
        setIssue(
          reply.available
            ? "还没有这份答案的评阅结果，可以提交评阅。"
            : "当前暂不能评阅，草稿仍保留。",
        );
    } catch (e) {
      setIssue(
        e instanceof Error
          ? e.message
          : "暂未取得结果。请点“查看保存结果”，不会重新调用模型。",
      );
    } finally {
      guard.current = false;
      setBusy(false);
    }
  }
  const changed =
    result &&
    (result.caseId !== caseId ||
      result.questions.some(
        (q) => q.answer !== answers.find((a) => a.questionId === q.id)?.text,
      ));
  const totalChars = answers.reduce((n, a) => n + a.text.length, 0);
  return (
    <main className={s.page}>
      <header className={s.header}>
        <Link href="/lab/practice?view=library">← 返回练习</Link>
        <span>本机试用 · 9月28日候选</span>
      </header>
      <div className={s.heading}>
        <div>
          <p className={s.eyebrow}>刑法 · 案例作答</p>
          <h1>把判断写清楚。</h1>
          <p className={s.intro}>
            按问写下自己的判断和理由。可以先答一问，草稿会留在当前浏览器。
          </p>
        </div>
        <label className={s.choose}>
          选择案例
          <select
            aria-label="选择案例"
            value={caseId}
            disabled={busy}
            onChange={(e) => {
              window.history.replaceState(null, "", window.location.pathname);
              setCaseId(e.target.value as TrialCase["id"]);
            }}
          >
            {cases.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className={s.layout}>
        <aside className={s.case}>
          <span className={s.eyebrow}>案情 · 一案五问</span>
          <h2>{item.title}</h2>
          {item.facts.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </aside>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void act("submit");
            }}
          >
            {item.questions.map((q, i) => (
              <section className={s.card} key={q.id}>
                <label htmlFor={`trial-${q.id}`}>
                  <span className={s.number}>0{i + 1}</span>
                  {q.text}
                </label>
                <textarea
                  id={`trial-${q.id}`}
                  aria-label={`第${i + 1}问答案`}
                  value={answers.find((a) => a.questionId === q.id)?.text ?? ""}
                  maxLength={5000}
                  disabled={!loaded || busy}
                  placeholder="写下你的判断和理由……"
                  onChange={(e) => {
                    const next = answers.map((a) =>
                      a.questionId === q.id
                        ? { ...a, text: e.target.value }
                        : a,
                    );
                    setAnswers(next);
                    persist(next);
                  }}
                />
              </section>
            ))}
            <div className={s.actions}>
              <span>{totalChars} / 12000 字</span>
              <button type="submit" disabled={!loaded || busy}>
                {busy && pendingAction === "submit" ? "正在评阅…" : "提交评阅"}
              </button>
              <button
                type="button"
                className={s.secondary}
                disabled={!loaded || busy}
                onClick={() => void act("lookup")}
              >
                {busy && pendingAction === "lookup"
                  ? "正在查找…"
                  : "查看保存结果"}
              </button>
            </div>
            <p className={s.note}>
              训练分用于练习参考，不代表正式考试成绩。空问记为未作答；查看保存结果不会重新调用模型。
            </p>
          </form>
          {storageIssue && (
            <p className={s.warning}>
              浏览器暂不能保存草稿，请先复制自己的答案。
            </p>
          )}
          {issue && (
            <p role="status" className={s.warning}>
              {issue}
            </p>
          )}
          {result && (
            <section className={s.result} aria-label="评阅结果">
              <div className={s.resultHead}>
                <div>
                  <span className={s.eyebrow}>
                    训练得分 ·{" "}
                    {result.source === "offline_test"
                      ? "离线演示"
                      : result.source === "saved_replay"
                        ? "已保存样例"
                        : "本次作答"}
                  </span>
                  <h2>{result.title}</h2>
                </div>
                <strong>
                  {result.total === null ? "待核对" : result.total}
                  <small> / {result.max}</small>
                </strong>
              </div>
              {changed && (
                <p className={s.warning}>
                  你已修改草稿。下面仍是上次提交的结果及原答，新内容尚未评阅。
                </p>
              )}
              {result.state !== "complete" && (
                <p className={s.warning}>
                  {result.state === "running"
                    ? "结果尚未完整保存。稍后点击“查看保存结果”，只读取已有记录。"
                    : "本次评阅已停止，未完成部分不记为答错；原答已保存，没有自动重试。"}
                </p>
              )}
              <p className={s.note}>
                得分由程序按题卡计算，仍依赖模型对答案的理解。先看题卡依据；需要核对时，展开模型解释与原文。
              </p>
              {result.questions.map((q, i) => (
                <article className={s.resultQuestion} key={q.id}>
                  <h3>
                    <span>
                      第{i + 1}问{q.status === "empty" ? " · 未作答" : ""}
                    </span>
                    <span>
                      {q.total === null ? "待核对" : q.total} / {q.max}
                    </span>
                  </h3>
                  <p className={s.questionText}>{q.question}</p>
                  {q.status === "empty" ? (
                    <p className={s.note}>本问没有作答，未调用模型。</p>
                  ) : (
                    q.points.map((p) => (
                      <div className={s.point} key={p.id}>
                        <div className={s.pointTitle}>
                          <b>
                            {pointNames[p.title] ??
                              p.title.replace(/^第\d问[·：]/, "")}
                          </b>
                          <span>
                            {p.earned === null
                              ? "待核对"
                              : `${p.earned} / ${p.max}`}
                          </span>
                        </div>
                        <p>{p.feedback}</p>
                        {p.diagnosticPending && (
                          <p className={s.note}>
                            本项理解仍待核对，分数与解释请分开看。
                          </p>
                        )}
                        <details className={s.detail}>
                          <summary>题卡依据</summary>
                          <p>{p.guidance}</p>
                          <p className={s.note}>{p.ruleBasis}</p>
                        </details>
                        <Evidence answer={q.answer} point={p} />
                      </div>
                    ))
                  )}
                </article>
              ))}
              <p className={s.note}>
                保存于 {new Date(result.createdAt).toLocaleString("zh-CN")} ·{" "}
                {result.calls} 次请求 · 服务端评阅{" "}
                {(result.durationMs / 1000).toFixed(1)} 秒 · 按公开费率约 ¥
                {result.costCny.toFixed(4)}
                {result.unknownCostCalls
                  ? `，另有${result.unknownCostCalls}次费用待核对`
                  : ""}
              </p>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
