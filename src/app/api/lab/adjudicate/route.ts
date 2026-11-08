import { allowScoringTrialRequest } from "@/evaluation/local-scoring-access";
import {
  adjudicationRequest,
  type AdjudicationRequest,
  type QueueItem,
} from "@/evaluation/adjudication/contract";
import { buildQueue } from "@/evaluation/adjudication/queue";
import { upsertRow } from "@/evaluation/adjudication/store";
export const runtime = "nodejs";
export async function POST(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  if (!allowScoringTrialRequest(request))
    return Response.json({ error: "仅限本机使用。" }, { status: 403, headers });
  let req: AdjudicationRequest;
  try {
    req = adjudicationRequest.parse(JSON.parse(await request.text()));
  } catch {
    return Response.json(
      { error: "请求格式不正确。" },
      { status: 400, headers },
    );
  }
  try {
    const repo = process.cwd();
    const queue = await buildQueue(repo);
    const review = queue.find((r) => r.reviewId === req.reviewId);
    if (!review)
      return Response.json(
        { error: "这份评阅不在待裁决队列中。" },
        { status: 404, headers },
      );
    const targets: { item: QueueItem; label: QueueItem["modelLabel"] }[] =
      req.action === "agree-all"
        ? review.open.map((item) => ({ item, label: item.modelLabel }))
        : (() => {
            const item = review.open.find(
              (i) => i.criterionId === req.criterionId,
            );
            return item ? [{ item, label: req.label }] : [];
          })();
    if (!targets.length)
      return Response.json(
        { error: "该条目已裁决或不在队列中。" },
        { status: 404, headers },
      );
    const rows = await Promise.all(
      targets.map((t) => upsertRow(repo, t.item, t.label)),
    );
    return Response.json({ saved: rows.length }, { headers });
  } catch {
    return Response.json(
      { error: "暂未保存裁决，请重试。" },
      { status: 503, headers },
    );
  }
}
