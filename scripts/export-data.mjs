#!/usr/bin/env node
/**
 * Mirror src/data TypeScript modules into public/data JSON and rebuild sitemap.xml.
 * Run: node --experimental-strip-types scripts/export-data.mjs
 */
import { writeFileSync } from "node:fs";
import { cricketers } from "../src/data/cricketers.ts";
import { actors } from "../src/data/actors.ts";
import { dramas } from "../src/data/dramas.ts";
import { movies } from "../src/data/movies.ts";
import { personalities } from "../src/data/personalities.ts";
import { articles } from "../src/data/articles.ts";
import { PSL_DESKS } from "../src/data/psl.ts";

const files = {
  "public/data/cricketers.json": cricketers,
  "public/data/actors.json": actors,
  "public/data/dramas.json": dramas,
  "public/data/movies.json": movies,
  "public/data/personalities.json": personalities,
  "public/data/articles.json": articles,
};

for (const [path, data] of Object.entries(files)) {
  writeFileSync(path, JSON.stringify(data, null, 2));
}

const urls = [
  "/",
  "/cricket",
  "/psl",
  "/dramas",
  "/movies",
  "/bollywood",
  "/upcoming-dramas",
  "/upcoming-movies",
  "/actors",
  "/talk-of-the-town",
  "/talk-of-the-town/personalities",
  "/cricket/players",
  "/news",
  "/entertainment",
  "/sports",
  "/sports/football",
  "/search",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/disclaimer",
  "/cookie-policy",
  "/advertising",
];
for (const d of PSL_DESKS) urls.push(`/psl/${d.slug}`);
for (const p of cricketers) urls.push(`/cricket/${p.slug}`);
for (const p of actors) urls.push(`/actors/${p.slug}`);
for (const p of dramas) urls.push(`/dramas/${p.slug}`);
for (const p of movies) urls.push(`/movies/${p.slug}`);
for (const p of personalities) urls.push(`/talk-of-the-town/${p.slug}`);
for (const p of articles) urls.push(`/news/${p.slug}`);

writeFileSync(
  "public/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<!-- SceneBuzz sitemap. Add a <url> for every new indexable page as the site grows. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>https://scenebuzz.com${u}</loc></url>`).join("\n")}
</urlset>
`,
);

console.log(`Exported ${urls.length} sitemap URLs`);
