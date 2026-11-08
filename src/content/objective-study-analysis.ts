import data from "./objective-study-analysis-data.json";

/** Teaching copy for the reading screen; canonical questions and requests stay separate. */
export function objectiveStudyAnalysis(input: {
  questionId: string;
  questionRevision: string;
  originalReference: string;
}) {
  const copy = data.copies.find(
    (row) =>
      row.questionId === input.questionId &&
      row.questionRevision === input.questionRevision &&
      row.originalReference === input.originalReference,
  );
  return copy ? { ...copy, version: data.version } : null;
}
