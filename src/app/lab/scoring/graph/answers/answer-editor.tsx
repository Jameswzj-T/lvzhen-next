"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  answerDraftSchema,
  restoreAnswerDraft,
  type AnswerDraft,
  type AnswerWorkspaceCase,
  type SavedAnswerPreview,
} from "@/evaluation/graph/answer-draft";
import s from "./answers.module.css";

type Attempt = { id: string; serialized: string };
export function AnswerEditor({ item }: { item: AnswerWorkspaceCase }) {
  const key = `lvzhen-question-owned-draft-v1:${item.revision}`;
  const [draft, setDraft] = useState<AnswerDraft>({
    answers: item.questions.map((q) => ({
      questionId: q.id,
      text: "",
      contextQuestionIds: [],
    })),
    unassignedText: "",
  });
  const [loaded, setLoaded] = useState(false),
    [busy, setBusy] = useState(false);
  const [error, setError] = useState(""),
    [storageIssue, setStorageIssue] = useState(false);
  const [saved, setSaved] = useState<SavedAnswerPreview | null>(null);
  const attempt = useRef<Attempt | null>(null),
    lock = useRef(false);
  function persist(next: AnswerDraft, pending = attempt.current) {
    setDraft(next);
    try {
      localStorage.setItem(
        key,
        JSON.stringify({ draft: next, attempt: pending }),
      );
      setStorageIssue(false);
    } catch {
      setStorageIssue(true);
    }
  }
  async function send(
    input: unknown,
    signal?: AbortSignal,
  ): Promise<SavedAnswerPreview> {
    const r = await fetch("/api/lab/scoring/graph/answers", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Lvzhen-Scoring": "1" },
      body: JSON.stringify(input),
      signal,
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data.error ?? "暂未保存成功。");
    return data;
  }
  useEffect(() => {
    const controller = new AbortController();
    let local: AnswerDraft | null = null;
    try {
      const value = localStorage.getItem(key);
      if (value) {
        const data = JSON.parse(value);
        local = restoreAnswerDraft(
          item.questions.map((q) => q.id),
          data.draft,
        );
        if (
          data.attempt &&
          typeof data.attempt.id === "string" &&
          typeof data.attempt.serialized === "string"
        )
          attempt.current = data.attempt;
        setDraft(local);
      }
    } catch {
      setStorageIssue(true);
    }
    const id = new URLSearchParams(window.location.search).get("answer");
    if (!id) {
      setLoaded(true);
      return () => controller.abort();
    }
    send({ action: "load", id }, controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return;
        setSaved(result);
        // Do not overwrite a newer unsaved browser draft while showing an old receipt.
        if (!local && result.case.revision === item.revision)
          setDraft(result.draft);
      })
      .catch((e) => {
        if (!controller.signal.aborted) setError(e.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoaded(true);
      });
    return () => controller.abort();
    // Initial load only; edits stay local until explicitly saved.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  function edit(id: string, value: Partial<AnswerDraft["answers"][number]>) {
    persist({
      ...draft,
      answers: draft.answers.map((a) =>
        a.questionId === id ? { ...a, ...value } : a,
      ),
    });
  }
  async function save() {
    if (lock.current) return;
    if (!answerDraftSchema.safeParse(draft).success) {
      setError("每问最多5000字，整份最多12000字。");
      return;
    }
    lock.current = true;
    setBusy(true);
    setError("");
    const serialized = JSON.stringify(draft);
    const current =
      attempt.current?.serialized === serialized
        ? attempt.current
        : { id: crypto.randomUUID(), serialized };
    attempt.current = current;
    persist(draft, current);
    try {
      const result = await send({ action: "save", id: current.id, draft });
      setSaved(result);
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}?answer=${result.id}`,
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "暂未保存成功，草稿还在。");
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  const changed =
    saved &&
    (saved.draft.unassignedText !== draft.unassignedText ||
      saved.draft.answers.some((old) => {
        const current = draft.answers.find(
          (a) => a.questionId === old.questionId,
        );
        return (
          !current ||
          current.text !== old.text ||
          current.contextQuestionIds.length !== old.contextQuestionIds.length ||
          current.contextQuestionIds.some(
            (id) => !old.contextQuestionIds.includes(id),
          )
        );
      }));
  const total = draft.answers.reduce(
    (n, a) => n + a.text.length,
    draft.unassignedText.length,
  );
  return (
    <main className={s.page}>
      <header>
        <Link href="/lab/scoring/case">← 原有作答与成绩</Link>
        <span>本机 · 分问作答样板</span>
      </header>
      <h1>完整分析，按问写下。</h1>
      <p className={s.intro}>
        仍用自己的话写判断和理由。草稿自动保存在当前浏览器，每次保存保留一份完整原答。
      </p>
      <div className={s.layout}>
        <aside className={s.case}>
          <span className={s.eyebrow}>一案五问</span>
          <h2>{item.title}</h2>
          <p>{item.facts}</p>
        </aside>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void save();
            }}
          >
            {item.questions.map((q, i) => {
              const entry = draft.answers.find((a) => a.questionId === q.id)!;
              return (
                <section className={s.card} key={q.id}>
                  <label htmlFor={`answer-${q.id}`}>
                    <span className={s.number}>0{i + 1}</span>
                    <span>{q.question}</span>
                  </label>
                  <textarea
                    id={`answer-${q.id}`}
                    aria-label={`第${i + 1}问答案`}
                    value={entry.text}
                    disabled={!loaded || busy}
                    maxLength={5000}
                    placeholder="写下你的判断和理由……"
                    onChange={(e) => edit(q.id, { text: e.target.value })}
                  />
                  <details className={s.context}>
                    <summary>
                      关联其他问的原答
                      {entry.contextQuestionIds.length
                        ? `（${entry.contextQuestionIds.length}）`
                        : "（可选）"}
                    </summary>
                    <p>
                      需要沿用或更正其他问的内容时，可附上原答；具体关系仍在本问中写清楚。
                    </p>
                    <div>
                      {item.questions
                        .filter((other) => other.id !== q.id)
                        .map((other) => (
                          <label key={other.id}>
                            <input
                              type="checkbox"
                              disabled={!loaded || busy}
                              checked={entry.contextQuestionIds.includes(
                                other.id,
                              )}
                              onChange={(e) =>
                                edit(q.id, {
                                  contextQuestionIds: e.target.checked
                                    ? [...entry.contextQuestionIds, other.id]
                                    : entry.contextQuestionIds.filter(
                                        (id) => id !== other.id,
                                      ),
                                })
                              }
                            />
                            第
                            {item.questions.findIndex(
                              (p) => p.id === other.id,
                            ) + 1}
                            问
                          </label>
                        ))}
                    </div>
                  </details>
                </section>
              );
            })}
            <details className={s.unassigned}>
              <summary>保留暂未分问的原文</summary>
              <p>这部分原文会完整保存；归属明确之前，本份答案暂不进入评阅。</p>
              <textarea
                aria-label="暂未分问的原文"
                value={draft.unassignedText}
                disabled={!loaded || busy}
                maxLength={12000}
                onChange={(e) =>
                  persist({ ...draft, unassignedText: e.target.value })
                }
              />
            </details>
            <div className={s.actions}>
              <span>{total} / 12000 字</span>
              <button disabled={!loaded || busy || !total}>
                {busy ? "保存中…" : "保存这份答案"}
              </button>
            </div>
            <p className={s.note}>
              这一步只保存答案、核对分发范围，尚未启动模型评阅。
            </p>
          </form>
          {storageIssue && (
            <p className={s.warning} role="alert">
              浏览器暂时无法保存草稿，请先复制留存。
            </p>
          )}
          {error && (
            <p className={s.warning} role="alert">
              {error}
            </p>
          )}
          {saved && (
            <section className={s.saved} aria-label="已保存答案">
              <h2>这份答案已保存</h2>
              <p>
                {saved.case.revision !== item.revision &&
                  "这份记录来自之前的题目版本。"}
                {changed
                  ? "你已修改草稿，下方仍是上次保存的内容。"
                  : "可刷新或重新打开此页面查看。"}{" "}
                尚未评阅。
              </p>
              <details>
                <summary>查看每问的评阅范围</summary>
                {saved.groups.map((g, i) => (
                  <article key={g.id}>
                    <h3>
                      第{i + 1}问
                      {g.contextQuestionIds.length ? " · 含关联原答" : ""}
                    </h3>
                    <p>
                      {g.state === "unassigned_text"
                        ? "存在尚未分问的原文，本份答案暂不分发。"
                        : g.state === "empty_context"
                          ? "关联问尚无内容，本问暂不分发。"
                          : g.state === "empty"
                            ? "本问未作答。"
                            : g.text}
                    </p>
                  </article>
                ))}
              </details>
              <details>
                <summary>查看整份原答</summary>
                <p className={s.original}>{saved.originalText}</p>
              </details>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
