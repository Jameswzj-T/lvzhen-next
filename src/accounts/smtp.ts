import nodemailer from "nodemailer";
import type { RuntimeConfig } from "../runtime/config";
import { writeLocalMail, type AccountMailDelivery } from "./mail";

export function smtpOptions(smtp: NonNullable<RuntimeConfig["smtp"]>) {
  return {
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    requireTLS: !smtp.secure,
    tls: { rejectUnauthorized: true, minVersion: "TLSv1.2" as const },
    auth: { user: smtp.user, pass: smtp.password },
    connectionTimeout: 5000,
    greetingTimeout: 5000,
    socketTimeout: 10000,
    dnsTimeout: 5000,
    disableFileAccess: true,
    disableUrlAccess: true,
    logger: false,
    debug: false,
  };
}
type Sender = {
  sendMail: (message: {
    from: string;
    to: string;
    subject: string;
    text: string;
  }) => Promise<{ accepted: unknown[]; rejected: unknown[] }>;
};
export function accountMailDelivery(
  config: RuntimeConfig,
  sender?: Sender,
): AccountMailDelivery {
  if (config.mode === "local") return writeLocalMail;
  if (!config.smtp) throw new Error("mail_delivery_not_configured");
  const smtp = config.smtp;
  // Creating the transport does not connect; only an explicit account action sends mail.
  const transport = sender ?? nodemailer.createTransport(smtpOptions(smtp));
  return async (mail) => {
    try {
      const result = await transport.sendMail({
        from: smtp.from,
        to: mail.to,
        subject: mail.kind === "verify" ? "律真 · 确认邮箱" : "律真 · 重设密码",
        text: `${mail.kind === "verify" ? "请确认你的邮箱" : "请设置新密码"}：\n${mail.url}\n\n链接 ${mail.expiresInSeconds / 60} 分钟内有效。请勿转发。如果不是你本人申请，请忽略此邮件。`,
      });
      if (!result.accepted.includes(mail.to) || result.rejected.length)
        throw new Error();
    } catch {
      throw new Error("mail_delivery_failed");
    }
  };
}
