import { officeAssetCases } from "./assets";
import { officeBriberyCases } from "./bribery";
import { officeDerelictionCases } from "./dereliction";
import { officeSecurityCases } from "./security";
import { officeReviewCases } from "./review";

export const officeRevision = "criminal-office-2026-09-15.v1";
export const officeCases = [
  ...officeAssetCases,
  ...officeBriberyCases,
  ...officeDerelictionCases,
  ...officeSecurityCases,
  ...officeReviewCases,
];
