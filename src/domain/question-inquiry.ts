import { z } from "zod";

export const INQUIRY_VERSION = "question-inquiry-v1";
export const inquiryIdentitySchema = z
  .object({
    questionId: z.string().min(1).max(120),
    questionRevision: z.string().min(1).max(160),
    inquiryId: z.string().min(1).max(120),
    text: z
      .string()
      .min(1)
      .max(4000)
      .refine((s) => !!s.trim()),
  })
  .strict();
export const inquiryRequestSchema = inquiryIdentitySchema
  .extend({
    version: z.literal(INQUIRY_VERSION),
    action: z.enum(["lookup", "explain"]),
    transmissionConsent: z.literal(true).optional(),
  })
  .strict()
  .superRefine((v, ctx) => {
    if (v.action === "explain" && v.transmissionConsent !== true)
      ctx.addIssue({ code: "custom", message: "explicit-inquiry-required" });
  });
export type InquiryIdentity = z.infer<typeof inquiryIdentitySchema>;
export const inquiryModelSchema = z
  .object({
    version: z.literal(INQUIRY_VERSION),
    taskId: z.string().regex(/^[a-f0-9]{64}$/),
    kind: z.enum(["explanation", "insufficient_basis"]),
    explanation: z.string().min(1).max(7000),
    uncertainty: z.string().max(2000),
    basis: z
      .array(
        z
          .object({
            sourceId: z.string().min(1).max(160),
            quote: z.string().min(1).max(2000),
          })
          .strict(),
      )
      .max(8),
  })
  .strict();
export const inquiryViewSchema = inquiryModelSchema
  .extend({
    identity: inquiryIdentitySchema,
    completedAt: z.iso.datetime(),
    responseId: z.string().min(1).max(160),
    sources: z
      .array(
        z
          .object({
            sourceId: z.string(),
            title: z.string(),
            url: z.url(),
            scope: z.string(),
          })
          .strict(),
      )
      .max(8),
  })
  .strict();
export type InquiryView = z.infer<typeof inquiryViewSchema>;
export const inquiryReplySchema = z
  .object({
    status: z.enum([
      "ready",
      "available",
      "pending",
      "paused",
      "failed",
      "unsupported",
    ]),
    message: z.string().max(2000),
    result: inquiryViewSchema.nullable(),
  })
  .strict()
  .refine((v) => (v.status === "ready") === (v.result !== null));
export type InquiryReply = z.infer<typeof inquiryReplySchema>;
