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
    expect(screen.getByText("More projects")).toBeInTheDocument();
    expect(
      screen.getByText("Latest personal passion project")
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Mine Sweeper/ })).toHaveAttribute(
      "href",
      "/mine-sweeper"
    );
  });

  it("pitches the full-stack range across every layer", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText("Across the stack")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Back end & APIs" })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Data" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Infrastructure & delivery" })
    ).toBeInTheDocument();
  });
});
