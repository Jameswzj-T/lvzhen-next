"use client";
import { useState } from "react";
import { freshCorrection } from "@/domain/corrections";
import {
  editAnswerRewrite,
  rewriteOriginal,
  saveAnswerRewrite,
  type RewriteTarget,
} from "@/domain/answer-rewrite";
import type { FaultProgress } from "@/domain/fault-progress";
import s from "./answer-rewrite.module.css";

export function AnswerRewrite({
  state,
  target,
  disabled,
  onChange,
  scope = "focused",
}: {
  state: FaultProgress;
  target: RewriteTarget;
  disabled: boolean;
  onChange: (change: (state: FaultProgress) => FaultProgress) => unknown;
  scope?: "focused" | "whole-question";
}) {
  const [open, setOpen] = useState(!!state.correctionDrafts[target.attemptId]);
  const original = rewriteOriginal(state, target);
  if (!original) return null;
  const draft = state.correctionDrafts[target.attemptId] ?? freshCorrection();
  const history = state.corrections
    .filter((c) => c.attemptId === target.attemptId && c.answer.trim())
    .sort(
      (a, b) =>
        b.submittedAt.localeCompare(a.submittedAt) || b.id.localeCompare(a.id),
    );
  const latest = history[0];
  return (
    <section className={s.panel} aria-label="局部重答与原答对照">
      <h3>再写一次，和原答对照</h3>
      <p>
        {scope === "whole-question"
          ? "完整回答这一小问，单独保存重答。这次重写只保存作答，不会自动评阅；原答仍保留。"
          : "选一处想改进的理由，单独保存重答。原答保留，重答尚未评阅。"}
      </p>
      {latest && (
        <div className={s.comparison} aria-label="原答与最新重答">
          <div>
            <h4>原答（保留）</h4>
            <p>{original.answer}</p>
          </div>
          <div>
            <h4>最新重答（尚未评阅）</h4>
            <p>{latest.answer}</p>
            {latest.note && <p>本次关注：{latest.note}</p>}
          </div>
        </div>
      )}
      {history.length > 1 && (
        <details>
          <summary>较早重答（{history.length - 1}）</summary>
          {history.slice(1).map((c) => (
            <div key={c.id}>
              <time>{c.submittedAt}</time>
              <p className={s.text}>{c.answer}</p>
              {c.note && <p>{c.note}</p>}
            </div>
          ))}
        </details>
      )}
      <details open={open} onToggle={(e) => setOpen(e.currentTarget.open)}>
        <summary className={s.rewriteAction}>
          {latest ? "再写一版" : "重答这一问"}
        </summary>
        <fieldset disabled={disabled} className={s.fields}>
          <label>
            这次要改哪一处（选填）
            <textarea
              rows={2}
              maxLength={2000}
              value={draft.note}
              onChange={(e) =>
                onChange((p) =>
                  editAnswerRewrite(p, target, {
                    ...draft,
                    note: e.target.value,
                  }),
                )
              }
            />
          </label>
          <label>
            我的重答
            <textarea
              rows={4}
              maxLength={8000}
              value={draft.answer}
              onChange={(e) =>
                onChange((p) =>
                  editAnswerRewrite(p, target, {
                    ...draft,
                    answer: e.target.value,
                  }),
                )
              }
            />
          </label>
          <label className={s.checkbox}>
            <input
              type="checkbox"
              checked={draft.revisit}
              onChange={(e) =>
                onChange((p) =>
                  editAnswerRewrite(p, target, {
                    ...draft,
                    revisit: e.target.checked,
                  }),
                )
              }
            />
            放入我的复习重点
          </label>
          <button
            type="button"
            disabled={!draft.answer.trim()}
            onClick={() =>
              onChange((p) =>
                saveAnswerRewrite(
                  p,
                  target,
                  crypto.randomUUID(),
                  new Date().toISOString(),
                ),
              )
            }
          >
            保存重答并对照
          </button>
        </fieldset>
        <p>
          {disabled
            ? "记录保存当前受阻，请先处理上方保存提示。"
            : "输入自动保留为草稿；保存后可与原答逐字对照。"}
        </p>
      </details>
    </section>
  );
}
