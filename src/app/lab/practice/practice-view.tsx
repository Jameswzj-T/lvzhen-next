"use client";
import {
  isRemainingG6Subject,
  remainingG6SubjectIds,
  remainingG6SubjectInfo,
  type RemainingG6Subject,
} from "@/content/remaining-g6-subjects";
import { remainingG6Knowledge } from "@/content/remaining-g6";
import {
  explicitRemainingQuestions,
  enterExplicitRemainingPractice,
  viewExplicitRemainingKnowledge,
  type ExplicitRemainingEntry,
} from "./explicit-remaining-entry";
import { assessmentRunHref } from "@/content/civil-integrated-practice";
import { isHistoricalPracticeQuestion } from "@/content/practice-content-history";
import {
  HistoricalPractice,
  previousTemporalQuestion,
} from "./historical-practice";
import {
  enterExplicitCommercialPractice,
  explicitCommercialQuestions,
  explicitCommercialKnowledge,
  explicitCommercialKnowledgeTopics,
  viewExplicitCommercialKnowledge,
  type ExplicitCommercialEntry,
} from "./explicit-commercial-entry";

import { directDraftRetryAdvice } from "@/domain/direct-learning-advice";
import { projectLearningProfile } from "@/domain/learning-profile";

import {
  enterExplicitAdministrativePractice,
  explicitAdministrativeQuestions,
  explicitAdministrativeKnowledge,
  explicitAdministrativeKnowledgeTopics,
  viewExplicitAdministrativeKnowledge,
  type ExplicitAdministrativeEntry,
} from "./explicit-administrative-entry";

import {
  enterExplicitCriminalProcedurePractice,
  explicitCriminalProcedureQuestions,
  explicitCriminalProcedureKnowledge,
  explicitCriminalProcedureKnowledgeTopics,
  viewExplicitCriminalProcedureKnowledge,
  type ExplicitCriminalProcedureEntry,
} from "./explicit-criminal-procedure-entry";

import { projectPracticeReopening } from "@/domain/practice-reopening";
import { IntegratedProgress } from "../_components/integrated-progress";

import { currentQuestionTeacher } from "@/domain/current-question-teacher";

import {
  civilProcedureReviewChapter,
  civilProcedureReviewSetForQuestion,
  civilProcedureReviewReady,
  civilProcedureReviewQuestion,
  civilProcedureReviewWholePromptMaterial,
} from "@/content/civil-procedure-review";
import { projectCivilProcedureContinuation } from "@/domain/civil-procedure-continuation";

import { useCallback, useEffect, useRef, useState } from "react";
import { StudyGate } from "@/accounts/study-gate";
import type { Learner } from "@/accounts/client";
import {
  knowledgeTopics,
  practiceQueues,
  practiceTopic,
  practiceSubject,
  practiceSubjectInfo,
  practiceGroups,
  isExamPractice,
  currentPracticeId,
  type PracticeMode,
  isChapterReview,
} from "@/content/practice-set";
import {
  editPractice,
  movePractice,
  openPractice,
  practiceResult,
  restartPractice,
  submitPractice,
  topicMistakes,
  viewPracticeKnowledge,
  visitPractice,
  initializePractice,
  resumePracticeSubject,
  practiceAnswerHistory,
} from "@/domain/practice";
import type { FaultProgress } from "@/domain/fault-progress";
import { submittedFeedbackFor } from "@/domain/submitted-feedback";
import {
  directPracticeStep,
  prepareDirectPracticeStep,
} from "@/domain/direct-practice-continuation";
import { createRecordedAnswerReview } from "./submitted-answer-review-client";
import type {
  SubmittedAnswer,
  SubmittedAnswerReviewState,
} from "./submitted-answer-review";
import { retryWrittenAnswer } from "./written-retry";
import {
  beginFeedbackRetry,
  feedbackRetryTask,
  feedbackRetryComparison,
  submitFeedbackRetry,
  pauseFeedbackRetry,
} from "@/domain/feedback-retry";
import { FeedbackRetryPanel } from "./feedback-retry-panel";
import type { BankScoringSummary } from "@/evaluation/scoring-trial-contract";
import type {
  ShortSummary,
  ShortResult,
} from "@/evaluation/short-table/contract";
import {
  recordShortLearningFeedback,
  recordUnitLearningFeedback,
  feedbackForAttempt,
} from "@/domain/learning-observations";
import {
  isRegisteredCivilUnitFeedbackQuestion,
  unitFeedbackBinding,
} from "@/evaluation/unit-feedback-catalog";
import { isTeacherLearningQuestion } from "@/domain/teacher-learning-scope";
import { isCurrentSubmittedFeedbackRetrySource } from "@/domain/submitted-feedback-learning";
import { unitFeedbackDemoAnswers } from "@/evaluation/unit-feedback-demo";
import type { UnitFeedbackResult } from "@/evaluation/unit-feedback-contract";
import {
  UnitAnswerFeedback,
  type UnitFeedbackSourceChange,
} from "./unit-answer-feedback";
import { LearningFeedbackTrace } from "../_components/learning-feedback-trace";
import { LearningNext } from "../_components/learning-next";
import {
  nextLearningPractice,
  prepareLearningNext,
} from "@/domain/learning-next";
import { projectCivilContractContinuation } from "@/domain/civil-contract-continuation";
import { ShortAnswerScoring } from "./short-answer-scoring";
import { practiceFeedbackReading } from "./practice-feedback-reading";
import { AnswerScoring } from "./answer-scoring";
import { AnswerRewrite } from "../_components/answer-rewrite";
import { hasPendingAnswerRewrite } from "@/domain/answer-rewrite";
import { FeedbackBoundaryNote } from "../_components/feedback-boundary-note";
import { AnswerHistory } from "./answer-history";
import { ObjectiveAnswerHistory } from "./objective-answer-history";
import { retryObjectiveAnswer } from "./objective-retry";
import { usePractice } from "./use-practice";
import { enterLearningExamplePractice } from "./example-reference-entry";
import {
  LEARNING_EXAMPLE_SOURCE,
  type LearningExampleSource,
} from "../../../domain/learning-example-source";
import { resumePracticeCursor } from "./resume-practice";
import { beginTopicPractice, beginChapterPractice } from "@/domain/study-space";
import { activePracticeQueue } from "@/domain/practice";
import { exerciseFor, exerciseSources } from "@/content/fault-catalog";
import { practiceChapter } from "@/content/practice-set";
import {
  choiceMode,
  choiceModeLabel,
  correctChoices,
  selectedChoices,
  toggleChoice,
  answerLabel,
  validChoice,
} from "@/domain/objective-answer";
import {
  LearningFrame,
  LearningHeader,
  RecordNotice,
} from "../_components/learning-frame";
import { PracticeLibrary } from "./practice-library";
import { useDirectoryMemory } from "./use-directory-memory";
import {
  CivilProcedureLibrary,
  initialCivilProcedureLibrarySelection,
  type CivilProcedureLibrarySelection,
} from "./civil-procedure-library";
import { KnowledgePanel } from "../_components/knowledge-panel";
import { ChapterLearningProgress } from "../_components/topic-learning";
import { ChapterPracticeNext } from "./chapter-practice-next";
import {
  projectChapterPracticeContinuation,
  prepareChapterPracticeContinuation,
} from "@/domain/chapter-practice-continuation";
import {
  projectChapterLearning,
  projectTopicLearning,
  prepareTopicLearningNext,
} from "@/domain/topic-learning-summary";
import { assessmentPaper } from "@/content/assessment-papers";
import s from "./practice.module.css";
import d from "../_components/reading-document.module.css";
import { ReferenceSources } from "../_components/reference-sources";
import { ObjectiveAnswerAnalysis } from "../_components/objective-answer-analysis";
import { AnswerReference } from "../_components/answer-reference";
import {
  civilContractReviewChapter,
  civilContractReviewReady,
  civilContractReviewQuestion,
  civilContractReviewKey,
  civilContractReviewWholePromptMaterial,
} from "@/content/civil-contract-review";
import {
  enterExplicitCivilPractice,
  explicitCivilQuestions,
  explicitCivilKnowledge,
  explicitCivilKnowledgeTopics,
  viewExplicitCivilKnowledge,
  type ExplicitCivilEntry,
} from "./explicit-civil-entry";
import {
  enterExplicitCivilProcedurePractice,
  explicitCivilProcedureQuestions,
  explicitCivilProcedureKnowledge,
  explicitCivilProcedureKnowledgeTopics,
  viewExplicitCivilProcedureKnowledge,
  type ExplicitCivilProcedureEntry,
} from "./explicit-civil-procedure-entry";

function PracticeSteps({ stage }: { stage: "select" | "answer" | "result" }) {
  const steps = [
    { id: "select", label: "选题" },
    { id: "answer", label: "作答" },
    { id: "result", label: "结果" },
  ] as const;
  return (
    <nav aria-label="练习步骤">
      <ol className={s.practiceSteps}>
        {steps.map((step, index) => (
          <li
            key={step.id}
            aria-current={stage === step.id ? "step" : undefined}
          >
            <span aria-hidden="true">{index + 1}</span>
            {step.label}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Icon({
  name,
}: {
  name: "arrow" | "back" | "book" | "close" | "check";
}) {
  const paths = {
    arrow: "M4 12h15m-6-6 6 6-6 6",
    back: "M20 12H5m6-6-6 6 6 6",
    book: "M12 5v15M12 5C8 2 3 3 3 3v16s5-1 9 1c4-2 9-1 9-1V3s-5-1-9 2",
    close: "m6 6 12 12M18 6 6 18",
    check: "m5 12 4 4L19 6",
  };
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
const now = () => new Date().toISOString();
function exportRecords(state: FaultProgress) {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(state, null, 2)], { type: "application/json" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "律真-刷题记录.json";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function PracticeEntry({
  initialLibrary = false,
  initialQuestion,
  initialCivilEntry,
  initialLearningExample,
  initialCivilProcedureEntry,
  initialCriminalProcedureEntry,
  initialRemainingEntry,
  initialCommercialEntry,
  initialAdministrativeEntry,
  returnRun,
  scoringCards = [],
  shortScoringCards = [],
  reviewedFeedbackAvailable = false,
}: {
  initialLibrary?: boolean;
  initialQuestion?: string;
  initialCivilEntry?: ExplicitCivilEntry | null;
  initialLearningExample?: LearningExampleSource;
  initialCivilProcedureEntry?: ExplicitCivilProcedureEntry | null;
  initialCriminalProcedureEntry?: ExplicitCriminalProcedureEntry | null;
  initialRemainingEntry?: ExplicitRemainingEntry | null;
  initialCommercialEntry?: ExplicitCommercialEntry | null;
  initialAdministrativeEntry?: ExplicitAdministrativeEntry | null;
  returnRun?: string;
  scoringCards?: BankScoringSummary[];
  shortScoringCards?: ShortSummary[];
  reviewedFeedbackAvailable?: boolean;
}) {
  const explicitEntry =
    initialRemainingEntry ??
    initialCommercialEntry ??
    initialAdministrativeEntry ??
    initialCriminalProcedureEntry ??
    initialCivilProcedureEntry ??
    initialCivilEntry;
  const explicitSubjectInfo = practiceSubjectInfo(
    initialRemainingEntry
      ? initialRemainingEntry.subject
      : initialCommercialEntry
        ? "commercial-law"
        : initialAdministrativeEntry
          ? "administrative-law"
          : initialCriminalProcedureEntry
            ? "criminal-procedure"
            : initialCivilProcedureEntry
              ? "civil-procedure"
              : "civil-law",
  );
  return (
    <StudyGate>
      {(user) =>
        explicitEntry?.kind === "invalid" ? (
          <LearningFrame
            section="practice"
            user={user}
            practiceDirectoryHref={explicitSubjectInfo.libraryHref}
            studyHref={explicitSubjectInfo.href.replace(
              "/lab/practice",
              "/lab/study",
            )}
          >
            <main className={`${s.workspace} ${d.document}`}>
              <h1 className={d.heading}>
                这道题不在{explicitSubjectInfo.label}试练范围
              </h1>
              <p className={d.paragraph}>
                尚未打开题目，已有原答和草稿保持原样。
              </p>
              <a
                className={d.nextAction}
                href={explicitSubjectInfo.libraryHref}
              >
                返回{explicitSubjectInfo.label}选题
              </a>
            </main>
          </LearningFrame>
        ) : (
          <PracticeView
            key={user?.id ?? "guest"}
            user={user}
            initialLibrary={initialLibrary}
            initialQuestion={initialQuestion}
            initialCivilEntry={initialCivilEntry}
            initialLearningExample={initialLearningExample}
            initialCivilProcedureEntry={initialCivilProcedureEntry}
            initialCriminalProcedureEntry={initialCriminalProcedureEntry}
            initialRemainingEntry={initialRemainingEntry}
            initialCommercialEntry={initialCommercialEntry}
            initialAdministrativeEntry={initialAdministrativeEntry}
            returnRun={returnRun}
            scoringCards={scoringCards}
            shortScoringCards={shortScoringCards}
            reviewedFeedbackAvailable={reviewedFeedbackAvailable}
          />
        )
      }
    </StudyGate>
  );
}
function PracticeView({
  user,
  initialLibrary,
  initialQuestion,
  initialCivilEntry,
  initialLearningExample,
  initialCivilProcedureEntry,
  initialCriminalProcedureEntry,
  initialRemainingEntry,
  initialCommercialEntry,
  initialAdministrativeEntry,
  returnRun,
  scoringCards,
  shortScoringCards,
  reviewedFeedbackAvailable,
}: {
  user: Learner;
  initialLibrary: boolean;
  initialQuestion?: string;
  initialCivilEntry?: ExplicitCivilEntry | null;
  initialLearningExample?: LearningExampleSource;
  initialCivilProcedureEntry?: ExplicitCivilProcedureEntry | null;
  initialCriminalProcedureEntry?: ExplicitCriminalProcedureEntry | null;
  initialRemainingEntry?: ExplicitRemainingEntry | null;
  initialCommercialEntry?: ExplicitCommercialEntry | null;
  initialAdministrativeEntry?: ExplicitAdministrativeEntry | null;
  returnRun?: string;
  scoringCards: BankScoringSummary[];
  shortScoringCards: ShortSummary[];
  reviewedFeedbackAvailable: boolean;
}) {
  const {
    state,
    ready,
    restorationFailed,
    storageIssue,
    status,
    update,
    navigate,
    retrySync,
    capturePersistence,
  } = usePractice(
    user?.id ?? null,
    !initialLibrary &&
      !initialCivilEntry &&
      !initialCivilProcedureEntry &&
      !initialCriminalProcedureEntry &&
      !initialRemainingEntry &&
      !initialCommercialEntry &&
      !initialAdministrativeEntry,
  );
  const explicitSubject = initialRemainingEntry
    ? initialRemainingEntry.subject
    : initialCommercialEntry
      ? "commercial-law"
      : initialAdministrativeEntry
        ? "administrative-law"
        : initialCriminalProcedureEntry
          ? "criminal-procedure"
          : initialCivilProcedureEntry
            ? "civil-procedure"
            : initialCivilEntry
              ? "civil-law"
              : undefined;
  const selectionSubject =
    explicitSubject ??
    ([
      "civil-law",
      "civil-procedure",
      "criminal-procedure",
      "administrative-law",
      "commercial-law",
      ...remainingG6SubjectIds,
    ].includes(practiceSubject(state.exerciseId) ?? "")
      ? practiceSubject(state.exerciseId)
      : undefined);
  const selectionInfo = practiceSubjectInfo(selectionSubject);
  const selectionReviewChapter =
    selectionSubject === "civil-procedure"
      ? civilProcedureReviewChapter
      : civilContractReviewChapter;
  const selectionReviewReady = isRemainingG6Subject(selectionSubject)
    ? false
    : ["criminal-procedure", "administrative-law", "commercial-law"].includes(
          selectionSubject ?? "",
        )
      ? false
      : selectionSubject === "civil-procedure"
        ? civilProcedureReviewReady
        : civilContractReviewReady;
  const selectionQuestions = isRemainingG6Subject(selectionSubject)
    ? explicitRemainingQuestions(selectionSubject)
    : selectionSubject === "commercial-law"
      ? explicitCommercialQuestions
      : selectionSubject === "administrative-law"
        ? explicitAdministrativeQuestions
        : selectionSubject === "criminal-procedure"
          ? explicitCriminalProcedureQuestions
          : selectionSubject === "civil-procedure"
            ? explicitCivilProcedureQuestions
            : explicitCivilQuestions;
  const practiceDirectoryHref = selectionSubject
    ? selectionInfo.libraryHref
    : undefined;
  const originRun = ready
    ? state.assessments?.runs.find(
        (r) =>
          r.id === returnRun &&
          r.finishedAt &&
          !!assessmentPaper(r.paperId) &&
          (assessmentPaper(r.paperId)?.collection !== "comprehensive-g7" ||
            assessmentPaper(r.paperId)!.questionIds.includes(state.exerciseId)),
      )
    : undefined;
  const practiceHref = (view = false, questionId = state.exerciseId) => {
    const params = new URLSearchParams();
    const subject = explicitSubject ?? practiceSubject(questionId);
    if (subject && subject !== "criminal-law") params.set("subject", subject);
    if (view) params.set("view", "library");
    else if (civilProcedureReviewQuestion(questionId)) {
      params.set("review", civilProcedureReviewSetForQuestion(questionId)!.key);
      params.set("question", questionId);
    } else if (civilContractReviewQuestion(questionId)) {
      params.set("review", civilContractReviewKey);
      params.set("question", questionId);
    }
    if (originRun) params.set("fromRun", originRun.id);
    return `/lab/practice${params.size ? `?${params}` : ""}`;
  };
  const returnLink = originRun ? (
    <a
      className={s.returnToCase}
      href={assessmentRunHref(originRun.id, assessmentPaper(originRun.paperId))}
    >
      ←{" "}
      {assessmentPaper(originRun.paperId)!.kind === "practice"
        ? "返回综合练习"
        : assessmentPaper(originRun.paperId)!.kind === "case"
          ? "返回长案评阅"
          : "返回试卷解析"}{" "}
      · {assessmentPaper(originRun.paperId)!.title}
    </a>
  ) : null;
  const [feedbackSaveIssue, setFeedbackSaveIssue] = useState(false);
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
    original: SubmittedAnswer,
    retry = false,
    received?: UnitFeedbackResult,
  ) {
    const persistence = capturePersistence();
    if (!persistence) return;
    let controller = reviewControllers.current.get(persistence.owner);
    if (!controller) {
      controller = createRecordedAnswerReview(persistence, (review) => {
        if (reviewMounted.current)
          setSubmissionReviews((prior) => ({
            ...prior,
            [review.original.id]: review,
          }));
      });
      reviewControllers.current.set(persistence.owner, controller);
    }
    // Only explicit submit/retry/save-received actions reach this call. No history scan.
    void (received
      ? controller.saveReceived(original, received)
      : retry
        ? controller.retry(original)
        : controller.submit(original));
  }
  const [continuationIssue, setContinuationIssue] = useState<string | null>(
    null,
  );
  const [feedbackRetryIssue, setFeedbackRetryIssue] = useState<string | null>(
    null,
  );
  const [teacherNavigation, setTeacherNavigation] = useState<{
    answerId: string;
    resultId: string;
  } | null>(null);
  const [retryFeedbackAttempt, setRetryFeedbackAttempt] = useState<
    string | null
  >(null);
  const retryIds = useRef(new Map<string, string>());
  const [unavailableRetrySource, setUnavailableRetrySource] =
    useState<UnitFeedbackSourceChange | null>(null);
  const [shortReadingResult, setShortReadingResult] = useState<{
    attemptId: string;
    result: ShortResult;
  } | null>(null);
  const [library, setLibrary] = useState(initialLibrary);
  const directoryMemory = useDirectoryMemory(user?.id ?? null, ready);
  const [knowledgeOpen, setKnowledgeOpen] = useState(false);
  const [knowledgeId, setKnowledgeId] = useState<string | null>(null);
  const [cardOpen, setCardOpen] = useState(false);
  const knowledgeTrigger = useRef<HTMLElement | null>(null);
  const main = useRef<HTMLElement>(null);
  const result = useRef<HTMLElement>(null);
  const { q, draft, answer, correct } = practiceResult(state);
  const civilReviewMaterial = civilProcedureReviewQuestion(q.id)
    ? civilProcedureReviewWholePromptMaterial(q.id)
    : civilContractReviewQuestion(q.id)
      ? civilContractReviewWholePromptMaterial()
      : null;
  useEffect(() => setFeedbackRetryIssue(null), [q.id]);
  const reopening =
    ready && !restorationFailed && selectionSubject
      ? projectPracticeReopening(state, selectionSubject)
      : null;
  const subjectStarted = selectionQuestions.some(
    (question) =>
      !!state.practice?.viewed[question.id] || !!state.drafts[question.id],
  );
  const shortScoringCard = shortScoringCards.find(
    (c) => c.id === q.id && (!answer || c.exerciseRevision === answer.revision),
  );
  const scoringCard = scoringCards.find(
    (c) => c.id === q.id && (!answer || c.exerciseRevision === answer.revision),
  );
  const shortReading =
    !!answer && !!shortScoringCard && q.kind === "subjective";
  const nativeBinding = unitFeedbackBinding(q.id);
  const nativeReading = !!answer && !!nativeBinding && q.kind === "subjective";
  const registeredReading = !!answer && q.kind === "subjective";
  const feedbackReading = shortReading || nativeReading || registeredReading;
  const savedSubmittedFeedback = answer
    ? submittedFeedbackFor(state, answer.id)
    : null;
  const currentSubmissionReview = answer ? submissionReviews[answer.id] : null;
  // Pending/failed work from this exact submitted answer must be visible even
  // when the optional rereading disclosure was closed. Reuse its controller.
  const activeReviewVisible =
    !!answer &&
    !!currentSubmissionReview &&
    currentSubmissionReview.original.id === answer.id &&
    currentSubmissionReview.original.exerciseId === answer.exerciseId &&
    currentSubmissionReview.original.revision === answer.revision &&
    currentSubmissionReview.original.answer === answer.answer &&
    currentSubmissionReview.original.choice === answer.choice &&
    currentSubmissionReview.status !== "saved";
  const inlineRetryFeedback =
    activeReviewVisible || (registeredReading && !nativeReading);
  const RetryFeedbackContainer = inlineRetryFeedback ? "div" : "details";
  const nativeExamples = unitFeedbackDemoAnswers.filter(
    (row) =>
      row.questionId === q.id &&
      row.questionRevision === nativeBinding?.questionRevision,
  );
  const nativeObservation = answer
    ? feedbackForAttempt(state, answer.id)
    : null;
  const retryView = answer
    ? feedbackRetryComparison(state, answer.id)
    : feedbackRetryTask(state, q.id);
  const retryWriting = !answer && !!draft.feedbackRetry;
  const draftRetryAdvice =
    !answer && !retryWriting && !feedbackSaveIssue
      ? directDraftRetryAdvice(state)
      : null;
  const teacherRetryReceipt =
    answer &&
    retryView?.current &&
    isTeacherLearningQuestion(q.id) &&
    savedSubmittedFeedback?.sourceTeacher
      ? savedSubmittedFeedback
      : null;
  // New teacher feedback is the default reading after a complete reanswer.
  // This effect runs once per immutable receipt, not after a manual disclosure
  // toggle, so the learner can still close and reopen it.
  useEffect(() => {
    if (teacherRetryReceipt && answer) setRetryFeedbackAttempt(answer.id);
  }, [teacherRetryReceipt?.id, answer?.id]);
  const retryBlocked =
    retryWriting && (!retryView || !!retryView.blockedReason);
  const retrySource =
    answer &&
    nativeObservation &&
    !feedbackSaveIssue &&
    q.kind === "subjective" &&
    (practiceSubject(q.id) === "criminal-law" ||
      isRegisteredCivilUnitFeedbackQuestion(q.id) ||
      isCurrentSubmittedFeedbackRetrySource(state, nativeObservation)) &&
    (nativeObservation.state === "reviewed" ||
      nativeObservation.unitResult?.view.status === "needs_clarification")
      ? nativeObservation
      : null;
  const teacherNeedsReview = (() => {
    if (
      !answer ||
      !savedSubmittedFeedback?.sourceTeacher ||
      !isTeacherLearningQuestion(q.id)
    )
      return false;
    try {
      return (
        currentQuestionTeacher(savedSubmittedFeedback, answer).judgment.kind ===
        "needs_review"
      );
    } catch {
      return true;
    }
  })();
  const retrySourceUnavailable =
    teacherNeedsReview ||
    (!!retrySource &&
      unavailableRetrySource?.questionId === q.id &&
      unavailableRetrySource.questionRevision === answer?.revision &&
      unavailableRetrySource.attemptId === answer?.id &&
      unavailableRetrySource.feedbackResultId === retrySource.resultId);
  function rememberUnitSourceChange(notice: UnitFeedbackSourceChange) {
    if (!ready || storageIssue || restorationFailed) return;
    // The notice is bound by the reading component; a late old-source callback
    // cannot pause a different question, feedback result or retry task.
    if (
      notice.questionId !== q.id ||
      notice.questionRevision !== answer?.revision ||
      notice.attemptId !== answer?.id ||
      notice.feedbackResultId !== nativeObservation?.resultId
    )
      return;
    setUnavailableRetrySource(notice);
    setFeedbackRetryIssue(
      "这份反馈依据已变更或撤回，暂不能按它重答；原答和草稿保留。",
    );
    update((p) => {
      const task = feedbackRetryTask(p, notice.questionId);
      if (
        p.exerciseId !== notice.questionId ||
        !task ||
        task.task.revision !== notice.questionRevision ||
        task.original.id !== notice.attemptId ||
        task.feedback.resultId !== notice.feedbackResultId
      )
        return p;
      return pauseFeedbackRetry(
        p,
        {
          taskId: task.task.taskId,
          originalAttemptId: task.original.id,
          feedbackId: task.feedback.id,
          reason: notice.reason,
        },
        now(),
      );
    });
  }
  function rememberUnitFeedback(saved: UnitFeedbackResult) {
    if (!answer || !ready || restorationFailed) return;
    if (
      state.learningObservations?.some(
        (row) =>
          row.attemptId === answer.id &&
          row.resultId === saved.id &&
          JSON.stringify(row.unitResult?.pointReviews ?? []) ===
            JSON.stringify(saved.pointReviews ?? []),
      )
    )
      return;
    if (
      storageIssue ||
      recordUnitLearningFeedback(state, answer.id, saved, now()) === state
    ) {
      setFeedbackSaveIssue(true);
      return;
    }
    let retained = false;
    const persisted = update((p) => {
      const next = recordUnitLearningFeedback(p, answer.id, saved, now());
      retained =
        next !== p ||
        !!p.learningObservations?.some(
          (row) =>
            row.attemptId === answer.id &&
            row.resultId === saved.id &&
            JSON.stringify(row.unitResult?.pointReviews ?? []) ===
              JSON.stringify(saved.pointReviews ?? []),
        );
      return next;
    });
    setFeedbackSaveIssue(!persisted || !retained);
  }
  const readingResult =
    shortReadingResult && shortReadingResult.attemptId === answer?.id
      ? shortReadingResult.result
      : null;
  const readingView = practiceFeedbackReading(readingResult);
  function rememberFeedback(saved: ShortResult) {
    if (!answer || saved.state === "running" || !ready || restorationFailed)
      return;
    setShortReadingResult((prior) =>
      prior?.attemptId === answer.id &&
      prior.result.id === saved.id &&
      prior.result.state === saved.state
        ? prior
        : { attemptId: answer.id, result: saved },
    );
    if (
      state.learningObservations?.some(
        (row) => row.attemptId === answer.id && row.resultId === saved.id,
      )
    )
      return;
    if (
      storageIssue ||
      recordShortLearningFeedback(state, answer.id, saved, now()) === state
    ) {
      setFeedbackSaveIssue(true);
      return;
    }
    let retained = false;
    const persisted = update((p) => {
      const next = recordShortLearningFeedback(p, answer.id, saved, now());
      retained =
        next !== p ||
        !!p.learningObservations?.some(
          (row) => row.attemptId === answer.id && row.resultId === saved.id,
        );
      return next;
    });
    setFeedbackSaveIssue(!persisted || !retained);
  }
  const openedInitial = useRef(
    (
      initialRemainingEntry ??
      initialCommercialEntry ??
      initialCriminalProcedureEntry ??
      initialCivilProcedureEntry ??
      initialCivilEntry
    )?.kind === "library",
  );
  const explicitEntry =
    !!initialRemainingEntry ||
    !!initialCommercialEntry ||
    !!initialAdministrativeEntry ||
    !!initialQuestion ||
    !!initialCivilEntry ||
    !!initialCivilProcedureEntry ||
    !!initialCriminalProcedureEntry;
  useEffect(() => {
    if (
      !ready ||
      restorationFailed ||
      storageIssue ||
      (!initialQuestion &&
        !initialCivilEntry &&
        !initialCivilProcedureEntry &&
        !initialCriminalProcedureEntry &&
        !initialRemainingEntry &&
        !initialCommercialEntry &&
        !initialAdministrativeEntry) ||
      openedInitial.current
    )
      return;
    let enteredQuestion = state.exerciseId;
    if (
      !update((p) => {
        let next: FaultProgress;
        if (initialRemainingEntry)
          next = enterExplicitRemainingPractice(
            p,
            initialRemainingEntry.subject,
            initialRemainingEntry,
            now(),
          );
        else if (initialCommercialEntry)
          next = enterExplicitCommercialPractice(
            p,
            initialCommercialEntry,
            now(),
          );
        else if (initialAdministrativeEntry)
          next = enterExplicitAdministrativePractice(
            p,
            initialAdministrativeEntry,
            now(),
          );
        else if (initialCriminalProcedureEntry)
          next = enterExplicitCriminalProcedurePractice(
            p,
            initialCriminalProcedureEntry,
            now(),
          );
        else if (initialCivilProcedureEntry)
          next = enterExplicitCivilProcedurePractice(
            p,
            initialCivilProcedureEntry,
            now(),
          );
        else if (initialCivilEntry)
          next = enterExplicitCivilPractice(p, initialCivilEntry, now());
        else if (!initialQuestion) next = p;
        else {
          const initialized = initializePractice(p);
          const initialMode = exerciseFor(initialQuestion)!.kind;
          next = visitPractice(
            {
              ...initialized,
              practice: {
                ...initialized.practice!,
                mode: initialMode,
                ended: { ...initialized.practice!.ended, [initialMode]: false },
              },
            },
            initialQuestion,
            now(),
          );
        }
        enteredQuestion = next.exerciseId;
        return enterLearningExamplePractice(next, initialLearningExample);
      })
    )
      return;
    openedInitial.current = true;
    window.history.replaceState({}, "", practiceHref(false, enteredQuestion));
    // Entry navigation happens once; later question movement follows the saved queue.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    ready,
    restorationFailed,
    storageIssue,
    initialQuestion,
    initialCivilEntry,
    initialLearningExample,
    initialCivilProcedureEntry,
    initialCriminalProcedureEntry,
    initialRemainingEntry,
    initialCommercialEntry,
    initialAdministrativeEntry,
  ]);
  const mode = state.practice?.mode ?? "objective";
  const queue = activePracticeQueue(state, mode);
  const chapter = practiceChapter(q.id);
  const review = isChapterReview(q.id);
  const resumeLocalRewrite = !!(
    review &&
    state.practice?.scope === "review" &&
    !state.practice.ended.subjective &&
    (civilContractReviewQuestion(q.id) || civilProcedureReviewQuestion(q.id)) &&
    answer &&
    hasPendingAnswerRewrite(state, {
      questionId: q.id,
      attemptId: answer.id,
    })
  );
  // Simplify new short-answer reading without orphaning an existing local
  // rewrite or removing the integrated exercises' established rewrite flow.
  const keepLocalRewrite = !!(
    civilReviewMaterial ||
    (answer &&
      (hasPendingAnswerRewrite(state, {
        questionId: q.id,
        attemptId: answer.id,
      }) ||
        state.corrections.some(
          (c) => c.attemptId === answer.id && c.answer.trim(),
        )))
  );
  const localRewriteDisclosure = useCallback(
    (node: HTMLDetailsElement | null) => {
      // Explicit entry can render its restoration placeholder before this node
      // mounts. Open the bound draft on mount; clearing it must not close the
      // saved comparison, and unrelated renders must not override manual folding.
      if (resumeLocalRewrite && node) node.open = true;
    },
    [resumeLocalRewrite, q.id, answer?.id],
  );
  const expected = correctChoices(q);
  const selected = selectedChoices(draft.choice);
  const currentId = currentPracticeId(q.id);
  const index = Math.max(0, queue.indexOf(currentId));
  const group = practiceGroups.find(
    (g) => g.topicId === practiceTopic(q.id).id,
  );
  const transferId =
    nativeReading ||
    (shortReading &&
      readingView.complete &&
      readingResult?.total === readingResult?.card.maximum)
      ? (group?.ids.find(
          (id) =>
            practiceQueues.objective.includes(id) &&
            !state.attempts.some((attempt) => attempt.exerciseId === id),
        ) ?? group?.ids.find((id) => practiceQueues.objective.includes(id)))
      : undefined;
  const transferQuestion = transferId ? exerciseFor(transferId) : undefined;
  const directStep = directPracticeStep(state);
  function nextReadingQuestion() {
    if (directStep) {
      let enteredQuestion = state.exerciseId;
      let moved = false;
      const persisted = navigate((p) => {
        const next = prepareDirectPracticeStep(p, directStep.id, now());
        if (!next) return p;
        moved = true;
        enteredQuestion = next.exerciseId;
        return next;
      });
      if (!persisted || !moved) return;
      setCardOpen(false);
      window.history.replaceState({}, "", practiceHref(false, enteredQuestion));
      focusQuestion();
      return;
    }
    if (!transferId) {
      next(1);
      return;
    }
    if (
      !navigate((p) =>
        visitPractice(
          beginTopicPractice(
            p,
            practiceTopic(transferId).id,
            "objective",
            now(),
          ),
          transferId,
          now(),
        ),
      )
    )
      return;
    setCardOpen(false);
    focusQuestion();
  }
  const groupIds = review
    ? queue
    : (group?.ids.filter((id) => queue.includes(id)) ?? [q.id]);
  const groupIndex = Math.max(0, groupIds.indexOf(currentId));
  const nextTopic =
    index < queue.length - 1 &&
    practiceTopic(queue[index + 1]).id !== practiceTopic(q.id).id;
  const ended = state.practice?.ended[mode] ?? false;
  const chapterContinuation = projectChapterPracticeContinuation(state);
  const answered = queue.filter((id) => !!state.drafts[id]?.submittedId).length;
  const contractContinuation =
    projectCivilContractContinuation(state) ??
    projectCivilProcedureContinuation(state);
  const mistakes = topicMistakes(state, practiceTopic(q.id).id);

  function focusQuestion() {
    requestAnimationFrame(() => {
      main.current?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  }

  function continueLearning(recommendationId: string) {
    if (!ready || restorationFailed || storageIssue) return;
    let href: string | null = null;
    const saved = navigate((p) => {
      const prepared = prepareLearningNext(p, recommendationId, now());
      if (!prepared) return p;
      href = prepared.href;
      return prepared.state;
    });
    if (saved && href) window.location.assign(href);
    else {
      setContinuationIssue(
        saved
          ? "这项记录暂时无法接续，原答和草稿仍保留。"
          : "本次变更尚未保存，原答和草稿仍保留；请先检查记录状态。",
      );
    }
  }
  function changeMode(next: PracticeMode) {
    if (!navigate((p) => openPractice(p, now(), next))) return;
    setCardOpen(false);
    focusQuestion();
  }
  function openExplicit(
    entry:
      | ExplicitCivilEntry
      | ExplicitCivilProcedureEntry
      | ExplicitCriminalProcedureEntry
      | ExplicitAdministrativeEntry
      | ExplicitCommercialEntry,
    mode?: PracticeMode,
  ) {
    if (entry.kind === "review" && !selectionReviewReady) return;
    let enteredQuestion = state.exerciseId;
    if (
      !navigate((p) => {
        const next = isRemainingG6Subject(selectionSubject)
          ? enterExplicitRemainingPractice(
              p,
              selectionSubject,
              entry,
              now(),
              mode,
            )
          : selectionSubject === "commercial-law"
            ? enterExplicitCommercialPractice(p, entry, now(), mode)
            : selectionSubject === "administrative-law"
              ? enterExplicitAdministrativePractice(p, entry, now(), mode)
              : selectionSubject === "criminal-procedure"
                ? enterExplicitCriminalProcedurePractice(p, entry, now(), mode)
                : selectionSubject === "civil-procedure"
                  ? enterExplicitCivilProcedurePractice(p, entry, now(), mode)
                  : enterExplicitCivilPractice(p, entry, now(), mode);
        enteredQuestion = next.exerciseId;
        return next;
      })
    )
      return;
    setLibrary(false);
    setCardOpen(false);
    window.history.replaceState({}, "", practiceHref(false, enteredQuestion));
    focusQuestion();
  }
  function next(direction: -1 | 1) {
    let enteredQuestion = state.exerciseId;
    const saved = navigate((p) => {
      const next = movePractice(p, direction, now());
      enteredQuestion = next.exerciseId;
      return next;
    });
    if (!saved) return;
    if (
      saved &&
      (isRemainingG6Subject(practiceSubject(enteredQuestion)) ||
        civilProcedureReviewQuestion(enteredQuestion) ||
        civilContractReviewQuestion(enteredQuestion))
    )
      window.history.replaceState({}, "", practiceHref(false, enteredQuestion));
    setCardOpen(false);
    focusQuestion();
  }
  function continueTopicLearning(topicId: string, questionId: string) {
    if (storageIssue) return;
    let targetReady = false;
    const saved = navigate((p) => {
      const prepared = prepareTopicLearningNext(p, topicId, questionId, now());
      targetReady = !!prepared;
      return prepared ?? p;
    });
    if (!saved || !targetReady) {
      setContinuationIssue("暂时没能接上这道题，草稿和原答还在。请重试。");
      return;
    }
    setContinuationIssue(null);
    // The saved cursor now owns continuation. Keeping an entry question in the
    // address would replay it on reload after the learner has moved forward.
    window.history.replaceState({}, "", practiceHref(false, questionId));
    setCardOpen(false);
    focusQuestion();
  }
  function continueChapterPractice(questionId: string) {
    if (!ready || restorationFailed || storageIssue) return;
    let targetReady = false;
    const saved = navigate((p) => {
      const prepared = prepareChapterPracticeContinuation(p, questionId, now());
      targetReady = !!prepared;
      return prepared ?? p;
    });
    if (!saved || !targetReady) {
      setContinuationIssue("暂时没能接上下一章，草稿和原答还在。请重试。");
      return;
    }
    setContinuationIssue(null);
    window.history.replaceState({}, "", practiceHref(false, questionId));
    setCardOpen(false);
    focusQuestion();
  }
  function selectQuestion(id: string) {
    const saved = navigate((p) =>
      visitPractice(
        {
          ...p,
          practice: {
            ...p.practice!,
            ended: { ...p.practice!.ended, [mode]: false },
          },
        },
        id,
        now(),
      ),
    );
    if (!saved) return;
    if (
      saved &&
      (civilProcedureReviewQuestion(id) || civilContractReviewQuestion(id))
    )
      window.history.replaceState({}, "", practiceHref(false, id));
    setCardOpen(false);
    focusQuestion();
  }
  function showKnowledge(id: string | null) {
    if (
      !navigate(
        !id
          ? undefined
          : (p) =>
              isRemainingG6Subject(practiceSubject(p.exerciseId))
                ? viewExplicitRemainingKnowledge(p, id, now())
                : practiceSubject(p.exerciseId) === "commercial-law"
                  ? viewExplicitCommercialKnowledge(p, id, now())
                  : practiceSubject(p.exerciseId) === "administrative-law"
                    ? viewExplicitAdministrativeKnowledge(p, id, now())
                    : practiceSubject(p.exerciseId) === "criminal-procedure"
                      ? viewExplicitCriminalProcedureKnowledge(p, id, now())
                      : practiceSubject(p.exerciseId) === "civil-law"
                        ? viewExplicitCivilKnowledge(p, id, now())
                        : practiceSubject(p.exerciseId) === "civil-procedure"
                          ? viewExplicitCivilProcedureKnowledge(p, id, now())
                          : viewPracticeKnowledge(p, id, now()),
      )
    )
      return;
    if (!knowledgeOpen)
      knowledgeTrigger.current = document.activeElement as HTMLElement;
    setKnowledgeId(id);
    setKnowledgeOpen(true);
  }
  function closeKnowledge() {
    if (!navigate()) return;
    setKnowledgeOpen(false);
    requestAnimationFrame(() =>
      knowledgeTrigger.current?.focus({ preventScroll: true }),
    );
  }
  function submit() {
    if (!ready || storageIssue || retryBlocked) return;
    const taskId = draft.feedbackRetry?.taskId;
    const previousId = state.attempts.findLast(
      (a) => a.exerciseId === q.id,
    )?.id;
    let committed = false;
    let original: SubmittedAnswer | null = null;
    const persisted = update((p) => {
      // A delayed click belongs to the displayed question and rewrite round.
      if (
        p.exerciseId !== q.id ||
        p.attempts.findLast((a) => a.exerciseId === q.id)?.id !== previousId ||
        p.drafts[q.id]?.feedbackRetry?.taskId !== taskId
      )
        return p;
      const next = taskId
        ? submitFeedbackRetry(p, taskId, crypto.randomUUID(), now())
        : submitPractice(p, crypto.randomUUID(), now());
      committed = next.attempts.length > p.attempts.length;
      if (committed) original = next.attempts.at(-1)!;
      return next;
    });
    if (!persisted || !committed) {
      if (taskId)
        setFeedbackRetryIssue("重答尚未保存，草稿仍保留，请先检查记录状态。");
      return;
    }
    setFeedbackRetryIssue(null);
    if (original) reviewSavedAnswer(original);
    requestAnimationFrame(() => result.current?.focus());
  }
  function beginRetry() {
    if (!answer || !retrySource || !ready || storageIssue) return;
    const key = `${answer.id}:${retrySource.id}`;
    let taskId = retryIds.current.get(key);
    if (!taskId) {
      taskId = crypto.randomUUID();
      retryIds.current.set(key, taskId);
    }
    let began = false;
    const persisted = update((p) => {
      const next = beginFeedbackRetry(
        p,
        {
          taskId,
          originalAttemptId: answer.id,
          feedbackId: retrySource.id,
          sourceAvailable: !retrySourceUnavailable,
        },
        now(),
      );
      const opened = feedbackRetryTask(next, q.id);
      began = !!opened && !opened.current && !opened.blockedReason;
      return next;
    });
    if (!persisted || !began) {
      setFeedbackRetryIssue("暂时不能按这份反馈重答，原答和已有草稿仍保留。");
      return;
    }
    setFeedbackRetryIssue(null);
    requestAnimationFrame(() =>
      document.getElementById("practice-writing")?.focus(),
    );
  }
  const saveLabel = !ready
    ? "正在恢复…"
    : storageIssue
      ? "尚未保存"
      : !user
        ? "本机已保存"
        : {
            loading: "正在读取…",
            saved: "账号已保存",
            pending: "正在保存…",
            saving: "正在保存…",
            unavailable: "本机已保存",
            conflict: "记录待处理",
            "too-large": "记录需导出备份",
            "account-changed": "请重新登录",
          }[status];

  // The fresh state is only an internal placeholder. Do not expose its topic,
  // counts or answer controls while a checkpoint or explicit entry is unresolved.
  const entryBlocked = explicitEntry && !openedInitial.current && storageIssue;
  const recoveryFailed = restorationFailed || entryBlocked;
  if (!ready || restorationFailed || (explicitEntry && !openedInitial.current))
    return (
      <LearningFrame
        section="practice"
        user={user}
        practiceDirectoryHref={practiceDirectoryHref}
        studyHref={`/lab/study?subject=${selectionSubject ?? practiceSubject(state.exerciseId) ?? "criminal-law"}`}
        status={
          entryBlocked
            ? saveLabel
            : restorationFailed
              ? "记录未恢复"
              : "正在恢复…"
        }
      >
        {entryBlocked && (
          <RecordNotice
            issue={storageIssue}
            status={status}
            state={state}
            retry={retrySync}
          />
        )}
        <main
          id="learning-main"
          className={s.workspace}
          aria-busy={!recoveryFailed}
        >
          <h1>{recoveryFailed ? "暂时无法恢复练习" : "正在恢复练习"}</h1>
          {!entryBlocked && (
            <p
              role={restorationFailed ? "alert" : "status"}
              className={s.loading}
            >
              {restorationFailed
                ? "未能读取已有记录，尚未打开题目。原记录保持原样，请重新读取。"
                : "正在读取已保存的做题位置与原答…"}
            </p>
          )}
          {recoveryFailed && (
            <button
              className={s.secondary}
              onClick={() => window.location.reload()}
            >
              重新读取
            </button>
          )}
        </main>
      </LearningFrame>
    );

  if (library)
    return (
      <LearningFrame
        section="practice"
        user={user}
        status={saveLabel}
        practiceDirectoryHref={practiceDirectoryHref}
        studyHref={`/lab/study?subject=${selectionSubject ?? practiceSubject(state.exerciseId) ?? "criminal-law"}`}
      >
        <RecordNotice
          issue={storageIssue}
          status={status}
          state={state}
          retry={retrySync}
        />
        {returnLink}
        <div className={s.flowLibrary} data-practice-step="select">
          <PracticeSteps stage="select" />
          <nav className={s.endActions} aria-label="切换练习科目">
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
              <button
                key={subject}
                className={d.nextAction}
                disabled={storageIssue}
                aria-current={
                  (selectionSubject ?? "criminal-law") === subject
                    ? "page"
                    : undefined
                }
                onClick={() => {
                  if (
                    !navigate((p) => resumePracticeSubject(p, subject, now()))
                  )
                    return;
                  window.location.assign(
                    practiceSubjectInfo(subject).libraryHref,
                  );
                }}
              >
                {practiceSubjectInfo(subject).label}
              </button>
            ))}
          </nav>
        </div>
        {selectionSubject ? (
          <main
            id="learning-main"
            className={`${s.workspace} ${d.document}`}
            data-commercial-selection={
              selectionSubject === "commercial-law" || undefined
            }
            data-administrative-selection={
              selectionSubject === "administrative-law" || undefined
            }
            data-criminal-procedure-selection={
              selectionSubject === "criminal-procedure" || undefined
            }
            data-civil-selection={selectionSubject === "civil-law" || undefined}
            data-civil-procedure-selection={
              selectionSubject === "civil-procedure" || undefined
            }
          >
            <p>
              <a
                className={d.nextAction}
                href={`/lab/assessment?subject=all-subjects&focus=${selectionSubject}`}
              >
                阶段训练与缩短模考 →
              </a>
            </p>
            <h1 className={d.heading}>
              {selectionInfo.label} ·{" "}
              {isRemainingG6Subject(selectionSubject)
                ? `${selectionInfo.label}分章练习`
                : selectionSubject === "commercial-law"
                  ? "商法与经济法分章练习"
                  : selectionSubject === "administrative-law"
                    ? "行政行为基础"
                    : selectionSubject === "criminal-procedure"
                      ? "刑诉分章练习"
                      : selectionSubject === "civil-law" ||
                          selectionSubject === "civil-procedure"
                        ? "选题与综合练习"
                        : "试练"}
            </h1>
            {isRemainingG6Subject(selectionSubject) && (
              <p className={d.paragraph}>
                {remainingG6SubjectInfo[selectionSubject].description}
              </p>
            )}
            {selectionSubject === "commercial-law" && (
              <p className={d.paragraph}>
                按12个板块练习公司、合伙、破产、票据、保险证券及经济法相关知识。选一章连续做题，也可以独立写答案。
              </p>
            )}
            {selectionSubject === "administrative-law" && (
              <p className={d.paragraph}>
                按8个板块练习行政主体、许可、处罚、强制与公开、复议、行政诉讼、赔偿和行政协议。可选章节连续做选择题，也可独立写答案；原答和讲解分别保留。
              </p>
            )}
            {selectionSubject === "criminal-procedure" && (
              <p className={d.paragraph}>
                从基本制度、证据到侦查、起诉、审判和执行，按章节连续练习。选择题和自己写答案分别练习，原答与讲解会保留。
              </p>
            )}
            <p className={d.paragraph}>
              先独立作答，原答和草稿可保存在本机。保存后可查看本题评阅状态，并对照参考。
            </p>
            {reopening && (
              <div data-practice-reopening={reopening.questionId}>
                <p className={d.paragraph}>
                  上次：{reopening.questionTitle}。{reopening.summary}
                </p>
                <p className={d.paragraph}>
                  这次建议：{reopening.recommendation.title}。
                  {reopening.recommendation.reason}
                </p>
              </div>
            )}
            <div className={s.endActions}>
              <button
                className={s.primary}
                disabled={storageIssue}
                onClick={() => {
                  if (!reopening) {
                    openExplicit({ kind: "resume" });
                    return;
                  }
                  const questionId = reopening.recommendation.questionId;
                  if (questionId) {
                    openExplicit({ kind: "question", questionId });
                    return;
                  }
                  const list = document.getElementById(
                    "practice-question-list",
                  );
                  list?.scrollIntoView({ block: "start" });
                  list?.focus({ preventScroll: true });
                }}
              >
                {reopening?.recommendation.label ??
                  `${subjectStarted ? "继续上次" : "开始"}${selectionInfo.label}练习`}
              </button>
              {reopening &&
                reopening.recommendation.questionId !==
                  reopening.questionId && (
                  <button
                    className={s.secondary}
                    disabled={storageIssue}
                    onClick={() =>
                      openExplicit({
                        kind: "question",
                        questionId: reopening.questionId,
                      })
                    }
                  >
                    回看上次这题
                  </button>
                )}
              {selectionSubject === "civil-procedure" && (
                <button
                  className={s.secondary}
                  disabled={storageIssue}
                  onClick={() => {
                    if (
                      !navigate((p) =>
                        resumePracticeSubject(p, "civil-law", now()),
                      )
                    )
                      return;
                    window.location.assign(
                      practiceSubjectInfo("civil-law").libraryHref,
                    );
                  }}
                >
                  返回民法选题
                </button>
              )}
              <button
                className={s.secondary}
                disabled={storageIssue}
                onClick={() => {
                  if (
                    !navigate((p) =>
                      resumePracticeSubject(p, "criminal-law", now()),
                    )
                  )
                    return;
                  window.location.assign("/lab/practice?view=library");
                }}
              >
                返回刑法选题
              </button>
            </div>
            {selectionSubject === "civil-law" && (
              <section aria-label="按范围综合练习">
                <h2 className={d.subheading}>民法综合练习</h2>
                <p className={d.paragraph}>
                  按范围连续做一组题，选择练习与完整书面分析分别进行。提交后看讲解，需要时回看知识点。
                </p>
                <a
                  className={d.nextAction}
                  href="/lab/assessment?subject=civil-law"
                >
                  打开民法综合练习 →
                </a>
              </section>
            )}
            {selectionSubject === "civil-law" && (
              <section aria-label={selectionReviewChapter.title}>
                <h2 className={d.subheading}>{selectionReviewChapter.title}</h2>
                <p className={d.paragraph}>
                  {selectionReviewReady
                    ? "在一个完整案情中独立完成各小问，保存后再看参考与关联知识。"
                    : "综合题正在核查，尚未开放；已有原答和草稿保持原样。"}
                </p>
                <button
                  className={d.nextAction}
                  disabled={storageIssue || !selectionReviewReady}
                  onClick={() => openExplicit({ kind: "review" })}
                >
                  开始综合练习
                </button>
              </section>
            )}
            {selectionSubject === "civil-law" ||
            selectionSubject === "civil-procedure" ||
            selectionSubject === "criminal-procedure" ||
            selectionSubject === "administrative-law" ||
            selectionSubject === "commercial-law" ||
            isRemainingG6Subject(selectionSubject) ? (
              <CivilProcedureLibrary
                subject={selectionSubject}
                state={state}
                disabled={storageIssue}
                onOpen={openExplicit}
                selection={
                  directoryMemory.views[selectionSubject] ??
                  initialCivilProcedureLibrarySelection(state, selectionSubject)
                }
                onSelectionChange={(selection) =>
                  directoryMemory.select(selectionSubject, selection)
                }
              />
            ) : (
              <section
                id="practice-question-list"
                tabIndex={-1}
                aria-label={`${selectionInfo.label}选题`}
              >
                <h2 className={d.subheading}>选择一题开始</h2>
                <ol className={d.points}>
                  {selectionQuestions.map((question) => (
                    <li key={question.id}>
                      <p>
                        {question.title} ·{" "}
                        {question.kind === "objective" ? "客观题" : "案例简答"}
                      </p>
                      <button
                        className={d.nextAction}
                        disabled={storageIssue}
                        onClick={() =>
                          openExplicit({
                            kind: "question",
                            questionId: question.id,
                          })
                        }
                      >
                        练习这题
                      </button>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </main>
        ) : (
          <PracticeLibrary
            state={state}
            ready={ready}
            scoringCards={scoringCards}
            reviewedFeedbackAvailable={reviewedFeedbackAvailable}
            selection={directoryMemory.views["criminal-law"] ?? null}
            onSelectionChange={(selection) =>
              directoryMemory.select("criminal-law", selection)
            }
            onOpenQuestion={(id) => {
              const question = exerciseFor(id);
              if (!question || practiceSubject(id) !== "criminal-law") return;
              if (
                !navigate((p) =>
                  visitPractice(
                    beginChapterPractice(
                      p,
                      practiceChapter(id).id,
                      question.kind,
                      now(),
                      isChapterReview(id) ? "review" : "topic",
                    ),
                    id,
                    now(),
                  ),
                )
              )
                return;
              setLibrary(false);
              window.history.replaceState({}, "", practiceHref());
              focusQuestion();
            }}
            onResume={(mode) => {
              if (!navigate((p) => resumePracticeCursor(p, mode, now())))
                return;
              setLibrary(false);
              window.history.replaceState({}, "", practiceHref());
              focusQuestion();
            }}
            onStart={(topicId, mode) => {
              if (!navigate((p) => beginTopicPractice(p, topicId, mode, now())))
                return;
              setLibrary(false);
              window.history.replaceState({}, "", practiceHref());
              focusQuestion();
            }}
            onStartChapter={(chapterId, mode, scope) => {
              if (
                !navigate((p) =>
                  beginChapterPractice(p, chapterId, mode, now(), scope),
                )
              )
                return;
              setLibrary(false);
              window.history.replaceState({}, "", practiceHref());
              focusQuestion();
            }}
          />
        )}
      </LearningFrame>
    );
  const readingRewriteAction = answer ? (
    <button
      className={s.textButton}
      disabled={storageIssue}
      onClick={() => {
        if (!update((p) => retryWrittenAnswer(p, answer))) return;
        requestAnimationFrame(() =>
          document.getElementById("practice-writing")?.focus(),
        );
      }}
    >
      {registeredReading && !nativeReading
        ? "再答一次"
        : "重写这一题（保留原答）"}
    </button>
  ) : null;
  const feedbackRetryAction = retrySource ? (
    <button
      className={s.secondary}
      disabled={storageIssue || retrySourceUnavailable}
      onClick={beginRetry}
    >
      {registeredReading && !nativeReading ? "再答一次" : "按这次反馈重答"}
    </button>
  ) : null;
  const learningRecommendation =
    nativeReading &&
    !feedbackSaveIssue &&
    !teacherNeedsReview &&
    savedSubmittedFeedback?.sourceTeacher?.overall.kind === "correct"
      ? nextLearningPractice(state)
      : null;
  // Suppress duplicate navigation only after the bound child reports its teacher reader visible.
  // Loading/error/closed reanswer readers retain the existing outer navigation.
  const inlineTeacherNavigation =
    !!answer &&
    teacherNavigation?.answerId === answer.id &&
    teacherNavigation?.resultId ===
      (savedSubmittedFeedback ?? nativeObservation?.unitResult)?.id;
  const nextTeacherQuestionTitle =
    learningRecommendation?.action === "practice" &&
    learningRecommendation.questionId !== q.id
      ? learningRecommendation.title
      : undefined;
  const savedLearningChoice =
    !inlineTeacherNavigation && learningRecommendation?.evidence ? (
      <LearningNext
        recommendation={learningRecommendation}
        disabled={storageIssue}
        onContinue={continueLearning}
      />
    ) : null;
  const QuestionContext = answer && !feedbackReading ? "details" : "div";
  return (
    <div className={s.shell}>
      <a className={s.skipLink} href="#practice-main">
        跳到题目
      </a>
      <LearningHeader
        section="practice"
        user={user}
        status={saveLabel}
        session
        studyHref={`/lab/study?subject=${practiceSubject(q.id) ?? "criminal-law"}`}
        practiceDirectoryHref={
          practiceSubject(q.id) !== "criminal-law"
            ? practiceSubjectInfo(practiceSubject(q.id)).libraryHref
            : practiceDirectoryHref
        }
      />

      {(storageIssue ||
        (user &&
          ["unavailable", "conflict", "account-changed", "too-large"].includes(
            status,
          ))) && (
        <div className={s.warning} role="alert" id="practice-records-warning">
          <p>
            {storageIssue
              ? "浏览器记录暂时无法继续保存。请先导出本页记录，再刷新。"
              : status === "too-large"
                ? "记录超出单次同步上限，完整内容仍在本机，请先导出备份。"
                : status === "conflict"
                  ? "账号与本机记录不同，本页原答已保留，请先处理记录。"
                  : status === "account-changed"
                    ? "登录状态已变化，请重新确认账号。本页原答已保留。"
                    : "暂未同步到账号，记录已留在本机。"}
          </p>
          <button onClick={() => exportRecords(state)}>导出记录</button>
          {!storageIssue && status === "unavailable" && (
            <button onClick={() => void retrySync()}>重新同步</button>
          )}
          {!storageIssue && status === "conflict" && (
            <a href="/records">处理记录</a>
          )}
        </div>
      )}

      <div
        className={s.workspace}
        data-question-kind={q.kind}
        data-feedback={!!answer}
        data-practice-step={answer ? "result" : "answer"}
      >
        {returnLink}
        <PracticeSteps stage={answer ? "result" : "answer"} />
        <div className={s.workspaceHeading}>
          <div>
            <p>
              {practiceSubjectInfo(practiceSubject(q.id)).label} /{" "}
              {chapter.title}
            </p>
            <h1>
              {civilReviewMaterial?.title ??
                (review ? "章节综合" : practiceTopic(q.id).title)}
            </h1>
          </div>
          <div className={s.headingActions}>
            <div className={s.modeSwitch} aria-label="练习类型">
              {(["objective", "subjective"] as const).map((value) => (
                <button
                  key={value}
                  aria-pressed={mode === value}
                  disabled={!ready || !activePracticeQueue(state, value).length}
                  onClick={() => changeMode(value)}
                >
                  {value === "objective" ? "客观题" : "主观题"}
                  <span>{activePracticeQueue(state, value).length}</span>
                </button>
              ))}
            </div>
            <button
              className={s.textButton}
              onClick={() => {
                if (!navigate()) return;
                setLibrary(true);
                setCardOpen(false);
                window.history.replaceState({}, "", practiceHref(true));
              }}
            >
              返回选题
            </button>
          </div>
        </div>

        <main id="practice-main" ref={main} tabIndex={-1} className={s.main}>
          {!ready ? (
            <p className={s.loading}>正在恢复你的做题位置…</p>
          ) : isHistoricalPracticeQuestion(q.id) ? (
            <HistoricalPractice
              state={state}
              disabled={storageIssue}
              onStart={(questionId) =>
                openExplicit({ kind: "question", questionId })
              }
            />
          ) : ended ? (
            <section className={s.end}>
              <span className={s.endMark}>
                <Icon name="check" />
              </span>
              <h2>{review ? "本次综合练习结束" : "本章练习结束"}</h2>
              <p>
                本次{review ? "综合" : "知识点"}练习中，已答 {answered} /{" "}
                {queue.length} 题。
              </p>
              {practiceSubject(q.id) === "criminal-law" && (
                <>
                  <ChapterLearningProgress
                    summary={projectChapterLearning(state, chapter.id)}
                    disabled={storageIssue}
                    onContinue={
                      chapterContinuation ? undefined : continueTopicLearning
                    }
                  />
                  <a
                    className={s.textButton}
                    href={`/lab/study?topic=${encodeURIComponent(practiceTopic(q.id).id)}`}
                  >
                    查看本章知识点与学习情况
                  </a>
                </>
              )}
              {chapterContinuation && (
                <ChapterPracticeNext
                  next={chapterContinuation}
                  disabled={storageIssue}
                  onContinue={continueChapterPractice}
                />
              )}
              {continuationIssue && <p role="status">{continuationIssue}</p>}
              <div className={s.endActions}>
                {answered < queue.length && (
                  <button
                    className={s.primary}
                    onClick={() => {
                      if (!navigate((p) => restartPractice(p, now(), true)))
                        return;
                      focusQuestion();
                    }}
                  >
                    继续未答题 <Icon name="arrow" />
                  </button>
                )}
                <button
                  className={
                    chapterContinuation ||
                    (contractContinuation?.complete &&
                      nextLearningPractice(state))
                      ? s.textButton
                      : answered === queue.length &&
                          !contractContinuation?.complete
                        ? s.primary
                        : s.secondary
                  }
                  onClick={() => {
                    if (!navigate((p) => restartPractice(p, now()))) return;
                    focusQuestion();
                  }}
                >
                  再练一次
                </button>
              </div>
              <button
                className={s.textButton}
                onClick={() => selectQuestion(queue[0])}
              >
                {review ? "回看本次题目" : "回看本章题目"}
              </button>
              {contractContinuation && (
                <IntegratedProgress
                  questions={contractContinuation.questions}
                  disabled={storageIssue}
                />
              )}
              {contractContinuation?.complete && (
                <div className={d.document}>
                  <p className={d.paragraph}>
                    三问原答已分别保存。可回到任一问查看原答和已存反馈，再对照参考或独立重答；有反馈不代表已经掌握。
                  </p>
                  <LearningNext
                    recommendation={nextLearningPractice(state)}
                    disabled={storageIssue}
                    onContinue={continueLearning}
                  />
                  <a
                    href={
                      practiceSubjectInfo(practiceSubject(q.id)).libraryHref
                    }
                    className={s.textButton}
                  >
                    回到{practiceSubjectInfo(practiceSubject(q.id)).label}选题
                  </a>
                </div>
              )}
            </section>
          ) : (
            <>
              <div className={s.questionToolbar}>
                <div className={s.questionCount}>
                  <strong>{String(groupIndex + 1).padStart(2, "0")}</strong>
                  <span>/ {String(groupIds.length).padStart(2, "0")}</span>
                  <small>
                    {q.kind === "objective" ? `${choiceModeLabel(q)} · ` : ""}
                    {review
                      ? "章节综合题"
                      : isExamPractice(q.id)
                        ? "自编仿真题"
                        : q.kind === "objective"
                          ? "基础练习"
                          : "案例简答"}
                  </small>
                </div>
                {(!review || !!answer) && (
                  <button
                    className={s.textButton}
                    onClick={() => showKnowledge(practiceTopic(q.id).id)}
                  >
                    <Icon name="book" />
                    知识要点
                  </button>
                )}
                <button
                  className={s.cardToggle}
                  aria-expanded={cardOpen}
                  onClick={() => setCardOpen(!cardOpen)}
                >
                  题目列表
                </button>
              </div>
              {currentId !== q.id && (
                <p>
                  正在继续上次的旧版题目。{" "}
                  <button
                    className={s.textButton}
                    onClick={() => selectQuestion(currentId)}
                  >
                    练习新版题目
                  </button>
                </p>
              )}
              {previousTemporalQuestion(state, q.id) && (
                <button
                  className={s.textButton}
                  onClick={() =>
                    openExplicit({
                      kind: "question",
                      questionId: previousTemporalQuestion(state, q.id)!,
                    })
                  }
                >
                  回看旧题记录
                </button>
              )}
              {cardOpen && (
                <nav className={s.questionList} aria-label="题目列表">
                  {queue.map((id, i) => (
                    <button
                      key={id}
                      onClick={() => selectQuestion(id)}
                      aria-current={id === q.id ? "step" : undefined}
                      data-answered={!!state.drafts[id]?.submittedId}
                    >
                      {i + 1}
                      <small>
                        {state.drafts[id]?.submittedId ? "已答" : "未答"}
                      </small>
                    </button>
                  ))}
                </nav>
              )}
              <div
                key={q.id}
                className={`${s.questionBody} ${answer ? d.document : ""}`}
                data-feedback={!!answer}
                data-question-kind={q.kind}
                data-question-id={q.id}
              >
                {answer && <h2 className={s.resultTitle}>{q.title}</h2>}
                {registeredReading && !nativeReading && (
                  <h2 className={d.heading}>题目与原答</h2>
                )}
                <QuestionContext
                  className={answer ? s.resultContext : s.answerContext}
                  {...(answer && q.kind === "objective" ? { open: true } : {})}
                  aria-label={
                    answer
                      ? retryView?.current
                        ? "题目与本次重答"
                        : "题目与我的原答"
                      : undefined
                  }
                >
                  {answer && !feedbackReading && (
                    <summary>
                      {retryView?.current ? "题目与本次重答" : "题目与我的原答"}
                    </summary>
                  )}
                  <section className={s.facts} aria-label="本题案情">
                    {answer && !feedbackReading && (
                      <h2 className={d.heading}>
                        {feedbackReading ? "题目与原答" : "题目与问题"}
                      </h2>
                    )}
                    {civilReviewMaterial ? (
                      civilReviewMaterial.facts
                        .split("\n\n")
                        .map((paragraph, i) => <p key={i}>{paragraph}</p>)
                    ) : (
                      <p>{q.facts}</p>
                    )}
                  </section>
                  {civilReviewMaterial && (
                    <section aria-label="本案全部设问">
                      <h2 className={s.prompt}>本案设问</h2>
                      <ol className={d.points}>
                        {civilReviewMaterial.questions.map((question) => (
                          <li
                            key={question.id}
                            data-integrated-prompt-id={question.id}
                          >
                            <p>
                              <strong>{question.title}：</strong>
                              {question.prompt}
                            </p>
                          </li>
                        ))}
                      </ol>
                    </section>
                  )}
                  {(answer
                    ? answer.referenceSeenBeforeAnswer
                    : draft.referenceSeen) && (
                    <p className={d.paragraph} data-case-reference-seen>
                      {answer
                        ? "这份原答保存前已看过本案参考，记录按参考已见保留。"
                        : "你已看过本案参考；本问保存时会标记参考已见，不当作首次独立作答。"}
                    </p>
                  )}
                  {!answer && !retryWriting && nativeExamples.length > 0 && (
                    <details
                      className={d.answerDetails}
                      aria-label="虚构样例回放"
                    >
                      <summary>试看已有的虚构样例反馈</summary>
                      <p className={d.paragraph}>
                        这里只读取本题固定虚构样例的已有反馈，不新增模型调用。
                        提交自己的答案时，会先保存原文，再按当前评阅服务状态获取反馈。
                      </p>
                      {nativeExamples.map((row) => (
                        <section key={row.id}>
                          <h3 className={d.subheading}>{row.label}</h3>
                          <p className={d.paragraph}>{row.answer}</p>
                          <button
                            type="button"
                            className={s.secondary}
                            disabled={
                              storageIssue ||
                              (!!draft.answer.trim() &&
                                !nativeExamples.some(
                                  (example) => example.answer === draft.answer,
                                ))
                            }
                            onClick={() => {
                              if (
                                !storageIssue &&
                                (!draft.answer.trim() ||
                                  nativeExamples.some(
                                    (example) =>
                                      example.answer === draft.answer,
                                  ))
                              )
                                update((p) =>
                                  editPractice(p, { answer: row.answer }),
                                );
                            }}
                          >
                            使用这份虚构答文
                          </button>
                        </section>
                      ))}
                      {!!draft.answer.trim() &&
                        !nativeExamples.some(
                          (row) => row.answer === draft.answer,
                        ) && (
                          <p className={d.note}>
                            现有草稿保留；不会替换你的答文。
                          </p>
                        )}
                    </details>
                  )}
                  <form
                    id="practice-answer-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!answer) submit();
                    }}
                  >
                    {(answer
                      ? answer.learningExampleSource
                      : draft.learningExampleSource) ===
                      LEARNING_EXAMPLE_SOURCE && (
                      <p
                        className={d.paragraph}
                        data-learning-example-reference
                        role="note"
                      >
                        {answer
                          ? "这份答卷保存为参考后练习：作答前已看过本题示例。旧答卷的来源不追改。"
                          : "已看过示例，此次作为参考后练习。请用自己的话作答；示例答案不会填入，已有草稿保留。"}
                      </p>
                    )}
                    {answer ? (
                      <h3 className={s.prompt}>
                        {civilReviewMaterial
                          ? `${q.title} · 我的原答`
                          : q.prompt}
                      </h3>
                    ) : (
                      <h2 className={s.prompt}>
                        {civilReviewMaterial
                          ? `${q.title} · 我的作答`
                          : q.prompt}
                      </h2>
                    )}
                    {retryWriting && retryView && (
                      <FeedbackRetryPanel
                        view={retryView}
                        storageIssue={storageIssue}
                        saveLabel={saveLabel}
                      />
                    )}
                    {retryWriting && !retryView && (
                      <p className={d.paragraph} role="status">
                        这次重答的反馈依据暂时无法核实，草稿保留；暂时不能保存为本次重答。
                      </p>
                    )}
                    {draftRetryAdvice?.retryClarification ? (
                      <p
                        className={d.paragraph}
                        data-direct-draft-clarification
                      >
                        这次先补清：{draftRetryAdvice.retryClarification}
                      </p>
                    ) : draftRetryAdvice?.retryReminder ? (
                      <p className={d.paragraph} data-direct-draft-retry-cue>
                        {draftRetryAdvice.retryReminder}
                      </p>
                    ) : null}
                    {q.kind === "objective" ? (
                      <fieldset className={s.options} disabled={!!answer}>
                        <legend className={s.selectionRule}>
                          {choiceMode(q) === "single"
                            ? "选择一个答案"
                            : choiceMode(q) === "multiple"
                              ? "有两个或以上正确项，全选对才算答对"
                              : "有一个或以上正确项，全选对才算答对"}
                        </legend>
                        {q.options!.map((option) => (
                          <label
                            key={option.id}
                            data-selected={selected.includes(option.id)}
                            data-correct={
                              answer && expected.includes(option.id)
                                ? true
                                : undefined
                            }
                            data-wrong={
                              answer &&
                              !expected.includes(option.id) &&
                              selected.includes(option.id)
                                ? true
                                : undefined
                            }
                          >
                            <input
                              type={
                                choiceMode(q) === "single"
                                  ? "radio"
                                  : "checkbox"
                              }
                              name="practice-choice"
                              checked={selected.includes(option.id)}
                              onChange={() =>
                                update((p) =>
                                  editPractice(p, {
                                    choice: toggleChoice(
                                      q,
                                      p.drafts[q.id]?.choice ?? "",
                                      option.id,
                                    ),
                                  }),
                                )
                              }
                              value={option.id}
                            />
                            <span className={s.letter}>
                              {option.id.toUpperCase()}
                            </span>
                            <span>{option.text}</span>
                            {answer && expected.includes(option.id) && (
                              <Icon name="check" />
                            )}
                          </label>
                        ))}
                      </fieldset>
                    ) : (
                      <div className={s.writing}>
                        {answer ? (
                          <>
                            {feedbackReading ? (
                              <h3
                                id="saved-answer-title"
                                className={d.subheading}
                              >
                                {retryView?.current ? "本次重答" : "我的原答"}
                              </h3>
                            ) : (
                              <h2 id="saved-answer-title" className={d.heading}>
                                {retryView?.current ? "本次重答" : "我的原答"}
                              </h2>
                            )}
                            <p
                              className={s.savedAnswer}
                              aria-labelledby="saved-answer-title"
                              data-saved-original-answer
                            >
                              {answer.answer}
                            </p>
                          </>
                        ) : (
                          <>
                            <label htmlFor="practice-writing">
                              {retryWriting ? "我的完整重答" : "我的作答"}
                              <span>{draft.answer.length} / 8000</span>
                            </label>
                            <textarea
                              id="practice-writing"
                              rows={5}
                              value={draft.answer}
                              maxLength={8000}
                              disabled={retryBlocked}
                              placeholder="写下你的判断和理由。"
                              onChange={(e) =>
                                update((p) =>
                                  editPractice(p, { answer: e.target.value }),
                                )
                              }
                            />
                          </>
                        )}
                      </div>
                    )}
                    {answer && q.kind === "objective" && (
                      <section aria-label="我的原答">
                        <h2 className={d.heading}>我的原答</h2>
                        <p className={d.original} data-saved-original-choice>
                          我选择了 {answerLabel(selectedChoices(answer.choice))}
                          。
                        </p>
                      </section>
                    )}
                    {!answer && (
                      <p className={d.paragraph}>
                        {storageIssue ? (
                          <button className={s.textButton} disabled>
                            我想问为什么
                          </button>
                        ) : (
                          <a
                            data-inquiry-from-draft
                            href={`/lab/ask?question=${q.id}`}
                          >
                            我想问为什么
                          </a>
                        )}
                      </p>
                    )}
                  </form>
                </QuestionContext>
                {answer && q.kind === "objective" && (
                  <section
                    className={s.result}
                    ref={result}
                    tabIndex={-1}
                    aria-label="选择题答案与解析"
                  >
                    <ObjectiveAnswerAnalysis
                      question={q}
                      questionRevision={answer.revision}
                      choice={answer.choice}
                    />
                  </section>
                )}
                {answer && q.kind === "objective" && (
                  <UnitAnswerFeedback
                    learningRecords={state}
                    storageIssue={storageIssue}
                    key={`objective-feedback-${answer.id}`}
                    exerciseId={q.id}
                    exerciseRevision={answer.revision}
                    attemptId={answer.id}
                    answer={answer.answer}
                    choice={answer.choice}
                    savedResult={savedSubmittedFeedback}
                    feedbackSaved={!!savedSubmittedFeedback}
                    activeReview={currentSubmissionReview}
                    onRetry={() => reviewSavedAnswer(answer, true)}
                    onSaveReceived={(receipt) =>
                      reviewSavedAnswer(answer, false, receipt)
                    }
                  />
                )}
                {feedbackRetryIssue && (
                  <p className={d.paragraph} role="status">
                    {feedbackRetryIssue}
                  </p>
                )}
                {answer &&
                  (retryView?.current ? (
                    <section
                      className={s.result}
                      ref={q.kind === "subjective" ? result : undefined}
                      tabIndex={-1}
                      aria-label="重答结果"
                    >
                      {teacherRetryReceipt ||
                      (registeredReading && !nativeReading) ? (
                        <details
                          className={d.answerDetails}
                          data-teacher-retry-comparison
                        >
                          <summary>对照两次原答与反馈</summary>
                          <FeedbackRetryPanel
                            view={retryView}
                            storageIssue={storageIssue}
                            saveLabel={saveLabel}
                          />
                        </details>
                      ) : (
                        <FeedbackRetryPanel
                          view={retryView}
                          storageIssue={storageIssue}
                          saveLabel={saveLabel}
                        />
                      )}
                      {(registeredReading || shortReading) && (
                        <RetryFeedbackContainer
                          className={d.answerDetails}
                          {...(!inlineRetryFeedback
                            ? {
                                open: retryFeedbackAttempt === answer.id,
                                onToggle: (
                                  e: React.SyntheticEvent<HTMLElement>,
                                ) => {
                                  if (
                                    e.currentTarget instanceof
                                    HTMLDetailsElement
                                  )
                                    setRetryFeedbackAttempt(
                                      e.currentTarget.open ? answer.id : null,
                                    );
                                },
                              }
                            : {})}
                          data-active-feedback-review={
                            activeReviewVisible || undefined
                          }
                          data-feedback-retry-read
                        >
                          {activeReviewVisible ? (
                            <h3 className={d.subheading}>这次重答的评阅状态</h3>
                          ) : !inlineRetryFeedback ? (
                            <summary>读取这次重答的反馈</summary>
                          ) : null}
                          {(inlineRetryFeedback ||
                            retryFeedbackAttempt === answer.id) &&
                            (registeredReading ? (
                              <UnitAnswerFeedback
                                learningRecords={state}
                                storageIssue={storageIssue}
                                key={`unit-feedback-${answer.id}`}
                                exerciseId={q.id}
                                exerciseRevision={answer.revision}
                                attemptId={answer.id}
                                answer={answer.answer}
                                reference={q.reference}
                                savedResult={
                                  savedSubmittedFeedback ??
                                  nativeObservation?.unitResult
                                }
                                feedbackSaved={!!savedSubmittedFeedback}
                                activeReview={currentSubmissionReview}
                                onRetry={() => reviewSavedAnswer(answer, true)}
                                onSaveReceived={(receipt) =>
                                  reviewSavedAnswer(answer, false, receipt)
                                }
                                onReviewed={
                                  nativeBinding
                                    ? rememberUnitFeedback
                                    : undefined
                                }
                                onSourceChange={rememberUnitSourceChange}
                                onFullRetry={
                                  retrySource && !retrySourceUnavailable
                                    ? beginRetry
                                    : undefined
                                }
                                onTeacherNavigationChange={setTeacherNavigation}
                                nextQuestionTitle={nextTeacherQuestionTitle}

                                onContinue={
                                  learningRecommendation?.action ===
                                    "practice" &&
                                  learningRecommendation.questionId !== q.id
                                    ? () =>
                                        continueLearning(
                                          learningRecommendation.id,
                                        )
                                    : nextReadingQuestion
                                }
                              />
                            ) : (
                              <ShortAnswerScoring
                                key={`scoring-${answer.id}`}
                                exerciseId={q.id}
                                exerciseRevision={answer.revision}
                                answer={answer.answer}
                                referenceSeen={answer.referenceSeenBeforeAnswer}
                                onReviewed={rememberFeedback}
                                documentFlow
                                practiceReading
                              />
                            ))}
                        </RetryFeedbackContainer>
                      )}
                      {feedbackSaveIssue && (
                        <p className={d.paragraph} role="status">
                          这份反馈暂未进入学习记录；两次答文仍保留，请先检查记录状态。
                        </p>
                      )}
                      {savedLearningChoice}
                      {!inlineTeacherNavigation && (
                        <div className={s.endActions}>
                          <button
                            className={s.primary}
                            disabled={storageIssue}
                            onClick={nextReadingQuestion}
                          >
                            {directStep
                              ? directStep.label
                              : transferQuestion
                                ? "下一题"
                                : index === queue.length - 1
                                  ? review
                                    ? "结束本次"
                                    : "结束本章"
                                  : nextTopic && !review
                                    ? "下一知识点"
                                    : "下一题"}
                            <Icon name="arrow" />
                          </button>
                          {feedbackRetryAction}
                          {registeredReading &&
                            !nativeReading &&
                            !feedbackRetryAction &&
                            readingRewriteAction}
                          {registeredReading && !nativeReading && (
                            <a
                              className={s.textButton}
                              href={`/lab/ask?question=${q.id}`}
                            >
                              问这道题
                            </a>
                          )}
                        </div>
                      )}
                      <p className={d.paragraph}>
                        <button
                          className={s.textButton}
                          onClick={() => showKnowledge(practiceTopic(q.id).id)}
                        >
                          回看知识要点
                        </button>
                      </p>
                    </section>
                  ) : feedbackReading ? (
                    <section
                      className={s.result}
                      ref={q.kind === "subjective" ? result : undefined}
                      tabIndex={-1}
                      aria-label="答案与解析"
                    >
                      {registeredReading ? (
                        <UnitAnswerFeedback
                          learningRecords={state}
                          storageIssue={storageIssue}
                          key={`unit-feedback-${answer.id}`}
                          exerciseId={q.id}
                          exerciseRevision={answer.revision}
                          attemptId={answer.id}
                          answer={answer.answer}
                          reference={q.reference}
                          savedResult={
                            savedSubmittedFeedback ??
                            nativeObservation?.unitResult
                          }
                          feedbackSaved={!!savedSubmittedFeedback}
                          activeReview={currentSubmissionReview}
                          onRetry={() => reviewSavedAnswer(answer, true)}
                          onSaveReceived={(receipt) =>
                            reviewSavedAnswer(answer, false, receipt)
                          }
                          onReviewed={
                            nativeBinding ? rememberUnitFeedback : undefined
                          }
                          onSourceChange={rememberUnitSourceChange}
                          onFullRetry={
                            retrySource && !retrySourceUnavailable
                              ? beginRetry
                              : undefined
                          }
                          onTeacherNavigationChange={setTeacherNavigation}
                          nextQuestionTitle={nextTeacherQuestionTitle}

                          onContinue={
                            learningRecommendation?.action === "practice" &&
                            learningRecommendation.questionId !== q.id
                              ? () =>
                                  continueLearning(learningRecommendation.id)
                              : nextReadingQuestion
                          }
                        />
                      ) : (
                        <ShortAnswerScoring
                          key={`scoring-${answer.id}`}
                          exerciseId={q.id}
                          exerciseRevision={answer.revision}
                          answer={answer.answer}
                          referenceSeen={answer.referenceSeenBeforeAnswer}
                          onReviewed={rememberFeedback}
                          documentFlow
                          practiceReading
                        />
                      )}
                      {feedbackSaveIssue && (
                        <p className={d.note} role="status">
                          这份评阅暂未进入学习记录；原答仍保留，请先导出记录或稍后读取。
                        </p>
                      )}
                      {!registeredReading && (
                        <details
                          className={d.answerDetails}
                          aria-label="参考分析与要点"
                        >
                          <summary>查看参考分析与要点</summary>
                          <h3 className={d.subheading}>参考分析</h3>
                          <AnswerReference
                            questionId={q.id}
                            questionRevision={answer.revision}
                            reference={q.reference}
                            className={d.paragraph}
                          />
                          <h3 className={d.subheading}>参考得分点</h3>
                          <ol className={d.points}>
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
                          <FeedbackBoundaryNote questionId={q.id} />
                          <ReferenceSources
                            sources={q.sources.map((id) => ({
                              id,
                              ...exerciseSources(q.id)[id],
                            }))}
                          />
                        </details>
                      )}
                      <section aria-label="下一步">
                        {!registeredReading && (
                          <>
                            <h2 className={d.heading}>下一步</h2>
                            <p className={d.paragraph}>
                              {transferQuestion
                                ? `接着做「${transferQuestion.title}」，用另一道同主题题检验本次判断。`
                                : "继续这个知识点的练习；需要修改时，可以先重写这一题。"}
                            </p>
                          </>
                        )}
                        {!inlineTeacherNavigation && (
                          <div className={s.endActions}>
                            <button
                              className={
                                nativeReading && !nativeObservation?.unitResult
                                  ? s.secondary
                                  : s.primary
                              }
                              disabled={storageIssue}
                              onClick={nextReadingQuestion}
                            >
                              {directStep
                                ? directStep.label
                                : transferQuestion
                                  ? "下一题"
                                  : index === queue.length - 1
                                    ? review
                                      ? "结束本次"
                                      : "结束本章"
                                    : nextTopic && !review
                                      ? "下一知识点"
                                      : "下一题"}
                              <Icon name="arrow" />
                            </button>
                            {feedbackRetryAction}
                            {!nativeReading &&
                              !feedbackRetryAction &&
                              readingRewriteAction}
                            {registeredReading && !nativeReading && (
                              <a
                                className={s.textButton}
                                href={`/lab/ask?question=${q.id}`}
                              >
                                问这道题
                              </a>
                            )}
                          </div>
                        )}
                        {nativeReading ? (
                          <details
                            className={d.answerDetails}
                            ref={localRewriteDisclosure}
                            aria-label="重答与比较"
                          >
                            <summary>重答与比较</summary>
                            {nativeReading &&
                              nativeObservation &&
                              !feedbackSaveIssue && (
                                <p className={d.note} role="status">
                                  {nativeObservation.unitResult?.view
                                    .answerId === answer.id
                                    ? "这份新答的反馈已保存并与原答事件关联；重新读取不会新增评阅。"
                                    : "这份虚构样例反馈已进入学习记录，与本次原答事件分别关联；不是一次新的评阅。"}
                                </p>
                              )}
                            {teacherNeedsReview && (
                              <p className={d.note}>
                                待核反馈不作为已判错依据。可以另写一份完整答案，原答和旧反馈仍保留。
                              </p>
                            )}
                            {(!feedbackRetryAction || retrySourceUnavailable) &&
                              readingRewriteAction}
                            <AnswerRewrite
                              state={state}
                              target={{
                                questionId: q.id,
                                attemptId: answer.id,
                              }}
                              disabled={storageIssue}
                              onChange={update}
                            />
                            <LearningFeedbackTrace
                              state={state}
                              attemptId={answer.id}
                              comparisonOnly
                            />
                          </details>
                        ) : !registeredReading || keepLocalRewrite ? (
                          <>
                            <LearningFeedbackTrace
                              state={state}
                              attemptId={answer.id}
                              comparisonOnly
                            />
                            <details
                              className={d.answerDetails}
                              ref={localRewriteDisclosure}
                              data-retained-local-rewrite
                            >
                              <summary>局部重答与对照</summary>
                              <AnswerRewrite
                                state={state}
                                target={{
                                  questionId: q.id,
                                  attemptId: answer.id,
                                }}
                                disabled={storageIssue}
                                onChange={update}
                              />
                            </details>
                          </>
                        ) : null}
                        {savedLearningChoice}
                        <p className={d.paragraph}>
                          <button
                            className={s.textButton}
                            onClick={() =>
                              showKnowledge(practiceTopic(q.id).id)
                            }
                          >
                            回看知识要点
                          </button>
                          {(!registeredReading || nativeReading) && (
                            <>
                              {" · "}
                              <a href={`/lab/ask?question=${q.id}`}>问这道题</a>
                            </>
                          )}
                        </p>
                      </section>
                    </section>
                  ) : (
                    <section
                      className={s.result}
                      ref={q.kind === "subjective" ? result : undefined}
                      tabIndex={-1}
                      aria-label="答案与解析"
                    >
                      {q.kind === "subjective" && (
                        <h2 className={d.heading}>整体判断</h2>
                      )}
                      {q.kind === "objective" ? (
                        <>
                          {correct === false && (
                            <section aria-label="具体改进">
                              <h3 className={d.subheading}>具体改进</h3>
                              <ul className={d.points}>
                                {expected.some(
                                  (id) => !selected.includes(id),
                                ) && (
                                  <li>{`补选 ${answerLabel(expected.filter((id) => !selected.includes(id)))}，对照上方逐项解答核对理由。`}</li>
                                )}
                                {selected.some(
                                  (id) => !expected.includes(id),
                                ) && (
                                  <li>{`去掉 ${answerLabel(selected.filter((id) => !expected.includes(id)))}，对照上方逐项解答核对这项为什么不成立。`}</li>
                                )}
                              </ul>
                            </section>
                          )}
                        </>
                      ) : shortScoringCard ? (
                        <ShortAnswerScoring
                          key={`scoring-${answer.id}`}
                          exerciseId={q.id}
                          exerciseRevision={answer.revision}
                          answer={answer.answer}
                          referenceSeen={answer.referenceSeenBeforeAnswer}
                          onReviewed={rememberFeedback}
                          documentFlow
                        />
                      ) : scoringCard ? (
                        <AnswerScoring
                          key={`scoring-${answer.id}`}
                          caseId={q.id}
                          exerciseRevision={answer.revision}
                          answer={answer.answer}
                          referenceSeen={answer.referenceSeenBeforeAnswer}
                          lookupOnly
                        />
                      ) : (
                        <p>
                          这份原答已保存，本题尚未接入AI评阅；可对照下方参考自检。
                        </p>
                      )}
                      {q.kind === "subjective" &&
                        !scoringCard &&
                        !shortScoringCard &&
                        !!q.criteria?.length && (
                          <section aria-label="参考自检">
                            <h3 className={d.subheading}>
                              {civilProcedureReviewQuestion(q.id) &&
                              q.criteria.length === 1
                                ? "对照时先检查这一点"
                                : "对照时先检查这两点"}
                            </h3>
                            <ol className={d.points}>
                              {q.criteria.slice(0, 2).map((criterion) => (
                                <li key={criterion.id}>
                                  <strong>{criterion.label}：</strong>
                                  {criterion.meaning}
                                </li>
                              ))}
                            </ol>
                            <p className={d.note}>
                              这是自检提示，尚未判断你的原答是否答到了这些要点。
                            </p>
                          </section>
                        )}
                      {q.kind === "subjective" && (
                        <>
                          <h2 className={d.heading}>更好答法</h2>
                          <AnswerReference
                            questionId={q.id}
                            questionRevision={answer.revision}
                            reference={q.reference}
                            className={d.paragraph}
                          />
                          <p className={d.note}>
                            本题参考原文，用于对照；不是针对这份原答生成的改写。
                          </p>
                        </>
                      )}
                      {q.kind === "subjective" && feedbackSaveIssue && (
                        <p className={d.note} role="status">
                          这份评阅暂未进入学习记录；原答仍保留，当前评阅仅可在本页查看。
                          请先导出本页记录，再刷新并读取已有结果，不必重新评阅。
                        </p>
                      )}
                      <details
                        className={d.answerDetails}
                        aria-label={
                          q.kind === "objective"
                            ? "来源与学习记录"
                            : "逐项解析与依据"
                        }
                      >
                        <summary>
                          {q.kind === "objective"
                            ? "查看来源与学习记录"
                            : "查看逐项解析与依据"}
                        </summary>
                        {q.kind === "subjective" && (
                          <>
                            <LearningFeedbackTrace
                              state={state}
                              attemptId={answer.id}
                            />
                          </>
                        )}
                        <FeedbackBoundaryNote questionId={q.id} />
                        {q.kind === "subjective" && (
                          <section aria-label="参考得分点">
                            <h2 className={d.heading}>参考得分点</h2>
                            <ol className={d.points}>
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
                          </section>
                        )}
                        <section aria-label="本题学习小结">
                          <h2 className={d.heading}>本题学习小结</h2>
                          <p>
                            {q.kind === "objective"
                              ? correct
                                ? "本次选择正确，已保存为作答记录；单次答对不代表已掌握这个知识点。"
                                : "本次选择错误已留有记录。可回看上方逐项解答与关联知识，再继续练习。"
                              : (() => {
                                  const count = state.corrections.filter(
                                    (c) =>
                                      c.attemptId === answer.id &&
                                      c.answer.trim(),
                                  ).length;
                                  return count
                                    ? `这份原答保留，另有 ${count} 份独立重答已保存、尚未评阅。现有记录还不能说明是否已改正。`
                                    : "这份原答已保存。可对照参考得分点，选一处理由重答；目前没有已保存的独立重答记录。";
                                })()}
                          </p>
                        </section>
                        <div className={s.related}>
                          <button
                            onClick={() =>
                              showKnowledge(practiceTopic(q.id).id)
                            }
                          >
                            {practiceTopic(q.id).title}
                            <Icon name="book" />
                          </button>
                          {q.relatedTopicIds
                            ?.filter((id) => id !== practiceTopic(q.id).id)
                            .map((id) => (
                              <button
                                key={id}
                                onClick={() => showKnowledge(id)}
                              >
                                {
                                  (practiceSubject(q.id) === "commercial-law"
                                    ? explicitCommercialKnowledgeTopics
                                    : practiceSubject(q.id) ===
                                        "administrative-law"
                                      ? explicitAdministrativeKnowledgeTopics
                                      : practiceSubject(q.id) ===
                                          "criminal-procedure"
                                        ? explicitCriminalProcedureKnowledgeTopics
                                        : practiceSubject(q.id) === "civil-law"
                                          ? explicitCivilKnowledgeTopics
                                          : practiceSubject(q.id) ===
                                              "civil-procedure"
                                            ? explicitCivilProcedureKnowledgeTopics
                                            : knowledgeTopics
                                  ).find((t) => t.id === id)?.title
                                }
                                <Icon name="book" />
                              </button>
                            ))}
                          {correct === false && mistakes > 1 && (
                            <small>
                              这个知识点已有 {mistakes} 次选择错误记录
                            </small>
                          )}
                          <a href={`/lab/ask?question=${q.id}`}>问这道题</a>
                        </div>
                        <ReferenceSources
                          sources={q.sources.map((id) => ({
                            id,
                            ...exerciseSources(q.id)[id],
                          }))}
                        />
                      </details>
                      {q.kind === "subjective" && (
                        <details
                          className={d.answerDetails}
                          ref={localRewriteDisclosure}
                          aria-label="重答与比较"
                        >
                          <summary>重答与比较</summary>
                          {readingRewriteAction}
                          <AnswerRewrite
                            key={`rewrite-${answer.id}`}
                            state={state}
                            target={{ questionId: q.id, attemptId: answer.id }}
                            disabled={storageIssue}
                            onChange={update}
                          />
                        </details>
                      )}
                    </section>
                  ))}
                {q.kind === "objective" ? (
                  <ObjectiveAnswerHistory
                    key={`${q.id}:${answer?.id ?? "draft"}`}
                    history={practiceAnswerHistory(state)}
                    currentAttemptId={answer?.id}
                  />
                ) : (
                  <AnswerHistory
                    key={`${q.id}:${answer?.id ?? "draft"}`}
                    history={practiceAnswerHistory(state)}
                    corrections={state.corrections}
                    submittedFeedback={state.submittedFeedback}
                    currentAttemptId={answer?.id}
                    scoringCard={scoringCard}
                    shortScoringCard={shortScoringCards.find(
                      (c) => c.id === q.id,
                    )}
                  />
                )}
              </div>
              {!feedbackReading && !retryView?.current && (
                <footer
                  className={`${s.actions} ${answer && q.kind === "subjective" ? s.feedbackActions : ""}`}
                >
                  <button
                    className={s.previous}
                    aria-label="上一题"
                    disabled={index === 0}
                    onClick={() => next(-1)}
                  >
                    <Icon name="back" />
                    <span>上一题</span>
                  </button>
                  <div>
                    {feedbackRetryAction}
                    {answer && q.kind === "objective" && (
                      <button
                        type="button"
                        className={s.textButton}
                        disabled={storageIssue}
                        onClick={() => {
                          if (storageIssue) return;
                          if (!update((p) => retryObjectiveAnswer(p, q.id)))
                            return;
                          requestAnimationFrame(() =>
                            document
                              .querySelector<HTMLInputElement>(
                                "#practice-answer-form input[name='practice-choice']",
                              )
                              ?.focus(),
                          );
                        }}
                      >
                        再答一次
                      </button>
                    )}
                    {answer &&
                      !feedbackRetryAction &&
                      (scoringCard || shortScoringCard) &&
                      q.kind === "subjective" && (
                        <button
                          className={s.textButton}
                          onClick={() => {
                            if (!update((p) => retryWrittenAnswer(p, answer)))
                              return;
                            requestAnimationFrame(() =>
                              document
                                .getElementById("practice-writing")
                                ?.focus(),
                            );
                          }}
                        >
                          重新作答（保留原答）
                        </button>
                      )}
                    {!answer && (
                      <button className={s.textButton} onClick={() => next(1)}>
                        {index === queue.length - 1 ? "先结束" : "先跳过"}
                      </button>
                    )}
                    {answer ? (
                      <button className={s.primary} onClick={() => next(1)}>
                        {index === queue.length - 1
                          ? review
                            ? "结束本次"
                            : "结束本章"
                          : nextTopic && !review
                            ? "下一知识点"
                            : "下一题"}
                        <Icon name="arrow" />
                      </button>
                    ) : (
                      <button
                        className={s.primary}
                        form="practice-answer-form"
                        type="submit"
                        disabled={
                          retryBlocked ||
                          (q.kind === "objective"
                            ? !validChoice(q, draft.choice)
                            : !draft.answer.trim())
                        }
                      >
                        {retryWriting
                          ? "保存重答并对照"
                          : q.kind === "subjective" &&
                              practiceSubject(q.id) === "civil-procedure"
                            ? "保存原答并对照"
                            : "提交答案"}
                        <Icon name="arrow" />
                      </button>
                    )}
                  </div>
                </footer>
              )}
            </>
          )}
        </main>
        <p className={s.bottomNote}>
          自编案例练习
          {!feedbackReading && <span>进度自动保存，随时可以停下。</span>}
        </p>
      </div>
      {knowledgeOpen && (
        <KnowledgePanel
          {...(isRemainingG6Subject(practiceSubject(q.id))
            ? {
                topics: remainingG6Knowledge(
                  practiceSubject(q.id) as RemainingG6Subject,
                ).topics,
                contentByTopic: remainingG6Knowledge(
                  practiceSubject(q.id) as RemainingG6Subject,
                ).content,
                subjectLabel: practiceSubjectInfo(practiceSubject(q.id)).label,
                onExampleRead: (topicId: string) => {
                  navigate((p) =>
                    viewExplicitRemainingKnowledge(p, topicId, now(), true),
                  );
                },
              }
            : practiceSubject(q.id) === "commercial-law"
              ? {
                  topics: explicitCommercialKnowledgeTopics,
                  contentByTopic: explicitCommercialKnowledge,
                  subjectLabel: "商法" as const,
                  onExampleRead: (topicId: string) => {
                    navigate((p) =>
                      viewExplicitCommercialKnowledge(p, topicId, now(), true),
                    );
                  },
                }
              : practiceSubject(q.id) === "administrative-law"
                ? {
                    topics: explicitAdministrativeKnowledgeTopics,
                    contentByTopic: explicitAdministrativeKnowledge,
                    subjectLabel: "行政法" as const,
                    onExampleRead: (topicId: string) => {
                      navigate((p) =>
                        viewExplicitAdministrativeKnowledge(
                          p,
                          topicId,
                          now(),
                          true,
                        ),
                      );
                    },
                  }
                : practiceSubject(q.id) === "criminal-procedure"
                  ? {
                      topics: explicitCriminalProcedureKnowledgeTopics,
                      contentByTopic: explicitCriminalProcedureKnowledge,
                      subjectLabel: "刑诉" as const,
                      onExampleRead: (topicId: string) => {
                        navigate((p) =>
                          viewExplicitCriminalProcedureKnowledge(
                            p,
                            topicId,
                            now(),
                            true,
                          ),
                        );
                      },
                    }
                  : practiceSubject(q.id) === "civil-law"
                    ? {
                        topics: explicitCivilKnowledgeTopics,
                        contentByTopic: explicitCivilKnowledge,
                        subjectLabel: "民法" as const,
                        onExampleRead: (topicId: string) => {
                          navigate((p) =>
                            viewExplicitCivilKnowledge(p, topicId, now(), true),
                          );
                        },
                      }
                    : practiceSubject(q.id) === "civil-procedure"
                      ? {
                          topics: explicitCivilProcedureKnowledgeTopics,
                          contentByTopic: explicitCivilProcedureKnowledge,
                          subjectLabel: "民诉" as const,
                          onExampleRead: (topicId: string) => {
                            navigate((p) =>
                              viewExplicitCivilProcedureKnowledge(
                                p,
                                topicId,
                                now(),
                                true,
                              ),
                            );
                          },
                        }
                      : {})}
          topicId={knowledgeId}
          learningState={
            knowledgeOpen && knowledgeId
              ? projectLearningProfile(state).topics.find(
                  (t) => t.id === knowledgeId,
                )
              : null
          }
          learningSummary={
            knowledgeId &&
            ["criminal-law", "civil-law"].includes(practiceSubject(q.id) ?? "")
              ? projectTopicLearning(state, knowledgeId)
              : null
          }
          onSelect={(id) => showKnowledge(id)}
          onClose={closeKnowledge}
        />
      )}
    </div>
  );
}
