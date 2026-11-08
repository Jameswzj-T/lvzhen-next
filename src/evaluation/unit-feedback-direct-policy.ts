import { z } from "zod";

/** Server-owned product configuration. No browser expiry, per-question grant or activation. */
export const unitDirectPolicySchema = z
  .object({
    version: z.literal("unit-feedback-direct-service-v1"),
    id: z
      .string()
      .min(1)
      .max(160)
      .regex(/^[a-z0-9-]+$/),
    approvalRef: z.string().min(1).max(1000),
    enabled: z.boolean(),
    scope: z.literal("current_registered_questions"),
    purpose: z.literal("practice"),
    provider: z.literal("deepseek"),
    model: z.literal("deepseek-flash"),
    maxCalls: z.number().int().positive().max(40),
    // Opt-in under a later explicit service authorization. maxCalls then denotes
    // a 40-entry accounting window, never a fresh budget or a new grant ID.
    // Legacy policies without this field retain their original hard call cap.
    continuation: z
      .object({
        version: z.literal("same-ledger-technical-windows-v1"),
        approvalRef: z.string().min(1).max(1000),
      })
      .strict()
      .optional(),
    // Explicit ownership migration. Retain the existing journal and freeze its
    // historical prefix; this is server policy, never a request/env override.
    accounting: z
      .object({
        version: z.literal("project-owned-accounting-v1"),
        approvalRef: z.string().min(1).max(1000),
        priorEntryCount: z.number().int().positive(),
        priorEntriesSHA256: z.string().regex(/^[a-f0-9]{64}$/),
        inheritedUnpairedReserveCNY: z.number().finite().nonnegative(),
      })
      .strict()
      .optional(),
    // An explicitly approved task starts at a sealed prefix of the SAME ledger.
    // The legacy cumulative fields below still govern policies without this opt-in.
    // A new task is never chosen from a request, clock change or technical window.
    taskBudget: z
      .object({
        version: z.literal("project-task-budget-v1"),
        id: z
          .string()
          .min(1)
          .max(160)
          .regex(/^[a-z0-9-]+$/),
        approvalRef: z.string().min(1).max(1000),
        priorEntryCount: z.number().int().nonnegative(),
        priorEntriesSHA256: z.string().regex(/^[a-f0-9]{64}$/),
        budgetCNY: z.number().finite().positive().max(3),
        maxCalls: z.number().int().positive().max(40),
      })
      .strict()
      .optional(),
    budgetCNY: z.number().finite().positive().max(3),
    reservePerCallCNY: z.literal(0.2),
    cumulativePriorCostCNY: z.number().finite().nonnegative(),
    nightBudgetCNY: z.literal(3),
    pricing: z
      .object({
        checkedAt: z.iso.datetime(),
        officialPageSHA256: z.string().regex(/^[a-f0-9]{64}$/),
        offPeakRates: z.tuple([z.literal(1), z.literal(0.02), z.literal(4)]),
        peakRates: z.tuple([z.literal(2), z.literal(0.04), z.literal(8)]),
      })
      .strict(),
  })
  .strict()
  .superRefine((p, ctx) => {
    if (p.continuation && p.maxCalls !== 40)
      ctx.addIssue({ code: "custom", message: "direct-window-size" });
    if (p.cumulativePriorCostCNY + p.budgetCNY >= p.nightBudgetCNY)
      ctx.addIssue({ code: "custom", message: "direct-service-cost-bound" });
    if (
      p.taskBudget &&
      (!p.accounting ||
        !p.continuation ||
        p.taskBudget.priorEntryCount < p.accounting.priorEntryCount)
    )
      ctx.addIssue({ code: "custom", message: "task-budget-history-required" });
  });
export type UnitDirectPolicy = z.infer<typeof unitDirectPolicySchema>;
