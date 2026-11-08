import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const root = fileURLToPath(new URL("..", import.meta.url));
const supplied = process.argv[2];
if (!supplied)
  throw Error("Usage: node scripts/export-public.mjs <new-empty-directory>");
const destination = path.resolve(supplied);
if (fs.existsSync(destination))
  throw Error("Destination already exists; no files were changed.");
if (root === destination || root.startsWith(destination + path.sep))
  throw Error("Cannot export over the working repository.");
const files = new Map(),
  excluded = [];
const curated = {
  "src/evaluation/unit-feedback-examples.json": {
    version: "unit-feedback-v1",
    scope: "No private replay responses in the public export.",
    records: [],
  },
  "src/domain/direct-feedback-review-notes.json": {
    scope: "Private historical review notes are not distributed.",
    notes: [],
  },
};
const publicTests = new Set([
  "src/model-access/byok.test.ts",
  "src/model-access/runtime.test.ts",
  "src/domain/learning-profile.test.tsx",
  "src/domain/daily-learning.test.tsx",
  "src/domain/learning-records.test.ts",
  "src/records/local-record-import.test.ts",
]);
// Authored, read-only engineering demonstrations; they contain no retained learner data.
const publicDemos = new Set([
  "src/app/lab/feedback/fixtures.ts",
  "src/evaluation/graph/demo-fixtures.ts",
]);
function add(file, bytes = fs.readFileSync(path.join(root, file))) {
  files.set(file, bytes);
}
function walk(directory) {
  for (const entry of fs.readdirSync(path.join(root, directory), {
    withFileTypes: true,
  })) {
    const file = path.posix.join(directory, entry.name);
    if (entry.isSymbolicLink())
      throw Error(`Source symlink must be reviewed: ${file}`);
    if (entry.isDirectory()) {
      walk(file);
      continue;
    }
    if (!entry.isFile()) continue;
    if (
      (/\.(?:test|spec)\.[cm]?[jt]sx?$/.test(file) && !publicTests.has(file)) ||
      (/fixture/i.test(entry.name) && !publicDemos.has(file)) ||
      entry.name === "samples.json" ||
      /\.(?:review|report)\.md$/.test(file)
    ) {
      excluded.push(file);
      continue;
    }
    if (file === "src/evaluation/shared-model-budget.ts") {
      const source = fs.readFileSync(path.join(root, file), "utf8");
      add(
        file,
        Buffer.from(
          source.replace(
            /const common =\s*"[^"]+";/,
            'const common = "private-budget-not-in-public-export/";',
          ),
        ),
      );
    } else
      add(
        file,
        file in curated
          ? Buffer.from(JSON.stringify(curated[file], null, 2) + "\n")
          : undefined,
      );
  }
}
walk("src");
for (const file of [
  "package.json",
  "pnpm-lock.yaml",
  "pnpm-workspace.yaml",
  "next.config.ts",
  "tsconfig.json",
  "next-env.d.ts",
  ".gitignore",
  ".dockerignore",
  "LICENSE",
  "NOTICE.md",
  "scripts/export-public.mjs",
  "evals/scoring-loop-2026-09-22/transfer.ts",
])
  add(file);
add(
  "next-env.d.ts",
  Buffer.from(
    '/// <reference types="next" />\n/// <reference types="next/image-types/global" />\n// Next generates route types during dev/build.\n',
  ),
);
walk("deploy/public");
if (fs.existsSync(path.join(root, "public"))) walk("public");
const packageJson = JSON.parse(files.get("package.json").toString());
for (const command of Object.keys(packageJson.scripts))
  if (command.startsWith("records:")) delete packageJson.scripts[command];
packageJson.scripts["export:public"] = "node scripts/export-public.mjs";
add("package.json", Buffer.from(JSON.stringify(packageJson, null, 2) + "\n"));
const publicReadme =
  fs
    .readFileSync(path.join(root, "README.md"), "utf8")
    .split("<!-- LOCAL-HISTORY -->")[0]
    .trim() + "\n";
add("README.md", Buffer.from(publicReadme));
add(
  "vitest.config.ts",
  Buffer.from(
    `import { defineConfig } from "vitest/config";\nimport { fileURLToPath } from "node:url";\nexport default defineConfig({ envDir: false, resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } }, test: { include: ${JSON.stringify([...publicTests])}, maxWorkers: 1 } });\n`,
  ),
);
const hashes = {};
for (const [file, bytes] of files) {
  if (
    /^(?:artifacts|checks|docs|team|\.git|\.local-records|node_modules)\//.test(
      file,
    ) ||
    /(^|\/)\.env|model-keys\.local|\/samples\.json$/i.test(file) ||
    (/fixture/i.test(file) && !publicDemos.has(file))
  )
    throw Error(`Private path rejected: ${file}`);
  const text = bytes.toString();
  if (
    /(?:sk-[a-zA-Z0-9]{24,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----)/.test(
      text,
    )
  )
    throw Error(`Credential-like literal must be reviewed: ${file}`);
  if (
    /\/(?:Users|home)\/[^/\s]+\/(?:Developer|Documents|Downloads|\.codex)\//.test(
      text,
    )
  )
    throw Error(`Personal absolute path must be reviewed: ${file}`);
  hashes[file] = createHash("sha256").update(bytes).digest("hex");
}
fs.mkdirSync(destination, { recursive: true });
for (const [file, bytes] of files) {
  const output = path.join(destination, file);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, bytes, { flag: "wx" });
}
const manifest = {
  version: "lvzhen-public-source-v1",
  generatedAt: new Date().toISOString(),
  license: "MIT",
  mode: "public",
  sourceOnlyNoGitHistory: true,
  files: hashes,
  excluded,
  curated: Object.keys(curated),
  privateKeyRead: false,
  deployed: false,
  rightsNote:
    "Own code/content only; third-party rights and attribution are described in NOTICE.md. This export is not a full-bank copyright audit.",
};
fs.writeFileSync(
  path.join(destination, "PUBLIC_MANIFEST.json"),
  JSON.stringify(manifest, null, 2) + "\n",
  { flag: "wx" },
);
console.log(
  JSON.stringify({
    destination,
    files: files.size,
    excluded: excluded.length,
    curated: Object.keys(curated).length,
    privateKeyRead: false,
  }),
);
