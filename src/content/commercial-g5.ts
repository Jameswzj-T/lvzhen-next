import type {
  ContentSources,
  Criterion,
  FaultTopic,
  UnitExercise,
} from "./fault-unit";
import data from "./commercial-g5-data.json";

// G5 original cases: fixed question/reference/requirements; learner answers stay free.
export const commercialG5Revision = "commercial-g5-2026-11-01.v1";
export const commercialG5Sources: ContentSources = data.sources;
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
export const commercialG5Topics: FaultTopic[] = topicDrafts.map((topic) => {
  const related = cases.filter((item) => item.topicId === topic.id);
  const first = related[0];
  return {
    id: topic.id,
    title: topic.title,
    headline: topic.headline,
    goal: first.prompt,
    prerequisite: "知道商事活动须依法开展，争议应区分主体、权利与程序。",
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
export const commercialG5Chapters = topicDrafts.map((topic) => ({
  id: topic.chapterId,
  title: topic.title,
  section: "商法与经济法",
  topicIds: [topic.id],
}));
export const commercialG5Exercises = commercialG5Topics.flatMap(
  (topic) => topic.exercises,
);
export const commercialG5ContentPack = {
  revision: commercialG5Revision,
  snapshot: {
    topics: commercialG5Topics,
    sources: commercialG5Sources,
  },
};
export const commercialG5DefaultQueues = {
  objective: commercialG5Exercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: commercialG5Exercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function commercialG5Question(id: string) {
  const question = commercialG5Exercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function commercialG5TopicForQuestion(id: string) {
  return commercialG5Topics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function commercialG5SameCaseQuestions(id: string) {
  const question = commercialG5Question(id);
  return question
    ? structuredClone(
        commercialG5Exercises.filter((q) => q.caseId === question.caseId),
      )
    : [];
}
export function commercialG5ChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = commercialG5Chapters.find((c) => c.id === chapterId);
  return chapter
    ? commercialG5Topics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
