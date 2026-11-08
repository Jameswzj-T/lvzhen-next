import type { ComponentTrialResponse } from "./component-trial";
export const WITHDRAWAL_KEYS = [
  "original:2-3-A",
  "original:2-3-B",
  "original:conditions",
  "rewrite:2-3-A",
  "rewrite:2-3-B",
  "rewrite:conditions",
] as const;
export type WithdrawalKey = (typeof WITHDRAWAL_KEYS)[number];
export type Withdrawal = { resultKey: string; keys: WithdrawalKey[] };
export function readWithdrawal(
  raw: string | null,
  resultKey: string,
): Withdrawal | null {
  if (raw === null) return { resultKey, keys: [] };
  try {
    const x = JSON.parse(raw);
    if (
      x.resultKey !== resultKey ||
      !Array.isArray(x.keys) ||
      !x.keys.every((k: unknown) =>
        WITHDRAWAL_KEYS.includes(k as WithdrawalKey),
      )
    )
      return null;
    return { resultKey, keys: [...new Set<WithdrawalKey>(x.keys)] };
  } catch {
    return null;
  }
}
// Returns no adopted content at all for a withdrawn item. Raw history lives separately.
export function componentPresentation(
  response: Pick<ComponentTrialResponse, "original" | "rewrite">,
  resultKey: string,
  decision: Withdrawal | null,
) {
  if (!decision || decision.resultKey !== resultKey) return null;
  return (["original", "rewrite"] as const).map((side) => ({
    side,
    needs: response[side].needs.map((n) => {
      const key = `${side}:${n.id}` as WithdrawalKey;
      return { key, id: n.id, content: decision.keys.includes(key) ? null : n };
    }),
    conditions: decision.keys.includes(`${side}:conditions`)
      ? null
      : response[side].conditionalExpressions,
  }));
}
