import type { StackFact } from "../components/StackFacts";

// The @norarcasey game components are all built and shipped the same way, so
// the facts that are true of every one of them live here once and each project
// page adds only what's specific to it.

/** Build, test, and release facts shared by every published game component. */
export const COMPONENT_LIBRARY_FACTS: StackFact[] = [
  {
    label: "Packaged",
    value:
      "Ships as a versioned React component on npm: TypeScript compiled to an ES module bundle with type declarations, built by Vite in dual mode so one repo produces both the demo app and the publishable library.",
  },
  {
    label: "Tested",
    value:
      "Vitest and React Testing Library cover the game rules and the rendered component, run by GitHub Actions on every push and pull request alongside lint, formatting, and a typecheck.",
  },
  {
    label: "Released",
    value:
      "Publishing a GitHub Release triggers an npm publish over OIDC trusted publishing: no long-lived token is stored in the repo, and provenance is attached automatically.",
  },
  {
    label: "Running here",
    value:
      "This site installs the package from npm and renders it on this page, so what you are playing is the published artifact.",
  },
];
