import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { loadTableCandidate } from "@/evaluation/table-trial/candidate";
import { TableEditor } from "./table-editor";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const host = (await headers()).get("host");
  if (
    (process.env.LVZHEN_ENV ?? "local") !== "local" ||
    !["localhost:3107", "127.0.0.1:3107"].includes(host ?? "")
  )
    notFound();
  const candidate = await loadTableCandidate(process.cwd()),
    params = await searchParams;
  return (
    <TableEditor
      cases={candidate.cases.map((c) => c.item)}
      archivedIds={candidate.archivedIds}
      initialCase={
        candidate.cases.find((c) => c.item.id === params.case)?.item.id ??
        candidate.cases[0].item.id
      }
      initialQuestion={
        typeof params.question === "string" && /^[1-5]$/.test(params.question)
          ? params.question
          : "1"
      }
      initialRecord={
        typeof params.record === "string" &&
        /^[a-f0-9]{64}$/.test(params.record)
          ? params.record
          : null
      }
    />
  );
}
