import { allowScoringTrialRequest } from "./local-scoring-access";
import { tableRequest } from "./table-trial/contract";
import {
  evaluateTableDaily,
  type TableDailyOptions,
} from "./table-daily-service";

export function createLocalTableDailyHandler(
  options: TableDailyOptions = { repo: process.cwd() },
) {
  return async (request: Request) => {
    const headers = { "Cache-Control": "no-store" };
    if (!allowScoringTrialRequest(request))
      return Response.json(
        { error: "仅限本机使用。" },
        { status: 403, headers },
      );
    let raw: unknown;
    try {
      const body = await request.text();
      if (body.length > 90000) throw Error();
      raw = tableRequest.parse(JSON.parse(body));
    } catch {
      return Response.json(
        { error: "请检查答案，每问最多5000字，整份最多12000字。" },
        { status: 400, headers },
      );
    }
    try {
      return Response.json(
        await evaluateTableDaily(raw, { ...options, signal: request.signal }),
        { headers },
      );
    } catch {
      return Response.json(
        { error: "暂未取得结果，草稿仍保留。请查看保存结果，勿重复提交。" },
        { status: 503, headers },
      );
    }
  };
}
