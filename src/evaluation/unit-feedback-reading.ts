import type { UnitFeedbackView } from "./unit-feedback";
import type { UnitFeedbackResult } from "./unit-feedback-contract";

export type UnitFeedbackLearningSummary = {
  questionId: string;
  questionRevision: string;
  contentId: string;
  taskId: string;
  answerId: string;
  judgment: string;
  judgmentSource: "model_status" | "codex_independent";
  improvements: {
    criterionId: string;
    text: string;
    source: "requirement" | "model" | "codex_independent";
  }[];
  organizedAnswer: {
    text: string;
    source: "question_reference";
    label: string;
  } | null;
};

type ReadingOptions = {
  reference?: string;
  expectedReferenceFingerprint?: string;
  pointReviews?: UnitFeedbackResult["pointReviews"];
  source?: UnitFeedbackResult["source"];
  purpose?: UnitFeedbackResult["purpose"];
};

const priority = {
  contradicted: 0,
  uncertain: 1,
  missing: 2,
  partial: 3,
  covered: 4,
} as const;

/** A reading projection, not a second evaluation or a change to the saved reply.
 * Suggestions name the existing requirement. They do not assert that its text
 * is absent merely because a model assigned a partial label. */
export function buildUnitFeedbackLearningSummary(
  view: UnitFeedbackView,
  options: ReadingOptions = {},
): UnitFeedbackLearningSummary {
  const held = new Set(
    (options.pointReviews ?? [])
      .filter((row) => row.state === "needs_review")
      .map((row) => row.criterionId),
  );
  const pending = view.status !== "assessed" || !view.points.length;
  const outstanding = view.points
    .filter((point) => point.status !== "covered" || held.has(point.id))
    .map((point, index) => ({ point, index }))
    .sort(
      (a, b) =>
        (held.has(a.point.id) ? 1 : priority[a.point.status]) -
          (held.has(b.point.id) ? 1 : priority[b.point.status]) ||
        a.index - b.index,
    );
  const judgment = pending
    ? view.status === "no_answer"
      ? "还没有可评阅的作答。"
      : "这份反馈还不能判断答得怎样，先保留原答。"
    : held.size || view.points.some((point) => point.status === "uncertain")
      ? "这份反馈有需要核对的地方，先检查下面的要点。"
      : view.points.some((point) => point.status === "contradicted")
        ? "这份反馈认为，有一处判断需要调整。"
        : view.points.every((point) => point.status === "missing")
          ? "这份反馈认为，本题要点还没有说明清楚。"
          : outstanding.length
            ? "这份反馈认为，你已写到部分要点，还需要补清理由。"
            : "这份反馈认为，你已答到本题要点。";
  const improvements = pending
    ? view.clarification
      ? [
          {
            criterionId: view.points[0]?.id ?? "clarification",
            text: view.clarification,
            source: "model" as const,
          },
        ]
      : []
    : outstanding.slice(0, 2).map(({ point }) => {
        const review = options.pointReviews?.find(
          (row) => row.criterionId === point.id,
        );
        return review
          ? {
              criterionId: point.id,
              text: `“${point.label}”仍需核对，请展开本项原反馈与独立审校说明。`,
              source: "codex_independent" as const,
            }
          : {
              criterionId: point.id,
              text: `核对“${point.label}”：${point.meaning}`,
              source: "requirement" as const,
            };
      });
  return {
    questionId: view.questionId,
    questionRevision: view.questionRevision,
    contentId: view.contentId,
    taskId: view.taskId,
    answerId: view.answerId,
    judgment,
    judgmentSource: "model_status",
    improvements,
    // An unchecked reference is never silently adopted as an answer rewrite.
    organizedAnswer: null,
  };
}

async function fingerprint(text: string): Promise<string | null> {
  try {
    if (!globalThis.crypto?.subtle) return null;
    const bytes = await globalThis.crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(text),
    );
    return Array.from(new Uint8Array(bytes), (n) =>
      n.toString(16).padStart(2, "0"),
    ).join("");
  } catch {
    return null;
  }
}

/** One answer voluntarily pasted in the review conversation. Only its digest
 * is shipped. This is an attributed independent reading note, not a generic
 * detector, regrade, provider fix, or a modification to an archived receipt. */
const reviewedFlight = {
  questionId: "cl14-flight-no-serious-result",
  questionRevision: "criminal-special-accidents-2026-10-04.v1",
  contentId: "33f05347959bd613d2241372ded4ab31bae292ed6ce593c3967e0540792fb2ea",
  answerFingerprint:
    "af81d447053cc973fc310706cf8bb379ec8308439cc58620a4ec2262ab8dd6ff",
};

/** Browser-local, no API/provider imports. Reference and the one independent
 * note are both content-bound. Missing WebCrypto preserves a conservative
 * status projection; it never pretends that a source check succeeded. */
export async function prepareUnitFeedbackLearningSummary(
  view: UnitFeedbackView,
  options: ReadingOptions = {},
): Promise<UnitFeedbackLearningSummary> {
  const summary = buildUnitFeedbackLearningSummary(view, options);
  if (
    view.status === "assessed" &&
    options.reference?.trim() &&
    options.expectedReferenceFingerprint &&
    (await fingerprint(JSON.stringify(options.reference))) ===
      options.expectedReferenceFingerprint
  ) {
    summary.organizedAnswer = {
      text: options.reference,
      source: "question_reference",
      label: "可以这样写（本题参考）",
    };
  }
  if (
    view.status === "assessed" &&
    options.source === "real_provider" &&
    options.purpose === "practice" &&
    view.questionId === reviewedFlight.questionId &&
    view.questionRevision === reviewedFlight.questionRevision &&
    view.contentId === reviewedFlight.contentId &&
    view.points.length === 2 &&
    view.points[0].id === `${reviewedFlight.questionId}-p1` &&
    view.points[1].id === `${reviewedFlight.questionId}-p2` &&
    view.points.every((point) => point.status === "partial") &&
    (await fingerprint(view.originalText)) === reviewedFlight.answerFingerprint
  ) {
    summary.judgment =
      "你已答出该理由不能成立，并联系了本案没有重大损失；把事故后果条件说清即可。";
    summary.judgmentSource = "codex_independent";
    summary.improvements = [
      {
        criterionId: view.points[0].id,
        text: "补清规则：违规还须造成重大飞行事故并产生严重后果。",
        source: "codex_independent",
      },
      {
        criterionId: view.points[0].id,
        text: "用事故结果说明不能成立即可；不必复述塔台过程，也不必以“排除故意”作理由。",
        source: "codex_independent",
      },
    ];
  }
  return summary;
}
