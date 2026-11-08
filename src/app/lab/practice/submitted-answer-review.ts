/** Immutable fields of the original attempt, including untrimmed answer text. */
export type SubmittedAnswer = Readonly<{
  id: string;
  exerciseId: string;
  revision: string;
  answer: string;
  choice: string;
}>;

/** Issued only after this exact original was durably saved at the stated destination. */
export type OriginalSaveAcknowledgement = Readonly<{
  status: "saved";
  storage: "local" | "account";
  original: SubmittedAnswer;
}>;
export type FeedbackSaveAcknowledgement = OriginalSaveAcknowledgement &
  Readonly<{ feedbackId: string }>;
export type SubmittedAnswerFeedback<T> = Readonly<{ id: string; value: T }>;

/** Feedback uses the verified receipt identity; ready must bind the exact lookup request. */
export type SubmittedAnswerReviewReply<T> =
  | Readonly<{
      status: "feedback";
      original: SubmittedAnswer;
      feedback: SubmittedAnswerFeedback<T>;
    }>
  | Readonly<{
      status: "ready";
      original: SubmittedAnswer;
      canSubmit: true;
    }>
  | Readonly<{
      status: "blocked";
      original: SubmittedAnswer;
      message: string;
    }>;

export type SubmittedAnswerReviewFailure =
  | "invalid_original"
  | "original_changed"
  | "original_not_saved"
  | "request_failed"
  | "review_identity"
  | "review_unavailable"
  | "retry_not_allowed"
  | "feedback_not_saved";
export type SubmittedAnswerReviewOutcome<T> =
  | Readonly<{
      status: "saved";
      original: SubmittedAnswer;
      feedback: SubmittedAnswerFeedback<T>;
    }>
  | Readonly<{
      status: "failed";
      original: SubmittedAnswer;
      reason: SubmittedAnswerReviewFailure;
      message?: string;
      feedback?: SubmittedAnswerFeedback<T>;
    }>;
export type SubmittedAnswerReviewState<T> =
  | SubmittedAnswerReviewOutcome<T>
  | Readonly<{
      status: "saving_original" | "saving_feedback";
      original: SubmittedAnswer;
    }>
  | Readonly<{
      status: "reviewing";
      original: SubmittedAnswer;
      action: "submit" | "lookup";
    }>;

export type SubmittedAnswerReviewPorts<T> = {
  /** Account acknowledgements require the corresponding server checkpoint, not update/flush returns. */
  confirmOriginalSaved(
    original: SubmittedAnswer,
  ): Promise<OriginalSaveAcknowledgement | null>;
  /** Reuses the server's stable task identity, intent and locks; no fresh review nonce. */
  requestReview(
    original: SubmittedAnswer,
    action: "submit" | "lookup",
  ): Promise<SubmittedAnswerReviewReply<T>>;
  saveFeedback(
    original: SubmittedAnswer,
    feedback: SubmittedAnswerFeedback<T>,
  ): Promise<FeedbackSaveAcknowledgement | null>;
  onStateChange?(state: SubmittedAnswerReviewState<T>): void;
};

function capture(original: SubmittedAnswer): SubmittedAnswer {
  return Object.freeze({
    id: original.id,
    exerciseId: original.exerciseId,
    revision: original.revision,
    answer: original.answer,
    choice: original.choice,
  });
}
function sameOriginal(original: SubmittedAnswer, candidate: unknown) {
  if (!candidate || typeof candidate !== "object") return false;
  const value = candidate as Record<string, unknown>;
  return (
    value.id === original.id &&
    value.exerciseId === original.exerciseId &&
    value.revision === original.revision &&
    value.answer === original.answer &&
    value.choice === original.choice
  );
}
function saved(
  acknowledgement: unknown,
  original: SubmittedAnswer,
  feedbackId?: string,
) {
  if (!acknowledgement || typeof acknowledgement !== "object") return false;
  const value = acknowledgement as Record<string, unknown>;
  return (
    value.status === "saved" &&
    ["local", "account"].includes(value.storage as string) &&
    sameOriginal(original, value.original) &&
    (feedbackId === undefined || value.feedbackId === feedbackId)
  );
}
function copyFeedback<T>(feedback: SubmittedAnswerFeedback<T>) {
  return Object.freeze({
    id: feedback.id,
    value: structuredClone(feedback.value),
  });
}

/**
 * Create per record owner. Invoke submit/retry only for explicit user actions;
 * mount, refresh and history restoration remain lookup-only outside this helper.
 * This local single-flight guard complements, and never replaces, server intents.
 */
export function createSubmittedAnswerReview<T>(
  ports: SubmittedAnswerReviewPorts<T>,
) {
  type Entry = {
    original: SubmittedAnswer;
    storage?: "local" | "account";
    feedback?: SubmittedAnswerFeedback<T>;
    outcome?: SubmittedAnswerReviewOutcome<T>;
    flight?: Promise<SubmittedAnswerReviewOutcome<T>>;
  };
  const entries = new Map<string, Entry>();
  function notify(state: SubmittedAnswerReviewState<T>) {
    try {
      ports.onStateChange?.(Object.freeze(state));
    } catch {
      // Display failures cannot turn an acknowledged review into a new request.
    }
  }
  function finish(entry: Entry, outcome: SubmittedAnswerReviewOutcome<T>) {
    entry.outcome = Object.freeze(outcome);
    notify(entry.outcome);
    return entry.outcome;
  }
  function fail(
    entry: Entry,
    reason: SubmittedAnswerReviewFailure,
    message?: string,
  ) {
    return finish(entry, {
      status: "failed",
      original: entry.original,
      reason,
      ...(message ? { message } : {}),
      ...(entry.feedback ? { feedback: copyFeedback(entry.feedback) } : {}),
    });
  }
  async function persist(entry: Entry) {
    notify({ status: "saving_feedback", original: entry.original });
    const feedback = entry.feedback!;
    let acknowledgement: FeedbackSaveAcknowledgement | null;
    try {
      acknowledgement = await ports.saveFeedback(
        entry.original,
        copyFeedback(feedback),
      );
    } catch {
      return fail(entry, "feedback_not_saved");
    }
    if (
      !saved(acknowledgement, entry.original, feedback.id) ||
      (entry.storage === "account" && acknowledgement?.storage !== "account")
    )
      return fail(entry, "feedback_not_saved");
    return finish(entry, {
      status: "saved",
      original: entry.original,
      feedback: copyFeedback(feedback),
    });
  }
  async function accept(entry: Entry, reply: SubmittedAnswerReviewReply<T>) {
    if (!sameOriginal(entry.original, reply?.original))
      return fail(entry, "review_identity");
    if (
      reply.status !== "feedback" ||
      !reply.feedback ||
      typeof reply.feedback.id !== "string" ||
      !reply.feedback.id.trim() ||
      !("value" in reply.feedback)
    )
      return fail(
        entry,
        "review_unavailable",
        reply.status === "blocked" ? reply.message : undefined,
      );
    entry.feedback = copyFeedback(reply.feedback);
    return persist(entry);
  }
  async function run(entry: Entry, retry: boolean) {
    notify({ status: "saving_original", original: entry.original });
    let acknowledgement: OriginalSaveAcknowledgement | null;
    try {
      acknowledgement = await ports.confirmOriginalSaved(entry.original);
    } catch {
      return fail(entry, "original_not_saved");
    }
    if (!saved(acknowledgement, entry.original))
      return fail(entry, "original_not_saved");
    entry.storage = acknowledgement!.storage;
    // A receipt already obtained needs persistence only, never another model call.
    if (entry.feedback) return persist(entry);
    if (retry) {
      notify({
        status: "reviewing",
        original: entry.original,
        action: "lookup",
      });
      const permission = await ports.requestReview(entry.original, "lookup");
      if (!sameOriginal(entry.original, permission?.original))
        return fail(entry, "review_identity");
      if (permission.status === "feedback") return accept(entry, permission);
      if (permission.status !== "ready" || permission.canSubmit !== true)
        return fail(
          entry,
          "retry_not_allowed",
          permission.status === "blocked" ? permission.message : undefined,
        );
    }
    notify({ status: "reviewing", original: entry.original, action: "submit" });
    return accept(entry, await ports.requestReview(entry.original, "submit"));
  }
  function start(
    original: SubmittedAnswer,
    retry: boolean,
    received?: SubmittedAnswerFeedback<T>,
  ) {
    const captured = capture(original);
    if (
      ![captured.id, captured.exerciseId, captured.revision].every(
        (value) => typeof value === "string" && value.trim(),
      ) ||
      typeof captured.answer !== "string" ||
      typeof captured.choice !== "string" ||
      (!captured.answer.trim() && !captured.choice)
    )
      return Promise.resolve<SubmittedAnswerReviewOutcome<T>>({
        status: "failed",
        original: captured,
        reason: "invalid_original",
      });
    let entry = entries.get(captured.id);
    if (entry && !sameOriginal(entry.original, captured))
      return Promise.resolve<SubmittedAnswerReviewOutcome<T>>({
        status: "failed",
        original: captured,
        reason: "original_changed",
      });
    if (!entry) {
      entry = { original: captured };
      entries.set(captured.id, entry);
    }
    if (
      received &&
      (typeof received.id !== "string" ||
        !received.id.trim() ||
        !("value" in received) ||
        (entry.feedback &&
          JSON.stringify(entry.feedback) !== JSON.stringify(received)))
    )
      return Promise.resolve(fail(entry, "review_identity"));
    if (entry.flight) return entry.flight;
    // An explicit save of a verified, already-read receipt can never enter requestReview.
    if (received) entry.feedback = copyFeedback(received);
    if (entry.outcome && (!retry || entry.outcome.status === "saved"))
      return Promise.resolve(entry.outcome);
    const current = entry;
    // Install synchronously before any port runs, including the save acknowledgement.
    current.flight = Promise.resolve()
      .then(() => run(current, retry))
      .catch(() => fail(current, "request_failed"))
      .then((outcome) => {
        current.flight = undefined;
        return outcome;
      });
    return current.flight;
  }
  return {
    submit: (original: SubmittedAnswer) => start(original, false),
    retry: (original: SubmittedAnswer) => start(original, true),
    saveReceived: (
      original: SubmittedAnswer,
      feedback: SubmittedAnswerFeedback<T>,
    ) => start(original, true, feedback),
  };
}
