import type {
  CivilAssessmentRecord,
  CivilAssessmentQuestionRecord,
} from "@/domain/civil-assessment-records";
import { practiceTopic } from "@/content/practice-set";
import s from "./civil-practice-review.module.css";

const labels: Record<CivilAssessmentQuestionRecord["status"], string> = {
  reviewed: "本题要点已答到",
  needs_work: "还有内容要补或改",
  saved: "还没有AI讲解",
  needs_check: "讲解尚未确定",
  unanswered: "这题还没答",
  unavailable: "暂时无法读取原答",
  correct: "选对了",
  incorrect: "选错了",
};

/** A view of this submission's saved feedback, without another model judgment. */
export function CivilPracticeReview({
  record,
  currentQuestion,
  disabled = false,
  onSelect,
}: {
  record: CivilAssessmentRecord | null;
  currentQuestion?: number;
  disabled?: boolean;
  onSelect?: (index: number) => void;
}) {
  if (!record || record.mode !== "subjective") return null;
  const count = (status: CivilAssessmentQuestionRecord["status"]) =>
    record.questions.filter((q) => q.status === status).length;
  const parts = [
    count("reviewed") ? `${count("reviewed")}题的主要内容已答到` : "",
    count("needs_work") ? `${count("needs_work")}题还有内容要补或改` : "",
    count("saved") ? `${count("saved")}题还没有AI讲解` : "",
    count("needs_check") ? `${count("needs_check")}题的讲解尚未确定` : "",
    count("unanswered") ? `${count("unanswered")}题未作答` : "",
    count("unavailable") ? `${count("unavailable")}题的原答暂时无法读取` : "",
  ].filter(Boolean);
  const firstGap = record.questions.find(
    (q) => q.status === "needs_work" && q.href,
  );
  return (
    <section
      className={s.card}
      aria-label="本次书面练习回顾"
      data-civil-review-run={record.runId}
    >
      <div className={s.heading}>
        <h2>这次练习</h2>
        <span>
          已答 {record.answered} / {record.total} 题
        </span>
      </div>
      <p className={s.summary}>{parts.join("，")}。</p>
      <nav aria-label="逐题回看本次原答与讲解">
        <ol className={s.questions}>
          {record.questions.map((q) => {
            const current = q.questionNumber === currentQuestion;
            const body = (
              <>
                <span className={s.number}>
                  {String(q.questionNumber).padStart(2, "0")}
                </span>
                <span className={s.subject}>
                  <strong>{q.title}</strong>
                  <small>{practiceTopic(q.questionId).title}</small>
                </span>
                <span className={s.status} data-status={q.status}>
                  {labels[q.status]}
                  {q.rewritePending && <small>重答写到一半</small>}
                </span>
              </>
            );
            return (
              <li
                key={q.questionId}
                data-current={current}
                data-question-status={q.status}
              >
                {onSelect ? (
                  <button
                    type="button"
                    disabled={disabled || !q.href}
                    aria-current={current ? "step" : undefined}
                    onClick={() => onSelect(q.questionNumber - 1)}
                  >
                    {body}
                  </button>
                ) : q.href && !disabled ? (
                  <a href={q.href} aria-current={current ? "step" : undefined}>
                    {body}
                  </a>
                ) : (
                  <div className={s.inactive}>{body}</div>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <p className={s.next}>
        {firstGap
          ? `可以先看第${firstGap.questionNumber}题，把讲解指出的内容补上，再换一道题练。`
          : count("saved")
            ? "选一道题看参考，也可以请AI讲解你的原答。"
            : count("needs_check") || count("unavailable")
              ? "先看已有讲解和参考答案，尚未确定的题保留原样。"
              : count("unanswered")
                ? "先看这次的原答与参考，未答的题可以再试一次。"
                : "这次主要内容已经写到了，可以换一组案例继续练。"}
      </p>
    </section>
  );
}
