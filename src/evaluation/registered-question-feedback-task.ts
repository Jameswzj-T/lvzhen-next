import { currentQuestionDispatch } from "./current-question-teacher-dispatch";
import { createHash } from "node:crypto";
import {
  exerciseFor,
  exerciseRevision,
  exerciseSources,
} from "../content/fault-catalog";
import { currentPracticeId, practiceQuestion } from "../content/practice-set";
import { prepareRegisteredAnswerFeedback } from "./registered-question-feedback-adapter";
import frozenShortCards from "../content/scoring-cards-short/execution-v1.json";
import {
  renderQuestionScopedPack,
  type QuestionScopedPack,
} from "./question-scoped-table";
import { prepareRegisteredUnitFeedback } from "./unit-feedback-registry";
import { unitFeedbackBinding } from "./unit-feedback-catalog";
import {
  UNIT_FEEDBACK_VERSION,
  unitFeedbackRequestBody,
  type UnitFeedbackTask,
} from "./unit-feedback";

export const REGISTERED_QUESTION_FEEDBACK_VERSION =
  "registered-question-feedback-20261007.v1";
export type RegisteredQuestionOriginal = {
  exerciseId: string;
  exerciseRevision: string;
  attemptId: string;
  answer: string;
  choice: string;
};
const digest = (value: unknown) =>
  createHash("sha256").update(JSON.stringify(value)).digest("hex");

/** Server-owned preparation. Historical publications are available for lookup
 * only; paid canonical verification always uses the default current-only path. */
export function prepareCurrentQuestionFeedback(
  original: RegisteredQuestionOriginal,
  options?: { readOnlyHistorical: true },
): {
  task: UnitFeedbackTask;
  registrationVersion: string;
  original: RegisteredQuestionOriginal;
} {
  const q = exerciseFor(original.exerciseId);
  if (
    !q ||
    practiceQuestion(original.exerciseId).id !== q.id ||
    (!options?.readOnlyHistorical && currentPracticeId(q.id) !== q.id) ||
    exerciseRevision(q.id) !== original.exerciseRevision
  )
    throw Error("current-question-binding");
  if (
    (q.kind === "subjective" && original.choice) ||
    (q.kind === "objective" && original.answer)
  )
    throw Error("original-kind-binding");
  const plan = prepareRegisteredAnswerFeedback({
    exerciseId: original.exerciseId,
    exerciseRevision: original.exerciseRevision,
    attemptId: original.attemptId,
    answer: q.kind === "objective" ? original.choice : original.answer,
  });
  if (plan.kind === "unsupported")
    throw Error(`registered-question-${plan.reason}`);
  if (plan.kind === "unit_feedback") {
    const native = unitFeedbackBinding(q.id)!;
    return {
      task: prepareRegisteredUnitFeedback({
        id: original.attemptId,
        questionId: q.id,
        exerciseRevision: original.exerciseRevision,
        raw: original.answer,
      }),
      registrationVersion: native.registrationVersion,
      original: { ...original },
    };
  }
  const sources = q.sources.map((id) => ({ id, ...exerciseSources(q.id)[id] }));
  if (sources.some((s) => !s.title || !s.url || !s.note))
    throw Error("question-source-metadata");
  const criteria = (q.criteria ?? []).map((c) => ({ ...c }));
  let shortTable: QuestionScopedPack | undefined;
  if (plan.kind === "short_table") {
    const card = frozenShortCards.cards.find((c) => c.id === q.id)!;
    shortTable = structuredClone(card.pack) as QuestionScopedPack;
    shortTable.questions[0].answer = original.answer;
  }
  const basis = "来源元数据（note不是法条全文）：\n" + JSON.stringify(sources);
  const input =
    plan.kind === "written_model"
      ? plan.evaluationInput
      : {
          caseId: q.id,
          caseRevision: original.exerciseRevision,
          question: q.prompt,
          facts: q.facts,
          answerId: original.attemptId,
          studentText:
            q.kind === "objective" ? original.choice : original.answer,
          criteria: criteria.map((c) => ({
            id: c.id,
            description: `要点：${c.label}\n含义：${c.meaning}\n等义表达：${c.acceptable}\n必答边界：${c.boundary}`,
            ruleBasis: basis,
          })),
        };
  const objective =
    plan.kind === "objective_explanation"
      ? {
          choice: plan.selection.originalChoice,
          selectedIds: plan.selection.selectedIds,
          correctIds: plan.selection.correctIds,
          options: q.options!.map((o) => ({ ...o })),
          matchesExistingKey: plan.selection.correct,
        }
      : undefined;
  const definition = {
    questionId: q.id,
    revision: original.exerciseRevision,
    parentCaseId: q.caseId ?? q.id,
    title: q.title,
    facts: q.facts,
    prompt: q.prompt,
    criteria,
    rules: [],
    referenceFingerprint: digest(q.reference),
    sources,
    kind: q.kind,
    grading: plan.grading,
    ...(shortTable
      ? { weightedCriteria: shortTable.questions[0].criteria }
      : {}),
    ...(objective
      ? {
          objective: {
            options: objective.options,
            correctIds: objective.correctIds,
          },
        }
      : {}),
  };
  const modelRequest =
    plan.kind === "short_table"
      ? {
          model: "deepseek-flash" as const,
          thinking: { type: "disabled" as const },
          messages: [
            {
              role: "user" as const,
              content: renderQuestionScopedPack(shortTable!),
            },
          ],
          stream: false as const,
          max_tokens: 1536,
        }
      : plan.request;
  const payload = {
    version: UNIT_FEEDBACK_VERSION,
    contentId: digest(definition),
    definition,
    input,
    instructions:
      modelRequest.messages.find((m) => m.role === "system")?.content ?? "",
    registeredQuestion: {
      version: REGISTERED_QUESTION_FEEDBACK_VERSION,
      kind: q.kind,
    },
    registeredModelRequest: modelRequest,
    ...(shortTable ? { shortTable } : {}),
    ...(objective ? { objective } : {}),
  };
  return {
    task: { taskId: digest(payload), ...payload },
    registrationVersion: REGISTERED_QUESTION_FEEDBACK_VERSION,
    original: { ...original },
  };
}

/** The provider reconstructs every canonical request, including the original short-table protocol. */
export function verifyCurrentQuestionRequestBody(
  body: ReturnType<typeof unitFeedbackRequestBody>,
  expected?: RegisteredQuestionOriginal,
) {
  if (expected) {
    const prepared = prepareCurrentQuestionFeedback(expected);
    const dispatch = currentQuestionDispatch(prepared.task);
    const canonical = dispatch.body;
    if (digest(canonical) !== digest(body))
      throw Error("current-question-body-changed");
    return {
      task: prepared.task,
      body: canonical,
      taskId: dispatch.taskId,
    };
  }
  const user = body.messages.find((m) => m.role === "user")?.content;
  let identity: RegisteredQuestionOriginal;
  try {
    const data = JSON.parse(user!);
    identity = data.selection
      ? {
          exerciseId: data.exerciseId,
          exerciseRevision: data.exerciseRevision,
          attemptId: data.attemptId,
          answer: "",
          choice: data.selection.originalChoice,
        }
      : {
          exerciseId: data.caseId,
          exerciseRevision: data.caseRevision,
          attemptId: data.answerId,
          answer: data.studentText,
          choice: "",
        };
  } catch {
    throw Error("registered-body-identity");
  }
  const prepared = prepareCurrentQuestionFeedback(identity);
  const dispatch = currentQuestionDispatch(prepared.task);
  const canonical = dispatch.body;
  if (digest(canonical) !== digest(body))
    throw Error("current-question-body-changed");
  return { task: prepared.task, body: canonical, taskId: dispatch.taskId };
}
