import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { answerWorkspaceCase } from "@/evaluation/graph/answer-workspace";
import { AnswerEditor } from "./answer-editor";
export default async function Page() {
  const host = (await headers()).get("host");
  if (
    (process.env.LVZHEN_ENV ?? "local") !== "local" ||
    !["localhost:3107", "127.0.0.1:3107"].includes(host ?? "")
  )
    notFound();
  return <AnswerEditor item={answerWorkspaceCase()} />;
}
