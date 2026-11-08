// Independent preparation only. Product imports are type-only and execute no
// application, record transport, model, server, or account. The caller supplies
// the existing pure record functions; no replacement persistence is introduced.
import type { FaultProgress, UnitDraft } from "./fault-progress";
import type { LearningNext } from "./learning-next";
import {
  civilAgencyChapter,
  civilAgencyExercises,
  civilAgencyRevision,
  civilAgencyTopics,
} from "../content/civil-agency";
import {
  civilAgencyDefaultQueues,
  civilAgencyQuestion,
  civilAgencySameCaseQuestions,
  civilAgencyTopicForQuestion,
} from "../content/civil-agency-catalog-candidate";

type Mode = NonNullable<FaultProgress["practice"]>["mode"];
export type CivilAgencyRecordCore = {
  freshDraft(): UnitDraft;
  submitExercise(p: FaultProgress, eventId: string, at: string): FaultProgress;
  retryExercise(p: FaultProgress): FaultProgress;
};

/** One existing checkpoint, one explicitly selected package, no new state fields. */
export function createCivilAgencyOfflineAdapter(core: CivilAgencyRecordCore) {
  function hasSeenCase(p: FaultProgress, id: string) {
    const related = civilAgencySameCaseQuestions(id);
    const ids = new Set(related.map((q) => q.id));
    const q = civilAgencyQuestion(id);
    return (
      related.some((q) => p.drafts[q.id]?.referenceSeen) ||
      p.attempts.some((a) => ids.has(a.exerciseId)) ||
      civilAgencyTopics.some(
        (t) =>
          t.example.facts === q?.facts && !!p.practice?.knowledgeViewed[t.id],
      )
    );
  }

  function expose(p: FaultProgress, id: string): FaultProgress {
    const drafts = { ...p.drafts };
    for (const q of civilAgencySameCaseQuestions(id))
      drafts[q.id] = {
        ...(drafts[q.id] ?? core.freshDraft()),
        referenceSeen: true,
      };
    return { ...p, drafts };
  }

  function select(p: FaultProgress, id: string, at: string): FaultProgress {
    const q = civilAgencyQuestion(id);
    const topic = civilAgencyTopicForQuestion(id);
    if (!q || !topic) return p;
    const cursors = { ...p.practice?.cursors };
    for (const mode of ["objective", "subjective"] as const) {
      if (civilAgencyQuestion(cursors[mode] ?? "")?.kind !== mode)
        cursors[mode] = civilAgencyDefaultQueues[mode][0];
    }
    const next: FaultProgress = {
      ...p,
      updatedAt: at,
      topicId: topic.id,
      exerciseId: id,
      step: "practice",
      resumeAfterRecall: null,
      practice: {
        ...p.practice,
        mode: q.kind,
        scope: "topic",
        chapterId: civilAgencyChapter.id,
        cursors: {
          objective: cursors.objective!,
          subjective: cursors.subjective!,
          [q.kind]: id,
        },
        ended: { objective: false, subjective: false, ...p.practice?.ended },
        viewed: { ...p.practice?.viewed, [id]: at },
        knowledgeViewed: { ...p.practice?.knowledgeViewed },
      },
    };
    return hasSeenCase(next, id) ? expose(next, id) : next;
  }

  function enter(p: FaultProgress, mode: Mode, at: string) {
    const prior = p.practice?.cursors[mode];
    const queue = civilAgencyDefaultQueues[mode];
    const id =
      p.practice?.chapterId === civilAgencyChapter.id &&
      prior &&
      queue.includes(prior)
        ? prior
        : (queue.find((id) => !p.drafts[id]?.submittedId) ?? queue[0]);
    return select(p, id, at);
  }

  function edit(
    p: FaultProgress,
    patch: Partial<Pick<UnitDraft, "choice" | "answer">>,
  ): FaultProgress {
    const q = civilAgencyQuestion(p.exerciseId);
    const draft = p.drafts[p.exerciseId] ?? core.freshDraft();
    if (!q || draft.submittedId) return p;
    if (
      (patch.answer !== undefined && patch.answer.length > 8000) ||
      (q.kind === "subjective" && !!patch.choice) ||
      (q.kind === "objective" && !!patch.answer) ||
      (patch.choice && !q.options?.some((o) => o.id === patch.choice))
    )
      return p;
    return {
      ...p,
      drafts: {
        ...p.drafts,
        [p.exerciseId]: { ...draft, ...patch },
      },
    };
  }

  function submit(p: FaultProgress, eventId: string, at: string) {
    if (!civilAgencyQuestion(p.exerciseId)) return p;
    const next = core.submitExercise(p, eventId, at);
    return next.attempts.length > p.attempts.length
      ? expose(next, p.exerciseId)
      : next;
  }

  function retry(p: FaultProgress) {
    return civilAgencyQuestion(p.exerciseId) ? core.retryExercise(p) : p;
  }

  function move(p: FaultProgress, direction: -1 | 1, at: string) {
    const mode = p.practice?.mode;
    if (!mode || p.practice?.chapterId !== civilAgencyChapter.id) return p;
    const queue = civilAgencyDefaultQueues[mode];
    const index = queue.indexOf(p.exerciseId);
    if (index < 0 || index + direction < 0) return p;
    const id = queue[index + direction];
    return id
      ? select(p, id, at)
      : {
          ...p,
          updatedAt: at,
          practice: {
            ...p.practice!,
            ended: { ...p.practice!.ended, [mode]: true },
          },
        };
  }

  function viewTopic(p: FaultProgress, id: string, at: string) {
    const topic = civilAgencyTopics.find((t) => t.id === id);
    if (!topic || p.practice?.chapterId !== civilAgencyChapter.id) return p;
    let next: FaultProgress = {
      ...p,
      updatedAt: at,
      practice: {
        ...p.practice!,
        knowledgeViewed: { ...p.practice!.knowledgeViewed, [id]: at },
      },
    };
    const example = civilAgencyExercises.find(
      (q) => q.facts === topic.example.facts,
    );
    if (example) next = expose(next, example.id);
    const draft = next.drafts[next.exerciseId] ?? core.freshDraft();
    if (
      !draft.submittedId &&
      civilAgencyQuestion(next.exerciseId)?.relatedTopicIds?.includes(id)
    )
      next = {
        ...next,
        drafts: {
          ...next.drafts,
          [next.exerciseId]: { ...draft, hintUsed: true },
        },
      };
    return next;
  }

  function nextLearning(p: FaultProgress): LearningNext | null {
    if (p.practice?.chapterId !== civilAgencyChapter.id) return null;
    // This adapter offers a package sequence only. Subjective text remains
    // not_evaluated; no lexical grader, score, feedback or mastery is generated.
    const mode = p.practice.mode;
    const current = civilAgencyQuestion(p.exerciseId);
    if (!current || !civilAgencyDefaultQueues[mode].includes(current.id))
      return null; // A holdout form never auto-expands into its paired form.
    const id = civilAgencyDefaultQueues[mode].find(
      (id) => !p.drafts[id]?.submittedId,
    );
    if (!id) return null;
    const q = civilAgencyQuestion(id)!;
    const open = p.drafts[id];
    const unfinished =
      !!open && !open.submittedId && !!(open.answer || open.choice);
    return {
      id: `civil-agency-sequence:${civilAgencyRevision}:${id}`,
      questionId: id,
      title: q.title,
      topicTitle: civilAgencyTopicForQuestion(id)!.title,
      reason: unfinished
        ? "接着这份未提交草稿写，原答记录保留。"
        : "继续所选代理包的下一道未提交练习。",
      basis: "sequence",
      action: unfinished ? "continue" : "practice",
    };
  }

  return {
    enter,
    select, // Holdout forms require an explicit ID supplied by the caller.
    edit,
    submit,
    retry,
    move,
    viewTopic,
    exposeReference: expose,
    hasSeenCase,
    nextLearning,
  };
}
