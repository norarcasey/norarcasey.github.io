import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./HomePage";
import { GAMES, PRODUCTS } from "../data/projects";

describe("HomePage", () => {
  function renderHome() {
    return render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  }

  it("leads with what she does rather than a job title", () => {
    renderHome();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /I solve problems with technology/,
      })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View résumé" })).toHaveAttribute(
      "href",
      "/resume"
    );
  });

  it("has the four sections the canvas draws, and no more", () => {
    renderHome();

    // Writing is absent here: it renders nothing until the blog index has
    // been fetched, which is its own test.
    const sections = screen
      .getAllByRole("heading", { level: 2 })
      .map((heading) => heading.textContent);
    expect(sections).toEqual(["Work", "About"]);
  });

  it("no longer carries the chip row, the skills matrix, or the spotlight", () => {
    renderHome();

    // The chips and the matrix said the same things as the three facts and
    // the résumé's Skills section; the spotlight band is now a card in Work.
    expect(screen.queryByText("Across the stack")).not.toBeInTheDocument();
    expect(screen.queryByText("More projects")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Latest personal passion project")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("About me")).not.toBeInTheDocument();
  });

  it("lists every product as a card and every game in the strip", () => {
    renderHome();

    for (const project of PRODUCTS) {
      expect(screen.getByRole("link", { name: project.name })).toHaveAttribute(
        "href",
        project.path
      );
      expect(screen.getByText(project.blurb)).toBeInTheDocument();
      expect(screen.getByText(project.stack!)).toBeInTheDocument();
    }

    for (const project of GAMES) {
      const link = screen.getByRole("link", {
        name: new RegExp(project.name),
      });
      expect(link).toHaveAttribute("href", project.path);
      expect(screen.getByText(project.npmPackage!)).toBeInTheDocument();
    }
  });
});
