import type { ReactNode } from "react";
import { SupportFrame } from "@/app/lab/_components/support-frame";
export default function Layout({ children }: { children: ReactNode }) {
  return <SupportFrame section="practice">{children}</SupportFrame>;
}
