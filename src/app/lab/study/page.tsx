import type { Metadata } from "next";
import { StudyEntry } from "./study-view";
import { studyTopicLocation } from "./topic-location";
import { studySubjectSelection, subjectStudyTopic } from "./subject-knowledge";
export const metadata: Metadata = {
  title: "学习 · 律真",
  description: "看清知识体系，从上次的位置接着练习。",
};
export default async function StudyPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const subject = studySubjectSelection(query.subject);
  const topicId =
    subject && subject !== "criminal-law"
      ? subjectStudyTopic(subject, query.topic)?.id
      : studyTopicLocation(query.topic)?.topicId;
  return <StudyEntry initialTopicId={topicId} initialSubject={subject} />;
}
