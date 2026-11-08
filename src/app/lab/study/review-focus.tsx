import type { ReviewFocusItem } from "@/domain/practice-review-focus";
import type { ReactNode } from "react";
import { StudyIcon } from "../_components/learning-frame";
import s from "./review-focus.module.css";

const unavailableText = {
  "original-unavailable": "原答记录暂不能定位，已有标记仍保留供回顾。",
  "original-ambiguous": "原答关联待核对，暂不提供练习入口。",
  "unknown-question": "原题暂不能定位，保留已有记录供回顾。",
  "question-version-mismatch": "原题版本暂无法核对，保留已有记录供回顾。",
  "assessment-original-mismatch": "原案关联待核对，保留记录供回顾。",
  "outside-practice-queue": "暂无法安全定位练习题组，保留记录供回顾。",
  "practice-group-ambiguous": "原题不能唯一对应到当前题组，暂不提供练习入口。",
};

function savedTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
}

export function ReviewFocus({
  items,
  disabled,
  onPractice,
  children,
}: {
  items: readonly ReviewFocusItem[];
  disabled: boolean;
  onPractice: (correctionId: string) => void;
  children?: ReactNode;
}) {
  return (
    <section className={s.section} aria-labelledby="review-focus-title">
      <div className={s.heading}>
        <h2 id="review-focus-title">我的复习重点</h2>
        {items.length > 0 && <p>按自己保存的关注理由回顾，需要时再去练习。</p>}
      </div>
      {items.length === 0 ? (
        <p className={s.empty}>
          还没有标记重点。在答后保存重答时，勾选“放入我的复习重点”，这里就能接着回顾。
        </p>
      ) : (
        <ul className={s.list}>
          {items.map((item) => {
            const hasRewrite = Boolean(item.rewrittenAnswer.trim());
            const destination = item.destination;
            const originalMissing =
              item.originalAnswer === null && item.originalChoice === null;
            return (
              <li
                key={item.correctionId}
                className={s.item}
                data-review-focus-id={item.correctionId}
              >
                <div className={s.itemHeading}>
                  <div>
                    <h3>{item.title ?? "题目记录暂不能定位"}</h3>
                    {item.assessmentOrigin ? (
                      <p className={s.meta}>
                        {item.assessmentOrigin.paperTitle} · 第{" "}
                        {item.assessmentOrigin.questionNumber} 问
                      </p>
                    ) : item.location ? (
                      <p className={s.meta}>
                        {item.location.chapterTitle} /{" "}
                        {item.location.topicTitle}
                      </p>
                    ) : null}
                    <p className={s.meta}>
                      保存于{" "}
                      <time dateTime={item.submittedAt}>
                        {savedTime(item.submittedAt)}
                      </time>
                    </p>
                  </div>
                  {destination && (
                    <button
                      type="button"
                      className={s.action}
                      disabled={disabled}
                      data-review-focus-action
                      onClick={() => {
                        if (!disabled) onPractice(item.correctionId);
                      }}
                    >
                      {destination.kind === "assessment-run"
                        ? `回到原案第${destination.questionNumber}问`
                        : "练习该题组"}
                      <StudyIcon name="arrow" />
                    </button>
                  )}
                </div>
                <p className={s.reason}>
                  <span>本次关注：</span>
                  {item.note.trim() ? (
                    <span className={s.text} data-review-focus-note>
                      {item.note}
                    </span>
                  ) : (
                    <span>自己标记的重点，未填写关注理由。</span>
                  )}
                </p>
                <p className={s.status}>
                  {hasRewrite
                    ? "你自己选的复习重点；重答尚未评阅。"
                    : "你自己选的复习重点；按保存的关注理由回顾。"}
                </p>
                {item.unavailableReason && (
                  <p className={s.boundary}>
                    {unavailableText[item.unavailableReason]}
                  </p>
                )}
                {destination?.kind === "practice-group" &&
                  destination.isReplacement && (
                    <p className={s.boundary}>
                      原题已更新；此入口练习当前题组中的“{destination.title}
                      ”，旧记录保留。
                    </p>
                  )}
                <details className={s.comparison}>
                  <summary>
                    {hasRewrite ? "查看原答与重答" : "查看原答"}
                  </summary>
                  <h4>{originalMissing ? "原答记录" : "原答（保留）"}</h4>
                  {originalMissing ? (
                    <p>原答记录暂不能唯一定位。</p>
                  ) : (
                    <>
                      {item.originalChoice?.trim() && (
                        <p>
                          原选择：
                          <span className={s.text} data-review-focus-choice>
                            {item.originalChoice}
                          </span>
                        </p>
                      )}
                      {item.originalAnswer !== null && (
                        <p className={s.text} data-review-focus-original>
                          {item.originalAnswer}
                        </p>
                      )}
                    </>
                  )}
                  {hasRewrite && (
                    <>
                      <h4>保存的重答（尚未评阅）</h4>
                      <p className={s.text} data-review-focus-rewrite>
                        {item.rewrittenAnswer}
                      </p>
                    </>
                  )}
                </details>
              </li>
            );
          })}
        </ul>
      )}
      {children}
    </section>
  );
}
