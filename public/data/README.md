# SceneBuzz data files

Canonical records live in `src/data/*.ts` and are mirrored here as JSON for the
static/API-shaped architecture:

- `cricketers.json`
- `actors.json`
- `personalities.json`
- `dramas.json`
- `movies.json`
- `articles.json`

Regenerate with `node scripts/export-data.mjs` after editing the TypeScript
modules. Do not invent statistics, release dates, quotes or social URLs.
