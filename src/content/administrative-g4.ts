import type {
  ContentSources,
  Criterion,
  FaultTopic,
  UnitExercise,
} from "./fault-unit";
import data from "./administrative-g4-data.json";

// G4 original cases: fixed question/reference/requirements; learner answers stay free.
export const administrativeG4Revision = "administrative-g4-2026-11-01.v1";
export const administrativeG4Sources: ContentSources = data.sources;
type CaseDraft = {
  id: string;
  topicId: string;
  title: string;
  facts: string;
  prompt: string;
  reference: string;
  answer: "a" | "b" | "c" | "d";
  options: { text: string; explanation: string }[];
  points: { label: string; meaning: string; boundary: string }[];
  sources: string[];
};

const cases: CaseDraft[] = data.cases as CaseDraft[];
const topicDrafts = data.topics;
function pair(item: CaseDraft): UnitExercise[] {
  const common = {
    caseId: item.id,
    relatedTopicIds: [item.topicId],
    facts: item.facts,
    prompt: item.prompt,
    hint: "先回答本题所问，再结合案情说明理由。",
    reference: item.reference,
    sources: item.sources,
  };
  const criteria: Criterion[] = item.points.map((point, index) => ({
    id: `${item.id}-${index + 1}`,
    ...point,
    acceptable: "认可法律含义相同的自然表达，不要求固定句式或条号。",
  }));
  return [
    {
      ...common,
      id: `${item.id}-choice`,
      title: `${item.title}（单选）`,
      kind: "objective",
      choiceMode: "single",
      answer: item.answer,
      options: item.options.map((option, i) => ({
        id: ["a", "b", "c", "d"][i],
        ...option,
      })),
    },
    {
      ...common,
      id: `${item.id}-written`,
      title: `${item.title}（自由作答）`,
      kind: "subjective",
      answer: "",
      prompt: `${item.prompt}请结合案情说明理由。`,
      criteria,
    },
  ];
}
export const administrativeG4Topics: FaultTopic[] = topicDrafts.map((topic) => {
  const related = cases.filter((item) => item.topicId === topic.id);
  const first = related[0];
  return {
    id: topic.id,
    title: topic.title,
    headline: topic.headline,
    goal: first.prompt,
    prerequisite: "知道行政机关依法作出决定，并可通过复议、诉讼寻求救济。",
    minutes: "约8分钟",
    paragraphs: topic.paragraphs,
    pitfall: topic.pitfall,
    recall: {
      prompt: "本组两种情形的处理有什么区别？",
      reference: topic.headline,
    },
    sources: [...new Set(related.flatMap((item) => item.sources))],
    example: {
      title: first.title,
      facts: first.facts,
      analysis: first.reference,
    },
    exercises: related.flatMap(pair),
  };
});
export const administrativeG4Chapters = topicDrafts.map((topic) => ({
  id: topic.chapterId,
  title: topic.title,
  section: "行政法与行政诉讼法",
  topicIds: [topic.id],
}));
export const administrativeG4Exercises = administrativeG4Topics.flatMap(
  (topic) => topic.exercises,
);
export const administrativeG4ContentPack = {
  revision: administrativeG4Revision,
  snapshot: {
    topics: administrativeG4Topics,
    sources: administrativeG4Sources,
  },
};
export const administrativeG4DefaultQueues = {
  objective: administrativeG4Exercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: administrativeG4Exercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function administrativeG4Question(id: string) {
  const question = administrativeG4Exercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function administrativeG4TopicForQuestion(id: string) {
  return administrativeG4Topics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function administrativeG4SameCaseQuestions(id: string) {
  const question = administrativeG4Question(id);
  return question
    ? structuredClone(
        administrativeG4Exercises.filter((q) => q.caseId === question.caseId),
      )
    : [];
}
export function administrativeG4ChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = administrativeG4Chapters.find((c) => c.id === chapterId);
  return chapter
    ? administrativeG4Topics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
