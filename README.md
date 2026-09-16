# SceneBuzz

**Pakistan's home for cricket, PSL, dramas and Bollywood**

SceneBuzz is a Pakistan-first South Asian media website. Pakistan is the centre. India is the major secondary market (Bollywood, Indian cinema, Indian celebrities). South Asia is the broader regional umbrella — not a generic worldwide entertainment brand.

Primary desks: Pakistan cricket, PSL, Pakistani dramas, Bollywood / Indian movies, celebrities, Talk of the Town.

Production canonical URL: [https://scenebuzz.com](https://scenebuzz.com)

Source: [github.com/salimpk743-droid/scenebuzz](https://github.com/salimpk743-droid/scenebuzz)

This repository is the complete current version of the prototype. Sample editorial is labeled. Statistics that are not frozen career records are marked for verification. SceneBuzz does not host films, drama episodes or unauthorized media.

## Local development

The app is a static-data TanStack Start site (HTML routes, CSS, TypeScript, JSON-shaped records).

```bash
npm install
npm run dev
```

Open the printed local URL. There is no database and no required API key.

## Folder structure

```
src/routes/          Pages (home, cricket, PSL, dramas, movies, Bollywood, actors, Talk of the Town, news, legal)
src/components/      Header, footer, cards, stats, portraits
src/data/            Cricketers, actors, personalities, dramas, movies, PSL, articles
src/lib/             Types, search, SEO helpers, site config
public/assets/       Logo, editorial stills, favicon
public/data/         JSON mirrors of the TypeScript records
public/robots.txt
public/sitemap.xml
```

## How to add a cricketer

1. Add a record to `src/data/cricketers.ts` (slug, role, published stats or `Verify`).
2. Do not invent bowling figures or yearly charts.
3. Related slugs should match existing players.
4. Add `https://scenebuzz.com/cricket/{slug}` to `public/sitemap.xml`.
5. Export JSON if you use `/data/cricketers.json`.

## How to add an actor

Edit `src/data/actors.ts`. Set `group` to `"pakistan"` or `"india"`. Leave social arrays empty until a URL is officially verified. Never invent awards or dates of birth.

## How to add a personality

Edit `src/data/personalities.ts`. Follow the Yamini Malhotra example: professional credits only, no measurements, relationships, income or invented quotes.

## How to add a drama or movie

Edit `src/data/dramas.ts` or `src/data/movies.ts`. Movies on SceneBuzz are Indian cinema / Bollywood first. Unconfirmed dates must be `TBA` or `Expected`. `whereToWatch` must stay official. Do not add pirate links.

## How to add an article

Edit `src/data/articles.ts`. Prototype pieces use author `SceneBuzz Editorial Team` and `demo: true`. Replace demo copy with commissioned reporting before treating stories as live news.

## How to update the sitemap

Add a `<url><loc>https://scenebuzz.com/…</loc></url>` for every new indexable page. Keep `robots.txt` pointing at `https://scenebuzz.com/sitemap.xml`.

```bash
npm run export-data
```

## How to replace images

Editorial stills live in `public/assets/images/`. They are original generated still-lifes, not scraped celebrity photographs. Replace portraits with licensed photography and keep alt text.

## Deploy on Vercel (from GitHub)

1. Repository: [github.com/salimpk743-droid/scenebuzz](https://github.com/salimpk743-droid/scenebuzz).
2. In Vercel, import that GitHub repo (or reconnect the Vercel GitHub app if prompted). Framework: TanStack Start.
3. Production branch: `main`. Pushes redeploy automatically.
4. Attach the custom domain **scenebuzz.com** in Vercel → Project → Settings → Domains. Add the DNS records Vercel shows (usually an A record and a CNAME for `www`).
5. Canonical tags already use `https://scenebuzz.com`.

The Vercel Git integration has been reconnected and this commit is intentionally being used to trigger a fresh deployment.

Do not commit API keys. Future variables:

- `CRICKET_API_KEY`
- `NEWS_API_KEY`
- `ANALYTICS_ID`
