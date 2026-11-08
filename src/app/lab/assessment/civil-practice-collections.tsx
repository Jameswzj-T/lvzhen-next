import {
  civilIntegratedPracticePapers,
  civilIntegratedScopes,
} from "@/content/civil-integrated-practice";
import type { FaultProgress } from "@/domain/fault-progress";
import s from "./assessment.module.css";

/** Broad scopes only. Individual question titles and knowledge tags stay hidden until submission. */
export function CivilPracticeCollections({
  state,
  disabled,
  onOpen,
  onResume,
}: {
  state: FaultProgress;
  disabled: boolean;
  onOpen: (paperId: string) => void;
  onResume: (runId: string) => void;
}) {
  const open = state.assessments?.runs.find((r) => !r.finishedAt);
  return (
    <section aria-label="民法综合练习范围" className={s.civilScopes}>
      {civilIntegratedScopes.map((scope) => (
        <article key={scope.id} className={s.civilScope}>
          <div>
            <h2>{scope.title}</h2>
            <p>{scope.description}</p>
          </div>
          <div className={s.civilScopeModes}>
            {civilIntegratedPracticePapers
              .filter((p) => p.scopeId === scope.id)
              .map((paper) => {
                const history =
                  state.assessments?.runs.filter(
                    (r) => r.paperId === paper.id,
                  ) ?? [];
                const pending = history.find((r) => !r.finishedAt);
                const last = history.at(-1);
                return (
                  <div key={paper.id} className={s.civilScopeMode}>
                    <span>
                      {paper.mode === "objective" ? "选择练习" : "书面分析"} ·{" "}
                      {paper.questionIds.length}题
                    </span>
                    <div>
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
                          paper.mode === "subjective" ? s.primary : undefined
                        }
                        disabled={disabled || (!!open && !pending)}
                        onClick={() =>
                          pending ? onResume(pending.id) : onOpen(paper.id)
                        }
                      >
                        {pending ? "继续" : "开始"}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </article>
      ))}
    </section>
  );
}
