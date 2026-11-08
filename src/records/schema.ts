import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  integer,
  jsonb,
  timestamp,
  primaryKey,
  foreignKey,
  check,
} from "drizzle-orm/pg-core";
import type { FaultProgress, UnitAttempt } from "../domain/fault-progress";

export const contentVersions = pgTable("content_versions", {
  revision: text().primaryKey(),
  snapshot: jsonb().notNull(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
});

export const questions = pgTable(
  "questions",
  {
    revision: text()
      .notNull()
      .references(() => contentVersions.revision),
    id: text().notNull(),
    snapshot: jsonb().notNull(),
  },
  (t) => [primaryKey({ columns: [t.revision, t.id] })],
);

export const checkpoints = pgTable(
  "learning_checkpoints",
  {
    learnerId: text().notNull(),
    revision: text()
      .notNull()
      .references(() => contentVersions.revision),
    generation: integer().notNull().default(0),
    state: jsonb().$type<FaultProgress>(),
    savedAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    primaryKey({ columns: [t.learnerId, t.revision] }),
    check("generation_nonnegative", sql`${t.generation} >= 0`),
  ],
);

export const attempts = pgTable(
  "answer_attempts",
  {
    learnerId: text().notNull(),
    id: text().notNull(),
    revision: text().notNull(),
    exerciseId: text().notNull(),
    original: jsonb().$type<UnitAttempt>().notNull(),
    receivedAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    primaryKey({ columns: [t.learnerId, t.id] }),
    foreignKey({
      columns: [t.revision, t.exerciseId],
      foreignColumns: [questions.revision, questions.id],
    }),
  ],
);

export const recalls = pgTable(
  "recall_attempts",
  {
    learnerId: text().notNull(),
    id: text().notNull(),
    revision: text()
      .notNull()
      .references(() => contentVersions.revision),
    original: jsonb().$type<FaultProgress["reviews"][number]>().notNull(),
  },
  (t) => [primaryKey({ columns: [t.learnerId, t.id] })],
);

// No client write endpoint. A future validated evaluator appends here;
// it never edits the submitted answer or checkpoint's original records.
export const evaluations = pgTable(
  "answer_evaluations",
  {
    id: text().primaryKey(),
    learnerId: text().notNull(),
    attemptId: text().notNull(),
    modelVersion: text().notNull(),
    promptVersion: text().notNull(),
    rubricVersion: text().notNull(),
    result: jsonb().notNull(),
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    foreignKey({
      columns: [t.learnerId, t.attemptId],
      foreignColumns: [attempts.learnerId, attempts.id],
    }),
  ],
);

export const importedRecords = pgTable(
  "imported_learning_records",
  {
    learnerId: text().notNull(),
    sourceHash: text().notNull(),
    source: jsonb().$type<FaultProgress>().notNull(),
    answerCount: integer().notNull(),
    recallCount: integer().notNull(),
    importedAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [primaryKey({ columns: [t.learnerId, t.sourceHash] })],
);
