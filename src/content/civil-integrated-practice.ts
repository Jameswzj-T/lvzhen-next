import type { AssessmentPaper } from "./assessment-papers";

// Fixed, versioned lists reuse existing questions; additions to the bank cannot change a saved set.
export const civilIntegratedPracticeRevision = "civil-integrated-2026-10-27.v1";
export const civilIntegratedScopes = [
  {
    id: "general",
    title: "总则与法律行为",
    description: "从民事主体、法律行为和代理的不同案情开始。",
    objectiveIds: [
      "civil-agency-authorized-purchase",
      "civil-validity-voluntary-regret",
      "civil-foundation-capacity-under-eight-choice",
      "civil-foundation-limitation-identity-choice",
      "civil-bounded-gaps-guardian-court-selection-choice",
      "civil-bounded-gaps-mistake-output-specification-choice",
      "civil-bounded-gaps-disappearance-property-custody-choice",
      "civil-bounded-gaps-condition-obstruct-test-choice",
    ],
    subjectiveIds: [
      "civil-foundation-capacity-school-purchase-explain",
      "civil-foundation-limitation-identity-explain",
      "civil-bounded-gaps-guardian-court-selection-written",
      "civil-bounded-gaps-mistake-output-specification-written",
    ],
  },
  {
    id: "property",
    title: "物权与担保",
    description: "结合财产归属、交付登记与担保关系作答。",
    objectiveIds: [
      "civil-movable-delivered-unpaid-choice",
      "civil-foundation-property-unregistered-choice",
      "civil-property-coown-seventy-choice",
      "civil-property-goodfaith-camera-choice",
      "civil-property-mortgage-house-choice",
      "civil-property-pledge-violin-choice",
      "civil-guarantee-coverage-order-debtor-collateral-choice",
      "civil-neighbor-possession-water-fair-share-choice",
    ],
    subjectiveIds: [
      "civil-foundation-property-unregistered-explain",
      "civil-property-coown-seventy-explain",
      "civil-property-goodfaith-camera-explain",
      "civil-property-mortgage-house-explain",
    ],
  },
  {
    id: "contract",
    title: "合同与债的履行",
    description: "练习从合同成立到履行、救济和债务消灭的不同问题。",
    objectiveIds: [
      "civil-contract-invitation",
      "civil-contract-simultaneous-performance",
      "civil-contract-stock-delivery-remedy",
      "civil-contract-known-resale-profit",
      "civil-contract-low-penalty-request",
      "civil-guarantee-default-choice",
      "civil-obligation-subrogation-goods-choice",
      "civil-obligation-notice-paid-choice",
    ],
    subjectiveIds: [
      "civil-obligation-subrogation-goods-explain",
      "civil-obligation-notice-paid-explain",
      "civil-obligation-transfer-silence-explain",
      "civil-sale-lease-risk-before-explain",
    ],
  },
  {
    id: "personality",
    title: "人格权",
    description: "在不同生活场景中判断人格权益及其保护。",
    objectiveIds: [
      "civil-personality-name-false-endorsement-choice",
      "civil-personality-portrait-id-photo-ad-choice",
      "civil-personality-reputation-invented-theft-choice",
      "civil-personality-privacy-home-camera-choice",
      "civil-personality-name-fake-official-company-choice",
      "civil-personality-portrait-free-exhibition-choice",
      "civil-personality-reputation-accurate-supervision-choice",
      "civil-personality-privacy-report-shared-friend-choice",
    ],
    subjectiveIds: [
      "civil-personality-name-false-endorsement-written",
      "civil-personality-portrait-id-photo-ad-written",
      "civil-personality-reputation-invented-theft-written",
      "civil-personality-privacy-home-camera-written",
    ],
  },
  {
    id: "family",
    title: "婚姻家庭",
    description: "练习婚姻、夫妻财产与家庭关系中的具体问题。",
    objectiveIds: [
      "civil-family-bigamy-prior-divorce-choice",
      "civil-family-salary-specific-gift-choice",
      "civil-family-divorce-withdraw-day18-choice",
      "civil-family-child-under-two-choice",
      "civil-bounded-gaps-adoption-notarized-no-registration-choice",
      "civil-bounded-gaps-divorce-extra-housework-choice",
      "civil-family-age-reached-before-filing-choice",
      "civil-family-livestream-marital-partition-choice",
    ],
    subjectiveIds: [
      "civil-family-bigamy-prior-divorce-written",
      "civil-family-salary-specific-gift-written",
      "civil-family-divorce-withdraw-day18-written",
      "civil-family-child-under-two-written",
    ],
  },
  {
    id: "inheritance",
    title: "继承",
    description: "结合继承、遗嘱和遗产处理的案情作答。",
    objectiveIds: [
      "civil-inheritance-living-owner-no-opening-choice",
      "civil-inheritance-first-order-excludes-brother-choice",
      "civil-inheritance-will-handwritten-no-notary-choice",
      "civil-inheritance-transfer-spouse-after-heir-death-choice",
      "civil-bounded-gaps-estate-named-executor-choice",
      "civil-inheritance-marital-fund-estate-scope-choice",
      "civil-inheritance-second-order-half-sister-grandfather-choice",
      "civil-inheritance-will-printed-last-page-only-choice",
    ],
    subjectiveIds: [
      "civil-inheritance-living-owner-no-opening-written",
      "civil-inheritance-first-order-excludes-brother-written",
      "civil-inheritance-will-handwritten-no-notary-written",
      "civil-inheritance-transfer-spouse-after-heir-death-written",
    ],
  },
  {
    id: "tort",
    title: "侵权责任",
    description: "在不同侵权场景中判断责任及范围。",
    objectiveIds: [
      "civil-tort-instigation-choice",
      "civil-tort-special-guardian-shop-choice",
      "civil-tort-special-worker-delivery-choice",
      "civil-tort-special-animal-leashed-choice",
      "civil-education-product-school-young-child-choice",
      "civil-education-product-product-kettle-fire-choice",
      "civil-education-product-product-danger-before-injury-choice",
      "civil-traffic-medical-borrow-normal-choice",
    ],
    subjectiveIds: [
      "civil-tort-special-guardian-shop-written",
      "civil-tort-special-worker-delivery-written",
      "civil-tort-special-animal-leashed-written",
      "civil-education-product-school-young-child-written",
    ],
  },
  {
    id: "mixed",
    title: "民法混合",
    description: "把不同编的案情放在一起，先辨认本题要解决的问题。",
    objectiveIds: [
      "civil-agency-authorized-purchase",
      "civil-movable-delivered-unpaid-choice",
      "civil-contract-invitation",
      "civil-personality-name-false-endorsement-choice",
      "civil-family-bigamy-prior-divorce-choice",
      "civil-inheritance-living-owner-no-opening-choice",
      "civil-tort-instigation-choice",
      "civil-validity-voluntary-regret",
    ],
    subjectiveIds: [
      "civil-foundation-property-unregistered-explain",
      "civil-obligation-subrogation-goods-explain",
      "civil-family-bigamy-prior-divorce-written",
      "civil-tort-special-guardian-shop-written",
    ],
  },
];

export const civilIntegratedPracticePapers: AssessmentPaper[] =
  civilIntegratedScopes.flatMap((scope) =>
    (["objective", "subjective"] as const).map((mode) => ({
      id: "civil-integrated-" + scope.id + "-" + mode,
      revision: civilIntegratedPracticeRevision,
      kind: "practice",
      subject: "civil-law",
      scopeId: scope.id,
      mode,
      title:
        scope.title + (mode === "objective" ? " · 选择练习" : " · 书面分析"),
      minutes: null,
      questionIds: [
        ...scope[mode === "objective" ? "objectiveIds" : "subjectiveIds"],
      ],
    })),
  );

export const isCivilIntegratedPaper = (
  paper: AssessmentPaper | undefined,
): boolean => paper?.kind === "practice" && paper.subject === "civil-law";

export const assessmentRunHref = (
  runId: string,
  paper?: AssessmentPaper,
  question?: number,
) =>
  `/lab/assessment?${paper?.collection === "comprehensive-g7" ? "subject=all-subjects&" : isCivilIntegratedPaper(paper) ? "subject=civil-law&" : ""}run=${encodeURIComponent(runId)}${question === undefined ? "" : `&question=${question}`}`;
