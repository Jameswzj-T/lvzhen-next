import { readFile } from "node:fs/promises";
import { join } from "node:path";
import {
  annualG8Chapters,
  annualG8Revision,
  annualG8SubjectForQuestion,
  annualG8Topics,
} from "@/content/annual-g8";
import { annualG8TeacherPublications } from "@/content/annual-g8-feedback-publications";
import { validateUnitFeedbackResult } from "@/evaluation/unit-feedback-contract";
import { DirectAnswerFeedback } from "../../_components/direct-answer-feedback";
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
async function read(name: string) {
  try {
    return JSON.parse(
      await readFile(
        join(process.cwd(), "artifacts/annual-g8-20261102", name),
        "utf8",
      ),
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

/** Parent route enforces local-only access. Reading fixed samples never sends. */
export async function AnnualReading({ chapter }: { chapter?: string }) {
  const selected =
    annualG8Chapters.find((item) => item.id === chapter) ?? annualG8Chapters[0];
  const topics = annualG8Topics.filter((topic) =>
    selected.topicIds.includes(topic.id),
  );
  const plan = await read("plan.json");
  const review = await read("semantic-review.json");
  const notes: { sampleId: string; learnerClarification: string }[] =
    review?.scopeNotes ?? [];
  const samples: Sample[] = plan?.synthetic === true ? plan.prepared : [];
  const examples = await Promise.all(
    samples.map(async (sample) => {
      const completion = await read(sample.id + ".completion.json");
      if (!completion?.accepted) return null;
      const saved = await read(sample.id + ".reply.json");
      if (
        saved?.reply?.result?.source !== "real_provider" ||
        sample.contentId !==
          annualG8TeacherPublications[sample.input.exerciseId]
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
        return { sample, result, completion };
      } catch {
        return null;
      }
    }),
  );
  return (
    <main className={s.page}>
      <header className={s.header}>
        <a href="/lab/study">返回学习</a>
        <p className={s.eyebrow}>律真 · 新法核心练习</p>
        <h1>{selected.title}</h1>
        <p>
          每组两个案情，都有选择题和完整自由作答。这里可直接对照参考，也能看本轮模拟原答的实际AI讲解。
        </p>
        <nav className={s.nav} aria-label="选择新法知识组">
          {annualG8Chapters.map((item) => (
            <a
              key={item.id}
              href={`?references=annual-g8&chapter=${item.id}`}
              aria-current={selected.id === item.id ? "page" : undefined}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </header>
      {topics.flatMap((topic) =>
        topic.exercises
          .filter((q) => q.kind === "subjective")
          .map((q) => {
            const example = examples.find(
              (item) => item?.sample.input.exerciseId === q.id,
            );
            const subject = annualG8SubjectForQuestion(q.id);
            return (
              <article key={q.id} className={s.card} id={q.id}>
                <h2>{q.title.replace("（自由作答）", "")}</h2>
                <p>{q.facts}</p>
                <p>
                  <strong>{q.prompt}</strong>
                </p>
                <p>
                  <a href={`/lab/practice?subject=${subject}&question=${q.id}`}>
                    自己写一份答案 →
                  </a>
                  {" · "}
                  <a
                    href={`/lab/practice?subject=${subject}&question=${q.caseId}-choice`}
                  >
                    做选择题 →
                  </a>
                </p>
                <h3>参考答案</h3>
                <p className={s.answer}>{q.reference}</p>
                {example ? (
                  <section data-annual-model-example={example.sample.id}>
                    <h3>模拟原答</h3>
                    <blockquote className={s.answer}>
                      {example.sample.input.answer}
                    </blockquote>
                    <p className={s.metrics}>
                      DeepSeek实际返回 ·{" "}
                      {(example.completion.elapsedMs / 1000).toFixed(2)}秒
                    </p>
                    <DirectAnswerFeedback
                      result={example.result}
                      answer={example.sample.input.answer}
                      reference={q.reference}
                      questionId={q.id}
                      questionRevision={annualG8Revision}
                      status="ready"
                      studentReading
                    />
                    {notes
                      .filter((note) => note.sampleId === example.sample.id)
                      .map((note) => (
                        <p
                          key={note.sampleId}
                          className={s.notice}
                          data-annual-review-note={note.sampleId}
                        >
                          <strong>试读提醒：</strong>
                          {note.learnerClarification}
                        </p>
                      ))}
                  </section>
                ) : (
                  <p className={s.metrics}>
                    本题没有本轮已保存的AI示例，可直接进入练习。
                  </p>
                )}
              </article>
            );
          }),
      )}
    </main>
  );
}
