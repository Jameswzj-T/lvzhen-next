import { publicDangerCases } from "./public";
import { trafficSafetyCases } from "./traffic";
import { productionSafetyCases } from "./work";
import { safetyReviewCases } from "./review";

export const safetyRevision = "criminal-safety-2026-09-15.v1";
export const safetyCases = [
  ...publicDangerCases,
  ...trafficSafetyCases,
  ...productionSafetyCases,
  ...safetyReviewCases,
];
