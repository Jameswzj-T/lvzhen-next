/** Local learning operation, never a replacement for saved model wording. */
export type TeacherPracticeHint = {
  source: "local_practice_guidance";
  text: string;
};
export const TEACHER_FEEDBACK_VERSION = "teacher-flight-feedback-20261007.v1";
export const TEACHER_QUESTION_ID = "cl14-flight-no-serious-result";
export const TEACHER_QUESTION_REVISION =
  "criminal-special-accidents-2026-10-04.v1";
export const TEACHER_GUIDE_CONTENT_ID =
  "33f05347959bd613d2241372ded4ab31bae292ed6ce593c3967e0540792fb2ea";
export const TEACHER_GUIDE_REFERENCE_FINGERPRINT =
  "7f7bf8f3f887cf184efa49652c45e2a730e2f8c108a6157e65019cf635104acc";

export type TeacherHistoryContext = {
  questionId: string;
  questionRevision: string;
  attemptId: string;
  /** Counts from saved events up to and including the current event, never drafts. */
  attemptCount: number;
  assessedAttemptCount: number;
  incorrectAttemptCount: number;
  partialAttemptCount: number;
  correctAttemptCount: number;
  unreviewedAttemptCount: number;
  currentWithSupport: boolean | "unknown";
  source: "saved_local_records" | "synthetic_fixture";
  countScope: "same_question_same_revision_through_current_attempt";
  evidenceAttemptIds: string[];
};

export type TeacherFeedbackView = {
  version:
    | typeof TEACHER_FEEDBACK_VERSION
    | "teacher-current-question-feedback-20261008.v1";
  binding: {
    questionId: string;
    questionRevision: string;
    answerId: string;
    resultId: string;
    contentId: string;
    taskId: string;
  };
  title: string;
  originalText: string;
  provenance: "model_feedback" | "offline_synthetic_preview";
  sourceNotice: string | null;
  judgment: {
    kind: "correct" | "partial" | "incorrect" | "needs_review";
    text: string;
    reason: string;
  };
  conclusion?: { state: string; quotes: string[]; explanation: string };
  /** Explicit review beside one exact saved explanation, never model-authored. */
  independentConclusionNote?: {
    source: "codex_independent";
    resultId: string;
    answerId: string;
    reviewedExplanation: string;
    text: string;
  };
  /** Exact independently reviewed fictional point; never replaces raw model state. */
  independentPointNote?: {
    source: "codex_independent";
    resultId: string;
    answerId: string;
    criterionId: string;
    reviewedExplanation: string;
    reviewedAction: string | null;
    originalConclusionState: string;
    explanation: string;
    action: string;
    text: string;
  };
  /** Read-only source-range warning, not a replacement for model judgments. */
  quoteScopeNotes?: {
    source: "local_quote_scope_check";
    resultId: string;
    answerId: string;
    criterionId: string;
    claimQuote: string;
    reasoningQuote: string;
  }[];
  rawOverall?: {
    kind: string;
    reason: string;
    origin?: "projected_model_decisions";
    adoptedForTeaching?: false;
  };
  strengths: {
    /** Public point label, not a new semantic summary. */
    label?: string;
    basis?: string;
    criterionId: string;
    quotes: string[];
    explanation: string;
  }[];
  improvements: {
    criterionId: string;
    quotes: string[];
    explanation: string;
    action: string;
    actionSource: "versioned_question_teaching_guide" | "model_feedback";
    practiceHint?: TeacherPracticeHint;
    basis?: string;
  }[];
  pending: {
    criterionId: string;
    quotes: string[];
    explanation: string;
    reviewNote?: string;
    confirmationAction?: string;
    practiceHint?: TeacherPracticeHint;
  }[];
  reference: { label: string; text: string; source: "question_reference" };
  history: { text: string; context: TeacherHistoryContext } | null;
  historyNotice: string | null;
  nextStep: {
    kind:
      | "review_evidence"
      | "whole_question_retry"
      | "independent_revisit"
      | "continue_topic";
    text: string;
  };
  /** Raw model explanations are preserved here; never overwritten by teaching guidance. */
  learningAdvice?: {
    text: string;
    priorAttemptIds: string[];
    scope: "same_question_same_revision_local_only";
    currentWithSupport: boolean | "unknown";
    /** Read-only comparison of saved feedback labels, not a new model or mastery judgment. */
    comparison?: {
      kind: "saved_feedback_change";
      previousAnswerId: string;
      previousResultId: string;
      currentAnswerId: string;
      currentResultId: string;
      points: { criterionId: string; label: string }[];
    };
  };
  rawPoints: {
    criterionId: string;
    status: "covered" | "partial" | "missing" | "contradicted" | "uncertain";
    quotes: string[];
    explanation: string;
  }[];
};
