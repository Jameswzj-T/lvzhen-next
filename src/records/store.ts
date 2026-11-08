import { createHash } from "node:crypto";
import { serializeRecord } from "./protocol";
import { planImport } from "./import-plan";
import { isDeepStrictEqual } from "node:util";
import { and, eq } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { contentPacks, faultUnitRevision } from "../content/fault-catalog";
import { progressSchema, type FaultProgress } from "../domain/fault-progress";
import {
  importedRecords,
  attempts,
  checkpoints,
  contentVersions,
  questions,
  recalls,
} from "./schema";

export class RecordConflict extends Error {}
export type Checkpoint = { generation: number; state: FaultProgress | null };

export function recordStore(db: NodePgDatabase) {
  return {
    async load(learnerId: string): Promise<Checkpoint> {
      const [row] = await db
        .select()
        .from(checkpoints)
        .where(
          and(
            eq(checkpoints.learnerId, learnerId),
            eq(checkpoints.revision, faultUnitRevision),
          ),
        );
      return row
        ? {
            generation: row.generation,
            state: row.state === null ? null : progressSchema.parse(row.state),
          }
        : { generation: 0, state: null };
    },

    async imported(learnerId: string, sourceHash?: string) {
      const where = sourceHash
        ? and(
            eq(importedRecords.learnerId, learnerId),
            eq(importedRecords.sourceHash, sourceHash),
          )
        : eq(importedRecords.learnerId, learnerId);
      if (sourceHash) {
        const [row] = await db
          .select({ source: importedRecords.source })
          .from(importedRecords)
          .where(where);
        return row ? { source: progressSchema.parse(row.source) } : null;
      }
      return db
        .select({
          sourceHash: importedRecords.sourceHash,
          importedAt: importedRecords.importedAt,
          answerCount: importedRecords.answerCount,
          recallCount: importedRecords.recallCount,
        })
        .from(importedRecords)
        .where(where);
    },
    async save(
      learnerId: string,
      expectedGeneration: number,
      input: unknown,
      importing = false,
    ): Promise<Checkpoint> {
      // Parsing creates a private snapshot before any await; raw whitespace stays intact.
      const source = progressSchema.parse(input);
      let state = source;
      if (!Number.isSafeInteger(expectedGeneration) || expectedGeneration < 0)
        throw new RecordConflict("invalid_generation");
      return db.transaction(async (tx) => {
        for (const { revision, snapshot } of contentPacks) {
          await tx
            .insert(contentVersions)
            .values({ revision, snapshot })
            .onConflictDoNothing();
          const [published] = await tx
            .select()
            .from(contentVersions)
            .where(eq(contentVersions.revision, revision));
          if (!isDeepStrictEqual(published.snapshot, snapshot))
            throw new RecordConflict("content_revision_changed");
          const questionRows = snapshot.topics.flatMap((topic) =>
            topic.exercises.map((q) => ({
              revision,
              id: q.id,
              snapshot: q,
            })),
          );
          // Knowledge-only versions still retain their published snapshot.
          if (questionRows.length)
            await tx
              .insert(questions)
              .values(questionRows)
              .onConflictDoNothing();
        }
        await tx
          .insert(checkpoints)
          .values({ learnerId, revision: faultUnitRevision })
          .onConflictDoNothing();
        const where = and(
          eq(checkpoints.learnerId, learnerId),
          eq(checkpoints.revision, faultUnitRevision),
        );
        const [prior] = await tx
          .select()
          .from(checkpoints)
          .where(where)
          .for("update");
        if (importing) {
          const sourceHash = createHash("sha256")
            .update(serializeRecord(source))
            .digest("hex");
          const [receipt] = await tx
            .select({ sourceHash: importedRecords.sourceHash })
            .from(importedRecords)
            .where(
              and(
                eq(importedRecords.learnerId, learnerId),
                eq(importedRecords.sourceHash, sourceHash),
              ),
            );
          // A retry returns today's checkpoint, never the older imported state.
          if (receipt)
            return {
              generation: prior.generation,
              state:
                prior.state === null ? null : progressSchema.parse(prior.state),
            };
          if (prior.generation !== expectedGeneration)
            throw new RecordConflict("stale_checkpoint");
          state = planImport(prior.state, source).state;
          await tx.insert(importedRecords).values({
            learnerId,
            sourceHash,
            source,
            answerCount: source.attempts.length,
            recallCount: source.reviews.length,
          });
        }
        // A response may have been lost after commit. Repeating that exact write is safe.
        if (isDeepStrictEqual(prior.state, state))
          return { generation: prior.generation, state };
        if (prior.generation !== expectedGeneration)
          throw new RecordConflict("stale_checkpoint");
        // Corrections live in the checkpoint as separate append-only events.
        for (const original of prior.state?.inquiryExplanations ?? []) {
          const next = state.inquiryExplanations?.find(
            (view) => view.identity.inquiryId === original.identity.inquiryId,
          );
          if (!isDeepStrictEqual(next, original))
            throw new RecordConflict("inquiry_explanation_changed");
        }
        for (const kind of [
          "attempts",
          "reviews",
          "corrections",
          "learningObservations",
          "submittedFeedback",
        ] as const) {
          const current = new Map(
            (state[kind] ?? []).map((entry) => [entry.id, entry]),
          );
          for (const original of prior.state?.[kind] ?? []) {
            if (!isDeepStrictEqual(current.get(original.id), original))
              throw new RecordConflict("original_answer_changed");
          }
        }
        const oldAttempts = new Set(prior.state?.attempts.map((a) => a.id));
        for (const original of prior.state?.assessments?.runs ?? []) {
          const next = state.assessments?.runs.find(
            (r) => r.id === original.id,
          );
          if (
            !next ||
            (original.finishedAt && !isDeepStrictEqual(next, original))
          )
            throw new RecordConflict("assessment_original_changed");
          if (
            next.paperId !== original.paperId ||
            next.revision !== original.revision ||
            next.startedAt !== original.startedAt ||
            next.deadlineAt !== original.deadlineAt
          )
            throw new RecordConflict("assessment_identity_changed");
        }
        const oldRecalls = new Set(prior.state?.reviews.map((a) => a.id));
        const newAttempts = state.attempts.filter(
          (a) => !oldAttempts.has(a.id),
        );
        const newRecalls = state.reviews.filter((a) => !oldRecalls.has(a.id));
        if (newAttempts.length)
          await tx.insert(attempts).values(
            newAttempts.map((original) => ({
              learnerId,
              id: original.id,
              revision: original.revision,
              exerciseId: original.exerciseId,
              original,
            })),
          );
        if (newRecalls.length)
          await tx.insert(recalls).values(
            newRecalls.map((original) => ({
              learnerId,
              id: original.id,
              revision: original.revision,
              original,
            })),
          );
        const generation = prior.generation + 1;
        await tx
          .update(checkpoints)
          .set({ generation, state, savedAt: new Date() })
          .where(where);
        return { generation, state };
      });
    },
  };
}
