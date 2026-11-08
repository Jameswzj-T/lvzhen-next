import { readFile } from "node:fs/promises";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  assessQuestionScopedTable,
  questionScopedPack,
} from "@/evaluation/question-scoped-table";
import { digest } from "@/evaluation/model-config";
import s from "./table.module.css";

const samples = [
  { id: "A", title: "网络诈骗", description: "你的原答" },
  { id: "B", title: "网络诈骗", description: "模拟错答" },
  { id: "C", title: "放火与骗赔", description: "模拟完整答卷" },
  { id: "D", title: "放火与骗赔", description: "模拟错答" },
];
const batch = "artifacts/deepseek-question-scoped-2026-09-29";

// Local saved-result preview only. A GET can never trigger a paid model call.
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const host = (await headers()).get("host");
  if (
    (process.env.LVZHEN_ENV ?? "local") !== "local" ||
    !["localhost:3107", "127.0.0.1:3107"].includes(host ?? "")
  )
    notFound();
  const params = await searchParams;
  const sample =
    samples.find((item) => item.id === params.sample) ?? samples[0];
  let saved;
  try {
    const [document, raw, record, manifestText] = await Promise.all([
      readFile(
        `evals/deepseek-order-transfer-2026-09-29/${sample.id}-input.md`,
        "utf8",
      ),
      readFile(`${batch}/${sample.id}-scoped.md`, "utf8"),
      readFile(`${batch}/${sample.id}-scoped.json`, "utf8"),
      readFile(`${batch}/manifest.json`, "utf8"),
    ]);
    const manifest = JSON.parse(manifestText);
    const meta = JSON.parse(record);
    const job = manifest.jobs.find(
      (j: { id: string }) => j.id === `${sample.id}-scoped`,
    );
    if (
      !job ||
      meta.failure ||
      digest(document) !==
        manifest.sources[
          `evals/deepseek-order-transfer-2026-09-29/${sample.id}-input.md`
        ] ||
      digest(job.request) !== meta.requestHash
    )
      throw Error("saved-input-mismatch");
    const pack = questionScopedPack(document);
    saved = { pack, result: assessQuestionScopedTable(raw, pack), meta };
  } catch {
    return (
      <main className={s.page}>
        <Link href="/lab/practice?view=library">← 返回练习</Link>
        <h1>这份评阅暂不可用</h1>
        <p>没有可核对的完整保存结果。页面不会重新发起评阅。</p>
      </main>
    );
  }
  const { pack, result, meta } = saved;
  const needsWork = result.items.filter(
    (r) => r.reviewStatus === "ready" && r.label === "否",
  );
  return (
    <main className={s.page}>
      <header className={s.top}>
        <Link href="/lab/practice?view=library">← 返回练习</Link>
        <Link
          href={`/lab/scoring/table/write?case=${["A", "B"].includes(sample.id) ? "NETWORK" : "FIRE"}`}
        >
          自己答一份 →
        </Link>
      </header>
      <div className={s.heading}>
        <div>
          <p className={s.eyebrow}>刑法 / 历史评阅样例</p>
          <h1>{sample.title}</h1>
          <p className={s.intro}>
            保留当时的原答与模型结果，不代表当前服务已开放；未重新评阅。
          </p>
        </div>
        <div className={s.score}>
          <strong>{result.score?.total ?? "待核对"}</strong>
          <span>{result.score ? ` / ${result.score.maximum} 分` : ""}</span>
          <small>练习参考分</small>
        </div>
      </div>
      <nav className={s.samples} aria-label="选择已保存答卷">
        {samples.map((item) => (
          <Link
            key={item.id}
            href={`?sample=${item.id}`}
            aria-current={item.id === sample.id ? "page" : undefined}
          >
            <b>{item.title}</b>
            <span>{item.description}</span>
          </Link>
        ))}
      </nav>
      <p className={s.meta}>
        {sample.description} · DeepSeek · 关闭思考 · 本次完整响应{" "}
        {(meta.durationMs / 1000).toFixed(2)} 秒
        {typeof meta.cost?.amount === "number"
          ? ` · 公开费率估算 ¥${meta.cost.amount.toFixed(5)}`
          : " · 费用待核对"}
        。再次查看不会调用模型。
      </p>
      <div className={s.layout}>
        <aside className={s.aside}>
          <details className={s.facts} open>
            <summary>案情</summary>
            {pack.facts.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </details>
          <nav className={s.questionNav} aria-label="跳到小问">
            {pack.questions.map((q) => (
              <a href={`#question-${q.id}`} key={q.id}>
                第 {q.id} 问
              </a>
            ))}
          </nav>
        </aside>
        <section>
          {!result.valid && (
            <p role="alert" className={s.notice}>
              评阅表不完整，暂不计分。
            </p>
          )}
          {result.score && result.score.pending > 0 && (
            <p className={s.notice}>
              已确认 {result.score.confirmed} 分，另有 {result.score.pending}{" "}
              分待核对。待核对不等于答错。
            </p>
          )}
          {needsWork.length > 0 && (
            <div className={s.focus}>
              <span>这次先看</span>
              <p>
                {needsWork
                  .slice(0, 2)
                  .map((r) => `第${r.questionId}问：${r.title}`)
                  .join("；")}
                。
              </p>
            </div>
          )}
          {pack.questions.map((q) => {
            const rows = result.items.filter((r) => r.questionId === q.id);
            const pending =
              !result.valid || rows.some((r) => r.earned === null);
            const earned = rows.reduce((sum, r) => sum + (r.earned ?? 0), 0);
            const max = q.criteria.reduce((sum, c) => sum + c.points, 0);
            return (
              <article
                key={q.id}
                className={s.question}
                id={`question-${q.id}`}
              >
                <div className={s.questionHead}>
                  <span>第 {q.id} 问</span>
                  <b>{pending ? "待核对" : `${earned} / ${max} 分`}</b>
                </div>
                <h2>{q.prompt}</h2>
                <details className={s.answer}>
                  <summary>查看本问原答</summary>
                  <p>{q.answer}</p>
                </details>
                {rows.map((r) => (
                  <details
                    key={r.id}
                    className={s.point}
                    open={r.label !== "是" || r.reviewStatus !== "ready"}
                  >
                    <summary>
                      <span>{r.title}</span>
                      <b
                        className={
                          r.earned === null
                            ? s.pending
                            : r.label === "否"
                              ? s.missed
                              : s.hit
                        }
                      >
                        {r.earned === null
                          ? "待核对"
                          : r.label === "否"
                            ? "未命中"
                            : "已命中"}
                        {r.earned === null ? "" : ` · ${r.earned}/${r.points}`}
                      </b>
                    </summary>
                    <p>{r.explanation}</p>
                    {!r.sourceValid && (
                      <p className={s.notice}>
                        本条引文无法在本问原答中核对，暂不按这次判断计分。
                      </p>
                    )}
                    <div className={s.evidence}>
                      <span>
                        {r.sourceValid ? "原答依据" : "模型所引文字（待核对）"}
                      </span>
                      {r.quotes.length ? (
                        (r.sourceValid ? r.sourceQuotes : r.quotes).map(
                          (quote, i) => (
                            <blockquote key={i}>{quote}</blockquote>
                          ),
                        )
                      ) : (
                        <p>模型未找到对应表达。</p>
                      )}
                    </div>
                    <p className={s.requirement}>本项要求：{r.requirement}</p>
                  </details>
                ))}
              </article>
            );
          })}
          <p className={s.footer}>
            本页展示本次列出的采分项，不是全卷法律表述审查，也不代表正式考试得分。
          </p>
        </section>
      </div>
    </main>
  );
}
