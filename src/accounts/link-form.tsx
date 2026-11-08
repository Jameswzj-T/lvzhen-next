"use client";
import { useEffect, useState, type FormEvent } from "react";
import { announceAccountChange } from "./client";
import styles from "../app/account/page.module.css";

export function AccountLinkForm({
  mode,
  local = true,
}: {
  mode: "reset" | "verify";
  local?: boolean;
}) {
  const [token, setToken] = useState("");
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    function readLink() {
      const value =
        new URLSearchParams(window.location.hash.slice(1)).get("token") ?? "";
      // Avoid persisting the link in local storage or sending it in page requests.
      setToken((previous) => value || previous);
      if (value) {
        setDone(false);
        setMessage("");
      }
      window.history.replaceState(null, "", window.location.pathname);
      setReady(true);
    }
    readLink();
    window.addEventListener("hashchange", readLink);
    return () => window.removeEventListener("hashchange", readLink);
  }, []);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const values = new FormData(form);
    if (
      mode === "reset" &&
      values.get("password") !== values.get("confirmation")
    ) {
      setMessage("两次密码不一致，请重新确认。");
      return;
    }
    setBusy(true);
    setMessage("");
    try {
      const r = await fetch(
        `/api/auth/${mode === "reset" ? "reset-password" : "verify-email"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Lvzhen-Records": "1",
          },
          body: JSON.stringify(
            mode === "reset"
              ? { token, newPassword: values.get("password") }
              : { token },
          ),
          signal: AbortSignal.timeout(15000),
        },
      );
      if (!r.ok) {
        setMessage(
          r.status === 429
            ? "操作较频繁，请稍后再试。"
            : "链接无效、已过期或已使用，请重新申请。",
        );
        return;
      }
      form.reset();
      setToken("");
      setDone(true);
      announceAccountChange();
    } catch {
      setMessage(
        mode === "reset"
          ? "暂未确认结果。可以先用新密码尝试登录；若仍无法登录，再重新申请重置链接。"
          : "暂未确认结果，请重新打开原链接确认，或回账号页查看状态。",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className={styles.main}>
      <a className={styles.brand} href="/account">
        律真 · 我的账号
      </a>
      <section className={styles.card}>
        <h1>{mode === "reset" ? "重新设置密码" : "确认邮箱"}</h1>
        <p className={styles.note}>
          {local
            ? "本机演练：链接来自本机邮件预览，未实际发送邮件。"
            : "请确认这是你本人申请的操作，链接 30 分钟内有效。"}
        </p>
        {message && (
          <p role="alert" className={styles.error}>
            {message}
          </p>
        )}
        {done ? (
          <>
            <p role="status">
              {mode === "reset"
                ? "密码已更新，原有登录已失效。请使用新密码重新登录。"
                : local
                  ? "本机确认流程已完成；这不代表真实邮箱归属已核验。"
                  : "邮箱已确认，请返回登录，继续学习。"}
            </p>
            <a href="/account">回到账号</a>
          </>
        ) : ready && !token ? (
          <>
            <p role="status">
              {local
                ? "链接缺失，请从邮件预览重新打开，或重新申请。"
                : "链接缺失，请从邮件重新打开，或重新申请。"}
            </p>
            <a href={mode === "reset" ? "/account/recover" : "/account"}>
              重新申请
            </a>
          </>
        ) : (
          <form onSubmit={submit}>
            {mode === "reset" && (
              <>
                <label>
                  新密码
                  <input
                    type="password"
                    name="password"
                    required
                    minLength={12}
                    maxLength={128}
                    autoComplete="new-password"
                  />
                </label>
                <label>
                  再次输入新密码
                  <input
                    type="password"
                    name="confirmation"
                    required
                    minLength={12}
                    maxLength={128}
                    autoComplete="new-password"
                  />
                </label>
              </>
            )}
            <button disabled={!token || busy}>
              {busy
                ? "正在处理……"
                : mode === "reset"
                  ? "确认新密码"
                  : "确认此邮箱"}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
