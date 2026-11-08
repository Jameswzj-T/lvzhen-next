"use client";
import { isRemainingG6Subject } from "@/content/remaining-g6-subjects";

import { useMemo } from "react";
import {
  civilProcedureReviewSets,
  civilProcedureReviewQuestion,
} from "@/content/civil-procedure-review";
import {
  coreSectionForTopic,
  type CorePracticeSubject,
} from "@/content/core-practice-sections";
import {
  practiceSubject,
  practiceSubjectInfo,
  type PracticeMode,
} from "@/content/practice-set";
import type { FaultProgress } from "@/domain/fault-progress";
import {
  civilProcedureChapterStart,
  filterCivilProcedureQuestions,
  projectCivilProcedureDirectory,
  type CivilProcedureDirectoryFilter,
  type CivilProcedureQuestionStatus,
} from "@/domain/civil-procedure-directory";
import { projectIntegratedFeedbackProgress } from "@/domain/integrated-feedback-progress";
import type { ExplicitCivilProcedureEntry } from "./explicit-civil-procedure-entry";
import { CivilProcedureSections } from "../_components/civil-procedure-sections";
import s from "./civil-procedure-library.module.css";

const statusLabels: Record<CivilProcedureQuestionStatus, string> = {
  unanswered: "尚未作答",
  correct: "上次答对",
  wrong: "上次选择有误",
  needs_work: "上次回答需要补充或纠正",
  pending: "原答已保存，评阅未完成",
  historical: "保留旧版原答",
};

export type CivilProcedureLibrarySelection = {
  mode: PracticeMode;
  sectionId: string | null;
  filter: CivilProcedureDirectoryFilter;
  search: string;
  cases: boolean;
};

export function initialCivilProcedureLibrarySelection(
  state: FaultProgress,
  subject: CorePracticeSubject = "civil-procedure",
): CivilProcedureLibrarySelection {
  const currentCivil = practiceSubject(state.exerciseId) === subject;
  return {
    mode: currentCivil ? (state.practice?.mode ?? "objective") : "objective",
    sectionId: currentCivil
      ? (coreSectionForTopic(subject, state.topicId)?.id ?? null)
      : null,
    filter: "all",
    search: "",
    cases:
      subject === "civil-procedure" &&
      !!civilProcedureReviewQuestion(state.exerciseId),
  };
}

export function CivilProcedureLibrary({
  state,
  disabled,
  onOpen,
  selection,
  onSelectionChange,
  subject = "civil-procedure",
}: {
  state: FaultProgress;
  disabled: boolean;
  onOpen: (entry: ExplicitCivilProcedureEntry) => void;
  selection: CivilProcedureLibrarySelection;
  onSelectionChange: (selection: CivilProcedureLibrarySelection) => void;
  subject?: CorePracticeSubject;
}) {
  const { mode, sectionId, filter, search } = selection;
  const cases = subject === "civil-procedure" && selection.cases;
  const subjectLabel = practiceSubjectInfo(subject).label;
  const change = (patch: Partial<CivilProcedureLibrarySelection>) =>
    onSelectionChange({ ...selection, ...patch });
  const setMode = (mode: PracticeMode) => change({ mode });
  const setSectionId = (sectionId: string | null) => change({ sectionId });
  const setFilter = (filter: CivilProcedureDirectoryFilter) =>
    change({ filter });
  const setSearch = (search: string) => change({ search });
  const setCases = (cases: boolean) => change({ cases });
  const directory = useMemo(
    () => projectCivilProcedureDirectory(state, subject),
    [state, subject],
  );
  const selected = directory.find((section) => section.id === sectionId);
  const answers = Object.fromEntries(
    directory.map((section) => [
      section.id,
      section.questions.filter((q) => q.savedCount > 0).length,
    ]),
  );
  const visible = directory
    .filter((section) => !sectionId || section.id === sectionId)
    .map((section) => ({
      ...section,
      questions: filterCivilProcedureQuestions(
        section.questions,
        mode,
        filter,
        search,
      ),
    }))
    .filter((section) => section.questions.length > 0);
  const showSections = !selected && filter === "all" && !search.trim();
  return (
    <section
      id="practice-question-list"
      tabIndex={-1}
      aria-label={`${subjectLabel}选题`}
      className={s.directory}
    >
      {subject === "civil-procedure" && (
        <div className={s.tabs} role="group" aria-label="民诉练习方式">
          <button aria-pressed={!cases} onClick={() => setCases(false)}>
            按章节练习
          </button>
          <button aria-pressed={cases} onClick={() => setCases(true)}>
            综合案例 · 3组
          </button>
        </div>
      )}
      {cases ? (
        <div className={s.cases}>
          <p>一份完整案情，逐问写答案。可以中途离开，下次接着答。</p>
          {civilProcedureReviewSets.map((set) => {
            const rows = projectIntegratedFeedbackProgress(
              state,
              set.questions,
              set.revision,
              set.href,
            );
            const target =
              rows.find(
                (q) => q.work === "draft" || q.work === "rewrite_draft",
              ) ??
              rows.find(
                (q) => q.work === "unanswered" || q.work === "record_review",
              ) ??
              rows[0];
            const saved = rows.filter(
              (q) => q.work === "saved" || q.work === "rewrite_draft",
            ).length;
            const started = rows.some(
              (q) => q.work !== "unanswered" || q.earlierOriginalSaved,
            );
            const open = (questionId: string) =>
              onOpen({ kind: "review", reviewKey: set.key, questionId });
            return (
              <article className={s.case} key={set.key}>
                <h3>{set.title}</h3>
                <p>
                  {set.questions.length} 道书面问答 · 本次已保存 {saved} 问
                </p>
                <button
                  className={s.action}
                  disabled={disabled}
                  onClick={() => open(target.questionId)}
                >
                  {saved === rows.length && target.work === "saved"
                    ? "回看这组作答"
                    : started
                      ? "继续这组案例"
                      : "开始这组案例"}{" "}
                  →
                </button>
                <details>
                  <summary>查看各问进度</summary>
                  <ol className={s.questions}>
                    {rows.map((q) => (
                      <li key={q.questionId}>
                        <span>
                          <strong>{q.title}</strong>
                          <small>
                            {q.work === "saved"
                              ? "原答已保存"
                              : q.work === "draft" || q.work === "rewrite_draft"
                                ? "有未提交草稿"
                                : q.work === "record_review"
                                  ? "原答记录待查看"
                                  : "尚未作答"}
                          </small>
                        </span>
                        <button
                          disabled={disabled}
                          onClick={() => open(q.questionId)}
                        >
                          回到这一问
                        </button>
                      </li>
                    ))}
                  </ol>
                </details>
              </article>
            );
          })}
        </div>
      ) : (
        <>
          <div className={s.tools}>
            <div className={s.tabs} role="group" aria-label="题目类型">
              {(["objective", "subjective"] as const).map((value) => (
                <button
                  key={value}
                  aria-pressed={mode === value}
                  onClick={() => setMode(value)}
                >
                  {value === "objective" ? "选择题" : "主观题"}
                </button>
              ))}
            </div>
            <label className={s.search}>
              找题目或知识点
              <input
                type="search"
                value={search}
                maxLength={200}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={
                  subject === "criminal-procedure"
                    ? "例如：辩护、侦查、上诉"
                    : subject === "civil-law"
                      ? "例如：代理、买卖、侵权"
                      : subject === "criminal-law"
                        ? "例如：故意、防卫、诈骗"
                        : isRemainingG6Subject(subject)
                          ? "输入知识点或题目关键词"
                          : subject === "commercial-law"
                            ? "例如：公司、破产、劳动、增值税"
                            : subject === "administrative-law"
                              ? "例如：许可、复议、赔偿"
                              : "例如：送达、管辖、仲裁"
                }
              />
            </label>
          </div>
          <div className={s.filters} role="group" aria-label="作答情况筛选">
            {(
              [
                ["all", "全部"],
                ["needs_work", "需要再练"],
                ["unanswered", "还没答完"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                aria-pressed={filter === value}
                onClick={() => setFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>
          {selected && (
            <div className={s.breadcrumb}>
              <button onClick={() => setSectionId(null)}>← 全部章节</button>
              <h2>{selected.title}</h2>
            </div>
          )}
          {filter === "needs_work" && (
            <p className={s.note}>
              这里列出上次选错，或已保存讲解指出有错误、遗漏的题；新答尚未评阅的题不列在这里。
            </p>
          )}
          {showSections ? (
            <CivilProcedureSections
              subject={subject}
              onSelect={setSectionId}
              answered={answers}
            />
          ) : (
            <div aria-live="polite">
              <p className={s.note}>
                {visible.reduce(
                  (total, section) => total + section.questions.length,
                  0,
                )}{" "}
                道{mode === "objective" ? "选择题" : "主观题"}
                {filter === "all" ? "" : "符合当前筛选"}
              </p>
              {visible.length === 0 && (
                <p className={s.empty}>
                  这个范围暂时没有符合条件的题。可以换个筛选，或返回全部章节。
                </p>
              )}
              {visible.map((section) => (
                <section key={section.id} aria-label={section.title}>
                  {!selected && (
                    <h2 className={s.sectionTitle}>{section.title}</h2>
                  )}
                  {section.chapterIds.map((id) => {
                    const questions = section.questions.filter(
                      (q) => q.chapterId === id,
                    );
                    if (!questions.length) return null;
                    const first = civilProcedureChapterStart(questions)!;
                    return (
                      <article key={id} className={s.chapter}>
                        <div className={s.chapterHeading}>
                          <h3>{first.chapterTitle}</h3>
                          <span>{questions.length} 题</span>
                        </div>
                        {filter === "all" && !search.trim() && (
                          <button
                            className={s.action}
                            disabled={disabled}
                            onClick={() =>
                              onOpen({ kind: "question", questionId: first.id })
                            }
                          >
                            {first.hasDraft
                              ? "继续草稿"
                              : questions.every((q) => q.savedCount > 0)
                                ? "回看本组"
                                : questions.some((q) => q.savedCount > 0)
                                  ? "接着练本组"
                                  : "开始本组"}{" "}
                            →
                          </button>
                        )}
                        <details open={filter !== "all" || !!search.trim()}>
                          <summary>
                            选具体题目
                            {questions.some((q) => q.savedCount)
                              ? ` · 已答 ${questions.filter((q) => q.savedCount).length} 题`
                              : ""}
                          </summary>
                          <ol className={s.questions}>
                            {questions.map((q) => (
                              <li
                                key={q.id}
                                data-civil-procedure-question-id={
                                  subject === "civil-procedure"
                                    ? q.id
                                    : undefined
                                }
                                data-criminal-procedure-question-id={
                                  subject === "criminal-procedure"
                                    ? q.id
                                    : undefined
                                }
                                data-civil-question-id={
                                  subject === "civil-law" ? q.id : undefined
                                }
                                data-criminal-question-id={
                                  subject === "criminal-law" ? q.id : undefined
                                }
                                data-remaining-question-id={
                                  isRemainingG6Subject(subject)
                                    ? q.id
                                    : undefined
                                }
                                data-commercial-question-id={
                                  subject === "commercial-law"
                                    ? q.id
                                    : undefined
                                }
                                data-administrative-question-id={
                                  subject === "administrative-law"
                                    ? q.id
                                    : undefined
                                }
                              >
                                <span>
                                  <strong>{q.title}</strong>
                                  <small>
                                    {q.hasDraft ? "有未提交草稿 · " : ""}
                                    {statusLabels[q.status]}
                                    {q.mistakeCount > 0
                                      ? ` · 选择错过 ${q.mistakeCount} 次`
                                      : ""}
                                  </small>
                                </span>
                                <button
                                  disabled={disabled}
                                  onClick={() =>
                                    onOpen({
                                      kind: "question",
                                      questionId: q.id,
                                    })
                                  }
                                >
                                  {q.hasDraft
                                    ? "继续答题"
                                    : q.savedCount
                                      ? "回看本题"
                                      : "开始作答"}
                                </button>
                              </li>
                            ))}
                          </ol>
                        </details>
                      </article>
                    );
                  })}
                </section>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
