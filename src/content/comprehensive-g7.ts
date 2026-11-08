import { g8CompletionPaperDefinitions } from "./g8-completion";
import type { AssessmentPaper } from "./assessment-papers";
import type { PracticeSubject } from "./practice-set";
import data from "./comprehensive-g7-data.json";

export const comprehensiveG7Revision = data.revision;
export type ComprehensiveG7Group =
  "stage" | "exam" | "written" | "case" | "choice-types" | "drafting" | "essay";
export const comprehensiveG7Definitions = [
  ...data.papers.map((p) => ({
    ...p,
    subjects: p.subjects as PracticeSubject[],
    group: p.group as ComprehensiveG7Group,
    mode: p.mode as "objective" | "subjective",
  })),
  ...g8CompletionPaperDefinitions.map((p) => ({
    ...p,
    group: p.group as ComprehensiveG7Group,
    mode: p.mode as "objective" | "subjective",
  })),
];
export const comprehensiveG7Papers: AssessmentPaper[] =
  comprehensiveG7Definitions.map((p) => ({
    id: p.id,
    revision:
      g8CompletionPaperDefinitions.find((next) => next.id === p.id)?.revision ??
      comprehensiveG7Revision,
    title: p.title,
    kind: p.kind as AssessmentPaper["kind"],
    mode: p.mode,
    minutes: p.minutes,
    questionIds: [...p.questionIds],
    collection: "comprehensive-g7",
    scopeId: p.id,
  }));
export const isComprehensiveG7Paper = (
  paper: AssessmentPaper | undefined,
): boolean => paper?.collection === "comprehensive-g7";
export const comprehensiveG7Definition = (id: string) =>
  comprehensiveG7Definitions.find((p) => p.id === id);
export const comprehensiveG7Subjects = (
  paper: AssessmentPaper | undefined,
): PracticeSubject[] =>
  paper ? (comprehensiveG7Definition(paper.id)?.subjects ?? []) : [];
export const isComprehensiveG7Question = (id: string) =>
  comprehensiveG7Papers.some((p) => p.questionIds.includes(id));
