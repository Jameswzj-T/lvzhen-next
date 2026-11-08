import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { comprehensiveG7Papers } from "@/content/comprehensive-g7";
import { exerciseFor, exerciseRevision } from "@/content/fault-catalog";
import { validateUnitFeedbackResult } from "@/evaluation/unit-feedback-contract";
import { AnswerReference } from "../../_components/answer-reference";
import s from "./preview.module.css";

type Sample = {
  id: string;
  paperId: string;
  contentId: string;
  input: {
    exerciseId: string;
    exerciseRevision: string;
    attemptId: string;
    answer: string;
    choice: string;
  };
};
const directory = "artifacts/comprehensive-g7-20261101";
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

/** Fixed fictional submissions only. This server preview never creates a review. */
export async function ComprehensiveReading({ chapter }: { chapter?: string }) {
  const papers = comprehensiveG7Papers.filter((p) => p.mode === "subjective"),
    paper = papers.find((p) => p.id === chapter) ?? papers[0];
  const plan = await read("plan.json");
  const samples: Sample[] = plan?.synthetic === true ? plan.prepared : [];
  const examples = await Promise.all(
    samples
      .filter((x) => x.paperId === paper.id)
      .map(async (sample) => {
        const completion = await read(sample.id + ".completion.json"),
          saved = await read(sample.id + ".reply.json");
        if (
          !completion?.accepted ||
          saved?.reply?.result?.source !== "real_provider"
        )
          return null;
        try {
          const result = validateUnitFeedbackResult(saved.reply.result, {
            questionId: sample.input.exerciseId,
            questionRevision: sample.input.exerciseRevision,
            answerId: sample.input.attemptId,
            contentId: sample.contentId,
            originalText: sample.input.answer,
          });
          return { sample, completion, result };
        } catch {
          return null;
        }
      }),
  );
  return (
    <main className={s.page}>
      <header className={s.header}>
        <a href="/lab/assessment?subject=all-subjects">返回全科综合训练</a>
        <p className={s.eyebrow}>律真 · 综合训练试读</p>
        <h1>{paper.title}</h1>
        <p>
          这里复用已有题目与参考，展示新编模拟答卷及实际AI讲解。查看不会调用模型，也不会改动你的学习记录。
        </p>
        <nav className={s.nav} aria-label="选择综合训练示例">
          {papers.map((p) => (
            <a
              key={p.id}
              href={`?references=comprehensive-g7&chapter=${p.id}`}
              aria-current={paper.id === p.id ? "page" : undefined}
            >
              {p.title}
            </a>
          ))}
        </nav>
        <a href={`/lab/assessment?paper=${paper.id}`}>自己做这组题 →</a>
      </header>
      {paper.kind === "case" && (
        <details className={s.details}>
          <summary>查看完整案情</summary>
          <p className={s.answer}>{exerciseFor(paper.questionIds[0])!.facts}</p>
        </details>
      )}
      {paper.questionIds.map((id, index) => {
        const q = exerciseFor(id)!,
          example = examples.find((x) => x?.sample.input.exerciseId === id);
        return (
          <article key={id} className={s.card} id={id}>
            <p className={s.eyebrow}>第{index + 1}问</p>
            <h2>{q.prompt}</h2>
            {paper.kind !== "case" && (
              <details className={s.details}>
                <summary>查看案情</summary>
                <p className={s.answer}>{q.facts}</p>
              </details>
            )}
            <h3>参考答案</h3>
            <AnswerReference
              questionId={id}
              questionRevision={exerciseRevision(id)}
              reference={q.reference}
              className={s.answer}
            />
            {example ? (
              <section data-g7-model-example={example.sample.id}>
                <h3>模拟原答</h3>
                <blockquote className={s.answer}>
                  {example.sample.input.answer}
                </blockquote>
                <p className={s.metrics}>
                  DeepSeek实际返回 ·{" "}
                  {(example.completion.elapsedMs / 1000).toFixed(2)}秒
                </p>
                <h3>AI讲解</h3>
                <p>
                  {example.result.view.studentResponse ??
                    example.result.view.substantiveIssue}
                </p>
                <details className={s.details}>
                  <summary>查看逐项判断</summary>
                  <ul>
                    {example.result.view.points.map((point) => (
                      <li key={point.id}>
                        <strong>{point.label}：</strong>
                        {point.explanation}
                      </li>
                    ))}
                  </ul>
                </details>
              </section>
            ) : (
              <p className={s.metrics}>
                本问没有本轮已保存的AI示例；参考可直接阅读。
              </p>
            )}
          </article>
        );
      })}
    </main>
  );
}
