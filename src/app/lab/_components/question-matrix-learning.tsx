"use client";
import React, { useEffect, useRef, useState } from "react";
import { exerciseRevision } from "../../../content/fault-catalog";
import type { MatrixLearningExamples } from "../../../evaluation/rewrite-comparison/matrix-learning";
import {
  readMatrixView,
  encodeMatrixView,
  withdrawMatrixRow,
  matrixViewStorageKey,
  type MatrixViewRecord,
} from "../../../domain/matrix-learning-view";
import d from "./reading-document.module.css";
export function hasMatrixLearningExamples(
  paperId: string,
  questionId: string,
  revision: string,
  examples?: MatrixLearningExamples | null,
) {
  return (
    !!examples &&
    paperId === "cap-contract-v2" &&
    questionId === "cap-contract-v2-q2" &&
    revision === exerciseRevision(questionId) &&
    examples.questionId === questionId &&
    examples.exerciseRevision === revision &&
    examples.version === "matrix-learning-release-v1" &&
    examples.feedbackVersion === "composite-evidence-matrix-v1" &&
    examples.provenance === "manually_reviewed_fictional_examples" &&
    examples.scope === "benefit_and_organization_expression_only" &&
    examples.samples.map((s) => s.id).join() === "CF01,CF02"
  );
}
// Does not receive a learner answer. New rewrites keep the parent page's existing
// save/restore contract and remain unreviewed. Only example-view withdrawal is stored.
export function QuestionMatrixLearning({
  paperId,
  questionId,
  revision,
  submitted,
  examples,
}: {
  paperId: string;
  questionId: string;
  revision: string;
  submitted: boolean;
  examples?: MatrixLearningExamples | null;
}) {
  const active =
      submitted &&
      hasMatrixLearningExamples(paperId, questionId, revision, examples),
    binding = examples?.bindingKey ?? "";
  const [record, setRecord] = useState<MatrixViewRecord | null>(null),
    [ready, setReady] = useState(false),
    [failed, setFailed] = useState(false);
  const current = useRef<MatrixViewRecord | null>(null);
  useEffect(() => {
    if (!active) return;
    try {
      const value = readMatrixView(
        sessionStorage.getItem(matrixViewStorageKey),
        binding,
      );
      if (!value) {
        setFailed(true);
        setReady(true);
        return;
      }
      current.current = value;
      setRecord(value);
      setReady(true);
    } catch {
      setFailed(true);
      setReady(true);
    }
  }, [active, binding]);
  const bound = record?.bindingKey === binding;
  function withdraw(id: string) {
    if (
      !current.current ||
      current.current.bindingKey !== binding ||
      !ready ||
      failed
    )
      return;
    const next = withdrawMatrixRow(current.current, id);
    try {
      sessionStorage.setItem(
        matrixViewStorageKey,
        encodeMatrixView(next, binding),
      );
      current.current = next;
      setRecord(next);
    } catch {
      setFailed(true);
    }
  }
  if (
    !submitted ||
    paperId !== "cap-contract-v2" ||
    questionId !== "cap-contract-v2-q2" ||
    revision !== exerciseRevision(questionId)
  )
    return null;
  if (!active || !examples)
    return (
      <p className={d.note}>
        本问逐项示例暂不可核对；原答和独立重答仍按原流程保存，不显示示例判断。
      </p>
    );
  return (
    <div aria-label="本问利益归属与组织性质自检" data-matrix-learning>
      <h4 className={d.subheading}>资金归属与公司性质，要分别核对</h4>
      <p className={d.paragraph}>
        先看是否已说明本笔预付款供谁使用；再看是否用公司设立、经营情况分析组织性质。资金归公司、负责人共同决策，不能代替后一项理由。
      </p>
      <p className={d.note}>
        这是本问原有要求的证据范围提示，其他要求仍需完整作答。题设后来主要活动未确定，不算学生漏答；有依据的条件分析应保留。
      </p>
      <details aria-label="逐项已审读虚构对照">
        <summary>看两个例子：部分已答与条件分析</summary>
        <p className={d.note}>
          以下是已经人工审读的虚构原答和重答，没有评阅你上方的答案。逐项定位不表示整问答对，不计分或记录掌握。
        </p>
        {!ready || (!bound && !failed) ? (
          <p role="status">正在恢复示例反馈的展示状态…</p>
        ) : failed ? (
          <p role="alert">
            示例反馈状态无法恢复，判断已暂停展示。答卷与独立重答的保存不受影响，原存储未覆盖。
          </p>
        ) : null}
        {examples.samples.map((sample) => (
          <article key={sample.id} aria-label={`${sample.id}逐项虚构例子`}>
            <h5>{sample.title}</h5>
            {(["original", "rewrite"] as const).map((side) => (
              <div key={side}>
                <h6>{side === "original" ? "虚构原答" : "虚构独立重答"}</h6>
                <p
                  className={d.original}
                  data-matrix-example={`${sample.id}:${side}`}
                >
                  {sample[side].answer}
                </p>
                {(["benefit", "organization"] as const).map((kind) => {
                  const key = `${sample.id}:${side}:${kind}`,
                    row = sample[side][kind];
                  return (
                    <div key={kind} data-matrix-row={key}>
                      <p className={d.paragraph}>
                        <strong>
                          {kind === "benefit" ? "资金归属表达" : "公司性质分析"}
                        </strong>
                      </p>
                      {ready && !failed && bound && record ? (
                        record.withdrawn.includes(
                          key as MatrixViewRecord["withdrawn"][number],
                        ) ? (
                          <p className={d.note} data-matrix-withdrawn={key}>
                            本条示例反馈已撤下，原文与保存的重答保留；撤回不表示答错。
                          </p>
                        ) : (
                          <>
                            <p
                              className={d.paragraph}
                              data-matrix-scope-feedback
                            >
                              {row.text}
                            </p>
                            {row.quotes.map((quote, i) => (
                              <blockquote className={d.original} key={i}>
                                {quote}
                              </blockquote>
                            ))}
                            <button
                              type="button"
                              onClick={() => withdraw(key)}
                              data-matrix-withdraw={key}
                            >
                              撤下这条示例反馈
                            </button>
                          </>
                        )
                      ) : (
                        <p className={d.note}>
                          这条示例反馈暂未展示，不影响保存作答。
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </article>
        ))}
        <p className={d.note}>
          新保存的独立重答仍尚未评阅。文字变化或与示例相似，都不能证明推理改正；不会将这两份旧回执套用到你的新答。
        </p>
      </details>
    </div>
  );
}
