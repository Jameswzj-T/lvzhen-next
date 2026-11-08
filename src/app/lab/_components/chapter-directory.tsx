"use client";
import {
  availableChapters,
  criminalChapters,
} from "@/content/criminal-curriculum";
import { chapterQueue, currentPracticeId } from "@/content/practice-set";
import type { FaultProgress } from "@/domain/fault-progress";
import { StudyIcon } from "./learning-frame";
import s from "./chapter-directory.module.css";

export function ChapterDirectory({
  state,
  ready,
  onSelect,
}: {
  state: FaultProgress;
  ready: boolean;
  onSelect: (id: string) => void;
}) {
  const answered = new Set(
    state.attempts.map((a) => currentPracticeId(a.exerciseId)),
  );
  const waiting = criminalChapters.filter((c) => !c.topicIds.length);
  return (
    <section className={s.directory} aria-label="刑法章节">
      <div className={s.heading}>
        <h2>刑法章节</h2>
        <span>{availableChapters.length} 章 · 内容持续完善</span>
      </div>
      <div className={s.list}>
        {availableChapters.map((chapter) => {
          const ids = [
            ...chapterQueue(chapter.id, "objective", "all"),
            ...chapterQueue(chapter.id, "subjective", "all"),
          ];
          const count = ids.filter((id) => answered.has(id)).length;
          return (
            <button
              key={chapter.id}
              className={s.chapter}
              disabled={!ready}
              onClick={() => onSelect(chapter.id)}
              aria-label={`查看${chapter.title}`}
            >
              <span className={s.number}>{chapter.id.slice(2)}</span>
              <span className={s.name}>
                {chapter.title}
                <small>
                  {chapter.topicIds.length} 个知识点 · {ids.length} 题
                  {count > 0 ? ` · 已答 ${count} 题` : ""}
                </small>
              </span>
              <StudyIcon name="arrow" />
            </button>
          );
        })}
      </div>
      {waiting.length > 0 && (
        <details className={s.remaining}>
          <summary>
            查看其余 {waiting.length} 章 <span>准备中</span>
          </summary>
          <ol>
            {waiting.map((chapter) => (
              <li key={chapter.id}>
                <span>{chapter.id.slice(2)}</span>
                {chapter.title}
              </li>
            ))}
          </ol>
        </details>
      )}
    </section>
  );
}
