import { render, screen } from "@testing-library/react";
import { NpmBadge } from "./NpmBadge";

describe("NpmBadge", () => {
  it("links to the package on npm in a new tab", () => {
    render(<NpmBadge npmPackage="@norarcasey/arkanora" title="Arkanora" />);

    const link = screen.getByRole("link", {
      name: "View the Arkanora package on npm",
    });
    expect(link).toHaveAttribute(
      "href",
      "https://www.npmjs.com/package/@norarcasey/arkanora"
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("labels the badge with the unscoped package name", () => {
    render(
      <NpmBadge npmPackage="@norarcasey/star-siege-nora" title="Star Siege" />
    );

    // The label is what you'd type to install it, so the scope is dropped.
    expect(screen.getByAltText("Star Siege npm version")).toHaveAttribute(
      "src",
      "https://img.shields.io/npm/v/@norarcasey/star-siege-nora?logo=npm&label=star-siege-nora"
    );
  });

  it("leaves an unscoped package name alone", () => {
    render(<NpmBadge npmPackage="pianora" title="Pianora" />);

    expect(screen.getByAltText("Pianora npm version")).toHaveAttribute(
      "src",
      "https://img.shields.io/npm/v/pianora?logo=npm&label=pianora"
    );
  });
});
