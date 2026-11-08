import type {
  LearningReviewGroup,
  ReviewOutcome,
  ReviewSupport,
  ReviewEvent,
} from "@/domain/learning-review";
import type { OtherQuestionReview } from "@/domain/learning-other-question-review";
import d from "./reading-document.module.css";

const supportText: Record<ReviewSupport, string> = {
  independent: "独立作答",
  hint_or_reference: "提示或参考后作答",
  complete_reanswer: "按保存反馈完整重答",
  unknown: "是否看过提示或参考：记录不明",
};
const outcomeText: Record<ReviewOutcome, string> = {
  supported_this_time: "这次回答到位",
  needs_work: "反馈指出需修改",
  pending: "反馈待核",
  unreviewed: "尚未评阅",
};
// Display the latest saved outcome without reinterpreting old feedback or counts.
function latestReviewText(event: ReviewEvent | undefined) {
  if (!event) return "这里只保留了旧版作答，可以回到题目查看。";
  return {
    supported_this_time: event.notice,
    needs_work:
      "这次还有结论或理由需要修改。回到题目看看具体反馈，再试着重答。",
    pending: "这次评阅还有说不准的地方，可以先回到题目核对原答和依据。",
    unreviewed: "这次作答已保存，还没有评阅结果。",
  }[event.outcome];
}

export function LearningReview({
  groups,
  otherQuestions = [],
}: {
  groups: LearningReviewGroup[];
  otherQuestions?: OtherQuestionReview[];
}) {
  if (!groups.length) return null;
  return (
    <section className={d.section} aria-label="跨次练习回顾">
      <h2 className={d.heading}>跨次练习回顾</h2>
      <p className={d.note}>
        先看每道题最近一次答得怎样。原答、较早的反馈和详细记录都保留在下方。
      </p>
      {groups.map((group) => (
        <article
          key={group.questionId}
          data-learning-review-question={group.questionId}
        >
          <h3 className={d.subheading}>
            {group.topicTitle} · {group.title}
          </h3>
          <p className={d.paragraph} data-review-latest>
            {latestReviewText(group.events[0])}
          </p>
          {group.events[0] && (
            <p className={d.note} data-review-latest-source>
              最近一次：{supportText[group.events[0].support]}
            </p>
          )}
          {group.newCasePractice && (
            <div data-review-new-case={group.newCasePractice.questionId}>
              <p className={d.paragraph}>{group.newCasePractice.reason}</p>
              <p className={d.paragraph}>
                <a className={d.nextAction} href={group.newCasePractice.href}>
                  换个案情练习：{group.newCasePractice.title}
                </a>
              </p>
            </div>
          )}
          <details className={d.answerDetails} data-review-records>
            <summary>查看作答原文与详细记录</summary>
            <p className={d.note}>
              以下按已保存的作答和反馈整理。独立作答指提交前未记录使用提示、参考或保存反馈；答对次数不代表永久掌握。
            </p>
            <p className={d.paragraph}>
              当前版本保存{group.savedCount}次作答，这里回顾最近
              {group.windowCount}次；可核对到{group.distinctFeedbackCount}
              份不同评阅意见。同文复用同一意见不算新的一份评阅。
            </p>
            {group.historicalCount > 0 && (
              <p className={d.note}>
                另有{group.historicalCount}
                次旧版原答，仍按原版本保存，未并入当前回顾。
              </p>
            )}
            <p className={d.paragraph} data-review-supported>
              本问答对的记录：未使用提示作答{group.supported.independent}
              次；看过提示或参考后{group.supported.hint_or_reference}
              次；按保存反馈完整重答{group.supported.complete_reanswer}次
              {group.supported.unknown
                ? `；辅助来源不明${group.supported.unknown}次`
                : ""}
              。
            </p>
            <p className={d.paragraph} data-review-unresolved>
              反馈指出需修改{group.needsWork}次；反馈待核{group.pending}
              次；尚未评阅{group.unreviewed}次。待核和未评阅都没有算作答错。
            </p>
            {group.weakPoints.length > 0 && (
              <ul className={d.points} aria-label="同一要点的保存反馈次数">
                {group.weakPoints.map((point) => (
                  <li key={point.id}>
                    「{point.label}」有{point.count}
                    次作答反馈提到缺漏或相反表述（相反表述{point.contradicted}
                    次、尚未完整表达{point.partial}次、尚未表达{point.missing}
                    次）；它们是历史记录，不表示最新作答一定仍有这个问题。
                  </li>
                ))}
              </ul>
            )}
            {group.nextBasis && (
              <p className={d.note} data-review-next-basis>
                {group.nextBasis}
              </p>
            )}
            {group.events.slice(0, 5).map((event) => (
              <article
                key={event.attemptId}
                data-review-attempt={event.attemptId}
              >
                <h4 className={d.subheading}>
                  保存于
                  {new Date(event.submittedAt).toLocaleString("zh-CN", {
                    hour12: false,
                  })}
                </h4>
                <p className={d.note}>
                  {supportText[event.support]} · {outcomeText[event.outcome]}
                </p>
                <p className={d.paragraph}>我的原答（保留原文）</p>
                <blockquote className={d.original}>
                  {event.originalText}
                </blockquote>
                <p className={d.paragraph}>{event.notice}</p>
                {event.points.map((point) => (
                  <div key={point.id} className={d.feedbackPoint}>
                    <p className={d.paragraph}>
                      保存反馈 · {point.label}：{point.explanation}
                    </p>
                    {point.quotes.map((quote, index) => (
                      <blockquote key={index} className={d.original}>
                        原答依据：{quote}
                      </blockquote>
                    ))}
                  </div>
                ))}
              </article>
            ))}
            {group.windowCount > 5 && (
              <p className={d.note}>
                这里展开最近5次；其余原答仍可在题内的“之前的作答”查看。
              </p>
            )}
          </details>
          {otherQuestions
            .filter(
              (review) =>
                review.sourceQuestionId === group.questionId &&
                review.sourceAttemptId === group.events[0]?.attemptId &&
                review.sourceResultId === group.events[0]?.resultId &&
                group.events[0]?.support === "complete_reanswer" &&
                group.events[0]?.outcome === "supported_this_time",
            )
            .map((review) => (
              <section key={review.sourceAttemptId} data-other-question-review>
                <h4 className={d.subheading}>
                  完整重答后，做过的同知识点客观题
                </h4>
                <p className={d.note}>
                  从这次完整重答的反馈保存后起，另有{review.totalCount}
                  次有效选择题作答； 这里列最近{review.events.length}
                  次。选择是否符合本题参考，不代表已会独立分析其他案例。
                </p>
                {review.events.map((event) => (
                  <article
                    key={event.attemptId}
                    data-other-question-attempt={event.attemptId}
                  >
                    <h5 className={d.subheading}>{event.title}</h5>
                    <p className={d.note}>
                      保存于
                      {new Date(event.submittedAt).toLocaleString("zh-CN", {
                        hour12: false,
                      })}
                      {event.priorSavedCount > 0
                        ? `；这道题此前另有${event.priorSavedCount}次保存作答。`
                        : "；本机记录中，未找到更早的本题保存作答。"}
                    </p>
                    <p className={d.paragraph}>我的选择：{event.choiceText}</p>
                    <p className={d.paragraph}>
                      {event.matchesReference
                        ? "与本题参考选择一致。"
                        : "与本题参考选择不一致，可回题内核对理由。"}
                      {event.hintUsed
                        ? "提交前记录过提示。"
                        : "提交前未记录提示。"}
                      {event.referenceSeenBeforeAnswer
                        ? "提交前已看过参考。"
                        : "提交前未记录看过参考。"}
                    </p>
                    <p className={d.paragraph}>
                      <a className={d.nextAction} href={event.href}>
                        回到这道题看原答与参考
                      </a>
                    </p>
                  </article>
                ))}
              </section>
            ))}
          <p className={d.paragraph}>
            <a className={d.nextAction} href={group.href}>
              进入本题看全部原答
            </a>
          </p>
        </article>
      ))}
    </section>
  );
}
