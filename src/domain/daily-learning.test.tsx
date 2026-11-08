import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it, vi, afterEach, beforeEach } from "vitest";
import { exerciseFor, exerciseRevision } from "../content/fault-catalog";
import {
  practiceSubject,
  subjectPracticeQueues,
} from "../content/practice-set";
import {
  freshDraft,
  freshProgress,
  progressSchema,
  restoreProgress,
  type FaultProgress,
} from "./fault-progress";
import {
  buildDailyLearningPlan,
  changeLearningPreferences,
  dailyLearningProgress,
  ensureDailyLearningPlan,
  skipDailyLearningItem,
} from "./daily-learning";
import { planImport } from "../records/import-plan";
import { DailyLearning } from "../app/lab/_components/daily-learning";
import { correctChoices } from "./objective-answer";
const at = "2026-11-03T02:00:00.000Z",
  later = "2026-11-03T02:01:00.000Z",
  tomorrow = "2026-11-04T02:00:00.000Z";
const prefs = { minutes: 20 as const, subject: "civil-law" as const };
const net = vi.fn(() => {
  throw Error("offline-plan-no-network");
});
beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date("2026-11-03T02:02:00.000Z"));
  vi.stubGlobal("fetch", net);
  net.mockClear();
});
afterEach(() => {
  vi.useRealTimers();
  expect(net).not.toHaveBeenCalled();
  vi.unstubAllGlobals();
});
function submit(
  state: FaultProgress,
  id: string,
  n = "offline-daily-answer",
): FaultProgress {
  const q = exerciseFor(id)!;
  return {
    ...state,
    attempts: [
      ...state.attempts,
      {
        id: n,
        exerciseId: id,
        revision: exerciseRevision(id),
        choice: q.kind === "objective" ? correctChoices(q).join(",") : "",
        answer: q.kind === "subjective" ? "【离线】只验证计划完成条件。" : "",
        hintUsed: false,
        referenceSeenBeforeAnswer: false,
        submittedAt: later,
        reasoningAssessment: "not_evaluated",
      },
    ],
  };
}
it("offers a small optional scoped plan; refreshing and submission do not replace its tasks", () => {
  const state = ensureDailyLearningPlan(freshProgress(), prefs, at),
    plan = state.dailyLearningPlan!;
  expect(plan.items).toHaveLength(3);
  expect(
    plan.items.every((i) => practiceSubject(i.questionId) === "civil-law"),
  ).toBe(true);
  expect(ensureDailyLearningPlan(state, prefs, later)).toBe(state);
  const saved = submit(state, plan.items[0].questionId);
  expect(dailyLearningProgress(plan, saved, later).completed).toBe(1);
  expect(ensureDailyLearningPlan(saved, prefs, later).dailyLearningPlan).toBe(
    plan,
  );
  expect(
    restoreProgress(JSON.stringify(saved)).state?.dailyLearningPlan,
  ).toEqual(plan);
  const html = renderToStaticMarkup(
    <DailyLearning
      state={saved}
      ready
      disabled={false}
      subject="civil-law"
      update={() => true}
    />,
  );
  expect(html).toContain("今天，从这里继续");
  expect(html).toContain("自己选题");
  expect(html).toContain("已作答");
});
it("prioritizes a retained draft; skipping, changing preferences, and a new day never rewrite answers", () => {
  const qid = subjectPracticeQueues("civil-law").subjective[0];
  const original = {
    ...freshProgress(),
    drafts: { [qid]: { ...freshDraft(), answer: "【离线】要保留的草稿" } },
  };
  const state = ensureDailyLearningPlan(original, prefs, at),
    plan = state.dailyLearningPlan!;
  expect(plan.items[0]).toMatchObject({ kind: "continue", questionId: qid });
  const skipped = skipDailyLearningItem(state, plan.items[0].id, later);
  expect(
    dailyLearningProgress(skipped.dailyLearningPlan!, skipped, later).skipped,
  ).toBe(1);
  expect(
    skipDailyLearningItem(skipped, plan.items[0].id, later).dailyLearningPlan
      ?.items[0].skipped,
  ).toBe(false);
  const next = changeLearningPreferences(
    skipped,
    { minutes: 10, subject: "criminal-procedure" },
    later,
  );
  expect(next.dailyLearningPlan?.items).toHaveLength(2);
  expect(next.drafts).toBe(original.drafts);
  const newDay = ensureDailyLearningPlan(skipped, prefs, tomorrow);
  expect(newDay.dailyLearningPlan?.day).not.toBe(plan.day);
  expect(newDay.drafts).toBe(original.drafts);
});
it("does not call old or future submissions today's completion and offers mixed subjects for all-subject scope", () => {
  const state = ensureDailyLearningPlan(
      freshProgress(),
      { minutes: 30, subject: "all" },
      at,
    ),
    plan = state.dailyLearningPlan!;
  expect(
    new Set(plan.items.map((i) => practiceSubject(i.questionId))).size,
  ).toBe(4);
  const answered = submit(state, plan.items[0].questionId);
  expect(dailyLearningProgress(plan, answered, at).completed).toBe(0);
  answered.attempts[0].submittedAt = "2026-11-02T02:00:00.000Z";
  expect(dailyLearningProgress(plan, answered, later).completed).toBe(0);
});
it("exports and imports preferences and a plan, preserving current preferences and immutable originals on merge", () => {
  const state = ensureDailyLearningPlan(freshProgress(), prefs, at);
  const raw = JSON.parse(JSON.stringify(state));
  expect(progressSchema.safeParse(raw).success).toBe(true);
  expect(planImport(null, raw).state.dailyLearningPlan).toEqual(
    state.dailyLearningPlan,
  );
  const merged = planImport(freshProgress(), raw).state;
  expect(merged.learningPreferences).toEqual(prefs);
  const other = changeLearningPreferences(
    freshProgress(),
    { minutes: 10, subject: "theory-law" },
    at,
  );
  const kept = planImport(other, raw).state;
  expect(kept.learningPreferences).toEqual(other.learningPreferences);
  expect(kept.dailyLearningPlan).toEqual(other.dailyLearningPlan);
  expect(JSON.stringify(raw)).not.toMatch(
    /apiKey|DEEPSEEK_API_KEY|QWEN_API_KEY/,
  );
});
