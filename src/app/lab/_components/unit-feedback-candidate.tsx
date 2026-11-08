import type { UnitFeedbackView } from "../../../evaluation/unit-feedback";
import type { UnitFeedbackResult } from "../../../evaluation/unit-feedback-contract";
import type { UnitFeedbackLearningSummary } from "../../../evaluation/unit-feedback-reading";
import document from "./reading-document.module.css";
import reading from "./unit-feedback-reading.module.css";

const statusLabels = {
  covered: "反馈认可本项表达",
  partial: "本项只表达了一部分",
  missing: "反馈认为本项未表达",
  contradicted: "本项表达与要求相反",
  uncertain: "本项需要核对",
} as const;

const feedbackScopeNotice = "这里只核对本题要点，其他表述仍可能有误。";

/** Display only: caller supplies saved evidence and handles record confirmation. */
export function UnitFeedbackCandidate({
  view,
  source = "offline_test",
  purpose,
  pointReviews = [],
  documentFlow = false,
  savedNewAnswer = false,
  learningSummary,
  summaryPending = false,
}: {
  view: UnitFeedbackView;
  source?: UnitFeedbackResult["source"];
  purpose?: UnitFeedbackResult["purpose"];
  pointReviews?: UnitFeedbackResult["pointReviews"];
  documentFlow?: boolean;
  savedNewAnswer?: boolean;
  learningSummary?: UnitFeedbackLearningSummary | null;
  summaryPending?: boolean;
}) {
  const summary =
    learningSummary &&
    learningSummary.questionId === view.questionId &&
    learningSummary.questionRevision === view.questionRevision &&
    learningSummary.contentId === view.contentId &&
    learningSummary.taskId === view.taskId &&
    learningSummary.answerId === view.answerId
      ? learningSummary
      : null;
  const scopeNotice =
    view.status === "assessed" ? feedbackScopeNotice : view.notice;
  const evidence = (
    <>
      <h3 className={document.subheading}>{view.heading}</h3>
      <p className={document.paragraph}>
        {source === "offline_test"
          ? purpose === "synthetic_validation"
            ? "本页是离线合成反馈，没有调用真实模型；只验证原答、反馈与保存链，不表示模型理解或学习效果已验证。"
            : "本页是离线固定样例回放，尚未验证模型对这道题的真实理解。"
          : purpose === "synthetic_validation"
            ? savedNewAnswer
              ? "这是这份虚构新答保存的真实模型反馈；当前调用或回读状态见上方说明，不代表真人学习效果已验证。"
              : "这是虚构样例的真实模型反馈；同文回读已有结果，没有为这次作答新增模型调用。"
            : "这是保存的模型反馈，可以对照原文核查；不表示已经掌握。"}
      </p>
      <p className={document.paragraph}>{view.scoreNotice}</p>
      {!documentFlow && <p className={document.paragraph}>{scopeNotice}</p>}
      {view.points.map((point) => (
        <section className={document.feedbackPoint} key={point.id}>
          <h4 className={document.subheading}>
            {point.label}：
            {pointReviews.some(
              (p) => p.criterionId === point.id && p.state === "needs_review",
            )
              ? "本项标签待核"
              : statusLabels[point.status]}
          </h4>
          <p className={document.paragraph}>本项要求：{point.meaning}</p>
          {point.quotes.map((quote, index) => (
            <blockquote key={index} aria-label="本问连续原文证据">
              {quote}
            </blockquote>
          ))}
          {pointReviews
            .filter((p) => p.criterionId === point.id)
            .map((p) => (
              <p key={p.criterionId} className={document.note}>
                Codex独立审校补充（原模型未自行修正）：{p.note}
              </p>
            ))}
          {pointReviews.some(
            (p) => p.criterionId === point.id && p.state === "needs_review",
          ) ? (
            <details className={document.answerDetails}>
              <summary>原模型说明与标签（保留，待核）</summary>
              <p className={document.paragraph}>
                原模型标签：{statusLabels[point.status]}。
              </p>
              <p className={document.paragraph}>{point.explanation}</p>
            </details>
          ) : (
            <p className={document.paragraph}>{point.explanation}</p>
          )}
          <details className={document.answerDetails}>
            <summary>本项接受的表达与边界</summary>
            <p className={document.paragraph}>{point.acceptable}</p>
            <p className={document.paragraph}>{point.boundary}</p>
          </details>
        </section>
      ))}
      <section aria-label="需要补充或核对的地方">
        <h3 className={document.heading}>需要补充或核对的地方</h3>
        {source === "offline_test" || view.status !== "assessed" ? (
          <p className={document.paragraph}>
            这份反馈仍需核对，不据此判断本题是否答对。
          </p>
        ) : view.points.some((point) => point.status !== "covered") ||
          pointReviews.some((row) => row.state === "needs_review") ? (
          <ul className={document.points}>
            {view.points
              .filter(
                (point) =>
                  point.status !== "covered" ||
                  pointReviews.some(
                    (row) =>
                      row.criterionId === point.id &&
                      row.state === "needs_review",
                  ),
              )
              .map((point) => (
                <li key={point.id}>
                  {point.label}：
                  {pointReviews.some(
                    (row) =>
                      row.criterionId === point.id &&
                      row.state === "needs_review",
                  ) || point.status === "uncertain"
                    ? "请先核对该项的原文依据和说明。"
                    : "请结合题设补充或修改这一项的分析。"}
                </li>
              ))}
          </ul>
        ) : (
          <p className={document.paragraph}>
            这份反馈没有指出需要补充的要点，仍可用下一道题检验。
          </p>
        )}
      </section>
      {view.clarification && (
        <p className={document.paragraph}>需要核对：{view.clarification}</p>
      )}
      {view.substantiveIssue && (
        <p className={document.paragraph}>{view.substantiveIssue}</p>
      )}
      {view.terminologySuggestion && (
        <p className={document.paragraph}>{view.terminologySuggestion}</p>
      )}
    </>
  );
  const pointSummaries = documentFlow && view.points.length > 0 && (
    <ul className={reading.pointList} aria-label="这份原答的逐项反馈">
      {view.points.map((point) => {
        const held = pointReviews.some(
          (review) =>
            review.criterionId === point.id && review.state === "needs_review",
        );
        const pending =
          held || view.status !== "assessed" || point.status === "uncertain";
        const improvement = summary?.improvements.find(
          (item) => item.criterionId === point.id,
        );
        let cue =
          point.status === "covered"
            ? "可保留这一项表达；需要时展开原文核对。"
            : "对照本题参考核对这一项，再决定怎样修改。";
        let cueSource = "reference_check";
        if (pending) {
          cue = held
            ? "先核对本项原文与独立审校说明，再决定是否修改。"
            : "先展开原文依据核对这一项，再决定是否修改。";
          if (held) cueSource = "codex_independent";
        } else if (improvement) {
          if (
            improvement.source === "requirement" &&
            improvement.text === `核对“${point.label}”：${point.meaning}` &&
            point.meaning.length <= 140
          ) {
            cue = `核对要求：${point.meaning}`;
            cueSource = "requirement";
          } else if (improvement.text.length <= 160) {
            cue = improvement.text;
            cueSource = improvement.source;
          }
        }
        return (
          <li
            key={point.id}
            className={reading.pointRow}
            data-native-point-summary={point.id}
          >
            <div className={reading.pointHeading}>
              <h3>{point.label}</h3>
              <p className={reading.pointStatus} data-native-point-status>
                {held
                  ? "本项标签待核"
                  : view.status !== "assessed"
                    ? "本项需要核对"
                    : statusLabels[point.status]}
              </p>
            </div>
            <p className={reading.pointCue} data-source={cueSource}>
              {cueSource === "codex_independent" && (
                <span className={reading.independent}>Codex独立核对：</span>
              )}
              {cue}
            </p>
          </li>
        );
      })}
    </ul>
  );
  return (
    <article
      className={document.document}
      aria-label={
        source === "offline_test" ? "逐项反馈离线候选" : "逐项学习反馈"
      }
    >
      {!documentFlow && (
        <>
          <h2 className={document.heading}>{view.title}</h2>
          <p className={document.paragraph}>{view.facts}</p>
          <p className={document.paragraph}>{view.prompt}</p>
          <h3 className={document.subheading}>我的原答</h3>
          <blockquote className={document.original}>
            {view.originalText}
          </blockquote>
        </>
      )}
      {documentFlow ? (
        <>
          <section
            className={reading.summary}
            aria-label="本次反馈重点"
            data-native-feedback-summary
          >
            {(source === "offline_test" ||
              purpose === "synthetic_validation") && (
              <p className={document.note} data-native-feedback-source>
                {source === "offline_test" ? "离线样例" : "虚构答文反馈"}
              </p>
            )}
            <p className={document.paragraph}>{scopeNotice}</p>
            {summary ? (
              <>
                {(summary.judgmentSource === "codex_independent" ||
                  view.status !== "assessed" ||
                  !view.points.length) && (
                  <>
                    <p className={reading.judgment}>{summary.judgment}</p>
                    {summary.judgmentSource === "codex_independent" && (
                      <p className={document.note}>Codex独立核对</p>
                    )}
                  </>
                )}
                {pointSummaries}
                {summary.organizedAnswer?.source === "question_reference" && (
                  <>
                    <h3 className={reading.summaryHeading}>
                      {summary.organizedAnswer.label}
                    </h3>
                    <p
                      className={reading.reference}
                      data-source="question_reference"
                    >
                      {summary.organizedAnswer.text}
                    </p>
                  </>
                )}
              </>
            ) : (
              <>
                {pointSummaries}
                <p className={document.paragraph} role="status">
                  {summaryPending
                    ? "正在整理反馈…"
                    : "这份记录没有整理反馈，可展开核对逐项依据。"}
                </p>
              </>
            )}
          </section>
          <details className={reading.details} data-native-feedback-evidence>
            <summary>逐项依据与反馈说明</summary>
            {summary && (
              <>
                <p className={document.note}>
                  {summary.judgmentSource === "codex_independent"
                    ? "上方判断来自Codex独立核对，保存的原模型标签与说明见下方。"
                    : "上方判断归纳保存的反馈标签，修改建议取自本题原有要求或反馈说明。"}
                  {summary.organizedAnswer && "整理答法来自本题同版本参考。"}
                </p>
                {summary.judgmentSource !== "codex_independent" &&
                  view.status === "assessed" &&
                  !!view.points.length && (
                    <p className={reading.judgment}>{summary.judgment}</p>
                  )}
                {!!summary.improvements.length && (
                  <>
                    <h3 className={reading.summaryHeading}>建议修改</h3>
                    <ol className={reading.improvements}>
                      {summary.improvements.slice(0, 2).map((item, index) => (
                        <li
                          key={`${item.criterionId}-${index}`}
                          data-source={item.source}
                        >
                          {item.text}
                          {item.source === "codex_independent" &&
                            summary.judgmentSource !== "codex_independent" && (
                              <span className={reading.independent}>
                                （Codex独立核对）
                              </span>
                            )}
                        </li>
                      ))}
                    </ol>
                  </>
                )}
              </>
            )}
            {evidence}
          </details>
        </>
      ) : (
        evidence
      )}
    </article>
  );
}
