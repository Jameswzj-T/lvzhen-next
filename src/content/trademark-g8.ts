import type {
  ContentSources,
  Criterion,
  FaultTopic,
  UnitExercise,
} from "./fault-unit";
import type { RemainingG6Subject } from "./remaining-g6-subjects";
import data from "./trademark-g8-data.json";

export const trademarkG8Revision = "trademark-g8-2026-11-02.v1";
export const trademarkG8Sources: ContentSources = data.sources;
export const trademarkG8TopicDrafts = data.topics;
type CaseDraft = (typeof data.cases)[number];
function exercises(item: CaseDraft): UnitExercise[] {
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
      options: item.options.map((option, index) => ({
        id: ["a", "b", "c", "d"][index],
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
export const trademarkG8Topics: FaultTopic[] = data.topics.map((topic) => {
  const related = data.cases.filter((item) => item.topicId === topic.id);
  const first = related[0];
  return {
    id: topic.id,
    title: topic.title,
    headline: topic.headline,
    goal: first.prompt,
    prerequisite: "本组采用2027年1月1日起施行文本；全部题设事实在该日期以后。",
    minutes: "约8分钟",
    paragraphs: topic.paragraphs,
    pitfall: topic.pitfall,
    recall: { prompt: "本组的关键区别是什么？", reference: topic.headline },
    sources: [...new Set(related.flatMap((item) => item.sources))],
    example: {
      title: first.title,
      facts: first.facts,
      analysis: first.reference,
    },
    exercises: related.flatMap(exercises),
  };
});
export const trademarkG8Chapters = data.topics.map((topic) => ({
  id: topic.chapterId,
  title: topic.title,
  section: "知识产权",
  topicIds: [topic.id],
}));
export const trademarkG8Exercises = trademarkG8Topics.flatMap(
  (topic) => topic.exercises,
);
export const trademarkG8ContentPack = {
  revision: trademarkG8Revision,
  snapshot: { topics: trademarkG8Topics, sources: trademarkG8Sources },
};
export const trademarkG8Question = (id: string) => {
  const question = trademarkG8Exercises.find((item) => item.id === id);
  return question ? structuredClone(question) : undefined;
};
export const trademarkG8TopicForQuestion = (id: string) =>
  trademarkG8Topics.find((topic) => topic.exercises.some((q) => q.id === id));
export const trademarkG8SubjectForQuestion = (id: string) =>
  data.topics.find((topic) => topic.id === trademarkG8TopicForQuestion(id)?.id)
    ?.subject as RemainingG6Subject | undefined;
export const trademarkG8TopicsForSubject = (subject: RemainingG6Subject) =>
  trademarkG8Topics.filter((topic) =>
    data.topics.some(
      (draft) => draft.id === topic.id && draft.subject === subject,
    ),
  );

export const trademarkG8Edition = data.edition;
