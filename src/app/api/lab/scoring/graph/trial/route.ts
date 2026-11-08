import { allowScoringTrialRequest } from "../../../../../../evaluation/local-scoring-access";
import { localTrialRequestSchema } from "../../../../../../evaluation/graph/local-trial-contract";
import { evaluateLocalTrial } from "../../../../../../evaluation/graph/local-trial";
export const runtime = "nodejs";
export async function POST(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  if (!allowScoringTrialRequest(request))
    return Response.json({ error: "仅限本机使用。" }, { status: 403, headers });
  let raw: unknown;
  try {
    const text = await request.text();
    if (text.length > 30000) throw Error();
    raw = localTrialRequestSchema.parse(JSON.parse(text));
  } catch {
    return Response.json(
      { error: "请检查答案格式，每问最多5000字，整份最多12000字。" },
      { status: 400, headers },
    );
  }
  try {
    return Response.json(
      await evaluateLocalTrial(raw, { repo: process.cwd() }),
      { headers },
    );
  } catch {
    return Response.json(
      { error: "暂未取得结果，草稿仍保留。请查看已保存结果，勿重复提交。" },
      { status: 503, headers },
    );
  }
}
