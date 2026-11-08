import { isComprehensiveG7Paper } from "@/content/comprehensive-g7";
import { corePracticeSubjects } from "@/content/core-practice-sections";
import { assessmentPaper } from "@/content/assessment-papers";
import { loadMatrixLearningExamples } from "@/evaluation/rewrite-comparison/matrix-learning";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { reviewedFeedbackRoute } from "@/domain/reviewed-feedback";
import { loadReviewedReceipt } from "@/evaluation/rewrite-comparison/reviewed-receipts-preview";
import { readTableDailyAvailability } from "@/evaluation/table-daily-service";
import SavedReviewedView from "../scoring/rewrite/components/saved-reviewed-view";
import { loadTableCandidate } from "@/evaluation/table-trial/candidate";
import {
  scoringPapers,
  type ScoringPaper,
} from "@/evaluation/table-trial/papers";
import { AssessmentEntry } from "./assessment-view";
import {
  loadReasoningReadback,
  reasoningLearningExamples,
} from "@/evaluation/rewrite-comparison/reasoning-readback";
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const params = await searchParams;
  const selected =
    typeof params.paper === "string"
      ? assessmentPaper(params.paper)
      : undefined;
  const civil = selected
    ? selected.subject === "civil-law"
    : params.subject === "civil-law";
  return isComprehensiveG7Paper(selected) || params.subject === "all-subjects"
    ? {
        title: "全科综合训练 · 律真",
        description:
          "按阶段连续练题、完整书面分析和缩短模考，保存原答后逐题看讲解。",
      }
    : civil
      ? {
          title: "民法综合练习 · 律真",
          description: "分范围连续做选择题或书面分析，保存后看讲解与关联知识。",
        }
      : {
          title: "刑法综合练习 · 律真",
          description: "跨章案例与刑法客观专项练习。",
        };
}
export default async function AssessmentPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const selectedPaper =
    typeof params.paper === "string"
      ? assessmentPaper(params.paper)
      : undefined;
  const comprehensive =
    isComprehensiveG7Paper(selectedPaper) || params.subject === "all-subjects";
  const host = (await headers()).get("host");
  const local =
    (process.env.LVZHEN_ENV ?? "local") === "local" &&
    ["localhost:3107", "127.0.0.1:3107"].includes(host ?? "");
  let reference;
  try {
    reference = reviewedFeedbackRoute(params);
  } catch {
    notFound();
  }
  if (reference) {
    if (!local) notFound();
    const entry = await loadReviewedReceipt(
      process.cwd(),
      reference.sample,
    ).catch(() => null);
    if (!entry)
      return (
        <main style={{ maxWidth: 760, margin: "60px auto", padding: 24 }}>
          <h1>本题已审读反馈暂不可核对</h1>
          <p>
            保存回执或题目版本尚需核对，不能当作作答错误。本页不会重新评阅。
          </p>
          <a href={reference.returnHref}>返回本题练习</a>
        </main>
      );
    const availability = await readTableDailyAvailability(
      { repo: process.cwd() },
      "CONTRACT_V2",
    );
    return (
      <SavedReviewedView
        entry={entry}
        learningContext={{
          returnHref: reference.returnHref,
          fromRun: reference.fromRun,
          availability,
        }}
      />
    );
  }
  const reviewedFeedbackAvailable =
    local && !comprehensive
      ? await loadReviewedReceipt(process.cwd(), "assisted")
          .then(() => true)
          .catch(() => false)
      : false;
  const reasoningExamples =
    local && !comprehensive
      ? await loadReasoningReadback(process.cwd())
          .then(reasoningLearningExamples)
          .catch(() => null)
      : null;
  const matrixExamples =
    local && !comprehensive
      ? await loadMatrixLearningExamples(process.cwd()).catch(() => null)
      : null;
  // Whole-case review is a local-only trial, like the practice scoring entry.
  let papers: ScoringPaper[] = [];
  if (
    !comprehensive &&
    (process.env.LVZHEN_ENV ?? "local") === "local" &&
    ["localhost:3107", "127.0.0.1:3107"].includes(host ?? "")
  ) {
    try {
      const candidate = await loadTableCandidate(process.cwd());
      papers = scoringPapers(candidate.cases, candidate.archivedIds, true);
    } catch {
      papers = [];
    }
  }
  return (
    <AssessmentEntry
      subject={
        comprehensive
          ? "all-subjects"
          : selectedPaper
            ? (selectedPaper.subject ?? "criminal-law")
            : params.subject === "civil-law"
              ? "civil-law"
              : "criminal-law"
      }
      focus={
        corePracticeSubjects.find((subject) => subject === params.focus) ??
        "all"
      }
      initialPaper={typeof params.paper === "string" ? params.paper : undefined}
      initialRun={typeof params.run === "string" ? params.run : undefined}
      initialQuestion={
        typeof params.question === "string" &&
        /^[1-9]\d{0,2}$/.test(params.question)
          ? Number(params.question)
          : undefined
      }
      category={
        params.view === "cases"
          ? "case"
          : params.view === "exams"
            ? "exam"
            : "all"
      }
      reviewedFeedbackAvailable={reviewedFeedbackAvailable}
      scoringPapers={papers}
      reasoningExamples={reasoningExamples}
      matrixExamples={matrixExamples}
    />
  );
}
