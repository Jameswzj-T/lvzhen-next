"use client";
import { useState } from "react";
import type { QueueReview } from "@/evaluation/adjudication/contract";
import s from "./adjudicate.module.css";

const LABELS = ["是", "否", "待核对"] as const;

export function QueueView({ initial }: { initial: QueueReview[] }) {
  const [queue, setQueue] = useState(initial);
  const [saved, setSaved] = useState(0);
  const [busy, setBusy] = useState<string | null>(null);
  async function send(
    reviewId: string,
    body: Record<string, unknown>,
    remove: (r: QueueReview) => QueueReview | null,
  ) {
    const key = `${reviewId}:${body.criterionId ?? "all"}`;
    if (busy) return;
    setBusy(key);
    try {
      const response = await fetch("/api/lab/adjudicate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Lvzhen-Scoring": "1",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw Error();
      const reply = (await response.json()) as { saved?: number };
      setSaved((n) => n + (reply.saved ?? 0));
      setQueue((q) =>
        q
          .map((r) => (r.reviewId === reviewId ? remove(r) : r))
          .filter((r): r is QueueReview => r !== null && r.open.length > 0),
      );
    } catch {
      window.alert("裁决暂未保存，请重试。");
    } finally {
      setBusy(null);
    }
  }
  const openCount = queue.reduce((n, r) => n + r.open.length, 0);
  return (
    <main className={s.page}>
      <h1>待裁决队列</h1>
      <p className={s.intro}>
        这里只列值得你裁决的判断：合成卷中与冻结预期不一致、或被引用校验暂缓的项；真人原答的每一项（尺度只有你能确认）。
        点一下即入库一条语料（原答引文、采分点、模型判断、你的裁决），存于本机
        artifacts/adjudication-corpus，不上传、不入 Git。已入库 {saved} 条。
      </p>
      {!openCount && (
        <p className={s.empty}>
          队列是空的。新的评阅或新的分歧出现后会列在这里。
        </p>
      )}
      {queue.map((review) => (
        <section className={s.review} key={review.reviewId}>
          <div className={s.reviewHead}>
            <h2>{review.title}</h2>
            <small>
              {review.kind === "frozen-sample" ? "合成卷" : "真人原答"} ·{" "}
              {new Date(review.createdAt).toLocaleString("zh-CN")} ·{" "}
              {review.total ?? "待核对"}/{review.maximum} 分 · 待裁决{" "}
              {review.open.length} 项
            </small>
            <button
              className={s.bulk}
              data-primary="true"
              disabled={!!busy}
              onClick={() =>
                send(
                  review.reviewId,
                  { action: "agree-all", reviewId: review.reviewId },
                  () => null,
                )
              }
            >
              本卷全部同意模型
            </button>
          </div>
          {review.open.map((item) => (
            <article className={s.item} key={item.criterionId}>
              <div className={s.itemHead}>
                <strong>
                  第{item.questionId}问 · {item.criterionId}
                </strong>
                <span className={s.badge}>模型：{item.modelLabel}</span>
                {item.reviewStatus !== "ready" && (
                  <span className={s.badge} data-held="true">
                    被暂缓
                  </span>
                )}
                {item.frozenExpected &&
                  item.frozenExpected !== item.modelLabel && (
                    <span className={s.badge} data-conflict="true">
                      冻结预期：{item.frozenExpected}
                    </span>
                  )}
              </div>
              <p className={s.requirement}>{item.requirement}</p>
              {item.quotes.map((q, i) => (
                <p className={s.quote} key={i}>
                  {q}
                </p>
              ))}
              {!item.quotes.length && (
                <p className={s.quote}>（模型未给出本问引文）</p>
              )}
              <p className={s.reason}>{item.modelReason}</p>
              <div className={s.actions}>
                <button
                  data-primary="true"
                  disabled={!!busy}
                  onClick={() =>
                    send(
                      review.reviewId,
                      {
                        action: "adjudicate",
                        reviewId: review.reviewId,
                        criterionId: item.criterionId,
                        label: item.modelLabel,
                      },
                      (r) => ({
                        ...r,
                        open: r.open.filter(
                          (i) => i.criterionId !== item.criterionId,
                        ),
                      }),
                    )
                  }
                >
                  同意模型
                </button>
                {LABELS.filter((l) => l !== item.modelLabel).map((l) => (
                  <button
                    key={l}
                    disabled={!!busy}
                    onClick={() =>
                      send(
                        review.reviewId,
                        {
                          action: "adjudicate",
                          reviewId: review.reviewId,
                          criterionId: item.criterionId,
                          label: l,
                        },
                        (r) => ({
                          ...r,
                          open: r.open.filter(
                            (i) => i.criterionId !== item.criterionId,
                          ),
                        }),
                      )
                    }
                  >
                    改判为{l}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </section>
      ))}
    </main>
  );
}
