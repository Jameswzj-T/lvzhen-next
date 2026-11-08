import { createHash } from "node:crypto";
import type { EvaluationInput } from "./index";
import type { CriterionFindings } from "./criterion-findings";
import { READING_INSTRUCTIONS, resolveReadings } from "./answer-readings";

type Claim = {
  id: string;
  kind: "conclusion" | "basis";
  statement: string;
  expected: "affirmed" | "denied";
};
type Point = { criterionId: string; claims: Claim[] };
const claim = (
  id: string,
  kind: Claim["kind"],
  statement: string,
  expected: Claim["expected"] = "affirmed",
): Claim => ({ id, kind, statement, expected });
// Positive and negative propositions both occur. Expected stance stays in code;
// the reader sees no reference answer, point weights or desired legal verdict.
const cards: Record<string, Point[]> = {
  "cl05-review-separated": [
    {
      criterionId: "first_conclusion",
      claims: [
        claim("d1", "conclusion", "甲首段夺刀推倒乙的行为可以按特殊防卫处理。"),
      ],
    },
    {
      criterionId: "first_reason",
      claims: [
        claim("d2", "basis", "乙持刀刺向甲胸口的攻击当时仍在进行。"),
        claim("d3", "basis", "这次持刀攻击对甲的人身安全具有严重危险。"),
      ],
    },
    {
      criterionId: "second_conclusion",
      claims: [
        claim(
          "d4",
          "conclusion",
          "甲后段刺伤乙的行为也可以沿用首段的特殊防卫根据免责。",
          "denied",
        ),
      ],
    },
    {
      criterionId: "second_reason",
      claims: [
        claim("d5", "basis", "后段时乙的刀已被夺走，或身体已受控制。"),
        claim("d6", "basis", "后段时乙的不法侵害仍在进行。", "denied"),
      ],
    },
  ],
  "cl10-review-self-report": [
    {
      criterionId: "theft_conclusion",
      claims: [
        claim("s1", "conclusion", "甲的本次盗窃供述构成一般自首。", "denied"),
      ],
    },
    {
      criterionId: "theft_reason",
      claims: [
        claim("s2", "basis", "甲是自行投案的。", "denied"),
        claim("s3", "basis", "甲如实供述的这次盗窃，是警方此前已掌握的罪行。"),
      ],
    },
    {
      criterionId: "injury_conclusion",
      claims: [
        claim("s4", "conclusion", "甲另一起故意伤害的供述可以以自首论。"),
      ],
    },
    {
      criterionId: "injury_reason",
      claims: [
        claim("s5", "basis", "甲如实供述了本人另一起故意伤害。"),
        claim("s6", "basis", "警方此前已掌握甲的这起故意伤害。", "denied"),
        claim(
          "s7",
          "basis",
          "这起故意伤害与已掌握的盗窃属于同种罪行。",
          "denied",
        ),
      ],
    },
  ],
  "cl03-age-thirteen": [
    {
      criterionId: "conclusion",
      claims: [
        claim(
          "a1",
          "conclusion",
          "仅凭甲十三周岁和本案死亡结果，已经足以认定甲应负刑事责任。",
          "denied",
        ),
      ],
    },
    {
      criterionId: "offense",
      claims: [
        claim(
          "a2",
          "basis",
          "本案持刀连续刺击胸腹致死，应按故意杀人或故意伤害致死的限定犯罪范围核对。",
        ),
      ],
    },
    {
      criterionId: "circumstances",
      claims: [
        claim("a3", "basis", "情节恶劣是需要独立满足的追责条件。"),
        claim("a4", "basis", "本案材料已足以确认情节恶劣。", "denied"),
      ],
    },
    {
      criterionId: "approval",
      claims: [
        claim("a5", "basis", "本案追责需要最高人民检察院核准追诉。"),
        claim("a6", "basis", "本案已完成该核准追诉程序。", "denied"),
      ],
    },
  ],
};
const hash = (data: unknown) =>
  createHash("sha256").update(JSON.stringify(data)).digest("hex");
export function prepareBankReading(input: EvaluationInput) {
  const points = cards[input.caseId];
  if (
    !points ||
    points.length !== input.criteria.length ||
    points.some((p, i) => p.criterionId !== input.criteria[i].id)
  )
    throw new Error("reading-card-mismatch");
  const claims = points.flatMap((p) => p.claims);
  if (new Set(claims.map((c) => c.id)).size !== claims.length)
    throw new Error("duplicate-reading-claim");
  const readingInput: EvaluationInput = {
    ...input,
    // ruleBasis is an internal transport slot for the authored role; readingInput
    // sends it as kind, never as a legal rule or a correctness expectation.
    criteria: claims.map((c) => ({
      id: c.id,
      description: c.statement,
      ruleBasis: c.kind,
    })),
  };
  const snapshot = {
    version: "bank-expressed-propositions-v1",
    input: readingInput,
    points,
    instructions: READING_INSTRUCTIONS,
  };
  return { readingId: hash(snapshot), ...snapshot };
}
export type BankReadingTask = ReturnType<typeof prepareBankReading>;
export function findingsFromReading(
  task: BankReadingTask,
  raw: unknown,
): CriterionFindings {
  const readings = resolveReadings(task.input, raw).observations;
  const byId = new Map(readings.criteria.map((p) => [p.id, p]));
  return {
    criteria: task.points.map((point) => {
      const rows = point.claims.map((claim) => ({
        claim,
        read: byId.get(claim.id)!,
      }));
      const states = rows.map((r) => r.read.stance);
      const finding = states.includes("mixed")
        ? "conflicting"
        : states.includes("unclear")
          ? "uncertain"
          : rows.some(
                (r) =>
                  r.read.stance !== "not_stated" &&
                  r.read.stance !== r.claim.expected,
              )
            ? "incorrect"
            : states.every((s) => s === "not_stated")
              ? "absent"
              : states.includes("not_stated")
                ? "incomplete"
                : "satisfied";
      return {
        id: point.criterionId,
        finding,
        evidenceIds: [...new Set(rows.flatMap((r) => r.read.evidenceIds))],
        reason:
          "由本项原答立场与固定要求逐项比较生成；是否正确理解原答仍需语义核验。",
      };
    }),
  };
}
