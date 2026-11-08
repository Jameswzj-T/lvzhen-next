import type { UnitExercise, Criterion } from "../fault-unit";

export type ChapterCase = {
  topicId: string;
  exam: boolean;
  review: boolean;
  exercise: UnitExercise;
};
type Context = {
  review?: boolean;
  related?: string[];
  sources?: string[];
  indefinite?: boolean;
  exam?: boolean;
};

// These helpers only assemble prewritten content. They never generate facts or answers.
export function choice(
  id: string,
  topicId: string,
  title: string,
  facts: string,
  prompt: string,
  options: [string, string][],
  correct: string,
  reference: string,
  context: Context = {},
): ChapterCase {
  const answers = correct.split("");
  return {
    topicId,
    exam: context.exam ?? false,
    review: !!context.review,
    exercise: {
      id,
      caseId: id,
      optional: true,
      kind: "objective",
      title,
      facts,
      prompt,
      choiceMode: context.indefinite
        ? "indefinite"
        : answers.length > 1
          ? "multiple"
          : "single",
      options: options.map(([text, explanation], i) => ({
        id: "abcd"[i],
        text,
        explanation,
      })),
      ...(answers.length === 1 && !context.indefinite
        ? { answer: correct }
        : { correctChoices: answers }),
      hint: "结合题目给出的事实和适用条件判断。",
      reference,
      sources: context.sources ?? ["law"],
      ...(context.related?.length ? { relatedTopicIds: context.related } : {}),
    },
  };
}

export function written(
  id: string,
  topicId: string,
  title: string,
  facts: string,
  prompt: string,
  reference: string,
  points: [string, string, string][],
  context: Context = {},
): ChapterCase {
  const criteria: Criterion[] = points.map(([label, meaning, boundary], i) => ({
    id: `${id}-p${i + 1}`,
    label,
    meaning,
    acceptable: `意思相当且能联系本案事实即可：${meaning}`,
    boundary,
  }));
  return {
    topicId,
    exam: context.exam ?? false,
    review: !!context.review,
    exercise: {
      id,
      caseId: id,
      optional: true,
      kind: "subjective",
      title,
      facts,
      prompt,
      hint: "写出本案的判断以及支持判断的事实。",
      reference,
      criteria,
      sources: context.sources ?? ["law"],
      ...(context.related?.length ? { relatedTopicIds: context.related } : {}),
    },
  };
}
