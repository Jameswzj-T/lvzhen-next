import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "律真 · 每天学明白一点",
  description:
    "面向 2027 年法考的学习体验样例：建立体系、理解案例、记录真实学习。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const filingNumber = process.env.NEXT_PUBLIC_LVZHEN_ICP_NUMBER?.trim();
  return (
    <html lang="zh-CN" data-scroll-behavior="smooth">
      <body>
        {children}
        {filingNumber && (
          <footer className="site-filing">
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">
              {filingNumber}
            </a>
          </footer>
        )}
      </body>
    </html>
  );
}
