import { theftCases } from "./theft";
import { fraudCases } from "./fraud";
import { robberyCases } from "./robbery";
import { otherPropertyCases } from "./other";
import { propertyReviewCases } from "./review";

export const propertyRevision = "criminal-property-2026-09-15.v1";
export const propertyCases = [
  ...theftCases,
  ...fraudCases,
  ...robberyCases,
  ...otherPropertyCases,
  ...propertyReviewCases,
];
