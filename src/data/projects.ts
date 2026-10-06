import type { SiteRoutePath } from "./siteRoutes";

import anoracondaScreen from "../assets/screens/anoraconda.webp";
import arkanoraScreen from "../assets/screens/arkanora.webp";
import crucinoraScreen from "../assets/screens/crucinora.webp";
import legendsOfNoragonScreen from "../assets/screens/legends-of-noragon.webp";
import noraBeneScreen from "../assets/screens/nora-bene.webp";
import norativesScreen from "../assets/screens/noratives.webp";
import noradarScreen from "../assets/screens/noradar.webp";
import dinoraScreen from "../assets/screens/dinora.webp";
import mineSweeperScreen from "../assets/screens/mine-sweeper.webp";
import pianoraScreen from "../assets/screens/pianora.webp";
import starSiegeScreen from "../assets/screens/star-siege.webp";
import ticTacNoraScreen from "../assets/screens/tic-tac-nora.webp";

/**
 * What a project is, said once.
 *
 * Before this, four places said it: the tiles were literal JSX on the home
 * page, the spotlight was hardcoded in `FeaturedProject`, the résumé kept its
 * own list, and each showcase page repeated its stack facts. The case studies
 * in UI-12 would have made it five.
 */
export interface Project {
  /**
   * The page on this site. Typed as the route union rather than as a string,
   * so a path this site does not serve is a compile error, which is the same
   * trick `siteRoutes.ts` plays on itself.
   */
  path: SiteRoutePath;
  name: string;
  /** One or two sentences, as the home page's tiles have always said it. */
  blurb: string;
  /**
   * The imported WebP, from `src/assets/screens`. A product whose page leads
   * with a recording rather than a screenshot may have none yet; its card
   * shows the wash the canvas draws for that case.
   */
  screenshot?: string;
  /**
   * `product` is something someone else could use; `game` is one of the
   * published components. It decides which part of the home page a project
   * lands in: the Work grid, or the strip of games under it.
   */
  kind: "product" | "game";
  /**
   * One mono line of what it is built from, for the product cards on the home
   * page. Not the showcase pages' `StackFacts`, which are paragraphs: this is
   * the line under a card. Games use `npmPackage` instead.
   */
  stack?: string;
  /**
   * When the project's page was added to this site: the author time of the
   * commit that first added its `src/pages/*Page.tsx`. Every product has one,
   * because the Work grid is ordered by it, newest first (CASEY-3). A time
   * rather than a day, because CruciNora and Legends of Noragon went in on the
   * same afternoon.
   */
  addedAt?: string;
  /** The one project the home page leads with. Exactly one may carry it. */
  featured?: true;
  /** Where it runs, if it is somewhere other than this site. */
  liveUrl?: string;
  /** The npm package this site installs it from, for the games. */
  npmPackage?: string;
  repoUrl?: string;
}

/**
 * Every project, in the order they were written down. The Work grid does not
 * read this order: it sorts the products by `addedAt`, newest first. The games
 * strip under it does keep this order.
 */
export const PROJECTS: Project[] = [
  {
    path: "/crucinora",
    addedAt: "2026-06-24T14:20:02+02:00",
    name: "CruciNora",
    blurb:
      "AI-assisted crossword construction. A backtracking solver fills the grid in under a second; Claude writes the clues.",
    screenshot: crucinoraScreen,
    kind: "product",
    stack: "TypeScript core · Supabase · Vercel functions · Claude",
    featured: true,
    liveUrl: "https://crucinora.com",
  },
  {
    path: "/nora-bene",
    addedAt: "2026-09-18T01:14:27+02:00",
    name: "Nora Bene",
    blurb:
      "One app in place of Google Keep, 1Password and a spreadsheet of lists. It keeps working with no signal, and the vault's key never leaves the device.",
    screenshot: noraBeneScreen,
    kind: "product",
    stack: "PWA · IndexedDB outbox · Supabase · Playwright",
    liveUrl: "https://norabene.noratives.com",
  },
  {
    path: "/noratives",
    addedAt: "2026-09-19T15:26:28+02:00",
    name: "Noratives",
    blurb:
      "The writing studio this blog is published from. Journals that stay private, fiction and technical posts that go out to two different sites, one editor for all three.",
    screenshot: norativesScreen,
    kind: "product",
    stack: "React · TipTap · Supabase · edge functions · Playwright",
    liveUrl: "https://noratives.com",
  },
  {
    path: "/noradar",
    addedAt: "2026-09-29T08:49:27+02:00",
    name: "Noradar",
    blurb:
      "Whether each push actually deployed, and what it cost in agent time, for every project I work on. A daemon on my laptop, a dashboard and a menu bar.",
    screenshot: noradarScreen,
    kind: "product",
    stack: "Node · node:sqlite · React · Swift · Vitest",
  },
  {
    path: "/dinora",
    addedAt: "2026-10-07T01:44:49+02:00",
    name: "Dinora",
    blurb:
      "The finance app that replaced Monarch for me. Every account in one place, read-only, with budgets and goals that work the way I do.",
    screenshot: dinoraScreen,
    kind: "product",
    stack: "React · Supabase · Vercel Cron · PWA · Swift",
  },
  {
    path: "/legends-of-noragon",
    addedAt: "2026-06-24T14:08:01+02:00",
    name: "Legends of Noragon",
    blurb:
      "A dungeon crawler with procedurally generated dungeons. No two descents into Noragon are the same.",
    screenshot: legendsOfNoragonScreen,
    kind: "product",
    stack: "React · seeded generation · Vitest",
  },
  {
    path: "/mine-sweeper",
    name: "Mine Sweeper",
    blurb:
      "The classic flag-the-bombs puzzle. Clear the board without detonating a mine.",
    screenshot: mineSweeperScreen,
    kind: "game",
    npmPackage: "@norarcasey/mine-sweeper",
  },
  {
    path: "/pianora",
    name: "Pianora",
    blurb:
      "A playable browser piano. Tap or type to make music in your key of choice.",
    screenshot: pianoraScreen,
    kind: "game",
    npmPackage: "@norarcasey/pianora",
  },
  {
    path: "/arkanora",
    name: "Arkanora",
    blurb:
      "A brick-breaker in the Arkanoid tradition. Bounce the ball to smash every block.",
    screenshot: arkanoraScreen,
    kind: "game",
    npmPackage: "@norarcasey/arkanora",
  },
  {
    path: "/anoraconda",
    name: "Anoraconda",
    blurb:
      "Guide the growing snake to eat and survive without biting your own tail.",
    screenshot: anoracondaScreen,
    kind: "game",
    npmPackage: "@norarcasey/anoraconda",
  },
  {
    path: "/space-invaders",
    name: "Star Siege",
    blurb:
      "A retro arcade shooter: blast waves of descending invaders before they reach you.",
    screenshot: starSiegeScreen,
    kind: "game",
    npmPackage: "@norarcasey/star-siege-nora",
  },
  {
    path: "/tic-tac-nora",
    name: "Tic Tac Nora",
    blurb: "A quick, friendly twist on tic-tac-toe. Line up three to win.",
    screenshot: ticTacNoraScreen,
    kind: "game",
    npmPackage: "@norarcasey/tic-tac-nora",
  },
];

/** The one project the home page leads with. */
export const FEATURED_PROJECT: Project = PROJECTS.filter(
  (project) => project.featured
)[0];

/** Everything but the featured one, in order. */
export const OTHER_PROJECTS: Project[] = PROJECTS.filter(
  (project) => !project.featured
);

/**
 * The home page's Work grid: the products, newest first by when each page was
 * added (Nora, 7 Oct 2026, CASEY-3), so a new case study lands at the front
 * without anyone remembering to move it.
 */
export const PRODUCTS: Project[] = PROJECTS.filter(
  (project) => project.kind === "product"
).sort((a, b) => Date.parse(b.addedAt ?? "") - Date.parse(a.addedAt ?? ""));

/** The strip under it: the games this site installs from npm, in order. */
export const GAMES: Project[] = PROJECTS.filter(
  (project) => project.kind === "game"
);
