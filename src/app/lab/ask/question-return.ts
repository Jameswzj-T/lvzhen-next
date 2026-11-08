import { assessmentRunHref } from "../../../content/civil-integrated-practice";
import { assessmentPapers } from "../../../content/assessment-papers";
import { exerciseFor } from "../../../content/fault-catalog";
import {
  isPracticeLocation,
  practiceSubject,
  practiceSubjectInfo,
} from "../../../content/practice-set";
import type { FaultProgress } from "../../../domain/fault-progress";
import { inquiryAssessmentOrigin } from "../../../domain/inquiry-origin";
import type { InquiryIdentity } from "../../../domain/question-inquiry";

export type QuestionReturn =
  | { kind: "assessment"; runId: string; cursor: number; href: string }
  | { kind: "practice"; questionId: string; href: string }
  | { kind: "paper"; paperId: string; href: string };

// An explicit, locally present run carries the original answer context.
// A saved inquiry without this context opens the owning paper, rather than
// guessing which attempt the student meant or opening an unrelated short question.
export function questionReturn(
  state: FaultProgress,
  questionId: string,
  originRunId?: string,
): QuestionReturn | null {
  const question = exerciseFor(questionId);
  if (!question) return null;
  const origin = inquiryAssessmentOrigin(state, questionId, originRunId);
  if (origin)
    return {
      kind: "assessment",
      runId: origin.runId,
      cursor: origin.cursor,
      href: assessmentRunHref(
        origin.runId,
        assessmentPapers.find(
          (p) =>
            p.id ===
            state.assessments?.runs.find((r) => r.id === origin.runId)?.paperId,
        ),
      ),
    };
  if (isPracticeLocation(questionId, question.kind))
    return {
      kind: "practice",
      questionId,
      href: practiceSubjectInfo(practiceSubject(questionId)).href,
    };
  const paper = assessmentPapers.find((p) =>
    p.questionIds.includes(questionId),
  );
  return paper
    ? {
        kind: "paper",
        paperId: paper.id,
        href: `/lab/assessment?paper=${encodeURIComponent(paper.id)}`,
      }
    : null;
}

/** An explanation identity contains no private run metadata. Resolve the return
 * only from its exact saved inquiry, never from the active run or model reply.
 */
export function explainedInquiryReturn(
  state: FaultProgress,
  identity: InquiryIdentity,
): QuestionReturn | null {
  const matches = (state.inquiries ?? []).filter(
    (item) => item.id === identity.inquiryId,
  );
  if (matches.length !== 1) return null;
  const saved = matches[0];
  if (
    saved.exerciseId !== identity.questionId ||
    saved.exerciseRevision !== identity.questionRevision ||
    saved.text !== identity.text
  )
    return null;
  return questionReturn(state, identity.questionId, saved.originRunId);
}
