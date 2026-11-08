// Explicitly adopted teaching paths only. This local UI scope never grants a
// provider call or replaces the server's question/revision/content hash checks.
export const teacherLearningQuestionIds: readonly string[] = [
  "civil-tort-neighbor-window",
  "civil-tort-mall-slip",
  "civil-contract-changed-price",
  "cl14-flight-no-serious-result",
];
export const isTeacherLearningQuestion = (questionId: string) =>
  teacherLearningQuestionIds.includes(questionId);
