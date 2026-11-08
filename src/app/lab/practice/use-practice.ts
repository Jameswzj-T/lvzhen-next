"use client";
import { useEffect, useRef, useState } from "react";
import { freshProgress, type FaultProgress } from "@/domain/fault-progress";
import { PracticeRecords } from "@/records/practice-records";
import { httpRecords, type SyncStatus } from "@/records/sync";
import { PracticeNavigation } from "./practice-navigation";

export function usePractice(learnerId: string | null, resumeQuestion = true) {
  const navigation = useRef(new PracticeNavigation());
  const [view, setView] = useState(() => ({
    state: freshProgress(),
    owner: null as PracticeRecords | null,
    token: null as object | null,
  }));
  const state = view.state;
  const [ready, setReady] = useState(false);
  const [storageIssue, setStorageIssue] = useState(false);
  const [restorationFailed, setRestorationFailed] = useState(false);
  const scope = `${learnerId ?? "guest"}:${resumeQuestion}`;
  const [restoredScope, setRestoredScope] = useState<string | null>(null);
  const [status, setStatus] = useState<SyncStatus>("loading");
  const records = useRef<PracticeRecords | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const record = new PracticeRecords(
      learnerId,
      {
        getItem: (key) => localStorage.getItem(key),
        setItem: (key, value) => localStorage.setItem(key, value),
      },
      learnerId ? httpRecords(learnerId) : null,
      () => {
        setRestoredScope(scope);
        setView({
          state: record.state,
          owner: record,
          token: navigation.current.observe(record, record.state),
        });
        setReady(record.ready);
        setStorageIssue(record.storageIssue);
        setRestorationFailed(record.restorationFailed);
        setStatus(record.status);
      },
      resumeQuestion,
    );
    records.current = record;
    void record.open();
    const changed = (e: StorageEvent) => {
      if (e.key === record.key || e.key === null) record.changedElsewhere();
    };
    const leaving = () => {
      void record.flush();
    };
    window.addEventListener("storage", changed);
    window.addEventListener("pagehide", leaving);
    return () => {
      if (timer.current) clearTimeout(timer.current);
      void record.flush();
      record.close();
      if (records.current === record) records.current = null;
      window.removeEventListener("storage", changed);
      window.removeEventListener("pagehide", leaving);
    };
  }, [learnerId, resumeQuestion, scope]);
  function update(fn: (p: FaultProgress) => FaultProgress) {
    const record = records.current;
    if (!record?.canWrite) return false;
    record.update(fn);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      void records.current?.flush();
    }, 400);
    return record.canWrite;
  }
  function navigate(fn?: (p: FaultProgress) => FaultProgress) {
    const record = records.current;
    if (
      !record?.ready ||
      view.owner !== record ||
      (fn && !record.canWrite) ||
      !navigation.current.take(record, view.token)
    )
      return false;
    // Closing a panel or returning to the picker changes only the view. It
    // invalidates old choices without writing a checkpoint or trapping the user
    // in an overlay when storage is unavailable.
    if (!fn) {
      setView({
        state: record.state,
        owner: record,
        token: navigation.current.observe(record, record.state),
      });
      return true;
    }
    const saved = record.navigate(fn);
    if (saved) {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        void record.flush();
      }, 400);
    }
    return saved;
  }
  return {
    state,
    ready: ready && restoredScope === scope,
    restorationFailed: restoredScope === scope && restorationFailed,
    storageIssue,
    status,
    update,
    navigate,
    retrySync: () => records.current?.flush(true),
    // Capture the owner before an asynchronous review. Account changes must
    // never redirect a late receipt to whichever record is current afterward.
    capturePersistence: () => {
      const record = records.current;
      if (!record?.canWrite) return null;
      return {
        owner: record,
        storage: learnerId ? ("account" as const) : ("local" as const),
        confirmSaved: (matches: (state: FaultProgress) => boolean) =>
          record.confirmSaved(matches),
        retrySave: () => record.flush(true),
        update: (fn: (state: FaultProgress) => FaultProgress) => {
          if (!record.canWrite) return false;
          record.update(fn);
          return record.canWrite;
        },
      };
    },
  };
}
