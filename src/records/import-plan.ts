import { progressSchema, type FaultProgress } from "../domain/fault-progress";
import { sameRecord } from "./protocol";
import { assessmentCursors } from "../domain/assessment";

export class ImportConflict extends Error {}
export function planImport(account: FaultProgress | null, input: unknown) {
  const source = progressSchema.parse(input);
  if (!account)
    return {
      state: source,
      addedAnswers: source.attempts.length,
      addedRecalls: source.reviews.length,
      addedCorrections: source.corrections.length,
      differingDrafts: 0,
    };
  const current = progressSchema.parse(account);
  const all = new Map(
    [
      ...current.attempts,
      ...current.reviews,
      ...current.corrections,
      ...(current.learningObservations ?? []),
      ...(current.submittedFeedback ?? []),
    ].map((entry) => [entry.id, entry]),
  );
  for (const entry of [
    ...source.attempts,
    ...source.reviews,
    ...source.corrections,
    ...(source.learningObservations ?? []),
    ...(source.submittedFeedback ?? []),
  ]) {
    if (all.has(entry.id) && !sameRecord(all.get(entry.id), entry))
      throw new ImportConflict("original_id_conflict");
  }
  const addedAnswers = source.attempts.filter((a) => !all.has(a.id));
  const addedRecalls = source.reviews.filter((a) => !all.has(a.id));
  const addedCorrections = source.corrections.filter((a) => !all.has(a.id));
  const addedObservations = (source.learningObservations ?? []).filter(
    (a) => !all.has(a.id),
  );
  const addedFeedback = (source.submittedFeedback ?? []).filter(
    (a) => !all.has(a.id),
  );
  const inquiryIds = new Map(
    (current.inquiries ?? []).map((inquiry) => [inquiry.id, inquiry]),
  );
  for (const inquiry of source.inquiries ?? []) {
    const existing = inquiryIds.get(inquiry.id);
    if (existing && !sameRecord(existing, inquiry))
      throw new ImportConflict("inquiry_id_conflict");
    inquiryIds.set(inquiry.id, inquiry);
  }
  const explanations = new Map(
    (current.inquiryExplanations ?? []).map((view) => [
      view.identity.inquiryId,
      view,
    ]),
  );
  for (const view of source.inquiryExplanations ?? []) {
    const existing = explanations.get(view.identity.inquiryId);
    if (existing && !sameRecord(existing, view))
      throw new ImportConflict("inquiry_explanation_id_conflict");
    explanations.set(view.identity.inquiryId, view);
  }
  const runs = new Map((current.assessments?.runs ?? []).map((r) => [r.id, r]));
  for (const run of source.assessments?.runs ?? []) {
    if (runs.has(run.id) && !sameRecord(runs.get(run.id), run))
      throw new ImportConflict("assessment_id_conflict");
    runs.set(run.id, run);
  }
  const differingDrafts =
    (["drafts", "recallDrafts", "correctionDrafts"] as const).reduce(
      (count, kind) =>
        count +
        Object.entries(source[kind]).filter(
          ([id, draft]) =>
            current[kind][id] && !sameRecord(current[kind][id], draft),
        ).length,
      0,
    ) +
    Number(
      !!current.inquiryDraft?.text.trim() &&
        !!source.inquiryDraft?.text.trim() &&
        !sameRecord(current.inquiryDraft, source.inquiryDraft),
    );
  const state = progressSchema.parse({
    ...current,
    ...(explanations.size
      ? { inquiryExplanations: [...explanations.values()] }
      : {}),
    ...(inquiryIds.size
      ? {
          inquiries: [...inquiryIds.values()].sort(
            (a, b) =>
              a.createdAt.localeCompare(b.createdAt) ||
              a.id.localeCompare(b.id),
          ),
        }
      : {}),
    ...(current.inquiryDraft?.text.trim()
      ? {}
      : source.inquiryDraft
        ? { inquiryDraft: source.inquiryDraft }
        : {}),
    ...(!current.learningPreferences && source.learningPreferences
      ? { learningPreferences: source.learningPreferences }
      : {}),
    ...(!current.dailyLearningPlan && source.dailyLearningPlan
      ? { dailyLearningPlan: source.dailyLearningPlan }
      : {}),
    ...(current.practice && source.practice
      ? {
          practice: {
            ...current.practice,
            viewed: { ...source.practice.viewed, ...current.practice.viewed },
            knowledgeViewed: {
              ...source.practice.knowledgeViewed,
              ...current.practice.knowledgeViewed,
            },
            subjectPositions: {
              ...source.practice.subjectPositions,
              ...current.practice.subjectPositions,
            },
          },
        }
      : {}),
    ...(current.submittedFeedback || source.submittedFeedback
      ? {
          submittedFeedback: [
            ...(current.submittedFeedback ?? []),
            ...addedFeedback,
          ],
        }
      : {}),
    ...(current.learningObservations || source.learningObservations
      ? {
          learningObservations: [
            ...(current.learningObservations ?? []),
            ...addedObservations,
          ],
        }
      : {}),
    updatedAt:
      [current.updatedAt, source.updatedAt].filter(Boolean).sort().at(-1) ??
      null,
    attempts: [...current.attempts, ...addedAnswers].sort(
      (a, b) =>
        a.submittedAt.localeCompare(b.submittedAt) || a.id.localeCompare(b.id),
    ),
    ...(runs.size
      ? {
          assessments: {
            runs: [...runs.values()],
            activeId:
              current.assessments?.activeId ??
              source.assessments?.activeId ??
              null,
            cursor: current.assessments?.activeId
              ? current.assessments.cursor
              : (source.assessments?.cursor ?? 0),
            cursors: {
              ...assessmentCursors(source),
              ...assessmentCursors(current),
            },
          },
        }
      : {}),
    reviews: [...current.reviews, ...addedRecalls].sort(
      (a, b) =>
        a.submittedAt.localeCompare(b.submittedAt) || a.id.localeCompare(b.id),
    ),
    drafts: { ...source.drafts, ...current.drafts },
    corrections: [...current.corrections, ...addedCorrections].sort(
      (a, b) =>
        a.submittedAt.localeCompare(b.submittedAt) || a.id.localeCompare(b.id),
    ),
    correctionDrafts: {
      ...source.correctionDrafts,
      ...current.correctionDrafts,
    },
    recallDrafts: { ...source.recallDrafts, ...current.recallDrafts },
    finished: Object.fromEntries(
      [
        ...new Set([
          ...Object.keys(source.finished),
          ...Object.keys(current.finished),
        ]),
      ].map((id) => [
        id,
        [source.finished[id], current.finished[id]]
          .filter(Boolean)
          .sort()
          .at(-1),
      ]),
    ),
  });
  return {
    state,
    addedAnswers: addedAnswers.length,
    addedRecalls: addedRecalls.length,
    addedCorrections: addedCorrections.length,
    differingDrafts,
  };
}
