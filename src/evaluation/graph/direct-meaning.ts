import { z } from "zod";
import { answerWindow } from "./answer-boundary";
import {
  choiceRequest,
  choiceSchema,
  choiceWire,
  CHOICE_PROMPT,
  type MeaningReading,
} from "./meaning-choice";
import { partition, available } from "./item-validation";
import { jsonProtocolReader, type JsonReaderOptions } from "./position-reader";
import type {
  RunInput,
  TaskGroup,
  ModelReceipt,
  CallOutcome,
} from "./contracts";
import type { ProviderConfig } from "../provider";

export const DIRECT_GRAPH_VERSION = "grading-graph-direct-meaning-v1";
const baseRow = choiceSchema.shape.readings.element;
const directRow = baseRow
  .extend({
    selections: z
      .array(baseRow.shape.selections.element.omit({ linkEvidenceIds: true }))
      .max(2),
  })
  .strict();
export const directSchema = choiceSchema
  .extend({ readings: z.array(directRow).max(12) })
  .strict();
// Preserve the existing meaning/state instructions. Citation context is now a
// single field, not a separate model-produced relationship graph prerequisite.
export const DIRECT_PROMPT = CHOICE_PROMPT.split("\n")
  .slice(0, 2)
  .concat(
    "按scopePolicy限定本问，附入的其他问不自动代表本问作答。每条选择引用足以支持整条含义的原答编号，包含必要的指代、条件、更正或引用语境；含义和采用范围拿不准时保留unclear。按Schema输出每个事项一次。",
  )
  .join("\n");
export function directRequest(run: RunInput, group: TaskGroup) {
  if (!run.answerBoundary)
    throw Error("direct-reading-requires-source-boundary");
  const window = answerWindow(run, group);
  if (window.blocked) throw Error("answer-assignment-required");
  const request = choiceRequest(run, group);
  const owners = new Map<string, string[]>();
  // Reuse exact nonblank source offsets; separator whitespace is not a new owner.
  for (const ref of window.references) {
    const ids = [...new Set(ref.sources.map((s) => s.questionId))];
    if (ids.length !== 1) throw Error("ambiguous-answer-source");
    owners.set(ids[0], [...(owners.get(ids[0]) ?? []), ref.id]);
  }
  return {
    ...request,
    answerScope: {
      ...request.answerScope,
      localEvidenceIds: owners.get(group.id) ?? [],
      context: [...owners]
        .filter(([id]) => id !== group.id)
        .map(([questionId, evidenceIds]) => ({ questionId, evidenceIds })),
      unassignedEvidenceIds: [],
    },
  };
}
export type DirectRequest = ReturnType<typeof directRequest>;
export type DirectReader = (
  request: DirectRequest,
  signal: AbortSignal,
) => Promise<ModelReceipt>;
export function validateDirectItems(
  request: DirectRequest,
  outcome: CallOutcome,
) {
  if (!available(outcome) || outcome.status !== "completed")
    return {
      items: [] as MeaningReading[],
      validation: {
        blocked: true,
        acceptedIds: [],
        issues: [{ id: null, code: "unusable-receipt" }],
      },
    };
  const source = new Set(request.answerSegments.map((s) => s.id));
  const owned = new Set([
    ...request.answerScope.localEvidenceIds,
    ...request.answerScope.context.flatMap((c) => c.evidenceIds),
  ]);
  return partition(
    outcome.receipt.raw,
    "readings",
    request.topics.map((t) => t.id),
    { taskId: request.task.id, maxBytes: 12000, maxItems: 12 },
    (id, raw): MeaningReading => {
      const row = directRow.parse(raw);
      if (
        (row.state === "not_stated" && row.selections.length) ||
        (["stated", "conditional"].includes(row.state) &&
          !row.selections.length)
      )
        throw Error("invalid-meaning-state");
      const options = request.topics
        .find((t) => t.id === id)!
        .alternatives.map((a) => a.id);
      if (
        new Set(row.selections.map((s) => s.meaningId)).size !==
          row.selections.length ||
        row.selections.some((s) => !options.includes(s.meaningId))
      )
        throw Error("invalid-meaning-selection");
      for (const selection of row.selections) {
        if (
          new Set(selection.evidenceIds).size !==
            selection.evidenceIds.length ||
          selection.evidenceIds.some((id) => !source.has(id) || !owned.has(id))
        )
          throw Error("invalid-stance-citation");
      }
      // Empty compatibility field: no fabricated bridges, inferred adoption or
      // relaxed replay of old invalid receipts. Only this new protocol uses it.
      return {
        ...row,
        selections: row.selections.map((s) => ({ ...s, linkEvidenceIds: [] })),
      };
    },
  );
}
export function directWire(request: DirectRequest, config: ProviderConfig) {
  const base = choiceWire(request, config);
  return {
    ...base,
    messages: [
      {
        role: "system",
        content:
          DIRECT_PROMPT +
          "\n输出 JSON Schema：\n" +
          JSON.stringify(z.toJSONSchema(directSchema)),
      },
      { role: "user", content: JSON.stringify(request) },
    ],
  };
}
export function directReader(options: JsonReaderOptions): DirectReader {
  return jsonProtocolReader(options, {
    wire: directWire,
    validate: (request, raw) => {
      const result = validateDirectItems(request, {
        status: "completed",
        reused: false,
        receipt: {
          raw,
          source: "fixture",
          durationMs: 0,
          cost: null,
          currency: null,
        },
      });
      if (result.validation.blocked || result.validation.issues.length)
        throw Error("invalid-direct-meaning-response");
      return result.items;
    },
  });
}
