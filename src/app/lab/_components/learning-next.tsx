import type { LearningNext as Next } from "@/domain/learning-next";
import { practiceSubject, practiceSubjectInfo } from "@/content/practice-set";
import d from "./reading-document.module.css";

export function LearningNext({
  recommendation,
  disabled,
  onContinue,
}: {
  recommendation: Next | null;
  disabled: boolean;
  onContinue: (id: string) => void;
}) {
  if (!recommendation) return null;
  const subjectLabel = practiceSubjectInfo(
    practiceSubject(recommendation.questionId),
  ).label;
  return (
    <section
      className={d.section}
      aria-label="根据学习记录的下一步"
      data-learning-next-action={recommendation.action}
    >
      <h2 className={d.heading}>{subjectLabel} · 下一步</h2>
      <p className={d.paragraph}>
        {recommendation.topicTitle} · {recommendation.title}
      </p>
      <p className={d.paragraph} data-learning-next-reason>
        {recommendation.evidence
          ? recommendation.reason
          : recommendation.basis === "model_feedback"
            ? recommendation.action === "feedback_retry"
              ? "本问已有保存反馈，可以按这次反馈重答完整小问；原答保留。"
              : recommendation.action === "continue" &&
                  recommendation.feedbackRetrySource
                ? "现有草稿保留，接着按保存反馈重答完整小问。"
                : "本问已有保存反馈，可以回看作答与依据。"
            : recommendation.basis === "pending"
              ? "现有作答的判断仍待核，可以回看保存的作答与依据。"
              : recommendation.reason}
      </p>
      <details className={d.sourceDetails} data-learning-next-details>
        <summary>看看为什么推荐这一步</summary>
        {recommendation.evidence && (
          <p
            className={d.note}
            data-learning-next-source={recommendation.evidence.kind}
          >
            记录来源：{recommendation.evidence.sourceText}
          </p>
        )}
        <p className={d.note}>
          {recommendation.evidence
            ? "依据这份保存反馈及实际作答来源提供选择；不记作永久掌握，也不强制按建议跳转。"
            : recommendation.basis === "model_feedback"
              ? "依据保存的模型反馈和当前题目归属安排，不是掌握结论。"
              : recommendation.basis === "pending"
                ? "判定不足时先核对，不按零分安排补救。"
                : "依据保存的作答与现有题目顺序安排。"}
        </p>
      </details>
      <button
        className={d.nextAction}
        type="button"
        disabled={disabled}
        onClick={() => {
          if (!disabled) onContinue(recommendation.id);
        }}
      >
        {recommendation.action === "feedback_retry"
          ? "按这次反馈完整重答"
          : recommendation.action === "continue" &&
              recommendation.feedbackRetrySource
            ? "接着草稿按这次反馈重答"
            : recommendation.action === "retry"
              ? "重练这道题"
              : recommendation.action === "review"
                ? "回看这份作答"
                : recommendation.action === "continue"
                  ? "继续已有草稿"
                  : "练习下一题"}
      </button>
      {recommendation.alternatives?.map((option) => (
        <p key={option.id} className={d.paragraph}>
          <button
            className={d.nextAction}
            type="button"
            disabled={disabled}
            onClick={() => {
              if (!disabled) onContinue(option.id);
            }}
          >
            {option.label}
          </button>
          {" · "}
          {option.reason}
        </p>
      ))}
    </section>
  );
}
