"use client";
import { useEffect, useState } from "react";
import type { ComponentTrialResponse } from "@/evaluation/rewrite-comparison/component-trial";
import type { ComponentPreview } from "@/evaluation/rewrite-comparison/component-preview";
import {
  componentPresentation,
  readWithdrawal,
  type Withdrawal,
  type WithdrawalKey,
} from "@/evaluation/rewrite-comparison/component-presentation";
import s from "./component.module.css";
const labels = {
  located: "定位到相关表达",
  not_located: "本次尚未定位",
  conflicting: "相反表达待核",
  needs_review: "依据待核",
};
type DisplayEntry = Omit<ComponentPreview, "pair" | "response"> & {
  inputLabel?: "personal_new";
  pair: { original: { text: string }; rewrite: { text: string } };
  response: Pick<ComponentTrialResponse, "original" | "rewrite"> | null;
};
export default function ComponentView({ entry }: { entry: DisplayEntry }) {
  const [decision, setDecision] = useState<Withdrawal | null>(null),
    [storageFailed, setStorageFailed] = useState(false);
  const storageKey = "lvzhen-synthetic-component-withdrawal:" + entry.resultKey;
  useEffect(() => {
    try {
      const saved = readWithdrawal(
        sessionStorage.getItem(storageKey),
        entry.resultKey,
      );
      if (!saved) {
        setDecision(null);
        setStorageFailed(true);
        return;
      }
      setDecision({
        resultKey: entry.resultKey,
        keys: [...new Set([...saved.keys, ...entry.initialWithdrawn])],
      });
    } catch {
      setDecision(null);
      setStorageFailed(true);
    }
  }, [storageKey, entry.resultKey, entry.initialWithdrawn]);
  function withdraw(key: WithdrawalKey) {
    if (!decision) return;
    const next = {
      resultKey: entry.resultKey,
      keys: [...new Set([...decision.keys, key])],
    };
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(next));
      setDecision(next);
    } catch {
      setDecision(null);
      setStorageFailed(true);
    }
  }
  const view = entry.response
    ? componentPresentation(entry.response, entry.resultKey, decision)
    : null;
  return (
    <>
      <p className={s.notice}>
        {entry.inputLabel === "personal_new"
          ? "本页展示本次新答的模型回执，已经开发者逐项审读。只核对2-3的两种证据，不评价其他采分项，不计分，也不表示整问已改正。撤回在当前标签会话中保留；两份新答与原始回执保留。"
          : "本页展示两份固定虚构答卷的真实模型回执，开发者已逐项审读。只核对2-3的两种证据，不评价其他采分项，不计分，也不表示整问已改正。撤回只在当前浏览器标签的会话中保留；原答、旧分及历史回执不变。"}
      </p>
      <div className={s.answers}>
        {(["original", "rewrite"] as const).map((side) => (
          <section className={s.card} key={side}>
            <h2>
              {entry.inputLabel === "personal_new"
                ? side === "original"
                  ? "本次新原答"
                  : "本次独立重答"
                : side === "original"
                  ? "虚构原答"
                  : "虚构独立重答"}
            </h2>
            <p>{entry.pair[side].text}</p>
          </section>
        ))}
      </div>
      <section className={s.boundary}>
        <h2>C · 题设事实边界</h2>
        <p>{entry.design.caseBoundary.statement}</p>
        <p>{entry.design.caseBoundary.feedback}</p>
      </section>
      <p className={s.meta}>开发者审读：{entry.reviewNote}</p>
      {!view ? (
        <p role="status" className={s.notice}>
          {entry.structureIssue
            ? "完整引文或版本校验未通过，本份模型反馈整体未采用；原答和历史回执仍可核对。"
            : storageFailed
              ? "撤回记录无法恢复，反馈暂不展示。原答与历史回执仍可核对。"
              : "正在恢复本页的撤回记录…"}
        </p>
      ) : (
        view.map((side) => (
          <section key={side.side} className={s.card}>
            <h2>{side.side === "original" ? "原答" : "重答"} · 证据核对</h2>
            {side.needs.map((row) => (
              <article
                className={s.item}
                key={row.key}
                data-feedback-item={row.key}
              >
                <h3>
                  {
                    entry.design.evidenceNeeds.find((n) => n.id === row.id)!
                      .title
                  }
                </h3>
                {row.content ? (
                  <div data-adopted="true">
                    <p className={s.tag}>
                      {labels[row.content.state]} · 模型反馈候选
                    </p>
                    {row.content.evidence.map((e, i) => (
                      <div key={i}>
                        <blockquote>{e.quote}</blockquote>
                        <p>{e.meaning}</p>
                      </div>
                    ))}
                    <p>{row.content.feedback}</p>
                    <button type="button" onClick={() => withdraw(row.key)}>
                      撤回此整项反馈
                    </button>
                  </div>
                ) : (
                  <p role="status">
                    本项未采用：状态、解释及引文含义已整项撤下。撤回不表示考生答错。
                  </p>
                )}
              </article>
            ))}
            <article
              className={s.item}
              data-feedback-item={`${side.side}:conditions`}
            >
              <h3>作答中的条件说明</h3>
              {side.conditions === null ? (
                <p role="status">条件说明反馈已整项撤下，题设边界仍保留。</p>
              ) : (
                <div data-adopted="true">
                  {side.conditions.length ? (
                    side.conditions.map((e, i) => (
                      <div key={i}>
                        <blockquote>{e.quote}</blockquote>
                        <p>{e.meaning}</p>
                      </div>
                    ))
                  ) : (
                    <p>本栏未单列条件引文；这不作为漏答。</p>
                  )}
                  <button
                    type="button"
                    onClick={() => withdraw(`${side.side}:conditions`)}
                  >
                    撤回此条件说明反馈
                  </button>
                </div>
              )}
            </article>
          </section>
        ))
      )}
      <details className={s.card} data-raw-history>
        <summary>核对原始模型回执（历史，不代表采用）</summary>
        <p>
          包括已撤回的内容，仅供追溯。请求ID {entry.responseId} ·{" "}
          {entry.receivedAt}
        </p>
        <pre className={s.raw}>{entry.rawModelOutput}</pre>
      </details>
    </>
  );
}
