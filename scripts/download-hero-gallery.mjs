#!/usr/bin/env node
/**
 * Downloads all files.manuscdn.com hero-gallery images referenced in
 * client/src/components/HeroGallery.tsx and rewrites the component
 * to point at local /images/hero-gallery/<basename>.jpg paths.
 *
 * Run this ONCE, locally, then commit the downloaded images + the
 * updated HeroGallery.tsx.  Safe to re-run — will skip files that
 * already exist.
 *
 * Usage:
 *   node scripts/download-hero-gallery.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from "node:fs";
import { resolve, basename } from "node:path";
import { pipeline } from "node:stream/promises";
import { createWriteStream } from "node:fs";

const ROOT = resolve(process.cwd());
const COMP = resolve(ROOT, "client/src/components/HeroGallery.tsx");
const OUT_DIR = resolve(ROOT, "client/public/images/hero-gallery");

mkdirSync(OUT_DIR, { recursive: true });

let src = readFileSync(COMP, "utf8");
const urlRegex = /https:\/\/files\.manuscdn\.com\/[^"\s]+/g;
const urls = Array.from(new Set(src.match(urlRegex) || []));

console.log(`[hero-gallery] found ${urls.length} manuscdn URLs`);

for (const url of urls) {
  const fname = basename(url);
  const local = resolve(OUT_DIR, fname);
  if (existsSync(local) && statSync(local).size > 0) {
    console.log(`  = ${fname} (already present)`);
  } else {
    console.log(`  + ${fname}`);
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`    FAILED: ${res.status} ${res.statusText}`);
      continue;
    }
    await pipeline(res.body, createWriteStream(local));
    const size = statSync(local).size;
    if (size === 0) {
      console.error(`    zero bytes — removing`);
      continue;
    }
    console.log(`    ${size} bytes`);
  }
  // Rewrite the reference in the component to the local path.
  src = src.replaceAll(url, `/images/hero-gallery/${fname}`);
}

writeFileSync(COMP, src);
console.log("[hero-gallery] HeroGallery.tsx rewritten to use local paths");
