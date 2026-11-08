import type { SINGLE_CLAIM_VERSION } from "./single-claim";
import type { CRITERION_COMPOSITION_VERSION } from "./criterion-composition";
import type { SOURCE_ARGUMENT_VERSION } from "./source-arguments";
import type { ISOLATED_GRAPH_VERSION } from "./isolated-arguments";
import type {
  ARGUMENT_GRAPH_VERSION,
  ArgumentRelation,
  RelationReading,
} from "./argument-relations";
import type {
  MeaningDependencies,
  MeaningConsistency,
  MEANING_CONSISTENCY_VERSION,
} from "./meaning-consistency";
import type {
  VERIFY_GRAPH_VERSION,
  MeaningVerification,
} from "./meaning-verification";
import type { DIRECT_GRAPH_VERSION } from "./direct-meaning";
import type { LINK_GRAPH_VERSION, LinkResult } from "./answer-links";
import type { CHOICE_GRAPH_VERSION, MeaningMenu } from "./meaning-choice-cards";
import type { ITEM_GRAPH_VERSION, ItemValidation } from "./item-validation";
import type {
  ConclusionContract,
  STANCE_GRAPH_VERSION,
} from "./structured-stance";
import type {
  AnswerSection,
  AnswerScope,
  CriterionContract,
  QuestionLocalHints,
  QUESTION_LOCAL_VERSION,
} from "./question-local";
import type {
  JudgmentTarget,
  TaskScope,
  SCOPED_GRAPH_VERSION,
} from "./task-scopes";
import type { PositionHints, POSITION_GRAPH_VERSION } from "./position";
import type { EvaluationInput } from "../index";
import type { CriterionFindings } from "../criterion-findings";
import type { ScoreCard } from "../scoring-loop";
import type { CriterionPolicy } from "../semantic-observations";
import { digest } from "../model-config";
import type { AnswerBoundary, AnswerWindow } from "./answer-boundary";
import type {
  TASK_CONTRACT_VERSION,
  TASK_CONTRACT_V2,
  TaskContract,
} from "./task-contracts";

export const GRAPH_VERSION = "grading-graph-v1";
export type Finding = CriterionFindings["criteria"][number];
export type TaskGroup = {
  id: string;
  title: string;
  criterionIds: string[];
  requiredReviewIds: string[];
  targets?: JudgmentTarget[];
};
export type CasePack = {
  title: string;
  input: Omit<EvaluationInput, "studentText" | "answerId">;
  policy: CriterionPolicy;
  card: ScoreCard;
  groups: TaskGroup[];
  criterionContracts?: CriterionContract[];
  contextQuestionIds?: string[];
  conclusionContracts?: ConclusionContract[];
  taskContracts?: TaskContract[];
  meaningMenu?: MeaningMenu;
  meaningDependencies?: MeaningDependencies;
  argumentRelations?: ArgumentRelation[];
};
export type RunInput = {
  runId: string;
  version:
    | typeof GRAPH_VERSION
    | typeof POSITION_GRAPH_VERSION
    | typeof SCOPED_GRAPH_VERSION
    | typeof QUESTION_LOCAL_VERSION
    | typeof STANCE_GRAPH_VERSION
    | typeof ITEM_GRAPH_VERSION
    | typeof TASK_CONTRACT_VERSION
    | typeof TASK_CONTRACT_V2
    | typeof CHOICE_GRAPH_VERSION
    | typeof LINK_GRAPH_VERSION
    | typeof DIRECT_GRAPH_VERSION
    | typeof VERIFY_GRAPH_VERSION
    | typeof ARGUMENT_GRAPH_VERSION
    | typeof ISOLATED_GRAPH_VERSION
    | typeof SINGLE_CLAIM_VERSION
    | typeof CRITERION_COMPOSITION_VERSION
    | typeof SOURCE_ARGUMENT_VERSION;
  pack: CasePack;
  answer: string;
  answerSections?: AnswerSection[];
  answerBoundary?: AnswerBoundary;
  // Opt-in input ablation; does not change findings, prompts or scoring policy.
  reasonContext?: "answer-rubric-v1";
  meaningConsistency?: typeof MEANING_CONSISTENCY_VERSION;
  modelIdentity: string;
  deadline: number;
  maxCalls: number;
  reviewMode?: "bounded" | "off";
};
// A strict projection: no points, reference answer, first-pass findings or tests.
export type ReadingRequest = {
  input: EvaluationInput;
  reasonOnly?: boolean;
  reasonContext?: "answer-rubric-v1";
  policy: CriterionPolicy;
  positionHints?: PositionHints;
  taskScope?: TaskScope;
  answerScope?: AnswerScope;
  criterionContracts?: CriterionContract[];
};
export type ModelReceipt = {
  raw: unknown;
  source: "fixture" | "model";
  durationMs: number;
  cost: number | null;
  currency: string | null;
  providerFailure?: string;
  measurement?: {
    requestedModel: string;
    model: string | null;
    responseId: string | null;
    startedAt: string;
    endedAt: string;
    callCount: number;
    inputTokens: number | null;
    outputTokens: number | null;
    cacheHitTokens: number | null;
  };
};
export type CallOutcome =
  | { status: "completed"; receipt: ModelReceipt; reused: boolean }
  | { status: "unknown" | "budget_blocked" | "deadline_blocked" };
export type ModelReader = (
  request: ReadingRequest,
  signal: AbortSignal,
  context: { phase: "read" | "review" },
) => Promise<ModelReceipt>;
export type Invocation = {
  runId: string;
  groupId: string;
  phase: "position" | "read" | "review";
  requestHash: string;
  maxCalls: number;
  maxReviews?: number;
};
export interface InvocationLedger {
  execute(
    invocation: Invocation,
    send: () => Promise<ModelReceipt>,
  ): Promise<CallOutcome>;
}
export type TraceEvent = { node: string; detail: string };
export type PointResolution = {
  id: string;
  finding: Finding["finding"] | null;
  status: "resolved" | "pending" | "failed";
  origin:
    | "structured_stance"
    | "first"
    | "agreement"
    | "review"
    | "disagreement"
    | "review_unavailable"
    | "read_failed"
    | "empty_answer"
    | "input_scope_pending"
    | "verification_agreement"
    | "verification_pending"
    | "meaning_inconsistent";
  candidates?: Finding["finding"][];
};
export type GroupResult = {
  groupId: string;
  answerWindow?: AnswerWindow;
  status: "completed" | "pending" | "failed";
  points: PointResolution[];
  first: Finding[] | null;
  conclusionFindings?: Finding[];
  reasonFindings?: Finding[] | null;
  validation?: { position?: ItemValidation; read?: ItemValidation };
  review: Finding[] | null;
  calls: Partial<Record<"position" | "read" | "review", CallOutcome>>;
  positionHints?: PositionHints | null;
  sourceAssociations?: LinkResult;
  meaningVerification?: MeaningVerification;
  meaningConsistency?: MeaningConsistency;
  argumentRelations?: RelationReading[];
  composedMeanings?: import("./meaning-choice").MeaningReading[];
  contextNotes?: {
    status: "model_reported_unverified";
    notes: QuestionLocalHints["crossQuestionNotes"];
  };
  trace: TraceEvent[];
};
export type ScoredPoint = {
  id: string;
  title: string;
  max: number;
  earned: number | null;
  diagnosticPending: boolean;
  feedback: string;
};
export type ScoreResult = {
  total: number | null;
  confirmed: number;
  max: number;
  items: ScoredPoint[];
};
export function mergeResults<T>(
  current: Record<string, T>,
  incoming: Record<string, T>,
) {
  const next = { ...current };
  for (const [key, value] of Object.entries(incoming)) {
    if (key in next && digest(next[key]) !== digest(value))
      throw new Error("conflicting-result:" + key);
    next[key] = value;
  }
  return next;
}
export function validatePack(pack: CasePack) {
  const ids = pack.input.criteria.map((p) => p.id);
  const grouped = pack.groups.flatMap((g) => g.criterionIds);
  const same = (other: string[]) =>
    other.length === ids.length &&
    new Set(other).size === ids.length &&
    ids.every((id) => other.includes(id));
  if (
    !ids.length ||
    new Set(ids).size !== ids.length ||
    !same(grouped) ||
    !same(pack.card.items.map((p) => p.criterionId)) ||
    !same(pack.policy.map((p) => p.id)) ||
    new Set(pack.groups.map((g) => g.id)).size !== pack.groups.length
  )
    throw new Error("invalid-case-pack-coverage");
  if (
    pack.card.caseId !== pack.input.caseId ||
    pack.card.caseRevision !== pack.input.caseRevision
  )
    throw new Error("invalid-card-identity");
  for (const g of pack.groups) {
    if (
      !g.criterionIds.length ||
      g.requiredReviewIds.some((id) => !g.criterionIds.includes(id))
    )
      throw new Error("invalid-task-group");
  }
  for (const item of pack.card.items) {
    if (
      !(item.points > 0) ||
      (item.requiresConclusion &&
        (!ids.includes(item.requiresConclusion) ||
          pack.card.items.find((p) => p.criterionId === item.requiresConclusion)
            ?.requiresConclusion))
    )
      throw new Error("invalid-score-dependency");
  }
}

// Only explicit card dependencies affect another point. No keyword scoring.
export function scoreResolved(
  pack: CasePack,
  groups: Record<string, GroupResult>,
): ScoreResult {
  const points = new Map(
    Object.values(groups)
      .flatMap((g) => g.points)
      .map((p) => [p.id, p]),
  );
  const possibilities = (id: string): boolean[] => {
    const point = points.get(id);
    if (!point) throw new Error("missing-score-point:" + id);
    if (point.status === "resolved") return [point.finding === "satisfied"];
    if (
      point.candidates?.length &&
      point.candidates.every((p) => !["uncertain", "conflicting"].includes(p))
    )
      return [...new Set(point.candidates.map((p) => p === "satisfied"))];
    return [false, true];
  };
  const items = pack.card.items.map((item): ScoredPoint => {
    const point = points.get(item.criterionId)!;
    const dependency = item.requiresConclusion
      ? points.get(item.requiresConclusion)!
      : null;
    const values = new Set(
      possibilities(item.criterionId).flatMap((met) =>
        (item.requiresConclusion
          ? possibilities(item.requiresConclusion)
          : [true]
        ).map((allowed) => (met && allowed ? item.points : 0)),
      ),
    );
    const earned = values.size === 1 ? [...values][0] : null;
    const diagnosticPending =
      point.status !== "resolved" ||
      (dependency !== null && dependency.status !== "resolved");
    const feedback =
      point.status === "failed"
        ? "本项读取失败，尚不能评价原答。"
        : diagnosticPending
          ? earned === null
            ? "本项判断待核对，暂不确定分数。"
            : "分数可按题卡确定，答案理解仍待核对。"
          : earned === item.points
            ? "本项符合题卡要求。"
            : point.finding === "satisfied" &&
                dependency?.finding !== "satisfied"
              ? "本项已表达；按题卡，须同时满足对应结论才能计分。"
              : item.guidance;
    return {
      id: item.criterionId,
      title: item.title,
      max: item.points,
      earned,
      diagnosticPending,
      feedback,
    };
  });
  const confirmed = items.reduce((sum, item) => sum + (item.earned ?? 0), 0);
  return {
    items,
    confirmed,
    total: items.some((p) => p.earned === null) ? null : confirmed,
    max: items.reduce((sum, item) => sum + item.max, 0),
  };
}
