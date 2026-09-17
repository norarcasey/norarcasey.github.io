import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { axe } from "jest-axe";

import { Root } from "./Root";
import Home from "./pages/HomePage";
import { CaseStudyFixture } from "./components/caseStudyFixture";
import { ContactMePage } from "./pages/ContactMePage";
import { CruciNoraPage } from "./pages/CruciNoraPage";
import { NoraBenePage } from "./pages/NoraBenePage";
import { MinimaxDiagram } from "./components/MinimaxDiagram";
import { Resume } from "./components/Resume";

// `region` asserts every bit of content sits inside a landmark. The skip link
// and the route-announcer live region intentionally live outside landmarks, so
// it's disabled everywhere. `landmark-one-main` and `page-has-heading-one` are
// whole-page rules that only make sense for the full app, so they're off when
// scanning an individual page section in isolation.
const REGION_OFF = { region: { enabled: false } };
const SECTION_RULES = {
  ...REGION_OFF,
  "landmark-one-main": { enabled: false },
  "page-has-heading-one": { enabled: false },
};

// Note: axe's color-contrast check needs a real layout engine (canvas) and is
// skipped under jsdom — contrast is verified separately. These scans cover
// structure, ARIA, names/roles, image alt text, headings, and link purpose.
describe("accessibility (axe)", () => {
  it("the full home page has no violations", async () => {
    // Mirrors the router in index.tsx: the home page is the shell's index
    // route, so it only renders through the <Outlet>.
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(await axe(container, { rules: REGION_OFF })).toHaveNoViolations();
  }, 15000);

  it.each([
    ["Contact page", <ContactMePage />],
    ["CruciNora page", <CruciNoraPage />],
    ["Nora Bene case study", <NoraBenePage />],
    // No case study is served yet (UI-12). The layout is scanned on the
    // canvas's placeholders so the first real page starts from a clean scan.
    ["Case-study layout", <CaseStudyFixture />],
    ["Minimax diagram", <MinimaxDiagram />],
    ["Résumé", <Resume />],
  ])(
    "%s has no violations",
    async (_label, ui) => {
      const { container } = render(<MemoryRouter>{ui}</MemoryRouter>);
      expect(
        await axe(container, { rules: SECTION_RULES })
      ).toHaveNoViolations();
    },
    15000
  );
});
