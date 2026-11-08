import { exerciseFor, exerciseRevision } from "../content/fault-catalog";
import {
  practiceSubject,
  practiceTopic,
  type PracticeSubject,
} from "../content/practice-set";
import type { FaultProgress, UnitAttempt } from "./fault-progress";
import { projectLearningReview, type ReviewEvent } from "./learning-review";
import { projectReviewFocus } from "./practice-review-focus";
import {
  correctChoices,
  isCorrectChoice,
  validChoice,
  selectedChoices,
  answerLabel,
} from "./objective-answer";

export type ReviewSuggestion = {
  questionId: string;
  revision: string;
  evidenceKey: string;
  title: string;
  topicTitle: string;
  href: string;
  sourceAttemptId: string;
  sourceAt: string;
  sourceText: string;
  reason: string;
  details: { label: string; explanation: string; quotes: string[] }[];
  latestAttemptId: string;
  latestAt: string;
  latestNotice: string;
  phase: "suggested" | "new_evidence" | "needs_check";
};

const assistedTeacher = (event: ReviewEvent) =>
  event.outcome === "supported_this_time" &&
  (event.support === "hint_or_reference" ||
    event.support === "complete_reanswer");

// An assisted correction may still need later practice. Keep its earlier
// specific reason as historical context, without treating the correction as
// wrong or jumping across independent, unreviewed or uncertain work.
function weaknessBeforeAssistedSuccess(events: ReviewEvent[]) {
  if (!events[0] || !assistedTeacher(events[0])) return undefined;
  for (let i = 1; i < events.length; i++) {
    const event = events[i];
    if (Date.parse(event.submittedAt) >= Date.parse(events[i - 1].submittedAt))
      return undefined;
    if (event.outcome === "needs_work") return event;
    if (!assistedTeacher(event)) return undefined;
  }
  return undefined;
}

const assistance = (attempt: UnitAttempt) =>
  [
    attempt.hintUsed ? "提交前记录过提示" : "提交前未记录提示",
    attempt.referenceSeenBeforeAnswer
      ? "提交前已看过参考"
      : "提交前未记录看过参考",
  ].join("；") + "。";

/** Local evidence projection. One current-version question, not a mastery score,
 * scheduled reminder, new model judgment, or automatically generated correction. */
export function projectReviewSuggestions(
  state: FaultProgress,
  subject: PracticeSubject,
): ReviewSuggestion[] {
  const manuallySelected = new Set(
    projectReviewFocus(state)
      .filter(
        (item) =>
          item.questionId &&
          item.questionRevision === exerciseRevision(item.questionId),
      )
      .map((item) => item.questionId),
  );
  const examIds = new Set(
    (state.assessments?.runs ?? []).flatMap((run) =>
      Object.values(run.attemptIds),
    ),
  );
  const result: ReviewSuggestion[] = [];
  const make = (
    questionId: string,
    sourceAttemptId: string,
    latestAttemptId: string,
    sourceEvidence: string | null,
    latestEvidence: string | null,
  ) => {
    const revision = exerciseRevision(questionId);
    const question = exerciseFor(questionId)!;
    return {
      questionId,
      revision,
      title: question.title,
      topicTitle: practiceTopic(questionId).title,
      href: `/lab/practice?subject=${subject}&question=${encodeURIComponent(questionId)}`,
      sourceAttemptId,
      latestAttemptId,
      evidenceKey: JSON.stringify([
        questionId,
        revision,
        sourceAttemptId,
        sourceEvidence,
        latestAttemptId,
        latestEvidence,
      ]),
    };
  };
  for (const group of projectLearningReview(state, subject)) {
    if (manuallySelected.has(group.questionId)) continue;
    const events = group.events.filter(
      (event) => !examIds.has(event.attemptId),
    );
    const latest = events[0];
    const reviewReason = events.find(
      (event) => event.outcome === "needs_work" || assistedTeacher(event),
    );
    const earlierWeakness = weaknessBeforeAssistedSuccess(events);
    const source = earlierWeakness ?? reviewReason;
    if (!latest || !source) continue;
    const weak = source.points.filter((point) => point.needsWork);
    result.push({
      ...make(
        group.questionId,
        source.attemptId,
        latest.attemptId,
        source.resultId ?? null,
        JSON.stringify([
          latest.resultId ?? null,
          latest.outcome,
          latest.support,
        ]),
      ),
      sourceAt: source.submittedAt,
      sourceText: source.originalText,
      reason: earlierWeakness
        ? (latest.support === "complete_reanswer"
            ? "这次是按保存反馈完成的重答，结论和理由已答对。"
            : "这次在提示或参考后答对。") +
          "此前的具体问题保留在下方，供之后复习核对。"
        : source.outcome === "needs_work"
          ? "这道题之前有结论或理由没答到位，可以回看具体反馈，再练一次。"
          : source.support === "complete_reanswer"
            ? "这次是按保存反馈完成的重答；可以另选时间再练，不把辅助后的表现当成独立掌握。"
            : "这次在提示或参考后作答；可以选择再练，看看没有这些帮助时能否说明理由。",
      details: weak.map((point) => ({
        label: point.label,
        explanation: point.explanation,
        quotes: point.quotes,
      })),
      latestAt: latest.submittedAt,
      latestNotice: `${latest.attemptId !== source.attemptId ? "此后另有一次保存作答。" : ""}${latest.notice}`,
      phase:
        latest.outcome === "pending"
          ? "needs_check"
          : events.some(
                (event) =>
                  event.attemptId !== latest.attemptId &&
                  (event.outcome === "needs_work" || assistedTeacher(event)),
              ) || latest.attemptId !== source.attemptId
            ? "new_evidence"
            : "suggested",
    });
  }
  const objective = new Map<string, UnitAttempt[]>();
  for (const attempt of state.attempts) {
    const q = exerciseFor(attempt.exerciseId);
    if (
      !q ||
      q.kind !== "objective" ||
      practiceSubject(q.id) !== subject ||
      manuallySelected.has(q.id) ||
      examIds.has(attempt.id) ||
      attempt.revision !== exerciseRevision(q.id) ||
      !correctChoices(q).length
    )
      continue;
    const rows = objective.get(q.id) ?? [];
    rows.push(attempt);
    objective.set(q.id, rows);
  }
  for (const [questionId, attempts] of objective) {
    const q = exerciseFor(questionId)!;
    const events = attempts
      .sort(
        (a, b) =>
          Date.parse(b.submittedAt) - Date.parse(a.submittedAt) ||
          b.id.localeCompare(a.id),
      )
      .slice(0, 20);
    const latest = events[0];
    const source = events.find(
      (a) =>
        validChoice(q, a.choice) &&
        (!isCorrectChoice(q, a.choice) ||
          a.hintUsed ||
          a.referenceSeenBeforeAnswer),
    );
    if (!latest || !source) continue;
    const valid = validChoice(q, latest.choice);
    const wrong = !isCorrectChoice(q, source.choice);
    const choiceText = selectedChoices(source.choice)
      .map(
        (id) =>
          `${answerLabel([id])}．${q.options!.find((o) => o.id === id)!.text}`,
      )
      .join("；");
    result.push({
      ...make(
        questionId,
        source.id,
        latest.id,
        null,
        JSON.stringify([
          valid ? isCorrectChoice(q, latest.choice) : null,
          latest.hintUsed,
          latest.referenceSeenBeforeAnswer,
        ]),
      ),
      sourceAt: source.submittedAt,
      sourceText: `保存选择：${choiceText}`,
      reason: wrong
        ? "这次保存的选择与本题参考不一致，可回到题内核对理由。"
        : "这次选对前记录过提示或参考，可以选择再练；不将它当作独立掌握。",
      details: [],
      latestAt: latest.submittedAt,
      latestNotice: `${latest.id !== source.id ? "此后另有一次保存作答。" : ""}${
        valid
          ? `最新保存选择${isCorrectChoice(q, latest.choice) ? "与本题参考一致" : "与本题参考不一致"}。${assistance(latest)}`
          : "最新保存选择暂不能按当前选项核对，不记为答错。"
      }`,
      phase: !valid
        ? "needs_check"
        : latest.id !== source.id ||
            events.some(
              (a) =>
                a.id !== latest.id &&
                validChoice(q, a.choice) &&
                (!isCorrectChoice(q, a.choice) ||
                  a.hintUsed ||
                  a.referenceSeenBeforeAnswer),
            )
          ? "new_evidence"
          : "suggested",
    });
  }
  return result.sort(
    (a, b) =>
      Date.parse(b.latestAt) - Date.parse(a.latestAt) ||
      a.questionId.localeCompare(b.questionId),
  );
}
