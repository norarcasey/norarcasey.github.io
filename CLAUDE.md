# noracasey.com

The portfolio site at https://noracasey.com. Vite, React 19, TypeScript, Tailwind v4
with `@noratives/tokens` (the shared Nora Suite tokens, pinned as a git dependency).
Deployed to Vercel by GitHub Actions on every push to `main`. There are no pull requests here: one
maintainer, push to `main`, the gate decides.

## Before you start

1. The work items are tickets in Linora, app `CASEY` (`.linora-app`). Read the one you are
   taking with `get_ticket` before touching anything, earlier runs included: the spec says
   what to change, what to leave alone, and what was already decided, and a run handed back
   says why. Then `claim_ticket`.
2. Work in a worktree, never the main checkout: `EnterWorktree` named for the ticket
   in lower case (`.claude/worktrees/ops-10`), or its `path` when that worktree already exists. Link
   `.env.local` in from the main checkout (`ln -s ../../../.env.local .env.local`) so
   `pnpm build` and `pnpm test:e2e` can fetch the blog; it is gitignored either way.
3. `pnpm install` (pnpm, not npm or Yarn; `pnpm-lock.yaml` is the lockfile).
4. `pnpm gate` must pass before you start, so you know a failure later is yours.

## The one check

```
pnpm gate        # format:check, lint, tsc, test. What CI runs first.
pnpm test:e2e    # Playwright + axe over the built site. Builds first; CI runs it after the gate.
pnpm build       # tsc + vite build. Needs VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
                 # in .env.local, or the blog fetch aborts the build.
```

Run `pnpm gate` and `pnpm test:e2e` before every push (Ship it, below). Run `pnpm format`
first if the gate fails on formatting; Prettier is the arbiter and CI checks it before
anything else.

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

or `Runway: none` for a change that belongs to no item. The hook refuses an id Linora
does not have, so a ticket is filed before its first commit, not after.

## Ship it

The four steps from `~/src/linora/docs/ship-it.md`, with this repo's commands. Run them
from the ticket's worktree, before `complete_run`.

1. **Merge to main.** `git fetch`, then `git rebase origin/main`. No pull request, no merge
   commit.
2. **Verify.** `pnpm gate`, then `pnpm test:e2e`, on the rebased commit. Both, every time:
   the e2e suite builds the site and scans every page in both schemes. A red check is fixed
   or handed back with the reason, never shipped as flaky.
3. **Push.** `git push origin HEAD:main`. If it is refused because `main` moved, rebase,
   verify again, push again.
4. **Deploy.** CI deploys on push: `.github/workflows/deploy.yml` runs the gate, the e2e
   scan, then `vercel deploy --prod`. Find the run for your commit
   (`gh run list --workflow deploy.yml --commit <sha>`) and watch it to the end with
   `gh run watch <id> --exit-status`. Only a run whose **Deploy to Vercel** step succeeded
   on that commit counts. A push is not a deploy.

**Why step 2 matters more here than the CI gate does.** Until `OPS-10` is fixed, Vercel's
Git integration puts every push live about two minutes before CI finishes, and leaves it
live if CI fails. So the local verify is the only check that runs before visitors see the
commit, and a red CI run means production is already serving a commit that failed: fix it
forward straight away, in the same run.

CI keeps the e2e scan, unlike the heavy apps that moved theirs into local verify only.
Here it costs under a minute of a two-minute run (54 of 138 seconds, 8 Oct 2026), and it
builds with the repository's secrets rather than `.env.local`. There are no project hooks,
so the main checkout is not pulled after a deploy.

Then `complete_run` with `shipped: true`, naming the commit and the Actions run that
deployed it. The summary is not "done" but what the ticket turned out to be, what was found
on the way, and what the plan got wrong. Work found that is not yours to do now is filed
with `create_tickets`.

Ask Nora for a **Shipit** first (`AskUserQuestion`, **Shipit** / **Hold**), after verify and
before pushing, when the change:

- touches how the site is deployed: `vercel.json`, the deploy step or secrets in
  `deploy.yml`, Vercel's project settings or environment, or the New Content deploy hook
  (`OPS-10`, `CASEY-5`). Every publish depends on the hook, and breaking it fails silently
  (`OPS-04`).
- touches what the build reads from Supabase (`scripts/blogContent.ts`, the `public_posts`
  view). The schema belongs to Noratives and is shared with novellanora.com.
- touches DNS or analytics for noracasey.com.
- was held by its ticket or by Nora, or you are not sure it is right.

Otherwise ship without asking. On **Hold**, stop merged and verified but unpushed, and end
the run with `shipped: false` and a summary that starts with `Not shipped:` and names the
branch.

## Tickets marked for hand-off

A ticket tagged **hand-off** is specified closely enough to be taken without
the context of the conversation that wrote it: the files are named, the acceptance is
stated, and `pnpm gate` plus the tests it names are the whole check. Take it as written.
If the ticket turns out to need a decision it does not record, stop and write the question
into the ticket (`log_progress`, then hand it back) rather than choosing.
