#!/usr/bin/env node
/**
 * generate-blog-images.mjs - AI blog hero images via Gemini 2.5 Flash Image
 * ("Nano Banana"). Generates photoreal object/scene shots (no people, no text,
 * no logos) for each blog post, saves optimized .webp into
 * client/public/images/blog/, and prints the slug -> URL map to wire into
 * client/src/lib/blog.ts.
 *
 * This runs LOCALLY (and in the monthly cloud routine), never in the Railway
 * build. Railway only consumes the committed .webp files.
 *
 * Setup: put GEMINI_API_KEY in the OS repo .env (../.env) or this repo's .env,
 * or export it. Get a key at https://aistudio.google.com -> Get API key.
 *
 * Usage:
 *   node scripts/generate-blog-images.mjs                # all missing
 *   node scripts/generate-blog-images.mjs --only=slug1,slug2
 *   node scripts/generate-blog-images.mjs --force        # regenerate all
 *   node scripts/generate-blog-images.mjs --force --only=deck-water-damage-signs-camas
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(ROOT, "client/public/images/blog");
const SITE = "https://handypioneers.com";
const MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image";

const BASE_STYLE =
  "Photorealistic editorial photograph, natural daylight, Pacific Northwest residential setting, " +
  "shallow depth of field, crisp focus on the subject, realistic materials and weathering, " +
  "16:9 landscape composition. No people, no text, no words, no signage, no logos, no watermarks.";

// ---- load API key from env or .env files -----------------------------------
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
  console.error(
    "[images] No GEMINI_API_KEY found. Add it to ../.env (the OS repo .env) as\n" +
      "  GEMINI_API_KEY=...\n" +
      "or export it, then rerun. Get a key at https://aistudio.google.com (Get API key)."
  );
  process.exit(1);
}

// ---- args -------------------------------------------------------------------
const args = process.argv.slice(2);
const force = args.includes("--force");
const onlyArg = args.find((a) => a.startsWith("--only="));
const only = onlyArg ? onlyArg.split("=")[1].split(",").map((s) => s.trim()) : null;

// ---- optional sharp (webp optimization); falls back to raw bytes ------------
let sharp = null;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.warn("[images] sharp not installed; saving raw PNG/JPEG (run: pnpm add -D sharp for webp).");
}

const manifest = JSON.parse(readFileSync(resolve(__dirname, "blog-image-prompts.json"), "utf8"));
const posts = manifest.posts.filter((p) => (only ? only.includes(p.slug) : true));
mkdirSync(OUT_DIR, { recursive: true });

const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function generateOne(p) {
  const prompt = `${p.subject}. ${BASE_STYLE}`;
  const body = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
  };
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "x-goog-api-key": KEY, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt.slice(0, 400)}`);
  }
  const json = await res.json();
  const parts = json?.candidates?.[0]?.content?.parts || [];
  const img = parts.find((x) => x.inlineData?.data);
  if (!img) {
    const block = json?.promptFeedback?.blockReason;
    throw new Error(block ? `blocked: ${block}` : `no image in response: ${JSON.stringify(json).slice(0, 300)}`);
  }
  const raw = Buffer.from(img.inlineData.data, "base64");
  const outPath = resolve(OUT_DIR, `${p.slug}.webp`);
  if (sharp) {
    const base = sharp(raw).resize(1600, 900, { fit: "cover" });
    await base.clone().webp({ quality: 80 }).toFile(outPath);
    // JPEG sibling for social / GBP auto-posters (they reject webp).
    await base.clone().jpeg({ quality: 82 }).toFile(resolve(OUT_DIR, `${p.slug}.jpg`));
  } else {
    const ext = (img.inlineData.mimeType || "image/png").split("/")[1] || "png";
    writeFileSync(resolve(OUT_DIR, `${p.slug}.${ext}`), raw);
    return `${SITE}/images/blog/${p.slug}.${ext}`;
  }
  return `${SITE}/images/blog/${p.slug}.webp`;
}

const results = {};
let ok = 0, skip = 0, fail = 0;
for (const p of posts) {
  const exists = existsSync(resolve(OUT_DIR, `${p.slug}.webp`));
  if (exists && !force) { console.log(`[skip] ${p.slug} (exists)`); skip++; continue; }
  try {
    const url = await generateOne(p);
    results[p.slug] = url;
    console.log(`[ok]   ${p.slug} -> ${url}`);
    ok++;
    await sleep(1500); // gentle pacing
  } catch (e) {
    console.error(`[fail] ${p.slug}: ${e.message}`);
    fail++;
  }
}

writeFileSync(resolve(OUT_DIR, "_generated.json"), JSON.stringify(results, null, 2));
console.log(`\n[images] done. generated=${ok} skipped=${skip} failed=${fail}`);
console.log(`[images] slug->url map written to client/public/images/blog/_generated.json`);
console.log(`[images] next: run the wire step to set these as image: in client/src/lib/blog.ts`);
