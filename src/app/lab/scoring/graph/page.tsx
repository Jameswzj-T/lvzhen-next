import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { graphPacks } from "@/evaluation/graph/case-packs";
import { demoAnswers } from "@/evaluation/graph/demo-fixtures";
import { GraphDemo } from "./graph-demo";
export default async function Page() {
  const host = (await headers()).get("host");
  if (
    (process.env.LVZHEN_ENV ?? "local") !== "local" ||
    !["localhost:3107", "127.0.0.1:3107"].includes(host ?? "")
  )
    notFound();
  const presets = (["short", "long"] as const).map((id) => ({
    id,
    title: graphPacks[id].title,
    facts: graphPacks[id].input.facts,
    question: graphPacks[id].input.question,
    answer: demoAnswers[id],
  }));
  return <GraphDemo presets={presets} />;
}
