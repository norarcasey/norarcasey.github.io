import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./HomePage";

describe("HomePage", () => {
  it("renders the About and Projects sections without crashing", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText("About me")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Mine Sweeper/ })).toHaveAttribute(
      "href",
      "/mine-sweeper"
    );
  });
});
