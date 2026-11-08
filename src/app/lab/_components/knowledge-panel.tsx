"use client";
import type { PracticeSubjectInfo } from "@/content/practice-set";
import { useEffect, useRef } from "react";
import { knowledgeTopics, practiceKnowledge } from "@/content/practice-set";
import { topicSources } from "@/content/fault-catalog";
import { chapterForTopic } from "@/content/criminal-curriculum";
import { StudyIcon } from "./learning-frame";
import { TopicLearning } from "./topic-learning";
import type { TopicLearningSummary } from "@/domain/topic-learning-summary";
import {
  learningTopicCaption,
  type LearningTopicState,
} from "@/domain/learning-profile";
import s from "../practice/practice.module.css";

export function KnowledgePanel({
  topicId,
  onSelect,
  onClose,
  onPractice,
  topics = knowledgeTopics,
  contentByTopic = practiceKnowledge,
  subjectLabel = "刑法",
  onExampleRead,
  learningSummary,
  learningState,
}: {
  topicId: string | null;
  onSelect: (id: string) => void;
  onClose: () => void;
  onPractice?: () => void;
  topics?: typeof knowledgeTopics;
  contentByTopic?: typeof practiceKnowledge;
  subjectLabel?: PracticeSubjectInfo["label"];
  onExampleRead?: (topicId: string) => void;
  learningSummary?: TopicLearningSummary | null;
  learningState?: LearningTopicState | null;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = dialog.current!;
    const overflow = document.documentElement.style.overflow;
    el.showModal();
    document.documentElement.style.overflow = "hidden";
    return () => {
      el.close();
      document.documentElement.style.overflow = overflow;
    };
  }, []);
  const topic = topics.find((t) => t.id === topicId);
  const content = topicId ? contentByTopic[topicId] : null;
  return (
    <dialog
      ref={dialog}
      className={`${s.shell} ${s.knowledgePanel}`}
      aria-labelledby="knowledge-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={s.panelHeader}>
        <span>
          {subjectLabel}
          {topicId ? ` / ${chapterForTopic(topicId)?.title ?? "知识要点"}` : ""}
        </span>
        <button onClick={onClose} aria-label="关闭知识要点">
          <StudyIcon name="close" />
        </button>
      </div>
      <div className={s.panelBody} tabIndex={0} aria-label="知识内容">
        <h2 id="knowledge-title">{topic?.title ?? "知识要点"}</h2>
        {topic && content ? (
          <div key={topic.id}>
            {subjectLabel !== "刑法" && (
              <div className={s.knowledgeIntro}>
                <p>
                  <strong>本节要会：</strong>
                  {topic.goal}
                </p>
                <details>
                  <summary>先理解什么</summary>
                  <p>{topic.prerequisite}</p>
                </details>
              </div>
            )}
            <p className={s.rule}>{content.rule}</p>
            <h3>容易混淆</h3>
            <p>{content.omission}</p>
            {learningState?.id === topic.id ? (
              <p className={s.knowledgeIntro}>
                <a
                  href={`/records?subject=${learningState.subject}&topic=${encodeURIComponent(topic.id)}`}
                >
                  {learningTopicCaption(learningState)} · 看学习记录 →
                </a>
              </p>
            ) : (
              learningSummary?.topicId === topic.id && (
                <TopicLearning compact summary={learningSummary} />
              )
            )}
            <details
              className={s.example}
              onToggle={(event) => {
                if (event.currentTarget.open) onExampleRead?.(topic.id);
              }}
            >
              <summary>看一个例子</summary>
              <p>{topic.example.facts}</p>
              <p>{topic.example.analysis}</p>
            </details>
            <details className={s.more}>
              <summary>依据与范围</summary>
              {topic.sources.map((key) => (
                <p key={key}>
                  <a
                    href={topicSources(topic.id)[key].url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {topicSources(topic.id)[key].title}
                  </a>
                </p>
              ))}
            </details>
          </div>
        ) : (
          <div className={s.knowledgeList}>
            {topics.map((t) => (
              <button key={t.id} onClick={() => onSelect(t.id)}>
                {t.title}
                <StudyIcon name="arrow" />
              </button>
            ))}
          </div>
        )}
      </div>
      <div className={s.panelFooter}>
        {onPractice && (
          <button className={s.textButton} onClick={onPractice}>
            按这个知识点再练
          </button>
        )}
        <button className={s.primary} onClick={onClose}>
          返回题目
          <span aria-hidden="true">←</span>
        </button>
      </div>
    </dialog>
  );
}
