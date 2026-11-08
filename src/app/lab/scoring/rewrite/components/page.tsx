import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { loadComponentPreview } from "@/evaluation/rewrite-comparison/component-preview";
import { COMPONENT_TRIAL_IDS } from "@/evaluation/rewrite-comparison/component-trial";
import {
  loadReviewedReceipt,
  REVIEWED_PREVIEW_IDS,
} from "@/evaluation/rewrite-comparison/reviewed-receipts-preview";
import SavedReviewedView from "./saved-reviewed-view";
import ReviewedRewriteFlowView from "./reviewed-rewrite-flow";
import { loadReviewedRewriteFlow } from "@/evaluation/rewrite-comparison/reviewed-rewrite-flow";
import ComponentView from "./component-view";
import { loadReasoningReadback } from "@/evaluation/rewrite-comparison/reasoning-readback";
import ReasoningPreviewView from "./reasoning-preview-view";
import s from "./component.module.css";
export const metadata = { title: "逐点证据反馈候选 · 律真" };
export default async function Page({
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
  const params = await searchParams;
  const id = params.sample ?? "R14";
  if (params.flow !== undefined) {
    if (params.flow !== "rewrite" || id !== "UB02") notFound();
    const flow = await loadReviewedRewriteFlow(process.cwd(), id).catch(
      () => null,
    );
    return flow ? (
      <ReviewedRewriteFlowView key={flow.fixture.bindingKey} entry={flow} />
    ) : (
      <main className={s.page}>
        <h1>本问来源与回执暂不可核对</h1>
        <p>本机候选没有重新调用模型，不展示改正判断，也不覆盖保存的重答。</p>
      </main>
    );
  }
  if (id === "reasoning") {
    const entry = await loadReasoningReadback(process.cwd()).catch(() => null);
    return entry ? (
      <ReasoningPreviewView entry={entry.preview} reviewed={entry} />
    ) : (
      <main className={s.page}>
        <h1>已存反馈暂不可核对</h1>
        <p>
          材料、回执或审读绑定尚需核对，当前不展示判断。原答和独立重答保留，可返回对照；这里不会重新调用模型。
        </p>
        <Link prefetch={false} href="?sample=UB02&flow=rewrite">
          返回本机重答与对照
        </Link>
      </main>
    );
  }
  if (
    typeof id === "string" &&
    REVIEWED_PREVIEW_IDS.includes(id as (typeof REVIEWED_PREVIEW_IDS)[number])
  ) {
    const entry = await loadReviewedReceipt(process.cwd(), id).catch(
      () => null,
    );
    return entry ? (
      <SavedReviewedView entry={entry} />
    ) : (
      <main className={s.page}>
        <h1>本份内容暂不可核对</h1>
        <p>
          保存记录或版本绑定尚需核对。此页不会重新调用模型，也不会改动答案。
        </p>
      </main>
    );
  }
  if (
    typeof id !== "string" ||
    !COMPONENT_TRIAL_IDS.includes(id as (typeof COMPONENT_TRIAL_IDS)[number])
  )
    notFound();
  const entry = await loadComponentPreview(process.cwd(), id).catch(() => null);
  if (!entry)
    return (
      <main className={s.page}>
        <h1>本份反馈暂不可展示</h1>
        <p>回执、版本或审读状态尚需核对。本页不会生成评阅，也不会修改答案。</p>
      </main>
    );
  return (
    <main className={s.page}>
      <p className={s.meta}>本机 · 固定虚构样本 · 受限候选</p>
      <h1>先核对写了什么，再决定采用什么</h1>
      <nav className={s.tabs} aria-label="验证样本">
        {COMPONENT_TRIAL_IDS.map((sample) => (
          <Link
            key={sample}
            href={`?sample=${sample}`}
            aria-current={id === sample ? "page" : undefined}
          >
            {sample === "R14"
              ? "R14 · 部分表达，理由未全"
              : "R15 · 有理由的条件判断"}
          </Link>
        ))}
        <Link prefetch={false} href="?sample=UB01">
          最新已审读反馈回看
        </Link>
      </nav>
      <details className={s.card}>
        <summary>本问要求、完整案情与公开法源</summary>
        <h2>{entry.design.prompt}</h2>
        <p>{entry.facts}</p>
        <ul>
          {entry.design.evidenceNeeds.map((n) => (
            <li key={n.id}>
              {n.title}：{n.requirement} {n.boundary}
            </li>
          ))}
        </ul>
        {entry.publicSources.map((source) => (
          <p key={source.id}>
            <a href={source.url} target="_blank" rel="noreferrer">
              {source.id}
            </a>
          </p>
        ))}
      </details>
      <ComponentView
        key={`${entry.resultKey}:${entry.reviewHash}`}
        entry={entry}
      />
    </main>
  );
}
