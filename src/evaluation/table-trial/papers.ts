import type { TableCase } from "./contract";

// Practice papers that can hand a finished run to the frozen scoring cards.
// Archived mappings allow read-only access to saved reviews. Availability
// blocks new submissions; the default list still contains only live cards.
export const paperCaseIds: Readonly<Record<string, string>> = {
  "cap-network": "NETWORK",
  "cap-fire": "FIRE",
  "cap-warehouse": "WAREHOUSE",
  "cap-worksite-v2": "WORKSITE_V2",
  "cap-debt": "DEBT",
  "cap-procurement": "PROCUREMENT",
  "cap-procurement-v2": "PROCUREMENT_V2",
  "cap-contract": "CONTRACT",
  "cap-contract-v2": "CONTRACT_V2",
  "cap-timeline": "TIMELINE",
};
export type ScoringPaper = { paperId: string; caseId: string; title: string };

// Intersects the mapping with what the catalogue actually offers right now,
// so a paper is only offered when its card is loaded and not archived.
export function scoringPapers(
  cases: { item: TableCase }[],
  archivedIds: string[],
  includeArchived = false,
): ScoringPaper[] {
  return Object.entries(paperCaseIds)
    .map(([paperId, caseId]) => {
      const item = cases.find((c) => c.item.id === caseId)?.item;
      return item && (includeArchived || !archivedIds.includes(caseId))
        ? { paperId, caseId, title: item.title }
        : null;
    })
    .filter((p): p is ScoringPaper => p !== null);
}
