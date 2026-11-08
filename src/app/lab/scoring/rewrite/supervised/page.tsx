import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { loadSupervisedState } from "@/evaluation/rewrite-comparison/supervised-preview";
import ComponentView from "../components/component-view";
import s from "../components/component.module.css";
export const metadata = { title: "本次单问人工核对体验 · 律真" };
export default async function Page() {
  const host = (await headers()).get("host");
  if (
    (process.env.LVZHEN_ENV ?? "local") !== "local" ||
    !["127.0.0.1:3107", "localhost:3107"].includes(host ?? "")
  )
    notFound();
  const loaded = await loadSupervisedState(process.cwd()).catch(() => null);
  if (!loaded)
    return (
      <main className={s.page}>
        <h1>本次试用状态需要核对</h1>
        <p>发送或审读记录暂不可确认，反馈暂不展示。</p>
      </main>
    );
  return (
    <main className={s.page}>
      <p className={s.meta}>本机 · 一次新答 · 人工核对体验</p>
      <h1>只试这一问，反馈核对后再展示</h1>
      <p className={s.notice}>
        本次范围已获同意：原答和独立重答随完整题干、核对要求及公开法源一起发送给
        {loaded.provider}
        一次，最多预留¥0.30。不会读取过去的答案，不自动给总分或记录掌握。
      </p>
      <details
        className={s.card}
        open={loaded.state === "awaiting_new_answers"}
      >
        <summary>本问与完整虚构案情</summary>
        <h2>{loaded.design.prompt}</h2>
        <p>{loaded.facts}</p>
        <h3>本问核对依据</h3>
        <ol>
          {loaded.criteria.map((c) => (
            <li key={c.id}>
              {c.title}：{c.requirement}
            </li>
          ))}
        </ol>
        <h3>公开法源</h3>
        {loaded.publicSources.map((source) => (
          <p key={source.id}>
            <a href={source.url} target="_blank" rel="noreferrer">
              {source.id}
            </a>
            ：{source.text}
          </p>
        ))}
      </details>
      {loaded.state !== "reviewed" && "pair" in loaded && loaded.pair ? (
        <div className={s.answers}>
          <section className={s.card}>
            <h2>本次新原答</h2>
            <p>{loaded.pair.original}</p>
          </section>
          <section className={s.card}>
            <h2>本次独立重答</h2>
            <p>{loaded.pair.rewrite}</p>
          </section>
        </div>
      ) : null}
      {loaded.state === "reviewed" && loaded.entry ? (
        <ComponentView
          key={`${loaded.entry.resultKey}:${loaded.entry.reviewHash}`}
          entry={loaded.entry}
        />
      ) : (
        <section className={s.card} role="status">
          {loaded.state === "awaiting_new_answers" ? (
            <>
              <h2>等待本次新答文</h2>
              <p>
                只需在当前对话按“原答：…；独立重答：…”提供两段新答，收到后按已同意的范围发送一次。
              </p>
            </>
          ) : loaded.state === "prepared" ? (
            <>
              <h2>新答已绑定，等待本次调用</h2>
              <p>答文及题目版本已固定。当前没有模型反馈。</p>
            </>
          ) : loaded.state === "pending_human_review" ? (
            <>
              <h2>模型回执待人工核对</h2>
              <p>
                尚未采用任何判断。核对原文、具体缺项与题设边界后才展示反馈。
              </p>
            </>
          ) : (
            <>
              <h2>本份反馈暂不采用</h2>
              <p>
                调用、费用或证据校验需要核对，原答保留，不重试，也不归责为考生错误。
              </p>
            </>
          )}
        </section>
      )}
    </main>
  );
}
