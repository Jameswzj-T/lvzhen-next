import { readFile } from "node:fs/promises";
import path from "node:path";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { z } from "zod";
import { progressSchema } from "@/domain/fault-progress";
import { projectCivilAssessmentRecord } from "@/domain/civil-assessment-records";
import { projectTopicLearning } from "@/domain/topic-learning-summary";
import { submittedFeedbackFor } from "@/domain/submitted-feedback";
import { validateUnitFeedbackResult } from "@/evaluation/unit-feedback-contract";
import { exerciseFor, exerciseRevision } from "@/content/fault-catalog";
import { CivilPracticeReview } from "@/app/lab/assessment/civil-practice-review";
import { DirectAnswerFeedback } from "@/app/lab/_components/direct-answer-feedback";
import { TopicLearning } from "@/app/lab/_components/topic-learning";
import s from "../preview.module.css";

const folder = path.join(process.cwd(), "artifacts/civil-mixed-loop-20261028");
const planSchema = z.object({
  synthetic: z.literal(true),
  runId: z.string(),
  prepared: z
    .array(
      z.object({
        index: z.number().int().nonnegative(),
        questionId: z.string(),
        questionRevision: z.string(),
        topicId: z.string(),
        title: z.string(),
        facts: z.string(),
        prompt: z.string(),
        reference: z.string().nullable(),
        contentId: z.string(),
        taskId: z.string(),
        original: z.object({ id: z.string(), answer: z.string() }),
      }),
    )
    .length(4),
});

async function loadExample() {
  const [planBytes, stateBytes] = await Promise.all([
    readFile(path.join(folder, "plan.json"), "utf8"),
    readFile(path.join(folder, "checkpoint-after-3.json"), "utf8"),
  ]);
  const plan = planSchema.parse(JSON.parse(planBytes));
  const state = progressSchema.parse(JSON.parse(stateBytes));
  const record = projectCivilAssessmentRecord(state, plan.runId);
  if (!record || record.questions.length !== 4)
    throw Error("mixed-review-record");
  const samples = plan.prepared.map((sample, index) => {
    if (
      sample.index !== index ||
      record.questions[index].questionId !== sample.questionId
    )
      throw Error("mixed-review-order");
    const question = exerciseFor(sample.questionId);
    if (
      !question ||
      exerciseRevision(sample.questionId) !== sample.questionRevision
    )
      throw Error("mixed-review-question-version");
    const saved = submittedFeedbackFor(state, sample.original.id);
    const result = validateUnitFeedbackResult(saved, {
      answerId: sample.original.id,
      originalText: sample.original.answer,
      questionId: sample.questionId,
      questionRevision: sample.questionRevision,
      taskId: sample.taskId,
      contentId: sample.contentId,
    });
    return {
      ...sample,
      reference: sample.reference ?? question.reference,
      result,
      learning: projectTopicLearning(state, sample.topicId),
    };
  });
  return { record, samples };
}

/** Local saved example: no submission, model request or learner-record write. */
export default async function Page() {
  const host = (await headers()).get("host");
  if (
    (process.env.LVZHEN_ENV ?? "local") !== "local" ||
    !["localhost:3107", "127.0.0.1:3107"].includes(host ?? "")
  )
    notFound();
  const example = await loadExample().catch(() => null);
  if (!example) notFound();
  const record = {
    ...example.record,
    questions: example.record.questions.map((q) => ({
      ...q,
      href: `#question-${q.questionNumber}`,
    })),
  };
  return (
    <main className={s.page}>
      <header className={s.header}>
        <p className={s.eyebrow}>律真 · 民法综合练习</p>
        <h1>一套题做完，哪里还需要补</h1>
        <p>
          四个独立案例，分别涉及物权、合同、婚姻家庭和侵权。这份模拟答卷有答对的、漏理由的，也有判断错误的。
        </p>
        <p className={s.metrics}>
          以下展示已保存的实际AI讲解，不会写入你的学习记录；回看不会重新评阅。
        </p>
      </header>
      <CivilPracticeReview record={record} />
      {example.samples.map((sample, index) => (
        <article
          key={sample.questionId}
          id={`question-${index + 1}`}
          className={s.card}
        >
          <p className={s.eyebrow}>第 {index + 1} / 4 题</p>
          <h2>{sample.title}</h2>
          <p>{sample.facts}</p>
          <p>
            <strong>{sample.prompt}</strong>
          </p>
          <h3>模拟原答</h3>
          <blockquote className={s.answer}>{sample.original.answer}</blockquote>
          <DirectAnswerFeedback
            result={sample.result}
            answer={sample.original.answer}
            reference={sample.reference}
            questionId={sample.questionId}
            questionRevision={sample.questionRevision}
            status="ready"
            studentReading
          />
          {index === 2 && (
            <aside className={s.notice}>
              这段讲解里“前配偶已经不存在”措辞不准，应说“前一段婚姻已经解除”。题目没有说前配偶去世；不影响本题重婚无效的结论。这里保留AI原文供对照。
            </aside>
          )}
          <details className={s.details}>
            <summary>这部分的学习记录示例</summary>
            <TopicLearning summary={sample.learning} compact />
          </details>
        </article>
      ))}
      <nav className={s.nav} aria-label="返回学习">
        <a href="/lab/assessment?subject=civil-law&paper=civil-integrated-mixed-subjective">
          自己做一套民法混合练习
        </a>
        <a href="/lab/study?subject=civil-law">回到民法学习</a>
      </nav>
    </main>
  );
}
