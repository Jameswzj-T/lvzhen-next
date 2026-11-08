import type { FaultTopic } from "../fault-unit";
import { capstoneGaps } from "./gaps";

export const capstoneKnowledge = Object.fromEntries(
  capstoneGaps.map((t) => [t.id, { rule: t.rule, omission: t.omission }]),
);
export const capstoneTopics: FaultTopic[] = capstoneGaps.map((t) => ({
  id: t.id,
  title: t.title,
  headline: t.title,
  goal: t.rule,
  prerequisite: "可直接查看要点或进入练习。",
  minutes: "3–5",
  paragraphs: [t.rule, t.omission],
  pitfall: t.omission,
  example: { title: "一个区别", facts: t.example, analysis: t.analysis },
  recall: { prompt: "这一知识的适用条件是什么？", reference: t.rule },
  sources: t.sources,
  exercises: t.cases.map((c) => c.exercise),
}));
