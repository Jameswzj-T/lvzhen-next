import { assessmentRunHref } from "../content/civil-integrated-practice";
import {
  exerciseFor,
  exerciseRevision,
  topicFor,
} from "../content/fault-catalog";
import { chapterFor, chapterForTopic } from "../content/criminal-curriculum";
import { answerReadingGuide } from "../content/answer-reading-guide";
import {
  knowledgeTopics,
  practiceGroups,
  longQuestionsForTopic,
  currentPracticeId,
  practiceSubject,
  subjectPracticeQueues,
} from "../content/practice-set";
import type { FaultProgress, UnitAttempt } from "./fault-progress";
import { checkedDirectLearningFeedback } from "./direct-learning-advice";
import { isCorrectChoice, validChoice } from "./objective-answer";
import { initializePractice, visitPractice } from "./practice";
import { practiceReferenceQuestionIds } from "./reference-exposure";
import { assessmentAttemptOrigin } from "./assessment";
import { assessmentPaper } from "../content/assessment-papers";
import { feedbackForAttempt } from "./learning-observations";

type WrittenLearningObservation = {
  previousEdition: boolean;
  questionId: string;
  title: string;
  href: string;
  submittedAt: string;
  outcome: "complete" | "needs_work" | "pending";
  assistance: "hint_or_reference" | "same_case_reanswer" | "first_answer";
  text: string;
  focus: { id: string; title: string; text: string; repeated: boolean }[];
};

export type TopicLearningSummary = {
  topicId: string;
  title: string;
  viewed: boolean;
  answered: number;
  total: number;
  objective: {
    total: number;
    answered: number;
    correct: number;
    wrong: number;
    wrongAttempts: number;
    supported: number;
  };
  written: {
    total: number;
    answered: number;
    complete: number;
    needsWork: number;
    pending: number;
  };
  latestWritten?: WrittenLearningObservation;
  earlierWritten?: WrittenLearningObservation;
  writtenComparison?: string;
  next?: { questionId: string; title: string; label: string; reason: string };
};

const questionHref = (
  id: string,
  origin: ReturnType<typeof assessmentAttemptOrigin>,
) =>
  origin
    ? assessmentRunHref(
        origin.runId,
        assessmentPaper(origin.paperId),
        origin.questionNumber,
      )
    : `/lab/practice?${practiceSubject(id) === "civil-law" ? "subject=civil-law&" : ""}question=${encodeURIComponent(id)}`;
const supported = (a: UnitAttempt) =>
  a.hintUsed || a.referenceSeenBeforeAnswer || !!a.feedbackRetry;

type WrittenPoint = { id: string; title: string; status: string };
function writtenFeedback(
  state: FaultProgress,
  attempt: UnitAttempt,
  asOf: number,
  origin: ReturnType<typeof assessmentAttemptOrigin>,
) {
  if (origin?.kind === "case") {
    const row = feedbackForAttempt(state, attempt.id);
    const settled =
      !!row &&
      row.protocol === "table-trial-v1" &&
      row.originRunId === origin.runId &&
      row.attemptId === attempt.id &&
      row.questionId === attempt.exerciseId &&
      row.revision === attempt.revision &&
      row.answer === attempt.answer &&
      row.source === "real_provider" &&
      row.state === "reviewed" &&
      row.failure === null &&
      Date.parse(row.observedAt) >= Date.parse(attempt.submittedAt) &&
      Date.parse(row.observedAt) <= asOf &&
      row.points.length > 0 &&
      row.points.every(
        (p) =>
          p.id.startsWith(`${origin.questionNumber}-`) &&
          p.quotes.every((quote) => attempt.answer.includes(quote)) &&
          ((p.status === "model_yes" && p.label === "是") ||
            (p.status === "model_no" && p.label === "否")),
      );
    return {
      settled,
      observedAt: row?.observedAt,
      identity: row?.identity,
      clarification: null,
      points: (row?.points ?? []).map((p): WrittenPoint => ({
        id: p.id,
        title: p.requirement,
        status: p.status === "model_yes" ? "covered" : "not_met",
      })),
    };
  }
  const row = checkedDirectLearningFeedback(state, attempt);
  const v = row && Date.parse(row.observedAt) <= asOf ? row.result.view : null;
  const settled =
    v?.status === "assessed" &&
    v.points.length > 0 &&
    !v.points.some((p) => p.status === "uncertain") &&
    !row?.result.pointReviews?.some((p) => p.state === "needs_review");
  const guide = v ? answerReadingGuide(v) : null;
  return {
    settled: !!settled,
    observedAt: row?.observedAt,
    identity: v?.contentId,
    clarification: v?.clarification,
    points: (
      v?.points.filter((p) => !guide?.additionalPointIds.includes(p.id)) ?? []
    ).map((p): WrittenPoint => ({
      id: p.id,
      title: guide?.requirements[p.id]?.title ?? p.label,
      status: p.status,
    })),
  };
}

/** A read-only view of existing answers, not a second progress store or an AI
 * judgment. Newer unreviewed answers never inherit older successful feedback. */
export function projectTopicLearning(
  state: FaultProgress,
  topicId: string,
  asOf = Date.now(),
): TopicLearningSummary | null {
  const criminalTopic = knowledgeTopics.find((t) => t.id === topicId);
  const published = criminalTopic ? null : topicFor(topicId);
  const civilTopic = published?.exercises.some(
    (q) => practiceSubject(q.id) === "civil-law",
  )
    ? published
    : null;
  const topic = criminalTopic ?? civilTopic;
  if (!topic) return null;
  const civilQueues = civilTopic ? subjectPracticeQueues("civil-law") : null;
  const ids = [
    ...new Set([
      ...(civilTopic && civilQueues
        ? civilTopic.exercises
            .filter((q) => civilQueues[q.kind].includes(q.id))
            .map((q) => q.id)
        : (practiceGroups.find((g) => g.topicId === topicId)?.ids ?? [])),
      ...longQuestionsForTopic(topicId),
    ]),
  ];
  const included = new Set(ids);
  const caseQuestions = new Map<string, Set<string>>();
  const sameCase = (id: string) => {
    if (!caseQuestions.has(id))
      caseQuestions.set(id, new Set(practiceReferenceQuestionIds(id)));
    return caseQuestions.get(id)!;
  };
  // A prior question, including another subquestion or retained edition of the
  // same case, prevents presenting this as the learner's first fresh case.
  const earlierCaseAnswer = (a: UnitAttempt) =>
    state.attempts.some(
      (previous) =>
        previous.id !== a.id &&
        sameCase(a.exerciseId).has(previous.exerciseId) &&
        Date.parse(previous.submittedAt) < Date.parse(a.submittedAt),
    );
  const idCounts = new Map<string, number>();
  for (const a of state.attempts)
    idCounts.set(a.id, (idCounts.get(a.id) ?? 0) + 1);
  const examAttempts = new Set(
    state.assessments?.runs.flatMap((run) => Object.values(run.attemptIds)) ??
      [],
  );
  const origins = new Map<string, ReturnType<typeof assessmentAttemptOrigin>>();
  const originFor = (a: UnitAttempt) => {
    if (!origins.has(a.id))
      origins.set(
        a.id,
        examAttempts.has(a.id) ? assessmentAttemptOrigin(state, a) : null,
      );
    return origins.get(a.id)!;
  };
  const attempts = state.attempts
    .filter((a) => {
      const q = exerciseFor(a.exerciseId);
      return (
        included.has(currentPracticeId(a.exerciseId)) &&
        q &&
        a.revision === exerciseRevision(q.id) &&
        idCounts.get(a.id) === 1 &&
        (!examAttempts.has(a.id) || !!originFor(a)) &&
        !a.learningExampleSource &&
        Number.isFinite(Date.parse(a.submittedAt)) &&
        Date.parse(a.submittedAt) <= asOf &&
        (q.kind === "objective"
          ? validChoice(q, a.choice)
          : !a.choice && !!a.answer.trim())
      );
    })
    .sort(
      (a, b) =>
        Date.parse(b.submittedAt) - Date.parse(a.submittedAt) ||
        a.id.localeCompare(b.id),
    );
  const latest = new Map<string, UnitAttempt>();
  for (const a of attempts)
    if (!latest.has(currentPracticeId(a.exerciseId)))
      latest.set(currentPracticeId(a.exerciseId), a);
  const summary: TopicLearningSummary = {
    topicId,
    title: topic.title,
    viewed: !!state.practice?.knowledgeViewed[topicId],
    answered: latest.size,
    total: ids.length,
    objective: {
      total: ids.filter((id) => exerciseFor(id)?.kind === "objective").length,
      answered: 0,
      correct: 0,
      wrong: 0,
      wrongAttempts: 0,
      supported: 0,
    },
    written: {
      total: ids.filter((id) => exerciseFor(id)?.kind === "subjective").length,
      answered: 0,
      complete: 0,
      needsWork: 0,
      pending: 0,
    },
  };
  const feedback = (a: UnitAttempt) =>
    writtenFeedback(state, a, asOf, originFor(a));
  summary.objective.wrongAttempts = attempts.filter((a) => {
    const q = exerciseFor(a.exerciseId)!;
    return q.kind === "objective" && !isCorrectChoice(q, a.choice);
  }).length;
  for (const a of latest.values()) {
    const q = exerciseFor(a.exerciseId)!;
    // Equal-time conflicting checkpoints have no reliable latest judgment.
    const tied =
      attempts.filter(
        (b) =>
          currentPracticeId(b.exerciseId) === currentPracticeId(a.exerciseId) &&
          b.submittedAt === a.submittedAt,
      ).length > 1;
    if (q.kind === "objective") {
      summary.objective.answered++;
      if (!tied) {
        if (isCorrectChoice(q, a.choice)) summary.objective.correct++;
        else summary.objective.wrong++;
      }
      if (supported(a)) summary.objective.supported++;
      continue;
    }
    summary.written.answered++;
    const row = tied ? null : feedback(a);
    const settled = row?.settled;
    const mainPoints = row?.points ?? [];
    const weak = settled
      ? mainPoints.filter((p) => p.status !== "covered")
      : [];
    if (!settled) summary.written.pending++;
    else if (weak.length) summary.written.needsWork++;
    else summary.written.complete++;
    if (
      summary.latestWritten &&
      (summary.earlierWritten ||
        sameCase(summary.latestWritten.questionId).has(q.id))
    )
      continue;
    const observation: WrittenLearningObservation = {
      previousEdition: currentPracticeId(a.exerciseId) !== a.exerciseId,
      questionId: q.id,
      title: q.title,
      href: questionHref(q.id, originFor(a)),
      submittedAt: a.submittedAt,
      outcome: !settled ? "pending" : weak.length ? "needs_work" : "complete",
      assistance: supported(a)
        ? "hint_or_reference"
        : earlierCaseAnswer(a)
          ? "same_case_reanswer"
          : "first_answer",
      text: !settled
        ? row?.clarification
          ? "这份答案有一处意思还没说清楚，回到题目补充一下。"
          : "这份回答已保存，可以回题目对照讲解。"
        : weak.length
          ? `这份回答还有${weak.length}处${weak.some((p) => p.status === "contradicted" || p.status === "not_met") ? "需要修改或补充" : "没有说完整"}。`
          : supported(a)
            ? "这次看过提示或解析，已经把本题的主要要求写到了。接着换个案情，自己试一次。"
            : "这份回答已经把本题的主要要求写到了，可以继续练下一题。",
      focus: weak.slice(0, 2).map((point) => ({
        id: point.id,
        title: point.title,
        text:
          point.status === "contradicted"
            ? "这里需要改一改"
            : point.status === "not_met"
              ? "这里需要改或补"
              : point.status === "missing"
                ? "还没写到"
                : "还没说完整",
        repeated: attempts.some((previous) => {
          if (
            previous.exerciseId !== a.exerciseId ||
            Date.parse(previous.submittedAt) >= Date.parse(a.submittedAt)
          )
            return false;
          const old = feedback(previous);
          return (
            old.identity === row?.identity &&
            old?.settled &&
            old.observedAt &&
            Date.parse(old.observedAt) < Date.parse(a.submittedAt) &&
            old.points.some((p) => p.id === point.id && p.status !== "covered")
          );
        }),
      })),
    };
    if (!summary.latestWritten) summary.latestWritten = observation;
    else summary.earlierWritten = observation;
  }
  const current = summary.latestWritten,
    earlier = summary.earlierWritten;
  // Compare only the two actual latest cases. Do not skip a pending answer,
  // merge different requirements into one misconception, or infer mastery.
  if (
    current &&
    earlier &&
    !current.previousEdition &&
    !earlier.previousEdition &&
    current.outcome !== "pending" &&
    earlier.outcome !== "pending" &&
    Date.parse(current.submittedAt) !== Date.parse(earlier.submittedAt)
  ) {
    if (current.outcome === "complete") {
      if (current.assistance === "hint_or_reference")
        summary.writtenComparison =
          "这次看过提示或解析后，主要内容已经写到了。下一道试着自己完成。";
      else if (current.assistance === "first_answer")
        summary.writtenComparison =
          earlier.outcome === "complete"
            ? "换了一个案情，这次也把主要内容写到了，可以继续往下练。"
            : "上一道还有内容要补；换了一个案情，这次自己把主要内容写到了。";
    } else
      summary.writtenComparison =
        earlier.outcome === "complete"
          ? "上一道主要内容已写到；换了案情，这道还有内容要改或补。"
          : "最近两道案例都有要改或补的内容，可以回看各自的具体问题。";
  }
  const draftId = ids.find((id) => {
    const draft = state.drafts[id];
    return (
      draft &&
      !draft.submittedId &&
      !draft.learningExampleSource &&
      !draft.feedbackRetryPaused &&
      !!(draft.answer.trim() || draft.choice)
    );
  });
  const unattempted = ids.filter(
    (id) =>
      latest.get(id)?.exerciseId !== id &&
      !state.drafts[id]?.feedbackRetryPaused &&
      !state.drafts[id]?.learningExampleSource,
  );
  const freshCases = unattempted.filter(
    (id) =>
      !state.attempts.some(
        (a) =>
          sameCase(id).has(a.exerciseId) && Date.parse(a.submittedAt) <= asOf,
      ) &&
      ![...sameCase(id)].some(
        (related) => state.drafts[related]?.referenceSeen,
      ),
  );
  // After a written gap, let the learner try another case; this is a same-topic
  // choice, not a claim that the next case diagnoses the exact missing reason.
  const nextId =
    draftId ??
    unattempted.find(
      (id) => latest.has(id) && latest.get(id)?.exerciseId !== id,
    ) ??
    (summary.written.needsWork
      ? freshCases.find((id) => exerciseFor(id)?.kind === "subjective")
      : undefined) ??
    freshCases[0] ??
    unattempted[0];
  if (nextId)
    summary.next = {
      questionId: nextId,
      title: exerciseFor(nextId)!.title,
      label: draftId
        ? "接着上次的草稿"
        : summary.answered
          ? freshCases.includes(nextId)
            ? "换一道题练练"
            : "继续这组练习"
          : "开始练习",
      reason: draftId
        ? "上次写到一半，可以接着答。"
        : latest.has(nextId) && latest.get(nextId)?.exerciseId !== nextId
          ? "这道题的设问和要求已更新，可以结合上次的讲解再答一次。"
          : summary.answered
            ? freshCases.includes(nextId)
              ? `围绕“${topic.title}”换个案情，再试试自己判断。`
              : "接着完成这组还没答过的题。"
            : "先做一道题，看看这个知识点怎么用。",
    };
  return summary;
}

export function projectChapterLearning(
  state: FaultProgress,
  chapterId: string,
) {
  const chapter = chapterFor(chapterId);
  if (!chapter) return null;
  const topics = chapter.topicIds.flatMap((id) => {
    const topic = projectTopicLearning(state, id);
    return topic ? [topic] : [];
  });
  return {
    chapter,
    topics,
    answered: topics.reduce((n, t) => n + t.answered, 0),
    total: topics.reduce((n, t) => n + t.total, 0),
    practiced: topics.filter((t) => t.answered > 0).length,
    viewed: topics.filter((t) => t.viewed).length,
  };
}

/** User-triggered navigation only. Recheck the proposed target against current
 * records and preserve drafts, original answers and feedback byte for byte. */
export function prepareTopicLearningNext(
  state: FaultProgress,
  topicId: string,
  questionId: string,
  at: string,
) {
  if (projectTopicLearning(state, topicId)?.next?.questionId !== questionId)
    return null;
  const q = exerciseFor(questionId);
  if (!q || !chapterForTopic(topicId)) return null;
  const next = initializePractice(state);
  return visitPractice(
    {
      ...next,
      practice: {
        ...next.practice!,
        mode: q.kind,
        ended: { ...next.practice!.ended, [q.kind]: false },
      },
    },
    questionId,
    at,
  );
}
