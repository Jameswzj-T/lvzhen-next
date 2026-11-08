import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  faultStorageKey,
  freshDraft,
  freshProgress,
  progressSchema,
  restoreProgress,
  type FaultProgress,
} from "@/domain/fault-progress";
import {
  exerciseFor,
  exerciseRevision,
  topicRevision,
} from "@/content/fault-catalog";
import { practiceTopic, subjectPracticeQueues } from "@/content/practice-set";
import { assessmentPapers } from "@/content/assessment-papers";
import {
  currentAssessment,
  editAssessment,
  navigateAssessment,
  selectAssessment,
  startAssessment,
} from "@/domain/assessment";
import {
  dailyLearningProgress,
  ensureDailyLearningPlan,
} from "@/domain/daily-learning";
import {
  commitLocalRecordImport,
  previewLocalRecordImport,
} from "@/records/local-record-import";
import { resumePracticeSubject, visitPractice } from "@/domain/practice";

const at = "2026-11-04T02:00:00.000Z";
const later = "2026-11-04T02:03:00.000Z";
const queues = subjectPracticeQueues("civil-law");
const answerQuestion = queues.subjective[0];
const draftQuestion = queues.subjective[1];
const extraDraftQuestion = queues.subjective[2];
const topicId = practiceTopic(answerQuestion).id;
const prefs = { minutes: 20 as const, subject: "civil-law" as const };

type Write = { key: string; value: string };
function memoryStorage(initial: [string, string][] = []) {
  const values = new Map(initial);
  const writes: Write[] = [];
  const storage = {
    getItem(key: string) {
      return values.get(key) ?? null;
    },
    setItem(key: string, value: string) {
      writes.push({ key, value });
      values.set(key, value);
    },
  };
  return { values, writes, storage };
}
function fixture(label: string): FaultProgress {
  const base = resumePracticeSubject(
    freshProgress(),
    "civil-law",
    at,
    "subjective",
  );
  const attemptId = `${label}-attempt`;
  const state: FaultProgress = {
    ...base,
    updatedAt: at,
    step: "practice",
    attempts: [
      {
        id: attemptId,
        exerciseId: answerQuestion,
        revision: exerciseRevision(answerQuestion),
        choice: "",
        answer: `【合成原答 ${label}】  首行\n第二行，保留标点。  `,
        hintUsed: false,
        referenceSeenBeforeAnswer: false,
        submittedAt: at,
        reasoningAssessment: "not_evaluated",
      },
    ],
    drafts: {
      [draftQuestion]: {
        ...freshDraft(),
        answer: `【合成草稿 ${label}】\n未完成  `,
      },
    },
    reviews: [
      {
        id: `${label}-recall`,
        topicId,
        revision: topicRevision(topicId),
        answer: `【合成回忆原文 ${label}】`,
        referenceSeenBeforeAnswer: false,
        selfReport: "again",
        submittedAt: at,
      },
    ],
    recallDrafts: {
      [topicId]: { ...freshDraft(), answer: `【合成回忆草稿 ${label}】` },
    },
    corrections: [
      {
        id: `${label}-correction`,
        attemptId,
        submittedAt: at,
        note: `【合成订正笔记 ${label}】`,
        answer: `【合成订正原文 ${label}】`,
        revisit: true,
      },
    ],
    correctionDrafts: {
      [attemptId]: {
        note: `【合成订正草稿 ${label}】`,
        answer: "待补充  ",
        revisit: false,
      },
    },
    inquiries: [
      {
        id: `${label}-inquiry`,
        text: `【合成已存疑问 ${label}】\n保留原文`,
        createdAt: at,
      },
    ],
    inquiryDraft: {
      text: `【合成疑问草稿 ${label}】  `,
      exerciseId: draftQuestion,
    },
    practice: {
      ...base.practice!,
      viewed: { [draftQuestion]: at },
      knowledgeViewed: { [topicId]: at },
      subjectPositions: {
        "criminal-law": {
          mode: "objective",
          cursors: {
            objective: subjectPracticeQueues("criminal-law").objective[2],
            subjective: subjectPracticeQueues("criminal-law").subjective[2],
          },
          ended: { objective: false, subjective: false },
        },
      },
    },
  };
  return progressSchema.parse(ensureDailyLearningPlan(state, prefs, at));
}
function loadStored(raw: string | null) {
  expect(raw).not.toBeNull();
  return progressSchema.parse(JSON.parse(raw!));
}

const network = vi.fn(() => {
  throw Error("independent_offline_network_forbidden");
});
beforeEach(() => {
  network.mockClear();
  vi.stubGlobal("fetch", network);
});
afterEach(() => {
  expect(network).not.toHaveBeenCalled();
  vi.unstubAllGlobals();
});

describe("G11 independent browser-local recovery with synthetic records", () => {
  it("restores the complete checkpoint in a fresh browser and retains a complete source copy", () => {
    const paper = assessmentPapers.find(
      (p) => !p.archived && p.minutes === null && p.questionIds.length >= 4,
    )!;
    let source = startAssessment(
      fixture("source"),
      paper.id,
      "synthetic-imported-run",
      at,
    );
    source = navigateAssessment(source, 3, later);
    source = progressSchema.parse(source);
    const originalSource = structuredClone(source);
    const m = memoryStorage();
    const preview = previewLocalRecordImport(m.storage, source);
    expect(m.writes).toEqual([]);
    expect(preview.plan).toMatchObject({
      addedAnswers: 1,
      addedRecalls: 1,
      addedCorrections: 1,
      differingDrafts: 0,
    });
    const result = commitLocalRecordImport(m.storage, preview, "fresh");
    const restored = loadStored(m.storage.getItem(faultStorageKey));
    expect(restored).toEqual(originalSource);
    expect(restoreProgress(m.storage.getItem(faultStorageKey)).status).toBe(
      "loaded",
    );
    expect(result.state).toEqual(originalSource);
    expect(result.copyKeys).toEqual([
      `${faultStorageKey}:recovery:fresh-source`,
    ]);
    expect(loadStored(m.storage.getItem(result.copyKeys[0]))).toEqual(
      originalSource,
    );
    expect(source).toEqual(originalSource);
    expect(m.writes.map((w) => w.key)).toEqual([
      result.copyKeys[0],
      faultStorageKey,
    ]);
  });

  it("a home-page automatic placeholder does not displace the backup position or preferences", () => {
    const placeholder = {
      ...ensureDailyLearningPlan(
        freshProgress(),
        { minutes: 10, subject: "theory-law" },
        later,
      ),
      updatedAt: later,
    };
    const before = JSON.stringify(progressSchema.parse(placeholder), null, 2);
    const source = fixture("before-first-visit");
    const m = memoryStorage([[faultStorageKey, before]]);
    const preview = previewLocalRecordImport(m.storage, source);
    expect(preview.restoresPosition).toBe(true);
    expect(m.writes).toEqual([]);
    const result = commitLocalRecordImport(m.storage, preview, "placeholder");
    expect(loadStored(m.storage.getItem(faultStorageKey))).toEqual(source);
    expect(result.state.topicId).toBe(source.topicId);
    expect(result.state.exerciseId).toBe(source.exerciseId);
    expect(result.state.learningPreferences).toEqual(
      source.learningPreferences,
    );
    expect(result.state.dailyLearningPlan).toEqual(source.dailyLearningPlan);
    expect(
      m.storage.getItem(`${faultStorageKey}:recovery:placeholder-before`),
    ).toBe(before);
    expect(
      loadStored(
        m.storage.getItem(`${faultStorageKey}:recovery:placeholder-source`),
      ),
    ).toEqual(source);
  });

  it("merges histories while local drafts, preferences, plan, and position win; both complete copies remain", () => {
    const current = fixture("local");
    let source = fixture("file");
    source.drafts[extraDraftQuestion] = {
      ...freshDraft(),
      answer: "【合成】来源独有草稿",
    };
    // Share an immutable parent so correction-draft preference is exercised too.
    source.attempts.push(structuredClone(current.attempts[0]));
    source.correctionDrafts[current.attempts[0].id] = {
      note: "【合成】来源对同一原答的草稿",
      answer: "来源",
      revisit: true,
    };
    source.learningPreferences = { minutes: 10, subject: "all" };
    source.dailyLearningPlan = {
      ...source.dailyLearningPlan!,
      preferences: source.learningPreferences,
    };
    source = visitPractice(source, extraDraftQuestion, at);
    const before = JSON.stringify(current, null, 2);
    const sourceBefore = structuredClone(progressSchema.parse(source));
    const m = memoryStorage([[faultStorageKey, before]]);
    const preview = previewLocalRecordImport(m.storage, source);
    expect(preview.restoresPosition).toBe(false);
    expect(preview.plan.differingDrafts).toBe(4);
    const result = commitLocalRecordImport(m.storage, preview, "merge");
    const restored = loadStored(m.storage.getItem(faultStorageKey));
    expect(restored.attempts).toHaveLength(2);
    expect(restored.reviews).toHaveLength(2);
    expect(restored.corrections).toHaveLength(2);
    expect(restored.inquiries).toHaveLength(2);
    expect(restored.attempts).toEqual(expect.arrayContaining(current.attempts));
    expect(restored.attempts).toEqual(
      expect.arrayContaining(sourceBefore.attempts),
    );
    expect(restored.drafts[draftQuestion]).toEqual(
      current.drafts[draftQuestion],
    );
    expect(restored.drafts[extraDraftQuestion]).toEqual(
      sourceBefore.drafts[extraDraftQuestion],
    );
    expect(restored.recallDrafts[topicId]).toEqual(
      current.recallDrafts[topicId],
    );
    expect(restored.correctionDrafts[current.attempts[0].id]).toEqual(
      current.correctionDrafts[current.attempts[0].id],
    );
    expect(restored.inquiryDraft).toEqual(current.inquiryDraft);
    expect(restored.learningPreferences).toEqual(current.learningPreferences);
    expect(restored.dailyLearningPlan).toEqual(current.dailyLearningPlan);
    expect(restored.practice!.cursors).toEqual(current.practice!.cursors);
    expect(restored.topicId).toBe(current.topicId);
    expect(restored.exerciseId).toBe(current.exerciseId);
    expect(m.storage.getItem(`${faultStorageKey}:recovery:merge-before`)).toBe(
      before,
    );
    expect(
      loadStored(m.storage.getItem(`${faultStorageKey}:recovery:merge-source`)),
    ).toEqual(sourceBefore);
    expect(result.copyKeys).toHaveLength(2);
    expect(m.writes.map((w) => w.key)).toEqual([
      ...result.copyKeys,
      faultStorageKey,
    ]);
    expect(source).toEqual(sourceBefore);
  });

  it("does not overwrite a record changed by another tab after preview", () => {
    const before = JSON.stringify(fixture("local"));
    const m = memoryStorage([[faultStorageKey, before]]);
    const preview = previewLocalRecordImport(m.storage, fixture("file"));
    const laterState = {
      ...fixture("local"),
      inquiryDraft: { text: "【合成】另一标签后来写入" },
    };
    const laterRaw = JSON.stringify(laterState);
    m.values.set(faultStorageKey, laterRaw);
    expect(() => commitLocalRecordImport(m.storage, preview, "stale")).toThrow(
      "local_changed",
    );
    expect(m.storage.getItem(faultStorageKey)).toBe(laterRaw);
    expect(m.writes).toEqual([]);
  });

  it("does not overwrite a change made while the recovery copies are being written", () => {
    const before = JSON.stringify(fixture("local"));
    const m = memoryStorage([[faultStorageKey, before]]);
    const laterRaw = JSON.stringify({
      ...fixture("local"),
      inquiryDraft: { text: "【合成】副本写入期间的另一标签草稿" },
    });
    const storage = {
      getItem: m.storage.getItem,
      setItem(key: string, value: string) {
        m.storage.setItem(key, value);
        if (key.endsWith("-source")) m.values.set(faultStorageKey, laterRaw);
      },
    };
    const preview = previewLocalRecordImport(storage, fixture("file"));
    expect(() =>
      commitLocalRecordImport(storage, preview, "during-copy"),
    ).toThrow("local_changed");
    expect(m.storage.getItem(faultStorageKey)).toBe(laterRaw);
    expect(
      m.storage.getItem(`${faultStorageKey}:recovery:during-copy-before`),
    ).toBe(before);
    expect(m.writes.every((w) => w.key !== faultStorageKey)).toBe(true);
  });

  it.each(["before", "source", "main"])(
    "a throwing %s write preserves the live original and cannot report success",
    (failure) => {
      const before = JSON.stringify(fixture("local"));
      const source = fixture("file");
      const m = memoryStorage([[faultStorageKey, before]]);
      const storage = {
        getItem: m.storage.getItem,
        setItem(key: string, value: string) {
          if (
            (failure === "main" && key === faultStorageKey) ||
            key.endsWith(`-${failure}`)
          )
            throw Error("synthetic_quota_exceeded");
          m.storage.setItem(key, value);
        },
      };
      const preview = previewLocalRecordImport(storage, source);
      expect(() =>
        commitLocalRecordImport(storage, preview, `fail-${failure}`),
      ).toThrow("synthetic_quota_exceeded");
      expect(m.storage.getItem(faultStorageKey)).toBe(before);
      expect(source).toEqual(fixture("file"));
      if (failure !== "before")
        expect(
          m.storage.getItem(
            `${faultStorageKey}:recovery:fail-${failure}-before`,
          ),
        ).toBe(before);
      if (failure === "main")
        expect(
          loadStored(
            m.storage.getItem(`${faultStorageKey}:recovery:fail-main-source`),
          ),
        ).toEqual(source);
    },
  );

  it("a main write silently ignored by the storage adapter cannot report success", () => {
    const before = JSON.stringify(fixture("local"));
    const m = memoryStorage([[faultStorageKey, before]]);
    const storage = {
      getItem: m.storage.getItem,
      setItem(key: string, value: string) {
        if (key !== faultStorageKey) m.storage.setItem(key, value);
      },
    };
    const preview = previewLocalRecordImport(storage, fixture("file"));
    expect(() =>
      commitLocalRecordImport(storage, preview, "silent-main"),
    ).toThrow();
    expect(m.storage.getItem(faultStorageKey)).toBe(before);
    expect(m.values.has(`${faultStorageKey}:recovery:silent-main-source`)).toBe(
      true,
    );
  });

  it("a source copy silently ignored by the storage adapter cannot replace the live record or report success", () => {
    const before = JSON.stringify(fixture("local"));
    const m = memoryStorage([[faultStorageKey, before]]);
    const storage = {
      getItem: m.storage.getItem,
      setItem(key: string, value: string) {
        if (!key.endsWith("-source")) m.storage.setItem(key, value);
      },
    };
    const preview = previewLocalRecordImport(storage, fixture("file"));
    expect(() =>
      commitLocalRecordImport(storage, preview, "silent-source"),
    ).toThrow();
    expect(m.storage.getItem(faultStorageKey)).toBe(before);
  });

  it.each(["attempt", "recall", "correction", "inquiry"])(
    "rejects conflicting original %s IDs before any write",
    (kind) => {
      const current = fixture("local");
      const source = structuredClone(current);
      if (kind === "attempt") source.attempts[0].answer += "同编号不同原文";
      if (kind === "recall") source.reviews[0].answer += "同编号不同原文";
      if (kind === "correction") source.corrections[0].note += "同编号不同原文";
      if (kind === "inquiry") source.inquiries![0].text += "同编号不同原文";
      const before = JSON.stringify(current);
      const m = memoryStorage([[faultStorageKey, before]]);
      expect(() =>
        previewLocalRecordImport(m.storage, progressSchema.parse(source)),
      ).toThrow(/id_conflict/);
      expect(m.storage.getItem(faultStorageKey)).toBe(before);
      expect(m.writes).toEqual([]);
    },
  );

  it("retains all unrelated storage exactly, including a synthetic API key and account metadata", () => {
    const unrelated: [string, string][] = [
      [
        "lvzhen:byok:v1",
        '{"provider":"synthetic","apiKey":"synthetic-only-never-a-real-key"}',
      ],
      ["another-app:key", "synthetic opaque bytes\n  "],
      [
        `${faultStorageKey}:account:synthetic-user`,
        '{"syntheticAccount":"untouched"}',
      ],
      [`${faultStorageKey}:server-generation`, "17"],
    ];
    const m = memoryStorage(unrelated);
    const preview = previewLocalRecordImport(m.storage, fixture("source"));
    commitLocalRecordImport(m.storage, preview, "unrelated");
    for (const [key, value] of unrelated)
      expect(m.storage.getItem(key)).toBe(value);
    expect(m.writes.some((w) => unrelated.some(([key]) => key === w.key))).toBe(
      false,
    );
    for (const { value } of m.writes)
      expect(value).not.toContain("synthetic-only-never-a-real-key");
  });

  it("never overwrites an existing recovery copy ID", () => {
    const before = JSON.stringify(fixture("local"));
    const existing = "synthetic preexisting archive raw bytes";
    const key = `${faultStorageKey}:recovery:existing-source`;
    const m = memoryStorage([
      [faultStorageKey, before],
      [key, existing],
    ]);
    const preview = previewLocalRecordImport(m.storage, fixture("file"));
    expect(() =>
      commitLocalRecordImport(m.storage, preview, "existing"),
    ).toThrow("copy_exists");
    expect(m.storage.getItem(key)).toBe(existing);
    expect(m.storage.getItem(faultStorageKey)).toBe(before);
    expect(m.writes).toEqual([]);
  });
});

describe("G11 independent daily training continuation", () => {
  const paper = assessmentPapers.find(
    (p) =>
      !p.archived &&
      p.minutes === null &&
      p.questionIds.length >= 4 &&
      p.questionIds.every((id) => exerciseFor(id)?.kind === "subjective"),
  )!;
  it.each(["active", "nonactive"])(
    "a plan created on question 1 resumes question 4 for a %s saved run without mutating the plan or answers",
    (mode) => {
      expect(paper).toBeDefined();
      const prefsAll = { minutes: 20 as const, subject: "all" as const };
      let state = startAssessment(
        freshProgress(),
        paper.id,
        "synthetic-open-run",
        at,
      );
      state = editAssessment(
        state,
        paper.questionIds[0],
        { answer: "【合成】第1题原答\n逐字保留  " },
        at,
      );
      state = ensureDailyLearningPlan(state, prefsAll, at);
      const plan = state.dailyLearningPlan!;
      expect(plan.items).toHaveLength(1);
      expect(
        new URL(plan.items[0].href, "https://offline.invalid").searchParams.get(
          "question",
        ),
      ).toBe("1");
      const planSnapshot = JSON.stringify(plan);
      state = navigateAssessment(state, 3, later);
      state = editAssessment(
        state,
        paper.questionIds[3],
        { answer: "【合成】第4题未完成草稿" },
        later,
      );
      if (mode === "nonactive") {
        const otherRun = {
          ...structuredClone(state.assessments!.runs[0]),
          id: "synthetic-other-finished-run",
          answers: {},
          attemptIds: {},
          seenQuestionIds: [],
          finishedAt: later,
          finishReason: "manual" as const,
        };
        state = {
          ...state,
          assessments: {
            ...state.assessments!,
            runs: [...state.assessments!.runs, otherRun],
            activeId: otherRun.id,
            cursor: 1,
            cursors: { "synthetic-open-run": 3, [otherRun.id]: 1 },
          },
        };
      } else {
        // The legacy per-run map may lag; the active cursor is authoritative.
        state = {
          ...state,
          assessments: {
            ...state.assessments!,
            cursors: { "synthetic-open-run": 0 },
          },
        };
      }
      state = progressSchema.parse(state);
      const originalRun = structuredClone(state.assessments!.runs[0]);
      const stateSnapshot = JSON.stringify(state);
      const projected = dailyLearningProgress(plan, state, later);
      expect(projected.remaining).toBe(1);
      expect(projected.completed).toBe(0);
      expect(projected.items[0].available).toBe(true);
      const url = new URL(projected.items[0].href, "https://offline.invalid");
      expect(url.searchParams.get("run")).toBe("synthetic-open-run");
      expect(url.searchParams.has("question")).toBe(false);
      // Match the domain transition used by AssessmentView when question is absent.
      const resumed = selectAssessment(state, url.searchParams.get("run")!);
      expect(resumed.assessments!.cursor).toBe(3);
      expect(currentAssessment(resumed)).toEqual(originalRun);
      expect(JSON.stringify(plan)).toBe(planSnapshot);
      expect(JSON.stringify(state)).toBe(stateSnapshot);
      expect(resumed.dailyLearningPlan).toEqual(plan);
      expect(resumed.attempts).toEqual(state.attempts);
      expect(resumed.assessments!.runs).toEqual(state.assessments!.runs);
    },
  );
});
