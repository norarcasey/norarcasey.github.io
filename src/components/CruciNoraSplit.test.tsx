import { render, screen } from "@testing-library/react";

import { CruciNoraSplit } from "./CruciNoraSplit";

describe("CruciNoraSplit", () => {
  it("names itself for a reader who cannot see it", () => {
    const { container } = render(<CruciNoraSplit />);

    const svg = container.querySelector("svg")!;
    expect(svg).toHaveAttribute("role", "img");
    const [titleId, descId] = svg.getAttribute("aria-labelledby")!.split(" ");
    expect(container.querySelector(`#${CSS.escape(titleId)}`)?.tagName).toBe(
      "title"
    );
    expect(container.querySelector(`#${CSS.escape(descId)}`)?.tagName).toBe(
      "desc"
    );
    expect(
      screen.getByText(/who makes which part of a puzzle/i)
    ).toBeInTheDocument();
    // The claim the drawing exists to make, said in words too.
    expect(
      screen.getByText(/Claude never places a letter in the grid/i)
    ).toBeInTheDocument();
  });

  it("keeps the step a model is never given in the one colour that means it", () => {
    const { container } = render(<CruciNoraSplit />);

    // The marker pink is reserved, as in the other drawings: one box, its
    // heading and its two lines, and nothing else.
    const pink = [...container.querySelectorAll("[stroke], [fill]")].filter(
      (node) =>
        (node.getAttribute("stroke") ?? "").includes("--chart-marker") ||
        (node.getAttribute("fill") ?? "").includes("--chart-marker")
    );
    expect(pink.map((node) => node.tagName)).toEqual([
      "rect",
      "text",
      "text",
      "text",
    ]);
    expect(pink[1]).toHaveTextContent("No letters");
  });
});
