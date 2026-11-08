import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { capstoneScoringQuestion } from "@/evaluation/capstone-scoring-card";
import { currentCapstoneQuestion } from "@/evaluation/capstone-scoring-card-v2";
import { CapstonePractice } from "./capstone-practice";

export const metadata: Metadata = { title: "整案评阅 · 律真" };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ version?: string | string[] }>;
}) {
  const host = (await headers()).get("host");
  if (
    (process.env.LVZHEN_ENV ?? "local") !== "local" ||
    !["localhost:3107", "127.0.0.1:3107"].includes(host ?? "")
  )
    notFound();
  const previous = (await searchParams).version === "previous";
  return (
    <CapstonePractice
      key={previous ? "previous" : "current"}
      question={previous ? capstoneScoringQuestion : currentCapstoneQuestion}
      previous={previous}
    />
  );
}
