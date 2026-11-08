import { G8CompletionReading } from "./g8-completion-reading";
import { ComprehensiveReading } from "./comprehensive-reading";
import { AnnualReading } from "./annual-reading";
import { TrademarkReading } from "./trademark-reading";
import { EcologyReading } from "./ecology-reading";
import {
  remainingG6Topics,
  remainingG6Chapters,
  remainingG6Revision,
  remainingG6SubjectForQuestion,
} from "@/content/remaining-g6";
import { remainingG6TeacherPublications } from "@/content/remaining-g6-feedback-publications";
import {
  commercialG5Topics,
  commercialG5Chapters,
  commercialG5Revision,
} from "@/content/commercial-g5";
import { commercialG5TeacherPublications } from "@/content/commercial-g5-feedback-publications";
import {
  administrativeG4Topics,
  administrativeG4Chapters,
  administrativeG4Revision,
} from "@/content/administrative-g4";
import { administrativeG4TeacherPublications } from "@/content/administrative-g4-feedback-publications";
import {
  criminalProcedureG1Topics,
  criminalProcedureG1Chapters,
  criminalProcedureG1Revision,
} from "@/content/criminal-procedure-g1";
import { criminalProcedureG1TeacherPublications } from "@/content/criminal-procedure-g1-feedback-publications";
import {
  criminalProcedureFoundationsTopics,
  criminalProcedureFoundationsChapters,
  criminalProcedureFoundationsRevision,
} from "@/content/criminal-procedure-foundations";
import { criminalProcedureFoundationsTeacherPublications } from "@/content/criminal-procedure-foundations-feedback-publications";
import {
  civilProcedureProceduralDetailsTopics,
  civilProcedureProceduralDetailsChapters,
  civilProcedureProceduralDetailsRevision,
} from "@/content/civil-procedure-procedural-details";
import { civilProcedureProceduralDetailsTeacherPublications } from "@/content/civil-procedure-procedural-details-feedback-publications";
import {
  civilProcedureGapFillTopics,
  civilProcedureGapFillChapters,
  civilProcedureGapFillRevision,
} from "@/content/civil-procedure-gap-fill";
import { civilProcedureGapFillTeacherPublications } from "@/content/civil-procedure-gap-fill-feedback-publications";
import { CrossChapterReading } from "./cross-chapter-reading";
import {
  civilProcedureArbitrationTopics,
  civilProcedureArbitrationChapters,
  civilProcedureArbitrationRevision,
} from "@/content/civil-procedure-arbitration";
import { civilProcedureArbitrationTeacherPublications } from "@/content/civil-procedure-arbitration-feedback-publications";
import {
  civilProcedureForeignTopics,
  civilProcedureForeignChapters,
  civilProcedureForeignRevision,
} from "@/content/civil-procedure-foreign";
import { civilProcedureForeignTeacherPublications } from "@/content/civil-procedure-foreign-feedback-publications";
import {
  civilProcedureExecutionTopics,
  civilProcedureExecutionChapters,
  civilProcedureExecutionRevision,
} from "@/content/civil-procedure-execution";
import { civilProcedureExecutionTeacherPublications } from "@/content/civil-procedure-execution-feedback-publications";
import {
  civilProcedureRemediesSpecialTopics,
  civilProcedureRemediesSpecialChapters,
  civilProcedureRemediesSpecialRevision,
} from "@/content/civil-procedure-remedies-special";
import { civilProcedureRemediesSpecialTeacherPublications } from "@/content/civil-procedure-remedies-special-feedback-publications";
import {
  civilProcedureFirstInstanceTopics,
  civilProcedureFirstInstanceChapters,
  civilProcedureFirstInstanceRevision,
} from "@/content/civil-procedure-first-instance";
import { civilProcedureFirstInstanceTeacherPublications } from "@/content/civil-procedure-first-instance-feedback-publications";
import {
  civilProcedureEvidenceProcessTopics,
  civilProcedureEvidenceProcessChapters,
  civilProcedureEvidenceProcessRevision,
} from "@/content/civil-procedure-evidence-process";
import { civilProcedureEvidenceProcessTeacherPublications } from "@/content/civil-procedure-evidence-process-feedback-publications";
import {
  civilProcedureFoundationsTopics,
  civilProcedureFoundationsChapters,
  civilProcedureFoundationsRevision,
} from "@/content/civil-procedure-foundations";
import { civilProcedureFoundationsTeacherPublications } from "@/content/civil-procedure-foundations-feedback-publications";
import {
  civilProcedurePartiesTopics,
  civilProcedurePartiesChapters,
  civilProcedurePartiesRevision,
} from "@/content/civil-procedure-parties";
import { civilProcedurePartiesTeacherPublications } from "@/content/civil-procedure-parties-feedback-publications";
import {
  civilBoundedGapsChapters,
  civilBoundedGapsTopics,
  civilBoundedGapsRevision,
} from "@/content/civil-bounded-gaps";
import { civilBoundedGapsTeacherPublications } from "@/content/civil-bounded-gaps-feedback-publications";
import {
  civilProjectTechPartnershipChapters,
  civilProjectTechPartnershipTopics,
  civilProjectTechPartnershipRevision,
} from "@/content/civil-project-tech-partnership";
import { civilProjectTechPartnershipTeacherPublications } from "@/content/civil-project-tech-partnership-feedback-publications";
import {
  civilFinanceAgencyChapters,
  civilFinanceAgencyTopics,
  civilFinanceAgencyRevision,
} from "@/content/civil-finance-agency";
import { civilFinanceAgencyTeacherPublications } from "@/content/civil-finance-agency-feedback-publications";
import {
  civilServiceContractChapters,
  civilServiceContractTopics,
  civilServiceContractRevision,
} from "@/content/civil-service-contract";
import { civilServiceContractTeacherPublications } from "@/content/civil-service-contract-feedback-publications";
import {
  civilUsufructChapters,
  civilUsufructTopics,
  civilUsufructRevision,
} from "@/content/civil-usufruct";
import { civilUsufructTeacherPublications } from "@/content/civil-usufruct-feedback-publications";
import {
  civilNeighborPossessionChapters,
  civilNeighborPossessionTopics,
  civilNeighborPossessionRevision,
} from "@/content/civil-neighbor-possession";
import { civilNeighborPossessionTeacherPublications } from "@/content/civil-neighbor-possession-feedback-publications";
import {
  civilQuasiContractChapters,
  civilQuasiContractTopics,
  civilQuasiContractRevision,
} from "@/content/civil-quasi-contract";
import { civilQuasiContractTeacherPublications } from "@/content/civil-quasi-contract-feedback-publications";
import {
  civilInheritanceChapters,
  civilInheritanceTopics,
  civilInheritanceRevision,
} from "@/content/civil-inheritance";
import { civilInheritanceTeacherPublications } from "@/content/civil-inheritance-feedback-publications";
import {
  civilFamilyChapters,
  civilFamilyTopics,
  civilFamilyRevision,
} from "@/content/civil-family";
import { civilFamilyTeacherPublications } from "@/content/civil-family-feedback-publications";
import {
  civilPersonalityChapters,
  civilPersonalityTopics,
  civilPersonalityRevision,
} from "@/content/civil-personality";
import { civilPersonalityTeacherPublications } from "@/content/civil-personality-feedback-publications";
import {
  civilPileTreeRoadChapters,
  civilPileTreeRoadTopics,
  civilPileTreeRoadRevision,
} from "@/content/civil-pile-tree-road";
import { civilPileTreeRoadTeacherPublications } from "@/content/civil-pile-tree-road-feedback-publications";
import {
  civilEnvironmentObjectsChapters,
  civilEnvironmentObjectsTopics,
  civilEnvironmentObjectsRevision,
} from "@/content/civil-environment-objects";
import { civilEnvironmentObjectsTeacherPublications } from "@/content/civil-environment-objects-feedback-publications";
import {
  civilTrafficMedicalChapters,
  civilTrafficMedicalTopics,
  civilTrafficMedicalRevision,
} from "@/content/civil-traffic-medical";
import { civilTrafficMedicalTeacherPublications } from "@/content/civil-traffic-medical-feedback-publications";
import {
  civilEducationProductChapters,
  civilEducationProductTopics,
  civilEducationProductRevision,
} from "@/content/civil-education-product";
import { civilEducationProductTeacherPublications } from "@/content/civil-education-product-feedback-publications";
import {
  civilTortSpecialChapters,
  civilTortSpecialTopics,
  civilTortSpecialRevision,
} from "@/content/civil-tort-special";
import { civilTortSpecialTeacherPublications } from "@/content/civil-tort-special-feedback-publications";
import {
  civilGuaranteeCoverageChapters,
  civilGuaranteeCoverageTopics,
  civilGuaranteeCoverageRevision,
} from "@/content/civil-guarantee-coverage";
import { civilGuaranteeCoverageTeacherPublications } from "@/content/civil-guarantee-coverage-feedback-publications";
import {
  civilWorkMandateChapters,
  civilWorkMandateTopics,
  civilWorkMandateRevision,
} from "@/content/civil-work-mandate";
import { civilWorkMandateTeacherPublications } from "@/content/civil-work-mandate-feedback-publications";
import {
  civilGiftLoanChapters,
  civilGiftLoanTopics,
  civilGiftLoanRevision,
} from "@/content/civil-gift-loan";
import { civilGiftLoanTeacherPublications } from "@/content/civil-gift-loan-feedback-publications";
import {
  civilSaleLeaseChapters,
  civilSaleLeaseTopics,
  civilSaleLeaseRevision,
} from "@/content/civil-sale-lease";
import { civilSaleLeaseTeacherPublications } from "@/content/civil-sale-lease-feedback-publications";
import {
  civilObligationsChapters,
  civilObligationsTopics,
  civilObligationsRevision,
} from "@/content/civil-obligations";
import { civilObligationsTeacherPublications } from "@/content/civil-obligations-feedback-publications";
import {
  civilPropertyChapters,
  civilPropertyTopics,
  civilPropertyRevision,
} from "@/content/civil-property";
import { civilPropertyTeacherPublications } from "@/content/civil-property-feedback-publications";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { exerciseFor, exerciseRevision } from "@/content/fault-catalog";
import { assessmentPaper } from "@/content/assessment-papers";
import type { TableResult } from "@/evaluation/table-trial/contract";
import { evaluateTableDaily } from "@/evaluation/table-daily-service";
import { chapterFor } from "@/content/criminal-curriculum";
import { chapterAnswerReferences } from "@/content/student-answer-reference-chapters";
import { generalAnswerReferences } from "@/content/student-answer-reference-general";
import { personPropertyAnswerReferences } from "@/content/student-answer-reference-person-property";
import { finalChapterAnswerReferences } from "@/content/student-answer-reference-final-chapters";
import { openingChapterAnswerReferences } from "@/content/student-answer-reference-opening";
import { openingObjectiveAnswerReferences } from "@/content/student-answer-reference-opening-objective";
import { generalObjectiveAnswerReferences } from "@/content/student-answer-reference-general-objective";
import { personPropertyObjectiveAnswerReferences } from "@/content/student-answer-reference-person-property-objective";
import { finalObjectiveAnswerReferences } from "@/content/student-answer-reference-final-objective";
import { civilAnswerReferences } from "@/content/student-answer-reference-civil";
import {
  civilFoundationsChapters,
  civilFoundationsTopics,
  civilFoundationsRevision,
} from "@/content/civil-foundations";
import { civilFoundationsTeacherPublications } from "@/content/civil-foundations-feedback-publications";
import { studentAnswerReference } from "@/content/student-answer-reference";
import { validateUnitFeedbackResult } from "@/evaluation/unit-feedback-contract";
import { progressSchema, freshProgress } from "@/domain/fault-progress";
import {
  startAssessment,
  editAssessment,
  finishAssessment,
} from "@/domain/assessment";
import { recordCaseLearningFeedback } from "@/domain/learning-observations";
import { practiceTopic } from "@/content/practice-set";
import { projectTopicLearning } from "@/domain/topic-learning-summary";
import { DirectAnswerFeedback } from "../../_components/direct-answer-feedback";
import { TopicLearning } from "../../_components/topic-learning";
import { AnswerReference } from "../../_components/answer-reference";
import { TableFeedback } from "../table/feedback";
import s from "./preview.module.css";

export const metadata = { title: "评阅反馈对照 · 律真" };

type Plan = {
  samples: {
    id: string;
    label: string;
    contentId: string;
    input: {
      exerciseId: string;
      exerciseRevision: string;
      attemptId: string;
      answer: string;
      choice?: string;
    };
  }[];
  order: { sampleId: string; variant: "baseline" | "candidate" | "voice" }[];
};
type Completion = { elapsedMs: number; costCNY: number; accepted: boolean };
const previousRoot = "artifacts/clear-feedback-20261018";
const voiceRoot = "artifacts/teacher-voice-20261018";
const alignmentRoot = "artifacts/defense-alignment-20261018";
const plainRoot = "artifacts/plain-teaching-20261019";
type AlignmentPlan = {
  prepared: (Omit<Plan["samples"][number], "label"> & { expected: string[] })[];
};
async function read(name: string, directory = previousRoot) {
  try {
    return JSON.parse(
      await readFile(join(process.cwd(), directory, name), "utf8"),
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

/** Fixed local, read-only trial. Visiting or expanding a result never calls a model. */
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    previous?: string;
    learning?: string;
    plain?: string;
    review?: string;
    longcase?: string;
    references?: string;
    chapter?: string;
  }>;
}) {
  const host = (await headers()).get("host");
  if (
    (process.env.LVZHEN_ENV ?? "local") !== "local" ||
    !["localhost:3107", "127.0.0.1:3107"].includes(host ?? "")
  )
    notFound();
  const query = await searchParams;
  if (query.references === "g8-completion")
    return <G8CompletionReading chapter={query.chapter} />;
  if (query.references === "ecology-g8")
    return <EcologyReading chapter={query.chapter} />;
  if (query.references === "trademark-g8")
    return <TrademarkReading chapter={query.chapter} />;
  if (query.references === "annual-g8")
    return <AnnualReading chapter={query.chapter} />;
  if (query.references === "comprehensive-g7")
    return <ComprehensiveReading chapter={query.chapter} />;
  if (query.longcase === "1" || query.longcase === "service")
    return <LongCaseReading currentDaily={query.longcase === "service"} />;
  if (query.review === "1") return <ReviewSamples />;
  if (query.references === "civpro-cross-chapter")
    return <CrossChapterReading />;
  if (query.references === "general")
    return <ChapterReferencePreview batch="general" chapter={query.chapter} />;
  if (query.references === "person-property")
    return (
      <ChapterReferencePreview
        batch="person-property"
        chapter={query.chapter}
      />
    );
  if (query.references === "final-chapters")
    return (
      <ChapterReferencePreview batch="final-chapters" chapter={query.chapter} />
    );
  if (query.references === "opening")
    return <ChapterReferencePreview batch="opening" chapter={query.chapter} />;
  if (query.references === "civil")
    return <ChapterReferencePreview batch="civil" chapter={query.chapter} />;
  if (query.references === "remaining-g6")
    return (
      <ChapterReferencePreview batch="remaining-g6" chapter={query.chapter} />
    );
  if (query.references === "commercial-g5")
    return (
      <ChapterReferencePreview batch="commercial-g5" chapter={query.chapter} />
    );
  if (query.references === "admin-g4")
    return <ChapterReferencePreview batch="admin-g4" chapter={query.chapter} />;
  if (query.references === "crimpro-g1")
    return (
      <ChapterReferencePreview batch="crimpro-g1" chapter={query.chapter} />
    );
  if (query.references === "crimpro-foundations")
    return (
      <ChapterReferencePreview
        batch="crimpro-foundations"
        chapter={query.chapter}
      />
    );
  if (query.references === "civpro-procedural-details")
    return (
      <ChapterReferencePreview
        batch="civpro-procedural-details"
        chapter={query.chapter}
      />
    );
  if (query.references === "civpro-gap-fill")
    return (
      <ChapterReferencePreview
        batch="civpro-gap-fill"
        chapter={query.chapter}
      />
    );
  if (query.references === "civpro-arbitration")
    return (
      <ChapterReferencePreview
        batch="civpro-arbitration"
        chapter={query.chapter}
      />
    );
  if (query.references === "civpro-foreign")
    return (
      <ChapterReferencePreview batch="civpro-foreign" chapter={query.chapter} />
    );
  if (query.references === "civpro-execution")
    return (
      <ChapterReferencePreview
        batch="civpro-execution"
        chapter={query.chapter}
      />
    );
  if (query.references === "civpro-remedies-special")
    return (
      <ChapterReferencePreview
        batch="civpro-remedies-special"
        chapter={query.chapter}
      />
    );
  if (query.references === "civpro-first-instance")
    return (
      <ChapterReferencePreview
        batch="civpro-first-instance"
        chapter={query.chapter}
      />
    );
  if (query.references === "civpro-evidence-process")
    return (
      <ChapterReferencePreview
        batch="civpro-evidence-process"
        chapter={query.chapter}
      />
    );
  if (query.references === "civpro-foundations")
    return (
      <ChapterReferencePreview
        batch="civpro-foundations"
        chapter={query.chapter}
      />
    );
  if (query.references === "civpro-parties")
    return (
      <ChapterReferencePreview batch="civpro-parties" chapter={query.chapter} />
    );
  if (query.references === "civil-bounded-gaps")
    return (
      <ChapterReferencePreview
        batch="civil-bounded-gaps"
        chapter={query.chapter}
      />
    );
  if (query.references === "civil-project-tech-partnership")
    return (
      <ChapterReferencePreview
        batch="civil-project-tech-partnership"
        chapter={query.chapter}
      />
    );
  if (query.references === "civil-finance-agency")
    return (
      <ChapterReferencePreview
        batch="civil-finance-agency"
        chapter={query.chapter}
      />
    );
  if (query.references === "civil-service-contract")
    return (
      <ChapterReferencePreview
        batch="civil-service-contract"
        chapter={query.chapter}
      />
    );
  if (query.references === "civil-usufruct")
    return (
      <ChapterReferencePreview batch="civil-usufruct" chapter={query.chapter} />
    );
  if (query.references === "civil-neighbor-possession")
    return (
      <ChapterReferencePreview
        batch="civil-neighbor-possession"
        chapter={query.chapter}
      />
    );
  if (query.references === "civil-quasi-contract")
    return (
      <ChapterReferencePreview
        batch="civil-quasi-contract"
        chapter={query.chapter}
      />
    );
  if (query.references === "civil-inheritance")
    return (
      <ChapterReferencePreview
        batch="civil-inheritance"
        chapter={query.chapter}
      />
    );
  if (query.references === "civil-family")
    return (
      <ChapterReferencePreview batch="civil-family" chapter={query.chapter} />
    );
  if (query.references === "civil-personality")
    return (
      <ChapterReferencePreview
        batch="civil-personality"
        chapter={query.chapter}
      />
    );
  if (query.references === "civil-pile-tree-road")
    return (
      <ChapterReferencePreview
        batch="civil-pile-tree-road"
        chapter={query.chapter}
      />
    );
  if (query.references === "civil-environment-objects")
    return (
      <ChapterReferencePreview
        batch="civil-environment-objects"
        chapter={query.chapter}
      />
    );
  if (query.references === "civil-traffic-medical")
    return (
      <ChapterReferencePreview
        batch="civil-traffic-medical"
        chapter={query.chapter}
      />
    );
  if (query.references === "civil-education-product")
    return (
      <ChapterReferencePreview
        batch="civil-education-product"
        chapter={query.chapter}
      />
    );
  if (query.references === "civil-tort-special")
    return (
      <ChapterReferencePreview
        batch="civil-tort-special"
        chapter={query.chapter}
      />
    );
  if (query.references === "civil-guarantee-coverage")
    return (
      <ChapterReferencePreview
        batch="civil-guarantee-coverage"
        chapter={query.chapter}
      />
    );
  if (query.references === "civil-work-mandate")
    return (
      <ChapterReferencePreview
        batch="civil-work-mandate"
        chapter={query.chapter}
      />
    );
  if (query.references === "civil-gift-loan")
    return (
      <ChapterReferencePreview
        batch="civil-gift-loan"
        chapter={query.chapter}
      />
    );
  if (query.references === "civil-sale-lease")
    return (
      <ChapterReferencePreview
        batch="civil-sale-lease"
        chapter={query.chapter}
      />
    );
  if (query.references === "civil-obligations")
    return (
      <ChapterReferencePreview
        batch="civil-obligations"
        chapter={query.chapter}
      />
    );
  if (query.references === "civil-property")
    return (
      <ChapterReferencePreview batch="civil-property" chapter={query.chapter} />
    );
  if (query.references === "civil-foundations")
    return (
      <ChapterReferencePreview
        batch="civil-foundations"
        chapter={query.chapter}
      />
    );
  if (query.references === "final-objective")
    return (
      <ChapterReferencePreview
        batch="final-objective"
        chapter={query.chapter}
      />
    );
  if (query.references === "person-property-objective")
    return (
      <ChapterReferencePreview
        batch="person-property-objective"
        chapter={query.chapter}
      />
    );
  if (query.references === "general-objective")
    return (
      <ChapterReferencePreview
        batch="general-objective"
        chapter={query.chapter}
      />
    );
  if (query.references === "opening-objective")
    return (
      <ChapterReferencePreview
        batch="opening-objective"
        chapter={query.chapter}
      />
    );
  if (query.references === "1") return <ChapterReferencePreview />;
  if (query.plain === "1")
    return <PlainFeedback previous={query.previous === "1"} />;
  if (query.learning === "1") return <LearningRecapPreview />;
  if (query.learning === "longcase") return <CaseLearningRecapPreview />;
  const alignment = (await read(
    "plan.json",
    alignmentRoot,
  )) as AlignmentPlan | null;
  if (alignment && query.previous !== "1")
    return <AlignedFeedback plan={alignment} />;
  const previous = (await read("plan.json")) as Plan | null;
  const voice = (await read("plan.json", voiceRoot)) as Plan | null;
  const plan = voice ?? previous;
  if (!plan)
    return (
      <main className={s.page}>
        <h1>评阅反馈对照</h1>
        <p>对照尚未准备完成。</p>
      </main>
    );
  return (
    <main className={s.page}>
      <header className={s.header}>
        <a href="/lab/practice?view=library">返回练习</a>
        <p className={s.eyebrow}>律真 · 反馈试读</p>
        <h1>{voice ? "这次直接讲题" : "看看理由是否讲清楚了"}</h1>
        <p>
          4份模拟答卷，讲解由DeepSeek实际生成。展开可以查看上一版，查看不会新增调用。
        </p>
        <p className={s.notice}>
          {voice
            ? "正文直接讲哪里答对、哪里要改。需要逐项核对时，再展开查看。"
            : "候选尚未切换：一处明确错误的标签变成“部分表达”，一份完整答案又被建议补充。这里保留新旧原结果，供你直接对照。"}
        </p>
        <nav className={s.nav} aria-label="选择样例">
          {plan.samples.map((sample) => (
            <a key={sample.id} href={`#${sample.id}`}>
              {sample.label}
            </a>
          ))}
        </nav>
      </header>
      {await Promise.all(
        plan.samples.map(async (sample) => {
          const question = exerciseFor(sample.input.exerciseId);
          if (!question) return null;
          const variant = async (name: "baseline" | "candidate" | "voice") => {
            const sourcePlan = name === "baseline" && voice ? previous! : plan;
            const sourceSample = sourcePlan.samples.find(
              (s) => s.id === sample.id,
            )!;
            const directory = name === "voice" ? voiceRoot : previousRoot;
            const index = sourcePlan.order.findIndex(
              (x) => x.sampleId === sample.id && x.variant === name,
            );
            const completion = (await read(
              `${index}.completion.json`,
              directory,
            )) as Completion | null;
            const saved = await read(`${index}.result.json`, directory);
            if (!completion || !saved) return <p>这一份尚未取得可展示结果。</p>;
            const result = validateUnitFeedbackResult(saved, {
              questionId: sourceSample.input.exerciseId,
              questionRevision: sourceSample.input.exerciseRevision,
              answerId: sourceSample.input.attemptId,
              contentId: sourceSample.contentId,
              originalText: sourceSample.input.answer,
            });
            return (
              <>
                <p className={s.metrics}>
                  {name === "voice"
                    ? "新版讲解"
                    : name === "candidate"
                      ? "候选API输出"
                      : "上一版讲解"}{" "}
                  · {(completion.elapsedMs / 1000).toFixed(2)}秒 · 约
                  {completion.costCNY.toFixed(5)}元
                </p>
                <DirectAnswerFeedback
                  studentReading
                  result={result}
                  answer={sourceSample.input.answer}
                  status="ready"
                  reference={question.reference}
                />
              </>
            );
          };
          return (
            <article className={s.card} key={sample.id} id={sample.id}>
              <p className={s.eyebrow}>{sample.label} · 人工构造答卷</p>
              <h2>{question.title}</h2>
              <details className={s.details}>
                <summary>查看题目与设问</summary>
                <p>{question.facts}</p>
                <p>
                  <strong>{question.prompt}</strong>
                </p>
              </details>
              <h3>模拟原答</h3>
              <blockquote className={s.answer}>
                {sample.input.answer}
              </blockquote>
              <div className={s.result}>
                {await variant(voice ? "voice" : "candidate")}
              </div>
              <details className={s.details}>
                <summary>展开上一版讲解</summary>
                <div className={s.result}>{await variant("baseline")}</div>
              </details>
            </article>
          );
        }),
      )}
    </main>
  );
}

async function ChapterReferencePreview({
  batch = "flagged",
  chapter,
}: {
  batch?:
    | "flagged"
    | "general"
    | "person-property"
    | "final-chapters"
    | "opening"
    | "opening-objective"
    | "general-objective"
    | "person-property-objective"
    | "final-objective"
    | "civil"
    | "civil-foundations"
    | "civil-property"
    | "civil-obligations"
    | "civil-sale-lease"
    | "civil-gift-loan"
    | "civil-work-mandate"
    | "civil-guarantee-coverage"
    | "civil-tort-special"
    | "civil-education-product"
    | "civil-traffic-medical"
    | "civil-environment-objects"
    | "civil-pile-tree-road"
    | "civil-personality"
    | "civil-family"
    | "civil-inheritance"
    | "civil-quasi-contract"
    | "civil-neighbor-possession"
    | "civil-usufruct"
    | "civil-service-contract"
    | "civil-finance-agency"
    | "civil-project-tech-partnership"
    | "civil-bounded-gaps"
    | "civpro-parties"
    | "civpro-foundations"
    | "civpro-evidence-process"
    | "civpro-first-instance"
    | "civpro-remedies-special"
    | "civpro-execution"
    | "civpro-foreign"
    | "civpro-arbitration"
    | "civpro-gap-fill"
    | "civpro-procedural-details"
    | "crimpro-foundations"
    | "crimpro-g1"
    | "admin-g4"
    | "commercial-g5"
    | "remaining-g6";
  chapter?: string;
} = {}) {
  const grouped = batch !== "flagged";
  const authored =
    batch === "civil-foundations" ||
    batch === "civil-property" ||
    batch === "civil-obligations" ||
    batch === "civil-sale-lease" ||
    batch === "civil-gift-loan" ||
    batch === "civil-work-mandate" ||
    batch === "civil-guarantee-coverage" ||
    batch === "civil-tort-special" ||
    batch === "civil-education-product" ||
    batch === "civil-traffic-medical" ||
    batch === "civil-environment-objects" ||
    batch === "civil-pile-tree-road" ||
    batch === "civil-personality" ||
    batch === "civil-family" ||
    batch === "civil-inheritance" ||
    batch === "civil-quasi-contract" ||
    batch === "civil-neighbor-possession" ||
    batch === "civil-usufruct" ||
    batch === "civil-service-contract" ||
    batch === "civil-finance-agency" ||
    batch === "civil-project-tech-partnership" ||
    batch === "civil-bounded-gaps" ||
    batch === "civpro-parties" ||
    batch === "civpro-foundations" ||
    batch === "civpro-evidence-process" ||
    batch === "civpro-first-instance" ||
    batch === "civpro-remedies-special" ||
    batch === "civpro-execution" ||
    batch === "civpro-foreign" ||
    batch === "civpro-arbitration" ||
    batch === "civpro-gap-fill" ||
    batch === "civpro-procedural-details" ||
    batch === "crimpro-foundations" ||
    batch === "crimpro-g1" ||
    batch === "admin-g4" ||
    batch === "commercial-g5" ||
    batch === "remaining-g6";
  const authoredPack =
    batch === "remaining-g6"
      ? {
          topics: remainingG6Topics,
          chapters: remainingG6Chapters,
          revision: remainingG6Revision,
          publications: remainingG6TeacherPublications,
        }
      : batch === "commercial-g5"
        ? {
            topics: commercialG5Topics,
            chapters: commercialG5Chapters,
            revision: commercialG5Revision,
            publications: commercialG5TeacherPublications,
          }
        : batch === "admin-g4"
          ? {
              topics: administrativeG4Topics,
              chapters: administrativeG4Chapters,
              revision: administrativeG4Revision,
              publications: administrativeG4TeacherPublications,
            }
          : batch === "crimpro-g1"
            ? {
                topics: criminalProcedureG1Topics,
                chapters: criminalProcedureG1Chapters,
                revision: criminalProcedureG1Revision,
                publications: criminalProcedureG1TeacherPublications,
              }
            : batch === "crimpro-foundations"
              ? {
                  topics: criminalProcedureFoundationsTopics,
                  chapters: criminalProcedureFoundationsChapters,
                  revision: criminalProcedureFoundationsRevision,
                  publications: criminalProcedureFoundationsTeacherPublications,
                }
              : batch === "civpro-procedural-details"
                ? {
                    topics: civilProcedureProceduralDetailsTopics,
                    chapters: civilProcedureProceduralDetailsChapters,
                    revision: civilProcedureProceduralDetailsRevision,
                    publications:
                      civilProcedureProceduralDetailsTeacherPublications,
                  }
                : batch === "civpro-gap-fill"
                  ? {
                      topics: civilProcedureGapFillTopics,
                      chapters: civilProcedureGapFillChapters,
                      revision: civilProcedureGapFillRevision,
                      publications: civilProcedureGapFillTeacherPublications,
                    }
                  : batch === "civpro-arbitration"
                    ? {
                        topics: civilProcedureArbitrationTopics,
                        chapters: civilProcedureArbitrationChapters,
                        revision: civilProcedureArbitrationRevision,
                        publications:
                          civilProcedureArbitrationTeacherPublications,
                      }
                    : batch === "civpro-foreign"
                      ? {
                          topics: civilProcedureForeignTopics,
                          chapters: civilProcedureForeignChapters,
                          revision: civilProcedureForeignRevision,
                          publications:
                            civilProcedureForeignTeacherPublications,
                        }
                      : batch === "civpro-execution"
                        ? {
                            topics: civilProcedureExecutionTopics,
                            chapters: civilProcedureExecutionChapters,
                            revision: civilProcedureExecutionRevision,
                            publications:
                              civilProcedureExecutionTeacherPublications,
                          }
                        : batch === "civpro-remedies-special"
                          ? {
                              topics: civilProcedureRemediesSpecialTopics,
                              chapters: civilProcedureRemediesSpecialChapters,
                              revision: civilProcedureRemediesSpecialRevision,
                              publications:
                                civilProcedureRemediesSpecialTeacherPublications,
                            }
                          : batch === "civpro-first-instance"
                            ? {
                                topics: civilProcedureFirstInstanceTopics,
                                chapters: civilProcedureFirstInstanceChapters,
                                revision: civilProcedureFirstInstanceRevision,
                                publications:
                                  civilProcedureFirstInstanceTeacherPublications,
                              }
                            : batch === "civpro-evidence-process"
                              ? {
                                  topics: civilProcedureEvidenceProcessTopics,
                                  chapters:
                                    civilProcedureEvidenceProcessChapters,
                                  revision:
                                    civilProcedureEvidenceProcessRevision,
                                  publications:
                                    civilProcedureEvidenceProcessTeacherPublications,
                                }
                              : batch === "civpro-foundations"
                                ? {
                                    topics: civilProcedureFoundationsTopics,
                                    chapters: civilProcedureFoundationsChapters,
                                    revision: civilProcedureFoundationsRevision,
                                    publications:
                                      civilProcedureFoundationsTeacherPublications,
                                  }
                                : batch === "civpro-parties"
                                  ? {
                                      topics: civilProcedurePartiesTopics,
                                      chapters: civilProcedurePartiesChapters,
                                      revision: civilProcedurePartiesRevision,
                                      publications:
                                        civilProcedurePartiesTeacherPublications,
                                    }
                                  : batch === "civil-bounded-gaps"
                                    ? {
                                        topics: civilBoundedGapsTopics,
                                        chapters: civilBoundedGapsChapters,
                                        revision: civilBoundedGapsRevision,
                                        publications:
                                          civilBoundedGapsTeacherPublications,
                                      }
                                    : batch === "civil-project-tech-partnership"
                                      ? {
                                          topics:
                                            civilProjectTechPartnershipTopics,
                                          chapters:
                                            civilProjectTechPartnershipChapters,
                                          revision:
                                            civilProjectTechPartnershipRevision,
                                          publications:
                                            civilProjectTechPartnershipTeacherPublications,
                                        }
                                      : batch === "civil-finance-agency"
                                        ? {
                                            topics: civilFinanceAgencyTopics,
                                            chapters:
                                              civilFinanceAgencyChapters,
                                            revision:
                                              civilFinanceAgencyRevision,
                                            publications:
                                              civilFinanceAgencyTeacherPublications,
                                          }
                                        : batch === "civil-service-contract"
                                          ? {
                                              topics:
                                                civilServiceContractTopics,
                                              chapters:
                                                civilServiceContractChapters,
                                              revision:
                                                civilServiceContractRevision,
                                              publications:
                                                civilServiceContractTeacherPublications,
                                            }
                                          : batch === "civil-usufruct"
                                            ? {
                                                topics: civilUsufructTopics,
                                                chapters: civilUsufructChapters,
                                                revision: civilUsufructRevision,
                                                publications:
                                                  civilUsufructTeacherPublications,
                                              }
                                            : batch ===
                                                "civil-neighbor-possession"
                                              ? {
                                                  topics:
                                                    civilNeighborPossessionTopics,
                                                  chapters:
                                                    civilNeighborPossessionChapters,
                                                  revision:
                                                    civilNeighborPossessionRevision,
                                                  publications:
                                                    civilNeighborPossessionTeacherPublications,
                                                }
                                              : batch === "civil-quasi-contract"
                                                ? {
                                                    topics:
                                                      civilQuasiContractTopics,
                                                    chapters:
                                                      civilQuasiContractChapters,
                                                    revision:
                                                      civilQuasiContractRevision,
                                                    publications:
                                                      civilQuasiContractTeacherPublications,
                                                  }
                                                : batch === "civil-inheritance"
                                                  ? {
                                                      topics:
                                                        civilInheritanceTopics,
                                                      chapters:
                                                        civilInheritanceChapters,
                                                      revision:
                                                        civilInheritanceRevision,
                                                      publications:
                                                        civilInheritanceTeacherPublications,
                                                    }
                                                  : batch === "civil-family"
                                                    ? {
                                                        topics:
                                                          civilFamilyTopics,
                                                        chapters:
                                                          civilFamilyChapters,
                                                        revision:
                                                          civilFamilyRevision,
                                                        publications:
                                                          civilFamilyTeacherPublications,
                                                      }
                                                    : batch ===
                                                        "civil-personality"
                                                      ? {
                                                          topics:
                                                            civilPersonalityTopics,
                                                          chapters:
                                                            civilPersonalityChapters,
                                                          revision:
                                                            civilPersonalityRevision,
                                                          publications:
                                                            civilPersonalityTeacherPublications,
                                                        }
                                                      : batch ===
                                                          "civil-pile-tree-road"
                                                        ? {
                                                            topics:
                                                              civilPileTreeRoadTopics,
                                                            chapters:
                                                              civilPileTreeRoadChapters,
                                                            revision:
                                                              civilPileTreeRoadRevision,
                                                            publications:
                                                              civilPileTreeRoadTeacherPublications,
                                                          }
                                                        : batch ===
                                                            "civil-environment-objects"
                                                          ? {
                                                              topics:
                                                                civilEnvironmentObjectsTopics,
                                                              chapters:
                                                                civilEnvironmentObjectsChapters,
                                                              revision:
                                                                civilEnvironmentObjectsRevision,
                                                              publications:
                                                                civilEnvironmentObjectsTeacherPublications,
                                                            }
                                                          : batch ===
                                                              "civil-traffic-medical"
                                                            ? {
                                                                topics:
                                                                  civilTrafficMedicalTopics,
                                                                chapters:
                                                                  civilTrafficMedicalChapters,
                                                                revision:
                                                                  civilTrafficMedicalRevision,
                                                                publications:
                                                                  civilTrafficMedicalTeacherPublications,
                                                              }
                                                            : batch ===
                                                                "civil-education-product"
                                                              ? {
                                                                  topics:
                                                                    civilEducationProductTopics,
                                                                  chapters:
                                                                    civilEducationProductChapters,
                                                                  revision:
                                                                    civilEducationProductRevision,
                                                                  publications:
                                                                    civilEducationProductTeacherPublications,
                                                                }
                                                              : batch ===
                                                                  "civil-tort-special"
                                                                ? {
                                                                    topics:
                                                                      civilTortSpecialTopics,
                                                                    chapters:
                                                                      civilTortSpecialChapters,
                                                                    revision:
                                                                      civilTortSpecialRevision,
                                                                    publications:
                                                                      civilTortSpecialTeacherPublications,
                                                                  }
                                                                : batch ===
                                                                    "civil-guarantee-coverage"
                                                                  ? {
                                                                      topics:
                                                                        civilGuaranteeCoverageTopics,
                                                                      chapters:
                                                                        civilGuaranteeCoverageChapters,
                                                                      revision:
                                                                        civilGuaranteeCoverageRevision,
                                                                      publications:
                                                                        civilGuaranteeCoverageTeacherPublications,
                                                                    }
                                                                  : batch ===
                                                                      "civil-work-mandate"
                                                                    ? {
                                                                        topics:
                                                                          civilWorkMandateTopics,
                                                                        chapters:
                                                                          civilWorkMandateChapters,
                                                                        revision:
                                                                          civilWorkMandateRevision,
                                                                        publications:
                                                                          civilWorkMandateTeacherPublications,
                                                                      }
                                                                    : batch ===
                                                                        "civil-gift-loan"
                                                                      ? {
                                                                          topics:
                                                                            civilGiftLoanTopics,
                                                                          chapters:
                                                                            civilGiftLoanChapters,
                                                                          revision:
                                                                            civilGiftLoanRevision,
                                                                          publications:
                                                                            civilGiftLoanTeacherPublications,
                                                                        }
                                                                      : batch ===
                                                                          "civil-sale-lease"
                                                                        ? {
                                                                            topics:
                                                                              civilSaleLeaseTopics,
                                                                            chapters:
                                                                              civilSaleLeaseChapters,
                                                                            revision:
                                                                              civilSaleLeaseRevision,
                                                                            publications:
                                                                              civilSaleLeaseTeacherPublications,
                                                                          }
                                                                        : batch ===
                                                                            "civil-obligations"
                                                                          ? {
                                                                              topics:
                                                                                civilObligationsTopics,
                                                                              chapters:
                                                                                civilObligationsChapters,
                                                                              revision:
                                                                                civilObligationsRevision,
                                                                              publications:
                                                                                civilObligationsTeacherPublications,
                                                                            }
                                                                          : batch ===
                                                                              "civil-property"
                                                                            ? {
                                                                                topics:
                                                                                  civilPropertyTopics,
                                                                                chapters:
                                                                                  civilPropertyChapters,
                                                                                revision:
                                                                                  civilPropertyRevision,
                                                                                publications:
                                                                                  civilPropertyTeacherPublications,
                                                                              }
                                                                            : {
                                                                                topics:
                                                                                  civilFoundationsTopics,
                                                                                chapters:
                                                                                  civilFoundationsChapters,
                                                                                revision:
                                                                                  civilFoundationsRevision,
                                                                                publications:
                                                                                  civilFoundationsTeacherPublications,
                                                                              };
  const authoredDirectory =
    batch === "remaining-g6"
      ? "artifacts/remaining-g6-20261101"
      : batch === "commercial-g5"
        ? "artifacts/commercial-g5-20261101"
        : batch === "admin-g4"
          ? "artifacts/admin-g4-20261101"
          : batch === "crimpro-g1"
            ? "artifacts/crimpro-g1-20261101"
            : batch === "crimpro-foundations"
              ? "artifacts/crimpro-foundations-20261031"
              : batch === "civpro-procedural-details"
                ? "artifacts/civpro-procedural-details-20261030"
                : batch === "civpro-gap-fill"
                  ? "artifacts/civpro-gap-fill-20261030"
                  : batch === "civpro-arbitration"
                    ? "artifacts/civpro-arbitration-20261030"
                    : batch === "civpro-foreign"
                      ? "artifacts/civpro-foreign-20261029"
                      : batch === "civpro-execution"
                        ? "artifacts/civpro-execution-20261029"
                        : batch === "civpro-remedies-special"
                          ? "artifacts/civpro-remedies-special-20261029"
                          : batch === "civpro-first-instance"
                            ? "artifacts/civpro-first-instance-20261029"
                            : batch === "civpro-evidence-process"
                              ? "artifacts/civpro-evidence-process-20261029"
                              : batch === "civpro-foundations"
                                ? "artifacts/civpro-foundations-20261028"
                                : batch === "civpro-parties"
                                  ? "artifacts/civpro-parties-20261028"
                                  : batch === "civil-bounded-gaps"
                                    ? "artifacts/civil-bounded-gaps-20261027"
                                    : batch === "civil-project-tech-partnership"
                                      ? "artifacts/civil-project-tech-partnership-20261024"
                                      : batch === "civil-finance-agency"
                                        ? "artifacts/civil-finance-agency-20261024"
                                        : batch === "civil-service-contract"
                                          ? "artifacts/civil-service-contract-20261024"
                                          : batch === "civil-usufruct"
                                            ? "artifacts/civil-usufruct-20261024"
                                            : batch ===
                                                "civil-neighbor-possession"
                                              ? "artifacts/civil-neighbor-possession-20261024"
                                              : batch === "civil-quasi-contract"
                                                ? "artifacts/civil-quasi-contract-20261024"
                                                : batch === "civil-inheritance"
                                                  ? "artifacts/civil-inheritance-20261024"
                                                  : batch === "civil-family"
                                                    ? "artifacts/civil-family-20261023"
                                                    : batch ===
                                                        "civil-personality"
                                                      ? "artifacts/civil-personality-20261023"
                                                      : batch ===
                                                          "civil-pile-tree-road"
                                                        ? "artifacts/civil-pile-tree-road-20261023"
                                                        : batch ===
                                                            "civil-environment-objects"
                                                          ? "artifacts/civil-environment-objects-20261023"
                                                          : batch ===
                                                              "civil-traffic-medical"
                                                            ? "artifacts/civil-traffic-medical-20261023"
                                                            : batch ===
                                                                "civil-education-product"
                                                              ? "artifacts/civil-education-product-20261023"
                                                              : batch ===
                                                                  "civil-tort-special"
                                                                ? "artifacts/civil-tort-special-20261023"
                                                                : batch ===
                                                                    "civil-guarantee-coverage"
                                                                  ? "artifacts/civil-guarantee-coverage-20261023"
                                                                  : batch ===
                                                                      "civil-work-mandate"
                                                                    ? "artifacts/civil-work-mandate-20261023"
                                                                    : batch ===
                                                                        "civil-gift-loan"
                                                                      ? "artifacts/civil-gift-loan-20261023"
                                                                      : batch ===
                                                                          "civil-sale-lease"
                                                                        ? "artifacts/civil-sale-lease-20261022"
                                                                        : batch ===
                                                                            "civil-obligations"
                                                                          ? "artifacts/civil-obligations-20261022"
                                                                          : batch ===
                                                                              "civil-property"
                                                                            ? "artifacts/civil-property-20261022"
                                                                            : "artifacts/civil-foundations-20261022";
  const authoredDescription =
    batch === "remaining-g6"
      ? "理论法、宪法、法律史、司法制度与职业道德、三国法及知识产权，40组80个原创案例、160道题。"
      : batch === "commercial-g5"
        ? "公司、合伙、破产、票据、保险证券、竞争消费、劳动社保、税收土地和生态环境，新增40组80个原创案例、160道题。"
        : batch === "admin-g4"
          ? "行政主体、许可、处罚、强制与公开、复议、行政诉讼及赔偿，新增36组72个原创案例、144道题。"
          : batch === "crimpro-g1"
            ? "刑诉基本制度、立案侦查、审查起诉、审判救济、特别程序与执行，36组72个原创案例、144道题。"
            : batch === "crimpro-foundations"
              ? "刑事管辖、回避、辩护保障和强制措施，8组16个原创案例、32道题。"
              : batch === "civpro-procedural-details"
                ? "遗产管理人、无主财产、选民资格、妨害诉讼措施、诉讼费用、仲裁反请求与裁决补正，七组16个原创案例、32道题。"
                : batch === "civpro-gap-fill"
                  ? "代表人诉讼、留置与公告送达、诉讼中止与终结、仲裁不予执行，四组8个原创案例、16道题。"
                  : batch === "civpro-arbitration"
                    ? "仲裁范围与机构、协议效力、回避与保全、审理调解、撤销执行及涉外仲裁，六组12个案例、24道题。"
                    : batch === "civpro-foreign"
                      ? "涉外管辖、境外送达与期间、外国判决承认执行、跨境取证与司法协助，四组8个案例、16道题。"
                      : batch === "civpro-execution"
                        ? "执行申请、行为与标的异议、执行措施与担保、和解与分配、中止和执行回转，六组12个案例、24道题。"
                        : batch === "civpro-remedies-special"
                          ? "二审、再审与检察监督、公益与第三人撤销、特别程序、支付令和公示催告，十组20个案例、40道题。"
                          : batch === "civpro-first-instance"
                            ? "期间与送达、保全与先予执行、起诉与撤诉、调解、简易及小额诉讼、裁判救济，八组16个案例、32道题。"
                            : batch === "civpro-evidence-process"
                              ? "原件与电子记录、法院调取、证人与鉴定、质证、举证期限与保全，五组10个案例、20道题。"
                              : batch === "civpro-foundations"
                                ? "诉讼请求与反诉、审判组织与回避、级别管辖、协议管辖、移送与指定管辖，五组10个案例、20道题。"
                                : batch === "civpro-parties"
                                  ? "诉讼行为能力与法定代理、共同诉讼、两类第三人，四组8个案例、16道题。"
                                  : batch === "civil-bounded-gaps"
                                    ? "总则、债的消灭、供用合同、业主共有、收养、遗产管理与网络服务者责任，共12组48题。"
                                    : batch === "civil-project-tech-partnership"
                                      ? "建设工程、技术开发、技术许可与服务、合伙四章，共8组32题。"
                                      : batch === "civil-finance-agency"
                                        ? "融资租赁、保理、行纪、中介四章，共8组32题。"
                                        : batch === "civil-service-contract"
                                          ? "运输、保管、仓储、物业服务四章，共8组32题。"
                                          : batch === "civil-usufruct"
                                            ? "居住权、地役权、建设用地使用权、土地承包经营权四章，共8组32题。"
                                            : batch ===
                                                "civil-neighbor-possession"
                                              ? "相邻关系、占有两章，共8组32题。"
                                              : batch === "civil-quasi-contract"
                                                ? "无因管理、不当得利两章，共8组32题。"
                                                : batch === "civil-inheritance"
                                                  ? "继承开始、法定继承、遗嘱与遗产处理四章，共8组32题。"
                                                  : batch === "civil-family"
                                                    ? "结婚效力、夫妻财产债务、离婚与父母子女四章，共8组32题。"
                                                    : batch ===
                                                        "civil-personality"
                                                      ? "新增姓名名称、肖像、名誉、隐私与个人信息四章，共8组32题。"
                                                      : batch ===
                                                          "civil-pile-tree-road"
                                                        ? "新增堆放物倒塌与过错分担、林木折断与果实坠落、道路障碍与管理责任三章，共6组24题。"
                                                        : batch ===
                                                            "civil-environment-objects"
                                                          ? "新增环境污染、高度危险、建筑倒塌与悬挂物、高空抛物与公共设施四章，共8组32题。"
                                                          : batch ===
                                                              "civil-traffic-medical"
                                                            ? "新增借用转让车辆责任、交通保险与好意同乘、诊疗病历责任、告知同意与紧急抢救四章，共8组32题。"
                                                            : batch ===
                                                                "civil-education-product"
                                                              ? "新增教育机构责任、缺陷产品责任与追偿、产品危险与流通后补救三章，共6组24题。"
                                                              : batch ===
                                                                  "civil-tort-special"
                                                                ? "新增监护与委托照看、用人单位与劳务派遣、饲养动物致害三章，共6组24题。"
                                                                : batch ===
                                                                    "civil-guarantee-coverage"
                                                                  ? "新增保证期间与行使方式、保证范围与主债变化、物保人保并存三章，共6组24题。"
                                                                  : batch ===
                                                                      "civil-work-mandate"
                                                                    ? "新增承揽工作与材料、成果质量与解除、委托事务处理、费用与终止四章，共8组32题。"
                                                                    : batch ===
                                                                        "civil-gift-loan"
                                                                      ? "新增赠与履行、赠与撤销与困难、自然人借款成立与本金、借期利息与还款四章，共8组32题。"
                                                                      : batch ===
                                                                          "civil-sale-lease"
                                                                        ? "新增买卖交付与价款、检验与样品、租赁使用、租赁与房屋转让四章，共8组32题。"
                                                                        : batch ===
                                                                            "civil-obligations"
                                                                          ? "新增债权保全、债权转让、债务转移与加入三章，共6组24题。"
                                                                          : batch ===
                                                                              "civil-property"
                                                                            ? "新增共有、善意取得、抵押权、质押与留置四章，共8组32题。"
                                                                            : "新增民事行为能力、诉讼时效、不动产登记三章，共6组24题。";
  const authoredEditions = authoredPack.topics.flatMap((topic) =>
    topic.exercises.map((q) => ({
      questionId: q.id,
      questionRevision: authoredPack.revision,
      contentId: authoredPack.publications[q.id],
      chapterId: authoredPack.chapters.find((c) =>
        c.topicIds.includes(topic.id),
      )!.id,
      version: authoredPack.revision,
      originalReference: q.reference,
      paragraphs: [q.reference],
    })),
  );
  const chapters = authored
    ? authoredPack.chapters.map((c) => c.id)
    : batch === "civil"
      ? [...new Set(civilAnswerReferences.map((q) => q.chapterId))]
      : batch === "general-objective"
        ? ["CL06", "CL07", "CL08", "CL09", "CL10"]
        : batch === "opening" || batch === "opening-objective"
          ? ["CL01", "CL02", "CL03", "CL04"]
          : batch === "final-chapters" || batch === "final-objective"
            ? ["CL15", "CL16", "CL17", "CL18", "CL19", "CL20"]
            : batch === "person-property" ||
                batch === "person-property-objective"
              ? ["CL11", "CL12", "CL13", "CL14"]
              : ["CL05", "CL06", "CL07", "CL08", "CL09", "CL10"];
  const selected =
    chapter && chapters.includes(chapter) ? chapter : chapters[0];
  const allEditions = authored
    ? authoredEditions
    : batch === "civil"
      ? civilAnswerReferences
      : batch === "final-objective"
        ? finalObjectiveAnswerReferences
        : batch === "person-property-objective"
          ? personPropertyObjectiveAnswerReferences
          : batch === "general-objective"
            ? generalObjectiveAnswerReferences
            : batch === "opening-objective"
              ? openingObjectiveAnswerReferences
              : batch === "opening"
                ? openingChapterAnswerReferences
                : batch === "final-chapters"
                  ? finalChapterAnswerReferences
                  : batch === "person-property"
                    ? personPropertyAnswerReferences
                    : batch === "general"
                      ? generalAnswerReferences
                      : chapterAnswerReferences;
  const editions = grouped
    ? allEditions.filter((q) => q.chapterId === selected)
    : allEditions;
  const directory = authored
    ? authoredDirectory
    : batch === "civil"
      ? "artifacts/civil-reading-20261022"
      : batch === "final-objective"
        ? "artifacts/chapter-objective-final-20261021"
        : batch === "person-property-objective"
          ? "artifacts/chapter-objective-person-property-20261020"
          : batch === "general-objective"
            ? "artifacts/chapter-objective-general-20261020"
            : batch === "opening-objective"
              ? "artifacts/chapter-objective-opening-20261020"
              : batch === "opening"
                ? "artifacts/chapter-reference-opening-20261020"
                : batch === "final-chapters"
                  ? "artifacts/chapter-reference-final-20261019"
                  : batch === "person-property"
                    ? "artifacts/chapter-reference-person-property-20261019"
                    : batch === "general"
                      ? "artifacts/chapter-reference-general-20261019"
                      : "artifacts/chapter-reference-reading-20261019";
  const plan = (await read("plan.json", directory)) as {
    prepared: Plan["samples"];
  } | null;
  const examples = await Promise.all(
    (plan?.prepared ?? []).map(async (sample) => {
      const completion = (await read(
        `${sample.id}.completion.json`,
        directory,
      )) as Completion | null;
      const saved = await read(`${sample.id}.reply.json`, directory);
      if (!completion?.accepted || !saved?.reply?.result) return null;
      const result = validateUnitFeedbackResult(saved.reply.result, {
        questionId: sample.input.exerciseId,
        questionRevision: sample.input.exerciseRevision,
        answerId: sample.input.attemptId,
        contentId: sample.contentId,
        originalText: sample.input.choice || sample.input.answer,
      });
      return { sample, completion, result };
    }),
  );
  return (
    <main className={s.page}>
      <header className={s.header}>
        <a
          href={
            batch === "remaining-g6"
              ? `/lab/practice?view=library&subject=${remainingG6SubjectForQuestion(authoredPack.topics.find((t) => t.exercises.some((q) => !chapter || authoredPack.chapters.find((c) => c.id === chapter)?.topicIds.includes(t.id)))?.exercises[0]?.id ?? "") ?? "theory-law"}`
              : batch === "commercial-g5"
                ? "/lab/practice?view=library&subject=commercial-law"
                : batch === "admin-g4"
                  ? "/lab/practice?view=library&subject=administrative-law"
                  : batch === "crimpro-foundations" || batch === "crimpro-g1"
                    ? "/lab/practice?view=library&subject=criminal-procedure"
                    : batch === "civpro-parties" ||
                        batch === "civpro-foundations" ||
                        batch === "civpro-evidence-process" ||
                        batch === "civpro-first-instance" ||
                        batch === "civpro-remedies-special" ||
                        batch === "civpro-execution" ||
                        batch === "civpro-foreign" ||
                        batch === "civpro-arbitration" ||
                        batch === "civpro-gap-fill" ||
                        batch === "civpro-procedural-details"
                      ? "/lab/practice?view=library&subject=civil-procedure"
                      : "/lab/practice?view=library"
          }
        >
          返回练习
        </a>
        <p className={s.eyebrow}>律真 · 参考答案试读</p>
        <h1>把这道题的答案说清楚</h1>
        <p>
          {authored
            ? authoredDescription
            : batch === "civil"
              ? "民法原有47题已逐题核对，改写17份参考，保留30份。"
              : batch === "final-objective"
                ? "这批核对150道选择题，改写58份解析，保留92份。"
                : batch === "person-property-objective"
                  ? "这批核对123道选择题，改写46份解析，保留77份。"
                  : batch === "general-objective"
                    ? "这批核对104道选择题，改写59份解析，保留45份。"
                    : batch === "opening-objective"
                      ? "这批核对66道选择题，改写31份解析，保留35份。"
                      : batch === "opening"
                        ? "这批核对33题，改写21份参考，保留12份。"
                        : batch === "final-chapters"
                          ? "这批核对121题，改写62份参考，保留59份。"
                          : batch === "person-property"
                            ? "这批核对93题，改写56份参考，保留37份已清楚的答案。"
                            : batch === "general"
                              ? "这批核对78题，改写45份参考，保留33份已清楚的答案。"
                              : "本轮整理14份固定参考。"}
          先给本案结论，再用案情讲理由。
        </p>
        <p>
          这些是预先编写的参考答案；AI会另结合学生原答讲解。展开可查看题目，查看不会发起评阅。
        </p>
        <nav className={s.nav} aria-label="本轮参考答案">
          {grouped
            ? chapters.map((id) => (
                <a
                  key={id}
                  href={`?references=${batch}&chapter=${id}`}
                  aria-current={selected === id ? "page" : undefined}
                >
                  {chapterFor(id)?.title ??
                    civilAnswerReferences.find((copy) => copy.chapterId === id)
                      ?.chapterTitle}
                </a>
              ))
            : chapterAnswerReferences.map((copy) => (
                <a key={copy.questionId} href={`#${copy.questionId}`}>
                  {exerciseFor(copy.questionId)?.title}
                </a>
              ))}
        </nav>
      </header>
      {grouped && (
        <h2>
          {chapterFor(selected)?.title ??
            civilAnswerReferences.find((copy) => copy.chapterId === selected)
              ?.chapterTitle}{" "}
          · {editions.length}份新版参考
        </h2>
      )}
      {editions.map((edition) => {
        const question = exerciseFor(edition.questionId);
        const example = examples.find(
          (x) => x?.sample.input.exerciseId === edition.questionId,
        );
        const copy = authored
          ? edition
          : studentAnswerReference({
              questionId: edition.questionId,
              questionRevision: edition.questionRevision,
              originalReference: question?.reference,
              contentId: edition.contentId,
            });
        if (!question || !copy) return null;
        return (
          <article key={question.id} id={question.id} className={s.card}>
            <p className={s.eyebrow}>
              {chapterFor(edition.chapterId)?.title ??
                civilAnswerReferences.find(
                  (copy) => copy.chapterId === edition.chapterId,
                )?.chapterTitle}
            </p>
            <h2>{question.title}</h2>
            <details className={s.details}>
              <summary>查看题目</summary>
              <p className={s.answer}>{question.facts}</p>
              <p>{question.prompt}</p>
              {question.options && (
                <>
                  <ul>
                    {question.options.map((o) => (
                      <li key={o.id}>
                        {o.id.toUpperCase()}. {o.text}
                      </li>
                    ))}
                  </ul>
                  <p>
                    正确选项：
                    {(question.correctChoices ?? [question.answer!])
                      .map((id) => id.toUpperCase())
                      .join("、")}
                  </p>
                </>
              )}
            </details>
            <section
              aria-label="新版参考答案"
              data-reference-edition={copy.version}
            >
              <h3>参考答案</h3>
              {copy.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </section>
            {!authored && (
              <details className={s.details}>
                <summary>对照原来的参考</summary>
                <p className={s.answer}>{question.reference}</p>
              </details>
            )}
            {example && (
              <details className={s.details}>
                <summary>看一份虚构答卷的实际AI讲解</summary>
                <p>这是一份用于核对讲解效果的新编答卷。</p>
                {example.sample.input.choice ? (
                  <p className={s.answer}>
                    本次选择：{example.sample.input.choice.toUpperCase()}
                  </p>
                ) : (
                  <blockquote className={s.answer}>
                    {example.sample.input.answer}
                  </blockquote>
                )}
                <p className={s.metrics}>
                  DeepSeek实际返回 ·{" "}
                  {(example.completion.elapsedMs / 1000).toFixed(2)}秒
                </p>
                <p data-chapter-model-example={example.sample.id}>
                  {example.result.view.studentResponse ??
                    example.result.view.substantiveIssue}
                </p>
                {example.result.id ===
                  "9248ff4589eff0ba20d4ce7b4acb1c5b4e00ac8b7f1c1e4cc10e05506582adc5" && (
                  <p data-example-clarification="retrial-execution">
                    讲解补充：这道题要记住的是，申请再审本身不停止执行。再审以外，也有其他法定中止执行情形。原讲解中的“只有”说得太绝对。
                    <a href="https://jiangsu.chinatax.gov.cn/art/2023/9/1/art_23636_1028.html">
                      查看民事诉讼法第267条
                    </a>
                  </p>
                )}
              </details>
            )}
          </article>
        );
      })}
    </main>
  );
}

async function LongCaseReading({
  currentDaily = false,
}: {
  currentDaily?: boolean;
}) {
  // Fixed new fictional sheet only. The read action verifies its saved receipt;
  // opening this preview never submits an answer or writes a learning record.
  const artifact = currentDaily
    ? {
        kind: "synthetic-mixed",
        result: (
          await evaluateTableDaily(
            {
              action: "read",
              id: "16737d79c85dc0d87eeb2108192d808daf2a92a54929c0e02bf10c8c0a1a193a",
            },
            { repo: process.cwd() },
          )
        ).result,
      }
    : ((await read("DEBT-mixed.json", "artifacts/card-trial-2026-09-30")) as {
        kind: string;
        result: TableResult;
      } | null);
  const paper = assessmentPaper("cap-debt")!;
  const result = artifact?.result;
  if (
    artifact?.kind !== "synthetic-mixed" ||
    !result ||
    result.case.id !== "DEBT" ||
    result.state !== "complete" ||
    result.source !== "real_provider" ||
    result.case.questions.length !== paper.questionIds.length ||
    result.answers.length !== paper.questionIds.length ||
    !paper.questionIds.every((id, i) => {
      const q = exerciseFor(id)!;
      return (
        q.facts === result.case.facts &&
        q.prompt === result.case.questions[i]?.prompt &&
        result.case.questions[i]?.id === String(i + 1) &&
        result.answers[i]?.id === String(i + 1)
      );
    })
  )
    return (
      <main className={s.page}>
        <p>这份长案例与已保存评阅尚未对齐。</p>
      </main>
    );
  return (
    <main className={s.page}>
      <header className={s.header}>
        <a href="/lab/assessment?paper=cap-debt">自己做这道长案例 →</a>
        <p className={s.eyebrow}>律真 · 长案例试读</p>
        <h1>{result.case.title}</h1>
        <p>
          {currentDaily
            ? "这是本次接入日常服务后新测的一份虚构答卷，包含错答和漏答，以下保留DeepSeek实际返回的评阅。"
            : "这是一份故意夹错的模拟答卷，讲解使用之前保存的真实DeepSeek评阅。"}
          原答、判断和分数保持原样；查看不会调用模型或写入学习记录。
        </p>
        {currentDaily && (
          <p className={s.metrics}>
            {result.total ?? "待核对"} / {result.maximum} 分 · DeepSeek关闭思考
            · {(result.durationMs / 1000).toFixed(2)}秒 · 公开费率估算 ¥
            {result.costCny?.toFixed(5)}
          </p>
        )}
        <nav className={s.nav} aria-label="选择小问">
          {result.case.questions.map((q) => (
            <a key={q.id} href={`#question-${q.id}`}>
              第{q.id}问
            </a>
          ))}
        </nav>
      </header>
      <section className={s.card}>
        <h2>完整案情</h2>
        {result.case.facts.split("\n\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>
      {result.case.questions.map((question, i) => {
        const q = exerciseFor(paper.questionIds[i])!;
        const answer = result.answers[i].text;
        return (
          <article
            className={s.card}
            key={question.id}
            id={`question-${question.id}`}
            data-long-case-reading={q.id}
          >
            <p className={s.eyebrow}>第{question.id}问</p>
            <h2>{question.prompt}</h2>
            <h3>模拟原答</h3>
            <blockquote className={s.answer}>{answer}</blockquote>
            <h3>答题讲解</h3>
            <TableFeedback
              documentFlow
              questions={[{ ...question, answer }]}
              assessment={result.assessment}
              resultId={result.id}
            />
            <h3>参考答案</h3>
            <AnswerReference
              questionId={q.id}
              questionRevision={exerciseRevision(q.id)}
              reference={q.reference}
            />
          </article>
        );
      })}
    </main>
  );
}

async function CaseLearningRecapPreview() {
  const { result } = await evaluateTableDaily(
    {
      action: "read",
      id: "16737d79c85dc0d87eeb2108192d808daf2a92a54929c0e02bf10c8c0a1a193a",
    },
    { repo: process.cwd() },
  );
  if (!result || result.state !== "complete" || result.case.id !== "DEBT")
    return (
      <main className={s.page}>
        <p>这份虚构答卷暂未取得保存结果。</p>
      </main>
    );
  const paper = assessmentPaper("cap-debt")!;
  const base = Date.parse(result.createdAt);
  const at = (delta: number) => new Date(base + delta).toISOString();
  const runId = "read-only-case-learning-preview";
  let state = startAssessment(freshProgress(), paper.id, runId, at(-60000));
  for (const [i, id] of paper.questionIds.entries())
    state = editAssessment(
      state,
      id,
      { answer: result.answers[i].text },
      at(-30000),
    );
  state = finishAssessment(state, runId, at(-1000));
  state = recordCaseLearningFeedback(state, runId, result, at(30000));
  return (
    <main className={s.page}>
      <header className={s.header}>
        <a href="/lab/study">返回学习 →</a>
        <p className={s.eyebrow}>律真 · 学习记录试读</p>
        <h1>长案例做完以后</h1>
        <p>
          同一份虚构答卷的五问，分别回到相关知识点。写到的内容、需要补充的内容各自保留，不把这一次答对算成已经掌握。
        </p>
        <p className={s.notice}>
          这是独立的演示记录，不会写入你的学习记录，也不会调用模型。回看链接打开已有的原答与讲解。
        </p>
      </header>
      {paper.questionIds.map((id, i) => {
        const summary = projectTopicLearning(
          state,
          practiceTopic(id).id,
          base + 60000,
        )!;
        const preview = {
          ...summary,
          latestWritten: summary.latestWritten
            ? {
                ...summary.latestWritten,
                href: `/lab/scoring/feedback-reading?longcase=service#question-${i + 1}`,
              }
            : undefined,
        };
        return <TopicLearning key={id} summary={preview} />;
      })}
    </main>
  );
}

async function ReviewSamples() {
  const examples = [
    {
      id: "short-other-case",
      questionId: "cl13-possession-commission",
      label: "保管茶具 · 完整作答",
      directory: `${plainRoot}/concise`,
    },
    {
      id: "withheld-tax",
      questionId: "cl16-tax-withholding",
      label: "代扣税款 · 部分答对，也有错误",
      directory: "artifacts/chapter-reference-final-20261019",
    },
    {
      id: "education-duty",
      questionId: "safety-education-facilities-report-v2",
      label: "礼堂安全 · 案情更复杂",
      directory: "artifacts/chapter-reference-person-property-20261019",
    },
  ];
  return (
    <main className={s.page}>
      <header className={s.header}>
        <a href="/lab/practice?view=library">返回题库 →</a>
        <p className={s.eyebrow}>律真 · 三道题试读</p>
        <h1>看看题目和讲解是否讲明白了</h1>
        <p>
          一份完整作答，两份故意答错部分内容的模拟作答。
          讲解来自此前保存的真实DeepSeek结果，原文保留；查看不会调用模型或写入你的学习记录。
        </p>
        <p className={s.notice}>
          重点看三件事：这题该怎么答，模拟答案哪里对、哪里错，下次怎么改。
          先看茶具题和税款题，有余力再看礼堂题。
        </p>
        <nav className={s.nav} aria-label="选择试读题目">
          {examples.map((example) => (
            <a key={example.id} href={`#${example.id}`}>
              {example.label}
            </a>
          ))}
        </nav>
      </header>
      {await Promise.all(
        examples.map(async (example, index) => {
          const plan = (await read("plan.json", example.directory)) as {
            synthetic?: boolean;
            prepared: Plan["samples"];
          } | null;
          const sample = plan?.synthetic
            ? plan.prepared.find(
                (sample) =>
                  sample.id === example.id &&
                  sample.input.exerciseId === example.questionId,
              )
            : undefined;
          const question = exerciseFor(example.questionId);
          const completion = (await read(
            `${example.id}.completion.json`,
            example.directory,
          )) as Completion | null;
          const saved = await read(
            `${example.id}.reply.json`,
            example.directory,
          );
          const result =
            sample &&
            question &&
            exerciseRevision(question.id) === sample.input.exerciseRevision &&
            completion?.accepted &&
            saved?.reply?.result
              ? validateUnitFeedbackResult(saved.reply.result, {
                  questionId: sample.input.exerciseId,
                  questionRevision: sample.input.exerciseRevision,
                  answerId: sample.input.attemptId,
                  contentId: sample.contentId,
                  originalText: sample.input.answer,
                })
              : null;
          return (
            <article
              className={s.card}
              id={example.id}
              key={example.id}
              data-reading-review-sample={example.questionId}
            >
              <p className={s.eyebrow}>
                {index + 1} / 3 · {example.label}
              </p>
              {question && sample && result ? (
                <>
                  <h2>{question.title}</h2>
                  <p>{question.facts}</p>
                  <p>
                    <strong>{question.prompt}</strong>
                  </p>
                  <h3>模拟原答</h3>
                  <blockquote className={s.answer}>
                    {sample.input.answer}
                  </blockquote>
                  <div className={s.result}>
                    <DirectAnswerFeedback
                      studentReading
                      result={result}
                      answer={sample.input.answer}
                      status="ready"
                      reference={question.reference}
                    />
                  </div>
                  <p>
                    <a
                      href={`/lab/practice?question=${encodeURIComponent(question.id)}`}
                    >
                      自己答这道题 →
                    </a>
                  </p>
                </>
              ) : (
                <p>这份题目与已保存讲解尚未对齐，暂不展示。</p>
              )}
            </article>
          );
        }),
      )}
      <a href="?plain=1">回看犬只题的短讲解</a>
    </main>
  );
}

async function PlainFeedback({ previous = false }: { previous?: boolean }) {
  const directory = previous ? plainRoot : `${plainRoot}/concise`;
  const plan = (await read("plan.json", directory)) as {
    prepared: Plan["samples"];
  } | null;
  return (
    <main className={s.page}>
      <header className={s.header}>
        <a href="/lab/practice?question=cl05-review-two-losses">
          自己答这道题 →
        </a>
        <p className={s.eyebrow}>律真 · 新版讲解试读</p>
        <h1>先把本案答案讲清楚</h1>
        <p>
          {previous
            ? "这是此前四份实测，正文仍偏长，保留供对照。"
            : "先看一份理由没写全的回答，再看另一章的完整回答。"}
          下面展示实际DeepSeek讲解；参考答案由我们预先编写。打开或刷新页面不会调用模型。
        </p>
        <nav className={s.nav} aria-label="选择样例">
          {plan?.prepared.map((sample) => (
            <a key={sample.id} href={`#${sample.id}`}>
              {sample.label}
            </a>
          ))}
        </nav>
      </header>
      {!plan && <p>试读尚未准备好。</p>}
      {plan &&
        (await Promise.all(
          plan.prepared.map(async (sample) => {
            const q = exerciseFor(sample.input.exerciseId)!;
            const completion = (await read(
              `${sample.id}.completion.json`,
              directory,
            )) as Completion | null;
            const payload = await read(`${sample.id}.reply.json`, directory);
            if (!completion?.accepted || !payload?.reply?.result)
              return (
                <article className={s.card} id={sample.id} key={sample.id}>
                  <h2>{sample.label}</h2>
                  <p>这份讲解尚未取得，不自动补发请求。</p>
                </article>
              );
            const result = validateUnitFeedbackResult(payload.reply.result, {
              questionId: sample.input.exerciseId,
              questionRevision: sample.input.exerciseRevision,
              answerId: sample.input.attemptId,
              contentId: sample.contentId,
              originalText: sample.input.answer,
            });
            return (
              <article className={s.card} id={sample.id} key={sample.id}>
                <p className={s.eyebrow}>人工构造答卷 · {q.title}</p>
                <h2>{sample.label}</h2>
                <details className={s.details}>
                  <summary>查看题目</summary>
                  <p>{q.facts}</p>
                  <p>
                    <strong>{q.prompt}</strong>
                  </p>
                </details>
                <h3>模拟原答</h3>
                <blockquote className={s.answer}>
                  {sample.input.answer}
                </blockquote>
                <p className={s.metrics}>
                  {(completion.elapsedMs / 1000).toFixed(2)}秒 ·
                  按回执费率估算约{completion.costCNY.toFixed(5)}元
                </p>
                <div className={s.result}>
                  <DirectAnswerFeedback
                    studentReading
                    result={result}
                    answer={sample.input.answer}
                    status="ready"
                    reference={q.reference}
                  />
                </div>
              </article>
            );
          }),
        ))}
      <a href="/lab/scoring/feedback-reading">回看防卫题的讲解</a>
      {" · "}
      <a href={previous ? "?plain=1" : "?plain=1&previous=1"}>
        {previous ? "看本轮短讲解" : "看此前四份实测"}
      </a>
    </main>
  );
}

async function LearningRecapPreview() {
  const saved = await read("preview.json", "artifacts/learning-recap-20261018");
  if (
    saved?.version !== "topic-learning-recap-preview-v1" ||
    saved?.source !== "hand_authored_offline_records" ||
    !Array.isArray(saved.examples)
  )
    return (
      <main className={s.page}>
        <h1>学习回顾示例尚未准备好。</h1>
      </main>
    );
  return (
    <main className={s.page}>
      <header className={s.header}>
        <a href="/lab/study?topic=necessity">回到学习页 →</a>
        <p className={s.eyebrow}>律真 · 学习回顾试读</p>
        <h1>做完几道题，接着怎么学</h1>
        <p>
          下面用三组虚构记录展示页面效果，判断标签也是人工设置的，不是新的模型实测。
          正式学习页使用你自己的已存作答和讲解；这里不会写入学习记录，也不调用模型。
        </p>
      </header>
      {saved.examples
        .slice(0, 3)
        .map((example: { id: string; label: string; state: unknown }) => {
          const state = progressSchema.safeParse(example.state);
          if (!state.success) return null;
          const summary = projectTopicLearning(state.data, "necessity");
          return (
            <article className={s.card} key={example.id} id={example.id}>
              <h2>{example.label}</h2>
              <TopicLearning summary={summary} />
              {summary?.next && (
                <p>
                  下一步 ·{" "}
                  <a href={`/lab/practice?question=${summary.next.questionId}`}>
                    {summary.next.title}
                  </a>
                  ：{summary.next.reason}
                </p>
              )}
            </article>
          );
        })}
      <a href="/lab/scoring/feedback-reading">回看本题实际AI讲解</a>
    </main>
  );
}

async function AlignedFeedback({ plan }: { plan: AlignmentPlan }) {
  const labels: Record<string, string> = {
    complete: "完整回答",
    "conclusion-only": "只答结论",
    "wrong-rule": "判断和理由错误",
    colloquial: "口语回答",
  };
  const question = exerciseFor(plan.prepared[0].input.exerciseId)!;
  return (
    <main className={s.page}>
      <header className={s.header}>
        <a href={`/lab/practice?question=${question.id}`}>自己答这道题 →</a>
        {" · "}
        <a href="?learning=1">看看跨题学习回顾 →</a>
        {" · "}
        <a href="?plain=1">看看新版犬只题讲解 →</a>
        <p className={s.eyebrow}>律真 · 讲解试读</p>
        <h1>把这道题讲明白</h1>
        <p>
          题目、参考答案和三项答题要求已经编好。下面是4份虚构答卷，由DeepSeek实际讲解；查看不新增调用。
        </p>
        <nav className={s.nav} aria-label="选择样例">
          {plan.prepared.map((sample) => (
            <a key={sample.id} href={`#${sample.id}`}>
              {labels[sample.id]}
            </a>
          ))}
        </nav>
      </header>
      <section className={s.card} aria-label="本题题目">
        <h2>{question.title}</h2>
        <p>{question.facts}</p>
        <p>
          <strong>{question.prompt}</strong>
        </p>
      </section>
      {await Promise.all(
        plan.prepared.map(async (sample) => {
          const completion = (await read(
            `${sample.id}.completion.json`,
            alignmentRoot,
          )) as Completion | null;
          const saved = await read(`${sample.id}.reply.json`, alignmentRoot);
          if (!completion?.accepted || !saved?.reply?.result)
            return (
              <article className={s.card} key={sample.id}>
                <h2>{labels[sample.id]}</h2>
                <p>这份讲解尚未准备好。</p>
              </article>
            );
          const result = validateUnitFeedbackResult(saved.reply.result, {
            questionId: sample.input.exerciseId,
            questionRevision: sample.input.exerciseRevision,
            answerId: sample.input.attemptId,
            contentId: sample.contentId,
            originalText: sample.input.answer,
          });
          return (
            <article className={s.card} key={sample.id} id={sample.id}>
              <p className={s.eyebrow}>人工构造答卷 · {labels[sample.id]}</p>
              <h2>{labels[sample.id]}</h2>
              <blockquote className={s.answer}>
                {sample.input.answer}
              </blockquote>
              <p className={s.metrics}>
                {(completion.elapsedMs / 1000).toFixed(2)}秒 · 按回执费率估算约
                {completion.costCNY.toFixed(5)}元
              </p>
              <div className={s.result}>
                <DirectAnswerFeedback
                  studentReading
                  result={result}
                  answer={sample.input.answer}
                  status="ready"
                  reference={question.reference}
                />
              </div>
            </article>
          );
        }),
      )}
      <a href="?previous=1">回看此前的讲解试读</a>
    </main>
  );
}
