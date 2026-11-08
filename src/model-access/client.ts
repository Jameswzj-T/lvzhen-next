/** Device-local settings, deliberately outside learning records and account sync. */
export const modelAccessStorageKey = "lvzhen:model-access:v1";
export const modelAccessChange = "lvzhen:model-access:changed";
export type ModelAccess = { version: 1; provider: "deepseek"; apiKey: string };
export function validModelKey(value: unknown): value is string {
  return typeof value === "string" && /^[\x21-\x7e]{10,512}$/.test(value);
}
export function readModelAccess(
  storage?: Pick<Storage, "getItem">,
): ModelAccess | null {
  try {
    const source =
      storage ?? (typeof window !== "undefined" ? window.localStorage : null);
    const raw = source?.getItem(modelAccessStorageKey);
    if (!raw) return null;
    const value = JSON.parse(raw);
    return value.version === 1 &&
      value.provider === "deepseek" &&
      validModelKey(value.apiKey)
      ? { version: 1, provider: "deepseek", apiKey: value.apiKey }
      : null;
  } catch {
    return null;
  }
}
export function saveModelAccess(
  apiKey: string,
  storage: Storage = window.localStorage,
) {
  const key = apiKey.trim();
  if (!validModelKey(key)) throw Error("model_key_invalid");
  storage.setItem(
    modelAccessStorageKey,
    JSON.stringify({ version: 1, provider: "deepseek", apiKey: key }),
  );
  if (readModelAccess(storage)?.apiKey !== key)
    throw Error("model_key_not_saved");
  if (typeof window !== "undefined")
    window.dispatchEvent(new Event(modelAccessChange));
}
export function removeModelAccess(storage: Storage = window.localStorage) {
  storage.removeItem(modelAccessStorageKey);
  if (storage.getItem(modelAccessStorageKey) !== null)
    throw Error("model_key_not_removed");
  if (typeof window !== "undefined")
    window.dispatchEvent(new Event(modelAccessChange));
}
/** Only the two explicit AI transports use these headers. Never attach to learning sync. */
export function modelAccessHeaders(): Record<string, string> {
  const access = readModelAccess();
  return access
    ? { "x-lvzhen-ai-mode": "byok", Authorization: `Bearer ${access.apiKey}` }
    : {};
}
