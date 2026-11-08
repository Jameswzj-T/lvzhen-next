import { AsyncLocalStorage } from "node:async_hooks";
import { mkdir, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";
export type AccountMail = {
  kind: "verify" | "reset";
  to: string;
  url: string;
  expiresInSeconds: number;
};
export type AccountMailDelivery = (mail: AccountMail) => Promise<void>;
export const mailDeliveryContext = new AsyncLocalStorage<{ failed: boolean }>();
export function observedDelivery(
  deliver: AccountMailDelivery,
): AccountMailDelivery {
  return async (mail) => {
    try {
      await deliver(mail);
    } catch (error) {
      const scope = mailDeliveryContext.getStore();
      if (scope) scope.failed = true;
      throw error;
    }
  };
}
const escapeHtml = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
export function mailPreviewHtml(mail: AccountMail) {
  const title = mail.kind === "verify" ? "确认邮箱" : "重设密码";
  return `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="referrer" content="no-referrer"><title>律真 · ${title}（本机预览）</title><body style="max-width:560px;margin:64px auto;padding:24px;font:16px/1.8 sans-serif"><h1>律真 · ${title}</h1><p>仅为本机邮件预览，未实际发送，也不能证明真实邮箱归属。</p><p>收件地址：${escapeHtml(mail.to)}</p><p><a rel="noreferrer" href="${escapeHtml(mail.url)}">${title}</a></p><p>链接在 ${mail.expiresInSeconds / 60} 分钟内有效。请勿转发此文件或链接。</p></body></html>`;
}
export const writeLocalMail: AccountMailDelivery = async (mail) => {
  if (
    process.env.NODE_ENV !== "development" &&
    process.env.LVZHEN_LOCAL_RECORDS !== "1"
  )
    throw new Error("mail_delivery_not_configured");
  const directory = path.resolve(".local-records/mail-preview");
  await mkdir(directory, { recursive: true, mode: 0o700 });
  await writeFile(
    path.join(directory, `${Date.now()}-${mail.kind}-${randomUUID()}.html`),
    mailPreviewHtml(mail),
    { mode: 0o600, flag: "wx" },
  );
};
