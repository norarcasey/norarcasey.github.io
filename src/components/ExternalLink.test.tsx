import { render, screen } from "@testing-library/react";
import { ExternalLink } from "./ExternalLink";

describe("ExternalLink", () => {
  it("renders the label and points at the url", () => {
    render(<ExternalLink url="https://example.com" label="My Site" />);

    const link = screen.getByRole("link", { name: "My Site" });
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  it("opens in a new tab safely", () => {
    render(<ExternalLink url="https://example.com" label="My Site" />);

    const link = screen.getByRole("link", { name: "My Site" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  });
});
