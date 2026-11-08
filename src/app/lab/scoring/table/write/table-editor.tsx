"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  TABLE_TRIAL_VERSION,
  tableAnswers,
  type TableAnswers,
  type TableAvailability,
  type TableCase,
  type TableResult,
  type TableHistory,
} from "@/evaluation/table-trial/contract";
import type {
  ExplanationReviewDelivery,
  ReviewedTableReply,
} from "@/evaluation/table-trial/reviewed-explanation-delivery";
import { TableFeedback } from "../feedback";
import s from "../table.module.css";

const blank = (): TableAnswers =>
  ["1", "2", "3", "4", "5"].map((id) => ({
    id: id as TableAnswers[number]["id"],
    text: "",
  }));
async function send(input: unknown): Promise<ReviewedTableReply> {
  const response = await fetch("/api/lab/scoring/table", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Lvzhen-Scoring": "1" },
    body: JSON.stringify(input),
  });
  const reply = await response.json();
  if (!response.ok) throw Error(reply.error ?? "暂未取得结果。");
  return reply;
}
export function TableEditor({
  cases,
  archivedIds,
  initialCase,
  initialRecord,
  initialQuestion = "1",
}: {
  cases: TableCase[];
  archivedIds: string[];
  initialCase: TableCase["id"];
  initialRecord: string | null;
  initialQuestion?: string;
}) {
  const [questionId, setQuestionId] = useState(initialQuestion);
  function selectQuestion(id: string) {
    setQuestionId(id);
    const url = new URL(window.location.href);
    url.searchParams.set("question", id);
    window.history.replaceState(null, "", url);
  }
  const [caseId, setCaseId] = useState(initialCase),
    [answers, setAnswers] = useState<TableAnswers>(blank),
    [ready, setReady] = useState(false),
    [busy, setBusy] = useState(false);
  const [result, setResult] = useState<TableResult | null>(null),
    [history, setHistory] = useState<TableHistory[]>([]),
    [message, setMessage] = useState(""),
    [storageError, setStorageError] = useState(false);
  const [explanationReview, setExplanationReview] =
    useState<ExplanationReviewDelivery>();
  const [availability, setAvailability] = useState<TableAvailability | null>(
    null,
  );
  const [lookupBusy, setLookupBusy] = useState(false);
  const [confirmResume, setConfirmResume] = useState(false);
  const guard = useRef(false),
    generation = useRef(0),
    availabilityRequest = useRef(0),
    record = useRef<string | null>(null),
    initial = useRef<{ id: string; caseId: TableCase["id"] } | null>(
      initialRecord ? { id: initialRecord, caseId: initialCase } : null,
    );
  const item = cases.find((c) => c.id === caseId)!;
  const key = `lvzhen:${TABLE_TRIAL_VERSION}:${caseId}`;
  function persist(next: TableAnswers, id = record.current) {
    try {
      localStorage.setItem(
        key,
        JSON.stringify({ answers: next, recordId: id }),
      );
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }
  async function refreshHistory(
    id: TableCase["id"],
    token = generation.current,
  ) {
    const request = ++availabilityRequest.current;
    setAvailability(null);
    try {
      const reply = await send({ action: "list", caseId: id });
      if (generation.current === token) {
        setHistory(reply.history ?? []);
        if (availabilityRequest.current === request)
          setAvailability(reply.availability ?? null);
      }
    } catch {
      if (
        generation.current === token &&
        availabilityRequest.current === request
      )
        setAvailability(null);
      /* Draft and result remain usable; unknown status cannot open submission. */
    }
  }
  useEffect(() => {
    const token = ++generation.current;
    setReady(false);
    setResult(null);
    setExplanationReview(undefined);
    setHistory([]);
    setAvailability(null);
    setMessage("");
    setConfirmResume(false);
    const selectedQuestion = new URLSearchParams(window.location.search).get(
      "question",
    );
    setQuestionId(
      selectedQuestion && item.questions.some((q) => q.id === selectedQuestion)
        ? selectedQuestion
        : "1",
    );
    record.current = null;
    let restored = blank(),
      savedId: string | null = null;
    try {
      const text = localStorage.getItem(key);
      if (text) {
        const raw = JSON.parse(text);
        restored = tableAnswers.parse(raw.answers);
        if (
          typeof raw.recordId === "string" &&
          /^[a-f0-9]{64}$/.test(raw.recordId)
        )
          savedId = raw.recordId;
      }
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
    setAnswers(restored);
    if (initial.current?.caseId !== caseId) initial.current = null;
    const id = initial.current?.id ?? savedId;
    // Consume the URL record only after its read completes. Development-mode
    // effect replay may cancel the first read; the next setup still needs it.
    record.current = id;
    if (id)
      void send({ action: "read", id })
        .then((reply) => {
          if (generation.current !== token) return;
          initial.current = null;
          if (reply.result?.case.id === caseId) {
            setResult(reply.result);
            setExplanationReview(reply.explanationReview);
          } else if (reply.result) {
            initial.current = { id, caseId: reply.result.case.id };
            setCaseId(reply.result.case.id);
          }
        })
        .catch(() => {
          if (generation.current === token)
            setMessage("上次评阅暂未读取，草稿仍保留。");
        });
    void refreshHistory(caseId, token);
    setReady(true);
    return () => {
      generation.current++;
    };
    // Case changes alone restore drafts. Typing never sends an API request.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  function edit(id: string, text: string) {
    const next = answers.map((a) => (a.id === id ? { ...a, text } : a));
    setAnswers(next);
    persist(next);
  }
  async function act(action: "submit" | "lookup") {
    if (
      guard.current ||
      (action === "submit" && availability?.state !== "ready")
    )
      return;
    if (!tableAnswers.safeParse(answers).success) {
      setMessage("每问最多5000字，整份最多12000字。");
      return;
    }
    guard.current = true;
    ++availabilityRequest.current;
    setAvailability(null);
    setBusy(true);
    setMessage("");
    const snapshot = structuredClone(answers);
    persist(snapshot);
    try {
      const reply = await send({
        action,
        version: TABLE_TRIAL_VERSION,
        caseId,
        answers: snapshot,
      });
      setAvailability(reply.availability ?? null);
      if (reply.result) {
        setResult(reply.result);
        setExplanationReview(reply.explanationReview);
        record.current = reply.result.id;
        persist(snapshot, reply.result.id);
        window.history.replaceState(
          null,
          "",
          `?case=${caseId}&record=${reply.result.id}&question=${questionId}`,
        );
      }
      setMessage(
        reply.message ??
          (reply.result?.state === "running"
            ? "这份答案仍在评阅，可稍后查看保存结果。"
            : ""),
      );
      await refreshHistory(caseId);
    } catch (e) {
      setAvailability(null);
      setMessage(
        e instanceof Error ? e.message : "暂未取得结果，请查看保存结果。",
      );
    } finally {
      guard.current = false;
      setBusy(false);
    }
  }
  async function readHistory(id: string) {
    if (guard.current) return;
    guard.current = true;
    ++availabilityRequest.current;
    setAvailability(null);
    setLookupBusy(true);
    setMessage("");
    try {
      const reply = await send({ action: "read", id });
      setAvailability(reply.availability ?? null);
      if (reply.result) {
        setResult(reply.result);
        setExplanationReview(reply.explanationReview);
        record.current = id;
        persist(answers, id);
        window.history.replaceState(
          null,
          "",
          `?case=${caseId}&record=${id}&question=${questionId}`,
        );
        setMessage("已打开这份评阅；上方草稿保持不变。");
      }
    } catch {
      setAvailability(null);
      setMessage("暂未读取这份结果。");
    } finally {
      guard.current = false;
      setLookupBusy(false);
    }
  }
  const changed =
    !!result &&
    result.answers.some(
      (a) => a.text !== answers.find((v) => v.id === a.id)?.text,
    );
  const disabled = busy || lookupBusy || !ready;
  function resumeSavedAnswer(confirmed = false) {
    if (!result || guard.current) return;
    if (changed && answers.some((a) => a.text.trim()) && !confirmed) {
      setConfirmResume(true);
      return;
    }
    setConfirmResume(false);
    const next = structuredClone(result.answers);
    setAnswers(next);
    persist(next, result.id);
    setMessage("已用这份原答恢复草稿，可以继续修改；已保存的评阅保持不变。");
    selectQuestion("1");
    requestAnimationFrame(() => {
      document.getElementById("answer-1")?.focus();
      document
        .getElementById("answer-1")
        ?.scrollIntoView({ block: "center", behavior: "smooth" });
    });
  }
  return (
    <main className={s.page}>
      <header className={s.top}>
        <Link href="/lab/practice?view=library">← 返回练习</Link>
        <Link href="/lab/assessment?view=cases">跨章长案例</Link>
      </header>
      <div className={s.heading}>
        <div>
          <p className={s.eyebrow}>刑法 / 旧整案编辑器</p>
          <h1>整案作答与保存结果</h1>
          <p className={s.intro}>
            可以先答一问。草稿自动留在本机，回来后接着写。
          </p>
          <p className={s.meta} role="status">
            {availability?.message ??
              "尚未确认评阅是否开放；可以保存原答、查看已有结果。"}
          </p>
        </div>
        <label className={s.selectLabel}>
          选择案例
          <select
            value={caseId}
            disabled={disabled}
            onChange={(e) => {
              setCaseId(e.target.value as TableCase["id"]);
              window.history.replaceState(null, "", `?case=${e.target.value}`);
            }}
          >
            {cases
              .filter((c) => !archivedIds.includes(c.id))
              .map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
          </select>
        </label>
      </div>
      <div className={s.layout}>
        <aside className={s.aside}>
          <details className={s.facts} open>
            <summary>{item.title} · 案情</summary>
            {item.facts.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </details>
        </aside>
        <section aria-label="填写答案">
          <nav className={s.editorNav} aria-label="整案小问">
            {item.questions.map((q) => (
              <button
                type="button"
                key={q.id}
                aria-current={q.id === questionId ? "step" : undefined}
                onClick={() => selectQuestion(q.id)}
              >
                第 {q.id} 问
                <small>
                  {answers.find((a) => a.id === q.id)?.text.trim()
                    ? "有草稿"
                    : "未答"}
                </small>
              </button>
            ))}
          </nav>
          {item.questions
            .filter((q) => q.id === questionId)
            .map((q) => (
              <article className={s.question} key={q.id}>
                <label className={s.questionLabel} htmlFor={`answer-${q.id}`}>
                  <span>第 {q.id} 问</span>
                  {q.prompt}
                </label>
                <textarea
                  id={`answer-${q.id}`}
                  value={answers.find((a) => a.id === q.id)?.text ?? ""}
                  disabled={disabled}
                  maxLength={5000}
                  onChange={(e) => edit(q.id, e.target.value)}
                  placeholder="写下你的判断和理由，也可以用系统语音输入。"
                />
              </article>
            ))}
          <div className={s.actions}>
            <button
              className={s.secondary}
              disabled={questionId === "1"}
              onClick={() => selectQuestion(String(Number(questionId) - 1))}
            >
              上一问
            </button>
            {questionId !== "5" && (
              <button
                onClick={() => selectQuestion(String(Number(questionId) + 1))}
              >
                下一问
              </button>
            )}
          </div>
          {storageError && (
            <p className={s.notice}>
              浏览器暂不能保存草稿，离开前请自行保留原答。
            </p>
          )}
          <div className={s.actions}>
            <span>
              {answers.reduce((n, a) => n + a.text.length, 0)} / 12000 字
            </span>
            <button
              className={s.secondary}
              disabled={disabled}
              onClick={() => act("lookup")}
            >
              查看保存结果
            </button>
            <button
              disabled={
                disabled ||
                availability?.state !== "ready" ||
                !answers.some((a) => a.text.trim())
              }
              onClick={() => act("submit")}
            >
              {busy
                ? "正在处理…"
                : availability?.state === "paused"
                  ? "评阅已暂停"
                  : availability?.state !== "ready"
                    ? "评阅未开放"
                    : "提交评阅"}
            </button>
          </div>
          {message && (
            <p className={s.notice} role="status">
              {message}
            </p>
          )}
        </section>
      </div>
      {history.length > 0 && (
        <details className={s.history}>
          <summary>本案例已保存的评阅（{history.length}）</summary>
          <div>
            {history.map((h) => (
              <button
                disabled={disabled}
                key={h.id}
                onClick={() => readHistory(h.id)}
              >
                {new Date(h.createdAt).toLocaleString("zh-CN", {
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                ·{" "}
                {h.state === "running"
                  ? "评阅中"
                  : h.total === null
                    ? "待核对"
                    : `${h.total}/${h.maximum}分`}
              </button>
            ))}
          </div>
        </details>
      )}
      {result && (
        <section className={s.liveResult} aria-label="本次评阅">
          <div className={s.heading}>
            <div>
              <p className={s.eyebrow}>已保存 · {result.case.title}</p>
              <h2>逐问看反馈</h2>
              <p className={s.meta}>
                本次 {(result.durationMs / 1000).toFixed(2)} 秒
                {result.costCny !== null
                  ? ` · 费用估算 ¥${result.costCny.toFixed(5)}`
                  : " · 费用待核对"}{" "}
                · 满分{result.maximum}分，其中已作答部分满分
                {result.answeredMaximum}分。
              </p>
            </div>
            <div className={s.score}>
              <strong>{result.total ?? "待核对"}</strong>
              <span> / {result.maximum} 分</span>
              <small>练习参考分</small>
            </div>
          </div>
          {changed && (
            <p className={s.notice}>
              上方草稿与这份评阅不同。以下依据本次提交时保存的原答，草稿不会被覆盖。
            </p>
          )}
          {result.state !== "complete" && (
            <p className={s.notice} role="status">
              {result.state === "running"
                ? "这份答案尚未取得完整结果，可稍后查看保存结果。"
                : "本次评阅未完成，原答已保存，没有自动重试。"}
            </p>
          )}
          <TableFeedback
            questions={result.case.questions.map((q) => ({
              ...q,
              answer: result.answers.find((a) => a.id === q.id)?.text ?? "",
              maximum: q.maximum,
            }))}
            assessment={result.assessment}
            resultId={result.id}
            explanationReview={explanationReview}
          />
          <div className={s.actions}>
            <button
              className={s.secondary}
              disabled={disabled}
              onClick={() => resumeSavedAnswer()}
            >
              用这份原答继续修改 ↑
            </button>
            <Link href="/lab/practice?view=library">返回练习 →</Link>
          </div>
          {confirmResume && (
            <div className={s.notice} role="status">
              <p>
                上方有不同的草稿。要用这份评阅的原答替换草稿吗？已保存的评阅不会改变。
              </p>
              <div className={s.actions}>
                <button
                  className={s.secondary}
                  onClick={() => setConfirmResume(false)}
                >
                  保留当前草稿
                </button>
                <button onClick={() => resumeSavedAnswer(true)}>
                  使用这份原答
                </button>
              </div>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
