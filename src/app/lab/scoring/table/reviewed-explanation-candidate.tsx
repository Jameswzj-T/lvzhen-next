import React from "react";
import type { ReviewedExplanationCandidate } from "../../../../evaluation/table-trial/reviewed-explanation-candidate";
import d from "../../_components/reading-document.module.css";

// Read-only rendering. Embedded consumers already show the complete original
// answer and point heading, so they must not repeat them inside the review.
export function ReviewedExplanationCandidateView({
  review,
  embedded = false,
}: {
  review: ReviewedExplanationCandidate | null;
  embedded?: boolean;
}) {
  if (!review) return null;
  const Container = embedded ? "div" : "section";
  return (
    <Container
      className={embedded ? undefined : d.document}
      aria-label="第2问刑期范围独立审校"
    >
      {!embedded && (
        <>
          <h3 className={d.subheading}>刑期范围 · 独立审校</h3>
          <p className={d.note}>本问原答（保留原文）</p>
          <blockquote className={d.original} aria-label="本问原答">
            {review.originalAnswer}
          </blockquote>
        </>
      )}
      <p>这一条模型解释不采用。下面是Codex独立审校说明。</p>
      <p>{review.humanExplanation}</p>
      <p className={d.note}>
        原“否”标签、0/1分和整卷8/20分保留。本条由Codex独立复核题卡后补充，未经过专业人工签收；原模型未自行修正。
      </p>
      <a href={review.sourceUrl}>依据：刑法第69、70条及本题案情</a>
      <details>
        <summary>原模型解释（已确认错误，保留备查）</summary>
        <p>{review.originalExplanation}</p>
      </details>
    </Container>
  );
}
