"use client";
import { useEffect, useState } from "react";
import type { CorePracticeSubject } from "@/content/core-practice-sections";
import type { CivilProcedureLibrarySelection } from "./civil-procedure-library";
import {
  readDirectoryViews,
  writeDirectoryViews,
  type DirectoryViews,
} from "./directory-memory";

export function useDirectoryMemory(owner: string | null, ready: boolean) {
  const [memory, setMemory] = useState<{
    owner: string | null;
    views: DirectoryViews;
  }>({ owner, views: {} });
  useEffect(() => {
    if (!ready) return;
    try {
      setMemory({ owner, views: readDirectoryViews(sessionStorage, owner) });
    } catch {
      setMemory({ owner, views: {} });
    }
  }, [owner, ready]);
  function select(
    subject: CorePracticeSubject,
    selection: CivilProcedureLibrarySelection,
  ) {
    setMemory((prior) => {
      const next = {
        ...(prior.owner === owner ? prior.views : {}),
        [subject]: selection,
      };
      try {
        writeDirectoryViews(sessionStorage, owner, next);
      } catch {
        /* Browser storage may be disabled. */
      }
      return { owner, views: next };
    });
  }
  return { views: memory.owner === owner ? memory.views : {}, select };
}
