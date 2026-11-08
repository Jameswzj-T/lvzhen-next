import { z } from "zod";
import type { assessQuestionScopedTable } from "../question-scoped-table";
export const TABLE_TRIAL_VERSION = "table-trial-v1";
// Case ids come from the frozen card catalogue; the service checks membership.
export const tableCaseId = z.string().regex(/^[A-Z][A-Z0-9_]{1,31}$/);
export const tableAnswers = z
  .array(
    z
      .object({
        id: z.enum(["1", "2", "3", "4", "5"]),
        text: z.string().max(5000),
      })
      .strict(),
  )
  .length(5)
  .refine(
    (a) =>
      new Set(a.map((q) => q.id)).size === 5 &&
      a.reduce((n, q) => n + q.text.length, 0) <= 12000,
  );
export const tableRequest = z.discriminatedUnion("action", [
  z
    .object({
      action: z.enum(["submit", "lookup"]),
      version: z.literal(TABLE_TRIAL_VERSION),
      caseId: tableCaseId,
      answers: tableAnswers,
    })
    .strict(),
  z
    .object({
      action: z.literal("read"),
      id: z.string().regex(/^[a-f0-9]{64}$/),
    })
    .strict(),
  z.object({ action: z.literal("list"), caseId: tableCaseId }).strict(),
]);
export type TableCase = {
  id: z.infer<typeof tableCaseId>;
  title: string;
  facts: string;
  questions: { id: string; prompt: string; maximum: number }[];
};
export type TableAnswers = z.infer<typeof tableAnswers>;
export type TableAssessment = ReturnType<typeof assessQuestionScopedTable>;
export type TableResult = {
  id: string;
  version: string;
  identity: string;
  createdAt: string;
  case: TableCase;
  answers: TableAnswers;
  state: "running" | "complete" | "stopped";
  source: "real_provider" | "offline_test";
  assessment: TableAssessment | null;
  total: number | null;
  maximum: number;
  answeredMaximum: number;
  durationMs: number;
  costCny: number | null;
  failure: string | null;
};
export type TableHistory = Pick<
  TableResult,
  "id" | "createdAt" | "state" | "total" | "maximum"
>;
export type TableAvailability = {
  state: "ready" | "paused" | "unavailable" | "unknown";
  reason?:
    | "stopped"
    | "archived"
    | "disabled"
    | "no_grant"
    | "not_started"
    | "expired"
    | "version_changed"
    | "quota_exhausted"
    | "busy"
    | "price_window"
    | "read_error";
  remainingCalls?: number;
  message: string;
};
export type TableReply = {
  availability?: TableAvailability;
  result: TableResult | null;
  message?: string;
  history?: TableHistory[];
};
