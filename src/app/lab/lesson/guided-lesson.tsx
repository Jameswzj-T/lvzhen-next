"use client";

import { useEffect, useRef, useState } from "react";
import {
  faultSources,
  faultTopics,
  type FaultTopic,
  type UnitExercise,
} from "@/content/fault-unit";
import {
  freshDraft,
  retryExercise,
  reviewSchedule,
  type FaultProgress,
  type UnitDraft,
} from "@/domain/fault-progress";
import {
  freshCorrection,
  latestCorrections,
  saveCorrection,
} from "@/domain/corrections";
import { useLessonPreview, type LessonScreen } from "./use-lesson-preview";
import s from "./lesson.module.css";
import { LearningHeader } from "../_components/learning-frame";
import { LearningOverview } from "./learning-overview";
import { AnswerFeedback } from "./answer-feedback";
import type { Learner } from "@/accounts/client";
import {
  previewKey,
  parseLessonImport,
  lessonStep,
  practiceScreen,
  prepareCasePractice,
  submitCaseExercise,
  submitLessonRecall,
  caseLearningSummary,
  switchLesson,
} from "@/domain/lesson-session";
import {
  guidedLessonFor,
  guidedExercises,
  guidedExerciseIds,
  isGuidedLesson,
  type GuidedLessonId,
} from "@/content/guided-lessons";
import { savedExerciseFor } from "@/content/fault-catalog";

const steps = ["学知识", "案例练习", "本节小结"];
function Icon({
  kind,
  size = 20,
}: {
  kind: "arrow" | "back" | "check" | "book" | "clock" | "menu" | "close";
  size?: number;
}) {
  const paths = {
    arrow: "M4 12h15m-6-6 6 6-6 6",
    back: "M20 12H5m6-6-6 6 6 6",
    check: "m5 12 4 4L19 6",
    clock: "M12 8v5l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
    menu: "M4 6h16M4 12h16M4 18h16",
    close: "m6 6 12 12M18 6 6 18",
    book: "M12 5v15M12 5C8 2 3 3 3 3v16s5-1 9 1c4-2 9-1 9-1V3s-5-1-9 2",
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[kind]} />
    </svg>
  );
}
export function GuidedLesson({
  initialOverview = false,
  user = null,
}: {
  initialOverview?: boolean;
  user?: Learner;
}) {
  const [overview, setOverview] = useState(initialOverview);
  const { session, update, ready, storageIssue, syncStatus, retrySync } =
    useLessonPreview(user?.id ?? null);
  const [hasPreview, setHasPreview] = useState(false);
  useEffect(() => {
    if (!user) return;
    try {
      const raw = localStorage.getItem(previewKey);
      if (raw) {
        const preview = parseLessonImport(raw);
        setHasPreview(
          preview.attempts.some(
            (a) =>
              !session.progress.attempts.some((saved) => saved.id === a.id),
          ) ||
            preview.reviews.some(
              (r) =>
                !session.progress.reviews.some((saved) => saved.id === r.id),
            ),
        );
      }
    } catch {
      /* Preserve unreadable preview without adopting it into an account. */
    }
  }, [user, session.progress]);
  const { progress } = session;
  const definition = guidedLessonFor(progress.topicId);
  const { topic: lesson, choice: objective, subjective } = definition;
  const exercises = guidedExercises(lesson.id);
  const exerciseIds = guidedExerciseIds(lesson.id);
  const previous = definition.previous
    ? guidedLessonFor(definition.previous)
    : null;
  const previousAnswer =
    previous &&
    progress.attempts.findLast((a) => a.exerciseId === previous.subjective.id);
  const previousRecall =
    previous &&
    progress.reviews.findLast((r) => r.topicId === previous.topic.id);
  const screen =
    session.screen === "objective-feedback" &&
    !progress.drafts[objective.id]?.submittedId
      ? "objective"
      : session.screen;
  const seenCaseReference = exercises.some(
    (q) => progress.drafts[q.id]?.referenceSeen,
  );
  const [navHidden, setNavHidden] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const directory = useRef<HTMLElement>(null);
  const toolbar = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!mobileNav) return;
    const media = window.matchMedia("(max-width: 760px)");
    const prior = document.documentElement.style.overflow;
    const lock = () => {
      document.documentElement.style.overflow = media.matches
        ? "hidden"
        : prior;
      directory.current?.style.setProperty(
        "--lesson-menu-top",
        `${Math.max(0, toolbar.current?.getBoundingClientRect().bottom ?? 58)}px`,
      );
    };
    lock();
    media.addEventListener("change", lock);
    window.addEventListener("resize", lock);
    return () => {
      media.removeEventListener("change", lock);
      window.removeEventListener("resize", lock);
      document.documentElement.style.overflow = prior;
    };
  }, [mobileNav]);
  const [historyFeedback, setHistoryFeedback] = useState<string | null>(null);
  const [recallTiming, setRecallTiming] = useState<"again" | "later">("again");
  const main = useRef<HTMLElement>(null);
  const question = screen.startsWith("objective") ? objective : subjective;
  const draft = progress.drafts[question.id] ?? freshDraft();
  const saved = progress.attempts.find((a) => a.id === draft.submittedId);
  const feedback = screen.endsWith("feedback") && !!saved;
  const step = lessonStep(screen);
  const summary = caseLearningSummary(progress);
  const recall = progress.recallDrafts[lesson.id] ?? freshDraft();
  const savedRecall = progress.reviews.find((r) => r.id === recall.submittedId);
  const answerCount = exercises.filter((q) =>
    progress.attempts.some((a) => a.exerciseId === q.id),
  ).length;
  const lessonAttempts = progress.attempts.filter((a) =>
    exerciseIds.includes(a.exerciseId),
  );
  const notes = latestCorrections(progress).filter((n) =>
    lessonAttempts.some((a) => a.id === n.attemptId),
  );
  const freshNote = saved && progress.correctionDrafts[saved.id];
  const note = freshNote ?? freshCorrection();
  const savedNote = notes.find((c) => c.attemptId === saved?.id);

  function focus() {
    requestAnimationFrame(() => {
      main.current?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  }
  function changeProgress(fn: (p: FaultProgress) => FaultProgress) {
    update((prior) => ({
      ...prior,
      progress: { ...fn(prior.progress), updatedAt: new Date().toISOString() },
    }));
  }
  function changeView(showMap: boolean) {
    setOverview(showMap);
    const url = new URL(window.location.href);
    if (showMap) url.searchParams.set("view", "map");
    else url.searchParams.delete("view");
    window.history.replaceState(null, "", url);
  }
  function showOverview() {
    changeView(true);
    setMobileNav(false);
    focus();
  }
  function resumeLesson() {
    changeView(false);
    focus();
  }
  function changeLesson(id: GuidedLessonId) {
    update((prior) => switchLesson(prior, id));
    changeView(false);
    setMobileNav(false);
    setHistoryFeedback(null);
    setRecallTiming("again");
    focus();
  }
  function go(next: LessonScreen) {
    changeView(false);
    update((prior) => {
      const q = next.startsWith("objective")
        ? objective
        : next.startsWith("subjective")
          ? subjective
          : null;
      const destination =
        q &&
        !next.endsWith("feedback") &&
        prior.progress.drafts[q.id]?.submittedId
          ? (`${next}-feedback` as LessonScreen)
          : next;
      const recallDraft =
        prior.progress.recallDrafts[lesson.id] ?? freshDraft();
      return {
        ...prior,
        screen: destination,
        progress: {
          ...prior.progress,
          ...(q
            ? prepareCasePractice(prior.progress, q.id)
            : {
                ...(next === "recall" || next === "finish"
                  ? {
                      recallDrafts: {
                        ...prior.progress.recallDrafts,
                        [lesson.id]: { ...recallDraft, referenceSeen: true },
                      },
                    }
                  : {}),
                step:
                  next === "concept" || next === "case"
                    ? ("learn" as const)
                    : ("review" as const),
              }),
        },
      };
    });
    setMobileNav(false);
    focus();
  }
  function edit(patch: Partial<UnitDraft>) {
    changeProgress((p) => ({
      ...p,
      drafts: {
        ...p.drafts,
        [question.id]: { ...(p.drafts[question.id] ?? freshDraft()), ...patch },
      },
    }));
  }
  function submit() {
    update((prior) => {
      const next = submitCaseExercise(
        { ...prior.progress, exerciseId: question.id, step: "practice" },
        crypto.randomUUID(),
        new Date().toISOString(),
      );
      return {
        ...prior,
        progress: next,
        screen: next.drafts[question.id]?.submittedId
          ? question.kind === "objective"
            ? "objective-feedback"
            : "subjective-feedback"
          : prior.screen,
      };
    });
    focus();
  }
  function retry() {
    update((prior) => ({
      ...prior,
      screen: question.kind === "objective" ? "objective" : "subjective",
      progress: retryExercise({ ...prior.progress, exerciseId: question.id }),
    }));
    focus();
  }
  function reviseAnswer(original = saved?.answer) {
    if (original === undefined) return;
    update((prior) => {
      const next = retryExercise({
        ...prior.progress,
        exerciseId: question.id,
      });
      return {
        ...prior,
        screen: "subjective",
        progress: {
          ...next,
          drafts: {
            ...next.drafts,
            [question.id]: { ...next.drafts[question.id], answer: original },
          },
        },
      };
    });
    focus();
  }
  function finish() {
    update((prior) => {
      let next: FaultProgress = { ...prior.progress, step: "review" };
      if (recall.answer.trim() && !savedRecall)
        next = submitLessonRecall(
          next,
          recallTiming,
          crypto.randomUUID(),
          new Date().toISOString(),
        );
      return { ...prior, progress: next, screen: "finish" };
    });
    focus();
  }
  function exportPreview() {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(session, null, 2)], {
        type: "application/json",
      }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "律真-引导式学习体验记录.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  const primary = (() => {
    if (step === 0)
      return {
        text: "用案例练一练",
        action: () => go(practiceScreen(progress)),
        detail: "做个选择，或者用自己的话说明理由。",
      };
    if (step === 2)
      return {
        text: screen === "finish" ? "回到学习总览" : "收好这次学习",
        action: screen === "finish" ? showOverview : finish,
        detail:
          screen === "finish"
            ? "这次的原答和笔记都已保留。"
            : "已有作答会保留，下次可以接着学。",
      };
    if (feedback)
      return question.kind === "objective" && !summary.writing
        ? {
            text: "再说说理由",
            action: () => go("subjective"),
            detail: "愿意的话，用自己的话再说明一下。",
          }
        : {
            text: "看看本节小结",
            action: () => go("recall"),
            detail: "收好核心区别和这次的思考。",
          };
    return {
      text: "提交并看分析",
      action: submit,
      detail: "保留自己的答案，再看看分析。",
    };
  })();

  const noteForm = saved && (
    <details
      className={s.noteDisclosure}
      key={saved.id}
      open={freshNote ? true : undefined}
    >
      <summary>
        {savedNote ? "查看或补充复习笔记" : "留一句复习笔记"}
        <span>可选</span>
      </summary>
      {savedNote && (
        <p className={s.savedNote} role="status">
          已保存：{savedNote.note || savedNote.answer}
          {savedNote.revisit ? " · 下次重点回顾" : ""}
        </p>
      )}
      <label htmlFor="lesson-note">哪里还没想清？</label>
      <textarea
        id="lesson-note"
        rows={2}
        maxLength={2000}
        value={note.note}
        placeholder="记下一个下次想再看看的问题就好。"
        onChange={(e) =>
          changeProgress((p) => ({
            ...p,
            correctionDrafts: {
              ...p.correctionDrafts,
              [saved.id]: { ...note, note: e.target.value },
            },
          }))
        }
      />
      <label className={s.checkLabel}>
        <input
          type="checkbox"
          checked={note.revisit}
          onChange={(e) =>
            changeProgress((p) => ({
              ...p,
              correctionDrafts: {
                ...p.correctionDrafts,
                [saved.id]: { ...note, revisit: e.target.checked },
              },
            }))
          }
        />
        下次重点回顾
      </label>
      <button
        className={s.secondary}
        disabled={!note.note.trim() && !note.answer.trim()}
        onClick={() =>
          changeProgress((p) =>
            saveCorrection(
              p,
              saved.id,
              crypto.randomUUID(),
              new Date().toISOString(),
            ),
          )
        }
      >
        保存笔记
      </button>
    </details>
  );

  return (
    <>
      <LearningHeader section="study" user={user} session />
      <div className={`${s.shell} ${navHidden ? s.navHidden : ""}`}>
        <a href="#guided-main" className={s.skip}>
          跳到学习内容
        </a>
        <aside
          ref={directory}
          className={`${s.sidebar} ${mobileNav ? s.mobileOpen : ""}`}
          aria-label="课程位置"
          tabIndex={mobileNav ? 0 : undefined}
          onKeyDown={(e) => {
            if (e.key === "Escape") setMobileNav(false);
          }}
        >
          <button className={s.brand} onClick={showOverview}>
            章节学习样例<small>刑法 · 主观方面</small>
          </button>
          <button
            className={s.overviewLink}
            aria-current={overview ? "page" : undefined}
            onClick={showOverview}
          >
            学习总览 <span>全局与今天</span>
          </button>
          <div className={s.courseTitle}>
            <Icon kind="book" />
            <span>刑法 / 主观方面</span>
          </div>
          <p className={s.courseSub}>当前章节 · 六节学习路径</p>
          <ol className={s.courseList}>
            {faultTopics.map((t, i) => (
              <li
                key={t.id}
                className={t.id === lesson.id ? s.currentTopic : ""}
              >
                <span className={s.topicIndex}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {isGuidedLesson(t.id) ? (
                  <button
                    onClick={() => changeLesson(t.id as GuidedLessonId)}
                    disabled={!ready}
                    aria-current={t.id === lesson.id ? "page" : undefined}
                  >
                    {t.title}
                    <small>
                      {t.id === lesson.id ? "本次学习" : "可以切换接续"}
                    </small>
                  </button>
                ) : (
                  <span>{t.title}</span>
                )}
              </li>
            ))}
          </ol>
          <div className={s.routeAside}>
            <p>这一节的位置</p>
            <span>{definition.route[0]}</span>
            <i aria-hidden="true" />
            <strong>{definition.route[1]}</strong>
            <i aria-hidden="true" />
            <span>{definition.route[2]}</span>
          </div>
          <a className={s.returnCourse} href="/units/fault">
            <Icon kind="back" size={16} />
            返回课程目录
          </a>
          <div className={s.sidebarFoot}>
            目录顺序不代表学习进度。
            <br />
            已接入两节，可切换接续。
          </div>
        </aside>

        <div className={s.workspace}>
          <header ref={toolbar} className={s.topbar}>
            <button
              className={s.desktopMenu}
              aria-label={navHidden ? "展开目录" : "收起目录"}
              aria-expanded={!navHidden}
              onClick={() => setNavHidden(!navHidden)}
            >
              <Icon kind="menu" />
            </button>
            <button
              className={s.mobileMenu}
              aria-label={mobileNav ? "收起目录" : "展开目录"}
              aria-expanded={mobileNav}
              onClick={() => setMobileNav(!mobileNav)}
            >
              <Icon kind={mobileNav ? "close" : "menu"} />
            </button>
            <p className={s.breadcrumb}>
              <button onClick={showOverview}>法考备考</button>
              <span>/</span>
              {overview ? (
                <strong>学习总览</strong>
              ) : (
                <>
                  <span className={s.breadcrumbSubject}>刑法</span>
                  <span>/</span>
                  <strong>主观方面</strong>
                </>
              )}
            </p>
            <div className={s.saveStatus}>
              <span className={s.saveDot} />
              {!ready
                ? "正在恢复…"
                : storageIssue
                  ? "暂存于本页"
                  : user
                    ? {
                        loading: "正在读取账号记录…",
                        saved: progress.updatedAt
                          ? "已保存到账号"
                          : "账号已连接",
                        pending: "待保存…",
                        saving: "正在保存…",
                        unavailable: "已暂存，尚未同步",
                        conflict: "记录有冲突",
                        "too-large": "记录需导出备份",
                        "account-changed": "登录状态已变化",
                      }[syncStatus]
                    : progress.updatedAt
                      ? "作答已留在此浏览器"
                      : "作答保存在此浏览器"}
            </div>
            <a className={s.textButton} href="/account?returnTo=lesson">
              {user ? "我的账号" : "登录保存"}
            </a>
            <a className={s.textButton} href="/lab/practice">
              连续刷题
            </a>
            <span className={s.previewLabel}>体验版</span>
          </header>
          {storageIssue && (
            <div className={s.storageWarning} role="alert">
              浏览器记录暂时无法继续保存，或已在另一页面更改。请先导出本页内容，再刷新接续。
              <button onClick={exportPreview}>导出本页记录</button>
            </div>
          )}
          {user &&
            ready &&
            !storageIssue &&
            ["unavailable", "conflict", "account-changed"].includes(
              syncStatus,
            ) && (
              <div className={s.storageWarning} role="status">
                {syncStatus === "conflict"
                  ? "账号与本页记录不同，已保留本页内容。请导出后在学习记录页处理。"
                  : syncStatus === "account-changed"
                    ? "登录状态已变化，本页内容已暂存。请重新确认账号。"
                    : "连接暂时不可用，作答已留在当前浏览器。"}
                <button onClick={exportPreview}>导出本页记录</button>
                {syncStatus === "unavailable" && (
                  <button onClick={retrySync}>重新同步</button>
                )}
                {syncStatus === "conflict" && (
                  <a href="/units/fault">处理记录</a>
                )}
                {syncStatus === "account-changed" && (
                  <a href="/account?returnTo=lesson">查看账号</a>
                )}
              </div>
            )}
          {user && hasPreview && ready && (
            <div className={s.storageWarning}>
              之前的试学原答仍在此浏览器，还未迁入当前账号。
              <a href="/records/import?source=lesson">核对并迁入试学记录</a>
            </div>
          )}
          {!overview && (
            <div className={s.lessonLocation}>
              <div className={s.lessonName}>
                <span>犯罪的一般判断 / 主观方面</span>
                <strong>{lesson.title}</strong>
              </div>
              <div className={s.lessonMeta}>
                <span>
                  <Icon kind="clock" size={14} />约 {lesson.minutes} 分钟
                </span>
                <span>
                  本章第 {faultTopics.findIndex((t) => t.id === lesson.id) + 1}{" "}
                  / 6 节
                </span>
              </div>
              <button onClick={showOverview}>
                查看学习位置 <Icon kind="arrow" size={15} />
              </button>
            </div>
          )}
          {!overview && (
            <nav className={s.steps} aria-label="本节学习步骤">
              {steps.map((title, i) => (
                <button
                  key={title}
                  disabled={!ready}
                  onClick={() =>
                    go(
                      (
                        [
                          "concept",
                          practiceScreen(progress),
                          "recall",
                        ] as LessonScreen[]
                      )[i],
                    )
                  }
                  aria-current={step === i ? "step" : undefined}
                >
                  <span className={s.stepNumber}>{i + 1}</span>
                  {title}
                </button>
              ))}
            </nav>
          )}
          <main
            id="guided-main"
            className={`${s.main} ${overview ? s.overviewMain : ""}`}
            ref={main}
            tabIndex={-1}
          >
            {!ready ? (
              <p className={s.loading} role="status">
                正在整理这一节的学习位置…
              </p>
            ) : overview ? (
              <LearningOverview
                progress={progress}
                onResume={resumeLesson}
                onStart={() => go("concept")}
                onSelect={changeLesson}
              />
            ) : (
              <div
                className={s.content}
                key={`${lesson.id}:${screen}`}
                data-screen={screen}
                data-lesson={lesson.id}
              >
                {(screen === "concept" || screen === "case") && (
                  <div className={s.knowledgeSheet}>
                    <h1>{lesson.headline}</h1>
                    <p className={s.lead}>{lesson.goal}</p>
                    <section className={s.comparison} aria-label="本节核心区别">
                      <div className={s.shared}>
                        <span>共同点</span>
                        {definition.comparison.common}
                      </div>
                      <div className={s.conceptPair}>
                        {definition.comparison.sides.map((side) => (
                          <div key={side.name}>
                            <p>{side.name}</p>
                            <h2>{side.attitude}</h2>
                            <span>{side.explanation}</span>
                          </div>
                        ))}
                      </div>
                      <p className={s.comparisonBottom}>
                        <strong>记住这个区别：</strong>
                        {lesson.pitfall}
                      </p>
                    </section>
                    <details className={s.deeperReading}>
                      <summary>还没分清？展开看看解释</summary>
                      <p>{lesson.paragraphs[1]}</p>
                      <p>{lesson.paragraphs[2]}</p>
                    </details>
                    {previous && (
                      <section
                        className={s.lessonConnection}
                        aria-label="接上前一节"
                      >
                        <span className={s.connectionLabel}>接上前一节</span>
                        <p>{definition.bridge}</p>
                        {(previousAnswer || previousRecall) && (
                          <details className={s.disclosure}>
                            <summary>回看上一节留下的思考</summary>
                            {previousAnswer && (
                              <>
                                <p>
                                  上一节“{previous.subjective.title}”的原答：
                                </p>
                                <p className={s.original}>
                                  {previousAnswer.answer}
                                </p>
                              </>
                            )}
                            {previousRecall && (
                              <>
                                <p>上一节的回忆：</p>
                                <p className={s.original}>
                                  {previousRecall.answer}
                                </p>
                              </>
                            )}
                            <p className={s.caption}>
                              这里保留的是你的原话，不代表已经核对正确。
                            </p>
                          </details>
                        )}
                        <button
                          className={s.textButton}
                          onClick={() => changeLesson(definition.previous!)}
                        >
                          回到：{previous.topic.title}{" "}
                          <Icon kind="back" size={15} />
                        </button>
                      </section>
                    )}
                    <Sources lesson={lesson} />
                  </div>
                )}
                {(screen.startsWith("objective") ||
                  screen.startsWith("subjective")) && (
                  <>
                    <h1>把判断用在这段案情里。</h1>
                    <p className={s.lead}>
                      可以先做个选择，也可以直接说说理由。两种方式任选。
                    </p>
                    <div className={s.practiceDesk}>
                      <div className={s.caseColumn}>
                        <Case question={subjective} />
                      </div>
                      <div className={s.responseColumn}>
                        <div
                          className={s.practiceModes}
                          aria-label="选择练习方式"
                        >
                          <button
                            aria-pressed={question.kind === "objective"}
                            onClick={() => go("objective")}
                          >
                            做个选择 {summary.choice && <small>已答</small>}
                          </button>
                          <button
                            aria-pressed={question.kind === "subjective"}
                            onClick={() => go("subjective")}
                          >
                            说说理由 {summary.writing && <small>已答</small>}
                          </button>
                        </div>
                        {!feedback ? (
                          <div>
                            <p className={s.practicePrompt}>
                              {question.prompt}
                            </p>
                            {question.options && (
                              <fieldset className={s.options}>
                                <legend className={s.srOnly}>
                                  选择你的判断
                                </legend>
                                {question.options.map((option) => (
                                  <label
                                    key={option.id}
                                    className={
                                      draft.choice === option.id
                                        ? s.selected
                                        : ""
                                    }
                                  >
                                    <input
                                      type="radio"
                                      name={`${lesson.id}-choice`}
                                      value={option.id}
                                      checked={draft.choice === option.id}
                                      onChange={() =>
                                        edit({ choice: option.id })
                                      }
                                    />
                                    <span className={s.optionLetter}>
                                      {option.id.toUpperCase()}
                                    </span>
                                    <span>{option.text}</span>
                                  </label>
                                ))}
                              </fieldset>
                            )}
                            {question.kind === "subjective" ? (
                              <div className={s.answerBox}>
                                <label htmlFor="lesson-answer">
                                  我的分析
                                  <span>{draft.answer.length} / 8000</span>
                                </label>
                                <textarea
                                  id="lesson-answer"
                                  rows={6}
                                  value={draft.answer}
                                  maxLength={8000}
                                  placeholder="我认为……因为题目中……"
                                  onChange={(e) =>
                                    edit({ answer: e.target.value })
                                  }
                                />
                              </div>
                            ) : null}
                            <div className={s.helpRow}>
                              <button
                                className={s.textButton}
                                onClick={() => edit({ hintUsed: true })}
                              >
                                给我一点提示
                              </button>
                              <span>
                                {seenCaseReference
                                  ? "已看过本案例的参考，这次作为巩固练习。"
                                  : "提交前不会展开参考答案。"}
                              </span>
                            </div>
                            {draft.hintUsed && (
                              <p className={s.hint} role="status">
                                {question.hint}
                              </p>
                            )}
                          </div>
                        ) : (
                          <>
                            {question.kind === "objective" && (
                              <p
                                className={s.choiceResult}
                                data-correct={saved!.choice === question.answer}
                                role="status"
                              >
                                <Icon
                                  kind={
                                    saved!.choice === question.answer
                                      ? "check"
                                      : "book"
                                  }
                                  size={17}
                                />
                                {saved!.choice === question.answer
                                  ? "这次选择正确。"
                                  : "这次选择与参考不同。"}
                                <span>
                                  你选了 {saved!.choice.toUpperCase()}
                                </span>
                              </p>
                            )}
                            {question.kind === "objective" ? (
                              <section className={s.objectiveReview}>
                                <div className={s.correctAnswer}>
                                  <span>参考选择</span>
                                  <strong>
                                    {question.answer!.toUpperCase()}
                                  </strong>
                                  <p>
                                    {
                                      question.options!.find(
                                        (o) => o.id === question.answer,
                                      )!.text
                                    }
                                  </p>
                                </div>
                                <p className={s.referenceText}>
                                  {question.reference}
                                </p>
                                {saved!.choice !== question.answer && (
                                  <p className={s.misunderstanding}>
                                    你所选的 {saved!.choice.toUpperCase()}：
                                    {
                                      question.options!.find(
                                        (o) => o.id === saved!.choice,
                                      )!.explanation
                                    }
                                  </p>
                                )}
                                <details className={s.disclosure}>
                                  <summary>逐项看为什么</summary>
                                  {question.options!.map((o) => (
                                    <p key={o.id}>
                                      <strong>{o.id.toUpperCase()}.</strong>{" "}
                                      {o.explanation}
                                    </p>
                                  ))}
                                </details>
                                <details className={s.disclosure}>
                                  <summary>回看题目与我的原答</summary>
                                  <p>选择：{saved!.choice.toUpperCase()}</p>
                                  <p className={s.original}>
                                    {saved!.answer || "当时没有补充文字理由。"}
                                  </p>
                                </details>
                              </section>
                            ) : (
                              <>
                                <div className={s.caseWritingReview}>
                                  <details className={s.originalDisclosure}>
                                    <summary>我的原答</summary>
                                    <p className={s.original}>
                                      {saved!.answer}
                                    </p>
                                    <span>
                                      <Icon kind="check" size={14} />
                                      原文保留
                                    </span>
                                  </details>
                                  <div className={s.reviewColumn}>
                                    {definition.feedbackExerciseId ===
                                    question.id ? (
                                      <AnswerFeedback
                                        key={saved!.id}
                                        attemptId={saved!.id}
                                        answer={saved!.answer}
                                        onRevise={() => reviseAnswer()}
                                      />
                                    ) : (
                                      <p className={s.caption}>
                                        原答已保存。这一节先对照参考分析，尚未提供
                                        AI 批改。
                                      </p>
                                    )}
                                    <section className={s.referencePanel}>
                                      <h2>
                                        参考怎样分析 <span>统一参考</span>
                                      </h2>
                                      <p>{question.reference}</p>
                                    </section>
                                  </div>
                                </div>
                                <details className={s.criteria}>
                                  <summary>对照本题的三个参考要点</summary>
                                  <p className={s.caption}>
                                    这里列出参考要点，不自动判断你是否答到了。
                                  </p>
                                  {question.criteria!.map((c, i) => (
                                    <div key={c.id}>
                                      <span>{i + 1}</span>
                                      <div>
                                        <h3>{c.label}</h3>
                                        <p>{c.meaning}</p>
                                      </div>
                                    </div>
                                  ))}
                                  <details className={s.disclosure}>
                                    <summary>查看表达边界与原案情</summary>
                                    <p>{question.facts}</p>
                                    {question.criteria!.map((c) => (
                                      <p key={c.id}>
                                        <strong>{c.label}：</strong>
                                        {c.acceptable} {c.boundary}
                                      </p>
                                    ))}
                                  </details>
                                </details>
                              </>
                            )}
                            <p className={s.caption}>
                              {saved!.referenceSeenBeforeAnswer
                                ? "这次作答前已看过本案例的参考。"
                                : saved!.hintUsed
                                  ? "这次作答使用过提示。"
                                  : "这次作答前未使用提示或查看本题参考。"}
                              选对或看懂参考，不等于已经掌握。
                            </p>
                            {noteForm}
                            <button className={s.textButton} onClick={retry}>
                              保留原答，再试一次
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
                {(screen === "recall" || screen === "finish") && (
                  <div className={s.lessonSummary}>
                    <h1>这一节，带走什么？</h1>
                    <p className={s.lead}>
                      {screen === "finish"
                        ? "这次学习已收好，下次可以从这里接上。"
                        : "收好核心区别，也看看这次练习留下了什么。"}
                    </p>
                    <section className={s.summaryCore}>
                      <h2>记住这一点</h2>
                      <p>{definition.core}</p>
                    </section>
                    <section
                      className={s.summaryEvidence}
                      aria-label="这次的实际表现"
                    >
                      <h2>这次的练习</h2>
                      <div>
                        <span>做个选择</span>
                        <p>{summary.choiceText}</p>
                      </div>
                      <div>
                        <span>说说理由</span>
                        <p>{summary.writingText}</p>
                      </div>
                      {summary.choiceCorrect === false && (
                        <p className={s.summaryReminder}>
                          {
                            objective.options!.find(
                              (o) => o.id === summary.choice!.choice,
                            )?.explanation
                          }
                        </p>
                      )}
                      <p className={s.caption}>
                        这些是本次作答的记录，还不代表已经掌握。
                      </p>
                    </section>
                    <section className={s.summaryNext}>
                      <div>
                        <h2>下一次，从这里接上</h2>
                        <p>{summary.next}</p>
                        {savedRecall && (
                          <p className={s.caption}>
                            你安排的回忆日期：
                            {new Date(
                              reviewSchedule(progress).find(
                                (r) => r.topicId === lesson.id,
                              )!.dueAt,
                            ).toLocaleDateString("zh-CN", {
                              month: "long",
                              day: "numeric",
                            })}
                            。
                          </p>
                        )}
                        {notes
                          .filter((n) => n.revisit)
                          .map((n) => (
                            <p className={s.savedNote} key={n.id}>
                              你想再想想：{n.note || n.answer}
                            </p>
                          ))}
                      </div>
                      <button
                        className={s.textButton}
                        onClick={() =>
                          go(
                            summary.choiceCorrect === false || !answerCount
                              ? "objective"
                              : "concept",
                          )
                        }
                      >
                        {summary.choiceCorrect === false || !answerCount
                          ? "回到案例"
                          : "回看知识"}
                        <Icon kind="arrow" size={15} />
                      </button>
                    </section>
                    {definition.next && (
                      <section
                        className={s.lessonConnection}
                        aria-label="继续下一节"
                      >
                        <p>{definition.bridge}</p>
                        <button
                          className={s.textButton}
                          onClick={() => changeLesson(definition.next!)}
                        >
                          继续：{guidedLessonFor(definition.next).topic.title}{" "}
                          <Icon kind="arrow" size={15} />
                        </button>
                        <span className={s.caption}>
                          今天可以停在这里，也可以接着学。
                        </span>
                      </section>
                    )}
                    <details className={s.optionalRecall}>
                      <summary>
                        {savedRecall
                          ? "查看我的回忆"
                          : recall.answer.trim()
                            ? "继续这句回忆"
                            : "试着回忆一句"}
                        <span>可选</span>
                      </summary>
                      <p className={s.recallQuestion}>{lesson.recall.prompt}</p>
                      <div className={s.answerBox}>
                        <label htmlFor="lesson-recall">我回想起的内容</label>
                        <textarea
                          id="lesson-recall"
                          rows={3}
                          maxLength={8000}
                          value={recall.answer}
                          readOnly={!!savedRecall}
                          placeholder="想到什么，就写什么。"
                          onChange={(e) =>
                            changeProgress((p) => ({
                              ...p,
                              recallDrafts: {
                                ...p.recallDrafts,
                                [lesson.id]: {
                                  ...recall,
                                  answer: e.target.value,
                                },
                              },
                            }))
                          }
                        />
                      </div>
                      {!savedRecall ? (
                        <>
                          <fieldset className={s.timing}>
                            <legend>下次什么时候再回忆？</legend>
                            <label>
                              <input
                                type="radio"
                                name="recall-timing"
                                checked={recallTiming === "again"}
                                onChange={() => setRecallTiming("again")}
                              />
                              明天，再巩固一下
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="recall-timing"
                                checked={recallTiming === "later"}
                                onChange={() => setRecallTiming("later")}
                              />
                              隔几天，再试着回想
                            </label>
                          </fieldset>
                          <button
                            className={s.secondary}
                            disabled={!recall.answer.trim()}
                            onClick={() =>
                              changeProgress((p) =>
                                submitLessonRecall(
                                  p,
                                  recallTiming,
                                  crypto.randomUUID(),
                                  new Date().toISOString(),
                                ),
                              )
                            }
                          >
                            保存这次回忆
                          </button>
                        </>
                      ) : (
                        <p className={s.caption}>原文已保留。</p>
                      )}
                    </details>
                    <details className={s.disclosure}>
                      <summary>查看这次的全部原始作答</summary>
                      {lessonAttempts.map((a, i) => (
                        <div key={a.id}>
                          <p>
                            <strong>
                              作答 {i + 1} ·{" "}
                              {
                                savedExerciseFor(a.exerciseId, a.revision)
                                  ?.title
                              }
                            </strong>
                            {a.choice && ` · 选择 ${a.choice.toUpperCase()}`}
                          </p>
                          <p>
                            {savedExerciseFor(a.exerciseId, a.revision)?.facts}
                          </p>
                          <p className={s.original}>
                            {a.answer || "没有补充文字理由。"}
                          </p>
                          <p className={s.caption}>
                            {a.referenceSeenBeforeAnswer
                              ? "之前看过参考"
                              : "未先看参考"}{" "}
                            · {a.hintUsed ? "使用过提示" : "未使用提示"}
                          </p>
                          {a.exerciseId === definition.feedbackExerciseId && (
                            <>
                              <button
                                className={s.textButton}
                                onClick={() =>
                                  setHistoryFeedback(
                                    historyFeedback === a.id ? null : a.id,
                                  )
                                }
                              >
                                {historyFeedback === a.id
                                  ? "收起该次反馈"
                                  : "查看该次反馈"}
                              </button>
                              {historyFeedback === a.id && (
                                <AnswerFeedback
                                  key={a.id}
                                  attemptId={a.id}
                                  answer={a.answer}
                                  onRevise={() => reviseAnswer(a.answer)}
                                />
                              )}
                            </>
                          )}
                        </div>
                      ))}
                    </details>
                  </div>
                )}
              </div>
            )}
          </main>
          {ready && !overview && (
            <footer className={s.actionBar}>
              <div>
                <span>{steps[step]}</span>
                <p>{primary.detail}</p>
              </div>
              <div className={s.actionChoices}>
                {step === 1 && primary.text !== "看看本节小结" && (
                  <button
                    className={s.skipPractice}
                    onClick={() => go("recall")}
                  >
                    先看小结
                  </button>
                )}
                <button
                  className={s.primary}
                  onClick={primary.action}
                  disabled={
                    !feedback &&
                    (screen === "objective"
                      ? !draft.choice
                      : screen === "subjective"
                        ? !draft.answer.trim()
                        : false)
                  }
                >
                  {primary.text}
                  <Icon kind="arrow" size={18} />
                </button>
              </div>
            </footer>
          )}
          <div className={s.previewFoot}>
            {user
              ? "作答随账号保存，连接异常时先暂存在此浏览器。"
              : "作答暂存于当前浏览器，登录后可核对迁入。"}
            AI 试用反馈仅保存在本机，不计入分数或掌握状态。
          </div>
        </div>
      </div>
    </>
  );
}

function Case({ question }: { question: UnitExercise }) {
  return (
    <section className={s.caseSheet} aria-label="本题案情">
      <span className={s.caseTag}>本题案情</span>
      <p>{question.facts}</p>
    </section>
  );
}
function Sources({ lesson }: { lesson: FaultTopic }) {
  return (
    <details className={s.disclosure}>
      <summary>法源与适用范围</summary>
      <p>本节沿用已编排的入门内容，用于主观罪过辨析，不据此确定具体罪名。</p>
      {lesson.sources.map((key) => (
        <p key={key}>
          <a href={faultSources[key].url} target="_blank" rel="noreferrer">
            {faultSources[key].title}
          </a>
          <br />
          {faultSources[key].note}
        </p>
      ))}
    </details>
  );
}
