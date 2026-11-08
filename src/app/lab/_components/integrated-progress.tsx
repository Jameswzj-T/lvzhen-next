import type { IntegratedQuestionProgress } from "@/domain/integrated-feedback-progress";
import s from "./integrated-progress.module.css";

const workLabels = {
  unanswered: "本次尚未作答",
  draft: "草稿未提交",
  saved: "原答已保存",
  rewrite_draft: "原答已保存，重答草稿未提交",
  record_review: "原答关联需核对",
};
const feedbackLabels = {
  none: "尚无已存反馈",
  available: "已保存评阅反馈",
  needs_review: "反馈待核对",
  unavailable: "暂无可用评阅",
  sample: "仅有样例反馈",
};

export function IntegratedProgress({
  questions,
  disabled = false,
}: {
  questions: IntegratedQuestionProgress[];
  disabled?: boolean;
}) {
  return (
    <ol className={s.list} aria-label="综合练习各问进度">
      {questions.map((question) => (
        <li
          key={question.questionId}
          data-integrated-question={question.questionId}
        >
          <a
            href={disabled ? undefined : question.href}
            aria-disabled={disabled || undefined}
          >
            <strong>{question.title}</strong>
            <span data-integrated-work={question.work}>
              {workLabels[question.work]}
              {question.feedback && (
                <span data-integrated-feedback={question.feedback}>
                  {"；" + feedbackLabels[question.feedback]}
                </span>
              )}
              {question.earlierOriginalSaved && "；较早原答保留"}
              {question.savedRewrites > 0 &&
                `；另有${question.savedRewrites}份独立重答，本份反馈不代评`}
            </span>
            <span className={s.action}>回到这一问 →</span>
          </a>
        </li>
      ))}
    </ol>
  );
}
