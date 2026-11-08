import type { CasePack, Finding, RunInput, TaskGroup } from "./contracts";
import { questionOwnedRun } from "./answer-boundary";
import { answerSegments } from "../evidence-references";
import { answerScope, QUESTION_LOCAL_POLICY } from "./question-local";
import {
  compareStances,
  type Proposition,
  type StanceReadings,
  type StanceRequest,
} from "./structured-stance";

export const TASK_CONTRACT_VERSION = "grading-graph-task-contract-v1";
export const TASK_CONTRACT_V2 = "grading-graph-task-contract-v2";
export function usesTaskContracts(version: string) {
  return version === TASK_CONTRACT_VERSION || version === TASK_CONTRACT_V2;
}
export type MeaningCheck = Proposition & {
  role:
    "case_position" | "fact" | "general_rule" | "relation" | "case_application";
};
export type TaskContract = {
  criterionId: string;
  kind: "position" | "reason" | "combined";
  required: MeaningCheck[];
  // An explicit extra assertion can disqualify the answer; students need not
  // enumerate or rebut these. The required/prohibited policy stays in code.
  prohibited?: MeaningCheck[];
};
export function validateTaskContracts(pack: CasePack) {
  const contracts = pack.taskContracts ?? [];
  const ids = pack.input.criteria.map((p) => p.id);
  if (
    contracts.length !== ids.length ||
    new Set(contracts.map((c) => c.criterionId)).size !== ids.length ||
    contracts.some(
      (c) =>
        !ids.includes(c.criterionId) ||
        !c.required.length ||
        !["position", "reason", "combined"].includes(c.kind),
    )
  )
    throw new Error("invalid-task-contract-coverage");
  const checks = contracts.flatMap((c) => [
    ...c.required,
    ...(c.prohibited ?? []),
  ]);
  if (
    new Set(checks.map((p) => p.id)).size !== checks.length ||
    checks.some(
      (p) =>
        !p.id.trim() ||
        !p.text.trim() ||
        !["affirm", "deny"].includes(p.expected) ||
        ![
          "case_position",
          "fact",
          "general_rule",
          "relation",
          "case_application",
        ].includes(p.role),
    )
  )
    throw new Error("invalid-meaning-check");
  for (const c of contracts) {
    if (
      c.kind === "position" &&
      c.required.some((p) => p.role !== "case_position")
    )
      throw new Error("position-role-mismatch");
    if (
      c.kind === "reason" &&
      c.required.some((p) => p.role === "case_position")
    )
      throw new Error("reason-role-mismatch");
    if (
      c.kind === "combined" &&
      (!c.required.some((p) => p.role === "case_position") ||
        !c.required.some((p) => p.role === "relation"))
    )
      throw new Error("combined-requires-position-and-relation");
  }
  for (const group of pack.groups) {
    const total = contracts
      .filter((c) => group.criterionIds.includes(c.criterionId))
      .reduce((n, c) => n + c.required.length + (c.prohibited?.length ?? 0), 0);
    if (total > 12) throw new Error("too-many-group-checks");
  }
}
export function taskContractRequest(run: RunInput, group: TaskGroup) {
  run = questionOwnedRun(run, group);
  const contracts = run.pack.taskContracts!.filter((c) =>
    group.criterionIds.includes(c.criterionId),
  );
  return {
    ...(run.version === TASK_CONTRACT_V2
      ? { readingMode: "whole-meaning-v2" as const }
      : {}),
    task: { id: group.id, question: group.title },
    // Explicit allow-list: expected signs, aggregation policy, marks and
    // reference prose never enter the provider request.
    propositions: contracts.flatMap((c) =>
      [...c.required, ...(c.prohibited ?? [])].map((p) => ({
        id: p.id,
        text: p.text,
        role: p.role,
        taskKind: c.kind,
      })),
    ),
    facts: run.pack.input.facts,
    studentText: run.answer,
    answerSegments: answerSegments(run.answer),
    answerScope: answerScope(run, group),
    scopePolicy: QUESTION_LOCAL_POLICY,
  } satisfies StanceRequest;
}
export function compareTaskContracts(
  contracts: TaskContract[],
  readings: StanceReadings,
): Finding[] {
  return contracts.flatMap((c) => {
    const all = [...c.required, ...(c.prohibited ?? [])];
    // Missing protocol output stays failed; no inferred absent or zero.
    if (all.some((p) => !readings.propositions.some((r) => r.id === p.id)))
      return [];
    const required = compareStances(
      [{ criterionId: c.criterionId, propositions: c.required }],
      readings,
    )[0];
    const prohibited = (c.prohibited ?? []).map((p) => {
      const r = readings.propositions.find((r) => r.id === p.id)!;
      const active = r.mentions.filter((m) => m.use === "asserted");
      return {
        uncertain:
          r.status === "uncertain" ||
          (!active.length && r.mentions.some((m) => m.use === "conditional")),
        conflicting: new Set(active.map((m) => m.polarity)).size > 1,
        triggered: active.some((m) => m.polarity === p.expected),
        evidenceIds: active.flatMap((m) => [
          ...m.evidenceIds,
          ...m.linkEvidenceIds,
        ]),
      };
    });
    const triggered = prohibited.filter((p) => p.triggered);
    if (prohibited.some((p) => p.conflicting))
      return [
        {
          id: c.criterionId,
          finding: "conflicting" as const,
          evidenceIds: [
            ...new Set([
              ...required.evidenceIds,
              ...prohibited.flatMap((p) => p.evidenceIds),
            ]),
          ],
          reason: "同一排除命题同时保留肯定和否定，暂不能确定。",
        },
      ];
    if (prohibited.some((p) => p.uncertain))
      return [
        {
          id: c.criterionId,
          finding: "uncertain" as const,
          evidenceIds: [
            ...new Set([
              ...required.evidenceIds,
              ...prohibited.flatMap((p) => p.evidenceIds),
            ]),
          ],
          reason: "排除条件的含义或适用尚不确定。",
        },
      ];
    if (triggered.length)
      return [
        {
          id: c.criterionId,
          finding: "incorrect" as const,
          evidenceIds: [
            ...new Set([
              ...required.evidenceIds,
              ...triggered.flatMap((p) => p.evidenceIds),
            ]),
          ],
          reason:
            "识别到题卡明确排除的断言；由代码执行本项规则，语义识别仍依赖模型。",
        },
      ];
    return [
      {
        ...required,
        reason: {
          satisfied: "已识别本项全部必要含义及联系。",
          incomplete: "仅识别部分必要内容，仍有缺项。",
          absent: "未识别本项必要内容。",
          incorrect: "已识别的主张与本项预编要求相反。",
          conflicting: "同一含义同时保留肯定与否定，暂不能确定。",
          uncertain: "含义、归属或条件尚不能确定。",
        }[required.finding],
      },
    ];
  });
}
