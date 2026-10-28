#!/usr/bin/env node
/**
 * generate-360-scenes.mjs - the 360 Method scene illustration bank.
 *
 * Marcin, 2026-10-28: the per-step and per-phase content images do not have to
 * be crops of the roadmap, "it could be very similar just to express the point
 * that we're trying to make." So this writes one flat-style scene per angle per
 * slot (gap = where the homeowner is now, guide = where the step puts them),
 * using Gemini 2.5 Flash Image with the matching roadmap panel crop passed as a
 * style reference. The hard rule is NO TEXT in the output: the model's own
 * lettering is what reads as AI. Review every image by eye; regenerate any with
 * letters, numbers, realistic faces or a photoreal look.
 *
 * Spec: scripts/360-scene-prompts.json (slot, reference panel, gap, guide).
 * Output: client/public/images/360-method/scenes/<slot>.<angle>.<landscape|square>.v1.jpg
 *         plus manifest.json (slot, angle, file, bytes, promptHash, notes).
 *
 * Usage:
 *   node scripts/generate-360-scenes.mjs --refs=<folder with step-0N-<key>.panel.vN.png>
 *   node scripts/generate-360-scenes.mjs --refs=... --only=step-01-baseline-gap,phase-2-act-guide
 *   node scripts/generate-360-scenes.mjs --refs=... --only=... --force
 *   node scripts/generate-360-scenes.mjs --refs=... --only=... --force --note="rejected: text on sign"
 *
 * Runs LOCALLY, never in the Railway build. Key: GEMINI_API_KEY from env or .env.
 * Images are illustrative. Never caption one as a real Handy Pioneers job.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(ROOT, "client/public/images/360-method/scenes");
const SPEC_PATH = resolve(__dirname, "360-scene-prompts.json");
const MANIFEST = resolve(OUT_DIR, "manifest.json");
const MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image";

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
if (!KEY) { console.error("[scenes] No GEMINI_API_KEY found."); process.exit(1); }

const args = process.argv.slice(2);
const arg = (n) => args.find((a) => a.startsWith(`--${n}=`))?.split("=").slice(1).join("=");
const force = args.includes("--force");
const only = arg("only")?.split(",").map((s) => s.trim()).filter(Boolean);
const note = arg("note") || "";
const REFS = arg("refs");
if (!REFS || !existsSync(REFS)) { console.error("[scenes] Pass --refs=<folder with the panel crops>."); process.exit(1); }

const sharp = (await import("sharp")).default;
const spec = JSON.parse(readFileSync(SPEC_PATH, "utf8"));
const V = `v${spec.version}`;
mkdirSync(OUT_DIR, { recursive: true });
const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, "utf8")) : { version: spec.version, model: MODEL, items: [] };

const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const hash = (s) => createHash("sha256").update(s).digest("hex").slice(0, 12);

function upsert(entry) {
  const i = manifest.items.findIndex((x) => x.slot === entry.slot && x.angle === entry.angle);
  if (i >= 0) manifest.items[i] = { ...manifest.items[i], ...entry };
  else manifest.items.push(entry);
}

// The panel crops carry a cream margin and a phase-tone bar along the bottom
// edge; the model copies that bar into the scene. Trim the bottom 10% before
// sending so only the illustration and its border act as the reference.
async function referenceB64(refPath) {
  const img = sharp(refPath);
  const { width, height } = await img.metadata();
  const keep = Math.floor(height * 0.9);
  const buf = await img.extract({ left: 0, top: 0, width, height: keep }).png().toBuffer();
  return buf.toString("base64");
}

async function generate(slot, angle, prompt, refPath) {
  const refB64 = await referenceB64(refPath);
  const text = `${prompt}. ${spec.style} ${spec.negative}`;
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "x-goog-api-key": KEY, "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        role: "user",
        parts: [
          { text: "Style reference only. Copy its palette, line weight and flat shading. Do not copy its content. It contains words: do not reproduce any of them, and draw no words of your own. Do not add any horizontal colored band or stripe along the bottom edge; the scene fills the whole frame edge to edge." },
          { inlineData: { mimeType: "image/png", data: refB64 } },
          { text },
        ],
      }],
      generationConfig: { responseModalities: ["TEXT", "IMAGE"], imageConfig: { aspectRatio: "4:3" } },
    }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const json = await res.json();
  const img = (json?.candidates?.[0]?.content?.parts || []).find((x) => x.inlineData?.data);
  if (!img) {
    const block = json?.promptFeedback?.blockReason;
    throw new Error(block ? `blocked: ${block}` : `no image: ${JSON.stringify(json).slice(0, 200)}`);
  }
  const buf = Buffer.from(img.inlineData.data, "base64");
  const land = resolve(OUT_DIR, `${slot}.${angle}.landscape.${V}.jpg`);
  const sq = resolve(OUT_DIR, `${slot}.${angle}.square.${V}.jpg`);
  await sharp(buf).resize(1200, 900, { fit: "cover" }).jpeg({ quality: 82, mozjpeg: true }).toFile(land);
  await sharp(buf).resize(1080, 1080, { fit: "cover", position: "centre" }).jpeg({ quality: 82, mozjpeg: true }).toFile(sq);
  return { land, sq, promptHash: hash(text) };
}

let ok = 0, skip = 0, fail = 0;
for (const s of spec.slots) {
  for (const angle of ["gap", "guide"]) {
    const id = `${s.slot}-${angle}`;
    if (only && !only.includes(id)) continue;
    const land = resolve(OUT_DIR, `${s.slot}.${angle}.landscape.${V}.jpg`);
    if (existsSync(land) && !force) { console.log(`[skip] ${id} (exists)`); skip++; continue; }
    const refPath = resolve(REFS, s[`${angle}Reference`] || s.reference);
    if (!existsSync(refPath)) { console.error(`[fail] ${id}: missing reference ${refPath}`); fail++; continue; }
    try {
      const r = await generate(s.slot, angle, s[angle], refPath);
      const prev = manifest.items.find((x) => x.slot === s.slot && x.angle === angle);
      const attempts = (prev?.attempts || 0) + 1;
      upsert({
        slot: s.slot, angle, attempts,
        landscape: `${s.slot}.${angle}.landscape.${V}.jpg`, landscapeBytes: statSync(r.land).size,
        square: `${s.slot}.${angle}.square.${V}.jpg`, squareBytes: statSync(r.sq).size,
        promptHash: r.promptHash,
        notes: note ? [...(prev?.notes || []), note] : (prev?.notes || []),
      });
      writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
      console.log(`[ok]   ${id} (attempt ${attempts})`);
      ok++;
      await sleep(1500);
    } catch (e) {
      console.error(`[fail] ${id}: ${e.message}`);
      fail++;
    }
  }
}
console.log(`\n[scenes] done. generated=${ok} skipped=${skip} failed=${fail}`);
