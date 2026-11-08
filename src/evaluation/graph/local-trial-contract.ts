import { z } from "zod";
export const LOCAL_TRIAL_VERSION = "explicit-conflict-local-v1";
export const trialDraftSchema = z
  .array(
    z
      .object({
        questionId: z.enum(["q1", "q2", "q3", "q4", "q5"]),
        text: z.string().max(5000),
      })
      .strict(),
  )
  .length(5)
  .refine(
    (a) => new Set(a.map((q) => q.questionId)).size === 5,
    "invalid-questions",
  );
export const trialAnswersSchema = trialDraftSchema.refine(
  (a) => a.reduce((n, q) => n + q.text.length, 0) <= 12000,
  "answer-too-long",
);
export const localTrialRequestSchema = z.discriminatedUnion("action", [
  z
    .object({
      action: z.enum(["submit", "lookup"]),
      version: z.literal(LOCAL_TRIAL_VERSION),
      caseId: z.enum(["DEBT", "NETWORK"]),
      answers: trialAnswersSchema,
    })
    .strict(),
  z
    .object({
      action: z.literal("read"),
      id: z.string().regex(/^[a-f0-9]{64}$/),
    })
    .strict(),
]);
export type TrialAnswers = z.infer<typeof trialAnswersSchema>;
export type TrialCase = {
  id: "DEBT" | "NETWORK";
  title: string;
  facts: string;
  questions: { id: string; text: string }[];
};
export type TrialPoint = {
  id: string;
  title: string;
  earned: number | null;
  max: number;
  diagnosticPending: boolean;
  feedback: string;
  guidance: string;
  ruleBasis: string;
  interpretation?: string;
  evidenceIds: string[];
};
export type TrialQuestion = {
  id: string;
  question: string;
  answer: string;
  status: "ready" | "empty" | "failed" | "not_run";
  total: number | null;
  max: number;
  durationMs: number | null;
  points: TrialPoint[];
};
export type TrialResult = {
  id: string;
  version: string;
  caseId: string;
  title: string;
  createdAt: string;
  state: "running" | "complete" | "stopped";
  source: "real_provider" | "saved_replay" | "offline_test";
  questions: TrialQuestion[];
  total: number | null;
  max: number;
  costCny: number;
  unknownCostCalls: number;
  calls: number;
  durationMs: number;
};
export type TrialReply = {
  result: TrialResult | null;
  available: boolean;
  message?: string;
};
// Uncited text is retained byte-for-byte; context is never relabelled as a citation.
export function highlightOriginal(
  text: string,
  spans: { id: string; start: number; end: number }[],
  ids: string[],
) {
  const selected = spans
    .filter((s) => ids.includes(s.id))
    .sort((a, b) => a.start - b.start);
  if (
    new Set(ids).size !== ids.length ||
    selected.length !== ids.length ||
    selected.some(
      (s, i) =>
        s.start < 0 ||
        s.end > text.length ||
        s.start >= s.end ||
        (i > 0 && selected[i - 1].end > s.start),
    )
  )
    throw Error("invalid-highlight");
  const parts: { text: string; highlighted: boolean }[] = [];
  let end = 0;
  for (const s of selected) {
    parts.push(
      { text: text.slice(end, s.start), highlighted: false },
      { text: text.slice(s.start, s.end), highlighted: true },
    );
    end = s.end;
  }
  parts.push({ text: text.slice(end), highlighted: false });
  return parts;
}
