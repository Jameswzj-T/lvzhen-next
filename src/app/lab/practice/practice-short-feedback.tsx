"use client";

import { useEffect, useState } from "react";
import type { ShortResult } from "@/evaluation/short-table/contract";
import { TableFeedback } from "../scoring/table/feedback";
import {
  boundReadingSupplement,
  practiceFeedbackReading,
  type IndependentPracticeSupplement,
} from "./practice-feedback-reading";
import d from "../_components/reading-document.module.css";

export function PracticeShortFeedback({
  result,
  supplement,
}: {
  result: ShortResult | null;
  supplement?: IndependentPracticeSupplement | null;
}) {
  const view = practiceFeedbackReading(result);
  const [answerDigest, setAnswerDigest] = useState<{
    answer: string;
    sha256: string;
  } | null>(null);
  useEffect(() => {
    let active = true;
    if (!result || !supplement) return;
    const subtle = globalThis.crypto?.subtle;
    if (!subtle) return;
    const answer = result.answer;
    void subtle
      .digest("SHA-256", new TextEncoder().encode(answer))
      .then((bytes) => {
        if (active)
          setAnswerDigest({
            answer,
            sha256: [...new Uint8Array(bytes)]
              .map((byte) => byte.toString(16).padStart(2, "0"))
              .join(""),
          });
      })
      .catch(() => {
        if (active) setAnswerDigest(null);
      });
    return () => {
      active = false;
    };
  }, [result, supplement]);
  const note = boundReadingSupplement(
    result,
    supplement,
    answerDigest && answerDigest.answer === result?.answer
      ? answerDigest.sha256
      : null,
  );
  return (
    <>
      <section aria-label="本次评阅" data-practice-reading>
        <h2 className={d.heading}>本次评阅</h2>
        {view.sourceText && <p className={d.paragraph}>{view.sourceText}</p>}
        <p className={d.paragraph} data-reading-verdict>
          <strong>{view.scoreText}</strong>，{view.outcomeText}
        </p>
        {!!view.acceptedTitles.length && (
          <p className={d.paragraph}>
            本次认可：{view.acceptedTitles.join("、")}。
          </p>
        )}
        {result?.state === "complete" &&
          !result.failure &&
          result.assessment && (
            <details className={d.answerDetails} aria-label="评阅依据">
              <summary>查看{view.rowCount || "逐"}项评阅依据</summary>
              <TableFeedback
                documentFlow
                assessment={result.assessment}
                questions={[
                  {
                    id: "1",
                    prompt: result.card.title,
                    answer: result.answer,
                    maximum: result.card.maximum,
                  },
                ]}
              />
            </details>
          )}
      </section>
      <section aria-label="需要改处">
        <h2 className={d.heading}>需要改处</h2>
        <p className={d.paragraph}>{view.needsCopy}</p>
        {[...view.missingRows, ...view.pendingRows].map((row) => (
          <section key={row.id}>
            <h3 className={d.subheading}>
              {row.title}
              {view.pendingRows.includes(row) ? " · 待核对" : " · 未获分"}
            </h3>
            <p className={d.paragraph}>{row.explanation}</p>
          </section>
        ))}
        {note && (
          <section aria-label="独立表达提醒">
            <h3 className={d.subheading}>{note.title}</h3>
            <p className={d.paragraph}>{note.text}</p>
            <p className={d.note}>{note.sourceLabel}</p>
          </section>
        )}
      </section>
    </>
  );
}
