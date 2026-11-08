import { createHash } from "node:crypto";
import { z } from "zod";
import type { UnitExercise } from "../content/fault-unit";
import type { RegisteredFeedbackModelRequest } from "./registered-question-feedback-adapter";
import {
  assessQuestionScopedTable,
  type QuestionScopedPack,
} from "./question-scoped-table";
import { toFeedback } from "./feedback";
import {
  buildModelInput,
  inputSchema,
  runOffline,
  type Executor,
} from "./index";

export const UNIT_FEEDBACK_VERSION = "unit-evidence-feedback-candidate-v1";
export type PublicFeedbackRule = {
  sourceId: string;
  title: string;
  url: string;
  excerpt: string;
  checkedAt: string;
  scope: string;
};
export type UnitFeedbackAttempt = {
  id: string;
  questionId: string;
  exerciseRevision: string;
  raw: string;
};

const hash = (value: unknown) =>
  createHash("sha256").update(JSON.stringify(value)).digest("hex");
const instructions =
  "这是完整小问的逐项学习反馈，保留一次共同语境，不拆成逐句调用。" +
  "每项说明分别给出原有要点、采分含义、等义表达和必答边界；边界明确非必答的教学补充不能成为额外漏项。" +
  "只评当前小问原答，不从其他小问、参考答案或历史重答补内容。" +
  "covered 表示本项表达符合所给要求，不代表题设未知条件已证实、最终定罪成立或考生永久掌握。" +
  "部分正确写 partial，确实未表达写 missing，明确相反结论写 contradicted；内部冲突无法确定立场或材料不足写 uncertain，必要时说明需要澄清什么。" +
  "先完整读否定、转折和反对引文，不能把考生引用后反对的错误观点当作赞同。" +
  "题设未提供的事实不是考生漏答；有依据的条件式表达可符合要求，未知事实须保留条件，不能补成否定或肯定事实。" +
  "不输出分数、百分比、是否掌握或题外处罚要求。";

const scoreNotice =
  "本题只给逐项得失点说明；现有要点未核定数字权重，因此不生成总分，也不把每项默认算成同分。";

/** Caller supplies reviewed public rules, never the hidden reference or gold answers. */
export function prepareUnitFeedback(
  exercise: UnitExercise,
  revision: string,
  attempt: UnitFeedbackAttempt,
  publicRules: PublicFeedbackRule[],
) {
  if (
    exercise.kind !== "subjective" ||
    !exercise.criteria?.length ||
    !revision.trim() ||
    attempt.questionId !== exercise.id ||
    attempt.exerciseRevision !== revision
  )
    throw new Error("unit-feedback-question-binding");
  const criteria = exercise.criteria.map((item) => ({
    id: item.id,
    label: item.label,
    meaning: item.meaning,
    acceptable: item.acceptable,
    boundary: item.boundary,
  }));
  if (criteria.some((item) => Object.values(item).some((text) => !text.trim())))
    throw new Error("unit-feedback-incomplete-criterion");
  const rules = publicRules.map((rule) => ({
    sourceId: rule.sourceId,
    title: rule.title,
    url: rule.url,
    excerpt: rule.excerpt,
    checkedAt: rule.checkedAt,
    scope: rule.scope,
  }));
  if (
    !rules.length ||
    new Set(rules.map((rule) => rule.sourceId)).size !== rules.length ||
    rules.some(
      (rule) =>
        !exercise.sources.includes(rule.sourceId) ||
        Object.values(rule).some((text) => !text.trim()),
    ) ||
    exercise.sources.some(
      (sourceId) => !rules.some((r) => r.sourceId === sourceId),
    )
  )
    throw new Error("unit-feedback-public-rule-binding");
  const ruleBasis = rules
    .map(
      (rule) =>
        `${rule.title}\n${rule.excerpt}\n依据：${rule.url}\n范围：${rule.scope}`,
    )
    .join("\n\n");
  // The existing protocol's caseId is scoped to a question, even for shared cases.
  const input = inputSchema.parse({
    caseId: exercise.id,
    caseRevision: revision,
    answerId: attempt.id,
    question: exercise.prompt,
    facts: exercise.facts,
    studentText: attempt.raw,
    criteria: criteria.map((item) => ({
      id: item.id,
      description:
        `要点：${item.label}\n采分含义：${item.meaning}\n` +
        `等义表达：${item.acceptable}\n必答边界：${item.boundary}`,
      ruleBasis,
    })),
  });
  const definition = {
    questionId: exercise.id,
    revision,
    parentCaseId: exercise.caseId ?? exercise.id,
    title: exercise.title,
    facts: exercise.facts,
    prompt: exercise.prompt,
    criteria,
    rules,
    // Bind a reference revision without placing its text in the model request.
    referenceFingerprint: hash(exercise.reference),
  };
  const contentId = hash(definition);
  const payload = {
    version: UNIT_FEEDBACK_VERSION,
    contentId,
    definition,
    input,
    instructions: buildModelInput(input).instructions + "\n" + instructions,
  };
  return { taskId: hash(payload), ...payload };
}
export type UnitFeedbackTask = ReturnType<typeof prepareUnitFeedback> & {
  // New current-question adapter metadata; old frozen native tasks have neither field.
  registeredQuestion?: { version: string; kind: "subjective" | "objective" };
  registeredModelRequest?: RegisteredFeedbackModelRequest;
  shortTable?: QuestionScopedPack;
  objective?: {
    choice: string;
    selectedIds: string[];
    correctIds: string[];
    options: { id: string; text: string; explanation: string }[];
    matchesExistingKey: boolean;
  };
};

function verifyTask(task: UnitFeedbackTask) {
  const { taskId, ...payload } = task;
  if (
    task.version !== UNIT_FEEDBACK_VERSION ||
    hash(payload) !== taskId ||
    hash(task.definition) !== task.contentId
  )
    throw new Error("unit-feedback-task-changed");
}

/** Pure request preparation, not dispatch or authorization; no keys or endpoints. */
export type UnitFeedbackModelRequest = {
  model: string;
  thinking: { type: string };
  messages: { role: string; content: string }[];
  response_format?: { type: string };
  temperature?: number;
  tools?: {
    type: "function";
    function: {
      name: string;
      description: string;
      strict: true;
      parameters: Record<string, unknown>;
    };
  }[];
  tool_choice?: { type: "function"; function: { name: string } };
  stream: boolean;
  max_tokens: number;
};
export function unitFeedbackRequestBody(
  task: UnitFeedbackTask,
  maxOutputTokens = 1024,
): UnitFeedbackModelRequest {
  verifyTask(task);
  if (task.registeredModelRequest)
    return structuredClone(task.registeredModelRequest);
  if (
    !Number.isSafeInteger(maxOutputTokens) ||
    maxOutputTokens < 1 ||
    maxOutputTokens > 2048
  )
    throw new Error("unit-feedback-output-limit");
  return {
    model: "deepseek-flash",
    thinking: { type: "disabled" },
    messages: [
      { role: "system", content: task.instructions },
      {
        role: "user",
        content: JSON.stringify(
          task.objective
            ? { ...task.input, objective: task.objective }
            : buildModelInput(task.input).data,
        ),
      },
    ],
    response_format: { type: "json_object" },
    stream: false,
    max_tokens: maxOutputTokens,
  };
}

/** Mechanical binding and continuous quotations do not establish model semantics. */
export function presentUnitFeedback(
  task: UnitFeedbackTask,
  reply: { taskId: string; result: unknown },
) {
  verifyTask(task);
  if (reply.taskId !== task.taskId)
    throw new Error("unit-feedback-reply-binding");
  if (task.objective) {
    const result = z
      .object({
        caseId: z.literal(task.input.caseId),
        caseRevision: z.literal(task.input.caseRevision),
        answerId: z.literal(task.input.answerId),
        status: z.enum(["assessed", "needs_clarification", "system_error"]),
        analysis: z.string().min(1).max(12000).nullable(),
        clarification: z.string().min(1).max(12000).nullable(),
      })
      .strict()
      .parse(reply.result);
    if (
      (result.status === "needs_clarification") !==
        (result.clarification !== null) ||
      (result.status === "system_error"
        ? result.analysis !== null
        : result.analysis === null)
    )
      throw Error("objective-analysis-state");
    return {
      version: UNIT_FEEDBACK_VERSION,
      taskId: task.taskId,
      contentId: task.contentId,
      questionId: task.input.caseId,
      questionRevision: task.input.caseRevision,
      answerId: task.input.answerId,
      title: task.definition.title,
      facts: task.definition.facts,
      prompt: task.definition.prompt,
      originalText: task.input.studentText,
      status: result.status,
      heading: "选择解析",
      score: null,
      scoreNotice:
        "选择对错沿用本题原答案集合；模型只给解析，不更改原选择结果。",
      notice:
        result.status === "system_error"
          ? "尚未取得解析，原选择和本地结果保留。"
          : "结合本题事实解释选择，不代替已有答案键。",
      clarification: result.clarification,
      substantiveIssue: result.analysis,
      terminologySuggestion: null,
      points: [],
    };
  }
  const feedback = toFeedback(task.input, reply.result);
  const byId = new Map(feedback.evidence.map((row) => [row.criterionId, row]));
  return {
    version: UNIT_FEEDBACK_VERSION,
    taskId: task.taskId,
    contentId: task.contentId,
    questionId: task.input.caseId,
    questionRevision: task.input.caseRevision,
    answerId: task.input.answerId,
    title: task.definition.title,
    facts: task.definition.facts,
    prompt: task.definition.prompt,
    originalText: feedback.originalText,
    status: feedback.status,
    heading: feedback.heading,
    // No provisional zero, equal weights, percentages or mastery state.
    score: null,
    scoreNotice,
    notice: feedback.notice,
    clarification: feedback.clarification,
    substantiveIssue: feedback.substantiveIssue,
    terminologySuggestion: feedback.terminologySuggestion,
    points: task.definition.criteria.flatMap((criterion) => {
      const row = byId.get(criterion.id);
      return row ? [{ ...criterion, ...row }] : [];
    }),
  };
}
export type WeightedFeedbackScore = {
  confirmed: number;
  pending: number;
  total: number | null;
  maximum: number;
};
export type UnitFeedbackView = ReturnType<typeof presentUnitFeedback> & {
  teachingStyle?:
    "direct-learner-v1" | "direct-overall-v2" | "direct-overall-v3";
  studentResponse?: string;
  weightedScore?: WeightedFeedbackScore;
};

/** A model text remains attached to its exact request and receipt. Old weights are never guessed. */
export function presentRegisteredFeedbackText(
  task: UnitFeedbackTask,
  text: string,
): UnitFeedbackView {
  verifyTask(task);
  if (task.objective && task.registeredModelRequest) {
    if (!text.trim() || text.length > 12000)
      throw Error("objective-analysis-content");
    return presentUnitFeedback(task, {
      taskId: task.taskId,
      result: {
        caseId: task.input.caseId,
        caseRevision: task.input.caseRevision,
        answerId: task.input.answerId,
        status: "assessed",
        analysis: text,
        clarification: null,
      },
    });
  }
  if (!task.shortTable)
    return presentUnitFeedback(task, {
      taskId: task.taskId,
      result: JSON.parse(text),
    });
  const assessment = assessQuestionScopedTable(text, task.shortTable);
  if (
    !assessment.valid ||
    assessment.items.length !== task.definition.criteria.length
  )
    throw Error("short-table-feedback-structure");
  const rows = assessment.items;
  const result = {
    caseId: task.input.caseId,
    caseRevision: task.input.caseRevision,
    answerId: task.input.answerId,
    status: "assessed",
    substantiveIssue: null,
    terminologyIssue: null,
    clarification: null,
    criteria: task.definition.criteria.map((criterion, index) => {
      const row = rows[index];
      return {
        id: criterion.id,
        status:
          row.reviewStatus !== "ready"
            ? "uncertain"
            : row.label === "是"
              ? "covered"
              : "missing",
        evidence: row.sourceQuotes,
        reason: row.explanation,
      };
    }),
  };
  const view = presentUnitFeedback(task, { taskId: task.taskId, result });
  return {
    ...view,
    weightedScore: { ...assessment.score },
    scoreNotice: "分值沿用本题原采分卡；待核项不按零分计算。",
  };
}

/** Offline-only boundary: this module imports no provider, grants or credentials. */
export async function runUnitFeedbackOffline(
  task: UnitFeedbackTask,
  executor: Executor,
  options: { timeoutMs?: number } = {},
) {
  verifyTask(task);
  const run = await runOffline(
    task.input,
    (request) => executor({ ...request, instructions: task.instructions }),
    options,
  );
  return {
    ...run,
    taskId: task.taskId,
    view: presentUnitFeedback(task, {
      taskId: task.taskId,
      result: run.result,
    }),
  };
}

/** Compare opinions only; not a new score or a permanent learning-state update. */
export function compareUnitFeedback(
  previous: UnitFeedbackView,
  current: UnitFeedbackView,
) {
  if (
    previous.contentId !== current.contentId ||
    previous.questionId !== current.questionId ||
    previous.questionRevision !== current.questionRevision ||
    previous.answerId === current.answerId ||
    previous.taskId === current.taskId
  )
    throw new Error("unit-feedback-comparison-binding");
  const before = new Map(previous.points.map((point) => [point.id, point]));
  const comparable = [previous.status, current.status].every(
    (status) => status === "assessed",
  );
  return current.points.map((point) => {
    const old = before.get(point.id);
    const outcome =
      !comparable || !old || [old.status, point.status].includes("uncertain")
        ? "needs_review"
        : old.status === point.status
          ? "unchanged"
          : point.status === "covered"
            ? "now_supported"
            : old.status === "covered"
              ? "no_longer_supported"
              : "changed_opinion";
    return {
      criterionId: point.id,
      outcome,
      before: old ?? null,
      after: point,
    };
  });
}
