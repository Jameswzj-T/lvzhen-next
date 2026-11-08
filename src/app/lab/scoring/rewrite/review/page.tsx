import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import {
  loadReviewedExample,
  REVIEW_IDS,
} from "@/evaluation/rewrite-comparison/reviewed-feedback";
import s from "./feedback.module.css";

export const metadata = { title: "重答反馈审校对照 · 律真" };
const holdLabel = {
  case_facts: "题设事实待核",
  learner_stance: "作答立场待澄清",
  review_evidence: "反馈依据待核",
};
const sampleLabel = {
  R04: "部分已答，理由仍缺",
  R10: "原答已经正确",
  R05: "相反立场尚未选定",
};
export default async function ReviewPage({
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
    id = params.sample ?? "R04";
  if (
    typeof id !== "string" ||
    !REVIEW_IDS.includes(id as (typeof REVIEW_IDS)[number])
  )
    notFound();
  const loaded = await loadReviewedExample(process.cwd(), id).catch(() => null);
  if (!loaded)
    return (
      <main className={s.page}>
        <h1>固定反馈暂不可读</h1>
        <p>记录版本或来源需要核对。这里不会生成新评阅，也不会修改原答。</p>
      </main>
    );
  const { entry, candidate, feedback } = loaded;
  return (
    <main className={s.page}>
      <header className={s.top}>
        <Link href="/lab/scoring/rewrite?sample=R04">← 原离线候选</Link>
        <span>只读 · 固定虚构样本</span>
      </header>
      <h1>已写出的内容，要先承认</h1>
      <p className={s.intro}>
        把已有依据、尚缺理由和待核事项分开，才知道下一次该补什么。
      </p>
      <p className={s.notice}>
        下方采用的是<strong>固定样本的人工审校反馈</strong>
        。历史模型回执原样保留，本次没有新模型调用；这不表示模型已经修好。这里不接收你的答案，也不写入学习记录。
      </p>
      <nav className={s.tabs} aria-label="审校样本">
        {REVIEW_IDS.map((sample) => (
          <Link
            key={sample}
            href={`?sample=${sample}`}
            aria-current={sample === id ? "page" : undefined}
          >
            <b>{sample}</b>
            {sampleLabel[sample]}
          </Link>
        ))}
      </nav>
      <details className={s.card}>
        <summary>本问要求与完整案情</summary>
        <h2>{candidate.card.prompt}</h2>
        <p className={s.text}>{candidate.card.facts}</p>
        <ol>
          {candidate.card.criteria.map((c) => (
            <li key={c.id}>
              {c.id}：{c.requirement}
            </li>
          ))}
        </ol>
      </details>
      <section className={s.answers} aria-label="固定虚构作答">
        <article className={s.card}>
          <h2>原答</h2>
          <p className={s.text}>{entry.pair.original.text}</p>
        </article>
        <article className={s.card}>
          <h2>独立重答</h2>
          <p className={s.text}>{entry.pair.rewrite.text}</p>
        </article>
      </section>
      <section className={s.card} aria-label="反馈前后对照">
        <h2>反馈前后对照</h2>
        <div className={s.compare}>
          <article className={s.old}>
            <h3>
              原模型反馈 ·{" "}
              {entry.model.status === "feedback_rejected"
                ? "本条未采用"
                : "保留原记录"}
            </h3>
            <p>
              核对项 {entry.model.criterionId} · 原标签「{entry.model.label}」
            </p>
            <blockquote>{entry.model.explanation}</blockquote>
            <p>{entry.model.reviewFinding}</p>
          </article>
          <article className={s.revised}>
            <h3>人工审校后的反馈</h3>
            <p>
              <strong>{feedback.title}</strong>
            </p>
            <p>{feedback.summary}</p>
          </article>
        </div>
      </section>
      <section
        aria-label="当前采用的人工反馈"
        data-feedback-ready={feedback.ready}
      >
        <article className={s.card}>
          <span className={s.tag}>人工审校 · 已表达</span>
          <h2>已表达的原文证据</h2>
          {feedback.expressed.length ? (
            feedback.expressed.map((q, i) => (
              <div key={i} className={s.evidence}>
                <p className={s.meta}>
                  {q.side === "original" ? "原答" : "重答"} · 完整原句
                </p>
                <blockquote>{q.quote}</blockquote>
                <p>{q.meaning}</p>
              </div>
            ))
          ) : (
            <p>引文归属尚未通过核对，暂不采用。</p>
          )}
        </article>
        <article className={s.card}>
          <span className={s.tag}>人工审校 · 具体缺口</span>
          <h2>尚未支撑的具体理由</h2>
          {feedback.gaps.length ? (
            feedback.gaps.map((g, i) => (
              <div key={i} className={s.gap}>
                <h3>核对项 {g.criterionId}</h3>
                <p>{g.detail}</p>
                <p className={s.why}>
                  <strong>为什么本问要求：</strong>
                  {g.why}
                </p>
              </div>
            ))
          ) : (
            <p>{feedback.noConfirmedGap}</p>
          )}
        </article>
        <article className={s.card}>
          <span className={s.tag}>分清来源 · 不硬下结论</span>
          <h2>不能确定什么</h2>
          {feedback.holds.map((h, i) => (
            <div className={s.hold} key={i}>
              <h3>{holdLabel[h.kind]}</h3>
              <p>{h.detail}</p>
            </div>
          ))}
          <p className={s.meta}>
            题设边界提示来自人工审校，不是考生已经写出的理由；不能用它替考生补答或认定题外漏项。
          </p>
        </article>
      </section>
      <details className={s.card}>
        <summary>历史模型完整回执与来源</summary>
        <p>
          这是先前真实调用的保存结果，打开此处不会调用模型。原标签和错误解释未经改写。
        </p>
        <p className={s.meta}>回执 {entry.model.responseId}</p>
        <pre className={s.raw}>{entry.model.output}</pre>
      </details>
      <details className={s.card}>
        <summary>公开依据和本页校验边界</summary>
        {candidate.publicSources.map((source) => (
          <p key={source.id}>
            <a href={source.url} target="_blank" rel="noreferrer">
              {source.title}
            </a>
            ：{source.text}
          </p>
        ))}
        <p>
          1999年解释的继续适用引用已在
          <a
            href="https://www.court.gov.cn/zixun/xiangqing/469691.html"
            target="_blank"
            rel="noreferrer"
          >
            最高法2025年7月3日法答网答问
          </a>
          核对，具体事实适用边界仍保留。
        </p>
        <p>
          程序只核对固定记录绑定和引文是否为所属侧完整连续原句。引文支持什么、理由是否真的遗漏，仍由人工审校；本页不自动评分、不认定掌握。
        </p>
      </details>
    </main>
  );
}
