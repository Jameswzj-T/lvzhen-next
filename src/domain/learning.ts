import { z } from "zod";
import {
  contentRevision,
  questions,
  type QuestionId,
} from "../content/criminal";
import { subjectiveCase } from "../content/subjective";

export const storageKey = "lvzhen:criminal-learning-sample:v1";
export const phases = ["understand", "compare", "practice", "recap"] as const;
export type Phase = (typeof phases)[number];

const draftSchema = z.object({
  choice: z.enum(["a", "b", "c"]).nullable(),
  reason: z.string().max(8000),
  hintUsed: z.boolean(),
  referenceSeen: z.boolean(),
  submittedId: z.string().nullable(),
});

const attemptSchema = z.object({
  id: z.string().min(1),
  questionId: z.enum(["recognition", "transfer", "insufficient-facts"]),
  choice: z.enum(["a", "b", "c"]),
  reason: z.string().max(8000),
  hintUsed: z.boolean(),
  referenceSeenBeforeAnswer: z.boolean(),
  createdAt: z.iso.datetime(),
  contentRevision: z.literal(contentRevision),
  reasoningAssessment: z.literal("not_evaluated"),
});

const subjectiveDraftSchema = z.object({
  answer: z.string().max(8000),
  hintUsed: z.boolean(),
  referenceSeen: z.boolean(),
  submittedId: z.string().nullable(),
});

const subjectiveAttemptSchema = z.object({
  id: z.string().min(1),
  questionId: z.literal(subjectiveCase.id),
  contentRevision: z.literal(subjectiveCase.revision),
  answer: z
    .string()
    .max(8000)
    .refine((value) => value.trim().length > 0),
  hintUsed: z.boolean(),
  referenceSeenBeforeAnswer: z.boolean(),
  createdAt: z.iso.datetime(),
  reasoningAssessment: z.literal("not_evaluated"),
});

export function emptySubjectiveDraft() {
  return {
    answer: "",
    hintUsed: false,
    referenceSeen: false,
    submittedId: null as string | null,
  };
}

const stateSchema = z
  .object({
    version: z.literal(1),
    contentRevision: z.literal(contentRevision),
    phase: z.enum(phases),
    // Defaults keep existing objective-only records readable without a reset.
    practiceMode: z.enum(["objective", "subjective"]).default("objective"),
    subjectiveDraft: subjectiveDraftSchema.default(emptySubjectiveDraft),
    subjectiveAttempts: z.array(subjectiveAttemptSchema).max(300).default([]),
    questionIndex: z
      .number()
      .int()
      .min(0)
      .max(questions.length - 1),
    drafts: z.object({
      recognition: draftSchema,
      transfer: draftSchema,
      "insufficient-facts": draftSchema,
    }),
    attempts: z.array(attemptSchema).max(300),
    updatedAt: z.iso.datetime().nullable(),
  })
  .superRefine((state, ctx) => {
    const ids = new Set<string>();
    for (const attempt of state.attempts) {
      if (ids.has(attempt.id))
        ctx.addIssue({ code: "custom", message: "Duplicate attempt ID" });
      ids.add(attempt.id);
    }
    for (const q of questions) {
      const draft = state.drafts[q.id];
      if (
        draft.submittedId &&
        !state.attempts.some(
          (a) =>
            a.id === draft.submittedId &&
            a.questionId === q.id &&
            a.choice === draft.choice &&
            a.reason === draft.reason,
        )
      ) {
        ctx.addIssue({
          code: "custom",
          message: "Draft does not match its submitted attempt",
        });
      }
    }
    for (const attempt of state.subjectiveAttempts) {
      if (ids.has(attempt.id))
        ctx.addIssue({ code: "custom", message: "Duplicate attempt ID" });
      ids.add(attempt.id);
    }
    const draft = state.subjectiveDraft;
    if (
      draft.submittedId &&
      !state.subjectiveAttempts.some(
        (attempt) =>
          attempt.id === draft.submittedId && attempt.answer === draft.answer,
      )
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Subjective draft does not match its submitted attempt",
      });
    }
  });

export type LearningState = z.infer<typeof stateSchema>;
export type Attempt = z.infer<typeof attemptSchema>;

export function emptyDraft(): LearningState["drafts"][QuestionId] {
  return {
    choice: null,
    reason: "",
    hintUsed: false,
    referenceSeen: false,
    submittedId: null,
  };
}

export function initialState(): LearningState {
  return {
    version: 1,
    contentRevision,
    phase: "understand",
    practiceMode: "objective",
    subjectiveDraft: emptySubjectiveDraft(),
    subjectiveAttempts: [],
    questionIndex: 0,
    drafts: {
      recognition: emptyDraft(),
      transfer: emptyDraft(),
      "insufficient-facts": emptyDraft(),
    },
    attempts: [],
    updatedAt: null,
  };
}

export function restoreState(raw: string | null): {
  kind: "empty" | "loaded" | "unreadable";
  state: LearningState;
} {
  if (raw === null) return { kind: "empty", state: initialState() };
  try {
    const result = stateSchema.safeParse(JSON.parse(raw));
    if (result.success) return { kind: "loaded", state: result.data };
  } catch {
    /* Keep the original record intact; the caller must not overwrite it. */
  }
  return { kind: "unreadable", state: initialState() };
}

export function recordAttempt(
  state: LearningState,
  questionId: QuestionId,
  now: string,
  id: string,
): LearningState {
  const draft = state.drafts[questionId];
  if (
    !draft.choice ||
    !questions
      .find((q) => q.id === questionId)
      ?.options.some((o) => o.id === draft.choice)
  ) {
    throw new Error("Choose an available option before recording an answer.");
  }
  if (draft.submittedId) return state;
  const attempt = attemptSchema.parse({
    id,
    questionId,
    choice: draft.choice,
    reason: draft.reason,
    hintUsed: draft.hintUsed,
    referenceSeenBeforeAnswer: draft.referenceSeen,
    createdAt: now,
    contentRevision,
    reasoningAssessment: "not_evaluated",
  });
  const next = {
    ...state,
    updatedAt: now,
    attempts: [...state.attempts, attempt],
    drafts: {
      ...state.drafts,
      [questionId]: { ...draft, referenceSeen: true, submittedId: id },
    },
  };
  return stateSchema.parse(next);
}

export function choiceMatchesReference(attempt: Attempt): boolean {
  const q = questions.find((q) => q.id === attempt.questionId);
  return q?.answer === attempt.choice;
}

export function recordSubjectiveAttempt(
  state: LearningState,
  now: string,
  id: string,
): LearningState {
  const draft = state.subjectiveDraft;
  if (!draft.answer.trim())
    throw new Error("Write an answer before recording it.");
  if (draft.submittedId) return state;
  const attempt = subjectiveAttemptSchema.parse({
    id,
    questionId: subjectiveCase.id,
    contentRevision: subjectiveCase.revision,
    answer: draft.answer,
    hintUsed: draft.hintUsed,
    referenceSeenBeforeAnswer: draft.referenceSeen,
    createdAt: now,
    reasoningAssessment: "not_evaluated",
  });
  return stateSchema.parse({
    ...state,
    updatedAt: now,
    subjectiveAttempts: [...state.subjectiveAttempts, attempt],
    subjectiveDraft: { ...draft, referenceSeen: true, submittedId: id },
  });
}
