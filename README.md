# Vibe Pipe

A lightweight, Neal.fun-inspired project gallery for games, simulations, tools, and experiments. The site is intentionally plain HTML, CSS, JavaScript, and JSON so it can be hosted directly on GitHub Pages with no build step.

## Add a project

1. Add the project's banner image to `assets/projects/` (recommended size: **1200 × 450**, preferably WebP).
2. Add an object to `projects.json`.
3. Commit and push. GitHub Pages will serve the updated catalogue after the repository is configured for Pages.

Minimal entry:

```json
{
  "name": "Project Interlink",
  "url": "https://zetic.github.io/Project-Interlink/",
  "image": "assets/projects/interlink.webp"
}
```

The order of entries in `projects.json` is the order displayed on the site.

## Optional project fields

```json
{
  "name": "Project Interlink",
  "url": "https://zetic.github.io/Project-Interlink/",
  "image": "assets/projects/interlink.webp",
  "description": "Procedural planet generation sandbox",
  "hidden": false,
  "showTitle": false,
  "newTab": false
}
```

- `description`: improves the card's accessible label.
- `hidden`: keeps an entry in the catalogue without rendering it.
- `showTitle`: permanently displays the project's name over the image. Otherwise the name appears on hover/focus and always appears on mobile.
- `newTab`: opens the project in a new browser tab.

If `image` is missing or fails to load, `assets/project-placeholder.svg` is used automatically.

External image URLs also work, although local images are recommended so the gallery is self-contained.

## GitHub Pages

After merging the initial site:

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select `main` and `/ (root)`.
4. Save.

The expected project-site URL is:

`https://zetic.github.io/Vibe-Pipe/`

## Project structure

```text
Vibe-Pipe/
├── index.html
├── styles.css
├── app.js
├── projects.json
├── .nojekyll
└── assets/
    ├── favicon.svg
    ├── project-placeholder.svg
    └── projects/
```

No framework, package manager, build process, or backend is required.
