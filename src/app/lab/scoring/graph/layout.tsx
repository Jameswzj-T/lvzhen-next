import type { ReactNode } from "react";
import { SupportFrame } from "@/app/lab/_components/support-frame";
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SupportFrame
      section="practice"
      purpose="历史图式评阅实验 · 用于查看旧样例与运行记录。日常做题请返回练习目录。"
    >
      {children}
    </SupportFrame>
  );
}
