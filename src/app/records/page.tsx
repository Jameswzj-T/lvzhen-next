import type { Metadata } from "next";
import { RecordsEntry } from "./records-view";
import { connection } from "next/server";
import { runtimeConfig } from "@/runtime/config";
import { corePracticeSubjects } from "@/content/core-practice-sections";
export const metadata: Metadata = { title: "我的学习 · 律真" };
export default async function RecordsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await connection();
  const query = await searchParams;
  const subject = corePracticeSubjects.find((id) => id === query.subject);
  return (
    <RecordsEntry
      publicSite={runtimeConfig().mode === "public"}
      initialSubject={subject}
      initialTopic={typeof query.topic === "string" ? query.topic : undefined}
      initialAttempt={
        typeof query.answer === "string" ? query.answer : undefined
      }
      initialView={
        query.view === "knowledge" || query.view === "inquiries"
          ? query.view
          : undefined
      }
    />
  );
}
