import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProjectBox } from "./ProjectBox";

describe("ProjectBox", () => {
  it("renders its title and description inside a link to the given route", () => {
    render(
      <MemoryRouter>
        <ProjectBox
          title="Minesweeper"
          url="/mine-sweeper"
          description="Clear the board without detonating a mine."
        />
      </MemoryRouter>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/mine-sweeper");
    expect(screen.getByText("Minesweeper")).toBeInTheDocument();
    expect(
      screen.getByText("Clear the board without detonating a mine.")
    ).toBeInTheDocument();
  });
});
