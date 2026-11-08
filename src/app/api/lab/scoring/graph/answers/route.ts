import { allowScoringTrialRequest } from "@/evaluation/local-scoring-access";
import {
  answerWorkspaceRequest,
  saveOrLoadAnswer,
} from "@/evaluation/graph/answer-workspace";
export const runtime = "nodejs";
export async function POST(request: Request) {
  if (!allowScoringTrialRequest(request))
    return Response.json({ error: "仅限本机使用。" }, { status: 403 });
  const text = await request.text();
  if (text.length > 24000)
    return Response.json(
      { error: "答案过长，请控制在12000字以内。" },
      { status: 400 },
    );
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return Response.json({ error: "请求格式不正确。" }, { status: 400 });
  }
  const parsed = answerWorkspaceRequest.safeParse(raw);
  if (!parsed.success)
    return Response.json({ error: "答案或关联格式不正确。" }, { status: 400 });
  try {
    return Response.json(await saveOrLoadAnswer(parsed.data), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (e) {
    const reason = e instanceof Error ? e.message : "";
    if (reason === "immutable-answer-conflict")
      return Response.json(
        { error: "已保存的答案不可覆盖，请另存本次修改。" },
        { status: 409 },
      );
    if (reason === "answer-not-found")
      return Response.json(
        { error: "没有找到这份已保存的答案，浏览器草稿仍保留。" },
        { status: 404 },
      );
    if (reason.startsWith("invalid-draft"))
      return Response.json(
        { error: "小问或关联不正确，草稿仍保留。" },
        { status: 400 },
      );
    return Response.json(
      { error: "本机保存暂不可用，草稿仍保留，可重试保存。" },
      { status: 503 },
    );
  }
}
