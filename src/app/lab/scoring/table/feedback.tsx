import type { TableAssessment } from "@/evaluation/table-trial/contract";
import type { ExplanationReviewDelivery } from "@/evaluation/table-trial/reviewed-explanation-delivery";
import type { ReactNode } from "react";
import s from "./table.module.css";
import d from "../../_components/reading-document.module.css";
import { ReviewedExplanationCandidateView } from "./reviewed-explanation-candidate";
export function TableFeedback({
  questions,
  assessment,
  questionTools,
  documentFlow = false,
  resultId,
  explanationReview,
}: {
  questions: { id: string; prompt: string; answer: string; maximum: number }[];
  assessment: TableAssessment | null;
  questionTools?: (questionId: string) => ReactNode;
  documentFlow?: boolean;
  resultId?: string;
  explanationReview?: ExplanationReviewDelivery;
}) {
  return (
    <section
      aria-label="逐问评阅结果"
      className={documentFlow ? undefined : `${d.document} ${d.compact}`}
    >
      {!assessment?.valid && (
        <p className={s.notice}>尚未取得完整评阅，暂不计分。</p>
      )}
      {!documentFlow && !!assessment?.score?.pending && (
        <p className={s.notice}>
          已确认 {assessment.score.confirmed} 分，另有{" "}
          {assessment.score.pending} 分待核对。待核对不等于答错。
        </p>
      )}
      {questions.map((q) => {
        const rows =
          assessment?.items.filter((r) => r.questionId === q.id) ?? [];
        const empty = !q.answer.trim();
        const pending =
          !assessment?.valid ||
          !rows.length ||
          rows.some((r) => r.earned === null);
        const score = rows.reduce((sum, r) => sum + (r.earned ?? 0), 0);
        const outcome = empty
          ? "未作答"
          : pending
            ? "待核对"
            : `${score} / ${q.maximum} 分`;
        return (
          <article
            className={d.section}
            key={q.id}
            id={documentFlow ? undefined : `result-${q.id}`}
          >
            {documentFlow ? (
              <p>本问已保存的评分：{outcome}。</p>
            ) : (
              <>
                <div className={s.questionHead}>
                  <span>第 {q.id} 问</span>
                  <b>{outcome}</b>
                </div>
                <h2 className={d.heading}>{q.prompt}</h2>
                <h3 className={d.subheading}>我的原答</h3>
                <p className={d.original}>
                  {empty ? "本问未作答。" : q.answer}
                </p>
                <h3 className={d.subheading}>对原答的判断与分析</h3>
              </>
            )}
            {rows.map((r) => {
              const review =
                explanationReview &&
                explanationReview.review.resultId === resultId &&
                explanationReview.review.questionId === q.id &&
                explanationReview.review.criterionId === r.id &&
                explanationReview.review.originalAnswer === q.answer &&
                explanationReview.review.originalExplanation ===
                  r.explanation &&
                r.label === "否" &&
                r.earned === 0
                  ? explanationReview
                  : undefined;
              const label =
                r.earned === null
                  ? "待核对"
                  : r.label === "否"
                    ? "未命中"
                    : "已命中";
              const points =
                r.earned === null ? "" : ` · ${r.earned}/${r.points}`;
              const evidence = (
                <>
                  {(documentFlow || !r.sourceValid) && (
                    <p className={d.note}>
                      {r.sourceValid ? "原答依据" : "模型所引文字（待核对）"}
                    </p>
                  )}
                  {r.quotes.length ? (
                    (r.sourceValid ? r.sourceQuotes : r.quotes).map(
                      (quote, i) => (
                        <blockquote key={i}>
                          {!documentFlow && r.sourceValid && (
                            <span className={d.note}>原答：</span>
                          )}
                          {quote}
                        </blockquote>
                      ),
                    )
                  ) : (
                    <p className={documentFlow ? undefined : d.note}>
                      {!documentFlow && r.sourceValid && "原答依据："}
                      模型未找到对应表达。
                    </p>
                  )}
                  <p className={d.note}>本项要求：{r.requirement}</p>
                </>
              );
              const content = (
                <>
                  {review ? (
                    <>
                      {review.state === "verified" ? (
                        <ReviewedExplanationCandidateView
                          review={review.review}
                          embedded
                        />
                      ) : (
                        <>
                          <p role="status">
                            本条旧解释已发现错误，暂不采用。独立审校依据暂不能核对，请以题目参考为准。
                          </p>
                          <p className={d.note}>
                            原“否”标签、0/1分和整卷8/20分保留。
                          </p>
                          <details>
                            <summary>
                              原模型解释（已确认错误，保留备查）
                            </summary>
                            <p>{r.explanation}</p>
                          </details>
                        </>
                      )}
                    </>
                  ) : (
                    <p>{r.explanation}</p>
                  )}
                  {!r.sourceValid && (
                    <p className={s.notice}>
                      引文无法在本问原答中核对，暂不按这次判断计分。
                    </p>
                  )}
                  {documentFlow && r.sourceValid ? (
                    <details>
                      <summary>查看这项要求与原答依据</summary>
                      {evidence}
                    </details>
                  ) : (
                    <div>{evidence}</div>
                  )}
                </>
              );
              const PointHeading = documentFlow ? "h3" : "h4";
              return (
                <section key={r.id} className={d.feedbackPoint}>
                  <PointHeading className={d.subheading}>
                    {r.title}
                    <span className={d.pointState}>
                      {label}
                      {points}
                    </span>
                  </PointHeading>
                  {content}
                </section>
              );
            })}
            {questionTools?.(q.id)}
          </article>
        );
      })}
      <p className={d.note}>
        按对应小问原答评阅。本次只检查列出的采分项，不代表全卷纠错或正式考试得分。
      </p>
    </section>
  );
}
