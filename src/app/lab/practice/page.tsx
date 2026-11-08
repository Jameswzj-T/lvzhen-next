import { isComprehensiveG7Question } from "@/content/comprehensive-g7";
import { remainingG6SubjectInfo } from "@/content/remaining-g6-subjects";
import { resolveExplicitRemainingEntry } from "./explicit-remaining-entry";
import { resolveExplicitCommercialEntry } from "./explicit-commercial-entry";
import { resolveExplicitAdministrativeEntry } from "./explicit-administrative-entry";
import { resolveExplicitCriminalProcedureEntry } from "./explicit-criminal-procedure-entry";
import type { Metadata } from "next";
import { PracticeEntry } from "./practice-view";
import { resolveExplicitCivilEntry } from "./explicit-civil-entry";
import { resolveLearningExampleEntry } from "./example-reference-entry";
import { resolveExplicitCivilProcedureEntry } from "./explicit-civil-procedure-entry";
import { loadReviewedReceipt } from "@/evaluation/rewrite-comparison/reviewed-receipts-preview";
import { headers } from "next/headers";
import { shortSummaries } from "@/evaluation/short-table/catalog";
import { bankScoringSummaries } from "@/evaluation/bank-scoring-cards";
import { exerciseFor } from "@/content/fault-catalog";
import { isPracticeLocation } from "@/content/practice-set";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const params = await searchParams;
  const remaining = resolveExplicitRemainingEntry(params);
  return remaining
    ? {
        title: `${remainingG6SubjectInfo[remaining.subject].label}练习 · 律真`,
        description: remainingG6SubjectInfo[remaining.subject].description,
      }
    : resolveExplicitCommercialEntry(params)
      ? {
          title: "商法与经济法练习 · 律真",
          description:
            "按章节练习公司、合伙、破产、票据、保险证券及经济法，独立作答并保存反馈。",
        }
      : resolveExplicitAdministrativeEntry(params)
        ? {
            title: "行政法练习 · 律真",
            description:
              "首单元：行政处罚与行政强制措施。独立作答并保存本题反馈。",
          }
        : resolveExplicitCriminalProcedureEntry(params)
          ? {
              title: "刑诉练习 · 律真",
              description: "按刑诉章节连续练习，独立作答并保存本题反馈。",
            }
          : resolveExplicitCivilProcedureEntry(params)
            ? {
                title: "民诉试练 · 律真",
                description: "独立作答并保存原答，查看本题反馈与参考。",
              }
            : resolveExplicitCivilEntry(params)
              ? {
                  title: "民法试练 · 律真",
                  description: "独立作答并保存原答，查看本题反馈与参考。",
                }
              : {
                  title: "刑法刷题 · 律真",
                  description: "连续练习刑法案例，需要时查看知识要点。",
                };
}
export default async function PracticePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const initialRemainingEntry = resolveExplicitRemainingEntry(params);
  const initialCommercialEntry = resolveExplicitCommercialEntry(params);
  const initialAdministrativeEntry = resolveExplicitAdministrativeEntry(params);
  const initialCriminalProcedureEntry =
    resolveExplicitCriminalProcedureEntry(params);
  const initialCivilProcedureEntry = resolveExplicitCivilProcedureEntry(params);
  const initialCivilEntry = resolveExplicitCivilEntry(params);
  const explicitSubjectEntry =
    initialRemainingEntry ??
    initialCommercialEntry ??
    initialAdministrativeEntry ??
    initialCriminalProcedureEntry ??
    initialCivilProcedureEntry ??
    initialCivilEntry;
  const host = (await headers()).get("host");
  const scoringCards =
    !explicitSubjectEntry &&
    (process.env.LVZHEN_ENV ?? "local") === "local" &&
    ["localhost:3107", "127.0.0.1:3107"].includes(host ?? "")
      ? bankScoringSummaries
      : [];
  const shortScoringCards =
    !explicitSubjectEntry &&
    (process.env.LVZHEN_ENV ?? "local") === "local" &&
    ["localhost:3107", "127.0.0.1:3107"].includes(host ?? "")
      ? shortSummaries
      : [];
  const reviewedFeedbackAvailable =
    !explicitSubjectEntry &&
    (process.env.LVZHEN_ENV ?? "local") === "local" &&
    ["localhost:3107", "127.0.0.1:3107"].includes(host ?? "")
      ? await loadReviewedReceipt(process.cwd(), "assisted")
          .then(() => true)
          .catch(() => false)
      : false;
  const initialQuestion =
    !explicitSubjectEntry &&
    typeof params.question === "string" &&
    exerciseFor(params.question) &&
    isPracticeLocation(params.question, exerciseFor(params.question)!.kind)
      ? params.question
      : undefined;
  return (
    <PracticeEntry
      initialLibrary={
        explicitSubjectEntry
          ? explicitSubjectEntry.kind === "library"
          : params.view === "library" && !initialQuestion
      }
      initialCivilEntry={initialCivilEntry}
      initialLearningExample={resolveLearningExampleEntry(params)}
      initialCivilProcedureEntry={initialCivilProcedureEntry}
      initialCriminalProcedureEntry={initialCriminalProcedureEntry}
      initialRemainingEntry={initialRemainingEntry}
      initialCommercialEntry={initialCommercialEntry}
      initialAdministrativeEntry={initialAdministrativeEntry}
      initialQuestion={initialQuestion}
      returnRun={
        typeof params.question === "string" &&
        isComprehensiveG7Question(params.question) &&
        typeof params.fromRun === "string" &&
        params.fromRun.length <= 100
          ? params.fromRun
          : !initialRemainingEntry &&
              !initialCommercialEntry &&
              !initialAdministrativeEntry &&
              !initialCriminalProcedureEntry &&
              !initialCivilProcedureEntry &&
              typeof params.fromRun === "string"
            ? params.fromRun
            : undefined
      }
      reviewedFeedbackAvailable={reviewedFeedbackAvailable}
      scoringCards={scoringCards}
      shortScoringCards={shortScoringCards}
    />
  );
}
