import { goodsCases } from "./goods";
import { enterpriseCases } from "./enterprise";
import { marketCases } from "./market";
import { financeCases } from "./finance";
import { taxIpCases } from "./tax-ip";
import { economicReviewCases } from "./review";

export const economicRevision = "criminal-economic-2026-09-15.v1";
export const economicCases = [
  ...goodsCases,
  ...enterpriseCases,
  ...marketCases,
  ...financeCases,
  ...taxIpCases,
  ...economicReviewCases,
];
