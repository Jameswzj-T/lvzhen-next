import { availableChapters } from "../../../content/criminal-curriculum";
import {
  knowledgeTopics,
  practiceKnowledge,
} from "../../../content/practice-set";

// A return link can open only knowledge actually rendered in the study page.
// An unknown or historical-only ID must never select a guessed chapter.
export function studyTopicLocation(topicId: unknown): {
  topicId: string;
  chapterId: string;
  href: string;
} | null {
  if (typeof topicId !== "string" || !topicId || topicId.length > 100)
    return null;
  const topic = knowledgeTopics.find((item) => item.id === topicId);
  const chapter =
    topic && availableChapters.find((item) => item.topicIds.includes(topic.id));
  if (!topic || !chapter || !practiceKnowledge[topic.id]) return null;
  return {
    topicId: topic.id,
    chapterId: chapter.id,
    href: `/lab/study?topic=${encodeURIComponent(topic.id)}`,
  };
}
