"use client";
import { useEffect, useState } from "react";
import type { FaultProgress } from "@/domain/fault-progress";
import type { PracticeSubject } from "@/content/practice-set";
import {
  changeLearningPreferences,
  dailyLearningProgress,
  ensureDailyLearningPlan,
  learningDay,
  skipDailyLearningItem,
} from "@/domain/daily-learning";
import type { LearningPreferences } from "@/domain/daily-learning-schema";

export type DailyLearningControllerInput = {
  state: FaultProgress;
  ready: boolean;
  disabled: boolean;
  subject: PracticeSubject;
  update: (fn: (current: FaultProgress) => FaultProgress) => boolean;
};

/** Page-independent React adapter; the existing records owner still controls persistence. */
export function useDailyLearning({
  state,
  ready,
  disabled,
  subject,
  update,
}: DailyLearningControllerInput) {
  const [clock, setClock] = useState(() => new Date().toISOString());
  const [issue, setIssue] = useState("");
  const day = learningDay(clock);
  useEffect(() => {
    const refreshClock = () => setClock(new Date().toISOString());
    const timer = window.setInterval(refreshClock, 60_000);
    window.addEventListener("focus", refreshClock);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", refreshClock);
    };
  }, []);
  useEffect(() => {
    if (!ready || disabled) return;
    const preferences = state.learningPreferences ?? {
      minutes: 20 as const,
      subject,
    };
    if (
      state.dailyLearningPlan?.day === day &&
      state.dailyLearningPlan.preferences.minutes === preferences.minutes &&
      state.dailyLearningPlan.preferences.subject === preferences.subject
    )
      return;
    update((current) =>
      ensureDailyLearningPlan(
        current,
        current.learningPreferences ?? preferences,
        new Date().toISOString(),
      ),
    );
  }, [
    ready,
    disabled,
    day,
    subject,
    state.dailyLearningPlan,
    state.learningPreferences,
    update,
  ]);
  const plan =
    state.dailyLearningPlan?.day === day ? state.dailyLearningPlan : null;
  const preferences = state.learningPreferences ??
    plan?.preferences ?? { minutes: 20 as const, subject };
  const progress = plan ? dailyLearningProgress(plan, state) : null;
  function save(fn: (current: FaultProgress) => FaultProgress) {
    if (!ready || disabled) return false;
    const saved = update(fn);
    setIssue(saved ? "" : "这次安排还没保存，请先检查记录状态。");
    return saved;
  }
  return {
    plan,
    progress,
    preferences,
    issue,
    change: (next: LearningPreferences) =>
      save((current) =>
        changeLearningPreferences(current, next, new Date().toISOString()),
      ),
    skip: (itemId: string) =>
      save((current) =>
        skipDailyLearningItem(current, itemId, new Date().toISOString()),
      ),
  };
}
