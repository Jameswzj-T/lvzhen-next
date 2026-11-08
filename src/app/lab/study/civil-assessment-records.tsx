"use client";
import { useMemo, useState } from "react";
import type { FaultProgress } from "@/domain/fault-progress";
import {
  projectCivilAssessmentRecords,
  type CivilAssessmentQuestionRecord,
} from "@/domain/civil-assessment-records";
import s from "./civil-assessment-records.module.css";

const statusText: Record<CivilAssessmentQuestionRecord["status"], string> = {
  correct: "选对了",
  incorrect: "选错了",
  unanswered: "未作答",
  saved: "原答已保存",
  reviewed: "本次要点已答到",
  needs_work: "有要点需补改",
  needs_check: "讲解还需核对",
  unavailable: "原答记录待核对",
};

export function CivilAssessmentRecords({
  state,
  disabled,
}: {
  state: FaultProgress;
  disabled: boolean;
}) {
  const [limit, setLimit] = useState(3);
  const records = useMemo(
    () => projectCivilAssessmentRecords(state, limit),
    [state, limit],
  );
  if (!records.totalRuns) return null;
  const action = (href: string | null, label: string) =>
    href && !disabled ? <a href={href}>{label}</a> : <span>{label}</span>;
  return (
    <section className={s.section} aria-label="民法综合练习记录">
      <div className={s.heading}>
        <h2>综合练习记录</h2>
        {action("/lab/assessment?subject=civil-law", "选择一套练习")}
      </div>
      {records.pendingRewrite && (
        <p
          className={s.rewrite}
          data-pending-assessment-rewrite={records.pendingRewrite.runId}
        >
          还有一份重答草稿：
          {action(
            records.pendingRewrite.href,
            `${records.pendingRewrite.paperTitle} · 第${records.pendingRewrite.questionNumber}题，接着写`,
          )}
        </p>
      )}
      <p className={s.note}>
        最近{records.runs.length}次，共{records.totalRuns}
        次。展开可回到当时的原答。
      </p>
      <ul className={s.runs}>
        {records.runs.map((run) => {
          const firstWrong = run.questions.find(
            (q) => q.status === "incorrect",
          );
          return (
            <li key={run.runId} data-study-assessment-run={run.runId}>
              <div className={s.runHeading}>
                <div>
                  <h3>{run.title}</h3>
                  <time dateTime={run.submittedAt}>
                    {new Date(run.submittedAt).toLocaleString("zh-CN", {
                      month: "numeric",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </time>
                </div>
                {action(run.href, "回看这次")}
              </div>
              <p className={s.result}>
                {run.mode === "objective"
                  ? `选对${run.correct}题，选错${run.wrong}题`
                  : `已答${run.answered}/${run.total}题，已保存${run.feedbackCount}份AI讲解`}
                {run.unanswered > 0 ? `，未答${run.unanswered}题` : ""}
                {run.unavailable > 0
                  ? `，${run.unavailable}题的记录需核对`
                  : ""}
                。{firstWrong && <> {action(firstWrong.href, "从错题看起")}</>}
              </p>
              <details>
                <summary>逐题看原答与讲解</summary>
                <ol className={s.questions}>
                  {run.questions.map((q) => (
                    <li
                      key={q.questionId}
                      data-study-assessment-question={q.questionId}
                    >
                      <div>
                        {action(q.href, `第${q.questionNumber}题 · ${q.title}`)}
                        {q.rewritePending && <small>重答草稿已保留</small>}
                      </div>
                      <span data-question-status={q.status}>
                        {statusText[q.status]}
                      </span>
                    </li>
                  ))}
                </ol>
              </details>
            </li>
          );
        })}
      </ul>
      {records.runs.length < records.totalRuns && (
        <button className={s.more} onClick={() => setLimit((n) => n + 5)}>
          再看5次较早记录
        </button>
      )}
    </section>
  );
}
