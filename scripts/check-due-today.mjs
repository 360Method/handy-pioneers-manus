#!/usr/bin/env node
/**
 * check-due-today.mjs - used by .github/workflows/blog-autopublish.yml.
 *
 * Reads the publishDate of every blog post and reports whether ANY post goes
 * live "today" in America/Los_Angeles (the site's timezone). The workflow uses
 * this to redeploy only on days a post actually becomes due, so a drip-scheduled
 * post gets prerendered + added to the sitemap automatically (the SPA already
 * shows it client-side on its date; this makes it crawlable too).
 *
 * Prints `due=true|false` to stdout and to $GITHUB_OUTPUT when present.
 */
import { readFileSync, appendFileSync } from "node:fs";

const blog = new URL("../client/src/lib/blog.ts", import.meta.url);
const raw = readFileSync(blog, "utf8");

const dates = [...raw.matchAll(/"?publishDate"?:\s*"(\d{4}-\d{2}-\d{2})"/g)].map((m) => m[1]);

// "today" in the site's timezone, as YYYY-MM-DD.
const todayLA = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Los_Angeles",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());

const due = dates.includes(todayLA);
console.log(`today(LA)=${todayLA} postsDueToday=${due}`);

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `due=${due}\n`);
}
