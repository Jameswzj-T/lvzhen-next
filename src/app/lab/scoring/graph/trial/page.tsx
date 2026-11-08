import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { loadLocalCandidate } from "@/evaluation/graph/local-candidate";
import { TrialEditor } from "./trial-editor";
import Link from "next/link";
import s from "./trial.module.css";
export default async function Page() {
  const host = (await headers()).get("host");
  if (
    (process.env.LVZHEN_ENV ?? "local") !== "local" ||
    !["localhost:3107", "127.0.0.1:3107"].includes(host ?? "")
  )
    notFound();
  const candidate = await loadLocalCandidate(process.cwd()).catch(() => null);
  if (!candidate)
    return (
      <main className={s.page}>
        <h1>这份历史评阅暂不可用</h1>
        <p role="status">
          旧候选的版本校验未通过，原记录保留。当前不会发起评阅。
        </p>
        <p>
          <Link href="/lab/practice?view=library">返回练习</Link> ·{" "}
          <Link href="/lab/scoring/table">查看分问反馈样例</Link>
        </p>
      </main>
    );
  return (
    <>
      <p
        style={{
          maxWidth: 1184,
          margin: "20px auto 0",
          padding: "0 28px",
          fontSize: 15,
        }}
      >
        <Link href="/lab/scoring/table">查看新的分问评阅结果 →</Link>
      </p>
      <TrialEditor cases={candidate.cases.map((c) => c.item)} />
    </>
  );
}
