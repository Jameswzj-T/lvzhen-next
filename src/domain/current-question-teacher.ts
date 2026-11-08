import { validateUnitFeedbackResult } from "../evaluation/unit-feedback-contract";
import {
  checkTeacherSourceEvidence,
  isSingleDecisionTeacherProtocol,
  TEACHER_SOURCE_TEACHING_PROTOCOL,
  TEACHER_SOURCE_DECISION_PROTOCOL,
  TEACHER_SOURCE_REASONING_PROTOCOL,
  TEACHER_SOURCE_AUDIENCE_PROTOCOL,
  TEACHER_SOURCE_PROPORTIONATE_PROTOCOL,
  TEACHER_SOURCE_EVIDENCE_LANGUAGE_PROTOCOL,
  isPointTeacherProtocol,
} from "./teacher-source-feedback-contract";
import { unitFeedbackBinding } from "../evaluation/unit-feedback-catalog";
import { exerciseFor } from "../content/fault-catalog";
import type { TeacherFeedbackView } from "./teacher-feedback-contract";
import type { SubmittedAnswer } from "../app/lab/practice/submitted-answer-review";
import { teacherUnresolvedPointReview } from "./teacher-unresolved-point-review";
import { teacherConclusionReview } from "./teacher-conclusion-review";
import { teacherPointQuoteScopeNotes } from "./teacher-point-reasoning";

/** Pure current-question projection. No flight-specific guide, invented history,
 * provider call, score, semantic correction, or original-record mutation. */
export function currentQuestionTeacher(
  raw: unknown,
  original: SubmittedAnswer,
): TeacherFeedbackView {
  const question = exerciseFor(original.exerciseId);
  const binding = unitFeedbackBinding(original.exerciseId);
  if (!question || !binding || original.choice)
    throw Error("teacher-question-unavailable");
  const result = validateUnitFeedbackResult(raw, {
    answerId: original.id,
    questionId: original.exerciseId,
    questionRevision: original.revision,
    originalText: original.answer,
    contentId: binding.contentId,
  });
  if (
    !result.sourceTeacher ||
    result.source !== "real_provider" ||
    result.purpose !== "practice"
  )
    throw Error("teacher-real-current-receipt-required");
  const checked = checkTeacherSourceEvidence(result.sourceTeacher, result.view);
  const model = checked.evidence;
  const holds = new Map(checked.holds.map((h) => [h.criterionId, h.note]));
  const independentPointNote = teacherUnresolvedPointReview(result);
  if (independentPointNote)
    holds.set(independentPointNote.criterionId, independentPointNote.text);
  // Read-only teaching workflow from the already validated single decision.
  // These prompts do not assert legal conclusions or rewrite the model's action.
  const practiceHint = (id: string) => {
    if (
      (model.version !== TEACHER_SOURCE_DECISION_PROTOCOL &&
        model.version !== TEACHER_SOURCE_REASONING_PROTOCOL &&
        model.version !== TEACHER_SOURCE_AUDIENCE_PROTOCOL &&
        model.version !== TEACHER_SOURCE_PROPORTIONATE_PROTOCOL &&
        model.version !== TEACHER_SOURCE_EVIDENCE_LANGUAGE_PROTOCOL) ||
      independentPointNote?.criterionId === id
    )
      return undefined;
    const decision = model.pointDecisions.find((p) => p.id === id)?.decision;
    if (!decision) return undefined;
    const text =
      decision.stance === "unresolved"
        ? "先明确你最终保留哪一种判断，再联系题干事实说明理由；若仍无法确定，写清卡在哪一步。"
        : decision.stance === "unclear_expression"
          ? "把这一点的判断和依据写清楚；不确定的地方可以保留，并说明具体疑问。"
          : decision.stance === "insufficient_facts"
            ? "指出题设还缺什么信息，并说明在不同条件下你会怎样判断。"
            : decision.stance === "not_stated"
              ? "补写这一点的判断与理由，并联系题干中的事实。"
              : "claimAssessment" in decision
                ? decision.claimAssessment === "supported"
                  ? decision.reasoning.state === "complete"
                    ? null
                    : decision.reasoning.state === "incorrect"
                      ? "保留已答对的结论，重写这一点的理由，并联系题干事实说明依据。"
                      : decision.reasoning.state === "incomplete"
                        ? "保留已答对的结论，补出这一点尚缺的理由，并联系题干事实。"
                        : "写清理由中还无法判断的部分；不要把未知前提当成已确定事实。"
                  : "用自己的话重答这一点：先写结论，再用题干中的关键事实解释理由，保留已答对的内容。"
                : decision.assessment === "supported_complete"
                  ? null
                  : "用自己的话重答这一点：先写结论，再用题干中的关键事实解释理由，保留已答对的内容。";
    return text
      ? { source: "local_practice_guidance" as const, text }
      : undefined;
  };
  const basis = (id: string) => {
    const point = model.points.find((p) => p.id === id)!;
    const source = binding.publicRules.find(
      (s) => s.sourceId === point.basis.sourceId,
    )!;
    return `${source.title}：${source.excerpt}（由系统按本题版本关联；不是考生原答。）`;
  };
  const kind =
    checked.overallHold || holds.size ? "needs_review" : model.overall.kind;
  const text = {
    correct: "这道题的要点，你答到了。",
    partial:
      model.conclusion.state === "supported"
        ? (model.version === TEACHER_SOURCE_REASONING_PROTOCOL ||
            model.version === TEACHER_SOURCE_AUDIENCE_PROTOCOL ||
            model.version === TEACHER_SOURCE_PROPORTIONATE_PROTOCOL ||
            model.version === TEACHER_SOURCE_EVIDENCE_LANGUAGE_PROTOCOL) &&
          model.points.some((p) => p.status === "contradicted")
          ? "结论答对了，但理由中有明确错误。"
          : "结论答对了，理由还要补一补。"
        : "有答对的地方，也有需要改的地方。",
    incorrect: "这次的判断需要改一改。",
    needs_review: "这次还有说不准的地方。",
  }[kind];
  const independentConclusionNote = teacherConclusionReview(result);
  const quoteScopeNotes =
    model.version === TEACHER_SOURCE_REASONING_PROTOCOL ||
    model.version === TEACHER_SOURCE_AUDIENCE_PROTOCOL ||
    model.version === TEACHER_SOURCE_PROPORTIONATE_PROTOCOL ||
    model.version === TEACHER_SOURCE_EVIDENCE_LANGUAGE_PROTOCOL
      ? teacherPointQuoteScopeNotes({ points: model.pointDecisions }).map(
          (n) => ({
            ...n,
            resultId: result.id,
            answerId: original.id,
          }),
        )
      : [];
  // Overall prose stays model-authored; the programme never fixes its meaning.
  return {
    version: "teacher-current-question-feedback-20261008.v1",
    binding: {
      questionId: result.view.questionId,
      questionRevision: result.view.questionRevision,
      answerId: result.view.answerId,
      resultId: result.id,
      contentId: result.view.contentId,
      taskId: result.view.taskId,
    },
    title: result.view.title,
    originalText: result.view.originalText,
    provenance: "model_feedback",
    sourceNotice: independentPointNote
      ? "原模型的判断、解释与原答分别保留。这份记录中已查明的一处反馈问题暂不采用作教学判断，具体核对说明见下方记录；并非另一次模型评阅。"
      : model.version === TEACHER_SOURCE_DECISION_PROTOCOL ||
          model.version === TEACHER_SOURCE_REASONING_PROTOCOL ||
          model.version === TEACHER_SOURCE_AUDIENCE_PROTOCOL ||
          model.version === TEACHER_SOURCE_PROPORTIONATE_PROTOCOL ||
          model.version === TEACHER_SOURCE_EVIDENCE_LANGUAGE_PROTOCOL
        ? "这份原答由 DeepSeek 评阅，原回复单独保存。结论和标签按同一逐点立场记录形成。正文的重答提示是本机练习安排，不是另一份模型评阅，也没有改写原模型文字；原解释、原改法和依据在下方保留。一次答对不记为永久掌握。"
        : isPointTeacherProtocol(model.version)
          ? "这份原答由 DeepSeek 评阅，原回复单独保存。结论和逐点判断、引文与解释来自模型；后台只根据这些状态形成整体标签，没有生成另一份总评或补写模型解释。一次答对不记为永久掌握。"
          : model.version === TEACHER_SOURCE_TEACHING_PROTOCOL
            ? "这份原答由 DeepSeek 评阅，原回复单独保存。结论与逐点判断、引文和解释来自模型；整体标签由这些状态确定，结论解释复用同一段总评，不是模型作了第二次判断。一次答对不记为永久掌握。"
            : "这份原答已由 DeepSeek 当场评阅。反馈与原答分别保存；一次答对不自动记为永久掌握。",
    judgment: {
      kind,
      text,
      reason:
        model.version === TEACHER_SOURCE_TEACHING_PROTOCOL
          ? checked.overallContractConflict
            ? "这份反馈的判断前后不一致，先核对原话；已经确定的部分仍保留。"
            : ""
          : checked.overallHold &&
              (!isSingleDecisionTeacherProtocol(model.version) ||
                checked.overallContractConflict)
            ? "这份反馈前后有不一致的地方，先别按它改答案；答对的部分仍保留。"
            : model.overall.reason,
    },
    conclusion: structuredClone(model.conclusion),
    ...(independentConclusionNote ? { independentConclusionNote } : {}),
    independentPointNote,
    ...(quoteScopeNotes.length ? { quoteScopeNotes } : {}),
    rawOverall: {
      ...structuredClone(model.overall),
      ...(isPointTeacherProtocol(model.version)
        ? { origin: "projected_model_decisions" as const }
        : {}),
      ...(model.version === TEACHER_SOURCE_TEACHING_PROTOCOL
        ? {
            origin: "projected_model_decisions" as const,
            adoptedForTeaching: false,
          }
        : {}),
    },
    strengths: model.points
      .filter((p) => p.status === "covered" && !holds.has(p.id))
      .map((p) => ({
        criterionId: p.id,
        label: binding.criteria.find((c) => c.id === p.id)?.label,
        // Background or withdrawn statements are retained below as raw evidence,
        // never quoted as something the learner got right. No semantic rewrite.
        quotes: p.evidence
          .filter((e) => e.role === "supports")
          .map((e) => e.quote),
        explanation: p.explanation,
        basis: basis(p.id),
      })),
    improvements: model.points
      .filter(
        (p) =>
          ["partial", "missing", "contradicted"].includes(p.status) &&
          !holds.has(p.id) &&
          p.action,
      )
      .map((p) => ({
        criterionId: p.id,
        quotes: p.evidence.map((e) => e.quote),
        explanation: p.explanation,
        action: p.action!,
        actionSource: "model_feedback",
        ...(practiceHint(p.id) ? { practiceHint: practiceHint(p.id) } : {}),
        basis: basis(p.id),
      })),
    pending: model.points
      .filter((p) => holds.has(p.id))
      .map((p) => ({
        criterionId: p.id,
        quotes: p.evidence.map((e) => e.quote),
        explanation: p.explanation,
        reviewNote: holds.get(p.id),
        ...(p.status === "uncertain" && practiceHint(p.id)
          ? { practiceHint: practiceHint(p.id) }
          : {}),
        ...(((isSingleDecisionTeacherProtocol(model.version) &&
          p.status === "uncertain") ||
          independentPointNote?.criterionId === p.id) &&
        p.action
          ? { confirmationAction: p.action }
          : {}),
      })),
    reference: {
      label: "本问教学参考",
      text: question.reference,
      source: "question_reference",
    },
    history: null,
    historyNotice: null,
    nextStep:
      kind === "needs_review"
        ? {
            kind: "review_evidence",
            text: "核对原答和待核依据；不把待核算作答错。",
          }
        : kind === "correct"
          ? {
              kind: "continue_topic",
              text: "这题的要点已答到，可以继续练习；原答和反馈保留。",
            }
          : {
              kind: "whole_question_retry",
              text: "保留答对的内容，按具体改法重新说明完整这一问；新答另存。",
            },
    rawPoints: model.points.map((p) => ({
      criterionId: p.id,
      status: p.status,
      quotes: p.evidence.map((e) => e.quote),
      explanation: p.explanation,
    })),
  };
}
