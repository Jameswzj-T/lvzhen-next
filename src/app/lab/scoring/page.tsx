import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { scoringTrialQuestions } from "@/evaluation/scoring-trial-catalog";
import { ScoringPractice } from "./scoring-practice";
export const metadata: Metadata = { title: "主观题评阅 · 律真" };
export default async function Page() {
  const host = (await headers()).get("host");
  if (
    (process.env.LVZHEN_ENV ?? "local") !== "local" ||
    !["localhost:3107", "127.0.0.1:3107"].includes(host ?? "")
  )
    notFound();
  return <ScoringPractice questions={scoringTrialQuestions} />;
}
