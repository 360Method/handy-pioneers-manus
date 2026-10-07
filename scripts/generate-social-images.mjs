#!/usr/bin/env node
/**
 * generate-social-images.mjs - AI images for the evergreen social library
 * (HP-DOC-019) via Gemini 2.5 Flash Image, same style rules as the blog
 * generator: photoreal object/scene shots, no people, no text, no logos.
 *
 * Reads every library item's frontmatter (`image:` + `imagePrompt:`), and for
 * each item whose image URL points at /images/social/, writes a 1200x900 JPEG
 * (4:3, the GBP-preferred shape; FB/IG accept it) to
 * client/public/images/social/<filename from the image URL>.
 *
 * Runs LOCALLY, never in the Railway build. Railway only serves the committed files.
 *
 * Usage:
 *   node scripts/generate-social-images.mjs --library="<path to social/library>"
 *   node scripts/generate-social-images.mjs --library=... --only=SOC-014,SOC-015
 *   node scripts/generate-social-images.mjs --library=... --force --only=SOC-020
 *
 * Key: GEMINI_API_KEY from the environment, ../.env, or ./.env.
 * Images are illustrative. Never caption one as a real HP job.
 */
import { readFileSync, readdirSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(ROOT, "client/public/images/social");
const MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image";

const BASE_STYLE =
  "Photorealistic editorial photograph, natural light, Pacific Northwest residential setting, " +
  "shallow depth of field, crisp focus on the subject, realistic materials and weathering, " +
  "4:3 landscape composition. No people, no text, no words, no signage, no logos, no watermarks.";

function loadKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  for (const p of [resolve(ROOT, "..", ".env"), resolve(ROOT, ".env")]) {
    if (!existsSync(p)) continue;
    const m = readFileSync(p, "utf8").match(/^\s*GEMINI_API_KEY\s*=\s*(.+)\s*$/m);
    if (m) return m[1].trim().replace(/^["']|["']$/g, "");
  }
  return null;
}

const KEY = loadKey();
if (!KEY) {
  console.error("[social] No GEMINI_API_KEY found (env, ../.env, or ./.env).");
  process.exit(1);
}

const args = process.argv.slice(2);
const arg = (name) => args.find((a) => a.startsWith(`--${name}=`))?.split("=").slice(1).join("=");
const force = args.includes("--force");
const only = arg("only")?.split(",").map((s) => s.trim());
const LIBRARY = arg("library");
if (!LIBRARY || !existsSync(LIBRARY)) {
  console.error("[social] Pass --library=<path to the social library folder>.");
  process.exit(1);
}

const sharp = (await import("sharp")).default;

function frontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const out = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) out[kv[1]] = kv[2].trim().replace(/^"|"$/g, "");
  }
  return out;
}

const items = readdirSync(LIBRARY)
  .filter((f) => /^\d+-.+\.md$/.test(f))
  .map((f) => frontmatter(readFileSync(resolve(LIBRARY, f), "utf8")))
  .filter((fm) => fm.imagePrompt && fm.image?.includes("/images/social/"))
  .filter((fm) => (only ? only.includes(fm.id) : true));

mkdirSync(OUT_DIR, { recursive: true });
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function generateOne(fm, outPath) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "x-goog-api-key": KEY, "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: `${fm.imagePrompt}. ${BASE_STYLE}` }] }],
      generationConfig: { responseModalities: ["TEXT", "IMAGE"], imageConfig: { aspectRatio: "4:3" } },
    }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 400)}`);
  const json = await res.json();
  const img = (json?.candidates?.[0]?.content?.parts || []).find((x) => x.inlineData?.data);
  if (!img) {
    const block = json?.promptFeedback?.blockReason;
    throw new Error(block ? `blocked: ${block}` : `no image: ${JSON.stringify(json).slice(0, 300)}`);
  }
  await sharp(Buffer.from(img.inlineData.data, "base64"))
    .resize(1200, 900, { fit: "cover" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(outPath);
}

let ok = 0, skip = 0, fail = 0;
for (const fm of items) {
  const outPath = resolve(OUT_DIR, basename(new URL(fm.image).pathname));
  if (existsSync(outPath) && !force) { console.log(`[skip] ${fm.id} (exists)`); skip++; continue; }
  try {
    await generateOne(fm, outPath);
    console.log(`[ok]   ${fm.id} -> ${fm.image}`);
    ok++;
    await sleep(1500);
  } catch (e) {
    console.error(`[fail] ${fm.id}: ${e.message}`);
    fail++;
  }
}
console.log(`\n[social] done. generated=${ok} skipped=${skip} failed=${fail}`);
