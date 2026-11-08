import type { UnitExercise } from "@/content/fault-unit";
import { objectiveStudyAnalysis } from "@/content/objective-study-analysis";
import { studentAnswerReference } from "@/content/student-answer-reference";
import {
  answerLabel,
  correctChoices,
  isCorrectChoice,
  selectedChoices,
} from "@/domain/objective-answer";
import d from "./direct-answer-feedback.module.css";

/** Fixed, code-owned choice reading. No model call or learner-state update. */
export function ObjectiveAnswerAnalysis({
  question,
  questionRevision,
  choice,
}: {
  question: UnitExercise;
  questionRevision: string;
  choice: string;
}) {
  if (question.kind !== "objective" || !question.options) return null;
  const expected = correctChoices(question),
    selected = selectedChoices(choice);
  const copy =
    objectiveStudyAnalysis({
      questionId: question.id,
      questionRevision,
      originalReference: question.reference,
    }) ??
    studentAnswerReference({
      questionId: question.id,
      questionRevision,
      originalReference: question.reference,
    });
  const paragraphs = copy?.paragraphs ?? [question.reference];
  return (
    <div data-objective-answer-analysis={question.id}>
      <section aria-label="逐项解答">
        <h2 className={d.heading}>逐项解答</h2>
        <p className={d.paragraph}>
          本题应选 {answerLabel(expected)}。
          {!choice
            ? "本题未作答。"
            : isCorrectChoice(question, choice)
              ? "你选对了。"
              : "对照下面各项，看看哪些漏选或多选了。"}
        </p>
        <ol className={d.points}>
          {question.options.map((option) => (
            <li
              key={option.id}
              className={d.point}
              data-option-id={option.id}
              data-should-select={expected.includes(option.id)}
            >
              <p className={d.pointHeading}>
                <strong className={d.pointTitle}>
                  {option.id.toUpperCase()}项 ·{" "}
                  {expected.includes(option.id) ? "应选" : "不应选"}
                </strong>
                {selected.includes(option.id) && <span>你选了这一项</span>}
              </p>
              <p className={d.paragraph}>{option.explanation}</p>
            </li>
          ))}
        </ol>
      </section>
      <section aria-label="参考分析" data-objective-study-copy={copy?.version}>
        <h2 className={d.heading}>参考分析</h2>
        {paragraphs.map((text, i) => (
          <p key={i} className={d.paragraph}>
            {text}
          </p>
        ))}
      </section>
    </div>
  );
}
