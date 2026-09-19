# Nora Casey

This is the code for my portfolio site: [noracasey.com](https://noracasey.com)

Built with React, TypeScript, and [Vite](https://vite.dev).

## Running the app

```
pnpm install
pnpm dev
```

## Scripts

| Command         | What it does                                 |
| --------------- | -------------------------------------------- |
| `pnpm dev`      | Start the local dev server                   |
| `pnpm build`    | Type-check and build to `dist/`              |
| `pnpm test`     | Run the tests                                |
| `pnpm test:e2e` | Run the Playwright accessibility and SEO e2e |
| `pnpm lint`     | Lint with ESLint                             |
| `pnpm format`   | Format with Prettier                         |
| `pnpm images`   | Convert new screenshots to WebP              |

## Project pages

Each project page is built from the shared showcase layout. See
[`src/components/ProjectShowcase.md`](src/components/ProjectShowcase.md) for the
slots, the recipes, and the checklist for adding a page.

## Routes and metadata

`src/data/siteRoutes.ts` is the one list of the site's pages. `pnpm build`
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
pnpm images
```

It converts each one in place, removes the original, and prints the sizes.
Point the import at the `.webp` and check the result before committing. The
converter comes from `npx sharp-cli`, so nothing is added to `package.json`:
this runs when a screenshot changes, not on every build or CI run.

Two things the pages themselves owe an image: `loading="lazy"` if it sits below
the fold, and a reserved box (an `aspect-*` utility on the image) so the copy
beside it doesn't jump when the file lands.

## Deploying

Push to `main`. GitHub Actions runs the checks and, if they pass, deploys to
Vercel. The checks are the gate: nothing reaches production without them.

Publishing a post in the writing studio does **not** come through here. It calls
a Vercel deploy hook directly, which rebuilds this same commit against the new
content. There is no new code in that case, so there is nothing for the checks
to check, and making a post wait on a full test run would only make publishing
slow. Code changes are gated; content is not. How that is wired, and what goes
quiet when it is not, is [Publishing a post](#publishing-a-post).

`vercel.json` holds a catch-all rewrite so that any route the prerender did not
emit a file for still lands in the app rather than on Vercel's own 404.

## Publishing a post

The blog's content is not in this repo. It lives in the writing studio's
Supabase project, in the `public_posts` view, and `scripts/blogContent.ts` reads
it at the start of every build and writes static JSON under `public/blog/`. The
pages are files, so a new post appears here only when the site is built again.

Publishing asks for that build:

1. The studio writes the snapshot row. The post is live in the database at this
   point, and nothing on this site has changed.
2. The studio calls its `trigger-rebuild` Edge Function, which reads the deploy
   hook stored on the noracasey destination and POSTs it.
3. Vercel builds this same commit against the new data, and the post is live.

The hook is a Vercel deploy hook named **New Content**, on `main`. Knowing the
URL is the whole authorisation, so it is not kept in this repo and not in the
studio's bundle: it is stored on the destination row, where only the Edge
Function's service role can read it. In the studio that is Destinations, the
noracasey.com row, **rebuilds** ticked and **Deploy hook** set.
`vercel deploy-hooks ls` prints the URL when it has to be pasted in again.

There is deliberately no second route. The function reads the destination's
stored hook and nothing else, and a publish that finds no hook there reports
success, notes that it skipped the rebuild, and leaves the site as it was.

That last sentence is worth keeping in mind, because it has already gone
unnoticed for a fortnight. The studio moved the hook out of an Edge Function
environment variable and onto the destination row on 26 August 2026, and the URL
was never pasted into the new screen. From then on, publishing stopped rebuilding
this site, and posts only appeared when the deploy workflow was run by hand. That
was found on 13 September 2026, by looking for `meta.deployHookName` in the
deployment list and finding its last appearance on 24 August. Nothing had failed
anywhere. When a post has not appeared, the thing to repair is the stored hook,
not the build that did not happen.

A rebuild that came from a publish says so in its metadata:

```
vercel ls noracasey --json    # meta.deployHookName is "New Content"
```

The studio's own `/logs` records every rebuild it asked for and how it went.
