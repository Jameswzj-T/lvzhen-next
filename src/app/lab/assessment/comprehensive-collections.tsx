import {
  comprehensiveG7Definitions,
  type ComprehensiveG7Group,
} from "@/content/comprehensive-g7";
import { corePracticeSubjects } from "@/content/core-practice-sections";
import {
  practiceSubjectInfo,
  type PracticeSubject,
} from "@/content/practice-set";
import type { FaultProgress } from "@/domain/fault-progress";
import s from "./assessment.module.css";

export type ComprehensiveFocus = PracticeSubject | "all";
const groups: {
  id: ComprehensiveG7Group;
  title: string;
  description: string;
}[] = [
  {
    id: "choice-types",
    title: "多选与不定项",
    description: "每组4题，2道多选、2道不定项。逐项判断，交卷后看选项解析。",
  },
  {
    id: "drafting",
    title: "完整法律文书",
    description:
      "按材料写一份完整文书，可保存续写。交卷后看参考和具体修改建议。",
  },
  {
    id: "essay",
    title: "材料长论述",
    description: "写成一篇有观点、有分析的文章，不计时，可分几次完成。",
  },
  {
    id: "stage",
    title: "阶段训练",
    description: "8道选择题，不计时。把几个知识点连起来练。",
  },
  {
    id: "written",
    title: "书面训练",
    description: "6道独立案例，45分钟。完整写出判断和理由。",
  },
  {
    id: "case",
    title: "完整案例",
    description: "一份共享案情，逐问分析，不计时。",
  },
  {
    id: "exam",
    title: "缩短模考",
    description: "40道客观题，60分钟。范围覆盖十个科目入口。",
  },
];
export function ComprehensiveCollections({
  state,
  disabled,
  focus,
  onFocus,
  onOpen,
  onResume,
}: {
  state: FaultProgress;
  disabled: boolean;
  focus: ComprehensiveFocus;
  onFocus: (focus: ComprehensiveFocus) => void;
  onOpen: (id: string) => void;
  onResume: (id: string) => void;
}) {
  const open = state.assessments?.runs.find((r) => !r.finishedAt);
  return (
    <section aria-label="全科综合训练目录" data-g7-collections>
      <label className={s.comprehensiveFilter}>
        练习范围{" "}
        <select
          value={focus}
          disabled={disabled}
          onChange={(e) => onFocus(e.target.value as ComprehensiveFocus)}
        >
          <option value="all">所有科目</option>
          {corePracticeSubjects.map((subject) => (
            <option key={subject} value={subject}>
              {practiceSubjectInfo(subject).label}
            </option>
          ))}
        </select>
      </label>
      {groups.map((group) => {
        const papers = comprehensiveG7Definitions.filter(
          (p) =>
            p.group === group.id &&
            (focus === "all" || p.subjects.includes(focus)),
        );
        return (
          papers.length > 0 && (
            <section
              key={group.id}
              className={s.collection}
              aria-label={group.title}
            >
              <div className={s.sectionHeading}>
                <h2>{group.title}</h2>
                <span>{papers.length}组</span>
              </div>
              <p className={s.muted}>{group.description}</p>
              <div className={s.paperList}>
                {papers.map((p) => {
                  const history =
                      state.assessments?.runs.filter(
                        (r) => r.paperId === p.id,
                      ) ?? [],
                    pending = history.find((r) => !r.finishedAt),
                    last = history.at(-1);
                  return (
                    <article key={p.id} data-g7-paper={p.id}>
                      <div>
                        <h3>{p.title}</h3>
                        <p>
                          {p.questionIds.length}
                          {p.group === "case" ? "问" : "题"} ·{" "}
                          {p.minutes === null ? "不计时" : `${p.minutes}分钟`}
                          {last ? ` · ${pending ? "作答中" : "已交卷"}` : ""}
                        </p>
                      </div>
                      <div className={s.paperActions}>
                        {last?.finishedAt && (
                          <button
                            disabled={disabled}
                            onClick={() => onResume(last.id)}
                          >
                            看上次
                          </button>
                        )}
                        <button
                          className={
                            p.mode === "subjective" ? s.primary : undefined
                          }
                          disabled={disabled || (!!open && !pending)}
                          onClick={() =>
                            pending ? onResume(pending.id) : onOpen(p.id)
                          }
                        >
                          {pending ? "继续" : "开始"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )
        );
      })}
      <p className={s.muted}>
        重复练习和看过参考都会留有标记。这些是阶段训练，不是正式法考等效试卷。
      </p>
    </section>
  );
}
