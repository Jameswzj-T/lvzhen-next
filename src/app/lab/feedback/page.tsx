"use client";
import { useRef, useState } from "react";
import {
  answers,
  editExample,
  clarificationQuestion,
  uncertainReason,
  facts,
  feedback,
  prompt,
  scenarios,
  scenarioState,
  type Phase,
} from "./fixtures";
import styles from "./feedback.module.css";
export default function FeedbackLabPage() {
  const [index, setIndex] = useState(0);
  const [editingStarted, setEditingStarted] = useState(false);
  const [draft, setDraft] = useState(answers[0]);
  const [phase, setPhase] = useState<Phase>("feedback");
  const [previous, setPrevious] = useState<Phase>("feedback");
  const [quote, setQuote] = useState("");
  const [expanded, setExpanded] = useState(true);
  const editor = useRef<HTMLTextAreaElement>(null);
  const original = useRef<HTMLParagraphElement>(null);
  const result =
    index < 3 && phase === "feedback" && draft === answers[index]
      ? feedback[index]
      : null;
  function switchScenario(value: number) {
    const next = scenarioState(value);
    setEditingStarted(false);
    setIndex(value);
    setDraft(next.draft);
    setPhase(next.phase);
    setQuote("");
    setExpanded(true);
    setPrevious(next.phase === "paused" ? "unreviewed" : next.phase);
  }
  function edit() {
    setEditingStarted(true);
    setPhase("editing");
    setQuote("");
    requestAnimationFrame(() => editor.current?.focus());
  }
  function locate(text: string) {
    setQuote(text);
    setExpanded(true);
    requestAnimationFrame(() => {
      original.current?.focus();
      original.current?.scrollIntoView({
        block: "nearest",
        behavior: "instant",
      });
    });
  }
  const offset = draft.indexOf(quote);
  const titles: Record<Phase, string> = {
    feedback: "本次回答的反馈",
    editing: draft.trim() ? "继续写下你的分析" : "先写下你的分析",
    waiting: "正在评阅本次答案（状态示意）",
    unreviewed: "尚未评阅",
    error: "暂未完成评阅",
    clarification: "请先澄清一句话",
    paused: "已暂停本次练习",
    finished: "已结束本次练习",
    cancelled: "尚未评阅：已取消",
    timeout: "尚未评阅：模拟超时",
    uncertain: "这一点暂不能确认",
  };
  return (
    <main className={styles.shell}>
      <p className={styles.badge}>反馈交互预览：示例内容，未调用模型</p>
      <header className={styles.header}>
        <h1>从你的原文，找到下一步</h1>
        <p>律真 · 短答练习。先看依据，再处理一个问题。</p>
      </header>
      <aside className={styles.controls} aria-label="预览场景控制">
        <label htmlFor="scenario">预览场景</label>
        <select
          id="scenario"
          value={index}
          onChange={(e) => switchScenario(Number(e.target.value))}
        >
          {scenarios.map((name, i) => (
            <option key={name} value={i}>
              {name}
            </option>
          ))}
        </select>
        <p>
          此处切换固定示例；下方为学生反馈展示。等待、失败、澄清为界面示意，不是模型结果。
        </p>
      </aside>
      <div className={styles.grid}>
        <section className={styles.source}>
          <h2>题目与当前答卷</h2>
          <details open>
            <summary>查看案例与问题</summary>
            <p>{facts}</p>
            <p className={styles.question}>{prompt}</p>
          </details>
          <details
            open={expanded}
            onToggle={(e) => setExpanded(e.currentTarget.open)}
          >
            <summary>
              {editingStarted
                ? "查看当前订正全文（尚未评阅）"
                : "查看本次原答全文"}
            </summary>
            <p ref={original} tabIndex={-1} className={styles.original}>
              {!draft ? (
                "尚未作答。"
              ) : quote && offset >= 0 ? (
                <>
                  {draft.slice(0, offset)}
                  <mark>{quote}</mark>
                  {draft.slice(offset + quote.length)}
                </>
              ) : (
                draft
              )}
            </p>
          </details>
          {editingStarted && (
            <details data-testid="old-snapshot">
              <summary>查看旧原答与对应示例反馈</summary>
              <p className={styles.note}>
                以下仅属于修改前的快照，不适用于当前订正。
              </p>
              <p className={styles.original}>
                {scenarioState(index).draft || "尚未作答。"}
              </p>
              {index < 3 ? (
                <>
                  <p>{feedback[index].text}</p>
                  <p>旧答订正方向：{feedback[index].issue}</p>
                  {feedback[index].evidence.map(([text, label]) => (
                    <p key={text}>
                      {label}：<q>{text}</q>
                    </p>
                  ))}
                  <p>旧答术语建议：{feedback[index].term}</p>
                </>
              ) : index === 6 ? (
                <p>旧快照的澄清问题：{clarificationQuestion}</p>
              ) : index === 10 ? (
                <p>旧快照暂不能确认：{uncertainReason}</p>
              ) : (
                <p>旧原答未评阅，没有对应判断。</p>
              )}
            </details>
          )}
          {phase === "editing" && (
            <>
              {index < 3 && (
                <p className={styles.note}>
                  针对旧答的订正提示：{feedback[index].issue}
                </p>
              )}
              {index === 6 && (
                <p className={styles.note}>
                  针对旧快照的问题：{clarificationQuestion}
                </p>
              )}
              {index === 10 && (
                <p className={styles.note}>请说明这一点；新文本尚未评阅。</p>
              )}
              <label htmlFor="answer">我的分析 / 订正</label>
              <textarea
                id="answer"
                ref={editor}
                value={draft}
                onChange={(e) => {
                  setDraft(e.target.value);
                  setQuote("");
                }}
                rows={5}
              />
              <p className={styles.note}>
                内容已修改或正在编辑，尚未评阅；不套用旧快照的示例反馈。
              </p>
            </>
          )}
        </section>
        <section className={styles.result} aria-label="学生反馈">
          <div role="status">
            <h2>{titles[phase]}</h2>
          </div>
          {result && (
            <>
              <p className={styles.lead}>{result.text}</p>
              <h3>
                原文证据 <span>点击定位全文</span>
              </h3>
              <div className={styles.evidence}>
                {result.evidence.map(([text, label]) => (
                  <button key={text} onClick={() => locate(text)}>
                    <span>{label}</span>
                    <q>{text}</q>
                  </button>
                ))}
              </div>
              {index === 2 && (
                <p>认识、态度、概率规则：尚未说明，暂无原文可引用。</p>
              )}
              <h3>实质反馈</h3>
              <p>{result.issue}</p>
              <details>
                <summary>术语建议（不影响实质判断）</summary>
                <p>{result.term}</p>
              </details>
            </>
          )}
          {phase === "waiting" && (
            <p>
              仅展示等待界面，没有发送请求，也没有计时或自动返回。可取消本次评阅。
            </p>
          )}
          {phase === "unreviewed" && (
            <p>本页仍显示你的答案；当前未判断对错。预览不提供新原文的评阅。</p>
          )}
          {(phase === "cancelled" || phase === "timeout") && (
            <p>
              {phase === "cancelled"
                ? "你已取消本次评阅。"
                : "模拟超时：本次等待未能完成。"}
              本页仍显示你的答案；当前未判断对错。重新评阅仅进入等待演示，不会发送请求或自动返回判断。
            </p>
          )}
          {phase === "error" && (
            <p>
              系统失败示意：本页仍显示你的答案；当前未判断对错。重新评阅仅进入等待示意，需手动取消。
            </p>
          )}
          {phase === "clarification" && (
            <>
              <p>澄清状态演示，不改变 CD-1 / CD-2 / CD-3 的预期。</p>
              <blockquote>{clarificationQuestion}</blockquote>
              <div className={styles.evidence}>
                <button onClick={() => locate(editExample)}>
                  <span>对应原文：点击定位</span>
                  <q>{editExample}</q>
                </button>
              </div>
              <p>这里只展示澄清问题，未作实质或术语判断。</p>
            </>
          )}
          {phase === "uncertain" && (
            <>
              <p>暂不能确认状态演示，未调用模型。</p>
              <p>{uncertainReason}</p>
            </>
          )}
          {(phase === "paused" || phase === "finished") && (
            <p>
              原文仅在当前页保留，刷新或关闭后不会恢复。三天后自动接续是后续能力，本轮尚未实现。
            </p>
          )}
          <div className={styles.actions}>
            <button
              className={styles.primary}
              disabled={phase === "editing" && !draft.trim()}
              onClick={() => {
                if (result) {
                  if (index === 0) setPhase("finished");
                  else edit();
                } else if (phase === "waiting") setPhase("cancelled");
                else if (phase === "editing") setPhase("unreviewed");
                else if (
                  phase === "error" ||
                  phase === "cancelled" ||
                  phase === "timeout"
                )
                  setPhase("waiting");
                else if (phase === "paused") setPhase(previous);
                else if (phase === "finished") switchScenario(0);
                else edit();
              }}
            >
              {result
                ? result.action
                : phase === "waiting"
                  ? "取消本次评阅"
                  : phase === "editing"
                    ? "提交原文（预览不评阅）"
                    : phase === "error" ||
                        phase === "cancelled" ||
                        phase === "timeout"
                      ? "重新评阅（演示）"
                      : phase === "paused"
                        ? "继续本页练习"
                        : phase === "finished"
                          ? "重新查看示例"
                          : phase === "clarification"
                            ? "补充说明"
                            : phase === "uncertain"
                              ? "说明这一点"
                              : "继续作答"}
            </button>
            {phase !== "paused" && phase !== "finished" && (
              <button
                className={styles.secondary}
                onClick={() => {
                  setPrevious(phase === "waiting" ? "cancelled" : phase);
                  setPhase("paused");
                }}
              >
                暂停练习
              </button>
            )}
          </div>
        </section>
      </div>
      <footer className={styles.note}>
        内容仅保留在当前页内存，不代表已保存、长期掌握或已安排复习。
      </footer>
    </main>
  );
}
