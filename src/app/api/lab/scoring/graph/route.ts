import { allowScoringTrialRequest } from "@/evaluation/local-scoring-access";
import { demoRequestSchema, runGraphDemo } from "@/evaluation/graph/service";
export const runtime = "nodejs";
export async function POST(request: Request) {
  if (!allowScoringTrialRequest(request))
    return Response.json({ error: "仅限本机工程演示。" }, { status: 403 });
  const text = await request.text();
  if (text.length > 2000)
    return Response.json({ error: "请求过长。" }, { status: 400 });
  let input: unknown;
  try {
    input = JSON.parse(text);
  } catch {
    return Response.json({ error: "请求格式不正确。" }, { status: 400 });
  }
  const parsed = demoRequestSchema.safeParse(input);
  if (!parsed.success)
    return Response.json({ error: "请求参数不正确。" }, { status: 400 });
  try {
    return Response.json(await runGraphDemo(parsed.data), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return Response.json(
      { error: "运行暂不可用。请确认本机数据库已启动；已有运行不要重复创建。" },
      { status: 503 },
    );
  }
}
