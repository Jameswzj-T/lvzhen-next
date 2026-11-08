import {
  corePracticeSections,
  corePracticeSubjects,
  type CorePracticeSubject,
} from "../../../content/core-practice-sections";
import type { CivilProcedureLibrarySelection } from "./civil-procedure-library";

type DirectoryStorage = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
};
export type DirectoryViews = Partial<
  Record<CorePracticeSubject, CivilProcedureLibrarySelection>
>;
const key = (owner: string | null) => `lvzhen-directory-v1:${owner ?? "guest"}`;

// View preferences contain no answer, score, feedback or learning checkpoint.
// Invalid/unavailable browser storage simply falls back to the saved position.
export function readDirectoryViews(
  storage: DirectoryStorage,
  owner: string | null,
): DirectoryViews {
  try {
    const raw = storage.getItem(key(owner));
    if (!raw || raw.length > 10000) return {};
    const parsed = JSON.parse(raw);
    if (
      parsed?.version !== 1 ||
      !parsed.views ||
      typeof parsed.views !== "object"
    )
      return {};
    const views: DirectoryViews = {};
    for (const subject of corePracticeSubjects) {
      const view = parsed.views[subject];
      if (
        !view ||
        !["objective", "subjective"].includes(view.mode) ||
        !["all", "needs_work", "unanswered"].includes(view.filter) ||
        typeof view.search !== "string" ||
        view.search.length > 200 ||
        typeof view.cases !== "boolean"
      )
        continue;
      if (
        view.sectionId !== null &&
        !corePracticeSections(subject).some((s) => s.id === view.sectionId)
      )
        continue;
      views[subject] = {
        mode: view.mode,
        sectionId: view.sectionId,
        filter: view.filter,
        search: view.search,
        cases: view.cases,
      };
    }
    return views;
  } catch {
    return {};
  }
}

export function writeDirectoryViews(
  storage: DirectoryStorage,
  owner: string | null,
  views: DirectoryViews,
) {
  try {
    const selected = Object.fromEntries(
      corePracticeSubjects.flatMap((subject) => {
        const view = views[subject];
        return view
          ? [
              [
                subject,
                {
                  mode: view.mode,
                  sectionId: view.sectionId,
                  filter: view.filter,
                  search: view.search,
                  cases: view.cases,
                },
              ],
            ]
          : [];
      }),
    );
    storage.setItem(
      key(owner),
      JSON.stringify({ version: 1, views: selected }),
    );
  } catch {
    /* View memory is optional. */
  }
}
