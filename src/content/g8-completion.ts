import type { ContentSources, FaultTopic, UnitExercise } from "./fault-unit";
import type { PracticeSubject, PracticeMode } from "./practice-set";
import data from "./g8-completion-data.json";

// Supplement existing substantive topics. Their original publications stay intact.
export const g8CompletionRevision = data.revision;
export const g8CompletionSources: ContentSources = data.sources;
export type G8WritingFormat = "document" | "essay";
type Row = {
  subject: PracticeSubject;
  parentTopicId: string;
  chapterId: string;
  writingFormat?: G8WritingFormat;
  exercise: UnitExercise;
};
export const g8CompletionRows = data.questions as Row[];
export const g8CompletionExercises = g8CompletionRows.map((r) => r.exercise);
export const g8CompletionTopics = data.parents as FaultTopic[];
export const g8CompletionContentPack = {
  revision: g8CompletionRevision,
  snapshot: { topics: g8CompletionTopics, sources: g8CompletionSources },
};
export const g8CompletionRow = (id: string) =>
  g8CompletionRows.find((r) => r.exercise.id === id);
export const g8CompletionQuestion = (id: string) => {
  const q = g8CompletionRow(id)?.exercise;
  return q ? structuredClone(q) : undefined;
};
export const g8CompletionSubject = (id: string) => g8CompletionRow(id)?.subject;
export const g8CompletionTopicForQuestion = (id: string) => {
  const row = g8CompletionRow(id);
  return row && g8CompletionTopics.find((t) => t.id === row.parentTopicId);
};
export const g8CompletionQuestionsForSubject = (subject: PracticeSubject) =>
  g8CompletionRows.filter((r) => r.subject === subject).map((r) => r.exercise);
export const g8CompletionQueue = (
  subject: PracticeSubject,
  mode: PracticeMode,
) =>
  g8CompletionQuestionsForSubject(subject)
    .filter((q) => q.kind === mode)
    .map((q) => q.id);
export const g8CompletionChapterQueue = (
  chapterId: string,
  mode: PracticeMode,
) =>
  g8CompletionRows
    .filter((r) => r.chapterId === chapterId && r.exercise.kind === mode)
    .map((r) => r.exercise.id);
export const g8WritingFormat = (id: string) =>
  g8CompletionRow(id)?.writingFormat;
export const g8CompletionSameCase = (id: string) => {
  const q = g8CompletionQuestion(id);
  return q
    ? structuredClone(
        g8CompletionExercises.filter((other) => other.caseId === q.caseId),
      )
    : [];
};
const labels: Partial<Record<PracticeSubject, string>> = {
  "civil-law": "民法",
  "civil-procedure": "民诉",
  "criminal-procedure": "刑诉",
  "administrative-law": "行政法",
  "commercial-law": "商法与经济法",
  "theory-law": "理论法",
  "legal-profession": "司法制度与职业道德",
  "international-law": "三国法",
  "intellectual-property": "知识产权",
};
export const g8CompletionPaperDefinitions = [
  ...Object.entries(labels).map(([subject, label]) => ({
    id: `g8-choice-types-${subject}`,
    revision: g8CompletionRevision,
    title: `${label} · 多选与不定项`,
    kind: "practice",
    group: "choice-types",
    mode: "objective",
    minutes: null,
    subjects: [subject as PracticeSubject],
    questionIds: g8CompletionQueue(subject as PracticeSubject, "objective"),
    description:
      "4道原创题：2道多选、2道不定项。不计时，全部选对才命中；交卷后逐项看解析。",
  })),
  ...g8CompletionRows
    .filter((r) => r.writingFormat)
    .map((r) => ({
      id: r.exercise.id,
      revision: g8CompletionRevision,
      title: r.exercise.title,
      kind: "practice",
      group: r.writingFormat === "document" ? "drafting" : "essay",
      mode: "subjective",
      minutes: null,
      subjects: [r.subject],
      questionIds: [r.exercise.id],
      description:
        r.writingFormat === "document"
          ? "从案情材料写出一份完整文书。自动保存，交卷后看参考与AI讲解。"
          : "围绕材料写一篇完整论述。自动保存，交卷后看参考与AI讲解。",
    })),
];
