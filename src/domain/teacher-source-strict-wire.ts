import { z } from "zod";
import {
  TEACHER_SOURCE_STRICT_PROTOCOL,
  TEACHER_SOURCE_PRIORITY_PROTOCOL,
  TEACHER_SOURCE_DIALOGUE_PROTOCOL,
  TEACHER_SOURCE_DIALOGUE_JSON_PROTOCOL,
  TEACHER_SOURCE_SINGLE_DECISION_PROTOCOL,
  TEACHER_SOURCE_PLAIN_PROTOCOL,
  isPriorityTeacherProtocol,
  teacherSourceCodeReplySchema,
} from "./teacher-source-feedback-contract";

// DeepSeek strict tools document string/enum/object/array/integer schemas, but
// not nullable fields. This version explicitly represents absent action/review
// text by "". Local validation and the old canonical null representation remain.
const codePoint = teacherSourceCodeReplySchema.shape.points.element;
const strictBase = teacherSourceCodeReplySchema
  .omit({ version: true, points: true })
  .extend({
    version: z.literal(TEACHER_SOURCE_STRICT_PROTOCOL),
    points: z
      .array(
        codePoint
          .omit({ action: true, review: true })
          .extend({
            action: z.string().max(1800),
            review: z
              .object({
                state: z.enum(["clear", "needs_review"]),
                reason: z.string().max(1800),
              })
              .strict(),
          })
          .strict(),
      )
      .min(1)
      .max(8),
  })
  .strict();
const strictEmptyTextCheck = (
  value: {
    points: { review: { state: string; reason: string }; action: string }[];
  },
  ctx: z.RefinementCtx,
) => {
  for (const point of value.points) {
    if (
      (point.review.state === "clear" && point.review.reason !== "") ||
      (point.review.state === "needs_review" && !point.review.reason.trim()) ||
      (point.action !== "" && !point.action.trim())
    )
      ctx.addIssue({
        code: "custom",
        message: "teacher-strict-empty-text-contract",
      });
  }
};
export const teacherSourceStrictReplySchema =
  strictBase.superRefine(strictEmptyTextCheck);
export const teacherSourcePriorityReplySchema = strictBase
  .extend({
    version: z.literal(TEACHER_SOURCE_PRIORITY_PROTOCOL),
  })
  .superRefine(strictEmptyTextCheck);

export const teacherSourceDialogueReplySchema = strictBase
  .extend({ version: z.literal(TEACHER_SOURCE_DIALOGUE_PROTOCOL) })
  .superRefine(strictEmptyTextCheck);

export const teacherSourceDialogueJsonReplySchema = strictBase
  .extend({ version: z.literal(TEACHER_SOURCE_DIALOGUE_JSON_PROTOCOL) })
  .superRefine(strictEmptyTextCheck);

// JSON v2.7 deliberately omits the second, independently generated review
// decision. Uncertain status is the sole request for local review.
function singleDecisionSchema<const V extends string>(version: V) {
  return strictBase
    .extend({
      version: z.literal(version),
      points: z
        .array(strictBase.shape.points.element.omit({ review: true }).strict())
        .min(1)
        .max(8),
    })
    .superRefine((value, ctx) => {
      for (const point of value.points) {
        if (
          (point.action !== "" && !point.action.trim()) ||
          (point.statusCode === 4 && !point.action.trim())
        )
          ctx.addIssue({
            code: "custom",
            message: "teacher-single-decision-action",
          });
      }
    });
}
export const teacherSourceSingleDecisionReplySchema = singleDecisionSchema(
  TEACHER_SOURCE_SINGLE_DECISION_PROTOCOL,
);
export const teacherSourcePlainReplySchema = singleDecisionSchema(
  TEACHER_SOURCE_PLAIN_PROTOCOL,
);

// New wire deliberately does not ask the model to repeat trusted task identity,
// an overall status, or a second explanation of its conclusion. Those fields
// are explicitly projected from this verified request and one model summary.
export const teacherSourceTeachingReplySchema = z
  .object({
    conclusion: strictBase.shape.conclusion
      .omit({ explanation: true })
      .strict(),
    summary: strictBase.shape.overall.shape.reason,
    points: z
      .array(strictBase.shape.points.element.omit({ review: true }).strict())
      .min(1)
      .max(8),
  })
  .strict()
  .superRefine((value, ctx) => {
    for (const point of value.points) {
      if (
        (point.action !== "" && !point.action.trim()) ||
        (point.statusCode === 4 && !point.action.trim())
      )
        ctx.addIssue({ code: "custom", message: "teacher-teaching-action" });
    }
  });

// Point-only wire: the model does not generate a redundant narrative summary.
export const teacherSourcePointReplySchema = z
  .object({
    conclusion: teacherSourceTeachingReplySchema.shape.conclusion,
    points: teacherSourceTeachingReplySchema.shape.points,
  })
  .strict()
  .superRefine((value, ctx) => {
    for (const point of value.points) {
      if (
        (point.action !== "" && !point.action.trim()) ||
        (point.statusCode === 4 && !point.action.trim())
      )
        ctx.addIssue({ code: "custom", message: "teacher-point-action" });
    }
  });

/** Provider supports a narrower schema than local Zod. Only generation-side
 * bounds are omitted; the full local schema/evidence checker still applies. */
export function teacherStrictToolParameters(
  taskId: string,
  ids: string[],
  sourceIds: string[],
  protocol:
    | typeof TEACHER_SOURCE_STRICT_PROTOCOL
    | typeof TEACHER_SOURCE_PRIORITY_PROTOCOL
    | typeof TEACHER_SOURCE_DIALOGUE_PROTOCOL = TEACHER_SOURCE_STRICT_PROTOCOL,
) {
  function convert(value: unknown): any {
    if (Array.isArray(value)) return value.map(convert);
    if (!value || typeof value !== "object") return value;
    const result: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) {
      if (
        ["$schema", "minLength", "maxLength", "minItems", "maxItems"].includes(
          key,
        )
      )
        continue;
      if (key === "const") result.enum = [item];
      else result[key] = convert(item);
    }
    return result;
  }
  const schema = convert(
    z.toJSONSchema(
      protocol === TEACHER_SOURCE_DIALOGUE_PROTOCOL
        ? teacherSourceDialogueReplySchema
        : protocol === TEACHER_SOURCE_PRIORITY_PROTOCOL
          ? teacherSourcePriorityReplySchema
          : teacherSourceStrictReplySchema,
    ),
  );
  if (isPriorityTeacherProtocol(protocol))
    schema.properties.points.items.properties.statusCode.description =
      "0=完整正确；1=有正确片段但不完整、没有明确说反必答规则；2=未表达；3=明确说反必答规则或理由，优先于同项部分正确；4=判断不足。反对被引用的错误观点不算赞同。";
  if (protocol === TEACHER_SOURCE_DIALOGUE_PROTOCOL)
    schema.properties.points.items.properties.evidence.items.properties.role.description =
      "按完整语境区分学生采纳的判断与纯疑问。opposes只标本人当前采纳的反向判断；尚未采纳结论的真诚追问可略去或列context，不能因提问本身要求纠错。反问若实际已表达断言仍按立场核对，不仅凭问号分类。";
  schema.properties.taskId = { type: "string", enum: [taskId] };
  schema.properties.points.items.properties.id = { type: "string", enum: ids };
  schema.properties.points.items.properties.basis.properties.sourceId = {
    type: "string",
    enum: sourceIds,
  };
  return schema as Record<string, unknown>;
}
