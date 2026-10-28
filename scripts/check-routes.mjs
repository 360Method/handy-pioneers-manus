#!/usr/bin/env node
/**
 * check-routes.mjs - keeps client/src/App.tsx and the server's VALID_ROUTES
 * (server/index.ts) in step. Every <Route path> in the SPA must be accepted
 * by the server regex list (param routes are tested with one sample value),
 * and a few paths that must 404 are asserted too. Runs in `pnpm build`.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(process.cwd());
const app = readFileSync(resolve(ROOT, "client/src/App.tsx"), "utf8");
const server = readFileSync(resolve(ROOT, "server/index.ts"), "utf8");

const block = server.match(/const VALID_ROUTES: RegExp\[\] = \[([\s\S]*?)\n  \];/);
if (!block) {
  console.error("[check-routes] could not find VALID_ROUTES in server/index.ts");
  process.exit(1);
}
const routes = [...block[1].matchAll(/^\s*(\/.*\/),?\s*$/gm)].map((m) => {
  const src = m[1];
  const last = src.lastIndexOf("/");
  return new RegExp(src.slice(1, last), src.slice(last + 1));
});

const paths = [...app.matchAll(/<Route path="([^"]+)"/g)].map((m) => m[1]);
// One sample value per param name. The step sample is a real canon key so the
// server's explicit list is what gets tested.
const SAMPLE = { step: "baseline", slug: "sample" };
const samples = paths.map((p) => p.replace(/:([A-Za-z]+)/g, (_, name) => SAMPLE[name] ?? "sample"));

const mustReject = ["/360-method/aware", "/360-method/foo", "/no-such-page"];

let bad = 0;
for (const p of samples) {
  if (!routes.some((rx) => rx.test(p))) {
    console.error(`[check-routes] App.tsx route ${p} is not accepted by VALID_ROUTES`);
    bad += 1;
  }
}
for (const p of mustReject) {
  if (routes.some((rx) => rx.test(p))) {
    console.error(`[check-routes] ${p} should 404 but VALID_ROUTES accepts it`);
    bad += 1;
  }
}
if (bad) process.exit(1);
console.log(`[check-routes] ${samples.length} SPA routes accepted, ${mustReject.length} dead paths rejected`);
