import { cl04Supplement } from "./cl04-supplement";
import { cl05Cases } from "./cl05";
import { cl06Cases } from "./cl06";
import { cl07Cases } from "./cl07";
import { cl08Cases } from "./cl08";
import { cl09Cases } from "./cl09";
import { cl10Cases } from "./cl10";

export const generalRevision = "criminal-general-2026-09-15.v1";
export const generalCases = [
  ...cl04Supplement,
  ...cl05Cases,
  ...cl06Cases,
  ...cl07Cases,
  ...cl08Cases,
  ...cl09Cases,
  ...cl10Cases,
];
