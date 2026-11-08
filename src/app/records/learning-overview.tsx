"use client";
import { useEffect, useMemo, useState } from "react";
import type { FaultProgress } from "@/domain/fault-progress";
import {
  practiceSubjectInfo,
  type PracticeSubject,
} from "@/content/practice-set";
import { queryLearningRecords } from "@/domain/learning-records";
import {
  learningOutcomeLabel,
  learningSupportLabel,
  learningTopicCaption,
  projectLearningProfile,
  type LearningHistoryEntry,
} from "@/domain/learning-profile";
import { InquiryExplanation } from "../lab/ask/inquiry-explanation";
import s from "./learning-overview.module.css";

export type LearningOverviewFilter = {
  initialSubject?: PracticeSubject;
  initialTopic?: string;
  initialAttempt?: string;
  initialView?: "answers" | "knowledge" | "inquiries";
};
function dateLabel(at: string) {
  return new Date(at).toLocaleString("zh-CN", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
export function LearningOverview({
  state,
  initialSubject,
  initialTopic,
  initialAttempt,
  initialView,
}: { state: FaultProgress } & LearningOverviewFilter) {
  const profile = useMemo(() => projectLearningProfile(state), [state]);
  const [subject, setSubject] = useState<PracticeSubject | "all">(
    initialSubject ?? "all",
  );
  const [topic, setTopic] = useState(initialTopic ?? "");
  const [tab, setTab] = useState<"answers" | "knowledge" | "inquiries">(
    initialView ?? "answers",
  );
  const [limit, setLimit] = useState(20);
  const [focusedAttempt, setFocusedAttempt] = useState(initialAttempt ?? "");
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.pathname !== "/records") return;
    if (subject === "all") url.searchParams.delete("subject");
    else url.searchParams.set("subject", subject);
    if (topic) url.searchParams.set("topic", topic);
    else url.searchParams.delete("topic");
    if (focusedAttempt) url.searchParams.set("answer", focusedAttempt);
    else url.searchParams.delete("answer");
    if (tab === "answers") url.searchParams.delete("view");
    else url.searchParams.set("view", tab);
    window.history.replaceState(
      window.history.state,
      "",
      url.pathname + url.search + url.hash,
    );
  }, [subject, topic, focusedAttempt, tab]);
  const {
    history,
    selectedTopics,
    weak,
    drafts,
    inquiries,
    visibleInquiries,
    visibleHistory,
    topicOptions,
    summary,
    hasMoreHistory,
    hasMoreInquiries,
    inquiryDraft,
  } = useMemo(
    () =>
      queryLearningRecords(
        state,
        { subject, topicId: topic, focusedAttemptId: focusedAttempt, limit },
        profile,
      ),
    [state, subject, topic, focusedAttempt, limit, profile],
  );
  function filterSubject(next: typeof subject) {
    setSubject(next);
    setTopic("");
    setFocusedAttempt("");
    setLimit(20);
  }
  const renderDraft = (draft: (typeof drafts)[number]) => (
    <a className={s.draft} key={draft.id} href={draft.href}>
      <span>
        <small>
          {practiceSubjectInfo(draft.subject).label} ·{" "}
          {draft.kind === "assessment" ? "训练中的草稿" : "未提交"}
        </small>
        <strong>{draft.title}</strong>
      </span>
      <span>继续 →</span>
    </a>
  );
  const renderReview = (question: (typeof weak)[number]) => (
    <div key={question.questionId} className={s.focus}>
      <div>
        <small>{question.topicTitle}</small>
        <strong>{question.title}</strong>
        <p>
          {question.latest.points[0]?.label ??
            (question.latest.attempt.choice
              ? "这次选择与正确选项不一致"
              : "这份答案还有需要补充的地方")}
          。这道题已有 {question.wrongAttempts} 次需要改进的作答。
        </p>
        {question.repeatedPoints.length > 0 && (
          <details className={s.compactMore}>
            <summary>反复漏掉的内容</summary>
            {question.repeatedPoints.map((point) => (
              <p key={point.id}>
                “{point.label}”在这道题的 {point.count} 份原答中需要补充。
              </p>
            ))}
          </details>
        )}
      </div>
      <div className={s.focusActions}>
        <a href={question.latest.href}>回看这题解析 →</a>
        <a
          href={`#answer-${question.latest.attempt.id}`}
          onClick={() => setFocusedAttempt(question.latest.attempt.id)}
        >
          看我的原答 ↓
        </a>
      </div>
    </div>
  );
  return (
    <div className={s.overview} data-learning-overview>
      <header className={s.heading}>
        <div>
          <p>原答、草稿，还有想弄懂的问题</p>
          <h1>我的学习</h1>
        </div>
        <a
          href={
            subject === "all"
              ? "/lab/study"
              : `/lab/study?subject=${subject}${topic ? `&topic=${encodeURIComponent(topic)}` : ""}`
          }
        >
          回到知识目录 →
        </a>
      </header>
      <div className={s.filters}>
        <label>
          科目
          <select
            aria-label="记录科目"
            value={subject}
            onChange={(e) => filterSubject(e.target.value as typeof subject)}
          >
            <option value="all">全部科目</option>
            {profile.subjects.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          知识点
          <select
            aria-label="记录知识点"
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              setFocusedAttempt("");
              setLimit(20);
            }}
          >
            <option value="">全部知识点</option>
            {topicOptions.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className={s.summary} aria-label="当前范围的学习记录">
        <span>
          <strong>{summary.answered}</strong> 题已练
        </span>
        <span>
          <strong>{summary.viewed}</strong> 个要点已看
        </span>
        <span>
          <strong>{summary.needsPractice}</strong> 题还需练
        </span>
      </div>
      <details className={s.recordNote}>
        <summary>这些记录怎么统计</summary>
        <p className={s.caption}>
          “还需练”依据最近一次明确的反馈。待讲解、待确认和旧版作答单独保留；做过题不等于已经掌握。
        </p>
      </details>
      <nav className={s.tabs} aria-label="学习记录分类">
        {(
          [
            { id: "answers", label: "作答与草稿" },
            { id: "knowledge", label: "知识点状态" },
            { id: "inquiries", label: "我的疑问" },
          ] as const
        ).map((item) => (
          <button
            key={item.id}
            aria-pressed={tab === item.id}
            onClick={() => {
              setTab(item.id);
              setLimit(20);
            }}
          >
            {item.label}
            {item.id === "inquiries" && inquiries.length
              ? ` ${inquiries.length}`
              : ""}
          </button>
        ))}
      </nav>
      {tab === "answers" && (
        <>
          <div className={s.priorities}>
            {drafts.length > 0 && (
              <section className={s.panel} aria-label="未写完的草稿">
                <div className={s.sectionHeading}>
                  <h2>接着写</h2>
                  <span>{drafts.length} 份草稿</span>
                </div>
                {renderDraft(drafts[0])}
                {drafts.length > 1 && (
                  <details className={s.compactMore}>
                    <summary>其余 {drafts.length - 1} 份草稿</summary>
                    {drafts.slice(1, limit).map(renderDraft)}
                    {drafts.length > limit && (
                      <button
                        className={s.more}
                        onClick={() => setLimit(limit + 20)}
                      >
                        再看 20 份草稿
                      </button>
                    )}
                  </details>
                )}
              </section>
            )}
            {weak.length > 0 && (
              <section className={s.panel} aria-label="值得回练的知识点">
                <div className={s.sectionHeading}>
                  <h2>值得再练</h2>
                  <span>{weak.length} 题</span>
                </div>
                {renderReview(weak[0])}
                {weak.length > 1 && (
                  <details className={s.compactMore}>
                    <summary>其余 {weak.length - 1} 题</summary>
                    {weak.slice(1, limit).map(renderReview)}
                    {weak.length > limit && (
                      <button
                        className={s.more}
                        onClick={() => setLimit(limit + 20)}
                      >
                        再看 20 题
                      </button>
                    )}
                  </details>
                )}
              </section>
            )}
          </div>
          <section className={s.archive} aria-label="历史作答">
            <div className={s.sectionHeading}>
              <h2>做过的题</h2>
              <span>{history.length} 份原答，含再次作答</span>
            </div>
            {!history.length && (
              <div className={s.empty}>
                <h3>从一道题开始就好</h3>
                <p>做题后，原答和讲解会留在这里，下次可以接着看。</p>
                <a
                  href={
                    subject === "all"
                      ? "/lab/practice?view=library"
                      : practiceSubjectInfo(subject).libraryHref
                  }
                >
                  去选一道题 →
                </a>
              </div>
            )}
            {visibleHistory.map((entry) => (
              <SavedAnswer
                key={entry.attempt.id}
                entry={entry}
                open={entry.attempt.id === focusedAttempt}
              />
            ))}
            {hasMoreHistory && (
              <button className={s.more} onClick={() => setLimit(limit + 20)}>
                再看 20 份原答
              </button>
            )}
          </section>
        </>
      )}
      {tab === "knowledge" && (
        <section aria-label="各科知识点的学习状态" className={s.panel}>
          {profile.subjects
            .filter((item) => subject === "all" || item.id === subject)
            .map((item) => {
              const active = selectedTopics.filter(
                (t) => t.subject === item.id && (t.viewed || t.answered),
              );
              return (
                <section key={item.id} className={s.subject}>
                  <div className={s.sectionHeading}>
                    <h2>{item.label}</h2>
                    <a href={`/lab/study?subject=${item.id}`}>知识目录 →</a>
                  </div>
                  {active.length ? (
                    active.map((t) => (
                      <div className={s.topic} key={t.id}>
                        <div>
                          <a href={t.href}>{t.title}</a>
                          <p>{learningTopicCaption(t)}</p>
                          {t.assisted > 0 && (
                            <small>
                              其中 {t.assisted}{" "}
                              题是在提示、参考或同案练习后答到的。
                            </small>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            setTopic(t.id);
                            setTab("answers");
                            setLimit(20);
                          }}
                        >
                          看原答
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className={s.caption}>
                      这里还没有知识点的查看或作答记录。可以直接进入练习。
                    </p>
                  )}
                </section>
              );
            })}
        </section>
      )}
      {tab === "inquiries" && (
        <section className={s.archive} aria-label="保存的问题与解释">
          {inquiryDraft && (
            <section className={s.panel}>
              <h2>还没发出的问题</h2>
              <p className={s.original}>{inquiryDraft.text}</p>
              <a href="/lab/ask">接着问 →</a>
            </section>
          )}
          {!inquiries.length && (
            <div className={s.empty}>
              <h3>卡住的地方，可以记下来</h3>
              <p>从题目里点“问这道题”，问题会和这道题一起保留。</p>
              <a href="/lab/ask">去答疑 →</a>
            </div>
          )}
          {visibleInquiries.map(
            ({ inquiry: item, explanation: saved, href }) => {
              return (
                <details key={item.id} className={s.answer}>
                  <summary>
                    <span>
                      <strong>{item.text}</strong>
                      <small>
                        {dateLabel(item.createdAt)} ·{" "}
                        {saved ? "解释已保存" : "问题已保存，尚无解释"}
                      </small>
                    </span>
                  </summary>
                  <div className={s.answerBody}>
                    {saved ? (
                      <InquiryExplanation
                        text={item.text}
                        showQuestion={false}
                        pending={false}
                        reply={{ status: "ready", message: "", result: saved }}
                      />
                    ) : (
                      <p>问题已经记下，可以回到这道题继续问。</p>
                    )}
                    {href && <a href={href}>回到原题 →</a>}
                  </div>
                </details>
              );
            },
          )}
          {hasMoreInquiries && (
            <button className={s.more} onClick={() => setLimit(limit + 20)}>
              再看 20 个问题
            </button>
          )}
        </section>
      )}
    </div>
  );
}

function SavedAnswer({
  entry,
  open,
}: {
  entry: LearningHistoryEntry;
  open: boolean;
}) {
  return (
    <details
      id={`answer-${entry.attempt.id}`}
      className={s.answer}
      open={open || undefined}
      data-learning-outcome={entry.outcome}
    >
      <summary>
        <span>
          <small>
            {entry.subject
              ? practiceSubjectInfo(entry.subject).label
              : "历史记录"}{" "}
            / {entry.topicTitle}
          </small>
          <strong>{entry.title}</strong>
          <small>
            {dateLabel(entry.attempt.submittedAt)} ·{" "}
            {learningSupportLabel[entry.support]}
          </small>
        </span>
        <span className={s.badge}>{learningOutcomeLabel[entry.outcome]}</span>
      </summary>
      <div className={s.answerBody}>
        <h3>当时我是这样答的</h3>
        {entry.attempt.choice && (
          <p>
            选择：{entry.attempt.choice.toUpperCase().split(",").join("、")}
          </p>
        )}
        {entry.attempt.answer && (
          <blockquote className={s.original}>{entry.attempt.answer}</blockquote>
        )}
        <p className={s.caption}>{entry.note}</p>
        {entry.feedback && (
          <>
            <h3>当时保存的讲解</h3>
            <p className={s.original}>
              {entry.feedback.view.studentResponse ??
                entry.feedback.view.heading}
            </p>
            {entry.feedback.view.substantiveIssue && (
              <p>{entry.feedback.view.substantiveIssue}</p>
            )}
          </>
        )}
        {entry.points.length > 0 && (
          <div className={s.points}>
            <h3>这次需要补的地方</h3>
            {entry.points.map((point) => (
              <div key={point.id}>
                <strong>{point.label}</strong>
                <p>{point.explanation}</p>
                {point.quotes.length > 0 && (
                  <blockquote className={s.quote}>
                    {point.quotes.join("\n")}
                  </blockquote>
                )}
              </div>
            ))}
          </div>
        )}
        <div className={s.links}>
          <a href={entry.href}>回到原题或原训练 →</a>
          {entry.knowledgeHref && (
            <a href={entry.knowledgeHref}>看相关知识点 →</a>
          )}
        </div>
      </div>
    </details>
  );
}
