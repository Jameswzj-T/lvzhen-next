import {
  exerciseFor,
  exerciseRevision,
  exerciseSources,
} from "../content/fault-catalog";
import { currentPracticeId } from "../content/practice-set";
import { unitFeedbackBinding } from "./unit-feedback-catalog";
import type { PublicFeedbackRule } from "./unit-feedback";
import assistance from "./question-inquiry-civil-assistance.json";
import reviewedPacks from "./question-inquiry-reviewed-packs.json";

export type QuestionInquiryMaterial = {
  questionId: string;
  questionRevision: string;
  title: string;
  facts: string;
  prompt: string;
  choiceMode?: "single" | "multiple" | "indefinite";
  options?: { id: string; text: string }[];
  publicRules: PublicFeedbackRule[];
};

type ReviewedPack = {
  revision: string;
  sourceMetadata: {
    sourceId: string;
    title: string;
    url: string;
    note: string;
  }[];
  ruleIds: string[];
  cases: Record<string, string | undefined>;
  questions: {
    id: string;
    caseId: string;
    title: string;
    prompt: string;
    sourceIds: string[];
    choiceMode?: string;
    options?: { id: string; text: string }[];
  }[];
};
const packs: ReviewedPack[] = reviewedPacks.packs;
const rules: Record<string, PublicFeedbackRule | undefined> =
  reviewedPacks.rules;

// This already-billed material stays byte-identical across protocol generations.
function preservedAssistanceBinding(
  questionId: string,
): QuestionInquiryMaterial | null {
  if (
    questionId !== assistance.questionId ||
    currentPracticeId(questionId) !== questionId
  )
    return null;
  const question = exerciseFor(questionId);
  if (
    !question ||
    exerciseRevision(questionId) !== assistance.questionRevision ||
    question.title !== assistance.title ||
    question.facts !== assistance.facts ||
    question.prompt !== assistance.prompt
  )
    return null;
  const sources = exerciseSources(questionId);
  const metadata = [...question.sources].sort().map((sourceId) => {
    const source = sources[sourceId];
    return source
      ? { sourceId, title: source.title, url: source.url, note: source.note }
      : null;
  });
  if (JSON.stringify(metadata) !== JSON.stringify(assistance.sourceMetadata))
    return null;
  const { questionRevision, title, facts, prompt, publicRules } = assistance;
  return structuredClone({
    questionId,
    questionRevision,
    title,
    facts,
    prompt,
    publicRules,
  });
}

/** Inquiry-only packs; neither register nor reroute answer grading. */
export function reviewedQuestionInquiryBinding(
  questionId: string,
): QuestionInquiryMaterial | null {
  if (questionId === assistance.questionId)
    return preservedAssistanceBinding(questionId);
  if (currentPracticeId(questionId) !== questionId) return null;
  const question = exerciseFor(questionId);
  if (!question) return null;
  const revision = exerciseRevision(questionId);
  const pack = packs.find(
    (p) =>
      p.revision === revision && p.questions.some((q) => q.id === questionId),
  );
  const frozen = pack?.questions.find((q) => q.id === questionId);
  if (
    !pack ||
    !frozen ||
    question.caseId !== frozen.caseId ||
    question.title !== frozen.title ||
    question.facts !== pack.cases[frozen.caseId] ||
    question.prompt !== frozen.prompt ||
    JSON.stringify([...question.sources].sort()) !==
      JSON.stringify(frozen.sourceIds)
  )
    return null;
  const options =
    question.kind === "objective"
      ? question.options?.map(({ id, text }) => ({ id, text }))
      : undefined;
  const choiceMode =
    question.kind === "objective"
      ? (question.choiceMode ?? "single")
      : undefined;
  if (
    choiceMode !== frozen.choiceMode ||
    JSON.stringify(options) !== JSON.stringify(frozen.options)
  )
    return null;
  const sources = exerciseSources(questionId);
  for (const sourceId of frozen.sourceIds) {
    const source = sources[sourceId];
    const approved = pack.sourceMetadata.find((s) => s.sourceId === sourceId);
    if (
      !source ||
      !approved ||
      source.title !== approved.title ||
      source.url !== approved.url ||
      source.note !== approved.note
    )
      return null;
  }
  const publicRules: PublicFeedbackRule[] = [];
  for (const id of pack.ruleIds) {
    const rule = rules[id];
    if (!rule || !rule.excerpt.trim()) return null;
    publicRules.push(rule);
  }
  if (!publicRules.length) return null;
  return structuredClone({
    questionId,
    questionRevision: pack.revision,
    title: frozen.title,
    facts: question.facts,
    prompt: frozen.prompt,
    ...(options ? { choiceMode, options } : {}),
    publicRules,
  });
}

/** Client-safe availability; the server retains legacy registry verification. */
export function hasQuestionInquiryMaterial(questionId: string): boolean {
  return Boolean(
    unitFeedbackBinding(questionId) ||
    reviewedQuestionInquiryBinding(questionId),
  );
}
