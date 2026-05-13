# klim-web

Marketing website and documentation site for [klim](https://github.com/nassiharel/klim).

- `website/` — Astro + Tailwind marketing site (root)
- `docs/` — Astro Starlight documentation site (mounted under `/docs/`)
- `.github/workflows/deploy-pages.yml` — Combined GitHub Pages build & deploy

Both sites are deployed together to GitHub Pages:

- Website: `https://nassiharel.github.io/klim-web/`
- Docs: `https://nassiharel.github.io/klim-web/docs/`

For a custom-domain switch (klim.dev / docs.klim.dev), update the
`KLIM_WEBSITE_*` and `KLIM_DOCS_*` env vars in
`.github/workflows/deploy-pages.yml`.

## Local development

```bash
# Website
cd website && npm install && npm run dev

# Docs
cd docs && npm install && npm run dev
```

The docs build pulls the assembled tool catalog from the klim repo's
`marketplace` branch and generates `docs/src/content/docs/reference/marketplace.mdx`
via `docs/scripts/gen-marketplace-page.go`.

## Triggering a docs rebuild after a marketplace update

The klim repo's Marketplace workflow can dispatch a `marketplace-updated`
event to this repo to refresh the catalog page without a code change.
