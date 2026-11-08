import type { Metadata } from "next";
import { LessonEntry } from "./lesson-entry";

export const metadata: Metadata = {
  title: "刑法主观方面 · 律真学习体验",
  description: "跟着一节课，理解、练习，再用自己的话说清楚。",
};

export default async function LessonPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  return <LessonEntry initialOverview={(await searchParams).view === "map"} />;
}
