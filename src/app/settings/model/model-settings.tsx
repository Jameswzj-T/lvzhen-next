"use client";
import { useEffect, useState, type FormEvent } from "react";
import {
  readModelAccess,
  saveModelAccess,
  removeModelAccess,
  modelAccessChange,
  modelAccessStorageKey,
} from "@/model-access/client";
import s from "./model-settings.module.css";
import { learningReturnHref, learningReturnLabel } from "@/learning/navigation";

export function ModelSettings({
  returnHref = "/lab/study",
}: {
  returnHref?: string;
}) {
  const backHref = learningReturnHref(returnHref);
  const backLabel = learningReturnLabel(backHref);
  const [configured, setConfigured] = useState(false),
    [ready, setReady] = useState(false);
  const [key, setKey] = useState(""),
    [message, setMessage] = useState("");
  useEffect(() => {
    const refresh = () => {
      setConfigured(!!readModelAccess());
      setReady(true);
    };
    const changed = (event: StorageEvent) => {
      if (!event.key || event.key === modelAccessStorageKey) refresh();
    };
    refresh();
    window.addEventListener(modelAccessChange, refresh);
    window.addEventListener("storage", changed);
    return () => {
      window.removeEventListener(modelAccessChange, refresh);
      window.removeEventListener("storage", changed);
    };
  }, []);
  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      saveModelAccess(key);
      setKey("");
      setConfigured(true);
      setMessage("已保存在这个浏览器里，关闭后再回来也能继续用。");
    } catch {
      setMessage("没有保存成功。请检查 Key，并确认浏览器允许本地保存。");
    }
  }
  function remove() {
    try {
      removeModelAccess();
      setKey("");
      setConfigured(false);
      setMessage("这个浏览器保存的 Key 已删除，做题记录和讲解仍然保留。");
    } catch {
      setMessage("删除未完成，请检查浏览器的存储设置。");
    }
  }
  return (
    <main className={s.main}>
      <a className={s.back} href={backHref}>
        ← {backLabel}
      </a>
      <header>
        <p className={s.eyebrow}>免费学习 · 自带模型</p>
        <h1>用你自己的 AI</h1>
        <p>
          律真免费提供题目、练习和学习记录。需要 AI
          讲解时，使用你自己的模型账号，费用由模型平台收取。
        </p>
      </header>
      <section className={s.card} aria-labelledby="model-provider">
        <div className={s.provider}>
          <div>
            <h2 id="model-provider">DeepSeek Flash</h2>
            <p>沿用当前评阅方式，关闭思考模式。</p>
          </div>
          <span className={configured ? s.ready : s.badge}>
            {!ready ? "读取中" : configured ? "已保存 Key" : "尚未配置"}
          </span>
        </div>
        <form onSubmit={save}>
          <label htmlFor="model-key">
            {configured ? "更换 API Key" : "API Key"}
          </label>
          <input
            id="model-key"
            name="api-key"
            type="password"
            autoComplete="off"
            spellCheck={false}
            autoCapitalize="none"
            maxLength={512}
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder={
              configured
                ? "填写新的 Key，原 Key 不会显示"
                : "粘贴你在 DeepSeek 申请的 Key"
            }
            required
          />
          <div className={s.actions}>
            <button type="submit" disabled={!ready || !key.trim()}>
              {configured ? "保存新的 Key" : "保存 Key"}
            </button>
            {configured && (
              <button type="button" className={s.secondary} onClick={remove}>
                删除 Key
              </button>
            )}
          </div>
        </form>
        {message && (
          <p className={s.message} role="status">
            {message}
          </p>
        )}
        <p className={s.help}>
          还没有 Key？
          <a
            href="https://platform.deepseek.com/api_keys"
            target="_blank"
            rel="noreferrer"
          >
            前往 DeepSeek 创建
          </a>
          。保存 Key 不会发送测试请求或产生模型费用。
        </p>
      </section>
      <section className={s.notes} aria-label="保存方式">
        <h2>保存在哪里？</h2>
        <p>
          Key
          只保存在这台设备的这个浏览器里，关闭后仍保留。它不会进入账号同步、学习记录或备份文件；换设备需要重新填写。
        </p>
        <p>
          请求 AI 时，网站服务器临时接收 Key 并转发到
          DeepSeek，不把它写进数据库或日志。浏览器中的保存内容没有额外加密；公用电脑用完请删除
          Key。
        </p>
        <p>
          不配置 Key 也能做题、看固定解析和保存原答。AI
          只在你主动提交评阅或提问时调用。
        </p>
      </section>
      <nav className={s.links}>
        <a href={backHref}>{backLabel} →</a>
        <a href="/records">查看记录与备份</a>
      </nav>
    </main>
  );
}
