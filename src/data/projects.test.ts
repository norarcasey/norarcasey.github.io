import { FEATURED_PROJECT, OTHER_PROJECTS, PROJECTS } from "./projects";
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

  it("gives every project a name, a blurb, and a screenshot", () => {
    for (const project of PROJECTS) {
      expect(project.name.length).toBeGreaterThan(0);
      expect(project.blurb.length).toBeGreaterThan(0);
      expect(project.screenshot.length).toBeGreaterThan(0);
    }
  });

  it("lists each project once", () => {
    const paths = PROJECTS.map((project) => project.path);
    expect(new Set(paths).size).toBe(paths.length);
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
