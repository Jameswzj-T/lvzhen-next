"use client";

import { faultTopics } from "@/content/fault-unit";
import {
  guidedLessonFor,
  guidedExercises,
  guidedExerciseIds,
  isGuidedLesson,
  type GuidedLessonId,
} from "@/content/guided-lessons";
import type { FaultProgress } from "@/domain/fault-progress";
import { latestCorrections } from "@/domain/corrections";
import s from "./lesson.module.css";

export function LearningOverview({
  progress,
  onResume,
  onStart,
  onSelect,
}: {
  progress: FaultProgress;
  onResume: () => void;
  onStart: () => void;
  onSelect: (id: GuidedLessonId) => void;
}) {
  const definition = guidedLessonFor(progress.topicId);
  const lesson = definition.topic;
  const exercises = guidedExercises(lesson.id);
  const exerciseIds = guidedExerciseIds(lesson.id);
  const answered = exercises.filter((q) =>
    progress.attempts.some((a) => a.exerciseId === q.id),
  ).length;
  const recalls = progress.reviews.filter(
    (r) => r.topicId === lesson.id,
  ).length;
  const revisit = latestCorrections(progress).filter(
    (n) =>
      n.revisit &&
      progress.attempts.some(
        (a) => a.id === n.attemptId && exerciseIds.includes(a.exerciseId),
      ),
  );
  const finished = progress.step === "review";
  const hasWork =
    answered > 0 ||
    exercises.some((q) => {
      const d = progress.drafts[q.id];
      return d && (d.answer.trim() || d.choice);
    }) ||
    !!progress.recallDrafts[lesson.id]?.answer.trim();
  const status = finished ? "本节回顾" : hasWork ? "本节学习中" : "准备开始";

  return (
    <div className={s.overview}>
      <div className={s.overviewHeading}>
        <div>
          <p>学习总览</p>
          <h1>看清位置，学好这一节。</h1>
        </div>
        <span>2027 备考方向</span>
      </div>

      <section className={s.journey} aria-label="备考全局">
        <div className={s.journeyTitle}>
          <h2>从知识学习，走向独立答题</h2>
          <span>本次体验所在阶段</span>
        </div>
        <ol>
          <li aria-current="step">
            <span>01</span>
            <div>
              <strong>知识学习</strong>
              <small>理解 · 分辨 · 表达</small>
            </div>
            <b>当前</b>
          </li>
          <li>
            <span>02</span>
            <div>
              <strong>综合运用</strong>
              <small>关联知识，分析完整案例</small>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <strong>考前模考</strong>
              <small>限时练习与集中回顾</small>
            </div>
          </li>
        </ol>
        <p>
          围绕同一知识点，练习客观辨析与主观表达。全科安排、综合题与模考仍待建设。
        </p>
      </section>

      <div className={s.overviewColumns}>
        <section className={s.curriculum} aria-label="刑法课程位置">
          <div className={s.sectionTitle}>
            <h2>刑法 · 你在这里</h2>
            <span>课程结构草图</span>
          </div>
          <p className={s.mapIntro}>先看课程脉络，再展开当前这一小段。</p>
          <details className={s.futureChapter}>
            <summary>
              基本原则与适用范围 <span>待编排</span>
            </summary>
            <p>后续补全课程内容与前后学习关系。本次先体验主观方面。</p>
          </details>
          <div className={s.currentChapter}>
            <div className={s.chapterHeading}>
              <span className={s.positionDot} />
              <div>
                <h3>犯罪的一般判断</h3>
                <p>当前展开：主观方面</p>
              </div>
            </div>
            <ol className={s.lessonMap}>
              {faultTopics.map((t, i) => (
                <li key={t.id} data-current={t.id === lesson.id || undefined}>
                  <span className={s.mapIndex}>{i + 1}</span>
                  {isGuidedLesson(t.id) ? (
                    <div className={s.activeLesson}>
                      <button onClick={() => onSelect(t.id as GuidedLessonId)}>
                        {t.title}
                      </button>
                      <span>
                        {t.id === lesson.id
                          ? status
                          : progress.attempts.some((a) =>
                                guidedExerciseIds(t.id).includes(a.exerciseId),
                              )
                            ? "已有作答 · 可接续"
                            : "可进入学习"}
                      </span>
                      <p>{t.goal}</p>
                    </div>
                  ) : (
                    <details>
                      <summary>{t.title}</summary>
                      <p>{t.goal}</p>
                      <p className={s.mapNote}>
                        已有教学内容，尚未接入新版学习体验。
                      </p>
                      <a href="/units/fault">到现有课程目录查看</a>
                    </details>
                  )}
                </li>
              ))}
            </ol>
            <p className={s.mapNote}>
              这里展示的是主观方面的六节路径，不是完整刑法课程。
            </p>
          </div>
          <details className={s.futureChapter}>
            <summary>
              刑事责任与刑罚 <span>待编排</span>
            </summary>
            <p>后续建设这一部分的知识与练习。</p>
          </details>
          <details className={s.futureChapter}>
            <summary>
              具体犯罪 <span>待编排</span>
            </summary>
            <p>后续将具体犯罪的学习与前面的分析方法连接起来。</p>
          </details>
          <details className={s.otherSubjects}>
            <summary>其他科目与全科安排</summary>
            <p>
              后续按备考阶段编排各科路径。这里暂不展示未经确认的全科进度，也不把课程草图当作完整考试大纲。
            </p>
          </details>
        </section>

        <aside className={s.todayPlan} aria-label="本次学习安排">
          <div className={s.todayHeading}>
            <span>{finished ? "这次学到了哪里" : "今天先学这一节"}</span>
            <span>约 {lesson.minutes} 分钟</span>
          </div>
          <p className={s.todayLocation}>
            刑法 / 主观方面 / 第{" "}
            {faultTopics.findIndex((t) => t.id === lesson.id) + 1} 节
          </p>
          <h2>{lesson.title}</h2>
          <p className={s.todayGoal}>{lesson.goal}</p>
          <button className={s.primary} onClick={onResume}>
            {finished ? "查看本节小结" : hasWork ? "继续这一节" : "开始这一节"}
          </button>
          {hasWork && (
            <button className={s.textButton} onClick={onStart}>
              重新看知识讲解
            </button>
          )}

          <ol className={s.taskList}>
            <li>
              <span>理解</span>
              <div>
                {definition.route[1]}
                <small>核心区别，解释按需展开</small>
              </div>
            </li>
            <li>
              <span>练习</span>
              <div>
                同一案例，选择或表达
                <small>
                  {answered
                    ? `已使用 ${answered} 种练习方式`
                    : "可以任选一种练习"}
                </small>
              </div>
            </li>
            <li>
              <span>小结</span>
              <div>
                收好核心区别与下次建议
                <small>
                  {recalls ? `${recalls} 次回忆已保留` : "愿意时再留一句回忆"}
                </small>
              </div>
            </li>
          </ol>
          <div className={s.sessionBoundary}>
            <strong>
              {finished ? "已来到本节回顾" : "做到这里，就可以收尾"}
            </strong>
            <p>
              {finished
                ? "原答和学习位置已保留，下次可以从这里接续。"
                : "练习方式可以任选，回忆也可稍后再做。"}
            </p>
          </div>
          <p className={s.mapNote}>
            已作答不等于已掌握。AI 反馈试用不作为分数或掌握结论。
          </p>
          {revisit.length > 0 && (
            <div className={s.reviewReminder}>
              <strong>你标记的回顾重点</strong>
              {revisit.map((n) => (
                <p key={n.id}>{n.note || n.answer}</p>
              ))}
            </div>
          )}
        </aside>
      </div>
      <div className={s.knowledgeBridge} aria-label="前后知识联系">
        <div>
          <span>先有的基础</span>
          <strong>{definition.route[0]}</strong>
        </div>
        <span aria-hidden="true">→</span>
        <div>
          <span>这一节</span>
          <strong>{definition.route[1]}</strong>
        </div>
        <span aria-hidden="true">→</span>
        <div>
          <span>下一步的联系</span>
          <strong>{definition.route[2]}</strong>
        </div>
      </div>
    </div>
  );
}
