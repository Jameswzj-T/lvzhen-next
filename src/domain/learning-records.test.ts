import { expect, it, beforeEach, afterEach, vi } from "vitest";
import { corePracticeSubjects } from "../content/core-practice-sections";
import {
  assessmentPaper,
  assessmentPapers,
} from "../content/assessment-papers";
import { exerciseFor, exerciseRevision } from "../content/fault-catalog";
import { subjectPracticeQueues, practiceTopic } from "../content/practice-set";
import { correctChoices } from "./objective-answer";
import {
  freshDraft,
  freshProgress,
  progressSchema,
  type FaultProgress,
  type UnitAttempt,
} from "./fault-progress";
import { startAssessment, editAssessment } from "./assessment";
import { queryLearningRecords, learningInquiryHref } from "./learning-records";
import { ensureDailyLearningPlan } from "./daily-learning";
import { inquiryViewSchema } from "./question-inquiry";

// Authored software fixtures only; no real learner, model response, or provider request.
const at = "2026-11-04T02:00:00.000Z";
const network = vi.fn(() => {
  throw Error("learning foundation checks must stay offline");
});
beforeEach(() => {
  network.mockClear();
  vi.stubGlobal("fetch", network);
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date("2026-11-04T03:00:00.000Z"));
});
afterEach(() => {
  expect(network).not.toHaveBeenCalled();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});
function original(id: string, qid: string, index = 0): UnitAttempt {
  const q = exerciseFor(qid)!;
  return {
    id,
    exerciseId: qid,
    revision: exerciseRevision(qid),
    choice: q.kind === "objective" ? correctChoices(q).join(",") : "",
    answer: q.kind === "subjective" ? "【合成】只验证读取与保存。" : "",
    hintUsed: false,
    referenceSeenBeforeAnswer: false,
    reasoningAssessment: "not_evaluated",
    submittedAt: new Date(Date.parse(at) + index * 1000).toISOString(),
  };
}
function freeze<T>(input: T): T {
  if (input && typeof input === "object") {
    Object.freeze(input);
    for (const value of Object.values(input)) freeze(value);
  }
  return input;
}
function inquiry(qid: string, id = "offline-inquiry") {
  return {
    id,
    exerciseId: qid,
    exerciseRevision: exerciseRevision(qid),
    topicId: practiceTopic(qid).id,
    text: `【合成问题${id}】本题如何理解？`,
    createdAt: at,
  };
}
function explanation(i: ReturnType<typeof inquiry>) {
  return inquiryViewSchema.parse({
    version: "question-inquiry-v1",
    taskId: "a".repeat(64),
    kind: "explanation",
    explanation: "【合成已存解释】仅为界面数据。",
    uncertainty: "",
    basis: [],
    identity: {
      questionId: i.exerciseId,
      questionRevision: i.exerciseRevision,
      inquiryId: i.id,
      text: i.text,
    },
    completedAt: at,
    responseId: `offline-${i.id}`,
    sources: [],
  });
}
it.each(corePracticeSubjects)(
  "reads %s through the same interface without mixing other subjects or touching originals",
  (subject) => {
    const state = freshProgress();
    for (const id of corePracticeSubjects)
      state.attempts.push(
        original(`saved-${id}`, subjectPracticeQueues(id).objective[0]),
      );
    const snapshot = JSON.stringify(state);
    freeze(state);
    const view = queryLearningRecords(state, { subject });
    expect(view.summary.answered).toBe(1);
    expect(view.history).toHaveLength(1);
    expect(view.history[0].subject).toBe(subject);
    expect(view.topics.every((t) => t.subject === subject)).toBe(true);
    expect(JSON.stringify(state)).toBe(snapshot);
  },
);
it("preserves exact old originals while paging and opens a focused answer without borrowing it across scope", () => {
  const qid = subjectPracticeQueues("civil-law").objective[0],
    other = subjectPracticeQueues("criminal-law").objective[0];
  const state = {
    ...freshProgress(),
    attempts: [
      ...Array.from({ length: 25 }, (_, n) => original(`civil-${n}`, qid, -n)),
      original("other-scope", other, -100),
    ],
  };
  const view = queryLearningRecords(state, {
    subject: "civil-law",
    limit: 5,
    focusedAttemptId: "civil-24",
  });
  expect(view.history).toHaveLength(25);
  expect(view.visibleHistory).toHaveLength(6);
  expect(view.visibleHistory.some((h) => h.attempt.id === "civil-24")).toBe(
    true,
  );
  expect(view.hasMoreHistory).toBe(true);
  expect(
    queryLearningRecords(state, {
      subject: "civil-law",
      limit: 5,
      focusedAttemptId: "other-scope",
    }).visibleHistory,
  ).toHaveLength(5);
  expect(
    queryLearningRecords(state, { limit: NaN }).visibleHistory,
  ).toHaveLength(20);
});
it("locates a draft by its question knowledge even when that knowledge has no submitted answer", () => {
  const qid = subjectPracticeQueues("civil-procedure").subjective[0],
    topicId = practiceTopic(qid).id;
  const state = {
    ...freshProgress(),
    drafts: {
      [qid]: { ...freshDraft(), answer: "  【合成原草稿】\n空白保持。  " },
    },
  };
  const selected = queryLearningRecords(state, {
    subject: "civil-procedure",
    topicId,
  });
  expect(selected.summary.answered).toBe(0);
  expect(selected.drafts).toHaveLength(1);
  expect(selected.drafts[0].href).toContain(encodeURIComponent(qid));
  expect(
    queryLearningRecords(state, { subject: "criminal-law", topicId }).drafts,
  ).toHaveLength(0);
  expect(state.drafts[qid].answer).toBe("  【合成原草稿】\n空白保持。  ");
});
it("returns a saved inquiry to its original run and exact question, and refuses an unrelated or missing run", () => {
  const paper = assessmentPapers.find(
    (p) => !p.archived && p.questionIds.length > 2,
  )!;
  let state = startAssessment(freshProgress(), paper.id, "original-paper", at);
  const qid = paper.questionIds[2],
    q = exerciseFor(qid)!;
  state = editAssessment(
    state,
    qid,
    q.kind === "objective"
      ? { choice: correctChoices(q).join(",") }
      : { answer: "【合成】原训练中的答稿" },
    at,
  );
  const item = { ...inquiry(qid), originRunId: "original-paper" };
  const href = learningInquiryHref(state, item)!;
  expect(href).toContain("run=original-paper");
  expect(href).toContain("question=3");
  expect(
    learningInquiryHref(state, { ...item, originRunId: "not-saved" }),
  ).toBeNull();
  const unrelated = subjectPracticeQueues("international-law").objective.find(
    (id) => !paper.questionIds.includes(id),
  )!;
  expect(
    learningInquiryHref(state, { ...item, exerciseId: unrelated }),
  ).toBeNull();
  expect(
    learningInquiryHref(
      state,
      inquiry(subjectPracticeQueues("civil-law").objective[0]),
    ),
  ).toContain("/lab/practice?");
});
it("keeps paper-only inquiries in an owning paper and never redirects an unknown question to an unrelated practice", () => {
  const ordinary = new Set(
    corePracticeSubjects.flatMap((subject) => {
      const queue = subjectPracticeQueues(subject);
      return [...queue.objective, ...queue.subjective];
    }),
  );
  const paper = assessmentPapers.find(
    (p) => !p.archived && p.questionIds.some((id) => !ordinary.has(id)),
  )!;
  const qid = paper.questionIds.find((id) => !ordinary.has(id))!;
  const href = learningInquiryHref(freshProgress(), inquiry(qid))!;
  expect(href).toContain("/lab/assessment?paper=");
  expect(href).not.toContain("run=");
  expect(
    learningInquiryHref(freshProgress(), {
      ...inquiry(qid),
      exerciseId: "unknown-not-published",
    }),
  ).toBeNull();
});
it("shows only exact saved inquiry explanations; topic filters also apply to unsent questions", () => {
  const qid = subjectPracticeQueues("civil-law").subjective[0],
    other = subjectPracticeQueues("criminal-law").subjective[0],
    i = inquiry(qid);
  const state: FaultProgress = {
    ...freshProgress(),
    inquiries: [i, inquiry(other, "other")],
    inquiryExplanations: [explanation(i)],
    inquiryDraft: {
      text: "【合成未发问题】",
      exerciseId: other,
      topicId: practiceTopic(other).id,
    },
  };
  const snapshot = JSON.stringify(state);
  freeze(state);
  const view = queryLearningRecords(state, { subject: "civil-law" });
  expect(view.inquiries).toHaveLength(1);
  expect(view.inquiries[0].explanation?.explanation).toContain("合成已存解释");
  expect(view.inquiryDraft).toBeNull();
  expect(
    queryLearningRecords(state, { subject: "criminal-law" }).inquiryDraft?.text,
  ).toBe("【合成未发问题】");
  const changed = structuredClone(state);
  changed.inquiryExplanations![0].identity.text = "另一份问题";
  expect(
    queryLearningRecords(changed, { subject: "civil-law" }).inquiries[0]
      .explanation,
  ).toBeNull();
  expect(JSON.stringify(state)).toBe(snapshot);
});
it("keeps a daily snapshot when preference field order changes and remains compatible with existing backups", () => {
  const state = ensureDailyLearningPlan(
    freshProgress(),
    { minutes: 20, subject: "civil-law" },
    at,
  );
  const reordered = { subject: "civil-law" as const, minutes: 20 as const };
  expect(ensureDailyLearningPlan(state, reordered, at)).toBe(state);
  const before = JSON.stringify(state);
  queryLearningRecords(freeze(state));
  expect(JSON.stringify(state)).toBe(before);
  const restored = progressSchema.parse(JSON.parse(before));
  expect(restored.dailyLearningPlan).toEqual(state.dailyLearningPlan);
  expect(restored.learningPreferences).toEqual(state.learningPreferences);
});
