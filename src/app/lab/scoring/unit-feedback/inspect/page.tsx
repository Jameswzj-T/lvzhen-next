import { headers } from "next/headers";
import { notFound } from "next/navigation";
import {
  readUnitFeedbackInspection,
  allowUnitFeedbackInspection,
} from "@/evaluation/unit-feedback-inspection";
import { DirectAnswerFeedback } from "../../../_components/direct-answer-feedback";
import s from "../../../_components/direct-answer-feedback.module.css";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const h = await headers();
  if (
    !allowUnitFeedbackInspection(
      h.get("host"),
      h.get("sec-fetch-site"),
      process.env.LVZHEN_ENV,
    )
  )
    notFound();
  const id = (await searchParams).task;
  if (typeof id !== "string" || !/^[a-f0-9]{64}$/.test(id)) notFound();
  let record;
  try {
    record = await readUnitFeedbackInspection(process.cwd(), id);
  } catch {
    notFound();
  }
  return (
    <main className={s.inspection}>
      <h1>开发检查：单份已保存评阅</h1>
      <p>
        只读本机档案。结构与封装摘要已核对，不代表法律或模型语义通过审校；本页不会重新评阅、修改原答或收费。
      </p>
      <p>
        任务：{record.taskId} · 保存于 {record.completedAt}
      </p>
      {record.result ? (
        <>
          <h2>题目与原答</h2>
          <p className={s.reference}>{record.result.view.facts}</p>
          <p>{record.result.view.prompt}</p>
          <p className={s.reference}>{record.result.view.originalText}</p>
          <DirectAnswerFeedback
            result={record.result}
            answer={record.result.view.originalText}
            status="ready"
          />
        </>
      ) : (
        <p>未取得可采用评阅：{record.failure}。原失败记录保留，不计零分。</p>
      )}
      <details>
        <summary>完整保存结构与原始回执</summary>
        <pre className={s.archive}>{JSON.stringify(record, null, 2)}</pre>
      </details>
    </main>
  );
}
