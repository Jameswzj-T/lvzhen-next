import { civilProcedureProofBoundaryCorrections } from "./civil-procedure-proof-boundary-review";
import { defenseLessonCorrection } from "./criminal-defense-lesson-correction";
import { octoberReviewedHistoricalPacks } from "./practice-content-history";
import { cl02OmissionScopeCorrections } from "./criminal-cl02-omission-scope-corrections";
import { cl02GasBoundaryCorrections } from "./criminal-cl02-gas-boundary";
import { administrativeTemporalLawExercises } from "./administrative-temporal-law";
import { borderQuestionScopeCorrections } from "./criminal-border-question-scope-corrections";
import { procurementContentCorrections } from "./criminal-procurement-content-corrections";
import { feedbackBoundaryCorrections } from "./criminal-feedback-boundary-corrections";
import { marriageRubricReviewCorrections } from "./criminal-marriage-rubric-review-corrections";
import { personRubricReviewCorrections } from "./criminal-person-rubric-review-corrections";
import { generalGapReviewCorrections } from "./criminal-general-gap-review-corrections";
import { practiceFactCases } from "./practice-fact-cases";
import { practiceFoundationCases } from "./practice-foundation-cases";
import { packageOneCorrections } from "./criminal-package-one-corrections";
import { generalCorrections } from "./criminal-general-corrections";
import { sentencingCorrections } from "./criminal-sentencing-corrections";
import { generalAuditCorrections } from "./criminal-general-audit-corrections";
import { specialAuditCorrections } from "./criminal-special-audit-corrections";
import { remainingAuditCorrections } from "./criminal-remaining-audit-corrections";
import { personCorrections } from "./criminal-person-corrections";
import { propertySafetyCorrections } from "./criminal-property-safety-corrections";
import { economicCorrections } from "./criminal-economic-corrections";
import { socialCorrections } from "./criminal-social-corrections";
import { officeCorrections } from "./criminal-office-corrections";
import { worksiteCorrections } from "./criminal-worksite-corrections";

// Same navigation slots, separate question versions and original responses.
export const practiceReplacements = [
  defenseLessonCorrection,
  ...civilProcedureProofBoundaryCorrections,
  ...cl02OmissionScopeCorrections,
  ...cl02GasBoundaryCorrections,
  ...borderQuestionScopeCorrections,
  ...procurementContentCorrections,
  ...feedbackBoundaryCorrections,
  ...marriageRubricReviewCorrections,
  ...personRubricReviewCorrections,
  ...generalGapReviewCorrections,
  ...practiceFactCases,
  ...practiceFoundationCases,
  ...packageOneCorrections,
  ...generalCorrections,
  ...sentencingCorrections,
  ...generalAuditCorrections,
  ...personCorrections,
  ...propertySafetyCorrections,
  ...economicCorrections,
  ...socialCorrections,
  ...officeCorrections,
  ...worksiteCorrections,
  ...specialAuditCorrections,
  ...remainingAuditCorrections,
];
const replacementIds = new Map([
  ...octoberReviewedHistoricalPacks.flatMap((p) =>
    p.snapshot.topics.flatMap((t) =>
      t.exercises.map((q) => [q.id, `${q.id}-v2`] as const),
    ),
  ),
  ...practiceReplacements.map(
    (item) => [item.replaces, item.exercise.id] as const,
  ),
  ...administrativeTemporalLawExercises.map(
    (q) => [q.id.replace(/-v3$/, ""), q.id] as const,
  ),
]);

export const currentPracticeId = (id: string): string => {
  const visited = new Set<string>();
  let current = id;
  while (replacementIds.has(current)) {
    if (visited.has(current)) {
      throw new Error(`Question replacement cycle: ${id}`);
    }
    visited.add(current);
    current = replacementIds.get(current)!;
  }
  return current;
};
