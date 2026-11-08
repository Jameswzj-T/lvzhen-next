import {
  Annotation,
  START,
  END,
  StateGraph,
  type BaseCheckpointSaver,
} from "@langchain/langgraph";
import { digest } from "../model-config";
import type { RunInput, TaskGroup, InvocationLedger } from "./contracts";
import {
  buildSingleClaimGraph,
  claimRequest,
  validateClaim,
  type ClaimBinding,
  type ClaimReader,
  type ClaimResult,
} from "./single-claim";

// One experimental authored criterion; no new prompt, provider, or product route.
export const CRITERION_COMPOSITION_VERSION = "criterion-composition-v1";
// Frozen current training card, not an official exam rule. A changed card needs
// reviewed bindings; matching IDs alone must not silently reuse this logic.
const CARD_SHA =
  "f9391dfa46d70e912533c288a6175559cfece33b68f171a8efdde8b97fd72e15";
export const criterionBindings: ClaimBinding[] = [
  {
    id: "liability",
    criterionId: "q3_ding",
    person: "丁",
    statement: "考生认为丁在本案承担合同诈骗责任。",
  },
  {
    id: "awareness",
    criterionId: "q3_ding",
    person: "丁",
    statement: "考生认为丁知道本案的诈骗安排。",
  },
  {
    id: "unawareness_support",
    criterionId: "q3_ding",
    person: "丁",
    statement: "考生把丁不知情作为丁不承担本案合同诈骗责任的一项依据。",
  },
  {
    id: "work_support",
    criterionId: "q3_ding",
    person: "丁",
    statement:
      "考生把丁仅按稿录字的工作范围作为丁不承担本案合同诈骗责任的一项依据。",
  },
];
export type CriterionInput = {
  run: RunInput;
  group: TaskGroup;
  reverse?: boolean;
};

export function prepareCriterion(input: CriterionInput) {
  const { run, group } = input;
  const item = run.pack.card.items.find((p) => p.criterionId === "q3_ding");
  if (
    run.version !== CRITERION_COMPOSITION_VERSION ||
    run.pack.input.caseId !== "cap-contract" ||
    group.id !== "q3" ||
    !item ||
    item.requiresConclusion ||
    !Number.isInteger(item.points) ||
    item.points <= 0
  )
    throw Error("unsupported-composition-card");
  if (
    run.pack.card.items.filter((p) => p.criterionId === item.criterionId)
      .length !== 1 ||
    run.pack.input.criteria.filter((c) => c.id === item.criterionId).length !==
      1 ||
    digest({
      caseId: run.pack.input.caseId,
      caseRevision: run.pack.input.caseRevision,
      cardVersion: run.pack.card.version,
      item,
      criterion: run.pack.input.criteria.find((c) => c.id === item.criterionId),
    }) !== CARD_SHA
  )
    throw Error("composition-card-drift");
  // Validate every scope/binding before the first call can leave the process.
  for (const binding of criterionBindings)
    claimRequest({ run, group, binding });
  return item;
}

export function composeCriterion(input: CriterionInput, claims: ClaimResult[]) {
  const item = prepareCriterion(input);
  const target = {
    liability: "denied",
    awareness: "denied",
    unawareness_support: "affirmed",
    work_support: "affirmed",
  };
  const checks = criterionBindings.map((binding) => {
    const rows = claims.filter((r) => r.binding.id === binding.id);
    const row = rows[0];
    const validation =
      rows.length === 1 && digest(row.binding) === digest(binding)
        ? validateClaim({ ...input, binding }, row.call)
        : null;
    const observed =
      validation?.status === "validated" ? validation.observation.state : null;
    const met =
      observed === null ||
      ["unclear", "conflicting", "conditional"].includes(observed)
        ? null
        : observed === target[binding.id as keyof typeof target];
    return { id: binding.id, observed, met, validation };
  });
  const issues: string[] = [];
  if (claims.some((r) => !criterionBindings.some((b) => b.id === r.binding.id)))
    issues.push("extra-binding");
  const get = (id: string) => checks.find((c) => c.id === id)!;
  // These are one-way authored implications. Detect inconsistency, never pick a winner.
  // The reciprocal is deliberately absent: two facts are NOT an argument.
  for (const [link, prerequisites] of [
    ["unawareness_support", ["awareness", "liability"]],
    ["work_support", ["liability"]],
  ] as const) {
    if (get(link).observed !== "affirmed") continue;
    for (const id of prerequisites) {
      if (get(id).met !== false) continue;
      issues.push(`inconsistent:${link}:${id}`);
      get(link).met = null;
      get(id).met = null;
    }
  }
  if (issues.includes("extra-binding"))
    checks.forEach((c) => {
      c.met = null;
    });
  const missing = checks.filter((c) => c.met === false).map((c) => c.id);
  const unresolved = checks.filter((c) => c.met === null).map((c) => c.id);
  const earned = missing.length ? 0 : unresolved.length ? null : item.points;
  return {
    version: CRITERION_COMPOSITION_VERSION,
    criterionId: item.criterionId,
    max: item.points,
    earned,
    diagnosticPending: unresolved.length > 0,
    checks,
    issues,
    missing,
    unresolved,
    feedback: unresolved.length
      ? earned === null
        ? "本项理解待核对，暂不确定分数。"
        : "本项未满足题卡；另有读取结果待核对。"
      : earned === item.points
        ? "本项符合现有训练题卡。"
        : "本项尚未满足现有训练题卡，详见未满足的条件。",
  };
}
export type CriterionResult = {
  claims: ClaimResult[];
  score: ReturnType<typeof composeCriterion>;
  trace: string[];
};
const State = Annotation.Root({
  input: Annotation<CriterionInput>(),
  claims: Annotation<ClaimResult[]>(),
  result: Annotation<CriterionResult>(),
});
export function buildCriterionCompositionGraph(deps: {
  ledger: InvocationLedger;
  reader: ClaimReader;
  checkpointer?: BaseCheckpointSaver;
}) {
  const subgraph = buildSingleClaimGraph(deps);
  return new StateGraph(State)
    .addNode("prepare_criterion", (s) => {
      prepareCriterion(s.input);
      return {};
    })
    .addNode("read_independent_claims", async (s, config) => {
      const bindings = s.input.reverse
        ? [...criterionBindings].reverse()
        : criterionBindings;
      const outcomes = await Promise.allSettled(
        bindings.map(async (binding) => {
          const out = await subgraph.invoke(
            { input: { ...s.input, binding } },
            {
              configurable: { thread_id: `${s.input.run.runId}:${binding.id}` },
              signal: config.signal,
              recursionLimit: 10,
            },
          );
          return out.result;
        }),
      );
      // Preserve ledger receipts of every in-flight sibling before propagating failure.
      if (outcomes.some((o) => o.status === "rejected"))
        throw Error("claim-subgraph-failed-inspect-ledger");
      return {
        claims: outcomes.map(
          (o) => (o as PromiseFulfilledResult<ClaimResult>).value,
        ),
      };
    })
    .addNode("compose_by_card", (s) => ({
      result: {
        claims: s.claims,
        score: composeCriterion(s.input, s.claims),
        trace: [
          "prepare_criterion",
          "read_independent_claims",
          "compose_by_card",
        ],
      },
    }))
    .addEdge(START, "prepare_criterion")
    .addEdge("prepare_criterion", "read_independent_claims")
    .addEdge("read_independent_claims", "compose_by_card")
    .addEdge("compose_by_card", END)
    .compile({ checkpointer: deps.checkpointer });
}
