import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { loadRewriteCandidate } from "@/evaluation/rewrite-comparison/candidate";
import {
  loadRewriteSamples,
  authoredResponse,
} from "@/evaluation/rewrite-comparison/samples";
import { assessComparison } from "@/evaluation/rewrite-comparison/protocol";
import s from "../table/table.module.css";

export const metadata = { title: "单问重答比较候选 · 律真" };
const kindLabel = {
  correct: "表达完整",
  error: "明确错误",
  omitted: "缺少必要表达",
  contradictory: "相反立场未澄清",
  uncertain: "待核对",
};
const focusLabel = {
  new_error: "本次目标项新出现错误（候选）",
  corrected: "本次目标误解已改正（候选）",
  still_error: "目标项仍有明确错误（候选）",
  insufficient: "目标项尚不足以判定",
  already_correct: "原答已正确，不制造纠错记录",
};
export default async function RewritePreview({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const host = (await headers()).get("host");
  if (
    (process.env.LVZHEN_ENV ?? "local") !== "local" ||
    !["127.0.0.1:3107", "localhost:3107"].includes(host ?? "")
  )
    notFound();
  const params = await searchParams,
    candidate = await loadRewriteCandidate(process.cwd()),
    samples = await loadRewriteSamples(process.cwd());
  const sample = samples.find((s) => s.id === params.sample) ?? samples[0];
  const result = assessComparison(
    JSON.stringify(authoredResponse(candidate, sample)),
    candidate,
    sample.pair,
  );
  return (
    <main className={s.page}>
      <header className={s.top}>
        <Link href="/lab/practice?view=library">← 返回练习</Link>
        <span>离线候选 · 固定虚构样本</span>
      </header>
      <h1>这一次重答，改正了什么？</h1>
      <p className={s.notice}>
        <strong>这里展示人工编写回执的离线回放，模型调用为0。</strong>
        不读取你的作答、不接受输入、不更新学习状态。用于检查反馈表达与证据链，不代表模型已经能可靠判断。
      </p>
      <nav className={s.samples} aria-label="虚构对照样本">
        {samples.map((item) => (
          <Link
            key={item.id}
            href={`?sample=${item.id}`}
            aria-current={item.id === sample.id ? "page" : undefined}
          >
            <b>{item.id}</b>
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
      <h2>{sample.title}</h2>
      <p>
        <strong>关注边界：</strong>单位承担刑责，是否就排除直接责任人员的刑责？
      </p>
      <div className={s.layout}>
        <aside className={s.aside}>
          <details className={s.facts}>
            <summary>完整案情和本问要求</summary>
            <p style={{ whiteSpace: "pre-wrap" }}>{candidate.card.facts}</p>
            <h3>{candidate.card.prompt}</h3>
            <ol>
              {candidate.card.criteria.map((c) => (
                <li key={c.id}>{c.requirement}</li>
              ))}
            </ol>
          </details>
          <details className={s.facts}>
            <summary>公开依据与核验范围</summary>
            {candidate.publicSources.map((source) => (
              <div key={source.id}>
                <a href={source.url} target="_blank" rel="noreferrer">
                  {source.title}
                </a>
                <p>{source.text}</p>
                <p>
                  {
                    (source as typeof source & { verification?: string })
                      .verification
                  }
                </p>
              </div>
            ))}
          </details>
        </aside>
        <section aria-label="原答与重答候选反馈">
          <article className={s.question}>
            <h3>虚构原答</h3>
            <p style={{ whiteSpace: "pre-wrap" }}>
              {sample.pair.original.text}
            </p>
            <h3>独立重答</h3>
            <p style={{ whiteSpace: "pre-wrap" }}>{sample.pair.rewrite.text}</p>
          </article>
          <article className={s.question} aria-label="比较结论">
            <h3>
              {result.focusState === "already_correct"
                ? "原答已正确，不适用纠错结论"
                : result.label}
            </h3>
            <p>
              <strong>{focusLabel[result.focusState]}</strong>
            </p>
            <p>{result.nextStep}</p>
            <p>本次候选不会被写为“已掌握”，也不代表能在新题独立运用。</p>
          </article>
          {result.rewrite?.items.map((item, i) => (
            <article
              className={s.question}
              key={item.id}
              aria-label={`核对项${item.id}`}
            >
              <h3>{candidate.card.criteria[i].title}</h3>
              <p>
                原答：{kindLabel[result.original!.items[i].kind]} → 重答：
                {kindLabel[item.kind]}
              </p>
              <p>{item.explanation}</p>
              <details>
                <summary>逐字依据与判定要求</summary>
                <p>{candidate.card.criteria[i].requirement}</p>
                <h4>原答依据</h4>
                {result.original!.items[i].sourceQuotes.length ? (
                  result.original!.items[i].sourceQuotes.map((q, n) => (
                    <blockquote key={n}>{q}</blockquote>
                  ))
                ) : (
                  <p>未找到对应表达；不是从题干替学生补出的证据。</p>
                )}
                <h4>重答依据</h4>
                {item.sourceQuotes.length ? (
                  item.sourceQuotes.map((q, n) => (
                    <blockquote key={n}>{q}</blockquote>
                  ))
                ) : (
                  <p>未找到对应表达，不能据此推定持有相反观点。</p>
                )}
                <p>
                  程序仅检查引文归属和完整性；句子是否支持结论仍需独立语义核验。
                </p>
              </details>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
