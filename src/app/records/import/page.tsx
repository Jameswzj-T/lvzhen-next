"use client";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { topicFor } from "@/content/fault-catalog";
import { StudyGate } from "@/accounts/study-gate";
import {
  faultStorageKey,
  progressSchema,
  type FaultProgress,
} from "@/domain/fault-progress";
import {
  checkpointSchema,
  sameRecord,
  type SavedCheckpoint,
} from "@/records/protocol";
import { planImport } from "@/records/import-plan";
import { httpRecords } from "@/records/sync";
import {
  readLearningRecordFile,
  type LearningRecordFile,
} from "@/records/record-file";
import { MAX_LEARNING_RECORD_BYTES } from "@/records/limits";
import { previewKey } from "@/domain/lesson-session";
import styles from "../../account/page.module.css";
import { BrowserRecordImport } from "./browser-record-import";
import { SupportFrame } from "@/app/lab/_components/support-frame";

const receiptsSchema = z.array(
  z.object({
    sourceHash: z.string(),
    importedAt: z.string(),
    answerCount: z.number(),
    recallCount: z.number(),
  }),
);
type Receipt = z.infer<typeof receiptsSchema>[number];
function download(source: FaultProgress) {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(source, null, 2)], { type: "application/json" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = "律真-迁入前的试学记录.json";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export default function ImportPage() {
  const [lessonSource, setLessonSource] = useState(false);
  useEffect(() => {
    setLessonSource(
      new URLSearchParams(window.location.search).get("source") === "lesson",
    );
  }, []);
  return (
    <SupportFrame>
      <StudyGate>
        {(user) =>
          user ? (
            <ImportRecords
              key={`${user.id}:${lessonSource}`}
              user={user}
              lessonSource={lessonSource}
            />
          ) : (
            <BrowserRecordImport />
          )
        }
      </StudyGate>
    </SupportFrame>
  );
}
function ImportRecords({
  user,
  lessonSource,
}: {
  user: { id: string; name: string };
  lessonSource: boolean;
}) {
  const [source, setSource] = useState<FaultProgress | null>(null);
  const [fileCopies, setFileCopies] = useState<LearningRecordFile>([]);
  const [preview, setPreview] = useState<{
    account: SavedCheckpoint;
    local: string | null;
    plan: ReturnType<typeof planImport>;
  } | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [archive, setArchive] = useState<FaultProgress | null>(null);
  const sourceVersion = useRef(0);
  const mounted = useRef(true);
  const accountKey = `${faultStorageKey}:account:${user.id}`;
  const headers = {
    "Content-Type": "application/json",
    "X-Lvzhen-Records": "1",
    "X-Lvzhen-Learner": user.id,
  };
  useEffect(() => {
    mounted.current = true;
    if (lessonSource) readLesson();
    return () => {
      mounted.current = false;
    };
  }, [lessonSource]);
  function choose(raw: string) {
    sourceVersion.current++;
    setPreview(null);
    setConfirmed(false);
    setMessage("");
    try {
      const copies = readLearningRecordFile(raw);
      setFileCopies(copies);
      setSource(copies.length === 1 ? copies[0].state : null);
    } catch {
      setSource(null);
      setFileCopies([]);
      setMessage("这份记录的格式或课程版本无法识别，原文件保持原样。");
    }
  }
  function readLesson() {
    try {
      const raw = localStorage.getItem(previewKey);
      if (raw) choose(raw);
      else setMessage("本浏览器还没有可读取的试学记录。");
    } catch {
      setMessage("原试学记录暂时无法读取，已保持原样。");
    }
  }
  async function listArchives() {
    try {
      const r = await fetch("/api/learning/fault/import", {
        headers,
        cache: "no-store",
        signal: AbortSignal.timeout(6000),
      });
      if (!r.ok) throw new Error();
      const items = receiptsSchema.parse(await r.json());
      if (mounted.current) setReceipts(items);
    } catch {
      if (mounted.current) setMessage("暂时无法读取迁入副本，请稍后重新查看。");
    }
  }
  async function inspect() {
    if (!source) return;
    const version = sourceVersion.current;
    setBusy(true);
    setPreview(null);
    setConfirmed(false);
    setMessage("");
    try {
      const local = localStorage.getItem(accountKey);
      const account = await httpRecords(user.id).load();
      if (!mounted.current || version !== sourceVersion.current) return;
      if (
        localStorage.getItem(accountKey) !== local ||
        (local !== null &&
          !sameRecord(progressSchema.parse(JSON.parse(local)), account.state))
      ) {
        setMessage(
          "账号还有未同步的草稿或记录冲突，请先回到学习页面保存或处理，再检查迁入。",
        );
        return;
      }
      setPreview({ account, local, plan: planImport(account.state, source) });
    } catch {
      if (mounted.current)
        setMessage(
          "暂时无法迁入：可能有同一答卷编号对应不同原文，或登录、连接状态发生变化。请保留两份记录后重新检查。",
        );
    } finally {
      if (mounted.current) setBusy(false);
    }
  }
  async function commit() {
    if (!source || !preview || !confirmed) return;
    const snapshot = source;
    const checked = preview;
    setBusy(true);
    setMessage("");
    try {
      if (localStorage.getItem(accountKey) !== checked.local)
        throw new Error("local_changed");
      const r = await fetch("/api/learning/fault/import", {
        method: "POST",
        headers,
        body: JSON.stringify({
          confirmedOwnership: true,
          expectedGeneration: checked.account.generation,
          state: snapshot,
        }),
        signal: AbortSignal.timeout(10000),
      });
      if (!r.ok)
        throw new Error(
          r.status === 413 ? "record_too_large" : "import_failed",
        );
      const saved = checkpointSchema.parse(await r.json());
      if (!mounted.current) return;
      if (localStorage.getItem(accountKey) === checked.local) {
        // Persist state before generation. A failed marker write causes a safe conflict, never an overwrite.
        localStorage.setItem(accountKey, JSON.stringify(saved.state));
        localStorage.setItem(
          `${accountKey}:server-generation`,
          String(saved.generation),
        );
        setMessage(
          "迁入完成。原试学记录和完整副本均已保留，可以回到学习页面继续。",
        );
      } else
        setMessage(
          "服务端已完成迁入，但本浏览器出现了新草稿，已保留。请回到学习页面处理备份冲突。",
        );
      setPreview(null);
      setConfirmed(false);
    } catch (error) {
      if (mounted.current) {
        setMessage(
          error instanceof Error && error.message === "record_too_large"
            ? "这份记录超出单次迁入上限，原文件保留；请先导出当前记录并联系试用负责人。"
            : "尚未确认迁入结果。原记录保持原样，请重新检查；若上次已成功，同一份记录不会重复迁入。",
        );
        setPreview(null);
        setConfirmed(false);
      }
    } finally {
      if (mounted.current) setBusy(false);
    }
  }
  async function viewArchive(hash: string) {
    try {
      const r = await fetch(
        `/api/learning/fault/import?source=${encodeURIComponent(hash)}`,
        { headers, cache: "no-store", signal: AbortSignal.timeout(6000) },
      );
      if (!r.ok) throw new Error();
      const value = z.object({ source: progressSchema }).parse(await r.json());
      if (mounted.current) setArchive(value.source);
    } catch {
      if (mounted.current)
        setMessage("暂时无法打开副本，请确认登录状态后重试。");
    }
  }
  return (
    <main className={styles.main}>
      <a
        className={styles.brand}
        href={lessonSource ? "/lab/lesson?view=map" : "/lab/study"}
      >
        ← 返回学习
      </a>
      <section className={styles.card}>
        <h1>把试学记录带进来</h1>
        <p>当前账号：{user.name}</p>
        <p className={styles.note}>
          可以带回原答、草稿、学习位置、已记问题和记录文件中已有的讲解。确认迁入后保存到当前账号；原文件和完整迁入副本继续保留。尚未写入记录文件的旧试验反馈仍在原处回看。
        </p>
        <button disabled={busy} onClick={readLesson}>
          读取引导样例记录
        </button>
        <button
          disabled={busy}
          onClick={() => {
            try {
              const raw = localStorage.getItem(faultStorageKey);
              if (raw) choose(raw);
              else
                setMessage(
                  "本浏览器没有旧试学记录，也可以选择之前导出的文件。",
                );
            } catch {
              setMessage("浏览器记录暂时无法读取，请保留数据后再试。");
            }
          }}
        >
          读取旧单元记录
        </button>
        <label style={{ display: "block", margin: "18px 0" }}>
          选择导出的记录文件
          <input
            disabled={busy}
            type="file"
            accept=".json,application/json"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              sourceVersion.current++;
              setSource(null);
              setFileCopies([]);
              setPreview(null);
              setConfirmed(false);
              if (file.size > MAX_LEARNING_RECORD_BYTES) {
                setMessage("记录文件过大，请保留原文件，暂不迁入。");
                return;
              }
              const version = sourceVersion.current;
              try {
                const raw = await file.text();
                if (mounted.current && version === sourceVersion.current)
                  choose(raw);
              } catch {
                setMessage("文件读取失败，请重新选择。");
              }
            }}
          />
        </label>
        {fileCopies.length > 1 && (
          <section aria-label="选择恢复副本">
            <p>
              文件里有 {fileCopies.length}{" "}
              份恢复副本。请选择一份检查，其他副本继续保留在原文件中。
            </p>
            {fileCopies.map((copy, index) => (
              <button
                className={styles.secondary}
                key={copy.id}
                disabled={busy}
                aria-pressed={source === copy.state}
                onClick={() => {
                  sourceVersion.current++;
                  setSource(copy.state);
                  setPreview(null);
                  setConfirmed(false);
                  setMessage("");
                }}
              >
                副本 {index + 1} · {copy.state.attempts.length} 份作答 ·{" "}
                {copy.state.updatedAt ?? "未记录时间"}
              </button>
            ))}
          </section>
        )}
        {message && (
          <p role="status" className={styles.note}>
            {message}
          </p>
        )}
        {source && (
          <>
            <p>
              选中记录：{source.attempts.length} 份作答、{source.reviews.length}{" "}
              次回忆、{source.corrections.length} 条自查与复习选择、
              {source.inquiries?.length ?? 0} 个问题、
              {source.submittedFeedback?.length ?? 0} 份已存讲解。
            </p>
            <details>
              <summary>核对原记录</summary>
              <RecordText state={source} />
            </details>
            <button
              className={styles.secondary}
              onClick={() => download(source)}
            >
              导出这份原记录
            </button>
            <button disabled={busy} onClick={inspect}>
              检查迁入内容
            </button>
          </>
        )}
        {preview && (
          <>
            <p>
              将新增 {preview.plan.addedAnswers} 份作答、
              {preview.plan.addedRecalls} 次回忆、
              {preview.plan.addedCorrections}{" "}
              条自查与复习选择，已有相同记录不会重复添加。
            </p>
            <p>
              账号已有学习位置和草稿优先保留；不同草稿共{" "}
              {preview.plan.differingDrafts}{" "}
              处。旧记录完整保存在迁入副本中，可随时查看或导出。
            </p>
            <label
              style={{
                display: "flex",
                alignItems: "start",
                gap: 10,
                margin: "20px 0",
              }}
            >
              <input
                style={{ width: 20, minHeight: 20, flexShrink: 0 }}
                type="checkbox"
                checked={confirmed}
                disabled={busy}
                onChange={(e) => setConfirmed(e.target.checked)}
              />
              我确认这份试学记录属于我，迁入当前账号。
            </label>
            <button disabled={!confirmed || busy} onClick={commit}>
              {busy ? "正在迁入……" : "确认迁入"}
            </button>
          </>
        )}
      </section>
      <section className={styles.card}>
        <h2>已保留的迁入副本</h2>
        <button
          className={styles.secondary}
          disabled={busy}
          onClick={listArchives}
        >
          查看迁入副本
        </button>
        {receipts.map((r) => (
          <p key={r.sourceHash}>
            <button
              className={styles.secondary}
              onClick={() => viewArchive(r.sourceHash)}
            >
              {new Date(r.importedAt).toLocaleString("zh-CN")} · {r.answerCount}{" "}
              份作答、{r.recallCount} 次回忆
            </button>
          </p>
        ))}
        {archive && (
          <>
            <RecordText state={archive} />
            <button onClick={() => download(archive)}>导出完整副本</button>
          </>
        )}
      </section>
    </main>
  );
}
function RecordText({ state }: { state: FaultProgress }) {
  return (
    <div style={{ overflowWrap: "anywhere" }}>
      <p>
        上次位置：{topicFor(state.topicId)?.title ?? "旧学习位置"}；最后学习：
        {state.updatedAt
          ? new Date(state.updatedAt).toLocaleString("zh-CN")
          : "尚无时间记录"}
      </p>
      {state.attempts.map((a) => (
        <pre style={{ whiteSpace: "pre-wrap" }} key={a.id}>
          {a.choice ? `选择：${a.choice}\n` : ""}
          {a.answer || "未填写理由"}
        </pre>
      ))}
      {state.reviews.map((a) => (
        <pre style={{ whiteSpace: "pre-wrap" }} key={a.id}>
          {a.answer}
        </pre>
      ))}
      {state.corrections.map((c) => (
        <pre style={{ whiteSpace: "pre-wrap" }} key={c.id}>
          自查订正：{c.note}
          {"\n"}
          {c.answer}
          {"\n"}
          当时选择：{c.revisit ? "加入复习重点" : "暂不放入复习重点"}
        </pre>
      ))}
      {(state.inquiries ?? []).map((inquiry) => (
        <pre style={{ whiteSpace: "pre-wrap" }} key={`inquiry-${inquiry.id}`}>
          已记问题：{inquiry.text}
        </pre>
      ))}
      {!!state.inquiryDraft?.text && (
        <pre style={{ whiteSpace: "pre-wrap" }}>
          未写完的问题：{state.inquiryDraft.text}
        </pre>
      )}
      {Object.entries(state.correctionDrafts).map(([id, d]) => (
        <pre style={{ whiteSpace: "pre-wrap" }} key={id}>
          自查草稿：{d.note}
          {"\n"}
          {d.answer}
        </pre>
      ))}
      {Object.entries({ ...state.drafts, ...state.recallDrafts })
        .filter(([, d]) => !d.submittedId && (d.answer || d.choice))
        .map(([id, d]) => (
          <p key={id} style={{ whiteSpace: "pre-wrap" }}>
            草稿：{d.choice && `选择 ${d.choice} `}
            {d.answer}
          </p>
        ))}
    </div>
  );
}
