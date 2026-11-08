import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { g8CompletionRows } from "@/content/g8-completion";
import { exerciseFor, exerciseRevision } from "@/content/fault-catalog";
import {
  practiceSubject,
  practiceSubjectInfo,
  type PracticeSubject,
} from "@/content/practice-set";
import {
  prepareCurrentQuestionFeedback,
  type RegisteredQuestionOriginal,
} from "@/evaluation/registered-question-feedback-task";
import { currentQuestionDispatch } from "@/evaluation/current-question-teacher-dispatch";
import { validateUnitFeedbackResult } from "@/evaluation/unit-feedback-contract";
import {
  prepareQuestionInquiry,
  inquiryDigest,
} from "@/evaluation/question-inquiry-task";
import {
  inquiryViewSchema,
  type InquiryIdentity,
} from "@/domain/question-inquiry";
import { DirectAnswerFeedback } from "../../_components/direct-answer-feedback";
import s from "./preview.module.css";

type Sample = {
  id: string;
  type: "review" | "inquiry";
  questionId: string;
  subject?: PracticeSubject;
  input: RegisteredQuestionOriginal;
  original: { id: string; answer: string; choice: string };
  identity: InquiryIdentity;
  text: string;
  contentId: string;
  bodySHA256: string;
};

async function read(name: string) {
  try {
    return JSON.parse(
      await readFile(
        join(process.cwd(), "artifacts/g8-main-20261102", name),
        "utf8",
      ),
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}
/** Parent guard restricts this fixed, read-only QA page to the local service. */
export async function G8CompletionReading({ chapter }: { chapter?: string }) {
  const selected = chapter ?? "writing";
  const plan = await read("plan.json"),
    review = await read("semantic-review.json");
  const samples: Sample[] = plan?.synthetic === true ? plan.prepared : [];
  const subjects = [...new Set(g8CompletionRows.map((r) => r.subject))];
  const notes: { sampleId: string; learnerClarification: string }[] =
    review?.scopeNotes ?? [];
  const examples = await Promise.all(
    samples.map(async (sample) => {
      if (
        selected === "inquiry"
          ? sample.type !== "inquiry"
          : selected === "writing"
            ? !sample.questionId.startsWith("g8-writing-")
            : sample.subject !== selected
      )
        return null;
      const completion = await read(sample.id + ".completion.json");
      if (!completion?.accepted) return null;
      const raw = await read(sample.id + ".result.json"),
        q = exerciseFor(sample.questionId);
      if (!q) return null;
      try {
        if (sample.type === "inquiry") {
          const task = prepareQuestionInquiry(sample.identity),
            result = inquiryViewSchema.parse(raw);
          if (
            result.taskId !== task.taskId ||
            inquiryDigest(result.identity) !== inquiryDigest(sample.identity) ||
            inquiryDigest(task.body) !== sample.bodySHA256
          )
            return null;
          if (
            result.basis.some(
              (b) =>
                !task.material.publicRules.some(
                  (r) =>
                    r.sourceId === b.sourceId && r.excerpt.includes(b.quote),
                ),
            )
          )
            return null;
          return { sample, completion, q, inquiry: result };
        }
        const task = prepareCurrentQuestionFeedback(sample.input).task;
        if (
          task.contentId !== sample.contentId ||
          inquiryDigest(currentQuestionDispatch(task).body) !==
            sample.bodySHA256
        )
          return null;
        const result = validateUnitFeedbackResult(raw, {
          questionId: q.id,
          questionRevision: exerciseRevision(q.id),
          answerId: sample.original.id,
          contentId: sample.contentId,
          originalText: sample.original.choice || sample.original.answer,
        });
        return { sample, completion, q, feedback: result };
      } catch {
        return null;
      }
    }),
  );
  return (
    <main className={s.page}>
      <header className={s.header}>
        <a href="/lab/assessment?subject=all-subjects">返回训练目录</a>
        <p className={s.eyebrow}>律真 · G8本机试读</p>
        <h1>
          {selected === "writing"
            ? "完整写作与讲解"
            : selected === "inquiry"
              ? "四组旧题答疑"
              : "多选与不定项解析"}
        </h1>
        <p>对照模拟作答看实际反馈。阅读不调用模型，也不改动你的学习记录。</p>
        <nav className={s.nav} aria-label="选择G8试读内容">
          <a
            href="?references=g8-completion&chapter=writing"
            aria-current={selected === "writing" ? "page" : undefined}
          >
            完整写作
          </a>
          <a
            href="?references=g8-completion&chapter=inquiry"
            aria-current={selected === "inquiry" ? "page" : undefined}
          >
            本题追问
          </a>
          {subjects.map((subject) => (
            <a
              key={subject}
              href={`?references=g8-completion&chapter=${subject}`}
              aria-current={selected === subject ? "page" : undefined}
            >
              {practiceSubjectInfo(subject).label}
            </a>
          ))}
        </nav>
      </header>
      {examples
        .filter((x) => x !== null)
        .map(({ sample, completion, q, inquiry, feedback }) => (
          <article
            key={sample.id}
            className={s.card}
            data-g8-main-model-example={sample.id}
          >
            <p className={s.eyebrow}>
              {
                practiceSubjectInfo(
                  sample.subject ?? practiceSubject(q.id) ?? "criminal-law",
                ).label
              }
            </p>
            <h2>{q.title}</h2>
            <p className={s.answer}>{q.facts}</p>
            <p className={s.prompt}>{q.prompt}</p>
            {q.options && (
              <ul>
                {q.options.map((o) => (
                  <li key={o.id}>
                    {o.id.toUpperCase()} · {o.text}
                  </li>
                ))}
              </ul>
            )}
            {inquiry ? (
              <>
                <h3>模拟追问</h3>
                <p className={s.answer}>{sample.text}</p>
                <h3>实际答疑</h3>
                <p className={s.answer}>{inquiry.explanation}</p>
                {inquiry.uncertainty && <p>{inquiry.uncertainty}</p>}
                <ul>
                  {inquiry.sources.map((source) => (
                    <li key={source.sourceId}>
                      <a href={source.url}>{source.title}</a>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <h3>模拟原答</h3>
                <blockquote className={s.answer}>
                  {sample.original.choice
                    ? `选择：${sample.original.choice.toUpperCase()}`
                    : sample.original.answer}
                </blockquote>
                <h3>参考{q.kind === "objective" ? "解析" : "写法"}</h3>
                <p className={s.answer}>{q.reference}</p>
                <DirectAnswerFeedback
                  result={feedback!}
                  answer={sample.original.choice || sample.original.answer}
                  reference={q.reference}
                  questionId={q.id}
                  questionRevision={exerciseRevision(q.id)}
                  status="ready"
                  studentReading
                />
              </>
            )}
            <p className={s.metrics}>
              本次请求及保存约{(completion.elapsedMs / 1000).toFixed(2)}秒 ·
              已保存，可回看
            </p>
            {notes
              .filter((n) => n.sampleId === sample.id)
              .map((n, i) => (
                <p key={i} className={s.notice} data-g8-main-review-note>
                  {n.learnerClarification}
                </p>
              ))}
            <a
              href={
                q.id.startsWith("g8-writing-")
                  ? `/lab/assessment?subject=all-subjects&paper=${q.id}`
                  : `/lab/practice?subject=${sample.subject ?? practiceSubject(q.id) ?? "criminal-law"}&question=${q.id}`
              }
            >
              自己作答 →
            </a>
          </article>
        ))}
      {examples.filter(Boolean).length === 0 && (
        <p>本项尚无本轮保存的AI示例，可从训练目录进入作答。</p>
      )}
    </main>
  );
}
