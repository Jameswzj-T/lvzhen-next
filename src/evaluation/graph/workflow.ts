import {
  ISOLATED_GRAPH_VERSION,
  isolatedMeaningRequest,
  isolatedRelationRequest,
  validateIsolatedRelations,
  type IsolatedRelationReader,
} from "./isolated-arguments";
import {
  ARGUMENT_GRAPH_VERSION,
  argumentRequest,
  validateArgumentItems,
  validateArgumentRelations,
  composeArgumentMeanings,
  retainOtherBasisNotes,
  type ArgumentReader,
  type RelationReading,
} from "./argument-relations";
import {
  MEANING_CONSISTENCY_VERSION,
  validateMeaningDependencies,
  checkMeaningConsistency,
  holdInconsistentFindings,
  type MeaningConsistency,
} from "./meaning-consistency";
import {
  VERIFY_GRAPH_VERSION,
  verificationRequest,
  reconcileMeanings,
  verificationFindings,
  type MeaningVerification,
} from "./meaning-verification";
import {
  DIRECT_GRAPH_VERSION,
  directRequest,
  validateDirectItems,
  type DirectReader,
} from "./direct-meaning";
import {
  LINK_GRAPH_VERSION,
  linkRequest,
  validateLinks,
  linkedChoiceRequest,
  validateLinkedChoices,
  type LinkReader,
  type LinkedChoiceReader,
  type LinkResult,
} from "./answer-links";
import {
  CHOICE_GRAPH_VERSION,
  validateMeaningMenu,
} from "./meaning-choice-cards";
import {
  choiceRequest,
  validateChoiceItems,
  choiceFindings,
  type ChoiceReader,
  type MeaningReading,
} from "./meaning-choice";
import {
  ITEM_GRAPH_VERSION,
  validateStanceItems,
  validateFindingItems,
  type ItemValidation,
} from "./item-validation";
import {
  STANCE_GRAPH_VERSION,
  usesStructuredStances,
  contractsFor,
  reasonIds,
  compareStances,
  validateConclusionContracts,
} from "./structured-stance";
import {
  QUESTION_LOCAL_VERSION,
  answerScope,
  validateCriterionContracts,
} from "./question-local";
import { SCOPED_GRAPH_VERSION, taskScope } from "./task-scopes";
import {
  POSITION_GRAPH_VERSION,
  positionRequest,
  validatePositions,
  type PositionHints,
  type PositionReader,
} from "./position";
import {
  Annotation,
  END,
  Send,
  START,
  StateGraph,
  type BaseCheckpointSaver,
} from "@langchain/langgraph";
import type { RunnableConfig } from "@langchain/core/runnables";
import { digest } from "../model-config";
import { resolveFindings } from "../criterion-findings";
import {
  answerWindow,
  questionOwnedRun,
  type AnswerWindow,
} from "./answer-boundary";
import {
  GRAPH_VERSION,
  mergeResults,
  scoreResolved,
  validatePack,
  type CallOutcome,
  type Finding,
  type GroupResult,
  type InvocationLedger,
  type ModelReader,
  type PointResolution,
  type ReadingRequest,
  type RunInput,
  type ScoreResult,
  type TaskGroup,
  type TraceEvent,
} from "./contracts";
import {
  TASK_CONTRACT_VERSION,
  TASK_CONTRACT_V2,
  usesTaskContracts,
  taskContractRequest,
  validateTaskContracts,
  compareTaskContracts,
} from "./task-contracts";
import { meaningToStance } from "./task-meaning-interface";

type GroupInput = { run: RunInput; group: TaskGroup };
const Child = Annotation.Root({
  input: Annotation<GroupInput>(),
  answerWindow: Annotation<AnswerWindow>(),
  positionCall: Annotation<CallOutcome>(),
  positions: Annotation<PositionHints | null>(),
  linkCall: Annotation<CallOutcome>(),
  answerLinks: Annotation<LinkResult>(),
  meaningReadings: Annotation<MeaningReading[]>(),
  argumentRelations: Annotation<RelationReading[]>(),
  verifiedMeanings: Annotation<MeaningReading[]>(),
  meaningVerification: Annotation<MeaningVerification>(),
  meaningConsistency: Annotation<MeaningConsistency>(),
  conclusions: Annotation<Finding[]>(),
  positionValidation: Annotation<ItemValidation>(),
  readValidation: Annotation<ItemValidation>(),
  firstCall: Annotation<CallOutcome>(),
  reviewCall: Annotation<CallOutcome>(),
  first: Annotation<Finding[] | null>(),
  review: Annotation<Finding[] | null>(),
  reviewIds: Annotation<string[]>(),
  trace: Annotation<Record<string, TraceEvent>>({
    reducer: mergeResults,
    default: () => ({}),
  }),
  result: Annotation<GroupResult>(),
});
const Parent = Annotation.Root({
  run: Annotation<RunInput>(),
  results: Annotation<Record<string, GroupResult>>({
    reducer: mergeResults,
    default: () => ({}),
  }),
  trace: Annotation<Record<string, TraceEvent>>({
    reducer: mergeResults,
    default: () => ({}),
  }),
  score: Annotation<ScoreResult>(),
});
function event(node: string, detail: string) {
  return { trace: { [node]: { node, detail } } };
}

// One shared semaphore can be injected across runs. LangGraph also limits each run.
export function createLimiter(limit: number) {
  let active = 0;
  const queue: (() => void)[] = [];
  return async <T>(action: () => Promise<T>) => {
    if (active >= limit)
      await new Promise<void>((resolve) => queue.push(resolve));
    else active++;
    try {
      return await action();
    } finally {
      const next = queue.shift();
      if (next) next();
      else active--;
    }
  };
}
export function readingRequest(
  input: GroupInput,
  ids: string[],
): ReadingRequest {
  if (input.run.reasonContext && !usesStructuredStances(input.run.version))
    throw new Error("reason-context-requires-reason-node");
  const bounded = Boolean(input.run.answerBoundary);
  const run = questionOwnedRun(input.run, input.group);
  const scope = [
    SCOPED_GRAPH_VERSION,
    QUESTION_LOCAL_VERSION,
    STANCE_GRAPH_VERSION,
    ITEM_GRAPH_VERSION,
  ].includes(run.version)
    ? taskScope(input.group)
    : undefined;
  if (scope && usesStructuredStances(run.version)) {
    scope.targets = scope.targets
      .map((t) => ({
        ...t,
        criterionIds: t.criterionIds.filter((id) => ids.includes(id)),
      }))
      .filter((t) => t.criterionIds.length > 0);
  }
  return {
    input: {
      ...run.pack.input,
      ...(scope || bounded
        ? { question: scope?.question ?? input.group.title }
        : {}),
      criteria: run.pack.input.criteria.filter((p) => ids.includes(p.id)),
      answerId: digest(run.answer),
      studentText: run.answer,
    },
    policy: run.pack.policy.filter((p) => ids.includes(p.id)),
    ...(scope ? { taskScope: scope } : {}),
    ...(usesStructuredStances(run.version) ? { reasonOnly: true } : {}),
    ...(run.reasonContext ? { reasonContext: run.reasonContext } : {}),
    ...(bounded ||
    [QUESTION_LOCAL_VERSION, STANCE_GRAPH_VERSION, ITEM_GRAPH_VERSION].includes(
      run.version,
    )
      ? {
          answerScope: answerScope(run, input.group),
          criterionContracts: run.pack.criterionContracts?.filter((c) =>
            ids.includes(c.id),
          ),
        }
      : {}),
  };
}
export function buildGradingGraph(deps: {
  ledger: InvocationLedger;
  reader: ModelReader;
  positionReader?: PositionReader;
  choiceReader?: ChoiceReader;
  directReader?: DirectReader;
  argumentReader?: ArgumentReader;
  isolatedRelationReader?: IsolatedRelationReader;
  verificationReader?: DirectReader;
  linkReader?: LinkReader;
  linkedChoiceReader?: LinkedChoiceReader;
  pauseAfterPosition?: boolean;
  checkpointer?: BaseCheckpointSaver;
  limit?: ReturnType<typeof createLimiter>;
  pauseBeforeScore?: boolean;
  persist?: (
    run: RunInput,
    score: ScoreResult,
    groups: Record<string, GroupResult>,
  ) => Promise<void>;
}) {
  const limit = deps.limit ?? createLimiter(2);
  const invoke = async (
    input: GroupInput,
    phase: "position" | "read" | "review",
    request: unknown,
    send: (signal: AbortSignal) => ReturnType<ModelReader>,
    signal?: AbortSignal,
  ): Promise<CallOutcome> =>
    limit(async () => {
      if (signal?.aborted || Date.now() >= input.run.deadline)
        return { status: "deadline_blocked" };
      const deadline = AbortSignal.timeout(
        Math.max(1, input.run.deadline - Date.now()),
      );
      const combined = signal ? AbortSignal.any([signal, deadline]) : deadline;
      return deps.ledger.execute(
        {
          runId: input.run.runId,
          groupId: input.group.id,
          phase,
          requestHash: digest({
            request,
            modelIdentity: input.run.modelIdentity,
            version: input.run.version,
            ...(input.run.answerBoundary
              ? {
                  answerWindow: answerWindow(input.run, input.group),
                }
              : {}),
          }),
          maxCalls: input.run.maxCalls,
          maxReviews: [
            POSITION_GRAPH_VERSION,
            SCOPED_GRAPH_VERSION,
            QUESTION_LOCAL_VERSION,
            STANCE_GRAPH_VERSION,
            ITEM_GRAPH_VERSION,
          ].includes(input.run.version)
            ? 0
            : input.run.maxCalls - input.run.pack.groups.length,
        },
        () =>
          new Promise((resolve, reject) => {
            const abort = () => reject(new Error("call-aborted"));
            combined.addEventListener("abort", abort, { once: true });
            if (combined.aborted) {
              combined.removeEventListener("abort", abort);
              abort();
              return;
            }
            send(combined)
              .then(resolve, reject)
              .finally(() => combined.removeEventListener("abort", abort));
          }),
      );
    });
  const call = (
    input: GroupInput,
    phase: "read" | "review",
    ids: string[],
    signal?: AbortSignal,
    hints?: PositionHints,
  ) => {
    const request: ReadingRequest = {
      ...readingRequest(input, ids),
      ...(hints && !usesStructuredStances(input.run.version)
        ? { positionHints: hints }
        : {}),
    };
    return invoke(
      input,
      phase,
      request,
      (combined) => deps.reader(request, combined, { phase }),
      signal,
    );
  };
  const validated = (
    input: GroupInput,
    ids: string[],
    outcome: CallOutcome,
  ) => {
    if (outcome.status !== "completed" || outcome.receipt.providerFailure)
      return null;
    try {
      return resolveFindings(
        readingRequest(input, ids).input,
        outcome.receipt.raw,
      ).observations.criteria;
    } catch {
      return null;
    }
  };
  const childBuilder = new StateGraph(Child)
    .addNode("prepare_context", (s) => ({
      ...(s.input.run.answerBoundary
        ? { answerWindow: answerWindow(s.input.run, s.input.group) }
        : {}),
      ...event(
        "prepare_context",
        s.input.run.answerBoundary
          ? "整卷保留；仅向本组发送本问及明确关联的原答。"
          : "完整案情与原答保留；仅输出本组要点。",
      ),
    }))
    .addNode("empty_answer", (s) => {
      const conclusions = new Set(
        usesStructuredStances(s.input.run.version)
          ? contractsFor(s.input.run.pack, s.input.group).map(
              (c) => c.criterionId,
            )
          : [],
      );
      const findings = s.input.group.criterionIds.map((id): Finding => ({
        id,
        finding: "absent",
        evidenceIds: [],
        reason: "本问未填写答案且没有关联内容。",
      }));
      return {
        first: findings.filter((f) => !conclusions.has(f.id)),
        conclusions: findings.filter((f) => conclusions.has(f.id)),
        ...event("empty_answer", "本问确为空白；代码记录未作答，未调用模型。"),
      };
    })
    .addNode("locate_answer_links", async (s, config) => {
      const request = linkRequest(s.input.run, s.input.group);
      return {
        linkCall: await invoke(
          s.input,
          "position",
          request,
          (signal) => deps.linkReader!(request, signal),
          config.signal,
        ),
        ...event(
          "locate_answer_links",
          "模型单独定位跨问连接及明确覆盖的原文；不判读立场或得分。",
        ),
      };
    })
    .addNode("validate_answer_links", (s) => ({
      answerLinks: validateLinks(
        linkRequest(s.input.run, s.input.group),
        s.linkCall,
      ),
      ...event(
        "validate_answer_links",
        "代码检查来源和范围编号；不证明模型理解的连接正确。",
      ),
    }))
    .addNode("read_linked_meanings", async (s, config) => {
      const request = linkedChoiceRequest(
        s.input.run,
        s.input.group,
        s.answerLinks,
      );
      return {
        firstCall: await invoke(
          s.input,
          "read",
          request,
          (signal) => deps.linkedChoiceReader!(request, signal),
          config.signal,
        ),
        ...event(
          "read_linked_meanings",
          "模型回看完整限定原答，读取实际主张；不重复填写各项连接。",
        ),
      };
    })
    .addNode("validate_linked_meanings", (s) => {
      const result = validateLinkedChoices(
        linkedChoiceRequest(s.input.run, s.input.group, s.answerLinks),
        s.firstCall,
      );
      return {
        meaningReadings: result.items,
        readValidation: result.validation,
        ...event(
          "validate_linked_meanings",
          "按前序明确覆盖的编号连接引用；不能推论范围、采纳或撤回。",
        ),
      };
    })
    .addNode("dispatch_isolated_readers", () =>
      event(
        "dispatch_isolated_readers",
        "代码并行分派两种独立协议；两者读取原答，不互用模型摘要。",
      ),
    )
    .addNode("read_isolated_meanings", async (s, config) => {
      const request = isolatedMeaningRequest(s.input.run, s.input.group);
      return {
        positionCall: await invoke(
          s.input,
          "position",
          request,
          (signal) => deps.directReader!(request, signal),
          config.signal,
        ),
        ...event(
          "read_isolated_meanings",
          "模型读取非目标关系的其余事项；只输出含义协议。",
        ),
      };
    })
    .addNode("validate_isolated_meanings", (s) => {
      const checked = validateDirectItems(
        isolatedMeaningRequest(s.input.run, s.input.group),
        s.positionCall,
      );
      return {
        meaningReadings: checked.items,
        positionValidation: checked.validation,
        ...event(
          "validate_isolated_meanings",
          "校验含义分支，失败不取消关系分支的有效读取。",
        ),
      };
    })
    .addNode("read_isolated_relations", async (s, config) => {
      const request = isolatedRelationRequest(s.input.run, s.input.group);
      return {
        firstCall: await invoke(
          s.input,
          "read",
          request,
          (signal) => deps.isolatedRelationReader!(request, signal),
          config.signal,
        ),
        ...event(
          "read_isolated_relations",
          "模型只读取预编目标关系及依据；不读取另一节点的结论。",
        ),
      };
    })
    .addNode("validate_isolated_relations", (s) => {
      const checked = validateIsolatedRelations(
        isolatedRelationRequest(s.input.run, s.input.group),
        s.firstCall,
      );
      return {
        argumentRelations: checked.items,
        readValidation: checked.validation,
        ...event(
          "validate_isolated_relations",
          "校验关系分支，失败不取消含义分支的有效读取。",
        ),
      };
    })
    .addNode("read_argument_relations", async (s, config) => {
      const request = argumentRequest(s.input.run, s.input.group);
      return {
        firstCall: await invoke(
          s.input,
          "read",
          request,
          (signal) => deps.argumentReader!(request, signal),
          config.signal,
        ),
        ...event(
          "read_argument_relations",
          "模型分别读取实际主张及原答的依据—目标关系；不计分。",
        ),
      };
    })
    .addNode("validate_argument_relations", (s) => {
      const checked = validateArgumentItems(
        argumentRequest(s.input.run, s.input.group),
        s.firstCall,
      );
      return {
        meaningReadings: checked.items,
        argumentRelations: checked.relations,
        readValidation: checked.validation,
        ...event(
          "validate_argument_relations",
          "校验输出、候选依据及原文编号；缺项保持失败，语义正确性仍需检验。",
        ),
      };
    })
    .addNode("compose_argument_relations", (s) => ({
      meaningReadings: composeArgumentMeanings(
        s.input.run.pack,
        s.meaningReadings,
        s.argumentRelations,
      ),
      ...event(
        "compose_argument_relations",
        "仅组合模型明确连接的依据，不把事实共现或分散局部连接拼成完整理由。",
      ),
    }))
    .addNode("read_direct_meanings", async (s, config) => {
      const request = directRequest(s.input.run, s.input.group);
      return {
        firstCall: await invoke(
          s.input,
          "read",
          request,
          (signal) => deps.directReader!(request, signal),
          config.signal,
        ),
        ...event(
          "read_direct_meanings",
          "模型直接读取本人实际含义与完整引用语境；不输出分数或单独的关联图。",
        ),
      };
    })
    .addNode("validate_direct_meanings", (s) => {
      const result = validateDirectItems(
        directRequest(s.input.run, s.input.group),
        s.firstCall,
      );
      return {
        meaningReadings: result.items,
        readValidation: result.validation,
        ...event(
          "validate_direct_meanings",
          "代码核验事项、选项和原文来源；语义支持与采用范围仍是模型判断，未经代码证明。",
        ),
      };
    })
    .addNode("read_meanings", async (s, config) => {
      const request = choiceRequest(s.input.run, s.input.group);
      return {
        firstCall: await invoke(
          s.input,
          "read",
          request,
          (signal) => deps.choiceReader!(request, signal),
          config.signal,
        ),
        ...event(
          "read_meanings",
          "模型选择原答实际保留的完整含义；同一事项只读取一次。",
        ),
      };
    })
    .addNode("validate_meanings", (s) => {
      const checked = validateChoiceItems(
        choiceRequest(s.input.run, s.input.group),
        s.firstCall,
      );
      return {
        meaningReadings: checked.items,
        readValidation: checked.validation,
        ...event(
          "validate_meanings",
          "代码检查事项、选项及原文引用；不证明语义正确。",
        ),
      };
    })
    .addNode("verify_meaning_support", async (s, config) => {
      const request = verificationRequest(s.input.run, s.input.group);
      return {
        reviewCall: await invoke(
          s.input,
          "review",
          request,
          (signal) => deps.verificationReader!(request, signal),
          config.signal,
        ),
        ...event(
          "verify_meaning_support",
          "独立核对预编事实与理由事项；不给首轮意见，不重判纯结论，不输出分数。",
        ),
      };
    })
    .addNode("reconcile_meaning_support", (s) => {
      const request = verificationRequest(s.input.run, s.input.group);
      const checked = validateDirectItems(request, s.reviewCall);
      const result = reconcileMeanings(request, s.meaningReadings, checked);
      return {
        verifiedMeanings: result.rows,
        meaningVerification: result.verification,
        ...event(
          "reconcile_meaning_support",
          "代码按状态及含义集合比对，两读一致才保留；分歧与未完成核验均保留待核对。",
        ),
      };
    })
    .addNode("compose_verified_meanings", (s) => ({
      first: verificationFindings(
        s.input.run,
        s.input.group,
        s.verifiedMeanings,
        s.meaningVerification,
      ),
      ...event(
        "compose_verified_meanings",
        "按原题卡汇总；两读一致仅是意见一致，代码没有证明语义正确。",
      ),
    }))
    .addNode("check_meaning_consistency", (s) => ({
      meaningConsistency: checkMeaningConsistency(
        s.input.run.pack,
        s.input.group,
        s.meaningReadings,
      ),
      ...event(
        "check_meaning_consistency",
        "代码检查预编含义之间的必要前提；不推断原答，不确认哪项读取为真。",
      ),
    }))
    .addNode("compose_consistent_meanings", (s) => ({
      first: holdInconsistentFindings(
        retainOtherBasisNotes(
          s.input.run.pack,
          choiceFindings(s.input.run, s.input.group, s.meaningReadings),
          s.argumentRelations ?? [],
        ),
        s.meaningConsistency,
      ),
      ...event(
        "compose_consistent_meanings",
        "冲突涉及的读取保留待核对，其余按原题卡计分；前提相容不等于理由成立。",
      ),
    }))
    .addNode("compose_meanings", (s) => ({
      first: choiceFindings(s.input.run, s.input.group, s.meaningReadings),
      ...event(
        "compose_meanings",
        "代码复用已声明的相同事项，按原题卡条件合成判断，不推论缺失关系。",
      ),
    }))
    .addNode("read_contracts", async (s, config) => {
      const request = taskContractRequest(s.input.run, s.input.group);
      return {
        firstCall: await invoke(
          s.input,
          "read",
          request,
          (signal) => deps.positionReader!(request, signal),
          config.signal,
        ),
        ...event(
          "read_contracts",
          "模型按题卡的明确任务识别实际主张与关系；不输出判分标签。",
        ),
      };
    })
    .addNode("validate_contracts", (s) => {
      const request = taskContractRequest(s.input.run, s.input.group);
      const outcome =
        s.input.run.version === TASK_CONTRACT_V2 &&
        s.firstCall.status === "completed"
          ? {
              ...s.firstCall,
              receipt: {
                ...s.firstCall.receipt,
                raw: meaningToStance(s.firstCall.receipt.raw),
              },
            }
          : s.firstCall;
      const checked = validateStanceItems(request, outcome);
      return {
        positions: { taskId: request.task.id, propositions: checked.items },
        readValidation: checked.validation,
        ...event(
          "validate_contracts",
          "代码逐项检查字段和原答引用；语义未被代码证明。",
        ),
      };
    })
    .addNode("compare_contracts", (s) => ({
      first:
        s.positions && "propositions" in s.positions
          ? compareTaskContracts(
              s.input.run.pack.taskContracts!.filter((c) =>
                s.input.group.criterionIds.includes(c.criterionId),
              ),
              s.positions,
            )
          : null,
      ...event(
        "compare_contracts",
        "代码按预编必要内容及排除条件合成本项状态，不拼接推导学生未写的关系。",
      ),
    }))
    .addNode("locate_positions", async (s, config) => {
      const request = positionRequest(s.input.run, s.input.group);
      return {
        positionCall: await invoke(
          s.input,
          "position",
          request,
          (signal) => deps.positionReader!(request, signal),
          config.signal,
        ),
        ...event("locate_positions", "模型记录本问实际立场，不评对错或分数。"),
      };
    })
    .addNode("validate_positions", (s) => {
      if (s.input.run.version === ITEM_GRAPH_VERSION) {
        const request = positionRequest(s.input.run, s.input.group);
        if (!("propositions" in request))
          throw new Error("invalid-stance-request");
        const checked = validateStanceItems(request, s.positionCall);
        return {
          positions: checked.items.length
            ? { taskId: request.task.id, propositions: checked.items }
            : null,
          positionValidation: checked.validation,
          first: null,
          ...event(
            "validate_positions",
            "逐命题校验；保留独立有效项，异常与原始回执单独保存。",
          ),
        };
      }
      let positions: PositionHints | null = null;
      if (
        s.positionCall.status === "completed" &&
        !s.positionCall.receipt.providerFailure
      ) {
        try {
          positions = validatePositions(
            positionRequest(s.input.run, s.input.group),
            s.positionCall.receipt.raw,
          );
        } catch {
          /* Keep failure; never student zero. */
        }
      }
      return {
        positions,
        first: null,
        ...event(
          "validate_positions",
          positions
            ? "代码校验引用与字段，不证明释义正确。"
            : "定位步骤失败，本组不自动重试。",
        ),
      };
    })
    .addNode("compare_stances", (s) => ({
      conclusions:
        s.positions && "propositions" in s.positions
          ? compareStances(
              contractsFor(s.input.run.pack, s.input.group).filter((c) =>
                c.propositions.every(
                  (p) =>
                    s.positions &&
                    "propositions" in s.positions &&
                    s.positions.propositions.some((v) => v.id === p.id),
                ),
              ),
              s.positions,
            )
          : [],
      ...event(
        "compare_stances",
        "代码对照预编命题；不推断新结论，未知保持未定。",
      ),
    }))
    .addNode("read_group", async (s, config) => ({
      firstCall: await call(
        s.input,
        "read",
        usesStructuredStances(s.input.run.version)
          ? reasonIds(s.input.run.pack, s.input.group)
          : s.input.group.criterionIds,
        config.signal,
        s.positions ?? undefined,
      ),
      ...event(
        "read_group",
        s.positions
          ? "回看完整原答核验前序定位，并按本组题卡判读。"
          : "第一次读取本组要点。",
      ),
    }))
    .addNode("validate_reading", (s) => {
      if (s.input.run.version === ITEM_GRAPH_VERSION) {
        const request = readingRequest(
          s.input,
          reasonIds(s.input.run.pack, s.input.group),
        );
        const checked = validateFindingItems(request.input, s.firstCall);
        return {
          first: checked.items.length ? checked.items : null,
          readValidation: checked.validation,
          ...event(
            "validate_reading",
            "逐理由项校验，不丢弃有效兄弟项；不证明语义正确。",
          ),
        };
      }
      return {
        first: validated(
          s.input,
          usesStructuredStances(s.input.run.version)
            ? reasonIds(s.input.run.pack, s.input.group)
            : s.input.group.criterionIds,
          s.firstCall,
        ),
        ...event(
          "validate_reading",
          "代码核对字段、要点覆盖和原文编号；不证明语义正确。",
        ),
      };
    })
    .addNode("route_review", (s) => {
      const reviewIds =
        s.input.run.reviewMode === "off"
          ? []
          : s.input.group.criterionIds.filter(
              (id) =>
                s.input.group.requiredReviewIds.includes(id) ||
                s.first?.some(
                  (p) =>
                    p.id === id &&
                    ["uncertain", "conflicting"].includes(p.finding),
                ),
            );
      return {
        reviewIds,
        ...event(
          "route_review",
          reviewIds.length
            ? `仅复核：${reviewIds.join("、")}`
            : s.input.run.reviewMode === "off"
              ? "本次对照关闭复核，保留首轮未确定项。"
              : "本组无需追加复核。",
        ),
      };
    })
    .addNode("review_group", async (s, config) => ({
      reviewCall: await call(s.input, "review", s.reviewIds, config.signal),
      ...event("review_group", "独立读取选中要点，不提供首轮判断。"),
    }))
    .addNode("validate_review", (s) => ({
      review: validated(s.input, s.reviewIds, s.reviewCall),
      ...event("validate_review", "核对复核输出完整性与原文编号。"),
    }))
    .addNode("resolve_group", (s) => {
      if (s.answerWindow?.blocked) {
        const result: GroupResult = {
          groupId: s.input.group.id,
          status: "pending",
          answerWindow: s.answerWindow,
          points: s.input.group.criterionIds.map((id) => ({
            id,
            finding: null,
            status: "pending",
            origin: "input_scope_pending",
          })),
          first: null,
          review: null,
          calls: {},
          trace: [
            ...Object.values(s.trace),
            {
              node: "resolve_group",
              detail:
                s.answerWindow.blockedReason === "unassigned_text"
                  ? "存在未分区原文，未启动模型；不得当作漏答或零分。"
                  : "关联的回答为空，先保留待处理；未启动本组模型。",
            },
          ],
        };
        return { result };
      }
      const structured = usesStructuredStances(s.input.run.version);
      const allFindings = structured
        ? [...(s.conclusions ?? []), ...(s.first ?? [])]
        : s.first;
      const conclusionIds = new Set(
        contractsFor(s.input.run.pack, s.input.group).map((c) => c.criterionId),
      );
      const points = s.input.group.criterionIds.map((id): PointResolution => {
        const first = allFindings?.find((p) => p.id === id);
        if (!first)
          return { id, finding: null, status: "failed", origin: "read_failed" };
        const contract = s.input.run.pack.taskContracts?.find(
          (c) => c.criterionId === id,
        );
        const verifiedCriterion = Boolean(
          s.meaningVerification &&
          contract &&
          [...contract.required, ...(contract.prohibited ?? [])].some((p) =>
            s.meaningVerification.topicIds.includes(
              s.input.run.pack.meaningMenu!.bindings[p.id],
            ),
          ),
        );
        if (!s.reviewIds?.includes(id))
          return {
            id,
            finding: first.finding,
            status: ["uncertain", "conflicting"].includes(first.finding)
              ? "pending"
              : "resolved",
            origin:
              s.answerWindow && !s.answerWindow.text.trim()
                ? "empty_answer"
                : s.meaningConsistency?.affectedCriterionIds.includes(id)
                  ? "meaning_inconsistent"
                  : verifiedCriterion
                    ? ["uncertain", "conflicting"].includes(first.finding)
                      ? "verification_pending"
                      : "verification_agreement"
                    : structured && conclusionIds.has(id)
                      ? "structured_stance"
                      : "first",
          };
        const second = s.review?.find((p) => p.id === id);
        if (!second)
          return {
            id,
            finding: null,
            status: "pending",
            origin: "review_unavailable",
          };
        const clear = !["uncertain", "conflicting"].includes(second.finding);
        if (clear && first.finding === second.finding)
          return {
            id,
            finding: second.finding,
            status: "resolved",
            origin: "agreement",
          };
        if (clear && first.finding === "uncertain")
          return {
            id,
            finding: second.finding,
            status: "resolved",
            origin: "review",
          };
        return {
          id,
          finding: null,
          status: "pending",
          origin: "disagreement",
          ...(clear && !["uncertain", "conflicting"].includes(first.finding)
            ? { candidates: [first.finding, second.finding] }
            : {}),
        };
      });
      const detail = points.some((p) => p.status === "failed")
        ? "首轮读取失败，不能当作学生答错。"
        : points.some((p) => p.status === "pending")
          ? "保留分歧，不擅自选择一个模型判断。"
          : "按规则合并结果；一致不等于语义已被证明。";
      const result: GroupResult = {
        groupId: s.input.group.id,
        ...(s.answerWindow ? { answerWindow: s.answerWindow } : {}),
        status: points.some((p) => p.status === "failed")
          ? "failed"
          : points.some((p) => p.status === "pending")
            ? "pending"
            : "completed",
        points,
        ...([
          ITEM_GRAPH_VERSION,
          TASK_CONTRACT_VERSION,
          TASK_CONTRACT_V2,
          VERIFY_GRAPH_VERSION,
          DIRECT_GRAPH_VERSION,
          ARGUMENT_GRAPH_VERSION,
          ISOLATED_GRAPH_VERSION,
          CHOICE_GRAPH_VERSION,
          LINK_GRAPH_VERSION,
        ].includes(s.input.run.version)
          ? {
              validation: {
                ...(s.positionValidation
                  ? { position: s.positionValidation }
                  : {}),
                ...(s.readValidation ? { read: s.readValidation } : {}),
              },
            }
          : {}),
        first: allFindings,
        ...(structured
          ? {
              conclusionFindings: s.conclusions ?? [],
              reasonFindings: s.first ?? null,
            }
          : {}),
        review: s.review ?? null,
        calls: {
          ...(s.positionCall ? { position: s.positionCall } : {}),
          ...(s.linkCall ? { position: s.linkCall } : {}),
          ...(s.firstCall ? { read: s.firstCall } : {}),
          ...(s.reviewCall ? { review: s.reviewCall } : {}),
        },
        ...(s.positionCall ? { positionHints: s.positions } : {}),
        ...(s.answerLinks ? { sourceAssociations: s.answerLinks } : {}),
        ...(s.argumentRelations
          ? {
              argumentRelations: s.argumentRelations,
              composedMeanings: s.meaningReadings,
            }
          : {}),
        ...(s.meaningConsistency
          ? { meaningConsistency: s.meaningConsistency }
          : {}),
        ...(s.meaningVerification
          ? { meaningVerification: s.meaningVerification }
          : {}),
        ...(s.positions && "crossQuestionNotes" in s.positions
          ? {
              contextNotes: {
                status: "model_reported_unverified" as const,
                notes: s.positions.crossQuestionNotes,
              },
            }
          : {}),
        trace: [...Object.values(s.trace), { node: "resolve_group", detail }],
      };
      return { result };
    })
    .addEdge(START, "prepare_context")
    .addConditionalEdges(
      "prepare_context",
      (s) =>
        s.answerWindow?.blocked
          ? "resolve_group"
          : s.answerWindow && !s.answerWindow.text.trim()
            ? "empty_answer"
            : s.input.run.version === ISOLATED_GRAPH_VERSION
              ? "dispatch_isolated_readers"
              : s.input.run.version === ARGUMENT_GRAPH_VERSION
                ? "read_argument_relations"
                : [DIRECT_GRAPH_VERSION, VERIFY_GRAPH_VERSION].includes(
                      s.input.run.version,
                    )
                  ? "read_direct_meanings"
                  : s.input.run.version === LINK_GRAPH_VERSION
                    ? linkRequest(s.input.run, s.input.group).answerScope
                        .context.length
                      ? "locate_answer_links"
                      : "read_meanings"
                    : s.input.run.version === CHOICE_GRAPH_VERSION
                      ? "read_meanings"
                      : usesTaskContracts(s.input.run.version)
                        ? "read_contracts"
                        : usesStructuredStances(s.input.run.version)
                          ? contractsFor(s.input.run.pack, s.input.group).length
                            ? "locate_positions"
                            : "read_group"
                          : [
                                POSITION_GRAPH_VERSION,
                                SCOPED_GRAPH_VERSION,
                                QUESTION_LOCAL_VERSION,
                                STANCE_GRAPH_VERSION,
                                ITEM_GRAPH_VERSION,
                              ].includes(s.input.run.version)
                            ? "locate_positions"
                            : "read_group",
      [
        "locate_positions",
        "read_group",
        "read_contracts",
        "read_meanings",
        "read_direct_meanings",
        "read_argument_relations",
        "dispatch_isolated_readers",
        "locate_answer_links",
        "resolve_group",
        "empty_answer",
      ],
    )
    .addEdge("locate_answer_links", "validate_answer_links")
    .addEdge("validate_answer_links", "read_linked_meanings")
    .addEdge("read_linked_meanings", "validate_linked_meanings")
    .addEdge("validate_linked_meanings", "compose_meanings")
    .addEdge("dispatch_isolated_readers", "read_isolated_meanings")
    .addEdge("dispatch_isolated_readers", "read_isolated_relations")
    .addEdge("read_isolated_meanings", "validate_isolated_meanings")
    .addEdge("read_isolated_relations", "validate_isolated_relations")
    .addEdge(
      ["validate_isolated_meanings", "validate_isolated_relations"],
      "compose_argument_relations",
    )
    .addEdge("read_argument_relations", "validate_argument_relations")
    .addEdge("validate_argument_relations", "compose_argument_relations")
    .addEdge("compose_argument_relations", "check_meaning_consistency")
    .addEdge("read_direct_meanings", "validate_direct_meanings")
    .addConditionalEdges(
      "validate_direct_meanings",
      (s) =>
        s.input.run.version === VERIFY_GRAPH_VERSION &&
        s.meaningReadings.length &&
        verificationRequest(s.input.run, s.input.group).topics.length
          ? "verify_meaning_support"
          : s.input.run.meaningConsistency
            ? "check_meaning_consistency"
            : "compose_meanings",
      [
        "verify_meaning_support",
        "check_meaning_consistency",
        "compose_meanings",
      ],
    )
    .addEdge("verify_meaning_support", "reconcile_meaning_support")
    .addEdge("reconcile_meaning_support", "compose_verified_meanings")
    .addEdge("compose_verified_meanings", "resolve_group")
    .addEdge("read_meanings", "validate_meanings")
    .addConditionalEdges(
      "validate_meanings",
      (s) =>
        s.input.run.meaningConsistency
          ? "check_meaning_consistency"
          : "compose_meanings",
      ["check_meaning_consistency", "compose_meanings"],
    )
    .addEdge("check_meaning_consistency", "compose_consistent_meanings")
    .addEdge("compose_consistent_meanings", "resolve_group")
    .addEdge("compose_meanings", "resolve_group")
    .addEdge("empty_answer", "resolve_group")
    .addEdge("read_contracts", "validate_contracts")
    .addEdge("validate_contracts", "compare_contracts")
    .addEdge("compare_contracts", "resolve_group")
    .addEdge("locate_positions", "validate_positions")
    .addConditionalEdges(
      "validate_positions",
      (s) =>
        usesStructuredStances(s.input.run.version)
          ? "compare_stances"
          : s.positions
            ? "read_group"
            : "resolve_group",
      ["compare_stances", "read_group", "resolve_group"],
    )
    .addConditionalEdges(
      "compare_stances",
      (s) =>
        reasonIds(s.input.run.pack, s.input.group).length
          ? "read_group"
          : "resolve_group",
      ["read_group", "resolve_group"],
    )
    .addEdge("read_group", "validate_reading")
    .addConditionalEdges(
      "validate_reading",
      (s) => (s.first ? "route_review" : "resolve_group"),
      ["route_review", "resolve_group"],
    )
    .addConditionalEdges(
      "route_review",
      (s) => (s.reviewIds.length ? "review_group" : "resolve_group"),
      ["review_group", "resolve_group"],
    )
    .addEdge("review_group", "validate_review")
    .addEdge("validate_review", "resolve_group")
    .addEdge("resolve_group", END);
  const child = childBuilder.compile(
    deps.pauseAfterPosition ? { interruptBefore: ["read_group"] } : {},
  );
  const parentBuilder = new StateGraph(Parent)
    .addNode("prepare_run", (s) => {
      validatePack(s.run.pack);
      if (s.run.meaningConsistency) {
        if (
          s.run.meaningConsistency !== MEANING_CONSISTENCY_VERSION ||
          ![
            DIRECT_GRAPH_VERSION,
            CHOICE_GRAPH_VERSION,
            ARGUMENT_GRAPH_VERSION,
            ISOLATED_GRAPH_VERSION,
          ].includes(s.run.version)
        )
          throw Error("unsupported-meaning-consistency-run");
        validateMeaningDependencies(s.run.pack);
      }
      if (s.run.version === ISOLATED_GRAPH_VERSION) {
        validateArgumentRelations(s.run.pack);
        if (
          !deps.directReader ||
          !deps.isolatedRelationReader ||
          s.run.meaningConsistency !== MEANING_CONSISTENCY_VERSION ||
          s.run.reviewMode !== "off" ||
          s.run.reasonContext ||
          !s.run.answerBoundary ||
          s.run.maxCalls !== 2 * s.run.pack.groups.length ||
          s.run.pack.groups.some(
            (g) =>
              !isolatedMeaningRequest(s.run, g).topics.length ||
              !isolatedRelationRequest(s.run, g).relations.length,
          )
        )
          throw Error("invalid-isolated-arguments-run");
      }
      if (s.run.version === ARGUMENT_GRAPH_VERSION) {
        validateArgumentRelations(s.run.pack);
        if (
          !deps.argumentReader ||
          s.run.meaningConsistency !== MEANING_CONSISTENCY_VERSION ||
          s.run.reviewMode !== "off" ||
          s.run.reasonContext ||
          !s.run.answerBoundary ||
          s.run.maxCalls !== s.run.pack.groups.length
        )
          throw Error("invalid-argument-relations-run");
      }
      if (s.run.version === VERIFY_GRAPH_VERSION) {
        validateMeaningMenu(s.run.pack);
        if (
          !deps.directReader ||
          !deps.verificationReader ||
          s.run.reviewMode !== "bounded" ||
          s.run.reasonContext ||
          !s.run.answerBoundary ||
          s.run.maxCalls !== 2 * s.run.pack.groups.length
        )
          throw Error("invalid-meaning-verification-run");
      }
      if (s.run.version === DIRECT_GRAPH_VERSION) {
        validateMeaningMenu(s.run.pack);
        if (
          !deps.directReader ||
          s.run.reviewMode !== "off" ||
          s.run.reasonContext ||
          !s.run.answerBoundary ||
          s.run.maxCalls !== s.run.pack.groups.length
        )
          throw Error("invalid-direct-meaning-run");
      }
      if ([CHOICE_GRAPH_VERSION, LINK_GRAPH_VERSION].includes(s.run.version)) {
        if (
          s.run.version === LINK_GRAPH_VERSION &&
          (!deps.linkReader || !deps.linkedChoiceReader)
        )
          throw Error("missing-link-readers");
        validateMeaningMenu(s.run.pack);
        if (
          !deps.choiceReader ||
          s.run.reviewMode !== "off" ||
          s.run.reasonContext
        )
          throw new Error("invalid-meaning-choice-run");
      }
      if (usesTaskContracts(s.run.version)) {
        validateTaskContracts(s.run.pack);
        if (
          !deps.positionReader ||
          s.run.reviewMode !== "off" ||
          s.run.reasonContext
        )
          throw new Error("invalid-task-contract-run");
      }
      if (s.run.answerBoundary)
        s.run.pack.groups.forEach((g) => answerWindow(s.run, g));
      if (
        [
          SCOPED_GRAPH_VERSION,
          QUESTION_LOCAL_VERSION,
          STANCE_GRAPH_VERSION,
          ITEM_GRAPH_VERSION,
        ].includes(s.run.version)
      )
        s.run.pack.groups.forEach(taskScope);
      if (
        [
          QUESTION_LOCAL_VERSION,
          STANCE_GRAPH_VERSION,
          ITEM_GRAPH_VERSION,
        ].includes(s.run.version)
      ) {
        s.run.pack.groups.forEach((g) => answerScope(s.run, g));
        validateCriterionContracts(s.run.pack);
      }
      if (usesStructuredStances(s.run.version))
        validateConclusionContracts(s.run.pack);
      if (
        ![
          GRAPH_VERSION,
          POSITION_GRAPH_VERSION,
          SCOPED_GRAPH_VERSION,
          QUESTION_LOCAL_VERSION,
          STANCE_GRAPH_VERSION,
          ITEM_GRAPH_VERSION,
          TASK_CONTRACT_VERSION,
          TASK_CONTRACT_V2,
          VERIFY_GRAPH_VERSION,
          DIRECT_GRAPH_VERSION,
          CHOICE_GRAPH_VERSION,
          LINK_GRAPH_VERSION,
          ARGUMENT_GRAPH_VERSION,
          ISOLATED_GRAPH_VERSION,
        ].includes(s.run.version) ||
        ([
          POSITION_GRAPH_VERSION,
          SCOPED_GRAPH_VERSION,
          QUESTION_LOCAL_VERSION,
          STANCE_GRAPH_VERSION,
          ITEM_GRAPH_VERSION,
        ].includes(s.run.version) &&
          (!deps.positionReader || s.run.reviewMode !== "off")) ||
        !s.run.answer.trim() ||
        s.run.maxCalls < s.run.pack.groups.length ||
        s.run.maxCalls > s.run.pack.groups.length * 2
      )
        throw new Error("invalid-graph-run");
      return event("prepare_run", "绑定本次答卷、题卡、模型与流程版本。");
    })
    .addNode("dispatch_groups", () =>
      event("dispatch_groups", "按题卡预编排的小问分组；最多两组同时处理。"),
    )
    .addNode(
      "group_worker",
      async (s: { input: GroupInput }, config: RunnableConfig) => {
        const out = await child.invoke({ input: s.input }, config);
        return { results: { [s.input.group.id]: out.result } };
      },
    )
    .addNode("collect_groups", (s) => {
      const expected = s.run.pack.groups.map((g) => g.id);
      if (
        Object.keys(s.results).length !== expected.length ||
        expected.some((id) => !s.results[id])
      )
        throw new Error("incomplete-group-barrier");
      for (const g of s.run.pack.groups) {
        const ids = s.results[g.id].points.map((p) => p.id);
        if (
          ids.length !== g.criterionIds.length ||
          new Set(ids).size !== ids.length ||
          g.criterionIds.some((id) => !ids.includes(id))
        )
          throw new Error("incomplete-point-barrier");
      }
      return event(
        "collect_groups",
        `${expected.length} 组均已返回终态，包含可能的失败或待核对。`,
      );
    })
    .addNode("score_and_render", (s) => ({
      score: scoreResolved(s.run.pack, s.results),
      ...event(
        "score_and_render",
        "代码按固定分值与依赖计分，反馈取自题卡模板。",
      ),
    }))
    .addNode("persist_result", async (s) => {
      await deps.persist?.(s.run, s.score, s.results);
      return event(
        "persist_result",
        "结果绑定原答与版本保存，不覆盖其他答卷。",
      );
    })
    .addEdge(START, "prepare_run")
    .addEdge("prepare_run", "dispatch_groups")
    .addConditionalEdges(
      "dispatch_groups",
      (s) =>
        s.run.pack.groups.map(
          (group) => new Send("group_worker", { input: { run: s.run, group } }),
        ),
      ["group_worker"],
    )
    .addEdge("group_worker", "collect_groups")
    .addEdge("collect_groups", "score_and_render")
    .addEdge("score_and_render", "persist_result")
    .addEdge("persist_result", END);
  return {
    graph: parentBuilder.compile({
      checkpointer: deps.checkpointer,
      ...(deps.pauseBeforeScore
        ? { interruptBefore: ["score_and_render"] }
        : {}),
    }),
    child,
  };
}
