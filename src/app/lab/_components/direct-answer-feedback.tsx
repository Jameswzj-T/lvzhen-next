import type { UnitFeedbackResult } from "../../../evaluation/unit-feedback-contract";
import {
  buildUnitFeedbackLearningSummary,
  type UnitFeedbackLearningSummary,
} from "../../../evaluation/unit-feedback-reading";
import type { DirectLearningAdvice } from "../../../domain/direct-learning-advice";
import { directTeachingPracticeReminder } from "../../../domain/direct-teaching-practice-reminder";
import { directConclusionReview } from "../../../domain/teacher-conclusion-review";
import { answerReadingGuide } from "../../../content/answer-reading-guide";
import { studentAnswerReference } from "../../../content/student-answer-reference";
import { practiceSubject, practiceTopic } from "../../../content/practice-set";
import s from "./direct-answer-feedback.module.css";

export type DirectAnswerFeedbackStatus =
  "idle" | "reading" | "assessing" | "ready" | "failed";

export type DirectAnswerFeedbackProps = {
  result: UnitFeedbackResult | null;
  answer: string;
  reference?: string;
  questionId?: string;
  questionRevision?: string;
  status: DirectAnswerFeedbackStatus;
  learningSummary?: UnitFeedbackLearningSummary | null;
  savedNewAnswer?: boolean;
  progressLabel?: string;
  learningAdvice?: DirectLearningAdvice | null;
  /** All learner entry points opt in; the full record reader remains for local inspection. */
  studentReading?: boolean;
};

const pointLabels = {
  covered: "正确",
  partial: "部分正确",
  missing: "待补充",
  contradicted: "待改",
  uncertain: "暂不能判断",
} as const;

const progressText = {
  idle: "尚未评阅。",
  reading: "正在读取评判…",
  assessing: "正在评判这份答案…",
  ready: "尚未取得评判。",
  failed: "这次尚未取得可核实的评判，原答保留；不会自动重复发送。",
} satisfies Record<DirectAnswerFeedbackStatus, string>;

/** Display only. The caller owns saving, identity validation, requests and navigation. */
export function DirectAnswerFeedback({
  result,
  answer,
  reference,
  questionId,
  questionRevision,
  status,
  learningSummary,
  savedNewAnswer = false,
  progressLabel,
  learningAdvice,
  studentReading = false,
}: DirectAnswerFeedbackProps) {
  const current = result?.view.originalText === answer ? result : null;
  const view = current?.view;
  const readingGuide = view ? answerReadingGuide(view) : null;
  const editedReference = studentAnswerReference({
    questionId: view?.questionId ?? questionId,
    questionRevision: view?.questionRevision ?? questionRevision,
    originalReference: reference,
    contentId: view?.contentId,
  });
  const advice =
    current &&
    learningAdvice?.resultId === current.id &&
    learningAdvice.answerId === current.view.answerId &&
    learningAdvice.contentId === current.view.contentId
      ? learningAdvice
      : null;
  const summary = view
    ? learningSummary &&
      learningSummary.questionId === view.questionId &&
      learningSummary.questionRevision === view.questionRevision &&
      learningSummary.contentId === view.contentId &&
      learningSummary.taskId === view.taskId &&
      learningSummary.answerId === view.answerId
      ? learningSummary
      : buildUnitFeedbackLearningSummary(view, {
          pointReviews: current?.pointReviews,
          source: current?.source,
          purpose: current?.purpose,
        })
    : null;
  const assessed = view?.status === "assessed" && view.points.length > 0;
  const held = new Set(
    (current?.pointReviews ?? [])
      .filter((review) => review.state === "needs_review")
      .map((review) => review.criterionId),
  );
  const needsCheck =
    !assessed ||
    held.size > 0 ||
    !!view?.points.some((point) => point.status === "uncertain");
  const needsChange = !!view?.points.some(
    (point) => point.status !== "covered",
  );
  const offline = current?.source === "offline_test";
  const example = current?.purpose === "synthetic_validation";
  const referenceText = summary?.organizedAnswer?.text ?? reference;
  const directTeaching =
    current?.source === "real_provider" &&
    (view?.teachingStyle === "direct-learner-v1" ||
      view?.teachingStyle === "direct-overall-v2" ||
      view?.teachingStyle === "direct-overall-v3");
  // A model clarification is an invitation to clarify part of an answer,
  // not a failed receipt or a withdrawal of every supported explanation.
  // This reading distinction never changes the saved assessment/learning state.
  const readableTeaching =
    directTeaching &&
    !!view?.points.length &&
    (view.status === "assessed" || view.status === "needs_clarification");
  const overallResponse =
    readableTeaching && held.size === 0
      ? (view?.studentResponse ?? view?.substantiveIssue)
      : null;
  // The current paragraph owns teaching prose. A structured clarification is
  // also rendered when absent verbatim, without guessing semantic equivalence.
  const completeBody =
    view?.teachingStyle === "direct-overall-v3" &&
    !!view.studentResponse?.trim() &&
    overallResponse === view.studentResponse;
  const conclusionNote =
    current && overallResponse ? directConclusionReview(current) : undefined;
  const uncertainPoints =
    view?.points.filter(
      (point) => point.status === "uncertain" && !held.has(point.id),
    ) ?? [];
  // Rebind the optional cue to this exact displayed point. A stale or edited
  // advice object must not import another answer's reason into the retry entry.
  const retryFocus =
    readableTeaching && view?.status === "assessed" && !view.clarification
      ? view.points.find(
          (p) =>
            p.id === advice?.retryFocus?.criterionId &&
            p.label === advice.retryFocus.label &&
            p.explanation === advice.retryFocus.explanation &&
            ["contradicted", "missing", "partial"].includes(p.status) &&
            !current?.pointReviews?.some((r) => r.criterionId === p.id),
        )
      : undefined;
  const heading = offline
    ? "示例分析"
    : example
      ? savedNewAnswer
        ? "AI评判（虚构答案）"
        : "样例AI评判"
      : studentReading
        ? "答题讲解"
        : "AI评判";
  const progress = progressLabel ?? progressText[status];
  const nextText =
    readableTeaching && held.size > 0
      ? view?.points.every((point) => held.has(point.id))
        ? "这部分先保留原答，不必根据尚未核实的反馈修改；可以继续下一题。"
        : "需要核实的那部分先保留原答，不必据此重写；可以先处理上面已经说明的其他部分。"
      : readableTeaching && view?.clarification
        ? view.clarification
        : readableTeaching && uncertainPoints.length
          ? `关于“${uncertainPoints[0].label}”，目前还不能确定；其余已经明确的部分保留。`
          : advice
            ? advice.text
            : !current
              ? status === "failed"
                ? "可重新读取已保存的反馈；也可以先对照参考。"
                : "可先对照参考；需要修改时，可以重新作答。"
              : needsCheck
                ? directTeaching
                  ? "这次还没有足够的反馈供你修改，可先保留原答，继续下一题。"
                  : "先核对依据，再决定是否修改。"
                : needsChange
                  ? directTeaching
                    ? "针对上面指出的问题补清理由，再试着重答这道题。"
                    : "修改待改的要点后，可以重答或继续下一题。"
                  : "可以继续下一题，检验这些要点在新案情中的用法。";
  // The dedicated learner paragraph already owns normal reading. Keep the
  // selected point's exact reason available on demand, without inferring that
  // it is semantically identical. Older/fallback or unsettled feedback keeps
  // the existing visible reason, and the rewrite draft remains unchanged.
  const collapseRetryReason =
    !!view?.studentResponse?.trim() &&
    overallResponse === view.studentResponse &&
    view.status === "assessed" &&
    held.size === 0 &&
    !view.clarification &&
    uncertainPoints.length === 0;
  const next = (
    <div className={s.next} aria-label="下一步">
      <h3 className={s.pointTitle}>下一步</h3>
      {retryFocus && (
        <>
          <p className={s.paragraph} data-direct-retry-cue={retryFocus.id}>
            <strong>重答时先处理“{retryFocus.label}”。</strong>
            {!collapseRetryReason && <>原反馈：{retryFocus.explanation}</>}
          </p>
          {collapseRetryReason && (
            <details className={s.evidence} data-direct-retry-reason>
              <summary>查看这处的具体理由</summary>
              <p className={s.paragraph}>{retryFocus.explanation}</p>
            </details>
          )}
        </>
      )}
      <p className={s.paragraph} data-direct-learning-next>
        {nextText}
      </p>
      {advice?.nextQuestion?.reason &&
        advice.nextQuestion.basis !== "same_topic" && (
          <p className={s.paragraph} data-direct-next-reason>
            {advice.nextQuestion.reason}
          </p>
        )}
      {advice?.nextQuestion && (
        <p className={s.paragraph}>
          <a
            href={advice.nextQuestion.href}
            data-direct-next-question={advice.nextQuestion.id}
          >
            练习：{advice.nextQuestion.title}
          </a>
        </p>
      )}
    </div>
  );
  const practiceReminder =
    readableTeaching && held.size === 0 && view
      ? directTeachingPracticeReminder(view)
      : null;
  const learningText =
    practiceReminder ??
    (readableTeaching &&
    (held.size || view?.clarification || uncertainPoints.length)
      ? "这次还有待明确或待核的地方，先保留原答；不要把它当成已经答错或已经改正。"
      : nextText);

  return (
    <div
      className={s.feedback}
      aria-busy={status === "reading" || status === "assessing"}
      data-direct-answer-feedback
    >
      <section aria-label={heading}>
        <h2 className={s.heading}>{heading}</h2>
        {result && !current ? (
          <p className={s.paragraph} role="status">
            这份评判与当前答案不一致，当前答案尚未评阅。
          </p>
        ) : !current ? (
          <p className={s.paragraph} role="status">
            {progress}
          </p>
        ) : (
          <>
            {status !== "ready" && status !== "idle" && (
              <p className={s.paragraph} role="status">
                {status === "failed"
                  ? "暂时遇到问题，以下保留已取得的评判。"
                  : `${progress}以下保留已取得的评判。`}
              </p>
            )}
            {offline ? (
              <p className={s.paragraph} data-direct-source>
                离线合成示例，不是真实AI评判。
              </p>
            ) : example ? (
              <p className={s.paragraph} data-direct-source>
                {savedNewAnswer
                  ? "这是虚构答案的AI评判。"
                  : "这是已有样例的AI评判，当前答案未新增评阅。"}
              </p>
            ) : null}
            {!overallResponse && !readableTeaching && (
              <p className={s.judgment} data-direct-judgment>
                {summary?.judgment}
              </p>
            )}
            {view?.weightedScore && (
              <p className={s.paragraph}>
                {view.weightedScore.total === null
                  ? `已确认${view.weightedScore.confirmed}分，${view.weightedScore.pending}分待核；满分${view.weightedScore.maximum}分。`
                  : `本次得分：${view.weightedScore.total}／${view.weightedScore.maximum}分。`}
              </p>
            )}
            {summary?.judgmentSource === "codex_independent" && (
              <p className={s.paragraph}>
                {studentReading
                  ? "以上判断来自Codex独立核对，不是专业人工签收。"
                  : "以上判断来自独立核对，保存标签保留在依据中。"}
              </p>
            )}
            {!directTeaching && (
              <p className={s.paragraph}>
                {assessed
                  ? "这里只核对本题要点，其他表述仍可能有误。"
                  : (view?.notice ?? "尚未完成评判，当前不判断对错。")}
              </p>
            )}
            {!directTeaching && view?.clarification && (
              <p className={s.paragraph}>需要核对：{view.clarification}</p>
            )}
            {overallResponse && (
              <p
                className={`${s.paragraph} ${s.teacherText}`}
                data-direct-model-explanation
              >
                {overallResponse}
              </p>
            )}
            {studentReading && readableTeaching && held.size === 0 && view && (
              <details className={s.evidence} data-direct-point-details>
                <summary>查看各项要求与判断</summary>
                <div className={s.readingPoints} data-direct-point-overview>
                  <h3 className={s.pointTitle}>本题要点与作答情况</h3>
                  <p className={s.paragraph} data-direct-point-completion>
                    按本次评阅：
                    {(
                      [
                        ["covered", "已答到"],
                        ["partial", "部分表达"],
                        ["missing", "未写到"],
                        ["contradicted", "需改正"],
                        ["uncertain", "待核对"],
                      ] as const
                    )
                      .map(([status, label]) => ({
                        label,
                        count: view.points.filter((p) => p.status === status)
                          .length,
                      }))
                      .filter((row) => row.count)
                      .map((row) => `${row.label}${row.count}项`)
                      .join("，")}
                    。
                  </p>
                  <ul className={s.points}>
                    {view.points.map((point) => {
                      const guide = readingGuide?.requirements[point.id];
                      return (
                        <li className={s.point} key={point.id}>
                          <p className={s.pointHeading}>
                            <strong>{guide?.title ?? point.label}</strong>
                            <span>
                              {point.status === "covered"
                                ? "已答到"
                                : point.status === "partial"
                                  ? "部分表达"
                                  : point.status === "missing"
                                    ? "未写到"
                                    : point.status === "contradicted"
                                      ? "需改正"
                                      : "待核对"}
                            </span>
                          </p>
                          <p className={s.paragraph}>
                            {guide?.text ?? point.meaning}
                          </p>
                          {/* The explicit clarification owns the unresolved
                            question; its audit reason may repeat that question. */}
                          {!(
                            point.status === "uncertain" && view.clarification
                          ) && (
                            <p
                              className={s.paragraph}
                              data-direct-point-explanation={point.id}
                            >
                              本次作答：{point.explanation}
                            </p>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                  {readingGuide && (
                    <p className={s.paragraph}>{readingGuide.scopeNote}</p>
                  )}
                </div>
              </details>
            )}
            {conclusionNote && (
              <aside
                role="note"
                aria-label="审校补充"
                data-direct-review-addendum
              >
                <p className={s.paragraph}>
                  <strong>Codex独立审校：</strong>
                  {conclusionNote.text}
                </p>
                {studentReading && (
                  <p className={s.paragraph}>
                    这条补充来自Codex独立核对，不是专业人工签收，也不是原模型自行修正。
                  </p>
                )}
              </aside>
            )}
            {readableTeaching &&
              !overallResponse &&
              view?.points.map((point) => (
                <p
                  className={s.paragraph}
                  key={point.id}
                  data-direct-readable-point={point.id}
                >
                  {held.has(point.id)
                    ? `关于“${point.label}”，现有反馈的依据还需核实，暂时不能据此判断这部分回答。`
                    : point.explanation}
                </p>
              ))}
            {studentReading &&
              readableTeaching &&
              held.size === 0 &&
              view?.clarification &&
              // The model paragraph may already contain this exact question.
              // Keep distinct wording; do not infer semantic equivalence.
              !overallResponse?.includes(view.clarification) && (
                <p className={s.paragraph} data-direct-clarification>
                  {view.clarification}
                </p>
              )}
            {readableTeaching &&
              overallResponse &&
              !view?.clarification &&
              !completeBody &&
              uncertainPoints.map((point) => (
                <p
                  className={s.paragraph}
                  key={point.id}
                  data-direct-local-uncertainty={point.id}
                >
                  关于“{point.label}”，目前还不能确定。{point.explanation}
                </p>
              ))}
            {!directTeaching && !!view?.points.length && (
              <ul className={s.points} aria-label="各项判断与修改方向">
                {view.points.map((point) => {
                  const pending =
                    !assessed ||
                    held.has(point.id) ||
                    point.status === "uncertain";
                  const improvement = summary?.improvements.find(
                    (item) => item.criterionId === point.id,
                  );
                  return (
                    <li className={s.point} key={point.id}>
                      <div className={s.pointHeading}>
                        <h3 className={s.pointTitle}>{point.label}</h3>
                        <span
                          className={
                            pending
                              ? s.pending
                              : point.status === "covered"
                                ? s.correct
                                : s.change
                          }
                          data-direct-point-status={point.id}
                        >
                          {pending
                            ? "待核"
                            : view.weightedScore && point.status !== "covered"
                              ? "待改"
                              : pointLabels[point.status]}
                        </span>
                      </div>
                      <p className={s.paragraph} data-direct-point-cue>
                        {pending ? (
                          "先核对原文与依据，再决定是否修改。"
                        ) : directTeaching ? (
                          point.explanation
                        ) : point.status === "covered" ? (
                          "这一项表达可以保留。"
                        ) : (
                          <>
                            {improvement?.source === "codex_independent"
                              ? "独立核对建议："
                              : "怎么改："}
                            {improvement?.text ?? point.meaning}
                          </>
                        )}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
            {!directTeaching && view?.substantiveIssue && (
              <p className={s.paragraph}>需要改正：{view.substantiveIssue}</p>
            )}
            {!directTeaching && view?.terminologySuggestion && (
              <p className={s.paragraph}>
                表达建议：{view.terminologySuggestion}
              </p>
            )}
            {!studentReading && directTeaching && next}
            {!studentReading && (
              <details className={s.evidence} data-direct-evidence>
                <summary>
                  {directTeaching ? "查看逐项依据与参考" : "查看依据与原文"}
                </summary>
                <div className={s.evidenceBody}>
                  {directTeaching && (
                    <>
                      <p className={s.paragraph}>
                        以下逐项对照这份原答，说明哪些可以保留、哪些仍需说明；没有增加本题以外的答题要求。
                      </p>
                      {conclusionNote && (
                        <p className={s.paragraph} data-direct-review-source>
                          这条补充由Codex独立复核本题依据后追加，不是专业人工签收，也不是原模型自行修正；原反馈、原有判断和学习记录保持。
                        </p>
                      )}
                    </>
                  )}
                  {directTeaching && view?.studentResponse && (
                    <p className={s.paragraph}>
                      原整体回应：{view.studentResponse}
                    </p>
                  )}
                  {directTeaching && view?.substantiveIssue && (
                    <p className={s.paragraph}>
                      原总提醒：
                      {view.substantiveIssue}
                    </p>
                  )}
                  {view?.points.map((point) => (
                    <section className={s.evidencePoint} key={point.id}>
                      <h3 className={s.pointTitle}>{point.label}</h3>
                      <p
                        className={s.paragraph}
                        data-direct-point-status={
                          directTeaching ? point.id : undefined
                        }
                      >
                        {directTeaching ? "本项判断：" : "保存标签："}
                        {pointLabels[point.status]}
                        {(held.has(point.id) ||
                          (!readableTeaching &&
                            !assessed &&
                            point.status !== "uncertain")) &&
                          "（待核）"}
                        。
                      </p>
                      {point.quotes.map((quote, index) => (
                        <blockquote className={s.quote} key={index}>
                          {quote}
                        </blockquote>
                      ))}
                      <p className={s.paragraph}>{point.explanation}</p>
                      <p className={s.paragraph}>本项要求：{point.meaning}</p>
                      <p className={s.paragraph}>
                        可接受表达：{point.acceptable}
                      </p>
                      <p className={s.paragraph}>本项边界：{point.boundary}</p>
                      {current.pointReviews
                        ?.filter((review) => review.criterionId === point.id)
                        .map((review) => (
                          <p className={s.paragraph} key={review.criterionId}>
                            独立核对：{review.note}
                          </p>
                        ))}
                    </section>
                  ))}
                  {referenceText && (
                    <section className={s.evidencePoint}>
                      <h3 className={s.pointTitle}>参考答案（本题参考）</h3>
                      <p className={s.reference}>{referenceText}</p>
                    </section>
                  )}
                  {view?.scoreNotice && (
                    <p className={s.paragraph}>{view.scoreNotice}</p>
                  )}
                </div>
              </details>
            )}
          </>
        )}
        {!studentReading && !directTeaching && next}
      </section>
      {studentReading && (
        <>
          <section
            className={s.readingBlock}
            aria-label="参考答案"
            data-direct-reference
          >
            <h2 className={s.heading}>参考答案</h2>
            {readingGuide ? (
              <div data-direct-answer-guide>
                {readingGuide.reference.map((paragraph, i) => (
                  <p className={s.paragraph} key={i}>
                    {paragraph}
                  </p>
                ))}
                <details className={s.evidence} data-direct-reference-extra>
                  <summary>{readingGuide.extra.title}</summary>
                  <p className={s.paragraph}>{readingGuide.extra.text}</p>
                  <a
                    href={readingGuide.source.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {readingGuide.source.title}
                  </a>
                </details>
              </div>
            ) : editedReference ? (
              <div data-student-answer-reference={editedReference.version}>
                {editedReference.paragraphs.map((paragraph, i) => (
                  <p className={s.paragraph} key={i}>
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <p className={s.reference}>
                {referenceText ||
                  "这份作答的参考暂未载入，先保留原答与已保存反馈。"}
              </p>
            )}
          </section>
          <section
            className={s.readingBlock}
            aria-label="学习提醒"
            data-direct-learning
          >
            <h2 className={s.heading}>学习提醒</h2>
            <p className={s.paragraph} data-direct-learning-next>
              {readingGuide && readableTeaching && !needsCheck
                ? readingGuide.reminder
                : learningText}
            </p>
            {advice?.nextQuestion && (
              <p className={s.paragraph}>
                <a
                  href={advice.nextQuestion.href}
                  data-direct-next-question={advice.nextQuestion.id}
                >
                  练习：{advice.nextQuestion.title}
                </a>
              </p>
            )}
            {view && practiceSubject(view.questionId) && (
              <p className={s.paragraph}>
                <a
                  href={`/lab/study?subject=${practiceSubject(view.questionId)}&topic=${encodeURIComponent(practiceTopic(view.questionId).id)}`}
                  data-direct-learning-overview
                >
                  查看「{practiceTopic(view.questionId).title}」的学习情况 →
                </a>
              </p>
            )}
          </section>
        </>
      )}
    </div>
  );
}
