import { allowScoringTrialRequest } from "./local-scoring-access";
import { unitFeedbackRequestSchema } from "./unit-feedback-contract";
import {
  evaluateUnitFeedback,
  type UnitFeedbackDependencies,
} from "./unit-feedback-submission";

/** Dependencies are server-owned only. The deployed route calls this with no executor. */
export function createUnitFeedbackHandler(
  dependencies: UnitFeedbackDependencies = {},
) {
  return async (request: Request) => {
    const headers = { "Cache-Control": "no-store" };
    if (!allowScoringTrialRequest(request))
      return Response.json(
        { error: "仅限本机使用。" },
        { status: 403, headers },
      );
    let input: unknown;
    try {
      const body = await request.text();
      if (body.length > 36000) throw Error();
      input = unitFeedbackRequestSchema.parse(JSON.parse(body));
    } catch {
      return Response.json(
        { error: "请检查题目版本、原答与主动提交确认。" },
        { status: 400, headers },
      );
    }
    try {
      return Response.json(await evaluateUnitFeedback(input, dependencies), {
        headers,
      });
    } catch {
      return Response.json(
        { error: "暂时无法核实反馈回执，原答仍保留；不自动重发。" },
        { status: 503, headers },
      );
    }
  };
}
