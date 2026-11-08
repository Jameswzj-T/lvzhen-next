"use client";

import React from "react";
import type { practiceAnswerHistory } from "../../../domain/practice";
import { answerLabel, selectedChoices } from "../../../domain/objective-answer";
import s from "./practice.module.css";

export function ObjectiveAnswerHistory({
  history,
  currentAttemptId,
}: {
  history: ReturnType<typeof practiceAnswerHistory>;
  currentAttemptId?: string;
}) {
  const previous = history.filter(
    ({ attempt }) => attempt.id !== currentAttemptId,
  );
  if (!previous.length) return null;
  return (
    <details className={s.answerHistory}>
      <summary>
        之前的作答 <span>{previous.length} 次</span>
      </summary>
      <div className={s.historyContent}>
        {previous.map(({ attempt, number }) => (
          <details
            key={attempt.id}
            className={s.more}
            aria-label={`第${number}次作答记录`}
          >
            <summary>
              第 {number} 次 ·{" "}
              <time dateTime={attempt.submittedAt}>
                {new Date(attempt.submittedAt).toLocaleString("zh-CN", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </time>
            </summary>
            <p
              className={s.historyOriginal}
              aria-label="这次保存的选择"
              tabIndex={0}
            >
              {attempt.choice
                ? `我选择了 ${answerLabel(selectedChoices(attempt.choice))}。`
                : "这次未记录选择。"}
            </p>
            {attempt.hintUsed && (
              <p className={s.scoringNote}>这份作答使用过提示。</p>
            )}
            {attempt.referenceSeenBeforeAnswer && (
              <p className={s.scoringNote}>这是看过参考后的作答。</p>
            )}
          </details>
        ))}
      </div>
    </details>
  );
}
