"use client";
import { useState } from "react";
import {
  freshCorrection,
  latestCorrections,
  type CorrectionDraft,
} from "@/domain/corrections";
import type { FaultProgress } from "@/domain/fault-progress";
import styles from "./unit.module.css";

export function Correction({
  state,
  attemptId,
  onDraft,
  onSave,
}: {
  state: FaultProgress;
  attemptId: string;
  onDraft: (draft: CorrectionDraft) => void;
  onSave: () => void;
}) {
  const draft = state.correctionDrafts[attemptId] ?? freshCorrection();
  const latest = latestCorrections(state).find(
    (c) => c.attemptId === attemptId,
  );
  const [open, setOpen] = useState(!!state.correctionDrafts[attemptId]);
  return (
    <section className={styles.selfCheck} aria-label="我的自查订正">
      {latest && (
        <div role="status">
          <strong>
            自查已记录 ·{" "}
            {latest.revisit ? "已加入复习重点" : "暂不放入复习重点"}
          </strong>
          {latest.note && (
            <p className={styles.selfText}>我的疑惑：{latest.note}</p>
          )}
          {latest.answer && (
            <p className={styles.selfText}>修正后的表达：{latest.answer}</p>
          )}
        </div>
      )}
      <details open={open} onToggle={(e) => setOpen(e.currentTarget.open)}>
        <summary>{latest ? "继续补充自查" : "记下这次自查（可选）"}</summary>
        <p className={styles.muted}>
          对照参考，记下疑惑或重新组织表达。原答会保留；自查不会变成评分或掌握判断。
        </p>
        <label className={styles.answerLabel} htmlFor="correction-note">
          哪里没想清（选填）
        </label>
        <textarea
          id="correction-note"
          rows={2}
          maxLength={2000}
          value={draft.note}
          onChange={(e) => onDraft({ ...draft, note: e.target.value })}
        />
        <label className={styles.answerLabel} htmlFor="correction-answer">
          修正后的表达（选填）
        </label>
        <textarea
          id="correction-answer"
          rows={3}
          maxLength={8000}
          value={draft.answer}
          onChange={(e) => onDraft({ ...draft, answer: e.target.value })}
        />
        <label className={styles.selfChoice}>
          <input
            type="checkbox"
            checked={draft.revisit}
            onChange={(e) => onDraft({ ...draft, revisit: e.target.checked })}
          />
          放入我的复习重点
        </label>
        <button
          className={styles.secondary}
          disabled={!draft.note.trim() && !draft.answer.trim()}
          onClick={onSave}
        >
          保存自查订正
        </button>
        <p className={styles.muted}>两项至少填写一项，也可以直接继续练习。</p>
      </details>
    </section>
  );
}
