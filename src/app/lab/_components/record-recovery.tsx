"use client";
import type { Learner } from "@/accounts/client";
import { LearningFrame, type LearningSection } from "./learning-frame";
import s from "./record-recovery.module.css";

/** A missing checkpoint is unknown until reading succeeds. */
export function RecordRecovery({
  section,
  user,
  failed,
}: {
  section: LearningSection;
  user: Learner;
  failed: boolean;
}) {
  return (
    <LearningFrame
      section={section}
      user={user}
      status={failed ? "记录未恢复" : "正在恢复…"}
    >
      <main id="learning-main" className={s.workspace} aria-busy={!failed}>
        <h1>{failed ? "暂时无法恢复记录" : "正在恢复记录"}</h1>
        <p role={failed ? "alert" : "status"}>
          {failed
            ? "未能读取已有记录，原记录保持原样。请重新读取后继续。"
            : "正在读取已保存的学习位置、原答与疑问…"}
        </p>
        {failed && (
          <button onClick={() => window.location.reload()}>重新读取</button>
        )}
      </main>
    </LearningFrame>
  );
}
