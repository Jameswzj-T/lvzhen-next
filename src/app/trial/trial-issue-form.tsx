"use client";
import { useState } from "react";
import s from "../account/page.module.css";
export function TrialIssueForm() {
  const [area, setArea] = useState("练习"),
    [text, setText] = useState(""),
    [exported, setExported] = useState(false);
  function download() {
    if (!text.trim()) return;
    const body = `律真学习试用问题\n位置：${area}\n记录时间：${new Date().toISOString()}\n\n${text}\n`;
    const url = URL.createObjectURL(
      new Blob([body], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "律真-试用问题.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setExported(true);
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        download();
      }}
    >
      <label>
        在哪里遇到的问题
        <select value={area} onChange={(e) => setArea(e.target.value)}>
          {[
            "学习",
            "练习",
            "综合训练与模考",
            "答题讲解",
            "答疑",
            "账号与记录",
            "其他",
          ].map((area) => (
            <option key={area}>{area}</option>
          ))}
        </select>
      </label>
      <label>
        问题和希望的效果
        <textarea
          rows={5}
          maxLength={4000}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setExported(false);
          }}
          placeholder="例如：做到哪一步卡住了；你希望接下来能看到什么。"
          style={{
            display: "block",
            width: "100%",
            padding: 12,
            font: "inherit",
            lineHeight: 1.7,
            resize: "vertical",
            border: "1px solid var(--line, #c8d2e0)",
            borderRadius: 8,
            marginTop: 8,
          }}
        />
      </label>
      <button disabled={!text.trim()}>导出这条问题</button>
      {exported && (
        <p role="status" className={s.note}>
          已请求下载问题文件。请确认文件已保存，再交给试用负责人；这里不会自动发送。
        </p>
      )}
    </form>
  );
}
