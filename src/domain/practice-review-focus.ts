import { isRemainingG6Subject } from "../content/remaining-g6-subjects";
import { assessmentRunHref } from "../content/civil-integrated-practice";
import { assessmentPaper } from "../content/assessment-papers";
import {
  civilContractReviewHref,
  civilContractReviewQuestion,
} from "../content/civil-contract-review";
import {
  civilProcedureReviewSetForQuestion,
  civilProcedureReviewQuestion,
} from "../content/civil-procedure-review";
import { criminalChapters } from "../content/criminal-curriculum";
import {
  exerciseFor,
  exerciseRevision,
  topicFor,
} from "../content/fault-catalog";
import {
  chapterQueue,
  currentPracticeId,
  isChapterReview,
  isPracticeLocation,
  practiceChapter,
  practiceGroups,
  practiceSubject,
  practiceSubjectInfo,
  practiceTopic,
  subjectPracticeQueues,
  type PracticeMode,
  type PracticeScope,
} from "../content/practice-set";
import { assessmentCursors, selectAssessment } from "./assessment";
import { latestCorrections } from "./corrections";
import { progressSchema, type FaultProgress } from "./fault-progress";
import { initializePractice, visitPractice } from "./practice";

export type ReviewFocusUnavailableReason =
  | "original-unavailable"
  | "original-ambiguous"
  | "unknown-question"
  | "question-version-mismatch"
  | "assessment-original-mismatch"
  | "outside-practice-queue"
  | "practice-group-ambiguous";

export type ReviewFocusLocation = Readonly<{
  topicId: string;
  topicTitle: string;
  chapterId: string;
  chapterTitle: string;
  mode: PracticeMode;
  scope: PracticeScope;
}>;

export type ReviewFocusAssessmentOrigin = Readonly<{
  runId: string;
  paperId: string;
  paperTitle: string;
  questionNumber: number;
}>;

export type ReviewFocusDestination =
  | Readonly<{
      kind: "practice-group";
      questionId: string;
      title: string;
      isReplacement: boolean;
    }>
  | (ReviewFocusAssessmentOrigin & Readonly<{ kind: "assessment-run" }>);

export type ReviewFocusItem = Readonly<{
  correctionId: string;
  attemptId: string;
  questionId: string | null;
  questionRevision: string | null;
  title: string | null;
  kind: PracticeMode | null;
  note: string;
  submittedAt: string;
  originalAnswer: string | null;
  originalChoice: string | null;
  rewrittenAnswer: string;
  reviewStatus: "self-selected-unreviewed";
  assessmentOrigin: ReviewFocusAssessmentOrigin | null;
  location: ReviewFocusLocation | null;
  destination: ReviewFocusDestination | null;
  unavailableReason: ReviewFocusUnavailableReason | null;
}>;

type Correction = FaultProgress["corrections"][number];

function reviewFocusItem(
  state: FaultProgress,
  correction: Correction,
): ReviewFocusItem {
  const originals = state.attempts.filter((a) => a.id === correction.attemptId);
  const original = originals.length === 1 ? originals[0] : undefined;
  const item: ReviewFocusItem = {
    correctionId: correction.id,
    attemptId: correction.attemptId,
    questionId: original?.exerciseId ?? null,
    questionRevision: original?.revision ?? null,
    title: null,
    kind: null,
    note: correction.note,
    submittedAt: correction.submittedAt,
    originalAnswer: original?.answer ?? null,
    originalChoice: original?.choice ?? null,
    rewrittenAnswer: correction.answer,
    reviewStatus: "self-selected-unreviewed",
    assessmentOrigin: null,
    location: null,
    destination: null,
    unavailableReason: null,
  };
  const blocked = (reason: ReviewFocusUnavailableReason): ReviewFocusItem => ({
    ...item,
    unavailableReason: reason,
  });
  if (!original)
    return blocked(
      originals.length ? "original-ambiguous" : "original-unavailable",
    );
  const question = exerciseFor(original.exerciseId);
  if (!question) return blocked("unknown-question");
  if (original.revision !== exerciseRevision(original.exerciseId))
    return blocked("question-version-mismatch");
  const resolved = { ...item, title: question.title, kind: question.kind };

  // The event mapping identifies an original; matching answer text never does.
  const bindings = (state.assessments?.runs ?? []).flatMap((run) =>
    Object.entries(run.attemptIds)
      .filter(([, attemptId]) => attemptId === original.id)
      .map(([questionId]) => ({ run, questionId })),
  );
  if (bindings.length > 1)
    return { ...resolved, unavailableReason: "assessment-original-mismatch" };
  let origin: ReviewFocusAssessmentOrigin | null = null;
  if (bindings.length) {
    const { run, questionId } = bindings[0];
    const paper = assessmentPaper(run.paperId);
    const answer = run.answers[questionId];
    if (
      !run.finishedAt ||
      !paper ||
      run.revision !== paper.revision ||
      questionId !== original.exerciseId ||
      !paper.questionIds.includes(questionId) ||
      answer?.answer !== original.answer ||
      answer.choice !== original.choice ||
      original.submittedAt !== run.finishedAt ||
      original.hintUsed ||
      original.referenceSeenBeforeAnswer !==
        run.seenQuestionIds.includes(questionId)
    )
      return { ...resolved, unavailableReason: "assessment-original-mismatch" };
    origin = {
      runId: run.id,
      paperId: paper.id,
      paperTitle: paper.title,
      questionNumber: paper.questionIds.indexOf(questionId) + 1,
    };
    if (paper.kind === "case" || paper.kind === "practice")
      return {
        ...resolved,
        assessmentOrigin: origin,
        destination: { kind: "assessment-run", ...origin },
      };
  }

  let currentId: string;
  try {
    currentId = currentPracticeId(original.exerciseId);
  } catch {
    return {
      ...resolved,
      assessmentOrigin: origin,
      unavailableReason: "outside-practice-queue",
    };
  }
  const current = exerciseFor(currentId);
  const subject = practiceSubject(currentId);
  if (
    subject === "civil-law" ||
    subject === "civil-procedure" ||
    subject === "criminal-procedure" ||
    subject === "administrative-law" ||
    subject === "commercial-law" ||
    isRemainingG6Subject(subject)
  ) {
    // These subjects have explicit registries rather than criminal-law groups.
    // Resolve only a published current form, never a route inferred from notes.
    if (
      !current ||
      practiceSubject(original.exerciseId) !== subject ||
      !isPracticeLocation(currentId, current.kind)
    )
      return {
        ...resolved,
        assessmentOrigin: origin,
        unavailableReason: "outside-practice-queue",
      };
    const topic = practiceTopic(currentId);
    const chapter = practiceChapter(currentId);
    const scope = isChapterReview(currentId) ? "review" : "topic";
    if (
      !topic ||
      !chapter ||
      !chapter.topicIds.includes(topic.id) ||
      !chapterQueue(chapter.id, current.kind, scope).includes(currentId) ||
      (scope === "topic" &&
        !subjectPracticeQueues(subject)[current.kind].includes(currentId))
    )
      return {
        ...resolved,
        assessmentOrigin: origin,
        unavailableReason: "outside-practice-queue",
      };
    return {
      ...resolved,
      assessmentOrigin: origin,
      location: {
        topicId: topic.id,
        topicTitle: topic.title,
        chapterId: chapter.id,
        chapterTitle: chapter.title,
        mode: current.kind,
        scope,
      },
      destination: {
        kind: "practice-group",
        questionId: currentId,
        title: current.title,
        isReplacement: currentId !== original.exerciseId,
      },
    };
  }
  const groups = practiceGroups.filter((group) =>
    group.ids.includes(currentId),
  );
  if (groups.length > 1)
    return {
      ...resolved,
      assessmentOrigin: origin,
      unavailableReason: "practice-group-ambiguous",
    };
  const group = groups[0];
  const topic = group && topicFor(group.topicId);
  const chapters = topic
    ? criminalChapters.filter((chapter) => chapter.topicIds.includes(topic.id))
    : [];
  const scope = isChapterReview(currentId) ? "review" : "topic";
  if (
    !current ||
    !topic ||
    chapters.length !== 1 ||
    !chapterQueue(chapters[0].id, current.kind, scope).includes(currentId)
  )
    return {
      ...resolved,
      assessmentOrigin: origin,
      unavailableReason:
        chapters.length > 1
          ? "practice-group-ambiguous"
          : "outside-practice-queue",
    };
  return {
    ...resolved,
    assessmentOrigin: origin,
    location: {
      topicId: topic.id,
      topicTitle: topic.title,
      chapterId: chapters[0].id,
      chapterTitle: chapters[0].title,
      mode: current.kind,
      scope,
    },
    destination: {
      kind: "practice-group",
      questionId: currentId,
      title: current.title,
      isReplacement: currentId !== original.exerciseId,
    },
  };
}

/** A read-only view of the latest learner selections, with no diagnosis. */
export function projectReviewFocus(
  state: FaultProgress,
): readonly ReviewFocusItem[] {
  return latestCorrections(state)
    .filter((entry) => entry.revisit)
    .sort(
      (a, b) =>
        b.submittedAt.localeCompare(a.submittedAt) || b.id.localeCompare(a.id),
    )
    .map((entry) => reviewFocusItem(state, entry));
}

export type PreparedReviewFocusPractice = Readonly<{
  state: FaultProgress;
  href: string;
}>;

/** Call inside the current records updater; navigation is not review completion. */
export function prepareReviewFocusPractice(
  state: FaultProgress,
  correctionId: string,
  at: string,
): PreparedReviewFocusPractice | null {
  if (!Number.isFinite(Date.parse(at))) return null;
  const correction = latestCorrections(state).find(
    (entry) => entry.id === correctionId && entry.revisit,
  );
  if (!correction) return null;
  const item = reviewFocusItem(state, correction);
  if (!item.destination) return null;
  let next: FaultProgress;
  let href: string;
  if (item.destination.kind === "assessment-run") {
    // A saved focus names one question. Move only its run's reading position;
    // do not settle another paper or change submitted answers.
    const selected = selectAssessment(state, item.destination.runId);
    const cursor = item.destination.questionNumber - 1;
    next = {
      ...selected,
      updatedAt: at,
      assessments: {
        ...selected.assessments!,
        cursor,
        cursors: {
          ...assessmentCursors(selected),
          [item.destination.runId]: cursor,
        },
      },
    };
    href = assessmentRunHref(
      item.destination.runId,
      assessmentPaper(item.destination.paperId),
    );
  } else {
    const initialized = initializePractice(state);
    const mode = item.location!.mode;
    next = visitPractice(
      {
        ...initialized,
        practice: {
          ...initialized.practice!,
          mode,
          ended: { ...initialized.practice!.ended, [mode]: false },
        },
      },
      item.destination.questionId,
      at,
    );
    const questionId = item.destination.questionId;
    const subject = practiceSubject(questionId);
    const reviewHref = civilProcedureReviewQuestion(questionId)
      ? civilProcedureReviewSetForQuestion(questionId)!.href
      : civilContractReviewQuestion(questionId)
        ? civilContractReviewHref
        : null;
    if (
      subject === "civil-law" ||
      subject === "civil-procedure" ||
      subject === "criminal-procedure" ||
      subject === "administrative-law" ||
      subject === "commercial-law" ||
      isRemainingG6Subject(subject)
    ) {
      if (
        next.exerciseId !== questionId ||
        practiceSubject(next.exerciseId) !== subject
      )
        return null;
      href = `${reviewHref ?? practiceSubjectInfo(subject).href}&question=${encodeURIComponent(questionId)}`;
    } else href = "/lab/practice";
  }
  // Keep the original objects and their raw text; parsing only validates the move.
  return progressSchema.safeParse(next).success ? { state: next, href } : null;
}
