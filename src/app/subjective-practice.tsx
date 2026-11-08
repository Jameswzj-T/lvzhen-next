"use client";

import { useState } from "react";
import { subjectiveCase } from "@/content/subjective";
import {
  emptySubjectiveDraft,
  recordSubjectiveAttempt,
  type LearningState,
} from "@/domain/learning";
import styles from "./page.module.css";

export function SubjectivePractice({
  state,
  ready,
  onChange,
  onRecap,
}: {
  state: LearningState;
  ready: boolean;
  onChange: (change: (previous: LearningState) => LearningState) => void;
  onRecap: () => void;
}) {
  const [message, setMessage] = useState("");
  const draft = state.subjectiveDraft;
  const submitted = state.subjectiveAttempts.find(
    (attempt) => attempt.id === draft.submittedId,
  );

  function updateDraft(update: Partial<typeof draft>) {
    onChange((previous) => ({
      ...previous,
      subjectiveDraft: { ...previous.subjectiveDraft, ...update },
    }));
  }

  return (
    <div>
      <div className={styles.practiceHeader}>
        <div>
          <span className={styles.kicker}>原创案例 · 主观简答</span>
          <h2>从作出判断，到说清理由</h2>
        </div>
      </div>
      <p className={styles.caption}>{subjectiveCase.practiceNote}</p>
      <div className={styles.subjectiveFacts}>
        <h3>{subjectiveCase.title}</h3>
        <p>{subjectiveCase.facts}</p>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!draft.answer.trim()) {
            setMessage("先写下你的判断或疑问；空白不会记成答错。");
            return;
          }
          try {
            const next = recordSubjectiveAttempt(
              state,
              new Date().toISOString(),
              crypto.randomUUID(),
            );
            onChange(() => next);
            setMessage("");
          } catch {
            setMessage(
              "这次作答暂未保存，请保留文字后重试。系统没有将它记为答错。",
            );
          }
        }}
      >
        <p className={styles.subjectivePrompt}>{subjectiveCase.question}</p>
        <label className={styles.reasonLabel} htmlFor="subjective-answer">
          写下你的分析 <span>先用自己的话说明白，再练规范表达</span>
        </label>
        <textarea
          id="subjective-answer"
          rows={6}
          maxLength={8000}
          value={draft.answer}
          readOnly={!!submitted}
          disabled={!ready}
          placeholder="我的判断是……案情中……这说明……"
          onChange={(event) => {
            setMessage("");
            updateDraft({ answer: event.target.value });
          }}
        />
        {!submitted && (
          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.textButton}
              disabled={!ready}
              aria-expanded={draft.hintUsed}
              onClick={() => updateDraft({ hintUsed: true })}
            >
              给我一点提示
            </button>
            <button
              type="submit"
              className={styles.primaryButton}
              disabled={!ready}
            >
              保存并对照分析
            </button>
          </div>
        )}
        {draft.hintUsed && <p className={styles.hint}>{subjectiveCase.hint}</p>}
        {message && (
          <p className={styles.warning} role="alert">
            {message}
          </p>
        )}
      </form>
      {submitted && (
        <section className={styles.feedback} aria-label="主观简答参考分析">
          <p className={styles.resultLabel} role="status">
            原文已保留 · 尚未评阅
          </p>
          <h3>参考分析</h3>
          <p>{subjectiveCase.reference}</p>
          <small>依据：刑法第十四条；与第十五条中的过失相区别。</small>
          <div className={styles.subjectiveCriteria}>
            <h3>对照三个分析要点</h3>
            <p className={styles.caption}>
              以下是本题的学习参照，不表示系统已判断你写到了哪些要点。
            </p>
            {subjectiveCase.criteria.map((criterion, index) => (
              <article key={criterion.id}>
                <h4>
                  {index + 1}. {criterion.title}
                </h4>
                <p>{criterion.meaning}</p>
                <details>
                  <summary>换种说法，以及容易混淆的地方</summary>
                  <p>{criterion.equivalent}</p>
                  <p>{criterion.boundary}</p>
                </details>
              </article>
            ))}
          </div>
          <details className={styles.source}>
            <summary>看看怎样从日常语言走向规范表达</summary>
            <p>{subjectiveCase.colloquialExample}</p>
            <p>
              这段话虽没有逐字复述法条，也表达了对风险的认识、放任态度与故意判断。进一步使用“间接故意”这一术语，会更清楚。
            </p>
          </details>
          <p className={styles.caption}>
            本页尚未接入模型评阅，分析要点为原创教学设计，未换算考试分数。
            {submitted.hintUsed && "这次使用了提示。"}
            {submitted.referenceSeenBeforeAnswer &&
              "这次作答前已看过本题分析。"}
          </p>
          <div className={styles.formActions}>
            <button
              className={styles.textButton}
              onClick={() => {
                updateDraft({ ...emptySubjectiveDraft(), referenceSeen: true });
                setMessage("");
              }}
            >
              保留原答，再写一次
            </button>
            <button className={styles.primaryButton} onClick={onRecap}>
              回顾这段学习
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
