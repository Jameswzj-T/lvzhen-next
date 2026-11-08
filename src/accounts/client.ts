import { z } from "zod";
export const accountChangeKey = "lvzhen:account-change:v1";
const identitySchema = z.object({
  user: z
    .object({
      id: z.string().min(1),
      name: z.string(),
      email: z.string().optional(),
      emailVerified: z.boolean().optional(),
    })
    .nullable(),
});
export type Learner = z.infer<typeof identitySchema>["user"];
export async function currentLearner(): Promise<Learner> {
  const response = await fetch("/api/account", {
    cache: "no-store",
    headers: { "X-Lvzhen-Records": "1" },
    signal: AbortSignal.timeout(6000),
  });
  if (!response.ok) throw new Error("account_unavailable");
  return identitySchema.parse(await response.json()).user;
}
export function announceAccountChange() {
  try {
    localStorage.setItem(accountChangeKey, crypto.randomUUID());
  } catch {
    /* HTTP owner checks still prevent cross-account writes. */
  }
}
