import React, { type ReactNode } from "react";
import type {
  ScoringTrialResponse,
  ScoringQuestionPart,
} from "@/evaluation/scoring-trial-contract";
import { evidenceContext } from "@/domain/evidence-context";
import s from "./scoring.module.css";

type Ready = Extract<ScoringTrialResponse, { status: "ready" }>;

export function ScoringFeedback({
  result,
  showReference = true,
  documentFlow = false,
  historical = false,
  sourceNote,
  groups,
  coreConclusionCriterionId,
  children,
}: {
  result: Ready;
  showReference?: boolean;
  documentFlow?: boolean;
  historical?: boolean;
  sourceNote?: string;
  groups?: ScoringQuestionPart[];
  coreConclusionCriterionId?: string;
  children?: ReactNode;
}) {
  // Organize the existing feedback only; presentation must not infer a verdict
  // from wording or turn an unresolved diagnosis into an answer error.
  const pending = result.items.filter(
    (item) =>
      item.earned === null || item.reviewRequired || item.diagnosisPending,
  );
  const coreConclusion = result.items.find(
    (item) => item.criterionId === coreConclusionCriterionId,
  );
  const coreNotMet =
    result.judgment === "scored" &&
    coreConclusion?.earned === 0 &&
    !coreConclusion.reviewRequired &&
    !coreConclusion.diagnosisPending;
  const improvements = result.items.filter(
    (item) =>
      item.earned !== null &&
      item.earned < item.maxScore &&
      !item.reviewRequired &&
      !item.diagnosisPending,
  );
  const complete =
    result.judgment === "scored" &&
    result.total === result.maxScore &&
    !result.diagnosisPending &&
    pending.length === 0 &&
    result.items.length > 0 &&
    result.items.every((item) => item.earned === item.maxScore);
  const groupIds = groups?.flatMap((g) => g.criterionIds) ?? [];
  // If a stale/mismatched grouping is ever supplied, fall back to the full list.
  // No score item may disappear or be counted twice through presentation.
  const grouped =
    groups?.length &&
    groupIds.length === result.items.length &&
    new Set(groupIds).size === groupIds.length &&
    result.items.every((item) => groupIds.includes(item.criterionId))
      ? groups.map((g) => ({
          ...g,
          items: result.items.filter((item) =>
            g.criterionIds.includes(item.criterionId),
          ),
        }))
      : null;

  return (
    <section
      className={documentFlow ? `${s.feedback} ${s.documentFlow}` : s.feedback}
      aria-label="本次评阅"
    >
      <div className={s.score}>
        <div>
          <span>
            {coreNotMet
              ? "已表达要点的训练分"
              : historical
                ? "这份作答的训练分"
                : "本次训练得分"}
          </span>
          <strong>
            {result.total === null
              ? "待核对"
              : `${result.total} / ${result.maxScore}`}
            <small>{result.total === null ? "" : "分"}</small>
          </strong>
        </div>
        <span>评阅用时 {(result.durationMs / 1000).toFixed(2)} 秒</span>
      </div>
      <p className={s.note}>
        {sourceNote ??
          (result.source === "offline_test"
            ? "离线界面测试结果"
            : "AI 试用反馈 · 本题训练评分，非官方成绩预测")}
      </p>
      {coreNotMet && (
        <aside className={s.coreOutcome} aria-label="本题核心判断">
          <strong>核心判断未达标</strong>
          <p>
            「{coreConclusion.title}
            」尚未得分。上方分数记录的是已表达的要点，不代表本题判断正确。
          </p>
        </aside>
      )}
      {complete && (
        <p className={s.complete}>
          {historical
            ? "这份作答的各得分点已答到。"
            : "本题各得分点已答到，可以继续下一题。"}
        </p>
      )}
      {!documentFlow && improvements.length > 0 && (
        <section className={s.improvements} aria-label="可补改的要点">
          <h3>这次留意</h3>
          <ul>
            {improvements.slice(0, 2).map((item) => (
              <li key={item.criterionId}>
                <strong>{item.title}</strong>
                <p>{item.feedback}</p>
              </li>
            ))}
          </ul>
          {improvements.length > 2 && (
            <p className={s.moreItems}>
              另有 {improvements.length - 2} 项可在下方逐项得分中查看。
            </p>
          )}
        </section>
      )}
      {(result.judgment === "pending" ||
        result.diagnosisPending ||
        pending.length > 0) && (
        <aside className={s.pendingReview} aria-label="待核对的部分">
          <p>
            {result.judgment === "pending"
              ? "有项目待核对，暂不显示总分。待核对不代表你答错了。"
              : "训练分已确定，部分评语仍待核对。"}
          </p>
          {pending.length > 0 && (
            <p className={s.pendingItems}>
              待核对：{pending.map((item) => item.title).join("、")}
            </p>
          )}
        </aside>
      )}
      {grouped ? (
        <section className={s.questionResults} aria-label="按问查看反馈">
          {grouped.map((g, index) => {
            const scorePending = g.items.some(
              (item) => item.earned === null || item.reviewRequired,
            );
            const diagnosisPending = g.items.some(
              (item) => item.diagnosisPending,
            );
            const total = g.items.reduce(
              (n, item) => n + (item.earned ?? 0),
              0,
            );
            const max = g.items.reduce((n, item) => n + item.maxScore, 0);
            return (
              <details
                key={g.id}
                className={s.questionResult}
                open={
                  documentFlow ||
                  scorePending ||
                  diagnosisPending ||
                  total < max
                }
              >
                <summary>
                  <strong>第{index + 1}问</strong>
                  <span>
                    {diagnosisPending && <small>评语待核对 · </small>}
                    {scorePending ? "待核对" : `${total} / ${max} 分`}
                  </span>
                </summary>
                <p className={s.resultQuestion}>{g.question}</p>
                {g.items.map((item) => (
                  <ScoreItem
                    key={item.criterionId}
                    item={item}
                    answer={result.answer}
                  />
                ))}
              </details>
            );
          })}
        </section>
      ) : documentFlow ? (
        <section className={s.items} aria-label="逐项评阅">
          {result.items.map((item) => (
            <ScoreItem
              key={item.criterionId}
              item={item}
              answer={result.answer}
            />
          ))}
        </section>
      ) : (
        <details className={s.breakdown}>
          <summary>
            逐项得分与原答
            <span>{result.items.length} 项</span>
          </summary>
          <div className={s.items}>
            {result.items.map((item) => (
              <ScoreItem
                key={item.criterionId}
                item={item}
                answer={result.answer}
              />
            ))}
          </div>
        </details>
      )}
      {showReference && (
        <details className={s.reference}>
          <summary>参考分析与依据</summary>
          <p>{result.reference}</p>
          {result.sources.map((url, i) => (
            <a key={url} href={url} target="_blank" rel="noreferrer">
              法律依据 {i + 1} ↗
            </a>
          ))}
        </details>
      )}
      {children}
    </section>
  );
}

function ScoreItem({
  item,
  answer,
}: {
  item: Ready["items"][number];
  answer: string;
}) {
  return (
    <div className={s.item} data-criterion-id={item.criterionId}>
      <div>
        <h3>{item.title}</h3>
        <span>
          {item.earned === null || item.reviewRequired
            ? "待核对"
            : `${item.earned} / ${item.maxScore}`}
        </span>
      </div>
      {item.diagnosisPending && <p className={s.itemPending}>评语待核对</p>}
      <p>{item.feedback}</p>
      {item.evidence.length > 0 && (
        <details>
          <summary>对应我的原话</summary>
          <p className={s.evidenceHint}>标亮处为本项引用，其余为原答上下文。</p>
          <OriginalContext answer={answer} evidence={item.evidence} />
        </details>
      )}
    </div>
  );
}

function OriginalContext({
  answer,
  evidence,
}: {
  answer: string;
  evidence: string[];
}) {
  const context = evidenceContext(answer, evidence);
  return (
    <>
      <blockquote
        className={s.originalContext}
        aria-label="完整原答及本项引用"
        tabIndex={0}
      >
        {context.parts.map((part, i) =>
          part.cited ? (
            <mark key={i}>{part.text}</mark>
          ) : (
            <span key={i}>{part.text}</span>
          ),
        )}
      </blockquote>
      {context.ambiguous && (
        <p className={s.evidenceHint}>
          原答含重复句子，无法唯一定位的引用未标亮。
        </p>
      )}
    </>
  );
}
