import { criminalProcedureProofQuestion } from "../content/criminal-procedure-proof";
import { exerciseFor, exerciseRevision } from "../content/fault-catalog";
import {
  practiceSubject,
  practiceTopic,
  subjectPracticeQueues,
} from "../content/practice-set";
import {
  validateUnitFeedbackResult,
  type UnitFeedbackResult,
} from "../evaluation/unit-feedback-contract";
import { submittedFeedbackSchema } from "./submitted-feedback";
import { directTransferLink } from "./direct-learning-transfer";
import { practiceReferenceQuestionIds } from "./reference-exposure";
import type { FaultProgress } from "./fault-progress";
import type { TeacherLearningRecords } from "./teacher-learning-advice";

export type DirectLearningAdvice = {
  text: string;
  resultId: string;
  answerId: string;
  contentId: string;
  scope: "same_question_same_revision_local_only";
  currentWithSupport: boolean | "unknown";
  previous?: { answerId: string; resultId: string };
  changedPointIds: string[];
  repeatedPointIds: string[];
  retryFocus?: {
    criterionId: string;
    label: string;
    // Exact saved model explanation, not a new answer or a semantic repair.
    explanation: string;
  };
  retryClarification?: string;
  /** Presentation only: the same short cue on the result and rewrite pages. */
  retryReminder?: string;
  nextQuestion?: {
    id: string;
    title: string;
    href: string;
    reason?: string;
    basis?: "weakness_transfer" | "same_topic" | "prior_same_topic";
    sourcePointIds?: string[];
  };
  transfer?: {
    sourceAnswerId: string;
    sourceResultId: string;
    sourceQuestionId: string;
    focus: string;
    currentPointIds: string[];
    outcome: "supported_this_time" | "needs_work";
    // Only target criteria were tested; a contrasting positive case cannot
    // establish that the earlier misconception has been corrected.
    sourceMisconceptionResolved: false;
  };
};

type LearningRecords = TeacherLearningRecords &
  Partial<Pick<FaultProgress, "drafts" | "practice">>;

export function directRetryReminder(labels: readonly string[]): string | null {
  const focus = [
    ...new Set(labels.map((label) => label.trim()).filter(Boolean)),
  ]
    .slice(0, 2)
    .map((label) => `“${label}”`);
  return focus.length
    ? `先核对${focus.join("和")}，再用自己的话完整重答；原答保留。`
    : null;
}

const pointShape = (
  points: readonly Pick<
    UnitFeedbackResult["view"]["points"][number],
    "id" | "label" | "meaning" | "acceptable" | "boundary"
  >[],
) =>
  points.map((p) => ({
    id: p.id,
    label: p.label,
    meaning: p.meaning,
    acceptable: p.acceptable,
    boundary: p.boundary,
  }));
export function checkedDirectLearningFeedback(
  records: LearningRecords,
  a: LearningRecords["attempts"][number],
  before?: number,
) {
  const q = exerciseFor(a.exerciseId);
  const rows = (records.submittedFeedback ?? []).filter(
    (r) => r.attemptId === a.id,
  );
  if (
    !q ||
    q.kind !== "subjective" ||
    a.choice ||
    exerciseRevision(q.id) !== a.revision ||
    records.attempts.filter((x) => x.id === a.id).length !== 1 ||
    rows.length !== 1 ||
    !Number.isFinite(Date.parse(a.submittedAt))
  )
    return null;
  const parsed = submittedFeedbackSchema.safeParse(rows[0]);
  if (!parsed.success) return null;
  const row = parsed.data,
    r = row.result,
    v = r.view;
  if (
    row.id !== `submitted:${a.id}:${r.id}` ||
    row.questionId !== a.exerciseId ||
    row.revision !== a.revision ||
    row.answer !== a.answer ||
    row.choice ||
    r.source !== "real_provider" ||
    r.purpose !== "practice" ||
    r.sourceTeacher ||
    v.weightedScore ||
    (v.teachingStyle !== "direct-learner-v1" &&
      v.teachingStyle !== "direct-overall-v2" &&
      v.teachingStyle !== "direct-overall-v3") ||
    v.facts !== q.facts ||
    v.prompt !== q.prompt ||
    // Field order in an authored object is not part of the criterion contract.
    // Canonicalize both sides while preserving criterion order and exact text.
    JSON.stringify(pointShape(v.points)) !==
      JSON.stringify(pointShape(q.criteria ?? [])) ||
    Date.parse(row.observedAt) < Date.parse(a.submittedAt) ||
    Date.parse(r.createdAt) < Date.parse(a.submittedAt) ||
    Date.parse(r.createdAt) > Date.parse(row.observedAt) ||
    (before !== undefined && Date.parse(row.observedAt) >= before)
  )
    return null;
  return row;
}
const settled = (r: UnitFeedbackResult) =>
  r.view.status === "assessed" &&
  r.view.points.length > 0 &&
  !r.view.points.some((p) => p.status === "uncertain") &&
  !r.pointReviews?.some((p) => p.state === "needs_review");

// Supported correct rewrites do not replace the earlier reason for trying a
// different case. Stop at independent success or any gap in verified feedback;
// never jump across a pending answer to retrieve a more convenient old error.
function savedDirectWeakness(
  records: LearningRecords,
  latest: LearningRecords["attempts"][number],
  before?: number,
): ReturnType<typeof checkedDirectLearningFeedback> {
  let current = latest;
  let cutoff = before;
  let contentId: string | undefined;
  const history = records.attempts
    .filter((a) => a.exerciseId === latest.exerciseId)
    .sort((a, b) => Date.parse(b.submittedAt) - Date.parse(a.submittedAt));
  while (true) {
    const row = checkedDirectLearningFeedback(records, current, cutoff);
    if (
      !row ||
      !settled(row.result) ||
      (contentId !== undefined && row.result.view.contentId !== contentId) ||
      history.filter(
        (a) => Date.parse(a.submittedAt) === Date.parse(current.submittedAt),
      ).length !== 1
    )
      return null;
    contentId = row.result.view.contentId;
    if (row.result.view.points.some((p) => p.status !== "covered")) return row;
    if (
      !current.referenceSeenBeforeAnswer &&
      !current.hintUsed &&
      !current.feedbackRetry
    )
      return null;
    const submittedAt = Date.parse(current.submittedAt);
    const previous = history.find(
      (a) => Date.parse(a.submittedAt) < submittedAt,
    );
    if (!previous) return null;
    cutoff = submittedAt;
    current = previous;
  }
}

/** Read compatible saved events locally. This is a comparison of feedback, not a
 * new judgment, model request, score, or stored mastery state. */
export function directLearningAdvice(
  raw: UnitFeedbackResult | null,
  records?: LearningRecords,
): DirectLearningAdvice | null {
  if (!raw || !records) return null;
  try {
    const result = validateUnitFeedbackResult(raw);
    const v = result.view;
    if (
      result.source !== "real_provider" ||
      (v.teachingStyle !== "direct-learner-v1" &&
        v.teachingStyle !== "direct-overall-v2" &&
        v.teachingStyle !== "direct-overall-v3") ||
      result.sourceTeacher ||
      v.weightedScore
    )
      return null;
    const originals = records.attempts.filter((a) => a.id === v.answerId);
    if (originals.length !== 1) return null;
    const current = originals[0];
    const q = exerciseFor(current.exerciseId);
    if (
      !q ||
      q.kind !== "subjective" ||
      current.choice ||
      current.answer !== v.originalText ||
      current.exerciseId !== v.questionId ||
      current.revision !== v.questionRevision ||
      exerciseRevision(q.id) !== current.revision ||
      !Number.isFinite(Date.parse(current.submittedAt))
    )
      return null;
    if (
      records.attempts.some(
        (a) =>
          a.id !== current.id &&
          a.exerciseId === current.exerciseId &&
          a.revision === current.revision &&
          Date.parse(a.submittedAt) > Date.parse(current.submittedAt),
      )
    )
      return null;
    function saved(a: typeof current) {
      const row = checkedDirectLearningFeedback(records!, a);
      return row?.result.view.contentId === v.contentId ? row : null;
    }
    const savedCurrent = saved(current);
    if (
      !savedCurrent ||
      JSON.stringify(savedCurrent.result) !== JSON.stringify(result)
    )
      return null;
    // A local review/uncertainty excludes only that point. Do not turn a
    // clarification or a failed result into an instruction to correct an error.
    const retryPoints =
      v.status === "assessed" && !v.clarification
        ? v.points.filter(
            (p) =>
              ["contradicted", "missing", "partial"].includes(p.status) &&
              !!p.explanation.trim() &&
              !result.pointReviews?.some((r) => r.criterionId === p.id) &&
              p.quotes.every(
                (quote) => !!quote.trim() && current.answer.includes(quote),
              ),
          )
        : [];
    const retryPoint = retryPoints[0];
    const retryReminder = directRetryReminder(retryPoints.map((p) => p.label));
    const priorOriginals = records.attempts
      .filter(
        (a) =>
          a.id !== current.id &&
          a.exerciseId === current.exerciseId &&
          a.revision === current.revision &&
          !a.choice &&
          Number.isFinite(Date.parse(a.submittedAt)) &&
          Date.parse(a.submittedAt) < Date.parse(current.submittedAt),
      )
      .sort((a, b) => Date.parse(b.submittedAt) - Date.parse(a.submittedAt));
    const priorOriginal = priorOriginals[0];
    let prior =
      priorOriginal &&
      records.attempts.filter((a) => a.id === priorOriginal.id).length === 1
        ? saved(priorOriginal)
        : null;
    if (
      prior &&
      (Date.parse(prior.observedAt) > Date.parse(current.submittedAt) ||
        prior.result.view.status !== "assessed" ||
        prior.result.view.points.some((p) => p.status === "uncertain") ||
        prior.result.pointReviews?.some((p) => p.state === "needs_review"))
    )
      prior = null;
    const supported =
      current.referenceSeenBeforeAnswer ||
      current.hintUsed ||
      !!current.feedbackRetry;
    const support: boolean | "unknown" = supported
      ? true
      : current.referenceSeenBeforeAnswer === false &&
          current.hintUsed === false
        ? false
        : "unknown";
    const pending =
      v.status !== "assessed" ||
      !v.points.length ||
      v.points.some((p) => p.status === "uncertain") ||
      result.pointReviews?.some((p) => p.state === "needs_review");
    const weak = v.points.filter((p) => p.status !== "covered");
    const previousWeak =
      prior?.result.view.points.filter((p) => p.status !== "covered") ?? [];
    const changed = pending
      ? []
      : previousWeak
          .filter((p) =>
            v.points.some((c) => c.id === p.id && c.status === "covered"),
          )
          .map((p) => p.id);
    const repeated = pending
      ? []
      : weak
          .filter((p) => previousWeak.some((old) => old.id === p.id))
          .map((p) => p.id);
    let text: string;
    let nextQuestion: DirectLearningAdvice["nextQuestion"];
    let transfer: DirectLearningAdvice["transfer"];
    if (!pending) {
      // Only the latest prior answer to a linked other question can provide a
      // weakness. A pending/new unreviewed attempt invalidates older evidence.
      const priorByQuestion = new Map<string, typeof current>();
      for (const a of [...records.attempts].sort(
        (a, b) => Date.parse(b.submittedAt) - Date.parse(a.submittedAt),
      )) {
        if (
          a.exerciseId !== q.id &&
          Date.parse(a.submittedAt) < Date.parse(current.submittedAt) &&
          !priorByQuestion.has(a.exerciseId)
        )
          priorByQuestion.set(a.exerciseId, a);
      }
      for (const a of priorByQuestion.values()) {
        const link = directTransferLink(a.exerciseId, q.id);
        if (!link) continue;
        const row = savedDirectWeakness(
          records,
          a,
          Date.parse(current.submittedAt),
        );
        if (!row) continue;
        const points = link.filter((p) =>
          row.result.view.points.some(
            (v) => v.id === p.fromPointId && v.status !== "covered",
          ),
        );
        if (!points.length) continue;
        transfer = {
          sourceAnswerId: row.attemptId,
          sourceResultId: row.result.id,
          sourceQuestionId: row.questionId,
          focus: points[0].focus,
          sourceMisconceptionResolved: false,
          currentPointIds: points.map((p) => p.toPointId),
          outcome: points.every((p) =>
            v.points.some(
              (v) => v.id === p.toPointId && v.status === "covered",
            ),
          )
            ? "supported_this_time"
            : "needs_work",
        };
        break;
      }
      const subject = practiceSubject(q.id),
        topic = practiceTopic(q.id).id;
      const evidencePoints = weak.length
        ? weak
        : support === true
          ? (savedDirectWeakness(records, current)?.result.view.points.filter(
              (p) => p.status !== "covered",
            ) ?? [])
          : previousWeak;
      const choices = subject
        ? subjectPracticeQueues(subject)
            .subjective.flatMap((id) => {
              const candidate = exerciseFor(id);
              if (
                !candidate ||
                id === q.id ||
                practiceTopic(id).id !== topic ||
                (candidate.caseId ?? candidate.id) === (q.caseId ?? q.id)
              )
                return [];
              // A new transfer case is never claimed unseen when exposure history is absent.
              if (
                (id === "crimpro-confession-partial-corroboration-explain" ||
                  id === "commercial-forfeiture-notice-transfer-explain") &&
                (!records.practice?.viewed ||
                  !records.drafts ||
                  records.drafts[id])
              )
                return [];
              const sameCase = new Set(practiceReferenceQuestionIds(id));
              if (
                records.attempts.some((a) => sameCase.has(a.exerciseId)) ||
                [...sameCase].some((id) => {
                  const d = records.drafts?.[id];
                  return !!(
                    records.practice?.viewed[id] ||
                    d?.hintUsed ||
                    d?.referenceSeen ||
                    d?.answer.trim() ||
                    d?.choice
                  );
                })
              )
                return [];
              const links =
                directTransferLink(q.id, id, true)?.filter((p) =>
                  evidencePoints.some((v) => v.id === p.fromPointId),
                ) ?? [];
              return [{ id, candidate, links }];
            })
            .sort((a, b) => Number(!!b.links.length) - Number(!!a.links.length))
        : [];
      const chosen = choices.find((c) => !weak.length || c.links.length);
      if (chosen && subject)
        nextQuestion = {
          id: chosen.id,
          title: chosen.candidate.title,
          href: `/lab/practice?subject=${encodeURIComponent(subject)}&question=${encodeURIComponent(chosen.id)}`,
          basis: chosen.links.length ? "weakness_transfer" : "same_topic",
          reason: chosen.links.length
            ? weak.length
              ? chosen.links[0].reason
              : chosen.links[0].reason
                  .replace("刚才混淆了", "此前的答案混淆了")
                  .replace("刚才", "此前的答案")
            : "换个案情，试试这道题中的同一知识点。",
          ...(chosen.links.length
            ? { sourcePointIds: chosen.links.map((p) => p.fromPointId) }
            : {}),
        };
    }
    if (pending)
      text = "这次还有待核的地方，先核对依据；暂不把它记成答错或已经改正。";
    else if (weak.length)
      text =
        (repeated.length ? "这个问题上次也出现过，" : "") +
        (nextQuestion
          ? "可以换个案情练这一处，也可以重答当前题。"
          : retryPoint
            ? (retryReminder ?? "按上面的建议核对理由，再完整重答；原答保留。")
            : "按上面的建议改一处理由，再试一次。") +
        (support === true ? "这次是看过提示或反馈后的练习。" : "");
    else if (transfer?.outcome === "supported_this_time")
      text =
        "这道不同案情中的判断答对了。" +
        (support === true ? "这次看过本题提示或反馈。" : "") +
        "可以继续。";
    else
      text =
        (changed.length ? "上次那处问题，这次已经改对。" : "") +
        (support === true
          ? "这次是在看过提示或反馈后作答。下次换一道没看过的题，再试试能不能自己判断。"
          : support === "unknown"
            ? "这份记录没记下作答前是否看过提示。下次可以先不看提示，自己试一次。"
            : nextQuestion
              ? "接着换个案情。"
              : "可以继续后面的练习。");
    // Only existing saved judgments guide the next action. The two opposite
    // cases are not equivalent diagnostic tests of one another's misconception.
    if (!pending && criminalProcedureProofQuestion(q.id)) {
      const focus = (id: string, points: string[]) =>
        id === "crimpro-confession-only-explain"
          ? points.includes(`${id}-application`)
            ? "分清笔录、录音是否只是重复记录同一人的说法，不能拿载体数量代替独立案情证据"
            : "说明为什么只有供述、没有其他证据时，不能据此定罪"
          : points.includes(`${id}-standard`)
            ? "把事实有证据、定案材料依法查实、全案排除合理疑点这三层要求联系到案情"
            : "说明没有有罪供述时，仍要看全案证据是否确实充分";
      const latest = new Map<string, typeof current>();
      for (const a of [...records.attempts].sort(
        (a, b) => Date.parse(b.submittedAt) - Date.parse(a.submittedAt),
      )) {
        if (
          a.exerciseId !== q.id &&
          criminalProcedureProofQuestion(a.exerciseId) &&
          !latest.has(a.exerciseId)
        )
          latest.set(a.exerciseId, a);
      }
      const other = [...latest.values()].flatMap((a) => {
        // A newer unreviewed/incompatible answer invalidates an older result;
        // do not fall back to the older mistake or use a future-dated event.
        if (Date.parse(a.submittedAt) > Date.now()) return [];
        const row = checkedDirectLearningFeedback(records, a);
        return row && settled(row.result) ? [{ a, row }] : [];
      });
      const earlierWeak = other.find((x) =>
        x.row.result.view.points.some((p) => p.status !== "covered"),
      );
      const earlierCorrect = other.find((x) =>
        x.row.result.view.points.every((p) => p.status === "covered"),
      );
      if (weak.length) {
        nextQuestion = undefined;
        text =
          (repeated.length ? "这处问题在前一份答文里也出现过。" : "") +
          "这次先" +
          focus(
            q.id,
            weak.map((p) => p.id),
          ) +
          "。回看「口供与定罪的证据标准」，再用自己的话重答这一问。" +
          (earlierCorrect ? "另一案你答对了；这一问还需要把理由说清楚。" : "") +
          (support === true ? "这次已经看过提示或反馈。" : "");
      } else if (earlierWeak) {
        const previousQuestion = exerciseFor(earlierWeak.a.exerciseId)!;
        const pointIds = earlierWeak.row.result.view.points
          .filter((p) => p.status !== "covered")
          .map((p) => p.id);
        text =
          "这道题的结论和理由都答对了。另一案还有一处理由需要修改，先回到那一问，把两种情况分清楚。" +
          (support === true ? "这次是在看过提示或反馈后作答。" : "");
        nextQuestion = {
          id: previousQuestion.id,
          title: previousQuestion.title,
          href: `/lab/practice?subject=criminal-procedure&question=${encodeURIComponent(previousQuestion.id)}`,
          basis: "prior_same_topic",
          sourcePointIds: pointIds,
          reason:
            "接下来" +
            focus(previousQuestion.id, pointIds) +
            "；旧原答和反馈保留，重答另存。",
        };
      } else if (changed.length) {
        const understood =
          q.id === "crimpro-confession-only-explain"
            ? changed.includes(`${q.id}-application`)
              ? "笔录和录音都来自同一个人的供述，不能算两份独立证据"
              : "只有供述、没有其他证据时，不能据此定罪"
            : changed.includes(`${q.id}-standard`)
              ? "案情事实有证据、定案材料依法查实、全案排除合理疑点，这三层要求都要联系案情判断"
              : "没有有罪供述时，仍要看全案证据是否确实充分";
        text =
          "这次你已经分清了：" +
          understood +
          "。" +
          (support === true
            ? "这是看过提示或反馈后改正的。"
            : support === "unknown"
              ? "这份记录没记下作答前是否看过提示。"
              : "") +
          "下次换一道没看过的题，再试试能不能自己判断。";
      }
    }
    return {
      text,
      resultId: result.id,
      answerId: current.id,
      contentId: v.contentId,
      scope: "same_question_same_revision_local_only",
      currentWithSupport: support,
      ...(prior
        ? { previous: { answerId: prior.attemptId, resultId: prior.result.id } }
        : {}),
      changedPointIds: changed,
      repeatedPointIds: repeated,
      ...(v.status === "needs_clarification" &&
      v.clarification?.trim() &&
      !result.pointReviews?.some((p) => p.state === "needs_review")
        ? { retryClarification: v.clarification }
        : {}),
      ...(retryPoint
        ? {
            ...(retryReminder ? { retryReminder } : {}),
            retryFocus: {
              criterionId: retryPoint.id,
              label: retryPoint.label,
              explanation: retryPoint.explanation,
            },
          }
        : {}),
      ...(nextQuestion ? { nextQuestion } : {}),
      ...(transfer ? { transfer } : {}),
    };
  } catch {
    return null;
  }
}

/** Read the latest saved feedback while rewriting this question. No new
 * relationship or mastery state is persisted. An unreviewed newer attempt
 * prevents falling back to older advice. */
export function directDraftRetryAdvice(
  records: FaultProgress,
): DirectLearningAdvice | null {
  const draft = records.drafts[records.exerciseId];
  if (
    !draft ||
    draft.submittedId ||
    draft.feedbackRetry ||
    draft.feedbackRetryPaused ||
    !draft.referenceSeen
  )
    return null;
  const revision = exerciseRevision(records.exerciseId);
  const originals = records.attempts
    .filter(
      (a) => a.exerciseId === records.exerciseId && a.revision === revision,
    )
    .sort((a, b) => Date.parse(b.submittedAt) - Date.parse(a.submittedAt));
  const latest = originals[0];
  if (!latest || originals[1]?.submittedAt === latest.submittedAt) return null;
  const row = checkedDirectLearningFeedback(records, latest);
  return row ? directLearningAdvice(row.result, records) : null;
}
