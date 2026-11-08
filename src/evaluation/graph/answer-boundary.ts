import { answerSegments } from "../evidence-references";
import { digest } from "../model-config";
import { answerScope, type AnswerSection } from "./question-local";
import type { RunInput, TaskGroup } from "./contracts";

export const ANSWER_BOUNDARY_VERSION = "question-owned-v1";
export type AnswerBoundary = {
  version: typeof ANSWER_BOUNDARY_VERSION;
  // Attachment is context, not an assertion that the other answer is adopted.
  contextLinks: { questionId: string; contextQuestionId: string }[];
};
export type AnswerWindow = {
  version: typeof ANSWER_BOUNDARY_VERSION;
  originalHash: string;
  ownershipHash: string;
  questionId: string;
  text: string;
  sections: AnswerSection[];
  contextQuestionIds: string[];
  unassignedRanges: { start: number; end: number }[];
  blocked: boolean;
  blockedReason: "unassigned_text" | "empty_context" | null;
  references: {
    id: string;
    sources: { questionId: string; start: number; end: number; text: string }[];
  }[];
};

// This only checks ownership supplied by the form/reviewed fixture. It never
// guesses persons, intent, references or question numbers from legal prose.
export function answerWindow(run: RunInput, group: TaskGroup): AnswerWindow {
  const boundary = run.answerBoundary;
  if (!boundary || boundary.version !== ANSWER_BOUNDARY_VERSION)
    throw new Error("invalid-answer-boundary-version");
  answerScope(run, group); // Existing offset/overlap/identity checks.
  const ids = new Set([
    ...run.pack.groups.map((g) => g.id),
    ...(run.pack.contextQuestionIds ?? []),
  ]);
  const pairs = new Set<string>();
  for (const link of boundary.contextLinks) {
    const pair = `${link.questionId}:${link.contextQuestionId}`;
    if (
      !ids.has(link.questionId) ||
      !ids.has(link.contextQuestionId) ||
      link.questionId === link.contextQuestionId ||
      pairs.has(pair)
    )
      throw new Error("invalid-answer-context-link");
    pairs.add(pair);
  }
  const sections = [...(run.answerSections ?? [])].sort(
    (a, b) => a.start - b.start,
  );
  const unassignedRanges: AnswerWindow["unassignedRanges"] = [];
  let coveredUntil = 0;
  for (const section of [
    ...sections,
    { start: run.answer.length, end: run.answer.length },
  ]) {
    if (run.answer.slice(coveredUntil, section.start).trim())
      unassignedRanges.push({ start: coveredUntil, end: section.start });
    coveredUntil = section.end;
  }
  const included = new Set([group.id]);
  // Explicit attachment chains are closed transitively, including cycles once.
  for (const id of included)
    for (const link of boundary.contextLinks)
      if (link.questionId === id) included.add(link.contextQuestionId);
  const selected = sections.filter((s) => included.has(s.questionId));
  const emptyContext = [...included].some(
    (id) =>
      id !== group.id &&
      !selected.some(
        (s) => s.questionId === id && run.answer.slice(s.start, s.end).trim(),
      ),
  );
  const pieces: (AnswerSection & {
    originalStart: number;
    originalEnd: number;
  })[] = [];
  let text = "";
  for (const section of selected) {
    if (text) text += "\n\n";
    const start = text.length;
    text += run.answer.slice(section.start, section.end);
    pieces.push({
      questionId: section.questionId,
      start,
      end: text.length,
      originalStart: section.start,
      originalEnd: section.end,
    });
  }
  const references = answerSegments(text).map((segment) => ({
    id: segment.id,
    sources: pieces.flatMap((piece) => {
      const start = Math.max(segment.start, piece.start);
      const end = Math.min(segment.end, piece.end);
      if (start >= end || !text.slice(start, end).trim()) return [];
      const originalStart = piece.originalStart + start - piece.start;
      const originalEnd = piece.originalStart + end - piece.start;
      return [
        {
          questionId: piece.questionId,
          start: originalStart,
          end: originalEnd,
          text: run.answer.slice(originalStart, originalEnd),
        },
      ];
    }),
  }));
  if (references.some((r) => !r.sources.length))
    throw new Error("unmapped-answer-source");
  return {
    version: boundary.version,
    originalHash: digest(run.answer),
    ownershipHash: digest({ sections, boundary }),
    questionId: group.id,
    text,
    sections: pieces.map(({ questionId, start, end }) => ({
      questionId,
      start,
      end,
    })),
    contextQuestionIds: [...included].filter((id) => id !== group.id),
    unassignedRanges,
    blocked: unassignedRanges.length > 0 || emptyContext,
    blockedReason: unassignedRanges.length
      ? "unassigned_text"
      : emptyContext
        ? "empty_context"
        : null,
    references,
  };
}

export function questionOwnedRun(run: RunInput, group: TaskGroup): RunInput {
  if (!run.answerBoundary) return run;
  const window = answerWindow(run, group);
  if (window.blocked) throw new Error("answer-assignment-required");
  // A separate request view; the graph retains the full immutable run input.
  return {
    ...run,
    answer: window.text,
    answerSections: window.sections,
    answerBoundary: undefined,
  };
}
