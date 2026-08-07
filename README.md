# Nora Casey

This is the code for my portfolio site: [noracasey.com](https://noracasey.com)

Built with React, TypeScript, and [Vite](https://vite.dev).

## Running the app

```
yarn install
yarn dev
```

## Scripts

| Command       | What it does                    |
| ------------- | ------------------------------- |
| `yarn dev`    | Start the local dev server      |
| `yarn build`  | Type-check and build to `docs/` |
| `yarn test`   | Run the tests                   |
| `yarn lint`   | Lint with ESLint                |
| `yarn format` | Format with Prettier            |

## Project pages

Each project page is built from the shared showcase layout. See
[`src/components/ProjectShowcase.md`](src/components/ProjectShowcase.md) for the
slots, the recipes, and the checklist for adding a page.

## Routes and metadata

`src/data/siteRoutes.ts` is the one list of the site's pages. `yarn build`
writes a real HTML file per route (`docs/crucinora/index.html` and so on) with
that route's title, description, canonical URL, and social card baked in, plus
the sitemap. Without it GitHub Pages answers every deep link with a 404 and
leans on `404.html` to redirect, which crawlers and link unfurlers don't follow.

## Deploying

Push to `main`. GitHub Actions runs the checks and deploys to GitHub Pages.
