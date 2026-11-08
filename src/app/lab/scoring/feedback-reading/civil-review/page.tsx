import { readFile } from "node:fs/promises";
import path from "node:path";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { z } from "zod";
import { validateUnitFeedbackResult } from "@/evaluation/unit-feedback-contract";
import { progressSchema } from "@/domain/fault-progress";
import { projectTopicLearning } from "@/domain/topic-learning-summary";
import {
  CivilReview,
  reviewBooks,
  type CivilReviewSample,
} from "./civil-review";

const root = path.join(
  process.cwd(),
  "artifacts/civil-seven-books-review-20261028",
);
const sampleSchema = z.object({
  id: z.string(),
  book: z.enum([
    "general",
    "property",
    "contract",
    "personality",
    "family",
    "inheritance",
    "tort",
  ]),
  kind: z.string(),
  questionId: z.string(),
  revision: z.string(),
  topicId: z.string(),
  title: z.string(),
  facts: z.string(),
  prompt: z.string(),
  answer: z.string(),
  reference: z.string(),
  elapsedMs: z.number().nonnegative(),
  answerId: z.string(),
  contentId: z.string(),
  taskId: z.string(),
  result: z.unknown(),
  choice: z.object({
    questionId: z.string(),
    revision: z.string(),
    prompt: z.string(),
    options: z.array(z.object({ id: z.string(), text: z.string() })),
    reference: z.string(),
  }),
});

/** Fixed local review files, never a query-supplied file path or live-model entry. */
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ book?: string }>;
}) {
  const host = (await headers()).get("host");
  if (
    (process.env.LVZHEN_ENV ?? "local") !== "local" ||
    !["localhost:3107", "127.0.0.1:3107"].includes(host ?? "")
  )
    notFound();
  const query = await searchParams;
  const book = reviewBooks.find(
    ([id]) => id === (query.book ?? "general"),
  )?.[0];
  if (!book) notFound();
  let samples: CivilReviewSample[];
  try {
    const [raw, saved] = await Promise.all([
      readFile(path.join(root, "reading-samples.json"), "utf8"),
      readFile(path.join(root, "checkpoint-after-13.json"), "utf8"),
    ]);
    const data = z.array(sampleSchema).length(14).parse(JSON.parse(raw));
    const state = progressSchema.parse(JSON.parse(saved));
    samples = data
      .filter((sample) => sample.book === book)
      .map((sample) => ({
        ...sample,
        result: validateUnitFeedbackResult(sample.result, {
          questionId: sample.questionId,
          questionRevision: sample.revision,
          originalText: sample.answer,
          answerId: sample.answerId,
          contentId: sample.contentId,
          taskId: sample.taskId,
        }),
        learning: projectTopicLearning(state, sample.topicId),
      }));
    if (samples.length !== 2) throw Error("civil-review-book-size");
  } catch {
    notFound();
  }
  return <CivilReview book={book} samples={samples} />;
}
