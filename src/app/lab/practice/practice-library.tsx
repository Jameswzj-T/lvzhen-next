"use client";
import { assessmentRunHref } from "@/content/civil-integrated-practice";
import { useState } from "react";
import { reviewedFeedbackHref } from "@/domain/reviewed-feedback";
import type { FaultProgress } from "@/domain/fault-progress";
import {
  practiceQueues,
  practiceTopic,
  chapterQueue,
  practiceChapter,
  type PracticeMode,
  type PracticeScope,
  isChapterReview,
} from "@/content/practice-set";
import { assessmentPaper } from "@/content/assessment-papers";
import { unfinishedAssessment } from "@/domain/assessment";
import { chapterFor } from "@/content/criminal-curriculum";
import { hasPracticeHistory } from "@/domain/study-space";
import { StudyIcon } from "../_components/learning-frame";
import {
  CivilProcedureLibrary,
  initialCivilProcedureLibrarySelection,
  type CivilProcedureLibrarySelection,
} from "./civil-procedure-library";
import s from "./practice-library.module.css";
import type { BankScoringSummary } from "@/evaluation/scoring-trial-contract";

export function PracticeLibrary({
  state,
  ready,
  onResume,
  onStart,
  onStartChapter,
  scoringCards = [],
  reviewedFeedbackAvailable = false,
  selection,
  onSelectionChange,
  onOpenQuestion,
}: {
  state: FaultProgress;
  ready: boolean;
  scoringCards?: BankScoringSummary[];
  reviewedFeedbackAvailable?: boolean;
  selection?: CivilProcedureLibrarySelection | null;
  onSelectionChange?: (selection: CivilProcedureLibrarySelection) => void;
  onOpenQuestion?: (questionId: string) => void;
  onResume: (mode: PracticeMode) => void;
  onStart: (topicId: string, mode: PracticeMode) => void;
  onStartChapter: (
    chapterId: string,
    mode: PracticeMode,
    scope?: PracticeScope,
  ) => void;
}) {
  const [localSelection, setLocalSelection] = useState(() =>
    initialCivilProcedureLibrarySelection(state, "criminal-law"),
  );
  const view = selection ?? localSelection;
  const change = (patch: Partial<CivilProcedureLibrarySelection>) =>
    (onSelectionChange ?? setLocalSelection)({ ...view, ...patch });
  const setSelectedMode = (mode: PracticeMode) => change({ mode });
  const chapterId = view.sectionId;
  const setFilter = (filter: "all" | "review") =>
    change({ cases: filter === "review" });
  const chapter = chapterId ? chapterFor(chapterId)! : null;
  const started = hasPracticeHistory(state);
  const pending = unfinishedAssessment(state);
  const mode = view.mode;
  const current = state.practice?.cursors[mode] ?? practiceQueues[mode][0];
  const scoringChapters = [
    ...new Set(scoringCards.map((q) => practiceChapter(q.id).id)),
  ]
    .sort()
    .filter((id) => !chapter || chapter.id === id)
    .map((id) => ({
      chapter: chapterFor(id)!,
      questions: scoringCards.filter((q) => practiceChapter(q.id).id === id),
    }));
  return (
    <main id="learning-main" className={s.workspace}>
      <div className={s.heading}>
        <div>
          <p>刑法{chapter ? ` / ${chapter.title}` : ""}</p>
          <h1>练习</h1>
        </div>
        <div className={s.mode} aria-label="练习类型">
          {(["objective", "subjective"] as const).map((value) => (
            <button
              key={value}
              aria-pressed={mode === value}
              onClick={() => setSelectedMode(value)}
            >
              {value === "objective" ? "客观题" : "主观题"}
            </button>
          ))}
        </div>
      </div>
      <section className={s.resume}>
        <div>
          <span>
            {pending
              ? "尚未交卷 · 原答已保留"
              : started
                ? `${practiceChapter(current).title} · ${mode === "subjective" ? "主观题" : "客观题"}`
                : "按知识点，一组一组往下练"}
          </span>
          <h2>
            {ready
              ? pending
                ? assessmentPaper(pending.paperId)!.title
                : isChapterReview(current)
                  ? "章节综合"
                  : practiceTopic(current).title
              : "正在读取…"}
          </h2>
        </div>
        {pending ? (
          <a
            href={assessmentRunHref(
              pending.id,
              assessmentPaper(pending.paperId),
            )}
          >
            继续作答 <StudyIcon name="arrow" />
          </a>
        ) : (
          <button disabled={!ready} onClick={() => onResume(mode)}>
            {started ? "继续" : "开始"}
            {mode === "subjective" ? "主观题" : "客观题"}
            <StudyIcon name="arrow" />
          </button>
        )}
      </section>
      <nav className={s.fullPractice} aria-label="整套练习入口">
        <a href="/lab/assessment?subject=all-subjects&focus=criminal-law">
          <strong>全科综合训练</strong>
          <span>阶段训练、书面分析与缩短模考</span>
        </a>
        <a href="/lab/assessment?view=cases">
          <strong>跨章长案例</strong>
          <span>一份案情，连续作答</span>
        </a>
        <a href="/lab/assessment?view=exams">
          <strong>刑法客观专项</strong>
          <span>限时练习，交卷后看解析</span>
        </a>
      </nav>
      {chapter && (
        <div className={s.tabs} role="group" aria-label="刑法练习方式">
          <button aria-pressed={!view.cases} onClick={() => setFilter("all")}>
            按知识点练
          </button>
          <button aria-pressed={view.cases} onClick={() => setFilter("review")}>
            章节综合
          </button>
        </div>
      )}
      {chapter && view.cases ? (
        <section className={s.review} aria-label="章节综合入口">
          <button onClick={() => setFilter("all")}>返回本章题组</button>
          <h2>{chapter.title} · 综合练习</h2>
          <p>独立作答后查看解析，需要时再回看知识点。</p>
          <button
            disabled={
              !ready || !chapterQueue(chapter.id, mode, "review").length
            }
            onClick={() => onStartChapter(chapter.id, mode, "review")}
          >
            开始综合{mode === "objective" ? "客观题" : "主观题"}（
            {chapterQueue(chapter.id, mode, "review").length}）
            <StudyIcon name="arrow" />
          </button>
        </section>
      ) : (
        <CivilProcedureLibrary
          subject="criminal-law"
          state={state}
          disabled={!ready}
          selection={view}
          onSelectionChange={onSelectionChange ?? setLocalSelection}
          onOpen={(entry) => {
            if (entry.kind !== "question") return;
            if (onOpenQuestion) onOpenQuestion(entry.questionId);
            else onStart(practiceTopic(entry.questionId).id, mode);
          }}
        />
      )}
      <details className={s.otherEntries}>
        <summary>其他作答入口与已存反馈</summary>
        <p>保留旧编辑器和指定小问入口；日常练习可直接在上方选章节。</p>
        {scoringCards.length > 0 && (
          <a href="/lab/scoring/table/write">旧整案编辑器与保存结果</a>
        )}
        {reviewedFeedbackAvailable && (
          <p className={s.reviewedLink}>
            <a href={reviewedFeedbackHref()} data-reviewed-learning-entry>
              单位犯罪｜回看这份答卷 <StudyIcon name="arrow" />
            </a>
          </p>
        )}
        {scoringChapters.length > 0 && (
          <details
            className={s.scoringQuestions}
            aria-label="单题原答与保存反馈"
          >
            <summary>指定小问与保存反馈</summary>
            <p>可保存原答；自动评阅以题内显示的服务状态为准。</p>
            <div>
              {scoringChapters.map(({ chapter, questions }) => (
                <details key={chapter.id}>
                  <summary>
                    <span>{chapter.title}</span>
                    <small>{questions.length}题</small>
                  </summary>
                  <div>
                    {questions.map((q) => (
                      <a key={q.id} href={`/lab/practice?question=${q.id}`}>
                        {q.title}
                        <StudyIcon name="arrow" />
                      </a>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </details>
        )}
      </details>
    </main>
  );
}
