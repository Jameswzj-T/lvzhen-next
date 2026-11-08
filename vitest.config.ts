import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
export default defineConfig({ envDir: false, resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } }, test: { include: ["src/model-access/byok.test.ts","src/model-access/runtime.test.ts","src/domain/learning-profile.test.tsx","src/domain/daily-learning.test.tsx","src/domain/learning-records.test.ts","src/records/local-record-import.test.ts"], maxWorkers: 1 } });
