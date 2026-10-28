#!/usr/bin/env node
/**
 * check-copy.mjs - the copy guard for the 360 Method pages. Runs first in
 * `pnpm build`, so Railway refuses a deploy that carries an em or en dash or
 * a banned word on these entity surfaces (HP-DOC-035 never-say table; the OS
 * rule that no output carries an em or en dash).
 *
 * Dash check: every file listed, comments included. Vocabulary check: the
 * 360 Method files only, with comments stripped first (the rule is about what
 * a visitor can read; a comment may legitimately name the banned word).
 * Capture surfaces such as pageMeta's /services title may say "handyman" on
 * purpose, see brand.ts, so pageMeta is dash-checked only.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(process.cwd());
const DASH_FILES = [
  "client/src/lib/methodSteps.ts",
  "client/src/pages/Method360Step.tsx",
  "client/src/pages/Method360.tsx",
  "client/src/lib/pageMeta.ts",
];
const VOCAB_FILES = [
  "client/src/lib/methodSteps.ts",
  "client/src/pages/Method360Step.tsx",
  "client/src/pages/Method360.tsx",
];
const BANNED = [
  /\bhandym[ae]n\b/i,
  /\bhourly\b/i,
  /\bper hour\b/i,
  /\bfree\b/i,
  /\bcomplimentary\b/i,
  /\bcheap\b/i,
  /\baffordable\b/i,
  /\bbudget\b/i,
  /\bdiscount(s|ed)?\b/i,
  /\bdeal(s)?\b/i,
  /\bone-and-done\b/i,
  /\bsubcontractor(s)?\b/i,
  /\bsubs\b/i,
  // Internal tier codes. Case-sensitive on purpose: GOLD is a colour constant.
  /\b(bronze|silver|gold|Bronze|Silver|Gold)\b/,
  /\bMaximum\b(?! Protection)/,
  /®/,
  /\b(Oregon|Portland)\b/,
  /\$\s?\d/,
];

/** Blank out block and line comments, keeping line numbers intact. */
function stripComments(src) {
  const noBlock = src.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
  return noBlock
    .split(/\r?\n/)
    .map((line) => {
      const i = line.indexOf("//");
      if (i < 0) return line;
      // Leave "://" (URLs) alone.
      if (i > 0 && line[i - 1] === ":") return line;
      return line.slice(0, i);
    })
    .join("\n");
}

let failures = 0;
function report(file, lineNo, line, why) {
  failures += 1;
  console.error(`[check-copy] ${file}:${lineNo}: ${why}\n    ${line.trim().slice(0, 160)}`);
}

for (const rel of DASH_FILES) {
  const lines = readFileSync(resolve(ROOT, rel), "utf8").split(/\r?\n/);
  lines.forEach((line, i) => {
    if (/[\u2014\u2013]/.test(line)) report(rel, i + 1, line, "em or en dash");
  });
}
for (const rel of VOCAB_FILES) {
  const lines = stripComments(readFileSync(resolve(ROOT, rel), "utf8")).split(/\r?\n/);
  lines.forEach((line, i) => {
    for (const rx of BANNED) {
      if (rx.test(line)) report(rel, i + 1, line, `banned: ${rx}`);
    }
  });
}

if (failures) {
  console.error(`[check-copy] ${failures} problem(s). Fix the copy before building.`);
  process.exit(1);
}
console.log(`[check-copy] clean: ${DASH_FILES.length} files dash-free, ${VOCAB_FILES.length} files vocabulary-clean`);
