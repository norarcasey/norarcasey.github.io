# noracasey.com

The portfolio site at https://noracasey.com. Vite, React 19, TypeScript, Tailwind v4
with `@noratives/tokens` (the shared Nora Suite tokens, pinned as a git dependency).
Deployed to Vercel by GitHub Actions on every push to `main`. There are no pull requests here: one
maintainer, push to `main`, the gate decides.

## Before you start

1. `node ~/src/noradar/scripts/runway.mjs open .` lists the unfinished items. The runway
   itself is the Artifact at
   https://claude.ai/code/artifact/d3f41697-663c-4428-8ab8-87130a23cb52. Read the item
   you are taking before touching anything: the notes say what to change, what to leave
   alone, and what was already decided.
2. `pnpm install` (pnpm, not npm or Yarn; `pnpm-lock.yaml` is the lockfile).
3. `pnpm gate` must pass before you start, so you know a failure later is yours.

## The one check

```
pnpm gate        # format:check, lint, tsc, test. What CI runs first.
pnpm test:e2e    # Playwright + axe over the built site. Slow; CI runs it after the gate.
pnpm build       # tsc + vite build. Needs VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
                 # in .env.local, or the blog fetch aborts the build.
```

Run `pnpm gate` before every push. Run `pnpm format` first if it fails on formatting;
Prettier is the arbiter and CI checks it before anything else.

## Where things are

| Concern               | Place                                                                                                                                                 |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| The list of pages     | `src/data/siteRoutes.ts`. Adding a route here is what puts it in the sitemap, the prerender, and the router test. Nowhere else.                       |
| The router            | `src/index.tsx`. Every page but home is a lazy route.                                                                                                 |
| Shell: header, footer | `src/Root.tsx`                                                                                                                                        |
| Colours and type      | `src/index.css`: the token overrides at the top (the cool neutral ramp, the blue accent, the flag motif), light on `:root` and dark restated twice.   |
| The design system     | `src/index.css`, `@layer components`: `.h1` to `.h3`, `.lead`, `.copy`, `.meta`, `.eyebrow`, `.card`, `.btn`. Layout is Tailwind utilities.           |
| Project pages         | `src/pages/*Page.tsx`, built from the slots in `src/components/ProjectShowcase.tsx`. `src/components/ProjectShowcase.md` is the recipe and checklist. |
| Résumé content        | `src/data/resume.ts`. Dates are structured; years are computed.                                                                                       |
| Blog                  | Content is not in this repo. `scripts/blogContent.ts` fetches it at build time into `public/blog/` (gitignored). See README, "Publishing a post".     |
| Prerender and sitemap | `scripts/prerender.ts`. One HTML file per route, from the built `index.html`.                                                                         |
| Screenshots           | `src/assets/screens/*.webp`. New ones go through `pnpm images`.                                                                                       |
| Unit tests            | Beside the file, `*.test.ts(x)`. jsdom, Testing Library, jest-axe.                                                                                    |
| End-to-end            | `e2e/`. Accessibility, SEO of the served HTML, showcase slots.                                                                                        |

## Rules that are not in the linter

- **No em dashes** anywhere in site copy or comments. Commas, periods, colons, or
  parentheses instead.
- **Plain voice.** State what a thing is. No flourish, no persuasion, no exclamation.
- **Accessibility is gated twice.** `src/a11y.test.tsx` runs axe over every page in
  jsdom and `e2e/a11y.spec.ts` runs it over the built site in Chromium. A new page goes
  into both lists, and into `e2e/seo.spec.ts`.
- **Images below the fold** take `loading="lazy"` and reserve their box with an
  `aspect-*` utility, so the copy beside them does not jump when the file lands.
- **The site's own classes live in Tailwind's `components` layer** so a utility
  beside them wins (`copy text-sm` is 14px). A rule written outside a layer in
  `index.css` beats every utility, silently. The print rules and the shell are
  outside on purpose: they are meant to win.
- **Both schemes are real.** The dark palette is live under `prefers-color-scheme`;
  the e2e axe scan runs in both, so a colour that only fails in dark still fails.
- **`index.html` is the prerender's template.** Anything added to its `<head>` reaches
  every route. Anything per page goes through `siteRoutes.ts` and `usePageMeta`.

## Commits

One item per commit where possible. The message says what changed and why, not what
files moved. The trailer is mandatory and the hook enforces it:

```
Runway: UI-11
```

or `Runway: none` for a change that belongs to no item. The hook refuses an id the
runway does not have, so an item is written before its first commit, not after.

## When you finish an item

Update the runway Artifact: not "done", but what it turned out to be, what was found on
the way, and what the plan got wrong. Then re-import it so the hook and Noradar see it:

```
node ~/src/noradar/scripts/runway.mjs import . runway.html --url https://claude.ai/code/artifact/d3f41697-663c-4428-8ab8-87130a23cb52
```

where `runway.html` is the published page saved to disk.

## Items marked for hand-off

An item tagged **hand-off** in the runway is specified closely enough to be taken without
the context of the conversation that wrote it: the files are named, the acceptance is
stated, and `pnpm gate` plus the tests it names are the whole check. Take it as written.
If the item turns out to need a decision it does not record, stop and write the question
into the item rather than choosing.
