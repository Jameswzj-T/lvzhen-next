import type { ReactNode } from "react";
import { SupportFrame } from "@/app/lab/_components/support-frame";
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SupportFrame
      section="practice"
      purpose="重答反馈实验 · 固定样例与候选回执，不是当前答卷的新评阅或学习成绩。"
    >
      {children}
    </SupportFrame>
  );
}
