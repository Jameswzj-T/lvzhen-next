import { z } from "zod";
import { digest } from "../model-config";
import { currentCapstoneQuestion } from "../capstone-scoring-card-v2";
import { graphPacks } from "./case-packs";
import { GRAPH_VERSION, type RunInput } from "./contracts";
import { answerWindow } from "./answer-boundary";
import {
  answerDraftSchema,
  assembleAnswerDraft,
  type SavedAnswerPreview,
  type AnswerWorkspaceCase,
} from "./answer-draft";
import { readingRequest } from "./workflow";
import { openGraphStorage } from "./storage";

export function answerWorkspaceCase(): AnswerWorkspaceCase {
  return {
    title: currentCapstoneQuestion.title,
    facts: currentCapstoneQuestion.facts,
    revision: currentCapstoneQuestion.revision,
    questions: currentCapstoneQuestion.parts!.map((p) => ({
      id: p.id,
      question: p.question,
    })),
  };
}
export const answerWorkspaceRequest = z.discriminatedUnion("action", [
  z
    .object({
      action: z.literal("save"),
      id: z.uuid(),
      draft: answerDraftSchema,
    })
    .strict(),
  z.object({ action: z.literal("load"), id: z.uuid() }).strict(),
]);
type Submission = {
  case: AnswerWorkspaceCase;
  draft: z.infer<typeof answerDraftSchema>;
  run: RunInput;
};
export function prepareAnswerSubmission(id: string, raw: unknown): Submission {
  const item = answerWorkspaceCase();
  const assembled = assembleAnswerDraft(
    item.questions.map((q) => q.id),
    raw,
  );
  const pack = structuredClone(graphPacks.long);
  for (const group of pack.groups)
    group.title = item.questions.find((q) => q.id === group.id)!.question;
  const { draft, ...input } = assembled;
  return {
    case: item,
    draft,
    run: {
      ...input,
      runId: id,
      version: GRAPH_VERSION,
      pack,
      modelIdentity: "input-preparation-only",
      deadline: 0,
      maxCalls: pack.groups.length * 2,
      reviewMode: "off",
    },
  };
}
export function previewAnswerSubmission(
  id: string,
  savedAt: string,
  data: Submission,
): SavedAnswerPreview {
  return {
    id,
    savedAt,
    case: data.case,
    draft: data.draft,
    originalText: data.run.answer,
    groups: data.run.pack.groups.map((group) => {
      const window = answerWindow(data.run, group);
      // Use the same projection called by the actual graph, not a UI simulation.
      const request = window.blocked
        ? null
        : readingRequest({ run: data.run, group }, group.criterionIds);
      return {
        id: group.id,
        question: group.title,
        text: request?.input.studentText ?? "",
        contextQuestionIds: window.contextQuestionIds,
        state: window.blockedReason ?? (window.text.trim() ? "ready" : "empty"),
      };
    }),
  };
}
export async function saveOrLoadAnswer(
  raw: unknown,
): Promise<SavedAnswerPreview> {
  if (process.env.LVZHEN_ENV === "trial") throw new Error("local-only");
  const request = answerWorkspaceRequest.parse(raw);
  const data =
    request.action === "save"
      ? prepareAnswerSubmission(request.id, request.draft)
      : null;
  const { pool } = await openGraphStorage();
  try {
    if (data) {
      await pool.query(
        `INSERT INTO grading_graph.answer_submissions(id, identity, input)
        VALUES($1,$2,$3::jsonb) ON CONFLICT(id) DO NOTHING`,
        [request.id, digest(data), JSON.stringify(data)],
      );
    }
    const row = (
      await pool.query(
        "SELECT identity,input,created_at FROM grading_graph.answer_submissions WHERE id=$1",
        [request.id],
      )
    ).rows[0];
    if (!row) throw new Error("answer-not-found");
    if (data && row.identity !== digest(data))
      throw new Error("immutable-answer-conflict");
    return previewAnswerSubmission(
      request.id,
      new Date(row.created_at).toISOString(),
      row.input,
    );
  } finally {
    await pool.end();
  }
}
