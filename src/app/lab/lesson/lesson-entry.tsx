"use client";
import { StudyGate } from "@/accounts/study-gate";
import { GuidedLesson } from "./guided-lesson";

export function LessonEntry({ initialOverview }: { initialOverview: boolean }) {
  return (
    <StudyGate>
      {(user) => (
        <GuidedLesson
          key={user?.id ?? "guest"}
          user={user}
          initialOverview={initialOverview}
        />
      )}
    </StudyGate>
  );
}
