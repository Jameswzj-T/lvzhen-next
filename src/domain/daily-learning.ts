import { exerciseFor, exerciseRevision } from "../content/fault-catalog";
import { corePracticeSubjects } from "../content/core-practice-sections";
import { assessmentPaper } from "../content/assessment-papers";
import { assessmentRunHref } from "../content/civil-integrated-practice";
import {
  practiceSubjectInfo,
  practiceSubject,
  practiceTopic,
  subjectPracticeQueues,
} from "../content/practice-set";
import { hasSeenPracticeReference } from "./reference-exposure";
import {
  projectLearningProfile,
  learningQuestionHref,
  type LearningProfile,
} from "./learning-profile";
import {
  learningPreferencesSchema,
  type LearningPreferences,
  type DailyLearningPlan,
} from "./daily-learning-schema";
import type { FaultProgress } from "./fault-progress";

export const learningDay = (at: string) => {
  const date = new Date(at);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};
export const learningPlanScopeLabel = (prefs: LearningPreferences) =>
  prefs.subject === "all" ? "全科" : practiceSubjectInfo(prefs.subject).label;
export function buildDailyLearningPlan(
  state: FaultProgress,
  preferences: LearningPreferences,
  at: string,
  existingProfile?: LearningProfile,
): DailyLearningPlan {
  const prefs = learningPreferencesSchema.parse(preferences),
    profile = existingProfile ?? projectLearningProfile(state, at);
  const subjects =
    prefs.subject === "all" ? [...corePracticeSubjects] : [prefs.subject];
  const allowed = new Set<string>(subjects),
    used = new Set<string>();
  const items: DailyLearningPlan["items"] = [];
  const maximum = prefs.minutes === 10 ? 2 : prefs.minutes === 20 ? 3 : 4;
  const add = (
    questionId: string,
    kind: DailyLearningPlan["items"][number]["kind"],
    reason: string,
    href?: string,
    title?: string,
    originRunId?: string,
  ) => {
    const q = exerciseFor(questionId);
    if (!q || used.has(questionId) || items.length >= maximum) return;
    const latest = profile.questions.find(
      (row) => row.questionId === questionId,
    )?.latest;
    used.add(questionId);
    items.push({
      id: `${kind}:${questionId}`,
      questionId,
      revision: exerciseRevision(questionId),
      title: title ?? q.title,
      href: href ?? learningQuestionHref(state, questionId),
      kind,
      reason,
      baselineAttemptId: latest?.attempt.id ?? null,
      skipped: false,
      ...(originRunId ? { originRunId } : {}),
    });
  };
  // Continue an unfinished paper as one task. Other questions and knowledge labels
  // are not suggested alongside it, so the plan does not reveal its test content.
  const openRuns = [...(state.assessments?.runs ?? [])].sort(
    (a, b) =>
      Number(b.id === state.assessments?.activeId) -
      Number(a.id === state.assessments?.activeId),
  );
  for (const run of openRuns) {
    if (run.finishedAt) continue;
    const paper = assessmentPaper(run.paperId);
    const cursor =
      state.assessments?.activeId === run.id
        ? state.assessments.cursor
        : (state.assessments?.cursors?.[run.id] ?? 0);
    const qid = paper?.questionIds[cursor];
    if (!paper || !qid || !allowed.has(practiceSubject(qid) ?? "")) continue;
    add(
      qid,
      "continue",
      "上次的训练还没交卷，接着这一份写。",
      assessmentRunHref(run.id, paper, cursor + 1),
      paper.title,
      run.id,
    );
    return {
      version: 1,
      day: learningDay(at),
      createdAt: at,
      preferences: prefs,
      items,
    };
  }
  const draft = profile.drafts.find((d) => allowed.has(d.subject));
  if (draft)
    add(
      draft.questionId,
      "continue",
      "上次还有没写完的内容，先接着写。",
      draft.href,
    );
  const weakness = profile.questions
    .filter(
      (q) => allowed.has(q.subject) && q.latest.outcome === "needs_practice",
    )
    .sort(
      (a, b) =>
        b.wrongAttempts - a.wrongAttempts ||
        Date.parse(a.latest.attempt.submittedAt) -
          Date.parse(b.latest.attempt.submittedAt),
    )[0];
  if (weakness)
    add(
      weakness.questionId,
      "review",
      weakness.latest.points[0]
        ? `上次“${weakness.latest.points[0].label}”还没答到位，回看后再写一次。`
        : "上次这道题还没答到位，核对理由后再练一次。",
      weakness.latest.href,
    );
  const topicFirst = weakness?.topicId;
  const subjectCandidates = subjects.map((subject) => {
    const queues = subjectPracticeQueues(subject);
    const ordered: string[] = [];
    for (
      let i = 0;
      i < Math.max(queues.objective.length, queues.subjective.length);
      i++
    ) {
      if (queues.objective[i]) ordered.push(queues.objective[i]);
      if (queues.subjective[i]) ordered.push(queues.subjective[i]);
    }
    return ordered;
  });
  const candidates: string[] = [];
  for (
    let index = 0;
    index < Math.max(...subjectCandidates.map((rows) => rows.length), 0);
    index++
  )
    for (const rows of subjectCandidates)
      if (rows[index]) candidates.push(rows[index]);
  if (topicFirst)
    candidates.sort(
      (a, b) =>
        Number(practiceTopic(b).id === topicFirst) -
        Number(practiceTopic(a).id === topicFirst),
    );
  for (const id of candidates) {
    if (items.length >= maximum) break;
    if (used.has(id) || hasSeenPracticeReference(state, id)) continue;
    add(
      id,
      "practice",
      "这道题还没有本案作答或参考记录，先自己判断，再看讲解。",
    );
  }
  if (!items.length) {
    const assisted = profile.questions.find(
      (q) =>
        allowed.has(q.subject) &&
        q.latest.outcome === "answered_well" &&
        q.latest.support !== "independent",
    );
    if (assisted)
      add(
        assisted.questionId,
        "review",
        "上次是在提示或同案练习后答到的，可以自己再试一次。",
        assisted.latest.href,
      );
  }
  return {
    version: 1,
    day: learningDay(at),
    createdAt: at,
    preferences: prefs,
    items,
  };
}

export function dailyLearningProgress(
  plan: DailyLearningPlan,
  state: FaultProgress,
  at = new Date().toISOString(),
) {
  const items = plan.items.map((item) => {
    const run = item.originRunId
      ? state.assessments?.runs.find((r) => r.id === item.originRunId)
      : undefined;
    const paper = run && assessmentPaper(run.paperId);
    const available =
      !!exerciseFor(item.questionId) &&
      exerciseRevision(item.questionId) === item.revision &&
      (!item.originRunId ||
        !!(
          paper &&
          paper.questionIds.includes(item.questionId) &&
          run?.revision === paper.revision
        ));
    const completed = item.originRunId
      ? !!(
          run?.finishedAt &&
          // The snapshot was created while this exact run was open. A timed
          // paper may settle later using its earlier deadline as finishedAt.
          Date.parse(run.finishedAt) <= Date.parse(at)
        )
      : state.attempts.some(
          (a) =>
            a.exerciseId === item.questionId &&
            a.revision === item.revision &&
            a.id !== item.baselineAttemptId &&
            !a.learningExampleSource &&
            // A pre-existing event at the same millisecond is not proof of a new submission.
            Date.parse(a.submittedAt) > Date.parse(plan.createdAt) &&
            Date.parse(a.submittedAt) <= Date.parse(at),
        );
    // The plan is a daily snapshot, but its continuation is a live position.
    // An explicit old question number would reset the run's durable cursor.
    const href =
      available && run && paper && !run.finishedAt
        ? assessmentRunHref(run.id, paper)
        : item.href;
    return { ...item, href, available, completed };
  });
  return {
    items,
    completed: items.filter((i) => i.completed).length,
    skipped: items.filter((i) => i.skipped && !i.completed).length,
    remaining: items.filter((i) => i.available && !i.completed && !i.skipped)
      .length,
  };
}
export function ensureDailyLearningPlan(
  state: FaultProgress,
  preferences: LearningPreferences,
  at: string,
) {
  if (
    state.dailyLearningPlan?.day === learningDay(at) &&
    state.learningPreferences &&
    state.dailyLearningPlan.preferences.minutes === preferences.minutes &&
    state.dailyLearningPlan.preferences.subject === preferences.subject
  )
    return state;
  return {
    ...state,
    learningPreferences: preferences,
    dailyLearningPlan: buildDailyLearningPlan(state, preferences, at),
  };
}
export function changeLearningPreferences(
  state: FaultProgress,
  raw: unknown,
  at: string,
): FaultProgress {
  const preferences = learningPreferencesSchema.parse(raw);
  const current = { ...state, learningPreferences: preferences };
  return {
    ...current,
    dailyLearningPlan: buildDailyLearningPlan(current, preferences, at),
  };
}
export function skipDailyLearningItem(
  state: FaultProgress,
  itemId: string,
  at: string,
): FaultProgress {
  const plan = state.dailyLearningPlan;
  if (
    !plan ||
    plan.day !== learningDay(at) ||
    !plan.items.some((i) => i.id === itemId)
  )
    return state;
  return {
    ...state,
    dailyLearningPlan: {
      ...plan,
      items: plan.items.map((i) =>
        i.id === itemId ? { ...i, skipped: !i.skipped } : i,
      ),
    },
  };
}
