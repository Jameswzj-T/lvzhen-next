import { sameCaseQuestions } from "../content/practice-set";
import { isHistoricalPracticeQuestion } from "../content/practice-content-history";
import { freshDraft, type FaultProgress } from "./fault-progress";

/** Current questions and retained publications of the same case. Navigation
 * and fresh-case recommendations must use the same exposure identity. */
export function practiceReferenceQuestionIds(id: string) {
  const related = new Set(sameCaseQuestions(id).map((q) => q.id));
  // The new publication has the same cases and references. Reading an old
  // answer remains exposure, without transferring its draft or grading result.
  for (const questionId of [...related]) {
    const oldId = questionId.replace(/-v[23]$/, "");
    if (oldId !== questionId && isHistoricalPracticeQuestion(oldId))
      related.add(oldId);
  }
  return [...related];
}

export function hasSeenPracticeReference(p: FaultProgress, id: string) {
  const related = new Set(practiceReferenceQuestionIds(id));
  return (
    [...related].some((q) => p.drafts[q]?.referenceSeen) ||
    p.attempts.some((a) => related.has(a.exerciseId))
  );
}

/** Call when a reference is displayed. Opening a list does not expose all its answers. */
export function exposePracticeReference(
  p: FaultProgress,
  id: string,
): FaultProgress {
  const related = sameCaseQuestions(id);
  if (related.every((q) => p.drafts[q.id]?.referenceSeen)) return p;
  const drafts = { ...p.drafts };
  for (const q of related)
    drafts[q.id] = { ...(drafts[q.id] ?? freshDraft()), referenceSeen: true };
  return { ...p, drafts };
}
