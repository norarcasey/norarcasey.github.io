# Working with `ProjectShowcase`

`ProjectShowcase` is the shared layout for a project page. It owns the page
grid and nothing else: no copy, no styling of what you put in it, no opinion
about whether the visual column holds a live game or a screenshot.

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

Placement comes from each slot's own `gridArea`, not from where you write it,
so the slots can appear in any order and any of them can be left out. Source
order still decides the stacking order below `lg`, so keep them in reading
order anyway.

## Minimal page

```tsx
<ProjectShowcase>
  <ShowcaseHeader title="Arkanora" />

  <ShowcaseSummary>
    <Typography variant="body1">What the project is, in a paragraph.</Typography>
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

| Slot              | Props                   | Holds                                                                 |
| ----------------- | ----------------------- | --------------------------------------------------------------------- |
| `ShowcaseHeader`  | `title`                 | The project name. Renders the `h2`, so don't add your own.            |
| `ShowcaseSummary` | `children`              | The narrow left column: what the project is and how to use it.        |
| `ShowcaseGame`    | `width`, `hideOnMobile` | The visual column: an embedded component, or a screenshot and a link. |
| `ShowcaseDetails` | `children`              | The full-width band under both columns, for the engineering write-up. |

`ShowcaseSummary` stacks its children with a gap, so give it a list of
`Typography` blocks rather than one wrapper `Box`. `ShowcaseDetails` does not,
so space its own children yourself.

`ShowcaseGame` props:

- `width` sizes the desktop column. The default `560` fits the games that are
  `width: 100%` capped at 560px. Pass a number for a different fixed column
  (CruciNora uses `480` for its screenshot), or `"fit-content"` when the
  content's own width varies (Mine Sweeper's board grows with difficulty).
- `hideOnMobile` drops the column below `md` for components that need the room,
  like Star Siege.

It also sets `className="showcase-game"`, which the e2e specs use as a handle:
`e2e/a11y.spec.ts` can scope an axe scan around it, and `e2e/showcase.spec.ts`
measures it.

## Recipes

**A page with no npm component.** Put a screenshot and the link out to the live
app in `ShowcaseGame`. Wrap them in one centered flex column so the button sits
under the image, and cap the image with `maxWidth` so it doesn't blow up on
mobile, where the slot goes full width. `CruciNoraPage.tsx` is the example.

**Two write-ups side by side in the details band.** Make the band a grid, one
column below `md` and two above:

```tsx
<Box
  sx={{
    display: "grid",
    gridTemplateColumns: {
      xs: "minmax(0, 1fr)",
      md: "repeat(2, minmax(0, 1fr))",
    },
    gap: 4,
  }}
>
  <Box sx={{ maxWidth: "72ch" }}>...</Box>
  <Box sx={{ maxWidth: "72ch" }}>...</Box>
</Box>
```

Two things matter here. `minmax(0, 1fr)` rather than `1fr`, because a `1fr`
track refuses to shrink below its content's minimum size and a long unbroken
word will push the column wide. And `maxWidth: "72ch"` rather than `width`: the
cap keeps the line length readable on a wide band while still letting the
column narrow when the grid does. A fixed `width` is what makes columns
overflow or refuse to sit beside each other.

**Facts shared by every game.** `COMPONENT_LIBRARY_FACTS` in
`src/data/projectStack.ts` covers packaging, testing, and release for the
`@norarcasey` components. Spread it after the project-specific facts rather
than restating it.

## Gotchas

- `.tile` sets `margin-left: auto` and `margin-right: auto`. That is inert for
  a block child but centers a grid item, which once threw the header into the
  middle of its row. Any tile you place directly in the grid needs
  `width: "100%"` and `boxSizing: "border-box"`, which the slots already do.
- Grid items don't collapse margins, so a heading's bottom margin stays inside
  its slot instead of pushing the row apart. `ShowcaseHeader` zeroes it and
  owns the spacing below itself.
- Don't set a fixed `width` on anything inside a slot. Use `maxWidth`, so the
  content still narrows on small screens.

## Adding a new project page

1. Write the page in `src/pages`, export it from `src/pages/index.ts`, and add
   the route in `src/index.tsx`.
2. Add the path, title, and description to `src/data/siteRoutes.ts`. That one
   entry is what gives the route a prerendered HTML file, a canonical URL, a
   social card, and a sitemap line. A unit test fails if the router and this
   list disagree.
3. Call `useRouteMeta("/your-path")` at the top of the page. It reads the same
   entry, so the title React sets matches the one the build served.
4. Add the path to `e2e/a11y.spec.ts`: `PAGES` if the page is entirely our own
   markup, `SHOWCASE_PAGES` if it embeds a published component.
5. Layout facts that depend on media queries can't be tested in jsdom. Cover
   those in `e2e/showcase.spec.ts` instead of the Vitest suite.
