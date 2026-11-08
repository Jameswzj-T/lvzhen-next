import type { Metadata } from "next";
import { connection } from "next/server";
import { runtimeConfig } from "@/runtime/config";
import { SupportFrame } from "../lab/_components/support-frame";
import { TrialIssueForm } from "./trial-issue-form";
import s from "../account/page.module.css";
import { corePracticeSubjects } from "@/content/core-practice-sections";
import { practiceSubjectInfo } from "@/content/practice-set";
import { comprehensiveG7Papers } from "@/content/comprehensive-g7";
export const metadata: Metadata = { title: "学习试用 · 律真" };
export default async function TrialPage() {
  await connection();
  const local = runtimeConfig().mode === "local";
  const publicSite = runtimeConfig().mode === "public";
  return (
    <SupportFrame>
      <main className={s.main}>
        <a className={s.brand} href="/lab/study">
          ← 返回学习
        </a>
        <section className={s.card}>
          <p className={s.eyebrow}>学习试用</p>
          <h1>先把一段学习走顺</h1>
          <p>
            先选一个知识点，做一道选择题，再完整写一道小案例。读完讲解，看看能否明白自己答对了什么、还要补什么。
          </p>
          <p>
            当前有{corePracticeSubjects.length}个科目入口，也有
            {comprehensiveG7Papers.length}
            组阶段训练、书面训练和缩短模考，可按自己的进度选择。
          </p>
          <ul>
            {corePracticeSubjects.map((subject) => (
              <li key={subject}>
                <a href={`${practiceSubjectInfo(subject).libraryHref}`}>
                  {practiceSubjectInfo(subject).label}
                </a>
              </li>
            ))}
          </ul>
          <p>
            {publicSite
              ? "学习位置、原答和草稿保存在当前浏览器。换设备时，可从记录页导出和导入备份。"
              : "学习位置、原答和草稿会保留。手机或另一台电脑要接续账号记录时，先确认当前设备显示“已同步”。"}
          </p>
          <p>
            <a href="/lab/practice?view=library">从练习开始 →</a>
          </p>
          <p>
            <a href="/lab/assessment?subject=all-subjects">
              打开综合训练与缩短模考 →
            </a>
          </p>
          <p>
            <a href="/records">查看记录、导出备份 →</a>
          </p>
        </section>
        <section className={s.card}>
          <h2>这次需要留意</h2>
          <p>
            {publicSite
              ? "当前免费版使用你自己的 DeepSeek Key。先到模型设置保存 Key，主动评阅或提问时才调用；固定解析和本地记录无需 Key。"
              : local
                ? "目前仍是本机开发版，外部试用地址和真实邮件尚未启用。"
                : "当前为小范围试用版，外部AI讲解尚未接通；主观原答可保存，也可对照本题参考。"}
            真实手机与电脑接续、界面体验和专业内容审校还需要实测。
          </p>
          <p>
            读讲解时，可以对照本题参考。觉得哪里没说清楚，就从本题继续追问或记下问题。AI暂时不可用时，也能先看参考，原答会保留。
          </p>
          <p>
            当前内容用于配合教材练习。年度细目、法律文书和长论述仍有缺口，阶段训练也不等同于正式法考整卷。
          </p>
        </section>
        <section className={s.card}>
          <h2>把使用问题记下来</h2>
          <p>
            写清在哪一步遇到问题、你希望怎样处理。导出后交给试用负责人，方便回看和跟进。
          </p>
          <TrialIssueForm />
        </section>
      </main>
    </SupportFrame>
  );
}
