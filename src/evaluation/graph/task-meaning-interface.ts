import { z } from "zod";
import { STANCE_PROMPT, stancesSchema } from "./structured-stance";

export const TASK_MEANING_MODE = "whole-meaning-v2";
const mention = stancesSchema.shape.propositions.element.shape.mentions.element
  .omit({ polarity: true })
  .extend({ relation: z.enum(["expresses", "opposes"]) });
export const taskMeaningSchema = stancesSchema.extend({
  propositions: z
    .array(
      stancesSchema.shape.propositions.element.extend({
        mentions: z.array(mention).max(6),
      }),
    )
    .max(12),
});
// One replacement interface, not appended case-specific prompt patches. Values
// refer to the complete target meaning, never the presence of a negation word.
const lines = STANCE_PROMPT.split("\n");
lines[1] =
  "relation 针对 text 整条含义：expresses=原答表达该完整含义，opposes=原答明确表达与该含义相反的主张；内容缺少不是反对，用 unexpressed。use：asserted=本人实际主张，conditional=仅假设成立，withdrawn=已撤回，reported=仅转述他人。分别识别事实、关系和结论，不由孤立事实拼出未表达的关系。";
lines[2] =
  "按 scopePolicy 处理本问；每条跨问主张及撤回记录都须独立填写 linkEvidenceIds，引用连接它的原答语境，不能只为同组第一条填链接。引用须覆盖支持整条含义的原文及必要总括、指代语境；其他问不自动改本问结论。保留同一含义的相反主张。";
export const TASK_MEANING_PROMPT = lines.join("\n");
export const TASK_MEANING_INSTRUCTIONS =
  TASK_MEANING_PROMPT +
  "\n输出 JSON Schema：\n" +
  JSON.stringify(z.toJSONSchema(taskMeaningSchema));

// Mechanical vocabulary conversion only. Invalid/mixed fields are left invalid
// for the existing item validator, not repaired or inferred from answer text.
export function meaningToStance(raw: unknown): unknown {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return raw;
  const value = raw as Record<string, unknown>;
  if (!Array.isArray(value.propositions)) return raw;
  return {
    ...value,
    propositions: value.propositions.map((p) => {
      if (
        !p ||
        typeof p !== "object" ||
        Array.isArray(p) ||
        !Array.isArray(p.mentions)
      )
        return p;
      return {
        ...p,
        mentions: p.mentions.map((m: unknown) => {
          if (!m || typeof m !== "object" || Array.isArray(m)) return m;
          const item = m as Record<string, unknown>;
          // A legacy-only mention would otherwise pass the downstream legacy
          // schema unchanged. Keep an invalid V2 field so it is rejected too.
          if ("polarity" in item)
            return { ...item, relation: item.relation ?? null };
          if (!["expresses", "opposes"].includes(item.relation as string))
            return m;
          const { relation, ...rest } = item;
          return {
            ...rest,
            polarity: relation === "expresses" ? "affirm" : "deny",
          };
        }),
      };
    }),
  };
}
