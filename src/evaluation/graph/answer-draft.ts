import { z } from "zod";
import type { AnswerSection } from "./question-local";
import type { AnswerBoundary } from "./answer-boundary";

const answerDraftFields = z
  .object({
    answers: z
      .array(
        z
          .object({
            questionId: z.string().min(1),
            text: z.string().max(5000),
            contextQuestionIds: z.array(z.string().min(1)).max(20),
          })
          .strict(),
      )
      .max(20),
    unassignedText: z.string().max(12000),
  })
  .strict();
export const answerDraftSchema = answerDraftFields.refine(
  (d) =>
    d.answers.reduce((n, a) => n + a.text.length, d.unassignedText.length) <=
    12000,
);
export type AnswerDraft = z.infer<typeof answerDraftSchema>;

// Recover editable drafts even when their combined length exceeds the submission limit.
export function restoreAnswerDraft(
  questionIds: string[],
  raw: unknown,
): AnswerDraft {
  const draft = answerDraftFields.parse(raw);
  const found = draft.answers.map((a) => a.questionId);
  if (
    found.length !== questionIds.length ||
    new Set(found).size !== found.length ||
    questionIds.some((id) => !found.includes(id))
  )
    throw new Error("invalid-draft-question-set");
  for (const entry of draft.answers) {
    if (
      new Set(entry.contextQuestionIds).size !==
        entry.contextQuestionIds.length ||
      entry.contextQuestionIds.some(
        (other) => other === entry.questionId || !questionIds.includes(other),
      )
    )
      throw new Error("invalid-draft-context-link");
  }
  return draft;
}

export function assembleAnswerDraft(questionIds: string[], raw: unknown) {
  const draft = restoreAnswerDraft(questionIds, answerDraftSchema.parse(raw));
  let answer = "";
  const answerSections: AnswerSection[] = [];
  const answerBoundary: AnswerBoundary = {
    version: "question-owned-v1",
    contextLinks: [],
  };
  for (const id of questionIds) {
    const entry = draft.answers.find((a) => a.questionId === id)!;
    answerBoundary.contextLinks.push(
      ...entry.contextQuestionIds.map((contextQuestionId) => ({
        questionId: id,
        contextQuestionId,
      })),
    );
    if (entry.text.length) {
      if (answer.length) answer += "\n\n";
      const start = answer.length;
      answer += entry.text; // Never trim, normalize, summarize or reword student text.
      answerSections.push({ questionId: id, start, end: answer.length });
    }
  }
  if (draft.unassignedText.length) {
    if (answer.length) answer += "\n\n";
    answer += draft.unassignedText;
  }
  return { draft, answer, answerSections, answerBoundary };
}

export type AnswerWorkspaceCase = {
  title: string;
  facts: string;
  revision: string;
  questions: { id: string; question: string }[];
};
export type SavedAnswerPreview = {
  id: string;
  savedAt: string;
  case: AnswerWorkspaceCase;
  draft: AnswerDraft;
  originalText: string;
  groups: {
    id: string;
    question: string;
    text: string;
    contextQuestionIds: string[];
    state: "ready" | "empty" | "unassigned_text" | "empty_context";
  }[];
};
