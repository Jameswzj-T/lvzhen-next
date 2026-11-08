import { unitDirectPolicySchema } from "./unit-feedback-direct-policy";
import { unitFeedbackServiceLedgerSchema } from "./unit-feedback-provider";
import { unitDigest } from "./unit-feedback-storage";

/** Pure operator-side preparation. It never writes files, rotates by date,
 * accepts a browser request or creates a fresh ledger. Adoption is explicit. */
export function prepareUnitFeedbackTaskBudget(
  policyValue: unknown,
  ledgerValue: unknown,
  task: {
    id: string;
    approvalRef: string;
    budgetCNY: number;
    maxCalls: number;
  },
) {
  const policy = unitDirectPolicySchema.parse(policyValue);
  const ledger = unitFeedbackServiceLedgerSchema.parse(ledgerValue);
  if (ledger.grantId !== policy.id || ledger.grantHash !== unitDigest(policy))
    throw Error("task-budget-source-binding");
  if (
    !policy.accounting ||
    !policy.continuation ||
    ledger.entries.length < policy.accounting.priorEntryCount ||
    unitDigest(ledger.entries.slice(0, policy.accounting.priorEntryCount)) !==
      policy.accounting.priorEntriesSHA256
  )
    throw Error("task-budget-project-history");
  if (
    ledger.stopped ||
    policy.accounting.inheritedUnpairedReserveCNY !== 0 ||
    ledger.entries.some(
      (entry) =>
        entry.state !== "finished" ||
        !entry.usageKnown ||
        entry.costCNY === null,
    )
  )
    throw Error("task-budget-unresolved-cost");
  const previous = policy.taskBudget;
  if (
    previous &&
    (ledger.entries.length < previous.priorEntryCount ||
      unitDigest(ledger.entries.slice(0, previous.priorEntryCount)) !==
        previous.priorEntriesSHA256 ||
      ledger.entries
        .slice(previous.priorEntryCount)
        .some((entry) => entry.taskBudgetId !== previous.id))
  )
    throw Error("task-budget-previous-history");
  if (
    previous?.id === task.id ||
    ledger.entries.some((entry) => entry.taskBudgetId === task.id)
  )
    throw Error("task-budget-id-already-used");
  const nextPolicy = unitDirectPolicySchema.parse({
    ...policy,
    approvalRef: task.approvalRef,
    taskBudget: {
      version: "project-task-budget-v1",
      ...task,
      priorEntryCount: ledger.entries.length,
      priorEntriesSHA256: unitDigest(ledger.entries),
    },
  });
  const nextLedger = {
    ...ledger,
    grantHash: unitDigest(nextPolicy),
  };
  return { policy: nextPolicy, ledger: nextLedger };
}
