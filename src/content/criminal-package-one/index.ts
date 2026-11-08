import { cl01Cases } from "./cl01";
import { cl02Cases } from "./cl02";
import { cl03Cases } from "./cl03";
import { cl04Cases } from "./cl04";

export const packageOneRevision = "criminal-package-one-2026-09-15.v1";
export const packageOneCases = [
  ...cl01Cases,
  ...cl02Cases,
  ...cl03Cases,
  ...cl04Cases,
];
export const isChapterReview = (id: string) =>
  packageOneCases.some((c) => c.review && c.exercise.id === id);
