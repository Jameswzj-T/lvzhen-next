import { justificationGapCases } from "./cl05";
import { dangerGapCases } from "./cl06";
import { statusGapCases } from "./cl07";
import { concurrenceGapCases } from "./cl08";

export const generalGapRevision = "criminal-general-gaps-2026-09-30.v1";
export const generalGapCases = [
  ...justificationGapCases,
  ...dangerGapCases,
  ...statusGapCases,
  ...concurrenceGapCases,
];
