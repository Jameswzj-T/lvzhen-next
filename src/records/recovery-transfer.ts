import {
  faultStorageKey,
  progressSchema,
  type FaultProgress,
} from "../domain/fault-progress";
import { planImport } from "./import-plan";
import { sameRecord, type SavedCheckpoint } from "./protocol";
import type { RecordTransport } from "./sync";

type Storage = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
};
const accountKey = (owner: string) => `${faultStorageKey}:account:${owner}`;
export async function inspectRecordMerge(
  storage: Storage,
  owner: string,
  transport: RecordTransport,
  state: FaultProgress,
) {
  const key = accountKey(owner),
    raw = storage.getItem(key),
    source = progressSchema.parse(state);
  if (
    raw === null ||
    !sameRecord(progressSchema.parse(JSON.parse(raw)), source)
  )
    throw new Error("local_changed");
  const account = await transport.load();
  if (storage.getItem(key) !== raw) throw new Error("local_changed");
  return {
    owner,
    key,
    raw,
    source,
    account,
    plan: planImport(account.state, source),
  };
}
export type RecordMergePreview = Awaited<ReturnType<typeof inspectRecordMerge>>;

/** The preview binds both versions. A full local copy is retained before the
 * existing transactional account import. A late reply cannot overwrite a newer local draft. */
export async function commitRecordMerge(
  storage: Storage,
  preview: RecordMergePreview,
  send: (
    owner: string,
    generation: number,
    source: FaultProgress,
  ) => Promise<SavedCheckpoint>,
  copyId: string,
) {
  if (
    !/^[a-zA-Z0-9-]{1,100}$/.test(copyId) ||
    preview.key !== accountKey(preview.owner) ||
    storage.getItem(preview.key) !== preview.raw
  )
    throw new Error("local_changed");
  const copyKey = `${preview.key}:recovery:${copyId}`;
  if (storage.getItem(copyKey) !== null) throw new Error("copy_exists");
  storage.setItem(copyKey, preview.raw);
  const saved = await send(
    preview.owner,
    preview.account.generation,
    preview.source,
  );
  if (!sameRecord(saved.state, preview.plan.state))
    throw new Error("unexpected_saved_record");
  if (storage.getItem(preview.key) !== preview.raw)
    return { saved, localUpdated: false, copyKey };
  storage.setItem(preview.key, JSON.stringify(saved.state));
  storage.setItem(`${preview.key}:server-generation`, String(saved.generation));
  return { saved, localUpdated: true, copyKey };
}
