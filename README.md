# SceneBuzz

**Cricket • Movies • Dramas • Celebrities • Trending Personalities**

SceneBuzz is a South Asian digital media website covering cricket, football, Pakistani dramas, Indian and Pakistani cinema, celebrities and Talk of the Town personalities.

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
src/routes/          Pages (home, cricket, dramas, movies, actors, Talk of the Town, news, legal)
src/components/      Header, footer, cards, stats, portraits
src/data/            Cricketers, actors, personalities, dramas, movies, articles
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

Edit `src/data/dramas.ts` or `src/data/movies.ts`. Unconfirmed dates must be `TBA` or `Expected`. `whereToWatch` must stay official. Do not add pirate links.

## How to add an article

Edit `src/data/articles.ts`. Prototype pieces use author `SceneBuzz Editorial Team` and `demo: true`. Replace demo copy with commissioned reporting before treating stories as live news.

## How to update the sitemap

Add a `<url><loc>https://scenebuzz.com/…</loc></url>` for every new indexable page. Keep `robots.txt` pointing at `https://scenebuzz.com/sitemap.xml`.

## How to replace images

Editorial stills live in `public/assets/images/`. They are original generated still-lifes, not scraped celebrity photographs. Replace portraits with licensed photography and keep alt text.

## Deploy on Vercel (from GitHub)

1. Repository: [github.com/salimpk743-droid/scenebuzz](https://github.com/salimpk743-droid/scenebuzz).
2. In Vercel, import that GitHub repo (or reconnect the Vercel GitHub app if prompted). Framework: Vite / TanStack Start (auto-detected).
3. Production branch: `main`. Pushes redeploy automatically.
4. Attach the custom domain **scenebuzz.com** in Vercel → Project → Settings → Domains. Add the DNS records Vercel shows (usually an A record and a CNAME for `www`).
5. Canonical tags already use `https://scenebuzz.com`.

Do not commit API keys. Future variables:

- `CRICKET_API_KEY`
- `NEWS_API_KEY`
- `ANALYTICS_ID`

## Analytics, newsletter, advertising

- Analytics: do not load a tracker before cookie consent. Put the ID in an environment variable, not in git.
- Newsletter: the form stores addresses in the browser only. Connect Buttondown, Mailchimp, Loops or a similar API later.
- Advertising: labeled placeholders exist in the header, homepage, article and sidebar. Connect an ad server when ready.

## Future CMS / cricket API

Records are plain objects in `src/data`. A headless CMS or cricket API can replace those modules without changing the page templates. Do not pretend an API is live until it is.

## Legal

`about`, `privacy-policy`, `terms`, `disclaimer`, `cookie-policy`, `advertising` and `contact` use placeholders:

`[LEGAL BUSINESS NAME]`, `[OWNER NAME]`, `[CONTACT EMAIL]`, `[COUNTRY]`, `[ADDRESS]`, `[DATE]`

Have a qualified lawyer review them for the jurisdictions that apply to the business and audience.

## Editorial standards

- Sample content is labeled Sample / Demo.
- Statistics last-updated notes appear on player pages.
- Rumours are not printed as facts.
- Talk of the Town is mainstream and advertiser-friendly.
