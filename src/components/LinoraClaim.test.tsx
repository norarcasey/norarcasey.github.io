import { render, screen } from "@testing-library/react";

import { LinoraClaim } from "./LinoraClaim";

describe("LinoraClaim", () => {
  it("names itself for a reader who cannot see it", () => {
    const { container } = render(<LinoraClaim />);

    const svg = container.querySelector("svg")!;
    expect(svg).toHaveAttribute("role", "img");
    const [titleId, descId] = svg.getAttribute("aria-labelledby")!.split(" ");
    expect(container.querySelector(`#${CSS.escape(titleId)}`)?.tagName).toBe(
      "title"
    );
    expect(container.querySelector(`#${CSS.escape(descId)}`)?.tagName).toBe(
      "desc"
    );
    // The two facts the drawing exists to make: a file meets at merge, after
    // the work, and the claim meets before it.
    expect(
      screen.getByText(/stops on a conflict in that file/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Refused for B")).toBeInTheDocument();
  });

  it("keeps the merge conflict in the one colour that means it", () => {
    const { container } = render(<LinoraClaim />);

    // The marker pink is reserved, as it is in the other drawings. The
    // refusal is the design working, so it stays in the accent.
    const pink = [...container.querySelectorAll("[stroke], [fill]")].filter(
      (node) =>
        (node.getAttribute("stroke") ?? "").includes("--chart-marker") ||
        (node.getAttribute("fill") ?? "").includes("--chart-marker")
    );
    expect(pink.map((node) => node.tagName)).toEqual(["rect", "text"]);
    expect(pink.at(-1)).toHaveTextContent("Conflict in RUNWAY.md");
  });
});
