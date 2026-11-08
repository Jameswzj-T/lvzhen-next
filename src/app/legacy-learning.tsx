"use client";

import { useEffect, useRef, useState } from "react";
import {
  comparisonCases,
  faultTypes,
  legalSource,
  questions,
  roadmap,
  unitTopics,
} from "@/content/criminal";
import {
  choiceMatchesReference,
  emptyDraft,
  initialState,
  recordAttempt,
  restoreState,
  storageKey,
  type LearningState,
  type Phase,
} from "@/domain/learning";
import styles from "./page.module.css";
import { LearningHeader } from "./lab/_components/learning-frame";
import { subjectiveCase } from "@/content/subjective";
import { SubjectivePractice } from "./subjective-practice";
import { examSubjects, examScopeSource } from "@/content/exam-scope";

type View = "learn" | "route" | "records";
const stageNames: Record<Phase, string> = {
  understand: "理解",
  compare: "比较案例",
  practice: "自己判断",
  recap: "回顾",
};

function Icon({
  name,
}: {
  name: "book" | "route" | "record" | "arrow" | "check" | "clock";
}) {
  const paths = {
    book: (
      <>
        <path d="M3 4h6a4 4 0 0 1 3 1.5A4 4 0 0 1 15 4h6v15h-6a4 4 0 0 0-3 1.5A4 4 0 0 0 9 19H3z" />
        <path d="M12 5.5v15" />
      </>
    ),
    route: (
      <>
        <circle cx="5" cy="5" r="2" />
        <circle cx="19" cy="19" r="2" />
        <path d="M7 5h9a4 4 0 0 1 0 8H8a3 3 0 0 0 0 6h9" />
      </>
    ),
    record: (
      <>
        <path d="M7 3h12v18H5V5z" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  };
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function SourceNote() {
  return (
    <details className={styles.source}>
      <summary>本段内容的依据</summary>
      <p>
        <a href={legalSource.url} target="_blank" rel="noreferrer">
          {legalSource.title}
        </a>
      </p>
      <p>
        {legalSource.publisher}，{legalSource.version}。核对日期：
        {legalSource.checkedAt}。
      </p>
      <p>
        本页讲解和题目为原创教学样例，只练习对主观心理的辨析。实际定罪还需结合具体罪名及其他成立条件。
      </p>
    </details>
  );
}

export default function LegacyLearningPage() {
  const [view, setView] = useState<View>("learn");
  const [state, setState] = useState<LearningState>(initialState);
  const [ready, setReady] = useState(false);
  const [storageStatus, setStorageStatus] = useState<
    "ok" | "unreadable" | "unavailable"
  >("ok");
  const [saved, setSaved] = useState(false);
  const [caseIndex, setCaseIndex] = useState(0);
  const [showComparison, setShowComparison] = useState(false);
  const [showAllSubjects, setShowAllSubjects] = useState(false);
  const [subjectScope, setSubjectScope] = useState<"objective" | "subjective">(
    "objective",
  );
  const [formMessage, setFormMessage] = useState("");
  const lessonRef = useRef<HTMLElement>(null);
  const [hadPreviousSession, setHadPreviousSession] = useState(false);

  useEffect(() => {
    try {
      const restored = restoreState(localStorage.getItem(storageKey));
      setState(restored.state);
      setHadPreviousSession(
        restored.kind === "loaded" && !!restored.state.updatedAt,
      );
      if (restored.kind === "unreadable") setStorageStatus("unreadable");
    } catch {
      setStorageStatus("unavailable");
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || storageStatus !== "ok" || !state.updatedAt) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
      setSaved(true);
    } catch {
      setStorageStatus("unavailable");
      setSaved(false);
    }
  }, [state, ready, storageStatus]);

  function changeState(fn: (previous: LearningState) => LearningState) {
    setSaved(false);
    setState((previous) => ({
      ...fn(previous),
      updatedAt: new Date().toISOString(),
    }));
  }

  function goPhase(phase: Phase) {
    if (!ready) return;
    setView("learn");
    setFormMessage("");
    changeState((previous) => ({ ...previous, phase }));
    requestAnimationFrame(() =>
      lessonRef.current?.scrollIntoView({ block: "start" }),
    );
  }

  const question = questions[state.questionIndex];
  const draft = state.drafts[question.id];
  const submitted = state.attempts.find((a) => a.id === draft.submittedId);
  const activeCase = comparisonCases[caseIndex];
  const completedQuestions = new Set(state.attempts.map((a) => a.questionId));

  function updateDraft(update: Partial<typeof draft>) {
    changeState((previous) => ({
      ...previous,
      drafts: {
        ...previous.drafts,
        [question.id]: { ...previous.drafts[question.id], ...update },
      },
    }));
  }

  function submitAnswer(event: React.FormEvent) {
    event.preventDefault();
    if (!draft.choice) {
      setFormMessage("先选择一个判断；拿不准时可以先看提示。");
      return;
    }
    try {
      const next = recordAttempt(
        state,
        question.id,
        new Date().toISOString(),
        crypto.randomUUID(),
      );
      setSaved(false);
      setState(next);
      setFormMessage("");
    } catch {
      setFormMessage(
        "这次作答暂未保存，请保留文字后重试。系统没有将它记为答错。",
      );
    }
  }

  function openQuestion(index: number) {
    setFormMessage("");
    changeState((previous) => ({
      ...previous,
      questionIndex: index,
      phase: "practice",
    }));
  }

  function switchView(next: View) {
    setView(next);
    window.scrollTo({ top: 0 });
  }

  return (
    <div className={styles.shell}>
      <LearningHeader section="study" session />
      <a className={styles.skipLink} href="#main">
        跳到学习内容
      </a>
      <aside className={styles.sidebar}>
        <p className={styles.prototypeTitle}>早期学习样例</p>
        <nav className={styles.nav} aria-label="样例功能">
          {(
            [
              ["learn", "book", "今日学习"],
              ["route", "route", "科目路线"],
              ["records", "record", "学习记录"],
            ] as const
          ).map(([key, icon, label]) => (
            <button
              key={key}
              aria-current={view === key ? "page" : undefined}
              onClick={() => switchView(key)}
              className={view === key ? styles.navActive : ""}
            >
              <Icon name={icon} />
              {label}
            </button>
          ))}
        </nav>
        <div className={styles.sidebarNote}>
          <span className={styles.smallDot} />
          面向 2027 年备考
          <p>
            有体系地学，
            <br />
            一步一步接着走。
          </p>
        </div>
        <div className={styles.prototype}>
          学习体验样例<span>作答仅保存在当前浏览器</span>
        </div>
      </aside>

      <main id="main" className={styles.main}>
        <div className={styles.topline}>
          <span>刑法</span>
          <span className={styles.topNote}>一段学习，也是一点积累</span>
        </div>
        {storageStatus !== "ok" && (
          <div className={styles.warning} role="status">
            {storageStatus === "unreadable"
              ? "已有样例记录无法读取，本页不会覆盖原记录。当前可以浏览和练习，新操作仅在本次页面中保留。"
              : "浏览器暂不能保存记录。请保留作答文字；刷新后，本次学习位置可能无法恢复。"}
          </div>
        )}

        {view === "learn" && (
          <>
            <header className={styles.hero}>
              <div className={styles.breadcrumb}>
                犯罪成立 <span>/</span> 主观方面 <span>/</span> 故意与过失
              </div>
              <h1>
                预见了风险，
                <br className={styles.mobileBreak} />
                为什么还要分两种？
              </h1>
              <p>今天，把“放任结果”与“轻信能够避免”放在一起学明白。</p>
              <p>
                <a href="/units/fault" className={styles.textButton}>
                  进入完整单元：故意、过失与意外事件（六节）
                </a>
              </p>
              <div className={styles.heroActions}>
                <button
                  className={styles.primaryButton}
                  disabled={!ready}
                  onClick={() => goPhase(state.phase)}
                >
                  {hadPreviousSession ? "接着上次学" : "开始这段学习"}
                  <Icon name="arrow" />
                </button>
                <span>
                  <Icon name="clock" />约 20 分钟，可随时暂停
                </span>
              </div>
              {hadPreviousSession && (
                <p className={styles.resume}>
                  上次停在“{stageNames[state.phase]}
                  ”。先回想：预见了风险之后，还需要判断什么？
                </p>
              )}
            </header>

            <div className={styles.workspace}>
              <section
                className={styles.lesson}
                ref={lessonRef}
                aria-label="学习内容"
              >
                <nav className={styles.stages} aria-label="学习步骤">
                  {(Object.keys(stageNames) as Phase[]).map((phase, i) => (
                    <button
                      key={phase}
                      disabled={!ready}
                      aria-current={state.phase === phase ? "step" : undefined}
                      className={
                        state.phase === phase ? styles.stageActive : ""
                      }
                      onClick={() => goPhase(phase)}
                    >
                      <span>{i + 1}</span>
                      {stageNames[phase]}
                    </button>
                  ))}
                </nav>
                <div className={styles.lessonBody}>
                  {state.phase === "understand" && (
                    <>
                      <div className={styles.sectionHeading}>
                        <span className={styles.sectionIcon}>
                          <Icon name="book" />
                        </span>
                        <div>
                          <span className={styles.kicker}>先分清两件事</span>
                          <h2>知道有风险，和怎样对待结果</h2>
                        </div>
                      </div>
                      <p className={styles.lead}>
                        读案情时，可以分两步看：行为人认识到了什么风险？他又怎样对待这个结果？
                      </p>
                      <div className={styles.twoQuestions}>
                        <div>
                          <span>认识</span>
                          <h3>他知道可能发生什么？</h3>
                          <p>找到行为人对危害结果的认识。</p>
                        </div>
                        <div>
                          <span>态度</span>
                          <h3>他怎样对待这个结果？</h3>
                          <p>是希望、放任，还是轻信能够避免？</p>
                        </div>
                      </div>
                      <p>
                        间接故意与过于自信的过失，都可能已经预见到危害结果。区分时，还要结合具体事实分析对结果的态度。
                      </p>
                      <div className={styles.keyInsight}>
                        <span>把这一点记住</span>
                        <p>
                          “没有想让它发生”，
                          <br />
                          还没有回答“是否放任它发生”。
                        </p>
                      </div>
                      <button
                        className={styles.textButton}
                        aria-expanded={showComparison}
                        onClick={() => setShowComparison(!showComparison)}
                      >
                        {showComparison
                          ? "收起四种情形的对照"
                          : "把四种情形放在一起看看"}
                        <span aria-hidden="true">
                          {showComparison ? "−" : "+"}
                        </span>
                      </button>
                      {showComparison && (
                        <div className={styles.faultList}>
                          {faultTypes.map((type) => (
                            <div key={type.name}>
                              <h3>{type.name}</h3>
                              <p>
                                {type.awareness}；{type.attitude}。
                              </p>
                              <small>{type.note}</small>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className={styles.nextLine}>
                        <span>接下来只改变案情中的一个条件。</span>
                        <button
                          className={styles.primaryButton}
                          onClick={() => goPhase("compare")}
                        >
                          看一组案例
                          <Icon name="arrow" />
                        </button>
                      </div>
                    </>
                  )}

                  {state.phase === "compare" && (
                    <>
                      <div className={styles.sectionHeading}>
                        <span className={styles.sectionIcon}>
                          <Icon name="route" />
                        </span>
                        <div>
                          <span className={styles.kicker}>比较中的理解</span>
                          <h2>结果相同，态度改变了</h2>
                        </div>
                      </div>
                      <p className={styles.lead}>
                        下面是预设事实的教学案例。先只分析对伤害结果的心理态度。
                      </p>
                      <div className={styles.caseSwitch} aria-label="案例版本">
                        {comparisonCases.map((item, i) => (
                          <button
                            key={item.label}
                            aria-pressed={caseIndex === i}
                            className={
                              caseIndex === i ? styles.selectedCase : ""
                            }
                            onClick={() => setCaseIndex(i)}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                      <article className={styles.caseBody} aria-live="polite">
                        <h3>{activeCase.title}</h3>
                        <p>{activeCase.facts}</p>
                        <div className={styles.changedFact}>
                          <span>关键条件</span>
                          <p>{activeCase.highlight}</p>
                        </div>
                        <h3 className={styles.conclusion}>
                          {activeCase.conclusion}
                        </h3>
                        <p>{activeCase.explanation}</p>
                      </article>
                      <p className={styles.caption}>
                        “已经查明”是本题的事实设定。实际案情需要证据支持，不能只凭当事人的一句话推断。
                      </p>
                      <div className={styles.nextLine}>
                        <span>换个情境，试着自己找依据。</span>
                        <button
                          className={styles.primaryButton}
                          onClick={() => goPhase("practice")}
                        >
                          自己判断
                          <Icon name="arrow" />
                        </button>
                      </div>
                    </>
                  )}

                  {state.phase === "practice" && (
                    <div
                      className={styles.practiceModes}
                      role="group"
                      aria-label="选择练习方式"
                    >
                      {(
                        [
                          ["objective", "客观题 · 选择辨析"],
                          ["subjective", "主观题 · 案例简答"],
                        ] as const
                      ).map(([mode, label]) => (
                        <button
                          key={mode}
                          disabled={!ready}
                          aria-pressed={state.practiceMode === mode}
                          onClick={() => {
                            setFormMessage("");
                            changeState((previous) => ({
                              ...previous,
                              practiceMode: mode,
                            }));
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  )}
                  {state.phase === "practice" &&
                    state.practiceMode === "subjective" && (
                      <SubjectivePractice
                        state={state}
                        ready={ready}
                        onChange={changeState}
                        onRecap={() => goPhase("recap")}
                      />
                    )}
                  {state.phase === "practice" &&
                    state.practiceMode === "objective" && (
                      <>
                        <div className={styles.practiceHeader}>
                          <div>
                            <span className={styles.kicker}>原创教学题</span>
                            <h2>试着把理由讲出来</h2>
                          </div>
                          <span>
                            {state.questionIndex + 1} / {questions.length}
                          </span>
                        </div>
                        <div
                          className={styles.questionTabs}
                          aria-label="切换练习"
                        >
                          {questions.map((q, i) => (
                            <button
                              key={q.id}
                              aria-current={
                                state.questionIndex === i ? "step" : undefined
                              }
                              onClick={() => openQuestion(i)}
                            >
                              {completedQuestions.has(q.id) ? (
                                <Icon name="check" />
                              ) : (
                                <span>{i + 1}</span>
                              )}
                              {["辨析", "应用", "边界"][i]}
                            </button>
                          ))}
                        </div>
                        <form onSubmit={submitAnswer}>
                          <h3 className={styles.questionTitle}>
                            {question.title}
                          </h3>
                          <p>{question.stem}</p>
                          <fieldset
                            className={styles.options}
                            disabled={!!submitted}
                          >
                            <legend>选择一个判断</legend>
                            {question.options.map((option) => (
                              <label
                                key={option.id}
                                className={
                                  draft.choice === option.id
                                    ? styles.optionSelected
                                    : ""
                                }
                              >
                                <input
                                  type="radio"
                                  name={question.id}
                                  value={option.id}
                                  checked={draft.choice === option.id}
                                  onChange={() => {
                                    setFormMessage("");
                                    updateDraft({ choice: option.id });
                                  }}
                                />
                                <span>{option.id.toUpperCase()}</span>
                                <span>{option.text}</span>
                              </label>
                            ))}
                          </fieldset>
                          <label
                            className={styles.reasonLabel}
                            htmlFor="reason"
                          >
                            用自己的话说说理由{" "}
                            <span>暂时不会也可以先保留空白</span>
                          </label>
                          <textarea
                            id="reason"
                            value={draft.reason}
                            readOnly={!!submitted}
                            maxLength={8000}
                            onChange={(event) =>
                              updateDraft({ reason: event.target.value })
                            }
                            placeholder="我注意到的事实是……所以我认为……"
                            rows={4}
                          />
                          {!submitted && (
                            <div className={styles.formActions}>
                              <button
                                className={styles.textButton}
                                type="button"
                                aria-expanded={draft.hintUsed}
                                onClick={() => updateDraft({ hintUsed: true })}
                              >
                                给我一点提示
                              </button>
                              <button
                                className={styles.primaryButton}
                                type="submit"
                              >
                                保存并看分析
                                <Icon name="arrow" />
                              </button>
                            </div>
                          )}
                          {draft.hintUsed && (
                            <p className={styles.hint}>{question.hint}</p>
                          )}
                          {formMessage && (
                            <p className={styles.warning} role="alert">
                              {formMessage}
                            </p>
                          )}
                        </form>
                        {submitted && (
                          <div className={styles.feedback} aria-live="polite">
                            <span className={styles.resultLabel}>
                              {choiceMatchesReference(submitted)
                                ? "选择与参考答案一致"
                                : "这里再分清一步"}
                            </span>
                            <h3>参考分析</h3>
                            <p>{question.explanation}</p>
                            <small>依据：{question.reference}</small>
                            <div className={styles.reasonReview}>
                              <h3>对照自己的理由</h3>
                              {question.checklist.map((item) => (
                                <p key={item}>
                                  <span aria-hidden="true">□</span>
                                  {item}
                                </p>
                              ))}
                              <p className={styles.caption}>
                                本样例只对照选择结果，文字理由已保留，尚未作自动评阅。
                                {submitted.hintUsed && "这次使用了提示。"}
                                {submitted.referenceSeenBeforeAnswer &&
                                  "这次作答前已看过本题分析。"}
                              </p>
                            </div>
                            <div className={styles.formActions}>
                              <button
                                className={styles.textButton}
                                onClick={() =>
                                  updateDraft({
                                    ...emptyDraft(),
                                    referenceSeen: true,
                                  })
                                }
                              >
                                再写一次
                              </button>
                              <button
                                className={styles.primaryButton}
                                onClick={() =>
                                  state.questionIndex < questions.length - 1
                                    ? openQuestion(state.questionIndex + 1)
                                    : goPhase("recap")
                                }
                              >
                                {state.questionIndex < questions.length - 1
                                  ? "下一题"
                                  : "回顾这段学习"}
                                <Icon name="arrow" />
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                  {state.phase === "recap" && (
                    <>
                      <div className={styles.sectionHeading}>
                        <span className={styles.sectionIcon}>
                          <Icon name="record" />
                        </span>
                        <div>
                          <span className={styles.kicker}>让下次接得上</span>
                          <h2>把今天留下来的东西看清楚</h2>
                        </div>
                      </div>
                      <p className={styles.lead}>
                        这次已记录 {completedQuestions.size} 道题的{" "}
                        {state.attempts.length} 次选择与作答，以及{" "}
                        {state.subjectiveAttempts.length} 次主观简答。
                        看过、选对和能够独立解释，是不同的学习表现。
                      </p>
                      <div className={styles.recapIdea}>
                        <h3>回忆时，先问自己</h3>
                        <p>
                          已经预见了风险之后，为什么还需要判断对结果的态度？
                        </p>
                        <p>
                          “放任结果”和“轻信能够避免”，分别对应案情中的哪些事实？
                        </p>
                      </div>
                      <h3 className={styles.questionTitle}>
                        下一次可以这样接着学
                      </h3>
                      <p>
                        先遮住讲解，用自己的话回答上面的两个问题，再处理一个新的情境。当前样例中的三道题已经见过，不适合作为新的掌握证明。
                      </p>
                      <div className={styles.nextLine}>
                        <button
                          className={styles.secondaryButton}
                          onClick={() => switchView("records")}
                        >
                          查看本次作答
                        </button>
                        <button
                          className={styles.primaryButton}
                          onClick={() => switchView("route")}
                        >
                          看看知识联系
                          <Icon name="arrow" />
                        </button>
                      </div>
                    </>
                  )}
                  <SourceNote />
                </div>
                <footer className={styles.saveStatus} aria-live="polite">
                  <span
                    className={saved ? styles.savedDot : styles.neutralDot}
                  />
                  {!ready
                    ? "正在读取样例记录"
                    : storageStatus !== "ok"
                      ? "当前操作仅保留在本次页面"
                      : saved
                        ? "学习位置与作答已保存在当前浏览器"
                        : "开始操作后，将保存学习位置与作答"}
                </footer>
              </section>
              <aside className={styles.context}>
                <section>
                  <span className={styles.kicker}>这段学习的目标</span>
                  <h2>
                    从知道区别，
                    <br />
                    到找出依据。
                  </h2>
                  <ul>
                    <li>分开看认识与态度</li>
                    <li>指出案例改变了什么</li>
                    <li>信息不足时保留判断</li>
                  </ul>
                </section>
                <section className={styles.localMap}>
                  <span className={styles.kicker}>知识之间的联系</span>
                  <div>犯罪成立</div>
                  <div>主观方面</div>
                  <div className={styles.currentNode}>故意与过失</div>
                  <div>意外事件与事实判断</div>
                  <button
                    className={styles.textButton}
                    onClick={() => switchView("route")}
                  >
                    展开刑法路线
                    <Icon name="arrow" />
                  </button>
                </section>
                <p className={styles.quietNote}>
                  理解可以慢一点。
                  <br />
                  把理由想清楚，再接着走。
                </p>
              </aside>
            </div>
          </>
        )}

        {view === "route" && (
          <>
            <header className={styles.hero}>
              <div className={styles.breadcrumb}>
                科目路线 <span>/</span> 刑法
              </div>
              <h1>
                每一段，都知道
                <br className={styles.mobileBreak} />
                为什么学。
              </h1>
              <p>从判断框架出发，逐步连接犯罪成立、具体罪名和完整论证。</p>
              <button
                className={styles.textButton}
                aria-expanded={showAllSubjects}
                onClick={() => setShowAllSubjects(!showAllSubjects)}
              >
                {showAllSubjects ? "收起全科概览" : "先看法考全科概览"}
                <span aria-hidden="true">{showAllSubjects ? "−" : "+"}</span>
              </button>
            </header>
            {showAllSubjects && (
              <section
                className={styles.subjectOverview}
                aria-label="全科范围概览"
              >
                <div
                  className={styles.scopePicker}
                  role="group"
                  aria-label="查看考试阶段范围"
                >
                  {(
                    [
                      ["objective", "客观题范围"],
                      ["subjective", "主观题范围"],
                    ] as const
                  ).map(([scope, label]) => (
                    <button
                      key={scope}
                      aria-pressed={subjectScope === scope}
                      onClick={() => setSubjectScope(scope)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {examSubjects.map((group) => (
                  <div key={group.title}>
                    <h2>{group.title}</h2>
                    <ul>
                      {group.items
                        .filter(
                          (item) =>
                            subjectScope === "objective" || item.subjective,
                        )
                        .map((item) => (
                          <li key={item.title}>{item.title}</li>
                        ))}
                    </ul>
                  </div>
                ))}
                <p>
                  依据 2026 年公告所列科目分阶段展示；2027
                  年正式大纲发布后逐项更新。
                  科目范围不等于逐部法律的适用范围，跨科关联知识仍需按具体考点判断。
                  <a
                    href={examScopeSource.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    查看公告
                  </a>
                </p>
              </section>
            )}
            <div className={styles.routeLayout}>
              <section className={styles.routeList} aria-label="刑法路线草图">
                {roadmap.map((section, i) => (
                  <details
                    key={section.title}
                    className={section.current ? styles.currentRoute : ""}
                    open={section.current}
                  >
                    <summary>
                      <span className={styles.routeNumber}>{i + 1}</span>
                      <div>
                        <h2>{section.title}</h2>
                        <p>{section.question}</p>
                      </div>
                      <span className={styles.expandIcon}>+</span>
                    </summary>
                    <div className={styles.routeDetails}>
                      {section.topics.map((topic) => (
                        <span key={topic}>{topic}</span>
                      ))}
                      {section.current && (
                        <div className={styles.unitList}>
                          <h3>主观方面：一个连贯单元</h3>
                          {unitTopics.map((topic, j) => (
                            <div
                              key={topic.title}
                              className={
                                topic.available ? styles.availableTopic : ""
                              }
                            >
                              <span>{j + 1}</span>
                              <div>
                                <h4>{topic.title}</h4>
                                <p>{topic.detail}</p>
                              </div>
                              {topic.available && (
                                <button
                                  className={styles.secondaryButton}
                                  disabled={!ready}
                                  onClick={() => goPhase("understand")}
                                >
                                  进入样例
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </details>
                ))}
              </section>
              <aside className={styles.routeAside}>
                <h2>一张可以逐步展开的路线</h2>
                <p>顺着路线可以建立体系，遇到困难也能直接回到相关内容。</p>
                <p>
                  当前是教学排序草图。可进入的样例是“故意与过失”，其余部分展示组织方式，完整内容将分段建设。
                </p>
                <p>本路线尚不等于 2027 年官方完整考纲。</p>
                <SourceNote />
              </aside>
            </div>
          </>
        )}

        {view === "records" && (
          <>
            <header className={styles.hero}>
              <div className={styles.breadcrumb}>
                学习记录 <span>/</span> 故意与过失
              </div>
              <h1>进步，从具体作答里看。</h1>
              <p>
                保留当时的选择、理由、主观简答，以及是否用过提示，方便下一次接着学。
              </p>
            </header>
            {state.attempts.length === 0 &&
            state.subjectiveAttempts.length === 0 ? (
              <section className={styles.empty}>
                <Icon name="record" />
                <h2>这里会留下你的学习过程</h2>
                <p>完成一题后，就能回看当时怎样判断、怎样表达。</p>
                <button
                  className={styles.primaryButton}
                  disabled={!ready}
                  onClick={() => goPhase("practice")}
                >
                  试着作答
                  <Icon name="arrow" />
                </button>
              </section>
            ) : (
              <div className={styles.recordList}>
                {[...state.subjectiveAttempts].reverse().map((attempt) => (
                  <article key={attempt.id}>
                    <div className={styles.recordHeader}>
                      <span>
                        {new Date(attempt.createdAt).toLocaleString("zh-CN", {
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                      </span>
                      <span>
                        主观简答 ·{" "}
                        {attempt.hintUsed ? "使用过提示" : "未使用提示"}
                        {attempt.referenceSeenBeforeAnswer
                          ? " · 已看过分析"
                          : ""}
                      </span>
                    </div>
                    <h2>{subjectiveCase.title}</h2>
                    <div className={styles.recordReason}>
                      <span>当时的分析</span>
                      <p>{attempt.answer}</p>
                    </div>
                    <p className={styles.caption}>
                      原文已保留，尚未评阅。此题与学习案例共用案情，不单凭本题判断已经掌握。
                    </p>
                  </article>
                ))}
                {[...state.attempts].reverse().map((attempt) => {
                  const q = questions.find((q) => q.id === attempt.questionId)!;
                  return (
                    <article key={attempt.id}>
                      <div className={styles.recordHeader}>
                        <span>
                          {new Date(attempt.createdAt).toLocaleString("zh-CN", {
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                        </span>
                        <span>
                          {attempt.hintUsed ? "使用过提示" : "未使用提示"}
                          {attempt.referenceSeenBeforeAnswer
                            ? " · 已看过分析"
                            : ""}
                        </span>
                      </div>
                      <h2>{q.title}</h2>
                      <p>
                        当时选择：
                        {q.options.find((o) => o.id === attempt.choice)?.text}
                      </p>
                      <div className={styles.recordReason}>
                        <span>当时的理由</span>
                        <p>{attempt.reason || "这次没有填写文字理由。"}</p>
                      </div>
                      <p className={styles.caption}>
                        {choiceMatchesReference(attempt)
                          ? "选择与参考答案一致"
                          : "选择与参考答案不同"}
                        ；文字理由尚未评阅。
                      </p>
                    </article>
                  );
                })}
              </div>
            )}
            <p className={styles.recordFootnote}>
              当前为本机体验样例，记录不跨设备同步。点击其他页面或刷新后，可在同一浏览器接着使用。
            </p>
          </>
        )}
      </main>
    </div>
  );
}
