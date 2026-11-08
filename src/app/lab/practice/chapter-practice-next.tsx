import type { ChapterPracticeContinuation } from "@/domain/chapter-practice-continuation";
import s from "./practice.module.css";

export function ChapterPracticeNext({
  next,
  disabled,
  onContinue,
}: {
  next: ChapterPracticeContinuation;
  disabled: boolean;
  onContinue: (questionId: string) => void;
}) {
  const mode = next.mode === "objective" ? "客观题" : "主观题";
  return (
    <section
      className={s.chapterNext}
      aria-label="下一章练习"
      data-next-practice-chapter={next.chapterId}
    >
      <div>
        <h3>下一章 · {next.chapterTitle}</h3>
        <p>
          {next.stage === "draft"
            ? `有一道${mode}还没写完，可以接着上次的草稿。`
            : next.stage === "answered"
              ? `这章${mode}已经都留有作答，可以回看答案和讲解。`
              : `接着练这章的${mode}，从还没答的题目开始。`}
          {next.scope === "review" ? "继续章节综合。" : ""}
        </p>
      </div>
      <button
        type="button"
        className={s.primary}
        disabled={disabled}
        onClick={() => {
          if (!disabled) onContinue(next.questionId);
        }}
      >
        {next.stage === "draft"
          ? "接着草稿练"
          : next.stage === "answered"
            ? "回看下一章"
            : "前往下一章"}
        <span aria-hidden="true"> →</span>
      </button>
    </section>
  );
}
