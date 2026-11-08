import { corePracticeSubjects } from "../content/core-practice-sections";
import {
  exerciseFor,
  exerciseRevision,
  savedExerciseFor,
} from "../content/fault-catalog";
import {
  practiceSubject,
  practiceSubjectInfo,
  practiceTopic,
  practiceChapter,
  subjectPracticeQueues,
  type PracticeSubject,
} from "../content/practice-set";
import {
  assessmentPaper,
  assessmentPapers,
} from "../content/assessment-papers";
import { assessmentRunHref } from "../content/civil-integrated-practice";
import {
  validateUnitFeedbackResult,
  type UnitFeedbackResult,
} from "../evaluation/unit-feedback-contract";
import { currentQuestionTeacher } from "./current-question-teacher";
import { feedbackForAttempt } from "./learning-observations";
import { isCorrectChoice, validChoice } from "./objective-answer";
import { practiceReferenceQuestionIds } from "./reference-exposure";
import type { FaultProgress, UnitAttempt } from "./fault-progress";

export type LearningOutcome =
  | "answered_well"
  | "needs_practice"
  | "pending"
  | "unreviewed"
  | "historical"
  | "example";
export type LearningSupport =
  "independent" | "assisted" | "reanswer" | "unknown";
export type LearningPoint = {
  id: string;
  label: string;
  explanation: string;
  quotes: string[];
};
export type LearningHistoryEntry = {
  attempt: UnitAttempt;
  questionId: string;
  title: string;
  subject: PracticeSubject | null;
  topicId: string | null;
  topicTitle: string;
  chapterTitle: string;
  href: string;
  knowledgeHref: string | null;
  outcome: LearningOutcome;
  support: LearningSupport;
  note: string;
  points: LearningPoint[];
  feedback?: UnitFeedbackResult;
};
export type LearningQuestionState = {
  questionId: string;
  title: string;
  subject: PracticeSubject;
  topicId: string;
  topicTitle: string;
  latest: LearningHistoryEntry;
  attempts: number;
  wrongAttempts: number;
  repeatedPoints: { id: string; label: string; count: number }[];
};
export type LearningTopicState = {
  id: string;
  title: string;
  subject: PracticeSubject;
  chapterTitle: string;
  href: string;
  total: number;
  viewed: boolean;
  answered: number;
  needsPractice: number;
  pending: number;
  assisted: number;
  questions: LearningQuestionState[];
  status: "new" | "viewed" | "practised" | "needs_practice" | "pending";
};
export type LearningDraft = {
  id: string;
  questionId: string;
  title: string;
  subject: PracticeSubject;
  href: string;
  kind: "question" | "assessment";
};
export type LearningProfile = {
  history: LearningHistoryEntry[];
  questions: LearningQuestionState[];
  topics: LearningTopicState[];
  drafts: LearningDraft[];
  subjects: {
    id: PracticeSubject;
    label: string;
    attempts: number;
    answered: number;
    viewed: number;
    needsPractice: number;
    pending: number;
  }[];
};
export const learningOutcomeLabel: Record<LearningOutcome, string> = {
  answered_well: "本次答到了",
  needs_practice: "还需练",
  pending: "判断待确认",
  unreviewed: "尚无讲解",
  historical: "旧版作答",
  example: "示例记录",
};
export const learningSupportLabel: Record<LearningSupport, string> = {
  independent: "独立作答",
  assisted: "看过提示或参考",
  reanswer: "同案再次作答",
  unknown: "作答条件未记录",
};
const currentRegistry = new Map<
  string,
  { subject: PracticeSubject; topicId: string }
>();
const topicRegistry = new Map<
  string,
  Omit<
    LearningTopicState,
    | "viewed"
    | "answered"
    | "needsPractice"
    | "pending"
    | "assisted"
    | "questions"
    | "status"
  >
>();
for (const subject of corePracticeSubjects) {
  const queues = subjectPracticeQueues(subject);
  const paperQuestions = assessmentPapers
    .filter((p) => !p.archived)
    .flatMap((p) => p.questionIds)
    .filter((id) => practiceSubject(id) === subject);
  for (const id of [
    ...new Set([...queues.objective, ...queues.subjective, ...paperQuestions]),
  ]) {
    const topic = practiceTopic(id),
      chapter = practiceChapter(id);
    currentRegistry.set(id, { subject, topicId: topic.id });
    const previous = topicRegistry.get(topic.id);
    topicRegistry.set(topic.id, {
      id: topic.id,
      title: topic.title,
      subject,
      chapterTitle: chapter.title,
      href: `/lab/study?subject=${subject}&topic=${encodeURIComponent(topic.id)}`,
      total: (previous?.total ?? 0) + 1,
    });
  }
}

/** Resolve the saved training run before falling back to an ordinary practice link. */
export function learningQuestionHref(
  state: FaultProgress,
  questionId: string,
  attemptId?: string,
) {
  const run = attemptId
    ? (state.assessments?.runs ?? []).find((r) =>
        Object.values(r.attemptIds).includes(attemptId),
      )
    : undefined;
  const paper = run && assessmentPaper(run.paperId);
  if (run && paper && paper.questionIds.includes(questionId))
    return assessmentRunHref(
      run.id,
      paper,
      paper.questionIds.indexOf(questionId) + 1,
    );
  return `/lab/practice?subject=${practiceSubject(questionId) ?? "criminal-law"}&question=${encodeURIComponent(questionId)}`;
}

function checkedFeedback(
  rows: NonNullable<FaultProgress["submittedFeedback"]>,
  attempt: UnitAttempt,
) {
  if (!rows.length) return undefined;
  // One original may have multiple immutable receipts; inspect only its latest saved receipt.
  const row = [...rows].sort(
    (a, b) => Date.parse(b.observedAt) - Date.parse(a.observedAt),
  )[0];
  try {
    if (
      row.answer !== attempt.answer ||
      row.choice !== attempt.choice ||
      row.questionId !== attempt.exerciseId ||
      row.revision !== attempt.revision ||
      row.attemptId !== attempt.id ||
      Date.parse(row.observedAt) < Date.parse(attempt.submittedAt)
    )
      return undefined;
    const result = validateUnitFeedbackResult(row.result, {
      answerId: attempt.id,
      questionId: attempt.exerciseId,
      questionRevision: attempt.revision,
      originalText: attempt.choice || attempt.answer,
    });
    const q = savedExerciseFor(attempt.exerciseId, attempt.revision);
    if (
      !q ||
      result.source !== "real_provider" ||
      result.purpose !== "practice" ||
      Date.parse(result.createdAt) < Date.parse(attempt.submittedAt) ||
      Date.parse(result.createdAt) > Date.parse(row.observedAt) ||
      result.view.facts !== q.facts ||
      result.view.prompt !== q.prompt
    )
      return undefined;
    if (q.kind === "subjective") {
      const shape = (
        points: readonly {
          id: string;
          label: string;
          meaning: string;
          acceptable: string;
          boundary: string;
        }[],
      ) =>
        points.map((p) => [p.id, p.label, p.meaning, p.acceptable, p.boundary]);
      if (
        JSON.stringify(shape(result.view.points)) !==
        JSON.stringify(shape(q.criteria ?? []))
      )
        return undefined;
    }
    return result;
  } catch {
    return undefined;
  }
}

/** A read-only cross-subject archive. No new scoring, model call, mastery state or student mutation. */
export function projectLearningProfile(
  state: FaultProgress,
  at = new Date().toISOString(),
): LearningProfile {
  const rowsByAttempt = new Map<
    string,
    NonNullable<FaultProgress["submittedFeedback"]>
  >();
  for (const row of state.submittedFeedback ?? []) {
    const rows = rowsByAttempt.get(row.attemptId) ?? [];
    rows.push(row);
    rowsByAttempt.set(row.attemptId, rows);
  }
  const ordered = [...state.attempts].sort(
    (a, b) =>
      Date.parse(a.submittedAt) - Date.parse(b.submittedAt) ||
      a.id.localeCompare(b.id),
  );
  const earlier = new Set<string>();
  const history: LearningHistoryEntry[] = [];
  for (const attempt of ordered) {
    if (Date.parse(attempt.submittedAt) > Date.parse(at)) continue;
    const current = exerciseFor(attempt.exerciseId),
      saved = savedExerciseFor(attempt.exerciseId, attempt.revision) ?? current;
    const subject = practiceSubject(attempt.exerciseId) ?? null;
    let topicId: string | null = null,
      topicTitle = "保留的作答",
      chapterTitle = "历史记录";
    try {
      const topic = practiceTopic(attempt.exerciseId);
      topicId = topic.id;
      topicTitle = topic.title;
      chapterTitle = practiceChapter(attempt.exerciseId).title;
    } catch {
      /* Retained originals still appear. */
    }
    const sameCase = current
      ? practiceReferenceQuestionIds(current.id)
      : [attempt.exerciseId];
    const support: LearningSupport =
      attempt.feedbackRetry || sameCase.some((id) => earlier.has(id))
        ? "reanswer"
        : attempt.hintUsed === true ||
            attempt.referenceSeenBeforeAnswer === true
          ? "assisted"
          : attempt.hintUsed === false &&
              attempt.referenceSeenBeforeAnswer === false
            ? "independent"
            : "unknown";
    const entry: LearningHistoryEntry = {
      attempt,
      questionId: attempt.exerciseId,
      title: saved?.title ?? "保留的原答",
      subject,
      topicId,
      topicTitle,
      chapterTitle,
      href: learningQuestionHref(state, attempt.exerciseId, attempt.id),
      knowledgeHref:
        subject && topicId
          ? `/lab/study?subject=${subject}&topic=${encodeURIComponent(topicId)}`
          : null,
      outcome: "unreviewed",
      support,
      note: "原答已保存，还没有对应的讲解。",
      points: [],
    };
    const rows = rowsByAttempt.get(attempt.id) ?? [];
    entry.feedback = checkedFeedback(rows, attempt);
    if (attempt.learningExampleSource) {
      entry.outcome = "example";
      entry.note = "这份示例保留供查看，不计入自己的作答表现。";
    } else if (
      !current ||
      !currentRegistry.has(attempt.exerciseId) ||
      exerciseRevision(attempt.exerciseId) !== attempt.revision
    ) {
      entry.outcome = "historical";
      entry.note = "原题版本已保留，不用新版本答案重新判断这份作答。";
    } else if (current.kind === "objective") {
      if (validChoice(current, attempt.choice)) {
        const correct = isCorrectChoice(current, attempt.choice);
        entry.outcome = correct ? "answered_well" : "needs_practice";
        entry.note = correct
          ? "本次选择与本题答案一致。"
          : "本次选择与本题答案不一致，回看各选项的理由再练。";
      } else {
        entry.outcome = "pending";
        entry.note = "这份保存选择暂不能按本题选项核对，不计作答错。";
      }
      entry.feedback = checkedFeedback(rows, attempt);
    } else {
      const result = checkedFeedback(rows, attempt);
      entry.feedback = result;
      if (rows.length) {
        entry.outcome = "pending";
        entry.note = "讲解仍有待确认的地方，暂不记作答错。";
      }
      if (result) {
        let needsByTeacher = false;
        let pending =
          result.view.status !== "assessed" ||
          result.view.points.length === 0 ||
          result.view.points.some((p) => p.status === "uncertain") ||
          result.pointReviews?.some((p) => p.state === "needs_review");
        if (result.sourceTeacher) {
          try {
            const teacher = currentQuestionTeacher(result, {
              id: attempt.id,
              exerciseId: attempt.exerciseId,
              revision: attempt.revision,
              answer: attempt.answer,
              choice: attempt.choice,
            });
            pending ||=
              teacher.judgment.kind === "needs_review" ||
              teacher.pending.length > 0;
            needsByTeacher =
              teacher.judgment.kind === "incorrect" ||
              teacher.judgment.kind === "partial";
          } catch {
            pending = true;
          }
        }
        if (result.view.weightedScore?.pending) pending = true;
        if (!pending) {
          entry.points = result.view.points
            .filter((p) =>
              ["partial", "missing", "contradicted"].includes(p.status),
            )
            .map((p) => ({
              id: p.id,
              label: p.label,
              explanation: p.explanation,
              quotes: [...p.quotes],
            }));
          entry.outcome =
            needsByTeacher ||
            entry.points.length ||
            (result.view.weightedScore &&
              result.view.weightedScore.confirmed <
                result.view.weightedScore.maximum)
              ? "needs_practice"
              : "answered_well";
          entry.note =
            entry.outcome === "needs_practice"
              ? "本次讲解指出还有要点需要补充，具体依据在下方。"
              : "本次讲解认为所列要点已答到；可以继续换题练习。";
        }
      } else if (!rows.length) {
        const observed = feedbackForAttempt(state, attempt.id);
        if (
          observed?.source === "real_provider" &&
          observed.state === "reviewed" &&
          observed.failure === null &&
          observed.protocol !== "unit-feedback-v1" &&
          observed.points.length &&
          observed.points.every((p) => p.status !== "needs_review")
        ) {
          entry.points = observed.points
            .filter((p) => p.status === "model_no")
            .map((p) => ({
              id: p.id,
              label: p.requirement,
              explanation: p.explanation,
              quotes: p.quotes,
            }));
          entry.outcome = entry.points.length
            ? "needs_practice"
            : "answered_well";
          entry.note = "依据这份原答已保存的逐项反馈，原评分与原文均保留。";
        }
      }
    }
    history.push(entry);
    if (!attempt.learningExampleSource) earlier.add(attempt.exerciseId);
  }
  const byQuestion = new Map<string, LearningHistoryEntry[]>();
  for (const entry of history)
    if (
      currentRegistry.has(entry.questionId) &&
      !["historical", "example"].includes(entry.outcome)
    ) {
      const rows = byQuestion.get(entry.questionId) ?? [];
      rows.push(entry);
      byQuestion.set(entry.questionId, rows);
    }
  const questions: LearningQuestionState[] = [...byQuestion].map(
    ([questionId, entries]) => {
      const meta = currentRegistry.get(questionId)!;
      const last = entries.at(-1)!;
      const sameTime = entries.filter(
        (e) =>
          Date.parse(e.attempt.submittedAt) ===
          Date.parse(last.attempt.submittedAt),
      );
      const ambiguous =
        new Set(
          sameTime.map((e) =>
            JSON.stringify([e.attempt.choice, e.attempt.answer]),
          ),
        ).size > 1;
      const latest: LearningHistoryEntry = ambiguous
        ? {
            ...last,
            outcome: "pending",
            points: [],
            note: "同一时刻有不同原答，暂不确定哪份是最后一次；两份原文都保留。",
          }
        : last;
      const counts = new Map<
        string,
        { id: string; label: string; count: number }
      >();
      for (const entry of entries)
        if (entry.outcome === "needs_practice")
          for (const point of entry.points) {
            const old = counts.get(point.id);
            counts.set(point.id, {
              id: point.id,
              label: point.label,
              count: (old?.count ?? 0) + 1,
            });
          }
      return {
        questionId,
        title: latest.title,
        subject: meta.subject,
        topicId: meta.topicId,
        topicTitle: latest.topicTitle,
        latest,
        attempts: entries.length,
        wrongAttempts: entries.filter((e) => e.outcome === "needs_practice")
          .length,
        repeatedPoints: [...counts.values()].filter((p) => p.count > 1),
      };
    },
  );
  const topics: LearningTopicState[] = [...topicRegistry.values()].map(
    (meta) => {
      const rows = questions.filter((q) => q.topicId === meta.id);
      const needsPractice = rows.filter(
        (q) => q.latest.outcome === "needs_practice",
      ).length;
      const pending = rows.filter((q) =>
        ["pending", "unreviewed"].includes(q.latest.outcome),
      ).length;
      const viewed = !!state.practice?.knowledgeViewed[meta.id];
      return {
        ...meta,
        viewed,
        answered: rows.length,
        needsPractice,
        pending,
        assisted: rows.filter(
          (q) =>
            q.latest.outcome === "answered_well" &&
            q.latest.support !== "independent",
        ).length,
        questions: rows,
        status: needsPractice
          ? "needs_practice"
          : pending
            ? "pending"
            : rows.length
              ? "practised"
              : viewed
                ? "viewed"
                : "new",
      };
    },
  );
  const drafts: LearningDraft[] = [];
  for (const [questionId, draft] of Object.entries(state.drafts)) {
    const subject = practiceSubject(questionId),
      q = exerciseFor(questionId);
    if (
      q &&
      subject &&
      !draft.submittedId &&
      (draft.answer.trim() || draft.choice)
    )
      drafts.push({
        id: `question:${questionId}`,
        questionId,
        title: q.title,
        subject,
        href: learningQuestionHref(state, questionId),
        kind: "question",
      });
  }
  for (const run of state.assessments?.runs ?? []) {
    const paper = assessmentPaper(run.paperId);
    const hasDraft = paper?.questionIds.some(
      (id) => run.answers[id]?.answer.trim() || run.answers[id]?.choice,
    );
    const cursor =
      state.assessments?.activeId === run.id
        ? state.assessments.cursor
        : (state.assessments?.cursors?.[run.id] ?? 0);
    const qid = hasDraft && paper?.questionIds[cursor];
    const subject = qid && practiceSubject(qid);
    if (!run.finishedAt && paper && qid && subject)
      drafts.push({
        id: `assessment:${run.id}`,
        questionId: qid,
        title: paper.title,
        subject,
        href: assessmentRunHref(
          run.id,
          paper,
          paper.questionIds.indexOf(qid) + 1,
        ),
        kind: "assessment",
      });
  }
  const subjects = corePracticeSubjects.map((id) => {
    const rows = questions.filter((q) => q.subject === id),
      groups = topics.filter((t) => t.subject === id);
    return {
      id,
      label: practiceSubjectInfo(id).label,
      attempts: history.filter(
        (h) => h.subject === id && h.outcome !== "example",
      ).length,
      answered: rows.length,
      viewed: groups.filter((t) => t.viewed).length,
      needsPractice: rows.filter((q) => q.latest.outcome === "needs_practice")
        .length,
      pending: rows.filter((q) =>
        ["pending", "unreviewed"].includes(q.latest.outcome),
      ).length,
    };
  });
  return { history: history.reverse(), questions, topics, drafts, subjects };
}

export function learningTopicCaption(topic: LearningTopicState) {
  if (topic.needsPractice)
    return `已练 ${topic.answered} 题 · ${topic.needsPractice} 题还需练`;
  if (topic.pending)
    return `已练 ${topic.answered} 题 · ${topic.pending} 题待讲解或确认`;
  if (topic.answered) return `已练 ${topic.answered} 题`;
  return topic.viewed ? "已看要点" : "还未开始";
}
