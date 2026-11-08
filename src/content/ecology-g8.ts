import type {
  ContentSources,
  Criterion,
  FaultTopic,
  UnitExercise,
} from "./fault-unit";
import data from "./ecology-g8-data.json";

// G8 ecology original cases: fixed question/reference/requirements; learner answers stay free.
export const ecologyG8Revision = "ecology-g8-2026-11-02.v1";
export const ecologyG8Sources: ContentSources = data.sources;
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
export const ecologyG8TopicDrafts = data.topics;
const topicDrafts = ecologyG8TopicDrafts;
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
export const ecologyG8Topics: FaultTopic[] = topicDrafts.map((topic) => {
  const related = cases.filter((item) => item.topicId === topic.id);
  const first = related[0];
  return {
    id: topic.id,
    title: topic.title,
    headline: topic.headline,
    goal: first.prompt,
    prerequisite: "本组事实均在2026年8月15日生态环境法典施行以后。",
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
export const ecologyG8Chapters = topicDrafts.map((topic) => ({
  id: topic.chapterId,
  title: topic.title,
  section: "商法与经济法",
  topicIds: [topic.id],
}));
export const ecologyG8Exercises = ecologyG8Topics.flatMap(
  (topic) => topic.exercises,
);
export const ecologyG8ContentPack = {
  revision: ecologyG8Revision,
  snapshot: {
    topics: ecologyG8Topics,
    sources: ecologyG8Sources,
  },
};
export const ecologyG8DefaultQueues = {
  objective: ecologyG8Exercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: ecologyG8Exercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function ecologyG8Question(id: string) {
  const question = ecologyG8Exercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function ecologyG8TopicForQuestion(id: string) {
  return ecologyG8Topics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function ecologyG8SameCaseQuestions(id: string) {
  const question = ecologyG8Question(id);
  return question
    ? structuredClone(
        ecologyG8Exercises.filter((q) => q.caseId === question.caseId),
      )
    : [];
}
export function ecologyG8ChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = ecologyG8Chapters.find((c) => c.id === chapterId);
  return chapter
    ? ecologyG8Topics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}

export const ecologyG8Edition = data.edition;
