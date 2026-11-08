import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { buildQueue } from "@/evaluation/adjudication/queue";
import { QueueView } from "./queue-view";
export const metadata: Metadata = {
  title: "待裁决队列 · 律真",
  description: "裁决模型判断，沉淀评分语料。",
};
export default async function Page() {
  const host = (await headers()).get("host");
  if (
    (process.env.LVZHEN_ENV ?? "local") !== "local" ||
    !["localhost:3107", "127.0.0.1:3107"].includes(host ?? "")
  )
    notFound();
  const queue = await buildQueue(process.cwd()).catch(() => []);
  return <QueueView initial={queue} />;
}
