import type { Metadata } from "next";
import { exerciseFor, topicFor } from "@/content/fault-catalog";
import { AskEntry } from "./ask-view";
export const metadata: Metadata = {
  title: "答疑 · 律真",
  description: "围绕具体问题，找到更清楚的解释。",
};
export default async function AskPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const exerciseId =
    typeof query.question === "string" && exerciseFor(query.question)
      ? query.question
      : undefined;
  const topicId =
    typeof query.topic === "string" && topicFor(query.topic)
      ? query.topic
      : undefined;
  const originRunId =
    typeof query.fromRun === "string" &&
    query.fromRun.length > 0 &&
    query.fromRun.length <= 100
      ? query.fromRun
      : undefined;
  return (
    <AskEntry
      exerciseId={exerciseId}
      topicId={topicId}
      originRunId={originRunId}
    />
  );
}
