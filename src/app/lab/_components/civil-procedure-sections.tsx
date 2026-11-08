import {
  corePracticeSections,
  type CorePracticeSubject,
} from "@/content/core-practice-sections";
import { practiceSubjectInfo } from "@/content/practice-set";
import s from "./civil-procedure-sections.module.css";

export function CivilProcedureSections({
  onSelect,
  answered = {},
  subject = "civil-procedure",
}: {
  onSelect: (id: string) => void;
  answered?: Record<string, number>;
  subject?: CorePracticeSubject;
}) {
  const sections = corePracticeSections(subject);
  return (
    <nav
      className={s.sections}
      aria-label={`${practiceSubjectInfo(subject).label}章节板块`}
    >
      {sections.map((section, index) => (
        <button key={section.id} onClick={() => onSelect(section.id)}>
          <span className={s.number}>{String(index + 1).padStart(2, "0")}</span>
          <span>
            <strong>{section.title}</strong>
            <small>
              {section.topicIds.length} 个知识点 · {section.questionIds.length}{" "}
              题{!!answered[section.id] && ` · 已答 ${answered[section.id]} 题`}
            </small>
          </span>
          <span aria-hidden="true">→</span>
        </button>
      ))}
    </nav>
  );
}
