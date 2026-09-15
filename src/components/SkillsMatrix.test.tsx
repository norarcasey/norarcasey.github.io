import { render, screen } from "@testing-library/react";

import { SkillsMatrix } from "./SkillsMatrix";
import { skillGroups } from "../data/resume";

// This assertion lived in HomePage.test.tsx until UI-18 moved the matrix onto
// the résumé. It follows the content rather than the page.
describe("SkillsMatrix", () => {
  it("pitches the full-stack range across every layer", () => {
    render(<SkillsMatrix />);

    expect(
      screen.getByRole("heading", { name: "Back end & APIs" })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Data" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Infrastructure & delivery" })
    ).toBeInTheDocument();
  });

  it("renders one card per layer, from the résumé's own data", () => {
    render(<SkillsMatrix />);

    for (const group of skillGroups) {
      expect(
        screen.getByRole("heading", { name: group.label })
      ).toBeInTheDocument();
    }
    expect(screen.getAllByRole("heading", { level: 3 }).length).toBe(
      skillGroups.length
    );
  });

  it("takes the résumé's heading by default and a caller's when given one", () => {
    const { rerender } = render(<SkillsMatrix />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Skills" })
    ).toBeInTheDocument();

    rerender(<SkillsMatrix title="Across the stack" />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Across the stack" })
    ).toBeInTheDocument();
  });
});
