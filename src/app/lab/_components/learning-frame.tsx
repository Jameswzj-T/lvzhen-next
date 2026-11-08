"use client";
import type { ReactNode } from "react";
import type { Learner } from "@/accounts/client";
import type { FaultProgress } from "@/domain/fault-progress";
import type { SyncStatus } from "@/records/sync";
import { ModelSettingsLink } from "./model-settings-link";
import s from "./learning-frame.module.css";

export type LearningSection = "study" | "practice" | "ask";
export function StudyIcon({
  name,
}: {
  name:
    | "study"
    | "practice"
    | "ask"
    | "arrow"
    | "down"
    | "close"
    | "person"
    | "check";
}) {
  const paths = {
    study: "M12 5v15M12 5C8 2 3 3 3 3v16s5-1 9 1c4-2 9-1 9-1V3s-5-1-9 2",
    practice: "M5 4h9M5 4v16h14v-9M10 13l2-5 6-6 4 4-6 6-6 1Z",
    ask: "M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8l-6 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM8 9h8M8 13h5",
    arrow: "M5 12h14m-6-6 6 6-6 6",
    down: "m6 9 6 6 6-6",
    close: "m6 6 12 12M18 6 6 18",
    person: "M7 8a5 5 0 1 0 10 0 5 5 0 1 0-10 0M3 22a9 9 0 0 1 18 0",
    check: "m5 12 4 4L19 6",
  };
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
const sections = [
  { id: "study", title: "学习", href: "/lab/study" },
  { id: "practice", title: "练习", href: "/lab/practice?view=library" },
  { id: "ask", title: "答疑", href: "/lab/ask" },
] as const;
export function LearningHeader({
  section,
  user,
  status,
  session = false,
  practiceDirectoryHref = "/lab/practice?view=library",
  studyHref = "/lab/study",
}: {
  section?: LearningSection;
  user?: Learner;
  status?: string;
  session?: boolean;
  practiceDirectoryHref?: string;
  studyHref?: string;
}) {
  return (
    <>
      <header className={`${s.header} ${session ? s.sessionHeader : ""}`}>
        <a className={s.brand} href={studyHref} aria-label="律真学习首页">
          <span>律</span>
          <strong>律真</strong>
        </a>
        <nav className={s.desktopNav} aria-label="主要入口">
          {sections.map((item) => (
            <a
              key={item.id}
              href={
                item.id === "practice"
                  ? practiceDirectoryHref
                  : item.id === "study"
                    ? studyHref
                    : item.href
              }
              aria-current={section === item.id ? "page" : undefined}
            >
              {item.title}
            </a>
          ))}
        </nav>
        {session && (
          <a className={s.sessionExit} href={practiceDirectoryHref}>
            练习目录
          </a>
        )}
        <div className={s.account}>
          {status && <span role="status">{status}</span>}
          <a
            href="/records"
            aria-label="我的学习与备份"
            className={s.recordsLink}
          >
            <StudyIcon name="study" />
            <span>我的学习</span>
          </a>
          <details className={s.utilities}>
            <summary>
              设置 <StudyIcon name="down" />
            </summary>
            <nav aria-label="设置与数据" className={s.utilityMenu}>
              <ModelSettingsLink />
              <a href="/records#learning-backup">备份与恢复</a>
              <a href={`/account?returnTo=${section ?? "study"}`}>
                {user ? "我的账号" : "账号（可选）"}
              </a>
            </nav>
          </details>
        </div>
      </header>
      {!session && (
        <nav className={s.mobileNav} aria-label="主要入口">
          {sections.map((item) => (
            <a
              key={item.id}
              href={
                item.id === "practice"
                  ? practiceDirectoryHref
                  : item.id === "study"
                    ? studyHref
                    : item.href
              }
              aria-current={section === item.id ? "page" : undefined}
            >
              <StudyIcon name={item.id} />
              <span>{item.title}</span>
            </a>
          ))}
        </nav>
      )}
    </>
  );
}
export function LearningFrame({
  section,
  user,
  children,
  status,
  session = false,
  practiceDirectoryHref,
  studyHref,
}: {
  section?: LearningSection;
  user?: Learner;
  children: ReactNode;
  status?: string;
  session?: boolean;
  practiceDirectoryHref?: string;
  studyHref?: string;
}) {
  return (
    <div className={`${s.frame} ${session ? s.sessionFrame : ""}`}>
      <a className={s.skipLink} href="#learning-main">
        跳到内容
      </a>
      <LearningHeader
        section={section}
        user={user}
        status={status}
        session={session}
        practiceDirectoryHref={practiceDirectoryHref}
        studyHref={studyHref}
      />
      {children}
    </div>
  );
}
export function recordLabel(
  ready: boolean,
  issue: boolean,
  status: SyncStatus,
  user: Learner,
) {
  if (!ready) return "正在读取…";
  if (issue) return "尚未保存";
  if (!user) return "本机记录";
  return {
    loading: "正在读取…",
    saved: "已同步",
    pending: "正在保存…",
    saving: "正在保存…",
    unavailable: "本机已保存",
    conflict: "记录待处理",
    "too-large": "记录需导出备份",
    "account-changed": "请重新登录",
  }[status];
}
export function exportLearningRecords(state: FaultProgress) {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(state, null, 2)], { type: "application/json" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "律真-学习记录.json";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function RecordNotice({
  issue,
  status,
  state,
  retry,
}: {
  issue: boolean;
  status: SyncStatus;
  state: FaultProgress;
  retry: () => unknown;
}) {
  if (
    !issue &&
    !["unavailable", "conflict", "account-changed", "too-large"].includes(
      status,
    )
  )
    return null;
  return (
    <div className={s.notice} role="alert">
      <p>
        {issue
          ? "本页记录暂时无法继续保存，请先导出记录。"
          : status === "too-large"
            ? "记录超出单次同步上限，完整内容仍在本机，请先导出备份。"
            : status === "conflict"
              ? "账号与本机记录不同，请先处理记录。"
              : status === "account-changed"
                ? "登录状态已变化，请重新确认账号。"
                : "暂未同步到账号，记录已留在本机。"}
      </p>
      <button onClick={() => exportLearningRecords(state)}>导出记录</button>
      {status === "unavailable" && !issue && (
        <button onClick={() => retry()}>重新同步</button>
      )}
      {status === "conflict" && <a href="/records">处理记录</a>}
      {status === "account-changed" && <a href="/account">确认账号</a>}
    </div>
  );
}
