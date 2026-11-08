import { studentAnswerReference } from "@/content/student-answer-reference";

/** Static reading copy only: does not alter question, answer key or learner data. */
export function AnswerReference({
  questionId,
  questionRevision,
  reference,
  className,
}: {
  questionId: string;
  questionRevision: string;
  reference: string;
  className?: string;
}) {
  const copy = studentAnswerReference({
    questionId,
    questionRevision,
    originalReference: reference,
  });
  if (!copy) return <p className={className}>{reference}</p>;
  return (
    <div data-student-answer-reference={copy.version}>
      {copy.paragraphs.map((text, i) => (
        <p className={className} key={i}>
          {text}
        </p>
      ))}
    </div>
  );
}
