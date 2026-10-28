/**
 * sync-360-method.mjs: pull the 360 Method roadmap from the pro app.
 *
 * The roadmap visual is defined once, in HP-Estimator-app
 * (shared/threeSixtyMethod.ts), and rendered by one component. This site
 * shows the identical picture by keeping a copy of that component and of the
 * exported canon.json plus images. Nothing here is hand-edited: run this
 * script, commit what changed.
 *
 *   node scripts/sync-360-method.mjs                 # from the live pro origin
 *   node scripts/sync-360-method.mjs --from=../hp-est-roadmap   # from a local checkout
 *
 * check-site-assets.mjs compares the committed canon.json with the pro
 * origin's copy every four hours, so drift opens an issue instead of
 * quietly shipping two versions of the method.
 */
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const args = process.argv.slice(2);
const fromArg = args.find((a) => a.startsWith("--from="))?.slice(7) ?? null;
const ORIGIN = (args.find((a) => a.startsWith("--origin="))?.slice(9) ?? "https://pro.handypioneers.com").replace(/\/$/, "");

const COMPONENT_SRC = "client/src/components/threeSixty/ThreeSixtyRoadmap.tsx";
const COMPONENT_DST = resolve(root, "client/src/components/method/ThreeSixtyRoadmap.tsx");
const CANON_TS_DST = resolve(root, "client/src/lib/methodCanon.ts");
const ASSET_DIR_SRC = "client/public/brand/360-method";
const ASSET_DIR_DST = resolve(root, "client/public/brand/360-method");
const ASSETS = ["canon.json", "360-roadmap.png", "360-roadmap.jpg", "360-roadmap-og.png", "360-roadmap-letter.pdf"];
// Step and phase crops of the artwork (generate-method-crops.ts in the pro
// app). crops-manifest.json lists every file, so the sync copies exactly what
// the generator produced. Optional until the pro app ships them.
const CROPS_MANIFEST = "crops-manifest.json";
const CROPS_JSON = "crops.json";

mkdirSync(dirname(COMPONENT_DST), { recursive: true });
mkdirSync(ASSET_DIR_DST, { recursive: true });

const BANNER = `/**
 * COPIED FROM HP-Estimator-app by scripts/sync-360-method.mjs. Do not edit
 * here; change the source in the pro app and run the sync again.
 */
`;

async function readSource(rel) {
  if (fromArg) {
    const p = resolve(root, fromArg, rel);
    if (!existsSync(p)) throw new Error(`missing ${p}`);
    return readFileSync(p);
  }
  // The component is not served by the pro app; a local checkout is required for it.
  if (rel === COMPONENT_SRC) throw new Error("the component can only be synced from a local checkout: pass --from=<path to HP-Estimator-app>");
  const url = `${ORIGIN}/${rel.replace("client/public/", "")}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} answered ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

let changed = 0;
function writeIfChanged(dst, buf) {
  const before = existsSync(dst) ? readFileSync(dst) : null;
  if (before && Buffer.compare(before, buf) === 0) return;
  writeFileSync(dst, buf);
  changed += 1;
  console.log(`updated ${dst.replace(root + "\\", "").replace(root + "/", "")}`);
}

const main = async () => {
  if (fromArg) {
    const src = (await readSource(COMPONENT_SRC)).toString("utf8");
    writeIfChanged(COMPONENT_DST, Buffer.from(BANNER + src, "utf8"));
  }
  for (const name of ASSETS) {
    writeIfChanged(resolve(ASSET_DIR_DST, name), await readSource(`${ASSET_DIR_SRC}/${name}`));
  }
  // Crops: read the manifest, copy each listed file under crops/.
  let manifest = null;
  try {
    manifest = JSON.parse((await readSource(`${ASSET_DIR_SRC}/${CROPS_MANIFEST}`)).toString("utf8"));
  } catch (e) {
    console.log(`crops not synced (${e.message}); the pro app has not published ${CROPS_MANIFEST} yet`);
  }
  if (manifest) {
    writeIfChanged(resolve(ASSET_DIR_DST, CROPS_JSON), await readSource(`${ASSET_DIR_SRC}/${CROPS_JSON}`));
    mkdirSync(resolve(ASSET_DIR_DST, "crops"), { recursive: true });
    // crops-manifest.json: { slots: [{ slot, outputs: [{ role, file, ... }] }] }
    const files = (manifest.slots ?? []).flatMap((slot) => (slot.outputs ?? []).map((o) => o.file)).filter(Boolean);
    for (const name of files) {
      writeIfChanged(resolve(ASSET_DIR_DST, "crops", name), await readSource(`${ASSET_DIR_SRC}/crops/${name}`));
    }
    // Site-side derivative: a WebP of each panel PNG for the step-page hero
    // (the 2x PNGs run about 1 MB each; the WebP is a fraction of that). Same
    // pixels, same name with .webp, regenerated whenever the PNG changes.
    const sharp = (await import("sharp")).default;
    for (const name of files.filter((f) => /\.panel\.v\d+\.png$/.test(f))) {
      const png = resolve(ASSET_DIR_DST, "crops", name);
      const webp = png.replace(/\.png$/, ".webp");
      const buf = await sharp(readFileSync(png)).webp({ quality: 84 }).toBuffer();
      writeIfChanged(webp, buf);
    }
    writeIfChanged(resolve(ASSET_DIR_DST, CROPS_MANIFEST), Buffer.from(JSON.stringify(manifest, null, 2) + "\n", "utf8"));
  }
  // Cards: typographic gap and invite cards (generate-method-cards.ts in the
  // pro app). Same manifest shape as the crops: { slots: [{ outputs: [{ file }] }] }.
  let cardsManifest = null;
  try {
    cardsManifest = JSON.parse((await readSource(`${ASSET_DIR_SRC}/cards-manifest.json`)).toString("utf8"));
  } catch (e) {
    console.log(`cards not synced (${e.message}); the pro app has not published cards-manifest.json yet`);
  }
  if (cardsManifest) {
    writeIfChanged(resolve(ASSET_DIR_DST, "cards.json"), await readSource(`${ASSET_DIR_SRC}/cards.json`));
    mkdirSync(resolve(ASSET_DIR_DST, "cards"), { recursive: true });
    const cardFiles = (cardsManifest.slots ?? []).flatMap((slot) => (slot.outputs ?? []).map((o) => o.file)).filter(Boolean);
    for (const name of cardFiles) {
      writeIfChanged(resolve(ASSET_DIR_DST, "cards", name), await readSource(`${ASSET_DIR_SRC}/cards/${name}`));
    }
    writeIfChanged(resolve(ASSET_DIR_DST, "cards-manifest.json"), Buffer.from(JSON.stringify(cardsManifest, null, 2) + "\n", "utf8"));
  }
  // The canon as a TypeScript module, so pages and the prerender script import
  // it without a JSON-module flag. Same bytes as canon.json.
  const canon = JSON.parse(readFileSync(resolve(ASSET_DIR_DST, "canon.json"), "utf8"));
  const ts = [
    BANNER.trimEnd(),
    'import type { RoadmapData } from "../components/method/ThreeSixtyRoadmap";',
    "",
    `export const METHOD_CANON: RoadmapData = ${JSON.stringify(canon, null, 2)};`,
    "",
  ].join("\n");
  writeIfChanged(CANON_TS_DST, Buffer.from(ts, "utf8"));
  console.log(changed ? `${changed} file(s) updated. Review and commit.` : "Already in sync.");
};

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
