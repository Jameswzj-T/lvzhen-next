import type { UnitFeedbackResult } from "@/evaluation/unit-feedback-contract";
import type { TopicLearningSummary } from "@/domain/topic-learning-summary";
import { DirectAnswerFeedback } from "@/app/lab/_components/direct-answer-feedback";
import { TopicLearning } from "@/app/lab/_components/topic-learning";
import { AnswerReference } from "@/app/lab/_components/answer-reference";
import s from "../preview.module.css";

export const reviewBooks = [
  ["general", "总则"],
  ["property", "物权"],
  ["contract", "合同"],
  ["personality", "人格权"],
  ["family", "婚姻家庭"],
  ["inheritance", "继承"],
  ["tort", "侵权责任"],
] as const;

export type CivilReviewBook = (typeof reviewBooks)[number][0];
export type CivilReviewSample = {
  id: string;
  book: CivilReviewBook;
  kind: string;
  questionId: string;
  revision: string;
  title: string;
  facts: string;
  prompt: string;
  answer: string;
  reference: string;
  elapsedMs: number;
  result: UnitFeedbackResult;
  learning: TopicLearningSummary | null;
  choice: {
    questionId: string;
    revision: string;
    prompt: string;
    options: { id: string; text: string }[];
    reference: string;
  };
};

/** Saved fictional examples only. This component neither saves nor requests feedback. */
export function CivilReview({
  book,
  samples,
}: {
  book: CivilReviewBook;
  samples: CivilReviewSample[];
}) {
  const label = reviewBooks.find(([id]) => id === book)![1];
  return (
    <main className={s.page}>
      <header className={s.header}>
        <p className={s.eyebrow}>律真 · 民法</p>
        <h1>看看答题后怎样讲清楚</h1>
        <p>
          七编各选两道案例，一共14份模拟作答。下面是实际保存的
          DeepSeek讲解，有答对的，也有故意答错或漏写的。
        </p>
        <p className={s.metrics}>切换和展开只读已有结果，不会重新评阅。</p>
        <nav className={s.nav} aria-label="选择民法编目">
          {reviewBooks.map(([id, title]) => (
            <a
              key={id}
              href={`?book=${id}`}
              aria-current={id === book ? "page" : undefined}
            >
              {title}
            </a>
          ))}
        </nav>
      </header>
      <h2>{label}</h2>
      {samples.map((sample) => (
        <article key={sample.id} id={sample.id} className={s.card}>
          <p className={s.eyebrow}>
            {sample.kind} · 本次评阅约{(sample.elapsedMs / 1000).toFixed(1)}秒
          </p>
          <h2>{sample.title.replace(/（自由作答）$/, "")}</h2>
          <p>{sample.facts.replace(/^本案为原创教学虚构[。，]/, "")}</p>
          <p>
            <strong>{sample.prompt}</strong>
          </p>
          <h3>模拟原答</h3>
          <blockquote className={s.answer}>{sample.answer}</blockquote>
          {sample.id === "inheritance-error" && (
            <aside className={s.notice} aria-label="已发现的一处人名笔误">
              阅读提示：下面讲解中的“代许川的位置”应为“代许明的位置”。
              转继承的结论正确；这里保留AI原文，方便对照实际效果。
            </aside>
          )}
          <div className={s.result}>
            <DirectAnswerFeedback
              result={sample.result}
              answer={sample.answer}
              reference={sample.reference}
              questionId={sample.questionId}
              questionRevision={sample.revision}
              status="ready"
              studentReading
            />
          </div>
          <details className={s.details}>
            <summary>看看同一案例的选择题</summary>
            <p>{sample.choice.prompt}</p>
            <ul>
              {sample.choice.options.map((option) => (
                <li key={option.id}>
                  {option.id.toUpperCase()}. {option.text}
                </li>
              ))}
            </ul>
            <h3>选择题参考</h3>
            <AnswerReference
              questionId={sample.choice.questionId}
              questionRevision={sample.choice.revision}
              reference={sample.choice.reference}
            />
          </details>
          <details className={s.details}>
            <summary>看看这份作答会留下怎样的学习记录</summary>
            <p className={s.metrics}>
              以下仅展示模拟作答产生的记录，不计入你的学习情况。
            </p>
            <TopicLearning summary={sample.learning} compact />
          </details>
          <a
            href={`/lab/practice?subject=civil-law&question=${encodeURIComponent(sample.questionId)}`}
          >
            自己试答这道题 →
          </a>
        </article>
      ))}
      <nav className={s.nav} aria-label="返回学习">
        <a href="/lab/study?subject=civil-law">民法学习首页</a>
        <a href="/lab/assessment?subject=civil-law">民法综合练习</a>
      </nav>
    </main>
  );
}
