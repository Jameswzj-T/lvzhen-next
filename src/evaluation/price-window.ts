import { z } from "zod";

// Explicit dates make a price snapshot expire; they are not live price discovery.
export const priceWindowSchema = z
  .object({
    validFrom: z.iso.datetime({ offset: true }),
    validUntil: z.iso.datetime({ offset: true }),
    period: z.enum(["deepseek_peak", "deepseek_off_peak", "fixed"]),
  })
  .strict()
  .refine((w) => {
    const span = Date.parse(w.validUntil) - Date.parse(w.validFrom);
    return span > 0 && span <= 24 * 60 * 60 * 1000;
  }, "Price window must be positive and at most 24 hours");
export type PriceWindow = z.infer<typeof priceWindowSchema>;
const hour = 3600000;
const day = 24 * hour;
export function deepseekPeriod(at: number): PriceWindow["period"] {
  const local = new Date(at + 8 * hour);
  const weekday = local.getUTCDay(),
    h = local.getUTCHours();
  return weekday >= 1 &&
    weekday <= 5 &&
    ((h >= 9 && h < 12) || (h >= 14 && h < 18))
    ? "deepseek_peak"
    : "deepseek_off_peak";
}
export function validPriceWindow(window: PriceWindow, model: string): boolean {
  const parsed = priceWindowSchema.safeParse(window);
  if (!parsed.success) return false;
  const w = parsed.data;
  if (!model.startsWith("deepseek-")) return w.period === "fixed";
  const from = Date.parse(w.validFrom),
    until = Date.parse(w.validUntil);
  if (w.period !== deepseekPeriod(from)) return false;
  // Check every boundary, including when start/end fall in the same band on different days.
  const firstLocalDay = Math.floor((from + 8 * hour) / day) * day - 8 * hour;
  for (let midnight = firstLocalDay; midnight < until; midnight += day) {
    for (const h of [0, 9, 12, 14, 18]) {
      const boundary = midnight + h * hour;
      if (
        boundary > from &&
        boundary < until &&
        deepseekPeriod(boundary) !== w.period
      )
        return false;
    }
  }
  return true;
}
export function priceWindowCovers(
  window: PriceWindow,
  model: string,
  from: number,
  until: number,
): boolean {
  return (
    Number.isFinite(from) &&
    Number.isFinite(until) &&
    until >= from &&
    validPriceWindow(window, model) &&
    from >= Date.parse(window.validFrom) &&
    until < Date.parse(window.validUntil)
  );
}
