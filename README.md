# Nora Casey

This is the code for my portfolio site: [noracasey.com](https://noracasey.com)

Built with React, TypeScript, and [Vite](https://vite.dev).

## Running the app

```
yarn install
yarn dev
```

## Scripts

| Command         | What it does                                 |
| --------------- | -------------------------------------------- |
| `yarn dev`      | Start the local dev server                   |
| `yarn build`    | Type-check and build to `dist/`              |
| `yarn test`     | Run the tests                                |
| `yarn test:e2e` | Run the Playwright accessibility and SEO e2e |
| `yarn lint`     | Lint with ESLint                             |
| `yarn format`   | Format with Prettier                         |
| `yarn images`   | Convert new screenshots to WebP              |

## Project pages

Each project page is built from the shared showcase layout. See
[`src/components/ProjectShowcase.md`](src/components/ProjectShowcase.md) for the
slots, the recipes, and the checklist for adding a page.

## Routes and metadata

`src/data/siteRoutes.ts` is the one list of the site's pages. `yarn build`
writes a real HTML file per route (`dist/crucinora/index.html` and so on) with
that route's title, description, canonical URL, and social card baked in, plus
the sitemap. Without it a deep link would only ever serve the empty app shell,
which crawlers and link unfurlers do not wait around to see filled in.

## Screenshots

Screenshots live in `src/assets/screens` as WebP. Screenshots of a UI are the
worst case for PNG: one crossword grid came to 341 KB, and the same image at
WebP q82 is 20 KB with nothing visible lost.

To add one, drop the `.png` or `.jpg` in that folder, then:

```
yarn images
```

It converts each one in place, removes the original, and prints the sizes.
Point the import at the `.webp` and check the result before committing. The
converter comes from `npx sharp-cli`, so nothing is added to `package.json`:
this runs when a screenshot changes, not on every build or CI run.

Two things the pages themselves owe an image: `loading="lazy"` if it sits below
the fold, and a reserved box (`aspectRatio` in `sx`, since MUI's `Box` treats
`width` and `height` as style props rather than passing them to the element) so
the copy beside it doesn't jump when the file lands.

## Deploying

Push to `main`. GitHub Actions runs the checks and, if they pass, deploys to
Vercel. The checks are the gate: nothing reaches production without them.

Publishing a post in the writing studio does **not** come through here. It calls
a Vercel deploy hook directly, which rebuilds this same commit against the new
content. There is no new code in that case, so there is nothing for the checks
to check, and making a post wait on a full test run would only make publishing
slow. Code changes are gated; content is not.

`vercel.json` holds a catch-all rewrite so that any route the prerender did not
emit a file for still lands in the app rather than on Vercel's own 404.
