// Offline candidate for two newly authored fictional answers. No transport,
// learner-answer parameter, score, learning-state write or HTTP entry point.
import materialJson from "../../content/scoring-cards-short/police-boundary-v1.json";
import inputsJson from "../../content/scoring-cards-short/police-synthetic-inputs-v1.json";
import { exerciseFor, exerciseRevision } from "../../content/fault-catalog";
import { digest } from "../model-config";
import {
  COVERAGE_VERSION,
  type CoverageCard,
  type CoverageSource,
} from "./contract";
import {
  assessCoverage,
  assertCoverageWire,
  coverageRequest,
} from "./protocol";

export const POLICE_COVERAGE_VERSION = "police-boundary-coverage-v1";
export const POLICE_COVERAGE_ID = "cl17-police-pull-away-v2";
export const POLICE_SYNTHETIC_IDS = ["PB01", "PB02"] as const;
export type PoliceCoverageMaterial = {
  version: string;
  protocolVersion: string;
  card: CoverageCard;
  sources: CoverageSource[];
};
export type PoliceSyntheticInputs = {
  version: string;
  origin: string;
  samples: {
    id: string;
    exerciseId: string;
    exerciseRevision: string;
    answer: string;
  }[];
};
export const policeCoverageMaterial: PoliceCoverageMaterial = materialJson;
export const policeSyntheticInputs: PoliceSyntheticInputs = inputsJson;

export function validatePoliceCoverageCandidate(
  material: PoliceCoverageMaterial = policeCoverageMaterial,
  inputs: PoliceSyntheticInputs = policeSyntheticInputs,
) {
  const q = exerciseFor(POLICE_COVERAGE_ID);
  const { card, sources } = material;
  if (
    material.version !== POLICE_COVERAGE_VERSION ||
    material.protocolVersion !== COVERAGE_VERSION ||
    card.id !== POLICE_COVERAGE_ID ||
    !q ||
    q.kind !== "subjective" ||
    q.criteria?.length !== 2 ||
    card.exerciseRevision !== exerciseRevision(POLICE_COVERAGE_ID) ||
    card.facts !== q.facts ||
    card.prompt !== q.prompt ||
    card.criteria.length !== 2
  )
    throw Error("police-coverage-question-drift");
  if (
    card.criteria.some(
      (c, i) =>
        c.id !== `1-${i + 1}` ||
        c.originalId !== q.criteria![i].id ||
        c.title !== q.criteria![i].label ||
        c.requirement !== q.criteria![i].meaning ||
        c.boundary !== q.criteria![i].boundary ||
        c.manualHold !== undefined ||
        Object.hasOwn(c, "points") ||
        Object.hasOwn(c, "weight"),
    )
  )
    throw Error("police-coverage-criterion-drift");
  if (
    card.sourceIds.length !== 1 ||
    card.sourceIds[0] !== "police2025-art1" ||
    sources.length !== 1 ||
    sources[0].id !== card.sourceIds[0] ||
    sources[0].url !==
      "https://www.court.gov.cn/shenpan/xiangqing/452851.html" ||
    !sources[0].text.trim() ||
    !Number.isFinite(Date.parse(sources[0].checkedAt))
  )
    throw Error("police-coverage-source-drift");
  const publicText = JSON.stringify(sources).replace(/\s/g, "");
  if (
    publicText.includes(q.reference.replace(/\s/g, "")) ||
    publicText.includes(q.facts.replace(/\s/g, "")) ||
    Object.hasOwn(card, "reference") ||
    Object.hasOwn(material, "expected") ||
    Object.hasOwn(material, "gold")
  )
    throw Error("police-coverage-reference-leak");
  if (
    inputs.version !== POLICE_COVERAGE_VERSION ||
    inputs.origin !== "newly_authored_fiction_not_learner_records" ||
    inputs.samples.length !== 2 ||
    new Set(inputs.samples.map((s) => s.id)).size !== 2 ||
    inputs.samples.some(
      (s) =>
        !POLICE_SYNTHETIC_IDS.includes(
          s.id as (typeof POLICE_SYNTHETIC_IDS)[number],
        ) ||
        s.exerciseId !== card.id ||
        s.exerciseRevision !== card.exerciseRevision ||
        !s.answer.trim() ||
        s.answer.length > 5000 ||
        Object.hasOwn(s, "expected") ||
        Object.hasOwn(s, "reference"),
    )
  )
    throw Error("police-coverage-synthetic-scope-drift");
}

// Preparation does not authorize sending; existing stops remain in force.
export function preparePoliceCoverageCandidate(sampleId: string) {
  validatePoliceCoverageCandidate();
  const sample = policeSyntheticInputs.samples.find((s) => s.id === sampleId);
  if (!sample) throw Error("police-coverage-sample-not-allowlisted");
  const request = coverageRequest(
    policeCoverageMaterial.card,
    policeCoverageMaterial.sources,
    sample.answer,
  );
  assertCoverageWire(request);
  return {
    version: POLICE_COVERAGE_VERSION,
    sampleId: sample.id,
    exerciseId: sample.exerciseId,
    exerciseRevision: sample.exerciseRevision,
    answerIdentity: digest(sample.answer),
    requestIdentity: digest(request),
    transportAllowed: false as const,
    request,
  };
}

export function assessPoliceCoverageCandidate(
  sampleId: string,
  output: string,
  requestIdentity: string,
) {
  const prepared = preparePoliceCoverageCandidate(sampleId);
  if (requestIdentity !== prepared.requestIdentity)
    throw Error("police-coverage-response-binding-mismatch");
  const sample = policeSyntheticInputs.samples.find((s) => s.id === sampleId)!;
  return {
    version: POLICE_COVERAGE_VERSION,
    sampleId,
    requestIdentity,
    answerIdentity: prepared.answerIdentity,
    publication: "offline_candidate_requires_semantic_review" as const,
    assessment: assessCoverage(
      output,
      policeCoverageMaterial.card,
      sample.answer,
    ),
  };
}
