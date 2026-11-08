import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { corePracticeSubjects } from "../content/core-practice-sections";
import {
  contentPacks,
  exerciseFor,
  exerciseRevision,
} from "../content/fault-catalog";
import {
  practiceTopic,
  currentPracticeId,
  subjectPracticeQueues,
} from "../content/practice-set";
import { assessmentPaper } from "../content/assessment-papers";
import {
  startAssessment,
  editAssessment,
  finishAssessment,
} from "./assessment";
import { correctChoices } from "./objective-answer";
import { practiceReferenceQuestionIds } from "./reference-exposure";
import {
  freshDraft,
  freshProgress,
  progressSchema,
  type FaultProgress,
  type UnitAttempt,
} from "./fault-progress";
import { prepareCurrentQuestionFeedback } from "../evaluation/registered-question-feedback-task";
import {
  prepareRegisteredDirectTeaching,
  presentRegisteredDirectTeaching,
} from "../evaluation/registered-direct-teaching";
import { validateUnitFeedbackResult } from "../evaluation/unit-feedback-contract";
import { unitDigest } from "../evaluation/unit-feedback-storage";
import { recordSubmittedFeedback } from "./submitted-feedback";
import {
  learningQuestionHref,
  projectLearningProfile,
} from "./learning-profile";
import { LearningOverview } from "../app/records/learning-overview";

// Entirely hand-authored offline records. They establish data/UX contracts, never legal or model accuracy.
const time = (n = 0) =>
  new Date(Date.parse("2026-11-03T02:00:00Z") + n * 1000).toISOString();
const network = vi.fn(() => {
  throw Error("G10 offline: no model/network allowed");
});
beforeEach(() => {
  vi.stubGlobal("fetch", network);
  network.mockClear();
});
afterEach(() => {
  expect(network).not.toHaveBeenCalled();
  vi.unstubAllGlobals();
});
function original(
  id: string,
  questionId: string,
  n = 0,
  changes: Partial<UnitAttempt> = {},
): UnitAttempt {
  const q = exerciseFor(questionId)!;
  return {
    id,
    exerciseId: questionId,
    revision: exerciseRevision(questionId),
    choice: q.kind === "objective" ? correctChoices(q).join(",") : "",
    answer:
      q.kind === "subjective" ? `【离线虚构${id}】只检验保存与读取。` : "",
    hintUsed: false,
    referenceSeenBeforeAnswer: false,
    submittedAt: time(n),
    reasoningAssessment: "not_evaluated",
    ...changes,
  };
}
function feedback(state: FaultProgress, n: number, statuses: string[]) {
  const attempt = original(
    `offline-written-${n}`,
    currentPracticeId("cl05-limit-context"),
    n,
  );
  const task = prepareCurrentQuestionFeedback(
    {
      exerciseId: attempt.exerciseId,
      exerciseRevision: attempt.revision,
      attemptId: attempt.id,
      answer: attempt.answer,
      choice: "",
    },
    { readOnlyHistorical: true },
  ).task;
  const raw = {
    caseId: attempt.exerciseId,
    caseRevision: attempt.revision,
    answerId: attempt.id,
    status: "assessed",
    substantiveIssue: "",
    terminologyIssue: "",
    clarification: statuses.includes("uncertain")
      ? "【离线】本处尚待确认。"
      : "",
    studentResponse: "【离线手写讲解】这是软件测试材料。",
    criteria: task.input.criteria.map((c, i) => ({
      id: c.id,
      status: statuses[i] ?? "covered",
      evidence: statuses[i] === "missing" ? [] : [attempt.answer],
      reason: "【离线】此项是固定测试判断。",
    })),
  };
  const result = validateUnitFeedbackResult({
    version: "unit-feedback-v1",
    id: unitDigest(raw),
    createdAt: time(n + 1),
    source: "real_provider",
    purpose: "practice",
    receipt: {
      responseId: `offline-never-api-${n}`,
      receiptHash: unitDigest(raw),
    },
    view: presentRegisteredDirectTeaching(
      task,
      JSON.stringify(raw),
      prepareRegisteredDirectTeaching(task),
    ).feedback,
  });
  return {
    state: recordSubmittedFeedback(
      { ...state, attempts: [...state.attempts, attempt] },
      attempt.id,
      result,
      time(n + 2),
    ),
    attempt,
    result,
  };
}
function freeze<T>(input: T): T {
  if (input && typeof input === "object") {
    Object.freeze(input);
    for (const value of Object.values(input)) freeze(value);
  }
  return input;
}

it("projects all ten subjects and keeps reading/rendering side-effect free", () => {
  const state = freshProgress();
  for (const [index, subject] of corePracticeSubjects.entries())
    state.attempts.push(
      original(
        `offline-${subject}`,
        subjectPracticeQueues(subject).objective[0],
        index,
      ),
    );
  const snapshot = JSON.stringify(state);
  freeze(state);
  const profile = projectLearningProfile(state, time(100));
  expect(profile.subjects).toHaveLength(10);
  expect(profile.subjects.every((s) => s.answered === 1)).toBe(true);
  expect(
    profile.questions.every((q) => q.latest.outcome === "answered_well"),
  ).toBe(true);
  const html = renderToStaticMarkup(<LearningOverview state={state} />);
  expect(html).toContain("我的学习");
  expect(html).toContain("10</strong> 题已练");
  expect(html).not.toContain("掌握率");
  expect(JSON.stringify(state)).toBe(snapshot);
});
it("compares multi-select answers as sets, clears the current weakness after correction, and retains old originals", () => {
  const qid = "g8-types-minor-camera-multiple",
    q = exerciseFor(qid)!;
  const wrong = q.options!.find((o) => !correctChoices(q).includes(o.id))!.id;
  const state = {
    ...freshProgress(),
    attempts: [
      original("wrong", qid, 0, { choice: wrong }),
      original("right", qid, 10, {
        choice: [...correctChoices(q)].reverse().join(","),
      }),
    ],
  };
  const profile = projectLearningProfile(state, time(100));
  expect(profile.history.map((h) => h.outcome)).toEqual([
    "answered_well",
    "needs_practice",
  ]);
  expect(profile.questions[0]).toMatchObject({
    attempts: 2,
    wrongAttempts: 1,
    latest: { support: "reanswer", outcome: "answered_well" },
  });
  expect(
    profile.subjects.find((s) => s.id === "civil-law")?.needsPractice,
  ).toBe(0);
  expect(state.attempts[0].choice).toBe(wrong);
});
it("keeps matching subjective evidence, repeated omissions and original quotes without grading again", () => {
  const first = feedback(freshProgress(), 0, ["covered", "missing", "covered"]);
  const second = feedback(first.state, 10, ["covered", "missing", "covered"]);
  const snapshot = JSON.stringify(second.state);
  const p = projectLearningProfile(freeze(second.state), time(100));
  expect(p.questions[0].latest.outcome).toBe("needs_practice");
  expect(p.questions[0].repeatedPoints).toHaveLength(1);
  expect(p.questions[0].repeatedPoints[0].count).toBe(2);
  expect(p.history[0].feedback?.id).toBe(second.result.id);
  expect(JSON.stringify(second.state)).toBe(snapshot);
  const html = renderToStaticMarkup(
    <LearningOverview
      state={second.state}
      initialAttempt={second.attempt.id}
    />,
  );
  expect(html).toContain(second.attempt.answer);
  expect(html).toContain("离线手写讲解");
});
it("does not carry an old wrong feedback onto a new unreviewed answer, and never counts uncertain or synthetic feedback as wrong", () => {
  const first = feedback(freshProgress(), 0, ["missing", "covered", "covered"]);
  const unreviewed = {
    ...first.state,
    attempts: [
      ...first.state.attempts,
      original("new-no-review", first.attempt.exerciseId, 10),
    ],
  };
  expect(
    projectLearningProfile(unreviewed, time(100)).questions[0].latest,
  ).toMatchObject({ outcome: "unreviewed", points: [] });
  const pending = feedback(freshProgress(), 0, [
    "uncertain",
    "covered",
    "covered",
  ]);
  expect(
    projectLearningProfile(pending.state, time(100)).questions[0].latest
      .outcome,
  ).toBe("pending");
  const forged = structuredClone(first.state);
  forged.submittedFeedback![0].result.source = "offline_test";
  expect(
    projectLearningProfile(forged, time(100)).questions[0].latest.outcome,
  ).toBe("pending");
  const mismatched = structuredClone(first.state);
  mismatched.submittedFeedback![0].answer = "不同原答";
  expect(
    projectLearningProfile(mismatched, time(100)).questions[0].latest.outcome,
  ).toBe("pending");
});
it("retains old versions without applying new rules and keeps ambiguous equal-time originals pending", () => {
  const qid = subjectPracticeQueues("civil-law").objective[0];
  const older = contentPacks.find(
    (p) => p.revision !== exerciseRevision(qid),
  )!.revision;
  const state = {
    ...freshProgress(),
    attempts: [
      original("old", qid, 0, { revision: older }),
      original("amb-a", qid, 10, { choice: "a" }),
      original("amb-b", qid, 10, { choice: "b" }),
    ],
  };
  const p = projectLearningProfile(state, time(100));
  expect(p.history.find((h) => h.attempt.id === "old")?.outcome).toBe(
    "historical",
  );
  expect(p.questions[0].latest.outcome).toBe("pending");
  expect(p.subjects.find((s) => s.id === "civil-law")?.needsPractice).toBe(0);
});
it("distinguishes hints and other subquestions from independent first answers", () => {
  const qid = "cl05-limit-context",
    same = practiceReferenceQuestionIds(qid).find((id) => id !== qid)!;
  const state = {
    ...freshProgress(),
    attempts: [
      original("first", same, 0, { hintUsed: true }),
      original("same-case", qid, 10),
    ],
  };
  const p = projectLearningProfile(state, time(100));
  expect(p.history.find((h) => h.attempt.id === "first")?.support).toBe(
    "assisted",
  );
  expect(p.history[0].support).toBe("reanswer");
});
it("keeps ordinary drafts and exact paper drafts separate, and returns submitted paper answers to that run", () => {
  const paper = assessmentPaper("g8-writing-civil-complaint")!;
  const qid = paper.questionIds[0];
  let state = startAssessment(
    freshProgress(),
    paper.id,
    "offline-paper",
    time(),
  );
  state = editAssessment(
    state,
    qid,
    { answer: "【离线】未写完的文书。" },
    time(1),
  );
  state = {
    ...state,
    drafts: { [qid]: { ...freshDraft(), answer: "【离线】普通练习草稿。" } },
  };
  let p = projectLearningProfile(state, time(100));
  expect(p.drafts).toHaveLength(2);
  expect(p.drafts.find((d) => d.kind === "assessment")?.href).toContain(
    "run=offline-paper",
  );
  expect(p.drafts.find((d) => d.kind === "question")?.href).toContain(
    "/lab/practice?",
  );
  expect(learningQuestionHref(state, qid)).not.toContain("run=");
  state = finishAssessment(state, "offline-paper", time(10));
  p = projectLearningProfile(state, time(100));
  expect(p.history[0].href).toContain("run=offline-paper");
  expect(p.history[0].knowledgeHref).toContain(
    encodeURIComponent(practiceTopic(qid).id),
  );
  expect(progressSchema.safeParse(state).success).toBe(true);
});
