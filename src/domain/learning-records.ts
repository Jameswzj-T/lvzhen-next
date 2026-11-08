import {
  assessmentPaper,
  assessmentPapers,
} from "../content/assessment-papers";
import { exerciseFor } from "../content/fault-catalog";
import { assessmentRunHref } from "../content/civil-integrated-practice";
import {
  practiceSubject,
  practiceTopic,
  isPracticeLocation,
  type PracticeSubject,
} from "../content/practice-set";
import type { FaultProgress } from "./fault-progress";
import {
  learningQuestionHref,
  projectLearningProfile,
  type LearningProfile,
} from "./learning-profile";

export type LearningRecordsQuery = {
  subject?: PracticeSubject | "all";
  topicId?: string;
  focusedAttemptId?: string;
  limit?: number;
};
type SavedInquiry = NonNullable<FaultProgress["inquiries"]>[number];
function topicIdFor(questionId?: string) {
  try {
    return questionId ? practiceTopic(questionId).id : null;
  } catch {
    return null;
  }
}

/** Exact saved origin only. Never infer a run from the active paper or matching text. */
export function learningInquiryHref(
  state: FaultProgress,
  inquiry: SavedInquiry,
) {
  if (!inquiry.exerciseId) return null;
  const question = exerciseFor(inquiry.exerciseId);
  if (!question) return null;
  if (inquiry.originRunId) {
    const run = state.assessments?.runs.find(
      (r) => r.id === inquiry.originRunId,
    );
    const paper = run && assessmentPaper(run.paperId);
    if (!run || !paper || !paper.questionIds.includes(inquiry.exerciseId))
      return null;
    return assessmentRunHref(
      run.id,
      paper,
      paper.questionIds.indexOf(inquiry.exerciseId) + 1,
    );
  }
  if (isPracticeLocation(inquiry.exerciseId, question.kind))
    return learningQuestionHref(state, inquiry.exerciseId);
  const paper = assessmentPapers.find(
    (p) => !p.archived && p.questionIds.includes(inquiry.exerciseId!),
  );
  return paper
    ? `/lab/assessment?paper=${encodeURIComponent(paper.id)}&question=${paper.questionIds.indexOf(inquiry.exerciseId) + 1}`
    : null;
}

/** Read-only data for any records layout. No React, browser storage, transport or model calls. */
export function queryLearningRecords(
  state: FaultProgress,
  query: LearningRecordsQuery = {},
  profile: LearningProfile = projectLearningProfile(state),
) {
  const subject = query.subject ?? "all",
    topic = query.topicId ?? "";
  const limit = Number.isFinite(query.limit)
    ? Math.max(1, Math.min(10000, Math.trunc(query.limit!)))
    : 20;
  const inScope = (
    subjectId: PracticeSubject | null,
    topicId?: string | null,
  ) =>
    (subject === "all" || subjectId === subject) &&
    (!topic || topicId === topic);
  const history = profile.history.filter((h) => inScope(h.subject, h.topicId));
  const topics = profile.topics.filter(
    (t) => subject === "all" || t.subject === subject,
  );
  const selectedTopics = topics.filter((t) => !topic || t.id === topic);
  const answered = profile.questions.filter((q) =>
    inScope(q.subject, q.topicId),
  );
  const weak = answered.filter((q) => q.latest.outcome === "needs_practice");
  const drafts = profile.drafts.filter((d) =>
    inScope(d.subject, topicIdFor(d.questionId)),
  );
  const inquiryScope = (i: { exerciseId?: string; topicId?: string }) =>
    inScope(
      i.exerciseId
        ? (practiceSubject(i.exerciseId) ?? null)
        : (profile.topics.find((t) => t.id === i.topicId)?.subject ?? null),
      i.topicId ?? topicIdFor(i.exerciseId),
    );
  const inquiries = [...(state.inquiries ?? [])]
    .reverse()
    .filter(inquiryScope)
    .map((inquiry) => ({
      inquiry,
      explanation:
        state.inquiryExplanations?.find(
          (v) =>
            v.identity.inquiryId === inquiry.id &&
            v.identity.text === inquiry.text &&
            v.identity.questionId === inquiry.exerciseId &&
            v.identity.questionRevision === inquiry.exerciseRevision,
        ) ?? null,
      href: learningInquiryHref(state, inquiry),
    }));
  return {
    history,
    visibleHistory: history.filter(
      (entry, index) =>
        index < limit || entry.attempt.id === query.focusedAttemptId,
    ),
    topics,
    selectedTopics,
    topicOptions: topics.filter(
      (t) => t.answered || t.viewed || t.id === topic,
    ),
    answered,
    weak,
    drafts,
    inquiries,
    visibleInquiries: inquiries.slice(0, limit),
    inquiryDraft:
      state.inquiryDraft?.text.trim() && inquiryScope(state.inquiryDraft)
        ? state.inquiryDraft
        : null,
    summary: {
      answered: answered.length,
      viewed: selectedTopics.filter((t) => t.viewed).length,
      needsPractice: weak.length,
    },
    hasMoreHistory: history.length > limit,
    hasMoreInquiries: inquiries.length > limit,
  };
}
