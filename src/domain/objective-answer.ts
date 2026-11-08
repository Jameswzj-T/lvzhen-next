import type { UnitExercise } from "../content/fault-unit";

export const choiceMode = (q: UnitExercise) => q.choiceMode ?? "single";
export const choiceModeLabel = (q: UnitExercise) =>
  ({ single: "单选题", multiple: "多选题", indefinite: "不定项选择题" })[
    choiceMode(q)
  ];
export const correctChoices = (q: UnitExercise): string[] =>
  q.correctChoices ?? (q.answer ? [q.answer] : []);

// Keep the original string field for old checkpoints. New multiple selections
// use comma-separated option IDs, in option order, without rewriting old answers.
export const selectedChoices = (choice: string) =>
  choice ? choice.split(",") : [];
export function validChoice(q: UnitExercise, choice: string) {
  const selected = selectedChoices(choice);
  return (
    q.kind === "objective" &&
    selected.length > 0 &&
    new Set(selected).size === selected.length &&
    (choiceMode(q) !== "single" || selected.length === 1) &&
    selected.every((id) => q.options?.some((o) => o.id === id))
  );
}
export function isCorrectChoice(q: UnitExercise, choice: string) {
  const expected = correctChoices(q);
  const selected = selectedChoices(choice);
  return (
    validChoice(q, choice) &&
    selected.length === expected.length &&
    expected.every((id) => selected.includes(id))
  );
}
export function toggleChoice(q: UnitExercise, choice: string, id: string) {
  if (!q.options?.some((o) => o.id === id)) return choice;
  if (choiceMode(q) === "single") return id;
  const selected = new Set(selectedChoices(choice));
  if (selected.has(id)) selected.delete(id);
  else selected.add(id);
  return q.options
    .filter((o) => selected.has(o.id))
    .map((o) => o.id)
    .join(",");
}
export const answerLabel = (ids: string[]) => ids.join("、").toUpperCase();
