import { render, screen } from "@testing-library/react";
import { ContactMePage } from "./ContactMePage";

describe("ContactMePage", () => {
  it("renders the three contact links", () => {
    render(<ContactMePage />);

    expect(
      screen.getByRole("link", { name: "noracasey@duck.com" })
    ).toHaveAttribute("href", "mailto:noracasey@duck.com");
    expect(screen.getByRole("link", { name: /LinkedIn/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /GitHub/ })).toBeInTheDocument();
  });
});
