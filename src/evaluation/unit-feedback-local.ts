import { allowScoringTrialRequest } from "./local-scoring-access";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { createUnitFeedbackHandler } from "./unit-feedback-handler";
import {
  createUnitFeedbackTrialProvider,
  unitActiveTrialGrantSchema,
} from "./unit-feedback-provider";
import { unitFeedbackBinding } from "./unit-feedback-catalog";
import type { UnitTrialAvailability } from "./unit-feedback-contract";
import { unitDirectPolicySchema } from "./unit-feedback-direct-policy";

export const awaitingUnitTrial: UnitTrialAvailability = {
  version: "unit-feedback-local-trial-v1",
  grantId: null,
  purpose: "practice",
  provider: "deepseek",
  model: "deepseek-flash",
  exerciseIds: [],
  validUntil: null,
  maxCalls: null,
  callsUsed: 0,
  remainingCalls: 0,
  budgetCNY: null,
  spentCNY: null,
  remainingCNY: null,
  state: "awaiting_authorization",
  canActivate: false,
  notice:
    "新答试用尚未启用。须先登记本次题目范围、预算和有效期限，再由你主动启用；现在只保存原答，不发送到模型。",
};

/** Only a separately authorized local file can supply a grant. HTTP/env cannot create or widen it. */
export function createLocalUnitFeedbackHandler(
  repo = process.cwd(),
  options: {
    credentialRepo?: string;
    transport?: Parameters<
      typeof createUnitFeedbackTrialProvider
    >[0]["transport"];
    readCredential?: Parameters<
      typeof createUnitFeedbackTrialProvider
    >[0]["readCredential"];
  } = {},
) {
  return async (request: Request) => {
    if (!allowScoringTrialRequest(request))
      return Response.json({ error: "仅限本机使用。" }, { status: 403 });
    try {
      // Product configuration takes precedence. Failure never falls back to an expired trial.
      let directBytes: string | null = null;
      try {
        directBytes = await readFile(
          join(repo, "artifacts", "unit-feedback-service", "config.json"),
          "utf8",
        );
      } catch (e) {
        if ((e as NodeJS.ErrnoException).code !== "ENOENT") throw e;
      }
      if (directBytes !== null) {
        if (Buffer.byteLength(directBytes) > 64000)
          throw Error("direct-service-config-size");
        const policy = unitDirectPolicySchema.parse(JSON.parse(directBytes));
        return createUnitFeedbackHandler({
          repo,
          realTrialProvider: createUnitFeedbackTrialProvider({
            grant: policy,
            root: join(repo, "artifacts", "unit-feedback-service", policy.id),
            credentialRepo: options.credentialRepo ?? repo,
            transport: options.transport,
            readCredential: options.readCredential,
          }),
        })(request);
      }
      let bytes: string;
      try {
        bytes = await readFile(
          join(repo, "artifacts", "unit-feedback-trial", "grant.json"),
          "utf8",
        );
      } catch (e) {
        if ((e as NodeJS.ErrnoException).code === "ENOENT")
          return createUnitFeedbackHandler({
            repo,
            unavailableTrial: awaitingUnitTrial,
          })(request);
        throw e;
      }
      if (Buffer.byteLength(bytes) > 64000) throw Error("unit-grant-size");
      const grant = unitActiveTrialGrantSchema.parse(JSON.parse(bytes));
      if (
        grant.exerciseBindings.some(
          (b) => unitFeedbackBinding(b.questionId)?.contentId !== b.contentId,
        )
      )
        throw Error("unit-grant-public-binding-drift");
      return createUnitFeedbackHandler({
        repo,
        realTrialProvider: createUnitFeedbackTrialProvider({
          grant,
          root: join(repo, "artifacts", "unit-feedback-trial", grant.id),
          credentialRepo: options.credentialRepo ?? repo,
        }),
      })(request);
    } catch {
      return Response.json(
        { error: "暂时无法完成评阅，原答仍保留；不会自动重复发送。" },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      );
    }
  };
}
