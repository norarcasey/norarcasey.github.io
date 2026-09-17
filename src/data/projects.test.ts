import {
  FEATURED_PROJECT,
  GAMES,
  OTHER_PROJECTS,
  PRODUCTS,
  PROJECTS,
} from "./projects";
import { SITE_ROUTES } from "./siteRoutes";

describe("PROJECTS", () => {
  it("only points at pages this site serves", () => {
    // The type already refuses an unknown path at compile time. This catches
    // the other direction: a route deleted from siteRoutes.ts while a project
    // still links to it.
    for (const project of PROJECTS) {
      expect(Object.keys(SITE_ROUTES)).toContain(project.path);
    }
  });

  it("features exactly one project", () => {
    expect(PROJECTS.filter((project) => project.featured)).toHaveLength(1);
    expect(FEATURED_PROJECT).toBeDefined();
    expect(OTHER_PROJECTS).toHaveLength(PROJECTS.length - 1);
    expect(OTHER_PROJECTS).not.toContain(FEATURED_PROJECT);
  });

  it("gives every project a name and a blurb, and every game a screenshot", () => {
    // A product may lead with a recording and have no screenshot yet; a game
    // is in the strip as a thumbnail and must have one.
    for (const project of PROJECTS) {
      expect(project.name.length).toBeGreaterThan(0);
      expect(project.blurb.length).toBeGreaterThan(0);
      if (project.kind === "game") {
        expect(project.screenshot?.length ?? 0).toBeGreaterThan(0);
      }
    }
  });

  it("lists each project once", () => {
    const paths = PROJECTS.map((project) => project.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("splits into the products and the games, with nothing left over", () => {
    expect(PRODUCTS.length + GAMES.length).toBe(PROJECTS.length);
    expect(PRODUCTS.every((p) => p.kind === "product")).toBe(true);
    expect(GAMES.every((p) => p.kind === "game")).toBe(true);
  });

  it("gives every product a stack line for its card, and no game one", () => {
    // The card on the home page prints it; a game prints its package instead.
    for (const project of PRODUCTS) {
      expect(project.stack?.length ?? 0).toBeGreaterThan(0);
    }
    for (const project of GAMES) {
      expect(project.stack).toBeUndefined();
    }
  });

  it("names the npm package for every game, and for nothing else", () => {
    // The games strip on the home page prints the package this site installs
    // from, so what you play is the published artifact rather than a copy.
    for (const project of PROJECTS) {
      if (project.kind === "game") {
        expect(project.npmPackage).toMatch(/^@norarcasey\//);
      } else {
        expect(project.npmPackage).toBeUndefined();
      }
    }
  });
});
