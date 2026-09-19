# Working with `ProjectShowcase`

`ProjectShowcase` is the shared layout for a project page. It owns the page
grid and nothing else: no copy, no styling of what you put in it, no opinion
about whether the visual column holds a live game, a screenshot, or a
recording. `CaseStudy` is a second layout on the same slots, described below.

## The grid

```
lg and up                          below lg
+-----------------------------+    +---------------+
|          header             |    |    header     |
+-------------+---------------+    +---------------+
|   summary   |     game      |    |    summary    |
+-------------+---------------+    +---------------+
|          details            |    |     game      |
+-----------------------------+    +---------------+
                                   |    details    |
                                   +---------------+
```

Placement comes from each slot's own inline `gridArea`, not from where you
write it, so the slots can appear in any order and any of them can be left
out. Source order still decides the stacking order below `lg`, so keep them in
reading order anyway. The grids themselves are `.showcase-grid` and
`.case-study-grid` in `index.css`. Breakpoints are Tailwind's: `md` is 768px
and `lg` is 1024px.

## Minimal page

```tsx
<ProjectShowcase>
  <ShowcaseHeader title="Arkanora" />

  <ShowcaseSummary>
    <p className="copy">What the project is, in a paragraph.</p>
  </ShowcaseSummary>

  <ShowcaseGame>
    <Arkanora title={null} />
  </ShowcaseGame>

  <ShowcaseDetails>
    <StackFacts facts={[...]} />
  </ShowcaseDetails>
</ProjectShowcase>
```

## The slots

| Slot              | Props                                          | Holds                                                                                           |
| ----------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `ShowcaseHeader`  | `title`, `size`, `eyebrow`, `problem`, `aside` | The project name. Renders the page's `h1`, so don't add your own.                               |
| `ShowcaseSummary` | `children`                                     | The narrow left column: what the project is and how to use it.                                  |
| `ShowcaseGame`    | `width`, `hideOnMobile`                        | The visual column: an embedded component, a screenshot and a link, or a `CaseStudyMedia` still. |
| `ShowcaseDetails` | `title`, `lead`, `children`                    | The full-width band under both columns, for the engineering write-up.                           |

`ShowcaseSummary` stacks its children with a gap, so give it a list of blocks
(`<p className="copy">`, an `NpmBadge`) rather than one wrapper `div`.
`ShowcaseDetails` does not, so space its own children yourself.

Headings inside the slots start at `h2`, since the header owns the `h1`. Skipping
a level fails the axe suite. `StackFacts` renders its own `h2`; pass
`title={null}` when the band around it already carries one.

`ShowcaseGame` props:

- `width` sizes the desktop column. The default `560` fits the games that are
  `width: 100%` capped at 560px. Pass a number for a different fixed column
  (CruciNora uses `480` for its screenshot), `"fit-content"` when the
  content's own width varies (Mine Sweeper's board grows with difficulty), or
  `"100%"` in a case study so the recording fills its band. It reaches the CSS
  as the `--game-width` custom property.
- `hideOnMobile` drops the column below `md` for components that need the room,
  like Star Siege.

Every slot names itself with a class, `showcase-header`, `showcase-summary`,
`showcase-game`, `showcase-details`, `showcase-facts`, `showcase-pushback`,
which the e2e specs use as handles: `e2e/a11y.spec.ts` scopes an axe scan
around `showcase-game`, since everything inside it comes from a published
package, and `e2e/showcase.spec.ts` measures the others.

## The case-study layout

```
+-----------------------------+
|   header (8) | tiles (4)    |    <- ShowcaseHeader, size="hero", with aside
+-----------------------------+
|        game: recording      |    <- ShowcaseGame width="100%" holding a CaseStudyMedia
+---------+---------+---------+
| fact    | fact    | fact    |    <- ShowcaseFacts, up to three
+-----------------------------+
| How it is built (4) | dl (8)|    <- ShowcaseDetails with a title, holding StackFacts
+-----------------------------+
| Where I pushed back | prose |    <- ShowcasePushback, with a ShowcaseCallout
+-----------------------------+
```

`CaseStudy` takes the same slot components and stacks them as bands, in the
order the UI-14 canvas draws them, and adds two slots of its own:

| Slot               | Props            | Holds                                                                       |
| ------------------ | ---------------- | --------------------------------------------------------------------------- |
| `ShowcaseFacts`    | `facts`          | The row of measured-fact tiles. Up to three; two honest figures beat three. |
| `ShowcasePushback` | `lead`, children | The calls made against the plan. Carries its subtitle unless given another. |

Helpers: `ShowcaseTile` (`label`, `tone`, children) is one of the three tiles
beside the header; `ShowcaseCallout` (`label`, children) is the wash callout
inside the pushback band; `CaseStudyMedia` (`image`, `alt`, `sources`, `label`,
`caption`) is the 16:9 slot at the top. It has three states and picks by what
it is given: a still on its own is shown as a still, with no play button over
something that cannot be played; a still plus `sources` makes the still the
video's poster; neither renders the empty frame with the bracketed `label`
naming the recording that belongs there.

`src/components/caseStudyFixture.tsx` is the canvas's Kinora artboard on this
layout, with the bracketed placeholders intact. It is not a page: the tests and
the accessibility scan render it so the layout is known to work before UI-12
writes a real one on it. Copy it to start a case study.

**What is not decided about the recording.** Which formats to encode (WebM and
an MP4 fallback?), whether each recording gets its own poster, and whether a
page loads the file before it is scrolled to are weight decisions that wait on
real files. `CaseStudyMedia` assumes no answer: it takes whatever `sources` it
is given, in order, and sets no `preload`. Record the answers in UI-17 on the
runway when they are made. Until a page has a file, a screenshot of the thing
running is a better hero than a frame promising a video: pass `image`.

## Recipes

**A page with no npm component.** Put a screenshot and the link out to the live
app in `ShowcaseGame`. Wrap them in one centered flex column so the button sits
under the image, and cap the image with `max-w-*` so it doesn't blow up on
mobile, where the slot goes full width. `CruciNoraPage.tsx` is the example.

**Two write-ups side by side in the details band.** Make the band a grid, one
column below `md` and two above:

```tsx
<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
  <div className="max-w-[72ch]">...</div>
  <div className="max-w-[72ch]">...</div>
</div>
```

Two things matter here. Tailwind's `grid-cols-2` is `repeat(2, minmax(0, 1fr))`
rather than `1fr 1fr`, because a `1fr` track refuses to shrink below its
content's minimum size and a long unbroken word will push the column wide. And
`max-w-[72ch]` rather than a width: the cap keeps the line length readable on a
wide band while still letting the column narrow when the grid does. A fixed
width is what makes columns overflow or refuse to sit beside each other.

**Facts shared by every game.** `COMPONENT_LIBRARY_FACTS` in
`src/data/projectStack.ts` covers packaging, testing, and release for the
`@norarcasey` components. Spread it after the project-specific facts rather
than restating it.

## Gotchas

- Every area a slot can name must exist in both templates. A slot whose
  `gridArea` names an area the template lacks is not dropped: the browser
  resolves the name to an implicit line and places the item in a second,
  auto-sized column, which starves the one column the page has and wraps
  every line word by word. Adding a slot means adding its area to
  `.showcase-grid` and `.case-study-grid` in `index.css`.
- Grid items don't collapse margins, so a heading's bottom margin stays inside
  its slot instead of pushing the row apart. The reset zeroes margins and the
  grid owns the row spacing; don't add margins to a slot's outer element.
- Don't set a fixed width on anything inside a slot. Use `max-w-*`, so the
  content still narrows on small screens.
- The site's own classes (`.copy`, `.h3`, `.card`) live in Tailwind's
  `components` layer so a utility beside them wins: `copy text-sm` is 14px.
  A rule written outside a layer in `index.css` would beat every utility.

## Adding a new project page

1. Write the page in `src/pages` and register it in `src/index.tsx` as a `lazy`
   route, matching the others. Lazy so the page's game package is fetched when
   someone opens it rather than by every visitor to the home page.
2. Add the path, title, and description to `src/data/siteRoutes.ts`. That one
   entry is what gives the route a prerendered HTML file, a canonical URL, a
   social card, and a sitemap line. A unit test fails if the router and this
   list disagree.
3. Call `useRouteMeta("/your-path")` at the top of the page. It reads the same
   entry, so the title React sets matches the one the build served.
4. Add it to `src/data/projects.ts`, which is what puts it on the home page.
5. Add the path to `e2e/a11y.spec.ts`: `PAGES` if the page is entirely our own
   markup, `SHOWCASE_PAGES` if it embeds a published component.
6. Layout facts that depend on media queries can't be tested in jsdom. Cover
   those in `e2e/showcase.spec.ts` instead of the Vitest suite.
