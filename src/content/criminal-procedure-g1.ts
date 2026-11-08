import type {
  ContentSources,
  Criterion,
  FaultTopic,
  UnitExercise,
} from "./fault-unit";
import data from "./criminal-procedure-g1-data.json";

// G1 original cases: fixed question/reference/requirements; learner answers stay free.
export const criminalProcedureG1Revision =
  "criminal-procedure-g1-2026-11-01.v1";
export const criminalProcedureG1Sources: ContentSources = data.sources;
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
export const criminalProcedureG1PackageGroups = {
  pretrial: topicDrafts
    .filter((t) => t.package === "pretrial")
    .map((t) => t.id),
  trial: topicDrafts.filter((t) => t.package === "trial").map((t) => t.id),
  special: topicDrafts.filter((t) => t.package === "special").map((t) => t.id),
};
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
export const criminalProcedureG1Topics: FaultTopic[] = topicDrafts.map(
  (topic) => {
    const related = cases.filter((item) => item.topicId === topic.id);
    const first = related[0];
    return {
      id: topic.id,
      title: topic.title,
      headline: topic.headline,
      goal: first.prompt,
      prerequisite: "知道刑事案件通常经过侦查、审查起诉和审判。",
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
  },
);
export const criminalProcedureG1Chapters = topicDrafts.map((topic) => ({
  id: topic.chapterId,
  title: topic.title,
  section: "刑事诉讼法",
  topicIds: [topic.id],
}));
export const criminalProcedureG1Exercises = criminalProcedureG1Topics.flatMap(
  (topic) => topic.exercises,
);
export const criminalProcedureG1ContentPack = {
  revision: criminalProcedureG1Revision,
  snapshot: {
    topics: criminalProcedureG1Topics,
    sources: criminalProcedureG1Sources,
  },
};
export const criminalProcedureG1DefaultQueues = {
  objective: criminalProcedureG1Exercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: criminalProcedureG1Exercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function criminalProcedureG1Question(id: string) {
  const question = criminalProcedureG1Exercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function criminalProcedureG1TopicForQuestion(id: string) {
  return criminalProcedureG1Topics.find((topic) =>
    topic.exercises.some((q) => q.id === id),
  );
}
export function criminalProcedureG1SameCaseQuestions(id: string) {
  const question = criminalProcedureG1Question(id);
  return question
    ? structuredClone(
        criminalProcedureG1Exercises.filter(
          (q) => q.caseId === question.caseId,
        ),
      )
    : [];
}
export function criminalProcedureG1ChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = criminalProcedureG1Chapters.find((c) => c.id === chapterId);
  return chapter
    ? criminalProcedureG1Topics
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}
