import type { FeedbackRetryView } from "@/domain/feedback-retry";
import type { LearningObservation } from "@/domain/learning-observation-schema";
import type { UnitAttempt } from "@/domain/fault-progress";
import { feedbackRetryPointReading } from "./feedback-retry-reading";
import d from "../_components/reading-document.module.css";
import r from "../_components/answer-rewrite.module.css";

const labels = {
  model_yes: "模型认可",
  model_no: "模型未认可",
  needs_review: "待核对",
  covered: "已表达",
  partial: "部分表达",
  missing: "尚未表达",
  contradicted: "明确相反",
  uncertain: "待核对",
};

function PointFeedback({
  feedback,
  attempt,
  pointId,
  title,
}: {
  feedback: LearningObservation;
  attempt: UnitAttempt;
  pointId: string;
  title: string;
}) {
  const reading = feedbackRetryPointReading(feedback, attempt, pointId);
  return (
    <div data-feedback-retry-point-side={title}>
      <h4 className={d.subheading}>{title}</h4>
      <p className={d.paragraph} data-feedback-retry-point-status>
        {reading?.label ?? "待核对"}。
        {reading?.explanation ??
          "暂时无法把这项反馈与该次原答对应，请先保留两次作答。"}
      </p>
      {!!reading?.quotes.length && (
        <details className={d.answerDetails}>
          <summary>查看这次作答的原文依据</summary>
          {reading.quotes.map((quote, index) => (
            <blockquote className={d.original} key={index}>
              {quote}
            </blockquote>
          ))}
        </details>
      )}
    </div>
  );
}

function SavedFeedback({ feedback }: { feedback: LearningObservation }) {
  return (
    <>
      {feedback.source === "offline_test" && (
        <p className={d.paragraph}>离线合成回放反馈，不能据此判断是否改正。</p>
      )}
      <ul className={d.points}>
        {feedback.points.map((point) => (
          <li key={point.id}>
            <strong>{point.requirement}</strong>
            <p>
              {point.status === "needs_review"
                ? "待核对"
                : labels[point.nativeStatus ?? point.status]}
              。{point.reviewNote ?? point.explanation}
            </p>
            {point.reviewNote && point.explanation && (
              <details className={d.answerDetails}>
                <summary>原模型说明（保留原文）</summary>
                <p className={d.paragraph}>{point.explanation}</p>
              </details>
            )}
            {!!point.quotes.length && (
              <blockquote className={d.original}>
                {point.quotes.join("\n")}
              </blockquote>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export function FeedbackRetryPanel({
  view,
  storageIssue,
  saveLabel,
}: {
  view: FeedbackRetryView;
  storageIssue: boolean;
  saveLabel: string;
}) {
  const blocked = !!view.blockedReason;
  return (
    <section
      className={`${d.document} ${d.compact}`}
      aria-label={view.current ? "原答与重答" : "按反馈重答"}
      data-feedback-retry={view.status}
    >
      <h2 className={d.heading}>
        {view.current ? "原答与重答" : "这次重答关注"}
      </h2>
      {view.feedback.source === "offline_test" && (
        <p className={d.paragraph}>离线样例，只供练习对照，不判断是否改正。</p>
      )}
      {!view.current ? (
        <>
          <p className={d.paragraph}>
            {blocked
              ? "这次重答的反馈来源已暂停，草稿保留；暂时不能保存为本次重答。"
              : "重写本题的完整答案，原答仍保留。"}
          </p>
          {!!view.focusPoints.length && (
            <ol className={d.points}>
              {view.focusPoints.slice(0, 2).map((point) => (
                <li key={point.id} data-feedback-retry-focus>
                  <strong>{point.requirement}</strong>
                  <PointFeedback
                    feedback={view.feedback}
                    attempt={view.original}
                    pointId={point.id}
                    title="原答反馈"
                  />
                  {point.meaning && point.meaning !== point.requirement && (
                    <details className={d.answerDetails}>
                      <summary>核对本题要求</summary>
                      <p className={d.paragraph}>{point.meaning}</p>
                    </details>
                  )}
                </li>
              ))}
            </ol>
          )}
          <details className={d.answerDetails}>
            <summary>回看原答</summary>
            <p className={d.original} data-feedback-retry-original>
              {view.original.answer}
            </p>
          </details>
        </>
      ) : (
        <>
          <p className={d.paragraph} role="status" data-feedback-retry-status>
            {storageIssue ? "重答尚未保存。" : "重答已保存。"}
            {view.status === "comparable" && view.comparison
              ? "可以对照两次反馈；一次认可不代表已经掌握。"
              : view.reusedFeedback
                ? "同文复用了原有反馈，没有新的评阅；是否改正待核。"
                : view.status === "incompatible"
                  ? "现有反馈无法与原答可靠比较；是否改正待核。"
                  : "尚无新的兼容反馈；是否改正待核。"}
          </p>
          {storageIssue && (
            <p className={d.paragraph}>保存状态：{saveLabel}。</p>
          )}
          <div className={r.comparison} data-feedback-retry-answers>
            <div>
              <h3 className={d.subheading}>原答</h3>
              <p className={r.text} data-feedback-retry-original>
                {view.original.answer}
              </p>
            </div>
            <div>
              <h3 className={d.subheading}>这次重答</h3>
              <p className={r.text} data-feedback-retry-current>
                {view.current.answer}
              </p>
            </div>
          </div>
          {view.status === "comparable" && view.comparison && (
            <section
              aria-label="两次兼容反馈对照"
              data-feedback-retry-comparison
            >
              <h3 className={d.subheading}>两次反馈对照</h3>
              <ul className={d.points}>
                {view.comparison.points.map((point) => (
                  <li key={point.id}>
                    <strong>{point.requirement}</strong>
                    <div
                      className={r.comparison}
                      data-feedback-retry-point-comparison
                    >
                      <PointFeedback
                        feedback={view.feedback}
                        attempt={view.original}
                        pointId={point.id}
                        title="原答反馈"
                      />
                      {view.afterFeedback && view.current && (
                        <PointFeedback
                          feedback={view.afterFeedback}
                          attempt={view.current}
                          pointId={point.id}
                          title="重答反馈"
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {view.afterFeedback && view.status !== "comparable" && (
            <details className={d.answerDetails}>
              <summary>回看这次重答的现有反馈（待核）</summary>
              <SavedFeedback feedback={view.afterFeedback} />
            </details>
          )}
        </>
      )}
      <details className={d.answerDetails}>
        <summary>回看这次重答依据的反馈</summary>
        <SavedFeedback feedback={view.feedback} />
      </details>
    </section>
  );
}
