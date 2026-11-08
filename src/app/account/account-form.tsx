"use client";
import { useEffect, useState, type FormEvent } from "react";
import {
  announceAccountChange,
  currentLearner,
  type Learner,
} from "@/accounts/client";
import styles from "./page.module.css";

export default function AccountForm({
  local,
  returnTo = "/lab/study",
}: {
  local: boolean;
  returnTo?: string;
}) {
  const importing = returnTo.startsWith("/records/import");
  const [user, setUser] = useState<Learner>(null);
  const [ready, setReady] = useState(false);
  const [signup, setSignup] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [mailMessage, setMailMessage] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");
  useEffect(() => {
    let live = true;
    currentLearner()
      .then((value) => {
        if (live) {
          setUser(value);
          setReady(true);
        }
      })
      .catch(() => {
        if (live) setError("账号服务暂不可用，请稍后重新打开。");
      });
    return () => {
      live = false;
    };
  }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(true);
    setError("");
    setMailMessage("");
    if (!local) setPendingEmail(String(data.get("email")).trim());
    try {
      const response = await fetch(
        `/api/auth/${signup ? "sign-up/email" : "sign-in/email"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Lvzhen-Records": "1",
          },
          body: JSON.stringify({
            email: String(data.get("email")).trim(),
            password: data.get("password"),
            ...(signup ? { name: String(data.get("name")).trim() } : {}),
          }),
          signal: AbortSignal.timeout(15000),
        },
      );
      if (!response.ok) {
        const details = await response.json().catch(() => null);
        setError(
          response.status === 429
            ? "操作较频繁，请稍后再试。"
            : details?.code === "EMAIL_NOT_VERIFIED"
              ? "邮箱尚未确认，请打开确认邮件。没有收到可以重发。"
              : details?.error === "mail_delivery_failed"
                ? "确认邮件暂未发送成功。可以重发确认邮件，不必重复注册。"
                : signup
                  ? "注册未完成，请检查填写内容；已有账号可以直接登录。"
                  : "登录未完成，请核对邮箱和密码。",
        );
        return;
      }
      form.reset();
      if (signup && !local) {
        setMailMessage(
          "注册申请已处理。若需要确认邮箱，请查看确认邮件，链接 30 分钟内有效；已有账号可直接登录。",
        );
        setSignup(false);
        return;
      }
      announceAccountChange();
      window.location.assign(returnTo);
    } catch {
      setError("连接暂时中断，请重新登录确认；已有学习记录不受影响。");
    } finally {
      setBusy(false);
    }
  }
  async function signOut() {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/auth/sign-out", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Lvzhen-Records": "1",
        },
        body: "{}",
        signal: AbortSignal.timeout(6000),
      });
      if (!response.ok) throw new Error();
      announceAccountChange();
      window.location.reload();
    } catch {
      setError("退出未完成，请重试。");
      setBusy(false);
    }
  }
  async function requestVerification() {
    const email = user?.email ?? pendingEmail;
    if (!email) return;
    setBusy(true);
    setMailMessage("");
    try {
      const response = await fetch("/api/auth/send-verification-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Lvzhen-Records": "1",
        },
        body: JSON.stringify({ email }),
        signal: AbortSignal.timeout(15000),
      });
      setMailMessage(
        response.ok
          ? local
            ? "确认链接已写入项目 .local-records/mail-preview 文件夹。打开最新的 verify 邮件文件继续，30 分钟内有效。"
            : "若该邮箱需要确认，邮件已提交发送，请查看收件箱和垃圾邮件。链接 30 分钟内有效。"
          : "暂时无法发送确认邮件，请稍后重试。",
      );
    } catch {
      setMailMessage("连接暂时中断，请稍后重试。");
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className={styles.main}>
      <a className={styles.brand} href={returnTo}>
        ← {importing ? "返回记录迁入" : "返回学习"}
      </a>
      <section className={styles.card}>
        <p className={styles.eyebrow}>我的学习空间</p>
        <h1>{user ? `你好，${user.name}` : signup ? "建立账号" : "登录"}</h1>
        <p className={styles.note}>
          {local
            ? "本机账号，邮箱确认与找回密码使用本机邮件预览。"
            : "注册后请先确认邮箱。登录后，可在其他设备继续已保存的学习记录。"}
        </p>
        {mailMessage && (
          <p role="status" className={styles.note}>
            {mailMessage}
          </p>
        )}
        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}
        {!ready && !error && <p role="status">正在确认登录状态……</p>}
        {ready &&
          (user ? (
            <>
              <p>作答与学习位置会保存到你的账号。退出后，重新登录可继续。</p>
              <p>
                {user.emailVerified
                  ? local
                    ? "邮箱确认：本机演练已完成"
                    : "邮箱已确认"
                  : "邮箱确认：尚未完成"}
              </p>
              {!user.emailVerified && (
                <button
                  disabled={busy || !user.email}
                  onClick={requestVerification}
                >
                  生成邮箱确认链接
                </button>
              )}
              <p>
                <a href="/account/recover">找回密码</a>
              </p>
              <a href={returnTo}>{importing ? "继续迁入记录" : "继续学习"}</a>
              <button
                className={styles.secondary}
                disabled={busy}
                onClick={signOut}
              >
                退出登录
              </button>
            </>
          ) : (
            <>
              <form onSubmit={submit}>
                {signup && (
                  <label>
                    怎么称呼你
                    <input
                      name="name"
                      required
                      maxLength={40}
                      autoComplete="nickname"
                    />
                  </label>
                )}
                <label>
                  邮箱
                  <input
                    name="email"
                    type="email"
                    required
                    maxLength={254}
                    autoComplete="email"
                  />
                </label>
                <label>
                  密码
                  <input
                    name="password"
                    type="password"
                    required
                    minLength={12}
                    maxLength={128}
                    autoComplete={signup ? "new-password" : "current-password"}
                  />
                </label>
                <small>至少 12 个字符。</small>
                <button disabled={busy}>
                  {busy
                    ? "正在处理……"
                    : signup
                      ? local
                        ? "注册并开始学习"
                        : "注册并确认邮箱"
                      : "登录"}
                </button>
              </form>
              {!local && pendingEmail && (
                <p>
                  <button disabled={busy} onClick={requestVerification}>
                    重发确认邮件
                  </button>
                </p>
              )}
              <button
                className={styles.secondary}
                disabled={busy}
                onClick={() => {
                  setSignup(!signup);
                  setError("");
                }}
              >
                {signup ? "已有账号，去登录" : "第一次来，建立账号"}
              </button>
              <p>
                <a href="/account/recover">忘记密码？</a>
              </p>
              <a href={returnTo}>
                {importing ? "暂不登录，返回迁入页" : "暂不登录，继续本地试学"}
              </a>
              <p className={styles.note}>
                原试学记录保留在本浏览器，登录后可在学习记录中确认迁入。
              </p>
            </>
          ))}
      </section>
    </main>
  );
}
