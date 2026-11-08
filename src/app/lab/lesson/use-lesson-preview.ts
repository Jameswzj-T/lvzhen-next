"use client";
import { useEffect, useRef, useState } from "react";
import {
  previewKey,
  lessonSessionSchema as previewSchema,
  initialLesson as initial,
  type LessonPreview,
} from "@/domain/lesson-session";
import { LessonRecords } from "@/records/lesson-records";
import { httpRecords, type SyncStatus } from "@/records/sync";
export {
  previewKey,
  type LessonPreview,
  type LessonScreen,
} from "@/domain/lesson-session";

// Guest preview remains isolated; signed-in learning uses the existing account checkpoint.
export function useLessonPreview(learnerId: string | null = null) {
  const [session, setSession] = useState<LessonPreview>(initial);
  const [ready, setReady] = useState(false);
  const [storageIssue, setStorageIssue] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("loading");
  const records = useRef<LessonRecords | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ref = useRef(session);
  const raw = useRef<string | null>(null);
  const writable = useRef(true);
  useEffect(() => {
    if (learnerId) {
      const account = new LessonRecords(
        learnerId,
        {
          getItem: (key) => localStorage.getItem(key),
          setItem: (key, value) => localStorage.setItem(key, value),
        },
        httpRecords(learnerId),
        () => {
          ref.current = account.session;
          setSession(account.session);
          setReady(account.ready);
          setStorageIssue(account.storageIssue);
          setSyncStatus(account.status);
        },
      );
      records.current = account;
      void account.open();
      function changed(e: StorageEvent) {
        if (e.key === account.key || e.key === null) account.changedElsewhere();
      }
      const leaving = () => {
        void account.flush();
      };
      window.addEventListener("storage", changed);
      window.addEventListener("pagehide", leaving);
      return () => {
        // The browser checkpoint is already durable if the request is interrupted.
        void account.flush();
        account.close();
        if (timer.current) clearTimeout(timer.current);
        window.removeEventListener("storage", changed);
        window.removeEventListener("pagehide", leaving);
      };
    }
    try {
      raw.current = localStorage.getItem(previewKey);
      if (raw.current) {
        const parsed = previewSchema.safeParse(JSON.parse(raw.current));
        if (!parsed.success) throw new Error("unreadable_preview");
        ref.current = parsed.data;
        setSession(parsed.data);
      }
    } catch {
      writable.current = false;
      setStorageIssue(true);
    }
    setReady(true);
    function changed(e: StorageEvent) {
      if (e.key === previewKey || e.key === null) {
        writable.current = false;
        setStorageIssue(true);
      }
    }
    window.addEventListener("storage", changed);
    return () => window.removeEventListener("storage", changed);
  }, [learnerId]);

  function update(fn: (prior: LessonPreview) => LessonPreview) {
    if (!ready) return;
    if (learnerId && records.current) {
      records.current.update(fn);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => void records.current?.flush(), 400);
      return;
    }
    const next = fn(ref.current);
    if (!previewSchema.safeParse(next).success) return;
    ref.current = next;
    setSession(next);
    if (writable.current) {
      try {
        if (localStorage.getItem(previewKey) !== raw.current)
          throw new Error("preview_changed_elsewhere");
        const nextRaw = JSON.stringify(next);
        localStorage.setItem(previewKey, nextRaw);
        raw.current = nextRaw;
      } catch {
        writable.current = false;
        setStorageIssue(true);
      }
    }
  }
  return {
    session,
    update,
    ready,
    storageIssue,
    syncStatus,
    retrySync: () => void records.current?.flush(true),
  };
}
