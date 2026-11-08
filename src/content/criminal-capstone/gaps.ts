import { generalGaps } from "./gaps-general";
import { economicGaps } from "./gaps-economic";
import { socialGaps } from "./gaps-social";
import { officeGaps } from "./gaps-office";
export const capstoneGaps = [
  ...generalGaps,
  ...economicGaps,
  ...socialGaps,
  ...officeGaps,
];
export const capstoneGapCases = capstoneGaps.flatMap((t) => t.cases);
