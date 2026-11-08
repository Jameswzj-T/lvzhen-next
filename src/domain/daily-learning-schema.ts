import { z } from "zod";
// Values only: this schema must not import the content registry back into progress initialization.
export const learningPlanSubjectSchema = z.enum([
  "all",
  "criminal-law",
  "civil-law",
  "civil-procedure",
  "criminal-procedure",
  "administrative-law",
  "commercial-law",
  "theory-law",
  "legal-profession",
  "international-law",
  "intellectual-property",
]);
export const learningPreferencesSchema = z
  .object({
    minutes: z.union([z.literal(10), z.literal(20), z.literal(30)]),
    subject: learningPlanSubjectSchema,
  })
  .strict();
export type LearningPreferences = z.infer<typeof learningPreferencesSchema>;
export const dailyLearningPlanSchema = z
  .object({
    version: z.literal(1),
    day: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    createdAt: z.iso.datetime(),
    preferences: learningPreferencesSchema,
    items: z
      .array(
        z
          .object({
            id: z.string().min(1).max(250),
            questionId: z.string().min(1).max(120),
            revision: z.string().min(1).max(160),
            title: z.string().min(1).max(500),
            href: z
              .string()
              .max(1000)
              .refine(
                (value) =>
                  value.startsWith("/lab/") &&
                  !value.includes("\\") &&
                  !/[\r\n]/.test(value),
              ),
            kind: z.enum(["continue", "review", "practice"]),
            reason: z.string().max(800),
            baselineAttemptId: z.string().max(120).nullable(),
            originRunId: z.string().min(1).max(100).optional(),
            skipped: z.boolean(),
          })
          .strict(),
      )
      .max(4),
  })
  .strict()
  .refine((p) => new Set(p.items.map((i) => i.id)).size === p.items.length);
export type DailyLearningPlan = z.infer<typeof dailyLearningPlanSchema>;
