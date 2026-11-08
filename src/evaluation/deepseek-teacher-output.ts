export const DEEPSEEK_TEACHER_TOOL = "submit_teacher_feedback";
export const DEEPSEEK_STRICT_ENDPOINT =
  "https://api.deepseek.com/beta/chat/completions";

// A single output function, never an executable tool. Paid callers separately
// verify the complete request against the trusted current-question dispatcher.
export function usesStrictTeacherOutput(request: unknown): boolean {
  const r = request as Record<string, any>;
  return (
    r?.model === "deepseek-flash" &&
    r.thinking?.type === "disabled" &&
    r.temperature === 0 &&
    r.response_format === undefined &&
    Array.isArray(r.tools) &&
    r.tools.length === 1 &&
    r.tools[0]?.type === "function" &&
    r.tools[0].function?.name === DEEPSEEK_TEACHER_TOOL &&
    r.tools[0].function?.strict === true &&
    r.tools[0].function?.parameters?.type === "object" &&
    r.tools[0].function?.parameters?.additionalProperties === false &&
    r.tool_choice?.type === "function" &&
    r.tool_choice.function?.name === DEEPSEEK_TEACHER_TOOL
  );
}

/** Extract only the one named function's untouched argument string. Never join
 * fragments, add braces, infer fields, fall back to prose, or execute a tool. */
export function strictTeacherArguments(choice: any): {
  text: string;
  toolCallId: string;
} | null {
  const calls = choice?.message?.tool_calls;
  if (
    choice?.finish_reason !== "tool_calls" ||
    !Array.isArray(calls) ||
    calls.length !== 1 ||
    calls[0]?.type !== "function" ||
    calls[0].function?.name !== DEEPSEEK_TEACHER_TOOL ||
    typeof calls[0].id !== "string" ||
    !calls[0].id ||
    typeof calls[0].function?.arguments !== "string" ||
    !calls[0].function.arguments ||
    (choice.message.content !== null &&
      choice.message.content !== undefined &&
      choice.message.content !== "")
  )
    return null;
  return { text: calls[0].function.arguments, toolCallId: calls[0].id };
}
