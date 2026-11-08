import { z } from "zod";
import { assessmentPaper } from "../content/assessment-papers";
import { exerciseFor } from "../content/fault-catalog";
import { validChoice } from "./objective-answer";

const id = z.string().min(1).max(120);
export const assessmentAnswerSchema = z.object({
  choice: z.string().max(20),
  answer: z.string().max(8000),
});
export const assessmentRunSchema = z.object({
  id: z.string().min(1).max(100),
  paperId: id,
  revision: id,
  startedAt: z.iso.datetime(),
  deadlineAt: z.iso.datetime().nullable(),
  finishedAt: z.iso.datetime().nullable(),
  finishReason: z.enum(["manual", "timeout"]).nullable(),
  answers: z.record(z.string(), assessmentAnswerSchema),
  attemptIds: z.record(z.string(), id),
  seenQuestionIds: z.array(id),
});
export const assessmentStateSchema = z
  .object({
    runs: z.array(assessmentRunSchema).max(1000),
    activeId: id.nullable(),
    cursor: z.number().int().nonnegative(),
    // Optional for records saved before per-paper resume positions were added.
    cursors: z.record(z.string(), z.number().int().nonnegative()).optional(),
  })
  .superRefine((state, ctx) => {
    const invalid = (message: string) =>
      ctx.addIssue({ code: "custom", message });
    if (new Set(state.runs.map((r) => r.id)).size !== state.runs.length)
      invalid("Duplicate assessment run");
    const active = state.runs.find((r) => r.id === state.activeId);
    if (state.activeId && !active) invalid("Missing active assessment");
    if (
      active &&
      state.cursor >= (assessmentPaper(active.paperId)?.questionIds.length ?? 0)
    )
      invalid("Invalid assessment cursor");
    for (const [runId, cursor] of Object.entries(state.cursors ?? {})) {
      const run = state.runs.find((r) => r.id === runId);
      if (
        !run ||
        cursor >= (assessmentPaper(run.paperId)?.questionIds.length ?? 0)
      )
        invalid("Invalid saved assessment cursor");
    }
    for (const run of state.runs) {
      const paper = assessmentPaper(run.paperId);
      if (!paper || paper.revision !== run.revision) {
        invalid("Unknown assessment edition");
        continue;
      }
      const start = Date.parse(run.startedAt);
      if (!Number.isFinite(start)) {
        invalid("Invalid assessment start");
        continue;
      }
      const deadline =
        paper.minutes === null
          ? null
          : new Date(start + paper.minutes * 60000).toISOString();
      if (run.deadlineAt !== deadline) invalid("Invalid assessment deadline");
      if (!!run.finishedAt !== !!run.finishReason)
        invalid("Incomplete assessment submission");
      if (
        run.finishedAt &&
        (Date.parse(run.finishedAt) < start ||
          (deadline && Date.parse(run.finishedAt) > Date.parse(deadline)))
      )
        invalid("Invalid submission time");
      if (
        run.finishReason === "timeout" &&
        (!deadline || run.finishedAt !== deadline)
      )
        invalid("Invalid timed submission");
      const keys = Object.keys(run.answers);
      if (
        keys.some((k) => !paper.questionIds.includes(k)) ||
        run.seenQuestionIds.some((k) => !paper.questionIds.includes(k))
      )
        invalid("Foreign assessment question");
      if (new Set(run.seenQuestionIds).size !== run.seenQuestionIds.length)
        invalid("Duplicate exposure");
      for (const [key, draft] of Object.entries(run.answers)) {
        const q = exerciseFor(key);
        if (
          !q ||
          (q.kind === "objective"
            ? !!draft.answer ||
              (!!draft.choice && !validChoice(q, draft.choice))
            : !!draft.choice)
        )
          invalid("Invalid assessment answer");
      }
      const answered = keys.filter(
        (k) => run.answers[k].choice || run.answers[k].answer.trim(),
      );
      if (!run.finishedAt && Object.keys(run.attemptIds).length)
        invalid("Unsubmitted assessment has attempts");
      if (
        run.finishedAt &&
        (Object.keys(run.attemptIds).length !== answered.length ||
          answered.some((k) => !run.attemptIds[k]))
      )
        invalid("Assessment attempts do not match answers");
    }
  });
export type AssessmentRun = z.infer<typeof assessmentRunSchema>;
