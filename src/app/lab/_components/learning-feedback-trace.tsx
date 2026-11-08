import type { FaultProgress } from "@/domain/fault-progress";
import {
  feedbackForAttempt,
  compareLearningFeedback,
} from "@/domain/learning-observations";
import d from "./reading-document.module.css";

const statusText = {
  model_yes: "模型认可",
  model_no: "模型未认可",
  needs_review: "待核对",
  covered: "已表达",
  partial: "部分表达",
  missing: "尚未表达",
  contradicted: "明确相反",
  uncertain: "待核对",
};
const comparisonStatus = (status: keyof typeof statusText, held: boolean) =>
  held ? `待核（原标签：${statusText[status]}）` : statusText[status];
export function LearningFeedbackTrace({
  state,
  attemptId,
  comparisonOnly = false,
}: {
  state: FaultProgress;
  attemptId: string;
  comparisonOnly?: boolean;
}) {
  const feedback = feedbackForAttempt(state, attemptId),
    comparison = compareLearningFeedback(state, attemptId);
  const sampleComparison =
    comparison &&
    "sampleComparison" in comparison &&
    comparison.sampleComparison === true;
  const comparisonContent = comparison ? (
    <>
      <h3 className={d.heading}>与上一次作答比较</h3>
      <p className={d.note}>
        {sampleComparison
          ? comparison.reused
            ? "虚构样例同文回读，复用同一份保存反馈，不是一次新的模型判断。"
            : comparison.comparable
              ? "这里只比较同题、同版本的虚构样例反馈变化；不判断真实作答是否改正或掌握。"
              : "样例反馈的版本或证据不齐，仍待核对，不作真实作答的改正判断。"
          : comparison.reused
            ? "原文复用了同一份保存评阅，不是一次新的模型判断。"
            : comparison.comparable
              ? "这里只比较同题、同版本的模型反馈变化，不代表已经掌握。"
              : "两次反馈的版本或证据不齐，暂不作改正判断。"}
      </p>
      <ul className={d.points}>
        {comparison.points.map((p) => (
          <li key={p.id}>
            <strong>
              {p.id} · {p.requirement}
            </strong>
            <p>
              {comparisonStatus(
                p.before,
                "beforeNeedsReview" in p && p.beforeNeedsReview === true,
              )}{" "}
              →{" "}
              {comparisonStatus(
                p.after,
                "afterNeedsReview" in p && p.afterNeedsReview === true,
              )}
              。
              {p.state === "model_now_accepts"
                ? sampleComparison
                  ? "后一份虚构样例反馈认可这一项，只表示样例判定变化。"
                  : "本次模型认可了这一项，仍需用后续练习检验。"
                : p.state === "unknown"
                  ? sampleComparison
                    ? "样例中此项仍待核对，不能据此判断改正。"
                    : "当前不能确定是否改正。"
                  : p.state === "model_no_longer_accepts"
                    ? sampleComparison
                      ? "后一份虚构样例反馈未认可这一项，请对照两份样例原文和边界。"
                      : "本次模型未再认可这一项，请对照两次原答和依据。"
                    : p.state === "changed_opinion"
                      ? sampleComparison
                        ? "两份虚构样例对表达的反馈不同，请对照各自原文和边界。"
                        : "本次反馈对表达的判断发生变化，请对照具体不足与依据。"
                      : sampleComparison
                        ? "两份虚构样例的反馈标签未改变。"
                        : "模型标签未改变。"}
            </p>
          </li>
        ))}
      </ul>
      <details className={d.answerDetails}>
        <summary>回看两次原答（保留原文）</summary>
        <h4>上一次原答</h4>
        <p className={d.original}>{comparison.original.answer}</p>
        <h4>本次原答</h4>
        <p className={d.original}>{comparison.current.answer}</p>
      </details>
    </>
  ) : null;
  if (comparisonOnly)
    return comparisonContent ? (
      <details className={d.answerDetails} aria-label="与上次比较">
        <summary>与上次比较</summary>
        {comparisonContent}
      </details>
    ) : null;
  if (!feedback)
    return (
      <p className={d.note}>
        作答记录已保留，尚未保存这份原答的评阅证据；不能据此判断已改正。
      </p>
    );
  return (
    <section
      className={`${d.document} ${d.section}`}
      aria-label="已保存的学习反馈"
    >
      <h2 className={d.heading}>已保存的学习反馈</h2>
      <p className={d.paragraph}>
        {feedback.source === "offline_test"
          ? feedback.protocol === "unit-feedback-v1"
            ? "离线合成回放反馈，仍待核对，不用于判断真实学习表现。"
            : "隔离回放证据，不用于判断真实学习表现。"
          : feedback.state === "unavailable"
            ? feedback.protocol === "unit-feedback-v1"
              ? "评阅尚未完成，原答已保留，反馈仍待核对，没有记为答错。"
              : "评阅未完成的状态已保留，没有记为答错。"
            : `这份原答的${feedback.points.length}项反馈和原文证据已进入学习记录，可在下次接着回顾。`}
      </p>
      {feedback.unitResult && (
        <p className={d.note}>
          {feedback.source === "offline_test"
            ? "此为离线合成回放；原任务和原作答事件保留，没有发起模型请求，也不生成总分。"
            : feedback.unitResult.purpose === "synthetic_validation"
              ? feedback.unitResult.view.answerId === attemptId
                ? "这份虚构新答的真实模型回执已保存并绑定原答事件；回读不新增调用，不判断真实用户弱项或掌握。"
                : "虚构样例同文回读：保留已有回执的原任务、原作答事件及来源，不是对当前作答的新模型请求，不判断真实用户弱项或掌握。"
              : feedback.unitResult.view.answerId !== attemptId
                ? "这份原答同文复用了既有回执，保留原任务与原作答事件，不是一次新的模型判断。"
                : "这里只记录本问逐项反馈，不生成总分，一次认可不代表已经掌握。"}
        </p>
      )}
      {feedback.points.some((p) => p.status === "needs_review") && (
        <p className={d.note}>含待核项目，不据此宣布掌握。</p>
      )}
      {!!feedback.points.length && (
        <details className={d.answerDetails}>
          <summary>回看保存的逐项依据</summary>
          <ul className={d.points}>
            {feedback.points.map((p) => (
              <li key={p.id}>
                <strong>
                  {p.id} · {p.requirement}
                </strong>
                <p>
                  {feedback.protocol === "unit-feedback-v1" && p.nativeStatus
                    ? p.status === "needs_review"
                      ? `待核（${feedback.source === "offline_test" ? "回放标签" : "原模型"}：${statusText[p.nativeStatus]}）`
                      : feedback.unitResult?.purpose === "synthetic_validation"
                        ? `样例反馈：${statusText[p.nativeStatus]}`
                        : statusText[p.nativeStatus]
                    : statusText[p.status]}
                  。
                  {p.status === "needs_review" && p.reviewNote
                    ? null
                    : p.explanation}
                </p>
                {feedback.protocol === "unit-feedback-v1" && p.nativeStatus && (
                  <>
                    <p>本项要求：{p.meaning}</p>
                    <p>等义表达：{p.acceptable}</p>
                    <p>必答边界：{p.boundary}</p>
                  </>
                )}
                {!!p.quotes.length && (
                  <blockquote className={d.original}>
                    {p.quotes.join("\n")}
                  </blockquote>
                )}
                {p.reviewNote && <p className={d.note}>{p.reviewNote}</p>}
                {p.status === "needs_review" && p.reviewNote && (
                  <details className={d.answerDetails}>
                    <summary>保存的原模型说明（保留，待核）</summary>
                    <p>{p.explanation}</p>
                  </details>
                )}
              </li>
            ))}
          </ul>
        </details>
      )}
      {comparisonContent}
    </section>
  );
}
