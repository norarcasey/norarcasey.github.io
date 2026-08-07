// One list of the site's pages and what each one says about itself. Both the
// running app (via usePageMeta) and the build-time prerender read from here, so
// a page's title and description can't drift between the served HTML and what
// React sets once it boots. Adding a route here is what puts it in the sitemap
// and gets it a real HTML file, so it is the only place to add one.

export const SITE_NAME = "Nora Casey";

/** No trailing slash: the URL builders below add it. */
export const SITE_URL = "https://noracasey.com";

export interface RouteMeta {
  /** Page name, shown in the tab ahead of the site name. */
  title: string;
  /** Meta description, also used for the Open Graph and Twitter cards. */
  description: string;
}

export const SITE_ROUTES = {
  "/": {
    title: SITE_NAME,
    description:
      "Nora Casey, full-stack software engineer and team lead. React and TypeScript, Node, Rails, Postgres and MongoDB, and CI/CD pipelines. Browse my projects, résumé, and ways to get in touch.",
  },
  "/resume": {
    title: "Résumé",
    description:
      "Nora Casey's résumé: experience, education, and skills in frontend and full-stack software engineering.",
  },
  "/mine-sweeper": {
    title: "Mine Sweeper",
    description:
      "A React Mine Sweeper game by Nora Casey, also published as the @norarcasey/mine-sweeper npm package.",
  },
  "/tic-tac-nora": {
    title: "Tic Tac Nora",
    description:
      "Tic Tac Nora, a tic-tac-toe game by Nora Casey, published as a React component on npm and playable in the browser. Try to beat Nora's minimax AI.",
  },
  "/space-invaders": {
    title: "Star Siege",
    description:
      "Star Siege, a retro arcade space-shooter by Nora Casey, published as a React component on npm and playable in the browser.",
  },
  "/pianora": {
    title: "Pianora",
    description:
      "Pianora, a playable browser piano built with Tone.js by Nora Casey, published as a React component on npm. Play with your mouse or computer keyboard, record a melody, and play it back.",
  },
  "/anoraconda": {
    title: "Anoraconda",
    description:
      "Anoraconda, a browser take on the classic Snake game by Nora Casey, published as a React component on npm. Steer with the arrow keys or WASD and chase the apples.",
  },
  "/arkanora": {
    title: "Arkanora",
    description:
      "Arkanora, a browser take on the classic brick-breaker by Nora Casey, published as a React component on npm. Steer the paddle with the arrow keys and clear every brick.",
  },
  "/legends-of-noragon": {
    title: "Legends of Noragon",
    description:
      "Legends of Noragon, a turn-based, top-down dungeon crawler with procedurally generated dungeons by Nora Casey. Read how it's built, the fun challenges behind it, and play it in your browser.",
  },
  "/crucinora": {
    title: "CruciNora",
    description:
      "CruciNora, an AI-assisted crossword construction app by Nora Casey. Design an NYT-style grid, auto-fill it with a backtracking solver, and clue it with Claude's help.",
  },
  "/contact-me": {
    title: "Contact",
    description: "Get in touch with Nora Casey by email, LinkedIn, or GitHub.",
  },
} as const satisfies Record<string, RouteMeta>;

/** The paths above, as a union, so a typo is a compile error. */
export type SiteRoutePath = keyof typeof SITE_ROUTES;

export const SITE_ROUTE_PATHS = Object.keys(SITE_ROUTES) as SiteRoutePath[];

/** The document title for a page: "CruciNora · Nora Casey", or just the site
 *  name on the home page, which would otherwise read "Nora Casey · Nora Casey". */
export function pageTitle(title: string): string {
  return title === SITE_NAME ? title : `${title} · ${SITE_NAME}`;
}

/**
 * The absolute URL a page should call itself, used for `rel="canonical"`, the
 * `og:url` tag, and the sitemap. Trailing slash: the prerender writes each
 * route as `<path>/index.html`, so the slash form is the one static hosting
 * serves directly. The bare `/crucinora` form still works, it just redirects,
 * and this tag points search engines at the URL that answers without a hop.
 */
export function canonicalUrl(path: SiteRoutePath): string {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}/`;
}
