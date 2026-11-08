"use client";
import { practiceSubjectInfo } from "@/content/practice-set";
import { corePracticeSubjects } from "@/content/core-practice-sections";
import { learningPlanScopeLabel } from "@/domain/daily-learning";
import {
  useDailyLearning,
  type DailyLearningControllerInput,
} from "@/learning/use-daily-learning";
import type { LearningPreferences } from "@/domain/daily-learning-schema";
import { StudyIcon } from "./learning-frame";
import s from "./daily-learning.module.css";

export function DailyLearning({
  state,
  ready,
  disabled,
  subject,
  update,
}: DailyLearningControllerInput) {
  const {
    plan,
    progress,
    preferences: prefs,
    issue,
    change,
    skip,
  } = useDailyLearning({ state, ready, disabled, subject, update });
  const next = progress?.items.find(
    (item) => !item.completed && !item.skipped && item.available,
  );
  const rest = progress?.items.filter((item) => item.id !== next?.id) ?? [];
  const renderItem = (item: NonNullable<typeof progress>["items"][number]) => (
    <li
      key={item.id}
      data-complete={item.completed || undefined}
      data-skipped={item.skipped || undefined}
    >
      <div className={s.itemBody}>
        <span className={s.kind}>
          {item.completed
            ? item.originRunId
              ? "已交卷"
              : "已作答"
            : item.skipped
              ? "先跳过"
              : { continue: "接着写", review: "回练", practice: "新题" }[
                  item.kind
                ]}
        </span>
        <h3>{item.title}</h3>
        <p>{item.reason}</p>
      </div>
      <div className={s.actions}>
        {item.available ? (
          <a
            href={item.href}
            aria-label={`${item.completed ? "回看" : "打开"}${item.title}`}
          >
            {item.completed
              ? "回看"
              : item.kind === "continue"
                ? "继续"
                : "去练"}
            <StudyIcon name="arrow" />
          </a>
        ) : (
          <span>题目版本已更新</span>
        )}
        {!item.completed && (
          <button disabled={disabled} onClick={() => skip(item.id)}>
            {item.skipped ? "放回安排" : "先跳过"}
          </button>
        )}
      </div>
    </li>
  );
  return (
    <section className={s.plan} aria-label="今日学习安排" data-daily-learning>
      <div className={s.heading}>
        <div>
          <h2>今天，从这里继续</h2>
        </div>
        <a className={s.history} href={`/records?subject=${subject}`}>
          我的学习 <StudyIcon name="arrow" />
        </a>
      </div>
      {plan && progress ? (
        <>
          <div className={s.meta}>
            <span>
              {learningPlanScopeLabel(plan.preferences)} · 约{" "}
              {plan.preferences.minutes} 分钟的一小组
            </span>
            <span>
              {progress.completed} / {progress.items.length} 已完成
              {progress.skipped ? ` · ${progress.skipped} 项先跳过` : ""}
            </span>
          </div>
          {next && (
            <ol className={`${s.items} ${s.next}`}>{renderItem(next)}</ol>
          )}
          {rest.length > 0 && (
            <details className={s.remaining}>
              <summary>今天的其余安排 · {rest.length} 项</summary>
              <ol className={s.items}>{rest.map(renderItem)}</ol>
            </details>
          )}
          {progress.remaining === 0 && (
            <p className={s.finished}>
              {progress.items.length
                ? "这一小组已处理完。可以先休息，也可以自由选题继续。"
                : "当前范围没有新的安排，可以自由选题或换个科目。"}
            </p>
          )}
        </>
      ) : (
        <p className={s.meta}>
          {!ready
            ? "正在接上你的学习记录…"
            : disabled
              ? "记录暂时不能写入，先恢复保存后再安排。"
              : "正在准备今天的一小组…"}
        </p>
      )}
      <div className={s.footer}>
        <details className={s.settings}>
          <summary>调整时间与范围</summary>
          <div className={s.fields}>
            <label>
              今天想用多久
              <select
                aria-label="今日学习时长"
                value={prefs.minutes}
                disabled={!ready || disabled}
                onChange={(e) =>
                  change({
                    ...prefs,
                    minutes: Number(
                      e.target.value,
                    ) as LearningPreferences["minutes"],
                  })
                }
              >
                {[10, 20, 30].map((n) => (
                  <option key={n} value={n}>
                    {n} 分钟左右
                  </option>
                ))}
              </select>
            </label>
            <label>
              练习范围
              <select
                aria-label="今日练习范围"
                value={prefs.subject}
                disabled={!ready || disabled}
                onChange={(e) =>
                  change({
                    ...prefs,
                    subject: e.target.value as LearningPreferences["subject"],
                  })
                }
              >
                <option value="all">全科</option>
                {corePracticeSubjects.map((id) => (
                  <option key={id} value={id}>
                    {practiceSubjectInfo(id).label}
                  </option>
                ))}
              </select>
            </label>
            <p>只调整今天的安排，做过的题和草稿都会保留。不需要每天填计划。</p>
          </div>
        </details>
        <a href={practiceSubjectInfo(subject).libraryHref}>自己选题 →</a>
      </div>
      {issue && <p role="status">{issue}</p>}
    </section>
  );
}
