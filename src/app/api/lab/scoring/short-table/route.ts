import { allowScoringTrialRequest } from "@/evaluation/local-scoring-access";
import { shortRequest } from "@/evaluation/short-table/contract";
import { evaluateShortTable } from "@/evaluation/short-table/service";
export const runtime = "nodejs";
export async function POST(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  if (!allowScoringTrialRequest(request))
    return Response.json({ error: "仅限本机使用。" }, { status: 403, headers });
  let raw: unknown;
  try {
    const body = await request.text();
    if (body.length > 30000) throw Error();
    raw = shortRequest.parse(JSON.parse(body));
  } catch {
    return Response.json(
      { error: "请检查题目版本和原答，单题评阅最多5000字。" },
      { status: 400, headers },
    );
  }
  try {
    return Response.json(
      await evaluateShortTable(raw, { repo: process.cwd() }),
      { headers },
    );
  } catch {
    return Response.json(
      { error: "暂未取得结果，原答仍保留。请读取保存结果，勿重复提交。" },
      { status: 503, headers },
    );
  }
}
