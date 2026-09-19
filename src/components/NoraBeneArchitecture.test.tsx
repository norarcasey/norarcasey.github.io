import { render, screen } from "@testing-library/react";

import { NoraBeneArchitecture } from "./NoraBeneArchitecture";

describe("NoraBeneArchitecture", () => {
  it("names itself for a reader who cannot see it", () => {
    const { container } = render(<NoraBeneArchitecture />);

    const svg = container.querySelector("svg")!;
    expect(svg).toHaveAttribute("role", "img");
    // The picture is the claim, so the claim has to reach a screen reader:
    // a title that says what it shows and a description carrying the same
    // crossings the arrows do. Ids are generated, so the wiring is what is
    // checked rather than the values.
    const [titleId, descId] = svg.getAttribute("aria-labelledby")!.split(" ");
    expect(container.querySelector(`#${CSS.escape(titleId)}`)?.tagName).toBe(
      "title"
    );
    expect(container.querySelector(`#${CSS.escape(descId)}`)?.tagName).toBe(
      "desc"
    );
    expect(
      screen.getByText(
        /what crosses the line between the device and the server/i
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/the key that unlocks the vault/i)).toBeVisible();
  });

  it("keeps the one refused path in the one colour that means it", () => {
    const { container } = render(<NoraBeneArchitecture />);

    // Pink is reserved here. If a second thing takes it, the drawing stops
    // saying "this is the exception" and starts saying "this is decoration".
    const pink = [...container.querySelectorAll("[stroke], [fill]")].filter(
      (node) =>
        (node.getAttribute("stroke") ?? "").includes("--pink") ||
        (node.getAttribute("fill") ?? "").includes("--pink")
    );
    expect(pink.map((node) => node.tagName)).toEqual(["line", "line", "text"]);
    expect(pink.at(-1)).toHaveTextContent("the key that opens it, never");
  });
});
