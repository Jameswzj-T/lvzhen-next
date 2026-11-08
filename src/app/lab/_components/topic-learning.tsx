import type { TopicLearningSummary } from "@/domain/topic-learning-summary";
import { projectChapterLearning } from "@/domain/topic-learning-summary";
import s from "./topic-learning.module.css";

function choiceText(choice: TopicLearningSummary["objective"]) {
  if (!choice.total) return "";
  if (!choice.answered) return "选择题还没练过。";
  const text = choice.wrong
    ? `做过${choice.answered}道选择题，目前${choice.wrong}道还没选对。`
    : choice.correct === choice.answered
      ? `做过${choice.answered}道选择题，最近一次都选对了。`
      : `做过${choice.answered}道选择题，${choice.correct}道已选对。`;
  return (
    text +
    (choice.wrongAttempts ? `这些题累计选错${choice.wrongAttempts}次。` : "") +
    (choice.supported ? `其中${choice.supported}道作答前看过提示或解析。` : "")
  );
}

function assistanceText(
  written: NonNullable<TopicLearningSummary["latestWritten"]>,
) {
  return written.assistance === "hint_or_reference"
    ? "看过提示或解析后作答"
    : written.assistance === "same_case_reanswer"
      ? "同一案情再次作答"
      : "作答前未看提示或解析";
}

export function TopicLearning({
  summary,
  compact = false,
  disabled = false,
  onContinue,
}: {
  summary: TopicLearningSummary | null;
  compact?: boolean;
  disabled?: boolean;
  onContinue?: (topicId: string, questionId: string) => void;
}) {
  if (!summary) return null;
  const written = summary.latestWritten;
  const earlier = summary.earlierWritten;
  return (
    <section
      className={s.card}
      aria-label={`${summary.title}的学习情况`}
      data-topic-learning={summary.topicId}
    >
      <div className={s.heading}>
        <h3>这部分练得怎么样</h3>
        <span>
          练过 {summary.answered} / {summary.total} 题
        </span>
      </div>
      {!!summary.objective.total && <p>{choiceText(summary.objective)}</p>}
      {written ? (
        <div className={s.written}>
          <p>
            <strong>《{written.title}》</strong>：
            {summary.writtenComparison ?? written.text}
          </p>
          <p className={s.coverage}>{assistanceText(written)}</p>
          {written.previousEdition && (
            <p className={s.coverage}>
              上次作答 · 旧版设问，原答与当时的反馈保留
            </p>
          )}
          {!!written.focus.length && (
            <ul className={s.focus}>
              {written.focus.map((point) => (
                <li key={point.id}>
                  <span>{point.title}</span>
                  <small>
                    {point.text}
                    {point.repeated ? " · 这道题以前也卡在这里" : ""}
                  </small>
                </li>
              ))}
            </ul>
          )}
          {!compact && (
            <a className={s.review} href={written.href}>
              回看这份回答与讲解 <span aria-hidden="true">→</span>
            </a>
          )}
        </div>
      ) : summary.written.total > 0 ? (
        <p>还没写过这部分的案例，找一道试试怎么把理由说清楚。</p>
      ) : null}
      {!compact && earlier && (
        <div className={s.earlier} data-earlier-case={earlier.questionId}>
          <p>
            上一道案例 · <a href={earlier.href}>《{earlier.title}》</a>
          </p>
          <p>{earlier.text}</p>
          {!!earlier.focus.length && (
            <p>
              {earlier.focus
                .map((point) => `${point.title}：${point.text}`)
                .join("；")}
              。
            </p>
          )}
          <p className={s.coverage}>
            {earlier.previousEdition ? "旧版设问 · " : ""}
            {assistanceText(earlier)}
          </p>
        </div>
      )}
      {!compact && summary.next && onContinue && (
        <div className={s.next}>
          <div>
            <span>下一步 · {summary.next.title}</span>
            <p>{summary.next.reason}</p>
          </div>
          <button
            type="button"
            disabled={disabled}
            onClick={() =>
              onContinue(summary.topicId, summary.next!.questionId)
            }
          >
            {summary.next.label} <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </section>
  );
}

export function ChapterLearningProgress({
  summary,
  disabled = false,
  onContinue,
}: {
  summary: ReturnType<typeof projectChapterLearning>;
  disabled?: boolean;
  onContinue?: (topicId: string, questionId: string) => void;
}) {
  if (!summary) return null;
  const objective = summary.topics.reduce(
    (all, t) => ({
      total: all.total + t.objective.total,
      answered: all.answered + t.objective.answered,
      correct: all.correct + t.objective.correct,
      wrong: all.wrong + t.objective.wrong,
      wrongAttempts: all.wrongAttempts + t.objective.wrongAttempts,
      supported: all.supported + t.objective.supported,
    }),
    {
      total: 0,
      answered: 0,
      correct: 0,
      wrong: 0,
      wrongAttempts: 0,
      supported: 0,
    },
  );
  const written = summary.topics.reduce(
    (all, t) => ({
      total: all.total + t.written.total,
      answered: all.answered + t.written.answered,
      needsWork: all.needsWork + t.written.needsWork,
      pending: all.pending + t.written.pending,
    }),
    { total: 0, answered: 0, needsWork: 0, pending: 0 },
  );
  const nextTopic =
    summary.topics.find((t) => t.answered && t.next) ??
    summary.topics.find((t) => t.next);
  return (
    <section
      className={s.chapter}
      aria-label="本章学习情况"
      data-chapter-learning={summary.chapter.id}
    >
      <div className={s.heading}>
        <h3>本章练习</h3>
        <span>
          练过 {summary.answered} / {summary.total} 题
        </span>
      </div>
      <p className={s.coverage}>
        看过 {summary.viewed} / {summary.topics.length} 个知识点 · 练过其中{" "}
        {summary.practiced} 个
      </p>
      {!!objective.total && <p>{choiceText(objective)}</p>}
      {!!written.total && (
        <p>
          {written.answered
            ? `写过${written.answered}道案例${written.needsWork ? `，${written.needsWork}道还有内容要改或补` : ""}。`
            : "主观题还没开始，可以选一道，用自己的话写写理由。"}
        </p>
      )}
      {nextTopic?.next && onContinue && (
        <div className={s.next}>
          <div>
            <span>下一步 · {nextTopic.title}</span>
            <p>{nextTopic.next.reason}</p>
          </div>
          <button
            type="button"
            disabled={disabled}
            onClick={() =>
              onContinue(nextTopic.topicId, nextTopic.next!.questionId)
            }
          >
            {nextTopic.next.label} <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </section>
  );
}
