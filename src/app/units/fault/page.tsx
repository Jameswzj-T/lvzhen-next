"use client";
import { isHistoricalPracticeQuestion } from "@/content/practice-content-history";
import { HistoricalPractice } from "@/app/lab/practice/historical-practice";
import { preserveQuestionHistorySource } from "@/records/question-history-source";
import { LearningHeader } from "@/app/lab/_components/learning-frame";
import { practiceSubject } from "@/content/practice-set";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  exerciseFor,
  savedExerciseFor,
  topicSources,
  faultTopics,
  learningTopics,
  topicFor,
} from "@/content/fault-catalog";
import {
  chooseTopic,
  faultStorageKey as guestStorageKey,
  finishTopic,
  freshDraft,
  freshProgress,
  hasThreeDayGap,
  nextTask,
  restoreProgress,
  resumeAfterRecall,
  retryExercise,
  reviewSchedule,
  startRecall,
  submitExercise,
  submitRecall,
  type FaultProgress,
  type UnitDraft,
} from "@/domain/fault-progress";
import styles from "./unit.module.css";
import { transferSources } from "@/content/fault-transfer";
import { StudyPlan } from "./study-plan";
import { Correction } from "./correction";
import { saveCorrection, finishCorrectionReview } from "@/domain/corrections";
import { httpRecords, ProgressSync, type SyncStatus } from "@/records/sync";
import {
  choiceMode,
  choiceModeLabel,
  selectedChoices,
  toggleChoice,
  isCorrectChoice,
  answerLabel,
} from "@/domain/objective-answer";

const stepNames = {
  learn: "理解与案例",
  practice: "自己作答",
  review: "回忆与接续",
};
import { StudyGate } from "@/accounts/study-gate";
import type { Learner } from "@/accounts/client";
const dateLabel = (date: string) =>
  new Date(date).toLocaleDateString("zh-CN", { month: "long", day: "numeric" });

export default function FaultUnitPage() {
  return (
    <StudyGate>
      {(user) => <FaultStudy key={user?.id ?? "guest"} user={user} />}
    </StudyGate>
  );
}
function FaultStudy({ user }: { user: Learner }) {
  const learnerId = user?.id ?? null;
  const faultStorageKey = learnerId
    ? `${guestStorageKey}:account:${learnerId}`
    : guestStorageKey;
  const serverGenerationKey = `${faultStorageKey}:server-generation`;
  const recoveryPrefix = `${faultStorageKey}:before-recovery:`;
  const transport = useMemo(
    () => (learnerId ? httpRecords(learnerId) : null),
    [learnerId],
  );
  const [state, setState] = useState<FaultProgress>(freshProgress);
  const stateRef = useRef(state);
  const storedRaw = useRef<string | null>(null);
  const writable = useRef(false);
  const [ready, setReady] = useState(false);
  const [storage, setStorage] = useState<
    "ok" | "unreadable" | "unavailable" | "conflict"
  >("ok");
  const [returning, setReturning] = useState<{
    gap: boolean;
    at: string;
    topicId: string;
  } | null>(null);
  const [view, setView] = useState<"plan" | "study" | "records">("plan");
  const [menuOpen, setMenuOpen] = useState(false);
  const [error, setError] = useState("");
  const [now, setNow] = useState<string | null>(null);
  const contentRef = useRef<HTMLElement>(null);
  const sync = useRef<ProgressSync | null>(null);
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("loading");
  const [hasRecoveryCopy, setHasRecoveryCopy] = useState(false);

  useEffect(() => {
    const refreshClock = () => setNow(new Date().toISOString());
    const timer = setInterval(refreshClock, 60000);
    window.addEventListener("focus", refreshClock);
    return () => {
      clearInterval(timer);
      window.removeEventListener("focus", refreshClock);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const at = new Date().toISOString();
    setNow(at);
    async function initialize() {
      try {
        const raw = localStorage.getItem(faultStorageKey);
        setHasRecoveryCopy(
          Object.keys(localStorage).some((key) =>
            key.startsWith(recoveryPrefix),
          ),
        );
        storedRaw.current = raw;
        const restored = restoreProgress(raw);
        stateRef.current = restored.state;
        setState(restored.state);
        writable.current = restored.status !== "unreadable";
        if (restored.status === "unreadable") setStorage("unreadable");
        let current = restored.state;
        if (writable.current && raw !== null) {
          await preserveQuestionHistorySource(
            localStorage,
            faultStorageKey,
            raw,
            current,
          );
          if (cancelled) return;
          if (localStorage.getItem(faultStorageKey) !== raw) {
            writable.current = false;
            setStorage("conflict");
            setReady(true);
            return;
          }
        }
        if (writable.current && transport) {
          const connection = new ProgressSync(
            transport,
            (status) => {
              if (!cancelled) setSyncStatus(status);
            },
            (generation) => {
              if (!cancelled) {
                try {
                  localStorage.setItem(serverGenerationKey, String(generation));
                } catch {
                  /* A missing marker causes a safe conflict on reload. */
                }
              }
            },
          );
          sync.current = connection;
          const known = localStorage.getItem(serverGenerationKey);
          const recovered = await connection.open(
            raw === null ? null : current,
            known !== null &&
              /^\d+$/.test(known) &&
              Number.isSafeInteger(Number(known))
              ? Number(known)
              : null,
          );
          if (cancelled) {
            connection.stop();
            return;
          }
          if (localStorage.getItem(faultStorageKey) !== storedRaw.current) {
            writable.current = false;
            setStorage("conflict");
            connection.stop();
          } else if (recovered) {
            current = recovered;
            const recoveredRaw = JSON.stringify(current);
            await preserveQuestionHistorySource(
              localStorage,
              faultStorageKey,
              recoveredRaw,
              current,
            );
            if (cancelled) return;
            if (
              !writable.current ||
              localStorage.getItem(faultStorageKey) !== storedRaw.current
            ) {
              writable.current = false;
              setStorage("conflict");
              connection.stop();
              setReady(true);
              return;
            }
            localStorage.setItem(faultStorageKey, recoveredRaw);
            storedRaw.current = recoveredRaw;
            stateRef.current = current;
            setState(current);
            void connection.flush();
          }
        }
        if (current.updatedAt)
          setReturning({
            gap: hasThreeDayGap(current, at),
            at: current.updatedAt,
            topicId: current.topicId,
          });
      } catch {
        if (cancelled) return;
        writable.current = false;
        setStorage("unavailable");
      }
      if (!cancelled) setReady(true);
    }
    void initialize();
    function changed(event: StorageEvent) {
      if (
        (event.key === faultStorageKey || event.key === null) &&
        event.newValue !== storedRaw.current
      ) {
        writable.current = false;
        sync.current?.stop();
        setStorage("conflict");
      }
    }
    window.addEventListener("storage", changed);
    return () => {
      cancelled = true;
      sync.current?.stop();
      if (syncTimer.current) clearTimeout(syncTimer.current);
      window.removeEventListener("storage", changed);
    };
  }, [faultStorageKey, serverGenerationKey, recoveryPrefix, transport]);

  function change(update: (previous: FaultProgress) => FaultProgress) {
    if (!ready) return;
    const next = update(stateRef.current);
    if (next === stateRef.current) return;
    const updated = { ...next, updatedAt: new Date().toISOString() };
    stateRef.current = updated;
    setState(updated);
    setNow(updated.updatedAt);
    setError("");
    if (writable.current) {
      try {
        if (localStorage.getItem(faultStorageKey) !== storedRaw.current) {
          writable.current = false;
          sync.current?.stop();
          setStorage("conflict");
          return;
        }
        const raw = JSON.stringify(updated);
        localStorage.setItem(faultStorageKey, raw);
        storedRaw.current = raw;
        sync.current?.enqueue(updated);
        if (syncTimer.current) clearTimeout(syncTimer.current);
        syncTimer.current = setTimeout(() => void sync.current?.flush(), 500);
      } catch {
        writable.current = false;
        setStorage("unavailable");
      }
    }
  }

  const topic = topicFor(state.topicId)!;
  const topicIndex = faultTopics.indexOf(topic);
  const isTransfer = topic.id === "transfer";
  const visibleSteps = isTransfer
    ? (["practice", "review"] as const)
    : (["learn", "practice", "review"] as const);
  const question = exerciseFor(state.exerciseId)!;
  const questionIndex = topic.exercises.indexOf(question);
  const draft = state.drafts[question.id] ?? freshDraft();
  const recall = state.recallDrafts[topic.id] ?? freshDraft();
  const saved = state.attempts.find((a) => a.id === draft.submittedId);
  const savedRecall = state.reviews.find((r) => r.id === recall.submittedId);
  const allAnswered = topic.exercises
    .filter((q) => !q.optional)
    .every((q) => state.attempts.some((a) => a.exerciseId === q.id));
  const schedule = reviewSchedule(state);
  const due = now ? schedule.find((item) => item.dueAt <= now) : null;
  const next = now ? nextTask(state, now) : null;
  const lastEvidence = returning
    ? state.attempts.findLast((attempt) =>
        topicFor(returning.topicId)?.exercises.some(
          (q) => q.id === attempt.exerciseId,
        ),
      )
    : null;

  function focusContent() {
    requestAnimationFrame(() => {
      contentRef.current?.focus({ preventScroll: true });
      contentRef.current?.scrollIntoView({ block: "start" });
    });
  }
  function openTopic(id: string, review = false) {
    change((previous) =>
      review ? startRecall(previous, id) : chooseTopic(previous, id),
    );
    setView("study");
    setMenuOpen(false);
    setReturning(null);
    focusContent();
  }
  function openStep(step: FaultProgress["step"]) {
    change((previous) => ({ ...previous, step }));
    focusContent();
  }
  function updateDraft(patch: Partial<UnitDraft>, isRecall = false) {
    const key = isRecall ? "recallDrafts" : "drafts";
    const id = isRecall ? state.topicId : state.exerciseId;
    change((previous) => ({
      ...previous,
      [key]: {
        ...previous[key],
        [id]: { ...(previous[key][id] ?? freshDraft()), ...patch },
      },
    }));
  }
  function submit() {
    if (question.kind === "objective" ? !draft.choice : !draft.answer.trim()) {
      setError(
        question.kind === "objective"
          ? "先选择一个判断。暂时不会，可以先看提示或参考分析。"
          : "先写一点自己的分析。暂时不会，可以先看参考分析；不会计为答错。",
      );
      return;
    }
    change((previous) =>
      submitExercise(previous, crypto.randomUUID(), new Date().toISOString()),
    );
  }
  function saveRecall(selfReport: "again" | "later") {
    if (!recall.answer.trim()) {
      setError(
        "先写下你回想起的内容，再保存这次回忆；暂时想不起来也可以如实写下。",
      );
      return;
    }
    change((previous) =>
      submitRecall(
        previous,
        selfReport,
        crypto.randomUUID(),
        new Date().toISOString(),
      ),
    );
  }
  function nextExercise() {
    const following = topic.exercises[questionIndex + 1];
    if (following)
      change((previous) => ({ ...previous, exerciseId: following.id }));
    else if (allAnswered)
      change((previous) => finishTopic(previous, new Date().toISOString()));
    else openStep("review");
    focusContent();
  }
  function downloadJson(value: unknown, filename: string) {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(value, null, 2)], { type: "application/json" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function downloadRecords() {
    downloadJson(stateRef.current, "律真-罪过单元学习记录.json");
  }
  function downloadRecoveryCopies() {
    try {
      const copies = Object.keys(localStorage)
        .filter((key) => key.startsWith(recoveryPrefix))
        .map((key) => ({
          id: key.slice(recoveryPrefix.length),
          state: JSON.parse(localStorage.getItem(key)!),
        }));
      downloadJson({ recoveryCopies: copies }, "律真-恢复前的学习记录.json");
    } catch {
      setError("暂时不能导出恢复副本，请保留浏览器数据后再试。");
    }
  }

  async function restoreBackup() {
    try {
      if (!transport) return;
      const saved = await transport.load();
      if (
        !saved.state ||
        !writable.current ||
        localStorage.getItem(faultStorageKey) !== storedRaw.current
      ) {
        setError("记录状态有变化，当前内容已保留，请先导出后重新打开页面。");
        return;
      }
      // Keep a second local copy even if the browser blocks or cancels the download.
      localStorage.setItem(
        `${recoveryPrefix}${crypto.randomUUID()}`,
        JSON.stringify(stateRef.current),
      );
      downloadRecords();
      sync.current?.stop();
      localStorage.setItem(faultStorageKey, JSON.stringify(saved.state));
      window.location.reload();
    } catch {
      setError("暂时不能恢复备份，当前作答保持原样。");
    }
  }

  if (ready && isHistoricalPracticeQuestion(state.exerciseId))
    return (
      <div className={styles.shell}>
        <LearningHeader section="study" user={user} session />
        <main id="unit-content">
          <HistoricalPractice
            state={state}
            disabled={!writable.current}
            onStart={(id) =>
              window.location.assign(
                `/lab/practice?subject=administrative-law&question=${encodeURIComponent(id)}`,
              )
            }
          />
        </main>
      </div>
    );

  return (
    <div className={styles.shell}>
      <a href="#unit-content" className={styles.skip}>
        跳到学习内容
      </a>
      <LearningHeader
        section="study"
        user={user}
        session
        practiceDirectoryHref={
          ready && practiceSubject(state.exerciseId) === "civil-law"
            ? "/lab/practice?subject=civil-law&view=library"
            : undefined
        }
      />
      <header className={styles.topbar}>
        <span className={styles.location}>刑法 / 犯罪成立 / 主观方面</span>

        <button
          className={styles.textButton}
          aria-current={view === "plan" ? "page" : undefined}
          onClick={() => {
            setView("plan");
            focusContent();
          }}
        >
          今日安排
        </button>
        <button
          className={styles.textButton}
          onClick={() => {
            setView(view === "records" ? "study" : "records");
            setError("");
          }}
        >
          {view === "records" ? "回到学习" : "学习记录"}
        </button>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <p className={styles.unitLabel}>连贯学习单元</p>
          <h2>
            故意、过失
            <br className={styles.desktopBreak} />
            与意外事件
          </h2>
          <p className={styles.scope}>客观辨析与主观表达共用基础</p>
          <button
            className={styles.menuToggle}
            aria-expanded={menuOpen}
            aria-controls="unit-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {isTransfer ? "关联应用" : `第 ${topicIndex + 1} 节`} ·{" "}
            {topic.title}
            <span>{menuOpen ? "收起目录" : "展开学习目录"}</span>
          </button>
          <nav
            id="unit-menu"
            aria-label="单元目录"
            className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`}
          >
            <ol>
              {learningTopics.map((item, index) => (
                <li key={item.id}>
                  <button
                    disabled={!ready}
                    aria-current={
                      state.topicId === item.id && view === "study"
                        ? "page"
                        : undefined
                    }
                    onClick={() => openTopic(item.id)}
                  >
                    <span className={styles.topicNumber}>
                      {item.id === "transfer" ? "+" : index + 1}
                    </span>
                    <span>
                      {item.title}
                      <small>
                        {state.finished[item.id]
                          ? "已完成本节练习"
                          : state.attempts.some((a) =>
                                item.exercises.some(
                                  (q) => q.id === a.exerciseId,
                                ),
                              )
                            ? "已有作答记录"
                            : item.id === "transfer"
                              ? "三道新题 · 可选练习"
                              : "讲解、案例与练习"}
                      </small>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>
          <div className={styles.sidebarFoot}>
            每次学一节，也可以从熟悉的地方开始。
            <a href="/">回到初始样例与科目路线</a>
          </div>
        </aside>

        <main
          id="unit-content"
          className={styles.main}
          ref={contentRef}
          tabIndex={-1}
        >
          {storage !== "ok" && (
            <div className={styles.warning} role="status">
              {storage === "unreadable"
                ? "已有记录的格式或内容版本无法读取，原记录保持原样。本页新作答只能暂存于本次页面。"
                : storage === "conflict"
                  ? "另一个页面已更新学习记录。本页暂停写入，保留你正在写的内容；请先导出，再刷新查看最新记录。"
                  : "浏览器暂不能保存。本次作答仍在当前页面，请先导出记录，避免刷新后丢失。"}
              <button className={styles.textButton} onClick={downloadRecords}>
                导出当前记录
              </button>
            </div>
          )}
          {!ready && <p role="status">正在恢复学习位置……</p>}
          {ready && storage === "ok" && (
            <div role="status" className={styles.due}>
              <span>
                {!user
                  ? "本地试学：作答保存在当前浏览器。登录后可使用独立的账号记录。"
                  : syncStatus === "account-changed"
                    ? "登录已过期或账号发生变化，当前草稿已保留。请重新打开学习页面。"
                    : syncStatus === "saved"
                      ? state.updatedAt
                        ? "已保存到你的账号。"
                        : "你的学习记录已连接。"
                      : syncStatus === "conflict"
                        ? "账号备份与浏览器记录不同，已暂停同步，当前作答保留在浏览器。"
                        : syncStatus === "too-large"
                          ? "记录超出单次同步上限，完整内容仍在本机，请先导出备份。"
                          : syncStatus === "unavailable"
                            ? "账号备份暂不可用，当前作答已保存在浏览器。"
                            : "当前作答已保存在浏览器，正在备份……"}
              </span>
              {user && syncStatus === "account-changed" && (
                <a href="/units/fault">重新打开</a>
              )}
              {user && syncStatus === "unavailable" && (
                <button
                  className={styles.textButton}
                  onClick={() => {
                    sync.current?.enqueue(stateRef.current);
                    void sync.current?.flush(true);
                  }}
                >
                  重试备份
                </button>
              )}
              {syncStatus === "conflict" && (
                <button
                  className={styles.textButton}
                  onClick={() => void restoreBackup()}
                >
                  导出当前记录并恢复备份
                </button>
              )}
            </div>
          )}

          {view === "plan" ? (
            ready && now ? (
              <StudyPlan
                state={state}
                at={now}
                onReviewCorrection={(id) =>
                  change((previous) =>
                    finishCorrectionReview(
                      previous,
                      id,
                      crypto.randomUUID(),
                      new Date().toISOString(),
                    ),
                  )
                }
                onLearn={(id) => openTopic(id)}
                onRecall={(id) => openTopic(id, true)}
                onResume={() => {
                  setView("study");
                  focusContent();
                }}
                onRecords={() => {
                  setView("records");
                  focusContent();
                }}
              />
            ) : (
              <p role="status">正在整理今天的安排……</p>
            )
          ) : view === "study" ? (
            <>
              {returning && (
                <section className={styles.returning} aria-label="上次学习">
                  <div>
                    <strong>
                      {returning.gap
                        ? "隔了几天，先把前情接上。"
                        : "接着上次的位置学。"}
                    </strong>
                    <p>
                      {dateLabel(returning.at)}，你停在“
                      {topicFor(returning.topicId)?.title}”。
                      {returning.gap
                        ? "先做一个回忆，不用补齐空档里的任务。"
                        : "草稿和已经提交的回答都在。"}
                    </p>
                    {lastEvidence && (
                      <p className={styles.excerpt}>
                        上次的回答：
                        {lastEvidence.choice &&
                          `${lastEvidence.choice.toUpperCase()} · `}
                        {lastEvidence.answer ||
                          "当时只选择了选项，没有填写理由。"}
                      </p>
                    )}
                  </div>
                  <div className={styles.actions}>
                    <button
                      className={styles.secondary}
                      onClick={() => openTopic(returning.topicId, true)}
                    >
                      先回忆上次内容
                    </button>
                    <button
                      className={styles.textButton}
                      onClick={() => {
                        setReturning(null);
                        focusContent();
                      }}
                    >
                      继续当前位置
                    </button>
                  </div>
                </section>
              )}
              {due && !returning && state.step !== "review" && (
                <div className={styles.due}>
                  <span>到了回忆“{topicFor(due.topicId)?.title}”的时候。</span>
                  <button
                    className={styles.textButton}
                    onClick={() => openTopic(due.topicId, true)}
                  >
                    先做一次回忆
                  </button>
                </div>
              )}
              <header className={styles.lessonHeader}>
                <p className={styles.lessonMeta}>
                  {isTransfer
                    ? "六节之后 · 关联应用"
                    : `第 ${topicIndex + 1} 节 / 共 6 节`}{" "}
                  <span>预计 {topic.minutes} 分钟，可随时暂停</span>
                </p>
                <h1>{topic.headline}</h1>
                <p className={styles.goal}>{topic.goal}</p>
                <p className={styles.prerequisite}>{topic.prerequisite}</p>
              </header>

              <section className={styles.paper} aria-label="当前学习">
                <nav className={styles.steps} aria-label="本节步骤">
                  {visibleSteps.map((step, index) => (
                    <button
                      key={step}
                      disabled={!ready}
                      aria-current={state.step === step ? "step" : undefined}
                      onClick={() => openStep(step)}
                    >
                      <span>{index + 1}</span>
                      {stepNames[step]}
                    </button>
                  ))}
                </nav>
                <div className={styles.paperBody}>
                  {state.step === "learn" && (
                    <>
                      <h2>先把这件事想清楚</h2>
                      <div className={styles.prose}>
                        {topic.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                      <section className={styles.case} aria-label="讲解案例">
                        <p className={styles.caseLabel}>原创教学案例</p>
                        <h3>{topic.example.title}</h3>
                        <p>{topic.example.facts}</p>
                        <div className={styles.caseAnalysis}>
                          <strong>把事实放进规则</strong>
                          <p>{topic.example.analysis}</p>
                        </div>
                      </section>
                      <p className={styles.pitfall}>
                        <strong>容易混淆的地方</strong>
                        {topic.pitfall}
                      </p>
                      <div className={styles.actions}>
                        <button
                          className={styles.primary}
                          disabled={!ready}
                          onClick={() => openStep("practice")}
                        >
                          用一道新题试一试
                        </button>
                        <span className={styles.muted}>
                          这一节有 {topic.exercises.length} 道练习
                        </span>
                      </div>
                    </>
                  )}

                  {state.step === "practice" && (
                    <>
                      <div className={styles.exerciseNav} aria-label="本节练习">
                        {topic.exercises.map((exercise, index) => (
                          <button
                            key={exercise.id}
                            aria-current={
                              question.id === exercise.id ? "step" : undefined
                            }
                            onClick={() =>
                              change((previous) => ({
                                ...previous,
                                exerciseId: exercise.id,
                              }))
                            }
                          >
                            {index + 1}.{" "}
                            {exercise.kind === "objective"
                              ? "客观辨析"
                              : "主观短答"}
                          </button>
                        ))}
                      </div>
                      <p className={styles.caseLabel}>
                        原创教学练习 · {questionIndex + 1} /{" "}
                        {topic.exercises.length}
                      </p>
                      <h2>{question.title}</h2>
                      <p className={styles.facts}>{question.facts}</p>
                      <p className={styles.question}>{question.prompt}</p>
                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          submit();
                        }}
                      >
                        {question.kind === "objective" && (
                          <fieldset
                            className={styles.options}
                            disabled={!!saved || !ready}
                          >
                            <legend>
                              {choiceModeLabel(question)}
                              {choiceMode(question) !== "single"
                                ? " · 全选对才算答对"
                                : ""}
                            </legend>
                            {question.options!.map((option) => (
                              <label
                                key={option.id}
                                className={
                                  selectedChoices(draft.choice).includes(
                                    option.id,
                                  )
                                    ? styles.selected
                                    : ""
                                }
                              >
                                <input
                                  type={
                                    choiceMode(question) === "single"
                                      ? "radio"
                                      : "checkbox"
                                  }
                                  name={question.id}
                                  value={option.id}
                                  checked={selectedChoices(
                                    draft.choice,
                                  ).includes(option.id)}
                                  onChange={() =>
                                    updateDraft({
                                      choice: toggleChoice(
                                        question,
                                        draft.choice,
                                        option.id,
                                      ),
                                    })
                                  }
                                />
                                <span className={styles.optionLetter}>
                                  {option.id.toUpperCase()}
                                </span>
                                <span>{option.text}</span>
                              </label>
                            ))}
                          </fieldset>
                        )}
                        <label
                          className={styles.answerLabel}
                          htmlFor="unit-answer"
                        >
                          {question.kind === "objective"
                            ? "我的理由（可选）"
                            : "我的分析"}
                        </label>
                        <textarea
                          id="unit-answer"
                          value={draft.answer}
                          disabled={!ready}
                          readOnly={!!saved}
                          maxLength={8000}
                          rows={question.kind === "subjective" ? 6 : 3}
                          placeholder={
                            question.kind === "subjective"
                              ? "先说你怎么看，再写案情里支持这个判断的事实。"
                              : "哪条事实让你这样判断？"
                          }
                          onChange={(event) =>
                            updateDraft({ answer: event.target.value })
                          }
                        />
                        <p className={styles.muted}>
                          原文会保留。文字分析尚未评阅，不会据此打分。
                        </p>
                        {error && (
                          <p className={styles.error} role="alert">
                            {error}
                          </p>
                        )}
                        {!saved && (
                          <div className={styles.actions}>
                            <button
                              type="submit"
                              className={styles.primary}
                              disabled={!ready}
                            >
                              保存作答并看分析
                            </button>
                            <button
                              type="button"
                              className={styles.textButton}
                              disabled={!ready}
                              onClick={() => updateDraft({ hintUsed: true })}
                            >
                              给我一点提示
                            </button>
                            <button
                              type="button"
                              className={styles.textButton}
                              disabled={!ready}
                              onClick={() =>
                                updateDraft({ referenceSeen: true })
                              }
                            >
                              先看参考分析
                            </button>
                          </div>
                        )}
                      </form>
                      {draft.hintUsed && (
                        <p className={styles.hint}>
                          <strong>提示</strong>
                          {question.hint}
                        </p>
                      )}
                      {saved && (
                        <div className={styles.receipt} role="status">
                          <strong>
                            {question.kind === "objective"
                              ? isCorrectChoice(question, saved.choice)
                                ? "你的选择与本题参考一致。"
                                : "你的选择与本题参考不同。"
                              : "你的原始分析已记录。"}
                          </strong>
                          <p>
                            {question.kind === "objective"
                              ? "这是选择结果，文字理由尚未评阅；一次选对不能说明已经掌握。"
                              : "下面可以逐项对照参考分析，目前没有自动评分。"}
                          </p>
                          <p>
                            {saved.referenceSeenBeforeAnswer
                              ? "这次作答前已看过参考。"
                              : saved.hintUsed
                                ? "这次作答使用了提示。"
                                : "这次作答前未使用提示或查看本题参考。"}
                          </p>
                        </div>
                      )}
                      {draft.referenceSeen && (
                        <section
                          className={styles.reference}
                          aria-label="参考分析"
                        >
                          <h3>参考分析</h3>
                          <p>{question.reference}</p>
                          {question.options && (
                            <details className={styles.details}>
                              <summary>逐项看为什么</summary>
                              {question.options.map((option) => (
                                <p key={option.id}>
                                  <strong>{option.id.toUpperCase()}.</strong>{" "}
                                  {option.explanation}
                                </p>
                              ))}
                            </details>
                          )}
                          {question.criteria && (
                            <div className={styles.criteria}>
                              {question.criteria.map((criterion) => (
                                <div key={criterion.id}>
                                  <h4>{criterion.label}</h4>
                                  <p>{criterion.meaning}</p>
                                  <p className={styles.muted}>
                                    {criterion.acceptable}
                                  </p>
                                  <p className={styles.boundary}>
                                    {criterion.boundary}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                          <p className={styles.muted}>
                            本题只分析指定结果的主观心理；参考分析是教学依据，不是官方评分细则。
                          </p>
                        </section>
                      )}
                      {saved && (
                        <Correction
                          key={saved.id}
                          state={state}
                          attemptId={saved.id}
                          onDraft={(value) =>
                            change((previous) => ({
                              ...previous,
                              correctionDrafts: {
                                ...previous.correctionDrafts,
                                [saved.id]: value,
                              },
                            }))
                          }
                          onSave={() => {
                            const result = saveCorrection(
                              stateRef.current,
                              saved.id,
                              crypto.randomUUID(),
                              new Date().toISOString(),
                            );
                            if (result === stateRef.current) {
                              setError("自查暂未保存，请保留草稿后再试。");
                              return;
                            }
                            change(() => result);
                          }}
                        />
                      )}
                      {saved && error && (
                        <p role="alert" className={styles.error}>
                          {error}
                        </p>
                      )}
                      {saved && (
                        <div className={styles.actions}>
                          <button
                            className={styles.primary}
                            onClick={nextExercise}
                          >
                            {questionIndex < topic.exercises.length - 1
                              ? "做下一道练习"
                              : allAnswered
                                ? "完成本节练习，去回忆"
                                : "先去回忆"}
                          </button>
                          <button
                            className={styles.textButton}
                            onClick={() => change(retryExercise)}
                          >
                            保留这次，重新作答
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  {state.step === "review" && (
                    <>
                      <p className={styles.caseLabel}>合上讲解，先回想一下</p>
                      <h2>这一节，留下什么？</h2>
                      <p className={styles.facts}>{topic.recall.prompt}</p>
                      <label
                        className={styles.answerLabel}
                        htmlFor="recall-answer"
                      >
                        我回想起的内容
                      </label>
                      <textarea
                        id="recall-answer"
                        value={recall.answer}
                        disabled={!ready}
                        readOnly={!!savedRecall}
                        maxLength={8000}
                        rows={4}
                        placeholder="不用追求原句。想到了什么，或卡在哪里，都可以写下来。"
                        onChange={(event) =>
                          updateDraft({ answer: event.target.value }, true)
                        }
                      />
                      {!savedRecall && (
                        <>
                          <p className={styles.muted}>
                            按自己的感受安排下一次回忆；这不是系统对掌握程度的判断。
                          </p>
                          {error && (
                            <p className={styles.error} role="alert">
                              {error}
                            </p>
                          )}
                          <div className={styles.actions}>
                            <button
                              className={styles.primary}
                              disabled={!ready}
                              onClick={() => saveRecall("again")}
                            >
                              还不稳，明天再回忆
                            </button>
                            <button
                              className={styles.secondary}
                              disabled={!ready}
                              onClick={() => saveRecall("later")}
                            >
                              能说清，隔几天再回忆
                            </button>
                          </div>
                          <button
                            className={styles.textButton}
                            disabled={!ready}
                            onClick={() =>
                              updateDraft({ referenceSeen: true }, true)
                            }
                          >
                            先看回忆提示
                          </button>
                        </>
                      )}
                      {recall.referenceSeen && (
                        <div className={styles.reference}>
                          <h3>可以这样串起来</h3>
                          <p>{topic.recall.reference}</p>
                          <p className={styles.muted}>
                            保留你自己的表达，不必把参考原句背下来。
                          </p>
                        </div>
                      )}
                      {savedRecall && (
                        <div className={styles.receipt} role="status">
                          <strong>这次回忆已记录。</strong>
                          <p>
                            根据你的选择，下次安排在{" "}
                            {dateLabel(
                              schedule.find(
                                (item) => item.topicId === topic.id,
                              )!.dueAt,
                            )}
                            。这是初始复习安排，之后可主动再练。
                          </p>
                          <button
                            className={styles.textButton}
                            onClick={() =>
                              change((previous) =>
                                startRecall(previous, topic.id),
                              )
                            }
                          >
                            保留这次，再回忆一遍
                          </button>
                        </div>
                      )}
                      <section className={styles.next}>
                        <h3>今天可以到这里</h3>
                        <button
                          className={styles.textButton}
                          onClick={() => {
                            setView("plan");
                            focusContent();
                          }}
                        >
                          查看今日小结与下次安排
                        </button>
                        <p>
                          {state.finished[topic.id]
                            ? "本节练习已完成，答卷与回忆会继续保留。"
                            : "当前位置和草稿会保留。本节还有未完成的练习，随时可以回来。"}
                        </p>
                        {state.resumeAfterRecall ? (
                          <>
                            <p>
                              刚才停在“
                              {topicFor(state.resumeAfterRecall.topicId)?.title}
                              ”的{stepNames[state.resumeAfterRecall.step]}
                              ，可以从原位置继续。
                            </p>
                            <button
                              className={styles.secondary}
                              onClick={() => {
                                change(resumeAfterRecall);
                                focusContent();
                              }}
                            >
                              接回刚才的学习位置
                            </button>
                          </>
                        ) : next ? (
                          <>
                            <p>
                              接下来：{next.kind === "review" ? "回忆" : "学习"}
                              “{topicFor(next.topicId)?.title}”。
                            </p>
                            <button
                              className={styles.secondary}
                              onClick={() =>
                                openTopic(next.topicId, next.kind === "review")
                              }
                            >
                              {next.kind === "review"
                                ? "进入这次回忆"
                                : "进入下一段学习"}
                            </button>
                          </>
                        ) : (
                          <p>
                            六节练习已完成。之后从上方目录重练，或按记录里的日期回来回忆；综合刑法与模考将在后续加入。
                          </p>
                        )}
                      </section>
                    </>
                  )}

                  <details className={styles.sources}>
                    <summary>本节依据与适用范围</summary>
                    <p>
                      本单元讲解、案例及练习为原创，核对日期为{" "}
                      {isTransfer ? "2026 年 9 月 12 日" : "2026 年 9 月 8 日"}
                      。用于基础概念和短答训练，不代表完整考纲或具体罪名判断。
                    </p>
                    {(isTransfer
                      ? Object.values(transferSources)
                      : topic.sources.map((key) => topicSources(topic.id)[key])
                    ).map((source) => (
                      <p key={source.url}>
                        <a href={source.url} target="_blank" rel="noreferrer">
                          {source.title}
                        </a>
                        <br />
                        {source.note}
                      </p>
                    ))}
                  </details>
                </div>
              </section>
            </>
          ) : (
            <>
              <header className={styles.lessonHeader}>
                <p className={styles.lessonMeta}>这一个单元的实际记录</p>
                <h1>看见自己走过的路</h1>
                <p className={styles.goal}>
                  原始作答、使用过的提示和回忆都在这里。做过练习不等于已经掌握。
                </p>
                <button className={styles.secondary} onClick={downloadRecords}>
                  导出学习记录
                </button>
                {user && (
                  <a href="/records/import" className={styles.textButton}>
                    迁入试学记录 / 查看副本
                  </a>
                )}
                {hasRecoveryCopy && (
                  <button
                    className={styles.textButton}
                    onClick={downloadRecoveryCopies}
                  >
                    导出恢复前的记录
                  </button>
                )}
              </header>
              <section className={styles.paper}>
                <div className={styles.paperBody}>
                  <h2>下次先回忆</h2>
                  {schedule.length ? (
                    <ul className={styles.schedule}>
                      {schedule.map((item) => (
                        <li key={item.topicId}>
                          <div>
                            <strong>{topicFor(item.topicId)?.title}</strong>
                            <span>
                              {dateLabel(item.dueAt)} ·{" "}
                              {now && item.dueAt <= now
                                ? "现在可以回忆"
                                : "也可以提前练习"}
                            </span>
                          </div>
                          <button
                            className={styles.textButton}
                            onClick={() => openTopic(item.topicId, true)}
                          >
                            去回忆
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className={styles.muted}>
                      完成一节练习，或保存一次回忆后，这里会出现安排。
                    </p>
                  )}
                  <h2 className={styles.recordsHeading}>我的作答</h2>
                  {!state.attempts.length && (
                    <p className={styles.muted}>
                      还没有提交的答卷。你可以先阅读，也可以直接进入目录中的练习。
                    </p>
                  )}
                  {[...state.attempts].reverse().map((attempt) => {
                    const exercise = savedExerciseFor(
                      attempt.exerciseId,
                      attempt.revision,
                    )!;
                    return (
                      <article key={attempt.id} className={styles.record}>
                        <div className={styles.recordTitle}>
                          <h3>{exercise.title}</h3>
                          <span>{dateLabel(attempt.submittedAt)}</span>
                        </div>
                        <p className={styles.muted}>
                          {exercise.kind === "objective"
                            ? `选择 ${answerLabel(selectedChoices(attempt.choice))}，与本题参考${isCorrectChoice(exercise, attempt.choice) ? "一致" : "不同"}`
                            : "主观短答"}{" "}
                          · 文字尚未评阅
                        </p>
                        <blockquote>
                          {attempt.answer || "当时只选择了选项，没有填写理由。"}
                        </blockquote>
                        <p className={styles.muted}>
                          {attempt.hintUsed ? "使用过提示" : "未使用提示"}；
                          {attempt.referenceSeenBeforeAnswer
                            ? "作答前已看过参考"
                            : "作答前未看过本题参考"}
                          。
                        </p>
                        <details className={styles.details}>
                          <summary>查看当时的案情与参考</summary>
                          <p>{exercise.facts}</p>
                          <p>{exercise.prompt}</p>
                          <p>{exercise.reference}</p>
                          <small>内容版本：{attempt.revision}</small>
                        </details>
                        {state.corrections.some(
                          (c) => c.attemptId === attempt.id,
                        ) && (
                          <details className={styles.details}>
                            <summary>查看自查与复习选择记录</summary>
                            {state.corrections
                              .filter((c) => c.attemptId === attempt.id)
                              .map((c) => (
                                <div key={c.id}>
                                  <p className={styles.muted}>
                                    {dateLabel(c.submittedAt)} · 自己选择：
                                    {c.revisit
                                      ? "放入复习重点"
                                      : "暂不放入复习重点"}{" "}
                                    · 未评阅
                                  </p>
                                  {c.note && (
                                    <p className={styles.selfText}>
                                      疑惑：{c.note}
                                    </p>
                                  )}
                                  {c.answer && (
                                    <p className={styles.selfText}>
                                      修正：{c.answer}
                                    </p>
                                  )}
                                </div>
                              ))}
                          </details>
                        )}
                      </article>
                    );
                  })}
                  <h2 className={styles.recordsHeading}>我的回忆</h2>
                  {!state.reviews.length && (
                    <p className={styles.muted}>
                      还没有回忆记录。学习中断后，也可以从目录直接进入回忆。
                    </p>
                  )}
                  {[...state.reviews].reverse().map((review) => (
                    <article className={styles.record} key={review.id}>
                      <div className={styles.recordTitle}>
                        <h3>{topicFor(review.topicId)?.title}</h3>
                        <span>{dateLabel(review.submittedAt)}</span>
                      </div>
                      <blockquote>{review.answer}</blockquote>
                      <p className={styles.muted}>
                        当时自述：
                        {review.selfReport === "again" ? "还不稳" : "能说清"}；
                        {review.referenceSeenBeforeAnswer
                          ? "此前看过回忆提示"
                          : "此前未看回忆提示"}
                        。这是自述，未进行评阅。
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            </>
          )}
          <footer className={styles.footer}>
            草稿先保存在本浏览器，登录后会自动备份到你的账号。未完成备份的内容仍需在当前浏览器继续。
          </footer>
        </main>
      </div>
    </div>
  );
}
