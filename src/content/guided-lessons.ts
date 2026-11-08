import { topicFor, type FaultTopic, type UnitExercise } from "./fault-unit";
import { intentCaseChoice, intentCaseSubjective } from "./intent-case";
import {
  confidenceCaseChoice,
  confidenceCaseSubjective,
} from "./confidence-case";

export type GuidedLessonId = "intent" | "confidence";
type ComparisonSide = { name: string; attitude: string; explanation: string };
export type GuidedLesson = {
  topic: FaultTopic;
  choice: UnitExercise;
  subjective: UnitExercise;
  comparison: { common: string; sides: [ComparisonSide, ComparisonSide] };
  core: string;
  nextPractice: string;
  route: [string, string, string];
  previous?: GuidedLessonId;
  next?: GuidedLessonId;
  bridge: string;
  feedbackExerciseId?: string;
};

const lessons: Record<GuidedLessonId, GuidedLesson> = {
  intent: {
    topic: topicFor("intent")!,
    choice: intentCaseChoice,
    subjective: intentCaseSubjective,
    comparison: {
      common: "认识到危害结果",
      sides: [
        {
          name: "直接故意",
          attitude: "希望发生",
          explanation: "把结果当作追求的目标。",
        },
        {
          name: "间接故意",
          attitude: "放任发生",
          explanation: "不追求，但接受结果发生。",
        },
      ],
    },
    core: "判断故意，既看预见了什么，也看希望还是接受结果。不能只凭“不追求”，就排除故意。",
    nextPractice: "下次先回忆希望与放任的区别，再比较放任与轻信避免。",
    route: [
      "先固定分析的结果",
      "再区分希望与放任",
      "下一节，比较放任与轻信避免",
    ],
    next: "confidence",
    bridge:
      "这一节分清希望与放任。接下来，同样预见了风险，为什么有时属于过失？",
    feedbackExerciseId: intentCaseSubjective.id,
  },
  confidence: {
    topic: topicFor("confidence")!,
    choice: confidenceCaseChoice,
    subjective: confidenceCaseSubjective,
    comparison: {
      common: "已经预见可能发生危害结果",
      sides: [
        {
          name: "间接故意",
          attitude: "接受发生",
          explanation: "即使发生，也接受这一结果。",
        },
        {
          name: "过于自信的过失",
          attitude: "轻信避免",
          explanation: "不接受结果，却高估了避免它的条件。",
        },
      ],
    },
    core: "同样已经预见风险，接受结果发生是放任；轻信能够避免结果是过于自信的过失。要结合具体事实看态度，不能只看风险大小或有没有防护。",
    nextPractice: "下次先回忆接受发生与轻信避免的区别，再换个情境练习。",
    route: [
      "上一节，区分希望与放任",
      "这一节，比较接受与轻信避免",
      "再往后，看应当预见却未预见",
    ],
    previous: "intent",
    bridge:
      "上一节的“放任”，是接受结果发生。这一节仍从已经预见风险出发，分清接受发生与轻信避免。",
  },
};

export function isGuidedLesson(id: string): id is GuidedLessonId {
  return id === "intent" || id === "confidence";
}
export function guidedLessonFor(id: string): GuidedLesson {
  if (!isGuidedLesson(id)) throw new Error("Unsupported guided lesson");
  return lessons[id];
}
export function guidedExercises(id: string) {
  const lesson = guidedLessonFor(id);
  return [lesson.choice, lesson.subjective];
}
export function guidedExerciseIds(id: string) {
  const lesson = guidedLessonFor(id);
  return [
    ...new Set(
      [...lesson.topic.exercises, ...guidedExercises(id)].map((q) => q.id),
    ),
  ];
}
