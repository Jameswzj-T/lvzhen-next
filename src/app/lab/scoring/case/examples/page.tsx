import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { LearningFrame } from "@/app/lab/_components/learning-frame";
import { ScoringFeedback } from "@/app/lab/scoring/scoring-feedback";
import { validateScoringTrialResponse } from "@/evaluation/scoring-trial-contract";
import { capstoneScoringQuestion } from "@/evaluation/capstone-scoring-card";
import { currentCapstoneQuestion } from "@/evaluation/capstone-scoring-card-v2";
import s from "../../scoring.module.css";

export const metadata: Metadata = { title: "整案答卷对照 · 律真" };

const examples = [
  { id: "W1", title: "完整作答", description: "按五问顺序作答", score: 20 },
  {
    id: "W4",
    title: "打乱顺序",
    description: "倒序作答，内容仍完整",
    score: 20,
  },
  {
    id: "W3",
    title: "责任判断有误",
    description: "第3、4问的归责结论错误",
    score: 12,
  },
] as const;
const currentExamples = [
  {
    id: "U1",
    title: "第一份原答",
    description: "用户的完整作答，旧版与本版均20分",
    score: 20,
  },
  {
    id: "U2",
    title: "第二份原答",
    description: "保留用户原文；旧版5分，本版按独立考点得9分",
    score: 9,
  },
  {
    id: "U2_INJURY",
    title: "只补重伤评价",
    description: "在第二份原答上，只补第2问的重伤加重评价",
    score: 10,
  },
  {
    id: "U2_JOIN",
    title: "只补共犯分析",
    description: "只补第4问排除先前共犯的结论与理由",
    score: 11,
  },
  {
    id: "U2_ORAL",
    title: "同义口语改写",
    description: "只改第2问的表达方式，法律含义保持不变",
    score: 9,
  },
  {
    id: "U2_DENIAL",
    title: "反向结论",
    description: "第2问虽保留追赶与击打事实，却否定抢劫结论",
    score: 6,
  },
] as const;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    sample?: string | string[];
    version?: string | string[];
  }>;
}) {
  const host = (await headers()).get("host");
  if (
    (process.env.LVZHEN_ENV ?? "local") !== "local" ||
    !["localhost:3107", "127.0.0.1:3107"].includes(host ?? "")
  )
    notFound();

  const params = await searchParams;
  const current = params.version === "current";
  const question = current ? currentCapstoneQuestion : capstoneScoringQuestion;
  const choices = current ? currentExamples : examples;
  const requested = params.sample;
  const selected =
    choices.find((entry) => entry.id === requested) ?? choices[0];
  // Only previously saved outputs are shown. No credentials or model calls.
  let raw: unknown;
  try {
    raw = JSON.parse(
      await readFile(
        join(
          process.cwd(),
          current
            ? "artifacts/capstone-points-integration-2026-09-24/feedback-fixtures.json"
            : "artifacts/capstone-answer-2026-09-23/feedback-fixtures.json",
        ),
        "utf8",
      ),
    );
  } catch {
    notFound();
  }
  if (!Array.isArray(raw)) notFound();
  const row = raw.find((item) => item?.id === selected.id);
  if (!row?.response || typeof row.response.answer !== "string") notFound();
  if (current && row.exerciseRevision !== question.exerciseRevision) notFound();
  let response;
  try {
    response = validateScoringTrialResponse(
      question.id,
      row.response.answer,
      row.response,
    );
  } catch {
    notFound();
  }
  const criterionIds = question.parts?.flatMap((part) => part.criterionIds);
  if (
    response.status !== "ready" ||
    response.total !== selected.score ||
    response.maxScore !== question.maxScore ||
    response.items.length !== criterionIds?.length ||
    response.items.some((item, i) => item.criterionId !== criterionIds[i])
  )
    notFound();

  return (
    <LearningFrame section="practice" user={null} status="示例回放">
      <main id="learning-main" className={s.workspace}>
        <div className={s.heading}>
          <div>
            <a href="/lab/scoring/case">仓库夜班之后 / 返回自己作答</a>
            <h1>{current ? "看清每一分的依据" : "三份答案，同一道题"}</h1>
            <p>
              {current
                ? "两份真人原答，四种受控变化。按五问查看独立得分点。"
                : "按原有采分规则回放，原答与成绩保持不变。当前练习已细分采分项。"}
            </p>
          </div>
          <span className={s.badge}>已存结果回放</span>
        </div>
        <nav className={s.exampleTabs} aria-label="选择示例答卷">
          {choices.map((entry) => (
            <a
              key={entry.id}
              href={`/lab/scoring/case/examples?sample=${entry.id}${current ? "&version=current" : ""}`}
              aria-current={entry.id === selected.id ? "page" : undefined}
            >
              <strong>{entry.title}</strong>
              <span>{entry.score} / 20 分</span>
            </a>
          ))}
        </nav>
        <p className={s.exampleContext}>
          {current
            ? "前两份保留用户原文；后四份只改变指定内容。使用9月24日已保存的DeepSeek回复，切换不会调用模型；原有成绩不被覆盖。"
            : "三份均为自编模拟答卷，使用上轮已保存的真实模型结果。切换示例不会重新评阅；分数是产品训练分。"}
        </p>
        <nav className={s.caseJumps} aria-label="示例原答与反馈">
          <a href="#example-answer">看原答</a>
          <a href="#example-feedback">看反馈 ↓</a>
        </nav>
        <div className={`${s.grid} ${s.exampleGrid}`}>
          <section id="example-answer" className={s.case} aria-label="示例原答">
            <div className={s.caption}>
              示例原答 <span>{response.answer.length} 字</span>
            </div>
            <h2>{selected.title}</h2>
            <p className={s.exampleDescription}>{selected.description}</p>
            <div className={s.exampleOriginal}>{response.answer}</div>
            <details className={s.exampleQuestion}>
              <summary>查看本题案情与五问</summary>
              <p>{question.facts}</p>
              <ol>
                {question.parts?.map((part) => (
                  <li key={part.id}>{part.question}</li>
                ))}
              </ol>
            </details>
          </section>
          <section
            id="example-feedback"
            className={s.answer}
            aria-label="已存评阅结果"
          >
            <h2 className={s.exampleFeedbackTitle}>系统反馈</h2>
            <ScoringFeedback
              result={response}
              groups={question.parts}
              historical
              sourceNote="上轮实测结果回放 · 训练分并非官方成绩"
            />
          </section>
        </div>
      </main>
    </LearningFrame>
  );
}
