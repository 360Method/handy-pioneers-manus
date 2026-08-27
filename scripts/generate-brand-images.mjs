#!/usr/bin/env node
/**
 * generate-brand-images.mjs - the site's own decorative art, generated once and
 * committed, so no page depends on a third party staying online.
 *
 * Sibling of generate-blog-images.mjs and deliberately the same shape: Gemini
 * 2.5 Flash Image, photoreal scenes, no people, no text, no logos. These are
 * atmosphere (hero backdrops, the three 360° Method phase panels), never
 * evidence of a specific job. Real work photos are shot on real jobs and live
 * in client/public/images/ - do not generate those.
 *
 * Runs LOCALLY. Railway only consumes the committed files.
 *
 *   node scripts/generate-brand-images.mjs
 *   node scripts/generate-brand-images.mjs --force --only=hero-bg
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(ROOT, "client/public/images/site");
const MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image";

const BASE_STYLE =
  "Photorealistic editorial photograph, natural overcast Pacific Northwest daylight, " +
  "realistic materials and weathering, muted green and warm wood palette, " +
  "wide 16:9 landscape composition with calm empty space in the upper half for overlaid text. " +
  "No people, no text, no words, no signage, no logos, no watermarks.";

const IMAGES = [
  { slug: "hero-bg",
    subject: "A well-kept two-storey craftsman house in Vancouver Washington seen from the front garden on a soft grey morning, cedar siding, deep porch, Douglas firs behind the roofline" },
  { slug: "cta-bg",
    subject: "The covered front porch of a Pacific Northwest craftsman home at dusk, warm light spilling from the windows onto painted decking and a tidy railing" },
  { slug: "method-aware",
    subject: "Close detail of a home exterior being assessed: a moisture meter and an open notebook resting on a weathered cedar windowsill, rain-darkened siding behind, early signs of paint failure visible" },
  { slug: "method-act",
    subject: "Carpentry repair in progress on a house exterior: fresh cut cedar trim, a circular saw and squared-off framing lumber on a work bench, sawdust on the deck boards" },
  { slug: "method-advance",
    subject: "A restored Pacific Northwest home exterior in late afternoon light, freshly painted trim, clean gutters, new porch decking, mature landscaping settled around the foundation" },
  { slug: "method-transformation",
    subject: "Wide establishing shot of a Pacific Northwest craftsman home in excellent repair, viewed across a damp lawn, moss-free roof, clean gutter line, low grey cloud above the treeline" },
  { slug: "referral-banner",
    subject: "A quiet residential street of Pacific Northwest homes on a damp morning, front walks and porches receding into soft mist, no cars" },
];

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
if (!KEY) { console.error("[brand] No GEMINI_API_KEY found in ../.env or .env"); process.exit(1); }

const args = process.argv.slice(2);
const force = args.includes("--force");
const onlyArg = args.find((a) => a.startsWith("--only="));
const only = onlyArg ? onlyArg.split("=")[1].split(",").map((s) => s.trim()) : null;

mkdirSync(OUT_DIR, { recursive: true });
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function generateOne(item) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "x-goog-api-key": KEY, "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: `${item.subject}. ${BASE_STYLE}` }] }],
      generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
    }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 400)}`);
  const json = await res.json();
  const img = (json?.candidates?.[0]?.content?.parts || []).find((x) => x.inlineData?.data);
  if (!img) throw new Error(json?.promptFeedback?.blockReason || "no image in response");
  const ext = (img.inlineData.mimeType || "image/png").split("/")[1] || "png";
  const out = resolve(OUT_DIR, `${item.slug}.${ext}`);
  writeFileSync(out, Buffer.from(img.inlineData.data, "base64"));
  return out;
}

let ok = 0, skip = 0, fail = 0;
for (const item of IMAGES.filter((i) => (only ? only.includes(i.slug) : true))) {
  if (existsSync(resolve(OUT_DIR, `${item.slug}.webp`)) && !force) {
    console.log(`[skip] ${item.slug}`); skip++; continue;
  }
  try {
    console.log(`[gen ] ${item.slug} ...`);
    console.log(`       -> ${await generateOne(item)}`);
    ok++;
  } catch (e) {
    console.error(`[FAIL] ${item.slug}: ${e.message}`); fail++;
  }
  await sleep(1200);
}
console.log(`\n[brand] ok=${ok} skip=${skip} fail=${fail}`);
console.log("[brand] Now run the PIL pass to resize and write .webp, then commit.");
