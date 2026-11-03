# samsonkirigua.com

Portfolio site for Samson Kirigua, Senior Product Designer. Built with [Astro](https://astro.build) as a static site and hosted on Cloudflare Pages, which builds and deploys every push to `main`.

## Run it locally

You need Node 22.23.4 or later (the exact version is in `.nvmrc`).

```bash
npm install
npm run dev
```

The site runs at http://localhost:4321. `npm run build` writes the finished site to `dist/`.

To check routing and redirects the way Cloudflare serves them, build first and then run:

```bash
npx wrangler pages dev dist
```

## Where things live

| Path | What it holds |
|---|---|
| `src/content/case-studies/*.mdx` | One file per case study: details at the top, story below |
| `src/pages/index.astro` | Home page. The work grid is built from the case study files |
| `src/pages/resume.astro`, `src/pages/contact.astro` | Resume and contact pages |
| `src/layouts/` | Shared page shell (head, nav, footer) and the case study layout |
| `src/components/` | Nav, footer, cards, figures, metrics, pull quotes |
| `src/scripts/` | Mobile menu, image lightbox, home page scroll effects |
| `src/styles/global.css` | The one stylesheet for the whole site |
| `public/images/` | All images, served at `/images/...` |
| `public/_redirects` | Cloudflare redirect rules |

## Add a case study

1. Copy an existing file in `src/content/case-studies/`, for example `bank-transfer.mdx`, and rename it.
2. In the details at the top, set `slug` to the URL you want. It must start with `case-study-`, for example `case-study-new-project`. The page will live at `/case-study-new-project`.
3. Set `listed: true` to show it on the home page grid, in the position given by `order`. Set `listed: false` to publish the page without listing it anywhere.
4. Fill in `card` (thumbnail, text and result line) if the study appears in any grid.
5. `moreWork` lists the three studies shown at the bottom of the page, by slug.
6. Write the story in Markdown below the details. Use `<Figure />`, `<ScrollFigure />`, `<PullQuote>` and `<KeyMetrics />` for images, scrolling diagrams, quotes and metric blocks. The existing files show each one in use.

Put images in `public/images/` and refer to them as `/images/file-name.webp`, with their real `width` and `height`.

Once a case study's URL has been shared, never change its `slug`. Old links would stop working.

## Why `build.format` must stay `'file'`

`astro.config.mjs` sets `build: { format: 'file' }`. This makes Astro write `case-study-x.html`, the same files the site had before it moved to Astro. Cloudflare then serves `/case-study-x`, `/case-study-x.html` and `/case-study-x/` exactly as it did before.

Astro's default writes `case-study-x/index.html` instead, and every link ending in `.html` would return a 404. Many of those links have been sent to recruiters. Don't change this setting.

## Not part of the site

`.agents/`, `.claude/` and `skills-lock.json` hold agent tooling. `carousel.js` is unused and due for removal. `migration/` holds the baseline used to check the Astro migration. None of these are published.
