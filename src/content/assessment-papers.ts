import {
  revisedProcurementContentCase,
  procurementContentCorrectionRevision,
} from "./criminal-procurement-content-corrections";
import { revisedContractCase } from "./criminal-feedback-boundary-corrections";
import { longCases } from "./criminal-capstone";
import { revisedWorksiteCase } from "./criminal-worksite-corrections";
import { civilIntegratedPracticePapers } from "./civil-integrated-practice";
import { comprehensiveG7Papers } from "./comprehensive-g7";

export type AssessmentPaper = {
  id: string;
  revision: string;
  kind: "case" | "exam" | "practice";
  title: string;
  minutes: number | null;
  questionIds: string[];
  archived?: boolean;
  subject?: "civil-law";
  scopeId?: string;
  mode?: "objective" | "subjective";
  collection?: "comprehensive-g7";
};
const reviewPairs = [
  [
    "cl01-review-local-rule",
    "cl01-review-worker",
    "cl01-review-border",
    "cl01-review-diplomat",
  ],
  [
    "cl02-review-bystander",
    "cl02-review-shared-control",
    "cl02-review-injury-risk",
    "cl02-review-two-damage",
  ],
  [
    "cl03-review-normal-period",
    "cl03-review-drunk",
    "cl03-review-age-change",
    "cl03-review-elderly",
  ],
  [
    "cl04-review-cargo",
    "cl04-review-risk",
    "cl04-review-policy-notice",
    "cl04-review-interruption",
  ],
  [
    "cl05-review-chase",
    "cl05-review-later",
    "cl05-review-provocation",
    "cl05-review-fire",
  ],
  [
    "cl06-review-different",
    "cl06-review-new-tool",
    "cl06-review-penalties",
    "cl06-review-illusion",
  ],
  [
    "cl07-review-hired-driver",
    "cl07-review-secret-return",
    "cl07-review-instigator-role",
    "cl07-review-shared-range",
  ],
  [
    "cl08-review-independent-victims",
    "cl08-review-continuation",
    "cl08-review-control",
    "cl08-review-later-violence",
  ],
  [
    "cl09-review-reprieve-crime",
    "cl09-review-three-property",
    "cl09-review-imprisonment-credit",
    "cl09-review-lifetime",
  ],
  [
    "cl10-review-age",
    "cl10-review-mixed-penalties",
    "cl10-review-limitation-restart",
    "cl01-review-light-law",
  ],
  [
    "cl11-review-injury-elder",
    "cl11-review-organs",
    "cl11-review-care-force",
    "cl11-review-rape-evidence",
  ],
  [
    "cl12-review-hostage-debt",
    "cl12-review-dangerous-child-labor",
    "cl12-review-data-service",
    "cl12-review-rights-subjects",
  ],
  [
    "cl13-review-rental",
    "cl13-review-guesthouse",
    "cl13-review-charity",
    "cl13-review-shuttle",
  ],
  [
    "cl14-review-river",
    "cl14-review-schoolbus",
    "cl14-review-rectification",
    "cl14-review-passenger",
  ],
  [
    "cl15-review-fertilizer",
    "cl15-review-public-report",
    "cl15-review-membership",
    "cl15-review-intermediary-bribe",
  ],
  [
    "cl16-review-tax-ratio",
    "cl16-review-trading-profit",
    "cl16-review-card-principal",
    "cl16-review-two-copy-sources",
  ],
  [
    "cl17-review-inspection-revenge",
    "cl17-review-criminal-group",
    "cl17-review-flow-alone",
    "cl17-review-false-testimony",
  ],
  [
    "cl18-review-waste-monitor",
    "cl18-review-animal-river",
    "cl18-review-tree-relic",
    "cl18-review-medical-accident",
  ],
  [
    "cl19-review-unit-division",
    "cl19-review-spouse-salary",
    "cl19-review-graft-relief",
    "cl19-review-duty-collusion",
  ],
  [
    "cl20-review-secret-recipient",
    "cl20-review-joining-enemy",
    "cl20-review-civilian-military",
    "cl20-review-defection-context",
  ],
];
// Freeze IDs rather than dynamically picking new questions when the bank changes.
export const assessmentPapers: AssessmentPaper[] = [
  ...longCases.map((c) => ({
    id: c.id,
    revision: "2026-09-15.v1",
    kind: "case" as const,
    title: c.title,
    minutes: null,
    questionIds: c.cases.map((q) => q.exercise.id),
    archived: ["cap-worksite", "cap-contract", "cap-procurement"].includes(
      c.id,
    ),
  })),
  {
    id: revisedProcurementContentCase.id,
    revision: procurementContentCorrectionRevision,
    kind: "case",
    title: revisedProcurementContentCase.title,
    minutes: null,
    questionIds: revisedProcurementContentCase.cases.map((c) => c.exercise.id),
  },
  {
    id: revisedContractCase.id,
    revision: "2026-09-30.v2",
    kind: "case",
    title: revisedContractCase.title,
    minutes: null,
    questionIds: revisedContractCase.cases.map((c) => c.exercise.id),
  },
  {
    id: revisedWorksiteCase.id,
    revision: "2026-09-24.v2",
    kind: "case",
    title: revisedWorksiteCase.title,
    minutes: null,
    questionIds: revisedWorksiteCase.cases.map((q) => q.exercise.id),
  },
  ...[0, 1].map((i) => ({
    id: `criminal-paper-${i + 1}`,
    revision: "2026-09-15.v1",
    kind: "exam" as const,
    title: `刑法客观专项卷${i === 0 ? "一" : "二"}`,
    minutes: 60,
    questionIds: reviewPairs.flatMap((row) => row.slice(i * 2, i * 2 + 2)),
    archived: true,
  })),
  {
    id: "criminal-paper-1-v2",
    revision: "2026-09-24.v2",
    kind: "exam",
    title: "刑法客观专项卷一",
    minutes: 60,
    archived: true,
    questionIds: reviewPairs
      .flatMap((row) => row.slice(0, 2))
      .map((id) =>
        id === "cl17-review-inspection-revenge" ||
        id === "cl17-review-criminal-group"
          ? `${id}-v2`
          : id === "cl18-review-waste-monitor"
            ? `${id}-v2`
            : id,
      ),
  },
  {
    id: "criminal-paper-2-v2",
    revision: "2026-09-24.v2",
    kind: "exam",
    title: "刑法客观专项卷二",
    minutes: 60,
    archived: true,
    questionIds: reviewPairs
      .flatMap((row) => row.slice(2, 4))
      .map((id) =>
        id === "cl02-review-two-damage"
          ? "cl02-review-two-damage-v2"
          : id === "cl09-review-lifetime"
            ? "cl09-review-lifetime-v2"
            : id,
      ),
  },
  {
    id: "criminal-paper-1-v3",
    revision: "2026-09-24.v3",
    kind: "exam",
    title: "刑法客观专项卷一",
    minutes: 60,
    archived: true,
    questionIds: reviewPairs
      .flatMap((row) => row.slice(0, 2))
      .map((id) =>
        [
          "cl17-review-inspection-revenge",
          "cl17-review-criminal-group",
          "cl18-review-waste-monitor",
          "cl20-review-joining-enemy",
        ].includes(id)
          ? `${id}-v2`
          : id,
      ),
  },
  {
    id: "criminal-paper-1-v4",
    revision: "2026-09-30.v4",
    kind: "exam",
    title: "刑法客观专项卷一",
    minutes: 60,
    archived: true,
    questionIds: reviewPairs
      .flatMap((row) => row.slice(0, 2))
      .map((id) =>
        [
          "cl06-review-new-tool",
          "cl17-review-inspection-revenge",
          "cl17-review-criminal-group",
          "cl18-review-waste-monitor",
          "cl20-review-joining-enemy",
        ].includes(id)
          ? `${id}-v2`
          : id,
      ),
  },
  {
    id: "criminal-paper-1-v5",
    revision: "2026-09-30.v5",
    kind: "exam",
    title: "刑法客观专项卷一",
    minutes: 60,
    questionIds: reviewPairs
      .flatMap((row) => row.slice(0, 2))
      .map((id) =>
        [
          "cl06-review-new-tool",
          "cl17-review-inspection-revenge",
          "cl17-review-criminal-group",
          "cl18-review-waste-monitor",
          "cl19-review-spouse-salary",
          "cl20-review-joining-enemy",
        ].includes(id)
          ? `${id}-v2`
          : id,
      ),
  },
  {
    id: "criminal-paper-2-v3",
    revision: "2026-09-24.v3",
    kind: "exam",
    title: "刑法客观专项卷二",
    minutes: 60,
    archived: true,
    questionIds: reviewPairs
      .flatMap((row) => row.slice(2, 4))
      .map((id) =>
        [
          "cl02-review-two-damage",
          "cl09-review-lifetime",
          "cl20-review-defection-context",
        ].includes(id)
          ? `${id}-v2`
          : id,
      ),
  },
  {
    id: "criminal-paper-2-v4",
    revision: "2026-09-24.v4",
    kind: "exam",
    title: "刑法客观专项卷二",
    minutes: 60,
    questionIds: reviewPairs
      .flatMap((row) => row.slice(2, 4))
      .map((id) =>
        [
          "cl02-review-two-damage",
          "cl09-review-lifetime",
          "cl15-review-intermediary-bribe",
          "cl16-review-two-copy-sources",
          "cl20-review-defection-context",
        ].includes(id)
          ? `${id}-v2`
          : id,
      ),
  },
  ...civilIntegratedPracticePapers,
  ...comprehensiveG7Papers,
];
export const assessmentPaper = (id: string) =>
  assessmentPapers.find((p) => p.id === id);
