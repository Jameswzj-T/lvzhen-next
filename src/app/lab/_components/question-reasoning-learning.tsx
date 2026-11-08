import { QuestionMatrixLearning } from "./question-matrix-learning";
import type { MatrixLearningExamples } from "@/evaluation/rewrite-comparison/matrix-learning";
import React from "react";
import { hasReviewedQuestionReference } from "../../../domain/reviewed-feedback";
import { exerciseRevision } from "../../../content/fault-catalog";
import type { ReasoningLearningExamples } from "@/evaluation/rewrite-comparison/reasoning-readback";
import d from "./reading-document.module.css";

export function hasReasoningLearningExamples(
  paperId: string,
  questionId: string,
  revision: string,
  examples?: ReasoningLearningExamples | null,
) {
  return (
    !!examples &&
    hasReviewedQuestionReference(paperId, questionId) &&
    examples.questionId === questionId &&
    examples.exerciseRevision === revision &&
    examples.scope === "company_form_and_unit_will_reasoning_only" &&
    examples.provenance === "manually_reviewed_fictional_examples"
  );
}

// Public learning examples; no access to the learner's answer or grading state.
export function QuestionReasoningLearning({
  paperId,
  questionId,
  revision,
  examples,
  matrixExamples,
  submitted,
  hasSavedRewrite,
}: {
  paperId: string;
  questionId: string;
  revision: string;
  examples?: ReasoningLearningExamples | null;
  matrixExamples?: MatrixLearningExamples | null;
  submitted: boolean;
  hasSavedRewrite: boolean;
}) {
  if (!submitted || !hasReviewedQuestionReference(paperId, questionId))
    return null;
  if (revision !== exerciseRevision(questionId))
    return (
      <section aria-label="本问新重答反馈与自检" data-daily-rewrite-feedback>
        <h3 className={d.heading}>新重答反馈与自检</h3>
        <p className={d.note}>
          这份原答属于旧题目版本，当前例子不能用于判断它。原答、已有重答与评分保留，不按新题重新评阅。
        </p>
      </section>
    );
  const available = hasReasoningLearningExamples(
    paperId,
    questionId,
    revision,
    examples,
  );
  return (
    <section aria-label="本问新重答反馈与自检" data-daily-rewrite-feedback>
      <h3 className={d.heading}>新重答反馈与自检</h3>
      <p role="status" className={d.paragraph}>
        {hasSavedRewrite
          ? "新重答已保存，尚未评阅，暂不能确认是否改正。原答及其已有评分保留。"
          : "完整回答这一小问并保存后，可以在上方逐字对照原答与独立重答。新重答不会自动评阅。"}
      </p>
      <QuestionMatrixLearning
        paperId={paperId}
        questionId={questionId}
        revision={revision}
        submitted={submitted}
        examples={matrixExamples}
      />
      {available && examples ? (
        <>
          <p className={d.paragraph}>
            先自检两项理由：是否仍以有限责任形式、内部人员亲自实施直接排除单位犯罪？是否结合共同决策与公司用途说明单位意志？同时完整回答设问中的其他要求。
          </p>
          <p className={d.note}>
            停产后是否已以犯罪为主要活动，题设尚不充分；有理由地保留条件判断，不补成已经证实，也不算学生漏答。
          </p>
          <details aria-label="两项理由的已审读虚构例子">
            <summary>看两个例子：用途改清与理由改正有什么区别</summary>
            <p className={d.note}>
              下面是两份已经人工审读的虚构例子，供本题自检，未评阅你上方的原答或重答。
            </p>
            {examples.samples.map((sample) => (
              <article key={sample.id} aria-label={`${sample.id}虚构自检示例`}>
                <h4 className={d.subheading}>虚构例子：{sample.title}</h4>
                <p className={d.paragraph}>{sample.expressed}</p>
                <p className={d.paragraph}>{sample.feedback}</p>
                <h5>例子中的重答理由原句</h5>
                <blockquote className={d.original}>
                  {sample.rewriteReasonQuote}
                </blockquote>
                <details>
                  <summary>对照例子的完整原答与独立重答</summary>
                  <h5>虚构原答</h5>
                  <p className={d.original} data-example-original={sample.id}>
                    {sample.original}
                  </p>
                  <h5>虚构独立重答</h5>
                  <p className={d.original} data-example-rewrite={sample.id}>
                    {sample.rewrite}
                  </p>
                </details>
              </article>
            ))}
          </details>
        </>
      ) : (
        <p className={d.note}>
          已审读例子暂不可核对；原答和重答仍可保存与对照。可先按本题参考得分点自检。
        </p>
      )}
    </section>
  );
}
