import { z } from "zod";
export const registeredQuestionRequestSchema = z
  .object({
    version: z.literal("registered-question-submission-v1"),
    action: z.enum(["lookup", "submit"]),
    exerciseId: z.string().min(1).max(120),
    exerciseRevision: z.string().min(1).max(120),
    attemptId: z.string().min(1).max(120),
    answer: z.string().max(8000),
    choice: z.string().max(20),
    transmissionConsent: z.literal(true).optional(),
  })
  .strict()
  .superRefine((request, ctx) => {
    if (request.action === "submit" && request.transmissionConsent !== true)
      ctx.addIssue({ code: "custom", message: "explicit-submit-required" });
  });
