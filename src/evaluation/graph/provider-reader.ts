import { REASONS_ONLY_INSTRUCTION } from "./structured-stance";
import {
  QUESTION_LOCAL_POLICY,
  QUESTION_LOCAL_READING_INSTRUCTION,
} from "./question-local";
import { SCOPED_HINT_INSTRUCTION } from "./task-scopes";
import {
  runChatCompletion,
  type ProviderConfig,
  type Transport,
  type PriceConfig,
} from "../provider";
import { findingsSchema } from "../criterion-findings";
import { digest } from "../model-config";
import type { ModelReader } from "./contracts";
import { HINT_INSTRUCTION } from "./position";

// Credentials remain inside a server closure, never graph State or checkpoints.
// Calling this factory does NOT authorize an external request. The owner must
// supply its checked batch grant, price window, endpoint policy and total budget.
export function providerReader(options: {
  config: ProviderConfig;
  transport: Transport;
  price: PriceConfig;
  credential: () => Promise<string>;
  authorize: () => Promise<void>;
}): { identity: string; reader: ModelReader } {
  const config: ProviderConfig = {
    ...options.config,
    evidenceMode: "segment_ids",
    identityMode: "harness",
    promptVariant: "findings-label-first-v1",
  };
  return {
    identity: digest(config),
    reader: async (request, signal) => {
      if (
        request.reasonContext &&
        (!request.reasonOnly || request.reasonContext !== "answer-rubric-v1")
      )
        throw new Error("invalid-reason-context");
      await options.authorize();
      const response = await runChatCompletion(request.input, config, {
        transport:
          request.positionHints || request.reasonOnly || request.answerScope
            ? {
                source: options.transport.source,
                send: async (outgoing) => {
                  const body = JSON.parse(outgoing.body);
                  body.messages[0].content +=
                    "\n" +
                    (request.reasonOnly
                      ? REASONS_ONLY_INSTRUCTION
                      : request.answerScope
                        ? QUESTION_LOCAL_READING_INSTRUCTION
                        : request.taskScope
                          ? SCOPED_HINT_INSTRUCTION
                          : HINT_INSTRUCTION);
                  const content = JSON.parse(body.messages[1].content);
                  // Cross-question diagnostics remain on the graph result branch,
                  // not in the second node's hints. The complete original is still
                  // visible, so this does not prove semantic independence.
                  if (request.positionHints) {
                    const { crossQuestionNotes: ignoredNotes, ...localHints } =
                      "crossQuestionNotes" in request.positionHints!
                        ? request.positionHints!
                        : {
                            ...request.positionHints!,
                            crossQuestionNotes: undefined,
                          };
                    void ignoredNotes;
                    content.unverifiedPositionHints = localHints;
                  }
                  if (request.answerScope) {
                    content.scopePolicy = QUESTION_LOCAL_POLICY;
                    content.answerScope = request.answerScope;
                  }
                  if (request.taskScope) {
                    content.task = request.taskScope;
                    content.criteria = content.criteria.map(
                      (criterion: { id: string }) => {
                        const contract = request.criterionContracts?.find(
                          (c) => c.id === criterion.id,
                        );
                        return {
                          ...criterion,
                          ...(contract
                            ? {
                                description: contract.requiredContent,
                                disallowedClaims: contract.disallowedClaims,
                              }
                            : {}),
                          targetId: request.taskScope!.targets.find((t) =>
                            t.criterionIds.includes(criterion.id),
                          )!.id,
                        };
                      },
                    );
                  }
                  // The graph keeps the case snapshot for provenance; this reason
                  // node's provider payload intentionally omits the case narrative.
                  // Rubric/legal requirements are still supplied, so this cannot
                  // by itself prevent the model from inferring unwritten reasons.
                  if (request.reasonContext === "answer-rubric-v1")
                    delete content.facts;
                  body.messages[1].content = JSON.stringify(content);
                  return options.transport.send({
                    ...outgoing,
                    body: JSON.stringify(body),
                  });
                },
              }
            : options.transport,
        credential: await options.credential(),
        allowRealCall: true,
        signal,
        price: options.price,
        criterionPolicy: request.policy,
        captureFinalOutput: true,
      });
      // Preserve a received but invalid output as a validation failure in graph.
      // Network failures remain unknown; they cannot silently become zero marks.
      let raw: unknown = response.finalOutput?.text ?? null;
      try {
        if (response.finalOutput?.text)
          raw = JSON.parse(response.finalOutput.text);
      } catch {
        /* Keep received invalid output and known cost. */
      }
      const parsed = findingsSchema.safeParse(raw);
      return {
        raw: parsed.success ? parsed.data : raw,
        source:
          options.transport.source === "real_provider" ? "model" : "fixture",
        durationMs: response.measurement.durationMs,
        cost: response.measurement.cost,
        currency: response.measurement.currency,
        measurement: {
          requestedModel: response.measurement.requestedModel,
          model: response.measurement.model,
          responseId: response.measurement.responseId,
          startedAt: response.measurement.startedAt,
          endedAt: response.measurement.endedAt,
          callCount: response.measurement.callCount,
          inputTokens: response.measurement.inputTokens,
          outputTokens: response.measurement.outputTokens,
          cacheHitTokens: response.measurement.cacheHitTokens,
        },
        ...(response.failure ? { providerFailure: response.failure } : {}),
      };
    },
  };
}
