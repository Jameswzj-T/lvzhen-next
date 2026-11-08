import {
  isChapterReview,
  practiceGroups,
  practiceQueues,
  type PracticeMode,
} from "../../../content/practice-set";

// Knowledge links retain the usual objective entry when it exists. A topic
// with only written practice must open that practice, not the previous topic.
export function topicPracticeMode(topicId: string): PracticeMode | null {
  const group = practiceGroups.find((item) => item.topicId === topicId);
  if (!group) return null;
  for (const mode of ["objective", "subjective"] as const)
    if (
      group.ids.some(
        (id) => practiceQueues[mode].includes(id) && !isChapterReview(id),
      )
    )
      return mode;
  return null;
}
