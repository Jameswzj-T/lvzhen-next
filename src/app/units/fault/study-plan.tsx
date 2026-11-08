"use client";
import { savedExerciseFor, topicFor } from "@/content/fault-catalog";
import { studyPlan } from "@/domain/study-plan";
import type { FaultProgress } from "@/domain/fault-progress";
import styles from "./study-plan.module.css";

export function StudyPlan({
  state,
  at,
  onLearn,
  onRecall,
  onResume,
  onRecords,
  onReviewCorrection,
}: {
  state: FaultProgress;
  at: string;
  onLearn: (id: string) => void;
  onRecall: (id: string) => void;
  onResume: () => void;
  onRecords: () => void;
  onReviewCorrection: (id: string) => void;
}) {
  const plan = studyPlan(state, at);
  const topic = plan.active?.topic;
  const isWeekRecall =
    plan.finishedCount === 6 &&
    !plan.weekDone &&
    plan.recallTopicId !== "transfer";
  const focus = plan.correctionFocus;
  const original =
    focus && state.attempts.find((a) => a.id === focus.attemptId)!;
  const exercise =
    original && savedExerciseFor(original.exerciseId, original.revision)!;
  const canResume = topic?.id === state.topicId && !!state.updatedAt;
  const receipt = (
    <section className={styles.summary} aria-label="今天的学习记录">
      <h2>今天留下了什么</h2>
      <p>
        {plan.todayAttempts.length} 份作答 · {plan.todayReviews.length} 次回忆 ·{" "}
        {plan.completedToday.length} 节练习完成
      </p>
      {plan.completedToday.length > 0 && (
        <p>{plan.completedToday.map((r) => r.topic.title).join("、")}</p>
      )}
      <p className={styles.note}>
        这里记录学习过程。看过参考、借助提示和未评阅的文字，都不会被算作“已经掌握”。
      </p>
      <button className={styles.link} onClick={onRecords}>
        查看作答与回忆原文
      </button>
    </section>
  );
  return (
    <section className={styles.plan} aria-label="今日学习安排">
      <p className={styles.meta}>刑法入门 · 建议分七个学习日完成</p>
      <h1>
        {plan.weekDone
          ? "这一段学习已走完"
          : plan.canRest
            ? plan.completedToday.length === 1
              ? "今天已完成一节，可以到这里"
              : `今天已完成 ${plan.completedToday.length} 节，可以到这里`
            : plan.gap
              ? "先接上，再往前走"
              : "今天，学清楚一个问题"}
      </h1>
      <p className={styles.intro}>
        每天一小段，时间不够可以停。中断后按原进度继续，不用补打卡。
      </p>
      {plan.gap && (
        <div className={styles.memory}>
          <p>
            上次停在“{topicFor(state.topicId)?.title}
            ”。先花几分钟回想，再接回原来的内容。
          </p>
          {plan.recent && (
            <blockquote>
              上次原答：
              {plan.recent.choice && `${plan.recent.choice.toUpperCase()} · `}
              {plan.recent.answer || "只选择了选项，未填写理由。"}
            </blockquote>
          )}
        </div>
      )}
      {plan.canRest && receipt}
      {focus && original && exercise && (
        <section className={styles.recall} aria-label="我的复习重点">
          <h2>把一个疑惑想清楚</h2>
          <p>{exercise.title}</p>
          <p className={styles.note}>
            这是你自己选的复习重点。一次回顾一条，今天也可以先学新内容。
          </p>
          <div className={styles.memory}>
            {focus.note && <blockquote>当时的疑惑：{focus.note}</blockquote>}
            {focus.answer && <blockquote>我的修正：{focus.answer}</blockquote>}
            <details key={focus.id}>
              <summary>对照题目、原答与参考</summary>
              <p>{exercise.facts}</p>
              <p>{exercise.prompt}</p>
              {exercise.options?.map((o) => (
                <p key={o.id}>
                  {o.id.toUpperCase()}. {o.text}
                </p>
              ))}
              <blockquote>
                原答：{original.choice && `${original.choice.toUpperCase()} · `}
                {original.answer || "只选择了选项，未填写理由。"}
              </blockquote>
              <p>参考分析：{exercise.reference}</p>
              <button
                className={styles.link}
                onClick={() => onReviewCorrection(focus.id)}
              >
                这次已回顾，移出重点
              </button>
              <p className={styles.note}>
                仅调整你的复习选择，订正与原答继续保留，也不表示系统判定已掌握。
              </p>
            </details>
          </div>
        </section>
      )}
      {plan.recallTopicId && (
        <section className={styles.recall}>
          <h2>
            {isWeekRecall ? "第七个学习日：回顾这一周" : "先做一个短回忆"}
          </h2>
          <p>{topicFor(plan.recallTopicId)?.title} · 预计 3–5 分钟</p>
          <p className={styles.note}>
            {isWeekRecall
              ? `六节学完后，已重新回忆 ${plan.finalReviewCount} / 6 个主题。一次回忆一个，也可以分几次完成；这些是学过的问题，不是新题检验。`
              : plan.gap
                ? "先找回上次的思路，草稿和原学习位置都会保留。"
                : "依据之前完成练习的时间和你选择的回忆间隔安排。今天先做这一项。"}
          </p>
          <button
            className={styles.primary}
            onClick={() => onRecall(plan.recallTopicId!)}
          >
            开始这次回忆
          </button>
        </section>
      )}
      {topic && (
        <section className={styles.task}>
          <p className={styles.meta}>
            {plan.canRest ? "下次准备" : "本次学习"} · 第{" "}
            {plan.rows.findIndex((r) => r.topic.id === topic.id) + 1} 个学习日 ·
            预计 {topic.minutes} 分钟
          </p>
          <h2>{topic.title}</h2>
          <p>{topic.goal}</p>
          <p className={styles.note}>
            为什么学这一节：
            {canResume
              ? "保留了这节的学习位置，可以接着已有的草稿和作答走。"
              : topic.prerequisite}
          </p>
          <ol className={styles.steps}>
            <li>读简明讲解和小案例，理清这个问题。</li>
            <li>
              独立完成 {topic.exercises.length} 道练习，再对照参考分析。已提交{" "}
              {plan.active!.answered} / {topic.exercises.length} 道。
            </li>
            <li>写一次自己的回忆，决定什么时候再回顾。</li>
          </ol>
          <button
            className={plan.canRest ? styles.link : styles.primary}
            onClick={() => (canResume ? onResume() : onLearn(topic.id))}
          >
            {plan.canRest
              ? "还想继续，进入下一节"
              : canResume
                ? "继续本次学习"
                : "开始本次学习"}
          </button>
          <p className={styles.note}>
            完成本节练习、看过分析后就可以收尾；回忆也可以下次再做。
          </p>
        </section>
      )}
      {plan.weekDone && (
        <p>
          六节练习和学完后的六个主题回忆都有记录了。这还不代表能独立解决新案例。可以继续尝试下方的关联练习。
        </p>
      )}
      {!plan.canRest && receipt}
      <section className={styles.recall} aria-label="关联新案例安排">
        <h2>用新案例试一试</h2>
        <p>三道关联练习 · 已作答 {plan.transferAnswered} / 3 道</p>
        <p className={styles.note}>
          建议学完六节后再试，也可以提前尝试。先保留自己的分析，再看参考并自查；做完不代表已掌握。
        </p>
        <button
          className={styles.link}
          onClick={() =>
            state.topicId === "transfer" ? onResume() : onLearn("transfer")
          }
        >
          {plan.transferAnswered === 3
            ? "回看关联练习与回忆"
            : state.topicId === "transfer"
              ? "继续关联新案例"
              : "开始关联新案例"}
        </button>
      </section>
      <details className={styles.route}>
        <summary>查看一周路线 · 已完成 {plan.finishedCount} / 6 节练习</summary>
        <ol>
          {plan.rows.map((row, index) => (
            <li key={row.topic.id}>
              <span>学习日 {index + 1}</span>
              <button onClick={() => onLearn(row.topic.id)}>
                {row.topic.title}
              </button>
              <small>
                {row.done
                  ? "练习已完成"
                  : row.answered
                    ? `已提交 ${row.answered}/${row.topic.exercises.length}`
                    : "待学习"}
              </small>
            </li>
          ))}
          <li>
            <span>学习日 7</span>
            <span>回顾六个主题</span>
            <small>{plan.weekDone ? "回忆已记录" : "按前六节进度安排"}</small>
          </li>
        </ol>
        <p className={styles.note}>
          这是建议顺序，不是日历期限。有基础可以从某一节开始；其余内容仍会如实保留为待学习。
        </p>
      </details>
    </section>
  );
}
