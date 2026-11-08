// Carry only navigation selectors, never arbitrary URL text or credentials.
const paths = new Set([
  "/lab/study",
  "/lab/practice",
  "/lab/assessment",
  "/lab/ask",
  "/records",
  "/records/import",
  "/lab/lesson",
  "/units/fault",
]);
const selectors = new Set([
  "subject",
  "topic",
  "question",
  "run",
  "paper",
  "view",
  "chapter",
  "focus",
  "review",
  "fromRun",
  "answer",
]);
export function learningReturnHref(input?: string | null): string {
  if (
    !input ||
    input.length > 2400 ||
    !input.startsWith("/") ||
    input.startsWith("//") ||
    /[\\\u0000-\u0020]/.test(input)
  )
    return "/lab/study";
  const url = new URL(input, "https://lvzhen.invalid");
  if (url.origin !== "https://lvzhen.invalid" || !paths.has(url.pathname))
    return "/lab/study";
  const query = new URLSearchParams();
  for (const [key, value] of url.searchParams) {
    if (
      selectors.has(key) &&
      /^[a-zA-Z0-9_-]{1,160}$/.test(value) &&
      !query.has(key)
    )
      query.set(key, value);
  }
  const hash = /^#[a-zA-Z][a-zA-Z0-9_-]{0,80}$/.test(url.hash) ? url.hash : "";
  return `${url.pathname}${query.size ? `?${query}` : ""}${hash}`;
}
export function modelSettingsHref(source: string): string {
  return `/settings/model?returnTo=${encodeURIComponent(learningReturnHref(source))}`;
}
export function learningReturnLabel(href: string): string {
  const path = href.split(/[?#]/)[0];
  return path === "/lab/assessment"
    ? "返回训练"
    : path === "/lab/practice" || path === "/units/fault"
      ? "返回做题"
      : path === "/lab/ask"
        ? "返回答疑"
        : path.startsWith("/records")
          ? "返回我的学习"
          : "返回学习";
}
