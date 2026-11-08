import type { ReactNode } from "react";
import s from "./learning-frame.module.css";
import { LearningFrame, type LearningSection } from "./learning-frame";
export function SupportFrame({
  children,
  section,
  purpose,
}: {
  children: ReactNode;
  section?: LearningSection;
  purpose?: string;
}) {
  return (
    <LearningFrame section={section}>
      <div id="learning-main" tabIndex={-1}>
        {purpose && <p className={s.supportPurpose}>{purpose}</p>}
        {children}
      </div>
    </LearningFrame>
  );
}
