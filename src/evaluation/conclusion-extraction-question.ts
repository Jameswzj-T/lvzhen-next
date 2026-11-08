import { createHash } from "node:crypto";
import { z } from "zod";
import {
  prepareConclusionExtraction as prepareBase,
  resolveConclusionExtraction as resolveBase,
} from "./conclusion-extraction-candidate";

export { EXTRACTION_PROMPT } from "./conclusion-extraction-candidate";
const targetSchema = z
  .object({
    id: z.string().min(1),
    scope: z.string().min(1),
    question: z.string().min(1),
  })
  .strict();
export type QuestionExtractionTarget = z.infer<typeof targetSchema>;
const hash = (value: unknown) =>
  createHash("sha256").update(JSON.stringify(value)).digest("hex");
const neutralTargets = (targets: QuestionExtractionTarget[]) =>
  targets.map(({ id, scope }) => ({ id, scope }));

// One input-context experiment. Keep the V2 instructions and output checks fixed.
export function prepareConclusionExtraction(
  studentText: string,
  question: string,
  rawTargets: QuestionExtractionTarget[],
) {
  z.string().trim().min(1).parse(question);
  const targets = z.array(targetSchema).min(1).parse(rawTargets);
  const base = prepareBase(studentText, neutralTargets(targets));
  const snapshot = {
    version: "expressed-conclusion-question-context-v1",
    instructions: base.instructions,
    data: { ...base.data, targets, question },
  };
  return { taskId: hash(snapshot), ...snapshot };
}
type Task = ReturnType<typeof prepareConclusionExtraction>;
export function resolveConclusionExtraction(task: Task, raw: unknown) {
  const rebuilt = prepareConclusionExtraction(
    task.data.studentText,
    task.data.question,
    task.data.targets,
  );
  if (hash(task) !== hash(rebuilt)) throw new Error("extraction-task-drift");
  const result = resolveBase(
    prepareBase(task.data.studentText, neutralTargets(task.data.targets)),
    raw,
  );
  return { ...result, taskId: task.taskId };
}
