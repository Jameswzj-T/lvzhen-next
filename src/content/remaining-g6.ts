import {
  remainingG6SubjectInfo,
  type RemainingG6Subject,
} from "./remaining-g6-subjects";
import type {
  ContentSources,
  Criterion,
  FaultTopic,
  UnitExercise,
} from "./fault-unit";
import data from "./remaining-g6-data.json";
import {
  trademarkG8Chapters,
  trademarkG8Exercises,
  trademarkG8Question,
  trademarkG8SubjectForQuestion,
  trademarkG8TopicDrafts,
  trademarkG8TopicForQuestion,
  trademarkG8Topics,
  trademarkG8TopicsForSubject,
} from "./trademark-g8";
import {
  annualG8Chapters,
  annualG8Exercises,
  annualG8Question,
  annualG8SubjectForQuestion,
  annualG8TopicDrafts,
  annualG8TopicForQuestion,
  annualG8Topics,
  annualG8TopicsForSubject,
} from "./annual-g8";

// G6 original cases: fixed question/reference/requirements; learner answers stay free.
export const remainingG6Revision = "remaining-g6-2026-11-01.v1";
export const remainingG6Sources: ContentSources = data.sources;
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
export const remainingG6Topics: FaultTopic[] = topicDrafts.map((topic) => {
  const related = cases.filter((item) => item.topicId === topic.id);
  const first = related[0];
  return {
    id: topic.id,
    title: topic.title,
    headline: topic.headline,
    goal: first.prompt,
    prerequisite: "先看本组适用的制度和时间，再结合法律规则判断。",
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
export const remainingG6Chapters = [
  ...topicDrafts.map((topic) => ({
    id: topic.chapterId,
    title: topic.title,
    section: remainingG6SubjectInfo[topic.subject as RemainingG6Subject].label,
    topicIds: [topic.id],
  })),
  ...annualG8Chapters,
  ...trademarkG8Chapters,
];
export const remainingG6Exercises = remainingG6Topics.flatMap(
  (topic) => topic.exercises,
);
export const remainingG6ContentPack = {
  revision: remainingG6Revision,
  snapshot: {
    topics: remainingG6Topics,
    sources: remainingG6Sources,
  },
};
export const remainingG6DefaultQueues = {
  objective: remainingG6Exercises
    .filter((q) => q.kind === "objective")
    .map((q) => q.id),
  subjective: remainingG6Exercises
    .filter((q) => q.kind === "subjective")
    .map((q) => q.id),
};
export function remainingG6Question(id: string) {
  const trademark = trademarkG8Question(id);
  if (trademark) return trademark;
  const annual = annualG8Question(id);
  if (annual) return annual;
  const question = remainingG6Exercises.find((q) => q.id === id);
  return question ? structuredClone(question) : undefined;
}
export function remainingG6TopicForQuestion(id: string) {
  return (
    trademarkG8TopicForQuestion(id) ??
    annualG8TopicForQuestion(id) ??
    remainingG6Topics.find((topic) => topic.exercises.some((q) => q.id === id))
  );
}
export function remainingG6SameCaseQuestions(id: string) {
  const question = remainingG6Question(id);
  return question
    ? structuredClone(
        [
          ...remainingG6Exercises,
          ...annualG8Exercises,
          ...trademarkG8Exercises,
        ].filter((q) => q.caseId === question.caseId),
      )
    : [];
}
export function remainingG6ChapterQueue(
  chapterId: string,
  mode: "objective" | "subjective",
) {
  const chapter = remainingG6Chapters.find((c) => c.id === chapterId);
  return chapter
    ? [...remainingG6Topics, ...annualG8Topics, ...trademarkG8Topics]
        .filter((t) => chapter.topicIds.includes(t.id))
        .flatMap((t) => t.exercises)
        .filter((q) => q.kind === mode)
        .map((q) => q.id)
    : [];
}

export function remainingG6TopicsForSubject(subject: RemainingG6Subject) {
  const ids = new Set(
    topicDrafts.filter((t) => t.subject === subject).map((t) => t.id),
  );
  return [
    ...remainingG6Topics.filter((t) => ids.has(t.id)),
    ...annualG8TopicsForSubject(subject),
    ...trademarkG8TopicsForSubject(subject),
  ];
}
export function remainingG6SubjectForQuestion(
  id: string,
): RemainingG6Subject | undefined {
  const trademark = trademarkG8SubjectForQuestion(id);
  if (trademark) return trademark;
  const annual = annualG8SubjectForQuestion(id);
  if (annual) return annual;
  const topic = remainingG6TopicForQuestion(id);
  return topicDrafts.find((t) => t.id === topic?.id)?.subject as
    RemainingG6Subject | undefined;
}
export function remainingG6QueuesForSubject(subject: RemainingG6Subject) {
  const questions = remainingG6TopicsForSubject(subject).flatMap(
    (t) => t.exercises,
  );
  return {
    objective: questions.filter((q) => q.kind === "objective").map((q) => q.id),
    subjective: questions
      .filter((q) => q.kind === "subjective")
      .map((q) => q.id),
  };
}
export function remainingG6Knowledge(subject: RemainingG6Subject) {
  const topics = remainingG6TopicsForSubject(subject);
  return {
    topics,
    content: Object.fromEntries(
      topics.map((t) => [
        t.id,
        { rule: t.paragraphs.join("\n\n"), omission: t.pitfall },
      ]),
    ),
  };
}
const sectionDefinitions = [
  { id: "jurisprudence", title: "法治思想与法理", subject: "theory-law" },
  { id: "constitution", title: "宪法", subject: "theory-law" },
  { id: "history", title: "中国法律史", subject: "theory-law" },
  { id: "judicial-system", title: "司法制度", subject: "legal-profession" },
  {
    id: "professional-ethics",
    title: "法律职业道德",
    subject: "legal-profession",
  },
  { id: "public-international", title: "国际法", subject: "international-law" },
  {
    id: "private-international",
    title: "国际私法",
    subject: "international-law",
  },
  {
    id: "international-trade",
    title: "国际经济法",
    subject: "international-law",
  },
  {
    id: "intellectual-property",
    title: "知识产权基础",
    subject: "intellectual-property",
  },
] as const;
export function remainingG6SectionsForSubject(subject: RemainingG6Subject) {
  return sectionDefinitions
    .filter((s) => s.subject === subject)
    .map((s) => {
      const topics = [
        ...topicDrafts,
        ...annualG8TopicDrafts,
        ...trademarkG8TopicDrafts,
      ].filter((t) => t.subject === subject && t.sectionId === s.id);
      const ids = new Set(topics.map((t) => t.id));
      return {
        ...s,
        chapterIds: topics.map((t) => t.chapterId),
        topicIds: [...ids],
        questionIds: [
          ...remainingG6Topics,
          ...annualG8Topics,
          ...trademarkG8Topics,
        ]
          .filter((t) => ids.has(t.id))
          .flatMap((t) => t.exercises.map((q) => q.id)),
      };
    });
}
