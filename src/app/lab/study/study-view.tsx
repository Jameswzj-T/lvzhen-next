"use client";
import {
  isRemainingG6Subject,
  remainingG6SubjectIds,
  remainingG6SubjectInfo,
} from "@/content/remaining-g6-subjects";
import { assessmentRunHref } from "@/content/civil-integrated-practice";
import { projectPracticeReopening } from "@/domain/practice-reopening";
import { IntegratedProgress } from "../_components/integrated-progress";

import { projectCivilProcedureContinuation } from "@/domain/civil-procedure-continuation";
import { projectCivilProcedureDirectory } from "@/domain/civil-procedure-directory";
import {
  corePracticeSections,
  coreSectionForTopic,
  type CorePracticeSubject,
} from "@/content/core-practice-sections";
import { CivilProcedureSections } from "../_components/civil-procedure-sections";
import { useEffect, useMemo, useRef, useState } from "react";
import { DailyLearning } from "../_components/daily-learning";
import {
  learningTopicCaption,
  projectLearningProfile,
} from "@/domain/learning-profile";
import { unfinishedStudyAssessment } from "@/domain/civil-assessment-records";
import { CivilAssessmentRecords } from "./civil-assessment-records";
import { assessmentPaper } from "@/content/assessment-papers";
import { StudyGate } from "@/accounts/study-gate";
import type { Learner } from "@/accounts/client";
import {
  knowledgeTopics,
  practiceKnowledge,
  practiceGroups,
  practiceQueues,
  practiceTopic,
  isChapterReview,
  practiceChapter,
  practiceSubject,
  practiceSubjectInfo,
  type PracticeSubject,
} from "@/content/practice-set";
import {
  availableChapters,
  chapterFor,
  criminalChapters,
} from "@/content/criminal-curriculum";
import { ChapterDirectory } from "../_components/chapter-directory";
import { topicSources } from "@/content/fault-catalog";
import {
  topicRecord,
  viewStudyTopic,
  beginTopicPractice,
  hasPracticeHistory,
} from "@/domain/study-space";
import { usePractice } from "../practice/use-practice";
import { RecordRecovery } from "../_components/record-recovery";
import {
  LearningFrame,
  RecordNotice,
  StudyIcon,
  recordLabel,
} from "../_components/learning-frame";
import s from "./study.module.css";
import d from "../_components/reading-document.module.css";
import { ReferenceSources } from "../_components/reference-sources";
import { studyTopicLocation } from "./topic-location";
import { topicPracticeMode } from "./topic-practice";
import {
  projectReviewFocus,
  prepareReviewFocusPractice,
} from "@/domain/practice-review-focus";
import { ReviewFocus } from "./review-focus";
import { ReviewSuggestions } from "./review-suggestions";
import {
  nextLearningPractice,
  prepareLearningNext,
} from "@/domain/learning-next";
import { LearningNext } from "../_components/learning-next";
import { LearningReview } from "../_components/learning-review";
import { projectLearningReview } from "@/domain/learning-review";
import { projectOtherQuestionReview } from "@/domain/learning-other-question-review";
import {
  projectStudyContinuation,
  prepareStudyContinuation,
  type StudyPosition,
} from "@/domain/study-continuation";
import { projectStudySubjectActivity } from "@/domain/study-subject-activity";
import {
  projectChapterLearning,
  projectTopicLearning,
  prepareTopicLearningNext,
} from "@/domain/topic-learning-summary";
import {
  ChapterLearningProgress,
  TopicLearning,
} from "../_components/topic-learning";
import { projectCivilContractContinuation } from "@/domain/civil-contract-continuation";
import {
  subjectStudyKnowledge,
  subjectStudyTopic,
  subjectStudyPracticeMode,
  prepareSubjectStudyPractice,
  viewSubjectStudyKnowledge,
} from "./subject-knowledge";

function positionStage(position: StudyPosition) {
  return {
    viewed: "已到这道题，尚未保存作答",
    draft: position.hasFeedbackRetry ? "完整重答草稿已保留" : "草稿已保留",
    saved: "作答已保存",
    saved_pending: "新答已保存，还没有可用的评阅结果",
    incompatible: "前后两次评阅暂时无法对照，可以先回看原答",
    comparable: "两次评阅都已保存，可以回到题目比较原答和重答",
    paused: "这次重答已暂停，草稿保留，可以回看",
  }[position.stage];
}

export function StudyEntry({
  initialTopicId,
  initialSubject,
}: {
  initialTopicId?: string;
  initialSubject?: PracticeSubject;
}) {
  return (
    <StudyGate>
      {(user) => (
        <StudyView
          key={`${user?.id ?? "guest"}:${initialSubject ?? "current"}:${initialTopicId ?? "directory"}`}
          user={user}
          initialTopicId={initialTopicId}
          initialSubject={initialSubject}
        />
      )}
    </StudyGate>
  );
}
function StudyView({
  user,
  initialTopicId,
  initialSubject,
}: {
  user: Learner;
  initialTopicId?: string;
  initialSubject?: PracticeSubject;
}) {
  const records = usePractice(user?.id ?? null, false);
  const {
    state,
    ready,
    restorationFailed,
    update,
    navigate,
    storageIssue,
    status,
    retrySync,
  } = records;
  const subjectTopic = subjectStudyTopic(initialSubject, initialTopicId);
  const destination = subjectTopic
    ? { topicId: subjectTopic.id, chapterId: null }
    : initialSubject && initialSubject !== "criminal-law"
      ? null
      : studyTopicLocation(initialTopicId);
  const [expanded, setExpanded] = useState<string | null>(
    destination?.topicId ?? null,
  );
  const [chapterId, setChapterId] = useState<string | null>(
    destination?.chapterId ?? null,
  );
  const [civilSectionId, setCivilSectionId] = useState<string | null>(
    coreSectionForTopic(
      isRemainingG6Subject(initialSubject)
        ? initialSubject
        : initialSubject === "civil-law"
          ? "civil-law"
          : initialSubject === "criminal-procedure"
            ? "criminal-procedure"
            : initialSubject === "administrative-law"
              ? "administrative-law"
              : initialSubject === "commercial-law"
                ? "commercial-law"
                : "civil-procedure",
      initialTopicId,
    )?.id ?? null,
  );
  const [continuationIssue, setContinuationIssue] = useState<string | null>(
    null,
  );
  const prepared = useRef(false);
  useEffect(() => {
    if (
      !ready ||
      restorationFailed ||
      prepared.current ||
      !destination ||
      expanded !== destination.topicId ||
      chapterId !== destination.chapterId
    )
      return;
    prepared.current = true;
    if (!storageIssue)
      update((p) =>
        initialSubject && initialSubject !== "criminal-law"
          ? viewSubjectStudyKnowledge(
              p,
              initialSubject,
              destination.topicId,
              new Date().toISOString(),
            )
          : viewStudyTopic(p, destination.topicId, new Date().toISOString()),
      );
    document
      .getElementById(`topic-${destination.topicId}`)
      ?.scrollIntoView({ block: "start" });
  }, [
    ready,
    restorationFailed,
    storageIssue,
    destination?.topicId,
    destination?.chapterId,
    expanded,
    chapterId,
    initialSubject,
  ]);
  const currentQuestion =
    state.practice?.cursors[state.practice.mode] ?? practiceQueues.objective[0];
  const currentSubject = practiceSubject(currentQuestion);
  const currentSubjectInfo = practiceSubjectInfo(currentSubject);
  const currentSubjectTitle = currentSubjectInfo.label;
  const studySubject =
    initialSubject ??
    (destination ? "criminal-law" : (currentSubject ?? "criminal-law"));
  const studySubjectInfo = practiceSubjectInfo(studySubject);
  const subjectKnowledge = subjectStudyKnowledge(studySubject);
  const civilDirectory = useMemo(
    () =>
      [
        "civil-law",
        "civil-procedure",
        "criminal-procedure",
        "administrative-law",
        "commercial-law",
        ...remainingG6SubjectIds,
      ].includes(studySubject)
        ? projectCivilProcedureDirectory(
            state,
            studySubject as CorePracticeSubject,
          )
        : [],
    [state, studySubject],
  );
  const currentTopic = practiceTopic(currentQuestion);
  const currentChapter = practiceChapter(currentQuestion);
  const selectedChapter = chapterId ? chapterFor(chapterId)! : null;
  const civilSection = [
    "civil-law",
    "civil-procedure",
    "criminal-procedure",
    "administrative-law",
    "commercial-law",
    ...remainingG6SubjectIds,
  ].includes(studySubject)
    ? corePracticeSections(studySubject as CorePracticeSubject).find(
        (section) => section.id === civilSectionId,
      )
    : undefined;
  const visibleTopics =
    ([
      "civil-law",
      "civil-procedure",
      "criminal-procedure",
      "administrative-law",
      "commercial-law",
      ...remainingG6SubjectIds,
    ].includes(studySubject)
      ? subjectKnowledge?.topics.filter((topic) =>
          civilSection?.topicIds.includes(topic.id),
        )
      : subjectKnowledge?.topics) ??
    knowledgeTopics.filter((topic) =>
      selectedChapter?.topicIds.includes(topic.id),
    );
  const { answered, viewed } = projectStudySubjectActivity(state, studySubject);
  const learningProfile = useMemo(
    () => (ready && !restorationFailed ? projectLearningProfile(state) : null),
    [state, ready, restorationFailed],
  );
  const subjectLearning = learningProfile?.subjects.find(
    (item) => item.id === studySubject,
  );
  const chapterLearning = useMemo(
    () =>
      ready &&
      !restorationFailed &&
      studySubject === "criminal-law" &&
      selectedChapter
        ? projectChapterLearning(state, selectedChapter.id)
        : null,
    [state, ready, restorationFailed, studySubject, selectedChapter],
  );
  const pendingPaper = unfinishedStudyAssessment(state, studySubject);
  const continuation =
    ready && !restorationFailed
      ? projectStudyContinuation(state, studySubject)
      : { current: null, unfinishedRetry: null };
  const currentPosition = continuation.current;
  const unfinishedRetry = continuation.unfinishedRetry;
  const currentIntegratedContinuation =
    ready && !restorationFailed
      ? (projectCivilContractContinuation(state) ??
        projectCivilProcedureContinuation(state))
      : null;
  const contractContinuation =
    currentIntegratedContinuation &&
    practiceSubject(currentIntegratedContinuation.resumeQuestionId) ===
      studySubject
      ? currentIntegratedContinuation
      : null;
  const reopening =
    ready && !restorationFailed && !pendingPaper && !contractContinuation
      ? projectPracticeReopening(state, studySubject)
      : null;
  const selectedSubjectStart =
    ready &&
    !restorationFailed &&
    !pendingPaper &&
    !contractContinuation &&
    !reopening &&
    currentSubject !== studySubject
      ? (subjectKnowledge?.topics ?? knowledgeTopics)[0]
      : null;
  const learningRecommendation = useMemo(() => {
    if (contractContinuation?.pendingQuestionId) return null;
    const next = nextLearningPractice(state);
    return next && practiceSubject(next.questionId) === studySubject
      ? next
      : null;
  }, [state, contractContinuation?.pendingQuestionId, studySubject]);
  const learningReview = useMemo(
    () =>
      ready && !restorationFailed
        ? projectLearningReview(state, studySubject, learningRecommendation)
        : [],
    [state, studySubject, learningRecommendation, ready, restorationFailed],
  );
  const otherQuestionReview = useMemo(
    () =>
      ready && !restorationFailed
        ? projectOtherQuestionReview(state, studySubject)
        : [],
    [state, studySubject, ready, restorationFailed],
  );
  const started =
    !!currentPosition ||
    (studySubject === "criminal-law" &&
      (currentSubject ?? "criminal-law") === "criminal-law" &&
      hasPracticeHistory(state));
  const phaseText = (position: StudyPosition) =>
    storageIssue
      ? "本次变更尚未保存，请先检查记录状态"
      : positionStage(position);
  function setTopicUrl(topicId?: string) {
    const url = new URL(window.location.href);
    if (studySubject !== "criminal-law")
      url.searchParams.set("subject", studySubject);
    if (topicId) url.searchParams.set("topic", topicId);
    else url.searchParams.delete("topic");
    window.history.replaceState(
      window.history.state,
      "",
      `${url.pathname}${url.search}`,
    );
  }
  function browseChapter(id: string | null) {
    if (!navigate()) return;
    setTopicUrl();
    setChapterId(id);
    setExpanded(null);
  }
  function toggle(id: string) {
    const next = expanded === id ? null : id;
    if (
      !navigate(
        expanded === id
          ? undefined
          : (p) =>
              subjectKnowledge
                ? viewSubjectStudyKnowledge(
                    p,
                    studySubject,
                    id,
                    new Date().toISOString(),
                  )
                : viewStudyTopic(p, id, new Date().toISOString()),
      )
    )
      return;
    setExpanded(next);
    setTopicUrl(next ?? undefined);
  }
  function practice(id: string) {
    if (subjectKnowledge) {
      if (!ready || restorationFailed || storageIssue) return;
      let href: string | null = null;
      const saved = navigate((p) => {
        const prepared = prepareSubjectStudyPractice(
          p,
          studySubject,
          id,
          new Date().toISOString(),
        );
        if (!prepared) return p;
        href = prepared.href;
        return prepared.state;
      });
      if (saved && href) {
        setContinuationIssue(null);
        window.location.assign(href);
      } else {
        setContinuationIssue(
          saved
            ? "这个知识点暂时没有可进入的练习，原答和草稿仍保留。"
            : "本次变更尚未保存，仍留在学习页；原答和草稿保留。",
        );
      }
      return;
    }
    const mode = topicPracticeMode(id);
    if (!mode || storageIssue) return;
    if (
      !navigate((p) =>
        beginTopicPractice(p, id, mode, new Date().toISOString()),
      )
    )
      return;
    window.location.assign("/lab/practice");
  }
  function continueTopicLearning(topicId: string, questionId: string) {
    if (!ready || restorationFailed || storageIssue) return;
    let targetReady = false;
    const saved = navigate((p) => {
      const prepared = prepareTopicLearningNext(
        p,
        topicId,
        questionId,
        new Date().toISOString(),
      );
      targetReady = !!prepared;
      return prepared ?? p;
    });
    if (saved && targetReady)
      window.location.assign(
        `/lab/practice?${practiceSubject(questionId) === "civil-law" ? "subject=civil-law&" : ""}question=${encodeURIComponent(questionId)}`,
      );
    else setContinuationIssue("暂时没能接上这道题，草稿和原答还在。请重试。");
  }
  function continueLearning(recommendationId: string) {
    if (!ready || restorationFailed || storageIssue) return;
    let href: string | null = null;
    const saved = navigate((p) => {
      const prepared = prepareLearningNext(
        p,
        recommendationId,
        new Date().toISOString(),
      );
      if (!prepared) return p;
      href = prepared.href;
      return prepared.state;
    });
    if (saved && href) {
      setContinuationIssue(null);
      window.location.assign(href);
    } else {
      setContinuationIssue(
        saved
          ? "这项记录暂时无法接续，原答和草稿仍保留。"
          : "本次变更尚未保存，原答和草稿仍保留；请先检查记录状态。",
      );
    }
  }
  function continueRetry(continuationId: string) {
    if (!ready || restorationFailed || storageIssue) return;
    let href: string | null = null;
    const saved = navigate((p) => {
      const prepared = prepareStudyContinuation(
        p,
        continuationId,
        new Date().toISOString(),
        studySubject,
      );
      if (!prepared) return p;
      href = prepared.href;
      return prepared.state;
    });
    if (saved && href) {
      setContinuationIssue(null);
      window.location.assign(href);
    } else {
      setContinuationIssue(
        saved
          ? "这次重答暂时无法接续，原答和草稿仍保留。"
          : "本次变更尚未保存，原答和草稿仍保留；请先检查记录状态。",
      );
    }
  }
  function practiceReviewFocus(correctionId: string) {
    if (!ready || restorationFailed || storageIssue) return;
    let href: string | null = null;
    const saved = navigate((p) => {
      const prepared = prepareReviewFocusPractice(
        p,
        correctionId,
        new Date().toISOString(),
      );
      if (!prepared) return p;
      href = prepared.href;
      return prepared.state;
    });
    if (saved && href) window.location.assign(href);
  }
  if (!ready || restorationFailed)
    return (
      <RecordRecovery section="study" user={user} failed={restorationFailed} />
    );
  return (
    <LearningFrame
      section="study"
      user={user}
      status={recordLabel(ready, storageIssue, status, user)}
      practiceDirectoryHref={studySubjectInfo.libraryHref}
      studyHref={`/lab/study?subject=${studySubject}`}
    >
      <RecordNotice
        issue={storageIssue}
        status={status}
        state={state}
        retry={retrySync}
      />
      <main id="learning-main" className={s.workspace}>
        <div className={s.pageHeading}>
          <div>
            <p>学习</p>
            <h1>
              {studySubjectInfo.label}
              {studySubject === "criminal-procedure" && " · 程序与权利保障"}
            </h1>
          </div>
          <div className={s.headingActions}>
            <a href={studySubjectInfo.libraryHref} className={s.quietLink}>
              去练习 <StudyIcon name="arrow" />
            </a>
          </div>
        </div>
        <nav className={s.subjects} aria-label="选择学习科目">
          <p>当前可练</p>
          <div className={s.subjectLinks}>
            {(
              [
                "criminal-law",
                "civil-law",
                "civil-procedure",
                "criminal-procedure",
                "administrative-law",
                "commercial-law",
                ...remainingG6SubjectIds,
              ] as const
            ).map((subject) => (
              <a
                key={subject}
                href={`/lab/study?subject=${subject}`}
                aria-current={subject === studySubject ? "page" : undefined}
              >
                {practiceSubjectInfo(subject).label}
              </a>
            ))}
          </div>
          <p>从各科已开放的单元开始，内容会继续补充。</p>
        </nav>
        {isRemainingG6Subject(studySubject) && (
          <p className={s.trialScope}>
            {remainingG6SubjectInfo[studySubject].description}
          </p>
        )}
        {studySubject === "commercial-law" && (
          <p className={s.trialScope}>
            从公司、合伙、破产到劳动、税收和生态环境，按12个板块查看知识要点，也可以直接刷题。
          </p>
        )}
        {studySubject === "administrative-law" && (
          <p className={s.trialScope}>
            从行政主体、许可和处罚，到强制、公开、复议、诉讼与赔偿，按8个板块查看知识要点，也可以直接进入练习。原答与反馈分别保留。
          </p>
        )}
        {studySubject === "criminal-procedure" && (
          <p className={s.trialScope}>
            从基本制度、辩护和证据，到侦查、起诉、审判及执行，按10个板块查看知识要点。也可以直接练习，随时回来接着做。
          </p>
        )}
        {studySubject === "civil-procedure" && (
          <p className={s.trialScope}>
            从起诉与管辖到执行、仲裁，按{" "}
            {corePracticeSections("civil-procedure").length}{" "}
            个板块查看知识要点，也可以直接进入练习。
          </p>
        )}
        <div className={s.layout}>
          <div className={s.mainColumn}>
            <section
              className={s.studySummary}
              aria-label={`${studySubjectInfo.label}学习情况`}
            >
              <div className={s.summaryHeading}>
                <h2>学习情况</h2>
                <a href="#knowledge-directory">看知识目录 ↓</a>
              </div>
              {subjectLearning ? (
                <div className={s.summaryLinks}>
                  <a href={`/records?subject=${studySubject}`}>
                    <strong>{subjectLearning.answered}</strong>
                    <span>题已练</span>
                  </a>
                  <a href={`/records?subject=${studySubject}&view=knowledge`}>
                    <strong>{subjectLearning.viewed}</strong>
                    <span>个要点已看</span>
                  </a>
                  <a href={`/records?subject=${studySubject}`}>
                    <strong>{subjectLearning.needsPractice}</strong>
                    <span>题还需练</span>
                  </a>
                </div>
              ) : (
                <p>正在读取学习记录…</p>
              )}
            </section>
            <DailyLearning
              state={state}
              ready={ready && !restorationFailed}
              disabled={storageIssue}
              subject={studySubject}
              update={update}
            />
            <details className={s.savedReview}>
              <summary>上次的位置与学习回顾</summary>
              {selectedSubjectStart ? (
                <section
                  className={s.resume}
                  aria-label="开始本科学习"
                  data-study-subject-start={studySubject}
                >
                  <div className={s.resumeBody}>
                    <span className={s.resumeCaption}>从这里开始</span>
                    <h2>{selectedSubjectStart.title}</h2>
                    <p>
                      {studySubjectInfo.label} · 先独立作答，讲解可按需查看。
                    </p>
                    <p className={s.resumeStage}>
                      从这个知识点开始练习；已有原答和草稿都保留。
                    </p>
                  </div>
                  <button
                    className={s.primary}
                    disabled={storageIssue}
                    onClick={() => practice(selectedSubjectStart.id)}
                  >
                    开始{studySubjectInfo.label}练习 <StudyIcon name="arrow" />
                  </button>
                </section>
              ) : (
                <section className={s.resume} aria-label="接着上次学习">
                  <div className={s.resumeBody}>
                    <span className={s.resumeCaption}>
                      {pendingPaper || started ? "继续上次学习" : "从这里开始"}
                    </span>
                    <h2>
                      {ready
                        ? pendingPaper
                          ? assessmentPaper(pendingPaper.paperId)!.title
                          : contractContinuation
                            ? contractContinuation.caseTitle
                            : reopening
                              ? reopening.topicTitle
                              : isChapterReview(currentQuestion)
                                ? "章节综合"
                                : currentTopic.title
                        : "正在恢复学习位置…"}
                    </h2>
                    <p>
                      {pendingPaper
                        ? "综合练习 · 原答已保留"
                        : reopening
                          ? `${studySubjectInfo.label} / ${reopening.chapterTitle}`
                          : `${currentSubjectTitle} / ${currentChapter.title}`}
                    </p>
                    {!pendingPaper && contractContinuation ? (
                      <>
                        <p
                          className={s.resumeQuestion}
                          data-study-current-question={
                            contractContinuation.resumeQuestionId
                          }
                        >
                          {contractContinuation.resumeQuestionTitle}
                        </p>
                        <p
                          className={s.resumeStage}
                          data-study-current-stage={
                            contractContinuation.complete
                              ? "saved"
                              : contractContinuation.hasRewriteDraft
                                ? "rewrite-draft"
                                : contractContinuation.hasDraft
                                  ? "draft"
                                  : "unanswered"
                          }
                        >
                          已有原答 {contractContinuation.savedCount} /{" "}
                          {contractContinuation.totalCount} 问。
                          {contractContinuation.pendingQuestionId
                            ? contractContinuation.hasRewriteDraft
                              ? "本问原答已保存，重答尚未提交；重答草稿保留。"
                              : contractContinuation.hasDraft
                                ? "这道题的未提交草稿保留。"
                                : "这道题尚未保存原答。"
                            : "可回看本次原答，或按下方已有记录继续练习。"}
                        </p>
                        <IntegratedProgress
                          questions={contractContinuation.questions}
                          disabled={storageIssue}
                        />
                      </>
                    ) : reopening ? (
                      <div data-study-reopening={reopening.questionId}>
                        <p
                          className={s.resumeQuestion}
                          data-study-current-question={reopening.questionId}
                        >
                          上次：{reopening.questionTitle}
                        </p>
                        <p
                          className={s.resumeStage}
                          data-study-current-stage={reopening.stage}
                        >
                          {storageIssue
                            ? "本次变更尚未保存，请先检查记录状态"
                            : reopening.summary}
                        </p>
                        <p className={s.resumeStage}>
                          这次建议：{reopening.recommendation.title}。
                          {reopening.recommendation.reason}
                        </p>
                        {reopening.recommendation.questionId !==
                          reopening.questionId && (
                          <p className={s.resumeStage}>
                            <a href={reopening.recommendation.href}>
                              {reopening.recommendation.label}
                              <StudyIcon name="arrow" />
                            </a>
                          </p>
                        )}
                      </div>
                    ) : (
                      !pendingPaper &&
                      currentPosition && (
                        <>
                          <p
                            className={s.resumeQuestion}
                            data-study-current-question={
                              currentPosition.questionId
                            }
                          >
                            {currentPosition.title}
                          </p>
                          <p
                            className={s.resumeStage}
                            data-study-current-stage={currentPosition.stage}
                          >
                            {phaseText(currentPosition)}
                          </p>
                        </>
                      )
                    )}
                  </div>
                  <a
                    className={s.primary}
                    href={
                      pendingPaper
                        ? assessmentRunHref(
                            pendingPaper.id,
                            assessmentPaper(pendingPaper.paperId),
                          )
                        : (contractContinuation?.resumeHref ??
                          reopening?.currentHref ??
                          currentSubjectInfo.href)
                    }
                  >
                    {pendingPaper
                      ? "继续作答"
                      : contractContinuation
                        ? contractContinuation.pendingQuestionId
                          ? `继续第${contractContinuation.resumeQuestionNumber}问${contractContinuation.hasRewriteDraft ? "的重答" : ""}`
                          : "回看本次综合练习"
                        : reopening
                          ? reopening.stage === "draft"
                            ? "继续这份草稿"
                            : reopening.stage === "saved"
                              ? "回看上次作答"
                              : "继续上次学习"
                          : currentPosition?.hasFeedbackRetry &&
                              ["paused", "incompatible"].includes(
                                currentPosition.stage,
                              )
                            ? "回看当前题"
                            : started
                              ? "继续刷题"
                              : "开始刷题"}
                    <StudyIcon name="arrow" />
                  </a>
                </section>
              )}
              {unfinishedRetry && (
                <section
                  className={s.retryResume}
                  aria-label="未完的完整重答"
                  data-study-retry-question={unfinishedRetry.questionId}
                >
                  <div>
                    <h2>
                      {unfinishedRetry.questionId ===
                      currentPosition?.questionId
                        ? "未完的完整重答"
                        : `未完重答 · ${unfinishedRetry.title}`}
                    </h2>
                    <p data-study-retry-stage={unfinishedRetry.stage}>
                      {phaseText(unfinishedRetry)}
                    </p>
                  </div>
                  <button
                    className={s.retryAction}
                    disabled={storageIssue}
                    onClick={() => continueRetry(unfinishedRetry.id)}
                  >
                    {unfinishedRetry.action === "continue"
                      ? "继续这次重答"
                      : "回看这次重答"}
                    <StudyIcon name="arrow" />
                  </button>
                </section>
              )}
              {continuationIssue && (
                <p className={s.continuationIssue} role="status">
                  {continuationIssue}
                </p>
              )}
              <div className={s.recordLine} aria-label="实际学习记录">
                {ready ? (
                  <>
                    <span>
                      {studySubjectInfo.label} · 已查看{" "}
                      <strong>{viewed}</strong> 个知识点
                    </span>
                    <span>
                      {[
                        "civil-law",
                        "civil-procedure",
                        "criminal-procedure",
                        "administrative-law",
                        "commercial-law",
                        ...remainingG6SubjectIds,
                      ].includes(studySubject)
                        ? "累计作答"
                        : "已作答"}{" "}
                      <strong>{answered}</strong> 道题
                    </span>
                  </>
                ) : (
                  <span>正在读取学习记录…</span>
                )}
              </div>
              {studySubject === "civil-law" && (
                <CivilAssessmentRecords state={state} disabled={storageIssue} />
              )}
              <div className={d.document}>
                <LearningNext
                  recommendation={
                    reopening || selectedSubjectStart
                      ? null
                      : learningRecommendation
                  }
                  disabled={storageIssue}
                  onContinue={continueLearning}
                />
                {[
                  "criminal-law",
                  "civil-law",
                  "civil-procedure",
                  "criminal-procedure",
                  "administrative-law",
                  "commercial-law",
                  ...remainingG6SubjectIds,
                ].includes(studySubject) ? (
                  learningReview.length > 0 && (
                    <details>
                      <summary>
                        答题回顾 · {learningReview.length} 道主观题
                      </summary>
                      <LearningReview
                        groups={learningReview}
                        otherQuestions={otherQuestionReview}
                      />
                    </details>
                  )
                ) : (
                  <LearningReview
                    groups={learningReview}
                    otherQuestions={otherQuestionReview}
                  />
                )}
              </div>
              <p>
                <a
                  className={d.nextAction}
                  href={`/lab/assessment?subject=all-subjects&focus=${studySubject}`}
                >
                  阶段训练与缩短模考 →
                </a>
              </p>
              <ReviewFocus
                items={projectReviewFocus(state).filter(
                  (item) =>
                    !item.questionId ||
                    practiceSubject(item.questionId) === studySubject,
                )}
                disabled={storageIssue}
                onPractice={practiceReviewFocus}
              >
                <ReviewSuggestions
                  state={state}
                  subject={studySubject}
                  ownerId={user?.id ?? null}
                  disabled={storageIssue}
                />
              </ReviewFocus>
            </details>
            <div id="knowledge-directory" className={s.directory}>
              {[
                "civil-law",
                "civil-procedure",
                "criminal-procedure",
                "administrative-law",
                "commercial-law",
                ...remainingG6SubjectIds,
              ].includes(studySubject) && !civilSection ? (
                <section aria-label={`${studySubjectInfo.label}知识要点`}>
                  <h2>{studySubjectInfo.label}知识要点</h2>
                  <CivilProcedureSections
                    subject={studySubject as CorePracticeSubject}
                    answered={Object.fromEntries(
                      civilDirectory.map((section) => [
                        section.id,
                        section.questions.filter((q) => q.savedCount > 0)
                          .length,
                      ]),
                    )}
                    onSelect={(id) => {
                      if (!navigate()) return;
                      setTopicUrl();
                      setCivilSectionId(id);
                      setExpanded(null);
                    }}
                  />
                </section>
              ) : !subjectKnowledge && !selectedChapter ? (
                <ChapterDirectory
                  state={state}
                  ready={ready}
                  onSelect={browseChapter}
                />
              ) : (
                <>
                  {civilSection && (
                    <button
                      className={s.backToChapters}
                      onClick={() => {
                        if (!navigate()) return;
                        setTopicUrl();
                        setCivilSectionId(null);
                        setExpanded(null);
                      }}
                    >
                      ← 全部
                      {studySubjectInfo.label}
                      章节
                    </button>
                  )}
                  {selectedChapter && (
                    <button
                      className={s.backToChapters}
                      onClick={() => browseChapter(null)}
                    >
                      返回章节目录
                    </button>
                  )}
                  <section
                    className={s.topicPaper}
                    aria-labelledby="chapter-title"
                  >
                    <div className={s.chapterHeading}>
                      <div>
                        <span>
                          {selectedChapter
                            ? `第 ${Number(selectedChapter.id.slice(2))} 章 · 内容补充中`
                            : `${studySubjectInfo.label}${["criminal-procedure", "commercial-law", "administrative-law"].includes(studySubject) ? "练习" : "试练"} · 已开放范围`}
                        </span>
                        <h2 id="chapter-title">
                          {civilSection?.title ??
                            selectedChapter?.title ??
                            "知识要点"}
                        </h2>
                      </div>
                      <span>{visibleTopics.length} 个知识点</span>
                    </div>
                    <ChapterLearningProgress summary={chapterLearning} />
                    <div className={s.topicList}>
                      {visibleTopics.map((topic, index) => {
                        const currentCivilQuestions = civilDirectory
                          .flatMap((section) => section.questions)
                          .filter((q) => q.topicId === topic.id);
                        const evidence = [
                          "civil-law",
                          "civil-procedure",
                          "criminal-procedure",
                          "administrative-law",
                          "commercial-law",
                          ...remainingG6SubjectIds,
                        ].includes(studySubject)
                          ? {
                              viewed:
                                !!state.practice?.knowledgeViewed[topic.id],
                              answered: currentCivilQuestions.filter(
                                (q) => q.savedCount > 0,
                              ).length,
                              mistakes: currentCivilQuestions.reduce(
                                (sum, q) => sum + q.mistakeCount,
                                0,
                              ),
                            }
                          : topicRecord(state, topic.id);
                        const earlierCivilAnswer = currentCivilQuestions.some(
                          (q) => q.historicalCount > 0,
                        );
                        const open = expanded === topic.id;
                        const learning =
                          chapterLearning?.topics.find(
                            (t) => t.topicId === topic.id,
                          ) ??
                          (open && studySubject === "civil-law"
                            ? projectTopicLearning(state, topic.id)
                            : null);
                        const practiced =
                          learning?.answered ?? evidence.answered;
                        const profileTopic = learningProfile?.topics.find(
                          (t) => t.id === topic.id,
                        );
                        const content = (subjectKnowledge?.content ??
                          practiceKnowledge)[topic.id];
                        const practiceMode = subjectKnowledge
                          ? subjectStudyPracticeMode(studySubject, topic.id)
                          : topicPracticeMode(topic.id);
                        const sources = topicSources(topic.id);
                        return (
                          <section
                            key={topic.id}
                            id={`topic-${topic.id}`}
                            className={s.topic}
                            data-open={open}
                            data-current={
                              !isChapterReview(currentQuestion) &&
                              currentTopic.id === topic.id
                            }
                          >
                            <div className={s.topicHeading}>
                              <button
                                className={s.topicToggle}
                                aria-expanded={open}
                                aria-controls={`knowledge-${topic.id}`}
                                disabled={!ready}
                                onClick={() => toggle(topic.id)}
                              >
                                <span className={s.topicNumber}>
                                  {String(index + 1).padStart(2, "0")}
                                </span>
                                <span className={s.topicName}>
                                  {topic.title}
                                  <small>
                                    {profileTopic
                                      ? learningTopicCaption(profileTopic)
                                      : practiced
                                        ? learning
                                          ? `已练 ${practiced} / ${learning.total} 题`
                                          : `已练 ${practiced} 题`
                                        : earlierCivilAnswer
                                          ? "有旧版作答，原答保留"
                                          : evidence.viewed
                                            ? "已查看要点"
                                            : !isChapterReview(
                                                  currentQuestion,
                                                ) &&
                                                currentTopic.id === topic.id &&
                                                started
                                              ? "上次停在这里"
                                              : "还未开始"}
                                    {!profileTopic &&
                                      (learning
                                        ? learning.objective.wrong > 0
                                          ? ` · 还有 ${learning.objective.wrong} 道选择题未答对`
                                          : ""
                                        : evidence.mistakes > 0
                                          ? ` · 选择错误 ${evidence.mistakes} 次`
                                          : "")}
                                  </small>
                                </span>
                                <span className={s.topicChevron}>
                                  <StudyIcon name="down" />
                                </span>
                              </button>
                              {practiceMode && (
                                <button
                                  className={s.topicPractice}
                                  disabled={storageIssue}
                                  onClick={() => practice(topic.id)}
                                  aria-label={`练习${topic.title}`}
                                >
                                  练习 <StudyIcon name="arrow" />
                                </button>
                              )}
                            </div>
                            <div
                              id={`knowledge-${topic.id}`}
                              className={s.expansion}
                              inert={!open}
                              aria-hidden={!open}
                            >
                              <div>
                                <div
                                  className={`${s.knowledgeBody} ${d.document}`}
                                >
                                  <TopicLearning
                                    summary={learning}
                                    disabled={storageIssue}
                                    onContinue={continueTopicLearning}
                                  />
                                  {profileTopic && (
                                    <p className={s.topicRecordLink}>
                                      <a
                                        href={`/records?subject=${studySubject}&topic=${encodeURIComponent(topic.id)}`}
                                      >
                                        {learningTopicCaption(profileTopic)} ·
                                        看学习记录 →
                                      </a>
                                    </p>
                                  )}
                                  {subjectKnowledge && (
                                    <p className={d.paragraph}>
                                      <strong>本节要会：</strong>
                                      {topic.goal}
                                    </p>
                                  )}
                                  <h3>规则要点</h3>
                                  <p className={d.paragraph}>{content.rule}</p>
                                  {subjectKnowledge ? (
                                    <details
                                      onToggle={(event) => {
                                        if (
                                          event.currentTarget.open &&
                                          !storageIssue
                                        )
                                          navigate((p) =>
                                            viewSubjectStudyKnowledge(
                                              p,
                                              studySubject,
                                              topic.id,
                                              new Date().toISOString(),
                                              true,
                                            ),
                                          );
                                      }}
                                    >
                                      <summary>
                                        看一个例子：{topic.example.title}
                                      </summary>
                                      <p className={d.paragraph}>
                                        {topic.example.facts}
                                      </p>
                                      <p className={d.paragraph}>
                                        {topic.example.analysis}
                                      </p>
                                    </details>
                                  ) : (
                                    <>
                                      <h3>案例：{topic.example.title}</h3>
                                      <p className={d.paragraph}>
                                        {topic.example.facts}
                                      </p>
                                      <p className={d.paragraph}>
                                        {topic.example.analysis}
                                      </p>
                                    </>
                                  )}
                                  <h3>小结与容易混淆之处</h3>
                                  <p className={d.paragraph}>
                                    {content.omission}
                                  </p>
                                  <div className={s.knowledgeActions}>
                                    {practiceMode && (
                                      <button
                                        disabled={storageIssue}
                                        onClick={() => practice(topic.id)}
                                      >
                                        从这里练习 <StudyIcon name="arrow" />
                                      </button>
                                    )}
                                    {!subjectKnowledge && (
                                      <a
                                        href={`/lab/ask?topic=${encodeURIComponent(topic.id)}`}
                                      >
                                        有疑问，去答疑
                                      </a>
                                    )}
                                  </div>
                                  <ReferenceSources
                                    sources={topic.sources.map((id) => ({
                                      id,
                                      ...sources[id],
                                    }))}
                                  />
                                </div>
                              </div>
                            </div>
                          </section>
                        );
                      })}
                    </div>
                  </section>
                </>
              )}
              <p className={s.footnote}>
                查看和作答都会留有记录，可随时从原处继续。
              </p>
            </div>
            <details className={s.reviewEntry}>
              <summary>查看演示记录</summary>
              <a href="/lab/practice/example">虚构示例学习过程 →</a>
              <p>只读演示，不写入你的学习记录。</p>
            </details>
          </div>
          <aside className={s.position} aria-label="在知识体系中的位置">
            <div className={s.positionTitle}>
              <StudyIcon name="study" />
              <h2>在知识体系中</h2>
            </div>
            {subjectKnowledge ||
            (studySubject !== currentSubject && !selectedChapter) ? (
              <ol className={s.path}>
                <li>法考</li>
                <li>{studySubjectInfo.label}</li>
                {civilSection && <li>{civilSection.title}</li>}
                <li aria-current="location">
                  {visibleTopics.find((topic) => topic.id === expanded)
                    ?.title ?? (civilSection ? "本章知识点" : "章节目录")}
                </li>
              </ol>
            ) : (
              <ol className={s.path}>
                <li>法考</li>
                <li>{selectedChapter ? "刑法" : currentSubjectTitle}</li>
                {(selectedChapter ?? currentChapter).section !==
                  (selectedChapter ? "刑法" : currentSubjectTitle) && (
                  <li>{(selectedChapter ?? currentChapter).section}</li>
                )}
                <li aria-current="location">
                  {(selectedChapter ?? currentChapter).title}
                </li>
              </ol>
            )}
            {!subjectKnowledge && (
              <details className={s.outline}>
                <summary>
                  查看刑法章节 <StudyIcon name="down" />
                </summary>
                <ol>
                  {criminalChapters.map((chapter) => (
                    <li
                      key={chapter.id}
                      data-current={
                        chapter.id === (selectedChapter ?? currentChapter).id ||
                        undefined
                      }
                    >
                      {chapter.title}
                      {!chapter.topicIds.length && <span>准备中</span>}
                    </li>
                  ))}
                </ol>
                <p>
                  刑法已开放 {availableChapters.length} 章、
                  {knowledgeTopics.length} 个知识点，内容持续完善。
                </p>
              </details>
            )}
          </aside>
        </div>
      </main>
    </LearningFrame>
  );
}
