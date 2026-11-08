import { currentQuestionTeacherProtocol } from "./current-question-teacher-dispatch";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { z } from "zod";
import { allowScoringTrialRequest } from "./local-scoring-access";
import { createUnitFeedbackTrialProvider } from "./unit-feedback-provider";
import { unitDirectPolicySchema } from "./unit-feedback-direct-policy";
import { evaluateUnitFeedback } from "./unit-feedback-submission";
import { UNIT_RESULT_VERSION } from "./unit-feedback-contract";
import {
  prepareCurrentQuestionFeedback,
  verifyCurrentQuestionRequestBody,
} from "./registered-question-feedback-task";

import { registeredQuestionRequestSchema } from "./registered-question-feedback-contract";
export { registeredQuestionRequestSchema } from "./registered-question-feedback-contract";

/** Uses the exact same server configuration and cumulative ledger; no alternate activation path. */
export function createLocalRegisteredQuestionFeedbackHandler(
  repo = process.cwd(),
  options: Pick<
    Parameters<typeof createUnitFeedbackTrialProvider>[0],
    "transport" | "readCredential" | "readPricingPage"
  > = {},
) {
  return async (request: Request) => {
    const headers = { "Cache-Control": "no-store" };
    if (!allowScoringTrialRequest(request))
      return Response.json(
        { error: "仅限本机使用。" },
        { status: 403, headers },
      );
    let input: z.infer<typeof registeredQuestionRequestSchema>;
    try {
      const text = await request.text();
      if (text.length > 36000) throw Error();
      input = registeredQuestionRequestSchema.parse(JSON.parse(text));
    } catch {
      return Response.json(
        { error: "请检查本题原答与版本。" },
        { status: 400, headers },
      );
    }
    try {
      const prepared = prepareCurrentQuestionFeedback(
        input,
        input.action === "lookup" ? { readOnlyHistorical: true } : undefined,
      );
      let provider:
        ReturnType<typeof createUnitFeedbackTrialProvider> | undefined;
      try {
        const bytes = await readFile(
          join(repo, "artifacts/unit-feedback-service/config.json"),
          "utf8",
        );
        if (Buffer.byteLength(bytes) > 64000) throw Error("config-size");
        const policy = unitDirectPolicySchema.parse(JSON.parse(bytes));
        provider = createUnitFeedbackTrialProvider({
          grant: policy,
          root: join(repo, "artifacts/unit-feedback-service", policy.id),
          credentialRepo: repo,
          ...options,
          prepareDirectDispatch: (body) =>
            verifyCurrentQuestionRequestBody(body, input),
        });
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      }
      const reply = await evaluateUnitFeedback(
        {
          version: UNIT_RESULT_VERSION,
          action: input.action,
          exerciseId: input.exerciseId,
          exerciseRevision: input.exerciseRevision,
          attemptId: input.attemptId,
          answer: prepared.task.input.studentText,
          ...(input.action === "submit"
            ? {
                registrationVersion: prepared.registrationVersion,
                contentId: prepared.task.contentId,
                transmissionConsent: true,
              }
            : {}),
        },
        {
          repo,
          realTrialProvider: provider
            ? {
                ...provider,
                feedbackProtocol: currentQuestionTeacherProtocol(prepared.task),
              }
            : undefined,
          currentQuestion: prepared,
        },
      );
      return Response.json(
        {
          reply,
          binding: { contentId: prepared.task.contentId },
          original: {
            id: prepared.task.input.answerId,
            exerciseId: prepared.task.input.caseId,
            revision: prepared.task.input.caseRevision,
            answer: prepared.task.objective
              ? ""
              : prepared.task.input.studentText,
            choice: prepared.task.objective?.choice ?? "",
          },
        },
        { headers },
      );
    } catch {
      return Response.json(
        { error: "暂时无法完成本题评阅，原答保留；不会自动重复发送。" },
        { status: 503, headers },
      );
    }
  };
}
