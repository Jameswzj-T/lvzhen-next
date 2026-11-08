import { topicFor, type UnitExercise } from "./fault-unit";

export const intentCaseRevision = "intent-case-2026-09-13.v1";
export const intentCaseSubjective = topicFor("intent")!.exercises[1];

/** A new exercise, not a replacement for the platform case's saved answers. */
export const intentCaseChoice: UnitExercise = {
  id: "intent-tolerate-choice",
  kind: "objective",
  optional: true,
  title: "推展板：做个选择",
  facts: intentCaseSubjective.facts,
  prompt: "只判断甲对路人受伤的心理，你会选哪一种？",
  options: [
    {
      id: "a",
      text: "直接故意。",
      explanation:
        "题设已查明甲不追求伤人。这里需要继续区分接受结果与轻信避免。",
    },
    {
      id: "b",
      text: "间接故意。",
      explanation: "他预见可能伤人，并接受这一结果，属于放任。",
    },
    {
      id: "c",
      text: "过于自信的过失。",
      explanation:
        "题设是接受受伤结果，没有查明轻信能够避免，不能把两种态度混同。",
    },
  ],
  answer: "b",
  hint: intentCaseSubjective.hint,
  reference: intentCaseSubjective.reference,
  sources: ["law"],
};

export const intentCaseExercises = [intentCaseChoice, intentCaseSubjective];
export const intentLessonExerciseIds = [
  ...topicFor("intent")!.exercises.map((q) => q.id),
  intentCaseChoice.id,
];
