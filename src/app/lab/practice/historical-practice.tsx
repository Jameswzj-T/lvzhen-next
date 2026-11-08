import {
  practiceHistoricalPacks,
  historicalPracticeQuestion,
  isHistoricalPracticeQuestion,
} from "@/content/practice-content-history";
import { currentPracticeId } from "@/content/practice-set";
import type { FaultProgress } from "@/domain/fault-progress";
import type { UnitExercise } from "@/content/fault-unit";
import d from "../_components/reading-document.module.css";

export function previousTemporalQuestion(state: FaultProgress, id: string) {
  const previous = id.replace(/-v[23]$/, "");
  return previous !== id &&
    isHistoricalPracticeQuestion(previous) &&
    (state.drafts[previous] ||
      state.attempts.some((a) => a.exerciseId === previous))
    ? previous
    : null;
}

function SavedQuestion({ question }: { question: UnitExercise }) {
  return (
    <>
      <p className={d.paragraph}>{question.facts}</p>
      <p className={d.paragraph}>{question.prompt}</p>
      {question.options && (
        <ul className={d.points}>
          {question.options.map((option) => (
            <li key={option.id}>
              {option.id}．{option.text}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

/** Shared IDs in the first two publications cannot identify an unsubmitted
 * draft's version. Show its exact text separately; never infer a binding.
 */
export function HistoricalPractice({
  state,
  disabled,
  onStart,
}: {
  state: FaultProgress;
  disabled: boolean;
  onStart: (id: string) => void;
}) {
  const id = state.exerciseId;
  const draft = state.drafts[id];
  const attempts = state.attempts.filter((a) => a.exerciseId === id);
  const pending = draft && !draft.submittedId && (draft.answer || draft.choice);
  const newId = currentPracticeId(id);
  const archives = practiceHistoricalPacks.filter((pack) =>
    historicalPracticeQuestion(id, pack.revision),
  );
  return (
    <section className={d.document} aria-label="旧题记录">
      <h2 className={d.heading}>旧题记录</h2>
      <p className={d.paragraph}>题目已更新，原来的记录仍在这里。</p>
      {disabled && <p role="status">原记录已保留；暂时无法保存新作答。</p>}
      <button
        className={d.nextAction}
        disabled={disabled}
        onClick={() => onStart(newId)}
      >
        {state.drafts[newId] ? "继续新版题目" : "开始新版题目"}
      </button>
      {pending && (
        <section className={d.section} aria-label="保留的旧草稿">
          <h3 className={d.subheading}>保留的草稿</h3>
          <p className={d.note}>
            {archives.length > 1
              ? "这份草稿没有记录对应哪次题目。原文已保留，不会自动放入新题。"
              : "这份旧题草稿的原文已保留，不会自动放入新题。"}
          </p>
          {draft.choice && <p>原选择：{draft.choice}</p>}
          {draft.answer && (
            <blockquote className={d.original}>{draft.answer}</blockquote>
          )}
        </section>
      )}
      {attempts.map((attempt, index) => {
        const question = historicalPracticeQuestion(id, attempt.revision)!;
        return (
          <section
            className={d.section}
            key={attempt.id}
            aria-label={`旧题原答 ${index + 1}`}
          >
            <h3 className={d.subheading}>已交原答 {index + 1}</h3>
            <SavedQuestion question={question} />
            {attempt.choice && <p>原选择：{attempt.choice}</p>}
            {attempt.answer && (
              <blockquote className={d.original}>{attempt.answer}</blockquote>
            )}
            <details className={d.answerDetails}>
              <summary>查看当时的参考答案</summary>
              <p className={d.paragraph}>{question.reference}</p>
            </details>
          </section>
        );
      })}
      <details className={d.answerDetails}>
        <summary>{archives.length === 2 ? "回看两次旧题" : "回看旧题"}</summary>
        {archives.map((pack, index) => (
          <section className={d.section} key={pack.revision}>
            <h3 className={d.subheading}>
              {index === 0 ? "最初题目" : "修订后的题目"}
            </h3>
            <SavedQuestion
              question={historicalPracticeQuestion(id, pack.revision)!}
            />
          </section>
        ))}
      </details>
    </section>
  );
}
