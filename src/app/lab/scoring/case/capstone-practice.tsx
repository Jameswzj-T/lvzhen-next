"use client";
import { LearningFrame } from "../../_components/learning-frame";
import type { ScoringTrialQuestion } from "@/evaluation/scoring-trial-contract";
import { ScoringQuestion } from "../scoring-practice";
import s from "../scoring.module.css";

export function CapstonePractice({
  question,
  previous = false,
}: {
  question: ScoringTrialQuestion;
  previous?: boolean;
}) {
  return (
    <LearningFrame section="practice" user={null} status="本机试用">
      <main id="learning-main" className={s.workspace}>
        <div className={s.heading}>
          <div>
            <a href="/lab/practice?view=library">练习目录 / 刑法综合</a>
            <h1>{question.title}</h1>
            <p>
              {previous
                ? "此前的作答与成绩按原有规则保留，可查看和复制。"
                : "一份案情，完整作答，再按五问查看反馈。"}
            </p>
          </div>
          <span className={s.badge}>
            {previous ? "历史记录" : "历史整案评阅实验"}
          </span>
        </div>
        <nav className={s.caseJumps} aria-label="案情与作答">
          <a href="#case-reading">看案情与设问</a>
          <a href="#case-answer">{previous ? "看原答 ↓" : "写答案 ↓"}</a>
          {!previous && <a href="/lab/scoring/graph/answers">试试按问作答 →</a>}
        </nav>
        <p className={s.exampleLink}>
          <a
            href={
              previous
                ? "/lab/scoring/case"
                : "/lab/scoring/case?version=previous"
            }
          >
            {previous ? "返回当前练习 →" : "此前的作答与成绩"}
          </a>
          {" · "}
          <a
            href={
              previous
                ? "/lab/scoring/case/examples"
                : "/lab/scoring/case/examples?version=current&sample=U2"
            }
          >
            {previous
              ? "三份旧版示例：两份完整，一份有明显错误"
              : "看已测答卷：每一分从哪里来"}
          </a>
        </p>
        <ScoringQuestion
          question={question}
          readOnly={previous}
          nextLabel="返回练习目录 →"
          next={() => window.location.assign("/lab/practice?view=library")}
        />
      </main>
    </LearningFrame>
  );
}
