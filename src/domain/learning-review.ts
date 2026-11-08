import {
  isRemainingG6Subject,
  remainingG6SubjectIds,
} from "../content/remaining-g6-subjects";
import {
  checkedDirectLearningFeedback,
  directLearningAdvice,
} from "./direct-learning-advice";
import { exerciseFor, exerciseRevision } from "../content/fault-catalog";
import {
  practiceSubject,
  subjectPracticeQueues,
  practiceTopic,
  type PracticeSubject,
} from "../content/practice-set";
import type { FaultProgress, UnitAttempt } from "./fault-progress";
import type { LearningNext } from "./learning-next";
import {
  feedbackForAttempt,
  feedbackObservation,
} from "./learning-observations";
import {
  isPriorityTeacherProtocol,
  teacherSourceNeedsReview,
} from "./teacher-source-feedback-contract";
import { teacherLearningQuestionIds } from "./teacher-learning-scope";
import { civilInsecurityStagesQuestions } from "../content/civil-insecurity-stages";
import { broadcastFacilitiesQuestions } from "../content/criminal-broadcast-facilities";
import { explosionQuestions } from "../content/criminal-explosion";
import { negligentExplosionQuestions } from "../content/criminal-negligent-explosion";
import { educationFacilitiesQuestions } from "../content/criminal-education-facilities";
import {
  civilProcedureAllReviewQuestions,
  civilProcedureReviewReady,
} from "../content/civil-procedure-review";
import { assessmentPaper } from "../content/assessment-papers";

// A local read-only projection of existing reviewed teaching paths. This does
// not change provider registration, request inputs, scores or saved records.
export const learningReviewWindow = 20;
const civilInsecurityStageQuestionIds = civilInsecurityStagesQuestions.map(
  (q) => q.id,
);
export type ReviewSupport =
  "independent" | "hint_or_reference" | "complete_reanswer" | "unknown";
export type ReviewOutcome =
  "supported_this_time" | "needs_work" | "pending" | "unreviewed";
export type ReviewEvent = {
  attemptId: string;
  submittedAt: string;
  originalText: string;
  support: ReviewSupport;
  outcome: ReviewOutcome;
  notice: string;
  resultId?: string;
  points: {
    id: string;
    label: string;
    explanation: string;
    quotes: string[];
    needsWork: boolean;
    nativeStatus?: string;
  }[];
};
export type LearningReviewGroup = {
  questionId: string;
  title: string;
  topicTitle: string;
  href: string;
  savedCount: number;
  historicalCount: number;
  windowCount: number;
  distinctFeedbackCount: number;
  supported: Record<ReviewSupport, number>;
  needsWork: number;
  pending: number;
  unreviewed: number;
  weakPoints: {
    id: string;
    label: string;
    count: number;
    contradicted: number;
    partial: number;
    missing: number;
    attemptIds: string[];
  }[];
  events: ReviewEvent[];
  nextBasis?: string;
  newCasePractice?: {
    questionId: string;
    title: string;
    href: string;
    reason: string;
  };
};

function supportFor(state: FaultProgress, attempt: UnitAttempt): ReviewSupport {
  const link = attempt.feedbackRetry;
  if (link) {
    const original = state.attempts.find(
      (a) => a.id === link.originalAttemptId,
    );
    const source = feedbackObservation(state, link.feedbackId);
    return original &&
      original.id !== attempt.id &&
      original.exerciseId === attempt.exerciseId &&
      original.revision === attempt.revision &&
      link.questionId === attempt.exerciseId &&
      link.revision === attempt.revision &&
      source?.attemptId === original.id &&
      source.resultId === link.feedbackResultId &&
      source.answer === original.answer
      ? "complete_reanswer"
      : "unknown";
  }
  return attempt.hintUsed === true || attempt.referenceSeenBeforeAnswer === true
    ? "hint_or_reference"
    : attempt.hintUsed === false && attempt.referenceSeenBeforeAnswer === false
      ? "independent"
      : "unknown";
}

function eventFor(state: FaultProgress, attempt: UnitAttempt): ReviewEvent {
  const event: ReviewEvent = {
    attemptId: attempt.id,
    submittedAt: attempt.submittedAt,
    originalText: attempt.answer,
    support: supportFor(state, attempt),
    outcome: "unreviewed",
    notice: "原答已保存，尚无对应评阅；没有记为答错。",
    points: [],
  };
  const saved = state.submittedFeedback?.findLast(
    (row) => row.attemptId === attempt.id,
  );
  // Registered direct feedback already has its own immutable saved event.
  // Project it locally; do not add a second observation store.
  if (
    [
      "civil-procedure",
      "criminal-procedure",
      "administrative-law",
      "commercial-law",
      ...remainingG6SubjectIds,
    ].includes(practiceSubject(attempt.exerciseId) ?? "") ||
    civilInsecurityStageQuestionIds.includes(attempt.exerciseId) ||
    broadcastFacilitiesQuestions.some((q) => q.id === attempt.exerciseId) ||
    explosionQuestions.some((q) => q.id === attempt.exerciseId) ||
    negligentExplosionQuestions.some((q) => q.id === attempt.exerciseId) ||
    educationFacilitiesQuestions.some((q) => q.id === attempt.exerciseId)
  ) {
    if (!saved) return event;
    event.outcome = "pending";
    event.notice = "保存反馈的来源、版本或判定仍待核；不计作答错或答对。";
    const checked = checkedDirectLearningFeedback(state, attempt);
    if (!checked) return event;
    const result = checked.result;
    event.resultId = result.id;
    event.points = result.view.points.map((point) => ({
      id: point.id,
      label: point.label,
      explanation: point.explanation,
      quotes: point.quotes,
      needsWork: point.status !== "covered" && point.status !== "uncertain",
      nativeStatus: point.status,
    }));
    if (
      result.view.status !== "assessed" ||
      !event.points.length ||
      result.view.points.some((p) => p.status === "uncertain") ||
      result.pointReviews?.some((p) => p.state === "needs_review")
    ) {
      event.points = event.points.map((p) => ({ ...p, needsWork: false }));
      return event;
    }
    if (event.points.every((p) => p.nativeStatus === "covered")) {
      event.outcome = "supported_this_time";
      event.notice =
        event.support === "hint_or_reference" ||
        event.support === "complete_reanswer"
          ? "这次的结论和理由都答对了。这是看过提示或反馈后的作答；下次换一道没看过的题，再试试自己判断。"
          : "这次的结论和理由都答对了。以后换个案情，还可以再练练。";
    } else {
      event.outcome = "needs_work";
      event.notice =
        "保存反馈指出本问有错误或未说明的理由；原文与具体依据保留如下。";
    }
    return event;
  }
  const observed = state.learningObservations?.some(
    (row) => row.attemptId === attempt.id,
  );
  const feedback = feedbackForAttempt(state, attempt.id);
  if (!saved && !observed && !feedback) return event;
  const result = feedback?.unitResult,
    teacher = result?.sourceTeacher;
  event.outcome = "pending";
  event.notice = "保存反馈的来源、版本或判定仍待核；不计作答错或答对。";
  if (
    result?.purpose === "synthetic_validation" ||
    feedback?.source === "offline_test"
  ) {
    event.notice = "这是虚构验证或离线回放反馈，不作为真实作答表现统计。";
    return event;
  }
  // A later saved reply must never inherit an older successful observation.
  if (
    saved &&
    (!feedback ||
      saved.questionId !== attempt.exerciseId ||
      saved.revision !== attempt.revision ||
      saved.answer !== attempt.answer ||
      saved.choice ||
      saved.result.id !== feedback.resultId)
  )
    return event;
  if (
    !feedback ||
    feedback.protocol !== "unit-feedback-v1" ||
    feedback.source !== "real_provider" ||
    feedback.state !== "reviewed" ||
    !result ||
    result.purpose !== "practice" ||
    !teacher ||
    !isPriorityTeacherProtocol(teacher.version)
  )
    return event;
  event.resultId = feedback.resultId;
  event.points = feedback.points.map((point) => ({
    id: point.id,
    label: point.requirement,
    explanation: point.explanation,
    quotes: point.quotes,
    needsWork: point.status === "model_no",
    nativeStatus: point.nativeStatus,
  }));
  const draft = state.drafts[attempt.exerciseId];
  const paused =
    draft?.feedbackRetryPaused &&
    (draft.feedbackRetry?.originalAttemptId === attempt.id ||
      draft.submittedId === attempt.id);
  if (
    paused ||
    teacherSourceNeedsReview(teacher, result.view) ||
    feedback.points.some((p) => p.status === "needs_review") ||
    !feedback.points.length
  ) {
    event.notice = paused
      ? "这份反馈的重答来源已暂停；原记录保留，仅供核对。"
      : "这份反馈含待核判断；原标签与说明保留，不据此统计薄弱点或改正。";
    event.points = event.points.map((p) => ({ ...p, needsWork: false }));
    return event;
  }
  if (
    feedback.points.every((p) => p.nativeStatus === "covered") &&
    teacher.overall.kind === "correct"
  ) {
    event.outcome = "supported_this_time";
    event.notice = "这次的结论和理由都答对了。";
  } else if (event.points.some((p) => p.needsWork)) {
    event.outcome = "needs_work";
    event.notice = "保存反馈指出本问有缺漏或相反表述；具体要点如下。";
  } else {
    event.notice = "整问与逐项判断未形成一致依据，先核对，不强推答对或薄弱点。";
  }
  return event;
}

/** Saved attempts only; no drafts in counts, no semantic clustering, no fetch.
 * A bounded recent window avoids presenting a partial view as lifetime counts.
 * Historical versions remain in storage and are excluded from current rules.
 */
export function projectLearningReview(
  state: FaultProgress,
  subject: PracticeSubject,
  recommendation: LearningNext | null = null,
): LearningReviewGroup[] {
  const collectionAttempts = new Set(
    (state.assessments?.runs ?? [])
      .filter((run) => assessmentPaper(run.paperId)?.kind === "practice")
      .flatMap((run) => Object.values(run.attemptIds)),
  );
  const questionIds =
    subject === "civil-procedure"
      ? [
          ...new Set([
            ...subjectPracticeQueues(subject).subjective,
            ...(civilProcedureReviewReady
              ? civilProcedureAllReviewQuestions.map((q) => q.id)
              : []),
          ]),
        ]
      : subject === "criminal-procedure" ||
          subject === "administrative-law" ||
          subject === "commercial-law" ||
          isRemainingG6Subject(subject)
        ? subjectPracticeQueues(subject).subjective
        : subject === "civil-law"
          ? [...teacherLearningQuestionIds, ...civilInsecurityStageQuestionIds]
          : [
              ...teacherLearningQuestionIds,
              ...broadcastFacilitiesQuestions.map((q) => q.id),
              ...explosionQuestions.map((q) => q.id),
              ...negligentExplosionQuestions.map((q) => q.id),
              ...educationFacilitiesQuestions.map((q) => q.id),
            ];
  return questionIds.flatMap((questionId) => {
    const question = exerciseFor(questionId);
    if (!question || practiceSubject(questionId) !== subject) return [];
    const saved = state.attempts.filter(
      (a) =>
        a.exerciseId === questionId &&
        !a.choice &&
        !collectionAttempts.has(a.id),
    );
    if (!saved.length) return [];
    const current = saved
      .filter((a) => a.revision === exerciseRevision(questionId))
      .sort(
        (a, b) =>
          Date.parse(b.submittedAt) - Date.parse(a.submittedAt) ||
          b.id.localeCompare(a.id),
      );
    const events = current
      .slice(0, learningReviewWindow)
      .map((a) => eventFor(state, a));
    const group: LearningReviewGroup = {
      questionId,
      title: question.title,
      topicTitle: practiceTopic(questionId).title,
      href: `/lab/practice?subject=${subject}&question=${encodeURIComponent(questionId)}`,
      savedCount: current.length,
      historicalCount: saved.length - current.length,
      windowCount: events.length,
      distinctFeedbackCount: new Set(
        events.flatMap((e) => (e.resultId ? [e.resultId] : [])),
      ).size,
      supported: {
        independent: 0,
        hint_or_reference: 0,
        complete_reanswer: 0,
        unknown: 0,
      },
      needsWork: 0,
      pending: 0,
      unreviewed: 0,
      weakPoints: [],
      events,
    };
    // This optional action belongs to this saved correction. It does not replace
    // the page's other unresolved next step or create a mastery record.
    const transferTarget =
      questionId === "crimpro-confession-only-explain"
        ? "crimpro-confession-partial-corroboration-explain"
        : questionId === "commercial-forfeiture-partial-explain-v2"
          ? "commercial-forfeiture-notice-transfer-explain"
          : undefined;
    if (
      transferTarget &&
      current[0] &&
      events[0]?.outcome === "supported_this_time" &&
      (events[0].support === "hint_or_reference" ||
        events[0].support === "complete_reanswer")
    ) {
      const saved = checkedDirectLearningFeedback(state, current[0]);
      const advice = saved ? directLearningAdvice(saved.result, state) : null;
      const target = advice?.nextQuestion;
      if (target?.basis === "weakness_transfer" && target.id === transferTarget)
        group.newCasePractice = {
          questionId: target.id,
          title: target.title,
          href: target.href,
          reason:
            "这是看过反馈后改正的。换一个案情，先自己判断，再看本题反馈。",
        };
    }
    const weak = new Map<string, LearningReviewGroup["weakPoints"][number]>();
    for (const e of events) {
      if (e.outcome === "supported_this_time") group.supported[e.support]++;
      else if (e.outcome === "pending") group.pending++;
      else if (e.outcome === "unreviewed") group.unreviewed++;
      else {
        group.needsWork++;
        for (const point of e.points.filter((p) => p.needsWork)) {
          const item = weak.get(point.id) ?? {
            id: point.id,
            label: point.label,
            count: 0,
            contradicted: 0,
            partial: 0,
            missing: 0,
            attemptIds: [],
          };
          item.count++;
          if (point.nativeStatus === "contradicted") item.contradicted++;
          else if (point.nativeStatus === "partial") item.partial++;
          else if (point.nativeStatus === "missing") item.missing++;
          item.attemptIds.push(e.attemptId);
          weak.set(point.id, item);
        }
      }
    }
    group.weakPoints = [...weak.values()].sort(
      (a, b) => b.count - a.count || a.id.localeCompare(b.id),
    );
    const source = recommendation?.evidence;
    const nextEvent =
      source?.questionId === questionId
        ? events.find(
            (e) =>
              e.attemptId === source.attemptId &&
              e.resultId === source.resultId,
          )
        : null;
    if (nextEvent) {
      const point = group.weakPoints.find(
        (p) => p.id === source?.focus?.criterionId,
      );
      group.nextBasis =
        nextEvent.outcome === "pending" || source?.conclusion === "pending"
          ? "当前下一步只供回看这次待核作答，不由历史次数安排纠错。"
          : point
            ? `当前下一步依据这次保存反馈；「${point.label}」在本题最近${group.windowCount}次作答中有${point.count}次反馈提到缺漏或相反表述（包含这次）。`
            : "当前下一步依据本问这次保存反馈；历史答对次数没有被当作永久掌握或迁移成功。";
    }
    return [group];
  });
}
