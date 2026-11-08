"use client";
import { useEffect, useMemo, useState } from "react";
import type { FaultProgress } from "@/domain/fault-progress";
import type { PracticeSubject } from "@/content/practice-set";
import {
  projectReviewSuggestions,
  type ReviewSuggestion,
} from "@/domain/review-suggestions";
import {
  readReviewChoices,
  writeReviewChoice,
  isReviewDeferred,
  reviewChoiceKey,
  type ReviewChoiceSnapshot,
} from "@/records/review-choice-preferences";
import d from "../_components/reading-document.module.css";

export function ReviewSuggestions({
  state,
  subject,
  ownerId,
  disabled,
}: {
  state: FaultProgress;
  subject: PracticeSubject;
  ownerId: string | null;
  disabled: boolean;
}) {
  const items = useMemo(
    () => projectReviewSuggestions(state, subject),
    [state, subject],
  );
  const [snapshot, setSnapshot] = useState<ReviewChoiceSnapshot | null>(null);
  const [issue, setIssue] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const key = reviewChoiceKey(ownerId),
    current = snapshot?.key === key ? snapshot : null;
  useEffect(() => {
    const load = () => {
      try {
        setSnapshot(readReviewChoices(window.localStorage, ownerId));
        setIssue(false);
      } catch {
        setSnapshot(null);
        setIssue(true);
      }
    };
    load();
    const changed = (event: StorageEvent) => {
      if (event.key === key || event.key === null) load();
    };
    window.addEventListener("storage", changed);
    return () => window.removeEventListener("storage", changed);
  }, [key, ownerId]);
  function choose(item: ReviewSuggestion, defer: boolean) {
    if (disabled || !current || issue) return;
    const present = projectReviewSuggestions(state, subject).find(
      (row) =>
        row.questionId === item.questionId &&
        row.evidenceKey === item.evidenceKey,
    );
    if (!present) return;
    try {
      const next = writeReviewChoice(
        window.localStorage,
        ownerId,
        current,
        present,
        defer,
        new Date().toISOString(),
      );
      setSnapshot(next);
      setIssue(false);
    } catch {
      setIssue(true);
    }
  }
  if (!items.length) return null;
  if (!current)
    return (
      <div className={d.document} data-review-suggestions-loading>
        <p className={d.note} role="status">
          {issue
            ? "本机复习选择暂时无法读取，未覆盖已有选择；请刷新后再试。"
            : "正在读取本机复习选择……"}
        </p>
      </div>
    );
  const deferred = items.filter(
    (item) => current && isReviewDeferred(current, item),
  );
  const active = items.filter(
    (item) => !current || !isReviewDeferred(current, item),
  );
  const renderItem = (item: ReviewSuggestion, held: boolean) => (
    <article
      key={item.questionId}
      data-review-suggestion={item.questionId}
      data-deferred={held}
    >
      <h4 className={d.subheading}>
        {item.topicTitle} · {item.title}
      </h4>
      <p className={d.paragraph} data-review-suggestion-reason>
        {item.reason}
      </p>
      <p className={d.paragraph} data-review-suggestion-latest>
        {item.phase === "new_evidence"
          ? "已有新作答，供你核对："
          : item.phase === "needs_check"
            ? "先核对这份记录："
            : "最近一次记录："}
        {item.latestNotice}
      </p>
      <details className={d.answerDetails}>
        <summary>查看这条建议的保存依据</summary>
        <p className={d.note}>
          来源作答保存于
          {new Date(item.sourceAt).toLocaleString("zh-CN", { hour12: false })}
        </p>
        <blockquote className={d.original}>{item.sourceText}</blockquote>
        {item.details.map((point) => (
          <div key={point.label} className={d.feedbackPoint}>
            <p className={d.paragraph}>
              保存反馈 · {point.label}：{point.explanation}
            </p>
            {point.quotes.map((quote, i) => (
              <blockquote key={i} className={d.original}>
                原答依据：{quote}
              </blockquote>
            ))}
          </div>
        ))}
      </details>
      <p className={d.paragraph}>
        {disabled ? (
          <button className={d.nextAction} disabled>
            回到题目
          </button>
        ) : (
          <a className={d.nextAction} href={item.href}>
            回到题目
          </a>
        )}{" "}
        <button
          type="button"
          className={d.nextAction}
          disabled={disabled || !current || issue}
          onClick={() => choose(item, !held)}
        >
          {held ? "放回待复习" : "先暂缓"}
        </button>
      </p>
    </article>
  );
  return (
    <div className={d.document} data-review-suggestions>
      <h3 className={d.subheading}>
        待复习，按你的需要选择 · {active.length}题
      </h3>
      <p className={d.note}>
        这些题可以再练一练，由你选择。重答后可以回来看看变化，也可以先暂缓。
      </p>
      <p className={d.note}>
        暂缓只保存在本机。这道题有新的作答或评阅时，会再次出现在这里。
      </p>
      {issue && (
        <p className={d.paragraph} role="status">
          暂缓选择暂时无法读取或保存，原答未改；请刷新后再试。
        </p>
      )}
      {!current && !issue && <p className={d.note}>正在读取本机复习选择……</p>}
      {(showAll ? active : active.slice(0, 5)).map((item) =>
        renderItem(item, false),
      )}
      {!showAll && active.length > 5 && (
        <button
          className={d.nextAction}
          type="button"
          onClick={() => setShowAll(true)}
        >
          再看其余{active.length - 5}题
        </button>
      )}
      {active.length === 0 && (
        <p className={d.paragraph}>这些建议已暂缓，需要时可从下方放回。</p>
      )}
      {deferred.length > 0 && (
        <details className={d.answerDetails} data-deferred-reviews>
          <summary>已暂缓 · {deferred.length}题</summary>
          {deferred.map((item) => renderItem(item, true))}
        </details>
      )}
    </div>
  );
}
