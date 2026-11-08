import type {
  CivilAssessmentRecord,
  CivilAssessmentQuestionRecord,
} from "@/domain/civil-assessment-records";
import { practiceSubject, practiceSubjectInfo } from "@/content/practice-set";
import s from "./civil-practice-review.module.css";

const labels: Record<CivilAssessmentQuestionRecord["status"], string> = {
  correct: "选对了",
  incorrect: "选错了",
  unanswered: "未作答",
  saved: "还没看AI讲解",
  reviewed: "本题要点已答到",
  needs_work: "有内容要补或改",
  needs_check: "讲解尚未确定",
  unavailable: "暂时无法读取",
};
export function ComprehensiveReview({
  record,
  currentQuestion,
  disabled,
  onSelect,
}: {
  record: CivilAssessmentRecord | null;
  currentQuestion: number;
  disabled: boolean;
  onSelect: (index: number) => void;
}) {
  if (!record) return null;
  const first = record.questions.find(
    (q) =>
      q.href &&
      (q.status === "incorrect" ||
        q.status === "needs_work" ||
        q.status === "unanswered"),
  );
  return (
    <section
      className={s.card}
      aria-label="本次综合训练回顾"
      data-g7-review={record.runId}
    >
      <div className={s.heading}>
        <h2>这次练习</h2>
        <span>
          已答 {record.answered}/{record.total} 题
        </span>
      </div>
      <p className={s.summary}>
        {record.mode === "objective"
          ? `答对${record.correct}题，答错${record.wrong}题，未答${record.unanswered}题。`
          : `${record.feedbackCount}题已有AI讲解，${record.unanswered}题未作答。点击题目看自己的原答和讲解。`}
      </p>
      <details open={record.total <= 8}>
        <summary>逐题回看 · {record.total}题</summary>
        <nav aria-label="逐题回看综合训练">
          <ol className={s.questions}>
            {record.questions.map((q) => (
              <li
                key={q.questionId}
                data-current={q.questionNumber === currentQuestion}
                data-question-status={q.status}
              >
                <button
                  disabled={disabled || !q.href}
                  aria-current={
                    q.questionNumber === currentQuestion ? "step" : undefined
                  }
                  onClick={() => onSelect(q.questionNumber - 1)}
                >
                  <span className={s.number}>
                    {String(q.questionNumber).padStart(2, "0")}
                  </span>
                  <span className={s.subject}>
                    <strong>{q.title}</strong>
                    <small>
                      {practiceSubjectInfo(practiceSubject(q.questionId)).label}
                    </small>
                  </span>
                  <span className={s.status} data-status={q.status}>
                    {labels[q.status]}
                    {q.rewritePending && <small>重答写到一半</small>}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </details>
      {first && (
        <p className={s.next}>
          <button
            disabled={disabled}
            onClick={() => onSelect(first.questionNumber - 1)}
          >
            先看第{first.questionNumber}题
          </button>
        </p>
      )}
    </section>
  );
}
