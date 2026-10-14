# Handy Pioneers AEO / SEO Always-On Plan

Updated: 2026-09-17

## Current State

- The production site has the right technical foundation: prerendered marketing pages, full sitemap, RSS feed, robots.txt allowing search and AI crawlers, `llms.txt`, and `llms-full.txt`.
- The site has enough content breadth to be discoverable: service pages, city pages, project pages, reviews, FAQ, financing, membership, and field-note blog posts.
- Google has indexed legacy URLs such as `/customer-reviews/`; these now need consolidation so authority lands on the canonical route.
- The entity description must stay consistent across homepage meta, LocalBusiness schema, `llms.txt`, Google Business Profile, BBB, Yelp, and proposal copy.

## Gaps Closed In This Pass

- Added machine-discoverable links for `llms.txt`, `llms-full.txt`, and RSS in the static shell, runtime SEO component, and generated prerendered heads.
- Aligned runtime homepage LocalBusiness schema with the canonical brand description instead of an older positioning paragraph.
- Expanded prerendered homepage schema with logo, image, geo, hours, Google Maps profile, and WebSite SearchAction.
- Added 301 redirects from `/customer-reviews` and `/customer-reviews/` to `/reviews`.
- Added 301 redirects from `/gallery` and `/gallery/` to the homepage gallery anchor.

## Operating Strategy

### 1. Entity Accuracy

Goal: every answer engine describes Handy Pioneers the same way.

- Keep `client/src/lib/brand.ts` as the source of truth for the company description.
- Match Google Business Profile, BBB, Yelp, Angi, and any citations to the same NAP: Handy Pioneers, Vancouver WA, `(360) 838-6731`, `help@handypioneers.com`, `https://handypioneers.com`.
- Do not publish `vancouverhomerepair.com` as a citation. It is a redirect only.

### 2. Capture Pages

Goal: rank for the jobs homeowners actually search before they understand the 360 Method.

- Keep service pages focused on real service intent: home repair, kitchen remodel, bathroom remodel, deck repair, rot repair, gutters, painting, flooring, doors, windows, fencing, ADUs, commercial/property manager work.
- Use "handyman" only on capture surfaces where the searcher typed the term.
- Link every capture page back to the 360 Method and Proactive Path membership.

### 3. Answer Engine Content

Goal: make AI assistants able to cite the site without guessing.

- Keep every blog post answering its target question in the first 150 words.
- Use direct H2 questions on FAQ, service pages, and blog posts.
- Keep `llms.txt` short and navigational.
- Keep `llms-full.txt` comprehensive enough to answer "what does Handy Pioneers do", "where do they serve", "what does it cost", and "how does the 360 Method work".

### 4. Local Proof

Goal: prove the business is real, local, and active.

- Publish project stories from real work, especially with city names: Vancouver, Camas, Ridgefield, Battle Ground, Washougal, La Center.
- Add project photos only when they are real Handy Pioneers jobs.
- Request reviews after every completed job and monitor the review count quarterly.
- Keep BBB and Google profile links in schema and `llms.txt`.

### 5. Index Health

Goal: keep crawl waste low and authority consolidated.

- Sitemap should include only canonical public pages.
- Legacy pages should 301 to their best canonical match.
- Unknown URLs should return a real 404, not a soft 200 shell.
- Run the site-health workflow after every production push.

## Monthly Cadence

- Pull Google Search Console queries and update the keyword board.
- Find pages with impressions but low CTR; rewrite titles/descriptions first.
- Find service terms ranking positions 11-30; add internal links and a supporting post.
- Check live `robots.txt`, `sitemap.xml`, `llms.txt`, and homepage JSON-LD.
- Review GBP categories, services, posts, and Q&A.
- Add one real project story or one field-note article.

## Next Content Bets

- "home maintenance plan Vancouver WA"
- "home repair Vancouver WA"
- "deck repair Vancouver WA"
- "dry rot repair Vancouver WA"
- "kitchen remodel cost Vancouver WA"
- "bathroom remodel Vancouver WA"
- "ADU cost Clark County WA"
- "property maintenance Vancouver WA"

## Guardrail

Visibility is not the same as volume. The site should stay visible for high-intent Clark County homeowners without turning Handy Pioneers into a commodity hourly handyman brand.
