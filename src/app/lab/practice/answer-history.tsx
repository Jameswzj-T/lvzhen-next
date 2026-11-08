"use client";

import React, { useId, useState } from "react";
import type { practiceAnswerHistory } from "@/domain/practice";
import type { FaultProgress } from "@/domain/fault-progress";
import { savedExerciseFor } from "../../../content/fault-catalog";
import { LEARNING_EXAMPLE_SOURCE } from "../../../domain/learning-example-source";
import type { BankScoringSummary } from "@/evaluation/scoring-trial-contract";
import type { ShortSummary } from "@/evaluation/short-table/contract";
import { submittedFeedbackSchema } from "../../../domain/submitted-feedback";
import { teacherLearningAdvice } from "../../../domain/teacher-learning-advice";
import { currentQuestionTeacher } from "../../../domain/current-question-teacher";
import type { TeacherFeedbackView } from "../../../domain/teacher-feedback-contract";
import type { UnitFeedbackResult } from "../../../evaluation/unit-feedback-contract";
import { TeacherAnswerFeedback } from "../_components/teacher-answer-feedback";
import { DirectAnswerFeedback } from "../_components/direct-answer-feedback";
import { ShortAnswerScoring } from "./short-answer-scoring";
import { AnswerScoring } from "./answer-scoring";
import s from "./practice.module.css";

type History = ReturnType<typeof practiceAnswerHistory>;
const submittedTime = (at: string) =>
  new Date(at).toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

export function AnswerHistory({
  history,
  corrections = [],
  submittedFeedback = [],
  currentAttemptId,
  scoringCard,
  shortScoringCard,
}: {
  history: History;
  corrections?: FaultProgress["corrections"];
  submittedFeedback?: FaultProgress["submittedFeedback"];
  currentAttemptId?: string;
  scoringCard?: BankScoringSummary;
  shortScoringCard?: ShortSummary;
}) {
  const previous = history.filter(
    ({ attempt }) => attempt.id !== currentAttemptId,
  );
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectId = useId();
  const selected =
    previous.find(({ attempt }) => attempt.id === selectedId) ?? previous[0];
  if (!selected) return null;
  const { attempt, number } = selected;
  const savedRewrites = corrections
    .filter((c) => c.attemptId === attempt.id && c.answer.trim())
    .sort(
      (a, b) =>
        b.submittedAt.localeCompare(a.submittedAt) || b.id.localeCompare(a.id),
    );
  const canReadScoring =
    scoringCard?.id === attempt.exerciseId &&
    scoringCard.exerciseRevision === attempt.revision;
  const savedFeedback = submittedFeedback.findLast(
    (row) => row.attemptId === attempt.id,
  );
  let teacherFeedback: TeacherFeedbackView | null = null;
  let directFeedback: UnitFeedbackResult | null = null;
  let feedbackReadIssue = false;
  if (savedFeedback) {
    try {
      const saved = submittedFeedbackSchema.parse(savedFeedback);
      // The saved envelope validates its own result; also bind it to the exact
      // selected historical original. Never borrow the current answer/reference.
      if (
        saved.questionId !== attempt.exerciseId ||
        saved.revision !== attempt.revision ||
        saved.answer !== attempt.answer ||
        saved.choice !== attempt.choice
      )
        throw Error("history-feedback-original-binding");
      if (saved.result.sourceTeacher) {
        teacherFeedback = currentQuestionTeacher(saved.result, attempt);
        teacherFeedback.learningAdvice = teacherLearningAdvice(
          teacherFeedback,
          {
            attempts: history.map((entry) => entry.attempt),
            submittedFeedback,
          },
        );
      } else {
        if (
          attempt.choice ||
          saved.result.source !== "real_provider" ||
          saved.result.purpose !== "practice"
        )
          throw Error("history-feedback-receipt-required");
        directFeedback = saved.result;
      }
    } catch {
      feedbackReadIssue = true;
    }
  }
  // The selected historical event owns its reference. A newer/current page
  // must never supply a reference for a different question or revision.
  const historicalQuestion = directFeedback
    ? savedExerciseFor(attempt.exerciseId, attempt.revision)
    : null;
  const historicalReference =
    directFeedback &&
    historicalQuestion?.kind === "subjective" &&
    historicalQuestion.facts === directFeedback.view.facts &&
    historicalQuestion.prompt === directFeedback.view.prompt
      ? historicalQuestion.reference
      : undefined;
  return (
    <details
      className={s.answerHistory}
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary>
        之前的作答 <span>{previous.length} 次</span>
      </summary>
      {open && (
        <div className={s.historyContent}>
          {previous.length > 1 ? (
            <div className={s.historyPicker}>
              <label htmlFor={selectId}>选择记录</label>
              <select
                id={selectId}
                aria-label="选择之前的作答"
                value={attempt.id}
                onChange={(event) => setSelectedId(event.target.value)}
              >
                {previous.map((entry) => (
                  <option key={entry.attempt.id} value={entry.attempt.id}>
                    第 {entry.number} 次 ·{" "}
                    {submittedTime(entry.attempt.submittedAt)}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <p className={s.historyTime}>
              第 {number} 次 ·{" "}
              <time dateTime={attempt.submittedAt}>
                {submittedTime(attempt.submittedAt)}
              </time>
            </p>
          )}
          <article key={attempt.id} aria-label={`第${number}次作答记录`}>
            <p
              className={s.historyOriginal}
              aria-label="这次保存的原答"
              tabIndex={0}
            >
              {attempt.answer}
            </p>
            {!!savedRewrites.length && (
              <details className={s.more} aria-label="这次作答的已存重答">
                <summary>这次作答的已存重答（{savedRewrites.length}）</summary>
                <p className={s.scoringNote}>
                  重答尚未评阅，保存不代表已经改正。
                </p>
                {savedRewrites.map((rewrite) => (
                  <section key={rewrite.id}>
                    <p className={s.historyTime}>
                      <time dateTime={rewrite.submittedAt}>
                        {submittedTime(rewrite.submittedAt)}
                      </time>
                    </p>
                    <p className={s.historyOriginal} aria-label="历史重答">
                      {rewrite.answer}
                    </p>
                    {rewrite.note && (
                      <p className={s.scoringNote}>本次关注：{rewrite.note}</p>
                    )}
                  </section>
                ))}
              </details>
            )}
            {attempt.hintUsed && (
              <p className={s.scoringNote}>这份作答使用过提示。</p>
            )}
            {attempt.learningExampleSource === LEARNING_EXAMPLE_SOURCE && (
              <p className={s.scoringNote} data-history-learning-example>
                这份答卷保存为参考后练习：作答前已看过本题示例。
              </p>
            )}
            {teacherFeedback || directFeedback ? (
              <section aria-label="这份历史原答的已保存反馈">
                <p className={s.scoringNote}>
                  这份原答的已保存反馈；回看不会重新发送或收费。
                </p>
                {teacherFeedback ? (
                  <TeacherAnswerFeedback view={teacherFeedback} />
                ) : (
                  <DirectAnswerFeedback
                    studentReading
                    result={directFeedback}
                    answer={attempt.answer}
                    reference={historicalReference}
                    status="ready"
                  />
                )}
              </section>
            ) : feedbackReadIssue ? (
              <p className={s.scoringNote}>
                这份原答的已存反馈与记录暂不能核对，先保留原文、待核。
              </p>
            ) : shortScoringCard?.id === attempt.exerciseId ? (
              <ShortAnswerScoring
                key={attempt.id}
                exerciseId={attempt.exerciseId}
                exerciseRevision={attempt.revision}
                answer={attempt.answer}
                referenceSeen={attempt.referenceSeenBeforeAnswer}
                lookupOnly
              />
            ) : canReadScoring ? (
              <AnswerScoring
                caseId={attempt.exerciseId}
                exerciseRevision={attempt.revision}
                answer={attempt.answer}
                referenceSeen={attempt.referenceSeenBeforeAnswer}
                lookupOnly
              />
            ) : (
              <p className={s.scoringNote}>
                {attempt.referenceSeenBeforeAnswer && "这是看过参考后的作答。"}
                这份原答暂无可读取的已存反馈，原文保留。
              </p>
            )}
          </article>
        </div>
      )}
    </details>
  );
}
