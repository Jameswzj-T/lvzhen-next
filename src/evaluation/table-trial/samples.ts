import { z } from "zod";
import type { QuestionScopedPack } from "../question-scoped-table";
import { tableAnswers, tableCaseId } from "./contract";

// Answers frozen with a card before any paid call. Expected labels are local
// checks only; they are never sent to the model.
export const cardSamples = z
  .object({
    caseId: tableCaseId,
    note: z.string().min(1),
    samples: z
      .array(
        z
          .object({
            id: z.string().regex(/^[A-Za-z0-9-]+$/),
            kind: z.enum([
              "retained-human-answer",
              "synthetic-complete",
              "synthetic-mixed",
            ]),
            note: z.string().min(1),
            answers: tableAnswers,
            expected: z.record(z.string(), z.enum(["是", "否"])),
            expectedScore: z.number().int().min(0),
          })
          .strict(),
      )
      .min(1),
  })
  .strict();
export type CardSamples = z.infer<typeof cardSamples>;

export function checkSamples(pack: QuestionScopedPack, raw: unknown) {
  const parsed = cardSamples.parse(raw);
  const rubric = pack.questions.flatMap((q) => q.criteria);
  if (new Set(parsed.samples.map((s) => s.id)).size !== parsed.samples.length)
    throw Error("duplicate-sample-id");
  for (const s of parsed.samples) {
    const ids = Object.keys(s.expected);
    if (ids.length !== rubric.length || rubric.some((c, i) => ids[i] !== c.id))
      throw Error(`sample-rubric-mismatch:${s.id}`);
    const score = rubric.reduce(
      (n, c) => n + (s.expected[c.id] === "是" ? c.points : 0),
      0,
    );
    if (score !== s.expectedScore) throw Error(`sample-score-mismatch:${s.id}`);
  }
  return parsed;
}
