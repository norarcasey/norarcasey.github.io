import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProjectBox } from "./ProjectBox";

describe("ProjectBox", () => {
  it("renders its title inside a link to the given route", () => {
    render(
      <MemoryRouter>
        <ProjectBox title="Minesweeper" url="/mine-sweeper" />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: "Minesweeper" });
    expect(link).toHaveAttribute("href", "/mine-sweeper");
  });
});
