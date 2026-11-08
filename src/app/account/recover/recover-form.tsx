"use client";
import { useState, type FormEvent } from "react";
import styles from "../page.module.css";
export default function RecoverForm({ local }: { local: boolean }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email")).trim();
    setBusy(true);
    setMessage("");
    try {
      const r = await fetch("/api/auth/request-password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Lvzhen-Records": "1",
        },
        body: JSON.stringify({ email }),
        signal: AbortSignal.timeout(15000),
      });
      setMessage(
        r.ok
          ? local
            ? "若该邮箱对应已有账号，本机会生成重置邮件预览；链接 30 分钟内有效。"
            : "若该邮箱对应已有账号，重置邮件已提交发送；请查看收件箱和垃圾邮件，链接 30 分钟内有效。"
          : r.status === 429
            ? "操作较频繁，请稍后再试。"
            : "暂时无法发送重置邮件，请稍后重试。",
      );
    } catch {
      setMessage("连接暂时中断，请稍后重试。");
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className={styles.main}>
      <a className={styles.brand} href="/account">
        ← 返回登录
      </a>
      <section className={styles.card}>
        <h1>找回账号密码</h1>
        <p className={styles.note}>
          {local
            ? "本机演练，不会实际发送邮件。预览保存在项目的 .local-records/mail-preview 文件夹，可打开最新的 reset 邮件文件继续。"
            : "输入注册邮箱，我们会将重置链接发送到该邮箱。"}
        </p>
        <form onSubmit={submit}>
          <label>
            注册邮箱
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
            />
          </label>
          <button disabled={busy}>
            {busy ? "正在处理……" : "申请重置链接"}
          </button>
        </form>
        {message && (
          <p role="status" className={styles.note}>
            {message}
          </p>
        )}
      </section>
    </main>
  );
}
