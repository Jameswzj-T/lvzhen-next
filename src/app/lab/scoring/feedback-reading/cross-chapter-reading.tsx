import { readFile } from "node:fs/promises";
import { join } from "node:path";
import {
  civilProcedureCrossChapterCases,
  civilProcedureCrossChapterRevision,
} from "@/content/civil-procedure-cross-chapter";
import { civilProcedureCrossChapterTeacherPublications } from "@/content/civil-procedure-cross-chapter-feedback-publications";
import { validateUnitFeedbackResult } from "@/evaluation/unit-feedback-contract";
import s from "./preview.module.css";

type Sample = {
  id: string;
  contentId: string;
  input: {
    exerciseId: string;
    exerciseRevision: string;
    attemptId: string;
    answer: string;
  };
};
const directory = "artifacts/civpro-cross-chapter-20261030";
async function read(name: string) {
  try {
    return JSON.parse(
      await readFile(join(process.cwd(), directory, name), "utf8"),
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

/** Read saved synthetic examples only. Opening this page never requests AI. */
export async function CrossChapterReading() {
  const plan = (await read("plan.json")) as { prepared: Sample[] } | null;
  const examples = await Promise.all(
    (plan?.prepared ?? []).map(async (sample) => {
      if (
        !/^[a-z0-9-]+$/.test(sample.id) ||
        sample.input.exerciseRevision !== civilProcedureCrossChapterRevision ||
        civilProcedureCrossChapterTeacherPublications[
          sample.input.exerciseId
        ] !== sample.contentId
      )
        return null;
      const completion = await read(`${sample.id}.completion.json`);
      const saved = await read(`${sample.id}.reply.json`);
      if (!completion?.accepted || !saved?.reply?.result) return null;
      const result = validateUnitFeedbackResult(saved.reply.result, {
        questionId: sample.input.exerciseId,
        questionRevision: sample.input.exerciseRevision,
        answerId: sample.input.attemptId,
        contentId: sample.contentId,
        originalText: sample.input.answer,
      });
      return { sample, result, elapsedMs: completion.elapsedMs as number };
    }),
  );
  return (
    <main className={s.page}>
      <header className={s.header}>
        <a href="/lab/practice?subject=civil-procedure&view=library">
          返回民诉练习
        </a>
        <p className={s.eyebrow}>律真 · 民诉综合练习</p>
        <h1>把一段程序走完整</h1>
        <p>
          两组原创案情，每组五问。可以先自己作答，再展开参考答案和试答讲解。
        </p>
        <nav className={s.nav} aria-label="选择案例">
          {civilProcedureCrossChapterCases.map((item) => (
            <a key={item.key} href={`#${item.key}`}>
              {item.title}
            </a>
          ))}
        </nav>
      </header>
      {civilProcedureCrossChapterCases.map((item) => (
        <article key={item.id} id={item.key} className={s.card}>
          <h2>{item.title}</h2>
          <p className={s.answer}>{item.facts}</p>
          <a href={`/lab/practice?subject=civil-procedure&review=${item.key}`}>
            开始作答这五问 →
          </a>
          {item.questions.map((q) => {
            const example = examples.find(
              (row) => row?.sample.input.exerciseId === q.id,
            );
            return (
              <section key={q.id} id={q.id}>
                <h3>{q.title}</h3>
                <p>{q.prompt}</p>
                <details className={s.details}>
                  <summary>参考答案与作答要点</summary>
                  <p>{q.reference}</p>
                  <ul>
                    {q.criteria?.map((point) => (
                      <li key={point.id}>
                        <strong>{point.label}：</strong>
                        {point.meaning}
                      </li>
                    ))}
                  </ul>
                </details>
                {example && (
                  <details className={s.details}>
                    <summary>看一份模拟答卷的实际AI讲解</summary>
                    <blockquote className={s.answer}>
                      {example.sample.input.answer}
                    </blockquote>
                    <p className={s.metrics}>
                      DeepSeek实际返回 · {(example.elapsedMs / 1000).toFixed(2)}
                      秒
                    </p>
                    <p data-cross-chapter-model-example={example.sample.id}>
                      {example.result.view.studentResponse ??
                        example.result.view.substantiveIssue}
                    </p>
                  </details>
                )}
              </section>
            );
          })}
        </article>
      ))}
    </main>
  );
}
