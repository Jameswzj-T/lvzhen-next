export type EvidencePart = { text: string; cited: boolean };

/** Display-only. Never infer a score or silently join separate quotations.
 * Repeated text cannot be located uniquely from legacy quote strings, so leave
 * it unhighlighted rather than attribute it to an arbitrary speaker. */
export function evidenceContext(answer: string, evidence: string[]) {
  const ranges: { start: number; end: number }[] = [];
  let ambiguous = false;
  for (const quote of new Set(evidence)) {
    if (!quote) continue;
    const start = answer.indexOf(quote);
    if (start < 0) continue;
    if (answer.indexOf(quote, start + 1) >= 0) {
      ambiguous = true;
      continue;
    }
    ranges.push({ start, end: start + quote.length });
  }
  ranges.sort((a, b) => a.start - b.start);
  const merged: typeof ranges = [];
  for (const range of ranges) {
    const last = merged.at(-1);
    if (last && range.start <= last.end)
      last.end = Math.max(last.end, range.end);
    else merged.push({ ...range });
  }
  const parts: EvidencePart[] = [];
  let cursor = 0;
  for (const range of merged) {
    if (range.start > cursor)
      parts.push({ text: answer.slice(cursor, range.start), cited: false });
    parts.push({ text: answer.slice(range.start, range.end), cited: true });
    cursor = range.end;
  }
  if (cursor < answer.length)
    parts.push({ text: answer.slice(cursor), cited: false });
  return { parts, ambiguous };
}
