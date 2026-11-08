// Evidence coverage has no weight, score or pass threshold. It is not the older
// three-by-two training score. HTTP practice routes do not import this module.
export const COVERAGE_VERSION = "short-coverage-v1";
export type CoverageLabel = "是" | "否" | "待核对";
export type CoverageCriterion = {
  id: string;
  originalId: string;
  title: string;
  requirement: string;
  boundary: string;
  manualHold?: string;
};
export type CoverageCard = {
  id: string;
  exerciseRevision: string;
  title: string;
  facts: string;
  prompt: string;
  sourceIds: string[];
  criteria: CoverageCriterion[];
};
export type CoverageSource = {
  id: string;
  title: string;
  url: string;
  checkedAt: string;
  text: string;
};
export type CoverageSample = {
  id: string;
  exerciseId: string;
  kind: "correct" | "omission" | "misleading";
  answer: string;
  expected: {
    criterionId: string;
    label: CoverageLabel;
    evidence: string[];
    reason: string;
  }[];
};
