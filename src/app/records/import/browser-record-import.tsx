"use client";
import { useEffect, useRef, useState } from "react";
import {
  readLearningRecordFile,
  type LearningRecordFile,
} from "@/records/record-file";
import {
  previewLocalRecordImport,
  commitLocalRecordImport,
  type LocalRecordImportPreview,
} from "@/records/local-record-import";
import { ImportConflict } from "@/records/import-plan";
import { MAX_LEARNING_RECORD_BYTES } from "@/records/limits";
import s from "./browser-record-import.module.css";

function failureMessage(error: unknown) {
  if (error instanceof ImportConflict)
    return "两份记录里有同一编号、内容不同的作答或训练。请先保留两份文件，这次没有合并。";
  if (error instanceof Error && error.message === "local_changed")
    return "其他页面刚保存了新内容。请重新核对文件，再恢复。";
  if (error instanceof Error && error.message === "record_too_large")
    return "记录超出本次恢复的大小上限，请保留原文件。";
  return "这次没有确认恢复成功。请保留原文件，检查浏览器是否还有存储空间。";
}

export function BrowserRecordImport() {
  const [copies, setCopies] = useState<LearningRecordFile>([]);
  const [selected, setSelected] = useState<LearningRecordFile[number] | null>(
    null,
  );
  const [preview, setPreview] = useState<LocalRecordImportPreview | null>(null);
  const [message, setMessage] = useState("");
  const [complete, setComplete] = useState(false);
  const version = useRef(0);
  const alive = useRef(true);
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      version.current++;
    };
  }, []);
  function inspect(copy: LearningRecordFile[number]) {
    setSelected(copy);
    setPreview(null);
    setComplete(false);
    setMessage("");
    try {
      setPreview(previewLocalRecordImport(localStorage, copy.state));
    } catch (error) {
      setMessage(failureMessage(error));
    }
  }
  async function choose(file: File | undefined) {
    const request = ++version.current;
    setCopies([]);
    setSelected(null);
    setPreview(null);
    setComplete(false);
    setMessage("");
    if (!file) return;
    if (file.size > MAX_LEARNING_RECORD_BYTES) {
      setMessage("文件超过16MB，请保留原文件，暂不恢复。");
      return;
    }
    try {
      const raw = await file.text();
      if (!alive.current || request !== version.current) return;
      const read = readLearningRecordFile(raw);
      setCopies(read);
      if (read.length === 1) inspect(read[0]);
    } catch {
      if (alive.current && request === version.current)
        setMessage(
          "没有读懂这份记录文件。请选择律真导出的JSON，原文件仍然保留。",
        );
    }
  }
  function restore() {
    if (!preview) return;
    try {
      commitLocalRecordImport(localStorage, preview, crypto.randomUUID());
      setComplete(true);
      setPreview(null);
      setMessage(
        "恢复完成。原答、草稿和已存讲解现在都可以在“我的学习”里查看。",
      );
    } catch (error) {
      setPreview(null);
      setMessage(failureMessage(error));
    }
  }
  return (
    <main className={s.main}>
      <a className={s.back} href="/records">
        ← 我的学习
      </a>
      <header className={s.heading}>
        <p>把之前学过的内容接回来</p>
        <h1>恢复学习记录</h1>
        <p>选择之前导出的文件，核对后恢复到这个浏览器。无需登录。</p>
      </header>
      <section className={s.card} aria-label="选择学习备份">
        <label className={s.fileLabel}>
          选择记录文件
          <input
            type="file"
            accept=".json,application/json"
            onChange={(e) => void choose(e.target.files?.[0])}
          />
        </label>
        <p className={s.caption}>文件只在浏览器内读取。模型Key仍单独保存。</p>
        {copies.length > 1 && (
          <div className={s.copies}>
            <p>文件里有{copies.length}份副本，请选择要恢复的一份。</p>
            {copies.map((copy, index) => (
              <button
                type="button"
                className={s.secondary}
                key={copy.id}
                aria-pressed={selected?.id === copy.id}
                onClick={() => {
                  version.current++;
                  inspect(copy);
                }}
              >
                副本{index + 1} · {copy.state.attempts.length}份作答
              </button>
            ))}
          </div>
        )}
        {preview && (
          <section className={s.preview} aria-label="本次恢复内容">
            <h2>这次会恢复什么</h2>
            <dl>
              <div>
                <dt>新增原答</dt>
                <dd>{preview.plan.addedAnswers}份</dd>
              </div>
              <div>
                <dt>文件中的讲解</dt>
                <dd>{preview.source.submittedFeedback?.length ?? 0}份</dd>
              </div>
              <div>
                <dt>文件中的疑问</dt>
                <dd>{preview.source.inquiries?.length ?? 0}个</dd>
              </div>
            </dl>
            <p>
              {preview.restoresPosition
                ? "会接回文件中的学习位置、今日安排和草稿。"
                : "同一份原答不会重复添加，本机已有的学习位置和草稿优先保留。"}
            </p>
            <p className={s.caption}>
              恢复前会留下完整副本。
              {preview.plan.differingDrafts
                ? `${preview.plan.differingDrafts}处不同草稿也会随文件副本保留。`
                : ""}
            </p>
            <button type="button" className={s.primary} onClick={restore}>
              恢复到这个浏览器
            </button>
          </section>
        )}
        {message && (
          <p className={s.message} role={complete ? "status" : "alert"}>
            {message}
          </p>
        )}
        {selected && !preview && !complete && (
          <button
            type="button"
            className={s.secondary}
            onClick={() => inspect(selected)}
          >
            重新核对
          </button>
        )}
        {complete && (
          <a className={s.primary} href="/records">
            查看我的学习 →
          </a>
        )}
      </section>
      <a className={s.back} href="/lab/study">
        回到学习首页 →
      </a>
    </main>
  );
}
