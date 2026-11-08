import { z } from "zod";
import { FINDING_V2_PROMPT, findingsSchema } from "./criterion-findings";

// Promoted verbatim from the frozen label-first trial. No semantic rule changes.
export const LABEL_FIRST_POLICY = "one-finding-per-point-v2-label-first-v1";
export const LABEL_FIRST_SCHEMA = z.toJSONSchema(findingsSchema);
export const LABEL_FIRST_PROMPT = FINDING_V2_PROMPT.split("\n")
  .map((line, index) =>
    index === 4
      ? "仅按 Schema 输出 JSON，每项按 id、finding、evidenceIds、reason 顺序输出一次；不给分，不另写总体评语。"
      : line,
  )
  .join("\n");
export const LABEL_FIRST_INSTRUCTIONS =
  LABEL_FIRST_PROMPT +
  "\n输出 JSON Schema：\n" +
  JSON.stringify(LABEL_FIRST_SCHEMA);

// Shape constraints are supplied to the provider, while all local validation stays.
export const STRICT_FINDINGS_FORMAT = {
  type: "json_schema",
  json_schema: {
    name: "criterion_findings",
    strict: true,
    schema: LABEL_FIRST_SCHEMA,
  },
} as const;
