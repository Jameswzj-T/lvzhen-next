import React from "react";
import type { TeacherFeedbackView } from "../../../domain/teacher-feedback-contract";
import s from "./teacher-answer-feedback.module.css";

export type TeacherAnswerFeedbackProps = {
  view: TeacherFeedbackView;
  onFullRetry?: () => void;
  onReviewEvidence?: () => void;
  onContinue?: () => void;
  onDefer?: () => void;
  nextQuestionTitle?: string;
  /** The acceptance example displays these separately as backend records. */
  showRecords?: boolean;
};
const rawLabels = {
  covered: "已覆盖",
  partial: "部分覆盖",
  missing: "未覆盖",
  contradicted: "存在冲突",
  uncertain: "待核",
} as const;
function Explanation({
  quotes,
  explanation,
}: {
  quotes: string[];
  explanation: string;
}) {
  return (
    <p className={s.paragraph}>
      {quotes.map((quote, index) => (
        <React.Fragment key={index}>
          <q className={s.quote} data-teacher-original-quote>
            {quote}
          </q>
          {index < quotes.length - 1 ? "、" : "。 "}
        </React.Fragment>
      ))}
      {explanation}
    </p>
  );
}
function boundNote(view: TeacherFeedbackView) {
  const n = view.independentConclusionNote;
  return n?.source === "codex_independent" &&
    n.resultId === view.binding.resultId &&
    n.answerId === view.binding.answerId &&
    n.reviewedExplanation === view.conclusion?.explanation
    ? n
    : null;
}
function boundPointNote(view: TeacherFeedbackView) {
  const n = view.independentPointNote,
    p = view.pending.find((p) => p.criterionId === n?.criterionId);
  return n?.source === "codex_independent" &&
    n.resultId === view.binding.resultId &&
    n.answerId === view.binding.answerId &&
    n.originalConclusionState === view.conclusion?.state &&
    p?.explanation === n.reviewedExplanation &&
    p?.confirmationAction === n.reviewedAction
    ? n
    : null;
}
function boundLearningAdvice(view: TeacherFeedbackView) {
  const advice = view.learningAdvice;
  const comparison = advice?.comparison;
  if (!comparison) return advice;
  return comparison.currentAnswerId === view.binding.answerId &&
    comparison.currentResultId === view.binding.resultId &&
    comparison.previousAnswerId !== view.binding.answerId &&
    advice.priorAttemptIds.includes(comparison.previousAnswerId) &&
    view.judgment.kind === "correct" &&
    !view.pending.length &&
    comparison.points.length > 0 &&
    new Set(comparison.points.map((p) => p.criterionId)).size ===
      comparison.points.length &&
    comparison.points.every((p) =>
      view.strengths.some((s) => s.criterionId === p.criterionId),
    )
    ? advice
    : undefined;
}
/** Original labels, quotations and review attribution: never rewritten as model output. */
export function TeacherFeedbackRecords({
  view,
}: {
  view: TeacherFeedbackView;
}) {
  const note = boundNote(view),
    pointNote = boundPointNote(view),
    advice = boundLearningAdvice(view);
  const quoteNotes = (view.quoteScopeNotes ?? []).filter(
    (n) =>
      n.source === "local_quote_scope_check" &&
      n.resultId === view.binding.resultId &&
      n.answerId === view.binding.answerId &&
      view.rawPoints.some(
        (p) =>
          p.criterionId === n.criterionId &&
          p.quotes.includes(n.claimQuote) &&
          p.quotes.includes(n.reasoningQuote),
      ),
  );
  return (
    <div className={s.evidenceBody} data-teacher-records>
      <p className={s.notice}>保存的完整原答：</p>
      <blockquote className={s.paragraph}>{view.originalText}</blockquote>
      {view.sourceNotice && <p className={s.notice}>{view.sourceNotice}</p>}
      <p className={s.notice}>
        以下是后台保存的原始反馈与核对记录，不是另一次评阅。
      </p>
      {view.rawOverall && (
        <p className={s.paragraph}>
          {view.rawOverall.origin === "projected_model_decisions"
            ? "后台汇总状态："
            : "原模型整体判断："}
          {view.rawOverall.kind}。
          {view.rawOverall.adoptedForTeaching === false &&
            "以下原模型总评仅保留作记录，不用于本次讲解或学习建议；请以逐点反馈为准。"}
          {view.rawOverall.reason}
        </p>
      )}
      {view.conclusion && (
        <section aria-label="原模型结论说明">
          <p className={s.paragraph}>原模型结论：{view.conclusion.state}。</p>
          {view.rawOverall?.adoptedForTeaching === false && (
            <p className={s.notice}>
              引文和结论状态按原记录保留；以下说明复用原总评，仅供追溯，不另作教学建议。
            </p>
          )}
          <Explanation
            quotes={view.conclusion.quotes}
            explanation={view.conclusion.explanation}
          />
          {!!quoteNotes.length && (
            <aside data-teacher-quote-scope-note>
              <p className={s.paragraph}>
                <strong>引用归属待核（本机）：</strong>
                以下结论引文与理由引文有范围重叠，但模型给出的支持方向不同。重叠片段的引用归属待核，暂不作为答对依据。
              </p>
              {quoteNotes.map((n, i) => (
                <div key={`${n.criterionId}-${i}`}>
                  <p className={s.paragraph}>
                    结论引文：<q>{n.claimQuote}</q>
                  </p>
                  <p className={s.paragraph}>
                    理由引文：<q>{n.reasoningQuote}</q>
                  </p>
                </div>
              ))}
              <p className={s.notice}>
                原结论、理由、标签和完整解释均保留。本注记只核引文范围，没有替模型改判，也不表示原模型已修正。
              </p>
            </aside>
          )}
        </section>
      )}
      {note && (
        <aside role="note" data-teacher-independent-conclusion-note>
          <p className={s.paragraph}>
            <strong>Codex 独立审校注记：</strong>
            {note.text}
          </p>
          <p className={s.notice}>
            本条由 Codex
            独立复核后补充，不是专业人工签收，也不是原模型自行修正。原模型文字和判断保留。
          </p>
        </aside>
      )}
      {pointNote && (
        <aside role="note" data-teacher-independent-point-record>
          <p className={s.paragraph}>
            <strong>Codex 独立审校注记：</strong>
            {pointNote.text}
          </p>
          <p className={s.paragraph}>{pointNote.explanation}</p>
          <p className={s.paragraph}>{pointNote.action}</p>
          <p className={s.notice}>
            不是专业人工签收，也不是原模型自行修正。下方原标签、解释和动作原样保留。
          </p>
        </aside>
      )}
      <ul className={s.items}>
        {view.rawPoints.map((point, index) => (
          <li key={`${point.criterionId}-${index}`}>
            <p className={s.paragraph}>
              原反馈标记：{rawLabels[point.status]}。
            </p>
            <Explanation {...point} />
          </li>
        ))}
      </ul>
      {!!view.improvements.length && (
        <section aria-label="保存的改进建议">
          {view.improvements.map((p, i) => (
            <p className={s.paragraph} key={`${p.criterionId}-${i}`}>
              {p.action}
            </p>
          ))}
        </section>
      )}
      {view.pending.some((p) => p.confirmationAction) && (
        <section aria-label="保存的澄清建议">
          {view.pending.map((p) =>
            p.confirmationAction ? (
              <p className={s.paragraph} key={p.criterionId}>
                {p.confirmationAction}
              </p>
            ) : null,
          )}
        </section>
      )}
      {[...view.improvements, ...view.pending].some((p) => p.practiceHint) && (
        <section aria-label="本机重答提示" data-teacher-recorded-local-hints>
          <p className={s.notice}>
            正文重答提示由本机安排练习，不是原模型改法；原模型文字已在上方完整保留。
          </p>
          {[...view.improvements, ...view.pending].map((p) =>
            p.practiceHint ? (
              <p key={p.criterionId} className={s.paragraph}>
                {p.practiceHint.text}
              </p>
            ) : null,
          )}
        </section>
      )}
      {view.history && <p className={s.notice}>{view.history.text}</p>}
      {view.historyNotice && <p className={s.notice}>{view.historyNotice}</p>}
      {view.pending.map((p, i) =>
        p.reviewNote && p.reviewNote !== p.explanation ? (
          <p className={s.notice} key={i}>
            {p.reviewNote}
          </p>
        ) : null,
      )}
      <p className={s.notice} data-teacher-recorded-practice-guidance>
        本机练习安排：{advice?.text ?? view.nextStep.text}
      </p>
      {advice && (
        <p className={s.notice}>
          学习建议由本机已保存的同题、同版本记录整理，使用了{" "}
          {advice.priorAttemptIds.length}{" "}
          份较早的可核对反馈；这些历史答卷没有发送给模型。
        </p>
      )}
      {advice?.comparison && (
        <aside data-teacher-learning-comparison aria-label="学习建议的本地依据">
          <p className={s.notice}>
            这条建议比较的是同题、同版本的两份已保存反馈：
          </p>
          {advice.comparison.points.map((point) => (
            <p key={point.criterionId} className={s.paragraph}>
              {point.label}：之前的反馈提示需改，本次反馈列为答对。
            </p>
          ))}
          <p className={s.notice}>
            这是反馈记录的变化，不是另一次模型评阅，也不能据此认定已经掌握。
          </p>
        </aside>
      )}
    </div>
  );
}
/** Pure reader: caller owns judgments, source binding, local history and actions. */
export function TeacherAnswerFeedback({
  view,
  onFullRetry,
  onReviewEvidence,
  onContinue,
  onDefer,
  nextQuestionTitle,
  showRecords = true,
}: TeacherAnswerFeedbackProps) {
  const actions = {
    review_evidence: { label: "看看依据", callback: onReviewEvidence },
    whole_question_retry: { label: "再答一次", callback: onFullRetry },
    independent_revisit: { label: "再答一次", callback: onFullRetry },
    continue_topic: { label: "继续练习", callback: onContinue },
  };
  const action = actions[view.nextStep.kind],
    note = boundNote(view),
    pointNote = boundPointNote(view),
    advice = boundLearningAdvice(view);
  // A point's concrete correction/clarification is already the next task.
  // Do not append a second generic restatement of it. Keep source/support
  // context visible and the complete local guidance in the records below.
  const hasPointInstruction =
    ((view.nextStep.kind === "whole_question_retry" ||
      view.nextStep.kind === "independent_revisit") &&
      view.improvements
        .slice(0, 2)
        .some((p) => p.practiceHint?.text.trim() || p.action.trim())) ||
    (view.nextStep.kind === "review_evidence" &&
      view.pending.some(
        (p) => p.practiceHint?.text.trim() || p.confirmationAction?.trim(),
      ));
  return (
    <section
      className={s.feedback}
      aria-label="对这份原答的反馈"
      data-teacher-answer-feedback
    >
      {view.provenance === "offline_synthetic_preview" && (
        <p className={s.notice}>演示数据，非本次真实模型评阅。</p>
      )}
      <h2 className={s.judgment} data-teacher-judgment>
        {view.judgment.text}
      </h2>
      {view.judgment.reason && view.judgment.reason !== view.judgment.text && (
        <p className={s.paragraph}>{view.judgment.reason}</p>
      )}
      {note && (
        <p className={s.paragraph} data-teacher-corrected-summary>
          你还没选定商场是完全不用赔，还是可以少赔一些；这里先不判对错。下面两个答对的地方保留。
          <span className={s.notice}>（说明已更正，来源见记录。）</span>
        </p>
      )}
      {!!view.pending.length && (
        <section className={s.section} aria-label="待核之处">
          <h3 className={s.heading}>
            {view.pending.some((p) => p.practiceHint)
              ? "需要你说清的地方"
              : "还有说不准的地方"}
          </h3>
          {view.pending.map((p, i) => (
            <div key={`${p.criterionId}-${i}`}>
              {pointNote?.criterionId === p.criterionId ? (
                <aside data-teacher-independent-point-explanation>
                  <p className={s.paragraph}>
                    这条反馈暂时无法准确判断你的结论，先不把它算作漏答或答错。原答、原反馈和核对说明保留在下方记录中。
                  </p>
                </aside>
              ) : (
                <>
                  <p className={s.paragraph}>
                    {p.reviewNote && p.reviewNote !== p.explanation
                      ? "这条反馈前后有需要核对的地方，暂不拿它判断你答错；原话和说明保留在下方记录中。"
                      : p.explanation}
                  </p>
                  {(p.practiceHint || p.confirmationAction) && (
                    <p
                      className={s.paragraph}
                      data-teacher-confirmation-action
                      data-teacher-practice-hint={
                        p.practiceHint ? true : undefined
                      }
                    >
                      {p.practiceHint && <strong>重答提示：</strong>}
                      {p.practiceHint?.text ?? p.confirmationAction}
                    </p>
                  )}
                </>
              )}
            </div>
          ))}
        </section>
      )}
      {!!view.improvements.length && (
        <section className={s.section} aria-label="关键改法">
          <h3 className={s.heading}>哪里要改，怎么改</h3>
          <ul className={s.items}>
            {view.improvements.slice(0, 2).map((p, i) => (
              <li key={`${p.criterionId}-${i}`} data-teacher-improvement>
                <p className={s.paragraph}>{p.explanation}</p>
                <p
                  className={s.paragraph}
                  data-teacher-action
                  data-teacher-practice-hint={p.practiceHint ? true : undefined}
                >
                  <strong>
                    {p.practiceHint ? "重答提示：" : "可以这样改："}
                  </strong>
                  {p.practiceHint?.text ?? p.action}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
      {!!view.strengths.length && (
        <section className={s.section} aria-label="原答写对的地方">
          <h3 className={s.heading}>你答对了什么</h3>
          {view.strengths.map((p, i) => (
            <details
              className={s.disclosure}
              key={`${p.criterionId}-${i}`}
              data-teacher-strength
            >
              <summary>{p.label ?? `已答到的要点 ${i + 1}`} · 查看理由</summary>
              <p className={s.paragraph}>{p.explanation}</p>
            </details>
          ))}
        </section>
      )}
      <section className={s.section} aria-label="下一步">
        {!hasPointInstruction && (
          <>
            <h3 className={s.heading}>接下来怎么练</h3>
            <p className={s.paragraph} data-teacher-learning-advice>
              {advice?.text ?? view.nextStep.text}
            </p>
          </>
        )}
        {hasPointInstruction && advice?.currentWithSupport === true && (
          <p className={s.notice} data-teacher-practice-support>
            这次是看过提示或反馈后的练习。
          </p>
        )}
        {view.nextStep.kind === "continue_topic" && nextQuestionTitle && (
          <p className={s.paragraph} data-teacher-next-question>
            下一题：{nextQuestionTitle}
          </p>
        )}
        {action?.callback && (
          <button type="button" className={s.action} onClick={action.callback}>
            {action.label}
          </button>
        )}
        {view.nextStep.kind !== "continue_topic" && onDefer && (
          <button type="button" className={s.action} onClick={onDefer}>
            继续练习
          </button>
        )}
        {view.judgment.kind === "correct" &&
          view.nextStep.kind === "continue_topic" &&
          onFullRetry && (
            <button type="button" className={s.action} onClick={onFullRetry}>
              再答这题
            </button>
          )}
      </section>
      <div className={s.disclosures}>
        <details className={s.disclosure} data-teacher-reference>
          <summary>查看本题参考</summary>
          <div className={s.evidenceBody}>
            {[...view.improvements, ...view.strengths].map(
              (p, i) =>
                p.basis && (
                  <p
                    key={`${p.criterionId}-${i}`}
                    className={s.notice}
                    data-teacher-basis
                  >
                    {p.basis}
                  </p>
                ),
            )}
            <p className={s.notice}>{view.reference.label}</p>
            <p className={s.reference}>{view.reference.text}</p>
          </div>
        </details>
        {showRecords && (
          <details className={s.disclosure} data-teacher-raw-feedback>
            <summary>查看原话与后台记录</summary>
            <TeacherFeedbackRecords view={view} />
          </details>
        )}
      </div>
    </section>
  );
}
