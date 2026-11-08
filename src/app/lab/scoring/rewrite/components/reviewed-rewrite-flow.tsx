"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { FaultProgress } from "@/domain/fault-progress";
import {
  encodeLocalRewrite,
  localRewriteComparison,
  localRewriteStorageKey,
  readLocalRewrite,
  type LocalRewriteRecord,
} from "@/domain/reviewed-rewrite-flow";
import type { ReviewedRewriteFlow } from "@/evaluation/rewrite-comparison/reviewed-rewrite-flow";
import type { SavedColumn } from "@/evaluation/rewrite-comparison/reviewed-receipts-preview";
import { AnswerRewrite } from "../../../_components/answer-rewrite";
import d from "../../../_components/reading-document.module.css";
import s from "./reviewed-rewrite-flow.module.css";

function Evidence({ column }: { column: SavedColumn }) {
  return column.items.map((item) => (
    <article key={item.key} data-reviewed-item={item.key}>
      <h3 className={d.subheading}>{item.title}</h3>
      {item.status && <p className={d.paragraph}>{item.status}</p>}
      {item.feedback && (
        <p className={d.paragraph} data-model-feedback>
          {item.feedback}
        </p>
      )}
      {item.evidence.map((e, i) => (
        <div key={i}>
          <blockquote className={s.quote}>{e.quote}</blockquote>
          <p className={d.paragraph}>{e.meaning}</p>
        </div>
      ))}
    </article>
  ));
}
export default function ReviewedRewriteFlowView({
  entry,
}: {
  entry: ReviewedRewriteFlow;
}) {
  const [record, setRecord] = useState<LocalRewriteRecord | null>(null);
  const [ready, setReady] = useState(false),
    [storageFailed, setStorageFailed] = useState(false);
  const [showReplay, setShowReplay] = useState(false);
  const current = useRef<LocalRewriteRecord | null>(null);
  useEffect(() => {
    try {
      const restored = readLocalRewrite(
        localStorage.getItem(localRewriteStorageKey),
        entry.fixture,
      );
      if (!restored) {
        setStorageFailed(true);
        setReady(true);
        return;
      }
      current.current = restored;
      setRecord(restored);
      setReady(true);
    } catch {
      setStorageFailed(true);
      setReady(true);
    }
  }, [entry.fixture.bindingKey]);
  function persist(next: LocalRewriteRecord) {
    try {
      localStorage.setItem(
        localRewriteStorageKey,
        encodeLocalRewrite(next, entry.fixture),
      );
      current.current = next;
      setRecord(next);
    } catch {
      // Keep the unsaved text visible; never overwrite an unknown stored version.
      current.current = next;
      setRecord(next);
      setStorageFailed(true);
    }
  }
  function update(change: (state: FaultProgress) => FaultProgress) {
    if (!current.current || storageFailed) return;
    persist({ ...current.current, progress: change(current.current.progress) });
  }
  function withdraw() {
    if (current.current && !storageFailed)
      persist({ ...current.current, withdrawn: true });
  }
  const comparison = record && localRewriteComparison(record, entry.fixture);
  const feedbackVisible = record && !record.withdrawn && !storageFailed;
  return (
    <main className={`${s.page} ${d.document}`}>
      <nav className={s.nav} aria-label="候选返回">
        <Link prefetch={false} href="?sample=UB02">
          回看已有反馈
        </Link>
        <Link prefetch={false} href="/lab/practice?view=library">
          题库
        </Link>
      </nav>
      <h1 className={s.title}>完整小问：反馈、重答与对照</h1>
      <p className={d.note}>
        本机候选 · 固定虚构原答 ·
        新重答只存本机、不外发。已有回执只支持利益归属的局部核对，不计分或写掌握。
      </p>
      <section aria-label="完整小问">
        <h2 className={d.heading}>题目与问题</h2>
        <p className={d.paragraph}>{entry.question.facts}</p>
        <p className={d.paragraph}>{entry.question.prompt}</p>
        <details>
          <summary>本问范围与版本</summary>
          <p className={d.paragraph}>{entry.scopePrompt}</p>
          <ul>
            {entry.question.requirements.map((r) => (
              <li key={r.id}>
                {r.title}：{r.requirement}
              </li>
            ))}
          </ul>
          <p className={d.note}>
            题目版本：{entry.fixture.questionRevision}；回放评阅版本：
            {entry.entry.reviewVersion}
          </p>
        </details>
      </section>
      {!ready ? (
        <p role="status">正在恢复本机候选记录…</p>
      ) : storageFailed && !record ? (
        <p role="alert">
          本机记录或版本无法确认，已停止保存和反馈展示。原存储未覆盖，请保留记录后核对。
        </p>
      ) : (
        record && (
          <>
            {storageFailed && (
              <p role="alert">
                本机保存受阻。当前文字仍留在页面，暂停继续保存；请先复制保留草稿。本页不声称刷新可恢复这些未存改动。
              </p>
            )}
            <section aria-label="固定虚构原答">
              <h2 className={d.heading}>原答（保留）</h2>
              <p className={d.paragraph} data-flow-original>
                {entry.fixture.original.text}
              </p>
            </section>
            <section aria-label="原答已有反馈">
              <h2 className={d.heading}>先核对原答的关键问题</h2>
              {feedbackVisible ? (
                <>
                  <p className={d.note}>
                    以下来自UB02真实模型回执的已审读切片；只核对同笔100万元的利益表达，不是整问评阅。
                  </p>
                  <Evidence column={entry.entry.columns[0]} />
                  <button
                    className={s.secondary}
                    type="button"
                    onClick={withdraw}
                  >
                    撤回本页整项回放反馈
                  </button>
                </>
              ) : (
                <p role="status">
                  反馈已暂停展示，原答和重答保留；撤回不代表答错。
                </p>
              )}
            </section>
            <section aria-label="题设事实边界">
              <h2 className={d.heading}>不能确定的事实</h2>
              <p className={d.paragraph}>{entry.caseBoundary.statement}</p>
              <p className={d.note}>{entry.caseBoundary.feedback}</p>
            </section>
            <AnswerRewrite
              state={record.progress}
              target={{
                questionId: entry.fixture.questionId,
                attemptId: entry.fixture.original.attemptId,
              }}
              disabled={storageFailed}
              onChange={update}
              scope="whole-question"
            />
            <section
              aria-label="新重答改正比较"
              data-new-comparison-state="insufficient"
            >
              <h2 className={d.heading}>
                {comparison?.rewrite
                  ? "新重答已保存，未自动评阅"
                  : "先保存重答，再与原答对照"}
              </h2>
              <p className={d.paragraph} role="status">
                {comparison?.reason ?? "记录绑定待核，不能判断是否改正。"}
              </p>
              <p className={d.note}>
                本页没有正在运行的评阅，也不会自动排队；可以继续保存独立重答、查看原答和已有参考。
              </p>
              {comparison?.rewrite && (
                <p className={d.note}>
                  {comparison.textChanged
                    ? "已保存的重答文字与原答不同；文字变化不证明推理改正。"
                    : "已保存的重答与原答逐字相同；本页仍不作语义判定。"}{" "}
                  旧回执不会套到这份新答。
                </p>
              )}
              <Link prefetch={false} href="?sample=reasoning">
                查看两份已审读虚构重答反馈
              </Link>
            </section>
            <section aria-label="已有虚构对照回放">
              <h2 className={d.heading}>已有回执能支持的局部对照</h2>
              <p className={d.note}>
                UB02的虚构A／B由开发者编写，不是本次保存的重答，也不是学生学习进步。回放不写入重答记录。
              </p>
              <button
                type="button"
                className={s.secondary}
                onClick={() => setShowReplay(!showReplay)}
                aria-expanded={showReplay}
              >
                {showReplay ? "收起已审读虚构对照" : "查看已审读虚构对照"}
              </button>
              {showReplay && (
                <div data-historical-replay>
                  <h3 className={d.subheading}>虚构对照B（历史材料）</h3>
                  <p className={d.paragraph} data-replay-rewrite>
                    {entry.entry.sources[1].text}
                  </p>
                  {feedbackVisible ? (
                    <>
                      <Evidence column={entry.entry.columns[1]} />
                      <h3 className={d.subheading}>负责人已有复核说明</h3>
                      {entry.entry.reviewerNotes.map((n, i) => (
                        <p className={d.paragraph} key={i}>
                          {n}
                        </p>
                      ))}
                    </>
                  ) : (
                    <p>回放反馈已撤下，不显示局部判断。</p>
                  )}
                  <p className={d.note}>
                    组织性质、单位意志、责任及整问改正仍未由这份局部回执证实；不能从公司用款直接推出单位犯罪全部成立。
                  </p>
                </div>
              )}
            </section>
          </>
        )
      )}
      <details className={s.history}>
        <summary>公开依据、未采用判断与原始回执</summary>
        {entry.entry.publicSources.map((source) => (
          <p key={source.id}>
            <a href={source.url} target="_blank" rel="noreferrer">
              {source.title}
            </a>
          </p>
        ))}
        {entry.entry.withheld.map((item) => (
          <p key={item.key}>
            {item.title}：{item.reason}
          </p>
        ))}
        <p className={d.note}>
          原始回执包含未采用内容，仅供追溯，不作为当前新重答结果。
        </p>
        <p className={d.note}>
          真实回执ID：{entry.entry.responseId}；审读指纹：
          {entry.entry.reviewHash}
        </p>
        <pre className={s.raw}>{entry.entry.rawModelOutput}</pre>
      </details>
    </main>
  );
}
