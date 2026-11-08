import React from "react";
import { LearningFrame } from "../../_components/learning-frame";
import {
  TeacherAnswerFeedback,
  TeacherFeedbackRecords,
} from "../../_components/teacher-answer-feedback";
import { InquiryExplanation } from "../../ask/inquiry-explanation";
import type { LearningProcessExample } from "./example-data";
import { EXAMPLE_PRACTICE_HREF } from "./example-data";
import d from "../../_components/reading-document.module.css";
import s from "./example.module.css";

export const exampleSteps = [
  {
    id: "initial",
    title: "第一次作答",
    outcome: "答对两点，关键立场还没选定",
  },
  {
    id: "clarification",
    title: "问清楚",
    outcome: "明确选择，并说明不能全免的理由",
  },
  {
    id: "reanswer",
    title: "再答一次",
    outcome: "另存完整新答，三点获得认可",
  },
] as const;
export type ExampleStep = (typeof exampleSteps)[number]["id"];

export function LearningExampleView({
  example,
  step,
}: {
  example: LearningProcessExample;
  step: ExampleStep;
}) {
  const selected = exampleSteps.find((item) => item.id === step)!;
  const answer = step === "initial" ? example.initial : example.reanswer;
  const next = exampleSteps[exampleSteps.indexOf(selected) + 1];
  return (
    <LearningFrame section="practice" status="只读虚构示例">
      <main id="learning-main" className={`${s.workspace} ${d.document}`}>
        <header className={s.intro}>
          <p className={s.eyebrow}>虚构答卷 · 已保存的真实 DeepSeek 反馈</p>
          <h1>示例学习过程</h1>
          <p className={d.paragraph}>
            同一道题，从没选定立场，到问清理由、另写完整答案。三份文字均由开发者虚构；反馈是
            2026年10月9日已保存的真实回复。
          </p>
          <p className={d.paragraph}>
            下面按“输入 → 后台记录与处理 →
            用户看到的反馈”展示。这里可以检查系统如何工作；正常答题页只直接讲题。切换和重看不会调用模型，也不写入你的答卷或掌握记录。
          </p>
          <a className={s.primary} href={EXAMPLE_PRACTICE_HREF}>
            看过示例后练这一题
          </a>
          <p className={d.note}>
            已看过示例，此次作为参考后练习。已有原答保留，未交草稿继续写；示例不会填入答题框。
          </p>
          <a
            href="/lab/practice?subject=civil-law&view=library"
            className={s.next}
          >
            另选题目独立练习
          </a>
          <p className={d.note}>可从现有题库选一道你未看过示例或参考的题。</p>
        </header>

        <nav className={s.steps} aria-label="示例学习步骤">
          {exampleSteps.map((item, index) => (
            <a
              key={item.id}
              href={`/lab/practice/example?step=${item.id}`}
              aria-current={item.id === step ? "step" : undefined}
            >
              <span className={s.number}>{index + 1}</span>
              <span>
                <strong>{item.title}</strong>
                <span className={s.outcome}>{item.outcome}</span>
              </span>
            </a>
          ))}
        </nav>

        <details className={`${d.answerDetails} ${s.question}`}>
          <summary>本题案情与设问：{example.question.title}</summary>
          <p className={d.paragraph}>{example.question.facts}</p>
          <p className={d.paragraph}>
            <strong>本题问：</strong>
            {example.question.prompt}
          </p>
        </details>

        <section aria-label={selected.title} data-learning-example-step={step}>
          <h2 className={d.heading}>
            {exampleSteps.indexOf(selected) + 1}. {selected.title}
          </h2>
          {step === "clarification" ? (
            <>
              <h3 className={d.subheading}>输入：学生接着问</h3>
              <blockquote className={d.original}>
                {example.clarification.text}
              </blockquote>
              <section aria-label="后台记录与系统处理" data-example-backend>
                <h3 className={d.subheading}>后台记录与系统处理</h3>
                <p className={d.paragraph}>
                  系统另存这次问题，只发送本题材料和这段提问给
                  DeepSeek。解释另存，不覆盖第一份答案或它的旧反馈，也不因此记为掌握。
                </p>
                <p className={d.note}>
                  下面展示当时保存的真实回复，不是重新生成；引用依据可在回复下方展开。
                </p>
              </section>
              <h3 className={d.subheading}>用户实际看到的反馈</h3>
              <InquiryExplanation
                text={example.clarification.text}
                reply={example.clarification.reply}
                pending={false}
                showQuestion={false}
              />
            </>
          ) : (
            <>
              <p className={d.paragraph}>
                {step === "initial"
                  ? "先看虚构学生完整写了什么，再看当时的判断。一处没有原文依据的推断，保留在后台原记录中，并明确标出独立复核来源。"
                  : "看过解释后，另写一份完整答案，再按新答独立评阅。第一份原答和待核反馈仍保留，不能据此认定已经永久掌握。"}
              </p>
              <h3 className={d.subheading}>输入：虚构学生写下的答案</h3>
              <blockquote className={d.original} data-example-original>
                {answer.original.answer}
              </blockquote>
              <section aria-label="后台记录与系统处理" data-example-backend>
                <h3 className={d.subheading}>后台记录与系统处理</h3>
                <p className={d.paragraph}>
                  先保存这份原答，再把本题材料和这份答案交给
                  DeepSeek；其他历史答卷和账号资料不随请求发送。回复单独保存，后来的重答不会覆盖它。
                </p>
                {step === "reanswer" && (
                  <p className={d.paragraph}>
                    这次已看过前面的反馈，所以是练习后的重答，不当作第一次独立答对。
                  </p>
                )}
                <details className={d.answerDetails}>
                  <summary>展开原始反馈和核对记录</summary>
                  <TeacherFeedbackRecords view={answer.view} />
                </details>
              </section>
              <h3 className={d.subheading}>用户实际看到的反馈</h3>
              <p className={d.note}>
                以下用当前页面排版展示当时保存的回复；没有重新生成或偷偷改写模型原话。
              </p>
              <TeacherAnswerFeedback view={answer.view} showRecords={false} />
            </>
          )}
        </section>

        <footer className={s.footer}>
          {next && (
            <a
              className={s.next}
              href={`/lab/practice/example?step=${next.id}`}
            >
              接着看：{next.title} →
            </a>
          )}
          <a className={s.primary} href={EXAMPLE_PRACTICE_HREF}>
            看过示例后练这一题
          </a>
          <p className={d.note}>
            这是一个固定虚构过程的回放，不是真人学习效果或全题库准确率证明。
          </p>
        </footer>
      </main>
    </LearningFrame>
  );
}
