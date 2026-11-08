"use client";
import { g8WritingFormat } from "@/content/g8-completion";
import {
  ComprehensiveCollections,
  type ComprehensiveFocus,
} from "./comprehensive-collections";
import { ComprehensiveReview } from "./comprehensive-review";
import {
  comprehensiveG7Definition,
  isComprehensiveG7Paper,
} from "@/content/comprehensive-g7";
import { projectComprehensiveAssessmentRecord } from "@/domain/civil-assessment-records";
import { comprehensivePracticeHref } from "@/domain/comprehensive-assessment";
import { subjectStudyKnowledge } from "../study/subject-knowledge";
import { practiceSubject, practiceSubjectInfo } from "@/content/practice-set";

import { CivilPracticeCollections } from "./civil-practice-collections";
import { CivilPracticeReview } from "./civil-practice-review";
import { projectCivilAssessmentRecord } from "@/domain/civil-assessment-records";
import { projectTopicLearning } from "@/domain/topic-learning-summary";
import {
  assessmentRunHref,
  isCivilIntegratedPaper,
} from "@/content/civil-integrated-practice";
import {
  explicitCivilKnowledgeTopics,
  explicitCivilKnowledge,
} from "../practice/explicit-civil-entry";
import { viewSubjectStudyKnowledge } from "../study/subject-knowledge";
import { createRecordedAnswerReview } from "../practice/submitted-answer-review-client";
import type {
  SubmittedAnswer,
  SubmittedAnswerReviewState,
} from "../practice/submitted-answer-review";
import type { UnitFeedbackResult } from "@/evaluation/unit-feedback-contract";
import { UnitAnswerFeedback } from "../practice/unit-answer-feedback";
import { submittedFeedbackFor } from "@/domain/submitted-feedback";
import { useEffect, useRef, useState } from "react";
import { StudyGate } from "@/accounts/study-gate";
import type { Learner } from "@/accounts/client";
import { assessmentPaper, assessmentPapers } from "@/content/assessment-papers";
import {
  exerciseFor,
  exerciseRevision,
  exerciseSources,
  topicFor,
} from "@/content/fault-catalog";
import { practiceTopic } from "@/content/practice-set";
import {
  assessmentResult,
  assessmentRemainingSeconds,
  currentAssessment,
  editAssessment,
  finishAssessment,
  navigateAssessment,
  seenAssessmentQuestions,
  viewAssessmentReference,
  selectAssessment,
  settleAssessments,
  startAssessment,
  unfinishedAssessment,
} from "@/domain/assessment";
import {
  answerLabel,
  choiceMode,
  choiceModeLabel,
  correctChoices,
  isCorrectChoice,
  selectedChoices,
  toggleChoice,
} from "@/domain/objective-answer";
import { beginTopicPractice, viewStudyTopic } from "@/domain/study-space";
import type { FaultProgress } from "@/domain/fault-progress";
import type {
  TableAnswers,
  TableResult,
} from "@/evaluation/table-trial/contract";
import type { ExplanationReviewDelivery } from "@/evaluation/table-trial/reviewed-explanation-delivery";
import { recordCaseLearningFeedback } from "@/domain/learning-observations";
import { LearningFeedbackTrace } from "../_components/learning-feedback-trace";
import type { ScoringPaper } from "@/evaluation/table-trial/papers";
import { usePractice } from "../practice/use-practice";
import { RecordRecovery } from "../_components/record-recovery";
import {
  LearningFrame,
  RecordNotice,
  recordLabel,
} from "../_components/learning-frame";
import { AnswerRewrite } from "../_components/answer-rewrite";
import {
  QuestionReasoningLearning,
  hasReasoningLearningExamples,
} from "../_components/question-reasoning-learning";
import type { MatrixLearningExamples } from "@/evaluation/rewrite-comparison/matrix-learning";
import type { ReasoningLearningExamples } from "@/evaluation/rewrite-comparison/reasoning-readback";
import { FeedbackBoundaryNote } from "../_components/feedback-boundary-note";
import { CaseScoring } from "./case-scoring";
import {
  reviewedFeedbackHref,
  reviewedFeedbackTarget,
  hasReviewedQuestionReference,
} from "@/domain/reviewed-feedback";
import { KnowledgePanel } from "../_components/knowledge-panel";
import { topicPracticeMode } from "../study/topic-practice";
import s from "./assessment.module.css";
import d from "../_components/reading-document.module.css";
import { ReferenceSources } from "../_components/reference-sources";
import { ObjectiveAnswerAnalysis } from "../_components/objective-answer-analysis";
import { AnswerReference } from "../_components/answer-reference";

type Props = {
  initialPaper?: string;
  initialRun?: string;
  initialQuestion?: number;
  category: "all" | "case" | "exam";
  subject?: "criminal-law" | "civil-law" | "all-subjects";
  focus?: ComprehensiveFocus;
  scoringPapers?: ScoringPaper[];
  reviewedFeedbackAvailable?: boolean;
  reasoningExamples?: ReasoningLearningExamples | null;
  matrixExamples?: MatrixLearningExamples | null;
};
export function AssessmentEntry(props: Props) {
  return (
    <StudyGate>
      {(user) => (
        <AssessmentView key={user?.id ?? "guest"} {...props} user={user} />
      )}
    </StudyGate>
  );
}
function AssessmentView({
  user,
  initialPaper,
  initialRun,
  initialQuestion,
  category,
  subject = "criminal-law",
  focus = "all",
  scoringPapers = [],
  reviewedFeedbackAvailable = false,
  reasoningExamples = null,
  matrixExamples = null,
}: Props & { user: Learner }) {
  const {
    state,
    ready,
    restorationFailed,
    update,
    navigate,
    storageIssue,
    status,
    retrySync,
    capturePersistence,
  } = usePractice(user?.id ?? null, false);
  const [library, setLibrary] = useState(!initialPaper && !initialRun);
  const [selected, setSelected] = useState(initialPaper);
  const [librarySubject, setLibrarySubject] = useState(subject);
  const [comprehensiveFocus, setComprehensiveFocus] =
    useState<ComprehensiveFocus>(focus);
  const [clock, setClock] = useState(() => Date.now());
  const [confirming, setConfirming] = useState(false);
  const [knowledge, setKnowledge] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loadedRun, setLoadedRun] = useState<string | null>(null);
  const restoredLink = useRef<string | null>(null);
  const resolvingRun = !!initialRun && loadedRun !== initialRun;
  const questionHeading = useRef<HTMLHeadingElement>(null);
  const knowledgeTrigger = useRef<HTMLElement | null>(null);
  const questionIndex = useRef<HTMLDetailsElement>(null);
  const run = currentAssessment(state);
  const open = unfinishedAssessment(state);
  const paper = run ? assessmentPaper(run.paperId)! : null;
  const intro = selected ? assessmentPaper(selected) : null;
  const cursor = state.assessments?.cursor ?? 0;
  const q = paper ? exerciseFor(paper.questionIds[cursor])! : null;
  const answerRevision =
    q && run
      ? (state.attempts.find((a) => a.id === run.attemptIds[q.id])?.revision ??
        "")
      : "";
  const draft =
    q && run
      ? (run.answers[q.id] ?? { choice: "", answer: "" })
      : { choice: "", answer: "" };
  const result = run ? assessmentResult(run) : null;
  const finished = !!run?.finishedAt;
  const civilLibrary = librarySubject === "civil-law";
  const civilSession = isCivilIntegratedPaper(paper ?? undefined);
  const comprehensiveLibrary = librarySubject === "all-subjects";
  const comprehensiveSession = isComprehensiveG7Paper(paper ?? undefined);
  const directSession = civilSession || comprehensiveSession;
  const sessionSubject = q
    ? (practiceSubject(q.id) ?? "criminal-law")
    : "criminal-law";
  const comprehensiveKnowledge =
    comprehensiveSession && sessionSubject !== "criminal-law"
      ? subjectStudyKnowledge(sessionSubject)
      : null;
  const comprehensiveReview =
    finished && comprehensiveSession && run
      ? projectComprehensiveAssessmentRecord(state, run.id)
      : null;
  const dailyPracticeHref =
    finished && comprehensiveSession && run && q
      ? comprehensivePracticeHref(state, run.id, q.id)
      : null;

  const civilReview =
    finished && civilSession && paper?.mode === "subjective" && run
      ? projectCivilAssessmentRecord(state, run.id)
      : null;
  const libraryHref = comprehensiveLibrary
    ? `/lab/assessment?subject=all-subjects${comprehensiveFocus === "all" ? "" : `&focus=${comprehensiveFocus}`}`
    : civilLibrary
      ? "/lab/assessment?subject=civil-law"
      : "/lab/assessment";
  const original =
    run && q
      ? state.attempts.find((a) => a.id === run.attemptIds[q.id])
      : undefined;
  const [submissionReviews, setSubmissionReviews] = useState<
    Record<string, SubmittedAnswerReviewState<UnitFeedbackResult>>
  >({});
  const reviewControllers = useRef(
    new WeakMap<object, ReturnType<typeof createRecordedAnswerReview>>(),
  );
  const reviewMounted = useRef(true);
  useEffect(() => {
    reviewMounted.current = true;
    return () => {
      reviewMounted.current = false;
    };
  }, []);
  function reviewSavedAnswer(
    answer: SubmittedAnswer,
    retry = false,
    received?: UnitFeedbackResult,
  ) {
    const persistence = capturePersistence();
    if (!persistence || storageIssue) return;
    let controller = reviewControllers.current.get(persistence.owner);
    if (!controller) {
      controller = createRecordedAnswerReview(persistence, (review) => {
        if (reviewMounted.current)
          setSubmissionReviews((old) => ({
            ...old,
            [review.original.id]: review,
          }));
      });
      reviewControllers.current.set(persistence.owner, controller);
    }
    void (received
      ? controller.saveReceived(answer, received)
      : retry
        ? controller.retry(answer)
        : controller.submit(answer));
  }
  const scoring =
    paper?.kind === "case"
      ? scoringPapers.find((p) => p.paperId === paper.id)
      : undefined;
  const caseAnswers: TableAnswers | null =
    scoring && paper && run && paper.questionIds.length === 5
      ? paper.questionIds.map((qid, i) => ({
          id: String(i + 1) as TableAnswers[number]["id"],
          text: run.answers[qid]?.answer ?? "",
        }))
      : null;
  const now = () => new Date().toISOString();
  function rememberFeedback(
    saved: TableResult,
    review?: ExplanationReviewDelivery,
  ) {
    if (
      !run?.finishedAt ||
      saved.state === "running" ||
      !ready ||
      restorationFailed ||
      storageIssue
    )
      return;
    const pending = Object.values(run.attemptIds).some((id) => {
      const original = state.attempts.find((a) => a.id === id);
      return (
        original?.answer.trim() &&
        !state.learningObservations?.some(
          (row) => row.attemptId === id && row.resultId === saved.id,
        )
      );
    });
    if (!pending) return;
    if (
      recordCaseLearningFeedback(state, run.id, saved, now(), review) === state
    ) {
      setError("这份评阅暂未进入学习记录，原答仍保留。");
      return;
    }
    change((p) => recordCaseLearningFeedback(p, run.id, saved, now(), review));
  }
  function change(fn: (p: FaultProgress) => FaultProgress) {
    try {
      const persisted = update(fn);
      setError(persisted ? "" : "暂未保存，请先导出记录。");
      return persisted;
    } catch (e) {
      setError(e instanceof Error ? e.message : "暂未保存，请先导出记录。");
      return false;
    }
  }
  function transition(fn?: (p: FaultProgress) => FaultProgress) {
    try {
      const persisted = navigate(fn);
      setError(persisted ? "" : "暂未保存，原答仍在。请先检查记录状态。");
      return persisted;
    } catch (e) {
      setError(e instanceof Error ? e.message : "暂未保存，原答仍在。");
      return false;
    }
  }
  function restoreRunFromLink() {
    if (!ready || restorationFailed || !initialRun || !resolvingRun) return;
    const link = JSON.stringify([initialRun, initialQuestion ?? null]);
    if (restoredLink.current === link) return;
    // Effect replay must not execute a callback whose record context changed
    // after the first successful restoration. A real reload starts a new ref.
    restoredLink.current = link;
    const target = state.assessments?.runs.find((r) => r.id === initialRun);
    if (!target) {
      setLoadedRun(initialRun);
      setError("本机或当前账号没有这份记录，请从列表继续。");
      setLibrary(true);
      return;
    }
    const questions = assessmentPaper(target.paperId)?.questionIds ?? [];
    const index =
      typeof initialQuestion === "number" &&
      Number.isSafeInteger(initialQuestion) &&
      initialQuestion > 0 &&
      initialQuestion <= questions.length
        ? initialQuestion - 1
        : null;
    if (
      !transition((p) => {
        const selected = selectAssessment(p, initialRun);
        return index === null
          ? selected
          : navigateAssessment(selected, index, now());
      })
    ) {
      setLoadedRun(initialRun);
      setLibrary(true);
      return;
    }
    setLoadedRun(initialRun);
    setLibrarySubject(
      isComprehensiveG7Paper(assessmentPaper(target.paperId))
        ? "all-subjects"
        : (assessmentPaper(target.paperId)?.subject ?? "criminal-law"),
    );
    setSelected(undefined);
    setLibrary(false);
    // Consume the explicit question once; a later refresh resumes the newly
    // saved cursor instead of repeatedly jumping back to the original link.
    if (initialQuestion !== undefined) {
      const url = new URL(window.location.href);
      url.searchParams.delete("question");
      window.history.replaceState(
        window.history.state,
        "",
        `${url.pathname}${url.search}`,
      );
    }
  }
  useEffect(restoreRunFromLink, [
    ready,
    restorationFailed,
    initialRun,
    initialQuestion,
    resolvingRun,
    state.assessments,
  ]);
  useEffect(() => {
    const timer = setInterval(() => setClock(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    if (
      ready &&
      !restorationFailed &&
      state.assessments?.runs.some(
        (r) =>
          !r.finishedAt && r.deadlineAt && Date.parse(r.deadlineAt) <= clock,
      )
    ) {
      change((p) => settleAssessments(p, new Date(clock).toISOString()));
      setConfirming(false);
    }
  }, [ready, restorationFailed, clock, state.assessments]);
  useEffect(() => {
    if (
      ready &&
      !restorationFailed &&
      !resolvingRun &&
      !library &&
      !selected &&
      run?.finishedAt &&
      q &&
      !state.drafts[q.id]?.referenceSeen
    )
      change((p) => viewAssessmentReference(p, run.id, q.id));
  }, [
    ready,
    restorationFailed,
    resolvingRun,
    library,
    selected,
    run,
    q,
    state.drafts,
  ]);
  useEffect(() => {
    if (storageIssue) setConfirming(false);
  }, [storageIssue]);
  function showRun(id: string) {
    if (!transition((p) => selectAssessment(p, id))) return;
    const target = state.assessments?.runs.find((r) => r.id === id);
    setLibrarySubject(
      isComprehensiveG7Paper(assessmentPaper(target?.paperId ?? ""))
        ? "all-subjects"
        : (assessmentPaper(target?.paperId ?? "")?.subject ?? "criminal-law"),
    );
    setLibrary(false);
    setSelected(undefined);
    setKnowledge(null);
    setConfirming(false);
    window.history.replaceState(
      {},
      "",
      assessmentRunHref(
        id,
        assessmentPaper(
          state.assessments!.runs.find((r) => r.id === id)!.paperId,
        )!,
      ),
    );
  }
  function start(id: string) {
    const existing =
      state.assessments?.runs.find((r) => r.paperId === id && !r.finishedAt) ??
      open;
    const runId = existing?.id ?? crypto.randomUUID();
    if (!transition((p) => startAssessment(p, id, runId, now()))) return;
    setLibrarySubject(
      isComprehensiveG7Paper(assessmentPaper(existing?.paperId ?? id))
        ? "all-subjects"
        : (assessmentPaper(existing?.paperId ?? id)?.subject ?? "criminal-law"),
    );
    setSelected(undefined);
    setLibrary(false);
    setKnowledge(null);
    window.history.replaceState(
      {},
      "",
      assessmentRunHref(runId, assessmentPaper(existing?.paperId ?? id)!),
    );
  }
  function selectQuestion(index: number) {
    if (!transition((p) => navigateAssessment(p, index, now()))) return;
    setKnowledge(null);
    setConfirming(false);
    if (questionIndex.current) questionIndex.current.open = false;
    requestAnimationFrame(() => questionHeading.current?.focus());
  }
  function goLibrary() {
    if (!transition()) return;
    setLibrary(true);
    setSelected(undefined);
    setKnowledge(null);
    setConfirming(false);
    window.history.replaceState({}, "", libraryHref);
  }
  function showKnowledge(id: string) {
    if (!finished) return;
    if (
      !transition((p) =>
        comprehensiveSession && sessionSubject !== "criminal-law"
          ? viewSubjectStudyKnowledge(p, sessionSubject, id, now())
          : civilSession
            ? viewSubjectStudyKnowledge(p, "civil-law", id, now())
            : viewStudyTopic(p, id, now()),
      )
    )
      return;
    if (!knowledge)
      knowledgeTrigger.current = document.activeElement as HTMLElement;
    setKnowledge(id);
  }
  function closeKnowledge() {
    if (!transition()) return;
    setKnowledge(null);
    requestAnimationFrame(() =>
      knowledgeTrigger.current?.focus({ preventScroll: true }),
    );
  }
  const questionTopics = Object.fromEntries(
    (paper?.questionIds ?? []).map((qid, i) => [
      String(i + 1),
      [
        ...new Set([
          practiceTopic(qid).id,
          ...(exerciseFor(qid)?.relatedTopicIds ?? []),
        ]),
      ].flatMap((id) => {
        const topic = topicFor(id);
        return topic ? [{ id, title: topic.title }] : [];
      }),
    ]),
  );
  const remaining = assessmentRemainingSeconds(run, clock);
  const timeLabel =
    remaining === null
      ? "不计时"
      : `${Math.floor(remaining / 60)
          .toString()
          .padStart(2, "0")}:${(remaining % 60).toString().padStart(2, "0")}`;
  const questionNavigation =
    run && paper && result ? (
      <nav className={s.questionList} aria-label="整套题目列表">
        {paper.questionIds.map((id, i) => {
          const a = run.answers[id];
          const answered = !!(a?.choice || a?.answer.trim());
          const wrong = finished && result.wrongIds.includes(id);
          const label = !answered
            ? "未答"
            : !finished
              ? "已填写"
              : exerciseFor(id)!.kind === "subjective"
                ? "已保存"
                : wrong
                  ? "答错"
                  : "答对";
          return (
            <button
              key={id}
              aria-current={cursor === i ? "step" : undefined}
              aria-label={`第 ${i + 1} 题，${label}`}
              className={wrong ? s.wrong : undefined}
              onClick={() => selectQuestion(i)}
            >
              {i + 1}
              <small>{label}</small>
            </button>
          );
        })}
      </nav>
    ) : null;
  if (!ready || restorationFailed || resolvingRun)
    return (
      <RecordRecovery
        section="practice"
        user={user}
        failed={restorationFailed}
      />
    );
  return (
    <LearningFrame
      section="practice"
      session={!library && !selected && !!run}
      user={user}
      status={recordLabel(ready, storageIssue, status, user)}
      practiceDirectoryHref={
        comprehensiveLibrary || comprehensiveSession
          ? `/lab/practice?subject=${sessionSubject}&view=library`
          : civilLibrary || civilSession
            ? "/lab/practice?subject=civil-law&view=library"
            : "/lab/practice?view=library"
      }
      studyHref={
        comprehensiveLibrary || comprehensiveSession
          ? `/lab/study?subject=${sessionSubject}`
          : civilLibrary || civilSession
            ? "/lab/study?subject=civil-law"
            : "/lab/study?subject=criminal-law"
      }
    >
      <RecordNotice
        issue={storageIssue}
        status={status}
        state={state}
        retry={retrySync}
      />
      <main id="learning-main" className={s.workspace}>
        <div className={s.topline}>
          <a
            href={
              comprehensiveLibrary || comprehensiveSession
                ? `/lab/practice?subject=${sessionSubject}&view=library`
                : civilLibrary || civilSession
                  ? "/lab/practice?subject=civil-law&view=library"
                  : "/lab/practice?view=library"
            }
          >
            返回练习目录
          </a>
          <a href="/lab/assessment?subject=all-subjects">全科综合训练</a>
          {!library && <button onClick={goLibrary}>全部综合练习</button>}
        </div>
        {error && (
          <p className={s.notice} role="alert">
            {error}
          </p>
        )}
        {!ready ? (
          <p role="status">正在恢复学习记录…</p>
        ) : library ? (
          <>
            <header className={s.heading}>
              <h1>
                {comprehensiveLibrary
                  ? "全科综合训练"
                  : civilLibrary
                    ? "民法综合练习"
                    : category === "case"
                      ? "跨章长案例"
                      : category === "exam"
                        ? "限时专项"
                        : "综合练习"}
              </h1>
              <p>
                {comprehensiveLibrary
                  ? "按章节练过之后，换一组题，把知识连起来。"
                  : civilLibrary
                    ? "选一个范围，连续作答。选择练习8题，书面分析4题，都不计时。"
                    : category === "exam"
                      ? "40 道客观题，连续计时 60 分钟。"
                      : "逐问自由作答，提交后对照参考。"}
              </p>
            </header>
            {open && (
              <section className={s.resume}>
                <div>
                  <span>
                    {civilLibrary &&
                    assessmentPaper(open.paperId)?.subject !== "civil-law"
                      ? "还有一份刑法练习未完成"
                      : "尚未提交"}
                  </span>
                  <h2>{assessmentPaper(open.paperId)!.title}</h2>
                  <p>
                    {open.deadlineAt
                      ? "计时不会因关闭页面而暂停。"
                      : "原答已保留，可以接着写。"}
                  </p>
                </div>
                <button className={s.primary} onClick={() => showRun(open.id)}>
                  继续作答
                </button>
              </section>
            )}
            {comprehensiveLibrary && (
              <ComprehensiveCollections
                state={state}
                disabled={storageIssue}
                focus={comprehensiveFocus}
                onFocus={setComprehensiveFocus}
                onOpen={(id) => {
                  if (!transition()) return;
                  setSelected(id);
                  setLibrary(false);
                }}
                onResume={showRun}
              />
            )}
            {civilLibrary && (
              <CivilPracticeCollections
                state={state}
                disabled={storageIssue}
                onOpen={(id) => {
                  if (!transition()) return;
                  setSelected(id);
                  setLibrary(false);
                }}
                onResume={showRun}
              />
            )}
            {!civilLibrary &&
              !comprehensiveLibrary &&
              (["case", "exam"] as const)
                .filter((k) => category === "all" || k === category)
                .map((kind) => (
                  <section key={kind} className={s.collection}>
                    <div className={s.sectionHeading}>
                      <h2>{kind === "case" ? "跨章长案例" : "刑法客观专项"}</h2>
                      <span>
                        {kind === "case"
                          ? "每案 5 问，不限时"
                          : "每卷 40 题，60 分钟"}
                      </span>
                    </div>
                    {kind === "exam" && (
                      <p className={s.muted}>
                        从章节综合题中组卷；练过的题会如实标记。单选每题 1
                        分，多选与不定项每题 2
                        分，全选对得分。这里只练刑法，不是完整法考卷。
                      </p>
                    )}
                    <div className={s.paperList}>
                      {assessmentPapers
                        .filter(
                          (p) =>
                            p.kind === kind &&
                            !p.archived &&
                            !isComprehensiveG7Paper(p),
                        )
                        .map((p) => {
                          const history =
                            state.assessments?.runs.filter(
                              (r) => r.paperId === p.id,
                            ) ?? [];
                          const pending = history.find((r) => !r.finishedAt);
                          const last = history.at(-1);
                          return (
                            <article key={p.id}>
                              <div>
                                <h3>{p.title}</h3>
                                <p>
                                  {p.questionIds.length}{" "}
                                  {kind === "case" ? "问" : "题"}
                                  {last
                                    ? ` · ${pending ? "作答中" : "已交卷"}`
                                    : ""}
                                </p>
                              </div>
                              <div className={s.paperActions}>
                                {last?.finishedAt && (
                                  <button onClick={() => showRun(last.id)}>
                                    查看上次
                                  </button>
                                )}
                                <button
                                  disabled={!!open && !pending}
                                  onClick={() => {
                                    if (pending) showRun(pending.id);
                                    else {
                                      setSelected(p.id);
                                      setLibrary(false);
                                    }
                                  }}
                                >
                                  {pending ? "继续" : "打开"}
                                </button>
                              </div>
                            </article>
                          );
                        })}
                    </div>
                  </section>
                ))}
            {!!state.assessments?.runs.length && (
              <details className={s.history}>
                <summary>全部交卷记录</summary>
                {state.assessments.runs
                  .filter(
                    (r) =>
                      r.finishedAt &&
                      (comprehensiveLibrary
                        ? isComprehensiveG7Paper(assessmentPaper(r.paperId))
                        : !isComprehensiveG7Paper(assessmentPaper(r.paperId)) &&
                          (assessmentPaper(r.paperId)?.subject ===
                            "civil-law") ===
                            civilLibrary),
                  )
                  .slice()
                  .reverse()
                  .map((r) => (
                    <button key={r.id} onClick={() => showRun(r.id)}>
                      {assessmentPaper(r.paperId)!.title}
                      {assessmentPaper(r.paperId)!.archived ? "（旧版）" : ""}
                      <span>
                        {new Date(r.finishedAt!).toLocaleString("zh-CN")}
                      </span>
                    </button>
                  ))}
              </details>
            )}
          </>
        ) : selected ? (
          intro ? (
            <section className={s.intro}>
              <h1>{intro.title}</h1>
              <p>
                {intro.questionIds.length}{" "}
                {isComprehensiveG7Paper(intro)
                  ? `${intro.kind === "case" ? "问" : "题"} · ${intro.minutes === null ? "不计时" : `${intro.minutes}分钟`}`
                  : isCivilIntegratedPaper(intro)
                    ? "题 · 不计时"
                    : intro.kind === "case"
                      ? "个小问 · 不限时"
                      : "题 · 60 分钟"}
              </p>
              <p>
                {isComprehensiveG7Paper(intro)
                  ? comprehensiveG7Definition(intro.id)?.description
                  : isCivilIntegratedPaper(intro)
                    ? intro.mode === "objective"
                      ? "选择随写随存。提交后看对错、逐项解析和关联知识。题目取自已有题库，练过或见过参考的会如实标记。"
                      : "原答随写随存。提交后看参考和关联知识，也可逐题请求AI讲解。题目取自已有题库，练过或见过参考的会如实标记。"
                    : intro.kind === "case"
                      ? scoringPapers.some((p) => p.paperId === intro.id)
                        ? "原答随写随存。提交后可看参考、保存重答；自动评阅以服务状态为准。"
                        : "原答随写随存，提交后看参考；本案暂未自动批改。"
                      : "开始后连续计时，关闭或刷新也不暂停；到时提交已保存的答案。交卷前不显示解析或具体知识点，未答题计 0 分。"}
              </p>
              {reviewedFeedbackAvailable &&
                intro.id === reviewedFeedbackTarget.paperId && (
                  <p>
                    <a href={reviewedFeedbackHref()} data-reviewed-case-entry>
                      回看同案第2问的已审读反馈
                    </a>
                    <br />
                    <small>
                      含示范分析，适合复习；不评本次原答，不影响旧评分。
                    </small>
                  </p>
                )}
              {intro.kind === "exam" && !isComprehensiveG7Paper(intro) && (
                <p className={s.muted}>
                  单选每题 1 分，多选与不定项每题 2
                  分，全选对得分；这里只练刑法，不是完整法考卷。
                </p>
              )}
              {isComprehensiveG7Paper(intro) && intro.minutes !== null && (
                <p className={s.muted}>
                  开始后持续计时，离开页面也不暂停；到时提交已保存的答案。
                  {intro.mode === "objective"
                    ? "本卷单选每题1分，多选与不定项每题2分，全选对得分。"
                    : "书面训练逐问给讲解，不合成主观总分。"}
                </p>
              )}
              {!!seenAssessmentQuestions(state, intro.questionIds).length && (
                <p className={s.muted}>
                  其中{" "}
                  {seenAssessmentQuestions(state, intro.questionIds).length}{" "}
                  题已作答或看过同案参考，这次适合复习。
                </p>
              )}
              {open && open.paperId !== intro.id && (
                <p>
                  你还有一份未完成的练习：{assessmentPaper(open.paperId)?.title}
                  。先继续这份，已选的新题单不会替换它。
                </p>
              )}
              {intro.archived && open?.paperId !== intro.id ? (
                <p>
                  这份旧版练习已归档，可在交卷记录中查看原答。
                  <button onClick={goLibrary}>查看当前练习</button>
                </p>
              ) : (
                <button className={s.primary} onClick={() => start(intro.id)}>
                  {open
                    ? "继续未完成练习"
                    : intro.minutes !== null
                      ? "开始计时"
                      : "开始作答"}
                </button>
              )}
            </section>
          ) : (
            <p>
              这份练习不存在。<button onClick={goLibrary}>查看练习列表</button>
            </p>
          )
        ) : run && paper && q && result ? (
          <>
            <header className={s.sessionHeading} data-finished={finished}>
              <div>
                <span>
                  {comprehensiveSession
                    ? "全科综合训练"
                    : civilSession
                      ? "民法综合练习"
                      : paper.kind === "case"
                        ? "跨章长案例"
                        : "刑法客观专项"}
                </span>
                <h1>{paper.title}</h1>
              </div>
              <div className={s.clock}>
                {finished ? (
                  civilSession ? (
                    "已保存"
                  ) : (
                    "已交卷"
                  )
                ) : (
                  <>
                    <span>{remaining === null ? "" : "剩余 "}</span>
                    <time role="timer" aria-label="剩余作答时间">
                      {timeLabel}
                    </time>
                  </>
                )}
              </div>
            </header>
            {comprehensiveReview ? (
              <>
                <ComprehensiveReview
                  record={comprehensiveReview}
                  currentQuestion={cursor + 1}
                  disabled={storageIssue}
                  onSelect={selectQuestion}
                />
                {paper.mode === "objective" && result.score !== null && (
                  <p className={s.muted}>
                    本卷训练得分 {result.score} / {result.maxScore}
                    。按本卷客观题规则计算。
                  </p>
                )}
                {run.finishReason === "timeout" && (
                  <p className={s.muted}>时间已到，已提交当时保存的答案。</p>
                )}
              </>
            ) : civilReview ? (
              <CivilPracticeReview
                record={civilReview}
                currentQuestion={cursor + 1}
                disabled={storageIssue}
                onSelect={selectQuestion}
              />
            ) : (
              finished && (
                <section className={s.result} aria-label="本次练习结果">
                  <strong>
                    {civilSession
                      ? paper.mode === "objective"
                        ? `答对 ${result.answered - result.wrongIds.length} / ${result.total} 题`
                        : "原答已保存 · 逐题看讲解"
                      : paper.kind === "exam"
                        ? `${result.score} / ${result.maxScore} 分`
                        : "原答已保存 · 参考自检"}
                  </strong>
                  <p>
                    已答 {result.answered} / {result.total}，未答{" "}
                    {result.total - result.answered}。
                    {run.finishReason === "timeout" ? "到时自动交卷。" : ""}
                    {run.seenQuestionIds.length
                      ? `其中 ${run.seenQuestionIds.length} 题已作答或见过参考。`
                      : ""}
                  </p>
                  {paper.kind === "exam" && (
                    <p className={s.muted}>
                      本次答错 {result.wrongIds.length}{" "}
                      题，未答题另计；可逐题看解析、回看知识。
                    </p>
                  )}
                </section>
              )
            )}
            {civilReview || comprehensiveReview ? null : paper.kind !==
              "case" ? (
              <details className={s.questionIndex} ref={questionIndex}>
                <summary>
                  题目列表 · 已答 {result.answered} / {result.total}
                </summary>
                {questionNavigation}
              </details>
            ) : (
              questionNavigation
            )}
            <div
              className={`${finished ? `${s.readingLayout} ${d.document}` : paper.kind === "case" ? s.caseLayout : s.singleLayout}`}
              data-feedback={finished}
            >
              {paper.kind === "case" && (
                <aside className={s.casePanel}>
                  {finished ? (
                    <section aria-label="完整案情">
                      <h2 className={d.heading}>题目与问题</h2>
                      <p className={d.paragraph}>{q.facts}</p>
                    </section>
                  ) : (
                    <details open>
                      <summary>完整案情</summary>
                      <div>
                        {q.facts.split("\n\n").map((p, i) => (
                          <p key={i}>{p}</p>
                        ))}
                      </div>
                    </details>
                  )}
                </aside>
              )}
              <section className={s.answerPanel} aria-label="作答区">
                <div className={s.questionMeta}>
                  第 {cursor + 1} / {paper.questionIds.length}{" "}
                  {paper.kind === "case" ? "问" : "题"}
                  {q.kind === "objective" ? ` · ${choiceModeLabel(q)}` : ""}
                </div>
                {paper.kind !== "case" && (
                  <div className={s.facts} aria-label="本题案情">
                    {finished && <h2 className={d.heading}>题目与问题</h2>}
                    {q.facts}
                  </div>
                )}
                {finished ? (
                  <h3
                    className={d.subheading}
                    ref={questionHeading}
                    tabIndex={-1}
                  >
                    {q.prompt}
                  </h3>
                ) : (
                  <h2 ref={questionHeading} tabIndex={-1}>
                    {q.prompt}
                  </h2>
                )}
                {q.kind === "objective" ? (
                  <fieldset
                    className={s.options}
                    disabled={finished || storageIssue}
                  >
                    <legend>
                      {choiceMode(q) === "single"
                        ? "选择一个答案"
                        : choiceMode(q) === "multiple"
                          ? "选择所有正确答案"
                          : "可选一个或多个答案"}
                    </legend>
                    {q.options!.map((option) => (
                      <label
                        key={option.id}
                        data-selected={selectedChoices(draft.choice).includes(
                          option.id,
                        )}
                      >
                        <input
                          type={
                            choiceMode(q) === "single" ? "radio" : "checkbox"
                          }
                          name={q.id}
                          value={option.id}
                          checked={selectedChoices(draft.choice).includes(
                            option.id,
                          )}
                          onChange={() =>
                            change((p) =>
                              editAssessment(
                                p,
                                q.id,
                                {
                                  choice: toggleChoice(
                                    q,
                                    draft.choice,
                                    option.id,
                                  ),
                                },
                                now(),
                              ),
                            )
                          }
                        />
                        <span>{option.id.toUpperCase()}</span>
                        <span>{option.text}</span>
                      </label>
                    ))}
                  </fieldset>
                ) : finished ? (
                  <section aria-label="我的原答">
                    <h2 className={d.heading}>我的原答</h2>
                    <p className={d.original} data-saved-original-answer>
                      {draft.answer || "本问未作答。"}
                    </p>
                  </section>
                ) : (
                  <label className={s.written}>
                    <span>
                      {g8WritingFormat(q.id) === "document"
                        ? "我的完整文书"
                        : g8WritingFormat(q.id) === "essay"
                          ? "我的论述"
                          : "我的判断与理由"}
                    </span>
                    <textarea
                      rows={g8WritingFormat(q.id) ? 18 : 8}
                      maxLength={8000}
                      value={draft.answer}
                      disabled={storageIssue}
                      placeholder={
                        g8WritingFormat(q.id)
                          ? "在这里写全文，换行分段。写到一半也会自动保存。"
                          : "结合案情，写下你的分析。"
                      }
                      onChange={(e) =>
                        change((p) =>
                          editAssessment(
                            p,
                            q.id,
                            { answer: e.target.value },
                            now(),
                          ),
                        )
                      }
                    />
                    <small>输入自动保存，可随时换题或退出，下次继续。</small>
                  </label>
                )}
                {finished && (
                  <div className={s.feedback} aria-label="答案与解析">
                    {q.kind === "objective" && (
                      <section aria-label="我的原答">
                        <h2 className={d.heading}>我的原答</h2>
                        <p className={d.original}>
                          {draft.choice
                            ? `我选择了 ${answerLabel(selectedChoices(draft.choice))}。`
                            : "本题未作答。"}
                        </p>
                      </section>
                    )}
                    {!directSession && q.kind === "subjective" && (
                      <h2 className={d.heading}>
                        {civilSession ? "本题结果" : "对原答的判断与分析"}
                      </h2>
                    )}
                    {q.kind === "subjective" &&
                      (directSession && original ? (
                        <UnitAnswerFeedback
                          key={original.id}
                          exerciseId={original.exerciseId}
                          exerciseRevision={original.revision}
                          attemptId={original.id}
                          answer={original.answer}
                          choice={original.choice}
                          reference={q.reference}
                          savedResult={submittedFeedbackFor(state, original.id)}
                          storageIssue={storageIssue}
                          activeReview={submissionReviews[original.id]}
                          onRetry={() => reviewSavedAnswer(original, true)}
                          onSaveReceived={(result) =>
                            reviewSavedAnswer(original, false, result)
                          }
                          onReviewed={(result) =>
                            reviewSavedAnswer(original, false, result)
                          }
                        />
                      ) : scoring && caseAnswers ? (
                        <CaseScoring
                          caseId={scoring.caseId}
                          answers={caseAnswers}
                          recordBinding={run.id}
                          onReviewed={rememberFeedback}
                          questionId={String(cursor + 1)}
                          questionTopics={questionTopics}
                          onViewTopic={showKnowledge}
                          submissionDisabled={storageIssue}
                        />
                      ) : (
                        <p>
                          {draft.answer.trim()
                            ? "这份答案还没有评阅。"
                            : "本问未作答，没有对应评阅。"}
                        </p>
                      ))}
                    {q.kind === "objective" && (
                      <ObjectiveAnswerAnalysis
                        question={q}
                        questionRevision={
                          answerRevision || exerciseRevision(q.id)
                        }
                        choice={draft.choice}
                      />
                    )}
                    {!directSession &&
                      q.kind === "subjective" &&
                      run.attemptIds[q.id] && (
                        <LearningFeedbackTrace
                          state={state}
                          attemptId={run.attemptIds[q.id]}
                        />
                      )}
                    <FeedbackBoundaryNote questionId={q.id} />
                    {reviewedFeedbackAvailable &&
                      hasReviewedQuestionReference(paper.id, q.id) &&
                      !hasReasoningLearningExamples(
                        paper.id,
                        q.id,
                        answerRevision,
                        reasoningExamples,
                      ) && (
                        <aside aria-label="本问已审读反馈">
                          <a
                            href={reviewedFeedbackHref("assisted", run.id)}
                            data-reviewed-question-entry
                          >
                            查看本问已审读反馈
                          </a>
                          <p>
                            人工复核的历史修改，未评阅上方原答；返回后原答和重答保留。
                          </p>
                        </aside>
                      )}
                    {q.kind === "subjective" && (
                      <>
                        <h2 className={d.heading}>参考分析</h2>
                        <AnswerReference
                          questionId={q.id}
                          questionRevision={
                            answerRevision || exerciseRevision(q.id)
                          }
                          reference={q.reference}
                          className={d.paragraph}
                        />
                        <details
                          className={s.savedReview}
                          aria-label="参考得分点"
                        >
                          <summary>参考得分点</summary>
                          <ol className={d.points} type="1">
                            {q.criteria?.map((criterion) => (
                              <li key={criterion.id}>
                                <strong>{criterion.label}：</strong>
                                {criterion.meaning}
                              </li>
                            ))}
                          </ol>
                          <p className={d.note}>
                            自编练习的参考要点，不是官方评分细则。
                          </p>
                        </details>
                      </>
                    )}
                    <section aria-label="本题学习小结">
                      <h2 className={d.heading}>本题学习小结</h2>
                      <p>
                        {q.kind === "subjective"
                          ? (() => {
                              if (
                                comprehensiveSession &&
                                original &&
                                submittedFeedbackFor(state, original.id)
                              )
                                return "原答和AI讲解已保存。按讲解指出的内容改写，可以在下方单独保存，原答不会被覆盖。";
                              if (!draft.answer.trim())
                                return "本问未作答。可先对照参考分析，再写自己的判断。";
                              const count = state.corrections.filter(
                                (c) =>
                                  c.attemptId === run.attemptIds[q.id] &&
                                  c.answer.trim(),
                              ).length;
                              return count
                                ? `本问原答保留，另有 ${count} 份独立重答已保存、尚未评阅。现有记录还不能说明是否已改正。`
                                : "本问原答已保存。可对照展开的参考得分点，再写一版自己的理由；目前没有已保存的独立重答记录。";
                            })()
                          : draft.choice
                            ? isCorrectChoice(q, draft.choice)
                              ? "本次选择正确并已保存，单次答对不代表已掌握这个知识点。"
                              : "本次选择错误已留有记录，可回看逐项分析与关联知识。"
                            : "本题未作答，已交卷的记录保留；参考分析可用于自检。"}
                      </p>
                    </section>
                    <div className={s.topicLinks}>
                      {[
                        ...new Set([
                          practiceTopic(q.id).id,
                          ...(q.relatedTopicIds ?? []),
                        ]),
                      ].map((id) => (
                        <button key={id} onClick={() => showKnowledge(id)}>
                          {topicFor(id)?.title}
                        </button>
                      ))}
                    </div>
                    <ReferenceSources
                      sources={q.sources.map((id) => ({
                        id,
                        ...exerciseSources(q.id)[id],
                      }))}
                    />
                    {dailyPracticeHref && (
                      <a className={s.ask} href={dailyPracticeHref}>
                        {q.kind === "objective"
                          ? "打开这道题再练"
                          : "到日常练习完整再答"}
                      </a>
                    )}
                    <a
                      className={s.ask}
                      href={`/lab/ask?question=${encodeURIComponent(q.id)}&fromRun=${encodeURIComponent(run.id)}`}
                    >
                      问这道题
                    </a>
                  </div>
                )}
                {finished &&
                  (paper.kind === "case" || directSession) &&
                  q.kind === "subjective" &&
                  run.attemptIds[q.id] && (
                    <>
                      <AnswerRewrite
                        key={run.attemptIds[q.id]}
                        state={state}
                        target={{
                          runId: run.id,
                          questionId: q.id,
                          attemptId: run.attemptIds[q.id],
                        }}
                        disabled={storageIssue}
                        onChange={change}
                        scope={
                          directSession ||
                          (hasReviewedQuestionReference(paper.id, q.id) &&
                            answerRevision === exerciseRevision(q.id))
                            ? "whole-question"
                            : "focused"
                        }
                      />
                      {!directSession && (
                        <QuestionReasoningLearning
                          paperId={paper.id}
                          questionId={q.id}
                          revision={answerRevision}
                          examples={reasoningExamples}
                          matrixExamples={matrixExamples}
                          submitted={finished}
                          hasSavedRewrite={state.corrections.some(
                            (c) =>
                              c.attemptId === run.attemptIds[q.id] &&
                              !!c.answer.trim(),
                          )}
                        />
                      )}
                    </>
                  )}
                <footer className={s.actions}>
                  <button
                    disabled={cursor === 0}
                    onClick={() => selectQuestion(cursor - 1)}
                  >
                    上一{paper.kind === "case" ? "问" : "题"}
                  </button>
                  <div>
                    {cursor + 1 < paper.questionIds.length && (
                      <button
                        className={s.primary}
                        onClick={() => selectQuestion(cursor + 1)}
                      >
                        下一{paper.kind === "case" ? "问" : "题"}
                      </button>
                    )}
                    {!finished && (
                      <button
                        onClick={() => setConfirming(true)}
                        disabled={storageIssue}
                      >
                        {comprehensiveSession ? (
                          "提交本次训练"
                        ) : civilSession ? (
                          "提交本次练习"
                        ) : (
                          <>整{paper.kind === "case" ? "案提交" : "卷提交"}</>
                        )}
                      </button>
                    )}
                    {finished && cursor + 1 === paper.questionIds.length && (
                      <button className={s.primary} onClick={goLibrary}>
                        回到练习列表
                      </button>
                    )}
                  </div>
                </footer>
                {confirming && !finished && (
                  <section className={s.confirm} aria-label="交卷确认">
                    <h3>提交这份练习？</h3>
                    <p>
                      {result.total - result.answered > 0
                        ? `还有 ${result.total - result.answered} ${paper.kind === "case" ? "问" : "题"}未答，将按未答保留。`
                        : "所有题目都已填写。"}
                      提交后保存本次原答，再查看解析。
                    </p>
                    <button onClick={() => setConfirming(false)}>
                      返回作答
                    </button>
                    <button
                      className={s.primary}
                      disabled={storageIssue}
                      onClick={() => {
                        if (storageIssue) return;
                        if (
                          !transition((p) => finishAssessment(p, run.id, now()))
                        )
                          return;
                        setConfirming(false);
                      }}
                    >
                      确认交卷
                    </button>
                  </section>
                )}
              </section>
            </div>
          </>
        ) : (
          <p>
            选择一份练习开始。<button onClick={goLibrary}>查看列表</button>
          </p>
        )}
      </main>
      {finished && !library && !selected && knowledge && (
        <KnowledgePanel
          topicId={knowledge}
          learningSummary={
            directSession ? projectTopicLearning(state, knowledge) : null
          }
          onSelect={showKnowledge}
          onClose={closeKnowledge}
          {...(comprehensiveKnowledge
            ? {
                topics: comprehensiveKnowledge.topics,
                contentByTopic: comprehensiveKnowledge.content,
                subjectLabel: practiceSubjectInfo(sessionSubject).label,
                onExampleRead: (id: string) =>
                  change((p) =>
                    viewSubjectStudyKnowledge(
                      p,
                      sessionSubject,
                      id,
                      now(),
                      true,
                    ),
                  ),
              }
            : civilSession
              ? {
                  topics: explicitCivilKnowledgeTopics,
                  contentByTopic: explicitCivilKnowledge,
                  subjectLabel: "民法" as const,
                  onExampleRead: (id: string) =>
                    change((p) =>
                      viewSubjectStudyKnowledge(
                        p,
                        "civil-law",
                        id,
                        now(),
                        true,
                      ),
                    ),
                }
              : {})}
          onPractice={
            comprehensiveSession
              ? dailyPracticeHref
                ? () => {
                    if (transition()) window.location.assign(dailyPracticeHref);
                  }
                : undefined
              : civilSession
                ? undefined
                : () => {
                    const mode = topicPracticeMode(knowledge);
                    if (!mode || storageIssue) return;
                    if (
                      !transition((p) =>
                        beginTopicPractice(p, knowledge, mode, now()),
                      )
                    )
                      return;
                    window.location.assign(
                      `/lab/practice?fromRun=${encodeURIComponent(run!.id)}`,
                    );
                  }
          }
        />
      )}
    </LearningFrame>
  );
}
