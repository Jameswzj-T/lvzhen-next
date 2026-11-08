import { readFile } from "node:fs/promises";
import { join } from "node:path";
import {
  trademarkG8Chapters,
  trademarkG8SubjectForQuestion,
  trademarkG8Topics,
} from "@/content/trademark-g8";
import { trademarkG8TeacherPublications } from "@/content/trademark-g8-feedback-publications";
import { remainingG6TeacherPublications } from "@/content/remaining-g6-feedback-publications";
import { topicFor, exerciseRevision } from "@/content/fault-catalog";
import { remainingG6SubjectForQuestion } from "@/content/remaining-g6";
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
        join(process.cwd(), "artifacts/trademark-g8-20261102", name),
        "utf8",
      ),
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

/** Parent route enforces local-only access. Reading fixed samples never sends. */
export async function TrademarkReading({ chapter }: { chapter?: string }) {
  const chapters = [
    ...trademarkG8Chapters,
    {
      id: "legacy",
      title: "2026旧题对照",
      topicIds: ["remaining-g6-trademark-prior"],
    },
  ];
  const selected =
    chapters.find((item) => item.id === chapter) ?? trademarkG8Chapters[0];
  const topics = [
    ...trademarkG8Topics,
    topicFor("remaining-g6-trademark-prior")!,
  ].filter((topic) => selected.topicIds.includes(topic.id));
  const publications = {
    ...remainingG6TeacherPublications,
    ...trademarkG8TeacherPublications,
  };
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
        sample.contentId !== publications[sample.input.exerciseId] ||
        sample.input.exerciseRevision !==
          exerciseRevision(sample.input.exerciseId)
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
        <a href="/lab/study?subject=intellectual-property">返回知识产权学习</a>
        <p className={s.eyebrow}>律真 · 商标法版本练习</p>
        <h1>{selected.title}</h1>
        <p>
          2027版采用2027年1月1日起施行文本，题干事实均在该日期以后。2026旧题继续采用原事实和原依据，可切换对照。
        </p>
        <nav className={s.nav} aria-label="选择新法知识组">
          {chapters.map((item) => (
            <a
              key={item.id}
              href={`?references=trademark-g8&chapter=${item.id}`}
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
            const subject =
              trademarkG8SubjectForQuestion(q.id) ??
              remainingG6SubjectForQuestion(q.id);
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
                  <section data-trademark-model-example={example.sample.id}>
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
                      questionRevision={exerciseRevision(q.id)}
                      status="ready"
                      studentReading
                    />
                    {notes
                      .filter((note) => note.sampleId === example.sample.id)
                      .map((note) => (
                        <p
                          key={note.sampleId}
                          className={s.notice}
                          data-trademark-review-note={note.sampleId}
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
