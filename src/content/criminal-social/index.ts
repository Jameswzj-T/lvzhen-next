import { publicCases } from "./public";
import { networkCases } from "./network";
import { justiceCases } from "./justice";
import { healthNatureCases } from "./health-nature";
import { borderDrugCases } from "./border-drug";
import { socialReviewCases } from "./review";

export const socialRevision = "criminal-social-2026-09-15.v1";
export const socialCases = [
  ...publicCases,
  ...networkCases,
  ...justiceCases,
  ...healthNatureCases,
  ...borderDrugCases,
  ...socialReviewCases,
];
