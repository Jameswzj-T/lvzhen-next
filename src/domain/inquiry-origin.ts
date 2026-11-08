import { assessmentPaper } from "../content/assessment-papers";
import type { FaultProgress } from "./fault-progress";

// Only an explicit run in this learner's records can identify an original
// question. The active/latest run is never a substitute for missing context.
export function inquiryAssessmentOrigin(
  state: FaultProgress,
  questionId: string,
  originRunId?: string,
): { runId: string; cursor: number } | null {
  if (!originRunId || originRunId.length > 100) return null;
  const run = state.assessments?.runs.find((r) => r.id === originRunId);
  const paper = run && assessmentPaper(run.paperId);
  if (!run || !paper || run.revision !== paper.revision) return null;
  const cursor = paper.questionIds.indexOf(questionId);
  return cursor < 0 ? null : { runId: run.id, cursor };
}
