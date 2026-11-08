import type { ChapterCase } from "../criminal-package-one/authoring";

export type GapTopic = {
  id: string;
  chapterId: string;
  title: string;
  rule: string;
  omission: string;
  example: string;
  analysis: string;
  sources: string[];
  cases: ChapterCase[];
};
