"use client";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { LearningFrame } from "../_components/learning-frame";
import {
  validateScoringTrialResponse,
  type ScoringTrialResponse,
  type ScoringTrialQuestion,
} from "@/evaluation/scoring-trial-contract";
import s from "./scoring.module.css";
import { ScoringFeedback } from "./scoring-feedback";
import { ScoringWaiting } from "./scoring-waiting";

const savedSchema = z.object({
  draft: z.string(),
  submitted: z.string().nullable(),
  history: z.array(z.string()).max(20),
});
type Saved = z.infer<typeof savedSchema>;
export function ScoringPractice({
  questions,
}: {
  questions: ScoringTrialQuestion[];
}) {
  const [index, setIndex] = useState(0);
  return (
    <LearningFrame section="practice" user={null} status="本机试用">
      <main id="learning-main" className={s.workspace}>
        <div className={s.heading}>
          <div>
            <a href="/lab/practice?view=library">练习目录 / 刑法</a>
            <h1>写下分析，看看得分点</h1>
            <p>保留旧题与评阅试用入口。日常练习请在练习目录选章节。</p>
          </div>
          <span className={s.badge}>历史评阅实验</span>
        </div>
        <nav className={s.tabs} aria-label="选择练习题">
          {questions.map((q, i) => (
            <button
              key={q.id}
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
            >
              <span>0{i + 1}</span>
              {q.title}
            </button>
          ))}
        </nav>
        <ScoringQuestion
          key={questions[index].id}
          question={questions[index]}
          next={() => {
            setIndex((index + 1) % questions.length);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </main>
    </LearningFrame>
  );
}
export function ScoringQuestion({
  question: q,
  next,
  nextLabel = "继续下一题 →",
  readOnly = false,
}: {
  question: ScoringTrialQuestion;
  next: () => void;
  nextLabel?: string;
  readOnly?: boolean;
}) {
  const composite = Boolean(q.parts?.length);
  const storageKey = `lvzhen-scoring-v1:${q.id}:${q.revision}`;
  const [saved, setSaved] = useState<Saved>({
    draft: "",
    submitted: null,
    history: [],
  });
  const [loaded, setLoaded] = useState(false),
    [storageIssue, setStorageIssue] = useState(false);
  const [response, setResponse] = useState<ScoringTrialResponse | null>(null),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(false);
  const lock = useRef(false),
    generation = useRef(0);
  useEffect(() => {
    try {
      const data = localStorage.getItem(storageKey);
      if (data) setSaved(savedSchema.parse(JSON.parse(data)));
    } catch {
      setStorageIssue(true);
    }
    setLoaded(true);
    return () => {
      generation.current++;
    };
  }, [storageKey]);
  function persist(value: Saved) {
    setSaved(value);
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
      setStorageIssue(false);
    } catch {
      setStorageIssue(true);
    }
  }
  async function request(
    action: "lookup" | "evaluate",
    answer: string,
    signal?: AbortSignal,
  ) {
    const r = await fetch("/api/lab/scoring", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-lvzhen-scoring": "1" },
      body: JSON.stringify({
        action,
        caseId: q.id,
        exerciseRevision: q.exerciseRevision,
        answer,
      }),
      keepalive: action === "evaluate",
      signal,
    });
    if (!r.ok) throw new Error("unavailable");
    return validateScoringTrialResponse(q.id, answer, await r.json());
  }
  useEffect(() => {
    if (!loaded || saved.submitted === null) return;
    const controller = new AbortController();
    const current = generation.current;
    request("lookup", saved.submitted, controller.signal)
      .then((r) => {
        if (!controller.signal.aborted && generation.current === current)
          setResponse(r);
      })
      .catch(() => {
        if (!controller.signal.aborted && generation.current === current)
          setError(true);
      });
    return () => controller.abort();
    // Each response is tied to the saved immutable original, never to the draft.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);
  async function submit(lookupOnly = false) {
    if (lock.current || !saved.draft.trim()) return;
    // The "view" button must stay a free lookup, including after a model switch.
    // A fresh request is only for a new/edited answer or an explicitly unreviewed one.
    lookupOnly ||=
      readOnly ||
      (saved.submitted !== null &&
        saved.draft === saved.submitted &&
        response?.status !== "not_requested");
    lock.current = true;
    setBusy(true);
    setError(false);
    setResponse(null);
    const current = ++generation.current;
    const answer =
      lookupOnly && saved.submitted !== null ? saved.submitted : saved.draft;
    if (!lookupOnly)
      persist({
        draft: answer,
        submitted: answer,
        history: [answer, ...saved.history.filter((a) => a !== answer)].slice(
          0,
          20,
        ),
      });
    try {
      const result = await request(lookupOnly ? "lookup" : "evaluate", answer);
      if (current === generation.current) setResponse(result);
    } catch {
      if (current === generation.current) setError(true);
    } finally {
      if (current === generation.current) {
        setBusy(false);
        lock.current = false;
      }
    }
  }
  async function viewPrevious(answer: string) {
    if (lock.current) return;
    const current = ++generation.current;
    persist({ ...saved, draft: answer, submitted: answer });
    setResponse(null);
    setError(false);
    try {
      const r = await request("lookup", answer);
      if (current === generation.current) setResponse(r);
    } catch {
      if (current === generation.current) setError(true);
    }
  }
  const changed = saved.submitted !== null && saved.draft !== saved.submitted;
  const ready = response?.status === "ready" ? response : null;
  return (
    <div className={`${s.grid} ${composite ? s.capstoneGrid : ""}`}>
      <section
        id="case-reading"
        className={s.case}
        aria-label="本题案情"
        tabIndex={-1}
      >
        <div className={s.caption}>
          {composite ? "一案五问" : "案例练习"} <span>{q.maxScore} 分</span>
        </div>
        <h2>{composite ? "案情" : q.title}</h2>
        <p className={s.facts}>{q.facts}</p>
        <div className={s.question}>
          <h3>请你分析</h3>
          {q.parts ? (
            <ol className={s.caseQuestions}>
              {q.parts.map((part) => (
                <li key={part.id}>{part.question}</li>
              ))}
            </ol>
          ) : (
            <p>{q.question}</p>
          )}
        </div>
        <p className={s.note}>用自己的话写清判断和理由即可。</p>
      </section>
      <section
        id="case-answer"
        className={s.answer}
        aria-label="作答与评阅"
        tabIndex={-1}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
        >
          <label htmlFor="analysis">
            {composite ? "整份答案" : "我的分析"}
          </label>
          {composite && (
            <p className={s.draftHint} id="answer-hint">
              {readOnly
                ? "这里保留此前的原答和草稿，查看不会重新评阅。"
                : "把五问写在这里，一次提交。草稿自动保存在当前浏览器。"}
            </p>
          )}
          <textarea
            id="analysis"
            placeholder={
              composite
                ? "可按问编号，也可以连贯作答。写清每个人的判断和理由……"
                : "写下你的判断，并结合案情说明理由……"
            }
            aria-describedby={composite ? "answer-hint" : undefined}
            maxLength={4000}
            value={saved.draft}
            disabled={!loaded || busy}
            readOnly={readOnly}
            onChange={(e) => persist({ ...saved, draft: e.target.value })}
          />
          <div className={s.actions}>
            <span>{saved.draft.length} / 4000</span>
            <button
              type="submit"
              disabled={
                !loaded ||
                busy ||
                !saved.draft.trim() ||
                (readOnly && saved.submitted === null)
              }
            >
              {busy
                ? "正在评阅…"
                : readOnly
                  ? "查看原有评阅"
                  : changed
                    ? "评阅修改后的答案"
                    : saved.submitted === null
                      ? "提交并评阅"
                      : response?.status === "not_requested"
                        ? "评阅这份答案"
                        : "查看这份答案的评阅"}
            </button>
          </div>
        </form>
        {storageIssue && (
          <p className={s.notice} role="alert">
            本机暂时无法保存草稿，请先复制原答留存。
          </p>
        )}
        {busy && <ScoringWaiting composite={composite} />}
        {composite && (busy || response?.status === "pending") && (
          <p className={s.leaveHint}>
            已提交的原答会保留，回来可读取结果。
            <a href="/lab/practice?view=library">先练其他题 →</a>
          </p>
        )}
        {changed && !busy && (
          <p className={s.notice}>你已修改原答；下方仍是上次提交的评阅。</p>
        )}
        {error && (
          <div className={s.notice} role="status">
            <p>暂时没能取得评阅，原答仍在这里。</p>
            <button onClick={() => void submit(true)}>重新读取已有结果</button>
          </div>
        )}
        {response?.status === "pending" && (
          <div className={s.notice} role="status">
            <p>这份答案已提交，尚未取得结果，可稍后读取。</p>
            <button disabled={busy} onClick={() => void submit(true)}>
              查看已有结果
            </button>
          </div>
        )}
        {response?.status === "unavailable" && (
          <p className={s.notice} role="status">
            {response.reason === "limit"
              ? "本次试用额度已用完，已有评阅仍可查看。"
              : readOnly
                ? "没有找到这份原答的旧版评阅，原答仍保留。"
                : "本次评阅暂未开放，草稿已保留。"}
          </p>
        )}
        {response?.status === "failed" && (
          <p className={s.notice} role="status">
            本次未能完成评阅，不计作答错误，也不显示零分。你可以保留原答，继续下一题。
          </p>
        )}
        {ready && (
          <ScoringFeedback
            result={ready}
            groups={q.parts}
            coreConclusionCriterionId={q.coreConclusionCriterionId}
          >
            <button className={s.next} onClick={next}>
              {nextLabel}
            </button>
          </ScoringFeedback>
        )}
        {saved.history.length > 1 && (
          <details className={s.history}>
            <summary>之前的作答（{saved.history.length}）</summary>
            {saved.history.map((answer, i) => (
              <button
                key={answer}
                disabled={busy}
                onClick={() => void viewPrevious(answer)}
              >
                第{saved.history.length - i}次 · {answer.slice(0, 45)}
                {answer.length > 45 ? "…" : ""}
              </button>
            ))}
          </details>
        )}
      </section>
    </div>
  );
}
