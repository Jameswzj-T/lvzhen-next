import {
  validateUnitFeedbackResult,
  type UnitFeedbackResult,
} from "../evaluation/unit-feedback-contract";
import publicBindings from "../evaluation/unit-feedback-cl14-bindings.json";
import {
  TEACHER_FEEDBACK_VERSION,
  TEACHER_QUESTION_ID,
  TEACHER_QUESTION_REVISION,
  TEACHER_GUIDE_CONTENT_ID,
  TEACHER_GUIDE_REFERENCE_FINGERPRINT,
  type TeacherFeedbackView,
  type TeacherHistoryContext,
} from "./teacher-feedback-contract";

const question = publicBindings[TEACHER_QUESTION_ID];
const guides: Record<string, string> = {
  [`${TEACHER_QUESTION_ID}-p1`]:
    "把身份和违规与犯罪成立分开说明：除了航空人员违规，还要由违规导致重大飞行事故并造成严重后果。用自己的话表达即可，不必背条号或固定句子。",
  [`${TEACHER_QUESTION_ID}-p2`]:
    "把规则落到这次航班：题干已经查明正常返航、没有伤亡损害或其他严重后果，因此不能只凭违规肯定本条成立。不必抄完塔台过程，也不要求回答其他责任或刑期。",
};
const reference =
  "该理由不能成立。本条还要求违规致使重大飞行事故并造成严重后果，航空人员身份与违规本身不能替代这些条件。本案已完整核实正常返航且无人员、财产损害或其他严重后果，不能仅凭违规肯定本条成立。";

export type TeacherFeedbackInput = {
  result: unknown;
  original: {
    questionId: string;
    questionRevision: string;
    answerId: string;
    originalText: string;
    /** The caller's current validated task identity, not a second request. */
    taskId: string;
    contentId: string;
  };
  history?: TeacherHistoryContext | null;
  /** Explicit independent reading, kept beside the immutable result. A review
   * is valid only for the entire exact normalized result it actually inspected;
   * it is never inferred from explanation keywords or an answer's wording. */
  independentReview?: {
    source: "codex_independent";
    reviewedResult: unknown;
    points: { criterionId: string; state: "needs_review"; note: string }[];
  };
  /** Explicit standalone synthetic previews only; production defaults to false. */
  syntheticPreview?: boolean;
};

function currentResult(input: TeacherFeedbackInput): UnitFeedbackResult | null {
  try {
    const original = input.original;
    if (
      original.questionId !== TEACHER_QUESTION_ID ||
      original.questionRevision !== TEACHER_QUESTION_REVISION ||
      question.contentId !== TEACHER_GUIDE_CONTENT_ID ||
      question.referenceFingerprint !== TEACHER_GUIDE_REFERENCE_FINGERPRINT ||
      original.contentId !== question.contentId
    )
      return null;
    const result = validateUnitFeedbackResult(input.result, original);
    const view = result.view;
    if (
      view.title !== question.title ||
      view.facts !== question.facts ||
      view.prompt !== question.prompt ||
      view.weightedScore ||
      (view.points.length &&
        (view.points.length !== question.criteria.length ||
          view.points.some((point, index) => {
            const criterion = question.criteria[index];
            return (
              point.id !== criterion.id ||
              point.label !== criterion.label ||
              point.meaning !== criterion.meaning ||
              point.acceptable !== criterion.acceptable ||
              point.boundary !== criterion.boundary
            );
          })))
    )
      return null;
    return result;
  } catch {
    return null;
  }
}

function currentHistory(
  input: TeacherFeedbackInput,
): TeacherFeedbackView["history"] {
  const h = input.history;
  if (
    !h ||
    h.questionId !== input.original.questionId ||
    h.questionRevision !== input.original.questionRevision ||
    h.attemptId !== input.original.answerId ||
    h.countScope !== "same_question_same_revision_through_current_attempt" ||
    !["saved_local_records", "synthetic_fixture"].includes(h.source) ||
    ![true, false, "unknown"].includes(h.currentWithSupport) ||
    !Array.isArray(h.evidenceAttemptIds) ||
    (h.source === "synthetic_fixture" && !input.syntheticPreview)
  )
    return null;
  const counts = [
    h.attemptCount,
    h.assessedAttemptCount,
    h.incorrectAttemptCount,
    h.partialAttemptCount,
    h.correctAttemptCount,
    h.unreviewedAttemptCount,
  ];
  if (
    counts.some((n) => !Number.isSafeInteger(n) || n < 0) ||
    h.attemptCount < 1 ||
    h.assessedAttemptCount + h.unreviewedAttemptCount !== h.attemptCount ||
    h.incorrectAttemptCount + h.partialAttemptCount + h.correctAttemptCount !==
      h.assessedAttemptCount ||
    h.evidenceAttemptIds.length !== h.attemptCount ||
    h.evidenceAttemptIds.some((id) => typeof id !== "string" || !id.trim()) ||
    new Set(h.evidenceAttemptIds).size !== h.attemptCount ||
    !h.evidenceAttemptIds.includes(h.attemptId)
  )
    return null;
  let text =
    `本题同版本已保存${h.attemptCount}次作答，其中${h.assessedAttemptCount}次有可核对的反馈。` +
    (h.assessedAttemptCount
      ? `这些已保存反馈中，${h.incorrectAttemptCount}次判断错误，${h.partialAttemptCount}次部分正确，${h.correctAttemptCount}次符合本题要求。`
      : "目前还不能统计错过几次。") +
    (h.unreviewedAttemptCount
      ? `另有${h.unreviewedAttemptCount}次尚未取得可采用的判断，不算作答错。`
      : "");
  text +=
    h.currentWithSupport === true
      ? "本次是在看过提示、参考或已有反馈后作答；即使答对，也不能据此说已独立掌握。"
      : h.currentWithSupport === "unknown"
        ? "是否使用过提示的记录不足，暂不判断独立掌握。"
        : "这只是本次表现，尚不能据此认定永久掌握。";
  return { text, context: structuredClone(h) };
}

/** A one-question reading projection. It does not evaluate answer meaning,
 * infer missing clauses, repair model prose, rewrite records, or call a provider.
 * Exact quotes and known review holds are validated; unknown semantic errors
 * still require independent review of the complete original and explanation. */
export function buildTeacherFeedback(
  input: TeacherFeedbackInput,
): TeacherFeedbackView | null {
  const result = currentResult(input);
  if (!result) return null;
  const view = result.view;
  const preview = input.syntheticPreview === true;
  const adoptableSource =
    result.source === "real_provider" && result.purpose === "practice";
  const independent = input.independentReview;
  if (independent) {
    try {
      const reviewed = validateUnitFeedbackResult(independent.reviewedResult);
      if (
        independent.source !== "codex_independent" ||
        JSON.stringify(reviewed) !== JSON.stringify(result) ||
        independent.points.length > view.points.length ||
        new Set(independent.points.map((point) => point.criterionId)).size !==
          independent.points.length ||
        independent.points.some(
          (point) =>
            point.state !== "needs_review" ||
            !view.points.some((item) => item.id === point.criterionId) ||
            typeof point.note !== "string" ||
            !point.note.trim() ||
            point.note.length > 12000,
        )
      )
        return null;
    } catch {
      return null;
    }
  }
  const held = new Map(
    [...(independent?.points ?? []), ...(result.pointReviews ?? [])]
      .filter((review) => review.state === "needs_review")
      .map((review) => [review.criterionId, review.note]),
  );
  const assessed = view.status === "assessed" && view.points.length === 2;
  const hasPointJudgments =
    (view.status === "assessed" || view.status === "needs_clarification") &&
    view.points.length === 2;
  const pending = view.points.filter(
    (point) =>
      !hasPointJudgments ||
      (!adoptableSource && !preview) ||
      point.status === "uncertain" ||
      held.has(point.id),
  );
  const pendingIds = new Set(pending.map((point) => point.id));
  const usable = view.points.filter((point) => !pendingIds.has(point.id));
  const strengths = usable
    .filter((point) => point.status === "covered")
    .map((point) => ({
      criterionId: point.id,
      quotes: [...point.quotes],
      explanation: point.explanation,
    }));
  const improvements = [...usable]
    .filter((point) => point.status !== "covered")
    .sort(
      (a, b) =>
        Number(b.status === "contradicted") -
        Number(a.status === "contradicted"),
    )
    .slice(0, 2)
    .map((point) => ({
      criterionId: point.id,
      quotes: [...point.quotes],
      explanation: point.explanation,
      action: guides[point.id],
      actionSource: "versioned_question_teaching_guide" as const,
    }));
  const allMissing =
    assessed &&
    usable.length === 2 &&
    usable.every((point) => point.status === "missing");
  const needsReview = !assessed || pending.length > 0 || allMissing;
  const kind = needsReview
    ? "needs_review"
    : usable.some((point) => point.status === "contradicted")
      ? "incorrect"
      : improvements.length
        ? "partial"
        : "correct";
  const text = {
    correct: "按本题要求，这次回答正确。",
    partial: "这次回答部分正确。",
    incorrect: "这次回答有需要改正的错误。",
    needs_review: "这份反馈还有待核之处，暂不能确定整题对错。",
  }[kind];
  // A separately supplied current hold has not been incorporated into the saved
  // history helper's counts. Do not show its earlier optimistic count as if this
  // current result were already settled, and do not silently recalculate totals.
  const history = independent?.points.length ? null : currentHistory(input);
  const reason = needsReview
    ? (view.clarification ??
      (allMissing
        ? "本次还没有可核对的规则或案情分析，不能仅凭这一答文认定你理解错误。可以对照本题参考，重新说明理由。"
        : "部分判断或依据尚待核对；已得到支持的内容仍保留在下方。"))
    : kind === "correct"
      ? "你对事故后果条件的说明，以及与本案事实的联系，都符合这道小问的要求。"
      : kind === "incorrect"
        ? "下面引用的判断与本题的事故后果条件不一致，请看原文与具体解释。"
        : usable[1]?.status === "covered"
          ? "你已联系了安全返航和无损害事实；还要说明为什么仅有身份和违规并不足够。"
          : usable[0]?.status === "covered"
            ? "你已说明事故后果条件；还要把这一规则与题干中的航班结果联系起来。"
            : "这份反馈认为规则或与本案的联系还需说清，下面分别引用原答说明具体区别。";
  const nextStep: TeacherFeedbackView["nextStep"] = needsReview
    ? {
        kind: "review_evidence",
        text: "先对照下面保留的原答与反馈，核清待定之处；现在不把它算成你的错误。",
      }
    : improvements.length
      ? {
          kind: "whole_question_retry",
          text: "按上述改法，再完整回答这道小问。旧原答保留，新答是否改正由新的兼容反馈判断。",
        }
      : history?.context.currentWithSupport === false
        ? {
            kind: "continue_topic",
            text: "这次已经答到本题要求，可以继续同知识点的下一题；不据一次表现写永久掌握。",
          }
        : {
            kind: "independent_revisit",
            text: "过一段时间，不看这次提示和参考再完整答一次，检查能否独立说明规则与事实。",
          };
  return {
    version: TEACHER_FEEDBACK_VERSION,
    binding: {
      questionId: view.questionId,
      questionRevision: view.questionRevision,
      answerId: view.answerId,
      resultId: result.id,
      contentId: view.contentId,
      taskId: view.taskId,
    },
    title: view.title,
    originalText: view.originalText,
    provenance:
      adoptableSource && !preview
        ? "model_feedback"
        : "offline_synthetic_preview",
    sourceNotice: preview
      ? "离线虚构反馈演示；以下判断和复盘记录不是实际模型回执或真人学习记录。"
      : adoptableSource
        ? null
        : "此记录不是可采用的真实新答评阅；原答保留，暂不判断对错。",
    judgment: {
      kind,
      text,
      reason,
    },
    strengths,
    improvements,
    pending: pending.map((point) => ({
      criterionId: point.id,
      quotes: [...point.quotes],
      explanation: point.explanation,
      ...(held.has(point.id) ? { reviewNote: held.get(point.id) } : {}),
    })),
    reference: {
      label: "本题参考写法，供比较，不是你的原答",
      text: reference,
      source: "question_reference",
    },
    history,
    historyNotice: history
      ? null
      : "当前没有可核对的本题同版本记录，暂不能统计错过几次，也不判断独立掌握。",
    nextStep,
    rawPoints: view.points.map((point) => ({
      criterionId: point.id,
      status: point.status,
      quotes: [...point.quotes],
      explanation: point.explanation,
    })),
  };
}
