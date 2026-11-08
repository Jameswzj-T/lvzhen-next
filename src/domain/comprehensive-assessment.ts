import { assessmentPaper } from "../content/assessment-papers";
import { isComprehensiveG7Paper } from "../content/comprehensive-g7";
import { exerciseFor } from "../content/fault-catalog";
import {
  isPracticeLocation,
  practiceSubject,
  practiceSubjectInfo,
} from "../content/practice-set";
import type { FaultProgress } from "./fault-progress";

/** Exact question plus its own submitted run. The daily practice keeps its own draft. */
export function comprehensivePracticeHref(
  state: FaultProgress,
  runId: string,
  questionId: string,
): string | null {
  const run = state.assessments?.runs.find((r) => r.id === runId),
    paper = run && assessmentPaper(run.paperId),
    q = exerciseFor(questionId);
  if (
    !run?.finishedAt ||
    !paper ||
    !isComprehensiveG7Paper(paper) ||
    run.revision !== paper.revision ||
    !paper.questionIds.includes(questionId) ||
    !q ||
    !isPracticeLocation(questionId, q.kind)
  )
    return null;
  const href = practiceSubjectInfo(practiceSubject(questionId)).href;
  return `${href}${href.includes("?") ? "&" : "?"}question=${encodeURIComponent(questionId)}&fromRun=${encodeURIComponent(runId)}`;
}
