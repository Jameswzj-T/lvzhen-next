"use client";
import { modelAccessHeaders } from "@/model-access/client";
import {
  recordInquiryExplanation,
  savedInquiryExplanation,
} from "@/domain/saved-inquiry-explanation";
import { useEffect, useRef, useState } from "react";
import { StudyGate } from "@/accounts/study-gate";
import type { Learner } from "@/accounts/client";
import {
  exerciseFor,
  exerciseRevision,
  topicFor,
} from "@/content/fault-catalog";
import { studyQuestions } from "@/content/study-questions";
import { practiceSubject, practiceSubjectInfo } from "@/content/practice-set";
import { prepareInquiryDraft } from "@/domain/study-space";
import { saveInquiryFollowup } from "./save-inquiry-followup";
import {
  inquiryEntryConflict,
  savePreviousInquiryAndEnter,
} from "./inquiry-entry";
import { initializePractice, visitPractice } from "@/domain/practice";
import { selectAssessment, navigateAssessment } from "@/domain/assessment";
import { explainedInquiryReturn, questionReturn } from "./question-return";
import { studyTopicLocation } from "../study/topic-location";
import { usePractice } from "../practice/use-practice";
import { RecordRecovery } from "../_components/record-recovery";
import {
  LearningFrame,
  RecordNotice,
  StudyIcon,
  recordLabel,
} from "../_components/learning-frame";
import { hasQuestionInquiryMaterial } from "@/evaluation/question-inquiry-material";
import {
  INQUIRY_VERSION,
  inquiryReplySchema,
  type InquiryReply,
  type InquiryIdentity,
} from "@/domain/question-inquiry";
import { InquiryExplanation } from "./inquiry-explanation";
import s from "./ask.module.css";
import d from "../_components/reading-document.module.css";
import { ReferenceSources } from "../_components/reference-sources";

type Context = { exerciseId?: string; topicId?: string; originRunId?: string };
export function AskEntry(context: Context) {
  return (
    <StudyGate>
      {(user) => <AskView key={user?.id ?? "guest"} user={user} {...context} />}
    </StudyGate>
  );
}
function AskView({
  user,
  exerciseId,
  topicId,
  originRunId,
}: Context & { user: Learner }) {
  const {
    state,
    ready,
    restorationFailed,
    storageIssue,
    status,
    update,
    retrySync,
    capturePersistence,
  } = usePractice(user?.id ?? null, false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [lastSavedId, setLastSavedId] = useState("");
  const [keepPrevious, setKeepPrevious] = useState(false);
  const prepared = useRef(false);
  const [explanation, setExplanation] = useState<InquiryReply | null>(null);
  const [explainedInquiry, setExplainedInquiry] =
    useState<InquiryIdentity | null>(null);
  const [pending, setPending] = useState(false);
  const busy = useRef(false),
    alive = useRef(true),
    requestToken = useRef(0);
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      requestToken.current++;
    };
  }, []);
  useEffect(() => {
    if (!ready || restorationFailed || prepared.current) return;
    prepared.current = true;
    if (!state.inquiryDraft?.text.trim() && (exerciseId || topicId)) {
      update((p) =>
        prepareInquiryDraft(p, { exerciseId, topicId, originRunId }),
      );
    }
  }, [ready, restorationFailed, exerciseId, topicId, originRunId]);
  const draft = state.inquiryDraft;
  const requestedContext = { exerciseId, topicId, originRunId };
  const entryConflict =
    !keepPrevious && inquiryEntryConflict(state, requestedContext);
  const requestedTitle = exerciseId
    ? exerciseFor(exerciseId)?.title
    : topicId
      ? topicFor(topicId)?.title
      : undefined;
  const inquirySaveLabel = storageIssue ? "保存待确认" : "已保存";
  const linkedQuestion = draft?.exerciseId
    ? exerciseFor(draft.exerciseId)
    : null;
  const linkedTopic = draft?.topicId ? topicFor(draft.topicId) : null;
  const contextSubject = practiceSubjectInfo(
    practiceSubject(linkedQuestion?.id ?? state.exerciseId),
  );
  const linkedReturn = linkedQuestion
    ? questionReturn(state, linkedQuestion.id, draft?.originRunId)
    : null;
  const linkedTopicReturn =
    linkedTopic && !linkedQuestion ? studyTopicLocation(linkedTopic.id) : null;
  const recentlySaved = state.inquiries?.find(
    (item) => item.id === lastSavedId,
  );
  const savedReturn = recentlySaved?.exerciseId
    ? questionReturn(state, recentlySaved.exerciseId, recentlySaved.originRunId)
    : null;
  const savedTopicReturn =
    recentlySaved?.topicId && !recentlySaved.exerciseId
      ? studyTopicLocation(recentlySaved.topicId)
      : null;
  const explainedReturn = explainedInquiry
    ? explainedInquiryReturn(state, explainedInquiry)
    : null;
  function cancelContext() {
    if (storageIssue) return;
    update((p) => ({
      ...p,
      inquiryDraft: { text: p.inquiryDraft?.text ?? "" },
    }));
    setKeepPrevious(true);
    const url = new URL(window.location.href);
    for (const key of ["question", "topic", "fromRun"])
      url.searchParams.delete(key);
    window.history.replaceState(
      {},
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
  }
  function openQuestion(id: string, fromRun?: string) {
    if (storageIssue) return;
    const q = exerciseFor(id);
    const target = questionReturn(state, id, fromRun);
    if (!q || !target) return;
    if (target.kind === "assessment") {
      if (
        !update((p) =>
          navigateAssessment(
            selectAssessment(p, target.runId),
            target.cursor,
            new Date().toISOString(),
          ),
        )
      )
        return;
    } else if (target.kind === "practice")
      if (
        !update((p) => {
          const next = initializePractice(p);
          return visitPractice(
            {
              ...next,
              practice: {
                ...next.practice!,
                mode: q.kind,
                ended: { ...next.practice!.ended, [q.kind]: false },
              },
            },
            id,
            new Date().toISOString(),
          );
        })
      )
        return;
    window.location.assign(target.href);
  }
  function openTopic(id: string) {
    if (storageIssue) return;
    const target = studyTopicLocation(id);
    if (target) window.location.assign(target.href);
  }
  async function requestExplanation(
    identity: InquiryIdentity,
    action: "lookup" | "explain",
  ) {
    const token = ++requestToken.current;
    setExplainedInquiry(identity);
    setExplanation(null);
    setPending(true);
    try {
      const saved = savedInquiryExplanation(state, identity);
      if (saved) {
        if (alive.current && token === requestToken.current)
          setExplanation({
            status: "ready",
            result: saved,
            message: "已打开浏览器保存的解释，没有调用模型。",
          });
        return;
      }
      const owner = capturePersistence();
      if (!owner) throw Error("inquiry-owner-unavailable");
      const response = await fetch("/api/lab/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-lvzhen-scoring": "1",
          ...modelAccessHeaders(),
        },
        body: JSON.stringify({
          version: INQUIRY_VERSION,
          action,
          ...identity,
          ...(action === "explain" ? { transmissionConsent: true } : {}),
        }),
      });
      if (!response.ok) throw Error("inquiry-http");
      const reply = inquiryReplySchema.parse(await response.json());
      if (
        reply.result &&
        JSON.stringify(reply.result.identity) !== JSON.stringify(identity)
      )
        throw Error("inquiry-owner-binding");
      if (reply.result) {
        const result = reply.result;
        const saved = owner.update((p) => recordInquiryExplanation(p, result));
        const confirmed =
          saved &&
          (await owner.confirmSaved(
            (p) =>
              JSON.stringify(savedInquiryExplanation(p, identity)) ===
              JSON.stringify(result),
          ));
        reply.message = confirmed
          ? "解释已保存在当前浏览器，可以随时回来查看。"
          : "解释已经取得，但保存尚未确认。请先保留当前页面并恢复记录保存。";
      }
      if (alive.current && token === requestToken.current)
        setExplanation(reply);
    } catch {
      if (alive.current && token === requestToken.current)
        setExplanation({
          status: "pending",
          result: null,
          message:
            "暂未取得可用解释；疑问已保留。可读取已保存结果，不会自动重发。",
        });
    } finally {
      if (alive.current && token === requestToken.current) {
        setPending(false);
        busy.current = false;
      }
    }
  }
  async function submit(explain = false) {
    if (busy.current || storageIssue || entryConflict || !draft?.text.trim())
      return;
    setLastSavedId("");
    if ((state.inquiries?.length ?? 0) >= 200) {
      setMessage("问题已达保存上限，请先导出记录。");
      return;
    }
    const owner = capturePersistence();
    if (!owner) return;
    const id = crypto.randomUUID(),
      raw = draft.text,
      qid = draft.exerciseId;
    busy.current = true;
    const ok = update((p) =>
      saveInquiryFollowup(p, id, new Date().toISOString()),
    );
    if (!ok) {
      busy.current = false;
      setMessage("疑问尚未确认保存，本次没有发送模型。");
      return;
    }
    const confirmed = await owner.confirmSaved(
      (p) => p.inquiries?.some((i) => i.id === id && i.text === raw) === true,
    );
    if (!alive.current) return;
    busy.current = false;
    if (!confirmed) {
      setMessage("疑问保存尚未确认，本次没有发送模型。请先恢复记录保存。");
      return;
    }
    setLastSavedId(id);
    setMessage("问题已记下，可以继续学习。");
    if (explain && qid && !draft.originRunId) {
      busy.current = true;
      await requestExplanation(
        {
          questionId: qid,
          questionRevision: exerciseRevision(qid),
          inquiryId: id,
          text: raw,
        },
        "explain",
      );
    }
  }
  async function explainSaved() {
    if (
      busy.current ||
      storageIssue ||
      !explainedInquiry ||
      explanation?.status !== "available"
    )
      return;
    const owner = capturePersistence(),
      identity = explainedInquiry;
    if (!owner) return;
    busy.current = true;
    const saved = await owner.confirmSaved(
      (p) =>
        p.inquiries?.some(
          (i) =>
            i.id === identity.inquiryId &&
            i.exerciseId === identity.questionId &&
            i.exerciseRevision === identity.questionRevision &&
            i.text === identity.text &&
            !i.originRunId,
        ) === true,
    );
    if (!alive.current) return;
    if (!saved) {
      busy.current = false;
      setExplanation({
        status: "paused",
        result: null,
        message: "疑问保存尚未确认，本次没有发送模型。",
      });
      return;
    }
    await requestExplanation(identity, "explain");
  }
  function readSaved(item: NonNullable<typeof state.inquiries>[number]) {
    if (
      busy.current ||
      storageIssue ||
      !item.exerciseId ||
      !item.exerciseRevision
    )
      return;
    busy.current = true;
    void requestExplanation(
      {
        questionId: item.exerciseId,
        questionRevision: item.exerciseRevision,
        inquiryId: item.id,
        text: item.text,
      },
      "lookup",
    );
  }
  if (!ready || restorationFailed)
    return (
      <RecordRecovery section="ask" user={user} failed={restorationFailed} />
    );
  return (
    <LearningFrame
      section="ask"
      user={user}
      status={recordLabel(ready, storageIssue, status, user)}
      practiceDirectoryHref={contextSubject.libraryHref}
      studyHref={contextSubject.href.replace("/lab/practice", "/lab/study")}
    >
      <RecordNotice
        issue={storageIssue}
        status={status}
        state={state}
        retry={retrySync}
      />
      <main id="learning-main" className={s.workspace}>
        <header className={s.intro}>
          <h1>答疑</h1>
          <p id="ask-intro">
            哪一点没看懂，就直接问。已接通讲解的题目可以点“记下并解释”，也可以先记下来，之后再看。
          </p>
        </header>
        {entryConflict && (
          <section className={s.entryConflict} aria-label="还有未写完的问题">
            <p>
              你还有一个没写完的问题
              {linkedQuestion
                ? `，关于「${linkedQuestion.title}」`
                : linkedTopic
                  ? `，关于「${linkedTopic.title}」`
                  : ""}
              。
            </p>
            <p>
              这次想问的是「{requestedTitle}」。可以先保存原问题，再问这一题。
            </p>
            <div>
              <button
                disabled={storageIssue || pending}
                onClick={() => {
                  const id = crypto.randomUUID();
                  let moved = false;
                  const saved = update((p) => {
                    const next = savePreviousInquiryAndEnter(
                      p,
                      requestedContext,
                      id,
                      new Date().toISOString(),
                    );
                    moved = next !== p;
                    return next;
                  });
                  if (saved && moved) {
                    setMessage("原问题已记下，现在可以问这一题。");
                    setLastSavedId("");
                    document.getElementById("my-question")?.focus();
                  } else
                    setMessage(
                      "原问题还没有保存，请先检查记录状态或导出问题。",
                    );
                }}
              >
                保存原问题，问这一题
              </button>
              <button disabled={pending} onClick={() => setKeepPrevious(true)}>
                继续写原问题
              </button>
            </div>
          </section>
        )}
        <section className={s.composer} aria-label="写下自己的疑问">
          {(linkedQuestion || linkedTopic) && (
            <div className={s.context}>
              <span>
                {linkedQuestion
                  ? `关于这道题：${linkedQuestion.title}`
                  : `关于：${linkedTopic!.title}`}
              </span>
              <div className={s.contextActions}>
                {linkedQuestion && linkedReturn && (
                  <button
                    type="button"
                    className={s.returnToQuestion}
                    disabled={storageIssue}
                    onClick={() =>
                      openQuestion(linkedQuestion.id, draft?.originRunId)
                    }
                  >
                    {linkedReturn.kind === "paper"
                      ? "打开所属练习"
                      : "回到这道题"}
                  </button>
                )}
                {linkedTopicReturn && (
                  <button
                    type="button"
                    className={s.returnToQuestion}
                    disabled={storageIssue}
                    onClick={() => openTopic(linkedTopicReturn.topicId)}
                  >
                    回到这个知识点
                  </button>
                )}
                <button
                  type="button"
                  aria-label="取消问题关联"
                  disabled={storageIssue}
                  onClick={cancelContext}
                >
                  <StudyIcon name="close" />
                </button>
              </div>
            </div>
          )}
          {linkedQuestion && !hasQuestionInquiryMaterial(linkedQuestion.id) && (
            <p className={s.availability}>
              这道题可以先记下问题，自动答疑还在准备。你也可以回到题目查看参考答案。
            </p>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void submit();
            }}
          >
            <label className={s.visuallyHidden} htmlFor="my-question">
              我的疑问
            </label>
            <textarea
              id="my-question"
              aria-describedby="ask-intro"
              placeholder="写下你想问的……"
              value={draft?.text ?? ""}
              maxLength={4000}
              rows={3}
              disabled={!ready || entryConflict}
              onChange={(e) => {
                setMessage("");
                setLastSavedId("");
                update((p) => ({
                  ...p,
                  inquiryDraft: { ...p.inquiryDraft, text: e.target.value },
                }));
              }}
            />
            <div className={s.composerBottom}>
              <button
                className={s.primary}
                disabled={
                  !ready ||
                  storageIssue ||
                  pending ||
                  entryConflict ||
                  !draft?.text.trim()
                }
              >
                记下问题 <StudyIcon name="arrow" />
              </button>
              {linkedQuestion &&
                hasQuestionInquiryMaterial(linkedQuestion.id) &&
                !draft?.originRunId && (
                  <button
                    type="button"
                    className={s.primary}
                    data-explain-inquiry
                    disabled={
                      !ready ||
                      storageIssue ||
                      pending ||
                      entryConflict ||
                      !draft?.text.trim()
                    }
                    onClick={() => void submit(true)}
                  >
                    记下并解释
                  </button>
                )}
            </div>
          </form>
        </section>
        {message && (
          <p className={s.message} role="status">
            {storageIssue ? "问题暂留在本页，请先导出保存。" : message}
            {!storageIssue && recentlySaved?.exerciseId && savedReturn && (
              <button
                type="button"
                onClick={() =>
                  openQuestion(
                    recentlySaved.exerciseId!,
                    recentlySaved.originRunId,
                  )
                }
              >
                {savedReturn.kind === "paper" ? "打开所属练习" : "回到这道题"}
              </button>
            )}
            {!storageIssue && savedTopicReturn && (
              <button
                type="button"
                onClick={() => openTopic(savedTopicReturn.topicId)}
              >
                回到这个知识点
              </button>
            )}
          </p>
        )}
        {explainedInquiry && (
          <>
            <InquiryExplanation
              text={explainedInquiry.text}
              reply={explanation}
              pending={pending}
            />
            <div className={s.explanationActions}>
              {explanation?.status === "available" && (
                <button
                  data-explain-saved
                  disabled={storageIssue || pending}
                  onClick={() => void explainSaved()}
                >
                  解释这次疑问
                </button>
              )}
              <button
                disabled={storageIssue || pending}
                onClick={() => {
                  if (!busy.current) {
                    busy.current = true;
                    void requestExplanation(explainedInquiry, "lookup");
                  }
                }}
              >
                读取已保存解释
              </button>
              <button
                data-explained-question-return
                data-return-kind={explainedReturn?.kind}
                disabled={storageIssue || !explainedReturn}
                onClick={() => {
                  if (!explainedReturn) return;
                  openQuestion(
                    explainedInquiry.questionId,
                    explainedReturn.kind === "assessment"
                      ? explainedReturn.runId
                      : undefined,
                  );
                }}
              >
                {!explainedReturn
                  ? "原题关联待核对"
                  : explainedReturn.kind === "paper"
                    ? "打开所属练习"
                    : "回到原题继续"}
              </button>
            </div>
          </>
        )}
        <section className={s.faq} aria-labelledby="faq-title">
          <div className={s.sectionHeading}>
            <h2 id="faq-title">这些疑问，已有讲解</h2>
            <span>刑法 · 主观方面</span>
          </div>
          {studyQuestions.map((item) => (
            <article
              key={item.id}
              className={s.question}
              data-open={expanded === item.id}
            >
              <button
                onClick={() =>
                  setExpanded(expanded === item.id ? null : item.id)
                }
                aria-expanded={expanded === item.id}
              >
                <span>{item.title}</span>
                <StudyIcon name="down" />
              </button>
              {expanded === item.id && (
                <div className={`${s.answer} ${d.document}`}>
                  {item.answer.map((paragraph, i) => (
                    <p className={d.paragraph} key={i}>
                      {paragraph}
                    </p>
                  ))}
                  <ReferenceSources
                    sources={[{ id: item.id, ...item.source }]}
                  />
                </div>
              )}
            </article>
          ))}
        </section>
        {!!state.inquiries?.length && (
          <details
            className={s.savedQuestions}
            aria-labelledby="saved-questions-title"
          >
            <summary id="saved-questions-title">
              我记下的问题{" "}
              <span>
                {state.inquiries.length} 条 · {inquirySaveLabel}
              </span>
            </summary>
            {[...state.inquiries].reverse().map((item) => (
              <article key={item.id}>
                <p>{item.text}</p>
                <div>
                  <span>
                    {new Date(item.createdAt).toLocaleDateString("zh-CN", {
                      month: "numeric",
                      day: "numeric",
                    })}{" "}
                    · {inquirySaveLabel}
                  </span>
                  {item.exerciseId && item.exerciseRevision && (
                    <button
                      disabled={storageIssue || pending}
                      onClick={() => readSaved(item)}
                    >
                      查看已保存解释
                    </button>
                  )}
                  {item.exerciseId && (
                    <button
                      disabled={
                        storageIssue ||
                        !questionReturn(
                          state,
                          item.exerciseId,
                          item.originRunId,
                        )
                      }
                      onClick={() =>
                        openQuestion(item.exerciseId!, item.originRunId)
                      }
                    >
                      {questionReturn(state, item.exerciseId, item.originRunId)
                        ?.kind === "paper"
                        ? "打开所属练习"
                        : "回到这道题"}
                    </button>
                  )}
                  {item.topicId && !item.exerciseId && (
                    <>
                      <span>{topicFor(item.topicId)?.title}</span>
                      {studyTopicLocation(item.topicId) && (
                        <button
                          disabled={storageIssue}
                          onClick={() => openTopic(item.topicId!)}
                        >
                          回到这个知识点
                        </button>
                      )}
                    </>
                  )}
                </div>
              </article>
            ))}
          </details>
        )}
      </main>
    </LearningFrame>
  );
}
