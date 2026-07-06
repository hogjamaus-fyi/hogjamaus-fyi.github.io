# hogjamaus-fyi.github.io

Static GitHub Pages site for Austin James Hogan.

The project is a public home page and reference hub that collects prophesy writing, profile links, documents, music profiles, social platforms, and related off-site resources. It also includes a secondary static mirror experience for `big-ai-genius-level-emotions-detection-recognition`.

## What the site includes

- A homepage for Austin James Hogan with curated sections such as Bring Brain Battles, Character Assessment, Music Listens, Tasks, How To Prophesy, BIO | PROPHESY, God Needed, Other, and sharing links
- A language selector and client-side share/copy interactions for the main page
- A custom `404.html` page
- Search engine support through `robots.txt`, `sitemap.xml`, and metadata embedded in the HTML
- A static GitHub-style mirror under `big-ai-genius-level-emotions-detection-recognition/`

## Project structure

- `index.html` — main site entry point and section content
- `assets/css/styles.css` — styling for the main site
- `assets/js/script.js` — language preference and share interaction logic
- `404.html` — not found page
- `robots.txt` — crawler directives
- `sitemap.xml` — published URL index
- `big-ai-genius-level-emotions-detection-recognition/` — static repository mirror pages and related assets
- `archive/backup.index.html` — older homepage backup copy
- `assets/favicon.svg`, `assets/squirrel.png`, `AwLaw.jpg`, `sky.jpg` — site imagery and branding assets

## Development

This repository is a plain static site with no build step and no configured lint or test scripts.

To preview locally, open `index.html` in a browser or serve the repository root with any simple static file server.
