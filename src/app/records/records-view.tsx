"use client";
import { useEffect, useRef, useState } from "react";
import { StudyGate } from "@/accounts/study-gate";
import type { Learner } from "@/accounts/client";
import { faultStorageKey, progressSchema } from "@/domain/fault-progress";
import { practiceSubject, practiceSubjectInfo } from "@/content/practice-set";
import {
  httpRecords,
  importRecordsToAccount,
  RecordTooLarge,
} from "@/records/sync";
import {
  inspectRecordMerge,
  commitRecordMerge,
  type RecordMergePreview,
} from "@/records/recovery-transfer";
import { usePractice } from "../lab/practice/use-practice";
import {
  exportLearningRecords,
  LearningFrame,
  RecordNotice,
  recordLabel,
} from "../lab/_components/learning-frame";
import {
  LearningOverview,
  type LearningOverviewFilter,
} from "./learning-overview";
import r from "./learning-overview.module.css";
import s from "../account/page.module.css";

export function RecordsEntry({
  publicSite = false,
  ...filters
}: LearningOverviewFilter & { publicSite?: boolean }) {
  return (
    <StudyGate>
      {(user) => (
        <RecordsView
          key={user?.id ?? "guest"}
          user={user}
          publicSite={publicSite}
          {...filters}
        />
      )}
    </StudyGate>
  );
}
export function RecordsView({
  user,
  publicSite = false,
  ...filters
}: { user: Learner; publicSite?: boolean } & LearningOverviewFilter) {
  const { state, ready, restorationFailed, storageIssue, status, retrySync } =
    usePractice(user?.id ?? null, false);
  const [preview, setPreview] = useState<RecordMergePreview | null>(null),
    [confirmed, setConfirmed] = useState(false),
    [busy, setBusy] = useState(false),
    [message, setMessage] = useState("");
  const alive = useRef(true);
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);
  useEffect(() => {
    function revealBackup() {
      if (window.location.hash !== "#learning-backup") return;
      const panel = document.getElementById("learning-backup");
      if (panel instanceof HTMLDetailsElement) panel.open = true;
    }
    revealBackup();
    window.addEventListener("hashchange", revealBackup);
    return () => window.removeEventListener("hashchange", revealBackup);
  }, []);
  const info = practiceSubjectInfo(practiceSubject(state.exerciseId));
  async function inspect() {
    if (!user || busy) return;
    setBusy(true);
    setPreview(null);
    setConfirmed(false);
    setMessage("");
    try {
      const result = await inspectRecordMerge(
        localStorage,
        user.id,
        httpRecords(user.id),
        state,
      );
      if (alive.current) setPreview(result);
    } catch {
      if (alive.current)
        setMessage(
          "暂时不能比较记录。请先导出本机记录，确认登录和连接后再试。",
        );
    } finally {
      if (alive.current) setBusy(false);
    }
  }
  async function merge() {
    if (!preview || !confirmed || busy) return;
    setBusy(true);
    setMessage("");
    try {
      const result = await commitRecordMerge(
        localStorage,
        preview,
        importRecordsToAccount,
        crypto.randomUUID(),
      );
      if (alive.current) {
        setPreview(null);
        if (result.localUpdated) {
          // Reopen the acknowledged checkpoint so counts and exports cannot
          // keep showing the pre-merge snapshot owned by the old record object.
          window.location.reload();
          return;
        }
        setMessage(
          "账号记录已合并；本机出现的新草稿已保留，请先导出，再重新打开记录页面。",
        );
      }
    } catch (error) {
      if (alive.current)
        setMessage(
          error instanceof RecordTooLarge
            ? "记录超出单次同步上限。本机原记录和恢复副本保留，请导出后交给试用负责人处理。"
            : "尚未确认合并完成。本机原记录和恢复副本保留，请导出后重新比较，不要反复提交。",
        );
    } finally {
      if (alive.current) setBusy(false);
    }
  }
  function exportCopies() {
    try {
      const key = user
        ? `${faultStorageKey}:account:${user.id}`
        : faultStorageKey;
      const prefix = `${key}:recovery:`;
      const copies = Object.keys(localStorage)
        .filter((key) => key.startsWith(prefix))
        .map((key) => ({
          id: key.slice(prefix.length),
          state: progressSchema.parse(JSON.parse(localStorage.getItem(key)!)),
        }));
      if (!copies.length) {
        setMessage("本机暂时没有恢复前副本。当前记录可用上方按钮导出。");
        return;
      }
      const url = URL.createObjectURL(
        new Blob([JSON.stringify({ recoveryCopies: copies }, null, 2)], {
          type: "application/json",
        }),
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = "律真-恢复前的学习记录.json";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      setMessage("暂时无法导出恢复副本，请保留浏览器数据后再试。");
    }
  }
  return (
    <LearningFrame
      user={user}
      status={recordLabel(ready, storageIssue, status, user)}
      studyHref={info.href.replace("/lab/practice", "/lab/study")}
      practiceDirectoryHref={info.libraryHref}
    >
      <RecordNotice
        issue={storageIssue}
        status={status}
        state={state}
        retry={retrySync}
      />
      <main id="learning-main" className={r.page}>
        {ready && !restorationFailed ? (
          <LearningOverview state={state} {...filters} />
        ) : (
          <header>
            <h1>我的学习</h1>
            <p role="status">
              {restorationFailed
                ? "记录暂未恢复，现有内容保持原样。"
                : "正在接上你的学习记录…"}
            </p>
          </header>
        )}
        <details
          id="learning-backup"
          className={r.backup}
          open={restorationFailed || status === "conflict" || undefined}
        >
          <summary>备份、恢复与数据保存</summary>
          <section className={s.card}>
            <h2>把做过的题留好</h2>
            <p role="status">
              {restorationFailed
                ? "记录暂未恢复，现有内容保持原样。"
                : recordLabel(ready, storageIssue, status, user)}
            </p>
            {ready && !restorationFailed && (
              <>
                <p>
                  {state.attempts.length} 份作答 ·{" "}
                  {state.submittedFeedback?.length ?? 0} 份已存讲解 ·{" "}
                  {state.inquiries?.length ?? 0} 个已记问题
                </p>
                <p>
                  导出文件包含原答、未写完的草稿、学习位置、今日安排和已保存讲解，不包含模型
                  Key。可以用文件恢复到自己的浏览器。
                </p>
                <button onClick={() => exportLearningRecords(state)}>
                  导出完整学习记录
                </button>
              </>
            )}
            {restorationFailed && (
              <button onClick={() => window.location.reload()}>重新读取</button>
            )}
            <p>
              <a href="/records/import">从导出文件恢复 / 查看迁入副本</a>
            </p>
            {!publicSite && (
              <p>
                <a href="/trial">查看本次试用范围 / 记录使用问题</a>
              </p>
            )}
          </section>
          {ready && !restorationFailed && (
            <section className={s.card}>
              <h2>
                {publicSite ? "记录保存在自己的浏览器" : "账号与本机记录"}
              </h2>
              {publicSite ? (
                <p>
                  免费版无需账号。关掉页面后记录仍在；清理浏览器或换设备前，请先导出文件，再到另一台设备导入。
                </p>
              ) : !user ? (
                <>
                  <p>
                    当前记录保存在这个浏览器。登录自己的账号后，可以迁入记录并在其他设备接着学。
                  </p>
                  <a href="/account?returnTo=records">登录自己的账号</a>
                </>
              ) : (
                <>
                  <p>
                    {status === "conflict"
                      ? "账号与本机都有记录。先比较，再确认合并；相同原答不会重复添加。"
                      : "需要时可核对本机与账号记录。合并后以账号当前学习位置和草稿为主；本机不同草稿会留在恢复前副本里。"}
                  </p>
                  {status === "unavailable" && (
                    <button
                      className={s.secondary}
                      disabled={busy}
                      onClick={() => retrySync()}
                    >
                      重新同步
                    </button>
                  )}
                  {status === "account-changed" && (
                    <a href="/account?returnTo=records">重新确认账号</a>
                  )}
                  <button
                    className={s.secondary}
                    disabled={
                      busy || storageIssue || status === "account-changed"
                    }
                    onClick={() => void inspect()}
                  >
                    比较两边记录
                  </button>
                  {preview && (
                    <>
                      <p>
                        账号：{preview.account.state?.attempts.length ?? 0}{" "}
                        份作答；本机：{preview.source.attempts.length} 份作答。
                      </p>
                      <p>
                        合并会增加 {preview.plan.addedAnswers} 份作答，有{" "}
                        {preview.plan.differingDrafts}{" "}
                        份不同草稿。合并前会在本机留一份完整副本。
                      </p>
                      <label
                        style={{
                          display: "flex",
                          gap: 12,
                          alignItems: "start",
                          margin: "16px 0",
                        }}
                      >
                        <input
                          style={{ width: 20, minHeight: 20, flexShrink: 0 }}
                          type="checkbox"
                          checked={confirmed}
                          disabled={busy}
                          onChange={(e) => setConfirmed(e.target.checked)}
                        />
                        我确认两边记录都属于我，合并到当前账号。
                      </label>
                      <button
                        disabled={busy || !confirmed}
                        onClick={() => void merge()}
                      >
                        确认合并并保留副本
                      </button>
                    </>
                  )}
                </>
              )}
              <button className={s.secondary} onClick={exportCopies}>
                导出恢复前的本机副本
              </button>
              <p>
                <a href={info.href}>回到练习</a>
              </p>
            </section>
          )}
        </details>
        {message && (
          <p role="status" className={s.note}>
            {message}
          </p>
        )}
      </main>
    </LearningFrame>
  );
}
